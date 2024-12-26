/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HPlugin, ISysBase, T_SysBaseLoadedParams} from './CmnInterface';
import {Config} from './Config';
import type {IConfig, IFn2Path, ISysRoots} from './ConfigBase';
import {Caretaker} from './Memento';


// React Developer Toolsのインストールを推されるコンソールメッセージを消す
(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true};

type HSysBaseArg = {
	cur		: string;
	crypto	: boolean;
	dip		: string;
}


export class SysBase implements ISysRoots, ISysBase {
	constructor(readonly hPlg: HPlugin = {}, readonly arg: HSysBaseArg) {}
	protected async loaded(...[_hPlg,]: T_SysBaseLoadedParams) {
		return Promise.resolve();
	}
	fetch = (url: string, init?: RequestInit)=> fetch(url, init);

	readonly	#ct	= new Caretaker;
	get caretaker() {return this.#ct}


	cfg: IConfig;
	async loadPath(_hPathFn2Exts: IFn2Path, cfg: IConfig) {this.cfg = cfg}


	protected async run() {}


	protected	async init() {
		this.cfg = await Config.generate(this);

		document.head.insertAdjacentHTML('beforeend',
`<style type="text/css">
	body {
		background-color: ${this.cfg.oCfg.init.bg_color};
	}
	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
</style>`);

		const SN_ID = 'skynovel';
		const cvs = <HTMLCanvasElement>document.getElementById(SN_ID);
		if (cvs) {
			const clone_cvs = <HTMLCanvasElement>cvs.cloneNode(true);
			clone_cvs.id = SN_ID;
		}
		else document.body.insertAdjacentHTML('afterbegin', `<div id="${SN_ID}"></div>`);
		const {opening} = await import('../components/Main');
		await opening({heStage: document.getElementById(SN_ID)!, sys: this});
	}


	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata}

	readonly dec = (_ext: string, tx: string)=> Promise.resolve(tx);
	readonly hash = (_str: string)=> '';

}
