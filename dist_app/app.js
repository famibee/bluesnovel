import { r as e } from "./rolldown-runtime.js";
import { t } from "./CmnLib.js";
import { n } from "./SaveMng.js";
//#region src/sn/localStore.ts
var r = {
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
var i = "skynovel", a = class {
	hPlg;
	arg;
	constructor(e = {}, t) {
		this.hPlg = e, this.arg = t;
	}
	async loaded(...[e]) {
		let n = e.snsys_pre;
		delete e.snsys_pre, await n?.init({
			getInfo: () => ({ window: {
				width: t.stageW,
				height: t.stageH
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
	#e;
	#t;
	async run() {
		let [{ createRoot: n }, { initMain: r }, { Config: a }, { ScriptMng: o }, { setFetch: s, setDecFncs: c }, { resetStore: l }] = await Promise.all([
			import("./client.js").then((t) => /* @__PURE__ */ e(t.default, 1)),
			import("./Main.js").then((e) => e.t),
			import("./Config.js"),
			import("./ScriptMng.js"),
			import("./Sprite.js").then((e) => e.t),
			import("./store.js")
		]);
		s((e, t) => this.fetch(e, t)), c((e, t) => this.dec(e, t), (e) => this.decAB(e), this.arg.crypto), this.#e && (this.scrMng?.destroy(), this.#e.unmount(), l());
		let u = await a.generate(this);
		this.setMain(u);
		let d = document.getElementById(i), f = this.#t ??= d instanceof HTMLCanvasElement ? (() => {
			let e = document.createElement("div");
			return e.id = i, e.className = d.className, d.replaceWith(e), e;
		})() : d ?? (() => {
			let e = document.createElement("div");
			return e.id = i, document.body.appendChild(e), e;
		})();
		f.parentElement === document.body && (document.body.style.backgroundColor = t.bgColor);
		let p = new o(this);
		this.scrMng = p, await this.#r(p), this.#e = n(f), r(this.#e, {
			heStage: f,
			sys: this,
			scrMng: p
		}, () => queueMicrotask(() => p.load("main")));
	}
	#n = !1;
	async #r(e) {
		if (this.#n) return;
		this.#n = !0;
		let n = Object.values(this.hPlg);
		if (n.length === 0) return;
		let [{ addLayCls: r }, { ScriptEngine: i }] = await Promise.all([import("./LayCls.js").then((e) => e.t), import("./ScriptEngine.js")]);
		await Promise.all(n.map((n) => n.init({
			getInfo: () => ({ window: {
				width: t.stageW,
				height: t.stageH
			} }),
			addTag: (e, t) => i.registerPlgTag(e, t),
			addLayCls: r,
			searchPath: (e, t) => this.cfg.searchPath(e, t),
			getVal: (t, n) => e.getVal(t, n),
			resume: () => {
				e.resumePlg();
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
		let t = (t) => `skynovel.${e} - ${t}${this.arg.crypto ? "_enc" : ""}`, n = r.get(t("sys"));
		if (n !== void 0) return {
			sys: n,
			mark: r.get(t("mark")) ?? {},
			kidoku: r.get(t("kidoku")) ?? {},
			storage: r.get(t("storage")) ?? {}
		};
	}
	storeFlush(e, t) {
		let n = (t) => `skynovel.${e} - ${t}${this.arg.crypto ? "_enc" : ""}`;
		return r.set(n("sys"), t.sys), r.set(n("mark"), t.mark), r.set(n("kidoku"), t.kidoku), r.set(n("storage"), t.storage), Promise.resolve();
	}
	close() {}
	window(e) {}
	updateCheck(e) {}
	async capturePage(e, t, n, r) {
		return "";
	}
};
//#endregion
//#region src/UpdateCheck.ts
async function o(e, t) {
	let n = await t.fetchText(e + "_index.json"), r = {
		title: "アプリ更新",
		icon: t.iconPath,
		buttons: ["OK", "Cancel"],
		defaultId: 0,
		cancelId: 1,
		message: `アプリ【${t.bookTitle}】に更新があります。\nダウンロードしますか？`
	};
	n.ok ? await s(n.txt, e, r, t) : await c(e, r, t);
}
async function s(e, t, n, r) {
	let i = JSON.parse(e);
	if (!await l(i.version, n, r)) return;
	let a = r.platform + "_" + r.arch, o = i[a];
	if (o && typeof o == "object") {
		let { cn: e, path: i } = o;
		await u(t, a + "-" + e, i, r), await d(n, r);
		return;
	}
	let s = "", c = RegExp("^" + r.platform + "_"), f = Object.entries(i).flatMap(([e, n]) => {
		if (typeof n != "object" || !c.test(e)) return [];
		let { path: i, cn: a } = n;
		return s += "\n- " + i, [u(t, e + "-" + a, i, r)];
	});
	n.message = `CPU = ${r.arch}\nに対応するファイルが見つかりません。同じOSのファイルをすべてダウンロードしますか？`, n.detail = `${String(f.length)} 個ファイルがあります` + s;
	let { response: p } = await r.showMessageBox(n);
	p > 0 || (await Promise.allSettled(f), await d(n, r));
}
async function c(e, t, n) {
	let r = await n.fetchText(e + `latest${n.isMac ? "-mac" : ""}.yml`);
	if (!r.ok) {
		if (n.debugLog) throw "[update_check] .ymlが見つかりません";
		return;
	}
	let i = r.txt, a = /version: (.+)/.exec(i)?.[1];
	if (!a) throw "[update_check] .yml に version が見つかりません";
	if (!await l(a, t, n)) return;
	let o = /path: (.+)/.exec(i);
	if (!o) throw "[update_check] path が見つかりません";
	let [, s] = o;
	if (!s) throw "[update_check] path が見つかりません.";
	let [, c, f] = /(.+)(\.\w+)/.exec(s) ?? [
		"",
		"",
		""
	];
	await u(e, c + "-" + n.arch + f, s, n), await d(t, n);
}
async function l(e, t, n) {
	if (e === n.appVersion) return !1;
	t.detail = `現在 NOW ver ${n.appVersion}\n新規 NEW ver ${e}`;
	let { response: r } = await n.showMessageBox(t);
	return r === 0;
}
async function u(e, t, n, r) {
	let i = await r.fetchAb(e + t);
	i.ok && await r.writeFile(r.downloadsDir + "/" + n, new DataView(i.ab));
}
async function d(e, t) {
	e.buttons.pop(), e.message = `アプリ【${t.bookTitle}】の更新パッケージを\nダウンロードしました`, await t.showMessageBox(e);
}
//#endregion
//#region src/IpcRenderer.ts
var f = class {
	send(e, ...t) {
		window.electron.ipcRenderer.send(e, ...t);
	}
	invoke(e, ...t) {
		return window.electron.ipcRenderer.invoke(e, ...t);
	}
}, p = class {
	on(e, t) {
		return window.electron.ipcRenderer.on(e, t);
	}
	once(e, t) {
		return window.electron.ipcRenderer.once(e, t);
	}
}, m = class extends a {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), queueMicrotask(async () => this.loaded(e, t));
	}
	#e = new f();
	#t = new p();
	#n = {
		getAppPath: "",
		isPackaged: !1,
		downloads: "",
		userData: "",
		getVersion: "",
		env: {},
		platform: "",
		arch: ""
	};
	async loaded(...[e, t]) {
		let r = this.#n = await this.#e.invoke("getInfo");
		this.$path_downloads = r.downloads.replaceAll("\\", "/") + "/", this.$path_userdata = r.userData.replaceAll("\\", "/") + "/", this.#t.on("log", (e, t) => console.info("main: %o", t)), this.#t.on("fire", (e, t) => document.dispatchEvent(new KeyboardEvent("keydown", {
			key: t,
			bubbles: !0
		}))), this.#t.on("save_win_inf", (e, t) => document.dispatchEvent(new CustomEvent("sn_win_inf", { detail: t }))), await super.loaded(e, t);
		let { width: i, height: a } = this.cfg.oCfg.window, o = {
			c: !0,
			x: 0,
			y: 0,
			w: i,
			h: a
		};
		try {
			let e = await this.storeLoad(this.cfg.oCfg.save_ns), t = await n(this.dec, e?.sys), r = t?.["const.sn.nativeWindow.x"], i = t?.["const.sn.nativeWindow.y"], a = t?.["const.sn.nativeWindow.w"], s = t?.["const.sn.nativeWindow.h"];
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
	updateCheck(e) {
		o(e, {
			fetchText: (e) => this.#e.invoke("fetch", e),
			fetchAb: (e) => this.#e.invoke("fetchAb", e),
			writeFile: (e, t) => this.#e.invoke("writeFile", e, t),
			showMessageBox: (e) => this.#e.invoke("showMessageBox", e),
			downloadsDir: this.#n.downloads.replaceAll("\\", "/"),
			appVersion: this.#n.getVersion,
			platform: this.#n.platform,
			arch: this.#n.arch,
			iconPath: this.#n.getAppPath.replaceAll("\\", "/") + "/doc/icon.png",
			bookTitle: this.cfg.oCfg.book.title,
			isMac: t.isMac,
			debugLog: t.debugLog
		}).catch((e) => console.error(`[update_check] ${String(e)}`));
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
export { m as SysApp };

//# sourceMappingURL=app.js.map