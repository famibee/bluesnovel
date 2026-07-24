/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_LAY} from '../components/Stage';
import type {T_FACE} from '../components/GrpLayer';

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
	chgStr	: (arg: T_CHGSTR)=> void,
	addBtn	: (arg: T_ADDBTN)=> void,

	// [trans]の進行状態。startTrans()で開始し、finishTrans()で表裏を入れ替えて終了する。
	//	**終了を宣言するのは必ずScriptMng**（時間切れ／[wt]中のクリック）で、
	//	Stage側のGSAPは見た目を動かすだけ。完了コールバックに交換をやらせると、
	//	シナリオの再開（ScriptMng）との前後が保証されず、交換前のページへ次の文が書かれてしまう
	trans		: T_TRANS;
	startTrans	: (arg: T_STARTTRANS)=> void,
	finishTrans	: ()=> void,

	title	: string;
	addTitle	: (t: string)=> void;

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
}
export type T_WAIT = {nm: string; kind: 'l' | 'p'} | null;
export type T_PAGE = 'fore' | 'back';
// 進行中の[trans]。seqは「新しい[trans]が来た」ことをStage側のuseEffectへ伝えるための通し番号
//	（timeが同じ値だと参照が変わってもeffectを撃ち直せないため）
export type T_TRANS = {seq: number; time: number} | null;
export type T_STARTTRANS = {
	aLayNm	: string[] | null;	// 交換するレイヤ名。nullは全レイヤ
	time	: number;			// ミリ秒。0なら演出せず即交換
}
export type T_CHGPIC = {
	nm	: string;
	page: T_PAGE;
	fn	: string;
	aFace	: T_FACE[];	// [lay face=...]で重ねる差分絵（重なり順＝配列順）
}
// [lay b_alpha=...]：文字レイヤ背景の不透明度。値域は0.0（透明）～1.0（不透過）。背景のみを透過させ、文字は透過しない（レイヤ全体の透過度ではない）
export type T_CHGBALPHA = {
	nm		: string;
	page	: T_PAGE;
	b_alpha	: number;
}
export type T_CHGSTR = {
	nm	: string;
	str	: string;
}
// [button]タグで文字レイヤ（UIコンテナ）にボタンを乗せる（独立レイヤにはしない）
export type T_ADDBTN = {
	layerNm	: string;	// 乗せ先の文字レイヤnm
	nm		: string;	// ボタン自身の識別名（同一layer内で一意）
	text	: string;
	label	: string;
	call?	: boolean;	// [button call=true]指定時：クリックでjumpではなくcall（サブルーチンコール）する
	fn?		: string;	// [button fn=...]指定時：別スクリプトのラベルへ飛ぶ（label省略時はそのファイルの先頭）
}

export type T_INIT_FNCS = Readonly<Pick<T_STATE, 'addLayer'|'chgPic'|'chgBAlpha'|'chgStr'|'addBtn'|'addTitle'|'setWait'|'requestSkip'|'setSkipping'|'startTrans'|'finishTrans'>>;


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
// レイヤ1件を探す（見つからない・種別違いは例外）
function findLay<C extends 'grp' | 'txt'>(aLay: T_LAY[], nm: string, cls: C) {
	const e = aLay.find(e=> e.nm === nm);
	if (! e) throw `存在しないレイヤ ${nm} です`;
	if (e.cls !== cls) throw `${nm} は${cls === 'grp' ? '画像' : '文字'}レイヤではありません`;
	return e as Extract<T_LAY, {cls: C}>;
}


