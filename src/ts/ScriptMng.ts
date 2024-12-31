/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from './SysBase';
import {type HArg, type IHTag, splitAmpersand, tagToken2Name, tagToken2Name_Args} from './Grammar';
import type {T_LAY} from '../components/Stage';
import type {T_CHGPIC, T_CHGSTR, T_INIT_FNCS} from '../store/store';
import {CmnLib} from './CmnLib';
import {ScriptIterator} from './ScriptIterator';
import {AnalyzeTagArg} from './AnalyzeTagArg';
import {CallStack} from './CallStack';
import type {Variable} from './Variable';
import type {PropParser} from './PropParser';
import type {Scope} from './CmnInterface';

type T_TRACE = (txt: string, lvl?: 'D'|'W'|'F'|'E'|'I'|'ET')=> void;


export class ScriptMng {
	readonly	#spnDbg	: HTMLSpanElement;
	readonly	#scrItr	: ScriptIterator;

	#setVal_Nochk = (_scope: Scope, _nm: string, _val: any, _autocast = false)=> {}
	#getValAmpersand	= (_v: string)=> '';
	#parse				= (_s: string): any => {};

	#isBreak = (_token: string)=> false;	//TODO: 

	constructor(
		private readonly sys	: SysBase,
		private readonly hTag	: IHTag,
		private readonly trgNext: ()=> void,
		private readonly fncs	: T_INIT_FNCS,
				readonly val	: Variable,
				readonly prpPrs	: PropParser,
	) {
		this.#spnDbg = document.createElement('span');
		this.#spnDbg.hidden = true;
		this.#spnDbg.textContent = '';
		this.#spnDbg.style.cssText = `
			z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`
		document.body.appendChild(this.#spnDbg);

		this.#scrItr = new ScriptIterator(sys);

		this.#setVal_Nochk = (scope, nm, v, autocast)=> val.setVal_Nochk(scope, nm, v, autocast);
		this.#getValAmpersand = v=> prpPrs.getValAmpersand(v);
		this.#parse = s=> prpPrs.parse(s);

		hTag.trace		= o=> this.#trace(o);			// デバッグ表示へ出力
	}


	async load(fn: string) {
		//NOTE: 同じidxの更新をチェックか

		//TODO: スクリプト解析ループ・開始
		//TODO: [l][p][s][wait]での状態を保存

		//TODO: resumeByJumpOrCall
		this.#setVal_Nochk('tmp', 'sn.eventArg', /*hArg.arg ??*/ '');
		this.#setVal_Nochk('tmp', 'sn.eventLabel', /*hArg.label ??*/ '');

		const gen = await this.#scrItr.load(fn);
		while (true) {
			const {done, value} = gen.next();
			if (done) {this.myTrace('🎍 スクリプト末尾', 'E'); break}
			this.#scrItr.addIdxToken();

			let token = value;
// console.log(`fn:ScriptMng.ts 🍉 %o`, token);
			switch (value.charAt(0)) {
				case '\t':	continue;	//  タブ

				case '\n':	// 改行
					this.#scrItr.addLineNum(token.length);	continue;

				case '[':	// タグ開始
console.log(`fn:ScriptMng.ts 🍊 TAG ${token}`);
					if (this.#isBreak(token)) return;
					try {
						const cl = (token.match(/\n/g) ?? []).length;
						if (cl > 0) this.#scrItr.addLineNum(cl);
						// if (this.#scrItr.タグ解析(token)) {this.stop(); return}	//TODO: 
					}
					catch (e) {
						if (e instanceof Error) this.myTrace(`[${tagToken2Name(token)}]タグ解析中例外 mes=${e.message}(${e.name})`);
						else this.myTrace(String(e));
						return;
					}
					continue;

				case '&':	//  変数操作・変数表示
					try {
						if (! value.endsWith('&')) {	//変数操作
							// 変数計算
							if (this.#isBreak(token)) return;
							const o = splitAmpersand(token.slice(1));
							o.name = this.#getValAmpersand(o.name);
							o.text = String(this.#parse(o.text));
							this.hTag.let!(o);
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
					break;

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
				if ('cls' in o) this.fncs.addLayer(o); else
				if ('fn' in o) this.fncs.chgPic(o); else this.fncs.chgStr(o);
				break;
			}
		};

		this.trgNext();
	}

	go() {}


	// result = true : waitする  resume()で再開
	#procDebugtag	= (_tag_name: string)=> {};
	//MARK: タグ解析
	タグ解析(tagToken: string): boolean {
		const [tag_name, args] = tagToken2Name_Args(tagToken);
		const tag_fnc = this.hTag[tag_name];
		if (! tag_fnc) throw `未定義のタグ【${tag_name}】です`;

		this.#alzTagArg.parse(args);
		this.#procDebugtag(tag_name);

		const hPrm = this.#alzTagArg.hPrm;
		if (hPrm.cond) {
			const cond = hPrm.cond.val;
			if (! cond || cond.startsWith('&')) throw '属性condは「&」が不要です';
			// const p = this.prpPrs.parse(cond);
			// const ps = String(p);
			// if (ps === 'null' || ps === 'undefined') return false;
			// if (! p) return false;
		}

		let hArg: any = {};
		const len = this.#aCallStk.length;
		const csa: any = len === 0 ?{} :this.#aCallStk[len -1]!.csArg;
		if (this.#alzTagArg.isKomeParam) {
			if (len === 0) throw '属性「*」はマクロのみ有効です';
			hArg = {...csa};
		}
		hArg[':タグ名'] = tag_name;
	// #region タグ位置のコールスタック情報を埋め込むコード（デバッグ用）
	/*	{
			const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
			let now = `存在位置 fn:${this.#scriptFn} line:${lc0.ln} col:${lc0.col_s +1}`;
			hArg[':path'] = now;
			const len = this.#aCallStk.length;
			if (len > 0) {
				for (let i=len -1; i>=0; --i) {
					const cs = this.#aCallStk[i];
					const hMp = cs.csArg[':hMp'];
					const from_macro_nm = hMp ?hMp[':タグ名'] :undefined;
					const call_nm = cs.csArg[':タグ名'] ?? '';
					const lc = this.#cnvIdx2lineCol(this.#hScript[cs.fn], cs.idx);
					now += ` <- (${len -i}) fn:${cs.fn} line:${lc.ln
						} col:${lc.col_s +1
						}`+ (from_macro_nm ?'（['+ from_macro_nm +']マクロ内）' :' ')+
						`で [${call_nm} ...]をコール`;
				}
			}
		}*/
	// #endregion
	// #region タグ位置情報を埋め込むコード（デバッグ用）
//		hArg[':path'] = this.#scriptFn;
//		hArg[':ln'] = this.#lineNum;
	// #endregion
		// valやdefの値について。null はありえない。'null'や'undefined' はありえる。
		// 省略時以外で undefined はない。a=undefined と書いても 'undefined' になる
		for (const [arg_nm, {val, def}] of Object.entries(hPrm)) {
			let v = val;
			if (v?.startsWith('%')) {
				if (len === 0) throw '属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）';
				const mac = csa[v.slice(1)];
				if (mac) {hArg[arg_nm] = mac; continue}

				if (def === undefined || def === 'null') continue;
					// defの'null'指定。%変数が無い場合、タグやマクロに属性を渡さない
				v = def;
			}

			// v = this.prpPrs.getValAmpersand(v ?? '');
			// if (v !== 'undefined') {hArg[arg_nm] = v; continue}

			// if (def === undefined) continue;
			// v = this.prpPrs.getValAmpersand(def);
			// if (v !== 'undefined') hArg[arg_nm] = v;
			// 	// 存在しない値の場合、属性を渡さない
		}

		return tag_fnc(hArg);
	}
		readonly	#alzTagArg	= new AnalyzeTagArg;
		#aCallStk	: CallStack[]	= [];	// FILOバッファ（push/pop）


	#trace(hArg: HArg) {
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

		const mes = `{${lvl}} `+ this.#scrItr.strPos() + txt;
		this.#spnDbg.innerHTML += `<span style='${sty}'>${mes}</span><br/>`;
		this.#spnDbg.hidden = false;

		switch (lvl) {
			case 'D':	if (CmnLib.isDarkMode) sty = `color:#49F;`;	break;
			case 'W':
			case 'F':	break;
			case 'ET':
			case 'E':
				this.hTag.title!({text: txt});
				/*if (CmnLib.osName === "AND") {
					const buf = "mailto:foo@hoge.co.jp"
						+ "?subject=AIRNovel_ERR&body="
						+ CmnLib.escapeZenkaku(mes) + "\n"
						+ "※一部記号は全角表示しています。";
					flash.net.navigateToURL(new URLRequest(buf));
				}*/
				// this.#hTag.dump_lay!({});	//TODO: 
				// this.#hTag.dump_val!({});	//TODO: 
				this.#scrItr.dumpErrForeLine();
				// this.#hTag.dump_stack!({});	//TODO: 

				if (lvl === 'ET') throw mes;
				break;
			default:	sty = '';
		}
		console.info('%c '+ mes, sty);
	}

}
