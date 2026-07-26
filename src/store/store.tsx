/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {A_LAY_STY_KEY, type T_LAY, type T_LAY_STY} from '../components/Lay';
import type {T_FLT} from '../ts/Filter';
import type {T_FACE_SRC} from '../components/GrpLayer';
import type {T_BTN_STY} from '../components/TxtLayer';
import type {T_CH} from '../ts/Txt';
import {CH_IN_DEF, CH_OUT_DEF, type T_CH_STYLE} from '../ts/ChStyle';

import {create} from 'zustand';

type T_STATE = {
	txt		: string;
	addTxt	: (t: string)=> void;
	clearTxt: ()=> void;

	// ページ裏表（本家 Pages.ts）。レイヤ配列を2枚持ち、どちらが表かはforeIdxで示す。
	//	**配列の中身は入れ替えず、foreIdxだけを切り替える**のが要点。中身を入れ替えると
	//	Reactから見て2つのコンテナの子が丸ごと差し替わり、TxtLayerが文字送り演出をやり直して
	//	トランジション完了と同時に画面がちらつくため（レイヤ側のDOMキャッシュも作り直しになる）
	aPage	: [T_LAY[], T_LAY[]];
	foreIdx	: 0 | 1;
	replace	: (arg: string)=> void;
	addLayer: (arg: T_LAY)=> void,
	chgPic	: (arg: T_CHGPIC)=> void,
	chgBAlpha	: (arg: T_CHGBALPHA)=> void,
	chgBPic	: (arg: T_CHGBPIC)=> void,
	chgLay	: (arg: T_CHGLAY)=> void,
	getLaySty: (nm: string, page: T_PAGE)=> T_LAY_STY,
	getPages: ()=> {fore: T_LAY[]; back: T_LAY[]},	// [dump_lay]用。表裏まとめて覗く
	// 表裏ページまるごとのJSON。しおり（[save]/[record_place]）が覚えるのはこれで、
	//	戻すのは replace()。Memento（読み戻し）が記録するものと同じ形
	getPagesJson: ()=> string,
	enableEvent: (arg: T_ENABLEEVENT)=> void,
	clearLay: (arg: T_CLEARLAY)=> void,
	clearTxtLay: (arg: T_CLEARTXTLAY)=> void,
	moveLay	: (arg: T_MOVELAY)=> void,
	chgFilter: (arg: T_CHGFILTER)=> void,
	chgStr	: (arg: T_CHGSTR)=> void,
	addBtn	: (arg: T_ADDBTN)=> void,

	// 文字出現・消去演出の定義表（[ch_in_style]/[ch_out_style]）。本家は TxtStage の
	//	staticな連想配列で、CSSの`@keyframes`をスタイルシートへ挿す。こちらはGSAPで動かすので
	//	定義を値のまま持ち、TxtLayerが名前で引く。**レイヤごとではなく画面ぜんぶで1つ**（本家も同じ）
	hChIn	: {[nm: string]: T_CH_STYLE},
	hChOut	: {[nm: string]: T_CH_STYLE},
	defChStyle: (arg: T_DEFCHSTYLE)=> void,

	// 1文字あたりの待ち時間（ミリ秒）。**次の文字が動き出すまでの遅れ**で、文字送りの速さそのもの。
	//	・chWait：既定値。エンジンがsys:sn.tagCh.*と既読状態から決め、ScriptMngが停止点ごとに写す
	//	・autowc：[autowc]で入れた「この文字の後だけ長く待つ」表（本家 TxtLayer.ts:210）
	//	どちらも[span]/[ch]のwait属性（T_CH.w）が指定されていればそちらが勝つ
	chWait		: number,
	setChWait	: (v: number)=> void,
	autowc		: T_AUTOWC,
	setAutowc	: (a: T_AUTOWC)=> void,

	// [trans]の進行状態。startTrans()で開始し、finishTrans()で表裏を入れ替えて終了する。
	//	**終了を宣言するのは必ずScriptMng**（時間切れ／[wt]中のクリック）で、
	//	Stage側のGSAPは見た目を動かすだけ。完了コールバックに交換をやらせると、
	//	シナリオの再開（ScriptMng）との前後が保証されず、交換前のページへ次の文が書かれてしまう
	trans		: T_TRANS;
	startTrans	: (arg: T_STARTTRANS)=> void,
	finishTrans	: ()=> void,

	// [quake]の進行状態。[trans]とまったく同じ役割分担で、**終了を宣言するのはScriptMng**
	//	（時間切れ／[wq]中のクリック／[stop_quake]）。Stage側のGSAPは揺らすだけ。
	//	揺れ幅そのものはストアに入れない：毎フレームのランダム位置なのでストア更新には重すぎ、
	//	かつ最後は必ず0へ戻る一時的な見た目なので、Memento（読み戻し）に要らない
	quake		: T_QUAKE;
	startQuake	: (arg: T_STARTQUAKE)=> void,
	finishQuake	: ()=> void,

	title	: string;
	addTitle	: (t: string)=> void;

	// [toggle_full_screen]。**ここは「こうしたい」という要求で、実際の状態ではない**。
	//	Stage.tsxがreact-useのuseFullscreenへ渡し、Escでの解除などブラウザ都合の変化は
	//	setFullScr()で書き戻される（本家もSysWebがfullscreenchangeを拾ってisFullScrを直す）
	fullScr		: boolean;
	setFullScr	: (b: boolean)=> void;
	toggleFullScr	: ()=> void;

	isReadBack	: boolean;		// 読み戻り中か（PageUp等でCaretaker.isLast()===falseの間）
	setReadBack	: (b: boolean)=> void;

	isTyping	: boolean;		// 文字送り演出（GSAP）実行中か。trueの間はクリックで進行せずスキップ要求のみ行う
	setIsTyping	: (b: boolean)=> void;
	skipReq		: number;		// TxtLayer側へ「今のアニメを瞬時完了させろ」と伝える合図（インクリメントで通知）
	requestSkip	: ()=> void;
	skipping	: boolean;		// 既読スキップ実行中か。trueの間はTxtLayerが文字送り演出を省いて瞬時表示する
	setSkipping	: (b: boolean)=> void;

	wait		: T_WAIT;		// 現在[l]/[p]待ち中のレイヤと種別（[s]はマーカーなし=null）
	setWait		: (w: T_WAIT)=> void;

	// sys:TextLayer.Back.Alpha（設定画面の「バック不透明度」）。**全文字レイヤ共通の掛け率**で、
	//	各レイヤのb_alphaに掛かる（b_alpha_isfixed=trueのレイヤだけは掛からない。本家 TxtLayer.ts:388）。
	//	変数はエンジンが持つので、ScriptMngが停止点ごとにここへ写す
	backAlpha	: number;
	setBackAlpha: (v: number)=> void;

	// tmp:sn.button.fontFamily（[button]の文字フォント。本家 LayerMng.ts:209）。
	//	backAlphaと同じくエンジンが変数を持つので、ScriptMngが停止点ごとにここへ写す
	btnFont		: string;
	setBtnFont	: (v: string)=> void;
}
// [l]/[p]の待ちマーク。srcは`breakline`/`breakpage`という名の画像が
//	プロジェクトにあれば、その解決済みURL（本家 LayerMng.ts:159。無ければ試作の絵文字）
export type T_WAIT = {nm: string; kind: 'l' | 'p'; src?: string;
	// [l]/[p]に書かれた待ちマークの位置・寸法（本家 TxtStage.ts:685-688）。
	//	x/yは「本文の流れの中での位置からのずらし」（本家も待ちマーク用コンテナ内の相対座標）
	x?: number; y?: number; width?: number; height?: number} | null;