export const useStore = create<T_STATE>()(set=> ({	// わざとカーリー化
	txt		: '',
	addTxt	: t=> set(s=> ({txt: s.txt + t})),
	clearTxt: ()=> set(()=> ({txt: ''})),

	aPage	: [[], []],
	foreIdx	: 0,
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
	//	独立レイヤ（cls:'btn'）としてはscopedしないことで、文字レイヤごと表示/非表示を一括で切り替えられる。
	//	書き込み先は表ページ固定（[button]のページ指定は未対応。todo.md参照）
	addBtn	: ({layerNm, nm, text, label, call, fn}: T_ADDBTN)=> set(s=> {
		const {idx, aLay} = pickPage(s, 'fore');
		const e = findLay(aLay, layerNm, 'txt');
		if (e.aBtn.some(b=> b.nm === nm)) throw `ボタン名 ${nm} はレイヤ ${layerNm} 内で既に使用されています`;

		e.aBtn = [...e.aBtn, {nm, text, label, ...(call !== undefined ? {call} : {}), ...(fn !== undefined ? {fn} : {})}];
		return putPage(s, idx, aLay);
	}),
	chgPic	: ({nm, page, fn, aFace}: T_CHGPIC)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, nm, 'grp');

		e.fn = fn;
		e.aFace = aFace;	// [lay face=...]の差分合成情報も同時に更新（未指定時は空配列）
		return putPage(s, idx, aLay);
	}),
	chgBAlpha	: ({nm, page, b_alpha}: T_CHGBALPHA)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, nm, 'txt');

		e.b_alpha = b_alpha;	// レイヤ全体ではなく文字レイヤ背景の不透明度のみ（TxtLayer.tsxでbackground-colorのrgbaのアルファとして反映）
		return putPage(s, idx, aLay);
	}),
	// 文字表示は表ページ固定（地の文・[er]・[r]。本家は[ch]にもpage指定があるが試作では未対応）
	chgStr	: ({nm, str}: T_CHGSTR)=> set(s=> {
		const {idx, aLay} = pickPage(s, 'fore');
		findLay(aLay, nm, 'txt').str = str;
		return putPage(s, idx, aLay);
	}),

	trans		: null,
	// [trans]開始。演出の主役は「表ページを次第に透明にし、下から裏ページを出す」こと（Stage.tsx）。
	//	ここでやるのは下ごしらえだけ：交換対象外のレイヤは、裏へ表の内容を写しておく。
	//	こうしておけば裏ページ＝トランジション後のあるべき画面そのものになり、
	//	最後にforeIdxを反転するだけで完了できる（本家 #trans() の「transしないために交換する」相当）
	startTrans	: ({aLayNm, time}: T_STARTTRANS)=> set(s=> {
		const bi = (1 - s.foreIdx) as 0 | 1;
		const fore = s.aPage[s.foreIdx];
		const back = s.aPage[bi].map(e=> aLayNm && ! aLayNm.includes(e.nm)
			? structuredClone(fore.find(f=> f.nm === e.nm) ?? e)
			: e
		);
		const st = putPage(s, bi, back);

		// time=0（または既読スキップ中）は演出せず即交換。transはnullのままなのでStageは何もしない
		if (time <= 0) return {...st, foreIdx: bi};

		return {...st, trans: {seq: (s.trans?.seq ?? 0) + 1, time}};
	}),
	// 演出終了。表裏を入れ替える（配列の中身ではなく、どちらを表とみなすかを反転するだけ）。
	//	zustandのsetは同期なので、これを呼んだ時点で以降の書き込み先は新しい表ページになる。
	//	演出が途中でも呼んでよい（Stage側が見た目を終了状態へ確定させる）
	finishTrans	: ()=> set(s=> s.trans
		? {foreIdx: (1 - s.foreIdx) as 0 | 1, trans: null}
		: {}	// 演出していない（time=0で交換済み等）なら何もしない
	),

	title		: '',
	addTitle	: title=> set(()=> ({title})),

	isReadBack	: false,
	setReadBack	: b=> set(()=> ({isReadBack: b})),

	isTyping	: false,
	setIsTyping	: b=> set(()=> ({isTyping: b})),
	skipReq		: 0,
	requestSkip	: ()=> set(s=> ({skipReq: s.skipReq + 1})),
	skipping	: false,
	setSkipping	: b=> set(()=> ({skipping: b})),

	wait		: null,
	setWait		: w=> set(()=> ({wait: w})),
}))
