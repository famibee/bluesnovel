/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HPlugin, IPlugin, IPluginInitArg, T_SysBaseLoadedParams} from './ts/CmnInterface';
export type {HPlugin, IPlugin, IPluginInitArg};

import {Config} from './ts/Config';
import {opening} from './components/Main';
import {SysBase} from './ts/SysBase';
import type {IFn2Path, IConfig} from './ts/ConfigBase';
import type {T_SysBaseParams} from './ts/CmnInterface';

const	SN_ID	= 'skynovel';

export class SysWeb extends SysBase {
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
		super(hPlg, arg);
// console.log(`fn:web.ts line:19 hPlg:%o`, this.hPlg);
		//TODO: プラグイン
		queueMicrotask(async ()=> this.loaded(hPlg, arg));
	}
	protected override async loaded(...[hPlg, arg]: T_SysBaseLoadedParams) {
		await super.loaded(hPlg, arg);

		await this.run();
	}

	protected	override run = async ()=> {
		let e = <HTMLDivElement>document.getElementById(SN_ID);
		if (e) {
			const clone_cvs = <HTMLDivElement>e.cloneNode(true);
			clone_cvs.id = SN_ID;
		}
		else {	// 自動的に作ってくれるが、どうも appendChild に遅延があるので
			e = document.createElement('div');
			e.id = SN_ID;
			document.body.appendChild(e);
		}

		await Config.generate(this);

		opening({heStage: e, sys: this});
	}


	override async loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig) {
		await super.loadPath(hPathFn2Exts, cfg);

		const fn = this.arg.cur +'path.json';
		const res = await this.fetch(fn);
		if (! res.ok) throw Error(res.statusText);

		const src = await res.text();
		const oJs = JSON.parse(await this.dec(fn, src));
		for (const [nm, v] of Object.entries(oJs)) {
			const h = hPathFn2Exts[nm] = <any>v;
			for (const [ext, w] of Object.entries(h)) {
				if (ext !== ':cnt') h[ext] = this.arg.cur + w;
			}
		}
	}

}

// import {CmnLib, argChk_Num, argChk_Boolean} from './sn/CmnLib';
// import {Layer} from './sn/Layer';
// export {SysWeb, CmnLib, argChk_Num, argChk_Boolean, Layer};
