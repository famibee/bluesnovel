import { S as g, b as R } from "./web2.js";
import { a as d, c as E } from "./Stage.js";
class v {
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
    this.#n = {}, this.#a = !1;
    for (const { groups: e } of t.matchAll(this.#e)) {
      const { key: s, val: r, val2: n, def: i, def2: o, literal: a } = e;
      s ? this.#n[s] = {
        val: r ?? n ?? "",
        def: i ?? o
      } : a && (a === "*" ? this.#a = !0 : this.#n[a] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, e, s, r) {
    const n = {}, i = t.slice(1 + e, -1);
    for (const { groups: o, index: a, 0: c } of i.matchAll(this.#e)) {
      if (a === void 0) continue;
      const { key: h, val: l, val2: u = "", literal: m } = o;
      if (m) {
        if (m.endsWith("=")) {
          const p = m.length - 1, { ch: _ } = this.#s(e, s, r, i, a + p);
          n[m.slice(0, -1)] = {
            k_ln: s,
            k_ch: _ - p,
            v_ln: s,
            v_ch: _ + 1,
            //	v_ch: ch +1+lenNm +literal.length +1,
            v_len: 0
          };
        }
        continue;
      }
      if (!h) continue;
      const { ln: k, ch: w } = this.#s(e, s, r, i, a), { ln: $, ch: x } = this.#s(e, s, r, i, a + c.lastIndexOf(l ?? u ?? "") - (l ? 0 : 1));
      n[h] = { k_ln: k, k_ch: w, v_ln: $, v_ch: x, v_len: l ? l.length : u.length + 2 };
    }
    return n;
  }
  #s(t, e, s, r, n) {
    const o = r.slice(0, n).split(`
`), a = o.length;
    return {
      ln: e + a - 1,
      ch: a < 2 ? s + 1 + t + n : o.at(-1).length
    };
  }
  #n = {};
  get hPrm() {
    return this.#n;
  }
  #a = !1;
  get isKomeParam() {
    return this.#a;
  }
}
const A = /(?<name>[^\s;\]]+)/;
function C(f) {
  const e = A.exec(f.slice(1, -1))?.groups;
  if (!e) throw `タグ記述【${f}】異常です(タグ解析)`;
  const s = e.name;
  return [s, f.slice(1 + s.length, -1)];
}
class N {
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
    ), this.#s = new RegExp(`[\\w\\s;[\\]*=&｜《》${t ? `\\${t}` : ""}]`), this.#c = new RegExp(`[\\n\\t;\\[*&${t ? `\\${t}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(t, e, s, r) {
    const { name: n, text: i } = t;
    if (!n) throw "[bracket2macro] nameは必須です";
    if (!i) throw "[bracket2macro] textは必須です";
    const o = i.at(0);
    if (!o) throw "[bracket2macro] textは必須です";
    if (i.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(n in e)) throw `[bracket2macro] 未定義のタグ又はマクロ[${n}]です`;
    this.#t ??= {};
    const a = i.charAt(1);
    if (o in this.#t) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (a in this.#t) throw "[bracket2macro] text【" + a + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#s.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
    if (this.#s.test(a)) throw "[bracket2macro] text【" + a + "】は括弧マクロに使用できない文字です";
    this.#t[a] = "0", this.#t[o] = `[${n} text=`, this.addC2M(`\\${o}[^\\${a}]*\\${a}`, `\\${o}\\${a}`), this.#i(s, r);
  }
  // 一文字マクロの定義
  char2macro(t, e, s, r) {
    const { char: n, name: i } = t;
    if (!n) throw "[char2macro] charは必須です";
    if (this.#t ??= {}, n in this.#t) throw "[char2macro] char【" + n + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#s.test(n)) throw "[char2macro] char【" + n + "】は一文字マクロに使用できない文字です";
    if (!i) throw "[char2macro] nameは必須です";
    if (!(i in e)) throw `[char2macro] 未定義のタグ又はマクロ[${i}]です`;
    this.#t[n] = `[${i}]`, this.addC2M(`\\${n}`, `\\${n}`), this.#i(s, r);
  }
  #s;
  #n = new RegExp("");
  #a = "";
  #o = "";
  addC2M(t, e) {
    this.#a += `${t}|`, this.#o += `${e}`, this.#n = new RegExp(
      `(${this.#a}[^${this.#o}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const e = t.replaceAll(/\r\n?/g, `
`).match(this.#e)?.flatMap((r) => {
      if (!this.testTagLetml(r)) return r;
      const n = /^([^\]]+?])(.*)$/s.exec(r);
      if (!n) return r;
      const [, i, o] = n;
      return [i, o];
    }) ?? [], s = { aToken: e, len: e.length, aLNum: [] };
    return this.#i(s), this.#f(s), s;
  }
  #h = /^\[(call|loadplugin)\s/;
  #l = /\bfn\s*=\s*[^\s\]]+/;
  #f(t) {
    for (let e = t.len - 1; e >= 0; --e) {
      const s = t.aToken[e];
      if (!this.#h.test(s)) continue;
      const [r, n] = C(s);
      this.#r.parse(n);
      const i = this.#r.hPrm.fn;
      if (!i) continue;
      const { val: o } = i;
      if (!o || !o.endsWith("*")) continue;
      t.aToken.splice(e, 1, "	", "; " + s), t.aLNum.splice(e, 1, NaN, NaN);
      const a = r === "loadplugin" ? g.CSS : g.SN, c = this.cfg.matchPath("^" + o.slice(0, -1) + ".*", a);
      for (const h of c) {
        const l = s.replace(
          this.#l,
          "fn=" + decodeURIComponent(R(h[a]))
        );
        t.aToken.splice(e, 0, l), t.aLNum.splice(e, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #r = new v();
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
  #c;
  #i(t, e = 0) {
    if (this.#t) {
      for (let s = t.len - 1; s >= e; --s) {
        const r = t.aToken[s];
        if (this.testNoTxt(r.at(0) ?? `
`)) continue;
        const n = t.aLNum[s], i = r.match(this.#n);
        if (!i) continue;
        let o = 1;
        for (let a = i.length - 1; a >= 0; --a) {
          let c = i[a];
          const h = this.#t[c.at(0) ?? " "];
          h && (c = h + (h.endsWith("]") ? "" : `'${c.slice(1, -1)}']`)), t.aToken.splice(s, o, c), t.aLNum.splice(s, o, n), o = 0;
        }
      }
      t.len = t.aToken.length;
    }
  }
  testNoTxt(t) {
    return this.#c.test(t);
  }
  //4tst
}
class T {
  // #ct		= new Caretaker;
  constructor(t, e) {
    this.sys = t, this.Assets = e, this.#e = new N(t.cfg);
  }
  static async generate(t, e) {
    return new T(t, e);
  }
  #e;
  async load(t) {
    const e = this.sys.cfg.searchPath(t, g.SCRIPT), s = await this.Assets.load(e), r = this.#e.resolveScript(s);
    console.log(`fn:ScriptMng.ts line:34 1=${r.aToken[1]}`), d({ cls: "GRP", nm: "base", fn: "yun_1184" }), d({ cls: "GRP", nm: "fg0", fn: "F_1024a" }), E({ nm: "base", fn: "yun_1317" });
  }
}
export {
  T as ScriptMng
};
//# sourceMappingURL=ScriptMng.js.map
