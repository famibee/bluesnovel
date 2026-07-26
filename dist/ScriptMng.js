import { t as e } from "./rolldown-runtime.js";
import { a as t, c as n, i as r, p as i, r as a, t as o } from "./store.js";
import { a as s, i as c, o as l, r as u, t as d } from "./CmnLib.js";
import { a as f, i as p, n as m, o as h, r as g, s as _, t as v } from "./gsap.js";
import { PROTOCOL_USERDATA as y, t as b } from "./Config.js";
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
var T = class {
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
		};
		return this.#f(n), this.#c(n), n;
	}
	#o = /^\[(call|loadplugin)\s/;
	#s = /\bfn\s*=\s*[^\s\]]+/;
	#c(e) {
		if (this.cfg) {
			for (let t = e.len - 1; t >= 0; --t) {
				let n = e.aToken[t];
				if (!this.#o.test(n)) continue;
				let [r, i] = w(n);
				this.#l.parse(i);
				let a = this.#l.hPrm.fn;
				if (!a) continue;
				let { val: o } = a;
				if (!o.endsWith("*")) continue;
				e.aToken.splice(t, 1, "	", "; " + n), e.aLNum.splice(t, 1, NaN, NaN);
				let s = r === "loadplugin" ? b.CSS : b.SN, l = this.cfg.matchPath("^" + o.slice(0, -1) + ".*", s);
				for (let r of l) {
					let i = n.replace(this.#s, "fn=" + decodeURIComponent(c(r[s])));
					e.aToken.splice(t, 0, i), e.aLNum.splice(t, 0, NaN);
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
};
//#endregion
//#region src/sn/CmnInterface.ts
function E() {
	return {
		"const.sn.cfg.ns": "",
		"const.sn.aPageLog": "[]",
		"const.sn.nativeWindow.x": 0,
		"const.sn.nativeWindow.y": 0,
		"const.sn.nativeWindow.w": d.stageW,
		"const.sn.nativeWindow.h": d.stageH,
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
var D = { save: "game" }, O = class e {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = /* @__PURE__ */ new Set();
	constructor() {
		this.#r();
	}
	#r() {
		for (let [e, t] of Object.entries(E())) this.#e[`sys.${e}`] = typeof t == "function" ? 1 : t;
	}
	defBuiltin(e, t) {
		this.#t[e] = t;
	}
	static REG_NAME = /^(?:(tmp|game|save|sys|mp):)?([^\s:@]+)(@str)?$/;
	static parseName(t) {
		let n = e.REG_NAME.exec(t.trim());
		if (!n) throw `変数名が不正です：${t}`;
		let r = n[1] ?? "tmp";
		return {
			ns: D[r] ?? r,
			key: e.#i(n[2]),
			atStr: !!n[3]
		};
	}
	static #i(e) {
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
		let c = this.#a(i, a, n);
		return o ? c : e.castAuto(c);
	}
	#a(e, t, n) {
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
		r === "str" ? this.#n.add(o) : this.#n.delete(o), this.#e[o] = e.castTo(n, r);
	}
	static castTo(t, n) {
		switch (n) {
			case "": return t;
			case "num": return e.#o(t);
			case "int": return s(e.#o(t));
			case "uint": return l(e.#o(t));
			case "bool": return t != null && String(t) !== "false" && !!String(t);
			case "str": return t == null ? t : String(t);
			default: throw `cast【${String(n)}】は未定義です`;
		}
	}
	static #o(e) {
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
		this.#s("mp.");
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
		this.#s(n);
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
		this.#s("game.");
	}
	clearSys() {
		this.#s("sys."), this.#r();
	}
	#s(e) {
		for (let t of Object.keys(this.#e)) t.startsWith(e) && (delete this.#e[t], this.#n.delete(t));
	}
}, k = (/* @__PURE__ */ e(((e, t) => {
	(function(n, r) {
		typeof e == "object" && typeof t == "object" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : typeof e == "object" ? e.Parsimmon = r() : n.Parsimmon = r();
	})(typeof self < "u" ? self : e, function() {
		return function(e) {
			var t = {};
			function n(r) {
				if (t[r]) return t[r].exports;
				var i = t[r] = {
					i: r,
					l: !1,
					exports: {}
				};
				return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
			}
			return n.m = e, n.c = t, n.d = function(e, t, r) {
				n.o(e, t) || Object.defineProperty(e, t, {
					configurable: !1,
					enumerable: !0,
					get: r
				});
			}, n.r = function(e) {
				Object.defineProperty(e, "__esModule", { value: !0 });
			}, n.n = function(e) {
				var t = e && e.__esModule ? function() {
					return e.default;
				} : function() {
					return e;
				};
				return n.d(t, "a", t), t;
			}, n.o = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t);
			}, n.p = "", n(n.s = 0);
		}([function(e, t, n) {
			function r(e) {
				if (!(this instanceof r)) return new r(e);
				this._ = e;
			}
			var i = r.prototype;
			function a(e, t) {
				for (var n = 0; n < e; n++) t(n);
			}
			function o(e, t, n) {
				return function(e, t) {
					a(t.length, function(n) {
						e(t[n], n, t);
					});
				}(function(n, r, i) {
					t = e(t, n, r, i);
				}, n), t;
			}
			function s(e, t) {
				return o(function(t, n, r, i) {
					return t.concat([e(n, r, i)]);
				}, [], t);
			}
			function c(e, t) {
				var n = {
					v: 0,
					buf: t
				};
				return a(e, function() {
					var e;
					n = {
						v: n.v << 1 | (e = n.buf, e[0] >> 7),
						buf: function(e) {
							var t = o(function(e, t, n, r) {
								return e.concat(n === r.length - 1 ? Buffer.from([t, 0]).readUInt16BE(0) : r.readUInt16BE(n));
							}, [], e);
							return Buffer.from(s(function(e) {
								return (e << 1 & 65535) >> 8;
							}, t));
						}(n.buf)
					};
				}), n;
			}
			function l() {
				return typeof Buffer < "u";
			}
			function u() {
				if (!l()) throw Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.");
			}
			function d(e) {
				u();
				var t = o(function(e, t) {
					return e + t;
				}, 0, e);
				if (t % 8 != 0) throw Error("The bits [" + e.join(", ") + "] add up to " + t + " which is not an even number of bytes; the total should be divisible by 8");
				var n, i = t / 8, a = (n = function(e) {
					return e > 48;
				}, o(function(e, t) {
					return e || (n(t) ? t : e);
				}, null, e));
				if (a) throw Error(a + " bit range requested exceeds 48 bit (6 byte) Number max.");
				return new r(function(t, n) {
					var r = i + n;
					return r > t.length ? S(n, i.toString() + " bytes") : x(r, o(function(e, t) {
						var n = c(t, e.buf);
						return {
							coll: e.coll.concat(n.v),
							buf: n.buf
						};
					}, {
						coll: [],
						buf: t.slice(n, r)
					}, e).coll);
				});
			}
			function f(e, t) {
				return new r(function(n, r) {
					return u(), r + t > n.length ? S(r, t + " bytes for " + e) : x(r + t, n.slice(r, r + t));
				});
			}
			function p(e, t) {
				if (typeof (n = t) != "number" || Math.floor(n) !== n || t < 0 || t > 6) throw Error(e + " requires integer length in range [0, 6].");
				var n;
			}
			function m(e) {
				return p("uintBE", e), f("uintBE(" + e + ")", e).map(function(t) {
					return t.readUIntBE(0, e);
				});
			}
			function h(e) {
				return p("uintLE", e), f("uintLE(" + e + ")", e).map(function(t) {
					return t.readUIntLE(0, e);
				});
			}
			function g(e) {
				return p("intBE", e), f("intBE(" + e + ")", e).map(function(t) {
					return t.readIntBE(0, e);
				});
			}
			function _(e) {
				return p("intLE", e), f("intLE(" + e + ")", e).map(function(t) {
					return t.readIntLE(0, e);
				});
			}
			function v(e) {
				return e instanceof r;
			}
			function y(e) {
				return {}.toString.call(e) === "[object Array]";
			}
			function b(e) {
				return l() && Buffer.isBuffer(e);
			}
			function x(e, t) {
				return {
					status: !0,
					index: e,
					value: t,
					furthest: -1,
					expected: []
				};
			}
			function S(e, t) {
				return y(t) || (t = [t]), {
					status: !1,
					index: -1,
					value: null,
					furthest: e,
					expected: t
				};
			}
			function C(e, t) {
				if (!t || e.furthest > t.furthest) return e;
				var n = e.furthest === t.furthest ? function(e, t) {
					if (function() {
						if (r._supportsSet !== void 0) return r._supportsSet;
						var e = typeof Set < "u";
						return r._supportsSet = e, e;
					}() && Array.from) {
						for (var n = new Set(e), i = 0; i < t.length; i++) n.add(t[i]);
						var a = Array.from(n);
						return a.sort(), a;
					}
					for (var o = {}, s = 0; s < e.length; s++) o[e[s]] = !0;
					for (var c = 0; c < t.length; c++) o[t[c]] = !0;
					var l = [];
					for (var u in o) ({}).hasOwnProperty.call(o, u) && l.push(u);
					return l.sort(), l;
				}(e.expected, t.expected) : t.expected;
				return {
					status: e.status,
					index: e.index,
					value: e.value,
					furthest: t.furthest,
					expected: n
				};
			}
			var w = {};
			function ee(e, t) {
				if (b(e)) return {
					offset: t,
					line: -1,
					column: -1
				};
				e in w || (w[e] = {});
				for (var n = w[e], r = 0, i = 0, a = 0, o = t; o >= 0;) {
					if (o in n) {
						r = n[o].line, a === 0 && (a = n[o].lineStart);
						break;
					}
					(e.charAt(o) === "\n" || e.charAt(o) === "\r" && e.charAt(o + 1) !== "\n") && (i++, a === 0 && (a = o + 1)), o--;
				}
				var s = r + i, c = t - a;
				return n[t] = {
					line: s,
					lineStart: a
				}, {
					offset: t,
					line: s + 1,
					column: c + 1
				};
			}
			function T(e) {
				if (!v(e)) throw Error("not a parser: " + e);
			}
			function E(e, t) {
				return typeof e == "string" ? e.charAt(t) : e[t];
			}
			function D(e) {
				if (typeof e != "number") throw Error("not a number: " + e);
			}
			function O(e) {
				if (typeof e != "function") throw Error("not a function: " + e);
			}
			function k(e) {
				if (typeof e != "string") throw Error("not a string: " + e);
			}
			var te = 2, A = 3, j = 8, ne = 5 * j, M = 4 * j, N = "  ";
			function P(e, t) {
				return Array(t + 1).join(e);
			}
			function F(e, t, n) {
				var r = t - e.length;
				return r <= 0 ? e : P(n, r) + e;
			}
			function re(e, t, n, r) {
				return {
					from: e - t > 0 ? e - t : 0,
					to: e + n > r ? r : e + n
				};
			}
			function ie(e, t) {
				var n, r, i, a, c, l = t.index, u = l.offset, d = 1;
				if (u === e.length) return "Got the end of the input";
				if (b(e)) {
					var f = u - u % j, p = u - f, m = re(f, ne, M + j, e.length), h = s(function(e) {
						return s(function(e) {
							return F(e.toString(16), 2, "0");
						}, e);
					}, function(e, t) {
						var n = e.length, r = [], i = 0;
						if (n <= t) return [e.slice()];
						for (var a = 0; a < n; a++) r[i] || r.push([]), r[i].push(e[a]), (a + 1) % t == 0 && i++;
						return r;
					}(e.slice(m.from, m.to).toJSON().data, j));
					a = function(e) {
						return e.from === 0 && e.to === 1 ? {
							from: e.from,
							to: e.to
						} : {
							from: e.from / j,
							to: Math.floor(e.to / j)
						};
					}(m), r = f / j, n = 3 * p, p >= 4 && (n += 1), d = 2, i = s(function(e) {
						return e.length <= 4 ? e.join(" ") : e.slice(0, 4).join(" ") + "  " + e.slice(4).join(" ");
					}, h), (c = (8 * (a.to > 0 ? a.to - 1 : a.to)).toString(16).length) < 2 && (c = 2);
				} else {
					var g = e.split(/\r\n|[\n\r\u2028\u2029]/);
					n = l.column - 1, r = l.line - 1, a = re(r, te, A, g.length), i = g.slice(a.from, a.to), c = a.to.toString().length;
				}
				var _ = r - a.from;
				return b(e) && (c = (8 * (a.to > 0 ? a.to - 1 : a.to)).toString(16).length) < 2 && (c = 2), o(function(t, r, i) {
					var o, s = i === _, l = s ? "> " : N;
					return o = b(e) ? F((8 * (a.from + i)).toString(16), c, "0") : F((a.from + i + 1).toString(), c, " "), [].concat(t, [l + o + " | " + r], s ? [N + P(" ", c) + " | " + F("", n, " ") + P("^", d)] : []);
				}, [], i).join("\n");
			}
			function ae(e, t) {
				return [
					"\n",
					"-- PARSING FAILED " + P("-", 50),
					"\n\n",
					ie(e, t),
					"\n\n",
					(n = t.expected, n.length === 1 ? "Expected:\n\n" + n[0] : "Expected one of the following: \n\n" + n.join(", ")),
					"\n"
				].join("");
				var n;
			}
			function I(e) {
				return e.flags === void 0 ? [
					e.global ? "g" : "",
					e.ignoreCase ? "i" : "",
					e.multiline ? "m" : "",
					e.unicode ? "u" : "",
					e.sticky ? "y" : ""
				].join("") : e.flags;
			}
			function L() {
				for (var e = [].slice.call(arguments), t = e.length, n = 0; n < t; n += 1) T(e[n]);
				return r(function(n, r) {
					for (var i, a = Array(t), o = 0; o < t; o += 1) {
						if (!(i = C(e[o]._(n, r), i)).status) return i;
						a[o] = i.value, r = i.index;
					}
					return C(x(r, a), i);
				});
			}
			function R() {
				var e = [].slice.call(arguments);
				if (e.length === 0) throw Error("seqMap needs at least one argument");
				var t = e.pop();
				return O(t), L.apply(null, e).map(function(e) {
					return t.apply(null, e);
				});
			}
			function z() {
				var e = [].slice.call(arguments), t = e.length;
				if (t === 0) return G("zero alternates");
				for (var n = 0; n < t; n += 1) T(e[n]);
				return r(function(t, n) {
					for (var r, i = 0; i < e.length; i += 1) if ((r = C(e[i]._(t, n), r)).status) return r;
					return r;
				});
			}
			function B(e, t) {
				return V(e, t).or(W([]));
			}
			function V(e, t) {
				return T(e), T(t), R(e, t.then(e).many(), function(e, t) {
					return [e].concat(t);
				});
			}
			function H(e) {
				k(e);
				var t = "'" + e + "'";
				return r(function(n, r) {
					var i = r + e.length, a = n.slice(r, i);
					return a === e ? x(i, a) : S(r, t);
				});
			}
			function U(e, t) {
				(function(e) {
					if (!(e instanceof RegExp)) throw Error("not a regexp: " + e);
					for (var t = I(e), n = 0; n < t.length; n++) {
						var r = t.charAt(n);
						if (r !== "i" && r !== "m" && r !== "u" && r !== "s") throw Error("unsupported regexp flag \"" + r + "\": " + e);
					}
				})(e), arguments.length >= 2 ? D(t) : t = 0;
				var n = function(e) {
					return RegExp("^(?:" + e.source + ")", I(e));
				}(e), i = "" + e;
				return r(function(e, r) {
					var a = n.exec(e.slice(r));
					if (a) {
						if (0 <= t && t <= a.length) {
							var o = a[0], s = a[t];
							return x(r + o.length, s);
						}
						return S(r, "valid match group (0 to " + a.length + ") in " + i);
					}
					return S(r, i);
				});
			}
			function W(e) {
				return r(function(t, n) {
					return x(n, e);
				});
			}
			function G(e) {
				return r(function(t, n) {
					return S(n, e);
				});
			}
			function K(e) {
				if (v(e)) return r(function(t, n) {
					var r = e._(t, n);
					return r.index = n, r.value = "", r;
				});
				if (typeof e == "string") return K(H(e));
				if (e instanceof RegExp) return K(U(e));
				throw Error("not a string, regexp, or parser: " + e);
			}
			function q(e) {
				return T(e), r(function(t, n) {
					var r = e._(t, n), i = t.slice(n, r.index);
					return r.status ? S(n, "not \"" + i + "\"") : x(n, null);
				});
			}
			function J(e) {
				return O(e), r(function(t, n) {
					var r = E(t, n);
					return n < t.length && e(r) ? x(n + 1, r) : S(n, "a character/byte matching " + e);
				});
			}
			function oe(e, t) {
				arguments.length < 2 && (t = e, e = void 0);
				var n = r(function(e, r) {
					return n._ = t()._, n._(e, r);
				});
				return e ? n.desc(e) : n;
			}
			function Y() {
				return G("fantasy-land/empty");
			}
			i.parse = function(e) {
				if (typeof e != "string" && !b(e)) throw Error(".parse must be called with a string or Buffer as its argument");
				var t, n = this.skip(Z)._(e, 0);
				return t = n.status ? {
					status: !0,
					value: n.value
				} : {
					status: !1,
					index: ee(e, n.furthest),
					expected: n.expected
				}, delete w[e], t;
			}, i.tryParse = function(e) {
				var t = this.parse(e);
				if (t.status) return t.value;
				var n = ae(e, t), r = Error(n);
				throw r.type = "ParsimmonError", r.result = t, r;
			}, i.assert = function(e, t) {
				return this.chain(function(n) {
					return e(n) ? W(n) : G(t);
				});
			}, i.or = function(e) {
				return z(this, e);
			}, i.trim = function(e) {
				return this.wrap(e, e);
			}, i.wrap = function(e, t) {
				return R(e, this, t, function(e, t) {
					return t;
				});
			}, i.thru = function(e) {
				return e(this);
			}, i.then = function(e) {
				return T(e), L(this, e).map(function(e) {
					return e[1];
				});
			}, i.many = function() {
				var e = this;
				return r(function(t, n) {
					for (var r = [], i = void 0;;) {
						if (!(i = C(e._(t, n), i)).status) return C(x(n, r), i);
						if (n === i.index) throw Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");
						n = i.index, r.push(i.value);
					}
				});
			}, i.tieWith = function(e) {
				return k(e), this.map(function(t) {
					if (function(e) {
						if (!y(e)) throw Error("not an array: " + e);
					}(t), t.length) {
						k(t[0]);
						for (var n = t[0], r = 1; r < t.length; r++) k(t[r]), n += e + t[r];
						return n;
					}
					return "";
				});
			}, i.tie = function() {
				return this.tieWith("");
			}, i.times = function(e, t) {
				var n = this;
				return arguments.length < 2 && (t = e), D(e), D(t), r(function(r, i) {
					for (var a = [], o = void 0, s = void 0, c = 0; c < e; c += 1) {
						if (s = C(o = n._(r, i), s), !o.status) return s;
						i = o.index, a.push(o.value);
					}
					for (; c < t && (s = C(o = n._(r, i), s), o.status); c += 1) i = o.index, a.push(o.value);
					return C(x(i, a), s);
				});
			}, i.result = function(e) {
				return this.map(function() {
					return e;
				});
			}, i.atMost = function(e) {
				return this.times(0, e);
			}, i.atLeast = function(e) {
				return R(this.times(e), this.many(), function(e, t) {
					return e.concat(t);
				});
			}, i.map = function(e) {
				O(e);
				var t = this;
				return r(function(n, r) {
					var i = t._(n, r);
					return i.status ? C(x(i.index, e(i.value)), i) : i;
				});
			}, i.contramap = function(e) {
				O(e);
				var t = this;
				return r(function(n, r) {
					var i = t.parse(e(n.slice(r)));
					return i.status ? x(r + n.length, i.value) : i;
				});
			}, i.promap = function(e, t) {
				return O(e), O(t), this.contramap(e).map(t);
			}, i.skip = function(e) {
				return L(this, e).map(function(e) {
					return e[0];
				});
			}, i.mark = function() {
				return R(X, this, X, function(e, t, n) {
					return {
						start: e,
						value: t,
						end: n
					};
				});
			}, i.node = function(e) {
				return R(X, this, X, function(t, n, r) {
					return {
						name: e,
						value: n,
						start: t,
						end: r
					};
				});
			}, i.sepBy = function(e) {
				return B(this, e);
			}, i.sepBy1 = function(e) {
				return V(this, e);
			}, i.lookahead = function(e) {
				return this.skip(K(e));
			}, i.notFollowedBy = function(e) {
				return this.skip(q(e));
			}, i.desc = function(e) {
				y(e) || (e = [e]);
				var t = this;
				return r(function(n, r) {
					var i = t._(n, r);
					return i.status || (i.expected = e), i;
				});
			}, i.fallback = function(e) {
				return this.or(W(e));
			}, i.ap = function(e) {
				return R(e, this, function(e, t) {
					return e(t);
				});
			}, i.chain = function(e) {
				var t = this;
				return r(function(n, r) {
					var i = t._(n, r);
					return i.status ? C(e(i.value)._(n, i.index), i) : i;
				});
			}, i.concat = i.or, i.empty = Y, i.of = W, i["fantasy-land/ap"] = i.ap, i["fantasy-land/chain"] = i.chain, i["fantasy-land/concat"] = i.concat, i["fantasy-land/empty"] = i.empty, i["fantasy-land/of"] = i.of, i["fantasy-land/map"] = i.map;
			var X = r(function(e, t) {
				return x(t, ee(e, t));
			}), se = r(function(e, t) {
				return t >= e.length ? S(t, "any character/byte") : x(t + 1, E(e, t));
			}), ce = r(function(e, t) {
				return x(e.length, e.slice(t));
			}), Z = r(function(e, t) {
				return t < e.length ? S(t, "EOF") : x(t, null);
			}), le = U(/[0-9]/).desc("a digit"), ue = U(/[0-9]*/).desc("optional digits"), Q = U(/[a-z]/i).desc("a letter"), de = U(/[a-z]*/i).desc("optional letters"), fe = U(/\s*/).desc("optional whitespace"), pe = U(/\s+/).desc("whitespace"), me = H("\r"), he = H("\n"), ge = H("\r\n"), $ = z(ge, he, me).desc("newline"), _e = z($, Z);
			r.all = ce, r.alt = z, r.any = se, r.cr = me, r.createLanguage = function(e) {
				var t = {};
				for (var n in e) ({}).hasOwnProperty.call(e, n) && function(n) {
					t[n] = oe(function() {
						return e[n](t);
					});
				}(n);
				return t;
			}, r.crlf = ge, r.custom = function(e) {
				return r(e(x, S));
			}, r.digit = le, r.digits = ue, r.empty = Y, r.end = _e, r.eof = Z, r.fail = G, r.formatError = ae, r.index = X, r.isParser = v, r.lazy = oe, r.letter = Q, r.letters = de, r.lf = he, r.lookahead = K, r.makeFailure = S, r.makeSuccess = x, r.newline = $, r.noneOf = function(e) {
				return J(function(t) {
					return e.indexOf(t) < 0;
				}).desc("none of '" + e + "'");
			}, r.notFollowedBy = q, r.of = W, r.oneOf = function(e) {
				for (var t = e.split(""), n = 0; n < t.length; n++) t[n] = "'" + t[n] + "'";
				return J(function(t) {
					return e.indexOf(t) >= 0;
				}).desc(t);
			}, r.optWhitespace = fe, r.Parser = r, r.range = function(e, t) {
				return J(function(n) {
					return e <= n && n <= t;
				}).desc(e + "-" + t);
			}, r.regex = U, r.regexp = U, r.sepBy = B, r.sepBy1 = V, r.seq = L, r.seqMap = R, r.seqObj = function() {
				for (var e, t = {}, n = 0, i = (e = arguments, Array.prototype.slice.call(e)), a = i.length, o = 0; o < a; o += 1) {
					var s = i[o];
					if (!v(s)) {
						if (y(s) && s.length === 2 && typeof s[0] == "string" && v(s[1])) {
							var c = s[0];
							if (Object.prototype.hasOwnProperty.call(t, c)) throw Error("seqObj: duplicate key " + c);
							t[c] = !0, n++;
							continue;
						}
						throw Error("seqObj arguments must be parsers or [string, parser] array pairs.");
					}
				}
				if (n === 0) throw Error("seqObj expects at least one named parser, found zero");
				return r(function(e, t) {
					for (var n, r = {}, o = 0; o < a; o += 1) {
						var s, c;
						if (y(i[o]) ? (s = i[o][0], c = i[o][1]) : (s = null, c = i[o]), !(n = C(c._(e, t), n)).status) return n;
						s && (r[s] = n.value), t = n.index;
					}
					return C(x(t, r), n);
				});
			}, r.string = H, r.succeed = W, r.takeWhile = function(e) {
				return O(e), r(function(t, n) {
					for (var r = n; r < t.length && e(E(t, r));) r++;
					return x(r, t.slice(n, r));
				});
			}, r.test = J, r.whitespace = pe, r["fantasy-land/empty"] = Y, r["fantasy-land/of"] = W, r.Binary = {
				bitSeq: d,
				bitSeqObj: function(e) {
					u();
					var t = {}, n = 0, r = s(function(e) {
						if (y(e)) {
							var r = e;
							if (r.length !== 2) throw Error("[" + r.join(", ") + "] should be length 2, got length " + r.length);
							if (k(r[0]), D(r[1]), Object.prototype.hasOwnProperty.call(t, r[0])) throw Error("duplicate key in bitSeqObj: " + r[0]);
							return t[r[0]] = !0, n++, r;
						}
						return D(e), [null, e];
					}, e);
					if (n < 1) throw Error("bitSeqObj expects at least one named pair, got [" + e.join(", ") + "]");
					var i = s(function(e) {
						return e[0];
					}, r);
					return d(s(function(e) {
						return e[1];
					}, r)).map(function(e) {
						return o(function(e, t) {
							return t[0] !== null && (e[t[0]] = t[1]), e;
						}, {}, s(function(t, n) {
							return [t, e[n]];
						}, i));
					});
				},
				byte: function(e) {
					if (u(), D(e), e > 255) throw Error("Value specified to byte constructor (" + e + "=0x" + e.toString(16) + ") is larger in value than a single byte.");
					var t = (e > 15 ? "0x" : "0x0") + e.toString(16);
					return r(function(n, r) {
						var i = E(n, r);
						return i === e ? x(r + 1, i) : S(r, t);
					});
				},
				buffer: function(e) {
					return f("buffer", e).map(function(e) {
						return Buffer.from(e);
					});
				},
				encodedString: function(e, t) {
					return f("string", t).map(function(t) {
						return t.toString(e);
					});
				},
				uintBE: m,
				uint8BE: m(1),
				uint16BE: m(2),
				uint32BE: m(4),
				uintLE: h,
				uint8LE: h(1),
				uint16LE: h(2),
				uint32LE: h(4),
				intBE: g,
				int8BE: g(1),
				int16BE: g(2),
				int32BE: g(4),
				intLE: _,
				int8LE: _(1),
				int16LE: _(2),
				int32LE: _(4),
				floatBE: f("floatBE", 4).map(function(e) {
					return e.readFloatBE(0);
				}),
				floatLE: f("floatLE", 4).map(function(e) {
					return e.readFloatLE(0);
				}),
				doubleBE: f("doubleBE", 8).map(function(e) {
					return e.readDoubleBE(0);
				}),
				doubleLE: f("doubleLE", 8).map(function(e) {
					return e.readDoubleLE(0);
				})
			}, e.exports = r;
		}]);
	});
})))(), te = class {
	val;
	#e = null;
	constructor(e, t = "\\") {
		this.val = e;
		function n(e) {
			let t = [];
			for (let n of e) t.push((typeof n == "string" ? (0, k.string)(n) : (0, k.regex)(n)).trim(k.optWhitespace));
			return (0, k.alt)(...t);
		}
		function r(e) {
			return (0, k.alt)(...Object.keys(e).sort().map((t) => {
				let n = e[t];
				return (typeof n == "string" ? (0, k.string)(n) : (0, k.regex)(n)).trim(k.optWhitespace).result(t);
			}));
		}
		function i(e, t) {
			let n = (0, k.lazy)(() => (0, k.seq)(e, n).or(t));
			return n;
		}
		function a(e, t) {
			return (0, k.seqMap)(t, e.many(), (e, t) => t.reduce((e, t) => [t, e], e));
		}
		function o(e, t) {
			let n = (0, k.lazy)(() => t.chain((t) => (0, k.seq)(e, (0, k.of)(t), n).or((0, k.of)(t))));
			return n;
		}
		function c(e, t) {
			return (0, k.seqMap)(t, (0, k.seq)(e, t).many(), (e, t) => t.reduce((e, t) => [
				t[0],
				e,
				t[1]
			], e));
		}
		let l = (0, k.alt)((0, k.alt)((0, k.regex)(/-?(0|[1-9][0-9]*)\.[0-9]+/), (0, k.regex)(/0x[0-9a-fA-F]+/)).map(Number), (0, k.alt)((0, k.regex)(/-?(0|[1-9][0-9]*)/)).map((e) => s(e))).map((e) => ["!num!", e]).desc("number"), u = (0, k.string)("null").map(() => ["!str!", null]), d = (0, k.regex)(/(true|false)/).map((e) => ["!bool!", e === "true"]).desc("boolean"), f = (0, k.regex)(RegExp(`(?:"(?:\\${t}["'#\\n]|[^"])*"|'(?:\\${t}["'#\\n]|[^'])*'|\\#(?:\\${t}["'#\\n]|[^#])*\\#)`)).map((e) => ["!str!", e.slice(1, -1).replaceAll(t, "")]).desc("string"), p = /\[[^\]]+\]/g, m = (0, k.regex)(/-?(?:(?:tmp|sys|game|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*(?:@str)?/).map((e) => {
			let t = e.replaceAll(p, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
			return n == null ? ["!str!", n] : typeof n == "boolean" ? ["!bool!", n] : Object.prototype.toString.call(n) === "[object String]" ? ["!str!", String(n)] : ["!num!", Number(n)];
		}).desc("string"), h = (0, k.lazy)(() => (0, k.string)("(").then(this.#e).skip((0, k.string)(")")).or(l).or(u).or(d).or(f).or(m)), g = [
			{
				type: i,
				ops: n([/[A-Za-z_][A-Za-z0-9_]*(?=\()/])
			},
			{
				type: a,
				ops: r({ PostfixInc: "++" })
			},
			{
				type: a,
				ops: r({ PostfixDec: "--" })
			},
			{
				type: i,
				ops: n([/!(?!=)|~/])
			},
			{
				type: i,
				ops: r({ PrefixInc: "++" })
			},
			{
				type: i,
				ops: r({ PrefixDec: "--" })
			},
			{
				type: i,
				ops: r({ UnaryNegate: /-(?!-)/ })
			},
			{
				type: o,
				ops: n(["**"])
			},
			{
				type: c,
				ops: n([
					"*",
					"/",
					"¥",
					"%"
				])
			},
			{
				type: c,
				ops: n(["+", "-"])
			},
			{
				type: c,
				ops: n([/>>>|<<|>>/])
			},
			{
				type: c,
				ops: n([/<=|<|>=|>/])
			},
			{
				type: c,
				ops: n([/===|!==|==|!=/])
			},
			{
				type: c,
				ops: n([/&(?!&)/])
			},
			{
				type: c,
				ops: n(["^"])
			},
			{
				type: c,
				ops: n([/\|(?!\|)/])
			},
			{
				type: c,
				ops: n(["&&"])
			},
			{
				type: c,
				ops: n(["||"])
			},
			{
				type: o,
				ops: n([":"])
			},
			{
				type: o,
				ops: n(["?"])
			}
		];
		this.#e = g.reduce((e, t) => t.type(t.ops, e), h).trim(k.optWhitespace);
	}
	parse(e) {
		let t = this.#e.parse(e);
		if (!t.status) throw Error(`(ExprEval)文法エラー【${e}】`);
		let n = t.value;
		return n[0] === "!str!" ? this.#a(n[1]) : this.#t(n);
	}
	evalBool(e) {
		let t = this.parse(e);
		return !!t && t !== "false";
	}
	#t(e) {
		let t = e.shift();
		if (t instanceof Array) return this.#t(t);
		let n = this.#n[t];
		return n ? n(e) : Object(null);
	}
	#n = {
		"!num!": (e) => e.shift(),
		"!str!": (e) => this.#a(e.shift()),
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
		"!": (e) => !this.#n.Boolean(e),
		"~": (e) => ~Number(this.#t(e.shift())),
		UnaryNegate: (e) => -this.#n.Number(e),
		"**": (e) => Number(this.#t(e.shift())) ** Number(this.#t(e.shift())),
		"*": (e) => Number(this.#t(e.shift())) * Number(this.#t(e.shift())),
		"/": (e) => Number(this.#t(e.shift())) / Number(this.#t(e.shift())),
		"¥": (e) => Math.floor(this.#n["/"](e)),
		"%": (e) => Number(this.#t(e.shift())) % Number(this.#t(e.shift())),
		"+": (e) => {
			let t = this.#t(e.shift()), n = this.#t(e.shift());
			return Object.prototype.toString.call(t) === "[object String]" || Object.prototype.toString.call(n) === "[object String]" ? String(t) + String(n) : Number(t) + Number(n);
		},
		"-": (e) => Number(this.#t(e.shift())) - Number(this.#t(e.shift())),
		int: (e) => s(this.#r(e.shift())),
		parseInt: (e) => s(this.#n.Number(e)),
		Number: (e) => {
			let t = this.#t(e.shift());
			return Object.prototype.toString.call(t) === "[object String]" ? this.#r(this.#e.parse(String(t)).value) : Number(t);
		},
		Boolean: (e) => {
			let t = e.shift();
			return t[0] === "!bool!" ? !!t[1] : !!this.#t(t);
		},
		ceil: (e) => Math.ceil(this.#r(e.shift())),
		floor: (e) => Math.floor(this.#r(e.shift())),
		round: (e) => Math.round(this.#r(e.shift())),
		isNaN: (e) => Number.isNaN(this.#r(e.shift())),
		"<<": (e) => Number(this.#t(e.shift())) << Number(this.#t(e.shift())),
		">>": (e) => Number(this.#t(e.shift())) >> Number(this.#t(e.shift())),
		">>>": (e) => Number(this.#t(e.shift())) >>> Number(this.#t(e.shift())),
		"<": (e) => Number(this.#t(e.shift())) < Number(this.#t(e.shift())),
		"<=": (e) => Number(this.#t(e.shift())) <= Number(this.#t(e.shift())),
		">": (e) => Number(this.#t(e.shift())) > Number(this.#t(e.shift())),
		">=": (e) => Number(this.#t(e.shift())) >= Number(this.#t(e.shift())),
		"==": (e) => {
			let t = this.#t(e.shift()), n = this.#t(e.shift());
			return t == null && n == null ? t == n : String(t) === String(n);
		},
		"!=": (e) => !this.#n["=="](e),
		"===": (e) => {
			let t = this.#t(e.shift()), n = this.#t(e.shift());
			return Object.prototype.toString.call(t) === Object.prototype.toString.call(n) && String(t) === String(n);
		},
		"!==": (e) => !this.#n["==="](e),
		"&": (e) => Number(this.#t(e.shift())) & Number(this.#t(e.shift())),
		"^": (e) => Number(this.#t(e.shift())) ^ Number(this.#t(e.shift())),
		"|": (e) => Number(this.#t(e.shift())) | Number(this.#t(e.shift())),
		"&&": (e) => String(this.#t(e.shift())) === "true" && String(this.#t(e.shift())) === "true",
		"||": (e) => String(this.#t(e.shift())) === "true" || String(this.#t(e.shift())) === "true",
		"?": (e) => {
			let t = this.#n.Boolean(e), n = e.shift();
			if (n[0] !== ":") throw Error("(ExprEval)三項演算子の文法エラーです。: が見つかりません");
			return this.#t(n[t ? 1 : 2]);
		},
		":": () => {
			throw Error("(ExprEval)三項演算子の文法エラーです。? が見つかりません");
		}
	};
	#r(e) {
		let t = this.#t(e);
		if (Object.prototype.toString.call(t) !== "[object Number]") throw Error(`(ExprEval)引数【${String(t)}】が数値ではありません`);
		return Number(t);
	}
	#i = /(\$((tmp|sys|game|mp):)?[^\s!--/:-@[-^`{-~]+|#\{[^}]+})/g;
	#a(e) {
		return e == null ? e : String(e).replaceAll(this.#i, (e) => String(e.startsWith("$") ? this.val.get(e.slice(1)) : this.parse(e.slice(2, -1))));
	}
	getValAmpersand = (e) => e.startsWith("&") ? String(this.parse(e.slice(1))) : e;
}, A = class {
	fn;
	grm;
	#e;
	get aToken() {
		return this.#e.aToken;
	}
	#t = Object.create(null);
	constructor(e, t, n = new T()) {
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
}, ne = [
	"alpha",
	"left",
	"top",
	"rotation",
	"scale_x",
	"scale_y",
	"pivot_x",
	"pivot_y"
], M = [
	"alpha",
	"x",
	"y",
	"width",
	"height",
	"scale_x",
	"scale_y",
	"rotate"
], N = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function P(e, t, n = ne) {
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
var F = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
function re(e, t, n = ne) {
	let r = [];
	for (let { groups: i } of t.matchAll(F)) {
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
		r.push(P(e, d, n));
	}
	return r;
}
var ie = {
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
}, ae = {
	In: "in",
	Out: "out",
	InOut: "inOut"
};
function I(e) {
	if (!e) return "none";
	let [t = "", n = ""] = e.split(".");
	if (t === "Linear") return "none";
	let r = ie[t], i = ae[n];
	if (!r || !i) throw `異常なease指定です：${e}`;
	return `${r}.${i}`;
}
function L(e, t) {
	if (t.id) return `frm\n${t.id}`;
	let n = t.name ?? t.layer ?? "";
	if (!n) throw `[${e}] トゥイーンが指定されていません（name／layerのどちらも無し）`;
	return n;
}
//#endregion
//#region src/ts/Log.ts
var R = 64, z = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), B = (e) => z(e).replaceAll("'", "&#39;");
function V(e) {
	return H(_(e));
}
function H(e) {
	let t = "";
	for (let n of e) {
		if (n.c === "\n") {
			t += "<br/>";
			continue;
		}
		let e = z(n.c), r = n.r ? `<ruby>${e}<rt${n.rs ? ` style='${B(n.rs)}'` : ""}>${z(f(n.r))}</rt></ruby>` : e, i = (n.s ?? "") + (n.tcy ? "text-combine-upright: all;" : "");
		t += i ? `<span style='${B(i)}'>${r}</span>` : r;
	}
	return t;
}
var U = class {
	maxLen;
	#e = [];
	#t = "";
	constructor(e = () => R) {
		this.maxLen = e;
	}
	add(e) {
		this.#t += e;
	}
	pagebreak() {
		let e = V(this.#t);
		if (this.#t = "", !e) return;
		let t = this.maxLen();
		this.#e.push({ text: e }) > t && (this.#e = this.#e.slice(-t));
	}
	reset(e = "") {
		this.#e = [], this.#t = e;
	}
	json() {
		return JSON.stringify([...this.#e, { text: V(this.#t) }]);
	}
	playback(e) {
		try {
			let t = JSON.parse(e);
			this.#e = Array.isArray(t) ? t : [];
		} catch {
			this.#e = [];
		}
		this.#t = "";
	}
}, W = class e {
	static #e = new S();
	static parseTag(t) {
		let [n, r] = w(t);
		e.#e.parse(r);
		let i = {};
		for (let [t, n] of Object.entries(e.#e.hPrm)) i[t] = n.val;
		return {
			name: n,
			args: i
		};
	}
	#t(t) {
		let [n, r] = w(t), i = e.#e;
		i.parse(r);
		let a = i.hPrm, o = a.cond?.val;
		if (o !== void 0) {
			if (!o || o.startsWith("&")) throw "属性condは「&」が不要です";
			let e = this.#C.parse(o), t = String(e);
			if (!e || t === "null" || t === "undefined" || t === "false") return;
		}
		let s = this.#O.at(-1), c = Object.create(null);
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
			if (r = this.#C.getValAmpersand(r), r !== "undefined") {
				c[e] = r;
				continue;
			}
			n !== void 0 && (r = this.#C.getValAmpersand(n), r !== "undefined" && (c[e] = r));
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
		let a = Number(this.#S.get(n === "left" ? "tmp:const.sn.config.window.width" : "tmp:const.sn.config.window.height"));
		return Number.isFinite(a) ? i * a : i;
	}
	static #i(t, n, r, i) {
		return r === void 0 ? i : e.#n(t, n, r);
	}
	static #a(e, t) {
		let { reg: n, flags: r } = t;
		if (!n) throw `[${e}] regは必須です`;
		return r ? new RegExp(n, r) : new RegExp(n);
	}
	static #o(e) {
		let t = (e ?? "").split(",").map((e) => e.trim()).filter((e) => e !== "");
		return t.length > 0 ? t : null;
	}
	static #s = {
		normal: "normal",
		add: "plus-lighter",
		multiply: "multiply",
		screen: "screen"
	};
	static #c = {
		fill: "color",
		fontSize: "font-size",
		fontFamily: "font-family",
		fontWeight: "font-weight",
		fontStyle: "font-style",
		align: "text-align",
		letterSpacing: "letter-spacing",
		lineHeight: "line-height"
	};
	static #l(t) {
		if (!t.trimStart().startsWith("{")) return t;
		let n;
		try {
			n = JSON.parse(t);
		} catch {
			return t;
		}
		return Object.entries(n).map(([t, n]) => {
			let r = e.#c[t];
			return r ? `${r}: ${typeof n == "number" && r !== "line-height" && r !== "font-weight" ? `${String(n)}px` : String(n)};` : "";
		}).join("");
	}
	static #u(t) {
		let n = e.#s[t];
		if (!n) throw `${t} はサポートされない blendmode です`;
		return n;
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
		"left",
		"top",
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
		let r = t.path ? re(e, t.path, n) : void 0;
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
	#b = !1;
	get clearOnResume() {
		return this.#b;
	}
	set clearOnResume(e) {
		this.#b = e;
	}
	#x = Object.create(null);
	#S = new O();
	#C = new te(this.#S);
	#w = new U(() => {
		let e = Number(this.#S.get("tmp:const.sn.config.log.max_len"));
		return Number.isFinite(e) && e > 0 ? e : 64;
	});
	get #T() {
		return this.#S.get("game:sn.doRecLog") === !0;
	}
	get chWait() {
		let e = this.#S.get("tmp:const.sn.isKidoku") === !0;
		if (this.#S.get(e ? "sys:sn.tagCh.doWait_Kidoku" : "sys:sn.tagCh.doWait") === !1) return 0;
		let t = Number(this.#S.get(e ? "sys:sn.tagCh.msecWait_Kidoku" : "sys:sn.tagCh.msecWait"));
		return Number.isFinite(t) && t >= 0 ? t : 10;
	}
	#E = {
		in: /* @__PURE__ */ new Set(["default"]),
		out: /* @__PURE__ */ new Set(["default"])
	};
	#D = [];
	#O = [];
	#k = Object.create(null);
	#A = Object.create(null);
	#j = Object.create(null);
	#M = !1;
	#N = Object.create(null);
	static REG_NG4MAC_NM = /["'#;\\\]　]+/;
	static RESERVED_TAGS = /* @__PURE__ */ new Set(/* @__PURE__ */ "add_lay.current.add_face.lay.clear_lay.trans.wt.finish_trans.set_cancel_skip.let.let_ml.endlet_ml.let_abs.let_char_at.let_index_of.let_length.let_replace.let_round.let_search.let_substr.tsy.tsy_frame.wait_tsy.stop_tsy.pause_tsy.resume_tsy.quake.stop_quake.wq.title.toggle_full_screen.dump_lay.dump_val.dump_stack.pop_stack.clear_text.rec_ch.rec_r.reset_rec.ch_in_style.ch_out_style.autowc.navigate_to.loadplugin.snapshot.record_place.save.load.reload_script.copybookmark.erasebookmark.export.import.add_frame.frame.set_frame.let_frame.set_focus.add_filter.clear_filter.enable_filter.if.elsif.else.endif.r.er.trace.jump.call.return.macro.endmacro.char2macro.bracket2macro.button.event.clear_event.enable_event.clearvar.clearsysvar.page.wait.waitclick.l.p.s".split("."));
	#P() {
		let t = Object.create(null);
		for (let n of e.RESERVED_TAGS) t[n] = !0;
		for (let e in this.#N) t[e] = !0;
		return t;
	}
	constructor(e, t = "") {
		this.#g = e instanceof A ? e : new A(e, t), this.#S.defBuiltin("const.sn.scriptFn", () => this.fn), this.#S.defBuiltin("const.sn.isKidoku", () => this.#M), this.#S.defBuiltin("const.sn.displayState", () => this.#F), this.#S.defBuiltin("const.Date.getDateStr", () => u()), this.#S.defBuiltin("const.Date.getTime", () => (/* @__PURE__ */ new Date()).getTime()), this.#S.defBuiltin("const.sn.last_page_plain_text", () => p(this.#y[this.#v] ?? "")), this.#S.defBuiltin("const.sn.last_page_text", () => this.#y[this.#v] ?? ""), this.#S.defBuiltin("const.sn.log.json", () => this.#w.json()), this.#S.defBuiltin("const.sn.key.alternate", () => this.#I.Alt === !0), this.#S.defBuiltin("const.sn.key.command", () => this.#I.Meta === !0), this.#S.defBuiltin("const.sn.key.control", () => this.#I.Control === !0), this.#S.defBuiltin("const.sn.key.end", () => this.#I.End === !0), this.#S.defBuiltin("const.sn.key.escape", () => this.#I.Escape === !0), this.#S.defBuiltin("const.sn.key.back", () => !1), this.#S.defBuiltin("const.sn.Math.PI", () => Math.PI), this.#S.defBuiltin("const.sn.aIfStk.length", () => this.#D.length), this.#S.defBuiltin("const.sn.vctCallStk.length", () => this.#O.length);
	}
	#F = !1;
	setFullScr(e) {
		this.#F = e;
	}
	#I = Object.create(null);
	setKeyDown(e, t) {
		this.#I[e] = t;
	}
	clearKeyDown() {
		this.#I = Object.create(null);
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
		return this.#S.get(e);
	}
	setValNochk(e, t) {
		this.#S.set(e, t);
	}
	defBuiltin(e, t) {
		this.#S.defBuiltin(e, t);
	}
	get fn() {
		return this.#g.fn;
	}
	get idx() {
		return this.#_;
	}
	get atEnd() {
		return this.#_ >= this.#g.len;
	}
	jumpToLabel(e) {
		let t = this.#g.label2idx(e);
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#_ = t;
	}
	callToLabel(e) {
		let t = this.#g.label2idx(e);
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#W(--this.#_), this.#_ = t;
	}
	callToScript(e, t = "") {
		this.#W(--this.#_), this.switchScript(e, t);
	}
	nowScrIdx() {
		let e = this.#O[0];
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
		this.#S.set("save:const.sn.scriptFn", e), this.#S.set("save:const.sn.scriptIdx", t);
	}
	nowMarkPart() {
		return this.#S.set("save:const.sn.sLog", this.#w.json()), {
			hSave: this.#S.cloneNs("game"),
			aIfStk: this.#D.slice(this.#O.length),
			hTxt: { ...this.#y }
		};
	}
	restoreMarkPart(e) {
		this.#S.setNs("game", e.hSave), this.#y = { ...e.hTxt }, this.#v = String(this.#S.get("save:const.sn.mesLayer") ?? this.#v), this.#w.playback(String(this.#S.get("save:const.sn.sLog") ?? "[]")), this.#S.setMp({}), this.#D.length = 0, this.#D.push(...e.aIfStk), this.#O.length = 0, this.clearEvent();
	}
	cloneSys() {
		return this.#S.cloneNs("sys");
	}
	setSys(e) {
		this.#S.setNs("sys", e);
	}
	get isKidoku() {
		return this.#M;
	}
	#L() {
		let e = this.#j[this.fn] ??= new j();
		if (this.#O.length > 0) {
			e.record(this.#_);
			return;
		}
		this.#M = e.search(this.#_), !this.#M && e.record(this.#_);
	}
	#R() {
		this.#j[this.fn]?.erase(this.#_), this.#M = !1;
	}
	getKidoku() {
		let e = {};
		for (let [t, n] of Object.entries(this.#j)) e[t] = n.val();
		return e;
	}
	setKidoku(e) {
		for (let e in this.#j) delete this.#j[e];
		this.#M = !1;
		for (let [t, n] of Object.entries(e)) this.#j[t] = j.from(n);
	}
	clearKidoku() {
		for (let e of Object.values(this.#j)) e.clear();
		this.#M = !1;
	}
	get autoEnabled() {
		return this.#z("sn.auto.enabled");
	}
	get skipEnabled() {
		return this.#z("sn.skip.enabled");
	}
	get skipAll() {
		return this.#z("sn.skip.all");
	}
	#z(e) {
		return this.#S.get(`tmp:${e}`) === !0;
	}
	get tagLEnabled() {
		return this.#S.get("tmp:sn.tagL.enabled") !== !1;
	}
	cancelAutoSkip() {
		this.#S.set("tmp:sn.skip.enabled", !1), this.#S.set("tmp:sn.skip.all", !1), this.#S.set("tmp:sn.auto.enabled", !1), this.tagLEnabled || this.#S.set("tmp:sn.tagL.enabled", !0);
	}
	get isNextKidoku() {
		let e = this.fn, t = this.#_, n = this.#g.len, r = this.#O.at(-1);
		return r && (e = r.fn, t = r.returnIdx, n = r.scr.len), t >= n ? !1 : this.#j[e]?.search(t) ?? !1;
	}
	#B(e) {
		if (e === "s" || e === "waitclick") {
			this.cancelAutoSkip();
			return;
		}
		if (this.autoEnabled) return {
			mode: "auto",
			msec: this.#H(e === "p")
		};
		if (this.skipEnabled) {
			if (!this.skipAll && !this.isNextKidoku) {
				this.cancelAutoSkip();
				return;
			}
			return e === "p" && this.#V() !== "s" ? void 0 : {
				mode: "skip",
				msec: 0
			};
		}
	}
	#V() {
		let e = this.#S.get("sys:sn.skip.mode");
		return e == null ? "s" : String(e);
	}
	#H(e) {
		let t = e ? "sn.auto.msecPageWait" : "sn.auto.msecLineWait", n = Number(this.#S.get(`sys:${t}${this.isKidoku ? "_Kidoku" : ""}`));
		return Number.isFinite(n) && n > 0 ? n : e ? 3500 : 500;
	}
	getEvent(e) {
		let t = e.toLowerCase();
		return this.#k[t] ?? this.#A[t];
	}
	clearEvent(e = !1) {
		if (!e) {
			this.#k = Object.create(null);
			return;
		}
		for (let e in this.#A) delete this.#A[e];
	}
	#U() {
		let e = this.#k;
		return this.#k = Object.create(null), e;
	}
	beginEvent(e) {
		let t = this.getEvent(e);
		if (t) return this.#S.set("tmp:sn.eventArg", t.arg), this.#S.set("tmp:sn.eventLabel", t.label), t.call || this.clearEvent(), t;
	}
	#W(e, t = !0, n = {}) {
		this.#O.push({
			fn: this.fn,
			returnIdx: e,
			lenIfStk: this.#D.length,
			hMp: this.#S.cloneMp(),
			hArgs: n,
			scr: this.#g,
			...t ? { hEvt: this.#U() } : {}
		}), this.#D.push(-1);
	}
	step() {
		let e = [];
		for (this.#b && (this.#b = !1, this.#ee(), this.#y[this.#v] = "", e.push({
			t: "chgStr",
			nm: this.#v,
			page: "fore",
			str: ""
		})); this.#_ < this.#g.len;) {
			this.#L();
			let t = this.#g.aToken[this.#_++], n = t.charCodeAt(0);
			if (n === 9 || n === 10) continue;
			if (n === 91) {
				let n = this.#t(t);
				if (!n) continue;
				let { name: r, args: i } = n;
				if (this.#K(r, i, e) === "stop") return e;
				continue;
			}
			let r = t, i = this.#g.grm.ce;
			if (i && t.length > 1 && t.startsWith(i)) r = t.slice(1);
			else if (n === 38) {
				if (!t.endsWith("&")) {
					this.#G(t);
					continue;
				}
				if (t.charAt(1) === "&") throw "「&表示&」書式では「&」指定が不要です";
				let e = this.#C.parse(t.slice(1, -1));
				r = e == null ? "" : String(e);
			} else if (n === 59) continue;
			else if (n === 42 && t.length > 1) continue;
			this.#$(e, r);
		}
		return e;
	}
	#G(e) {
		let { name: t, text: n, cast: r } = ee(e.slice(1));
		this.#S.set(this.#C.getValAmpersand(t.trim()), this.#C.parse(n), r ?? "");
	}
	#K(t, r, o) {
		let c = this.#g.len;
		switch (t) {
			case "add_lay": {
				let e = r.layer ?? r.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (r.class ?? "txt").toLowerCase() === "grp" ? "grp" : "txt";
				return this.#y[e] = "", o.push({
					t: "addLay",
					cls: t,
					nm: e
				}), "skip";
			}
			case "current": {
				let e = r.layer ?? r.nm ?? this.#v;
				return e !== this.#v && this.#ee(), this.#v = e, this.#S.set("save:const.sn.mesLayer", this.#v), "skip";
			}
			case "add_face": {
				let t = r.name ?? "";
				if (!t) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#x[t]) throw `[add_face] 同一のname（${t}）に対して複数の画像を割り当てられません`;
				return this.#x[t] = {
					fn: r.fn || t,
					dx: Number(r.dx || "0"),
					dy: Number(r.dy || "0"),
					blendmode: e.#u(r.blendmode || "normal")
				}, "skip";
			}
			case "lay": {
				let t = e.argPage(r, "fore"), n = r.fn || r.pic;
				if (n) {
					let e = [];
					if (r.face) for (let t of r.face.split(",")) {
						if (!t) throw "[lay] face属性に空要素が含まれています";
						let n = this.#x[t];
						if (!n) throw `[lay] face【${t}】は[add_face]で未定義です`;
						e.push(n);
					}
					o.push({
						t: "chgPic",
						nm: r.layer ?? "",
						page: t,
						fn: n,
						aFace: e
					});
				}
				if (r.b_alpha !== void 0 || r.b_alpha_isfixed !== void 0) {
					let e = {
						t: "chgBAlpha",
						nm: r.layer ?? "",
						page: t
					};
					if (r.b_alpha !== void 0) {
						let t = Number(r.b_alpha);
						if (Number.isNaN(t)) throw `[lay] b_alphaの値が不正です：${r.b_alpha}`;
						e.b_alpha = Math.min(1, Math.max(0, t));
					}
					r.b_alpha_isfixed !== void 0 && (e.isFixed = r.b_alpha_isfixed !== "false"), o.push(e);
				}
				r.b_pic !== void 0 && o.push({
					t: "chgBPic",
					nm: r.layer ?? "",
					page: t,
					fn: r.b_pic
				});
				let a = {};
				r.visible !== void 0 && (a.visible = r.visible !== "false"), r.alpha !== void 0 && (a.alpha = e.#n("lay", "alpha", r.alpha)), r.left === void 0 ? r.center === void 0 ? r.right === void 0 ? r.s_right !== void 0 && (a.s_right = this.#r("lay", "left", r.s_right)) : (a.left = this.#r("lay", "left", r.right), a.align_x = "right") : (a.left = this.#r("lay", "left", r.center), a.align_x = "center") : a.left = this.#r("lay", "left", r.left), r.top === void 0 ? r.middle === void 0 ? r.bottom === void 0 ? r.s_bottom !== void 0 && (a.s_bottom = this.#r("lay", "top", r.s_bottom)) : (a.top = this.#r("lay", "top", r.bottom), a.align_y = "bottom") : (a.top = this.#r("lay", "top", r.middle), a.align_y = "middle") : a.top = this.#r("lay", "top", r.top), r.rotation !== void 0 && (a.rotation = e.#n("lay", "rotation", r.rotation)), r.scale_x !== void 0 && (a.scale_x = e.#n("lay", "scale_x", r.scale_x)), r.scale_y !== void 0 && (a.scale_y = e.#n("lay", "scale_y", r.scale_y)), r.pivot_x !== void 0 && (a.pivot_x = e.#n("lay", "pivot_x", r.pivot_x)), r.pivot_y !== void 0 && (a.pivot_y = e.#n("lay", "pivot_y", r.pivot_y)), r.blendmode !== void 0 && (a.blendmode = e.#u(r.blendmode)), r.b_color !== void 0 && (a.b_color = e.#n("lay", "b_color", r.b_color)), r.style !== void 0 && (a.style = r.style), r.ffs !== void 0 && (a.ffs = r.ffs), r.noffs !== void 0 && (a.noffs = r.noffs), r.bura !== void 0 && (a.bura = r.bura !== "false"), r.in_style !== void 0 && (a.in_style = r.in_style), r.out_style !== void 0 && (a.out_style = r.out_style), Object.keys(a).length > 0 && o.push({
					t: "chgLay",
					nm: r.layer ?? "",
					page: t,
					sty: a
				});
				let s = r.layer ?? "";
				if ((r.float ?? "false") !== "false") o.push({
					t: "moveLay",
					nm: s,
					mode: "float"
				});
				else if (r.index) {
					let t = e.#n("lay", "index", r.index);
					t && o.push({
						t: "moveLay",
						nm: s,
						mode: "index",
						index: t
					});
				} else r.dive && o.push({
					t: "moveLay",
					nm: s,
					mode: "dive",
					dive: r.dive
				});
				return r.filter !== void 0 && o.push({
					t: "addFilter",
					aLayNm: [s],
					page: t,
					flt: i(r),
					replace: !0
				}), "skip";
			}
			case "add_filter": return o.push({
				t: "addFilter",
				aLayNm: e.#o(r.layer),
				page: e.#h("add_filter", r, "fore"),
				flt: i(r),
				replace: !1
			}), "skip";
			case "clear_filter": return o.push({
				t: "clearFilter",
				aLayNm: e.#o(r.layer),
				page: e.#h("clear_filter", r, "fore")
			}), "skip";
			case "enable_filter": return o.push({
				t: "enableFilter",
				aLayNm: e.#o(r.layer),
				page: e.#h("enable_filter", r, "fore"),
				index: e.#i("enable_filter", "index", r.index, 0),
				enabled: (r.enabled ?? "true") !== "false"
			}), "skip";
			case "clear_lay": {
				let t = r.page ?? "back";
				if (t !== "fore" && t !== "back" && t !== "both") throw `属性 page【${t}】が不正です`;
				let n = e.#o(r.layer);
				if (r.layer !== void 0 && n === null) throw "[clear_lay] layer属性が空です";
				if (t !== "back") if ((!n || n.includes(this.#v)) && this.#ee(), n) for (let e of n) this.#y[e] = "";
				else for (let e of Object.keys(this.#y)) this.#y[e] = "";
				return o.push({
					t: "clearLay",
					aLayNm: n,
					page: t
				}), "skip";
			}
			case "trans": {
				let t = r.layer ?? "", n = t ? t.split(",").map((e) => e.trim()).filter((e) => e !== "") : null;
				if (n?.length === 0) throw "[trans] layer属性が空です";
				let i = Number(r.time ?? "0");
				if (!Number.isFinite(i) || i < 0) throw `[trans] timeの値が不正です：${r.time ?? ""}`;
				if (r.glsl !== void 0) throw "[trans] glsl=はサポートされません（WebGLシェーダを使わないため）";
				return o.push({
					t: "trans",
					aLayNm: n,
					time: this.skipEnabled ? 0 : i,
					...r.rule === void 0 ? {} : { rule: r.rule },
					...r.vague === void 0 ? {} : { vague: e.#n("trans", "vague", r.vague) }
				}), "skip";
			}
			case "wt": return o.push({
				t: "waitTrans",
				canskip: (r.canskip ?? "true") !== "false"
			}), "stop";
			case "finish_trans": return o.push({ t: "finishTrans" }), "skip";
			case "set_cancel_skip": return "skip";
			case "quake": {
				let t = this.skipEnabled ? 0 : e.#n("quake", "time", r.time ?? "");
				return t <= 0 || o.push({
					t: "quake",
					msec: t,
					hmax: l(e.#i("quake", "hmax", r.hmax, 10)),
					vmax: l(e.#i("quake", "vmax", r.vmax, 10))
				}), "skip";
			}
			case "stop_quake": return o.push({ t: "stopQuake" }), "skip";
			case "wq": return o.push({
				t: "waitQuake",
				canskip: (r.canskip ?? "true") !== "false"
			}), "stop";
			case "tsy": {
				let { layer: t } = r;
				if (!t) throw "[tsy] layerは必須です";
				let n = this.skipEnabled, i = n ? 0 : e.#n("tsy", "time", r.time ?? ""), a = n ? 0 : e.#i("tsy", "delay", r.delay, 0), s = e.#i("tsy", "repeat", r.repeat, 1);
				return o.push({
					t: "tsy",
					tw_nm: L("tsy", r),
					nm: t,
					page: e.argPage(r, "fore"),
					msec: i,
					delay: a,
					ease: I(r.ease),
					repeat: s > 0 ? s - 1 : -1,
					yoyo: (r.yoyo ?? "false") !== "false",
					hTo: P("tsy", r),
					...e.#m("tsy", r)
				}), "skip";
			}
			case "tsy_frame": {
				let { id: t } = r;
				if (!t) throw "[tsy_frame] idは必須です";
				this.#q("tsy_frame", t);
				let n = this.skipEnabled, i = e.#i("tsy_frame", "repeat", r.repeat, 1);
				return o.push({
					t: "tsyFrame",
					tw_nm: L("tsy_frame", r),
					id: t,
					msec: n ? 0 : e.#n("tsy_frame", "time", r.time ?? ""),
					delay: n ? 0 : e.#i("tsy_frame", "delay", r.delay, 0),
					ease: I(r.ease),
					repeat: i > 0 ? i - 1 : -1,
					yoyo: (r.yoyo ?? "false") !== "false",
					hTo: P("tsy_frame", r, M),
					...e.#m("tsy_frame", r, M)
				}), "skip";
			}
			case "wait_tsy": return o.push({
				t: "waitTsy",
				tw_nm: L("wait_tsy", r),
				canskip: (r.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return o.push({
				t: "stopTsy",
				tw_nm: L("stop_tsy", r)
			}), "skip";
			case "pause_tsy": return o.push({
				t: "pauseTsy",
				tw_nm: L("pause_tsy", r),
				paused: !0
			}), "skip";
			case "resume_tsy": return o.push({
				t: "pauseTsy",
				tw_nm: L("resume_tsy", r),
				paused: !1
			}), "skip";
			case "let":
				if (r.text === void 0) throw `[let] textは必須です（name:${r.name ?? ""}）`;
				return this.#J("let", r, r.text), "skip";
			case "let_abs": {
				let t = e.#i("let_abs", "text", r.text, 0);
				return this.#J("let_abs", r, String(t < 0 ? -t : t)), "skip";
			}
			case "let_round": {
				let t = e.#i("let_round", "text", r.text, 0);
				return this.#J("let_round", r, String(Math.round(t))), "skip";
			}
			case "let_length": return this.#J("let_length", r, String((r.text ?? "").length)), "skip";
			case "let_char_at": {
				let t = e.#i("let_char_at", "pos", r.pos, 0);
				return this.#J("let_char_at", r, (r.text ?? "").charAt(t)), "skip";
			}
			case "let_index_of": {
				let { val: t } = r;
				if (!t) throw "[let_index_of] valは必須です";
				let n = e.#i("let_index_of", "start", r.start, 0);
				return this.#J("let_index_of", r, String((r.text ?? "").indexOf(t, n))), "skip";
			}
			case "let_substr": {
				let t = e.#i("let_substr", "pos", r.pos, 0), n = r.text ?? "";
				return this.#J("let_substr", r, r.len === "all" ? n.slice(t) : n.slice(t, t + s(e.#i("let_substr", "len", r.len, 1)))), "skip";
			}
			case "let_replace": return this.#J("let_replace", r, (r.text ?? "").replace(e.#a("let_replace", r), String(r.val))), "skip";
			case "let_search": return this.#J("let_search", r, String((r.text ?? "").search(e.#a("let_search", r)))), "skip";
			case "let_ml": {
				let e = r.name ?? "";
				if (!e) throw "[let_ml] nameは必須です";
				let t = "";
				for (; this.#_ < c && (t = this.#g.aToken[this.#_], t === ""); ++this.#_);
				if (this.#g.grm.testTagEndLetml(t)) return this.#S.set(e, "", "str"), ++this.#_, "skip";
				if (!this.#g.grm.testTagEndLetml(this.#g.aToken[this.#_ + 1] ?? "")) throw `[let_ml] 変数【${e}】の終端・[endlet_ml]がありません`;
				return this.#S.set(e, t, "str"), this.#_ += 2, "skip";
			}
			case "endlet_ml": return "skip";
			case "if": return this.#Y(r), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#X(), "skip";
			case "r": return this.#$(o, "\n"), "skip";
			case "er": return (r.rec_page_break ?? "true") !== "false" && this.#ee(), this.#y[this.#v] = "", o.push({
				t: "chgStr",
				nm: this.#v,
				page: "both",
				str: ""
			}), o.push({
				t: "clearTxtLay",
				nm: this.#v,
				page: "both",
				clearFilter: r.clear_filter === "true"
			}), "skip";
			case "span": return this.#$(o, e.#Q("span", r)), "skip";
			case "link":
				if (!r.url && !r.label && !r.fn) throw "[link] fn・label・urlのいずれかは必須です";
				return this.#$(o, e.#Q("link", r)), "skip";
			case "endlink": return this.#$(o, e.#Q("endlink", {})), "skip";
			case "graph":
				if (!r.pic) throw "[graph] picは必須です";
				return this.#$(o, e.#Q("grp", r)), "skip";
			case "tcy":
				if (!r.t) throw "[tcy] tは必須です";
				return this.#$(o, e.#Q("tcy", r)), "skip";
			case "ruby2":
			case "ch": {
				if (t === "ruby2") {
					if (!r.t) throw "[ruby2] tは必須です";
					if (!r.r) throw "[ruby2] rは必須です";
					r.text = `｜${encodeURIComponent(r.t)}《${encodeURIComponent(r.r)}》`, delete r.t, delete r.r;
				}
				let { text: n } = r;
				if (!n) throw `[${t}] textは必須です`;
				return this.#$(o, e.#Q("add", {
					...r,
					text: void 0
				}) + n.replaceAll("[r]", "\n") + e.#Q("add_close", {}), r.record !== "false"), "skip";
			}
			case "autowc": {
				let t = r.enabled === void 0 ? this.#S.get("game:const.sn.autowc.enabled") === !0 : r.enabled !== "false";
				this.#S.set("save:const.sn.autowc.enabled", t);
				let { text: n } = r;
				if ("text" in r != "time" in r) throw "[autowc] textとtimeは同時指定必須です";
				if (this.#S.set("save:const.sn.autowc.text", n ?? ""), !n) return this.#S.set("save:const.sn.autowc.time", ""), o.push({
					t: "autowc",
					enabled: t,
					hWait: {}
				}), "skip";
				let i = Array.from(n), a = String(r.time ?? "").split(",");
				if (a.length !== i.length) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
				let s = {};
				return i.forEach((t, n) => {
					s[t] = l(e.#n("autowc", "time", a[n] ?? ""));
				}), this.#S.set("save:const.sn.autowc.time", r.time ?? ""), o.push({
					t: "autowc",
					enabled: t,
					hWait: s
				}), "skip";
			}
			case "ch_in_style":
			case "ch_out_style": {
				let e = t === "ch_in_style" ? "in" : "out", { name: i, sty: a } = n(t, r, e === "in");
				if (this.#E[e].has(i)) throw `[${t}] name【${i}】はすでにあります`;
				return this.#E[e].add(i), o.push({
					t: "defChStyle",
					kind: e,
					nm: i,
					sty: a
				}), "skip";
			}
			case "rec_ch": return r.text && this.#w.add(r.text.replaceAll("[r]", "\n")), "skip";
			case "rec_r": return this.#w.add("\n"), "skip";
			case "reset_rec": return this.#w.reset(r.text ?? ""), "skip";
			case "trace": return o.push({
				t: "trace",
				text: r.text ?? ""
			}), "skip";
			case "jump": {
				r.count === "false" && this.#R();
				let e = r.label ?? "", t = r.fn ?? "";
				if (!e && !t) throw "[jump] fnまたはlabelは必須です";
				if (t && t !== this.fn) return o.push({
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
				r.count !== "true" && this.#R();
				let e = r.label ?? "", t = r.fn ?? "";
				if (!e && !t) throw "[call] fnまたはlabelは必須です";
				if (t && t !== this.fn) return this.#W(this.#_, !0, r), o.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e);
				if (n === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#W(this.#_, !0, r), this.#_ = n, "skip";
			}
			case "return": return this.#Z(o, r);
			case "macro": {
				let t = r.name ?? "";
				if (!t) throw "[macro] nameは必須です（試作仕様）";
				if (e.RESERVED_TAGS.has(t)) throw `[${t}]はタグ名のため、マクロ名として使用できません`;
				if (e.REG_NG4MAC_NM.test(t)) throw `[${t}]はマクロ名として異常です`;
				if (t in this.#N) throw `[macro] マクロ【${t}】は既に定義済みです`;
				this.#N[t] = {
					fn: this.fn,
					idx: this.#_
				};
				let n = !1, i = 0, a = !1;
				for (; this.#_ < c; ++this.#_) {
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
					let { name: r } = e.parseTag(t);
					if (r === "macro") {
						++i;
						continue;
					}
					if (r === "endmacro") {
						if (i > 0) {
							--i;
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
			case "bracket2macro": return this.#g.defC2M(t, r, this.#P(), this.#_), "skip";
			case "endmacro": return this.#Z(o);
			case "button": {
				let t = r.layer || this.#v;
				if (!t) throw "[button] layerは必須です（試作仕様）";
				let n = r.label ?? "", i = r.fn ?? "";
				if (!n && !i) throw "[button] fnまたはlabelは必須です";
				let { pic: a } = r;
				if (!a && !r.text) throw "[button] textまたはpic属性は必須です";
				let s = r.nm, c = r.call === "true", l = e.argPage(r, "back"), u = {};
				for (let t of e.#f) {
					let n = r[t];
					n !== void 0 && Object.assign(u, { [t]: t === "left" || t === "top" ? this.#r("button", t, n) : e.#n("button", t, n) });
				}
				return a || (u.width ??= 100, u.height ??= 30), r.enabled !== void 0 && (u.enabled = r.enabled !== "false"), r.blendmode !== void 0 && (u.blendmode = e.#u(r.blendmode)), r.style !== void 0 && (u.style = e.#l(r.style)), r.style_hover !== void 0 && (u.style_hover = e.#l(r.style_hover)), r.style_clicked !== void 0 && (u.style_clicked = e.#l(r.style_clicked)), r.hint !== void 0 && (u.hint = r.hint), r.hint_style !== void 0 && (u.hint_style = r.hint_style), r.hint_opt !== void 0 && (u.hint_opt = r.hint_opt), a !== void 0 && (u.pic = a), r.b_pic !== void 0 && (u.b_pic = r.b_pic), o.push({
					t: "addBtn",
					layerNm: t,
					page: l,
					text: a ? "" : r.text ?? "",
					label: n,
					call: c,
					...s === void 0 ? {} : { nm: s },
					...i ? { fn: i } : {},
					...Object.keys(u).length > 0 ? { sty: u } : {}
				}), "skip";
			}
			case "page": {
				if (!("clear" in r || "to" in r || "style" in r)) throw "[page] clear,style,to いずれかは必須です";
				if (r.key !== void 0 && o.push({
					t: "pageKeys",
					aKey: r.key ? r.key.split(",") : []
				}), r.style !== void 0) return o.push({
					t: "pageStyle",
					style: r.style
				}), "skip";
				if (r.clear === "true") return o.push({ t: "clearPageLog" }), "skip";
				if (r.to === void 0) return "skip";
				let e = r.to;
				if (!a.includes(e)) throw `[page] 属性to「${r.to}」は異常です`;
				return o.push({
					t: "pageTo",
					to: e
				}), "stop";
			}
			case "title": {
				let { text: e } = r;
				if (!e) throw "[title] textは必須です";
				return o.push({
					t: "title",
					text: e
				}), "skip";
			}
			case "toggle_full_screen": return o.push(r.key ? {
				t: "fullScrKey",
				key: r.key.toLowerCase()
			} : { t: "toggleFullScr" }), "skip";
			case "navigate_to": {
				let { url: e } = r;
				if (!e) throw "[navigate_to] urlは必須です";
				return o.push({
					t: "navigateTo",
					url: e
				}), "skip";
			}
			case "loadplugin": {
				let { fn: e } = r;
				if (!e) throw "[loadplugin] fnは必須です";
				if (!e.endsWith(".css")) throw "[loadplugin] サポートされない拡張子です";
				let t = (r.join ?? "true") !== "false";
				return o.push({
					t: "loadPlugin",
					fn: e,
					join: t
				}), t ? "stop" : "skip";
			}
			case "snapshot": return o.push({
				t: "snapshot",
				fn: r.fn ?? "",
				aLayNm: e.#o(r.layer),
				page: e.argPage(r, "fore"),
				width: e.#i("snapshot", "width", r.width, 0),
				height: e.#i("snapshot", "height", r.height, 0),
				smoothing: r.smoothing === "true",
				...r.b_color === void 0 ? {} : { b_color: e.#n("snapshot", "b_color", r.b_color) }
			}), "stop";
			case "clear_text": {
				let t = r.layer || this.#v, n = e.argPage(r, "fore");
				return t === this.#v && n === "fore" && this.#ee(), this.#y[t] = "", o.push({
					t: "chgStr",
					nm: t,
					page: n,
					str: ""
				}), "skip";
			}
			case "dump_val": return o.push({
				t: "trace",
				text: `[dump_val] ${JSON.stringify(this.#S.dump())}`
			}), "skip";
			case "dump_stack": return o.push({
				t: "trace",
				text: `[dump_stack] ${JSON.stringify({
					now: {
						fn: this.fn,
						idx: this.#_
					},
					aCallStk: this.#O.map((e) => ({
						fn: e.fn,
						returnIdx: e.returnIdx
					})),
					aIfStk: [...this.#D]
				})}`
			}), "skip";
			case "dump_lay": return o.push({
				t: "dumpLay",
				aLayNm: e.#o(r.layer)
			}), "skip";
			case "pop_stack":
				if ((r.clear ?? "false") !== "false") this.#O.length = 0;
				else if (!this.#O.pop()) throw "[pop_stack] スタックが空です";
				return this.#D.length = 0, this.#D.push(-1), this.#S.setMp({}), "skip";
			case "clearvar": return this.#S.clearGame(), "skip";
			case "clearsysvar": return this.#S.clearSys(), this.clearKidoku(), "skip";
			case "record_place": return this.recordPlace(), o.push({ t: "recordPlace" }), "skip";
			case "save": {
				if (r.place === void 0) throw "[save] placeは必須です";
				let t = e.#n("save", "place", r.place), n = {
					text: "",
					...r
				};
				delete n.place, o.push({
					t: "save",
					place: t,
					json: n
				});
				let i = Number(this.#S.get("sys:const.sn.save.place"));
				return t === i && this.#S.set("sys:const.sn.save.place", i + 1), "skip";
			}
			case "load":
				if ("fn" in r != "label" in r) throw "[load] fnとlabelはセットで指定して下さい";
				return o.push({
					t: "load",
					place: e.#i("load", "place", r.place, 0),
					fn: r.fn ?? "",
					label: r.label ?? ""
				}), "stop";
			case "reload_script": return o.push({ t: "reloadScript" }), "stop";
			case "copybookmark": {
				let t = e.#n("copybookmark", "from", r.from ?? ""), n = e.#n("copybookmark", "to", r.to ?? "");
				return t === n || o.push({
					t: "copyBookmark",
					from: t,
					to: n
				}), "skip";
			}
			case "erasebookmark": return o.push({
				t: "eraseBookmark",
				place: e.#n("erasebookmark", "place", r.place ?? "")
			}), "skip";
			case "export": return o.push({ t: "exportData" }), "skip";
			case "import": return o.push({ t: "importData" }), "skip";
			case "event": {
				let e = r.key ?? "", t = e.toLowerCase();
				if (!t) throw "[event] keyは必須です";
				let n = t.startsWith("dom="), i = r.global === "true" ? this.#A : this.#k;
				if (r.del === "true") {
					if (r.fn || r.label || r.call) throw "[event] fn/label/callとdelは同時指定できません";
					return delete i[t], n && o.push({
						t: "resvDomEvent",
						rawKey: e,
						key: t,
						del: !0,
						needErr: !1
					}), "skip";
				}
				let a = r.label ?? "", s = r.fn ?? this.fn, { url: c } = r;
				if (!c && !a && !r.fn) throw "[event] fn,label いずれかは必須です";
				return i[t] = {
					fn: s,
					label: a,
					call: r.call === "true",
					arg: r.arg ?? "",
					...c ? { url: c } : {}
				}, n && o.push({
					t: "resvDomEvent",
					rawKey: e,
					key: t,
					del: !1,
					needErr: (r.need_err ?? "true") !== "false"
				}), "skip";
			}
			case "set_focus": {
				let { add: e, del: t, to: n } = r, i = (r.need_err ?? "true") !== "false";
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
				if (!n) throw "[set_focus] add か to は必須です";
				if (n !== "null" && n !== "next" && n !== "prev") throw `[set_focus] to【${n}】が不正です`;
				return o.push({
					t: "setFocus",
					mode: n
				}), "skip";
			}
			case "add_frame": {
				let { id: t, src: n } = r;
				if (!t) throw "[add_frame] idは必須です";
				if (!n) throw "[add_frame] srcは必須です";
				if (this.#S.get(`const.sn.frm.${t}`)) throw `[add_frame] frame【${t}】はすでにあります`;
				return o.push({
					t: "addFrame",
					id: t,
					src: n,
					sty: e.#p("add_frame", r)
				}), "stop";
			}
			case "frame": {
				let { id: t } = r;
				if (!t) throw "[frame] idは必須です";
				this.#q("frame", t);
				let n = (r.float ?? "false") === "false" ? r.index === void 0 ? r.dive ? { mode: "dive" } : void 0 : {
					mode: "index",
					index: e.#n("frame", "index", r.index)
				} : { mode: "float" };
				return o.push({
					t: "frame",
					id: t,
					sty: e.#p("frame", r),
					...n ? { order: n } : {},
					...r.disabled === void 0 ? {} : { disabled: r.disabled !== "false" }
				}), "skip";
			}
			case "set_frame": {
				let { id: e, var_name: t, text: n } = r;
				if (!e) throw "[set_frame] idは必須です";
				if (!t) throw "[set_frame] var_nameは必須です";
				if (!n) throw "[set_frame] textは必須です";
				return this.#q("set_frame", e), this.#S.set(`const.sn.frm.${e}.${t}`, n), o.push({
					t: "setFrame",
					id: e,
					var_name: t,
					text: n
				}), "skip";
			}
			case "let_frame": {
				let { id: e, var_name: t } = r;
				if (!e) throw "[let_frame] idは必須です";
				if (!t) throw "[let_frame] var_nameは必須です";
				return this.#q("let_frame", e), o.push({
					t: "letFrame",
					id: e,
					var_name: t,
					fnc: (r.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(r.global === "true"), "skip";
			case "enable_event": {
				let e = r.layer || this.#v, t = (r.enabled ?? "true") !== "false";
				return this.#S.set(`game:const.sn.layer.${e}.enabled`, t), o.push({
					t: "enableEvent",
					nm: e,
					enabled: t
				}), "skip";
			}
			case "wait": {
				let t = e.#n("wait", "time", r.time ?? "");
				return this.skipEnabled ? (!this.skipAll && !this.isNextKidoku && this.cancelAutoSkip(), "skip") : (o.push({
					t: "wait",
					msec: t,
					canskip: (r.canskip ?? "true") !== "false"
				}), "stop");
			}
			case "l":
			case "p":
			case "s":
			case "waitclick": {
				if (t === "l" && !this.tagLEnabled) return "skip";
				t === "p" && (this.#b = !0);
				let n = this.#B(t), i = {};
				for (let n of [
					"x",
					"y",
					"width",
					"height"
				]) {
					let a = r[n];
					a !== void 0 && (i[n] = e.#n(t, n, a));
				}
				return o.push({
					t: "stop",
					kind: t,
					key: `${this.fn}:${String(this.#_)}`,
					nm: this.#v,
					...n ? { resume: n } : {},
					...Object.keys(i).length > 0 ? { mark: i } : {}
				}), "stop";
			}
			default: {
				let e = this.#N[t];
				return e === void 0 ? "skip" : (this.#W(this.#_, !1, r), this.#S.setMp({
					...r,
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
	#q(e, t) {
		if (!this.#S.get(`const.sn.frm.${t}`)) throw `[${e}] frame【${t}】が読み込まれていません`;
	}
	#J(e, t, n) {
		let r = t.name ?? "";
		if (!r) throw `[${e}] nameは必須です`;
		this.#S.set(r, n, t.cast ?? "");
	}
	#Y(t) {
		let n = t.exp ?? "";
		if (!n) throw "[if] expは必須です（試作仕様）";
		let r = this.#C.evalBool(n) ? this.#_ : -1, i = 0, a = !1, o = this.#g.len;
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
					this.#C.evalBool(e) && (r = this.#_ + 1);
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
					r === -1 ? ++this.#_ : (this.#D.push(this.#_ + 1), this.#_ = r);
					return;
				default: continue;
			}
		}
		throw "[if] に対応する [endif] が見つかりません（試作仕様）";
	}
	#X() {
		let e = this.#D.pop();
		if (e === void 0 || e === -1) throw "[if] に対応していない [elsif]/[else]/[endif] です";
		this.#_ = e;
	}
	#Z(e, t = {}) {
		let n = this.#O.pop();
		if (!n) throw "[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）";
		this.#D.length = n.lenIfStk, this.#S.setMp(n.hMp), n.hEvt && (this.#k = n.hEvt);
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
	static #Q(e, t) {
		return `｜&emsp;《${e}｜${encodeURIComponent(JSON.stringify(t))}》`;
	}
	#$(e, t, n = !0) {
		let r = this.#v, i = (this.#y[r] ?? "") + t;
		this.#y[r] = i, n && this.#T && this.#w.add(t), e.push({
			t: "chgStr",
			nm: r,
			page: "fore",
			str: i
		});
	}
	#ee() {
		this.#w.pagebreak();
	}
}, G = class e {
	searchPath;
	constructor(e) {
		this.searchPath = e;
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
		let i = this.#e ?? await this.#n, a = this.searchPath(n, b.HTML), o = await fetch(a);
		if (!o.ok) throw `[add_frame] HTMLの読込に失敗しました src:${n} ${o.statusText}`;
		let s = e.#m(await o.text(), a), c = document.createElement("iframe");
		c.id = t, c.style.cssText = "position: absolute; border: 0; overflow: hidden; pointer-events: auto;", i.appendChild(c), this.#r[t] = c, this.#i[t] = !1, this.#l(c, this.#a[t] = {
			visible: !0,
			alpha: 1,
			x: 0,
			y: 0,
			width: d.stageW,
			height: d.stageH,
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			...r
		}), await new Promise((e, n) => {
			c.onload = () => e(), c.onerror = () => n(/* @__PURE__ */ Error(`[add_frame] frame【${t}】の表示に失敗しました`)), c.srcdoc = s;
		});
		let l = e.#d(a);
		c.contentWindow.sn_repRes?.((e) => {
			e.src = this.#f(l, e.dataset.src ?? "");
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
			[`${u}.width`]: r.width ?? d.stageW,
			[`${u}.height`]: r.height ?? d.stageH,
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
			n.mode === "float" ? e.zIndex = String(++this.#o) : n.mode === "index" ? e.zIndex = String(n.index ?? 0) : e.zIndex = String(-++this.#o);
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
				this.getDisabled(a) || t === "keydown" && n.key !== "Enter" || i(e);
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
	#f(e, t) {
		if (!t) return "";
		if (/^(?:https?:|\/|data:)/.test(t)) return t;
		try {
			return this.searchPath(t, b.SP_GSM);
		} catch {
			return e + t.replace(/^\.\//, "");
		}
	}
	static #p = /\s(?:src|href)=(["'])(\S+?)\1/g;
	static #m(t, n) {
		let r = e.#d(n);
		return t.replaceAll(e.#p, (e, t, n) => n.startsWith("../") ? r + e.slice(3) : e.replace("./", "").replace(t, t + r));
	}
}, K = /* @__PURE__ */ new Set([
	"IFRAME",
	"SCRIPT",
	"CANVAS",
	"VIDEO"
]);
function q(e) {
	return /\.jpe?g$/i.test(e) ? "image/jpeg" : "image/png";
}
function J(e) {
	let t = u("-", "_", ""), n = /\.\w+$/.exec(e);
	return n ? e.slice(0, n.index) + t + n[0] : `${e}${t}.png`;
}
function oe(e) {
	let t = (e >>> 24) / 255;
	return `rgba(${String(e >> 16 & 255)}, ${String(e >> 8 & 255)}, ${String(e & 255)}, ${String(t)})`;
}
async function Y(e) {
	let t = e.el.cloneNode(!0);
	t.style.transform = "none", t.style.width = `${String(e.sw)}px`, t.style.height = `${String(e.sh)}px`, X(t, e.page, e.aLayNm), await se(t);
	let n = new XMLSerializer().serializeToString(t), r = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(e.sw)}" height="${String(e.sh)}"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${Z()}</style>${n}</div></foreignObject></svg>`, i = await le(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(r)}`), a = document.createElement("canvas");
	a.width = e.width, a.height = e.height;
	let o = a.getContext("2d");
	if (!o) throw "canvasの2Dコンテキストが取れません";
	return o.imageSmoothingEnabled = e.smoothing, o.fillStyle = e.bgColor, o.fillRect(0, 0, e.width, e.height), o.drawImage(i, 0, 0, e.width, e.height), a.toDataURL(e.mime);
}
function X(e, t, n) {
	for (let r of [...e.querySelectorAll("*")]) {
		if (K.has(r.tagName)) {
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
async function se(e) {
	let t = [...e.querySelectorAll("img")];
	await Promise.all(t.map(async (e) => {
		let { src: t } = e;
		if (!(!t || t.startsWith("data:"))) try {
			e.setAttribute("src", await ce(t));
		} catch {
			e.remove();
		}
	}));
}
async function ce(e) {
	let t = await fetch(e);
	if (!t.ok) throw `画像が取得できません url:${e}`;
	let n = await t.blob();
	return new Promise((t, r) => {
		let i = new FileReader();
		i.onload = () => t(String(i.result)), i.onerror = () => r(/* @__PURE__ */ Error(`画像が読めません url:${e}`)), i.readAsDataURL(n);
	});
}
function Z() {
	let e = [];
	for (let t of [...document.styleSheets]) try {
		for (let n of [...t.cssRules]) e.push(n.cssText);
	} catch {}
	return e.join("\n");
}
function le(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error("スナップショットの画像化に失敗しました")), r.src = e;
	});
}
function ue(e, t) {
	let n = document.createElement("a");
	n.href = t, n.download = e, n.click();
}
//#endregion
//#region src/sn/localStore.ts
var Q = {
	get(e) {
		let t = localStorage.getItem(e);
		if (t != null) try {
			return JSON.parse(t);
		} catch {
			return;
		}
	},
	set(e, t) {
		localStorage.setItem(e, JSON.stringify(t));
	},
	remove(e) {
		localStorage.removeItem(e);
	}
};
//#endregion
//#region src/ts/SaveMng.ts
function de() {
	return {
		sys: {},
		mark: {},
		kidoku: {},
		storage: {}
	};
}
var fe = ".swpd", pe = class {
	ns;
	#e = de();
	get data() {
		return this.#e;
	}
	constructor(e) {
		this.ns = e;
	}
	#t(e) {
		return `skynovel.${this.ns} - ${e}`;
	}
	load() {
		let e = Q.get(this.#t("sys"));
		return e === void 0 ? (this.#e = de(), !0) : (this.#e = {
			sys: e,
			mark: Q.get(this.#t("mark")) ?? {},
			kidoku: Q.get(this.#t("kidoku")) ?? {},
			storage: Q.get(this.#t("storage")) ?? {}
		}, !1);
	}
	flush() {
		if (this.#n) {
			this.#r = !0;
			return;
		}
		this.#i(), this.#n = setTimeout(() => {
			this.#n = void 0, this.#r && (this.#r = !1, this.flush());
		}, 500);
	}
	#n;
	#r = !1;
	#i() {
		Q.set(this.#t("sys"), this.#e.sys), Q.set(this.#t("mark"), this.#e.mark), Q.set(this.#t("kidoku"), this.#e.kidoku), Q.set(this.#t("storage"), this.#e.storage);
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
		let e = new Blob([JSON.stringify(this.#e)], { type: "text/json" }), t = URL.createObjectURL(e), n = document.createElement("a");
		n.href = t, n.download = `no_crypto_${this.ns}${me()}${fe}`, n.click(), URL.revokeObjectURL(t);
	}
	async import() {
		let e = await new Promise((e, t) => {
			let n = document.createElement("input");
			n.type = "file", n.accept = `${fe}, text/plain`, n.onchange = () => {
				let r = n.files?.[0];
				r ? e(r) : t(/* @__PURE__ */ Error("ファイル選択に失敗しました"));
			}, n.click();
		}), t = JSON.parse(await e.text()), n = t.sys["const.sn.cfg.ns"];
		if (n !== this.ns) throw `別のゲーム【プロジェクト名=${String(n)}】のプレイデータです`;
		return t.storage ??= {}, this.#e = t, this.flush(), t;
	}
};
function me() {
	let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
	return `${String(e.getFullYear())}-${t(e.getMonth() + 1)}-${t(e.getDate())}_${t(e.getHours())}-${t(e.getMinutes())}-${t(e.getSeconds())}`;
}
//#endregion
//#region src/ts/Font.ts
function he(e) {
	return e.matchPath(".+", b.FONT).flatMap((e) => Object.values(e)).filter((e) => typeof e == "string").map((t) => `@font-face {
	font-family: ${JSON.stringify(t)};
	src: url(${JSON.stringify(e.searchPath(t, b.FONT))});
}`).join("\n");
}
function ge(e, t = document) {
	let n = he(e);
	if (!n) return;
	let r = t.createElement("style");
	r.dataset.sn = "font", r.textContent = n, t.head.appendChild(r);
}
//#endregion
//#region src/ts/ScriptMng.ts
var $ = class e {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#he(e);
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
		let t = await this.#y(e);
		if (this.#r) this.#r.switchScript(t);
		else {
			let e = this.#r = new W(t);
			this.#s(e), this.#h(e), ge(this.sys.cfg);
		}
		this.go = () => this.#E(), this.$trgNext();
	}
	#s(e) {
		let { oCfg: t } = this.sys.cfg, n = {
			"const.sn.config.window.width": () => d.stageW,
			"const.sn.config.window.height": () => d.stageH,
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
			"const.sn.isFirstBoot": () => this.#m,
			"const.sn.needClick2Play": () => !1,
			"const.sn.bookmark.json": () => this.#p.bookmarkJson(),
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
					width: +!!t,
					height: +!!t
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
	#d() {
		this.$fncs.setReadBack(this.#c.isPaging), this.$fncs.setStyPaging(String(this.#r?.getVal("save:const.sn.styPaging") ?? "") || "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;");
	}
	page(e) {
		this.#O || (this.#O = !0, this.#f(e).catch(this.#i));
	}
	async #f(e) {
		let t = this.#r;
		if (!t) {
			this.#O = !1;
			return;
		}
		try {
			let n = this.#c.move(e);
			if (this.#d(), !n) {
				this.#O = !1;
				return;
			}
			t.restoreMarkPart(n.mark), t.clearOnResume = n.clearOnResume, this.$fncs.replace(n.mark.sPages), this.#D = !1, this.#l = void 0, t.switchScript(await this.#y(n.fn), "", n.idx);
		} catch (e) {
			this.#O = !1, this.myTrace(`[page] ${String(e)}`, "ET");
			return;
		}
		this.#O = !1, this.#E();
	}
	#p = new pe("");
	#m = !0;
	#h(e) {
		this.#p = new pe(this.sys.cfg.oCfg.save_ns);
		try {
			this.#m = this.#p.load();
		} catch (e) {
			this.myTrace(`セーブデータが壊れています。初期状態で起動します ${String(e)}`, "E"), this.#m = !0;
		}
		this.#m || (e.setSys(this.#p.data.sys), e.setKidoku(this.#p.data.kidoku)), e.setValNochk("sys:const.sn.cfg.ns", this.sys.cfg.oCfg.save_ns), this.#g();
	}
	#g() {
		let e = this.#r;
		e && (this.#p.data.sys = e.cloneSys(), this.#p.data.kidoku = e.getKidoku(), this.#p.flush());
	}
	#_(e = {}) {
		return {
			...this.#r.nowMarkPart(),
			sPages: this.$fncs.getPagesJson(),
			json: e
		};
	}
	#v;
	async #y(e) {
		return this.#n[e] ??= new A(e, await this.#me(e), this.#x());
	}
	#b;
	#x() {
		if (this.#b) return this.#b;
		let e = this.#b = new T(this.sys.cfg);
		return e.setEscape(this.sys.cfg.oCfg.init.escape), h(this.sys.cfg.oCfg.init.escape), e;
	}
	go() {}
	navigateTo(e) {
		globalThis.open(e, "_blank");
	}
	jumpToLabelAndGo(e, t, n = "", r) {
		r !== void 0 && (this.#r?.setValNochk("tmp:sn.eventArg", r), this.#r?.setValNochk("tmp:sn.eventLabel", e)), this.#T(e, t, n).catch(this.#i);
	}
	#S = new G((e, t) => this.sys.cfg.searchPath(e, t));
	attachFrameBox(e) {
		this.#S.attachBox(e);
	}
	#C;
	attachStageBox(e) {
		this.#C = e;
	}
	#w = /* @__PURE__ */ new Set();
	fireFullScrKey(e) {
		return this.#w.has(e) ? (this.$fncs.toggleFullScr(), !0) : !1;
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
	async #T(e, t, n) {
		let r = this.#r;
		if (r) {
			this.#D = !1;
			try {
				if (n && (n !== r.fn || !e)) {
					let i = await this.#y(n);
					t ? r.callToScript(i, e) : r.switchScript(i, e);
				} else t ? r.callToLabel(e) : r.jumpToLabel(e);
			} catch (e) {
				this.myTrace(`[button]/[event] ジャンプ先エラー fn:${n || r.fn} ${String(e)}`, "ET");
				return;
			}
			this.#E();
		}
	}
	#E() {
		if (!this.#D) {
			if (this.#N) {
				this.#N.canskip && this.#F();
				return;
			}
			if (this.#U) {
				this.#U.canskip && this.#G();
				return;
			}
			if (this.#q) {
				this.#q.canskip && this.#$(this.#q.tw_nm);
				return;
			}
			if (this.#z) {
				this.#z.canskip && this.#V();
				return;
			}
			this.#O || this.#re().catch(this.#i);
		}
	}
	#D = !1;
	#O = !1;
	#k;
	#A(e, t) {
		clearTimeout(this.#k), this.$fncs.setSkipping(e === "skip"), this.#k = setTimeout(() => {
			e === "skip" && this.$fncs.requestSkip(), this.#E();
		}, t);
	}
	cancelAuto() {
		clearTimeout(this.#k), this.#k = void 0, this.$fncs?.setSkipping(!1), this.#r?.cancelAutoSkip();
	}
	#j;
	#M = !1;
	#N;
	#P(e) {
		clearTimeout(this.#j), this.#M = e > 0, this.#j = this.#M ? setTimeout(() => this.#F(), e) : void 0;
	}
	#F() {
		clearTimeout(this.#j), this.#j = void 0, this.#M = !1, this.$fncs.finishTrans(), this.#N && (this.#N = void 0, this.#E());
	}
	#I(e) {
		if (this.#M) {
			this.#N = { canskip: e };
			return;
		}
		setTimeout(() => this.#E(), 0);
	}
	#L;
	#R = !1;
	#z;
	#B(e) {
		clearTimeout(this.#L), this.#R = !0, this.#L = setTimeout(() => this.#V(), e.msec), this.$fncs.startQuake({
			hmax: e.hmax,
			vmax: e.vmax
		});
	}
	#V() {
		clearTimeout(this.#L), this.#L = void 0, this.#R = !1, this.$fncs.finishQuake(), this.#z && (this.#z = void 0, this.#E());
	}
	#H(e) {
		if (this.#R) {
			this.#z = { canskip: e };
			return;
		}
		setTimeout(() => this.#E(), 0);
	}
	#U;
	#W(e, t) {
		this.#U = {
			canskip: t,
			timer: setTimeout(() => this.#G(), Math.max(0, e))
		};
	}
	#G() {
		this.#U && (clearTimeout(this.#U.timer), this.#U = void 0, this.#E());
	}
	#K = Object.create(null);
	#q;
	#J(t) {
		let n = this.$fncs.getLaySty(t.nm, t.page), { from: r, aTo: i, aPrp: a } = e.#X(t, (e) => n[e] ?? N[e]);
		this.#Z(t, r, i, () => {
			let e = {};
			for (let t of a) Object.assign(e, { [t]: r[t] });
			this.$fncs.chgLay({
				nm: t.nm,
				page: t.page,
				sty: e
			});
		});
	}
	#Y(t) {
		let n = this.#S.getSty(t.id), { from: r, aTo: i, aPrp: a } = e.#X(t, (e) => n[e] ?? 0);
		this.#Z(t, r, i, () => {
			let e = {};
			for (let t of a) Object.assign(e, { [t]: r[t] });
			this.#le(this.#S.frame(t.id, e));
		});
	}
	static #X(e, t) {
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
	#Z(e, t, n, r) {
		this.#K[e.tw_nm]?.tw.kill(), delete this.#K[e.tw_nm];
		let i = {};
		for (let e of n) Object.assign(i, e);
		let a = () => {
			Object.assign(t, i), r();
		};
		if (e.msec <= 0 && e.delay <= 0) {
			a(), this.#Q(e.tw_nm);
			return;
		}
		let o = {
			duration: e.msec / 1e3,
			delay: e.delay / 1e3,
			ease: e.ease,
			repeat: e.repeat,
			yoyo: e.yoyo,
			onUpdate: r
		}, s = !!e.chain, c = () => {
			a(), this.#Q(e.tw_nm);
		}, l;
		if (n.length > 1) {
			let e = v.timeline({
				paused: s,
				onComplete: c
			});
			for (let r of n) e.to(t, {
				...r,
				...o
			});
			l = e;
		} else l = v.to(t, {
			...n[0],
			...o,
			paused: s,
			onComplete: c
		});
		if (this.#K[e.tw_nm] = {
			end: a,
			tw: l
		}, !e.chain) return;
		let u = this.#K[e.chain];
		if (!u) throw `${e.chain}は存在しない・または終了したトゥイーンです`;
		u.next = () => l.play();
	}
	#Q(e) {
		let { next: t } = this.#K[e] ?? {};
		delete this.#K[e], t?.(), this.#q?.tw_nm === e && (this.#q = void 0, setTimeout(() => this.#E(), 0));
	}
	#$(e) {
		let t = this.#K[e];
		t && (t.tw.kill(), t.end()), this.#Q(e);
	}
	#ee(e, t) {
		if (!this.#K[e]) {
			setTimeout(() => this.#E(), 0);
			return;
		}
		this.#q = {
			tw_nm: e,
			canskip: t
		};
	}
	#te = !1;
	#ne = 0;
	async #re() {
		let e = this.#r;
		if (e) {
			if (this.#te) {
				++this.#ne;
				return;
			}
			this.#te = !0, this.#l ??= {
				...e.nowScrIdx(),
				mark: this.#_(),
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
					for (let e of t) this.#pe(e);
					let n = t.at(-1);
					if (n?.t === "waitTrans") {
						this.#I(n.canskip);
						return;
					}
					if (n?.t === "wait") {
						this.#W(n.msec, n.canskip);
						return;
					}
					if (n?.t === "waitTsy") {
						this.#ee(n.tw_nm, n.canskip);
						return;
					}
					if (n?.t === "waitQuake") {
						this.#H(n.canskip);
						return;
					}
					if (n?.t === "addFrame" || n?.t === "letFrame") {
						this.#O = !0, this.#ie(n).catch(this.#i);
						return;
					}
					if (n?.t === "loadPlugin" || n?.t === "snapshot") {
						this.#O = !0, this.#oe(n).catch(this.#i);
						return;
					}
					if (n?.t === "load" || n?.t === "reloadScript") {
						this.#O = !0, this.#ae(n).catch(this.#i);
						return;
					}
					if (n?.t === "pageTo") {
						this.#O = !0, this.#f(n.to).catch(this.#i);
						return;
					}
					if (n?.t !== "loadScript") {
						e.atEnd && this.myTrace(`スクリプト終端です fn:${e.fn}`, "I");
						return;
					}
					try {
						e.switchScript(await this.#y(n.fn), n.label, n.idx);
					} catch (e) {
						this.myTrace(`[jump系] スクリプト切替エラー fn:${n.fn} ${String(e)}`, "ET");
						return;
					}
				}
			} finally {
				this.#te = !1, this.#ne > 0 && (--this.#ne, this.#E());
			}
		}
	}
	async #ie(e) {
		try {
			e.t === "addFrame" ? this.#le(await this.#S.add(e.id, e.src, e.sty)) : this.#le({ [`const.sn.frm.${e.id}.${e.var_name}`]: this.#S.get(e.id, e.var_name, e.fnc) });
		} catch (t) {
			this.#O = !1, this.myTrace(`[${e.t === "addFrame" ? "add_frame" : "let_frame"}] エラー id:${e.id} ${String(t)}`, "ET");
			return;
		}
		this.#O = !1, this.#E();
	}
	async #ae(e) {
		let t = this.#r;
		if (!t) {
			this.#O = !1;
			return;
		}
		try {
			let n = e.t === "reloadScript" ? this.#v : this.#p.getMark(e.place);
			if (!n) throw e.t === "reloadScript" ? "[record_place]がまだ実行されていません" : `place=${String(e.place)} は存在しません`;
			t.restoreMarkPart(n), this.$fncs.replace(n.sPages), this.#c.clear(), this.#l = void 0, this.#D = !1;
			let r = String(t.getVal("save:const.sn.scriptFn") ?? ""), i = Number(t.getVal("save:const.sn.scriptIdx") ?? 0);
			if (!r) throw "再開位置（save:const.sn.scriptFn）が空です";
			delete this.#n[r];
			let a = await this.#y(r);
			if (e.t === "load" && e.label) {
				t.switchScript(a, "", i);
				let n = e.fn && e.fn !== r ? await this.#y(e.fn) : a;
				t.callToScript(n, e.label);
			} else t.switchScript(a, "", i);
		} catch (t) {
			this.#O = !1, this.myTrace(`[${e.t === "reloadScript" ? "reload_script" : "load"}] ${String(t)}`, "ET");
			return;
		}
		this.#O = !1, this.#E();
	}
	async #oe(e) {
		try {
			e.t === "loadPlugin" ? await this.#se(e.fn) : await this.#ce(e);
		} catch (t) {
			this.myTrace(`[${e.t === "loadPlugin" ? "loadplugin" : "snapshot"}] ${String(t)}`, "E");
		}
		this.#O = !1, this.#E();
	}
	async #se(e) {
		let t = await fetch(e);
		if (!t.ok) throw `cssが取得できません fn:${e}`;
		let n = document.createElement("style");
		n.textContent = await t.text(), document.head.appendChild(n);
	}
	async #ce(e) {
		let t = this.#C;
		if (!t) throw "ステージがまだ表示されていません";
		let n = e.fn.startsWith(y), r = n ? e.fn : J(e.fn || "snapshot"), { stageW: i, stageH: a } = d, o = await Y({
			el: t,
			sw: i,
			sh: a,
			width: e.width || i,
			height: e.height || a,
			bgColor: e.b_color === void 0 ? "black" : oe(e.b_color),
			page: e.page,
			aLayNm: e.aLayNm,
			mime: q(r),
			smoothing: e.smoothing
		});
		n ? this.#p.putFile(r, o) : ue(r, o);
	}
	#le(e) {
		for (let [t, n] of Object.entries(e)) this.#r?.setValNochk(t, n);
	}
	#ue = Object.create(null);
	#de(e) {
		let t = e === "l" ? "breakline" : "breakpage";
		return this.#ue[e] ??= this.sys.cfg.matchPath(`^${t}$`, b.SP_GSM).length > 0 ? this.sys.cfg.searchPath(t, b.SP_GSM) : "";
	}
	#fe(e, t) {
		if (!t) return "";
		if (t.startsWith("userdata:/")) return this.#p.getFile(t) || (this.myTrace(`[${e}] 保存された画像がありません fn:${t}`, "E"), "");
		try {
			return this.sys.cfg.searchPath(t, b.SP_GSM);
		} catch (n) {
			return this.myTrace(`[${e}] 画像が見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#pe(e) {
		switch (e.t) {
			case "addLay":
				this.$fncs.addLayer(e.cls === "grp" ? {
					cls: "grp",
					nm: e.nm,
					fn: "",
					src: "",
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
			case "chgPic":
				this.$fncs.chgPic({
					nm: e.nm,
					page: e.page,
					fn: e.fn,
					src: this.#fe("lay", e.fn),
					aFace: e.aFace.map((e) => ({
						...e,
						src: this.#fe("add_face", e.fn)
					}))
				});
				break;
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
					src: e.fn ? this.#fe("lay b_pic", e.fn) : ""
				});
				break;
			case "finishTrans":
				this.#F();
				break;
			case "trans":
				this.#F(), this.$fncs.startTrans({
					aLayNm: e.aLayNm,
					time: e.time,
					...e.rule ? { ruleSrc: this.#fe("trans", e.rule) } : {},
					...e.vague === void 0 ? {} : { vague: e.vague }
				}), this.#P(e.time);
				break;
			case "waitTrans": break;
			case "chgStr":
				{
					let t = _(e.str);
					for (let e of t) e.pic && (e.src = this.#fe("graph", e.pic));
					this.$fncs.chgStr({
						nm: e.nm,
						page: e.page,
						str: g(t),
						aCh: t
					});
				}
				break;
			case "addBtn": {
				let t = e.sty && {
					...e.sty,
					...e.sty.pic ? { src: this.#fe("button pic", e.sty.pic) } : {},
					...e.sty.b_pic ? { b_src: this.#fe("button b_pic", e.sty.b_pic) } : {}
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
				this.#J(e);
				break;
			case "tsyFrame":
				this.#Y(e);
				break;
			case "quake":
				this.#B(e);
				break;
			case "stopQuake":
				this.#V();
				break;
			case "waitQuake": break;
			case "waitTsy": break;
			case "stopTsy":
				this.#$(e.tw_nm);
				break;
			case "pauseTsy":
				this.#K[e.tw_nm]?.tw.paused(e.paused);
				break;
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
				e.join || this.#se(e.fn).catch(this.#i);
				break;
			case "snapshot": break;
			case "recordPlace":
				this.#v = this.#_();
				break;
			case "save":
				this.#p.setMark(e.place, {
					...this.#v ?? this.#_(),
					json: e.json
				}), this.#g();
				break;
			case "load":
			case "reloadScript": break;
			case "copyBookmark":
				this.#p.copyMark(e.from, e.to);
				break;
			case "eraseBookmark":
				this.#p.eraseMark(e.place);
				break;
			case "exportData":
				this.#g(), this.#p.export(), setTimeout(() => this.fireEvent("sn:exported"), 10);
				break;
			case "importData":
				this.#p.import().then((e) => {
					let t = this.#r;
					t && (t.setSys(e.sys), t.setKidoku(e.kidoku), this.fireEvent("sn:imported"));
				}).catch((e) => this.myTrace(`[import] ${String(e)}`, "E"));
				break;
			case "fullScrKey":
				this.#w.add(e.key);
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
				this.#le(this.#S.frame(e.id, e.sty, e.order, e.disabled));
				break;
			case "setFrame":
				this.#S.set(e.id, e.var_name, e.text);
				break;
			case "resvDomEvent": {
				let t = this.#S.resvDom(e.rawKey, e.key, e.del, e.needErr, (t) => {
					this.cancelAuto();
					for (let [e, n] of Object.entries(t.dataset)) this.#r?.setValNochk(`sn.event.domdata.${e}`, n ?? "");
					this.fireEvent(e.key);
				});
				!e.del && t[0] && m.add(t[0]);
				break;
			}
			case "setFocus":
				switch (e.mode) {
					case "add":
						for (let t of this.#S.resolveDom(e.rawKey, e.needErr ?? !0)) m.add(t);
						break;
					case "del":
						for (let t of this.#S.resolveDom(e.rawKey, e.needErr ?? !0)) m.remove(t);
						break;
					case "null":
						m.blur();
						break;
					case "next":
						m.next();
						break;
					case "prev":
						m.prev();
						break;
				}
				break;
			case "addFrame":
			case "letFrame": break;
			case "clearPageLog":
				this.#c.clear(), this.#l = void 0, this.#r?.setValNochk("save:const.sn.styPaging", r), this.#d();
				break;
			case "pageStyle":
				this.#r?.setValNochk("save:const.sn.styPaging", e.style), this.#d();
				break;
			case "pageKeys":
				this.#u = e.aKey;
				break;
			case "pageTo": break;
			case "trace":
				this.#he({ text: e.text });
				break;
			case "loadScript": break;
			case "stop": {
				let t = this.#l;
				if (this.#l = void 0, t && this.#c.push(t.fn, t.idx, t.mark, t.clearOnResume), this.#d(), e.kind === "l" || e.kind === "p") {
					let t = this.#de(e.kind);
					this.$fncs.setWait({
						nm: e.nm,
						kind: e.kind,
						...t ? { src: t } : {},
						...e.mark
					});
				}
				this.#D = e.kind === "s", e.resume ? this.#A(e.resume.mode, e.resume.msec) : this.$fncs.setSkipping(!1), this.#g(), this.$fncs.setBackAlpha(Number(this.#r?.getVal("sys:TextLayer.Back.Alpha") ?? 1)), this.$fncs.setBtnFont(String(this.#r?.getVal("tmp:sn.button.fontFamily") ?? "") || o), this.#r && this.$fncs.setChWait(this.#r.chWait);
				break;
			}
		}
	}
	async #me(e) {
		try {
			let t = this.sys.cfg.searchPath(e, b.SCRIPT), n = await fetch(t);
			if (!n.ok) throw Error(n.statusText);
			return await n.text();
		} catch (t) {
			throw this.myTrace(`[load] スクリプト読込に失敗しました fn:${e} ${String(t)}`, "ET"), t;
		}
	}
	#he(e) {
		return this.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
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
				d.isDarkMode && (n = "color:#49F;");
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
export { $ as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map