/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HPlugin, ISysBase} from './CmnInterface';
import {Config} from './ts/Config';
import type {IConfig, ISysRoots} from './ts/ConfigBase';
import type {ScriptMng} from './ts/ScriptMng';
import {Caretaker} from './ts/Memento';

import {extensions, ExtensionType} from '@pixi/extensions';

// React Developer Toolsのインストールを推されるコンソールメッセージを消す
(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true};

type HSysBaseArg = {
	cur		: string;
	crypto	: boolean;
	dip		: string;
}


export class SysBase implements ISysRoots, ISysBase {
	constructor(readonly hPlg: HPlugin = {}, readonly arg: HSysBaseArg) {}

	readonly	#ct	= new Caretaker;
	get caretaker() {return this.#ct}


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
		const {opening} = await import('./components/Stage');
		await opening(document.getElementById(SN_ID)!, this);

		await Promise.all([
			import('@pixi/assets'),
			import('./ts/ScriptMng'),
		]).then(async ([{Assets}, {ScriptMng}])=> {
			await Assets.init({basePath: location.origin});
			extensions.add(this.#PixiExt_sn);

			this.#scrMng = new ScriptMng(this, Assets);
			await this.#scrMng.load('main');
		});
	}
		#scrMng	: ScriptMng
		cfg		: IConfig;

		readonly	#PixiExt_sn = {
			extension: {
				type: ExtensionType.LoadParser,
				name: 'sn-loader',
				//priority: LoaderParserPriority.High,
			},
			test: (url: string)=> url.endsWith('.sn'),
			load: (url: string)=> new Promise(async (re, rj)=> {
				const res = await fetch(url);
				if (! res.ok) {rj(`sn-loader fetch err:`+ res.statusText); return}

				try {
					re(await this.dec('sn', await res.text()));
				} catch (e) {rj(`sn-loader err url:${url} ${e}`)}
			}),
		};


	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata}

	readonly dec = (_ext: string, tx: string)=> Promise.resolve(tx);
	readonly hash = (_str: string)=> '';

}
