import { r as e } from "./rolldown-runtime.js";
import { n as t, r as n, t as r } from "./CmnLib.js";
//#region src/sn/localStore.ts
var i = {
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
var a = "skynovel", o = class {
	hPlg;
	arg;
	constructor(e = {}, t) {
		this.hPlg = e, this.arg = t;
	}
	async loaded(...[e]) {
		let t = e.snsys_pre;
		delete e.snsys_pre, await t?.init({
			getInfo: () => ({ window: {
				width: r.stageW,
				height: r.stageH
			} }),
			addTag: () => {},
			addLayCls: () => {},
			searchPath: () => "",
			getVal: () => void 0,
			resume: () => {},
			render: () => {},
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
		}), document.head.insertAdjacentHTML("beforeend", "<style type=\"text/css\">\n	body {\n		background-color: black;\n	}\n	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n</style>"), await this.run();
	}
	cfg;
	setMain(e) {
		this.cfg = e;
	}
	scrMng;
	#e;
	#t;
	async run() {
		let [{ createRoot: t }, { initMain: n }, { Config: r }, { ScriptMng: i }, { setFetch: o, setDecFncs: s }, { resetStore: c }] = await Promise.all([
			import("./client.js").then((t) => /* @__PURE__ */ e(t.default, 1)),
			import("./Main.js").then((e) => e.t),
			import("./Config.js"),
			import("./ScriptMng.js"),
			import("./Sprite.js").then((e) => e.t),
			import("./store.js")
		]);
		o((e, t) => this.fetch(e, t)), s((e, t) => this.dec(e, t), (e) => this.decAB(e), this.arg.crypto), this.#e && (this.scrMng?.destroy(), this.#e.unmount(), c());
		let l = await r.generate(this);
		this.setMain(l), document.body.style.backgroundColor = String(l.oCfg.init.bg_color);
		let u = this.#t ??= document.getElementById(a) ?? (() => {
			let e = document.createElement("div");
			return e.id = a, document.body.appendChild(e), e;
		})(), d = new i(this);
		this.scrMng = d, this.#e = t(u), n(this.#e, {
			heStage: u,
			sys: this,
			scrMng: d
		}, () => queueMicrotask(() => d.load("main")));
	}
	async stop() {
		if (!this.#e) return;
		this.scrMng?.destroy(), this.#e.unmount(), this.#e = void 0, this.scrMng = void 0;
		let { resetStore: e } = await import("./store.js");
		e();
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
	decAB = (e) => Promise.resolve(e);
	enc = (e) => Promise.resolve(e);
	fetch = (e, t) => fetch(e, t);
	hash = (e) => "";
	async appendFile(e, t) {}
	get crypto() {
		return this.arg.crypto;
	}
	async storeLoad(e) {
		let t = (t) => `skynovel.${e} - ${t}${this.arg.crypto ? "_enc" : ""}`, n = i.get(t("sys"));
		if (n !== void 0) return {
			sys: n,
			mark: i.get(t("mark")) ?? {},
			kidoku: i.get(t("kidoku")) ?? {},
			storage: i.get(t("storage")) ?? {}
		};
	}
	storeFlush(e, t) {
		let n = (t) => `skynovel.${e} - ${t}${this.arg.crypto ? "_enc" : ""}`;
		return i.set(n("sys"), t.sys), i.set(n("mark"), t.mark), i.set(n("kidoku"), t.kidoku), i.set(n("storage"), t.storage), Promise.resolve();
	}
	close() {}
	window(e) {}
	updateCheck(e) {}
	async capturePage(e, t, n, r) {
		return "";
	}
}, s = class {
	layname = "";
	name_ = "";
	set name(e) {
		this.name_ = e;
	}
	get name() {
		return this.name_;
	}
	ctn = {};
	destroy() {}
	lay(e) {
		return !1;
	}
	clearLay(e) {}
	record() {
		return {
			name: this.layname,
			idx: 0
		};
	}
	playback(e, t) {}
	dump() {
		return "";
	}
	static setXY(e, t, n, r = !1, i = !1) {}
}, c = class extends o {
	#e;
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t);
		let n = t.cur.split("/");
		this.#e = n.length > 2 ? n.slice(0, -2).join("/") + "/" : "", queueMicrotask(async () => this.loaded(e, t));
	}
	async loaded(...[e, t]) {
		if (await super.loaded(e, t), document.querySelectorAll("[data-prj]").forEach((e) => {
			let t = e.attributes.getNamedItem("data-prj");
			t && e.addEventListener("click", () => {
				this.runSN(t.value);
			}, { passive: !0 });
		}), document.querySelectorAll("[data-reload]").forEach((e) => e.addEventListener("click", () => {
			this.run();
		}, { passive: !0 })), !this.cfg.oCfg.debug.devtool) {
			let { initDevToolsGuard: e } = await import("./DevToolsGuard.js");
			e();
		}
	}
	#t = ":";
	async runSN(e) {
		this.arg.cur = this.#e + e + "/", !(this.#t === this.arg.cur && this.scrMng) && (this.#t = this.arg.cur, await this.run());
	}
	#n = {};
	async appendFile(e, t) {
		let n = (this.#n[e] ?? "") + t;
		this.#n[e] = n;
		let r = new Blob([n], { type: "text/plain" }), i = document.createElement("a");
		i.href = URL.createObjectURL(r), i.download = e, i.click(), URL.revokeObjectURL(i.href);
	}
};
//#endregion
export { s as Layer, c as SysWeb, t as argChk_Boolean, n as argChk_Num };

//# sourceMappingURL=web.js.map