export type T_PAGE = 'fore' | 'back';
export type T_PAGE_BOTH = T_PAGE | 'both';
// 進行中の[trans]。seqは「新しい[trans]が来た」ことをStage側のuseEffectへ伝えるための通し番号
//	（timeが同じ値だと参照が変わってもeffectを撃ち直せないため）
//	ruleSrc指定時はクロスフェードではなくルール画像によるワイプ（Trans.ts）
//	aLayNmを持ち回るのは、演出終了時に「交換したレイヤだけ」新しい裏へ写し直すため（finishTrans）
export type T_TRANS = {seq: number; aLayNm: string[] | null; time: number; ruleSrc?: string; vague?: number} | null;
export type T_STARTTRANS = {
	aLayNm	: string[] | null;	// 交換するレイヤ名。nullは全レイヤ
	time	: number;			// ミリ秒。0なら演出せず即交換
	ruleSrc?: string;			// ルール画像の解決済みURL（パス解決はScriptMng）
	vague?	: number;			// 境界のぼかし幅（0.0〜1.0）
}
// 進行中の[quake]。seqの意味は[trans]と同じ（同じ揺れ方を続けて指定されても撃ち直せるように）
export type T_QUAKE = {seq: number; hmax: number; vmax: number} | null;
export type T_STARTQUAKE = {
	hmax	: number;	// 横の最大ずれ幅（px。ステージ座標）。0なら横に揺れない
	vmax	: number;	// 縦の最大ずれ幅
}
export type T_CHGPIC = {
	nm	: string;
	page: T_PAGE;
	fn	: string;	// 論理名（[dump_lay]・デバッグ用）
	src	: string;	// 解決済みURL。パス解決（path.json）はScriptMngが行う
	aFace	: T_FACE_SRC[];	// [lay face=...]で重ねる差分絵（重なり順＝配列順）
}
// [lay b_alpha=/b_alpha_isfixed=]：文字レイヤ背景の不透明度。値域は0.0（透明）～1.0（不透過）。
//	背景のみを透過させ、文字は透過しない（レイヤ全体の透過度ではない）。
//	isFixed=false（既定）だと sys:TextLayer.Back.Alpha との掛け算になる（本家 TxtLayer.ts:388）
export type T_CHGBALPHA = {
	nm		: string;
	page	: T_PAGE;
	b_alpha?: number;
	isFixed?: boolean;
}
// [lay b_pic=…]：文字レイヤ背後の枠画像。fnは論理名、srcは解決済みURL（空なら単色塗りへ戻す）
export type T_CHGBPIC = {
	nm		: string;
	page	: T_PAGE;
	fn		: string;
	src		: string;
}
// [lay]で指定できるレイヤの見た目。書かれた属性だけを持つ（未指定の属性は現状維持）
export type T_LAY_STY_ARG = Partial<T_LAY_STY> & {
	b_color?: number;	// 文字レイヤ背景色（0xRRGGBB）
	style?	: string;	// 文字レイヤへそのまま足すCSS
	ffs?	: string;	// [lay ffs=…]。文字詰め（CSSのfont-feature-settingsの値。'"palt"'等）
	noffs?	: string;	// [lay noffs=…]。ffsを効かせない文字の並び
	bura?	: boolean;	// [lay bura=…]。ぶら下げ禁則
	// [lay in_style=/out_style=]。[ch_in_style]/[ch_out_style]で定義した演出名
	in_style?	: string;
	out_style?	: string;
};
export type T_CHGLAY = {
	nm	: string;
	page: T_PAGE;
	sty	: T_LAY_STY_ARG;
}
// [autowc]：文字ごとのウェイト表（ミリ秒）。enabled=falseなら表を使わずchWaitへ落ちる
export type T_AUTOWC = {enabled: boolean; h: {[ch: string]: number}};
// [ch_in_style]/[ch_out_style]：文字出現・消去演出の定義
export type T_DEFCHSTYLE = {
	kind: 'in' | 'out';
	nm	: string;
	sty	: T_CH_STYLE;
}
// [enable_event]：文字レイヤのボタン等を有効／無効にする。無効の間はクリックを受けない
export type T_ENABLEEVENT = {
	nm		: string;
	enabled	: boolean;
}
// [clear_lay]：レイヤの見た目を初期値へ戻し、中身（画像／文字＋ボタン）も捨てる。
//	aLayNm=nullは全レイヤ（layer属性の省略）
export type T_CLEARLAY = {
	aLayNm	: string[] | null;
	page	: T_PAGE_BOTH;
}
// [er]（文字消去）。本家の[er]は TxtLayer.clearLay()（TxtLayer.ts:857）を表裏に呼び、
//	その中で本文と**ボタンを両方**捨てたうえで Layer.clearLay()（:420）が変形まわりを既定へ戻す。
//	[clear_lay]と違って位置や見た目（style/left/top/b_pic…）は残すので、専用の口を用意する
export type T_CLEARTXTLAY = {
	nm		: string;
	page	: T_PAGE_BOTH;
	clearFilter	: boolean;	// [er clear_filter=true]。本家の既定はfalse
}
// [er]が既定へ戻す属性（本家 Layer.ts:420）。**visibleと位置は含まない**
const A_ER_RESET_KEY = ['alpha', 'blendmode', 'pivot_x', 'pivot_y', 'rotation', 'scale_x', 'scale_y'] as const;
// [add_filter]/[clear_filter]/[enable_filter]と[lay filter=…]。
//	3タグを1つのアクションにまとめてあるのは、対象レイヤの選び方（aLayNm=nullは全レイヤ）と
//	ページの扱い（both可）が全く同じで、違うのは配列をどういじるかだけのため
export type T_CHGFILTER = {
	aLayNm	: string[] | null;
	page	: T_PAGE_BOTH;
	mode	: 'add' | 'replace' | 'clear' | 'enable';
	flt?	: T_FLT;		// add/replace用
	index?	: number;		// enable用
	enabled?: boolean;		// enable用
}
// [lay float=/index=/dive=]：レイヤの重なり順。**表裏とも同じ順に動かす**ので、page指定は無い
//	（本家 LayerMng.ts:489 も#fore/#backの両方をsetChildIndexする）
export type T_MOVELAY = {
	nm		: string;
	mode	: 'float' | 'index' | 'dive';
	index?	: number;
	dive?	: string;
}
export type T_CHGSTR = {
	nm	: string;
	page: T_PAGE_BOTH;	// [er]（ページ両面の文字消去）だけが'both'を使う
	// 論理値（平文）と表示用（表示単位の並び）の両方を持つ。chgPicの fn と src と同じ関係で、
	//	割るのはScriptMng（Txt.ts splitCh）の仕事。strはルビを除いた本文＝
	//	const.sn.last_page_plain_text と同じ物なので、テストや読み上げはこちらを見れば良い
	str	: string;
	aCh	: T_CH[];
}
// [button]タグで文字レイヤ（UIコンテナ）にボタンを乗せる（独立レイヤにはしない）
export type T_ADDBTN = {
	layerNm	: string;	// 乗せ先の文字レイヤnm
	page	: T_PAGE;
	nm?		: string;	// [button nm=…]。省略時はここで通し番号を振る（下記 addBtn 参照）
	text	: string;
	label	: string;
	call?	: boolean;	// [button call=true]指定時：クリックでjumpではなくcall（サブルーチンコール）する
	fn?		: string;	// [button fn=...]指定時：別スクリプトのラベルへ飛ぶ（label省略時はそのファイルの先頭）
	sty?	: T_BTN_STY;	// 配置・寸法・変形（書かれた属性だけ）
}

