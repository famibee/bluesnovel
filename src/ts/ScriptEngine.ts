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

import {VarStore, type T_CAST, type T_VAL_D} from './VarStore';
import {ExprEval} from './ExprEval';
import {splitAmpersand, tagToken2Name_Args} from '../sn/Grammar';
import {Script} from './Script';
import {AnalyzeTagArg} from '../sn/AnalyzeTagArg';
import {Areas, type T_H_Areas} from '../sn/Areas';

// [add_face]で定義した差分絵1件分。dx/dyは親画像(fn)の左上を原点(0,0)とした相対座標
//	（本家 skynovel_esm/src/sn/SpritesMng.ts の Iface 型に対応。blendmodeはCSSのmix-blend-modeへそのまま渡す想定）
export type T_FACE = {
	fn			: string;
	dx			: number;
	dy			: number;
	blendmode	: string;
};

// ページ裏表（本家 Pages.ts）。表(fore)＝今画面に見えている面、裏(back)＝次の場面を組み立てる面。
//	[trans]で入れ替えることで場面転換する。属性pageの既定は本家同様'fore'（Pages.argChk_page(hArg,'fore')）
export type T_PAGE = 'fore' | 'back';
// 消去系は両面まとめて指定できる（本家 LayerMng.ts:535 の page='both'）
export type T_PAGE_BOTH = T_PAGE | 'both';

// [lay]で指定できるレイヤ共通の見た目。**書かれた属性だけ**を持つ（未指定は現状維持。
//	本家 Layer.lay() も `'alpha' in hArg` のように書かれたかどうかで判定している）。
//	rotationは度（本家も flash 由来で度。pixiのradianではない）
export type T_LAY_STY_ARG = {
	visible?	: boolean;
	alpha?		: number;	// レイヤ全体の不透明度。文字レイヤ背景だけを透かすb_alphaとは別物
	left?		: number;
	top?		: number;
	rotation?	: number;
	scale_x?	: number;
	scale_y?	: number;
	b_color?	: number;	// 文字レイヤ背景色（0xRRGGBB）
	style?		: string;	// 文字レイヤへそのまま足すCSS
};

export type T_ENGINE_ACTION =
	| {t: 'addLay'; cls: 'grp' | 'txt'; nm: string}
	| {t: 'chgPic'; nm: string; page: T_PAGE; fn: string; aFace: T_FACE[]}	// aFaceは[lay face=...]で重ねる差分絵（重なり順＝配列順、後の要素ほど上）。無指定時は空配列
	| {t: 'chgBAlpha'; nm: string; page: T_PAGE; b_alpha: number}	// [lay b_alpha=...]。文字レイヤ背景の不透明度（0.0～1.0）。背景のみを透過させ、文字は透過しない
	| {t: 'trans'; aLayNm: string[] | null; time: number}	// [trans]。ページ裏表を交換する。aLayNm=nullは全レイヤ対象（layer属性省略時）。timeはミリ秒で、0なら演出無しで即交換
	| {t: 'waitTrans'; canskip: boolean}	// [wt]。[trans]の演出終了待ち。実際に待つのはScriptMngの担当なので、step()はここで一旦返る（canskip=falseならクリックで飛ばせない）
	| {t: 'chgStr'; nm: string; page: T_PAGE_BOTH; str: string}		// そのレイヤの「そのページでの全文字列」。[er]だけは両面（'both'）を消す
	| {t: 'addBtn'; layerNm: string; page: T_PAGE; nm: string; text: string; label: string; call?: boolean; fn?: string}	// 文字レイヤ(layerNm)をUIコンテナとしてボタンを追加。クリックでlabelへジャンプ（読み進め扱いにはしない）。call=true指定時はjumpではなくcall（サブルーチンコール）する。fn指定時は別スクリプトのラベルへ
	| {t: 'chgLay'; nm: string; page: T_PAGE; sty: T_LAY_STY_ARG}	// [lay]のレイヤ共通属性（visible/alpha/left/top/rotation/scale_*/b_color/style）。書かれた属性だけを持つ
	| {t: 'clearLay'; nm: string; page: T_PAGE_BOTH}	// [clear_lay]。見た目を初期値へ戻し中身も捨てる（visibleは触らない）
	| {t: 'clearPageLog'}	// [page clear=true]。読み戻り履歴（Caretaker）の消去。実処理はScriptMng
	| {t: 'trace'; text: string}	// [trace text=...]。表示には影響しない。実処理はScriptMng.ts #trace()（myTrace経由でデバッグ表示へ出力）
	| {t: 'stop'; kind: T_STOP_KIND; key: string; nm: string; resume?: T_RESUME}	// 状態確定ポイント（Caretakerキー、nmは待ち中の文字レイヤ）。resume指定時はクリック待ちせず自動進行（オート読み／既読スキップ）
	| {t: 'enableEvent'; nm: string; enabled: boolean}	// [enable_event]。文字レイヤのボタン等を有効／無効にする
	| {t: 'wait'; msec: number; canskip: boolean}	// [wait time=…]。実際に待つのはScriptMngの担当なので、step()はここで一旦返る
	| {t: 'loadScript'; fn: string; label: string; idx: number}	// 別スクリプトへの移動要求。fetchはScriptMngの責務なのでstep()はここで一旦返る。ScriptMngはロード後 switchScript() を呼んで続行する（labelが空ならidxの位置へ）
;

export type T_TAG_PARSED = {
	name: string;
	args: {[k: string]: string};
};

// [event]で予約したイベント1件分の「飛び先」。
//	本家（ReadingState の T_HEvt2Fnc）はキー -> コールバック関数の表だが、
//	試作のエンジンはDOMに触れない＝関数を作れないので、素のデータとして持つ。
//	実際にキー入力・クリックと結びつけるのは呼び出し側（ScriptMng/Main.tsx）の責務
export type T_EVENT_RSV = {fn: string; label: string; call: boolean; arg: string};

// 停止点での自動進行の指示（本家 Reading.ts l()/p() のオート読み・既読スキップ相当）。
//	mode='auto'：msec待ってから自動で読み進める（オート読み）。
//	mode='skip'：即座に読み進める（既読スキップ。msecは基本0）。
//	実際にタイマーを回す・ユーザー入力で止めるのは呼び出し側（ScriptMng）の責務
export type T_RESUME = {mode: 'auto' | 'skip'; msec: number};

// 停止点の種類。本家は[waitclick]も[s]と同じ関数（Reading.ts:712 hTag.waitclick = o=> rs.s(o)）を通り、
//	ReadingState_wait4Tag がタグ名で振り分けている：
//	's'はユーザー操作に反応しない（予約イベントのみ）が、'waitclick'はクリックで進む
export type T_STOP_KIND = 'l' | 'p' | 's' | 'waitclick';


