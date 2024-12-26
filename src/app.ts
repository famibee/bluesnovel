/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HPlugin, IPlugin, IPluginInitArg} from './CmnInterface';
export type {HPlugin, IPlugin, IPluginInitArg};

import {T_SysBaseParams} from './ts/CmnInterface';

export class SysApp {
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
console.log(`fn:app.ts line:13 hPlg:%o arg:%o`, hPlg, arg);
	}
	async init() {


	}

}
