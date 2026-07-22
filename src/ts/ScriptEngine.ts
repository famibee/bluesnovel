/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 試作版：シナリオ解析エンジン（超簡略版）
//	skynovel_esm/src/sn/ScriptIterator.ts, Main.ts#main() の基本ループを参考に、
//	試作に必要な最小限のタグのみサポートする。
//	・DOM / fetch に依存しないため bun test で直接検証できる。
//	・[l][p][s] で停止し、そこまでに生じた表示変化を T_ENGINE_ACTION[] として返す。
//	・戻り値をどう画面へ反映するかは呼び出し側（ScriptMng.ts）の責務とする。

import {VarStore, type T_VAL} from './VarStore';
import {ExprEval} from './ExprEval';

// [add_face]で定義した差分絵1件分。dx/dyは親画像(fn)の左上を原点(0,0)とした相対座標
//	（本家 skynovel_esm/src/sn/SpritesMng.ts の Iface 型に対応。blendmodeはCSSのmix-blend-modeへそのまま渡す想定）
export type T_FACE = {
	fn			: string;
	dx			: number;
	dy			: number;
	blendmode	: string;
};

export type T_ENGINE_ACTION =
	| {t: 'addLay'; cls: 'grp' | 'txt'; nm: string}
	| {t: 'chgPic'; nm: string; fn: string; aFace: T_FACE[]}	// aFaceは[lay face=...]で重ねる差分絵（重なり順＝配列順、後の要素ほど上）。無指定時は空配列
	| {t: 'chgBAlpha'; nm: string; b_alpha: number}	// [lay b_alpha=...]。文字レイヤ背景の不透明度（0.0～1.0）。背景のみを透過させ、文字は透過しない
	| {t: 'chgStr'; nm: string; str: string}		// そのレイヤの「そのページでの全文字列」
	| {t: 'addBtn'; layerNm: string; nm: string; text: string; label: string}	// 文字レイヤ(layerNm)をUIコンテナとしてボタンを追加。クリックでlabelへジャンプ（読み進め扱いにはしない）
	| {t: 'stop'; kind: 'l' | 'p' | 's'; key: string; nm: string}	// 状態確定ポイント（Caretakerキー、nmは待ち中の文字レイヤ）
;

export type T_TAG_PARSED = {
	name: string;
	args: {[k: string]: string};
};


