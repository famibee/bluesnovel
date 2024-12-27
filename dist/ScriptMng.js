import { S as m, g as k } from "./ConfigBase.js";
class w {
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
    this.#n = {}, this.#i = !1;
    for (const { groups: s } of t.matchAll(this.#e)) {
      const { key: e, val: o, val2: n, def: a, def2: c, literal: i } = s;
      e ? this.#n[e] = {
        val: o ?? n ?? "",
        def: a ?? c
      } : i && (i === "*" ? this.#i = !0 : this.#n[i] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, s, e, o) {
    const n = {}, a = t.slice(1 + s, -1);
    for (const { groups: c, index: i, 0: r } of a.matchAll(this.#e)) {
      if (i === void 0) continue;
      const { key: h, val: f, val2: u = "", literal: g } = c;
      if (g) {
        if (g.endsWith("=")) {
          const p = g.length - 1, { ch: d } = this.#s(s, e, o, a, i + p);
          n[g.slice(0, -1)] = {
            k_ln: e,
            k_ch: d - p,
            v_ln: e,
            v_ch: d + 1,
            //	v_ch: ch +1+lenNm +literal.length +1,
            v_len: 0
          };
        }
        continue;
      }
      if (!h) continue;
      const { ln: _, ch: $ } = this.#s(s, e, o, a, i), { ln: x, ch: T } = this.#s(s, e, o, a, i + r.lastIndexOf(f ?? u ?? "") - (f ? 0 : 1));
      n[h] = { k_ln: _, k_ch: $, v_ln: x, v_ch: T, v_len: f ? f.length : u.length + 2 };
    }
    return n;
  }
  #s(t, s, e, o, n) {
    const c = o.slice(0, n).split(`
`), i = c.length;
    return {
      ln: s + i - 1,
      ch: i < 2 ? e + 1 + t + n : c.at(-1).length
    };
  }
  #n = {};
  get hPrm() {
    return this.#n;
  }
  #i = !1;
  get isKomeParam() {
    return this.#i;
  }
}
const R = /(?<name>[^\s;\]]+)/;
function v(l) {
  const s = R.exec(l.slice(1, -1))?.groups;
  if (!s) throw `タグ記述【${l}】異常です(タグ解析)`;
  const e = s.name;
  return [e, l.slice(1 + e.length, -1)];
}
class E {
  constructor(t) {
    this.cfg = t, this.setEscape("");
  }
  #e;
  setEscape(t) {
    if (this.#t && t in this.#t) throw "[エスケープ文字] char【" + t + "】が登録済みの括弧マクロまたは一文字マクロです";
    this.#e = new RegExp(
      (t ? `\\${t}\\S|` : "") + // エスケープシーケンス
      `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${t ? `\\${t}` : ""}]+`,
      // 本文
      "gs"
    ), this.#s = new RegExp(`[\\w\\s;[\\]*=&｜《》${t ? `\\${t}` : ""}]`), this.#r = new RegExp(`[\\n\\t;\\[*&${t ? `\\${t}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(t, s, e, o) {
    const { name: n, text: a } = t;
    if (!n) throw "[bracket2macro] nameは必須です";
    if (!a) throw "[bracket2macro] textは必須です";
    const c = a.at(0);
    if (!c) throw "[bracket2macro] textは必須です";
    if (a.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(n in s)) throw `[bracket2macro] 未定義のタグ又はマクロ[${n}]です`;
    this.#t ??= {};
    const i = a.charAt(1);
    if (c in this.#t) throw "[bracket2macro] text【" + c + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (i in this.#t) throw "[bracket2macro] text【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#s.test(c)) throw "[bracket2macro] text【" + c + "】は括弧マクロに使用できない文字です";
    if (this.#s.test(i)) throw "[bracket2macro] text【" + i + "】は括弧マクロに使用できない文字です";
    this.#t[i] = "0", this.#t[c] = `[${n} text=`, this.addC2M(`\\${c}[^\\${i}]*\\${i}`, `\\${c}\\${i}`), this.#a(e, o);
  }
  // 一文字マクロの定義
  char2macro(t, s, e, o) {
    const { char: n, name: a } = t;
    if (!n) throw "[char2macro] charは必須です";
    if (this.#t ??= {}, n in this.#t) throw "[char2macro] char【" + n + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#s.test(n)) throw "[char2macro] char【" + n + "】は一文字マクロに使用できない文字です";
    if (!a) throw "[char2macro] nameは必須です";
    if (!(a in s)) throw `[char2macro] 未定義のタグ又はマクロ[${a}]です`;
    this.#t[n] = `[${a}]`, this.addC2M(`\\${n}`, `\\${n}`), this.#a(e, o);
  }
  #s;
  #n = new RegExp("");
  #i = "";
  #c = "";
  addC2M(t, s) {
    this.#i += `${t}|`, this.#c += `${s}`, this.#n = new RegExp(
      `(${this.#i}[^${this.#c}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const s = t.replaceAll(/\r\n?/g, `
`).match(this.#e)?.flatMap((o) => {
      if (!this.testTagLetml(o)) return o;
      const n = /^([^\]]+?])(.*)$/s.exec(o);
      if (!n) return o;
      const [, a, c] = n;
      return [a, c];
    }) ?? [], e = { aToken: s, len: s.length, aLNum: [] };
    return this.#a(e), this.#f(e), e;
  }
  #h = /^\[(call|loadplugin)\s/;
  #l = /\bfn\s*=\s*[^\s\]]+/;
  #f(t) {
    for (let s = t.len - 1; s >= 0; --s) {
      const e = t.aToken[s];
      if (!this.#h.test(e)) continue;
      const [o, n] = v(e);
      this.#o.parse(n);
      const a = this.#o.hPrm.fn;
      if (!a) continue;
      const { val: c } = a;
      if (!c || !c.endsWith("*")) continue;
      t.aToken.splice(s, 1, "	", "; " + e), t.aLNum.splice(s, 1, NaN, NaN);
      const i = o === "loadplugin" ? m.CSS : m.SN, r = this.cfg.matchPath("^" + c.slice(0, -1) + ".*", i);
      for (const h of r) {
        const f = e.replace(
          this.#l,
          "fn=" + decodeURIComponent(k(h[i]))
        );
        t.aToken.splice(s, 0, f), t.aLNum.splice(s, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #o = new w();
  testTagLetml(t) {
    return /^\[let_ml\s/.test(t);
  }
  testTagEndLetml(t) {
    return /^\[endlet_ml\s*]/.test(t);
  }
  analyzToken(t) {
    return this.#e.lastIndex = 0, this.#e.exec(t);
  }
  #t;
  #r;
  #a(t, s = 0) {
    if (this.#t) {
      for (let e = t.len - 1; e >= s; --e) {
        const o = t.aToken[e];
        if (this.testNoTxt(o.at(0) ?? `
`)) continue;
        const n = t.aLNum[e], a = o.match(this.#n);
        if (!a) continue;
        let c = 1;
        for (let i = a.length - 1; i >= 0; --i) {
          let r = a[i];
          const h = this.#t[r.at(0) ?? " "];
          h && (r = h + (h.endsWith("]") ? "" : `'${r.slice(1, -1)}']`)), t.aToken.splice(e, c, r), t.aLNum.splice(e, c, n), c = 0;
        }
      }
      t.len = t.aToken.length;
    }
  }
  testNoTxt(t) {
    return this.#r.test(t);
  }
  //4tst
}
class y {
  constructor(t) {
    this.sys = t, this.#e = new E(t.cfg);
  }
  #e;
  init(t, s) {
    this.$trgNext = t, this.$fncs = s;
  }
  $trgNext;
  $fncs;
  async load(t) {
    const s = this.sys.cfg.searchPath(t, m.SCRIPT), e = await this.sys.load(s), o = this.#e.resolveScript(e);
    console.log(`fn:ScriptMng.ts line:34 1=${o.aToken[1]}`);
    function* n() {
      yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "TXT", nm: "mes", str: "あいうえお" }, yield { nm: "mes", str: "かきくけこ" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
    }
    const a = n();
    let c = 0;
    this.go = () => {
      for (console.log("fn:ScriptMng.ts == go =="); ; ) {
        const { done: i, value: r } = a.next();
        if (i) break;
        this.sys.caretaker.push(t + ":" + ++c), "cls" in r ? this.$fncs.addLayer(r) : "fn" in r ? this.$fncs.chgPic(r) : this.$fncs.chgStr(r);
        break;
      }
    }, this.$trgNext();
  }
  go() {
  }
}
export {
  y as ScriptMng
};
//# sourceMappingURL=ScriptMng.js.map
