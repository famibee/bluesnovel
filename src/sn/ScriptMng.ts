/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from './SysBase';


export class ScriptMng {
	constructor(private readonly sys: SysBase) {}

	async load(fn: string) {
		const res = await fetch(this.sys.arg.cur +'script/'+ fn +'.sn');
		if (! res.ok) throw `Err load fn:${fn}`;
		const scr = await this.sys.dec(fn, await res.text());
console.log(`fn:ScriptMng.ts scr:${scr.slice(0, 20)}`);

		const {Stage} = await import('./Stage');	// ここじゃないが
		const stg = new Stage(this.sys);
		stg.init__();
	}
}
