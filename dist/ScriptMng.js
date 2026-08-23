import { a as e, c as t, o as n, s as r, t as i } from "./CmnLib.js";
import { t as a } from "./FocusMng.js";
import { DEF_BTN_FONT as o, b as s, n as c, p as l, r as u, s as d, t as f } from "./store.js";
import { o as p, r as m } from "./Sprite.js";
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
function x(e) {
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
var S = class {
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
				let r = e.aToken[t];
				if (!this.#o.test(r)) continue;
				let [i, a] = b(r);
				this.#l.parse(a);
				let o = this.#l.hPrm.fn;
				if (!o) continue;
				let { val: s } = o;
				if (!s.endsWith("*")) continue;
				e.aToken.splice(t, 1, "	", "; " + r), e.aLNum.splice(t, 1, NaN, NaN);
				let c = i === "loadplugin" ? g.CSS : g.SN, l = this.cfg.matchPath("^" + s.slice(0, -1) + ".*", c);
				for (let i of l) {
					let a = r.replace(this.#s, "fn=" + decodeURIComponent(n(i[c])));
					e.aToken.splice(t, 0, a), e.aLNum.splice(t, 0, NaN);
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
function C() {
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
var w = { save: "game" }, T = class e {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = /* @__PURE__ */ new Set();
	#r = Object.create(null);
	#i;
	constructor() {
		this.#a();
	}
	#a() {
		for (let [e, t] of Object.entries(C())) this.#e[`sys.${e}`] = typeof t == "function" ? 1 : t;
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
			ns: w[r] ?? r,
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
	set(e, t, n = "") {
		this.#c(e, t, n, !0);
	}
	setNochk(e, t, n = "") {
		this.#c(e, t, n, !1);
	}
	#c(t, n, r, i) {
		let { ns: a, key: o } = e.parseName(t);
		if (a === "tmp" && o in this.#t) throw `組み込み変数【${t}】へは代入できません`;
		let s = `${a}.${o}`;
		if (i && o.startsWith("const.") && s in this.#e) throw `変数【${t}】は書き換え不可です`;
		r === "str" ? this.#n.add(s) : this.#n.delete(s);
		let c = e.castTo(n, r);
		if (this.#e[s] = c, this.#r[s]?.(c), a === "sys" && this.#i) {
			let e = /^const\.sn\.sound\.([^.]+)\.volume$/.exec(o);
			e && this.#i(e[1], c);
		}
	}
	static castTo(n, i) {
		switch (i) {
			case "": return n;
			case "num": return e.#l(n);
			case "int": return r(e.#l(n));
			case "uint": return t(e.#l(n));
			case "bool": return n != null && String(n) !== "false" && !!String(n);
			case "str": return n == null ? n : String(n);
			default: throw `cast【${String(i)}】は未定義です`;
		}
	}
	static #l(e) {
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
		this.#u("mp.");
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
		this.#u(n);
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
		this.#u("game.");
	}
	clearSys() {
		this.#u("sys."), this.#a();
	}
	#u(e) {
		for (let t of Object.keys(this.#e)) t.startsWith(e) && (delete this.#e[t], this.#n.delete(t));
	}
}, ee = /\[[^\]]+\]/g, te = {
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
			let i = e.charCodeAt(n);
			if (i === 32 || i === 9 || i === 10 || i === 13) {
				++n;
				continue;
			}
			let a = e.slice(n), o;
			if ((o = /^0x[0-9a-fA-F]+/.exec(a)) || (o = /^(0|[1-9][0-9]*)\.[0-9]+/.exec(a))) {
				t.push({
					t: "NUM",
					v: ["!num!", Number(o[0])]
				}), n += o[0].length;
				continue;
			}
			if (o = /^(0|[1-9][0-9]*)/.exec(a)) {
				t.push({
					t: "NUM",
					v: ["!num!", r(o[0])]
				}), n += o[0].length;
				continue;
			}
			if (a.startsWith("null")) {
				t.push({
					t: "NULL",
					v: ["!str!", null]
				}), n += 4;
				continue;
			}
			if (o = /^(true|false)/.exec(a)) {
				t.push({
					t: "BOOL",
					v: ["!bool!", o[0] === "true"]
				}), n += o[0].length;
				continue;
			}
			if (o = this.#t.exec(a)) {
				t.push({
					t: "STR",
					v: ["!str!", o[0].slice(1, -1).replaceAll(this.#e, "")]
				}), n += o[0].length;
				continue;
			}
			let s = a.slice(0, 3);
			if (s === ">>>" || s === "===" || s === "!==") {
				t.push({ t: s }), n += 3;
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
				t.push({ t: c }), n += 2;
				continue;
			}
			let l = a.charAt(0);
			if ("()!~*/%+-<>&^|:?¥".includes(l)) {
				t.push({ t: l }), ++n;
				continue;
			}
			let u = /^[A-Za-z_][A-Za-z0-9_]*/.exec(a);
			if (u && a.charAt(u[0].length) === "(") {
				t.push({
					t: "FUNC",
					v: u[0]
				}), n += u[0].length;
				continue;
			}
			if (o = this.#n.exec(a)) {
				let e = o[0];
				a.slice(e.length, e.length + 4) === "@str" && (e += "@str"), t.push({
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
				let i = r(), a = i && te[i.t];
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
		let t = e.replaceAll(ee, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
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
		int: (e) => r(this.#c(e.shift())),
		parseInt: (e) => r(this.#s.Number(e)),
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
}, re = class e {
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
	constructor(e, t, n = new S()) {
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
	static #r = /(\*{2,})([^|]*)/;
	static #i = /^\[macro\s/;
	static #a = /^\[endmacro[\s\]]/;
	label2idx(t, n, r = !1) {
		if (t && !t.startsWith("*")) throw `[jump系] labelは*で始まります：${t}`;
		let i = t.match(e.#r);
		if (!i) return this.#t[t];
		let a = i[1];
		if (i[2] === "before") {
			for (let t = n - 1; t >= 0; --t) {
				if (r && e.#i.test(this.aToken[t])) return;
				if (this.aToken[t] === a) return t + 1;
			}
			return;
		}
		if (i[2] === "after") {
			for (let t = n + 1; t < this.len; ++t) {
				if (e.#a.test(this.aToken[t])) return;
				if (this.aToken[t] === a) return t + 1;
			}
			return;
		}
	}
	defC2M(e, t, n, r) {
		this.grm[e](t, n, this.#e, r), this.#n();
	}
}, ie = class e {
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
}, ae = class e {
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
}, oe = [
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
], se = [
	"alpha",
	"x",
	"y",
	"width",
	"height",
	"scale_x",
	"scale_y",
	"rotate"
], ce = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function le(e, t, n = oe) {
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
var ue = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
function de(e, t, n = oe) {
	let r = [];
	for (let { groups: i } of t.matchAll(ue)) {
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
		r.push(le(e, d, n));
	}
	return r;
}
function fe(e) {
	return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
}
var pe = {
	"Back.In": (e) => e === 1 ? 1 : e * e * (2.70158 * e - 1.70158),
	"Back.InOut": (e) => {
		let t = 2.5949095;
		return (e *= 2) < 1 ? .5 * (e * e * (3.5949095 * e - t)) : .5 * ((e -= 2) * e * (3.5949095 * e + t) + 2);
	},
	"Back.Out": (e) => e === 0 ? 0 : --e * e * (2.70158 * e + 1.70158) + 1,
	"Bounce.In": (e) => 1 - fe(1 - e),
	"Bounce.InOut": (e) => e < .5 ? (1 - fe(1 - e * 2)) * .5 : fe(e * 2 - 1) * .5 + .5,
	"Bounce.Out": (e) => fe(e),
	"Circular.In": (e) => 1 - Math.sqrt(1 - e * e),
	"Circular.InOut": (e) => (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
	"Circular.Out": (e) => Math.sqrt(1 - --e * e),
	"Cubic.In": (e) => e * e * e,
	"Cubic.InOut": (e) => (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2),
	"Cubic.Out": (e) => --e * e * e + 1,
	"Elastic.In": (e) => e === 0 ? 0 : e === 1 ? 1 : -(2 ** (10 * (e - 1))) * Math.sin((e - 1.1) * 5 * Math.PI),
	"Elastic.InOut": (e) => e === 0 ? 0 : e === 1 ? 1 : (e *= 2, e < 1 ? -.5 * 2 ** (10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) : .5 * 2 ** (-10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) + 1),
	"Elastic.Out": (e) => e === 0 ? 0 : e === 1 ? 1 : 2 ** (-10 * e) * Math.sin((e - .1) * 5 * Math.PI) + 1,
	"Exponential.In": (e) => e === 0 ? 0 : 1024 ** (e - 1),
	"Exponential.InOut": (e) => e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? .5 * 1024 ** (e - 1) : .5 * (-(2 ** (-10 * (e - 1))) + 2),
	"Exponential.Out": (e) => e === 1 ? 1 : 1 - 2 ** (-10 * e),
	"Linear.None": (e) => e,
	"Quadratic.In": (e) => e * e,
	"Quadratic.InOut": (e) => (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1),
	"Quadratic.Out": (e) => e * (2 - e),
	"Quartic.In": (e) => e * e * e * e,
	"Quartic.InOut": (e) => (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2),
	"Quartic.Out": (e) => 1 - --e * e * e * e,
	"Quintic.In": (e) => e * e * e * e * e,
	"Quintic.InOut": (e) => (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2),
	"Quintic.Out": (e) => --e * e * e * e * e + 1,
	"Sinusoidal.In": (e) => 1 - Math.sin((1 - e) * Math.PI / 2),
	"Sinusoidal.InOut": (e) => .5 * (1 - Math.sin(Math.PI * (.5 - e))),
	"Sinusoidal.Out": (e) => Math.sin(e * Math.PI / 2)
};
function me(e) {
	if (!e) return "Linear.None";
	if (!pe[e]) throw `異常なease指定です：${e}`;
	return e;
}
function he(e) {
	return pe[me(e)];
}
function E(e, t) {
	if (t.id) return `frm\n${t.id}`;
	let n = t.name ?? t.layer ?? "";
	if (!n) throw `[${e}] トゥイーンが指定されていません（name／layerのどちらも無し）`;
	return n;
}
//#endregion
//#region src/ts/Txt.ts
function ge(e) {
	ie.setEscape(e);
}
ge("");
var _e = [
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
function D(e) {
	if (e === void 0) return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function ve(e) {
	let t = e.indexOf("｜");
	if (t < 1) return;
	let n = e.slice(0, t);
	if (!_e.includes(n)) return;
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
function ye(e) {
	let t = [], n = "", r = "", i, a, o, s, c, l = [], u = (e, l, u, d) => {
		let f = n + (s?.style ?? "") + (u?.style ?? ""), p = r + (s?.r_style ?? "") + (u?.r_style ?? ""), m = u?.ch_in_style ?? s?.ch_in_style ?? i, h = u?.ch_out_style ?? s?.ch_out_style ?? a, g = D(u?.wait) ?? D(s?.wait) ?? o, { ra: _, ruby: v } = l ? Ce(l) : {
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
	}, d = new ie();
	return d.init((e, d) => {
		let f = d ? ve(d) : void 0;
		if (!f) {
			u(e, d);
			return;
		}
		let { o: p } = f;
		switch (f.cmd) {
			case "span":
				n = p.style ?? "", r = p.r_style ?? "", i = p.ch_in_style, a = p.ch_out_style, o = D(p.wait);
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
				...D(p.width) === void 0 ? {} : { gw: D(p.width) },
				...D(p.height) === void 0 ? {} : { gh: D(p.height) },
				...D(p.x) === void 0 ? {} : { gx: D(p.x) },
				...D(p.y) === void 0 ? {} : { gy: D(p.y) }
			}));
		}
	}), d.putTxt(e), t;
}
function be(e) {
	return e.map((e) => e.c).join("");
}
function xe(e) {
	return be(ye(e));
}
var Se = [
	"start",
	"left",
	"center",
	"right",
	"justify",
	"121",
	"even",
	"1ruby"
];
function Ce(e) {
	let t = e.indexOf("｜");
	if (t > 0) {
		let n = e.slice(0, t);
		if (Se.includes(n)) return {
			ra: n,
			ruby: e.slice(t + 1)
		};
	}
	return { ruby: e };
}
//#endregion
//#region src/ts/Log.ts
var we = 64, Te = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), Ee = (e) => Te(e).replaceAll("'", "&#39;");
function De(e) {
	return Oe(ye(e));
}
function Oe(e) {
	let t = "";
	for (let n of e) {
		if (n.c === "\n") {
			t += "<br/>";
			continue;
		}
		let e = Te(n.c), r = n.r ? `<ruby>${e}<rt${n.rs ? ` style='${Ee(n.rs)}'` : ""}>${Te(n.r)}</rt></ruby>` : e, i = (n.s ?? "") + (n.tcy ? "text-combine-upright: all;" : "");
		t += i ? `<span style='${Ee(i)}'>${r}</span>` : r;
	}
	return t;
}
var ke = class {
	maxLen;
	#e = [];
	#t = "";
	#n = {};
	constructor(e = () => we) {
		this.maxLen = e;
	}
	add(e) {
		this.#t += e;
	}
	setAttr(e) {
		this.#n = e;
	}
	pagebreak() {
		let e = De(this.#t);
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
			text: De(this.#t)
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
}, Ae = class n {
	static #e = new v();
	static parseTag(e) {
		let [t, r] = b(e);
		n.#e.parse(r);
		let i = {};
		for (let [e, t] of Object.entries(n.#e.hPrm)) i[e] = t.val;
		return {
			name: t,
			args: i
		};
	}
	#t(e) {
		let [t, r] = b(e), i = n.#e;
		i.parse(r);
		let a = i.hPrm, o = a.cond?.val;
		if (o !== void 0) {
			if (!o || o.startsWith("&")) throw "属性condは「&」が不要です";
			let e = this.#A.parse(o), t = String(e);
			if (!e || t === "null" || t === "undefined" || t === "false") return;
		}
		let s = this.#I.at(-1), c = Object.create(null);
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
			if (r = this.#A.getValAmpersand(r), r !== "undefined") {
				c[e] = r;
				continue;
			}
			n !== void 0 && (r = this.#A.getValAmpersand(n), r !== "undefined" && (c[e] = r));
		}
		return {
			name: t,
			args: c
		};
	}
	static #n(e, t, n) {
		let r = n.trim() === "" ? NaN : n.startsWith("0x") ? parseInt(n.slice(2), 16) : Number(n);
		if (!Number.isFinite(r)) throw `[${e}] ${t}の値が不正です：${n}`;
		return r;
	}
	#r(e, t, r) {
		let i = n.#n(e, t, r);
		if (i <= -1 || i >= 1) return i;
		let a = Number(this.#k.get(t === "left" ? "tmp:const.sn.config.window.width" : "tmp:const.sn.config.window.height"));
		return Number.isFinite(a) ? i * a : i;
	}
	static #i(e, t, r, i) {
		return r === void 0 ? i : n.#n(e, t, r);
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
		let t;
		try {
			t = JSON.parse(e);
		} catch {
			return e;
		}
		return Object.entries(t).map(([e, t]) => {
			let r = n.#l[e];
			return r ? `${r}: ${typeof t == "number" && r !== "line-height" && r !== "font-weight" ? `${String(t)}px` : String(t)};` : "";
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
	static #p(e, t) {
		let r = {};
		t.visible !== void 0 && (r.visible = t.visible !== "false");
		for (let i of n.#d) {
			let a = t[i];
			a !== void 0 && Object.assign(r, { [i]: n.#n(e, i, a) });
		}
		return t.b_color !== void 0 && (r.b_color = t.b_color), r;
	}
	static #m(e, t, n) {
		let r = t.path ? de(e, t.path, n) : void 0;
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
	#T = Object.create(null);
	#E(e, t) {
		this.#T[e] = t, this.#k.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#T));
	}
	#D(e) {
		e in this.#T && (delete this.#T[e], this.#k.setNochk(`save:const.sn.sound.${e}.fn`, "")), this.#k.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#T));
	}
	#O = 1;
	resetVolMulTalking() {
		this.#O = 1;
	}
	#k = new T();
	#A = new ne(this.#k);
	#j() {
		return !!this.#k.get("mp:const.sn.macro");
	}
	#M = new ke(() => {
		let e = Number(this.#k.get("tmp:const.sn.config.log.max_len"));
		return Number.isFinite(e) && e > 0 ? e : 64;
	});
	get #N() {
		return this.#k.get("game:sn.doRecLog") === !0;
	}
	get chWait() {
		let e = this.#k.get("tmp:const.sn.isKidoku") === !0;
		if (this.#k.get(e ? "sys:sn.tagCh.doWait_Kidoku" : "sys:sn.tagCh.doWait") === !1) return 0;
		let t = Number(this.#k.get(e ? "sys:sn.tagCh.msecWait_Kidoku" : "sys:sn.tagCh.msecWait"));
		return Number.isFinite(t) && t >= 0 ? t : 10;
	}
	#P = {
		in: /* @__PURE__ */ new Set(["default"]),
		out: /* @__PURE__ */ new Set(["default"])
	};
	#F = [];
	#I = [];
	#L = Object.create(null);
	#R = Object.create(null);
	#z = Object.create(null);
	#B = !1;
	#V = Object.create(null);
	static REG_NG4MAC_NM = /["'#;\\\]　]+/;
	static RESERVED_TAGS = /* @__PURE__ */ new Set(/* @__PURE__ */ "add_lay.current.add_face.lay.clear_lay.trans.wt.finish_trans.set_cancel_skip.let.let_ml.endlet_ml.let_abs.let_char_at.let_index_of.let_length.let_replace.let_round.let_search.let_substr.tsy.tsy_frame.wait_tsy.stop_tsy.pause_tsy.resume_tsy.quake.stop_quake.wq.title.toggle_full_screen.dump_lay.dump_val.dump_stack.pop_stack.clear_text.rec_ch.rec_r.reset_rec.ch_in_style.ch_out_style.autowc.navigate_to.loadplugin.snapshot.close.update_check.window.record_place.save.load.reload_script.copybookmark.erasebookmark.export.import.add_frame.frame.set_frame.let_frame.set_focus.add_filter.clear_filter.enable_filter.if.elsif.else.endif.r.er.trace.log.jump.call.return.macro.endmacro.char2macro.bracket2macro.button.event.clear_event.enable_event.clearvar.clearsysvar.page.wait.waitclick.l.p.s.ch.endlink.graph.link.ruby2.span.tcy.fadebgm.fadeoutbgm.fadeoutse.fadese.playbgm.playse.stop_allse.stopbgm.stopfadese.stopse.volume.wb.wf.wl.ws.xchgbuf.wv".split("."));
	#H() {
		let e = Object.create(null);
		for (let t of n.RESERVED_TAGS) e[t] = !0;
		for (let t in this.#V) e[t] = !0;
		return e;
	}
	constructor(t, n = "") {
		this.#g = t instanceof re ? t : new re(t, n), this.#k.defBuiltin("const.sn.scriptFn", () => this.fn), this.#k.defBuiltin("const.sn.isKidoku", () => this.#B), this.#k.defBuiltin("const.sn.displayState", () => this.#U), this.#k.defBuiltin("const.Date.getDateStr", () => e()), this.#k.defBuiltin("const.Date.getTime", () => (/* @__PURE__ */ new Date()).getTime()), this.#k.defBuiltin("const.sn.last_page_plain_text", () => xe(this.#y[this.#v] ?? "")), this.#k.defBuiltin("const.sn.last_page_text", () => this.#y[this.#v] ?? ""), this.#k.defBuiltin("const.sn.log.json", () => this.#M.json()), this.#k.defBuiltin("const.sn.key.alternate", () => this.#W.Alt === !0), this.#k.defBuiltin("const.sn.key.command", () => this.#W.Meta === !0), this.#k.defBuiltin("const.sn.key.control", () => this.#W.Control === !0), this.#k.defBuiltin("const.sn.key.end", () => this.#W.End === !0), this.#k.defBuiltin("const.sn.key.escape", () => this.#W.Escape === !0), this.#k.defBuiltin("const.sn.key.back", () => !1), this.#k.defBuiltin("const.sn.Math.PI", () => Math.PI), this.#k.defBuiltin("const.sn.aIfStk.length", () => this.#F.length), this.#k.defBuiltin("const.sn.vctCallStk.length", () => this.#I.length), this.#k.setNochk("save:const.sn.mesLayer", this.#v);
	}
	#U = !1;
	setFullScr(e) {
		this.#U = e;
	}
	#W = Object.create(null);
	setKeyDown(e, t) {
		this.#W[e] = t;
	}
	clearKeyDown() {
		this.#W = Object.create(null);
	}
	switchScript(e, t = "", n = 0) {
		if (this.#g = e, !t) {
			this.#_ = n;
			return;
		}
		let r = e.label2idx(t, n, this.#j());
		if (r === void 0) throw `ラベル【${t}】がスクリプト【${e.fn}】に見つかりません`;
		this.#_ = r;
	}
	getVal(e) {
		return this.#k.get(e);
	}
	setValNochk(e, t) {
		this.#k.setNochk(e, t);
	}
	defSetTrigger(e, t) {
		this.#k.defSetTrigger(e, t);
	}
	defSetTriggerSoundVol(e) {
		this.#k.defSetTriggerSoundVol(e);
	}
	defBuiltin(e, t) {
		this.#k.defBuiltin(e, t);
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
		let e = [], t = new Map(Object.entries(this.#C).map(([e, t]) => [e, t.fn]));
		for (let r = this.#_; r < this.#g.len; ++r) {
			let i = this.#g.aToken[r];
			if (i.charCodeAt(0) !== 91) continue;
			let { name: a, args: o } = n.parseTag(i);
			if (a === "l" || a === "p" || a === "s" || a === "waitclick") break;
			if (a === "add_face") {
				o.name && t.set(o.name, o.fn || o.name);
				continue;
			}
			if (a !== "lay") continue;
			let s = o.fn || o.pic;
			if (s && !s.startsWith("&") && !s.startsWith("%") && e.push(s), o.face) for (let n of o.face.split(",")) n.startsWith("&") || n.startsWith("%") || e.push(t.get(n) ?? n);
		}
		return e;
	}
	jumpToLabel(e) {
		let t = this.#g.label2idx(e, this.#_, this.#j());
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#_ = t;
	}
	callToLabel(e, t = !0) {
		let n = this.#g.label2idx(e, this.#_, this.#j());
		if (n === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#Q(--this.#_), t && (this.#S = !1), this.#_ = n;
	}
	callToScript(e, t = "", n = !0) {
		this.#Q(--this.#_), n && (this.#S = !1), this.switchScript(e, t);
	}
	nowScrIdx() {
		let e = this.#I[0];
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
		this.#k.setNochk("save:const.sn.scriptFn", e), this.#k.setNochk("save:const.sn.scriptIdx", t);
	}
	nowMarkPart() {
		return this.#k.setNochk("save:const.sn.sLog", this.#M.json()), {
			hSave: this.#k.cloneNs("game"),
			aIfStk: this.#F.slice(this.#I.length),
			hTxt: { ...this.#y },
			hTxtBk: { ...this.#b }
		};
	}
	restoreMarkPart(e) {
		this.#k.setNs("game", e.hSave), this.#y = { ...e.hTxt }, this.#b = { ...e.hTxtBk }, this.#v = String(this.#k.get("save:const.sn.mesLayer") ?? this.#v), this.#M.playback(String(this.#k.get("save:const.sn.sLog") ?? "[]")), this.#k.setMp({}), this.#F.length = 0, this.#F.push(...e.aIfStk), this.#I.length = 0, this.clearEvent();
		for (let e of Object.keys(this.#T)) delete this.#T[e];
		try {
			let e = JSON.parse(String(this.#k.get("save:const.sn.loopPlaying", "{}")));
			Object.assign(this.#T, e);
		} catch {}
	}
	cloneSys() {
		return this.#k.cloneNs("sys");
	}
	setSys(e) {
		this.#k.setNs("sys", e);
	}
	transDone(e) {
		for (let t of Object.keys(this.#y)) e && !e.includes(t) || (this.#y[t] = this.#b[t] ?? "");
	}
	get isKidoku() {
		return this.#B;
	}
	#G() {
		let e = this.#z[this.fn] ??= new ae();
		if (this.#I.length > 0) {
			e.record(this.#_);
			return;
		}
		this.#B = e.search(this.#_), !this.#B && e.record(this.#_);
	}
	#K() {
		this.#z[this.fn]?.erase(this.#_), this.#B = !1;
	}
	getKidoku() {
		let e = {};
		for (let [t, n] of Object.entries(this.#z)) e[t] = n.val();
		return e;
	}
	setKidoku(e) {
		for (let e in this.#z) delete this.#z[e];
		this.#B = !1;
		for (let [t, n] of Object.entries(e)) this.#z[t] = ae.from(n);
	}
	clearKidoku() {
		for (let e of Object.values(this.#z)) e.clear();
		this.#B = !1;
	}
	get autoEnabled() {
		return this.#q("sn.auto.enabled");
	}
	get skipEnabled() {
		return this.#q("sn.skip.enabled");
	}
	get skipAll() {
		return this.#q("sn.skip.all");
	}
	#q(e) {
		return this.#k.get(`tmp:${e}`) === !0;
	}
	get tagLEnabled() {
		return this.#k.get("tmp:sn.tagL.enabled") !== !1;
	}
	cancelAutoSkip() {
		this.#k.set("tmp:sn.skip.enabled", !1), this.#k.set("tmp:sn.skip.all", !1), this.#k.set("tmp:sn.auto.enabled", !1), this.tagLEnabled || this.#k.set("tmp:sn.tagL.enabled", !0);
	}
	get isNextKidoku() {
		let e = this.fn, t = this.#_, n = this.#g.len, r = this.#I.at(-1);
		return r && (e = r.fn, t = r.returnIdx, n = r.scr.len), t >= n ? !1 : this.#z[e]?.search(t) ?? !1;
	}
	#J(e) {
		if (e === "s" || e === "waitclick") {
			this.cancelAutoSkip();
			return;
		}
		if (this.autoEnabled) return {
			mode: "auto",
			msec: this.#X(e === "p")
		};
		if (this.skipEnabled) {
			if (!this.skipAll && !this.isNextKidoku) {
				this.cancelAutoSkip();
				return;
			}
			return e === "p" && this.#Y() !== "s" ? void 0 : {
				mode: "skip",
				msec: 0
			};
		}
	}
	#Y() {
		let e = this.#k.get("sys:sn.skip.mode");
		return e == null ? "s" : String(e);
	}
	#X(e) {
		let t = e ? "sn.auto.msecPageWait" : "sn.auto.msecLineWait", n = Number(this.#k.get(`sys:${t}${this.isKidoku ? "_Kidoku" : ""}`));
		return Number.isFinite(n) && n > 0 ? n : e ? 3500 : 500;
	}
	getEvent(e) {
		let t = e.toLowerCase();
		return this.#L[t] ?? this.#R[t];
	}
	clearEvent(e = !1) {
		if (!e) {
			this.#L = Object.create(null);
			return;
		}
		for (let e in this.#R) delete this.#R[e];
	}
	#Z() {
		let e = this.#L;
		return this.#L = Object.create(null), e;
	}
	beginEvent(e) {
		let t = this.getEvent(e);
		if (t) return this.#k.set("tmp:sn.eventArg", t.arg), this.#k.set("tmp:sn.eventLabel", t.label), t.call || this.clearEvent(), t;
	}
	#Q(e, t = !0, n = {}) {
		this.#I.push({
			fn: this.fn,
			returnIdx: e,
			lenIfStk: this.#F.length,
			hMp: this.#k.cloneMp(),
			hArgs: n,
			scr: this.#g,
			...t ? { hEvt: this.#Z() } : {}
		}), this.#F.push(-1);
	}
	step() {
		let e = [];
		for (this.#S && (this.#S = !1, this.#de(), this.#y[this.#v] = "", e.push({
			t: "chgStr",
			nm: this.#v,
			page: "fore",
			str: ""
		})); this.#_ < this.#g.len;) {
			this.#G();
			let t = this.#g.aToken[this.#_++], n = t.charCodeAt(0);
			if (n === 9 || n === 10) continue;
			if (n === 91) {
				let n = this.#t(t);
				if (!n) continue;
				let { name: r, args: i } = n;
				if (this.#ne(r, i, e) === "stop") return e;
				continue;
			}
			let r = t, i = this.#g.grm.ce, a = !!i && t.length > 1 && t.startsWith(i);
			if (!a && n === 38) {
				if (!t.endsWith("&")) {
					this.#$(t);
					continue;
				}
				if (t.charAt(1) === "&") throw "「&表示&」書式では「&」指定が不要です";
				let e = this.#A.parse(t.slice(1, -1));
				r = e == null ? "" : String(e);
			} else if (!a && n === 59) continue;
			else if (!a && n === 42 && t.length > 1) continue;
			this.#ue(e, r);
		}
		return e;
	}
	#$(e) {
		let { name: t, text: n, cast: r } = x(e.slice(1));
		this.#k.set(this.#A.getValAmpersand(t.trim()), this.#A.parse(n), r ?? "");
	}
	#ee(e, t, r) {
		let i = e.fn || e.pic;
		if (i) {
			let n = {
				t: "chgPic",
				nm: e.layer ?? "",
				page: r,
				fn: i
			};
			if (e.face !== void 0) {
				let t = [];
				if (e.face) for (let n of e.face.split(",")) {
					if (!n) throw "[lay] face属性に空要素が含まれています";
					t.push(this.#C[n] ?? {
						fn: n,
						dx: 0,
						dy: 0,
						blendmode: s("normal")
					});
				}
				n.aFace = t;
			}
			t.push(n);
		}
		if (e.back_clear !== void 0) e.back_clear === "true" && t.push({
			t: "chgBackClear",
			nm: e.layer ?? "",
			page: r
		});
		else {
			if (e.b_alpha !== void 0 || e.b_alpha_isfixed !== void 0) {
				let n = {
					t: "chgBAlpha",
					nm: e.layer ?? "",
					page: r
				};
				if (e.b_alpha !== void 0) {
					let t = Number(e.b_alpha);
					if (Number.isNaN(t)) throw `[lay] b_alphaの値が不正です：${e.b_alpha}`;
					n.b_alpha = Math.min(1, Math.max(0, t));
				}
				e.b_alpha_isfixed !== void 0 && (n.isFixed = e.b_alpha_isfixed !== "false"), t.push(n);
			}
			e.b_pic !== void 0 && t.push({
				t: "chgBPic",
				nm: e.layer ?? "",
				page: r,
				fn: e.b_pic
			});
		}
		let a = {};
		if (e.visible !== void 0 && (a.visible = e.visible !== "false"), e.alpha !== void 0 && (a.alpha = n.#n("lay", "alpha", e.alpha)), e.pos !== "stay") {
			if (e.pos !== void 0) {
				let t = e.pos, r = Number(this.#k.get("tmp:const.sn.config.window.width")), i = Number(this.#k.get("tmp:const.sn.config.window.height"));
				t === "" || t === "c" ? (a.left = r / 2, a.align_x = "center") : t === "l" ? a.left = 0 : t === "r" ? (a.left = r, a.align_x = "right") : (a.left = n.#n("lay", "pos", t), a.align_x = "center"), a.top = i, a.align_y = "bottom";
			} else if (e.left === void 0 ? e.center === void 0 ? e.right === void 0 ? e.s_right !== void 0 && (a.s_right = this.#r("lay", "left", e.s_right)) : (a.left = this.#r("lay", "left", e.right), a.align_x = "right") : (a.left = this.#r("lay", "left", e.center), a.align_x = "center") : a.left = this.#r("lay", "left", e.left), e.top === void 0 ? e.middle === void 0 ? e.bottom === void 0 ? e.s_bottom !== void 0 && (a.s_bottom = this.#r("lay", "top", e.s_bottom)) : (a.top = this.#r("lay", "top", e.bottom), a.align_y = "bottom") : (a.top = this.#r("lay", "top", e.middle), a.align_y = "middle") : a.top = this.#r("lay", "top", e.top), (e.fn !== void 0 || e.pic !== void 0 || e.face !== void 0) && !("left" in a) && !("s_right" in a) && !("top" in a) && !("s_bottom" in a) && this.#w[e.layer ?? ""] === "grp") {
				let e = Number(this.#k.get("tmp:const.sn.config.window.width")), t = Number(this.#k.get("tmp:const.sn.config.window.height"));
				a.left = e / 2, a.align_x = "center", a.top = t, a.align_y = "bottom";
			}
		}
		if (e.width !== void 0 && (a.width = n.#n("lay", "width", e.width)), e.height !== void 0 && (a.height = n.#n("lay", "height", e.height)), e.rotation !== void 0 && (a.rotation = n.#n("lay", "rotation", e.rotation)), e.scale_x !== void 0 && (a.scale_x = n.#n("lay", "scale_x", e.scale_x)), e.scale_y !== void 0 && (a.scale_y = n.#n("lay", "scale_y", e.scale_y)), e.pivot_x !== void 0 && (a.pivot_x = n.#n("lay", "pivot_x", e.pivot_x)), e.pivot_y !== void 0 && (a.pivot_y = n.#n("lay", "pivot_y", e.pivot_y)), e.blendmode !== void 0 && (a.blendmode = s(e.blendmode)), e.b_color !== void 0 && e.back_clear !== "true" && (a.b_color = n.#n("lay", "b_color", e.b_color)), e.style !== void 0 && (a.style = e.style), e.pl !== void 0 && (a.pl = n.#n("lay", "pl", e.pl)), e.pr !== void 0 && (a.pr = n.#n("lay", "pr", e.pr)), e.pt !== void 0 && (a.pt = n.#n("lay", "pt", e.pt)), e.pb !== void 0 && (a.pb = n.#n("lay", "pb", e.pb)), e.ffs !== void 0 && (a.ffs = e.ffs), e.noffs !== void 0 && (a.noffs = e.noffs), e.bura !== void 0 && (a.bura = e.bura !== "false"), e.kinsoku_sol !== void 0 && (a.kinsoku_sol = e.kinsoku_sol), e.kinsoku_eol !== void 0 && (a.kinsoku_eol = e.kinsoku_eol), e.kinsoku_dns !== void 0 && (a.kinsoku_dns = e.kinsoku_dns), e.kinsoku_bura !== void 0 && (a.kinsoku_bura = e.kinsoku_bura), ie.setting(e), e.r_align !== void 0) {
			if (!Se.includes(e.r_align)) throw `[lay] r_alignの値が不正です：${e.r_align}`;
			a.r_align = e.r_align;
		}
		e.in_style !== void 0 && (a.in_style = e.in_style), e.out_style !== void 0 && (a.out_style = e.out_style), Object.keys(a).length > 0 && t.push({
			t: "chgLay",
			nm: e.layer ?? "",
			page: r,
			sty: a
		}), e.filter !== void 0 && t.push({
			t: "addFilter",
			aLayNm: [e.layer ?? ""],
			page: r,
			flt: l(e),
			replace: !0
		});
	}
	#te(e, t) {
		let r = e.layer ?? "";
		if ((e.float ?? "false") !== "false") t.push({
			t: "moveLay",
			nm: r,
			mode: "float"
		});
		else if (e.index) {
			let i = n.#n("lay", "index", e.index);
			i && t.push({
				t: "moveLay",
				nm: r,
				mode: "index",
				index: i
			});
		} else e.dive && t.push({
			t: "moveLay",
			nm: r,
			mode: "dive",
			dive: e.dive
		});
	}
	#ne(e, i, a) {
		let o = this.#g.len;
		switch (e) {
			case "add_lay": {
				let e = i.layer ?? i.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (i.class ?? "txt").toLowerCase() === "grp" ? "grp" : "txt";
				this.#w[e] = t, this.#y[e] = "", this.#b[e] = "", t === "txt" && this.#k.setNochk(`save:const.sn.layer.${e}.enabled`, !0), a.push({
					t: "addLay",
					cls: t,
					nm: e
				});
				let n = i.layer === void 0 ? {
					...i,
					layer: e
				} : i;
				return this.#ee(n, a, "fore"), this.#ee(n, a, "back"), this.#te(n, a), "skip";
			}
			case "current": {
				let e = i.layer ?? i.nm ?? this.#v;
				return e !== this.#v && this.#de(), this.#v = e, this.#k.setNochk("save:const.sn.mesLayer", this.#v), "skip";
			}
			case "add_face": {
				let e = i.name ?? "";
				if (!e) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#C[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
				return this.#C[e] = {
					fn: i.fn || e,
					dx: Number(i.dx || "0"),
					dy: Number(i.dy || "0"),
					blendmode: s(i.blendmode || "normal")
				}, "skip";
			}
			case "lay": {
				let e = n.argPage(i, "fore");
				return this.#ee(i, a, e), this.#te(i, a), "skip";
			}
			case "add_filter": return a.push({
				t: "addFilter",
				aLayNm: n.#c(i.layer),
				page: n.#h("add_filter", i, "fore"),
				flt: l(i),
				replace: !1
			}), "skip";
			case "clear_filter": return a.push({
				t: "clearFilter",
				aLayNm: n.#c(i.layer),
				page: n.#h("clear_filter", i, "fore")
			}), "skip";
			case "enable_filter": return a.push({
				t: "enableFilter",
				aLayNm: n.#c(i.layer),
				page: n.#h("enable_filter", i, "fore"),
				index: n.#i("enable_filter", "index", i.index, 0),
				enabled: (i.enabled ?? "true") !== "false"
			}), "skip";
			case "clear_lay": {
				let e = i.page ?? "back";
				if (e !== "fore" && e !== "back" && e !== "both") throw `属性 page【${e}】が不正です`;
				let t = n.#c(i.layer);
				if (i.layer !== void 0 && t === null) throw "[clear_lay] layer属性が空です";
				if (e !== "back") {
					if ((!t || t.includes(this.#v)) && this.#de(), t) for (let e of t) this.#y[e] = "";
					else for (let e of Object.keys(this.#y)) this.#y[e] = "";
				}
				if (e !== "fore") {
					if (t) for (let e of t) this.#b[e] = "";
					else for (let e of Object.keys(this.#b)) this.#b[e] = "";
				}
				return a.push({
					t: "clearLay",
					aLayNm: t,
					page: e
				}), "skip";
			}
			case "trans": {
				let e = i.layer ?? "", t = e ? e.split(",").map((e) => e.trim()).filter((e) => e !== "") : null;
				if (t?.length === 0) throw "[trans] layer属性が空です";
				let r = Number(i.time ?? "0");
				if (!Number.isFinite(r) || r < 0) throw `[trans] timeの値が不正です：${i.time ?? ""}`;
				if (i.glsl !== void 0) throw "[trans] glsl=はサポートされません（WebGLシェーダを使わないため）";
				return a.push({
					t: "trans",
					aLayNm: t,
					time: this.skipEnabled ? 0 : r,
					...i.rule === void 0 ? {} : { rule: i.rule },
					...i.vague === void 0 ? {} : { vague: n.#n("trans", "vague", i.vague) }
				}), "skip";
			}
			case "wt": return a.push({
				t: "waitTrans",
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "finish_trans": return a.push({ t: "finishTrans" }), "skip";
			case "set_cancel_skip": return "skip";
			case "quake": {
				let e = this.skipEnabled ? 0 : n.#n("quake", "time", i.time ?? "");
				return e <= 0 || a.push({
					t: "quake",
					msec: e,
					hmax: t(n.#i("quake", "hmax", i.hmax, 10)),
					vmax: t(n.#i("quake", "vmax", i.vmax, 10))
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
				let t = this.skipEnabled, r = t ? 0 : n.#n("tsy", "time", i.time ?? ""), o = t ? 0 : n.#i("tsy", "delay", i.delay, 0), s = n.#i("tsy", "repeat", i.repeat, 1), c = n.argPage(i, "fore");
				return i.filter !== void 0 && a.push({
					t: "addFilter",
					aLayNm: [e],
					page: c,
					flt: l(i),
					replace: !0
				}), a.push({
					t: "tsy",
					tw_nm: E("tsy", i),
					nm: e,
					page: c,
					msec: r,
					delay: o,
					ease: me(i.ease),
					repeat: s > 0 ? s - 1 : Infinity,
					yoyo: (i.yoyo ?? "false") !== "false",
					hTo: le("tsy", i),
					backlay: (i.backlay ?? "false") !== "false",
					...n.#m("tsy", i)
				}), "skip";
			}
			case "tsy_frame": {
				let { id: e } = i;
				if (!e) throw "[tsy_frame] idは必須です";
				this.#re("tsy_frame", e);
				let t = this.skipEnabled, r = n.#i("tsy_frame", "repeat", i.repeat, 1);
				return a.push({
					t: "tsyFrame",
					tw_nm: E("tsy_frame", i),
					id: e,
					msec: t ? 0 : n.#n("tsy_frame", "time", i.time ?? ""),
					delay: t ? 0 : n.#i("tsy_frame", "delay", i.delay, 0),
					ease: me(i.ease),
					repeat: r > 0 ? r - 1 : Infinity,
					yoyo: (i.yoyo ?? "false") !== "false",
					hTo: le("tsy_frame", i, se),
					...n.#m("tsy_frame", i, se)
				}), "skip";
			}
			case "wait_tsy": return a.push({
				t: "waitTsy",
				tw_nm: E("wait_tsy", i),
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return a.push({
				t: "stopTsy",
				tw_nm: E("stop_tsy", i)
			}), "skip";
			case "pause_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: E("pause_tsy", i),
				paused: !0
			}), "skip";
			case "resume_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: E("resume_tsy", i),
				paused: !1
			}), "skip";
			case "let":
				if (i.text === void 0) throw `[let] textは必須です（name:${i.name ?? ""}）`;
				return this.#ie("let", i, i.text), "skip";
			case "let_abs": {
				let e = n.#i("let_abs", "text", i.text, 0);
				return this.#ie("let_abs", i, String(e < 0 ? -e : e)), "skip";
			}
			case "let_round": {
				let e = n.#i("let_round", "text", i.text, 0);
				return this.#ie("let_round", i, String(Math.round(e))), "skip";
			}
			case "let_length": return this.#ie("let_length", i, String((i.text ?? "").length)), "skip";
			case "let_char_at": {
				let e = n.#i("let_char_at", "pos", i.pos, 0);
				return this.#ie("let_char_at", i, (i.text ?? "").charAt(e)), "skip";
			}
			case "let_index_of": {
				let { val: e } = i;
				if (!e) throw "[let_index_of] valは必須です";
				let t = n.#i("let_index_of", "start", i.start, 0);
				return this.#ie("let_index_of", i, String((i.text ?? "").indexOf(e, t))), "skip";
			}
			case "let_substr": {
				let e = n.#i("let_substr", "pos", i.pos, 0), t = i.text ?? "";
				return this.#ie("let_substr", i, i.len === "all" ? t.slice(e) : t.slice(e, e + r(n.#i("let_substr", "len", i.len, 1)))), "skip";
			}
			case "let_replace": return this.#ie("let_replace", i, (i.text ?? "").replace(n.#s("let_replace", i), String(i.val))), "skip";
			case "let_search": return this.#ie("let_search", i, String((i.text ?? "").search(n.#s("let_search", i)))), "skip";
			case "let_ml": {
				let e = i.name ?? "";
				if (!e) throw "[let_ml] nameは必須です";
				let t = "";
				for (; this.#_ < o && (t = this.#g.aToken[this.#_], t === ""); ++this.#_);
				if (this.#g.grm.testTagEndLetml(t)) return this.#k.set(e, "", "str"), ++this.#_, "skip";
				if (!this.#g.grm.testTagEndLetml(this.#g.aToken[this.#_ + 1] ?? "")) throw `[let_ml] 変数【${e}】の終端・[endlet_ml]がありません`;
				return this.#k.set(e, t, "str"), this.#_ += 2, "skip";
			}
			case "endlet_ml": return "skip";
			case "if": return this.#ae(i), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#oe(), "skip";
			case "r": {
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(a, "\n", !0, e, t), "skip";
			}
			case "er": return (i.rec_page_break ?? "true") !== "false" && this.#de(), this.#y[this.#v] = "", this.#b[this.#v] = "", a.push({
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
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(a, n.#ce("span", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, t), "skip";
			}
			case "link": {
				if (!i.url && !i.label && !i.fn) throw "[link] fn・label・urlのいずれかは必須です";
				i.clickse !== void 0 && (i.clicksebuf = i.clicksebuf || "SYS"), i.enterse !== void 0 && (i.entersebuf = i.entersebuf || "SYS"), i.leavese !== void 0 && (i.leavesebuf = i.leavesebuf || "SYS"), i.style ??= "background-color: rgba(255,0,0,0.5);", i.style_hover ??= "background-color: rgba(255,0,0,0.9);", i.style_clicked ??= i.style;
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(a, n.#ce("link", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, t), "skip";
			}
			case "endlink": {
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(a, n.#ce("endlink", {}), !0, e, t), "skip";
			}
			case "graph": {
				if (!i.pic) throw "[graph] picは必須です";
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(a, n.#ce("grp", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, t), "skip";
			}
			case "tcy": {
				if (!i.t) throw "[tcy] tは必須です";
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(a, n.#ce("tcy", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, t), "skip";
			}
			case "ruby2":
			case "ch": {
				if (e === "ruby2") {
					if (!i.t) throw "[ruby2] tは必須です";
					if (!i.r) throw "[ruby2] rは必須です";
					i.text = `｜${encodeURIComponent(i.t)}《${encodeURIComponent(i.r)}》`, delete i.t, delete i.r;
				}
				let { text: t } = i;
				if (!t) throw `[${e}] textは必須です`;
				let { nm: r, page: o } = this.#le(i);
				return this.#ue(a, n.#ce("add", {
					...i,
					text: void 0,
					layer: void 0,
					page: void 0
				}) + t.replaceAll("[r]", "\n") + n.#ce("add_close", {}), i.record !== "false", r, o), "skip";
			}
			case "autowc": {
				let e = i.enabled === void 0 ? this.#k.get("game:const.sn.autowc.enabled") === !0 : i.enabled !== "false";
				this.#k.setNochk("save:const.sn.autowc.enabled", e);
				let { text: r } = i;
				if ("text" in i != "time" in i) throw "[autowc] textとtimeは同時指定必須です";
				if (this.#k.setNochk("save:const.sn.autowc.text", r ?? ""), !r) return this.#k.setNochk("save:const.sn.autowc.time", ""), a.push({
					t: "autowc",
					enabled: e,
					hWait: {}
				}), "skip";
				let o = Array.from(r), s = String(i.time ?? "").split(",");
				if (s.length !== o.length) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
				let c = {};
				return o.forEach((e, r) => {
					c[e] = t(n.#n("autowc", "time", s[r] ?? ""));
				}), this.#k.setNochk("save:const.sn.autowc.time", i.time ?? ""), a.push({
					t: "autowc",
					enabled: e,
					hWait: c
				}), "skip";
			}
			case "ch_in_style":
			case "ch_out_style": {
				let t = e === "ch_in_style" ? "in" : "out", { name: n, sty: r } = d(e, i, t === "in");
				if (this.#P[t].has(n)) throw `[${e}] name【${n}】はすでにあります`;
				return this.#P[t].add(n), a.push({
					t: "defChStyle",
					kind: t,
					nm: n,
					sty: r
				}), "skip";
			}
			case "rec_ch": {
				let { text: e, ...t } = i;
				return Object.keys(t).length && this.#M.setAttr(t), e && this.#M.add(n.#ce("add", {
					...i,
					text: void 0
				}) + e.replaceAll("[r]", "\n") + n.#ce("add_close", {})), "skip";
			}
			case "rec_r": return this.#M.add("\n"), "skip";
			case "reset_rec": return this.#M.reset(i.text ?? ""), "skip";
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
				i.count === "false" && this.#K();
				let e = i.label ?? "", t = i.fn ?? "";
				if (!e && !t) throw "[jump] fnまたはlabelは必須です";
				if (t && t !== this.fn) return a.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e, this.#_, this.#j());
				if (n === void 0) throw `[jump] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#_ = n, "skip";
			}
			case "call": {
				i.count !== "true" && this.#K();
				let e = i.label ?? "", t = i.fn ?? "";
				if (!e && !t) throw "[call] fnまたはlabelは必須です";
				if (t && t !== this.fn) return this.#Q(this.#_, !0, i), a.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e, this.#_, this.#j());
				if (n === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#Q(this.#_, !0, i), this.#_ = n, "skip";
			}
			case "return": return this.#se(a, i);
			case "macro": {
				let e = i.name ?? "";
				if (!e) throw "[macro] nameは必須です（試作仕様）";
				if (n.RESERVED_TAGS.has(e)) throw `[${e}]はタグ名のため、マクロ名として使用できません`;
				if (n.REG_NG4MAC_NM.test(e)) throw `[${e}]はマクロ名として異常です`;
				if (e in this.#V) throw `[macro] マクロ【${e}】は既に定義済みです`;
				this.#V[e] = {
					fn: this.fn,
					idx: this.#_
				};
				let t = !1, r = 0, a = !1;
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
					let { name: i } = n.parseTag(e);
					if (i === "macro") {
						++r;
						continue;
					}
					if (i === "endmacro") {
						if (r > 0) {
							--r;
							continue;
						}
						++this.#_, t = !0;
						break;
					}
				}
				if (!t) throw `[macro] マクロ【${e}】が[endmacro]で閉じられていません（試作仕様）`;
				return "skip";
			}
			case "char2macro":
			case "bracket2macro": return this.#g.defC2M(e, i, this.#H(), this.#_), "skip";
			case "endmacro": return this.#se(a);
			case "button": {
				let e = i.layer || this.#v;
				if (!e) throw "[button] layerは必須です（試作仕様）";
				let t = i.label ?? "", r = i.fn ?? this.fn, { pic: o } = i;
				if (!o && !i.text) throw "[button] textまたはpic属性は必須です";
				let c = i.nm, l = i.call === "true", u = n.argPage(i, "back"), d = {};
				i.left === void 0 ? i.center === void 0 ? i.right === void 0 ? i.s_right !== void 0 && (d.s_right = this.#r("button", "left", i.s_right)) : (d.left = this.#r("button", "left", i.right), d.align_x = "right") : (d.left = this.#r("button", "left", i.center), d.align_x = "center") : d.left = this.#r("button", "left", i.left), i.top === void 0 ? i.middle === void 0 ? i.bottom === void 0 ? i.s_bottom !== void 0 && (d.s_bottom = this.#r("button", "top", i.s_bottom)) : (d.top = this.#r("button", "top", i.bottom), d.align_y = "bottom") : (d.top = this.#r("button", "top", i.middle), d.align_y = "middle") : d.top = this.#r("button", "top", i.top);
				for (let e of n.#f) {
					let t = i[e];
					t !== void 0 && Object.assign(d, { [e]: n.#n("button", e, t) });
				}
				return !o && !i.b_pic && (d.width ??= 100, d.height ??= 30), i.enabled !== void 0 && (d.enabled = i.enabled !== "false"), i.blendmode !== void 0 && (d.blendmode = s(i.blendmode)), i.style !== void 0 && (d.style = n.#u(i.style)), i.style_hover !== void 0 && (d.style_hover = n.#u(i.style_hover)), i.style_clicked !== void 0 && (d.style_clicked = n.#u(i.style_clicked)), i.hint !== void 0 && (d.hint = i.hint), i.hint_style !== void 0 && (d.hint_style = i.hint_style), i.hint_opt !== void 0 && (d.hint_opt = i.hint_opt), o !== void 0 && (d.pic = o), i.b_pic !== void 0 && (d.b_pic = i.b_pic), i.clickse !== void 0 && (d.clickse = i.clickse, d.clicksebuf = i.clicksebuf || "SYS"), i.enterse !== void 0 && (d.enterse = i.enterse, d.entersebuf = i.entersebuf || "SYS"), i.leavese !== void 0 && (d.leavese = i.leavese, d.leavesebuf = i.leavesebuf || "SYS"), a.push({
					t: "addBtn",
					layerNm: e,
					page: u,
					text: o ? "" : i.text ?? "",
					label: t,
					call: l,
					...c === void 0 ? {} : { nm: c },
					...r ? { fn: r } : {},
					...i.arg === void 0 ? {} : { arg: i.arg },
					...Object.keys(d).length > 0 ? { sty: d } : {}
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
				if (!f.includes(e)) throw `[page] 属性to「${i.to}」は異常です`;
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
					let n = this.#k.get(`sys:const.sn.nativeWindow.${e}`);
					return n == null ? t : Number(n);
				}, t = (e) => Number(this.#k.get(`tmp:const.sn.config.window.${e}`) ?? 0), r = (e, t, r) => i[e] === void 0 ? i[t] === void 0 ? r : n.#n("window", t, i[t]) : n.#n("window", e, i[e]), o = {
					centering: i.centering === "true",
					x: r("x", "x", e("x", 0)),
					y: r("y", "y", e("y", 0)),
					w: r("width", "w", e("w", t("width"))),
					h: r("height", "h", e("h", t("height")))
				};
				return this.#k.setNochk("sys:const.sn.nativeWindow.x", o.x), this.#k.setNochk("sys:const.sn.nativeWindow.y", o.y), this.#k.setNochk("sys:const.sn.nativeWindow.w", o.w), this.#k.setNochk("sys:const.sn.nativeWindow.h", o.h), a.push({
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
				aLayNm: n.#c(i.layer),
				page: n.argPage(i, "fore"),
				width: n.#i("snapshot", "width", i.width, 0),
				height: n.#i("snapshot", "height", i.height, 0),
				smoothing: i.smoothing === "true",
				...i.b_color === void 0 ? {} : { b_color: n.#n("snapshot", "b_color", i.b_color) }
			}), "stop";
			case "clear_text": {
				let e = i.layer || this.#v, t = n.argPage(i, "fore");
				return e === this.#v && t === "fore" && this.#de(), this.#x(t)[e] = "", a.push({
					t: "chgStr",
					nm: e,
					page: t,
					str: ""
				}), "skip";
			}
			case "dump_val": return a.push({
				t: "trace",
				text: `[dump_val] ${JSON.stringify(this.#k.dump())}`
			}), "skip";
			case "dump_stack": return a.push({
				t: "trace",
				text: `[dump_stack] ${JSON.stringify({
					now: {
						fn: this.fn,
						idx: this.#_
					},
					aCallStk: this.#I.map((e) => ({
						fn: e.fn,
						returnIdx: e.returnIdx
					})),
					aIfStk: [...this.#F]
				})}`
			}), "skip";
			case "dump_lay": return a.push({
				t: "dumpLay",
				aLayNm: n.#c(i.layer)
			}), "skip";
			case "pop_stack":
				if ((i.clear ?? "false") !== "false") this.#I.length = 0;
				else if (!this.#I.pop()) throw "[pop_stack] スタックが空です";
				return this.#F.length = 0, this.#F.push(-1), this.#k.setMp({}), "skip";
			case "clearvar": return this.#k.clearGame(), "skip";
			case "clearsysvar": return this.#k.clearSys(), this.clearKidoku(), "skip";
			case "record_place": return this.recordPlace(), a.push({ t: "recordPlace" }), "skip";
			case "save": {
				if (i.place === void 0) throw "[save] placeは必須です";
				let e = n.#n("save", "place", i.place), t = {
					text: "",
					...i
				};
				delete t.place, a.push({
					t: "save",
					place: e,
					json: t
				});
				let r = Number(this.#k.get("sys:const.sn.save.place"));
				return e === r && this.#k.setNochk("sys:const.sn.save.place", r + 1), "skip";
			}
			case "load":
				if (i.index === void 0 && "fn" in i != "label" in i) throw "[load] fnとlabelはセットで指定して下さい";
				return a.push({
					t: "load",
					place: n.#i("load", "place", i.place, 0),
					fn: i.fn ?? "",
					label: i.label ?? "",
					...i.index === void 0 ? {} : { index: n.#n("load", "index", i.index) },
					...i.do_rec === void 0 ? {} : { doRec: i.do_rec !== "false" }
				}), "stop";
			case "reload_script": return a.push({ t: "reloadScript" }), "stop";
			case "copybookmark": {
				let e = n.#n("copybookmark", "from", i.from ?? ""), t = n.#n("copybookmark", "to", i.to ?? "");
				return e === t || a.push({
					t: "copyBookmark",
					from: e,
					to: t
				}), "skip";
			}
			case "erasebookmark": return a.push({
				t: "eraseBookmark",
				place: n.#n("erasebookmark", "place", i.place ?? "")
			}), "skip";
			case "export": return a.push({ t: "exportData" }), "skip";
			case "import": return a.push({ t: "importData" }), "skip";
			case "event": {
				let e = i.key ?? "", t = e.toLowerCase();
				if (!t) throw "[event] keyは必須です";
				let n = t.startsWith("dom="), r = i.global === "true" ? this.#R : this.#L;
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
				let { id: e, src: t } = i;
				if (!e) throw "[add_frame] idは必須です";
				if (!t) throw "[add_frame] srcは必須です";
				if (this.#k.get(`const.sn.frm.${e}`)) throw `[add_frame] frame【${e}】はすでにあります`;
				return a.push({
					t: "addFrame",
					id: e,
					src: t,
					sty: n.#p("add_frame", i)
				}), "stop";
			}
			case "frame": {
				let { id: e } = i;
				if (!e) throw "[frame] idは必須です";
				this.#re("frame", e);
				let t = (i.float ?? "false") === "false" ? i.index === void 0 ? i.dive ? { mode: "dive" } : void 0 : {
					mode: "index",
					index: n.#n("frame", "index", i.index)
				} : { mode: "float" };
				return a.push({
					t: "frame",
					id: e,
					sty: n.#p("frame", i),
					...t ? { order: t } : {},
					...i.disabled === void 0 ? {} : { disabled: i.disabled !== "false" }
				}), "skip";
			}
			case "set_frame": {
				let { id: e, var_name: t, text: n } = i;
				if (!e) throw "[set_frame] idは必須です";
				if (!t) throw "[set_frame] var_nameは必須です";
				if (!n) throw "[set_frame] textは必須です";
				return this.#re("set_frame", e), this.#k.setNochk(`const.sn.frm.${e}.${t}`, n), a.push({
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
				return this.#re("let_frame", e), a.push({
					t: "letFrame",
					id: e,
					var_name: t,
					fnc: (i.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(i.global === "true"), "skip";
			case "enable_event": {
				let e = i.layer || this.#v, t = (i.enabled ?? "true") !== "false";
				return this.#k.setNochk(`save:const.sn.layer.${e}.enabled`, t), a.push({
					t: "enableEvent",
					nm: e,
					enabled: t
				}), "skip";
			}
			case "wait": {
				let e = n.#n("wait", "time", i.time ?? "");
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
				if (e === "l" && !this.tagLEnabled) return "skip";
				e === "p" && (this.#S = !0);
				let t = this.#J(e), r = {};
				for (let t of [
					"x",
					"y",
					"width",
					"height"
				]) {
					let a = i[t];
					a !== void 0 && (r[t] = n.#n(e, t, a));
				}
				return a.push({
					t: "stop",
					kind: e,
					key: `${this.fn}:${String(this.#_)}`,
					nm: this.#v,
					...t ? { resume: t } : {},
					...Object.keys(r).length > 0 ? { mark: r } : {}
				}), "stop";
			}
			case "playse":
			case "playbgm": {
				let t = e === "playbgm", r = !t && (i.canskip ?? "true") !== "false";
				if (this.skipEnabled && r) return "skip";
				let o = t ? "BGM" : i.buf || "SE", s = i.fn ?? "";
				if (!s) throw `[${e}] fnは必須です`;
				let c = t ? !0 : (i.loop ?? "false") !== "false", l = (i.join ?? "true") !== "false", u = n.#i(e, "speed", i.speed, 1), d = n.#i(e, "pan", i.pan, 0), f = n.#i(e, "start_ms", i.start_ms, 0);
				if (f < 0) throw `[${e}] start_ms:${String(f)} が負の値です`;
				let p = n.#i(e, "ret_ms", i.ret_ms, 0);
				if (p < 0) throw `[${e}] ret_ms:${String(p)} が負の値です`;
				let m = n.#i(e, "end_ms", i.end_ms, n.#o);
				if (m > 0) {
					if (m <= f) throw `[${e}] start_ms:${String(f)} >= end_ms:${String(m)} は異常値です`;
					if (m <= p) throw `[${e}] ret_ms:${String(p)} >= end_ms:${String(m)} は異常値です`;
				}
				let h = `const.sn.sound.${o}.`, g = n.#a(n.#i(e, "volume", i.volume, 1));
				this.#k.setNochk(`save:${h}volume`, g), this.#k.setNochk(`save:${h}fn`, s), this.#k.setNochk(`save:${h}start_ms`, f), this.#k.setNochk(`save:${h}end_ms`, m), this.#k.setNochk(`save:${h}ret_ms`, p);
				let _ = g * Number(this.#k.get(`sys:${h}volume`, 1, !0));
				if (o === "BGM") _ *= this.#O;
				else if (o === "VOICE") {
					let e = Number(this.#k.get("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
					if (this.#O = e, e !== 1) {
						let t = "const.sn.sound.BGM.", n = Number(this.#k.get(`save:${t}volume`, 1, !0)) * Number(this.#k.get(`sys:${t}volume`, 1, !0)) * e;
						a.push({
							t: "duckBgm",
							volume: n
						});
					}
				}
				return c ? this.#E(o, s) : this.#D(o), a.push({
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
					canskip: r
				}), l ? "stop" : "skip";
			}
			case "stopse":
			case "stopbgm": {
				let t = e === "stopbgm" ? "BGM" : i.buf || "SE";
				return this.#D(t), a.push({
					t: "stopSnd",
					buf: t
				}), "skip";
			}
			case "stop_allse":
				for (let e of Object.keys(this.#T)) this.#D(e);
				return a.push({ t: "stopAllSnd" }), "skip";
			case "xchgbuf": {
				let e = i.buf || "SE", t = i.buf2 || "SE";
				if (e === t) return "skip";
				let r = {
					volume: 1,
					fn: "",
					start_ms: 0,
					end_ms: n.#o,
					ret_ms: 0
				}, o = `const.sn.sound.${e}.`, s = `const.sn.sound.${t}.`;
				for (let e of Object.keys(r)) {
					let t = this.#k.get(`save:${o}${e}`, r[e]), n = this.#k.get(`save:${s}${e}`, r[e]);
					this.#k.setNochk(`save:${o}${e}`, n), this.#k.setNochk(`save:${s}${e}`, t);
				}
				let c = this.#T[e], l = this.#T[t];
				return l === void 0 ? delete this.#T[e] : this.#T[e] = l, c === void 0 ? delete this.#T[t] : this.#T[t] = c, this.#k.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#T)), a.push({
					t: "xchgBufSnd",
					buf: e,
					buf2: t
				}), "skip";
			}
			case "volume": {
				let e = i.buf || "SE", t = `const.sn.sound.${e}.`, r = n.#a(n.#i("volume", "volume", i.volume, 1));
				this.#k.setNochk(`sys:${t}volume`, r);
				let o = Number(this.#k.get(`save:${t}volume`, 1, !0));
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
				let t = e === "fadebgm" || e === "fadeoutbgm", r = e === "fadeoutse" || e === "fadeoutbgm", o = t ? "BGM" : i.buf || "SE", s = `const.sn.sound.${o}.`, c = r ? 0 : n.#a(n.#n(e, "volume", i.volume ?? ""));
				this.#k.setNochk(`save:${s}volume`, c);
				let l = Number(this.#k.get(`sys:${s}volume`, 1, !0)), u = (i.stop ?? (c === 0 ? "true" : "false")) !== "false";
				u && this.#D(o);
				let d = this.skipEnabled, f = d ? 0 : n.#n(e, "time", i.time ?? ""), p = d ? 0 : n.#i(e, "delay", i.delay, 0);
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
				let t = e === "wl" ? "BGM" : i.buf || "SE", n = (i.canskip ?? "false") !== "false", r = (i.stop ?? "true") !== "false";
				return a.push({
					t: "waitSnd",
					buf: t,
					canskip: n,
					stop: r
				}), "stop";
			}
			case "wf":
			case "wb": {
				let t = e === "wb" ? "BGM" : i.buf || "SE", n = (i.canskip ?? "false") !== "false";
				return a.push({
					t: "waitFade",
					buf: t,
					canskip: n
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
				let t = this.#V[e];
				return t === void 0 ? "skip" : (this.#Q(this.#_, !1, i), this.#k.setMp({
					...i,
					"const.sn.me_call_scriptFn": this.fn,
					"const.sn.macro": JSON.stringify({ name: e })
				}), t.fn === this.fn ? (this.#_ = t.idx, "skip") : (a.push({
					t: "loadScript",
					fn: t.fn,
					label: "",
					idx: t.idx
				}), "stop"));
			}
		}
	}
	#re(e, t) {
		if (!this.#k.get(`const.sn.frm.${t}`)) throw `[${e}] frame【${t}】が読み込まれていません`;
	}
	#ie(e, t, n) {
		let r = t.name ?? "";
		if (!r) throw `[${e}] nameは必須です`;
		this.#k.set(r, n, t.cast ?? "");
	}
	#ae(e) {
		let t = e.exp ?? "";
		if (!t) throw "[if] expは必須です（試作仕様）";
		if (t.startsWith("&")) throw "[if] 属性expは「&」が不要です";
		let r = this.#A.evalBool(t) ? this.#_ : -1, i = 0, a = !1, o = this.#g.len;
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
			let { name: t, args: o } = n.parseTag(e);
			switch (t) {
				case "if":
					++i;
					continue;
				case "elsif": {
					if (i > 0 || r > -1) continue;
					let e = o.exp ?? "";
					if (!e) throw "[elsif] expは必須です（試作仕様）";
					if (e.startsWith("&")) throw "[elsif] 属性expは「&」が不要です";
					this.#A.evalBool(e) && (r = this.#_ + 1);
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
					r === -1 ? ++this.#_ : (this.#F.push(this.#_ + 1), this.#_ = r);
					return;
				default: continue;
			}
		}
		throw "[if] に対応する [endif] が見つかりません（試作仕様）";
	}
	#oe() {
		let e = this.#F.pop();
		if (e === void 0 || e === -1) throw "[if] に対応していない [elsif]/[else]/[endif] です";
		this.#_ = e;
	}
	#se(e, t = {}) {
		let n = this.#I.pop();
		if (!n) throw "[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）";
		this.#F.length = n.lenIfStk, this.#k.setMp(n.hMp), n.hEvt && (this.#L = n.hEvt);
		let r = t.label ?? "", i = t.fn ?? "";
		if (i || r) {
			if (i && i !== this.fn) return e.push({
				t: "loadScript",
				fn: i,
				label: r,
				idx: 0
			}), "stop";
			let t = this.#g.label2idx(r, this.#_, this.#j());
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
	static #ce(e, t) {
		return `｜&emsp;《${e}｜${encodeURIComponent(JSON.stringify(t))}》`;
	}
	#le(e) {
		return {
			nm: e.layer || this.#v,
			page: n.argPage(e, "fore")
		};
	}
	#ue(e, t, n = !0, r = this.#v, i = "fore") {
		let a = this.#x(i), o = (a[r] ?? "") + t;
		a[r] = o, n && this.#N && r === this.#v && i === "fore" && this.#M.add(t), e.push({
			t: "chgStr",
			nm: r,
			page: i,
			str: o
		});
	}
	#de() {
		this.#M.pagebreak();
	}
}, je = class e {
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
		let a = this.#e ?? await this.#n, o = this.searchPath(n, g.HTML), s = await this.fetch(o);
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
		let t = e.slice(4), n = t.indexOf(":");
		if (n < 0) return {
			id: "",
			sel: t,
			aEl: [...document.querySelectorAll(t)]
		};
		let r = t.slice(0, n), i = t.slice(n + 1), a = this.#r[r]?.contentDocument;
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
}, Me = /* @__PURE__ */ new Set([
	"IFRAME",
	"SCRIPT",
	"CANVAS",
	"VIDEO"
]);
function Ne(e) {
	return /\.jpe?g$/i.test(e) ? "image/jpeg" : "image/png";
}
function Pe(t) {
	let n = e("-", "_", ""), r = /\.\w+$/.exec(t);
	return r ? t.slice(0, r.index) + n + r[0] : `${t}${n}.png`;
}
function Fe(e) {
	let t = (e >>> 24) / 255;
	return `rgba(${String(e >> 16 & 255)}, ${String(e >> 8 & 255)}, ${String(e & 255)}, ${String(t)})`;
}
async function Ie(e) {
	let t = e.el.cloneNode(!0);
	t.style.transform = "none", t.style.width = `${String(e.sw)}px`, t.style.height = `${String(e.sh)}px`, Le(t, e.page, e.aLayNm), await Re(t);
	let n = new XMLSerializer().serializeToString(t), r = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(e.sw)}" height="${String(e.sh)}"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${Be()}</style>${n}</div></foreignObject></svg>`, i = await Ve(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(r)}`), a = document.createElement("canvas");
	a.width = e.width, a.height = e.height;
	let o = a.getContext("2d");
	if (!o) throw "canvasの2Dコンテキストが取れません";
	return o.imageSmoothingEnabled = e.smoothing, o.fillStyle = e.bgColor, o.fillRect(0, 0, e.width, e.height), o.drawImage(i, 0, 0, e.width, e.height), a.toDataURL(e.mime);
}
function Le(e, t, n) {
	for (let r of [...e.querySelectorAll("*")]) {
		if (Me.has(r.tagName)) {
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
async function Re(e) {
	let t = [...e.querySelectorAll("img")];
	await Promise.all(t.map(async (e) => {
		let { src: t } = e;
		if (!(!t || t.startsWith("data:"))) try {
			e.setAttribute("src", await ze(t));
		} catch {
			e.remove();
		}
	}));
}
async function ze(e) {
	let t = await fetch(e);
	if (!t.ok) throw `画像が取得できません url:${e}`;
	let n = await t.blob();
	return new Promise((t, r) => {
		let i = new FileReader();
		i.onload = () => t(String(i.result)), i.onerror = () => r(/* @__PURE__ */ Error(`画像が読めません url:${e}`)), i.readAsDataURL(n);
	});
}
function Be() {
	let e = [];
	for (let t of [...document.styleSheets]) try {
		for (let n of [...t.cssRules]) e.push(n.cssText);
	} catch {}
	return e.join("\n");
}
function Ve(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error("スナップショットの画像化に失敗しました")), r.src = e;
	});
}
function He(e, t) {
	let n = document.createElement("a");
	n.href = t, n.download = e, n.click();
}
//#endregion
//#region src/ts/SaveMng.ts
function Ue() {
	return {
		sys: {},
		mark: {},
		kidoku: {},
		storage: {}
	};
}
var We = ".swpd";
async function Ge(e, t) {
	return t === void 0 ? void 0 : typeof t == "string" ? JSON.parse(await e("json", t)) : t;
}
var Ke = class {
	sys;
	ns;
	#e = Ue();
	get data() {
		return this.#e;
	}
	constructor(e, t) {
		this.sys = e, this.ns = t;
	}
	async load() {
		let e = await this.sys.storeLoad(this.ns);
		if (!e) return this.#e = Ue(), !0;
		try {
			this.#e = this.sys.crypto ? await this.#t(e) : e;
		} catch {
			return this.#e = Ue(), !0;
		}
		return !1;
	}
	async #t(e) {
		let t = (e) => Ge(this.sys.dec, e);
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
		a.href = i, a.download = `${e ? "" : "no_crypto_"}${this.ns}${qe()}${We}`, a.click(), URL.revokeObjectURL(i);
	}
	async import() {
		let e = await (await new Promise((e, t) => {
			let n = document.createElement("input");
			n.type = "file", n.accept = `${We}, text/plain`, n.onchange = () => {
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
function qe() {
	let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
	return `${String(e.getFullYear())}-${t(e.getMonth() + 1)}-${t(e.getDate())}_${t(e.getHours())}-${t(e.getMinutes())}-${t(e.getSeconds())}`;
}
//#endregion
//#region src/ts/Font.ts
function Je(e) {
	return e.matchPath(".+", g.FONT).flatMap((e) => Object.values(e)).filter((e) => typeof e == "string").map((t) => `@font-face {
	font-family: ${JSON.stringify(t)};
	src: url(${JSON.stringify(e.searchPath(t, g.FONT))});
}`).join("\n");
}
function Ye(e, t = document) {
	let n = Je(e);
	if (!n) return;
	let r = t.createElement("style");
	r.dataset.sn = "font", r.textContent = n, t.head.appendChild(r);
}
//#endregion
//#region src/ts/SndBuf.ts
var Xe = 999e3, Ze = class {
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
}, Qe = {
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
}, $e = class {
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
		for (let [n, r] of Object.entries(Qe)) t[n] = e.canPlayType(r) !== "";
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
		let { ctx: a, gn: o } = this.#n(), s = new Ze(a, o, e, t, n);
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
};
//#endregion
//#region node_modules/motion-utils/dist/es/array.mjs
function et(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function tt(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var O = (e, t, n) => n > t ? t : n < e ? e : n;
//#endregion
//#region node_modules/motion-utils/dist/es/format-error-message.mjs
function nt(e, t) {
	return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/errors.mjs
var rt = () => {}, k = () => {};
typeof process < "u" && process.env.NODE_ENV !== "production" && (rt = (e, t, n) => {
	!e && typeof console < "u" && console.warn(nt(t, n));
}, k = (e, t, n) => {
	if (!e) throw Error(nt(t, n));
});
//#endregion
//#region node_modules/motion-utils/dist/es/global-config.mjs
var A = {}, it = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), at = (e) => typeof e == "object" && !!e, ot = (e) => /^0[^.\s]+$/u.test(e);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function st(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var j = /* @__NO_SIDE_EFFECTS__ */ (e) => e, ct = (...e) => e.reduce((e, t) => (n) => t(e(n))), lt = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, ut = class {
	constructor() {
		this.subscriptions = [];
	}
	add(e) {
		return et(this.subscriptions, e), () => tt(this.subscriptions, e);
	}
	notify(e, t, n) {
		let r = this.subscriptions.length;
		if (r) {
			if (r === 1) this.subscriptions[0](e, t, n);
			else for (let i = 0; i < r; i++) {
				let r = this.subscriptions[i];
				r && r(e, t, n);
			}
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, M = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, N = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, dt = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, ft = /* @__PURE__ */ new Set();
function pt(e, t, n) {
	e || ft.has(t) || (console.warn(nt(t, n)), ft.add(t));
}
//#endregion
//#region node_modules/motion-utils/dist/es/wrap.mjs
var mt = (e, t, n) => {
	let r = t - e;
	return ((n - e) % r + r) % r + e;
}, ht = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, gt = 1e-7, _t = 12;
function vt(e, t, n, r, i) {
	let a, o, s = 0;
	do
		o = t + (n - t) / 2, a = ht(o, r, i) - e, a > 0 ? n = o : t = o;
	while (Math.abs(a) > gt && ++s < _t);
	return o;
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n, r) {
	if (e === t && n === r) return j;
	let i = (t) => vt(t, 0, 1, e, n);
	return (e) => e === 0 || e === 1 ? e : ht(i(e), t, r);
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var bt = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, xt = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), St = /*@__PURE__*/ yt(.33, 1.53, .69, .99), Ct = /*@__PURE__*/ xt(St), wt = /*@__PURE__*/ bt(Ct), Tt = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * Ct(e) : .5 * (2 - 2 ** (-10 * (e - 1))), Et = (e) => 1 - Math.sin(Math.acos(e)), Dt = /* @__PURE__ */ xt(Et), Ot = /* @__PURE__ */ bt(Et), kt = /*@__PURE__*/ yt(.42, 0, 1, 1), At = /*@__PURE__*/ yt(0, 0, .58, 1), jt = /*@__PURE__*/ yt(.42, 0, .58, 1), Mt = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function Nt(e, t) {
	return /* @__PURE__ */ Mt(e) ? e[mt(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var Pt = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", Ft = {
	linear: j,
	easeIn: kt,
	easeInOut: jt,
	easeOut: At,
	circIn: Et,
	circInOut: Ot,
	circOut: Dt,
	backIn: Ct,
	backInOut: wt,
	backOut: St,
	anticipate: Tt
}, It = (e) => typeof e == "string", Lt = (e) => {
	if (/* @__PURE__ */ Pt(e)) {
		k(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
		let [t, n, r, i] = e;
		return /* @__PURE__ */ yt(t, n, r, i);
	}
	return It(e) ? (k(Ft[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Ft[e]) : e;
}, Rt = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function zt(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a = /* @__PURE__ */ new WeakSet(), o = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function s(t) {
		a.has(t) && (c.schedule(t), e()), t(o);
	}
	let c = {
		schedule: (e, i = !1, o = !1) => {
			let s = o && r ? t : n;
			return i && a.add(e), s.add(e), e;
		},
		cancel: (e) => {
			n.delete(e), a.delete(e);
		},
		process: (e) => {
			if (o = e, r) {
				i = !0;
				return;
			}
			r = !0;
			let a = t;
			t = n, n = a, t.forEach(s), t.clear(), r = !1, i && (i = !1, c.process(e));
		}
	};
	return c;
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var Bt = 40;
function Vt(e, t) {
	let n = !1, r = !0, i = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, a = () => n = !0, o = Rt.reduce((e, t) => (e[t] = zt(a), e), {}), { setup: s, read: c, resolveKeyframes: l, preUpdate: u, update: d, preRender: f, render: p, postRender: m } = o, h = () => {
		let a = A.useManualTiming, o = a ? i.timestamp : performance.now();
		n = !1, a || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(o - i.timestamp, Bt), 1)), i.timestamp = o, i.isProcessing = !0, s.process(i), c.process(i), l.process(i), u.process(i), d.process(i), f.process(i), p.process(i), m.process(i), i.isProcessing = !1, n && t && (r = !1, e(h));
	}, g = () => {
		n = !0, r = !0, i.isProcessing || e(h);
	};
	return {
		schedule: Rt.reduce((e, t) => {
			let r = o[t];
			return e[t] = (e, t = !1, i = !1) => (n || g(), r.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < Rt.length; t++) o[Rt[t]].cancel(e);
		},
		state: i,
		steps: o
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: P, cancel: Ht, state: Ut, steps: Wt } = /* @__PURE__ */ Vt(typeof requestAnimationFrame < "u" ? requestAnimationFrame : j, !0), Gt;
function Kt() {
	Gt = void 0;
}
var F = {
	now: () => (Gt === void 0 && F.set(Ut.isProcessing || A.useManualTiming ? Ut.timestamp : performance.now()), Gt),
	set: (e) => {
		Gt = e, queueMicrotask(Kt);
	}
}, qt = (e) => (t) => typeof t == "string" && t.startsWith(e), Jt = /*@__PURE__*/ qt("--"), Yt = /*@__PURE__*/ qt("var(--"), Xt = (e) => Yt(e) ? Zt.test(e.split("/*")[0].trim()) : !1, Zt = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Qt(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var I = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, $t = {
	...I,
	transform: (e) => O(0, 1, e)
}, en = {
	...I,
	default: 1
}, tn = (e) => Math.round(e * 1e5) / 1e5, nn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function rn(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var an = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, on = (e, t) => (n) => !!(typeof n == "string" && an.test(n) && n.startsWith(e) || t && !rn(n) && Object.prototype.hasOwnProperty.call(n, t)), sn = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(nn);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, cn = (e) => O(0, 255, e), ln = {
	...I,
	transform: (e) => Math.round(cn(e))
}, L = {
	test: /*@__PURE__*/ on("rgb", "red"),
	parse: /*@__PURE__*/ sn("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + ln.transform(e) + ", " + ln.transform(t) + ", " + ln.transform(n) + ", " + tn($t.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function un(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var dn = {
	test: /*@__PURE__*/ on("#"),
	parse: un,
	transform: L.transform
}, fn = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), R = /*@__PURE__*/ fn("deg"), z = /*@__PURE__*/ fn("%"), B = /*@__PURE__*/ fn("px"), pn = /*@__PURE__*/ fn("vh"), mn = /*@__PURE__*/ fn("vw"), hn = {
	...z,
	parse: (e) => z.parse(e) / 100,
	transform: (e) => z.transform(e * 100)
}, V = {
	test: /*@__PURE__*/ on("hsl", "hue"),
	parse: /*@__PURE__*/ sn("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + z.transform(tn(t)) + ", " + z.transform(tn(n)) + ", " + tn($t.transform(r)) + ")"
}, H = {
	test: (e) => L.test(e) || dn.test(e) || V.test(e),
	parse: (e) => L.test(e) ? L.parse(e) : V.test(e) ? V.parse(e) : dn.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? L.transform(e) : V.transform(e),
	getAnimatableNone: (e) => {
		let t = H.parse(e);
		return t.alpha = 0, H.transform(t);
	}
}, gn = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function _n(e) {
	return isNaN(e) && typeof e == "string" && (e.match(nn)?.length || 0) + (e.match(gn)?.length || 0) > 0;
}
var vn = "number", yn = "color", bn = "var", xn = "var(", Sn = "${}", Cn = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function U(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(Cn, (e) => (H.test(e) ? (r.color.push(a), i.push(yn), n.push(H.parse(e))) : e.startsWith(xn) ? (r.var.push(a), i.push(bn), n.push(e)) : (r.number.push(a), i.push(vn), n.push(parseFloat(e))), ++a, Sn)).split(Sn),
		indexes: r,
		types: i
	};
}
function wn(e) {
	return U(e).values;
}
function Tn({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === vn ? tn(r[a]) : e === yn ? H.transform(r[a]) : r[a];
		}
		return i;
	};
}
function En(e) {
	return Tn(U(e));
}
var Dn = (e) => typeof e == "number" ? 0 : H.test(e) ? H.getAnimatableNone(e) : e, On = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : Dn(e);
function kn(e) {
	let t = U(e);
	return Tn(t)(t.values.map((e, n) => On(e, t.split[n])));
}
var W = {
	test: _n,
	parse: wn,
	createTransformer: En,
	getAnimatableNone: kn
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function An(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function jn({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = An(s, r, e + 1 / 3), a = An(s, r, e), o = An(s, r, e - 1 / 3);
	}
	return {
		red: Math.round(i * 255),
		green: Math.round(a * 255),
		blue: Math.round(o * 255),
		alpha: r
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function Mn(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var G = (e, t, n) => e + (t - e) * n, Nn = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, Pn = [
	dn,
	L,
	V
], Fn = (e) => Pn.find((t) => t.test(e));
function In(e) {
	let t = Fn(e);
	if (rt(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t) return !1;
	let n = t.parse(e);
	return t === V && (n = jn(n)), n;
}
var Ln = (e, t) => {
	let n = In(e), r = In(t);
	if (!n || !r) return Mn(e, t);
	let i = { ...n };
	return (e) => (i.red = Nn(n.red, r.red, e), i.green = Nn(n.green, r.green, e), i.blue = Nn(n.blue, r.blue, e), i.alpha = G(n.alpha, r.alpha, e), L.transform(i));
}, Rn = /* @__PURE__ */ new Set(["none", "hidden"]);
function zn(e, t) {
	return Rn.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function Bn(e, t) {
	return (n) => G(e, t, n);
}
function Vn(e) {
	return typeof e == "number" ? Bn : typeof e == "string" ? Xt(e) ? Mn : H.test(e) ? Ln : Gn : Array.isArray(e) ? Hn : typeof e == "object" ? H.test(e) ? Ln : Un : Mn;
}
function Hn(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => Vn(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function Un(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = Vn(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function Wn(e, t) {
	let n = [], r = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i = 0; i < t.values.length; i++) {
		let a = t.types[i], o = e.indexes[a][r[a]], s = e.values[o] ?? 0;
		n[i] = s, r[a]++;
	}
	return n;
}
var Gn = (e, t) => {
	let n = W.createTransformer(t), r = U(e), i = U(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? Rn.has(e) && !i.values.length || Rn.has(t) && !r.values.length ? zn(e, t) : ct(Hn(Wn(r, i), i.values), n) : (rt(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Mn(e, t));
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/index.mjs
function Kn(e, t, n) {
	return typeof e == "number" && typeof t == "number" && typeof n == "number" ? G(e, t, n) : Vn(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var qn = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => P.update(t, e),
		stop: () => Ht(t),
		now: () => Ut.isProcessing ? Ut.timestamp : F.now()
	};
}, Jn = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, Yn = 2e4;
function Xn(e) {
	let t = 0, n = e.next(t);
	for (; !n.done && t < 2e4;) t += 50, n = e.next(t);
	return t >= 2e4 ? Infinity : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function Zn(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(Xn(r), Yn);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ N(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var K = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	velocity: 0,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05,
	maxDamping: 1
};
function Qn(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var $n = 12;
function er(e, t, n) {
	let r = n;
	for (let n = 1; n < $n; n++) r -= e(r) / t(r);
	return r;
}
var tr = .001;
function nr({ duration: e = K.duration, bounce: t = K.bounce, velocity: n = K.velocity, mass: r = K.mass }) {
	let i, a;
	rt(e <= /* @__PURE__ */ M(K.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let o = 1 - t;
	o = O(K.minDamping, K.maxDamping, o), e = O(K.minDuration, K.maxDuration, /* @__PURE__ */ N(e)), o < 1 ? (i = (t) => {
		let r = t * o, i = r * e, a = r - n, s = Qn(t, o), c = Math.exp(-i);
		return tr - a / s * c;
	}, a = (t) => {
		let r = t * o * e, a = r * n + n, s = o ** 2 * t ** 2 * e, c = Math.exp(-r), l = Qn(t ** 2, o);
		return (-i(t) + tr > 0 ? -1 : 1) * ((a - s) * c) / l;
	}) : (i = (t) => -.001 + Math.exp(-t * e) * ((t - n) * e + 1), a = (t) => Math.exp(-t * e) * ((n - t) * (e * e)));
	let s = 5 / e, c = er(i, a, s);
	if (e = /* @__PURE__ */ M(e), isNaN(c)) return {
		stiffness: K.stiffness,
		damping: K.damping,
		duration: e
	};
	{
		let t = c ** 2 * r;
		return {
			stiffness: t,
			damping: o * 2 * Math.sqrt(r * t),
			duration: e
		};
	}
}
var rr = ["duration", "bounce"], ir = [
	"stiffness",
	"damping",
	"mass"
];
function ar(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function or(e) {
	let t = {
		velocity: K.velocity,
		stiffness: K.stiffness,
		damping: K.damping,
		mass: K.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!ar(e, ir) && ar(e, rr)) {
		if (t.velocity = 0, e.visualDuration) {
			let n = e.visualDuration, r = 2 * Math.PI / (n * 1.2), i = r * r, a = 2 * O(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
			t = {
				...t,
				mass: K.mass,
				stiffness: i,
				damping: a
			};
		} else {
			let n = nr({
				...e,
				velocity: 0
			});
			t = {
				...t,
				...n,
				mass: K.mass
			}, t.isResolvedFromDuration = !0;
		}
	}
	return t;
}
function sr(e = K.visualDuration, t = K.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, { restSpeed: r, restDelta: i } = n, a = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], s = {
		done: !1,
		value: a
	}, { stiffness: c, damping: l, mass: u, duration: d, velocity: f, isResolvedFromDuration: p } = or({
		...n,
		velocity: -/* @__PURE__ */ N(n.velocity || 0)
	}), m = f || 0, h = l / (2 * Math.sqrt(c * u)), g = o - a, _ = /* @__PURE__ */ N(Math.sqrt(c / u)), v = Math.abs(g) < 5;
	r ||= v ? K.restSpeed.granular : K.restSpeed.default, i ||= v ? K.restDelta.granular : K.restDelta.default;
	let y, b, x, S, C, w;
	if (h < 1) x = Qn(_, h), S = (m + h * _ * g) / x, y = (e) => {
		let t = Math.exp(-h * _ * e);
		return o - t * (S * Math.sin(x * e) + g * Math.cos(x * e));
	}, C = h * _ * S + g * x, w = h * _ * g - S * x, b = (e) => Math.exp(-h * _ * e) * (C * Math.sin(x * e) + w * Math.cos(x * e));
	else if (h === 1) {
		y = (e) => o - Math.exp(-_ * e) * (g + (m + _ * g) * e);
		let e = m + _ * g;
		b = (t) => Math.exp(-_ * t) * (_ * e * t - m);
	} else {
		let e = _ * Math.sqrt(h * h - 1);
		y = (t) => {
			let n = Math.exp(-h * _ * t), r = Math.min(e * t, 300);
			return o - n * ((m + h * _ * g) * Math.sinh(r) + e * g * Math.cosh(r)) / e;
		};
		let t = (m + h * _ * g) / e, n = h * _ * t - g * e, r = h * _ * g - t * e;
		b = (t) => {
			let i = Math.exp(-h * _ * t), a = Math.min(e * t, 300);
			return i * (n * Math.sinh(a) + r * Math.cosh(a));
		};
	}
	let T = {
		calculatedDuration: p && d || null,
		velocity: (e) => /* @__PURE__ */ M(b(e)),
		next: (e) => {
			if (!p && h < 1) {
				let t = Math.exp(-h * _ * e), n = Math.sin(x * e), a = Math.cos(x * e), c = o - t * (S * n + g * a), l = /* @__PURE__ */ M(t * (C * n + w * a));
				return s.done = Math.abs(l) <= r && Math.abs(o - c) <= i, s.value = s.done ? o : c, s;
			}
			let t = y(e);
			if (p) s.done = e >= d;
			else {
				let n = /* @__PURE__ */ M(b(e));
				s.done = Math.abs(n) <= r && Math.abs(o - t) <= i;
			}
			return s.value = s.done ? o : t, s;
		},
		toString: () => {
			let e = Math.min(Xn(T), Yn), t = Jn((t) => T.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return T;
}
sr.applyToOptions = (e) => {
	let t = Zn(e, 100, sr);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ M(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var cr = 5;
function lr(e, t, n) {
	let r = Math.max(t - cr, 0);
	return /* @__PURE__ */ dt(n - e(r), t - r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function ur({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => s !== void 0 && e < s || c !== void 0 && e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => _ + v(e), b = (e) => {
		let t = v(e), n = y(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : n;
	}, x, S, C = (e) => {
		p(f.value) && (x = e, S = sr({
			keyframes: [f.value, m(f.value)],
			velocity: lr(y, e, f.value),
			damping: i,
			stiffness: a,
			restDelta: l,
			restSpeed: u
		}));
	};
	return C(0), {
		calculatedDuration: null,
		next: (e) => {
			let t = !1;
			return !S && x === void 0 && (t = !0, b(e), C(e)), x !== void 0 && e >= x ? S.next(e - x) : (!t && b(e), f);
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/interpolate.mjs
function dr(e, t, n) {
	let r = [], i = n || A.mix || Kn, a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = ct(Array.isArray(t) ? t[n] || j : t, a)), r.push(a);
	}
	return r;
}
function fr(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	let a = e.length;
	if (k(a === t.length, "Both input and output ranges must be the same length", "range-length"), a === 1) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	let o = e[0] === e[1];
	e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let s = dr(t, r, i), c = s.length, l = (n) => {
		if (o && n < e[0]) return t[0];
		let r = 0;
		if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ lt(e[r], e[r + 1], n);
		return s[r](i);
	};
	return n ? (t) => l(O(e[0], e[a - 1], t)) : l;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function pr(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ lt(0, t, r);
		e.push(G(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function mr(e) {
	let t = [0];
	return pr(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function hr(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function gr(e, t) {
	return e.map(() => t || jt).splice(0, e.length - 1);
}
function q({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ Mt(r) ? r.map(Lt) : Lt(r), a = {
		done: !1,
		value: t[0]
	}, o = fr(hr(n && n.length === t.length ? n : mr(t), e), t, { ease: Array.isArray(i) ? i : gr(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var _r = (e) => e !== null;
function vr(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(_r), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var yr = {
	decay: ur,
	inertia: ur,
	tween: q,
	keyframes: q,
	spring: sr
};
function br(e) {
	typeof e.type == "string" && (e.type = yr[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var xr = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((e) => {
			this.resolve = e;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, Sr = (e) => e / 100, Cr = class extends xr {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== F.now() && this.tick(F.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: e } = this;
		br(e);
		let { type: t = q, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || q;
		process.env.NODE_ENV !== "production" && s !== q && k(o.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`, "spring-two-frames"), s !== q && typeof o[0] != "number" && (this.mixKeyframes = ct(Sr, Kn(o[0], o[1])), o = [0, 100]);
		let c = s({
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = Xn(c));
		let { calculatedDuration: l } = c;
		this.calculatedDuration = l, this.resolvedDuration = l + r, this.totalDuration = this.resolvedDuration * (n + 1) - r, this.generator = c;
	}
	updateTime(e) {
		let t = Math.round(e - this.startTime) * this.playbackSpeed;
		this.currentTime = this.holdTime === null ? t : this.holdTime;
	}
	tick(e, t = !1) {
		let { generator: n, totalDuration: r, mixKeyframes: i, mirroredGenerator: a, resolvedDuration: o, calculatedDuration: s } = this;
		if (this.startTime === null) return n.next(0);
		let { delay: c = 0, keyframes: l, repeat: u, repeatType: d, repeatDelay: f, type: p, onUpdate: m, finalKeyframe: h } = this.options;
		this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), t ? this.currentTime = e : this.updateTime(e);
		let g = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), _ = this.playbackSpeed >= 0 ? g < 0 : g > r;
		this.currentTime = Math.max(g, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
		let v = this.currentTime, y = n;
		if (u) {
			let e = Math.min(this.currentTime, r) / o, t = Math.floor(e), n = e % 1;
			!n && e >= 1 && (n = 1), n === 1 && t--, t = Math.min(t, u + 1), t % 2 && (d === "reverse" ? (n = 1 - n, f && (n -= f / o)) : d === "mirror" && (y = a)), v = O(0, 1, n) * o;
		}
		let b;
		_ ? (this.delayState.value = l[0], b = this.delayState) : b = y.next(v), i && !_ && (b.value = i(b.value));
		let { done: x } = b;
		!_ && s !== null && (x = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
		let S = this.holdTime === null && (this.state === "finished" || this.state === "running" && x);
		return S && p !== ur && (b.value = vr(l, this.options, h, this.speed)), m && m(b.value), S && this.finish(), b;
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
	get duration() {
		return /* @__PURE__ */ N(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ N(e);
	}
	get time() {
		return /* @__PURE__ */ N(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ M(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		let e = this.currentTime;
		if (e <= 0) return this.options.velocity || 0;
		if (this.generator.velocity) return this.generator.velocity(e);
		let t = this.generator.next(e).value;
		return lr((e) => this.generator.next(e).value, e, t);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(F.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ N(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = qn, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(F.now()), this.holdTime = this.currentTime;
	}
	complete() {
		this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
	}
	finish() {
		this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
	}
	stopDriver() {
		this.driver &&= (this.driver.stop(), void 0);
	}
	sample(e) {
		return this.startTime = 0, this.tick(e, !0);
	}
	attachTimeline(e) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function wr(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var J = (e) => e * 180 / Math.PI, Tr = (e) => Dr(J(Math.atan2(e[1], e[0]))), Er = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: Tr,
	rotateZ: Tr,
	skewX: (e) => J(Math.atan(e[1])),
	skewY: (e) => J(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Dr = (e) => (e %= 360, e < 0 && (e += 360), e), Or = Tr, kr = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), Ar = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), jr = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: kr,
	scaleY: Ar,
	scale: (e) => (kr(e) + Ar(e)) / 2,
	rotateX: (e) => Dr(J(Math.atan2(e[6], e[5]))),
	rotateY: (e) => Dr(J(Math.atan2(-e[2], e[0]))),
	rotateZ: Or,
	rotate: Or,
	skewX: (e) => J(Math.atan(e[4])),
	skewY: (e) => J(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Mr(e) {
	return +!!e.includes("scale");
}
function Nr(e, t) {
	if (!e || e === "none") return Mr(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = jr, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = Er, i = t;
	}
	if (!i) return Mr(t);
	let a = r[t], o = i[1].split(",").map(Fr);
	return typeof a == "function" ? a(o) : o[a];
}
var Pr = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return Nr(n, t);
};
function Fr(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var Y = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
], X = /* @__PURE__ */ new Set([...Y, "pathRotation"]), Ir = (e) => e === I || e === B, Lr = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), Rr = Y.filter((e) => !Lr.has(e));
function zr(e) {
	let t = [];
	return Rr.forEach((n) => {
		let r = e.getValue(n);
		r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith("scale")));
	}), t;
}
var Z = {
	width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	top: (e, { top: t }) => parseFloat(t),
	left: (e, { left: t }) => parseFloat(t),
	bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
	right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
	x: (e, { transform: t }) => Nr(t, "x"),
	y: (e, { transform: t }) => Nr(t, "y")
};
Z.translateX = Z.x, Z.translateY = Z.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var Q = /* @__PURE__ */ new Set(), Br = !1, Vr = !1, Hr = !1;
function Ur() {
	if (Vr) {
		let e = Array.from(Q).filter((e) => e.needsMeasurement), t = new Set(e.map((e) => e.element)), n = /* @__PURE__ */ new Map();
		t.forEach((e) => {
			let t = zr(e);
			t.length && (n.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = n.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	Vr = !1, Br = !1, Q.forEach((e) => e.complete(Hr)), Q.clear();
}
function Wr() {
	Q.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (Vr = !0);
	});
}
function Gr() {
	Hr = !0, Wr(), Ur(), Hr = !1;
}
var Kr = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (Q.add(this), Br || (Br = !0, P.read(Wr), P.resolveKeyframes(Ur))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = n.readValue(t, a);
				r != null && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		wr(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), Q.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (Q.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, qr = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function Jr(e, t, n) {
	qr(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var Yr = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function Xr(e, t) {
	let n = /* @__PURE__ */ st(e);
	return () => Yr[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var Zr = /* @__PURE__ */ Xr(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Qr = /*@__PURE__*/ Xr(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), $r = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, ei = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ $r([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ $r([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ $r([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ $r([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function ti(e, t) {
	if (e) return typeof e == "function" ? Qr() ? Jn(e, t) : "ease-out" : /* @__PURE__ */ Pt(e) ? $r(e) : Array.isArray(e) ? e.map((e) => ti(e, t) || ei.easeOut) : ei[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function ni(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = ti(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function ri(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function ii({ type: e, ...t }) {
	return ri(e) && Qr() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var ai = class extends xr {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, k(typeof e.type != "string", "Mini animate() doesn't support \"type\" as a string.", "mini-spring");
		let c = ii(e);
		this.animation = ni(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = vr(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), Jr(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		};
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: e } = this;
		e !== "idle" && e !== "finished" && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ N(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ N(e);
	}
	get time() {
		return /* @__PURE__ */ N(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ M(e), t && this.animation.pause();
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, rangeStart: t, rangeEnd: n, observe: r }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && Zr() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), j) : r(this);
	}
}, oi = {
	anticipate: Tt,
	backInOut: wt,
	circInOut: Ot
};
function si(e) {
	return e in oi;
}
function ci(e) {
	typeof e.ease == "string" && si(e.ease) && (e.ease = oi[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var li = 10, ui = class extends ai {
	constructor(e) {
		ci(e), br(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: n, onComplete: r, element: i, ...a } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let o = new Cr({
			...a,
			autoplay: !1
		}), s = Math.max(li, F.now() - this.startTime), c = O(0, li, s - li), l = o.sample(s).value, { name: u } = this.options;
		i && u && Jr(i, u, l), t.setWithVelocity(o.sample(Math.max(0, s - c)).value, l, c), o.stop();
	}
}, di = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (W.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function fi(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function pi(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = di(i, t), s = di(a, t);
	return rt(o === s, `You are trying to animate ${t} from "${i}" to "${a}". "${o ? a : i}" is not an animatable value.`, "value-not-animatable"), !o || !s ? !1 : fi(e) || (n === "spring" || ri(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function mi(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var hi = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), gi = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function _i(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && gi.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var vi = /* @__PURE__ */ new Set([
	"color",
	"backgroundColor",
	"outlineColor",
	"fill",
	"stroke",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor"
]), yi = /*@__PURE__*/ st(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function bi(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e, c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return yi() && n && (hi.has(n) || vi.has(n) && _i(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var xi = 40, Si = class extends xr {
	constructor({ autoplay: e = !0, delay: t = 0, type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: a = "loop", keyframes: o, name: s, motionValue: c, element: l, ...u }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = F.now();
		let d = {
			autoplay: e,
			delay: t,
			type: n,
			repeat: r,
			repeatDelay: i,
			repeatType: a,
			name: s,
			motionValue: c,
			element: l,
			...u
		}, f = l?.KeyframeResolver || Kr;
		this.keyframeResolver = new f(o, (e, t, n) => this.onKeyframesResolved(e, t, d, !n), s, c, l), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
		this.resolvedAt = F.now();
		let u = !0;
		pi(e, i, a, o) || (u = !1, (A.instantAnimations || !s) && l?.(vr(e, n, t)), e[0] = e[e.length - 1], mi(n), n.repeat = 0);
		let d = {
			startTime: r ? this.resolvedAt && this.resolvedAt - this.createdAt > xi ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: t,
			...n,
			keyframes: e
		}, f = u && !c && bi(d), p = d.motionValue?.owner?.current, m;
		if (f) try {
			m = new ui({
				...d,
				element: p
			});
		} catch {
			m = new Cr(d);
		}
		else m = new Cr(d);
		m.finished.then(() => {
			this.notifyFinished();
		}).catch(j), this.pendingTimeline &&= (this.stopTimeline = m.attachTimeline(this.pendingTimeline), void 0), this._animation = m;
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), Gr()), this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(e) {
		this.animation.time = e;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(e) {
		this.animation.speed = e;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(e) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
	}
}, Ci = class {
	constructor(e) {
		this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((e) => e.finished));
	}
	getAll(e) {
		return this.animations[0][e];
	}
	setAll(e, t) {
		for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
	}
	attachTimeline(e) {
		let t = this.animations.map((t) => t.attachTimeline(e));
		return () => {
			t.forEach((e, t) => {
				e && e(), this.animations[t].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(e) {
		this.setAll("time", e);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(e) {
		this.setAll("speed", e);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		return wi(this.animations, "duration");
	}
	get iterationDuration() {
		return wi(this.animations, "iterationDuration");
	}
	runAll(e) {
		this.animations.forEach((t) => t[e]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
function wi(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var Ti = class extends Ci {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, Ei = 30, Di = (e) => !isNaN(parseFloat(e)), Oi = { current: void 0 }, ki = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = F.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = F.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Di(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return process.env.NODE_ENV !== "production" && pt(!1, "value.onChange(callback) is deprecated. Switch to value.on(\"change\", callback)."), this.on("change", e);
	}
	on(e, t) {
		this.events[e] || (this.events[e] = new ut());
		let n = this.events[e].add(t);
		return e === "change" ? () => {
			n(), P.read(() => {
				this.events.change.getSize() || this.stop();
			});
		} : n;
	}
	clearListeners() {
		for (let e in this.events) this.events[e].clear();
	}
	attach(e, t) {
		this.passiveEffect = e, this.stopPassiveEffect = t;
	}
	set(e) {
		this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
	}
	setWithVelocity(e, t, n) {
		this.set(t), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - n;
	}
	jump(e, t = !0) {
		this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, t && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.events.change?.notify(this.current);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		return Oi.current && Oi.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = F.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Ei) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, Ei);
		return /* @__PURE__ */ dt(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return this.stop(), new Promise((t) => {
			this.hasAnimated = !0, this.animation = e(t), this.events.animationStart && this.events.animationStart.notify();
		}).then(() => {
			this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function Ai(e, t) {
	return new ki(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function ji(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function Mi(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : ji(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var Ni = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, Pi = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), Fi = {
	type: "keyframes",
	duration: .8
}, Ii = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, Li = (e, { keyframes: t }) => t.length > 2 ? Fi : X.has(e) ? e.startsWith("scale") ? Pi(t[1]) : Ni : Ii, Ri = /* @__PURE__ */ new Set([
	"when",
	"delay",
	"delayChildren",
	"staggerChildren",
	"staggerDirection",
	"repeat",
	"repeatType",
	"repeatDelay",
	"from",
	"elapsed"
]);
function zi(e) {
	for (let t in e) if (!Ri.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var Bi = (e, t, n, r = {}, i, a) => (o) => {
	let s = Mi(r, e) || {}, c = s.delay || r.delay || 0, { elapsed: l = 0 } = r;
	l -= /* @__PURE__ */ M(c);
	let u = {
		keyframes: Array.isArray(n) ? n : [null, n],
		ease: "easeOut",
		velocity: t.getVelocity(),
		...s,
		delay: -l,
		onUpdate: (e) => {
			t.set(e), s.onUpdate && s.onUpdate(e);
		},
		onComplete: () => {
			o(), s.onComplete && s.onComplete();
		},
		name: e,
		motionValue: t,
		element: a ? void 0 : i
	};
	zi(s) || Object.assign(u, Li(e, u)), u.duration &&= /* @__PURE__ */ M(u.duration), u.repeatDelay &&= /* @__PURE__ */ M(u.repeatDelay), u.from !== void 0 && (u.keyframes[0] = u.from);
	let d = !1;
	if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (mi(u), u.delay === 0 && (d = !0)), (A.instantAnimations || A.skipAnimations || i?.shouldSkipAnimations || s.skipAnimations) && (d = !0, mi(u), u.delay = 0), u.allowFlatten = !s.type && !s.ease, d && !a && t.get() !== void 0) {
		let e = vr(u.keyframes, s);
		if (e !== void 0) {
			P.update(() => {
				u.onUpdate(e), u.onComplete();
			});
			return;
		}
	}
	return s.isSync ? new Cr(u) : new Si(u);
}, Vi = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Hi(e) {
	let t = Vi.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
var Ui = 4;
function Wi(e, t, n = 1) {
	k(n <= Ui, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	let [r, i] = Hi(e);
	if (!r) return;
	let a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		let e = a.trim();
		return it(e) ? parseFloat(e) : e;
	}
	return Xt(i) ? Wi(i, t, n + 1) : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function Gi(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function Ki(e, t, n, r) {
	if (typeof t == "function") {
		let [i, a] = Gi(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
		let [i, a] = Gi(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function qi(e, t, n) {
	let r = e.getProps();
	return Ki(r, t, n === void 0 ? r.custom : n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var Ji = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...Y
]), Yi = (e) => Array.isArray(e);
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
function Xi(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Ai(n));
}
function Zi(e) {
	return Yi(e) ? e[e.length - 1] || 0 : e;
}
function Qi(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = qi(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) Xi(e, t, Zi(i[t]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var $ = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function $i(e) {
	return !!($(e) && e.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function ea(e, t) {
	let n = e.getValue("willChange");
	if ($i(n)) return n.add(t);
	if (!n && A.WillChange) {
		let n = new A.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function ta(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var na = "data-" + ta("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function ra(e) {
	return e.props[na];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
var ia = typeof window < "u";
function aa({ protectedKeys: e, needsAnimating: t }, n) {
	let r = e.hasOwnProperty(n) && t[n] !== !0;
	return t[n] = !1, r;
}
function oa(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t, c = e.getDefaultTransition();
	a = a ? ji(a, c) : c;
	let l = a?.reduceMotion, u = a?.skipAnimations;
	r && (a = r);
	let d = [], f = i && e.animationState && e.animationState.getState()[i], p = a?.path;
	p && p.animateVisualElement(e, s, a, n, d);
	for (let t in s) {
		let r = e.getValue(t, e.latestValues[t] ?? null), i = s[t];
		if (i === void 0 || f && aa(f, t)) continue;
		let o = {
			delay: n,
			...Mi(a || {}, t)
		};
		u && (o.skipAnimations = !0);
		let c = r.get();
		if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
			P.update(() => r.set(i));
			continue;
		}
		let p = !1;
		if (ia && window.MotionHandoffAnimation) {
			let n = ra(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, P);
				e !== null && (o.startTime = e, p = !0);
			}
		}
		ea(e, t);
		let m = l ?? e.shouldReduceMotion;
		r.start(Bi(t, r, i, m && Ji.has(t) ? { type: !1 } : o, e, p));
		let h = r.animation;
		h && d.push(h);
	}
	if (o) {
		let t = () => P.update(() => {
			o && Qi(e, o);
		});
		d.length ? Promise.all(d).then(t) : t();
	}
	return d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var sa = {
	test: (e) => e === "auto",
	parse: (e) => e
}, ca = (e) => (t) => t.test(e), la = [
	I,
	B,
	z,
	R,
	mn,
	pn,
	sa
], ua = (e) => la.find(ca(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function da(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || ot(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var fa = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function pa(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(nn) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!fa.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var ma = /\b([a-z-]*)\(.*?\)/gu, ha = {
	...W,
	getAnimatableNone: (e) => {
		let t = e.match(ma);
		return t ? t.map(pa).join(" ") : e;
	}
}, ga = {
	...W,
	getAnimatableNone: (e) => {
		let t = W.parse(e);
		return W.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, _a = {
	...I,
	transform: Math.round
}, va = {
	borderWidth: B,
	borderTopWidth: B,
	borderRightWidth: B,
	borderBottomWidth: B,
	borderLeftWidth: B,
	borderRadius: B,
	borderTopLeftRadius: B,
	borderTopRightRadius: B,
	borderBottomRightRadius: B,
	borderBottomLeftRadius: B,
	width: B,
	maxWidth: B,
	height: B,
	maxHeight: B,
	top: B,
	right: B,
	bottom: B,
	left: B,
	inset: B,
	insetBlock: B,
	insetBlockStart: B,
	insetBlockEnd: B,
	insetInline: B,
	insetInlineStart: B,
	insetInlineEnd: B,
	padding: B,
	paddingTop: B,
	paddingRight: B,
	paddingBottom: B,
	paddingLeft: B,
	paddingBlock: B,
	paddingBlockStart: B,
	paddingBlockEnd: B,
	paddingInline: B,
	paddingInlineStart: B,
	paddingInlineEnd: B,
	margin: B,
	marginTop: B,
	marginRight: B,
	marginBottom: B,
	marginLeft: B,
	marginBlock: B,
	marginBlockStart: B,
	marginBlockEnd: B,
	marginInline: B,
	marginInlineStart: B,
	marginInlineEnd: B,
	fontSize: B,
	backgroundPositionX: B,
	backgroundPositionY: B,
	rotate: R,
	pathRotation: R,
	rotateX: R,
	rotateY: R,
	rotateZ: R,
	scale: en,
	scaleX: en,
	scaleY: en,
	scaleZ: en,
	skew: R,
	skewX: R,
	skewY: R,
	distance: B,
	translateX: B,
	translateY: B,
	translateZ: B,
	x: B,
	y: B,
	z: B,
	perspective: B,
	transformPerspective: B,
	opacity: $t,
	originX: hn,
	originY: hn,
	originZ: B,
	zIndex: _a,
	fillOpacity: $t,
	strokeOpacity: $t,
	numOctaves: _a
}, ya = {
	...va,
	color: H,
	backgroundColor: H,
	outlineColor: H,
	fill: H,
	stroke: H,
	borderColor: H,
	borderTopColor: H,
	borderRightColor: H,
	borderBottomColor: H,
	borderLeftColor: H,
	filter: ha,
	WebkitFilter: ha,
	mask: ga,
	WebkitMask: ga
}, ba = (e) => ya[e], xa = /*@__PURE__*/ new Set([ha, ga]);
function Sa(e, t) {
	let n = ba(e);
	return xa.has(n) || (n = W), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var Ca = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function wa(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !Ca.has(t) && U(t).values.length && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] = Sa(n, i);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var Ta = class extends Kr {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), Xt(r))) {
				let i = Wi(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !Ji.has(n) || e.length !== 2) return;
		let [r, i] = e, a = ua(r), o = ua(i);
		if (Qt(r) !== Qt(i) && Z[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) {
			if (Ir(a) && Ir(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else Z[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || da(e[t])) && n.push(t);
		n.length && wa(e, n, t);
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Z[n](e.measureViewportBox(), window.getComputedStyle(e.current)), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && e.getValue(n, r).jump(r, !1);
	}
	measureEndState() {
		let { element: e, name: t, unresolvedKeyframes: n } = this;
		if (!e || !e.current) return;
		let r = e.getValue(t);
		r && r.jump(this.measuredOrigin, !1);
		let i = n.length - 1, a = n[i];
		n[i] = Z[t](e.measureViewportBox(), window.getComputedStyle(e.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, Ea = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
];
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function Da(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = document;
		t && (r = t.current);
		let i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var Oa = (e, t) => t && typeof e == "number" ? t.transform(e) : e, { schedule: ka, cancel: Aa } = /* @__PURE__ */ Vt(queueMicrotask, !1);
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function ja(e) {
	return at(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function Ma(e) {
	return ja(e) && e.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var Na = [
	...la,
	H,
	W
], Pa = (e) => Na.find(ca(e)), Fa = () => ({
	min: 0,
	max: 0
}), Ia = () => ({
	x: Fa(),
	y: Fa()
}), La = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function Ra(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function za(e) {
	return typeof e == "string" || Array.isArray(e);
}
var Ba = [
	"initial",
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function Va(e) {
	return Ra(e.animate) || Ba.some((t) => za(e[t]));
}
function Ha(e) {
	return !!(Va(e) || e.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function Ua(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if ($(i)) e.addValue(r, i);
		else if ($(a)) e.addValue(r, Ai(i, { owner: e }));
		else if (a !== i) {
			if (e.hasValue(r)) {
				let t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				let t = e.getStaticValue(r);
				e.addValue(r, Ai(t === void 0 ? i : t, { owner: e }));
			}
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var Wa = { current: null }, Ga = { current: !1 }, Ka = typeof window < "u";
function qa() {
	if (Ga.current = !0, Ka) {
		if (window.matchMedia) {
			let e = window.matchMedia("(prefers-reduced-motion)"), t = () => Wa.current = e.matches;
			e.addEventListener("change", t), t();
		} else Wa.current = !1;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var Ja = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], Ya = {}, Xa = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Kr, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = F.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, P.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = Va(t), this.isVariantNode = Ha(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && $(t) && t.set(c[e]);
		}
	}
	mount(e) {
		if (this.hasBeenMounted) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		this.current = e, La.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Ga.current || qa(), this.shouldReduceMotion = Wa.current), process.env.NODE_ENV !== "production" && pt(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection && this.projection.unmount(), Ht(this.notifyUpdate), Ht(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
		for (let e in this.events) this.events[e].clear();
		for (let e in this.features) {
			let t = this.features[e];
			t && (t.unmount(), t.isMounted = !1);
		}
		this.current = null;
	}
	addChild(e) {
		this.children.add(e), this.enteringChildren ??= /* @__PURE__ */ new Set(), this.enteringChildren.add(e);
	}
	removeChild(e) {
		this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
	}
	bindToMotionValue(e, t) {
		if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), t.accelerate && hi.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new ai({
				element: this.current,
				name: e,
				keyframes: r,
				times: i,
				ease: a,
				duration: /* @__PURE__ */ M(o)
			}), c = n(s);
			this.valueSubscriptions.set(e, () => {
				c(), s.cancel();
			});
			return;
		}
		let n = X.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && P.preRender(this.notifyUpdate), n && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
		}), i;
		typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, e, t)), this.valueSubscriptions.set(e, () => {
			r(), i && i();
		});
	}
	sortNodePosition(e) {
		return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
	}
	updateFeatures() {
		let e = "animation";
		for (e in Ya) {
			let t = Ya[e];
			if (!t) continue;
			let { isEnabled: n, Feature: r } = t;
			if (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)), this.features[e]) {
				let t = this.features[e];
				t.isMounted ? t.update() : (t.mount(), t.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ia();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < Ja.length; t++) {
			let n = Ja[t];
			this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = Ua(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(e) {
		return this.props.variants ? this.props.variants[e] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	addVariantChild(e) {
		let t = this.getClosestVariantNode();
		if (t) return t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e);
	}
	addValue(e, t) {
		let n = this.values.get(e);
		t !== n && (n && this.removeValue(e), this.bindToMotionValue(e, t), this.values.set(e, t), this.latestValues[e] = t.get());
	}
	removeValue(e) {
		this.values.delete(e);
		let t = this.valueSubscriptions.get(e);
		t && (t(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
	}
	hasValue(e) {
		return this.values.has(e);
	}
	getValue(e, t) {
		if (this.props.values && this.props.values[e]) return this.props.values[e];
		let n = this.values.get(e);
		return n === void 0 && t !== void 0 && (n = Ai(t === null ? void 0 : t, { owner: this }), this.addValue(e, n)), n;
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (it(n) || ot(n)) ? n = parseFloat(n) : !Pa(n) && W.test(t) && (n = Sa(e, t)), this.setBaseTarget(e, $(n) ? n.get() : n)), $(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	getBaseTarget(e) {
		let { initial: t } = this.props, n;
		if (typeof t == "string" || typeof t == "object") {
			let r = Ki(this.props, t, this.presenceContext?.custom);
			r && (n = r[e]);
		}
		if (t && n !== void 0) return n;
		let r = this.getBaseTargetFromProps(this.props, e);
		return r !== void 0 && !$(r) ? r : this.initialValues[e] !== void 0 && n === void 0 ? void 0 : this.baseTarget[e];
	}
	on(e, t) {
		return this.events[e] || (this.events[e] = new ut()), this.events[e].add(t);
	}
	notify(e, ...t) {
		this.events[e] && this.events[e].notify(...t);
	}
	scheduleRenderMicrotask() {
		ka.render(this.render);
	}
}, Za = class extends Xa {
	constructor() {
		super(...arguments), this.KeyframeResolver = Ta;
	}
	sortInstanceNodePosition(e, t) {
		return e.compareDocumentPosition(t) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(e, t) {
		let n = e.style;
		return n ? n[t] : void 0;
	}
	removeValueFromRenderState(e, { vars: t, style: n }) {
		delete t[e], delete n[e];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: e } = this.props;
		$(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function Qa({ top: e, left: t, right: n, bottom: r }) {
	return {
		x: {
			min: t,
			max: n
		},
		y: {
			min: e,
			max: r
		}
	};
}
function $a(e, t) {
	if (!t) return e;
	let n = t({
		x: e.left,
		y: e.top
	}), r = t({
		x: e.right,
		y: e.bottom
	});
	return {
		top: n.y,
		left: n.x,
		bottom: r.y,
		right: r.x
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function eo(e, t) {
	return Qa($a(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var to = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, no = Y.length;
function ro(e, t, n) {
	let r = "", i = !0;
	for (let a = 0; a < no; a++) {
		let o = Y[a], s = e[o];
		if (s === void 0) continue;
		let c = !0;
		if (typeof s == "number") c = s === +!!o.startsWith("scale");
		else {
			let e = parseFloat(s);
			c = o.startsWith("scale") ? e === 1 : e === 0;
		}
		if (!c || n) {
			let e = Oa(s, va[o]);
			if (!c) {
				i = !1;
				let t = to[o] || o;
				r += `${t}(${e}) `;
			}
			n && (t[o] = e);
		}
	}
	let a = e.pathRotation;
	return a && (i = !1, r += `rotate(${Oa(a, va.pathRotation)}) `), r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function io(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, o = !1, s = !1;
	for (let e in t) {
		let n = t[e];
		if (X.has(e)) {
			o = !0;
			continue;
		}
		if (Jt(e)) {
			i[e] = n;
			continue;
		}
		{
			let t = Oa(n, va[e]);
			e.startsWith("origin") ? (s = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (o || n ? r.transform = ro(t, e.transform, n) : r.transform &&= "none"), s) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function ao(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function oo(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var so = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") {
		if (B.test(e)) e = parseFloat(e);
		else return e;
	}
	return `${oo(e, t.target.x)}% ${oo(e, t.target.y)}%`;
} }, co = { correct: (e, { treeScale: t, projectionDelta: n }) => {
	let r = e, i = W.parse(e);
	if (i.length > 5) return r;
	let a = W.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
	i[0 + o] /= s, i[1 + o] /= c;
	let l = G(s, c, .5);
	return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
} }, lo = {
	borderRadius: {
		...so,
		applyTo: [...Ea]
	},
	borderTopLeftRadius: so,
	borderTopRightRadius: so,
	borderBottomLeftRadius: so,
	borderBottomRightRadius: so,
	boxShadow: co
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function uo(e, { layout: t, layoutId: n }) {
	return X.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!lo[e] || e === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function fo(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) ($(r[t]) || i && $(i[t]) || uo(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function po(e) {
	return window.getComputedStyle(e);
}
var mo = class extends Za {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = ao;
	}
	mount(e) {
		k(!!e.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(e);
	}
	readValueFromInstance(e, t) {
		if (X.has(t)) return this.projection?.isProjecting ? Mr(t) : Pr(e, t);
		{
			let n = po(e), r = (Jt(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return eo(e, t);
	}
	build(e, t, n) {
		io(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return fo(e, t, n);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function ho(e, t) {
	return e in t;
}
var go = class extends Xa {
	constructor() {
		super(...arguments), this.type = "object";
	}
	readValueFromInstance(e, t) {
		if (ho(t, e)) {
			let n = e[t];
			if (typeof n == "string" || typeof n == "number") return n;
		}
	}
	getBaseTargetFromProps() {}
	removeValueFromRenderState(e, t) {
		delete t.output[e];
	}
	measureInstanceViewportBox() {
		return Ia();
	}
	build(e, t) {
		Object.assign(e.output, t);
	}
	renderInstance(e, { output: t }) {
		Object.assign(e, t);
	}
	sortInstanceNodePosition() {
		return 0;
	}
}, _o = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, vo = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function yo(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? _o : vo;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var bo = [
	"transform",
	"opacity",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function xo(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (io(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	for (let e of bo) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	(f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && yo(d, i, a, o, !1);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var So = /* @__PURE__ */ new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]), Co = (e) => typeof e == "string" && e.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function wo(e, t, n, r) {
	ao(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(So.has(n) ? n : ta(n), t.attrs[n]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function To(e, t, n) {
	let r = fo(e, t, n);
	for (let n in e) if ($(e[n]) || $(t[n])) {
		let t = Y.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var Eo = class extends Za {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Ia;
	}
	getBaseTargetFromProps(e, t) {
		return e[t];
	}
	readValueFromInstance(e, t) {
		if (X.has(t)) {
			let e = ba(t);
			return e && e.default || 0;
		}
		if (bo.includes(t)) {
			let n = getComputedStyle(e)[t];
			if (typeof n == "string" && n) return n.trim();
		}
		return t = So.has(t) ? t : ta(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return To(e, t, n);
	}
	build(e, t, n) {
		xo(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		wo(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = Co(e.tagName), super.mount(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function Do(e, t, n) {
	let r = $(e) ? e : Ai(e);
	return r.start(Bi("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function Oo(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function ko(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && Oo(t) ? Da(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function Ao(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function jo(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function Mo(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i.at > t && i.at < n && (tt(e, i), r--);
	}
}
function No(e, t, n, r, i, a) {
	Mo(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: G(i, a, r[o]),
		easing: /* @__PURE__ */ Nt(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function Po(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function Fo(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var Io = "easeInOut", Lo = 20;
function Ro(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), u = 0, d = 0, f = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, d);
			continue;
		}
		if (!Array.isArray(o)) {
			l.set(o.name, jo(d, o.at, u, l));
			continue;
		}
		let [p, m, h = {}] = o;
		h.at !== void 0 && (d = jo(d, h.at, u, l));
		let g = 0, _ = (e, n, r, o = 0, s = 0) => {
			let c = Vo(e), { delay: l = 0, times: u = mr(c), type: p = t.type || "keyframes", repeat: m, repeatType: h, repeatDelay: _ = 0, ...v } = n, { ease: y = t.ease || "easeOut", duration: b } = n, x = typeof l == "function" ? l(o, s) : l, S = c.length, C = ri(p) ? p : i?.[p || "keyframes"];
			if (S <= 2 && C) {
				let e = 100;
				if (S === 2 && Wo(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...v
				};
				b !== void 0 && (n.duration = /* @__PURE__ */ M(b));
				let r = Zn(n, e, C);
				y = r.ease, b = r.duration;
			}
			b ??= a;
			let w = d + x;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let T = u.length - c.length;
			if (T > 0 && pr(u, T), c.length === 1 && c.unshift(null), m && rt(m < Lo, `Sequence segments can't repeat ${m} times — ignoring repeat option. Use a value below ${Lo} or apply repeat at the sequence level instead.`), m && m < Lo) {
				let e = b > 0 ? _ / b : 0;
				b = Ao(b, m, _);
				let t = [...c], n = [...u];
				y = Array.isArray(y) ? [...y] : [y];
				let r = [...y], i = h === "reverse" || h === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), h === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ xt(e) : e)));
				for (let s = 0; s < m; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), y.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), y.push(e === 0 ? "linear" : /* @__PURE__ */ Nt(f, e - 1));
				}
				Po(u, m, e);
			}
			let ee = w + b;
			No(r, c, y, u, w, ee), g = Math.max(x + b, g), f = Math.max(ee, f);
		};
		if ($(p)) {
			let e = zo(p, s);
			_(m, h, Bo("default", e));
		} else {
			let e = ko(p, m, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				m = m, h = h;
				let r = e[n], i = zo(r, s);
				for (let e in m) _(m[e], Ho(h, e), Bo(e, i), n, t);
			}
		}
		u = d, d += g;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(Fo);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ lt(0, f, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(Io)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
				keyframes: {},
				transition: {}
			});
			let u = o.get(r);
			u.keyframes[i] = s;
			let { type: d, ...p } = t;
			u.transition[i] = {
				...p,
				duration: f,
				ease: l,
				times: c,
				...n
			};
		}
	}), o;
}
function zo(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function Bo(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function Vo(e) {
	return Array.isArray(e) ? e : [e];
}
function Ho(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var Uo = (e) => typeof e == "number", Wo = (e) => e.every(Uo);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function Go(e) {
	let t = {
		presenceContext: null,
		props: {},
		visualState: {
			renderState: {
				transform: {},
				transformOrigin: {},
				style: {},
				vars: {},
				attrs: {}
			},
			latestValues: {}
		}
	}, n = ja(e) && !Ma(e) ? new Eo(t) : new mo(t);
	n.mount(e), La.set(e, n);
}
function Ko(e) {
	let t = new go({
		presenceContext: null,
		props: {},
		visualState: {
			renderState: { output: {} },
			latestValues: {}
		}
	});
	t.mount(e), La.set(e, t);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function qo(e, t) {
	return $(e) || typeof e == "number" || typeof e == "string" && !Oo(t);
}
function Jo(e, t, n, r) {
	let i = [];
	if (qo(e, t)) i.push(Do(e, Oo(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = ko(e, t, r), o = a.length;
		k(!!o, "No valid elements provided.", "no-valid-elements");
		for (let e = 0; e < o; e++) {
			let r = a[e], s = r instanceof Element ? Go : Ko;
			La.has(r) || s(r);
			let c = La.get(r), l = { ...n };
			"delay" in l && typeof l.delay == "function" && (l.delay = l.delay(e, o)), i.push(...oa(c, {
				...t,
				transition: l
			}, {}));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function Yo(e, t, n) {
	let r = [];
	return Ro(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = Ai(0);
			return n.on("change", t), e.length === 1 ? [n, [0, 1]] : e.length === 2 ? [
				n,
				[0, 1],
				e[1]
			] : [
				n,
				e[1],
				e[2]
			];
		}
		return e;
	}), t, n, { spring: sr }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...Jo(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function Xo(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function Zo(e = {}) {
	let { scope: t, reduceMotion: n, skipAnimations: r } = e;
	function i(e, i, a) {
		let o = [], s, c = {};
		if (n !== void 0 && (c.reduceMotion = n), r !== void 0 && (c.skipAnimations = r), Xo(e)) {
			let { onComplete: n, ...r } = i || {};
			typeof n == "function" && (s = n), o = Yo(e, {
				...c,
				...r
			}, t);
		} else {
			let { onComplete: n, ...r } = a || {};
			typeof n == "function" && (s = n), o = Jo(e, i, {
				...c,
				...r
			}, t);
		}
		let l = new Ti(o);
		return s && l.finished.then(s), t && (t.animations.push(l), l.finished.then(() => {
			tt(t.animations, l);
		})), l;
	}
	return i;
}
var Qo = Zo(), $o = class {
	#e;
	#t = {};
	#n = 0;
	#r = 0;
	#i = (e) => e;
	#a = 0;
	#o = !1;
	#s;
	#c;
	#l;
	#u;
	#d;
	#f = !1;
	constructor(e) {
		this.#e = e;
	}
	to(e, t) {
		return this.#t = e, this.#n = Math.max(t, 0) / 1e3, this;
	}
	onUpdate(e) {
		return this.#s = e, this;
	}
	onComplete(e) {
		return this.#c = e, this;
	}
	easing(e) {
		return this.#i = e, this;
	}
	delay(e) {
		return this.#r = e / 1e3, this;
	}
	repeat(e) {
		return this.#a = e, this;
	}
	yoyo(e) {
		return this.#o = e, this;
	}
	chain(e) {
		return this.#l = e, this;
	}
	onStart(e) {
		return this.#u = e, this;
	}
	start() {
		if (this.#d) return this;
		this.#u?.();
		let e = {};
		for (let t of Object.keys(this.#t)) e[t] = this.#e[t];
		return this.#d = Qo(e, this.#t, {
			duration: this.#n,
			delay: this.#r,
			ease: this.#i,
			repeat: this.#a,
			...this.#o ? { repeatType: "reverse" } : {},
			reduceMotion: !1,
			onUpdate: () => {
				this.#f || (Object.assign(this.#e, e), this.#s?.(this.#e));
			},
			onComplete: () => this.#p()
		}), this;
	}
	#p() {
		this.#f || (Object.assign(this.#e, this.#t), this.#s?.(this.#e), this.#f = !0, this.#c?.(), this.#l?.start());
	}
	kill() {
		let e = this;
		for (; e;) e.#d?.stop(), e.#f = !0, e = e.#l;
	}
	pause() {
		return this.#d?.pause(), this;
	}
	resume() {
		return this.#d?.play(), this;
	}
};
//#endregion
//#region src/ts/ScriptMng.ts
function es(e, t) {
	let n = e?.match(RegExp(`(?:^|;)\\s*${t}\\s*:\\s*([\\d.]+)px`, "i"));
	return n ? Number(n[1]) : void 0;
}
var ts = class t {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#m = new Ke(e, ""), this.#C = new je((t, n) => e.cfg.searchPath(t, n), (t, n) => e.fetch(t, n), (t, n) => e.dec(t, n), (t) => e.decAB(t), e.crypto), this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#Ke(e), this.#t.log = (e) => this.#Je(e, this.#r?.fn ?? "", this.#r?.lineNum ?? NaN);
	}
	destroy() {
		this.cancelAuto(), clearTimeout(this.#I), clearTimeout(this.#U), clearTimeout(this.#Y?.timer);
		for (let { tw: e } of Object.values(this.#Q)) e.kill();
		for (let { tw: e } of Object.values(this.#me)) e.kill();
		this.#w.stopAll(), this.#e.remove();
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
			let e = this.#r = new Ae(t);
			this.#s(e), e.defSetTrigger("sys:sn.sound.global_volume", (e) => {
				this.#w.setGlobalVol(Number(e)), this.#E();
			}), e.defSetTriggerSoundVol((t, n) => {
				let r = Number(e.getVal(`save:const.sn.sound.${t}.volume`) ?? 1);
				this.#w.setVol(t, r * Number(n));
			}), e.defSetTrigger("sys:sn.sound.movie_volume", () => this.#E()), e.defSetTrigger("save:sn.userFnTail", (e) => {
				let t = String(e);
				if (t.includes("@")) throw "この変数では文字「@」は禁止です";
				this.sys.cfg.userFnTail = t;
			}), await this.#g(e), Ye(this.sys.cfg);
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
				let t = e.cls === "grp" ? m(e.src) : void 0, n = e.left ?? 0, r = e.top ?? 0;
				return {
					visible: e.visible !== !1,
					alpha: e.alpha ?? 1,
					x: n,
					y: r,
					left: n,
					top: r,
					width: e.width ?? (e.cls === "grp" ? t?.w ?? 0 : es(e.style, "width") ?? i.stageW * .7),
					height: e.height ?? (e.cls === "grp" ? t?.h ?? 0 : es(e.style, "height") ?? i.stageH)
				};
			}, r = {};
			for (let i of e) r[i.nm] = {
				fore: n(i),
				back: n(t.find((e) => e.nm === i.nm))
			};
			return JSON.stringify(r);
		});
	}
	#c = new u(() => this.sys.cfg.oCfg.log.max_len);
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
		this.#m = new Ke(this.sys, this.sys.cfg.oCfg.save_ns);
		try {
			this.#h = await this.#m.load();
		} catch (e) {
			this.myTrace(`セーブデータが壊れています。初期状態で起動します ${String(e)}`, "E"), this.#h = !0;
		}
		this.#h || (e.setSys(this.#m.data.sys), e.setKidoku(this.#m.data.kidoku), this.#w.setGlobalVol(Number(e.getVal("sys:sn.sound.global_volume") ?? 1)), this.#E()), e.setValNochk("sys:const.sn.cfg.ns", this.sys.cfg.oCfg.save_ns), this.#_();
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
		return this.#n[e] ??= new re(e, await this.#Ge(e), this.#S());
	}
	#x;
	#S() {
		if (this.#x) return this.#x;
		let e = this.#x = new S(this.sys.cfg);
		return e.setEscape(this.sys.cfg.oCfg.init.escape), ge(this.sys.cfg.oCfg.init.escape), e;
	}
	go() {}
	navigateTo(e) {
		globalThis.open(e, "_blank");
	}
	jumpToLabelAndGo(e, t, n = "", r) {
		this.#r?.setValNochk("tmp:sn.eventArg", r ?? ""), this.#r?.setValNochk("tmp:sn.eventLabel", e), this.#O(e, t, n).catch(this.#i);
	}
	#C;
	attachFrameBox(e) {
		this.#C.attachBox(e);
	}
	#w = new $e((e, t) => this.myTrace(e, t), (e, t) => this.sys.fetch(e, t), (e) => this.sys.decAB(e));
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
			end_ms: Xe,
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
		return n ? n.url ? (this.navigateTo(n.url), !0) : (this.jumpToLabelAndGo(n.label, n.call, n.fn, n.arg), !0) : !1;
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
			this.#k(!0);
		}
	}
	#k(e = !1) {
		if (!this.#A) {
			if (this.#R) {
				this.#R.canskip && this.#V();
				return;
			}
			if (this.#Y) {
				this.#Y.canskip && this.#Z();
				return;
			}
			if (this.#$ && !e) {
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
		let n = this.$fncs.getLaySty(e.nm, e.page), { from: r, aTo: i, aPrp: a } = t.#ne(e, (e) => {
			let t = n[e] ?? ce[e];
			if (t === void 0) throw `[tsy] ${e} は [lay ${e}=…] で寸法を明示したレイヤにしか使えません`;
			return t;
		});
		this.#re(e, r, i, () => {
			let t = {};
			for (let e of a) Object.assign(t, { [e]: r[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page,
				sty: t
			});
		}, e.backlay ? () => {
			let t = {};
			for (let e of a) Object.assign(t, { [e]: r[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page === "fore" ? "back" : "fore",
				sty: t
			});
		} : void 0);
	}
	#te(e) {
		let n = this.#C.getSty(e.id), { from: r, aTo: i, aPrp: a } = t.#ne(e, (e) => n[e] ?? 0);
		this.#re(e, r, i, () => {
			let t = {};
			for (let e of a) Object.assign(t, { [e]: r[e] });
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
		let s = he(e.ease), c = n.map((n) => {
			let i = new $o(t).to(n, e.msec).delay(e.delay).easing(s).repeat(e.repeat).yoyo(e.yoyo).onUpdate(r);
			return i.onStart(() => {
				this.#Q[e.tw_nm] = {
					end: o,
					tw: i
				};
			}), i;
		});
		for (let e = 0; e < c.length; ++e) {
			let t = c[e], n = c[e + 1];
			n && t.chain(n);
		}
		let l = c[0];
		if (c[c.length - 1].onComplete(() => {
			o(), this.#ie(e.tw_nm);
		}), this.#Q[e.tw_nm] = {
			end: o,
			tw: l
		}, !e.chain) {
			l.start();
			return;
		}
		let u = this.#Q[e.chain];
		if (!u) throw `${e.chain}は存在しない・または終了したトゥイーンです`;
		u.next = () => l.start();
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
		n && (this.#r?.setValNochk(`tmp:const.sn.sound.${e.buf}.playing`, !0), await this.#w.play(e.buf, n, e, (e) => {
			this.#r?.setValNochk(`tmp:const.sn.sound.${e}.playing`, !1), e === "VOICE" && this.#ce();
		}));
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
		let r = new $o(n.gain).to({ value: e.volume }, e.msec).delay(e.delay).onComplete(() => {
			t(), this.#ge(e.buf);
		}).start();
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
		this.#xe = {
			fn: e,
			canskip: t,
			stop: n
		};
		let a = () => {
			if (this.#xe?.fn !== e) return;
			let t = this.#Se(e);
			if (!t || t.loop || t.ended) {
				this.#xe = void 0, t?.ended && n && this.#Te(t), this.#k();
				return;
			}
			requestAnimationFrame(a);
		};
		requestAnimationFrame(a);
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
				t.callToScript(n, e.label, !1);
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
		let n = e.fn.startsWith(h), r = n ? e.fn : Pe(e.fn || "snapshot"), a = Ne(r), { stageW: o, stageH: s } = i, c = e.width || o, l = e.height || s, u = (e.aLayNm === null && e.page === "fore" && e.b_color === void 0 ? await this.sys.capturePage(this.#Pe(t), c, l, a) : "") || await Ie({
			el: t,
			sw: o,
			sh: s,
			width: c,
			height: l,
			bgColor: e.b_color === void 0 ? "black" : Fe(e.b_color),
			page: e.page,
			aLayNm: e.aLayNm,
			mime: a,
			smoothing: e.smoothing
		});
		n ? this.#m.putFile(r, u) : He(r, u);
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
				let t = this.#Re("lay", e.fn), n = t.endsWith(".json"), r = /\.(?:mp4|webm)$/i.test(t), i = e.aFace?.map((e) => {
					let t = this.#Re("add_face", e.fn);
					return {
						...e,
						src: t,
						isSheet: t.endsWith(".json")
					};
				});
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
					let t = ye(e.str);
					for (let e of t) e.pic && (e.src = this.#Re("graph", e.pic));
					this.$fncs.chgStr({
						nm: e.nm,
						page: e.page,
						str: be(t),
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
					...e.arg === void 0 ? {} : { arg: e.arg },
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
			case "pauseTsy": {
				let t = this.#Q[e.tw_nm]?.tw;
				e.paused ? t?.pause() : t?.resume();
				break;
			}
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
				!e.del && t[0] && a.add(t[0]);
				break;
			}
			case "setFocus":
				switch (e.mode) {
					case "add":
						for (let t of this.#C.resolveDom(e.rawKey, e.needErr ?? !0)) a.add(t);
						break;
					case "del":
						for (let t of this.#C.resolveDom(e.rawKey, e.needErr ?? !0)) a.remove(t);
						break;
					case "null":
						a.blur();
						break;
					case "next":
						a.next();
						break;
					case "prev": a.prev();
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
				if (this.#l = void 0, t && this.#c.push(t.fn, t.idx, t.mark, t.clearOnResume), this.#d = !1, this.#f(), e.kind === "l" || e.kind === "p" || e.kind === "waitclick") {
					let t = e.kind === "waitclick" ? void 0 : this.#Le(e.kind);
					this.$fncs.setWait({
						nm: e.nm,
						kind: e.kind,
						...t ? { src: t } : {},
						...e.mark
					});
				}
				this.#A = e.kind === "s", e.resume ? this.#P(e.resume.mode, e.resume.msec) : this.$fncs.setSkipping(!1), this.#_(), this.$fncs.setBackAlpha(Number(this.#r?.getVal("sys:TextLayer.Back.Alpha") ?? 1)), this.$fncs.setBtnFont(String(this.#r?.getVal("tmp:sn.button.fontFamily") ?? "") || o), this.#r && this.$fncs.setChWait(this.#r.chWait);
				break;
			}
		}
	}
	async #Ge(e) {
		try {
			let t = this.sys.cfg.searchPath(e, g.SCRIPT), n = "";
			try {
				n = this.sys.cfg.searchPath(e + "@", g.SCRIPT);
			} catch {}
			if (!n) {
				let e = await this.sys.fetch(t);
				if (!e.ok) throw Error(e.statusText);
				return await this.sys.dec(t, await e.text());
			}
			let [r, i] = await Promise.all([this.sys.fetch(t), this.sys.fetch(n)]);
			if (!r.ok) throw Error(r.statusText);
			if (!i.ok) throw Error(i.statusText);
			let [a, o] = await Promise.all([this.sys.dec(t, await r.text()), this.sys.dec(n, await i.text())]), s = a.split("\n"), c = o.split("\n");
			for (let e = 0; e < c.length && e < s.length; ++e) c[e] ||= s[e] ?? "";
			return c.join("\n");
		} catch (t) {
			throw this.myTrace(`[load] スクリプト読込に失敗しました fn:${e} ${String(t)}`, "ET"), t;
		}
	}
	#Ke(e) {
		return this.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
	}
	#qe = !0;
	#Je(t, n, r) {
		let a = "";
		return this.#qe && (this.#qe = !1, a = `== ${i.plat_desc} ==\n`), this.sys.appendFile(this.sys.path_downloads + "log.txt", `${a}--- ${e("-", "_", "")} [fn:${n} line:${String(r)}] prj:${this.sys.arg.cur}\n${t.text || `(text is ${String(t.text)})`}\n`), !1;
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
export { ts as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map