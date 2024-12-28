import { S as m, g as x } from "./ConfigBase.js";
class E {
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
  #n = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
  // 【属性 = 値 | 省略値】の分析
  parse(t) {
    this.#i = {}, this.#s = !1;
    for (const { groups: s } of t.matchAll(this.#n)) {
      const { key: e, val: i, val2: o, def: n, def2: c, literal: r } = s;
      e ? this.#i[e] = {
        val: i ?? o ?? "",
        def: n ?? c
      } : r && (r === "*" ? this.#s = !0 : this.#i[r] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, s, e, i) {
    const o = {}, n = t.slice(1 + s, -1);
    for (const { groups: c, index: r, 0: a } of n.matchAll(this.#n)) {
      if (r === void 0) continue;
      const { key: h, val: l, val2: u = "", literal: g } = c;
      if (g) {
        if (g.endsWith("=")) {
          const d = g.length - 1, { ch: p } = this.#t(s, e, i, n, r + d);
          o[g.slice(0, -1)] = {
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
      const { ln: $, ch: T } = this.#t(s, e, i, n, r), { ln: b, ch: _ } = this.#t(s, e, i, n, r + a.lastIndexOf(l ?? u ?? "") - (l ? 0 : 1));
      o[h] = { k_ln: $, k_ch: T, v_ln: b, v_ch: _, v_len: l ? l.length : u.length + 2 };
    }
    return o;
  }
  #t(t, s, e, i, o) {
    const c = i.slice(0, o).split(`
`), r = c.length;
    return {
      ln: s + r - 1,
      ch: r < 2 ? e + 1 + t + o : c.at(-1).length
    };
  }
  #i = {};
  get hPrm() {
    return this.#i;
  }
  #s = !1;
  get isKomeParam() {
    return this.#s;
  }
}
const k = /(?<name>[^\s;\]]+)/;
function w(f) {
  const s = k.exec(f.slice(1, -1))?.groups;
  if (!s) throw `タグ記述【${f}】異常です(タグ解析)`;
  const e = s.name;
  return [e, f.slice(1 + e.length, -1)];
}
function y(f) {
  const s = k.exec(f.slice(1))?.groups;
  if (!s) throw `タグ記述【${f}】異常です(タグ解析)`;
  return s.name;
}
class N {
  constructor(t) {
    this.cfg = t, this.setEscape("");
  }
  #n;
  setEscape(t) {
    if (this.#e && t in this.#e) throw "[エスケープ文字] char【" + t + "】が登録済みの括弧マクロまたは一文字マクロです";
    this.#n = new RegExp(
      (t ? `\\${t}\\S|` : "") + // エスケープシーケンス
      `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${t ? `\\${t}` : ""}]+`,
      // 本文
      "gs"
    ), this.#t = new RegExp(`[\\w\\s;[\\]*=&｜《》${t ? `\\${t}` : ""}]`), this.#a = new RegExp(`[\\n\\t;\\[*&${t ? `\\${t}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(t, s, e, i) {
    const { name: o, text: n } = t;
    if (!o) throw "[bracket2macro] nameは必須です";
    if (!n) throw "[bracket2macro] textは必須です";
    const c = n.at(0);
    if (!c) throw "[bracket2macro] textは必須です";
    if (n.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(o in s)) throw `[bracket2macro] 未定義のタグ又はマクロ[${o}]です`;
    this.#e ??= {};
    const r = n.charAt(1);
    if (c in this.#e) throw "[bracket2macro] text【" + c + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (r in this.#e) throw "[bracket2macro] text【" + r + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(c)) throw "[bracket2macro] text【" + c + "】は括弧マクロに使用できない文字です";
    if (this.#t.test(r)) throw "[bracket2macro] text【" + r + "】は括弧マクロに使用できない文字です";
    this.#e[r] = "0", this.#e[c] = `[${o} text=`, this.addC2M(`\\${c}[^\\${r}]*\\${r}`, `\\${c}\\${r}`), this.#l(e, i);
  }
  // 一文字マクロの定義
  char2macro(t, s, e, i) {
    const { char: o, name: n } = t;
    if (!o) throw "[char2macro] charは必須です";
    if (this.#e ??= {}, o in this.#e) throw "[char2macro] char【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(o)) throw "[char2macro] char【" + o + "】は一文字マクロに使用できない文字です";
    if (!n) throw "[char2macro] nameは必須です";
    if (!(n in s)) throw `[char2macro] 未定義のタグ又はマクロ[${n}]です`;
    this.#e[o] = `[${n}]`, this.addC2M(`\\${o}`, `\\${o}`), this.#l(e, i);
  }
  #t;
  #i = new RegExp("");
  #s = "";
  #c = "";
  addC2M(t, s) {
    this.#s += `${t}|`, this.#c += `${s}`, this.#i = new RegExp(
      `(${this.#s}[^${this.#c}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const s = t.replaceAll(/\r\n?/g, `
`).match(this.#n)?.flatMap((i) => {
      if (!this.testTagLetml(i)) return i;
      const o = /^([^\]]+?])(.*)$/s.exec(i);
      if (!o) return i;
      const [, n, c] = o;
      return [n, c];
    }) ?? [], e = { aToken: s, len: s.length, aLNum: [] };
    return this.#l(e), this.#f(e), e;
  }
  #r = /^\[(call|loadplugin)\s/;
  #o = /\bfn\s*=\s*[^\s\]]+/;
  #f(t) {
    for (let s = t.len - 1; s >= 0; --s) {
      const e = t.aToken[s];
      if (!this.#r.test(e)) continue;
      const [i, o] = w(e);
      this.#h.parse(o);
      const n = this.#h.hPrm.fn;
      if (!n) continue;
      const { val: c } = n;
      if (!c || !c.endsWith("*")) continue;
      t.aToken.splice(s, 1, "	", "; " + e), t.aLNum.splice(s, 1, NaN, NaN);
      const r = i === "loadplugin" ? m.CSS : m.SN, a = this.cfg.matchPath("^" + c.slice(0, -1) + ".*", r);
      for (const h of a) {
        const l = e.replace(
          this.#o,
          "fn=" + decodeURIComponent(x(h[r]))
        );
        t.aToken.splice(s, 0, l), t.aLNum.splice(s, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #h = new E();
  testTagLetml(t) {
    return /^\[let_ml\s/.test(t);
  }
  testTagEndLetml(t) {
    return /^\[endlet_ml\s*]/.test(t);
  }
  analyzToken(t) {
    return this.#n.lastIndex = 0, this.#n.exec(t);
  }
  #e;
  #a;
  #l(t, s = 0) {
    if (this.#e) {
      for (let e = t.len - 1; e >= s; --e) {
        const i = t.aToken[e];
        if (this.testNoTxt(i.at(0) ?? `
`)) continue;
        const o = t.aLNum[e], n = i.match(this.#i);
        if (!n) continue;
        let c = 1;
        for (let r = n.length - 1; r >= 0; --r) {
          let a = n[r];
          const h = this.#e[a.at(0) ?? " "];
          h && (a = h + (h.endsWith("]") ? "" : `'${a.slice(1, -1)}']`)), t.aToken.splice(e, c, a), t.aLNum.splice(e, c, o), c = 0;
        }
      }
      t.len = t.aToken.length;
    }
  }
  testNoTxt(t) {
    return this.#a.test(t);
  }
  //4tst
}
class R {
  constructor(t) {
    this.sys = t, this.#n = new N(t.cfg), this.#i.trace = (s) => this.#f(s), this.#t = document.createElement("span"), this.#t.hidden = !0, this.#t.textContent = "", this.#t.style.cssText = `	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#t);
  }
  #n;
  #t;
  // Main.tsx からの初期化
  attachTsx(t, s, e) {
    this.$trgNext = t, this.$fncs = s, this.#i = e;
  }
  $trgNext;
  $fncs;
  #i = /* @__PURE__ */ Object.create(null);
  // タグ処理辞書
  #s = { aToken: [""], len: 1, aLNum: [1] };
  #c = "";
  #r = 0;
  #o = 0;
  async load(t) {
    this.#c = t;
    const s = this.sys.cfg.searchPath(t, m.SCRIPT), e = await this.sys.load(s);
    this.#s = this.#n.resolveScript(e), this.#r = 0, this.#o = 1;
    const i = this.#s.aToken.slice(this.#r).values();
    for (; ; ) {
      const { done: r, value: a } = i.next();
      if (r) {
        this.myTrace("🍇 スクリプト末尾", "E");
        break;
      }
      ++this.#r;
      let h = a;
      switch (a.charAt(0)) {
        case "	":
          continue;
        //  タブ
        case `
`:
          this.#o += h.length;
          continue;
        case "[":
          {
            console.log(`fn:ScriptMng.ts 🍊 TAG ${h}`);
            try {
              const l = (h.match(/\n/g) ?? []).length;
              l > 0 && (this.#o += l);
            } catch (l) {
              l instanceof Error ? this.myTrace(`[${y(h)}]タグ解析中例外 mes=${l.message}(${l.name})`) : this.myTrace(String(l));
              return;
            }
          }
          continue;
        case "&":
          try {
            if (!a.endsWith("&"))
              continue;
            if (a.charAt(1) === "&") throw new Error("「&表示&」書式では「&」指定が不要です");
          } catch (l) {
            this.myTrace(
              l instanceof Error ? `& 変数操作・表示 mes=${l.message}(${l.name})` : String(l)
            );
            return;
          }
          break;
        case ";":
          continue;
        // コメント
        case "*":
          if (a.length > 1) continue;
          break;
      }
      try {
        console.log(`fn:ScriptMng.ts 🍈 tagCh:${h}`);
      } catch (l) {
        this.myTrace(
          l instanceof Error ? `文字表示 mes=${l.message}(${l.name})` : String(l)
        );
        return;
      }
    }
    function* o() {
      yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "TXT", nm: "mes", str: "あいうえお" }, yield { nm: "mes", str: "かきくけこ" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
    }
    const n = o();
    let c = 0;
    this.go = () => {
      for (console.log("fn:ScriptMng.ts == go =="); ; ) {
        const { done: r, value: a } = n.next();
        if (r) break;
        this.sys.caretaker.push(t + ":" + ++c), "cls" in a ? this.$fncs.addLayer(a) : "fn" in a ? this.$fncs.chgPic(a) : this.$fncs.chgStr(a);
        break;
      }
    }, this.$trgNext();
  }
  go() {
  }
  #f(t) {
    return this.myTrace(t.text || `(text is ${t.text})`, "I"), !1;
  }
  myTrace = (t, s = "E") => {
    let e = `{${s}} ` + this.#h() + t;
    this.#e(e, s);
    let i = "";
    switch (s) {
      case "D":
        i = "color:#05A;";
        break;
      case "W":
        i = "color:#F80;";
        break;
      case "F":
        i = "color:#B00;";
        break;
      case "ET":
      case "E":
        if (this.dumpErrForeLine(), s === "ET") throw e;
        console.error("%c" + e, "color:#F30;");
        return;
      default:
        i = "", e = " " + e;
    }
    console.info("%c" + e, i);
  };
  #h = () => this.#o > 0 ? `(fn:${this.#c} line:${this.#o}) ` : "";
  #e = (t, s) => {
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
    this.#t.innerHTML += `<span style='${e}'>${t}</span><br/>`, this.#t.hidden = !1;
  };
  #a = 5;
  //TODO: 
  dumpErrForeLine() {
    if (this.#r === 0) {
      console.group(`🥟 Error line (from 0 rows before) fn:${this.#c}`), console.groupEnd();
      return;
    }
    let t = "";
    for (let n = this.#r - 1; n >= 0 && (t = this.#s.aToken[n] + t, !((t.match(/\n/g) ?? []).length >= this.#a)); --n)
      ;
    const s = t.split(`
`).slice(-this.#a), e = s.length;
    console.group(`🥟 Error line (from ${e} rows before) fn:${this.#c}`);
    const i = String(this.#o).length, o = this.#l(this.#s, this.#r);
    for (let n = 0; n < e; ++n) {
      const c = this.#o - e + n + 1, r = `${String(c).padStart(i, " ")}: %c`, a = s[n], h = a.length > 75 ? a.slice(0, 75) + "…" : a;
      n === e - 1 ? console.info(
        r + h.slice(0, o.col_s) + "%c" + h.slice(o.col_s),
        "color: black; background-color: skyblue;",
        "color: black; background-color: pink;"
      ) : console.info(r + h, "color: black; background-color: skyblue;");
    }
    console.groupEnd();
  }
  #l(t, s) {
    const e = { ln: 1, col_s: 0, col_e: 0 };
    if (!t) return e;
    let i = s - 1;
    const o = e.ln = t.aLNum[i];
    for (; t.aLNum[i] === o; ) {
      if (!t.aToken[i].startsWith(`
`)) {
        const n = t.aToken[i].length;
        e.col_e > 0 && (e.col_s += n), e.col_e += n;
      }
      if (--i < 0) break;
    }
    return e;
  }
}
export {
  R as ScriptMng
};
//# sourceMappingURL=ScriptMng.js.map
