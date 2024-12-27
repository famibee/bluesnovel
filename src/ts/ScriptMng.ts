/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from './SysBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {Grammar} from './Grammar';
import type {T_LAY} from '../components/Stage';
import type {T_CHGPIC, T_CHGSTR, T_INIT_FNCS} from '../store/store';


export class ScriptMng {
	readonly	#grm;

	constructor(private readonly sys: SysBase) {
		this.#grm = new Grammar(sys.cfg);
	}

	init(trgNext: ()=> void, fncs: T_INIT_FNCS) {
		this.$trgNext = trgNext;
		this.$fncs = fncs;
	}
		$trgNext	: ()=> void;
		$fncs		: T_INIT_FNCS;

	async load(fn: string) {
		const path = this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);
		const txt = await this.sys.load(path);
		const scr = this.#grm.resolveScript(txt);
console.log(`fn:ScriptMng.ts line:34 1=${scr.aToken[1]}`);

		function* gene(): Generator<T_LAY | T_CHGPIC | T_CHGSTR> {
			yield {cls: 'GRP', nm: 'base', fn: 'yun_1184'};
			yield {cls: 'TXT', nm: 'mes', str: 'あいうえお'};
			yield {nm: 'mes', str: 'かきくけこ'};
			yield {cls: 'GRP', nm: 'fg0', fn: 'F_1024a'};
			yield {nm: 'base', fn: 'yun_1317'};
		}
		const gen = gene();
		let idxDummy = 0;
		this.go = ()=> {
console.log(`fn:ScriptMng.ts == go ==`);
			while (true) {
				const {done, value: o} = gen.next();
				if (done) break;
	
				this.sys.caretaker.push(fn +':'+ ++idxDummy);
				if ('cls' in o) this.$fncs.addLayer(o); else
				if ('fn' in o) this.$fncs.chgPic(o); else this.$fncs.chgStr(o);
				break;
			}
		};

		//NOTE: 同じidxの更新をチェックか

		//TODO: スクリプト解析ループ・開始
		//TODO: [l][p][s][wait]での状態を保存

		this.$trgNext();
	}

	go() {}
}
