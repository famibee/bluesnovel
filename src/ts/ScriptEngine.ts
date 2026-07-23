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

import {VarStore, type T_VAL_D} from './VarStore';
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
	| {t: 'addBtn'; layerNm: string; nm: string; text: string; label: string; call?: boolean}	// 文字レイヤ(layerNm)をUIコンテナとしてボタンを追加。クリックでlabelへジャンプ（読み進め扱いにはしない）。call=true指定時はjumpではなくcall（サブルーチンコール）する
	| {t: 'trace'; text: string}	// [trace text=...]。表示には影響しない。実処理はScriptMng.ts #trace()（myTrace経由でデバッグ表示へ出力）
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
	//	call/return実装に伴い、本家同様「壁」(-1)を積む方式を導入した（#call()参照）。
	//	壁を挟むことで、サブルーチン内の[elsif]/[else]/[endif]がコール元の（まだ閉じていない）
	//	ifブロックを誤って終端させることを防ぐ（本家 ScriptIterator.ts:972 aIfStk.unshift(-1) 相当）
	readonly #aIfStk: number[] = [];

	// callスタック（本家 skynovel_esm/src/sn/ScriptIterator.ts:66 #aCallStk 相当の簡略版）
	//	試作では同一ファイル内ラベルのみ対応（jump/buttonと同じ制約）。
	//	本家CallStack.ts（sn/CallStack.ts）のhEvt1Time等マクロ機構前提のフィールドは
	//	今回も流用せず、必要最小限の型を独自定義する。
	//	hMpは本家 #callSub()（ScriptIterator.ts:962）のcsArg[':hMp']相当：
	//	callSub時点のmp:値を保存し、returnで復元する（[call]/マクロ呼び出し共通の仕組み。
	//	本家は#callSub()を両者で共有するため常にmp:の保存・復元が行われる。ここでも合わせる）
	readonly #aCallStk: {returnIdx: number; lenIfStk: number; hMp: {[key: string]: T_VAL_D}}[] = [];

	// マクロ定義：マクロ名 -> 本体開始位置（[macro name=...]の次のトークンの#idx）
	//	本家 ScriptIterator.ts:1363 #macro() と同じ「実行時定義」方式を採用。
	//	#aTokenは一切変更せず、本体トークンはそのままの位置に残したまま、
	//	実行が[macro]に到達した時点で開始位置だけを記録し、[endmacro]まで読み飛ばす。
	//	呼び出し時は[call]と同じ枠組みでこの位置へジャンプし、[endmacro]は[return]と同じ処理で戻る
	//	（本家 ScriptIterator.ts:100 hTag.endmacro = ()=> this.#return(o) と同じ規約）
	readonly #hMacro: {[name: string]: number} = {};

	// マクロ名として使用不可（既存タグと同名は不可。本家 ScriptIterator.ts:1366
	// if (name in this.hTag) throw と同じ意図）
	static readonly RESERVED_TAGS = new Set([
		'add_lay', 'current', 'add_face', 'lay', 'let',
		'if', 'elsif', 'else', 'endif',
		'r', 'er', 'trace',
		'jump', 'call', 'return', 'macro', 'endmacro',
		'button', 'l', 'p', 's',
	]);

	constructor(readonly fn: string, src: string) {
		this.#aToken = ScriptEngine.tokenize(src);

		// 組み込み変数：常に自分自身のfnを返す（本家 val.defTmp('const.sn.scriptFn', ...) 相当）
		this.#val.defBuiltin('const.sn.scriptFn', ()=> this.fn);

		// ラベル定義を記録
		this.#aToken.forEach((tkn, i) => {
			const t = tkn.trimStart();
			if (t.charCodeAt(0) === 42 && t.length > 1) this.#hLabel[t.trim()] = i + 1;
		});
	}

	// テスト・呼び出し側（将来のif実装等）から変数値を読むためのアクセサ
	getVal(name: string): T_VAL_D {return this.#val.get(name)}

	get idx() {return this.#idx}
	get atEnd() {return this.#idx >= this.#aToken.length}

	// [button]クリック時に呼ばれる：指定ラベルへ直接ジャンプする（読み進め＝Caretaker等には触れない。呼び出し側の責務）
	jumpToLabel(label: string) {
		const to = this.#hLabel[label];
		if (to === undefined) throw `[button] ラベル【${label}】が見つかりません（試作は同一ファイル内のみ対応）`;
		this.#idx = to;
	}

	// [button call=true]クリック時に呼ばれる：指定ラベルへサブルーチンコールする（[call]タグと同じ仕組み）。
	//	呼び出し後、[return]でコール元へ戻れる（#aCallStk＋ifスタックの壁(-1)を積む）。
	//	this.#idxは既に現在の停止点（[l]/[p]/[s]）の次のトークンを指しているため、
	//	それをreturnIdxとして記録し、step()再開時にそこへ戻る。
	callToLabel(label: string) {
		const to = this.#hLabel[label];
		if (to === undefined) throw `[button] ラベル【${label}】が見つかりません（試作は同一ファイル内のみ対応）`;
		// this.#idxは既に停止点の次のトークンを指している（#returnで戻る先）
		// hMp：[call]/マクロ呼び出しと同じく、呼び出し時点のmp:値を保存する（#doReturn()で復元）
		this.#aCallStk.push({returnIdx: --this.#idx, lenIfStk: this.#aIfStk.length, hMp: this.#val.cloneMp()});
		this.#aIfStk.push(-1);	// 壁：このサブルーチン内のelsif/else/endifがコール元のifへ抜けるのを防ぐ
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
				// タグ処理は#execTag()へ分離した（switch内を全てcontinueで終端する書き方だと、
				// 一部のlinter/tscの「フォールスルー」検知が誤検知しやすいため、
				// 呼び出し元へreturn値で明示的に結果を伝える方式にした。挙動は従来と同じ）
				if (this.#execTag(name, args, aAct) === 'stop') return aAct;
				continue;
			}

			// 文字表示（プレーンテキスト＝地の文）
			this.#appendTxt(aAct, token);
		}
		return aAct;	// スクリプト終端まで到達
	}

	// [ タグ ]トークン1件分の処理。戻り値：
	//	'skip' … このタグの処理を終え、通常どおり次のトークンへ進む
	//	'stop' … [l]/[p]/[s]による停止点。呼び出し元（step()）はaActをそのまま返す
	#execTag(name: string, args: {[k: string]: string}, aAct: T_ENGINE_ACTION[]): 'skip' | 'stop' {
		const len = this.#aToken.length;
		switch (name) {
		case 'add_lay': {
			const nm = args.layer ?? args.nm ?? '';
			if (! nm) throw '[add_lay] layerは必須です（試作仕様）';
			const cls = (args.class ?? 'txt').toLowerCase() === 'grp' ? 'grp' : 'txt';
			this.#hTxt[nm] = '';
			aAct.push({t: 'addLay', cls, nm});
			return 'skip';
		}
		case 'current':	// デフォルト文字レイヤ切替（試作簡略：layer属性のみ）
			this.#curTxtLayer = args.layer ?? args.nm ?? this.#curTxtLayer;
			return 'skip';

		case 'add_face': {	// 差分名称の定義（本家 SpritesMng.add_face() 相当。dx/dyは親画像基準の相対座標）
			const faceName = args.name ?? '';
			if (! faceName) throw '[add_face] nameは必須です（試作仕様）';
			if (this.#hFace[faceName]) throw `[add_face] 同一のname（${faceName}）に対して複数の画像を割り当てられません`;
			this.#hFace[faceName] = {
				fn			: args.fn || faceName,		// fn省略時はnameをファイル名として使用（本家と同様）
				dx			: Number(args.dx || '0'),
				dy			: Number(args.dy || '0'),
				blendmode	: args.blendmode || 'normal',
			};
			return 'skip';
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
			return 'skip';
		}

		case 'let': {	// 変数代入（試作簡略：単純代入のみ。+=等の複合代入演算子は未対応）
			const varName = args.name ?? '';
			if (! varName) throw '[let] nameは必須です（試作仕様）';
			// val属性は常に式として評価する（[if]のexp属性と同じ規約。本家の&付与方式のような
			// 「値のままか式評価かを接頭&で切り替える」分岐は未対応）。
			// そのため文字列リテラルを入れたい場合は val='"もじ"' のように、
			// タグ属性の引用符とは別に式側の引用符も必要（test/ScriptEngine.test.ts の
			// let_stringValue 参照、cast属性も未対応）。
			const exp = args.val ?? '';
			this.#val.set(varName, this.#expr.parse(exp));
			return 'skip';
		}

		case 'if':	// ifブロック開始（本家 ScriptIterator.ts:886 #if() のアルゴリズムを移植）
			this.#if(args);
			return 'skip';

		// elsif/else/endifは「選ばれた分岐の実行が終わってこれらに辿り着いた」場合の処理で、
		// 3つとも全く同じ（本家 ScriptIterator.ts:84-86 hTag.else=hTag.elsif=hTag.endif=#endif() と同じ規約）
		case 'elsif': case 'else': case 'endif':
			this.#endif();
			return 'skip';

		case 'r':		// 改行
			this.#appendTxt(aAct, '\n');
			return 'skip';
		case 'er':		// ページ両面の文字消去（試作簡略：現在レイヤのみ）
			this.#hTxt[this.#curTxtLayer] = '';
			aAct.push({t: 'chgStr', nm: this.#curTxtLayer, str: ''});
			return 'skip';

		case 'trace':	// デバッグ表示へ出力（実処理はScriptMng.ts #trace()。textが未指定でも空文字で積む）
			// 先頭が'&'の場合は式として評価する（本家の&接頭辞記法の簡略版。動作確認用にtraceのみ対応）
			aAct.push({t: 'trace', text: this.#evalAmpArg(args.text ?? '')});
			return 'skip';

		case 'jump': {	// シナリオジャンプ（試作簡略：同一スクリプト内ラベルのみ）
			const label = args.label ?? '';
			const to = this.#hLabel[label];
			if (to === undefined) throw `[jump] ラベル【${label}】が見つかりません（試作は同一ファイル内のみ対応）`;
			this.#idx = to;
			return 'skip';
		}

		case 'call': {	// サブルーチンコール（試作簡略：同一スクリプト内ラベルのみ。本家 ScriptIterator.ts:951 #call() 参照）
			const label = args.label ?? '';
			if (! label) throw '[call] labelは必須です（試作仕様）';
			const to = this.#hLabel[label];
			if (to === undefined) throw `[call] ラベル【${label}】が見つかりません（試作は同一ファイル内のみ対応）`;
			// this.#idxは既に[call ...]の次のトークンを指している（#returnで戻る先）
			// hMp：呼び出し時点のmp:値を保存（本家 #callSub() は[call]/マクロ呼び出し共通でこれを行う。
			// 通常の[call]ではmp:を変更しないため実質no-opの保存・復元だが、
			// サブルーチン内でmp:へ直接代入した場合に呼び出し元へ影響しないようにする効果がある）
			this.#aCallStk.push({returnIdx: this.#idx, lenIfStk: this.#aIfStk.length, hMp: this.#val.cloneMp()});
			this.#aIfStk.push(-1);	// 壁：このサブルーチン内のelsif/else/endifがコール元のifへ抜けるのを防ぐ
			this.#idx = to;
			return 'skip';
		}

		case 'return':	// サブルーチンから戻る（試作簡略：fn/label指定による戻り先変更は本家 #return() と異なり未対応）
			this.#doReturn();
			return 'skip';

		case 'macro': {	// マクロ定義の開始（本家 ScriptIterator.ts:1363 #macro() と同じ「実行時定義」方式）
			const macroName = args.name ?? '';
			if (! macroName) throw '[macro] nameは必須です（試作仕様）';
			if (ScriptEngine.RESERVED_TAGS.has(macroName)) throw `[${macroName}]はタグ名のため、マクロ名として使用できません`;
			if (macroName in this.#hMacro) throw `[macro] マクロ【${macroName}】は既に定義済みです`;
			this.#hMacro[macroName] = this.#idx;	// 本体開始位置（[macro ...]の次のトークン。呼び出し時のジャンプ先）

			// [endmacro]まで読み飛ばす（本家同様、マクロ本体は定義時には実行しない。
			// 入れ子の[macro]定義は試作では非対応：最初に見つけた[endmacro]で終端とみなす）
			let found = false;
			for (; this.#idx < len; ++this.#idx) {
				const tkn2 = this.#aToken[this.#idx]!;
				if (tkn2.trimStart().charCodeAt(0) !== 91) continue;	// [ タグ開始以外は読み飛ばす
				const {name: nm2} = ScriptEngine.parseTag(tkn2);
				if (nm2 === 'endmacro') {++this.#idx; found = true; break}
			}
			if (! found) throw `[macro] マクロ【${macroName}】が[endmacro]で閉じられていません（試作仕様）`;
			return 'skip';
		}

		case 'endmacro':	// マクロ本体の終端。[return]と全く同じ処理
			// （本家 ScriptIterator.ts:100 hTag.endmacro = ()=> this.#return(o) と同じ規約）
			this.#doReturn();
			return 'skip';

		case 'button': {	// ボタン表示（試作簡略：layer/nm/text/label/callに対応）
			// クリック後のjump先はjumpToLabel()で別途処理する（読み進め扱いにはしないため）
			// layer: ボタンを乗せる「UIコンテナ」＝既存の文字レイヤのnm（省略時は現在の文字レイヤ）
			const layerNm = args.layer || this.#curTxtLayer;
			if (! layerNm) throw '[button] layerは必須です（試作仕様）';
			const label = args.label ?? '';
			if (! label) throw '[button] labelは必須です（試作仕様）';
			// nm: ボタン自身の識別名（同一layer内で一意）。省略時はlabelを流用（試作の割り切り）
			const nm = args.nm ?? label;
			// call=true指定時：クリックでjumpではなくcall（サブルーチンコール）する
			const call = args.call === 'true';
			aAct.push({t: 'addBtn', layerNm, nm, text: args.text ?? '', label, call});
			return 'skip';
		}

		case 'l': case 'p': case 's':	// 行末クリック待ち／改ページ／停止
			if (name === 'p') this.#clearOnResume = true;	// [p]の次の進行時に現在レイヤをクリア（試作の改ページ挙動）
			aAct.push({t: 'stop', kind: name, key: `${this.fn}:${String(this.#idx)}`, nm: this.#curTxtLayer});
			return 'stop';

		default: {	// 未対応タグは無視するが、マクロ名として登録されていれば呼び出す
			// （本家はマクロ名をhTagへ動的登録して呼び出すが、試作はswitch文のため、
			// ここでマクロ登録テーブル#hMacroを直接参照する形にしている）
			const to = this.#hMacro[name];
			if (to === undefined) return 'skip';	// 試作では未対応タグは無視（後の本実装で拡充）

			// [call]と同じ枠組みでジャンプし、タグ属性をそのままmp:名前空間へ渡す
			// （本家 ScriptIterator.ts:1374-1392 のマクロ呼び出しハンドラを簡略化したもの。
			// const.sn.macro等のスクリプター用ブックキーピング情報は試作では省略）
			this.#aCallStk.push({returnIdx: this.#idx, lenIfStk: this.#aIfStk.length, hMp: this.#val.cloneMp()});
			this.#aIfStk.push(-1);
			this.#val.setMp(args);
			this.#idx = to;
			return 'skip';
		}
		}
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
		// undefined: スタックが空（対応する[if]がそもそもない）
		// -1: [call]が積んだ壁（このサブルーチン内に対応する[if]がない。コール元のif枠を誤って終端させない）
		if (t === undefined || t === -1) throw '[if] に対応していない [elsif]/[else]/[endif] です';
		this.#idx = t;
	}

	// [return]/[endmacro]共通の「呼び出し元へ戻る」処理
	//	（本家 ScriptIterator.ts:995 #return()、及び hTag.endmacro = ()=> this.#return(o) と同じ規約）
	#doReturn() {
		const cs = this.#aCallStk.pop();
		if (! cs) throw '[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）';
		// 呼び出し先で[if]が閉じきっていなくても、コール元のifスタックだけを確実に復元する
		// （本家 ScriptIterator.ts:999 aIfStk.slice(-lenIfStk) と同じ意図。押した側から詰め直す）
		this.#aIfStk.length = cs.lenIfStk;
		// mp:もコール元の値へ復元する（本家 #return() の csa[':hMp'] 復元と同じ。
		// 通常の[call]から戻る場合は元々変化していないため実質no-op）
		this.#val.setMp(cs.hMp);
		this.#idx = cs.returnIdx;
	}

	// タグ属性値の「&」記法対応：先頭が'&'の場合は残りを式として評価し文字列化して返す。
	// '&'がなければ今まで通りリテラル文字列のまま（本家の&接頭辞記法を必要最小限に簡略化）。
	// null・undefined（未定義変数の参照）は空文字にする（trace表示用の割り切り）。
	#evalAmpArg(raw: string): string {
		if (! raw.startsWith('&')) return raw;
		const v = this.#expr.parse(raw.slice(1));
		return v === null || v === undefined ? '' : String(v);
	}

	#appendTxt(aAct: T_ENGINE_ACTION[], add: string) {
		const nm = this.#curTxtLayer;
		const str = (this.#hTxt[nm] ?? '') + add;
		this.#hTxt[nm] = str;
		aAct.push({t: 'chgStr', nm, str});
	}

}
