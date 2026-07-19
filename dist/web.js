import { n as e } from "./rolldown-runtime.js";
import { n as t } from "./Memento.js";
//#region src/sn/SysBase.ts
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
var n = "skynovel", r = class {
	hPlg;
	arg;
	constructor(e = {}, t) {
		this.hPlg = e, this.arg = t;
	}
	async loaded(...[t]) {
		document.head.insertAdjacentHTML("beforeend", "<style type=\"text/css\">\n	body {\n		background-color: black;\n	}\n	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n</style>"), await Promise.all([
			import("./client.js").then((t) => /* @__PURE__ */ e(t.default, 1)),
			import("./Main.js"),
			import("./Config.js"),
			import("./ScriptMng.js")
		]).then(async ([{ createRoot: e }, { initMain: t }, { Config: r }, { ScriptMng: i }]) => {
			let a = await r.generate(this);
			this.setMain(a), document.body.style.backgroundColor = String(a.oCfg.init.bg_color);
			let o = document.getElementById(n);
			if (o) {
				let e = o.cloneNode(!0);
				e.id = n;
			} else o = document.createElement("div"), o.id = n, document.body.appendChild(o);
			let s = new i(this);
			t(e(o), {
				heStage: o,
				sys: this,
				scrMng: s
			}, () => queueMicrotask(() => s.load("main")));
		});
	}
	#e = new t();
	get caretaker() {
		return this.#e;
	}
	cfg;
	setMain(e) {
		this.cfg = e;
	}
	async run() {}
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
}, i = class extends r {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), queueMicrotask(async () => this.loaded(e, t));
	}
};
//#endregion
export { i as SysWeb };

//# sourceMappingURL=web.js.map