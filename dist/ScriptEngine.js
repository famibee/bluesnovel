import { a as e, c as t, o as n, s as r, t as i } from "./CmnLib.js";
import { S as a, h as o, s, t as c } from "./PageLog.js";
import { n as l } from "./ConfigBase.js";
import { r as u } from "./LayCls.js";
//#region src/sn/CmnInterface.ts
function d() {
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
var f = { save: "game" }, p = class e {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = /* @__PURE__ */ new Set();
	#r = Object.create(null);
	#i;
	constructor() {
		this.#a();
	}
	#a() {
		for (let [e, t] of Object.entries(d())) this.#e[`sys.${e}`] = typeof t == "function" ? 1 : t;
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
			ns: f[r] ?? r,
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
}, m = /\[[^\]]+\]/g, h = {
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
}, g = class {
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
				let i = r(), a = i && h[i.t];
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
		let t = e.replaceAll(m, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
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
};
//#endregion
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
				let c = i === "loadplugin" ? l.CSS : l.SN, u = this.cfg.matchPath("^" + s.slice(0, -1) + ".*", c);
				for (let i of u) {
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
}, C = class e {
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
}, w = class e {
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
}, T = class e {
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
}, E = [
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
], D = [
	"alpha",
	"x",
	"y",
	"width",
	"height",
	"scale_x",
	"scale_y",
	"rotate"
], O = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function k(e, t, n = E) {
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
var A = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
function j(e, t, n = E) {
	let r = [];
	for (let { groups: i } of t.matchAll(A)) {
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
		r.push(k(e, d, n));
	}
	return r;
}
function M(e) {
	return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
}
var N = {
	"Back.In": (e) => e === 1 ? 1 : e * e * (2.70158 * e - 1.70158),
	"Back.InOut": (e) => {
		let t = 2.5949095;
		return (e *= 2) < 1 ? .5 * (e * e * (3.5949095 * e - t)) : .5 * ((e -= 2) * e * (3.5949095 * e + t) + 2);
	},
	"Back.Out": (e) => e === 0 ? 0 : --e * e * (2.70158 * e + 1.70158) + 1,
	"Bounce.In": (e) => 1 - M(1 - e),
	"Bounce.InOut": (e) => e < .5 ? (1 - M(1 - e * 2)) * .5 : M(e * 2 - 1) * .5 + .5,
	"Bounce.Out": (e) => M(e),
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
function P(e) {
	if (!e) return "Linear.None";
	if (!N[e]) throw `異常なease指定です：${e}`;
	return e;
}
function F(e) {
	return N[P(e)];
}
function I(e, t) {
	if (t.id) return `frm\n${t.id}`;
	let n = t.name ?? t.layer ?? "";
	if (!n) throw `[${e}] トゥイーンが指定されていません（name／layerのどちらも無し）`;
	return n;
}
//#endregion
//#region src/ts/Fx.ts
var L = ["wave", "rgbShift"], R = {
	wave: {
		amp: 6,
		freq: 2
	},
	rgbShift: { shift: 4 }
}, z = [
	"amp",
	"freq",
	"shift"
];
function B(e, t, n) {
	let r = e[t];
	if (r === void 0) return n;
	let i = Number(r);
	if (!Number.isFinite(i)) throw `[add_fx] ${t} の値が不正です：${r}`;
	return i;
}
function V(e) {
	let t = e.fx ?? "", n = e.glsl ?? "";
	if (!t && !n) throw "[add_fx] fx= か glsl= のどちらかが必要です";
	if (n) throw "[add_fx] glsl= は未対応です（試作。プリセット fx= のみ）";
	if (!L.includes(t)) throw `[add_fx] fx【${t}】は未対応です（対応：${L.join(" / ")}）`;
	let r = { ...R[t] };
	for (let t of z) e[t] !== void 0 && (r[t] = B(e, t, 0));
	return {
		name: e.name ?? "",
		fx: t,
		glsl: n,
		time: B(e, "time", 0),
		speed: B(e, "speed", 1),
		params: r
	};
}
//#endregion
//#region src/ts/Txt.ts
function H(e) {
	w.setEscape(e);
}
H("");
var U = [
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
function W(e) {
	if (e === void 0) return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function G(e) {
	let t = e.indexOf("｜");
	if (t < 1) return;
	let n = e.slice(0, t);
	if (!U.includes(n)) return;
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
function K(e) {
	let t = [], n = "", r = "", i, a, o, s, c, l, u = [], d = (e, u, d, f) => {
		let p = n + (c?.style ?? "") + (d?.style ?? ""), m = r + (c?.r_style ?? "") + (d?.r_style ?? ""), h = d?.ch_in_style ?? c?.ch_in_style ?? i, g = d?.ch_out_style ?? c?.ch_out_style ?? a, _ = W(d?.wait) ?? W(c?.wait) ?? o, { ra: v, ruby: y } = u ? ee(u) : {
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
	}, f = new w();
	return f.init((e, f) => {
		let p = f ? G(f) : void 0;
		if (!p) {
			d(e, f);
			return;
		}
		let { o: m } = p;
		switch (p.cmd) {
			case "span":
				n = m.style ?? "", r = m.r_style ?? "", i = m.ch_in_style, a = m.ch_out_style, o = W(m.wait), m.r_align && (s = m.r_align);
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
				...W(m.width) === void 0 ? {} : { gw: W(m.width) },
				...W(m.height) === void 0 ? {} : { gh: W(m.height) },
				...W(m.x) === void 0 ? {} : { gx: W(m.x) },
				...W(m.y) === void 0 ? {} : { gy: W(m.y) }
			}));
		}
	}), f.putTxt(e), t;
}
function q(e) {
	return e.map((e) => e.c).join("");
}
function J(e) {
	return q(K(e));
}
var Y = [
	"start",
	"left",
	"center",
	"right",
	"justify",
	"121",
	"even",
	"1ruby"
];
function ee(e) {
	let t = e.indexOf("｜");
	if (t > 0) {
		let n = e.slice(0, t);
		if (Y.includes(n)) return {
			ra: n,
			ruby: e.slice(t + 1)
		};
	}
	return { ruby: e };
}
//#endregion
//#region src/ts/Log.ts
var te = 64, X = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), Z = (e) => X(e).replaceAll("'", "&#39;");
function Q(e) {
	return ne(K(e));
}
function ne(e) {
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
var re = class {
	maxLen;
	#e = [];
	#t = "";
	#n = {};
	constructor(e = () => te) {
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
function ie(e, t) {
	if ($.has(e)) throw `すでに定義済みのタグ[${e}]です`;
	$.set(e, t);
}
function ae(e) {
	return $.get(e);
}
function oe(e) {
	return $.has(e);
}
function se() {
	return [...$.keys()];
}
//#endregion
//#region src/ts/ScriptEngine.ts
var ce = class n {
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
		let r = t.path ? j(e, t.path, n) : void 0;
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
	#k = new p();
	#A = new g(this.#k);
	#j() {
		return !!this.#k.get("mp:const.sn.macro");
	}
	#M = new re(() => {
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
	static RESERVED_TAGS = /* @__PURE__ */ new Set(/* @__PURE__ */ "add_lay.current.add_face.lay.clear_lay.trans.wt.finish_trans.set_cancel_skip.let.let_ml.endlet_ml.let_abs.let_char_at.let_index_of.let_length.let_replace.let_round.let_search.let_substr.tsy.tsy_frame.wait_tsy.stop_tsy.pause_tsy.resume_tsy.quake.stop_quake.wq.title.toggle_full_screen.dump_lay.dump_val.dump_stack.pop_stack.clear_text.rec_ch.rec_r.reset_rec.ch_in_style.ch_out_style.autowc.navigate_to.loadplugin.snapshot.close.update_check.window.record_place.save.load.reload_script.copybookmark.erasebookmark.export.import.add_frame.frame.set_frame.let_frame.set_focus.add_filter.clear_filter.enable_filter.add_fx.clear_fx.wait_fx.if.elsif.else.endif.r.er.trace.log.jump.call.return.macro.endmacro.char2macro.bracket2macro.button.event.clear_event.enable_event.clearvar.clearsysvar.page.wait.waitclick.l.p.s.ch.endlink.graph.link.ruby2.span.tcy.fadebgm.fadeoutbgm.fadeoutse.fadese.playbgm.playse.stop_allse.stopbgm.stopfadese.stopse.volume.wb.wf.wl.ws.xchgbuf.wv".split("."));
	#H() {
		let e = Object.create(null);
		for (let t of n.RESERVED_TAGS) e[t] = !0;
		for (let t of se()) e[t] = !0;
		for (let t in this.#V) e[t] = !0;
		return e;
	}
	static registerPlgTag(e, t) {
		if (n.RESERVED_TAGS.has(e)) throw `[${e}]は既存タグ名のため、プラグインタグとして登録できません`;
		ie(e, t);
	}
	constructor(t, n = "") {
		this.#g = t instanceof C ? t : new C(t, n), this.#k.defBuiltin("const.sn.scriptFn", () => this.fn), this.#k.defBuiltin("const.sn.isKidoku", () => this.#B), this.#k.defBuiltin("const.sn.displayState", () => this.#U), this.#k.defBuiltin("const.Date.getDateStr", () => e()), this.#k.defBuiltin("const.Date.getTime", () => (/* @__PURE__ */ new Date()).getTime()), this.#k.defBuiltin("const.sn.last_page_plain_text", () => J(this.#y[this.#v] ?? "")), this.#k.defBuiltin("const.sn.last_page_text", () => this.#y[this.#v] ?? ""), this.#k.defBuiltin("const.sn.log.json", () => this.#M.json()), this.#k.defBuiltin("const.sn.key.alternate", () => this.#W.Alt === !0), this.#k.defBuiltin("const.sn.key.command", () => this.#W.Meta === !0), this.#k.defBuiltin("const.sn.key.control", () => this.#W.Control === !0), this.#k.defBuiltin("const.sn.key.end", () => this.#W.End === !0), this.#k.defBuiltin("const.sn.key.escape", () => this.#W.Escape === !0), this.#k.defBuiltin("const.sn.key.back", () => !1), this.#k.defBuiltin("const.sn.Math.PI", () => Math.PI), this.#k.defBuiltin("const.sn.aIfStk.length", () => this.#F.length), this.#k.defBuiltin("const.sn.vctCallStk.length", () => this.#I.length), this.#k.setNochk("save:const.sn.mesLayer", this.#v);
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
		let e = this.#z[this.fn] ??= new T();
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
		for (let [t, n] of Object.entries(e)) this.#z[t] = T.from(n);
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
	#ee(e, t, r, i = !1) {
		let s = e.layer ?? "", c = this.#w[s] ?? "txt", l = c !== "grp" && c !== "txt";
		if (!l) {
			let n = e.fn || e.pic;
			if (n) {
				let i = {
					t: "chgPic",
					nm: s,
					page: r,
					fn: n
				};
				if (e.face !== void 0) {
					let t = [];
					if (e.face) for (let n of e.face.split(",")) {
						if (!n) throw "[lay] face属性に空要素が含まれています";
						t.push(this.#C[n] ?? {
							fn: n,
							dx: 0,
							dy: 0,
							blendmode: a("normal")
						});
					}
					i.aFace = t;
				}
				t.push(i);
			}
			if (e.back_clear !== void 0) e.back_clear === "true" && t.push({
				t: "chgBackClear",
				nm: s,
				page: r
			});
			else {
				if (e.b_alpha !== void 0 || e.b_alpha_isfixed !== void 0) {
					let n = {
						t: "chgBAlpha",
						nm: s,
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
					nm: s,
					page: r,
					fn: e.b_pic
				});
			}
		}
		let u = {};
		if (e.visible !== void 0 && (u.visible = e.visible !== "false"), e.alpha !== void 0 && (u.alpha = n.#n("lay", "alpha", e.alpha)), !(!l && e.pos === "stay")) {
			if (!l && e.pos !== void 0) {
				let t = e.pos, r = Number(this.#k.get("tmp:const.sn.config.window.width")), i = Number(this.#k.get("tmp:const.sn.config.window.height"));
				t === "" || t === "c" ? (u.left = r / 2, u.align_x = "center") : t === "l" ? u.left = 0 : t === "r" ? (u.left = r, u.align_x = "right") : (u.left = n.#n("lay", "pos", t), u.align_x = "center"), u.top = i, u.align_y = "bottom";
			} else if (e.left === void 0 ? e.center === void 0 ? e.right === void 0 ? e.s_right !== void 0 && (u.s_right = this.#r("lay", "left", e.s_right)) : (u.left = this.#r("lay", "left", e.right), u.align_x = "right") : (u.left = this.#r("lay", "left", e.center), u.align_x = "center") : u.left = this.#r("lay", "left", e.left), e.top === void 0 ? e.middle === void 0 ? e.bottom === void 0 ? e.s_bottom !== void 0 && (u.s_bottom = this.#r("lay", "top", e.s_bottom)) : (u.top = this.#r("lay", "top", e.bottom), u.align_y = "bottom") : (u.top = this.#r("lay", "top", e.middle), u.align_y = "middle") : u.top = this.#r("lay", "top", e.top), (e.fn !== void 0 || e.pic !== void 0 || e.face !== void 0) && !("left" in u) && !("s_right" in u) && !("top" in u) && !("s_bottom" in u) && c === "grp") {
				let e = Number(this.#k.get("tmp:const.sn.config.window.width")), t = Number(this.#k.get("tmp:const.sn.config.window.height"));
				u.left = e / 2, u.align_x = "center", u.top = t, u.align_y = "bottom";
			}
		}
		if (i && l && !("left" in u) && !("s_right" in u) && !("top" in u) && !("s_bottom" in u) && e.width === void 0 && e.height === void 0 && (u.left = 0, u.top = 0, u.width = Number(this.#k.get("tmp:const.sn.config.window.width")), u.height = Number(this.#k.get("tmp:const.sn.config.window.height"))), e.width !== void 0 && (u.width = n.#n("lay", "width", e.width)), e.height !== void 0 && (u.height = n.#n("lay", "height", e.height)), e.rotation !== void 0 && (u.rotation = n.#n("lay", "rotation", e.rotation)), e.scale_x !== void 0 && (u.scale_x = n.#n("lay", "scale_x", e.scale_x)), e.scale_y !== void 0 && (u.scale_y = n.#n("lay", "scale_y", e.scale_y)), e.pivot_x !== void 0 && (u.pivot_x = n.#n("lay", "pivot_x", e.pivot_x)), e.pivot_y !== void 0 && (u.pivot_y = n.#n("lay", "pivot_y", e.pivot_y)), e.blendmode !== void 0 && (u.blendmode = a(e.blendmode)), !l) {
			if (e.b_color !== void 0 && e.back_clear !== "true" && (u.b_color = n.#n("lay", "b_color", e.b_color)), e.style !== void 0 && (u.style = e.style), e.pl !== void 0 && (u.pl = n.#n("lay", "pl", e.pl)), e.pr !== void 0 && (u.pr = n.#n("lay", "pr", e.pr)), e.pt !== void 0 && (u.pt = n.#n("lay", "pt", e.pt)), e.pb !== void 0 && (u.pb = n.#n("lay", "pb", e.pb)), e.ffs !== void 0 && (u.ffs = e.ffs), e.noffs !== void 0 && (u.noffs = e.noffs), e.bura !== void 0 && (u.bura = e.bura !== "false"), e.kinsoku_sol !== void 0 && (u.kinsoku_sol = e.kinsoku_sol), e.kinsoku_eol !== void 0 && (u.kinsoku_eol = e.kinsoku_eol), e.kinsoku_dns !== void 0 && (u.kinsoku_dns = e.kinsoku_dns), e.kinsoku_bura !== void 0 && (u.kinsoku_bura = e.kinsoku_bura), w.setting(e), e.r_align !== void 0) {
				if (!Y.includes(e.r_align)) throw `[lay] r_alignの値が不正です：${e.r_align}`;
				u.r_align = e.r_align;
			}
			e.in_style !== void 0 && (u.in_style = e.in_style), e.out_style !== void 0 && (u.out_style = e.out_style);
		}
		Object.keys(u).length > 0 && t.push({
			t: "chgLay",
			nm: s,
			page: r,
			sty: u
		}), e.filter !== void 0 && t.push({
			t: "addFilter",
			aLayNm: [s],
			page: r,
			flt: o(e),
			replace: !0
		}), l && t.push({
			t: "layPlg",
			nm: s,
			page: r,
			hArg: { ...e }
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
	#ne(e, i, l) {
		let d = this.#g.len;
		switch (e) {
			case "add_lay": {
				let e = i.layer ?? i.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (i.class ?? "txt").toLowerCase();
				if (!u(t)) throw `[add_lay] 属性 class【${t}】が不正です。レイヤクラスが登録されていません`;
				let n = t !== "grp" && t !== "txt";
				this.#w[e] = t, this.#y[e] = "", this.#b[e] = "", t === "txt" && this.#k.setNochk(`save:const.sn.layer.${e}.enabled`, !0), l.push({
					t: "addLay",
					cls: t,
					nm: e
				});
				let r = i.layer === void 0 ? {
					...i,
					layer: e
				} : i;
				return this.#ee(r, l, "fore", !0), this.#ee(r, l, "back", !0), this.#te(r, l), n ? "stop" : "skip";
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
					blendmode: a(i.blendmode || "normal")
				}, "skip";
			}
			case "lay": {
				let e = n.argPage(i, "fore");
				this.#ee(i, l, e), this.#te(i, l);
				let t = this.#w[i.layer ?? ""] ?? "txt";
				return t !== "grp" && t !== "txt" ? "stop" : "skip";
			}
			case "add_filter": return l.push({
				t: "addFilter",
				aLayNm: n.#c(i.layer),
				page: n.#h("add_filter", i, "fore"),
				flt: o(i),
				replace: !1
			}), "skip";
			case "clear_filter": return l.push({
				t: "clearFilter",
				aLayNm: n.#c(i.layer),
				page: n.#h("clear_filter", i, "fore")
			}), "skip";
			case "enable_filter": return l.push({
				t: "enableFilter",
				aLayNm: n.#c(i.layer),
				page: n.#h("enable_filter", i, "fore"),
				index: n.#i("enable_filter", "index", i.index, 0),
				enabled: (i.enabled ?? "true") !== "false"
			}), "skip";
			case "add_fx": return l.push({
				t: "addFx",
				aLayNm: n.#c(i.layer),
				page: n.#h("add_fx", i, "fore"),
				fx: V(i)
			}), "skip";
			case "clear_fx": return l.push({
				t: "clearFx",
				aLayNm: n.#c(i.layer),
				page: n.#h("clear_fx", i, "fore"),
				names: n.#c(i.name)
			}), "skip";
			case "wait_fx": {
				let e = n.#c(i.layer), t = n.#c(i.name);
				if (!e && !t) throw "[wait_fx] layer= か name= のどちらかが必要です";
				return l.push({
					t: "waitFx",
					aLayNm: e,
					names: t,
					canskip: (i.canskip ?? "true") !== "false"
				}), "stop";
			}
			case "clear_lay": {
				let e = n.#h("clear_lay", i, "fore"), t = n.#c(i.layer);
				if (i.layer !== void 0 && t === null) throw "[clear_lay] layer属性が空です";
				if (e !== "back") {
					if ((!t || t.includes(this.#v)) && this.#de(), t) for (let e of t) this.#y[e] = "";
					else for (let e of Object.keys(this.#y)) this.#y[e] = "";
				}
				if (e !== "fore") {
					if (t) for (let e of t) this.#b[e] = "";
					else for (let e of Object.keys(this.#b)) this.#b[e] = "";
				}
				return l.push({
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
				return l.push({
					t: "trans",
					aLayNm: t,
					time: this.skipEnabled ? 0 : r,
					...i.rule === void 0 ? {} : { rule: i.rule },
					...i.vague === void 0 ? {} : { vague: n.#n("trans", "vague", i.vague) },
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
				let e = this.skipEnabled ? 0 : n.#n("quake", "time", i.time ?? "");
				return e <= 0 || l.push({
					t: "quake",
					msec: e,
					hmax: t(n.#i("quake", "hmax", i.hmax, 10)),
					vmax: t(n.#i("quake", "vmax", i.vmax, 10))
				}), "skip";
			}
			case "stop_quake": return l.push({ t: "stopQuake" }), "skip";
			case "wq": return l.push({
				t: "waitQuake",
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "tsy": {
				let { layer: e } = i;
				if (!e) throw "[tsy] layerは必須です";
				let t = this.skipEnabled, r = t ? 0 : n.#n("tsy", "time", i.time ?? ""), a = t ? 0 : n.#i("tsy", "delay", i.delay, 0), s = n.#i("tsy", "repeat", i.repeat, 1), c = n.argPage(i, "fore");
				return i.filter !== void 0 && l.push({
					t: "addFilter",
					aLayNm: [e],
					page: c,
					flt: o(i),
					replace: !0
				}), l.push({
					t: "tsy",
					tw_nm: I("tsy", i),
					nm: e,
					page: c,
					msec: r,
					delay: a,
					ease: P(i.ease),
					repeat: s > 0 ? s - 1 : Infinity,
					yoyo: (i.yoyo ?? "false") !== "false",
					hTo: k("tsy", i),
					backlay: (i.backlay ?? "false") !== "false",
					...n.#m("tsy", i)
				}), "skip";
			}
			case "tsy_frame": {
				let { id: e } = i;
				if (!e) throw "[tsy_frame] idは必須です";
				this.#re("tsy_frame", e);
				let t = this.skipEnabled, r = n.#i("tsy_frame", "repeat", i.repeat, 1);
				return l.push({
					t: "tsyFrame",
					tw_nm: I("tsy_frame", i),
					id: e,
					msec: t ? 0 : n.#n("tsy_frame", "time", i.time ?? ""),
					delay: t ? 0 : n.#i("tsy_frame", "delay", i.delay, 0),
					ease: P(i.ease),
					repeat: r > 0 ? r - 1 : Infinity,
					yoyo: (i.yoyo ?? "false") !== "false",
					hTo: k("tsy_frame", i, D),
					...n.#m("tsy_frame", i, D)
				}), "skip";
			}
			case "wait_tsy": return l.push({
				t: "waitTsy",
				tw_nm: I("wait_tsy", i),
				canskip: (i.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return l.push({
				t: "stopTsy",
				tw_nm: I("stop_tsy", i)
			}), "skip";
			case "pause_tsy": return l.push({
				t: "pauseTsy",
				tw_nm: I("pause_tsy", i),
				paused: !0
			}), "skip";
			case "resume_tsy": return l.push({
				t: "pauseTsy",
				tw_nm: I("resume_tsy", i),
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
				for (; this.#_ < d && (t = this.#g.aToken[this.#_], t === ""); ++this.#_);
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
				return this.#ue(l, "\n", !0, e, t), "skip";
			}
			case "er": return (i.rec_page_break ?? "true") !== "false" && this.#de(), this.#y[this.#v] = "", this.#b[this.#v] = "", l.push({
				t: "chgStr",
				nm: this.#v,
				page: "both",
				str: ""
			}), l.push({
				t: "clearTxtLay",
				nm: this.#v,
				page: "both",
				clearFilter: i.clear_filter === "true"
			}), "skip";
			case "span": {
				if (i.r_align !== void 0 && !Y.includes(i.r_align)) throw `[span] r_alignの値が不正です：${i.r_align}`;
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(l, n.#ce("span", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, t), "skip";
			}
			case "link": {
				if (!i.url && !i.label && !i.fn) throw "[link] fn・label・urlのいずれかは必須です";
				i.clickse !== void 0 && (i.clicksebuf = i.clicksebuf || "SYS"), i.enterse !== void 0 && (i.entersebuf = i.entersebuf || "SYS"), i.leavese !== void 0 && (i.leavesebuf = i.leavesebuf || "SYS"), i.style ??= "background-color: rgba(255,0,0,0.5);", i.style_hover ??= "background-color: rgba(255,0,0,0.9);", i.style_clicked ??= i.style;
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(l, n.#ce("link", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, t), "skip";
			}
			case "endlink": {
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(l, n.#ce("endlink", {}), !0, e, t), "skip";
			}
			case "graph": {
				if (!i.pic) throw "[graph] picは必須です";
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(l, n.#ce("grp", {
					...i,
					layer: void 0,
					page: void 0
				}), !0, e, t), "skip";
			}
			case "tcy": {
				if (!i.t) throw "[tcy] tは必須です";
				let { nm: e, page: t } = this.#le(i);
				return this.#ue(l, n.#ce("tcy", {
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
				let { nm: r, page: a } = this.#le(i);
				return this.#ue(l, n.#ce("add", {
					...i,
					text: void 0,
					layer: void 0,
					page: void 0
				}) + t.replaceAll("[r]", "\n") + n.#ce("add_close", {}), i.record !== "false", r, a), "skip";
			}
			case "autowc": {
				let e = i.enabled === void 0 ? this.#k.get("game:const.sn.autowc.enabled") === !0 : i.enabled !== "false";
				this.#k.setNochk("save:const.sn.autowc.enabled", e);
				let { text: r } = i;
				if ("text" in i != "time" in i) throw "[autowc] textとtimeは同時指定必須です";
				if (this.#k.setNochk("save:const.sn.autowc.text", r ?? ""), !r) return this.#k.setNochk("save:const.sn.autowc.time", ""), l.push({
					t: "autowc",
					enabled: e,
					hWait: {}
				}), "skip";
				let a = Array.from(r), o = String(i.time ?? "").split(",");
				if (o.length !== a.length) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
				let s = {};
				return a.forEach((e, r) => {
					s[e] = t(n.#n("autowc", "time", o[r] ?? ""));
				}), this.#k.setNochk("save:const.sn.autowc.time", i.time ?? ""), l.push({
					t: "autowc",
					enabled: e,
					hWait: s
				}), "skip";
			}
			case "ch_in_style":
			case "ch_out_style": {
				let t = e === "ch_in_style" ? "in" : "out", { name: n, sty: r } = s(e, i, t === "in");
				if (this.#P[t].has(n)) throw `[${e}] name【${n}】はすでにあります`;
				return this.#P[t].add(n), l.push({
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
				i.count === "false" && this.#K();
				let e = i.label ?? "", t = i.fn ?? "";
				if (!e && !t) throw "[jump] fnまたはlabelは必須です";
				if (t && t !== this.fn) return l.push({
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
				if (t && t !== this.fn) return this.#Q(this.#_, !0, i), l.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e, this.#_, this.#j());
				if (n === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#Q(this.#_, !0, i), this.#_ = n, "skip";
			}
			case "return": return this.#se(l, i);
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
				for (; this.#_ < d; ++this.#_) {
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
			case "endmacro": return this.#se(l);
			case "button": {
				let e = i.layer || this.#v;
				if (!e) throw "[button] layerは必須です（試作仕様）";
				let t = i.label ?? "", r = i.fn ?? this.fn, { pic: o } = i;
				if (!o && !i.text) throw "[button] textまたはpic属性は必須です";
				let s = i.nm, c = i.call === "true", u = n.argPage(i, "back"), d = {};
				i.left === void 0 ? i.center === void 0 ? i.right === void 0 ? i.s_right !== void 0 && (d.s_right = this.#r("button", "left", i.s_right)) : (d.left = this.#r("button", "left", i.right), d.align_x = "right") : (d.left = this.#r("button", "left", i.center), d.align_x = "center") : d.left = this.#r("button", "left", i.left), i.top === void 0 ? i.middle === void 0 ? i.bottom === void 0 ? i.s_bottom !== void 0 && (d.s_bottom = this.#r("button", "top", i.s_bottom)) : (d.top = this.#r("button", "top", i.bottom), d.align_y = "bottom") : (d.top = this.#r("button", "top", i.middle), d.align_y = "middle") : d.top = this.#r("button", "top", i.top);
				for (let e of n.#f) {
					let t = i[e];
					t !== void 0 && Object.assign(d, { [e]: n.#n("button", e, t) });
				}
				return o || (d.width ??= 100, d.height ??= 30), i.enabled !== void 0 && (d.enabled = i.enabled !== "false"), i.blendmode !== void 0 && (d.blendmode = a(i.blendmode)), i.style !== void 0 && (d.style = n.#u(i.style)), i.style_hover !== void 0 && (d.style_hover = n.#u(i.style_hover)), i.style_clicked !== void 0 && (d.style_clicked = n.#u(i.style_clicked)), i.hint !== void 0 && (d.hint = i.hint), i.hint_style !== void 0 && (d.hint_style = i.hint_style), i.hint_opt !== void 0 && (d.hint_opt = i.hint_opt), o !== void 0 && (d.pic = o), i.b_pic !== void 0 && (d.b_pic = i.b_pic), i.clickse !== void 0 && (d.clickse = i.clickse, d.clicksebuf = i.clicksebuf || "SYS"), i.enterse !== void 0 && (d.enterse = i.enterse, d.entersebuf = i.entersebuf || "SYS"), i.leavese !== void 0 && (d.leavese = i.leavese, d.leavesebuf = i.leavesebuf || "SYS"), l.push({
					t: "addBtn",
					layerNm: e,
					page: u,
					text: o ? "" : i.text ?? "",
					label: t,
					call: c,
					...s === void 0 ? {} : { nm: s },
					...r ? { fn: r } : {},
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
				let e = (e, t) => {
					let n = this.#k.get(`sys:const.sn.nativeWindow.${e}`);
					return n == null ? t : Number(n);
				}, t = (e) => Number(this.#k.get(`tmp:const.sn.config.window.${e}`) ?? 0), r = (e, t, r) => i[e] === void 0 ? i[t] === void 0 ? r : n.#n("window", t, i[t]) : n.#n("window", e, i[e]), a = {
					centering: i.centering === "true",
					x: r("x", "x", e("x", 0)),
					y: r("y", "y", e("y", 0)),
					w: r("width", "w", e("w", t("width"))),
					h: r("height", "h", e("h", t("height")))
				};
				return this.#k.setNochk("sys:const.sn.nativeWindow.x", a.x), this.#k.setNochk("sys:const.sn.nativeWindow.y", a.y), this.#k.setNochk("sys:const.sn.nativeWindow.w", a.w), this.#k.setNochk("sys:const.sn.nativeWindow.h", a.h), l.push({
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
				aLayNm: n.#c(i.layer),
				page: n.argPage(i, "fore"),
				width: n.#i("snapshot", "width", i.width, 0),
				height: n.#i("snapshot", "height", i.height, 0),
				smoothing: i.smoothing === "true",
				...i.b_color === void 0 ? {} : { b_color: n.#n("snapshot", "b_color", i.b_color) }
			}), "stop";
			case "clear_text": {
				let e = i.layer || this.#v, t = n.argPage(i, "fore");
				return e === this.#v && t === "fore" && this.#de(), this.#x(t)[e] = "", l.push({
					t: "chgStr",
					nm: e,
					page: t,
					str: ""
				}), "skip";
			}
			case "dump_val": return l.push({
				t: "trace",
				text: `[dump_val] ${JSON.stringify(this.#k.dump())}`
			}), "skip";
			case "dump_stack": return l.push({
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
			case "dump_lay": return l.push({
				t: "dumpLay",
				aLayNm: n.#c(i.layer)
			}), "skip";
			case "pop_stack":
				if ((i.clear ?? "false") !== "false") this.#I.length = 0;
				else if (!this.#I.pop()) throw "[pop_stack] スタックが空です";
				return this.#F.length = 0, this.#F.push(-1), this.#k.setMp({}), "skip";
			case "clearvar": return this.#k.clearGame(), "skip";
			case "clearsysvar": return this.#k.clearSys(), this.clearKidoku(), "skip";
			case "record_place": return this.recordPlace(), l.push({ t: "recordPlace" }), "skip";
			case "save": {
				if (i.place === void 0) throw "[save] placeは必須です";
				let e = n.#n("save", "place", i.place), t = {
					text: "",
					...i
				};
				delete t.place, l.push({
					t: "save",
					place: e,
					json: t
				});
				let r = Number(this.#k.get("sys:const.sn.save.place"));
				return e === r && this.#k.setNochk("sys:const.sn.save.place", r + 1), "skip";
			}
			case "load":
				if (i.index === void 0 && "fn" in i != "label" in i) throw "[load] fnとlabelはセットで指定して下さい";
				return l.push({
					t: "load",
					place: n.#i("load", "place", i.place, 0),
					fn: i.fn ?? "",
					label: i.label ?? "",
					...i.index === void 0 ? {} : { index: n.#n("load", "index", i.index) },
					...i.do_rec === void 0 ? {} : { doRec: i.do_rec !== "false" }
				}), "stop";
			case "reload_script": return l.push({ t: "reloadScript" }), "stop";
			case "copybookmark": {
				let e = n.#n("copybookmark", "from", i.from ?? ""), t = n.#n("copybookmark", "to", i.to ?? "");
				return e === t || l.push({
					t: "copyBookmark",
					from: e,
					to: t
				}), "skip";
			}
			case "erasebookmark": return l.push({
				t: "eraseBookmark",
				place: n.#n("erasebookmark", "place", i.place ?? "")
			}), "skip";
			case "export": return l.push({ t: "exportData" }), "skip";
			case "import": return l.push({ t: "importData" }), "skip";
			case "event": {
				let e = i.key ?? "", t = e.toLowerCase();
				if (!t) throw "[event] keyは必須です";
				let n = t.startsWith("dom="), r = i.global === "true" ? this.#R : this.#L;
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
				let { id: e, src: t } = i;
				if (!e) throw "[add_frame] idは必須です";
				if (!t) throw "[add_frame] srcは必須です";
				if (this.#k.get(`const.sn.frm.${e}`)) throw `[add_frame] frame【${e}】はすでにあります`;
				return l.push({
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
				return l.push({
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
				return this.#re("set_frame", e), this.#k.setNochk(`const.sn.frm.${e}.${t}`, n), l.push({
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
				return this.#re("let_frame", e), l.push({
					t: "letFrame",
					id: e,
					var_name: t,
					fnc: (i.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(i.global === "true"), "skip";
			case "enable_event": {
				let e = i.layer || this.#v, t = (i.enabled ?? "true") !== "false";
				return this.#k.setNochk(`save:const.sn.layer.${e}.enabled`, t), l.push({
					t: "enableEvent",
					nm: e,
					enabled: t
				}), "skip";
			}
			case "wait": {
				let e = n.#n("wait", "time", i.time ?? "");
				return this.skipEnabled ? (!this.skipAll && !this.isNextKidoku && this.cancelAutoSkip(), "skip") : (l.push({
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
				return l.push({
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
				let a = t ? "BGM" : i.buf || "SE", o = i.fn ?? "";
				if (!o) throw `[${e}] fnは必須です`;
				let s = t ? !0 : (i.loop ?? "false") !== "false", c = (i.join ?? "true") !== "false", u = n.#i(e, "speed", i.speed, 1), d = n.#i(e, "pan", i.pan, 0), f = n.#i(e, "start_ms", i.start_ms, 0);
				if (f < 0) throw `[${e}] start_ms:${String(f)} が負の値です`;
				let p = n.#i(e, "ret_ms", i.ret_ms, 0);
				if (p < 0) throw `[${e}] ret_ms:${String(p)} が負の値です`;
				let m = n.#i(e, "end_ms", i.end_ms, n.#o);
				if (m > 0) {
					if (m <= f) throw `[${e}] start_ms:${String(f)} >= end_ms:${String(m)} は異常値です`;
					if (m <= p) throw `[${e}] ret_ms:${String(p)} >= end_ms:${String(m)} は異常値です`;
				}
				let h = `const.sn.sound.${a}.`, g = n.#a(n.#i(e, "volume", i.volume, 1));
				this.#k.setNochk(`save:${h}volume`, g), this.#k.setNochk(`save:${h}fn`, o), this.#k.setNochk(`save:${h}start_ms`, f), this.#k.setNochk(`save:${h}end_ms`, m), this.#k.setNochk(`save:${h}ret_ms`, p);
				let _ = g * Number(this.#k.get(`sys:${h}volume`, 1, !0));
				if (a === "BGM") _ *= this.#O;
				else if (a === "VOICE") {
					let e = Number(this.#k.get("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
					if (this.#O = e, e !== 1) {
						let t = "const.sn.sound.BGM.", n = Number(this.#k.get(`save:${t}volume`, 1, !0)) * Number(this.#k.get(`sys:${t}volume`, 1, !0)) * e;
						l.push({
							t: "duckBgm",
							volume: n
						});
					}
				}
				return s ? this.#E(a, o) : this.#D(a), l.push({
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
				let t = e === "stopbgm" ? "BGM" : i.buf || "SE";
				return this.#D(t), l.push({
					t: "stopSnd",
					buf: t
				}), "skip";
			}
			case "stop_allse":
				for (let e of Object.keys(this.#T)) this.#D(e);
				return l.push({ t: "stopAllSnd" }), "skip";
			case "xchgbuf": {
				let e = i.buf || "SE", t = i.buf2 || "SE";
				if (e === t) return "skip";
				let r = {
					volume: 1,
					fn: "",
					start_ms: 0,
					end_ms: n.#o,
					ret_ms: 0
				}, a = `const.sn.sound.${e}.`, o = `const.sn.sound.${t}.`;
				for (let e of Object.keys(r)) {
					let t = this.#k.get(`save:${a}${e}`, r[e]), n = this.#k.get(`save:${o}${e}`, r[e]);
					this.#k.setNochk(`save:${a}${e}`, n), this.#k.setNochk(`save:${o}${e}`, t);
				}
				let s = this.#T[e], c = this.#T[t];
				return c === void 0 ? delete this.#T[e] : this.#T[e] = c, s === void 0 ? delete this.#T[t] : this.#T[t] = s, this.#k.setNochk("save:const.sn.loopPlaying", JSON.stringify(this.#T)), l.push({
					t: "xchgBufSnd",
					buf: e,
					buf2: t
				}), "skip";
			}
			case "volume": {
				let e = i.buf || "SE", t = `const.sn.sound.${e}.`, r = n.#a(n.#i("volume", "volume", i.volume, 1));
				this.#k.setNochk(`sys:${t}volume`, r);
				let a = Number(this.#k.get(`save:${t}volume`, 1, !0));
				return l.push({
					t: "volumeSnd",
					buf: e,
					volume: a * r
				}), "skip";
			}
			case "fadese":
			case "fadebgm":
			case "fadeoutse":
			case "fadeoutbgm": {
				let t = e === "fadebgm" || e === "fadeoutbgm", r = e === "fadeoutse" || e === "fadeoutbgm", a = t ? "BGM" : i.buf || "SE", o = `const.sn.sound.${a}.`, s = r ? 0 : n.#a(n.#n(e, "volume", i.volume ?? ""));
				this.#k.setNochk(`save:${o}volume`, s);
				let c = Number(this.#k.get(`sys:${o}volume`, 1, !0)), u = (i.stop ?? (s === 0 ? "true" : "false")) !== "false";
				u && this.#D(a);
				let d = this.skipEnabled, f = d ? 0 : n.#n(e, "time", i.time ?? ""), p = d ? 0 : n.#i(e, "delay", i.delay, 0);
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
				let t = e === "wl" ? "BGM" : i.buf || "SE", n = (i.canskip ?? "false") !== "false", r = (i.stop ?? "true") !== "false";
				return l.push({
					t: "waitSnd",
					buf: t,
					canskip: n,
					stop: r
				}), "stop";
			}
			case "wf":
			case "wb": {
				let t = e === "wb" ? "BGM" : i.buf || "SE", n = (i.canskip ?? "false") !== "false";
				return l.push({
					t: "waitFade",
					buf: t,
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
				if (oe(e)) return l.push({
					t: "plgTag",
					name: e,
					hArg: { ...i }
				}), "stop";
				let t = this.#V[e];
				return t === void 0 ? "skip" : (this.#Q(this.#_, !1, i), this.#k.setMp({
					...i,
					"const.sn.me_call_scriptFn": this.fn,
					"const.sn.macro": JSON.stringify({ name: e })
				}), t.fn === this.fn ? (this.#_ = t.idx, "skip") : (l.push({
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
};
//#endregion
export { ce as ScriptEngine, O as a, S as c, K as i, q as n, F as o, H as r, C as s, ae as t };

//# sourceMappingURL=ScriptEngine.js.map