// [button]の既定フォント（本家 CmnInterface.ts:349 の sn.button.fontFamily と同じHiragino系スタック）
export const DEF_BTN_FONT = `'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif`;

export type T_INIT_FNCS = Readonly<Pick<T_STATE, 'addLayer'|'chgPic'|'chgBAlpha'|'chgBPic'|'setBackAlpha'|'setBtnFont'|'chgStr'|'chgLay'|'defChStyle'|'setChWait'|'setAutowc'|'getLaySty'|'getPages'|'getPagesJson'|'replace'|'clearLay'|'clearTxtLay'|'moveLay'|'chgFilter'|'enableEvent'|'addBtn'|'addTitle'|'toggleFullScr'|'setWait'|'requestSkip'|'setSkipping'|'startTrans'|'finishTrans'|'startQuake'|'finishQuake'>>;


// 指定ページのレイヤ配列を差し替えるための下ごしらえ。
//	aPageは[0]と[1]で同じ順・同じレイヤ名が並んでいる前提（addLayerが必ず両面へ足すため）
function pickPage(s: T_STATE, page: T_PAGE): {idx: 0 | 1; aLay: T_LAY[]} {
	const idx = page === 'fore' ? s.foreIdx : (1 - s.foreIdx) as 0 | 1;
	return {idx, aLay: [...s.aPage[idx]]};
}
function putPage(s: T_STATE, idx: 0 | 1, aLay: T_LAY[]): {aPage: [T_LAY[], T_LAY[]]} {
	const aPage: [T_LAY[], T_LAY[]] = [s.aPage[0], s.aPage[1]];
	aPage[idx] = aLay;
	return {aPage};
}
// [trans]の完了処理（本家 LayerMng.ts:612 comp()）。呼ぶのは finishTrans と、
//	演出なし（time<=0）の startTrans。foreIdxの反転とレイヤの入れ替え・複製をまとめてやる
function finTrans(s: T_STATE, aLayNm: string[] | null): Partial<T_STATE> {
	const fi = s.foreIdx;
	const bi = (1 - fi) as 0 | 1;
	const fore = s.aPage[fi], back = s.aPage[bi];
	const skip = (nm: string)=> aLayNm !== null && ! aLayNm.includes(nm);
	const pick = (a: T_LAY[], b: T_LAY[])=> a.map(e=> skip(e.nm) ? b.find(f=> f.nm === e.nm) ?? e : e);

	// 交換対象外は表裏を入れ替え（foreIdx反転後も元のまま）、交換対象はそのまま反転に任せる
	const aPage: [T_LAY[], T_LAY[]] = [[], []];
	aPage[bi] = pick(back, fore);
	aPage[fi] = pick(fore, back);
	// 反転後、交換対象のレイヤについて新しい裏へ新しい表を写す（本家 Pages.transPage の back.copy(fore)）。
	//	これが無いと新しい裏が1つ前の画面のまま残り、次の[trans]で巻き戻る
	aPage[fi] = aPage[fi].map(e=> skip(e.nm)
		? e
		: structuredClone(aPage[bi].find(f=> f.nm === e.nm) ?? e));
	return {aPage, foreIdx: bi, trans: null};
}

