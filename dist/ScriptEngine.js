import { a as e, c as t, l as n, o as r, s as i, t as a } from "./CmnLib.js";
import { T as o, i as s, l as c, t as l, v as u } from "./PageLog.js";
import { n as d } from "./ConfigBase.js";
import { r as f } from "./LayCls.js";
import { n as p, r as m } from "./Fx.js";
//#region src/sn/CmnInterface.ts
function h() {
	return {
		"const.sn.cfg.ns": "",
		"const.sn.aPageLog": "[]",
		"const.sn.nativeWindow.x": 0,
		"const.sn.nativeWindow.y": 0,
		"const.sn.nativeWindow.w": a.stageW,
		"const.sn.nativeWindow.h": a.stageH,
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
var g = { save: "game" }, _ = class e {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = /* @__PURE__ */ new Set();
	#r = Object.create(null);
	#i;
	constructor() {
		this.#a();
	}
	#a() {
		for (let [e, t] of Object.entries(h())) this.#e[`sys.${e}`] = typeof t == "function" ? 1 : t;
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
			ns: g[r] ?? r,
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
	static castTo(t, r) {
		switch (r) {
			case "": return t;
			case "num": return e.#l(t);
			case "int": return i(e.#l(t));
			case "uint": return n(e.#l(t));
			case "bool": return t != null && String(t) !== "false" && !!String(t);
			case "str": return t == null ? t : String(t);
			default: throw `cast【${String(r)}】は未定義です`;
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
}, v = /\[[^\]]+\]/g, y = {
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
}, b = class {
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
					v: ["!num!", i(o[0])]
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
				let i = r(), a = i && y[i.t];
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
		let t = e.replaceAll(v, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
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
		int: (e) => i(this.#c(e.shift())),
		parseInt: (e) => i(this.#s.Number(e)),
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
function x(e, t, n = 0, r = 0, i = 0) {
	let a = e.slice(0, t).split("\n"), o = a.length;
	return {
		ln: r + o - 1,
		ch: o < 2 ? i + 1 + n + t : a.at(-1)?.length ?? 0
	};
}
var S = class {
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
					let e = d.length - 1, { ch: s } = x(a, o + e, t, n, r);
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
			let { ln: f, ch: p } = x(a, o, t, n, r), { ln: m, ch: h } = x(a, o + s.lastIndexOf(l ?? u) - +!l, t, n, r);
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
}, C = /(?<name>[^\s;\]]+)/;
function w(e) {
	let t = C.exec(e.slice(1, -1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	let n = t.name;
	return [n, e.slice(1 + n.length, -1)];
}
function T(e) {
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
var E = class {
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
				let [i, a] = w(n);
				this.#l.parse(a);
				let o = this.#l.hPrm.fn;
				if (!o) continue;
				let { val: s } = o;
				if (!s.endsWith("*")) continue;
				e.aToken.splice(t, 1, "	", "; " + n), e.aLNum.splice(t, 1, NaN, NaN);
				let c = i === "loadplugin" ? d.CSS : d.SN, l = this.cfg.matchPath("^" + s.slice(0, -1) + ".*", c);
				for (let i of l) {
					let a = n.replace(this.#s, "fn=" + decodeURIComponent(r(i[c])));
					e.aToken.splice(t, 0, a), e.aLNum.splice(t, 0, NaN);
				}
			}
			e.len = e.aToken.length;
		}
	}
	#l = new S();
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
}, D = class e {
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
	constructor(e, t, n = new E()) {
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
}, O = class e {
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
}, k = class e {
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
}, A = [
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
], j = [
	"alpha",
	"x",
	"y",
	"width",
	"height",
	"scale_x",
	"scale_y",
	"rotate"
], M = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function N(e, t, n = A) {
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
var P = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
function F(e, t, n = A) {
	let r = [];
	for (let { groups: i } of t.matchAll(P)) {
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
		r.push(N(e, d, n));
	}
	return r;
}
function I(e) {
	return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
}
var L = {
	"Back.In": (e) => e === 1 ? 1 : e * e * (2.70158 * e - 1.70158),
	"Back.InOut": (e) => {
		let t = 2.5949095;
		return (e *= 2) < 1 ? .5 * (e * e * (3.5949095 * e - t)) : .5 * ((e -= 2) * e * (3.5949095 * e + t) + 2);
	},
	"Back.Out": (e) => e === 0 ? 0 : --e * e * (2.70158 * e + 1.70158) + 1,
	"Bounce.In": (e) => 1 - I(1 - e),
	"Bounce.InOut": (e) => e < .5 ? (1 - I(1 - e * 2)) * .5 : I(e * 2 - 1) * .5 + .5,
	"Bounce.Out": (e) => I(e),
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
function R(e) {
	if (!e) return "Linear.None";
	if (!L[e]) throw `異常なease指定です：${e}`;
	return e;
}
function z(e) {
	return L[R(e)];
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
	O.setEscape(e);
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
function ee(e) {
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
function W(e) {
	let t = [], n = "", r = "", i, a, o, s, c, l, u = [], d = (e, u, d, f) => {
		let p = n + (c?.style ?? "") + (d?.style ?? ""), m = r + (c?.r_style ?? "") + (d?.r_style ?? ""), h = d?.ch_in_style ?? c?.ch_in_style ?? i, g = d?.ch_out_style ?? c?.ch_out_style ?? a, _ = U(d?.wait) ?? U(c?.wait) ?? o, { ra: v, ruby: y } = u ? J(u) : {
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
	}, f = new O();
	return f.init((e, f) => {
		let p = f ? ee(f) : void 0;
		if (!p) {
			d(e, f);
			return;
		}
		let { o: m } = p;
		switch (p.cmd) {
			case "span":
				n = m.style ?? "", r = m.r_style ?? "", i = m.ch_in_style, a = m.ch_out_style, o = U(m.wait), m.r_align && (s = m.r_align);
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
				...U(m.width) === void 0 ? {} : { gw: U(m.width) },
				...U(m.height) === void 0 ? {} : { gh: U(m.height) },
				...U(m.x) === void 0 ? {} : { gx: U(m.x) },
				...U(m.y) === void 0 ? {} : { gy: U(m.y) }
			}));
		}
	}), f.putTxt(e), t;
}
function G(e) {
	return e.map((e) => e.c).join("");
}
function K(e) {
	return G(W(e));
}
var q = [
	"start",
	"left",
	"center",
	"right",
	"justify",
	"121",
	"even",
	"1ruby"
];
function J(e) {
	let t = e.indexOf("｜");
	if (t > 0) {
		let n = e.slice(0, t);
		if (q.includes(n)) return {
			ra: n,
			ruby: e.slice(t + 1)
		};
	}
	return { ruby: e };
}
//#endregion
//#region src/ts/Log.ts
var Y = 64, X = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), Z = (e) => X(e).replaceAll("'", "&#39;");
function Q(e) {
	return te(W(e));
}
function te(e) {
	let t = "";
	for (let n of e) {
		if (n.c === "\n") {
			t += "<br/>";
			continue;
		}
		let e = X(n.c), r = n.r ? `<ruby>${e}<rt${n.rs ? ` style='${Z(n.rs)}'` : ""}>${X(n.r)}</rt></ruby>` : e, i = (n.s ?? "") + (n.tcy ? "text-combine-upright: all;" : "");
		t += i ? `<span style='${Z(i)}'>${r}</span>` : r;
	}
	return t;
}
var ne = class {
	maxLen;
	#e = [];
	#t = "";
	#n = {};
	constructor(e = () => Y) {
		this.maxLen = e;
	}
	add(e) {
		this.#t += e;
	}
	setAttr(e) {
		this.#n = e;
	}
	pagebreak() {
		let e = Q(this.#t);
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
			text: Q(this.#t)
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
function re(e, t) {
	if ($.has(e)) throw `すでに定義済みのタグ[${e}]です`;
	$.set(e, t);
}
function ie(e) {
	return $.get(e);
}
function ae(e) {
	return $.has(e);
}
function oe() {
	return [...$.keys()];
}
//#endregion
//#region src/ts/ScriptEngine.ts
var se = class r {
	static #e = new S();
	static parseTag(e) {
		let [t, n] = w(e);
		r.#e.parse(n);
		let i = {};
		for (let [e, t] of Object.entries(r.#e.hPrm)) i[e] = t.val;
		return {
			name: t,
			args: i
		};
	}
	#t(e) {
		let [t, n] = w(e), i = r.#e;
		i.parse(n);
		let a = i.hPrm, o = a.cond?.val;
		if (o !== void 0) {
			if (!o || o.startsWith("&")) throw "属性condは「&」が不要です";
			let e = this.#F.parse(o), t = String(e);
			if (!e || t === "null" || t === "undefined" || t === "false") return;
		}
		let s = this.#V.at(-1), c = Object.create(null);
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
			if (r = this.#F.getValAmpersand(r), r !== "undefined") {
				c[e] = r;
				continue;
			}
			n !== void 0 && (r = this.#F.getValAmpersand(n), r !== "undefined" && (c[e] = r));
		}
		return {
			name: t,
			args: c
		};
	}
	static #n(e, n, r) {
		return t(r, `[${e}] ${n}`);
	}
	#r(e, t, n) {
		let i = r.#n(e, t, n);
		if (i <= -1 || i >= 1) return i;
		let { w: a, h: o } = this.#i(), s = t === "left" ? a : o;
		return Number.isFinite(s) ? i * s : i;
	}
	#i() {
		return {
			w: Number(this.#P.get("tmp:const.sn.config.window.width")),
			h: Number(this.#P.get("tmp:const.sn.config.window.height"))
		};
	}
	static #a(e, t, n, i) {
		return n === void 0 ? i : r.#n(e, t, n);
	}
	static #o(e) {
		return e < 0 ? 0 : e > 1 ? 1 : e;
	}
	static #s = /* @__PURE__ */ new Set([
		"playbgm",
		"stopbgm",
		"fadebgm",
		"fadeoutbgm",
		"wl",
		"wb"
	]);
	static #c(e, t) {
		return r.#s.has(e) ? "BGM" : t.buf || "SE";
	}
	static #l = "SYS";
	static #u = 999e3;
	static #d(e, t) {
		let { reg: n, flags: r } = t;
		if (!n) throw `[${e}] regは必須です`;
		return r ? new RegExp(n, r) : new RegExp(n);
	}
	static #f(e) {
		let t = (e ?? "").split(",").map((e) => e.trim()).filter((e) => e !== "");
		return t.length > 0 ? t : null;
	}
	static #p = {
		fill: "color",
		fontSize: "font-size",
		fontFamily: "font-family",
		fontWeight: "font-weight",
		fontStyle: "font-style",
		align: "text-align",
		letterSpacing: "letter-spacing",
		lineHeight: "line-height"
	};
	static #m(e) {
		if (!e.trimStart().startsWith("{")) return e;
		let t;
		try {
			t = JSON.parse(e);
		} catch {
			return e;
		}
		return Object.entries(t).map(([e, t]) => {
			let n = r.#p[e];
			return n ? `${n}: ${typeof t == "number" && n !== "line-height" && n !== "font-weight" ? `${String(t)}px` : String(t)};` : "";
		}).join("");
	}
	static #h = [
		"alpha",
		"x",
		"y",
		"width",
		"height",
		"scale_x",
		"scale_y",
		"rotate"
	];
	static #g = [
		"width",
		"height",
		"rotation",
		"pivot_x",
		"pivot_y",
		"scale_x",
		"scale_y",
		"alpha"
	];
	static #_(e, t) {
		let n = {};
		t.visible !== void 0 && (n.visible = t.visible !== "false");
		for (let i of r.#h) {
			let a = t[i];
			a !== void 0 && Object.assign(n, { [i]: r.#n(e, i, a) });
		}
		return t.b_color !== void 0 && (n.b_color = t.b_color), n;
	}
	static #v(e, t, n) {
		let r = t.path ? F(e, t.path, n) : void 0;
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
	static #y(e, t, n) {
		let r = t.page ?? n;
		if (r === "fore" || r === "back" || r === "both") return r;
		throw `[${e}] 属性 page【${r}】が不正です`;
	}
	#b;
	#x = 0;
	#S = "mes";
	#C = Object.create(null);
	#w = Object.create(null);
	#T(e) {
		return e === "back" ? this.#w : this.#C;
	}
	#E = !1;
	get clearOnResume() {
		return this.#E;
	}
	set clearOnResume(e) {
		this.#E = e;
	}
	#D = Object.create(null);
	#O = Object.create(null);
	#k = Object.create(null);
	#A = Object.create(null);
	#j(e, t) {
		this.#A[e] = t, this.#P.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#A));
	}
	#M(e) {
		e in this.#A && (delete this.#A[e], this.#P.setNochk(`save:const.sn.sound.${e}.fn`, "")), this.#P.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#A));
	}
	#N = 1;
	resetVolMulTalking() {
		this.#N = 1;
	}
	#P = new _();
	#F = new b(this.#P);
	#I() {
		return !!this.#P.get("mp:const.sn.macro");
	}
	#L = new ne(() => {
		let e = Number(this.#P.get("tmp:const.sn.config.log.max_len"));
		return Number.isFinite(e) && e > 0 ? e : 64;
	});
	get #R() {
		return this.#P.get("game:sn.doRecLog") === !0;
	}
	get chWait() {
		let e = this.#P.get("tmp:const.sn.isKidoku") === !0;
		if (this.#P.get(e ? "sys:sn.tagCh.doWait_Kidoku" : "sys:sn.tagCh.doWait") === !1) return 0;
		let t = Number(this.#P.get(e ? "sys:sn.tagCh.msecWait_Kidoku" : "sys:sn.tagCh.msecWait"));
		return Number.isFinite(t) && t >= 0 ? t : 10;
	}
	#z = {
		in: /* @__PURE__ */ new Set([s]),
		out: /* @__PURE__ */ new Set([s])
	};
	#B = [];
	#V = [];
	#H = Object.create(null);
	#U = Object.create(null);
	#W = Object.create(null);
	#G = !1;
	#K = Object.create(null);
	static REG_NG4MAC_NM = /["'#;\\\]　]+/;
	static RESERVED_TAGS = /* @__PURE__ */ new Set(/* @__PURE__ */ "add_lay.current.add_face.lay.clear_lay.trans.wt.finish_trans.set_cancel_skip.let.let_ml.endlet_ml.let_abs.let_char_at.let_index_of.let_length.let_replace.let_round.let_search.let_substr.tsy.tsy_frame.wait_tsy.stop_tsy.pause_tsy.resume_tsy.quake.stop_quake.wq.title.toggle_full_screen.dump_lay.dump_val.dump_stack.pop_stack.clear_text.rec_ch.rec_r.reset_rec.ch_in_style.ch_out_style.autowc.navigate_to.loadplugin.snapshot.close.update_check.window.record_place.save.load.reload_script.copybookmark.erasebookmark.export.import.add_frame.frame.set_frame.let_frame.set_focus.add_filter.clear_filter.enable_filter.def_fx.add_fx.clear_fx.wait_fx.pause_fx.resume_fx.if.elsif.else.endif.r.er.trace.log.jump.call.return.macro.endmacro.char2macro.bracket2macro.button.event.clear_event.enable_event.clearvar.clearsysvar.page.wait.waitclick.l.p.s.ch.endlink.graph.link.ruby2.span.tcy.fadebgm.fadeoutbgm.fadeoutse.fadese.playbgm.playse.stop_allse.stopbgm.stopfadese.stopse.volume.wb.wf.wl.ws.xchgbuf.wv".split("."));
	#q() {
		let e = Object.create(null);
		for (let t of r.RESERVED_TAGS) e[t] = !0;
		for (let t of oe()) e[t] = !0;
		for (let t in this.#K) e[t] = !0;
		return e;
	}
	static registerPlgTag(e, t) {
		if (r.RESERVED_TAGS.has(e)) throw `[${e}]は既存タグ名のため、プラグインタグとして登録できません`;
		re(e, t);
	}
	constructor(t, n = "") {
		this.#b = t instanceof D ? t : new D(t, n), this.#P.defBuiltin("const.sn.scriptFn", () => this.fn), this.#P.defBuiltin("const.sn.isKidoku", () => this.#G), this.#P.defBuiltin("const.sn.displayState", () => this.#J), this.#P.defBuiltin("const.Date.getDateStr", () => e()), this.#P.defBuiltin("const.Date.getTime", () => (/* @__PURE__ */ new Date()).getTime()), this.#P.defBuiltin("const.sn.last_page_plain_text", () => K(this.#C[this.#S] ?? "")), this.#P.defBuiltin("const.sn.last_page_text", () => this.#C[this.#S] ?? ""), this.#P.defBuiltin("const.sn.log.json", () => this.#L.json()), this.#P.defBuiltin("const.sn.key.alternate", () => this.#Y.Alt === !0), this.#P.defBuiltin("const.sn.key.command", () => this.#Y.Meta === !0), this.#P.defBuiltin("const.sn.key.control", () => this.#Y.Control === !0), this.#P.defBuiltin("const.sn.key.end", () => this.#Y.End === !0), this.#P.defBuiltin("const.sn.key.escape", () => this.#Y.Escape === !0), this.#P.defBuiltin("const.sn.key.back", () => !1), this.#P.defBuiltin("const.sn.Math.PI", () => Math.PI), this.#P.defBuiltin("const.sn.aIfStk.length", () => this.#B.length), this.#P.defBuiltin("const.sn.vctCallStk.length", () => this.#V.length), this.#P.setNochk("save:const.sn.mesLayer", this.#S);
	}
	#J = !1;
	setFullScr(e) {
		this.#J = e;
	}
	#Y = Object.create(null);
	setKeyDown(e, t) {
		this.#Y[e] = t;
	}
	clearKeyDown() {
		this.#Y = Object.create(null);
	}
	switchScript(e, t = "", n = 0) {
		if (this.#b = e, !t) {
			this.#x = n;
			return;
		}
		let r = e.label2idx(t, n, this.#I());
		if (r === void 0) throw `ラベル【${t}】がスクリプト【${e.fn}】に見つかりません`;
		this.#x = r;
	}
	getVal(e) {
		return this.#P.get(e);
	}
	setValNochk(e, t) {
		this.#P.setNochk(e, t);
	}
	defSetTrigger(e, t) {
		this.#P.defSetTrigger(e, t);
	}
	defSetTriggerSoundVol(e) {
		this.#P.defSetTriggerSoundVol(e);
	}
	defBuiltin(e, t) {
		this.#P.defBuiltin(e, t);
	}
	get fn() {
		return this.#b.fn;
	}
	get idx() {
		return this.#x;
	}
	get lineNum() {
		return this.#b.aLNum[Math.min(this.#x, this.#b.len - 1)] ?? NaN;
	}
	get atEnd() {
		return this.#x >= this.#b.len;
	}
	peekUpcomingPicFn() {
		let e = [], t = new Map(Object.entries(this.#D).map(([e, t]) => [e, t.fn]));
		for (let n = this.#x; n < this.#b.len; ++n) {
			let i = this.#b.aToken[n];
			if (i.charCodeAt(0) !== 91) continue;
			let { name: a, args: o } = r.parseTag(i);
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
		let t = this.#b.label2idx(e, this.#x, this.#I());
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#x = t;
	}
	callToLabel(e, t = !0) {
		let n = this.#b.label2idx(e, this.#x, this.#I());
		if (n === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#re(--this.#x), t && (this.#E = !1), this.#x = n;
	}
	callToScript(e, t = "", n = !0) {
		this.#re(--this.#x), n && (this.#E = !1), this.switchScript(e, t);
	}
	nowScrIdx() {
		let e = this.#V[0];
		return e ? {
			fn: e.fn,
			idx: e.returnIdx
		} : {
			fn: this.fn,
			idx: this.#x
		};
	}
	recordPlace() {
		let { fn: e, idx: t } = this.nowScrIdx();
		this.#P.setNochk("save:const.sn.scriptFn", e), this.#P.setNochk("save:const.sn.scriptIdx", t);
	}
	nowMarkPart() {
		return this.#P.setNochk("save:const.sn.sLog", this.#L.json()), {
			hSave: this.#P.cloneNs("game"),
			aIfStk: this.#B.slice(this.#V.length),
			hTxt: { ...this.#C },
			hTxtBk: { ...this.#w }
		};
	}
	restoreMarkPart(e) {
		this.#P.setNs("game", e.hSave), this.#C = { ...e.hTxt }, this.#w = { ...e.hTxtBk }, this.#S = String(this.#P.get("save:const.sn.mesLayer") ?? this.#S), this.#L.playback(String(this.#P.get("save:const.sn.sLog") ?? "[]")), this.#P.setMp({}), this.#B.length = 0, this.#B.push(...e.aIfStk), this.#V.length = 0, this.clearEvent();
		for (let e of Object.keys(this.#A)) delete this.#A[e];
		try {
			let e = JSON.parse(String(this.#P.get("save:const.sn.loopPlaying", "{}")));
			Object.assign(this.#A, e);
		} catch {}
	}
	cloneSys() {
		return this.#P.cloneNs("sys");
	}
	setSys(e) {
		this.#P.setNs("sys", e);
	}
	transDone(e) {
		for (let t of Object.keys(this.#C)) e && !e.includes(t) || (this.#C[t] = this.#w[t] ?? "");
	}
	get isKidoku() {
		return this.#G;
	}
	#X() {
		let e = this.#W[this.fn] ??= new k();
		if (this.#V.length > 0) {
			e.record(this.#x);
			return;
		}
		this.#G = e.search(this.#x), !this.#G && e.record(this.#x);
	}
	#Z() {
		this.#W[this.fn]?.erase(this.#x), this.#G = !1;
	}
	getKidoku() {
		let e = {};
		for (let [t, n] of Object.entries(this.#W)) e[t] = n.val();
		return e;
	}
	setKidoku(e) {
		for (let e in this.#W) delete this.#W[e];
		this.#G = !1;
		for (let [t, n] of Object.entries(e)) this.#W[t] = k.from(n);
	}
	clearKidoku() {
		for (let e of Object.values(this.#W)) e.clear();
		this.#G = !1;
	}
	get autoEnabled() {
		return this.#Q("sn.auto.enabled");
	}
	get skipEnabled() {
		return this.#Q("sn.skip.enabled");
	}
	get skipAll() {
		return this.#Q("sn.skip.all");
	}
	#Q(e) {
		return this.#P.get(`tmp:${e}`) === !0;
	}
	get tagLEnabled() {
		return this.#P.get("tmp:sn.tagL.enabled") !== !1;
	}
	cancelAutoSkip() {
		this.#P.set("tmp:sn.skip.enabled", !1), this.#P.set("tmp:sn.skip.all", !1), this.#P.set("tmp:sn.auto.enabled", !1), this.tagLEnabled || this.#P.set("tmp:sn.tagL.enabled", !0);
	}
	get isNextKidoku() {
		let e = this.fn, t = this.#x, n = this.#b.len, r = this.#V.at(-1);
		return r && (e = r.fn, t = r.returnIdx, n = r.scr.len), t >= n ? !1 : this.#W[e]?.search(t) ?? !1;
	}
	#$(e) {
		if (e === "s" || e === "waitclick") {
			this.cancelAutoSkip();
			return;
		}
		if (this.autoEnabled) return {
			mode: "auto",
			msec: this.#te(e === "p")
		};
		if (this.skipEnabled) {
			if (!this.skipAll && !this.isNextKidoku) {
				this.cancelAutoSkip();
				return;
			}
			return e === "p" && this.#ee() !== "s" ? void 0 : {
				mode: "skip",
				msec: 0
			};
		}
	}
	#ee() {
		let e = this.#P.get("sys:sn.skip.mode");
		return e == null ? "s" : String(e);
	}
	#te(e) {
		let t = e ? "sn.auto.msecPageWait" : "sn.auto.msecLineWait", n = Number(this.#P.get(`sys:${t}${this.isKidoku ? "_Kidoku" : ""}`));
		return Number.isFinite(n) && n > 0 ? n : e ? 3500 : 500;
	}
	getEvent(e) {
		let t = e.toLowerCase();
		return this.#H[t] ?? this.#U[t];
	}
	clearEvent(e = !1) {
		if (!e) {
			this.#H = Object.create(null);
			return;
		}
		for (let e in this.#U) delete this.#U[e];
	}
	#ne() {
		let e = this.#H;
		return this.#H = Object.create(null), e;
	}
	beginEvent(e) {
		let t = this.getEvent(e);
		if (t) return this.#P.set("tmp:sn.eventArg", t.arg), this.#P.set("tmp:sn.eventLabel", t.label), t.call || this.clearEvent(), t;
	}
	#re(e, t = !0, n = {}) {
		this.#V.push({
			fn: this.fn,
			returnIdx: e,
			lenIfStk: this.#B.length,
			hMp: this.#P.cloneMp(),
			hArgs: n,
			scr: this.#b,
			...t ? { hEvt: this.#ne() } : {}
		}), this.#B.push(-1);
	}
	step() {
		let e = [];
		for (this.#E && (this.#E = !1, this.#ge(), this.#C[this.#S] = "", e.push({
			t: "chgStr",
			nm: this.#S,
			page: "fore",
			str: "",
			hard: !0
		})); this.#x < this.#b.len;) {
			this.#X();
			let t = this.#b.aToken[this.#x++], n = t.charCodeAt(0);
			if (n === 9 || n === 10) continue;
			if (n === 91) {
				let n = this.#t(t);
				if (!n) continue;
				let { name: r, args: i } = n;
				if (this.#se(r, i, e) === "stop") return e;
				continue;
			}
			let r = t, i = this.#b.grm.ce, a = !!i && t.length > 1 && t.startsWith(i);
			if (!a && n === 38) {
				if (!t.endsWith("&")) {
					this.#ie(t);
					continue;
				}
				if (t.charAt(1) === "&") throw "「&表示&」書式では「&」指定が不要です";
				let e = this.#F.parse(t.slice(1, -1));
				r = e == null ? "" : String(e);
			} else if (!a && n === 59) continue;
			else if (!a && n === 42 && t.length > 1) continue;
			this.#he(e, r);
		}
		return e;
	}
	#ie(e) {
		let { name: t, text: n, cast: r } = T(e.slice(1));
		this.#P.set(this.#F.getValAmpersand(t.trim()), this.#F.parse(n), r ?? "");
	}
	#ae(e, t, n, i = !1) {
		let a = e.layer ?? "", s = this.#k[a] ?? "txt", c = s !== "grp" && s !== "txt";
		if (!c) {
			let r = e.fn || e.pic;
			if (r) {
				let i = {
					t: "chgPic",
					nm: a,
					page: n,
					fn: r
				};
				if (e.face !== void 0) {
					let t = [];
					if (e.face) for (let n of e.face.split(",")) {
						if (!n) throw "[lay] face属性に空要素が含まれています";
						t.push(this.#D[n] ?? {
							fn: n,
							dx: 0,
							dy: 0,
							blendmode: o("normal")
						});
					}
					i.aFace = t;
				}
				t.push(i);
			}
			if (e.back_clear !== void 0) e.back_clear === "true" && t.push({
				t: "chgBackClear",
				nm: a,
				page: n
			});
			else {
				if (e.b_alpha !== void 0 || e.b_alpha_isfixed !== void 0) {
					let r = {
						t: "chgBAlpha",
						nm: a,
						page: n
					};
					if (e.b_alpha !== void 0) {
						let t = Number(e.b_alpha);
						if (Number.isNaN(t)) throw `[lay] b_alphaの値が不正です：${e.b_alpha}`;
						r.b_alpha = Math.min(1, Math.max(0, t));
					}
					e.b_alpha_isfixed !== void 0 && (r.isFixed = e.b_alpha_isfixed !== "false"), t.push(r);
				}
				e.b_pic !== void 0 && t.push({
					t: "chgBPic",
					nm: a,
					page: n,
					fn: e.b_pic
				});
			}
		}
		let l = {};
		if (e.visible !== void 0 && (l.visible = e.visible !== "false"), e.alpha !== void 0 && (l.alpha = r.#n("lay", "alpha", e.alpha)), !(!c && e.pos === "stay")) {
			if (!c && e.pos !== void 0) {
				let t = e.pos, { w: n, h: i } = this.#i();
				t === "" || t === "c" ? (l.left = n / 2, l.align_x = "center") : t === "l" ? l.left = 0 : t === "r" ? (l.left = n, l.align_x = "right") : (l.left = r.#n("lay", "pos", t), l.align_x = "center"), l.top = i, l.align_y = "bottom";
			} else if (e.left === void 0 ? e.center === void 0 ? e.right === void 0 ? e.s_right !== void 0 && (l.s_right = this.#r("lay", "left", e.s_right)) : (l.left = this.#r("lay", "left", e.right), l.align_x = "right") : (l.left = this.#r("lay", "left", e.center), l.align_x = "center") : l.left = this.#r("lay", "left", e.left), e.top === void 0 ? e.middle === void 0 ? e.bottom === void 0 ? e.s_bottom !== void 0 && (l.s_bottom = this.#r("lay", "top", e.s_bottom)) : (l.top = this.#r("lay", "top", e.bottom), l.align_y = "bottom") : (l.top = this.#r("lay", "top", e.middle), l.align_y = "middle") : l.top = this.#r("lay", "top", e.top), (e.fn !== void 0 || e.pic !== void 0 || e.face !== void 0) && !("left" in l) && !("s_right" in l) && !("top" in l) && !("s_bottom" in l) && s === "grp") {
				let { w: e, h: t } = this.#i();
				l.left = e / 2, l.align_x = "center", l.top = t, l.align_y = "bottom";
			}
		}
		if (i && c && !("left" in l) && !("s_right" in l) && !("top" in l) && !("s_bottom" in l) && e.width === void 0 && e.height === void 0) {
			let { w: e, h: t } = this.#i();
			l.left = 0, l.top = 0, l.width = e, l.height = t;
		}
		if (e.width !== void 0 && (l.width = r.#n("lay", "width", e.width)), e.height !== void 0 && (l.height = r.#n("lay", "height", e.height)), e.rotation !== void 0 && (l.rotation = r.#n("lay", "rotation", e.rotation)), e.scale_x !== void 0 && (l.scale_x = r.#n("lay", "scale_x", e.scale_x)), e.scale_y !== void 0 && (l.scale_y = r.#n("lay", "scale_y", e.scale_y)), e.pivot_x !== void 0 && (l.pivot_x = r.#n("lay", "pivot_x", e.pivot_x)), e.pivot_y !== void 0 && (l.pivot_y = r.#n("lay", "pivot_y", e.pivot_y)), e.blendmode !== void 0 && (l.blendmode = o(e.blendmode)), !c) {
			if (e.b_color !== void 0 && e.back_clear !== "true" && (l.b_color = r.#n("lay", "b_color", e.b_color)), e.style !== void 0 && (l.style = e.style), e.pl !== void 0 && (l.pl = r.#n("lay", "pl", e.pl)), e.pr !== void 0 && (l.pr = r.#n("lay", "pr", e.pr)), e.pt !== void 0 && (l.pt = r.#n("lay", "pt", e.pt)), e.pb !== void 0 && (l.pb = r.#n("lay", "pb", e.pb)), e.ffs !== void 0 && (l.ffs = e.ffs), e.noffs !== void 0 && (l.noffs = e.noffs), e.bura !== void 0 && (l.bura = e.bura !== "false"), e.kinsoku_sol !== void 0 && (l.kinsoku_sol = e.kinsoku_sol), e.kinsoku_eol !== void 0 && (l.kinsoku_eol = e.kinsoku_eol), e.kinsoku_dns !== void 0 && (l.kinsoku_dns = e.kinsoku_dns), e.kinsoku_bura !== void 0 && (l.kinsoku_bura = e.kinsoku_bura), e.break_fixed !== void 0 && (l.break_fixed = e.break_fixed !== "false"), e.break_fixed_left !== void 0 && (l.break_fixed_left = r.#n("lay", "break_fixed_left", e.break_fixed_left)), e.break_fixed_top !== void 0 && (l.break_fixed_top = r.#n("lay", "break_fixed_top", e.break_fixed_top)), O.setting(e), e.r_align !== void 0) {
				if (!q.includes(e.r_align)) throw `[lay] r_alignの値が不正です：${e.r_align}`;
				l.r_align = e.r_align;
			}
			e.in_style !== void 0 && (l.in_style = e.in_style), e.out_style !== void 0 && (l.out_style = e.out_style);
		}
		let d = l.left !== void 0 && l.align_x === void 0, f = l.top !== void 0 && l.align_y === void 0, p = d ? f ? "xy" : "x" : f ? "y" : void 0;
		Object.keys(l).length > 0 && t.push({
			t: "chgLay",
			nm: a,
			page: n,
			sty: l,
			...p ? { reposition: p } : {}
		}), e.filter !== void 0 && t.push({
			t: "addFilter",
			aLayNm: [a],
			page: n,
			flt: u(e),
			replace: !0
		}), c && t.push({
			t: "layPlg",
			nm: a,
			page: n,
			hArg: { ...e }
		});
	}
	#oe(e, t) {
		let n = e.layer ?? "";
		if ((e.float ?? "false") !== "false") t.push({
			t: "moveLay",
			nm: n,
			mode: "float"
		});
		else if (e.index) {
			let i = r.#n("lay", "index", e.index);
			i && t.push({
				t: "moveLay",
				nm: n,
				mode: "index",
				index: i
			});
		} else e.dive && t.push({
			t: "moveLay",
			nm: n,
			mode: "dive",
			dive: e.dive
		});
	}
	#se(e, t, a) {
		let s = this.#b.len;
		switch (e) {
			case "add_lay": {
				let e = t.layer ?? t.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let n = (t.class ?? "txt").toLowerCase();
				if (!f(n)) throw `[add_lay] 属性 class【${n}】が不正です。レイヤクラスが登録されていません`;
				let r = n !== "grp" && n !== "txt";
				this.#k[e] = n, this.#C[e] = "", this.#w[e] = "", n === "txt" && this.#P.setNochk(`save:const.sn.layer.${e}.enabled`, !0), a.push({
					t: "addLay",
					cls: n,
					nm: e
				});
				let i = t.layer === void 0 ? {
					...t,
					layer: e
				} : t;
				return this.#ae(i, a, "fore", !0), this.#ae(i, a, "back", !0), this.#oe(i, a), r ? "stop" : "skip";
			}
			case "current": {
				let e = t.layer ?? t.nm ?? this.#S;
				return e !== this.#S && this.#ge(), this.#S = e, this.#P.setNochk("save:const.sn.mesLayer", this.#S), "skip";
			}
			case "add_face": {
				let e = t.name ?? "";
				if (!e) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#D[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
				return this.#D[e] = {
					fn: t.fn || e,
					dx: Number(t.dx || "0"),
					dy: Number(t.dy || "0"),
					blendmode: o(t.blendmode || "normal")
				}, "skip";
			}
			case "lay": {
				let e = r.argPage(t, "fore");
				this.#ae(t, a, e), this.#oe(t, a);
				let n = this.#k[t.layer ?? ""] ?? "txt";
				return n !== "grp" && n !== "txt" ? "stop" : "skip";
			}
			case "add_filter": return a.push({
				t: "addFilter",
				aLayNm: r.#f(t.layer),
				page: r.#y("add_filter", t, "fore"),
				flt: u(t),
				replace: !1
			}), "skip";
			case "clear_filter": return a.push({
				t: "clearFilter",
				aLayNm: r.#f(t.layer),
				page: r.#y("clear_filter", t, "fore")
			}), "skip";
			case "enable_filter": return a.push({
				t: "enableFilter",
				aLayNm: r.#f(t.layer),
				page: r.#y("enable_filter", t, "fore"),
				index: r.#a("enable_filter", "index", t.index, 0),
				enabled: (t.enabled ?? "true") !== "false"
			}), "skip";
			case "def_fx": {
				let e = t.name ?? "";
				if (!e) throw "[def_fx] nameは必須です";
				let n = t.glsl ?? "";
				if (!n) throw "[def_fx] glsl=（フラグメントシェーダ）は必須です";
				if (p.includes(e)) throw `[def_fx] name【${e}】は組み込みプリセット名なので使えません`;
				if (e in this.#O) throw `[def_fx] name【${e}】は既に定義済みです`;
				let i = r.#a("def_fx", "duration", t.duration, 0);
				if (i < 0) throw `[def_fx] durationは0以上にしてください：${i}`;
				return this.#O[e] = i, a.push({
					t: "defFx",
					name: e,
					glsl: n
				}), "skip";
			}
			case "add_fx": return a.push({
				t: "addFx",
				aLayNm: r.#f(t.layer),
				page: r.#y("add_fx", t, "fore"),
				fx: m(t, this.#O)
			}), "skip";
			case "clear_fx": return a.push({
				t: "clearFx",
				aLayNm: r.#f(t.layer),
				page: r.#y("clear_fx", t, "fore"),
				names: r.#f(t.name)
			}), "skip";
			case "wait_fx": {
				let e = r.#f(t.layer), n = r.#f(t.name);
				if (!e && !n) throw "[wait_fx] layer= か name= のどちらかが必要です";
				return a.push({
					t: "waitFx",
					aLayNm: e,
					names: n,
					canskip: (t.canskip ?? "true") !== "false"
				}), "stop";
			}
			case "pause_fx":
			case "resume_fx": {
				let n = r.#f(t.layer), i = r.#f(t.name);
				if (!n && !i) throw `[${e}] layer= か name= のどちらかが必要です`;
				let o = t.index === void 0 ? null : r.#n(e, "index", t.index);
				if (o !== null && !n) throw `[${e}] index= は layer= と併用してください`;
				return a.push({
					t: "enableFx",
					aLayNm: n,
					names: i,
					index: o,
					enabled: e === "resume_fx"
				}), "skip";
			}
			case "clear_lay": {
				let e = r.#y("clear_lay", t, "fore"), n = r.#f(t.layer);
				if (t.layer !== void 0 && n === null) throw "[clear_lay] layer属性が空です";
				if (e !== "back") {
					if ((!n || n.includes(this.#S)) && this.#ge(), n) for (let e of n) this.#C[e] = "";
					else for (let e of Object.keys(this.#C)) this.#C[e] = "";
				}
				if (e !== "fore") {
					if (n) for (let e of n) this.#w[e] = "";
					else for (let e of Object.keys(this.#w)) this.#w[e] = "";
				}
				return a.push({
					t: "clearLay",
					aLayNm: n,
					page: e
				}), "skip";
			}
			case "trans": {
				let e = t.layer ?? "", n = e ? e.split(",").map((e) => e.trim()).filter((e) => e !== "") : null;
				if (n?.length === 0) throw "[trans] layer属性が空です";
				let i = Number(t.time ?? "0");
				if (!Number.isFinite(i) || i < 0) throw `[trans] timeの値が不正です：${t.time ?? ""}`;
				return a.push({
					t: "trans",
					aLayNm: n,
					time: this.skipEnabled ? 0 : i,
					...t.rule === void 0 ? {} : { rule: t.rule },
					...t.vague === void 0 ? {} : { vague: r.#n("trans", "vague", t.vague) },
					...t.glsl === void 0 ? {} : { glsl: t.glsl }
				}), "skip";
			}
			case "wt": return a.push({
				t: "waitTrans",
				canskip: (t.canskip ?? "true") !== "false"
			}), "stop";
			case "finish_trans": return a.push({ t: "finishTrans" }), "skip";
			case "set_cancel_skip": return "skip";
			case "quake": {
				let e = this.skipEnabled ? 0 : r.#n("quake", "time", t.time ?? "");
				return e <= 0 || a.push({
					t: "quake",
					msec: e,
					hmax: n(r.#a("quake", "hmax", t.hmax, 10)),
					vmax: n(r.#a("quake", "vmax", t.vmax, 10))
				}), "skip";
			}
			case "stop_quake": return a.push({ t: "stopQuake" }), "skip";
			case "wq": return a.push({
				t: "waitQuake",
				canskip: (t.canskip ?? "true") !== "false"
			}), "stop";
			case "tsy": {
				let { layer: e } = t;
				if (!e) throw "[tsy] layerは必須です";
				let n = this.skipEnabled, i = n ? 0 : r.#n("tsy", "time", t.time ?? ""), o = n ? 0 : r.#a("tsy", "delay", t.delay, 0), s = r.#a("tsy", "repeat", t.repeat, 1), c = r.argPage(t, "fore");
				return t.filter !== void 0 && a.push({
					t: "addFilter",
					aLayNm: [e],
					page: c,
					flt: u(t),
					replace: !0
				}), a.push({
					t: "tsy",
					tw_nm: B("tsy", t),
					nm: e,
					page: c,
					msec: i,
					delay: o,
					ease: R(t.ease),
					repeat: s > 0 ? s - 1 : Infinity,
					yoyo: (t.yoyo ?? "false") !== "false",
					hTo: N("tsy", t),
					backlay: (t.backlay ?? "false") !== "false",
					...r.#v("tsy", t)
				}), "skip";
			}
			case "tsy_frame": {
				let { id: e } = t;
				if (!e) throw "[tsy_frame] idは必須です";
				this.#ce("tsy_frame", e);
				let n = this.skipEnabled, i = r.#a("tsy_frame", "repeat", t.repeat, 1);
				return a.push({
					t: "tsyFrame",
					tw_nm: B("tsy_frame", t),
					id: e,
					msec: n ? 0 : r.#n("tsy_frame", "time", t.time ?? ""),
					delay: n ? 0 : r.#a("tsy_frame", "delay", t.delay, 0),
					ease: R(t.ease),
					repeat: i > 0 ? i - 1 : Infinity,
					yoyo: (t.yoyo ?? "false") !== "false",
					hTo: N("tsy_frame", t, j),
					...r.#v("tsy_frame", t, j)
				}), "skip";
			}
			case "wait_tsy": return a.push({
				t: "waitTsy",
				tw_nm: B("wait_tsy", t),
				canskip: (t.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return a.push({
				t: "stopTsy",
				tw_nm: B("stop_tsy", t)
			}), "skip";
			case "pause_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: B("pause_tsy", t),
				paused: !0
			}), "skip";
			case "resume_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: B("resume_tsy", t),
				paused: !1
			}), "skip";
			case "let":
				if (t.text === void 0) throw `[let] textは必須です（name:${t.name ?? ""}）`;
				return this.#le("let", t, t.text), "skip";
			case "let_abs": {
				let e = r.#a("let_abs", "text", t.text, 0);
				return this.#le("let_abs", t, String(e < 0 ? -e : e)), "skip";
			}
			case "let_round": {
				let e = r.#a("let_round", "text", t.text, 0);
				return this.#le("let_round", t, String(Math.round(e))), "skip";
			}
			case "let_length": return this.#le("let_length", t, String((t.text ?? "").length)), "skip";
			case "let_char_at": {
				let e = r.#a("let_char_at", "pos", t.pos, 0);
				return this.#le("let_char_at", t, (t.text ?? "").charAt(e)), "skip";
			}
			case "let_index_of": {
				let { val: e } = t;
				if (!e) throw "[let_index_of] valは必須です";
				let n = r.#a("let_index_of", "start", t.start, 0);
				return this.#le("let_index_of", t, String((t.text ?? "").indexOf(e, n))), "skip";
			}
			case "let_substr": {
				let e = r.#a("let_substr", "pos", t.pos, 0), n = t.text ?? "";
				return this.#le("let_substr", t, t.len === "all" ? n.slice(e) : n.slice(e, e + i(r.#a("let_substr", "len", t.len, 1)))), "skip";
			}
			case "let_replace": return this.#le("let_replace", t, (t.text ?? "").replace(r.#d("let_replace", t), String(t.val))), "skip";
			case "let_search": return this.#le("let_search", t, String((t.text ?? "").search(r.#d("let_search", t)))), "skip";
			case "let_ml": {
				let e = t.name ?? "";
				if (!e) throw "[let_ml] nameは必須です";
				let n = "";
				for (; this.#x < s && (n = this.#b.aToken[this.#x], n === ""); ++this.#x);
				if (this.#b.grm.testTagEndLetml(n)) return this.#P.set(e, "", "str"), ++this.#x, "skip";
				if (!this.#b.grm.testTagEndLetml(this.#b.aToken[this.#x + 1] ?? "")) throw `[let_ml] 変数【${e}】の終端・[endlet_ml]がありません`;
				return this.#P.set(e, n, "str"), this.#x += 2, "skip";
			}
			case "endlet_ml": return "skip";
			case "if": return this.#ue(t), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#de(), "skip";
			case "r": {
				let { nm: e, page: n } = this.#me(t);
				return this.#he(a, "\n", !0, e, n), "skip";
			}
			case "er": return (t.rec_page_break ?? "true") !== "false" && this.#ge(), this.#C[this.#S] = "", this.#w[this.#S] = "", a.push({
				t: "chgStr",
				nm: this.#S,
				page: "both",
				str: "",
				hard: !0
			}), a.push({
				t: "clearTxtLay",
				nm: this.#S,
				page: "both",
				clearFilter: t.clear_filter === "true"
			}), "skip";
			case "span": {
				if (t.r_align !== void 0 && !q.includes(t.r_align)) throw `[span] r_alignの値が不正です：${t.r_align}`;
				let { nm: e, page: n } = this.#me(t);
				if (t.in_style !== void 0 || t.out_style !== void 0) {
					let r = {};
					t.in_style !== void 0 && (r.in_style = t.in_style), t.out_style !== void 0 && (r.out_style = t.out_style), a.push({
						t: "chgLay",
						nm: e,
						page: n,
						sty: r
					});
				}
				return this.#he(a, r.#pe("span", {
					...t,
					layer: void 0,
					page: void 0,
					in_style: void 0,
					out_style: void 0
				}), !0, e, n), "skip";
			}
			case "link": {
				if (!t.url && !t.label && !t.fn) throw "[link] fn・label・urlのいずれかは必須です";
				t.clickse !== void 0 && (t.clicksebuf = t.clicksebuf || r.#l), t.enterse !== void 0 && (t.entersebuf = t.entersebuf || r.#l), t.leavese !== void 0 && (t.leavesebuf = t.leavesebuf || r.#l), t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style;
				let { nm: e, page: n } = this.#me(t);
				return this.#he(a, r.#pe("link", {
					...t,
					layer: void 0,
					page: void 0
				}), !0, e, n), "skip";
			}
			case "endlink": {
				let { nm: e, page: n } = this.#me(t);
				return this.#he(a, r.#pe("endlink", {}), !0, e, n), "skip";
			}
			case "graph": {
				if (!t.pic) throw "[graph] picは必須です";
				let { nm: e, page: n } = this.#me(t);
				return this.#he(a, r.#pe("grp", {
					...t,
					layer: void 0,
					page: void 0
				}), !0, e, n), "skip";
			}
			case "tcy": {
				if (!t.t) throw "[tcy] tは必須です";
				let { nm: e, page: n } = this.#me(t);
				return this.#he(a, r.#pe("tcy", {
					...t,
					layer: void 0,
					page: void 0
				}), !0, e, n), "skip";
			}
			case "ruby2":
			case "ch": {
				if (e === "ruby2") {
					if (!t.t) throw "[ruby2] tは必須です";
					if (!t.r) throw "[ruby2] rは必須です";
					t.text = `｜${encodeURIComponent(t.t)}《${encodeURIComponent(t.r)}》`, delete t.t, delete t.r;
				}
				let { text: n } = t;
				if (!n) throw `[${e}] textは必須です`;
				let { nm: i, page: o } = this.#me(t);
				return this.#he(a, r.#pe("add", {
					...t,
					text: void 0,
					layer: void 0,
					page: void 0
				}) + n.replaceAll("[r]", "\n") + r.#pe("add_close", {}), t.record !== "false", i, o), "skip";
			}
			case "autowc": {
				let e = t.enabled === void 0 ? this.#P.get("game:const.sn.autowc.enabled") === !0 : t.enabled !== "false";
				this.#P.setNochk("save:const.sn.autowc.enabled", e);
				let { text: i } = t;
				if ("text" in t != "time" in t) throw "[autowc] textとtimeは同時指定必須です";
				if (this.#P.setNochk("save:const.sn.autowc.text", i ?? ""), !i) return this.#P.setNochk("save:const.sn.autowc.time", ""), a.push({
					t: "autowc",
					enabled: e,
					hWait: {}
				}), "skip";
				let o = Array.from(i), s = String(t.time ?? "").split(",");
				if (s.length !== o.length) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
				let c = {};
				return o.forEach((e, t) => {
					c[e] = n(r.#n("autowc", "time", s[t] ?? ""));
				}), this.#P.setNochk("save:const.sn.autowc.time", t.time ?? ""), a.push({
					t: "autowc",
					enabled: e,
					hWait: c
				}), "skip";
			}
			case "ch_in_style":
			case "ch_out_style": {
				let n = e === "ch_in_style" ? "in" : "out", { name: r, sty: i } = c(e, t, n === "in");
				if (this.#z[n].has(r)) throw `[${e}] name【${r}】はすでにあります`;
				return this.#z[n].add(r), a.push({
					t: "defChStyle",
					kind: n,
					nm: r,
					sty: i
				}), "skip";
			}
			case "rec_ch": {
				let { text: e, ...n } = t;
				return Object.keys(n).length && this.#L.setAttr(n), e && this.#L.add(r.#pe("add", {
					...t,
					text: void 0
				}) + e.replaceAll("[r]", "\n") + r.#pe("add_close", {})), "skip";
			}
			case "rec_r": return this.#L.add("\n"), "skip";
			case "reset_rec": return this.#L.reset(t.text ?? ""), "skip";
			case "trace": return a.push({
				t: "trace",
				text: t.text ?? ""
			}), "skip";
			case "log": return a.push({
				t: "log",
				text: t.text ?? "",
				fn: this.fn,
				lineNum: this.lineNum
			}), "skip";
			case "jump": {
				t.count === "false" && this.#Z();
				let e = t.label ?? "", n = t.fn ?? "";
				if (!e && !n) throw "[jump] fnまたはlabelは必須です";
				if (n && n !== this.fn) return a.push({
					t: "loadScript",
					fn: n,
					label: e,
					idx: 0
				}), "stop";
				let r = this.#b.label2idx(e, this.#x, this.#I());
				if (r === void 0) throw `[jump] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#x = r, "skip";
			}
			case "call": {
				t.count !== "true" && this.#Z();
				let e = t.label ?? "", n = t.fn ?? "";
				if (!e && !n) throw "[call] fnまたはlabelは必須です";
				if (n && n !== this.fn) return this.#re(this.#x, !0, t), a.push({
					t: "loadScript",
					fn: n,
					label: e,
					idx: 0
				}), "stop";
				let r = this.#b.label2idx(e, this.#x, this.#I());
				if (r === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#re(this.#x, !0, t), this.#x = r, "skip";
			}
			case "return": return this.#fe(a, t);
			case "macro": {
				let e = t.name ?? "";
				if (!e) throw "[macro] nameは必須です（試作仕様）";
				if (r.RESERVED_TAGS.has(e)) throw `[${e}]はタグ名のため、マクロ名として使用できません`;
				if (r.REG_NG4MAC_NM.test(e)) throw `[${e}]はマクロ名として異常です`;
				if (e in this.#K) throw `[macro] マクロ【${e}】は既に定義済みです`;
				this.#K[e] = {
					fn: this.fn,
					idx: this.#x
				};
				let n = !1, i = 0, a = !1;
				for (; this.#x < s; ++this.#x) {
					let e = this.#b.aToken[this.#x];
					if (a) {
						this.#b.grm.testTagEndLetml(e) && (a = !1);
						continue;
					}
					if (e.charCodeAt(0) !== 91) continue;
					if (this.#b.grm.testTagLetml(e)) {
						a = !0;
						continue;
					}
					let { name: t } = r.parseTag(e);
					if (t === "macro") {
						++i;
						continue;
					}
					if (t === "endmacro") {
						if (i > 0) {
							--i;
							continue;
						}
						++this.#x, n = !0;
						break;
					}
				}
				if (!n) throw `[macro] マクロ【${e}】が[endmacro]で閉じられていません（試作仕様）`;
				return "skip";
			}
			case "char2macro":
			case "bracket2macro": return this.#b.defC2M(e, t, this.#q(), this.#x), "skip";
			case "endmacro": return this.#fe(a);
			case "button": {
				let e = t.layer || this.#S;
				if (!e) throw "[button] layerは必須です（試作仕様）";
				let n = t.label ?? "", i = t.fn ?? this.fn, { pic: s } = t;
				if (!s && !t.text) throw "[button] textまたはpic属性は必須です";
				let c = t.nm, l = t.call === "true", u = r.argPage(t, "back"), d = {};
				t.left === void 0 ? t.center === void 0 ? t.right === void 0 ? t.s_right !== void 0 && (d.s_right = this.#r("button", "left", t.s_right)) : (d.left = this.#r("button", "left", t.right), d.align_x = "right") : (d.left = this.#r("button", "left", t.center), d.align_x = "center") : d.left = this.#r("button", "left", t.left), t.top === void 0 ? t.middle === void 0 ? t.bottom === void 0 ? t.s_bottom !== void 0 && (d.s_bottom = this.#r("button", "top", t.s_bottom)) : (d.top = this.#r("button", "top", t.bottom), d.align_y = "bottom") : (d.top = this.#r("button", "top", t.middle), d.align_y = "middle") : d.top = this.#r("button", "top", t.top);
				for (let e of r.#g) {
					let n = t[e];
					n !== void 0 && Object.assign(d, { [e]: r.#n("button", e, n) });
				}
				return s || (d.width ??= 100, d.height ??= 30), t.enabled !== void 0 && (d.enabled = t.enabled !== "false"), t.blendmode !== void 0 && (d.blendmode = o(t.blendmode)), t.style !== void 0 && (d.style = r.#m(t.style)), t.style_hover !== void 0 && (d.style_hover = r.#m(t.style_hover)), t.style_clicked !== void 0 && (d.style_clicked = r.#m(t.style_clicked)), t.hint !== void 0 && (d.hint = t.hint), t.hint_style !== void 0 && (d.hint_style = t.hint_style), t.hint_opt !== void 0 && (d.hint_opt = t.hint_opt), s !== void 0 && (d.pic = s), t.b_pic !== void 0 && (d.b_pic = t.b_pic), t.clickse !== void 0 && (d.clickse = t.clickse, d.clicksebuf = t.clicksebuf || r.#l), t.enterse !== void 0 && (d.enterse = t.enterse, d.entersebuf = t.entersebuf || r.#l), t.leavese !== void 0 && (d.leavese = t.leavese, d.leavesebuf = t.leavesebuf || r.#l), t.onenter !== void 0 && (d.onenter = t.onenter), t.onleave !== void 0 && (d.onleave = t.onleave), a.push({
					t: "addBtn",
					layerNm: e,
					page: u,
					text: s ? "" : t.text ?? "",
					label: n,
					call: l,
					...c === void 0 ? {} : { nm: c },
					...i ? { fn: i } : {},
					...t.url === void 0 ? {} : { url: t.url },
					...t.arg === void 0 ? {} : { arg: t.arg },
					...Object.keys(d).length > 0 ? { sty: d } : {}
				}), "skip";
			}
			case "page": {
				if (!("clear" in t || "to" in t || "style" in t)) throw "[page] clear,style,to いずれかは必須です";
				if (t.key !== void 0 && a.push({
					t: "pageKeys",
					aKey: t.key ? t.key.split(",") : []
				}), t.style !== void 0) return a.push({
					t: "pageStyle",
					style: t.style
				}), "skip";
				if (t.clear === "true") return a.push({ t: "clearPageLog" }), "skip";
				if (t.to === void 0) return "skip";
				let e = t.to;
				if (!l.includes(e)) throw `[page] 属性to「${t.to}」は異常です`;
				return a.push({
					t: "pageTo",
					to: e
				}), "stop";
			}
			case "title": {
				let { text: e } = t;
				if (!e) throw "[title] textは必須です";
				return a.push({
					t: "title",
					text: e
				}), "skip";
			}
			case "toggle_full_screen": return a.push(t.key ? {
				t: "fullScrKey",
				key: t.key.toLowerCase()
			} : { t: "toggleFullScr" }), "skip";
			case "navigate_to": {
				let { url: e } = t;
				if (!e) throw "[navigate_to] urlは必須です";
				return a.push({
					t: "navigateTo",
					url: e
				}), "skip";
			}
			case "close": return a.push({ t: "close" }), "skip";
			case "update_check": {
				let { url: e } = t;
				if (!e) throw "[update_check] urlは必須です";
				if (!e.endsWith("/")) throw "[update_check] urlの末尾は/にして下さい";
				return a.push({
					t: "updateCheck",
					url: e
				}), "skip";
			}
			case "window": {
				let e = (e, t) => {
					let n = this.#P.get(`sys:const.sn.nativeWindow.${e}`);
					return n == null ? t : Number(n);
				}, n = (e) => Number(this.#P.get(`tmp:const.sn.config.window.${e}`) ?? 0), i = (e, n, i) => t[e] === void 0 ? t[n] === void 0 ? i : r.#n("window", n, t[n]) : r.#n("window", e, t[e]), o = {
					centering: t.centering === "true",
					x: i("x", "x", e("x", 0)),
					y: i("y", "y", e("y", 0)),
					w: i("width", "w", e("w", n("width"))),
					h: i("height", "h", e("h", n("height")))
				};
				return this.#P.setNochk("sys:const.sn.nativeWindow.x", o.x), this.#P.setNochk("sys:const.sn.nativeWindow.y", o.y), this.#P.setNochk("sys:const.sn.nativeWindow.w", o.w), this.#P.setNochk("sys:const.sn.nativeWindow.h", o.h), a.push({
					t: "window",
					...o
				}), "skip";
			}
			case "loadplugin": {
				let { fn: e } = t;
				if (!e) throw "[loadplugin] fnは必須です";
				if (!e.endsWith(".css")) throw "[loadplugin] サポートされない拡張子です";
				let n = (t.join ?? "true") !== "false";
				return a.push({
					t: "loadPlugin",
					fn: e,
					join: n
				}), n ? "stop" : "skip";
			}
			case "snapshot": return a.push({
				t: "snapshot",
				fn: t.fn ?? "",
				aLayNm: r.#f(t.layer),
				page: r.argPage(t, "fore"),
				width: r.#a("snapshot", "width", t.width, 0),
				height: r.#a("snapshot", "height", t.height, 0),
				smoothing: t.smoothing === "true",
				...t.b_color === void 0 ? {} : { b_color: r.#n("snapshot", "b_color", t.b_color) }
			}), "stop";
			case "clear_text": {
				let e = t.layer || this.#S, n = r.argPage(t, "fore");
				return e === this.#S && n === "fore" && this.#ge(), this.#T(n)[e] = "", a.push({
					t: "chgStr",
					nm: e,
					page: n,
					str: "",
					hard: !0
				}), "skip";
			}
			case "dump_val": return a.push({
				t: "trace",
				text: `[dump_val] ${JSON.stringify(this.#P.dump())}`
			}), "skip";
			case "dump_stack": return a.push({
				t: "trace",
				text: `[dump_stack] ${JSON.stringify({
					now: {
						fn: this.fn,
						idx: this.#x
					},
					aCallStk: this.#V.map((e) => ({
						fn: e.fn,
						returnIdx: e.returnIdx
					})),
					aIfStk: [...this.#B]
				})}`
			}), "skip";
			case "dump_lay": return a.push({
				t: "dumpLay",
				aLayNm: r.#f(t.layer)
			}), "skip";
			case "pop_stack":
				if ((t.clear ?? "false") !== "false") this.#V.length = 0;
				else if (!this.#V.pop()) throw "[pop_stack] スタックが空です";
				return this.#B.length = 0, this.#B.push(-1), this.#P.setMp({}), "skip";
			case "clearvar": return this.#P.clearGame(), "skip";
			case "clearsysvar": return this.#P.clearSys(), this.clearKidoku(), "skip";
			case "record_place": return this.recordPlace(), a.push({ t: "recordPlace" }), "skip";
			case "save": {
				if (t.place === void 0) throw "[save] placeは必須です";
				let e = r.#n("save", "place", t.place), n = {
					text: "",
					...t
				};
				delete n.place, a.push({
					t: "save",
					place: e,
					json: n
				});
				let i = Number(this.#P.get("sys:const.sn.save.place"));
				return e === i && this.#P.setNochk("sys:const.sn.save.place", i + 1), "skip";
			}
			case "load":
				if (t.index === void 0 && "fn" in t != "label" in t) throw "[load] fnとlabelはセットで指定して下さい";
				return a.push({
					t: "load",
					place: r.#a("load", "place", t.place, 0),
					fn: t.fn ?? "",
					label: t.label ?? "",
					...t.index === void 0 ? {} : { index: r.#n("load", "index", t.index) },
					...t.do_rec === void 0 ? {} : { doRec: t.do_rec !== "false" }
				}), "stop";
			case "reload_script": return a.push({ t: "reloadScript" }), "stop";
			case "copybookmark": {
				let e = r.#n("copybookmark", "from", t.from ?? ""), n = r.#n("copybookmark", "to", t.to ?? "");
				return e === n || a.push({
					t: "copyBookmark",
					from: e,
					to: n
				}), "skip";
			}
			case "erasebookmark": return a.push({
				t: "eraseBookmark",
				place: r.#n("erasebookmark", "place", t.place ?? "")
			}), "skip";
			case "export": return a.push({ t: "exportData" }), "skip";
			case "import": return a.push({ t: "importData" }), "skip";
			case "event": {
				let e = t.key ?? "", n = e.toLowerCase();
				if (!n) throw "[event] keyは必須です";
				let r = n.startsWith("dom="), i = t.global === "true" ? this.#U : this.#H;
				if (t.del === "true") {
					if (t.fn || t.label || t.call) throw "[event] fn/label/callとdelは同時指定できません";
					return delete i[n], r && a.push({
						t: "resvDomEvent",
						rawKey: e,
						key: n,
						del: !0,
						needErr: !1
					}), "skip";
				}
				let o = t.label ?? "", s = t.fn ?? this.fn, { url: c } = t;
				if (!c && !o && !t.fn) throw "[event] fn,label いずれかは必須です";
				return i[n] = {
					fn: s,
					label: o,
					call: t.call === "true",
					arg: t.arg ?? "",
					...c ? { url: c } : {}
				}, r && a.push({
					t: "resvDomEvent",
					rawKey: e,
					key: n,
					del: !1,
					needErr: (t.need_err ?? "true") !== "false"
				}), "skip";
			}
			case "set_focus": {
				let { add: e, del: n, to: r } = t, i = (t.need_err ?? "true") !== "false";
				if (e !== void 0 || n !== void 0) {
					let t = e ?? n ?? "";
					if (!t.startsWith("dom=")) throw `[set_focus] add/delは'dom=…'書式のみです：${t}`;
					return a.push({
						t: "setFocus",
						mode: e === void 0 ? "del" : "add",
						rawKey: t,
						needErr: i
					}), "skip";
				}
				if (!r) throw "[set_focus] add か to は必須です";
				if (r !== "null" && r !== "next" && r !== "prev") throw `[set_focus] to【${r}】が不正です`;
				return a.push({
					t: "setFocus",
					mode: r
				}), "skip";
			}
			case "add_frame": {
				let { id: e, src: n } = t;
				if (!e) throw "[add_frame] idは必須です";
				if (!n) throw "[add_frame] srcは必須です";
				if (this.#P.get(`const.sn.frm.${e}`)) throw `[add_frame] frame【${e}】はすでにあります`;
				return a.push({
					t: "addFrame",
					id: e,
					src: n,
					sty: r.#_("add_frame", t)
				}), "stop";
			}
			case "frame": {
				let { id: e } = t;
				if (!e) throw "[frame] idは必須です";
				this.#ce("frame", e);
				let n = (t.float ?? "false") === "false" ? t.index === void 0 ? t.dive ? { mode: "dive" } : void 0 : {
					mode: "index",
					index: r.#n("frame", "index", t.index)
				} : { mode: "float" };
				return a.push({
					t: "frame",
					id: e,
					sty: r.#_("frame", t),
					...n ? { order: n } : {},
					...t.disabled === void 0 ? {} : { disabled: t.disabled !== "false" }
				}), "skip";
			}
			case "set_frame": {
				let { id: e, var_name: n, text: r } = t;
				if (!e) throw "[set_frame] idは必須です";
				if (!n) throw "[set_frame] var_nameは必須です";
				if (!r) throw "[set_frame] textは必須です";
				return this.#ce("set_frame", e), this.#P.setNochk(`const.sn.frm.${e}.${n}`, r), a.push({
					t: "setFrame",
					id: e,
					var_name: n,
					text: r
				}), "skip";
			}
			case "let_frame": {
				let { id: e, var_name: n } = t;
				if (!e) throw "[let_frame] idは必須です";
				if (!n) throw "[let_frame] var_nameは必須です";
				return this.#ce("let_frame", e), a.push({
					t: "letFrame",
					id: e,
					var_name: n,
					fnc: (t.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(t.global === "true"), "skip";
			case "enable_event": {
				let e = t.layer || this.#S, n = (t.enabled ?? "true") !== "false";
				return this.#P.setNochk(`save:const.sn.layer.${e}.enabled`, n), a.push({
					t: "enableEvent",
					nm: e,
					enabled: n
				}), "skip";
			}
			case "wait": {
				let e = r.#n("wait", "time", t.time ?? "");
				return this.skipEnabled ? (!this.skipAll && !this.isNextKidoku && this.cancelAutoSkip(), "skip") : (a.push({
					t: "wait",
					msec: e,
					canskip: (t.canskip ?? "true") !== "false"
				}), "stop");
			}
			case "l":
			case "p":
			case "s":
			case "waitclick": {
				if (e === "l" && !this.tagLEnabled) return "skip";
				e === "p" && (this.#E = !0);
				let n = this.#$(e), i = {};
				for (let n of [
					"x",
					"y",
					"width",
					"height"
				]) {
					let a = t[n];
					a !== void 0 && (i[n] = r.#n(e, n, a));
				}
				return a.push({
					t: "stop",
					kind: e,
					key: `${this.fn}:${String(this.#x)}`,
					nm: this.#S,
					...n ? { resume: n } : {},
					...Object.keys(i).length > 0 ? { mark: i } : {}
				}), "stop";
			}
			case "playse":
			case "playbgm": {
				let n = e === "playbgm", i = !n && (t.canskip ?? "true") !== "false";
				if (this.skipEnabled && i) return "skip";
				let o = r.#c(e, t), s = t.fn ?? "";
				if (!s) throw `[${e}] fnは必須です`;
				let c = n ? !0 : (t.loop ?? "false") !== "false", l = (t.join ?? "true") !== "false", u = r.#a(e, "speed", t.speed, 1), d = r.#a(e, "pan", t.pan, 0), f = r.#a(e, "start_ms", t.start_ms, 0);
				if (f < 0) throw `[${e}] start_ms:${String(f)} が負の値です`;
				let p = r.#a(e, "ret_ms", t.ret_ms, 0);
				if (p < 0) throw `[${e}] ret_ms:${String(p)} が負の値です`;
				let m = r.#a(e, "end_ms", t.end_ms, r.#u);
				if (m > 0) {
					if (m <= f) throw `[${e}] start_ms:${String(f)} >= end_ms:${String(m)} は異常値です`;
					if (m <= p) throw `[${e}] ret_ms:${String(p)} >= end_ms:${String(m)} は異常値です`;
				}
				let h = `const.sn.sound.${o}.`, g = r.#o(r.#a(e, "volume", t.volume, 1));
				this.#P.setNochk(`save:${h}volume`, g), this.#P.setNochk(`save:${h}fn`, s), this.#P.setNochk(`save:${h}start_ms`, f), this.#P.setNochk(`save:${h}end_ms`, m), this.#P.setNochk(`save:${h}ret_ms`, p);
				let _ = g * Number(this.#P.get(`sys:${h}volume`, 1, !0));
				if (o === "BGM") _ *= this.#N;
				else if (o === "VOICE") {
					let e = Number(this.#P.get("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
					if (this.#N = e, e !== 1) {
						let t = "const.sn.sound.BGM.", n = Number(this.#P.get(`save:${t}volume`, 1, !0)) * Number(this.#P.get(`sys:${t}volume`, 1, !0)) * e;
						a.push({
							t: "duckBgm",
							volume: n
						});
					}
				}
				return c ? this.#j(o, s) : this.#M(o), a.push({
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
					canskip: i
				}), l ? "stop" : "skip";
			}
			case "stopse":
			case "stopbgm": {
				let n = r.#c(e, t);
				return this.#M(n), a.push({
					t: "stopSnd",
					buf: n
				}), "skip";
			}
			case "stop_allse":
				for (let e of Object.keys(this.#A)) this.#M(e);
				return a.push({ t: "stopAllSnd" }), "skip";
			case "xchgbuf": {
				let e = t.buf || "SE", n = t.buf2 || "SE";
				if (e === n) return "skip";
				let i = {
					volume: 1,
					fn: "",
					start_ms: 0,
					end_ms: r.#u,
					ret_ms: 0
				}, o = `const.sn.sound.${e}.`, s = `const.sn.sound.${n}.`;
				for (let e of Object.keys(i)) {
					let t = this.#P.get(`save:${o}${e}`, i[e]), n = this.#P.get(`save:${s}${e}`, i[e]);
					this.#P.setNochk(`save:${o}${e}`, n), this.#P.setNochk(`save:${s}${e}`, t);
				}
				let c = this.#A[e], l = this.#A[n];
				return l === void 0 ? delete this.#A[e] : this.#A[e] = l, c === void 0 ? delete this.#A[n] : this.#A[n] = c, this.#P.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#A)), a.push({
					t: "xchgBufSnd",
					buf: e,
					buf2: n
				}), "skip";
			}
			case "volume": {
				let e = t.buf || "SE", n = `const.sn.sound.${e}.`, i = r.#o(r.#a("volume", "volume", t.volume, 1));
				this.#P.setNochk(`sys:${n}volume`, i);
				let o = Number(this.#P.get(`save:${n}volume`, 1, !0));
				return a.push({
					t: "volumeSnd",
					buf: e,
					volume: o * i
				}), "skip";
			}
			case "fadese":
			case "fadebgm":
			case "fadeoutse":
			case "fadeoutbgm": {
				let n = e === "fadeoutse" || e === "fadeoutbgm", i = r.#c(e, t), o = `const.sn.sound.${i}.`, s = n ? 0 : r.#o(r.#n(e, "volume", t.volume ?? ""));
				this.#P.setNochk(`save:${o}volume`, s);
				let c = Number(this.#P.get(`sys:${o}volume`, 1, !0)), l = (t.stop ?? (s === 0 ? "true" : "false")) !== "false";
				l && this.#M(i);
				let u = this.skipEnabled, d = u ? 0 : r.#n(e, "time", t.time ?? ""), f = u ? 0 : r.#a(e, "delay", t.delay, 0);
				return a.push({
					t: "fadeSnd",
					buf: i,
					volume: s * c,
					msec: d,
					delay: f,
					stop: l
				}), "skip";
			}
			case "stopfadese": return "skip";
			case "ws":
			case "wl": {
				let n = r.#c(e, t), i = (t.canskip ?? "false") !== "false", o = (t.stop ?? "true") !== "false";
				return a.push({
					t: "waitSnd",
					buf: n,
					canskip: i,
					stop: o
				}), "stop";
			}
			case "wf":
			case "wb": {
				let n = r.#c(e, t), i = (t.canskip ?? "false") !== "false";
				return a.push({
					t: "waitFade",
					buf: n,
					canskip: i
				}), "stop";
			}
			case "wv": {
				let e = t.fn ?? "";
				if (!e) throw "[wv] fnは必須です";
				let n = (t.stop ?? "true") !== "false", r = (t.canskip ?? "true") !== "false";
				return a.push({
					t: "waitVideo",
					fn: e,
					stop: n,
					canskip: r
				}), "stop";
			}
			default: {
				if (ae(e)) return a.push({
					t: "plgTag",
					name: e,
					hArg: { ...t }
				}), "stop";
				let n = this.#K[e];
				return n === void 0 ? "skip" : (this.#re(this.#x, !1, t), this.#P.setMp({
					...t,
					"const.sn.me_call_scriptFn": this.fn,
					"const.sn.macro": JSON.stringify({ name: e })
				}), n.fn === this.fn ? (this.#x = n.idx, "skip") : (a.push({
					t: "loadScript",
					fn: n.fn,
					label: "",
					idx: n.idx
				}), "stop"));
			}
		}
	}
	#ce(e, t) {
		if (!this.#P.get(`const.sn.frm.${t}`)) throw `[${e}] frame【${t}】が読み込まれていません`;
	}
	#le(e, t, n) {
		let r = t.name ?? "";
		if (!r) throw `[${e}] nameは必須です`;
		this.#P.set(r, n, t.cast ?? "");
	}
	#ue(e) {
		let t = e.exp ?? "";
		if (!t) throw "[if] expは必須です（試作仕様）";
		if (t.startsWith("&")) throw "[if] 属性expは「&」が不要です";
		let n = this.#F.evalBool(t) ? this.#x : -1, i = 0, a = !1, o = this.#b.len;
		for (; this.#x < o; ++this.#x) {
			let e = this.#b.aToken[this.#x];
			if (a) {
				this.#b.grm.testTagEndLetml(e) && (a = !1);
				continue;
			}
			if (e.charCodeAt(0) !== 91) continue;
			if (this.#b.grm.testTagLetml(e)) {
				a = !0;
				continue;
			}
			let { name: t, args: o } = r.parseTag(e);
			switch (t) {
				case "if":
					++i;
					continue;
				case "elsif": {
					if (i > 0 || n > -1) continue;
					let e = o.exp ?? "";
					if (!e) throw "[elsif] expは必須です（試作仕様）";
					if (e.startsWith("&")) throw "[elsif] 属性expは「&」が不要です";
					this.#F.evalBool(e) && (n = this.#x + 1);
					continue;
				}
				case "else":
					if (i > 0) continue;
					n === -1 && (n = this.#x + 1);
					continue;
				case "endif":
					if (i > 0) {
						--i;
						continue;
					}
					n === -1 ? ++this.#x : (this.#B.push(this.#x + 1), this.#x = n);
					return;
				default: continue;
			}
		}
		throw "[if] に対応する [endif] が見つかりません（試作仕様）";
	}
	#de() {
		let e = this.#B.pop();
		if (e === void 0 || e === -1) throw "[if] に対応していない [elsif]/[else]/[endif] です";
		this.#x = e;
	}
	#fe(e, t = {}) {
		let n = this.#V.pop();
		if (!n) throw "[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）";
		this.#B.length = n.lenIfStk, this.#P.setMp(n.hMp), n.hEvt && (this.#H = n.hEvt);
		let r = t.label ?? "", i = t.fn ?? "";
		if (i || r) {
			if (i && i !== this.fn) return e.push({
				t: "loadScript",
				fn: i,
				label: r,
				idx: 0
			}), "stop";
			let t = this.#b.label2idx(r, this.#x, this.#I());
			if (t === void 0) throw `[return] ラベル【${r}】がスクリプト【${this.fn}】に見つかりません`;
			return this.#x = t, "skip";
		}
		return n.fn === this.fn ? (this.#x = n.returnIdx, "skip") : (e.push({
			t: "loadScript",
			fn: n.fn,
			label: "",
			idx: n.returnIdx
		}), "stop");
	}
	static #pe(e, t) {
		return `｜&emsp;《${e}｜${encodeURIComponent(JSON.stringify(t))}》`;
	}
	#me(e) {
		return {
			nm: e.layer || this.#S,
			page: r.argPage(e, "fore")
		};
	}
	#he(e, t, n = !0, r = this.#S, i = "fore") {
		let a = this.#T(i), o = (a[r] ?? "") + t;
		a[r] = o, n && this.#R && r === this.#S && i === "fore" && this.#L.add(t), e.push({
			t: "chgStr",
			nm: r,
			page: i,
			str: o
		});
	}
	#ge() {
		this.#L.pagebreak();
	}
};
//#endregion
export { se as ScriptEngine, M as a, E as c, W as i, G as n, z as o, V as r, D as s, ie as t };

//# sourceMappingURL=ScriptEngine.js.map