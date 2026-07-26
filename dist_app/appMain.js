import { BrowserWindow as e, app as t, dialog as n, screen as r, shell as i } from "electron";
import a from "fs-extra";
import o from "electron-store";
import s from "adm-zip";
import { IpcEmitter as c, IpcListener as l } from "@electron-toolkit/typed-ipc/main";
//#region src/appMain_cmn.ts
var { appendFile: u, copy: d, ensureFile: f, existsSync: p, outputFile: m, remove: h, writeFile: g, readFile: _, ensureDir: v } = a, y = class e {
	bw;
	version;
	static init(t) {
		e.#e = t, o.initRenderer();
	}
	static #e;
	#t;
	#n = {
		getAppPath: t.getAppPath(),
		isPackaged: t.isPackaged,
		downloads: t.getPath("downloads"),
		userData: t.getPath("userData"),
		getVersion: "",
		env: { ...process.env },
		platform: process.platform,
		arch: process.arch
	};
	#r = 0;
	#i = 0;
	#a = 0;
	#o = 0;
	constructor(t, r) {
		this.bw = t, this.version = r;
		let a = e.#e;
		this.#t = process.platform === "win32", t.webContents.on("devtools-opened", () => this.#l()), a.handle("openDevTools", () => t.webContents.openDevTools()), this.#n.getVersion = r, a.handle("getInfo", () => this.#n), a.handle("inited", (e, t, n) => this.#s(t, n)), a.handle("fetch", async (e, t) => {
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
		}), a.handle("existsSync", (e, t) => p(t)), a.handle("copy", (e, t, n) => d(t, n)), a.handle("remove", (e, t) => h(t)), a.handle("ensureFile", (e, t) => f(t)), a.handle("readFile", (e, t, n) => _(t, n)), a.handle("writeFile", (e, t, n, r) => g(t, n, r)), a.handle("appendFile", (e, t, n) => u(t, n).catch((e) => console.error(e))), a.handle("outputFile", (e, t, n) => m(t, n).catch((e) => console.error(e))), a.handle("win_close", () => t.close()), a.handle("win_setTitle", (e, n) => t.setTitle(n)), a.handle("showMessageBox", (e, r) => n.showMessageBox(t, r)), a.handle("showOpenDialog", (e, r) => n.showOpenDialog(t, r)), a.handle("capturePage", (e, n, r, i) => t.webContents.capturePage().then(async (e) => {
			await f(n);
			let t = e.resize({
				width: r,
				height: i,
				quality: "best"
			});
			await g(n, n.endsWith(".png") ? t.toPNG() : t.toJPEG(80));
		})), a.handle("navigate_to", (e, t) => i.openExternal(t));
		let c;
		a.handle("Store", (e, t) => {
			c = new o(t);
		}), a.handle("flush", (e, t) => {
			c.store = t;
		}), a.handle("Store_isEmpty", () => c.size === 0), a.handle("Store_get", () => c.store), a.handle("zip", async (e, t, n) => {
			let r = new s();
			r.addLocalFolder(t), await r.writeZipPromise(n);
		}), a.handle("unzip", async (e, t, n) => {
			await h(n), await v(n), new s(t).extractAllTo(n, !0);
		}), a.handle("isSimpleFullScreen", () => t.simpleFullScreen), this.#t ? (a.handle("setSimpleFullScreen", (e, n) => {
			this.#f = () => {}, t.setSimpleFullScreen(n), n || (t.setPosition(this.#r, this.#i), t.setContentSize(this.#a, this.#o)), this.#f = () => this.#p();
		}), t.on("enter-full-screen", () => {
			this.#f = () => {}, t.setContentSize(this.#d.width, this.#d.height), this.#f = () => this.#p();
		}), t.on("leave-full-screen", () => {
			this.#h(!1, this.#r, this.#i, this.#a, this.#o);
		})) : a.handle("setSimpleFullScreen", (e, n) => {
			t.setSimpleFullScreen(n), !n && t.setContentSize(this.#a, this.#o);
		}), a.handle("window", (e, t, n, r, i, a) => this.#h(t, n, r, i, a)), t.on("move", () => this.#f()), t.on("resize", () => this.#f()), this.#u();
	}
	#s(e, t) {
		let { width: n, height: r } = e.window, { c: i, x: a, y: o, w: s } = t;
		this.#c = n / r;
		let c = s === n ? r : s / this.#c;
		if (this.#t || this.bw.setAspectRatio(this.#c), this.#h(i, a, o, s, c), this.bw.show(), this.#f = () => this.#p(), e.debug.devtool) {
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
		let e = r.getCursorScreenPoint(), t = r.getDisplayNearestPoint(e);
		this.#d = t.workAreaSize;
	}
	#d;
	#f = () => {};
	#p() {
		if (this.#m) return;
		this.#f = () => {};
		let [e, t] = this.bw.getPosition(), [n, r] = this.bw.getContentSize();
		this.#m = setTimeout(() => {
			this.#m = void 0;
			let [i = 0, a = 0] = this.bw.getPosition(), [o = 0, s = 0] = this.bw.getContentSize();
			if (e !== i || t !== a || n !== o || r !== s) {
				this.#p();
				return;
			}
			this.#f = () => this.#p();
			let c = o, l = s;
			this.#t && (n === o ? l = o / this.#c : c = s * this.#c), this.#h(!1, i, a, c, l);
		}, 1e3 / 60 * 10);
	}
	#m = void 0;
	#h(e, t, n, r, i) {
		if (this.bw.simpleFullScreen) return;
		console.log(`fn:appMain.ts window c:${String(e)} (${String(t)},${String(n)},${String(r)},${String(i)}) scr(${String(this.#d.width)},${String(this.#d.height)})`), this.#f = () => {};
		let a = this.#r = Math.round(e ? (this.#d.width - r) * .5 : t), o = this.#i = Math.round(e ? (this.#d.height - i) * .5 : n);
		this.bw.setPosition(a, o);
		let s = this.#a = Math.round(r), c = this.#o = Math.round(i);
		this.bw.setContentSize(s, c), e || this.#u(), this.sendSaveWinInf({
			x: a,
			y: o,
			w: s,
			h: c
		}), this.#f = () => this.#p();
	}
	sendShutdown() {}
	sendSaveWinInf(e) {}
	openDevTools = () => {};
}, b = class t extends y {
	static initRenderer(n, r) {
		let i, a = () => {};
		try {
			y.init(new l()), i = new e({
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
			let o = new t(i, r);
			a = () => o.openDevTools();
		} catch (e) {
			throw console.error(`early err:${String(e)}`), a(), "initRenderer error";
		}
		return i;
	}
	#e = new c();
	sendShutdown() {
		this.#e.send(this.bw.webContents, "shutdown");
	}
	sendSaveWinInf(e) {
		this.#e.send(this.bw.webContents, "save_win_inf", e);
	}
};
//#endregion
export { b as appMain };

//# sourceMappingURL=appMain.js.map