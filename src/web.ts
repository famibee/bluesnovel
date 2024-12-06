/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from './SysBase';
import type {HPlugin, IPlugin, IPluginInitArg} from './CmnInterface';
export type {HPlugin, IPlugin, IPluginInitArg};


export class SysWeb extends SysBase {
	constructor(hPlg: HPlugin = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, arg);
		super.init();
// console.log(`fn:web.ts line:19 hPlg:%o`, this.hPlg);
		//TODO: プラグイン
	}

}
