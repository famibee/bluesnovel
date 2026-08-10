import { S as e, a as t, i as n, l as r, m as i, r as a, t as o, x as s } from "./store.js";
import { a as c, i as l, o as u, r as d, t as f } from "./CmnLib.js";
import { t as p } from "./Crypto.js";
import { t as m } from "./gsap.js";
import { PROTOCOL_USERDATA as h, t as g } from "./Config.js";
//#region src/sn/AnalyzeTagArg.ts
function _(e, t, n = 0, r = 0, i = 0) {
	let a = e.slice(0, t).split("\n"), o = a.length;
	return {
		ln: r + o - 1,
		ch: o < 2 ? i + 1 + n + t : a.at(-1)?.length ?? 0
	};
}
var v = class {
	#e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
	parse(e) {
		this.#t = {}, this.#n = !1;
		for (let { groups: t } of e.matchAll(this.#e)) {
			let { key: e, val: n, val2: r, def: i, def2: a, literal: o } = t;
			e ? this.#t[e] = {
				val: n ?? r ?? "",
				def: i ?? a
			} : o && (o === "*" ? this.#n = !0 : this.#t[o] = {
				val: "1",
				def: void 0
			});
		}
	}
	parseinDetail(e, t, n, r) {
		let i = {}, a = e.slice(1 + t, -1);
		for (let { groups: e, index: o, 0: s } of a.matchAll(this.#e)) {
			if (!o) continue;
			let { key: c, val: l, val2: u = "", literal: d } = e;
			if (d) {
				if (d.endsWith("=")) {
					let e = d.length - 1, { ch: s } = _(a, o + e, t, n, r);
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
			let { ln: f, ch: p } = _(a, o, t, n, r), { ln: m, ch: h } = _(a, o + s.lastIndexOf(l ?? u) - +!l, t, n, r);
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
	#t = {};
	get hPrm() {
		return this.#t;
	}
	#n = !1;
	get isKomeParam() {
		return this.#n;
	}
}, y = /(?<name>[^\s;\]]+)/;
function b(e) {
	let t = y.exec(e.slice(1, -1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	let n = t.name;
	return [n, e.slice(1 + n.length, -1)];
}
function ee(e) {
	let t = e.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), n = t.length;
	if (n < 2 || n > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
	let [r, i, a] = t;
	if (i.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
	return {
		name: r.replaceAll("＝", "==").replaceAll("≠", "!="),
		text: i.replaceAll("＝", "==").replaceAll("≠", "!="),
		...n === 3 ? { cast: a.trim() } : {}
	};
}
var x = class {
	cfg;
	constructor(e) {
		this.cfg = e, this.setEscape("");
	}
	#e;
	#t = "";
	get ce() {
		return this.#t;
	}
	setEscape(e) {
		if (this.#u && e in this.#u) throw "[エスケープ文字] char【" + e + "】が登録済みの括弧マクロまたは一文字マクロです";
		this.#e = RegExp((e ? `\\${e}\\S|` : "") + `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${e ? `\\${e}` : ""}]+`, "gs"), this.#n = RegExp(`[\\w\\s;[\\]*=&｜《》${e ? `\\${e}` : ""}]`), this.#d = RegExp(`[\\n\\t;\\[*&${e ? `\\${e}` : ""}]`), this.#t = e;
	}
	bracket2macro(e, t, n, r) {
		let { name: i, text: a } = e;
		if (!i) throw "[bracket2macro] nameは必須です";
		if (!a) throw "[bracket2macro] textは必須です";
		let o = a.at(0);
		if (!o) throw "[bracket2macro] textは必須です";
		if (a.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
		if (!(i in t)) throw `[bracket2macro] 未定義のタグ又はマクロ[${i}]です`;
		this.#u ??= {};
		let s = a.charAt(1);
		if (o in this.#u) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (s in this.#u) throw "[bracket2macro] text【" + s + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (this.#n.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
		if (this.#n.test(s)) throw "[bracket2macro] text【" + s + "】は括弧マクロに使用できない文字です";
		this.#u[s] = "0", this.#u[o] = `[${i} text=`, this.addC2M(`\\${o}[^\\${s}]*\\${s}`, `\\${o}\\${s}`), this.#f(n, r);
	}
	char2macro(e, t, n, r) {
		let { char: i, name: a } = e;
		if (!i) throw "[char2macro] charは必須です";
		if (this.#u ??= {}, i in this.#u) throw "[char2macro] char【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (this.#n.test(i)) throw "[char2macro] char【" + i + "】は一文字マクロに使用できない文字です";
		if (!a) throw "[char2macro] nameは必須です";
		if (!(a in t)) throw `[char2macro] 未定義のタグ又はマクロ[${a}]です`;
		this.#u[i] = `[${a}]`, this.addC2M(`\\${i}`, `\\${i}`), this.#f(n, r);
	}
	#n;
	#r = /* @__PURE__ */ RegExp("");
	#i = "";
	#a = "";
	addC2M(e, t) {
		this.#i += `${e}|`, this.#a += t, this.#r = RegExp(`(${this.#i}[^${this.#a}]+)`, "g");
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
		}, r = 1;
		for (let e = 0; e < t.length; ++e) n.aLNum[e] = r, r += t[e].match(/\n/g)?.length ?? 0;
		return this.#f(n), this.#c(n), n;
	}
	#o = /^\[(call|loadplugin)\s/;
	#s = /\bfn\s*=\s*[^\s\]]+/;
	#c(e) {
		if (this.cfg) {
			for (let t = e.len - 1; t >= 0; --t) {
				let n = e.aToken[t];
				if (!this.#o.test(n)) continue;
				let [r, i] = b(n);
				this.#l.parse(i);
				let a = this.#l.hPrm.fn;
				if (!a) continue;
				let { val: o } = a;
				if (!o.endsWith("*")) continue;
				e.aToken.splice(t, 1, "	", "; " + n), e.aLNum.splice(t, 1, NaN, NaN);
				let s = r === "loadplugin" ? g.CSS : g.SN, c = this.cfg.matchPath("^" + o.slice(0, -1) + ".*", s);
				for (let r of c) {
					let i = n.replace(this.#s, "fn=" + decodeURIComponent(l(r[s])));
					e.aToken.splice(t, 0, i), e.aLNum.splice(t, 0, NaN);
				}
			}
			e.len = e.aToken.length;
		}
	}
	#l = new v();
	testTagLetml(e) {
		return /^\[let_ml\s/.test(e);
	}
	testTagEndLetml(e) {
		return /^\[endlet_ml\s*]/.test(e);
	}
	#u = void 0;
	#d;
	#f(e, t = 0) {
		if (this.#u) {
			for (let n = e.len - 1; n >= t; --n) {
				let t = e.aToken[n];
				if (this.testNoTxt(t.at(0) ?? "\n")) continue;
				let r = e.aLNum[n], i = t.match(this.#r);
				if (!i) continue;
				let a = 1;
				for (let t = i.length - 1; t >= 0; --t) {
					let o = i[t], s = this.#u[o.at(0) ?? " "];
					s && (o = s + (s.endsWith("]") ? "" : `'${o.slice(1, -1)}']`)), e.aToken.splice(n, a, o), e.aLNum.splice(n, a, r), a = 0;
				}
			}
			e.len = e.aToken.length;
		}
	}
	testNoTxt(e) {
		return this.#d.test(e);
	}
};
//#endregion
//#region src/sn/CmnInterface.ts
function te() {
	return {
		"const.sn.cfg.ns": "",
		"const.sn.aPageLog": "[]",
		"const.sn.nativeWindow.x": 0,
		"const.sn.nativeWindow.y": 0,
		"const.sn.nativeWindow.w": f.stageW,
		"const.sn.nativeWindow.h": f.stageH,
		"const.sn.save.place": 1,
		"const.sn.sound.BGM.volume": 1,
		"const.sn.sound.SE.volume": 1,
		"const.sn.sound.SYS.volume": 1,
		"sn.auto.msecLineWait": 500,
		"sn.auto.msecLineWait_Kidoku": 500,
		"sn.auto.msecPageWait": 3500,
		"sn.auto.msecPageWait_Kidoku": 3500,
		"sn.skip.mode": "s",
		"sn.sound.BGM.vol_mul_talking": 1,
		"sn.sound.global_volume": (e, t) => 1,
		"sn.sound.movie_volume": (e, t) => 1,
		"sn.tagCh.canskip": !0,
		"sn.tagCh.doWait": !0,
		"sn.tagCh.doWait_Kidoku": !0,
		"sn.tagCh.msecWait": 10,
		"sn.tagCh.msecWait_Kidoku": 10,
		"TextLayer.Back.Alpha": .5
	};
}
//#endregion
//#region src/ts/VarStore.ts
var S = { save: "game" }, C = class e {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = /* @__PURE__ */ new Set();
	#r = Object.create(null);
	#i;
	constructor() {
		this.#a();
	}
	#a() {
		for (let [e, t] of Object.entries(te())) this.#e[`sys.${e}`] = typeof t == "function" ? 1 : t;
	}
	defBuiltin(e, t) {
		this.#t[e] = t;
	}
	defSetTrigger(t, n) {
		let { ns: r, key: i } = e.parseName(t);
		this.#r[`${r}.${i}`] = n;
	}
	defSetTriggerSoundVol(e) {
		this.#i = e;
	}
	static REG_NAME = /^(?:(tmp|game|save|sys|mp):)?([^\s:@]+)(@str)?$/;
	static parseName(t) {
		let n = e.REG_NAME.exec(t.trim());
		if (!n) throw `変数名が不正です：${t}`;
		let r = n[1] ?? "tmp";
		return {
			ns: S[r] ?? r,
			key: e.#o(n[2]),
			atStr: !!n[3]
		};
	}
	static #o(e) {
		let t = 0, n = 0, r = e;
		for (;;) {
			if (t = r.indexOf("[\""), t < 0) {
				if (t = r.indexOf("['"), t < 0) break;
				n = r.indexOf("']", t + 2);
			} else n = r.indexOf("\"]", t + 2);
			if (n < 0) break;
			r = r.slice(0, t) + "." + r.slice(t + 2, n) + r.slice(n + 2);
		}
		return r;
	}
	get(t, n = void 0, r = !1) {
		if (!t.trim()) throw "[変数参照] nameは必須です";
		let { ns: i, key: a, atStr: o } = e.parseName(t);
		if (i === "tmp") {
			let t = this.#t[a];
			if (t) return o ? t() : e.castAuto(t());
		}
		let s = `${i}.${a}`;
		if (s in this.#e) return o || this.#n.has(s) ? this.#e[s] : e.castAuto(this.#e[s]);
		if (r) return this.#e[s] = n, o ? n : e.castAuto(n);
		let c = this.#s(i, a, n);
		return o ? c : e.castAuto(c);
	}
	#s(e, t, n) {
		let r = t.split("."), i = r.length, a = "";
		for (let t = 0; t < i; ++t, a += ".") {
			a += r[t];
			let o = `${e}.${a}`, s;
			if (o in this.#e) s = this.#e[o];
			else if (e === "tmp" && this.#t[a]) s = this.#t[a]();
			else continue;
			let c;
			try {
				c = JSON.parse(String(s));
			} catch {
				if (t + 1 === i) return s;
				continue;
			}
			if (Object.prototype.toString.call(c) !== "[object Object]") {
				if (t + 1 === i) return c;
				continue;
			}
			let l = c, u = t;
			for (; ++u < i;) {
				let e = r[u];
				if (!(e in l)) return n;
				if (l = l[e], Object.prototype.toString.call(l) !== "[object Object]" || u + 1 === i) break;
			}
			return l instanceof Object ? JSON.stringify(l) : l;
		}
		return n;
	}
	static REG_NUMERICLITERAL = /^-?[\d.]+$/;
	static castAuto(t) {
		if (typeof t != "string") return t;
		if (t === "true") return !0;
		if (t === "false") return !1;
		if (t === "null") return null;
		if (t !== "undefined") return e.REG_NUMERICLITERAL.test(t) ? parseFloat(t) : t;
	}
	set(t, n, r = "") {
		let { ns: i, key: a } = e.parseName(t);
		if (i === "tmp" && a in this.#t) throw `組み込み変数【${t}】へは代入できません`;
		let o = `${i}.${a}`;
		r === "str" ? this.#n.add(o) : this.#n.delete(o);
		let s = e.castTo(n, r);
		if (this.#e[o] = s, this.#r[o]?.(s), i === "sys" && this.#i) {
			let e = /^const\.sn\.sound\.([^.]+)\.volume$/.exec(a);
			e && this.#i(e[1], s);
		}
	}
	static castTo(t, n) {
		switch (n) {
			case "": return t;
			case "num": return e.#c(t);
			case "int": return c(e.#c(t));
			case "uint": return u(e.#c(t));
			case "bool": return t != null && String(t) !== "false" && !!String(t);
			case "str": return t == null ? t : String(t);
			default: throw `cast【${String(n)}】は未定義です`;
		}
	}
	static #c(e) {
		let t = String(e), n = t.startsWith("0x") ? parseInt(t, 16) : parseFloat(t);
		if (Number.isNaN(n)) throw `値【${t}】が数値ではありません`;
		return n;
	}
	cloneMp() {
		let e = {};
		for (let t of Object.keys(this.#e)) t.startsWith("mp.") && (e[t.slice(3)] = this.#e[t]);
		return e;
	}
	setMp(e) {
		this.#l("mp.");
		for (let t of Object.keys(e)) this.#e[`mp.${t}`] = e[t];
	}
	cloneNs(e) {
		let t = `${e}.`, n = {};
		for (let e of Object.keys(this.#e)) if (e.startsWith(t)) {
			let r = e.slice(t.length);
			n[this.#n.has(e) ? `${r}@str` : r] = this.#e[e];
		}
		return n;
	}
	setNs(e, t) {
		let n = `${e}.`;
		this.#l(n);
		for (let [e, r] of Object.entries(t)) {
			let t = e.endsWith("@str"), i = n + (t ? e.slice(0, -4) : e);
			this.#e[i] = r, t && this.#n.add(i);
		}
	}
	dump() {
		let e = {
			tmp: {},
			game: {},
			sys: {},
			mp: {}
		};
		for (let t of Object.keys(this.#e)) {
			let n = t.indexOf("."), r = t.slice(0, n);
			(e[r] ??= {})[t.slice(n + 1)] = this.#e[t];
		}
		return e;
	}
	clearGame() {
		this.#l("game.");
	}
	clearSys() {
		this.#l("sys."), this.#a();
	}
	#l(e) {
		for (let t of Object.keys(this.#e)) t.startsWith(e) && (delete this.#e[t], this.#n.delete(t));
	}
}, w = /\[[^\]]+\]/g, T = {
	"**": {
		bp: 13,
		right: !0
	},
	"*": { bp: 12 },
	"/": { bp: 12 },
	"¥": { bp: 12 },
	"%": { bp: 12 },
	"+": { bp: 11 },
	"-": { bp: 11 },
	">>>": { bp: 10 },
	"<<": { bp: 10 },
	">>": { bp: 10 },
	"<=": { bp: 9 },
	"<": { bp: 9 },
	">=": { bp: 9 },
	">": { bp: 9 },
	"===": { bp: 8 },
	"!==": { bp: 8 },
	"==": { bp: 8 },
	"!=": { bp: 8 },
	"&": { bp: 7 },
	"^": { bp: 6 },
	"|": { bp: 5 },
	"&&": { bp: 4 },
	"||": { bp: 3 },
	":": {
		bp: 2,
		right: !0
	},
	"?": {
		bp: 1,
		right: !0
	}
}, ne = class {
	val;
	#e;
	#t;
	#n = /^(?:(?:tmp|sys|game|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*/;
	constructor(e, t = "\\") {
		this.val = e, this.#e = t, this.#t = RegExp(`^(?:"(?:\\${t}["'#\\n]|[^"])*"|'(?:\\${t}["'#\\n]|[^'])*'|\\#(?:\\${t}["'#\\n]|[^#])*\\#)`);
	}
	#r(e) {
		let t = [], n = 0;
		for (; n < e.length;) {
			let r = e.charCodeAt(n);
			if (r === 32 || r === 9 || r === 10 || r === 13) {
				++n;
				continue;
			}
			let i = e.slice(n), a;
			if ((a = /^0x[0-9a-fA-F]+/.exec(i)) || (a = /^(0|[1-9][0-9]*)\.[0-9]+/.exec(i))) {
				t.push({
					t: "NUM",
					v: ["!num!", Number(a[0])]
				}), n += a[0].length;
				continue;
			}
			if (a = /^(0|[1-9][0-9]*)/.exec(i)) {
				t.push({
					t: "NUM",
					v: ["!num!", c(a[0])]
				}), n += a[0].length;
				continue;
			}
			if (i.startsWith("null")) {
				t.push({
					t: "NULL",
					v: ["!str!", null]
				}), n += 4;
				continue;
			}
			if (a = /^(true|false)/.exec(i)) {
				t.push({
					t: "BOOL",
					v: ["!bool!", a[0] === "true"]
				}), n += a[0].length;
				continue;
			}
			if (a = this.#t.exec(i)) {
				t.push({
					t: "STR",
					v: ["!str!", a[0].slice(1, -1).replaceAll(this.#e, "")]
				}), n += a[0].length;
				continue;
			}
			let o = i.slice(0, 3);
			if (o === ">>>" || o === "===" || o === "!==") {
				t.push({ t: o }), n += 3;
				continue;
			}
			let s = i.slice(0, 2);
			if ([
				"**",
				"++",
				"--",
				">>",
				"<<",
				"<=",
				">=",
				"==",
				"!=",
				"&&",
				"||"
			].includes(s)) {
				t.push({ t: s }), n += 2;
				continue;
			}
			let l = i.charAt(0);
			if ("()!~*/%+-<>&^|:?¥".includes(l)) {
				t.push({ t: l }), ++n;
				continue;
			}
			let u = /^[A-Za-z_][A-Za-z0-9_]*/.exec(i);
			if (u && i.charAt(u[0].length) === "(") {
				t.push({
					t: "FUNC",
					v: u[0]
				}), n += u[0].length;
				continue;
			}
			if (a = this.#n.exec(i)) {
				let e = a[0];
				i.slice(e.length, e.length + 4) === "@str" && (e += "@str"), t.push({
					t: "VAR",
					v: e
				}), n += e.length;
				continue;
			}
			throw Error(`(ExprEval)不明な文字【${l}】です`);
		}
		return t;
	}
	#i(e) {
		let t = this.#r(e), n = 0, r = () => t[n], i = () => {
			let e = t[n++];
			if (!e) throw Error("(ExprEval)式が終端しています");
			switch (e.t) {
				case "NUM":
				case "NULL":
				case "BOOL":
				case "STR": return e.v;
				case "VAR": return this.#a(e.v);
				case "FUNC": {
					if (r()?.t !== "(") throw Error("(ExprEval)関数呼び出しには開き括弧「(」が要ります");
					++n;
					let t = s(0);
					if (r()?.t !== ")") throw Error("(ExprEval)関数呼び出しの閉じ括弧「)」がありません");
					return ++n, [e.v, t];
				}
				case "(": {
					let e = s(0);
					if (r()?.t !== ")") throw Error("(ExprEval)閉じ括弧「)」がありません");
					return ++n, e;
				}
				default: throw Error(`(ExprEval)想定外のトークン【${e.t}】です`);
			}
		}, a = () => {
			let e = i();
			for (;;) {
				let t = r()?.t;
				if (t === "++") {
					++n, e = ["PostfixInc", e];
					continue;
				}
				if (t === "--") {
					++n, e = ["PostfixDec", e];
					continue;
				}
				break;
			}
			return e;
		}, o = () => {
			let e = r()?.t;
			return e === "!" ? (++n, ["!", o()]) : e === "~" ? (++n, ["~", o()]) : e === "++" ? (++n, ["PrefixInc", o()]) : e === "--" ? (++n, ["PrefixDec", o()]) : e === "-" ? (++n, ["UnaryNegate", o()]) : a();
		}, s = (e) => {
			let t = o();
			for (;;) {
				let i = r(), a = i && T[i.t];
				if (!a || a.bp < e) break;
				++n;
				let o = s(a.right ? a.bp : a.bp + 1);
				t = [
					i.t,
					t,
					o
				];
			}
			return t;
		}, c = s(0);
		if (n !== t.length) throw Error("(ExprEval)余分なトークンが残っています");
		return c;
	}
	#a(e) {
		let t = e.replaceAll(w, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
		return n == null ? ["!str!", n] : typeof n == "boolean" ? ["!bool!", n] : Object.prototype.toString.call(n) === "[object String]" ? ["!str!", String(n)] : ["!num!", Number(n)];
	}
	parse(e) {
		let t;
		try {
			t = this.#i(e);
		} catch {
			throw Error(`(ExprEval)文法エラー【${e}】`);
		}
		return t[0] === "!str!" ? this.#u(t[1]) : this.#o(t);
	}
	evalBool(e) {
		let t = this.parse(e);
		return !!t && t !== "false";
	}
	#o(e) {
		let t = e.shift();
		if (t instanceof Array) return this.#o(t);
		let n = this.#s[t];
		return n ? n(e) : Object(null);
	}
	#s = {
		"!num!": (e) => e.shift(),
		"!str!": (e) => this.#u(e.shift()),
		"!bool!": (e) => e.shift(),
		PostfixInc: () => {
			throw Error("(ExprEval)後置インクリメントは未サポートです");
		},
		PostfixDec: () => {
			throw Error("(ExprEval)後置デクリメントは未サポートです");
		},
		PrefixInc: () => {
			throw Error("(ExprEval)前置インクリメントは未サポートです");
		},
		PrefixDec: () => {
			throw Error("(ExprEval)前置デクリメントは未サポートです");
		},
		"!": (e) => !this.#s.Boolean(e),
		"~": (e) => ~Number(this.#o(e.shift())),
		UnaryNegate: (e) => -this.#s.Number(e),
		"**": (e) => Number(this.#o(e.shift())) ** Number(this.#o(e.shift())),
		"*": (e) => Number(this.#o(e.shift())) * Number(this.#o(e.shift())),
		"/": (e) => Number(this.#o(e.shift())) / Number(this.#o(e.shift())),
		"¥": (e) => Math.floor(this.#s["/"](e)),
		"%": (e) => Number(this.#o(e.shift())) % Number(this.#o(e.shift())),
		"+": (e) => {
			let t = this.#o(e.shift()), n = this.#o(e.shift());
			return Object.prototype.toString.call(t) === "[object String]" || Object.prototype.toString.call(n) === "[object String]" ? String(t) + String(n) : Number(t) + Number(n);
		},
		"-": (e) => Number(this.#o(e.shift())) - Number(this.#o(e.shift())),
		int: (e) => c(this.#c(e.shift())),
		parseInt: (e) => c(this.#s.Number(e)),
		Number: (e) => {
			let t = this.#o(e.shift());
			return Object.prototype.toString.call(t) === "[object String]" ? this.#c(this.#i(String(t))) : Number(t);
		},
		Boolean: (e) => {
			let t = e.shift();
			return t[0] === "!bool!" ? !!t[1] : !!this.#o(t);
		},
		ceil: (e) => Math.ceil(this.#c(e.shift())),
		floor: (e) => Math.floor(this.#c(e.shift())),
		round: (e) => Math.round(this.#c(e.shift())),
		isNaN: (e) => Number.isNaN(this.#c(e.shift())),
		"<<": (e) => Number(this.#o(e.shift())) << Number(this.#o(e.shift())),
		">>": (e) => Number(this.#o(e.shift())) >> Number(this.#o(e.shift())),
		">>>": (e) => Number(this.#o(e.shift())) >>> Number(this.#o(e.shift())),
		"<": (e) => Number(this.#o(e.shift())) < Number(this.#o(e.shift())),
		"<=": (e) => Number(this.#o(e.shift())) <= Number(this.#o(e.shift())),
		">": (e) => Number(this.#o(e.shift())) > Number(this.#o(e.shift())),
		">=": (e) => Number(this.#o(e.shift())) >= Number(this.#o(e.shift())),
		"==": (e) => {
			let t = this.#o(e.shift()), n = this.#o(e.shift());
			return t == null && n == null ? t == n : String(t) === String(n);
		},
		"!=": (e) => !this.#s["=="](e),
		"===": (e) => {
			let t = this.#o(e.shift()), n = this.#o(e.shift());
			return Object.prototype.toString.call(t) === Object.prototype.toString.call(n) && String(t) === String(n);
		},
		"!==": (e) => !this.#s["==="](e),
		"&": (e) => Number(this.#o(e.shift())) & Number(this.#o(e.shift())),
		"^": (e) => Number(this.#o(e.shift())) ^ Number(this.#o(e.shift())),
		"|": (e) => Number(this.#o(e.shift())) | Number(this.#o(e.shift())),
		"&&": (e) => String(this.#o(e.shift())) === "true" && String(this.#o(e.shift())) === "true",
		"||": (e) => String(this.#o(e.shift())) === "true" || String(this.#o(e.shift())) === "true",
		"?": (e) => {
			let t = this.#s.Boolean(e), n = e.shift();
			if (n[0] !== ":") throw Error("(ExprEval)三項演算子の文法エラーです。: が見つかりません");
			return this.#o(n[t ? 1 : 2]);
		},
		":": () => {
			throw Error("(ExprEval)三項演算子の文法エラーです。? が見つかりません");
		}
	};
	#c(e) {
		let t = this.#o(e);
		if (Object.prototype.toString.call(t) !== "[object Number]") throw Error(`(ExprEval)引数【${String(t)}】が数値ではありません`);
		return Number(t);
	}
	#l = /(\$((tmp|sys|game|mp):)?[^\s!--/:-@[-^`{-~]+|#\{[^}]+})/g;
	#u(e) {
		return e == null ? e : String(e).replaceAll(this.#l, (e) => String(e.startsWith("$") ? this.val.get(e.slice(1)) : this.parse(e.slice(2, -1))));
	}
	getValAmpersand = (e) => e.startsWith("&") ? String(this.parse(e.slice(1))) : e;
}, E = class {
	fn;
	grm;
	#e;
	get aToken() {
		return this.#e.aToken;
	}
	get aLNum() {
		return this.#e.aLNum;
	}
	#t = Object.create(null);
	constructor(e, t, n = new x()) {
		this.fn = e, this.grm = n, this.#e = n.resolveScript(t), this.#n();
	}
	#n() {
		let e = Object.create(null), t = !1;
		this.aToken.forEach((n, r) => {
			if (t) {
				this.grm.testTagEndLetml(n) && (t = !1);
				return;
			}
			if (n.charCodeAt(0) === 42 && n.length > 1) {
				e[n.trim()] = r + 1;
				return;
			}
			this.grm.testTagLetml(n) && (t = !0);
		}), this.#t = e;
	}
	get len() {
		return this.#e.aToken.length;
	}
	label2idx(e) {
		return this.#t[e];
	}
	defC2M(e, t, n, r) {
		this.grm[e](t, n, this.#e, r), this.#n();
	}
}, D = class e {
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
		e.#n = RegExp((t ? `(?<ce>\\${t}\\S)|` : "") + e.#r, "gs");
	}
	static #r = "｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^｜《》]+?|.)";
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
			for (let e of r) this.#t(e, t);
			return;
		}
		if (i === 1 || !n.includes(" ")) {
			this.#t(t, decodeURIComponent(n));
			return;
		}
		let a = n.split(" "), o = a.length, s = o > i ? o : i;
		for (let e = 0; e < s; ++e) this.#t(e < i ? r[e] : "", e < o ? decodeURIComponent(a[e]) : "");
	}
}, O = class e {
	#e = {};
	clear() {
		this.#e = {};
	}
	static from(t) {
		let n = new e();
		return n.#e = { ...t }, n;
	}
	val() {
		return { ...this.#e };
	}
	search(e) {
		return Object.entries(this.#e).some(([t, n]) => e >= parseInt(t) && e <= n);
	}
	record(e) {
		if (!this.search(e)) {
			for (let [t, n] of Object.entries(this.#e)) if (n + 1 === e) {
				String(e + 1) in this.#e ? (this.#e[t] = this.#e[e + 1], delete this.#e[e + 1]) : this.#e[t] = e;
				return;
			}
			if (String(e + 1) in this.#e) {
				this.#e[e] = this.#e[e + 1], delete this.#e[e + 1];
				return;
			}
			this.#e[e] = e;
		}
	}
	erase(e) {
		if (this.search(e)) {
			if (String(e) in this.#e) {
				this.#e[e] > e && (this.#e[e + 1] = this.#e[e]), delete this.#e[e];
				return;
			}
			for (let [t, n] of Object.entries(this.#e)) if (!(e < parseInt(t) || n < e)) {
				if (this.#e[t] === e) {
					this.#e[t] = e - 1;
					return;
				}
				this.#e[e + 1] = n, this.#e[t] = e - 1;
				return;
			}
		}
	}
	get count() {
		return Object.keys(this.#e).length;
	}
	toString() {
		let e = "";
		for (let t of Object.keys(this.#e).map((e) => parseInt(e)).sort((e, t) => e - t)) e += t === this.#e[t] ? "," + String(t) : "," + String(t) + "~" + String(this.#e[String(t)]);
		return e;
	}
}, k = [
	"alpha",
	"left",
	"top",
	"width",
	"height",
	"rotation",
	"scale_x",
	"scale_y",
	"pivot_x",
	"pivot_y"
], A = [
	"alpha",
	"x",
	"y",
	"width",
	"height",
	"scale_x",
	"scale_y",
	"rotate"
], re = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function j(e, t, n = k) {
	let r = {}, i = (t, n) => {
		if (!n) return;
		let i = n.startsWith("="), a = i ? n.slice(1) : n;
		if (!a) return;
		let [o = "0", s] = a.split(","), c = parseFloat(o);
		if (!Number.isFinite(c)) throw `[${e}] ${t}の値が不正です：${n}`;
		if (s) {
			let r = parseFloat(s);
			if (!Number.isFinite(r)) throw `[${e}] ${t}の値が不正です：${n}`;
			c += Math.round(Math.random() * (r - c + 1));
		}
		r[t] = {
			v: c,
			rel: i
		};
	};
	for (let e of n) i(e, t[e]);
	return n.includes("left") && (t.left === void 0 && i("left", t.x), t.top === void 0 && i("top", t.y)), r;
}
var M = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
function N(e, t, n = k) {
	let r = [];
	for (let { groups: i } of t.matchAll(M)) {
		let { x: t, x2: a, y: o, y2: s, o: c, o2: l, json: u } = i, d = {};
		if (u) {
			let t;
			try {
				t = JSON.parse(u);
			} catch (t) {
				throw `[${e}] path内のJSONが不正です：${u} ${String(t)}`;
			}
			for (let [e, n] of Object.entries(t)) d[e] = String(n);
		} else {
			let e = t ?? a;
			e && (d.x = e);
			let n = o ?? s;
			n && (d.y = n);
			let r = c ?? l;
			r && (d.alpha = r);
		}
		r.push(j(e, d, n));
	}
	return r;
}
var P = {
	Quadratic: "power1",
	Cubic: "power2",
	Quartic: "power3",
	Quintic: "power4",
	Sinusoidal: "sine",
	Exponential: "expo",
	Circular: "circ",
	Elastic: "elastic",
	Back: "back",
	Bounce: "bounce"
}, ie = {
	In: "in",
	Out: "out",
	InOut: "inOut"
};
function F(e) {
	if (!e) return "none";
	let [t = "", n = ""] = e.split(".");
	if (t === "Linear") return "none";
	let r = P[t], i = ie[n];
	if (!r || !i) throw `異常なease指定です：${e}`;
	return `${r}.${i}`;
}
function I(e, t) {
	if (t.id) return `frm\n${t.id}`;
	let n = t.name ?? t.layer ?? "";
	if (!n) throw `[${e}] トゥイーンが指定されていません（name／layerのどちらも無し）`;
	return n;
}
//#endregion
//#region src/ts/Txt.ts
function L(e) {
	D.setEscape(e);
}
L("");
var R = [
	"span",
	"add",
	"add_close",
	"grp",
	"tcy",
	"link",
	"endlink",
	"del",
	"gotxt"
];
function z(e) {
	if (e === void 0) return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function B(e) {
	let t = e.indexOf("｜");
	if (t < 1) return;
	let n = e.slice(0, t);
	if (!R.includes(n)) return;
	let r = e.slice(t + 1);
	try {
		return {
			cmd: n,
			o: r ? JSON.parse(r) : {}
		};
	} catch {
		return {
			cmd: n,
			o: {}
		};
	}
}
function V(e) {
	let t = [], n = "", r = "", i, a, o, s, c, l = [], u = (e, l, u, d) => {
		let f = n + (s?.style ?? "") + (u?.style ?? ""), p = r + (s?.r_style ?? "") + (u?.r_style ?? ""), m = u?.ch_in_style ?? s?.ch_in_style ?? i, h = u?.ch_out_style ?? s?.ch_out_style ?? a, g = z(u?.wait) ?? z(s?.wait) ?? o, { ra: _, ruby: v } = l ? G(l) : {
			ra: void 0,
			ruby: void 0
		};
		t.push({
			c: e,
			...v ? { r: v } : {},
			..._ ? { ra: _ } : {},
			...f ? { s: f } : {},
			...p ? { rs: p } : {},
			...d ? { tcy: d } : {},
			...c ? { lnk: c } : {},
			...m === void 0 ? {} : { cis: m },
			...h === void 0 ? {} : { cos: h },
			...g === void 0 ? {} : { w: g }
		});
	}, d = new D();
	return d.init((e, d) => {
		let f = d ? B(d) : void 0;
		if (!f) {
			u(e, d);
			return;
		}
		let { o: p } = f;
		switch (f.cmd) {
			case "span":
				n = p.style ?? "", r = p.r_style ?? "", i = p.ch_in_style, a = p.ch_out_style, o = z(p.wait);
				break;
			case "add":
				s = p;
				break;
			case "add_close":
				s = void 0;
				break;
			case "link":
				l.push({
					sty: n,
					rSty: r
				}), n += p.style ?? "", r += p.r_style ?? "", c = {
					label: p.label ?? "",
					fn: p.fn ?? "",
					call: p.call === "true",
					arg: p.arg ?? "",
					...p.url ? { url: p.url } : {},
					...p.style_hover ? { sh: p.style_hover } : {},
					...p.style_clicked ? { sc: p.style_clicked } : {},
					...p.r_style_hover ?? p.style_hover ? { rsh: p.r_style_hover ?? p.style_hover } : {},
					...p.r_style_clicked ?? p.r_style ? { rsc: p.r_style_clicked ?? p.r_style } : {},
					...p.hint ? { hint: p.hint } : {},
					...p.hint_style ? { hs: p.hint_style } : {},
					...p.hint_opt ? { ho: p.hint_opt } : {},
					...p.clickse ? {
						clickse: p.clickse,
						clicksebuf: p.clicksebuf
					} : {},
					...p.enterse ? {
						enterse: p.enterse,
						entersebuf: p.entersebuf
					} : {},
					...p.leavese ? {
						leavese: p.leavese,
						leavesebuf: p.leavesebuf
					} : {}
				};
				break;
			case "endlink": {
				let e = l.pop();
				e && (n = e.sty, r = e.rSty), c = void 0;
				break;
			}
			case "tcy":
				u(p.t ?? "", p.r, p, !0);
				break;
			case "grp": p.pic && (u("　", p.r, p), Object.assign(t.at(-1), {
				pic: p.pic,
				...z(p.width) === void 0 ? {} : { gw: z(p.width) },
				...z(p.height) === void 0 ? {} : { gh: z(p.height) },
				...z(p.x) === void 0 ? {} : { gx: z(p.x) },
				...z(p.y) === void 0 ? {} : { gy: z(p.y) }
			}));
		}
	}), d.putTxt(e), t;
}
function H(e) {
	return e.map((e) => e.c).join("");
}
function U(e) {
	return H(V(e));
}
var W = [
	"start",
	"left",
	"center",
	"right",
	"justify",
	"121",
	"even",
	"1ruby"
];
function G(e) {
	let t = e.indexOf("｜");
	if (t > 0) {
		let n = e.slice(0, t);
		if (W.includes(n)) return {
			ra: n,
			ruby: e.slice(t + 1)
		};
	}
	return { ruby: e };
}
//#endregion
//#region src/ts/Log.ts
var K = 64, q = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), J = (e) => q(e).replaceAll("'", "&#39;");
function Y(e) {
	return ae(V(e));
}
function ae(e) {
	let t = "";
	for (let n of e) {
		if (n.c === "\n") {
			t += "<br/>";
			continue;
		}
		let e = q(n.c), r = n.r ? `<ruby>${e}<rt${n.rs ? ` style='${J(n.rs)}'` : ""}>${q(n.r)}</rt></ruby>` : e, i = (n.s ?? "") + (n.tcy ? "text-combine-upright: all;" : "");
		t += i ? `<span style='${J(i)}'>${r}</span>` : r;
	}
	return t;
}
var oe = class {
	maxLen;
	#e = [];
	#t = "";
	#n = {};
	constructor(e = () => K) {
		this.maxLen = e;
	}
	add(e) {
		this.#t += e;
	}
	setAttr(e) {
		this.#n = e;
	}
	pagebreak() {
		let e = Y(this.#t);
		this.#t = "";
		let t = this.#n;
		if (this.#n = {}, !e) return;
		let n = this.maxLen();
		this.#e.push({
			...t,
			text: e
		}) > n && (this.#e = this.#e.slice(-n));
	}
	reset(e = "") {
		this.#e = [], this.#t = e, this.#n = {};
	}
	json() {
		return JSON.stringify([...this.#e, {
			...this.#n,
			text: Y(this.#t)
		}]);
	}
	playback(e) {
		try {
			let t = JSON.parse(e);
			this.#e = Array.isArray(t) ? t : [];
		} catch {
			this.#e = [];
		}
		this.#t = "", this.#n = {};
	}
}, se = class e {
	static #e = new v();
	static parseTag(t) {
		let [n, r] = b(t);
		e.#e.parse(r);
		let i = {};
		for (let [t, n] of Object.entries(e.#e.hPrm)) i[t] = n.val;
		return {
			name: n,
			args: i
		};
	}
	#t(t) {
		let [n, r] = b(t), i = e.#e;
		i.parse(r);
		let a = i.hPrm, o = a.cond?.val;
		if (o !== void 0) {
			if (!o || o.startsWith("&")) throw "属性condは「&」が不要です";
			let e = this.#k.parse(o), t = String(e);
			if (!e || t === "null" || t === "undefined" || t === "false") return;
		}
		let s = this.#P.at(-1), c = Object.create(null);
		if (i.isKomeParam) {
			if (!s) throw "属性「*」はマクロのみ有効です";
			Object.assign(c, s.hArgs);
		}
		for (let [e, { val: t, def: n }] of Object.entries(a)) {
			let r = t;
			if (r.startsWith("%")) {
				if (!s) throw "属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";
				let t = s.hArgs[r.slice(1)];
				if (t) {
					c[e] = t;
					continue;
				}
				if (n === void 0 || n === "null") continue;
				r = n;
			}
			if (r = this.#k.getValAmpersand(r), r !== "undefined") {
				c[e] = r;
				continue;
			}
			n !== void 0 && (r = this.#k.getValAmpersand(n), r !== "undefined" && (c[e] = r));
		}
		return {
			name: n,
			args: c
		};
	}
	static #n(e, t, n) {
		let r = n.trim() === "" ? NaN : n.startsWith("0x") ? parseInt(n.slice(2), 16) : Number(n);
		if (!Number.isFinite(r)) throw `[${e}] ${t}の値が不正です：${n}`;
		return r;
	}
	#r(t, n, r) {
		let i = e.#n(t, n, r);
		if (i <= -1 || i >= 1) return i;
		let a = Number(this.#O.get(n === "left" ? "tmp:const.sn.config.window.width" : "tmp:const.sn.config.window.height"));
		return Number.isFinite(a) ? i * a : i;
	}
	static #i(t, n, r, i) {
		return r === void 0 ? i : e.#n(t, n, r);
	}
	static #a(e) {
		return e < 0 ? 0 : e > 1 ? 1 : e;
	}
	static #o = 999e3;
	static #s(e, t) {
		let { reg: n, flags: r } = t;
		if (!n) throw `[${e}] regは必須です`;
		return r ? new RegExp(n, r) : new RegExp(n);
	}
	static #c(e) {
		let t = (e ?? "").split(",").map((e) => e.trim()).filter((e) => e !== "");
		return t.length > 0 ? t : null;
	}
	static #l = {
		fill: "color",
		fontSize: "font-size",
		fontFamily: "font-family",
		fontWeight: "font-weight",
		fontStyle: "font-style",
		align: "text-align",
		letterSpacing: "letter-spacing",
		lineHeight: "line-height"
	};
	static #u(t) {
		if (!t.trimStart().startsWith("{")) return t;
		let n;
		try {
			n = JSON.parse(t);
		} catch {
			return t;
		}
		return Object.entries(n).map(([t, n]) => {
			let r = e.#l[t];
			return r ? `${r}: ${typeof n == "number" && r !== "line-height" && r !== "font-weight" ? `${String(n)}px` : String(n)};` : "";
		}).join("");
	}
	static #d = [
		"alpha",
		"x",
		"y",
		"width",
		"height",
		"scale_x",
		"scale_y",
		"rotate"
	];
	static #f = [
		"width",
		"height",
		"rotation",
		"pivot_x",
		"pivot_y",
		"scale_x",
		"scale_y",
		"alpha"
	];
	static #p(t, n) {
		let r = {};
		n.visible !== void 0 && (r.visible = n.visible !== "false");
		for (let i of e.#d) {
			let a = n[i];
			a !== void 0 && Object.assign(r, { [i]: e.#n(t, i, a) });
		}
		return n.b_color !== void 0 && (r.b_color = n.b_color), r;
	}
	static #m(e, t, n) {
		let r = t.path ? N(e, t.path, n) : void 0;
		return {
			...r?.length ? { aPath: r } : {},
			...t.chain ? { chain: t.chain } : {}
		};
	}
	static argPage(e, t) {
		let n = e.page ?? t;
		if (n === "fore" || n === "back") return n;
		throw `属性 page【${n}】が不正です`;
	}
	static #h(e, t, n) {
		let r = t.page ?? n;
		if (r === "fore" || r === "back" || r === "both") return r;
		throw `[${e}] 属性 page【${r}】が不正です`;
	}
	#g;
	#_ = 0;
	#v = "mes";
	#y = Object.create(null);
	#b = Object.create(null);
	#x(e) {
		return e === "back" ? this.#b : this.#y;
	}
	#S = !1;
	get clearOnResume() {
		return this.#S;
	}
	set clearOnResume(e) {
		this.#S = e;
	}
	#C = Object.create(null);
	#w = Object.create(null);
	#T(e, t) {
		this.#w[e] = t, this.#O.set("save:const.sn.loopPlaying", JSON.stringify(this.#w));
	}
	#E(e) {
		e in this.#w && (delete this.#w[e], this.#O.set(`save:const.sn.sound.${e}.fn`, "")), this.#O.set("save:const.sn.loopPlaying", JSON.stringify(this.#w));
	}
	#D = 1;
	resetVolMulTalking() {
		this.#D = 1;
	}
	#O = new C();
	#k = new ne(this.#O);
	#A = new oe(() => {
		let e = Number(this.#O.get("tmp:const.sn.config.log.max_len"));
		return Number.isFinite(e) && e > 0 ? e : 64;
	});
	get #j() {
		return this.#O.get("game:sn.doRecLog") === !0;
	}
	get chWait() {
		let e = this.#O.get("tmp:const.sn.isKidoku") === !0;
		if (this.#O.get(e ? "sys:sn.tagCh.doWait_Kidoku" : "sys:sn.tagCh.doWait") === !1) return 0;
		let t = Number(this.#O.get(e ? "sys:sn.tagCh.msecWait_Kidoku" : "sys:sn.tagCh.msecWait"));
		return Number.isFinite(t) && t >= 0 ? t : 10;
	}
	#M = {
		in: /* @__PURE__ */ new Set(["default"]),
		out: /* @__PURE__ */ new Set(["default"])
	};
	#N = [];
	#P = [];
	#F = Object.create(null);
	#I = Object.create(null);
	#L = Object.create(null);
	#R = !1;
	#z = Object.create(null);
	static REG_NG4MAC_NM = /["'#;\\\]　]+/;
	static RESERVED_TAGS = /* @__PURE__ */ new Set(/* @__PURE__ */ "add_lay.current.add_face.lay.clear_lay.trans.wt.finish_trans.set_cancel_skip.let.let_ml.endlet_ml.let_abs.let_char_at.let_index_of.let_length.let_replace.let_round.let_search.let_substr.tsy.tsy_frame.wait_tsy.stop_tsy.pause_tsy.resume_tsy.quake.stop_quake.wq.title.toggle_full_screen.dump_lay.dump_val.dump_stack.pop_stack.clear_text.rec_ch.rec_r.reset_rec.ch_in_style.ch_out_style.autowc.navigate_to.loadplugin.snapshot.close.update_check.window.record_place.save.load.reload_script.copybookmark.erasebookmark.export.import.add_frame.frame.set_frame.let_frame.set_focus.add_filter.clear_filter.enable_filter.if.elsif.else.endif.r.er.trace.log.jump.call.return.macro.endmacro.char2macro.bracket2macro.button.event.clear_event.enable_event.clearvar.clearsysvar.page.wait.waitclick.l.p.s.fadebgm.fadeoutbgm.fadeoutse.fadese.playbgm.playse.stop_allse.stopbgm.stopfadese.stopse.volume.wb.wf.wl.ws.xchgbuf.wv".split("."));
	#B() {
		let t = Object.create(null);
		for (let n of e.RESERVED_TAGS) t[n] = !0;
		for (let e in this.#z) t[e] = !0;
		return t;
	}
	constructor(e, t = "") {
		this.#g = e instanceof E ? e : new E(e, t), this.#O.defBuiltin("const.sn.scriptFn", () => this.fn), this.#O.defBuiltin("const.sn.isKidoku", () => this.#R), this.#O.defBuiltin("const.sn.displayState", () => this.#V), this.#O.defBuiltin("const.Date.getDateStr", () => d()), this.#O.defBuiltin("const.Date.getTime", () => (/* @__PURE__ */ new Date()).getTime()), this.#O.defBuiltin("const.sn.last_page_plain_text", () => U(this.#y[this.#v] ?? "")), this.#O.defBuiltin("const.sn.last_page_text", () => this.#y[this.#v] ?? ""), this.#O.defBuiltin("const.sn.log.json", () => this.#A.json()), this.#O.defBuiltin("const.sn.key.alternate", () => this.#H.Alt === !0), this.#O.defBuiltin("const.sn.key.command", () => this.#H.Meta === !0), this.#O.defBuiltin("const.sn.key.control", () => this.#H.Control === !0), this.#O.defBuiltin("const.sn.key.end", () => this.#H.End === !0), this.#O.defBuiltin("const.sn.key.escape", () => this.#H.Escape === !0), this.#O.defBuiltin("const.sn.key.back", () => !1), this.#O.defBuiltin("const.sn.Math.PI", () => Math.PI), this.#O.defBuiltin("const.sn.aIfStk.length", () => this.#N.length), this.#O.defBuiltin("const.sn.vctCallStk.length", () => this.#P.length), this.#O.set("save:const.sn.mesLayer", this.#v);
	}
	#V = !1;
	setFullScr(e) {
		this.#V = e;
	}
	#H = Object.create(null);
	setKeyDown(e, t) {
		this.#H[e] = t;
	}
	clearKeyDown() {
		this.#H = Object.create(null);
	}
	switchScript(e, t = "", n = 0) {
		if (this.#g = e, !t) {
			this.#_ = n;
			return;
		}
		let r = e.label2idx(t);
		if (r === void 0) throw `ラベル【${t}】がスクリプト【${e.fn}】に見つかりません`;
		this.#_ = r;
	}
	getVal(e) {
		return this.#O.get(e);
	}
	setValNochk(e, t) {
		this.#O.set(e, t);
	}
	defSetTrigger(e, t) {
		this.#O.defSetTrigger(e, t);
	}
	defSetTriggerSoundVol(e) {
		this.#O.defSetTriggerSoundVol(e);
	}
	defBuiltin(e, t) {
		this.#O.defBuiltin(e, t);
	}
	get fn() {
		return this.#g.fn;
	}
	get idx() {
		return this.#_;
	}
	get lineNum() {
		return this.#g.aLNum[Math.min(this.#_, this.#g.len - 1)] ?? NaN;
	}
	get atEnd() {
		return this.#_ >= this.#g.len;
	}
	peekUpcomingPicFn() {
		let t = [], n = new Map(Object.entries(this.#C).map(([e, t]) => [e, t.fn]));
		for (let r = this.#_; r < this.#g.len; ++r) {
			let i = this.#g.aToken[r];
			if (i.charCodeAt(0) !== 91) continue;
			let { name: a, args: o } = e.parseTag(i);
			if (a === "l" || a === "p" || a === "s" || a === "waitclick") break;
			if (a === "add_face") {
				o.name && n.set(o.name, o.fn || o.name);
				continue;
			}
			if (a !== "lay") continue;
			let s = o.fn || o.pic;
			if (s && !s.startsWith("&") && !s.startsWith("%") && t.push(s), o.face) for (let e of o.face.split(",")) {
				let r = n.get(e);
				r && t.push(r);
			}
		}
		return t;
	}
	jumpToLabel(e) {
		let t = this.#g.label2idx(e);
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#_ = t;
	}
	callToLabel(e) {
		let t = this.#g.label2idx(e);
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#X(--this.#_), this.#_ = t;
	}
	callToScript(e, t = "") {
		this.#X(--this.#_), this.switchScript(e, t);
	}
	nowScrIdx() {
		let e = this.#P[0];
		return e ? {
			fn: e.fn,
			idx: e.returnIdx
		} : {
			fn: this.fn,
			idx: this.#_
		};
	}
	recordPlace() {
		let { fn: e, idx: t } = this.nowScrIdx();
		this.#O.set("save:const.sn.scriptFn", e), this.#O.set("save:const.sn.scriptIdx", t);
	}
	nowMarkPart() {
		return this.#O.set("save:const.sn.sLog", this.#A.json()), {
			hSave: this.#O.cloneNs("game"),
			aIfStk: this.#N.slice(this.#P.length),
			hTxt: { ...this.#y },
			hTxtBk: { ...this.#b }
		};
	}
	restoreMarkPart(e) {
		this.#O.setNs("game", e.hSave), this.#y = { ...e.hTxt }, this.#b = { ...e.hTxtBk }, this.#v = String(this.#O.get("save:const.sn.mesLayer") ?? this.#v), this.#A.playback(String(this.#O.get("save:const.sn.sLog") ?? "[]")), this.#O.setMp({}), this.#N.length = 0, this.#N.push(...e.aIfStk), this.#P.length = 0, this.clearEvent();
		for (let e of Object.keys(this.#w)) delete this.#w[e];
		try {
			let e = JSON.parse(String(this.#O.get("save:const.sn.loopPlaying", "{}")));
			Object.assign(this.#w, e);
		} catch {}
	}
	cloneSys() {
		return this.#O.cloneNs("sys");
	}
	setSys(e) {
		this.#O.setNs("sys", e);
	}
	transDone(e) {
		for (let t of Object.keys(this.#y)) e && !e.includes(t) || (this.#y[t] = this.#b[t] ?? "");
	}
	get isKidoku() {
		return this.#R;
	}
	#U() {
		let e = this.#L[this.fn] ??= new O();
		if (this.#P.length > 0) {
			e.record(this.#_);
			return;
		}
		this.#R = e.search(this.#_), !this.#R && e.record(this.#_);
	}
	#W() {
		this.#L[this.fn]?.erase(this.#_), this.#R = !1;
	}
	getKidoku() {
		let e = {};
		for (let [t, n] of Object.entries(this.#L)) e[t] = n.val();
		return e;
	}
	setKidoku(e) {
		for (let e in this.#L) delete this.#L[e];
		this.#R = !1;
		for (let [t, n] of Object.entries(e)) this.#L[t] = O.from(n);
	}
	clearKidoku() {
		for (let e of Object.values(this.#L)) e.clear();
		this.#R = !1;
	}
	get autoEnabled() {
		return this.#G("sn.auto.enabled");
	}
	get skipEnabled() {
		return this.#G("sn.skip.enabled");
	}
	get skipAll() {
		return this.#G("sn.skip.all");
	}
	#G(e) {
		return this.#O.get(`tmp:${e}`) === !0;
	}
	get tagLEnabled() {
		return this.#O.get("tmp:sn.tagL.enabled") !== !1;
	}
	cancelAutoSkip() {
		this.#O.set("tmp:sn.skip.enabled", !1), this.#O.set("tmp:sn.skip.all", !1), this.#O.set("tmp:sn.auto.enabled", !1), this.tagLEnabled || this.#O.set("tmp:sn.tagL.enabled", !0);
	}
	get isNextKidoku() {
		let e = this.fn, t = this.#_, n = this.#g.len, r = this.#P.at(-1);
		return r && (e = r.fn, t = r.returnIdx, n = r.scr.len), t >= n ? !1 : this.#L[e]?.search(t) ?? !1;
	}
	#K(e) {
		if (e === "s" || e === "waitclick") {
			this.cancelAutoSkip();
			return;
		}
		if (this.autoEnabled) return {
			mode: "auto",
			msec: this.#J(e === "p")
		};
		if (this.skipEnabled) {
			if (!this.skipAll && !this.isNextKidoku) {
				this.cancelAutoSkip();
				return;
			}
			return e === "p" && this.#q() !== "s" ? void 0 : {
				mode: "skip",
				msec: 0
			};
		}
	}
	#q() {
		let e = this.#O.get("sys:sn.skip.mode");
		return e == null ? "s" : String(e);
	}
	#J(e) {
		let t = e ? "sn.auto.msecPageWait" : "sn.auto.msecLineWait", n = Number(this.#O.get(`sys:${t}${this.isKidoku ? "_Kidoku" : ""}`));
		return Number.isFinite(n) && n > 0 ? n : e ? 3500 : 500;
	}
	getEvent(e) {
		let t = e.toLowerCase();
		return this.#F[t] ?? this.#I[t];
	}
	clearEvent(e = !1) {
		if (!e) {
			this.#F = Object.create(null);
			return;
		}
		for (let e in this.#I) delete this.#I[e];
	}
	#Y() {
		let e = this.#F;
		return this.#F = Object.create(null), e;
	}
	beginEvent(e) {
		let t = this.getEvent(e);
		if (t) return this.#O.set("tmp:sn.eventArg", t.arg), this.#O.set("tmp:sn.eventLabel", t.label), t.call || this.clearEvent(), t;
	}
	#X(e, t = !0, n = {}) {
		this.#P.push({
			fn: this.fn,
			returnIdx: e,
			lenIfStk: this.#N.length,
			hMp: this.#O.cloneMp(),
			hArgs: n,
			scr: this.#g,
			...t ? { hEvt: this.#Y() } : {}
		}), this.#N.push(-1);
	}
	step() {
		let e = [];
		for (this.#S && (this.#S = !1, this.#se(), this.#y[this.#v] = "", e.push({
			t: "chgStr",
			nm: this.#v,
			page: "fore",
			str: ""
		})); this.#_ < this.#g.len;) {
			this.#U();
			let t = this.#g.aToken[this.#_++], n = t.charCodeAt(0);
			if (n === 9 || n === 10) continue;
			if (n === 91) {
				let n = this.#t(t);
				if (!n) continue;
				let { name: r, args: i } = n;
				if (this.#Q(r, i, e) === "stop") return e;
				continue;
			}
			let r = t, i = this.#g.grm.ce;
			if (i && t.length > 1 && t.startsWith(i)) r = t.slice(1);
			else if (n === 38) {
				if (!t.endsWith("&")) {
					this.#Z(t);
					continue;
				}
				if (t.charAt(1) === "&") throw "「&表示&」書式では「&」指定が不要です";
				let e = this.#k.parse(t.slice(1, -1));
				r = e == null ? "" : String(e);
			} else if (n === 59) continue;
			else if (n === 42 && t.length > 1) continue;
			this.#oe(e, r);
		}
		return e;
	}
	#Z(e) {
		let { name: t, text: n, cast: r } = ee(e.slice(1));
		this.#O.set(this.#k.getValAmpersand(t.trim()), this.#k.parse(n), r ?? "");
	}
	#Q(t, n, o) {
		let l = this.#g.len;
		switch (t) {
			case "add_lay": {
				let e = n.layer ?? n.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (n.class ?? "txt").toLowerCase() === "grp" ? "grp" : "txt";
				return this.#y[e] = "", this.#b[e] = "", t === "txt" && this.#O.set(`save:const.sn.layer.${e}.enabled`, !0), o.push({
					t: "addLay",
					cls: t,
					nm: e
				}), "skip";
			}
			case "current": {
				let e = n.layer ?? n.nm ?? this.#v;
				return e !== this.#v && this.#se(), this.#v = e, this.#O.set("save:const.sn.mesLayer", this.#v), "skip";
			}
			case "add_face": {
				let e = n.name ?? "";
				if (!e) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#C[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
				return this.#C[e] = {
					fn: n.fn || e,
					dx: Number(n.dx || "0"),
					dy: Number(n.dy || "0"),
					blendmode: s(n.blendmode || "normal")
				}, "skip";
			}
			case "lay": {
				let t = e.argPage(n, "fore"), r = n.fn || n.pic;
				if (r) {
					let e = {
						t: "chgPic",
						nm: n.layer ?? "",
						page: t,
						fn: r
					};
					if (n.face !== void 0) {
						let t = [];
						if (n.face) for (let e of n.face.split(",")) {
							if (!e) throw "[lay] face属性に空要素が含まれています";
							let n = this.#C[e];
							if (!n) throw `[lay] face【${e}】は[add_face]で未定義です`;
							t.push(n);
						}
						e.aFace = t;
					}
					o.push(e);
				}
				if (n.back_clear !== void 0) n.back_clear === "true" && o.push({
					t: "chgBackClear",
					nm: n.layer ?? "",
					page: t
				});
				else {
					if (n.b_alpha !== void 0 || n.b_alpha_isfixed !== void 0) {
						let e = {
							t: "chgBAlpha",
							nm: n.layer ?? "",
							page: t
						};
						if (n.b_alpha !== void 0) {
							let t = Number(n.b_alpha);
							if (Number.isNaN(t)) throw `[lay] b_alphaの値が不正です：${n.b_alpha}`;
							e.b_alpha = Math.min(1, Math.max(0, t));
						}
						n.b_alpha_isfixed !== void 0 && (e.isFixed = n.b_alpha_isfixed !== "false"), o.push(e);
					}
					n.b_pic !== void 0 && o.push({
						t: "chgBPic",
						nm: n.layer ?? "",
						page: t,
						fn: n.b_pic
					});
				}
				let a = {};
				if (n.visible !== void 0 && (a.visible = n.visible !== "false"), n.alpha !== void 0 && (a.alpha = e.#n("lay", "alpha", n.alpha)), n.pos !== void 0 && n.pos !== "stay") {
					let t = n.pos, r = Number(this.#O.get("tmp:const.sn.config.window.width")), i = Number(this.#O.get("tmp:const.sn.config.window.height"));
					t === "" || t === "c" ? (a.left = r / 2, a.align_x = "center") : t === "l" ? a.left = 0 : t === "r" ? (a.left = r, a.align_x = "right") : (a.left = e.#n("lay", "pos", t), a.align_x = "center"), a.top = i, a.align_y = "bottom";
				} else n.left === void 0 ? n.center === void 0 ? n.right === void 0 ? n.s_right !== void 0 && (a.s_right = this.#r("lay", "left", n.s_right)) : (a.left = this.#r("lay", "left", n.right), a.align_x = "right") : (a.left = this.#r("lay", "left", n.center), a.align_x = "center") : a.left = this.#r("lay", "left", n.left), n.top === void 0 ? n.middle === void 0 ? n.bottom === void 0 ? n.s_bottom !== void 0 && (a.s_bottom = this.#r("lay", "top", n.s_bottom)) : (a.top = this.#r("lay", "top", n.bottom), a.align_y = "bottom") : (a.top = this.#r("lay", "top", n.middle), a.align_y = "middle") : a.top = this.#r("lay", "top", n.top);
				if (n.width !== void 0 && (a.width = e.#n("lay", "width", n.width)), n.height !== void 0 && (a.height = e.#n("lay", "height", n.height)), n.rotation !== void 0 && (a.rotation = e.#n("lay", "rotation", n.rotation)), n.scale_x !== void 0 && (a.scale_x = e.#n("lay", "scale_x", n.scale_x)), n.scale_y !== void 0 && (a.scale_y = e.#n("lay", "scale_y", n.scale_y)), n.pivot_x !== void 0 && (a.pivot_x = e.#n("lay", "pivot_x", n.pivot_x)), n.pivot_y !== void 0 && (a.pivot_y = e.#n("lay", "pivot_y", n.pivot_y)), n.blendmode !== void 0 && (a.blendmode = s(n.blendmode)), n.b_color !== void 0 && n.back_clear !== "true" && (a.b_color = e.#n("lay", "b_color", n.b_color)), n.style !== void 0 && (a.style = n.style), n.pl !== void 0 && (a.pl = e.#n("lay", "pl", n.pl)), n.pr !== void 0 && (a.pr = e.#n("lay", "pr", n.pr)), n.pt !== void 0 && (a.pt = e.#n("lay", "pt", n.pt)), n.pb !== void 0 && (a.pb = e.#n("lay", "pb", n.pb)), n.ffs !== void 0 && (a.ffs = n.ffs), n.noffs !== void 0 && (a.noffs = n.noffs), n.bura !== void 0 && (a.bura = n.bura !== "false"), n.kinsoku_sol !== void 0 && (a.kinsoku_sol = n.kinsoku_sol), n.kinsoku_eol !== void 0 && (a.kinsoku_eol = n.kinsoku_eol), n.kinsoku_dns !== void 0 && (a.kinsoku_dns = n.kinsoku_dns), n.kinsoku_bura !== void 0 && (a.kinsoku_bura = n.kinsoku_bura), D.setting(n), n.r_align !== void 0) {
					if (!W.includes(n.r_align)) throw `[lay] r_alignの値が不正です：${n.r_align}`;
					a.r_align = n.r_align;
				}
				n.in_style !== void 0 && (a.in_style = n.in_style), n.out_style !== void 0 && (a.out_style = n.out_style), Object.keys(a).length > 0 && o.push({
					t: "chgLay",
					nm: n.layer ?? "",
					page: t,
					sty: a
				});
				let c = n.layer ?? "";
				if ((n.float ?? "false") !== "false") o.push({
					t: "moveLay",
					nm: c,
					mode: "float"
				});
				else if (n.index) {
					let t = e.#n("lay", "index", n.index);
					t && o.push({
						t: "moveLay",
						nm: c,
						mode: "index",
						index: t
					});
				} else n.dive && o.push({
					t: "moveLay",
					nm: c,
					mode: "dive",
					dive: n.dive
				});
				return n.filter !== void 0 && o.push({
					t: "addFilter",
					aLayNm: [c],
					page: t,
					flt: i(n),
					replace: !0
				}), "skip";
			}
			case "add_filter": return o.push({
				t: "addFilter",
				aLayNm: e.#c(n.layer),
				page: e.#h("add_filter", n, "fore"),
				flt: i(n),
				replace: !1
			}), "skip";
			case "clear_filter": return o.push({
				t: "clearFilter",
				aLayNm: e.#c(n.layer),
				page: e.#h("clear_filter", n, "fore")
			}), "skip";
			case "enable_filter": return o.push({
				t: "enableFilter",
				aLayNm: e.#c(n.layer),
				page: e.#h("enable_filter", n, "fore"),
				index: e.#i("enable_filter", "index", n.index, 0),
				enabled: (n.enabled ?? "true") !== "false"
			}), "skip";
			case "clear_lay": {
				let t = n.page ?? "back";
				if (t !== "fore" && t !== "back" && t !== "both") throw `属性 page【${t}】が不正です`;
				let r = e.#c(n.layer);
				if (n.layer !== void 0 && r === null) throw "[clear_lay] layer属性が空です";
				if (t !== "back") if ((!r || r.includes(this.#v)) && this.#se(), r) for (let e of r) this.#y[e] = "";
				else for (let e of Object.keys(this.#y)) this.#y[e] = "";
				if (t !== "fore") if (r) for (let e of r) this.#b[e] = "";
				else for (let e of Object.keys(this.#b)) this.#b[e] = "";
				return o.push({
					t: "clearLay",
					aLayNm: r,
					page: t
				}), "skip";
			}
			case "trans": {
				let t = n.layer ?? "", r = t ? t.split(",").map((e) => e.trim()).filter((e) => e !== "") : null;
				if (r?.length === 0) throw "[trans] layer属性が空です";
				let i = Number(n.time ?? "0");
				if (!Number.isFinite(i) || i < 0) throw `[trans] timeの値が不正です：${n.time ?? ""}`;
				if (n.glsl !== void 0) throw "[trans] glsl=はサポートされません（WebGLシェーダを使わないため）";
				return o.push({
					t: "trans",
					aLayNm: r,
					time: this.skipEnabled ? 0 : i,
					...n.rule === void 0 ? {} : { rule: n.rule },
					...n.vague === void 0 ? {} : { vague: e.#n("trans", "vague", n.vague) }
				}), "skip";
			}
			case "wt": return o.push({
				t: "waitTrans",
				canskip: (n.canskip ?? "true") !== "false"
			}), "stop";
			case "finish_trans": return o.push({ t: "finishTrans" }), "skip";
			case "set_cancel_skip": return "skip";
			case "quake": {
				let t = this.skipEnabled ? 0 : e.#n("quake", "time", n.time ?? "");
				return t <= 0 || o.push({
					t: "quake",
					msec: t,
					hmax: u(e.#i("quake", "hmax", n.hmax, 10)),
					vmax: u(e.#i("quake", "vmax", n.vmax, 10))
				}), "skip";
			}
			case "stop_quake": return o.push({ t: "stopQuake" }), "skip";
			case "wq": return o.push({
				t: "waitQuake",
				canskip: (n.canskip ?? "true") !== "false"
			}), "stop";
			case "tsy": {
				let { layer: t } = n;
				if (!t) throw "[tsy] layerは必須です";
				let r = this.skipEnabled, a = r ? 0 : e.#n("tsy", "time", n.time ?? ""), s = r ? 0 : e.#i("tsy", "delay", n.delay, 0), c = e.#i("tsy", "repeat", n.repeat, 1), l = e.argPage(n, "fore");
				return n.filter !== void 0 && o.push({
					t: "addFilter",
					aLayNm: [t],
					page: l,
					flt: i(n),
					replace: !0
				}), o.push({
					t: "tsy",
					tw_nm: I("tsy", n),
					nm: t,
					page: l,
					msec: a,
					delay: s,
					ease: F(n.ease),
					repeat: c > 0 ? c - 1 : -1,
					yoyo: (n.yoyo ?? "false") !== "false",
					hTo: j("tsy", n),
					backlay: (n.backlay ?? "false") !== "false",
					...e.#m("tsy", n)
				}), "skip";
			}
			case "tsy_frame": {
				let { id: t } = n;
				if (!t) throw "[tsy_frame] idは必須です";
				this.#$("tsy_frame", t);
				let r = this.skipEnabled, i = e.#i("tsy_frame", "repeat", n.repeat, 1);
				return o.push({
					t: "tsyFrame",
					tw_nm: I("tsy_frame", n),
					id: t,
					msec: r ? 0 : e.#n("tsy_frame", "time", n.time ?? ""),
					delay: r ? 0 : e.#i("tsy_frame", "delay", n.delay, 0),
					ease: F(n.ease),
					repeat: i > 0 ? i - 1 : -1,
					yoyo: (n.yoyo ?? "false") !== "false",
					hTo: j("tsy_frame", n, A),
					...e.#m("tsy_frame", n, A)
				}), "skip";
			}
			case "wait_tsy": return o.push({
				t: "waitTsy",
				tw_nm: I("wait_tsy", n),
				canskip: (n.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return o.push({
				t: "stopTsy",
				tw_nm: I("stop_tsy", n)
			}), "skip";
			case "pause_tsy": return o.push({
				t: "pauseTsy",
				tw_nm: I("pause_tsy", n),
				paused: !0
			}), "skip";
			case "resume_tsy": return o.push({
				t: "pauseTsy",
				tw_nm: I("resume_tsy", n),
				paused: !1
			}), "skip";
			case "let":
				if (n.text === void 0) throw `[let] textは必須です（name:${n.name ?? ""}）`;
				return this.#ee("let", n, n.text), "skip";
			case "let_abs": {
				let t = e.#i("let_abs", "text", n.text, 0);
				return this.#ee("let_abs", n, String(t < 0 ? -t : t)), "skip";
			}
			case "let_round": {
				let t = e.#i("let_round", "text", n.text, 0);
				return this.#ee("let_round", n, String(Math.round(t))), "skip";
			}
			case "let_length": return this.#ee("let_length", n, String((n.text ?? "").length)), "skip";
			case "let_char_at": {
				let t = e.#i("let_char_at", "pos", n.pos, 0);
				return this.#ee("let_char_at", n, (n.text ?? "").charAt(t)), "skip";
			}
			case "let_index_of": {
				let { val: t } = n;
				if (!t) throw "[let_index_of] valは必須です";
				let r = e.#i("let_index_of", "start", n.start, 0);
				return this.#ee("let_index_of", n, String((n.text ?? "").indexOf(t, r))), "skip";
			}
			case "let_substr": {
				let t = e.#i("let_substr", "pos", n.pos, 0), r = n.text ?? "";
				return this.#ee("let_substr", n, n.len === "all" ? r.slice(t) : r.slice(t, t + c(e.#i("let_substr", "len", n.len, 1)))), "skip";
			}
			case "let_replace": return this.#ee("let_replace", n, (n.text ?? "").replace(e.#s("let_replace", n), String(n.val))), "skip";
			case "let_search": return this.#ee("let_search", n, String((n.text ?? "").search(e.#s("let_search", n)))), "skip";
			case "let_ml": {
				let e = n.name ?? "";
				if (!e) throw "[let_ml] nameは必須です";
				let t = "";
				for (; this.#_ < l && (t = this.#g.aToken[this.#_], t === ""); ++this.#_);
				if (this.#g.grm.testTagEndLetml(t)) return this.#O.set(e, "", "str"), ++this.#_, "skip";
				if (!this.#g.grm.testTagEndLetml(this.#g.aToken[this.#_ + 1] ?? "")) throw `[let_ml] 変数【${e}】の終端・[endlet_ml]がありません`;
				return this.#O.set(e, t, "str"), this.#_ += 2, "skip";
			}
			case "endlet_ml": return "skip";
			case "if": return this.#te(n), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#ne(), "skip";
			case "r": {
				let { nm: e, page: t } = this.#ae(n);
				return this.#oe(o, "\n", !0, e, t), "skip";
			}
			case "er": return (n.rec_page_break ?? "true") !== "false" && this.#se(), this.#y[this.#v] = "", this.#b[this.#v] = "", o.push({
				t: "chgStr",
				nm: this.#v,
				page: "both",
				str: ""
			}), o.push({
				t: "clearTxtLay",
				nm: this.#v,
				page: "both",
				clearFilter: n.clear_filter === "true"
			}), "skip";
			case "span": {
				let { nm: t, page: r } = this.#ae(n);
				return this.#oe(o, e.#ie("span", {
					...n,
					layer: void 0,
					page: void 0
				}), !0, t, r), "skip";
			}
			case "link": {
				if (!n.url && !n.label && !n.fn) throw "[link] fn・label・urlのいずれかは必須です";
				n.clickse !== void 0 && (n.clicksebuf = n.clicksebuf || "SYS"), n.enterse !== void 0 && (n.entersebuf = n.entersebuf || "SYS"), n.leavese !== void 0 && (n.leavesebuf = n.leavesebuf || "SYS");
				let { nm: t, page: r } = this.#ae(n);
				return this.#oe(o, e.#ie("link", {
					...n,
					layer: void 0,
					page: void 0
				}), !0, t, r), "skip";
			}
			case "endlink": {
				let { nm: t, page: r } = this.#ae(n);
				return this.#oe(o, e.#ie("endlink", {}), !0, t, r), "skip";
			}
			case "graph": {
				if (!n.pic) throw "[graph] picは必須です";
				let { nm: t, page: r } = this.#ae(n);
				return this.#oe(o, e.#ie("grp", {
					...n,
					layer: void 0,
					page: void 0
				}), !0, t, r), "skip";
			}
			case "tcy": {
				if (!n.t) throw "[tcy] tは必須です";
				let { nm: t, page: r } = this.#ae(n);
				return this.#oe(o, e.#ie("tcy", {
					...n,
					layer: void 0,
					page: void 0
				}), !0, t, r), "skip";
			}
			case "ruby2":
			case "ch": {
				if (t === "ruby2") {
					if (!n.t) throw "[ruby2] tは必須です";
					if (!n.r) throw "[ruby2] rは必須です";
					n.text = `｜${encodeURIComponent(n.t)}《${encodeURIComponent(n.r)}》`, delete n.t, delete n.r;
				}
				let { text: r } = n;
				if (!r) throw `[${t}] textは必須です`;
				let { nm: i, page: a } = this.#ae(n);
				return this.#oe(o, e.#ie("add", {
					...n,
					text: void 0,
					layer: void 0,
					page: void 0
				}) + r.replaceAll("[r]", "\n") + e.#ie("add_close", {}), n.record !== "false", i, a), "skip";
			}
			case "autowc": {
				let t = n.enabled === void 0 ? this.#O.get("game:const.sn.autowc.enabled") === !0 : n.enabled !== "false";
				this.#O.set("save:const.sn.autowc.enabled", t);
				let { text: r } = n;
				if ("text" in n != "time" in n) throw "[autowc] textとtimeは同時指定必須です";
				if (this.#O.set("save:const.sn.autowc.text", r ?? ""), !r) return this.#O.set("save:const.sn.autowc.time", ""), o.push({
					t: "autowc",
					enabled: t,
					hWait: {}
				}), "skip";
				let i = Array.from(r), a = String(n.time ?? "").split(",");
				if (a.length !== i.length) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
				let s = {};
				return i.forEach((t, n) => {
					s[t] = u(e.#n("autowc", "time", a[n] ?? ""));
				}), this.#O.set("save:const.sn.autowc.time", n.time ?? ""), o.push({
					t: "autowc",
					enabled: t,
					hWait: s
				}), "skip";
			}
			case "ch_in_style":
			case "ch_out_style": {
				let e = t === "ch_in_style" ? "in" : "out", { name: i, sty: a } = r(t, n, e === "in");
				if (this.#M[e].has(i)) throw `[${t}] name【${i}】はすでにあります`;
				return this.#M[e].add(i), o.push({
					t: "defChStyle",
					kind: e,
					nm: i,
					sty: a
				}), "skip";
			}
			case "rec_ch": {
				let { text: t, ...r } = n;
				return t ? (Object.keys(r).length && this.#A.setAttr(r), this.#A.add(e.#ie("add", {
					...n,
					text: void 0
				}) + t.replaceAll("[r]", "\n") + e.#ie("add_close", {})), "skip") : "skip";
			}
			case "rec_r": return this.#A.add("\n"), "skip";
			case "reset_rec": return this.#A.reset(n.text ?? ""), "skip";
			case "trace": return o.push({
				t: "trace",
				text: n.text ?? ""
			}), "skip";
			case "log": return o.push({
				t: "log",
				text: n.text ?? "",
				fn: this.fn,
				lineNum: this.lineNum
			}), "skip";
			case "jump": {
				n.count === "false" && this.#W();
				let e = n.label ?? "", t = n.fn ?? "";
				if (!e && !t) throw "[jump] fnまたはlabelは必須です";
				if (t && t !== this.fn) return o.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let r = this.#g.label2idx(e);
				if (r === void 0) throw `[jump] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#_ = r, "skip";
			}
			case "call": {
				n.count !== "true" && this.#W();
				let e = n.label ?? "", t = n.fn ?? "";
				if (!e && !t) throw "[call] fnまたはlabelは必須です";
				if (t && t !== this.fn) return this.#X(this.#_, !0, n), o.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let r = this.#g.label2idx(e);
				if (r === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#X(this.#_, !0, n), this.#_ = r, "skip";
			}
			case "return": return this.#re(o, n);
			case "macro": {
				let t = n.name ?? "";
				if (!t) throw "[macro] nameは必須です（試作仕様）";
				if (e.RESERVED_TAGS.has(t)) throw `[${t}]はタグ名のため、マクロ名として使用できません`;
				if (e.REG_NG4MAC_NM.test(t)) throw `[${t}]はマクロ名として異常です`;
				if (t in this.#z) throw `[macro] マクロ【${t}】は既に定義済みです`;
				this.#z[t] = {
					fn: this.fn,
					idx: this.#_
				};
				let r = !1, i = 0, a = !1;
				for (; this.#_ < l; ++this.#_) {
					let t = this.#g.aToken[this.#_];
					if (a) {
						this.#g.grm.testTagEndLetml(t) && (a = !1);
						continue;
					}
					if (t.charCodeAt(0) !== 91) continue;
					if (this.#g.grm.testTagLetml(t)) {
						a = !0;
						continue;
					}
					let { name: n } = e.parseTag(t);
					if (n === "macro") {
						++i;
						continue;
					}
					if (n === "endmacro") {
						if (i > 0) {
							--i;
							continue;
						}
						++this.#_, r = !0;
						break;
					}
				}
				if (!r) throw `[macro] マクロ【${t}】が[endmacro]で閉じられていません（試作仕様）`;
				return "skip";
			}
			case "char2macro":
			case "bracket2macro": return this.#g.defC2M(t, n, this.#B(), this.#_), "skip";
			case "endmacro": return this.#re(o);
			case "button": {
				let t = n.layer || this.#v;
				if (!t) throw "[button] layerは必須です（試作仕様）";
				let r = n.label ?? "", i = n.fn ?? "";
				if (!r && !i) throw "[button] fnまたはlabelは必須です";
				let { pic: a } = n;
				if (!a && !n.text) throw "[button] textまたはpic属性は必須です";
				let c = n.nm, l = n.call === "true", u = e.argPage(n, "back"), d = {};
				n.left === void 0 ? n.center === void 0 ? n.right === void 0 ? n.s_right !== void 0 && (d.s_right = this.#r("button", "left", n.s_right)) : (d.left = this.#r("button", "left", n.right), d.align_x = "right") : (d.left = this.#r("button", "left", n.center), d.align_x = "center") : d.left = this.#r("button", "left", n.left), n.top === void 0 ? n.middle === void 0 ? n.bottom === void 0 ? n.s_bottom !== void 0 && (d.s_bottom = this.#r("button", "top", n.s_bottom)) : (d.top = this.#r("button", "top", n.bottom), d.align_y = "bottom") : (d.top = this.#r("button", "top", n.middle), d.align_y = "middle") : d.top = this.#r("button", "top", n.top);
				for (let t of e.#f) {
					let r = n[t];
					r !== void 0 && Object.assign(d, { [t]: e.#n("button", t, r) });
				}
				return a || (d.width ??= 100, d.height ??= 30), n.enabled !== void 0 && (d.enabled = n.enabled !== "false"), n.blendmode !== void 0 && (d.blendmode = s(n.blendmode)), n.style !== void 0 && (d.style = e.#u(n.style)), n.style_hover !== void 0 && (d.style_hover = e.#u(n.style_hover)), n.style_clicked !== void 0 && (d.style_clicked = e.#u(n.style_clicked)), n.hint !== void 0 && (d.hint = n.hint), n.hint_style !== void 0 && (d.hint_style = n.hint_style), n.hint_opt !== void 0 && (d.hint_opt = n.hint_opt), a !== void 0 && (d.pic = a), n.b_pic !== void 0 && (d.b_pic = n.b_pic), n.clickse !== void 0 && (d.clickse = n.clickse, d.clicksebuf = n.clicksebuf || "SYS"), n.enterse !== void 0 && (d.enterse = n.enterse, d.entersebuf = n.entersebuf || "SYS"), n.leavese !== void 0 && (d.leavese = n.leavese, d.leavesebuf = n.leavesebuf || "SYS"), o.push({
					t: "addBtn",
					layerNm: t,
					page: u,
					text: a ? "" : n.text ?? "",
					label: r,
					call: l,
					...c === void 0 ? {} : { nm: c },
					...i ? { fn: i } : {},
					...Object.keys(d).length > 0 ? { sty: d } : {}
				}), "skip";
			}
			case "page": {
				if (!("clear" in n || "to" in n || "style" in n)) throw "[page] clear,style,to いずれかは必須です";
				if (n.key !== void 0 && o.push({
					t: "pageKeys",
					aKey: n.key ? n.key.split(",") : []
				}), n.style !== void 0) return o.push({
					t: "pageStyle",
					style: n.style
				}), "skip";
				if (n.clear === "true") return o.push({ t: "clearPageLog" }), "skip";
				if (n.to === void 0) return "skip";
				let e = n.to;
				if (!a.includes(e)) throw `[page] 属性to「${n.to}」は異常です`;
				return o.push({
					t: "pageTo",
					to: e
				}), "stop";
			}
			case "title": {
				let { text: e } = n;
				if (!e) throw "[title] textは必須です";
				return o.push({
					t: "title",
					text: e
				}), "skip";
			}
			case "toggle_full_screen": return o.push(n.key ? {
				t: "fullScrKey",
				key: n.key.toLowerCase()
			} : { t: "toggleFullScr" }), "skip";
			case "navigate_to": {
				let { url: e } = n;
				if (!e) throw "[navigate_to] urlは必須です";
				return o.push({
					t: "navigateTo",
					url: e
				}), "skip";
			}
			case "close": return o.push({ t: "close" }), "skip";
			case "update_check": {
				let { url: e } = n;
				if (!e) throw "[update_check] urlは必須です";
				if (!e.endsWith("/")) throw "[update_check] urlの末尾は/にして下さい";
				return o.push({
					t: "updateCheck",
					url: e
				}), "skip";
			}
			case "window": {
				let t = (e, t) => {
					let n = this.#O.get(`sys:const.sn.nativeWindow.${e}`);
					return n == null ? t : Number(n);
				}, r = (e) => Number(this.#O.get(`tmp:const.sn.config.window.${e}`) ?? 0), i = (t, r, i) => n[t] === void 0 ? n[r] === void 0 ? i : e.#n("window", r, n[r]) : e.#n("window", t, n[t]), a = {
					centering: n.centering === "true",
					x: i("x", "x", t("x", 0)),
					y: i("y", "y", t("y", 0)),
					w: i("width", "w", t("w", r("width"))),
					h: i("height", "h", t("h", r("height")))
				};
				return this.#O.set("sys:const.sn.nativeWindow.x", a.x), this.#O.set("sys:const.sn.nativeWindow.y", a.y), this.#O.set("sys:const.sn.nativeWindow.w", a.w), this.#O.set("sys:const.sn.nativeWindow.h", a.h), o.push({
					t: "window",
					...a
				}), "skip";
			}
			case "loadplugin": {
				let { fn: e } = n;
				if (!e) throw "[loadplugin] fnは必須です";
				if (!e.endsWith(".css")) throw "[loadplugin] サポートされない拡張子です";
				let t = (n.join ?? "true") !== "false";
				return o.push({
					t: "loadPlugin",
					fn: e,
					join: t
				}), t ? "stop" : "skip";
			}
			case "snapshot": return o.push({
				t: "snapshot",
				fn: n.fn ?? "",
				aLayNm: e.#c(n.layer),
				page: e.argPage(n, "fore"),
				width: e.#i("snapshot", "width", n.width, 0),
				height: e.#i("snapshot", "height", n.height, 0),
				smoothing: n.smoothing === "true",
				...n.b_color === void 0 ? {} : { b_color: e.#n("snapshot", "b_color", n.b_color) }
			}), "stop";
			case "clear_text": {
				let t = n.layer || this.#v, r = e.argPage(n, "fore");
				return t === this.#v && r === "fore" && this.#se(), this.#x(r)[t] = "", o.push({
					t: "chgStr",
					nm: t,
					page: r,
					str: ""
				}), "skip";
			}
			case "dump_val": return o.push({
				t: "trace",
				text: `[dump_val] ${JSON.stringify(this.#O.dump())}`
			}), "skip";
			case "dump_stack": return o.push({
				t: "trace",
				text: `[dump_stack] ${JSON.stringify({
					now: {
						fn: this.fn,
						idx: this.#_
					},
					aCallStk: this.#P.map((e) => ({
						fn: e.fn,
						returnIdx: e.returnIdx
					})),
					aIfStk: [...this.#N]
				})}`
			}), "skip";
			case "dump_lay": return o.push({
				t: "dumpLay",
				aLayNm: e.#c(n.layer)
			}), "skip";
			case "pop_stack":
				if ((n.clear ?? "false") !== "false") this.#P.length = 0;
				else if (!this.#P.pop()) throw "[pop_stack] スタックが空です";
				return this.#N.length = 0, this.#N.push(-1), this.#O.setMp({}), "skip";
			case "clearvar": return this.#O.clearGame(), "skip";
			case "clearsysvar": return this.#O.clearSys(), this.clearKidoku(), "skip";
			case "record_place": return this.recordPlace(), o.push({ t: "recordPlace" }), "skip";
			case "save": {
				if (n.place === void 0) throw "[save] placeは必須です";
				let t = e.#n("save", "place", n.place), r = {
					text: "",
					...n
				};
				delete r.place, o.push({
					t: "save",
					place: t,
					json: r
				});
				let i = Number(this.#O.get("sys:const.sn.save.place"));
				return t === i && this.#O.set("sys:const.sn.save.place", i + 1), "skip";
			}
			case "load":
				if (n.index === void 0 && "fn" in n != "label" in n) throw "[load] fnとlabelはセットで指定して下さい";
				return o.push({
					t: "load",
					place: e.#i("load", "place", n.place, 0),
					fn: n.fn ?? "",
					label: n.label ?? "",
					...n.index === void 0 ? {} : { index: e.#n("load", "index", n.index) },
					...n.do_rec === void 0 ? {} : { doRec: n.do_rec !== "false" }
				}), "stop";
			case "reload_script": return o.push({ t: "reloadScript" }), "stop";
			case "copybookmark": {
				let t = e.#n("copybookmark", "from", n.from ?? ""), r = e.#n("copybookmark", "to", n.to ?? "");
				return t === r || o.push({
					t: "copyBookmark",
					from: t,
					to: r
				}), "skip";
			}
			case "erasebookmark": return o.push({
				t: "eraseBookmark",
				place: e.#n("erasebookmark", "place", n.place ?? "")
			}), "skip";
			case "export": return o.push({ t: "exportData" }), "skip";
			case "import": return o.push({ t: "importData" }), "skip";
			case "event": {
				let e = n.key ?? "", t = e.toLowerCase();
				if (!t) throw "[event] keyは必須です";
				let r = t.startsWith("dom="), i = n.global === "true" ? this.#I : this.#F;
				if (n.del === "true") {
					if (n.fn || n.label || n.call) throw "[event] fn/label/callとdelは同時指定できません";
					return delete i[t], r && o.push({
						t: "resvDomEvent",
						rawKey: e,
						key: t,
						del: !0,
						needErr: !1
					}), "skip";
				}
				let a = n.label ?? "", s = n.fn ?? this.fn, { url: c } = n;
				if (!c && !a && !n.fn) throw "[event] fn,label いずれかは必須です";
				return i[t] = {
					fn: s,
					label: a,
					call: n.call === "true",
					arg: n.arg ?? "",
					...c ? { url: c } : {}
				}, r && o.push({
					t: "resvDomEvent",
					rawKey: e,
					key: t,
					del: !1,
					needErr: (n.need_err ?? "true") !== "false"
				}), "skip";
			}
			case "set_focus": {
				let { add: e, del: t, to: r } = n, i = (n.need_err ?? "true") !== "false";
				if (e !== void 0 || t !== void 0) {
					let n = e ?? t ?? "";
					if (!n.startsWith("dom=")) throw `[set_focus] add/delは'dom=…'書式のみです：${n}`;
					return o.push({
						t: "setFocus",
						mode: e === void 0 ? "del" : "add",
						rawKey: n,
						needErr: i
					}), "skip";
				}
				if (!r) throw "[set_focus] add か to は必須です";
				if (r !== "null" && r !== "next" && r !== "prev") throw `[set_focus] to【${r}】が不正です`;
				return o.push({
					t: "setFocus",
					mode: r
				}), "skip";
			}
			case "add_frame": {
				let { id: t, src: r } = n;
				if (!t) throw "[add_frame] idは必須です";
				if (!r) throw "[add_frame] srcは必須です";
				if (this.#O.get(`const.sn.frm.${t}`)) throw `[add_frame] frame【${t}】はすでにあります`;
				return o.push({
					t: "addFrame",
					id: t,
					src: r,
					sty: e.#p("add_frame", n)
				}), "stop";
			}
			case "frame": {
				let { id: t } = n;
				if (!t) throw "[frame] idは必須です";
				this.#$("frame", t);
				let r = (n.float ?? "false") === "false" ? n.index === void 0 ? n.dive ? { mode: "dive" } : void 0 : {
					mode: "index",
					index: e.#n("frame", "index", n.index)
				} : { mode: "float" };
				return o.push({
					t: "frame",
					id: t,
					sty: e.#p("frame", n),
					...r ? { order: r } : {},
					...n.disabled === void 0 ? {} : { disabled: n.disabled !== "false" }
				}), "skip";
			}
			case "set_frame": {
				let { id: e, var_name: t, text: r } = n;
				if (!e) throw "[set_frame] idは必須です";
				if (!t) throw "[set_frame] var_nameは必須です";
				if (!r) throw "[set_frame] textは必須です";
				return this.#$("set_frame", e), this.#O.set(`const.sn.frm.${e}.${t}`, r), o.push({
					t: "setFrame",
					id: e,
					var_name: t,
					text: r
				}), "skip";
			}
			case "let_frame": {
				let { id: e, var_name: t } = n;
				if (!e) throw "[let_frame] idは必須です";
				if (!t) throw "[let_frame] var_nameは必須です";
				return this.#$("let_frame", e), o.push({
					t: "letFrame",
					id: e,
					var_name: t,
					fnc: (n.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(n.global === "true"), "skip";
			case "enable_event": {
				let e = n.layer || this.#v, t = (n.enabled ?? "true") !== "false";
				return this.#O.set(`save:const.sn.layer.${e}.enabled`, t), o.push({
					t: "enableEvent",
					nm: e,
					enabled: t
				}), "skip";
			}
			case "wait": {
				let t = e.#n("wait", "time", n.time ?? "");
				return this.skipEnabled ? (!this.skipAll && !this.isNextKidoku && this.cancelAutoSkip(), "skip") : (o.push({
					t: "wait",
					msec: t,
					canskip: (n.canskip ?? "true") !== "false"
				}), "stop");
			}
			case "l":
			case "p":
			case "s":
			case "waitclick": {
				if (t === "l" && !this.tagLEnabled) return "skip";
				t === "p" && (this.#S = !0);
				let r = this.#K(t), i = {};
				for (let r of [
					"x",
					"y",
					"width",
					"height"
				]) {
					let a = n[r];
					a !== void 0 && (i[r] = e.#n(t, r, a));
				}
				return o.push({
					t: "stop",
					kind: t,
					key: `${this.fn}:${String(this.#_)}`,
					nm: this.#v,
					...r ? { resume: r } : {},
					...Object.keys(i).length > 0 ? { mark: i } : {}
				}), "stop";
			}
			case "playse":
			case "playbgm": {
				let r = t === "playbgm", i = !r && (n.canskip ?? "true") !== "false";
				if (this.skipEnabled && i) return "skip";
				let a = r ? "BGM" : n.buf || "SE", s = n.fn ?? "";
				if (!s) throw `[${t}] fnは必須です`;
				let c = r ? !0 : (n.loop ?? "false") !== "false", l = (n.join ?? "true") !== "false", u = e.#i(t, "speed", n.speed, 1), d = e.#i(t, "pan", n.pan, 0), f = e.#i(t, "start_ms", n.start_ms, 0);
				if (f < 0) throw `[${t}] start_ms:${String(f)} が負の値です`;
				let p = e.#i(t, "ret_ms", n.ret_ms, 0);
				if (p < 0) throw `[${t}] ret_ms:${String(p)} が負の値です`;
				let m = e.#i(t, "end_ms", n.end_ms, e.#o);
				if (m > 0) {
					if (m <= f) throw `[${t}] start_ms:${String(f)} >= end_ms:${String(m)} は異常値です`;
					if (m <= p) throw `[${t}] ret_ms:${String(p)} >= end_ms:${String(m)} は異常値です`;
				}
				let h = `const.sn.sound.${a}.`, g = e.#a(e.#i(t, "volume", n.volume, 1));
				this.#O.set(`save:${h}volume`, g), this.#O.set(`save:${h}fn`, s), this.#O.set(`save:${h}start_ms`, f), this.#O.set(`save:${h}end_ms`, m), this.#O.set(`save:${h}ret_ms`, p);
				let _ = g * Number(this.#O.get(`sys:${h}volume`, 1, !0));
				if (a === "BGM") _ *= this.#D;
				else if (a === "VOICE") {
					let e = Number(this.#O.get("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
					if (this.#D = e, e !== 1) {
						let t = "const.sn.sound.BGM.", n = Number(this.#O.get(`save:${t}volume`, 1, !0)) * Number(this.#O.get(`sys:${t}volume`, 1, !0)) * e;
						o.push({
							t: "duckBgm",
							volume: n
						});
					}
				}
				return c ? this.#T(a, s) : this.#E(a), o.push({
					t: "playSnd",
					buf: a,
					fn: s,
					loop: c,
					volume: _,
					speed: u,
					pan: d,
					start_ms: f,
					end_ms: m,
					ret_ms: p,
					join: l,
					canskip: i
				}), l ? "stop" : "skip";
			}
			case "stopse":
			case "stopbgm": {
				let e = t === "stopbgm" ? "BGM" : n.buf || "SE";
				return this.#E(e), o.push({
					t: "stopSnd",
					buf: e
				}), "skip";
			}
			case "stop_allse":
				for (let e of Object.keys(this.#w)) this.#E(e);
				return o.push({ t: "stopAllSnd" }), "skip";
			case "xchgbuf": {
				let t = n.buf || "SE", r = n.buf2 || "SE";
				if (t === r) return "skip";
				let i = {
					volume: 1,
					fn: "",
					start_ms: 0,
					end_ms: e.#o,
					ret_ms: 0
				}, a = `const.sn.sound.${t}.`, s = `const.sn.sound.${r}.`;
				for (let e of Object.keys(i)) {
					let t = this.#O.get(`save:${a}${e}`, i[e]), n = this.#O.get(`save:${s}${e}`, i[e]);
					this.#O.set(`save:${a}${e}`, n), this.#O.set(`save:${s}${e}`, t);
				}
				let c = this.#w[t], l = this.#w[r];
				return l === void 0 ? delete this.#w[t] : this.#w[t] = l, c === void 0 ? delete this.#w[r] : this.#w[r] = c, this.#O.set("save:const.sn.loopPlaying", JSON.stringify(this.#w)), o.push({
					t: "xchgBufSnd",
					buf: t,
					buf2: r
				}), "skip";
			}
			case "volume": {
				let t = n.buf || "SE", r = `const.sn.sound.${t}.`, i = e.#a(e.#i("volume", "volume", n.volume, 1));
				this.#O.set(`sys:${r}volume`, i);
				let a = Number(this.#O.get(`save:${r}volume`, 1, !0));
				return o.push({
					t: "volumeSnd",
					buf: t,
					volume: a * i
				}), "skip";
			}
			case "fadese":
			case "fadebgm":
			case "fadeoutse":
			case "fadeoutbgm": {
				let r = t === "fadebgm" || t === "fadeoutbgm", i = t === "fadeoutse" || t === "fadeoutbgm", a = r ? "BGM" : n.buf || "SE", s = `const.sn.sound.${a}.`, c = i ? 0 : e.#a(e.#n(t, "volume", n.volume ?? ""));
				this.#O.set(`save:${s}volume`, c);
				let l = Number(this.#O.get(`sys:${s}volume`, 1, !0)), u = (n.stop ?? (c === 0 ? "true" : "false")) !== "false";
				u && this.#E(a);
				let d = this.skipEnabled, f = d ? 0 : e.#n(t, "time", n.time ?? ""), p = d ? 0 : e.#i(t, "delay", n.delay, 0);
				return o.push({
					t: "fadeSnd",
					buf: a,
					volume: c * l,
					msec: f,
					delay: p,
					stop: u
				}), "skip";
			}
			case "stopfadese": return "skip";
			case "ws":
			case "wl": {
				let e = t === "wl" ? "BGM" : n.buf || "SE", r = (n.canskip ?? "false") !== "false", i = (n.stop ?? "true") !== "false";
				return o.push({
					t: "waitSnd",
					buf: e,
					canskip: r,
					stop: i
				}), "stop";
			}
			case "wf":
			case "wb": {
				let e = t === "wb" ? "BGM" : n.buf || "SE", r = (n.canskip ?? "false") !== "false";
				return o.push({
					t: "waitFade",
					buf: e,
					canskip: r
				}), "stop";
			}
			case "wv": {
				let e = n.fn ?? "";
				if (!e) throw "[wv] fnは必須です";
				let t = (n.stop ?? "true") !== "false", r = (n.canskip ?? "true") !== "false";
				return o.push({
					t: "waitVideo",
					fn: e,
					stop: t,
					canskip: r
				}), "stop";
			}
			default: {
				let e = this.#z[t];
				return e === void 0 ? "skip" : (this.#X(this.#_, !1, n), this.#O.setMp({
					...n,
					"const.sn.me_call_scriptFn": this.fn,
					"const.sn.macro": JSON.stringify({ name: t })
				}), e.fn === this.fn ? (this.#_ = e.idx, "skip") : (o.push({
					t: "loadScript",
					fn: e.fn,
					label: "",
					idx: e.idx
				}), "stop"));
			}
		}
	}
	#$(e, t) {
		if (!this.#O.get(`const.sn.frm.${t}`)) throw `[${e}] frame【${t}】が読み込まれていません`;
	}
	#ee(e, t, n) {
		let r = t.name ?? "";
		if (!r) throw `[${e}] nameは必須です`;
		this.#O.set(r, n, t.cast ?? "");
	}
	#te(t) {
		let n = t.exp ?? "";
		if (!n) throw "[if] expは必須です（試作仕様）";
		let r = this.#k.evalBool(n) ? this.#_ : -1, i = 0, a = !1, o = this.#g.len;
		for (; this.#_ < o; ++this.#_) {
			let t = this.#g.aToken[this.#_];
			if (a) {
				this.#g.grm.testTagEndLetml(t) && (a = !1);
				continue;
			}
			if (t.charCodeAt(0) !== 91) continue;
			if (this.#g.grm.testTagLetml(t)) {
				a = !0;
				continue;
			}
			let { name: n, args: o } = e.parseTag(t);
			switch (n) {
				case "if":
					++i;
					continue;
				case "elsif": {
					if (i > 0 || r > -1) continue;
					let e = o.exp ?? "";
					if (!e) throw "[elsif] expは必須です（試作仕様）";
					this.#k.evalBool(e) && (r = this.#_ + 1);
					continue;
				}
				case "else":
					if (i > 0) continue;
					r === -1 && (r = this.#_ + 1);
					continue;
				case "endif":
					if (i > 0) {
						--i;
						continue;
					}
					r === -1 ? ++this.#_ : (this.#N.push(this.#_ + 1), this.#_ = r);
					return;
				default: continue;
			}
		}
		throw "[if] に対応する [endif] が見つかりません（試作仕様）";
	}
	#ne() {
		let e = this.#N.pop();
		if (e === void 0 || e === -1) throw "[if] に対応していない [elsif]/[else]/[endif] です";
		this.#_ = e;
	}
	#re(e, t = {}) {
		let n = this.#P.pop();
		if (!n) throw "[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）";
		this.#N.length = n.lenIfStk, this.#O.setMp(n.hMp), n.hEvt && (this.#F = n.hEvt);
		let r = t.label ?? "", i = t.fn ?? "";
		if (i || r) {
			if (i && i !== this.fn) return e.push({
				t: "loadScript",
				fn: i,
				label: r,
				idx: 0
			}), "stop";
			let t = this.#g.label2idx(r);
			if (t === void 0) throw `[return] ラベル【${r}】がスクリプト【${this.fn}】に見つかりません`;
			return this.#_ = t, "skip";
		}
		return n.fn === this.fn ? (this.#_ = n.returnIdx, "skip") : (e.push({
			t: "loadScript",
			fn: n.fn,
			label: "",
			idx: n.returnIdx
		}), "stop");
	}
	static #ie(e, t) {
		return `｜&emsp;《${e}｜${encodeURIComponent(JSON.stringify(t))}》`;
	}
	#ae(t) {
		return {
			nm: t.layer || this.#v,
			page: e.argPage(t, "fore")
		};
	}
	#oe(e, t, n = !0, r = this.#v, i = "fore") {
		let a = this.#x(i), o = (a[r] ?? "") + t;
		a[r] = o, n && this.#j && r === this.#v && i === "fore" && this.#A.add(t), e.push({
			t: "chgStr",
			nm: r,
			page: i,
			str: o
		});
	}
	#se() {
		this.#A.pagebreak();
	}
}, ce = class e {
	searchPath;
	fetch;
	dec;
	decAB;
	crypto;
	constructor(e, t, n, r, i) {
		this.searchPath = e, this.fetch = t, this.dec = n, this.decAB = r, this.crypto = i;
	}
	#e;
	#t;
	#n = new Promise((e) => {
		this.#t = e;
	});
	attachBox(e) {
		this.#e = e, this.#t?.(e);
	}
	#r = Object.create(null);
	#i = Object.create(null);
	#a = Object.create(null);
	#o = 1;
	getDisabled(e) {
		return this.#i[e] ?? !1;
	}
	getSty(e) {
		return this.#s("tsy_frame", e), this.#a[e] ?? {};
	}
	#s(e, t) {
		let n = this.#r[t];
		if (!n) throw `[${e}] frame【${t}】が読み込まれていません`;
		return n;
	}
	#c(e, t) {
		let n = this.#s(e, t).contentWindow;
		if (!n) throw `[${e}] frame【${t}】の中身がありません`;
		return n;
	}
	async add(t, n, r) {
		if (this.#r[t]) throw `[add_frame] frame【${t}】はすでにあります`;
		let i = this.#e ?? await this.#n, a = this.searchPath(n, g.HTML), o = await this.fetch(a);
		if (!o.ok) throw `[add_frame] HTMLの読込に失敗しました src:${n} ${o.statusText}`;
		let s = e.#m(await this.dec(a, await o.text()), a), c = document.createElement("iframe");
		c.id = t, c.style.cssText = "position: absolute; border: 0; overflow: hidden; pointer-events: auto;", i.appendChild(c), this.#r[t] = c, this.#i[t] = !1, this.#l(c, this.#a[t] = {
			visible: !0,
			alpha: 1,
			x: 0,
			y: 0,
			width: f.stageW,
			height: f.stageH,
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			...r
		}), await new Promise((e, n) => {
			c.onload = () => e(), c.onerror = () => n(/* @__PURE__ */ Error(`[add_frame] frame【${t}】の表示に失敗しました`)), c.srcdoc = s;
		});
		let l = e.#d(a);
		c.contentWindow.sn_repRes?.((e) => {
			this.#f(l, e.dataset.src ?? "").then((t) => {
				e.src = t;
			});
		}), c.contentDocument?.addEventListener("keydown", (e) => {
			document.dispatchEvent(new KeyboardEvent("keydown", {
				key: e.key,
				code: e.code,
				bubbles: !0,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			}));
		}), c.contentDocument?.addEventListener("contextmenu", (e) => {
			e.preventDefault(), document.dispatchEvent(new MouseEvent("contextmenu", {
				bubbles: !0,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			}));
		});
		let u = `const.sn.frm.${t}`;
		return {
			[u]: !0,
			[`${u}.alpha`]: r.alpha ?? 1,
			[`${u}.x`]: r.x ?? 0,
			[`${u}.y`]: r.y ?? 0,
			[`${u}.width`]: r.width ?? f.stageW,
			[`${u}.height`]: r.height ?? f.stageH,
			[`${u}.scale_x`]: r.scale_x ?? 1,
			[`${u}.scale_y`]: r.scale_y ?? 1,
			[`${u}.rotate`]: r.rotate ?? 0,
			[`${u}.visible`]: r.visible ?? !0
		};
	}
	frame(e, t, n, r) {
		let i = this.#s("frame", e);
		if (this.#l(i, Object.assign(this.#a[e] ??= {}, t)), n) {
			let { style: e } = i;
			e.zIndex = n.mode === "float" ? String(++this.#o) : n.mode === "index" ? String(n.index ?? 0) : String(-++this.#o);
		}
		if (r !== void 0) {
			this.#i[e] = r;
			let t = i.contentDocument?.body;
			if (t) for (let e of [...t.querySelectorAll("input"), ...t.querySelectorAll("select")]) e.disabled = r;
		}
		let a = `const.sn.frm.${e}`, o = {};
		for (let [e, n] of Object.entries(t)) o[`${a}.${e}`] = n;
		return o;
	}
	#l(e, t) {
		let n = e.style;
		t.alpha !== void 0 && (n.opacity = String(t.alpha)), t.x !== void 0 && (n.left = `${String(t.x)}px`), t.y !== void 0 && (n.top = `${String(t.y)}px`), t.width !== void 0 && (n.width = `${String(t.width)}px`), t.height !== void 0 && (n.height = `${String(t.height)}px`), (t.scale_x !== void 0 || t.scale_y !== void 0 || t.rotate !== void 0) && (n.transform = `scale(${String(t.scale_x ?? 1)}, ${String(t.scale_y ?? 1)}) rotate(${String(t.rotate ?? 0)}deg)`), t.b_color !== void 0 && (n.backgroundColor = t.b_color), t.visible !== void 0 && (n.display = t.visible ? "inline" : "none");
	}
	set(e, t, n) {
		this.#c("set_frame", e)[t] = n;
	}
	get(e, t, n) {
		let r = this.#c("let_frame", e);
		if (!(t in r)) throw `[let_frame] frame【${e}】に変数/関数【${t}】がありません。変数は var付きにして下さい`;
		let i = r[t];
		return n ? i() : i;
	}
	elms(e) {
		let t = e.slice(4), n = t.indexOf(":"), r = n < 0 ? t : t.slice(0, n), i = n < 0 ? "" : t.slice(n + 1), a = this.#r[r]?.contentDocument;
		if (!a) throw `[event] frame【${r}】が読み込まれていません`;
		return {
			id: r,
			sel: i,
			aEl: i ? [...a.querySelectorAll(i)] : [a.body]
		};
	}
	#u = Object.create(null);
	resvDom(e, t, n, r, i) {
		for (let { el: e, ev: n, fnc: r } of this.#u[t] ?? []) e.removeEventListener(n, r);
		if (delete this.#u[t], n) return [];
		let { id: a, sel: o, aEl: s } = this.elms(e);
		if (s.length === 0) {
			if (r) throw `[event] HTML内にセレクタ（${o}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return [];
		}
		let c = s[0].type || "", l = c === "checkbox" || c === "range" ? ["input"] : c === "text" || c === "textarea" ? ["input", "change"] : ["click", "keydown"], u = [];
		for (let e of s) for (let t of l) {
			let n = (n) => {
				this.getDisabled(a) || (t !== "keydown" || n.key === "Enter") && i(e);
			};
			e.addEventListener(t, n), u.push({
				el: e,
				ev: t,
				fnc: n
			});
		}
		return this.#u[t] = u, s;
	}
	resolveDom(e, t) {
		let { sel: n, aEl: r } = this.elms(e);
		if (r.length === 0 && t) throw `[set_focus] HTML内にセレクタ（${n}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
		return r;
	}
	static #d(e) {
		return e.slice(0, e.lastIndexOf("/") + 1);
	}
	async #f(e, t) {
		if (!t) return "";
		if (/^(?:[a-z][a-z\d+\-.]*:|\/)/i.test(t)) return t;
		try {
			let e = this.searchPath(t, g.SP_GSM);
			return await p(e, this.crypto, this.fetch, this.decAB);
		} catch {
			return e + t.replace(/^\.\//, "");
		}
	}
	static #p = /\s(?:src|href)=(["'])(\S+?)\1/g;
	static #m(t, n) {
		let r = e.#d(n);
		return t.replaceAll(e.#p, (e, t, n) => n.startsWith("../") ? r + e.slice(3) : e.replace("./", "").replace(t, t + r));
	}
}, le = /* @__PURE__ */ new Set([
	"IFRAME",
	"SCRIPT",
	"CANVAS",
	"VIDEO"
]);
function X(e) {
	return /\.jpe?g$/i.test(e) ? "image/jpeg" : "image/png";
}
function ue(e) {
	let t = d("-", "_", ""), n = /\.\w+$/.exec(e);
	return n ? e.slice(0, n.index) + t + n[0] : `${e}${t}.png`;
}
function de(e) {
	let t = (e >>> 24) / 255;
	return `rgba(${String(e >> 16 & 255)}, ${String(e >> 8 & 255)}, ${String(e & 255)}, ${String(t)})`;
}
async function fe(e) {
	let t = e.el.cloneNode(!0);
	t.style.transform = "none", t.style.width = `${String(e.sw)}px`, t.style.height = `${String(e.sh)}px`, pe(t, e.page, e.aLayNm), await me(t);
	let n = new XMLSerializer().serializeToString(t), r = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(e.sw)}" height="${String(e.sh)}"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${ge()}</style>${n}</div></foreignObject></svg>`, i = await _e(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(r)}`), a = document.createElement("canvas");
	a.width = e.width, a.height = e.height;
	let o = a.getContext("2d");
	if (!o) throw "canvasの2Dコンテキストが取れません";
	return o.imageSmoothingEnabled = e.smoothing, o.fillStyle = e.bgColor, o.fillRect(0, 0, e.width, e.height), o.drawImage(i, 0, 0, e.width, e.height), a.toDataURL(e.mime);
}
function pe(e, t, n) {
	for (let r of [...e.querySelectorAll("*")]) {
		if (le.has(r.tagName)) {
			r.remove();
			continue;
		}
		let e = r.dataset.page;
		if (e !== void 0 && e !== t) {
			r.remove();
			continue;
		}
		e === t && (r.style.visibility = "visible", r.style.opacity = "1");
		let i = r.dataset.lay;
		i !== void 0 && n && !n.includes(i) && r.remove();
	}
}
async function me(e) {
	let t = [...e.querySelectorAll("img")];
	await Promise.all(t.map(async (e) => {
		let { src: t } = e;
		if (!(!t || t.startsWith("data:"))) try {
			e.setAttribute("src", await he(t));
		} catch {
			e.remove();
		}
	}));
}
async function he(e) {
	let t = await fetch(e);
	if (!t.ok) throw `画像が取得できません url:${e}`;
	let n = await t.blob();
	return new Promise((t, r) => {
		let i = new FileReader();
		i.onload = () => t(String(i.result)), i.onerror = () => r(/* @__PURE__ */ Error(`画像が読めません url:${e}`)), i.readAsDataURL(n);
	});
}
function ge() {
	let e = [];
	for (let t of [...document.styleSheets]) try {
		for (let n of [...t.cssRules]) e.push(n.cssText);
	} catch {}
	return e.join("\n");
}
function _e(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error("スナップショットの画像化に失敗しました")), r.src = e;
	});
}
function ve(e, t) {
	let n = document.createElement("a");
	n.href = t, n.download = e, n.click();
}
//#endregion
//#region src/ts/SaveMng.ts
function Z() {
	return {
		sys: {},
		mark: {},
		kidoku: {},
		storage: {}
	};
}
var Q = ".swpd";
async function ye(e, t) {
	return t === void 0 ? void 0 : typeof t == "string" ? JSON.parse(await e("json", t)) : t;
}
var $ = class {
	sys;
	ns;
	#e = Z();
	get data() {
		return this.#e;
	}
	constructor(e, t) {
		this.sys = e, this.ns = t;
	}
	async load() {
		let e = await this.sys.storeLoad(this.ns);
		if (!e) return this.#e = Z(), !0;
		try {
			this.#e = this.sys.crypto ? await this.#t(e) : e;
		} catch {
			return this.#e = Z(), !0;
		}
		return !1;
	}
	async #t(e) {
		let t = (e) => ye(this.sys.dec, e);
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
		let { crypto: e, enc: t } = this.sys, n = JSON.stringify(this.#e), r = new Blob([e ? await t(n) : n], { type: "text/json" }), i = URL.createObjectURL(r), a = document.createElement("a");
		a.href = i, a.download = `${e ? "" : "no_crypto_"}${this.ns}${be()}${Q}`, a.click(), URL.revokeObjectURL(i);
	}
	async import() {
		let e = await (await new Promise((e, t) => {
			let n = document.createElement("input");
			n.type = "file", n.accept = `${Q}, text/plain`, n.onchange = () => {
				let r = n.files?.[0];
				r ? e(r) : t(/* @__PURE__ */ Error("ファイル選択に失敗しました"));
			}, n.click();
		})).text(), t = await (async () => {
			try {
				return JSON.parse(e);
			} catch {
				return JSON.parse(await this.sys.dec("json", e));
			}
		})(), n = t.sys["const.sn.cfg.ns"];
		if (n !== this.ns) throw `別のゲーム【プロジェクト名=${String(n)}】のプレイデータです`;
		return t.storage ??= {}, this.#e = t, this.flush(), t;
	}
};
function be() {
	let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
	return `${String(e.getFullYear())}-${t(e.getMonth() + 1)}-${t(e.getDate())}_${t(e.getHours())}-${t(e.getMinutes())}-${t(e.getSeconds())}`;
}
//#endregion
//#region src/ts/Font.ts
function xe(e) {
	return e.matchPath(".+", g.FONT).flatMap((e) => Object.values(e)).filter((e) => typeof e == "string").map((t) => `@font-face {
	font-family: ${JSON.stringify(t)};
	src: url(${JSON.stringify(e.searchPath(t, g.FONT))});
}`).join("\n");
}
function Se(e, t = document) {
	let n = xe(e);
	if (!n) return;
	let r = t.createElement("style");
	r.dataset.sn = "font", r.textContent = n, t.head.appendChild(r);
}
//#endregion
//#region src/ts/SndBuf.ts
var Ce = 999e3, we = class {
	ctx;
	src;
	opt;
	buf;
	constructor(e, t, n, r, i) {
		this.ctx = e, this.src = r, this.opt = i, this.buf = n;
		let a = this.gn = e.createGain();
		if (a.gain.value = i.volume, i.pan !== 0 && typeof e.createStereoPanner == "function") {
			let n = e.createStereoPanner();
			n.pan.value = i.pan < -1 ? -1 : i.pan > 1 ? 1 : i.pan, a.connect(n), n.connect(t);
		} else a.connect(t);
	}
	gn;
	get loop() {
		return this.opt.loop;
	}
	#e;
	#t = !1;
	get destroyed() {
		return this.#t;
	}
	#n;
	#r;
	set onEnd(e) {
		this.#r = e;
	}
	start(e, t) {
		if (this.#t) return;
		let { loop: n, speed: r, start_ms: i, ret_ms: a } = this.opt, { end_ms: o } = this.opt, s = e.duration * 1e3;
		o === 999e3 ? o = s : o < 0 && (o = s + o);
		let c = this.#e = this.ctx.createBufferSource();
		c.buffer = e, c.playbackRate.value = r, c.loop = n, n ? (c.loopStart = a / 1e3, c.loopEnd = Math.max(o, a + 1) / 1e3) : c.onended = () => {
			this.#e = void 0, this.stop();
		}, c.connect(this.gn);
		let l = i / 1e3;
		n ? c.start(0, l) : (c.start(0, l, Math.max(0, o - i) / 1e3), t && (this.#n = setTimeout(() => this.stop(), Math.max(0, o - i))));
	}
	stop() {
		if (this.#t) return;
		if (this.#t = !0, this.#n &&= (clearTimeout(this.#n), void 0), this.#e) {
			try {
				this.#e.stop();
			} catch {}
			this.#e.disconnect(), this.#e = void 0;
		}
		this.gn.disconnect();
		let e = this.#r;
		this.#r = void 0, e?.();
	}
	get volume() {
		return this.gn.gain.value;
	}
	set volume(e) {
		this.gn.gain.value = e;
	}
}, Te = {
	mp3: "audio/mpeg",
	mpeg: "audio/mpeg",
	opus: "audio/ogg; codecs=\"opus\"",
	ogg: "audio/ogg; codecs=\"vorbis\"",
	oga: "audio/ogg; codecs=\"vorbis\"",
	wav: "audio/wav; codecs=\"1\"",
	aac: "audio/aac",
	caf: "audio/x-caf",
	m4a: "audio/mp4; codecs=\"mp4a.40.2\"",
	mp4: "audio/mp4; codecs=\"mp4a.40.2\"",
	weba: "audio/webm; codecs=\"vorbis\"",
	webm: "audio/webm; codecs=\"vorbis\"",
	dolby: "audio/mp4; codecs=\"ec-3\"",
	flac: "audio/flac"
}, Ee = class {
	trace;
	fetch;
	decAB;
	constructor(e, t, n) {
		this.trace = e, this.fetch = t, this.decAB = n;
	}
	#e;
	#t;
	#n() {
		if (this.#e && this.#t) return {
			ctx: this.#e,
			gn: this.#t
		};
		let e = this.#e = new AudioContext(), t = this.#t = e.createGain();
		return t.connect(e.destination), {
			ctx: e,
			gn: t
		};
	}
	unlock() {
		let { ctx: e } = this.#n();
		e.state === "suspended" && e.resume();
	}
	needClick2Play() {
		return this.#n().ctx.state === "suspended";
	}
	setGlobalVol(e) {
		this.#n().gn.gain.value = e < 0 ? 0 : e;
	}
	codecs() {
		let e = document.createElement("audio"), t = {};
		for (let [n, r] of Object.entries(Te)) t[n] = e.canPlayType(r) !== "";
		return JSON.stringify(t);
	}
	#r = /* @__PURE__ */ new Map();
	#i(e) {
		let t = this.#r.get(e);
		if (!t) {
			let { ctx: n } = this.#n();
			t = this.fetch(e).then((e) => {
				if (!e.ok) throw `fetch失敗 ${String(e.status)} ${e.statusText}`;
				return e.arrayBuffer();
			}).then((e) => this.decAB(e)).then((e) => n.decodeAudioData(e)), t.catch(() => this.#r.delete(e)), this.#r.set(e, t);
		}
		return t;
	}
	#a = Object.create(null);
	#o = Object.create(null);
	async play(e, t, n, r) {
		let i = this.#a[e];
		if (i && !i.destroyed && i.src === t) return;
		this.stop(e);
		let { ctx: a, gn: o } = this.#n(), s = new we(a, o, e, t, n);
		this.#a[e] = s, s.onEnd = () => {
			let e = s.buf;
			this.#a[e] === s && delete this.#a[e];
			let t = this.#o[e];
			delete this.#o[e], r?.(e), t?.();
		};
		let c;
		try {
			c = await this.#i(t);
		} catch (e) {
			s.destroyed || (this.trace(`[playse] 音声のデコードに失敗しました src:${t} ${String(e)}`, "E"), s.stop());
			return;
		}
		s.start(c, this.needClick2Play());
	}
	stop(e) {
		this.#a[e]?.stop();
	}
	stopAll() {
		for (let e of Object.values(this.#a)) e.stop();
	}
	bufs() {
		return Object.keys(this.#a);
	}
	xchgBuf(e, t) {
		let n = this.#a[e], r = this.#a[t];
		r ? (this.#a[e] = r, r.buf = e) : delete this.#a[e], n ? (this.#a[t] = n, n.buf = t) : delete this.#a[t];
	}
	setVol(e, t) {
		let n = this.#a[e];
		n && (n.volume = t < 0 ? 0 : t > 1 ? 1 : t);
	}
	gainNode(e) {
		return this.#a[e]?.gn;
	}
	waitEnd(e, t) {
		let n = this.#a[e];
		return !n || n.loop ? !1 : (this.#o[e] = t, !0);
	}
	cancelWaitEnd(e) {
		delete this.#o[e];
	}
}, De = class r {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#m = new $(e, ""), this.#C = new ce((t, n) => e.cfg.searchPath(t, n), (t, n) => e.fetch(t, n), (t, n) => e.dec(t, n), (t) => e.decAB(t), e.crypto), this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#Ke(e), this.#t.log = (e) => this.#Je(e, this.#r?.fn ?? "", this.#r?.lineNum ?? NaN);
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
	#n = Object.create(null);
	#r;
	#i = (e) => {
		e !== this.#a && this.myTrace(`内部エラー ${e instanceof Error ? e.stack ?? e.message : String(e)}`, "E");
	};
	#a;
	load(e) {
		this.#o(e).catch(this.#i);
	}
	async #o(e) {
		let t = await this.#b(e);
		if (this.#r) this.#r.switchScript(t);
		else {
			let e = this.#r = new se(t);
			this.#s(e), e.defSetTrigger("sys:sn.sound.global_volume", (e) => {
				this.#w.setGlobalVol(Number(e)), this.#E();
			}), e.defSetTriggerSoundVol((t, n) => {
				let r = Number(e.getVal(`save:const.sn.sound.${t}.volume`) ?? 1);
				this.#w.setVol(t, r * Number(n));
			}), e.defSetTrigger("sys:sn.sound.movie_volume", () => this.#E()), await this.#g(e), Se(this.sys.cfg);
		}
		this.go = () => this.#k(), this.$trgNext();
	}
	#s(e) {
		let { oCfg: t } = this.sys.cfg, n = {
			"const.sn.config.window.width": () => f.stageW,
			"const.sn.config.window.height": () => f.stageH,
			"const.sn.config.book.title": () => t.book.title,
			"const.sn.config.book.version": () => t.book.version,
			"const.sn.config.log.max_len": () => t.log.max_len,
			"const.sn.navigator.language": () => globalThis.navigator.language,
			"const.sn.screenResolutionX": () => globalThis.screen.width,
			"const.sn.screenResolutionY": () => globalThis.screen.height,
			"const.sn.isApp": () => !1,
			"const.sn.isDbg": () => !1,
			"const.sn.isDebugger": () => !1,
			"const.sn.isPackaged": () => !1,
			"const.sn.isFirstBoot": () => this.#h,
			"const.sn.needClick2Play": () => this.#w.needClick2Play(),
			"const.sn.sound.codecs": () => this.#w.codecs(),
			"const.sn.bookmark.json": () => this.#m.bookmarkJson(),
			"const.sn.isDarkMode": () => globalThis.matchMedia("(prefers-color-scheme: dark)").matches,
			"const.sn.platform": () => globalThis.navigator.userAgent,
			"const.sn.isPaging": () => this.#c.isPaging,
			"const.sn.aPageLog": () => this.#c.json()
		};
		for (let [t, r] of Object.entries(n)) e.defBuiltin(t, r);
		e.defBuiltin("const.sn.lay", () => {
			let { fore: e, back: t } = this.$fncs.getPages(), n = (e) => {
				if (!e) return;
				let t = e.cls === "grp" ? !!e.src : e.str.length > 0 || e.aBtn.length > 0, n = e.left ?? 0, r = e.top ?? 0;
				return {
					visible: e.visible !== !1,
					alpha: e.alpha ?? 1,
					x: n,
					y: r,
					left: n,
					top: r,
					width: e.width ?? +!!t,
					height: e.height ?? +!!t
				};
			}, r = {};
			for (let i of e) r[i.nm] = {
				fore: n(i),
				back: n(t.find((e) => e.nm === i.nm))
			};
			return JSON.stringify(r);
		});
	}
	#c = new t(() => this.sys.cfg.oCfg.log.max_len);
	#l;
	#u = [];
	#d = !1;
	#f() {
		this.$fncs.setReadBack(this.#c.isPaging || this.#d), this.$fncs.setStyPaging(String(this.#r?.getVal("save:const.sn.styPaging") ?? "") || "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;");
	}
	page(e) {
		this.#j || (this.#j = !0, this.#p(e).catch(this.#i));
	}
	async #p(e) {
		let t = this.#r;
		if (!t) {
			this.#j = !1;
			return;
		}
		try {
			let n = this.#c.move(e);
			if (!n) {
				this.#f(), this.#j = !1;
				return;
			}
			this.#d = !0, this.#f(), t.restoreMarkPart(n.mark), t.clearOnResume = n.clearOnResume, this.$fncs.replace(n.mark.sPages), this.#A = !1, this.#l = void 0, t.switchScript(await this.#b(n.fn), "", n.idx);
		} catch (e) {
			this.#d = !1, this.#j = !1, this.myTrace(`[page] ${String(e)}`, "ET");
			return;
		}
		this.#j = !1, this.#k();
	}
	#m;
	#h = !0;
	async #g(e) {
		this.#m = new $(this.sys, this.sys.cfg.oCfg.save_ns);
		try {
			this.#h = await this.#m.load();
		} catch (e) {
			this.myTrace(`セーブデータが壊れています。初期状態で起動します ${String(e)}`, "E"), this.#h = !0;
		}
		this.#h || (e.setSys(this.#m.data.sys), e.setKidoku(this.#m.data.kidoku)), e.setValNochk("sys:const.sn.cfg.ns", this.sys.cfg.oCfg.save_ns), this.#_();
	}
	setWinInf(e, t, n, r) {
		let i = this.#r;
		i && (i.setValNochk("sys:const.sn.nativeWindow.x", e), i.setValNochk("sys:const.sn.nativeWindow.y", t), i.setValNochk("sys:const.sn.nativeWindow.w", n), i.setValNochk("sys:const.sn.nativeWindow.h", r), this.#_());
	}
	#_() {
		let e = this.#r;
		e && (this.#m.data.sys = e.cloneSys(), this.#m.data.kidoku = e.getKidoku(), this.#m.flush());
	}
	#v(e = {}) {
		return {
			...this.#r.nowMarkPart(),
			sPages: this.$fncs.getPagesJson(),
			json: e
		};
	}
	#y;
	async #b(e) {
		return this.#n[e] ??= new E(e, await this.#Ge(e), this.#S());
	}
	#x;
	#S() {
		if (this.#x) return this.#x;
		let e = this.#x = new x(this.sys.cfg);
		return e.setEscape(this.sys.cfg.oCfg.init.escape), L(this.sys.cfg.oCfg.init.escape), e;
	}
	go() {}
	navigateTo(e) {
		globalThis.open(e, "_blank");
	}
	jumpToLabelAndGo(e, t, n = "", r) {
		r !== void 0 && (this.#r?.setValNochk("tmp:sn.eventArg", r), this.#r?.setValNochk("tmp:sn.eventLabel", e)), this.#O(e, t, n).catch(this.#i);
	}
	#C;
	attachFrameBox(e) {
		this.#C.attachBox(e);
	}
	#w = new Ee((e, t) => this.myTrace(e, t), (e, t) => this.sys.fetch(e, t), (e) => this.sys.decAB(e));
	unlockAudio() {
		this.#w.unlock();
	}
	needClick2Play() {
		return this.#w.needClick2Play();
	}
	playButtonSe(e, t) {
		if (!e) return;
		let n = this.#ze("button", e);
		if (!n) return;
		let r = Number(this.#r?.getVal(`sys:const.sn.sound.${t}.volume`) ?? 1);
		this.#w.play(t, n, {
			loop: !1,
			volume: r,
			speed: 1,
			pan: 0,
			start_ms: 0,
			end_ms: Ce,
			ret_ms: 0
		}).catch(this.#i);
	}
	#T;
	attachStageBox(e) {
		this.#T = e;
	}
	getMovieVolume() {
		let e = Number(this.#r?.getVal("sys:sn.sound.movie_volume") ?? 1) * Number(this.#r?.getVal("sys:sn.sound.global_volume") ?? 1);
		return e < 0 ? 0 : e > 1 ? 1 : e;
	}
	#E() {
		let e = this.#T;
		if (!e) return;
		let t = this.getMovieVolume();
		for (let n of e.querySelectorAll("video")) n.volume = t;
	}
	#D = /* @__PURE__ */ new Set();
	fireFullScrKey(e) {
		return this.#D.has(e) ? (this.$fncs.toggleFullScr(), !0) : !1;
	}
	setFullScr(e) {
		this.#r?.setFullScr(e);
	}
	setKeyDown(e, t) {
		this.#r?.setKeyDown(e, t);
	}
	clearKeyDown() {
		this.#r?.clearKeyDown();
	}
	fireEvent(e) {
		let t = this.#r;
		if (!t || this.#c.isPaging && this.#u.length > 0 && !this.#u.includes(e)) return !1;
		let n = t.beginEvent(e);
		return n ? n.url ? (this.navigateTo(n.url), !0) : (this.jumpToLabelAndGo(n.label, n.call, n.fn), !0) : !1;
	}
	async #O(e, t, n) {
		let r = this.#r;
		if (r) {
			this.#A = !1;
			try {
				if (n && (n !== r.fn || !e)) {
					let i = await this.#b(n);
					t ? r.callToScript(i, e) : r.switchScript(i, e);
				} else t ? r.callToLabel(e) : r.jumpToLabel(e);
			} catch (e) {
				this.myTrace(`[button]/[event] ジャンプ先エラー fn:${n || r.fn} ${String(e)}`, "ET");
				return;
			}
			this.#k();
		}
	}
	#k() {
		if (!this.#A) {
			if (this.#R) {
				this.#R.canskip && this.#V();
				return;
			}
			if (this.#Y) {
				this.#Y.canskip && this.#Z();
				return;
			}
			if (this.#$) {
				this.#$.canskip && this.#ae(this.#$.tw_nm);
				return;
			}
			if (this.#G) {
				this.#G.canskip && this.#q();
				return;
			}
			if (this.#de) {
				this.#de.canskip && this.#pe();
				return;
			}
			if (this.#_e) {
				this.#_e.canskip && this.#ye();
				return;
			}
			if (this.#xe) {
				this.#xe.canskip && this.#we();
				return;
			}
			this.#j || this.#Oe().catch(this.#i);
		}
	}
	#A = !1;
	#j = !1;
	#M;
	#N;
	#P(e, t) {
		if (clearTimeout(this.#M), this.#N = void 0, this.$fncs.setSkipping(e === "skip"), this.$fncs.isTyping()) {
			this.#N = {
				mode: e,
				msec: t
			};
			return;
		}
		this.#F(e, t);
	}
	#F(e, t) {
		this.#M = setTimeout(() => {
			this.#M = void 0, e === "skip" && this.$fncs.requestSkip(), this.#k();
		}, t);
	}
	onTypingDone() {
		if (!this.#N) return;
		let { mode: e, msec: t } = this.#N;
		this.#N = void 0, this.#F(e, t);
	}
	get isAutoPending() {
		return this.#N !== void 0 || this.#M !== void 0;
	}
	cancelAuto() {
		clearTimeout(this.#M), this.#M = void 0, this.#N = void 0, this.$fncs?.setSkipping(!1), this.#r?.cancelAutoSkip();
	}
	#I;
	#L = !1;
	#R;
	#z = null;
	#B(e, t) {
		clearTimeout(this.#I), this.#L = e > 0, this.#z = t, this.#I = this.#L ? setTimeout(() => this.#V(), e) : void 0, this.#L || this.#r?.transDone(t);
	}
	#V() {
		clearTimeout(this.#I), this.#I = void 0;
		let e = this.#L;
		this.#L = !1, this.$fncs.finishTrans(), e && this.#r?.transDone(this.#z), this.#R && (this.#R = void 0, this.#k());
	}
	#H(e) {
		if (this.#L) {
			this.#R = { canskip: e };
			return;
		}
		setTimeout(() => this.#k(), 0);
	}
	#U;
	#W = !1;
	#G;
	#K(e) {
		clearTimeout(this.#U), this.#W = !0, this.#U = setTimeout(() => this.#q(), e.msec), this.$fncs.startQuake({
			hmax: e.hmax,
			vmax: e.vmax
		});
	}
	#q() {
		clearTimeout(this.#U), this.#U = void 0, this.#W = !1, this.$fncs.finishQuake(), this.#G && (this.#G = void 0, this.#k());
	}
	#J(e) {
		if (this.#W) {
			this.#G = { canskip: e };
			return;
		}
		setTimeout(() => this.#k(), 0);
	}
	#Y;
	#X(e, t) {
		this.#Y = {
			canskip: t,
			timer: setTimeout(() => this.#Z(), Math.max(0, e))
		};
	}
	#Z() {
		this.#Y && (clearTimeout(this.#Y.timer), this.#Y = void 0, this.#k());
	}
	#Q = Object.create(null);
	#$;
	#ee(e) {
		let t = this.$fncs.getLaySty(e.nm, e.page), { from: n, aTo: i, aPrp: a } = r.#ne(e, (e) => {
			let n = t[e] ?? re[e];
			if (n === void 0) throw `[tsy] ${e} は [lay ${e}=…] で寸法を明示したレイヤにしか使えません`;
			return n;
		});
		this.#re(e, n, i, () => {
			let t = {};
			for (let e of a) Object.assign(t, { [e]: n[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page,
				sty: t
			});
		}, e.backlay ? () => {
			let t = {};
			for (let e of a) Object.assign(t, { [e]: n[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page === "fore" ? "back" : "fore",
				sty: t
			});
		} : void 0);
	}
	#te(e) {
		let t = this.#C.getSty(e.id), { from: n, aTo: i, aPrp: a } = r.#ne(e, (e) => t[e] ?? 0);
		this.#re(e, n, i, () => {
			let t = {};
			for (let e of a) Object.assign(t, { [e]: n[e] });
			this.#Fe(this.#C.frame(e.id, t));
		});
	}
	static #ne(e, t) {
		let n = [e.hTo, ...e.aPath ?? []], r = [...new Set(n.flatMap((e) => Object.keys(e)))], i = {};
		for (let e of r) i[e] = t(e);
		return {
			from: i,
			aTo: n.map((e) => {
				let t = {};
				for (let [n, r] of Object.entries(e)) r && (t[n] = r.rel ? i[n] + r.v : r.v);
				return t;
			}),
			aPrp: r
		};
	}
	#re(e, t, n, r, i) {
		this.#Q[e.tw_nm]?.tw.kill(), delete this.#Q[e.tw_nm];
		let a = {};
		for (let e of n) Object.assign(a, e);
		let o = () => {
			Object.assign(t, a), r(), i?.();
		};
		if (e.msec <= 0 && e.delay <= 0) {
			o(), this.#ie(e.tw_nm);
			return;
		}
		let s = {
			duration: e.msec / 1e3,
			delay: e.delay / 1e3,
			ease: e.ease,
			repeat: e.repeat,
			yoyo: e.yoyo,
			onUpdate: r
		}, c = !!e.chain, l = () => {
			o(), this.#ie(e.tw_nm);
		}, u;
		if (n.length > 1) {
			let e = m.timeline({
				paused: c,
				onComplete: l
			});
			for (let r of n) e.to(t, {
				...r,
				...s
			});
			u = e;
		} else u = m.to(t, {
			...n[0],
			...s,
			paused: c,
			onComplete: l
		});
		if (this.#Q[e.tw_nm] = {
			end: o,
			tw: u
		}, !e.chain) return;
		let d = this.#Q[e.chain];
		if (!d) throw `${e.chain}は存在しない・または終了したトゥイーンです`;
		d.next = () => u.play();
	}
	#ie(e) {
		let { next: t } = this.#Q[e] ?? {};
		delete this.#Q[e], t?.(), this.#$?.tw_nm === e && (this.#$ = void 0, setTimeout(() => this.#k(), 0));
	}
	#ae(e) {
		let t = this.#Q[e];
		t && (t.tw.kill(), t.end()), this.#ie(e);
	}
	#oe(e, t) {
		if (!this.#Q[e]) {
			setTimeout(() => this.#k(), 0);
			return;
		}
		this.#$ = {
			tw_nm: e,
			canskip: t
		};
	}
	async #se(e) {
		let t = e.buf === "BGM" ? "playbgm" : "playse", n = this.#ze(t, e.fn);
		n && await this.#w.play(e.buf, n, e, (e) => {
			this.#r?.setValNochk(`tmp:const.sn.sound.${e}.playing`, !1), e === "VOICE" && this.#ce();
		});
	}
	#ce() {
		let e = this.#r;
		if (!e) return;
		e.resetVolMulTalking();
		let t = "const.sn.sound.BGM.", n = Number(e.getVal(`save:${t}volume`) ?? 1), r = Number(e.getVal(`sys:${t}volume`) ?? 1);
		this.#w.setVol("BGM", n * r);
	}
	#le(e) {
		let t;
		try {
			t = JSON.parse(String(e.getVal("save:const.sn.loopPlaying") ?? "{}"));
		} catch {
			t = {};
		}
		for (let e of this.#w.bufs()) e in t || this.#w.stop(e);
		for (let [n, r] of Object.entries(t)) {
			if (!r) continue;
			let t = `const.sn.sound.${n}.`, i = Number(e.getVal(`save:${t}volume`) ?? 1), a = Number(e.getVal(`sys:${t}volume`) ?? 1);
			this.#se({
				t: "playSnd",
				buf: n,
				fn: r,
				loop: !0,
				volume: i * a,
				speed: 1,
				pan: 0,
				start_ms: Number(e.getVal(`save:${t}start_ms`) ?? 0),
				end_ms: Number(e.getVal(`save:${t}end_ms`) ?? 999e3),
				ret_ms: Number(e.getVal(`save:${t}ret_ms`) ?? 0),
				join: !1,
				canskip: !1
			}).catch(this.#i);
		}
	}
	async #ue(e) {
		try {
			await this.#se(e);
		} catch (t) {
			this.#j = !1, this.myTrace(`[playse] エラー fn:${e.fn} ${String(t)}`, "E");
			return;
		}
		this.#j = !1, this.#k();
	}
	#de;
	#fe(e, t, n) {
		if (!this.#w.waitEnd(e, () => {
			this.#de?.buf === e && (this.#de = void 0, this.#k());
		})) {
			setTimeout(() => this.#k(), 0);
			return;
		}
		this.#de = {
			buf: e,
			canskip: t,
			stop: n
		};
	}
	#pe() {
		let e = this.#de;
		e && (this.#de = void 0, this.#w.cancelWaitEnd(e.buf), e.stop && this.#w.stop(e.buf), this.#k());
	}
	#me = Object.create(null);
	#he(e) {
		this.#me[e.buf]?.tw.kill(), delete this.#me[e.buf];
		let t = () => {
			this.#w.setVol(e.buf, e.volume), e.stop && this.#w.stop(e.buf);
		}, n = this.#w.gainNode(e.buf);
		if (!n || e.msec <= 0 && e.delay <= 0) {
			t(), this.#ge(e.buf);
			return;
		}
		let r = m.to(n.gain, {
			value: e.volume,
			duration: e.msec / 1e3,
			delay: e.delay / 1e3,
			onComplete: () => {
				t(), this.#ge(e.buf);
			}
		});
		this.#me[e.buf] = {
			tw: r,
			end: t
		};
	}
	#ge(e) {
		delete this.#me[e], this.#_e?.buf === e && (this.#_e = void 0, setTimeout(() => this.#k(), 0));
	}
	#_e;
	#ve(e, t) {
		if (!this.#me[e]) {
			setTimeout(() => this.#k(), 0);
			return;
		}
		this.#_e = {
			buf: e,
			canskip: t
		};
	}
	#ye() {
		let e = this.#_e;
		e && this.#be(e.buf);
	}
	#be(e) {
		let t = this.#me[e];
		t && (t.tw.kill(), t.end()), this.#ge(e);
	}
	#xe;
	#Se(e) {
		return this.#T?.querySelector(`video[data-fn="${CSS.escape(e)}"]`) ?? void 0;
	}
	#Ce(e, t, n, r = 30) {
		let i = this.#Se(e);
		if (!i) {
			if (r > 0) {
				requestAnimationFrame(() => this.#Ce(e, t, n, r - 1));
				return;
			}
			this.#k();
			return;
		}
		if (i.loop || i.ended) {
			i.ended && n && this.#Te(i), this.#k();
			return;
		}
		i.addEventListener("ended", () => {
			this.#xe?.fn === e && (this.#xe = void 0, n && this.#Te(i), this.#k());
		}, { once: !0 }), this.#xe = {
			fn: e,
			canskip: t,
			stop: n
		};
	}
	#we() {
		let e = this.#xe;
		if (e) {
			if (this.#xe = void 0, e.stop) {
				let t = this.#Se(e.fn);
				t && this.#Te(t);
			}
			this.#k();
		}
	}
	#Te(e) {
		e.pause(), e.currentTime = e.duration;
	}
	#Ee = !1;
	#De = 0;
	async #Oe() {
		let e = this.#r;
		if (e) {
			if (this.#Ee) {
				++this.#De;
				return;
			}
			this.#Ee = !0, this.#l ??= {
				...e.nowScrIdx(),
				mark: this.#v(),
				clearOnResume: e.clearOnResume
			};
			try {
				for (;;) {
					this.$fncs.setWait(null);
					let t;
					try {
						t = e.step();
					} catch (t) {
						this.myTrace(`シナリオ解析エラー fn:${e.fn} ${String(t)}`, "ET");
						return;
					}
					for (let e of t) this.#We(e);
					let n = t.at(-1);
					if (n?.t === "waitTrans") {
						this.#H(n.canskip);
						return;
					}
					if (n?.t === "wait") {
						this.#X(n.msec, n.canskip);
						return;
					}
					if (n?.t === "waitTsy") {
						this.#oe(n.tw_nm, n.canskip);
						return;
					}
					if (n?.t === "waitQuake") {
						this.#J(n.canskip);
						return;
					}
					if (n?.t === "waitSnd") {
						this.#fe(n.buf, n.canskip, n.stop);
						return;
					}
					if (n?.t === "waitFade") {
						this.#ve(n.buf, n.canskip);
						return;
					}
					if (n?.t === "waitVideo") {
						this.#Ce(n.fn, n.canskip, n.stop);
						return;
					}
					if (n?.t === "playSnd" && n.join) {
						this.#j = !0, this.#ue(n).catch(this.#i);
						return;
					}
					if (n?.t === "addFrame" || n?.t === "letFrame") {
						this.#j = !0, this.#ke(n).catch(this.#i);
						return;
					}
					if (n?.t === "loadPlugin" || n?.t === "snapshot") {
						this.#j = !0, this.#je(n).catch(this.#i);
						return;
					}
					if (n?.t === "load" || n?.t === "reloadScript") {
						this.#j = !0, this.#Ae(n).catch(this.#i);
						return;
					}
					if (n?.t === "pageTo") {
						this.#j = !0, this.#p(n.to).catch(this.#i);
						return;
					}
					if (n?.t !== "loadScript") {
						e.atEnd ? this.myTrace(`スクリプト終端です fn:${e.fn}`, "I") : this.#Ue();
						return;
					}
					try {
						e.switchScript(await this.#b(n.fn), n.label, n.idx);
					} catch (e) {
						this.myTrace(`[jump系] スクリプト切替エラー fn:${n.fn} ${String(e)}`, "ET");
						return;
					}
				}
			} finally {
				this.#Ee = !1, this.#De > 0 && (--this.#De, this.#k());
			}
		}
	}
	async #ke(e) {
		try {
			e.t === "addFrame" ? this.#Fe(await this.#C.add(e.id, e.src, e.sty)) : this.#Fe({ [`const.sn.frm.${e.id}.${e.var_name}`]: this.#C.get(e.id, e.var_name, e.fnc) });
		} catch (t) {
			this.#j = !1, this.myTrace(`[${e.t === "addFrame" ? "add_frame" : "let_frame"}] エラー id:${e.id} ${String(t)}`, "ET");
			return;
		}
		this.#j = !1, this.#k();
	}
	async #Ae(e) {
		let t = this.#r;
		if (!t) {
			this.#j = !1;
			return;
		}
		try {
			let n = e.t === "reloadScript" ? this.#y : this.#m.getMark(e.place);
			if (!n) throw e.t === "reloadScript" ? "[record_place]がまだ実行されていません" : `place=${String(e.place)} は存在しません`;
			if (t.restoreMarkPart(n), this.#le(t), this.$fncs.replace(n.sPages), this.#c.clear(), this.#l = void 0, this.#A = !1, e.t === "load" && e.doRec !== !1 && (this.#y = { ...n }), e.t === "load" && e.index !== void 0) {
				let n = await this.#b(e.fn || t.fn);
				t.switchScript(n, "", e.index), this.#j = !1, this.#k();
				return;
			}
			let r = String(t.getVal("save:const.sn.scriptFn") ?? ""), i = Number(t.getVal("save:const.sn.scriptIdx") ?? 0);
			if (!r) throw "再開位置（save:const.sn.scriptFn）が空です";
			delete this.#n[r];
			let a = await this.#b(r);
			if (e.t === "load" && e.label) {
				t.switchScript(a, "", i);
				let n = e.fn && e.fn !== r ? await this.#b(e.fn) : a;
				t.callToScript(n, e.label);
			} else t.switchScript(a, "", i);
		} catch (t) {
			this.#j = !1, this.myTrace(`[${e.t === "reloadScript" ? "reload_script" : "load"}] ${String(t)}`, "ET");
			return;
		}
		this.#j = !1, this.#k();
	}
	async #je(e) {
		try {
			e.t === "loadPlugin" ? await this.#Me(e.fn) : await this.#Ne(e);
		} catch (t) {
			this.myTrace(`[${e.t === "loadPlugin" ? "loadplugin" : "snapshot"}] ${String(t)}`, "E");
		}
		this.#j = !1, this.#k();
	}
	async #Me(e) {
		let t = await this.sys.fetch(e);
		if (!t.ok) throw `cssが取得できません fn:${e}`;
		let n = document.createElement("style");
		n.textContent = await t.text(), document.head.appendChild(n);
	}
	async #Ne(e) {
		let t = this.#T;
		if (!t) throw "ステージがまだ表示されていません";
		let n = e.fn.startsWith(h), r = n ? e.fn : ue(e.fn || "snapshot"), i = X(r), { stageW: a, stageH: o } = f, s = e.width || a, c = e.height || o, l = (e.aLayNm === null && e.page === "fore" && e.b_color === void 0 ? await this.sys.capturePage(this.#Pe(t), s, c, i) : "") || await fe({
			el: t,
			sw: a,
			sh: o,
			width: s,
			height: c,
			bgColor: e.b_color === void 0 ? "black" : de(e.b_color),
			page: e.page,
			aLayNm: e.aLayNm,
			mime: i,
			smoothing: e.smoothing
		});
		n ? this.#m.putFile(r, l) : ve(r, l);
	}
	#Pe(e) {
		let t = e.getBoundingClientRect();
		return {
			x: Math.round(t.x),
			y: Math.round(t.y),
			width: Math.round(t.width),
			height: Math.round(t.height)
		};
	}
	#Fe(e) {
		for (let [t, n] of Object.entries(e)) this.#r?.setValNochk(t, n);
	}
	#Ie = Object.create(null);
	#Le(e) {
		let t = e === "l" ? "breakline" : "breakpage";
		return this.#Ie[e] ??= this.sys.cfg.matchPath(`^${t}$`, g.SP_GSM).length > 0 ? this.sys.cfg.searchPath(t, g.SP_GSM) : "";
	}
	#Re(e, t) {
		if (!t) return "";
		if (t.startsWith("userdata:/")) return this.#m.getFile(t) || (this.myTrace(`[${e}] 保存された画像がありません fn:${t}`, "E"), "");
		try {
			return this.sys.cfg.searchPath(t, g.SP_GSM);
		} catch (n) {
			return this.myTrace(`[${e}] 画像が見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#ze(e, t) {
		if (!t) return "";
		try {
			return this.sys.cfg.searchPath(t, g.SOUND);
		} catch (n) {
			return this.myTrace(`[${e}] 音声ファイルが見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#Be(e) {
		return p(e, this.sys.crypto, this.sys.fetch, (e) => this.sys.decAB(e));
	}
	#Ve = /* @__PURE__ */ new Map();
	#He = /* @__PURE__ */ new Map();
	#Ue() {
		let e = this.#r;
		if (e) for (let t of new Set(e.peekUpcomingPicFn())) {
			let e;
			try {
				e = this.sys.cfg.searchPath(t, g.SP_GSM);
			} catch {
				continue;
			}
			if (!this.sys.crypto) {
				new Image().src = e;
				continue;
			}
			this.#He.has(e) || this.#He.set(e, this.#Be(e));
		}
	}
	#We(t) {
		switch (t.t) {
			case "addLay":
				this.$fncs.addLayer(t.cls === "grp" ? {
					cls: "grp",
					nm: t.nm,
					fn: "",
					src: "",
					isSheet: !1,
					isMovie: !1,
					aFace: []
				} : {
					cls: "txt",
					nm: t.nm,
					str: "",
					aCh: [],
					aBtn: [],
					b_alpha: 1,
					enabled: !0
				});
				break;
			case "chgPic": {
				let e = this.#Re("lay", t.fn), n = e.endsWith(".json"), r = /\.(?:mp4|webm)$/i.test(e), i = t.aFace?.map((e) => ({
					...e,
					src: this.#Re("add_face", e.fn)
				}));
				if (!this.sys.crypto) {
					this.$fncs.chgPic({
						nm: t.nm,
						page: t.page,
						fn: t.fn,
						src: e,
						isSheet: n,
						isMovie: r,
						...i && { aFace: i }
					});
					break;
				}
				let a = `${t.nm}:${t.page}`, o = (this.#Ve.get(a) ?? 0) + 1;
				this.#Ve.set(a, o), this.$fncs.chgPic({
					nm: t.nm,
					page: t.page,
					fn: t.fn,
					src: "",
					isSheet: n,
					isMovie: r,
					...i && { aFace: i.map((e) => ({
						...e,
						src: ""
					})) }
				});
				let s = (e) => {
					let t = this.#He.get(e);
					return t && this.#He.delete(e), t ?? this.#Be(e);
				};
				Promise.all([s(e), ...i?.map((e) => s(e.src)) ?? []]).then(([e, ...s]) => {
					this.#Ve.get(a) === o && this.$fncs.chgPic({
						nm: t.nm,
						page: t.page,
						fn: t.fn,
						src: e,
						isSheet: n,
						isMovie: r,
						...i && { aFace: i.map((e, t) => ({
							...e,
							src: s[t] ?? ""
						})) }
					});
				});
				break;
			}
			case "chgBAlpha":
				this.$fncs.chgBAlpha({
					nm: t.nm,
					page: t.page,
					...t.b_alpha === void 0 ? {} : { b_alpha: t.b_alpha },
					...t.isFixed === void 0 ? {} : { isFixed: t.isFixed }
				});
				break;
			case "chgBPic":
				this.$fncs.chgBPic({
					nm: t.nm,
					page: t.page,
					fn: t.fn,
					src: t.fn ? this.#Re("lay b_pic", t.fn) : ""
				});
				break;
			case "chgBackClear":
				this.$fncs.chgBackClear({
					nm: t.nm,
					page: t.page
				});
				break;
			case "finishTrans":
				this.#V();
				break;
			case "trans":
				this.#V(), this.$fncs.startTrans({
					aLayNm: t.aLayNm,
					time: t.time,
					...t.rule ? { ruleSrc: this.#Re("trans", t.rule) } : {},
					...t.vague === void 0 ? {} : { vague: t.vague }
				}), this.#B(t.time, t.aLayNm);
				break;
			case "waitTrans": break;
			case "chgStr":
				{
					let e = V(t.str);
					for (let t of e) t.pic && (t.src = this.#Re("graph", t.pic));
					this.$fncs.chgStr({
						nm: t.nm,
						page: t.page,
						str: H(e),
						aCh: e
					});
				}
				break;
			case "addBtn": {
				let e = t.sty && {
					...t.sty,
					...t.sty.pic ? { src: this.#Re("button pic", t.sty.pic) } : {},
					...t.sty.b_pic ? { b_src: this.#Re("button b_pic", t.sty.b_pic) } : {}
				};
				this.$fncs.addBtn({
					layerNm: t.layerNm,
					page: t.page,
					...t.nm === void 0 ? {} : { nm: t.nm },
					text: t.text,
					label: t.label,
					...t.call === void 0 ? {} : { call: t.call },
					...t.fn === void 0 ? {} : { fn: t.fn },
					...e === void 0 ? {} : { sty: e }
				});
				break;
			}
			case "chgLay":
				this.$fncs.chgLay({
					nm: t.nm,
					page: t.page,
					sty: t.sty
				});
				break;
			case "defChStyle":
				this.$fncs.defChStyle({
					kind: t.kind,
					nm: t.nm,
					sty: t.sty
				});
				break;
			case "autowc":
				this.$fncs.setAutowc({
					enabled: t.enabled,
					h: t.hWait
				});
				break;
			case "clearLay":
				this.$fncs.clearLay({
					aLayNm: t.aLayNm,
					page: t.page
				});
				break;
			case "clearTxtLay":
				this.$fncs.clearTxtLay({
					nm: t.nm,
					page: t.page,
					clearFilter: t.clearFilter
				});
				break;
			case "addFilter":
				this.$fncs.chgFilter({
					aLayNm: t.aLayNm,
					page: t.page,
					mode: t.replace ? "replace" : "add",
					flt: t.flt
				});
				break;
			case "clearFilter":
				this.$fncs.chgFilter({
					aLayNm: t.aLayNm,
					page: t.page,
					mode: "clear"
				});
				break;
			case "enableFilter":
				this.$fncs.chgFilter({
					aLayNm: t.aLayNm,
					page: t.page,
					mode: "enable",
					index: t.index,
					enabled: t.enabled
				});
				break;
			case "moveLay":
				this.$fncs.moveLay({
					nm: t.nm,
					mode: t.mode,
					...t.index === void 0 ? {} : { index: t.index },
					...t.dive === void 0 ? {} : { dive: t.dive }
				});
				break;
			case "enableEvent":
				this.$fncs.enableEvent({
					nm: t.nm,
					enabled: t.enabled
				});
				break;
			case "wait": break;
			case "tsy":
				this.#ee(t);
				break;
			case "tsyFrame":
				this.#te(t);
				break;
			case "quake":
				this.#K(t);
				break;
			case "stopQuake":
				this.#q();
				break;
			case "waitQuake": break;
			case "waitTsy": break;
			case "stopTsy":
				this.#ae(t.tw_nm);
				break;
			case "pauseTsy":
				this.#Q[t.tw_nm]?.tw.paused(t.paused);
				break;
			case "playSnd":
				t.join || this.#se(t).catch(this.#i);
				break;
			case "stopSnd":
				this.#w.stop(t.buf);
				break;
			case "stopAllSnd":
				this.#w.stopAll();
				break;
			case "xchgBufSnd":
				this.#be(t.buf), this.#be(t.buf2), this.#w.xchgBuf(t.buf, t.buf2);
				break;
			case "duckBgm":
				this.#w.setVol("BGM", t.volume);
				break;
			case "volumeSnd":
				this.#w.setVol(t.buf, t.volume);
				break;
			case "fadeSnd":
				this.#he(t);
				break;
			case "waitSnd": break;
			case "waitFade": break;
			case "waitVideo": break;
			case "title":
				this.$fncs.addTitle(t.text);
				break;
			case "toggleFullScr":
				this.$fncs.toggleFullScr();
				break;
			case "navigateTo":
				this.navigateTo(t.url);
				break;
			case "loadPlugin":
				t.join || this.#Me(t.fn).catch(this.#i);
				break;
			case "snapshot": break;
			case "recordPlace":
				this.#y = this.#v();
				break;
			case "save":
				this.#m.setMark(t.place, {
					...this.#y ?? this.#v(),
					json: t.json
				}), this.#_();
				break;
			case "load":
			case "reloadScript": break;
			case "copyBookmark":
				this.#m.copyMark(t.from, t.to);
				break;
			case "eraseBookmark":
				this.#m.eraseMark(t.place);
				break;
			case "exportData":
				this.#_(), this.#m.export(), setTimeout(() => this.fireEvent("sn:exported"), 10);
				break;
			case "importData":
				this.#m.import().then((e) => {
					let t = this.#r;
					t && (t.setSys(e.sys), t.setKidoku(e.kidoku), this.fireEvent("sn:imported"));
				}).catch((e) => this.myTrace(`[import] ${String(e)}`, "E"));
				break;
			case "fullScrKey":
				this.#D.add(t.key);
				break;
			case "dumpLay": {
				let { fore: e, back: n } = this.$fncs.getPages(), r = (e) => t.aLayNm ? e.filter((e) => t.aLayNm.includes(e.nm)) : e;
				this.myTrace(`[dump_lay] ${JSON.stringify({
					fore: r(e),
					back: r(n)
				})}`, "D");
				break;
			}
			case "frame":
				this.#Fe(this.#C.frame(t.id, t.sty, t.order, t.disabled));
				break;
			case "setFrame":
				this.#C.set(t.id, t.var_name, t.text);
				break;
			case "resvDomEvent": {
				let n = this.#C.resvDom(t.rawKey, t.key, t.del, t.needErr, (e) => {
					this.cancelAuto();
					for (let [t, n] of Object.entries(e.dataset)) this.#r?.setValNochk(`sn.event.domdata.${t}`, n ?? "");
					this.fireEvent(t.key);
				});
				!t.del && n[0] && e.add(n[0]);
				break;
			}
			case "setFocus":
				switch (t.mode) {
					case "add":
						for (let n of this.#C.resolveDom(t.rawKey, t.needErr ?? !0)) e.add(n);
						break;
					case "del":
						for (let n of this.#C.resolveDom(t.rawKey, t.needErr ?? !0)) e.remove(n);
						break;
					case "null":
						e.blur();
						break;
					case "next":
						e.next();
						break;
					case "prev": e.prev();
				}
				break;
			case "addFrame":
			case "letFrame": break;
			case "close":
				this.sys.close();
				break;
			case "window":
				this.sys.window(t);
				break;
			case "updateCheck":
				this.sys.updateCheck(t.url);
				break;
			case "clearPageLog":
				this.#c.clear(), this.#l = void 0, this.#r?.setValNochk("save:const.sn.styPaging", n), this.#f();
				break;
			case "pageStyle":
				this.#r?.setValNochk("save:const.sn.styPaging", t.style), this.#f();
				break;
			case "pageKeys":
				this.#u = t.aKey;
				break;
			case "pageTo": break;
			case "trace":
				this.#Ke({ text: t.text });
				break;
			case "log":
				this.#Je({ text: t.text }, t.fn, t.lineNum);
				break;
			case "loadScript": break;
			case "stop": {
				let e = this.#l;
				if (this.#l = void 0, e && this.#c.push(e.fn, e.idx, e.mark, e.clearOnResume), this.#d = !1, this.#f(), t.kind === "l" || t.kind === "p") {
					let e = this.#Le(t.kind);
					this.$fncs.setWait({
						nm: t.nm,
						kind: t.kind,
						...e ? { src: e } : {},
						...t.mark
					});
				}
				this.#A = t.kind === "s", t.resume ? this.#P(t.resume.mode, t.resume.msec) : this.$fncs.setSkipping(!1), this.#_(), this.$fncs.setBackAlpha(Number(this.#r?.getVal("sys:TextLayer.Back.Alpha") ?? 1)), this.$fncs.setBtnFont(String(this.#r?.getVal("tmp:sn.button.fontFamily") ?? "") || o), this.#r && this.$fncs.setChWait(this.#r.chWait);
				break;
			}
		}
	}
	async #Ge(e) {
		try {
			let t = this.sys.cfg.searchPath(e, g.SCRIPT), n = await this.sys.fetch(t);
			if (!n.ok) throw Error(n.statusText);
			return await this.sys.dec(t, await n.text());
		} catch (t) {
			throw this.myTrace(`[load] スクリプト読込に失敗しました fn:${e} ${String(t)}`, "ET"), t;
		}
	}
	#Ke(e) {
		return this.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
	}
	#qe = !0;
	#Je(e, t, n) {
		let r = "";
		return this.#qe && (this.#qe = !1, r = `== ${f.plat_desc} ==\n`), this.sys.appendFile(this.sys.path_downloads + "log.txt", `${r}--- ${d("-", "_", "")} [fn:${t} line:${String(n)}] prj:${this.sys.arg.cur}\n${e.text || `(text is ${String(e.text)})`}\n`), !1;
	}
	myTrace = (e, t = "E") => {
		let n = "";
		switch (t) {
			case "D":
				n = "color:#05A;";
				break;
			case "W":
				n = "color:#F80;";
				break;
			case "F":
				n = "color:#B00;";
				break;
			case "ET":
			case "E":
				n = "color:#F30;";
				break;
			default: n = "";
		}
		let r = `{${t}} ` + e;
		switch (this.#e.innerHTML += `<span style='${n}'>${r}</span><br/>`, this.#e.hidden = !1, t) {
			case "D":
				f.isDarkMode && (n = "color:#49F;");
				break;
			case "W":
			case "F": break;
			case "ET":
			case "E":
				if (this.#t.title({ text: e }), t === "ET") throw this.#a = r;
				break;
			default: n = "";
		}
		console.info("%c " + r, n);
	};
};
//#endregion
export { De as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map