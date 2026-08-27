/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, cssColorOf} from './CmnLib';
import type {SysBase} from './SysBase';
import {ConfigBase, SEARCH_PATH_ARG_EXT, type T_CFG_RAW} from './ConfigBase';

export const PROTOCOL_USERDATA	= 'userdata:/';
export const PROTOCOL_DL		= 'downloads:/';


export class Config extends ConfigBase {
	static	async	generate(sys: SysBase) {
		const c = new Config(sys);
		const fn = sys.arg.cur +'prj.json';
		const res = await sys.fetch(fn);
		if (! res.ok) throw Error(`プロジェクトが見つかりません: ${fn} (${res.status} ${res.statusText})`);

		const dec = await sys.dec(fn, await res.text());
		let raw: T_CFG_RAW;
		try {
			raw = <T_CFG_RAW>JSON.parse(dec);
		} catch {
			// devサーバ（vite等）はSPAフォールバックでres.ok=trueのままindex.htmlを返すことがあり、
			//	存在しないプロジェクト名でもres.okチェックだけでは検出できない。JSON解析自体の
			//	失敗をここで捕まえて分かりやすいメッセージに変える
			throw Error(`プロジェクトが見つかりません（JSONとして解析できませんでした）: ${fn}`);
		}
		await c.load(raw);
		return c;
	}

	protected	constructor(override readonly sys: SysBase) {super(sys)}

	protected	override	async load(oCfg: T_CFG_RAW) {
		oCfg.window ??= {width: 300, height: 300};
		CmnLib.stageW = oCfg.window.width;
		CmnLib.stageH = oCfg.window.height;
		CmnLib.debugLog = oCfg.debug.debugLog;
		CmnLib.masume = oCfg.debug.masume;
		CmnLib.init();	// UA文字列を見るだけなので同期（本家はplatform.jsを動的importしていた）

		await super.load(oCfg);
		// super.load()後：this.oCfg.initは既定値とマージ済みなので、未指定でも安全に読める
		CmnLib.bgColor = cssColorOf(this.oCfg.init.bg_color);
	}

	override	searchPath(fn: string, extptn: SEARCH_PATH_ARG_EXT = SEARCH_PATH_ARG_EXT.DEFAULT): string {
		if (fn.startsWith(PROTOCOL_DL)) {
			return this.sys.path_downloads + fn.slice(11);
		}
		if (fn.startsWith(PROTOCOL_USERDATA)) {
			return this.sys.path_userdata + 'storage/'+ fn.slice(10);
		}

		return super.searchPath(fn, extptn);
	}

}