export class ScriptEngine {
	// タグトークン1件を「タグ名」と「属性の連想配列」へ分解する（値は書かれたまま＝未解決）。
	//	本家と同じ Grammar.tagToken2Name_Args() ＋ AnalyzeTagArg を使うので、
	//	複数行タグ・タグ内コメント（;〜）・"'#の引用符・非ASCIIの属性名まで正しく扱える。
	//	実行時は代わりに#resolveTag()を通すこと。こちらは「実行を伴わない走査」用
	//	（[if]ブロックのelsif/else/endif探し、[macro]の[endmacro]探し）で、
	//	本家もその2箇所では#alzTagArg.hPrmの生の値を直接見ている（ScriptIterator.ts:912）
	static readonly #alzTagArg = new AnalyzeTagArg;
	static parseTag(token: string): T_TAG_PARSED {
		const [name, sArgs] = tagToken2Name_Args(token);
		ScriptEngine.#alzTagArg.parse(sArgs);
		const args: {[k: string]: string} = {};
		for (const [k, prm] of Object.entries(ScriptEngine.#alzTagArg.hPrm)) args[k] = prm.val;
		return {name, args};
	}

	// タグトークン1件を「タグ名」と「解決済みの属性」へ。全タグ共通の属性前処理で、
	//	本家 ScriptIterator.ts:418 タグ解析() の前半をそのまま移植したもの。扱うのは4つ：
	//	・cond属性  … 偽ならそのタグ自体を実行しない（undefinedを返す）
	//	・「*」     … 呼び出し元がこのマクロへ渡した属性を丸ごと引き継ぐ（isKomeParam）
	//	・「%属性名」… 同じくマクロ引数の参照。「|省略値」と組で使う
	//	・「&式」   … 属性値を式として評価する
	//	戻り値がundefinedなら「cond偽につきこのタグは無かったことにする」
	#resolveTag(token: string): T_TAG_PARSED | undefined {
		const [name, sArgs] = tagToken2Name_Args(token);
		const alz = ScriptEngine.#alzTagArg;
		alz.parse(sArgs);
		const hPrm = alz.hPrm;

		// cond属性：条件が偽ならこのタグを実行しない。
		//	expと同じく「&」は不要（付いていたら二重評価になるので例外）。
		//	本家は String(値) が 'null'/'undefined' でも偽とするので、それも移植する。
		//	文字列'false'を偽とするのはbluesnovel側の規約（ExprEval.evalBool()と揃える）
		const cond = hPrm.cond?.val;
		if (cond !== undefined) {
			if (! cond || cond.startsWith('&')) throw '属性condは「&」が不要です';
			const v = this.#expr.parse(cond);
			const s = String(v);
			if (! v || s === 'null' || s === 'undefined' || s === 'false') return undefined;
		}

		// 「%」「*」が参照するのは、今いるサブルーチン／マクロを呼んだタグの属性
		//	（本家 #aCallStk.at(-1).csArg）。[call]で積んだ枠でも参照できるのは本家と同じ
		const cs = this.#aCallStk.at(-1);
		const args: {[k: string]: string} = Object.create(null);
		if (alz.isKomeParam) {	// 「*」：受け取った属性を全て引き継ぐ
			if (! cs) throw '属性「*」はマクロのみ有効です';
			Object.assign(args, cs.hArgs);
		}

		for (const [k, {val, def}] of Object.entries(hPrm)) {
			let v = val;
			if (v.startsWith('%')) {	// 「%属性名」：このマクロが受け取った属性値
				if (! cs) throw '属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）';

				const mac = cs.hArgs[v.slice(1)];
				if (mac) {args[k] = mac; continue}	// 本家は真値判定（空文字は省略値へ回る）

				// 省略値が無い、または'null'指定なら属性そのものを渡さない（本家と同じ）
				if (def === undefined || def === 'null') continue;
				v = def;
			}

			// 「&式」なら評価する。値がundefinedになる場合は属性を渡さず、省略値があればそちらを試す
			v = this.#expr.getValAmpersand(v);
			if (v !== 'undefined') {args[k] = v; continue}
			if (def === undefined) continue;
			v = this.#expr.getValAmpersand(def);
			if (v !== 'undefined') args[k] = v;
		}
		return {name, args};
	}


	// 属性pageの検査（本家 Pages.ts:65 argChk_page()）。既定値は呼ぶ側のタグごとに違う
	//	（[lay]は'fore'、[clear_lay]は'back'）ので引数で受ける
	// 数値属性の検査（本家 CmnLib.argChk_Num() 相当。0x始まりは16進として読む）。
	//	空文字は弾く：JSの Number('') は 0 になってしまうため、属性の書き忘れを見逃さないようにする
	static #argNum(tag: string, nm: string, v: string): number {
		const n = v.trim() === '' ? NaN
			: v.startsWith('0x') ? parseInt(v.slice(2), 16) : Number(v);
		if (! Number.isFinite(n)) throw `[${tag}] ${nm}の値が不正です：${v}`;
		return n;
	}

	static argPage(args: {[k: string]: string}, def: T_PAGE): T_PAGE {
		const v = args.page ?? def;
		if (v === 'fore' || v === 'back') return v;
		throw `属性 page【${v}】が不正です`;
	}


	// 実行中のスクリプト（1ファイル分のパース結果）。switchScript()で差し替わる＝これがファイル切替。
	//	字句解析用のGrammarはScriptが持っているもの（＝プロジェクト共有インスタンス）を使う
	#script: Script;
	#idx = 0;
	// 連想配列はどれも Object.create(null) で作る。素の{}だと 'toString' 等の
	//	Object.prototype のキーが `in` や参照でヒットしてしまい、
	//	その名前のレイヤ・差分名・マクロを定義できなくなる
	#curTxtLayer = 'mes';
	readonly #hTxt: {[nm: string]: string} = Object.create(null);	// レイヤ名 -> そのページの蓄積文字列
	#clearOnResume = false;	// 前回[p]で停止した後、次のstep()開始時に現在レイヤをクリアするか
	readonly #hFace: {[name: string]: T_FACE} = Object.create(null);	// [add_face]で定義した差分名 -> {fn, dx, dy, blendmode}（本家 SpritesMng.#hFace 相当）

	// 変数ストア・式評価器（本家 Variable.ts/PropParser.ts の簡略版。VarStore.ts/ExprEval.ts参照）
	readonly #val = new VarStore;
	readonly #expr = new ExprEval(this.#val);

	// if/elsif/else/endifの再開位置スタック（本家 skynovel_esm/src/sn/ScriptIterator.ts:873 #aIfStk 相当）
	//	call/return実装に伴い、本家同様「壁」(-1)を積む方式を導入した（#call()参照）。
	//	壁を挟むことで、サブルーチン内の[elsif]/[else]/[endif]がコール元の（まだ閉じていない）
	//	ifブロックを誤って終端させることを防ぐ（本家 ScriptIterator.ts:972 aIfStk.unshift(-1) 相当）
	readonly #aIfStk: number[] = [];

	// callスタック（本家 skynovel_esm/src/sn/ScriptIterator.ts:66 #aCallStk 相当の簡略版）
	//	fnは呼び出し元のスクリプト名。別ファイルへ[call]した場合、[return]で
	//	そのファイルを読み直して戻る必要があるため保持する（本家 CallStack.fn 相当）。
	//	本家CallStack.ts（sn/CallStack.ts）のhEvt1Time等マクロ機構前提のフィールドは
	//	今回も流用せず、必要最小限の型を独自定義する。
	//	hMpは本家 #callSub()（ScriptIterator.ts:962）のcsArg[':hMp']相当：
	//	callSub時点のmp:値を保存し、returnで復元する（[call]/マクロ呼び出し共通の仕組み。
	//	本家は#callSub()を両者で共有するため常にmp:の保存・復元が行われる。ここでも合わせる）
	//	hEvtは[call]系（[call]・[button call=true]・イベントからのcall）のみに入る：
	//	コール時点のローカル予約イベントを退避し、[return]で書き戻す（本家 ScriptIterator.ts:955
	//	ReadingState.popLocalEvts() / :hEvt1Time / #return()のpushLocalEvts()）。
	//	マクロ呼び出しだけは退避しない（本家 ScriptIterator.ts:957「':hEvt1Time'の扱いだけは[macro]と異なる」）
	//	scrは呼び出し元のScript（＝呼び出し時点の#script）。isNextKidokuが別ファイルの
	//	呼び出し元の続きを見るために、そのトークン数（scr.len）を必要とする（本家 #hScript[cs.fn]）
	//	hArgsは「この枠を作った[call]/マクロ呼び出しタグの属性」（本家 csArg = {...hArg, …}）。
	//	マクロ本体の「%属性名」「*」がこれを参照する（#resolveTag()）。
	//	mp:変数でも同じ値が引けるが、mp:は読み出し時に自動キャストが掛かるので
	//	（'1.20'→1.2）、属性値をそのまま渡すために生の文字列を別途持っておく
	readonly #aCallStk: {fn: string; returnIdx: number; lenIfStk: number; hMp: {[key: string]: T_VAL_D}; hArgs: {[k: string]: string}; scr: Script; hEvt?: {[key: string]: T_EVENT_RSV}}[] = [];

