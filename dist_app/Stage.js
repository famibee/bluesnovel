import { r as e, t } from "./rolldown-runtime.js";
import { t as n } from "./react.js";
import { n as r, o as i, t as a } from "./CmnLib.js";
import { _ as o, d as s, f as c, g as l, h as u, l as d, m as f, n as p, o as m, s as h, u as g, v as _, y as v } from "./store.js";
import { a as y, c as b, d as x, f as S, i as C, l as w, m as T, n as E, o as D, onLong as O, p as k, r as A, s as j, setDesignMode as M, u as N } from "./Main.js";
import { n as P, r as F } from "./Sprite.js";
import { n as I, t as L } from "./gsap.js";
//#region node_modules/react-use/esm/useToggle.js
var R = /* @__PURE__ */ e(n()), z = function(e, t) {
	return typeof t == "boolean" ? t : !e;
}, B = function(e) {
	return (0, R.useReducer)(z, e);
}, ee = x ? R.useLayoutEffect : R.useEffect, V = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	(function() {
		var e = typeof window < "u" && window.document !== void 0 ? window.document : {}, n = t !== void 0 && t.exports, r = (function() {
			for (var t, n = [
				[
					"requestFullscreen",
					"exitFullscreen",
					"fullscreenElement",
					"fullscreenEnabled",
					"fullscreenchange",
					"fullscreenerror"
				],
				[
					"webkitRequestFullscreen",
					"webkitExitFullscreen",
					"webkitFullscreenElement",
					"webkitFullscreenEnabled",
					"webkitfullscreenchange",
					"webkitfullscreenerror"
				],
				[
					"webkitRequestFullScreen",
					"webkitCancelFullScreen",
					"webkitCurrentFullScreenElement",
					"webkitCancelFullScreen",
					"webkitfullscreenchange",
					"webkitfullscreenerror"
				],
				[
					"mozRequestFullScreen",
					"mozCancelFullScreen",
					"mozFullScreenElement",
					"mozFullScreenEnabled",
					"mozfullscreenchange",
					"mozfullscreenerror"
				],
				[
					"msRequestFullscreen",
					"msExitFullscreen",
					"msFullscreenElement",
					"msFullscreenEnabled",
					"MSFullscreenChange",
					"MSFullscreenError"
				]
			], r = 0, i = n.length, a = {}; r < i; r++) if (t = n[r], t && t[1] in e) {
				for (r = 0; r < t.length; r++) a[n[0][r]] = t[r];
				return a;
			}
			return !1;
		})(), i = {
			change: r.fullscreenchange,
			error: r.fullscreenerror
		}, a = {
			request: function(t, n) {
				return new Promise(function(i, a) {
					var o = function() {
						this.off("change", o), i();
					}.bind(this);
					this.on("change", o), t ||= e.documentElement;
					var s = t[r.requestFullscreen](n);
					s instanceof Promise && s.then(o).catch(a);
				}.bind(this));
			},
			exit: function() {
				return new Promise(function(t, n) {
					if (!this.isFullscreen) {
						t();
						return;
					}
					var i = function() {
						this.off("change", i), t();
					}.bind(this);
					this.on("change", i);
					var a = e[r.exitFullscreen]();
					a instanceof Promise && a.then(i).catch(n);
				}.bind(this));
			},
			toggle: function(e, t) {
				return this.isFullscreen ? this.exit() : this.request(e, t);
			},
			onchange: function(e) {
				this.on("change", e);
			},
			onerror: function(e) {
				this.on("error", e);
			},
			on: function(t, n) {
				var r = i[t];
				r && e.addEventListener(r, n, !1);
			},
			off: function(t, n) {
				var r = i[t];
				r && e.removeEventListener(r, n, !1);
			},
			raw: r
		};
		if (!r) {
			n ? t.exports = { isEnabled: !1 } : window.screenfull = { isEnabled: !1 };
			return;
		}
		Object.defineProperties(a, {
			isFullscreen: { get: function() {
				return !!e[r.fullscreenElement];
			} },
			element: {
				enumerable: !0,
				get: function() {
					return e[r.fullscreenElement];
				}
			},
			isEnabled: {
				enumerable: !0,
				get: function() {
					return !!e[r.fullscreenEnabled];
				}
			}
		}), n ? t.exports = a : window.screenfull = a;
	})();
})))()), te = function(e, t, n) {
	n === void 0 && (n = {});
	var r = n.video, i = n.onClose, a = i === void 0 ? S : i, o = (0, R.useState)(t), s = o[0], c = o[1];
	return ee(function() {
		if (t && e.current) {
			var n = function() {
				r?.current && k(r.current, "webkitendfullscreen", n), a();
			}, i = function() {
				if (V.default.isEnabled) {
					var e = V.default.isFullscreen;
					c(e), e || a();
				}
			};
			if (V.default.isEnabled) {
				try {
					V.default.request(e.current), c(!0);
				} catch (e) {
					a(e), c(!1);
				}
				V.default.on("change", i);
			} else r && r.current && r.current.webkitEnterFullscreen ? (r.current.webkitEnterFullscreen(), T(r.current, "webkitendfullscreen", n), c(!0)) : (a(), c(!1));
			return function() {
				if (c(!1), V.default.isEnabled) try {
					V.default.off("change", i), V.default.exit();
				} catch {}
				else r && r.current && r.current.webkitExitFullscreen && (k(r.current, "webkitendfullscreen", n), r.current.webkitExitFullscreen());
			};
		}
	}, [
		t,
		r,
		e
	]), s;
}, ne = function(e) {
	return "touches" in e;
}, re = function(e) {
	ne(e) && e.touches.length < 2 && e.preventDefault && e.preventDefault();
}, H = function(e, t) {
	var n = t === void 0 ? {} : t, r = n.isPreventDefault, i = r === void 0 || r, a = n.delay, o = a === void 0 ? 300 : a, s = (0, R.useRef)(), c = (0, R.useRef)(), l = (0, R.useCallback)(function(t) {
		i && t.target && (T(t.target, "touchend", re, { passive: !1 }), c.current = t.target), s.current = setTimeout(function() {
			return e(t);
		}, o);
	}, [
		e,
		o,
		i
	]), u = (0, R.useCallback)(function() {
		s.current && clearTimeout(s.current), i && c.current && k(c.current, "touchend", re);
	}, [i]);
	return {
		onMouseDown: function(e) {
			return l(e);
		},
		onTouchStart: function(e) {
			return l(e);
		},
		onMouseUp: u,
		onMouseLeave: u,
		onTouchEnd: u
	};
}, U = function(e) {
	N(function() {
		e();
	});
};
//#endregion
//#region node_modules/@egjs/agent/dist/agent.esm.js
function ie(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return !0;
	return !1;
}
function W(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return e[r];
	return null;
}
function ae(e) {
	var t = e;
	if (t === void 0) {
		if (typeof navigator > "u" || !navigator) return "";
		t = navigator.userAgent || "";
	}
	return t.toLowerCase();
}
function oe(e, t) {
	try {
		return new RegExp(e, "g").exec(t);
	} catch {
		return null;
	}
}
function se() {
	if (typeof navigator > "u" || !navigator || !navigator.userAgentData) return !1;
	var e = navigator.userAgentData, t = e.brands || e.uaList;
	return !!(t && t.length);
}
function ce(e, t) {
	var n = oe("(" + e + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", t);
	return n ? n[3] : "";
}
function le(e) {
	return e.replace(/_/g, ".");
}
function ue(e, t) {
	var n = null, r = "-1";
	return ie(e, function(e) {
		var i = oe("(" + e.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", t);
		return !i || e.brand ? !1 : (n = e, r = i[3] || "-1", e.versionAlias ? r = e.versionAlias : e.versionTest && (r = ce(e.versionTest.toLowerCase(), t) || r), r = le(r), !0);
	}), {
		preset: n,
		version: r
	};
}
function de(e, t) {
	var n = {
		brand: "",
		version: "-1"
	};
	return ie(e, function(e) {
		var r = fe(t, e);
		return r ? (n.brand = e.id, n.version = e.versionAlias || r.version, n.version !== "-1") : !1;
	}), n;
}
function fe(e, t) {
	return W(e, function(e) {
		var n = e.brand;
		return oe("" + t.test, n.toLowerCase());
	});
}
var pe = [
	{
		test: "phantomjs",
		id: "phantomjs"
	},
	{
		test: "whale",
		id: "whale"
	},
	{
		test: "edgios|edge|edg",
		id: "edge"
	},
	{
		test: "msie|trident|windows phone",
		id: "ie",
		versionTest: "iemobile|msie|rv"
	},
	{
		test: "miuibrowser",
		id: "miui browser"
	},
	{
		test: "samsungbrowser",
		id: "samsung internet"
	},
	{
		test: "samsung",
		id: "samsung internet",
		versionTest: "version"
	},
	{
		test: "chrome|crios",
		id: "chrome"
	},
	{
		test: "firefox|fxios",
		id: "firefox"
	},
	{
		test: "android",
		id: "android browser",
		versionTest: "version"
	},
	{
		test: "safari|iphone|ipad|ipod",
		id: "safari",
		versionTest: "version"
	}
], me = [
	{
		test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
		id: "chrome",
		versionTest: "chrome"
	},
	{
		test: "chromium",
		id: "chrome"
	},
	{
		test: "whale",
		id: "chrome",
		versionAlias: "-1",
		brand: !0
	}
], he = [{
	test: "applewebkit",
	id: "webkit",
	versionTest: "applewebkit|safari"
}], ge = [
	{
		test: "(?=(iphone|ipad))(?!(.*version))",
		id: "webview"
	},
	{
		test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
		id: "webview"
	},
	{
		test: "webview",
		id: "webview"
	}
], _e = [
	{
		test: "windows phone",
		id: "windows phone"
	},
	{
		test: "windows 2000",
		id: "window",
		versionAlias: "5.0"
	},
	{
		test: "windows nt",
		id: "window"
	},
	{
		test: "win32|windows",
		id: "window"
	},
	{
		test: "iphone|ipad|ipod",
		id: "ios",
		versionTest: "iphone os|cpu os"
	},
	{
		test: "macos|macintel|mac os x",
		id: "mac"
	},
	{
		test: "android|linux armv81",
		id: "android"
	},
	{
		test: "tizen",
		id: "tizen"
	},
	{
		test: "webos|web0s",
		id: "webos"
	}
];
function ve(e) {
	return !!ue(ge, e).preset;
}
function ye(e) {
	var t = ae(e), n = !!/mobi/g.exec(t), r = {
		name: "unknown",
		version: "-1",
		majorVersion: -1,
		webview: ve(t),
		chromium: !1,
		chromiumVersion: "-1",
		webkit: !1,
		webkitVersion: "-1"
	}, i = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	}, a = ue(pe, t), o = a.preset, s = a.version, c = ue(_e, t), l = c.preset, u = c.version, d = ue(me, t);
	if (r.chromium = !!d.preset, r.chromiumVersion = d.version, !r.chromium) {
		var f = ue(he, t);
		r.webkit = !!f.preset, r.webkitVersion = f.version;
	}
	return l && (i.name = l.id, i.version = u, i.majorVersion = parseInt(u, 10)), o && (r.name = o.id, r.version = s, r.webview && i.name === "ios" && r.name !== "safari" && (r.webview = !1)), r.majorVersion = parseInt(r.version, 10), {
		browser: r,
		os: i,
		isMobile: n,
		isHints: !1
	};
}
function be(e) {
	var t = navigator.userAgentData, n = (t.uaList || t.brands).slice(), r = e && e.fullVersionList, i = t.mobile || !1, a = n[0], o = (e && e.platform || t.platform || navigator.platform).toLowerCase(), s = {
		name: a.brand,
		version: a.version,
		majorVersion: -1,
		webkit: !1,
		webkitVersion: "-1",
		chromium: !1,
		chromiumVersion: "-1",
		webview: !!de(ge, n).brand || ve(ae())
	}, c = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	};
	s.webkit = !s.chromium && ie(he, function(e) {
		return fe(n, e);
	});
	var l = de(me, n);
	if (s.chromium = !!l.brand, s.chromiumVersion = l.version || "-1", !s.chromium) {
		var u = de(he, n);
		s.webkit = !!u.brand, s.webkitVersion = u.version || "-1";
	}
	var d = W(_e, function(e) {
		return RegExp("" + e.test, "g").exec(o);
	});
	if (c.name = d ? d.id : "", e && (c.version = e.platformVersion || "-1"), r && r.length) {
		var f = de(pe, r);
		s.name = f.brand || s.name, s.version = f.version || s.version;
	} else {
		var p = de(pe, n);
		s.name = p.brand || s.name, s.version = p.brand && e ? e.uaFullVersion : p.version;
	}
	return s.webkit && (c.name = i ? "ios" : "mac"), c.name === "ios" && s.webview && (s.version = "-1"), c.version = le(c.version), s.version = le(s.version), c.majorVersion = parseInt(c.version, 10), s.majorVersion = parseInt(s.version, 10), {
		browser: s,
		os: c,
		isMobile: i,
		isHints: !0
	};
}
function xe(e) {
	return e === void 0 && se() ? be() : ye(e);
}
//#endregion
//#region node_modules/framework-utils/dist/utils.esm.js
function Se(e) {
	return [...arguments].slice(1).map(function(t) {
		return t.split(" ").map(function(t) {
			return t ? "" + e + t : "";
		}).join(" ");
	}).join(" ");
}
function Ce(e, t) {
	return t.replace(/([^}{]*){/gm, function(t, n) {
		return n.replace(/\.([^{,\s\d.]+)/g, "." + e + "$1") + "{";
	});
}
function we(e, t) {
	return function(n) {
		n && (e[t] = n);
	};
}
function Te(e, t, n) {
	return function(r) {
		r && (e[t][n] = r);
	};
}
function Ee(e, t) {
	return t === void 0 && (t = {}), function(n, r) {
		e.forEach(function(e) {
			var i = t[e] || e;
			i in n || (n[i] = function() {
				for (var t, n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
				var a = (t = this[r])[e].apply(t, n);
				return a === this[r] ? this : a;
			});
		});
	};
}
//#endregion
//#region node_modules/@daybrush/utils/dist/utils.esm.js
var De = "function", Oe = "string", ke = "number", Ae = "undefined", je = typeof window !== Ae, Me = typeof document < "u" && document, Ne = [
	{
		open: "(",
		close: ")"
	},
	{
		open: "\"",
		close: "\""
	},
	{
		open: "'",
		close: "'"
	},
	{
		open: "\\\"",
		close: "\\\""
	},
	{
		open: "\\'",
		close: "\\'"
	}
], Pe = 1e-7;
1 / Pe;
var Fe = {
	cm: function(e) {
		return e * 96 / 2.54;
	},
	mm: function(e) {
		return e * 96 / 254;
	},
	in: function(e) {
		return e * 96;
	},
	pt: function(e) {
		return e * 96 / 72;
	},
	pc: function(e) {
		return e * 96 / 6;
	},
	"%": function(e, t) {
		return e * t / 100;
	},
	vw: function(e, t) {
		return t === void 0 && (t = window.innerWidth), e / 100 * t;
	},
	vh: function(e, t) {
		return t === void 0 && (t = window.innerHeight), e / 100 * t;
	},
	vmax: function(e, t) {
		return t === void 0 && (t = Math.max(window.innerWidth, window.innerHeight)), e / 100 * t;
	},
	vmin: function(e, t) {
		return t === void 0 && (t = Math.min(window.innerWidth, window.innerHeight)), e / 100 * t;
	}
};
function Ie() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function Le(e, t, n, r) {
	return (e * r + t * n) / (n + r);
}
function Re(e) {
	return typeof e === Ae;
}
function ze(e) {
	return e && typeof e == "object";
}
function Be(e) {
	return Array.isArray(e);
}
function Ve(e) {
	return typeof e === Oe;
}
function He(e) {
	return typeof e === ke;
}
function Ue(e) {
	return typeof e === De;
}
function We(e, t) {
	return (t === "" || t == " ") && (e === "" || e == " ") || e === t;
}
function Ge(e, t, n, r, i) {
	return Ke(e, t, n) ? n : qe(e, t, n + 1, r, i);
}
function Ke(e, t, n) {
	if (!e.ignore) return null;
	var r = t.slice(Math.max(n - 3, 0), n + 3).join("");
	return new RegExp(e.ignore).exec(r);
}
function qe(e, t, n, r, i) {
	for (var a = function(n) {
		var a = t[n].trim();
		if (a === e.close && !Ke(e, t, n)) return { value: n };
		var s = n, c = nt(i, function(e) {
			return e.open === a;
		});
		if (c && (s = Ge(c, t, n, r, i)), s === -1) return o = n, "break";
		n = s, o = n;
	}, o, s = n; s < r; ++s) {
		var c = a(s);
		if (s = o, typeof c == "object") return c.value;
		if (c === "break") break;
	}
	return -1;
}
function Je(e, t) {
	var n = Ve(t) ? { separator: t } : t, r = n.separator, i = r === void 0 ? "," : r, a = n.isSeparateFirst, o = n.isSeparateOnlyOpenClose, s = n.isSeparateOpenClose, c = s === void 0 ? o : s, l = n.openCloseCharacters, u = l === void 0 ? Ne : l, d = u.map(function(e) {
		var t = e.open, n = e.close;
		return t === n ? t : t + "|" + n;
	}).join("|"), f = "(\\s*" + i + "\\s*|" + d + "|\\s+)", p = new RegExp(f, "g"), m = e.split(p).filter(function(e) {
		return e && e !== "undefined";
	}), h = m.length, g = [], _ = [];
	function v() {
		return _.length ? (g.push(_.join("")), _ = [], !0) : !1;
	}
	for (var y = function(t) {
		var n = m[t].trim(), r = t, s = nt(u, function(e) {
			return e.open === n;
		}), l = nt(u, function(e) {
			return e.close === n;
		});
		if (s) {
			if (r = Ge(s, m, t, h, u), r !== -1 && c) return v() && a || (g.push(m.slice(t, r + 1).join("")), t = r, a) ? (b = t, "break") : (b = t, "continue");
		} else if (l && !Ke(l, m, t)) {
			var d = Ie(u);
			return d.splice(u.indexOf(l), 1), { value: Je(e, {
				separator: i,
				isSeparateFirst: a,
				isSeparateOnlyOpenClose: o,
				isSeparateOpenClose: c,
				openCloseCharacters: d
			}) };
		} else if (We(n, i) && !o) return v(), a ? (b = t, "break") : (b = t, "continue");
		r === -1 && (r = h - 1), _.push(m.slice(t, r + 1).join("")), t = r, b = t;
	}, b, x = 0; x < h; ++x) {
		var S = y(x);
		if (x = b, typeof S == "object") return S.value;
		if (S === "break") break;
	}
	return _.length && g.push(_.join("")), g;
}
function Ye(e) {
	return Je(e, "");
}
function Xe(e) {
	return Je(e, ",");
}
function Ze(e) {
	var t = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(e);
	return !t || t.length < 4 ? {} : {
		prefix: t[1],
		value: t[2],
		suffix: t[3]
	};
}
function Qe(e) {
	var t = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(e);
	if (!t) return {
		prefix: "",
		unit: "",
		value: NaN
	};
	var n = t[1], r = t[2];
	return {
		prefix: n,
		unit: t[3],
		value: parseFloat(r)
	};
}
function $e(e, t) {
	return t === void 0 && (t = "-"), e.replace(/([a-z])([A-Z])/g, function(e, n, r) {
		return "" + n + t + r.toLowerCase();
	});
}
function et() {
	return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function tt(e, t, n) {
	n === void 0 && (n = -1);
	for (var r = e.length, i = 0; i < r; ++i) if (t(e[i], i, e)) return i;
	return n;
}
function nt(e, t, n) {
	var r = tt(e, t);
	return r > -1 ? e[r] : n;
}
var rt = /*#__PURE__*/ function() {
	var e = et(), t = je && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
	return t ? t.bind(window) : function(t) {
		var n = et();
		return setTimeout(function() {
			t(n - e);
		}, 1e3 / 60);
	};
}(), it = /*#__PURE__*/ function() {
	var e = je && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
	return e ? e.bind(window) : function(e) {
		clearTimeout(e);
	};
}();
function at(e) {
	return Object.keys(e);
}
function ot(e, t) {
	var n = Qe(e), r = n.value, i = n.unit;
	if (ze(t)) {
		var a = t[i];
		if (a) {
			if (Ue(a)) return a(r);
			if (Fe[i]) return Fe[i](r, a);
		}
	} else if (i === "%") return r * t / 100;
	return Fe[i] ? Fe[i](r) : r;
}
function st(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function ct(e, t, n, r) {
	return r === void 0 && (r = e[0] / e[1]), [[G(t[0], 1e-7), G(t[0] / r, 1e-7)], [G(t[1] * r, 1e-7), G(t[1], 1e-7)]].filter(function(e) {
		return e.every(function(e, r) {
			var i = t[r], a = G(i, 1e-7);
			return n ? e <= i || e <= a : e >= i || e >= a;
		});
	})[0] || e;
}
function lt(e, t, n, r) {
	if (!r) return e.map(function(e, r) {
		return st(e, t[r], n[r]);
	});
	var i = e[0], a = e[1], o = r === !0 ? i / a : r, s = ct(e, t, !1, o), c = s[0], l = s[1], u = ct(e, n, !0, o), d = u[0], f = u[1];
	return i < c || a < l ? (i = c, a = l) : (i > d || a > f) && (i = d, a = f), [i, a];
}
function ut(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return n;
}
function dt(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return t ? n / t : 0;
}
function ft(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function pt(e) {
	return [0, 1].map(function(t) {
		return dt(e.map(function(e) {
			return e[t];
		}));
	});
}
function mt(e) {
	var t = pt(e), n = ft(t, e[0]), r = ft(t, e[1]);
	return n < r && r - n < Math.PI || n > r && r - n < -Math.PI ? 1 : -1;
}
function ht(e, t) {
	return Math.sqrt(((t ? t[0] : 0) - e[0]) ** 2 + ((t ? t[1] : 0) - e[1]) ** 2);
}
function G(e, t) {
	if (!t) return e;
	var n = 1 / t;
	return Math.round(e / t) / n;
}
function gt(e, t) {
	return e.forEach(function(n, r) {
		e[r] = G(e[r], t);
	}), e;
}
function _t(e) {
	for (var t = [], n = 0; n < e; ++n) t.push(n);
	return t;
}
function vt(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function yt(e, t) {
	return e.classList ? e.classList.contains(t) : !!e.className.match(RegExp("(\\s|^)" + t + "(\\s|$)"));
}
function bt(e, t) {
	e.classList ? e.classList.add(t) : e.className += " " + t;
}
function xt(e, t) {
	if (e.classList) e.classList.remove(t);
	else {
		var n = RegExp("(\\s|^)" + t + "(\\s|$)");
		e.className = e.className.replace(n, " ");
	}
}
function St(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Ct(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
function wt(e) {
	return e?.ownerDocument || Me;
}
function Tt(e) {
	return wt(e).documentElement;
}
function Et(e) {
	return wt(e).body;
}
function Dt(e) {
	return e?.ownerDocument?.defaultView || window;
}
function Ot(e) {
	return e && "postMessage" in e && "blur" in e && "self" in e;
}
function kt(e) {
	return ze(e) && e.nodeName && e.nodeType && "ownerDocument" in e;
}
//#endregion
//#region node_modules/@scena/matrix/dist/matrix.esm.js
function At(e, t, n, r, i, a) {
	for (var o = 0; o < i; ++o) {
		var s = n + o * i, c = r + o * i;
		e[s] += e[c] * a, t[s] += t[c] * a;
	}
}
function jt(e, t, n, r, i) {
	for (var a = 0; a < i; ++a) {
		var o = n + a * i, s = r + a * i, c = e[o], l = t[o];
		e[o] = e[s], e[s] = c, t[o] = t[s], t[s] = l;
	}
}
function Mt(e, t, n, r, i) {
	for (var a = 0; a < r; ++a) {
		var o = n + a * r;
		e[o] /= i, t[o] /= i;
	}
}
function Nt(e, t, n) {
	n === void 0 && (n = Math.sqrt(e.length));
	for (var r = e.slice(), i = 0; i < n; ++i) r[i * n + t - 1] = 0, r[(t - 1) * n + i] = 0;
	return r[(t - 1) * (n + 1)] = 1, r;
}
function Pt(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = e.slice(), r = en(t), i = 0; i < t; ++i) {
		var a = t * i + i;
		if (!G(n[a], 1e-7)) {
			for (var o = i + 1; o < t; ++o) if (n[t * i + o]) {
				jt(n, r, i, o, t);
				break;
			}
		}
		if (!G(n[a], 1e-7)) return [];
		Mt(n, r, i, t, n[a]);
		for (var o = 0; o < t; ++o) {
			var s = o, c = n[o + i * t];
			!G(c, 1e-7) || i === o || At(n, r, s, i, t, -c);
		}
	}
	return r;
}
function Ft(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = 0; r < t; ++r) for (var i = 0; i < t; ++i) n[i * t + r] = e[t * r + i];
	return n;
}
function It(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = e[t * t - 1], i = 0; i < t - 1; ++i) n[i] = e[t * (t - 1) + i] / r;
	return n[t - 1] = 0, n;
}
function Lt(e, t) {
	for (var n = en(t), r = 0; r < t - 1; ++r) n[t * (t - 1) + r] = e[r] || 0;
	return n;
}
function Rt(e, t) {
	for (var n = e.slice(), r = e.length; r < t - 1; ++r) n[r] = 0;
	return n[t - 1] = 1, n;
}
function zt(e, t, n) {
	if (t === void 0 && (t = Math.sqrt(e.length)), t === n) return e;
	for (var r = en(n), i = Math.min(t, n), a = 0; a < i - 1; ++a) {
		for (var o = 0; o < i - 1; ++o) r[a * n + o] = e[a * t + o];
		r[(a + 1) * n - 1] = e[(a + 1) * t - 1], r[(n - 1) * n + a] = e[(t - 1) * t + a];
	}
	return r[n * n - 1] = e[t * t - 1], r;
}
function Bt(e) {
	var t = [...arguments].slice(1), n = en(e);
	return t.forEach(function(t) {
		n = Vt(n, t, e);
	}), n;
}
function Vt(e, t, n) {
	n === void 0 && (n = Math.sqrt(e.length));
	var r = [], i = e.length / n, a = t.length / i;
	if (!i) return t;
	if (!a) return e;
	for (var o = 0; o < n; ++o) for (var s = 0; s < a; ++s) {
		r[s * n + o] = 0;
		for (var c = 0; c < i; ++c) r[s * n + o] += e[c * n + o] * t[s * i + c];
	}
	return r;
}
function Ht(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] + t[i];
	return r;
}
function K(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] - t[i];
	return r;
}
function Ut(e, t) {
	return t === void 0 && (t = e.length === 6), t ? [
		e[0],
		e[1],
		0,
		e[2],
		e[3],
		0,
		e[4],
		e[5],
		1
	] : e;
}
function Wt(e, t) {
	return t === void 0 && (t = e.length === 9), t ? [
		e[0],
		e[1],
		e[3],
		e[4],
		e[6],
		e[7]
	] : e;
}
function Gt(e, t, n) {
	n === void 0 && (n = t.length);
	var r = Vt(e, t, n), i = r[n - 1];
	return r.map(function(e) {
		return e / i;
	});
}
function Kt(e, t) {
	return Vt(e, [
		1,
		0,
		0,
		0,
		0,
		Math.cos(t),
		Math.sin(t),
		0,
		0,
		-Math.sin(t),
		Math.cos(t),
		0,
		0,
		0,
		0,
		1
	], 4);
}
function qt(e, t) {
	return Vt(e, [
		Math.cos(t),
		0,
		-Math.sin(t),
		0,
		0,
		1,
		0,
		0,
		Math.sin(t),
		0,
		Math.cos(t),
		0,
		0,
		0,
		0,
		1
	], 4);
}
function Jt(e, t) {
	return Vt(e, $t(t, 4));
}
function Yt(e, t) {
	var n = t[0], r = n === void 0 ? 1 : n, i = t[1], a = i === void 0 ? 1 : i, o = t[2];
	return Vt(e, [
		r,
		0,
		0,
		0,
		0,
		a,
		0,
		0,
		0,
		0,
		o === void 0 ? 1 : o,
		0,
		0,
		0,
		0,
		1
	], 4);
}
function Xt(e, t) {
	return Gt($t(t, 3), Rt(e, 3));
}
function Zt(e, t) {
	var n = t[0], r = n === void 0 ? 0 : n, i = t[1], a = i === void 0 ? 0 : i, o = t[2];
	return Vt(e, [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		r,
		a,
		o === void 0 ? 0 : o,
		1
	], 4);
}
function Qt(e, t) {
	return Vt(e, t, 4);
}
function $t(e, t) {
	var n = Math.cos(e), r = Math.sin(e), i = en(t);
	return i[0] = n, i[1] = r, i[t] = -r, i[t + 1] = n, i;
}
function en(e) {
	for (var t = e * e, n = [], r = 0; r < t; ++r) n[r] = r % (e + 1) ? 0 : 1;
	return n;
}
function tn(e, t) {
	for (var n = en(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[(t + 1) * i] = e[i];
	return n;
}
function nn(e, t) {
	for (var n = en(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[t * (t - 1) + i] = e[i];
	return n;
}
function rn(e, t, n, r, i, a, o, s) {
	var c = e[0], l = e[1], u = t[0], d = t[1], f = n[0], p = n[1], m = r[0], h = r[1], g = i[0], _ = i[1], v = a[0], y = a[1], b = o[0], x = o[1], S = s[0], C = s[1], w = Pt([
		c,
		0,
		u,
		0,
		f,
		0,
		m,
		0,
		l,
		0,
		d,
		0,
		p,
		0,
		h,
		0,
		1,
		0,
		1,
		0,
		1,
		0,
		1,
		0,
		0,
		c,
		0,
		u,
		0,
		f,
		0,
		m,
		0,
		l,
		0,
		d,
		0,
		p,
		0,
		h,
		0,
		1,
		0,
		1,
		0,
		1,
		0,
		1,
		-g * c,
		-_ * c,
		-v * u,
		-y * u,
		-b * f,
		-x * f,
		-S * m,
		-C * m,
		-g * l,
		-_ * l,
		-v * d,
		-y * d,
		-b * p,
		-x * p,
		-S * h,
		-C * h
	], 8);
	if (!w.length) return [];
	var T = Vt(w, [
		g,
		_,
		v,
		y,
		b,
		x,
		S,
		C
	], 8);
	return T[8] = 1, zt(Ft(T), 3, 4);
}
//#endregion
//#region node_modules/css-to-mat/dist/css-to-mat.esm.js
var an = function() {
	return an = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, an.apply(this, arguments);
};
function on() {
	return [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	];
}
function sn(e, t) {
	return t === void 0 && (t = 0), ln(un(e, t));
}
function cn(e, t) {
	var n = Gt(e, [
		t[0],
		t[1] || 0,
		t[2] || 0,
		1
	], 4), r = n[3] || 1;
	return [
		n[0] / r,
		n[1] / r,
		n[2] / r
	];
}
function ln(e) {
	var t = on();
	return e.forEach(function(e) {
		var n = e.matrixFunction, r = e.functionValue;
		n && (t = n(t, r));
	}), t;
}
function un(e, t) {
	return t === void 0 && (t = 0), (Be(e) ? e : Ye(e)).map(function(e) {
		var n = Ze(e), r = n.prefix, i = n.value, a = null, o = r, s = "";
		if (r === "translate" || r === "translateX" || r === "translate3d") {
			var c = ze(t) ? an(an({}, t), { "o%": t["%"] }) : {
				"%": t,
				"o%": t
			}, l = Xe(i).map(function(e, n) {
				return c["%"] = n === 0 && "x%" in c ? t["x%"] : n === 1 && "y%" in c ? t["y%"] : t["o%"], ot(e, c);
			}), u = l[0], d = l[1], f = d === void 0 ? 0 : d, p = l[2], m = p === void 0 ? 0 : p;
			a = Zt, s = [
				u,
				f,
				m
			];
		} else if (r === "translateY") {
			var f = ot(i, ze(t) ? an({ "%": t["y%"] }, t) : { "%": t });
			a = Zt, s = [
				0,
				f,
				0
			];
		} else if (r === "translateZ") {
			var m = parseFloat(i);
			a = Zt, s = [
				0,
				0,
				m
			];
		} else if (r === "scale" || r === "scale3d") {
			var h = Xe(i).map(function(e) {
				return parseFloat(e);
			}), g = h[0], _ = h[1], v = _ === void 0 ? g : _, y = h[2], b = y === void 0 ? 1 : y;
			a = Yt, s = [
				g,
				v,
				b
			];
		} else if (r === "scaleX") {
			var g = parseFloat(i);
			a = Yt, s = [
				g,
				1,
				1
			];
		} else if (r === "scaleY") {
			var v = parseFloat(i);
			a = Yt, s = [
				1,
				v,
				1
			];
		} else if (r === "scaleZ") {
			var b = parseFloat(i);
			a = Yt, s = [
				1,
				1,
				b
			];
		} else if (r === "rotate" || r === "rotateZ" || r === "rotateX" || r === "rotateY") {
			var x = Qe(i), S = x.unit, C = x.value, w = S === "rad" ? C : C * Math.PI / 180;
			r === "rotate" || r === "rotateZ" ? (o = "rotateZ", a = Jt) : r === "rotateX" ? a = Kt : r === "rotateY" && (a = qt), s = w;
		} else if (r === "matrix3d") a = Qt, s = Xe(i).map(function(e) {
			return parseFloat(e);
		});
		else if (r === "matrix") {
			var T = Xe(i).map(function(e) {
				return parseFloat(e);
			});
			a = Qt, s = [
				T[0],
				T[1],
				0,
				0,
				T[2],
				T[3],
				0,
				0,
				0,
				0,
				1,
				0,
				T[4],
				T[5],
				0,
				1
			];
		} else o = "";
		return {
			name: r,
			functionName: o,
			value: i,
			matrixFunction: a,
			functionValue: s
		};
	});
}
//#endregion
//#region node_modules/@egjs/list-differ/dist/list-differ.esm.js
var dn = /*#__PURE__*/ function() {
	function e() {
		this.keys = [], this.values = [];
	}
	var t = e.prototype;
	return t.get = function(e) {
		return this.values[this.keys.indexOf(e)];
	}, t.set = function(e, t) {
		var n = this.keys, r = this.values, i = n.indexOf(e), a = i === -1 ? n.length : i;
		n[a] = e, r[a] = t;
	}, e;
}(), fn = /*#__PURE__*/ function() {
	function e() {
		this.object = {};
	}
	var t = e.prototype;
	return t.get = function(e) {
		return this.object[e];
	}, t.set = function(e, t) {
		this.object[e] = t;
	}, e;
}(), pn = typeof Map == "function", mn = /*#__PURE__*/ function() {
	function e() {}
	var t = e.prototype;
	return t.connect = function(e, t) {
		this.prev = e, this.next = t, e && (e.next = this), t && (t.prev = this);
	}, t.disconnect = function() {
		var e = this.prev, t = this.next;
		e && (e.next = t), t && (t.prev = e);
	}, t.getIndex = function() {
		for (var e = this, t = -1; e;) e = e.prev, ++t;
		return t;
	}, e;
}();
function hn(e, t) {
	var n = [], r = [];
	return e.forEach(function(e) {
		var t = e[0], i = e[1], a = new mn();
		n[t] = a, r[i] = a;
	}), n.forEach(function(e, t) {
		e.connect(n[t - 1]);
	}), e.filter(function(e, n) {
		return !t[n];
	}).map(function(e, t) {
		var i = e[0], a = e[1];
		if (i === a) return [0, 0];
		var o = n[i], s = r[a - 1], c = o.getIndex();
		return o.disconnect(), s ? o.connect(s, s.next) : o.connect(void 0, n[0]), [c, o.getIndex()];
	});
}
var gn = /*#__PURE__*/ function() {
	function e(e, t, n, r, i, a, o, s) {
		this.prevList = e, this.list = t, this.added = n, this.removed = r, this.changed = i, this.maintained = a, this.changedBeforeAdded = o, this.fixed = s;
	}
	var t = e.prototype;
	return Object.defineProperty(t, "ordered", {
		get: function() {
			return this.cacheOrdered || this.caculateOrdered(), this.cacheOrdered;
		},
		enumerable: !0,
		configurable: !0
	}), Object.defineProperty(t, "pureChanged", {
		get: function() {
			return this.cachePureChanged || this.caculateOrdered(), this.cachePureChanged;
		},
		enumerable: !0,
		configurable: !0
	}), t.caculateOrdered = function() {
		var e = hn(this.changedBeforeAdded, this.fixed), t = this.changed, n = [];
		this.cacheOrdered = e.filter(function(e, r) {
			var i = e[0], a = e[1], o = t[r], s = o[0], c = o[1];
			if (i !== a) return n.push([s, c]), !0;
		}), this.cachePureChanged = n;
	}, e;
}();
function _n(e, t, n) {
	var r = pn ? Map : n ? fn : dn, i = n || function(e) {
		return e;
	}, a = [], o = [], s = [], c = e.map(i), l = t.map(i), u = new r(), d = new r(), f = [], p = [], m = {}, h = [], g = 0, _ = 0;
	return c.forEach(function(e, t) {
		u.set(e, t);
	}), l.forEach(function(e, t) {
		d.set(e, t);
	}), c.forEach(function(e, t) {
		var n = d.get(e);
		n === void 0 ? (++_, o.push(t)) : m[n] = _;
	}), l.forEach(function(e, t) {
		var n = u.get(e);
		n === void 0 ? (a.push(t), ++g) : (s.push([n, t]), _ = m[t] || 0, f.push([n - _, t - g]), p.push(t === n), n !== t && h.push([n, t]));
	}), o.reverse(), new gn(e, t, a, o, h, s, f, p);
}
var vn = /*#__PURE__*/ function() {
	function e(e, t) {
		e === void 0 && (e = []), this.findKeyCallback = t, this.list = [].slice.call(e);
	}
	var t = e.prototype;
	return t.update = function(e) {
		var t = [].slice.call(e), n = _n(this.list, t, this.findKeyCallback);
		return this.list = t, n;
	}, e;
}(), yn = function(e, t) {
	return yn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, yn(e, t);
};
function bn(e, t) {
	yn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var xn = typeof Map == "function" ? void 0 : function() {
	var e = 0;
	return function(t) {
		return t.__DIFF_KEY__ ||= ++e;
	};
}(), Sn = /*#__PURE__*/ function(e) {
	bn(t, e);
	function t(t) {
		return t === void 0 && (t = []), e.call(this, t, xn) || this;
	}
	return t;
}(vn);
function Cn(e, t) {
	return _n(e, t, xn);
}
//#endregion
//#region node_modules/@scena/event-emitter/dist/event-emitter.esm.js
var wn = function() {
	return wn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, wn.apply(this, arguments);
};
function Tn() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
var En = /*#__PURE__*/ function() {
	function e() {
		this._events = {};
	}
	var t = e.prototype;
	return t.on = function(e, t) {
		if (ze(e)) for (var n in e) this.on(n, e[n]);
		else this._addEvent(e, t, {});
		return this;
	}, t.off = function(e, t) {
		if (!e) this._events = {};
		else if (ze(e)) for (var n in e) this.off(n);
		else if (!t) this._events[e] = [];
		else {
			var r = this._events[e];
			if (r) {
				var i = tt(r, function(e) {
					return e.listener === t;
				});
				i > -1 && r.splice(i, 1);
			}
		}
		return this;
	}, t.once = function(e, t) {
		var n = this;
		return t && this._addEvent(e, t, { once: !0 }), new Promise(function(t) {
			n._addEvent(e, t, { once: !0 });
		});
	}, t.emit = function(e, t) {
		var n = this;
		t === void 0 && (t = {});
		var r = this._events[e];
		if (!e || !r) return !0;
		var i = !1;
		return t.eventType = e, t.stop = function() {
			i = !0;
		}, t.currentTarget = this, Tn(r).forEach(function(r) {
			r.listener(t), r.once && n.off(e, r.listener);
		}), !i;
	}, t.trigger = function(e, t) {
		return t === void 0 && (t = {}), this.emit(e, t);
	}, t._addEvent = function(e, t, n) {
		var r = this._events;
		r[e] = r[e] || [], r[e].push(wn({ listener: t }, n));
	}, e;
}(), Dn = function(e, t) {
	return Dn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Dn(e, t);
};
function On(e, t) {
	Dn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var kn = function() {
	return kn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, kn.apply(this, arguments);
};
function An(e) {
	var t = e.container;
	return t === document.body ? [t.scrollLeft || document.documentElement.scrollLeft, t.scrollTop || document.documentElement.scrollTop] : [t.scrollLeft, t.scrollTop];
}
function jn(e, t) {
	return e.addEventListener("scroll", t), function() {
		e.removeEventListener("scroll", t);
	};
}
function Mn(e) {
	if (!e) return null;
	if (Ve(e)) return document.querySelector(e);
	if (Ue(e)) return e();
	if (e instanceof Element) return e;
	if ("current" in e) return e.current;
	if ("value" in e) return e.value;
}
var Nn = /*#__PURE__*/ function(e) {
	On(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t._startRect = null, t._startPos = [], t._prevTime = 0, t._timer = 0, t._prevScrollPos = [0, 0], t._isWait = !1, t._flag = !1, t._currentOptions = null, t._lock = !1, t._unregister = null, t._onScroll = function() {
			var e = t._currentOptions;
			t._lock || !e || t.emit("scrollDrag", { next: function(n) {
				t.checkScroll({
					container: e.container,
					inputEvent: n
				});
			} });
		}, t;
	}
	var n = t.prototype;
	return n.dragStart = function(e, t) {
		var n = Mn(t.container);
		if (!n) {
			this._flag = !1;
			return;
		}
		var r = 0, i = 0, a = 0, o = 0;
		if (n === document.body) a = window.innerWidth, o = window.innerHeight;
		else {
			var s = n.getBoundingClientRect();
			r = s.top, i = s.left, a = s.width, o = s.height;
		}
		this._flag = !0, this._startPos = [e.clientX, e.clientY], this._startRect = {
			top: r,
			left: i,
			width: a,
			height: o
		}, this._prevScrollPos = this._getScrollPosition([0, 0], t), this._currentOptions = t, this._registerScrollEvent(t);
	}, n.drag = function(e, t) {
		if (clearTimeout(this._timer), this._flag) {
			var n = e.clientX, r = e.clientY, i = t.threshold, a = i === void 0 ? 0 : i, o = this, s = o._startRect, c = o._startPos;
			this._currentOptions = t;
			var l = [0, 0];
			return s.top > r - a ? (c[1] > s.top || r < c[1]) && (l[1] = -1) : s.top + s.height < r + a && (c[1] < s.top + s.height || r > c[1]) && (l[1] = 1), s.left > n - a ? (c[0] > s.left || n < c[0]) && (l[0] = -1) : s.left + s.width < n + a && (c[0] < s.left + s.width || n > c[0]) && (l[0] = 1), !l[0] && !l[1] ? !1 : this._continueDrag(kn(kn({}, t), {
				direction: l,
				inputEvent: e,
				isDrag: !0
			}));
		}
	}, n.checkScroll = function(e) {
		var t = this;
		if (this._isWait) return !1;
		var n = e.prevScrollPos, r = n === void 0 ? this._prevScrollPos : n, i = e.direction, a = e.throttleTime, o = a === void 0 ? 0 : a, s = e.inputEvent, c = e.isDrag, l = this._getScrollPosition(i || [0, 0], e), u = l[0] - r[0], d = l[1] - r[1], f = i || [u ? Math.abs(u) / u : 0, d ? Math.abs(d) / d : 0];
		return this._prevScrollPos = l, this._lock = !1, !u && !d ? !1 : (this.emit("move", {
			offsetX: f[0] ? u : 0,
			offsetY: f[1] ? d : 0,
			inputEvent: s
		}), o && c && (clearTimeout(this._timer), this._timer = window.setTimeout(function() {
			t._continueDrag(e);
		}, o)), !0);
	}, n.dragEnd = function() {
		this._flag = !1, this._lock = !1, clearTimeout(this._timer), this._unregisterScrollEvent();
	}, n._getScrollPosition = function(e, t) {
		var n = t.container, r = t.getScrollPosition;
		return (r === void 0 ? An : r)({
			container: Mn(n),
			direction: e
		});
	}, n._continueDrag = function(e) {
		var t = this, n, r = e.container, i = e.direction, a = e.throttleTime, o = e.useScroll, s = e.isDrag, c = e.inputEvent;
		if (!(!this._flag || s && this._isWait)) {
			var l = et(), u = Math.max(a + this._prevTime - l, 0);
			if (u > 0) return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
				t._continueDrag(e);
			}, u), !1;
			this._prevTime = l;
			var d = this._getScrollPosition(i, e);
			this._prevScrollPos = d, s && (this._isWait = !0), o || (this._lock = !0);
			var f = {
				container: Mn(r),
				direction: i,
				inputEvent: c
			};
			return (n = e.requestScroll) == null || n.call(e, f), this.emit("scroll", f), this._isWait = !1, o || this.checkScroll(kn(kn({}, e), {
				prevScrollPos: d,
				direction: i,
				inputEvent: c
			}));
		}
	}, n._registerScrollEvent = function(e) {
		this._unregisterScrollEvent();
		var t = e.checkScrollEvent;
		if (t) {
			var n = t === !0 ? jn : t, r = Mn(e.container);
			this._unregister = t === !0 && (r === document.body || r === document.documentElement) ? jn(window, this._onScroll) : n(r, this._onScroll);
		}
	}, n._unregisterScrollEvent = function() {
		var e;
		(e = this._unregister) == null || e.call(this), this._unregister = null;
	}, t;
}(En);
//#endregion
//#region node_modules/overlap-area/dist/overlap-area.esm.js
function Pn() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function Fn(e) {
	return G(e, Pe);
}
function In(e, t) {
	return e.every(function(e, n) {
		return Fn(e - t[n]) === 0;
	});
}
function Ln(e, t) {
	return !Fn(e[0] - t[0]) && !Fn(e[1] - t[1]);
}
function Rn(e) {
	return e.length < 3 ? 0 : Math.abs(ut(e.map(function(t, n) {
		var r = e[n + 1] || e[0];
		return t[0] * r[1] - r[0] * t[1];
	}))) / 2;
}
function zn(e, t) {
	var n = t.width, r = t.height, i = t.left, a = t.top, o = Bn(e), s = o.minX, c = o.minY, l = o.maxX, u = o.maxY, d = n / (l - s), f = r / (u - c);
	return e.map(function(e) {
		return [i + (e[0] - s) * d, a + (e[1] - c) * f];
	});
}
function Bn(e) {
	var t = e.map(function(e) {
		return e[0];
	}), n = e.map(function(e) {
		return e[1];
	});
	return {
		minX: Math.min.apply(Math, t),
		minY: Math.min.apply(Math, n),
		maxX: Math.max.apply(Math, t),
		maxY: Math.max.apply(Math, n)
	};
}
function Vn(e, t, n) {
	var r = e[0], i = e[1], a = Bn(t), o = a.minX, s = a.maxX, c = [[o, i], [s, i]], l = Hn(c[0], c[1]), u = Gn(t), d = [];
	if (u.forEach(function(t) {
		var n = Hn(t[0], t[1]), r = t[0];
		In(l, n) ? d.push({
			pos: e,
			line: t,
			type: "line"
		}) : Wn(Un(l, n), [c, t]).forEach(function(e) {
			t.some(function(t) {
				return Ln(t, e);
			}) ? d.push({
				pos: e,
				line: t,
				type: "point"
			}) : Fn(r[1] - i) !== 0 && d.push({
				pos: e,
				line: t,
				type: "intersection"
			});
		});
	}), !n && nt(d, function(e) {
		return e[0] === r;
	})) return !0;
	var f = 0, p = {};
	return d.forEach(function(e) {
		var t = e.pos, n = e.type, a = e.line;
		if (!(t[0] > r)) {
			if (n === "intersection") ++f;
			else if (n === "line") return;
			else if (n === "point") {
				var o = nt(a, function(e) {
					return e[1] !== i;
				}), s = p[t[0]], c = o[1] > i ? 1 : -1;
				s ? s !== c && ++f : p[t[0]] = c;
			}
		}
	}), f % 2 == 1;
}
function Hn(e, t) {
	var n = e[0], r = e[1], i = t[0], a = t[1], o = i - n, s = a - r;
	Math.abs(o) < 1e-7 && (o = 0), Math.abs(s) < 1e-7 && (s = 0);
	var c = 0, l = 0, u = 0;
	return o ? s ? (c = -s / o, l = 1, u = -c * n - r) : (l = 1, u = -r) : s && (c = -1, u = n), [
		c,
		l,
		u
	];
}
function Un(e, t) {
	var n = e[0], r = e[1], i = e[2], a = t[0], o = t[1], s = t[2], c = n === 0 && a === 0, l = r === 0 && o === 0, u = [];
	if (c && l) return [];
	if (c) {
		var d = -i / r;
		return d === -s / o ? [[-Infinity, d], [Infinity, d]] : [];
	}
	if (l) {
		var f = -i / n;
		return f === -s / a ? [[f, -Infinity], [f, Infinity]] : [];
	}
	if (n === 0) {
		var p = -i / r, m = -(o * p + s) / a;
		u = [[m, p]];
	} else if (a === 0) {
		var p = -s / o, m = -(r * p + i) / n;
		u = [[m, p]];
	} else if (r === 0) {
		var m = -i / n, p = -(a * m + s) / o;
		u = [[m, p]];
	} else if (o === 0) {
		var m = -s / a, p = -(n * m + i) / r;
		u = [[m, p]];
	} else {
		var m = (r * s - o * i) / (o * n - r * a), p = -(n * m + i) / r;
		u = [[m, p]];
	}
	return u.map(function(e) {
		return [e[0], e[1]];
	});
}
function Wn(e, t) {
	var n = t.map(function(e) {
		return [0, 1].map(function(t) {
			return [Math.min(e[0][t], e[1][t]), Math.max(e[0][t], e[1][t])];
		});
	}), r = [];
	if (e.length === 2) {
		var i = e[0], a = i[0], o = i[1];
		if (!Fn(a - e[1][0])) {
			var s = Math.max.apply(Math, n.map(function(e) {
				return e[1][0];
			})), c = Math.min.apply(Math, n.map(function(e) {
				return e[1][1];
			}));
			if (Fn(s - c) > 0) return [];
			r = [[a, s], [a, c]];
		} else if (!Fn(o - e[1][1])) {
			var l = Math.max.apply(Math, n.map(function(e) {
				return e[0][0];
			})), u = Math.min.apply(Math, n.map(function(e) {
				return e[0][1];
			}));
			if (Fn(l - u) > 0) return [];
			r = [[l, o], [u, o]];
		}
	}
	return r.length || (r = e.filter(function(e) {
		var t = e[0], r = e[1];
		return n.every(function(e) {
			return 0 <= Fn(t - e[0][0]) && 0 <= Fn(e[0][1] - t) && 0 <= Fn(r - e[1][0]) && 0 <= Fn(e[1][1] - r);
		});
	})), r.map(function(e) {
		return [Fn(e[0]), Fn(e[1])];
	});
}
function Gn(e) {
	return Pn(e.slice(1), [e[0]]).map(function(t, n) {
		return [e[n], t];
	});
}
function Kn(e, t) {
	var n = e.slice(), r = t.slice();
	mt(n) === -1 && n.reverse(), mt(r) === -1 && r.reverse();
	var i = Gn(n), a = Gn(r), o = i.map(function(e) {
		return Hn(e[0], e[1]);
	}), s = a.map(function(e) {
		return Hn(e[0], e[1]);
	}), c = [];
	o.forEach(function(e, t) {
		var n = i[t], o = [];
		s.forEach(function(r, i) {
			var s = Wn(Un(e, r), [n, a[i]]);
			o.push.apply(o, s.map(function(e) {
				return {
					index1: t,
					index2: i,
					pos: e,
					type: "intersection"
				};
			}));
		}), o.sort(function(e, t) {
			return ht(n[0], e.pos) - ht(n[0], t.pos);
		}), c.push.apply(c, o), Vn(n[1], r) && c.push({
			index1: t,
			index2: -1,
			pos: n[1],
			type: "inside"
		});
	}), a.forEach(function(e, t) {
		if (Vn(e[1], n)) {
			var r = !1, i = tt(c, function(e) {
				return e.index2 === t ? (r = !0, !1) : !!r;
			});
			i === -1 && (r = !1, i = tt(c, function(e) {
				var n = e.index1, i = e.index2;
				return n === -1 && i + 1 === t ? (r = !0, !1) : !!r;
			})), i === -1 ? c.push({
				index1: -1,
				index2: t,
				pos: e[1],
				type: "inside"
			}) : c.splice(i, 0, {
				index1: -1,
				index2: t,
				pos: e[1],
				type: "inside"
			});
		}
	});
	var l = {};
	return c.filter(function(e) {
		var t = e.pos, n = t[0] + "x" + t[1];
		return !l[n] && (l[n] = !0, !0);
	});
}
function qn(e, t) {
	return Kn(e, t).map(function(e) {
		return e.pos;
	});
}
function Jn(e, t) {
	return Rn(qn(e, t));
}
//#endregion
//#region node_modules/gesto/dist/gesto.esm.js
var Yn = function(e, t) {
	return Yn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Yn(e, t);
};
function Xn(e, t) {
	Yn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Zn = function() {
	return Zn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Zn.apply(this, arguments);
};
function Qn(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function $n(e) {
	return Qn([e[0].clientX, e[0].clientY], [e[1].clientX, e[1].clientY]) / Math.PI * 180;
}
function er(e) {
	return e.touches && e.touches.length >= 2;
}
function tr(e) {
	return e ? e.touches ? ar(e.touches) : [or(e)] : [];
}
function nr(e) {
	return e && (e.type.indexOf("mouse") > -1 || "button" in e);
}
function rr(e, t, n) {
	var r = n.length, i = sr(e, r), a = i.clientX, o = i.clientY, s = i.originalClientX, c = i.originalClientY, l = sr(t, r), u = l.clientX, d = l.clientY, f = sr(n, r), p = f.clientX, m = f.clientY;
	return {
		clientX: s,
		clientY: c,
		deltaX: a - u,
		deltaY: o - d,
		distX: a - p,
		distY: o - m
	};
}
function ir(e) {
	return Math.sqrt((e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2);
}
function ar(e) {
	for (var t = Math.min(e.length, 2), n = [], r = 0; r < t; ++r) n.push(or(e[r]));
	return n;
}
function or(e) {
	return {
		clientX: e.clientX,
		clientY: e.clientY
	};
}
function sr(e, t) {
	t === void 0 && (t = e.length);
	for (var n = {
		clientX: 0,
		clientY: 0,
		originalClientX: 0,
		originalClientY: 0
	}, r = Math.min(e.length, t), i = 0; i < r; ++i) {
		var a = e[i];
		n.originalClientX += "originalClientX" in a ? a.originalClientX : a.clientX, n.originalClientY += "originalClientY" in a ? a.originalClientY : a.clientY, n.clientX += a.clientX, n.clientY += a.clientY;
	}
	return t ? {
		clientX: n.clientX / t,
		clientY: n.clientY / t,
		originalClientX: n.originalClientX / t,
		originalClientY: n.originalClientY / t
	} : n;
}
var cr = /* @__PURE__ */ function() {
	function e(e) {
		this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = e, this.prevClients = e, this.length = e.length;
	}
	return e.prototype.getAngle = function(e) {
		return e === void 0 && (e = this.prevClients), $n(e);
	}, e.prototype.getRotation = function(e) {
		return e === void 0 && (e = this.prevClients), $n(e) - $n(this.startClients);
	}, e.prototype.getPosition = function(e, t) {
		e === void 0 && (e = this.prevClients);
		var n = rr(e || this.prevClients, this.prevClients, this.startClients), r = n.deltaX, i = n.deltaY;
		return this.movement += Math.sqrt(r * r + i * i), this.prevClients = e, n;
	}, e.prototype.getPositions = function(e) {
		e === void 0 && (e = this.prevClients);
		for (var t = this.prevClients, n = this.startClients, r = Math.min(this.length, t.length), i = [], a = 0; a < r; ++a) i[a] = rr([e[a]], [t[a]], [n[a]]);
		return i;
	}, e.prototype.getMovement = function(e) {
		var t = this.movement;
		if (!e) return t;
		var n = sr(e, this.length), r = sr(this.prevClients, this.length), i = n.clientX - r.clientX, a = n.clientY - r.clientY;
		return Math.sqrt(i * i + a * a) + t;
	}, e.prototype.getDistance = function(e) {
		return e === void 0 && (e = this.prevClients), ir(e);
	}, e.prototype.getScale = function(e) {
		return e === void 0 && (e = this.prevClients), ir(e) / ir(this.startClients);
	}, e.prototype.move = function(e, t) {
		this.startClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		}), this.prevClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		});
	}, e;
}(), lr = ["textarea", "input"], ur = /* @__PURE__ */ function(e) {
	Xn(t, e);
	function t(t, n) {
		n === void 0 && (n = {});
		var r = e.call(this) || this;
		r.options = {}, r.flag = !1, r.pinchFlag = !1, r.data = {}, r.isDrag = !1, r.isPinch = !1, r.clientStores = [], r.targets = [], r.prevTime = 0, r.doubleFlag = !1, r._useMouse = !1, r._useTouch = !1, r._useDrag = !1, r._dragFlag = !1, r._isTrusted = !1, r._isMouseEvent = !1, r._isSecondaryButton = !1, r._preventMouseEvent = !1, r._prevInputEvent = null, r._isDragAPI = !1, r._isIdle = !0, r._preventMouseEventId = 0, r._window = window, r.onDragStart = function(e, t) {
			if (t === void 0 && (t = !0), !(!r.flag && e.cancelable === !1)) {
				var n = e.type.indexOf("drag") >= -1;
				if (!(r.flag && n)) {
					r._isDragAPI = !0;
					var i = r.options, a = i.container, o = i.pinchOutside, s = i.preventWheelClick, c = i.preventRightClick, l = i.preventDefault, u = i.checkInput, d = i.dragFocusedInput, f = i.preventClickEventOnDragStart, p = i.preventClickEventOnDrag, m = i.preventClickEventByCondition, h = r._useTouch, g = !r.flag;
					if (r._isSecondaryButton = e.which === 3 || e.button === 2, s && (e.which === 2 || e.button === 1) || c && (e.which === 3 || e.button === 2)) return r.stop(), !1;
					if (g) {
						var _ = r._window.document.activeElement, v = e.target;
						if (v) {
							var y = v.tagName.toLowerCase(), b = lr.indexOf(y) > -1, x = v.isContentEditable;
							if (b || x) {
								if (u || !d && _ === v) return !1;
								if (_ && (_ === v || x && _.isContentEditable && _.contains(v))) if (d) v.blur();
								else return !1;
							} else if ((l || e.type === "touchstart") && _) {
								var S = _.tagName.toLowerCase();
								(_.isContentEditable || lr.indexOf(S) > -1) && _.blur();
							}
							(f || p || m) && St(r._window, "click", r._onClick, !0);
						}
						r.clientStores = [new cr(tr(e))], r._isIdle = !1, r.flag = !0, r.isDrag = !1, r._isTrusted = t, r._dragFlag = !0, r._prevInputEvent = e, r.data = {}, r.doubleFlag = et() - r.prevTime < 200, r._isMouseEvent = nr(e), !r._isMouseEvent && r._preventMouseEvent && r._allowMouseEvent(), (r._preventMouseEvent || r.emit("dragStart", Zn(Zn({
							data: r.data,
							datas: r.data,
							inputEvent: e,
							isMouseEvent: r._isMouseEvent,
							isSecondaryButton: r._isSecondaryButton,
							isTrusted: t,
							isDouble: r.doubleFlag
						}, r.getCurrentStore().getPosition()), {
							preventDefault: function() {
								e.preventDefault();
							},
							preventDrag: function() {
								r._dragFlag = !1;
							}
						}))) === !1 && r.stop(), r._isMouseEvent && r.flag && l && e.preventDefault();
					}
					if (!r.flag) return !1;
					var C = 0;
					if (g ? (r._attchDragEvent(), h && o && (C = setTimeout(function() {
						St(a, "touchstart", r.onDragStart, { passive: !1 });
					}))) : h && o && Ct(a, "touchstart", r.onDragStart), r.flag && er(e)) {
						if (clearTimeout(C), g && e.touches.length !== e.changedTouches.length) return;
						r.pinchFlag || r.onPinchStart(e);
					}
				}
			}
		}, r.onDrag = function(e, t) {
			if (r.flag) {
				var n = r.options.preventDefault;
				!r._isMouseEvent && n && e.preventDefault(), r._prevInputEvent = e;
				var i = tr(e), a = r.moveClients(i, e, !1);
				if (r._dragFlag) {
					if ((r.pinchFlag || a.deltaX || a.deltaY) && (r._preventMouseEvent || r.emit("drag", Zn(Zn({}, a), {
						isScroll: !!t,
						inputEvent: e
					}))) === !1) {
						r.stop();
						return;
					}
					r.pinchFlag && r.onPinch(e, i);
				}
				r.getCurrentStore().getPosition(i, !0);
			}
		}, r.onDragEnd = function(e) {
			if (r.flag) {
				var t = r.options, n = t.pinchOutside, i = t.container, a = t.preventClickEventOnDrag, o = t.preventClickEventOnDragStart, s = t.preventClickEventByCondition, c = r.isDrag;
				(a || o || s) && requestAnimationFrame(function() {
					r._allowClickEvent();
				}), !s && !o && a && !c && r._allowClickEvent(), r._useTouch && n && Ct(i, "touchstart", r.onDragStart), r.pinchFlag && r.onPinchEnd(e);
				var l = e?.touches ? tr(e) : [];
				l.length === 0 || !r.options.keepDragging ? r.flag = !1 : r._addStore(new cr(l));
				var u = r._getPosition(), d = et(), f = !c && r.doubleFlag;
				r._prevInputEvent = null, r.prevTime = c || f ? 0 : d, r.flag || (r._dettachDragEvent(), r._preventMouseEvent || r.emit("dragEnd", Zn({
					data: r.data,
					datas: r.data,
					isDouble: f,
					isDrag: c,
					isClick: !c,
					isMouseEvent: r._isMouseEvent,
					isSecondaryButton: r._isSecondaryButton,
					inputEvent: e,
					isTrusted: r._isTrusted
				}, u)), r.clientStores = [], r._isMouseEvent || (r._preventMouseEvent = !0, clearTimeout(r._preventMouseEventId), r._preventMouseEventId = setTimeout(function() {
					r._preventMouseEvent = !1;
				}, 200)), r._isIdle = !0);
			}
		}, r.onBlur = function() {
			r.onDragEnd();
		}, r._allowClickEvent = function() {
			Ct(r._window, "click", r._onClick, !0);
		}, r._onClick = function(e) {
			r._allowClickEvent(), r._allowMouseEvent();
			var t = r.options.preventClickEventByCondition;
			t?.(e) || (e.stopPropagation(), e.preventDefault());
		}, r._onContextMenu = function(e) {
			r.options.preventRightClick ? r.onDragEnd(e) : e.preventDefault();
		}, r._passCallback = function() {};
		var i = [].concat(t), a = i[0];
		r._window = Ot(a) ? a : Dt(a), r.options = Zn({
			checkInput: !1,
			container: a && !("document" in a) ? Dt(a) : a,
			preventRightClick: !0,
			preventWheelClick: !0,
			preventClickEventOnDragStart: !1,
			preventClickEventOnDrag: !1,
			preventClickEventByCondition: null,
			preventDefault: !0,
			checkWindowBlur: !1,
			keepDragging: !1,
			pinchThreshold: 0,
			events: ["touch", "mouse"]
		}, n);
		var o = r.options, s = o.container, c = o.events, l = o.checkWindowBlur;
		if (r._useDrag = c.indexOf("drag") > -1, r._useTouch = c.indexOf("touch") > -1, r._useMouse = c.indexOf("mouse") > -1, r.targets = i, r._useDrag && i.forEach(function(e) {
			St(e, "dragstart", r.onDragStart);
		}), r._useMouse && (i.forEach(function(e) {
			St(e, "mousedown", r.onDragStart), St(e, "mousemove", r._passCallback);
		}), St(s, "contextmenu", r._onContextMenu)), l && St(Dt(), "blur", r.onBlur), r._useTouch) {
			var u = { passive: !1 };
			i.forEach(function(e) {
				St(e, "touchstart", r.onDragStart, u), St(e, "touchmove", r._passCallback, u);
			});
		}
		return r;
	}
	return t.prototype.stop = function() {
		this.isDrag = !1, this.data = {}, this.clientStores = [], this.pinchFlag = !1, this.doubleFlag = !1, this.prevTime = 0, this.flag = !1, this._isIdle = !0, this._allowClickEvent(), this._dettachDragEvent(), this._isDragAPI = !1;
	}, t.prototype.getMovement = function(e) {
		return this.getCurrentStore().getMovement(e) + this.clientStores.slice(1).reduce(function(e, t) {
			return e + t.movement;
		}, 0);
	}, t.prototype.isDragging = function() {
		return this.isDrag;
	}, t.prototype.isIdle = function() {
		return this._isIdle;
	}, t.prototype.isFlag = function() {
		return this.flag;
	}, t.prototype.isPinchFlag = function() {
		return this.pinchFlag;
	}, t.prototype.isDoubleFlag = function() {
		return this.doubleFlag;
	}, t.prototype.isPinching = function() {
		return this.isPinch;
	}, t.prototype.scrollBy = function(e, t, n, r) {
		r === void 0 && (r = !0), this.flag && (this.clientStores[0].move(e, t), r && this.onDrag(n, !0));
	}, t.prototype.move = function(e, t) {
		var n = e[0], r = e[1], i = this.getCurrentStore().prevClients;
		return this.moveClients(i.map(function(e) {
			var t = e.clientX, i = e.clientY;
			return {
				clientX: t + n,
				clientY: i + r,
				originalClientX: t,
				originalClientY: i
			};
		}), t, !0);
	}, t.prototype.triggerDragStart = function(e) {
		this.onDragStart(e, !1);
	}, t.prototype.setEventData = function(e) {
		var t = this.data;
		for (var n in e) t[n] = e[n];
		return this;
	}, t.prototype.setEventDatas = function(e) {
		return this.setEventData(e);
	}, t.prototype.getCurrentEvent = function(e) {
		return e === void 0 && (e = this._prevInputEvent), Zn(Zn({
			data: this.data,
			datas: this.data
		}, this._getPosition()), {
			movement: this.getMovement(),
			isDrag: this.isDrag,
			isPinch: this.isPinch,
			isScroll: !1,
			inputEvent: e
		});
	}, t.prototype.getEventData = function() {
		return this.data;
	}, t.prototype.getEventDatas = function() {
		return this.data;
	}, t.prototype.unset = function() {
		var e = this, t = this.targets, n = this.options.container;
		this.off(), Ct(this._window, "blur", this.onBlur), this._useDrag && t.forEach(function(t) {
			Ct(t, "dragstart", e.onDragStart);
		}), this._useMouse && (t.forEach(function(t) {
			Ct(t, "mousedown", e.onDragStart);
		}), Ct(n, "contextmenu", this._onContextMenu)), this._useTouch && (t.forEach(function(t) {
			Ct(t, "touchstart", e.onDragStart);
		}), Ct(n, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
	}, t.prototype.onPinchStart = function(e) {
		var t = this, n = this.options.pinchThreshold;
		if (!(this.isDrag && this.getMovement() > n)) {
			var r = new cr(tr(e));
			this.pinchFlag = !0, this._addStore(r), this.emit("pinchStart", Zn(Zn({
				data: this.data,
				datas: this.data,
				angle: r.getAngle(),
				touches: this.getCurrentStore().getPositions()
			}, r.getPosition()), {
				inputEvent: e,
				isTrusted: this._isTrusted,
				preventDefault: function() {
					e.preventDefault();
				},
				preventDrag: function() {
					t._dragFlag = !1;
				}
			})) === !1 && (this.pinchFlag = !1);
		}
	}, t.prototype.onPinch = function(e, t) {
		if (!(!this.flag || !this.pinchFlag || t.length < 2)) {
			var n = this.getCurrentStore();
			this.isPinch = !0, this.emit("pinch", Zn(Zn({
				data: this.data,
				datas: this.data,
				movement: this.getMovement(t),
				angle: n.getAngle(t),
				rotation: n.getRotation(t),
				touches: n.getPositions(t),
				scale: n.getScale(t),
				distance: n.getDistance(t)
			}, n.getPosition(t)), {
				inputEvent: e,
				isTrusted: this._isTrusted
			}));
		}
	}, t.prototype.onPinchEnd = function(e) {
		if (this.pinchFlag) {
			var t = this.isPinch;
			this.isPinch = !1, this.pinchFlag = !1;
			var n = this.getCurrentStore();
			this.emit("pinchEnd", Zn(Zn({
				data: this.data,
				datas: this.data,
				isPinch: t,
				touches: n.getPositions()
			}, n.getPosition()), { inputEvent: e }));
		}
	}, t.prototype.getCurrentStore = function() {
		return this.clientStores[0];
	}, t.prototype.moveClients = function(e, t, n) {
		var r = this._getPosition(e, n), i = this.isDrag;
		(r.deltaX || r.deltaY) && (this.isDrag = !0);
		var a = !1;
		return !i && this.isDrag && (a = !0), Zn(Zn({
			data: this.data,
			datas: this.data
		}, r), {
			movement: this.getMovement(e),
			isDrag: this.isDrag,
			isPinch: this.isPinch,
			isScroll: !1,
			isMouseEvent: this._isMouseEvent,
			isSecondaryButton: this._isSecondaryButton,
			inputEvent: t,
			isTrusted: this._isTrusted,
			isFirstDrag: a
		});
	}, t.prototype._addStore = function(e) {
		this.clientStores.splice(0, 0, e);
	}, t.prototype._getPosition = function(e, t) {
		var n = this.getCurrentStore().getPosition(e, t), r = this.clientStores.slice(1).reduce(function(e, t) {
			var n = t.getPosition();
			return e.distX += n.distX, e.distY += n.distY, e;
		}, n), i = r.distX, a = r.distY;
		return Zn(Zn({}, n), {
			distX: i,
			distY: a
		});
	}, t.prototype._attchDragEvent = function() {
		var e = this._window, t = this.options.container, n = { passive: !1 };
		this._isDragAPI && (St(t, "dragover", this.onDrag, n), St(e, "dragend", this.onDragEnd)), this._useMouse && (St(t, "mousemove", this.onDrag), St(e, "mouseup", this.onDragEnd)), this._useTouch && (St(t, "touchmove", this.onDrag, n), St(e, "touchend", this.onDragEnd, n), St(e, "touchcancel", this.onDragEnd, n));
	}, t.prototype._dettachDragEvent = function() {
		var e = this._window, t = this.options.container;
		this._isDragAPI && (Ct(t, "dragover", this.onDrag), Ct(e, "dragend", this.onDragEnd)), this._useMouse && (Ct(t, "mousemove", this.onDrag), Ct(e, "mouseup", this.onDragEnd)), this._useTouch && (Ct(t, "touchstart", this.onDragStart), Ct(t, "touchmove", this.onDrag), Ct(e, "touchend", this.onDragEnd), Ct(e, "touchcancel", this.onDragEnd));
	}, t.prototype._allowMouseEvent = function() {
		this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
	}, t;
}(En);
//#endregion
//#region node_modules/css-styled/dist/styled.esm.js
function dr(e) {
	for (var t = 5381, n = e.length; n;) t = t * 33 ^ e.charCodeAt(--n);
	return t >>> 0;
}
var fr = dr;
function pr(e) {
	return fr(e).toString(36);
}
function mr(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function hr(e, t, n) {
	return n.original ? t : t.replace(/([^};{\s}][^};{]*|^\s*){/gm, function(t, n) {
		var r = n.trim();
		return (r ? Xe(r) : [""]).map(function(t) {
			var n = t.trim();
			return n.indexOf("@") === 0 ? n : n.indexOf(":global") > -1 ? n.replace(/\:global/g, "") : n.indexOf(":host") > -1 ? `${n.replace(/\:host/g, `.${e}`)}` : n ? `.${e} ${n}` : `.${e}`;
		}).join(", ") + " {";
	});
}
function gr(e, t, n, r, i) {
	var a = wt(r), o = a.createElement("style");
	return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", e), o.setAttribute("data-styled-count", "1"), n.nonce && o.setAttribute("nonce", n.nonce), o.innerHTML = hr(e, t, n), (i || a.head || a.body).appendChild(o), o;
}
function _r(e) {
	var t = "rCS" + pr(e);
	return {
		className: t,
		inject: function(n, r) {
			r === void 0 && (r = {});
			var i = mr(n), a = (i || n.ownerDocument || document).querySelector(`style[data-styled-id="${t}"]`);
			if (!a) a = gr(t, e, r, n, i);
			else {
				var o = parseFloat(a.getAttribute("data-styled-count")) || 0;
				a.setAttribute("data-styled-count", `${o + 1}`);
			}
			return { destroy: function() {
				var e, t = parseFloat(a.getAttribute("data-styled-count")) || 0;
				t <= 1 ? (a.remove ? a.remove() : (e = a.parentNode) == null || e.removeChild(a), a = null) : a.setAttribute("data-styled-count", `${t - 1}`);
			} };
		}
	};
}
//#endregion
//#region node_modules/react-css-styled/dist/styled.esm.js
var vr = function() {
	return vr = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, vr.apply(this, arguments);
};
function yr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function br(e, t) {
	var n = _r(t), r = n.className;
	return (0, R.forwardRef)(function(t, i) {
		var a = t.className, o = a === void 0 ? "" : a;
		t.cspNonce;
		var s = yr(t, ["className", "cspNonce"]), c = (0, R.useRef)();
		return (0, R.useImperativeHandle)(i, function() {
			return c.current;
		}, []), (0, R.useEffect)(function() {
			var e = n.inject(c.current, { nonce: t.cspNonce });
			return function() {
				e.destroy();
			};
		}, []), (0, R.createElement)(e, vr({
			ref: c,
			"data-styled-id": r,
			className: `${o} ${r}`
		}, s));
	});
}
//#endregion
//#region node_modules/react-moveable/dist/moveable.esm.js
var xr = function(e, t) {
	return xr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, xr(e, t);
};
function Sr(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	xr(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var q = function() {
	return q = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, q.apply(this, arguments);
};
function Cr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function wr(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
function Tr(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function J(e, t) {
	var n = typeof Symbol == "function" && e[Symbol.iterator];
	if (!n) return e;
	var r = n.call(e), i, a = [], o;
	try {
		for (; (t === void 0 || t-- > 0) && !(i = r.next()).done;) a.push(i.value);
	} catch (e) {
		o = { error: e };
	} finally {
		try {
			i && !i.done && (n = r.return) && n.call(r);
		} finally {
			if (o) throw o.error;
		}
	}
	return a;
}
function Y(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
function Er(e, t) {
	return q({
		events: [],
		props: [],
		name: e
	}, t);
}
var Dr = [
	"n",
	"w",
	"s",
	"e"
], Or = [
	"n",
	"w",
	"s",
	"e",
	"nw",
	"ne",
	"sw",
	"se"
];
function kr(e, t) {
	return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${32 * e}px" height="${32 * e}px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${t}deg);transform-origin: 16px 16px"></path></svg>`;
}
function Ar(e) {
	var t = kr(1, e), n = Math.round(e / 45) * 45 % 180, r = "ns-resize";
	return n === 135 ? r = "nwse-resize" : n === 45 ? r = "nesw-resize" : n === 90 && (r = "ew-resize"), `cursor:${r};cursor: url('${t}') 16 16, ${r};`;
}
var jr = xe(), Mr = jr.browser.webkit, Nr = Mr && (function() {
	var e = typeof window > "u" ? { userAgent: "" } : window.navigator, t = /applewebkit\/([^\s]+)/g.exec(e.userAgent.toLowerCase());
	return t ? parseFloat(t[1]) < 605 : !1;
})(), Pr = jr.browser.name, Fr = parseInt(jr.browser.version, 10), Ir = Pr === "chrome", Lr = jr.browser.chromium, Rr = parseInt(jr.browser.chromiumVersion, 10) || 0, zr = Ir && Fr >= 109 || Lr && Rr >= 109, Br = Pr === "firefox", Vr = parseInt(jr.browser.webkitVersion, 10) >= 612 || Fr >= 15, Hr = "moveable-", Ur = `
{
position: absolute;
width: 1px;
height: 1px;
left: 0;
top: 0;
z-index: 3000;
--moveable-color: #4af;
--zoom: 1;
--zoompx: 1px;
--moveable-line-padding: 0;
--moveable-control-padding: 0;
will-change: transform;
outline: 1px solid transparent;
}
.control-box {
z-index: 0;
}
.line, .control {
position: absolute;
left: 0;
top: 0;
will-change: transform;
}
.control {
width: 14px;
height: 14px;
border-radius: 50%;
border: 2px solid #fff;
box-sizing: border-box;
background: #4af;
background: var(--moveable-color);
margin-top: -7px;
margin-left: -7px;
border: 2px solid #fff;
z-index: 10;
}
.around-control {
position: absolute;
will-change: transform;
width: calc(var(--moveable-control-padding, 20) * 1px);
height: calc(var(--moveable-control-padding, 20) * 1px);
left: calc(var(--moveable-control-padding, 20) * -0.5px);
top: calc(var(--moveable-control-padding, 20) * -0.5px);
box-sizing: border-box;
background: transparent;
z-index: 8;
cursor: alias;
transform-origin: center center;
}
${Or.map(function(e) {
	var t = "", n = "", r = "center", i = "center", a = "calc(var(--moveable-control-padding, 20) * -1px)";
	return e.indexOf("n") > -1 && (t = `top: ${a};`, i = "bottom"), e.indexOf("s") > -1 && (t = "top: 0px;", i = "top"), e.indexOf("w") > -1 && (n = `left: ${a};`, r = "right"), e.indexOf("e") > -1 && (n = "left: 0px;", r = "left"), `.around-control[data-direction*="${e}"] {
        ${n}${t}
        transform-origin: ${r} ${i};
    }`;
}).join("\n")}
.padding {
position: absolute;
top: 0px;
left: 0px;
width: 100px;
height: 100px;
transform-origin: 0 0;
}
.line {
width: 1px;
height: 1px;
background: #4af;
background: var(--moveable-color);
transform-origin: 0px 50%;
}
.line.edge {
z-index: 1;
background: transparent;
}
.line.dashed {
box-sizing: border-box;
background: transparent;
}
.line.dashed.horizontal {
border-top: 1px dashed #4af;
border-top-color: #4af;
border-top-color: var(--moveable-color);
}
.line.dashed.vertical {
border-left: 1px dashed #4af;
border-left-color: #4af;
border-left-color: var(--moveable-color);
}
.line.vertical {
transform: translateX(-50%);
}
.line.horizontal {
transform: translateY(-50%);
}
.line.vertical.bold {
width: 2px;
}
.line.horizontal.bold {
height: 2px;
}

.control.origin {
border-color: #f55;
background: #fff;
width: 12px;
height: 12px;
margin-top: -6px;
margin-left: -6px;
pointer-events: none;
}
${[
	0,
	15,
	30,
	45,
	60,
	75,
	90,
	105,
	120,
	135,
	150,
	165
].map(function(e) {
	return `
.direction[data-rotation="${e}"], :global .view-control-rotation${e} {
${Ar(e)}
}
`;
}).join("\n")}

.line.direction:before {
content: "";
position: absolute;
width: 100%;
height: calc(var(--moveable-line-padding, 0) * 1px);
bottom: 0;
left: 0;
}
.group {
z-index: -1;
}
.area {
position: absolute;
}
.area-pieces {
position: absolute;
top: 0;
left: 0;
display: none;
}
.area.avoid, .area.pass {
pointer-events: none;
}
.area.avoid+.area-pieces {
display: block;
}
.area-piece {
position: absolute;
}

${Nr ? ":global svg *:before {\ncontent:\"\";\ntransform-origin: inherit;\n}" : ""}
`, Wr = [
	[
		0,
		1,
		2
	],
	[
		1,
		0,
		3
	],
	[
		2,
		0,
		3
	],
	[
		3,
		1,
		2
	]
], Gr = 1e-4, Kr = 1e-7, qr = 1e-9, Jr = 10 ** 10, Yr = -Jr, Xr = {
	n: [0, -1],
	e: [1, 0],
	s: [0, 1],
	w: [-1, 0],
	nw: [-1, -1],
	ne: [1, -1],
	sw: [-1, 1],
	se: [1, 1]
}, Zr = {
	n: [0, 1],
	e: [1, 3],
	s: [3, 2],
	w: [2, 0],
	nw: [0],
	ne: [1],
	sw: [2],
	se: [3]
}, Qr = {
	n: 0,
	s: 180,
	w: 270,
	e: 90,
	nw: 315,
	ne: 45,
	sw: 225,
	se: 135
}, $r = [
	"isMoveableElement",
	"updateRect",
	"updateTarget",
	"destroy",
	"dragStart",
	"isInside",
	"hitTest",
	"setState",
	"getRect",
	"request",
	"isDragging",
	"getManager",
	"forceUpdate",
	"waitToChangeTarget",
	"updateSelectors",
	"getTargets",
	"stopDrag",
	"getControlBoxElement",
	"getMoveables",
	"getDragElement"
];
function ei(e, t, n, r, i, a) {
	a === void 0 && (a = "draggable");
	var o = t.gestos[a]?.move(n, e.inputEvent) ?? {}, s = o.originalDatas || o.datas, c = s[a] || (s[a] = {});
	return q(q({}, i ? uc(t, o) : o), {
		isPinch: !!r,
		parentEvent: !0,
		datas: c,
		originalDatas: e.originalDatas
	});
}
var ti = /* @__PURE__ */ function() {
	function e(e) {
		var t;
		e === void 0 && (e = "draggable"), this.ableName = e, this.prevX = 0, this.prevY = 0, this.startX = 0, this.startY = 0, this.isDrag = !1, this.isFlag = !1, this.datas = { draggable: {} }, this.datas = (t = {}, t[e] = {}, t);
	}
	return e.prototype.dragStart = function(e, t) {
		this.isDrag = !1, this.isFlag = !1;
		var n = t.originalDatas;
		return this.datas = n, n[this.ableName] || (n[this.ableName] = {}), q(q({}, this.move(e, t.inputEvent)), { type: "dragstart" });
	}, e.prototype.drag = function(e, t) {
		return this.move([e[0] - this.prevX, e[1] - this.prevY], t);
	}, e.prototype.move = function(e, t) {
		var n, r, i = !1;
		if (!this.isFlag) this.prevX = e[0], this.prevY = e[1], this.startX = e[0], this.startY = e[1], n = e[0], r = e[1], this.isFlag = !0;
		else {
			var a = this.isDrag;
			n = this.prevX + e[0], r = this.prevY + e[1], (e[0] || e[1]) && (this.isDrag = !0), !a && this.isDrag && (i = !0);
		}
		return this.prevX = n, this.prevY = r, {
			type: "drag",
			clientX: n,
			clientY: r,
			inputEvent: t,
			isFirstDrag: i,
			isDrag: this.isDrag,
			distX: n - this.startX,
			distY: r - this.startY,
			deltaX: e[0],
			deltaY: e[1],
			datas: this.datas[this.ableName],
			originalDatas: this.datas,
			parentEvent: !0,
			parentGesto: this
		};
	}, e;
}();
function ni(e, t, n, r) {
	var i = e.length === 16 ? 4 : 3, a = J(Os(e, n, r, i), 4), o = J(a[0], 2), s = o[0], c = o[1], l = J(a[1], 2), u = l[0], d = l[1], f = J(a[2], 2), p = f[0], m = f[1], h = J(a[3], 2), g = h[0], _ = h[1], v = J(Ds(e, t, i), 2), y = v[0], b = v[1], x = Math.min(s, u, p, g), S = Math.min(c, d, m, _), C = Math.max(s, u, p, g), w = Math.max(c, d, m, _);
	s = s - x || 0, u = u - x || 0, p = p - x || 0, g = g - x || 0, c = c - S || 0, d = d - S || 0, m = m - S || 0, _ = _ - S || 0, y = y - x || 0, b = b - S || 0;
	var T = e[0], E = e[i + 1], D = kc(T * E);
	return {
		left: x,
		top: S,
		right: C,
		bottom: w,
		origin: [y, b],
		pos1: [s, c],
		pos2: [u, d],
		pos3: [p, m],
		pos4: [g, _],
		direction: D
	};
}
function ri(e, t) {
	var n = t.clientX, r = t.clientY, i = t.datas, a = e.state, o = a.moveableClientRect, s = a.rootMatrix, c = a.is3d, l = a.pos1, u = o.left, d = o.top, f = c ? 4 : 3, p = J(K(lc(s, [n - u, r - d], f), l), 2), m = p[0], h = p[1], g = J(di({
		datas: i,
		distX: m,
		distY: h
	}), 2);
	return [g[0], g[1]];
}
function ii(e, t) {
	var n = t.datas, r = e.state, i = r.allMatrix, a = r.beforeMatrix, o = r.is3d, s = r.left, c = r.top, l = r.origin, u = r.offsetMatrix, d = r.targetMatrix, f = r.transformOrigin, p = o ? 4 : 3;
	n.is3d = o, n.matrix = i, n.targetMatrix = d, n.beforeMatrix = a, n.offsetMatrix = u, n.transformOrigin = f, n.inverseMatrix = Pt(i, p), n.inverseBeforeMatrix = Pt(a, p), n.absoluteOrigin = Rt(Ht([s, c], l), p), n.startDragBeforeDist = Gt(n.inverseBeforeMatrix, n.absoluteOrigin, p), n.startDragDist = Gt(n.inverseMatrix, n.absoluteOrigin, p);
}
function ai(e) {
	return ni(e.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function oi(e, t, n) {
	var r = t.datas, i = t.originalDatas.beforeRenderable, a = r.transformIndex, o = i.nextTransforms, s = o.length, c = i.nextTransformAppendedIndexes, l = -1;
	a === -1 ? (n === "translate" ? l = 0 : n === "rotate" && (l = tt(o, function(e) {
		return e.match(/scale\(/g);
	})), l === -1 && (l = o.length), r.transformIndex = l) : l = nt(c, function(e) {
		return e.index === a && e.functionName === n;
	}) ? a : a + c.filter(function(e) {
		return e.index < a;
	}).length;
	var u = gc(o, e.state, l), d = u.targetFunction, f = n === "rotate" ? "rotateZ" : n;
	r.beforeFunctionTexts = u.beforeFunctionTexts, r.afterFunctionTexts = u.afterFunctionTexts, r.beforeTransform = u.beforeFunctionMatrix, r.beforeTransform2 = u.beforeFunctionMatrix2, r.targetTansform = u.targetFunctionMatrix, r.afterTransform = u.afterFunctionMatrix, r.afterTransform2 = u.afterFunctionMatrix2, r.targetAllTransform = u.allFunctionMatrix, d.functionName === f ? (r.afterFunctionTexts.splice(0, 1), r.isAppendTransform = !1) : s > l && (r.isAppendTransform = !0, i.nextTransformAppendedIndexes = Y(Y([], J(c), !1), [{
		functionName: n,
		index: l,
		isAppend: !0
	}], !1));
}
function si(e, t, n) {
	return `${e.beforeFunctionTexts.join(" ")} ${e.isAppendTransform ? n : t} ${e.afterFunctionTexts.join(" ")}`;
}
function ci(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = J(ui({
		datas: t,
		distX: n,
		distY: r
	}), 2), a = i[0], o = i[1];
	return Gt(li(t, Lt([a, o], 4)), Rt([
		0,
		0,
		0
	], 4), 4);
}
function li(e, t, n) {
	var r = e.beforeTransform, i = e.afterTransform, a = e.beforeTransform2, o = e.afterTransform2, s = e.targetAllTransform, c = n ? Vt(s, t, 4) : Vt(t, s, 4);
	return Vt(Vt(Pt(n ? a : r, 4), c, 4), Pt(n ? o : i, 4), 4);
}
function ui(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = t.inverseBeforeMatrix, a = t.is3d, o = t.startDragBeforeDist, s = t.absoluteOrigin, c = a ? 4 : 3;
	return K(Gt(i, Ht(s, [n, r]), c), o);
}
function di(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.inverseBeforeMatrix, o = n.inverseMatrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return K(Gt(t ? a : o, Ht(u, [r, i]), d), t ? c : l);
}
function fi(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.beforeMatrix, o = n.matrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return K(Gt(t ? a : o, Ht(t ? c : l, [r, i]), d), u);
}
function pi(e, t, n, r, i, a) {
	return r === void 0 && (r = t), i === void 0 && (i = n), a === void 0 && (a = [0, 0]), e ? e.map(function(e, o) {
		var s = Qe(e), c = s.value, l = s.unit, u = o ? i : r, d = o ? n : t;
		return e === "%" || isNaN(c) ? d * (u ? a[o] / u : 0) : l === "%" ? d * c / 100 : c;
	}) : a;
}
function mi(e) {
	var t = [];
	return e[1] >= 0 && (e[0] >= 0 && t.push(3), e[0] <= 0 && t.push(2)), e[1] <= 0 && (e[0] >= 0 && t.push(1), e[0] <= 0 && t.push(0)), t;
}
function hi(e, t) {
	return mi(t).map(function(t) {
		return e[t];
	});
}
function gi(e, t) {
	var n = (t + 1) / 2;
	return [Le(e[0][0], e[1][0], n, 1 - n), Le(e[0][1], e[1][1], n, 1 - n)];
}
function _i(e, t) {
	return gi([gi([e[0], e[1]], t[0]), gi([e[2], e[3]], t[0])], t[1]);
}
function vi(e, t, n, r, i, a) {
	var o = _i(Os(t, n, r, i), a);
	return [e[0] - o[0], e[1] - o[1]];
}
function yi(e, t, n, r) {
	return Vt(e, fs(t, r, n), r);
}
function bi(e, t, n, r) {
	var i = e.transformOrigin, a = e.offsetMatrix, o = e.is3d ? 4 : 3, s;
	if (Ve(n)) {
		var c = t.beforeTransform, l = t.afterTransform;
		s = zt(r ? sn(n) : Vt(Vt(c, sn([n]), 4), l, 4), 4, o);
	} else s = n;
	return yi(a, s, i, o);
}
function xi(e, t) {
	var n = e.transformOrigin, r = e.offsetMatrix, i = e.is3d, a = e.targetMatrix, o = e.targetAllTransform, s = i ? 4 : 3;
	return yi(r, Vt(o || a, tn(t, s), s), n, s);
}
function Si(e, t) {
	var n = Ei(t);
	return {
		setTransform: function(r, i) {
			i === void 0 && (i = -1), n.startTransforms = Be(r) ? r : Ye(r), wi(e, t, i);
		},
		setTransformIndex: function(n) {
			wi(e, t, n);
		}
	};
}
function Ci(e, t, n) {
	var r = Ei(t).startTransforms;
	wi(e, t, tt(r, function(e) {
		return e.indexOf(`${n}(`) === 0;
	}));
}
function wi(e, t, n) {
	var r = Ei(t), i = t.datas;
	if (i.transformIndex = n, n !== -1) {
		var a = r.startTransforms[n];
		if (a) {
			var o = e.state;
			i.startValue = un([a], {
				"x%": function(e) {
					return e / 100 * o.offsetWidth;
				},
				"y%": function(e) {
					return e / 100 * o.offsetHeight;
				}
			})[0].functionValue;
		}
	}
}
function Ti(e, t) {
	var n = Ei(e);
	n.nextTransforms = Ye(t);
}
function Ei(e) {
	return e.originalDatas.beforeRenderable;
}
function Di(e) {
	return e.originalDatas.beforeRenderable.nextTransforms;
}
function Oi(e) {
	return (Di(e) || []).join(" ");
}
function ki(e) {
	return Ei(e).nextStyle;
}
function Ai(e, t, n, r, i) {
	Ti(i, t);
	var a = go.drag(e, ei(i, e.state, n, r, !1)), o = a ? a.transform : t;
	return q(q({
		transform: t,
		drag: a
	}, Zs({ transform: o }, i)), { afterTransform: o });
}
function ji(e, t, n, r, i, a) {
	return Fi(e, n, r, bi(e.state, i, t, a));
}
function Mi(e, t, n, r, i, a, o) {
	var s = ji(e, t, n, i, a, o), c = e.state, l = c.left, u = c.top, d = e.props.groupable, f = d ? l : 0, p = d ? u : 0;
	return K(K(r, s), [f, p]);
}
function Ni(e, t, n, r, i, a, o) {
	return Mi(e, t, n, r, i, a, o);
}
function Pi(e, t, n) {
	return [t ? -1 + e[0] / (t / 2) : 0, n ? -1 + e[1] / (n / 2) : 0];
}
function Fi(e, t, n, r) {
	r === void 0 && (r = e.state.allMatrix);
	var i = e.state, a = i.width, o = i.height, s = i.is3d ? 4 : 3, c = [a / 2 * (1 + t[0]) + n[0], o / 2 * (1 + t[1]) + n[1]];
	return Ds(r, c, s);
}
function Ii(e, t, n) {
	var r = n.fixedDirection, i = n.fixedPosition, a = n.fixedOffset;
	return Mi(e, `rotate(${t}deg)`, r, i, a, n);
}
function Li(e, t, n, r, i, a) {
	var o = e.props.groupable, s = e.state, c = s.transformOrigin, l = s.offsetMatrix, u = s.is3d, d = s.width, f = s.height, p = s.left, m = s.top, h = a.fixedDirection, g = a.nextTargetMatrix || s.targetMatrix, _ = u ? 4 : 3, v = pi(i, t, n, d, f, c), y = o ? p : 0, b = o ? m : 0;
	return K(vi(r, yi(l, g, v, _), t, n, _, h), [y, b]);
}
function Ri(e, t) {
	return _i(Js(e.state), t);
}
function zi(e, t) {
	var n = e.targetGesto, r = e.controlGesto, i;
	return n?.isFlag() && (i = n.getEventData()[t]), !i && r?.isFlag() && (i = r.getEventData()[t]), i || {};
}
function Bi(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function Vi(e) {
	var t = e("scale"), n = e("rotate"), r = e("translate"), i = [];
	return r && r !== "0px" && r !== "none" && i.push(`translate(${r.split(/\s+/).join(",")})`), n && n !== "1" && n !== "none" && i.push(`rotate(${n})`), t && t !== "1" && t !== "none" && i.push(`scale(${t.split(/\s+/).join(",")})`), i;
}
function Hi(e, t, n) {
	for (var r = e, i = [], a = Tt(e) || Et(e), o = !n && e === t || e === a, s = o, c = !1, l = 3, u, d, f, p = !1, m = vs(t, t, !0).offsetParent, h = 1; r && !s;) {
		s = o;
		var g = Yi(r), _ = g("position"), v = _s(r), y = _ === "fixed", b = Vi(g), x = Ut(ds(v)), S = void 0, C = !1, w = !1, T = 0, E = 0, D = 0, O = 0, k = {
			hasTransform: !1,
			fixedContainer: null
		};
		y && (p = !0, k = Ss(r), m = k.fixedContainer);
		var A = x.length;
		!c && (A === 16 || b.length) && (c = !0, l = 4, xs(i), f &&= zt(f, 3, 4)), c && A === 9 && (x = zt(x, 3, 4));
		var j = ys(r, e), M = j.tagName, N = j.hasOffset, P = j.isSVG, F = j.origin, I = j.targetOrigin, L = j.offset, R = J(L, 2), z = R[0], B = R[1];
		M === "svg" && !r.ownerSVGElement && f && (i.push({
			type: "target",
			target: r,
			matrix: Ts(r, l)
		}), i.push({
			type: "offset",
			target: r,
			matrix: en(l)
		}));
		var ee = parseFloat(g("zoom")) || 1;
		if (y) S = k.fixedContainer, C = !0;
		else {
			var V = vs(r, t, !1, !0, g), te = V.offsetZoom;
			if (S = V.offsetParent, C = V.isEnd, w = V.isStatic, h *= te, (V.isCustomElement || te !== 1) && w) z -= S.offsetLeft, B -= S.offsetTop;
			else if ((Br || zr) && V.parentSlotElement) {
				for (var ne = S, re = 0, H = 0; ne && Bi(ne);) re += ne.offsetLeft, H += ne.offsetTop, ne = ne.offsetParent;
				z -= re, B -= H;
			}
		}
		if (Mr && !Vr && N && !P && w && (_ === "relative" || _ === "static") && (z -= S.offsetLeft, B -= S.offsetTop, o ||= C), y) N && k.hasTransform && (D = S.clientLeft, O = S.clientTop);
		else if (N && m !== S && (T = S.clientLeft, E = S.clientTop), N && S === a) {
			var U = bs(r, !1);
			z += U[0], B += U[1];
		}
		if (i.push({
			type: "target",
			target: r,
			matrix: fs(x, l, F)
		}), b.length && (i.push({
			type: "offset",
			target: r,
			matrix: en(l)
		}), i.push({
			type: "target",
			target: r,
			matrix: fs(sn(b), l, F)
		})), N) {
			var ie = r === e, W = ie ? 0 : r.scrollLeft, ae = ie ? 0 : r.scrollTop;
			i.push({
				type: "offset",
				target: r,
				matrix: nn([z - W + T - D, B - ae + E - O], l)
			});
		} else i.push({
			type: "offset",
			target: r,
			origin: F
		});
		if (ee !== 1 && i.push({
			type: "zoom",
			target: r,
			matrix: fs(tn([ee, ee], l), l, [0, 0])
		}), f ||= x, u ||= F, d ||= I, s || y) break;
		r = S, o = C, (!n || r === a) && (s = o);
	}
	return f ||= en(l), u ||= [0, 0], d ||= [0, 0], {
		zoom: h,
		offsetContainer: m,
		matrixes: i,
		targetMatrix: f,
		transformOrigin: u,
		targetOrigin: d,
		is3d: c,
		hasFixed: p
	};
}
var Ui = null, Wi = null, Gi = null;
function Ki(e) {
	e ? (window.Map && (Ui = /* @__PURE__ */ new Map(), Wi = /* @__PURE__ */ new Map()), Gi = []) : (Ui = null, Gi = null, Wi = null);
}
function qi(e) {
	var t = Wi?.get(e);
	if (t) return t;
	var n = Us(e, !0);
	return Wi && Wi.set(e, n), n;
}
function Ji(e, t) {
	if (Gi) {
		var n = nt(Gi, function(n) {
			return n[0][0] == e && n[0][1] == t;
		});
		if (n) return n[1];
	}
	var r = Hi(e, t, !0);
	return Gi && Gi.push([[e, t], r]), r;
}
function Yi(e) {
	var t = Ui?.get(e);
	if (!t) {
		var n = Dt(e).getComputedStyle(e);
		if (!Ui) return function(e) {
			return n[e];
		};
		t = {
			style: n,
			cached: {}
		}, Ui.set(e, t);
	}
	var r = t.cached, i = t.style;
	return function(e) {
		return e in r || (r[e] = i[e]), r[e];
	};
}
function Xi(e, t, n) {
	var r = n.originalDatas;
	r.groupable = r.groupable || {};
	var i = r.groupable;
	i.childDatas = i.childDatas || [];
	var a = i.childDatas;
	return e.moveables.map(function(e, r) {
		return a[r] = a[r] || {}, a[r][t] = a[r][t] || {}, q(q({}, n), {
			isRequestChild: !0,
			datas: a[r][t],
			originalDatas: a[r]
		});
	});
}
function Zi(e, t, n, r, i, a, o) {
	var s = !!n.match(/Start$/g), c = !!n.match(/End$/g), l = i.isPinch, u = i.datas, d = Xi(e, t.name, i), f = e.moveables, p = [], m = d.map(function(e, i) {
		var d = f[i], m = d.state, h = m.gestos, g = e;
		if (s) g = new ti(o).dragStart(r, e), p.push(g);
		else {
			if (h[o] || (h[o] = u.childGestos[i]), !h[o]) return;
			g = ei(e, m, r, l, a, o), p.push(g);
		}
		var _ = t[n](d, q(q({}, g), { parentFlag: !0 }));
		return c && (h[o] = null), _;
	});
	return s && (u.childGestos = f.map(function(e) {
		return e.state.gestos[o];
	})), {
		eventParams: m,
		childEvents: p
	};
}
function Qi(e, t, n, r, i, a) {
	i === void 0 && (i = function(e, t) {
		return t;
	});
	var o = !!n.match(/End$/g), s = Xi(e, t.name, r), c = e.moveables;
	return s.map(function(e, r) {
		var s = c[r], l = e;
		l = i(s, e);
		var u = t[n](s, q(q({}, l), { parentFlag: !0 }));
		return u && a && a(s, e, u, r), o && (s.state.gestos = {}), u;
	});
}
function $i(e, t, n, r) {
	var i = n.fixedDirection, a = n.fixedPosition, o = _i(r.datas.startPositions || Js(t.state), i), s = J(Gt($t(-e.rotation / 180 * Math.PI, 3), [
		o[0] - a[0],
		o[1] - a[1],
		1
	], 3), 2), c = s[0], l = s[1];
	return r.datas.originalX = c, r.datas.originalY = l, r;
}
function ea(e, t, n, r) {
	var i = e.getState(), a = i.renderPoses, o = i.rotation, s = i.direction, c = Ls(e.props, t).zoom, l = Qo(o / Math.PI * 180), u = {}, d = e.renderState;
	d.renderDirectionMap ||= {};
	var f = d.renderDirectionMap;
	n.forEach(function(e) {
		var t = e.dir;
		u[t] = !0;
	});
	var p = kc(s);
	return n.map(function(e) {
		var n = e.data, i = e.classNames, s = e.dir, d = Zr[s];
		if (!d || !u[s]) return null;
		f[s] = !0;
		var m = (G(l, 15) + p * Qr[s] + 720) % 180, h = {};
		return at(n).forEach(function(e) {
			h[`data-${e}`] = n[e];
		}), r.createElement("div", q({
			className: X.apply(void 0, Y([
				"control",
				"direction",
				s,
				t
			], J(i), !1)),
			"data-rotation": m,
			"data-direction": s
		}, h, {
			key: `direction-${s}`,
			style: Is.apply(void 0, Y([o, c], J(d.map(function(e) {
				return a[e];
			})), !1))
		}));
	});
}
function ta(e, t, n, r) {
	var i = Ls(e.props, n), a = i.renderDirections, o = a === void 0 ? t : a, s = i.displayAroundControls;
	if (!o) return [];
	var c = o === !0 ? Or : o;
	return Y(Y([], J(s ? sa(e, r, n, c) : []), !1), J(ea(e, n, c.map(function(e) {
		return {
			data: {},
			classNames: [],
			dir: e
		};
	}), r)), !1);
}
function na(e, t, n, r, i, a) {
	var o = [...arguments].slice(6), s = ft(n, r), c = t ? G(s / Math.PI * 180, 15) % 180 : -1;
	return e.createElement("div", {
		key: `line-${a}`,
		className: X.apply(void 0, Y([
			"line",
			"direction",
			t ? "edge" : "",
			t
		], J(o), !1)),
		"data-rotation": c,
		"data-line-key": a,
		"data-direction": t,
		style: Fs(n, r, i, s)
	});
}
function ra(e, t, n, r, i) {
	return (n === !0 ? Dr : n).map(function(n, a) {
		var o = J(Zr[n], 2), s = o[0], c = o[1];
		if (c != null) return na(e, n, r[s], r[c], i, `${t}Edge${a}`, t);
	}).filter(Boolean);
}
function ia(e) {
	return function(t, n) {
		var r = Ls(t.props, e).edge;
		return r && (r === !0 || r.length) ? Y(Y([], J(ra(n, e, r, t.getState().renderPoses, t.props.zoom)), !1), J(oa(t, e, n)), !1) : aa(t, e, n);
	};
}
function aa(e, t, n) {
	return ta(e, Or, t, n);
}
function oa(e, t, n) {
	return ta(e, [
		"nw",
		"ne",
		"sw",
		"se"
	], t, n);
}
function sa(e, t, n, r) {
	var i = e.renderState;
	i.renderDirectionMap ||= {};
	var a = e.getState(), o = a.renderPoses, s = a.rotation, c = a.direction, l = i.renderDirectionMap, u = e.props.zoom, d = kc(c), f = s / Math.PI * 180;
	return (r || at(l)).map(function(e) {
		var r = Zr[e];
		if (!r) return null;
		var i = (G(f, 15) + d * Qr[e] + 720) % 180, a = ["around-control"];
		return n && a.push("direction", n), t.createElement("div", {
			className: X.apply(void 0, Y([], J(a), !1)),
			"data-rotation": i,
			"data-direction": e,
			key: `direction-around-${e}`,
			style: Is.apply(void 0, Y([s, u], J(r.map(function(e) {
				return o[e];
			})), !1))
		});
	});
}
function ca(e, t, n) {
	var r = e || {}, i = r.position, a = i === void 0 ? "client" : i, o = r.left, s = o === void 0 ? -Infinity : o, c = r.top, l = c === void 0 ? -Infinity : c, u = r.right, d = u === void 0 ? Infinity : u, f = r.bottom, p = {
		position: a,
		left: s,
		top: l,
		right: d,
		bottom: f === void 0 ? Infinity : f
	};
	return {
		vertical: da(p, t, !0),
		horizontal: da(p, n, !1)
	};
}
function la(e, t) {
	var n = e.state, r = n.containerClientRect, i = r.clientHeight, a = r.clientWidth, o = r.clientLeft, s = r.clientTop, c = n.snapOffset, l = c.left, u = c.top, d = c.right, f = c.bottom, p = t || e.props.bounds || {}, m = (p.position || "client") === "css", h = p.left, g = h === void 0 ? -Infinity : h, _ = p.top, v = _ === void 0 ? -Infinity : _, y = p.right, b = y === void 0 ? m ? -Infinity : Infinity : y, x = p.bottom, S = x === void 0 ? m ? -Infinity : Infinity : x;
	return m && (b = a + d - l - b, S = i + f - u - S), {
		left: g + l - o,
		right: b + l - o,
		top: v + u - s,
		bottom: S + u - s
	};
}
function ua(e, t, n) {
	var r = la(e), i = r.left, a = r.top, o = r.right, s = r.bottom, c = J(n, 2), l = c[0], u = c[1], d = J(K(n, t), 2), f = d[0], p = d[1];
	$(f) < Kr && (f = 0), $(p) < Kr && (p = 0);
	var m = p > 0, h = f > 0, g = {
		isBound: !1,
		offset: 0,
		pos: 0
	}, _ = {
		isBound: !1,
		offset: 0,
		pos: 0
	};
	if (f === 0 && p === 0) return {
		vertical: g,
		horizontal: _
	};
	if (f === 0) m ? s < u && (_.pos = s, _.offset = u - s) : a > u && (_.pos = a, _.offset = u - a);
	else if (p === 0) h ? o < l && (g.pos = o, g.offset = l - o) : i > l && (g.pos = i, g.offset = l - i);
	else {
		var v = p / f, y = n[1] - v * l, b = 0, x = 0, S = !1;
		h && o <= l ? (b = v * o + y, x = o, S = !0) : !h && l <= i && (b = v * i + y, x = i, S = !0), S && (b < a || b > s) && (S = !1), S || (m && s <= u ? (b = s, x = (b - y) / v, S = !0) : !m && u <= a && (b = a, x = (b - y) / v, S = !0)), S && (g.isBound = !0, g.pos = x, g.offset = l - x, _.isBound = !0, _.pos = b, _.offset = u - b);
	}
	return {
		vertical: g,
		horizontal: _
	};
}
function da(e, t, n) {
	var r = e[n ? "left" : "top"], i = e[n ? "right" : "bottom"], a = Math.min.apply(Math, Y([], J(t), !1)), o = Math.max.apply(Math, Y([], J(t), !1)), s = [];
	return r + 1 > a && s.push({
		direction: "start",
		isBound: !0,
		offset: a - r,
		pos: r
	}), i - 1 < o && s.push({
		direction: "end",
		isBound: !0,
		offset: o - i,
		pos: i
	}), s.length || s.push({
		isBound: !1,
		offset: 0,
		pos: 0
	}), s.sort(function(e, t) {
		return $(t.offset) - $(e.offset);
	});
}
function fa(e, t, n) {
	return (n ? e.map(function(e) {
		return Xt(e, n);
	}) : e).some(function(e) {
		return e[0] < t.left && $(e[0] - t.left) > .1 || e[0] > t.right && $(e[0] - t.right) > .1 || e[1] < t.top && $(e[1] - t.top) > .1 || e[1] > t.bottom && $(e[1] - t.bottom) > .1;
	});
}
function pa(e, t, n) {
	var r = Ns(e), i = Math.sqrt(r * r - t * t) || 0;
	return [i, -i].sort(function(t, r) {
		return $(t - e[+!n]) - $(r - e[+!n]);
	}).map(function(e) {
		return ft([0, 0], n ? [e, t] : [t, e]);
	});
}
function ma(e, t, n, r, i) {
	if (!e.props.bounds) return [];
	var a = i * Math.PI / 180, o = la(e), s = o.left, c = o.top, l = o.right, u = o.bottom, d = s - r[0], f = l - r[0], p = c - r[1], m = u - r[1], h = {
		left: d,
		top: p,
		right: f,
		bottom: m
	};
	if (!fa(n, h, 0)) return [];
	var g = [];
	return [
		[d, 0],
		[f, 0],
		[p, 1],
		[m, 1]
	].forEach(function(e) {
		var r = J(e, 2), i = r[0], o = r[1];
		n.forEach(function(e) {
			var n = ft([0, 0], e);
			g.push.apply(g, Y([], J(pa(e, i, o).map(function(e) {
				return a + e - n;
			}).filter(function(e) {
				return !fa(t, h, e);
			}).map(function(e) {
				return G(e * 180 / Math.PI, Kr);
			})), !1));
		});
	}), g;
}
var ha = [
	"left",
	"right",
	"center"
], ga = [
	"top",
	"bottom",
	"middle"
], _a = {
	left: "start",
	right: "end",
	center: "center",
	top: "start",
	bottom: "end",
	middle: "center"
}, va = {
	start: "left",
	end: "right",
	center: "center"
}, ya = {
	start: "top",
	end: "bottom",
	center: "middle"
};
function ba() {
	return {
		left: !1,
		top: !1,
		right: !1,
		bottom: !1
	};
}
function xa(e, t) {
	var n = e.props, r = n.snappable, i = n.bounds, a = n.innerBounds, o = n.verticalGuidelines, s = n.horizontalGuidelines, c = n.snapGridWidth, l = n.snapGridHeight, u = e.state, d = u.guidelines, f = u.enableSnap;
	return !r || !f || t && r !== !0 && r.indexOf(t) < 0 ? !1 : !!(c || l || i || a || d && d.length || o && o.length || s && s.length);
}
function Sa(e) {
	return e === !1 ? {} : e === !0 || !e ? {
		left: !0,
		right: !0,
		top: !0,
		bottom: !0
	} : e;
}
function Ca(e, t) {
	var n = Sa(e), r = {};
	for (var i in n) i in t && n[i] && (r[i] = t[i]);
	return r;
}
function wa(e, t) {
	var n = Ca(e, t), r = ga.filter(function(e) {
		return e in n;
	}), i = ha.filter(function(e) {
		return e in n;
	});
	return {
		horizontalNames: r,
		verticalNames: i,
		horizontal: r.map(function(e) {
			return n[e];
		}),
		vertical: i.map(function(e) {
			return n[e];
		})
	};
}
function Ta(e, t, n) {
	var r = Ds(e, [t.clientLeft, t.clientTop], n);
	return [t.left + r[0], t.top + r[1]];
}
function Ea(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	Math.abs(i) < 1e-7 && (i = 0), Math.abs(a) < 1e-7 && (a = 0);
	var o = 0, s = 0, c = 0;
	return i ? a ? (o = -a / i, s = 1, c = o * n[0] - n[1]) : (s = 1, c = -n[1]) : (o = -1, c = n[0]), [
		o,
		s,
		c
	].map(function(e) {
		return G(e, Pe);
	});
}
var Da = "snapRotationThreshold", Oa = "snapRotationDegrees", ka = "snapHorizontalThreshold", Aa = "snapVerticalThreshold";
function ja(e, t, n, r, i, a, o) {
	r === void 0 && (r = []), i === void 0 && (i = []);
	var s = e.props, c = e.state.snapThresholdInfo?.multiples || [1, 1], l = ic(o, s[ka], 5), u = ic(a, s[Aa], 5);
	return Ma(e.state.guidelines, t, n, r, i, l, u, c);
}
function Ma(e, t, n, r, i, a, o, s) {
	return {
		vertical: La(e, "vertical", t, o * s[0], r),
		horizontal: La(e, "horizontal", n, a * s[1], i)
	};
}
function Na(e, t, n) {
	var r = J(n, 2), i = r[0], a = r[1], o = J(t, 2), s = o[0], c = o[1], l = J(K(n, t), 2), u = l[0], d = l[1], f = d > 0, p = u > 0;
	u = pc(u), d = pc(d);
	var m = {
		isSnap: !1,
		offset: 0,
		pos: 0
	}, h = {
		isSnap: !1,
		offset: 0,
		pos: 0
	};
	if (u === 0 && d === 0) return {
		vertical: m,
		horizontal: h
	};
	var g = ja(e, u ? [i] : [], d ? [a] : [], [], [], void 0, void 0), _ = g.vertical, v = g.horizontal;
	_.posInfos.filter(function(e) {
		var t = e.pos;
		return p ? t >= s : t <= s;
	}), v.posInfos.filter(function(e) {
		var t = e.pos;
		return f ? t >= c : t <= c;
	}), _.isSnap = _.posInfos.length > 0, v.isSnap = v.posInfos.length > 0;
	var y = Ia(_), b = y.isSnap, x = y.guideline, S = Ia(v), C = S.isSnap, w = S.guideline, T = C ? w.pos[1] : 0, E = b ? x.pos[0] : 0;
	if (u === 0) C && (h.isSnap = !0, h.pos = w.pos[1], h.offset = a - h.pos);
	else if (d === 0) b && (m.isSnap = !0, m.pos = E, m.offset = i - E);
	else {
		var D = d / u, O = n[1] - D * i, k = 0, A = 0, j = !1;
		b ? (A = E, k = D * A + O, j = !0) : C && (k = T, A = (k - O) / D, j = !0), j && (m.isSnap = !0, m.pos = A, m.offset = i - A, h.isSnap = !0, h.pos = k, h.offset = a - k);
	}
	return {
		vertical: m,
		horizontal: h
	};
}
function Pa(e) {
	var t = "";
	return e === -1 || e === "top" || e === "left" ? t = "start" : e === 0 || e === "center" || e === "middle" ? t = "center" : (e === 1 || e === "right" || e === "bottom") && (t = "end"), t;
}
function Fa(e, t, n, r) {
	var i = wa(e.props.snapDirections, t), a = ja(e, i.vertical, i.horizontal, i.verticalNames.map(function(e) {
		return Pa(e);
	}), i.horizontalNames.map(function(e) {
		return Pa(e);
	}), n, r), o = Pa(i.horizontalNames[a.horizontal.index]), s = Pa(i.verticalNames[a.vertical.index]);
	return {
		vertical: q(q({}, a.vertical), { direction: s }),
		horizontal: q(q({}, a.horizontal), { direction: o })
	};
}
function Ia(e) {
	var t = e.isSnap;
	if (!t) return {
		isSnap: !1,
		offset: 0,
		dist: -1,
		pos: 0,
		guideline: null
	};
	var n = e.posInfos[0], r = n.guidelineInfos[0], i = r.offset, a = r.dist, o = r.guideline;
	return {
		isSnap: t,
		offset: i,
		dist: a,
		pos: n.pos,
		guideline: o
	};
}
function La(e, t, n, r, i) {
	if (i === void 0 && (i = []), !e || !e.length) return {
		isSnap: !1,
		index: -1,
		direction: "",
		posInfos: []
	};
	var a = t === "vertical" ? 0 : 1, o = n.map(function(n, o) {
		var s = i[o] || "";
		return {
			pos: n,
			index: o,
			guidelineInfos: e.map(function(e) {
				var t = n - e.pos[a];
				return {
					offset: t,
					dist: $(t),
					guideline: e,
					direction: s
				};
			}).filter(function(e) {
				var n = e.guideline, i = e.dist;
				return !(n.type !== t || i > r);
			}).sort(function(e, t) {
				return e.dist - t.dist;
			}),
			direction: s
		};
	}).filter(function(e) {
		return e.guidelineInfos.length > 0;
	}).sort(function(e, t) {
		return e.guidelineInfos[0].dist - t.guidelineInfos[0].dist;
	}), s = o.length > 0;
	return {
		isSnap: s,
		index: s ? o[0].index : -1,
		direction: o[0]?.direction ?? "",
		posInfos: o
	};
}
function Ra(e, t, n, r, i) {
	var a = [];
	n[0] && n[1] ? a = [
		n,
		[-n[0], n[1]],
		[n[0], -n[1]]
	] : !n[0] && !n[1] ? [
		[-1, -1],
		[1, -1],
		[1, 1],
		[-1, 1]
	].forEach(function(e, t, n) {
		var r = n[t + 1] || n[0];
		a.push(e), a.push([(e[0] + r[0]) / 2, (e[1] + r[1]) / 2]);
	}) : e.props.keepRatio ? a.push([-1, -1], [-1, 1], [1, -1], [1, 1], n) : (a.push.apply(a, Y([], J(hi([
		[-1, -1],
		[1, -1],
		[-1, -1],
		[1, 1]
	], n)), !1)), a.length > 1 && a.push([(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2]));
	var o = a.map(function(e) {
		return _i(t, e);
	}), s = ja(e, o.map(function(e) {
		return e[0];
	}), o.map(function(e) {
		return e[1];
	}), a.map(function(e) {
		return Pa(e[0]);
	}), a.map(function(e) {
		return Pa(e[1]);
	}), r, i), c = Pa(a.map(function(e) {
		return e[0];
	})[s.vertical.index]), l = Pa(a.map(function(e) {
		return e[1];
	})[s.horizontal.index]);
	return {
		vertical: q(q({}, s.vertical), { direction: c }),
		horizontal: q(q({}, s.horizontal), { direction: l })
	};
}
function za(e, t) {
	var n = $(e.offset), r = $(t.offset);
	return e.isBound && t.isBound ? r - n : e.isBound ? -1 : t.isBound ? 1 : e.isSnap && t.isSnap ? r - n : e.isSnap ? -1 : t.isSnap || n < Kr ? 1 : r < Kr ? -1 : n - r;
}
function Ba(e, t) {
	return e.slice().sort(function(e, n) {
		var r = e.sign[t], i = n.sign[t], a = e.offset[t], o = n.offset[t];
		return r ? i ? za({
			isBound: e.isBound,
			isSnap: e.isSnap,
			offset: a
		}, {
			isBound: n.isBound,
			isSnap: n.isSnap,
			offset: o
		}) : -1 : 1;
	})[0];
}
function Va(e, t, n) {
	var r = [];
	if (n) $(t[0]) !== 1 || $(t[1]) !== 1 ? r.push([t, [-1, -1]], [t, [-1, 1]], [t, [1, -1]], [t, [1, 1]]) : r.push([t, [e[0], -e[1]]], [t, [-e[0], e[1]]]), r.push([t, e]);
	else if (e[0] && e[1] || !e[0] && !e[1]) {
		var i = e[0] ? e : [1, 1];
		[1, -1].forEach(function(e) {
			[1, -1].forEach(function(n) {
				var a = [e * i[0], n * i[1]];
				(t[0] !== a[0] || t[1] !== a[1]) && r.push([t, a]);
			});
		});
	} else if (e[0]) {
		var a = $(t[0]) === 1 ? [1] : [1, -1];
		a.forEach(function(n) {
			r.push([[t[0], -1], [n * e[0], -1]], [[t[0], 0], [n * e[0], 0]], [[t[0], 1], [n * e[0], 1]]);
		});
	} else if (e[1]) {
		var a = $(t[1]) === 1 ? [1] : [1, -1];
		a.forEach(function(n) {
			r.push([[-1, t[1]], [-1, n * e[1]]], [[0, t[1]], [0, n * e[1]]], [[1, t[1]], [1, n * e[1]]]);
		});
	}
	return r;
}
function Ha(e, t) {
	var n = dt([t[0][0], t[1][0]]), r = dt([t[0][1], t[1][1]]);
	return {
		vertical: n <= e[0],
		horizontal: r <= e[1]
	};
}
function Ua(e, t) {
	var n = J(t, 2), r = n[0], i = n[1], a = i[0] - r[0], o = i[1] - r[1];
	$(a) < Kr && (a = 0), $(o) < Kr && (o = 0);
	var s, c;
	return a ? o ? (s = o / a * (e[0] - r[0]) + r[1], c = e[1]) : (s = r[1], c = e[1]) : (s = r[0], c = e[0]), s - c;
}
function Wa(e, t, n, r) {
	return r === void 0 && (r = Kr), e.every(function(e) {
		var i = Ua(e, t);
		return i <= 0 === n || $(i) <= r;
	});
}
function Ga(e, t, n, r, i) {
	return i === void 0 && (i = 0), r && t - i <= e || !r && e <= n + i ? {
		isBound: !0,
		offset: r ? t - e : n - e
	} : {
		isBound: !1,
		offset: 0
	};
}
function Ka(e, t) {
	var n = t.line, r = t.centerSign, i = t.verticalSign, a = t.horizontalSign, o = t.lineConstants, s = e.props.innerBounds;
	if (!s) return {
		isAllBound: !1,
		isBound: !1,
		isVerticalBound: !1,
		isHorizontalBound: !1,
		offset: [0, 0]
	};
	var c = s.left, l = s.top, u = s.width, d = s.height, f = [[c, l], [c, l + d]], p = [[c, l], [c + u, l]], m = [[c + u, l], [c + u, l + d]], h = [[c, l + d], [c + u, l + d]];
	if (Wa([
		[c, l],
		[c + u, l],
		[c, l + d],
		[c + u, l + d]
	], n, r)) return {
		isAllBound: !1,
		isBound: !1,
		isVerticalBound: !1,
		isHorizontalBound: !1,
		offset: [0, 0]
	};
	var g = qa(n, o, p, i), _ = qa(n, o, h, i), v = qa(n, o, f, a), y = qa(n, o, m, a), b = g.isBound && _.isBound, x = g.isBound || _.isBound, S = v.isBound && y.isBound, C = v.isBound || y.isBound, w = cc(g.offset, _.offset), T = cc(v.offset, y.offset), E = [0, 0], D = !1, O = !1;
	return $(T) < $(w) ? (E = [w, 0], D = x, O = b) : (E = [0, T], D = C, O = S), {
		isAllBound: O,
		isVerticalBound: x,
		isHorizontalBound: C,
		isBound: D,
		offset: E
	};
}
function qa(e, t, n, r, i, a) {
	var o = J(t, 2), s = o[0], c = o[1], l = e[0], u = n[0], d = n[1], f = pc(d[1] - u[1]), p = pc(d[0] - u[0]), m = c, h = s, g = -s / c;
	if (!p) {
		if (a && !h) return {
			isBound: !1,
			offset: 0
		};
		if (m) return Ga(g * (u[0] - l[0]) + l[1], u[1], d[1], r, i);
		var _ = u[0] - l[0], v = $(_) <= (i || 0);
		return {
			isBound: v,
			offset: v ? _ : 0
		};
	}
	if (!f) {
		if (a && !m) return {
			isBound: !1,
			offset: 0
		};
		if (h) return Ga((u[1] - l[1]) / g + l[0], u[0], d[0], r, i);
		var _ = u[1] - l[1], v = $(_) <= (i || 0);
		return {
			isBound: v,
			offset: v ? _ : 0
		};
	}
	return {
		isBound: !1,
		offset: 0
	};
}
function Ja(e, t, n) {
	return t.map(function(t) {
		var r = Ka(e, t), i = r.isBound, a = r.offset, o = r.isVerticalBound, s = r.isHorizontalBound, c = t.multiple;
		return {
			sign: c,
			isBound: i,
			isVerticalBound: o,
			isHorizontalBound: s,
			isSnap: !1,
			offset: di({
				datas: n,
				distX: a[0],
				distY: a[1]
			}).map(function(e, t) {
				return e * (c[t] ? 2 / c[t] : 0);
			})
		};
	});
}
function Ya(e, t, n) {
	var r, i = Ja(e, Za(e, t, [0, 0], !1).map(function(e) {
		return q(q({}, e), { multiple: e.multiple.map(function(e) {
			return $(e) * 2;
		}) });
	}), n), a = Ba(i, 0), o = Ba(i, 1), s = 0, c = 0, l = a.isVerticalBound || o.isVerticalBound, u = a.isHorizontalBound || o.isHorizontalBound;
	return (l || u) && (r = J(fi({
		datas: n,
		distX: -a.offset[0],
		distY: -o.offset[1]
	}), 2), s = r[0], c = r[1]), {
		vertical: {
			isBound: l,
			offset: s
		},
		horizontal: {
			isBound: u,
			offset: c
		}
	};
}
function Xa(e, t) {
	var n = [], r = e[0], i = e[1];
	return r && i ? n.push([
		[0, i * 2],
		e,
		[-r, i]
	], [
		[r * 2, 0],
		e,
		[r, -i]
	]) : r ? (n.push([
		[r * 2, 0],
		[r, 1],
		[r, -1]
	]), t && n.push([
		[0, -1],
		[r, -1],
		[-r, -1]
	], [
		[0, 1],
		[r, 1],
		[-r, 1]
	])) : i ? (n.push([
		[0, i * 2],
		[1, i],
		[-1, i]
	]), t && n.push([
		[-1, 0],
		[-1, i],
		[-1, -i]
	], [
		[1, 0],
		[1, i],
		[1, -i]
	])) : n.push([
		[-1, 0],
		[-1, -1],
		[-1, 1]
	], [
		[1, 0],
		[1, -1],
		[1, 1]
	], [
		[0, -1],
		[-1, -1],
		[1, -1]
	], [
		[0, 1],
		[-1, 1],
		[1, 1]
	]), n;
}
function Za(e, t, n, r) {
	var i = e.state, a = i.allMatrix, o = i.is3d, s = Os(a, 100, 100, o ? 4 : 3), c = _i(s, [0, 0]);
	return Xa(n, r).map(function(e) {
		var n = J(e, 3), r = n[0], i = n[1], a = n[2], o = [_i(s, i), _i(s, a)], l = Ea(o), u = Ha(c, o), d = u.vertical, f = u.horizontal;
		return {
			multiple: r,
			centerSign: Ua(c, o) <= 0,
			verticalSign: d,
			horizontalSign: f,
			lineConstants: l,
			line: [_i(t, i), _i(t, a)]
		};
	});
}
function Qa(e, t, n, r) {
	var i = r ? e.map(function(e) {
		return Xt(e, r);
	}) : e;
	return [
		[i[0], i[1]],
		[i[1], i[3]],
		[i[3], i[2]],
		[i[2], i[0]]
	].some(function(e) {
		return !Wa(t, e, Ua(n, e) <= 0);
	});
}
function $a(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return $(n[0]);
	if (!a) return $(n[1]);
	var o = a / i;
	return $((-o * n[0] + n[1]) / Math.sqrt(o ** 2 + 1));
}
function eo(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return [n[0], 0];
	if (!a) return [0, n[1]];
	var o = a / i, s = -o * n[0] + n[1];
	return [-s / (o + 1 / o), s / (o * o + 1)];
}
function to(e, t, n, r, i) {
	var a = e.props.innerBounds, o = i * Math.PI / 180;
	if (!a) return [];
	var s = a.left, c = a.top, l = a.width, u = a.height, d = s - r[0], f = s + l - r[0], p = c - r[1], m = c + u - r[1], h = [
		[d, p],
		[f, p],
		[d, m],
		[f, m]
	], g = _i(n, [0, 0]);
	if (!Qa(n, h, g, 0)) return [];
	var _ = [], v = h.map(function(e) {
		return [Ns(e), ft([0, 0], e)];
	});
	return [
		[n[0], n[1]],
		[n[1], n[3]],
		[n[3], n[2]],
		[n[2], n[0]]
	].forEach(function(e) {
		var n = ft([0, 0], eo(e)), r = $a(e);
		_.push.apply(_, Y([], J(v.filter(function(e) {
			var t = J(e, 1)[0];
			return t && r <= t;
		}).map(function(e) {
			var t = J(e, 2), i = t[0], a = t[1], s = Math.acos(i ? r / i : 0), c = a + s, l = a - s;
			return [o + c - n, o + l - n];
		}).reduce(function(e, t) {
			return e.push.apply(e, Y([], J(t), !1)), e;
		}, []).filter(function(e) {
			return !Qa(t, h, g, e);
		}).map(function(e) {
			return G(e * 180 / Math.PI, Kr);
		})), !1));
	}), _;
}
function no(e) {
	var t = e.props.innerBounds, n = ba();
	if (!t) return {
		boundMap: n,
		vertical: [],
		horizontal: []
	};
	var r = e.getRect(), i = [
		r.pos1,
		r.pos2,
		r.pos3,
		r.pos4
	], a = _i(i, [0, 0]), o = t.left, s = t.top, c = t.width, l = t.height, u = [[o, s], [o, s + l]], d = [[o, s], [o + c, s]], f = [[o + c, s], [o + c, s + l]], p = [[o, s + l], [o + c, s + l]], m = Za(e, i, [0, 0], !1), h = [], g = [];
	return m.forEach(function(e) {
		var t = e.line, r = e.lineConstants, i = Ha(a, t), m = i.horizontal, _ = i.vertical, v = qa(t, r, d, _, 1, !0), y = qa(t, r, p, _, 1, !0), b = qa(t, r, u, m, 1, !0), x = qa(t, r, f, m, 1, !0);
		v.isBound && !n.top && (h.push(s), n.top = !0), y.isBound && !n.bottom && (h.push(s + l), n.bottom = !0), b.isBound && !n.left && (g.push(o), n.left = !0), x.isBound && !n.right && (g.push(o + c), n.right = !0);
	}), {
		boundMap: n,
		horizontal: h,
		vertical: g
	};
}
function ro(e, t, n, r) {
	var i = t[0] - e[0], a = t[1] - e[1];
	if ($(i) < 1e-7 && (i = 0), $(a) < 1e-7 && (a = 0), !i) return r ? [0, 0] : [0, n];
	if (!a) return r ? [n, 0] : [0, 0];
	var o = a / i, s = e[1] - o * e[0];
	return r ? [n, o * (t[0] + n) + s - t[1]] : [(t[1] + n - s) / o - t[0], n];
}
function io(e, t, n, r, i) {
	var a = ro(e, t, n, r);
	if (!a) return {
		isOutside: !1,
		offset: [0, 0]
	};
	var o = ht(e, t), s = ht(a, e), c = ht(a, t), l = s > o || c > o, u = J(di({
		datas: i,
		distX: a[0],
		distY: a[1]
	}), 2);
	return {
		offset: [u[0], u[1]],
		isOutside: l
	};
}
function ao(e, t) {
	return e.isBound ? e.offset : t.isSnap ? Ia(t).offset : 0;
}
function oo(e, t, n, r, i) {
	var a = J(t, 2), o = a[0], s = a[1], c = J(n, 2), l = c[0], u = c[1], d = J(r, 2), f = d[0], p = d[1], m = J(i, 2), h = m[0], g = m[1], _ = -h, v = -g;
	if (e && o && s) {
		_ = 0, v = 0;
		var y = [];
		if (l && u ? y.push([0, g], [h, 0]) : l ? y.push([h, 0]) : u ? y.push([0, g]) : f && p ? y.push([0, g], [h, 0]) : f ? y.push([h, 0]) : p && y.push([0, g]), y.length) {
			y.sort(function(e, t) {
				return Ns(K([o, s], e)) - Ns(K([o, s], t));
			});
			var b = y[0];
			if (b[0] && $(o) > 1e-7) _ = -b[0], v = s * $(o + _) / $(o) - s;
			else if (b[1] && $(s) > 1e-7) {
				var x = s;
				v = -b[1], _ = o * $(s + v) / $(x) - o;
			}
			if (e && u && l) if ($(_) > 1e-7 && $(_) < $(h)) {
				var S = $(h) / $(_);
				_ *= S, v *= S;
			} else if ($(v) > 1e-7 && $(v) < $(g)) {
				var S = $(g) / $(v);
				_ *= S, v *= S;
			} else _ = cc(-h, _), v = cc(-g, v);
		}
	} else _ = o || l ? -h : 0, v = s || u ? -g : 0;
	return [_, v];
}
function so(e, t, n, r, i, a) {
	if (!xa(e, "draggable")) return [{
		isSnap: !1,
		isBound: !1,
		offset: 0
	}, {
		isSnap: !1,
		isBound: !1,
		offset: 0
	}];
	var o = qs(a.absolutePoses, [t, n]), s = ks(o), c = s.left, l = s.right, u = s.top, d = s.bottom, f = {
		horizontal: o.map(function(e) {
			return e[1];
		}),
		vertical: o.map(function(e) {
			return e[0];
		})
	}, p = co(e, i, wa(Sa(e.props.snapDirections), {
		left: c,
		right: l,
		top: u,
		bottom: d,
		center: (c + l) / 2,
		middle: (u + d) / 2
	}), f), m = p.vertical, h = p.horizontal, g = Ya(e, o, a), _ = g.vertical, v = g.horizontal, y = m.isSnap, b = h.isSnap, x = m.isBound || _.isBound, S = h.isBound || v.isBound, C = cc(m.offset, _.offset), w = cc(h.offset, v.offset), T = J(oo(r, [t, n], [x, S], [y, b], [C, w]), 2), E = T[0], D = T[1];
	return [{
		isBound: x,
		isSnap: y,
		offset: E
	}, {
		isBound: S,
		isSnap: b,
		offset: D
	}];
}
function co(e, t, n, r) {
	r === void 0 && (r = n);
	var i = ca(la(e), r.vertical, r.horizontal), a = i.horizontal, o = i.vertical, s = t ? {
		horizontal: {
			isSnap: !1,
			index: -1
		},
		vertical: {
			isSnap: !1,
			index: -1
		}
	} : ja(e, n.vertical, n.horizontal, void 0, void 0, void 0, void 0), c = s.horizontal, l = s.vertical, u = ao(a[0], c), d = ao(o[0], l), f = $(u), p = $(d);
	return {
		horizontal: {
			isBound: a[0].isBound,
			isSnap: c.isSnap,
			snapIndex: c.index,
			offset: u,
			dist: f,
			bounds: a,
			snap: c
		},
		vertical: {
			isBound: o[0].isBound,
			isSnap: l.isSnap,
			snapIndex: l.index,
			offset: d,
			dist: p,
			bounds: o,
			snap: l
		}
	};
}
function lo(e, t, n, r, i, a, o) {
	o === void 0 && (o = [1, 1]);
	var s = ca(t, n, r), c = s.horizontal, l = s.vertical, u = Ma(e, n, r, [], [], i, a, o), d = u.horizontal, f = u.vertical, p = ao(c[0], d), m = ao(l[0], f), h = $(p), g = $(m);
	return {
		horizontal: {
			isBound: c[0].isBound,
			isSnap: d.isSnap,
			snapIndex: d.index,
			offset: p,
			dist: h,
			bounds: c,
			snap: d
		},
		vertical: {
			isBound: l[0].isBound,
			isSnap: f.isSnap,
			snapIndex: f.index,
			offset: m,
			dist: g,
			bounds: l,
			snap: f
		}
	};
}
function uo(e, t, n, r) {
	var i = ft(e, t) / Math.PI * 180, a = n.vertical, o = a.isBound, s = a.isSnap, c = a.dist, l = n.horizontal, u = l.isBound, d = l.isSnap, f = l.dist, p = i % 180, m = p < 3 || p > 177, h = p > 87 && p < 93;
	return f < c && (o || s && !h && (!r || !m)) ? "vertical" : u || d && !m && (!r || !h) ? "horizontal" : "";
}
function fo(e, t, n, r, i, a) {
	return n.map(function(n) {
		var o = J(n, 2), s = o[0], c = o[1], l = _i(t, s), u = _i(t, c), d = r ? mo(e, l, u, i) : co(e, i, {
			vertical: [u[0]],
			horizontal: [u[1]]
		}), f = d.horizontal, p = f.offset, m = f.isBound, h = f.isSnap, g = d.vertical, _ = g.offset, v = g.isBound, y = g.isSnap, b = K(c, s);
		if (!_ && !p) return {
			isBound: v || m,
			isSnap: y || h,
			sign: b,
			offset: [0, 0]
		};
		var x = uo(l, u, d, r);
		if (!x) return {
			sign: b,
			isBound: !1,
			isSnap: !1,
			offset: [0, 0]
		};
		var S = x === "vertical", C = [0, 0];
		return C = !r && $(c[0]) === 1 && $(c[1]) === 1 && s[0] !== c[0] && s[1] !== c[1] ? di({
			datas: a,
			distX: -_,
			distY: -p
		}) : io(l, u, -(S ? _ : p), S, a).offset, C = C.map(function(e, t) {
			return e * (b[t] ? 2 / b[t] : 0);
		}), {
			sign: b,
			isBound: S ? v : m,
			isSnap: S ? y : h,
			offset: C
		};
	});
}
function po(e, t) {
	return e.isBound ? e.offset : t.isSnap ? t.offset : 0;
}
function mo(e, t, n, r) {
	var i = ua(e, t, n), a = i.horizontal, o = i.vertical, s = r ? {
		horizontal: { isSnap: !1 },
		vertical: { isSnap: !1 }
	} : Na(e, t, n), c = s.horizontal, l = s.vertical, u = po(a, c), d = po(o, l), f = $(u), p = $(d);
	return {
		horizontal: {
			isBound: a.isBound,
			isSnap: c.isSnap,
			offset: u,
			dist: f
		},
		vertical: {
			isBound: o.isBound,
			isSnap: l.isSnap,
			offset: d,
			dist: p
		}
	};
}
function ho(e, t, n, r, i) {
	var a = [-n[0], -n[1]], o = e.state, s = o.width, c = o.height, l = e.props.bounds, u = Infinity, d = Infinity;
	if (l) {
		var f = [[n[0], -n[1]], [-n[0], n[1]]], p = l.left, m = p === void 0 ? -Infinity : p, h = l.top, g = h === void 0 ? -Infinity : h, _ = l.right, v = _ === void 0 ? Infinity : _, y = l.bottom, b = y === void 0 ? Infinity : y;
		f.forEach(function(e) {
			var n = e[0] !== a[0], o = e[1] !== a[1], l = _i(t, e), f = ft(r, l) * 360 / Math.PI;
			if (o) {
				var p = l.slice();
				($(f - 360) < 2 || $(f - 180) < 2) && (p[1] = r[1]);
				var h = io(r, p, (r[1] < l[1] ? b : g) - l[1], !1, i), _ = J(h.offset, 2)[1], y = h.isOutside;
				isNaN(_) || (d = c + (y ? 1 : -1) * $(_));
			}
			if (n) {
				var p = l.slice();
				($(f - 90) < 2 || $(f - 270) < 2) && (p[0] = r[0]);
				var x = io(r, p, (r[0] < l[0] ? v : m) - l[0], !0, i), S = J(x.offset, 1)[0], C = x.isOutside;
				isNaN(S) || (u = s + (C ? 1 : -1) * $(S));
			}
		});
	}
	return {
		maxWidth: u,
		maxHeight: d
	};
}
var go = {
	name: "draggable",
	props: [
		"draggable",
		"throttleDrag",
		"throttleDragRotate",
		"hideThrottleDragRotateLine",
		"startDragRotate",
		"edgeDraggable"
	],
	events: [
		"dragStart",
		"drag",
		"dragEnd",
		"dragGroupStart",
		"dragGroup",
		"dragGroupEnd"
	],
	requestStyle: function() {
		return [
			"left",
			"top",
			"right",
			"bottom"
		];
	},
	requestChildStyle: function() {
		return [
			"left",
			"top",
			"right",
			"bottom"
		];
	},
	render: function(e, t) {
		var n = e.props, r = n.hideThrottleDragRotateLine, i = n.throttleDragRotate, a = n.zoom, o = e.getState(), s = o.dragInfo, c = o.beforeOrigin;
		if (r || !i || !s) return [];
		var l = s.dist;
		if (!l[0] && !l[1]) return [];
		var u = Ns(l), d = ft(l, [0, 0]);
		return [t.createElement("div", {
			className: X("line", "horizontal", "dragline", "dashed"),
			key: "dragRotateGuideline",
			style: {
				width: `${u}px`,
				transform: `translate(${c[0]}px, ${c[1]}px) rotate(${d}rad) scaleY(${a})`
			}
		})];
	},
	dragStart: function(e, t) {
		var n = t.datas, r = t.parentEvent, i = t.parentGesto, a = e.state, o = a.gestos, s = a.style;
		if (o.draggable) return !1;
		o.draggable = i || e.targetGesto, n.datas = {}, n.left = parseFloat(s.left || "") || 0, n.top = parseFloat(s.top || "") || 0, n.bottom = parseFloat(s.bottom || "") || 0, n.right = parseFloat(s.right || "") || 0, n.startValue = [0, 0], ii(e, t), Ci(e, t, "translate"), is(e, n), n.prevDist = [0, 0], n.prevBeforeDist = [0, 0], n.isDrag = !1, n.deltaOffset = [0, 0];
		var c = Z(e, t, q({ set: function(e) {
			n.startValue = e;
		} }, Si(e, t)));
		return (r || Q(e, "onDragStart", c)) === !1 ? (o.draggable = null, n.isPinch = !1) : (n.isDrag = !0, e.state.dragInfo = {
			startRect: e.getRect(),
			dist: [0, 0]
		}), n.isDrag ? c : !1;
	},
	drag: function(e, t) {
		if (t) {
			oi(e, t, "translate");
			var n = t.datas, r = t.parentEvent, i = t.parentFlag, a = t.isPinch, o = t.deltaOffset, s = t.useSnap, c = t.isRequest, l = t.isGroup, u = t.parentThrottleDrag, d = t.distX, f = t.distY, p = n.isDrag, m = n.prevDist, h = n.prevBeforeDist, g = n.startValue;
			if (p) {
				o && (d += o[0], f += o[1]);
				var _ = e.props, v = _.parentMoveable, y = l ? 0 : _.throttleDrag || u || 0, b = r ? 0 : _.throttleDragRotate || 0, x = 0, S = !1, C = !1, w = !1, T = !1;
				if (!r && b > 0 && (d || f)) {
					var E = _.startDragRotate || 0, D = G(E + ft([0, 0], [d, f]) * 180 / Math.PI, b) - E, O = f * Math.abs(Math.cos((D - 90) / 180 * Math.PI)), k = Ns([d * Math.abs(Math.cos(D / 180 * Math.PI)), O]);
					x = D * Math.PI / 180, d = k * Math.cos(x), f = k * Math.sin(x);
				}
				if (!a && !r && !i) {
					var A = J(so(e, d, f, b, !s && c || o, n), 2), j = A[0], M = A[1];
					S = j.isSnap, C = j.isBound, w = M.isSnap, T = M.isBound;
					var N = j.offset, P = M.offset;
					d += N, f += P;
				}
				var F = Ht(ui({
					datas: n,
					distX: d,
					distY: f
				}), g), I = Ht(ci({
					datas: n,
					distX: d,
					distY: f
				}), g);
				gt(I, Kr), gt(F, Kr), b || (!S && !C && (I[0] = G(I[0], y), F[0] = G(F[0], y)), !w && !T && (I[1] = G(I[1], y), F[1] = G(F[1], y)));
				var L = K(F, g), R = K(I, g), z = K(R, m), B = K(L, h);
				n.prevDist = R, n.prevBeforeDist = L, n.passDelta = z, n.passDist = R;
				var ee = n.left + L[0], V = n.top + L[1], te = n.right - L[0], ne = n.bottom - L[1], re = si(n, `translate(${I[0]}px, ${I[1]}px)`, `translate(${R[0]}px, ${R[1]}px)`);
				if (Ti(t, re), e.state.dragInfo.dist = r ? [0, 0] : R, !(!r && !v && z.every(function(e) {
					return !e;
				}) && B.some(function(e) {
					return !e;
				}))) {
					var H = e.state, U = H.width, ie = H.height, W = Z(e, t, q({
						transform: re,
						dist: R,
						delta: z,
						translate: I,
						beforeDist: L,
						beforeDelta: B,
						beforeTranslate: F,
						left: ee,
						top: V,
						right: te,
						bottom: ne,
						width: U,
						height: ie,
						isPinch: a
					}, Zs({ transform: re }, t)));
					return !r && Q(e, "onDrag", W), W;
				}
			}
		}
	},
	dragAfter: function(e, t) {
		var n = t.datas, r = n.deltaOffset;
		return r[0] || r[1] ? (n.deltaOffset = [0, 0], this.drag(e, q(q({}, t), { deltaOffset: r }))) : !1;
	},
	dragEnd: function(e, t) {
		var n = t.parentEvent, r = t.datas;
		if (e.state.dragInfo = null, r.isDrag) {
			r.isDrag = !1;
			var i = $s(e, t, {});
			return !n && Q(e, "onDragEnd", i), i;
		}
	},
	dragGroupStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY, a = this.dragStart(e, t);
		if (!a) return !1;
		var o = Zi(e, this, "dragStart", [r || 0, i || 0], t, !1, "draggable"), s = o.childEvents, c = o.eventParams;
		n.isDrag = Q(e, "onDragGroupStart", q(q({}, a), {
			targets: e.props.targets,
			events: c
		})) !== !1;
		var l = s[0]?.datas.startValue ?? [0, 0];
		return n.throttleOffset = [l[0] % 1, l[1] % 1], n.isDrag ? a : !1;
	},
	dragGroup: function(e, t) {
		if (t.datas.isDrag) {
			var n = this.drag(e, q(q({}, t), { parentThrottleDrag: e.props.throttleDrag })), r = t.datas.passDelta, i = Zi(e, this, "drag", r, t, !1, "draggable").eventParams;
			if (n) {
				var a = q({
					targets: e.props.targets,
					events: i
				}, n);
				return Q(e, "onDragGroup", a), a;
			}
		}
	},
	dragGroupEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isDrag) {
			this.dragEnd(e, t);
			var r = Zi(e, this, "dragEnd", [0, 0], t, !1, "draggable").eventParams;
			return Q(e, "onDragGroupEnd", $s(e, t, {
				targets: e.props.targets,
				events: r
			})), n;
		}
	},
	request: function(e) {
		var t = {}, n = e.getRect(), r = 0, i = 0, a = !1;
		return {
			isControl: !1,
			requestStart: function(e) {
				return a = e.useSnap, {
					datas: t,
					useSnap: a
				};
			},
			request: function(e) {
				return "x" in e ? r = e.x - n.left : "deltaX" in e && (r += e.deltaX), "y" in e ? i = e.y - n.top : "deltaY" in e && (i += e.deltaY), {
					datas: t,
					distX: r,
					distY: i,
					useSnap: a
				};
			},
			requestEnd: function() {
				return {
					datas: t,
					isDrag: !0,
					useSnap: a
				};
			}
		};
	},
	unset: function(e) {
		e.state.gestos.draggable = null, e.state.dragInfo = null;
	}
};
function _o(e, t) {
	return {
		fixedPosition: _i(e, t),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function vo(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3;
	return {
		fixedPosition: Ds(n, [i / 2 * (1 + t[0]), a / 2 * (1 + t[1])], o),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function yo(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3, s = Pi(t, i, a);
	return {
		fixedPosition: Ds(n, t, o),
		fixedDirection: s,
		fixedOffset: [i ? 0 : t[0], a ? 0 : t[1]]
	};
}
var bo = hc("resizable"), xo = {
	name: "resizable",
	ableGroup: "size",
	canPinch: !0,
	props: [
		"resizable",
		"throttleResize",
		"renderDirections",
		"displayAroundControls",
		"keepRatio",
		"resizeFormat",
		"keepRatioFinally",
		"edge",
		"checkResizableError"
	],
	events: [
		"resizeStart",
		"beforeResize",
		"resize",
		"resizeEnd",
		"resizeGroupStart",
		"beforeResizeGroup",
		"resizeGroup",
		"resizeGroupEnd"
	],
	render: ia("resizable"),
	dragControlCondition: bo,
	viewClassName: mc("resizable"),
	dragControlStart: function(e, t) {
		var n = t.inputEvent, r = t.isPinch, i = t.isGroup, a = t.parentDirection, o = t.parentGesto, s = t.datas, c = t.parentFixedDirection, l = t.parentEvent, u = Gs(a, r, n, s), d = e.state, f = d.target, p = d.width, m = d.height, h = d.gestos;
		if (!u || !f || h.resizable) return !1;
		h.resizable = o || e.controlGesto, !r && ii(e, t), s.datas = {}, s.direction = u, s.startOffsetWidth = p, s.startOffsetHeight = m, s.prevWidth = 0, s.prevHeight = 0, s.minSize = [0, 0], s.startWidth = d.inlineCSSWidth || d.cssWidth, s.startHeight = d.inlineCSSHeight || d.cssHeight, s.maxSize = [Infinity, Infinity], i || (s.minSize = [d.minOffsetWidth, d.minOffsetHeight], s.maxSize = [d.maxOffsetWidth, d.maxOffsetHeight]);
		var g = e.props.transformOrigin || "% %";
		s.transformOrigin = g && Ve(g) ? g.split(" ") : g, s.startOffsetMatrix = d.offsetMatrix, s.startTransformOrigin = d.transformOrigin, s.isWidth = t?.parentIsWidth ?? (!u[0] && !u[1] || u[0] || !u[1]);
		function _(e) {
			s.ratio = e && isFinite(e) ? e : 0;
		}
		s.startPositions = Js(e.state);
		function v(e) {
			var t = _o(s.startPositions, e);
			s.fixedDirection = t.fixedDirection, s.fixedPosition = t.fixedPosition, s.fixedOffset = t.fixedOffset;
		}
		function y(t) {
			var n = yo(e.state, t);
			s.fixedDirection = n.fixedDirection, s.fixedPosition = n.fixedPosition, s.fixedOffset = n.fixedOffset;
		}
		function b(e) {
			s.minSize = [ot(`${e[0]}`, 0) || 0, ot(`${e[1]}`, 0) || 0];
		}
		function x(e) {
			var t = [e[0] || Infinity, e[1] || Infinity];
			(!He(t[0]) || isFinite(t[0])) && (t[0] = ot(`${t[0]}`, 0) || Infinity), (!He(t[1]) || isFinite(t[1])) && (t[1] = ot(`${t[1]}`, 0) || Infinity), s.maxSize = t;
		}
		_(p / m), v(c || [-u[0], -u[1]]), s.setFixedDirection = v, s.setFixedPosition = y, s.setMin = b, s.setMax = x;
		var S = Z(e, t, {
			direction: u,
			startRatio: s.ratio,
			set: function(e) {
				var t = J(e, 2), n = t[0], r = t[1];
				s.startWidth = n, s.startHeight = r;
			},
			setMin: b,
			setMax: x,
			setRatio: _,
			setFixedDirection: v,
			setFixedPosition: y,
			setOrigin: function(e) {
				s.transformOrigin = e;
			},
			dragStart: go.dragStart(e, new ti().dragStart([0, 0], t))
		}), C = l || Q(e, "onResizeStart", S);
		return s.startFixedDirection = s.fixedDirection, s.startFixedPosition = s.fixedPosition, C !== !1 && (s.isResize = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: u
		}), s.isResize ? S : !1;
	},
	dragControl: function(e, t) {
		var n, r = t.datas, i = t.parentFlag, a = t.isPinch, o = t.parentKeepRatio, s = t.dragClient, c = t.parentDist, l = t.useSnap, u = t.isRequest, d = t.isGroup, f = t.parentEvent, p = t.resolveMatrix, m = r.isResize, h = r.transformOrigin, g = r.startWidth, _ = r.startHeight, v = r.prevWidth, y = r.prevHeight, b = r.minSize, x = r.maxSize, S = r.ratio, C = r.startOffsetWidth, w = r.startOffsetHeight, T = r.isWidth;
		if (!m) return;
		if (p) {
			var E = e.state.is3d, D = r.startOffsetMatrix, O = r.startTransformOrigin, k = E ? 4 : 3, A = sn(Di(t)), j = Math.sqrt(A.length);
			k !== j && (A = zt(A, j, k));
			var M = yi(D, A, O, k);
			r.startPositions = Os(M, C, w, k), r.nextTargetMatrix = A, r.nextAllMatrix = M;
		}
		var N = Ls(e.props, "resizable"), P = N.resizeFormat, F = N.throttleResize, I = F === void 0 ? +!i : F, L = N.parentMoveable, R = N.keepRatioFinally, z = r.direction, B = z, ee = 0, V = 0;
		!z[0] && !z[1] && (B = [1, 1]);
		var te = S && (o ?? N.keepRatio) || !1;
		function ne() {
			var e = r.fixedDirection, n = Cc(B, te, r, t);
			ee = n.distWidth, V = n.distHeight;
			var i = B[0] - e[0] || te ? Math.max(C + ee, Kr) : C, a = B[1] - e[1] || te ? Math.max(w + V, Kr) : w;
			return te && C && w && (T ? a = i / S : i = a * S), [i, a];
		}
		var re = J(ne(), 2), H = re[0], U = re[1];
		f || (r.setFixedDirection(r.fixedDirection), Q(e, "onBeforeResize", Z(e, t, {
			startFixedDirection: r.startFixedDirection,
			startFixedPosition: r.startFixedPosition,
			setFixedDirection: function(e) {
				var t;
				return r.setFixedDirection(e), t = J(ne(), 2), H = t[0], U = t[1], [H, U];
			},
			setFixedPosition: function(e) {
				var t;
				return r.setFixedPosition(e), t = J(ne(), 2), H = t[0], U = t[1], [H, U];
			},
			boundingWidth: H,
			boundingHeight: U,
			setSize: function(e) {
				var t = J(e, 2);
				H = t[0], U = t[1];
			}
		}, !0)));
		var ie = s;
		s || (ie = !i && a ? Ri(e, [0, 0]) : r.fixedPosition);
		var W = [0, 0];
		a || (W = ns(e, H, U, z, ie, !l && u, r)), c && (!c[0] && (W[0] = 0), !c[1] && (W[1] = 0));
		function ae() {
			var e;
			P && (e = J(P([H, U]), 2), H = e[0], U = e[1]), H = G(H, I), U = G(U, I);
		}
		if (te) {
			B[0] && B[1] && W[0] && W[1] && ($(W[0]) > $(W[1]) ? W[1] = 0 : W[0] = 0);
			var oe = !W[0] && !W[1];
			oe && ae(), B[0] && !B[1] || W[0] && !W[1] || oe && T ? (H += W[0], U = H / S) : (!B[0] && B[1] || !W[0] && W[1] || oe && !T) && (U += W[1], H = U * S);
		} else H += W[0], U += W[1], H = Math.max(0, H), U = Math.max(0, U);
		n = J(lt([H, U], b, x, te ? S : !1), 2), H = n[0], U = n[1], ae(), te && (d || R) && (T ? U = H / S : H = U * S), ee = H - C, V = U - w;
		var se = [ee - v, V - y];
		r.prevWidth = ee, r.prevHeight = V;
		var ce = Li(e, H, U, ie, h, r);
		if (!(!L && se.every(function(e) {
			return !e;
		}) && ce.every(function(e) {
			return !e;
		}))) {
			var le = go.drag(e, ei(t, e.state, ce, !!a, !1, "draggable")), ue = le.transform, de = g + ee, fe = _ + V, pe = Z(e, t, q({
				width: de,
				height: fe,
				offsetWidth: Math.round(H),
				offsetHeight: Math.round(U),
				startRatio: S,
				boundingWidth: H,
				boundingHeight: U,
				direction: z,
				dist: [ee, V],
				delta: se,
				isPinch: !!a,
				drag: le
			}, Qs({
				style: {
					width: `${de}px`,
					height: `${fe}px`
				},
				transform: ue
			}, le, t)));
			return !f && Q(e, "onResize", pe), pe;
		}
	},
	dragControlAfter: function(e, t) {
		var n = t.datas, r = n.isResize, i = n.startOffsetWidth, a = n.startOffsetHeight, o = n.prevWidth, s = n.prevHeight;
		if (!(!r || e.props.checkResizableError === !1)) {
			var c = e.state, l = c.width, u = c.height, d = l - (i + o), f = u - (a + s), p = $(d) > 3, m = $(f) > 3;
			if (p && (n.startWidth += d, n.startOffsetWidth += d, n.prevWidth += d), m && (n.startHeight += f, n.startOffsetHeight += f, n.prevHeight += f), p || m) return this.dragControl(e, t);
		}
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.parentEvent;
		if (n.isResize) {
			n.isResize = !1;
			var i = $s(e, t, {});
			return !r && Q(e, "onResizeEnd", i), i;
		}
	},
	dragGroupControlCondition: bo,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, q(q({}, t), { isGroup: !0 }));
		if (!r) return !1;
		var i = Xi(e, "resizable", t), a = n.startOffsetWidth, o = n.startOffsetHeight;
		function s() {
			var e = n.minSize;
			i.forEach(function(t) {
				var n = t.datas, r = n.minSize, i = n.startOffsetWidth, s = n.startOffsetHeight, c = a * (i ? r[0] / i : 0), l = o * (s ? r[1] / s : 0);
				e[0] = Math.max(e[0], c), e[1] = Math.max(e[1], l);
			});
		}
		function c() {
			var e = n.maxSize;
			i.forEach(function(t) {
				var n = t.datas, r = n.maxSize, i = n.startOffsetWidth, s = n.startOffsetHeight, c = a * (i ? r[0] / i : 0), l = o * (s ? r[1] / s : 0);
				e[0] = Math.min(e[0], c), e[1] = Math.min(e[1], l);
			});
		}
		var l = Qi(e, this, "dragControlStart", t, function(t, r) {
			return $i(e, t, n, r);
		});
		s(), c();
		var u = function(t) {
			r.setFixedDirection(t), l.forEach(function(r, a) {
				r.setFixedDirection(t), $i(e, r.moveable, n, i[a]);
			});
		};
		return n.setFixedDirection = u, n.isResize = Q(e, "onResizeGroupStart", q(q({}, r), {
			targets: e.props.targets,
			events: l.map(function(e) {
				return q(q({}, e), {
					setMin: function(t) {
						e.setMin(t), s();
					},
					setMax: function(t) {
						e.setMax(t), c();
					}
				});
			}),
			setFixedDirection: u,
			setMin: function(e) {
				r.setMin(e), s();
			},
			setMax: function(e) {
				r.setMax(e), c();
			}
		})) !== !1, n.isResize ? r : !1;
	},
	dragGroupControl: function(e, t) {
		var n = t.datas;
		if (n.isResize) {
			var r = Ls(e.props, "resizable");
			ec(e, "onBeforeResize", function(n) {
				Q(e, "onBeforeResizeGroup", Z(e, t, q(q({}, n), { targets: r.targets }), !0));
			});
			var i = this.dragControl(e, q(q({}, t), { isGroup: !0 }));
			if (i) {
				var a = i.boundingWidth, o = i.boundingHeight, s = i.dist, c = r.keepRatio, l = [a / (a - s[0]), o / (o - s[1])], u = n.fixedPosition, d = Qi(e, this, "dragControl", t, function(t, n) {
					var r = J(Gt($t(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * l[0],
						n.datas.originalY * l[1],
						1
					], 3), 2), i = r[0], a = r[1];
					return q(q({}, n), {
						parentDist: null,
						parentScale: l,
						dragClient: Ht(u, [i, a]),
						parentKeepRatio: c
					});
				}), f = q({
					targets: r.targets,
					events: d
				}, i);
				return Q(e, "onResizeGroup", f), f;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isResize) {
			this.dragControlEnd(e, t);
			var r = Qi(e, this, "dragControlEnd", t);
			return Q(e, "onResizeGroupEnd", $s(e, t, {
				targets: e.props.targets,
				events: r
			})), n;
		}
	},
	request: function(e) {
		var t = {}, n = 0, r = 0, i = !1, a = e.getRect();
		return {
			isControl: !0,
			requestStart: function(e) {
				return i = e.useSnap, {
					datas: t,
					parentDirection: e.direction || [1, 1],
					parentIsWidth: e?.horizontal ?? !0,
					useSnap: i
				};
			},
			request: function(e) {
				return "offsetWidth" in e ? n = e.offsetWidth - a.offsetWidth : "deltaWidth" in e && (n += e.deltaWidth), "offsetHeight" in e ? r = e.offsetHeight - a.offsetHeight : "deltaHeight" in e && (r += e.deltaHeight), {
					datas: t,
					parentDist: [n, r],
					parentKeepRatio: e.keepRatio,
					useSnap: i
				};
			},
			requestEnd: function() {
				return {
					datas: t,
					isDrag: !0,
					useSnap: i
				};
			}
		};
	},
	unset: function(e) {
		e.state.gestos.resizable = null;
	}
};
function So(e, t, n, r, i) {
	var a = e.props.groupable, o = e.state, s = o.is3d ? 4 : 3, c = t.origin, l = Ds(e.state.rootMatrix, K([c[0], c[1]], a ? [0, 0] : [o.left, o.top]), s), u = Ht([i.left, i.top], l);
	t.startAbsoluteOrigin = u, t.prevDeg = ft(u, [n, r]) / Math.PI * 180, t.defaultDeg = t.prevDeg, t.prevSnapDeg = 0, t.loop = 0, t.startDist = ht(u, [n, r]);
}
function Co(e, t, n) {
	var r = n.defaultDeg, i = n.prevDeg, a = i % 360, o = Math.floor(i / 360);
	a < 0 && (a += 360), a > e && a > 270 && e < 90 ? ++o : a < e && a < 90 && e > 270 && --o;
	var s = t * (o * 360 + e - r);
	return n.prevDeg = r + s, s;
}
function wo(e, t, n, r) {
	return Co(ft(r.startAbsoluteOrigin, [e, t]) / Math.PI * 180, n, r);
}
function To(e, t, n, r, i, a) {
	var o = e.props.throttleRotate, s = o === void 0 ? 0 : o, c = n.prevSnapDeg, l = 0, u = !1;
	if (a) {
		var d = ts(e, t, r, i + r);
		u = d.isSnap, l = i + d.dist;
	}
	u || (l = G(i + r, s));
	var f = l - i;
	return n.prevSnapDeg = f, [
		f - c,
		f,
		l
	];
}
function Eo(e, t, n) {
	var r = J(t, 4), i = r[0], a = r[1], o = r[2], s = r[3];
	if (e === "none") return [];
	if (Be(e)) return e.map(function(e) {
		return Eo(e, [
			i,
			a,
			o,
			s
		], n)[0];
	});
	var c = J((e || "top").split("-"), 2), l = c[0], u = c[1], d = [i, a];
	l === "left" ? d = [o, i] : l === "right" ? d = [a, s] : l === "bottom" && (d = [s, o]);
	var f = [(d[0][0] + d[1][0]) / 2, (d[0][1] + d[1][1]) / 2], p = zs(d, n);
	if (u) {
		var m = u === "top" || u === "left", h = l === "bottom" || l === "left";
		f = d[m && !h || !m && h ? 0 : 1];
	}
	return [[f, p]];
}
function Do(e, t) {
	if (t.isRequest) return t.requestAble === "rotatable";
	var n = t.inputEvent.target;
	if (yt(n, X("rotation-control")) || e.props.rotateAroundControls && yt(n, X("around-control")) || yt(n, X("control")) && yt(n, X("rotatable"))) return !0;
	var r = e.props.rotationTarget;
	return r ? yc(r, !0).some(function(e) {
		return e ? n === e || n.contains(e) : !1;
	}) : !1;
}
var Oo = {
	name: "rotatable",
	canPinch: !0,
	props: [
		"rotatable",
		"rotationPosition",
		"throttleRotate",
		"renderDirections",
		"rotationTarget",
		"rotateAroundControls",
		"edge",
		"resolveAblesWithRotatable",
		"displayAroundControls"
	],
	events: [
		"rotateStart",
		"beforeRotate",
		"rotate",
		"rotateEnd",
		"rotateGroupStart",
		"beforeRotateGroup",
		"rotateGroup",
		"rotateGroupEnd"
	],
	css: [".rotation {\nposition: absolute;\nheight: 40px;\nwidth: 1px;\ntransform-origin: 50% 100%;\nheight: calc(40px * var(--zoom));\ntop: auto;\nleft: 0;\nbottom: 100%;\nwill-change: transform;\n}\n.rotation .rotation-line {\ndisplay: block;\nwidth: 100%;\nheight: 100%;\ntransform-origin: 50% 50%;\n}\n.rotation .rotation-control {\nborder-color: #4af;\nborder-color: var(--moveable-color);\nbackground:#fff;\ncursor: alias;\n}\n:global .view-rotation-dragging, .rotatable.direction.control {\ncursor: alias;\n}\n.rotatable.direction.control.move {\ncursor: move;\n}\n"],
	viewClassName: function(e) {
		return e.isDragging("rotatable") ? X("view-rotation-dragging") : "";
	},
	render: function(e, t) {
		var n = Ls(e.props, "rotatable"), r = n.rotatable, i = n.rotationPosition, a = n.zoom, o = n.renderDirections, s = n.rotateAroundControls, c = n.resolveAblesWithRotatable, l = e.getState(), u = l.renderPoses, d = l.direction;
		if (!r) return null;
		var f = Eo(i, u, d), p = [];
		if (f.forEach(function(e, n) {
			var r = J(e, 2), i = r[0], o = r[1];
			p.push(t.createElement("div", {
				key: `rotation${n}`,
				className: X("rotation"),
				style: { transform: `translate(-50%) translate(${i[0]}px, ${i[1]}px) rotate(${o}rad)` }
			}, t.createElement("div", {
				className: X("line rotation-line"),
				style: { transform: `scaleX(${a})` }
			}), t.createElement("div", {
				className: X("control rotation-control"),
				style: { transform: `translate(0.5px) scale(${a})` }
			})));
		}), o) {
			var m = at(c || {}), h = {};
			m.forEach(function(e) {
				c[e].forEach(function(t) {
					h[t] = e;
				});
			});
			var g = [];
			Be(o) && (g = o.map(function(e) {
				var t = h[e];
				return {
					data: t ? { resolve: t } : {},
					classNames: t ? ["move"] : [],
					dir: e
				};
			})), p.push.apply(p, Y([], J(ea(e, "rotatable", g, t)), !1));
		}
		return s && p.push.apply(p, Y([], J(sa(e, t)), !1)), p;
	},
	dragControlCondition: Do,
	dragControlStart: function(e, t) {
		var n, r = t.datas, i = t.clientX, a = t.clientY, o = t.parentRotate, s = t.parentFlag, c = t.isPinch, l = t.isRequest, u = e.state, d = u.target, f = u.left, p = u.top, m = u.direction, h = u.beforeDirection, g = u.targetTransform, _ = u.moveableClientRect, v = u.offsetMatrix, y = u.targetMatrix, b = u.allMatrix, x = u.width, S = u.height;
		if (!l && !d) return !1;
		var C = e.getRect();
		r.rect = C, r.transform = g, r.left = f, r.top = p;
		var w = function(t) {
			var n = yo(e.state, t);
			r.fixedDirection = n.fixedDirection, r.fixedOffset = n.fixedOffset, r.fixedPosition = n.fixedPosition, P && P.setFixedPosition(t);
		}, T = function(t) {
			var n = vo(e.state, t);
			r.fixedDirection = n.fixedDirection, r.fixedOffset = n.fixedOffset, r.fixedPosition = n.fixedPosition, P && P.setFixedDirection(t);
		}, E = i, D = a;
		if (l || c || s) {
			var O = o || 0;
			r.beforeInfo = {
				origin: C.beforeOrigin,
				prevDeg: O,
				defaultDeg: O,
				prevSnapDeg: 0,
				startDist: 0
			}, r.afterInfo = q(q({}, r.beforeInfo), { origin: C.origin }), r.absoluteInfo = q(q({}, r.beforeInfo), {
				origin: C.origin,
				startValue: O
			});
		} else {
			var k = t.inputEvent?.target;
			if (k) {
				var A = Xr[k.getAttribute("data-direction") || ""];
				if (A) {
					r.isControl = !0, r.isAroundControl = yt(k, X("around-control")), r.controlDirection = A;
					var j = k.getAttribute("data-resolve");
					j && (r.resolveAble = j), n = J(_i(Ms(u.rootMatrix, u.renderPoses, _), A), 2), E = n[0], D = n[1];
				}
			}
			r.beforeInfo = { origin: C.beforeOrigin }, r.afterInfo = { origin: C.origin }, r.absoluteInfo = {
				origin: C.origin,
				startValue: C.rotation
			};
			var M = w;
			w = function(t) {
				var n = u.is3d ? 4 : 3, i = J(Ht(It(y, n), t), 2), a = i[0], o = i[1], s = Gt(v, Rt([a, o], n)), c = Gt(b, Rt([t[0], t[1]], n));
				M(t);
				var l = u.posDelta;
				r.beforeInfo.origin = K(s, l), r.afterInfo.origin = K(c, l), r.absoluteInfo.origin = K(c, l), So(e, r.beforeInfo, E, D, _), So(e, r.afterInfo, E, D, _), So(e, r.absoluteInfo, E, D, _);
			}, T = function(e) {
				var t = _i([
					[0, 0],
					[x, 0],
					[0, S],
					[x, S]
				], e);
				w(t);
			};
		}
		r.startClientX = E, r.startClientY = D, r.direction = m, r.beforeDirection = h, r.startValue = 0, r.datas = {}, Ci(e, t, "rotate");
		var N = !1, P = !1;
		r.isControl && r.resolveAble && r.resolveAble === "resizable" && (P = xo.dragControlStart(e, q(q({}, new ti("resizable").dragStart([0, 0], t)), {
			parentPosition: r.controlPosition,
			parentFixedPosition: r.fixedPosition
		}))), P || (N = go.dragStart(e, new ti().dragStart([0, 0], t))), w(Ws(e));
		var F = Z(e, t, q(q({
			set: function(e) {
				r.startValue = e * Math.PI / 180;
			},
			setFixedDirection: T,
			setFixedPosition: w
		}, Si(e, t)), {
			dragStart: N,
			resizeStart: P
		}));
		return r.isRotate = Q(e, "onRotateStart", F) !== !1, u.snapRenderInfo = { request: t.isRequest }, r.isRotate ? F : !1;
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.clientDistX, s = t.clientDistY, c = t.parentRotate, l = t.parentFlag, u = t.isPinch, d = t.groupDelta, f = t.resolveMatrix, p = a.beforeDirection, m = a.beforeInfo, h = a.afterInfo, g = a.absoluteInfo, _ = a.isRotate, v = a.startValue, y = a.rect, b = a.startClientX, x = a.startClientY;
		if (_) {
			oi(e, t, "rotate");
			var S = p * ai(t), C = e.props.parentMoveable, w = 0, T, E, D = 0, O, k, A = 0, j, M, N = 180 / Math.PI * v, P = g.startValue, F = !1, I = b + o, L = x + s;
			if (!l && "parentDist" in t) {
				var R = t.parentDist;
				T = R, O = R, j = R;
			} else u || l ? (T = Co(c, p, m), O = Co(c, S, h), j = Co(c, S, g)) : (T = wo(I, L, p, m), O = wo(I, L, S, h), j = wo(I, L, S, g), F = !0);
			if (E = N + T, k = N + O, M = P + j, Q(e, "onBeforeRotate", Z(e, t, {
				beforeRotation: E,
				rotation: k,
				absoluteRotation: M,
				setRotation: function(e) {
					O = e - N, T = O, j = O;
				}
			}, !0)), n = J(To(e, y, m, T, N, F), 3), w = n[0], T = n[1], E = n[2], r = J(To(e, y, h, O, N, F), 3), D = r[0], O = r[1], k = r[2], i = J(To(e, y, g, j, P, F), 3), A = i[0], j = i[1], M = i[2], !(!A && !D && !w && !C && !f)) {
				var z = si(a, `rotate(${k}deg)`, `rotate(${O}deg)`);
				f && (a.fixedPosition = ji(e, a.targetAllTransform, a.fixedDirection, a.fixedOffset, a));
				var B = Ii(e, O, a), ee = K(Ht(d || [0, 0], B), a.prevInverseDist || [0, 0]);
				a.prevInverseDist = B, a.requestValue = null;
				var V = Ai(e, z, ee, u, t), te = V, ne = ht([I, L], g.startAbsoluteOrigin) - g.startDist, re = void 0;
				if (a.resolveAble === "resizable") {
					var H = xo.dragControl(e, q(q({}, ei(t, e.state, [t.deltaX, t.deltaY], !!u, !1, "resizable")), {
						resolveMatrix: !0,
						parentDistance: ne
					}));
					H && (re = H, te = Qs(te, H, t));
				}
				var U = Z(e, t, q(q({
					delta: D,
					dist: O,
					rotate: k,
					rotation: k,
					beforeDist: T,
					beforeDelta: w,
					beforeRotate: E,
					beforeRotation: E,
					absoluteDist: j,
					absoluteDelta: A,
					absoluteRotate: M,
					absoluteRotation: M,
					isPinch: !!u,
					resize: re
				}, V), te));
				return Q(e, "onRotate", U), U;
			}
		}
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (n.isRotate) {
			n.isRotate = !1;
			var r = $s(e, t, {});
			return Q(e, "onRotateEnd", r), r;
		}
	},
	dragGroupControlCondition: Do,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = e.state, i = r.left, a = r.top, o = r.beforeOrigin, s = this.dragControlStart(e, t);
		if (!s) return !1;
		s.set(n.beforeDirection * e.rotation);
		var c = Qi(e, this, "dragControlStart", t, function(e, t) {
			var n = e.state, r = n.left, s = n.top, c = n.beforeOrigin, l = Ht(K([r, s], [i, a]), K(c, o));
			return t.datas.startGroupClient = l, t.datas.groupClient = l, q(q({}, t), { parentRotate: 0 });
		});
		return n.isRotate = Q(e, "onRotateGroupStart", q(q({}, s), {
			targets: e.props.targets,
			events: c
		})) !== !1, n.isRotate ? s : !1;
	},
	dragGroupControl: function(e, t) {
		var n = t.datas;
		if (n.isRotate) {
			ec(e, "onBeforeRotate", function(n) {
				Q(e, "onBeforeRotateGroup", Z(e, t, q(q({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = n.beforeDirection, a = r.beforeDist, o = a / 180 * Math.PI, s = Qi(e, this, "dragControl", t, function(e, t) {
					var n = t.datas.startGroupClient, r = J(t.datas.groupClient, 2), s = r[0], c = r[1], l = J(Xt(n, o * i), 2), u = l[0], d = l[1], f = [u - s, d - c];
					return t.datas.groupClient = [u, d], q(q({}, t), {
						parentRotate: a,
						groupDelta: f
					});
				});
				e.rotation = i * r.beforeRotation;
				var c = q({
					targets: e.props.targets,
					events: s,
					set: function(t) {
						e.rotation = t;
					},
					setGroupRotation: function(t) {
						e.rotation = t;
					}
				}, r);
				return Q(e, "onRotateGroup", c), c;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isRotate) {
			this.dragControlEnd(e, t);
			var r = Qi(e, this, "dragControlEnd", t);
			return Q(e, "onRotateGroupEnd", $s(e, t, {
				targets: e.props.targets,
				events: r
			})), n;
		}
	},
	request: function(e) {
		var t = {}, n = 0, r = e.getRotation();
		return {
			isControl: !0,
			requestStart: function() {
				return { datas: t };
			},
			request: function(e) {
				return "deltaRotate" in e ? n += e.deltaRotate : "rotate" in e && (n = e.rotate - r), {
					datas: t,
					parentDist: n
				};
			},
			requestEnd: function() {
				return {
					datas: t,
					isDrag: !0
				};
			}
		};
	}
};
function ko(e, t) {
	var n, r = e.direction, i = e.classNames, a = e.size, o = e.pos, s = e.zoom, c = e.key, l = r === "horizontal", u = l ? "Y" : "X";
	return t.createElement("div", {
		key: c,
		className: i.join(" "),
		style: (n = {}, n[l ? "width" : "height"] = `${a}`, n.transform = `translate(${o[0]}, ${o[1]}) translate${u}(-50%) scale${u}(${s})`, n)
	});
}
function Ao(e, t) {
	return ko(q(q({}, e), {
		classNames: Y([X("line", "guideline", e.direction)], J(e.classNames), !1).filter(function(e) {
			return e;
		}),
		size: e.size || `${e.sizeValue}px`,
		pos: e.pos || e.posValue.map(function(e) {
			return `${G(e, .1)}px`;
		})
	}), t);
}
function jo(e, t, n, r, i, a, o, s) {
	var c = e.props.zoom;
	return n.map(function(e, n) {
		var l = e.type, u = e.pos, d = [0, 0];
		return d[o] = r, d[+!o] = -i + u, Ao({
			key: `${t}TargetGuideline${n}`,
			classNames: [X("target", "bold", l)],
			posValue: d,
			sizeValue: a,
			zoom: c,
			direction: t
		}, s);
	});
}
function Mo(e, t, n, r, i, a) {
	var o = e.props, s = o.zoom, c = o.isDisplayInnerSnapDigit, l = t === "horizontal" ? va : ya, u = i[l.start], d = i[l.end];
	return n.filter(function(e) {
		var t = e.hide, n = e.elementRect;
		if (t) return !1;
		if (c && n) {
			var r = n.rect;
			if (r[l.start] <= u && d <= r[l.end]) return !1;
		}
		return !0;
	}).map(function(e, n) {
		var i = e.pos, o = e.size, c = e.element, l = e.className, u = [-r[0] + i[0], -r[1] + i[1]];
		return Ao({
			key: `${t}-default-guideline-${n}`,
			classNames: c ? [X("bold"), l] : [X("normal"), l],
			direction: t,
			posValue: u,
			sizeValue: o,
			zoom: s
		}, a);
	});
}
function No(e, t, n, r, i, a, o, s) {
	var c, l = e.props, u = l.snapDigit, d = u === void 0 ? 0 : u, f = l.isDisplaySnapDigit, p = f === void 0 || f, m = l.snapDistFormat, h = m === void 0 ? function(e, t) {
		return e;
	} : m, g = l.zoom, _ = t === "horizontal" ? "X" : "Y", v = t === "vertical" ? "height" : "width", y = Math.abs(i), b = p ? parseFloat(y.toFixed(d)) : 0;
	return s.createElement("div", {
		key: `${t}-${n}-guideline-${r}`,
		className: X("guideline-group", t),
		style: (c = {
			left: `${a[0]}px`,
			top: `${a[1]}px`
		}, c[v] = `${y}px`, c)
	}, Ao({
		direction: t,
		classNames: [X(n), o],
		size: "100%",
		posValue: [0, 0],
		sizeValue: y,
		zoom: g
	}, s), s.createElement("div", {
		className: X("size-value", "gap"),
		style: { transform: `translate${_}(-50%) scale(${g})` }
	}, b > 0 ? h(b, t) : ""));
}
function Po(e, t, n, r) {
	var i = e === "vertical" ? 0 : 1, a = +(e === "vertical"), o = i ? va : ya, s = n[o.start], c = n[o.end];
	return ac(t, function(e) {
		return e.pos[i];
	}).map(function(t) {
		var n = [], l = [];
		return t.forEach(function(t) {
			var u, d, f = t.element, p = t.elementRect.rect;
			if (p[o.end] < s) n.push(t);
			else if (c < p[o.start]) l.push(t);
			else if (p[o.start] <= s && c <= p[o.end] && r) {
				var m = t.pos, h = {
					element: f,
					rect: q(q({}, p), (u = {}, u[o.end] = p[o.start], u))
				}, g = {
					element: f,
					rect: q(q({}, p), (d = {}, d[o.start] = p[o.end], d))
				}, _ = [0, 0], v = [0, 0];
				_[i] = m[i], _[a] = m[a], v[i] = m[i], v[a] = m[a] + t.size, n.push({
					type: e,
					pos: _,
					size: 0,
					elementRect: h,
					direction: "",
					elementDirection: "end"
				}), l.push({
					type: e,
					pos: v,
					size: 0,
					elementRect: g,
					direction: "",
					elementDirection: "start"
				});
			}
		}), n.sort(function(e, t) {
			return t.pos[a] - e.pos[a];
		}), l.sort(function(e, t) {
			return e.pos[a] - t.pos[a];
		}), {
			total: t,
			start: n,
			end: l,
			inner: []
		};
	});
}
function Fo(e, t, n, r, i) {
	var a = e.props.isDisplayInnerSnapDigit, o = [];
	return ["vertical", "horizontal"].forEach(function(s) {
		var c = t.filter(function(e) {
			return e.type === s;
		}), l = +(s === "vertical"), u = +!l, d = Po(s, c, r, a), f = l ? ya : va, p = l ? va : ya, m = r[f.start], h = r[f.end];
		d.forEach(function(t) {
			var a = t.total, c = t.start, d = t.end, g = t.inner, _ = n[u] + a[0].pos[u] - r[p.start], v = r;
			c.forEach(function(t) {
				var r = t.elementRect.rect, a = v[f.start] - r[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.start] - m - a, c[u] = _, o.push(No(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), v = r, d.forEach(function(t) {
				var r = t.elementRect.rect, a = r[f.start] - v[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.end] - m, c[u] = _, o.push(No(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), g.forEach(function(t) {
				var r = t.elementRect.rect, a = m - r[f.start], c = r[f.end] - h, d = [0, 0], p = [0, 0];
				d[l] = n[l] - a, d[u] = _, p[l] = n[l] + h - m, p[u] = _, o.push(No(e, s, "dashed", o.length, a, d, t.className, i)), o.push(No(e, s, "dashed", o.length, c, p, t.className, i));
			});
		});
	}), o;
}
function Io(e, t, n, r, i) {
	var a = [];
	return ["horizontal", "vertical"].forEach(function(o) {
		var s = t.filter(function(e) {
			return e.type === o;
		}).slice(0, 1), c = o === "vertical" ? 0 : 1, l = +!c, u = c ? ya : va, d = c ? va : ya, f = r[u.start], p = r[u.end], m = r[d.start], h = r[d.end];
		s.forEach(function(t) {
			var r = t.gap, o = t.gapRects, s = Math.max.apply(Math, Y([m], J(o.map(function(e) {
				return e.rect[d.start];
			})), !1)), g = Math.min.apply(Math, Y([h], J(o.map(function(e) {
				return e.rect[d.end];
			})), !1)), _ = (s + g) / 2;
			s !== g && _ !== (m + h) / 2 && o.forEach(function(t) {
				var o = t.rect, s = t.className, d = [n[0], n[1]];
				if (o[u.end] < f) d[c] += o[u.end] - f;
				else if (p < o[u.start]) d[c] += o[u.start] - f - r;
				else return;
				d[l] += _ - m, a.push(No(e, c ? "vertical" : "horizontal", "gap", a.length, r, d, s, i));
			});
		});
	}), a;
}
function Lo(e) {
	var t = e.state, n = t.containerClientRect, r = t.hasFixed, i = n.overflow, a = n.scrollHeight, o = n.scrollWidth, s = n.clientHeight, c = n.clientWidth, l = n.clientLeft, u = n.clientTop, d = e.props, f = d.snapGap, p = f === void 0 || f, m = d.verticalGuidelines, h = d.horizontalGuidelines, g = d.snapThreshold, _ = g === void 0 ? 5 : g, v = d.maxSnapElementGuidelineDistance, y = v === void 0 ? Infinity : v, b = d.isDisplayGridGuidelines, x = ks(Js(e.state)), S = x.top, C = x.left, w = x.bottom, T = x.right, E = {
		top: S,
		left: C,
		bottom: w,
		right: T,
		center: (C + T) / 2,
		middle: (S + w) / 2
	}, D = Y([], J(Ho(e)), !1), O = (t.snapThresholdInfo?.multiples ?? [1, 1]).map(function(e) {
		return e * _;
	});
	p && D.push.apply(D, Y([], J(Ro(e, E, O)), !1));
	var k = q({}, t.snapOffset || {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	});
	if (D.push.apply(D, Y([], J(Bo(e, i ? o : c, i ? a : s, l, u, k, b)), !1)), r) {
		var A = n.left, j = n.top;
		k.left += A, k.top += j, k.right += A, k.bottom += j;
	}
	return D.push.apply(D, Y([], J(Wo(h || !1, m || !1, i ? o : c, i ? a : s, l, u, k)), !1)), D = D.filter(function(e) {
		var t = e.element, n = e.elementRect, r = e.type;
		if (!t || !n) return !0;
		var i = n.rect;
		return Vo(E, i, r, y);
	}), D;
}
function Ro(e, t, n) {
	var r = e.props, i = r.maxSnapElementGuidelineDistance, a = i === void 0 ? Infinity : i, o = r.maxSnapElementGapDistance, s = o === void 0 ? Infinity : o, c = e.state.elementRects, l = [];
	return [[
		"vertical",
		va,
		ya
	], [
		"horizontal",
		ya,
		va
	]].forEach(function(e) {
		var r = J(e, 3), i = r[0], o = r[1], u = r[2], d = t[o.start], f = t[o.end], p = t[o.center], m = t[u.start], h = t[u.end], g = {
			left: n[0],
			top: n[1]
		};
		function _(e) {
			var t = e.rect, n = g[o.start];
			return t[o.end] < d + n ? d - t[o.end] : f - n < t[o.start] ? t[o.start] - f : -1;
		}
		var v = c.filter(function(e) {
			var t = e.rect;
			return t[u.start] > h || t[u.end] < m ? !1 : _(e) > 0;
		}).sort(function(e, t) {
			return _(e) - _(t);
		}), y = [];
		v.forEach(function(e) {
			v.forEach(function(t) {
				if (e !== t) {
					var n = e.rect, r = t.rect, i = n[u.start], a = n[u.end], o = r[u.start];
					i > r[u.end] || o > a || y.push([e, t]);
				}
			});
		}), y.forEach(function(e) {
			var n = J(e, 2), r = n[0], c = n[1], u = r.rect, m = c.rect, h = u[o.start], _ = u[o.end], v = m[o.start], y = m[o.end], b = g[o.start], x = 0, S = 0, C = !1, w = !1, T = !1;
			if (_ <= d && f <= v) {
				if (w = !0, x = (v - _ - (f - d)) / 2, S = _ + x + (f - d) / 2, $(S - p) > b) return;
			} else if (_ < v && y < d + b) {
				if (C = !0, x = v - _, S = y + x, $(S - d) > b) return;
			} else if (_ < v && f - b < h) {
				if (T = !0, x = v - _, S = h - x, $(S - f) > b) return;
			} else return;
			x && Vo(t, m, i, a) && (x > s || l.push({
				type: i,
				pos: i === "vertical" ? [S, 0] : [0, S],
				element: c.element,
				size: 0,
				className: c.className,
				isStart: C,
				isCenter: w,
				isEnd: T,
				gap: x,
				hide: !0,
				gapRects: [r, c],
				direction: "",
				elementDirection: ""
			}));
		});
	}), l;
}
function zo(e, t, n, r) {
	var i = e.props, a = e.state, o = i.snapGridAll, s = i.snapGridWidth, c = s === void 0 ? 0 : s, l = i.snapGridHeight, u = l === void 0 ? 0 : l, d = a.snapRenderInfo, f = d && (d.direction?.[0] || d.direction?.[1]), p = e.moveables;
	if (o && p && f && (c || u)) {
		if (a.snapThresholdInfo) return;
		a.snapThresholdInfo = {
			multiples: [1, 1],
			offset: [0, 0]
		};
		var m = e.getRect(), h = m.children, g = d.direction;
		if (h) {
			var _ = g.map(function(e, i) {
				var a = i === 0 ? {
					snapSize: c,
					posName: "left",
					sizeName: "width",
					clientOffset: r.left - t
				} : {
					snapSize: u,
					posName: "top",
					sizeName: "height",
					clientOffset: r.top - n
				}, o = a.snapSize, s = a.posName, l = a.sizeName, d = a.clientOffset;
				if (!o) return {
					dir: e,
					multiple: 1,
					snapSize: o,
					snapOffset: 0
				};
				var f = m[l], p = m[s], g = vt(h.map(function(e) {
					return [
						e[s] - p,
						e[l],
						f - e[l] - e[s] + p
					];
				})).filter(function(e) {
					return e;
				}).sort(function(e, t) {
					return e - t;
				}), _ = g[0], v = g.map(function(e) {
					return G(e / _, .1) * o;
				}), y = 1, b = G(f / _, .1);
				for (y = 1; y <= 10 && !v.every(function(e) {
					return e * y % 1 == 0;
				}); ++y);
				var x = (-e + 1) / 2, S = Le(p - d, p - d + f, x, 1 - x);
				return {
					multiple: b * y,
					dir: e,
					snapSize: o,
					snapOffset: Math.round(S / o)
				};
			}), v = _.map(function(e) {
				return e.multiple || 1;
			});
			a.snapThresholdInfo.multiples = v, a.snapThresholdInfo.offset = _.map(function(e) {
				return e.snapOffset;
			}), _.forEach(function(e, t) {
				e.snapSize;
			});
		}
	} else a.snapThresholdInfo = null;
}
function Bo(e, t, n, r, i, a, o) {
	r === void 0 && (r = 0), i === void 0 && (i = 0);
	var s = e.props, c = e.state, l = s.snapGridWidth, u = l === void 0 ? 0 : l, d = s.snapGridHeight, f = d === void 0 ? 0 : d, p = [], m = a.left, h = a.top, g = [0, 0];
	zo(e, r, i, a);
	var _ = c.snapThresholdInfo, v = u, y = f;
	if (_ && (u *= _.multiples[0] || 1, f *= _.multiples[1] || 1, g = _.offset), f) {
		for (var b = function(e) {
			p.push({
				type: "horizontal",
				pos: [m, G(g[1] * y + e - i + h, .1)],
				className: X("grid-guideline"),
				size: t,
				hide: !o,
				direction: "",
				grid: !0
			});
		}, x = 0; x <= n * 2; x += f) b(x);
		for (var x = -f; x >= -n; x -= f) b(x);
	}
	if (u) {
		for (var b = function(e) {
			p.push({
				type: "vertical",
				pos: [G(g[0] * v + e - r + m, .1), h],
				className: X("grid-guideline"),
				size: n,
				hide: !o,
				direction: "",
				grid: !0
			});
		}, x = 0; x <= t * 2; x += u) b(x);
		for (var x = -u; x >= -t; x -= u) b(x);
	}
	return p;
}
function Vo(e, t, n, r) {
	return n === "horizontal" ? $(e.right - t.left) <= r || $(e.left - t.right) <= r || e.left <= t.right && t.left <= e.right : n !== "vertical" || $(e.bottom - t.top) <= r || $(e.top - t.bottom) <= r || e.top <= t.bottom && t.top <= e.bottom;
}
function Ho(e) {
	var t = e.state, n = e.props.elementGuidelines, r = n === void 0 ? [] : n;
	if (!r.length) return t.elementRects = [], [];
	var i = (t.elementRects || []).filter(function(e) {
		return !e.refresh;
	}), a = r.map(function(e) {
		return ze(e) && "element" in e ? q(q({}, e), { element: vc(e.element, !0) }) : { element: vc(e, !0) };
	}).filter(function(e) {
		return e.element;
	}), o = Cn(i.map(function(e) {
		return e.element;
	}), a.map(function(e) {
		return e.element;
	})), s = o.maintained, c = o.added, l = [];
	s.forEach(function(e) {
		var t = J(e, 2), n = t[0], r = t[1];
		l[r] = i[n];
	}), Go(e, c.map(function(e) {
		return a[e];
	})).map(function(e, t) {
		l[c[t]] = e;
	}), t.elementRects = l;
	var u = Sa(e.props.elementSnapDirections), d = [];
	return l.forEach(function(e) {
		var t = e.element, n = e.top, r = n === void 0 ? u.top : n, i = e.left, a = i === void 0 ? u.left : i, o = e.right, s = o === void 0 ? u.right : o, c = e.bottom, l = c === void 0 ? u.bottom : c, f = e.center, p = f === void 0 ? u.center : f, m = e.middle, h = m === void 0 ? u.middle : m, g = e.className, _ = e.rect, v = wa({
			top: r,
			right: s,
			left: a,
			bottom: l,
			center: p,
			middle: h
		}, _), y = v.horizontal, b = v.vertical, x = v.horizontalNames, S = v.verticalNames, C = _.top, w = _.left, T = _.right - w, E = _.bottom - C, D = [T, E];
		b.forEach(function(n, r) {
			d.push({
				type: "vertical",
				element: t,
				pos: [G(n, .1), C],
				size: E,
				sizes: D,
				className: g,
				elementRect: e,
				elementDirection: _a[S[r]] || S[r],
				direction: ""
			});
		}), y.forEach(function(n, r) {
			d.push({
				type: "horizontal",
				element: t,
				pos: [w, G(n, .1)],
				size: T,
				sizes: D,
				className: g,
				elementRect: e,
				elementDirection: _a[x[r]] || x[r],
				direction: ""
			});
		});
	}), d;
}
function Uo(e, t) {
	return e ? e.map(function(e) {
		var n = ze(e) ? e : { pos: e }, r = n.pos;
		return He(r) ? n : q(q({}, n), { pos: ot(r, t) });
	}) : [];
}
function Wo(e, t, n, r, i, a, o) {
	i === void 0 && (i = 0), a === void 0 && (a = 0), o === void 0 && (o = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	});
	var s = [], c = o.left, l = o.top, u = o.bottom, d = n + o.right - c, f = r + u - l;
	return Uo(e, f).forEach(function(e) {
		s.push({
			type: "horizontal",
			pos: [c, G(e.pos - a + l, .1)],
			size: d,
			className: e.className,
			direction: ""
		});
	}), Uo(t, d).forEach(function(e) {
		s.push({
			type: "vertical",
			pos: [G(e.pos - i + c, .1), l],
			size: f,
			className: e.className,
			direction: ""
		});
	}), s;
}
function Go(e, t) {
	if (!t.length) return [];
	var n = e.props.groupable, r = e.state, i = r.containerClientRect, a = r.rootMatrix, o = r.is3d, s = r.offsetDelta, c = o ? 4 : 3, l = J(Ta(a, i, c), 2), u = l[0], d = l[1], f = n ? 0 : s[0], p = n ? 0 : s[1];
	return t.map(function(e) {
		var t = e.element.getBoundingClientRect(), n = t.left - u - f, r = t.top - d - p, i = r + t.height, o = n + t.width, s = J(lc(a, [n, r], c), 2), l = s[0], m = s[1], h = J(lc(a, [o, i], c), 2), g = h[0], _ = h[1];
		return q(q({}, e), { rect: {
			left: l,
			right: g,
			top: m,
			bottom: _,
			center: (l + g) / 2,
			middle: (m + _) / 2
		} });
	});
}
function Ko(e) {
	var t = e.state, n = t.container, r = e.props.snapContainer || n;
	if (t.snapContainer === r && t.guidelines && t.guidelines.length) return !1;
	var i = t.containerClientRect, a = {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	};
	if (n !== r) {
		var o = vc(r, !0);
		if (o) {
			var s = Us(o), c = xc(t, [s.left - i.left, s.top - i.top]), l = xc(t, [s.right - i.right, s.bottom - i.bottom]);
			a.left = G(c[0], 1e-5), a.top = G(c[1], 1e-5), a.right = G(l[0], 1e-5), a.bottom = G(l[1], 1e-5);
		}
	}
	return t.snapContainer = r, t.snapOffset = a, t.guidelines = Lo(e), t.enableSnap = !0, !0;
}
function qo(e, t, n, r, i, a) {
	var o = Os(e, t, n, a ? 4 : 3);
	return qs(o, K(i, _i(o, r)));
}
function Jo(e) {
	return e ? e / $(e) : 0;
}
function Yo(e, t, n, r, i, a) {
	var o = a.fixedDirection, s = Va(n, o, r), c = Za(e, t, n, r), l = Y(Y([], J(fo(e, t, s, r, i, a)), !1), J(Ja(e, c, a)), !1), u = Ba(l, 0), d = Ba(l, 1);
	return {
		width: {
			isBound: u.isBound,
			offset: u.offset[0]
		},
		height: {
			isBound: d.isBound,
			offset: d.offset[1]
		}
	};
}
function Xo(e, t, n, r, i, a, o, s, c) {
	var l = _i(t, o), u = co(e, s, {
		vertical: [l[0]],
		horizontal: [l[1]]
	}), d = u.horizontal.offset, f = u.vertical.offset;
	if (G(f, Gr) || G(d, Gr)) {
		var p = J(di({
			datas: c,
			distX: -f,
			distY: -d
		}), 2), m = p[0], h = p[1], g = Math.min(i || Infinity, n + o[0] * m), _ = Math.min(a || Infinity, r + o[1] * h);
		return [g - n, _ - r];
	}
	return [0, 0];
}
function Zo(e, t, n, r, i, a, o, s) {
	for (var c = Js(e.state), l = e.props.keepRatio, u = 0, d = 0, f = 0; f < 2; ++f) {
		var p = Yo(e, t(u, d), i, l, o, s), m = p.width, h = p.height, g = m.isBound, _ = h.isBound, v = m.offset, y = h.offset;
		if (f === 1 && (g || (v = 0), _ || (y = 0)), f === 0 && o && !g && !_) return [0, 0];
		if (l) {
			var b = $(v) * (n ? 1 / n : 1), x = $(y) * (r ? 1 / r : 1);
			(g && _ ? b < x : _ || !g && b < x) ? v = n * y / r : y = r * v / n;
		}
		u += v, d += y;
	}
	if (!l && i[0] && i[1]) {
		var S = ho(e, c, i, a, s), C = S.maxWidth, w = S.maxHeight, T = J(Xo(e, t(u, d).map(function(e) {
			return e.map(function(e) {
				return G(e, Gr);
			});
		}), n + u, r + d, C, w, i, o, s), 2), v = T[0], y = T[1];
		u += v, d += y;
	}
	return [u, d];
}
function Qo(e) {
	return e < 0 && (e = e % 360 + 360), e %= 360, e;
}
function $o(e, t) {
	t = Qo(t);
	var n = Math.floor(e / 360), r = n * 360 + 360 - t, i = n * 360 + t;
	return $(e - r) < $(e - i) ? r : i;
}
function es(e, t) {
	e = Qo(e), t = Qo(t);
	var n = Qo(e - t);
	return Math.min(n, 360 - n);
}
function ts(e, t, n, r) {
	var i = e.props, a = i[Da] ?? 5, o = i[Oa];
	if (xa(e, "rotatable")) {
		var s = t.pos1, c = t.pos2, l = t.pos3, u = t.pos4, d = t.origin, f = n * Math.PI / 180, p = [
			s,
			c,
			l,
			u
		].map(function(e) {
			return K(e, d);
		}), m = p.map(function(e) {
			return Xt(e, f);
		}), h = Y(Y([], J(ma(e, p, m, d, n)), !1), J(to(e, p, m, d, n)), !1);
		h.sort(function(e, t) {
			return $(e - n) - $(t - n);
		});
		var g = h.length > 0;
		if (g) return {
			isSnap: g,
			dist: g ? h[0] : n
		};
	}
	if (o?.length && a) {
		var _ = o.slice().sort(function(e, t) {
			return es(e, r) - es(t, r);
		})[0];
		if (es(_, r) <= a) return {
			isSnap: !0,
			dist: n + $o(r, _) - r
		};
	}
	return {
		isSnap: !1,
		dist: n
	};
}
function ns(e, t, n, r, i, a, o) {
	if (!xa(e, "resizable")) return [0, 0];
	var s = o.fixedDirection, c = o.nextAllMatrix, l = e.state, u = l.allMatrix, d = l.is3d;
	return Zo(e, function(e, r) {
		return qo(c || u, t + e, n + r, s, i, d);
	}, t, n, r, i, a, o);
}
function rs(e, t, n, r, i) {
	if (!xa(e, "scalable")) return [0, 0];
	var a = i.startOffsetWidth, o = i.startOffsetHeight, s = i.fixedPosition, c = i.fixedDirection, l = i.is3d, u = Zo(e, function(e, n) {
		return qo(xi(i, Ht(t, [e / a, n / o])), a, o, c, s, l);
	}, a, o, n, s, r, i);
	return [u[0] / a, u[1] / o];
}
function is(e, t) {
	t.absolutePoses = Js(e.state);
}
function as(e) {
	var t = [];
	return e.forEach(function(e) {
		e.guidelineInfos.forEach(function(n) {
			var r = n.guideline;
			nt(t, function(e) {
				return e.guideline === r;
			}) || (r.direction = "", t.push({
				guideline: r,
				posInfo: e
			}));
		});
	}), t.map(function(e) {
		var t = e.guideline, n = e.posInfo;
		return q(q({}, t), { direction: n.direction });
	});
}
function os(e, t, n, r, i, a) {
	var o = ca(la(e, a), t, n), s = o.vertical, c = o.horizontal, l = ba();
	s.forEach(function(e) {
		e.isBound && (e.direction === "start" && (l.left = !0), e.direction === "end" && (l.right = !0), r.push({
			type: "bounds",
			pos: e.pos
		}));
	}), c.forEach(function(e) {
		e.isBound && (e.direction === "start" && (l.top = !0), e.direction === "end" && (l.bottom = !0), i.push({
			type: "bounds",
			pos: e.pos
		}));
	});
	var u = no(e), d = u.boundMap, f = u.vertical, p = u.horizontal;
	return f.forEach(function(e) {
		tt(r, function(t) {
			var n = t.type, r = t.pos;
			return n === "bounds" && r === e;
		}) >= 0 || r.push({
			type: "bounds",
			pos: e
		});
	}), p.forEach(function(e) {
		tt(i, function(t) {
			var n = t.type, r = t.pos;
			return n === "bounds" && r === e;
		}) >= 0 || i.push({
			type: "bounds",
			pos: e
		});
	}), {
		boundMap: l,
		innerBoundMap: d
	};
}
var ss = hc("", ["resizable", "scalable"]), cs = {
	name: "snappable",
	dragRelation: "strong",
	props: [
		"snappable",
		"snapContainer",
		"snapDirections",
		"elementSnapDirections",
		"snapGap",
		"snapGridWidth",
		"snapGridHeight",
		"isDisplaySnapDigit",
		"isDisplayInnerSnapDigit",
		"isDisplayGridGuidelines",
		"snapDigit",
		"snapThreshold",
		"snapRenderThreshold",
		"snapGridAll",
		Da,
		Oa,
		ka,
		Aa,
		"horizontalGuidelines",
		"verticalGuidelines",
		"elementGuidelines",
		"bounds",
		"innerBounds",
		"snapDistFormat",
		"maxSnapElementGuidelineDistance",
		"maxSnapElementGapDistance"
	],
	events: ["snap", "bound"],
	css: [":host {\n--bounds-color: #d66;\n}\n.guideline {\npointer-events: none;\nz-index: 2;\n}\n.guideline.bounds {\nbackground: #d66;\nbackground: var(--bounds-color);\n}\n.guideline-group {\nposition: absolute;\ntop: 0;\nleft: 0;\n}\n.guideline-group .size-value {\nposition: absolute;\ncolor: #f55;\nfont-size: 12px;\nfont-size: calc(12px * var(--zoom));\nfont-weight: bold;\n}\n.guideline-group.horizontal .size-value {\ntransform-origin: 50% 100%;\ntransform: translateX(-50%);\nleft: 50%;\nbottom: 5px;\nbottom: calc(2px + 3px * var(--zoom));\n}\n.guideline-group.vertical .size-value {\ntransform-origin: 0% 50%;\ntop: 50%;\ntransform: translateY(-50%);\nleft: 5px;\nleft: calc(2px + 3px * var(--zoom));\n}\n.guideline.gap {\nbackground: #f55;\n}\n.size-value.gap {\ncolor: #f55;\n}\n"],
	render: function(e, t) {
		var n = e.state, r = n.top, i = n.left, a = n.pos1, o = n.pos2, s = n.pos3, c = n.pos4, l = n.snapRenderInfo, u = e.props.snapRenderThreshold, d = u === void 0 ? 1 : u;
		if (!l || !l.render || !xa(e, "")) return Oc(e, "boundMap", ba(), function(e) {
			return JSON.stringify(e);
		}), Oc(e, "innerBoundMap", ba(), function(e) {
			return JSON.stringify(e);
		}), [];
		n.guidelines = Lo(e);
		var f = Math.min(a[0], o[0], s[0], c[0]), p = Math.min(a[1], o[1], s[1], c[1]), m = l.externalPoses || [], h = Js(e.state), g = [], _ = [], v = [], y = [], b = [], x = ks(h), S = x.width, C = x.height, w = x.top, T = x.left, E = x.bottom, D = x.right, O = {
			left: T,
			right: D,
			top: w,
			bottom: E,
			center: (T + D) / 2,
			middle: (w + E) / 2
		}, k = m.length > 0, A = k ? ks(m) : {};
		if (!l.request) {
			if (l.direction && b.push(Ra(e, h, l.direction, d, d)), l.snap) {
				var j = ks(h);
				l.center && (j.middle = (j.top + j.bottom) / 2, j.center = (j.left + j.right) / 2), b.push(Fa(e, j, d, d));
			}
			k && (l.center && (A.middle = (A.top + A.bottom) / 2, A.center = (A.left + A.right) / 2), b.push(Fa(e, A, d, d))), b.forEach(function(e) {
				var t = e.vertical.posInfos, n = e.horizontal.posInfos;
				g.push.apply(g, Y([], J(t.filter(function(e) {
					return e.guidelineInfos.some(function(e) {
						return !e.guideline.hide;
					});
				}).map(function(e) {
					return {
						type: "snap",
						pos: e.pos
					};
				})), !1)), _.push.apply(_, Y([], J(n.filter(function(e) {
					return e.guidelineInfos.some(function(e) {
						return !e.guideline.hide;
					});
				}).map(function(e) {
					return {
						type: "snap",
						pos: e.pos
					};
				})), !1)), v.push.apply(v, Y([], J(as(t)), !1)), y.push.apply(y, Y([], J(as(n)), !1));
			});
		}
		var M = os(e, [T, D], [w, E], g, _), N = M.boundMap, P = M.innerBoundMap;
		k && os(e, [A.left, A.right], [A.top, A.bottom], g, _, l.externalBounds);
		var F = Y(Y([], J(v), !1), J(y), !1), I = F.filter(function(e) {
			return e.element && !e.gapRects;
		}), L = F.filter(function(e) {
			return e.gapRects;
		}).sort(function(e, t) {
			return e.gap - t.gap;
		});
		Q(e, "onSnap", {
			guidelines: F.filter(function(e) {
				return !e.element;
			}),
			elements: I,
			gaps: L
		}, !0);
		var R = Oc(e, "boundMap", N, function(e) {
			return JSON.stringify(e);
		}, ba()), z = Oc(e, "innerBoundMap", P, function(e) {
			return JSON.stringify(e);
		}, ba());
		return (N === R || P === z) && Q(e, "onBound", {
			bounds: N,
			innerBounds: P
		}, !0), Y(Y(Y(Y(Y(Y([], J(Fo(e, I, [f, p], O, t)), !1), J(Io(e, L, [f, p], O, t)), !1), J(Mo(e, "horizontal", y, [i, r], O, t)), !1), J(Mo(e, "vertical", v, [i, r], O, t)), !1), J(jo(e, "horizontal", _, f, r, S, 0, t)), !1), J(jo(e, "vertical", g, p, i, C, 1, t)), !1);
	},
	dragStart: function(e, t) {
		e.state.snapRenderInfo = {
			request: t.isRequest,
			snap: !0,
			center: !0
		}, Ko(e);
	},
	drag: function(e) {
		var t = e.state;
		Ko(e) || (t.guidelines = Lo(e)), t.snapRenderInfo && (t.snapRenderInfo.render = !0);
	},
	pinchStart: function(e) {
		this.unset(e);
	},
	dragEnd: function(e) {
		this.unset(e);
	},
	dragControlCondition: function(e, t) {
		if (ss(e, t) || Do(e, t)) return !0;
		if (!t.isRequest && t.inputEvent) return yt(t.inputEvent.target, X("snap-control"));
	},
	dragControlStart: function(e) {
		e.state.snapRenderInfo = null, Ko(e);
	},
	dragControl: function(e) {
		this.drag(e);
	},
	dragControlEnd: function(e) {
		this.unset(e);
	},
	dragGroupStart: function(e, t) {
		this.dragStart(e, t);
	},
	dragGroup: function(e) {
		this.drag(e);
	},
	dragGroupEnd: function(e) {
		this.unset(e);
	},
	dragGroupControlStart: function(e) {
		e.state.snapRenderInfo = null, Ko(e);
	},
	dragGroupControl: function(e) {
		this.drag(e);
	},
	dragGroupControlEnd: function(e) {
		this.unset(e);
	},
	unset: function(e) {
		var t = e.state;
		t.enableSnap = !1, t.guidelines = [], t.snapRenderInfo = null, t.elementRects = [];
	}
};
function ls(e, t) {
	return [e[0] * t[0], e[1] * t[1]];
}
function X() {
	var e = [...arguments];
	return Se.apply(void 0, Y([Hr], J(e), !1));
}
function us(e) {
	e();
}
function ds(e) {
	return !e || e === "none" ? [
		1,
		0,
		0,
		1,
		0,
		0
	] : ze(e) ? e : sn(e);
}
function fs(e, t, n) {
	return Bt(t, nn(n, t), e, nn(n.map(function(e) {
		return -e;
	}), t));
}
function ps(e, t, n) {
	return t === "%" ? ws(e.ownerSVGElement)[n ? "width" : "height"] / 100 : 1;
}
function ms(e) {
	return gs(tc(e, ":before")).map(function(t, n) {
		var r = Qe(t), i = r.value, a = r.unit;
		return i * ps(e, a, n === 0);
	});
}
function hs(e) {
	return e ? e.split(" ") : ["0", "0"];
}
function gs(e) {
	return hs(e.transformOrigin);
}
function _s(e) {
	var t = Yi(e)("transform");
	if (t && t !== "none") return t;
	if ("transform" in e) {
		var n = e.transform.baseVal;
		if (!n) return "";
		var r = n.length;
		if (!r) return "";
		for (var i = [], a = function(e) {
			var t = n[e].matrix;
			i.push(`matrix(${[
				"a",
				"b",
				"c",
				"d",
				"e",
				"f"
			].map(function(e) {
				return t[e];
			}).join(", ")})`);
		}, o = 0; o < r; ++o) a(o);
		return i.join(" ");
	}
	return "";
}
function vs(e, t, n, r, i) {
	var a = Tt(e) || Et(e), o = !1, s, c;
	if (!e || n) s = e;
	else {
		var l = e?.assignedSlot?.parentElement, u = e.parentElement;
		l ? (o = !0, c = u, s = l) : s = u;
	}
	for (var d = !1, f = e === t || s === t, p = "relative", m = 1, h = parseFloat(i?.("zoom")) || 1, g = i?.("position"); s && s !== a;) {
		t === s && (f = !0);
		var _ = Yi(s), v = s.tagName.toLowerCase(), y = _s(s), b = _("willChange"), x = parseFloat(_("zoom")) || 1;
		if (p = _("position"), r && x !== 1) {
			m = x;
			break;
		}
		if (!n && r && h !== 1 && g && g !== "absolute" || v === "svg" || v === "foreignobject" || p !== "static" || y && y !== "none" || b === "transform") break;
		var S = e?.assignedSlot?.parentNode, C = s.parentNode;
		S && (o = !0, c = C);
		var w = C;
		if (w && w.nodeType === 11) {
			s = w.host, d = !0, p = Yi(s)("position");
			break;
		}
		s = w, p = "relative";
	}
	return {
		offsetZoom: m,
		hasSlot: o,
		parentSlotElement: c,
		isCustomElement: d,
		isStatic: p === "static",
		isEnd: f || !s || s === a,
		offsetParent: s || a
	};
}
function ys(e, t) {
	var n, r = e.tagName.toLowerCase(), i = e.offsetLeft, a = e.offsetTop, o = Yi(e), s = Re(i), c = !s, l, u;
	return !c && (r !== "svg" || e.ownerSVGElement) ? (l = Nr ? ms(e) : hs(o("transformOrigin")).map(function(e) {
		return parseFloat(e);
	}), u = l.slice(), c = !0, r === "svg" ? (i = 0, a = 0) : (n = J(Es(e, l, e === t && t.tagName.toLowerCase() === "g"), 4), i = n[0], a = n[1], l[0] = n[2], l[1] = n[3])) : (l = hs(o("transformOrigin")).map(function(e) {
		return parseFloat(e);
	}), u = l.slice()), {
		tagName: r,
		isSVG: s,
		hasOffset: c,
		offset: [i || 0, a || 0],
		origin: l,
		targetOrigin: u
	};
}
function bs(e, t) {
	var n = Yi(e), r = Yi(Et(e)), i = r("position");
	if (!t && (!i || i === "static")) return [0, 0];
	var a = parseInt(r("marginLeft"), 10), o = parseInt(r("marginTop"), 10);
	return n("position") === "absolute" && ((n("top") !== "auto" || n("bottom") !== "auto") && (o = 0), (n("left") !== "auto" || n("right") !== "auto") && (a = 0)), [a, o];
}
function xs(e) {
	e.forEach(function(e) {
		var t = e.matrix;
		t && (e.matrix = zt(t, 3, 4));
	});
}
function Ss(e) {
	for (var t = e.parentElement, n = !1, r = Et(e); t;) {
		var i = tc(t).transform;
		if (i && i !== "none") {
			n = !0;
			break;
		}
		if (t === r) break;
		t = t.parentElement;
	}
	return {
		fixedContainer: t || r,
		hasTransform: n
	};
}
function Cs(e, t) {
	return t === void 0 && (t = e.length > 9), `${t ? "matrix3d" : "matrix"}(${Wt(e, !t).join(",")})`;
}
function ws(e) {
	var t = e.clientWidth, n = e.clientHeight;
	if (!e) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		clientWidth: t,
		clientHeight: n
	};
	var r = e.viewBox, i = r && r.baseVal || {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	return {
		x: i.x,
		y: i.y,
		width: i.width || t,
		height: i.height || n,
		clientWidth: t,
		clientHeight: n
	};
}
function Ts(e, t) {
	var n, r = ws(e), i = r.width, a = r.height, o = r.clientWidth, s = r.clientHeight, c = o / i, l = s / a, u = e.preserveAspectRatio.baseVal, d = u.align, f = u.meetOrSlice, p = [0, 0], m = [c, l], h = [0, 0];
	if (d !== 1) {
		var g = (d - 2) % 3, _ = Math.floor((d - 2) / 3);
		p[0] = i * g / 2, p[1] = a * _ / 2;
		var v = f === 2 ? Math.max(l, c) : Math.min(c, l);
		m[0] = v, m[1] = v, h[0] = (o - i) / 2 * g, h[1] = (s - a) / 2 * _;
	}
	var y = tn(m, t);
	return n = J(h, 2), y[t * (t - 1)] = n[0], y[t * (t - 1) + 1] = n[1], fs(y, t, p);
}
function Es(e, t, n) {
	var r = e.tagName.toLowerCase();
	if (!e.getBBox || !n && r === "g") return [
		0,
		0,
		0,
		0
	];
	var i = Yi(e)("transform-box") === "fill-box", a = e.getBBox(), o = ws(e.ownerSVGElement), s = a.x, c = a.y;
	r === "foreignobject" && !s && !c && (s = parseFloat(e.getAttribute("x")) || 0, c = parseFloat(e.getAttribute("y")) || 0);
	var l = s - o.x, u = c - o.y;
	return [
		l,
		u,
		i ? t[0] : t[0] - l,
		i ? t[1] : t[1] - u
	];
}
function Ds(e, t, n) {
	return Gt(e, Rt(t, n), n);
}
function Os(e, t, n, r) {
	return [
		[0, 0],
		[t, 0],
		[0, n],
		[t, n]
	].map(function(t) {
		return Ds(e, t, r);
	});
}
function ks(e) {
	var t = e.map(function(e) {
		return e[0];
	}), n = e.map(function(e) {
		return e[1];
	}), r = Math.min.apply(Math, Y([], J(t), !1)), i = Math.min.apply(Math, Y([], J(n), !1)), a = Math.max.apply(Math, Y([], J(t), !1)), o = Math.max.apply(Math, Y([], J(n), !1));
	return {
		left: r,
		top: i,
		right: a,
		bottom: o,
		width: a - r,
		height: o - i
	};
}
function As(e, t, n, r) {
	return ks(Os(e, t, n, r));
}
function js(e, t, n, r, i) {
	var a, o = e.target, s = e.origin, c = t.matrix, l = Rs(o), u = l.offsetWidth, d = l.offsetHeight, f = n.getBoundingClientRect(), p = [0, 0];
	n === Et(n) && (p = bs(o, !0));
	for (var m = o.getBoundingClientRect(), h = m.left - f.left + n.scrollLeft - (n.clientLeft || 0) + p[0], g = m.top - f.top + n.scrollTop - (n.clientTop || 0) + p[1], _ = m.width, v = m.height, y = Bt(r, i, c), b = As(y, u, d, r), x = b.left, S = b.top, C = b.width, w = b.height, T = Ds(y, s, r), E = K(T, [x, S]), D = [h + E[0] * _ / C, g + E[1] * v / w], O = [0, 0], k = 0; ++k < 10;) {
		var A = Pt(i, r);
		a = J(K(Ds(A, D, r), Ds(A, T, r)), 2), O[0] = a[0], O[1] = a[1];
		var j = As(Bt(r, i, nn(O, r), c), u, d, r), M = j.left, N = j.top, P = M - h, F = N - g;
		if ($(P) < 2 && $(F) < 2) break;
		D[0] -= P, D[1] -= F;
	}
	return O.map(function(e) {
		return Math.round(e);
	});
}
function Ms(e, t, n) {
	var r = e.length === 16 ? 4 : 3, i = t.map(function(t) {
		return Ds(e, t, r);
	}), a = n.left, o = n.top;
	return i.map(function(e) {
		return [e[0] + a, e[1] + o];
	});
}
function Ns(e) {
	return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Ps(e, t) {
	return Ns([t[0] - e[0], t[1] - e[1]]);
}
function Fs(e, t, n, r) {
	n === void 0 && (n = 1), r === void 0 && (r = ft(e, t));
	var i = Ps(e, t);
	return {
		transform: `translateY(-50%) translate(${e[0]}px, ${e[1]}px) rotate(${r}rad) scaleY(${n})`,
		width: `${i}px`
	};
}
function Is(e, t) {
	var n = [...arguments].slice(2), r = n.length;
	return { transform: `translateZ(0px) translate(${n.reduce(function(e, t) {
		return e + t[0];
	}, 0) / r}px, ${n.reduce(function(e, t) {
		return e + t[1];
	}, 0) / r}px) rotate(${e}rad) scale(${t})` };
}
function Ls(e, t) {
	var n = e[t];
	return ze(n) ? q(q({}, e), n) : e;
}
function Rs(e) {
	var t = e && !Re(e.offsetWidth), n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = Infinity, h = Infinity, g = Infinity, _ = Infinity, v = 0, y = 0, b = !1;
	if (e) if (!t && e.ownerSVGElement) {
		var x = e.getBBox();
		b = !0, n = x.width, r = x.height, o = n, s = r, c = n, l = r, i = n, a = r;
	} else {
		var S = Yi(e), C = e.style, w = S("boxSizing") === "border-box", T = parseFloat(S("borderLeftWidth")) || 0, E = parseFloat(S("borderRightWidth")) || 0, D = parseFloat(S("borderTopWidth")) || 0, O = parseFloat(S("borderBottomWidth")) || 0, k = parseFloat(S("paddingLeft")) || 0, A = parseFloat(S("paddingRight")) || 0, j = parseFloat(S("paddingTop")) || 0, M = parseFloat(S("paddingBottom")) || 0, N = k + A, P = j + M, F = T + E, I = D + O, L = N + F, R = P + I, z = S("position"), B = 0, ee = 0;
		if ("clientLeft" in e) {
			var V = null;
			if (V = z === "absolute" ? vs(e, Et(e)).offsetParent : e.parentElement, V) {
				var te = Yi(V);
				B = parseFloat(te("width")), ee = parseFloat(te("height"));
			}
		}
		u = Math.max(N, ot(S("minWidth"), B) || 0), d = Math.max(P, ot(S("minHeight"), ee) || 0), m = ot(S("maxWidth"), B), h = ot(S("maxHeight"), ee), isNaN(m) && (m = Infinity), isNaN(h) && (h = Infinity), v = ot(C.width, 0) || 0, y = ot(C.height, 0) || 0, o = parseFloat(S("width")) || 0, s = parseFloat(S("height")) || 0, c = $(o - v) < 1 ? st(u, v || o, m) : o, l = $(s - y) < 1 ? st(d, y || s, h) : s, n = c, r = l, i = c, a = l, w ? (g = m, _ = h, f = u, p = d, c = n - L, l = r - R) : (g = m + L, _ = h + R, f = u + L, p = d + R, n = c + L, r = l + R), i = c + N, a = l + P;
	}
	return {
		svg: b,
		offsetWidth: n,
		offsetHeight: r,
		clientWidth: i,
		clientHeight: a,
		contentWidth: c,
		contentHeight: l,
		inlineCSSWidth: v,
		inlineCSSHeight: y,
		cssWidth: o,
		cssHeight: s,
		minWidth: u,
		minHeight: d,
		maxWidth: m,
		maxHeight: h,
		minOffsetWidth: f,
		minOffsetHeight: p,
		maxOffsetWidth: g,
		maxOffsetHeight: _
	};
}
function zs(e, t) {
	return ft(t > 0 ? e[0] : e[1], t > 0 ? e[1] : e[0]);
}
function Bs() {
	return {
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		right: 0,
		bottom: 0,
		clientLeft: 0,
		clientTop: 0,
		clientWidth: 0,
		clientHeight: 0,
		scrollWidth: 0,
		scrollHeight: 0
	};
}
function Vs(e, t) {
	var n = e === Et(e) || e === Tt(e), r = {
		clientLeft: e.clientLeft,
		clientTop: e.clientTop,
		clientWidth: e.clientWidth,
		clientHeight: e.clientHeight,
		scrollWidth: e.scrollWidth,
		scrollHeight: e.scrollHeight,
		overflow: !1
	};
	return n && (r.clientHeight = Math.max(t.height, r.clientHeight), r.scrollHeight = Math.max(t.height, r.scrollHeight)), r.overflow = Yi(e)("overflow") !== "visible", q(q({}, t), r);
}
function Hs(e, t, n, r) {
	var i = e.left, a = e.right, o = e.top, s = e.bottom, c = t.top, l = t.left, u = {
		left: l + i,
		top: c + o,
		right: l + a,
		bottom: c + s,
		width: a - i,
		height: s - o
	};
	return n && r ? Vs(n, u) : u;
}
function Us(e, t) {
	var n = 0, r = 0, i = 0, a = 0;
	if (e) {
		var o = e.getBoundingClientRect();
		n = o.left, r = o.top, i = o.width, a = o.height;
	}
	var s = {
		left: n,
		top: r,
		width: i,
		height: a,
		right: n + i,
		bottom: r + a
	};
	return e && t ? Vs(e, s) : s;
}
function Ws(e) {
	var t = e.props, n = t.groupable, r = t.svgOrigin, i = e.getState(), a = i.offsetWidth, o = i.offsetHeight, s = i.svg, c = i.transformOrigin;
	return !n && s && r ? Tc(r, a, o) : c;
}
function Gs(e, t, n, r) {
	var i;
	if (e) i = e;
	else if (t) i = [0, 0];
	else {
		var a = n.target;
		i = Ks(a, r);
	}
	return i;
}
function Ks(e, t) {
	if (e) {
		var n = e.getAttribute("data-rotation") || "", r = e.getAttribute("data-direction");
		if (t.deg = n, r) {
			var i = [0, 0];
			return r.indexOf("w") > -1 && (i[0] = -1), r.indexOf("e") > -1 && (i[0] = 1), r.indexOf("n") > -1 && (i[1] = -1), r.indexOf("s") > -1 && (i[1] = 1), i;
		}
	}
}
function qs(e, t) {
	return [
		Ht(t, e[0]),
		Ht(t, e[1]),
		Ht(t, e[2]),
		Ht(t, e[3])
	];
}
function Js(e) {
	var t = e.left, n = e.top, r = e.pos1, i = e.pos2, a = e.pos3, o = e.pos4;
	return qs([
		r,
		i,
		a,
		o
	], [t, n]);
}
function Ys(e, t) {
	e[t ? "controlAbles" : "targetAbles"].forEach(function(t) {
		t.unset && t.unset(e);
	});
}
function Xs(e, t) {
	var n = t ? "controlGesto" : "targetGesto", r = e[n];
	r?.isIdle() === !1 && Ys(e, t), r?.unset(), e[n] = null;
}
function Zs(e, t) {
	if (t) {
		var n = Ei(t);
		n.nextStyle = q(q({}, n.nextStyle), e);
	}
	return {
		style: e,
		cssText: at(e).map(function(t) {
			return `${$e(t, "-")}: ${e[t]};`;
		}).join("")
	};
}
function Qs(e, t, n) {
	var r = t.afterTransform || t.transform;
	return q(q({}, Zs(q(q(q({}, e.style), t.style), { transform: r }), n)), {
		afterTransform: r,
		transform: e.transform
	});
}
function Z(e, t, n, r) {
	var i = t.datas;
	i.datas ||= {};
	var a = q(q({}, n), {
		target: e.state.target,
		clientX: t.clientX,
		clientY: t.clientY,
		inputEvent: t.inputEvent,
		currentTarget: e,
		moveable: e,
		datas: i.datas,
		isRequest: t.isRequest,
		isRequestChild: t.isRequestChild,
		isFirstDrag: !!t.isFirstDrag,
		isTrusted: t.isTrusted !== !1,
		stopAble: function() {
			i.isEventStart = !1;
		},
		stopDrag: function() {
			var e;
			(e = t.stop) == null || e.call(t);
		}
	});
	return i.isStartEvent ? r || (i.lastEvent = a) : i.isStartEvent = !0, a;
}
function $s(e, t, n) {
	var r = t.datas, i = "isDrag" in n ? n.isDrag : t.isDrag;
	return r.datas ||= {}, q(q({ isDrag: i }, n), {
		moveable: e,
		target: e.state.target,
		clientX: t.clientX,
		clientY: t.clientY,
		inputEvent: t.inputEvent,
		currentTarget: e,
		lastEvent: r.lastEvent,
		isDouble: t.isDouble,
		datas: r.datas,
		isFirstDrag: !!t.isFirstDrag
	});
}
function ec(e, t, n) {
	e._emitter.on(t, n);
}
function Q(e, t, n, r, i) {
	return e.triggerEvent(t, n, r, i);
}
function tc(e, t) {
	return Dt(e).getComputedStyle(e, t);
}
function nc(e, t, n) {
	var r = {}, i = {};
	return e.filter(function(e) {
		var a = e.name;
		if (r[a] || !t.some(function(t) {
			return e[t];
		})) return !1;
		if (!n && e.ableGroup) {
			if (i[e.ableGroup]) return !1;
			i[e.ableGroup] = !0;
		}
		return r[a] = !0, !0;
	});
}
function rc(e, t) {
	return e === t || e == null && t == null;
}
function ic() {
	for (var e = [...arguments], t = e.length - 1, n = 0; n < t; ++n) {
		var r = e[n];
		if (!Re(r)) return r;
	}
	return e[t];
}
function ac(e, t) {
	var n = [], r = [];
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r.indexOf(o), c = n[s] || [];
		s === -1 && (r.push(o), n.push(c)), c.push(i);
	}), n;
}
function oc(e, t) {
	var n = [], r = {};
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r[o];
		s || (s = [], r[o] = s, n.push(s)), s.push(i);
	}), n;
}
function sc(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function cc() {
	var e = [...arguments];
	return e.sort(function(e, t) {
		return $(t) - $(e);
	}), e[0];
}
function lc(e, t, n) {
	return Gt(Pt(e, n), Rt(t, n), n);
}
function uc(e, t) {
	var n, r = e.is3d, i = e.rootMatrix, a = r ? 4 : 3;
	return n = J(lc(i, [t.distX, t.distY], a), 2), t.distX = n[0], t.distY = n[1], t;
}
function dc(e, t, n, r) {
	if (!n[0] && !n[1]) return t;
	var i = Ds(e, [Jo(n[0] || 1), 0], r), a = Ds(e, [0, Jo(n[1] || 1)], r);
	return Ht(t, Ds(e, [n[0] / Ns(i), n[1] / Ns(a)], r));
}
function fc(e, t, n) {
	return n ? `${e / t * 100}%` : `${e}px`;
}
function pc(e) {
	return $(e) <= Kr ? 0 : e;
}
function mc(e) {
	return function(t) {
		if (!t.isDragging(e)) return "";
		var n = zi(t, e).deg;
		return n ? X(`view-control-rotation${n}`) : "";
	};
}
function hc(e, t) {
	return t === void 0 && (t = [e]), function(n, r) {
		if (r.isRequest) return t.some(function(e) {
			return r.requestAble === e;
		}) ? r.parentDirection : !1;
		var i = r.inputEvent.target;
		return yt(i, X("direction")) && (!e || yt(i, X(e)));
	};
}
function gc(e, t, n) {
	var r = un(e, {
		"x%": function(e) {
			return e / 100 * t.offsetWidth;
		},
		"y%": function(e) {
			return e / 100 * t.offsetHeight;
		}
	}), i = e.slice(0, n < 0 ? void 0 : n), a = e.slice(0, n < 0 ? void 0 : n + 1), o = e[n] || "", s = n < 0 ? [] : e.slice(n), c = n < 0 ? [] : e.slice(n + 1), l = r.slice(0, n < 0 ? void 0 : n), u = r.slice(0, n < 0 ? void 0 : n + 1), d = r[n] ?? un([""])[0], f = n < 0 ? [] : r.slice(n), p = n < 0 ? [] : r.slice(n + 1), m = d ? [d] : [], h = ln(l), g = ln(u), _ = ln(f), v = ln(p), y = Vt(h, _, 4);
	return {
		transforms: e,
		beforeFunctionMatrix: h,
		beforeFunctionMatrix2: g,
		targetFunctionMatrix: ln(m),
		afterFunctionMatrix: _,
		afterFunctionMatrix2: v,
		allFunctionMatrix: y,
		beforeFunctions: l,
		beforeFunctions2: u,
		targetFunction: m[0],
		afterFunctions: f,
		afterFunctions2: p,
		beforeFunctionTexts: i,
		beforeFunctionTexts2: a,
		targetFunctionText: o,
		afterFunctionTexts: s,
		afterFunctionTexts2: c
	};
}
function _c(e) {
	return !e || !ze(e) || kt(e) ? !1 : Be(e) || "length" in e;
}
function vc(e, t) {
	return e ? kt(e) ? e : Ve(e) ? t ? document.querySelector(e) : e : Ue(e) ? e() : Ot(e) ? e : "current" in e ? e.current : e : null;
}
function yc(e, t) {
	return e ? (_c(e) ? [].slice.call(e) : [e]).reduce(function(e, n) {
		return Ve(n) && t ? Y(Y([], J(e), !1), J([].slice.call(document.querySelectorAll(n))), !1) : (Be(n) ? e.push(yc(n, t)) : e.push(vc(n, t)), e);
	}, []) : [];
}
function bc(e, t, n) {
	var r = ft(e, t) / Math.PI * 180;
	return r = n >= 0 ? r : 180 - r, r = r >= 0 ? r : 360 + r, r;
}
function xc(e, t) {
	var n = e.rootMatrix, r = e.is3d, i = Pt(n, r ? 4 : 3);
	return r || (i = zt(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, cn(i, t);
}
function Sc(e, t, n, r, i) {
	var a = J(e, 2), o = a[0], s = a[1], c = 0, l = 0;
	if (i && o && s) {
		var u = ft([0, 0], t), d = ft([0, 0], r), f = Ns(t), p = Math.cos(u - d) * f;
		if (!r[0]) l = p, c = l * n;
		else if (!r[1]) c = p, l = c / n;
		else {
			var m = r[0] * o, h = r[1] * s, g = Math.atan2(m + t[0], h + t[1]), _ = Math.atan2(m, h);
			g < 0 && (g += Math.PI * 2), _ < 0 && (_ += Math.PI * 2);
			var v = 0;
			$(g - _) < Math.PI / 2 || $(g - _) > Math.PI / 2 * 3 || (_ += Math.PI), v = g - _, v > Math.PI * 2 ? v -= Math.PI * 2 : v > Math.PI ? v = 2 * Math.PI - v : v < -Math.PI && (v = -2 * Math.PI - v);
			var y = Ns([m + t[0], h + t[1]]) * Math.cos(v);
			c = y * Math.sin(_) - m, l = y * Math.cos(_) - h, r[0] < 0 && (c *= -1), r[1] < 0 && (l *= -1);
		}
	} else c = r[0] * t[0], l = r[1] * t[1];
	return [c, l];
}
function Cc(e, t, n, r) {
	var i, a = n.ratio, o = n.startOffsetWidth, s = n.startOffsetHeight, c = 0, l = 0, u = r.distX, d = r.distY, f = r.pinchScale, p = r.parentDistance, m = r.parentDist, h = r.parentScale, g = n.fixedDirection, _ = [0, 1].map(function(t) {
		return $(e[t] - g[t]);
	}), v = [0, 1].map(function(e) {
		var t = _[e];
		return t !== 0 && (t = 2 / t), t;
	});
	if (m) c = m[0], l = m[1], t && (c ? l ||= c / a : c = l * a);
	else if (He(f)) c = (f - 1) * o, l = (f - 1) * s;
	else if (h) c = (h[0] - 1) * o, l = (h[1] - 1) * s;
	else if (p) {
		var y = o * _[0], b = s * _[1], x = Ns([y, b]);
		c = p / x * y * v[0], l = p / x * b * v[1];
	} else {
		var S = di({
			datas: n,
			distX: u,
			distY: d
		});
		S = v.map(function(e, t) {
			return S[t] * e;
		}), i = J(Sc([o, s], S, a, e, t), 2), c = i[0], l = i[1];
	}
	return {
		distWidth: c,
		distHeight: l
	};
}
function wc(e, t) {
	if (t) {
		if (e === "left") return {
			x: "0%",
			y: "50%"
		};
		if (e === "top" || e === "center") return {
			x: "50%",
			y: "50%"
		};
		if (e === "right") return {
			x: "100%",
			y: "50%"
		};
		if (e === "bottom") return {
			x: "50%",
			y: "100%"
		};
		var n = J(e.split(" "), 2), r = n[0], i = n[1], a = wc(r || ""), o = wc(i || ""), s = q(q({}, a), o), c = {
			x: "50%",
			y: "50%"
		};
		return s.x && (c.x = s.x), s.y && (c.y = s.y), s.value && (s.x && !s.y && (c.y = s.value), !s.x && s.y && (c.x = s.value)), c;
	}
	return e === "left" ? { x: "0%" } : e === "right" ? { x: "100%" } : e === "top" ? { y: "0%" } : e === "bottom" ? { y: "100%" } : e ? e === "center" ? { value: "50%" } : { value: e } : {};
}
function Tc(e, t, n) {
	var r = wc(e, !0), i = r.x, a = r.y;
	return [ot(i, t) || 0, ot(a, n) || 0];
}
function Ec(e, t, n) {
	var r = e.map(function(e) {
		return K(e, t);
	}), i = r.map(function(e) {
		return Xt(e, n);
	});
	return {
		prev: r,
		next: i,
		result: i.map(function(e) {
			return Ht(e, t);
		})
	};
}
function Dc(e, t) {
	return e.length === t.length && e.every(function(e, n) {
		var r = t[n], i = Be(e), a = Be(r);
		return i && a ? Dc(e, r) : !i && !a && e === r;
	});
}
function Oc(e, t, n, r, i) {
	var a = e._store, o = a[t];
	if (!(t in a)) if (i != null) a[t] = i, o = i;
	else return a[t] = n, n;
	return o === n || r(o) === r(n) ? o : (a[t] = n, n);
}
function kc(e) {
	return e >= 0 ? 1 : -1;
}
function $(e) {
	return Math.abs(e);
}
function Ac(e, t) {
	return _t(e).map(function(e) {
		return t(e);
	});
}
function jc(e) {
	return He(e) ? {
		top: e,
		left: e,
		right: e,
		bottom: e
	} : {
		left: e.left || 0,
		top: e.top || 0,
		right: e.right || 0,
		bottom: e.bottom || 0
	};
}
var Mc = Er("pinchable", {
	props: ["pinchable"],
	events: [
		"pinchStart",
		"pinch",
		"pinchEnd",
		"pinchGroupStart",
		"pinchGroup",
		"pinchGroupEnd"
	],
	dragStart: function() {
		return !0;
	},
	pinchStart: function(e, t) {
		var n = t.datas, r = t.targets, i = t.angle, a = t.originalDatas, o = e.props, s = o.pinchable, c = o.ables;
		if (!s) return !1;
		var l = `onPinch${r ? "Group" : ""}Start`, u = `drag${r ? "Group" : ""}ControlStart`, d = (s === !0 ? e.controlAbles : c.filter(function(e) {
			return s.indexOf(e.name) > -1;
		})).filter(function(e) {
			return e.canPinch && e[u];
		}), f = Z(e, t, {});
		r && (f.targets = r), n.isPinch = Q(e, l, f) !== !1, n.ables = d;
		var p = n.isPinch;
		return p ? (d.forEach(function(n) {
			if (a[n.name] = a[n.name] || {}, n[u]) {
				var r = q(q({}, t), {
					datas: a[n.name],
					parentRotate: i,
					isPinch: !0
				});
				n[u](e, r);
			}
		}), e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: [0, 0]
		}, p) : !1;
	},
	pinch: function(e, t) {
		var n = t.datas, r = t.scale, i = t.distance, a = t.originalDatas, o = t.inputEvent, s = t.targets, c = t.angle;
		if (n.isPinch) {
			var l = i * (1 - 1 / r), u = Z(e, t, {});
			s && (u.targets = s), Q(e, `onPinch${s ? "Group" : ""}`, u);
			var d = n.ables, f = `drag${s ? "Group" : ""}Control`;
			return d.forEach(function(n) {
				n[f] && n[f](e, q(q({}, t), {
					datas: a[n.name],
					inputEvent: o,
					resolveMatrix: !0,
					pinchScale: r,
					parentDistance: l,
					parentRotate: c,
					isPinch: !0
				}));
			}), u;
		}
	},
	pinchEnd: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.inputEvent, a = t.targets, o = t.originalDatas;
		if (n.isPinch) {
			var s = `onPinch${a ? "Group" : ""}End`, c = $s(e, t, { isDrag: r });
			a && (c.targets = a), Q(e, s, c);
			var l = n.ables, u = `drag${a ? "Group" : ""}ControlEnd`;
			return l.forEach(function(n) {
				n[u] && n[u](e, q(q({}, t), {
					isDrag: r,
					datas: o[n.name],
					inputEvent: i,
					isPinch: !0
				}));
			}), r;
		}
	},
	pinchGroupStart: function(e, t) {
		return this.pinchStart(e, q(q({}, t), { targets: e.props.targets }));
	},
	pinchGroup: function(e, t) {
		return this.pinch(e, q(q({}, t), { targets: e.props.targets }));
	},
	pinchGroupEnd: function(e, t) {
		return this.pinchEnd(e, q(q({}, t), { targets: e.props.targets }));
	}
}), Nc = hc("scalable"), Pc = {
	name: "scalable",
	ableGroup: "size",
	canPinch: !0,
	props: [
		"scalable",
		"throttleScale",
		"renderDirections",
		"keepRatio",
		"edge",
		"displayAroundControls"
	],
	events: [
		"scaleStart",
		"beforeScale",
		"scale",
		"scaleEnd",
		"scaleGroupStart",
		"beforeScaleGroup",
		"scaleGroup",
		"scaleGroupEnd"
	],
	render: ia("scalable"),
	dragControlCondition: Nc,
	viewClassName: mc("scalable"),
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.inputEvent, a = t.parentDirection, o = Gs(a, r, i, n), s = e.state, c = s.width, l = s.height, u = s.targetTransform, d = s.target, f = s.pos1, p = s.pos2, m = s.pos4;
		if (!o || !d) return !1;
		r || ii(e, t), n.datas = {}, n.transform = u, n.prevDist = [1, 1], n.direction = o, n.startOffsetWidth = c, n.startOffsetHeight = l, n.startValue = [1, 1];
		var h = !o[0] && !o[1] || o[0] || !o[1];
		Ci(e, t, "scale"), n.isWidth = h;
		function g(e) {
			n.ratio = e && isFinite(e) ? e : 0;
		}
		n.startPositions = Js(e.state);
		function _(e) {
			var t = _o(n.startPositions, e);
			n.fixedDirection = t.fixedDirection, n.fixedPosition = t.fixedPosition, n.fixedOffset = t.fixedOffset;
		}
		n.setFixedDirection = _, g(ht(f, p) / ht(p, m)), _([-o[0], -o[1]]);
		var v = function(e) {
			n.minScaleSize = e;
		}, y = function(e) {
			n.maxScaleSize = e;
		};
		v([-Infinity, -Infinity]), y([Infinity, Infinity]);
		var b = Z(e, t, q(q({
			direction: o,
			set: function(e) {
				n.startValue = e;
			},
			setRatio: g,
			setFixedDirection: _,
			setMinScaleSize: v,
			setMaxScaleSize: y
		}, Si(e, t)), { dragStart: go.dragStart(e, new ti().dragStart([0, 0], t)) })), x = Q(e, "onScaleStart", b);
		return n.startFixedDirection = n.fixedDirection, x !== !1 && (n.isScale = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}), n.isScale ? b : !1;
	},
	dragControl: function(e, t) {
		oi(e, t, "scale");
		var n = t.datas, r = t.parentKeepRatio, i = t.parentFlag, a = t.isPinch, o = t.dragClient, s = t.isRequest, c = t.useSnap, l = t.resolveMatrix, u = n.prevDist, d = n.direction, f = n.startOffsetWidth, p = n.startOffsetHeight, m = n.isScale, h = n.startValue, g = n.isWidth, _ = n.ratio;
		if (!m) return !1;
		var v = e.props, y = v.throttleScale, b = v.parentMoveable, x = d;
		!d[0] && !d[1] && (x = [1, 1]);
		var S = _ && (r ?? v.keepRatio) || !1, C = e.state, w = [h[0], h[1]];
		function T() {
			var e = Cc(x, S, n, t), r = e.distWidth, i = e.distHeight, a = f ? (f + r) / f : 1, o = p ? (p + i) / p : 1;
			h[0] || (w[0] = r / f), h[1] || (w[1] = i / p);
			var s = (x[0] || S ? a : 1) * w[0], c = (x[1] || S ? o : 1) * w[1];
			return s === 0 && (s = kc(u[0]) * qr), c === 0 && (c = kc(u[1]) * qr), [s, c];
		}
		var E = T();
		if (!a && e.props.groupable) {
			var D = (C.snapRenderInfo || {}).direction;
			Be(D) && (D[0] || D[1]) && (C.snapRenderInfo = {
				direction: d,
				request: t.isRequest
			});
		}
		Q(e, "onBeforeScale", Z(e, t, {
			scale: E,
			setFixedDirection: function(e) {
				return n.setFixedDirection(e), E = T(), E;
			},
			startFixedDirection: n.startFixedDirection,
			setScale: function(e) {
				E = e;
			}
		}, !0));
		var O = [E[0] / w[0], E[1] / w[1]], k = o, A = [0, 0], j = kc(O[0] * O[1]), M = !o && !i && a;
		if (M || l ? k = ji(e, n.targetAllTransform, [0, 0], [0, 0], n) : o || (k = n.fixedPosition), a || (A = rs(e, O, d, !c && s, n)), S) {
			x[0] && x[1] && A[0] && A[1] && (Math.abs(A[0] * f) > Math.abs(A[1] * p) ? A[1] = 0 : A[0] = 0);
			var N = !A[0] && !A[1];
			if (N && (g ? O[0] = G(O[0] * w[0], y) / w[0] : O[1] = G(O[1] * w[1], y) / w[1]), x[0] && !x[1] || A[0] && !A[1] || N && g) {
				O[0] += A[0];
				var P = f * O[0] * w[0] / _;
				O[1] = kc(j * O[0]) * $(P / p / w[1]);
			} else if (!x[0] && x[1] || !A[0] && A[1] || N && !g) {
				O[1] += A[1];
				var F = p * O[1] * w[1] * _;
				O[0] = kc(j * O[1]) * $(F / f / w[0]);
			}
		} else O[0] += A[0], O[1] += A[1], A[0] || (O[0] = G(O[0] * w[0], y) / w[0]), A[1] || (O[1] = G(O[1] * w[1], y) / w[1]);
		O[0] === 0 && (O[0] = kc(u[0]) * qr), O[1] === 0 && (O[1] = kc(u[1]) * qr), E = ls(O, [w[0], w[1]]);
		var I = [f, p], L = [f * E[0], p * E[1]];
		L = lt(L, n.minScaleSize, n.maxScaleSize, S ? _ : !1), E = Ac(2, function(e) {
			return I[e] ? L[e] / I[e] : L[e];
		}), O = Ac(2, function(e) {
			return E[e] / w[e];
		});
		var R = Ac(2, function(e) {
			return u[e] ? O[e] / u[e] : O[e];
		}), z = `scale(${O.join(", ")})`, B = `scale(${E.join(", ")})`, ee = si(n, B, z), V = !h[0] || !h[1], te = Ni(e, V ? B : z, n.fixedDirection, k, n.fixedOffset, n, V), ne = M ? te : K(te, n.prevInverseDist || [0, 0]);
		if (n.prevDist = O, n.prevInverseDist = te, E[0] === u[0] && E[1] === u[1] && ne.every(function(e) {
			return !e;
		}) && !b && !M) return !1;
		var re = Z(e, t, q({
			offsetWidth: f,
			offsetHeight: p,
			direction: d,
			scale: E,
			dist: O,
			delta: R,
			isPinch: !!a
		}, Ai(e, ee, ne, a, t)));
		return Q(e, "onScale", re), re;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (!n.isScale) return !1;
		n.isScale = !1;
		var r = $s(e, t, {});
		return Q(e, "onScaleEnd", r), r;
	},
	dragGroupControlCondition: Nc,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, t);
		if (!r) return !1;
		var i = Xi(e, "resizable", t);
		n.moveableScale = e.scale;
		var a = Qi(e, this, "dragControlStart", t, function(t, r) {
			return $i(e, t, n, r);
		}), o = function(t) {
			r.setFixedDirection(t), a.forEach(function(r, a) {
				r.setFixedDirection(t), $i(e, r.moveable, n, i[a]);
			});
		};
		n.setFixedDirection = o;
		var s = q(q({}, r), {
			targets: e.props.targets,
			events: a,
			setFixedDirection: o
		});
		return n.isScale = Q(e, "onScaleGroupStart", s) !== !1, n.isScale ? s : !1;
	},
	dragGroupControl: function(e, t) {
		var n = t.datas;
		if (n.isScale) {
			ec(e, "onBeforeScale", function(n) {
				Q(e, "onBeforeScaleGroup", Z(e, t, q(q({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = r.dist, a = n.moveableScale;
				e.scale = [i[0] * a[0], i[1] * a[1]];
				var o = e.props.keepRatio, s = n.fixedPosition, c = Qi(e, this, "dragControl", t, function(t, n) {
					var r = J(Gt($t(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * i[0],
						n.datas.originalY * i[1],
						1
					], 3), 2), a = r[0], c = r[1];
					return q(q({}, n), {
						parentDist: null,
						parentScale: i,
						parentKeepRatio: o,
						dragClient: Ht(s, [a, c])
					});
				}), l = q({
					targets: e.props.targets,
					events: c
				}, r);
				return Q(e, "onScaleGroup", l), l;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isScale) {
			this.dragControlEnd(e, t);
			var r = Qi(e, this, "dragControlEnd", t);
			return Q(e, "onScaleGroupEnd", $s(e, t, {
				targets: e.props.targets,
				events: r
			})), n;
		}
	},
	request: function() {
		var e = {}, t = 0, n = 0, r = !1;
		return {
			isControl: !0,
			requestStart: function(t) {
				return r = t.useSnap, {
					datas: e,
					parentDirection: t.direction || [1, 1],
					useSnap: r
				};
			},
			request: function(i) {
				return t += i.deltaWidth, n += i.deltaHeight, {
					datas: e,
					parentDist: [t, n],
					parentKeepRatio: i.keepRatio,
					useSnap: r
				};
			},
			requestEnd: function() {
				return {
					datas: e,
					isDrag: !0,
					useSnap: r
				};
			}
		};
	}
};
function Fc(e, t) {
	return e.map(function(e, n) {
		return Le(e, t[n], 1, 2);
	});
}
function Ic(e, t, n) {
	var r = ft(e, t), i = ft(e, n) - r;
	return i >= 0 ? i : i + 2 * Math.PI;
}
function Lc(e, t) {
	var n = Ic(e[0], e[1], e[2]), r = Ic(t[0], t[1], t[2]), i = Math.PI;
	return !(n >= i && r <= i || n <= i && r >= i);
}
var Rc = {
	name: "warpable",
	ableGroup: "size",
	props: [
		"warpable",
		"renderDirections",
		"edge",
		"displayAroundControls"
	],
	events: [
		"warpStart",
		"warp",
		"warpEnd"
	],
	viewClassName: mc("warpable"),
	render: function(e, t) {
		var n = e.props, r = n.resizable, i = n.scalable, a = n.warpable, o = n.zoom;
		if (r || i || !a) return [];
		var s = e.state, c = s.pos1, l = s.pos2, u = s.pos3, d = s.pos4, f = Fc(c, l), p = Fc(l, c), m = Fc(c, u), h = Fc(u, c), g = Fc(u, d), _ = Fc(d, u), v = Fc(l, d), y = Fc(d, l);
		return Y([
			t.createElement("div", {
				className: X("line"),
				key: "middeLine1",
				style: Fs(f, g, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine2",
				style: Fs(p, _, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine3",
				style: Fs(m, v, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine4",
				style: Fs(h, y, o)
			})
		], J(aa(e, "warpable", t)), !1);
	},
	dragControlCondition: function(e, t) {
		if (t.isRequest) return !1;
		var n = t.inputEvent.target;
		return yt(n, X("direction")) && yt(n, X("warpable"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.inputEvent, i = e.props.target, a = r.target, o = Ks(a, n);
		if (!o || !i) return !1;
		var s = e.state, c = s.transformOrigin, l = s.is3d, u = s.targetTransform, d = s.targetMatrix, f = s.width, p = s.height, m = s.left, h = s.top;
		return n.datas = {}, n.targetTransform = u, n.warpTargetMatrix = l ? d : zt(d, 3, 4), n.targetInverseMatrix = Nt(Pt(n.warpTargetMatrix, 4), 3, 4), n.direction = o, n.left = m, n.top = h, n.poses = [
			[0, 0],
			[f, 0],
			[0, p],
			[f, p]
		].map(function(e) {
			return K(e, c);
		}), n.nextPoses = n.poses.map(function(e) {
			var t = J(e, 2), r = t[0], i = t[1];
			return Gt(n.warpTargetMatrix, [
				r,
				i,
				0,
				1
			], 4);
		}), n.startValue = en(4), n.prevMatrix = en(4), n.absolutePoses = Js(s), n.posIndexes = mi(o), ii(e, t), Ci(e, t, "matrix3d"), s.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}, Q(e, "onWarpStart", Z(e, t, q({ set: function(e) {
			n.startValue = e;
		} }, Si(e, t)))) !== !1 && (n.isWarp = !0), n.isWarp;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isRequest, i = t.distX, a = t.distY, o = n.targetInverseMatrix, s = n.prevMatrix, c = n.isWarp, l = n.startValue, u = n.poses, d = n.posIndexes, f = n.absolutePoses;
		if (!c) return !1;
		if (oi(e, t, "matrix3d"), xa(e, "warpable")) {
			var p = d.map(function(e) {
				return f[e];
			});
			p.length > 1 && p.push([(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]);
			var m = co(e, r, {
				horizontal: p.map(function(e) {
					return e[1] + a;
				}),
				vertical: p.map(function(e) {
					return e[0] + i;
				})
			}), h = m.horizontal, g = m.vertical;
			a -= h.offset, i -= g.offset;
		}
		var _ = di({
			datas: n,
			distX: i,
			distY: a
		}, !0), v = n.nextPoses.slice();
		if (d.forEach(function(e) {
			v[e] = Ht(v[e], _);
		}), !Wr.every(function(e) {
			return Lc(e.map(function(e) {
				return u[e];
			}), e.map(function(e) {
				return v[e];
			}));
		})) return !1;
		var y = rn(u[0], u[2], u[1], u[3], v[0], v[2], v[1], v[3]);
		if (!y.length) return !1;
		var b = li(n, Vt(o, y, 4), !0), x = Vt(Pt(s, 4), b, 4);
		n.prevMatrix = b;
		var S = Vt(l, b, 4), C = si(n, `matrix3d(${S.join(", ")})`, `matrix3d(${b.join(", ")})`);
		return Ti(t, C), Q(e, "onWarp", Z(e, t, q({
			delta: x,
			matrix: S,
			dist: b,
			multiply: Vt,
			transform: C
		}, Zs({ transform: C }, t)))), !0;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.isDrag;
		return n.isWarp ? (n.isWarp = !1, Q(e, "onWarpEnd", $s(e, t, {})), r) : !1;
	}
}, zc = /*#__PURE__*/ X("area-pieces"), Bc = /*#__PURE__*/ X("area-piece"), Vc = /*#__PURE__*/ X("avoid"), Hc = X("view-dragging");
function Uc(e) {
	var t = e.areaElement;
	if (t) {
		var n = e.state, r = n.width, i = n.height;
		xt(t, Vc), t.style.cssText += `left: 0px; top: 0px; width: ${r}px; height: ${i}px`;
	}
}
function Wc(e) {
	return e.createElement("div", {
		key: "area_pieces",
		className: zc
	}, e.createElement("div", { className: Bc }), e.createElement("div", { className: Bc }), e.createElement("div", { className: Bc }), e.createElement("div", { className: Bc }));
}
var Gc = {
	name: "dragArea",
	props: ["dragArea", "passDragArea"],
	events: ["click", "clickGroup"],
	render: function(e, t) {
		var n = e.props, r = n.target, i = n.dragArea, a = n.groupable, o = n.passDragArea, s = e.getState(), c = s.width, l = s.height, u = s.renderPoses, d = o ? X("area", "pass") : X("area");
		if (a) return [t.createElement("div", {
			key: "area",
			ref: we(e, "areaElement"),
			className: d
		}), Wc(t)];
		if (!r || !i) return [];
		var f = rn([0, 0], [c, 0], [0, l], [c, l], u[0], u[1], u[2], u[3]), p = f.length ? Cs(f, !0) : "none";
		return [t.createElement("div", {
			key: "area",
			ref: we(e, "areaElement"),
			className: d,
			style: {
				top: "0px",
				left: "0px",
				width: `${c}px`,
				height: `${l}px`,
				transformOrigin: "0 0",
				transform: p
			}
		}), Wc(t)];
	},
	dragStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY;
		if (!t.inputEvent) return !1;
		n.isDragArea = !1;
		var a = e.areaElement, o = e.state, s = o.moveableClientRect, c = o.renderPoses, l = o.rootMatrix, u = o.is3d, d = s.left, f = s.top, p = ks(c), m = p.left, h = p.top, g = p.width, _ = p.height, v = u ? 4 : 3, y = J(lc(l, [r - d, i - f], v), 2), b = y[0], x = y[1];
		b -= m, x -= h;
		var S = [
			{
				left: m,
				top: h,
				width: g,
				height: x - 10
			},
			{
				left: m,
				top: h,
				width: b - 10,
				height: _
			},
			{
				left: m,
				top: h + x + 10,
				width: g,
				height: _ - x - 10
			},
			{
				left: m + b + 10,
				top: h,
				width: g - b - 10,
				height: _
			}
		], C = [].slice.call(a.nextElementSibling.children);
		S.forEach(function(e, t) {
			C[t].style.cssText = `left: ${e.left}px;top: ${e.top}px; width: ${e.width}px; height: ${e.height}px;`;
		}), bt(a, Vc), o.disableNativeEvent = !0;
	},
	drag: function(e, t) {
		var n = t.datas, r = t.inputEvent;
		if (this.enableNativeEvent(e), !r) return !1;
		n.isDragArea || (n.isDragArea = !0, Uc(e));
	},
	dragEnd: function(e, t) {
		this.enableNativeEvent(e);
		var n = t.inputEvent, r = t.datas;
		if (!n) return !1;
		r.isDragArea || Uc(e);
	},
	dragGroupStart: function(e, t) {
		return this.dragStart(e, t);
	},
	dragGroup: function(e, t) {
		return this.drag(e, t);
	},
	dragGroupEnd: function(e, t) {
		return this.dragEnd(e, t);
	},
	unset: function(e) {
		Uc(e), e.state.disableNativeEvent = !1;
	},
	enableNativeEvent: function(e) {
		var t = e.state;
		t.disableNativeEvent && rt(function() {
			t.disableNativeEvent = !1;
		});
	}
}, Kc = Er("origin", {
	props: ["origin", "svgOrigin"],
	render: function(e, t) {
		var n = e.props, r = n.zoom, i = n.svgOrigin, a = n.groupable, o = e.getState(), s = o.beforeOrigin, c = o.rotation, l = o.svg, u = o.allMatrix, d = o.is3d, f = o.left, p = o.top, m = o.offsetWidth, h = o.offsetHeight, g;
		if (!a && l && i) {
			var _ = J(Tc(i, m, h), 2), v = _[0], y = _[1];
			g = Is(c, r, K(Ds(u, [v, y], d ? 4 : 3), [f, p]));
		} else g = Is(c, r, s);
		return [t.createElement("div", {
			className: X("control", "origin"),
			style: g,
			key: "beforeOrigin"
		})];
	}
});
function qc(e) {
	var t = e.scrollContainer;
	return [t.scrollLeft, t.scrollTop];
}
var Jc = {
	name: "scrollable",
	canPinch: !0,
	props: [
		"scrollable",
		"scrollContainer",
		"scrollThreshold",
		"scrollThrottleTime",
		"getScrollPosition",
		"scrollOptions"
	],
	events: ["scroll", "scrollGroup"],
	dragRelation: "strong",
	dragStart: function(e, t) {
		var n = e.props, r = n.scrollContainer, i = r === void 0 ? e.getContainer() : r, a = n.scrollOptions, o = new Nn(), s = vc(i, !0);
		t.datas.dragScroll = o, e.state.dragScroll = o;
		var c = t.isControl ? "controlGesto" : "targetGesto", l = t.targets;
		o.on("scroll", function(n) {
			var r = n.container, i = n.direction, a = Z(e, t, {
				scrollContainer: r,
				direction: i
			}), o = l ? "onScrollGroup" : "onScroll";
			l && (a.targets = l), Q(e, o, a);
		}).on("move", function(t) {
			var n = t.offsetX, r = t.offsetY, i = t.inputEvent;
			e[c].scrollBy(n, r, i.inputEvent, !1);
		}).on("scrollDrag", function(t) {
			var n = t.next;
			n(e[c].getCurrentEvent());
		}), o.dragStart(t, q({ container: s }, a));
	},
	checkScroll: function(e, t) {
		var n = t.datas.dragScroll;
		if (n) {
			var r = e.props, i = r.scrollContainer, a = i === void 0 ? e.getContainer() : i, o = r.scrollThreshold, s = o === void 0 ? 0 : o, c = r.scrollThrottleTime, l = c === void 0 ? 0 : c, u = r.getScrollPosition, d = u === void 0 ? qc : u, f = r.scrollOptions;
			return n.drag(t, q({
				container: a,
				threshold: s,
				throttleTime: l,
				getScrollPosition: function(e) {
					return d({
						scrollContainer: e.container,
						direction: e.direction
					});
				}
			}, f)), !0;
		}
	},
	drag: function(e, t) {
		return this.checkScroll(e, t);
	},
	dragEnd: function(e, t) {
		t.datas.dragScroll.dragEnd(), t.datas.dragScroll = null;
	},
	dragControlStart: function(e, t) {
		return this.dragStart(e, q(q({}, t), { isControl: !0 }));
	},
	dragControl: function(e, t) {
		return this.drag(e, t);
	},
	dragControlEnd: function(e, t) {
		return this.dragEnd(e, t);
	},
	dragGroupStart: function(e, t) {
		return this.dragStart(e, q(q({}, t), { targets: e.props.targets }));
	},
	dragGroup: function(e, t) {
		return this.drag(e, q(q({}, t), { targets: e.props.targets }));
	},
	dragGroupEnd: function(e, t) {
		return this.dragEnd(e, q(q({}, t), { targets: e.props.targets }));
	},
	dragGroupControlStart: function(e, t) {
		return this.dragStart(e, q(q({}, t), {
			targets: e.props.targets,
			isControl: !0
		}));
	},
	dragGroupControl: function(e, t) {
		return this.drag(e, q(q({}, t), { targets: e.props.targets }));
	},
	dragGroupControEnd: function(e, t) {
		return this.dragEnd(e, q(q({}, t), { targets: e.props.targets }));
	},
	unset: function(e) {
		var t, n = e.state;
		(t = n.dragScroll) == null || t.dragEnd(), n.dragScroll = null;
	}
}, Yc = {
	name: "",
	props: /* @__PURE__ */ "target.dragTargetSelf.dragTarget.dragContainer.container.warpSelf.rootContainer.useResizeObserver.useMutationObserver.zoom.dragFocusedInput.transformOrigin.ables.className.pinchThreshold.pinchOutside.triggerAblesSimultaneously.checkInput.cspNonce.translateZ.hideDefaultLines.props.flushSync.stopPropagation.preventClickEventOnDrag.preventClickDefault.viewContainer.persistData.useAccuratePosition.firstRenderState.linePadding.controlPadding.preventDefault.preventRightClick.preventWheelClick.requestStyles".split("."),
	events: ["changeTargets"]
}, Xc = Er("padding", {
	props: ["padding"],
	render: function(e, t) {
		var n = e.props;
		if (n.dragArea) return [];
		var r = jc(n.padding || {}), i = r.left, a = r.top, o = r.right, s = r.bottom, c = e.getState(), l = c.renderPoses, u = [
			c.pos1,
			c.pos2,
			c.pos3,
			c.pos4
		], d = [];
		return i > 0 && d.push([0, 2]), a > 0 && d.push([0, 1]), o > 0 && d.push([1, 3]), s > 0 && d.push([2, 3]), d.map(function(e, n) {
			var r = J(e, 2), i = r[0], a = r[1], o = u[i], s = u[a], c = l[i], d = l[a], f = rn([0, 0], [100, 0], [0, 100], [100, 100], o, s, c, d);
			if (f.length) return t.createElement("div", {
				key: `padding${n}`,
				className: X("padding"),
				style: { transform: Cs(f, !0) }
			});
		});
	}
}), Zc = [
	"nw",
	"ne",
	"se",
	"sw"
];
function Qc(e, t) {
	var n = e[0] + e[1], r = n > t ? t / n : 1;
	return e[0] *= r, e[1] = t - e[1] * r, e;
}
var $c = [
	1,
	2,
	5,
	6
], el = [
	0,
	3,
	4,
	7
], tl = [
	1,
	-1,
	-1,
	1
], nl = [
	1,
	1,
	-1,
	-1
];
function rl(e, t, n, r, i, a, o, s) {
	i === void 0 && (i = 0), a === void 0 && (a = 0), o === void 0 && (o = n), s === void 0 && (s = r);
	var c = [], l = !1, u = e.filter(function(e) {
		return !e.virtual;
	});
	return {
		radiusPoses: u,
		styles: c,
		raws: u.map(function(e) {
			var u = e.horizontal, d = e.vertical, f = e.pos;
			if (d && !l && (l = !0, c.push("/")), l) {
				var p = Math.max(0, d === 1 ? f[1] - a : s - f[1]);
				return c.push(fc(p, r, t)), p;
			}
			var p = Math.max(0, u === 1 ? f[0] - i : o - f[0]);
			return c.push(fc(p, n, t)), p;
		})
	};
}
function il(e) {
	for (var t = [0, 0], n = [0, 0], r = e.length, i = 0; i < r; ++i) {
		var a = e[i];
		a.sub && (a.horizontal && (t[1] === 0 && (t[0] = i), t[1] = i - t[0] + 1, n[0] = i + 1), a.vertical && (n[1] === 0 && (n[0] = i), n[1] = i - n[0] + 1));
	}
	return {
		horizontalRange: t,
		verticalRange: n
	};
}
function al(e, t, n, r, i, a, o) {
	var s, c, l, u;
	a === void 0 && (a = [0, 0]), o === void 0 && (o = !1);
	var d = e.indexOf("/"), f = (d > -1 ? e.slice(0, d) : e).length, p = e.slice(0, f), m = e.slice(f + 1), h = p.length, g = m.length, _ = g > 0, v = J(p, 4), y = v[0], b = y === void 0 ? "0px" : y, x = v[1], S = x === void 0 ? b : x, C = v[2], w = C === void 0 ? b : C, T = v[3], E = T === void 0 ? S : T, D = J(m, 4), O = D[0], k = O === void 0 ? b : O, A = D[1], j = A === void 0 ? _ ? k : S : A, M = D[2], N = M === void 0 ? _ ? k : w : M, P = D[3], F = P === void 0 ? _ ? j : E : P, I = [
		b,
		S,
		w,
		E
	].map(function(e) {
		return ot(e, t);
	}), L = [
		k,
		j,
		N,
		F
	].map(function(e) {
		return ot(e, n);
	}), R = I.slice(), z = L.slice();
	s = J(Qc([R[0], R[1]], t), 2), R[0] = s[0], R[1] = s[1], c = J(Qc([R[3], R[2]], t), 2), R[3] = c[0], R[2] = c[1], l = J(Qc([z[0], z[3]], n), 2), z[0] = l[0], z[3] = l[1], u = J(Qc([z[1], z[2]], n), 2), z[1] = u[0], z[2] = u[1];
	var B = o ? R : R.slice(0, Math.max(a[0], h)), ee = o ? z : z.slice(0, Math.max(a[1], g));
	return Y(Y([], J(B.map(function(e, t) {
		var a = Zc[t];
		return {
			virtual: t >= h,
			horizontal: tl[t],
			vertical: 0,
			pos: [r + e, i + (nl[t] === -1 ? n : 0)],
			sub: !0,
			raw: I[t],
			direction: a
		};
	})), !1), J(ee.map(function(e, n) {
		var a = Zc[n];
		return {
			virtual: n >= g,
			horizontal: 0,
			vertical: nl[n],
			pos: [r + (tl[n] === -1 ? t : 0), i + e],
			sub: !0,
			raw: L[n],
			direction: a
		};
	})), !1);
}
function ol(e, t, n, r, i) {
	i === void 0 && (i = t.length);
	var a = il(e.slice(r)), o = a.horizontalRange, s = a.verticalRange, c = n - r, l = 0;
	if (c === 0) l = i;
	else if (c > 0 && c < o[1]) l = o[1] - c;
	else if (c >= s[0]) l = s[0] + s[1] - c;
	else return;
	e.splice(n, l), t.splice(n, l);
}
function sl(e, t, n, r, i, a, o, s, c, l, u) {
	l === void 0 && (l = 0), u === void 0 && (u = 0);
	var d = il(e.slice(n)), f = d.horizontalRange, p = d.verticalRange;
	if (r > -1) for (var m = tl[r] === 1 ? a - l : s - a, h = f[1]; h <= r; ++h) {
		var g = nl[h] === 1 ? u : c, _ = 0;
		if (r === h ? _ = a : h === 0 ? _ = l + m : tl[h] === -1 && (_ = s - (t[n][0] - l)), e.splice(n + h, 0, {
			horizontal: tl[h],
			vertical: 0,
			pos: [_, g]
		}), t.splice(n + h, 0, [_, g]), h === 0) break;
	}
	else if (i > -1) {
		var v = nl[i] === 1 ? o - u : c - o;
		if (f[1] === 0 && p[1] === 0) {
			var y = [l + v, u];
			e.push({
				horizontal: tl[0],
				vertical: 0,
				pos: y
			}), t.push(y);
		}
		for (var b = p[0], h = p[1]; h <= i; ++h) {
			var _ = tl[h] === 1 ? l : s, g = 0;
			if (i === h ? g = o : h === 0 ? g = u + v : nl[h] === 1 ? g = t[n + b][1] : nl[h] === -1 && (g = c - (t[n + b][1] - u)), e.push({
				horizontal: 0,
				vertical: nl[h],
				pos: [_, g]
			}), t.push([_, g]), h === 0) break;
		}
	}
}
function cl(e, t) {
	return t === void 0 && (t = e.map(function(e) {
		return e.raw;
	})), {
		horizontals: e.map(function(e, n) {
			return e.horizontal ? t[n] : null;
		}).filter(function(e) {
			return e != null;
		}),
		verticals: e.map(function(e, n) {
			return e.vertical ? t[n] : null;
		}).filter(function(e) {
			return e != null;
		})
	};
}
var ll = [[
	0,
	-1,
	"n"
], [
	1,
	0,
	"e"
]], ul = [
	[
		-1,
		-1,
		"nw"
	],
	[
		0,
		-1,
		"n"
	],
	[
		1,
		-1,
		"ne"
	],
	[
		1,
		0,
		"e"
	],
	[
		1,
		1,
		"se"
	],
	[
		0,
		1,
		"s"
	],
	[
		-1,
		1,
		"sw"
	],
	[
		-1,
		0,
		"w"
	]
];
function dl(e, t, n) {
	var r = e.props.clipRelative, i = e.state, a = i.width, o = i.height, s = t, c = s.type, l = s.poses, u = c === "rect", d = c === "circle";
	if (c === "polygon") return n.map(function(e) {
		return `${fc(e[0], a, r)} ${fc(e[1], o, r)}`;
	});
	if (u || c === "inset") {
		var f = n[1][1], p = n[3][0], m = n[7][0], h = n[5][1];
		if (u) return [
			f,
			p,
			h,
			m
		].map(function(e) {
			return `${e}px`;
		});
		var g = [
			f,
			a - p,
			o - h,
			m
		].map(function(e, t) {
			return fc(e, t % 2 ? a : o, r);
		});
		if (n.length > 8) {
			var _ = J(K(n[4], n[0]), 2), v = _[0], y = _[1];
			g.push.apply(g, Y(["round"], J(rl(l.slice(8).map(function(e, t) {
				return q(q({}, e), { pos: n[t] });
			}), r, v, y, m, f, p, h).styles), !1));
		}
		return g;
	}
	if (d || c === "ellipse") {
		var b = n[0], x = fc($(n[1][1] - b[1]), d ? Math.sqrt((a * a + o * o) / 2) : o, r), g = d ? [x] : [fc($(n[2][0] - b[0]), a, r), x];
		return g.push("at", fc(b[0], a, r), fc(b[1], o, r)), g;
	}
}
function fl(e, t, n, r) {
	var i = [
		r,
		(r + t) / 2,
		t
	], a = [
		e,
		(e + n) / 2,
		n
	];
	return ul.map(function(e) {
		var t = J(e, 3), n = t[0], r = t[1], o = t[2], s = i[n + 1], c = a[r + 1];
		return {
			vertical: $(r),
			horizontal: $(n),
			direction: o,
			pos: [s, c]
		};
	});
}
function pl(e) {
	var t = [Infinity, -Infinity], n = [Infinity, -Infinity];
	return e.forEach(function(e) {
		var r = e.pos;
		t[0] = Math.min(t[0], r[0]), t[1] = Math.max(t[1], r[0]), n[0] = Math.min(n[0], r[1]), n[1] = Math.max(n[1], r[1]);
	}), [$(t[1] - t[0]), $(n[1] - n[0])];
}
function ml(e, t, n, r, i) {
	var a, o, s, c, l, u, d, f, p;
	if (e) {
		var m = i;
		if (!m) {
			var h = Yi(e), g = h("clipPath");
			m = g === "none" ? h("clip") : g;
		}
		if (!((!m || m === "none" || m === "auto") && (m = r, !m))) {
			var _ = Ze(m), v = _.prefix, y = v === void 0 ? m : v, b = _.value, x = b === void 0 ? "" : b, S = y === "circle", C = " ";
			if (y === "polygon") {
				var w = Xe(x || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
				C = ",";
				var T = w.map(function(e) {
					var r = J(e.split(" "), 2), i = r[0], a = r[1];
					return {
						vertical: 1,
						horizontal: 1,
						pos: [ot(i, t), ot(a, n)]
					};
				}), E = Bn(T.map(function(e) {
					return e.pos;
				}));
				return {
					type: y,
					clipText: m,
					poses: T,
					splitter: C,
					left: E.minX,
					right: E.maxX,
					top: E.minY,
					bottom: E.maxY
				};
			}
			if (S || y === "ellipse") {
				var D = "", O = "", k = 0, A = 0, w = Ye(x);
				if (S) {
					var j = "";
					a = J(w, 4), o = a[0], j = o === void 0 ? "50%" : o, s = a[2], D = s === void 0 ? "50%" : s, c = a[3], O = c === void 0 ? "50%" : c, k = ot(j, Math.sqrt((t * t + n * n) / 2)), A = k;
				} else {
					var M = "", N = "";
					l = J(w, 5), u = l[0], M = u === void 0 ? "50%" : u, d = l[1], N = d === void 0 ? "50%" : d, f = l[3], D = f === void 0 ? "50%" : f, p = l[4], O = p === void 0 ? "50%" : p, k = ot(M, t), A = ot(N, n);
				}
				var P = [ot(D, t), ot(O, n)], T = Y([{
					vertical: 1,
					horizontal: 1,
					pos: P,
					direction: "nesw"
				}], J(ll.slice(0, S ? 1 : 2).map(function(e) {
					return {
						vertical: $(e[1]),
						horizontal: e[0],
						direction: e[2],
						sub: !0,
						pos: [P[0] + e[0] * k, P[1] + e[1] * A]
					};
				})), !1);
				return {
					type: y,
					clipText: m,
					radiusX: k,
					radiusY: A,
					left: P[0] - k,
					top: P[1] - A,
					right: P[0] + k,
					bottom: P[1] + A,
					poses: T,
					splitter: C
				};
			}
			if (y === "inset") {
				var w = Ye(x || "0 0 0 0"), F = w.indexOf("round"), I = (F > -1 ? w.slice(0, F) : w).length, L = w.slice(I + 1), R = J(w.slice(0, I), 4), z = R[0], B = R[1], ee = B === void 0 ? z : B, V = R[2], te = V === void 0 ? z : V, ne = R[3], re = ne === void 0 ? ee : ne, H = J([z, te].map(function(e) {
					return ot(e, n);
				}), 2), U = H[0], ie = H[1], W = J([re, ee].map(function(e) {
					return ot(e, t);
				}), 2), ae = W[0], oe = W[1], se = t - oe, ce = n - ie, le = al(L, se - ae, ce - U, ae, U), T = Y(Y([], J(fl(U, se, ce, ae)), !1), J(le), !1);
				return {
					type: "inset",
					clipText: m,
					poses: T,
					top: U,
					left: ae,
					right: se,
					bottom: ce,
					radius: L,
					splitter: C
				};
			}
			if (y === "rect") {
				var w = Xe(x || `0px, ${t}px, ${n}px, 0px`);
				C = ",";
				var ue = J(w.map(function(e) {
					return Qe(e).value;
				}), 4), de = ue[0], oe = ue[1], ie = ue[2], ae = ue[3], T = fl(de, oe, ie, ae);
				return {
					type: "rect",
					clipText: m,
					poses: T,
					top: de,
					right: oe,
					bottom: ie,
					left: ae,
					values: w,
					splitter: C
				};
			}
		}
	}
}
function hl(e, t, n, r, i) {
	var a = e[t], o = a.direction, s = a.sub, c = e.map(function() {
		return [0, 0];
	}), l = o ? o.split("") : [];
	if (r && t < 8) {
		var u = l.filter(function(e) {
			return e === "w" || e === "e";
		}), d = l.filter(function(e) {
			return e === "n" || e === "s";
		}), f = u[0], p = d[0];
		c[t] = n;
		var m = J(pl(e), 2), h = m[0], g = m[1], _ = h && g ? h / g : 0;
		if (_ && i) {
			var v = e[(t + 4) % 8].pos, y = [0, 0];
			o.indexOf("w") > -1 ? y[0] = -1 : o.indexOf("e") > -1 && (y[0] = 1), o.indexOf("n") > -1 ? y[1] = -1 : o.indexOf("s") > -1 && (y[1] = 1);
			var b = Sc([h, g], n, _, y, !0), x = h + b[0], S = g + b[1], C = v[1], w = v[1], T = v[0], E = v[0];
			y[0] === -1 ? T = E - x : y[0] === 1 ? E = T + x : (T -= x / 2, E += x / 2), y[1] === -1 ? C = w - S : (y[1] === 1 || (C = w - S / 2), w = C + S);
			var D = fl(C, E, w, T);
			e.forEach(function(e, t) {
				c[t][0] = D[t].pos[0] - e.pos[0], c[t][1] = D[t].pos[1] - e.pos[1];
			});
		} else e.forEach(function(e, t) {
			var r = e.direction;
			r && (r.indexOf(f) > -1 && (c[t][0] = n[0]), r.indexOf(p) > -1 && (c[t][1] = n[1]));
		}), f && (c[1][0] = n[0] / 2, c[5][0] = n[0] / 2), p && (c[3][1] = n[1] / 2, c[7][1] = n[1] / 2);
	} else o && !s ? l.forEach(function(t) {
		var r = t === "n" || t === "s";
		e.forEach(function(e, i) {
			var a = e.direction, o = e.horizontal, s = e.vertical;
			!a || a.indexOf(t) === -1 || (c[i] = [r || !o ? 0 : n[0], !r || !s ? 0 : n[1]]);
		});
	}) : c[t] = n;
	return c;
}
function gl(e, t) {
	var n = J(ri(e, t), 2), r = n[0], i = n[1], a = t.datas, o = a.clipPath, s = a.clipIndex, c = o, l = c.type, u = c.poses, d = c.splitter, f = u.map(function(e) {
		return e.pos;
	});
	if (l === "polygon") f.splice(s, 0, [r, i]);
	else if (l === "inset") {
		var p = $c.indexOf(s), m = el.indexOf(s), h = u.length;
		if (sl(u, f, 8, p, m, r, i, f[4][0], f[4][1], f[0][0], f[0][1]), h === u.length) return;
	} else return;
	var g = dl(e, o, f), _ = `${l}(${g.join(d)})`;
	Q(e, "onClip", Z(e, t, q({
		clipEventType: "added",
		clipType: l,
		poses: f,
		clipStyles: g,
		clipStyle: _,
		distX: 0,
		distY: 0
	}, Zs({ clipPath: _ }, t))));
}
function _l(e, t) {
	var n = t.datas, r = n.clipPath, i = n.clipIndex, a = r, o = a.type, s = a.poses, c = a.splitter, l = s.map(function(e) {
		return e.pos;
	}), u = l.length;
	if (o === "polygon") s.splice(i, 1), l.splice(i, 1);
	else if (o === "inset") {
		if (i < 8 || (ol(s, l, i, 8, u), u === s.length)) return;
	} else return;
	var d = dl(e, r, l), f = `${o}(${d.join(c)})`;
	Q(e, "onClip", Z(e, t, q({
		clipEventType: "removed",
		clipType: o,
		poses: l,
		clipStyles: d,
		clipStyle: f,
		distX: 0,
		distY: 0
	}, Zs({ clipPath: f }, t))));
}
var vl = {
	name: "clippable",
	props: [
		"clippable",
		"defaultClipPath",
		"customClipPath",
		"keepRatio",
		"clipRelative",
		"clipArea",
		"dragWithClip",
		"clipTargetBounds",
		"clipVerticalGuidelines",
		"clipHorizontalGuidelines",
		"clipSnapThreshold"
	],
	events: [
		"clipStart",
		"clip",
		"clipEnd"
	],
	css: [
		".control.clip-control {\nbackground: #6d6;\ncursor: pointer;\n}\n.control.clip-control.clip-radius {\nbackground: #d66;\n}\n.line.clip-line {\nbackground: #6e6;\ncursor: move;\nz-index: 1;\n}\n.clip-area {\nposition: absolute;\ntop: 0;\nleft: 0;\n}\n.clip-ellipse {\nposition: absolute;\ncursor: move;\nborder: 1px solid #6d6;\nborder: var(--zoompx) solid #6d6;\nborder-radius: 50%;\ntransform-origin: 0px 0px;\n}",
		":host {\n--bounds-color: #d66;\n}",
		".guideline {\npointer-events: none;\nz-index: 2;\n}",
		".line.guideline.bounds {\nbackground: #d66;\nbackground: var(--bounds-color);\n}"
	],
	render: function(e, t) {
		var n = e.props, r = n.customClipPath, i = n.defaultClipPath, a = n.clipArea, o = n.zoom, s = n.groupable, c = e.getState(), l = c.target, u = c.width, d = c.height, f = c.allMatrix, p = c.is3d, m = c.left, h = c.top, g = c.pos1, _ = c.pos2, v = c.pos3, y = c.pos4, b = c.clipPathState, x = c.snapBoundInfos, S = c.rotation;
		if (!l || s) return [];
		var C = ml(l, u, d, i || "inset", b || r);
		if (!C) return [];
		var w = p ? 4 : 3, T = C.type, E = C.poses.map(function(e) {
			var t = Ds(f, e.pos, w);
			return [t[0] - m, t[1] - h];
		}), D = [], O = [], k = T === "rect", A = T === "inset", j = T === "polygon";
		if (k || A || j) {
			var M = A ? E.slice(0, 8) : E;
			O = M.map(function(e, n) {
				var r = n === 0 ? M[M.length - 1] : M[n - 1], i = ft(r, e), a = Ps(r, e);
				return t.createElement("div", {
					key: `clipLine${n}`,
					className: X("line", "clip-line", "snap-control"),
					"data-clip-index": n,
					style: {
						width: `${a}px`,
						transform: `translate(${r[0]}px, ${r[1]}px) rotate(${i}rad) scaleY(${o})`
					}
				});
			});
		}
		if (D = E.map(function(e, n) {
			return t.createElement("div", {
				key: `clipControl${n}`,
				className: X("control", "clip-control", "snap-control"),
				"data-clip-index": n,
				style: { transform: `translate(${e[0]}px, ${e[1]}px) rotate(${S}rad) scale(${o})` }
			});
		}), A && D.push.apply(D, Y([], J(E.slice(8).map(function(e, n) {
			return t.createElement("div", {
				key: `clipRadiusControl${n}`,
				className: X("control", "clip-control", "clip-radius", "snap-control"),
				"data-clip-index": 8 + n,
				style: { transform: `translate(${e[0]}px, ${e[1]}px) rotate(${S}rad) scale(${o})` }
			});
		})), !1)), T === "circle" || T === "ellipse") {
			var N = C.left, P = C.top, F = C.radiusX, I = C.radiusY, L = J(K(Ds(f, [N, P], w), Ds(f, [0, 0], w)), 2), R = L[0], z = L[1], B = "none";
			if (!a) {
				for (var ee = Math.max(10, F / 5, I / 5), V = [], te = 0; te <= ee; ++te) {
					var ne = Math.PI * 2 / ee * te;
					V.push([F + (F - o) * Math.cos(ne), I + (I - o) * Math.sin(ne)]);
				}
				V.push([F, -2]), V.push([-2, -2]), V.push([-2, I * 2 + 2]), V.push([F * 2 + 2, I * 2 + 2]), V.push([F * 2 + 2, -2]), V.push([F, -2]), B = `polygon(${V.map(function(e) {
					return `${e[0]}px ${e[1]}px`;
				}).join(", ")})`;
			}
			D.push(t.createElement("div", {
				key: "clipEllipse",
				className: X("clip-ellipse", "snap-control"),
				style: {
					width: `${F * 2}px`,
					height: `${I * 2}px`,
					clipPath: B,
					transform: `translate(${-m + R}px, ${-h + z}px) ${Cs(f)}`
				}
			}));
		}
		if (a) {
			var re = ks(Y([
				g,
				_,
				v,
				y
			], J(E), !1)), H = re.width, U = re.height, ie = re.left, W = re.top;
			if (j || k || A) {
				var V = A ? E.slice(0, 8) : E;
				D.push(t.createElement("div", {
					key: "clipArea",
					className: X("clip-area", "snap-control"),
					style: {
						width: `${H}px`,
						height: `${U}px`,
						transform: `translate(${ie}px, ${W}px)`,
						clipPath: `polygon(${V.map(function(e) {
							return `${e[0] - ie}px ${e[1] - W}px`;
						}).join(", ")})`
					}
				}));
			}
		}
		return x && ["vertical", "horizontal"].forEach(function(e) {
			var n = x[e], r = e === "horizontal";
			n.isSnap && O.push.apply(O, Y([], J(n.snap.posInfos.map(function(n, i) {
				var a = n.pos;
				return na(t, "", K(Ds(f, r ? [0, a] : [a, 0], w), [m, h]), K(Ds(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}snap${i}`, "guideline");
			})), !1)), n.isBound && O.push.apply(O, Y([], J(n.bounds.map(function(n, i) {
				var a = n.pos;
				return na(t, "", K(Ds(f, r ? [0, a] : [a, 0], w), [m, h]), K(Ds(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}bounds${i}`, "guideline", "bounds", "bold");
			})), !1));
		}), Y(Y([], J(D), !1), J(O), !1);
	},
	dragControlCondition: function(e, t) {
		return t.inputEvent && (t.inputEvent.target.getAttribute("class") || "").indexOf("clip") > -1;
	},
	dragStart: function(e, t) {
		var n = e.props.dragWithClip;
		return n === void 0 || n ? !1 : this.dragControlStart(e, t);
	},
	drag: function(e, t) {
		return this.dragControl(e, q(q({}, t), { isDragTarget: !0 }));
	},
	dragEnd: function(e, t) {
		return this.dragControlEnd(e, t);
	},
	dragControlStart: function(e, t) {
		var n = e.state, r = e.props, i = r.defaultClipPath, a = r.customClipPath, o = n.target, s = n.width, c = n.height, l = t.inputEvent ? t.inputEvent.target : null, u = l && l.getAttribute("class") || "", d = t.datas, f = ml(o, s, c, i || "inset", a);
		if (!f) return !1;
		var p = f.clipText, m = f.type, h = f.poses;
		return Q(e, "onClipStart", Z(e, t, {
			clipType: m,
			clipStyle: p,
			poses: h.map(function(e) {
				return e.pos;
			})
		})) === !1 ? (d.isClipStart = !1, !1) : (d.isControl = u && u.indexOf("clip-control") > -1, d.isLine = u.indexOf("clip-line") > -1, d.isArea = u.indexOf("clip-area") > -1 || u.indexOf("clip-ellipse") > -1, d.clipIndex = l ? parseInt(l.getAttribute("data-clip-index"), 10) : -1, d.clipPath = f, d.isClipStart = !0, n.clipPathState = p, ii(e, t), !0);
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.originalDatas, s = t.isDragTarget;
		if (!a.isClipStart) return !1;
		var c = a, l = c.isControl, u = c.isLine, d = c.isArea, f = c.clipIndex, p = c.clipPath;
		if (!p) return !1;
		var m = Ls(e.props, "clippable"), h = m.keepRatio, g = 0, _ = 0, v = o.draggable, y = di(t);
		s && v ? (n = J(v.prevBeforeDist, 2), g = n[0], _ = n[1]) : (r = J(y, 2), g = r[0], _ = r[1]);
		var b = [g, _], x = e.state, S = x.width, C = x.height, w = !d && !l && !u, T = p.type, E = p.poses, D = p.splitter, O = E.map(function(e) {
			return e.pos;
		});
		w && (g = -g, _ = -_);
		var k = !l || E[f].direction === "nesw", A = T === "inset" || T === "rect", j = E.map(function() {
			return [0, 0];
		});
		if (l && !k) {
			var M = E[f], N = M.horizontal, P = M.vertical;
			j = hl(E, f, [g * $(N), _ * $(P)], A, h);
		} else k && (j = O.map(function() {
			return [g, _];
		}));
		var F = O.map(function(e, t) {
			return Ht(e, j[t]);
		}), I = Y([], J(F), !1);
		x.snapBoundInfos = null;
		var L = p.type === "circle", R = p.type === "ellipse";
		if (L || R) {
			var z = ks(F), B = $(z.bottom - z.top), ee = $(R ? z.right - z.left : B), V = F[0][1] + B, te = F[0][0] - ee, ne = F[0][0] + ee;
			L && (I.push([ne, z.bottom]), j.push([1, 0])), I.push([z.left, V]), j.push([0, 1]), I.push([te, z.bottom]), j.push([1, 0]);
		}
		var re = Wo((m.clipHorizontalGuidelines || []).map(function(e) {
			return ot(`${e}`, C);
		}), (m.clipVerticalGuidelines || []).map(function(e) {
			return ot(`${e}`, S);
		}), S, C), H = [], U = [];
		if (L || R) H = [I[4][0], I[2][0]], U = [I[1][1], I[3][1]];
		else if (A) {
			var ie = [
				I[0],
				I[2],
				I[4],
				I[6]
			], W = [
				j[0],
				j[2],
				j[4],
				j[6]
			];
			H = ie.filter(function(e, t) {
				return W[t][0];
			}).map(function(e) {
				return e[0];
			}), U = ie.filter(function(e, t) {
				return W[t][1];
			}).map(function(e) {
				return e[1];
			});
		} else H = I.filter(function(e, t) {
			return j[t][0];
		}).map(function(e) {
			return e[0];
		}), U = I.filter(function(e, t) {
			return j[t][1];
		}).map(function(e) {
			return e[1];
		});
		var ae = [0, 0], oe = lo(re, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, H, U, 5, 5), se = oe.horizontal, ce = oe.vertical, le = se.offset, ue = ce.offset;
		if (se.isBound && (ae[1] += le), ce.isBound && (ae[0] += ue), (R || L) && j[0][0] === 0 && j[0][1] === 0) {
			var z = ks(F), de = z.bottom - z.top, fe = R ? z.right - z.left : de, pe = ce.isBound ? $(ue) : ce.snapIndex === 0 ? -ue : ue, me = se.isBound ? $(le) : se.snapIndex === 0 ? -le : le;
			fe -= pe, de -= me, L && (de = za(ce, se) > 0 ? de : fe, fe = de);
			var he = I[0];
			I[1][1] = he[1] - de, I[2][0] = he[0] + fe, I[3][1] = he[1] + de, I[4][0] = he[0] - fe;
		} else if (A && h && l) {
			var ge = J(pl(E), 2), _e = ge[0], ve = ge[1], ye = _e && ve ? _e / ve : 0, be = E[f].direction || "", xe = I[1][1], V = I[5][1], te = I[7][0], ne = I[3][0];
			$(le) <= $(ue) ? le = kc(le) * $(ue) / ye : ue = kc(ue) * $(le) * ye, be.indexOf("w") > -1 ? te -= ue : be.indexOf("e") > -1 ? ne -= ue : (te += ue / 2, ne -= ue / 2), be.indexOf("n") > -1 ? xe -= le : be.indexOf("s") > -1 ? V -= le : (xe += le / 2, V -= le / 2);
			var Se = fl(xe, ne, V, te);
			I.forEach(function(e, t) {
				var n = J(Se[t].pos, 2);
				e[0] = n[0], e[1] = n[1];
			});
		} else I.forEach(function(e, t) {
			var n = j[t];
			n[0] && (e[0] -= ue), n[1] && (e[1] -= le);
		});
		var Ce = dl(e, p, F), we = `${T}(${Ce.join(D)})`;
		if (x.clipPathState = we, L || R) H = [I[4][0], I[2][0]], U = [I[1][1], I[3][1]];
		else if (A) {
			var ie = [
				I[0],
				I[2],
				I[4],
				I[6]
			];
			H = ie.map(function(e) {
				return e[0];
			}), U = ie.map(function(e) {
				return e[1];
			});
		} else H = I.map(function(e) {
			return e[0];
		}), U = I.map(function(e) {
			return e[1];
		});
		if (x.snapBoundInfos = lo(re, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, H, U, 1, 1), v) {
			var Te = x.is3d, Ee = x.allMatrix, De = Te ? 4 : 3, Oe = ae;
			s && (Oe = [b[0] + ae[0] - y[0], b[1] + ae[1] - y[1]]), v.deltaOffset = Vt(Ee, [
				Oe[0],
				Oe[1],
				0,
				0
			], De);
		}
		return Q(e, "onClip", Z(e, t, q({
			clipEventType: "changed",
			clipType: T,
			poses: F,
			clipStyle: we,
			clipStyles: Ce,
			distX: g,
			distY: _
		}, Zs((i = {}, i[T === "rect" ? "clip" : "clipPath"] = we, i), t)))), !0;
	},
	dragControlEnd: function(e, t) {
		this.unset(e);
		var n = t.isDrag, r = t.datas, i = t.isDouble, a = r.isLine, o = r.isClipStart, s = r.isControl;
		return o ? (Q(e, "onClipEnd", $s(e, t, {})), i && (s ? _l(e, t) : a && gl(e, t)), i || n) : !1;
	},
	unset: function(e) {
		e.state.clipPathState = "", e.state.snapBoundInfos = null;
	}
}, yl = {
	name: "originDraggable",
	props: ["originDraggable", "originRelative"],
	events: [
		"dragOriginStart",
		"dragOrigin",
		"dragOriginEnd"
	],
	css: [":host[data-able-origindraggable] .control.origin {\npointer-events: auto;\n}"],
	dragControlCondition: function(e, t) {
		return t.isRequest ? t.requestAble === "originDraggable" : yt(t.inputEvent.target, X("origin"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas;
		ii(e, t);
		var r = Z(e, t, { dragStart: go.dragStart(e, new ti().dragStart([0, 0], t)) }), i = Q(e, "onDragOriginStart", r);
		return n.startOrigin = e.state.transformOrigin, n.startTargetOrigin = e.state.targetOrigin, n.prevOrigin = [0, 0], n.isDragOrigin = !0, i === !1 ? (n.isDragOrigin = !1, !1) : r;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.isRequest;
		if (!n.isDragOrigin) return !1;
		var a = J(di(t), 2), o = a[0], s = a[1], c = e.state, l = c.width, u = c.height, d = c.offsetMatrix, f = c.targetMatrix, p = c.is3d, m = e.props.originRelative, h = m === void 0 || m, g = p ? 4 : 3, _ = [o, s];
		if (i) {
			var v = t.distOrigin;
			(v[0] || v[1]) && (_ = v);
		}
		var y = Ht(n.startOrigin, _), b = Ht(n.startTargetOrigin, _), x = K(_, n.prevOrigin), S = yi(d, f, y, g), C = e.getRect(), w = ks(Os(S, l, u, g)), T = [C.left - w.left, C.top - w.top];
		n.prevOrigin = _;
		var E = [fc(b[0], l, h), fc(b[1], u, h)].join(" "), D = go.drag(e, ei(t, e.state, T, !!r, !1)), O = Z(e, t, q(q({
			width: l,
			height: u,
			origin: y,
			dist: _,
			delta: x,
			transformOrigin: E,
			drag: D
		}, Zs({
			transformOrigin: E,
			transform: D.transform
		}, t)), { afterTransform: D.transform }));
		return Q(e, "onDragOrigin", O), O;
	},
	dragControlEnd: function(e, t) {
		return t.datas.isDragOrigin ? (Q(e, "onDragOriginEnd", $s(e, t, {})), !0) : !1;
	},
	dragGroupControlCondition: function(e, t) {
		return this.dragControlCondition(e, t);
	},
	dragGroupControlStart: function(e, t) {
		return !!this.dragControlStart(e, t);
	},
	dragGroupControl: function(e, t) {
		var n = this.dragControl(e, t);
		return n ? (e.transformOrigin = n.transformOrigin, !0) : !1;
	},
	request: function(e) {
		var t = {}, n = e.getRect(), r = 0, i = 0, a = n.transformOrigin, o = [0, 0];
		return {
			isControl: !0,
			requestStart: function() {
				return { datas: t };
			},
			request: function(e) {
				return "deltaOrigin" in e ? (o[0] += e.deltaOrigin[0], o[1] += e.deltaOrigin[1]) : "origin" in e ? (o[0] = e.origin[0] - a[0], o[1] = e.origin[1] - a[1]) : ("x" in e ? r = e.x - n.left : "deltaX" in e && (r += e.deltaX), "y" in e ? i = e.y - n.top : "deltaY" in e && (i += e.deltaY)), {
					datas: t,
					distX: r,
					distY: i,
					distOrigin: o
				};
			},
			requestEnd: function() {
				return {
					datas: t,
					isDrag: !0
				};
			}
		};
	}
};
function bl(e, t, n, r) {
	var i = e.filter(function(e) {
		var t = e.virtual;
		return e.horizontal && !t;
	}).length, a = e.filter(function(e) {
		var t = e.virtual;
		return e.vertical && !t;
	}).length, o = -1;
	if (t === 0 && (i === 0 ? o = 0 : i === 1 && (o = 1)), t === 2 && (i <= 2 ? o = 2 : i <= 3 && (o = 3)), t === 3 && (a === 0 ? o = 4 : a < 4 && (o = 7)), t === 1 && (a <= 1 ? o = 5 : a <= 2 && (o = 6)), !(o === -1 || !e[o].virtual)) {
		var s = e[o];
		xl(e, o), o < 4 ? s.pos[0] = n : s.pos[1] = r;
	}
}
function xl(e, t) {
	t < 4 ? e.slice(0, t + 1).forEach(function(e) {
		e.virtual = !1;
	}) : (e[0].virtual && (e[0].virtual = !1), e.slice(4, t + 1).forEach(function(e) {
		e.virtual = !1;
	}));
}
function Sl(e, t) {
	t < 4 ? e.slice(t, 4).forEach(function(e) {
		e.virtual = !0;
	}) : e.slice(t).forEach(function(e) {
		e.virtual = !0;
	});
}
function Cl(e, t, n, r, i) {
	r === void 0 && (r = [0, 0]);
	var a = [];
	return a = !e || e === "0px" ? [] : Ye(e), al(a, t, n, 0, 0, r, i);
}
function wl(e, t, n, r, i) {
	var a = e.state, o = a.width, s = a.height, c = rl(i, e.props.roundRelative, o, s), l = c.raws, u = c.styles, d = c.radiusPoses, f = cl(d, l), p = f.horizontals, m = f.verticals, h = u.join(" ");
	a.borderRadiusState = h;
	var g = Z(e, t, q({
		horizontals: p,
		verticals: m,
		borderRadius: h,
		width: o,
		height: s,
		delta: r,
		dist: n
	}, Zs({ borderRadius: h }, t)));
	return Q(e, "onRound", g), g;
}
function Tl(e) {
	var t = e.getState().style, n = t.borderRadius || "";
	if (!n && e.props.groupable) {
		var r = e.moveables[0], i = e.getTargets()[0];
		i && (r?.props.target === i ? (n = e.moveables[0]?.state.style.borderRadius ?? "", t.borderRadius = n) : (n = tc(i).borderRadius, t.borderRadius = n));
	}
	return n;
}
var El = {
	name: "roundable",
	props: [
		"roundable",
		"roundRelative",
		"minRoundControls",
		"maxRoundControls",
		"roundClickable",
		"roundPadding",
		"isDisplayShadowRoundControls"
	],
	events: [
		"roundStart",
		"round",
		"roundEnd",
		"roundGroupStart",
		"roundGroup",
		"roundGroupEnd"
	],
	css: [
		".control.border-radius {\nbackground: #d66;\ncursor: pointer;\nz-index: 3;\n}",
		".control.border-radius.vertical {\nbackground: #d6d;\nz-index: 2;\n}",
		".control.border-radius.virtual {\nopacity: 0.5;\nz-index: 1;\n}",
		":host.round-line-clickable .line.direction {\ncursor: pointer;\n}"
	],
	className: function(e) {
		var t = e.props.roundClickable;
		return t === !0 || t === "line" ? X("round-line-clickable") : "";
	},
	requestStyle: function() {
		return ["borderRadius"];
	},
	requestChildStyle: function() {
		return ["borderRadius"];
	},
	render: function(e, t) {
		var n = e.getState(), r = n.target, i = n.width, a = n.height, o = n.allMatrix, s = n.is3d, c = n.left, l = n.top, u = n.borderRadiusState, d = e.props, f = d.minRoundControls, p = f === void 0 ? [0, 0] : f, m = d.maxRoundControls, h = m === void 0 ? [4, 4] : m, g = d.zoom, _ = d.roundPadding, v = _ === void 0 ? 0 : _, y = d.isDisplayShadowRoundControls, b = d.groupable;
		if (!r) return null;
		var x = u || Tl(e), S = s ? 4 : 3, C = Cl(x, i, a, p, !0);
		if (!C) return null;
		var w = 0, T = 0, E = b ? [0, 0] : [c, l];
		return C.map(function(e, n) {
			var r = e.horizontal, i = e.vertical, a = e.direction || "", s = Y([], J(e.pos), !1);
			T += Math.abs(r), w += Math.abs(i), r && a.indexOf("n") > -1 && (s[1] -= v), i && a.indexOf("w") > -1 && (s[0] -= v), r && a.indexOf("s") > -1 && (s[1] += v), i && a.indexOf("e") > -1 && (s[0] += v);
			var c = K(Ds(o, s, S), E), l = y && y !== "horizontal", u = e.vertical ? w <= h[1] && (l || !e.virtual) : T <= h[0] && (y || !e.virtual);
			return t.createElement("div", {
				key: `borderRadiusControl${n}`,
				className: X("control", "border-radius", e.vertical ? "vertical" : "", e.virtual ? "virtual" : ""),
				"data-radius-index": n,
				style: {
					display: u ? "block" : "none",
					transform: `translate(${c[0]}px, ${c[1]}px) scale(${g})`
				}
			});
		});
	},
	dragControlCondition: function(e, t) {
		if (!t.inputEvent || t.isRequest) return !1;
		var n = t.inputEvent.target.getAttribute("class") || "";
		return n.indexOf("border-radius") > -1 || n.indexOf("moveable-line") > -1 && n.indexOf("moveable-direction") > -1;
	},
	dragGroupControlCondition: function(e, t) {
		return this.dragControlCondition(e, t);
	},
	dragControlStart: function(e, t) {
		var n = t.inputEvent, r = t.datas, i = n.target, a = i.getAttribute("class") || "", o = a.indexOf("border-radius") > -1, s = a.indexOf("moveable-line") > -1 && a.indexOf("moveable-direction") > -1, c = o ? parseInt(i.getAttribute("data-radius-index"), 10) : -1, l = -1;
		if (s) {
			var u = i.getAttribute("data-line-key") || "";
			u && (l = parseInt(u.replace(/render-line-/g, ""), 10), isNaN(l) && (l = -1));
		}
		if (!o && !s) return !1;
		var d = Z(e, t, {});
		if (Q(e, "onRoundStart", d) === !1) return !1;
		r.lineIndex = l, r.controlIndex = c, r.isControl = o, r.isLine = s, ii(e, t);
		var f = e.props, p = f.roundRelative, m = f.minRoundControls, h = m === void 0 ? [0, 0] : m, g = e.state, _ = g.width, v = g.height;
		r.isRound = !0, r.prevDist = [0, 0];
		var y = Cl(Tl(e) || "", _, v, h, !0) || [];
		return r.controlPoses = y, g.borderRadiusState = rl(y, p, _, v).styles.join(" "), d;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = n.controlPoses;
		if (!n.isRound || !n.isControl || !r.length) return !1;
		var i = n.controlIndex, a = J(di(t), 2), o = a[0], s = a[1], c = [o, s], l = K(c, n.prevDist), u = e.props.maxRoundControls, d = u === void 0 ? [4, 4] : u, f = e.state, p = f.width, m = f.height, h = r[i], g = h.vertical, _ = h.horizontal, v = r.map(function(e) {
			var t = e.horizontal, n = e.vertical, r = [t * _ * c[0], n * g * c[1]];
			if (t) {
				if (d[0] === 1 || d[0] < 4 && t !== _) return r;
			} else if (d[1] === 0) return r[1] = n * _ * c[0] / p * m, r;
			else if (g && (d[1] === 1 || d[1] < 4 && n !== g)) return r;
			return [0, 0];
		});
		v[i] = c;
		var y = r.map(function(e, t) {
			return q(q({}, e), { pos: Ht(e.pos, v[t]) });
		});
		return i < 4 ? y.slice(0, i + 1).forEach(function(e) {
			e.virtual = !1;
		}) : y.slice(4, i + 1).forEach(function(e) {
			e.virtual = !1;
		}), n.prevDist = [o, s], wl(e, t, c, l, y);
	},
	dragControlEnd: function(e, t) {
		var n = e.state;
		n.borderRadiusState = "";
		var r = t.datas, i = t.isDouble;
		if (!r.isRound) return !1;
		var a = r.isControl, o = r.controlIndex, s = r.isLine, c = r.lineIndex, l = r.controlPoses, u = l.filter(function(e) {
			return e.virtual;
		}).length, d = e.props.roundClickable, f = d === void 0 || d;
		if (i && f) {
			if (a && (f === !0 || f === "control")) Sl(l, o);
			else if (s && (f === !0 || f === "line")) {
				var p = J(ri(e, t), 2), m = p[0], h = p[1];
				bl(l, c, m, h);
			}
			u !== l.filter(function(e) {
				return e.virtual;
			}).length && wl(e, t, [0, 0], [0, 0], l);
		}
		var g = $s(e, t, {});
		return Q(e, "onRoundEnd", g), n.borderRadiusState = "", g;
	},
	dragGroupControlStart: function(e, t) {
		var n = this.dragControlStart(e, t);
		if (!n) return !1;
		var r = e.moveables, i = e.props.targets, a = Xi(e, "roundable", t);
		return Q(e, "onRoundGroupStart", q({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return q(q({}, e), {
					target: i[t],
					moveable: r[t],
					currentTarget: r[t]
				});
			})
		}, n)), n;
	},
	dragGroupControl: function(e, t) {
		var n = this.dragControl(e, t);
		if (!n) return !1;
		var r = e.moveables, i = e.props.targets, a = Xi(e, "roundable", t), o = q({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return q(q(q({}, e), {
					target: i[t],
					moveable: r[t],
					currentTarget: r[t]
				}), Zs({ borderRadius: n.borderRadius }, e));
			})
		}, n);
		return Q(e, "onRoundGroup", o), o;
	},
	dragGroupControlEnd: function(e, t) {
		var n = e.moveables, r = e.props.targets, i = Xi(e, "roundable", t);
		ec(e, "onRound", function(t) {
			Q(e, "onRoundGroup", q({
				targets: e.props.targets,
				events: i.map(function(e, i) {
					return q(q(q({}, e), {
						target: r[i],
						moveable: n[i],
						currentTarget: n[i]
					}), Zs({ borderRadius: t.borderRadius }, e));
				})
			}, t));
		});
		var a = this.dragControlEnd(e, t);
		if (!a) return !1;
		var o = q({
			targets: e.props.targets,
			events: i.map(function(e, t) {
				return q(q({}, e), {
					target: r[t],
					moveable: n[t],
					currentTarget: n[t],
					lastEvent: e.datas?.lastEvent
				});
			})
		}, a);
		return Q(e, "onRoundGroupEnd", o), o;
	},
	unset: function(e) {
		e.state.borderRadiusState = "";
	}
};
function Dl(e, t) {
	var n = en(t ? 4 : 3);
	return e === `matrix${t ? "3d" : ""}(${n.join(",")})` || e === "matrix(1,0,0,1,0,0)";
}
var Ol = {
	isPinch: !0,
	name: "beforeRenderable",
	props: [],
	events: [
		"beforeRenderStart",
		"beforeRender",
		"beforeRenderEnd",
		"beforeRenderGroupStart",
		"beforeRenderGroup",
		"beforeRenderGroupEnd"
	],
	dragRelation: "weak",
	setTransform: function(e, t) {
		var n = e.state, r = n.is3d, i = n.targetMatrix, a = n.inlineTransform, o = r ? `matrix3d(${i.join(",")})` : `matrix(${Wt(i, !0)})`, s = !a || a === "none" ? o : a;
		t.datas.startTransforms = Dl(s, r) ? [] : Ye(s);
	},
	resetStyle: function(e) {
		var t = e.datas;
		t.nextStyle = {}, t.nextTransforms = e.datas.startTransforms, t.nextTransformAppendedIndexes = [];
	},
	fillDragStartParams: function(e, t) {
		return Z(e, t, {
			setTransform: function(e) {
				t.datas.startTransforms = Be(e) ? e : Ye(e);
			},
			isPinch: !!t.isPinch
		});
	},
	fillDragParams: function(e, t) {
		return Z(e, t, { isPinch: !!t.isPinch });
	},
	dragStart: function(e, t) {
		this.setTransform(e, t), this.resetStyle(t), Q(e, "onBeforeRenderStart", this.fillDragStartParams(e, t));
	},
	drag: function(e, t) {
		t.datas.startTransforms || this.setTransform(e, t), this.resetStyle(t), Q(e, "onBeforeRender", Z(e, t, { isPinch: !!t.isPinch }));
	},
	dragEnd: function(e, t) {
		t.datas.startTransforms || (this.setTransform(e, t), this.resetStyle(t)), Q(e, "onBeforeRenderEnd", Z(e, t, {
			isPinch: !!t.isPinch,
			isDrag: t.isDrag
		}));
	},
	dragGroupStart: function(e, t) {
		var n = this;
		this.dragStart(e, t);
		var r = Xi(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.setTransform(r, e), n.resetStyle(e), n.fillDragStartParams(r, e);
		});
		Q(e, "onBeforeRenderGroupStart", Z(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			setTransform: function() {},
			events: a
		}));
	},
	dragGroup: function(e, t) {
		var n = this;
		this.drag(e, t);
		var r = Xi(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.resetStyle(e), n.fillDragParams(r, e);
		});
		Q(e, "onBeforeRenderGroup", Z(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			events: a
		}));
	},
	dragGroupEnd: function(e, t) {
		this.dragEnd(e, t), Q(e, "onBeforeRenderGroupEnd", Z(e, t, {
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			targets: e.props.targets
		}));
	},
	dragControlStart: function(e, t) {
		return this.dragStart(e, t);
	},
	dragControl: function(e, t) {
		return this.drag(e, t);
	},
	dragControlEnd: function(e, t) {
		return this.dragEnd(e, t);
	},
	dragGroupControlStart: function(e, t) {
		return this.dragGroupStart(e, t);
	},
	dragGroupControl: function(e, t) {
		return this.dragGroup(e, t);
	},
	dragGroupControlEnd: function(e, t) {
		return this.dragGroupEnd(e, t);
	}
}, kl = {
	name: "renderable",
	props: [],
	events: [
		"renderStart",
		"render",
		"renderEnd",
		"renderGroupStart",
		"renderGroup",
		"renderGroupEnd"
	],
	dragRelation: "weak",
	dragStart: function(e, t) {
		Q(e, "onRenderStart", Z(e, t, { isPinch: !!t.isPinch }));
	},
	drag: function(e, t) {
		Q(e, "onRender", this.fillDragParams(e, t));
	},
	dragAfter: function(e, t) {
		return this.drag(e, t);
	},
	dragEnd: function(e, t) {
		Q(e, "onRenderEnd", this.fillDragEndParams(e, t));
	},
	dragGroupStart: function(e, t) {
		Q(e, "onRenderGroupStart", Z(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets
		}));
	},
	dragGroup: function(e, t) {
		var n = this, r = Xi(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragParams(r, e);
		});
		Q(e, "onRenderGroup", Z(e, t, q(q({
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			transform: Oi(t),
			transformObject: {}
		}, Zs(ki(t))), { events: a })));
	},
	dragGroupEnd: function(e, t) {
		var n = this, r = Xi(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragEndParams(r, e);
		});
		Q(e, "onRenderGroupEnd", Z(e, t, q({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			targets: e.props.targets,
			events: a,
			transformObject: {},
			transform: Oi(t)
		}, Zs(ki(t)))));
	},
	dragControlStart: function(e, t) {
		return this.dragStart(e, t);
	},
	dragControl: function(e, t) {
		return this.drag(e, t);
	},
	dragControlAfter: function(e, t) {
		return this.dragAfter(e, t);
	},
	dragControlEnd: function(e, t) {
		return this.dragEnd(e, t);
	},
	dragGroupControlStart: function(e, t) {
		return this.dragGroupStart(e, t);
	},
	dragGroupControl: function(e, t) {
		return this.dragGroup(e, t);
	},
	dragGroupControlEnd: function(e, t) {
		return this.dragGroupEnd(e, t);
	},
	fillDragParams: function(e, t) {
		var n = {};
		return un(Di(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), Z(e, t, q({
			isPinch: !!t.isPinch,
			transformObject: n,
			transform: Oi(t)
		}, Zs(ki(t))));
	},
	fillDragEndParams: function(e, t) {
		var n = {};
		return un(Di(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), Z(e, t, q({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			transformObject: n,
			transform: Oi(t)
		}, Zs(ki(t))));
	}
};
function Al(e, t, n, r, i, a, o) {
	a.clientDistX = a.distX, a.clientDistY = a.distY;
	var s = i === "Start", c = i === "End", l = i === "After", u = e.state.target, d = a.isRequest, f = r.indexOf("Control") > -1;
	if (!u || s && f && !d && e.areaElement === a.inputEvent.target) return !1;
	var p = Y([], J(t), !1);
	if (d) {
		var m = a.requestAble;
		p.some(function(e) {
			return e.name === m;
		}) || p.push.apply(p, Y([], J(e.props.ables.filter(function(e) {
			return e.name === m;
		})), !1));
	}
	if (!p.length || p.every(function(e) {
		return e.dragRelation;
	})) return !1;
	var h = a.inputEvent, g;
	c && h && (g = document.elementFromPoint(a.clientX, a.clientY) || h.target);
	var _ = !1, v = function() {
		var e;
		_ = !0, (e = a.stop) == null || e.call(a);
	}, y = s && (!e.targetGesto || !e.controlGesto || !e.targetGesto.isFlag() || !e.controlGesto.isFlag());
	y && e.updateRect(i, !0, !1);
	var b = a.datas, x = f ? "controlGesto" : "targetGesto", S = e[x], C = function(t, n, r) {
		if (!(n in t) || S !== e[x]) return !1;
		var i = t.name, o = b[i] || (b[i] = {});
		if (s && (o.isEventStart = !r || !t[r] || t[r](e, a)), !o.isEventStart) return !1;
		var c = t[n](e, q(q({}, a), {
			stop: v,
			datas: o,
			originalDatas: b,
			inputTarget: g
		}));
		return e._emitter.off(), s && c === !1 && (o.isEventStart = !1), c;
	};
	y && p.forEach(function(t) {
		t.unset && t.unset(e);
	}), C(Ol, `drag${r}${i}`);
	var w = 0, T = 0;
	n.forEach(function(t) {
		if (_) return !1;
		var n = `${t}${r}${i}`, o = `${t}${r}Condition`;
		i === "" && !d && uc(e.state, a);
		var c = p.filter(function(e) {
			return e[n];
		});
		c = c.filter(function(e, t) {
			return e.name && c.indexOf(e) === t;
		});
		var l = c.filter(function(e) {
			return C(e, n, o);
		}).length;
		_ && ++w, l && ++T, !_ && s && c.length && !l && (w += +!!c.filter(function(e) {
			return b[e.name].isEventStart ? e.dragRelation !== "strong" : !1;
		}).length);
	}), (!l || T) && C(kl, `drag${r}${i}`);
	var E = S !== e[x] || w === n.length;
	return (c || _ || E) && (e.state.gestos = {}, e.moveables && e.moveables.forEach(function(e) {
		e.state.gestos = {};
	}), p.forEach(function(t) {
		t.unset && t.unset(e);
	})), s && !E && !d && T && e.props.preventDefault && a?.preventDefault(), e.isUnmounted || E ? !1 : ((!s && T && !o || c) && (e.props.flushSync || us)(function() {
		e.updateRect(c ? i : "", !0, !1), e.forceUpdate();
	}), !s && !c && !l && T && !o && Al(e, t, n, r, i + "After", a), !0);
}
function jl(e, t) {
	return function(n, r) {
		r === void 0 && (r = n.inputEvent.target);
		var i = r, a = e.areaElement, o = e._dragTarget;
		return !o || !t && e.controlGesto?.isFlag() ? !1 : i === o || o.contains(i) || i === a || !e.isMoveableElement(i) && !e.controlBox.contains(i) || yt(i, "moveable-area") || yt(i, "moveable-padding") || yt(i, "moveable-edgeDraggable");
	};
}
function Ml(e, t, n) {
	var r = e.controlBox, i = [], a = e.props, o = a.dragArea, s = e.state.target, c = a.dragTarget;
	i.push(r), (!o || c) && i.push(t), !o && c && s && t !== s && a.dragTargetSelf && i.push(s);
	var l = jl(e);
	return Pl(e, i, "targetAbles", n, {
		dragStart: l,
		pinchStart: l
	});
}
function Nl(e, t) {
	var n = e.controlBox, r = [];
	r.push(n);
	var i = jl(e, !0), a = function(e, t) {
		return t === void 0 && (t = e.inputEvent.target), t === n || !i(e, t);
	};
	return Pl(e, r, "controlAbles", t, {
		dragStart: a,
		pinchStart: a
	});
}
function Pl(e, t, n, r, i) {
	i === void 0 && (i = {});
	var a = n === "targetAbles", o = e.props, s = o.pinchOutside, c = o.pinchThreshold, l = o.preventClickEventOnDrag, u = o.preventClickDefault, d = o.checkInput, f = o.dragFocusedInput, p = o.preventDefault, m = p === void 0 || p, h = o.preventRightClick, g = h === void 0 || h, _ = o.preventWheelClick, v = _ === void 0 || _, y = o.dragContainer, b = new ur(t, {
		preventDefault: m,
		preventRightClick: g,
		preventWheelClick: v,
		container: vc(y, !0) || Dt(e.getControlBoxElement()),
		pinchThreshold: c,
		pinchOutside: s,
		preventClickEventOnDrag: a ? l : !1,
		preventClickEventOnDragStart: a ? u : !1,
		preventClickEventByCondition: a ? null : function(t) {
			return e.controlBox.contains(t.target);
		},
		checkInput: a ? d : !1,
		dragFocusedInput: f
	}), x = r === "Control";
	return ["drag", "pinch"].forEach(function(t) {
		[
			"Start",
			"",
			"End"
		].forEach(function(a) {
			b.on(`${t}${a}`, function(o) {
				var s, c = o.eventType, l = t === "drag" && o.isPinch;
				if (i[c] && !i[c](o)) {
					o.stop();
					return;
				}
				if (!l) {
					var u = t === "drag" ? [t] : ["drag", t];
					Al(e, Y([], J(e[n]), !1), u, r, a, o) ? (e.props.stopPropagation || a === "Start" && x) && ((s = o?.inputEvent) == null || s.stopPropagation()) : o.stop();
				}
			});
		});
	}), b;
}
var Fl = /* @__PURE__ */ function() {
	function e(e, t, n) {
		var r = this;
		this.target = e, this.moveable = t, this.eventName = n, this.ables = [], this._onEvent = function(e) {
			var t = r.eventName, n = r.moveable;
			n.state.disableNativeEvent || r.ables.forEach(function(r) {
				r[t](n, { inputEvent: e });
			});
		}, e.addEventListener(n.toLowerCase(), this._onEvent);
	}
	return e.prototype.setAbles = function(e) {
		this.ables = e;
	}, e.prototype.destroy = function() {
		this.target.removeEventListener(this.eventName.toLowerCase(), this._onEvent), this.target = null, this.moveable = null;
	}, e;
}();
function Il(e, t, n, r) {
	n === void 0 && (n = t);
	var i = Hi(e, t), a = i.matrixes, o = i.is3d, s = i.targetMatrix, c = i.transformOrigin, l = i.targetOrigin, u = i.offsetContainer, d = i.hasFixed, f = i.zoom, p = Ji(u, n), m = p.matrixes, h = p.is3d, g = p.offsetContainer, _ = p.zoom, v = r || h || o, y = v ? 4 : 3, b = e.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in e, x = s, S = en(y), C = en(y), w = en(y), T = en(y), E = a.length, D = m.map(function(e) {
		return q(q({}, e), { matrix: e.matrix ? Y([], J(e.matrix), !1) : void 0 });
	}).reverse();
	a.reverse(), !o && v && (x = zt(x, 3, 4), xs(a)), !h && v && xs(D), D.forEach(function(e) {
		C = Vt(C, e.matrix, y);
	});
	var O = n || Et(e), k = D[0]?.target || vs(O, O, !0).offsetParent, A = D.slice(1).reduce(function(e, t) {
		return Vt(e, t.matrix, y);
	}, en(y));
	a.forEach(function(e, t) {
		if (E - 2 === t && (w = S.slice()), E - 1 === t && (T = S.slice()), !e.matrix) {
			var n = a[t + 1];
			e.matrix = nn(js(e, n, k, y, Vt(A, S, y)), y);
		}
		S = Vt(S, e.matrix, y);
	});
	var j = !b && o;
	x ||= en(j ? 4 : 3);
	var M = Cs(b && x.length === 16 ? zt(x, 4, 3) : x, j), N = C;
	return C = Nt(C, y, y), {
		hasZoom: f !== 1 || _ !== 1,
		hasFixed: d,
		matrixes: a,
		rootMatrix: C,
		originalRootMatrix: N,
		beforeMatrix: w,
		offsetMatrix: T,
		allMatrix: S,
		targetMatrix: x,
		targetTransform: M,
		inlineTransform: e.style.transform,
		transformOrigin: c,
		targetOrigin: l,
		is3d: v,
		offsetContainer: u,
		offsetRootContainer: g
	};
}
function Ll(e, t, n, r) {
	n === void 0 && (n = t);
	var i = 0, a = 0, o = 0, s = {}, c = Rs(e);
	if (e && (i = c.offsetWidth, a = c.offsetHeight), e) {
		var l = Il(e, t, n, r), u = ni(l.allMatrix, l.transformOrigin, i, a);
		s = q(q({}, l), u);
		var d = ni(l.allMatrix, [50, 50], 100, 100);
		o = zs([d.pos1, d.pos2], d.direction);
	}
	var f = r ? 4 : 3;
	return q(q(q({
		hasZoom: !1,
		width: i,
		height: a,
		rotation: o
	}, c), {
		originalRootMatrix: en(f),
		rootMatrix: en(f),
		beforeMatrix: en(f),
		offsetMatrix: en(f),
		allMatrix: en(f),
		targetMatrix: en(f),
		targetTransform: "",
		inlineTransform: "",
		transformOrigin: [0, 0],
		targetOrigin: [0, 0],
		is3d: !!r,
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		origin: [0, 0],
		pos1: [0, 0],
		pos2: [0, 0],
		pos3: [0, 0],
		pos4: [0, 0],
		direction: 1,
		hasFixed: !1,
		offsetContainer: null,
		offsetRootContainer: null,
		matrixes: []
	}), s);
}
function Rl(e, t, n, r, i, a) {
	a === void 0 && (a = []);
	var o = 1, s = [0, 0], c = Bs(), l = Bs(), u = Bs(), d = Bs(), f = [0, 0], p = {}, m = Ll(t, n, i, !0);
	if (t) {
		var h = Yi(t);
		a.forEach(function(e) {
			p[e] = h(e);
		});
		var g = m.is3d ? 4 : 3, _ = ni(m.offsetMatrix, Ht(m.transformOrigin, It(m.targetMatrix, g)), m.width, m.height);
		o = _.direction, s = Ht(_.origin, [_.left - m.left, _.top - m.top]), d = Us(m.offsetRootContainer);
		var v = vs(r, r, !0).offsetParent || m.offsetRootContainer;
		if (m.hasZoom) {
			var y = ni(Vt(m.originalRootMatrix, m.allMatrix), m.transformOrigin, m.width, m.height), b = ni(m.originalRootMatrix, hs(Yi(v)("transformOrigin")).map(function(e) {
				return parseFloat(e);
			}), v.offsetWidth, v.offsetHeight);
			if (c = Hs(y, d), u = Hs(b, d, v, !0), e) {
				var x = y.left, S = y.top;
				l = Hs({
					left: x,
					top: S,
					bottom: S,
					right: S
				}, d);
			}
		} else {
			c = Us(t), u = qi(v), e && (l = Us(e));
			var C = u.left, w = u.top, T = u.clientLeft, E = u.clientTop, D = [c.left - C, c.top - w];
			f = K(lc(m.rootMatrix, D, 4), [T + m.left, E + m.top]);
		}
	}
	return q({
		targetClientRect: c,
		containerClientRect: u,
		moveableClientRect: l,
		rootContainerClientRect: d,
		beforeDirection: o,
		beforeOrigin: s,
		originalBeforeOrigin: s,
		target: t,
		style: p,
		offsetDelta: f
	}, m);
}
function zl(e) {
	var t = e.pos1, n = e.pos2, r = e.pos3, i = e.pos4;
	if (!t || !n || !r || !i) return null;
	var a = Bn([
		t,
		n,
		r,
		i
	]), o = [a.minX, a.minY], s = K(e.origin, o);
	return t = K(t, o), n = K(n, o), r = K(r, o), i = K(i, o), q(q({}, e), {
		left: e.left,
		top: e.top,
		posDelta: o,
		pos1: t,
		pos2: n,
		pos3: r,
		pos4: i,
		origin: s,
		beforeOrigin: s,
		isPersisted: !0
	});
}
var Bl = /* @__PURE__ */ function(e) {
	Sr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.state = q({
			container: null,
			gestos: {},
			renderLines: [
				[[0, 0], [0, 0]],
				[[0, 0], [0, 0]],
				[[0, 0], [0, 0]],
				[[0, 0], [0, 0]]
			],
			renderPoses: [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			],
			disableNativeEvent: !1,
			posDelta: [0, 0]
		}, Rl(null)), t.renderState = {}, t.enabledAbles = [], t.targetAbles = [], t.controlAbles = [], t.rotation = 0, t.scale = [1, 1], t.isMoveableMounted = !1, t.isUnmounted = !1, t.events = {
			mouseEnter: null,
			mouseLeave: null
		}, t._emitter = new En(), t._prevOriginalDragTarget = null, t._originalDragTarget = null, t._prevDragTarget = null, t._dragTarget = null, t._prevPropTarget = null, t._propTarget = null, t._prevDragArea = !1, t._isPropTargetChanged = !1, t._hasFirstTarget = !1, t._reiszeObserver = null, t._observerId = 0, t._mutationObserver = null, t._rootContainer = null, t._viewContainer = null, t._viewClassNames = [], t._store = {}, t.checkUpdateRect = function() {
			if (!t.isDragging()) {
				var e = t.props.parentMoveable;
				if (e) {
					e.checkUpdateRect();
					return;
				}
				it(t._observerId), t._observerId = rt(function() {
					t.isDragging() || t.updateRect();
				});
			}
		}, t._onPreventClick = function(e) {
			e.stopPropagation(), e.preventDefault();
		}, t;
	}
	return t.prototype.render = function() {
		var e = this.props, t = this.getState(), n = e.parentPosition, r = e.className, i = e.target, a = e.zoom, o = e.cspNonce, s = e.translateZ, c = e.cssStyled, l = e.groupable, u = e.linePadding, d = e.controlPadding;
		this._checkUpdateRootContainer(), this.checkUpdate(), this.updateRenderPoses();
		var f = J(n || [0, 0], 2), p = f[0], m = f[1], h = t.left, g = t.top, _ = t.target, v = t.direction, y = t.hasFixed, b = t.offsetDelta, x = e.targets, S = this.isDragging(), C = {};
		this.getEnabledAbles().forEach(function(e) {
			C[`data-able-${e.name.toLowerCase()}`] = !0;
		});
		var w = this._getAbleClassName(), T = x && x.length && (_ || l) || i || !this._hasFirstTarget && this.state.isPersisted, E = this.controlBox || this.props.firstRenderState || this.props.persistData, D = [h - p, g - m];
		!l && e.useAccuratePosition && (D[0] += b[0], D[1] += b[1]);
		var O = {
			position: y ? "fixed" : "absolute",
			display: T ? "block" : "none",
			visibility: E ? "visible" : "hidden",
			transform: `translate3d(${D[0]}px, ${D[1]}px, ${s})`,
			"--zoom": a,
			"--zoompx": `${a}px`
		};
		return u && (O["--moveable-line-padding"] = u), d && (O["--moveable-control-padding"] = d), R.createElement(c, q({
			cspNonce: o,
			ref: we(this, "controlBox"),
			className: `${X("control-box", v === -1 ? "reverse" : "", S ? "dragging" : "")} ${w} ${r}`
		}, C, {
			onClick: this._onPreventClick,
			style: O
		}), this.renderAbles(), this._renderLines());
	}, t.prototype.componentDidMount = function() {
		this.isMoveableMounted = !0, this.isUnmounted = !1;
		var e = this.props, t = e.parentMoveable, n = e.container;
		this._checkUpdateRootContainer(), this._checkUpdateViewContainer(), this._updateTargets(), this._updateNativeEvents(), this._updateEvents(), this.updateCheckInput(), this._updateObserver(this.props), !n && !t && !this.state.isPersisted && (this.updateRect("", !1, !1), this.forceUpdate());
	}, t.prototype.componentDidUpdate = function(e) {
		this._checkUpdateRootContainer(), this._checkUpdateViewContainer(), this._updateNativeEvents(), this._updateTargets(), this._updateEvents(), this.updateCheckInput(), this._updateObserver(e);
	}, t.prototype.componentWillUnmount = function() {
		var e, t;
		this.isMoveableMounted = !1, this.isUnmounted = !0, this._emitter.off(), (e = this._reiszeObserver) == null || e.disconnect(), (t = this._mutationObserver) == null || t.disconnect(), this._viewContainer && this._changeAbleViewClassNames([]), Xs(this, !1), Xs(this, !0);
		var n = this.events;
		for (var r in n) {
			var i = n[r];
			i && i.destroy();
		}
	}, t.prototype.getTargets = function() {
		var e = this.props.target;
		return e ? [e] : [];
	}, t.prototype.getAble = function(e) {
		return nt(this.props.ables || [], function(t) {
			return t.name === e;
		});
	}, t.prototype.getContainer = function() {
		var e = this.props, t = e.parentMoveable, n = e.wrapperMoveable;
		return e.container || n && n.getContainer() || t && t.getContainer() || this.controlBox.parentElement;
	}, t.prototype.getControlBoxElement = function() {
		return this.controlBox;
	}, t.prototype.getDragElement = function() {
		return this._dragTarget;
	}, t.prototype.isMoveableElement = function(e) {
		return e && (e.getAttribute?.call(e, "class") || "").indexOf(Hr) > -1;
	}, t.prototype.dragStart = function(e, t) {
		t === void 0 && (t = e.target);
		var n = this.targetGesto, r = this.controlGesto;
		return n && jl(this)({ inputEvent: e }, t) ? n.isFlag() || n.triggerDragStart(e) : r && this.isMoveableElement(t) && (r.isFlag() || r.triggerDragStart(e)), this;
	}, t.prototype.hitTest = function(e) {
		var t = this.state, n = t.target, r = t.pos1, i = t.pos2, a = t.pos3, o = t.pos4, s = t.targetClientRect;
		if (!n) return 0;
		var c;
		if (kt(e)) {
			var l = e.getBoundingClientRect();
			c = {
				left: l.left,
				top: l.top,
				width: l.width,
				height: l.height
			};
		} else c = q({
			width: 0,
			height: 0
		}, e);
		var u = c.left, d = c.top, f = c.width, p = c.height, m = zn([
			r,
			i,
			o,
			a
		], s), h = Jn(m, [
			[u, d],
			[u + f, d],
			[u + f, d + p],
			[u, d + p]
		]), g = Rn(m);
		return !h || !g ? 0 : Math.min(100, h / g * 100);
	}, t.prototype.isInside = function(e, t) {
		var n = this.state, r = n.target, i = n.pos1, a = n.pos2, o = n.pos3, s = n.pos4, c = n.targetClientRect;
		return r ? Vn([e, t], zn([
			i,
			a,
			s,
			o
		], c)) : !1;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.props, i = !r.parentPosition && !r.wrapperMoveable;
		i && Ki(!0);
		var a = r.parentMoveable, o = this.state.target || r.target, s = this.getContainer(), c = a ? a._rootContainer : this._rootContainer, l = Rl(this.controlBox, o, s, s, c || s, this._getRequestStyles());
		if (!o && this._hasFirstTarget && r.persistData) {
			var u = zl(r.persistData);
			for (var d in u) l[d] = u[d];
		}
		i && Ki(), this.updateState(l, !a && n);
	}, t.prototype.isDragging = function(e) {
		var t = this.targetGesto, n = this.controlGesto;
		if (t?.isFlag()) {
			if (!e) return !0;
			var r = t.getEventData();
			return !!r[e]?.isEventStart;
		}
		if (n?.isFlag()) {
			if (!e) return !0;
			var r = n.getEventData();
			return !!r[e]?.isEventStart;
		}
		return !1;
	}, t.prototype.updateTarget = function(e) {
		this.updateRect(e, !0);
	}, t.prototype.getRect = function() {
		var e = this.state, t = Js(this.state), n = J(t, 4), r = n[0], i = n[1], a = n[2], o = n[3], s = ks(t), c = e.width, l = e.height, u = s.width, d = s.height, f = s.left, p = s.top, m = [e.left, e.top], h = Ht(m, e.origin);
		return {
			width: u,
			height: d,
			left: f,
			top: p,
			pos1: r,
			pos2: i,
			pos3: a,
			pos4: o,
			offsetWidth: c,
			offsetHeight: l,
			beforeOrigin: Ht(m, e.beforeOrigin),
			origin: h,
			transformOrigin: e.transformOrigin,
			rotation: this.getRotation()
		};
	}, t.prototype.getManager = function() {
		return this;
	}, t.prototype.stopDrag = function(e) {
		if (!e || e === "target") {
			var t = this.targetGesto;
			t?.isIdle() === !1 && Ys(this, !1), t?.stop();
		}
		if (!e || e === "control") {
			var t = this.controlGesto;
			t?.isIdle() === !1 && Ys(this, !0), t?.stop();
		}
	}, t.prototype.getRotation = function() {
		var e = this.state, t = e.pos1, n = e.pos2, r = e.direction;
		return bc(t, n, r);
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this, i = r.props, a = i.parentMoveable || i.wrapperMoveable || r, o = a.props.ables, s = i.groupable, c = nt(o, function(t) {
			return t.name === e;
		});
		if (this.isDragging() || !c || !c.request) return {
			request: function() {
				return this;
			},
			requestEnd: function() {
				return this;
			}
		};
		var l = c.request(r), u = n || t.isInstant, d = l.isControl ? "controlAbles" : "targetAbles", f = `${s ? "Group" : ""}${l.isControl ? "Control" : ""}`, p = Y([], J(a[d]), !1), m = {
			request: function(t) {
				return Al(r, p, ["drag"], f, "", q(q({}, l.request(t)), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			},
			requestEnd: function() {
				return Al(r, p, ["drag"], f, "End", q(q({}, l.requestEnd()), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			}
		};
		return Al(r, p, ["drag"], f, "Start", q(q({}, l.requestStart(t)), {
			requestAble: e,
			isRequest: !0
		}), u), u ? m.request(t).requestEnd() : m;
	}, t.prototype.getMoveables = function() {
		return [this];
	}, t.prototype.destroy = function() {
		this.componentWillUnmount();
	}, t.prototype.updateRenderPoses = function() {
		var e = this.getState(), t = this.props, n = t.padding, r = e.originalBeforeOrigin, i = e.transformOrigin, a = e.allMatrix, o = e.is3d, s = e.pos1, c = e.pos2, l = e.pos3, u = e.pos4, d = e.left, f = e.top, p = e.isPersisted, m = t.zoom || 1;
		if (!n && m <= 1) {
			e.renderPoses = [
				s,
				c,
				l,
				u
			], e.renderLines = [
				[s, c],
				[c, u],
				[u, l],
				[l, s]
			];
			return;
		}
		var h = jc(n || {}), g = h.left, _ = h.top, v = h.bottom, y = h.right, b = o ? 4 : 3, x = [];
		x = p ? i : this.controlBox && t.groupable ? r : Ht(r, [d, f]);
		var S = Bt(b, nn(x.map(function(e) {
			return -e;
		}), b), a, nn(i, b)), C = dc(S, s, [-g, -_], b), w = dc(S, c, [y, -_], b), T = dc(S, l, [-g, v], b), E = dc(S, u, [y, v], b);
		if (e.renderPoses = [
			C,
			w,
			T,
			E
		], e.renderLines = [
			[C, w],
			[w, E],
			[E, T],
			[T, C]
		], m) {
			var D = m / 2;
			e.renderLines = [
				[dc(S, s, [-g - D, -_], b), dc(S, c, [y + D, -_], b)],
				[dc(S, c, [y, -_ - D], b), dc(S, u, [y, v + D], b)],
				[dc(S, u, [y + D, v], b), dc(S, l, [-g - D, v], b)],
				[dc(S, l, [-g, v + D], b), dc(S, s, [-g, -_ - D], b)]
			];
		}
	}, t.prototype.checkUpdate = function() {
		this._isPropTargetChanged = !1;
		var e = this.props, t = e.target, n = e.container, r = e.parentMoveable, i = this.state, a = i.target, o = i.container;
		if (!(!a && !t)) {
			this.updateAbles();
			var s = !rc(a, t);
			if (s || !rc(o, n)) {
				var c = n || this.controlBox;
				c && this.unsetAbles(), this.updateState({
					target: t,
					container: n
				}), !r && c && this.updateRect("End", !1, !1), this._isPropTargetChanged = s;
			}
		}
	}, t.prototype.waitToChangeTarget = function() {
		return new Promise(function() {});
	}, t.prototype.triggerEvent = function(e, t) {
		var n = this.props;
		if (this._emitter.trigger(e, t), n.parentMoveable && t.isRequest && !t.isRequestChild) return n.parentMoveable.triggerEvent(e, t, !0);
		var r = n[e];
		return r && r(t);
	}, t.prototype.useCSS = function(e, t) {
		var n = this.props.customStyledMap, r = e + t;
		return n[r] || (n[r] = br(e, t)), n[r];
	}, t.prototype.getState = function() {
		var e = this.props;
		(e.target || e.targets?.length) && (this._hasFirstTarget = !0);
		var t = this.controlBox, n = e.persistData, r = e.firstRenderState;
		if (r && !t) return r;
		if (!this._hasFirstTarget && n) {
			var i = zl(n);
			if (i) return this.updateState(i, !1), this.state;
		}
		return this.state.isPersisted = !1, this.state;
	}, t.prototype.updateSelectors = function() {}, t.prototype.unsetAbles = function() {
		var e = this;
		this.targetAbles.forEach(function(t) {
			t.unset && t.unset(e);
		});
	}, t.prototype.updateAbles = function(e, t) {
		e === void 0 && (e = this.props.ables), t === void 0 && (t = "");
		var n = this.props.triggerAblesSimultaneously, r = this.getEnabledAbles(e), i = `drag${t}Start`, a = `pinch${t}Start`, o = `drag${t}ControlStart`, s = nc(r, [i, a], n), c = nc(r, [o], n);
		this.enabledAbles = r, this.targetAbles = s, this.controlAbles = c;
	}, t.prototype.updateState = function(e, t) {
		if (t) {
			if (this.isUnmounted) return;
			this.setState(e);
		} else {
			var n = this.state;
			for (var r in e) n[r] = e[r];
		}
	}, t.prototype.getEnabledAbles = function(e) {
		e === void 0 && (e = this.props.ables);
		var t = this.props;
		return e.filter(function(e) {
			return e && (e.always && t[e.name] !== !1 || t[e.name]);
		});
	}, t.prototype.renderAbles = function() {
		var e = this, t = this.props.triggerAblesSimultaneously, n = { createElement: R.createElement };
		return this.renderState = {}, oc(sc(nc(this.getEnabledAbles(), ["render"], t).map(function(t) {
			var r = t.render;
			return r(e, n) || [];
		})).filter(function(e) {
			return e;
		}), function(e) {
			return e.key;
		}).map(function(e) {
			return e[0];
		});
	}, t.prototype.updateCheckInput = function() {
		this.targetGesto && (this.targetGesto.options.checkInput = this.props.checkInput);
	}, t.prototype._getRequestStyles = function() {
		return this.getEnabledAbles().reduce(function(e, t) {
			var n = t.requestStyle?.call(t) ?? [];
			return Y(Y([], J(e), !1), J(n), !1);
		}, Y([], J(this.props.requestStyles || []), !1));
	}, t.prototype._updateObserver = function(e) {
		this._updateResizeObserver(e), this._updateMutationObserver(e);
	}, t.prototype._updateEvents = function() {
		var e = this.targetAbles.length, t = this.controlAbles.length, n = this._dragTarget;
		(!e && this.targetGesto || this._isTargetChanged(!0)) && (Xs(this, !1), this.updateState({ gestos: {} })), t || Xs(this, !0), n && e && !this.targetGesto && (this.targetGesto = Ml(this, n, "")), !this.controlGesto && t && (this.controlGesto = Nl(this, "Control"));
	}, t.prototype._updateTargets = function() {
		var e = this.props;
		this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = vc(this._originalDragTarget, !0);
	}, t.prototype._renderLines = function() {
		var e = this.props, t = e.zoom, n = e.hideDefaultLines, r = e.hideChildMoveableDefaultLines, i = e.parentMoveable;
		if (n || i && r) return [];
		var a = this.getState(), o = { createElement: R.createElement };
		return a.renderLines.map(function(e, n) {
			return na(o, "", e[0], e[1], t, `render-line-${n}`);
		});
	}, t.prototype._isTargetChanged = function(e) {
		var t = this.props, n = t.dragTarget || t.target, r = this._prevOriginalDragTarget, i = this._prevDragArea, a = t.dragArea;
		return !a && r !== n || (e || a) && i !== a || this._prevPropTarget != this._propTarget;
	}, t.prototype._updateNativeEvents = function() {
		var e = this, t = this.props.dragArea ? this.areaElement : this.state.target, n = this.events, r = at(n);
		if (this._isTargetChanged()) for (var i in n) {
			var a = n[i];
			a && a.destroy(), n[i] = null;
		}
		if (t) {
			var o = this.enabledAbles;
			r.forEach(function(r) {
				var i = nc(o, [r]), a = i.length > 0, s = n[r];
				if (!a) {
					s && (s.destroy(), n[r] = null);
					return;
				}
				s || (s = new Fl(t, e, r), n[r] = s), s.setAbles(i);
			});
		}
	}, t.prototype._checkUpdateRootContainer = function() {
		var e = this.props.rootContainer;
		!this._rootContainer && e && (this._rootContainer = vc(e, !0));
	}, t.prototype._checkUpdateViewContainer = function() {
		var e = this.props.viewContainer;
		!this._viewContainer && e && (this._viewContainer = vc(e, !0)), this._viewContainer && this._changeAbleViewClassNames(Y(Y([], J(this._getAbleViewClassNames()), !1), [this.isDragging() ? Hc : ""], !1));
	}, t.prototype._changeAbleViewClassNames = function(e) {
		var t = this._viewContainer, n = ac(e.filter(Boolean), function(e) {
			return e;
		}).map(function(e) {
			return J(e, 1)[0];
		}), r = this._viewClassNames, i = _n(r, n), a = i.removed, o = i.added;
		a.forEach(function(e) {
			xt(t, r[e]);
		}), o.forEach(function(e) {
			bt(t, n[e]);
		}), this._viewClassNames = n;
	}, t.prototype._getAbleViewClassNames = function() {
		var e = this;
		return (this.getEnabledAbles().map(function(t) {
			return t.viewClassName?.call(t, e) || "";
		}).join(" ") + ` ${this._getAbleClassName("-view")}`).split(/\s+/g);
	}, t.prototype._getAbleClassName = function(e) {
		var t = this;
		e === void 0 && (e = "");
		var n = this.getEnabledAbles(), r = this.targetGesto, i = this.controlGesto, a = r?.isFlag() ? r.getEventData() : {}, o = i?.isFlag() ? i.getEventData() : {};
		return n.map(function(n) {
			var r = n.name, i = n.className?.call(n, t) || "";
			return (a[r]?.isEventStart || o[r]?.isEventStart) && (i += ` ${X(`${r}${e}-dragging`)}`), i.trim();
		}).filter(Boolean).join(" ");
	}, t.prototype._updateResizeObserver = function(e) {
		var t, n = this.props, r = n.target, i = Dt(this.getControlBoxElement());
		if (!i.ResizeObserver || !r || !n.useResizeObserver) {
			(t = this._reiszeObserver) == null || t.disconnect();
			return;
		}
		if (!(e.target === r && this._reiszeObserver)) {
			var a = new i.ResizeObserver(this.checkUpdateRect);
			a.observe(r, { box: "border-box" }), this._reiszeObserver = a;
		}
	}, t.prototype._updateMutationObserver = function(e) {
		var t = this, n, r = this.props, i = r.target, a = Dt(this.getControlBoxElement());
		if (!a.MutationObserver || !i || !r.useMutationObserver) {
			(n = this._mutationObserver) == null || n.disconnect();
			return;
		}
		if (!(e.target === i && this._mutationObserver)) {
			var o = new a.MutationObserver(function(e) {
				var n, r;
				try {
					for (var i = Tr(e), a = i.next(); !a.done; a = i.next()) {
						var o = a.value;
						o.type === "attributes" && o.attributeName === "style" && t.checkUpdateRect();
					}
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						a && !a.done && (r = i.return) && r.call(i);
					} finally {
						if (n) throw n.error;
					}
				}
			});
			o.observe(i, { attributes: !0 }), this._mutationObserver = o;
		}
	}, t.defaultProps = {
		dragTargetSelf: !1,
		target: null,
		dragTarget: null,
		container: null,
		rootContainer: null,
		origin: !0,
		parentMoveable: null,
		wrapperMoveable: null,
		isWrapperMounted: !1,
		parentPosition: null,
		warpSelf: !1,
		svgOrigin: "",
		dragContainer: null,
		useResizeObserver: !1,
		useMutationObserver: !1,
		preventDefault: !0,
		preventRightClick: !0,
		preventWheelClick: !0,
		linePadding: 0,
		controlPadding: 0,
		ables: [],
		pinchThreshold: 20,
		dragArea: !1,
		passDragArea: !1,
		transformOrigin: "",
		className: "",
		zoom: 1,
		triggerAblesSimultaneously: !1,
		padding: {},
		pinchOutside: !0,
		checkInput: !1,
		dragFocusedInput: !1,
		groupable: !1,
		hideDefaultLines: !1,
		cspNonce: "",
		translateZ: 0,
		cssStyled: null,
		customStyledMap: {},
		props: {},
		stopPropagation: !1,
		preventClickDefault: !1,
		preventClickEventOnDrag: !0,
		flushSync: us,
		firstRenderState: null,
		persistData: null,
		viewContainer: null,
		requestStyles: [],
		useAccuratePosition: !1
	}, t;
}(R.PureComponent), Vl = {
	name: "groupable",
	props: [
		"defaultGroupRotate",
		"useDefaultGroupRotate",
		"defaultGroupOrigin",
		"groupable",
		"groupableProps",
		"targetGroups",
		"hideChildMoveableDefaultLines"
	],
	events: [],
	render: function(e, t) {
		var n = e.props, r = n.targets || [], i = e.getState(), a = i.left, o = i.top, s = i.isPersisted, c = n.zoom || 1, l = e.renderGroupRects, u = n.persistData?.children || [];
		s ? r = u.map(function() {
			return null;
		}) : u = [];
		var d = Oc(e, "parentPosition", [a, o], function(e) {
			return e.join(",");
		}), f = Oc(e, "requestStyles", e.getRequestChildStyles(), function(e) {
			return e.join(",");
		});
		return e.moveables = e.moveables.slice(0, r.length), Y(Y([], J(r.map(function(r, i) {
			return t.createElement(Bl, {
				key: "moveable" + i,
				ref: Te(e, "moveables", i),
				target: r,
				origin: !1,
				requestStyles: f,
				cssStyled: n.cssStyled,
				customStyledMap: n.customStyledMap,
				useResizeObserver: n.useResizeObserver,
				useMutationObserver: n.useMutationObserver,
				hideChildMoveableDefaultLines: n.hideChildMoveableDefaultLines,
				parentMoveable: e,
				parentPosition: [a, o],
				persistData: u[i],
				zoom: c
			});
		})), !1), J(sc(l.map(function(e, n) {
			var r = [
				e.pos1,
				e.pos2,
				e.pos3,
				e.pos4
			];
			return [
				[0, 1],
				[1, 3],
				[3, 2],
				[2, 0]
			].map(function(e, i) {
				var a = J(e, 2), o = a[0], s = a[1];
				return na(t, "", K(r[o], d), K(r[s], d), c, `group-rect-${n}-${i}`);
			});
		}))), !1);
	}
}, Hl = Er("clickable", {
	props: ["clickable"],
	events: ["click", "clickGroup"],
	always: !0,
	dragRelation: "weak",
	dragStart: function() {},
	dragControlStart: function() {},
	dragGroupStart: function(e, t) {
		t.datas.inputTarget = t.inputEvent && t.inputEvent.target;
	},
	dragEnd: function(e, t) {
		var n = e.props.target, r = t.inputEvent, i = t.inputTarget, a = !e.isMoveableElement(i) && e.controlBox.contains(i);
		if (!(!r || !i || t.isDrag || e.isMoveableElement(i) || a)) {
			var o = n.contains(i);
			Q(e, "onClick", Z(e, t, {
				isDouble: t.isDouble,
				inputTarget: i,
				isTarget: n === i,
				moveableTarget: e.props.target,
				containsTarget: o
			}));
		}
	},
	dragGroupEnd: function(e, t) {
		var n = t.inputEvent, r = t.inputTarget;
		if (!(!n || !r || t.isDrag || e.isMoveableElement(r) || t.datas.inputTarget === r)) {
			var i = e.props.targets, a = i.indexOf(r), o = a > -1, s = !1;
			a === -1 && (a = tt(i, function(e) {
				return e.contains(r);
			}), s = a > -1), Q(e, "onClickGroup", Z(e, t, {
				isDouble: t.isDouble,
				targets: i,
				inputTarget: r,
				targetIndex: a,
				isTarget: o,
				containsTarget: s,
				moveableTarget: i[a]
			}));
		}
	},
	dragControlEnd: function(e, t) {
		this.dragEnd(e, t);
	},
	dragGroupControlEnd: function(e, t) {
		this.dragEnd(e, t);
	}
});
function Ul(e) {
	var t = e.originalDatas.draggable;
	return t ||= (e.originalDatas.draggable = {}, e.originalDatas.draggable), q(q({}, e), { datas: t });
}
var Wl = Er("edgeDraggable", {
	css: [".edge.edgeDraggable.line {\ncursor: move;\n}"],
	render: function(e, t) {
		var n = e.props, r = n.edgeDraggable;
		return r ? ra(t, "edgeDraggable", r, e.getState().renderPoses, n.zoom) : [];
	},
	dragCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && yt(r, X("direction")) && yt(r, X("edge")) && yt(r, X("edgeDraggable"));
	},
	dragStart: function(e, t) {
		return go.dragStart(e, Ul(t));
	},
	drag: function(e, t) {
		return go.drag(e, Ul(t));
	},
	dragEnd: function(e, t) {
		return go.dragEnd(e, Ul(t));
	},
	dragGroupCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && yt(r, X("direction")) && yt(r, X("line"));
	},
	dragGroupStart: function(e, t) {
		return go.dragGroupStart(e, Ul(t));
	},
	dragGroup: function(e, t) {
		return go.dragGroup(e, Ul(t));
	},
	dragGroupEnd: function(e, t) {
		return go.dragGroupEnd(e, Ul(t));
	},
	unset: function(e) {
		return go.unset(e);
	}
}), Gl = {
	name: "individualGroupable",
	props: ["individualGroupable", "individualGroupableProps"],
	events: []
}, Kl = [
	Ol,
	Yc,
	cs,
	Mc,
	go,
	Wl,
	xo,
	Pc,
	Rc,
	Oo,
	Jc,
	Xc,
	Kc,
	yl,
	vl,
	El,
	Vl,
	Gl,
	Hl,
	Gc,
	kl
];
function ql(e, t) {
	var n = J(e, 3), r = n[0], i = n[1], a = n[2];
	return (r * t[0] + i * t[1] + a) / Math.sqrt(r * r + i * i);
}
function Jl(e, t) {
	var n = J(e, 2), r = n[0], i = n[1];
	return -r * t[0] - i * t[1];
}
function Yl(e, t) {
	return Math.max.apply(Math, Y([], J(e.map(function(e) {
		var n = J(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.max(r[t], i[t], a[t], o[t]);
	})), !1));
}
function Xl(e, t) {
	return Math.min.apply(Math, Y([], J(e.map(function(e) {
		var n = J(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.min(r[t], i[t], a[t], o[t]);
	})), !1));
}
function Zl(e, t) {
	var n, r, i, a = [0, 0], o = [0, 0], s = [0, 0], c = [0, 0], l = 0, u = 0;
	if (!e.length) return {
		pos1: a,
		pos2: o,
		pos3: s,
		pos4: c,
		minX: 0,
		minY: 0,
		maxX: 0,
		maxY: 0,
		width: l,
		height: u,
		rotation: t
	};
	var d = G(t, Kr);
	if (d % 90) {
		var f = d / 180 * Math.PI, p = Math.tan(f), m = -1 / p, h = [Jr, Yr], g = [[0, 0], [0, 0]], _ = [Jr, Yr], v = [[0, 0], [0, 0]];
		e.forEach(function(e) {
			e.forEach(function(e) {
				var t = ql([
					-p,
					1,
					0
				], e), n = ql([
					-m,
					1,
					0
				], e);
				h[0] > t && (g[0] = e, h[0] = t), h[1] < t && (g[1] = e, h[1] = t), _[0] > n && (v[0] = e, _[0] = n), _[1] < n && (v[1] = e, _[1] = n);
			});
		});
		var y = J(g, 2), b = y[0], x = y[1], S = J(v, 2), C = S[0], w = S[1], T = [
			-p,
			1,
			Jl([-p, 1], b)
		], E = [
			-p,
			1,
			Jl([-p, 1], x)
		], D = [
			-m,
			1,
			Jl([-m, 1], C)
		], O = [
			-m,
			1,
			Jl([-m, 1], w)
		];
		n = J([
			[T, D],
			[T, O],
			[E, D],
			[E, O]
		].map(function(e) {
			var t = J(e, 2), n = t[0], r = t[1];
			return Un(n, r)[0];
		}), 4), a = n[0], o = n[1], s = n[2], c = n[3], l = _[1] - _[0], u = h[1] - h[0];
	} else {
		var k = Xl(e, 0), A = Xl(e, 1), j = Yl(e, 0), M = Yl(e, 1);
		if (a = [k, A], o = [j, A], s = [k, M], c = [j, M], l = j - k, u = M - A, d % 180) {
			var N = [
				s,
				a,
				c,
				o
			];
			r = J(N, 4), a = r[0], o = r[1], s = r[2], c = r[3], l = M - A, u = j - k;
		}
	}
	if (d % 360 > 180) {
		var N = [
			c,
			s,
			o,
			a
		];
		i = J(N, 4), a = i[0], o = i[1], s = i[2], c = i[3];
	}
	var P = Bn([
		a,
		o,
		s,
		c
	]), F = P.minX, I = P.minY, L = P.maxX, R = P.maxY;
	return {
		pos1: a,
		pos2: o,
		pos3: s,
		pos4: c,
		width: l,
		height: u,
		minX: F,
		minY: I,
		maxX: L,
		maxY: R,
		rotation: t
	};
}
function Ql(e, t) {
	var n = t.map(function(t) {
		if (Be(t)) {
			var n = Ql(e, t), r = n.length;
			return r > 1 ? n : r === 1 ? n[0] : null;
		}
		var i = nt(e, function(e) {
			return e.manager.props.target === t;
		});
		return i ? (i.finded = !0, i.manager) : null;
	}).filter(Boolean);
	return n.length === 1 && Be(n[0]) ? n[0] : n;
}
var $l = /* @__PURE__ */ function(e) {
	Sr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.differ = new Sn(), t.moveables = [], t.transformOrigin = "50% 50%", t.renderGroupRects = [], t._targetGroups = [], t._hasFirstTargets = !1, t;
	}
	return t.prototype.componentDidMount = function() {
		e.prototype.componentDidMount.call(this);
	}, t.prototype.checkUpdate = function() {
		this._isPropTargetChanged = !1, this.updateAbles();
	}, t.prototype.getTargets = function() {
		return this.props.targets;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.state;
		if (!this.controlBox || r.isPersisted) return;
		Ki(!0), this.moveables.forEach(function(t) {
			t.updateRect(e, !1, !1);
		});
		var i = this.props, a = this.moveables, o = r.target || i.target, s = a.map(function(e) {
			return {
				finded: !1,
				manager: e
			};
		}), c = this.props.targetGroups || [], l = Ql(s, c), u = i.useDefaultGroupRotate;
		l.push.apply(l, Y([], J(s.filter(function(e) {
			return !e.finded;
		}).map(function(e) {
			return e.manager;
		})), !1));
		var d = [], f = !t || e !== "" && i.updateGroup, p = i.defaultGroupRotate || 0;
		if (!this._hasFirstTargets) {
			var m = i.persistData?.rotation;
			m != null && (p = m);
		}
		function h(e, t, n) {
			var r = e.map(function(e) {
				if (Be(e)) {
					var n = h(e, t), r = [
						n.pos1,
						n.pos2,
						n.pos3,
						n.pos4
					];
					return d.push(n), {
						poses: r,
						rotation: n.rotation
					};
				}
				return {
					poses: Js(e.state),
					rotation: e.getRotation()
				};
			}), i = r.map(function(e) {
				return e.rotation;
			}), a = 0, o = i[0], s = i.every(function(e) {
				return Math.abs(o - e) < .1;
			});
			return a = f ? !u && s ? o : p : !u && !n && s ? o : t, Zl(r.map(function(e) {
				return e.poses;
			}), a);
		}
		var g = h(l, this.rotation, !0);
		f && (this.rotation = g.rotation, this.transformOrigin = i.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = c, this.renderGroupRects = d;
		var _ = this.transformOrigin, v = this.rotation, y = this.scale, b = g.width, x = g.height, S = g.minX, C = g.minY, w = Bn(Ec([
			[0, 0],
			[b, 0],
			[0, x],
			[b, x]
		], Tc(_, b, x), this.rotation / 180 * Math.PI).result), T = w.minX, E = w.minY, D = ` rotate(${v}deg) scale(${kc(y[0])}, ${kc(y[1])})`, O = `translate(${-T}px, ${-E}px)${D}`;
		this.controlBox.style.transform = `translate3d(${S}px, ${C}px, ${this.props.translateZ || 0})`, o.style.cssText += `left:0px;top:0px;transform-origin:${_};width:${b}px;height:${x}px;transform: ${O}`, r.width = b, r.height = x;
		var k = this.getContainer(), A = Rl(this.controlBox, o, this.controlBox, this.getContainer(), this._rootContainer || k, []), j = [A.left, A.top], M = J(Js(A), 4), N = M[0], P = M[1], F = M[2], I = M[3], L = Bn([
			N,
			P,
			F,
			I
		]), R = [L.minX, L.minY], z = kc(y[0] * y[1]);
		A.pos1 = K(N, R), A.pos2 = K(P, R), A.pos3 = K(F, R), A.pos4 = K(I, R), A.left = S - A.left + R[0], A.top = C - A.top + R[1], A.origin = K(Ht(j, A.origin), R), A.beforeOrigin = K(Ht(j, A.beforeOrigin), R), A.originalBeforeOrigin = Ht(j, A.originalBeforeOrigin), A.transformOrigin = K(Ht(j, A.transformOrigin), R), o.style.transform = `translate(${-T - R[0]}px, ${-E - R[1]}px)` + D, Ki(), this.updateState(q(q({}, A), {
			posDelta: R,
			direction: z,
			beforeDirection: z
		}), n);
	}, t.prototype.getRect = function() {
		return q(q({}, e.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
			return e.getRect();
		}) });
	}, t.prototype.triggerEvent = function(t, n, r) {
		if (r || t.indexOf("Group") > -1) return e.prototype.triggerEvent.call(this, t, n);
		this._emitter.trigger(t, n);
	}, t.prototype.getRequestChildStyles = function() {
		return this.getEnabledAbles().reduce(function(e, t) {
			var n = t.requestChildStyle?.call(t) ?? [];
			return Y(Y([], J(e), !1), J(n), !1);
		}, []);
	}, t.prototype.getMoveables = function() {
		return Y([], J(this.moveables), !1);
	}, t.prototype.updateAbles = function() {
		e.prototype.updateAbles.call(this, Y(Y([], J(this.props.ables), !1), [Vl], !1), "Group");
	}, t.prototype._updateTargets = function() {
		e.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = vc(this._originalDragTarget, !0);
	}, t.prototype._updateEvents = function() {
		var e = this.state, t = this.props, n = this._prevDragTarget, r = t.dragTarget || this.areaElement, i = t.targets, a = this.differ.update(i), o = a.added, s = a.changed, c = a.removed, l = o.length || c.length;
		(l || this._prevOriginalDragTarget !== this._originalDragTarget) && (Xs(this, !1), Xs(this, !0), this.updateState({ gestos: {} })), n !== r && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto ||= Ml(this, this._dragTarget, "Group"), this.controlGesto ||= Nl(this, "GroupControl"));
		var u = !rc(e.container, t.container);
		u && (e.container = t.container), (u || l || this.transformOrigin !== (t.defaultGroupOrigin || "50% 50%") || s.length || i.length && !Dc(this._targetGroups, t.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!l;
	}, t.prototype._updateObserver = function() {}, t.defaultProps = q(q({}, Bl.defaultProps), {
		transformOrigin: ["50%", "50%"],
		groupable: !0,
		dragArea: !0,
		keepRatio: !0,
		targets: [],
		defaultGroupRotate: 0,
		defaultGroupOrigin: "50% 50%"
	}), t;
}(Bl), eu = /* @__PURE__ */ function(e) {
	Sr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.moveables = [], t;
	}
	return t.prototype.render = function() {
		var e = this, t = this.props, n = t.cspNonce, r = t.cssStyled, i = t.persistData, a = t.targets || [], o = a.length, s = this.isUnmounted || !o, c = i?.children ?? [];
		return s && !o && c.length ? a = c.map(function() {
			return null;
		}) : s || (c = []), R.createElement(r, {
			cspNonce: n,
			ref: we(this, "controlBox"),
			className: X("control-box")
		}, a.map(function(n, r) {
			var i = t.individualGroupableProps?.call(t, n, r) ?? {};
			return R.createElement(Bl, q({
				key: "moveable" + r,
				ref: Te(e, "moveables", r)
			}, t, i, {
				target: n,
				wrapperMoveable: e,
				isWrapperMounted: e.isMoveableMounted,
				persistData: c[r]
			}));
		}));
	}, t.prototype.componentDidMount = function() {}, t.prototype.componentDidUpdate = function() {}, t.prototype.getTargets = function() {
		return this.props.targets;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0), Ki(!0), this.moveables.forEach(function(r) {
			r.updateRect(e, t, n);
		}), Ki();
	}, t.prototype.getRect = function() {
		return q(q({}, e.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
			return e.getRect();
		}) });
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this.moveables.map(function(n) {
			return n.request(e, q(q({}, t), { isInstant: !1 }), !1);
		}), i = n || t.isInstant, a = {
			request: function(e) {
				return r.forEach(function(t) {
					return t.request(e);
				}), this;
			},
			requestEnd: function() {
				return r.forEach(function(e) {
					return e.requestEnd();
				}), this;
			}
		};
		return i ? a.request(t).requestEnd() : a;
	}, t.prototype.dragStart = function(e, t) {
		t === void 0 && (t = e.target);
		var n = t, r = nt(this.moveables, function(e) {
			var t = e.getTargets()[0], r = e.getControlBoxElement(), i = e.getDragElement();
			return !t || !i ? !1 : i === n || i.contains(n) || i !== t && t === n || t.contains(n) || r === n || r.contains(n);
		});
		return r && r.dragStart(e, t), this;
	}, t.prototype.hitTest = function() {
		return 0;
	}, t.prototype.isInside = function() {
		return !1;
	}, t.prototype.isDragging = function() {
		return !1;
	}, t.prototype.getDragElement = function() {
		return null;
	}, t.prototype.getMoveables = function() {
		return Y([], J(this.moveables), !1);
	}, t.prototype.updateRenderPoses = function() {}, t.prototype.checkUpdate = function() {}, t.prototype.triggerEvent = function() {}, t.prototype.updateAbles = function() {}, t.prototype._updateEvents = function() {}, t.prototype._updateObserver = function() {}, t;
}(Bl);
function tu(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (Ve(e)) {
				t[e] && n.push.apply(n, Y([], J(t[e]), !1));
				return;
			}
			Be(e) ? n.push.apply(n, Y([], J(tu(e, t)), !1)) : n.push(e);
		}
	}), n;
}
function nu(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (Ve(e)) {
				t[e] && n.push.apply(n, Y([], J(t[e]), !1));
				return;
			}
			Be(e) ? n.push(nu(e, t)) : n.push(e);
		}
	}), n;
}
function ru(e, t) {
	return e.length !== t.length || e.some(function(e, n) {
		var r = t[n];
		return !e && !r || e == r ? !1 : Be(e) && Be(r) ? ru(e, r) : !0;
	});
}
var iu = /* @__PURE__ */ function(e) {
	Sr(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.defaultAbles = Kl, t;
}(/* @__PURE__ */ function(e) {
	Sr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.refTargets = [], t.selectorMap = {}, t._differ = new Sn(), t._elementTargets = [], t._tmpRefTargets = [], t._tmpSelectorMap = {}, t._onChangeTargets = null, t;
	}
	return t.makeStyled = function() {
		var e = {};
		this.getTotalAbles().forEach(function(t) {
			var n = t.css;
			n && n.forEach(function(t) {
				e[t] = !0;
			});
		});
		var t = at(e).join("\n");
		this.defaultStyled = br("div", Ce(Hr, Ur + t));
	}, t.getTotalAbles = function() {
		return Y([
			Yc,
			Vl,
			Gl,
			Gc
		], J(this.defaultAbles), !1);
	}, t.prototype.render = function() {
		var e = this.constructor;
		e.defaultStyled || e.makeStyled();
		var t = this.props, n = t.ables, r = t.props, i = Cr(t, ["ables", "props"]), a = J(this._updateRefs(!0), 2), o = a[0], s = a[1], c = tu(o, s), l = c.length > 1, u = Y(Y([], J(e.getTotalAbles()), !1), J(n || []), !1), d = q(q(q({}, i), r || {}), {
			ables: u,
			cssStyled: e.defaultStyled,
			customStyledMap: e.customStyledMap
		});
		this._elementTargets = c;
		var f = null, p = this.moveable;
		if (i.persistData?.children && (l = !0), i.individualGroupable) return R.createElement(eu, q({
			key: "individual-group",
			ref: we(this, "moveable")
		}, d, {
			target: null,
			targets: c
		}));
		if (l) {
			var m = nu(o, s);
			if (p && !p.props.groupable && !p.props.individualGroupable) {
				var h = p.props.target;
				h && c.indexOf(h) > -1 && (f = q({}, p.state));
			}
			return R.createElement($l, q({
				key: "group",
				ref: we(this, "moveable")
			}, d, i.groupableProps ?? {}, {
				target: null,
				targets: c,
				targetGroups: m,
				firstRenderState: f
			}));
		}
		var g = c[0];
		if (p && (p.props.groupable || p.props.individualGroupable)) {
			var _ = nt(p.moveables || [], function(e) {
				return e.props.target === g;
			});
			_ && (f = q({}, _.state));
		}
		return R.createElement(Bl, q({
			key: "single",
			ref: we(this, "moveable")
		}, d, {
			target: g,
			firstRenderState: f
		}));
	}, t.prototype.componentDidMount = function() {
		this._checkChangeTargets();
	}, t.prototype.componentDidUpdate = function() {
		this._checkChangeTargets();
	}, t.prototype.componentWillUnmount = function() {
		this.selectorMap = {}, this.refTargets = [];
	}, t.prototype.getTargets = function() {
		return this.moveable?.getTargets() ?? [];
	}, t.prototype.updateSelectors = function() {
		this.selectorMap = {}, this._updateRefs(), this.forceUpdate();
	}, t.prototype.waitToChangeTarget = function() {
		var e = this, t;
		return this._onChangeTargets = function() {
			e._onChangeTargets = null, t();
		}, new Promise(function(e) {
			t = e;
		});
	}, t.prototype.waitToChangeTargets = function() {
		return this.waitToChangeTarget();
	}, t.prototype.getManager = function() {
		return this.moveable;
	}, t.prototype.getMoveables = function() {
		return this.moveable.getMoveables();
	}, t.prototype.getDragElement = function() {
		return this.moveable.getDragElement();
	}, t.prototype._updateRefs = function(e) {
		var t = this.refTargets, n = yc(this.props.target || this.props.targets), r = typeof document < "u", i = ru(t, n), a = this.selectorMap, o = {};
		return this.refTargets.forEach(function e(t) {
			Ve(t) ? a[t] ? o[t] = a[t] : r && (i = !0, o[t] = [].slice.call(document.querySelectorAll(t))) : Be(t) && t.forEach(e);
		}), this._tmpRefTargets = n, this._tmpSelectorMap = o, [
			n,
			o,
			!e && i
		];
	}, t.prototype._checkChangeTargets = function() {
		var e, t, n;
		this.refTargets = this._tmpRefTargets, this.selectorMap = this._tmpSelectorMap;
		var r = this._differ.update(this._elementTargets), i = r.added, a = r.removed;
		(i.length || a.length) && ((t = (e = this.props).onChangeTargets) == null || t.call(e, {
			moveable: this.moveable,
			targets: this._elementTargets
		}), (n = this._onChangeTargets) == null || n.call(this));
		var o = J(this._updateRefs(), 3), s = o[0], c = o[1], l = o[2];
		this.refTargets = s, this.selectorMap = c, l && this.forceUpdate();
	}, t.defaultAbles = [], t.customStyledMap = {}, t.defaultStyled = null, wr([Ee($r)], t.prototype, "moveable", void 0), t;
}(R.PureComponent));
//#endregion
//#region src/components/GrpLayer.tsx
function au({ cmn: { styChild: e, isDesignMode: t }, sty: n, nm: r, fn: i, src: a, aFace: o, getVideoVol: c, needClick2Play: l }) {
	let u = (e) => {
		e.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
	}, d = i.endsWith(".json"), [f, p] = (0, R.useState)(void 0);
	(0, R.useEffect)(() => {
		if (!d || !a) {
			p(void 0);
			return;
		}
		let e = !0;
		return F(a).then((t) => {
			e && p(t);
		}), () => {
			e = !1;
		};
	}, [a, d]);
	let m = /\.(?:mp4|webm)$/i.test(i), h = (e) => {
		e && (e.volume = c(), e.muted = l());
	}, g = (0, R.useRef)(null), _ = (e, t) => {
		s(), e.transform = t;
	};
	return /* @__PURE__ */ C(E, { children: [/* @__PURE__ */ C("div", {
		css: e,
		ref: g,
		"data-lay": r,
		style: n,
		onMouseDown: (e) => u(e),
		children: [
			f && /* @__PURE__ */ A("div", { className: P(f) }),
			a && m && /* @__PURE__ */ A("video", {
				ref: h,
				src: a,
				autoPlay: !0,
				playsInline: !0,
				"data-fn": i,
				style: { display: "block" }
			}),
			a && !d && !m && /* @__PURE__ */ A("img", {
				src: a,
				style: { display: "block" }
			}),
			o.map(({ fn: e, src: t, dx: n, dy: r, blendmode: i }, a) => t ? /* @__PURE__ */ A("img", {
				src: t,
				style: {
					position: "absolute",
					left: n,
					top: r,
					mixBlendMode: i
				}
			}, `${e}_${String(a)}`) : null)
		]
	}), t && /* @__PURE__ */ A(iu, {
		target: g,
		draggable: !0,
		throttleDrag: 1,
		onDrag: ({ target: { style: e }, transform: t }) => _(e, t),
		resizable: !0,
		keepRatio: !0,
		onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
			_(e, r), e.width = `${t}px`, e.height = `${n}px`;
		},
		rotatable: !0,
		throttleRotate: 0,
		startDragRotate: 0,
		throttleDragRotate: 0,
		rotationPosition: "top",
		onRotate: ({ target: { style: e }, drag: { transform: t } }) => _(e, t),
		originDraggable: !0,
		onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
			_(e, n), e.transformOrigin = t;
		}
	})] });
}
//#endregion
//#region src/ts/Hint.ts
var ou = [
	"top",
	"bottom",
	"left",
	"right"
];
function su(e) {
	if (!e) return "top";
	try {
		let { placement: t } = JSON.parse(e), n = (t ?? "").split("-")[0] ?? "";
		return ou.includes(n) ? n : "top";
	} catch {
		return "top";
	}
}
function cu(e, t, n, r = 8) {
	switch (n) {
		case "bottom": return {
			left: e.left + (e.width - t.width) / 2,
			top: e.top + e.height + r
		};
		case "left": return {
			left: e.left - t.width - r,
			top: e.top + (e.height - t.height) / 2
		};
		case "right": return {
			left: e.left + e.width + r,
			top: e.top + (e.height - t.height) / 2
		};
		default: return {
			left: e.left + (e.width - t.width) / 2,
			top: e.top - t.height - r
		};
	}
}
var lu = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function uu(e, t, n, r, i) {
	let a = (n) => {
		switch (n) {
			case "top": return e.top - t.height - r >= 0;
			case "bottom": return e.top + e.height + r + t.height <= i.height;
			case "left": return e.left - t.width - r >= 0;
			case "right": return e.left + e.width + r + t.width <= i.width;
		}
	};
	if (a(n)) return n;
	let o = lu[n];
	return a(o) ? o : n;
}
function du(e, t, n) {
	return {
		left: Math.min(Math.max(e.left, 0), Math.max(0, n.width - t.width)),
		top: Math.min(Math.max(e.top, 0), Math.max(0, n.height - t.height))
	};
}
var fu = "position: fixed; background-color: #3c3225; color: white; padding: 4px 8px; border-radius: 4px; font-size: 1.2em; z-index: 10000; pointer-events: none; user-select: none; white-space: pre;", pu = new class {
	#e;
	#t() {
		if (this.#e) return this.#e;
		let e = this.#e = document.createElement("div");
		return e.className = "sn_hint", e.setAttribute("role", "tooltip"), e.hidden = !0, document.body.appendChild(e), e;
	}
	show(e, t, n = "", r) {
		if (!t) return;
		let i = this.#t();
		i.textContent = t, i.style.cssText = fu + n, i.hidden = !1;
		let a = e.getBoundingClientRect(), o = i.getBoundingClientRect(), s = {
			width: window.innerWidth,
			height: window.innerHeight
		}, { left: c, top: l } = du(cu(a, o, uu(a, o, su(r), 8, s), 8), o, s);
		i.style.left = `${String(c)}px`, i.style.top = `${String(l)}px`;
	}
	hide() {
		this.#e && (this.#e.hidden = !0);
	}
}();
w();
var mu = function(e, t) {
	var n = arguments;
	if (t == null || !j.call(t, "css")) return R.createElement.apply(void 0, n);
	var r = n.length, i = Array(r);
	i[0] = y, i[1] = D(e, t);
	for (var a = 2; a < r; a++) i[a] = n[a];
	return R.createElement.apply(null, i);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(mu ||= {});
function hu() {
	return b([...arguments]);
}
//#endregion
//#region src/components/BtnLayer.tsx
function gu(e) {
	return {
		w: e?.width ?? 100,
		h: e?.height ?? 30
	};
}
function _u(e, t, n) {
	if (!e) return {
		w: 100,
		h: 30
	};
	let r = e.pic ? t : e.b_pic ? n : null;
	return e.pic || e.b_pic ? {
		w: e.width ?? r?.w ?? 0,
		h: e.height ?? r?.h ?? 0
	} : gu(e);
}
function vu(e, t, n, r) {
	let i = {};
	(e.left !== void 0 || e.top !== void 0 || e.s_right !== void 0 || e.s_bottom !== void 0) && (i.position = "absolute", i.margin = 0, e.s_right === void 0 ? i.left = `${String(e.left ?? 0)}px` : i.right = `${String(e.s_right)}px`, e.s_bottom === void 0 ? i.top = `${String(e.top ?? 0)}px` : i.bottom = `${String(e.s_bottom)}px`), (e.align_x !== void 0 || e.align_y !== void 0) && (i.translate = `${e.align_x === "center" ? "-50%" : e.align_x === "right" ? "-100%" : "0"} ${e.align_y === "middle" ? "-50%" : e.align_y === "bottom" ? "-100%" : "0"}`);
	{
		let { w: t, h: a } = _u(e, n, r);
		t > 0 && (i.width = `${String(t)}px`), a > 0 && (i.height = `${String(a)}px`), e.pic || (i.fontSize = `${String(a)}px`, i.lineHeight = 1, i.padding = 0), i.boxSizing = "border-box";
	}
	e.pic && e.src ? (i.backgroundImage = `url("${e.src}")`, i.backgroundSize = "300% 100%", i.backgroundRepeat = "no-repeat") : e.b_pic && e.b_src && (i.backgroundImage = `url("${e.b_src}")`, i.backgroundPosition = "center", i.backgroundRepeat = "no-repeat"), e.alpha !== void 0 && (i.opacity = e.alpha);
	let a = (e.scale_x ?? 1) * t.x, o = (e.scale_y ?? 1) * t.y, s = t.x !== 1 || t.y !== 1;
	return (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0 || s) && (i.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(a)}, ${String(o)})`, i.transformOrigin = s ? "center" : `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (i.mixBlendMode = e.blendmode), e.enabled === !1 && (i.color = "gray", i.pointerEvents = "none"), i;
}
function yu({ text: e, label: t, call: n, fn: r, sty: i, onActivate: a, onSe: o }) {
	let s = hu`
		position: relative;
		z-index: 2;

		display: inline-block;
		box-sizing: border-box;
		margin: 0.3em;
		padding: 5px;
		font-family: ${p((e) => e.btnFont)};
		font-size: x-large;
		/* 本家 Button.ts の TextStyle は fontWeight を指定しない＝normal。boldにすると線が太く重く見え、
			渡されたjpg（本家の実描画）より太く・縦長に見えていた。normalへ戻して本家に合わせる */
		font-weight: normal;
		text-align: center;
		/* pre：スペースをそのまま保持する（nowrapだと連続スペース圧縮＋端のスペース除去で、
			本家 ext_lang.sn の ' ロード ' / ' 設 定 ' のような余白入りラベルが詰められてしまう）。
			preも折り返さないのでフィット（1行維持）は変わらない */
		white-space: pre;
		color: black;
		text-shadow: 0 0 7px rgba(255, 255, 255, 0.7);
		cursor: pointer;
		user-select: none;
		transition: color 0.3s;
		/* [button style=…]。**bluesnovelはCSSで書ける**（本家はpixiのTextStyle JSON。
			波括弧で始まる値だけエンジンがCSSへ読み替える）。既定の後ろに置いて上書きさせる */
		${i?.style ?? ""}
		/* フォーカス時もホバーと同じ見た目にする（本家 EventMng.ts:435 は FocusMng へ
			hv()／nr() を渡し、フォーカスの出入りでホバー状態を切り替える）。
			既定のフォーカスリングは画面に合わないので消す。
			既定のホバーは本家 style_hover の fill:'white' 相当 */
		&:hover, &:focus {${i?.style_hover ?? "color: white;"}}
		&:focus {outline: none;}
		/* 押下中。本家の既定は style_hover ＋ dropShadow:false ＝影を消す */
		&:active {${i?.style_clicked ?? "text-shadow: none;"}}
		/* 画像ボタンのコマ送り。絵は「通常｜押下｜ホバー」を横に3コマ並べた1枚で
			（本家 Button.ts:269 が幅を3等分して張り替える）、背景を3倍幅に敷いてあるので
			background-position-x の 0%／50%／100% がちょうど各コマの左端に当たる。
			**上の状態別ルールより後ろに置く**（同じ強さなら後勝ち） */
		${i?.pic ? "\n			background-position-x: 0%;\n			&:hover, &:focus {background-position-x: 100%;}\n			&:active {background-position-x: 50%;}\n		" : ""}
	`, c = (e, t) => {
		if (i?.enabled === !1) return;
		let n = i?.[e];
		n && o(n, i?.[t] ?? "SYS");
	}, l = (e) => {
		e.stopPropagation(), pu.hide(), c("clickse", "clicksebuf"), a(t, n ?? !1, r);
	}, u = () => {
		i?.hint && pu.show(m.current, i.hint, i.hint_style, i.hint_opt);
	}, d = () => {
		u(), c("enterse", "entersebuf");
	}, f = () => {
		pu.hide(), c("leavese", "leavesebuf");
	}, m = (0, R.useRef)(null);
	(0, R.useEffect)(() => {
		let e = m.current;
		if (e) return I.add(e), () => I.remove(e);
	}, []);
	let [h, g] = (0, R.useState)({
		x: 1,
		y: 1
	}), _ = i?.pic ? i.src ?? "" : "", [v, y] = (0, R.useState)(null);
	(0, R.useEffect)(() => {
		if (!_) {
			y(null);
			return;
		}
		let e = !0, t = new Image();
		return t.onload = () => {
			e && y({
				w: t.naturalWidth / 3,
				h: t.naturalHeight
			});
		}, t.src = _, () => {
			e = !1;
		};
	}, [_]);
	let b = i?.b_pic ? i.b_src ?? "" : "", [x, S] = (0, R.useState)(null);
	return (0, R.useEffect)(() => {
		if (!b) {
			S(null);
			return;
		}
		let e = !0, t = new Image();
		return t.onload = () => {
			e && S({
				w: t.naturalWidth,
				h: t.naturalHeight
			});
		}, t.src = b, () => {
			e = !1;
		};
	}, [b]), (0, R.useLayoutEffect)(() => {
		let e = m.current;
		if (!e) {
			g({
				x: 1,
				y: 1
			});
			return;
		}
		if (i?.pic) {
			g({
				x: 1,
				y: 1
			});
			return;
		}
		let { w: t, h: n } = _u(i, v, x), r = e.style.width, a = e.style.transform, o = e.style.whiteSpace;
		e.style.width = "auto", e.style.transform = "none", e.style.whiteSpace = "pre";
		let s = e.offsetWidth, c = e.offsetHeight;
		e.style.width = r, e.style.transform = a, e.style.whiteSpace = o, g({
			x: s > 0 ? t / s : 1,
			y: c > 0 ? n / c : 1
		});
	}, [
		e,
		i?.width,
		i?.height,
		i?.pic,
		x
	]), /* @__PURE__ */ A("span", {
		css: s,
		style: i ? vu(i, h, v, x) : void 0,
		ref: m,
		tabIndex: 0,
		onClick: l,
		onKeyDown: (e) => {
			(e.key === "Enter" || e.key === " ") && (e.stopPropagation(), e.preventDefault(), c("clickse", "clicksebuf"), a(t, n ?? !1, r));
		},
		onMouseEnter: d,
		onMouseLeave: f,
		onFocus: u,
		onBlur: () => pu.hide(),
		children: e
	});
}
//#endregion
//#region src/components/TxtLayer.tsx
var bu = {
	opacity: 1,
	x: 0,
	y: 0,
	scaleX: 1,
	scaleY: 1,
	rotation: 0
};
function xu({ cmn: { styChild: e, isDesignMode: t }, sty: n, nm: r, isFore: i, str: a, aCh: o, ffs: c, noffs: l, bura: u, r_align: d, b_color: f, b_alpha: g, b_alpha_isfixed: _, b_src: v, styTxt: y, enabled: b, aBtn: x, in_style: S, onActivate: w, onNavigate: T, onSe: D }) {
	let O = p((e) => e.isReadBack), k = p((e) => e.styPaging), j = p((e) => e.isTyping), M = p((e) => e.setIsTyping), N = p((e) => e.skipReq), I = p((e) => e.skipping), z = p((e) => e.wait), B = p((e) => e.hChIn), ee = p((e) => e.chWait), V = p((e) => e.autowc), te = (0, R.useRef)(null), ne = (0, R.useRef)(null), re = (e) => {
		if (e.url) {
			T(e.url);
			return;
		}
		w(e.label, e.call, e.fn, e.arg);
	}, H = (0, R.useRef)([]), U = (0, R.useRef)([]), ie = (0, R.useRef)(null), W = (0, R.useCallback)((e) => c ? RegExp(`[　${l ?? ""}]`).test(e) ? "" : c : "", [c, l]);
	(0, R.useLayoutEffect)(() => {
		let e = ne.current;
		if (!e) return;
		ie.current?.kill();
		let t = U.current, n = Math.min(t.length, o.length), r = 0;
		for (; r < n && t[r].c === o[r].c && t[r].r === o[r].r && t[r].s === o[r].s && t[r].rs === o[r].rs;) ++r;
		r < n && (H.current = [], U.current = [], e.textContent = "");
		let i = H.current, a = Math.min(o.length, i.length);
		for (; e.childNodes.length > a;) e.removeChild(e.lastChild);
		for (; e.childNodes.length < a;) e.appendChild(i[e.childNodes.length]);
		if (a > 0 && L.set(i.slice(0, a), bu), o.length <= i.length) {
			M(!1);
			return;
		}
		let s = o.slice(i.length), c = document.createDocumentFragment(), l = s.map((e) => {
			let t = document.createElement("span");
			return t.appendChild(Cu(e, d, re, W, D)), c.appendChild(t), t;
		});
		if (U.current = [...U.current, ...s], i.push(...l), e.appendChild(c), O || I) {
			L.set(l, bu), M(!1);
			return;
		}
		let u = L.timeline({ onComplete: () => M(!1) }), f = 0, p = 0;
		if (l.forEach((e, t) => {
			let n = s[t], r = B[n.cis ?? S ?? "default"] ?? m, i = n.w ?? (V.enabled ? V.h[n.c.at(0) ?? ""] ?? 0 : ee);
			if (r.join && (f += i / 1e3), r.wait <= 0) {
				L.set(e, bu);
				return;
			}
			let { from: a, to: o } = h(r);
			u.fromTo(e, a, o, r.join ? f : 0), ++p;
		}), p === 0) {
			u.kill(), M(!1);
			return;
		}
		M(!0), ie.current = u;
	}, [
		o,
		O,
		W,
		S,
		B,
		ee,
		V
	]), (0, R.useEffect)(() => {
		ie.current && ie.current.progress() < 1 && ie.current.progress(1);
	}, [N]);
	let ae = z?.src ?? "", oe = ae.endsWith(".json"), [se, ce] = (0, R.useState)(void 0);
	(0, R.useEffect)(() => {
		if (!oe) {
			ce(void 0);
			return;
		}
		let e = !0;
		return F(ae).then((t) => {
			e && ce(t);
		}), () => {
			e = !1;
		};
	}, [ae, oe]);
	let le = i && !O && !j && z !== null && z.nm === r, [ue, de] = (0, R.useState)(!1);
	(0, R.useLayoutEffect)(() => {
		let e = te.current;
		de(!!e && globalThis.getComputedStyle(e).writingMode.startsWith("vertical"));
	}, [y, n]);
	let fe = hu`
		display: inline-block;
		/* **論理プロパティで書く**。縦書き（writing-mode: vertical-rl）では margin-left が
			「次の行の方向」＝横へのずらしになってしまい、マークだけ本文から離れて隣の列へ寄る。
			margin-inline-start なら横書きでは左、縦書きでは上——どちらでも「直前の文字の次」になる */
		margin-inline-start: 0.15em;
		/* **縦書きでは書字方向に合わせてマークも回す**（-90°）。背景画像も<img>も
			writing-modeでは回らないので、横書き用に描かれた▼（次の行の方向を指す絵）が
			縦書きでもそのまま下を向いてしまう。本家は待ちマークを本文とは別のpixiコンテナへ
			固定位置で置くのでこの問題が出ないが、こちらは本文の流れの中（ぶら下げ位置）に
			置いているため、向きが本文と食い違うと目立つ */
		${ue ? "rotate: -90deg;" : ""}
	`, pe = {
		...z?.width === void 0 ? {} : { width: `${String(z.width)}px` },
		...z?.height === void 0 ? {} : { height: `${String(z.height)}px` },
		...z?.x !== void 0 || z?.y !== void 0 ? { translate: `${String(z?.x ?? 0)}px ${String(z?.y ?? 0)}px` } : {}
	}, me = hu`
		display: flex;
		flex-wrap: wrap;
		top: 70%;
		${b ? "" : "pointer-events: none;"}
	`, { display: he, opacity: ge, mixBlendMode: _e, filter: ve } = n, ye = {
		...he === void 0 ? {} : { display: he },
		...ge === void 0 ? {} : { opacity: ge },
		..._e === void 0 ? {} : { mixBlendMode: _e },
		...ve === void 0 ? {} : { filter: ve }
	}, be = (e) => e.sty?.left !== void 0 || e.sty?.top !== void 0, xe = x.filter((e) => !be(e)), Se = x.filter(be), Ce = hu`
		${b ? "" : "pointer-events: none;"}
	`, { r: we, g: Te, b: Ee } = Eu(f), De = p((e) => e.backAlpha), Oe = g * (_ ? 1 : De), ke = Oe === 0 || a.length === 0 && f === void 0 && !v, Ae = hu`
		padding: 1em 1.5em;
		margin: 2em 0;
		/* 背景色に[lay b_alpha=...]をアルファチャンネルで反映。
			要素全体のopacityではなく背景色のアルファのみを下げるので、子要素（文字）の透過度には影響しない
			（レイヤ全体を透かしたい場合は[lay alpha=...]） */
		/* [lay b_pic=…]があればそれを背景画像にし、**b_colorは無視する**（本家と同じ規約）。
			枠画像は左上を原点にそのままの大きさで置く（本家もレイヤ左上に等倍で置き、
			文字表示領域のサイズを画像に合わせる）。b_alphaは画像・単色どちらにも効かせたいので、
			画像のときは要素のopacityではなく擬似要素で敷いて透過させる */
		background-color: ${ke || v ? "transparent" : `rgba(${we}, ${Te}, ${Ee}, ${Oe})`};
		border: ${ke || v ? "none" : "dotted 6px #ffa500"};
		${v ? `
		&::before {
			content: '';
			position: absolute;
			left: 0; top: 0; right: 0; bottom: 0;
			background-image: url(${JSON.stringify(v)});
			background-repeat: no-repeat;
			background-position: left top;
			opacity: ${Oe};
			pointer-events: none;
			z-index: -1;
		}` : ""}

		/* [lay bura=true]：ぶら下げ禁則。**行分割そのものはブラウザ任せ**にしたので、
			本家Hyphenationのような自前計算ではなくCSSで頼む。
			hanging-punctuationは対応ブラウザ（Safari）でのみ効く */
		${u ? "hanging-punctuation: allow-end; line-break: strict;" : ""}

		font-size: xxx-large;
		top: 48%;
		width: 70%;
		white-space: pre-wrap;
		color: inherit;
		/* [enable_event enabled=false]：**本文中の[link]もクリックを受けなくする**
			（本家は文字レイヤのコンテナごと ctn.interactiveChildren=false にするので、
			ボタンもリンクもまとめて効かなくなる。TxtLayer.ts:838）。
			クリックはステージへ抜けるので、読み進め自体は止まらない */
		${b ? "" : "pointer-events: none;"}

		/* [lay style="..."]。上の既定を後から上書きできるよう最後に置く */
		${y ?? ""}

		/* 読み戻り中の見た目（[page style=…]。既定は本家 INI_STYPAGE と同じ黄色＋黒フチ）。
			**[lay style=…]よりさらに後**に置く：本家は読み戻り中だけ全文字レイヤへこのCSSを
			当て直す（setAllStyle2TxtLay）ので、レイヤ自身が色を書いていても勝つ必要がある */
		${O ? k : ""}
	`, je = hu`
		position: absolute;
		z-index: 1;
		display: inline-block;
		left: 20%;
		top: 20%;

		margin-bottom: 20px;
		padding: 8px;
		border: 2px solid #000000;
		border-radius: 28px;
		background-color: #e2feff;
		text-align: left;
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		color: #000000;

		&:before {
			content: "";
			position: absolute;
			bottom: 0;
			left: 25%;
			border-style: solid;
			border-width: 20px 20px 0 0;
			border-color: #000000 transparent transparent;
			translate: -50% 100%;
			transform: skew(-25deg);
			transform-origin: top;
		}
		&:after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 25%;
			border-style: solid;
			border-width: 15.2px 15.2px 0 0;
			border-color: #e2feff transparent transparent;
			translate: calc(-50% - 0.4px) 100%;
			transform: skew(-25deg);
			transform-origin: top;
		}

		textarea {
			display: block;
			border-radius: 20px;
			border: 2px solid gray;
			outline: none;
			padding: 0 0.3em;
			/* [lay bura=true]：ぶら下げ禁則。**行分割そのものはブラウザ任せ**にしたので、
			本家Hyphenationのような自前計算ではなくCSSで頼む。
			hanging-punctuationは対応ブラウザ（Safari）でのみ効く */
		${u ? "hanging-punctuation: allow-end; line-break: strict;" : ""}

		font-size: xxx-large;
			line-height: 1.2;
			&:focus {
				border-color: #ff9900;
			}
		}
	`, [Me, Ne] = (0, R.useState)("");
	(0, R.useEffect)(() => Ne(a), [a]);
	let Pe = (0, R.useRef)(null), Fe = (e, t) => {
		s(), e.transform = t;
	};
	return /* @__PURE__ */ C(E, { children: [
		/* @__PURE__ */ C("span", {
			css: [e, Ae],
			ref: te,
			"data-lay": r,
			style: n,
			children: [/* @__PURE__ */ A("span", { ref: ne }), le && /* @__PURE__ */ A("span", {
				css: fe,
				style: pe,
				children: se ? /* @__PURE__ */ A("span", { className: P(se) }) : ae && !oe ? /* @__PURE__ */ A("img", {
					src: ae,
					style: {
						verticalAlign: "text-bottom",
						...z.width !== void 0 || z.height !== void 0 ? {
							width: "100%",
							height: "100%"
						} : {}
					}
				}) : z.kind === "l" ? "🩷" : "✅"
			})]
		}),
		xe.length > 0 && /* @__PURE__ */ A("span", {
			css: [e, me],
			"data-lay": r,
			style: ye,
			children: xe.map((e) => /* @__PURE__ */ A(yu, {
				text: e.text,
				label: e.label,
				call: e.call ?? !1,
				fn: e.fn ?? "",
				sty: e.sty,
				onActivate: w,
				onSe: D
			}, e.nm))
		}),
		Se.length > 0 && /* @__PURE__ */ A("span", {
			css: [e, Ce],
			"data-lay": r,
			style: ye,
			children: Se.map((e) => /* @__PURE__ */ A(yu, {
				text: e.text,
				label: e.label,
				call: e.call ?? !1,
				fn: e.fn ?? "",
				sty: e.sty,
				onActivate: w,
				onSe: D
			}, e.nm))
		}),
		t && /* @__PURE__ */ A(iu, {
			target: te,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => Fe(e, t),
			resizable: !0,
			keepRatio: !1,
			onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
				Fe(e, r), e.width = `${t}px`, e.height = `${n}px`;
			},
			rotatable: !0,
			throttleRotate: 0,
			startDragRotate: 0,
			throttleDragRotate: 0,
			rotationPosition: "top",
			onRotate: ({ target: { style: e }, drag: { transform: t } }) => Fe(e, t),
			originDraggable: !0,
			onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
				Fe(e, n), e.transformOrigin = t;
			}
		}),
		t && /* @__PURE__ */ C(E, { children: [/* @__PURE__ */ C("label", {
			css: je,
			ref: Pe,
			children: ["テキスト入力", /* @__PURE__ */ A("textarea", {
				rows: 3,
				value: Me,
				onChange: (e) => Ne(e.target.value)
			})]
		}), /* @__PURE__ */ A(iu, {
			target: Pe,
			origin: !1,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => Fe(e, t),
			preventDefault: !1
		})] })
	] });
}
function Su(e, t, n) {
	let r = e.length * 2;
	if (r - t.length < 0) return `text-align: ${n};`;
	if (a.isFirefox) switch (n) {
		case "left": return "ruby-align: start;";
		case "center": return "ruby-align: center;";
		case "right": return "ruby-align: start;";
		case "justify": return "ruby-align: space-between;";
		case "121": return "ruby-align: space-around;";
		case "even": return `ruby-align: space-between; padding-inline: ${String((r - t.length) / (t.length + 1))}em;`;
		case "1ruby": return "ruby-align: space-between; padding-inline: 1em;";
		default: return `text-align: ${n};`;
	}
	let i = (e) => a.isSafari ? `text-align: start; inline-size: ${String(r)}em; padding-inline: ${e};` : `text-align: justify; text-align-last: justify; padding-inline: ${e};`;
	switch (n) {
		case "justify": return i("0");
		case "121": return i(`calc(${String((r - t.length) / (t.length * 2))}em)`);
		case "even": return i(`calc(${String((r - t.length) / (t.length + 1))}em)`);
		case "1ruby": return i("1em");
		default: return `text-align: ${n};`;
	}
}
function Cu({ c: e, r: t, ra: n, s: r, rs: i, tcy: a, lnk: o, src: s, gw: c, gh: l, gx: u, gy: d }, f, p, m, h) {
	let g = (e) => document.createTextNode(e === " " ? "\xA0" : e), _ = m(e);
	if (t === void 0 && !r && !a && !o && !_ && !s) return g(e);
	let v = document.createElement(t === void 0 ? "span" : "ruby");
	r && (v.style.cssText = r), _ && (v.style.fontFeatureSettings = _);
	let y = a ? document.createElement("span") : v;
	a && (y.style.textCombineUpright = "all", v.appendChild(y)), y.appendChild(g(e)), s && (wu(y, s, {
		...c === void 0 ? {} : { gw: c },
		...l === void 0 ? {} : { gh: l },
		...u === void 0 ? {} : { gx: u },
		...d === void 0 ? {} : { gy: d }
	}), y !== v && v.appendChild(y));
	let b;
	if (t !== void 0) {
		b = document.createElement("rt");
		let r = n ?? f;
		b.style.cssText = (r ? Su(e, t, r) : "") + (i ?? ""), b.textContent = t, v.appendChild(b);
	}
	return o && Tu(v, o, r ?? "", b, i ?? "", p, h), v;
}
function wu(e, t, n) {
	if ((n.gw !== void 0 || n.gh !== void 0) && (e.style.display = "inline-block", e.style.verticalAlign = "text-bottom", n.gw !== void 0 && (e.style.width = `${String(n.gw)}px`), n.gh !== void 0 && (e.style.height = `${String(n.gh)}px`)), (n.gx !== void 0 || n.gy !== void 0) && (e.style.translate = `${String(n.gx ?? 0)}px ${String(n.gy ?? 0)}px`), !t.endsWith(".json")) {
		e.style.backgroundImage = `url(${JSON.stringify(t)})`, e.style.backgroundRepeat = "no-repeat", e.style.backgroundSize = "contain";
		return;
	}
	F(t).then((t) => {
		t && e.classList.add(P(t));
	});
}
function Tu(e, t, n, r, i, a, o) {
	if (e.style.cursor = "pointer", e.addEventListener("click", (e) => {
		e.stopPropagation(), pu.hide(), t.clickse && o(t.clickse, t.clicksebuf ?? "SYS"), a(t);
	}), e.addEventListener("mouseenter", () => {
		t.sh && (e.style.cssText = n + t.sh), r && t.rsh && (r.style.cssText = i + t.rsh), t.hint && pu.show(e, t.hint, t.hs, t.ho), t.enterse && o(t.enterse, t.entersebuf ?? "SYS");
	}), e.addEventListener("mouseleave", () => {
		t.sh && (e.style.cssText = n, e.style.cursor = "pointer"), r && t.rsh && (r.style.cssText = i), pu.hide(), t.leavese && o(t.leavese, t.leavesebuf ?? "SYS");
	}), t.sc || t.rsc) {
		let a = () => {
			t.sc && (e.style.cssText = t.sh ? n + t.sh : n, e.style.cursor = "pointer"), r && t.rsc && (r.style.cssText = t.rsh ? i + t.rsh : i);
		};
		e.addEventListener("mousedown", () => {
			t.sc && (e.style.cssText = n + t.sc), r && t.rsc && (r.style.cssText = i + t.rsc);
		}), e.addEventListener("mouseup", a), e.addEventListener("mouseleave", a);
	}
}
function Eu(e) {
	return e === void 0 ? {
		r: 127,
		g: 255,
		b: 212
	} : {
		r: e >> 16 & 255,
		g: e >> 8 & 255,
		b: e & 255
	};
}
//#endregion
//#region src/ts/Trans.ts
var Du = .04, Ou = 1e6;
function ku(e, t = Du) {
	let n = t > 0 ? Math.min(1 / (2 * t), Ou) : Ou;
	return {
		slope: n,
		intercept: .5 - n * e
	};
}
//#endregion
//#region src/components/Stage.tsx
function Au({ arg: { heStage: e, sys: t, scrMng: n }, onClick: r, prev: i, next: s }) {
	let m = p((e) => e.aPage), h = p((e) => e.foreIdx), y = p((e) => e.trans), b = (0, R.useRef)(null), x = (0, R.useRef)(null), S = [b, x], w = (0, R.useRef)(null), T = (0, R.useRef)(null);
	(0, R.useEffect)(() => {
		if (w.current?.kill(), w.current = null, !y) {
			L.set([b.current, x.current].filter((e) => e !== null), { opacity: 1 });
			return;
		}
		let e = S[h].current;
		if (!e) return;
		if (!y.ruleSrc) {
			w.current = L.to(e, {
				opacity: 0,
				duration: y.time / 1e3,
				ease: "none"
			});
			return;
		}
		let t = (e) => {
			let t = T.current;
			if (!t) return;
			let { slope: n, intercept: r } = ku(e, y.vague);
			t.setAttribute("slope", String(n)), t.setAttribute("intercept", String(r));
		};
		t(0);
		let n = { tick: 0 };
		w.current = L.to(n, {
			tick: 1,
			duration: y.time / 1e3,
			ease: "none",
			onUpdate: () => t(n.tick)
		});
	}, [y]);
	let D = p((e) => e.quake), k = (0, R.useRef)(null);
	(0, R.useEffect)(() => {
		k.current?.kill(), k.current = null;
		let e = [b.current, x.current].filter((e) => e !== null);
		if (!D) {
			L.set(e, {
				x: 0,
				y: 0
			});
			return;
		}
		let { hmax: t, vmax: n } = D;
		k.current = L.to({ v: 0 }, {
			v: 1,
			duration: 3600,
			ease: "none",
			onUpdate: () => {
				L.set(e, {
					x: t === 0 ? 0 : Math.round(Math.random() * t * 2) - t,
					y: n === 0 ? 0 : Math.round(Math.random() * n * 2) - n
				});
			}
		});
	}, [D]);
	let [j, N] = (0, R.useState)(Mu());
	U(() => {
		function e() {
			N(Mu());
		}
		return globalThis.addEventListener("resize", e), () => globalThis.removeEventListener("resize", e);
	});
	let { cvsScale: P } = ju(j), { stageW: F, stageH: I } = a, z = (0, R.useRef)(null), ee = p((e) => e.fullScr), V = p((e) => e.setFullScr), ne = p((e) => e.toggleFullScr), re = te((0, R.useRef)(e), ee, { onClose: () => V(!1) });
	(0, R.useEffect)(() => {
		n.setFullScr(re);
	}, [re]), (0, R.useLayoutEffect)(() => {
		re ? (e.style.width = "", e.style.height = "", e.style.display = "flex", e.style.alignItems = "center", e.style.justifyContent = "center", e.style.backgroundColor = "black") : (e.style.width = `${String(F * P)}px`, e.style.height = `${String(I * P)}px`, e.style.display = "", e.style.alignItems = "", e.style.justifyContent = "", e.style.backgroundColor = ""), e.style.overflow = "hidden";
	}, [
		P,
		F,
		I,
		re
	]);
	let ie = hu`
		position: relative;
		width: ${F}px;
		height: ${I}px;
		overflow: hidden;
		background-color: black;

		/* ステージ既定フォント。本家 TxtLayer.ts:272 のメッセージ層デフォルトと同じ Hiragino 系スタック。
			ここへ置けば各レイヤ（文字メッセージ等）が継承する。ボタンは本家 sn.button.fontFamily 相当を
			BtnLayer側で明示指定しているのでそちらが優先される（＝別途フォントを差し替え可能） */
		font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif;

		/* 全画面（[toggle_full_screen]）のときは**画面の中央へ寄せる**（本家 SysBase.cvsResize()）。
			中央寄せは外側（#skynovel）のflexに任せ、ここは拡縮だけを持つ。
			原点を中心にするのは、flexが**拡縮前の実寸**で中央に置くため（左上原点だと右下へ伸びる） */
		transform-origin: ${re ? "center" : "left top"};
		transform: scale(${String(P)});
	`, W = hu`position: absolute; top: 0; left: 0;`, ae = hu`
		position: absolute; top: 0; left: 0;
		width: 100%; height: 100%;
		z-index: 2;
		pointer-events: none;
	`, oe = hu`
		position: absolute; top: 0; left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: black;
	`, se = hu`
		position: relative; z-index: 1;

		display: inline-block;
		text-align: center;
		vertical-align: middle;
		text-decoration: none;
		width: 120px;
		margin: auto;
		padding: 1rem 4rem;
		font-weight: bold;
		border: 2px solid #27acd9;
		color: #27acd9;
		border-radius: 100vh;
		transition: 0.5s;
		top: 48%;
		&:hover {
			color: #fff;
			background: #27acd9;
		}
	`, ce = (0, R.useRef)(null);
	U(() => {
		n.attachFrameBox(ce.current), n.attachStageBox(z.current);
	}), U(() => {
		let e = z.current;
		e.addEventListener("mousedown", () => d());
		let t = (e) => {
			e.preventDefault(), e.deltaY < 0 ? s() : i();
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	});
	let [le, ue] = B(!1);
	H((e) => {
		e.stopPropagation(), O(), !g() && (ue(), M(!le));
	}, {
		isPreventDefault: !0,
		delay: 300
	});
	let de = (() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of m) for (let n of t) if (n.aFlt) for (let t of v(n.aFlt)) e.set(o(t), t);
		return [...e.values()];
	})(), fe = (() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of m) for (let n of t) if (n.aFlt) for (let t of l(n.aFlt)) e.set(f(t), t);
		return [...e.values()];
	})(), pe = { cmn: {
		sys: t,
		styChild: W,
		isDesignMode: le,
		sty4Moveable: {
			maxWidth: "auto",
			maxHeight: "auto",
			minWidth: "auto",
			minHeight: "auto",
			transform: "translate(0px, 0px) rotate(0deg)"
		}
	} };
	return /* @__PURE__ */ C("div", {
		css: ie,
		onClick: r,
		ref: z,
		children: [
			y?.ruleSrc && /* @__PURE__ */ A("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ C("defs", { children: [/* @__PURE__ */ C("filter", {
					id: "sn_rule_flt",
					colorInterpolationFilters: "sRGB",
					children: [/* @__PURE__ */ A("feColorMatrix", {
						type: "matrix",
						values: "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0"
					}), /* @__PURE__ */ A("feComponentTransfer", { children: /* @__PURE__ */ A("feFuncA", {
						ref: T,
						type: "linear",
						slope: "1",
						intercept: "0"
					}) })]
				}), /* @__PURE__ */ A("mask", {
					id: "sn_rule_msk",
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: F,
					height: I,
					children: /* @__PURE__ */ A("image", {
						href: y.ruleSrc,
						x: "0",
						y: "0",
						width: F,
						height: I,
						preserveAspectRatio: "none",
						filter: "url(#sn_rule_flt)"
					})
				})] })
			}),
			de.length > 0 && /* @__PURE__ */ A("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ A("defs", { children: de.map((e) => /* @__PURE__ */ A("filter", {
					id: o(e),
					colorInterpolationFilters: "sRGB",
					x: "0",
					y: "0",
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ A("feColorMatrix", {
						type: "matrix",
						values: _(e)
					})
				}, o(e))) })
			}),
			fe.length > 0 && /* @__PURE__ */ A("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ A("defs", { children: fe.map((e) => /* @__PURE__ */ A("filter", {
					id: f(e),
					children: /* @__PURE__ */ A("feGaussianBlur", { stdDeviation: u(e) })
				}, f(e))) })
			}),
			le && /* @__PURE__ */ C(E, { children: [
				/* @__PURE__ */ A("button", {
					onClick: () => ne(),
					css: se,
					children: "FullScr"
				}),
				/* @__PURE__ */ A("button", {
					onClick: () => {},
					css: se,
					children: "Back"
				}),
				/* @__PURE__ */ A("button", {
					onClick: () => {},
					css: se,
					children: "Prev"
				})
			] }),
			/* @__PURE__ */ A("span", { children: re }),
			m.map((e, t) => {
				let r = y?.aLayNm && t !== h ? e.map((e) => y.aLayNm.includes(e.nm) ? e : m[h].find((t) => t.nm === e.nm) ?? e) : e;
				return /* @__PURE__ */ A("div", {
					ref: S[t],
					"data-page": t === h ? "fore" : "back",
					css: oe,
					style: {
						zIndex: +(t === h),
						visibility: t === h || y ? "visible" : "hidden",
						pointerEvents: t === h ? "auto" : "none",
						...y?.ruleSrc && t === h ? { mask: "url(#sn_rule_msk)" } : {}
					},
					children: r.map((e) => {
						let r = {
							...pe.cmn.sty4Moveable,
							...c(e)
						};
						return e.cls === "grp" ? /* @__PURE__ */ A(au, {
							cmn: pe.cmn,
							sty: r,
							nm: e.nm,
							fn: e.fn,
							src: e.src,
							aFace: e.aFace,
							getVideoVol: () => n.getMovieVolume(),
							needClick2Play: () => n.needClick2Play()
						}, e.nm) : /* @__PURE__ */ A(xu, {
							cmn: pe.cmn,
							sty: r,
							nm: e.nm,
							isFore: t === h,
							str: e.str,
							aCh: e.aCh,
							ffs: e.ffs,
							noffs: e.noffs,
							bura: e.bura,
							r_align: e.r_align,
							b_color: e.b_color,
							b_alpha: e.b_alpha,
							b_alpha_isfixed: e.b_alpha_isfixed,
							b_src: e.b_src,
							styTxt: e.style,
							enabled: e.enabled,
							aBtn: e.aBtn,
							in_style: e.in_style,
							onActivate: (e, t, r, i) => n.jumpToLabelAndGo(e, t, r, i),
							onNavigate: (e) => n.navigateTo(e),
							onSe: (e, t) => n.playButtonSe(e, t)
						}, e.nm);
					})
				}, t);
			}),
			/* @__PURE__ */ A("div", {
				ref: ce,
				css: ae
			})
		]
	});
}
function ju({ width: e, height: t }) {
	let n = 0, o = 0, s = 1;
	return r(a.hDip, "expanding", !0) || a.stageW > e || a.stageH > t ? (a.stageW / a.stageH <= e / t ? (o = t, n = i(a.stageW / a.stageH * t)) : (n = e, o = i(a.stageH / a.stageW * e)), s = n / a.stageW) : (n = a.stageW, o = a.stageH, s = 1), {
		cvsScale: s,
		cvsWidth: n,
		cvsHeight: o
	};
}
function Mu() {
	let { innerWidth: e, innerHeight: t } = globalThis;
	return {
		width: e,
		height: t
	};
}
//#endregion
export { Au as default };

//# sourceMappingURL=Stage.js.map