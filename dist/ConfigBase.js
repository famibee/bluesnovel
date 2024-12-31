import { i as l } from "./CmnLib.js";
var u = /* @__PURE__ */ ((i) => (i.DEFAULT = "", i.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", i.SCRIPT = "sn|ssn", i.FONT = "woff2|woff|otf|ttf", i.SOUND = "mp3|m4a|ogg|aac|flac|wav", i.HTML = "htm|html", i.CSS = "css", i.SN = "sn", i.TST_PNGPNG_ = "png|png_", i.TST_HH = "hh", i.TST_EEE = "eee", i.TST_GGG = "ggg", i.TST_PNGXML = "png|xml", i))(u || {});
const w = {
  save_ns: "",
  // 扱うセーブデータを一意に識別するキーワード文字列
  window: {
    // アプリケーションウインドウサイズ
    width: 300,
    height: 300
  },
  book: {
    // プロジェクトの詳細情報です
    title: "",
    //作品タイトル
    creator: "",
    //著作者。同人ならペンネーム
    cre_url: "",
    //著作者URL。ツイッターやメール、サイトなど
    publisher: "",
    //出版社。同人ならサークル名
    pub_url: "",
    //出版社URL。無ければ省略します
    detail: "",
    // 内容紹介。端的に記入
    version: "1.0"
  },
  log: { max_len: 64 },
  // プレイヤーが読んだ文章を読み返せる履歴のページ数
  init: {
    bg_color: "#000000",
    // 背景色
    tagch_msecwait: 10,
    // 通常文字表示待ち時間（未読／既読）
    auto_msecpagewait: 3500,
    // 自動文字表示、行クリック待ち時間（未読／既読）
    escape: ""
    // エスケープ文字
  },
  debug: {
    devtool: !1,
    token: !1,
    tag: !1,
    putCh: !1,
    debugLog: !1,
    baseTx: !1,
    masume: !1,
    // テキストレイヤ：ガイドマス目を表示するか
    variable: !1,
    dumpHtm: !1
  },
  code: {},
  // 暗号化しないフォルダ
  debuger_token: ""
  // デバッガとの接続トークン
};
class d {
  constructor(t) {
    this.sys = t;
  }
  oCfg = w;
  userFnTail = "";
  // 4tst public
  hPathFn2Exts = {};
  async load(t) {
    if (this.oCfg.save_ns = t?.save_ns ?? this.oCfg.save_ns, this.oCfg.window.width = Number(t?.window?.width ?? this.oCfg.window.width), this.oCfg.window.height = Number(t?.window?.height ?? this.oCfg.window.height), this.oCfg.book = { ...this.oCfg.book, ...t.book }, this.oCfg.log.max_len = t.log?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...t.init }, this.oCfg.debug = { ...this.oCfg.debug, ...t.debug }, this.oCfg.debuger_token = t.debuger_token, await this.sys.loadPath(this.hPathFn2Exts, this), this.#t = this.matchPath(
      "^breakline$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.#s = this.matchPath(
      "^breakpage$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.sys.arg.crypto)
      for (const [s, e] of Object.entries(this.hPathFn2Exts))
        for (const [o, h] of Object.entries(e)) {
          if (!o.startsWith(":") || !o.endsWith(":id")) continue;
          const n = h.slice(h.lastIndexOf("/") + 1), f = e[o.slice(0, -10)] ?? "", r = await (await this.sys.fetch(f)).text(), c = this.sys.hash(r);
          if (n !== c) throw `ファイル改竄エラーです fn:${f}`;
        }
    else
      for (const [s, e] of Object.entries(this.hPathFn2Exts))
        for (const o of Object.keys(e))
          o.startsWith(":");
  }
  #t = !1;
  get existsBreakline() {
    return this.#t;
  }
  #s = !1;
  get existsBreakpage() {
    return this.#s;
  }
  getNs() {
    return `skynovel.${this.oCfg.save_ns} - `;
  }
  #e = /([^\/\s]+)\.([^\d]\w+)/;
  // 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
  searchPath(t, s = "") {
    if (!t) throw "[searchPath] fnが空です";
    if (t.startsWith("http://")) return t;
    const e = t.match(this.#e);
    let o = e ? e[1] : t;
    const h = e ? e[2] : "";
    if (this.userFnTail) {
      const a = o + "@@" + this.userFnTail;
      if (a in this.hPathFn2Exts) {
        if (s === "") o = a;
        else for (const r of Object.keys(this.hPathFn2Exts[a] ?? {}))
          if (`|${s}|`.includes(`|${r}|`)) {
            o = a;
            break;
          }
      }
    }
    const n = this.hPathFn2Exts[o];
    if (!n) throw `サーチパスに存在しないファイル【${t}】です`;
    if (!h) {
      const a = l(n[":cnt"]);
      if (s === "") {
        if (a > 1) throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${s}】で絞り込むか、ファイル名を個別にして下さい。`;
        return t;
      }
      const r = `|${s}|`;
      if (a > 1) {
        let c = 0;
        for (const g of Object.keys(n))
          if (r.includes(`|${g}|`) && ++c > 1)
            throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${s}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const c of Object.keys(n))
        if (r.includes(`|${c}|`)) return n[c];
      throw `サーチ対象拡張子群【${s}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${t}】`;
    }
    if (s !== "" && !`|${s}|`.includes(`|${h}|`))
      throw `指定ファイルの拡張子【${h}】は、サーチ対象拡張子群【${s}】にマッチしません。探索ファイル名=【${t}】`;
    const f = n[h];
    if (!f) throw `サーチパスに存在しない拡張子【${h}】です。探索ファイル名=【${t}】、サーチ対象拡張子群【${s}】`;
    return f;
  }
  matchPath(t, s = "") {
    const e = [], o = new RegExp(t), h = new RegExp(s);
    for (const [n, f] of Object.entries(this.hPathFn2Exts)) {
      if (n.search(o) === -1) continue;
      if (s === "") {
        e.push(f);
        continue;
      }
      const a = {};
      let r = !1;
      for (const c of Object.keys(f))
        c.search(h) !== -1 && (a[c] = n, r = !0);
      r && e.push(a);
    }
    return e;
  }
  addPath(t, s) {
    const e = {};
    for (const [o, h] of Object.entries(s))
      e[o] = (o.startsWith(":") ? "" : this.sys.arg.cur) + h;
    this.hPathFn2Exts[t] = e;
  }
}
export {
  d as C,
  u as S
};
//# sourceMappingURL=ConfigBase.js.map