	// 予約イベント表（本家 ReadingState.#hLocalEvt2Fnc / #hGlobalEvt2Fnc 相当）。
	//	ローカルは[call]で退避・[return]で復元、[jump]系のイベント発火で消去される「一回きり」の予約。
	//	グローバル（[event global=true]）はそれらに影響されず残り続ける
	#hLocalEvt: {[key: string]: T_EVENT_RSV} = Object.create(null);
	readonly #hGlobalEvt: {[key: string]: T_EVENT_RSV} = Object.create(null);

	// 既読領域（スクリプト名 -> 読んだトークン索引の集合。本家 Variable.#hAreaKidoku 相当）。
	//	本家はVariableが持ちSysBase.data.kidoku経由でlocalStorageへ保存するが、
	//	bluesnovelにはまだセーブ層が無いのでエンジンが抱える。
	//	セーブ層ができた時に繋げられるよう、getKidoku()/setKidoku()で出し入れできるようにしてある
	readonly #hAreaKidoku: {[fn: string]: Areas} = Object.create(null);
	#isKidoku = false;

	// マクロ定義：マクロ名 -> 本体開始位置（定義元のスクリプト名と、[macro name=...]の次のトークン索引）
	//	本家 ScriptIterator.ts:1363 #macro() と同じ「実行時定義」方式を採用。
	//	トークン列は一切変更せず、本体トークンはそのままの位置に残したまま、
	//	実行が[macro]に到達した時点で開始位置だけを記録し、[endmacro]まで読み飛ばす。
	//	呼び出し時は[call]と同じ枠組みでこの位置へジャンプし、[endmacro]は[return]と同じ処理で戻る
	//	（本家 ScriptIterator.ts:100 hTag.endmacro = ()=> this.#return(o) と同じ規約）
	readonly #hMacro: {[name: string]: {fn: string; idx: number}} = Object.create(null);

