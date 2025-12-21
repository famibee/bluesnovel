/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../sn/SysBase';
import type {TArg, T_HTag} from '../sn/Grammar';
import type {T_LAY} from '../components/Stage';
import type {T_CHGPIC, T_CHGSTR, T_INIT_FNCS} from '../store/store';
import {CmnLib} from '../sn/CmnLib';

type T_TRACE = (txt: string, lvl?: 'D'|'W'|'F'|'E'|'I'|'ET')=> void;


export class ScriptMng {
	readonly	#spnDbg	: HTMLSpanElement;

	constructor(private readonly sys: SysBase) {
		this.#spnDbg = document.createElement('span');
		this.#spnDbg.hidden = true;
		this.#spnDbg.textContent = '';
		this.#spnDbg.style.cssText =
		`	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`
		document.body.appendChild(this.#spnDbg);

		this.#hTag.trace	= o=> this.#trace(o);	// デバッグ表示へ出力
	}

	// Main.tsx からの初期化
	attachTsx(trgNext: ()=> void, fncs: T_INIT_FNCS, hTag: T_HTag) {
		this.$trgNext = trgNext;
		this.$fncs = fncs;
		this.#hTag = hTag;

		this.#hTag.title = ({text})=> {
			if (! text) throw '[title] textは必須です';

			// this.#main_title = text;	//TODO: 
			// this.titleSub(this.#main_title + this.#info_title);
			fncs.addTitle(text);

			return false;
		};
	}
		$trgNext	: ()=> void;
		$fncs		: T_INIT_FNCS;
		#hTag		: T_HTag		= Object.create(null);	// タグ処理辞書


	async load(fn: string) {
		//NOTE: 同じidxの更新をチェックか

		//TODO: スクリプト解析ループ・開始
		//TODO: [l][p][s][wait]での状態を保存

		function* gene1(): Generator<T_LAY | T_CHGPIC | T_CHGSTR> {
			yield {cls: 'GRP', nm: 'base', fn: 'yun_1184'};
			yield {cls: 'TXT', nm: 'mes', str: 'あいうえお'};
			yield {nm: 'mes', str: 'かきくけこ'};
			yield {cls: 'GRP', nm: 'fg0', fn: 'F_1024a'};
			yield {nm: 'base', fn: 'yun_1317'};
		}
		const gen1 = gene1();
		let idxDummy = 0;
		this.go = ()=> {
console.log(`fn:ScriptMng.ts == go ==`);
			while (true) {
				const {done, value: o} = gen1.next();
				if (done) break;
	
				this.sys.caretaker.push(fn +':'+ ++idxDummy);
				if ('cls' in o) this.$fncs.addLayer(o); else
				if ('fn' in o) this.$fncs.chgPic(o); else this.$fncs.chgStr(o);
				break;
			}
		};

		this.$trgNext();
	}

	go() {}


	#trace(hArg: TArg) {
		this.myTrace(hArg.text || `(text is ${hArg.text})`, 'I');

		return false;
	}
	readonly	myTrace: T_TRACE = (txt, lvl = 'E')=> {
		let sty = '';
		switch (lvl) {
			case 'D':	sty = 'color:#05A;';	break;
			case 'W':	sty = 'color:#F80;';	break;
			case 'F':	sty = 'color:#B00;';	break;
			case 'ET':
			case 'E':	sty = 'color:#F30;';	break;
			default:	sty = '';
		}

		const mes = `{${lvl}} `+ txt;
		// const mes = `{${lvl}} `+ this.#scrItr.strPos() + txt;
		this.#spnDbg.innerHTML += `<span style='${sty}'>${mes}</span><br/>`;
		this.#spnDbg.hidden = false;

		switch (lvl) {
			case 'D':	if (CmnLib.isDarkMode) sty = `color:#49F;`;	break;
			case 'W':
			case 'F':	break;
			case 'ET':
			case 'E':
				this.#hTag.title!({text: txt});
				/*if (CmnLib.osName === "AND") {
					const buf = "mailto:foo@hoge.co.jp"
						+ "?subject=AIRNovel_ERR&body="
						+ CmnLib.escapeZenkaku(mes) + "\n"
						+ "※一部記号は全角表示しています。";
					flash.net.navigateToURL(new URLRequest(buf));
				}*/
				// this.#hTag.dump_lay!({});	//TODO: 
				// this.#hTag.dump_val!({});	//TODO: 
				// this.#scrItr.dumpErrForeLine();
				// this.#hTag.dump_stack!({});	//TODO: 

				if (lvl === 'ET') throw mes;
				break;
			default:	sty = '';
		}
		console.info('%c '+ mes, sty);
	}

}
