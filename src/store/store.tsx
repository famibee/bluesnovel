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

	aLay	: T_LAY[];
	replace	: (arg: string)=> void;
	addLayer: (arg: T_LAY)=> void,
	chgPic	: (arg: T_CHGPIC)=> void,
	chgBAlpha	: (arg: T_CHGBALPHA)=> void,
	chgStr	: (arg: T_CHGSTR)=> void,
	addBtn	: (arg: T_ADDBTN)=> void,

	title	: string;
	addTitle	: (t: string)=> void;

	isReadBack	: boolean;		// 読み戻り中か（PageUp等でCaretaker.isLast()===falseの間）
	setReadBack	: (b: boolean)=> void;

	isTyping	: boolean;		// 文字送り演出（GSAP）実行中か。trueの間はクリックで進行せずスキップ要求のみ行う
	setIsTyping	: (b: boolean)=> void;
	skipReq		: number;		// TxtLayer側へ「今のアニメを瞬時完了させろ」と伝える合図（インクリメントで通知）
	requestSkip	: ()=> void;

	wait		: T_WAIT;		// 現在[l]/[p]待ち中のレイヤと種別（[s]はマーカーなし=null）
	setWait		: (w: T_WAIT)=> void;
}
export type T_WAIT = {nm: string; kind: 'l' | 'p'} | null;
export type T_CHGPIC = {
	nm	: string;
	fn	: string;
	aFace	: T_FACE[];	// [lay face=...]で重ねる差分絵（重なり順＝配列順）
}
// [lay b_alpha=...]：文字レイヤ背景の不透明度。値域は0.0（透明）～1.0（不透過）。背景のみを透過させ、文字は透過しない（レイヤ全体の透過度ではない）
export type T_CHGBALPHA = {
	nm		: string;
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
}

export type T_INIT_FNCS = Readonly<Pick<T_STATE, 'addLayer'|'chgPic'|'chgBAlpha'|'chgStr'|'addBtn'|'addTitle'|'setWait'>>;


export const useStore = create<T_STATE>()(set=> ({	// わざとカーリー化
	txt		: '',
	addTxt	: t=> set(s=> ({txt: s.txt + t})),
	clearTxt: ()=> set(()=> ({txt: ''})),

	aLay	: [],
	replace	: (arg: string)=> set(()=> ({aLay: JSON.parse(arg)})),
	addLayer: (arg: T_LAY)=> set(s=> {
		// レイヤ名（nm）はcls（grp/txt）をまたいで全体で一意である前提
		//	（chgPic/chgStrがcls不問でnmだけを検索キーにしているため）。
		//	重複したまま追加するとStage.tsxのkey={l.nm}が衝突し、Reactの
		//	「Encountered two children with the same key」警告や表示不具合の原因になる。
		if (s.aLay.some(e=> e.nm === arg.nm)) throw `レイヤ名 ${arg.nm} は既に使用されています（既存の${s.aLay.find(e=> e.nm === arg.nm)!.cls}レイヤと重複）`;

		return {aLay: [...s.aLay, arg]};
	}),
	// [button]タグ：指定した文字レイヤ（UIコンテナ）のaBtnにボタンを1件追加する。
	//	独立レイヤ（cls:'btn'）としてはscopedしないことで、文字レイヤごと表示/非表示を一括で切り替えられる。
	addBtn	: ({layerNm, nm, text, label, call}: T_ADDBTN)=> set(s=> {
		const aLay = [...s.aLay];
		const e = aLay.find(e=> e.nm === layerNm);
		if (! e) throw `存在しないレイヤ ${layerNm} です`;
		if (e.cls !== 'txt') throw `${layerNm} は文字レイヤ（UIコンテナ）ではありません`;
		if (e.aBtn.some(b=> b.nm === nm)) throw `ボタン名 ${nm} はレイヤ ${layerNm} 内で既に使用されています`;

		e.aBtn = [...e.aBtn, {nm, text, label, ...(call !== undefined ? {call} : {})}];
		return {aLay};
	}),
	chgPic	: ({nm, fn, aFace}: T_CHGPIC)=> set(s=> {
		const aLay = [...s.aLay];
		const e = aLay.find(e=> e.nm === nm);
		if (! e) throw `存在しないレイヤ ${nm} です`;
		if (e.cls !== 'grp') throw `${nm} は画像レイヤではありません`;

		e.fn = fn;
		e.aFace = aFace;	// [lay face=...]の差分合成情報も同時に更新（未指定時は空配列）
		return {aLay};
	}),
	chgBAlpha	: ({nm, b_alpha}: T_CHGBALPHA)=> set(s=> {
		const aLay = [...s.aLay];
		const e = aLay.find(e=> e.nm === nm);
		if (! e) throw `存在しないレイヤ ${nm} です`;
		if (e.cls !== 'txt') throw `${nm} は文字レイヤではありません`;

		e.b_alpha = b_alpha;	// レイヤ全体ではなく文字レイヤ背景の不透明度のみ（TxtLayer.tsxでbackground-colorのrgbaのアルファとして反映）
		return {aLay};
	}),
	chgStr	: ({nm, str}: T_CHGSTR)=> set(s=> {
		const aLay = [...s.aLay];
		const e = aLay.find(e=> e.nm === nm);
		if (! e) throw `存在しないレイヤ ${nm} です`;
		if (e.cls !== 'txt') throw `${nm} は文字レイヤではありません`;

		e.str = str;
		return {aLay};
	}),

	title		: '',
	addTitle	: title=> set(()=> ({title})),

	isReadBack	: false,
	setReadBack	: b=> set(()=> ({isReadBack: b})),

	isTyping	: false,
	setIsTyping	: b=> set(()=> ({isTyping: b})),
	skipReq		: 0,
	requestSkip	: ()=> set(s=> ({skipReq: s.skipReq + 1})),

	wait		: null,
	setWait		: w=> set(()=> ({wait: w})),
}))
