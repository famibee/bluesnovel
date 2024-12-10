/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_LAY} from '../components/Stage';

import {create} from 'zustand';

type T_STATE = {
	txt		: string;
	addTxt	: (t: string)=> void;
	clearTxt: ()=> void;

	aLay	: T_LAY[];
	replace	: (arg: string)=> void;
	addLayer: (arg: T_LAY)=> void,
	chgPic	: (arg: T_CHGPIC)=> void,
}
export type T_CHGPIC = {
	nm	: string;
	fn	: string;
}


export const useStore = create<T_STATE>()(set=> ({	// わざとカーリー化
	txt		: '',
	addTxt	: t=> set(s=> ({txt: s.txt + t})),
	clearTxt: ()=> set(()=> ({txt: ''})),

	aLay	: [],
	replace	: (arg: string)=> set(_=> ({aLay: JSON.parse(arg)})),
	addLayer: (arg: T_LAY)=> set(s=> ({aLay: [...s.aLay, arg]})),
	chgPic	: ({nm, fn}: T_CHGPIC)=> set(s=> {
		const aLay = [...s.aLay];
		const e = aLay.find(e=> e.nm === nm);
		if (! e) throw `存在しないレイヤ ${nm} です`;
		if (e.cls !== 'GRP') throw `${nm} は画像レイヤではありません`;

		e.fn = fn;
		return {aLay};
	}),
}))
