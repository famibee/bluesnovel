import { BrowserWindow as e, app as t, dialog as n, ipcMain as r, net as i, protocol as a, screen as o, shell as s } from "electron";
import c from "fs-extra";
import l from "electron-store";
import u from "adm-zip";
import { pathToFileURL as d } from "node:url";
import { resolve as f } from "node:path";
//#region src/appMain_cmn.ts
var { appendFile: p, copy: m, ensureFile: h, existsSync: g, outputFile: _, remove: v, writeFile: y, readFile: b, ensureDir: x } = c, S = class e {
	bw;
	version;
	static init(t) {
		e.#e = t, l.initRenderer();
	}
	static #e;
	#t;
	#n = {
		getAppPath: t.getAppPath(),
		isPackaged: t.isPackaged,
		downloads: t.getPath("downloads"),
		userData: t.getPath("userData"),
		getVersion: "",
		homepage: "",
		env: { ...process.env },
		platform: process.platform,
		arch: process.arch
	};
	#r = 0;
	#i = 0;
	#a = 0;
	#o = 0;
	constructor(t, r, i = "") {
		this.bw = t, this.version = r;
		let a = e.#e;
		this.#t = process.platform === "win32", t.webContents.on("devtools-opened", () => this.#l()), a.handle("openDevTools", () => t.webContents.openDevTools()), this.#n.getVersion = r, this.#n.homepage = i, a.handle("getInfo", () => this.#n), a.handle("inited", (e, t, n) => this.#s(t, n)), a.handle("fetch", async (e, t) => {
			let n = await fetch(t, { cache: "no-store" });
			return {
				ok: n.ok,
				txt: await n.text()
			};
		}), a.handle("fetchAb", async (e, t) => {
			let n = await fetch(t, { cache: "no-store" });
			return {
				ok: n.ok,
				ab: await n.arrayBuffer()
			};
		}), a.handle("existsSync", (e, t) => g(t)), a.handle("copy", (e, t, n) => m(t, n)), a.handle("remove", (e, t) => v(t)), a.handle("ensureFile", (e, t) => h(t)), a.handle("readFile", (e, t, n) => b(t, n)), a.handle("writeFile", (e, t, n, r) => y(t, n, r)), a.handle("appendFile", (e, t, n) => p(t, n).catch((e) => console.error(e))), a.handle("outputFile", (e, t, n) => _(t, n).catch((e) => console.error(e))), a.handle("win_close", () => t.close()), a.handle("win_setTitle", (e, n) => t.setTitle(n)), a.handle("showMessageBox", (e, r) => n.showMessageBox(t, r)), a.handle("showOpenDialog", (e, r) => n.showOpenDialog(t, r)), a.handle("capturePage", async (e, n, r, i, a) => {
			let o = (await t.webContents.capturePage(n)).resize({
				width: r,
				height: i,
				quality: "best"
			});
			return a === "image/jpeg" ? `data:image/jpeg;base64,${o.toJPEG(80).toString("base64")}` : o.toDataURL();
		}), a.handle("navigate_to", (e, t) => s.openExternal(t));
		let o;
		a.handle("Store", (e, t) => {
			o = new l(t);
		}), a.handle("flush", (e, t) => {
			o.store = t;
		}), a.handle("Store_isEmpty", () => o.size === 0), a.handle("Store_get", () => o.store), a.handle("zip", async (e, t, n) => {
			let r = new u();
			r.addLocalFolder(t), await r.writeZipPromise(n);
		}), a.handle("unzip", async (e, t, n) => {
			await v(n), await x(n), new u(t).extractAllTo(n, !0);
		}), a.handle("isSimpleFullScreen", () => t.simpleFullScreen), this.#t ? (a.handle("setSimpleFullScreen", (e, n) => {
			this.#p = () => {}, t.setSimpleFullScreen(n), n || (t.setPosition(this.#r, this.#i), t.setContentSize(this.#a, this.#o)), this.#p = () => this.#m();
		}), t.on("enter-full-screen", () => {
			this.#p = () => {}, t.setContentSize(this.#d.width, this.#d.height), this.#p = () => this.#m();
		}), t.on("leave-full-screen", () => {
			this.#g(!1, this.#r, this.#i, this.#a, this.#o);
		})) : a.handle("setSimpleFullScreen", (e, n) => {
			t.setSimpleFullScreen(n), !n && t.setContentSize(this.#a, this.#o);
		}), a.handle("window", (e, t, n, r, i, a) => this.#g(t, n, r, i, a)), t.on("move", () => this.#p()), t.on("resize", () => this.#p()), this.#u();
	}
	#s(e, t) {
		let { width: n, height: r } = e.window, { c: i, x: a, y: o, w: s } = t;
		this.#c = n / r;
		let c = s === n ? r : s / this.#c;
		if (this.#t || this.bw.setAspectRatio(this.#c), this.#g(i, a, o, s, c), this.bw.show(), this.#p = () => this.#m(), e.debug.devtool) {
			this.#l = () => {}, this.openDevTools = () => this.bw.webContents.openDevTools({ mode: "detach" }), this.openDevTools();
			return;
		}
		this.#l = () => {
			this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.sendShutdown();
		};
	}
	#c = 0;
	#l = () => this.bw.webContents.closeDevTools();
	#u() {
		let e = o.getCursorScreenPoint(), t = o.getDisplayNearestPoint(e);
		this.#d = t.workAreaSize;
	}
	#d;
	#f(e, t, n, r) {
		return o.getAllDisplays().some(({ bounds: i }) => e >= i.x && t >= i.y && e + n <= i.x + i.width && t + r <= i.y + i.height);
	}
	#p = () => {};
	#m() {
		if (this.#h) return;
		this.#p = () => {};
		let [e, t] = this.bw.getPosition(), [n, r] = this.bw.getContentSize();
		this.#h = setTimeout(() => {
			this.#h = void 0;
			let [i = 0, a = 0] = this.bw.getPosition(), [o = 0, s = 0] = this.bw.getContentSize();
			if (e !== i || t !== a || n !== o || r !== s) {
				this.#m();
				return;
			}
			this.#p = () => this.#m();
			let c = o, l = s;
			this.#t && (n === o ? l = o / this.#c : c = s * this.#c), this.#g(!1, i, a, c, l);
		}, 1e3 / 60 * 10);
	}
	#h = void 0;
	#g(e, t, n, r, i) {
		if (this.bw.simpleFullScreen) return;
		console.log(`fn:appMain.ts window c:${String(e)} (${String(t)},${String(n)},${String(r)},${String(i)}) scr(${String(this.#d.width)},${String(this.#d.height)})`), !e && !this.#f(t, n, r, i) && (e = !0), this.#p = () => {};
		let a = this.#r = Math.round(e ? (this.#d.width - r) * .5 : t), o = this.#i = Math.round(e ? (this.#d.height - i) * .5 : n);
		this.bw.setPosition(a, o);
		let s = this.#a = Math.round(r), c = this.#o = Math.round(i);
		this.bw.setContentSize(s, c), e || this.#u(), this.sendSaveWinInf({
			x: a,
			y: o,
			w: s,
			h: c
		}), this.#p = () => this.#m();
	}
	sendShutdown() {}
	sendSaveWinInf(e) {}
	openDevTools = () => {};
}, C = class {
	#e = [];
	#t = [];
	on(e, t) {
		this.#e.push(e), r.on(e, t);
	}
	handle(e, t) {
		this.#t.push(e), r.handle(e, t);
	}
	dispose() {
		this.#e.forEach((e) => r.removeAllListeners(e)), this.#e = [], this.#t.forEach((e) => r.removeHandler(e)), this.#t = [];
	}
}, w = class {
	send(e, t, ...n) {
		e.send(t, ...n);
	}
}, T = class t extends S {
	static registerScheme(e = "app") {
		a.registerSchemesAsPrivileged([{
			scheme: e,
			privileges: {
				standard: !0,
				secure: !0,
				supportFetchAPI: !0,
				stream: !0
			}
		}]);
	}
	static handleScheme(e, t = "app") {
		a.handle(t, (t) => {
			let { pathname: n } = new URL(t.url), r = f(e, decodeURIComponent(n).replace(/^\/+/, ""));
			return r !== e && !r.startsWith(e + "/") ? new Response("Forbidden", { status: 403 }) : i.fetch(d(r).toString());
		});
	}
	static initRenderer(n, r, i = "") {
		let a, o = () => {};
		try {
			S.init(new C()), a = new e({
				show: !1,
				minWidth: 300,
				minHeight: 300,
				acceptFirstMouse: !0,
				maximizable: !1,
				webPreferences: {
					preload: n,
					sandbox: !1
				}
			});
			let s = new t(a, r, i);
			o = () => s.openDevTools();
		} catch (e) {
			throw console.error(`early err:${String(e)}`), o(), "initRenderer error";
		}
		return a;
	}
	#e = new w();
	sendShutdown() {
		this.#e.send(this.bw.webContents, "shutdown");
	}
	sendSaveWinInf(e) {
		this.#e.send(this.bw.webContents, "save_win_inf", e);
	}
};
//#endregion
export { T as appMain };

//# sourceMappingURL=appMain.js.map