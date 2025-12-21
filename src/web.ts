/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HPlugin, T_Plugin, T_PluginInitArg} from './sn/CmnInterface';
export type {T_HPlugin, T_Plugin, T_PluginInitArg};
import type {TArg} from './sn/Grammar';
export type {TArg};

import {SysBase} from './sn/SysBase';
import type {T_SysBaseParams} from './sn/CmnInterface';

// 仮置きでここに
export class SysWeb extends SysBase {
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
		super(hPlg, arg);
// console.log(`fn:web.ts line:19 hPlg:%o`, this.hPlg);
		//TODO: プラグイン
		queueMicrotask(async ()=> this.loaded(hPlg, arg));
	}

}

// import {CmnLib, argChk_Num, argChk_Boolean} from './ts/CmnLib';
// import {Layer} from './ts/Layer';
// export {SysWeb, CmnLib, argChk_Num, argChk_Boolean, Layer};
