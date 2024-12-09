/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from '../SysBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {Grammar} from './Grammar';
import {addLayer, chgPic, type T_LAY} from '../components/Stage';
import type {T_CHGPIC} from '../store/store';

import type {AssetsClass} from '@pixi/assets';


export class ScriptMng {
	constructor(private readonly sys: SysBase, private readonly Assets: AssetsClass) {
		this.#grm = new Grammar(sys.cfg);
	}
		readonly	#grm;

	async load(fn: string) {
		const path = this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);
		const txt = await this.Assets.load(path);
		const scr = this.#grm.resolveScript(txt);
console.log(`fn:ScriptMng.ts line:34 1=${scr.aToken[1]}`);

// NOTE: TS最新のジェネレーターみたいなので仮組み。詳細なスクリプトアナライザーなどは後に。
function* generator(): Generator<T_LAY | T_CHGPIC> {
	yield {cls: 'GRP', nm: 'base', fn: 'yun_1184'};
	yield {cls: 'GRP', nm: 'fg0', fn: 'F_1024a'};
	yield {nm: 'base', fn: 'yun_1317'};
}
let idxDummy = 0;
for (const o of generator()) {
	if ('cls' in o) addLayer(o);
	else chgPic(o);

	this.sys.caretaker.key = fn + ':'+ ++idxDummy;
}


		//NOTE: 同じidxの更新をチェックか

		//TODO: スクリプト解析ループ・開始
		//TODO: [l][p][s][wait]での状態を保存

	}

}
