/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from './SysBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {Grammar, type Script, type HArg, type IHTag, tagToken2Name} from './Grammar';
import type {T_LAY} from '../components/Stage';
import type {T_CHGPIC, T_CHGSTR, T_INIT_FNCS} from '../store/store';
import {CmnLib} from './CmnLib';

type T_TRACE = (txt: string, lvl?: 'D'|'W'|'F'|'E'|'I'|'ET')=> void;


export class ScriptMng {
	readonly	#grm;
				#spnDbg	: HTMLSpanElement;

	constructor(private readonly sys: SysBase) {
		this.#grm = new Grammar(sys.cfg);
		this.#hTag.trace		= o=> this.#trace(o);			// デバッグ表示へ出力

		this.#spnDbg = document.createElement('span');
		this.#spnDbg.hidden = true;
		this.#spnDbg.textContent = '';
		this.#spnDbg.style.cssText =
		`	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`
		document.body.appendChild(this.#spnDbg);
	}

	// Main.tsx からの初期化
	attachTsx(trgNext: ()=> void, fncs: T_INIT_FNCS, hTag: IHTag) {
		this.$trgNext = trgNext;
		this.$fncs = fncs;
		this.#hTag = hTag;
	}
		$trgNext	: ()=> void;
		$fncs		: T_INIT_FNCS;
		#hTag		: IHTag		= Object.create(null);	// タグ処理辞書


		#script		: Script	= {aToken: [''], len: 1, aLNum: [1]};
		#scriptFn	= '';
		#idxToken	= 0;
		#lineNum	= 0;
	async load(fn: string) {
		this.#scriptFn = fn;
		const path = this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);
		const txt = await this.sys.load(path);
		this.#script = this.#grm.resolveScript(txt);

		this.#idxToken = 0;	//TODO: idx jump
		this.#lineNum = 1;

		//NOTE: 同じidxの更新をチェックか

		//TODO: スクリプト解析ループ・開始
		//TODO: [l][p][s][wait]での状態を保存

		const gen = this.#script.aToken.slice(this.#idxToken).values();
		while (true) {
			const {done, value} = gen.next();
			if (done) {this.myTrace('🍇 スクリプト末尾', 'E'); break;}
			++this.#idxToken;

			let token = value;
// console.log(`fn:ScriptMng.ts 🍉 %o`, token);
			switch (value.charAt(0)) {
				case '\t':	continue;	//  タブ

				case '\n':	// 改行
					this.#lineNum += token.length;	continue;

				case '[':	{	// タグ開始
console.log(`fn:ScriptMng.ts 🍊 TAG ${token}`);
					// if (this.#scrItr.isBreak(token)) return;	//TODO: 
					try {
						const cl = (token.match(/\n/g) ?? []).length;
						if (cl > 0) this.#lineNum += cl;
						// if (this.#scrItr.タグ解析(token)) {this.stop(); return}	//TODO: 
					}
					catch (e) {
						if (e instanceof Error) this.myTrace(`[${tagToken2Name(token)}]タグ解析中例外 mes=${e.message}(${e.name})`);
						else this.myTrace(String(e));
						return;
					}
				}	continue;

				case '&':	{	//  変数操作・変数表示
					try {
						if (! value.endsWith('&')) {	//変数操作
							//TODO: 変数計算
							// if (this.#scrItr.isBreak(token)) return;
							// const o = splitAmpersand(token.slice(1));
							// o.name = this.#getValAmpersand(o.name);
							// o.text = String(this.#parse(o.text));
							// this.#hTag.let!(o);
							continue;
						}

						if (value.charAt(1) === '&') throw new Error('「&表示&」書式では「&」指定が不要です');
						// token = String(this.#parse( token.slice(1, -1) ));	//TODO: 
					}
					catch (err) {
						this.myTrace(
							err instanceof Error
								? `& 変数操作・表示 mes=${err.message}(${err.name})`
								: String(err)
						);
						return;
					}
				}	break;

				case ';':	continue;	// コメント

				case '*':		//  ラベル
					if (value.length > 1) continue;
					break;
			}

			//TODO: 文字表示
			try {
				// this.#layMng.setNormalChWait();	//TODO: 
				// const tl = this.#layMng.currentTxtlayForeNeedErr;
				// tl.tagCh(token);
console.log(`fn:ScriptMng.ts 🍈 tagCh:${token}`);
			}
			catch (err) {
				this.myTrace(
					err instanceof Error
						? `文字表示 mes=${err.message}(${err.name})`
						: String(err)
				);
				return;
			}
		}



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


	#trace(hArg: HArg) {
		this.myTrace(hArg.text || `(text is ${hArg.text})`, 'I');

		return false;
	}
	readonly	myTrace: T_TRACE = (txt, lvl = 'E')=> {
		let mes = `{${lvl}} `+ this.#strPos() + txt;
		this.#dspDbg(mes, lvl);

		let sty = '';
		switch (lvl) {
			case 'D':	sty = `color:#${CmnLib.isDarkMode ?'49F' :'05A'};`;	break;
			case 'W':	sty = 'color:#F80;';	break;
			case 'F':	sty = 'color:#B00;';	break;
			case 'ET':
			case 'E':
				// this.#hTag.title!({text: txt});	//TODO: 
				/*if (CmnLib.osName === "AND") {
					const buf = "mailto:foo@hoge.co.jp"
						+ "?subject=AIRNovel_ERR&body="
						+ CmnLib.escapeZenkaku(mes) + "\n"
						+ "※一部記号は全角表示しています。";
					flash.net.navigateToURL(new URLRequest(buf));
				}*/
				// this.#hTag.dump_lay!({});	//TODO: 
				// this.#hTag.dump_val!({});	//TODO: 
				this.dumpErrForeLine();
				// this.#hTag.dump_stack!({});	//TODO: 

				if (lvl === 'ET') throw mes;
				console.error('%c'+ mes, 'color:#F30;');	return;
			default:	sty = '';	mes = ' '+ mes;
		}
		console.info('%c'+ mes, sty);
	}
		#strPos = ()=> this.#lineNum > 0
			? `(fn:${this.#scriptFn} line:${this.#lineNum}) `
			: '';
		readonly	#dspDbg: T_TRACE = (mes, lvl)=> {
			let sty = '';
			switch (lvl) {
				case 'D':	sty = 'color:#05A;';	break;
				case 'W':	sty = 'color:#F80;';	break;
				case 'F':	sty = 'color:#B00;';	break;
				case 'ET':
				case 'E':	sty = 'color:#F30;';	break;
				default:	sty = '';
			}
			this.#spnDbg.innerHTML += `<span style='${sty}'>${mes}</span><br/>`;
			this.#spnDbg.hidden = false;
		};

	#dumpErrLine = 5;	//TODO: 
	dumpErrForeLine() {
		if (this.#idxToken === 0) {
			console.group(`🥟 Error line (from 0 rows before) fn:${this.#scriptFn}`);
			console.groupEnd();
			return;
		}

		let s = '';
		for (let i=this.#idxToken -1; i>=0; --i) {
			s = this.#script.aToken[i] + s;
			if ((s.match(/\n/g) ?? []).length >= this.#dumpErrLine) break;
		}
		const a = s.split('\n').slice(-this.#dumpErrLine);
		const len = a.length;
		console.group(`🥟 Error line (from ${len} rows before) fn:${this.#scriptFn}`);
		const ln_txt_width = String(this.#lineNum).length;
		const lc = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
		for (let i=0; i<len; ++i) {
			const ln = this.#lineNum -len +i +1;
			const mes = `${String(ln).padStart(ln_txt_width, ' ')}: %c`;
			const e = a[i]!;
			const line = (e.length > 75) ?e.slice(0, 75) +'…' :e;	// 長い場合は後略
			if (i === len -1) console.info(
				mes + line.slice(0, lc.col_s) +'%c'+ line.slice(lc.col_s),
				'color: black; background-color: skyblue;', 'color: black; background-color: pink;'
			)
			else console.info(mes + line, 'color: black; background-color: skyblue;');
		}
		console.groupEnd();
		//console.log('Linkの出力   : %o', 'file:///Volumes/MacHD2/_Famibee/SKYNovel/prj/mat/main.sn');
	}
		#cnvIdx2lineCol(st: Script, idx: number): {ln: number, col_s: number, col_e: number} {
			const ret = {ln: 1, col_s: 0, col_e: 0};
			if (! st) return ret;

			let i = idx -1;
			const lN = ret.ln = st.aLNum[i]!;
			while (st.aLNum[i] === lN) {
				if (! st.aToken[i]!.startsWith('\n')) {
					const len = st.aToken[i]!.length;
// console.log(`fn:ScriptMng.ts line:269 cnvIdx2lineCol tkn:${st.aToken[i]} len:${len} s:${ret.col_s} e:${ret.col_e}`);
					if (ret.col_e > 0) ret.col_s += len;
					ret.col_e += len;
				}
				if (--i < 0) break;
			}

			return ret;
		}

}
