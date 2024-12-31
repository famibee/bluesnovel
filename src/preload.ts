/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {ipcRenderer} from 'electron';


export	type	TAG_WINDOW	= {
	c	: boolean;
	x	: number;
	y	: number;
	w	: number;
	h	: number;
};


export	type	HPROC	= {
	getInfo		: ()=> Promise<HINFO>;
	// inited		: (oCfg: T_CFG, tagW: TAG_WINDOW)=> Promise<void>;
	// :
};

export	type	HINFO	= {
	getAppPath	: string;
	isPackaged	: boolean;
	downloads	: string;
	userData	: string;
	getVersion	: string;
	env			: {[name: string]: any};
	platform	: string;
	arch		: string;
};


const fncE = console.error;

export const to_app: HPROC = {
	getInfo		: ()=> ipcRenderer.invoke('getInfo').catch(fncE),
	// :
};
