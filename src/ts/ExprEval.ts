/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {alt, lazy, of, optWhitespace, regex, seq, seqMap, string} from 'parsimmon';
import {int} from '../sn/CmnLib';
import type {T_VAL_D} from './VarStore';

type IFncCalc = (a: any[]) => any;
type IHFncCalc = {[key: string]: IFncCalc};

// 変数の読み取りだけを要求するインターフェース。
//	実行時は VarStore を渡すが、テストでは本家 test/ValTest.ts 同様の
//	「名前→値」の単純なテーブルを渡せるようにするため、最小限の形にしてある
export type T_VAR_GET = {get(name: string): T_VAL_D};

// 式評価器（本家 skynovel_esm/src/sn/PropParser.ts の移植）
//	[if]のexp属性、[let]のval属性、タグ属性の「&計算」書式で使う式を評価する。
//	当初はサブセットの自作実装だったが、本家 test/PropParser.test.ts をテスト駆動で
//	移植するにあたり、演算子表・評価関数とも本家の実装をそのまま持ち込んだ。
//	本家との差異：
//	・名前空間は本家の save: を game: という名前にしている（VarStore.ts の A_NS）。
//	　ただし**本家シナリオはどれも save: と書く**ので、こちらも別名として受ける
//	　（受けないと「save:」の「:」を三項演算子と誤認して文法エラーになる）
//	・例外メッセージの接頭辞は (PropParser) ではなく (ExprEval)
//	・evalBool() を追加（[if]/[elsif]用。本家は各タグ側で真偽判定している）
//TODO: 未サポート：インクリメント／デクリメント（本家同様、構文だけ受けて例外にする）
export class ExprEval {
	#parser: any = null;

