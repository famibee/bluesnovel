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
		let r = t.snsys_pre;
		delete t.snsys_pre, await r?.init({
			setDec: (e) => {
				this.dec = e;
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
		]).then(async ([{ createRoot: e }, { initMain: t }, { Config: r }, { ScriptMng: i }, { setFetch: a }]) => {
			a((e, t) => this.fetch(e, t));
			let o = await r.generate(this);
			this.setMain(o), document.body.style.backgroundColor = String(o.oCfg.init.bg_color);
			let s = document.getElementById(n);
			if (s) {
				let e = s.cloneNode(!0);
				e.id = n;
			} else s = document.createElement("div"), s.id = n, document.body.appendChild(s);
			let c = new i(this);
			t(e(s), {
				heStage: s,
				sys: this,
				scrMng: c
			}, () => queueMicrotask(() => c.load("main")));
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
	enc = (e) => Promise.resolve(e);
	fetch = (e, t) => fetch(e, t);
	hash = (e) => "";
	async appendFile(e, t) {}
	get crypto() {
		return this.arg.crypto;
	}
	async storeLoad(e) {
		let n = (t) => `skynovel.${e} - ${t}${this.arg.crypto ? "_enc" : ""}`, r = t.get(n("sys"));
		if (r !== void 0) return {
			sys: r,
			mark: t.get(n("mark")) ?? {},
			kidoku: t.get(n("kidoku")) ?? {},
			storage: t.get(n("storage")) ?? {}
		};
	}
	storeFlush(e, n) {
		let r = (t) => `skynovel.${e} - ${t}${this.arg.crypto ? "_enc" : ""}`;
		return t.set(r("sys"), n.sys), t.set(r("mark"), n.mark), t.set(r("kidoku"), n.kidoku), t.set(r("storage"), n.storage), Promise.resolve();
	}
	close() {}
	window(e) {}
	updateCheck(e) {}
	async capturePage(e, t, n, r) {
		return "";
	}
}, i = class extends r {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), queueMicrotask(async () => this.loaded(e, t));
	}
	async loaded(...[e, t]) {
		if (await super.loaded(e, t), !this.cfg.oCfg.debug.devtool) {
			let { initDevToolsGuard: e } = await import("./DevToolsGuard.js");
			e();
		}
	}
	#e = {};
	async appendFile(e, t) {
		let n = (this.#e[e] ?? "") + t;
		this.#e[e] = n;
		let r = new Blob([n], { type: "text/plain" }), i = document.createElement("a");
		i.href = URL.createObjectURL(r), i.download = e, i.click(), URL.revokeObjectURL(i.href);
	}
};
//#endregion
export { i as SysWeb };

//# sourceMappingURL=web.js.map