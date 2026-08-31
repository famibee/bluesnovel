import { a as e, i as t, o as n, s as r, t as i } from "./CmnLib.js";
import { C as a, c as o, g as s, t as c } from "./PageLog.js";
import { n as l } from "./ConfigBase.js";
import { r as u } from "./LayCls.js";
import { n as d, r as f } from "./Fx.js";
//#region src/sn/CmnInterface.ts
function p() {
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
var m = { save: "game" }, h = class e {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = /* @__PURE__ */ new Set();
	#r = Object.create(null);
	#i;
	constructor() {
		this.#a();
	}
	#a() {
		for (let [e, t] of Object.entries(p())) this.#e[`sys.${e}`] = typeof t == "function" ? 1 : t;
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
			ns: m[r] ?? r,
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
	static castTo(t, i) {
		switch (i) {
			case "": return t;
			case "num": return e.#l(t);
			case "int": return n(e.#l(t));
			case "uint": return r(e.#l(t));
			case "bool": return t != null && String(t) !== "false" && !!String(t);
			case "str": return t == null ? t : String(t);
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
}, g = /\[[^\]]+\]/g, _ = {
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
}, v = class {
	val;
	#e;
	#t;
	#n = /^(?:(?:tmp|sys|game|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*/;
	constructor(e, t = "\\") {
		this.val = e, this.#e = t, this.#t = RegExp(`^(?:"(?:\\${t}["'#\\n]|[^"])*"|'(?:\\${t}["'#\\n]|[^'])*'|\\#(?:\\${t}["'#\\n]|[^#])*\\#)`);
	}
	#r(e) {
		let t = [], r = 0;
		for (; r < e.length;) {
			let i = e.charCodeAt(r);
			if (i === 32 || i === 9 || i === 10 || i === 13) {
				++r;
				continue;
			}
			let a = e.slice(r), o;
			if ((o = /^0x[0-9a-fA-F]+/.exec(a)) || (o = /^(0|[1-9][0-9]*)\.[0-9]+/.exec(a))) {
				t.push({
					t: "NUM",
					v: ["!num!", Number(o[0])]
				}), r += o[0].length;
				continue;
			}
			if (o = /^(0|[1-9][0-9]*)/.exec(a)) {
				t.push({
					t: "NUM",
					v: ["!num!", n(o[0])]
				}), r += o[0].length;
				continue;
			}
			if (a.startsWith("null")) {
				t.push({
					t: "NULL",
					v: ["!str!", null]
				}), r += 4;
				continue;
			}
			if (o = /^(true|false)/.exec(a)) {
				t.push({
					t: "BOOL",
					v: ["!bool!", o[0] === "true"]
				}), r += o[0].length;
				continue;
			}
			if (o = this.#t.exec(a)) {
				t.push({
					t: "STR",
					v: ["!str!", o[0].slice(1, -1).replaceAll(this.#e, "")]
				}), r += o[0].length;
				continue;
			}
			let s = a.slice(0, 3);
			if (s === ">>>" || s === "===" || s === "!==") {
				t.push({ t: s }), r += 3;
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
				t.push({ t: c }), r += 2;
				continue;
			}
			let l = a.charAt(0);
			if ("()!~*/%+-<>&^|:?¥".includes(l)) {
				t.push({ t: l }), ++r;
				continue;
			}
			let u = /^[A-Za-z_][A-Za-z0-9_]*/.exec(a);
			if (u && a.charAt(u[0].length) === "(") {
				t.push({
					t: "FUNC",
					v: u[0]
				}), r += u[0].length;
				continue;
			}
			if (o = this.#n.exec(a)) {
				let e = o[0];
				a.slice(e.length, e.length + 4) === "@str" && (e += "@str"), t.push({
					t: "VAR",
					v: e
				}), r += e.length;
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
				let i = r(), a = i && _[i.t];
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
		let t = e.replaceAll(g, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
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
		int: (e) => n(this.#c(e.shift())),
		parseInt: (e) => n(this.#s.Number(e)),
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
};
//#endregion
//#region src/sn/AnalyzeTagArg.ts
function y(e, t, n = 0, r = 0, i = 0) {
	let a = e.slice(0, t).split("\n"), o = a.length;
	return {
		ln: r + o - 1,
		ch: o < 2 ? i + 1 + n + t : a.at(-1)?.length ?? 0
	};
}
var b = class {
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
					let e = d.length - 1, { ch: s } = y(a, o + e, t, n, r);
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
			let { ln: f, ch: p } = y(a, o, t, n, r), { ln: m, ch: h } = y(a, o + s.lastIndexOf(l ?? u) - +!l, t, n, r);
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
}, x = /(?<name>[^\s;\]]+)/;
function S(e) {
	let t = x.exec(e.slice(1, -1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	let n = t.name;
	return [n, e.slice(1 + n.length, -1)];
}
function C(e) {
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
var w = class {
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
	#c(t) {
		if (this.cfg) {
			for (let n = t.len - 1; n >= 0; --n) {
				let r = t.aToken[n];
				if (!this.#o.test(r)) continue;
				let [i, a] = S(r);
				this.#l.parse(a);
				let o = this.#l.hPrm.fn;
				if (!o) continue;
				let { val: s } = o;
				if (!s.endsWith("*")) continue;
				t.aToken.splice(n, 1, "	", "; " + r), t.aLNum.splice(n, 1, NaN, NaN);
				let c = i === "loadplugin" ? l.CSS : l.SN, u = this.cfg.matchPath("^" + s.slice(0, -1) + ".*", c);
				for (let i of u) {
					let a = r.replace(this.#s, "fn=" + decodeURIComponent(e(i[c])));
					t.aToken.splice(n, 0, a), t.aLNum.splice(n, 0, NaN);
				}
			}
			t.len = t.aToken.length;
		}
	}
	#l = new b();
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
}, T = class e {
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
	constructor(e, t, n = new w()) {
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
}, E = class e {
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
}, D = class e {
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
}, O = [
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
], k = [
	"alpha",
	"x",
	"y",
	"width",
	"height",
	"scale_x",
	"scale_y",
	"rotate"
], A = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function j(e, t, n = O) {
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
function N(e, t, n = O) {
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
function P(e) {
	return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
}
var F = {
	"Back.In": (e) => e === 1 ? 1 : e * e * (2.70158 * e - 1.70158),
	"Back.InOut": (e) => {
		let t = 2.5949095;
		return (e *= 2) < 1 ? .5 * (e * e * (3.5949095 * e - t)) : .5 * ((e -= 2) * e * (3.5949095 * e + t) + 2);
	},
	"Back.Out": (e) => e === 0 ? 0 : --e * e * (2.70158 * e + 1.70158) + 1,
	"Bounce.In": (e) => 1 - P(1 - e),
	"Bounce.InOut": (e) => e < .5 ? (1 - P(1 - e * 2)) * .5 : P(e * 2 - 1) * .5 + .5,
	"Bounce.Out": (e) => P(e),
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
function I(e) {
	if (!e) return "Linear.None";
	if (!F[e]) throw `異常なease指定です：${e}`;
	return e;
}
function L(e) {
	return F[I(e)];
}
function R(e, t) {
	if (t.id) return `frm\n${t.id}`;
	let n = t.name ?? t.layer ?? "";
	if (!n) throw `[${e}] トゥイーンが指定されていません（name／layerのどちらも無し）`;
	return n;
}
//#endregion
//#region src/ts/Txt.ts
function z(e) {
	E.setEscape(e);
}
z("");
var B = [
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
function V(e) {
	if (e === void 0) return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function H(e) {
	let t = e.indexOf("｜");
	if (t < 1) return;
	let n = e.slice(0, t);
	if (!B.includes(n)) return;
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
function U(e) {
	let t = [], n = "", r = "", i, a, o, s, c, l, u = [], d = (e, u, d, f) => {
		let p = n + (c?.style ?? "") + (d?.style ?? ""), m = r + (c?.r_style ?? "") + (d?.r_style ?? ""), h = d?.ch_in_style ?? c?.ch_in_style ?? i, g = d?.ch_out_style ?? c?.ch_out_style ?? a, _ = V(d?.wait) ?? V(c?.wait) ?? o, { ra: v, ruby: y } = u ? q(u) : {
			ra: void 0,
			ruby: void 0
		}, b = v ?? s;
		t.push({
			c: e,
			...y ? { r: y } : {},
			...b ? { ra: b } : {},
			...p ? { s: p } : {},
			...m ? { rs: m } : {},
			...f ? { tcy: f } : {},
			...l ? { lnk: l } : {},
			...h === void 0 ? {} : { cis: h },
			...g === void 0 ? {} : { cos: g },
			..._ === void 0 ? {} : { w: _ }
		});
	}, f = new E();
	return f.init((e, f) => {
		let p = f ? H(f) : void 0;
		if (!p) {
			d(e, f);
			return;
		}
		let { o: m } = p;
		switch (p.cmd) {
			case "span":
				n = m.style ?? "", r = m.r_style ?? "", i = m.ch_in_style, a = m.ch_out_style, o = V(m.wait), m.r_align && (s = m.r_align);
				break;
			case "add":
				c = m;
				break;
			case "add_close":
				c = void 0;
				break;
			case "link":
				u.push({
					sty: n,
					rSty: r
				}), n += m.style ?? "", r += m.r_style ?? "", l = {
					label: m.label ?? "",
					fn: m.fn ?? "",
					call: m.call === "true",
					arg: m.arg ?? "",
					...m.url ? { url: m.url } : {},
					...m.onenter ? { onenter: m.onenter } : {},
					...m.onleave ? { onleave: m.onleave } : {},
					...m.style_hover ? { sh: m.style_hover } : {},
					...m.style_clicked ? { sc: m.style_clicked } : {},
					...m.r_style_hover ?? m.style_hover ? { rsh: m.r_style_hover ?? m.style_hover } : {},
					...m.r_style_clicked ?? m.r_style ? { rsc: m.r_style_clicked ?? m.r_style } : {},
					...m.hint ? { hint: m.hint } : {},
					...m.hint_style ? { hs: m.hint_style } : {},
					...m.hint_opt ? { ho: m.hint_opt } : {},
					...m.clickse ? {
						clickse: m.clickse,
						clicksebuf: m.clicksebuf
					} : {},
					...m.enterse ? {
						enterse: m.enterse,
						entersebuf: m.entersebuf
					} : {},
					...m.leavese ? {
						leavese: m.leavese,
						leavesebuf: m.leavesebuf
					} : {}
				};
				break;
			case "endlink": {
				let e = u.pop();
				e && (n = e.sty, r = e.rSty), l = void 0;
				break;
			}
			case "tcy":
				d(m.t ?? "", m.r, m, !0);
				break;
			case "grp": m.pic && (d("　", m.r, m), Object.assign(t.at(-1), {
				pic: m.pic,
				...V(m.width) === void 0 ? {} : { gw: V(m.width) },
				...V(m.height) === void 0 ? {} : { gh: V(m.height) },
				...V(m.x) === void 0 ? {} : { gx: V(m.x) },
				...V(m.y) === void 0 ? {} : { gy: V(m.y) }
			}));
		}
	}), f.putTxt(e), t;
}
function W(e) {
	return e.map((e) => e.c).join("");
}
function G(e) {
	return W(U(e));
}
var K = [
	"start",
	"left",
	"center",
	"right",
	"justify",
	"121",
	"even",
	"1ruby"
];
function q(e) {
	let t = e.indexOf("｜");
	if (t > 0) {
		let n = e.slice(0, t);
		if (K.includes(n)) return {
			ra: n,
			ruby: e.slice(t + 1)
		};
	}
	return { ruby: e };
}
//#endregion
//#region src/ts/Log.ts
var J = 64, Y = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), X = (e) => Y(e).replaceAll("'", "&#39;");
function Z(e) {
	return Q(U(e));
}
function Q(e) {
	let t = "";
	for (let n of e) {
		if (n.c === "\n") {
			t += "<br/>";
			continue;
		}
		let e = Y(n.c), r = n.r ? `<ruby>${e}<rt${n.rs ? ` style='${X(n.rs)}'` : ""}>${Y(n.r)}</rt></ruby>` : e, i = (n.s ?? "") + (n.tcy ? "text-combine-upright: all;" : "");
		t += i ? `<span style='${X(i)}'>${r}</span>` : r;
	}
	return t;
}
var ee = class {
	maxLen;
	#e = [];
	#t = "";
	#n = {};
	constructor(e = () => J) {
		this.maxLen = e;
	}
	add(e) {
		this.#t += e;
	}
	setAttr(e) {
		this.#n = e;
	}
	pagebreak() {
		let e = Z(this.#t);
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
			text: Z(this.#t)
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
}, $ = /* @__PURE__ */ new Map();
function te(e, t) {
	if ($.has(e)) throw `すでに定義済みのタグ[${e}]です`;
	$.set(e, t);
}
function ne(e) {
	return $.get(e);
}
function re(e) {
	return $.has(e);
}
function ie() {
	return [...$.keys()];
}
//#endregion
//#region src/ts/ScriptEngine.ts
var ae = class e {
	static #e = new b();
	static parseTag(t) {
		let [n, r] = S(t);
		e.#e.parse(r);
		let i = {};
		for (let [t, n] of Object.entries(e.#e.hPrm)) i[t] = n.val;
		return {
			name: n,
			args: i
		};
	}
	#t(t) {
		let [n, r] = S(t), i = e.#e;
		i.parse(r);
		let a = i.hPrm, o = a.cond?.val;
		if (o !== void 0) {
			if (!o || o.startsWith("&")) throw "属性condは「&」が不要です";
			let e = this.#j.parse(o), t = String(e);
			if (!e || t === "null" || t === "undefined" || t === "false") return;
		}
		let s = this.#L.at(-1), c = Object.create(null);
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
			if (r = this.#j.getValAmpersand(r), r !== "undefined") {
				c[e] = r;
				continue;
			}
			n !== void 0 && (r = this.#j.getValAmpersand(n), r !== "undefined" && (c[e] = r));
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
		let a = Number(this.#A.get(n === "left" ? "tmp:const.sn.config.window.width" : "tmp:const.sn.config.window.height"));
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
	#T = Object.create(null);
	#E = Object.create(null);
	#D(e, t) {
		this.#E[e] = t, this.#A.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#E));
	}
	#O(e) {
		e in this.#E && (delete this.#E[e], this.#A.setNochk(`save:const.sn.sound.${e}.fn`, "")), this.#A.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#E));
	}
	#k = 1;
	resetVolMulTalking() {
		this.#k = 1;
	}
	#A = new h();
	#j = new v(this.#A);
	#M() {
		return !!this.#A.get("mp:const.sn.macro");
	}
	#N = new ee(() => {
		let e = Number(this.#A.get("tmp:const.sn.config.log.max_len"));
		return Number.isFinite(e) && e > 0 ? e : 64;
	});
	get #P() {
		return this.#A.get("game:sn.doRecLog") === !0;
	}
	get chWait() {
		let e = this.#A.get("tmp:const.sn.isKidoku") === !0;
		if (this.#A.get(e ? "sys:sn.tagCh.doWait_Kidoku" : "sys:sn.tagCh.doWait") === !1) return 0;
		let t = Number(this.#A.get(e ? "sys:sn.tagCh.msecWait_Kidoku" : "sys:sn.tagCh.msecWait"));
		return Number.isFinite(t) && t >= 0 ? t : 10;
	}
	#F = {
		in: /* @__PURE__ */ new Set(["default"]),
		out: /* @__PURE__ */ new Set(["default"])
	};
	#I = [];
	#L = [];
	#R = Object.create(null);
	#z = Object.create(null);
	#B = Object.create(null);
	#V = !1;
	#H = Object.create(null);
	static REG_NG4MAC_NM = /["'#;\\\]　]+/;
	static RESERVED_TAGS = /* @__PURE__ */ new Set(/* @__PURE__ */ "add_lay.current.add_face.lay.clear_lay.trans.wt.finish_trans.set_cancel_skip.let.let_ml.endlet_ml.let_abs.let_char_at.let_index_of.let_length.let_replace.let_round.let_search.let_substr.tsy.tsy_frame.wait_tsy.stop_tsy.pause_tsy.resume_tsy.quake.stop_quake.wq.title.toggle_full_screen.dump_lay.dump_val.dump_stack.pop_stack.clear_text.rec_ch.rec_r.reset_rec.ch_in_style.ch_out_style.autowc.navigate_to.loadplugin.snapshot.close.update_check.window.record_place.save.load.reload_script.copybookmark.erasebookmark.export.import.add_frame.frame.set_frame.let_frame.set_focus.add_filter.clear_filter.enable_filter.def_fx.add_fx.clear_fx.wait_fx.pause_fx.resume_fx.if.elsif.else.endif.r.er.trace.log.jump.call.return.macro.endmacro.char2macro.bracket2macro.button.event.clear_event.enable_event.clearvar.clearsysvar.page.wait.waitclick.l.p.s.ch.endlink.graph.link.ruby2.span.tcy.fadebgm.fadeoutbgm.fadeoutse.fadese.playbgm.playse.stop_allse.stopbgm.stopfadese.stopse.volume.wb.wf.wl.ws.xchgbuf.wv".split("."));
	#U() {
		let t = Object.create(null);
		for (let n of e.RESERVED_TAGS) t[n] = !0;
		for (let e of ie()) t[e] = !0;
		for (let e in this.#H) t[e] = !0;
		return t;
	}
	static registerPlgTag(t, n) {
		if (e.RESERVED_TAGS.has(t)) throw `[${t}]は既存タグ名のため、プラグインタグとして登録できません`;
		te(t, n);
	}
	constructor(e, n = "") {
		this.#g = e instanceof T ? e : new T(e, n), this.#A.defBuiltin("const.sn.scriptFn", () => this.fn), this.#A.defBuiltin("const.sn.isKidoku", () => this.#V), this.#A.defBuiltin("const.sn.displayState", () => this.#W), this.#A.defBuiltin("const.Date.getDateStr", () => t()), this.#A.defBuiltin("const.Date.getTime", () => (/* @__PURE__ */ new Date()).getTime()), this.#A.defBuiltin("const.sn.last_page_plain_text", () => G(this.#y[this.#v] ?? "")), this.#A.defBuiltin("const.sn.last_page_text", () => this.#y[this.#v] ?? ""), this.#A.defBuiltin("const.sn.log.json", () => this.#N.json()), this.#A.defBuiltin("const.sn.key.alternate", () => this.#G.Alt === !0), this.#A.defBuiltin("const.sn.key.command", () => this.#G.Meta === !0), this.#A.defBuiltin("const.sn.key.control", () => this.#G.Control === !0), this.#A.defBuiltin("const.sn.key.end", () => this.#G.End === !0), this.#A.defBuiltin("const.sn.key.escape", () => this.#G.Escape === !0), this.#A.defBuiltin("const.sn.key.back", () => !1), this.#A.defBuiltin("const.sn.Math.PI", () => Math.PI), this.#A.defBuiltin("const.sn.aIfStk.length", () => this.#I.length), this.#A.defBuiltin("const.sn.vctCallStk.length", () => this.#L.length), this.#A.setNochk("save:const.sn.mesLayer", this.#v);
	}
	#W = !1;
	setFullScr(e) {
		this.#W = e;
	}
	#G = Object.create(null);
	setKeyDown(e, t) {
		this.#G[e] = t;
	}
	clearKeyDown() {
		this.#G = Object.create(null);
	}
	switchScript(e, t = "", n = 0) {
		if (this.#g = e, !t) {
			this.#_ = n;
			return;
		}
		let r = e.label2idx(t, n, this.#M());
		if (r === void 0) throw `ラベル【${t}】がスクリプト【${e.fn}】に見つかりません`;
		this.#_ = r;
	}
	getVal(e) {
		return this.#A.get(e);
	}
	setValNochk(e, t) {
		this.#A.setNochk(e, t);
	}
	defSetTrigger(e, t) {
		this.#A.defSetTrigger(e, t);
	}
	defSetTriggerSoundVol(e) {
		this.#A.defSetTriggerSoundVol(e);
	}
	defBuiltin(e, t) {
		this.#A.defBuiltin(e, t);
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
			if (s && !s.startsWith("&") && !s.startsWith("%") && t.push(s), o.face) for (let e of o.face.split(",")) e.startsWith("&") || e.startsWith("%") || t.push(n.get(e) ?? e);
		}
		return t;
	}
	jumpToLabel(e) {
		let t = this.#g.label2idx(e, this.#_, this.#M());
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#_ = t;
	}
	callToLabel(e, t = !0) {
		let n = this.#g.label2idx(e, this.#_, this.#M());
		if (n === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#$(--this.#_), t && (this.#S = !1), this.#_ = n;
	}
	callToScript(e, t = "", n = !0) {
		this.#$(--this.#_), n && (this.#S = !1), this.switchScript(e, t);
	}
	nowScrIdx() {
		let e = this.#L[0];
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
		this.#A.setNochk("save:const.sn.scriptFn", e), this.#A.setNochk("save:const.sn.scriptIdx", t);
	}
	nowMarkPart() {
		return this.#A.setNochk("save:const.sn.sLog", this.#N.json()), {
			hSave: this.#A.cloneNs("game"),
			aIfStk: this.#I.slice(this.#L.length),
			hTxt: { ...this.#y },
			hTxtBk: { ...this.#b }
		};
	}
	restoreMarkPart(e) {
		this.#A.setNs("game", e.hSave), this.#y = { ...e.hTxt }, this.#b = { ...e.hTxtBk }, this.#v = String(this.#A.get("save:const.sn.mesLayer") ?? this.#v), this.#N.playback(String(this.#A.get("save:const.sn.sLog") ?? "[]")), this.#A.setMp({}), this.#I.length = 0, this.#I.push(...e.aIfStk), this.#L.length = 0, this.clearEvent();
		for (let e of Object.keys(this.#E)) delete this.#E[e];
		try {
			let e = JSON.parse(String(this.#A.get("save:const.sn.loopPlaying", "{}")));
			Object.assign(this.#E, e);
		} catch {}
	}
	cloneSys() {
		return this.#A.cloneNs("sys");
	}
	setSys(e) {
		this.#A.setNs("sys", e);
	}
	transDone(e) {
		for (let t of Object.keys(this.#y)) e && !e.includes(t) || (this.#y[t] = this.#b[t] ?? "");
	}
	get isKidoku() {
		return this.#V;
	}
	#K() {
		let e = this.#B[this.fn] ??= new D();
		if (this.#L.length > 0) {
			e.record(this.#_);
			return;
		}
		this.#V = e.search(this.#_), !this.#V && e.record(this.#_);
	}
	#q() {
		this.#B[this.fn]?.erase(this.#_), this.#V = !1;
	}
	getKidoku() {
		let e = {};
		for (let [t, n] of Object.entries(this.#B)) e[t] = n.val();
		return e;
	}
	setKidoku(e) {
		for (let e in this.#B) delete this.#B[e];
		this.#V = !1;
		for (let [t, n] of Object.entries(e)) this.#B[t] = D.from(n);
	}
	clearKidoku() {
		for (let e of Object.values(this.#B)) e.clear();
		this.#V = !1;
	}
	get autoEnabled() {
		return this.#J("sn.auto.enabled");
	}
	get skipEnabled() {
		return this.#J("sn.skip.enabled");
	}
	get skipAll() {
		return this.#J("sn.skip.all");
	}
	#J(e) {
		return this.#A.get(`tmp:${e}`) === !0;
	}
	get tagLEnabled() {
		return this.#A.get("tmp:sn.tagL.enabled") !== !1;
	}
	cancelAutoSkip() {
		this.#A.set("tmp:sn.skip.enabled", !1), this.#A.set("tmp:sn.skip.all", !1), this.#A.set("tmp:sn.auto.enabled", !1), this.tagLEnabled || this.#A.set("tmp:sn.tagL.enabled", !0);
	}
	get isNextKidoku() {
		let e = this.fn, t = this.#_, n = this.#g.len, r = this.#L.at(-1);
		return r && (e = r.fn, t = r.returnIdx, n = r.scr.len), t >= n ? !1 : this.#B[e]?.search(t) ?? !1;
	}
	#Y(e) {
		if (e === "s" || e === "waitclick") {
			this.cancelAutoSkip();
			return;
		}
		if (this.autoEnabled) return {
			mode: "auto",
			msec: this.#Z(e === "p")
		};
		if (this.skipEnabled) {
			if (!this.skipAll && !this.isNextKidoku) {
				this.cancelAutoSkip();
				return;
			}
			return e === "p" && this.#X() !== "s" ? void 0 : {
				mode: "skip",
				msec: 0
			};
		}
	}
	#X() {
		let e = this.#A.get("sys:sn.skip.mode");
		return e == null ? "s" : String(e);
	}
	#Z(e) {
		let t = e ? "sn.auto.msecPageWait" : "sn.auto.msecLineWait", n = Number(this.#A.get(`sys:${t}${this.isKidoku ? "_Kidoku" : ""}`));
		return Number.isFinite(n) && n > 0 ? n : e ? 3500 : 500;
	}
	getEvent(e) {
		let t = e.toLowerCase();
		return this.#R[t] ?? this.#z[t];
	}
	clearEvent(e = !1) {
		if (!e) {
			this.#R = Object.create(null);
			return;
		}
		for (let e in this.#z) delete this.#z[e];
	}
	#Q() {
		let e = this.#R;
		return this.#R = Object.create(null), e;
	}
	beginEvent(e) {
		let t = this.getEvent(e);
		if (t) return this.#A.set("tmp:sn.eventArg", t.arg), this.#A.set("tmp:sn.eventLabel", t.label), t.call || this.clearEvent(), t;
	}
	#$(e, t = !0, n = {}) {
		this.#L.push({
			fn: this.fn,
			returnIdx: e,
			lenIfStk: this.#I.length,
			hMp: this.#A.cloneMp(),
			hArgs: n,
			scr: this.#g,
			...t ? { hEvt: this.#Q() } : {}
		}), this.#I.push(-1);
	}
	step() {
		let e = [];
		for (this.#S && (this.#S = !1, this.#fe(), this.#y[this.#v] = "", e.push({
			t: "chgStr",
			nm: this.#v,
			page: "fore",
			str: "",
			hard: !0
		})); this.#_ < this.#g.len;) {
			this.#K();
			let t = this.#g.aToken[this.#_++], n = t.charCodeAt(0);
			if (n === 9 || n === 10) continue;
			if (n === 91) {
				let n = this.#t(t);
				if (!n) continue;
				let { name: r, args: i } = n;
				if (this.#re(r, i, e) === "stop") return e;
				continue;
			}
			let r = t, i = this.#g.grm.ce, a = !!i && t.length > 1 && t.startsWith(i);
			if (!a && n === 38) {
				if (!t.endsWith("&")) {
					this.#ee(t);
					continue;
				}
				if (t.charAt(1) === "&") throw "「&表示&」書式では「&」指定が不要です";
				let e = this.#j.parse(t.slice(1, -1));
				r = e == null ? "" : String(e);
			} else if (!a && n === 59) continue;
			else if (!a && n === 42 && t.length > 1) continue;
			this.#de(e, r);
		}
		return e;
	}
	#ee(e) {
		let { name: t, text: n, cast: r } = C(e.slice(1));
		this.#A.set(this.#j.getValAmpersand(t.trim()), this.#j.parse(n), r ?? "");
	}
	#te(t, n, r, i = !1) {
		let o = t.layer ?? "", c = this.#T[o] ?? "txt", l = c !== "grp" && c !== "txt";
		if (!l) {
			let e = t.fn || t.pic;
			if (e) {
				let i = {
					t: "chgPic",
					nm: o,
					page: r,
					fn: e
				};
				if (t.face !== void 0) {
					let e = [];
					if (t.face) for (let n of t.face.split(",")) {
						if (!n) throw "[lay] face属性に空要素が含まれています";
						e.push(this.#C[n] ?? {
							fn: n,
							dx: 0,
							dy: 0,
							blendmode: a("normal")
						});
					}
					i.aFace = e;
				}
				n.push(i);
			}
			if (t.back_clear !== void 0) t.back_clear === "true" && n.push({
				t: "chgBackClear",
				nm: o,
				page: r
			});
			else {
				if (t.b_alpha !== void 0 || t.b_alpha_isfixed !== void 0) {
					let e = {
						t: "chgBAlpha",
						nm: o,
						page: r
					};
					if (t.b_alpha !== void 0) {
						let n = Number(t.b_alpha);
						if (Number.isNaN(n)) throw `[lay] b_alphaの値が不正です：${t.b_alpha}`;
						e.b_alpha = Math.min(1, Math.max(0, n));
					}
					t.b_alpha_isfixed !== void 0 && (e.isFixed = t.b_alpha_isfixed !== "false"), n.push(e);
				}
				t.b_pic !== void 0 && n.push({
					t: "chgBPic",
					nm: o,
					page: r,
					fn: t.b_pic
				});
			}
		}
		let u = {};
		if (t.visible !== void 0 && (u.visible = t.visible !== "false"), t.alpha !== void 0 && (u.alpha = e.#n("lay", "alpha", t.alpha)), !(!l && t.pos === "stay")) {
			if (!l && t.pos !== void 0) {
				let n = t.pos, r = Number(this.#A.get("tmp:const.sn.config.window.width")), i = Number(this.#A.get("tmp:const.sn.config.window.height"));
				n === "" || n === "c" ? (u.left = r / 2, u.align_x = "center") : n === "l" ? u.left = 0 : n === "r" ? (u.left = r, u.align_x = "right") : (u.left = e.#n("lay", "pos", n), u.align_x = "center"), u.top = i, u.align_y = "bottom";
			} else if (t.left === void 0 ? t.center === void 0 ? t.right === void 0 ? t.s_right !== void 0 && (u.s_right = this.#r("lay", "left", t.s_right)) : (u.left = this.#r("lay", "left", t.right), u.align_x = "right") : (u.left = this.#r("lay", "left", t.center), u.align_x = "center") : u.left = this.#r("lay", "left", t.left), t.top === void 0 ? t.middle === void 0 ? t.bottom === void 0 ? t.s_bottom !== void 0 && (u.s_bottom = this.#r("lay", "top", t.s_bottom)) : (u.top = this.#r("lay", "top", t.bottom), u.align_y = "bottom") : (u.top = this.#r("lay", "top", t.middle), u.align_y = "middle") : u.top = this.#r("lay", "top", t.top), (t.fn !== void 0 || t.pic !== void 0 || t.face !== void 0) && !("left" in u) && !("s_right" in u) && !("top" in u) && !("s_bottom" in u) && c === "grp") {
				let e = Number(this.#A.get("tmp:const.sn.config.window.width")), t = Number(this.#A.get("tmp:const.sn.config.window.height"));
				u.left = e / 2, u.align_x = "center", u.top = t, u.align_y = "bottom";
			}
		}
		if (i && l && !("left" in u) && !("s_right" in u) && !("top" in u) && !("s_bottom" in u) && t.width === void 0 && t.height === void 0 && (u.left = 0, u.top = 0, u.width = Number(this.#A.get("tmp:const.sn.config.window.width")), u.height = Number(this.#A.get("tmp:const.sn.config.window.height"))), t.width !== void 0 && (u.width = e.#n("lay", "width", t.width)), t.height !== void 0 && (u.height = e.#n("lay", "height", t.height)), t.rotation !== void 0 && (u.rotation = e.#n("lay", "rotation", t.rotation)), t.scale_x !== void 0 && (u.scale_x = e.#n("lay", "scale_x", t.scale_x)), t.scale_y !== void 0 && (u.scale_y = e.#n("lay", "scale_y", t.scale_y)), t.pivot_x !== void 0 && (u.pivot_x = e.#n("lay", "pivot_x", t.pivot_x)), t.pivot_y !== void 0 && (u.pivot_y = e.#n("lay", "pivot_y", t.pivot_y)), t.blendmode !== void 0 && (u.blendmode = a(t.blendmode)), !l) {
			if (t.b_color !== void 0 && t.back_clear !== "true" && (u.b_color = e.#n("lay", "b_color", t.b_color)), t.style !== void 0 && (u.style = t.style), t.pl !== void 0 && (u.pl = e.#n("lay", "pl", t.pl)), t.pr !== void 0 && (u.pr = e.#n("lay", "pr", t.pr)), t.pt !== void 0 && (u.pt = e.#n("lay", "pt", t.pt)), t.pb !== void 0 && (u.pb = e.#n("lay", "pb", t.pb)), t.ffs !== void 0 && (u.ffs = t.ffs), t.noffs !== void 0 && (u.noffs = t.noffs), t.bura !== void 0 && (u.bura = t.bura !== "false"), t.kinsoku_sol !== void 0 && (u.kinsoku_sol = t.kinsoku_sol), t.kinsoku_eol !== void 0 && (u.kinsoku_eol = t.kinsoku_eol), t.kinsoku_dns !== void 0 && (u.kinsoku_dns = t.kinsoku_dns), t.kinsoku_bura !== void 0 && (u.kinsoku_bura = t.kinsoku_bura), t.break_fixed !== void 0 && (u.break_fixed = t.break_fixed !== "false"), t.break_fixed_left !== void 0 && (u.break_fixed_left = e.#n("lay", "break_fixed_left", t.break_fixed_left)), t.break_fixed_top !== void 0 && (u.break_fixed_top = e.#n("lay", "break_fixed_top", t.break_fixed_top)), E.setting(t), t.r_align !== void 0) {
				if (!K.includes(t.r_align)) throw `[lay] r_alignの値が不正です：${t.r_align}`;
				u.r_align = t.r_align;
			}
			t.in_style !== void 0 && (u.in_style = t.in_style), t.out_style !== void 0 && (u.out_style = t.out_style);
		}
		Object.keys(u).length > 0 && n.push({
			t: "chgLay",
			nm: o,
			page: r,
			sty: u
		}), t.filter !== void 0 && n.push({
			t: "addFilter",
			aLayNm: [o],
			page: r,
			flt: s(t),
			replace: !0
		}), l && n.push({
			t: "layPlg",
			nm: o,
			page: r,
			hArg: { ...t }
		});
	}
	#ne(t, n) {
		let r = t.layer ?? "";
		if ((t.float ?? "false") !== "false") n.push({
			t: "moveLay",
			nm: r,
			mode: "float"
		});
		else if (t.index) {
			let i = e.#n("lay", "index", t.index);
			i && n.push({
				t: "moveLay",
				nm: r,
				mode: "index",
				index: i
			});
		} else t.dive && n.push({
			t: "moveLay",
			nm: r,
			mode: "dive",
			dive: t.dive
		});
	}
	#re(t, i, l) {
		let p = this.#g.len;
		switch (t) {
			case "add_lay": {
				let e = i.layer ?? i.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (i.class ?? "txt").toLowerCase();
				if (!u(t)) throw `[add_lay] 属性 class【${t}】が不正です。レイヤクラスが登録されていません`;
				let n = t !== "grp" && t !== "txt";
				this.#T[e] = t, this.#y[e] = "", this.#b[e] = "", t === "txt" && this.#A.setNochk(`save:const.sn.layer.${e}.enabled`, !0), l.push({
					t: "addLay",
					cls: t,
					nm: e
				});
				let r = i.layer === void 0 ? {
					...i,
					layer: e
				} : i;
				return this.#te(r, l, "fore", !0), this.#te(r, l, "back", !0), this.#ne(r, l), n ? "stop" : "skip";
			}
			case "current": {
				let e = i.layer ?? i.nm ?? this.#v;
				return e !== this.#v && this.#fe(), this.#v = e, this.#A.setNochk("save:const.sn.mesLayer", this.#v), "skip";
			}
			case "add_face": {
				let e = i.name ?? "";
				if (!e) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#C[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
				return this.#C[e] = {
					fn: i.fn || e,
					dx: Number(i.dx || "0"),
					dy: Number(i.dy || "0"),
					blendmode: a(i.blendmode || "normal")
				}, "skip";
			}
			case "lay": {
				let t = e.argPage(i, "fore");
				this.#te(i, l, t), this.#ne(i, l);
				let n = this.#T[i.layer ?? ""] ?? "txt";
				return n !== "grp" && n !== "txt" ? "stop" : "skip";
			}
			case "add_filter": return l.push({
				t: "addFilter",
				aLayNm: e.#c(i.layer),
				page: e.#h("add_filter", i, "fore"),
				flt: s(i),
				replace: !1
			}), "skip";
			case "clear_filter": return l.push({
				t: "clearFilter",
				aLayNm: e.#c(i.layer),
				page: e.#h("clear_filter", i, "fore")
			}), "skip";
			case "enable_filter": return l.push({
				t: "enableFilter",
				aLayNm: e.#c(i.layer),
				page: e.#h("enable_filter", i, "fore"),
				index: e.#i("enable_filter", "index", i.index, 0),
				enabled: (i.enabled ?? "true") !== "false"
			}), "skip";
			case "def_fx": {
				let e = i.name ?? "";
				if (!e) throw "[def_fx] nameは必須です";
				let t = i.glsl ?? "";
				if (!t) throw "[def_fx] glsl=（フラグメントシェーダ）は必須です";
				if (d.includes(e)) throw `[def_fx] name【${e}】は組み込みプリセット名なので使えません`;
				if (this.#w[e]) throw `[def_fx] name【${e}】は既に定義済みです`;
				return this.#w[e] = !0, l.push({
					t: "defFx",
					name: e,
					glsl: t
				}), "skip";
			}
			case "add_fx": return l.push({
				t: "addFx",
				aLayNm: e.#c(i.layer),
				page: e.#h("add_fx", i, "fore"),
				fx: f(i, this.#w)
			}), "skip";
			case "clear_fx": return l.push({
				t: "clearFx",
				aLayNm: e.#c(i.layer),
				page: e.#h("clear_fx", i, "fore"),
				names: e.#c(i.name)
			}), "skip";
			case "wait_fx": {
				let t = e.#c(i.layer), n = e.#c(i.name);
				if (!t && !n) throw "[wait_fx] layer= か name= のどちらかが必要です";
				return l.push({
					t: "waitFx",
					aLayNm: t,
					names: n,
					canskip: (i.canskip ?? "true") !== "false"
				}), "stop";
			}
			case "pause_fx":
			case "resume_fx": {
				let n = e.#c(i.layer), r = e.#c(i.name);
				if (!n && !r) throw `[${t}] layer= か name= のどちらかが必要です`;
				let a = i.index === void 0 ? null : e.#n(t, "index", i.index);
				if (a !== null && !n) throw `[${t}] index= は layer= と併用してください`;
				return l.push({
					t: "enableFx",
					aLayNm: n,
					names: r,
					index: a,
					enabled: t === "resume_fx"
				}), "skip";
			}
			case "clear_lay": {
				let t = e.#h("clear_lay", i, "fore"), n = e.#c(i.layer);
				if (i.layer !== void 0 && n === null) throw "[clear_lay] layer属性が空です";
				if (t !== "back") {
					if ((!n || n.includes(this.#v)) && this.#fe(), n) for (let e of n) this.#y[e] = "";
					else for (let e of Object.keys(this.#y)) this.#y[e] = "";
				}
				if (t !== "fore") {
					if (n) for (let e of n) this.#b[e] = "";
					else for (let e of Object.keys(this.#b)) this.#b[e] = "";
				}
				return l.push({
					t: "clearLay",
					aLayNm: n,
					page: t
				}), "skip";
			}
			case "trans": {
				let t = i.layer ?? "", n = t ? t.split(",").map((e) => e.trim()).filter((e) => e !== "") : null;
				if (n?.length === 0) throw "[trans] layer属性が空です";
				let r = Number(i.time ?? "0");
				if (!Number.isFinite(r) || r < 0) throw `[trans] timeの値が不正です：${i.time ?? ""}`;
				return l.push({
					t: "trans",
					aLayNm: n,
					time: this.skipEnabled ? 0 : r,
					...i.rule === void 0 ? {} : { rule: i.rule },
					...i.vague === void 0 ? {} : { vague: e.#n("trans", "vague", i.vague) },
					...i.glsl === void 0 ? {} : { glsl: i.glsl }
				}), "skip";
			}
			case "wt": return l.push({
				t: "waitTrans",
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "finish_trans": return l.push({ t: "finishTrans" }), "skip";
			case "set_cancel_skip": return "skip";
			case "quake": {
				let t = this.skipEnabled ? 0 : e.#n("quake", "time", i.time ?? "");
				return t <= 0 || l.push({
					t: "quake",
					msec: t,
					hmax: r(e.#i("quake", "hmax", i.hmax, 10)),
					vmax: r(e.#i("quake", "vmax", i.vmax, 10))
				}), "skip";
			}
			case "stop_quake": return l.push({ t: "stopQuake" }), "skip";
			case "wq": return l.push({
				t: "waitQuake",
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "tsy": {
				let { layer: t } = i;
				if (!t) throw "[tsy] layerは必須です";
				let n = this.skipEnabled, r = n ? 0 : e.#n("tsy", "time", i.time ?? ""), a = n ? 0 : e.#i("tsy", "delay", i.delay, 0), o = e.#i("tsy", "repeat", i.repeat, 1), c = e.argPage(i, "fore");
				return i.filter !== void 0 && l.push({
					t: "addFilter",
					aLayNm: [t],
					page: c,
					flt: s(i),
					replace: !0
				}), l.push({
					t: "tsy",
					tw_nm: R("tsy", i),
					nm: t,
					page: c,
					msec: r,
					delay: a,
					ease: I(i.ease),
					repeat: o > 0 ? o - 1 : Infinity,
					yoyo: (i.yoyo ?? "false") !== "false",
					hTo: j("tsy", i),
					backlay: (i.backlay ?? "false") !== "false",
					...e.#m("tsy", i)
				}), "skip";
			}
			case "tsy_frame": {
				let { id: t } = i;
				if (!t) throw "[tsy_frame] idは必須です";
				this.#ie("tsy_frame", t);
				let n = this.skipEnabled, r = e.#i("tsy_frame", "repeat", i.repeat, 1);
				return l.push({
					t: "tsyFrame",
					tw_nm: R("tsy_frame", i),
					id: t,
					msec: n ? 0 : e.#n("tsy_frame", "time", i.time ?? ""),
					delay: n ? 0 : e.#i("tsy_frame", "delay", i.delay, 0),
					ease: I(i.ease),
					repeat: r > 0 ? r - 1 : Infinity,
					yoyo: (i.yoyo ?? "false") !== "false",
					hTo: j("tsy_frame", i, k),
					...e.#m("tsy_frame", i, k)
				}), "skip";
			}
			case "wait_tsy": return l.push({
				t: "waitTsy",
				tw_nm: R("wait_tsy", i),
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return l.push({
				t: "stopTsy",
				tw_nm: R("stop_tsy", i)
			}), "skip";
			case "pause_tsy": return l.push({
				t: "pauseTsy",
				tw_nm: R("pause_tsy", i),
				paused: !0
			}), "skip";
			case "resume_tsy": return l.push({
				t: "pauseTsy",
				tw_nm: R("resume_tsy", i),
				paused: !1
			}), "skip";
			case "let":
				if (i.text === void 0) throw `[let] textは必須です（name:${i.name ?? ""}）`;
				return this.#ae("let", i, i.text), "skip";
			case "let_abs": {
				let t = e.#i("let_abs", "text", i.text, 0);
				return this.#ae("let_abs", i, String(t < 0 ? -t : t)), "skip";
			}
			case "let_round": {
				let t = e.#i("let_round", "text", i.text, 0);
				return this.#ae("let_round", i, String(Math.round(t))), "skip";
			}
			case "let_length": return this.#ae("let_length", i, String((i.text ?? "").length)), "skip";
			case "let_char_at": {
				let t = e.#i("let_char_at", "pos", i.pos, 0);
				return this.#ae("let_char_at", i, (i.text ?? "").charAt(t)), "skip";
			}
			case "let_index_of": {
				let { val: t } = i;
				if (!t) throw "[let_index_of] valは必須です";
				let n = e.#i("let_index_of", "start", i.start, 0);
				return this.#ae("let_index_of", i, String((i.text ?? "").indexOf(t, n))), "skip";
			}
			case "let_substr": {
				let t = e.#i("let_substr", "pos", i.pos, 0), r = i.text ?? "";
				return this.#ae("let_substr", i, i.len === "all" ? r.slice(t) : r.slice(t, t + n(e.#i("let_substr", "len", i.len, 1)))), "skip";
			}
			case "let_replace": return this.#ae("let_replace", i, (i.text ?? "").replace(e.#s("let_replace", i), String(i.val))), "skip";
			case "let_search": return this.#ae("let_search", i, String((i.text ?? "").search(e.#s("let_search", i)))), "skip";
			case "let_ml": {
				let e = i.name ?? "";
				if (!e) throw "[let_ml] nameは必須です";
				let t = "";
				for (; this.#_ < p && (t = this.#g.aToken[this.#_], t === ""); ++this.#_);
				if (this.#g.grm.testTagEndLetml(t)) return this.#A.set(e, "", "str"), ++this.#_, "skip";
				if (!this.#g.grm.testTagEndLetml(this.#g.aToken[this.#_ + 1] ?? "")) throw `[let_ml] 変数【${e}】の終端・[endlet_ml]がありません`;
				return this.#A.set(e, t, "str"), this.#_ += 2, "skip";
			}
			case "endlet_ml": return "skip";
			case "if": return this.#oe(i), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#se(), "skip";
			case "r": {
				let { nm: e, page: t } = this.#ue(i);
				return this.#de(l, "\n", !0, e, t), "skip";
			}
			case "er": return (i.rec_page_break ?? "true") !== "false" && this.#fe(), this.#y[this.#v] = "", this.#b[this.#v] = "", l.push({
				t: "chgStr",
				nm: this.#v,
				page: "both",
				str: "",
				hard: !0
			}), l.push({
				t: "clearTxtLay",
				nm: this.#v,
				page: "both",
				clearFilter: i.clear_filter === "true"
			}), "skip";
			case "span": {
				if (i.r_align !== void 0 && !K.includes(i.r_align)) throw `[span] r_alignの値が不正です：${i.r_align}`;
				let { nm: t, page: n } = this.#ue(i);
				if (i.in_style !== void 0 || i.out_style !== void 0) {
					let e = {};
					i.in_style !== void 0 && (e.in_style = i.in_style), i.out_style !== void 0 && (e.out_style = i.out_style), l.push({
						t: "chgLay",
						nm: t,
						page: n,
						sty: e
					});
				}
				return this.#de(l, e.#le("span", {
					...i,
					layer: void 0,
					page: void 0,
					in_style: void 0,
					out_style: void 0
				}), !0, t, n), "skip";
			}
			case "link": {
				if (!i.url && !i.label && !i.fn) throw "[link] fn・label・urlのいずれかは必須です";
				i.clickse !== void 0 && (i.clicksebuf = i.clicksebuf || "SYS"), i.enterse !== void 0 && (i.entersebuf = i.entersebuf || "SYS"), i.leavese !== void 0 && (i.leavesebuf = i.leavesebuf || "SYS"), i.style ??= "background-color: rgba(255,0,0,0.5);", i.style_hover ??= "background-color: rgba(255,0,0,0.9);", i.style_clicked ??= i.style;
				let { nm: t, page: n } = this.#ue(i);
				return this.#de(l, e.#le("link", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, t, n), "skip";
			}
			case "endlink": {
				let { nm: t, page: n } = this.#ue(i);
				return this.#de(l, e.#le("endlink", {}), !0, t, n), "skip";
			}
			case "graph": {
				if (!i.pic) throw "[graph] picは必須です";
				let { nm: t, page: n } = this.#ue(i);
				return this.#de(l, e.#le("grp", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, t, n), "skip";
			}
			case "tcy": {
				if (!i.t) throw "[tcy] tは必須です";
				let { nm: t, page: n } = this.#ue(i);
				return this.#de(l, e.#le("tcy", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, t, n), "skip";
			}
			case "ruby2":
			case "ch": {
				if (t === "ruby2") {
					if (!i.t) throw "[ruby2] tは必須です";
					if (!i.r) throw "[ruby2] rは必須です";
					i.text = `｜${encodeURIComponent(i.t)}《${encodeURIComponent(i.r)}》`, delete i.t, delete i.r;
				}
				let { text: n } = i;
				if (!n) throw `[${t}] textは必須です`;
				let { nm: r, page: a } = this.#ue(i);
				return this.#de(l, e.#le("add", {
					...i,
					text: void 0,
					layer: void 0,
					page: void 0
				}) + n.replaceAll("[r]", "\n") + e.#le("add_close", {}), i.record !== "false", r, a), "skip";
			}
			case "autowc": {
				let t = i.enabled === void 0 ? this.#A.get("game:const.sn.autowc.enabled") === !0 : i.enabled !== "false";
				this.#A.setNochk("save:const.sn.autowc.enabled", t);
				let { text: n } = i;
				if ("text" in i != "time" in i) throw "[autowc] textとtimeは同時指定必須です";
				if (this.#A.setNochk("save:const.sn.autowc.text", n ?? ""), !n) return this.#A.setNochk("save:const.sn.autowc.time", ""), l.push({
					t: "autowc",
					enabled: t,
					hWait: {}
				}), "skip";
				let a = Array.from(n), o = String(i.time ?? "").split(",");
				if (o.length !== a.length) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
				let s = {};
				return a.forEach((t, n) => {
					s[t] = r(e.#n("autowc", "time", o[n] ?? ""));
				}), this.#A.setNochk("save:const.sn.autowc.time", i.time ?? ""), l.push({
					t: "autowc",
					enabled: t,
					hWait: s
				}), "skip";
			}
			case "ch_in_style":
			case "ch_out_style": {
				let e = t === "ch_in_style" ? "in" : "out", { name: n, sty: r } = o(t, i, e === "in");
				if (this.#F[e].has(n)) throw `[${t}] name【${n}】はすでにあります`;
				return this.#F[e].add(n), l.push({
					t: "defChStyle",
					kind: e,
					nm: n,
					sty: r
				}), "skip";
			}
			case "rec_ch": {
				let { text: t, ...n } = i;
				return Object.keys(n).length && this.#N.setAttr(n), t && this.#N.add(e.#le("add", {
					...i,
					text: void 0
				}) + t.replaceAll("[r]", "\n") + e.#le("add_close", {})), "skip";
			}
			case "rec_r": return this.#N.add("\n"), "skip";
			case "reset_rec": return this.#N.reset(i.text ?? ""), "skip";
			case "trace": return l.push({
				t: "trace",
				text: i.text ?? ""
			}), "skip";
			case "log": return l.push({
				t: "log",
				text: i.text ?? "",
				fn: this.fn,
				lineNum: this.lineNum
			}), "skip";
			case "jump": {
				i.count === "false" && this.#q();
				let e = i.label ?? "", t = i.fn ?? "";
				if (!e && !t) throw "[jump] fnまたはlabelは必須です";
				if (t && t !== this.fn) return l.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e, this.#_, this.#M());
				if (n === void 0) throw `[jump] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#_ = n, "skip";
			}
			case "call": {
				i.count !== "true" && this.#q();
				let e = i.label ?? "", t = i.fn ?? "";
				if (!e && !t) throw "[call] fnまたはlabelは必須です";
				if (t && t !== this.fn) return this.#$(this.#_, !0, i), l.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e, this.#_, this.#M());
				if (n === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#$(this.#_, !0, i), this.#_ = n, "skip";
			}
			case "return": return this.#ce(l, i);
			case "macro": {
				let t = i.name ?? "";
				if (!t) throw "[macro] nameは必須です（試作仕様）";
				if (e.RESERVED_TAGS.has(t)) throw `[${t}]はタグ名のため、マクロ名として使用できません`;
				if (e.REG_NG4MAC_NM.test(t)) throw `[${t}]はマクロ名として異常です`;
				if (t in this.#H) throw `[macro] マクロ【${t}】は既に定義済みです`;
				this.#H[t] = {
					fn: this.fn,
					idx: this.#_
				};
				let n = !1, r = 0, a = !1;
				for (; this.#_ < p; ++this.#_) {
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
					let { name: i } = e.parseTag(t);
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
				if (!n) throw `[macro] マクロ【${t}】が[endmacro]で閉じられていません（試作仕様）`;
				return "skip";
			}
			case "char2macro":
			case "bracket2macro": return this.#g.defC2M(t, i, this.#U(), this.#_), "skip";
			case "endmacro": return this.#ce(l);
			case "button": {
				let t = i.layer || this.#v;
				if (!t) throw "[button] layerは必須です（試作仕様）";
				let n = i.label ?? "", r = i.fn ?? this.fn, { pic: o } = i;
				if (!o && !i.text) throw "[button] textまたはpic属性は必須です";
				let s = i.nm, c = i.call === "true", u = e.argPage(i, "back"), d = {};
				i.left === void 0 ? i.center === void 0 ? i.right === void 0 ? i.s_right !== void 0 && (d.s_right = this.#r("button", "left", i.s_right)) : (d.left = this.#r("button", "left", i.right), d.align_x = "right") : (d.left = this.#r("button", "left", i.center), d.align_x = "center") : d.left = this.#r("button", "left", i.left), i.top === void 0 ? i.middle === void 0 ? i.bottom === void 0 ? i.s_bottom !== void 0 && (d.s_bottom = this.#r("button", "top", i.s_bottom)) : (d.top = this.#r("button", "top", i.bottom), d.align_y = "bottom") : (d.top = this.#r("button", "top", i.middle), d.align_y = "middle") : d.top = this.#r("button", "top", i.top);
				for (let t of e.#f) {
					let n = i[t];
					n !== void 0 && Object.assign(d, { [t]: e.#n("button", t, n) });
				}
				return o || (d.width ??= 100, d.height ??= 30), i.enabled !== void 0 && (d.enabled = i.enabled !== "false"), i.blendmode !== void 0 && (d.blendmode = a(i.blendmode)), i.style !== void 0 && (d.style = e.#u(i.style)), i.style_hover !== void 0 && (d.style_hover = e.#u(i.style_hover)), i.style_clicked !== void 0 && (d.style_clicked = e.#u(i.style_clicked)), i.hint !== void 0 && (d.hint = i.hint), i.hint_style !== void 0 && (d.hint_style = i.hint_style), i.hint_opt !== void 0 && (d.hint_opt = i.hint_opt), o !== void 0 && (d.pic = o), i.b_pic !== void 0 && (d.b_pic = i.b_pic), i.clickse !== void 0 && (d.clickse = i.clickse, d.clicksebuf = i.clicksebuf || "SYS"), i.enterse !== void 0 && (d.enterse = i.enterse, d.entersebuf = i.entersebuf || "SYS"), i.leavese !== void 0 && (d.leavese = i.leavese, d.leavesebuf = i.leavesebuf || "SYS"), i.onenter !== void 0 && (d.onenter = i.onenter), i.onleave !== void 0 && (d.onleave = i.onleave), l.push({
					t: "addBtn",
					layerNm: t,
					page: u,
					text: o ? "" : i.text ?? "",
					label: n,
					call: c,
					...s === void 0 ? {} : { nm: s },
					...r ? { fn: r } : {},
					...i.url === void 0 ? {} : { url: i.url },
					...i.arg === void 0 ? {} : { arg: i.arg },
					...Object.keys(d).length > 0 ? { sty: d } : {}
				}), "skip";
			}
			case "page": {
				if (!("clear" in i || "to" in i || "style" in i)) throw "[page] clear,style,to いずれかは必須です";
				if (i.key !== void 0 && l.push({
					t: "pageKeys",
					aKey: i.key ? i.key.split(",") : []
				}), i.style !== void 0) return l.push({
					t: "pageStyle",
					style: i.style
				}), "skip";
				if (i.clear === "true") return l.push({ t: "clearPageLog" }), "skip";
				if (i.to === void 0) return "skip";
				let e = i.to;
				if (!c.includes(e)) throw `[page] 属性to「${i.to}」は異常です`;
				return l.push({
					t: "pageTo",
					to: e
				}), "stop";
			}
			case "title": {
				let { text: e } = i;
				if (!e) throw "[title] textは必須です";
				return l.push({
					t: "title",
					text: e
				}), "skip";
			}
			case "toggle_full_screen": return l.push(i.key ? {
				t: "fullScrKey",
				key: i.key.toLowerCase()
			} : { t: "toggleFullScr" }), "skip";
			case "navigate_to": {
				let { url: e } = i;
				if (!e) throw "[navigate_to] urlは必須です";
				return l.push({
					t: "navigateTo",
					url: e
				}), "skip";
			}
			case "close": return l.push({ t: "close" }), "skip";
			case "update_check": {
				let { url: e } = i;
				if (!e) throw "[update_check] urlは必須です";
				if (!e.endsWith("/")) throw "[update_check] urlの末尾は/にして下さい";
				return l.push({
					t: "updateCheck",
					url: e
				}), "skip";
			}
			case "window": {
				let t = (e, t) => {
					let n = this.#A.get(`sys:const.sn.nativeWindow.${e}`);
					return n == null ? t : Number(n);
				}, n = (e) => Number(this.#A.get(`tmp:const.sn.config.window.${e}`) ?? 0), r = (t, n, r) => i[t] === void 0 ? i[n] === void 0 ? r : e.#n("window", n, i[n]) : e.#n("window", t, i[t]), a = {
					centering: i.centering === "true",
					x: r("x", "x", t("x", 0)),
					y: r("y", "y", t("y", 0)),
					w: r("width", "w", t("w", n("width"))),
					h: r("height", "h", t("h", n("height")))
				};
				return this.#A.setNochk("sys:const.sn.nativeWindow.x", a.x), this.#A.setNochk("sys:const.sn.nativeWindow.y", a.y), this.#A.setNochk("sys:const.sn.nativeWindow.w", a.w), this.#A.setNochk("sys:const.sn.nativeWindow.h", a.h), l.push({
					t: "window",
					...a
				}), "skip";
			}
			case "loadplugin": {
				let { fn: e } = i;
				if (!e) throw "[loadplugin] fnは必須です";
				if (!e.endsWith(".css")) throw "[loadplugin] サポートされない拡張子です";
				let t = (i.join ?? "true") !== "false";
				return l.push({
					t: "loadPlugin",
					fn: e,
					join: t
				}), t ? "stop" : "skip";
			}
			case "snapshot": return l.push({
				t: "snapshot",
				fn: i.fn ?? "",
				aLayNm: e.#c(i.layer),
				page: e.argPage(i, "fore"),
				width: e.#i("snapshot", "width", i.width, 0),
				height: e.#i("snapshot", "height", i.height, 0),
				smoothing: i.smoothing === "true",
				...i.b_color === void 0 ? {} : { b_color: e.#n("snapshot", "b_color", i.b_color) }
			}), "stop";
			case "clear_text": {
				let t = i.layer || this.#v, n = e.argPage(i, "fore");
				return t === this.#v && n === "fore" && this.#fe(), this.#x(n)[t] = "", l.push({
					t: "chgStr",
					nm: t,
					page: n,
					str: "",
					hard: !0
				}), "skip";
			}
			case "dump_val": return l.push({
				t: "trace",
				text: `[dump_val] ${JSON.stringify(this.#A.dump())}`
			}), "skip";
			case "dump_stack": return l.push({
				t: "trace",
				text: `[dump_stack] ${JSON.stringify({
					now: {
						fn: this.fn,
						idx: this.#_
					},
					aCallStk: this.#L.map((e) => ({
						fn: e.fn,
						returnIdx: e.returnIdx
					})),
					aIfStk: [...this.#I]
				})}`
			}), "skip";
			case "dump_lay": return l.push({
				t: "dumpLay",
				aLayNm: e.#c(i.layer)
			}), "skip";
			case "pop_stack":
				if ((i.clear ?? "false") !== "false") this.#L.length = 0;
				else if (!this.#L.pop()) throw "[pop_stack] スタックが空です";
				return this.#I.length = 0, this.#I.push(-1), this.#A.setMp({}), "skip";
			case "clearvar": return this.#A.clearGame(), "skip";
			case "clearsysvar": return this.#A.clearSys(), this.clearKidoku(), "skip";
			case "record_place": return this.recordPlace(), l.push({ t: "recordPlace" }), "skip";
			case "save": {
				if (i.place === void 0) throw "[save] placeは必須です";
				let t = e.#n("save", "place", i.place), n = {
					text: "",
					...i
				};
				delete n.place, l.push({
					t: "save",
					place: t,
					json: n
				});
				let r = Number(this.#A.get("sys:const.sn.save.place"));
				return t === r && this.#A.setNochk("sys:const.sn.save.place", r + 1), "skip";
			}
			case "load":
				if (i.index === void 0 && "fn" in i != "label" in i) throw "[load] fnとlabelはセットで指定して下さい";
				return l.push({
					t: "load",
					place: e.#i("load", "place", i.place, 0),
					fn: i.fn ?? "",
					label: i.label ?? "",
					...i.index === void 0 ? {} : { index: e.#n("load", "index", i.index) },
					...i.do_rec === void 0 ? {} : { doRec: i.do_rec !== "false" }
				}), "stop";
			case "reload_script": return l.push({ t: "reloadScript" }), "stop";
			case "copybookmark": {
				let t = e.#n("copybookmark", "from", i.from ?? ""), n = e.#n("copybookmark", "to", i.to ?? "");
				return t === n || l.push({
					t: "copyBookmark",
					from: t,
					to: n
				}), "skip";
			}
			case "erasebookmark": return l.push({
				t: "eraseBookmark",
				place: e.#n("erasebookmark", "place", i.place ?? "")
			}), "skip";
			case "export": return l.push({ t: "exportData" }), "skip";
			case "import": return l.push({ t: "importData" }), "skip";
			case "event": {
				let e = i.key ?? "", t = e.toLowerCase();
				if (!t) throw "[event] keyは必須です";
				let n = t.startsWith("dom="), r = i.global === "true" ? this.#z : this.#R;
				if (i.del === "true") {
					if (i.fn || i.label || i.call) throw "[event] fn/label/callとdelは同時指定できません";
					return delete r[t], n && l.push({
						t: "resvDomEvent",
						rawKey: e,
						key: t,
						del: !0,
						needErr: !1
					}), "skip";
				}
				let a = i.label ?? "", o = i.fn ?? this.fn, { url: s } = i;
				if (!s && !a && !i.fn) throw "[event] fn,label いずれかは必須です";
				return r[t] = {
					fn: o,
					label: a,
					call: i.call === "true",
					arg: i.arg ?? "",
					...s ? { url: s } : {}
				}, n && l.push({
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
					return l.push({
						t: "setFocus",
						mode: e === void 0 ? "del" : "add",
						rawKey: n,
						needErr: r
					}), "skip";
				}
				if (!n) throw "[set_focus] add か to は必須です";
				if (n !== "null" && n !== "next" && n !== "prev") throw `[set_focus] to【${n}】が不正です`;
				return l.push({
					t: "setFocus",
					mode: n
				}), "skip";
			}
			case "add_frame": {
				let { id: t, src: n } = i;
				if (!t) throw "[add_frame] idは必須です";
				if (!n) throw "[add_frame] srcは必須です";
				if (this.#A.get(`const.sn.frm.${t}`)) throw `[add_frame] frame【${t}】はすでにあります`;
				return l.push({
					t: "addFrame",
					id: t,
					src: n,
					sty: e.#p("add_frame", i)
				}), "stop";
			}
			case "frame": {
				let { id: t } = i;
				if (!t) throw "[frame] idは必須です";
				this.#ie("frame", t);
				let n = (i.float ?? "false") === "false" ? i.index === void 0 ? i.dive ? { mode: "dive" } : void 0 : {
					mode: "index",
					index: e.#n("frame", "index", i.index)
				} : { mode: "float" };
				return l.push({
					t: "frame",
					id: t,
					sty: e.#p("frame", i),
					...n ? { order: n } : {},
					...i.disabled === void 0 ? {} : { disabled: i.disabled !== "false" }
				}), "skip";
			}
			case "set_frame": {
				let { id: e, var_name: t, text: n } = i;
				if (!e) throw "[set_frame] idは必須です";
				if (!t) throw "[set_frame] var_nameは必須です";
				if (!n) throw "[set_frame] textは必須です";
				return this.#ie("set_frame", e), this.#A.setNochk(`const.sn.frm.${e}.${t}`, n), l.push({
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
				return this.#ie("let_frame", e), l.push({
					t: "letFrame",
					id: e,
					var_name: t,
					fnc: (i.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(i.global === "true"), "skip";
			case "enable_event": {
				let e = i.layer || this.#v, t = (i.enabled ?? "true") !== "false";
				return this.#A.setNochk(`save:const.sn.layer.${e}.enabled`, t), l.push({
					t: "enableEvent",
					nm: e,
					enabled: t
				}), "skip";
			}
			case "wait": {
				let t = e.#n("wait", "time", i.time ?? "");
				return this.skipEnabled ? (!this.skipAll && !this.isNextKidoku && this.cancelAutoSkip(), "skip") : (l.push({
					t: "wait",
					msec: t,
					canskip: (i.canskip ?? "true") !== "false"
				}), "stop");
			}
			case "l":
			case "p":
			case "s":
			case "waitclick": {
				if (t === "l" && !this.tagLEnabled) return "skip";
				t === "p" && (this.#S = !0);
				let n = this.#Y(t), r = {};
				for (let n of [
					"x",
					"y",
					"width",
					"height"
				]) {
					let a = i[n];
					a !== void 0 && (r[n] = e.#n(t, n, a));
				}
				return l.push({
					t: "stop",
					kind: t,
					key: `${this.fn}:${String(this.#_)}`,
					nm: this.#v,
					...n ? { resume: n } : {},
					...Object.keys(r).length > 0 ? { mark: r } : {}
				}), "stop";
			}
			case "playse":
			case "playbgm": {
				let n = t === "playbgm", r = !n && (i.canskip ?? "true") !== "false";
				if (this.skipEnabled && r) return "skip";
				let a = n ? "BGM" : i.buf || "SE", o = i.fn ?? "";
				if (!o) throw `[${t}] fnは必須です`;
				let s = n ? !0 : (i.loop ?? "false") !== "false", c = (i.join ?? "true") !== "false", u = e.#i(t, "speed", i.speed, 1), d = e.#i(t, "pan", i.pan, 0), f = e.#i(t, "start_ms", i.start_ms, 0);
				if (f < 0) throw `[${t}] start_ms:${String(f)} が負の値です`;
				let p = e.#i(t, "ret_ms", i.ret_ms, 0);
				if (p < 0) throw `[${t}] ret_ms:${String(p)} が負の値です`;
				let m = e.#i(t, "end_ms", i.end_ms, e.#o);
				if (m > 0) {
					if (m <= f) throw `[${t}] start_ms:${String(f)} >= end_ms:${String(m)} は異常値です`;
					if (m <= p) throw `[${t}] ret_ms:${String(p)} >= end_ms:${String(m)} は異常値です`;
				}
				let h = `const.sn.sound.${a}.`, g = e.#a(e.#i(t, "volume", i.volume, 1));
				this.#A.setNochk(`save:${h}volume`, g), this.#A.setNochk(`save:${h}fn`, o), this.#A.setNochk(`save:${h}start_ms`, f), this.#A.setNochk(`save:${h}end_ms`, m), this.#A.setNochk(`save:${h}ret_ms`, p);
				let _ = g * Number(this.#A.get(`sys:${h}volume`, 1, !0));
				if (a === "BGM") _ *= this.#k;
				else if (a === "VOICE") {
					let e = Number(this.#A.get("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
					if (this.#k = e, e !== 1) {
						let t = "const.sn.sound.BGM.", n = Number(this.#A.get(`save:${t}volume`, 1, !0)) * Number(this.#A.get(`sys:${t}volume`, 1, !0)) * e;
						l.push({
							t: "duckBgm",
							volume: n
						});
					}
				}
				return s ? this.#D(a, o) : this.#O(a), l.push({
					t: "playSnd",
					buf: a,
					fn: o,
					loop: s,
					volume: _,
					speed: u,
					pan: d,
					start_ms: f,
					end_ms: m,
					ret_ms: p,
					join: c,
					canskip: r
				}), c ? "stop" : "skip";
			}
			case "stopse":
			case "stopbgm": {
				let e = t === "stopbgm" ? "BGM" : i.buf || "SE";
				return this.#O(e), l.push({
					t: "stopSnd",
					buf: e
				}), "skip";
			}
			case "stop_allse":
				for (let e of Object.keys(this.#E)) this.#O(e);
				return l.push({ t: "stopAllSnd" }), "skip";
			case "xchgbuf": {
				let t = i.buf || "SE", n = i.buf2 || "SE";
				if (t === n) return "skip";
				let r = {
					volume: 1,
					fn: "",
					start_ms: 0,
					end_ms: e.#o,
					ret_ms: 0
				}, a = `const.sn.sound.${t}.`, o = `const.sn.sound.${n}.`;
				for (let e of Object.keys(r)) {
					let t = this.#A.get(`save:${a}${e}`, r[e]), n = this.#A.get(`save:${o}${e}`, r[e]);
					this.#A.setNochk(`save:${a}${e}`, n), this.#A.setNochk(`save:${o}${e}`, t);
				}
				let s = this.#E[t], c = this.#E[n];
				return c === void 0 ? delete this.#E[t] : this.#E[t] = c, s === void 0 ? delete this.#E[n] : this.#E[n] = s, this.#A.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#E)), l.push({
					t: "xchgBufSnd",
					buf: t,
					buf2: n
				}), "skip";
			}
			case "volume": {
				let t = i.buf || "SE", n = `const.sn.sound.${t}.`, r = e.#a(e.#i("volume", "volume", i.volume, 1));
				this.#A.setNochk(`sys:${n}volume`, r);
				let a = Number(this.#A.get(`save:${n}volume`, 1, !0));
				return l.push({
					t: "volumeSnd",
					buf: t,
					volume: a * r
				}), "skip";
			}
			case "fadese":
			case "fadebgm":
			case "fadeoutse":
			case "fadeoutbgm": {
				let n = t === "fadebgm" || t === "fadeoutbgm", r = t === "fadeoutse" || t === "fadeoutbgm", a = n ? "BGM" : i.buf || "SE", o = `const.sn.sound.${a}.`, s = r ? 0 : e.#a(e.#n(t, "volume", i.volume ?? ""));
				this.#A.setNochk(`save:${o}volume`, s);
				let c = Number(this.#A.get(`sys:${o}volume`, 1, !0)), u = (i.stop ?? (s === 0 ? "true" : "false")) !== "false";
				u && this.#O(a);
				let d = this.skipEnabled, f = d ? 0 : e.#n(t, "time", i.time ?? ""), p = d ? 0 : e.#i(t, "delay", i.delay, 0);
				return l.push({
					t: "fadeSnd",
					buf: a,
					volume: s * c,
					msec: f,
					delay: p,
					stop: u
				}), "skip";
			}
			case "stopfadese": return "skip";
			case "ws":
			case "wl": {
				let e = t === "wl" ? "BGM" : i.buf || "SE", n = (i.canskip ?? "false") !== "false", r = (i.stop ?? "true") !== "false";
				return l.push({
					t: "waitSnd",
					buf: e,
					canskip: n,
					stop: r
				}), "stop";
			}
			case "wf":
			case "wb": {
				let e = t === "wb" ? "BGM" : i.buf || "SE", n = (i.canskip ?? "false") !== "false";
				return l.push({
					t: "waitFade",
					buf: e,
					canskip: n
				}), "stop";
			}
			case "wv": {
				let e = i.fn ?? "";
				if (!e) throw "[wv] fnは必須です";
				let t = (i.stop ?? "true") !== "false", n = (i.canskip ?? "true") !== "false";
				return l.push({
					t: "waitVideo",
					fn: e,
					stop: t,
					canskip: n
				}), "stop";
			}
			default: {
				if (re(t)) return l.push({
					t: "plgTag",
					name: t,
					hArg: { ...i }
				}), "stop";
				let e = this.#H[t];
				return e === void 0 ? "skip" : (this.#$(this.#_, !1, i), this.#A.setMp({
					...i,
					"const.sn.me_call_scriptFn": this.fn,
					"const.sn.macro": JSON.stringify({ name: t })
				}), e.fn === this.fn ? (this.#_ = e.idx, "skip") : (l.push({
					t: "loadScript",
					fn: e.fn,
					label: "",
					idx: e.idx
				}), "stop"));
			}
		}
	}
	#ie(e, t) {
		if (!this.#A.get(`const.sn.frm.${t}`)) throw `[${e}] frame【${t}】が読み込まれていません`;
	}
	#ae(e, t, n) {
		let r = t.name ?? "";
		if (!r) throw `[${e}] nameは必須です`;
		this.#A.set(r, n, t.cast ?? "");
	}
	#oe(t) {
		let n = t.exp ?? "";
		if (!n) throw "[if] expは必須です（試作仕様）";
		if (n.startsWith("&")) throw "[if] 属性expは「&」が不要です";
		let r = this.#j.evalBool(n) ? this.#_ : -1, i = 0, a = !1, o = this.#g.len;
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
					if (e.startsWith("&")) throw "[elsif] 属性expは「&」が不要です";
					this.#j.evalBool(e) && (r = this.#_ + 1);
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
					r === -1 ? ++this.#_ : (this.#I.push(this.#_ + 1), this.#_ = r);
					return;
				default: continue;
			}
		}
		throw "[if] に対応する [endif] が見つかりません（試作仕様）";
	}
	#se() {
		let e = this.#I.pop();
		if (e === void 0 || e === -1) throw "[if] に対応していない [elsif]/[else]/[endif] です";
		this.#_ = e;
	}
	#ce(e, t = {}) {
		let n = this.#L.pop();
		if (!n) throw "[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）";
		this.#I.length = n.lenIfStk, this.#A.setMp(n.hMp), n.hEvt && (this.#R = n.hEvt);
		let r = t.label ?? "", i = t.fn ?? "";
		if (i || r) {
			if (i && i !== this.fn) return e.push({
				t: "loadScript",
				fn: i,
				label: r,
				idx: 0
			}), "stop";
			let t = this.#g.label2idx(r, this.#_, this.#M());
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
	static #le(e, t) {
		return `｜&emsp;《${e}｜${encodeURIComponent(JSON.stringify(t))}》`;
	}
	#ue(t) {
		return {
			nm: t.layer || this.#v,
			page: e.argPage(t, "fore")
		};
	}
	#de(e, t, n = !0, r = this.#v, i = "fore") {
		let a = this.#x(i), o = (a[r] ?? "") + t;
		a[r] = o, n && this.#P && r === this.#v && i === "fore" && this.#N.add(t), e.push({
			t: "chgStr",
			nm: r,
			page: i,
			str: o
		});
	}
	#fe() {
		this.#N.pagebreak();
	}
};
//#endregion
export { ae as ScriptEngine, A as a, w as c, U as i, W as n, L as o, z as r, T as s, ne as t };

//# sourceMappingURL=ScriptEngine.js.map