import { i as e, s as t, t as n } from "./CmnLib.js";
//#region src/sn/ConfigBase.ts
var r = /* @__PURE__ */ function(e) {
	return e.DEFAULT = "", e.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", e.SCRIPT = "sn|ssn", e.FONT = "woff2|woff|otf|ttf", e.SOUND = "mp3|m4a|ogg|aac|flac|wav", e.HTML = "htm|html", e.CSS = "css", e.SN = "sn", e.TST_PNGPNG_ = "png|png_", e.TST_HH = "hh", e.TST_EEE = "eee", e.TST_GGG = "ggg", e.TST_PNGXML = "png|xml", e;
}({});
function i() {
	return {
		save_ns: "",
		window: {
			width: 300,
			height: 300
		},
		book: {
			title: "",
			creator: "",
			cre_url: "",
			publisher: "",
			pub_url: "",
			detail: "",
			version: "1.0"
		},
		log: { max_len: 64 },
		init: {
			bg_color: "#000000",
			tagch_msecwait: 10,
			auto_msecpagewait: 3500,
			escape: ""
		},
		debug: {
			devtool: !1,
			dumpHtm: !1,
			token: !1,
			tag: !1,
			putCh: !1,
			debugLog: !1,
			baseTx: !1,
			masume: !1,
			variable: !1
		},
		code: {},
		debuger_token: ""
	};
}
var a = class {
	sys;
	oCfg = i();
	userFnTail = "";
	hPathFn2Exts = {};
	constructor(e) {
		this.sys = e;
	}
	async load(e) {
		this.oCfg.save_ns = e.save_ns ?? this.oCfg.save_ns, e.window ??= {
			width: 300,
			height: 300
		}, this.oCfg.window.width = e.window.width, this.oCfg.window.height = e.window.height, this.oCfg.book = {
			...this.oCfg.book,
			...e.book
		}, this.oCfg.log.max_len = e.log?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = {
			...this.oCfg.init,
			...e.init
		}, this.oCfg.debug = {
			...this.oCfg.debug,
			...e.debug
		}, this.oCfg.debuger_token = e.debuger_token;
		let t = this.sys.arg.cur + "path.json", n = await this.sys.fetch(t);
		if (!n.ok) throw Error(n.statusText);
		let r = await n.text(), i = JSON.parse(await this.sys.dec(t, r));
		for (let [e, t] of Object.entries(i)) {
			let n = this.hPathFn2Exts[e] = t;
			for (let [e, t] of Object.entries(n)) e !== ":cnt" && (n[e] = this.sys.arg.cur + t);
		}
		if (this.#e = this.matchPath("^breakline$", "png|jpg|jpeg|json|svg|webp|mp4|webm").length > 0, this.#t = this.matchPath("^breakpage$", "png|jpg|jpeg|json|svg|webp|mp4|webm").length > 0, this.sys.arg.crypto) for (let e of Object.values(this.hPathFn2Exts)) for (let [t, n] of Object.entries(e)) {
			if (!t.startsWith(":") || !t.endsWith(":id")) continue;
			let r = n.slice(n.lastIndexOf("/") + 1), i = e[t.slice(0, -10)] ?? "", a = await (await this.sys.fetch(i)).text();
			if (r !== this.sys.hash(a)) throw `ファイル改竄エラーです fn:${i}`;
		}
	}
	#e = !1;
	get existsBreakline() {
		return this.#e;
	}
	#t = !1;
	get existsBreakpage() {
		return this.#t;
	}
	get headNs() {
		return `skynovel.${this.oCfg.save_ns} - `;
	}
	#n = /([^/\s]+)\.([^\d]\w+)/;
	searchPath(e, n = "") {
		if (!e) throw "[searchPath] fnが空です";
		if (e.startsWith("http://")) return e;
		let r = e.match(this.#n), i = r ? r[1] ?? "" : e, a = r ? r[2] : "";
		if (this.userFnTail) {
			let e = i + "@@" + this.userFnTail;
			if (e in this.hPathFn2Exts) {
				if (n === "") i = e;
				else for (let t of Object.keys(this.hPathFn2Exts[e] ?? {})) if (`|${n}|`.includes(`|${t}|`)) {
					i = e;
					break;
				}
			}
		}
		let o = this.hPathFn2Exts[i];
		if (!o) throw `サーチパスに存在しないファイル【${e}】です`;
		if (!a) {
			let r = t(o[":cnt"]);
			if (n === "") {
				if (r > 1) throw `指定ファイル【${e}】が複数マッチします。サーチ対象拡張子群【${n}】で絞り込むか、ファイル名を個別にして下さい。`;
				return e;
			}
			let i = `|${n}|`;
			if (r > 1) {
				let t = 0;
				for (let r of Object.keys(o)) if (i.includes(`|${r}|`) && ++t > 1) throw `指定ファイル【${e}】が複数マッチします。サーチ対象拡張子群【${n}】で絞り込むか、ファイル名を個別にして下さい。`;
			}
			for (let [e, t] of Object.entries(o)) if (i.includes(`|${e}|`)) return t;
			throw `サーチ対象拡張子群【${n}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${e}】`;
		}
		if (n !== "" && !`|${n}|`.includes(`|${a}|`)) throw `指定ファイルの拡張子【${a}】は、サーチ対象拡張子群【${n}】にマッチしません。探索ファイル名=【${e}】`;
		let s = o[a];
		if (!s) throw `サーチパスに存在しない拡張子【${a}】です。探索ファイル名=【${e}】、サーチ対象拡張子群【${n}】`;
		return s;
	}
	matchPath(e, t = "") {
		let n = [], r = new RegExp(e), i = new RegExp(t);
		for (let [e, a] of Object.entries(this.hPathFn2Exts)) {
			if (e.search(r) === -1) continue;
			if (t === "") {
				n.push(a);
				continue;
			}
			let o = {}, s = !1;
			for (let t of Object.keys(a)) t.search(i) !== -1 && (o[t] = e, s = !0);
			s && n.push(o);
		}
		return n;
	}
	addPath(e, t) {
		let n = {};
		for (let [e, r] of Object.entries(t)) n[e] = (e.startsWith(":") ? "" : this.sys.arg.cur) + String(r);
		this.hPathFn2Exts[e] = n;
	}
}, o = "userdata:/", s = "downloads:/", c = class t extends a {
	sys;
	static async generate(e) {
		let n = new t(e), r = e.arg.cur + "prj.json", i = await e.fetch(r);
		if (!i.ok) throw Error(i.statusText);
		let a = await e.dec(r, await i.text());
		return await n.load(JSON.parse(a)), n;
	}
	constructor(e) {
		super(e), this.sys = e;
	}
	async load(t) {
		t.window ??= {
			width: 300,
			height: 300
		}, n.stageW = t.window.width, n.stageH = t.window.height, n.debugLog = t.debug.debugLog, n.masume = t.debug.masume, n.init(), await super.load(t), n.bgColor = e(this.oCfg.init.bg_color);
	}
	searchPath(e, t = r.DEFAULT) {
		return e.startsWith("downloads:/") ? this.sys.path_downloads + e.slice(11) : e.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + e.slice(10) : super.searchPath(e, t);
	}
};
//#endregion
export { c as Config, s as PROTOCOL_DL, o as PROTOCOL_USERDATA, r as t };

//# sourceMappingURL=Config.js.map