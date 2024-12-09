import { S as g, b as $ } from "./web2.js";
import { a as w, c as R } from "./Stage.js";
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
  #e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
  // 【属性 = 値 | 省略値】の分析
  parse(t) {
    this.#n = {}, this.#a = !1;
    for (const { groups: s } of t.matchAll(this.#e)) {
      const { key: e, val: r, val2: n, def: i, def2: a, literal: o } = s;
      e ? this.#n[e] = {
        val: r ?? n ?? "",
        def: i ?? a
      } : o && (o === "*" ? this.#a = !0 : this.#n[o] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, s, e, r) {
    const n = {}, i = t.slice(1 + s, -1);
    for (const { groups: a, index: o, 0: c } of i.matchAll(this.#e)) {
      if (o === void 0) continue;
      const { key: h, val: f, val2: u = "", literal: m } = a;
      if (m) {
        if (m.endsWith("=")) {
          const p = m.length - 1, { ch: d } = this.#s(s, e, r, i, o + p);
          n[m.slice(0, -1)] = {
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
      const { ln: _, ch: k } = this.#s(s, e, r, i, o), { ln: T, ch: x } = this.#s(s, e, r, i, o + c.lastIndexOf(f ?? u ?? "") - (f ? 0 : 1));
      n[h] = { k_ln: _, k_ch: k, v_ln: T, v_ch: x, v_len: f ? f.length : u.length + 2 };
    }
    return n;
  }
  #s(t, s, e, r, n) {
    const a = r.slice(0, n).split(`
`), o = a.length;
    return {
      ln: s + o - 1,
      ch: o < 2 ? e + 1 + t + n : a.at(-1).length
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
const v = /(?<name>[^\s;\]]+)/;
function A(l) {
  const s = v.exec(l.slice(1, -1))?.groups;
  if (!s) throw `タグ記述【${l}】異常です(タグ解析)`;
  const e = s.name;
  return [e, l.slice(1 + e.length, -1)];
}
class C {
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
    const { name: n, text: i } = t;
    if (!n) throw "[bracket2macro] nameは必須です";
    if (!i) throw "[bracket2macro] textは必須です";
    const a = i.at(0);
    if (!a) throw "[bracket2macro] textは必須です";
    if (i.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(n in s)) throw `[bracket2macro] 未定義のタグ又はマクロ[${n}]です`;
    this.#t ??= {};
    const o = i.charAt(1);
    if (a in this.#t) throw "[bracket2macro] text【" + a + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (o in this.#t) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#s.test(a)) throw "[bracket2macro] text【" + a + "】は括弧マクロに使用できない文字です";
    if (this.#s.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
    this.#t[o] = "0", this.#t[a] = `[${n} text=`, this.addC2M(`\\${a}[^\\${o}]*\\${o}`, `\\${a}\\${o}`), this.#i(e, r);
  }
  // 一文字マクロの定義
  char2macro(t, s, e, r) {
    const { char: n, name: i } = t;
    if (!n) throw "[char2macro] charは必須です";
    if (this.#t ??= {}, n in this.#t) throw "[char2macro] char【" + n + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#s.test(n)) throw "[char2macro] char【" + n + "】は一文字マクロに使用できない文字です";
    if (!i) throw "[char2macro] nameは必須です";
    if (!(i in s)) throw `[char2macro] 未定義のタグ又はマクロ[${i}]です`;
    this.#t[n] = `[${i}]`, this.addC2M(`\\${n}`, `\\${n}`), this.#i(e, r);
  }
  #s;
  #n = new RegExp("");
  #a = "";
  #o = "";
  addC2M(t, s) {
    this.#a += `${t}|`, this.#o += `${s}`, this.#n = new RegExp(
      `(${this.#a}[^${this.#o}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const s = t.replaceAll(/\r\n?/g, `
`).match(this.#e)?.flatMap((r) => {
      if (!this.testTagLetml(r)) return r;
      const n = /^([^\]]+?])(.*)$/s.exec(r);
      if (!n) return r;
      const [, i, a] = n;
      return [i, a];
    }) ?? [], e = { aToken: s, len: s.length, aLNum: [] };
    return this.#i(e), this.#f(e), e;
  }
  #h = /^\[(call|loadplugin)\s/;
  #l = /\bfn\s*=\s*[^\s\]]+/;
  #f(t) {
    for (let s = t.len - 1; s >= 0; --s) {
      const e = t.aToken[s];
      if (!this.#h.test(e)) continue;
      const [r, n] = A(e);
      this.#r.parse(n);
      const i = this.#r.hPrm.fn;
      if (!i) continue;
      const { val: a } = i;
      if (!a || !a.endsWith("*")) continue;
      t.aToken.splice(s, 1, "	", "; " + e), t.aLNum.splice(s, 1, NaN, NaN);
      const o = r === "loadplugin" ? g.CSS : g.SN, c = this.cfg.matchPath("^" + a.slice(0, -1) + ".*", o);
      for (const h of c) {
        const f = e.replace(
          this.#l,
          "fn=" + decodeURIComponent($(h[o]))
        );
        t.aToken.splice(s, 0, f), t.aLNum.splice(s, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #r = new E();
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
  #i(t, s = 0) {
    if (this.#t) {
      for (let e = t.len - 1; e >= s; --e) {
        const r = t.aToken[e];
        if (this.testNoTxt(r.at(0) ?? `
`)) continue;
        const n = t.aLNum[e], i = r.match(this.#n);
        if (!i) continue;
        let a = 1;
        for (let o = i.length - 1; o >= 0; --o) {
          let c = i[o];
          const h = this.#t[c.at(0) ?? " "];
          h && (c = h + (h.endsWith("]") ? "" : `'${c.slice(1, -1)}']`)), t.aToken.splice(e, a, c), t.aLNum.splice(e, a, n), a = 0;
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
class b {
  constructor(t, s) {
    this.sys = t, this.Assets = s, this.#e = new C(t.cfg);
  }
  #e;
  async load(t) {
    const s = this.sys.cfg.searchPath(t, g.SCRIPT), e = await this.Assets.load(s), r = this.#e.resolveScript(e);
    console.log(`fn:ScriptMng.ts line:34 1=${r.aToken[1]}`);
    function* n() {
      yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
    }
    let i = 0;
    for (const a of n())
      "cls" in a ? w(a) : R(a), this.sys.caretaker.key = t + ":" + ++i;
  }
}
export {
  b as ScriptMng
};
//# sourceMappingURL=ScriptMng.js.map
