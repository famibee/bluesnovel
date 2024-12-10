import { S as g, b as w } from "./web2.js";
class x {
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
      const { key: e, val: r, val2: n, def: a, def2: o, literal: i } = s;
      e ? this.#n[e] = {
        val: r ?? n ?? "",
        def: a ?? o
      } : i && (i === "*" ? this.#i = !0 : this.#n[i] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, s, e, r) {
    const n = {}, a = t.slice(1 + s, -1);
    for (const { groups: o, index: i, 0: c } of a.matchAll(this.#e)) {
      if (i === void 0) continue;
      const { key: h, val: f, val2: p = "", literal: m } = o;
      if (m) {
        if (m.endsWith("=")) {
          const u = m.length - 1, { ch: _ } = this.#s(s, e, r, a, i + u);
          n[m.slice(0, -1)] = {
            k_ln: e,
            k_ch: _ - u,
            v_ln: e,
            v_ch: _ + 1,
            //	v_ch: ch +1+lenNm +literal.length +1,
            v_len: 0
          };
        }
        continue;
      }
      if (!h) continue;
      const { ln: d, ch: T } = this.#s(s, e, r, a, i), { ln: k, ch: $ } = this.#s(s, e, r, a, i + c.lastIndexOf(f ?? p ?? "") - (f ? 0 : 1));
      n[h] = { k_ln: d, k_ch: T, v_ln: k, v_ch: $, v_len: f ? f.length : p.length + 2 };
    }
    return n;
  }
  #s(t, s, e, r, n) {
    const o = r.slice(0, n).split(`
`), i = o.length;
    return {
      ln: s + i - 1,
      ch: i < 2 ? e + 1 + t + n : o.at(-1).length
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
function E(l) {
  const s = R.exec(l.slice(1, -1))?.groups;
  if (!s) throw `タグ記述【${l}】異常です(タグ解析)`;
  const e = s.name;
  return [e, l.slice(1 + e.length, -1)];
}
class v {
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
  bracket2macro(t, s, e, r) {
    const { name: n, text: a } = t;
    if (!n) throw "[bracket2macro] nameは必須です";
    if (!a) throw "[bracket2macro] textは必須です";
    const o = a.at(0);
    if (!o) throw "[bracket2macro] textは必須です";
    if (a.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(n in s)) throw `[bracket2macro] 未定義のタグ又はマクロ[${n}]です`;
    this.#t ??= {};
    const i = a.charAt(1);
    if (o in this.#t) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (i in this.#t) throw "[bracket2macro] text【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#s.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
    if (this.#s.test(i)) throw "[bracket2macro] text【" + i + "】は括弧マクロに使用できない文字です";
    this.#t[i] = "0", this.#t[o] = `[${n} text=`, this.addC2M(`\\${o}[^\\${i}]*\\${i}`, `\\${o}\\${i}`), this.#a(e, r);
  }
  // 一文字マクロの定義
  char2macro(t, s, e, r) {
    const { char: n, name: a } = t;
    if (!n) throw "[char2macro] charは必須です";
    if (this.#t ??= {}, n in this.#t) throw "[char2macro] char【" + n + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#s.test(n)) throw "[char2macro] char【" + n + "】は一文字マクロに使用できない文字です";
    if (!a) throw "[char2macro] nameは必須です";
    if (!(a in s)) throw `[char2macro] 未定義のタグ又はマクロ[${a}]です`;
    this.#t[n] = `[${a}]`, this.addC2M(`\\${n}`, `\\${n}`), this.#a(e, r);
  }
  #s;
  #n = new RegExp("");
  #i = "";
  #o = "";
  addC2M(t, s) {
    this.#i += `${t}|`, this.#o += `${s}`, this.#n = new RegExp(
      `(${this.#i}[^${this.#o}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const s = t.replaceAll(/\r\n?/g, `
`).match(this.#e)?.flatMap((r) => {
      if (!this.testTagLetml(r)) return r;
      const n = /^([^\]]+?])(.*)$/s.exec(r);
      if (!n) return r;
      const [, a, o] = n;
      return [a, o];
    }) ?? [], e = { aToken: s, len: s.length, aLNum: [] };
    return this.#a(e), this.#f(e), e;
  }
  #h = /^\[(call|loadplugin)\s/;
  #l = /\bfn\s*=\s*[^\s\]]+/;
  #f(t) {
    for (let s = t.len - 1; s >= 0; --s) {
      const e = t.aToken[s];
      if (!this.#h.test(e)) continue;
      const [r, n] = E(e);
      this.#r.parse(n);
      const a = this.#r.hPrm.fn;
      if (!a) continue;
      const { val: o } = a;
      if (!o || !o.endsWith("*")) continue;
      t.aToken.splice(s, 1, "	", "; " + e), t.aLNum.splice(s, 1, NaN, NaN);
      const i = r === "loadplugin" ? g.CSS : g.SN, c = this.cfg.matchPath("^" + o.slice(0, -1) + ".*", i);
      for (const h of c) {
        const f = e.replace(
          this.#l,
          "fn=" + decodeURIComponent(w(h[i]))
        );
        t.aToken.splice(s, 0, f), t.aLNum.splice(s, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #r = new x();
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
  #a(t, s = 0) {
    if (this.#t) {
      for (let e = t.len - 1; e >= s; --e) {
        const r = t.aToken[e];
        if (this.testNoTxt(r.at(0) ?? `
`)) continue;
        const n = t.aLNum[e], a = r.match(this.#n);
        if (!a) continue;
        let o = 1;
        for (let i = a.length - 1; i >= 0; --i) {
          let c = a[i];
          const h = this.#t[c.at(0) ?? " "];
          h && (c = h + (h.endsWith("]") ? "" : `'${c.slice(1, -1)}']`)), t.aToken.splice(e, o, c), t.aLNum.splice(e, o, n), o = 0;
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
class C {
  constructor(t, s) {
    this.sys = t, this.Assets = s, this.#e = new v(t.cfg);
  }
  #e;
  async load(t) {
    const s = this.sys.cfg.searchPath(t, g.SCRIPT), e = await this.Assets.load(s), r = this.#e.resolveScript(e);
    console.log(`fn:ScriptMng.ts line:34 1=${r.aToken[1]}`);
  }
}
export {
  C as ScriptMng
};
//# sourceMappingURL=ScriptMng.js.map
