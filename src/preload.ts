/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HINFO} from './appMain_cmn';
import type {T_CFG} from './sn/ConfigBase';

import type {MessageBoxOptions, MessageBoxReturnValue, OpenDialogOptions, OpenDialogReturnValue} from 'electron/renderer';
import type {readFile} from 'fs-extra';

export	type	TAG_WINDOW	= {
	c	: boolean;
	x	: number;
	y	: number;
	w	: number;
	h	: number;
};

export	type	SAVE_WIN_INF	= {
	x	: number;
	y	: number;
	w	: number;
	h	: number;
};

export	type	T_FETCH		= {
	ok	: boolean;
	txt	: string;
};
export	type	T_FETCH_AB	= {
	ok	: boolean;
	ab	: ArrayBuffer;
};


export	type	T_IpcEvents	= {
	openDevTools	: ()=> void;

	getInfo		: ()=> T_HINFO;
	inited		: (oCfg: T_CFG, tagW: TAG_WINDOW)=> void;

	// === vite-electron 用コード ===
	fetch		: (path: string)=> T_FETCH;
	fetchAb		: (path: string)=> T_FETCH_AB;

	existsSync	: (path: string)=> boolean;
	copy		: (path_from: string, path_to: string)=> void;
	remove		: (path: string)=> void;
	ensureFile	: (path: string)=> void;
	// === vite-electron 用コード ===
	readFile	: (path: string, encoding: Parameters<typeof readFile>[1])=> string;
	writeFile	: (path: string, data: string | NodeJS.ArrayBufferView, o?: object)=> void;
	appendFile	: (path: string, data: string)=> void;
	outputFile	: (path: string, data: string)=> void;

	window	: (centering: boolean, x: number, y: number, w: number, h: number)=> void;
	isSimpleFullScreen	: ()=> boolean;
	setSimpleFullScreen	: (b: boolean)=> void;
	win_close		: ()=> void;
	win_setTitle	: (title: string)=> void;

	showMessageBox	: (o: MessageBoxOptions)=> MessageBoxReturnValue;
	showOpenDialog	: (o: OpenDialogOptions)=> OpenDialogReturnValue;

	capturePage	: (path: string, w: number, h: number)=> void;
	navigate_to	: (url: string)=> void;

	Store	: (o: object)=> void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	flush	: (o: any)=> void;
	Store_isEmpty	: ()=> boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Store_get		: ()=> any;

	zip		: (inp: string, out: string)=> void;
	unzip	: (inp: string, out: string)=> void;
};

//Renderer ipc events
export	type	T_IpcRendererEvent = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	log: [any];

	save_win_inf: [SAVE_WIN_INF];
	shutdown	: [];
	fire		: [string];
}
