import { t as e } from "./rolldown-runtime.js";
import { t } from "./SaveMng.js";
import { a as n, i as r, o as i, r as a, t as o } from "./CmnLib.js";
import { a as s, b as c, c as l, i as u, p as d, r as f, t as p } from "./store.js";
import { n as m, t as h } from "./gsap.js";
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
			for (let t = e.len - 1; t >= 0; --t) {
				let n = e.aToken[t];
				if (!this.#o.test(n)) continue;
				let [i, a] = x(n);
				this.#l.parse(a);
				let o = this.#l.hPrm.fn;
				if (!o) continue;
				let { val: s } = o;
				if (!s.endsWith("*")) continue;
				e.aToken.splice(t, 1, "	", "; " + n), e.aLNum.splice(t, 1, NaN, NaN);
				let c = i === "loadplugin" ? _.CSS : _.SN, l = this.cfg.matchPath("^" + s.slice(0, -1) + ".*", c);
				for (let i of l) {
					let a = n.replace(this.#s, "fn=" + decodeURIComponent(r(i[c])));
					e.aToken.splice(t, 0, a), e.aLNum.splice(t, 0, NaN);
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
		"const.sn.nativeWindow.w": o.stageW,
		"const.sn.nativeWindow.h": o.stageH,
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
var T = { save: "game" }, E = class e {
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
			ns: T[r] ?? r,
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
	static castTo(t, r) {
		switch (r) {
			case "": return t;
			case "num": return e.#c(t);
			case "int": return n(e.#c(t));
			case "uint": return i(e.#c(t));
			case "bool": return t != null && String(t) !== "false" && !!String(t);
			case "str": return t == null ? t : String(t);
			default: throw `cast【${String(r)}】は未定義です`;
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
}, D = (/* @__PURE__ */ e(((e, t) => {
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
			var ee = 2, te = 3, j = 8, ne = 5 * j, M = 4 * j, re = "  ";
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
					var f = u - u % j, p = u - f, m = F(f, ne, M + j, e.length), h = s(function(e) {
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
					var o, s = i === _, l = s ? "> " : re;
					return o = b(e) ? P((8 * (a.from + i)).toString(16), c, "0") : P((a.from + i + 1).toString(), c, " "), [].concat(t, [l + o + " | " + r], s ? [re + N(" ", c) + " | " + P("", n, " ") + N("^", d)] : []);
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
				if (t === 0) return K("zero alternates");
				for (var n = 0; n < t; n += 1) E(e[n]);
				return r(function(t, n) {
					for (var r, i = 0; i < e.length; i += 1) if ((r = C(e[i]._(t, n), r)).status) return r;
					return r;
				});
			}
			function V(e, t) {
				return H(e, t).or(G([]));
			}
			function H(e, t) {
				return E(e), E(t), z(e, t.then(e).many(), function(e, t) {
					return [e].concat(t);
				});
			}
			function U(e) {
				A(e);
				var t = "'" + e + "'";
				return r(function(n, r) {
					var i = r + e.length, a = n.slice(r, i);
					return a === e ? x(i, a) : S(r, t);
				});
			}
			function W(e, t) {
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
			function G(e) {
				return r(function(t, n) {
					return x(n, e);
				});
			}
			function K(e) {
				return r(function(t, n) {
					return S(n, e);
				});
			}
			function q(e) {
				if (v(e)) return r(function(t, n) {
					var r = e._(t, n);
					return r.index = n, r.value = "", r;
				});
				if (typeof e == "string") return q(U(e));
				if (e instanceof RegExp) return q(W(e));
				throw Error("not a string, regexp, or parser: " + e);
			}
			function J(e) {
				return E(e), r(function(t, n) {
					var r = e._(t, n), i = t.slice(n, r.index);
					return r.status ? S(n, "not \"" + i + "\"") : x(n, null);
				});
			}
			function Y(e) {
				return k(e), r(function(t, n) {
					var r = D(t, n);
					return n < t.length && e(r) ? x(n + 1, r) : S(n, "a character/byte matching " + e);
				});
			}
			function ae(e, t) {
				arguments.length < 2 && (t = e, e = void 0);
				var n = r(function(e, r) {
					return n._ = t()._, n._(e, r);
				});
				return e ? n.desc(e) : n;
			}
			function X() {
				return K("fantasy-land/empty");
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
					return e(n) ? G(n) : K(t);
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
				return V(this, e);
			}, i.sepBy1 = function(e) {
				return H(this, e);
			}, i.lookahead = function(e) {
				return this.skip(q(e));
			}, i.notFollowedBy = function(e) {
				return this.skip(J(e));
			}, i.desc = function(e) {
				y(e) || (e = [e]);
				var t = this;
				return r(function(n, r) {
					var i = t._(n, r);
					return i.status || (i.expected = e), i;
				});
			}, i.fallback = function(e) {
				return this.or(G(e));
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
			}, i.concat = i.or, i.empty = X, i.of = G, i["fantasy-land/ap"] = i.ap, i["fantasy-land/chain"] = i.chain, i["fantasy-land/concat"] = i.concat, i["fantasy-land/empty"] = i.empty, i["fantasy-land/of"] = i.of, i["fantasy-land/map"] = i.map;
			var Z = r(function(e, t) {
				return x(t, T(e, t));
			}), oe = r(function(e, t) {
				return t >= e.length ? S(t, "any character/byte") : x(t + 1, D(e, t));
			}), se = r(function(e, t) {
				return x(e.length, e.slice(t));
			}), Q = r(function(e, t) {
				return t < e.length ? S(t, "EOF") : x(t, null);
			}), ce = W(/[0-9]/).desc("a digit"), le = W(/[0-9]*/).desc("optional digits"), ue = W(/[a-z]/i).desc("a letter"), de = W(/[a-z]*/i).desc("optional letters"), fe = W(/\s*/).desc("optional whitespace"), pe = W(/\s+/).desc("whitespace"), $ = U("\r"), me = U("\n"), he = U("\r\n"), ge = B(he, me, $).desc("newline"), _e = B(ge, Q);
			r.all = se, r.alt = B, r.any = oe, r.cr = $, r.createLanguage = function(e) {
				var t = {};
				for (var n in e) ({}).hasOwnProperty.call(e, n) && function(n) {
					t[n] = ae(function() {
						return e[n](t);
					});
				}(n);
				return t;
			}, r.crlf = he, r.custom = function(e) {
				return r(e(x, S));
			}, r.digit = ce, r.digits = le, r.empty = X, r.end = _e, r.eof = Q, r.fail = K, r.formatError = I, r.index = Z, r.isParser = v, r.lazy = ae, r.letter = ue, r.letters = de, r.lf = me, r.lookahead = q, r.makeFailure = S, r.makeSuccess = x, r.newline = ge, r.noneOf = function(e) {
				return Y(function(t) {
					return e.indexOf(t) < 0;
				}).desc("none of '" + e + "'");
			}, r.notFollowedBy = J, r.of = G, r.oneOf = function(e) {
				for (var t = e.split(""), n = 0; n < t.length; n++) t[n] = "'" + t[n] + "'";
				return Y(function(t) {
					return e.indexOf(t) >= 0;
				}).desc(t);
			}, r.optWhitespace = fe, r.Parser = r, r.range = function(e, t) {
				return Y(function(n) {
					return e <= n && n <= t;
				}).desc(e + "-" + t);
			}, r.regex = W, r.regexp = W, r.sepBy = V, r.sepBy1 = H, r.seq = R, r.seqMap = z, r.seqObj = function() {
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
			}, r.string = U, r.succeed = G, r.takeWhile = function(e) {
				return k(e), r(function(t, n) {
					for (var r = n; r < t.length && e(D(t, r));) r++;
					return x(r, t.slice(n, r));
				});
			}, r.test = Y, r.whitespace = pe, r["fantasy-land/empty"] = X, r["fantasy-land/of"] = G, r.Binary = {
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
})))(), O = class {
	val;
	#e = null;
	constructor(e, t = "\\") {
		this.val = e;
		function r(e) {
			let t = [];
			for (let n of e) t.push((typeof n == "string" ? (0, D.string)(n) : (0, D.regex)(n)).trim(D.optWhitespace));
			return (0, D.alt)(...t);
		}
		function i(e) {
			let t = Object.keys(e).sort().map((t) => {
				let n = e[t];
				return (typeof n == "string" ? (0, D.string)(n) : (0, D.regex)(n)).trim(D.optWhitespace).result(t);
			});
			return (0, D.alt)(...t);
		}
		function a(e, t) {
			let n = (0, D.lazy)(() => (0, D.seq)(e, n).or(t));
			return n;
		}
		function o(e, t) {
			return (0, D.seqMap)(t, e.many(), (e, t) => t.reduce((e, t) => [t, e], e));
		}
		function s(e, t) {
			let n = (0, D.lazy)(() => t.chain((t) => (0, D.seq)(e, (0, D.of)(t), n).or((0, D.of)(t))));
			return n;
		}
		function c(e, t) {
			return (0, D.seqMap)(t, (0, D.seq)(e, t).many(), (e, t) => t.reduce((e, t) => [
				t[0],
				e,
				t[1]
			], e));
		}
		let l = (0, D.alt)((0, D.alt)((0, D.regex)(/-?(0|[1-9][0-9]*)\.[0-9]+/), (0, D.regex)(/0x[0-9a-fA-F]+/)).map(Number), (0, D.alt)((0, D.regex)(/-?(0|[1-9][0-9]*)/)).map((e) => n(e))).map((e) => ["!num!", e]).desc("number"), u = (0, D.string)("null").map(() => ["!str!", null]), d = (0, D.regex)(/(true|false)/).map((e) => ["!bool!", e === "true"]).desc("boolean"), f = (0, D.regex)(RegExp(`(?:"(?:\\${t}["'#\\n]|[^"])*"|'(?:\\${t}["'#\\n]|[^'])*'|\\#(?:\\${t}["'#\\n]|[^#])*\\#)`)).map((e) => ["!str!", e.slice(1, -1).replaceAll(t, "")]).desc("string"), p = /\[[^\]]+\]/g, m = (0, D.regex)(/-?(?:(?:tmp|sys|game|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*(?:@str)?/).map((e) => {
			let t = e.replaceAll(p, (e) => "." + String(this.parse(e.slice(1, -1)))), n = this.val.get(t);
			return n == null ? ["!str!", n] : typeof n == "boolean" ? ["!bool!", n] : Object.prototype.toString.call(n) === "[object String]" ? ["!str!", String(n)] : ["!num!", Number(n)];
		}).desc("string"), h = (0, D.lazy)(() => (0, D.string)("(").then(this.#e).skip((0, D.string)(")")).or(l).or(u).or(d).or(f).or(m)), g = [
			{
				type: a,
				ops: r([/[A-Za-z_][A-Za-z0-9_]*(?=\()/])
			},
			{
				type: o,
				ops: i({ PostfixInc: "++" })
			},
			{
				type: o,
				ops: i({ PostfixDec: "--" })
			},
			{
				type: a,
				ops: r([/!(?!=)|~/])
			},
			{
				type: a,
				ops: i({ PrefixInc: "++" })
			},
			{
				type: a,
				ops: i({ PrefixDec: "--" })
			},
			{
				type: a,
				ops: i({ UnaryNegate: /-(?!-)/ })
			},
			{
				type: s,
				ops: r(["**"])
			},
			{
				type: c,
				ops: r([
					"*",
					"/",
					"¥",
					"%"
				])
			},
			{
				type: c,
				ops: r(["+", "-"])
			},
			{
				type: c,
				ops: r([/>>>|<<|>>/])
			},
			{
				type: c,
				ops: r([/<=|<|>=|>/])
			},
			{
				type: c,
				ops: r([/===|!==|==|!=/])
			},
			{
				type: c,
				ops: r([/&(?!&)/])
			},
			{
				type: c,
				ops: r(["^"])
			},
			{
				type: c,
				ops: r([/\|(?!\|)/])
			},
			{
				type: c,
				ops: r(["&&"])
			},
			{
				type: c,
				ops: r(["||"])
			},
			{
				type: s,
				ops: r([":"])
			},
			{
				type: s,
				ops: r(["?"])
			}
		];
		this.#e = g.reduce((e, t) => t.type(t.ops, e), h).trim(D.optWhitespace);
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
		int: (e) => n(this.#r(e.shift())),
		parseInt: (e) => n(this.#n.Number(e)),
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
}, ee = class e {
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
}, te = [
	"alpha",
	"left",
	"top",
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
], ne = {
	alpha: 1,
	left: 0,
	top: 0,
	rotation: 0,
	scale_x: 1,
	scale_y: 1,
	pivot_x: 0,
	pivot_y: 0
};
function M(e, t, n = te) {
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
var re = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
function N(e, t, n = te) {
	let r = [];
	for (let { groups: i } of t.matchAll(re)) {
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
		r.push(M(e, d, n));
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
}, F = {
	In: "in",
	Out: "out",
	InOut: "inOut"
};
function ie(e) {
	if (!e) return "none";
	let [t = "", n = ""] = e.split(".");
	if (t === "Linear") return "none";
	let r = P[t], i = F[n];
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
	A.setEscape(e);
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
	}, d = new A();
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
var X = class {
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
}, Z = class e {
	static #e = new y();
	static parseTag(t) {
		let [n, r] = x(t);
		e.#e.parse(r);
		let i = {};
		for (let [t, n] of Object.entries(e.#e.hPrm)) i[t] = n.val;
		return {
			name: n,
			args: i
		};
	}
	#t(t) {
		let [n, r] = x(t), i = e.#e;
		i.parse(r);
		let a = i.hPrm, o = a.cond?.val;
		if (o !== void 0) {
			if (!o || o.startsWith("&")) throw "属性condは「&」が不要です";
			let e = this.#D.parse(o), t = String(e);
			if (!e || t === "null" || t === "undefined" || t === "false") return;
		}
		let s = this.#M.at(-1), c = Object.create(null);
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
			if (r = this.#D.getValAmpersand(r), r !== "undefined") {
				c[e] = r;
				continue;
			}
			n !== void 0 && (r = this.#D.getValAmpersand(n), r !== "undefined" && (c[e] = r));
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
		let a = Number(this.#E.get(n === "left" ? "tmp:const.sn.config.window.width" : "tmp:const.sn.config.window.height"));
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
	#b = !1;
	get clearOnResume() {
		return this.#b;
	}
	set clearOnResume(e) {
		this.#b = e;
	}
	#x = Object.create(null);
	#S = Object.create(null);
	#C(e, t) {
		this.#S[e] = t, this.#E.set("save:const.sn.loopPlaying", JSON.stringify(this.#S));
	}
	#w(e) {
		e in this.#S && (delete this.#S[e], this.#E.set(`save:const.sn.sound.${e}.fn`, "")), this.#E.set("save:const.sn.loopPlaying", JSON.stringify(this.#S));
	}
	#T = 1;
	resetVolMulTalking() {
		this.#T = 1;
	}
	#E = new E();
	#D = new O(this.#E);
	#O = new X(() => {
		let e = Number(this.#E.get("tmp:const.sn.config.log.max_len"));
		return Number.isFinite(e) && e > 0 ? e : 64;
	});
	get #k() {
		return this.#E.get("game:sn.doRecLog") === !0;
	}
	get chWait() {
		let e = this.#E.get("tmp:const.sn.isKidoku") === !0;
		if (this.#E.get(e ? "sys:sn.tagCh.doWait_Kidoku" : "sys:sn.tagCh.doWait") === !1) return 0;
		let t = Number(this.#E.get(e ? "sys:sn.tagCh.msecWait_Kidoku" : "sys:sn.tagCh.msecWait"));
		return Number.isFinite(t) && t >= 0 ? t : 10;
	}
	#A = {
		in: /* @__PURE__ */ new Set(["default"]),
		out: /* @__PURE__ */ new Set(["default"])
	};
	#j = [];
	#M = [];
	#N = Object.create(null);
	#P = Object.create(null);
	#F = Object.create(null);
	#I = !1;
	#L = Object.create(null);
	static REG_NG4MAC_NM = /["'#;\\\]　]+/;
	static RESERVED_TAGS = /* @__PURE__ */ new Set(/* @__PURE__ */ "add_lay.current.add_face.lay.clear_lay.trans.wt.finish_trans.set_cancel_skip.let.let_ml.endlet_ml.let_abs.let_char_at.let_index_of.let_length.let_replace.let_round.let_search.let_substr.tsy.tsy_frame.wait_tsy.stop_tsy.pause_tsy.resume_tsy.quake.stop_quake.wq.title.toggle_full_screen.dump_lay.dump_val.dump_stack.pop_stack.clear_text.rec_ch.rec_r.reset_rec.ch_in_style.ch_out_style.autowc.navigate_to.loadplugin.snapshot.close.update_check.window.record_place.save.load.reload_script.copybookmark.erasebookmark.export.import.add_frame.frame.set_frame.let_frame.set_focus.add_filter.clear_filter.enable_filter.if.elsif.else.endif.r.er.trace.log.jump.call.return.macro.endmacro.char2macro.bracket2macro.button.event.clear_event.enable_event.clearvar.clearsysvar.page.wait.waitclick.l.p.s.fadebgm.fadeoutbgm.fadeoutse.fadese.playbgm.playse.stop_allse.stopbgm.stopfadese.stopse.volume.wb.wf.wl.ws.xchgbuf.wv".split("."));
	#R() {
		let t = Object.create(null);
		for (let n of e.RESERVED_TAGS) t[n] = !0;
		for (let e in this.#L) t[e] = !0;
		return t;
	}
	constructor(e, t = "") {
		this.#g = e instanceof k ? e : new k(e, t), this.#E.defBuiltin("const.sn.scriptFn", () => this.fn), this.#E.defBuiltin("const.sn.isKidoku", () => this.#I), this.#E.defBuiltin("const.sn.displayState", () => this.#z), this.#E.defBuiltin("const.Date.getDateStr", () => a()), this.#E.defBuiltin("const.Date.getTime", () => (/* @__PURE__ */ new Date()).getTime()), this.#E.defBuiltin("const.sn.last_page_plain_text", () => U(this.#y[this.#v] ?? "")), this.#E.defBuiltin("const.sn.last_page_text", () => this.#y[this.#v] ?? ""), this.#E.defBuiltin("const.sn.log.json", () => this.#O.json()), this.#E.defBuiltin("const.sn.key.alternate", () => this.#B.Alt === !0), this.#E.defBuiltin("const.sn.key.command", () => this.#B.Meta === !0), this.#E.defBuiltin("const.sn.key.control", () => this.#B.Control === !0), this.#E.defBuiltin("const.sn.key.end", () => this.#B.End === !0), this.#E.defBuiltin("const.sn.key.escape", () => this.#B.Escape === !0), this.#E.defBuiltin("const.sn.key.back", () => !1), this.#E.defBuiltin("const.sn.Math.PI", () => Math.PI), this.#E.defBuiltin("const.sn.aIfStk.length", () => this.#j.length), this.#E.defBuiltin("const.sn.vctCallStk.length", () => this.#M.length);
	}
	#z = !1;
	setFullScr(e) {
		this.#z = e;
	}
	#B = Object.create(null);
	setKeyDown(e, t) {
		this.#B[e] = t;
	}
	clearKeyDown() {
		this.#B = Object.create(null);
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
		return this.#E.get(e);
	}
	setValNochk(e, t) {
		this.#E.set(e, t);
	}
	defSetTrigger(e, t) {
		this.#E.defSetTrigger(e, t);
	}
	defSetTriggerSoundVol(e) {
		this.#E.defSetTriggerSoundVol(e);
	}
	defBuiltin(e, t) {
		this.#E.defBuiltin(e, t);
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
	jumpToLabel(e) {
		let t = this.#g.label2idx(e);
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#_ = t;
	}
	callToLabel(e) {
		let t = this.#g.label2idx(e);
		if (t === void 0) throw `[button] ラベル【${e}】が見つかりません`;
		this.#J(--this.#_), this.#_ = t;
	}
	callToScript(e, t = "") {
		this.#J(--this.#_), this.switchScript(e, t);
	}
	nowScrIdx() {
		let e = this.#M[0];
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
		this.#E.set("save:const.sn.scriptFn", e), this.#E.set("save:const.sn.scriptIdx", t);
	}
	nowMarkPart() {
		return this.#E.set("save:const.sn.sLog", this.#O.json()), {
			hSave: this.#E.cloneNs("game"),
			aIfStk: this.#j.slice(this.#M.length),
			hTxt: { ...this.#y }
		};
	}
	restoreMarkPart(e) {
		this.#E.setNs("game", e.hSave), this.#y = { ...e.hTxt }, this.#v = String(this.#E.get("save:const.sn.mesLayer") ?? this.#v), this.#O.playback(String(this.#E.get("save:const.sn.sLog") ?? "[]")), this.#E.setMp({}), this.#j.length = 0, this.#j.push(...e.aIfStk), this.#M.length = 0, this.clearEvent();
		for (let e of Object.keys(this.#S)) delete this.#S[e];
		try {
			let e = JSON.parse(String(this.#E.get("save:const.sn.loopPlaying", "{}")));
			Object.assign(this.#S, e);
		} catch {}
	}
	cloneSys() {
		return this.#E.cloneNs("sys");
	}
	setSys(e) {
		this.#E.setNs("sys", e);
	}
	get isKidoku() {
		return this.#I;
	}
	#V() {
		let e = this.#F[this.fn] ??= new ee();
		if (this.#M.length > 0) {
			e.record(this.#_);
			return;
		}
		this.#I = e.search(this.#_), !this.#I && e.record(this.#_);
	}
	#H() {
		this.#F[this.fn]?.erase(this.#_), this.#I = !1;
	}
	getKidoku() {
		let e = {};
		for (let [t, n] of Object.entries(this.#F)) e[t] = n.val();
		return e;
	}
	setKidoku(e) {
		for (let e in this.#F) delete this.#F[e];
		this.#I = !1;
		for (let [t, n] of Object.entries(e)) this.#F[t] = ee.from(n);
	}
	clearKidoku() {
		for (let e of Object.values(this.#F)) e.clear();
		this.#I = !1;
	}
	get autoEnabled() {
		return this.#U("sn.auto.enabled");
	}
	get skipEnabled() {
		return this.#U("sn.skip.enabled");
	}
	get skipAll() {
		return this.#U("sn.skip.all");
	}
	#U(e) {
		return this.#E.get(`tmp:${e}`) === !0;
	}
	get tagLEnabled() {
		return this.#E.get("tmp:sn.tagL.enabled") !== !1;
	}
	cancelAutoSkip() {
		this.#E.set("tmp:sn.skip.enabled", !1), this.#E.set("tmp:sn.skip.all", !1), this.#E.set("tmp:sn.auto.enabled", !1), this.tagLEnabled || this.#E.set("tmp:sn.tagL.enabled", !0);
	}
	get isNextKidoku() {
		let e = this.fn, t = this.#_, n = this.#g.len, r = this.#M.at(-1);
		return r && (e = r.fn, t = r.returnIdx, n = r.scr.len), t >= n ? !1 : this.#F[e]?.search(t) ?? !1;
	}
	#W(e) {
		if (e === "s" || e === "waitclick") {
			this.cancelAutoSkip();
			return;
		}
		if (this.autoEnabled) return {
			mode: "auto",
			msec: this.#K(e === "p")
		};
		if (this.skipEnabled) {
			if (!this.skipAll && !this.isNextKidoku) {
				this.cancelAutoSkip();
				return;
			}
			return e === "p" && this.#G() !== "s" ? void 0 : {
				mode: "skip",
				msec: 0
			};
		}
	}
	#G() {
		let e = this.#E.get("sys:sn.skip.mode");
		return e == null ? "s" : String(e);
	}
	#K(e) {
		let t = e ? "sn.auto.msecPageWait" : "sn.auto.msecLineWait", n = Number(this.#E.get(`sys:${t}${this.isKidoku ? "_Kidoku" : ""}`));
		return Number.isFinite(n) && n > 0 ? n : e ? 3500 : 500;
	}
	getEvent(e) {
		let t = e.toLowerCase();
		return this.#N[t] ?? this.#P[t];
	}
	clearEvent(e = !1) {
		if (!e) {
			this.#N = Object.create(null);
			return;
		}
		for (let e in this.#P) delete this.#P[e];
	}
	#q() {
		let e = this.#N;
		return this.#N = Object.create(null), e;
	}
	beginEvent(e) {
		let t = this.getEvent(e);
		if (t) return this.#E.set("tmp:sn.eventArg", t.arg), this.#E.set("tmp:sn.eventLabel", t.label), t.call || this.clearEvent(), t;
	}
	#J(e, t = !0, n = {}) {
		this.#M.push({
			fn: this.fn,
			returnIdx: e,
			lenIfStk: this.#j.length,
			hMp: this.#E.cloneMp(),
			hArgs: n,
			scr: this.#g,
			...t ? { hEvt: this.#q() } : {}
		}), this.#j.push(-1);
	}
	step() {
		let e = [];
		for (this.#b && (this.#b = !1, this.#ie(), this.#y[this.#v] = "", e.push({
			t: "chgStr",
			nm: this.#v,
			page: "fore",
			str: ""
		})); this.#_ < this.#g.len;) {
			this.#V();
			let t = this.#g.aToken[this.#_++], n = t.charCodeAt(0);
			if (n === 9 || n === 10) continue;
			if (n === 91) {
				let n = this.#t(t);
				if (!n) continue;
				let { name: r, args: i } = n;
				if (this.#X(r, i, e) === "stop") return e;
				continue;
			}
			let r = t, i = this.#g.grm.ce;
			if (i && t.length > 1 && t.startsWith(i)) r = t.slice(1);
			else if (n === 38) {
				if (!t.endsWith("&")) {
					this.#Y(t);
					continue;
				}
				if (t.charAt(1) === "&") throw "「&表示&」書式では「&」指定が不要です";
				let e = this.#D.parse(t.slice(1, -1));
				r = e == null ? "" : String(e);
			} else if (n === 59) continue;
			else if (n === 42 && t.length > 1) continue;
			this.#re(e, r);
		}
		return e;
	}
	#Y(e) {
		let { name: t, text: n, cast: r } = S(e.slice(1));
		this.#E.set(this.#D.getValAmpersand(t.trim()), this.#D.parse(n), r ?? "");
	}
	#X(t, r, a) {
		let o = this.#g.len;
		switch (t) {
			case "add_lay": {
				let e = r.layer ?? r.nm ?? "";
				if (!e) throw "[add_lay] layerは必須です（試作仕様）";
				let t = (r.class ?? "txt").toLowerCase() === "grp" ? "grp" : "txt";
				return this.#y[e] = "", t === "txt" && this.#E.set(`save:const.sn.layer.${e}.enabled`, !0), a.push({
					t: "addLay",
					cls: t,
					nm: e
				}), "skip";
			}
			case "current": {
				let e = r.layer ?? r.nm ?? this.#v;
				return e !== this.#v && this.#ie(), this.#v = e, this.#E.set("save:const.sn.mesLayer", this.#v), "skip";
			}
			case "add_face": {
				let e = r.name ?? "";
				if (!e) throw "[add_face] nameは必須です（試作仕様）";
				if (this.#x[e]) throw `[add_face] 同一のname（${e}）に対して複数の画像を割り当てられません`;
				return this.#x[e] = {
					fn: r.fn || e,
					dx: Number(r.dx || "0"),
					dy: Number(r.dy || "0"),
					blendmode: c(r.blendmode || "normal")
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
					a.push({
						t: "chgPic",
						nm: r.layer ?? "",
						page: t,
						fn: n,
						aFace: e
					});
				}
				if (r.back_clear !== void 0) r.back_clear === "true" && a.push({
					t: "chgBackClear",
					nm: r.layer ?? "",
					page: t
				});
				else {
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
						r.b_alpha_isfixed !== void 0 && (e.isFixed = r.b_alpha_isfixed !== "false"), a.push(e);
					}
					r.b_pic !== void 0 && a.push({
						t: "chgBPic",
						nm: r.layer ?? "",
						page: t,
						fn: r.b_pic
					});
				}
				let i = {};
				if (r.visible !== void 0 && (i.visible = r.visible !== "false"), r.alpha !== void 0 && (i.alpha = e.#n("lay", "alpha", r.alpha)), r.left === void 0 ? r.center === void 0 ? r.right === void 0 ? r.s_right !== void 0 && (i.s_right = this.#r("lay", "left", r.s_right)) : (i.left = this.#r("lay", "left", r.right), i.align_x = "right") : (i.left = this.#r("lay", "left", r.center), i.align_x = "center") : i.left = this.#r("lay", "left", r.left), r.top === void 0 ? r.middle === void 0 ? r.bottom === void 0 ? r.s_bottom !== void 0 && (i.s_bottom = this.#r("lay", "top", r.s_bottom)) : (i.top = this.#r("lay", "top", r.bottom), i.align_y = "bottom") : (i.top = this.#r("lay", "top", r.middle), i.align_y = "middle") : i.top = this.#r("lay", "top", r.top), r.rotation !== void 0 && (i.rotation = e.#n("lay", "rotation", r.rotation)), r.scale_x !== void 0 && (i.scale_x = e.#n("lay", "scale_x", r.scale_x)), r.scale_y !== void 0 && (i.scale_y = e.#n("lay", "scale_y", r.scale_y)), r.pivot_x !== void 0 && (i.pivot_x = e.#n("lay", "pivot_x", r.pivot_x)), r.pivot_y !== void 0 && (i.pivot_y = e.#n("lay", "pivot_y", r.pivot_y)), r.blendmode !== void 0 && (i.blendmode = c(r.blendmode)), r.b_color !== void 0 && r.back_clear !== "true" && (i.b_color = e.#n("lay", "b_color", r.b_color)), r.style !== void 0 && (i.style = r.style), r.ffs !== void 0 && (i.ffs = r.ffs), r.noffs !== void 0 && (i.noffs = r.noffs), r.bura !== void 0 && (i.bura = r.bura !== "false"), A.setting(r), r.r_align !== void 0) {
					if (!W.includes(r.r_align)) throw `[lay] r_alignの値が不正です：${r.r_align}`;
					i.r_align = r.r_align;
				}
				r.in_style !== void 0 && (i.in_style = r.in_style), r.out_style !== void 0 && (i.out_style = r.out_style), Object.keys(i).length > 0 && a.push({
					t: "chgLay",
					nm: r.layer ?? "",
					page: t,
					sty: i
				});
				let o = r.layer ?? "";
				if ((r.float ?? "false") !== "false") a.push({
					t: "moveLay",
					nm: o,
					mode: "float"
				});
				else if (r.index) {
					let t = e.#n("lay", "index", r.index);
					t && a.push({
						t: "moveLay",
						nm: o,
						mode: "index",
						index: t
					});
				} else r.dive && a.push({
					t: "moveLay",
					nm: o,
					mode: "dive",
					dive: r.dive
				});
				return r.filter !== void 0 && a.push({
					t: "addFilter",
					aLayNm: [o],
					page: t,
					flt: d(r),
					replace: !0
				}), "skip";
			}
			case "add_filter": return a.push({
				t: "addFilter",
				aLayNm: e.#c(r.layer),
				page: e.#h("add_filter", r, "fore"),
				flt: d(r),
				replace: !1
			}), "skip";
			case "clear_filter": return a.push({
				t: "clearFilter",
				aLayNm: e.#c(r.layer),
				page: e.#h("clear_filter", r, "fore")
			}), "skip";
			case "enable_filter": return a.push({
				t: "enableFilter",
				aLayNm: e.#c(r.layer),
				page: e.#h("enable_filter", r, "fore"),
				index: e.#i("enable_filter", "index", r.index, 0),
				enabled: (r.enabled ?? "true") !== "false"
			}), "skip";
			case "clear_lay": {
				let t = r.page ?? "back";
				if (t !== "fore" && t !== "back" && t !== "both") throw `属性 page【${t}】が不正です`;
				let n = e.#c(r.layer);
				if (r.layer !== void 0 && n === null) throw "[clear_lay] layer属性が空です";
				if (t !== "back") if ((!n || n.includes(this.#v)) && this.#ie(), n) for (let e of n) this.#y[e] = "";
				else for (let e of Object.keys(this.#y)) this.#y[e] = "";
				return a.push({
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
				return a.push({
					t: "trans",
					aLayNm: n,
					time: this.skipEnabled ? 0 : i,
					...r.rule === void 0 ? {} : { rule: r.rule },
					...r.vague === void 0 ? {} : { vague: e.#n("trans", "vague", r.vague) }
				}), "skip";
			}
			case "wt": return a.push({
				t: "waitTrans",
				canskip: (r.canskip ?? "true") !== "false"
			}), "stop";
			case "finish_trans": return a.push({ t: "finishTrans" }), "skip";
			case "set_cancel_skip": return "skip";
			case "quake": {
				let t = this.skipEnabled ? 0 : e.#n("quake", "time", r.time ?? "");
				return t <= 0 || a.push({
					t: "quake",
					msec: t,
					hmax: i(e.#i("quake", "hmax", r.hmax, 10)),
					vmax: i(e.#i("quake", "vmax", r.vmax, 10))
				}), "skip";
			}
			case "stop_quake": return a.push({ t: "stopQuake" }), "skip";
			case "wq": return a.push({
				t: "waitQuake",
				canskip: (r.canskip ?? "true") !== "false"
			}), "stop";
			case "tsy": {
				let { layer: t } = r;
				if (!t) throw "[tsy] layerは必須です";
				let n = this.skipEnabled, i = n ? 0 : e.#n("tsy", "time", r.time ?? ""), o = n ? 0 : e.#i("tsy", "delay", r.delay, 0), s = e.#i("tsy", "repeat", r.repeat, 1), c = e.argPage(r, "fore");
				return r.filter !== void 0 && a.push({
					t: "addFilter",
					aLayNm: [t],
					page: c,
					flt: d(r),
					replace: !0
				}), a.push({
					t: "tsy",
					tw_nm: I("tsy", r),
					nm: t,
					page: c,
					msec: i,
					delay: o,
					ease: ie(r.ease),
					repeat: s > 0 ? s - 1 : -1,
					yoyo: (r.yoyo ?? "false") !== "false",
					hTo: M("tsy", r),
					backlay: (r.backlay ?? "false") !== "false",
					...e.#m("tsy", r)
				}), "skip";
			}
			case "tsy_frame": {
				let { id: t } = r;
				if (!t) throw "[tsy_frame] idは必須です";
				this.#Z("tsy_frame", t);
				let n = this.skipEnabled, i = e.#i("tsy_frame", "repeat", r.repeat, 1);
				return a.push({
					t: "tsyFrame",
					tw_nm: I("tsy_frame", r),
					id: t,
					msec: n ? 0 : e.#n("tsy_frame", "time", r.time ?? ""),
					delay: n ? 0 : e.#i("tsy_frame", "delay", r.delay, 0),
					ease: ie(r.ease),
					repeat: i > 0 ? i - 1 : -1,
					yoyo: (r.yoyo ?? "false") !== "false",
					hTo: M("tsy_frame", r, j),
					...e.#m("tsy_frame", r, j)
				}), "skip";
			}
			case "wait_tsy": return a.push({
				t: "waitTsy",
				tw_nm: I("wait_tsy", r),
				canskip: (r.canskip ?? "true") !== "false"
			}), "stop";
			case "stop_tsy": return a.push({
				t: "stopTsy",
				tw_nm: I("stop_tsy", r)
			}), "skip";
			case "pause_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: I("pause_tsy", r),
				paused: !0
			}), "skip";
			case "resume_tsy": return a.push({
				t: "pauseTsy",
				tw_nm: I("resume_tsy", r),
				paused: !1
			}), "skip";
			case "let":
				if (r.text === void 0) throw `[let] textは必須です（name:${r.name ?? ""}）`;
				return this.#Q("let", r, r.text), "skip";
			case "let_abs": {
				let t = e.#i("let_abs", "text", r.text, 0);
				return this.#Q("let_abs", r, String(t < 0 ? -t : t)), "skip";
			}
			case "let_round": {
				let t = e.#i("let_round", "text", r.text, 0);
				return this.#Q("let_round", r, String(Math.round(t))), "skip";
			}
			case "let_length": return this.#Q("let_length", r, String((r.text ?? "").length)), "skip";
			case "let_char_at": {
				let t = e.#i("let_char_at", "pos", r.pos, 0);
				return this.#Q("let_char_at", r, (r.text ?? "").charAt(t)), "skip";
			}
			case "let_index_of": {
				let { val: t } = r;
				if (!t) throw "[let_index_of] valは必須です";
				let n = e.#i("let_index_of", "start", r.start, 0);
				return this.#Q("let_index_of", r, String((r.text ?? "").indexOf(t, n))), "skip";
			}
			case "let_substr": {
				let t = e.#i("let_substr", "pos", r.pos, 0), i = r.text ?? "";
				return this.#Q("let_substr", r, r.len === "all" ? i.slice(t) : i.slice(t, t + n(e.#i("let_substr", "len", r.len, 1)))), "skip";
			}
			case "let_replace": return this.#Q("let_replace", r, (r.text ?? "").replace(e.#s("let_replace", r), String(r.val))), "skip";
			case "let_search": return this.#Q("let_search", r, String((r.text ?? "").search(e.#s("let_search", r)))), "skip";
			case "let_ml": {
				let e = r.name ?? "";
				if (!e) throw "[let_ml] nameは必須です";
				let t = "";
				for (; this.#_ < o && (t = this.#g.aToken[this.#_], t === ""); ++this.#_);
				if (this.#g.grm.testTagEndLetml(t)) return this.#E.set(e, "", "str"), ++this.#_, "skip";
				if (!this.#g.grm.testTagEndLetml(this.#g.aToken[this.#_ + 1] ?? "")) throw `[let_ml] 変数【${e}】の終端・[endlet_ml]がありません`;
				return this.#E.set(e, t, "str"), this.#_ += 2, "skip";
			}
			case "endlet_ml": return "skip";
			case "if": return this.#$(r), "skip";
			case "elsif":
			case "else":
			case "endif": return this.#ee(), "skip";
			case "r": return this.#re(a, "\n"), "skip";
			case "er": return (r.rec_page_break ?? "true") !== "false" && this.#ie(), this.#y[this.#v] = "", a.push({
				t: "chgStr",
				nm: this.#v,
				page: "both",
				str: ""
			}), a.push({
				t: "clearTxtLay",
				nm: this.#v,
				page: "both",
				clearFilter: r.clear_filter === "true"
			}), "skip";
			case "span": return this.#re(a, e.#ne("span", r)), "skip";
			case "link":
				if (!r.url && !r.label && !r.fn) throw "[link] fn・label・urlのいずれかは必須です";
				return r.clickse !== void 0 && (r.clicksebuf = r.clicksebuf || "SYS"), r.enterse !== void 0 && (r.entersebuf = r.entersebuf || "SYS"), r.leavese !== void 0 && (r.leavesebuf = r.leavesebuf || "SYS"), this.#re(a, e.#ne("link", r)), "skip";
			case "endlink": return this.#re(a, e.#ne("endlink", {})), "skip";
			case "graph":
				if (!r.pic) throw "[graph] picは必須です";
				return this.#re(a, e.#ne("grp", r)), "skip";
			case "tcy":
				if (!r.t) throw "[tcy] tは必須です";
				return this.#re(a, e.#ne("tcy", r)), "skip";
			case "ruby2":
			case "ch": {
				if (t === "ruby2") {
					if (!r.t) throw "[ruby2] tは必須です";
					if (!r.r) throw "[ruby2] rは必須です";
					r.text = `｜${encodeURIComponent(r.t)}《${encodeURIComponent(r.r)}》`, delete r.t, delete r.r;
				}
				let { text: n } = r;
				if (!n) throw `[${t}] textは必須です`;
				return this.#re(a, e.#ne("add", {
					...r,
					text: void 0
				}) + n.replaceAll("[r]", "\n") + e.#ne("add_close", {}), r.record !== "false"), "skip";
			}
			case "autowc": {
				let t = r.enabled === void 0 ? this.#E.get("game:const.sn.autowc.enabled") === !0 : r.enabled !== "false";
				this.#E.set("save:const.sn.autowc.enabled", t);
				let { text: n } = r;
				if ("text" in r != "time" in r) throw "[autowc] textとtimeは同時指定必須です";
				if (this.#E.set("save:const.sn.autowc.text", n ?? ""), !n) return this.#E.set("save:const.sn.autowc.time", ""), a.push({
					t: "autowc",
					enabled: t,
					hWait: {}
				}), "skip";
				let o = Array.from(n), s = String(r.time ?? "").split(",");
				if (s.length !== o.length) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
				let c = {};
				return o.forEach((t, n) => {
					c[t] = i(e.#n("autowc", "time", s[n] ?? ""));
				}), this.#E.set("save:const.sn.autowc.time", r.time ?? ""), a.push({
					t: "autowc",
					enabled: t,
					hWait: c
				}), "skip";
			}
			case "ch_in_style":
			case "ch_out_style": {
				let e = t === "ch_in_style" ? "in" : "out", { name: n, sty: i } = l(t, r, e === "in");
				if (this.#A[e].has(n)) throw `[${t}] name【${n}】はすでにあります`;
				return this.#A[e].add(n), a.push({
					t: "defChStyle",
					kind: e,
					nm: n,
					sty: i
				}), "skip";
			}
			case "rec_ch": {
				let { text: t, ...n } = r;
				return t ? (Object.keys(n).length && this.#O.setAttr(n), this.#O.add(e.#ne("add", {
					...r,
					text: void 0
				}) + t.replaceAll("[r]", "\n") + e.#ne("add_close", {})), "skip") : "skip";
			}
			case "rec_r": return this.#O.add("\n"), "skip";
			case "reset_rec": return this.#O.reset(r.text ?? ""), "skip";
			case "trace": return a.push({
				t: "trace",
				text: r.text ?? ""
			}), "skip";
			case "log": return a.push({
				t: "log",
				text: r.text ?? "",
				fn: this.fn,
				lineNum: this.lineNum
			}), "skip";
			case "jump": {
				r.count === "false" && this.#H();
				let e = r.label ?? "", t = r.fn ?? "";
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
				r.count !== "true" && this.#H();
				let e = r.label ?? "", t = r.fn ?? "";
				if (!e && !t) throw "[call] fnまたはlabelは必須です";
				if (t && t !== this.fn) return this.#J(this.#_, !0, r), a.push({
					t: "loadScript",
					fn: t,
					label: e,
					idx: 0
				}), "stop";
				let n = this.#g.label2idx(e);
				if (n === void 0) throw `[call] ラベル【${e}】がスクリプト【${this.fn}】に見つかりません`;
				return this.#J(this.#_, !0, r), this.#_ = n, "skip";
			}
			case "return": return this.#te(a, r);
			case "macro": {
				let t = r.name ?? "";
				if (!t) throw "[macro] nameは必須です（試作仕様）";
				if (e.RESERVED_TAGS.has(t)) throw `[${t}]はタグ名のため、マクロ名として使用できません`;
				if (e.REG_NG4MAC_NM.test(t)) throw `[${t}]はマクロ名として異常です`;
				if (t in this.#L) throw `[macro] マクロ【${t}】は既に定義済みです`;
				this.#L[t] = {
					fn: this.fn,
					idx: this.#_
				};
				let n = !1, i = 0, a = !1;
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
			case "bracket2macro": return this.#g.defC2M(t, r, this.#R(), this.#_), "skip";
			case "endmacro": return this.#te(a);
			case "button": {
				let t = r.layer || this.#v;
				if (!t) throw "[button] layerは必須です（試作仕様）";
				let n = r.label ?? "", i = r.fn ?? "";
				if (!n && !i) throw "[button] fnまたはlabelは必須です";
				let { pic: o } = r;
				if (!o && !r.text) throw "[button] textまたはpic属性は必須です";
				let s = r.nm, l = r.call === "true", u = e.argPage(r, "back"), d = {};
				r.left === void 0 ? r.center === void 0 ? r.right === void 0 ? r.s_right !== void 0 && (d.s_right = this.#r("button", "left", r.s_right)) : (d.left = this.#r("button", "left", r.right), d.align_x = "right") : (d.left = this.#r("button", "left", r.center), d.align_x = "center") : d.left = this.#r("button", "left", r.left), r.top === void 0 ? r.middle === void 0 ? r.bottom === void 0 ? r.s_bottom !== void 0 && (d.s_bottom = this.#r("button", "top", r.s_bottom)) : (d.top = this.#r("button", "top", r.bottom), d.align_y = "bottom") : (d.top = this.#r("button", "top", r.middle), d.align_y = "middle") : d.top = this.#r("button", "top", r.top);
				for (let t of e.#f) {
					let n = r[t];
					n !== void 0 && Object.assign(d, { [t]: e.#n("button", t, n) });
				}
				return o || (d.width ??= 100, d.height ??= 30), r.enabled !== void 0 && (d.enabled = r.enabled !== "false"), r.blendmode !== void 0 && (d.blendmode = c(r.blendmode)), r.style !== void 0 && (d.style = e.#u(r.style)), r.style_hover !== void 0 && (d.style_hover = e.#u(r.style_hover)), r.style_clicked !== void 0 && (d.style_clicked = e.#u(r.style_clicked)), r.hint !== void 0 && (d.hint = r.hint), r.hint_style !== void 0 && (d.hint_style = r.hint_style), r.hint_opt !== void 0 && (d.hint_opt = r.hint_opt), o !== void 0 && (d.pic = o), r.b_pic !== void 0 && (d.b_pic = r.b_pic), r.clickse !== void 0 && (d.clickse = r.clickse, d.clicksebuf = r.clicksebuf || "SYS"), r.enterse !== void 0 && (d.enterse = r.enterse, d.entersebuf = r.entersebuf || "SYS"), r.leavese !== void 0 && (d.leavese = r.leavese, d.leavesebuf = r.leavesebuf || "SYS"), a.push({
					t: "addBtn",
					layerNm: t,
					page: u,
					text: o ? "" : r.text ?? "",
					label: n,
					call: l,
					...s === void 0 ? {} : { nm: s },
					...i ? { fn: i } : {},
					...Object.keys(d).length > 0 ? { sty: d } : {}
				}), "skip";
			}
			case "page": {
				if (!("clear" in r || "to" in r || "style" in r)) throw "[page] clear,style,to いずれかは必須です";
				if (r.key !== void 0 && a.push({
					t: "pageKeys",
					aKey: r.key ? r.key.split(",") : []
				}), r.style !== void 0) return a.push({
					t: "pageStyle",
					style: r.style
				}), "skip";
				if (r.clear === "true") return a.push({ t: "clearPageLog" }), "skip";
				if (r.to === void 0) return "skip";
				let e = r.to;
				if (!f.includes(e)) throw `[page] 属性to「${r.to}」は異常です`;
				return a.push({
					t: "pageTo",
					to: e
				}), "stop";
			}
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
			case "navigate_to": {
				let { url: e } = r;
				if (!e) throw "[navigate_to] urlは必須です";
				return a.push({
					t: "navigateTo",
					url: e
				}), "skip";
			}
			case "close": return a.push({ t: "close" }), "skip";
			case "update_check": {
				let { url: e } = r;
				if (!e) throw "[update_check] urlは必須です";
				if (!e.endsWith("/")) throw "[update_check] urlの末尾は/にして下さい";
				return a.push({
					t: "updateCheck",
					url: e
				}), "skip";
			}
			case "window": {
				let t = (e, t) => {
					let n = this.#E.get(`sys:const.sn.nativeWindow.${e}`);
					return n == null ? t : Number(n);
				}, n = (e) => Number(this.#E.get(`tmp:const.sn.config.window.${e}`) ?? 0), i = (t, n, i) => r[t] === void 0 ? r[n] === void 0 ? i : e.#n("window", n, r[n]) : e.#n("window", t, r[t]), o = {
					centering: r.centering === "true",
					x: i("x", "x", t("x", 0)),
					y: i("y", "y", t("y", 0)),
					w: i("width", "w", t("w", n("width"))),
					h: i("height", "h", t("h", n("height")))
				};
				return this.#E.set("sys:const.sn.nativeWindow.x", o.x), this.#E.set("sys:const.sn.nativeWindow.y", o.y), this.#E.set("sys:const.sn.nativeWindow.w", o.w), this.#E.set("sys:const.sn.nativeWindow.h", o.h), a.push({
					t: "window",
					...o
				}), "skip";
			}
			case "loadplugin": {
				let { fn: e } = r;
				if (!e) throw "[loadplugin] fnは必須です";
				if (!e.endsWith(".css")) throw "[loadplugin] サポートされない拡張子です";
				let t = (r.join ?? "true") !== "false";
				return a.push({
					t: "loadPlugin",
					fn: e,
					join: t
				}), t ? "stop" : "skip";
			}
			case "snapshot": return a.push({
				t: "snapshot",
				fn: r.fn ?? "",
				aLayNm: e.#c(r.layer),
				page: e.argPage(r, "fore"),
				width: e.#i("snapshot", "width", r.width, 0),
				height: e.#i("snapshot", "height", r.height, 0),
				smoothing: r.smoothing === "true",
				...r.b_color === void 0 ? {} : { b_color: e.#n("snapshot", "b_color", r.b_color) }
			}), "stop";
			case "clear_text": {
				let t = r.layer || this.#v, n = e.argPage(r, "fore");
				return t === this.#v && n === "fore" && this.#ie(), this.#y[t] = "", a.push({
					t: "chgStr",
					nm: t,
					page: n,
					str: ""
				}), "skip";
			}
			case "dump_val": return a.push({
				t: "trace",
				text: `[dump_val] ${JSON.stringify(this.#E.dump())}`
			}), "skip";
			case "dump_stack": return a.push({
				t: "trace",
				text: `[dump_stack] ${JSON.stringify({
					now: {
						fn: this.fn,
						idx: this.#_
					},
					aCallStk: this.#M.map((e) => ({
						fn: e.fn,
						returnIdx: e.returnIdx
					})),
					aIfStk: [...this.#j]
				})}`
			}), "skip";
			case "dump_lay": return a.push({
				t: "dumpLay",
				aLayNm: e.#c(r.layer)
			}), "skip";
			case "pop_stack":
				if ((r.clear ?? "false") !== "false") this.#M.length = 0;
				else if (!this.#M.pop()) throw "[pop_stack] スタックが空です";
				return this.#j.length = 0, this.#j.push(-1), this.#E.setMp({}), "skip";
			case "clearvar": return this.#E.clearGame(), "skip";
			case "clearsysvar": return this.#E.clearSys(), this.clearKidoku(), "skip";
			case "record_place": return this.recordPlace(), a.push({ t: "recordPlace" }), "skip";
			case "save": {
				if (r.place === void 0) throw "[save] placeは必須です";
				let t = e.#n("save", "place", r.place), n = {
					text: "",
					...r
				};
				delete n.place, a.push({
					t: "save",
					place: t,
					json: n
				});
				let i = Number(this.#E.get("sys:const.sn.save.place"));
				return t === i && this.#E.set("sys:const.sn.save.place", i + 1), "skip";
			}
			case "load":
				if (r.index === void 0 && "fn" in r != "label" in r) throw "[load] fnとlabelはセットで指定して下さい";
				return a.push({
					t: "load",
					place: e.#i("load", "place", r.place, 0),
					fn: r.fn ?? "",
					label: r.label ?? "",
					...r.index === void 0 ? {} : { index: e.#n("load", "index", r.index) },
					...r.do_rec === void 0 ? {} : { doRec: r.do_rec !== "false" }
				}), "stop";
			case "reload_script": return a.push({ t: "reloadScript" }), "stop";
			case "copybookmark": {
				let t = e.#n("copybookmark", "from", r.from ?? ""), n = e.#n("copybookmark", "to", r.to ?? "");
				return t === n || a.push({
					t: "copyBookmark",
					from: t,
					to: n
				}), "skip";
			}
			case "erasebookmark": return a.push({
				t: "eraseBookmark",
				place: e.#n("erasebookmark", "place", r.place ?? "")
			}), "skip";
			case "export": return a.push({ t: "exportData" }), "skip";
			case "import": return a.push({ t: "importData" }), "skip";
			case "event": {
				let e = r.key ?? "", t = e.toLowerCase();
				if (!t) throw "[event] keyは必須です";
				let n = t.startsWith("dom="), i = r.global === "true" ? this.#P : this.#N;
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
				let o = r.label ?? "", s = r.fn ?? this.fn, { url: c } = r;
				if (!c && !o && !r.fn) throw "[event] fn,label いずれかは必須です";
				return i[t] = {
					fn: s,
					label: o,
					call: r.call === "true",
					arg: r.arg ?? "",
					...c ? { url: c } : {}
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
				if (this.#E.get(`const.sn.frm.${t}`)) throw `[add_frame] frame【${t}】はすでにあります`;
				return a.push({
					t: "addFrame",
					id: t,
					src: n,
					sty: e.#p("add_frame", r)
				}), "stop";
			}
			case "frame": {
				let { id: t } = r;
				if (!t) throw "[frame] idは必須です";
				this.#Z("frame", t);
				let n = (r.float ?? "false") === "false" ? r.index === void 0 ? r.dive ? { mode: "dive" } : void 0 : {
					mode: "index",
					index: e.#n("frame", "index", r.index)
				} : { mode: "float" };
				return a.push({
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
				return this.#Z("set_frame", e), this.#E.set(`const.sn.frm.${e}.${t}`, n), a.push({
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
				return this.#Z("let_frame", e), a.push({
					t: "letFrame",
					id: e,
					var_name: t,
					fnc: (r.function ?? "false") !== "false"
				}), "stop";
			}
			case "clear_event": return this.clearEvent(r.global === "true"), "skip";
			case "enable_event": {
				let e = r.layer || this.#v, t = (r.enabled ?? "true") !== "false";
				return this.#E.set(`save:const.sn.layer.${e}.enabled`, t), a.push({
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
				if (t === "l" && !this.tagLEnabled) return "skip";
				t === "p" && (this.#b = !0);
				let n = this.#W(t), i = {};
				for (let n of [
					"x",
					"y",
					"width",
					"height"
				]) {
					let a = r[n];
					a !== void 0 && (i[n] = e.#n(t, n, a));
				}
				return a.push({
					t: "stop",
					kind: t,
					key: `${this.fn}:${String(this.#_)}`,
					nm: this.#v,
					...n ? { resume: n } : {},
					...Object.keys(i).length > 0 ? { mark: i } : {}
				}), "stop";
			}
			case "playse":
			case "playbgm": {
				let n = t === "playbgm", i = !n && (r.canskip ?? "true") !== "false";
				if (this.skipEnabled && i) return "skip";
				let o = n ? "BGM" : r.buf || "SE", s = r.fn ?? "";
				if (!s) throw `[${t}] fnは必須です`;
				let c = n ? !0 : (r.loop ?? "false") !== "false", l = (r.join ?? "true") !== "false", u = e.#i(t, "speed", r.speed, 1), d = e.#i(t, "pan", r.pan, 0), f = e.#i(t, "start_ms", r.start_ms, 0);
				if (f < 0) throw `[${t}] start_ms:${String(f)} が負の値です`;
				let p = e.#i(t, "ret_ms", r.ret_ms, 0);
				if (p < 0) throw `[${t}] ret_ms:${String(p)} が負の値です`;
				let m = e.#i(t, "end_ms", r.end_ms, e.#o);
				if (m > 0) {
					if (m <= f) throw `[${t}] start_ms:${String(f)} >= end_ms:${String(m)} は異常値です`;
					if (m <= p) throw `[${t}] ret_ms:${String(p)} >= end_ms:${String(m)} は異常値です`;
				}
				let h = `const.sn.sound.${o}.`, g = e.#a(e.#i(t, "volume", r.volume, 1));
				this.#E.set(`save:${h}volume`, g), this.#E.set(`save:${h}fn`, s), this.#E.set(`save:${h}start_ms`, f), this.#E.set(`save:${h}end_ms`, m), this.#E.set(`save:${h}ret_ms`, p);
				let _ = g * Number(this.#E.get(`sys:${h}volume`, 1, !0));
				if (o === "BGM") _ *= this.#T;
				else if (o === "VOICE") {
					let e = Number(this.#E.get("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
					if (this.#T = e, e !== 1) {
						let t = "const.sn.sound.BGM.", n = Number(this.#E.get(`save:${t}volume`, 1, !0)) * Number(this.#E.get(`sys:${t}volume`, 1, !0)) * e;
						a.push({
							t: "duckBgm",
							volume: n
						});
					}
				}
				return c ? this.#C(o, s) : this.#w(o), a.push({
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
				let e = t === "stopbgm" ? "BGM" : r.buf || "SE";
				return this.#w(e), a.push({
					t: "stopSnd",
					buf: e
				}), "skip";
			}
			case "stop_allse":
				for (let e of Object.keys(this.#S)) this.#w(e);
				return a.push({ t: "stopAllSnd" }), "skip";
			case "xchgbuf": {
				let t = r.buf || "SE", n = r.buf2 || "SE";
				if (t === n) return "skip";
				let i = {
					volume: 1,
					fn: "",
					start_ms: 0,
					end_ms: e.#o,
					ret_ms: 0
				}, o = `const.sn.sound.${t}.`, s = `const.sn.sound.${n}.`;
				for (let e of Object.keys(i)) {
					let t = this.#E.get(`save:${o}${e}`, i[e]), n = this.#E.get(`save:${s}${e}`, i[e]);
					this.#E.set(`save:${o}${e}`, n), this.#E.set(`save:${s}${e}`, t);
				}
				let c = this.#S[t], l = this.#S[n];
				return l === void 0 ? delete this.#S[t] : this.#S[t] = l, c === void 0 ? delete this.#S[n] : this.#S[n] = c, this.#E.set("save:const.sn.loopPlaying", JSON.stringify(this.#S)), a.push({
					t: "xchgBufSnd",
					buf: t,
					buf2: n
				}), "skip";
			}
			case "volume": {
				let t = r.buf || "SE", n = `const.sn.sound.${t}.`, i = e.#a(e.#i("volume", "volume", r.volume, 1));
				this.#E.set(`sys:${n}volume`, i);
				let o = Number(this.#E.get(`save:${n}volume`, 1, !0));
				return a.push({
					t: "volumeSnd",
					buf: t,
					volume: o * i
				}), "skip";
			}
			case "fadese":
			case "fadebgm":
			case "fadeoutse":
			case "fadeoutbgm": {
				let n = t === "fadebgm" || t === "fadeoutbgm", i = t === "fadeoutse" || t === "fadeoutbgm", o = n ? "BGM" : r.buf || "SE", s = `const.sn.sound.${o}.`, c = i ? 0 : e.#a(e.#n(t, "volume", r.volume ?? ""));
				this.#E.set(`save:${s}volume`, c);
				let l = Number(this.#E.get(`sys:${s}volume`, 1, !0)), u = (r.stop ?? (c === 0 ? "true" : "false")) !== "false";
				u && this.#w(o);
				let d = this.skipEnabled, f = d ? 0 : e.#n(t, "time", r.time ?? ""), p = d ? 0 : e.#i(t, "delay", r.delay, 0);
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
				let e = t === "wl" ? "BGM" : r.buf || "SE", n = (r.canskip ?? "false") !== "false", i = (r.stop ?? "true") !== "false";
				return a.push({
					t: "waitSnd",
					buf: e,
					canskip: n,
					stop: i
				}), "stop";
			}
			case "wf":
			case "wb": {
				let e = t === "wb" ? "BGM" : r.buf || "SE", n = (r.canskip ?? "false") !== "false";
				return a.push({
					t: "waitFade",
					buf: e,
					canskip: n
				}), "stop";
			}
			case "wv": {
				let e = r.fn ?? "";
				if (!e) throw "[wv] fnは必須です";
				let t = (r.stop ?? "true") !== "false", n = (r.canskip ?? "true") !== "false";
				return a.push({
					t: "waitVideo",
					fn: e,
					stop: t,
					canskip: n
				}), "stop";
			}
			default: {
				let e = this.#L[t];
				return e === void 0 ? "skip" : (this.#J(this.#_, !1, r), this.#E.setMp({
					...r,
					"const.sn.me_call_scriptFn": this.fn,
					"const.sn.macro": JSON.stringify({ name: t })
				}), e.fn === this.fn ? (this.#_ = e.idx, "skip") : (a.push({
					t: "loadScript",
					fn: e.fn,
					label: "",
					idx: e.idx
				}), "stop"));
			}
		}
	}
	#Z(e, t) {
		if (!this.#E.get(`const.sn.frm.${t}`)) throw `[${e}] frame【${t}】が読み込まれていません`;
	}
	#Q(e, t, n) {
		let r = t.name ?? "";
		if (!r) throw `[${e}] nameは必須です`;
		this.#E.set(r, n, t.cast ?? "");
	}
	#$(t) {
		let n = t.exp ?? "";
		if (!n) throw "[if] expは必須です（試作仕様）";
		let r = this.#D.evalBool(n) ? this.#_ : -1, i = 0, a = !1, o = this.#g.len;
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
					this.#D.evalBool(e) && (r = this.#_ + 1);
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
					r === -1 ? ++this.#_ : (this.#j.push(this.#_ + 1), this.#_ = r);
					return;
				default: continue;
			}
		}
		throw "[if] に対応する [endif] が見つかりません（試作仕様）";
	}
	#ee() {
		let e = this.#j.pop();
		if (e === void 0 || e === -1) throw "[if] に対応していない [elsif]/[else]/[endif] です";
		this.#_ = e;
	}
	#te(e, t = {}) {
		let n = this.#M.pop();
		if (!n) throw "[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）";
		this.#j.length = n.lenIfStk, this.#E.setMp(n.hMp), n.hEvt && (this.#N = n.hEvt);
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
	static #ne(e, t) {
		return `｜&emsp;《${e}｜${encodeURIComponent(JSON.stringify(t))}》`;
	}
	#re(e, t, n = !0) {
		let r = this.#v, i = (this.#y[r] ?? "") + t;
		this.#y[r] = i, n && this.#k && this.#O.add(t), e.push({
			t: "chgStr",
			nm: r,
			page: "fore",
			str: i
		});
	}
	#ie() {
		this.#O.pagebreak();
	}
}, oe = class e {
	searchPath;
	fetch;
	constructor(e, t) {
		this.searchPath = e, this.fetch = t;
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
		let i = this.#e ?? await this.#n, a = this.searchPath(n, _.HTML), s = await this.fetch(a);
		if (!s.ok) throw `[add_frame] HTMLの読込に失敗しました src:${n} ${s.statusText}`;
		let c = e.#m(await s.text(), a), l = document.createElement("iframe");
		l.id = t, l.style.cssText = "position: absolute; border: 0; overflow: hidden; pointer-events: auto;", i.appendChild(l), this.#r[t] = l, this.#i[t] = !1, this.#l(l, this.#a[t] = {
			visible: !0,
			alpha: 1,
			x: 0,
			y: 0,
			width: o.stageW,
			height: o.stageH,
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			...r
		}), await new Promise((e, n) => {
			l.onload = () => e(), l.onerror = () => n(/* @__PURE__ */ Error(`[add_frame] frame【${t}】の表示に失敗しました`)), l.srcdoc = c;
		});
		let u = e.#d(a);
		l.contentWindow.sn_repRes?.((e) => {
			e.src = this.#f(u, e.dataset.src ?? "");
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
			[`${d}.width`]: r.width ?? o.stageW,
			[`${d}.height`]: r.height ?? o.stageH,
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
	#f(e, t) {
		if (!t) return "";
		if (/^(?:[a-z][a-z\d+\-.]*:|\/)/i.test(t)) return t;
		try {
			return this.searchPath(t, _.SP_GSM);
		} catch {
			return e + t.replace(/^\.\//, "");
		}
	}
	static #p = /\s(?:src|href)=(["'])(\S+?)\1/g;
	static #m(t, n) {
		let r = e.#d(n);
		return t.replaceAll(e.#p, (e, t, n) => n.startsWith("../") ? r + e.slice(3) : e.replace("./", "").replace(t, t + r));
	}
}, se = /* @__PURE__ */ new Set([
	"IFRAME",
	"SCRIPT",
	"CANVAS",
	"VIDEO"
]);
function Q(e) {
	return /\.jpe?g$/i.test(e) ? "image/jpeg" : "image/png";
}
function ce(e) {
	let t = a("-", "_", ""), n = /\.\w+$/.exec(e);
	return n ? e.slice(0, n.index) + t + n[0] : `${e}${t}.png`;
}
function le(e) {
	let t = (e >>> 24) / 255;
	return `rgba(${String(e >> 16 & 255)}, ${String(e >> 8 & 255)}, ${String(e & 255)}, ${String(t)})`;
}
async function ue(e) {
	let t = e.el.cloneNode(!0);
	t.style.transform = "none", t.style.width = `${String(e.sw)}px`, t.style.height = `${String(e.sh)}px`, de(t, e.page, e.aLayNm), await fe(t);
	let n = new XMLSerializer().serializeToString(t), r = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(e.sw)}" height="${String(e.sh)}"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${$()}</style>${n}</div></foreignObject></svg>`, i = await me(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(r)}`), a = document.createElement("canvas");
	a.width = e.width, a.height = e.height;
	let o = a.getContext("2d");
	if (!o) throw "canvasの2Dコンテキストが取れません";
	return o.imageSmoothingEnabled = e.smoothing, o.fillStyle = e.bgColor, o.fillRect(0, 0, e.width, e.height), o.drawImage(i, 0, 0, e.width, e.height), a.toDataURL(e.mime);
}
function de(e, t, n) {
	for (let r of [...e.querySelectorAll("*")]) {
		if (se.has(r.tagName)) {
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
function $() {
	let e = [];
	for (let t of [...document.styleSheets]) try {
		for (let n of [...t.cssRules]) e.push(n.cssText);
	} catch {}
	return e.join("\n");
}
function me(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error("スナップショットの画像化に失敗しました")), r.src = e;
	});
}
function he(e, t) {
	let n = document.createElement("a");
	n.href = t, n.download = e, n.click();
}
//#endregion
//#region src/ts/Font.ts
function ge(e) {
	return e.matchPath(".+", _.FONT).flatMap((e) => Object.values(e)).filter((e) => typeof e == "string").map((t) => `@font-face {
	font-family: ${JSON.stringify(t)};
	src: url(${JSON.stringify(e.searchPath(t, _.FONT))});
}`).join("\n");
}
function _e(e, t = document) {
	let n = ge(e);
	if (!n) return;
	let r = t.createElement("style");
	r.dataset.sn = "font", r.textContent = n, t.head.appendChild(r);
}
//#endregion
//#region src/ts/SndBuf.ts
var ve = 999e3, ye = class {
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
}, be = {
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
}, xe = class {
	trace;
	fetch;
	constructor(e, t) {
		this.trace = e, this.fetch = t;
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
		for (let [n, r] of Object.entries(be)) t[n] = e.canPlayType(r) !== "";
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
			}).then((e) => n.decodeAudioData(e)), t.catch(() => this.#r.delete(e)), this.#r.set(e, t);
		}
		return t;
	}
	#a = Object.create(null);
	#o = Object.create(null);
	async play(e, t, n, r) {
		let i = this.#a[e];
		if (i && !i.destroyed && i.src === t) return;
		this.stop(e);
		let { ctx: a, gn: o } = this.#n(), s = new ye(a, o, e, t, n);
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
}, Se = class e {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#p = new t(e, ""), this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#Re(e), this.#t.log = (e) => this.#Be(e, this.#r?.fn ?? "", this.#r?.lineNum ?? NaN);
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
			let e = this.#r = new Z(t);
			this.#s(e), e.defSetTrigger("sys:sn.sound.global_volume", (e) => {
				this.#C.setGlobalVol(Number(e)), this.#T();
			}), e.defSetTriggerSoundVol((t, n) => {
				let r = Number(e.getVal(`save:const.sn.sound.${t}.volume`) ?? 1);
				this.#C.setVol(t, r * Number(n));
			}), e.defSetTrigger("sys:sn.sound.movie_volume", () => this.#T()), await this.#h(e), _e(this.sys.cfg);
		}
		this.go = () => this.#O(), this.$trgNext();
	}
	#s(e) {
		let { oCfg: t } = this.sys.cfg, n = {
			"const.sn.config.window.width": () => o.stageW,
			"const.sn.config.window.height": () => o.stageH,
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
			"const.sn.needClick2Play": () => this.#C.needClick2Play(),
			"const.sn.sound.codecs": () => this.#C.codecs(),
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
	#c = new s(() => this.sys.cfg.oCfg.log.max_len);
	#l;
	#u = [];
	#d() {
		this.$fncs.setReadBack(this.#c.isPaging), this.$fncs.setStyPaging(String(this.#r?.getVal("save:const.sn.styPaging") ?? "") || "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;");
	}
	page(e) {
		this.#A || (this.#A = !0, this.#f(e).catch(this.#i));
	}
	async #f(e) {
		let t = this.#r;
		if (!t) {
			this.#A = !1;
			return;
		}
		try {
			let n = this.#c.move(e);
			if (this.#d(), !n) {
				this.#A = !1;
				return;
			}
			t.restoreMarkPart(n.mark), t.clearOnResume = n.clearOnResume, this.$fncs.replace(n.mark.sPages), this.#k = !1, this.#l = void 0, t.switchScript(await this.#y(n.fn), "", n.idx);
		} catch (e) {
			this.#A = !1, this.myTrace(`[page] ${String(e)}`, "ET");
			return;
		}
		this.#A = !1, this.#O();
	}
	#p;
	#m = !0;
	async #h(e) {
		this.#p = new t(this.sys, this.sys.cfg.oCfg.save_ns);
		try {
			this.#m = await this.#p.load();
		} catch (e) {
			this.myTrace(`セーブデータが壊れています。初期状態で起動します ${String(e)}`, "E"), this.#m = !0;
		}
		this.#m || (e.setSys(this.#p.data.sys), e.setKidoku(this.#p.data.kidoku)), e.setValNochk("sys:const.sn.cfg.ns", this.sys.cfg.oCfg.save_ns), this.#g();
	}
	setWinInf(e, t, n, r) {
		let i = this.#r;
		i && (i.setValNochk("sys:const.sn.nativeWindow.x", e), i.setValNochk("sys:const.sn.nativeWindow.y", t), i.setValNochk("sys:const.sn.nativeWindow.w", n), i.setValNochk("sys:const.sn.nativeWindow.h", r), this.#g());
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
		return this.#n[e] ??= new k(e, await this.#Le(e), this.#x());
	}
	#b;
	#x() {
		if (this.#b) return this.#b;
		let e = this.#b = new C(this.sys.cfg);
		return e.setEscape(this.sys.cfg.oCfg.init.escape), L(this.sys.cfg.oCfg.init.escape), e;
	}
	go() {}
	navigateTo(e) {
		globalThis.open(e, "_blank");
	}
	jumpToLabelAndGo(e, t, n = "", r) {
		r !== void 0 && (this.#r?.setValNochk("tmp:sn.eventArg", r), this.#r?.setValNochk("tmp:sn.eventLabel", e)), this.#D(e, t, n).catch(this.#i);
	}
	#S = new oe((e, t) => this.sys.cfg.searchPath(e, t), (e, t) => this.sys.fetch(e, t));
	attachFrameBox(e) {
		this.#S.attachBox(e);
	}
	#C = new xe((e, t) => this.myTrace(e, t), (e, t) => this.sys.fetch(e, t));
	unlockAudio() {
		this.#C.unlock();
	}
	needClick2Play() {
		return this.#C.needClick2Play();
	}
	playButtonSe(e, t) {
		if (!e) return;
		let n = this.#Fe("button", e);
		if (!n) return;
		let r = Number(this.#r?.getVal(`sys:const.sn.sound.${t}.volume`) ?? 1);
		this.#C.play(t, n, {
			loop: !1,
			volume: r,
			speed: 1,
			pan: 0,
			start_ms: 0,
			end_ms: ve,
			ret_ms: 0
		}).catch(this.#i);
	}
	#w;
	attachStageBox(e) {
		this.#w = e;
	}
	getMovieVolume() {
		let e = Number(this.#r?.getVal("sys:sn.sound.movie_volume") ?? 1) * Number(this.#r?.getVal("sys:sn.sound.global_volume") ?? 1);
		return e < 0 ? 0 : e > 1 ? 1 : e;
	}
	#T() {
		let e = this.#w;
		if (!e) return;
		let t = this.getMovieVolume();
		for (let n of e.querySelectorAll("video")) n.volume = t;
	}
	#E = /* @__PURE__ */ new Set();
	fireFullScrKey(e) {
		return this.#E.has(e) ? (this.$fncs.toggleFullScr(), !0) : !1;
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
	async #D(e, t, n) {
		let r = this.#r;
		if (r) {
			this.#k = !1;
			try {
				if (n && (n !== r.fn || !e)) {
					let i = await this.#y(n);
					t ? r.callToScript(i, e) : r.switchScript(i, e);
				} else t ? r.callToLabel(e) : r.jumpToLabel(e);
			} catch (e) {
				this.myTrace(`[button]/[event] ジャンプ先エラー fn:${n || r.fn} ${String(e)}`, "ET");
				return;
			}
			this.#O();
		}
	}
	#O() {
		if (!this.#k) {
			if (this.#F) {
				this.#F.canskip && this.#L();
				return;
			}
			if (this.#G) {
				this.#G.canskip && this.#q();
				return;
			}
			if (this.#Y) {
				this.#Y.canskip && this.#te(this.#Y.tw_nm);
				return;
			}
			if (this.#V) {
				this.#V.canskip && this.#U();
				return;
			}
			if (this.#se) {
				this.#se.canskip && this.#le();
				return;
			}
			if (this.#pe) {
				this.#pe.canskip && this.#he();
				return;
			}
			if (this.#_e) {
				this.#_e.canskip && this.#be();
				return;
			}
			this.#A || this.#we().catch(this.#i);
		}
	}
	#k = !1;
	#A = !1;
	#j;
	#M(e, t) {
		clearTimeout(this.#j), this.$fncs.setSkipping(e === "skip"), this.#j = setTimeout(() => {
			e === "skip" && this.$fncs.requestSkip(), this.#O();
		}, t);
	}
	cancelAuto() {
		clearTimeout(this.#j), this.#j = void 0, this.$fncs?.setSkipping(!1), this.#r?.cancelAutoSkip();
	}
	#N;
	#P = !1;
	#F;
	#I(e) {
		clearTimeout(this.#N), this.#P = e > 0, this.#N = this.#P ? setTimeout(() => this.#L(), e) : void 0;
	}
	#L() {
		clearTimeout(this.#N), this.#N = void 0, this.#P = !1, this.$fncs.finishTrans(), this.#F && (this.#F = void 0, this.#O());
	}
	#R(e) {
		if (this.#P) {
			this.#F = { canskip: e };
			return;
		}
		setTimeout(() => this.#O(), 0);
	}
	#z;
	#B = !1;
	#V;
	#H(e) {
		clearTimeout(this.#z), this.#B = !0, this.#z = setTimeout(() => this.#U(), e.msec), this.$fncs.startQuake({
			hmax: e.hmax,
			vmax: e.vmax
		});
	}
	#U() {
		clearTimeout(this.#z), this.#z = void 0, this.#B = !1, this.$fncs.finishQuake(), this.#V && (this.#V = void 0, this.#O());
	}
	#W(e) {
		if (this.#B) {
			this.#V = { canskip: e };
			return;
		}
		setTimeout(() => this.#O(), 0);
	}
	#G;
	#K(e, t) {
		this.#G = {
			canskip: t,
			timer: setTimeout(() => this.#q(), Math.max(0, e))
		};
	}
	#q() {
		this.#G && (clearTimeout(this.#G.timer), this.#G = void 0, this.#O());
	}
	#J = Object.create(null);
	#Y;
	#X(t) {
		let n = this.$fncs.getLaySty(t.nm, t.page), { from: r, aTo: i, aPrp: a } = e.#Q(t, (e) => n[e] ?? ne[e]);
		this.#$(t, r, i, () => {
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
	#Z(t) {
		let n = this.#S.getSty(t.id), { from: r, aTo: i, aPrp: a } = e.#Q(t, (e) => n[e] ?? 0);
		this.#$(t, r, i, () => {
			let e = {};
			for (let t of a) Object.assign(e, { [t]: r[t] });
			this.#je(this.#S.frame(t.id, e));
		});
	}
	static #Q(e, t) {
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
	#$(e, t, n, r, i) {
		this.#J[e.tw_nm]?.tw.kill(), delete this.#J[e.tw_nm];
		let a = {};
		for (let e of n) Object.assign(a, e);
		let o = () => {
			Object.assign(t, a), r(), i?.();
		};
		if (e.msec <= 0 && e.delay <= 0) {
			o(), this.#ee(e.tw_nm);
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
			o(), this.#ee(e.tw_nm);
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
		if (this.#J[e.tw_nm] = {
			end: o,
			tw: u
		}, !e.chain) return;
		let d = this.#J[e.chain];
		if (!d) throw `${e.chain}は存在しない・または終了したトゥイーンです`;
		d.next = () => u.play();
	}
	#ee(e) {
		let { next: t } = this.#J[e] ?? {};
		delete this.#J[e], t?.(), this.#Y?.tw_nm === e && (this.#Y = void 0, setTimeout(() => this.#O(), 0));
	}
	#te(e) {
		let t = this.#J[e];
		t && (t.tw.kill(), t.end()), this.#ee(e);
	}
	#ne(e, t) {
		if (!this.#J[e]) {
			setTimeout(() => this.#O(), 0);
			return;
		}
		this.#Y = {
			tw_nm: e,
			canskip: t
		};
	}
	async #re(e) {
		let t = e.buf === "BGM" ? "playbgm" : "playse", n = this.#Fe(t, e.fn);
		n && await this.#C.play(e.buf, n, e, (e) => {
			this.#r?.setValNochk(`tmp:const.sn.sound.${e}.playing`, !1), e === "VOICE" && this.#ie();
		});
	}
	#ie() {
		let e = this.#r;
		if (!e) return;
		e.resetVolMulTalking();
		let t = "const.sn.sound.BGM.", n = Number(e.getVal(`save:${t}volume`) ?? 1), r = Number(e.getVal(`sys:${t}volume`) ?? 1);
		this.#C.setVol("BGM", n * r);
	}
	#ae(e) {
		let t;
		try {
			t = JSON.parse(String(e.getVal("save:const.sn.loopPlaying") ?? "{}"));
		} catch {
			t = {};
		}
		for (let e of this.#C.bufs()) e in t || this.#C.stop(e);
		for (let [n, r] of Object.entries(t)) {
			if (!r) continue;
			let t = `const.sn.sound.${n}.`, i = Number(e.getVal(`save:${t}volume`) ?? 1), a = Number(e.getVal(`sys:${t}volume`) ?? 1);
			this.#re({
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
	async #oe(e) {
		try {
			await this.#re(e);
		} catch (t) {
			this.#A = !1, this.myTrace(`[playse] エラー fn:${e.fn} ${String(t)}`, "E");
			return;
		}
		this.#A = !1, this.#O();
	}
	#se;
	#ce(e, t, n) {
		if (!this.#C.waitEnd(e, () => {
			this.#se?.buf === e && (this.#se = void 0, this.#O());
		})) {
			setTimeout(() => this.#O(), 0);
			return;
		}
		this.#se = {
			buf: e,
			canskip: t,
			stop: n
		};
	}
	#le() {
		let e = this.#se;
		e && (this.#se = void 0, this.#C.cancelWaitEnd(e.buf), e.stop && this.#C.stop(e.buf), this.#O());
	}
	#ue = Object.create(null);
	#de(e) {
		this.#ue[e.buf]?.tw.kill(), delete this.#ue[e.buf];
		let t = () => {
			this.#C.setVol(e.buf, e.volume), e.stop && this.#C.stop(e.buf);
		}, n = this.#C.gainNode(e.buf);
		if (!n || e.msec <= 0 && e.delay <= 0) {
			t(), this.#fe(e.buf);
			return;
		}
		let r = h.to(n.gain, {
			value: e.volume,
			duration: e.msec / 1e3,
			delay: e.delay / 1e3,
			onComplete: () => {
				t(), this.#fe(e.buf);
			}
		});
		this.#ue[e.buf] = {
			tw: r,
			end: t
		};
	}
	#fe(e) {
		delete this.#ue[e], this.#pe?.buf === e && (this.#pe = void 0, setTimeout(() => this.#O(), 0));
	}
	#pe;
	#me(e, t) {
		if (!this.#ue[e]) {
			setTimeout(() => this.#O(), 0);
			return;
		}
		this.#pe = {
			buf: e,
			canskip: t
		};
	}
	#he() {
		let e = this.#pe;
		e && this.#ge(e.buf);
	}
	#ge(e) {
		let t = this.#ue[e];
		t && (t.tw.kill(), t.end()), this.#fe(e);
	}
	#_e;
	#ve(e) {
		return this.#w?.querySelector(`video[data-fn="${CSS.escape(e)}"]`) ?? void 0;
	}
	#ye(e, t, n, r = 30) {
		let i = this.#ve(e);
		if (!i) {
			if (r > 0) {
				requestAnimationFrame(() => this.#ye(e, t, n, r - 1));
				return;
			}
			this.#O();
			return;
		}
		if (i.loop || i.ended) {
			i.ended && n && this.#xe(i), this.#O();
			return;
		}
		i.addEventListener("ended", () => {
			this.#_e?.fn === e && (this.#_e = void 0, n && this.#xe(i), this.#O());
		}, { once: !0 }), this.#_e = {
			fn: e,
			canskip: t,
			stop: n
		};
	}
	#be() {
		let e = this.#_e;
		if (e) {
			if (this.#_e = void 0, e.stop) {
				let t = this.#ve(e.fn);
				t && this.#xe(t);
			}
			this.#O();
		}
	}
	#xe(e) {
		e.pause(), e.currentTime = e.duration;
	}
	#Se = !1;
	#Ce = 0;
	async #we() {
		let e = this.#r;
		if (e) {
			if (this.#Se) {
				++this.#Ce;
				return;
			}
			this.#Se = !0, this.#l ??= {
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
					for (let e of t) this.#Ie(e);
					let n = t.at(-1);
					if (n?.t === "waitTrans") {
						this.#R(n.canskip);
						return;
					}
					if (n?.t === "wait") {
						this.#K(n.msec, n.canskip);
						return;
					}
					if (n?.t === "waitTsy") {
						this.#ne(n.tw_nm, n.canskip);
						return;
					}
					if (n?.t === "waitQuake") {
						this.#W(n.canskip);
						return;
					}
					if (n?.t === "waitSnd") {
						this.#ce(n.buf, n.canskip, n.stop);
						return;
					}
					if (n?.t === "waitFade") {
						this.#me(n.buf, n.canskip);
						return;
					}
					if (n?.t === "waitVideo") {
						this.#ye(n.fn, n.canskip, n.stop);
						return;
					}
					if (n?.t === "playSnd" && n.join) {
						this.#A = !0, this.#oe(n).catch(this.#i);
						return;
					}
					if (n?.t === "addFrame" || n?.t === "letFrame") {
						this.#A = !0, this.#Te(n).catch(this.#i);
						return;
					}
					if (n?.t === "loadPlugin" || n?.t === "snapshot") {
						this.#A = !0, this.#De(n).catch(this.#i);
						return;
					}
					if (n?.t === "load" || n?.t === "reloadScript") {
						this.#A = !0, this.#Ee(n).catch(this.#i);
						return;
					}
					if (n?.t === "pageTo") {
						this.#A = !0, this.#f(n.to).catch(this.#i);
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
				this.#Se = !1, this.#Ce > 0 && (--this.#Ce, this.#O());
			}
		}
	}
	async #Te(e) {
		try {
			e.t === "addFrame" ? this.#je(await this.#S.add(e.id, e.src, e.sty)) : this.#je({ [`const.sn.frm.${e.id}.${e.var_name}`]: this.#S.get(e.id, e.var_name, e.fnc) });
		} catch (t) {
			this.#A = !1, this.myTrace(`[${e.t === "addFrame" ? "add_frame" : "let_frame"}] エラー id:${e.id} ${String(t)}`, "ET");
			return;
		}
		this.#A = !1, this.#O();
	}
	async #Ee(e) {
		let t = this.#r;
		if (!t) {
			this.#A = !1;
			return;
		}
		try {
			let n = e.t === "reloadScript" ? this.#v : this.#p.getMark(e.place);
			if (!n) throw e.t === "reloadScript" ? "[record_place]がまだ実行されていません" : `place=${String(e.place)} は存在しません`;
			if (t.restoreMarkPart(n), this.#ae(t), this.$fncs.replace(n.sPages), this.#c.clear(), this.#l = void 0, this.#k = !1, e.t === "load" && e.doRec !== !1 && (this.#v = { ...n }), e.t === "load" && e.index !== void 0) {
				let n = await this.#y(e.fn || t.fn);
				t.switchScript(n, "", e.index), this.#A = !1, this.#O();
				return;
			}
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
			this.#A = !1, this.myTrace(`[${e.t === "reloadScript" ? "reload_script" : "load"}] ${String(t)}`, "ET");
			return;
		}
		this.#A = !1, this.#O();
	}
	async #De(e) {
		try {
			e.t === "loadPlugin" ? await this.#Oe(e.fn) : await this.#ke(e);
		} catch (t) {
			this.myTrace(`[${e.t === "loadPlugin" ? "loadplugin" : "snapshot"}] ${String(t)}`, "E");
		}
		this.#A = !1, this.#O();
	}
	async #Oe(e) {
		let t = await this.sys.fetch(e);
		if (!t.ok) throw `cssが取得できません fn:${e}`;
		let n = document.createElement("style");
		n.textContent = await t.text(), document.head.appendChild(n);
	}
	async #ke(e) {
		let t = this.#w;
		if (!t) throw "ステージがまだ表示されていません";
		let n = e.fn.startsWith(g), r = n ? e.fn : ce(e.fn || "snapshot"), i = Q(r), { stageW: a, stageH: s } = o, c = e.width || a, l = e.height || s, u = (e.aLayNm === null && e.page === "fore" && e.b_color === void 0 ? await this.sys.capturePage(this.#Ae(t), c, l, i) : "") || await ue({
			el: t,
			sw: a,
			sh: s,
			width: c,
			height: l,
			bgColor: e.b_color === void 0 ? "black" : le(e.b_color),
			page: e.page,
			aLayNm: e.aLayNm,
			mime: i,
			smoothing: e.smoothing
		});
		n ? this.#p.putFile(r, u) : he(r, u);
	}
	#Ae(e) {
		let t = e.getBoundingClientRect();
		return {
			x: Math.round(t.x),
			y: Math.round(t.y),
			width: Math.round(t.width),
			height: Math.round(t.height)
		};
	}
	#je(e) {
		for (let [t, n] of Object.entries(e)) this.#r?.setValNochk(t, n);
	}
	#Me = Object.create(null);
	#Ne(e) {
		let t = e === "l" ? "breakline" : "breakpage";
		return this.#Me[e] ??= this.sys.cfg.matchPath(`^${t}$`, _.SP_GSM).length > 0 ? this.sys.cfg.searchPath(t, _.SP_GSM) : "";
	}
	#Pe(e, t) {
		if (!t) return "";
		if (t.startsWith("userdata:/")) return this.#p.getFile(t) || (this.myTrace(`[${e}] 保存された画像がありません fn:${t}`, "E"), "");
		try {
			return this.sys.cfg.searchPath(t, _.SP_GSM);
		} catch (n) {
			return this.myTrace(`[${e}] 画像が見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#Fe(e, t) {
		if (!t) return "";
		try {
			return this.sys.cfg.searchPath(t, _.SOUND);
		} catch (n) {
			return this.myTrace(`[${e}] 音声ファイルが見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#Ie(e) {
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
					src: this.#Pe("lay", e.fn),
					aFace: e.aFace.map((e) => ({
						...e,
						src: this.#Pe("add_face", e.fn)
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
					src: e.fn ? this.#Pe("lay b_pic", e.fn) : ""
				});
				break;
			case "chgBackClear":
				this.$fncs.chgBackClear({
					nm: e.nm,
					page: e.page
				});
				break;
			case "finishTrans":
				this.#L();
				break;
			case "trans":
				this.#L(), this.$fncs.startTrans({
					aLayNm: e.aLayNm,
					time: e.time,
					...e.rule ? { ruleSrc: this.#Pe("trans", e.rule) } : {},
					...e.vague === void 0 ? {} : { vague: e.vague }
				}), this.#I(e.time);
				break;
			case "waitTrans": break;
			case "chgStr":
				{
					let t = V(e.str);
					for (let e of t) e.pic && (e.src = this.#Pe("graph", e.pic));
					this.$fncs.chgStr({
						nm: e.nm,
						page: e.page,
						str: H(t),
						aCh: t
					});
				}
				break;
			case "addBtn": {
				let t = e.sty && {
					...e.sty,
					...e.sty.pic ? { src: this.#Pe("button pic", e.sty.pic) } : {},
					...e.sty.b_pic ? { b_src: this.#Pe("button b_pic", e.sty.b_pic) } : {}
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
				this.#X(e);
				break;
			case "tsyFrame":
				this.#Z(e);
				break;
			case "quake":
				this.#H(e);
				break;
			case "stopQuake":
				this.#U();
				break;
			case "waitQuake": break;
			case "waitTsy": break;
			case "stopTsy":
				this.#te(e.tw_nm);
				break;
			case "pauseTsy":
				this.#J[e.tw_nm]?.tw.paused(e.paused);
				break;
			case "playSnd":
				e.join || this.#re(e).catch(this.#i);
				break;
			case "stopSnd":
				this.#C.stop(e.buf);
				break;
			case "stopAllSnd":
				this.#C.stopAll();
				break;
			case "xchgBufSnd":
				this.#ge(e.buf), this.#ge(e.buf2), this.#C.xchgBuf(e.buf, e.buf2);
				break;
			case "duckBgm":
				this.#C.setVol("BGM", e.volume);
				break;
			case "volumeSnd":
				this.#C.setVol(e.buf, e.volume);
				break;
			case "fadeSnd":
				this.#de(e);
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
				e.join || this.#Oe(e.fn).catch(this.#i);
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
				this.#E.add(e.key);
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
				this.#je(this.#S.frame(e.id, e.sty, e.order, e.disabled));
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
					case "prev": m.prev();
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
				this.#c.clear(), this.#l = void 0, this.#r?.setValNochk("save:const.sn.styPaging", u), this.#d();
				break;
			case "pageStyle":
				this.#r?.setValNochk("save:const.sn.styPaging", e.style), this.#d();
				break;
			case "pageKeys":
				this.#u = e.aKey;
				break;
			case "pageTo": break;
			case "trace":
				this.#Re({ text: e.text });
				break;
			case "log":
				this.#Be({ text: e.text }, e.fn, e.lineNum);
				break;
			case "loadScript": break;
			case "stop": {
				let t = this.#l;
				if (this.#l = void 0, t && this.#c.push(t.fn, t.idx, t.mark, t.clearOnResume), this.#d(), e.kind === "l" || e.kind === "p") {
					let t = this.#Ne(e.kind);
					this.$fncs.setWait({
						nm: e.nm,
						kind: e.kind,
						...t ? { src: t } : {},
						...e.mark
					});
				}
				this.#k = e.kind === "s", e.resume ? this.#M(e.resume.mode, e.resume.msec) : this.$fncs.setSkipping(!1), this.#g(), this.$fncs.setBackAlpha(Number(this.#r?.getVal("sys:TextLayer.Back.Alpha") ?? 1)), this.$fncs.setBtnFont(String(this.#r?.getVal("tmp:sn.button.fontFamily") ?? "") || p), this.#r && this.$fncs.setChWait(this.#r.chWait);
				break;
			}
		}
	}
	async #Le(e) {
		try {
			let t = this.sys.cfg.searchPath(e, _.SCRIPT), n = await this.sys.fetch(t);
			if (!n.ok) throw Error(n.statusText);
			return await this.sys.dec(t, await n.text());
		} catch (t) {
			throw this.myTrace(`[load] スクリプト読込に失敗しました fn:${e} ${String(t)}`, "ET"), t;
		}
	}
	#Re(e) {
		return this.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
	}
	#ze = !0;
	#Be(e, t, n) {
		let r = "";
		return this.#ze && (this.#ze = !1, r = `== ${o.plat_desc} ==\n`), this.sys.appendFile(this.sys.path_downloads + "log.txt", `${r}--- ${a("-", "_", "")} [fn:${t} line:${String(n)}] prj:${this.sys.arg.cur}\n${e.text || `(text is ${String(e.text)})`}\n`), !1;
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
				o.isDarkMode && (n = "color:#49F;");
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
export { Se as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map