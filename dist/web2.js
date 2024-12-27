class k {
  // 適当な名を付けて
  constructor(e = "") {
    this.stt = e;
  }
  // this.stt から
}
class b {
  #s = "";
  push(e) {
    this.update = this.#o, this.push = (t) => {
      this.#s = t, this.#t = this.#e.push(t) - 1, this.#n[t] = {};
    }, this.push(e);
  }
  #n = {};
  update(e) {
  }
  #o(e) {
    if (this.#t < this.#e.length - 1) return;
    const t = e();
    this.#n[this.#s][t.nm] = t, console.log(`fn:Memento.ts update -- key(${this.#s}) MeMe:%o`, t);
  }
  undo(e) {
    console.log(`fn:Memento.ts = undo key=(${e})`);
    const t = this.#n[e];
    if (!t) throw `undo Err key:${e}`;
    for (const n of Object.values(t)) n.restore();
  }
  #e = [];
  #t = 0;
  // 前のキーへ移動
  prevKey() {
    return console.log("fn:Memento.ts -- beforeKey --"), this.#t <= 0 ? !1 : (this.undo(this.#e[--this.#t]), !0);
  }
  // 後のキーへ移動
  nextKey() {
    return console.log("fn:Memento.ts -- afterKey --"), this.#e.length - 1 <= this.#t ? !1 : (this.undo(this.#e[++this.#t]), !0);
  }
  isLast() {
    return this.#e.length - 1 === this.#t;
  }
}
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
const f = "skynovel";
class _ {
  constructor(e = {}, t) {
    this.hPlg = e, this.arg = t;
  }
  async loaded(...[e]) {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style type="text/css">
	body {
		background-color: black;
	}
	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
</style>`
    ), Promise.all([
      import("./client.js").then((t) => t.c),
      import("./Main.js").then((t) => t.M),
      import("./Config.js")
    ]).then(async ([{ createRoot: t }, { initMain: n, start: i }, { Config: d }]) => {
      const c = await (async () => {
        const o = await d.generate(this);
        document.body.style.backgroundColor = o.oCfg.init.bg_color;
        let s = document.getElementById(f);
        if (s) {
          const a = s.cloneNode(!0);
          a.id = f;
        } else
          s = document.createElement("div"), s.id = f, document.body.appendChild(s);
        return s;
      })();
      n(t(c), { heStage: c, sys: this }), Promise.all([
        import("./index.js"),
        import("./index2.js"),
        import("./ScriptMng.js")
      ]).then(async ([{ Assets: o }, { extensions: s, ExtensionType: a }, { ScriptMng: l }]) => {
        await o.init({ basePath: location.origin }), s.add({
          extension: {
            type: a.LoadParser,
            name: "sn-loader"
            //priority: LoaderParserPriority.High,
          },
          test: (r) => r.endsWith(".sn"),
          load: (r) => new Promise(async (m, p) => {
            const u = await this.fetch(r);
            if (!u.ok) {
              p("sn-loader fetch err:" + u.statusText);
              return;
            }
            try {
              m(await this.dec("sn", await u.text()));
            } catch (w) {
              p(`sn-loader err url:${r} ${w}`);
            }
          })
        }), this.load = (r) => o.load(r);
        const g = new l(this);
        await i(g);
      });
    });
  }
  load = async (e) => "";
  fetch = (e, t) => fetch(e, t);
  #s = new b();
  get caretaker() {
    return this.#s;
  }
  cfg;
  async loadPath(e, t) {
    this.cfg = t;
    const n = this.arg.cur + "path.json", i = await this.fetch(n);
    if (!i.ok) throw Error(i.statusText);
    const d = await i.text(), y = JSON.parse(await this.dec(n, d));
    for (const [c, o] of Object.entries(y)) {
      const s = e[c] = o;
      for (const [a, l] of Object.entries(s))
        a !== ":cnt" && (s[a] = this.arg.cur + l);
    }
  }
  async run() {
  }
  $path_downloads = "";
  get path_downloads() {
    return this.$path_downloads;
  }
  $path_userdata = "";
  get path_userdata() {
    return this.$path_userdata;
  }
  dec = (e, t) => Promise.resolve(t);
  hash = (e) => "";
}
class v extends _ {
  constructor(...[e = {}, t = { cur: "prj/", crypto: !1, dip: "" }]) {
    super(e, t), queueMicrotask(async () => this.loaded(e, t));
  }
}
export {
  k as B,
  v as S
};
//# sourceMappingURL=web2.js.map
