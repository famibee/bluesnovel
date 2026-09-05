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
try {
	window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
} catch {}
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
		}), await this.run();
	}
	cfg;
	setMain(e) {
		this.cfg = e;
	}
	scrMng;
	titleSub(e) {}
	#e;
	#t;
	async run() {
		let [{ createRoot: t }, { initMain: n }, { Config: i }, { ScriptMng: o }, { setFetch: s, setDecFncs: c }, { resetStore: l }] = await Promise.all([
			import("./client.js").then((t) => /* @__PURE__ */ e(t.default, 1)),
			import("./Main.js").then((e) => e.t),
			import("./Config.js"),
			import("./ScriptMng.js"),
			import("./Sprite.js").then((e) => e.t),
			import("./store.js")
		]);
		s((e, t) => this.fetch(e, t)), c((e, t) => this.dec(e, t), (e) => this.decAB(e), this.arg.crypto), this.#e && (this.scrMng?.destroy(), this.#e.unmount(), l());
		let u;
		try {
			u = await i.generate(this);
		} catch (e) {
			console.error("SysBase.run err e:%o", e), this.titleSub(e instanceof Error ? e.message : String(e));
			return;
		}
		this.setMain(u);
		let d = document.getElementById(a), f = this.#t ??= d instanceof HTMLCanvasElement ? (() => {
			let e = document.createElement("div");
			return e.id = a, e.className = d.className, d.replaceWith(e), e;
		})() : d ?? (() => {
			let e = document.createElement("div");
			return e.id = a, document.body.appendChild(e), e;
		})();
		f.parentElement === document.body && (document.body.style.backgroundColor = r.bgColor);
		let p = new o(this);
		this.scrMng = p, await this.#r(), this.#e = t(f), n(this.#e, {
			heStage: f,
			sys: this,
			scrMng: p
		}, () => queueMicrotask(() => p.load("main")));
	}
	#n = !1;
	async #r() {
		if (this.#n) return;
		this.#n = !0;
		let e = Object.values(this.hPlg);
		if (e.length === 0) return;
		let [{ addLayCls: t }, { ScriptEngine: n }] = await Promise.all([import("./LayCls.js").then((e) => e.t), import("./ScriptEngine.js")]);
		await Promise.all(e.map((e) => e.init({
			getInfo: () => ({ window: {
				width: r.stageW,
				height: r.stageH
			} }),
			addTag: (e, t) => n.registerPlgTag(e, t),
			addLayCls: t,
			searchPath: (e, t) => this.cfg.searchPath(e, t),
			getVal: (e, t) => this.scrMng?.getVal(e, t) ?? t,
			resume: () => {
				this.scrMng?.resumePlg();
			},
			render: () => {},
			setDec: () => {},
			setDecAB: () => {},
			setEnc: () => {},
			getHash: () => {}
		})));
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
	ctn = document.createElement("div");
	destroy() {
		this.ctn.remove();
	}
	lay(e) {
		return !1;
	}
	clearLay(e) {}
	setActive(e) {}
	record() {
		return {
			name: this.layname,
			idx: 0
		};
	}
	playback(e, t) {}
	copy(e, t) {
		let n = this.name_;
		this.playback(e.record(), t), this.name = n;
	}
	dump() {
		return "";
	}
}, c = class extends s {
	static setup(...e) {}
	get htm() {
		return this.ctn;
	}
	snapshot(e, t) {
		t();
	}
	snapshot_end() {}
	snapshotByCanvas(e, t, n) {
		n();
	}
}, l = class extends o {
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
		let n = new URLSearchParams(location.search).get("cur");
		if (n && (t.cur = this.#e + n + "/"), await super.loaded(e, t), document.querySelectorAll("[data-prj]").forEach((e) => {
			let t = e.attributes.getNamedItem("data-prj");
			t && e.addEventListener("click", () => {
				this.runSN(t.value);
			}, { passive: !0 });
		}), document.querySelectorAll("[data-reload]").forEach((e) => e.addEventListener("click", () => {
			this.run();
		}, { passive: !0 })), this.cfg && !this.cfg.oCfg.debug.devtool) {
			let { initDevToolsGuard: e } = await import("./DevToolsGuard.js");
			e();
		}
	}
	titleSub(e) {
		document.title = e, document.querySelectorAll("[data-title]").forEach((t) => {
			t.textContent = e;
		});
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
export { s as Layer, c as PlgLayer, l as SysWeb, t as argChk_Boolean, n as argChk_Num };

//# sourceMappingURL=web.js.map