/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HPlugin, ISysBase} from './CmnInterface';
import {Config} from './Config';
import {IConfig, ISysRoots} from './ConfigBase';
import type {ScriptMng} from './ScriptMng';

// React Developer Toolsのインストールを推されるコンソールメッセージを消す
(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true};

type HSysBaseArg = {
	cur		: string;
	crypto	: boolean;
	dip		: string;
}


export class SysBase implements ISysRoots, ISysBase {
	constructor(readonly hPlg: HPlugin = {}, readonly arg: HSysBaseArg) {
		this.cur = this.arg.cur;
		this.crypto = this.arg.crypto;
	}
		readonly cur;
		readonly crypto;


	protected	async init() {
		this.#cfg = await Config.generate(this);
// console.log(`fn:SysBase.ts jsPrj:%o`, this.#cfg.oCfg);

		const {ScriptMng} = await import('./ScriptMng');
		this.#scrMng = new ScriptMng(this);
		this.#scrMng.load('main');
	}
		#scrMng	: ScriptMng
		#cfg	: IConfig;
		get cfg() {return this.#cfg}


	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata}

	dec = (_ext: string, tx: string)=> Promise.resolve(tx);
	hash = (_str: string)=> '';

}