export class ScriptEngine {
	// 本家 Grammar.ts 同様、「[tag ...]」「改行」「地の文」の3種でトークン化する
	//	（本家ほど厳密ではない。属性値の"["文字などは非対応 = 試作の割り切り）
	static readonly RE_TOKEN = /\[[^\]]*\]|\r\n|\n|[^\[\r\n]+/g;
	static tokenize(src: string): string[] {
		return src.match(this.RE_TOKEN) ?? [];
	}

	static readonly RE_ARG = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;
	static parseTag(token: string): T_TAG_PARSED {
		const inner = token.slice(1, -1).trim();
		const sp = inner.search(/\s/);
		const name = sp === -1 ? inner : inner.slice(0, sp);
		const args: {[k: string]: string} = {};
		if (sp !== -1) {
			const rest = inner.slice(sp + 1);
			this.RE_ARG.lastIndex = 0;
			let m: RegExpExecArray | null;
			// eslint-disable-next-line no-cond-assign
			while (m = this.RE_ARG.exec(rest)) args[m[1]!] = m[2] ?? m[3] ?? m[4] ?? '';
		}
		return {name, args};
	}


	readonly #aToken: string[];
	#idx = 0;
	readonly #hLabel: {[label: string]: number} = {};	// *label -> トークン索引
	#curTxtLayer = 'mes';
	readonly #hTxt: {[nm: string]: string} = {};		// レイヤ名 -> そのページの蓄積文字列
	#clearOnResume = false;	// 前回[p]で停止した後、次のstep()開始時に現在レイヤをクリアするか
	readonly #hFace: {[name: string]: T_FACE} = {};	// [add_face]で定義した差分名 -> {fn, dx, dy, blendmode}（本家 SpritesMng.#hFace 相当）

	// 変数ストア・式評価器（本家 Variable.ts/PropParser.ts の簡略版。VarStore.ts/ExprEval.ts参照）
	readonly #val = new VarStore;
	readonly #expr = new ExprEval(this.#val);

	// if/elsif/else/endifの再開位置スタック（本家 skynovel_esm/src/sn/ScriptIterator.ts:873 #aIfStk 相当）
	//	本家の初期値-1はcall/returnとの共存機構（csa保存・復元）用で、call未実装の現段階では不要なため単純な空配列とする
	readonly #aIfStk: number[] = [];

	constructor(readonly fn: string, src: string) {
		this.#aToken = ScriptEngine.tokenize(src);
		this.#aToken.forEach((tkn, i) => {
			// * ラベル（本家同様、先頭が'*'かつ1文字超のトークン。行頭のタブ/空白は無視する）
			const t = tkn.trimStart();
			if (t.charCodeAt(0) === 42 && t.length > 1) this.#hLabel[t.trim()] = i + 1;
		});

		// 組み込み変数の例（本家 val.defTmp() 相当。常にtmp:名前空間、読み取り専用・遅延評価）
		this.#val.defBuiltin('const.sn.scriptFn', ()=> this.fn);
	}

	// テスト・呼び出し側（将来のif実装等）から変数値を読むためのアクセサ
	getVal(name: string): T_VAL {return this.#val.get(name)}

	get idx() {return this.#idx}
	get atEnd() {return this.#idx >= this.#aToken.length}

	// [button]クリック時に呼ばれる：指定ラベルへ直接ジャンプする（読み進め＝Caretaker等には触れない。呼び出し側の責務）
	jumpToLabel(label: string) {
		const to = this.#hLabel[label];
		if (to === undefined) throw `[button] ラベル【${label}】が見つかりません（試作は同一ファイル内のみ対応）`;
		this.#idx = to;
	}

	// 次の[l][p][s]（またはスクリプト終端）まで進め、その間に生じた表示変化を返す
	step(): T_ENGINE_ACTION[] {
		const aAct: T_ENGINE_ACTION[] = [];
		if (this.#clearOnResume) {	// 前回[p]で停止した後の再開なので、現在レイヤを先にクリア
			this.#clearOnResume = false;
			this.#hTxt[this.#curTxtLayer] = '';
			aAct.push({t: 'chgStr', nm: this.#curTxtLayer, str: ''});
		}
		const len = this.#aToken.length;
		while (this.#idx < len) {
			const token = this.#aToken[this.#idx++]!;
			if (token === '' || token === '\n' || token === '\r\n') continue;

			const uc = token.trimStart().charCodeAt(0);	// TokenTopUnicode（本家命名に合わせる。行頭のタブ/空白は無視）
			if (uc === 59) {	// ; コメント：このトークンだけでなく、行末（次の改行トークン）まで丸ごと無視する
				//	コメント行中に[tag]が書かれていた場合、トークナイザは'['で別トークンに分割するため、
				//	このトークンだけをスキップすると[tag]部分が実行されてしまう（旧実装のbug）。
				//	そのため次の改行トークンの手前まで#idxを進めてから、通常のループへ戻る。
				while (this.#idx < len) {
					const nxt = this.#aToken[this.#idx];
					if (nxt === '\n' || nxt === '\r\n') break;
					this.#idx++;
				}
				continue;
			}
			if (uc === 42 && token.trimStart().length > 1) continue;	// *ラベル定義（実行時はスキップ）

			if (uc === 91) {	// [ タグ開始
				const {name, args} = ScriptEngine.parseTag(token);
				switch (name) {
				case 'add_lay': {
					const nm = args.layer ?? args.nm ?? '';
					if (! nm) throw '[add_lay] layerは必須です（試作仕様）';
					const cls = (args.class ?? 'txt').toLowerCase() === 'grp' ? 'grp' : 'txt';
					this.#hTxt[nm] = '';
					aAct.push({t: 'addLay', cls, nm});
					continue;
				}
				case 'current':	// デフォルト文字レイヤ切替（試作簡略：layer属性のみ）
					this.#curTxtLayer = args.layer ?? args.nm ?? this.#curTxtLayer;
					continue;

				case 'add_face': {	// 差分名称の定義（本家 SpritesMng.add_face() 相当。dx/dyは親画像基準の相対座標）
					const name = args.name ?? '';
					if (! name) throw '[add_face] nameは必須です（試作仕様）';
					if (this.#hFace[name]) throw `[add_face] 同一のname（${name}）に対して複数の画像を割り当てられません`;
					this.#hFace[name] = {
						fn			: args.fn || name,			// fn省略時はnameをファイル名として使用（本家と同様）
						dx			: Number(args.dx || '0'),
						dy			: Number(args.dy || '0'),
						blendmode	: args.blendmode || 'normal',
					};
					continue;
				}

				case 'lay': {		// 試作簡略：画像レイヤの絵（picまたはfn属性）変更、face属性による差分合成、及び文字レイヤ背景の不透明度（b_alpha）に対応
					// picは旧仕様との互換用、fnは本家と同じ属性名（faceと併用する場合はfnを使う）。両方指定時はfnを優先
					const picFn = args.fn || args.pic;
					if (picFn) {
						const aFace: T_FACE[] = [];
						if (args.face) {
							// 本家の csvFn = fn + ','+ face と同様、カンマ区切りで複数指定。重なり順＝記述順（後の要素ほど上）
							for (const nm of args.face.split(',')) {
								if (! nm) throw '[lay] face属性に空要素が含まれています';
								const f = this.#hFace[nm];
								if (! f) throw `[lay] face【${nm}】は[add_face]で未定義です`;
								aFace.push(f);
							}
						}
						aAct.push({t: 'chgPic', nm: args.layer ?? '', fn: picFn, aFace});
					}

					// b_alpha：文字レイヤ背景の不透明度。pic/fnとは無関係に単独でも併用でも指定可（本家同様、[lay]は複数属性を同時に受け付ける）
					if (args.b_alpha !== undefined) {
						const b_alpha = Number(args.b_alpha);
						if (Number.isNaN(b_alpha)) throw `[lay] b_alphaの値が不正です：${args.b_alpha}`;
						aAct.push({t: 'chgBAlpha', nm: args.layer ?? '', b_alpha});
					}
					continue;
				}

				case 'let': {	// 変数代入（試作簡略：単純代入のみ。+=等の複合代入演算子は未対応）
					const name = args.name ?? '';
					if (! name) throw '[let] nameは必須です（試作仕様）';
					// val属性は常に式として評価する（[if]のexp属性と同じ規約。本家の&付与方式のような
					// 「値のままか式評価かを接頭&で切り替える」分岐は未対応）。
					// そのため文字列リテラルを入れたい場合は val='"もじ"' のように、
					// タグ属性の引用符とは別に式側の引用符も必要（test/ScriptEngine.test.ts の
					// let_stringValue 参照、cast属性も未対応）。
					const exp = args.val ?? '';
					this.#val.set(name, this.#expr.parse(exp));
					continue;
				}

				case 'if':	// ifブロック開始（本家 ScriptIterator.ts:886 #if() のアルゴリズムを移植）
					this.#if(args);
					continue;

				// elsif/else/endifは「選ばれた分岐の実行が終わってこれらに辿り着いた」場合の処理で、
				// 3つとも全く同じ（本家 ScriptIterator.ts:84-86 hTag.else=hTag.elsif=hTag.endif=#endif() と同じ規約）
				case 'elsif': case 'else': case 'endif':
					this.#endif();
					continue;

				case 'r':		// 改行
					this.#appendTxt(aAct, '\n');
					continue;
				case 'er':		// ページ両面の文字消去（試作簡略：現在レイヤのみ）
					this.#hTxt[this.#curTxtLayer] = '';
					aAct.push({t: 'chgStr', nm: this.#curTxtLayer, str: ''});
					continue;

				case 'jump': {	// シナリオジャンプ（試作簡略：同一スクリプト内ラベルのみ）
					const label = args.label ?? '';
					const to = this.#hLabel[label];
					if (to === undefined) throw `[jump] ラベル【${label}】が見つかりません（試作は同一ファイル内のみ対応）`;
					this.#idx = to;
					continue;
				}

				case 'button': {	// ボタン表示（試作簡略：layer/nm/text/labelに対応）
					// クリック後のjump先はjumpToLabel()で別途処理する（読み進め扱いにはしないため）
					// layer: ボタンを乗せる「UIコンテナ」＝既存の文字レイヤのnm（省略時は現在の文字レイヤ）
					const layerNm = args.layer || this.#curTxtLayer;
					if (! layerNm) throw '[button] layerは必須です（試作仕様）';
					const label = args.label ?? '';
					if (! label) throw '[button] labelは必須です（試作仕様）';
					// nm: ボタン自身の識別名（同一layer内で一意）。省略時はlabelを流用（試作の割り切り）
					const nm = args.nm ?? label;
					aAct.push({t: 'addBtn', layerNm, nm, text: args.text ?? '', label});
					continue;
				}

				case 'l': case 'p': case 's':	// 行末クリック待ち／改ページ／停止
					if (name === 'p') this.#clearOnResume = true;	// [p]の次の進行時に現在レイヤをクリア（試作の改ページ挙動）
					aAct.push({t: 'stop', kind: name, key: `${this.fn}:${String(this.#idx)}`, nm: this.#curTxtLayer});
					return aAct;

				default:
					continue;	// 試作では未対応タグは無視（後の本実装で拡充）
				}
			}

			// 文字表示（プレーンテキスト＝地の文）
			this.#appendTxt(aAct, token);
		}
		return aAct;	// スクリプト終端まで到達
	}

	// [if]の開始処理。呼び出し時点でthis.#idxは既に[if ...]の次のトークンを指している
	//	（本家のidxTokenと同じ前提。本家 ScriptIterator.ts:886 #if() を移植）
	#if(args: {[k: string]: string}) {
		const exp = args.exp ?? '';
		if (! exp) throw '[if] expは必須です（試作仕様）';

		let idxGo = this.#expr.evalBool(exp) ? this.#idx : -1;
		let cntDepth = 0;	// 入れ子ifの深度カウンター（elsif/elseは深度を跨がないためifとendifのみ数える）
		const len = this.#aToken.length;
		for (; this.#idx < len; ++this.#idx) {
			const tkn = this.#aToken[this.#idx]!;
			const uc = tkn.trimStart().charCodeAt(0);
			if (uc !== 91) continue;	// [ タグ開始以外（地の文・改行）はこの時点ではまだ実行せず読み飛ばすだけ

			const {name, args: a2} = ScriptEngine.parseTag(tkn);
			switch (name) {
			case 'if':
				++cntDepth;	// 入れ子のifは深度だけ数える。中の条件は今は評価しない（後で通常実行時に評価される）
				continue;

			case 'elsif': {
				if (cntDepth > 0) continue;	// 入れ子if内のelsifはこのチェーンとは無関係
				if (idxGo > -1) continue;		// 既に確定済みなら以降の条件式は評価すらしない（本家と同じ短絡）

				const e = a2.exp ?? '';
				if (! e) throw '[elsif] expは必須です（試作仕様）';
				if (this.#expr.evalBool(e)) idxGo = this.#idx + 1;
				continue;
			}
			case 'else':
				if (cntDepth > 0) continue;
				if (idxGo === -1) idxGo = this.#idx + 1;
				continue;

			case 'endif':
				if (cntDepth > 0) {--cntDepth; continue}
				if (idxGo === -1) {
					++this.#idx;	// どの分岐も採用されなかった（elseもない）： [endif]の次からそのまま再開
				}
				else {
					// 選ばれた分岐を実行後、次に出会うelsif/else/endif（このifチェーン由来のもの）で
					// ここ（本当の[endif]の次）へ戻れるように記録してから、選ばれた分岐へジャンプする
					this.#aIfStk.push(this.#idx + 1);
					this.#idx = idxGo;
				}
				return;

			default:
				continue;
			}
		}
		throw '[if] に対応する [endif] が見つかりません（試作仕様）';
	}

	// [elsif]/[else]/[endif] に、選ばれた分岐の実行が「通常のトークン処理として」辿り着いた場合の処理
	#endif() {
		const t = this.#aIfStk.pop();
		if (t === undefined) throw '[if] に対応していない [elsif]/[else]/[endif] です';
		this.#idx = t;
	}

	#appendTxt(aAct: T_ENGINE_ACTION[], add: string) {
		const nm = this.#curTxtLayer;
		const str = (this.#hTxt[nm] ?? '') + add;
		this.#hTxt[nm] = str;
		aAct.push({t: 'chgStr', nm, str});
	}

}