	// マクロ名に使えない文字（本家 ScriptIterator.ts:1362 #REG_NG4MAC_NM をそのまま移植）。
	//	" ' # ; \ ] と全角空白。タグ記述やタグ引数解析と衝突するため
	// eslint-disable-next-line no-irregular-whitespace
	static readonly REG_NG4MAC_NM = /["'#;\\\]　]+/;

	// マクロ名として使用不可（既存タグと同名は不可。本家 ScriptIterator.ts:1366
	// if (name in this.hTag) throw と同じ意図）
	static readonly RESERVED_TAGS = new Set([
		'add_lay', 'current', 'add_face', 'lay', 'clear_lay', 'trans', 'wt', 'let', 'let_ml', 'endlet_ml',
		'if', 'elsif', 'else', 'endif',
		'r', 'er', 'trace',
		'jump', 'call', 'return', 'macro', 'endmacro', 'char2macro', 'bracket2macro',
		'button', 'event', 'clear_event', 'enable_event', 'clearvar', 'clearsysvar', 'page',
		'wait', 'waitclick', 'l', 'p', 's',
	]);

	// 「定義済みのタグ・マクロ名」一覧。[char2macro]/[bracket2macro]のname属性検査に使う。
	//	本家はマクロもhTagへ動的登録するので `name in this.hTag` で済むが、
	//	試作はタグをswitch文で捌いているため、予約語表とマクロ表から都度組み立てる
	#hTagNames(): {[nm: string]: boolean} {
		const h: {[nm: string]: boolean} = Object.create(null);
		for (const nm of ScriptEngine.RESERVED_TAGS) h[nm] = true;
		for (const nm in this.#hMacro) h[nm] = true;
		return h;
	}

	// 第一引数はスクリプト名＋ソース、またはパース済みScript。
	//	変数・スタック等の実行状態はエンジン側が一手に持つので、
	//	ファイルを跨いでもこのインスタンスは作り直さない（switchScript()で切り替える）
	constructor(fn: string | Script, src = '') {
		this.#script = fn instanceof Script ? fn : new Script(fn, src);

		// 組み込み変数：常に「実行中の」スクリプト名を返す
		//	（本家 val.defTmp('const.sn.scriptFn', ...) 相当。遅延評価なので切替に自動追随する）
		this.#val.defBuiltin('const.sn.scriptFn', ()=> this.fn);

		// 組み込み変数：今いる位置が既読か。
		//	本家はトークンを読むたびtmp:へ代入するが（ScriptIterator.ts:1299）、
		//	こちらは他の組み込み変数と同じ遅延評価にした（参照時点の値は同じ）
		this.#val.defBuiltin('const.sn.isKidoku', ()=> this.#isKidoku);
	}

	// 実行中スクリプトの差し替え＝ファイル切替。
	//	ScriptMngが'loadScript'アクションを受けてfetch・パースした結果を渡してくる。
	//	labelが空ならidx（既定0）の位置から実行する
	switchScript(scr: Script, label = '', idx = 0) {
		this.#script = scr;
		if (! label) {this.#idx = idx; return}

		const to = scr.label2idx(label);
		if (to === undefined) throw `ラベル【${label}】がスクリプト【${scr.fn}】に見つかりません`;
		this.#idx = to;
	}

	// テスト・呼び出し側（将来のif実装等）から変数値を読むためのアクセサ
	getVal(name: string): T_VAL_D {return this.#val.get(name)}

	get fn() {return this.#script.fn}
	get idx() {return this.#idx}
	get atEnd() {return this.#idx >= this.#script.len}

	// [button]クリック時に呼ばれる：指定ラベルへ直接ジャンプする（読み進め＝Caretaker等には触れない。呼び出し側の責務）
	jumpToLabel(label: string) {
		const to = this.#script.label2idx(label);
		if (to === undefined) throw `[button] ラベル【${label}】が見つかりません`;
		this.#idx = to;
	}

	// [button call=true]クリック時に呼ばれる：指定ラベルへサブルーチンコールする（[call]タグと同じ仕組み）。
	//	呼び出し後、[return]でコール元へ戻れる（#aCallStk＋ifスタックの壁(-1)を積む）。
	//	this.#idxは既に現在の停止点（[l]/[p]/[s]）の次のトークンを指しているため、
	//	それをreturnIdxとして記録し、step()再開時にそこへ戻る。
	callToLabel(label: string) {
		const to = this.#script.label2idx(label);
		if (to === undefined) throw `[button] ラベル【${label}】が見つかりません`;
		// this.#idxは既に停止点の次のトークンを指している（#returnで戻る先）
		// hMp：[call]/マクロ呼び出しと同じく、呼び出し時点のmp:値を保存する（#doReturn()で復元）
		this.#pushCallStk(--this.#idx);
		this.#idx = to;
	}

	// [button fn=… call=true]クリック時：別ファイルのラベルへサブルーチンコールする。
	//	スクリプトのロードは呼び出し側（ScriptMng）が済ませてからScriptを渡してくる
	callToScript(scr: Script, label = '') {
		this.#pushCallStk(--this.#idx);	// callToLabel()と同じく、戻り先は今いる停止点そのもの
		this.switchScript(scr, label);
	}

	// ===== 既読処理 =====
	//	「どのスクリプトのどのトークンまで読んだか」を領域集合（Areas）で覚える。
	//	用途は既読スキップ・オート読みの待ち時間切替・[if exp="const.sn.isKidoku"]による分岐

	// 今いる位置が既読か（本家 ScriptIterator.isKidoku）
	get isKidoku() {return this.#isKidoku}

	// 現在位置（これから読むトークン）の既読判定と記録（本家 ScriptIterator.ts:1292 #recordKidoku()）。
	//	本家同様、保存（saveKidoku相当）はここでは行わない＝毎トークンでは重いので、
	//	セーブ層を作る際に停止点（[l]/[p]/[s]）で吐き出す形にする
	#recordKidoku() {
		const ar = this.#hAreaKidoku[this.fn] ??= new Areas;

		// マクロ内やサブルーチンではisKidokuを変更させない（本家のコメントそのまま）。
		//	同じサブルーチンが未読・既読どちらの文脈からも呼ばれるため
		if (this.#aCallStk.length > 0) {ar.record(this.#idx); return}

		this.#isKidoku = ar.search(this.#idx);
		if (this.#isKidoku) return;
		ar.record(this.#idx);
	}
	// 現在位置を未読へ戻す（本家 #eraseKidoku()）。[jump count=false]／[call]（count=true以外）から呼ばれる
	#eraseKidoku() {
		this.#hAreaKidoku[this.fn]?.erase(this.#idx);
		this.#isKidoku = false;
	}

	// 既読情報の出し入れ。将来のセーブ層（本家 Variable.saveKidoku() / SysBase.data.kidoku）用
	getKidoku(): {[fn: string]: T_H_Areas} {
		const h: {[fn: string]: T_H_Areas} = {};
		for (const [fn, ar] of Object.entries(this.#hAreaKidoku)) h[fn] = ar.val();
		return h;
	}
	setKidoku(h: {[fn: string]: T_H_Areas}) {	// ロード＝丸ごと置き換え
		for (const fn in this.#hAreaKidoku) delete this.#hAreaKidoku[fn];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
		this.#isKidoku = false;
		for (const [fn, v] of Object.entries(h)) this.#hAreaKidoku[fn] = Areas.from(v);
	}
	// [clearsysvar]から呼ばれる既読情報の全消去（本家 Variable #clearsysvar() の ar.clear()）
	clearKidoku() {
		for (const ar of Object.values(this.#hAreaKidoku)) ar.clear();
		this.#isKidoku = false;
	}


	// ===== オート読み・既読スキップ =====
	//	3つのフラグはただのtmp変数（`&sn.auto.enabled = true`等で設定）。本家は静的フィールドに
	//	ミラーして高速参照するが、試作は停止点でのみ参照するので毎回変数を読むだけにした。
	//	判断はエンジン（純粋ロジック）、タイマーとユーザー入力での中断はScriptMngが持つ

	get autoEnabled() {return this.#flag('sn.auto.enabled')}	// オート読み（一定時間で自動進行）
	get skipEnabled() {return this.#flag('sn.skip.enabled')}	// 既読スキップ（既読部分を素早く進行）
	get skipAll()     {return this.#flag('sn.skip.all')}	// falseなら既読のみスキップ、trueなら未読も含め全部
	#flag(name: string): boolean {return this.#val.get(`tmp:${name}`) === true}

	// オート・スキップの解除（本家 ReadingState.cancelAutoSkip()）。3フラグを倒す。
	//	[s]到達・未読での停止・ユーザーの手動操作から呼ばれる
	cancelAutoSkip() {
		this.#val.set('tmp:sn.skip.enabled', false);
		this.#val.set('tmp:sn.skip.all', false);
		this.#val.set('tmp:sn.auto.enabled', false);
	}

	// 次に読むトークン（現在位置）が既読か（本家 ScriptIterator.isNextKidoku）。
	//	既読スキップを「未読に来たら止める」ために使う。
	//	サブルーチン内（コールスタックあり）では、本家同様「呼び出し元の続き」を見る
	//	（サブルーチンを抜けた後に読む位置＝呼び出し元の戻り先。別ファイルでも可）
	get isNextKidoku(): boolean {
		let fn = this.fn;
		let idx = this.#idx;
		let len = this.#script.len;
		const cs = this.#aCallStk.at(-1);
		if (cs) {fn = cs.fn; idx = cs.returnIdx; len = cs.scr.len}

		if (idx >= len) return false;	// スクリプト終端＝この先に読むものが無い
		return this.#hAreaKidoku[fn]?.search(idx) ?? false;
	}

	// 停止点（[l]/[p]/[s]）での自動進行指示を決める（本家 Reading.ts l()/p()/s() のオート・スキップ分岐）
	#calcResume(kind: T_STOP_KIND): T_RESUME | undefined {
		// [s]/[waitclick]は必ず止まる＝オート・スキップ解除（本家 Reading s() の cancelAutoSkip()。
		//	[waitclick]も同じ関数を通るので同じ扱いになる）
		if (kind === 's' || kind === 'waitclick') {this.cancelAutoSkip(); return undefined}

		if (this.autoEnabled) return {mode: 'auto', msec: this.#autoMsec(kind === 'p')};

		if (this.skipEnabled) {
			// 未読に来たら止める（skip.all時は未読も飛ばす）。本家 Reading l()/p() と同じ
			if (! this.skipAll && ! this.isNextKidoku) {this.cancelAutoSkip(); return undefined}
			// スキップモード（本家 sys:sn.skip.mode。既定's'）。
			//	's'：行[l]も改ページ[p]も飛ばす。'p'：行は飛ばすが改ページ[p]では止まる。
			//	（本家 Reading p() は mode==='s' のときだけ改ページを飛ばす）
			if (kind === 'p' && this.#skipMode() !== 's') return undefined;
			return {mode: 'skip', msec: 0};
		}
		return undefined;	// 通常のクリック待ち
	}
	#skipMode(): string {
		const v = this.#val.get('sys:sn.skip.mode');
		return v === undefined || v === null ? 's' : String(v);	// 未設定時の既定は本家に合わせ's'
	}
	// オート読みの待ち時間。既読なら_Kidoku側の設定を使う（本家 sys:sn.auto.msec*Wait[_Kidoku]）。
	//	sys変数が未設定でも動くよう既定値を持つ（行=500ms／改ページ=3500ms）
	#autoMsec(isPage: boolean): number {
		const base = isPage ? 'sn.auto.msecPageWait' : 'sn.auto.msecLineWait';
		const v = Number(this.#val.get(`sys:${base}${this.isKidoku ? '_Kidoku' : ''}`));
		return Number.isFinite(v) && v > 0 ? v : isPage ? 3500 : 500;
	}


	// ===== 予約イベント（[event]） =====
	//	キー入力・クリックそのものはDOM側の話なので、エンジンは「予約表」と
	//	「発火時に実行位置をどう動かすか」だけを受け持つ。
	//	どのキー名で引くか（'click'やe.keyの小文字化）は呼び出し側（Main.tsx）の取り決め

	// 予約を引く。ローカル優先（本家 ReadingState.getEvt2Fnc()）
	getEvent(key: string): T_EVENT_RSV | undefined {
		const k = key.toLowerCase();
		return this.#hLocalEvt[k] ?? this.#hGlobalEvt[k];
	}
	clearEvent(global = false) {
		if (! global) {this.#hLocalEvt = Object.create(null); return}
		for (const k in this.#hGlobalEvt) delete this.#hGlobalEvt[k];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
	}
	#popLocalEvt(): {[key: string]: T_EVENT_RSV} {
		const h = this.#hLocalEvt;
		this.#hLocalEvt = Object.create(null);
		return h;
	}

	// 予約イベントの発火（本家 Main.ts:167 resumeByJumpOrCall() 相当。url指定は試作では非対応）。
	//	予約が無ければundefinedを返す＝呼び出し側は通常の読み進めを行う。
	//	予約があればtmp:変数をセットし、jump系ならローカル予約イベントを消して（本家も同じ）
	//	飛び先を返す。実際の移動（ラベルジャンプ／サブルーチンコール／別ファイルのロード）は
	//	[button]クリックと同じ経路＝ScriptMng.jumpToLabelAndGo()に任せる
	beginEvent(key: string): T_EVENT_RSV | undefined {
		const ev = this.getEvent(key);
		if (! ev) return undefined;

		this.#val.set('tmp:sn.eventArg', ev.arg);
		this.#val.set('tmp:sn.eventLabel', ev.label);
		if (! ev.call) this.clearEvent();	// jump系：一回きりの予約なので消す（callは#pushCallStkが退避する）
		return ev;
	}

	// コールスタックへ1段積む（[call]・マクロ呼び出し・[button call=true]で共通）。
	//	popLocalEvt=trueならローカル予約イベントをここへ退避し、現在の表を空にする
	//	（＝サブルーチンへは持ち込まない。[return]で書き戻す）。マクロ呼び出しだけはfalse。
	//	hArgsは呼び出したタグの属性（マクロ本体の「%属性名」「*」が参照する）
	#pushCallStk(returnIdx: number, popLocalEvt = true, hArgs: {[k: string]: string} = {}) {
		this.#aCallStk.push({
			fn			: this.fn,
			returnIdx,
			lenIfStk	: this.#aIfStk.length,
			hMp			: this.#val.cloneMp(),
			hArgs,
			scr			: this.#script,	// 呼び出し元（=今の）Script。isNextKidokuで別ファイルのトークン数を引く
			...popLocalEvt ?{hEvt: this.#popLocalEvt()} :{},
		});
		this.#aIfStk.push(-1);	// 壁：このサブルーチン内のelsif/else/endifがコール元のifへ抜けるのを防ぐ
	}

	// 次の[l][p][s]（またはスクリプト終端）まで進め、その間に生じた表示変化を返す
	step(): T_ENGINE_ACTION[] {
		const aAct: T_ENGINE_ACTION[] = [];
		if (this.#clearOnResume) {	// 前回[p]で停止した後の再開なので、現在レイヤを先にクリア
			this.#clearOnResume = false;
			this.#hTxt[this.#curTxtLayer] = '';
			aAct.push({t: 'chgStr', nm: this.#curTxtLayer, page: 'fore', str: ''});
		}
		// トークン数は毎回読み直す。[char2macro]/[bracket2macro]は定義位置より後ろの
		//	トークンをその場で置換する＝実行中にトークン数が増減しうるため、キャッシュできない
		while (this.#idx < this.#script.len) {
			this.#recordKidoku();	// 読む直前の位置で既読判定・記録する（本家 #nextToken_Proc() と同じ場所）
			const token = this.#script.aToken[this.#idx++]!;

			// トークン先頭一文字での振り分け。本家 Main.ts:221 #main() と同じ並び
			//	（Grammarのトークンは行頭のタブ・改行・コメントが必ず独立するので、
			//	trimStart()の必要が無くなった）
			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (uc === 9 || uc === 10) continue;	// \t タブ / \n 改行（連続分がまとめて1トークン）

			if (uc === 91) {	// [ タグ開始
				const rt = this.#resolveTag(token);
				if (! rt) continue;	// cond属性が偽：このタグは実行しない（本家 タグ解析() と同じく丸ごと無視）
				const {name, args} = rt;
				// タグ処理は#execTag()へ分離した（switch内を全てcontinueで終端する書き方だと、
				// 一部のlinter/tscの「フォールスルー」検知が誤検知しやすいため、
				// 呼び出し元へreturn値で明示的に結果を伝える方式にした。挙動は従来と同じ）
				if (this.#execTag(name, args, aAct) === 'stop') return aAct;
				continue;
			}

			let txt = token;
			const ce = this.#script.grm.ce;	// エスケープ文字（prj.jsonのinit.escape。未設定なら空文字）
			if (ce && token.length > 1 && token.startsWith(ce)) {
				// エスケープシーケンス（\[ など）。Grammarが2文字で1トークンにしているので、
				//	タグやコメントとして解釈されることはない。表示時に1文字目を落とす
				//	（本家は表示側 RubySpliter.putTxt() で同じことをしている）
				txt = token.slice(1);
			}
			else if (uc === 38) {	// & 変数操作・変数表示（本家 Main.ts:243）
				if (! token.endsWith('&')) {this.#letAmpersand(token); continue}	// ＆代入

				// ＆表示＆：式の評価結果をそのまま文字表示へ回す
				if (token.charAt(1) === '&') throw '「&表示&」書式では「&」指定が不要です';
				const v = this.#expr.parse(token.slice(1, -1));
				txt = v === null || v === undefined ? '' : String(v);
			}
			else if (uc === 59) continue;	// ; コメント（行末までで1トークン）
			else if (uc === 42 && token.length > 1) continue;	// * ラベル定義（実行時はスキップ）

			// 文字表示（プレーンテキスト＝地の文）
			this.#appendTxt(aAct, txt);
		}
		return aAct;	// スクリプト終端まで到達
	}

	// 「&名前 = 式 [= キャスト]」書式による変数代入（本家 Main.ts:246、[let]タグ相当）。
	//	「&&式 = 式」と書くと、変数名の側も式として評価される（本家 #getValAmpersand()）
	#letAmpersand(token: string) {
		const {name, text, cast} = splitAmpersand(token.slice(1));
		this.#val.set(
			this.#expr.getValAmpersand(name.trim()),
			this.#expr.parse(text),
			<T_CAST>(cast ?? ''),
		);
	}

	// [ タグ ]トークン1件分の処理。戻り値：
	//	'skip' … このタグの処理を終え、通常どおり次のトークンへ進む
	//	'stop' … [l]/[p]/[s]による停止点。呼び出し元（step()）はaActをそのまま返す
	#execTag(name: string, args: {[k: string]: string}, aAct: T_ENGINE_ACTION[]): 'skip' | 'stop' {
		const len = this.#script.len;
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
			const page = ScriptEngine.argPage(args, 'fore');	// 書き込み先のページ（本家 Pages.argChk_page(hArg, 'fore')）
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
				aAct.push({t: 'chgPic', nm: args.layer ?? '', page, fn: picFn, aFace});
			}

			// b_alpha：文字レイヤ背景の不透明度。pic/fnとは無関係に単独でも併用でも指定可（本家同様、[lay]は複数属性を同時に受け付ける）
			if (args.b_alpha !== undefined) {
				const v = Number(args.b_alpha);
				if (Number.isNaN(v)) throw `[lay] b_alphaの値が不正です：${args.b_alpha}`;
				// 値域0.0〜1.0に収める。本家（TxtLayer.ts:387 argChk_Num）はクランプせず素通しするが、
				//	CSSのrgba()が描画時に丸めるだけで、ストア（＝Memento・デザインモードが読む状態）には
				//	範囲外の値が残ってしまうため、ここで正規化する。
				//	例外にはしない：本家が通すスクリプトをbluesnovelだけが弾くことのないようにする
				aAct.push({t: 'chgBAlpha', nm: args.layer ?? '', page, b_alpha: Math.min(1, Math.max(0, v))});
			}

			// レイヤ共通の見た目。書かれた属性だけを拾う（本家 Layer.lay() の `'x' in hArg` 判定と同じ）
			const sty: T_LAY_STY_ARG = {};
			if (args.visible !== undefined) sty.visible = args.visible !== 'false';
			if (args.alpha !== undefined) sty.alpha = ScriptEngine.#argNum('lay', 'alpha', args.alpha);
			if (args.left !== undefined) sty.left = ScriptEngine.#argNum('lay', 'left', args.left);
			if (args.top !== undefined) sty.top = ScriptEngine.#argNum('lay', 'top', args.top);
			if (args.rotation !== undefined) sty.rotation = ScriptEngine.#argNum('lay', 'rotation', args.rotation);
			if (args.scale_x !== undefined) sty.scale_x = ScriptEngine.#argNum('lay', 'scale_x', args.scale_x);
			if (args.scale_y !== undefined) sty.scale_y = ScriptEngine.#argNum('lay', 'scale_y', args.scale_y);
			if (args.b_color !== undefined) sty.b_color = ScriptEngine.#argNum('lay', 'b_color', args.b_color);
			if (args.style !== undefined) sty.style = args.style;
			if (Object.keys(sty).length > 0) aAct.push({t: 'chgLay', nm: args.layer ?? '', page, sty});
			return 'skip';
		}

		case 'clear_lay': {	// レイヤ設定の消去（本家 LayerMng.ts:528 #clear_lay()）
			// pageの既定は本家同様'back'（LayerMng.ts:1100 の[button]と同じく、裏を組む用途が主なため）。
			//	page=bothで両面まとめて消せる（本家 LayerMng.ts:535）
			const sPage = args.page ?? 'back';
			if (sPage !== 'fore' && sPage !== 'back' && sPage !== 'both') throw `属性 page【${sPage}】が不正です`;
			// layerはカンマ区切りで複数可。省略時は全レイヤだが、エンジンはレイヤ一覧を持たないので必須とした
			//TODO: [add_lay]済みレイヤ名をエンジンでも覚え、layer省略＝全レイヤに対応する
			const sLay = args.layer ?? '';
			if (! sLay) throw '[clear_lay] layerは必須です（試作仕様）';
			for (const nm of sLay.split(',').map(v=> v.trim())) {
				if (! nm) throw '[clear_lay] layer属性に空要素が含まれています';
				aAct.push({t: 'clearLay', nm, page: sPage});
			}
			return 'skip';
		}

		case 'trans': {	// ページ裏表を交換（本家 LayerMng.ts:603 #trans()）
			// layer属性は交換するレイヤ名のカンマ区切り。省略時は全レイヤ（＝null）。
			//	指定外のレイヤは交換されず、画面上そのまま残る（本家の「transしないために交換する」相当）
			const sLay = args.layer ?? '';
			const aLayNm = sLay ? sLay.split(',').map(v=> v.trim()).filter(v=> v !== '') : null;
			if (aLayNm?.length === 0) throw '[trans] layer属性が空です';

			const time = Number(args.time ?? '0');
			if (! Number.isFinite(time) || time < 0) throw `[trans] timeの値が不正です：${args.time ?? ''}`;
			// 既読スキップ中は演出せず即座に交換する（本家 #trans() の `time === 0 || isSkipping`）
			aAct.push({t: 'trans', aLayNm, time: this.skipEnabled ? 0 : time});
			return 'skip';
			// [trans]自体は待たない（本家 #trans() も false を返す＝待ちに入らない）。
			//	演出の終了を待ちたい場合はスクリプト側で[wt]を書く
		}

		case 'wt': {	// [trans]の演出終了待ち（本家 CmnTween.ts:249 wt()）
			// canskipの既定はtrue＝クリックで飛ばせる。飛ばす際は必ず「演出の終了状態」へ進めるので、
			//	中途半端な見た目で止まることはない（本家 stopEndTrans() の stop().end() と同じ考え方）。
			//	実際に待つのはScriptMng（＝演出を動かすDOM側）の担当なので、step()はここで一旦返す
			aAct.push({t: 'waitTrans', canskip: (args.canskip ?? 'true') !== 'false'});
			return 'stop';
		}

		case 'let': {	// 変数代入（試作簡略：単純代入のみ。+=等の複合代入演算子は未対応）
			const varName = args.name ?? '';
			if (! varName) throw '[let] nameは必須です（試作仕様）';
			// val属性は常に式として評価する（[if]のexp属性と同じ規約。本家の&付与方式のような
			// 「値のままか式評価かを接頭&で切り替える」分岐は未対応）。
			// そのため文字列リテラルを入れたい場合は val='"もじ"' のように、
			// タグ属性の引用符とは別に式側の引用符も必要（test/ScriptEngine.test.ts の
			// let_stringValue 参照）。
			const exp = args.val ?? '';
			this.#val.set(varName, this.#expr.parse(exp), <T_CAST>(args.cast ?? ''));
			return 'skip';
		}

		case 'let_ml': {	// インラインテキスト代入（本家 ScriptIterator.ts:718 #let_ml()）
			// Grammarが「[let_ml …]」と「その本文」を別トークンに割ってくれているので、
			//	次のトークンをそのまま（式評価も改行の解釈もせず）変数へ入れるだけでよい。
			//	用途はシェーダーのソースやJSONの埋め込みなど「そのままの複数行テキスト」
			const varName = args.name ?? '';
			if (! varName) throw '[let_ml] nameは必須です';

			let ml = '';
			for (; this.#idx < len; ++this.#idx) {	// 空トークンは読み飛ばす（本家踏襲）
				ml = this.#script.aToken[this.#idx]!;
				if (ml !== '') break;
			}
			if (this.#script.grm.testTagEndLetml(ml)) {	// 本文が空（[let_ml …][endlet_ml]）
				//	この場合Grammarのlet_mlルール（本文が1文字以上必要）にマッチせず、
				//	[let_ml …]は普通のタグトークンになるため、次は[endlet_ml]そのもの
				this.#val.set(varName, '', 'str');
				++this.#idx;
				return 'skip';
			}
			if (! this.#script.grm.testTagEndLetml(this.#script.aToken[this.#idx +1] ?? '')) {
				throw `[let_ml] 変数【${varName}】の終端・[endlet_ml]がありません`;
			}
			// 本家同様 cast='str'（数値だけの本文でも文字列のまま保持する）
			this.#val.set(varName, ml, 'str');
			this.#idx += 2;	// 本文 → [endlet_ml] → その次
			return 'skip';
		}
		case 'endlet_ml':	// [let_ml]が本文ごと読み飛ばすので通常は到達しない。
			// 本家も no-op（ScriptIterator.ts:76。[if]ブロック内で未定義タグ扱いにしないため）
			return 'skip';

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
			//	タグ名のとおり表裏どちらの文字も消す（本家 LayerMng.ts hTag.er「ページ両面の文字消去」）。
			//	これが片面だけだと、[trans]で裏が表に出たときに前の場面の文字が蘇る
			this.#hTxt[this.#curTxtLayer] = '';
			aAct.push({t: 'chgStr', nm: this.#curTxtLayer, page: 'both', str: ''});
			return 'skip';

		case 'trace':	// デバッグ表示へ出力（実処理はScriptMng.ts #trace()。textが未指定でも空文字で積む）
			// 「text=&式」の評価は#resolveTag()が全タグ共通で済ませているので、ここでは受け取るだけ
			aAct.push({t: 'trace', text: args.text ?? ''});
			return 'skip';

		case 'jump': {	// シナリオジャンプ（本家 ScriptIterator.ts:1039 #jumpWork() 相当）
			// count=falseなら、この位置を未読へ戻す（本家 #jump() は既定true＝既読のまま）
			if (args.count === 'false') this.#eraseKidoku();
			const label = args.label ?? '';
			const fn = args.fn ?? '';
			if (! label && ! fn) throw '[jump] fnまたはlabelは必須です';
			if (fn && fn !== this.fn) {	// 別ファイルへ：ロードはScriptMngの責務なのでここで一旦返る
				aAct.push({t: 'loadScript', fn, label, idx: 0});
				return 'stop';
			}

			const to = this.#script.label2idx(label);
			if (to === undefined) throw `[jump] ラベル【${label}】がスクリプト【${this.fn}】に見つかりません`;
			this.#idx = to;
			return 'skip';
		}

		case 'call': {	// サブルーチンコール（本家 ScriptIterator.ts:951 #call() 参照）
			// [jump]と既定が逆で、count=trueと明示しない限りこの位置を未読へ戻す（本家 #call()）。
			//	同じサブルーチンを何度も呼ぶ書き方が普通なので、コール位置は既読に数えない
			if (args.count !== 'true') this.#eraseKidoku();
			const label = args.label ?? '';
			const fn = args.fn ?? '';
			if (! label && ! fn) throw '[call] fnまたはlabelは必須です';
			// this.#idxは既に[call ...]の次のトークンを指している（#doReturn()で戻る先）。
			// hMp：呼び出し時点のmp:値を保存（本家 #callSub() は[call]/マクロ呼び出し共通でこれを行う。
			// 通常の[call]ではmp:を変更しないため実質no-opの保存・復元だが、
			// サブルーチン内でmp:へ直接代入した場合に呼び出し元へ影響しないようにする効果がある）
			// hArgs：[call]の属性もマクロ同様に積む。サブルーチン側から「%属性名」で引ける
			//	（本家 #callSub({...hArg}) がcsArgへそのまま入れるのと同じ）
			if (fn && fn !== this.fn) {	// 別ファイルのサブルーチンを呼ぶ
				this.#pushCallStk(this.#idx, true, args);
				aAct.push({t: 'loadScript', fn, label, idx: 0});
				return 'stop';
			}

			const to = this.#script.label2idx(label);
			if (to === undefined) throw `[call] ラベル【${label}】がスクリプト【${this.fn}】に見つかりません`;
			this.#pushCallStk(this.#idx, true, args);	// 飛び先が確定してから積む（例外時にスタックを汚さない）
			this.#idx = to;
			return 'skip';
		}

		case 'return':	// サブルーチンから戻る（fn/label指定で戻り先を変えられる）
			return this.#doReturn(aAct, args);

		case 'macro': {	// マクロ定義の開始（本家 ScriptIterator.ts:1363 #macro() と同じ「実行時定義」方式）
			const macroName = args.name ?? '';
			if (! macroName) throw '[macro] nameは必須です（試作仕様）';
			if (ScriptEngine.RESERVED_TAGS.has(macroName)) throw `[${macroName}]はタグ名のため、マクロ名として使用できません`;
			if (ScriptEngine.REG_NG4MAC_NM.test(macroName)) throw `[${macroName}]はマクロ名として異常です`;
			if (macroName in this.#hMacro) throw `[macro] マクロ【${macroName}】は既に定義済みです`;
			// 本体開始位置（[macro ...]の次のトークン。呼び出し時のジャンプ先）。
			//	別ファイルから呼ばれてもよいよう、定義元のスクリプト名も覚えておく
			this.#hMacro[macroName] = {fn: this.fn, idx: this.#idx};

			// [endmacro]まで読み飛ばす（本家同様、マクロ本体は定義時には実行しない）。
			//	本家は最初に見つけた[endmacro]で終端とみなす（＝入れ子の[macro]定義は壊れる）が、
			//	ここでは深度を数えて入れ子の定義も書けるようにした。
			//	また[let_ml]の本文は「ただのテキスト」なので、中に[endmacro]と読める行があっても反応しない
			let found = false;
			let depth = 0;
			let inLetMl = false;
			for (; this.#idx < len; ++this.#idx) {
				const tkn2 = this.#script.aToken[this.#idx]!;
				if (inLetMl) {
					if (this.#script.grm.testTagEndLetml(tkn2)) inLetMl = false;
					continue;
				}
				if (tkn2.charCodeAt(0) !== 91) continue;	// [ タグ開始以外は読み飛ばす
				if (this.#script.grm.testTagLetml(tkn2)) {inLetMl = true; continue}

				const {name: nm2} = ScriptEngine.parseTag(tkn2);
				if (nm2 === 'macro') {++depth; continue}
				if (nm2 !== 'endmacro') continue;
				if (depth > 0) {--depth; continue}
				++this.#idx; found = true; break;
			}
			if (! found) throw `[macro] マクロ【${macroName}】が[endmacro]で閉じられていません（試作仕様）`;
			return 'skip';
		}

		case 'char2macro':		// 一文字マクロの定義（本家 ScriptIterator.ts:1354 #char2macro()）
		case 'bracket2macro':	// 括弧マクロの定義（本家 ScriptIterator.ts:1347 #bracket2macro()）
			// 「♡」→[ハート]、「〔梨香〕」→[セリフ text='梨香'] のように、地の文の中の
			//	一文字／括弧をタグ・マクロ呼び出しへ読み替える定義。実処理はGrammar側にある。
			//	this.#idxは既に定義タグの次のトークンを指しており、そこから後ろだけが置換される
			//	（＝定義より前に書いた文字はただの地の文のまま。本家と同じ）
			this.#script.defC2M(name, args, this.#hTagNames(), this.#idx);
			return 'skip';

		case 'endmacro':	// マクロ本体の終端。[return]と全く同じ処理
			// （本家 ScriptIterator.ts:100 hTag.endmacro = ()=> this.#return(o) と同じ規約）
			return this.#doReturn(aAct);

		case 'button': {	// ボタン表示（試作簡略：layer/nm/text/label/callに対応）
			// クリック後のjump先はjumpToLabel()で別途処理する（読み進め扱いにはしないため）
			// layer: ボタンを乗せる「UIコンテナ」＝既存の文字レイヤのnm（省略時は現在の文字レイヤ）
			const layerNm = args.layer || this.#curTxtLayer;
			if (! layerNm) throw '[button] layerは必須です（試作仕様）';
			const label = args.label ?? '';
			const fn = args.fn ?? '';	// fn指定時は別スクリプトのラベルへ飛ぶ（label省略ならそのファイルの先頭）
			if (! label && ! fn) throw '[button] fnまたはlabelは必須です';
			// nm: ボタン自身の識別名（同一layer内で一意）。省略時はlabel（無ければfn）を流用（試作の割り切り）
			const nm = args.nm ?? (label || fn);
			// call=true指定時：クリックでjumpではなくcall（サブルーチンコール）する
			const call = args.call === 'true';
			// 書き込み先のページ。**既定は本家（LayerMng.ts:1100 argChk_page(hArg,'back')）と違い'fore'**。
			//	本家のシナリオは「裏ページを組んでから[trans]で見せる」流儀なので既定がbackだが、
			//	bluesnovelの既存シナリオは[trans]を挟まないものが多く、既定をbackにすると
			//	そのままではボタンが裏（不可視）に置かれて消えてしまう。
			//	page=backと明示すれば本家と同じ組み方ができる
			//TODO: シナリオが[trans]前提になった時点で既定をbackへ寄せる（本家互換）
			const page = ScriptEngine.argPage(args, 'fore');
			aAct.push({t: 'addBtn', layerNm, page, nm, text: args.text ?? '', label, call, ...(fn ? {fn} : {})});
			return 'skip';
		}

		case 'page': {	// ページ移動（本家 Reading.ts:343 page()）
			// 本家の[page]は「裏表」ではなく**読み戻り用のページログ**を操作するタグ。
			//	試作で対応するのはclear（ログの全消去）のみ。
			//	to=（指定ページへ移動）・style=（ページ移動中の見た目）・key=（移動中に有効なキーの限定）は、
			//	bluesnovelの読み戻りがPageUp/PageDownとCaretakerで別の作りになっているため未対応
			if (! ('clear' in args || 'to' in args || 'style' in args)) throw '[page] clear,style,to いずれかは必須です';
			if (args.clear === 'true') aAct.push({t: 'clearPageLog'});
			return 'skip';
		}

		case 'clearvar':	// ゲーム変数の全消去（本家 Variable.ts:48 hTag.clearvar）
			this.#val.clearGame();
			return 'skip';

		case 'clearsysvar':	// システム変数の全消去。本家同様、既読情報もここで消える
			// （本家 Variable #clearsysvar()。SKYNovel_gallery の kidoku サンプルが
			// 「既読情報クリア」ボタンでこのタグを使っている）
			this.#val.clearSys();
			this.clearKidoku();
			return 'skip';

		case 'event': {	// イベント予約（本家 EventMng.ts:543 #event() の、DOM・フォーカス処理を除いた核だけ）
			const key = (args.key ?? '').toLowerCase();
			if (! key) throw '[event] keyは必須です';
			const h = args.global === 'true' ? this.#hGlobalEvt : this.#hLocalEvt;

			if (args.del === 'true') {	// 予約の取り消し
				if (args.fn || args.label || args.call) throw '[event] fn/label/callとdelは同時指定できません';
				delete h[key];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
				return 'skip';
			}

			const label = args.label ?? '';
			const fn = args.fn ?? this.fn;	// 省略時は現在のスクリプト（本家 hArg.fn ??= scriptFn）
			if (! label && ! args.fn) throw '[event] fn,label いずれかは必須です';
			h[key] = {fn, label, call: args.call === 'true', arg: args.arg ?? ''};
			return 'skip';
		}

		case 'clear_event':	// 予約イベントを全消去（本家 Reading.ts:69 ReadingState.clear_event()）
			this.clearEvent(args.global === 'true');
			return 'skip';

		case 'enable_event': {	// イベント有無の切替（本家 LayerMng.ts:1088 #enable_event()）
			// 対象は文字レイヤ。省略時は現在の文字レイヤ（本家 #argChk_layer(hArg, #curTxtlay)）
			const nm = args.layer || this.#curTxtLayer;
			const enabled = (args.enabled ?? 'true') !== 'false';
			// 本家同様、変数からも参照できるようにする（本家は save: 名前空間。bluesnovelでは game:）
			this.#val.set(`game:const.sn.layer.${nm}.enabled`, enabled);
			aAct.push({t: 'enableEvent', nm, enabled});
			return 'skip';
		}

		case 'wait': {	// ウェイトを入れる（本家 Reading.ts:320 wait()）
			const msec = ScriptEngine.#argNum('wait', 'time', args.time ?? '');
			// 既読スキップ中は待たない。未読に来ていたらそこでスキップ解除（本家と同じ）
			if (this.skipEnabled) {
				if (! this.skipAll && ! this.isNextKidoku) this.cancelAutoSkip();
				return 'skip';
			}
			// [wt]と同じく、実際に待つのはScriptMngの担当なのでstep()はここで一旦返す。
			//	canskipの既定はtrue＝クリックで待ちを打ち切れる
			aAct.push({t: 'wait', msec, canskip: (args.canskip ?? 'true') !== 'false'});
			return 'stop';
		}

		case 'l': case 'p': case 's': case 'waitclick': {	// 行末クリック待ち／改ページ／停止／クリック待ち
			if (name === 'p') this.#clearOnResume = true;	// [p]の次の進行時に現在レイヤをクリア（試作の改ページ挙動）
			const resume = this.#calcResume(name);	// オート読み／既読スキップの自動進行指示（該当しなければundefined）
			aAct.push({t: 'stop', kind: name, key: `${this.fn}:${String(this.#idx)}`, nm: this.#curTxtLayer, ...resume ? {resume} : {}});
			return 'stop';
		}

		default: {	// 未対応タグは無視するが、マクロ名として登録されていれば呼び出す
			// （本家はマクロ名をhTagへ動的登録して呼び出すが、試作はswitch文のため、
			// ここでマクロ登録テーブル#hMacroを直接参照する形にしている）
			const to = this.#hMacro[name];
			if (to === undefined) return 'skip';	// 試作では未対応タグは無視（後の本実装で拡充）

			// [call]と同じ枠組みでジャンプし、タグ属性をそのままmp:名前空間へ渡す
			// （本家 ScriptIterator.ts:1374-1392 のマクロ呼び出しハンドラを簡略化したもの。
			// const.sn.macro等のスクリプター用ブックキーピング情報は試作では省略）
			// マクロ呼び出しはローカル予約イベントを退避しない（本家と同じ）。
			//	属性はmp:名前空間と、マクロ本体の「%属性名」「*」用にhArgsの両方へ渡す
			this.#pushCallStk(this.#idx, false, args);
			this.#val.setMp(args);
			if (to.fn !== this.fn) {	// 別ファイルで定義されたマクロ
				aAct.push({t: 'loadScript', fn: to.fn, label: '', idx: to.idx});
				return 'stop';
			}
			this.#idx = to.idx;
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
		let inLetMl = false;	// [let_ml]の本文は「ただのテキスト」なので、[endif]等と読めても反応しない
		const len = this.#script.len;
		for (; this.#idx < len; ++this.#idx) {
			const tkn = this.#script.aToken[this.#idx]!;
			if (inLetMl) {
				if (this.#script.grm.testTagEndLetml(tkn)) inLetMl = false;
				continue;
			}
			const uc = tkn.charCodeAt(0);
			if (uc !== 91) continue;	// [ タグ開始以外（地の文・改行）はこの時点ではまだ実行せず読み飛ばすだけ
			if (this.#script.grm.testTagLetml(tkn)) {inLetMl = true; continue}

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
	//	（本家 ScriptIterator.ts:994 #return()、及び hTag.endmacro = ()=> this.#return(o) と同じ規約）
	//	label指定時は、コール元ではなくそのラベルへ戻る。
	//	コールスタックとifスタック・mp:の巻き戻しは指定の有無にかかわらず行う（本家も同じ順序）
	#doReturn(aAct: T_ENGINE_ACTION[], args: {[k: string]: string} = {}): 'skip' | 'stop' {
		const cs = this.#aCallStk.pop();
		if (! cs) throw '[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）';
		// 呼び出し先で[if]が閉じきっていなくても、コール元のifスタックだけを確実に復元する
		// （本家 ScriptIterator.ts:999 aIfStk.slice(-lenIfStk) と同じ意図。押した側から詰め直す）
		this.#aIfStk.length = cs.lenIfStk;
		// mp:もコール元の値へ復元する（本家 #return() の csa[':hMp'] 復元と同じ。
		// 通常の[call]から戻る場合は元々変化していないため実質no-op）
		this.#val.setMp(cs.hMp);
		// ローカル予約イベントもコール元のものへ戻す（本家 #return() の pushLocalEvts()）。
		//	マクロ呼び出し（[endmacro]で戻る場合）は退避していないので、
		//	マクロ内で予約したイベントはそのまま呼び出し元へ残る（本家と同じ）
		if (cs.hEvt) this.#hLocalEvt = cs.hEvt;

		const label = args.label ?? '';
		const fn = args.fn ?? '';
		if (fn || label) {	// 戻り先の指定あり：コール元ではなくそこへ進む
			if (fn && fn !== this.fn) {
				aAct.push({t: 'loadScript', fn, label, idx: 0});
				return 'stop';
			}
			const to = this.#script.label2idx(label);
			if (to === undefined) throw `[return] ラベル【${label}】がスクリプト【${this.fn}】に見つかりません`;
			this.#idx = to;
			return 'skip';
		}

		if (cs.fn !== this.fn) {	// 別ファイルから呼ばれていた：そのファイルを読み直して戻る
			aAct.push({t: 'loadScript', fn: cs.fn, label: '', idx: cs.returnIdx});
			return 'stop';
		}
		this.#idx = cs.returnIdx;
		return 'skip';
	}

	// 文字表示（地の文・[r]）は表ページ固定。本家は[ch]にpage属性があるが、
	//	地の文には属性を書けない＝実質常に既定（fore）なので、試作では表のみとする
	#appendTxt(aAct: T_ENGINE_ACTION[], add: string) {
		const nm = this.#curTxtLayer;
		const str = (this.#hTxt[nm] ?? '') + add;
		this.#hTxt[nm] = str;
		aAct.push({t: 'chgStr', nm, page: 'fore', str});
	}

}
