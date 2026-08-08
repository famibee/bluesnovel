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
	async appendFile(e, t) {}
	close() {}
	window(e) {}
	updateCheck(e) {}
}, r = class {
	send(e, ...t) {
		window.electron.ipcRenderer.send(e, ...t);
	}
	invoke(e, ...t) {
		return window.electron.ipcRenderer.invoke(e, ...t);
	}
}, i = class {
	on(e, t) {
		return window.electron.ipcRenderer.on(e, t);
	}
	once(e, t) {
		return window.electron.ipcRenderer.once(e, t);
	}
}, a = class extends n {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), queueMicrotask(async () => this.loaded(e, t));
	}
	#e = new r();
	#t = new i();
	async loaded(...[e, t]) {
		let n = await this.#e.invoke("getInfo");
		this.$path_downloads = n.downloads.replaceAll("\\", "/") + "/", this.$path_userdata = n.userData.replaceAll("\\", "/") + "/", this.#t.on("log", (e, t) => console.info("main: %o", t)), this.#t.on("fire", (e, t) => document.dispatchEvent(new KeyboardEvent("keydown", {
			key: t,
			bubbles: !0
		}))), await super.loaded(e, t);
		let { width: r, height: i } = this.cfg.oCfg.window;
		await this.#e.invoke("inited", this.cfg.oCfg, {
			c: !0,
			x: 0,
			y: 0,
			w: r,
			h: i
		});
	}
	appendFile = (e, t) => this.#e.invoke("appendFile", e, t);
	close() {
		this.#e.invoke("win_close");
	}
	window(e) {
		this.#e.invoke("window", e.centering, e.x, e.y, e.w, e.h);
	}
};
//#endregion
export { a as SysApp };

//# sourceMappingURL=app.js.map