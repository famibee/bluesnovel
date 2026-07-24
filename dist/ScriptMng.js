import { t as e } from "./rolldown-runtime.js";
import { t } from "./Filter.js";
import { i as n, n as r, r as i, t as a } from "./CmnLib.js";
import { n as o, t as s } from "./gsap.js";
import { n as c } from "./ConfigBase.js";
//#region src/sn/AnalyzeTagArg.ts
function l(e, t, n = 0, r = 0, i = 0) {
	let a = e.slice(0, t).split("\n"), o = a.length;
	return {
		ln: r + o - 1,
		ch: o < 2 ? i + 1 + n + t : a.at(-1)?.length ?? 0
	};
}
var u = class {
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
			let { key: c, val: u, val2: d = "", literal: f } = e;
			if (f) {
				if (f.endsWith("=")) {
					let e = f.length - 1, { ch: s } = l(a, o + e, t, n, r);
					i[f.slice(0, -1)] = {
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
			let { ln: p, ch: m } = l(a, o, t, n, r), { ln: h, ch: g } = l(a, o + s.lastIndexOf(u ?? d) - +!u, t, n, r);
			i[c] = {
				k_ln: p,
				k_ch: m,
				v_ln: h,
				v_ch: g,
				v_len: u ? u.length : d.length + 2
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
}, d = /(?<name>[^\s;\]]+)/;
function f(e) {
	let t = d.exec(e.slice(1, -1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	let n = t.name;
	return [n, e.slice(1 + n.length, -1)];
}
function p(e) {
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
var m = class {
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
				let [i, a] = f(n);
				this.#l.parse(a);
				let o = this.#l.hPrm.fn;
				if (!o) continue;
				let { val: s } = o;
				if (!s.endsWith("*")) continue;
				e.aToken.splice(t, 1, "	", "; " + n), e.aLNum.splice(t, 1, NaN, NaN);
				let l = i === "loadplugin" ? c.CSS : c.SN, u = this.cfg.matchPath("^" + s.slice(0, -1) + ".*", l);
				for (let i of u) {
					let a = n.replace(this.#s, "fn=" + decodeURIComponent(r(i[l])));
					e.aToken.splice(t, 0, a), e.aLNum.splice(t, 0, NaN);
				}
			}
			e.len = e.aToken.length;
		}
	}
	#l = new u();
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
}, h = { save: "game" }, g = class e {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = /* @__PURE__ */ new Set();
	defBuiltin(e, t) {
		this.#t[e] = t;
	}
	static REG_NAME = /^(?:(tmp|game|save|sys|mp):)?([^\s:@]+)(@str)?$/;
	static parseName(t) {
		let n = e.REG_NAME.exec(t.trim());
		if (!n) throw `変数名が不正です：${t}`;
		let r = n[1] ?? "tmp";
		return {
			ns: h[r] ?? r,
			key: e.#r(n[2]),
			atStr: !!n[3]
		};
	}
	static #r(e) {
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
		let c = this.#i(i, a, n);
		return o ? c : e.castAuto(c);
	}
	#i(e, t, n) {
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
	static castTo(t, r) {
		switch (r) {
			case "": return t;
			case "num": return e.#a(t);
			case "int": return i(e.#a(t));
			case "uint": return n(e.#a(t));
			case "bool": return t != null && String(t) !== "false" && !!String(t);
			case "str": return t == null ? t : String(t);
			default: throw `cast【${String(r)}】は未定義です`;
		}
	}
	static #a(e) {
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
		this.#o("mp.");
		for (let t of Object.keys(e)) this.#e[`mp.${t}`] = e[t];
	}
	clearGame() {
		this.#o("game.");
	}
	clearSys() {
		this.#o("sys.");
	}
	#o(e) {
		for (let t of Object.keys(this.#e)) t.startsWith(e) && (delete this.#e[t], this.#n.delete(t));
	}
}, _ = (/* @__PURE__ */ e(((e, t) => {
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
			function T(e, t) {
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
			function E(e) {
				if (!v(e)) throw Error("not a parser: " + e);
			}
			function D(e, t) {
				return typeof e == "string" ? e.charAt(t) : e[t];
			}
			function O(e) {
				if (typeof e != "number") throw Error("not a number: " + e);
			}
			function k(e) {
				if (typeof e != "function") throw Error("not a function: " + e);
			}
			function A(e) {
				if (typeof e != "string") throw Error("not a string: " + e);
			}
			var ee = 2, te = 3, j = 8, ne = 5 * j, re = 4 * j, M = "  ";
			function N(e, t) {
				return Array(t + 1).join(e);
			}
			function P(e, t, n) {
				var r = t - e.length;
				return r <= 0 ? e : N(n, r) + e;
			}
			function F(e, t, n, r) {
				return {
					from: e - t > 0 ? e - t : 0,
					to: e + n > r ? r : e + n
				};
			}
			function ie(e, t) {
				var n, r, i, a, c, l = t.index, u = l.offset, d = 1;
				if (u === e.length) return "Got the end of the input";
				if (b(e)) {
					var f = u - u % j, p = u - f, m = F(f, ne, re + j, e.length), h = s(function(e) {
						return s(function(e) {
							return P(e.toString(16), 2, "0");
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
					n = l.column - 1, r = l.line - 1, a = F(r, ee, te, g.length), i = g.slice(a.from, a.to), c = a.to.toString().length;
				}
				var _ = r - a.from;
				return b(e) && (c = (8 * (a.to > 0 ? a.to - 1 : a.to)).toString(16).length) < 2 && (c = 2), o(function(t, r, i) {
					var o, s = i === _, l = s ? "> " : M;
					return o = b(e) ? P((8 * (a.from + i)).toString(16), c, "0") : P((a.from + i + 1).toString(), c, " "), [].concat(t, [l + o + " | " + r], s ? [M + N(" ", c) + " | " + P("", n, " ") + N("^", d)] : []);
				}, [], i).join("\n");
			}
			function I(e, t) {
				return [
					"\n",
					"-- PARSING FAILED " + N("-", 50),
					"\n\n",
					ie(e, t),
					"\n\n",
					(n = t.expected, n.length === 1 ? "Expected:\n\n" + n[0] : "Expected one of the following: \n\n" + n.join(", ")),
					"\n"
				].join("");
				var n;
			}
			function L(e) {
				return e.flags === void 0 ? [
					e.global ? "g" : "",
					e.ignoreCase ? "i" : "",
					e.multiline ? "m" : "",
					e.unicode ? "u" : "",
					e.sticky ? "y" : ""
				].join("") : e.flags;
			}
			function R() {
				for (var e = [].slice.call(arguments), t = e.length, n = 0; n < t; n += 1) E(e[n]);
				return r(function(n, r) {
					for (var i, a = Array(t), o = 0; o < t; o += 1) {
						if (!(i = C(e[o]._(n, r), i)).status) return i;
						a[o] = i.value, r = i.index;
					}
					return C(x(r, a), i);
				});
			}
			function z() {
				var e = [].slice.call(arguments);
				if (e.length === 0) throw Error("seqMap needs at least one argument");
				var t = e.pop();
				return k(t), R.apply(null, e).map(function(e) {
					return t.apply(null, e);
				});
			}
			function B() {
				var e = [].slice.call(arguments), t = e.length;
				if (t === 0) return G("zero alternates");
				for (var n = 0; n < t; n += 1) E(e[n]);
				return r(function(t, n) {
					for (var r, i = 0; i < e.length; i += 1) if ((r = C(e[i]._(t, n), r)).status) return r;
					return r;
				});
			}
			function ae(e, t) {
				return V(e, t).or(W([]));
			}
			function V(e, t) {
				return E(e), E(t), z(e, t.then(e).many(), function(e, t) {
					return [e].concat(t);
				});
			}
			function H(e) {
				A(e);
				var t = "'" + e + "'";
				return r(function(n, r) {
					var i = r + e.length, a = n.slice(r, i);
					return a === e ? x(i, a) : S(r, t);
				});
			}
			function U(e, t) {
				(function(e) {
					if (!(e instanceof RegExp)) throw Error("not a regexp: " + e);
					for (var t = L(e), n = 0; n < t.length; n++) {
						var r = t.charAt(n);
						if (r !== "i" && r !== "m" && r !== "u" && r !== "s") throw Error("unsupported regexp flag \"" + r + "\": " + e);
					}
				})(e), arguments.length >= 2 ? O(t) : t = 0;
				var n = function(e) {
					return RegExp("^(?:" + e.source + ")", L(e));
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
				return E(e), r(function(t, n) {
					var r = e._(t, n), i = t.slice(n, r.index);
					return r.status ? S(n, "not \"" + i + "\"") : x(n, null);
				});
			}
			function J(e) {
				return k(e), r(function(t, n) {
					var r = D(t, n);
					return n < t.length && e(r) ? x(n + 1, r) : S(n, "a character/byte matching " + e);
				});
			}
			function Y(e, t) {
				arguments.length < 2 && (t = e, e = void 0);
				var n = r(function(e, r) {
					return n._ = t()._, n._(e, r);
				});
				return e ? n.desc(e) : n;
			}
			function X() {
				return G("fantasy-land/empty");
			}
			i.parse = function(e) {
				if (typeof e != "string" && !b(e)) throw Error(".parse must be called with a string or Buffer as its argument");
				var t, n = this.skip(Q)._(e, 0);
				return t = n.status ? {
					status: !0,
					value: n.value
				} : {
					status: !1,
					index: T(e, n.furthest),
					expected: n.expected
				}, delete w[e], t;
			}, i.tryParse = function(e) {
				var t = this.parse(e);
				if (t.status) return t.value;
				var n = I(e, t), r = Error(n);
				throw r.type = "ParsimmonError", r.result = t, r;
			}, i.assert = function(e, t) {
				return this.chain(function(n) {
					return e(n) ? W(n) : G(t);
				});
			}, i.or = function(e) {
				return B(this, e);
			}, i.trim = function(e) {
				return this.wrap(e, e);
			}, i.wrap = function(e, t) {
				return z(e, this, t, function(e, t) {
					return t;
				});
			}, i.thru = function(e) {
				return e(this);
			}, i.then = function(e) {
				return E(e), R(this, e).map(function(e) {
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
				return A(e), this.map(function(t) {
					if (function(e) {
						if (!y(e)) throw Error("not an array: " + e);
					}(t), t.length) {
						A(t[0]);
						for (var n = t[0], r = 1; r < t.length; r++) A(t[r]), n += e + t[r];
						return n;
					}
					return "";
				});
			}, i.tie = function() {
				return this.tieWith("");
			}, i.times = function(e, t) {
				var n = this;
				return arguments.length < 2 && (t = e), O(e), O(t), r(function(r, i) {
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
				return z(this.times(e), this.many(), function(e, t) {
					return e.concat(t);
				});
			}, i.map = function(e) {
				k(e);
				var t = this;
				return r(function(n, r) {
					var i = t._(n, r);
					return i.status ? C(x(i.index, e(i.value)), i) : i;
				});
			}, i.contramap = function(e) {
				k(e);
				var t = this;
				return r(function(n, r) {
					var i = t.parse(e(n.slice(r)));
					return i.status ? x(r + n.length, i.value) : i;
				});
			}, i.promap = function(e, t) {
				return k(e), k(t), this.contramap(e).map(t);
			}, i.skip = function(e) {
				return R(this, e).map(function(e) {
					return e[0];
				});
			}, i.mark = function() {
				return z(Z, this, Z, function(e, t, n) {
					return {
						start: e,
						value: t,
						end: n
					};
				});
			}, i.node = function(e) {
				return z(Z, this, Z, function(t, n, r) {
					return {
						name: e,
						value: n,
						start: t,
						end: r
					};
				});
			}, i.sepBy = function(e) {
				return ae(this, e);
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
				return z(e, this, function(e, t) {
					return e(t);
				});
			}, i.chain = function(e) {
				var t = this;
				return r(function(n, r) {
					var i = t._(n, r);
					return i.status ? C(e(i.value)._(n, i.index), i) : i;
				});
			}, i.concat = i.or, i.empty = X, i.of = W, i["fantasy-land/ap"] = i.ap, i["fantasy-land/chain"] = i.chain, i["fantasy-land/concat"] = i.concat, i["fantasy-land/empty"] = i.empty, i["fantasy-land/of"] = i.of, i["fantasy-land/map"] = i.map;
			var Z = r(function(e, t) {
				return x(t, T(e, t));
			}), oe = r(function(e, t) {
				return t >= e.length ? S(t, "any character/byte") : x(t + 1, D(e, t));
			}), se = r(function(e, t) {
				return x(e.length, e.slice(t));
			}), Q = r(function(e, t) {
				return t < e.length ? S(t, "EOF") : x(t, null);
			}), ce = U(/[0-9]/).desc("a digit"), le = U(/[0-9]*/).desc("optional digits"), ue = U(/[a-z]/i).desc("a letter"), de = U(/[a-z]*/i).desc("optional letters"), fe = U(/\s*/).desc("optional whitespace"), pe = U(/\s+/).desc("whitespace"), $ = H("\r"), me = H("\n"), he = H("\r\n"), ge = B(he, me, $).desc("newline"), _e = B(ge, Q);
			r.all = se, r.alt = B, r.any = oe, r.cr = $, r.createLanguage = function(e) {
				var t = {};
				for (var n in e) ({}).hasOwnProperty.call(e, n) && function(n) {
					t[n] = Y(function() {
						return e[n](t);
					});
				}(n);
				return t;
			}, r.crlf = he, r.custom = function(e) {
				return r(e(x, S));
			}, r.digit = ce, r.digits = le, r.empty = X, r.end = _e, r.eof = Q, r.fail = G, r.formatError = I, r.index = Z, r.isParser = v, r.lazy = Y, r.letter = ue, r.letters = de, r.lf = me, r.lookahead = K, r.makeFailure = S, r.makeSuccess = x, r.newline = ge, r.noneOf = function(e) {
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
			}, r.regex = U, r.regexp = U, r.sepBy = ae, r.sepBy1 = V, r.seq = R, r.seqMap = z, r.seqObj = function() {
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
				return k(e), r(function(t, n) {
					for (var r = n; r < t.length && e(D(t, r));) r++;
					return x(r, t.slice(n, r));
				});
			}, r.test = J, r.whitespace = pe, r["fantasy-land/empty"] = X, r["fantasy-land/of"] = W, r.Binary = {
				bitSeq: d,
				bitSeqObj: function(e) {
					u();
					var t = {}, n = 0, r = s(function(e) {
						if (y(e)) {
							var r = e;
							if (r.length !== 2) throw Error("[" + r.join(", ") + "] should be length 2, got length " + r.length);
							if (A(r[0]), O(r[1]), Object.prototype.hasOwnProperty.call(t, r[0])) throw Error("duplicate key in bitSeqObj: " + r[0]);
							return t[r[0]] = !0, n++, r;
						}
						return O(e), [null, e];
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
					if (u(), O(e), e > 255) throw Error("Value specified to byte constructor (" + e + "=0x" + e.toString(16) + ") is larger in value than a single byte.");
					var t = (e > 15 ? "0x" : "0x0") + e.toString(16);
					return r(function(n, r) {
						var i = D(n, r);
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
})))(), v = class {
	val;
	#e = null;
	constructor(e, t = "\\") {
		this.val = e;
		function n(e) {
			let t = [];
			for (let n of e) t.push((typeof n == "string" ? (0, _.string)(n) : (0, _.regex)(n)).trim(_.optWhitespace));
			return (0, _.alt)(...t);
		}
		function r(e) {
			return (0, _.alt)(...Object.keys(e).sort().map((t) => {
				let n = e[t];
				return (typeof n == "string" ? (0, _.string)(n) : (0, _.regex)(n)).trim(_.optWhitespace).result(t);
			}));
		}
		function a(e, t) {
			let n = (0, _.lazy)(() => (0, _.seq)(e, n).or(t));
			return n;
		}
		function o(e, t) {
			return (0, _.seqMap)(t, e.many(), (e, t) => t.reduce((e, t) => [t, e], e));
		}
		function s(e, t) {
			let n = (0, _.lazy)(() => t.chain((t) => (0, _.seq)(e, (0, _.of)(t), n).or((0, _.of)(t))));
			return n;
		}
		function c(e, t) {
			return (0, _.seqMap)(t, (0, _.seq)(e, t).many(), (e, t) => t.reduce((e, t) => [
				t[0],
				e,
				t[1]
			], e));
		}
		let l = (0, _.alt)((0, _.alt)((0, _.regex)(/-?(0|[1-9][0-9]*)\.[0-9]+/), (0, _.regex)(/0x[0-9a-fA-F]+/)).map(Number), (0, _.alt)((0, _.regex)(/-?(0|[1-9][0-9]*)/)).map((e) => i(e))).map((e) => ["!num!", e]).desc("number"), u = (0, _.string)("null").map(() => ["!str!", null]), d = (0, _.regex)(/(true|false)/).map((e) => ["!bool!", e === "true"]).desc("boolean"), f = (0, _.regex)(RegExp(`(?:"(?:\\${t}["'#\\n]|[^"])*"|'(?:\\${t}["'#\\n]|[^'])*'|\\#(?:\\${t}["'#\\n]|[^#])*\\#)`)).map((e) => ["!str!", e.slice(1, -1).replaceAll(t, "")]).desc("string"), p = /\[[^\]]+\]/g, m = (0, _.regex)(/-?(?:(?:tmp|sys|game|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*(?:@str)?/).map((e) => {
			let t = e.replaceAll(p, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
			return n == null ? ["!str!", n] : typeof n == "boolean" ? ["!bool!", n] : Object.prototype.toString.call(n) === "[object String]" ? ["!str!", String(n)] : ["!num!", Number(n)];
		}).desc("string"), h = (0, _.lazy)(() => (0, _.string)("(").then(this.#e).skip((0, _.string)(")")).or(l).or(u).or(d).or(f).or(m)), g = [
			{
				type: a,
				ops: n([/[A-Za-z_][A-Za-z0-9_]*(?=\()/])
			},
			{
				type: o,
				ops: r({ PostfixInc: "++" })
			},
			{
				type: o,
				ops: r({ PostfixDec: "--" })
			},
			{
				type: a,
				ops: n([/!(?!=)|~/])
			},
			{
				type: a,
				ops: r({ PrefixInc: "++" })
			},
			{
				type: a,
				ops: r({ PrefixDec: "--" })
			},
			{
				type: a,
				ops: r({ UnaryNegate: /-(?!-)/ })
			},
			{
				type: s,
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
				type: s,
				ops: n([":"])
			},
			{
				type: s,
				ops: n(["?"])
			}
		];
		this.#e = g.reduce((e, t) => t.type(t.ops, e), h).trim(_.optWhitespace);
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
		int: (e) => i(this.#r(e.shift())),
		parseInt: (e) => i(this.#n.Number(e)),
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
}, y = class {
	fn;
	grm;
	#e;
	get aToken() {
		return this.#e.aToken;
	}
	#t = Object.create(null);
	constructor(e, t, n = new m()) {
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
}, b = class e {
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
}, x = [
	"alpha",
	"left",
	"top",
	"rotation",
	"scale_x",
	"scale_y",
	"pivot_x",
	"pivot_y"
], S = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function C(e, t) {
	let n = {}, r = (t, r) => {
		if (!r) return;
		let i = r.startsWith("="), a = i ? r.slice(1) : r;
		if (!a) return;
		let [o = "0", s] = a.split(","), c = parseFloat(o);
		if (!Number.isFinite(c)) throw `[${e}] ${t}の値が不正です：${r}`;
		if (s) {
			let n = parseFloat(s);
			if (!Number.isFinite(n)) throw `[${e}] ${t}の値が不正です：${r}`;
			c += Math.round(Math.random() * (n - c + 1));
		}
		n[t] = {
			v: c,
			rel: i
		};
	};
	for (let e of x) r(e, t[e]);
	return t.left === void 0 && r("left", t.x), t.top === void 0 && r("top", t.y), n;
}
var w = {
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
}, T = {
	In: "in",
	Out: "out",
	InOut: "inOut"
};
function E(e) {
	if (!e) return "none";
	let [t = "", n = ""] = e.split(".");
	if (t === "Linear") return "none";
	let r = w[t], i = T[n];
	if (!r || !i) throw `異常なease指定です：${e}`;
	return `${r}.${i}`;
}
function D(e, t) {
	let n = t.name ?? t.layer ?? "";
	if (!n) throw `[${e}] トゥイーンが指定されていません（name／layerのどちらも無し）`;
	return n;
}
//#endregion
//#region src/ts/ScriptEngine.ts
var O = class e {
	static #e = new u();
	static parseTag(t) {
		let [n, r] = f(t);
		e.#e.parse(r);
		let i = {};
		for (let [t, n] of Object.entries(e.#e.hPrm)) i[t] = n.val;
		return {
			name: n,
			args: i
		};
	}
	#t(t) {
		let [n, r] = f(t), i = e.#e;
		i.parse(r);
		let a = i.hPrm, o = a.cond?.val;
		if (o !== void 0) {
			if (!o || o.startsWith("&")) throw "属性condは「&」が不要です";
			let e = this.#y.parse(o), t = String(e);
			if (!e || t === "null" || t === "undefined" || t === "false") return;
		}
		let s = this.#x.at(-1), c = Object.create(null);
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
			if (r = this.#y.getValAmpersand(r), r !== "undefined") {
				c[e] = r;
				continue;
			}
			n !== void 0 && (r = this.#y.getValAmpersand(n), r !== "undefined" && (c[e] = r));
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
	static #r(t, n, r, i) {
		return r === void 0 ? i : e.#n(t, n, r);
	}
	static #i(e, t) {
		let { reg: n, flags: r } = t;
		if (!n) throw `[${e}] regは必須です`;
		return r ? new RegExp(n, r) : new RegExp(n);
	}
	static #a(e) {
		let t = (e ?? "").split(",").map((e) => e.trim()).filter((e) => e !== "");
		return t.length > 0 ? t : null;
	}
	static #o = {
		normal: "normal",
		add: "plus-lighter",
		multiply: "multiply",
		screen: "screen"
	};
	static #s(t) {
		let n = e.#o[t];
		if (!n) throw `${t} はサポートされない blendmode です`;
		return n;
	}
	static #c = [
		"alpha",
		"x",
		"y",
		"width",
		"height",
		"scale_x",
		"scale_y",
		"rotate"
	];
	static #l = [
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
	static #u(t, n) {
		let r = {};
		n.visible !== void 0 && (r.visible = n.visible !== "false");
		for (let i of e.#c) {
			let a = n[i];
			a !== void 0 && Object.assign(r, { [i]: e.#n(t, i, a) });
		}
		return n.b_color !== void 0 && (r.b_color = n.b_color), r;
	}
	static argPage(e, t) {
		let n = e.page ?? t;
		if (n === "fore" || n === "back") return n;
		throw `属性 page【${n}】が不正です`;
	}
	static #d(e, t, n) {
		let r = t.page ?? n;
		if (r === "fore" || r === "back" || r === "both") return r;
		throw `[${e}] 属性 page【${r}】が不正です`;
	}
	#f;
	#p = 0;
	#m = "mes";
	#h = Object.create(null);
	#g = !1;
	#_ = Object.create(null);
	#v = new g();
	#y = new v(this.#v);
	#b = [];
	#x = [];
	#S = Object.create(null);
	#C = Object.create(null);
	#w = Object.create(null);
	#T = !1;
	#E = Object.create(null);
	static REG_NG4MAC_NM = /["'#;\\\]　]+/;
	static RESERVED_TAGS = /* @__PURE__ */ new Set(/* @__PURE__ */ "add_lay.current.add_face.lay.clear_lay.trans.wt.let.let_ml.endlet_ml.let_abs.let_char_at.let_index_of.let_length.let_replace.let_round.let_search.let_substr.tsy.wait_tsy.stop_tsy.pause_tsy.resume_tsy.title.toggle_full_screen.dump_lay.pop_stack.add_frame.frame.set_frame.let_frame.set_focus.add_filter.clear_filter.enable_filter.if.elsif.else.endif.r.er.trace.jump.call.return.macro.endmacro.char2macro.bracket2macro.button.event.clear_event.enable_event.clearvar.clearsysvar.page.wait.waitclick.l.p.s".split("."));
	#D() {
		let t = Object.create(null);
		for (let n of e.RESERVED_TAGS) t[n] = !0;
		for (let e in this.#E) t[e] = !0;
		return t;
	}
	constructor(e, t = "") {
		this.#f = e instanceof y ? e : new y(e, t), this.#v.defBuiltin("const.sn.scriptFn", () => this.fn), this.#v.defBuiltin("const.sn.isKidoku", () => this.#T), this.#v.defBuiltin("const.sn.displayState", () => this.#O);
	}
	#O = !1;
	setFullScr(e) {
		this.#O = e;
	}
	switchScript(e, t = "", n = 0) {
		if (this.#f = e, !t) {
			this.#p = n;
			return;
		}
		let r = e.label2idx(t);
		if (r === void 0) throw `ラベル【${t}】がスクリプト【${e.fn}】に見つかりません`;
		this.#p = r;
	}
	getVal(e) {
		return this.#v.get(e);
	}
	setValNochk(e, t) {
		this.#v.set(e, t);
	}
	defBuiltin(e, t) {
		this.#v.defBuiltin(e, t);
	}
	get fn() {
		return this.#f.fn;
	}
	get idx() {
		return this.#p;
	}
	get atEnd() {
		return this.#p >= this.#f.len;
	}
	jumpToLabel(e) {
		let t = this.#f.label2idx(e);
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#p = t;
	}
	callToLabel(e) {
		let t = this.#f.label2idx(e);
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#I(--this.#p), this.#p = t;
	}
	callToScript(e, t = "") {
		this.#I(--this.#p), this.switchScript(e, t);
	}
	get isKidoku() {
		return this.#T;
	}
	#k() {
		let e = this.#w[this.fn] ??= new b();
		if (this.#x.length > 0) {
			e.record(this.#p);
			return;
		}
		this.#T = e.search(this.#p), !this.#T && e.record(this.#p);
	}
	#A() {
		this.#w[this.fn]?.erase(this.#p), this.#T = !1;
	}
	getKidoku() {
		let e = {};
		for (let [t, n] of Object.entries(this.#w)) e[t] = n.val();
		return e;
	}
	setKidoku(e) {
		for (let e in this.#w) delete this.#w[e];
		this.#T = !1;
		for (let [t, n] of Object.entries(e)) this.#w[t] = b.from(n);
	}
	clearKidoku() {
		for (let e of Object.values(this.#w)) e.clear();
		this.#T = !1;
	}
	get autoEnabled() {
		return this.#j("sn.auto.enabled");
	}
	get skipEnabled() {
		return this.#j("sn.skip.enabled");
	}
	get skipAll() {
		return this.#j("sn.skip.all");
	}
	#j(e) {
		return this.#v.get(`tmp:${e}`) === !0;
	}
	cancelAutoSkip() {
		this.#v.set("tmp:sn.skip.enabled", !1), this.#v.set("tmp:sn.skip.all", !1), this.#v.set("tmp:sn.auto.enabled", !1);
	}
	get isNextKidoku() {
		let e = this.fn, t = this.#p, n = this.#f.len, r = this.#x.at(-1);
		return r && (e = r.fn, t = r.returnIdx, n = r.scr.len), t >= n ? !1 : this.#w[e]?.search(t) ?? !1;
	}
	#M(e) {
		if (e === "s" || e === "waitclick") {
			this.cancelAutoSkip();
			return;
		}
		if (this.autoEnabled) return {
			mode: "auto",
			msec: this.#P(e === "p")
		};
		if (this.skipEnabled) {
			if (!this.skipAll && !this.isNextKidoku) {
				this.cancelAutoSkip();
				return;
			}
			return e === "p" && this.#N() !== "s" ? void 0 : {
				mode: "skip",
				msec: 0
			};
		}
	}
	#N() {
		let e = this.#v.get("sys:sn.skip.mode");
		return e == null ? "s" : String(e);
	}
	#P(e) {
		let t = e ? "sn.auto.msecPageWait" : "sn.auto.msecLineWait", n = Number(this.#v.get(`sys:${t}${this.isKidoku ? "_Kidoku" : ""}`));
		return Number.isFinite(n) && n > 0 ? n : e ? 3500 : 500;
	}
	getEvent(e) {
		let t = e.toLowerCase();
		return this.#S[t] ?? this.#C[t];
	}
	clearEvent(e = !1) {
		if (!e) {
			this.#S = Object.create(null);
			return;
		}
		for (let e in this.#C) delete this.#C[e];
	}
	#F() {
		let e = this.#S;
		return this.#S = Object.create(null), e;
	}
	beginEvent(e) {
		let t = this.getEvent(e);
		if (t) return this.#v.set("tmp:sn.eventArg", t.arg), this.#v.set("tmp:sn.eventLabel", t.label), t.call || this.clearEvent(), t;
	}
	#I(e, t = !0, n = {}) {
		this.#x.push({
			fn: this.fn,
			returnIdx: e,
			lenIfStk: this.#b.length,
			hMp: this.#v.cloneMp(),
			hArgs: n,
			scr: this.#f,
			...t ? { hEvt: this.#F() } : {}
		}), this.#b.push(-1);
	}
	step() {
		let e = [];
		for (this.#g && (this.#g = !1, this.#h[this.#m] = "", e.push({
			t: "chgStr",
			nm: this.#m,
			page: "fore",
			str: ""
		})); this.#p < this.#f.len;) {
			this.#k();
			let t = this.#f.aToken[this.#p++], n = t.charCodeAt(0);
			if (n === 9 || n === 10) continue;
			if (n === 91) {
				let n = this.#t(t);
				if (!n) continue;
				let { name: r, args: i } = n;
				if (this.#R(r, i, e) === "stop") return e;
				continue;
			}
			let r = t, i = this.#f.grm.ce;
			if (i && t.length > 1 && t.startsWith(i)) r = t.slice(1);
			else if (n === 38) {
				if (!t.endsWith("&")) {
					this.#L(t);
					continue;
				}
				if (t.charAt(1) === "&") throw "「&表示&」書式では「&」指定が不要です";
				let e = this.#y.parse(t.slice(1, -1));
				r = e == null ? "" : String(e);
			} else if (n === 59) continue;
			else if (n === 42 && t.length > 1) continue;
			this.#W(e, r);
		}
		return e;
	}
	#L(e) {
		let { name: t, text: n, cast: r } = p(e.slice(1));
		this.#v.set(this.#y.getValAmpersand(t.trim()), this.#y.parse(n), r ?? "");
	}
	#R(n, r, a) {
		let o = this.#f.len;
		switch (n) {
			case "add_lay": {
				let e = r.layer ?? r.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (r.class ?? "txt").toLowerCase() === "grp" ? "grp" : "txt";
				return this.#h[e] = "", a.push({
					t: "addLay",
					cls: t,
					nm: e
				}), "skip";
			}
			case "current": return this.#m = r.layer ?? r.nm ?? this.#m, "skip";
			case "add_face": {
				let e = r.name ?? "";
				if (!e) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#_[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
				return this.#_[e] = {
					fn: r.fn || e,
					dx: Number(r.dx || "0"),
					dy: Number(r.dy || "0"),
					blendmode: r.blendmode || "normal"
				}, "skip";
			}
			case "lay": {
				let n = e.argPage(r, "fore"), i = r.fn || r.pic;
				if (i) {
					let e = [];
					if (r.face) for (let t of r.face.split(",")) {
						if (!t) throw "[lay] face属性に空要素が含まれています";
						let n = this.#_[t];
						if (!n) throw `[lay] face【${t}】は[add_face]で未定義です`;
						e.push(n);
					}
					a.push({
						t: "chgPic",
						nm: r.layer ?? "",
						page: n,
						fn: i,
						aFace: e
					});
				}
				if (r.b_alpha !== void 0) {
					let e = Number(r.b_alpha);
					if (Number.isNaN(e)) throw `[lay] b_alphaの値が不正です：${r.b_alpha}`;
					a.push({
						t: "chgBAlpha",
						nm: r.layer ?? "",
						page: n,
						b_alpha: Math.min(1, Math.max(0, e))
					});
				}
				let o = {};
				r.visible !== void 0 && (o.visible = r.visible !== "false"), r.alpha !== void 0 && (o.alpha = e.#n("lay", "alpha", r.alpha)), r.left !== void 0 && (o.left = e.#n("lay", "left", r.left)), r.top !== void 0 && (o.top = e.#n("lay", "top", r.top)), r.rotation !== void 0 && (o.rotation = e.#n("lay", "rotation", r.rotation)), r.scale_x !== void 0 && (o.scale_x = e.#n("lay", "scale_x", r.scale_x)), r.scale_y !== void 0 && (o.scale_y = e.#n("lay", "scale_y", r.scale_y)), r.pivot_x !== void 0 && (o.pivot_x = e.#n("lay", "pivot_x", r.pivot_x)), r.pivot_y !== void 0 && (o.pivot_y = e.#n("lay", "pivot_y", r.pivot_y)), r.blendmode !== void 0 && (o.blendmode = e.#s(r.blendmode)), r.b_color !== void 0 && (o.b_color = e.#n("lay", "b_color", r.b_color)), r.style !== void 0 && (o.style = r.style), Object.keys(o).length > 0 && a.push({
					t: "chgLay",
					nm: r.layer ?? "",
					page: n,
					sty: o
				});
				let s = r.layer ?? "";
				if ((r.float ?? "false") !== "false") a.push({
					t: "moveLay",
					nm: s,
					mode: "float"
				});
				else if (r.index) {
					let t = e.#n("lay", "index", r.index);
					t && a.push({
						t: "moveLay",
						nm: s,
						mode: "index",
						index: t
					});
				} else r.dive && a.push({
					t: "moveLay",
					nm: s,
					mode: "dive",
					dive: r.dive
				});
				return r.filter !== void 0 && a.push({
					t: "addFilter",
					aLayNm: [s],
					page: n,
					flt: t(r),
					replace: !0
				}), "skip";
			}
			case "add_filter": return a.push({
				t: "addFilter",
				aLayNm: e.#a(r.layer),
				page: e.#d("add_filter", r, "fore"),
				flt: t(r),
				replace: !1
			}), "skip";
			case "clear_filter": return a.push({
				t: "clearFilter",
				aLayNm: e.#a(r.layer),
				page: e.#d("clear_filter", r, "fore")
			}), "skip";
			case "enable_filter": return a.push({
				t: "enableFilter",
				aLayNm: e.#a(r.layer),
				page: e.#d("enable_filter", r, "fore"),
				index: e.#r("enable_filter", "index", r.index, 0),
				enabled: (r.enabled ?? "true") !== "false"
			}), "skip";
			case "clear_lay": {
				let t = r.page ?? "back";
				if (t !== "fore" && t !== "back" && t !== "both") throw `属性 page【${t}】が不正です`;
				if (r.layer !== void 0 && e.#a(r.layer) === null) throw "[clear_lay] layer属性が空です";
				return a.push({
					t: "clearLay",
					aLayNm: e.#a(r.layer),
					page: t
				}), "skip";
			}
			case "trans": {
				let e = r.layer ?? "", t = e ? e.split(",").map((e) => e.trim()).filter((e) => e !== "") : null;
				if (t?.length === 0) throw "[trans] layer属性が空です";
				let n = Number(r.time ?? "0");
				if (!Number.isFinite(n) || n < 0) throw `[trans] timeの値が不正です：${r.time ?? ""}`;
				return a.push({
					t: "trans",
					aLayNm: t,
					time: this.skipEnabled ? 0 : n
				}), "skip";
			}
			case "wt": return a.push({
				t: "waitTrans",
				canskip: (r.canskip ?? "true") !== "false"
			}), "stop";
			case "tsy": {
				let { layer: t } = r;
				if (!t) throw "[tsy] layerは必須です";
				let n = this.skipEnabled, i = n ? 0 : e.#n("tsy", "time", r.time ?? ""), o = n ? 0 : e.#r("tsy", "delay", r.delay, 0), s = e.#r("tsy", "repeat", r.repeat, 1);
				return a.push({
					t: "tsy",
					tw_nm: D("tsy", r),
					nm: t,
					page: e.argPage(r, "fore"),
					msec: i,
					delay: o,
					ease: E(r.ease),
					repeat: s > 0 ? s - 1 : -1,
					yoyo: (r.yoyo ?? "false") !== "false",
					hTo: C("tsy", r)
				}), "skip";
			}
			case "wait_tsy": return a.push({
				t: "waitTsy",
				tw_nm: D("wait_tsy", r),
				canskip: (r.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return a.push({
				t: "stopTsy",
				tw_nm: D("stop_tsy", r)
			}), "skip";
			case "pause_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: D("pause_tsy", r),
				paused: !0
			}), "skip";
			case "resume_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: D("resume_tsy", r),
				paused: !1
			}), "skip";
			case "let": {
				if (r.text !== void 0) return this.#B("let", r, r.text), "skip";
				let e = r.name ?? "";
				if (!e) throw "[let] nameは必須です（試作仕様）";
				if (r.val === void 0) throw `[let] textまたはvalは必須です（name:${e}）`;
				let t = r.val;
				return this.#v.set(e, this.#y.parse(t), r.cast ?? ""), "skip";
			}
			case "let_abs": {
				let t = e.#r("let_abs", "text", r.text, 0);
				return this.#B("let_abs", r, String(t < 0 ? -t : t)), "skip";
			}
			case "let_round": {
				let t = e.#r("let_round", "text", r.text, 0);
				return this.#B("let_round", r, String(Math.round(t))), "skip";
			}
			case "let_length": return this.#B("let_length", r, String((r.text ?? "").length)), "skip";
			case "let_char_at": {
				let t = e.#r("let_char_at", "pos", r.pos, 0);
				return this.#B("let_char_at", r, (r.text ?? "").charAt(t)), "skip";
			}
			case "let_index_of": {
				let { val: t } = r;
				if (!t) throw "[let_index_of] valは必須です";
				let n = e.#r("let_index_of", "start", r.start, 0);
				return this.#B("let_index_of", r, String((r.text ?? "").indexOf(t, n))), "skip";
			}
			case "let_substr": {
				let t = e.#r("let_substr", "pos", r.pos, 0), n = r.text ?? "";
				return this.#B("let_substr", r, r.len === "all" ? n.slice(t) : n.slice(t, t + i(e.#r("let_substr", "len", r.len, 1)))), "skip";
			}
			case "let_replace": return this.#B("let_replace", r, (r.text ?? "").replace(e.#i("let_replace", r), String(r.val))), "skip";
			case "let_search": return this.#B("let_search", r, String((r.text ?? "").search(e.#i("let_search", r)))), "skip";
			case "let_ml": {
				let e = r.name ?? "";
				if (!e) throw "[let_ml] nameは必須です";
				let t = "";
				for (; this.#p < o && (t = this.#f.aToken[this.#p], t === ""); ++this.#p);
				if (this.#f.grm.testTagEndLetml(t)) return this.#v.set(e, "", "str"), ++this.#p, "skip";
				if (!this.#f.grm.testTagEndLetml(this.#f.aToken[this.#p + 1] ?? "")) throw `[let_ml] 変数【${e}】の終端・[endlet_ml]がありません`;
				return this.#v.set(e, t, "str"), this.#p += 2, "skip";
			}
			case "endlet_ml": return "skip";
			case "if": return this.#V(r), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#H(), "skip";
			case "r": return this.#W(a, "\n"), "skip";
			case "er": return this.#h[this.#m] = "", a.push({
				t: "chgStr",
				nm: this.#m,
				page: "both",
				str: ""
			}), "skip";
			case "trace": return a.push({
				t: "trace",
				text: r.text ?? ""
			}), "skip";
			case "jump": {
				r.count === "false" && this.#A();
				let e = r.label ?? "", t = r.fn ?? "";
				if (!e && !t) throw "[jump] fnまたはlabelは必須です";
				if (t && t !== this.fn) return a.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#f.label2idx(e);
				if (n === void 0) throw `[jump] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#p = n, "skip";
			}
			case "call": {
				r.count !== "true" && this.#A();
				let e = r.label ?? "", t = r.fn ?? "";
				if (!e && !t) throw "[call] fnまたはlabelは必須です";
				if (t && t !== this.fn) return this.#I(this.#p, !0, r), a.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#f.label2idx(e);
				if (n === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#I(this.#p, !0, r), this.#p = n, "skip";
			}
			case "return": return this.#U(a, r);
			case "macro": {
				let t = r.name ?? "";
				if (!t) throw "[macro] nameは必須です（試作仕様）";
				if (e.RESERVED_TAGS.has(t)) throw `[${t}]はタグ名のため、マクロ名として使用できません`;
				if (e.REG_NG4MAC_NM.test(t)) throw `[${t}]はマクロ名として異常です`;
				if (t in this.#E) throw `[macro] マクロ【${t}】は既に定義済みです`;
				this.#E[t] = {
					fn: this.fn,
					idx: this.#p
				};
				let n = !1, i = 0, a = !1;
				for (; this.#p < o; ++this.#p) {
					let t = this.#f.aToken[this.#p];
					if (a) {
						this.#f.grm.testTagEndLetml(t) && (a = !1);
						continue;
					}
					if (t.charCodeAt(0) !== 91) continue;
					if (this.#f.grm.testTagLetml(t)) {
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
						++this.#p, n = !0;
						break;
					}
				}
				if (!n) throw `[macro] マクロ【${t}】が[endmacro]で閉じられていません（試作仕様）`;
				return "skip";
			}
			case "char2macro":
			case "bracket2macro": return this.#f.defC2M(n, r, this.#D(), this.#p), "skip";
			case "endmacro": return this.#U(a);
			case "button": {
				let t = r.layer || this.#m;
				if (!t) throw "[button] layerは必須です（試作仕様）";
				let n = r.label ?? "", i = r.fn ?? "";
				if (!n && !i) throw "[button] fnまたはlabelは必須です";
				let o = r.nm ?? (n || i), s = r.call === "true", c = e.argPage(r, "back"), l = {};
				for (let t of e.#l) {
					let n = r[t];
					n !== void 0 && Object.assign(l, { [t]: e.#n("button", t, n) });
				}
				return r.enabled !== void 0 && (l.enabled = r.enabled !== "false"), r.blendmode !== void 0 && (l.blendmode = e.#s(r.blendmode)), a.push({
					t: "addBtn",
					layerNm: t,
					page: c,
					nm: o,
					text: r.text ?? "",
					label: n,
					call: s,
					...i ? { fn: i } : {},
					...Object.keys(l).length > 0 ? { sty: l } : {}
				}), "skip";
			}
			case "page":
				if (!("clear" in r || "to" in r || "style" in r)) throw "[page] clear,style,to いずれかは必須です";
				return r.clear === "true" && a.push({ t: "clearPageLog" }), "skip";
			case "title": {
				let { text: e } = r;
				if (!e) throw "[title] textは必須です";
				return a.push({
					t: "title",
					text: e
				}), "skip";
			}
			case "toggle_full_screen": return a.push(r.key ? {
				t: "fullScrKey",
				key: r.key.toLowerCase()
			} : { t: "toggleFullScr" }), "skip";
			case "dump_lay": return a.push({
				t: "dumpLay",
				aLayNm: e.#a(r.layer)
			}), "skip";
			case "pop_stack":
				if ((r.clear ?? "false") !== "false") this.#x.length = 0;
				else if (!this.#x.pop()) throw "[pop_stack] スタックが空です";
				return this.#b.length = 0, this.#b.push(-1), this.#v.setMp({}), "skip";
			case "clearvar": return this.#v.clearGame(), "skip";
			case "clearsysvar": return this.#v.clearSys(), this.clearKidoku(), "skip";
			case "event": {
				let e = r.key ?? "", t = e.toLowerCase();
				if (!t) throw "[event] keyは必須です";
				let n = t.startsWith("dom="), i = r.global === "true" ? this.#C : this.#S;
				if (r.del === "true") {
					if (r.fn || r.label || r.call) throw "[event] fn/label/callとdelは同時指定できません";
					return delete i[t], n && a.push({
						t: "resvDomEvent",
						rawKey: e,
						key: t,
						del: !0,
						needErr: !1
					}), "skip";
				}
				let o = r.label ?? "", s = r.fn ?? this.fn;
				if (!o && !r.fn) throw "[event] fn,label いずれかは必須です";
				return i[t] = {
					fn: s,
					label: o,
					call: r.call === "true",
					arg: r.arg ?? ""
				}, n && a.push({
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
					return a.push({
						t: "setFocus",
						mode: e === void 0 ? "del" : "add",
						rawKey: n,
						needErr: i
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
				let { id: t, src: n } = r;
				if (!t) throw "[add_frame] idは必須です";
				if (!n) throw "[add_frame] srcは必須です";
				if (this.#v.get(`const.sn.frm.${t}`)) throw `[add_frame] frame【${t}】はすでにあります`;
				return a.push({
					t: "addFrame",
					id: t,
					src: n,
					sty: e.#u("add_frame", r)
				}), "stop";
			}
			case "frame": {
				let { id: t } = r;
				if (!t) throw "[frame] idは必須です";
				this.#z("frame", t);
				let n = (r.float ?? "false") === "false" ? r.index === void 0 ? r.dive ? { mode: "dive" } : void 0 : {
					mode: "index",
					index: e.#n("frame", "index", r.index)
				} : { mode: "float" };
				return a.push({
					t: "frame",
					id: t,
					sty: e.#u("frame", r),
					...n ? { order: n } : {},
					...r.disabled === void 0 ? {} : { disabled: r.disabled !== "false" }
				}), "skip";
			}
			case "set_frame": {
				let { id: e, var_name: t, text: n } = r;
				if (!e) throw "[set_frame] idは必須です";
				if (!t) throw "[set_frame] var_nameは必須です";
				if (!n) throw "[set_frame] textは必須です";
				return this.#z("set_frame", e), this.#v.set(`const.sn.frm.${e}.${t}`, n), a.push({
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
				return this.#z("let_frame", e), a.push({
					t: "letFrame",
					id: e,
					var_name: t,
					fnc: (r.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(r.global === "true"), "skip";
			case "enable_event": {
				let e = r.layer || this.#m, t = (r.enabled ?? "true") !== "false";
				return this.#v.set(`game:const.sn.layer.${e}.enabled`, t), a.push({
					t: "enableEvent",
					nm: e,
					enabled: t
				}), "skip";
			}
			case "wait": {
				let t = e.#n("wait", "time", r.time ?? "");
				return this.skipEnabled ? (!this.skipAll && !this.isNextKidoku && this.cancelAutoSkip(), "skip") : (a.push({
					t: "wait",
					msec: t,
					canskip: (r.canskip ?? "true") !== "false"
				}), "stop");
			}
			case "l":
			case "p":
			case "s":
			case "waitclick": {
				n === "p" && (this.#g = !0);
				let e = this.#M(n);
				return a.push({
					t: "stop",
					kind: n,
					key: `${this.fn}:${String(this.#p)}`,
					nm: this.#m,
					...e ? { resume: e } : {}
				}), "stop";
			}
			default: {
				let e = this.#E[n];
				return e === void 0 ? "skip" : (this.#I(this.#p, !1, r), this.#v.setMp({
					...r,
					"const.sn.me_call_scriptFn": this.fn,
					"const.sn.macro": JSON.stringify({ name: n })
				}), e.fn === this.fn ? (this.#p = e.idx, "skip") : (a.push({
					t: "loadScript",
					fn: e.fn,
					label: "",
					idx: e.idx
				}), "stop"));
			}
		}
	}
	#z(e, t) {
		if (!this.#v.get(`const.sn.frm.${t}`)) throw `[${e}] frame【${t}】が読み込まれていません`;
	}
	#B(e, t, n) {
		let r = t.name ?? "";
		if (!r) throw `[${e}] nameは必須です`;
		this.#v.set(r, n, t.cast ?? "");
	}
	#V(t) {
		let n = t.exp ?? "";
		if (!n) throw "[if] expは必須です（試作仕様）";
		let r = this.#y.evalBool(n) ? this.#p : -1, i = 0, a = !1, o = this.#f.len;
		for (; this.#p < o; ++this.#p) {
			let t = this.#f.aToken[this.#p];
			if (a) {
				this.#f.grm.testTagEndLetml(t) && (a = !1);
				continue;
			}
			if (t.charCodeAt(0) !== 91) continue;
			if (this.#f.grm.testTagLetml(t)) {
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
					this.#y.evalBool(e) && (r = this.#p + 1);
					continue;
				}
				case "else":
					if (i > 0) continue;
					r === -1 && (r = this.#p + 1);
					continue;
				case "endif":
					if (i > 0) {
						--i;
						continue;
					}
					r === -1 ? ++this.#p : (this.#b.push(this.#p + 1), this.#p = r);
					return;
				default: continue;
			}
		}
		throw "[if] に対応する [endif] が見つかりません（試作仕様）";
	}
	#H() {
		let e = this.#b.pop();
		if (e === void 0 || e === -1) throw "[if] に対応していない [elsif]/[else]/[endif] です";
		this.#p = e;
	}
	#U(e, t = {}) {
		let n = this.#x.pop();
		if (!n) throw "[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）";
		this.#b.length = n.lenIfStk, this.#v.setMp(n.hMp), n.hEvt && (this.#S = n.hEvt);
		let r = t.label ?? "", i = t.fn ?? "";
		if (i || r) {
			if (i && i !== this.fn) return e.push({
				t: "loadScript",
				fn: i,
				label: r,
				idx: 0
			}), "stop";
			let t = this.#f.label2idx(r);
			if (t === void 0) throw `[return] ラベル【${r}】がスクリプト【${this.fn}】に見つかりません`;
			return this.#p = t, "skip";
		}
		return n.fn === this.fn ? (this.#p = n.returnIdx, "skip") : (e.push({
			t: "loadScript",
			fn: n.fn,
			label: "",
			idx: n.returnIdx
		}), "stop");
	}
	#W(e, t) {
		let n = this.#m, r = (this.#h[n] ?? "") + t;
		this.#h[n] = r, e.push({
			t: "chgStr",
			nm: n,
			page: "fore",
			str: r
		});
	}
}, k = class e {
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
	#a = 1;
	getDisabled(e) {
		return this.#i[e] ?? !1;
	}
	#o(e, t) {
		let n = this.#r[t];
		if (!n) throw `[${e}] frame【${t}】が読み込まれていません`;
		return n;
	}
	#s(e, t) {
		let n = this.#o(e, t).contentWindow;
		if (!n) throw `[${e}] frame【${t}】の中身がありません`;
		return n;
	}
	async add(t, n, r) {
		if (this.#r[t]) throw `[add_frame] frame【${t}】はすでにあります`;
		let i = this.#e ?? await this.#n, o = this.searchPath(n, c.HTML), s = await fetch(o);
		if (!s.ok) throw `[add_frame] HTMLの読込に失敗しました src:${n} ${s.statusText}`;
		let l = e.#d(await s.text(), o), u = document.createElement("iframe");
		u.id = t, u.style.cssText = "position: absolute; border: 0; overflow: hidden; pointer-events: auto;", i.appendChild(u), this.#r[t] = u, this.#i[t] = !1, this.#c(u, {
			visible: !0,
			alpha: 1,
			x: 0,
			y: 0,
			width: a.stageW,
			height: a.stageH,
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			...r
		}), await new Promise((e, n) => {
			u.onload = () => e(), u.onerror = () => n(/* @__PURE__ */ Error(`[add_frame] frame【${t}】の表示に失敗しました`)), u.srcdoc = l;
		}), u.contentDocument?.addEventListener("keydown", (e) => {
			document.dispatchEvent(new KeyboardEvent("keydown", {
				key: e.key,
				code: e.code,
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
			[`${d}.width`]: r.width ?? a.stageW,
			[`${d}.height`]: r.height ?? a.stageH,
			[`${d}.scale_x`]: r.scale_x ?? 1,
			[`${d}.scale_y`]: r.scale_y ?? 1,
			[`${d}.rotate`]: r.rotate ?? 0,
			[`${d}.visible`]: r.visible ?? !0
		};
	}
	frame(e, t, n, r) {
		let i = this.#o("frame", e);
		if (this.#c(i, t), n) {
			let { style: e } = i;
			n.mode === "float" ? e.zIndex = String(++this.#a) : n.mode === "index" ? e.zIndex = String(n.index ?? 0) : e.zIndex = String(-++this.#a);
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
	#c(e, t) {
		let n = e.style;
		t.alpha !== void 0 && (n.opacity = String(t.alpha)), t.x !== void 0 && (n.left = `${String(t.x)}px`), t.y !== void 0 && (n.top = `${String(t.y)}px`), t.width !== void 0 && (n.width = `${String(t.width)}px`), t.height !== void 0 && (n.height = `${String(t.height)}px`), (t.scale_x !== void 0 || t.scale_y !== void 0 || t.rotate !== void 0) && (n.transform = `scale(${String(t.scale_x ?? 1)}, ${String(t.scale_y ?? 1)}) rotate(${String(t.rotate ?? 0)}deg)`), t.b_color !== void 0 && (n.backgroundColor = t.b_color), t.visible !== void 0 && (n.display = t.visible ? "inline" : "none");
	}
	set(e, t, n) {
		this.#s("set_frame", e)[t] = n;
	}
	get(e, t, n) {
		let r = this.#s("let_frame", e);
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
	#l = Object.create(null);
	resvDom(e, t, n, r, i) {
		for (let { el: e, ev: n, fnc: r } of this.#l[t] ?? []) e.removeEventListener(n, r);
		if (delete this.#l[t], n) return [];
		let { id: a, sel: o, aEl: s } = this.elms(e);
		if (s.length === 0) {
			if (r) throw `[event] HTML内にセレクタ（${o}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return [];
		}
		let c = s[0].type || "", l = c === "checkbox" || c === "range" ? ["input"] : c === "text" || c === "textarea" ? ["input", "change"] : ["click", "keydown"], u = [];
		for (let e of s) for (let t of l) {
			let n = (e) => {
				this.getDisabled(a) || t === "keydown" && e.key !== "Enter" || i();
			};
			e.addEventListener(t, n), u.push({
				el: e,
				ev: t,
				fnc: n
			});
		}
		return this.#l[t] = u, s;
	}
	resolveDom(e, t) {
		let { sel: n, aEl: r } = this.elms(e);
		if (r.length === 0 && t) throw `[set_focus] HTML内にセレクタ（${n}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
		return r;
	}
	static #u = /\s(?:src|href)=(["'])(\S+?)\1/g;
	static #d(t, n) {
		let r = n.slice(0, n.lastIndexOf("/") + 1);
		return t.replaceAll(e.#u, (e, t, n) => n.startsWith("../") ? r + e.slice(3) : e.replace("./", "").replace(t, t + r));
	}
}, A = class {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#z(e);
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
	load(e) {
		this.#i(e).catch(() => {});
	}
	async #i(e) {
		let t = await this.#o(e);
		this.#r ? this.#r.switchScript(t) : (this.#r = new O(t), this.#a(this.#r)), this.go = () => this.#f(), this.$trgNext();
	}
	#a(e) {
		let { oCfg: t } = this.sys.cfg, n = {
			"const.sn.config.window.width": () => a.stageW,
			"const.sn.config.window.height": () => a.stageH,
			"const.sn.config.book.title": () => t.book.title,
			"const.sn.config.book.version": () => t.book.version,
			"const.sn.navigator.language": () => globalThis.navigator.language,
			"const.sn.screenResolutionX": () => globalThis.screen.width,
			"const.sn.screenResolutionY": () => globalThis.screen.height,
			"const.sn.isApp": () => !1,
			"const.sn.isDbg": () => !1,
			"const.sn.isDebugger": () => !1,
			"const.sn.isPackaged": () => !1,
			"const.sn.isFirstBoot": () => !1,
			"const.sn.needClick2Play": () => !1
		};
		for (let [t, r] of Object.entries(n)) e.defBuiltin(t, r);
		e.defBuiltin("const.sn.lay", () => {
			let { fore: e, back: t } = this.$fncs.getPages(), n = (e) => {
				if (!e) return;
				let t = e.cls === "grp" ? !!e.src : e.str.length > 0 || e.aBtn.length > 0;
				return {
					visible: e.visible !== !1,
					alpha: e.alpha ?? 1,
					left: e.left ?? 0,
					top: e.top ?? 0,
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
	async #o(e) {
		return this.#n[e] ??= new y(e, await this.#R(e), this.#c());
	}
	#s;
	#c() {
		if (this.#s) return this.#s;
		let e = this.#s = new m(this.sys.cfg);
		return e.setEscape(this.sys.cfg.oCfg.init.escape), e;
	}
	go() {}
	jumpToLabelAndGo(e, t, n = "") {
		this.#d(e, t, n).catch(() => {});
	}
	#l = new k((e, t) => this.sys.cfg.searchPath(e, t));
	attachFrameBox(e) {
		this.#l.attachBox(e);
	}
	#u = /* @__PURE__ */ new Set();
	fireFullScrKey(e) {
		return this.#u.has(e) ? (this.$fncs.toggleFullScr(), !0) : !1;
	}
	setFullScr(e) {
		this.#r?.setFullScr(e);
	}
	fireEvent(e) {
		let t = this.#r;
		if (!t) return !1;
		let n = t.beginEvent(e);
		return n ? (this.jumpToLabelAndGo(n.label, n.call, n.fn), !0) : !1;
	}
	async #d(e, t, n) {
		let r = this.#r;
		if (r) {
			this.#p = !1;
			try {
				if (n && (n !== r.fn || !e)) {
					let i = await this.#o(n);
					t ? r.callToScript(i, e) : r.switchScript(i, e);
				} else t ? r.callToLabel(e) : r.jumpToLabel(e);
			} catch (e) {
				this.myTrace(`[button]/[event] ジャンプ先エラー fn:${n || r.fn} ${String(e)}`, "ET");
				return;
			}
			this.#f();
		}
	}
	#f() {
		if (!this.#p) {
			if (this.#v) {
				this.#v.canskip && this.#b();
				return;
			}
			if (this.#S) {
				this.#S.canskip && this.#w();
				return;
			}
			if (this.#E) {
				this.#E.canskip && this.#k(this.#E.tw_nm);
				return;
			}
			this.#N().catch(() => {});
		}
	}
	#p = !1;
	#m;
	#h(e, t) {
		clearTimeout(this.#m), this.$fncs.setSkipping(e === "skip"), this.#m = setTimeout(() => {
			e === "skip" && this.$fncs.requestSkip(), this.#f();
		}, t);
	}
	cancelAuto() {
		clearTimeout(this.#m), this.#m = void 0, this.$fncs?.setSkipping(!1), this.#r?.cancelAutoSkip();
	}
	#g;
	#_ = !1;
	#v;
	#y(e) {
		clearTimeout(this.#g), this.#_ = e > 0, this.#g = this.#_ ? setTimeout(() => this.#b(), e) : void 0;
	}
	#b() {
		clearTimeout(this.#g), this.#g = void 0, this.#_ = !1, this.$fncs.finishTrans(), this.#v && (this.#v = void 0, this.#f());
	}
	#x(e) {
		if (this.#_) {
			this.#v = { canskip: e };
			return;
		}
		setTimeout(() => this.#f(), 0);
	}
	#S;
	#C(e, t) {
		this.#S = {
			canskip: t,
			timer: setTimeout(() => this.#w(), Math.max(0, e))
		};
	}
	#w() {
		this.#S && (clearTimeout(this.#S.timer), this.#S = void 0, this.#f());
	}
	#T = Object.create(null);
	#E;
	#D(e) {
		this.#T[e.tw_nm]?.tw.kill(), delete this.#T[e.tw_nm];
		let t = this.$fncs.getLaySty(e.nm, e.page), n = Object.keys(e.hTo), r = {}, i = {};
		for (let a of n) {
			let n = e.hTo[a], o = t[a] ?? S[a];
			r[a] = o, i[a] = n.rel ? o + n.v : n.v;
		}
		let a = () => {
			let t = {};
			for (let e of n) Object.assign(t, { [e]: r[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page,
				sty: t
			});
		}, o = () => {
			Object.assign(r, i), a();
		};
		if (e.msec <= 0 && e.delay <= 0) {
			o(), this.#O(e.tw_nm);
			return;
		}
		this.#T[e.tw_nm] = {
			end: o,
			tw: s.to(r, {
				...i,
				duration: e.msec / 1e3,
				delay: e.delay / 1e3,
				ease: e.ease,
				repeat: e.repeat,
				yoyo: e.yoyo,
				onUpdate: a,
				onComplete: () => {
					o(), this.#O(e.tw_nm);
				}
			})
		};
	}
	#O(e) {
		delete this.#T[e], this.#E?.tw_nm === e && (this.#E = void 0, setTimeout(() => this.#f(), 0));
	}
	#k(e) {
		let t = this.#T[e];
		t && (t.tw.kill(), t.end()), this.#O(e);
	}
	#A(e, t) {
		if (!this.#T[e]) {
			setTimeout(() => this.#f(), 0);
			return;
		}
		this.#E = {
			tw_nm: e,
			canskip: t
		};
	}
	#j = !1;
	#M = 0;
	async #N() {
		let e = this.#r;
		if (e) {
			if (this.#j) {
				++this.#M;
				return;
			}
			this.#j = !0;
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
					for (let e of t) this.#L(e);
					let n = t.at(-1);
					if (n?.t === "waitTrans") {
						this.#x(n.canskip);
						return;
					}
					if (n?.t === "wait") {
						this.#C(n.msec, n.canskip);
						return;
					}
					if (n?.t === "waitTsy") {
						this.#A(n.tw_nm, n.canskip);
						return;
					}
					if (n?.t === "addFrame" || n?.t === "letFrame") {
						this.#P(n).catch(() => {});
						return;
					}
					if (n?.t !== "loadScript") {
						e.atEnd && this.myTrace(`スクリプト終端です fn:${e.fn}`, "I");
						return;
					}
					try {
						e.switchScript(await this.#o(n.fn), n.label, n.idx);
					} catch (e) {
						this.myTrace(`[jump系] スクリプト切替エラー fn:${n.fn} ${String(e)}`, "ET");
						return;
					}
				}
			} finally {
				this.#j = !1, this.#M > 0 && (--this.#M, this.#f());
			}
		}
	}
	async #P(e) {
		try {
			e.t === "addFrame" ? this.#F(await this.#l.add(e.id, e.src, e.sty)) : this.#F({ [`const.sn.frm.${e.id}.${e.var_name}`]: this.#l.get(e.id, e.var_name, e.fnc) });
		} catch (t) {
			this.myTrace(`[${e.t === "addFrame" ? "add_frame" : "let_frame"}] エラー id:${e.id} ${String(t)}`, "ET");
			return;
		}
		this.#f();
	}
	#F(e) {
		for (let [t, n] of Object.entries(e)) this.#r?.setValNochk(t, n);
	}
	#I(e, t) {
		if (!t) return "";
		try {
			return this.sys.cfg.searchPath(t, c.SP_GSM);
		} catch (n) {
			return this.myTrace(`[${e}] 画像が見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#L(e) {
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
					src: this.#I("lay", e.fn),
					aFace: e.aFace.map((e) => ({
						...e,
						src: this.#I("add_face", e.fn)
					}))
				});
				break;
			case "chgBAlpha":
				this.$fncs.chgBAlpha({
					nm: e.nm,
					page: e.page,
					b_alpha: e.b_alpha
				});
				break;
			case "trans":
				this.$fncs.startTrans({
					aLayNm: e.aLayNm,
					time: e.time
				}), this.#y(e.time);
				break;
			case "waitTrans": break;
			case "chgStr":
				this.$fncs.chgStr({
					nm: e.nm,
					page: e.page,
					str: e.str
				});
				break;
			case "addBtn":
				this.$fncs.addBtn({
					layerNm: e.layerNm,
					page: e.page,
					nm: e.nm,
					text: e.text,
					label: e.label,
					...e.call === void 0 ? {} : { call: e.call },
					...e.fn === void 0 ? {} : { fn: e.fn },
					...e.sty === void 0 ? {} : { sty: e.sty }
				});
				break;
			case "chgLay":
				this.$fncs.chgLay({
					nm: e.nm,
					page: e.page,
					sty: e.sty
				});
				break;
			case "clearLay":
				this.$fncs.clearLay({
					aLayNm: e.aLayNm,
					page: e.page
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
				this.#D(e);
				break;
			case "waitTsy": break;
			case "stopTsy":
				this.#k(e.tw_nm);
				break;
			case "pauseTsy":
				this.#T[e.tw_nm]?.tw.paused(e.paused);
				break;
			case "title":
				this.$fncs.addTitle(e.text);
				break;
			case "toggleFullScr":
				this.$fncs.toggleFullScr();
				break;
			case "fullScrKey":
				this.#u.add(e.key);
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
				this.#F(this.#l.frame(e.id, e.sty, e.order, e.disabled));
				break;
			case "setFrame":
				this.#l.set(e.id, e.var_name, e.text);
				break;
			case "resvDomEvent": {
				let t = this.#l.resvDom(e.rawKey, e.key, e.del, e.needErr, () => {
					this.cancelAuto(), this.fireEvent(e.key);
				});
				!e.del && t[0] && o.add(t[0]);
				break;
			}
			case "setFocus":
				switch (e.mode) {
					case "add":
						for (let t of this.#l.resolveDom(e.rawKey, e.needErr ?? !0)) o.add(t);
						break;
					case "del":
						for (let t of this.#l.resolveDom(e.rawKey, e.needErr ?? !0)) o.remove(t);
						break;
					case "null":
						o.blur();
						break;
					case "next":
						o.next();
						break;
					case "prev":
						o.prev();
						break;
				}
				break;
			case "addFrame":
			case "letFrame": break;
			case "clearPageLog":
				this.sys.caretaker.clear();
				break;
			case "trace":
				this.#z({ text: e.text });
				break;
			case "loadScript": break;
			case "stop":
				this.sys.caretaker.push(e.key), (e.kind === "l" || e.kind === "p") && this.$fncs.setWait({
					nm: e.nm,
					kind: e.kind
				}), this.#p = e.kind === "s", e.resume ? this.#h(e.resume.mode, e.resume.msec) : this.$fncs.setSkipping(!1);
				break;
		}
	}
	async #R(e) {
		try {
			let t = this.sys.cfg.searchPath(e, c.SCRIPT), n = await fetch(t);
			if (!n.ok) throw Error(n.statusText);
			return await n.text();
		} catch (t) {
			throw this.myTrace(`[load] スクリプト読込に失敗しました fn:${e} ${String(t)}`, "ET"), t;
		}
	}
	#z(e) {
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
				a.isDarkMode && (n = "color:#49F;");
				break;
			case "W":
			case "F": break;
			case "ET":
			case "E":
				if (this.#t.title({ text: e }), t === "ET") throw r;
				break;
			default: n = "";
		}
		console.info("%c " + r, n);
	};
};
//#endregion
export { A as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map