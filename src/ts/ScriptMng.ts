/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from './SysBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {Grammar} from './Grammar';


export class ScriptMng {
	constructor(private readonly sys: SysBase) {
		this.#grm = new Grammar(sys.cfg);
	}
		readonly	#grm;

	async load(fn: string) {
		const path = this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);
		const txt = await this.sys.load(path);
		const scr = this.#grm.resolveScript(txt);
console.log(`fn:ScriptMng.ts line:34 1=${scr.aToken[1]}`);


		//NOTE: 同じidxの更新をチェックか

		//TODO: スクリプト解析ループ・開始
		//TODO: [l][p][s][wait]での状態を保存

	}

}
