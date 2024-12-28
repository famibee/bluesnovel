class b {
  // 適当な名を付けて
  constructor(e = "") {
    this.stt = e;
  }
  // this.stt から
}
class w {
  #s = "";
  push(e) {
    this.update = this.#n, this.push = (t) => {
      this.#s = t, this.#t = this.#e.push(t) - 1, this.#o[t] = {};
    }, this.push(e);
  }
  #o = {};
  update(e) {
  }
  #n(e) {
    if (this.#t < this.#e.length - 1) return;
    const t = e();
    this.#o[this.#s][t.nm] = t, console.log(`fn:Memento.ts update -- key(${this.#s}) MeMe:%o`, t);
  }
  undo(e) {
    console.log(`fn:Memento.ts = undo key=(${e})`);
    const t = this.#o[e];
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
const y = "skynovel";
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
      import("./Config.js"),
      import("./ScriptMng.js")
    ]).then(async ([{ createRoot: t }, { initMain: n }, { Config: r }, { ScriptMng: l }]) => {
      const { oCfg: d } = await r.generate(this);
      document.body.style.backgroundColor = d.init.bg_color;
      let s = document.getElementById(y);
      if (s) {
        const o = s.cloneNode(!0);
        o.id = y;
      } else
        s = document.createElement("div"), s.id = y, document.body.appendChild(s);
      const i = new l(this);
      n(t(s), { heStage: s, sys: this, scrMng: i }, () => {
        Promise.all([
          import("./index.js"),
          import("./index2.js")
        ]).then(async ([{ Assets: o }, { extensions: c, ExtensionType: u }]) => {
          await o.init({ basePath: location.origin }), c.add({
            extension: {
              type: u.LoadParser,
              name: "sn-loader"
              //priority: LoaderParserPriority.High,
            },
            test: (a) => a.endsWith(".sn"),
            load: (a) => new Promise(async (m, p) => {
              const f = await this.fetch(a);
              if (!f.ok) {
                p("sn-loader fetch err:" + f.statusText);
                return;
              }
              try {
                m(await this.dec("sn", await f.text()));
              } catch (g) {
                p(`sn-loader err url:${a} ${g}`);
              }
            })
          }), this.load = (a) => o.load(a), await i.load("title");
        });
      });
    });
  }
  load = async (e) => "";
  fetch = (e, t) => fetch(e, t);
  #s = new w();
  get caretaker() {
    return this.#s;
  }
  cfg;
  async loadPath(e, t) {
    this.cfg = t;
    const n = this.arg.cur + "path.json", r = await this.fetch(n);
    if (!r.ok) throw Error(r.statusText);
    const l = await r.text(), d = JSON.parse(await this.dec(n, l));
    for (const [s, i] of Object.entries(d)) {
      const o = e[s] = i;
      for (const [c, u] of Object.entries(o))
        c !== ":cnt" && (o[c] = this.arg.cur + u);
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
class k extends _ {
  constructor(...[e = {}, t = { cur: "prj/", crypto: !1, dip: "" }]) {
    super(e, t), queueMicrotask(async () => this.loaded(e, t));
  }
}
export {
  b as B,
  k as S
};
//# sourceMappingURL=web2.js.map
