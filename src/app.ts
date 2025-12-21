/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HPlugin, T_Plugin, T_PluginInitArg} from './sn/CmnInterface';
export type {T_HPlugin, T_Plugin, T_PluginInitArg};
import type {TArg} from './sn/Grammar';
export type {TArg};

import type {T_SysBaseParams} from './sn/CmnInterface';

// 仮置きでここに
export class SysApp {
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
console.log(`fn:app.ts line:13 hPlg:%o arg:%o`, hPlg, arg);
	}
	async init() {


	}

}
