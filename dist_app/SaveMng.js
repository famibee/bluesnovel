//#region src/ts/SaveMng.ts
function e() {
	return {
		sys: {},
		mark: {},
		kidoku: {},
		storage: {}
	};
}
var t = ".swpd";
async function n(e, t) {
	return t === void 0 ? void 0 : typeof t == "string" ? JSON.parse(await e("json", t)) : t;
}
var r = class {
	sys;
	ns;
	#e = e();
	get data() {
		return this.#e;
	}
	constructor(e, t) {
		this.sys = e, this.ns = t;
	}
	async load() {
		let t = await this.sys.storeLoad(this.ns);
		if (!t) return this.#e = e(), !0;
		try {
			this.#e = this.sys.crypto ? await this.#t(t) : t;
		} catch {
			return this.#e = e(), !0;
		}
		return !1;
	}
	async #t(e) {
		let t = (e) => n(this.sys.dec, e);
		return {
			sys: await t(e.sys),
			mark: await t(e.mark),
			kidoku: await t(e.kidoku),
			storage: await t(e.storage)
		};
	}
	flush() {
		if (this.#n) {
			this.#r = !0;
			return;
		}
		this.#a(), this.#n = setTimeout(() => {
			this.#n = void 0, this.#r && (this.#r = !1, this.flush());
		}, 500);
	}
	#n;
	#r = !1;
	flushed() {
		return this.#i;
	}
	#i = Promise.resolve();
	#a() {
		let e = JSON.stringify(this.#e.sys), t = JSON.stringify(this.#e.mark), n = JSON.stringify(this.#e.kidoku), r = JSON.stringify(this.#e.storage), { crypto: i } = this.sys;
		this.#i = this.#i.then(async () => {
			let a = i ? {
				sys: await this.sys.enc(e),
				mark: await this.sys.enc(t),
				kidoku: await this.sys.enc(n),
				storage: await this.sys.enc(r)
			} : {
				sys: JSON.parse(e),
				mark: JSON.parse(t),
				kidoku: JSON.parse(n),
				storage: JSON.parse(r)
			};
			await this.sys.storeFlush(this.ns, a);
		}).catch((e) => console.error("SaveMng #write failed:", e));
	}
	getFile(e) {
		return this.#e.storage[e];
	}
	putFile(e, t) {
		this.#e.storage[e] = t, this.flush();
	}
	getMark(e) {
		return this.#e.mark[String(e)];
	}
	setMark(e, t) {
		this.#e.mark[String(e)] = t, this.flush();
	}
	eraseMark(e) {
		delete this.#e.mark[String(e)], this.flush();
	}
	copyMark(e, t) {
		let n = this.getMark(e);
		if (!n) throw `from:${String(e)} のセーブデータは存在しません`;
		this.setMark(t, { ...n });
	}
	bookmarkJson() {
		return JSON.stringify(Object.entries(this.#e.mark).map(([e, t]) => ({
			...t.json,
			place: Number(e)
		})));
	}
	async export() {
		let { crypto: e, enc: n } = this.sys, r = JSON.stringify(this.#e), a = new Blob([e ? await n(r) : r], { type: "text/json" }), o = URL.createObjectURL(a), s = document.createElement("a");
		s.href = o, s.download = `${e ? "" : "no_crypto_"}${this.ns}${i()}${t}`, s.click(), URL.revokeObjectURL(o);
	}
	async import() {
		let e = await (await new Promise((e, n) => {
			let r = document.createElement("input");
			r.type = "file", r.accept = `${t}, text/plain`, r.onchange = () => {
				let t = r.files?.[0];
				t ? e(t) : n(/* @__PURE__ */ Error("ファイル選択に失敗しました"));
			}, r.click();
		})).text(), n = await (async () => {
			try {
				return JSON.parse(e);
			} catch {
				return JSON.parse(await this.sys.dec("json", e));
			}
		})(), r = n.sys["const.sn.cfg.ns"];
		if (r !== this.ns) throw `別のゲーム【プロジェクト名=${String(r)}】のプレイデータです`;
		return n.storage ??= {}, this.#e = n, this.flush(), n;
	}
};
function i() {
	let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
	return `${String(e.getFullYear())}-${t(e.getMonth() + 1)}-${t(e.getDate())}_${t(e.getHours())}-${t(e.getMinutes())}-${t(e.getSeconds())}`;
}
//#endregion
export { n, r as t };

//# sourceMappingURL=SaveMng.js.map