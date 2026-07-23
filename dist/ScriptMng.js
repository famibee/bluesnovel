import { t as e } from "./rolldown-runtime.js";
import { n as t, r as n } from "./ConfigBase.js";
//#region src/ts/VarStore.ts
var r = class e {
	#e = Object.create(null);
	#t = Object.create(null);
	defBuiltin(e, t) {
		this.#t[e] = t;
	}
	static REG_NAME = /^(?:(tmp|game|sys|mp):)?(.+)$/;
	static parseName(t) {
		let n = e.REG_NAME.exec(t.trim());
		if (!n) throw `変数名が不正です：${t}`;
		return {
			ns: n[1] ?? "tmp",
			key: n[2]
		};
	}
	get(t) {
		let { ns: n, key: r } = e.parseName(t);
		if (n === "tmp") {
			let e = this.#t[r];
			if (e) return e();
		}
		let i = `${n}.${r}`;
		return i in this.#e ? this.#e[i] : null;
	}
	set(t, n) {
		let { ns: r, key: i } = e.parseName(t);
		if (r === "tmp" && i in this.#t) throw `組み込み変数【${t}】へは代入できません`;
		this.#e[`${r}.${i}`] = n;
	}
	cloneMp() {
		let e = {};
		for (let t of Object.keys(this.#e)) t.startsWith("mp.") && (e[t.slice(3)] = this.#e[t]);
		return e;
	}
	setMp(e) {
		for (let e of Object.keys(this.#e)) e.startsWith("mp.") && delete this.#e[e];
		for (let t of Object.keys(e)) this.#e[`mp.${t}`] = e[t];
	}
	clearGame() {
		for (let e of Object.keys(this.#e)) e.startsWith("game.") && delete this.#e[e];
	}
	clearSys() {
		for (let e of Object.keys(this.#e)) e.startsWith("sys.") && delete this.#e[e];
	}
}, i = (/* @__PURE__ */ e(((e, t) => {
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
})))(), a = class {
	val;
	#e = null;
	constructor(e) {
		this.val = e;
		function t(e) {
			let t = [];
			for (let n of e) t.push((typeof n == "string" ? (0, i.string)(n) : (0, i.regex)(n)).trim(i.optWhitespace));
			return (0, i.alt)(...t);
		}
		function n(e) {
			return (0, i.alt)(...Object.keys(e).sort().map((t) => {
				let n = e[t];
				return (typeof n == "string" ? (0, i.string)(n) : (0, i.regex)(n)).trim(i.optWhitespace).result(t);
			}));
		}
		function r(e, t) {
			let n = (0, i.lazy)(() => (0, i.seq)(e, n).or(t));
			return n;
		}
		function a(e, t) {
			return (0, i.seqMap)(t, (0, i.seq)(e, t).many(), (e, t) => t.reduce((e, t) => [
				t[0],
				e,
				t[1]
			], e));
		}
		function o(e, t) {
			let n = (0, i.lazy)(() => t.chain((t) => (0, i.seq)(e, (0, i.of)(t), n).or((0, i.of)(t))));
			return n;
		}
		let s = (0, i.alt)((0, i.regex)(/-?(0|[1-9][0-9]*)\.[0-9]+/), (0, i.regex)(/-?(0|[1-9][0-9]*)/)).map(Number).map((e) => ["!num!", e]).desc("number"), c = (0, i.regex)(/true(?![A-Za-z0-9_])|false(?![A-Za-z0-9_])/).map((e) => ["!bool!", e === "true"]).desc("boolean"), l = (0, i.regex)(/null(?![A-Za-z0-9_])/).map(() => ["!null!", null]).desc("null"), u = (0, i.regex)(/"(?:\\["\\]|[^"])*"|'(?:\\['\\]|[^'])*'/).map((e) => ["!str!", e.slice(1, -1).replaceAll(/\\(["'\\])/g, "$1")]).desc("string"), d = (0, i.regex)(/(?:(?:tmp|game|sys|mp):)?[A-Za-z_][A-Za-z0-9_.]*/).map((e) => ["!var!", e]).desc("variable"), f = (0, i.lazy)(() => (0, i.string)("(").then(this.#e).skip((0, i.string)(")")).or(l).or(c).or(s).or(u).or(d)), p = [
			{
				type: r,
				ops: t([/!(?!=)/])
			},
			{
				type: r,
				ops: n({ UnaryNegate: /-(?!-)/ })
			},
			{
				type: o,
				ops: t(["**"])
			},
			{
				type: a,
				ops: t([
					"*",
					"/",
					"%"
				])
			},
			{
				type: a,
				ops: t(["+", "-"])
			},
			{
				type: a,
				ops: t([/<=|<|>=|>/])
			},
			{
				type: a,
				ops: t([/===|!==|==|!=/])
			},
			{
				type: a,
				ops: t(["&&"])
			},
			{
				type: a,
				ops: t(["||"])
			}
		];
		this.#e = p.reduce((e, t) => t.type(t.ops, e), f).trim(i.optWhitespace);
	}
	parse(e) {
		let t = this.#e.parse(e);
		if (!t.status) throw `(ExprEval)式が不正です：${e}`;
		return this.#t(t.value);
	}
	evalBool(e) {
		return this.#i(this.parse(e));
	}
	#t(e) {
		let t = e.shift();
		if (t instanceof Array) return this.#t(t);
		let n = this.#n[t];
		if (!n) throw `(ExprEval)未対応の演算子・値です：${String(t)}`;
		return n(e);
	}
	#n = {
		"!num!": (e) => e.shift(),
		"!str!": (e) => e.shift(),
		"!bool!": (e) => e.shift(),
		"!null!": () => null,
		"!var!": (e) => this.val.get(e.shift()),
		"!": (e) => !this.#i(this.#t(e.shift())),
		UnaryNegate: (e) => -this.#r(this.#t(e.shift())),
		"**": (e) => this.#r(this.#t(e.shift())) ** this.#r(this.#t(e.shift())),
		"*": (e) => this.#r(this.#t(e.shift())) * this.#r(this.#t(e.shift())),
		"/": (e) => this.#r(this.#t(e.shift())) / this.#r(this.#t(e.shift())),
		"%": (e) => this.#r(this.#t(e.shift())) % this.#r(this.#t(e.shift())),
		"+": (e) => {
			let t = this.#t(e.shift()), n = this.#t(e.shift());
			return typeof t == "string" || typeof n == "string" ? String(t) + String(n) : this.#r(t) + this.#r(n);
		},
		"-": (e) => this.#r(this.#t(e.shift())) - this.#r(this.#t(e.shift())),
		"<": (e) => this.#r(this.#t(e.shift())) < this.#r(this.#t(e.shift())),
		"<=": (e) => this.#r(this.#t(e.shift())) <= this.#r(this.#t(e.shift())),
		">": (e) => this.#r(this.#t(e.shift())) > this.#r(this.#t(e.shift())),
		">=": (e) => this.#r(this.#t(e.shift())) >= this.#r(this.#t(e.shift())),
		"==": (e) => {
			let t = this.#t(e.shift()), n = this.#t(e.shift());
			return t === null || n === null ? t === n : String(t) === String(n);
		},
		"!=": (e) => !this.#n["=="](e),
		"===": (e) => {
			let t = this.#t(e.shift()), n = this.#t(e.shift());
			return typeof t == typeof n && t === n;
		},
		"!==": (e) => !this.#n["==="](e),
		"&&": (e) => {
			let t = this.#i(this.#t(e.shift())), n = this.#i(this.#t(e.shift()));
			return t && n;
		},
		"||": (e) => {
			let t = this.#i(this.#t(e.shift())), n = this.#i(this.#t(e.shift()));
			return t || n;
		}
	};
	#r(e) {
		let t = Number(e);
		if (Number.isNaN(t)) throw `(ExprEval)数値ではありません：${String(e)}`;
		return t;
	}
	#i(e) {
		return !!e && e !== "false";
	}
}, o = class e {
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
	#s = new r();
	#c = new a(this.#s);
	#l = [];
	#u = [];
	#d = {};
	static RESERVED_TAGS = /* @__PURE__ */ new Set([
		"add_lay",
		"current",
		"add_face",
		"lay",
		"let",
		"if",
		"elsif",
		"else",
		"endif",
		"r",
		"er",
		"trace",
		"jump",
		"call",
		"return",
		"macro",
		"endmacro",
		"button",
		"l",
		"p",
		"s"
	]);
	constructor(t, n) {
		this.fn = t, this.#e = e.tokenize(n), this.#s.defBuiltin("const.sn.scriptFn", () => this.fn), this.#e.forEach((e, t) => {
			let n = e.trimStart();
			n.charCodeAt(0) === 42 && n.length > 1 && (this.#n[n.trim()] = t + 1);
		});
	}
	getVal(e) {
		return this.#s.get(e);
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
	callToLabel(e) {
		let t = this.#n[e];
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません（試作は同一ファイル内のみ対応）`;
		this.#u.push({
			returnIdx: --this.#t,
			lenIfStk: this.#l.length,
			hMp: this.#s.cloneMp()
		}), this.#l.push(-1), this.#t = t;
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
					if (this.#f(n, i, t) === "stop") return t;
					continue;
				}
				this.#_(t, r);
			}
		}
		return t;
	}
	#f(t, n, r) {
		let i = this.#e.length;
		switch (t) {
			case "add_lay": {
				let e = n.layer ?? n.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (n.class ?? "txt").toLowerCase() === "grp" ? "grp" : "txt";
				return this.#i[e] = "", r.push({
					t: "addLay",
					cls: t,
					nm: e
				}), "skip";
			}
			case "current": return this.#r = n.layer ?? n.nm ?? this.#r, "skip";
			case "add_face": {
				let e = n.name ?? "";
				if (!e) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#o[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
				return this.#o[e] = {
					fn: n.fn || e,
					dx: Number(n.dx || "0"),
					dy: Number(n.dy || "0"),
					blendmode: n.blendmode || "normal"
				}, "skip";
			}
			case "lay": {
				let e = n.fn || n.pic;
				if (e) {
					let t = [];
					if (n.face) for (let e of n.face.split(",")) {
						if (!e) throw "[lay] face属性に空要素が含まれています";
						let n = this.#o[e];
						if (!n) throw `[lay] face【${e}】は[add_face]で未定義です`;
						t.push(n);
					}
					r.push({
						t: "chgPic",
						nm: n.layer ?? "",
						fn: e,
						aFace: t
					});
				}
				if (n.b_alpha !== void 0) {
					let e = Number(n.b_alpha);
					if (Number.isNaN(e)) throw `[lay] b_alphaの値が不正です：${n.b_alpha}`;
					r.push({
						t: "chgBAlpha",
						nm: n.layer ?? "",
						b_alpha: e
					});
				}
				return "skip";
			}
			case "let": {
				let e = n.name ?? "";
				if (!e) throw "[let] nameは必須です（試作仕様）";
				let t = n.val ?? "";
				return this.#s.set(e, this.#c.parse(t)), "skip";
			}
			case "if": return this.#p(n), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#m(), "skip";
			case "r": return this.#_(r, "\n"), "skip";
			case "er": return this.#i[this.#r] = "", r.push({
				t: "chgStr",
				nm: this.#r,
				str: ""
			}), "skip";
			case "trace": return r.push({
				t: "trace",
				text: this.#g(n.text ?? "")
			}), "skip";
			case "jump": {
				let e = n.label ?? "", t = this.#n[e];
				if (t === void 0) throw `[jump] ラベル【${e}】が見つかりません（試作は同一ファイル内のみ対応）`;
				return this.#t = t, "skip";
			}
			case "call": {
				let e = n.label ?? "";
				if (!e) throw "[call] labelは必須です（試作仕様）";
				let t = this.#n[e];
				if (t === void 0) throw `[call] ラベル【${e}】が見つかりません（試作は同一ファイル内のみ対応）`;
				return this.#u.push({
					returnIdx: this.#t,
					lenIfStk: this.#l.length,
					hMp: this.#s.cloneMp()
				}), this.#l.push(-1), this.#t = t, "skip";
			}
			case "return": return this.#h(), "skip";
			case "macro": {
				let t = n.name ?? "";
				if (!t) throw "[macro] nameは必須です（試作仕様）";
				if (e.RESERVED_TAGS.has(t)) throw `[${t}]はタグ名のため、マクロ名として使用できません`;
				if (t in this.#d) throw `[macro] マクロ【${t}】は既に定義済みです`;
				this.#d[t] = this.#t;
				let r = !1;
				for (; this.#t < i; ++this.#t) {
					let t = this.#e[this.#t];
					if (t.trimStart().charCodeAt(0) !== 91) continue;
					let { name: n } = e.parseTag(t);
					if (n === "endmacro") {
						++this.#t, r = !0;
						break;
					}
				}
				if (!r) throw `[macro] マクロ【${t}】が[endmacro]で閉じられていません（試作仕様）`;
				return "skip";
			}
			case "endmacro": return this.#h(), "skip";
			case "button": {
				let e = n.layer || this.#r;
				if (!e) throw "[button] layerは必須です（試作仕様）";
				let t = n.label ?? "";
				if (!t) throw "[button] labelは必須です（試作仕様）";
				let i = n.nm ?? t, a = n.call === "true";
				return r.push({
					t: "addBtn",
					layerNm: e,
					nm: i,
					text: n.text ?? "",
					label: t,
					call: a
				}), "skip";
			}
			case "l":
			case "p":
			case "s": return t === "p" && (this.#a = !0), r.push({
				t: "stop",
				kind: t,
				key: `${this.fn}:${String(this.#t)}`,
				nm: this.#r
			}), "stop";
			default: {
				let e = this.#d[t];
				return e === void 0 ? "skip" : (this.#u.push({
					returnIdx: this.#t,
					lenIfStk: this.#l.length,
					hMp: this.#s.cloneMp()
				}), this.#l.push(-1), this.#s.setMp(n), this.#t = e, "skip");
			}
		}
	}
	#p(t) {
		let n = t.exp ?? "";
		if (!n) throw "[if] expは必須です（試作仕様）";
		let r = this.#c.evalBool(n) ? this.#t : -1, i = 0, a = this.#e.length;
		for (; this.#t < a; ++this.#t) {
			let t = this.#e[this.#t];
			if (t.trimStart().charCodeAt(0) !== 91) continue;
			let { name: n, args: a } = e.parseTag(t);
			switch (n) {
				case "if":
					++i;
					continue;
				case "elsif": {
					if (i > 0 || r > -1) continue;
					let e = a.exp ?? "";
					if (!e) throw "[elsif] expは必須です（試作仕様）";
					this.#c.evalBool(e) && (r = this.#t + 1);
					continue;
				}
				case "else":
					if (i > 0) continue;
					r === -1 && (r = this.#t + 1);
					continue;
				case "endif":
					if (i > 0) {
						--i;
						continue;
					}
					r === -1 ? ++this.#t : (this.#l.push(this.#t + 1), this.#t = r);
					return;
				default: continue;
			}
		}
		throw "[if] に対応する [endif] が見つかりません（試作仕様）";
	}
	#m() {
		let e = this.#l.pop();
		if (e === void 0 || e === -1) throw "[if] に対応していない [elsif]/[else]/[endif] です";
		this.#t = e;
	}
	#h() {
		let e = this.#u.pop();
		if (!e) throw "[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）";
		this.#l.length = e.lenIfStk, this.#s.setMp(e.hMp), this.#t = e.returnIdx;
	}
	#g(e) {
		if (!e.startsWith("&")) return e;
		let t = this.#c.parse(e.slice(1));
		return t === null ? "" : String(t);
	}
	#_(e, t) {
		let n = this.#r, r = (this.#i[n] ?? "") + t;
		this.#i[n] = r, e.push({
			t: "chgStr",
			nm: n,
			str: r
		});
	}
}, s = "[add_lay layer=base class=grp]\n[add_lay layer=mes class=txt]\n[current layer=mes]\n[lay layer=base pic=yun_1184]\nあいうえお、これはbluesnovelの試作画面です。[l]\nクリックかスペースキーで読み進められます。[p]\n[lay layer=base pic=yun_1317]\nページが変わり、背景が差し替わりました。[l]\nPageUp/PageDownキーで読み戻り・読み進めができます。[s]\n", c = class {
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
			let n = await this.#o(e);
			t = this.#n[e] = new o(e, n);
		}
		this.#r = t, this.go = () => this.#i(), this.$trgNext();
	}
	go() {}
	jumpToLabelAndGo(e, t) {
		let n = this.#r;
		if (n) {
			try {
				t ? n.callToLabel(e) : n.jumpToLabel(e);
			} catch (e) {
				this.myTrace(`[button] ジャンプ先エラー fn:${n.fn} ${String(e)}`, "ET");
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
					label: e.label,
					...e.call === void 0 ? {} : { call: e.call }
				});
				break;
			case "trace":
				this.#s({ text: e.text });
				break;
			case "stop":
				this.sys.caretaker.push(e.key), (e.kind === "l" || e.kind === "p") && this.$fncs.setWait({
					nm: e.nm,
					kind: e.kind
				});
				break;
		}
	}
	async #o(e) {
		try {
			let n = this.sys.cfg.searchPath(e, t.SCRIPT), r = await fetch(n);
			if (!r.ok) throw Error(r.statusText);
			return await r.text();
		} catch (t) {
			return this.myTrace(`[load] スクリプト読込に失敗、試作サンプルで代替します fn:${e} ${String(t)}`, "W"), s;
		}
	}
	#s(e) {
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
		let i = `{${t}} ` + e;
		switch (this.#e.innerHTML += `<span style='${r}'>${i}</span><br/>`, this.#e.hidden = !1, t) {
			case "D":
				n.isDarkMode && (r = "color:#49F;");
				break;
			case "W":
			case "F": break;
			case "ET":
			case "E":
				if (this.#t.title({ text: e }), t === "ET") throw i;
				break;
			default: r = "";
		}
		console.info("%c " + i, r);
	};
};
//#endregion
export { c as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map