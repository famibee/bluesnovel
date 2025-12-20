import { i as getFn, n as SEARCH_PATH_ARG_EXT, r as CmnLib } from "./ConfigBase.js";
var AnalyzeTagArg = class {
	#e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
	parse(e) {
		this.#n = {}, this.#r = !1;
		for (let { groups: t } of e.matchAll(this.#e)) {
			let { key: e, val: n, val2: r, def: i, def2: a, literal: o } = t;
			e ? this.#n[e] = {
				val: n ?? r ?? "",
				def: i ?? a
			} : o && (o === "*" ? this.#r = !0 : this.#n[o] = {
				val: "1",
				def: void 0
			});
		}
	}
	parseinDetail(e, t, n, r) {
		let i = {}, a = e.slice(1 + t, -1);
		for (let { groups: e, index: o, 0: s } of a.matchAll(this.#e)) {
			if (o === void 0) continue;
			let { key: c, val: l, val2: u = "", literal: d } = e;
			if (d) {
				if (d.endsWith("=")) {
					let e = d.length - 1, { ch: s } = this.#t(t, n, r, a, o + e);
					i[d.slice(0, -1)] = {
						k_ln: n,
						k_ch: s - e,
						v_ln: n,
						v_ch: s + 1,
						v_len: 0
					};
				}
				continue;
			}
			if (!c) continue;
			let { ln: f, ch: p } = this.#t(t, n, r, a, o), { ln: m, ch: h } = this.#t(t, n, r, a, o + s.lastIndexOf(l ?? u ?? "") - (l ? 0 : 1));
			i[c] = {
				k_ln: f,
				k_ch: p,
				v_ln: m,
				v_ch: h,
				v_len: l ? l.length : u.length + 2
			};
		}
		return i;
	}
	#t(e, t, n, r, i) {
		let a = r.slice(0, i).split("\n"), o = a.length;
		return {
			ln: t + o - 1,
			ch: o < 2 ? n + 1 + e + i : a.at(-1).length
		};
	}
	#n = {};
	get hPrm() {
		return this.#n;
	}
	#r = !1;
	get isKomeParam() {
		return this.#r;
	}
};
const REG_TAG = /(?<name>[^\s;\]]+)/;
function tagToken2Name_Args(e) {
	let t = REG_TAG.exec(e.slice(1, -1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	let n = t.name;
	return [n, e.slice(1 + n.length, -1)];
}
function tagToken2Name(e) {
	let t = REG_TAG.exec(e.slice(1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	return t.name;
}
var Grammar = class {
	constructor(e) {
		this.cfg = e, this.setEscape("");
	}
	#e;
	setEscape(e) {
		if (this.#l && e in this.#l) throw "[エスケープ文字] char【" + e + "】が登録済みの括弧マクロまたは一文字マクロです";
		this.#e = RegExp((e ? `\\${e}\\S|` : "") + `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${e ? `\\${e}` : ""}]+`, "gs"), this.#t = /* @__PURE__ */ RegExp(`[\\w\\s;[\\]*=&｜《》${e ? `\\${e}` : ""}]`), this.#u = /* @__PURE__ */ RegExp(`[\\n\\t;\\[*&${e ? `\\${e}` : ""}]`);
	}
	bracket2macro(e, t, n, r) {
		let { name: i, text: a } = e;
		if (!i) throw "[bracket2macro] nameは必須です";
		if (!a) throw "[bracket2macro] textは必須です";
		let o = a.at(0);
		if (!o) throw "[bracket2macro] textは必須です";
		if (a.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
		if (!(i in t)) throw `[bracket2macro] 未定義のタグ又はマクロ[${i}]です`;
		this.#l ??= {};
		let s = a.charAt(1);
		if (o in this.#l) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (s in this.#l) throw "[bracket2macro] text【" + s + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (this.#t.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
		if (this.#t.test(s)) throw "[bracket2macro] text【" + s + "】は括弧マクロに使用できない文字です";
		this.#l[s] = "0", this.#l[o] = `[${i} text=`, this.addC2M(`\\${o}[^\\${s}]*\\${s}`, `\\${o}\\${s}`), this.#d(n, r);
	}
	char2macro(e, t, n, r) {
		let { char: i, name: a } = e;
		if (!i) throw "[char2macro] charは必須です";
		if (this.#l ??= {}, i in this.#l) throw "[char2macro] char【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (this.#t.test(i)) throw "[char2macro] char【" + i + "】は一文字マクロに使用できない文字です";
		if (!a) throw "[char2macro] nameは必須です";
		if (!(a in t)) throw `[char2macro] 未定義のタグ又はマクロ[${a}]です`;
		this.#l[i] = `[${a}]`, this.addC2M(`\\${i}`, `\\${i}`), this.#d(n, r);
	}
	#t;
	#n = /* @__PURE__ */ RegExp("");
	#r = "";
	#i = "";
	addC2M(e, t) {
		this.#r += `${e}|`, this.#i += `${t}`, this.#n = RegExp(`(${this.#r}[^${this.#i}]+)`, "g");
	}
	resolveScript(e) {
		let t = e.replaceAll(/\r\n?/g, "\n").match(this.#e)?.flatMap((e) => {
			if (!this.testTagLetml(e)) return e;
			let t = /^([^\]]+?])(.*)$/s.exec(e);
			if (!t) return e;
			let [, n, r] = t;
			return [n, r];
		}) ?? [], n = {
			aToken: t,
			len: t.length,
			aLNum: []
		};
		return this.#d(n), this.#s(n), n;
	}
	#a = /^\[(call|loadplugin)\s/;
	#o = /\bfn\s*=\s*[^\s\]]+/;
	#s(n) {
		for (let r = n.len - 1; r >= 0; --r) {
			let i = n.aToken[r];
			if (!this.#a.test(i)) continue;
			let [o, s] = tagToken2Name_Args(i);
			this.#c.parse(s);
			let c = this.#c.hPrm.fn;
			if (!c) continue;
			let { val: l } = c;
			if (!l || !l.endsWith("*")) continue;
			n.aToken.splice(r, 1, "	", "; " + i), n.aLNum.splice(r, 1, NaN, NaN);
			let u = o === "loadplugin" ? SEARCH_PATH_ARG_EXT.CSS : SEARCH_PATH_ARG_EXT.SN, d = this.cfg.matchPath("^" + l.slice(0, -1) + ".*", u);
			for (let t of d) {
				let a = i.replace(this.#o, "fn=" + decodeURIComponent(getFn(t[u])));
				n.aToken.splice(r, 0, a), n.aLNum.splice(r, 0, NaN);
			}
		}
		n.len = n.aToken.length;
	}
	#c = new AnalyzeTagArg();
	testTagLetml(e) {
		return /^\[let_ml\s/.test(e);
	}
	testTagEndLetml(e) {
		return /^\[endlet_ml\s*]/.test(e);
	}
	analyzToken(e) {
		return this.#e.lastIndex = 0, this.#e.exec(e);
	}
	#l;
	#u;
	#d(e, t = 0) {
		if (this.#l) {
			for (let n = e.len - 1; n >= t; --n) {
				let t = e.aToken[n];
				if (this.testNoTxt(t.at(0) ?? "\n")) continue;
				let r = e.aLNum[n], i = t.match(this.#n);
				if (!i) continue;
				let a = 1;
				for (let t = i.length - 1; t >= 0; --t) {
					let o = i[t], s = this.#l[o.at(0) ?? " "];
					s && (o = s + (s.endsWith("]") ? "" : `'${o.slice(1, -1)}']`)), e.aToken.splice(n, a, o), e.aLNum.splice(n, a, r), a = 0;
				}
			}
			e.len = e.aToken.length;
		}
	}
	testNoTxt(e) {
		return this.#u.test(e);
	}
}, RubySpliter = class e {
	static #e = "ヽ";
	static setting(t) {
		t.sesame && (e.#e = t.sesame);
	}
	static getSesame() {
		return e.#e;
	}
	static destroy() {
		e.#e = "ヽ";
	}
	#t = () => {};
	init(e) {
		this.#t = e;
	}
	static #n;
	static setEscape(t) {
		e.#n = RegExp(`${t ? `(?<ce>\\${t}\\S)|` : ""}｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\uD800-\uDBFF][\uDC00-\uDFFF]|[^｜《》]+?|.)`, "gs");
	}
	putTxt(t) {
		for (let { groups: n } of t.matchAll(e.#n)) {
			let { ruby: e, kan_ruby: t, kan: r = "", ce: i, txt: a = "", str: o = "" } = n;
			if (e) {
				this.putTxtRb(decodeURIComponent(o), e);
				continue;
			}
			if (t) {
				this.putTxtRb(r, t);
				continue;
			}
			if (i) {
				this.#t(i.slice(1), "");
				continue;
			}
			for (let e of Array.from(a)) this.#t(e, "");
		}
	}
	putTxtRb(t, n) {
		if (/^\w+｜{"/.test(n)) {
			this.#t(t, n);
			return;
		}
		let r = Array.from(t), i = r.length;
		if (/^\*.?$/.test(n)) {
			let t = "center｜" + (n === "*" ? e.#e : n.charAt(1));
			for (let e = 0; e < i; ++e) this.#t(r[e], t);
			return;
		}
		if (i === 1 || !n.includes(" ")) {
			this.#t(t, decodeURIComponent(n));
			return;
		}
		let a = n.split(" "), o = a.length, s = o > i ? o : i;
		for (let e = 0; e < s; ++e) this.#t(e < i ? r[e] : "", e < o ? decodeURIComponent(a[e]) : "");
	}
}, ScriptIterator = class {
	#e = {
		aToken: [""],
		len: 1,
		aLNum: [1]
	};
	#t = "";
	#n = 0;
	addIdxToken() {
		++this.#n;
	}
	subIdxToken() {
		--this.#n;
	}
	#r = 0;
	get lineNum() {
		return this.#r;
	}
	addLineNum = (e) => this.#r += e;
	#i;
	async load(e) {
		this.#t = e;
		let n = this.sys.cfg.searchPath(e, SEARCH_PATH_ARG_EXT.SCRIPT), r = await this.sys.load(n);
		return this.#e = this.#i.resolveScript(r), this.#n = 0, this.#r = 1, this.#e.aToken.slice(this.#n).values();
	}
	strPos = () => this.#r > 0 ? `(fn:${this.#t} line:${this.#r}) ` : "";
	#a = 5;
	dumpErrForeLine() {
		if (this.#n === 0) {
			console.group(`🥟 Error line (from 0 rows before) fn:${this.#t}`), console.groupEnd();
			return;
		}
		let e = "";
		for (let t = this.#n - 1; t >= 0 && (e = this.#e.aToken[t] + e, !((e.match(/\n/g) ?? []).length >= this.#a)); --t);
		let t = e.split("\n").slice(-this.#a), n = t.length;
		console.group(`🥟 Error line (from ${n} rows before) fn:${this.#t}`);
		let r = String(this.#r).length, i = this.#o(this.#e, this.#n);
		for (let e = 0; e < n; ++e) {
			let a = this.#r - n + e + 1, o = `${String(a).padStart(r, " ")}: %c`, s = t[e], c = s.length > 75 ? s.slice(0, 75) + "…" : s;
			e === n - 1 ? console.info(o + c.slice(0, i.col_s) + "%c" + c.slice(i.col_s), "color: black; background-color: skyblue;", "color: black; background-color: pink;") : console.info(o + c, "color: black; background-color: skyblue;");
		}
		console.groupEnd();
	}
	#o(e, t) {
		let n = {
			ln: 1,
			col_s: 0,
			col_e: 0
		};
		if (!e) return n;
		let r = t - 1, i = n.ln = e.aLNum[r];
		for (; e.aLNum[r] === i;) {
			if (!e.aToken[r].startsWith("\n")) {
				let t = e.aToken[r].length;
				n.col_e > 0 && (n.col_s += t), n.col_e += t;
			}
			if (--r < 0) break;
		}
		return n;
	}
	constructor(e) {
		this.sys = e, this.#i = new Grammar(e.cfg);
		let t = e.cfg.oCfg.init.escape;
		this.#i.setEscape(t), RubySpliter.setEscape(t);
	}
}, ScriptMng = class {
	#e;
	#t;
	constructor(e) {
		this.sys = e, this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t = new ScriptIterator(e), this.#n.trace = (e) => this.#i(e);
	}
	attachTsx(e, t, n) {
		this.$trgNext = e, this.$fncs = t, this.#n = n, this.#n.title = ({ text: e }) => {
			if (!e) throw "[title] textは必須です";
			return t.addTitle(e), !1;
		};
	}
	$trgNext;
	$fncs;
	#n = Object.create(null);
	async load(e) {
		let t = await this.#t.load(e);
		for (;;) {
			let { done: e, value: n } = t.next();
			if (e) {
				this.myTrace("🎍 スクリプト末尾", "E");
				break;
			}
			this.#t.addIdxToken();
			let r = n;
			switch (n.charAt(0)) {
				case "	": continue;
				case "\n":
					this.#t.addLineNum(r.length);
					continue;
				case "[":
					if (console.log(`fn:ScriptMng.ts 🍊 TAG ${r}`), this.#r(r)) return;
					try {
						let e = (r.match(/\n/g) ?? []).length;
						e > 0 && this.#t.addLineNum(e);
					} catch (e) {
						e instanceof Error ? this.myTrace(`[${tagToken2Name(r)}]タグ解析中例外 mes=${e.message}(${e.name})`) : this.myTrace(String(e));
						return;
					}
					continue;
				case "&":
					try {
						if (!n.endsWith("&")) {
							if (this.#r(r)) return;
							continue;
						}
						if (n.charAt(1) === "&") throw Error("「&表示&」書式では「&」指定が不要です");
					} catch (e) {
						this.myTrace(e instanceof Error ? `& 変数操作・表示 mes=${e.message}(${e.name})` : String(e));
						return;
					}
					break;
				case ";": continue;
				case "*":
					if (n.length > 1) continue;
					break;
			}
			try {
				console.log(`fn:ScriptMng.ts 🍈 tagCh:${r}`);
			} catch (e) {
				this.myTrace(e instanceof Error ? `文字表示 mes=${e.message}(${e.name})` : String(e));
				return;
			}
		}
		function* n() {
			yield {
				cls: "GRP",
				nm: "base",
				fn: "yun_1184"
			}, yield {
				cls: "TXT",
				nm: "mes",
				str: "あいうえお"
			}, yield {
				nm: "mes",
				str: "かきくけこ"
			}, yield {
				cls: "GRP",
				nm: "fg0",
				fn: "F_1024a"
			}, yield {
				nm: "base",
				fn: "yun_1317"
			};
		}
		let r = n(), i = 0;
		this.go = () => {
			for (console.log("fn:ScriptMng.ts == go ==");;) {
				let { done: t, value: n } = r.next();
				if (t) break;
				this.sys.caretaker.push(e + ":" + ++i), "cls" in n ? this.$fncs.addLayer(n) : "fn" in n ? this.$fncs.chgPic(n) : this.$fncs.chgStr(n);
				break;
			}
		}, this.$trgNext();
	}
	#r = (e) => !1;
	go() {}
	#i(e) {
		return this.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
	}
	myTrace = (e, t = "E") => {
		let r = "";
		switch (t) {
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
		let i = `{${t}} ` + this.#t.strPos() + e;
		switch (this.#e.innerHTML += `<span style='${r}'>${i}</span><br/>`, this.#e.hidden = !1, t) {
			case "D":
				CmnLib.isDarkMode && (r = "color:#49F;");
				break;
			case "W":
			case "F": break;
			case "ET":
			case "E":
				if (this.#n.title({ text: e }), this.#t.dumpErrForeLine(), t === "ET") throw i;
				break;
			default: r = "";
		}
		console.info("%c " + i, r);
	};
};
export { ScriptMng };

//# sourceMappingURL=ScriptMng.js.map