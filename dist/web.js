import { r as e } from "./rolldown-runtime.js";
//#region src/sn/SysBase.ts
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
var t = "skynovel", n = class {
	hPlg;
	arg;
	constructor(e = {}, t) {
		this.hPlg = e, this.arg = t;
	}
	async loaded(...[n]) {
		document.head.insertAdjacentHTML("beforeend", "<style type=\"text/css\">\n	body {\n		background-color: black;\n	}\n	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n</style>"), await Promise.all([
			import("./client.js").then((t) => /* @__PURE__ */ e(t.default, 1)),
			import("./Main.js").then((e) => e.t),
			import("./Config.js"),
			import("./ScriptMng.js")
		]).then(async ([{ createRoot: e }, { initMain: n }, { Config: r }, { ScriptMng: i }]) => {
			let a = await r.generate(this);
			this.setMain(a), document.body.style.backgroundColor = String(a.oCfg.init.bg_color);
			let o = document.getElementById(t);
			if (o) {
				let e = o.cloneNode(!0);
				e.id = t;
			} else o = document.createElement("div"), o.id = t, document.body.appendChild(o);
			let s = new i(this);
			n(e(o), {
				heStage: o,
				sys: this,
				scrMng: s
			}, () => queueMicrotask(() => s.load("main")));
		});
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
	close() {}
	window(e) {}
	updateCheck(e) {}
}, r = class extends n {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), queueMicrotask(async () => this.loaded(e, t));
	}
};
//#endregion
export { r as SysWeb };

//# sourceMappingURL=web.js.map