import { n as e, r as t } from "./ConfigBase.js";
//#region src/ts/ScriptEngine.ts
var n = class e {
	fn;
	static RE_TOKEN = /\[[^\]]*\]|\r\n|\n|[^\[\r\n]+/g;
	static tokenize(e) {
		return e.match(this.RE_TOKEN) ?? [];
	}
	static RE_ARG = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;
	static parseTag(e) {
		let t = e.slice(1, -1).trim(), n = t.search(/\s/), r = n === -1 ? t : t.slice(0, n), i = {};
		if (n !== -1) {
			let e = t.slice(n + 1);
			this.RE_ARG.lastIndex = 0;
			let r;
			for (; r = this.RE_ARG.exec(e);) i[r[1]] = r[2] ?? r[3] ?? r[4] ?? "";
		}
		return {
			name: r,
			args: i
		};
	}
	#e;
	#t = 0;
	#n = {};
	#r = "mes";
	#i = {};
	#a = !1;
	#o = {};
	constructor(t, n) {
		this.fn = t, this.#e = e.tokenize(n), this.#e.forEach((e, t) => {
			let n = e.trimStart();
			n.charCodeAt(0) === 42 && n.length > 1 && (this.#n[n.trim()] = t + 1);
		});
	}
	get idx() {
		return this.#t;
	}
	get atEnd() {
		return this.#t >= this.#e.length;
	}
	jumpToLabel(e) {
		let t = this.#n[e];
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません（試作は同一ファイル内のみ対応）`;
		this.#t = t;
	}
	step() {
		let t = [];
		this.#a && (this.#a = !1, this.#i[this.#r] = "", t.push({
			t: "chgStr",
			nm: this.#r,
			str: ""
		}));
		let n = this.#e.length;
		for (; this.#t < n;) {
			let r = this.#e[this.#t++];
			if (r === "" || r === "\n" || r === "\r\n") continue;
			let i = r.trimStart().charCodeAt(0);
			if (i === 59) {
				for (; this.#t < n;) {
					let e = this.#e[this.#t];
					if (e === "\n" || e === "\r\n") break;
					this.#t++;
				}
				continue;
			}
			if (!(i === 42 && r.trimStart().length > 1)) {
				if (i === 91) {
					let { name: n, args: i } = e.parseTag(r);
					switch (n) {
						case "add_lay": {
							let e = i.layer ?? i.nm ?? "";
							if (!e) throw "[add_lay] layerは必須です（試作仕様）";
							let n = (i.class ?? "txt").toLowerCase() === "grp" ? "grp" : "txt";
							this.#i[e] = "", t.push({
								t: "addLay",
								cls: n,
								nm: e
							});
							continue;
						}
						case "current":
							this.#r = i.layer ?? i.nm ?? this.#r;
							continue;
						case "add_face": {
							let e = i.name ?? "";
							if (!e) throw "[add_face] nameは必須です（試作仕様）";
							if (this.#o[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
							this.#o[e] = {
								fn: i.fn || e,
								dx: Number(i.dx || "0"),
								dy: Number(i.dy || "0"),
								blendmode: i.blendmode || "normal"
							};
							continue;
						}
						case "lay": {
							let e = i.fn || i.pic;
							if (e) {
								let n = [];
								if (i.face) for (let e of i.face.split(",")) {
									if (!e) throw "[lay] face属性に空要素が含まれています";
									let t = this.#o[e];
									if (!t) throw `[lay] face【${e}】は[add_face]で未定義です`;
									n.push(t);
								}
								t.push({
									t: "chgPic",
									nm: i.layer ?? "",
									fn: e,
									aFace: n
								});
							}
							if (i.b_alpha !== void 0) {
								let e = Number(i.b_alpha);
								if (Number.isNaN(e)) throw `[lay] b_alphaの値が不正です：${i.b_alpha}`;
								t.push({
									t: "chgBAlpha",
									nm: i.layer ?? "",
									b_alpha: e
								});
							}
							continue;
						}
						case "r":
							this.#s(t, "\n");
							continue;
						case "er":
							this.#i[this.#r] = "", t.push({
								t: "chgStr",
								nm: this.#r,
								str: ""
							});
							continue;
						case "jump": {
							let e = i.label ?? "", t = this.#n[e];
							if (t === void 0) throw `[jump] ラベル【${e}】が見つかりません（試作は同一ファイル内のみ対応）`;
							this.#t = t;
							continue;
						}
						case "button": {
							let e = i.layer || this.#r;
							if (!e) throw "[button] layerは必須です（試作仕様）";
							let n = i.label ?? "";
							if (!n) throw "[button] labelは必須です（試作仕様）";
							let r = i.nm ?? n;
							t.push({
								t: "addBtn",
								layerNm: e,
								nm: r,
								text: i.text ?? "",
								label: n
							});
							continue;
						}
						case "l":
						case "p":
						case "s": return n === "p" && (this.#a = !0), t.push({
							t: "stop",
							kind: n,
							key: `${this.fn}:${String(this.#t)}`,
							nm: this.#r
						}), t;
						default: continue;
					}
				}
				this.#s(t, r);
			}
		}
		return t;
	}
	#s(e, t) {
		let n = this.#r, r = (this.#i[n] ?? "") + t;
		this.#i[n] = r, e.push({
			t: "chgStr",
			nm: n,
			str: r
		});
	}
}, r = "[add_lay layer=base class=grp]\n[add_lay layer=mes class=txt]\n[current layer=mes]\n[lay layer=base pic=yun_1184]\nあいうえお、これはbluesnovelの試作画面です。[l]\nクリックかスペースキーで読み進められます。[p]\n[lay layer=base pic=yun_1317]\nページが変わり、背景が差し替わりました。[l]\nPageUp/PageDownキーで読み戻り・読み進めができます。[s]\n", i = class {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#s(e);
	}
	attachTsx(e, t, n) {
		this.$trgNext = e, this.$fncs = t, this.#t = n, this.#t.title = ({ text: e }) => {
			if (!e) throw "[title] textは必須です";
			return t.addTitle(e), !1;
		};
	}
	$trgNext;
	$fncs;
	#t = Object.create(null);
	#n = {};
	#r;
	async load(e) {
		let t = this.#n[e];
		if (!t) {
			let r = await this.#o(e);
			t = this.#n[e] = new n(e, r);
		}
		this.#r = t, this.go = () => this.#i(), this.$trgNext();
	}
	go() {}
	jumpToLabelAndGo(e) {
		let t = this.#r;
		if (t) {
			try {
				t.jumpToLabel(e);
			} catch (e) {
				this.myTrace(`[button] ジャンプ先エラー fn:${t.fn} ${String(e)}`, "ET");
				return;
			}
			this.#i();
		}
	}
	#i() {
		let e = this.#r;
		if (!e) return;
		this.$fncs.setWait(null);
		let t;
		try {
			t = e.step();
		} catch (t) {
			this.myTrace(`シナリオ解析エラー fn:${e.fn} ${String(t)}`, "ET");
			return;
		}
		for (let e of t) this.#a(e);
		e.atEnd && this.myTrace(`スクリプト終端です fn:${e.fn}`, "I");
	}
	#a(e) {
		switch (e.t) {
			case "addLay":
				this.$fncs.addLayer(e.cls === "grp" ? {
					cls: "grp",
					nm: e.nm,
					fn: "",
					aFace: []
				} : {
					cls: "txt",
					nm: e.nm,
					str: "",
					aBtn: [],
					b_alpha: 1
				});
				break;
			case "chgPic":
				this.$fncs.chgPic({
					nm: e.nm,
					fn: e.fn,
					aFace: e.aFace
				});
				break;
			case "chgBAlpha":
				this.$fncs.chgBAlpha({
					nm: e.nm,
					b_alpha: e.b_alpha
				});
				break;
			case "chgStr":
				this.$fncs.chgStr({
					nm: e.nm,
					str: e.str
				});
				break;
			case "addBtn":
				this.$fncs.addBtn({
					layerNm: e.layerNm,
					nm: e.nm,
					text: e.text,
					label: e.label
				});
				break;
			case "stop":
				this.sys.caretaker.push(e.key), (e.kind === "l" || e.kind === "p") && this.$fncs.setWait({
					nm: e.nm,
					kind: e.kind
				});
				break;
		}
	}
	async #o(t) {
		try {
			let n = this.sys.cfg.searchPath(t, e.SCRIPT), r = await fetch(n);
			if (!r.ok) throw Error(r.statusText);
			return await r.text();
		} catch (e) {
			return this.myTrace(`[load] スクリプト読込に失敗、試作サンプルで代替します fn:${t} ${String(e)}`, "W"), r;
		}
	}
	#s(e) {
		return this.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
	}
	myTrace = (e, n = "E") => {
		let r = "";
		switch (n) {
			case "D":
				r = "color:#05A;";
				break;
			case "W":
				r = "color:#F80;";
				break;
			case "F":
				r = "color:#B00;";
				break;
			case "ET":
			case "E":
				r = "color:#F30;";
				break;
			default: r = "";
		}
		let i = `{${n}} ` + e;
		switch (this.#e.innerHTML += `<span style='${r}'>${i}</span><br/>`, this.#e.hidden = !1, n) {
			case "D":
				t.isDarkMode && (r = "color:#49F;");
				break;
			case "W":
			case "F": break;
			case "ET":
			case "E":
				if (this.#t.title({ text: e }), n === "ET") throw i;
				break;
			default: r = "";
		}
		console.info("%c " + i, r);
	};
};
//#endregion
export { i as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map