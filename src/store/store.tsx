/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {T_LAY} from '../components/Stage';

import {create} from 'zustand';

type T_STATE = {
	happys	: number;
	happysUp: ()=> void;

	aLay	: T_LAY[];
	addLayer: (l: T_LAY)=> void,
}

export const useStore = create<T_STATE>()(set=> ({
	happys	: 10,
	happysUp: ()=> set(s=> ({
		happys: s.happys + 1,
	})),

	aLay	: [],
	addLayer: (l: T_LAY)=> set(s=> ({
		aLay: [...s.aLay, l],
	})),
}))
