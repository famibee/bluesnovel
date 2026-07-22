/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {alt, lazy, of, optWhitespace, regex, seq, seqMap, string} from 'parsimmon';
import type {VarStore, T_VAL} from './VarStore';

type IFncCalc = (a: any[]) => any;
type IHFncCalc = {[key: string]: IFncCalc};

// 式評価器（本家 skynovel_esm/src/sn/PropParser.ts の簡略版）
//	[if]のexp属性、[let]のval属性で使う式を評価する。
//	対応：数値/文字列/真偽値/nullリテラル、変数参照（tmp:/game:/sys:、省略時はtmp、本家準拠）、
//		+ - * / % **、< <= > >= == != === !==、&& || !、丸括弧
//	未対応（TODO）：ビット演算子、三項演算子、インクリメント/デクリメント、
//		文字列内埋め込み変数（本家の $name, #{式} 記法）
export class ExprEval {
	#parser: any = null;

	constructor(private readonly val: VarStore) {
		function ope(a: (string | RegExp)[]) {
			const ps = [];
			for (const v of a) ps.push(
				(typeof v === 'string' ? string(v) : regex(v))
				.trim(optWhitespace)
			);
			return alt(...ps);
		}
		// マッチした文字列ではなく、指定した名前（opcode）をノードに埋め込む。
		// 二項の'-'と単項マイナスのように、同じ記号で意味の違う演算子を区別するため必須
		// （本家 PropParser.ts の opeH 相当。UnaryNegate での不具合を ExprEval.test.ts 作成中に発見し修正）
		function opeH(hOps: {[name: string]: string | RegExp}) {
			const keys = Object.keys(hOps).sort();
			const ps = keys.map(k=> {
				const v = hOps[k]!;
				return (typeof v === 'string' ? string(v) : regex(v))
				.trim(optWhitespace)
				.result(k);
			});
			return alt(...ps);
		}
		function PREFIX(operatorsParser: any, nextParser: any) {
			const parser: any = lazy(()=> seq(operatorsParser, parser).or(nextParser));
			return parser;
		}
		// 左結合（例：1-2-3 は (1-2)-3）
		function BINARY_LEFT(operatorsParser: any, nextParser: any) {
			return seqMap(
				nextParser,
				seq(operatorsParser, nextParser).many(),
				(first: any, rest: any)=> rest.reduce((acc: any, ch: any)=> [ch[0], acc, ch[1]], first)
			);
		}
		// 右結合（例：2**3**2 は 2**(3**2)）
		function BINARY_RIGHT(operatorsParser: any, nextParser: any) {
			const parser = lazy(
				()=> nextParser.chain(
					(next: any)=> seq(operatorsParser, of(next), parser).or(of(next))
				)
			);
			return parser;
		}

		const Num = alt(
			regex(/-?(0|[1-9][0-9]*)\.[0-9]+/),
			regex(/-?(0|[1-9][0-9]*)/),
		)
		.map(Number)
		.map(n=> ['!num!', n])
		.desc('number');

		// 予約語（true/false/null）は識別子の一部として続かないことを確認してから確定させる
		const BooleanLiteral = regex(/true(?![A-Za-z0-9_])|false(?![A-Za-z0-9_])/)
		.map(b=> ['!bool!', b === 'true'])
		.desc('boolean');

		const NullLiteral = regex(/null(?![A-Za-z0-9_])/)
		.map(()=> ['!null!', null])
		.desc('null');

		const StringLiteral = regex(/"(?:\\["\\]|[^"])*"|'(?:\\['\\]|[^'])*'/)
		.map(s=> ['!str!', s.slice(1, -1).replaceAll(/\\(["'\\])/g, '$1')])
		.desc('string');

		const VarLiteral = regex(/(?:(?:tmp|game|sys):)?[A-Za-z_][A-Za-z0-9_.]*/)
		.map(name=> ['!var!', name])
		.desc('variable');

		const Basic = lazy(()=>
			string('(').then(this.#parser).skip(string(')'))
			.or(NullLiteral)
			.or(BooleanLiteral)
			.or(Num)
			.or(StringLiteral)
			.or(VarLiteral)
		);

		const table = [
			// 優先順位：JavaScriptの演算子優先順位に準拠（サポート対象分のみ）
			{type: PREFIX,			ops: ope([/!(?!=)/])},		// 論理NOT
			{type: PREFIX,			ops: opeH({UnaryNegate: /-(?!-)/})},	// 単項マイナス（二項の'-'とは別のopcode）
			{type: BINARY_RIGHT,	ops: ope(['**'])},
			{type: BINARY_LEFT,	ops: ope(['*', '/', '%'])},
			{type: BINARY_LEFT,	ops: ope(['+', '-'])},
			{type: BINARY_LEFT,	ops: ope([/<=|<|>=|>/])},
			{type: BINARY_LEFT,	ops: ope([/===|!==|==|!=/])},
			{type: BINARY_LEFT,	ops: ope(['&&'])},
			{type: BINARY_LEFT,	ops: ope(['||'])},
		];

		this.#parser = table.reduce(
			(acc: any, level)=> level.type(level.ops, acc),
			Basic
		)
		.trim(optWhitespace);
	}

	parse(exp: string): T_VAL {
		const p = this.#parser.parse(exp);
		if (! p.status) throw `(ExprEval)式が不正です：${exp}`;
		return this.#calc(p.value);
	}

	// [if]/[elsif]用：式を評価し、真偽値として判定する（&&/||と同じ真偽変換規則を使う）
	evalBool(exp: string): boolean {
		return this.#toBool(this.parse(exp));
	}

	#calc(a: any[]): T_VAL {
		const elm = a.shift();
		if (elm instanceof Array) return this.#calc(elm);

		const fnc = this.#hFnc[elm];
		if (! fnc) throw `(ExprEval)未対応の演算子・値です：${String(elm)}`;
		return fnc(a);
	}
	readonly #hFnc: IHFncCalc = {
		'!num!':	a=> a.shift(),
		'!str!':	a=> a.shift(),
		'!bool!':	a=> a.shift(),
		'!null!':	()=> null,
		'!var!':	a=> this.val.get(a.shift()),

		'!':	a=> ! this.#toBool(this.#calc(a.shift())),
		UnaryNegate:	a=> - this.#toNum(this.#calc(a.shift())),

		'**':	a=> this.#toNum(this.#calc(a.shift())) ** this.#toNum(this.#calc(a.shift())),
		'*':	a=> this.#toNum(this.#calc(a.shift())) * this.#toNum(this.#calc(a.shift())),
		'/':	a=> this.#toNum(this.#calc(a.shift())) / this.#toNum(this.#calc(a.shift())),
		'%':	a=> this.#toNum(this.#calc(a.shift())) % this.#toNum(this.#calc(a.shift())),

		'+':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return typeof b === 'string' || typeof c === 'string'
				? String(b) + String(c)
				: this.#toNum(b) + this.#toNum(c);
		},
		'-':	a=> this.#toNum(this.#calc(a.shift())) - this.#toNum(this.#calc(a.shift())),

		'<':	a=> this.#toNum(this.#calc(a.shift())) < this.#toNum(this.#calc(a.shift())),
		'<=':	a=> this.#toNum(this.#calc(a.shift())) <= this.#toNum(this.#calc(a.shift())),
		'>':	a=> this.#toNum(this.#calc(a.shift())) > this.#toNum(this.#calc(a.shift())),
		'>=':	a=> this.#toNum(this.#calc(a.shift())) >= this.#toNum(this.#calc(a.shift())),

		'==':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return b === null || c === null ? b === c : String(b) === String(c);
		},
		'!=':	a=> ! this.#hFnc['==']!(a),
		'===':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return typeof b === typeof c && b === c;
		},
		'!==':	a=> ! this.#hFnc['===']!(a),

		'&&':	a=> {
			const b = this.#toBool(this.#calc(a.shift()));
			const c = this.#toBool(this.#calc(a.shift()));
			return b && c;
		},
		'||':	a=> {
			const b = this.#toBool(this.#calc(a.shift()));
			const c = this.#toBool(this.#calc(a.shift()));
			return b || c;
		},
	};
	#toNum(v: T_VAL): number {
		const n = Number(v);
		if (Number.isNaN(n)) throw `(ExprEval)数値ではありません：${String(v)}`;
		return n;
	}
	#toBool(v: T_VAL): boolean {return Boolean(v) && v !== 'false'}
}
