import { r as e } from "./rolldown-runtime.js";
//#region src/sn/localStore.ts
var t = {
	get(e) {
		let t = localStorage.getItem(e);
		if (t != null) try {
			return JSON.parse(t);
		} catch {
			return;
		}
	},
	set(e, t) {
		localStorage.setItem(e, JSON.stringify(t));
	},
	remove(e) {
		localStorage.removeItem(e);
	}
};
//#endregion
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
			import("./Main.js").then((e) => e.t),
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
	async storeLoad(e) {
		let n = (t) => `skynovel.${e} - ${t}`, r = t.get(n("sys"));
		if (r !== void 0) return {
			sys: r,
			mark: t.get(n("mark")) ?? {},
			kidoku: t.get(n("kidoku")) ?? {},
			storage: t.get(n("storage")) ?? {}
		};
	}
	storeFlush(e, n) {
		let r = (t) => `skynovel.${e} - ${t}`;
		t.set(r("sys"), n.sys), t.set(r("mark"), n.mark), t.set(r("kidoku"), n.kidoku), t.set(r("storage"), n.storage);
	}
	close() {}
	window(e) {}
	updateCheck(e) {}
	async capturePage(e, t, n, r) {
		return "";
	}
}, i = class {
	send(e, ...t) {
		window.electron.ipcRenderer.send(e, ...t);
	}
	invoke(e, ...t) {
		return window.electron.ipcRenderer.invoke(e, ...t);
	}
}, a = class {
	on(e, t) {
		return window.electron.ipcRenderer.on(e, t);
	}
	once(e, t) {
		return window.electron.ipcRenderer.once(e, t);
	}
}, o = class extends r {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), queueMicrotask(async () => this.loaded(e, t));
	}
	#e = new i();
	#t = new a();
	async loaded(...[e, t]) {
		let n = await this.#e.invoke("getInfo");
		this.$path_downloads = n.downloads.replaceAll("\\", "/") + "/", this.$path_userdata = n.userData.replaceAll("\\", "/") + "/", this.#t.on("log", (e, t) => console.info("main: %o", t)), this.#t.on("fire", (e, t) => document.dispatchEvent(new KeyboardEvent("keydown", {
			key: t,
			bubbles: !0
		}))), this.#t.on("save_win_inf", (e, t) => document.dispatchEvent(new CustomEvent("sn_win_inf", { detail: t }))), await super.loaded(e, t);
		let { width: r, height: i } = this.cfg.oCfg.window, a = {
			c: !0,
			x: 0,
			y: 0,
			w: r,
			h: i
		};
		try {
			let e = await this.storeLoad(this.cfg.oCfg.save_ns), t = e?.sys["const.sn.nativeWindow.x"], n = e?.sys["const.sn.nativeWindow.y"], r = e?.sys["const.sn.nativeWindow.w"], i = e?.sys["const.sn.nativeWindow.h"];
			typeof t == "number" && typeof n == "number" && typeof r == "number" && typeof i == "number" && (a = {
				c: !1,
				x: t,
				y: n,
				w: r,
				h: i
			});
		} catch {}
		await this.#e.invoke("inited", this.cfg.oCfg, a);
	}
	appendFile = (e, t) => this.#e.invoke("appendFile", e, t);
	close() {
		this.#e.invoke("win_close");
	}
	window(e) {
		this.#e.invoke("window", e.centering, e.x, e.y, e.w, e.h);
	}
	capturePage(e, t, n, r) {
		return this.#e.invoke("capturePage", e, t, n, r);
	}
	async storeLoad(e) {
		if (await this.#e.invoke("Store", { name: e }), await this.#e.invoke("Store_isEmpty")) return;
		let t = await this.#e.invoke("Store_get");
		return {
			sys: t.sys ?? {},
			mark: t.mark ?? {},
			kidoku: t.kidoku ?? {},
			storage: t.storage ?? {}
		};
	}
	storeFlush(e, t) {
		this.#e.invoke("flush", t);
	}
};
//#endregion
export { o as SysApp };

//# sourceMappingURL=app.js.map