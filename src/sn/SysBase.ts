/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HPlugin, T_SysBase, T_SysBaseLoadedParams} from './CmnInterface';
import { T_Config, T_SysRoots } from './ConfigBase';
import {Caretaker} from '../ts/Memento';


// React Developer Toolsのインストールを推されるコンソールメッセージを消す
(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true};

type HSysBaseArg = {
	cur		: string;
	crypto	: boolean;
	dip		: string;
}

const	SN_ID	= 'skynovel';


export class SysBase implements T_SysRoots, T_SysBase {
	constructor(readonly hPlg: T_HPlugin = {}, readonly arg: HSysBaseArg) {}
	protected async loaded(...[_hPlg,]: T_SysBaseLoadedParams) {
		document.head.insertAdjacentHTML('beforeend',
`<style type="text/css">
	body {
		background-color: black;
	}
	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
</style>`);

		await Promise.all([
			import('react-dom/client'),
			import('../components/Main'),
			import('./Config'),
			import('../ts/ScriptMng'),
		]).then(async ([{createRoot}, {initMain}, {Config}, {ScriptMng}])=> {
			// React 初期表示
			const cfg = await Config.generate(this);
			this.setMain(cfg);
			document.body.style.backgroundColor = String(cfg.oCfg.init.bg_color);

			let he = <HTMLDivElement>document.getElementById(SN_ID);
			if (he) {
				const clone_cvs = <HTMLDivElement>he.cloneNode(true);
				clone_cvs.id = SN_ID;
			}
			else {	// 自動的に作ってくれるが、どうも appendChild に遅延があるので
				he = document.createElement('div');
				he.id = SN_ID;
				document.body.appendChild(he);
			}
			const scrMng = new ScriptMng(this);
			initMain(createRoot(he), {heStage: he, sys: this, scrMng}, ()=> {
				queueMicrotask(()=> scrMng.load('title'));	// TODO: 仮
				// void scrMng.load('title');	//x
				// void Promise.all([]).then(()=> scrMng.load('title'));// o
			});
		});
	}

	readonly	#ct	= new Caretaker;
	get caretaker() {return this.#ct}


	cfg: T_Config;
	setMain(cfg: T_Config) {
		this.cfg = cfg;
	}
	protected async run() {}


	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata}

	readonly dec = (_ext: string, tx: string)=> Promise.resolve(tx);
	readonly hash = (_str: string)=> '';

}
