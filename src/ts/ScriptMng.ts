/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from '../SysBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
// import {Caretaker} from './Memento';
import {Grammar} from './Grammar';
import {addLayer} from '../components/Stage';
import {T_GRPLAY} from '../components/GrpLayer';

import type {AssetsClass} from '@pixi/assets';

export class ScriptMng {
	static	async	generate(sys: SysBase, Assets: AssetsClass) {
		const sm = new ScriptMng(sys, Assets);

		// sm.#ct.add(sm.#stg);
		return sm;
	}

	// #ct		= new Caretaker;
	private	constructor(private readonly sys: SysBase, private readonly Assets: AssetsClass) {
		this.#grm = new Grammar(sys.cfg);
	}
		readonly	#grm;

	async load(fn: string) {
		const path = this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);
		const txt = await this.Assets.load(path);
		const scr = this.#grm.resolveScript(txt);
console.log(`fn:ScriptMng.ts line:34 1=${scr.aToken[1]}`);

		addLayer({cls: 'GRP', nm: 'base', fn: 'yun_1184'} as T_GRPLAY);
		addLayer({cls: 'GRP', nm: 'fg0', fn: 'F_1024a'} as T_GRPLAY);


		//NOTE: 同じidxの更新をチェックか

		//TODO: スクリプト解析ループ・開始
		//TODO: [l][p][s][wait]での状態を保存

	}

}