// レイヤ1件を探す（見つからない・種別違いは例外）// レイヤ1件を探す（見つからない・種別違いは例外）
function findLay<C extends 'grp' | 'txt'>(aLay: T_LAY[], nm: string, cls: C) {
	const e = aLay.find(e=> e.nm === nm);
	if (! e) throw `存在しないレイヤ ${nm} です`;
	if (e.cls !== cls) throw `${nm} は${cls === 'grp' ? '画像' : '文字'}レイヤではありません`;
	return e as Extract<T_LAY, {cls: C}>;
}


export const useStore = create<T_STATE>()((set, get)=> ({	// わざとカーリー化
	txt		: '',
	addTxt	: t=> set(s=> ({txt: s.txt + t})),
	clearTxt: ()=> set(()=> ({txt: ''})),

	aPage	: [[], []],
	foreIdx	: 0,

	// 組み込みの`default`だけ入った状態から始める（本家 TxtLayer.ts:120/133 が起動時に定義する）
	hChIn	: {default: CH_IN_DEF},
	hChOut	: {default: CH_OUT_DEF},
	defChStyle: ({kind, nm, sty}: T_DEFCHSTYLE)=> set(s=> kind === 'in'
		? {hChIn : {...s.hChIn,  [nm]: sty}}
		: {hChOut: {...s.hChOut, [nm]: sty}}),

	// 本家 CmnInterface.ts:223 の初期値（sys:が未設定のときの10ms）と揃える
	chWait	: 10,
	setChWait: (v: number)=> set(()=> ({chWait: v})),
	autowc	: {enabled: false, h: {}},
	setAutowc: (a: T_AUTOWC)=> set(()=> ({autowc: a})),
	replace	: (arg: string)=> set(()=> JSON.parse(arg) as {aPage: [T_LAY[], T_LAY[]]; foreIdx: 0 | 1}),
	addLayer: (arg: T_LAY)=> set(s=> {
		// レイヤ名（nm）はcls（grp/txt）をまたいで全体で一意である前提
		//	（chgPic/chgStrがcls不問でnmだけを検索キーにしているため）。
		//	重複したまま追加するとStage.tsxのkey={l.nm}が衝突し、Reactの
		//	「Encountered two children with the same key」警告や表示不具合の原因になる。
		if (s.aPage[0].some(e=> e.nm === arg.nm)) throw `レイヤ名 ${arg.nm} は既に使用されています（既存の${s.aPage[0].find(e=> e.nm === arg.nm)!.cls}レイヤと重複）`;

		// レイヤは必ず表裏の両面に作る（本家 Pages も1レイヤにつきfore/backの2枚を持つ）。
		//	両面で同じ順に並ぶので、以降はnm検索でも添字でも対応が取れる
		return {aPage: [
			[...s.aPage[0], structuredClone(arg)],
			[...s.aPage[1], structuredClone(arg)],
		] as [T_LAY[], T_LAY[]]};
	}),
	// [button]タグ：指定した文字レイヤ（UIコンテナ）のaBtnにボタンを1件追加する。
	//	独立レイヤ（cls:'btn'）としてはscopedしないことで、文字レイヤごと表示/非表示を一括で切り替えられる
	addBtn	: ({layerNm, page, nm, text, label, call, fn, sty}: T_ADDBTN)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, layerNm, 'txt');
		// nmはReactのkeyになるので同一レイヤ内で一意でなければならない。
		//	**本家にボタン名の概念は無い**（Buttonはコンテナの子として積まれるだけ）ので、
		//	省略時は追加順の通し番号で振る。labelを流用していた頃は、テンプレの[sys_menu]が
		//	fn違い・label=*mainのボタンを3つ並べるところで衝突していた。
		//	aBtnは「追加」と「[clear_lay]で全消し」しかされないので、添字は一意で足りる
		if (nm === undefined) nm = `${label || fn || 'btn'}#${String(e.aBtn.length)}`;
		else if (e.aBtn.some(b=> b.nm === nm)) throw `ボタン名 ${nm} はレイヤ ${layerNm} 内で既に使用されています`;

		e.aBtn = [...e.aBtn, {nm, text, label, ...(call !== undefined ? {call} : {}), ...(fn !== undefined ? {fn} : {}), ...(sty !== undefined ? {sty} : {})}];
		return putPage(s, idx, aLay);
	}),
	chgPic	: ({nm, page, fn, src, aFace}: T_CHGPIC)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, nm, 'grp');

		e.fn = fn;
		e.src = src;
		e.aFace = aFace;	// [lay face=...]の差分合成情報も同時に更新（未指定時は空配列）
		return putPage(s, idx, aLay);
	}),
	chgBAlpha	: ({nm, page, b_alpha, isFixed}: T_CHGBALPHA)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, nm, 'txt');

		// レイヤ全体ではなく文字レイヤ背景の不透明度のみ（TxtLayer.tsxで背景のアルファとして反映）
		if (b_alpha !== undefined) e.b_alpha = b_alpha;
		if (isFixed !== undefined) e.b_alpha_isfixed = isFixed;
		return putPage(s, idx, aLay);
	}),
	chgBPic	: ({nm, page, fn, src}: T_CHGBPIC)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, nm, 'txt');

		e.b_pic = fn;
		e.b_src = src;
		return putPage(s, idx, aLay);
	}),
	// [lay]のレイヤ共通属性。書かれた属性だけを上書きする（本家 Layer.lay() も `'x' in hArg` で判定）
	chgLay	: ({nm, page, sty}: T_CHGLAY)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = aLay.find(e=> e.nm === nm);
		if (! e) throw `存在しないレイヤ ${nm} です`;
		// b_color/style/文字組み（ffs/noffs/bura）は文字レイヤ専用。画像レイヤへ来たら黙って無視せず知らせる
		if (e.cls !== 'txt' && (sty.b_color !== undefined || sty.style !== undefined
			|| sty.ffs !== undefined || sty.noffs !== undefined || sty.bura !== undefined))
			throw `${nm} は文字レイヤではありません（b_color/style/ffs/noffs/buraは文字レイヤ専用）`;

		Object.assign(e, sty);
		return putPage(s, idx, aLay);
	}),
	// [tsy]（トゥイーン）の開始値を読むための唯一の読み出し口。setterではないのでgetを使う。
	//	「現在値からの相対」（[tsy left='=100']）と、GSAPへ渡す開始値のために要る。
	//	未指定の属性は値を持たない（＝各レイヤのCSS既定）ので、ここではundefinedのまま返し、
	//	既定値の穴埋めは呼ぶ側（ScriptMngのH_TSY_DEF）に任せる
	getLaySty: (nm: string, page: T_PAGE)=> {
		const s = get();
		const aLay = s.aPage[page === 'fore' ? s.foreIdx : (1 - s.foreIdx) as 0 | 1];
		const e = aLay.find(e=> e.nm === nm);
		if (! e) throw `存在しないレイヤ ${nm} です`;

		const sty: T_LAY_STY = {};
		for (const k of A_LAY_STY_KEY) if (e[k] !== undefined) Object.assign(sty, {[k]: e[k]});
		return sty;
	},
	getPages: ()=> {
		const s = get();
		return {fore: s.aPage[s.foreIdx], back: s.aPage[(1 - s.foreIdx) as 0 | 1]};
	},
	getPagesJson: ()=> {
		const {aPage, foreIdx} = get();
		return JSON.stringify({aPage, foreIdx});
	},
	// [enable_event]：表裏どちらのページにも同じ値を入れる。
	//	本家はレイヤ（Pagesの片面ではなくレイヤ自体）が持つ状態なので、[trans]で入れ替わっても揺れないようにする
	enableEvent: ({nm, enabled}: T_ENABLEEVENT)=> set(s=> ({aPage: s.aPage.map(a=> {
		const aLay = [...a];
		findLay(aLay, nm, 'txt').enabled = enabled;
		return aLay;
	}) as [T_LAY[], T_LAY[]]})),
	// [clear_lay]：見た目を初期値へ戻し、中身も捨てる（本家 Layer.clearLay()＋各レイヤのoverride）。
	//	**visibleだけは触らない**（本家のコメント「visibleは触らない」そのまま）
	// [er]用（本家 TxtLayer.clearLay()＋Layer.clearLay()）。**本文（str/aCh）はchgStrが別に消す**ので、
	//	ここでやるのはボタンの消去と**変形まわりの属性を既定へ戻す**こと。
	//	戻すのは本家 Layer.ts:420 と同じ範囲＝alpha・blendmode・pivot・角度・拡縮で、
	//	**visibleと位置（left/top/寄せ）・b_color/style等の見た目には触らない**
	//	（位置まで戻すのは[clear_lay]の仕事。本家も #er() は clearLay(hArg) しか呼ばない）。
	//	フィルターは clear_filter=true のときだけ落とす（本家の既定はfalse）
	clearTxtLay: ({nm, page, clearFilter}: T_CLEARTXTLAY)=> set(s=> {
		const clr1 = (aLay: T_LAY[])=> {
			const e = findLay(aLay, nm, 'txt');
			if (e.aBtn.length > 0) e.aBtn = [];
			for (const k of A_ER_RESET_KEY) delete e[k];
			if (clearFilter) delete e.aFlt;
		};
		if (page === 'both') return {aPage: s.aPage.map(a=> {
			const aLay = [...a]; clr1(aLay); return aLay;
		}) as [T_LAY[], T_LAY[]]};

		const {idx, aLay} = pickPage(s, page);
		clr1(aLay);
		return putPage(s, idx, aLay);
	}),
	clearLay: ({aLayNm, page}: T_CLEARLAY)=> set(s=> {
		const clr1 = (e: T_LAY)=> {
			// 見た目は「未指定」へ戻す（＝各レイヤのCSS既定に従う）。
			//	**visibleだけは触らない**（本家 Layer.clearLay() のコメントそのまま）
			for (const k of A_LAY_STY_KEY) if (k !== 'visible') delete e[k];
			if (e.cls === 'grp') {e.fn = ''; e.src = ''; e.aFace = []}
			else {e.str = ''; e.aCh = []; e.aBtn = []; delete e.b_color; delete e.style; delete e.ffs; delete e.noffs; delete e.bura; delete e.b_pic; delete e.b_src; delete e.b_alpha_isfixed; e.b_alpha = 1}
		};
		// aLayNm=nullはlayer属性の省略＝全レイヤ（本家 LayerMng.#getLayers()）
		const clr = (aLay: T_LAY[])=> {
			if (! aLayNm) {aLay.forEach(clr1); return}

			for (const nm of aLayNm) {
				const e = aLay.find(e=> e.nm === nm);
				if (! e) throw `存在しないレイヤ ${nm} です`;
				clr1(e);
			}
		};
		if (page === 'both') return {aPage: s.aPage.map(a=> {
			const aLay = [...a]; clr(aLay); return aLay;
		}) as [T_LAY[], T_LAY[]]};

		const {idx, aLay} = pickPage(s, page);
		clr(aLay);
		return putPage(s, idx, aLay);
	}),
	// [lay float=/index=/dive=]：レイヤの重なり順。配列の並びがそのまま描画順（後ろほど手前）。
	//	**表裏を必ず同じ並びに保つ**：addLayerが両面へ同順で足す前提を、他の処理
	//	（pickPage/putPage・[trans]のレイヤ複製）が当てにしているため、片面だけ動かせない
	moveLay	: ({nm, mode, index, dive}: T_MOVELAY)=> set(s=> {
		const a0 = s.aPage[0];
		const from = a0.findIndex(e=> e.nm === nm);
		if (from < 0) throw `存在しないレイヤ ${nm} です`;

		let to: number;
		switch (mode) {
		case 'float':	// 最前面へ（本家は setChildIndex(children.length -1)）
			to = a0.length - 1;
			break;
		case 'index':
			to = Math.min(Math.max(0, index ?? 0), a0.length - 1);
			break;
		case 'dive': {	// 指定レイヤのすぐ下へ潜り込む
			if (nm === dive) throw `[lay] 属性 layerとdiveが同じ【${String(dive)}】です`;
			const d = a0.findIndex(e=> e.nm === dive);
			if (d < 0) throw `[lay] 属性 dive【${String(dive)}】が不正です。レイヤーがありません`;
			to = d > from ? d - 1 : d;	// 自分が抜けた分だけ下がる（本家 --idx_dive と同じ）
			break;
		}
		}
		if (to === from) return {};

		return {aPage: s.aPage.map(a=> {
			const b = [...a];
			b.splice(to, 0, ...b.splice(from, 1));
			return b;
		}) as [T_LAY[], T_LAY[]]};
	}),
	// フィルター（本家 LayerMng.ts:836 #add_filter() 他）。対象レイヤの選び方とページの扱いは
	//	[clear_lay]と同じ（aLayNm=nullは全レイヤ、page=bothで両面）
	chgFilter: ({aLayNm, page, mode, flt, index, enabled}: T_CHGFILTER)=> set(s=> {
		const chg1 = (e: T_LAY)=> {
			switch (mode) {
			case 'add':		e.aFlt = [...e.aFlt ?? [], flt!];	break;
			case 'replace':	e.aFlt = [flt!];	break;	// [lay filter=…]は置き換え
			case 'clear':	delete e.aFlt;		break;
			case 'enable': {
				const a = [...e.aFlt ?? []];
				const i = index ?? 0;
				// 本家 #enable_filter2() と同じ検査（フィルターが無い／個数を越えている）
				if (a.length === 0) throw `${e.nm} にフィルターがありません`;
				if (a.length <= i) throw `${e.nm} のフィルターの個数（${String(a.length)}）を越えています`;
				a[i] = {...a[i]!, enabled: enabled ?? true};
				e.aFlt = a;
				break;
			}
			}
		};
		const chg = (aLay: T_LAY[])=> {
			if (! aLayNm) {aLay.forEach(chg1); return}

			for (const nm of aLayNm) {
				const e = aLay.find(e=> e.nm === nm);
				if (! e) throw `存在しないレイヤ ${nm} です`;
				chg1(e);
			}
		};
		if (page === 'both') return {aPage: s.aPage.map(a=> {
			const aLay = [...a]; chg(aLay); return aLay;
		}) as [T_LAY[], T_LAY[]]};

		const {idx, aLay} = pickPage(s, page);
		chg(aLay);
		return putPage(s, idx, aLay);
	}),
	chgStr	: ({nm, page, str, aCh}: T_CHGSTR)=> set(s=> {
		const put = (aLay: T_LAY[])=> {
			const e = findLay(aLay, nm, 'txt');
			e.str = str;
			e.aCh = aCh;
		};
		// [er]だけが'both'＝両面の文字を消す。片面だけだと[trans]で裏が表に出たときに
		//	前の場面の文字が蘇ってしまう（本家 hTag.er「ページ両面の文字消去」）
		if (page === 'both') return {aPage: s.aPage.map(a=> {
			const aLay = [...a];
			put(aLay);
			return aLay;
		}) as [T_LAY[], T_LAY[]]};

		const {idx, aLay} = pickPage(s, page);
		put(aLay);
		return putPage(s, idx, aLay);
	}),

	trans		: null,
	// [trans]開始。演出の主役は「表ページを次第に透明にし、下から裏ページを出す」こと（Stage.tsx）。
	//	**ここでは中身を一切いじらない**。交換対象外レイヤの入れ替えは finishTrans（＝完了時）の担当で、
	//	開始時にやると演出の最中に表の見た目が先に変わってしまう
	//	（実機テンプレで「場面転換のたびに一瞬真っ黒がちらつく」の正体）。
	//	演出中の「交換対象レイヤは裏・それ以外は表」という合成は Stage.tsx が描画時に行う
	//	（本家 LayerMng.ts:648 `const lay = sDoTrans.has(ln) ? back : fore` と同じ）
	startTrans	: ({aLayNm, time, ruleSrc, vague}: T_STARTTRANS)=> set(s=> {
		// time=0（または既読スキップ中）は演出せず即完了。transはnullのままなのでStageは何もしない
		if (time <= 0) return finTrans(s, aLayNm);

		return {trans: {seq: (s.trans?.seq ?? 0) + 1, aLayNm, time,
			...ruleSrc !== undefined ? {ruleSrc} : {},
			...vague !== undefined ? {vague} : {},
		}};
	}),
	// 演出終了。**本家 LayerMng.ts:612 comp() と Pages.ts:74 transPage() の移植**。
	//	・交換対象のレイヤ：表裏を入れ替え、そのうえで新しい裏へ新しい表を写す（back.copy(fore)）
	//	・交換対象外のレイヤ：表と裏の中身を入れ替えておく（本家「transしないために交換する」）。
	//	  ストア全体で1つの foreIdx を反転しても、そのレイヤの表裏は元のままになる。
	//	  **写す（コピー）のではない**：裏には次の場面の組み立て途中が載っていることがあり、
	//	  コピーだとそれを捨ててしまう（テンプレは文字レイヤの裏を組んでから
	//	  [sysmenu_draw_v]が別レイヤの[trans]を打つ、という順で書く）
	//	zustandのsetは同期なので、これを呼んだ時点で以降の書き込み先は新しい表ページになる。
	//	演出が途中でも呼んでよい（Stage側が見た目を終了状態へ確定させる）
	finishTrans	: ()=> set(s=> s.trans ? finTrans(s, s.trans.aLayNm) : {}),

	quake		: null,
	startQuake	: ({hmax, vmax}: T_STARTQUAKE)=> set(s=> ({
		quake: {seq: (s.quake?.seq ?? 0) + 1, hmax, vmax},
	})),
	// 揺れ終了。Stage側が見た目を元（ずれ0）へ戻す。演出が途中でも呼んでよい
	finishQuake	: ()=> set(()=> ({quake: null})),

	title		: '',
	addTitle	: title=> set(()=> ({title})),

	fullScr		: false,
	setFullScr	: b=> set(()=> ({fullScr: b})),
	toggleFullScr	: ()=> set(s=> ({fullScr: ! s.fullScr})),

	isReadBack	: false,
	setReadBack	: b=> set(()=> ({isReadBack: b})),

	isTyping	: false,
	setIsTyping	: b=> set(()=> ({isTyping: b})),
	backAlpha	: 1,
	setBackAlpha: v=> set(()=> ({backAlpha: v})),

	btnFont		: DEF_BTN_FONT,
	setBtnFont	: v=> set(()=> ({btnFont: v})),
	skipReq		: 0,
	requestSkip	: ()=> set(s=> ({skipReq: s.skipReq + 1})),
	skipping	: false,
	setSkipping	: b=> set(()=> ({skipping: b})),

	wait		: null,
	setWait		: w=> set(()=> ({wait: w})),
}))
