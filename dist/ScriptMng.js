import { g as E } from "./CmnLib.js";
import { S as u } from "./ConfigBase.js";
class k {
  // 87 match 2725 step(0.5ms) PCRE2 https://regex101.com/r/aeN57J/1
  /*
  ;[^\n]*
  |	(?<key>[^\s="'#|;]+)
  	(?: \s | ;[^\n]*\n)*
  	=
  	(?: \s | ;[^\n]*\n)*
  	(?:	(?<val> [^\s"'#|;]+)
  	|	(["'#]) (?<val2>.*?) \3 )
  	(?: \|
  		(?: (?<def> [^\s"'#;]+)
  	|	(["'#]) (?<def2>.*?) \6 ) )?
  |	(?<literal>[^\s;]+)
  	*/
  #e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
  // 【属性 = 値 | 省略値】の分析
  parse(t) {
    this.#s = {}, this.#n = !1;
    for (const { groups: s } of t.matchAll(this.#e)) {
      const { key: e, val: o, val2: r, def: n, def2: i, literal: a } = s;
      e ? this.#s[e] = {
        val: o ?? r ?? "",
        def: n ?? i
      } : a && (a === "*" ? this.#n = !0 : this.#s[a] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, s, e, o) {
    const r = {}, n = t.slice(1 + s, -1);
    for (const { groups: i, index: a, 0: c } of n.matchAll(this.#e)) {
      if (a === void 0) continue;
      const { key: h, val: f, val2: g = "", literal: m } = i;
      if (m) {
        if (m.endsWith("=")) {
          const d = m.length - 1, { ch: p } = this.#t(s, e, o, n, a + d);
          r[m.slice(0, -1)] = {
            k_ln: e,
            k_ch: p - d,
            v_ln: e,
            v_ch: p + 1,
            //	v_ch: ch +1+lenNm +literal.length +1,
            v_len: 0
          };
        }
        continue;
      }
      if (!h) continue;
      const { ln: b, ch: w } = this.#t(s, e, o, n, a), { ln: $, ch: x } = this.#t(s, e, o, n, a + c.lastIndexOf(f ?? g ?? "") - (f ? 0 : 1));
      r[h] = { k_ln: b, k_ch: w, v_ln: $, v_ch: x, v_len: f ? f.length : g.length + 2 };
    }
    return r;
  }
  #t(t, s, e, o, r) {
    const i = o.slice(0, r).split(`
`), a = i.length;
    return {
      ln: s + a - 1,
      ch: a < 2 ? e + 1 + t + r : i.at(-1).length
    };
  }
  #s = {};
  get hPrm() {
    return this.#s;
  }
  #n = !1;
  get isKomeParam() {
    return this.#n;
  }
}
const _ = /(?<name>[^\s;\]]+)/;
function T(l) {
  const s = _.exec(l.slice(1, -1))?.groups;
  if (!s) throw `タグ記述【${l}】異常です(タグ解析)`;
  const e = s.name;
  return [e, l.slice(1 + e.length, -1)];
}
function A(l) {
  const s = _.exec(l.slice(1))?.groups;
  if (!s) throw `タグ記述【${l}】異常です(タグ解析)`;
  return s.name;
}
function y(l) {
  const t = l.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), s = t.length;
  if (s < 2 || s > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
  const [e, o, r] = t;
  if (o.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
  return {
    name: e.replaceAll("＝", "==").replaceAll("≠", "!="),
    text: o.replaceAll("＝", "==").replaceAll("≠", "!="),
    cast: s === 3 ? r.trim() : void 0
  };
}
class N {
  constructor(t) {
    this.cfg = t, this.setEscape("");
  }
  #e;
  setEscape(t) {
    if (this.#i && t in this.#i) throw "[エスケープ文字] char【" + t + "】が登録済みの括弧マクロまたは一文字マクロです";
    this.#e = new RegExp(
      (t ? `\\${t}\\S|` : "") + // エスケープシーケンス
      `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${t ? `\\${t}` : ""}]+`,
      // 本文
      "gs"
    ), this.#t = new RegExp(`[\\w\\s;[\\]*=&｜《》${t ? `\\${t}` : ""}]`), this.#f = new RegExp(`[\\n\\t;\\[*&${t ? `\\${t}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(t, s, e, o) {
    const { name: r, text: n } = t;
    if (!r) throw "[bracket2macro] nameは必須です";
    if (!n) throw "[bracket2macro] textは必須です";
    const i = n.at(0);
    if (!i) throw "[bracket2macro] textは必須です";
    if (n.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(r in s)) throw `[bracket2macro] 未定義のタグ又はマクロ[${r}]です`;
    this.#i ??= {};
    const a = n.charAt(1);
    if (i in this.#i) throw "[bracket2macro] text【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (a in this.#i) throw "[bracket2macro] text【" + a + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(i)) throw "[bracket2macro] text【" + i + "】は括弧マクロに使用できない文字です";
    if (this.#t.test(a)) throw "[bracket2macro] text【" + a + "】は括弧マクロに使用できない文字です";
    this.#i[a] = "0", this.#i[i] = `[${r} text=`, this.addC2M(`\\${i}[^\\${a}]*\\${a}`, `\\${i}\\${a}`), this.#l(e, o);
  }
  // 一文字マクロの定義
  char2macro(t, s, e, o) {
    const { char: r, name: n } = t;
    if (!r) throw "[char2macro] charは必須です";
    if (this.#i ??= {}, r in this.#i) throw "[char2macro] char【" + r + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(r)) throw "[char2macro] char【" + r + "】は一文字マクロに使用できない文字です";
    if (!n) throw "[char2macro] nameは必須です";
    if (!(n in s)) throw `[char2macro] 未定義のタグ又はマクロ[${n}]です`;
    this.#i[r] = `[${n}]`, this.addC2M(`\\${r}`, `\\${r}`), this.#l(e, o);
  }
  #t;
  #s = new RegExp("");
  #n = "";
  #r = "";
  addC2M(t, s) {
    this.#n += `${t}|`, this.#r += `${s}`, this.#s = new RegExp(
      `(${this.#n}[^${this.#r}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const s = t.replaceAll(/\r\n?/g, `
`).match(this.#e)?.flatMap((o) => {
      if (!this.testTagLetml(o)) return o;
      const r = /^([^\]]+?])(.*)$/s.exec(o);
      if (!r) return o;
      const [, n, i] = r;
      return [n, i];
    }) ?? [], e = { aToken: s, len: s.length, aLNum: [] };
    return this.#l(e), this.#c(e), e;
  }
  #o = /^\[(call|loadplugin)\s/;
  #a = /\bfn\s*=\s*[^\s\]]+/;
  #c(t) {
    for (let s = t.len - 1; s >= 0; --s) {
      const e = t.aToken[s];
      if (!this.#o.test(e)) continue;
      const [o, r] = T(e);
      this.#h.parse(r);
      const n = this.#h.hPrm.fn;
      if (!n) continue;
      const { val: i } = n;
      if (!i || !i.endsWith("*")) continue;
      t.aToken.splice(s, 1, "	", "; " + e), t.aLNum.splice(s, 1, NaN, NaN);
      const a = o === "loadplugin" ? u.CSS : u.SN, c = this.cfg.matchPath("^" + i.slice(0, -1) + ".*", a);
      for (const h of c) {
        const f = e.replace(
          this.#a,
          "fn=" + decodeURIComponent(E(h[a]))
        );
        t.aToken.splice(s, 0, f), t.aLNum.splice(s, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #h = new k();
  testTagLetml(t) {
    return /^\[let_ml\s/.test(t);
  }
  testTagEndLetml(t) {
    return /^\[endlet_ml\s*]/.test(t);
  }
  analyzToken(t) {
    return this.#e.lastIndex = 0, this.#e.exec(t);
  }
  #i;
  #f;
  #l(t, s = 0) {
    if (this.#i) {
      for (let e = t.len - 1; e >= s; --e) {
        const o = t.aToken[e];
        if (this.testNoTxt(o.at(0) ?? `
`)) continue;
        const r = t.aLNum[e], n = o.match(this.#s);
        if (!n) continue;
        let i = 1;
        for (let a = n.length - 1; a >= 0; --a) {
          let c = n[a];
          const h = this.#i[c.at(0) ?? " "];
          h && (c = h + (h.endsWith("]") ? "" : `'${c.slice(1, -1)}']`)), t.aToken.splice(e, i, c), t.aLNum.splice(e, i, r), i = 0;
        }
      }
      t.len = t.aToken.length;
    }
  }
  testNoTxt(t) {
    return this.#f.test(t);
  }
  //4tst
}
class v {
  // #aCallStk	: CallStack[]	= [];	// FILOバッファ（push/pop）
  //MARK: コンストラクタ
  constructor(t) {
    this.sys = t, this.#r = new N(t.cfg);
    const s = t.cfg.oCfg.init.escape;
    this.#r.setEscape(s);
  }
  #e = { aToken: [""], len: 1, aLNum: [1] };
  #t = "";
  // get scriptFn() {return this.#scriptFn}
  #s = 0;
  addIdxToken() {
    ++this.#s;
  }
  subIdxToken() {
    --this.#s;
  }
  #n = 0;
  get lineNum() {
    return this.#n;
  }
  addLineNum = (t) => this.#n += t;
  // jumpJustBefore() {this.#jumpWork(this.#scriptFn, '', --this.#idxToken)}
  // 	// 直前にジャンプ
  #r;
  // readonly	#alzTagArg	= new AnalyzeTagArg;
  async load(t) {
    this.#t = t;
    const s = this.sys.cfg.searchPath(t, u.SCRIPT), e = await this.sys.load(s);
    return this.#e = this.#r.resolveScript(e), this.#s = 0, this.#n = 1, this.#e.aToken.slice(this.#s).values();
  }
  strPos = () => this.#n > 0 ? `(fn:${this.#t} line:${this.#n}) ` : "";
  #o = 5;
  //TODO: 
  dumpErrForeLine() {
    if (this.#s === 0) {
      console.group(`🥟 Error line (from 0 rows before) fn:${this.#t}`), console.groupEnd();
      return;
    }
    let t = "";
    for (let n = this.#s - 1; n >= 0 && (t = this.#e.aToken[n] + t, !((t.match(/\n/g) ?? []).length >= this.#o)); --n)
      ;
    const s = t.split(`
`).slice(-this.#o), e = s.length;
    console.group(`🥟 Error line (from ${e} rows before) fn:${this.#t}`);
    const o = String(this.#n).length, r = this.#a(this.#e, this.#s);
    for (let n = 0; n < e; ++n) {
      const i = this.#n - e + n + 1, a = `${String(i).padStart(o, " ")}: %c`, c = s[n], h = c.length > 75 ? c.slice(0, 75) + "…" : c;
      n === e - 1 ? console.info(
        a + h.slice(0, r.col_s) + "%c" + h.slice(r.col_s),
        "color: black; background-color: skyblue;",
        "color: black; background-color: pink;"
      ) : console.info(a + h, "color: black; background-color: skyblue;");
    }
    console.groupEnd();
  }
  #a(t, s) {
    const e = { ln: 1, col_s: 0, col_e: 0 };
    if (!t) return e;
    let o = s - 1;
    const r = e.ln = t.aLNum[o];
    for (; t.aLNum[o] === r; ) {
      if (!t.aToken[o].startsWith(`
`)) {
        const n = t.aToken[o].length;
        e.col_e > 0 && (e.col_s += n), e.col_e += n;
      }
      if (--o < 0) break;
    }
    return e;
  }
  // 	noticeWait = ()=> {};
  // 	#regBreakPoint(fn: string, o: {[ln: number]: any}) {
  // 		ScriptIterator.#hFn2hLineBP[this.#cnvSnPath4Dbg(fn)] = o;
  // 	}
  // 	destroy() {this.isBreak = ()=> false}
  // 	readonly #hHook	: {[type: string]: (o: any)=> void}	= {
  // 		//auth: // constructorで
  // 		//launch:	// ここでは冒頭停止に間に合わないのでanalyzeInit()で
  // 		disconnect: ()=> {
  // 			ScriptIterator.#hFn2hLineBP = {};
  // 			ScriptIterator.#hFuncBP = {};
  // 			this.isBreak = ()=> false;
  // 			this.#hHook.continue!({});
  // 			this.#breakState = BreakState.Running;
  // 		},
  // 		restart: ()=> this.isBreak = ()=> false,
  // 		// ブレークポイント登録
  // 		add_break: o=> this.#regBreakPoint(o.fn, o.o),
  // 		data_break: o=> {
  // 			if (this.#breakState !== BreakState.Running) return;
  // 			this.#breakState = BreakState.Wait;
  // 			this.main.setLoop(false, `変数 ${o.dataId}【${o.old_v}】→【${o.new_v}】データブレーク`);
  // 			this.sys.callHook('stopOnDataBreakpoint', {});	// sn全体へ通知
  // 			this.sys.send2Dbg('stopOnDataBreakpoint', {});
  // 		},
  // 		set_func_break: o=> {
  // 			ScriptIterator.#hFuncBP = {};
  // 			for (const v of o.a) ScriptIterator.#hFuncBP[v.name] = 1;
  // 			this.sys.send2Dbg(o.ri, {});
  // 		},
  // 		// 情報問い合わせ系
  // 		stack: o=> this.sys.send2Dbg(o.ri, {a: this.#aStack()}),
  // 		eval: o=> {this.sys.send2Dbg(o.ri, {v: this.prpPrs.parse(o.txt)})},
  // 		// デバッガからの操作系
  // 		continue: ()=> {
  // 			if (this.#isIdxOverLast()) return;
  // 			this.#idxToken -= this.#idxDx4Dbg;
  // 			this.#breakState = BreakState.Breaking;
  // 			this.main.setLoop(true);
  // 			this.main.resume();	// jumpループ後などで停止している場合があるので
  // 		},
  // 		stepover: o=> this.#go_stepover(o),
  // 		stepin: ()=> {
  // 			if (this.#isIdxOverLast()) return;
  // 			const tkn = this.#script.aToken[this.#idxToken -this.#idxDx4Dbg];
  // 			this.sys.callHook(`stopOnStep${this.#REGSTEPIN.test(tkn ?? '') ?'In' :''}`, {});	// sn全体へ通知
  // 			this.#idxToken -= this.#idxDx4Dbg;
  // 			this.#breakState = this.#breakState === BreakState.Wait
  // 				? BreakState.Step
  // 				: BreakState.Stepping;
  // 			this.main.setLoop(true);
  // 			this.main.resume();	// jumpループ後などで停止している場合があるので
  // 		},
  // 		stepout: o=> {
  // 			if (this.#isIdxOverLast()) return;
  // 			if (this.#aCallStk.length > 0) this.#go_stepout(true);
  // 			else this.#go_stepover(o);
  // 		},
  // 		pause: ()=> {
  // 			this.#breakState = BreakState.Step;
  // 			this.main.setLoop(false, '一時停止');
  // 			this.sys.send2Dbg('stopOnStep', {});
  // 		},
  // 		stopOnEntry: ()=> {
  // 			this.#breakState = BreakState.Step;
  // 			this.main.setLoop(false, '一時停止');
  // 			this.sys.send2Dbg('stopOnEntry', {});
  // 		},
  // 	};
  // 	readonly #cnvSnPath = (fn: string)=> this.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);
  // 	static	readonly	#REG4CODE_FN	= /(.+)\/crypto_prj\/([^\/]+)\/[^\.]+(\.\w+)/;	// https://regex101.com/r/Km54EK/1 141 steps (~0ms)
  // 	readonly #cnvSnPath4Dbg = (fn: string)=>
  // 		(this.sys.pathBaseCnvSnPath4Dbg + this.#cnvSnPath(fn))
  // 		.replace(ScriptIterator.#REG4CODE_FN, `$1/prj/$2/${this.#scriptFn}$3`);
  // 	cnvPath4Dbg = (fn: string)=> this.sys.pathBaseCnvSnPath4Dbg + fn.replace('/crypto_prj/', '/prj/');
  // 	#go_stepover(o: any) {
  // 		if (this.#isIdxOverLast()) return;
  // 		const tkn = this.#script.aToken[this.#idxToken -this.#idxDx4Dbg];
  // 		if (this.#REGSTEPIN.test(tkn ?? '')) this.#go_stepout(false);
  // 		else {
  // 			this.sys.callHook('stopOnStep', {});	// sn全体へ通知
  // 			this.#hHook.stepin!(o);
  // 		}
  // 	}
  // 	#go_stepout(out: boolean) {
  // 		this.sys.callHook(`stopOnStep${out ?'Out' :''}`, {});	// sn全体へ通知
  // 		this.#csDepth_macro_esc = this.#aCallStk.length -(out ?1 :0);
  // 		this.#idxToken -= this.#idxDx4Dbg;
  // 		this.#breakState = out ?BreakState.StepOut :BreakState.StepOuting;
  // 		this.main.setLoop(true);
  // 		this.main.resume();	// jumpループ後などで停止している場合があるので
  // 	}
  // 	#csDepth_macro_esc	= 0;
  // 	get #idxDx4Dbg() {
  // 		return this.#breakState === BreakState.Break
  // 			|| this.#breakState === BreakState.Step ?1 :0
  // 	};
  // 	#isIdxOverLast(): boolean {
  // 		if (this.#idxToken < this.#script.len) return false;
  // 		this.sys.callHook('stopOnEntry', {});	// sn全体へ通知
  // 		this.main.setLoop(false, 'スクリプト終端です');
  // 		return true;
  // 	}
  // 	// reload 再生成 Main に受け渡すため static
  // 	static	#hFn2hLineBP: {[fn: string]: {[ln: number]: any}} = {};
  // 	static	#hFuncBP: {[tag_name: string]: 1} = {};
  // 	#breakState	= BreakState.Running;
  // 		// https://raw.githubusercontent.com/famibee/SKYNovel-vscode-extension/master/src/doc/BreakStateSMD.pu
  // 	isBreak = (_token: string)=> false;
  // 	#isBreak_base(token: string): boolean {
  // 		switch (this.#breakState) {
  // 			case BreakState.StepOuting:	this.#subHitCondition();
  // 				this.#breakState = BreakState.StepOut;	break;
  // 			case BreakState.StepOut:
  // 				if (this.#aCallStk.length !== this.#csDepth_macro_esc) break;
  // 				this.#breakState = BreakState.Step;
  // 				this.main.setLoop(false, 'ステップ実行');
  // 				this.sys.send2Dbg('stopOnStep', {});
  // 				return true;	// タグを実行せず、直前停止
  // 			case BreakState.Stepping:	this.#subHitCondition();
  // 				this.#breakState = BreakState.Step;	break;
  // 			case BreakState.Step:		this.#subHitCondition();
  // 				this.main.setLoop(false, 'ステップ実行');
  // 				this.sys.send2Dbg('stopOnStep', {});
  // 				return true;	// タグを実行せず、直前停止
  // 			case BreakState.Breaking:	this.#subHitCondition();
  // 				this.#breakState = BreakState.Running;	break;
  // 			default:
  // 			{	// 関数ブレークポイント
  // 				if (tagToken2Name(token) in ScriptIterator.#hFuncBP) {
  // 					this.#breakState = BreakState.Break;
  // 					this.main.setLoop(false, `関数 ${token} ブレーク`);
  // 					this.sys.callHook('stopOnBreakpoint', {});	// sn全体へ通知
  // 					this.sys.send2Dbg('stopOnBreakpoint', {});
  // 					return true;	// タグを実行せず、直前停止
  // 				}
  // 			}
  // 			{	// ブレークポイント
  // 				const bp = ScriptIterator.#hFn2hLineBP[this.#cnvSnPath4Dbg(this.#scriptFn)];
  // 				if (! bp) break;
  // 				const o = bp[this.#lineNum];
  // 				if (! o) break;
  // //console.log(`fn:ScriptIterator.ts line:145 👺 【bs:${this.#breakState} idx:${this.#idxToken} ln:${this.#lineNum} tkn:${this.#script.aToken[this.#idxToken -1]}:】 o:%o`, o);
  // 				if (o.condition) {if (! this.prpPrs.parse(o.condition)) break}
  // 				else if (('hitCondition' in o) && --o.hitCondition > 0) break;
  // 				const isBreak = this.#breakState === BreakState.Running;
  // 				this.#breakState = BreakState.Break;
  // 				this.main.setLoop(false, isBreak ?(
  // 					(o.condition ? '条件' :'ヒットカウント') +'ブレーク'
  // 					) :'ステップ実行');
  // 				const type = isBreak ?'stopOnBreakpoint' :'stopOnStep';
  // 				this.sys.callHook(type, {});	// sn全体へ通知
  // 				this.sys.send2Dbg(type, {});
  // 			}
  // 				return true;	// タグを実行せず、直前停止
  // 		}
  // 		return false;	// no break、タグを実行
  // 	}
  // 	#subHitCondition() {	// step実行中でbreakしないがヒットカウントだけ減算
  // 		const o = ScriptIterator.#hFn2hLineBP[getFn(this.#scriptFn)]?.[this.#lineNum];
  // 		if (o?.hitCondition) --o.hitCondition;
  // 	}
  // 	#aStack(): {fn: string, ln: number, col: number, nm: string, ma: string}[] {
  // 		const idx_n = this.#breakState === BreakState.Breaking ?1 :0;
  // 		const tkn0 = this.#script.aToken[this.#idxToken -1 +idx_n]!;
  // 		const fn0 = this.#cnvSnPath4Dbg(this.#scriptFn);
  // 		const tag_name0 = tagToken2Name(tkn0!);
  // 		const nm = tag_name0 ?`[${tag_name0}]` :tkn0;
  // //console.log(`fn:ScriptIterator.ts aStack breakState:${this.#breakState} idx:${this.#idxToken -1} idx_n:${idx_n} tkn0:${tkn0}: fn0:${fn0} nm:${nm} tkn02:${this.#script.aToken[this.#idxToken -1]}: +tkn02:${this.#script.aToken[this.#idxToken]}:`);
  // //console.log(`fn:ScriptIterator.ts     a:%o anum:%o`, this.script.aToken, this.script.aLNum);
  // 		const ma = this.val.getVal('mp:const.sn.macro') ?? '{}';
  // 		if (this.#idxToken === 0) return [{fn: fn0, ln: 1, col: 1, nm, ma: ma,}];
  // 		const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);// -1不要
  // //console.log(`fn:ScriptIterator.ts     ln:${lc0.ln} col:${lc0.col_s} col2:${this.#script.aLNum[this.#idxToken -1]}`);
  // 		const a = [{fn: fn0, ln: lc0.ln, col: lc0.col_s +1, nm: nm, ma: ma}];
  // 		const len = this.#aCallStk.length;
  // 		if (len === 0) return a;
  // 		for (let i=len -1; i>=0; --i) {
  // 			const cs = this.#aCallStk[i]!;
  // 			const st = this.#hScript[cs.fn];
  // 			if (! st) continue;
  // 			const tkn = st.aToken[cs.idx -1];
  // 			if (! tkn) continue;
  // 			const lc = this.#cnvIdx2lineCol(st, cs.idx);	// -1不要
  // 			const tag_name = tagToken2Name(tkn);
  // 			a.push({
  // 				fn	: this.#cnvSnPath4Dbg(cs.fn),
  // 				ln	: lc.ln,
  // 				col	: lc.col_s +1,
  // 				nm	: tag_name ?`[${tag_name}]` :tkn,
  // 				ma	: cs.csArg[':hMp']['const.sn.macro'] ?? '{}',
  // 			});
  // 		}
  // 		return a;
  // 	}
  // 	// result = true : waitする  resume()で再開
  // 	#procDebugtag	= (_tag_name: string)=> {};
  // 	//MARK: タグ解析
  // 	タグ解析(tagToken: string): boolean {
  // 		const [tag_name, args] = tagToken2Name_Args(tagToken);
  // 		const tag_fnc = this.hTag[tag_name];
  // 		if (! tag_fnc) throw `未定義のタグ【${tag_name}】です`;
  // 		this.#alzTagArg.parse(args);
  // 		this.#procDebugtag(tag_name);
  // 		const hPrm = this.#alzTagArg.hPrm;
  // 		if (hPrm.cond) {
  // 			const cond = hPrm.cond.val;
  // 			if (! cond || cond.startsWith('&')) throw '属性condは「&」が不要です';
  // 			const p = this.prpPrs.parse(cond);
  // 			const ps = String(p);
  // 			if (ps === 'null' || ps === 'undefined') return false;
  // 			if (! p) return false;
  // 		}
  // 		let hArg: any = {};
  // 		const len = this.#aCallStk.length;
  // 		const csa: any = len === 0 ?{} :this.#aCallStk[len -1]!.csArg;
  // 		if (this.#alzTagArg.isKomeParam) {
  // 			if (len === 0) throw '属性「*」はマクロのみ有効です';
  // 			hArg = {...csa};
  // 		}
  // 		hArg[':タグ名'] = tag_name;
  // 	// #region タグ位置のコールスタック情報を埋め込むコード（デバッグ用）
  // 	/*	{
  // 			const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
  // 			let now = `存在位置 fn:${this.#scriptFn} line:${lc0.ln} col:${lc0.col_s +1}`;
  // 			hArg[':path'] = now;
  // 			const len = this.#aCallStk.length;
  // 			if (len > 0) {
  // 				for (let i=len -1; i>=0; --i) {
  // 					const cs = this.#aCallStk[i];
  // 					const hMp = cs.csArg[':hMp'];
  // 					const from_macro_nm = hMp ?hMp[':タグ名'] :undefined;
  // 					const call_nm = cs.csArg[':タグ名'] ?? '';
  // 					const lc = this.#cnvIdx2lineCol(this.#hScript[cs.fn], cs.idx);
  // 					now += ` <- (${len -i}) fn:${cs.fn} line:${lc.ln
  // 						} col:${lc.col_s +1
  // 						}`+ (from_macro_nm ?'（['+ from_macro_nm +']マクロ内）' :' ')+
  // 						`で [${call_nm} ...]をコール`;
  // 				}
  // 			}
  // 		}*/
  // 	// #endregion
  // 	// #region タグ位置情報を埋め込むコード（デバッグ用）
  // //		hArg[':path'] = this.#scriptFn;
  // //		hArg[':ln'] = this.#lineNum;
  // 	// #endregion
  // 		// valやdefの値について。null はありえない。'null'や'undefined' はありえる。
  // 		// 省略時以外で undefined はない。a=undefined と書いても 'undefined' になる
  // 		for (const [arg_nm, {val, def}] of Object.entries(hPrm)) {
  // 			let v = val;
  // 			if (v?.startsWith('%')) {
  // 				if (len === 0) throw '属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）';
  // 				const mac = csa[v.slice(1)];
  // 				if (mac) {hArg[arg_nm] = mac; continue}
  // 				if (def === undefined || def === 'null') continue;
  // 					// defの'null'指定。%変数が無い場合、タグやマクロに属性を渡さない
  // 				v = def;
  // 			}
  // 			v = this.prpPrs.getValAmpersand(v ?? '');
  // 			if (v !== 'undefined') {hArg[arg_nm] = v; continue}
  // 			if (def === undefined) continue;
  // 			v = this.prpPrs.getValAmpersand(def);
  // 			if (v !== 'undefined') hArg[arg_nm] = v;
  // 				// 存在しない値の場合、属性を渡さない
  // 		}
  // 		return tag_fnc(hArg);
  // 	}
  // 	#evtMng	: EventMng;
  // 	#layMng	: LayerMng;
  // 	setOtherObj(evtMng: EventMng, layMng: LayerMng): void {
  // 		this.#evtMng = evtMng;
  // 		this.#layMng = layMng;
  // 	}
  // 	//MARK: インラインテキスト代入
  // 	#let_ml(hArg: HArg) {
  // 		const {name} = hArg;
  // 		if (! name) throw 'nameは必須です';
  // 		let ml = '';
  // 		const len = this.#script.len;
  // 		for (; this.#idxToken<len; ++this.#idxToken) {
  // 			ml = this.#script.aToken[this.#idxToken]!;
  // 			if (ml !== '') break;
  // 		}
  // 		hArg.text = ml;
  // 		hArg.cast = 'str';
  // 		this.hTag['let']!(hArg);
  // 		this.#idxToken += 2;
  // 		this.#lineNum += (ml.match(/\n/g) ?? []).length;
  // 		return false;
  // 	}
  // 	//MARK: スタックのダンプ
  // 	#dump_stack() {
  // 		if (this.#idxToken === 0) {
  // 			console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#scriptFn} line:${1} col:${0}`);
  // 			console.groupEnd();
  // 			return false;
  // 		}
  // 		const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
  // 		const now = `スクリプト現在地 fn:${this.#scriptFn} line:${lc0.ln} col:${lc0.col_s +1}`;
  // 		console.group(`🥟 [dump_stack] ${now}`);
  // 		const len = this.#aCallStk.length;
  // 		if (len > 0) {
  // 			console.info(now);
  // 			for (let i=len -1; i>=0; --i) {
  // 				const cs = this.#aCallStk[i]!;
  // 				const hMp = cs.csArg[':hMp'];
  // 				const from_macro_nm = hMp ?hMp[':タグ名'] :undefined;
  // 				const call_nm = cs.csArg[':タグ名'] ?? '';
  // 				const lc = this.#cnvIdx2lineCol(this.#hScript[cs.fn]!, cs.idx);
  // 				console.info(
  // 					`${len -i}つ前のコール元 fn:${cs.fn} line:${lc.ln
  // 					} col:${lc.col_s +1
  // 					}`+ (from_macro_nm ?'（['+ from_macro_nm +']マクロ内）' :' ')+
  // 					`で [${call_nm} ...]をコール`
  // 				);
  // 			}
  // 		}
  // 		console.groupEnd();
  // 		return false;
  // 	}
  // 	#cnvIdx2lineCol(st: Script, idx: number): {ln: number, col_s: number, col_e: number} {
  // 		const ret = {ln: 1, col_s: 0, col_e: 0};
  // 		if (! st) return ret;
  // 		let i = idx -1;
  // 		const lN = ret.ln = st.aLNum[i]!;
  // 		while (st.aLNum[i] === lN) {
  // 			if (! st.aToken[i]!.startsWith('\n')) {
  // 				const len = st.aToken[i]!.length;
  // //console.log(`fn:ScriptIterator.ts line:586 cnvIdx2lineCol tkn:${st.aToken[i]} len:${len} s:${ret.col_s} e:${ret.col_e}`);
  // 				if (ret.col_e > 0) ret.col_s += len;
  // 				ret.col_e += len;
  // 			}
  // 			if (--i < 0) break;
  // 		}
  // 		return ret;
  // 	}
  // 	//MARK: 外部へスクリプトを表示
  // 	#dump_script(hArg: HArg) {
  // 		const {set_fnc, break_fnc} = hArg;
  // 		if (! set_fnc) throw 'set_fncは必須です';	// スクリプトを返すコールバック
  // 		this.#fncSet = (globalThis as any)[set_fnc];
  // 		if (! this.#fncSet) {
  // 			if (argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${set_fnc}が見つかりません`;
  // 			this.#fncSet = ()=> {};
  // 			return false;
  // 		}
  // 		this.noticeBreak = (goto: boolean)=> {
  // 			if (this.#fnLastBreak !== this.#scriptFn) {
  // 				this.#fnLastBreak = this.#scriptFn;
  // 				this.#fncSet(
  // 					this.#hScrCache4Dump[this.#scriptFn] ??= this.#script.aToken.join('')
  // 				);
  // 			}
  // 			this.#fncBreak(this.#lineNum, goto);
  // 		};
  // 		this.noticeBreak(true);	// 一度目のthis.fncBreak()はスルー（まだ読んでないし）
  // 		if (! break_fnc) return false;	// Break通知コールバック
  // 		this.#fncBreak = (globalThis as any)[break_fnc];
  // 		if (! this.#fncBreak) {
  // 			if (argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${break_fnc}が見つかりません`;
  // 			this.#fncBreak = ()=> {};
  // 		}
  // 		return false;
  // 	}
  // 	#fncSet: (txt: string)=> void = ()=> {};
  // 	#fncBreak: (ln: number, goto: boolean)=> void = ()=> {};
  // 	#fnLastBreak = '';
  // 	#hScrCache4Dump: {[fn: string]: string;} = {};
  // 	noticeBreak = (_goto: boolean)=> {}
  // 	#dumpErrLine = 5;
  // 	dumpErrForeLine() {
  // 		if (this.#idxToken === 0) {
  // 			console.group(`🥟 Error line (from 0 rows before) fn:${this.#scriptFn}`);
  // 			console.groupEnd();
  // 			return;
  // 		}
  // 		let s = '';
  // 		for (let i=this.#idxToken -1; i>=0; --i) {
  // 			s = this.#script.aToken[i] + s;
  // 			if ((s.match(/\n/g) ?? []).length >= this.#dumpErrLine) break;
  // 		}
  // 		const a = s.split('\n').slice(-this.#dumpErrLine);
  // 		const len = a.length;
  // 		console.group(`🥟 Error line (from ${len} rows before) fn:${this.#scriptFn}`);
  // 		const ln_txt_width = String(this.#lineNum).length;
  // 		const lc = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
  // 		for (let i=0; i<len; ++i) {
  // 			const ln = this.#lineNum -len +i +1;
  // 			const mes = `${String(ln).padStart(ln_txt_width, ' ')}: %c`;
  // 			const e = a[i]!;
  // 			const line = (e.length > 75) ?e.slice(0, 75) +'…' :e;	// 長い場合は後略
  // 			if (i === len -1) console.info(
  // 				mes + line.slice(0, lc.col_s) +'%c'+ line.slice(lc.col_s),
  // 				'color: black; background-color: skyblue;', 'color: black; background-color: pink;'
  // 			)
  // 			else console.info(mes + line, 'color: black; background-color: skyblue;');
  // 		}
  // 		console.groupEnd();
  // 		//console.log('Linkの出力   : %o', 'file:///Volumes/MacHD2/_Famibee/SKYNovel/prj/mat/main.sn');
  // 	}
  // 	#aIfStk	: number[]	= [-1];	// 先頭に積む FIFOバッファ（unshift / shift）
  // 	//MARK: ifブロックの終端
  // 	#endif() {
  // 		const t = this.#aIfStk[0];
  // 		if (! t) throw `this.#aIfStk が異常です`;
  // 		if (t === -1) throw 'ifブロック内ではありません';
  // 		this.#idxToken = t;
  // 		this.#aIfStk.shift();	// 最初の要素を取り除く
  // 		return false;
  // 	}
  // 	//MARK: ifブロックの開始
  // 	#if(hArg: HArg) {
  // 		//console.log('if idxToken:'+ this.#idxToken);
  // 		const {exp} = hArg;
  // 		if (! exp) throw 'expは必須です';
  // 		if (exp.startsWith('&')) throw '属性expは「&」が不要です';
  // 		let cntDepth = 0;		// if深度カウンター
  // 		let	idxGo = this.prpPrs.parse(exp) ?this.#idxToken :-1;
  // 		const lnIf = this.#script.aLNum[this.#idxToken];
  // 		let zLn = this.#lineNum -(lnIf || 0);	// ??ではなく。NaN は falsy
  // 		const len = this.#script.len;
  // 		for (; this.#idxToken<len; ++this.#idxToken) {
  // 			const ln = this.#script.aLNum[this.#idxToken];
  // 			this.#script.aLNum[this.#idxToken] = (ln || 0)+ zLn; // ??はNaN不可
  // 			const tkn = this.#script.aToken[this.#idxToken];
  // 			//console.log(`[if]トークン fn:${this.#scriptFn} lnum:${this.#lineNum} idx:${this.#idxToken} realLn:${this.#script.aLNum[this.#idxToken]} idxGo:${idxGo} cntDepth:${cntDepth} token<${tkn}>`);
  // 			if (! tkn) continue;
  // 			const uc = tkn.charCodeAt(0);	// TokenTopUnicode
  // 			if (uc === 10) {this.#lineNum += tkn.length; continue}	// \n 改行
  // 			if (uc !== 91) continue;	// [ タグ開始以外
  // 			const [tag_name, args] = tagToken2Name_Args(tkn);
  // 			if (! (tag_name in this.hTag)) throw `未定義のタグ[${tag_name}]です`;
  // 			this.#alzTagArg.parse(args);
  // 			switch (tag_name) {
  // 			case 'if':	++cntDepth; break;
  // 			case 'elsif':
  // 				if (cntDepth > 0) break;
  // 				if (idxGo > -1) break;
  // 				const e = this.#alzTagArg.hPrm.exp?.val;
  // 				if (! e) throw 'expは必須です';
  // 				if (e.startsWith('&')) throw '属性expは「&」が不要です';
  // 				if (this.prpPrs.parse(e)) idxGo = this.#idxToken +1;
  // 				break;
  // 			case 'else':
  // 				if (cntDepth > 0) break;
  // 				if (idxGo === -1) idxGo = this.#idxToken +1;
  // 				break;
  // 			case 'endif':
  // 				if (cntDepth > 0) {--cntDepth; break}
  // 				if (idxGo === -1) {
  // 					++this.#idxToken;
  // 					this.#script.aLNum[this.#idxToken]! += zLn;
  // 				}
  // 				else {
  // 					this.#aIfStk.unshift(this.#idxToken +1);	// 先頭に要素追加
  // 					this.#idxToken = idxGo;
  // 					this.#lineNum = this.#script.aLNum[this.#idxToken]!;
  // 						// +zLn 不要
  // 				}
  // 				return false;
  // 			}
  // 		}
  // 		throw '[endif]がないままスクリプト終端です';
  // 		//return false;
  // 	}
  // 	//MARK: サブルーチンコール
  // 	#call(hArg: HArg) {
  // 		if (! argChk_Boolean(hArg, 'count', false)) this.#eraseKidoku();
  // 		const {fn} = hArg;
  // 		if (fn) this.#cnvSnPath(fn);	// chk only
  // 		this.#callSub({...hArg, ':hEvt1Time': this.#evtMng.popLocalEvts()});
  // 			// ':hEvt1Time'の扱いだけは[macro]と異なる
  // 		if (argChk_Boolean(hArg, 'clear_local_event', false)) this.hTag.clear_event!({});
  // 		return this.#jumpWork(fn, hArg.label);
  // 	}
  // 	#callSub(h: any) {
  // 		const csa: ICallStackArg = {...h, ':hMp': this.val.cloneMp(), ':lenIfStk': this.#aIfStk.length};
  // 		this.#script.aLNum[this.#idxToken] = this.#lineNum;	// 戻ったときの行番号
  // 		if (! this.#resvToken) {csa[':resvToken'] = ''; this.#clearResvToken()}
  // 		this.#aCallStk.push(new CallStack(this.#scriptFn, this.#idxToken, csa));
  // 		this.#aIfStk.unshift(-1);	// 最初に要素を追加
  // 	}
  // 	//MARK: シナリオジャンプ
  // 	#jump(hArg: HArg) {
  // 		if (! argChk_Boolean(hArg, 'count', true)) this.#eraseKidoku();
  // 		this.#aIfStk[0] = -1;
  // 		return this.#jumpWork(hArg.fn, hArg.label);
  // 	}
  // 	//MARK: コールスタック破棄
  // 	#pop_stack(hArg: HArg) {
  // 		if (argChk_Boolean(hArg, 'clear', false)) this.#aCallStk = [];
  // 		else if (! this.#aCallStk.pop()) throw '[pop_stack] スタックが空です';
  // 		this.#clearResvToken();
  // 		this.#aIfStk = [-1];
  // 		this.val.setMp({});
  // 		return false;
  // 	}
  // 	//MARK: サブルーチンから戻る
  // 	#return(hArg: HArg) {
  // 		const cs = this.#aCallStk.pop();
  // 		if (! cs) throw '[return] スタックが空です';
  // 		const csa = cs.csArg;
  // 		this.#aIfStk = this.#aIfStk.slice(-csa[':lenIfStk']);	// 最初の要素を取り除く
  // 		const hMp = csa[':hMp'];	// マクロからの復帰の場合にmp:値も復帰
  // 		if (hMp) this.val.setMp(hMp);
  // 		const after_token = csa[':resvToken'];
  // 		if (after_token) this.nextToken = ()=> {
  // 			this.#clearResvToken();
  // 			return after_token;
  // 		}
  // 		else this.#clearResvToken();
  // 		if (csa[':hEvt1Time']) this.#evtMng.pushLocalEvts(csa[':hEvt1Time']);
  // 		const {fn, label} = hArg;
  // 		if (fn || label) return this.#jumpWork(fn, label);
  // 		if (cs.fn in this.#hScript) {this.#jump_light(cs); return false}
  // 		return this.#jumpWork(cs.fn, '', cs.idx);	// 確実にスクリプトロードなので
  // 	}
  // 	#resvToken	= '';
  // 	#clearResvToken() {
  // 		this.#resvToken = '';
  // 		this.nextToken = this.#nextToken_Proc;
  // 	}
  // 	#skipLabel = '';
  // 	#jumpWork(fn = '', label = '', idx = 0): boolean {
  // //console.log(`fn:ScriptIterator.ts %cjumpWork fn:${fn} label:${label} idx:${idx}`, 'background-color:#734e95;');
  // 		if (! fn && ! label) this.main.errScript('[jump系] fnまたはlabelは必須です');
  // 		if (label) {
  // 			if (! label.startsWith('*')) this.main.errScript('[jump系] labelは*で始まります');
  // 			this.#skipLabel = label;
  // 			if (! this.#skipLabel.startsWith('**')) this.#idxToken = idx;
  // 		}
  // 		else {
  // 			this.#skipLabel = '';
  // 			this.#idxToken = idx;
  // 		}
  // 		if (! fn) {this.analyzeInit(); return false}
  // 		if (fn.includes('@')) throw `[jump系] fn には文字「@」は禁止です`;
  // 		const full_path = this.#cnvSnPath(fn);
  // 		if (fn === this.#scriptFn) {this.analyzeInit(); return false}
  // 		this.#scriptFn = fn;
  // 		const st = this.#hScript[fn];
  // 		if (st) {this.#script = st; this.analyzeInit(); return false}
  // 		disableEvent();
  // 		const ldr = new Loader;
  // 		let fp_diff = '';
  // 		try {
  // 			fp_diff = this.#cnvSnPath(fn +'@');
  // 			// 派生ファイルが存在する場合
  // 			ldr.add({name: fn +':base', url: full_path});
  // 			ldr.add({name: fn, url: fp_diff});
  // 		} catch {
  // 			// 派生ファイルはない
  // 			ldr.add({name: fn, url: full_path});
  // 		}
  // 		ldr.use(async (res, next)=> {
  // 			try {
  // 				res.data = await this.sys.dec(res.extension, res.data);
  // 			} catch (e) {
  // 				this.main.errScript(`[jump系]snロード失敗です fn:${res.name} ${e}`, false);
  // 			}
  // 			next();
  // 		})
  // 		.load((_ldr, hRes)=> {
  // 			if (fp_diff) {	// 派生ファイルが存在する場合
  // 				const scrBase = hRes[fn +':base']!.data;
  // 				const scrDiff = hRes[fn]!.data;
  // 				const aBase = scrBase.split('\n');
  // 				const aDiff = scrDiff.split('\n');
  // 				const lenB = aBase.length;
  // 				const lenD = aDiff.length;
  // 				// 【派生スクリプト】の空行へ、【基底スクリプト】の同じ行の内容をコピー
  // 				for (let i=0; i<lenD && i<lenB; ++i) aDiff[i] ||= aBase[i];
  // 				// 【接尾辞つきファイル】として扱う
  // 				hRes[fn]!.data = aDiff.join('\n');
  // 				delete hRes[fn +':base'];
  // 			}
  // 			this.nextToken = this.#nextToken_Proc;
  // 			this.#lineNum = 1;
  // 			this.#resolveScript(hRes[fn]!.data);
  // 			this.hTag.record_place!({});
  // 			this.analyzeInit();
  // 			enableEvent();
  // 		});
  // 		return true;
  // 	}
  // 	private	analyzeInit(): void {
  // //console.log(`%cfn:ScriptIterator.ts line:841 analyzeInit()`, 'color:#3B0;');
  // 		const o = this.#seekScript(this.#script, Boolean(this.val.getVal('mp:const.sn.macro.name')), this.#lineNum, this.#skipLabel, this.#idxToken);
  // 		this.#idxToken	= o.idx;
  // 		this.#lineNum	= o.ln;
  // 	}
  // 	// シナリオ解析処理ループ・冒頭処理
  // 	nextToken = ()=> '';	// 初期化前に終了した場合向け
  // 	#nextToken_Proc(): string {
  // 		if (this.#errOverScr()) return '';
  // 		this.#recordKidoku();
  // 		// トークンの行番号更新
  // 		this.#script.aLNum[this.#idxToken] ||= this.#lineNum;	// ??はNaN不可
  // 		const token = this.#script.aToken[this.#idxToken]!;
  // 		this.#dbgToken(token);
  // 		++this.#idxToken;
  // 		return token;
  // 	}
  // 	#dbgToken = (_token: string)=> {};
  // 	#errOverScr(): boolean {
  // 		if (this.#idxToken < this.#script.len) return false;
  // 		this.main.errScript('スクリプト終端です');
  // 		return true;
  // 	}
  // 	readonly #REG_NONAME_LABEL		= /(\*{2,})([^\|]*)/;
  // 	readonly #REG_TOKEN_MACRO_BEGIN	= /^\[macro\s/;
  // 	readonly #REG_TOKEN_MACRO_END	= /^\[endmacro[\s\]]/;
  // 	#seekScript(st: Script, inMacro: boolean, ln: number, skipLabel: string, idx: number): ISeek {
  // 		//console.log(`seekScript (from)inMacro:${inMacro} (from)ln:${ln} (to)skipLabel:${skipLabel}: (to)idx:${idx}`);
  // 		const len = st.aToken.length;
  // 		if (! skipLabel) {	// ラベルジャンプ以外（先頭から開始）
  // 			if (this.#errOverScr()) return {idx, ln};
  // 			if (! st.aLNum[idx]) {	// NaN、undefined は falsy
  // 				ln = 1;
  // 				for (let j=0; j<idx; ++j) {
  // 					// 走査ついでにトークンの行番号も更新
  // 					st.aLNum[j] ||= ln;	// ??はNaN不可
  // 					const tkn = st.aToken[j]!;
  // 					if (tkn.startsWith('\n')) ln += tkn.length;	// \n 改行
  // 					else ln += (tkn.match(/\n/g) ?? []).length;
  // 				}
  // 				st.aLNum[idx] = ln;
  // 			}
  // 			else ln = st.aLNum[idx];
  // 			return {idx, ln};
  // 		}
  // 		// 無名ラベルジャンプ
  // 		st.aLNum[0] = 1;
  // 		const a_skipLabel = skipLabel.match(this.#REG_NONAME_LABEL);
  // 		if (a_skipLabel) {
  // 			skipLabel = a_skipLabel[1]!;
  // 			let i = idx;
  // 			switch (a_skipLabel[2]) {
  // 			case 'before':
  // 				while (st.aToken[--i] !== skipLabel) {
  // 					if (i === 0) DebugMng.myTrace('[jump系 無名ラベルbefore] '
  // 						+ ln +'行目以前で'+ (inMacro ?'マクロ内に' :'')
  // 						+ 'ラベル【'+ skipLabel +'】がありません', 'ET');
  // 					if (inMacro && st.aToken[i]!.search(this.#REG_TOKEN_MACRO_BEGIN) > -1) DebugMng.myTrace('[jump系 無名ラベルbefore] マクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
  // 				}
  // 				return {idx: i +1, ln: st.aLNum[i]!};	//	break;
  // 			case 'after':
  // 				while (st.aToken[++i] !== skipLabel) {
  // 					if (i === len) DebugMng.myTrace('[jump系 無名ラベルafter] '
  // 						+ ln +'行目以後でマクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
  // 					if (st.aToken[i]!.search(this.#REG_TOKEN_MACRO_END) > -1) DebugMng.myTrace('[jump系 無名ラベルafter] '
  // 						+ ln +'行目以後でマクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
  // 				}
  // 				return {idx: i +1, ln: st.aLNum[i]!};	//	break;
  // 			default:
  // 				DebugMng.myTrace('[jump系] 無名ラベル指定【label='+ skipLabel +'】が間違っています', 'ET');
  // 			}
  // 		}
  // 		// ラベルジャンプ
  // 		ln = 1;
  // 		const reLabel = new RegExp(
  // 			'^'+ skipLabel.replaceAll('*', '\\*') +'(?=\\s|;|\\[|\\||$)');
  // 		let in_let_ml = false;
  // 		for (let i=0; i<len; ++i) {
  // 			// 走査ついでにトークンの行番号も更新
  // 			st.aLNum[i] ||= ln;	// ??はNaN不可
  // 			const tkn = st.aToken[i]!;
  // 			if (in_let_ml) {
  // 				if (this.#grm.testTagEndLetml(tkn)) in_let_ml = false;
  // 				else ln += (tkn.match(/\n/g) ?? []).length;
  // 				continue;
  // 			}
  // 			const uc = tkn.charCodeAt(0);	// TokenTopUnicode
  // 			if (uc === 10) {ln += tkn.length; continue}	// \n 改行
  // 			if (uc === 42) {	// 42 = *
  // 				if (tkn.search(reLabel) > -1) return {idx: i +1, ln};//	break;
  // 				continue;
  // 			}
  // 			if (uc !== 91) continue;	// [ タグ開始
  // 			ln += (tkn.match(/\n/g) ?? []).length;
  // 			if (this.#grm.testTagLetml(tkn)) in_let_ml = true;
  // 		}
  // 		if (in_let_ml) throw '[let_ml]の終端・[endlet_ml]がありません';
  // 		DebugMng.myTrace(`[jump系] ラベル【${skipLabel}】がありません`, 'ET');
  // 		throw 'Dummy';
  // 	}
  // 	#hScript	: HScript	= Object.create(null);	//{} シナリオキャッシュ
  // 	#resolveScript(txt: string) {
  // 		let mes = '';
  // 		try {
  // 			mes = 'ScriptIterator.resolveScript';
  // 			const scr = this.#grm.resolveScript(txt);
  // 			mes = 'ScriptIterator.replaceScript_Wildcard';
  // 			this.#replaceScript_Wildcard(scr);
  // 			this.#hScript[this.#scriptFn] = this.#script = scr;
  // 		}
  // 		catch (e) {
  // 			if (e instanceof Error) mes += `例外 mes=${e.message}(${e.name})`;
  // 			else mes = String(e);
  // 			this.main.errScript(mes, false);
  // 		}
  // 		this.val.touchAreaKidoku(this.#scriptFn);
  // 	}
  // 	#jump_light(cs: CallStack) {
  // 		// jumpでは連続マクロでスタックオーバーフローになるので簡易版を
  // 		// 主に[return]やマクロ終了でジャンプ先がチェック不要な場合用
  // 		// analyzeInit()とかもジャンプ前にやってて不要だし
  // 		this.#scriptFn	= cs.fn;
  // 		this.#idxToken	= cs.idx;
  // 		const st = this.#hScript[this.#scriptFn];
  // 		if (st) this.#script = st;
  // 		this.#lineNum = this.#script.aLNum[cs.idx]!;
  // //console.log(`fn:ScriptIterator.ts %cjump_light cs.fn:${cs.fn} cs.idx:${cs.idx} ln:${this.#lineNum}`, 'background-color:#a03b79;');
  // 	}
  // 	readonly #REG_WILDCARD	= /^\[(call|loadplugin)\s/;
  // 	readonly #REG_WILDCARD2	= /\bfn\s*=\s*[^\s\]]+/;
  // 	#replaceScript_Wildcard(scr: Script) {
  // 		for (let i=scr.len -1; i>=0; --i) {
  // 			const token = scr.aToken[i]!;
  // 			if (! this.#REG_WILDCARD.test(token)) continue;
  // 			const [tag_name, args] = tagToken2Name_Args(token);
  // 			this.#alzTagArg.parse(args);
  // 			const p_fn = this.#alzTagArg.hPrm.fn;
  // 			if (! p_fn) continue;
  // 			const {val: fn} = p_fn;
  // 			if (! fn || ! fn.endsWith('*')) continue;
  // 			scr.aToken.splice(i, 1, '\t', '; '+ token);
  // 			scr.aLNum.splice(i, 1, NaN, NaN);
  // 			const ext = tag_name === 'loadplugin'
  // 				? SEARCH_PATH_ARG_EXT.CSS
  // 				: SEARCH_PATH_ARG_EXT.SN;
  // 			const a = this.cfg.matchPath('^'+ fn.slice(0, -1) +'.*', ext);
  // 			for (const v of a) {
  // 				const nt = token.replace(
  // 					this.#REG_WILDCARD2,
  // 					'fn='+ decodeURIComponent(getFn(v[ext]!))
  // 				);
  // 				//console.log('\t='+ nt +'=');
  // 				scr.aToken.splice(i, 0, nt);
  // 				scr.aLNum.splice(i, 0, NaN);
  // 			}
  // 		}
  // 		scr.len = scr.aToken.length;
  // 	}
  // 	#recordKidoku() {
  // 		const areas = this.val.touchAreaKidoku(this.#scriptFn);
  // 		// マクロ内やサブルーチンではisKidokuを変更させない
  // 		if (this.#aCallStk.length > 0) {areas.record(this.#idxToken); return}
  // 		this.#isKidoku = areas.search(this.#idxToken);
  // 		this.val.setVal_Nochk('tmp', 'const.sn.isKidoku', this.#isKidoku);
  // 		if (this.#isKidoku) return;
  // 		areas.record(this.#idxToken);
  // 		// saveKidoku()
  // 			// 厳密にはここですべきだが、パフォーマンスに問題があるので
  // 			// クリック待ちを期待できるwait、waitclick、s、l、pタグで
  // 			// saveKidoku()をコール。
  // 	}
  // 	#isKidoku	= false;
  // 	get isKidoku() {return this.#isKidoku};
  // 	#eraseKidoku() {
  // 		this.val.getAreaKidoku(this.#scriptFn)?.erase(this.#idxToken);
  // 		this.#isKidoku = false;
  // 	}
  // 	get isNextKidoku(): boolean {
  // 		let fn	= this.#scriptFn;
  // 		let idx	= this.#idxToken;
  // 		let len	= this.#script.len;
  // 		if (this.#aCallStk.length > 0) {
  // 			const cs = this.#aCallStk[0]!;
  // 			fn  = cs.fn;
  // 			idx = cs.idx;
  // 			const st = this.#hScript[fn];
  // 			if (st) len = st.len;
  // 		}
  // 		const areas = this.val.getAreaKidoku(fn);
  // 		if (idx === len) return false;	// スクリプト終端
  // 		//traceDbg("isNextKidoku fn:"+ fn +" idx:"+ idx +" ret="+ (areas.search(idx)));
  // 		//traceDbg("【"+ vctT[idx-1] +"】【"+ vctT[idx] +"】");
  // 		return areas.search(idx);
  // 	}
  // 	get normalWait(): number {
  // 		return this.#isKidoku
  // 		? (
  // 			this.val.tagCh_doWait_Kidoku
  // 			?	this.val.tagCh_msecWait_Kidoku
  // 			:	0
  // 		)
  // 		: (
  // 			this.val.tagCh_doWait
  // 			?	this.val.tagCh_msecWait
  // 			:	0
  // 		);
  // 	}
  // 	//MARK: 括弧マクロの定義
  // 	#bracket2macro(hArg: HArg) {
  // 		this.#grm.bracket2macro(hArg, this.hTag, this.#script, this.#idxToken);
  // 		return false;
  // 	}
  // 	//MARK: 一文字マクロの定義
  // 	#char2macro(hArg: HArg) {
  // 		this.#grm.char2macro(hArg, this.hTag, this.#script, this.#idxToken);
  // 		return false;
  // 	}
  // 	//MARK: マクロ定義の開始
  // 	readonly	#REG_NG4MAC_NM = /["'#;\\]　]+/;
  // 	#macro(hArg: HArg) {
  // 		const {name} = hArg;
  // 		if (! name) throw 'nameは必須です';
  // 		if (name in this.hTag) throw `[${name}]はタグかすでに定義済みのマクロです`;
  // 		if (this.#REG_NG4MAC_NM.test(name)) throw `[${name}]はマクロ名として異常です`;
  // 		const ln = this.#lineNum;
  // 		const cs = new CallStack(this.#scriptFn, this.#idxToken);
  // 		this.#strStepin += '|'+ name;
  // 		this.#REGSTEPIN = new RegExp(`\\[(${this.#strStepin})\\b`);
  // 		this.hTag[name] = hArgM=> {
  // 			hArgM.design_unit = hArg.design_unit;
  // 			this.#callSub(hArgM);
  // 			// AIRNovelの仕様：親マクロが子マクロコール時、*がないのに値を引き継ぐ
  // 			//for (const k of Object.keys(hArg)) this.val.setVal_Nochk('mp', k, hArg[k]);
  // 			this.val.setMp(hArgM as any);
  // 			this.val.setVal_Nochk('mp', 'const.sn.macro', JSON.stringify({
  // 				name: hArg.name,
  // 			}));	// ムダに大きいスクリプター用情報を削除
  // 			this.val.setVal_Nochk('mp', 'const.sn.me_call_scriptFn', this.#scriptFn);
  // 			this.#lineNum = ln;
  // 			this.#jump_light(cs);
  // 			return false;
  // 		};
  // 		for (; this.#idxToken < this.#script.len; ++this.#idxToken) {
  // 			// トークンの行番号更新
  // 			this.#script.aLNum[this.#idxToken] ||= this.#lineNum; // ??はNaN不可
  // 			const token = this.#script.aToken[this.#idxToken]!;
  // 			if (token.search(this.#REG_TOKEN_MACRO_END) > -1) {
  // 				++this.#idxToken;
  // 				return false;
  // 			}
  // 			const uc = token.charCodeAt(0);	// TokenTopUnicode
  // 			if (uc === 10) this.#lineNum += token.length;	// \n 改行
  // 			else if (uc === 91) this.#lineNum += (token.match(/\n/g) ?? []).length;	// [ タグ開始
  // 		}
  // 		throw `マクロ[${name}]定義の終端・[endmacro]がありません`;
  // 	}
  // 	#strStepin	= 'call';
  // 	#REGSTEPIN	= /\[(call)\b/;	// https://regex101.com/r/Lk9ASK/1
  // 	//MARK: しおりの読込
  // 	#load(hArg: HArg) {
  // 		if (('fn' in hArg) !== ('label' in hArg)) throw 'fnとlabelはセットで指定して下さい';
  // 		const place = argChk_Num(hArg, 'place', 0);
  // 		const mark = this.val.getMark(place);
  // 		return this.loadFromMark(hArg, mark, SndProcOnLoad.ALL_STOP_AND_PLAY);
  // 	}
  // 	loadFromMark(hArg: HArg, mark: IMark, snd: SndProcOnLoad = SndProcOnLoad.MINIMAL_STOP) {
  // 		this.hTag.clear_event!({});
  // 		this.val.mark2save(mark);
  // 		this.val.setMp({});
  // 		this.#layMng.recPagebreak();
  // 		let ap: Promise<void>[] = [];
  // 		if (snd !== SndProcOnLoad.NO_TOUCH) ap = this.sndMng
  // 		.playLoopFromSaveObj(snd === SndProcOnLoad.ALL_STOP_AND_PLAY);
  // 		if (argChk_Boolean(hArg, 'do_rec', true)) this.#mark = {
  // 			hSave	: this.val.cloneSave(),
  // 			hPages	: {...mark.hPages},
  // 			aIfStk	: [...mark.aIfStk],
  // 		}
  // 		const o: HArg = {
  // 			enabled	: this.val.getVal('save:const.sn.autowc.enabled'),
  // 			text	: this.val.getVal('save:const.sn.autowc.text'),
  // 			time	: Number(this.val.getVal('save:const.sn.autowc.time')),
  // 		};
  // 		this.hTag.autowc!(o);
  // 		this.#aIfStk = [...this.#mark.aIfStk];
  // 		this.#aCallStk = [];
  // 		CmnTween.stopAllTw();
  // 		const p = Promise.allSettled([...ap, ...this.#layMng.playback(this.#mark.hPages)])
  // 		.then(()=> this.#layMng.cover(false))
  // 		.catch(e=> console.error(`fn:ScriptIterator.ts loadFromMark e:%o`, e));
  // 		const {index, fn} = hArg;
  // 		if (index) {	// ページ移動用
  // //console.log(`fn:ScriptIterator.ts \x1b[42mmove!\x1b[49m fn:${fn} idx:${index}`);
  // 			p.then(()=> this.#jumpWork(fn, '', index));
  // 			return true;
  // 		}
  // 		this.#layMng.cover(true);	// ページ移動では全画面黒で覆わない
  // 		disableEvent();
  // 		const fn2 = String(this.val.getVal('save:const.sn.scriptFn'));
  // 		const idx = Number(this.val.getVal('save:const.sn.scriptIdx'));
  // 		delete this.#hScript[fn2];	// 必ずスクリプトを再読込。吉里吉里に動作を合わせる
  // 		const {label} = hArg;
  // 		if (label) p.then(()=> {
  // 			this.#scriptFn = fn2;
  // 			this.#idxToken = idx;
  // 			this.hTag.call!({fn, label});
  // 		});
  // 		else p.then(()=> this.#jumpWork(fn2, '', idx));
  // 		return true;
  // 	}
  // 	//MARK: スクリプト再読込
  // 	#reload_script(hArg: HArg) {	// 最後の[record_place]から再開
  // 		const mark = this.val.getMark(0);
  // 		// 起動から再読込までの間に追加・変更・削除されたファイルがあるかも、に対応
  // 		//	delete this.hScript[this.#scriptFn];	// これだと[reload_script]位置になる
  // 		delete this.#hScript[getFn(mark.hSave['const.sn.scriptFn'])];
  // 		// 派生ファイルを削除
  // 		const h: HScript = {};
  // 		for (const fn in this.#hScript) {
  // 			try {this.#cnvSnPath(fn +'@')}
  // 			catch {h[fn] = this.#hScript[fn]!}	// 派生ファイル以外を残す
  // 		}
  // 		this.#hScript = h;
  // 		hArg.do_rec = false;
  // 		return this.loadFromMark(hArg, mark, SndProcOnLoad.NO_TOUCH);
  // 	}
  // 	//MARK: セーブポイント指定
  // 	#mark: IMark = {
  // 		hSave	: {},
  // 		hPages	: {},
  // 		aIfStk	: [-1],
  // 	};
  // 	#record_place() {
  // 		if (this.main.isDestroyed()) return false;
  // 		const {fn, idx} = this.nowScrIdx();
  // 		this.val.setVal_Nochk('save', 'const.sn.scriptFn', fn);
  // 		this.val.setVal_Nochk('save', 'const.sn.scriptIdx', idx);
  // 		this.#mark = {
  // 			hSave	: this.val.cloneSave(),
  // 			hPages	: this.#layMng.record(),
  // 			aIfStk	: this.#aIfStk.slice(this.#aCallStk.length),
  // 		};
  // 		return false;
  // 	}
  // 	nowScrIdx(): {fn: string, idx: number} {
  // 		const len = this.#aCallStk.length;
  // 		if (len === 0) return {
  // 			fn	: this.#scriptFn,
  // 			idx	: this.#idxToken,
  // 		};
  // 		const cs = this.#aCallStk[0]!;
  // 		return {
  // 			fn	: cs.fn,
  // 			idx	: cs.idx,
  // 		}
  // 	}
  // 	nowMark(): IMark {return {...this.#mark}}
  // 	//MARK: スクリプト停止位置（マクロなどなら最上位の呼び元）
  // 	nowScrFnLn(): {fn: string, ln: number, col_s: number, col_e: number} {
  // 		const {fn, idx} = this.nowScrIdx();
  // 		const st = this.#hScript[fn]!;
  // 		const o = this.#cnvIdx2lineCol(st, idx);	// -1不要
  // 		return {fn, ...o};
  // 	}
  // 	//MARK: しおりの保存
  // 	#save(hArg: HArg) {
  // 		if (! ('place' in hArg)) throw 'placeは必須です';
  // 		const place = Number(hArg.place);
  // 		delete hArg[':タグ名'];
  // 		delete hArg.place;
  // 		hArg.text = hArg.text ?? '';
  // 		this.#mark.json = hArg;
  // 		this.val.setMark(place, this.#mark);
  // 		const now_sp = Number(this.val.getVal('sys:const.sn.save.place'));
  // 		if (place === now_sp) this.val.setVal_Nochk('sys', 'const.sn.save.place', now_sp +1);
  // 		return false;
  // 	}
  // 	recodeDesign(hArg: HArg) {
  // 		let fn = '';
  // 		let idx = 0;
  // 		const len = this.#aCallStk.length;
  // 		if (hArg.design_unit && len > 0) {
  // 			// デザインモードでこのマクロへの引数変更とするか（内部をサーチさせない）
  // 			const cs = this.#aCallStk[0]!;
  // 			fn = cs.fn;
  // 			idx = cs.idx;
  // 		}
  // 		else {
  // 			fn = this.#scriptFn;
  // 			idx = this.#idxToken;
  // 		}
  // 		hArg[':path']	= this.#cnvSnPath4Dbg(fn);
  // 		const scr = this.#hScript[fn]!;
  // 		const lc = this.#cnvIdx2lineCol(scr, idx);
  // 		hArg[':ln']		= lc.ln;
  // 		hArg[':col_s']	= lc.col_s;
  // 		hArg[':col_e']	= lc.col_e;
  // 		const idx_1 = idx -1;
  // 		hArg[':idx_tkn']= idx_1;
  // 		hArg[':token']	= scr.aToken[idx_1];
  // 		this.sys.send2Dbg('_recodeDesign', hArg);
  // 	}
  // 	replace(idx: number, val: string) {this.#script.aToken[idx] = val}
}
class C {
  //TODO: 
  constructor(t, s, e, o, r, n) {
    this.sys = t, this.hTag = s, this.trgNext = e, this.fncs = o, this.val = r, this.prpPrs = n, this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `
			z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t = new v(t), this.#s = (i, a, c, h) => r.setVal_Nochk(i, a, c, h), this.#n = (i) => n.getValAmpersand(i), this.#r = (i) => n.parse(i), s.trace = (i) => this.#i(i);
  }
  #e;
  #t;
  #s = (t, s, e, o = !1) => {
  };
  #n = (t) => "";
  #r = (t) => {
  };
  #o = (t) => !1;
  async load(t) {
    this.#s(
      "tmp",
      "sn.eventArg",
      /*hArg.arg ??*/
      ""
    ), this.#s(
      "tmp",
      "sn.eventLabel",
      /*hArg.label ??*/
      ""
    );
    const s = await this.#t.load(t);
    for (; ; ) {
      const { done: n, value: i } = s.next();
      if (n) {
        this.myTrace("🎍 スクリプト末尾", "E");
        break;
      }
      this.#t.addIdxToken();
      let a = i;
      switch (i.charAt(0)) {
        case "	":
          continue;
        //  タブ
        case `
`:
          this.#t.addLineNum(a.length);
          continue;
        case "[":
          if (console.log(`fn:ScriptMng.ts 🍊 TAG ${a}`), this.#o(a)) return;
          try {
            const c = (a.match(/\n/g) ?? []).length;
            c > 0 && this.#t.addLineNum(c);
          } catch (c) {
            c instanceof Error ? this.myTrace(`[${A(a)}]タグ解析中例外 mes=${c.message}(${c.name})`) : this.myTrace(String(c));
            return;
          }
          continue;
        case "&":
          try {
            if (!i.endsWith("&")) {
              if (this.#o(a)) return;
              const c = y(a.slice(1));
              c.name = this.#n(c.name), c.text = String(this.#r(c.text)), this.hTag.let(c);
              continue;
            }
            if (i.charAt(1) === "&") throw new Error("「&表示&」書式では「&」指定が不要です");
          } catch (c) {
            this.myTrace(
              c instanceof Error ? `& 変数操作・表示 mes=${c.message}(${c.name})` : String(c)
            );
            return;
          }
          break;
        case ";":
          continue;
        // コメント
        case "*":
          if (i.length > 1) continue;
          break;
      }
      try {
        console.log(`fn:ScriptMng.ts 🍈 tagCh:${a}`);
      } catch (c) {
        this.myTrace(
          c instanceof Error ? `文字表示 mes=${c.message}(${c.name})` : String(c)
        );
        return;
      }
    }
    function* e() {
      yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "TXT", nm: "mes", str: "あいうえお" }, yield { nm: "mes", str: "かきくけこ" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
    }
    const o = e();
    let r = 0;
    this.go = () => {
      for (console.log("fn:ScriptMng.ts == go =="); ; ) {
        const { done: n, value: i } = o.next();
        if (n) break;
        this.sys.caretaker.push(t + ":" + ++r), "cls" in i ? this.fncs.addLayer(i) : "fn" in i ? this.fncs.chgPic(i) : this.fncs.chgStr(i);
        break;
      }
    }, this.trgNext();
  }
  go() {
  }
  // result = true : waitする  resume()で再開
  #a = (t) => {
  };
  //MARK: タグ解析
  タグ解析(t) {
    const [s, e] = T(t), o = this.hTag[s];
    if (!o) throw `未定義のタグ【${s}】です`;
    this.#c.parse(e), this.#a(s);
    const r = this.#c.hPrm;
    if (r.cond) {
      const c = r.cond.val;
      if (!c || c.startsWith("&")) throw "属性condは「&」が不要です";
    }
    let n = {};
    const i = this.#h.length, a = i === 0 ? {} : this.#h[i - 1].csArg;
    if (this.#c.isKomeParam) {
      if (i === 0) throw "属性「*」はマクロのみ有効です";
      n = { ...a };
    }
    n[":タグ名"] = s;
    for (const [c, { val: h, def: f }] of Object.entries(r)) {
      let g = h;
      if (g?.startsWith("%")) {
        if (i === 0) throw "属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";
        const m = a[g.slice(1)];
        if (m) {
          n[c] = m;
          continue;
        }
        if (f === void 0 || f === "null") continue;
        g = f;
      }
    }
    return o(n);
  }
  #c = new k();
  #h = [];
  // FILOバッファ（push/pop）
  #i(t) {
    return this.myTrace(t.text || `(text is ${t.text})`, "I"), !1;
  }
  myTrace = (t, s = "E") => {
    let e = "";
    switch (s) {
      case "D":
        e = "color:#05A;";
        break;
      case "W":
        e = "color:#F80;";
        break;
      case "F":
        e = "color:#B00;";
        break;
      case "ET":
      case "E":
        e = "color:#F30;";
        break;
      default:
        e = "";
    }
    const o = `{${s}} ` + this.#t.strPos() + t;
    switch (this.#e.innerHTML += `<span style='${e}'>${o}</span><br/>`, this.#e.hidden = !1, s) {
      case "D":
        break;
      case "W":
      case "F":
        break;
      case "ET":
      case "E":
        if (this.hTag.title({ text: t }), this.#t.dumpErrForeLine(), s === "ET") throw o;
        break;
      default:
        e = "";
    }
    console.info("%c " + o, e);
  };
}
export {
  C as ScriptMng
};
//# sourceMappingURL=ScriptMng.js.map
