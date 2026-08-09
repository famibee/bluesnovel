/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HPlugin, T_Plugin, T_PluginInitArg} from './sn/CmnInterface';
export type {T_HPlugin, T_Plugin, T_PluginInitArg};
import type {TArg} from './sn/Grammar';
export type {TArg};

import {SysBase} from './sn/SysBase';
import type {T_SysBaseParams, T_SysBaseLoadedParams} from './sn/CmnInterface';

// 仮置きでここに
export class SysWeb extends SysBase {
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
		super(hPlg, arg);
		queueMicrotask(async ()=> this.loaded(hPlg, arg));
	}

	protected override async loaded(...[hPlg, arg]: T_SysBaseLoadedParams) {
		await super.loaded(hPlg, arg);	// cfg.oCfgはこの後で使える

		// debug.devtool=falseの時だけ警告オーバーレイのガードを有効化（本家 devtools-detect相当。
		//	理由・仕組みは DevToolsGuard.ts 参照。Electronアプリ版は appMain_cmn.ts が別途対応済み）
		if (! this.cfg.oCfg.debug.devtool) {
			const {initDevToolsGuard} = await import('./ts/DevToolsGuard');
			initDevToolsGuard();
		}
	}

	// [log]用（本家 SysWeb.ts:264 appendFile/outputFile）。ブラウザにファイル追記の手段は無いので、
	//	呼ばれるたびパス単位で全文をメモリに溜め直し、都度ダウンロードで置き換える形で代用する
	//	（本家はoutputFile()を別メソッドに分けて[save pic=]等とも共有するが、こちらは[log]専用なので
	//	1メソッドにまとめる）
	readonly #hAppendFile: {[path: string]: string} = {};
	override async appendFile(path: string, data: string) {
		const txt = (this.#hAppendFile[path] ?? '') + data;
		this.#hAppendFile[path] = txt;

		const blob = new Blob([txt], {type: 'text/plain'});
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = path;
		a.click();
		URL.revokeObjectURL(a.href);
	}

}

// import {CmnLib, argChk_Num, argChk_Boolean} from './ts/CmnLib';
// import {Layer} from './ts/Layer';
// export {SysWeb, CmnLib, argChk_Num, argChk_Boolean, Layer};
