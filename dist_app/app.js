import { r as e } from "./rolldown-runtime.js";
import { n as t } from "./SaveMng.js";
//#region src/sn/localStore.ts
var n = {
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
var r = "skynovel", i = class {
	hPlg;
	arg;
	constructor(e = {}, t) {
		this.hPlg = e, this.arg = t;
	}
	async loaded(...[t]) {
		let n = t.snsys_pre;
		delete t.snsys_pre, await n?.init({
			setDec: (e) => {
				this.dec = e;
			},
			setDecAB: (e) => {
				this.decAB = e;
			},
			setEnc: (e) => {
				this.enc = e;
			},
			getHash: (e) => {
				this.hash = e;
			}
		}), document.head.insertAdjacentHTML("beforeend", "<style type=\"text/css\">\n	body {\n		background-color: black;\n	}\n	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n</style>"), await Promise.all([
			import("./client.js").then((t) => /* @__PURE__ */ e(t.default, 1)),
			import("./Main.js").then((e) => e.t),
			import("./Config.js"),
			import("./ScriptMng.js"),
			import("./Sprite.js").then((e) => e.t)
		]).then(async ([{ createRoot: e }, { initMain: t }, { Config: n }, { ScriptMng: i }, { setFetch: a, setDecFncs: o }]) => {
			a((e, t) => this.fetch(e, t)), o((e, t) => this.dec(e, t), (e) => this.decAB(e), this.arg.crypto);
			let s = await n.generate(this);
			this.setMain(s), document.body.style.backgroundColor = String(s.oCfg.init.bg_color);
			let c = document.getElementById(r);
			if (c) {
				let e = c.cloneNode(!0);
				e.id = r;
			} else c = document.createElement("div"), c.id = r, document.body.appendChild(c);
			let l = new i(this);
			t(e(c), {
				heStage: c,
				sys: this,
				scrMng: l
			}, () => queueMicrotask(() => l.load("main")));
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
	decAB = (e) => Promise.resolve(e);
	enc = (e) => Promise.resolve(e);
	fetch = (e, t) => fetch(e, t);
	hash = (e) => "";
	async appendFile(e, t) {}
	get crypto() {
		return this.arg.crypto;
	}
	async storeLoad(e) {
		let t = (t) => `skynovel.${e} - ${t}${this.arg.crypto ? "_enc" : ""}`, r = n.get(t("sys"));
		if (r !== void 0) return {
			sys: r,
			mark: n.get(t("mark")) ?? {},
			kidoku: n.get(t("kidoku")) ?? {},
			storage: n.get(t("storage")) ?? {}
		};
	}
	storeFlush(e, t) {
		let r = (t) => `skynovel.${e} - ${t}${this.arg.crypto ? "_enc" : ""}`;
		return n.set(r("sys"), t.sys), n.set(r("mark"), t.mark), n.set(r("kidoku"), t.kidoku), n.set(r("storage"), t.storage), Promise.resolve();
	}
	close() {}
	window(e) {}
	updateCheck(e) {}
	async capturePage(e, t, n, r) {
		return "";
	}
}, a = class {
	send(e, ...t) {
		window.electron.ipcRenderer.send(e, ...t);
	}
	invoke(e, ...t) {
		return window.electron.ipcRenderer.invoke(e, ...t);
	}
}, o = class {
	on(e, t) {
		return window.electron.ipcRenderer.on(e, t);
	}
	once(e, t) {
		return window.electron.ipcRenderer.once(e, t);
	}
}, s = class extends i {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), queueMicrotask(async () => this.loaded(e, t));
	}
	#e = new a();
	#t = new o();
	async loaded(...[e, n]) {
		let r = await this.#e.invoke("getInfo");
		this.$path_downloads = r.downloads.replaceAll("\\", "/") + "/", this.$path_userdata = r.userData.replaceAll("\\", "/") + "/", this.#t.on("log", (e, t) => console.info("main: %o", t)), this.#t.on("fire", (e, t) => document.dispatchEvent(new KeyboardEvent("keydown", {
			key: t,
			bubbles: !0
		}))), this.#t.on("save_win_inf", (e, t) => document.dispatchEvent(new CustomEvent("sn_win_inf", { detail: t }))), await super.loaded(e, n);
		let { width: i, height: a } = this.cfg.oCfg.window, o = {
			c: !0,
			x: 0,
			y: 0,
			w: i,
			h: a
		};
		try {
			let e = await this.storeLoad(this.cfg.oCfg.save_ns), n = await t(this.dec, e?.sys), r = n?.["const.sn.nativeWindow.x"], i = n?.["const.sn.nativeWindow.y"], a = n?.["const.sn.nativeWindow.w"], s = n?.["const.sn.nativeWindow.h"];
			typeof r == "number" && typeof i == "number" && typeof a == "number" && typeof s == "number" && (o = {
				c: !1,
				x: r,
				y: i,
				w: a,
				h: s
			});
		} catch {}
		await this.#e.invoke("inited", this.cfg.oCfg, o);
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
	async storeFlush(e, t) {
		await this.#e.invoke("flush", t);
	}
};
//#endregion
export { s as SysApp };

//# sourceMappingURL=app.js.map