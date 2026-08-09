//#region src/ts/SaveMng.ts
function e() {
	return {
		sys: {},
		mark: {},
		kidoku: {},
		storage: {}
	};
}
var t = ".swpd", n = class {
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
		return t ? (this.#e = t, !1) : (this.#e = e(), !0);
	}
	flush() {
		if (this.#t) {
			this.#n = !0;
			return;
		}
		this.#r(), this.#t = setTimeout(() => {
			this.#t = void 0, this.#n && (this.#n = !1, this.flush());
		}, 500);
	}
	#t;
	#n = !1;
	#r() {
		this.sys.storeFlush(this.ns, this.#e);
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
	export() {
		let e = new Blob([JSON.stringify(this.#e)], { type: "text/json" }), n = URL.createObjectURL(e), i = document.createElement("a");
		i.href = n, i.download = `no_crypto_${this.ns}${r()}${t}`, i.click(), URL.revokeObjectURL(n);
	}
	async import() {
		let e = await new Promise((e, n) => {
			let r = document.createElement("input");
			r.type = "file", r.accept = `${t}, text/plain`, r.onchange = () => {
				let t = r.files?.[0];
				t ? e(t) : n(/* @__PURE__ */ Error("ファイル選択に失敗しました"));
			}, r.click();
		}), n = JSON.parse(await e.text()), r = n.sys["const.sn.cfg.ns"];
		if (r !== this.ns) throw `別のゲーム【プロジェクト名=${String(r)}】のプレイデータです`;
		return n.storage ??= {}, this.#e = n, this.flush(), n;
	}
};
function r() {
	let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
	return `${String(e.getFullYear())}-${t(e.getMonth() + 1)}-${t(e.getDate())}_${t(e.getHours())}-${t(e.getMinutes())}-${t(e.getSeconds())}`;
}
//#endregion
export { n as t };

//# sourceMappingURL=SaveMng.js.map