class $ {
  // 適当な名を付けて
  constructor(e = "") {
    this.stt = e;
  }
  // this.stt から
}
class j {
  #o = "";
  push(e) {
    this.update = this.#n, this.push = (t) => {
      this.#o = t, this.#s = this.#t.push(t) - 1, this.#e[t] = {};
    }, this.push(e);
  }
  #e = {};
  update(e) {
  }
  #n(e) {
    if (this.#s < this.#t.length - 1) return;
    const t = e();
    this.#e[this.#o][t.nm] = t, console.log(`fn:Memento.ts update -- key(${this.#o}) MeMe:%o`, t);
  }
  undo(e) {
    console.log(`fn:Memento.ts = undo key=(${e})`);
    const t = this.#e[e];
    if (!t) throw `undo Err key:${e}`;
    for (const o of Object.values(t)) o.restore();
  }
  #t = [];
  #s = 0;
  // 前のキーへ移動
  prevKey() {
    return console.log("fn:Memento.ts -- beforeKey --"), this.#s <= 0 ? !1 : (this.undo(this.#t[--this.#s]), !0);
  }
  // 後のキーへ移動
  nextKey() {
    return console.log("fn:Memento.ts -- afterKey --"), this.#t.length - 1 <= this.#s ? !1 : (this.undo(this.#t[++this.#s]), !0);
  }
  isLast() {
    return this.#t.length - 1 === this.#s;
  }
}
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
const y = "skynovel";
class P {
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
    ]).then(async ([{ createRoot: t }, { initMain: o }, { Config: i }]) => {
      const l = await i.generate(this), { oCfg: { init: { bg_color: u, escape: f } } } = l;
      document.body.style.backgroundColor = u;
      let s = document.getElementById(y);
      if (s) {
        const h = s.cloneNode(!0);
        h.id = y;
      } else
        s = document.createElement("div"), s.id = y, document.body.appendChild(s);
      let n = /* @__PURE__ */ Object.create(null), r = () => {
      };
      o(t(s), { heStage: s, sys: this, hTag: n, procNext: () => r(), attachTsx: (h, m) => {
        n.title = ({ text: c }) => {
          if (!c) throw "[title] textは必須です";
          return m.addTitle(c), !1;
        }, Promise.all([
          import("./index.js"),
          import("./index2.js"),
          import("./ScriptMng.js"),
          import("./Variable.js"),
          import("./PropParser.js")
        ]).then(async ([{ Assets: c }, { extensions: b, ExtensionType: k }, { ScriptMng: v }, { Variable: x }, { PropParser: M }]) => {
          await c.init({ basePath: location.origin }), b.add({
            extension: {
              type: k.LoadParser,
              name: "sn-loader"
              //priority: LoaderParserPriority.High,
            },
            test: (a) => a.endsWith(".sn"),
            load: (a) => new Promise(async (O, w) => {
              const p = await this.fetch(a);
              if (!p.ok) {
                w("sn-loader fetch err:" + p.statusText);
                return;
              }
              try {
                O(await this.dec("sn", await p.text()));
              } catch (T) {
                w(`sn-loader err url:${a} ${T}`);
              }
            })
          }), this.load = (a) => c.load(a);
          const g = new x(l, n), S = new M(g, f ?? "\\"), _ = new v(this, n, h, m, g, S);
          r = () => _.go(), await _.load("title");
        });
      } });
    });
  }
  load = async (e) => "";
  fetch = (e, t) => fetch(e, t);
  #o = new j();
  get caretaker() {
    return this.#o;
  }
  cfg;
  async loadPath(e, t) {
    this.cfg = t;
    const o = this.arg.cur + "path.json", i = await this.fetch(o);
    if (!i.ok) throw Error(i.statusText);
    const l = await i.text(), u = JSON.parse(await this.dec(o, l));
    for (const [f, s] of Object.entries(u)) {
      const n = e[f] = s;
      for (const [r, h] of Object.entries(n))
        r !== ":cnt" && (n[r] = this.arg.cur + h);
    }
  }
  data = { sys: {}, mark: {}, kidoku: {} };
  async initVal(e, t, o) {
  }
  flush() {
    if (this.#e) {
      this.#n = !0;
      return;
    }
    this.flushSub(), this.#e = setTimeout(() => {
      this.#e = void 0, this.#n && (this.#n = !1, this.flush());
    }, 500);
  }
  #e = void 0;
  #n = !1;
  flushSub() {
  }
  //TODO: 
  async run() {
  }
  #t = [];
  addHook(e) {
    this.#t.push(e);
  }
  callHook = (e, t) => {
  };
  send2Dbg = (e, t) => {
  };
  copyBMFolder = (e, t) => {
  };
  //TODO: 
  eraseBMFolder = (e) => {
  };
  //TODO: 
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
class B extends P {
  constructor(...[e = {}, t = { cur: "prj/", crypto: !1, dip: "" }]) {
    super(e, t), queueMicrotask(async () => this.loaded(e, t));
  }
}
export {
  $ as B,
  B as S
};
//# sourceMappingURL=web2.js.map
