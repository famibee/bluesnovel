import { a as e, i as t, o as n, r, t as i } from "./CmnLib.js";
import { t as a } from "./SaveMng.js";
import { S as o, a as s, i as c, l, m as u, r as d, t as f, x as p } from "./store.js";
import { t as m } from "./Crypto.js";
import { t as h } from "./gsap.js";
import { PROTOCOL_USERDATA as g, t as _ } from "./Config.js";
//#region src/sn/AnalyzeTagArg.ts
function v(e, t, n = 0, r = 0, i = 0) {
	let a = e.slice(0, t).split("\n"), o = a.length;
	return {
		ln: r + o - 1,
		ch: o < 2 ? i + 1 + n + t : a.at(-1)?.length ?? 0
	};
}
var y = class {
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
					let e = d.length - 1, { ch: s } = v(a, o + e, t, n, r);
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
			let { ln: f, ch: p } = v(a, o, t, n, r), { ln: m, ch: h } = v(a, o + s.lastIndexOf(l ?? u) - +!l, t, n, r);
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
}, b = /(?<name>[^\s;\]]+)/;
function x(e) {
	let t = b.exec(e.slice(1, -1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	let n = t.name;
	return [n, e.slice(1 + n.length, -1)];
}
function S(e) {
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
var C = class {
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
			for (let n = e.len - 1; n >= 0; --n) {
				let r = e.aToken[n];
				if (!this.#o.test(r)) continue;
				let [i, a] = x(r);
				this.#l.parse(a);
				let o = this.#l.hPrm.fn;
				if (!o) continue;
				let { val: s } = o;
				if (!s.endsWith("*")) continue;
				e.aToken.splice(n, 1, "	", "; " + r), e.aLNum.splice(n, 1, NaN, NaN);
				let c = i === "loadplugin" ? _.CSS : _.SN, l = this.cfg.matchPath("^" + s.slice(0, -1) + ".*", c);
				for (let i of l) {
					let a = r.replace(this.#s, "fn=" + decodeURIComponent(t(i[c])));
					e.aToken.splice(n, 0, a), e.aLNum.splice(n, 0, NaN);
				}
			}
			e.len = e.aToken.length;
		}
	}
	#l = new y();
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
function w() {
	return {
		"const.sn.cfg.ns": "",
		"const.sn.aPageLog": "[]",
		"const.sn.nativeWindow.x": 0,
		"const.sn.nativeWindow.y": 0,
		"const.sn.nativeWindow.w": i.stageW,
		"const.sn.nativeWindow.h": i.stageH,
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
var T = { save: "game" }, E = class t {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = /* @__PURE__ */ new Set();
	#r = Object.create(null);
	#i;
	constructor() {
		this.#a();
	}
	#a() {
		for (let [e, t] of Object.entries(w())) this.#e[`sys.${e}`] = typeof t == "function" ? 1 : t;
	}
	defBuiltin(e, t) {
		this.#t[e] = t;
	}
	defSetTrigger(e, n) {
		let { ns: r, key: i } = t.parseName(e);
		this.#r[`${r}.${i}`] = n;
	}
	defSetTriggerSoundVol(e) {
		this.#i = e;
	}
	static REG_NAME = /^(?:(tmp|game|save|sys|mp):)?([^\s:@]+)(@str)?$/;
	static parseName(e) {
		let n = t.REG_NAME.exec(e.trim());
		if (!n) throw `変数名が不正です：${e}`;
		let r = n[1] ?? "tmp";
		return {
			ns: T[r] ?? r,
			key: t.#o(n[2]),
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
	get(e, n = void 0, r = !1) {
		if (!e.trim()) throw "[変数参照] nameは必須です";
		let { ns: i, key: a, atStr: o } = t.parseName(e);
		if (i === "tmp") {
			let e = this.#t[a];
			if (e) return o ? e() : t.castAuto(e());
		}
		let s = `${i}.${a}`;
		if (s in this.#e) return o || this.#n.has(s) ? this.#e[s] : t.castAuto(this.#e[s]);
		if (r) return this.#e[s] = n, o ? n : t.castAuto(n);
		let c = this.#s(i, a, n);
		return o ? c : t.castAuto(c);
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
	static castAuto(e) {
		if (typeof e != "string") return e;
		if (e === "true") return !0;
		if (e === "false") return !1;
		if (e === "null") return null;
		if (e !== "undefined") return t.REG_NUMERICLITERAL.test(e) ? parseFloat(e) : e;
	}
	set(e, n, r = "") {
		let { ns: i, key: a } = t.parseName(e);
		if (i === "tmp" && a in this.#t) throw `組み込み変数【${e}】へは代入できません`;
		let o = `${i}.${a}`;
		r === "str" ? this.#n.add(o) : this.#n.delete(o);
		let s = t.castTo(n, r);
		if (this.#e[o] = s, this.#r[o]?.(s), i === "sys" && this.#i) {
			let e = /^const\.sn\.sound\.([^.]+)\.volume$/.exec(a);
			e && this.#i(e[1], s);
		}
	}
	static castTo(r, i) {
		switch (i) {
			case "": return r;
			case "num": return t.#c(r);
			case "int": return e(t.#c(r));
			case "uint": return n(t.#c(r));
			case "bool": return r != null && String(r) !== "false" && !!String(r);
			case "str": return r == null ? r : String(r);
			default: throw `cast【${String(i)}】は未定義です`;
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
}, D = /\[[^\]]+\]/g, O = {
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
}, ee = class {
	val;
	#e;
	#t;
	#n = /^(?:(?:tmp|sys|game|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*/;
	constructor(e, t = "\\") {
		this.val = e, this.#e = t, this.#t = RegExp(`^(?:"(?:\\${t}["'#\\n]|[^"])*"|'(?:\\${t}["'#\\n]|[^'])*'|\\#(?:\\${t}["'#\\n]|[^#])*\\#)`);
	}
	#r(t) {
		let n = [], r = 0;
		for (; r < t.length;) {
			let i = t.charCodeAt(r);
			if (i === 32 || i === 9 || i === 10 || i === 13) {
				++r;
				continue;
			}
			let a = t.slice(r), o;
			if ((o = /^0x[0-9a-fA-F]+/.exec(a)) || (o = /^(0|[1-9][0-9]*)\.[0-9]+/.exec(a))) {
				n.push({
					t: "NUM",
					v: ["!num!", Number(o[0])]
				}), r += o[0].length;
				continue;
			}
			if (o = /^(0|[1-9][0-9]*)/.exec(a)) {
				n.push({
					t: "NUM",
					v: ["!num!", e(o[0])]
				}), r += o[0].length;
				continue;
			}
			if (a.startsWith("null")) {
				n.push({
					t: "NULL",
					v: ["!str!", null]
				}), r += 4;
				continue;
			}
			if (o = /^(true|false)/.exec(a)) {
				n.push({
					t: "BOOL",
					v: ["!bool!", o[0] === "true"]
				}), r += o[0].length;
				continue;
			}
			if (o = this.#t.exec(a)) {
				n.push({
					t: "STR",
					v: ["!str!", o[0].slice(1, -1).replaceAll(this.#e, "")]
				}), r += o[0].length;
				continue;
			}
			let s = a.slice(0, 3);
			if (s === ">>>" || s === "===" || s === "!==") {
				n.push({ t: s }), r += 3;
				continue;
			}
			let c = a.slice(0, 2);
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
			].includes(c)) {
				n.push({ t: c }), r += 2;
				continue;
			}
			let l = a.charAt(0);
			if ("()!~*/%+-<>&^|:?¥".includes(l)) {
				n.push({ t: l }), ++r;
				continue;
			}
			let u = /^[A-Za-z_][A-Za-z0-9_]*/.exec(a);
			if (u && a.charAt(u[0].length) === "(") {
				n.push({
					t: "FUNC",
					v: u[0]
				}), r += u[0].length;
				continue;
			}
			if (o = this.#n.exec(a)) {
				let e = o[0];
				a.slice(e.length, e.length + 4) === "@str" && (e += "@str"), n.push({
					t: "VAR",
					v: e
				}), r += e.length;
				continue;
			}
			throw Error(`(ExprEval)不明な文字【${l}】です`);
		}
		return n;
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
				let i = r(), a = i && O[i.t];
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
		let t = e.replaceAll(D, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
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
		int: (t) => e(this.#c(t.shift())),
		parseInt: (t) => e(this.#s.Number(t)),
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
}, k = class {
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
	constructor(e, t, n = new C()) {
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
}, A = class e {
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
}, j = class e {
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
}, M = [
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
], N = [
	"alpha",
	"x",
	"y",
	"width",
	"height",
	"scale_x",
	"scale_y",
	"rotate"
], P = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function F(e, t, n = M) {
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
var I = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
function L(e, t, n = M) {
	let r = [];
	for (let { groups: i } of t.matchAll(I)) {
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
		r.push(F(e, d, n));
	}
	return r;
}
var te = {
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
}, R = {
	In: "in",
	Out: "out",
	InOut: "inOut"
};
function z(e) {
	if (!e) return "none";
	let [t = "", n = ""] = e.split(".");
	if (t === "Linear") return "none";
	let r = te[t], i = R[n];
	if (!r || !i) throw `異常なease指定です：${e}`;
	return `${r}.${i}`;
}
function B(e, t) {
	if (t.id) return `frm\n${t.id}`;
	let n = t.name ?? t.layer ?? "";
	if (!n) throw `[${e}] トゥイーンが指定されていません（name／layerのどちらも無し）`;
	return n;
}
//#endregion
//#region src/ts/Txt.ts
function V(e) {
	A.setEscape(e);
}
V("");
var H = [
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
function U(e) {
	if (e === void 0) return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function W(e) {
	let t = e.indexOf("｜");
	if (t < 1) return;
	let n = e.slice(0, t);
	if (!H.includes(n)) return;
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
function G(e) {
	let t = [], n = "", r = "", i, a, o, s, c, l = [], u = (e, l, u, d) => {
		let f = n + (s?.style ?? "") + (u?.style ?? ""), p = r + (s?.r_style ?? "") + (u?.r_style ?? ""), m = u?.ch_in_style ?? s?.ch_in_style ?? i, h = u?.ch_out_style ?? s?.ch_out_style ?? a, g = U(u?.wait) ?? U(s?.wait) ?? o, { ra: _, ruby: v } = l ? Y(l) : {
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
	}, d = new A();
	return d.init((e, d) => {
		let f = d ? W(d) : void 0;
		if (!f) {
			u(e, d);
			return;
		}
		let { o: p } = f;
		switch (f.cmd) {
			case "span":
				n = p.style ?? "", r = p.r_style ?? "", i = p.ch_in_style, a = p.ch_out_style, o = U(p.wait);
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
				...U(p.width) === void 0 ? {} : { gw: U(p.width) },
				...U(p.height) === void 0 ? {} : { gh: U(p.height) },
				...U(p.x) === void 0 ? {} : { gx: U(p.x) },
				...U(p.y) === void 0 ? {} : { gy: U(p.y) }
			}));
		}
	}), d.putTxt(e), t;
}
function K(e) {
	return e.map((e) => e.c).join("");
}
function q(e) {
	return K(G(e));
}
var J = [
	"start",
	"left",
	"center",
	"right",
	"justify",
	"121",
	"even",
	"1ruby"
];
function Y(e) {
	let t = e.indexOf("｜");
	if (t > 0) {
		let n = e.slice(0, t);
		if (J.includes(n)) return {
			ra: n,
			ruby: e.slice(t + 1)
		};
	}
	return { ruby: e };
}
//#endregion
//#region src/ts/Log.ts
var X = 64, Z = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), Q = (e) => Z(e).replaceAll("'", "&#39;");
function $(e) {
	return ne(G(e));
}
function ne(e) {
	let t = "";
	for (let n of e) {
		if (n.c === "\n") {
			t += "<br/>";
			continue;
		}
		let e = Z(n.c), r = n.r ? `<ruby>${e}<rt${n.rs ? ` style='${Q(n.rs)}'` : ""}>${Z(n.r)}</rt></ruby>` : e, i = (n.s ?? "") + (n.tcy ? "text-combine-upright: all;" : "");
		t += i ? `<span style='${Q(i)}'>${r}</span>` : r;
	}
	return t;
}
var re = class {
	maxLen;
	#e = [];
	#t = "";
	#n = {};
	constructor(e = () => X) {
		this.maxLen = e;
	}
	add(e) {
		this.#t += e;
	}
	setAttr(e) {
		this.#n = e;
	}
	pagebreak() {
		let e = $(this.#t);
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
			text: $(this.#t)
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
}, ie = class t {
	static #e = new y();
	static parseTag(e) {
		let [n, r] = x(e);
		t.#e.parse(r);
		let i = {};
		for (let [e, n] of Object.entries(t.#e.hPrm)) i[e] = n.val;
		return {
			name: n,
			args: i
		};
	}
	#t(e) {
		let [n, r] = x(e), i = t.#e;
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
	#r(e, n, r) {
		let i = t.#n(e, n, r);
		if (i <= -1 || i >= 1) return i;
		let a = Number(this.#O.get(n === "left" ? "tmp:const.sn.config.window.width" : "tmp:const.sn.config.window.height"));
		return Number.isFinite(a) ? i * a : i;
	}
	static #i(e, n, r, i) {
		return r === void 0 ? i : t.#n(e, n, r);
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
	static #u(e) {
		if (!e.trimStart().startsWith("{")) return e;
		let n;
		try {
			n = JSON.parse(e);
		} catch {
			return e;
		}
		return Object.entries(n).map(([e, n]) => {
			let r = t.#l[e];
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
	static #p(e, n) {
		let r = {};
		n.visible !== void 0 && (r.visible = n.visible !== "false");
		for (let i of t.#d) {
			let a = n[i];
			a !== void 0 && Object.assign(r, { [i]: t.#n(e, i, a) });
		}
		return n.b_color !== void 0 && (r.b_color = n.b_color), r;
	}
	static #m(e, t, n) {
		let r = t.path ? L(e, t.path, n) : void 0;
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
	#O = new E();
	#k = new ee(this.#O);
	#A = new re(() => {
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
		let e = Object.create(null);
		for (let n of t.RESERVED_TAGS) e[n] = !0;
		for (let t in this.#z) e[t] = !0;
		return e;
	}
	constructor(e, t = "") {
		this.#g = e instanceof k ? e : new k(e, t), this.#O.defBuiltin("const.sn.scriptFn", () => this.fn), this.#O.defBuiltin("const.sn.isKidoku", () => this.#R), this.#O.defBuiltin("const.sn.displayState", () => this.#V), this.#O.defBuiltin("const.Date.getDateStr", () => r()), this.#O.defBuiltin("const.Date.getTime", () => (/* @__PURE__ */ new Date()).getTime()), this.#O.defBuiltin("const.sn.last_page_plain_text", () => q(this.#y[this.#v] ?? "")), this.#O.defBuiltin("const.sn.last_page_text", () => this.#y[this.#v] ?? ""), this.#O.defBuiltin("const.sn.log.json", () => this.#A.json()), this.#O.defBuiltin("const.sn.key.alternate", () => this.#H.Alt === !0), this.#O.defBuiltin("const.sn.key.command", () => this.#H.Meta === !0), this.#O.defBuiltin("const.sn.key.control", () => this.#H.Control === !0), this.#O.defBuiltin("const.sn.key.end", () => this.#H.End === !0), this.#O.defBuiltin("const.sn.key.escape", () => this.#H.Escape === !0), this.#O.defBuiltin("const.sn.key.back", () => !1), this.#O.defBuiltin("const.sn.Math.PI", () => Math.PI), this.#O.defBuiltin("const.sn.aIfStk.length", () => this.#N.length), this.#O.defBuiltin("const.sn.vctCallStk.length", () => this.#P.length), this.#O.set("save:const.sn.mesLayer", this.#v);
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
		let e = [], n = new Map(Object.entries(this.#C).map(([e, t]) => [e, t.fn]));
		for (let r = this.#_; r < this.#g.len; ++r) {
			let i = this.#g.aToken[r];
			if (i.charCodeAt(0) !== 91) continue;
			let { name: a, args: o } = t.parseTag(i);
			if (a === "l" || a === "p" || a === "s" || a === "waitclick") break;
			if (a === "add_face") {
				o.name && n.set(o.name, o.fn || o.name);
				continue;
			}
			if (a !== "lay") continue;
			let s = o.fn || o.pic;
			if (s && !s.startsWith("&") && !s.startsWith("%") && e.push(s), o.face) for (let t of o.face.split(",")) {
				let r = n.get(t);
				r && e.push(r);
			}
		}
		return e;
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
		let e = this.#L[this.fn] ??= new j();
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
		for (let [t, n] of Object.entries(e)) this.#L[t] = j.from(n);
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
		let { name: t, text: n, cast: r } = S(e.slice(1));
		this.#O.set(this.#k.getValAmpersand(t.trim()), this.#k.parse(n), r ?? "");
	}
	#Q(r, i, a) {
		let o = this.#g.len;
		switch (r) {
			case "add_lay": {
				let e = i.layer ?? i.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (i.class ?? "txt").toLowerCase() === "grp" ? "grp" : "txt";
				return this.#y[e] = "", this.#b[e] = "", t === "txt" && this.#O.set(`save:const.sn.layer.${e}.enabled`, !0), a.push({
					t: "addLay",
					cls: t,
					nm: e
				}), "skip";
			}
			case "current": {
				let e = i.layer ?? i.nm ?? this.#v;
				return e !== this.#v && this.#se(), this.#v = e, this.#O.set("save:const.sn.mesLayer", this.#v), "skip";
			}
			case "add_face": {
				let e = i.name ?? "";
				if (!e) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#C[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
				return this.#C[e] = {
					fn: i.fn || e,
					dx: Number(i.dx || "0"),
					dy: Number(i.dy || "0"),
					blendmode: p(i.blendmode || "normal")
				}, "skip";
			}
			case "lay": {
				let e = t.argPage(i, "fore"), n = i.fn || i.pic;
				if (n) {
					let t = {
						t: "chgPic",
						nm: i.layer ?? "",
						page: e,
						fn: n
					};
					if (i.face !== void 0) {
						let e = [];
						if (i.face) for (let t of i.face.split(",")) {
							if (!t) throw "[lay] face属性に空要素が含まれています";
							let n = this.#C[t];
							if (!n) throw `[lay] face【${t}】は[add_face]で未定義です`;
							e.push(n);
						}
						t.aFace = e;
					}
					a.push(t);
				}
				if (i.back_clear !== void 0) i.back_clear === "true" && a.push({
					t: "chgBackClear",
					nm: i.layer ?? "",
					page: e
				});
				else {
					if (i.b_alpha !== void 0 || i.b_alpha_isfixed !== void 0) {
						let t = {
							t: "chgBAlpha",
							nm: i.layer ?? "",
							page: e
						};
						if (i.b_alpha !== void 0) {
							let e = Number(i.b_alpha);
							if (Number.isNaN(e)) throw `[lay] b_alphaの値が不正です：${i.b_alpha}`;
							t.b_alpha = Math.min(1, Math.max(0, e));
						}
						i.b_alpha_isfixed !== void 0 && (t.isFixed = i.b_alpha_isfixed !== "false"), a.push(t);
					}
					i.b_pic !== void 0 && a.push({
						t: "chgBPic",
						nm: i.layer ?? "",
						page: e,
						fn: i.b_pic
					});
				}
				let r = {};
				if (i.visible !== void 0 && (r.visible = i.visible !== "false"), i.alpha !== void 0 && (r.alpha = t.#n("lay", "alpha", i.alpha)), i.pos !== void 0 && i.pos !== "stay") {
					let e = i.pos, n = Number(this.#O.get("tmp:const.sn.config.window.width")), a = Number(this.#O.get("tmp:const.sn.config.window.height"));
					e === "" || e === "c" ? (r.left = n / 2, r.align_x = "center") : e === "l" ? r.left = 0 : e === "r" ? (r.left = n, r.align_x = "right") : (r.left = t.#n("lay", "pos", e), r.align_x = "center"), r.top = a, r.align_y = "bottom";
				} else i.left === void 0 ? i.center === void 0 ? i.right === void 0 ? i.s_right !== void 0 && (r.s_right = this.#r("lay", "left", i.s_right)) : (r.left = this.#r("lay", "left", i.right), r.align_x = "right") : (r.left = this.#r("lay", "left", i.center), r.align_x = "center") : r.left = this.#r("lay", "left", i.left), i.top === void 0 ? i.middle === void 0 ? i.bottom === void 0 ? i.s_bottom !== void 0 && (r.s_bottom = this.#r("lay", "top", i.s_bottom)) : (r.top = this.#r("lay", "top", i.bottom), r.align_y = "bottom") : (r.top = this.#r("lay", "top", i.middle), r.align_y = "middle") : r.top = this.#r("lay", "top", i.top);
				if (i.width !== void 0 && (r.width = t.#n("lay", "width", i.width)), i.height !== void 0 && (r.height = t.#n("lay", "height", i.height)), i.rotation !== void 0 && (r.rotation = t.#n("lay", "rotation", i.rotation)), i.scale_x !== void 0 && (r.scale_x = t.#n("lay", "scale_x", i.scale_x)), i.scale_y !== void 0 && (r.scale_y = t.#n("lay", "scale_y", i.scale_y)), i.pivot_x !== void 0 && (r.pivot_x = t.#n("lay", "pivot_x", i.pivot_x)), i.pivot_y !== void 0 && (r.pivot_y = t.#n("lay", "pivot_y", i.pivot_y)), i.blendmode !== void 0 && (r.blendmode = p(i.blendmode)), i.b_color !== void 0 && i.back_clear !== "true" && (r.b_color = t.#n("lay", "b_color", i.b_color)), i.style !== void 0 && (r.style = i.style), i.pl !== void 0 && (r.pl = t.#n("lay", "pl", i.pl)), i.pr !== void 0 && (r.pr = t.#n("lay", "pr", i.pr)), i.pt !== void 0 && (r.pt = t.#n("lay", "pt", i.pt)), i.pb !== void 0 && (r.pb = t.#n("lay", "pb", i.pb)), i.ffs !== void 0 && (r.ffs = i.ffs), i.noffs !== void 0 && (r.noffs = i.noffs), i.bura !== void 0 && (r.bura = i.bura !== "false"), i.kinsoku_sol !== void 0 && (r.kinsoku_sol = i.kinsoku_sol), i.kinsoku_eol !== void 0 && (r.kinsoku_eol = i.kinsoku_eol), i.kinsoku_dns !== void 0 && (r.kinsoku_dns = i.kinsoku_dns), i.kinsoku_bura !== void 0 && (r.kinsoku_bura = i.kinsoku_bura), A.setting(i), i.r_align !== void 0) {
					if (!J.includes(i.r_align)) throw `[lay] r_alignの値が不正です：${i.r_align}`;
					r.r_align = i.r_align;
				}
				i.in_style !== void 0 && (r.in_style = i.in_style), i.out_style !== void 0 && (r.out_style = i.out_style), Object.keys(r).length > 0 && a.push({
					t: "chgLay",
					nm: i.layer ?? "",
					page: e,
					sty: r
				});
				let o = i.layer ?? "";
				if ((i.float ?? "false") !== "false") a.push({
					t: "moveLay",
					nm: o,
					mode: "float"
				});
				else if (i.index) {
					let e = t.#n("lay", "index", i.index);
					e && a.push({
						t: "moveLay",
						nm: o,
						mode: "index",
						index: e
					});
				} else i.dive && a.push({
					t: "moveLay",
					nm: o,
					mode: "dive",
					dive: i.dive
				});
				return i.filter !== void 0 && a.push({
					t: "addFilter",
					aLayNm: [o],
					page: e,
					flt: u(i),
					replace: !0
				}), "skip";
			}
			case "add_filter": return a.push({
				t: "addFilter",
				aLayNm: t.#c(i.layer),
				page: t.#h("add_filter", i, "fore"),
				flt: u(i),
				replace: !1
			}), "skip";
			case "clear_filter": return a.push({
				t: "clearFilter",
				aLayNm: t.#c(i.layer),
				page: t.#h("clear_filter", i, "fore")
			}), "skip";
			case "enable_filter": return a.push({
				t: "enableFilter",
				aLayNm: t.#c(i.layer),
				page: t.#h("enable_filter", i, "fore"),
				index: t.#i("enable_filter", "index", i.index, 0),
				enabled: (i.enabled ?? "true") !== "false"
			}), "skip";
			case "clear_lay": {
				let e = i.page ?? "back";
				if (e !== "fore" && e !== "back" && e !== "both") throw `属性 page【${e}】が不正です`;
				let n = t.#c(i.layer);
				if (i.layer !== void 0 && n === null) throw "[clear_lay] layer属性が空です";
				if (e !== "back") if ((!n || n.includes(this.#v)) && this.#se(), n) for (let e of n) this.#y[e] = "";
				else for (let e of Object.keys(this.#y)) this.#y[e] = "";
				if (e !== "fore") if (n) for (let e of n) this.#b[e] = "";
				else for (let e of Object.keys(this.#b)) this.#b[e] = "";
				return a.push({
					t: "clearLay",
					aLayNm: n,
					page: e
				}), "skip";
			}
			case "trans": {
				let e = i.layer ?? "", n = e ? e.split(",").map((e) => e.trim()).filter((e) => e !== "") : null;
				if (n?.length === 0) throw "[trans] layer属性が空です";
				let r = Number(i.time ?? "0");
				if (!Number.isFinite(r) || r < 0) throw `[trans] timeの値が不正です：${i.time ?? ""}`;
				if (i.glsl !== void 0) throw "[trans] glsl=はサポートされません（WebGLシェーダを使わないため）";
				return a.push({
					t: "trans",
					aLayNm: n,
					time: this.skipEnabled ? 0 : r,
					...i.rule === void 0 ? {} : { rule: i.rule },
					...i.vague === void 0 ? {} : { vague: t.#n("trans", "vague", i.vague) }
				}), "skip";
			}
			case "wt": return a.push({
				t: "waitTrans",
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "finish_trans": return a.push({ t: "finishTrans" }), "skip";
			case "set_cancel_skip": return "skip";
			case "quake": {
				let e = this.skipEnabled ? 0 : t.#n("quake", "time", i.time ?? "");
				return e <= 0 || a.push({
					t: "quake",
					msec: e,
					hmax: n(t.#i("quake", "hmax", i.hmax, 10)),
					vmax: n(t.#i("quake", "vmax", i.vmax, 10))
				}), "skip";
			}
			case "stop_quake": return a.push({ t: "stopQuake" }), "skip";
			case "wq": return a.push({
				t: "waitQuake",
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "tsy": {
				let { layer: e } = i;
				if (!e) throw "[tsy] layerは必須です";
				let n = this.skipEnabled, r = n ? 0 : t.#n("tsy", "time", i.time ?? ""), o = n ? 0 : t.#i("tsy", "delay", i.delay, 0), s = t.#i("tsy", "repeat", i.repeat, 1), c = t.argPage(i, "fore");
				return i.filter !== void 0 && a.push({
					t: "addFilter",
					aLayNm: [e],
					page: c,
					flt: u(i),
					replace: !0
				}), a.push({
					t: "tsy",
					tw_nm: B("tsy", i),
					nm: e,
					page: c,
					msec: r,
					delay: o,
					ease: z(i.ease),
					repeat: s > 0 ? s - 1 : -1,
					yoyo: (i.yoyo ?? "false") !== "false",
					hTo: F("tsy", i),
					backlay: (i.backlay ?? "false") !== "false",
					...t.#m("tsy", i)
				}), "skip";
			}
			case "tsy_frame": {
				let { id: e } = i;
				if (!e) throw "[tsy_frame] idは必須です";
				this.#$("tsy_frame", e);
				let n = this.skipEnabled, r = t.#i("tsy_frame", "repeat", i.repeat, 1);
				return a.push({
					t: "tsyFrame",
					tw_nm: B("tsy_frame", i),
					id: e,
					msec: n ? 0 : t.#n("tsy_frame", "time", i.time ?? ""),
					delay: n ? 0 : t.#i("tsy_frame", "delay", i.delay, 0),
					ease: z(i.ease),
					repeat: r > 0 ? r - 1 : -1,
					yoyo: (i.yoyo ?? "false") !== "false",
					hTo: F("tsy_frame", i, N),
					...t.#m("tsy_frame", i, N)
				}), "skip";
			}
			case "wait_tsy": return a.push({
				t: "waitTsy",
				tw_nm: B("wait_tsy", i),
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return a.push({
				t: "stopTsy",
				tw_nm: B("stop_tsy", i)
			}), "skip";
			case "pause_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: B("pause_tsy", i),
				paused: !0
			}), "skip";
			case "resume_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: B("resume_tsy", i),
				paused: !1
			}), "skip";
			case "let":
				if (i.text === void 0) throw `[let] textは必須です（name:${i.name ?? ""}）`;
				return this.#ee("let", i, i.text), "skip";
			case "let_abs": {
				let e = t.#i("let_abs", "text", i.text, 0);
				return this.#ee("let_abs", i, String(e < 0 ? -e : e)), "skip";
			}
			case "let_round": {
				let e = t.#i("let_round", "text", i.text, 0);
				return this.#ee("let_round", i, String(Math.round(e))), "skip";
			}
			case "let_length": return this.#ee("let_length", i, String((i.text ?? "").length)), "skip";
			case "let_char_at": {
				let e = t.#i("let_char_at", "pos", i.pos, 0);
				return this.#ee("let_char_at", i, (i.text ?? "").charAt(e)), "skip";
			}
			case "let_index_of": {
				let { val: e } = i;
				if (!e) throw "[let_index_of] valは必須です";
				let n = t.#i("let_index_of", "start", i.start, 0);
				return this.#ee("let_index_of", i, String((i.text ?? "").indexOf(e, n))), "skip";
			}
			case "let_substr": {
				let n = t.#i("let_substr", "pos", i.pos, 0), r = i.text ?? "";
				return this.#ee("let_substr", i, i.len === "all" ? r.slice(n) : r.slice(n, n + e(t.#i("let_substr", "len", i.len, 1)))), "skip";
			}
			case "let_replace": return this.#ee("let_replace", i, (i.text ?? "").replace(t.#s("let_replace", i), String(i.val))), "skip";
			case "let_search": return this.#ee("let_search", i, String((i.text ?? "").search(t.#s("let_search", i)))), "skip";
			case "let_ml": {
				let e = i.name ?? "";
				if (!e) throw "[let_ml] nameは必須です";
				let t = "";
				for (; this.#_ < o && (t = this.#g.aToken[this.#_], t === ""); ++this.#_);
				if (this.#g.grm.testTagEndLetml(t)) return this.#O.set(e, "", "str"), ++this.#_, "skip";
				if (!this.#g.grm.testTagEndLetml(this.#g.aToken[this.#_ + 1] ?? "")) throw `[let_ml] 変数【${e}】の終端・[endlet_ml]がありません`;
				return this.#O.set(e, t, "str"), this.#_ += 2, "skip";
			}
			case "endlet_ml": return "skip";
			case "if": return this.#te(i), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#ne(), "skip";
			case "r": {
				let { nm: e, page: t } = this.#ae(i);
				return this.#oe(a, "\n", !0, e, t), "skip";
			}
			case "er": return (i.rec_page_break ?? "true") !== "false" && this.#se(), this.#y[this.#v] = "", this.#b[this.#v] = "", a.push({
				t: "chgStr",
				nm: this.#v,
				page: "both",
				str: ""
			}), a.push({
				t: "clearTxtLay",
				nm: this.#v,
				page: "both",
				clearFilter: i.clear_filter === "true"
			}), "skip";
			case "span": {
				let { nm: e, page: n } = this.#ae(i);
				return this.#oe(a, t.#ie("span", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, n), "skip";
			}
			case "link": {
				if (!i.url && !i.label && !i.fn) throw "[link] fn・label・urlのいずれかは必須です";
				i.clickse !== void 0 && (i.clicksebuf = i.clicksebuf || "SYS"), i.enterse !== void 0 && (i.entersebuf = i.entersebuf || "SYS"), i.leavese !== void 0 && (i.leavesebuf = i.leavesebuf || "SYS");
				let { nm: e, page: n } = this.#ae(i);
				return this.#oe(a, t.#ie("link", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, n), "skip";
			}
			case "endlink": {
				let { nm: e, page: n } = this.#ae(i);
				return this.#oe(a, t.#ie("endlink", {}), !0, e, n), "skip";
			}
			case "graph": {
				if (!i.pic) throw "[graph] picは必須です";
				let { nm: e, page: n } = this.#ae(i);
				return this.#oe(a, t.#ie("grp", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, n), "skip";
			}
			case "tcy": {
				if (!i.t) throw "[tcy] tは必須です";
				let { nm: e, page: n } = this.#ae(i);
				return this.#oe(a, t.#ie("tcy", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, n), "skip";
			}
			case "ruby2":
			case "ch": {
				if (r === "ruby2") {
					if (!i.t) throw "[ruby2] tは必須です";
					if (!i.r) throw "[ruby2] rは必須です";
					i.text = `｜${encodeURIComponent(i.t)}《${encodeURIComponent(i.r)}》`, delete i.t, delete i.r;
				}
				let { text: e } = i;
				if (!e) throw `[${r}] textは必須です`;
				let { nm: n, page: o } = this.#ae(i);
				return this.#oe(a, t.#ie("add", {
					...i,
					text: void 0,
					layer: void 0,
					page: void 0
				}) + e.replaceAll("[r]", "\n") + t.#ie("add_close", {}), i.record !== "false", n, o), "skip";
			}
			case "autowc": {
				let e = i.enabled === void 0 ? this.#O.get("game:const.sn.autowc.enabled") === !0 : i.enabled !== "false";
				this.#O.set("save:const.sn.autowc.enabled", e);
				let { text: r } = i;
				if ("text" in i != "time" in i) throw "[autowc] textとtimeは同時指定必須です";
				if (this.#O.set("save:const.sn.autowc.text", r ?? ""), !r) return this.#O.set("save:const.sn.autowc.time", ""), a.push({
					t: "autowc",
					enabled: e,
					hWait: {}
				}), "skip";
				let o = Array.from(r), s = String(i.time ?? "").split(",");
				if (s.length !== o.length) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
				let c = {};
				return o.forEach((e, r) => {
					c[e] = n(t.#n("autowc", "time", s[r] ?? ""));
				}), this.#O.set("save:const.sn.autowc.time", i.time ?? ""), a.push({
					t: "autowc",
					enabled: e,
					hWait: c
				}), "skip";
			}
			case "ch_in_style":
			case "ch_out_style": {
				let e = r === "ch_in_style" ? "in" : "out", { name: t, sty: n } = l(r, i, e === "in");
				if (this.#M[e].has(t)) throw `[${r}] name【${t}】はすでにあります`;
				return this.#M[e].add(t), a.push({
					t: "defChStyle",
					kind: e,
					nm: t,
					sty: n
				}), "skip";
			}
			case "rec_ch": {
				let { text: e, ...n } = i;
				return e ? (Object.keys(n).length && this.#A.setAttr(n), this.#A.add(t.#ie("add", {
					...i,
					text: void 0
				}) + e.replaceAll("[r]", "\n") + t.#ie("add_close", {})), "skip") : "skip";
			}
			case "rec_r": return this.#A.add("\n"), "skip";
			case "reset_rec": return this.#A.reset(i.text ?? ""), "skip";
			case "trace": return a.push({
				t: "trace",
				text: i.text ?? ""
			}), "skip";
			case "log": return a.push({
				t: "log",
				text: i.text ?? "",
				fn: this.fn,
				lineNum: this.lineNum
			}), "skip";
			case "jump": {
				i.count === "false" && this.#W();
				let e = i.label ?? "", t = i.fn ?? "";
				if (!e && !t) throw "[jump] fnまたはlabelは必須です";
				if (t && t !== this.fn) return a.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e);
				if (n === void 0) throw `[jump] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#_ = n, "skip";
			}
			case "call": {
				i.count !== "true" && this.#W();
				let e = i.label ?? "", t = i.fn ?? "";
				if (!e && !t) throw "[call] fnまたはlabelは必須です";
				if (t && t !== this.fn) return this.#X(this.#_, !0, i), a.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e);
				if (n === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#X(this.#_, !0, i), this.#_ = n, "skip";
			}
			case "return": return this.#re(a, i);
			case "macro": {
				let e = i.name ?? "";
				if (!e) throw "[macro] nameは必須です（試作仕様）";
				if (t.RESERVED_TAGS.has(e)) throw `[${e}]はタグ名のため、マクロ名として使用できません`;
				if (t.REG_NG4MAC_NM.test(e)) throw `[${e}]はマクロ名として異常です`;
				if (e in this.#z) throw `[macro] マクロ【${e}】は既に定義済みです`;
				this.#z[e] = {
					fn: this.fn,
					idx: this.#_
				};
				let n = !1, r = 0, a = !1;
				for (; this.#_ < o; ++this.#_) {
					let e = this.#g.aToken[this.#_];
					if (a) {
						this.#g.grm.testTagEndLetml(e) && (a = !1);
						continue;
					}
					if (e.charCodeAt(0) !== 91) continue;
					if (this.#g.grm.testTagLetml(e)) {
						a = !0;
						continue;
					}
					let { name: i } = t.parseTag(e);
					if (i === "macro") {
						++r;
						continue;
					}
					if (i === "endmacro") {
						if (r > 0) {
							--r;
							continue;
						}
						++this.#_, n = !0;
						break;
					}
				}
				if (!n) throw `[macro] マクロ【${e}】が[endmacro]で閉じられていません（試作仕様）`;
				return "skip";
			}
			case "char2macro":
			case "bracket2macro": return this.#g.defC2M(r, i, this.#B(), this.#_), "skip";
			case "endmacro": return this.#re(a);
			case "button": {
				let e = i.layer || this.#v;
				if (!e) throw "[button] layerは必須です（試作仕様）";
				let n = i.label ?? "", r = i.fn ?? "";
				if (!n && !r) throw "[button] fnまたはlabelは必須です";
				let { pic: o } = i;
				if (!o && !i.text) throw "[button] textまたはpic属性は必須です";
				let s = i.nm, c = i.call === "true", l = t.argPage(i, "back"), u = {};
				i.left === void 0 ? i.center === void 0 ? i.right === void 0 ? i.s_right !== void 0 && (u.s_right = this.#r("button", "left", i.s_right)) : (u.left = this.#r("button", "left", i.right), u.align_x = "right") : (u.left = this.#r("button", "left", i.center), u.align_x = "center") : u.left = this.#r("button", "left", i.left), i.top === void 0 ? i.middle === void 0 ? i.bottom === void 0 ? i.s_bottom !== void 0 && (u.s_bottom = this.#r("button", "top", i.s_bottom)) : (u.top = this.#r("button", "top", i.bottom), u.align_y = "bottom") : (u.top = this.#r("button", "top", i.middle), u.align_y = "middle") : u.top = this.#r("button", "top", i.top);
				for (let e of t.#f) {
					let n = i[e];
					n !== void 0 && Object.assign(u, { [e]: t.#n("button", e, n) });
				}
				return o || (u.width ??= 100, u.height ??= 30), i.enabled !== void 0 && (u.enabled = i.enabled !== "false"), i.blendmode !== void 0 && (u.blendmode = p(i.blendmode)), i.style !== void 0 && (u.style = t.#u(i.style)), i.style_hover !== void 0 && (u.style_hover = t.#u(i.style_hover)), i.style_clicked !== void 0 && (u.style_clicked = t.#u(i.style_clicked)), i.hint !== void 0 && (u.hint = i.hint), i.hint_style !== void 0 && (u.hint_style = i.hint_style), i.hint_opt !== void 0 && (u.hint_opt = i.hint_opt), o !== void 0 && (u.pic = o), i.b_pic !== void 0 && (u.b_pic = i.b_pic), i.clickse !== void 0 && (u.clickse = i.clickse, u.clicksebuf = i.clicksebuf || "SYS"), i.enterse !== void 0 && (u.enterse = i.enterse, u.entersebuf = i.entersebuf || "SYS"), i.leavese !== void 0 && (u.leavese = i.leavese, u.leavesebuf = i.leavesebuf || "SYS"), a.push({
					t: "addBtn",
					layerNm: e,
					page: l,
					text: o ? "" : i.text ?? "",
					label: n,
					call: c,
					...s === void 0 ? {} : { nm: s },
					...r ? { fn: r } : {},
					...Object.keys(u).length > 0 ? { sty: u } : {}
				}), "skip";
			}
			case "page": {
				if (!("clear" in i || "to" in i || "style" in i)) throw "[page] clear,style,to いずれかは必須です";
				if (i.key !== void 0 && a.push({
					t: "pageKeys",
					aKey: i.key ? i.key.split(",") : []
				}), i.style !== void 0) return a.push({
					t: "pageStyle",
					style: i.style
				}), "skip";
				if (i.clear === "true") return a.push({ t: "clearPageLog" }), "skip";
				if (i.to === void 0) return "skip";
				let e = i.to;
				if (!d.includes(e)) throw `[page] 属性to「${i.to}」は異常です`;
				return a.push({
					t: "pageTo",
					to: e
				}), "stop";
			}
			case "title": {
				let { text: e } = i;
				if (!e) throw "[title] textは必須です";
				return a.push({
					t: "title",
					text: e
				}), "skip";
			}
			case "toggle_full_screen": return a.push(i.key ? {
				t: "fullScrKey",
				key: i.key.toLowerCase()
			} : { t: "toggleFullScr" }), "skip";
			case "navigate_to": {
				let { url: e } = i;
				if (!e) throw "[navigate_to] urlは必須です";
				return a.push({
					t: "navigateTo",
					url: e
				}), "skip";
			}
			case "close": return a.push({ t: "close" }), "skip";
			case "update_check": {
				let { url: e } = i;
				if (!e) throw "[update_check] urlは必須です";
				if (!e.endsWith("/")) throw "[update_check] urlの末尾は/にして下さい";
				return a.push({
					t: "updateCheck",
					url: e
				}), "skip";
			}
			case "window": {
				let e = (e, t) => {
					let n = this.#O.get(`sys:const.sn.nativeWindow.${e}`);
					return n == null ? t : Number(n);
				}, n = (e) => Number(this.#O.get(`tmp:const.sn.config.window.${e}`) ?? 0), r = (e, n, r) => i[e] === void 0 ? i[n] === void 0 ? r : t.#n("window", n, i[n]) : t.#n("window", e, i[e]), o = {
					centering: i.centering === "true",
					x: r("x", "x", e("x", 0)),
					y: r("y", "y", e("y", 0)),
					w: r("width", "w", e("w", n("width"))),
					h: r("height", "h", e("h", n("height")))
				};
				return this.#O.set("sys:const.sn.nativeWindow.x", o.x), this.#O.set("sys:const.sn.nativeWindow.y", o.y), this.#O.set("sys:const.sn.nativeWindow.w", o.w), this.#O.set("sys:const.sn.nativeWindow.h", o.h), a.push({
					t: "window",
					...o
				}), "skip";
			}
			case "loadplugin": {
				let { fn: e } = i;
				if (!e) throw "[loadplugin] fnは必須です";
				if (!e.endsWith(".css")) throw "[loadplugin] サポートされない拡張子です";
				let t = (i.join ?? "true") !== "false";
				return a.push({
					t: "loadPlugin",
					fn: e,
					join: t
				}), t ? "stop" : "skip";
			}
			case "snapshot": return a.push({
				t: "snapshot",
				fn: i.fn ?? "",
				aLayNm: t.#c(i.layer),
				page: t.argPage(i, "fore"),
				width: t.#i("snapshot", "width", i.width, 0),
				height: t.#i("snapshot", "height", i.height, 0),
				smoothing: i.smoothing === "true",
				...i.b_color === void 0 ? {} : { b_color: t.#n("snapshot", "b_color", i.b_color) }
			}), "stop";
			case "clear_text": {
				let e = i.layer || this.#v, n = t.argPage(i, "fore");
				return e === this.#v && n === "fore" && this.#se(), this.#x(n)[e] = "", a.push({
					t: "chgStr",
					nm: e,
					page: n,
					str: ""
				}), "skip";
			}
			case "dump_val": return a.push({
				t: "trace",
				text: `[dump_val] ${JSON.stringify(this.#O.dump())}`
			}), "skip";
			case "dump_stack": return a.push({
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
			case "dump_lay": return a.push({
				t: "dumpLay",
				aLayNm: t.#c(i.layer)
			}), "skip";
			case "pop_stack":
				if ((i.clear ?? "false") !== "false") this.#P.length = 0;
				else if (!this.#P.pop()) throw "[pop_stack] スタックが空です";
				return this.#N.length = 0, this.#N.push(-1), this.#O.setMp({}), "skip";
			case "clearvar": return this.#O.clearGame(), "skip";
			case "clearsysvar": return this.#O.clearSys(), this.clearKidoku(), "skip";
			case "record_place": return this.recordPlace(), a.push({ t: "recordPlace" }), "skip";
			case "save": {
				if (i.place === void 0) throw "[save] placeは必須です";
				let e = t.#n("save", "place", i.place), n = {
					text: "",
					...i
				};
				delete n.place, a.push({
					t: "save",
					place: e,
					json: n
				});
				let r = Number(this.#O.get("sys:const.sn.save.place"));
				return e === r && this.#O.set("sys:const.sn.save.place", r + 1), "skip";
			}
			case "load":
				if (i.index === void 0 && "fn" in i != "label" in i) throw "[load] fnとlabelはセットで指定して下さい";
				return a.push({
					t: "load",
					place: t.#i("load", "place", i.place, 0),
					fn: i.fn ?? "",
					label: i.label ?? "",
					...i.index === void 0 ? {} : { index: t.#n("load", "index", i.index) },
					...i.do_rec === void 0 ? {} : { doRec: i.do_rec !== "false" }
				}), "stop";
			case "reload_script": return a.push({ t: "reloadScript" }), "stop";
			case "copybookmark": {
				let e = t.#n("copybookmark", "from", i.from ?? ""), n = t.#n("copybookmark", "to", i.to ?? "");
				return e === n || a.push({
					t: "copyBookmark",
					from: e,
					to: n
				}), "skip";
			}
			case "erasebookmark": return a.push({
				t: "eraseBookmark",
				place: t.#n("erasebookmark", "place", i.place ?? "")
			}), "skip";
			case "export": return a.push({ t: "exportData" }), "skip";
			case "import": return a.push({ t: "importData" }), "skip";
			case "event": {
				let e = i.key ?? "", t = e.toLowerCase();
				if (!t) throw "[event] keyは必須です";
				let n = t.startsWith("dom="), r = i.global === "true" ? this.#I : this.#F;
				if (i.del === "true") {
					if (i.fn || i.label || i.call) throw "[event] fn/label/callとdelは同時指定できません";
					return delete r[t], n && a.push({
						t: "resvDomEvent",
						rawKey: e,
						key: t,
						del: !0,
						needErr: !1
					}), "skip";
				}
				let o = i.label ?? "", s = i.fn ?? this.fn, { url: c } = i;
				if (!c && !o && !i.fn) throw "[event] fn,label いずれかは必須です";
				return r[t] = {
					fn: s,
					label: o,
					call: i.call === "true",
					arg: i.arg ?? "",
					...c ? { url: c } : {}
				}, n && a.push({
					t: "resvDomEvent",
					rawKey: e,
					key: t,
					del: !1,
					needErr: (i.need_err ?? "true") !== "false"
				}), "skip";
			}
			case "set_focus": {
				let { add: e, del: t, to: n } = i, r = (i.need_err ?? "true") !== "false";
				if (e !== void 0 || t !== void 0) {
					let n = e ?? t ?? "";
					if (!n.startsWith("dom=")) throw `[set_focus] add/delは'dom=…'書式のみです：${n}`;
					return a.push({
						t: "setFocus",
						mode: e === void 0 ? "del" : "add",
						rawKey: n,
						needErr: r
					}), "skip";
				}
				if (!n) throw "[set_focus] add か to は必須です";
				if (n !== "null" && n !== "next" && n !== "prev") throw `[set_focus] to【${n}】が不正です`;
				return a.push({
					t: "setFocus",
					mode: n
				}), "skip";
			}
			case "add_frame": {
				let { id: e, src: n } = i;
				if (!e) throw "[add_frame] idは必須です";
				if (!n) throw "[add_frame] srcは必須です";
				if (this.#O.get(`const.sn.frm.${e}`)) throw `[add_frame] frame【${e}】はすでにあります`;
				return a.push({
					t: "addFrame",
					id: e,
					src: n,
					sty: t.#p("add_frame", i)
				}), "stop";
			}
			case "frame": {
				let { id: e } = i;
				if (!e) throw "[frame] idは必須です";
				this.#$("frame", e);
				let n = (i.float ?? "false") === "false" ? i.index === void 0 ? i.dive ? { mode: "dive" } : void 0 : {
					mode: "index",
					index: t.#n("frame", "index", i.index)
				} : { mode: "float" };
				return a.push({
					t: "frame",
					id: e,
					sty: t.#p("frame", i),
					...n ? { order: n } : {},
					...i.disabled === void 0 ? {} : { disabled: i.disabled !== "false" }
				}), "skip";
			}
			case "set_frame": {
				let { id: e, var_name: t, text: n } = i;
				if (!e) throw "[set_frame] idは必須です";
				if (!t) throw "[set_frame] var_nameは必須です";
				if (!n) throw "[set_frame] textは必須です";
				return this.#$("set_frame", e), this.#O.set(`const.sn.frm.${e}.${t}`, n), a.push({
					t: "setFrame",
					id: e,
					var_name: t,
					text: n
				}), "skip";
			}
			case "let_frame": {
				let { id: e, var_name: t } = i;
				if (!e) throw "[let_frame] idは必須です";
				if (!t) throw "[let_frame] var_nameは必須です";
				return this.#$("let_frame", e), a.push({
					t: "letFrame",
					id: e,
					var_name: t,
					fnc: (i.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(i.global === "true"), "skip";
			case "enable_event": {
				let e = i.layer || this.#v, t = (i.enabled ?? "true") !== "false";
				return this.#O.set(`save:const.sn.layer.${e}.enabled`, t), a.push({
					t: "enableEvent",
					nm: e,
					enabled: t
				}), "skip";
			}
			case "wait": {
				let e = t.#n("wait", "time", i.time ?? "");
				return this.skipEnabled ? (!this.skipAll && !this.isNextKidoku && this.cancelAutoSkip(), "skip") : (a.push({
					t: "wait",
					msec: e,
					canskip: (i.canskip ?? "true") !== "false"
				}), "stop");
			}
			case "l":
			case "p":
			case "s":
			case "waitclick": {
				if (r === "l" && !this.tagLEnabled) return "skip";
				r === "p" && (this.#S = !0);
				let e = this.#K(r), n = {};
				for (let e of [
					"x",
					"y",
					"width",
					"height"
				]) {
					let a = i[e];
					a !== void 0 && (n[e] = t.#n(r, e, a));
				}
				return a.push({
					t: "stop",
					kind: r,
					key: `${this.fn}:${String(this.#_)}`,
					nm: this.#v,
					...e ? { resume: e } : {},
					...Object.keys(n).length > 0 ? { mark: n } : {}
				}), "stop";
			}
			case "playse":
			case "playbgm": {
				let e = r === "playbgm", n = !e && (i.canskip ?? "true") !== "false";
				if (this.skipEnabled && n) return "skip";
				let o = e ? "BGM" : i.buf || "SE", s = i.fn ?? "";
				if (!s) throw `[${r}] fnは必須です`;
				let c = e ? !0 : (i.loop ?? "false") !== "false", l = (i.join ?? "true") !== "false", u = t.#i(r, "speed", i.speed, 1), d = t.#i(r, "pan", i.pan, 0), f = t.#i(r, "start_ms", i.start_ms, 0);
				if (f < 0) throw `[${r}] start_ms:${String(f)} が負の値です`;
				let p = t.#i(r, "ret_ms", i.ret_ms, 0);
				if (p < 0) throw `[${r}] ret_ms:${String(p)} が負の値です`;
				let m = t.#i(r, "end_ms", i.end_ms, t.#o);
				if (m > 0) {
					if (m <= f) throw `[${r}] start_ms:${String(f)} >= end_ms:${String(m)} は異常値です`;
					if (m <= p) throw `[${r}] ret_ms:${String(p)} >= end_ms:${String(m)} は異常値です`;
				}
				let h = `const.sn.sound.${o}.`, g = t.#a(t.#i(r, "volume", i.volume, 1));
				this.#O.set(`save:${h}volume`, g), this.#O.set(`save:${h}fn`, s), this.#O.set(`save:${h}start_ms`, f), this.#O.set(`save:${h}end_ms`, m), this.#O.set(`save:${h}ret_ms`, p);
				let _ = g * Number(this.#O.get(`sys:${h}volume`, 1, !0));
				if (o === "BGM") _ *= this.#D;
				else if (o === "VOICE") {
					let e = Number(this.#O.get("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
					if (this.#D = e, e !== 1) {
						let t = "const.sn.sound.BGM.", n = Number(this.#O.get(`save:${t}volume`, 1, !0)) * Number(this.#O.get(`sys:${t}volume`, 1, !0)) * e;
						a.push({
							t: "duckBgm",
							volume: n
						});
					}
				}
				return c ? this.#T(o, s) : this.#E(o), a.push({
					t: "playSnd",
					buf: o,
					fn: s,
					loop: c,
					volume: _,
					speed: u,
					pan: d,
					start_ms: f,
					end_ms: m,
					ret_ms: p,
					join: l,
					canskip: n
				}), l ? "stop" : "skip";
			}
			case "stopse":
			case "stopbgm": {
				let e = r === "stopbgm" ? "BGM" : i.buf || "SE";
				return this.#E(e), a.push({
					t: "stopSnd",
					buf: e
				}), "skip";
			}
			case "stop_allse":
				for (let e of Object.keys(this.#w)) this.#E(e);
				return a.push({ t: "stopAllSnd" }), "skip";
			case "xchgbuf": {
				let e = i.buf || "SE", n = i.buf2 || "SE";
				if (e === n) return "skip";
				let r = {
					volume: 1,
					fn: "",
					start_ms: 0,
					end_ms: t.#o,
					ret_ms: 0
				}, o = `const.sn.sound.${e}.`, s = `const.sn.sound.${n}.`;
				for (let e of Object.keys(r)) {
					let t = this.#O.get(`save:${o}${e}`, r[e]), n = this.#O.get(`save:${s}${e}`, r[e]);
					this.#O.set(`save:${o}${e}`, n), this.#O.set(`save:${s}${e}`, t);
				}
				let c = this.#w[e], l = this.#w[n];
				return l === void 0 ? delete this.#w[e] : this.#w[e] = l, c === void 0 ? delete this.#w[n] : this.#w[n] = c, this.#O.set("save:const.sn.loopPlaying", JSON.stringify(this.#w)), a.push({
					t: "xchgBufSnd",
					buf: e,
					buf2: n
				}), "skip";
			}
			case "volume": {
				let e = i.buf || "SE", n = `const.sn.sound.${e}.`, r = t.#a(t.#i("volume", "volume", i.volume, 1));
				this.#O.set(`sys:${n}volume`, r);
				let o = Number(this.#O.get(`save:${n}volume`, 1, !0));
				return a.push({
					t: "volumeSnd",
					buf: e,
					volume: o * r
				}), "skip";
			}
			case "fadese":
			case "fadebgm":
			case "fadeoutse":
			case "fadeoutbgm": {
				let e = r === "fadebgm" || r === "fadeoutbgm", n = r === "fadeoutse" || r === "fadeoutbgm", o = e ? "BGM" : i.buf || "SE", s = `const.sn.sound.${o}.`, c = n ? 0 : t.#a(t.#n(r, "volume", i.volume ?? ""));
				this.#O.set(`save:${s}volume`, c);
				let l = Number(this.#O.get(`sys:${s}volume`, 1, !0)), u = (i.stop ?? (c === 0 ? "true" : "false")) !== "false";
				u && this.#E(o);
				let d = this.skipEnabled, f = d ? 0 : t.#n(r, "time", i.time ?? ""), p = d ? 0 : t.#i(r, "delay", i.delay, 0);
				return a.push({
					t: "fadeSnd",
					buf: o,
					volume: c * l,
					msec: f,
					delay: p,
					stop: u
				}), "skip";
			}
			case "stopfadese": return "skip";
			case "ws":
			case "wl": {
				let e = r === "wl" ? "BGM" : i.buf || "SE", t = (i.canskip ?? "false") !== "false", n = (i.stop ?? "true") !== "false";
				return a.push({
					t: "waitSnd",
					buf: e,
					canskip: t,
					stop: n
				}), "stop";
			}
			case "wf":
			case "wb": {
				let e = r === "wb" ? "BGM" : i.buf || "SE", t = (i.canskip ?? "false") !== "false";
				return a.push({
					t: "waitFade",
					buf: e,
					canskip: t
				}), "stop";
			}
			case "wv": {
				let e = i.fn ?? "";
				if (!e) throw "[wv] fnは必須です";
				let t = (i.stop ?? "true") !== "false", n = (i.canskip ?? "true") !== "false";
				return a.push({
					t: "waitVideo",
					fn: e,
					stop: t,
					canskip: n
				}), "stop";
			}
			default: {
				let e = this.#z[r];
				return e === void 0 ? "skip" : (this.#X(this.#_, !1, i), this.#O.setMp({
					...i,
					"const.sn.me_call_scriptFn": this.fn,
					"const.sn.macro": JSON.stringify({ name: r })
				}), e.fn === this.fn ? (this.#_ = e.idx, "skip") : (a.push({
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
	#te(e) {
		let n = e.exp ?? "";
		if (!n) throw "[if] expは必須です（試作仕様）";
		let r = this.#k.evalBool(n) ? this.#_ : -1, i = 0, a = !1, o = this.#g.len;
		for (; this.#_ < o; ++this.#_) {
			let e = this.#g.aToken[this.#_];
			if (a) {
				this.#g.grm.testTagEndLetml(e) && (a = !1);
				continue;
			}
			if (e.charCodeAt(0) !== 91) continue;
			if (this.#g.grm.testTagLetml(e)) {
				a = !0;
				continue;
			}
			let { name: n, args: o } = t.parseTag(e);
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
	#ae(e) {
		return {
			nm: e.layer || this.#v,
			page: t.argPage(e, "fore")
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
}, ae = class e {
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
		let a = this.#e ?? await this.#n, o = this.searchPath(n, _.HTML), s = await this.fetch(o);
		if (!s.ok) throw `[add_frame] HTMLの読込に失敗しました src:${n} ${s.statusText}`;
		let c = e.#m(await this.dec(o, await s.text()), o), l = document.createElement("iframe");
		l.id = t, l.style.cssText = "position: absolute; border: 0; overflow: hidden; pointer-events: auto;", a.appendChild(l), this.#r[t] = l, this.#i[t] = !1, this.#l(l, this.#a[t] = {
			visible: !0,
			alpha: 1,
			x: 0,
			y: 0,
			width: i.stageW,
			height: i.stageH,
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			...r
		}), await new Promise((e, n) => {
			l.onload = () => e(), l.onerror = () => n(/* @__PURE__ */ Error(`[add_frame] frame【${t}】の表示に失敗しました`)), l.srcdoc = c;
		});
		let u = e.#d(o);
		l.contentWindow.sn_repRes?.((e) => {
			this.#f(u, e.dataset.src ?? "").then((t) => {
				e.src = t;
			});
		}), l.contentDocument?.addEventListener("keydown", (e) => {
			document.dispatchEvent(new KeyboardEvent("keydown", {
				key: e.key,
				code: e.code,
				bubbles: !0,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			}));
		}), l.contentDocument?.addEventListener("contextmenu", (e) => {
			e.preventDefault(), document.dispatchEvent(new MouseEvent("contextmenu", {
				bubbles: !0,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			}));
		});
		let d = `const.sn.frm.${t}`;
		return {
			[d]: !0,
			[`${d}.alpha`]: r.alpha ?? 1,
			[`${d}.x`]: r.x ?? 0,
			[`${d}.y`]: r.y ?? 0,
			[`${d}.width`]: r.width ?? i.stageW,
			[`${d}.height`]: r.height ?? i.stageH,
			[`${d}.scale_x`]: r.scale_x ?? 1,
			[`${d}.scale_y`]: r.scale_y ?? 1,
			[`${d}.rotate`]: r.rotate ?? 0,
			[`${d}.visible`]: r.visible ?? !0
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
			if (t) for (let e of t.querySelectorAll("input, select, button")) e.disabled = r;
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
				this.getDisabled(a) || (t !== "keydown" || n.key === "Enter") && (t === "keydown" && (n.stopImmediatePropagation(), n.preventDefault()), i(e));
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
			let e = this.searchPath(t, _.SP_GSM);
			return await m(e, this.crypto, this.fetch, this.decAB);
		} catch {
			return e + t.replace(/^\.\//, "");
		}
	}
	static #p = /\s(?:src|href)=(["'])(\S+?)\1/g;
	static #m(t, n) {
		let r = e.#d(n);
		return t.replaceAll(e.#p, (e, t, n) => n.startsWith("../") ? r + e.slice(3) : e.replace("./", "").replace(t, t + r));
	}
}, oe = /* @__PURE__ */ new Set([
	"IFRAME",
	"SCRIPT",
	"CANVAS",
	"VIDEO"
]);
function se(e) {
	return /\.jpe?g$/i.test(e) ? "image/jpeg" : "image/png";
}
function ce(e) {
	let t = r("-", "_", ""), n = /\.\w+$/.exec(e);
	return n ? e.slice(0, n.index) + t + n[0] : `${e}${t}.png`;
}
function le(e) {
	let t = (e >>> 24) / 255;
	return `rgba(${String(e >> 16 & 255)}, ${String(e >> 8 & 255)}, ${String(e & 255)}, ${String(t)})`;
}
async function ue(e) {
	let t = e.el.cloneNode(!0);
	t.style.transform = "none", t.style.width = `${String(e.sw)}px`, t.style.height = `${String(e.sh)}px`, de(t, e.page, e.aLayNm), await fe(t);
	let n = new XMLSerializer().serializeToString(t), r = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(e.sw)}" height="${String(e.sh)}"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${me()}</style>${n}</div></foreignObject></svg>`, i = await he(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(r)}`), a = document.createElement("canvas");
	a.width = e.width, a.height = e.height;
	let o = a.getContext("2d");
	if (!o) throw "canvasの2Dコンテキストが取れません";
	return o.imageSmoothingEnabled = e.smoothing, o.fillStyle = e.bgColor, o.fillRect(0, 0, e.width, e.height), o.drawImage(i, 0, 0, e.width, e.height), a.toDataURL(e.mime);
}
function de(e, t, n) {
	for (let r of [...e.querySelectorAll("*")]) {
		if (oe.has(r.tagName)) {
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
async function fe(e) {
	let t = [...e.querySelectorAll("img")];
	await Promise.all(t.map(async (e) => {
		let { src: t } = e;
		if (!(!t || t.startsWith("data:"))) try {
			e.setAttribute("src", await pe(t));
		} catch {
			e.remove();
		}
	}));
}
async function pe(e) {
	let t = await fetch(e);
	if (!t.ok) throw `画像が取得できません url:${e}`;
	let n = await t.blob();
	return new Promise((t, r) => {
		let i = new FileReader();
		i.onload = () => t(String(i.result)), i.onerror = () => r(/* @__PURE__ */ Error(`画像が読めません url:${e}`)), i.readAsDataURL(n);
	});
}
function me() {
	let e = [];
	for (let t of [...document.styleSheets]) try {
		for (let n of [...t.cssRules]) e.push(n.cssText);
	} catch {}
	return e.join("\n");
}
function he(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error("スナップショットの画像化に失敗しました")), r.src = e;
	});
}
function ge(e, t) {
	let n = document.createElement("a");
	n.href = t, n.download = e, n.click();
}
//#endregion
//#region src/ts/Font.ts
function _e(e) {
	return e.matchPath(".+", _.FONT).flatMap((e) => Object.values(e)).filter((e) => typeof e == "string").map((t) => `@font-face {
	font-family: ${JSON.stringify(t)};
	src: url(${JSON.stringify(e.searchPath(t, _.FONT))});
}`).join("\n");
}
function ve(e, t = document) {
	let n = _e(e);
	if (!n) return;
	let r = t.createElement("style");
	r.dataset.sn = "font", r.textContent = n, t.head.appendChild(r);
}
//#endregion
//#region src/ts/SndBuf.ts
var ye = 999e3, be = class {
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
}, xe = {
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
}, Se = class {
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
		for (let [n, r] of Object.entries(xe)) t[n] = e.canPlayType(r) !== "";
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
		let { ctx: a, gn: o } = this.#n(), s = new be(a, o, e, t, n);
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
}, Ce = class e {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#m = new a(e, ""), this.#C = new ae((t, n) => e.cfg.searchPath(t, n), (t, n) => e.fetch(t, n), (t, n) => e.dec(t, n), (t) => e.decAB(t), e.crypto), this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
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
			let e = this.#r = new ie(t);
			this.#s(e), e.defSetTrigger("sys:sn.sound.global_volume", (e) => {
				this.#w.setGlobalVol(Number(e)), this.#E();
			}), e.defSetTriggerSoundVol((t, n) => {
				let r = Number(e.getVal(`save:const.sn.sound.${t}.volume`) ?? 1);
				this.#w.setVol(t, r * Number(n));
			}), e.defSetTrigger("sys:sn.sound.movie_volume", () => this.#E()), await this.#g(e), ve(this.sys.cfg);
		}
		this.go = () => this.#k(), this.$trgNext();
	}
	#s(e) {
		let { oCfg: t } = this.sys.cfg, n = {
			"const.sn.config.window.width": () => i.stageW,
			"const.sn.config.window.height": () => i.stageH,
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
	#c = new s(() => this.sys.cfg.oCfg.log.max_len);
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
		this.#m = new a(this.sys, this.sys.cfg.oCfg.save_ns);
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
		return this.#n[e] ??= new k(e, await this.#Ge(e), this.#S());
	}
	#x;
	#S() {
		if (this.#x) return this.#x;
		let e = this.#x = new C(this.sys.cfg);
		return e.setEscape(this.sys.cfg.oCfg.init.escape), V(this.sys.cfg.oCfg.init.escape), e;
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
	#w = new Se((e, t) => this.myTrace(e, t), (e, t) => this.sys.fetch(e, t), (e) => this.sys.decAB(e));
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
			end_ms: ye,
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
	#ee(t) {
		let n = this.$fncs.getLaySty(t.nm, t.page), { from: r, aTo: i, aPrp: a } = e.#ne(t, (e) => {
			let t = n[e] ?? P[e];
			if (t === void 0) throw `[tsy] ${e} は [lay ${e}=…] で寸法を明示したレイヤにしか使えません`;
			return t;
		});
		this.#re(t, r, i, () => {
			let e = {};
			for (let t of a) Object.assign(e, { [t]: r[t] });
			this.$fncs.chgLay({
				nm: t.nm,
				page: t.page,
				sty: e
			});
		}, t.backlay ? () => {
			let e = {};
			for (let t of a) Object.assign(e, { [t]: r[t] });
			this.$fncs.chgLay({
				nm: t.nm,
				page: t.page === "fore" ? "back" : "fore",
				sty: e
			});
		} : void 0);
	}
	#te(t) {
		let n = this.#C.getSty(t.id), { from: r, aTo: i, aPrp: a } = e.#ne(t, (e) => n[e] ?? 0);
		this.#re(t, r, i, () => {
			let e = {};
			for (let t of a) Object.assign(e, { [t]: r[t] });
			this.#Fe(this.#C.frame(t.id, e));
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
			let e = h.timeline({
				paused: c,
				onComplete: l
			});
			for (let r of n) e.to(t, {
				...r,
				...s
			});
			u = e;
		} else u = h.to(t, {
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
		let r = h.to(n.gain, {
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
		let n = e.fn.startsWith(g), r = n ? e.fn : ce(e.fn || "snapshot"), a = se(r), { stageW: o, stageH: s } = i, c = e.width || o, l = e.height || s, u = (e.aLayNm === null && e.page === "fore" && e.b_color === void 0 ? await this.sys.capturePage(this.#Pe(t), c, l, a) : "") || await ue({
			el: t,
			sw: o,
			sh: s,
			width: c,
			height: l,
			bgColor: e.b_color === void 0 ? "black" : le(e.b_color),
			page: e.page,
			aLayNm: e.aLayNm,
			mime: a,
			smoothing: e.smoothing
		});
		n ? this.#m.putFile(r, u) : ge(r, u);
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
		return this.#Ie[e] ??= this.sys.cfg.matchPath(`^${t}$`, _.SP_GSM).length > 0 ? this.sys.cfg.searchPath(t, _.SP_GSM) : "";
	}
	#Re(e, t) {
		if (!t) return "";
		if (t.startsWith("userdata:/")) return this.#m.getFile(t) || (this.myTrace(`[${e}] 保存された画像がありません fn:${t}`, "E"), "");
		try {
			return this.sys.cfg.searchPath(t, _.SP_GSM);
		} catch (n) {
			return this.myTrace(`[${e}] 画像が見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#ze(e, t) {
		if (!t) return "";
		try {
			return this.sys.cfg.searchPath(t, _.SOUND);
		} catch (n) {
			return this.myTrace(`[${e}] 音声ファイルが見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#Be(e) {
		return m(e, this.sys.crypto, this.sys.fetch, (e) => this.sys.decAB(e));
	}
	#Ve = /* @__PURE__ */ new Map();
	#He = /* @__PURE__ */ new Map();
	#Ue() {
		let e = this.#r;
		if (e) for (let t of new Set(e.peekUpcomingPicFn())) {
			let e;
			try {
				e = this.sys.cfg.searchPath(t, _.SP_GSM);
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
	#We(e) {
		switch (e.t) {
			case "addLay":
				this.$fncs.addLayer(e.cls === "grp" ? {
					cls: "grp",
					nm: e.nm,
					fn: "",
					src: "",
					isSheet: !1,
					isMovie: !1,
					aFace: []
				} : {
					cls: "txt",
					nm: e.nm,
					str: "",
					aCh: [],
					aBtn: [],
					b_alpha: 1,
					enabled: !0
				});
				break;
			case "chgPic": {
				let t = this.#Re("lay", e.fn), n = t.endsWith(".json"), r = /\.(?:mp4|webm)$/i.test(t), i = e.aFace?.map((e) => ({
					...e,
					src: this.#Re("add_face", e.fn)
				}));
				if (!this.sys.crypto) {
					this.$fncs.chgPic({
						nm: e.nm,
						page: e.page,
						fn: e.fn,
						src: t,
						isSheet: n,
						isMovie: r,
						...i && { aFace: i }
					});
					break;
				}
				let a = `${e.nm}:${e.page}`, o = (this.#Ve.get(a) ?? 0) + 1;
				this.#Ve.set(a, o), this.$fncs.chgPic({
					nm: e.nm,
					page: e.page,
					fn: e.fn,
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
				Promise.all([s(t), ...i?.map((e) => s(e.src)) ?? []]).then(([t, ...s]) => {
					this.#Ve.get(a) === o && this.$fncs.chgPic({
						nm: e.nm,
						page: e.page,
						fn: e.fn,
						src: t,
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
					nm: e.nm,
					page: e.page,
					...e.b_alpha === void 0 ? {} : { b_alpha: e.b_alpha },
					...e.isFixed === void 0 ? {} : { isFixed: e.isFixed }
				});
				break;
			case "chgBPic":
				this.$fncs.chgBPic({
					nm: e.nm,
					page: e.page,
					fn: e.fn,
					src: e.fn ? this.#Re("lay b_pic", e.fn) : ""
				});
				break;
			case "chgBackClear":
				this.$fncs.chgBackClear({
					nm: e.nm,
					page: e.page
				});
				break;
			case "finishTrans":
				this.#V();
				break;
			case "trans":
				this.#V(), this.$fncs.startTrans({
					aLayNm: e.aLayNm,
					time: e.time,
					...e.rule ? { ruleSrc: this.#Re("trans", e.rule) } : {},
					...e.vague === void 0 ? {} : { vague: e.vague }
				}), this.#B(e.time, e.aLayNm);
				break;
			case "waitTrans": break;
			case "chgStr":
				{
					let t = G(e.str);
					for (let e of t) e.pic && (e.src = this.#Re("graph", e.pic));
					this.$fncs.chgStr({
						nm: e.nm,
						page: e.page,
						str: K(t),
						aCh: t
					});
				}
				break;
			case "addBtn": {
				let t = e.sty && {
					...e.sty,
					...e.sty.pic ? { src: this.#Re("button pic", e.sty.pic) } : {},
					...e.sty.b_pic ? { b_src: this.#Re("button b_pic", e.sty.b_pic) } : {}
				};
				this.$fncs.addBtn({
					layerNm: e.layerNm,
					page: e.page,
					...e.nm === void 0 ? {} : { nm: e.nm },
					text: e.text,
					label: e.label,
					...e.call === void 0 ? {} : { call: e.call },
					...e.fn === void 0 ? {} : { fn: e.fn },
					...t === void 0 ? {} : { sty: t }
				});
				break;
			}
			case "chgLay":
				this.$fncs.chgLay({
					nm: e.nm,
					page: e.page,
					sty: e.sty
				});
				break;
			case "defChStyle":
				this.$fncs.defChStyle({
					kind: e.kind,
					nm: e.nm,
					sty: e.sty
				});
				break;
			case "autowc":
				this.$fncs.setAutowc({
					enabled: e.enabled,
					h: e.hWait
				});
				break;
			case "clearLay":
				this.$fncs.clearLay({
					aLayNm: e.aLayNm,
					page: e.page
				});
				break;
			case "clearTxtLay":
				this.$fncs.clearTxtLay({
					nm: e.nm,
					page: e.page,
					clearFilter: e.clearFilter
				});
				break;
			case "addFilter":
				this.$fncs.chgFilter({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: e.replace ? "replace" : "add",
					flt: e.flt
				});
				break;
			case "clearFilter":
				this.$fncs.chgFilter({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: "clear"
				});
				break;
			case "enableFilter":
				this.$fncs.chgFilter({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: "enable",
					index: e.index,
					enabled: e.enabled
				});
				break;
			case "moveLay":
				this.$fncs.moveLay({
					nm: e.nm,
					mode: e.mode,
					...e.index === void 0 ? {} : { index: e.index },
					...e.dive === void 0 ? {} : { dive: e.dive }
				});
				break;
			case "enableEvent":
				this.$fncs.enableEvent({
					nm: e.nm,
					enabled: e.enabled
				});
				break;
			case "wait": break;
			case "tsy":
				this.#ee(e);
				break;
			case "tsyFrame":
				this.#te(e);
				break;
			case "quake":
				this.#K(e);
				break;
			case "stopQuake":
				this.#q();
				break;
			case "waitQuake": break;
			case "waitTsy": break;
			case "stopTsy":
				this.#ae(e.tw_nm);
				break;
			case "pauseTsy":
				this.#Q[e.tw_nm]?.tw.paused(e.paused);
				break;
			case "playSnd":
				e.join || this.#se(e).catch(this.#i);
				break;
			case "stopSnd":
				this.#w.stop(e.buf);
				break;
			case "stopAllSnd":
				this.#w.stopAll();
				break;
			case "xchgBufSnd":
				this.#be(e.buf), this.#be(e.buf2), this.#w.xchgBuf(e.buf, e.buf2);
				break;
			case "duckBgm":
				this.#w.setVol("BGM", e.volume);
				break;
			case "volumeSnd":
				this.#w.setVol(e.buf, e.volume);
				break;
			case "fadeSnd":
				this.#he(e);
				break;
			case "waitSnd": break;
			case "waitFade": break;
			case "waitVideo": break;
			case "title":
				this.$fncs.addTitle(e.text);
				break;
			case "toggleFullScr":
				this.$fncs.toggleFullScr();
				break;
			case "navigateTo":
				this.navigateTo(e.url);
				break;
			case "loadPlugin":
				e.join || this.#Me(e.fn).catch(this.#i);
				break;
			case "snapshot": break;
			case "recordPlace":
				this.#y = this.#v();
				break;
			case "save":
				this.#m.setMark(e.place, {
					...this.#y ?? this.#v(),
					json: e.json
				}), this.#_();
				break;
			case "load":
			case "reloadScript": break;
			case "copyBookmark":
				this.#m.copyMark(e.from, e.to);
				break;
			case "eraseBookmark":
				this.#m.eraseMark(e.place);
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
				this.#D.add(e.key);
				break;
			case "dumpLay": {
				let { fore: t, back: n } = this.$fncs.getPages(), r = (t) => e.aLayNm ? t.filter((t) => e.aLayNm.includes(t.nm)) : t;
				this.myTrace(`[dump_lay] ${JSON.stringify({
					fore: r(t),
					back: r(n)
				})}`, "D");
				break;
			}
			case "frame":
				this.#Fe(this.#C.frame(e.id, e.sty, e.order, e.disabled));
				break;
			case "setFrame":
				this.#C.set(e.id, e.var_name, e.text);
				break;
			case "resvDomEvent": {
				let t = this.#C.resvDom(e.rawKey, e.key, e.del, e.needErr, (t) => {
					this.cancelAuto();
					for (let [e, n] of Object.entries(t.dataset)) this.#r?.setValNochk(`sn.event.domdata.${e}`, n ?? "");
					this.fireEvent(e.key);
				});
				!e.del && t[0] && o.add(t[0]);
				break;
			}
			case "setFocus":
				switch (e.mode) {
					case "add":
						for (let t of this.#C.resolveDom(e.rawKey, e.needErr ?? !0)) o.add(t);
						break;
					case "del":
						for (let t of this.#C.resolveDom(e.rawKey, e.needErr ?? !0)) o.remove(t);
						break;
					case "null":
						o.blur();
						break;
					case "next":
						o.next();
						break;
					case "prev": o.prev();
				}
				break;
			case "addFrame":
			case "letFrame": break;
			case "close":
				this.sys.close();
				break;
			case "window":
				this.sys.window(e);
				break;
			case "updateCheck":
				this.sys.updateCheck(e.url);
				break;
			case "clearPageLog":
				this.#c.clear(), this.#l = void 0, this.#r?.setValNochk("save:const.sn.styPaging", c), this.#f();
				break;
			case "pageStyle":
				this.#r?.setValNochk("save:const.sn.styPaging", e.style), this.#f();
				break;
			case "pageKeys":
				this.#u = e.aKey;
				break;
			case "pageTo": break;
			case "trace":
				this.#Ke({ text: e.text });
				break;
			case "log":
				this.#Je({ text: e.text }, e.fn, e.lineNum);
				break;
			case "loadScript": break;
			case "stop": {
				let t = this.#l;
				if (this.#l = void 0, t && this.#c.push(t.fn, t.idx, t.mark, t.clearOnResume), this.#d = !1, this.#f(), e.kind === "l" || e.kind === "p") {
					let t = this.#Le(e.kind);
					this.$fncs.setWait({
						nm: e.nm,
						kind: e.kind,
						...t ? { src: t } : {},
						...e.mark
					});
				}
				this.#A = e.kind === "s", e.resume ? this.#P(e.resume.mode, e.resume.msec) : this.$fncs.setSkipping(!1), this.#_(), this.$fncs.setBackAlpha(Number(this.#r?.getVal("sys:TextLayer.Back.Alpha") ?? 1)), this.$fncs.setBtnFont(String(this.#r?.getVal("tmp:sn.button.fontFamily") ?? "") || f), this.#r && this.$fncs.setChWait(this.#r.chWait);
				break;
			}
		}
	}
	async #Ge(e) {
		try {
			let t = this.sys.cfg.searchPath(e, _.SCRIPT), n = await this.sys.fetch(t);
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
		let a = "";
		return this.#qe && (this.#qe = !1, a = `== ${i.plat_desc} ==\n`), this.sys.appendFile(this.sys.path_downloads + "log.txt", `${a}--- ${r("-", "_", "")} [fn:${t} line:${String(n)}] prj:${this.sys.arg.cur}\n${e.text || `(text is ${String(e.text)})`}\n`), !1;
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
				i.isDarkMode && (n = "color:#49F;");
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
export { Ce as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map