	constructor(private readonly val: T_VAR_GET, ce = '\\') {
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
		function POSTFIX(operatorsParser: any, nextParser: any) {
			return seqMap(nextParser, operatorsParser.many(), (x: any, suffixes: any)=> suffixes.reduce((acc: any, y: any)=> [y, acc], x));
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
		// 左結合（例：1-2-3 は (1-2)-3）
		function BINARY_LEFT(operatorsParser: any, nextParser: any) {
			return seqMap(
				nextParser,
				seq(operatorsParser, nextParser).many(),
				(first: any, rest: any)=> rest.reduce((acc: any, ch: any)=> [ch[0], acc, ch[1]], first)
			);
		}

		const Num = alt(
			alt(
				regex(/-?(0|[1-9][0-9]*)\.[0-9]+/),
				regex(/0x[0-9a-fA-F]+/)		// 16進数リテラル
			).map(Number),
			alt(
				regex(/-?(0|[1-9][0-9]*)/)
			).map(n=> int(n))
		)
		.map(n=> ['!num!', n])
		.desc('number');

		const NullLiteral = string('null')
		.map(()=> ['!str!', null]);

		const BooleanLiteral = regex(/(true|false)/)
		.map(b=> ['!bool!', b === 'true'])
		.desc('boolean');

		// (new RegExp("~")) の場合は、バックスラッシュは２つ必要
		//	「"〜"」「'〜'」「#〜#」の三種。#〜#は引用符自体を書きたい場合に使う
		const StringLiteral = regex(new RegExp(`(?:"(?:\\${ce}["'#\\n]|[^"])*"|'(?:\\${ce}["'#\\n]|[^'])*'|\\#(?:\\${ce}["'#\\n]|[^#])*\\#)`))
			// https://regex101.com/r/Fs5wL3/1
			// 15 matches (279 steps, 0.1ms) by PCRE2
		.map(b=> ['!str!', b.slice(1, -1).replaceAll(ce, '')])
		.desc('string');

		// 変数参照。hA['args'] や hB[1 + 4] のような添字は、
		//	中身を先に評価してから「.」区切りの変数名へ組み立て直す
		const REG_BRACKETS = /\[[^\]]+\]/g;
		const VarLiteral = regex(/-?(?:(?:tmp|sys|game|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*(?:@str)?/)
		.map(b=> {
			const s = b.replaceAll(REG_BRACKETS, v=> '.'+ String(this.parse(v.slice(1, -1))));
			const v = this.val.get(s);
			if (v === null || v === undefined) return ['!str!', v];	// v == null は eqeqeq違反
			if (typeof v === 'boolean') return ['!bool!', v];

			return Object.prototype.toString.call(v) === '[object String]'
				? ['!str!', String(v)]
				: ['!num!', Number(v)];
		})
		.desc('string');

		const Basic = lazy(()=>
			string('(').then(this.#parser).skip(string(')'))
			.or(Num)
			.or(NullLiteral)
			.or(BooleanLiteral)
			.or(StringLiteral)
			.or(VarLiteral)
		);

		const table = [
			// 演算子の優先順位 - JavaScript | MDN https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_precedence
			// 優先順位：18（メンバーへのアクセス、計算値によるメンバーへのアクセス）
			{type: PREFIX, ops: ope([/[A-Za-z_][A-Za-z0-9_]*(?=\()/])},	// 関数呼び出し

			// 優先順位：16
			{type: POSTFIX, ops: opeH({PostfixInc: '++'})},
			{type: POSTFIX, ops: opeH({PostfixDec: '--'})},
				// 【未サポート】後置インクリメント・デクリメント
			// 優先順位：15
			{type: PREFIX, ops: ope([/!(?!=)|~/])},	// 論理 NOT (!)、ビット単位 NOT (~)
			{type: PREFIX, ops: opeH({PrefixInc: '++'})},
			{type: PREFIX, ops: opeH({PrefixDec: '--'})},
				// 【未サポート】前置インクリメント・デクリメント
			{type: PREFIX, ops: opeH({UnaryNegate: /-(?!-)/})},	// 単項マイナス

			// 優先順位：14以下（並びに注意）
			{type: BINARY_RIGHT, ops: ope(['**'])},
			{type: BINARY_LEFT, ops: ope(['*', '/', '¥', '%'])},
			{type: BINARY_LEFT, ops: ope(['+', '-'])},
			{type: BINARY_LEFT, ops: ope([/>>>|<<|>>/])},
			{type: BINARY_LEFT, ops: ope([/<=|<|>=|>/])},
			{type: BINARY_LEFT, ops: ope([/===|!==|==|!=/])},
			{type: BINARY_LEFT, ops: ope([/&(?!&)/])},
			{type: BINARY_LEFT, ops: ope(['^'])},
			{type: BINARY_LEFT, ops: ope([/\|(?!\|)/])},
			{type: BINARY_LEFT, ops: ope(['&&'])},
			{type: BINARY_LEFT, ops: ope(['||'])},
			{type: BINARY_RIGHT, ops: ope([':'])},
			{type: BINARY_RIGHT, ops: ope(['?'])},
		];

		this.#parser = table.reduce(
			(acc: any, level)=> level.type(level.ops, acc),
			Basic
		)
		.trim(optWhitespace);
	}

	parse(s: string): T_VAL_D {
		const p = this.#parser.parse(s);
		if (! p.status) throw Error(`(ExprEval)文法エラー【${s}】`);

		const a = p.value;
		if (a[0] === '!str!') return this.#procEmbedVar(a[1]);

		return this.#calc(a);
	}

	// [if]/[elsif]用：式を評価し、真偽値として判定する。
	//	文字列'false'は偽とする（本家の &&/|| が String(v)==='true' で判定するのに合わせた割り切り）
	evalBool(exp: string): boolean {
		const v = this.parse(exp);
		return Boolean(v) && v !== 'false';
	}

	#calc(a: any[]): T_VAL_D {
		const elm = a.shift();
		if (elm instanceof Array) return this.#calc(elm);

		const fnc = this.#hFnc[elm];
		return fnc ? fnc(a) : Object(null);
	}
	readonly #hFnc: IHFncCalc = {
		'!num!':	a=> a.shift(),
		'!str!':	a=> this.#procEmbedVar(a.shift()),
		'!bool!':	a=> a.shift(),

		PostfixInc:	()=> {throw Error('(ExprEval)後置インクリメントは未サポートです')},
		PostfixDec:	()=> {throw Error('(ExprEval)後置デクリメントは未サポートです')},
		PrefixInc:	()=> {throw Error('(ExprEval)前置インクリメントは未サポートです')},
		PrefixDec:	()=> {throw Error('(ExprEval)前置デクリメントは未サポートです')},

		// 論理 NOT
		'!':	a=> ! this.#hFnc.Boolean!(a),
		// チルダ演算子（ビット反転）
		'~':	a=> ~ Number(this.#calc(a.shift())),

		UnaryNegate:	a=> - this.#hFnc.Number!(a),

		// 乗算、除算、剰余
		'**':	a=> Number(this.#calc(a.shift())) ** Number(this.#calc(a.shift())),
		'*':	a=> Number(this.#calc(a.shift())) * Number(this.#calc(a.shift())),
		'/':	a=> Number(this.#calc(a.shift())) / Number(this.#calc(a.shift())),
		'¥':	a=> Math.floor(this.#hFnc['/']!(a)),	// 整数除算
		'%':	a=> Number(this.#calc(a.shift())) % Number(this.#calc(a.shift())),

		// 加算、減算、文字列の連結
		'+':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return Object.prototype.toString.call(b) === '[object String]'
				|| Object.prototype.toString.call(c) === '[object String]'
					? String(b) + String(c) : Number(b) + Number(c);
		},
		'-':	a=> Number(this.#calc(a.shift())) - Number(this.#calc(a.shift())),

		// 関数
		int:		a=> int(this.#fncSub_ChkNum(a.shift())),
		parseInt:	a=> int(this.#hFnc.Number!(a)),
		Number:		a=> {
			const b = this.#calc(a.shift());
			return Object.prototype.toString.call(b) === '[object String]'
				? this.#fncSub_ChkNum(this.#parser.parse(String(b)).value)
				: Number(b);
		},
		Boolean:	a=> {
			const b = a.shift();
			return b[0] === '!bool!' ? Boolean(b[1]) : Boolean(this.#calc(b));
		},
		ceil:	a=> Math.ceil(this.#fncSub_ChkNum(a.shift())),
		floor:	a=> Math.floor(this.#fncSub_ChkNum(a.shift())),
		round:	a=> Math.round(this.#fncSub_ChkNum(a.shift())),
		isNaN:	a=> Number.isNaN(this.#fncSub_ChkNum(a.shift())),

		// ビットシフト
		'<<':	a=> Number(this.#calc(a.shift())) << Number(this.#calc(a.shift())),
		'>>':	a=> Number(this.#calc(a.shift())) >> Number(this.#calc(a.shift())),
		'>>>':	a=> Number(this.#calc(a.shift())) >>> Number(this.#calc(a.shift())),

		// 小なり、以下、大なり、以上
		'<':	a=> Number(this.#calc(a.shift())) < Number(this.#calc(a.shift())),
		'<=':	a=> Number(this.#calc(a.shift())) <= Number(this.#calc(a.shift())),
		'>':	a=> Number(this.#calc(a.shift())) > Number(this.#calc(a.shift())),
		'>=':	a=> Number(this.#calc(a.shift())) >= Number(this.#calc(a.shift())),

		// 等値、非等値、厳密等価、厳密非等価
		'==':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			// eslint-disable-next-line eqeqeq
			return b == null && c == null ? b == c : String(b) === String(c);
		},
		'!=':	a=> ! this.#hFnc['==']!(a),
		'===':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return Object.prototype.toString.call(b) !== Object.prototype.toString.call(c)
				? false : String(b) === String(c);
		},
		'!==':	a=> ! this.#hFnc['===']!(a),

		// ビット演算子
		'&':	a=> Number(this.#calc(a.shift())) & Number(this.#calc(a.shift())),
		'^':	a=> Number(this.#calc(a.shift())) ^ Number(this.#calc(a.shift())),
		'|':	a=> Number(this.#calc(a.shift())) | Number(this.#calc(a.shift())),

		// 論理 AND,OR
		'&&':	a=> String(this.#calc(a.shift())) === 'true' &&
					String(this.#calc(a.shift())) === 'true',
		'||':	a=> String(this.#calc(a.shift())) === 'true' ||
					String(this.#calc(a.shift())) === 'true',

		// 条件（三項演算子）
		'?':	a=> {
			const cond = this.#hFnc.Boolean!(a);
			const elm2 = a.shift();
			if (elm2[0] !== ':') throw Error('(ExprEval)三項演算子の文法エラーです。: が見つかりません');

			return this.#calc(elm2[cond ?1 :2]);
		},
		':':	()=> {throw Error('(ExprEval)三項演算子の文法エラーです。? が見つかりません')},
	};
	#fncSub_ChkNum(v: any[]): number {
		const b = this.#calc(v);
		if (Object.prototype.toString.call(b) !== '[object Number]') throw Error(`(ExprEval)引数【${String(b)}】が数値ではありません`);
		return Number(b);
	}

	// 文字列リテラル中の変数埋め込み記法（本家 PropParser.#procEmbedVar()）
	//	・$名前		… 変数の値へ置換
	//	・#{式}		… 式の評価結果へ置換
	readonly #REG_EMBEDVAR = /(\$((tmp|sys|game|mp):)?[^\s!--/:-@[-^`{-~]+|#\{[^}]+})/g;
	#procEmbedVar(b: any): any {
		if (b === null || b === undefined) return b;
			// b == null は eqeqeq違反

		return String(b).replaceAll(
			this.#REG_EMBEDVAR,
			v=> String(v.startsWith('$')
				? this.val.get(v.slice(1))
				: this.parse(v.slice(2, -1)))
		);
	}

	// タグ属性値の「&計算」書式：先頭が&なら式として評価し、文字列化して返す
	//	（本家 PropParser.getValAmpersand()）
	getValAmpersand = (val: string)=> val.startsWith('&')
		? String(this.parse(val.slice(1)))
		: val;

}
