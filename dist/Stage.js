import { n as e, t } from "./rolldown-runtime.js";
import { t as n } from "./Memento.js";
import { t as r } from "./react.js";
import { a as i, c as a, d as o, f as s, i as c, l, m as u, n as d, o as f, onLong as p, p as m, r as h, s as g, setDesignMode as _, t as v, u as y } from "./Main.js";
import { n as b, o as x, r as S } from "./ConfigBase.js";
//#region node_modules/react-use/esm/useToggle.js
var C = /* @__PURE__ */ e(r()), w = function(e, t) {
	return typeof t == "boolean" ? t : !e;
}, T = function(e) {
	return (0, C.useReducer)(w, e);
}, E = y ? C.useLayoutEffect : C.useEffect, D = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
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
})))()), O = function(e, t, n) {
	n === void 0 && (n = {});
	var r = n.video, i = n.onClose, a = i === void 0 ? o : i, c = (0, C.useState)(t), l = c[0], u = c[1];
	return E(function() {
		if (t && e.current) {
			var n = function() {
				r?.current && s(r.current, "webkitendfullscreen", n), a();
			}, i = function() {
				if (D.default.isEnabled) {
					var e = D.default.isFullscreen;
					u(e), e || a();
				}
			};
			if (D.default.isEnabled) {
				try {
					D.default.request(e.current), u(!0);
				} catch (e) {
					a(e), u(!1);
				}
				D.default.on("change", i);
			} else r && r.current && r.current.webkitEnterFullscreen ? (r.current.webkitEnterFullscreen(), m(r.current, "webkitendfullscreen", n), u(!0)) : (a(), u(!1));
			return function() {
				if (u(!1), D.default.isEnabled) try {
					D.default.off("change", i), D.default.exit();
				} catch {}
				else r && r.current && r.current.webkitExitFullscreen && (s(r.current, "webkitendfullscreen", n), r.current.webkitExitFullscreen());
			};
		}
	}, [
		t,
		r,
		e
	]), l;
}, k = function(e) {
	return "touches" in e;
}, A = function(e) {
	k(e) && e.touches.length < 2 && e.preventDefault && e.preventDefault();
}, j = function(e, t) {
	var n = t === void 0 ? {} : t, r = n.isPreventDefault, i = r === void 0 || r, a = n.delay, o = a === void 0 ? 300 : a, c = (0, C.useRef)(), l = (0, C.useRef)(), u = (0, C.useCallback)(function(t) {
		i && t.target && (m(t.target, "touchend", A, { passive: !1 }), l.current = t.target), c.current = setTimeout(function() {
			return e(t);
		}, o);
	}, [
		e,
		o,
		i
	]), d = (0, C.useCallback)(function() {
		c.current && clearTimeout(c.current), i && l.current && s(l.current, "touchend", A);
	}, [i]);
	return {
		onMouseDown: function(e) {
			return u(e);
		},
		onTouchStart: function(e) {
			return u(e);
		},
		onMouseUp: d,
		onMouseLeave: d,
		onTouchEnd: d
	};
}, M = function(e) {
	l(function() {
		e();
	});
};
//#endregion
//#region node_modules/@egjs/agent/dist/agent.esm.js
function N(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return !0;
	return !1;
}
function P(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return e[r];
	return null;
}
function F(e) {
	var t = e;
	if (t === void 0) {
		if (typeof navigator > "u" || !navigator) return "";
		t = navigator.userAgent || "";
	}
	return t.toLowerCase();
}
function I(e, t) {
	try {
		return new RegExp(e, "g").exec(t);
	} catch {
		return null;
	}
}
function L() {
	if (typeof navigator > "u" || !navigator || !navigator.userAgentData) return !1;
	var e = navigator.userAgentData, t = e.brands || e.uaList;
	return !!(t && t.length);
}
function R(e, t) {
	var n = I("(" + e + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", t);
	return n ? n[3] : "";
}
function z(e) {
	return e.replace(/_/g, ".");
}
function B(e, t) {
	var n = null, r = "-1";
	return N(e, function(e) {
		var i = I("(" + e.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", t);
		return !i || e.brand ? !1 : (n = e, r = i[3] || "-1", e.versionAlias ? r = e.versionAlias : e.versionTest && (r = R(e.versionTest.toLowerCase(), t) || r), r = z(r), !0);
	}), {
		preset: n,
		version: r
	};
}
function ee(e, t) {
	var n = {
		brand: "",
		version: "-1"
	};
	return N(e, function(e) {
		var r = V(t, e);
		return r ? (n.brand = e.id, n.version = e.versionAlias || r.version, n.version !== "-1") : !1;
	}), n;
}
function V(e, t) {
	return P(e, function(e) {
		var n = e.brand;
		return I("" + t.test, n.toLowerCase());
	});
}
var te = [
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
], ne = [
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
], re = [{
	test: "applewebkit",
	id: "webkit",
	versionTest: "applewebkit|safari"
}], H = [
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
], U = [
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
function ie(e) {
	return !!B(H, e).preset;
}
function ae(e) {
	var t = F(e), n = !!/mobi/g.exec(t), r = {
		name: "unknown",
		version: "-1",
		majorVersion: -1,
		webview: ie(t),
		chromium: !1,
		chromiumVersion: "-1",
		webkit: !1,
		webkitVersion: "-1"
	}, i = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	}, a = B(te, t), o = a.preset, s = a.version, c = B(U, t), l = c.preset, u = c.version, d = B(ne, t);
	if (r.chromium = !!d.preset, r.chromiumVersion = d.version, !r.chromium) {
		var f = B(re, t);
		r.webkit = !!f.preset, r.webkitVersion = f.version;
	}
	return l && (i.name = l.id, i.version = u, i.majorVersion = parseInt(u, 10)), o && (r.name = o.id, r.version = s, r.webview && i.name === "ios" && r.name !== "safari" && (r.webview = !1)), r.majorVersion = parseInt(r.version, 10), {
		browser: r,
		os: i,
		isMobile: n,
		isHints: !1
	};
}
function oe(e) {
	var t = navigator.userAgentData, n = (t.uaList || t.brands).slice(), r = e && e.fullVersionList, i = t.mobile || !1, a = n[0], o = (e && e.platform || t.platform || navigator.platform).toLowerCase(), s = {
		name: a.brand,
		version: a.version,
		majorVersion: -1,
		webkit: !1,
		webkitVersion: "-1",
		chromium: !1,
		chromiumVersion: "-1",
		webview: !!ee(H, n).brand || ie(F())
	}, c = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	};
	s.webkit = !s.chromium && N(re, function(e) {
		return V(n, e);
	});
	var l = ee(ne, n);
	if (s.chromium = !!l.brand, s.chromiumVersion = l.version || "-1", !s.chromium) {
		var u = ee(re, n);
		s.webkit = !!u.brand, s.webkitVersion = u.version || "-1";
	}
	var d = P(U, function(e) {
		return RegExp("" + e.test, "g").exec(o);
	});
	if (c.name = d ? d.id : "", e && (c.version = e.platformVersion || "-1"), r && r.length) {
		var f = ee(te, r);
		s.name = f.brand || s.name, s.version = f.version || s.version;
	} else {
		var p = ee(te, n);
		s.name = p.brand || s.name, s.version = p.brand && e ? e.uaFullVersion : p.version;
	}
	return s.webkit && (c.name = i ? "ios" : "mac"), c.name === "ios" && s.webview && (s.version = "-1"), c.version = z(c.version), s.version = z(s.version), c.majorVersion = parseInt(c.version, 10), s.majorVersion = parseInt(s.version, 10), {
		browser: s,
		os: c,
		isMobile: i,
		isHints: !0
	};
}
function se(e) {
	return e === void 0 && L() ? oe() : ae(e);
}
//#endregion
//#region node_modules/framework-utils/dist/utils.esm.js
function ce(e) {
	return [...arguments].slice(1).map(function(t) {
		return t.split(" ").map(function(t) {
			return t ? "" + e + t : "";
		}).join(" ");
	}).join(" ");
}
function le(e, t) {
	return t.replace(/([^}{]*){/gm, function(t, n) {
		return n.replace(/\.([^{,\s\d.]+)/g, "." + e + "$1") + "{";
	});
}
function ue(e, t) {
	return function(n) {
		n && (e[t] = n);
	};
}
function de(e, t, n) {
	return function(r) {
		r && (e[t][n] = r);
	};
}
function fe(e, t) {
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
var pe = "function", me = "string", he = "number", ge = "undefined", _e = typeof window !== ge, ve = typeof document < "u" && document, ye = [
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
], be = 1e-7;
1 / be;
var xe = {
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
function Se() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function Ce(e, t, n, r) {
	return (e * r + t * n) / (n + r);
}
function we(e) {
	return typeof e === ge;
}
function Te(e) {
	return e && typeof e == "object";
}
function Ee(e) {
	return Array.isArray(e);
}
function De(e) {
	return typeof e === me;
}
function Oe(e) {
	return typeof e === he;
}
function ke(e) {
	return typeof e === pe;
}
function Ae(e, t) {
	return (t === "" || t == " ") && (e === "" || e == " ") || e === t;
}
function je(e, t, n, r, i) {
	return Me(e, t, n) ? n : Ne(e, t, n + 1, r, i);
}
function Me(e, t, n) {
	if (!e.ignore) return null;
	var r = t.slice(Math.max(n - 3, 0), n + 3).join("");
	return new RegExp(e.ignore).exec(r);
}
function Ne(e, t, n, r, i) {
	for (var a = function(n) {
		var a = t[n].trim();
		if (a === e.close && !Me(e, t, n)) return { value: n };
		var s = n, c = He(i, function(e) {
			return e.open === a;
		});
		if (c && (s = je(c, t, n, r, i)), s === -1) return o = n, "break";
		n = s, o = n;
	}, o, s = n; s < r; ++s) {
		var c = a(s);
		if (s = o, typeof c == "object") return c.value;
		if (c === "break") break;
	}
	return -1;
}
function Pe(e, t) {
	var n = De(t) ? { separator: t } : t, r = n.separator, i = r === void 0 ? "," : r, a = n.isSeparateFirst, o = n.isSeparateOnlyOpenClose, s = n.isSeparateOpenClose, c = s === void 0 ? o : s, l = n.openCloseCharacters, u = l === void 0 ? ye : l, d = u.map(function(e) {
		var t = e.open, n = e.close;
		return t === n ? t : t + "|" + n;
	}).join("|"), f = "(\\s*" + i + "\\s*|" + d + "|\\s+)", p = new RegExp(f, "g"), m = e.split(p).filter(function(e) {
		return e && e !== "undefined";
	}), h = m.length, g = [], _ = [];
	function v() {
		return _.length ? (g.push(_.join("")), _ = [], !0) : !1;
	}
	for (var y = function(t) {
		var n = m[t].trim(), r = t, s = He(u, function(e) {
			return e.open === n;
		}), l = He(u, function(e) {
			return e.close === n;
		});
		if (s) {
			if (r = je(s, m, t, h, u), r !== -1 && c) return v() && a || (g.push(m.slice(t, r + 1).join("")), t = r, a) ? (b = t, "break") : (b = t, "continue");
		} else if (l && !Me(l, m, t)) {
			var d = Se(u);
			return d.splice(u.indexOf(l), 1), { value: Pe(e, {
				separator: i,
				isSeparateFirst: a,
				isSeparateOnlyOpenClose: o,
				isSeparateOpenClose: c,
				openCloseCharacters: d
			}) };
		} else if (Ae(n, i) && !o) return v(), a ? (b = t, "break") : (b = t, "continue");
		r === -1 && (r = h - 1), _.push(m.slice(t, r + 1).join("")), t = r, b = t;
	}, b, x = 0; x < h; ++x) {
		var S = y(x);
		if (x = b, typeof S == "object") return S.value;
		if (S === "break") break;
	}
	return _.length && g.push(_.join("")), g;
}
function Fe(e) {
	return Pe(e, "");
}
function Ie(e) {
	return Pe(e, ",");
}
function Le(e) {
	var t = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(e);
	return !t || t.length < 4 ? {} : {
		prefix: t[1],
		value: t[2],
		suffix: t[3]
	};
}
function Re(e) {
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
function ze(e, t) {
	return t === void 0 && (t = "-"), e.replace(/([a-z])([A-Z])/g, function(e, n, r) {
		return "" + n + t + r.toLowerCase();
	});
}
function Be() {
	return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function Ve(e, t, n) {
	n === void 0 && (n = -1);
	for (var r = e.length, i = 0; i < r; ++i) if (t(e[i], i, e)) return i;
	return n;
}
function He(e, t, n) {
	var r = Ve(e, t);
	return r > -1 ? e[r] : n;
}
var Ue = /*#__PURE__*/ function() {
	var e = Be(), t = _e && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
	return t ? t.bind(window) : function(t) {
		var n = Be();
		return setTimeout(function() {
			t(n - e);
		}, 1e3 / 60);
	};
}(), We = /*#__PURE__*/ function() {
	var e = _e && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
	return e ? e.bind(window) : function(e) {
		clearTimeout(e);
	};
}();
function Ge(e) {
	return Object.keys(e);
}
function Ke(e, t) {
	var n = Re(e), r = n.value, i = n.unit;
	if (Te(t)) {
		var a = t[i];
		if (a) {
			if (ke(a)) return a(r);
			if (xe[i]) return xe[i](r, a);
		}
	} else if (i === "%") return r * t / 100;
	return xe[i] ? xe[i](r) : r;
}
function qe(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function Je(e, t, n, r) {
	return r === void 0 && (r = e[0] / e[1]), [[W(t[0], 1e-7), W(t[0] / r, 1e-7)], [W(t[1] * r, 1e-7), W(t[1], 1e-7)]].filter(function(e) {
		return e.every(function(e, r) {
			var i = t[r], a = W(i, 1e-7);
			return n ? e <= i || e <= a : e >= i || e >= a;
		});
	})[0] || e;
}
function Ye(e, t, n, r) {
	if (!r) return e.map(function(e, r) {
		return qe(e, t[r], n[r]);
	});
	var i = e[0], a = e[1], o = r === !0 ? i / a : r, s = Je(e, t, !1, o), c = s[0], l = s[1], u = Je(e, n, !0, o), d = u[0], f = u[1];
	return i < c || a < l ? (i = c, a = l) : (i > d || a > f) && (i = d, a = f), [i, a];
}
function Xe(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return n;
}
function Ze(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return t ? n / t : 0;
}
function Qe(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function $e(e) {
	return [0, 1].map(function(t) {
		return Ze(e.map(function(e) {
			return e[t];
		}));
	});
}
function et(e) {
	var t = $e(e), n = Qe(t, e[0]), r = Qe(t, e[1]);
	return n < r && r - n < Math.PI || n > r && r - n < -Math.PI ? 1 : -1;
}
function tt(e, t) {
	return Math.sqrt(((t ? t[0] : 0) - e[0]) ** 2 + ((t ? t[1] : 0) - e[1]) ** 2);
}
function W(e, t) {
	if (!t) return e;
	var n = 1 / t;
	return Math.round(e / t) / n;
}
function nt(e, t) {
	return e.forEach(function(n, r) {
		e[r] = W(e[r], t);
	}), e;
}
function rt(e) {
	for (var t = [], n = 0; n < e; ++n) t.push(n);
	return t;
}
function it(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function at(e, t) {
	return e.classList ? e.classList.contains(t) : !!e.className.match(RegExp("(\\s|^)" + t + "(\\s|$)"));
}
function ot(e, t) {
	e.classList ? e.classList.add(t) : e.className += " " + t;
}
function st(e, t) {
	if (e.classList) e.classList.remove(t);
	else {
		var n = RegExp("(\\s|^)" + t + "(\\s|$)");
		e.className = e.className.replace(n, " ");
	}
}
function ct(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function lt(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
function ut(e) {
	return e?.ownerDocument || ve;
}
function dt(e) {
	return ut(e).documentElement;
}
function ft(e) {
	return ut(e).body;
}
function pt(e) {
	return e?.ownerDocument?.defaultView || window;
}
function mt(e) {
	return e && "postMessage" in e && "blur" in e && "self" in e;
}
function ht(e) {
	return Te(e) && e.nodeName && e.nodeType && "ownerDocument" in e;
}
//#endregion
//#region node_modules/@scena/matrix/dist/matrix.esm.js
function gt(e, t, n, r, i, a) {
	for (var o = 0; o < i; ++o) {
		var s = n + o * i, c = r + o * i;
		e[s] += e[c] * a, t[s] += t[c] * a;
	}
}
function _t(e, t, n, r, i) {
	for (var a = 0; a < i; ++a) {
		var o = n + a * i, s = r + a * i, c = e[o], l = t[o];
		e[o] = e[s], e[s] = c, t[o] = t[s], t[s] = l;
	}
}
function vt(e, t, n, r, i) {
	for (var a = 0; a < r; ++a) {
		var o = n + a * r;
		e[o] /= i, t[o] /= i;
	}
}
function yt(e, t, n) {
	n === void 0 && (n = Math.sqrt(e.length));
	for (var r = e.slice(), i = 0; i < n; ++i) r[i * n + t - 1] = 0, r[(t - 1) * n + i] = 0;
	return r[(t - 1) * (n + 1)] = 1, r;
}
function bt(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = e.slice(), r = Bt(t), i = 0; i < t; ++i) {
		var a = t * i + i;
		if (!W(n[a], 1e-7)) {
			for (var o = i + 1; o < t; ++o) if (n[t * i + o]) {
				_t(n, r, i, o, t);
				break;
			}
		}
		if (!W(n[a], 1e-7)) return [];
		vt(n, r, i, t, n[a]);
		for (var o = 0; o < t; ++o) {
			var s = o, c = n[o + i * t];
			!W(c, 1e-7) || i === o || gt(n, r, s, i, t, -c);
		}
	}
	return r;
}
function xt(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = 0; r < t; ++r) for (var i = 0; i < t; ++i) n[i * t + r] = e[t * r + i];
	return n;
}
function St(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = e[t * t - 1], i = 0; i < t - 1; ++i) n[i] = e[t * (t - 1) + i] / r;
	return n[t - 1] = 0, n;
}
function Ct(e, t) {
	for (var n = Bt(t), r = 0; r < t - 1; ++r) n[t * (t - 1) + r] = e[r] || 0;
	return n;
}
function wt(e, t) {
	for (var n = e.slice(), r = e.length; r < t - 1; ++r) n[r] = 0;
	return n[t - 1] = 1, n;
}
function Tt(e, t, n) {
	if (t === void 0 && (t = Math.sqrt(e.length)), t === n) return e;
	for (var r = Bt(n), i = Math.min(t, n), a = 0; a < i - 1; ++a) {
		for (var o = 0; o < i - 1; ++o) r[a * n + o] = e[a * t + o];
		r[(a + 1) * n - 1] = e[(a + 1) * t - 1], r[(n - 1) * n + a] = e[(t - 1) * t + a];
	}
	return r[n * n - 1] = e[t * t - 1], r;
}
function Et(e) {
	var t = [...arguments].slice(1), n = Bt(e);
	return t.forEach(function(t) {
		n = Dt(n, t, e);
	}), n;
}
function Dt(e, t, n) {
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
function Ot(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] + t[i];
	return r;
}
function G(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] - t[i];
	return r;
}
function kt(e, t) {
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
function At(e, t) {
	return t === void 0 && (t = e.length === 9), t ? [
		e[0],
		e[1],
		e[3],
		e[4],
		e[6],
		e[7]
	] : e;
}
function jt(e, t, n) {
	n === void 0 && (n = t.length);
	var r = Dt(e, t, n), i = r[n - 1];
	return r.map(function(e) {
		return e / i;
	});
}
function Mt(e, t) {
	return Dt(e, [
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
function Nt(e, t) {
	return Dt(e, [
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
function Pt(e, t) {
	return Dt(e, zt(t, 4));
}
function Ft(e, t) {
	var n = t[0], r = n === void 0 ? 1 : n, i = t[1], a = i === void 0 ? 1 : i, o = t[2];
	return Dt(e, [
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
function It(e, t) {
	return jt(zt(t, 3), wt(e, 3));
}
function Lt(e, t) {
	var n = t[0], r = n === void 0 ? 0 : n, i = t[1], a = i === void 0 ? 0 : i, o = t[2];
	return Dt(e, [
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
function Rt(e, t) {
	return Dt(e, t, 4);
}
function zt(e, t) {
	var n = Math.cos(e), r = Math.sin(e), i = Bt(t);
	return i[0] = n, i[1] = r, i[t] = -r, i[t + 1] = n, i;
}
function Bt(e) {
	for (var t = e * e, n = [], r = 0; r < t; ++r) n[r] = r % (e + 1) ? 0 : 1;
	return n;
}
function Vt(e, t) {
	for (var n = Bt(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[(t + 1) * i] = e[i];
	return n;
}
function Ht(e, t) {
	for (var n = Bt(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[t * (t - 1) + i] = e[i];
	return n;
}
function Ut(e, t, n, r, i, a, o, s) {
	var c = e[0], l = e[1], u = t[0], d = t[1], f = n[0], p = n[1], m = r[0], h = r[1], g = i[0], _ = i[1], v = a[0], y = a[1], b = o[0], x = o[1], S = s[0], C = s[1], w = bt([
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
	var T = Dt(w, [
		g,
		_,
		v,
		y,
		b,
		x,
		S,
		C
	], 8);
	return T[8] = 1, Tt(xt(T), 3, 4);
}
//#endregion
//#region node_modules/css-to-mat/dist/css-to-mat.esm.js
var Wt = function() {
	return Wt = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Wt.apply(this, arguments);
};
function Gt() {
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
function Kt(e, t) {
	return t === void 0 && (t = 0), Jt(Yt(e, t));
}
function qt(e, t) {
	var n = jt(e, [
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
function Jt(e) {
	var t = Gt();
	return e.forEach(function(e) {
		var n = e.matrixFunction, r = e.functionValue;
		n && (t = n(t, r));
	}), t;
}
function Yt(e, t) {
	return t === void 0 && (t = 0), (Ee(e) ? e : Fe(e)).map(function(e) {
		var n = Le(e), r = n.prefix, i = n.value, a = null, o = r, s = "";
		if (r === "translate" || r === "translateX" || r === "translate3d") {
			var c = Te(t) ? Wt(Wt({}, t), { "o%": t["%"] }) : {
				"%": t,
				"o%": t
			}, l = Ie(i).map(function(e, n) {
				return n === 0 && "x%" in c ? c["%"] = t["x%"] : n === 1 && "y%" in c ? c["%"] = t["y%"] : c["%"] = t["o%"], Ke(e, c);
			}), u = l[0], d = l[1], f = d === void 0 ? 0 : d, p = l[2], m = p === void 0 ? 0 : p;
			a = Lt, s = [
				u,
				f,
				m
			];
		} else if (r === "translateY") {
			var f = Ke(i, Te(t) ? Wt({ "%": t["y%"] }, t) : { "%": t });
			a = Lt, s = [
				0,
				f,
				0
			];
		} else if (r === "translateZ") {
			var m = parseFloat(i);
			a = Lt, s = [
				0,
				0,
				m
			];
		} else if (r === "scale" || r === "scale3d") {
			var h = Ie(i).map(function(e) {
				return parseFloat(e);
			}), g = h[0], _ = h[1], v = _ === void 0 ? g : _, y = h[2], b = y === void 0 ? 1 : y;
			a = Ft, s = [
				g,
				v,
				b
			];
		} else if (r === "scaleX") {
			var g = parseFloat(i);
			a = Ft, s = [
				g,
				1,
				1
			];
		} else if (r === "scaleY") {
			var v = parseFloat(i);
			a = Ft, s = [
				1,
				v,
				1
			];
		} else if (r === "scaleZ") {
			var b = parseFloat(i);
			a = Ft, s = [
				1,
				1,
				b
			];
		} else if (r === "rotate" || r === "rotateZ" || r === "rotateX" || r === "rotateY") {
			var x = Re(i), S = x.unit, C = x.value, w = S === "rad" ? C : C * Math.PI / 180;
			r === "rotate" || r === "rotateZ" ? (o = "rotateZ", a = Pt) : r === "rotateX" ? a = Mt : r === "rotateY" && (a = Nt), s = w;
		} else if (r === "matrix3d") a = Rt, s = Ie(i).map(function(e) {
			return parseFloat(e);
		});
		else if (r === "matrix") {
			var T = Ie(i).map(function(e) {
				return parseFloat(e);
			});
			a = Rt, s = [
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
var Xt = /*#__PURE__*/ function() {
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
}(), Zt = /*#__PURE__*/ function() {
	function e() {
		this.object = {};
	}
	var t = e.prototype;
	return t.get = function(e) {
		return this.object[e];
	}, t.set = function(e, t) {
		this.object[e] = t;
	}, e;
}(), Qt = typeof Map == "function", $t = /*#__PURE__*/ function() {
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
function en(e, t) {
	var n = [], r = [];
	return e.forEach(function(e) {
		var t = e[0], i = e[1], a = new $t();
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
var tn = /*#__PURE__*/ function() {
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
		var e = en(this.changedBeforeAdded, this.fixed), t = this.changed, n = [];
		this.cacheOrdered = e.filter(function(e, r) {
			var i = e[0], a = e[1], o = t[r], s = o[0], c = o[1];
			if (i !== a) return n.push([s, c]), !0;
		}), this.cachePureChanged = n;
	}, e;
}();
function nn(e, t, n) {
	var r = Qt ? Map : n ? Zt : Xt, i = n || function(e) {
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
	}), o.reverse(), new tn(e, t, a, o, h, s, f, p);
}
var rn = /*#__PURE__*/ function() {
	function e(e, t) {
		e === void 0 && (e = []), this.findKeyCallback = t, this.list = [].slice.call(e);
	}
	var t = e.prototype;
	return t.update = function(e) {
		var t = [].slice.call(e), n = nn(this.list, t, this.findKeyCallback);
		return this.list = t, n;
	}, e;
}(), an = function(e, t) {
	return an = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, an(e, t);
};
function on(e, t) {
	an(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var sn = typeof Map == "function" ? void 0 : function() {
	var e = 0;
	return function(t) {
		return t.__DIFF_KEY__ ||= ++e;
	};
}(), cn = /*#__PURE__*/ function(e) {
	on(t, e);
	function t(t) {
		return t === void 0 && (t = []), e.call(this, t, sn) || this;
	}
	return t;
}(rn);
function ln(e, t) {
	return nn(e, t, sn);
}
//#endregion
//#region node_modules/@scena/event-emitter/dist/event-emitter.esm.js
var un = function() {
	return un = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, un.apply(this, arguments);
};
function dn() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
var fn = /*#__PURE__*/ function() {
	function e() {
		this._events = {};
	}
	var t = e.prototype;
	return t.on = function(e, t) {
		if (Te(e)) for (var n in e) this.on(n, e[n]);
		else this._addEvent(e, t, {});
		return this;
	}, t.off = function(e, t) {
		if (!e) this._events = {};
		else if (Te(e)) for (var n in e) this.off(n);
		else if (!t) this._events[e] = [];
		else {
			var r = this._events[e];
			if (r) {
				var i = Ve(r, function(e) {
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
		}, t.currentTarget = this, dn(r).forEach(function(r) {
			r.listener(t), r.once && n.off(e, r.listener);
		}), !i;
	}, t.trigger = function(e, t) {
		return t === void 0 && (t = {}), this.emit(e, t);
	}, t._addEvent = function(e, t, n) {
		var r = this._events;
		r[e] = r[e] || [], r[e].push(un({ listener: t }, n));
	}, e;
}(), pn = function(e, t) {
	return pn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, pn(e, t);
};
function mn(e, t) {
	pn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var hn = function() {
	return hn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, hn.apply(this, arguments);
};
function gn(e) {
	var t = e.container;
	return t === document.body ? [t.scrollLeft || document.documentElement.scrollLeft, t.scrollTop || document.documentElement.scrollTop] : [t.scrollLeft, t.scrollTop];
}
function _n(e, t) {
	return e.addEventListener("scroll", t), function() {
		e.removeEventListener("scroll", t);
	};
}
function vn(e) {
	if (!e) return null;
	if (De(e)) return document.querySelector(e);
	if (ke(e)) return e();
	if (e instanceof Element) return e;
	if ("current" in e) return e.current;
	if ("value" in e) return e.value;
}
var yn = /*#__PURE__*/ function(e) {
	mn(t, e);
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
		var n = vn(t.container);
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
			return s.top > r - a ? (c[1] > s.top || r < c[1]) && (l[1] = -1) : s.top + s.height < r + a && (c[1] < s.top + s.height || r > c[1]) && (l[1] = 1), s.left > n - a ? (c[0] > s.left || n < c[0]) && (l[0] = -1) : s.left + s.width < n + a && (c[0] < s.left + s.width || n > c[0]) && (l[0] = 1), !l[0] && !l[1] ? !1 : this._continueDrag(hn(hn({}, t), {
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
		return (r === void 0 ? gn : r)({
			container: vn(n),
			direction: e
		});
	}, n._continueDrag = function(e) {
		var t = this, n, r = e.container, i = e.direction, a = e.throttleTime, o = e.useScroll, s = e.isDrag, c = e.inputEvent;
		if (!(!this._flag || s && this._isWait)) {
			var l = Be(), u = Math.max(a + this._prevTime - l, 0);
			if (u > 0) return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
				t._continueDrag(e);
			}, u), !1;
			this._prevTime = l;
			var d = this._getScrollPosition(i, e);
			this._prevScrollPos = d, s && (this._isWait = !0), o || (this._lock = !0);
			var f = {
				container: vn(r),
				direction: i,
				inputEvent: c
			};
			return (n = e.requestScroll) == null || n.call(e, f), this.emit("scroll", f), this._isWait = !1, o || this.checkScroll(hn(hn({}, e), {
				prevScrollPos: d,
				direction: i,
				inputEvent: c
			}));
		}
	}, n._registerScrollEvent = function(e) {
		this._unregisterScrollEvent();
		var t = e.checkScrollEvent;
		if (t) {
			var n = t === !0 ? _n : t, r = vn(e.container);
			t === !0 && (r === document.body || r === document.documentElement) ? this._unregister = _n(window, this._onScroll) : this._unregister = n(r, this._onScroll);
		}
	}, n._unregisterScrollEvent = function() {
		var e;
		(e = this._unregister) == null || e.call(this), this._unregister = null;
	}, t;
}(fn);
//#endregion
//#region node_modules/overlap-area/dist/overlap-area.esm.js
function bn() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function xn(e) {
	return W(e, be);
}
function Sn(e, t) {
	return e.every(function(e, n) {
		return xn(e - t[n]) === 0;
	});
}
function Cn(e, t) {
	return !xn(e[0] - t[0]) && !xn(e[1] - t[1]);
}
function wn(e) {
	return e.length < 3 ? 0 : Math.abs(Xe(e.map(function(t, n) {
		var r = e[n + 1] || e[0];
		return t[0] * r[1] - r[0] * t[1];
	}))) / 2;
}
function Tn(e, t) {
	var n = t.width, r = t.height, i = t.left, a = t.top, o = En(e), s = o.minX, c = o.minY, l = o.maxX, u = o.maxY, d = n / (l - s), f = r / (u - c);
	return e.map(function(e) {
		return [i + (e[0] - s) * d, a + (e[1] - c) * f];
	});
}
function En(e) {
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
function Dn(e, t, n) {
	var r = e[0], i = e[1], a = En(t), o = a.minX, s = a.maxX, c = [[o, i], [s, i]], l = On(c[0], c[1]), u = jn(t), d = [];
	if (u.forEach(function(t) {
		var n = On(t[0], t[1]), r = t[0];
		Sn(l, n) ? d.push({
			pos: e,
			line: t,
			type: "line"
		}) : An(kn(l, n), [c, t]).forEach(function(e) {
			t.some(function(t) {
				return Cn(t, e);
			}) ? d.push({
				pos: e,
				line: t,
				type: "point"
			}) : xn(r[1] - i) !== 0 && d.push({
				pos: e,
				line: t,
				type: "intersection"
			});
		});
	}), !n && He(d, function(e) {
		return e[0] === r;
	})) return !0;
	var f = 0, p = {};
	return d.forEach(function(e) {
		var t = e.pos, n = e.type, a = e.line;
		if (!(t[0] > r)) {
			if (n === "intersection") ++f;
			else if (n === "line") return;
			else if (n === "point") {
				var o = He(a, function(e) {
					return e[1] !== i;
				}), s = p[t[0]], c = o[1] > i ? 1 : -1;
				s ? s !== c && ++f : p[t[0]] = c;
			}
		}
	}), f % 2 == 1;
}
function On(e, t) {
	var n = e[0], r = e[1], i = t[0], a = t[1], o = i - n, s = a - r;
	Math.abs(o) < 1e-7 && (o = 0), Math.abs(s) < 1e-7 && (s = 0);
	var c = 0, l = 0, u = 0;
	return o ? s ? (c = -s / o, l = 1, u = -c * n - r) : (l = 1, u = -r) : s && (c = -1, u = n), [
		c,
		l,
		u
	];
}
function kn(e, t) {
	var n = e[0], r = e[1], i = e[2], a = t[0], o = t[1], s = t[2], c = n === 0 && a === 0, l = r === 0 && o === 0, u = [];
	if (c && l) return [];
	if (c) {
		var d = -i / r;
		return d === -s / o ? [[-Infinity, d], [Infinity, d]] : [];
	} else if (l) {
		var f = -i / n;
		return f === -s / a ? [[f, -Infinity], [f, Infinity]] : [];
	} else if (n === 0) {
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
function An(e, t) {
	var n = t.map(function(e) {
		return [0, 1].map(function(t) {
			return [Math.min(e[0][t], e[1][t]), Math.max(e[0][t], e[1][t])];
		});
	}), r = [];
	if (e.length === 2) {
		var i = e[0], a = i[0], o = i[1];
		if (!xn(a - e[1][0])) {
			var s = Math.max.apply(Math, n.map(function(e) {
				return e[1][0];
			})), c = Math.min.apply(Math, n.map(function(e) {
				return e[1][1];
			}));
			if (xn(s - c) > 0) return [];
			r = [[a, s], [a, c]];
		} else if (!xn(o - e[1][1])) {
			var l = Math.max.apply(Math, n.map(function(e) {
				return e[0][0];
			})), u = Math.min.apply(Math, n.map(function(e) {
				return e[0][1];
			}));
			if (xn(l - u) > 0) return [];
			r = [[l, o], [u, o]];
		}
	}
	return r.length || (r = e.filter(function(e) {
		var t = e[0], r = e[1];
		return n.every(function(e) {
			return 0 <= xn(t - e[0][0]) && 0 <= xn(e[0][1] - t) && 0 <= xn(r - e[1][0]) && 0 <= xn(e[1][1] - r);
		});
	})), r.map(function(e) {
		return [xn(e[0]), xn(e[1])];
	});
}
function jn(e) {
	return bn(e.slice(1), [e[0]]).map(function(t, n) {
		return [e[n], t];
	});
}
function Mn(e, t) {
	var n = e.slice(), r = t.slice();
	et(n) === -1 && n.reverse(), et(r) === -1 && r.reverse();
	var i = jn(n), a = jn(r), o = i.map(function(e) {
		return On(e[0], e[1]);
	}), s = a.map(function(e) {
		return On(e[0], e[1]);
	}), c = [];
	o.forEach(function(e, t) {
		var n = i[t], o = [];
		s.forEach(function(r, i) {
			var s = An(kn(e, r), [n, a[i]]);
			o.push.apply(o, s.map(function(e) {
				return {
					index1: t,
					index2: i,
					pos: e,
					type: "intersection"
				};
			}));
		}), o.sort(function(e, t) {
			return tt(n[0], e.pos) - tt(n[0], t.pos);
		}), c.push.apply(c, o), Dn(n[1], r) && c.push({
			index1: t,
			index2: -1,
			pos: n[1],
			type: "inside"
		});
	}), a.forEach(function(e, t) {
		if (Dn(e[1], n)) {
			var r = !1, i = Ve(c, function(e) {
				return e.index2 === t ? (r = !0, !1) : !!r;
			});
			i === -1 && (r = !1, i = Ve(c, function(e) {
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
		return l[n] ? !1 : (l[n] = !0, !0);
	});
}
function Nn(e, t) {
	return Mn(e, t).map(function(e) {
		return e.pos;
	});
}
function Pn(e, t) {
	return wn(Nn(e, t));
}
//#endregion
//#region node_modules/gesto/dist/gesto.esm.js
var Fn = function(e, t) {
	return Fn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Fn(e, t);
};
function In(e, t) {
	Fn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Ln = function() {
	return Ln = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Ln.apply(this, arguments);
};
function Rn(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function zn(e) {
	return Rn([e[0].clientX, e[0].clientY], [e[1].clientX, e[1].clientY]) / Math.PI * 180;
}
function Bn(e) {
	return e.touches && e.touches.length >= 2;
}
function Vn(e) {
	return e ? e.touches ? Gn(e.touches) : [Kn(e)] : [];
}
function Hn(e) {
	return e && (e.type.indexOf("mouse") > -1 || "button" in e);
}
function Un(e, t, n) {
	var r = n.length, i = qn(e, r), a = i.clientX, o = i.clientY, s = i.originalClientX, c = i.originalClientY, l = qn(t, r), u = l.clientX, d = l.clientY, f = qn(n, r), p = f.clientX, m = f.clientY;
	return {
		clientX: s,
		clientY: c,
		deltaX: a - u,
		deltaY: o - d,
		distX: a - p,
		distY: o - m
	};
}
function Wn(e) {
	return Math.sqrt((e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2);
}
function Gn(e) {
	for (var t = Math.min(e.length, 2), n = [], r = 0; r < t; ++r) n.push(Kn(e[r]));
	return n;
}
function Kn(e) {
	return {
		clientX: e.clientX,
		clientY: e.clientY
	};
}
function qn(e, t) {
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
var Jn = /* @__PURE__ */ function() {
	function e(e) {
		this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = e, this.prevClients = e, this.length = e.length;
	}
	return e.prototype.getAngle = function(e) {
		return e === void 0 && (e = this.prevClients), zn(e);
	}, e.prototype.getRotation = function(e) {
		return e === void 0 && (e = this.prevClients), zn(e) - zn(this.startClients);
	}, e.prototype.getPosition = function(e, t) {
		e === void 0 && (e = this.prevClients);
		var n = Un(e || this.prevClients, this.prevClients, this.startClients), r = n.deltaX, i = n.deltaY;
		return this.movement += Math.sqrt(r * r + i * i), this.prevClients = e, n;
	}, e.prototype.getPositions = function(e) {
		e === void 0 && (e = this.prevClients);
		for (var t = this.prevClients, n = this.startClients, r = Math.min(this.length, t.length), i = [], a = 0; a < r; ++a) i[a] = Un([e[a]], [t[a]], [n[a]]);
		return i;
	}, e.prototype.getMovement = function(e) {
		var t = this.movement;
		if (!e) return t;
		var n = qn(e, this.length), r = qn(this.prevClients, this.length), i = n.clientX - r.clientX, a = n.clientY - r.clientY;
		return Math.sqrt(i * i + a * a) + t;
	}, e.prototype.getDistance = function(e) {
		return e === void 0 && (e = this.prevClients), Wn(e);
	}, e.prototype.getScale = function(e) {
		return e === void 0 && (e = this.prevClients), Wn(e) / Wn(this.startClients);
	}, e.prototype.move = function(e, t) {
		this.startClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		}), this.prevClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		});
	}, e;
}(), Yn = ["textarea", "input"], Xn = /* @__PURE__ */ function(e) {
	In(t, e);
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
							var y = v.tagName.toLowerCase(), b = Yn.indexOf(y) > -1, x = v.isContentEditable;
							if (b || x) {
								if (u || !d && _ === v) return !1;
								if (_ && (_ === v || x && _.isContentEditable && _.contains(v))) if (d) v.blur();
								else return !1;
							} else if ((l || e.type === "touchstart") && _) {
								var S = _.tagName.toLowerCase();
								(_.isContentEditable || Yn.indexOf(S) > -1) && _.blur();
							}
							(f || p || m) && ct(r._window, "click", r._onClick, !0);
						}
						r.clientStores = [new Jn(Vn(e))], r._isIdle = !1, r.flag = !0, r.isDrag = !1, r._isTrusted = t, r._dragFlag = !0, r._prevInputEvent = e, r.data = {}, r.doubleFlag = Be() - r.prevTime < 200, r._isMouseEvent = Hn(e), !r._isMouseEvent && r._preventMouseEvent && r._allowMouseEvent(), (r._preventMouseEvent || r.emit("dragStart", Ln(Ln({
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
						ct(a, "touchstart", r.onDragStart, { passive: !1 });
					}))) : h && o && lt(a, "touchstart", r.onDragStart), r.flag && Bn(e)) {
						if (clearTimeout(C), g && e.touches.length !== e.changedTouches.length) return;
						r.pinchFlag || r.onPinchStart(e);
					}
				}
			}
		}, r.onDrag = function(e, t) {
			if (r.flag) {
				var n = r.options.preventDefault;
				!r._isMouseEvent && n && e.preventDefault(), r._prevInputEvent = e;
				var i = Vn(e), a = r.moveClients(i, e, !1);
				if (r._dragFlag) {
					if ((r.pinchFlag || a.deltaX || a.deltaY) && (r._preventMouseEvent || r.emit("drag", Ln(Ln({}, a), {
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
				}), !s && !o && a && !c && r._allowClickEvent(), r._useTouch && n && lt(i, "touchstart", r.onDragStart), r.pinchFlag && r.onPinchEnd(e);
				var l = e?.touches ? Vn(e) : [];
				l.length === 0 || !r.options.keepDragging ? r.flag = !1 : r._addStore(new Jn(l));
				var u = r._getPosition(), d = Be(), f = !c && r.doubleFlag;
				r._prevInputEvent = null, r.prevTime = c || f ? 0 : d, r.flag || (r._dettachDragEvent(), r._preventMouseEvent || r.emit("dragEnd", Ln({
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
			lt(r._window, "click", r._onClick, !0);
		}, r._onClick = function(e) {
			r._allowClickEvent(), r._allowMouseEvent();
			var t = r.options.preventClickEventByCondition;
			t?.(e) || (e.stopPropagation(), e.preventDefault());
		}, r._onContextMenu = function(e) {
			r.options.preventRightClick ? r.onDragEnd(e) : e.preventDefault();
		}, r._passCallback = function() {};
		var i = [].concat(t), a = i[0];
		r._window = mt(a) ? a : pt(a), r.options = Ln({
			checkInput: !1,
			container: a && !("document" in a) ? pt(a) : a,
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
			ct(e, "dragstart", r.onDragStart);
		}), r._useMouse && (i.forEach(function(e) {
			ct(e, "mousedown", r.onDragStart), ct(e, "mousemove", r._passCallback);
		}), ct(s, "contextmenu", r._onContextMenu)), l && ct(pt(), "blur", r.onBlur), r._useTouch) {
			var u = { passive: !1 };
			i.forEach(function(e) {
				ct(e, "touchstart", r.onDragStart, u), ct(e, "touchmove", r._passCallback, u);
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
		return e === void 0 && (e = this._prevInputEvent), Ln(Ln({
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
		this.off(), lt(this._window, "blur", this.onBlur), this._useDrag && t.forEach(function(t) {
			lt(t, "dragstart", e.onDragStart);
		}), this._useMouse && (t.forEach(function(t) {
			lt(t, "mousedown", e.onDragStart);
		}), lt(n, "contextmenu", this._onContextMenu)), this._useTouch && (t.forEach(function(t) {
			lt(t, "touchstart", e.onDragStart);
		}), lt(n, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
	}, t.prototype.onPinchStart = function(e) {
		var t = this, n = this.options.pinchThreshold;
		if (!(this.isDrag && this.getMovement() > n)) {
			var r = new Jn(Vn(e));
			this.pinchFlag = !0, this._addStore(r), this.emit("pinchStart", Ln(Ln({
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
			this.isPinch = !0, this.emit("pinch", Ln(Ln({
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
			this.emit("pinchEnd", Ln(Ln({
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
		return !i && this.isDrag && (a = !0), Ln(Ln({
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
		return Ln(Ln({}, n), {
			distX: i,
			distY: a
		});
	}, t.prototype._attchDragEvent = function() {
		var e = this._window, t = this.options.container, n = { passive: !1 };
		this._isDragAPI && (ct(t, "dragover", this.onDrag, n), ct(e, "dragend", this.onDragEnd)), this._useMouse && (ct(t, "mousemove", this.onDrag), ct(e, "mouseup", this.onDragEnd)), this._useTouch && (ct(t, "touchmove", this.onDrag, n), ct(e, "touchend", this.onDragEnd, n), ct(e, "touchcancel", this.onDragEnd, n));
	}, t.prototype._dettachDragEvent = function() {
		var e = this._window, t = this.options.container;
		this._isDragAPI && (lt(t, "dragover", this.onDrag), lt(e, "dragend", this.onDragEnd)), this._useMouse && (lt(t, "mousemove", this.onDrag), lt(e, "mouseup", this.onDragEnd)), this._useTouch && (lt(t, "touchstart", this.onDragStart), lt(t, "touchmove", this.onDrag), lt(e, "touchend", this.onDragEnd), lt(e, "touchcancel", this.onDragEnd));
	}, t.prototype._allowMouseEvent = function() {
		this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
	}, t;
}(fn);
//#endregion
//#region node_modules/css-styled/dist/styled.esm.js
function Zn(e) {
	for (var t = 5381, n = e.length; n;) t = t * 33 ^ e.charCodeAt(--n);
	return t >>> 0;
}
var Qn = Zn;
function $n(e) {
	return Qn(e).toString(36);
}
function er(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function tr(e, t, n) {
	return n.original ? t : t.replace(/([^};{\s}][^};{]*|^\s*){/gm, function(t, n) {
		var r = n.trim();
		return (r ? Ie(r) : [""]).map(function(t) {
			var n = t.trim();
			return n.indexOf("@") === 0 ? n : n.indexOf(":global") > -1 ? n.replace(/\:global/g, "") : n.indexOf(":host") > -1 ? `${n.replace(/\:host/g, `.${e}`)}` : n ? `.${e} ${n}` : `.${e}`;
		}).join(", ") + " {";
	});
}
function nr(e, t, n, r, i) {
	var a = ut(r), o = a.createElement("style");
	return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", e), o.setAttribute("data-styled-count", "1"), n.nonce && o.setAttribute("nonce", n.nonce), o.innerHTML = tr(e, t, n), (i || a.head || a.body).appendChild(o), o;
}
function rr(e) {
	var t = "rCS" + $n(e);
	return {
		className: t,
		inject: function(n, r) {
			r === void 0 && (r = {});
			var i = er(n), a = (i || n.ownerDocument || document).querySelector(`style[data-styled-id="${t}"]`);
			if (!a) a = nr(t, e, r, n, i);
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
var ir = function() {
	return ir = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, ir.apply(this, arguments);
};
function ar(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function or(e, t) {
	var n = rr(t), r = n.className;
	return (0, C.forwardRef)(function(t, i) {
		var a = t.className, o = a === void 0 ? "" : a;
		t.cspNonce;
		var s = ar(t, ["className", "cspNonce"]), c = (0, C.useRef)();
		return (0, C.useImperativeHandle)(i, function() {
			return c.current;
		}, []), (0, C.useEffect)(function() {
			var e = n.inject(c.current, { nonce: t.cspNonce });
			return function() {
				e.destroy();
			};
		}, []), (0, C.createElement)(e, ir({
			ref: c,
			"data-styled-id": r,
			className: `${o} ${r}`
		}, s));
	});
}
//#endregion
//#region node_modules/react-moveable/dist/moveable.esm.js
var sr = function(e, t) {
	return sr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, sr(e, t);
};
function cr(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	sr(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var K = function() {
	return K = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, K.apply(this, arguments);
};
function lr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function ur(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
function dr(e) {
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
function q(e, t) {
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
function J(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
function fr(e, t) {
	return K({
		events: [],
		props: [],
		name: e
	}, t);
}
var pr = [
	"n",
	"w",
	"s",
	"e"
], mr = [
	"n",
	"w",
	"s",
	"e",
	"nw",
	"ne",
	"sw",
	"se"
];
function hr(e, t) {
	return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${32 * e}px" height="${32 * e}px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${t}deg);transform-origin: 16px 16px"></path></svg>`;
}
function gr(e) {
	var t = hr(1, e), n = Math.round(e / 45) * 45 % 180, r = "ns-resize";
	return n === 135 ? r = "nwse-resize" : n === 45 ? r = "nesw-resize" : n === 90 && (r = "ew-resize"), `cursor:${r};cursor: url('${t}') 16 16, ${r};`;
}
var _r = se(), vr = _r.browser.webkit, yr = vr && (function() {
	var e = typeof window > "u" ? { userAgent: "" } : window.navigator, t = /applewebkit\/([^\s]+)/g.exec(e.userAgent.toLowerCase());
	return t ? parseFloat(t[1]) < 605 : !1;
})(), br = _r.browser.name, xr = parseInt(_r.browser.version, 10), Sr = br === "chrome", Cr = _r.browser.chromium, wr = parseInt(_r.browser.chromiumVersion, 10) || 0, Tr = Sr && xr >= 109 || Cr && wr >= 109, Er = br === "firefox", Dr = parseInt(_r.browser.webkitVersion, 10) >= 612 || xr >= 15, Or = "moveable-", kr = `
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
${mr.map(function(e) {
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
${gr(e)}
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

${yr ? ":global svg *:before {\ncontent:\"\";\ntransform-origin: inherit;\n}" : ""}
`, Ar = [
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
], jr = 1e-4, Mr = 1e-7, Nr = 1e-9, Pr = 10 ** 10, Fr = -Pr, Ir = {
	n: [0, -1],
	e: [1, 0],
	s: [0, 1],
	w: [-1, 0],
	nw: [-1, -1],
	ne: [1, -1],
	sw: [-1, 1],
	se: [1, 1]
}, Lr = {
	n: [0, 1],
	e: [1, 3],
	s: [3, 2],
	w: [2, 0],
	nw: [0],
	ne: [1],
	sw: [2],
	se: [3]
}, Rr = {
	n: 0,
	s: 180,
	w: 270,
	e: 90,
	nw: 315,
	ne: 45,
	sw: 225,
	se: 135
}, zr = [
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
function Br(e, t, n, r, i, a) {
	a === void 0 && (a = "draggable");
	var o = t.gestos[a]?.move(n, e.inputEvent) ?? {}, s = o.originalDatas || o.datas, c = s[a] || (s[a] = {});
	return K(K({}, i ? Xs(t, o) : o), {
		isPinch: !!r,
		parentEvent: !0,
		datas: c,
		originalDatas: e.originalDatas
	});
}
var Vr = /* @__PURE__ */ function() {
	function e(e) {
		var t;
		e === void 0 && (e = "draggable"), this.ableName = e, this.prevX = 0, this.prevY = 0, this.startX = 0, this.startY = 0, this.isDrag = !1, this.isFlag = !1, this.datas = { draggable: {} }, this.datas = (t = {}, t[e] = {}, t);
	}
	return e.prototype.dragStart = function(e, t) {
		this.isDrag = !1, this.isFlag = !1;
		var n = t.originalDatas;
		return this.datas = n, n[this.ableName] || (n[this.ableName] = {}), K(K({}, this.move(e, t.inputEvent)), { type: "dragstart" });
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
function Hr(e, t, n, r) {
	var i = e.length === 16 ? 4 : 3, a = q(ms(e, n, r, i), 4), o = q(a[0], 2), s = o[0], c = o[1], l = q(a[1], 2), u = l[0], d = l[1], f = q(a[2], 2), p = f[0], m = f[1], h = q(a[3], 2), g = h[0], _ = h[1], v = q(ps(e, t, i), 2), y = v[0], b = v[1], x = Math.min(s, u, p, g), S = Math.min(c, d, m, _), C = Math.max(s, u, p, g), w = Math.max(c, d, m, _);
	s = s - x || 0, u = u - x || 0, p = p - x || 0, g = g - x || 0, c = c - S || 0, d = d - S || 0, m = m - S || 0, _ = _ - S || 0, y = y - x || 0, b = b - S || 0;
	var T = e[0], E = e[i + 1], D = hc(T * E);
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
function Ur(e, t) {
	var n = t.clientX, r = t.clientY, i = t.datas, a = e.state, o = a.moveableClientRect, s = a.rootMatrix, c = a.is3d, l = a.pos1, u = o.left, d = o.top, f = c ? 4 : 3, p = q(G(Ys(s, [n - u, r - d], f), l), 2), m = p[0], h = p[1], g = q(Zr({
		datas: i,
		distX: m,
		distY: h
	}), 2);
	return [g[0], g[1]];
}
function Wr(e, t) {
	var n = t.datas, r = e.state, i = r.allMatrix, a = r.beforeMatrix, o = r.is3d, s = r.left, c = r.top, l = r.origin, u = r.offsetMatrix, d = r.targetMatrix, f = r.transformOrigin, p = o ? 4 : 3;
	n.is3d = o, n.matrix = i, n.targetMatrix = d, n.beforeMatrix = a, n.offsetMatrix = u, n.transformOrigin = f, n.inverseMatrix = bt(i, p), n.inverseBeforeMatrix = bt(a, p), n.absoluteOrigin = wt(Ot([s, c], l), p), n.startDragBeforeDist = jt(n.inverseBeforeMatrix, n.absoluteOrigin, p), n.startDragDist = jt(n.inverseMatrix, n.absoluteOrigin, p);
}
function Gr(e) {
	return Hr(e.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function Kr(e, t, n) {
	var r = t.datas, i = t.originalDatas.beforeRenderable, a = r.transformIndex, o = i.nextTransforms, s = o.length, c = i.nextTransformAppendedIndexes, l = -1;
	a === -1 ? (n === "translate" ? l = 0 : n === "rotate" && (l = Ve(o, function(e) {
		return e.match(/scale\(/g);
	})), l === -1 && (l = o.length), r.transformIndex = l) : l = He(c, function(e) {
		return e.index === a && e.functionName === n;
	}) ? a : a + c.filter(function(e) {
		return e.index < a;
	}).length;
	var u = nc(o, e.state, l), d = u.targetFunction, f = n === "rotate" ? "rotateZ" : n;
	r.beforeFunctionTexts = u.beforeFunctionTexts, r.afterFunctionTexts = u.afterFunctionTexts, r.beforeTransform = u.beforeFunctionMatrix, r.beforeTransform2 = u.beforeFunctionMatrix2, r.targetTansform = u.targetFunctionMatrix, r.afterTransform = u.afterFunctionMatrix, r.afterTransform2 = u.afterFunctionMatrix2, r.targetAllTransform = u.allFunctionMatrix, d.functionName === f ? (r.afterFunctionTexts.splice(0, 1), r.isAppendTransform = !1) : s > l && (r.isAppendTransform = !0, i.nextTransformAppendedIndexes = J(J([], q(c), !1), [{
		functionName: n,
		index: l,
		isAppend: !0
	}], !1));
}
function qr(e, t, n) {
	return `${e.beforeFunctionTexts.join(" ")} ${e.isAppendTransform ? n : t} ${e.afterFunctionTexts.join(" ")}`;
}
function Jr(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = q(Xr({
		datas: t,
		distX: n,
		distY: r
	}), 2), a = i[0], o = i[1];
	return jt(Yr(t, Ct([a, o], 4)), wt([
		0,
		0,
		0
	], 4), 4);
}
function Yr(e, t, n) {
	var r = e.beforeTransform, i = e.afterTransform, a = e.beforeTransform2, o = e.afterTransform2, s = e.targetAllTransform, c = n ? Dt(s, t, 4) : Dt(t, s, 4);
	return Dt(Dt(bt(n ? a : r, 4), c, 4), bt(n ? o : i, 4), 4);
}
function Xr(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = t.inverseBeforeMatrix, a = t.is3d, o = t.startDragBeforeDist, s = t.absoluteOrigin, c = a ? 4 : 3;
	return G(jt(i, Ot(s, [n, r]), c), o);
}
function Zr(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.inverseBeforeMatrix, o = n.inverseMatrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return G(jt(t ? a : o, Ot(u, [r, i]), d), t ? c : l);
}
function Qr(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.beforeMatrix, o = n.matrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return G(jt(t ? a : o, Ot(t ? c : l, [r, i]), d), u);
}
function $r(e, t, n, r, i, a) {
	return r === void 0 && (r = t), i === void 0 && (i = n), a === void 0 && (a = [0, 0]), e ? e.map(function(e, o) {
		var s = Re(e), c = s.value, l = s.unit, u = o ? i : r, d = o ? n : t;
		return e === "%" || isNaN(c) ? d * (u ? a[o] / u : 0) : l === "%" ? d * c / 100 : c;
	}) : a;
}
function ei(e) {
	var t = [];
	return e[1] >= 0 && (e[0] >= 0 && t.push(3), e[0] <= 0 && t.push(2)), e[1] <= 0 && (e[0] >= 0 && t.push(1), e[0] <= 0 && t.push(0)), t;
}
function ti(e, t) {
	return ei(t).map(function(t) {
		return e[t];
	});
}
function ni(e, t) {
	var n = (t + 1) / 2;
	return [Ce(e[0][0], e[1][0], n, 1 - n), Ce(e[0][1], e[1][1], n, 1 - n)];
}
function ri(e, t) {
	return ni([ni([e[0], e[1]], t[0]), ni([e[2], e[3]], t[0])], t[1]);
}
function ii(e, t, n, r, i, a) {
	var o = ri(ms(t, n, r, i), a);
	return [e[0] - o[0], e[1] - o[1]];
}
function ai(e, t, n, r) {
	return Dt(e, Qo(t, r, n), r);
}
function oi(e, t, n, r) {
	var i = e.transformOrigin, a = e.offsetMatrix, o = e.is3d ? 4 : 3, s;
	if (De(n)) {
		var c = t.beforeTransform, l = t.afterTransform;
		s = Tt(r ? Kt(n) : Dt(Dt(c, Kt([n]), 4), l, 4), 4, o);
	} else s = n;
	return ai(a, s, i, o);
}
function si(e, t) {
	var n = e.transformOrigin, r = e.offsetMatrix, i = e.is3d, a = e.targetMatrix, o = e.targetAllTransform, s = i ? 4 : 3;
	return ai(r, Dt(o || a, Vt(t, s), s), n, s);
}
function ci(e, t) {
	var n = fi(t);
	return {
		setTransform: function(r, i) {
			i === void 0 && (i = -1), n.startTransforms = Ee(r) ? r : Fe(r), ui(e, t, i);
		},
		setTransformIndex: function(n) {
			ui(e, t, n);
		}
	};
}
function li(e, t, n) {
	var r = fi(t).startTransforms;
	ui(e, t, Ve(r, function(e) {
		return e.indexOf(`${n}(`) === 0;
	}));
}
function ui(e, t, n) {
	var r = fi(t), i = t.datas;
	if (i.transformIndex = n, n !== -1) {
		var a = r.startTransforms[n];
		if (a) {
			var o = e.state;
			i.startValue = Yt([a], {
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
function di(e, t) {
	var n = fi(e);
	n.nextTransforms = Fe(t);
}
function fi(e) {
	return e.originalDatas.beforeRenderable;
}
function pi(e) {
	return e.originalDatas.beforeRenderable.nextTransforms;
}
function mi(e) {
	return (pi(e) || []).join(" ");
}
function hi(e) {
	return fi(e).nextStyle;
}
function gi(e, t, n, r, i) {
	di(i, t);
	var a = to.drag(e, Br(i, e.state, n, r, !1)), o = a ? a.transform : t;
	return K(K({
		transform: t,
		drag: a
	}, Ls({ transform: o }, i)), { afterTransform: o });
}
function _i(e, t, n, r, i, a) {
	return xi(e, n, r, oi(e.state, i, t, a));
}
function vi(e, t, n, r, i, a, o) {
	var s = _i(e, t, n, i, a, o), c = e.state, l = c.left, u = c.top, d = e.props.groupable, f = d ? l : 0, p = d ? u : 0;
	return G(G(r, s), [f, p]);
}
function yi(e, t, n, r, i, a, o) {
	return vi(e, t, n, r, i, a, o);
}
function bi(e, t, n) {
	return [t ? -1 + e[0] / (t / 2) : 0, n ? -1 + e[1] / (n / 2) : 0];
}
function xi(e, t, n, r) {
	r === void 0 && (r = e.state.allMatrix);
	var i = e.state, a = i.width, o = i.height, s = i.is3d ? 4 : 3, c = [a / 2 * (1 + t[0]) + n[0], o / 2 * (1 + t[1]) + n[1]];
	return ps(r, c, s);
}
function Si(e, t, n) {
	var r = n.fixedDirection, i = n.fixedPosition, a = n.fixedOffset;
	return vi(e, `rotate(${t}deg)`, r, i, a, n);
}
function Ci(e, t, n, r, i, a) {
	var o = e.props.groupable, s = e.state, c = s.transformOrigin, l = s.offsetMatrix, u = s.is3d, d = s.width, f = s.height, p = s.left, m = s.top, h = a.fixedDirection, g = a.nextTargetMatrix || s.targetMatrix, _ = u ? 4 : 3, v = $r(i, t, n, d, f, c), y = o ? p : 0, b = o ? m : 0;
	return G(ii(r, ai(l, g, v, _), t, n, _, h), [y, b]);
}
function wi(e, t) {
	return ri(Ps(e.state), t);
}
function Ti(e, t) {
	var n = e.targetGesto, r = e.controlGesto, i;
	return n?.isFlag() && (i = n.getEventData()[t]), !i && r?.isFlag() && (i = r.getEventData()[t]), i || {};
}
function Ei(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function Di(e) {
	var t = e("scale"), n = e("rotate"), r = e("translate"), i = [];
	return r && r !== "0px" && r !== "none" && i.push(`translate(${r.split(/\s+/).join(",")})`), n && n !== "1" && n !== "none" && i.push(`rotate(${n})`), t && t !== "1" && t !== "none" && i.push(`scale(${t.split(/\s+/).join(",")})`), i;
}
function Oi(e, t, n) {
	for (var r = e, i = [], a = dt(e) || ft(e), o = !n && e === t || e === a, s = o, c = !1, l = 3, u, d, f, p = !1, m = is(t, t, !0).offsetParent, h = 1; r && !s;) {
		s = o;
		var g = Fi(r), _ = g("position"), v = rs(r), y = _ === "fixed", b = Di(g), x = kt(Zo(v)), S = void 0, C = !1, w = !1, T = 0, E = 0, D = 0, O = 0, k = {
			hasTransform: !1,
			fixedContainer: null
		};
		y && (p = !0, k = cs(r), m = k.fixedContainer);
		var A = x.length;
		!c && (A === 16 || b.length) && (c = !0, l = 4, ss(i), f &&= Tt(f, 3, 4)), c && A === 9 && (x = Tt(x, 3, 4));
		var j = as(r, e), M = j.tagName, N = j.hasOffset, P = j.isSVG, F = j.origin, I = j.targetOrigin, L = j.offset, R = q(L, 2), z = R[0], B = R[1];
		M === "svg" && !r.ownerSVGElement && f && (i.push({
			type: "target",
			target: r,
			matrix: ds(r, l)
		}), i.push({
			type: "offset",
			target: r,
			matrix: Bt(l)
		}));
		var ee = parseFloat(g("zoom")) || 1;
		if (y) S = k.fixedContainer, C = !0;
		else {
			var V = is(r, t, !1, !0, g), te = V.offsetZoom;
			if (S = V.offsetParent, C = V.isEnd, w = V.isStatic, h *= te, (V.isCustomElement || te !== 1) && w) z -= S.offsetLeft, B -= S.offsetTop;
			else if ((Er || Tr) && V.parentSlotElement) {
				for (var ne = S, re = 0, H = 0; ne && Ei(ne);) re += ne.offsetLeft, H += ne.offsetTop, ne = ne.offsetParent;
				z -= re, B -= H;
			}
		}
		if (vr && !Dr && N && !P && w && (_ === "relative" || _ === "static") && (z -= S.offsetLeft, B -= S.offsetTop, o ||= C), y) N && k.hasTransform && (D = S.clientLeft, O = S.clientTop);
		else if (N && m !== S && (T = S.clientLeft, E = S.clientTop), N && S === a) {
			var U = os(r, !1);
			z += U[0], B += U[1];
		}
		if (i.push({
			type: "target",
			target: r,
			matrix: Qo(x, l, F)
		}), b.length && (i.push({
			type: "offset",
			target: r,
			matrix: Bt(l)
		}), i.push({
			type: "target",
			target: r,
			matrix: Qo(Kt(b), l, F)
		})), N) {
			var ie = r === e, ae = ie ? 0 : r.scrollLeft, oe = ie ? 0 : r.scrollTop;
			i.push({
				type: "offset",
				target: r,
				matrix: Ht([z - ae + T - D, B - oe + E - O], l)
			});
		} else i.push({
			type: "offset",
			target: r,
			origin: F
		});
		if (ee !== 1 && i.push({
			type: "zoom",
			target: r,
			matrix: Qo(Vt([ee, ee], l), l, [0, 0])
		}), f ||= x, u ||= F, d ||= I, s || y) break;
		r = S, o = C, (!n || r === a) && (s = o);
	}
	return f ||= Bt(l), u ||= [0, 0], d ||= [0, 0], {
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
var ki = null, Ai = null, ji = null;
function Mi(e) {
	e ? (window.Map && (ki = /* @__PURE__ */ new Map(), Ai = /* @__PURE__ */ new Map()), ji = []) : (ki = null, ji = null, Ai = null);
}
function Ni(e) {
	var t = Ai?.get(e);
	if (t) return t;
	var n = ks(e, !0);
	return Ai && Ai.set(e, n), n;
}
function Pi(e, t) {
	if (ji) {
		var n = He(ji, function(n) {
			return n[0][0] == e && n[0][1] == t;
		});
		if (n) return n[1];
	}
	var r = Oi(e, t, !0);
	return ji && ji.push([[e, t], r]), r;
}
function Fi(e) {
	var t = ki?.get(e);
	if (!t) {
		var n = pt(e).getComputedStyle(e);
		if (!ki) return function(e) {
			return n[e];
		};
		t = {
			style: n,
			cached: {}
		}, ki.set(e, t);
	}
	var r = t.cached, i = t.style;
	return function(e) {
		return e in r || (r[e] = i[e]), r[e];
	};
}
function Ii(e, t, n) {
	var r = n.originalDatas;
	r.groupable = r.groupable || {};
	var i = r.groupable;
	i.childDatas = i.childDatas || [];
	var a = i.childDatas;
	return e.moveables.map(function(e, r) {
		return a[r] = a[r] || {}, a[r][t] = a[r][t] || {}, K(K({}, n), {
			isRequestChild: !0,
			datas: a[r][t],
			originalDatas: a[r]
		});
	});
}
function Li(e, t, n, r, i, a, o) {
	var s = !!n.match(/Start$/g), c = !!n.match(/End$/g), l = i.isPinch, u = i.datas, d = Ii(e, t.name, i), f = e.moveables, p = [], m = d.map(function(e, i) {
		var d = f[i], m = d.state, h = m.gestos, g = e;
		if (s) g = new Vr(o).dragStart(r, e), p.push(g);
		else {
			if (h[o] || (h[o] = u.childGestos[i]), !h[o]) return;
			g = Br(e, m, r, l, a, o), p.push(g);
		}
		var _ = t[n](d, K(K({}, g), { parentFlag: !0 }));
		return c && (h[o] = null), _;
	});
	return s && (u.childGestos = f.map(function(e) {
		return e.state.gestos[o];
	})), {
		eventParams: m,
		childEvents: p
	};
}
function Ri(e, t, n, r, i, a) {
	i === void 0 && (i = function(e, t) {
		return t;
	});
	var o = !!n.match(/End$/g), s = Ii(e, t.name, r), c = e.moveables;
	return s.map(function(e, r) {
		var s = c[r], l = e;
		l = i(s, e);
		var u = t[n](s, K(K({}, l), { parentFlag: !0 }));
		return u && a && a(s, e, u, r), o && (s.state.gestos = {}), u;
	});
}
function zi(e, t, n, r) {
	var i = n.fixedDirection, a = n.fixedPosition, o = ri(r.datas.startPositions || Ps(t.state), i), s = q(jt(zt(-e.rotation / 180 * Math.PI, 3), [
		o[0] - a[0],
		o[1] - a[1],
		1
	], 3), 2), c = s[0], l = s[1];
	return r.datas.originalX = c, r.datas.originalY = l, r;
}
function Bi(e, t, n, r) {
	var i = e.getState(), a = i.renderPoses, o = i.rotation, s = i.direction, c = Cs(e.props, t).zoom, l = Ro(o / Math.PI * 180), u = {}, d = e.renderState;
	d.renderDirectionMap ||= {};
	var f = d.renderDirectionMap;
	n.forEach(function(e) {
		var t = e.dir;
		u[t] = !0;
	});
	var p = hc(s);
	return n.map(function(e) {
		var n = e.data, i = e.classNames, s = e.dir, d = Lr[s];
		if (!d || !u[s]) return null;
		f[s] = !0;
		var m = (W(l, 15) + p * Rr[s] + 720) % 180, h = {};
		return Ge(n).forEach(function(e) {
			h[`data-${e}`] = n[e];
		}), r.createElement("div", K({
			className: Y.apply(void 0, J([
				"control",
				"direction",
				s,
				t
			], q(i), !1)),
			"data-rotation": m,
			"data-direction": s
		}, h, {
			key: `direction-${s}`,
			style: Ss.apply(void 0, J([o, c], q(d.map(function(e) {
				return a[e];
			})), !1))
		}));
	});
}
function Vi(e, t, n, r) {
	var i = Cs(e.props, n), a = i.renderDirections, o = a === void 0 ? t : a, s = i.displayAroundControls;
	if (!o) return [];
	var c = o === !0 ? mr : o;
	return J(J([], q(s ? qi(e, r, n, c) : []), !1), q(Bi(e, n, c.map(function(e) {
		return {
			data: {},
			classNames: [],
			dir: e
		};
	}), r)), !1);
}
function Hi(e, t, n, r, i, a) {
	var o = [...arguments].slice(6), s = Qe(n, r), c = t ? W(s / Math.PI * 180, 15) % 180 : -1;
	return e.createElement("div", {
		key: `line-${a}`,
		className: Y.apply(void 0, J([
			"line",
			"direction",
			t ? "edge" : "",
			t
		], q(o), !1)),
		"data-rotation": c,
		"data-line-key": a,
		"data-direction": t,
		style: xs(n, r, i, s)
	});
}
function Ui(e, t, n, r, i) {
	return (n === !0 ? pr : n).map(function(n, a) {
		var o = q(Lr[n], 2), s = o[0], c = o[1];
		if (c != null) return Hi(e, n, r[s], r[c], i, `${t}Edge${a}`, t);
	}).filter(Boolean);
}
function Wi(e) {
	return function(t, n) {
		var r = Cs(t.props, e).edge;
		return r && (r === !0 || r.length) ? J(J([], q(Ui(n, e, r, t.getState().renderPoses, t.props.zoom)), !1), q(Ki(t, e, n)), !1) : Gi(t, e, n);
	};
}
function Gi(e, t, n) {
	return Vi(e, mr, t, n);
}
function Ki(e, t, n) {
	return Vi(e, [
		"nw",
		"ne",
		"sw",
		"se"
	], t, n);
}
function qi(e, t, n, r) {
	var i = e.renderState;
	i.renderDirectionMap ||= {};
	var a = e.getState(), o = a.renderPoses, s = a.rotation, c = a.direction, l = i.renderDirectionMap, u = e.props.zoom, d = hc(c), f = s / Math.PI * 180;
	return (r || Ge(l)).map(function(e) {
		var r = Lr[e];
		if (!r) return null;
		var i = (W(f, 15) + d * Rr[e] + 720) % 180, a = ["around-control"];
		return n && a.push("direction", n), t.createElement("div", {
			className: Y.apply(void 0, J([], q(a), !1)),
			"data-rotation": i,
			"data-direction": e,
			key: `direction-around-${e}`,
			style: Ss.apply(void 0, J([s, u], q(r.map(function(e) {
				return o[e];
			})), !1))
		});
	});
}
function Ji(e, t, n) {
	var r = e || {}, i = r.position, a = i === void 0 ? "client" : i, o = r.left, s = o === void 0 ? -Infinity : o, c = r.top, l = c === void 0 ? -Infinity : c, u = r.right, d = u === void 0 ? Infinity : u, f = r.bottom, p = {
		position: a,
		left: s,
		top: l,
		right: d,
		bottom: f === void 0 ? Infinity : f
	};
	return {
		vertical: Zi(p, t, !0),
		horizontal: Zi(p, n, !1)
	};
}
function Yi(e, t) {
	var n = e.state, r = n.containerClientRect, i = r.clientHeight, a = r.clientWidth, o = r.clientLeft, s = r.clientTop, c = n.snapOffset, l = c.left, u = c.top, d = c.right, f = c.bottom, p = t || e.props.bounds || {}, m = (p.position || "client") === "css", h = p.left, g = h === void 0 ? -Infinity : h, _ = p.top, v = _ === void 0 ? -Infinity : _, y = p.right, b = y === void 0 ? m ? -Infinity : Infinity : y, x = p.bottom, S = x === void 0 ? m ? -Infinity : Infinity : x;
	return m && (b = a + d - l - b, S = i + f - u - S), {
		left: g + l - o,
		right: b + l - o,
		top: v + u - s,
		bottom: S + u - s
	};
}
function Xi(e, t, n) {
	var r = Yi(e), i = r.left, a = r.top, o = r.right, s = r.bottom, c = q(n, 2), l = c[0], u = c[1], d = q(G(n, t), 2), f = d[0], p = d[1];
	Q(f) < Mr && (f = 0), Q(p) < Mr && (p = 0);
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
function Zi(e, t, n) {
	var r = e[n ? "left" : "top"], i = e[n ? "right" : "bottom"], a = Math.min.apply(Math, J([], q(t), !1)), o = Math.max.apply(Math, J([], q(t), !1)), s = [];
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
		return Q(t.offset) - Q(e.offset);
	});
}
function Qi(e, t, n) {
	return (n ? e.map(function(e) {
		return It(e, n);
	}) : e).some(function(e) {
		return e[0] < t.left && Q(e[0] - t.left) > .1 || e[0] > t.right && Q(e[0] - t.right) > .1 || e[1] < t.top && Q(e[1] - t.top) > .1 || e[1] > t.bottom && Q(e[1] - t.bottom) > .1;
	});
}
function $i(e, t, n) {
	var r = ys(e), i = Math.sqrt(r * r - t * t) || 0;
	return [i, -i].sort(function(t, r) {
		return Q(t - e[+!n]) - Q(r - e[+!n]);
	}).map(function(e) {
		return Qe([0, 0], n ? [e, t] : [t, e]);
	});
}
function ea(e, t, n, r, i) {
	if (!e.props.bounds) return [];
	var a = i * Math.PI / 180, o = Yi(e), s = o.left, c = o.top, l = o.right, u = o.bottom, d = s - r[0], f = l - r[0], p = c - r[1], m = u - r[1], h = {
		left: d,
		top: p,
		right: f,
		bottom: m
	};
	if (!Qi(n, h, 0)) return [];
	var g = [];
	return [
		[d, 0],
		[f, 0],
		[p, 1],
		[m, 1]
	].forEach(function(e) {
		var r = q(e, 2), i = r[0], o = r[1];
		n.forEach(function(e) {
			var n = Qe([0, 0], e);
			g.push.apply(g, J([], q($i(e, i, o).map(function(e) {
				return a + e - n;
			}).filter(function(e) {
				return !Qi(t, h, e);
			}).map(function(e) {
				return W(e * 180 / Math.PI, Mr);
			})), !1));
		});
	}), g;
}
var ta = [
	"left",
	"right",
	"center"
], na = [
	"top",
	"bottom",
	"middle"
], ra = {
	left: "start",
	right: "end",
	center: "center",
	top: "start",
	bottom: "end",
	middle: "center"
}, ia = {
	start: "left",
	end: "right",
	center: "center"
}, aa = {
	start: "top",
	end: "bottom",
	center: "middle"
};
function oa() {
	return {
		left: !1,
		top: !1,
		right: !1,
		bottom: !1
	};
}
function sa(e, t) {
	var n = e.props, r = n.snappable, i = n.bounds, a = n.innerBounds, o = n.verticalGuidelines, s = n.horizontalGuidelines, c = n.snapGridWidth, l = n.snapGridHeight, u = e.state, d = u.guidelines, f = u.enableSnap;
	return !r || !f || t && r !== !0 && r.indexOf(t) < 0 ? !1 : !!(c || l || i || a || d && d.length || o && o.length || s && s.length);
}
function ca(e) {
	return e === !1 ? {} : e === !0 || !e ? {
		left: !0,
		right: !0,
		top: !0,
		bottom: !0
	} : e;
}
function la(e, t) {
	var n = ca(e), r = {};
	for (var i in n) i in t && n[i] && (r[i] = t[i]);
	return r;
}
function ua(e, t) {
	var n = la(e, t), r = na.filter(function(e) {
		return e in n;
	}), i = ta.filter(function(e) {
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
function da(e, t, n) {
	var r = ps(e, [t.clientLeft, t.clientTop], n);
	return [t.left + r[0], t.top + r[1]];
}
function fa(e) {
	var t = q(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	Math.abs(i) < 1e-7 && (i = 0), Math.abs(a) < 1e-7 && (a = 0);
	var o = 0, s = 0, c = 0;
	return i ? a ? (o = -a / i, s = 1, c = o * n[0] - n[1]) : (s = 1, c = -n[1]) : (o = -1, c = n[0]), [
		o,
		s,
		c
	].map(function(e) {
		return W(e, be);
	});
}
var pa = "snapRotationThreshold", ma = "snapRotationDegrees", ha = "snapHorizontalThreshold", ga = "snapVerticalThreshold";
function _a(e, t, n, r, i, a, o) {
	r === void 0 && (r = []), i === void 0 && (i = []);
	var s = e.props, c = e.state.snapThresholdInfo?.multiples || [1, 1], l = Ws(o, s[ha], 5), u = Ws(a, s[ga], 5);
	return va(e.state.guidelines, t, n, r, i, l, u, c);
}
function va(e, t, n, r, i, a, o, s) {
	return {
		vertical: Ca(e, "vertical", t, o * s[0], r),
		horizontal: Ca(e, "horizontal", n, a * s[1], i)
	};
}
function ya(e, t, n) {
	var r = q(n, 2), i = r[0], a = r[1], o = q(t, 2), s = o[0], c = o[1], l = q(G(n, t), 2), u = l[0], d = l[1], f = d > 0, p = u > 0;
	u = $s(u), d = $s(d);
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
	var g = _a(e, u ? [i] : [], d ? [a] : [], [], [], void 0, void 0), _ = g.vertical, v = g.horizontal;
	_.posInfos.filter(function(e) {
		var t = e.pos;
		return p ? t >= s : t <= s;
	}), v.posInfos.filter(function(e) {
		var t = e.pos;
		return f ? t >= c : t <= c;
	}), _.isSnap = _.posInfos.length > 0, v.isSnap = v.posInfos.length > 0;
	var y = Sa(_), b = y.isSnap, x = y.guideline, S = Sa(v), C = S.isSnap, w = S.guideline, T = C ? w.pos[1] : 0, E = b ? x.pos[0] : 0;
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
function ba(e) {
	var t = "";
	return e === -1 || e === "top" || e === "left" ? t = "start" : e === 0 || e === "center" || e === "middle" ? t = "center" : (e === 1 || e === "right" || e === "bottom") && (t = "end"), t;
}
function xa(e, t, n, r) {
	var i = ua(e.props.snapDirections, t), a = _a(e, i.vertical, i.horizontal, i.verticalNames.map(function(e) {
		return ba(e);
	}), i.horizontalNames.map(function(e) {
		return ba(e);
	}), n, r), o = ba(i.horizontalNames[a.horizontal.index]), s = ba(i.verticalNames[a.vertical.index]);
	return {
		vertical: K(K({}, a.vertical), { direction: s }),
		horizontal: K(K({}, a.horizontal), { direction: o })
	};
}
function Sa(e) {
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
function Ca(e, t, n, r, i) {
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
					dist: Q(t),
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
function wa(e, t, n, r, i) {
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
	}) : e.props.keepRatio ? a.push([-1, -1], [-1, 1], [1, -1], [1, 1], n) : (a.push.apply(a, J([], q(ti([
		[-1, -1],
		[1, -1],
		[-1, -1],
		[1, 1]
	], n)), !1)), a.length > 1 && a.push([(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2]));
	var o = a.map(function(e) {
		return ri(t, e);
	}), s = _a(e, o.map(function(e) {
		return e[0];
	}), o.map(function(e) {
		return e[1];
	}), a.map(function(e) {
		return ba(e[0]);
	}), a.map(function(e) {
		return ba(e[1]);
	}), r, i), c = ba(a.map(function(e) {
		return e[0];
	})[s.vertical.index]), l = ba(a.map(function(e) {
		return e[1];
	})[s.horizontal.index]);
	return {
		vertical: K(K({}, s.vertical), { direction: c }),
		horizontal: K(K({}, s.horizontal), { direction: l })
	};
}
function Ta(e, t) {
	var n = Q(e.offset), r = Q(t.offset);
	return e.isBound && t.isBound ? r - n : e.isBound ? -1 : t.isBound ? 1 : e.isSnap && t.isSnap ? r - n : e.isSnap ? -1 : t.isSnap || n < Mr ? 1 : r < Mr ? -1 : n - r;
}
function Ea(e, t) {
	return e.slice().sort(function(e, n) {
		var r = e.sign[t], i = n.sign[t], a = e.offset[t], o = n.offset[t];
		return r ? i ? Ta({
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
function Da(e, t, n) {
	var r = [];
	if (n) Q(t[0]) !== 1 || Q(t[1]) !== 1 ? r.push([t, [-1, -1]], [t, [-1, 1]], [t, [1, -1]], [t, [1, 1]]) : r.push([t, [e[0], -e[1]]], [t, [-e[0], e[1]]]), r.push([t, e]);
	else if (e[0] && e[1] || !e[0] && !e[1]) {
		var i = e[0] ? e : [1, 1];
		[1, -1].forEach(function(e) {
			[1, -1].forEach(function(n) {
				var a = [e * i[0], n * i[1]];
				t[0] === a[0] && t[1] === a[1] || r.push([t, a]);
			});
		});
	} else if (e[0]) {
		var a = Q(t[0]) === 1 ? [1] : [1, -1];
		a.forEach(function(n) {
			r.push([[t[0], -1], [n * e[0], -1]], [[t[0], 0], [n * e[0], 0]], [[t[0], 1], [n * e[0], 1]]);
		});
	} else if (e[1]) {
		var a = Q(t[1]) === 1 ? [1] : [1, -1];
		a.forEach(function(n) {
			r.push([[-1, t[1]], [-1, n * e[1]]], [[0, t[1]], [0, n * e[1]]], [[1, t[1]], [1, n * e[1]]]);
		});
	}
	return r;
}
function Oa(e, t) {
	var n = Ze([t[0][0], t[1][0]]), r = Ze([t[0][1], t[1][1]]);
	return {
		vertical: n <= e[0],
		horizontal: r <= e[1]
	};
}
function ka(e, t) {
	var n = q(t, 2), r = n[0], i = n[1], a = i[0] - r[0], o = i[1] - r[1];
	Q(a) < Mr && (a = 0), Q(o) < Mr && (o = 0);
	var s, c;
	return a ? o ? (s = o / a * (e[0] - r[0]) + r[1], c = e[1]) : (s = r[1], c = e[1]) : (s = r[0], c = e[0]), s - c;
}
function Aa(e, t, n, r) {
	return r === void 0 && (r = Mr), e.every(function(e) {
		var i = ka(e, t);
		return i <= 0 === n || Q(i) <= r;
	});
}
function ja(e, t, n, r, i) {
	return i === void 0 && (i = 0), r && t - i <= e || !r && e <= n + i ? {
		isBound: !0,
		offset: r ? t - e : n - e
	} : {
		isBound: !1,
		offset: 0
	};
}
function Ma(e, t) {
	var n = t.line, r = t.centerSign, i = t.verticalSign, a = t.horizontalSign, o = t.lineConstants, s = e.props.innerBounds;
	if (!s) return {
		isAllBound: !1,
		isBound: !1,
		isVerticalBound: !1,
		isHorizontalBound: !1,
		offset: [0, 0]
	};
	var c = s.left, l = s.top, u = s.width, d = s.height, f = [[c, l], [c, l + d]], p = [[c, l], [c + u, l]], m = [[c + u, l], [c + u, l + d]], h = [[c, l + d], [c + u, l + d]];
	if (Aa([
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
	var g = Na(n, o, p, i), _ = Na(n, o, h, i), v = Na(n, o, f, a), y = Na(n, o, m, a), b = g.isBound && _.isBound, x = g.isBound || _.isBound, S = v.isBound && y.isBound, C = v.isBound || y.isBound, w = Js(g.offset, _.offset), T = Js(v.offset, y.offset), E = [0, 0], D = !1, O = !1;
	return Q(T) < Q(w) ? (E = [w, 0], D = x, O = b) : (E = [0, T], D = C, O = S), {
		isAllBound: O,
		isVerticalBound: x,
		isHorizontalBound: C,
		isBound: D,
		offset: E
	};
}
function Na(e, t, n, r, i, a) {
	var o = q(t, 2), s = o[0], c = o[1], l = e[0], u = n[0], d = n[1], f = $s(d[1] - u[1]), p = $s(d[0] - u[0]), m = c, h = s, g = -s / c;
	if (!p) {
		if (a && !h) return {
			isBound: !1,
			offset: 0
		};
		if (m) return ja(g * (u[0] - l[0]) + l[1], u[1], d[1], r, i);
		var _ = u[0] - l[0], v = Q(_) <= (i || 0);
		return {
			isBound: v,
			offset: v ? _ : 0
		};
	} else if (!f) {
		if (a && !m) return {
			isBound: !1,
			offset: 0
		};
		if (h) return ja((u[1] - l[1]) / g + l[0], u[0], d[0], r, i);
		var _ = u[1] - l[1], v = Q(_) <= (i || 0);
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
function Pa(e, t, n) {
	return t.map(function(t) {
		var r = Ma(e, t), i = r.isBound, a = r.offset, o = r.isVerticalBound, s = r.isHorizontalBound, c = t.multiple;
		return {
			sign: c,
			isBound: i,
			isVerticalBound: o,
			isHorizontalBound: s,
			isSnap: !1,
			offset: Zr({
				datas: n,
				distX: a[0],
				distY: a[1]
			}).map(function(e, t) {
				return e * (c[t] ? 2 / c[t] : 0);
			})
		};
	});
}
function Fa(e, t, n) {
	var r, i = Pa(e, La(e, t, [0, 0], !1).map(function(e) {
		return K(K({}, e), { multiple: e.multiple.map(function(e) {
			return Q(e) * 2;
		}) });
	}), n), a = Ea(i, 0), o = Ea(i, 1), s = 0, c = 0, l = a.isVerticalBound || o.isVerticalBound, u = a.isHorizontalBound || o.isHorizontalBound;
	return (l || u) && (r = q(Qr({
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
function Ia(e, t) {
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
function La(e, t, n, r) {
	var i = e.state, a = i.allMatrix, o = i.is3d, s = ms(a, 100, 100, o ? 4 : 3), c = ri(s, [0, 0]);
	return Ia(n, r).map(function(e) {
		var n = q(e, 3), r = n[0], i = n[1], a = n[2], o = [ri(s, i), ri(s, a)], l = fa(o), u = Oa(c, o), d = u.vertical, f = u.horizontal;
		return {
			multiple: r,
			centerSign: ka(c, o) <= 0,
			verticalSign: d,
			horizontalSign: f,
			lineConstants: l,
			line: [ri(t, i), ri(t, a)]
		};
	});
}
function Ra(e, t, n, r) {
	var i = r ? e.map(function(e) {
		return It(e, r);
	}) : e;
	return [
		[i[0], i[1]],
		[i[1], i[3]],
		[i[3], i[2]],
		[i[2], i[0]]
	].some(function(e) {
		return !Aa(t, e, ka(n, e) <= 0);
	});
}
function za(e) {
	var t = q(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return Q(n[0]);
	if (!a) return Q(n[1]);
	var o = a / i;
	return Q((-o * n[0] + n[1]) / Math.sqrt(o ** 2 + 1));
}
function Ba(e) {
	var t = q(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return [n[0], 0];
	if (!a) return [0, n[1]];
	var o = a / i, s = -o * n[0] + n[1];
	return [-s / (o + 1 / o), s / (o * o + 1)];
}
function Va(e, t, n, r, i) {
	var a = e.props.innerBounds, o = i * Math.PI / 180;
	if (!a) return [];
	var s = a.left, c = a.top, l = a.width, u = a.height, d = s - r[0], f = s + l - r[0], p = c - r[1], m = c + u - r[1], h = [
		[d, p],
		[f, p],
		[d, m],
		[f, m]
	], g = ri(n, [0, 0]);
	if (!Ra(n, h, g, 0)) return [];
	var _ = [], v = h.map(function(e) {
		return [ys(e), Qe([0, 0], e)];
	});
	return [
		[n[0], n[1]],
		[n[1], n[3]],
		[n[3], n[2]],
		[n[2], n[0]]
	].forEach(function(e) {
		var n = Qe([0, 0], Ba(e)), r = za(e);
		_.push.apply(_, J([], q(v.filter(function(e) {
			var t = q(e, 1)[0];
			return t && r <= t;
		}).map(function(e) {
			var t = q(e, 2), i = t[0], a = t[1], s = Math.acos(i ? r / i : 0), c = a + s, l = a - s;
			return [o + c - n, o + l - n];
		}).reduce(function(e, t) {
			return e.push.apply(e, J([], q(t), !1)), e;
		}, []).filter(function(e) {
			return !Ra(t, h, g, e);
		}).map(function(e) {
			return W(e * 180 / Math.PI, Mr);
		})), !1));
	}), _;
}
function Ha(e) {
	var t = e.props.innerBounds, n = oa();
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
	], a = ri(i, [0, 0]), o = t.left, s = t.top, c = t.width, l = t.height, u = [[o, s], [o, s + l]], d = [[o, s], [o + c, s]], f = [[o + c, s], [o + c, s + l]], p = [[o, s + l], [o + c, s + l]], m = La(e, i, [0, 0], !1), h = [], g = [];
	return m.forEach(function(e) {
		var t = e.line, r = e.lineConstants, i = Oa(a, t), m = i.horizontal, _ = i.vertical, v = Na(t, r, d, _, 1, !0), y = Na(t, r, p, _, 1, !0), b = Na(t, r, u, m, 1, !0), x = Na(t, r, f, m, 1, !0);
		v.isBound && !n.top && (h.push(s), n.top = !0), y.isBound && !n.bottom && (h.push(s + l), n.bottom = !0), b.isBound && !n.left && (g.push(o), n.left = !0), x.isBound && !n.right && (g.push(o + c), n.right = !0);
	}), {
		boundMap: n,
		horizontal: h,
		vertical: g
	};
}
function Ua(e, t, n, r) {
	var i = t[0] - e[0], a = t[1] - e[1];
	if (Q(i) < 1e-7 && (i = 0), Q(a) < 1e-7 && (a = 0), !i) return r ? [0, 0] : [0, n];
	if (!a) return r ? [n, 0] : [0, 0];
	var o = a / i, s = e[1] - o * e[0];
	return r ? [n, o * (t[0] + n) + s - t[1]] : [(t[1] + n - s) / o - t[0], n];
}
function Wa(e, t, n, r, i) {
	var a = Ua(e, t, n, r);
	if (!a) return {
		isOutside: !1,
		offset: [0, 0]
	};
	var o = tt(e, t), s = tt(a, e), c = tt(a, t), l = s > o || c > o, u = q(Zr({
		datas: i,
		distX: a[0],
		distY: a[1]
	}), 2);
	return {
		offset: [u[0], u[1]],
		isOutside: l
	};
}
function Ga(e, t) {
	return e.isBound ? e.offset : t.isSnap ? Sa(t).offset : 0;
}
function Ka(e, t, n, r, i) {
	var a = q(t, 2), o = a[0], s = a[1], c = q(n, 2), l = c[0], u = c[1], d = q(r, 2), f = d[0], p = d[1], m = q(i, 2), h = m[0], g = m[1], _ = -h, v = -g;
	if (e && o && s) {
		_ = 0, v = 0;
		var y = [];
		if (l && u ? y.push([0, g], [h, 0]) : l ? y.push([h, 0]) : u ? y.push([0, g]) : f && p ? y.push([0, g], [h, 0]) : f ? y.push([h, 0]) : p && y.push([0, g]), y.length) {
			y.sort(function(e, t) {
				return ys(G([o, s], e)) - ys(G([o, s], t));
			});
			var b = y[0];
			if (b[0] && Q(o) > 1e-7) _ = -b[0], v = s * Q(o + _) / Q(o) - s;
			else if (b[1] && Q(s) > 1e-7) {
				var x = s;
				v = -b[1], _ = o * Q(s + v) / Q(x) - o;
			}
			if (e && u && l) if (Q(_) > 1e-7 && Q(_) < Q(h)) {
				var S = Q(h) / Q(_);
				_ *= S, v *= S;
			} else if (Q(v) > 1e-7 && Q(v) < Q(g)) {
				var S = Q(g) / Q(v);
				_ *= S, v *= S;
			} else _ = Js(-h, _), v = Js(-g, v);
		}
	} else _ = o || l ? -h : 0, v = s || u ? -g : 0;
	return [_, v];
}
function qa(e, t, n, r, i, a) {
	if (!sa(e, "draggable")) return [{
		isSnap: !1,
		isBound: !1,
		offset: 0
	}, {
		isSnap: !1,
		isBound: !1,
		offset: 0
	}];
	var o = Ns(a.absolutePoses, [t, n]), s = hs(o), c = s.left, l = s.right, u = s.top, d = s.bottom, f = {
		horizontal: o.map(function(e) {
			return e[1];
		}),
		vertical: o.map(function(e) {
			return e[0];
		})
	}, p = Ja(e, i, ua(ca(e.props.snapDirections), {
		left: c,
		right: l,
		top: u,
		bottom: d,
		center: (c + l) / 2,
		middle: (u + d) / 2
	}), f), m = p.vertical, h = p.horizontal, g = Fa(e, o, a), _ = g.vertical, v = g.horizontal, y = m.isSnap, b = h.isSnap, x = m.isBound || _.isBound, S = h.isBound || v.isBound, C = Js(m.offset, _.offset), w = Js(h.offset, v.offset), T = q(Ka(r, [t, n], [x, S], [y, b], [C, w]), 2), E = T[0], D = T[1];
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
function Ja(e, t, n, r) {
	r === void 0 && (r = n);
	var i = Ji(Yi(e), r.vertical, r.horizontal), a = i.horizontal, o = i.vertical, s = t ? {
		horizontal: {
			isSnap: !1,
			index: -1
		},
		vertical: {
			isSnap: !1,
			index: -1
		}
	} : _a(e, n.vertical, n.horizontal, void 0, void 0, void 0, void 0), c = s.horizontal, l = s.vertical, u = Ga(a[0], c), d = Ga(o[0], l), f = Q(u), p = Q(d);
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
function Ya(e, t, n, r, i, a, o) {
	o === void 0 && (o = [1, 1]);
	var s = Ji(t, n, r), c = s.horizontal, l = s.vertical, u = va(e, n, r, [], [], i, a, o), d = u.horizontal, f = u.vertical, p = Ga(c[0], d), m = Ga(l[0], f), h = Q(p), g = Q(m);
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
function Xa(e, t, n, r) {
	var i = Qe(e, t) / Math.PI * 180, a = n.vertical, o = a.isBound, s = a.isSnap, c = a.dist, l = n.horizontal, u = l.isBound, d = l.isSnap, f = l.dist, p = i % 180, m = p < 3 || p > 177, h = p > 87 && p < 93;
	return f < c && (o || s && !h && (!r || !m)) ? "vertical" : u || d && !m && (!r || !h) ? "horizontal" : "";
}
function Za(e, t, n, r, i, a) {
	return n.map(function(n) {
		var o = q(n, 2), s = o[0], c = o[1], l = ri(t, s), u = ri(t, c), d = r ? $a(e, l, u, i) : Ja(e, i, {
			vertical: [u[0]],
			horizontal: [u[1]]
		}), f = d.horizontal, p = f.offset, m = f.isBound, h = f.isSnap, g = d.vertical, _ = g.offset, v = g.isBound, y = g.isSnap, b = G(c, s);
		if (!_ && !p) return {
			isBound: v || m,
			isSnap: y || h,
			sign: b,
			offset: [0, 0]
		};
		var x = Xa(l, u, d, r);
		if (!x) return {
			sign: b,
			isBound: !1,
			isSnap: !1,
			offset: [0, 0]
		};
		var S = x === "vertical", C = [0, 0];
		return C = !r && Q(c[0]) === 1 && Q(c[1]) === 1 && s[0] !== c[0] && s[1] !== c[1] ? Zr({
			datas: a,
			distX: -_,
			distY: -p
		}) : Wa(l, u, -(S ? _ : p), S, a).offset, C = C.map(function(e, t) {
			return e * (b[t] ? 2 / b[t] : 0);
		}), {
			sign: b,
			isBound: S ? v : m,
			isSnap: S ? y : h,
			offset: C
		};
	});
}
function Qa(e, t) {
	return e.isBound ? e.offset : t.isSnap ? t.offset : 0;
}
function $a(e, t, n, r) {
	var i = Xi(e, t, n), a = i.horizontal, o = i.vertical, s = r ? {
		horizontal: { isSnap: !1 },
		vertical: { isSnap: !1 }
	} : ya(e, t, n), c = s.horizontal, l = s.vertical, u = Qa(a, c), d = Qa(o, l), f = Q(u), p = Q(d);
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
function eo(e, t, n, r, i) {
	var a = [-n[0], -n[1]], o = e.state, s = o.width, c = o.height, l = e.props.bounds, u = Infinity, d = Infinity;
	if (l) {
		var f = [[n[0], -n[1]], [-n[0], n[1]]], p = l.left, m = p === void 0 ? -Infinity : p, h = l.top, g = h === void 0 ? -Infinity : h, _ = l.right, v = _ === void 0 ? Infinity : _, y = l.bottom, b = y === void 0 ? Infinity : y;
		f.forEach(function(e) {
			var n = e[0] !== a[0], o = e[1] !== a[1], l = ri(t, e), f = Qe(r, l) * 360 / Math.PI;
			if (o) {
				var p = l.slice();
				(Q(f - 360) < 2 || Q(f - 180) < 2) && (p[1] = r[1]);
				var h = Wa(r, p, (r[1] < l[1] ? b : g) - l[1], !1, i), _ = q(h.offset, 2)[1], y = h.isOutside;
				isNaN(_) || (d = c + (y ? 1 : -1) * Q(_));
			}
			if (n) {
				var p = l.slice();
				(Q(f - 90) < 2 || Q(f - 270) < 2) && (p[0] = r[0]);
				var x = Wa(r, p, (r[0] < l[0] ? v : m) - l[0], !0, i), S = q(x.offset, 1)[0], C = x.isOutside;
				isNaN(S) || (u = s + (C ? 1 : -1) * Q(S));
			}
		});
	}
	return {
		maxWidth: u,
		maxHeight: d
	};
}
var to = {
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
		var u = ys(l), d = Qe(l, [0, 0]);
		return [t.createElement("div", {
			className: Y("line", "horizontal", "dragline", "dashed"),
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
		o.draggable = i || e.targetGesto, n.datas = {}, n.left = parseFloat(s.left || "") || 0, n.top = parseFloat(s.top || "") || 0, n.bottom = parseFloat(s.bottom || "") || 0, n.right = parseFloat(s.right || "") || 0, n.startValue = [0, 0], Wr(e, t), li(e, t, "translate"), Wo(e, n), n.prevDist = [0, 0], n.prevBeforeDist = [0, 0], n.isDrag = !1, n.deltaOffset = [0, 0];
		var c = X(e, t, K({ set: function(e) {
			n.startValue = e;
		} }, ci(e, t)));
		return (r || Z(e, "onDragStart", c)) === !1 ? (o.draggable = null, n.isPinch = !1) : (n.isDrag = !0, e.state.dragInfo = {
			startRect: e.getRect(),
			dist: [0, 0]
		}), n.isDrag ? c : !1;
	},
	drag: function(e, t) {
		if (t) {
			Kr(e, t, "translate");
			var n = t.datas, r = t.parentEvent, i = t.parentFlag, a = t.isPinch, o = t.deltaOffset, s = t.useSnap, c = t.isRequest, l = t.isGroup, u = t.parentThrottleDrag, d = t.distX, f = t.distY, p = n.isDrag, m = n.prevDist, h = n.prevBeforeDist, g = n.startValue;
			if (p) {
				o && (d += o[0], f += o[1]);
				var _ = e.props, v = _.parentMoveable, y = l ? 0 : _.throttleDrag || u || 0, b = r ? 0 : _.throttleDragRotate || 0, x = 0, S = !1, C = !1, w = !1, T = !1;
				if (!r && b > 0 && (d || f)) {
					var E = _.startDragRotate || 0, D = W(E + Qe([0, 0], [d, f]) * 180 / Math.PI, b) - E, O = f * Math.abs(Math.cos((D - 90) / 180 * Math.PI)), k = ys([d * Math.abs(Math.cos(D / 180 * Math.PI)), O]);
					x = D * Math.PI / 180, d = k * Math.cos(x), f = k * Math.sin(x);
				}
				if (!a && !r && !i) {
					var A = q(qa(e, d, f, b, !s && c || o, n), 2), j = A[0], M = A[1];
					S = j.isSnap, C = j.isBound, w = M.isSnap, T = M.isBound;
					var N = j.offset, P = M.offset;
					d += N, f += P;
				}
				var F = Ot(Xr({
					datas: n,
					distX: d,
					distY: f
				}), g), I = Ot(Jr({
					datas: n,
					distX: d,
					distY: f
				}), g);
				nt(I, Mr), nt(F, Mr), b || (!S && !C && (I[0] = W(I[0], y), F[0] = W(F[0], y)), !w && !T && (I[1] = W(I[1], y), F[1] = W(F[1], y)));
				var L = G(F, g), R = G(I, g), z = G(R, m), B = G(L, h);
				n.prevDist = R, n.prevBeforeDist = L, n.passDelta = z, n.passDist = R;
				var ee = n.left + L[0], V = n.top + L[1], te = n.right - L[0], ne = n.bottom - L[1], re = qr(n, `translate(${I[0]}px, ${I[1]}px)`, `translate(${R[0]}px, ${R[1]}px)`);
				if (di(t, re), e.state.dragInfo.dist = r ? [0, 0] : R, !(!r && !v && z.every(function(e) {
					return !e;
				}) && B.some(function(e) {
					return !e;
				}))) {
					var H = e.state, U = H.width, ie = H.height, ae = X(e, t, K({
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
					}, Ls({ transform: re }, t)));
					return !r && Z(e, "onDrag", ae), ae;
				}
			}
		}
	},
	dragAfter: function(e, t) {
		var n = t.datas, r = n.deltaOffset;
		return r[0] || r[1] ? (n.deltaOffset = [0, 0], this.drag(e, K(K({}, t), { deltaOffset: r }))) : !1;
	},
	dragEnd: function(e, t) {
		var n = t.parentEvent, r = t.datas;
		if (e.state.dragInfo = null, r.isDrag) {
			r.isDrag = !1;
			var i = zs(e, t, {});
			return !n && Z(e, "onDragEnd", i), i;
		}
	},
	dragGroupStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY, a = this.dragStart(e, t);
		if (!a) return !1;
		var o = Li(e, this, "dragStart", [r || 0, i || 0], t, !1, "draggable"), s = o.childEvents, c = o.eventParams;
		n.isDrag = Z(e, "onDragGroupStart", K(K({}, a), {
			targets: e.props.targets,
			events: c
		})) !== !1;
		var l = s[0]?.datas.startValue ?? [0, 0];
		return n.throttleOffset = [l[0] % 1, l[1] % 1], n.isDrag ? a : !1;
	},
	dragGroup: function(e, t) {
		if (t.datas.isDrag) {
			var n = this.drag(e, K(K({}, t), { parentThrottleDrag: e.props.throttleDrag })), r = t.datas.passDelta, i = Li(e, this, "drag", r, t, !1, "draggable").eventParams;
			if (n) {
				var a = K({
					targets: e.props.targets,
					events: i
				}, n);
				return Z(e, "onDragGroup", a), a;
			}
		}
	},
	dragGroupEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isDrag) {
			this.dragEnd(e, t);
			var r = Li(e, this, "dragEnd", [0, 0], t, !1, "draggable").eventParams;
			return Z(e, "onDragGroupEnd", zs(e, t, {
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
function no(e, t) {
	return {
		fixedPosition: ri(e, t),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function ro(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3;
	return {
		fixedPosition: ps(n, [i / 2 * (1 + t[0]), a / 2 * (1 + t[1])], o),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function io(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3, s = bi(t, i, a);
	return {
		fixedPosition: ps(n, t, o),
		fixedDirection: s,
		fixedOffset: [i ? 0 : t[0], a ? 0 : t[1]]
	};
}
var ao = tc("resizable"), oo = {
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
	render: Wi("resizable"),
	dragControlCondition: ao,
	viewClassName: ec("resizable"),
	dragControlStart: function(e, t) {
		var n = t.inputEvent, r = t.isPinch, i = t.isGroup, a = t.parentDirection, o = t.parentGesto, s = t.datas, c = t.parentFixedDirection, l = t.parentEvent, u = js(a, r, n, s), d = e.state, f = d.target, p = d.width, m = d.height, h = d.gestos;
		if (!u || !f || h.resizable) return !1;
		h.resizable = o || e.controlGesto, !r && Wr(e, t), s.datas = {}, s.direction = u, s.startOffsetWidth = p, s.startOffsetHeight = m, s.prevWidth = 0, s.prevHeight = 0, s.minSize = [0, 0], s.startWidth = d.inlineCSSWidth || d.cssWidth, s.startHeight = d.inlineCSSHeight || d.cssHeight, s.maxSize = [Infinity, Infinity], i || (s.minSize = [d.minOffsetWidth, d.minOffsetHeight], s.maxSize = [d.maxOffsetWidth, d.maxOffsetHeight]);
		var g = e.props.transformOrigin || "% %";
		s.transformOrigin = g && De(g) ? g.split(" ") : g, s.startOffsetMatrix = d.offsetMatrix, s.startTransformOrigin = d.transformOrigin, s.isWidth = t?.parentIsWidth ?? (!u[0] && !u[1] || u[0] || !u[1]);
		function _(e) {
			s.ratio = e && isFinite(e) ? e : 0;
		}
		s.startPositions = Ps(e.state);
		function v(e) {
			var t = no(s.startPositions, e);
			s.fixedDirection = t.fixedDirection, s.fixedPosition = t.fixedPosition, s.fixedOffset = t.fixedOffset;
		}
		function y(t) {
			var n = io(e.state, t);
			s.fixedDirection = n.fixedDirection, s.fixedPosition = n.fixedPosition, s.fixedOffset = n.fixedOffset;
		}
		function b(e) {
			s.minSize = [Ke(`${e[0]}`, 0) || 0, Ke(`${e[1]}`, 0) || 0];
		}
		function x(e) {
			var t = [e[0] || Infinity, e[1] || Infinity];
			(!Oe(t[0]) || isFinite(t[0])) && (t[0] = Ke(`${t[0]}`, 0) || Infinity), (!Oe(t[1]) || isFinite(t[1])) && (t[1] = Ke(`${t[1]}`, 0) || Infinity), s.maxSize = t;
		}
		_(p / m), v(c || [-u[0], -u[1]]), s.setFixedDirection = v, s.setFixedPosition = y, s.setMin = b, s.setMax = x;
		var S = X(e, t, {
			direction: u,
			startRatio: s.ratio,
			set: function(e) {
				var t = q(e, 2), n = t[0], r = t[1];
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
			dragStart: to.dragStart(e, new Vr().dragStart([0, 0], t))
		}), C = l || Z(e, "onResizeStart", S);
		return s.startFixedDirection = s.fixedDirection, s.startFixedPosition = s.fixedPosition, C !== !1 && (s.isResize = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: u
		}), s.isResize ? S : !1;
	},
	dragControl: function(e, t) {
		var n, r = t.datas, i = t.parentFlag, a = t.isPinch, o = t.parentKeepRatio, s = t.dragClient, c = t.parentDist, l = t.useSnap, u = t.isRequest, d = t.isGroup, f = t.parentEvent, p = t.resolveMatrix, m = r.isResize, h = r.transformOrigin, g = r.startWidth, _ = r.startHeight, v = r.prevWidth, y = r.prevHeight, b = r.minSize, x = r.maxSize, S = r.ratio, C = r.startOffsetWidth, w = r.startOffsetHeight, T = r.isWidth;
		if (!m) return;
		if (p) {
			var E = e.state.is3d, D = r.startOffsetMatrix, O = r.startTransformOrigin, k = E ? 4 : 3, A = Kt(pi(t)), j = Math.sqrt(A.length);
			k !== j && (A = Tt(A, j, k));
			var M = ai(D, A, O, k);
			r.startPositions = ms(M, C, w, k), r.nextTargetMatrix = A, r.nextAllMatrix = M;
		}
		var N = Cs(e.props, "resizable"), P = N.resizeFormat, F = N.throttleResize, I = F === void 0 ? +!i : F, L = N.parentMoveable, R = N.keepRatioFinally, z = r.direction, B = z, ee = 0, V = 0;
		!z[0] && !z[1] && (B = [1, 1]);
		var te = S && (o ?? N.keepRatio) || !1;
		function ne() {
			var e = r.fixedDirection, n = lc(B, te, r, t);
			ee = n.distWidth, V = n.distHeight;
			var i = B[0] - e[0] || te ? Math.max(C + ee, Mr) : C, a = B[1] - e[1] || te ? Math.max(w + V, Mr) : w;
			return te && C && w && (T ? a = i / S : i = a * S), [i, a];
		}
		var re = q(ne(), 2), H = re[0], U = re[1];
		f || (r.setFixedDirection(r.fixedDirection), Z(e, "onBeforeResize", X(e, t, {
			startFixedDirection: r.startFixedDirection,
			startFixedPosition: r.startFixedPosition,
			setFixedDirection: function(e) {
				var t;
				return r.setFixedDirection(e), t = q(ne(), 2), H = t[0], U = t[1], [H, U];
			},
			setFixedPosition: function(e) {
				var t;
				return r.setFixedPosition(e), t = q(ne(), 2), H = t[0], U = t[1], [H, U];
			},
			boundingWidth: H,
			boundingHeight: U,
			setSize: function(e) {
				var t = q(e, 2);
				H = t[0], U = t[1];
			}
		}, !0)));
		var ie = s;
		s || (ie = !i && a ? wi(e, [0, 0]) : r.fixedPosition);
		var ae = [0, 0];
		a || (ae = Ho(e, H, U, z, ie, !l && u, r)), c && (!c[0] && (ae[0] = 0), !c[1] && (ae[1] = 0));
		function oe() {
			var e;
			P && (e = q(P([H, U]), 2), H = e[0], U = e[1]), H = W(H, I), U = W(U, I);
		}
		if (te) {
			B[0] && B[1] && ae[0] && ae[1] && (Q(ae[0]) > Q(ae[1]) ? ae[1] = 0 : ae[0] = 0);
			var se = !ae[0] && !ae[1];
			se && oe(), B[0] && !B[1] || ae[0] && !ae[1] || se && T ? (H += ae[0], U = H / S) : (!B[0] && B[1] || !ae[0] && ae[1] || se && !T) && (U += ae[1], H = U * S);
		} else H += ae[0], U += ae[1], H = Math.max(0, H), U = Math.max(0, U);
		n = q(Ye([H, U], b, x, te ? S : !1), 2), H = n[0], U = n[1], oe(), te && (d || R) && (T ? U = H / S : H = U * S), ee = H - C, V = U - w;
		var ce = [ee - v, V - y];
		r.prevWidth = ee, r.prevHeight = V;
		var le = Ci(e, H, U, ie, h, r);
		if (!(!L && ce.every(function(e) {
			return !e;
		}) && le.every(function(e) {
			return !e;
		}))) {
			var ue = to.drag(e, Br(t, e.state, le, !!a, !1, "draggable")), de = ue.transform, fe = g + ee, pe = _ + V, me = X(e, t, K({
				width: fe,
				height: pe,
				offsetWidth: Math.round(H),
				offsetHeight: Math.round(U),
				startRatio: S,
				boundingWidth: H,
				boundingHeight: U,
				direction: z,
				dist: [ee, V],
				delta: ce,
				isPinch: !!a,
				drag: ue
			}, Rs({
				style: {
					width: `${fe}px`,
					height: `${pe}px`
				},
				transform: de
			}, ue, t)));
			return !f && Z(e, "onResize", me), me;
		}
	},
	dragControlAfter: function(e, t) {
		var n = t.datas, r = n.isResize, i = n.startOffsetWidth, a = n.startOffsetHeight, o = n.prevWidth, s = n.prevHeight;
		if (!(!r || e.props.checkResizableError === !1)) {
			var c = e.state, l = c.width, u = c.height, d = l - (i + o), f = u - (a + s), p = Q(d) > 3, m = Q(f) > 3;
			if (p && (n.startWidth += d, n.startOffsetWidth += d, n.prevWidth += d), m && (n.startHeight += f, n.startOffsetHeight += f, n.prevHeight += f), p || m) return this.dragControl(e, t);
		}
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.parentEvent;
		if (n.isResize) {
			n.isResize = !1;
			var i = zs(e, t, {});
			return !r && Z(e, "onResizeEnd", i), i;
		}
	},
	dragGroupControlCondition: ao,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, K(K({}, t), { isGroup: !0 }));
		if (!r) return !1;
		var i = Ii(e, "resizable", t), a = n.startOffsetWidth, o = n.startOffsetHeight;
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
		var l = Ri(e, this, "dragControlStart", t, function(t, r) {
			return zi(e, t, n, r);
		});
		s(), c();
		var u = function(t) {
			r.setFixedDirection(t), l.forEach(function(r, a) {
				r.setFixedDirection(t), zi(e, r.moveable, n, i[a]);
			});
		};
		return n.setFixedDirection = u, n.isResize = Z(e, "onResizeGroupStart", K(K({}, r), {
			targets: e.props.targets,
			events: l.map(function(e) {
				return K(K({}, e), {
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
			var r = Cs(e.props, "resizable");
			Bs(e, "onBeforeResize", function(n) {
				Z(e, "onBeforeResizeGroup", X(e, t, K(K({}, n), { targets: r.targets }), !0));
			});
			var i = this.dragControl(e, K(K({}, t), { isGroup: !0 }));
			if (i) {
				var a = i.boundingWidth, o = i.boundingHeight, s = i.dist, c = r.keepRatio, l = [a / (a - s[0]), o / (o - s[1])], u = n.fixedPosition, d = Ri(e, this, "dragControl", t, function(t, n) {
					var r = q(jt(zt(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * l[0],
						n.datas.originalY * l[1],
						1
					], 3), 2), i = r[0], a = r[1];
					return K(K({}, n), {
						parentDist: null,
						parentScale: l,
						dragClient: Ot(u, [i, a]),
						parentKeepRatio: c
					});
				}), f = K({
					targets: r.targets,
					events: d
				}, i);
				return Z(e, "onResizeGroup", f), f;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isResize) {
			this.dragControlEnd(e, t);
			var r = Ri(e, this, "dragControlEnd", t);
			return Z(e, "onResizeGroupEnd", zs(e, t, {
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
function so(e, t, n, r, i) {
	var a = e.props.groupable, o = e.state, s = o.is3d ? 4 : 3, c = t.origin, l = ps(e.state.rootMatrix, G([c[0], c[1]], a ? [0, 0] : [o.left, o.top]), s), u = Ot([i.left, i.top], l);
	t.startAbsoluteOrigin = u, t.prevDeg = Qe(u, [n, r]) / Math.PI * 180, t.defaultDeg = t.prevDeg, t.prevSnapDeg = 0, t.loop = 0, t.startDist = tt(u, [n, r]);
}
function co(e, t, n) {
	var r = n.defaultDeg, i = n.prevDeg, a = i % 360, o = Math.floor(i / 360);
	a < 0 && (a += 360), a > e && a > 270 && e < 90 ? ++o : a < e && a < 90 && e > 270 && --o;
	var s = t * (o * 360 + e - r);
	return n.prevDeg = r + s, s;
}
function lo(e, t, n, r) {
	return co(Qe(r.startAbsoluteOrigin, [e, t]) / Math.PI * 180, n, r);
}
function uo(e, t, n, r, i, a) {
	var o = e.props.throttleRotate, s = o === void 0 ? 0 : o, c = n.prevSnapDeg, l = 0, u = !1;
	if (a) {
		var d = Vo(e, t, r, i + r);
		u = d.isSnap, l = i + d.dist;
	}
	u || (l = W(i + r, s));
	var f = l - i;
	return n.prevSnapDeg = f, [
		f - c,
		f,
		l
	];
}
function fo(e, t, n) {
	var r = q(t, 4), i = r[0], a = r[1], o = r[2], s = r[3];
	if (e === "none") return [];
	if (Ee(e)) return e.map(function(e) {
		return fo(e, [
			i,
			a,
			o,
			s
		], n)[0];
	});
	var c = q((e || "top").split("-"), 2), l = c[0], u = c[1], d = [i, a];
	l === "left" ? d = [o, i] : l === "right" ? d = [a, s] : l === "bottom" && (d = [s, o]);
	var f = [(d[0][0] + d[1][0]) / 2, (d[0][1] + d[1][1]) / 2], p = Ts(d, n);
	if (u) {
		var m = u === "top" || u === "left", h = l === "bottom" || l === "left";
		f = d[m && !h || !m && h ? 0 : 1];
	}
	return [[f, p]];
}
function po(e, t) {
	if (t.isRequest) return t.requestAble === "rotatable";
	var n = t.inputEvent.target;
	if (at(n, Y("rotation-control")) || e.props.rotateAroundControls && at(n, Y("around-control")) || at(n, Y("control")) && at(n, Y("rotatable"))) return !0;
	var r = e.props.rotationTarget;
	return r ? ac(r, !0).some(function(e) {
		return e ? n === e || n.contains(e) : !1;
	}) : !1;
}
var mo = {
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
		return e.isDragging("rotatable") ? Y("view-rotation-dragging") : "";
	},
	render: function(e, t) {
		var n = Cs(e.props, "rotatable"), r = n.rotatable, i = n.rotationPosition, a = n.zoom, o = n.renderDirections, s = n.rotateAroundControls, c = n.resolveAblesWithRotatable, l = e.getState(), u = l.renderPoses, d = l.direction;
		if (!r) return null;
		var f = fo(i, u, d), p = [];
		if (f.forEach(function(e, n) {
			var r = q(e, 2), i = r[0], o = r[1];
			p.push(t.createElement("div", {
				key: `rotation${n}`,
				className: Y("rotation"),
				style: { transform: `translate(-50%) translate(${i[0]}px, ${i[1]}px) rotate(${o}rad)` }
			}, t.createElement("div", {
				className: Y("line rotation-line"),
				style: { transform: `scaleX(${a})` }
			}), t.createElement("div", {
				className: Y("control rotation-control"),
				style: { transform: `translate(0.5px) scale(${a})` }
			})));
		}), o) {
			var m = Ge(c || {}), h = {};
			m.forEach(function(e) {
				c[e].forEach(function(t) {
					h[t] = e;
				});
			});
			var g = [];
			Ee(o) && (g = o.map(function(e) {
				var t = h[e];
				return {
					data: t ? { resolve: t } : {},
					classNames: t ? ["move"] : [],
					dir: e
				};
			})), p.push.apply(p, J([], q(Bi(e, "rotatable", g, t)), !1));
		}
		return s && p.push.apply(p, J([], q(qi(e, t)), !1)), p;
	},
	dragControlCondition: po,
	dragControlStart: function(e, t) {
		var n, r = t.datas, i = t.clientX, a = t.clientY, o = t.parentRotate, s = t.parentFlag, c = t.isPinch, l = t.isRequest, u = e.state, d = u.target, f = u.left, p = u.top, m = u.direction, h = u.beforeDirection, g = u.targetTransform, _ = u.moveableClientRect, v = u.offsetMatrix, y = u.targetMatrix, b = u.allMatrix, x = u.width, S = u.height;
		if (!l && !d) return !1;
		var C = e.getRect();
		r.rect = C, r.transform = g, r.left = f, r.top = p;
		var w = function(t) {
			var n = io(e.state, t);
			r.fixedDirection = n.fixedDirection, r.fixedOffset = n.fixedOffset, r.fixedPosition = n.fixedPosition, P && P.setFixedPosition(t);
		}, T = function(t) {
			var n = ro(e.state, t);
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
			}, r.afterInfo = K(K({}, r.beforeInfo), { origin: C.origin }), r.absoluteInfo = K(K({}, r.beforeInfo), {
				origin: C.origin,
				startValue: O
			});
		} else {
			var k = t.inputEvent?.target;
			if (k) {
				var A = Ir[k.getAttribute("data-direction") || ""];
				if (A) {
					r.isControl = !0, r.isAroundControl = at(k, Y("around-control")), r.controlDirection = A;
					var j = k.getAttribute("data-resolve");
					j && (r.resolveAble = j), n = q(ri(vs(u.rootMatrix, u.renderPoses, _), A), 2), E = n[0], D = n[1];
				}
			}
			r.beforeInfo = { origin: C.beforeOrigin }, r.afterInfo = { origin: C.origin }, r.absoluteInfo = {
				origin: C.origin,
				startValue: C.rotation
			};
			var M = w;
			w = function(t) {
				var n = u.is3d ? 4 : 3, i = q(Ot(St(y, n), t), 2), a = i[0], o = i[1], s = jt(v, wt([a, o], n)), c = jt(b, wt([t[0], t[1]], n));
				M(t);
				var l = u.posDelta;
				r.beforeInfo.origin = G(s, l), r.afterInfo.origin = G(c, l), r.absoluteInfo.origin = G(c, l), so(e, r.beforeInfo, E, D, _), so(e, r.afterInfo, E, D, _), so(e, r.absoluteInfo, E, D, _);
			}, T = function(e) {
				var t = ri([
					[0, 0],
					[x, 0],
					[0, S],
					[x, S]
				], e);
				w(t);
			};
		}
		r.startClientX = E, r.startClientY = D, r.direction = m, r.beforeDirection = h, r.startValue = 0, r.datas = {}, li(e, t, "rotate");
		var N = !1, P = !1;
		r.isControl && r.resolveAble && r.resolveAble === "resizable" && (P = oo.dragControlStart(e, K(K({}, new Vr("resizable").dragStart([0, 0], t)), {
			parentPosition: r.controlPosition,
			parentFixedPosition: r.fixedPosition
		}))), P || (N = to.dragStart(e, new Vr().dragStart([0, 0], t))), w(As(e));
		var F = X(e, t, K(K({
			set: function(e) {
				r.startValue = e * Math.PI / 180;
			},
			setFixedDirection: T,
			setFixedPosition: w
		}, ci(e, t)), {
			dragStart: N,
			resizeStart: P
		}));
		return r.isRotate = Z(e, "onRotateStart", F) !== !1, u.snapRenderInfo = { request: t.isRequest }, r.isRotate ? F : !1;
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.clientDistX, s = t.clientDistY, c = t.parentRotate, l = t.parentFlag, u = t.isPinch, d = t.groupDelta, f = t.resolveMatrix, p = a.beforeDirection, m = a.beforeInfo, h = a.afterInfo, g = a.absoluteInfo, _ = a.isRotate, v = a.startValue, y = a.rect, b = a.startClientX, x = a.startClientY;
		if (_) {
			Kr(e, t, "rotate");
			var S = p * Gr(t), C = e.props.parentMoveable, w = 0, T, E, D = 0, O, k, A = 0, j, M, N = 180 / Math.PI * v, P = g.startValue, F = !1, I = b + o, L = x + s;
			if (!l && "parentDist" in t) {
				var R = t.parentDist;
				T = R, O = R, j = R;
			} else u || l ? (T = co(c, p, m), O = co(c, S, h), j = co(c, S, g)) : (T = lo(I, L, p, m), O = lo(I, L, S, h), j = lo(I, L, S, g), F = !0);
			if (E = N + T, k = N + O, M = P + j, Z(e, "onBeforeRotate", X(e, t, {
				beforeRotation: E,
				rotation: k,
				absoluteRotation: M,
				setRotation: function(e) {
					O = e - N, T = O, j = O;
				}
			}, !0)), n = q(uo(e, y, m, T, N, F), 3), w = n[0], T = n[1], E = n[2], r = q(uo(e, y, h, O, N, F), 3), D = r[0], O = r[1], k = r[2], i = q(uo(e, y, g, j, P, F), 3), A = i[0], j = i[1], M = i[2], !(!A && !D && !w && !C && !f)) {
				var z = qr(a, `rotate(${k}deg)`, `rotate(${O}deg)`);
				f && (a.fixedPosition = _i(e, a.targetAllTransform, a.fixedDirection, a.fixedOffset, a));
				var B = Si(e, O, a), ee = G(Ot(d || [0, 0], B), a.prevInverseDist || [0, 0]);
				a.prevInverseDist = B, a.requestValue = null;
				var V = gi(e, z, ee, u, t), te = V, ne = tt([I, L], g.startAbsoluteOrigin) - g.startDist, re = void 0;
				if (a.resolveAble === "resizable") {
					var H = oo.dragControl(e, K(K({}, Br(t, e.state, [t.deltaX, t.deltaY], !!u, !1, "resizable")), {
						resolveMatrix: !0,
						parentDistance: ne
					}));
					H && (re = H, te = Rs(te, H, t));
				}
				var U = X(e, t, K(K({
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
				return Z(e, "onRotate", U), U;
			}
		}
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (n.isRotate) {
			n.isRotate = !1;
			var r = zs(e, t, {});
			return Z(e, "onRotateEnd", r), r;
		}
	},
	dragGroupControlCondition: po,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = e.state, i = r.left, a = r.top, o = r.beforeOrigin, s = this.dragControlStart(e, t);
		if (!s) return !1;
		s.set(n.beforeDirection * e.rotation);
		var c = Ri(e, this, "dragControlStart", t, function(e, t) {
			var n = e.state, r = n.left, s = n.top, c = n.beforeOrigin, l = Ot(G([r, s], [i, a]), G(c, o));
			return t.datas.startGroupClient = l, t.datas.groupClient = l, K(K({}, t), { parentRotate: 0 });
		});
		return n.isRotate = Z(e, "onRotateGroupStart", K(K({}, s), {
			targets: e.props.targets,
			events: c
		})) !== !1, n.isRotate ? s : !1;
	},
	dragGroupControl: function(e, t) {
		var n = t.datas;
		if (n.isRotate) {
			Bs(e, "onBeforeRotate", function(n) {
				Z(e, "onBeforeRotateGroup", X(e, t, K(K({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = n.beforeDirection, a = r.beforeDist, o = a / 180 * Math.PI, s = Ri(e, this, "dragControl", t, function(e, t) {
					var n = t.datas.startGroupClient, r = q(t.datas.groupClient, 2), s = r[0], c = r[1], l = q(It(n, o * i), 2), u = l[0], d = l[1], f = [u - s, d - c];
					return t.datas.groupClient = [u, d], K(K({}, t), {
						parentRotate: a,
						groupDelta: f
					});
				});
				e.rotation = i * r.beforeRotation;
				var c = K({
					targets: e.props.targets,
					events: s,
					set: function(t) {
						e.rotation = t;
					},
					setGroupRotation: function(t) {
						e.rotation = t;
					}
				}, r);
				return Z(e, "onRotateGroup", c), c;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isRotate) {
			this.dragControlEnd(e, t);
			var r = Ri(e, this, "dragControlEnd", t);
			return Z(e, "onRotateGroupEnd", zs(e, t, {
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
function ho(e, t) {
	var n, r = e.direction, i = e.classNames, a = e.size, o = e.pos, s = e.zoom, c = e.key, l = r === "horizontal", u = l ? "Y" : "X";
	return t.createElement("div", {
		key: c,
		className: i.join(" "),
		style: (n = {}, n[l ? "width" : "height"] = `${a}`, n.transform = `translate(${o[0]}, ${o[1]}) translate${u}(-50%) scale${u}(${s})`, n)
	});
}
function go(e, t) {
	return ho(K(K({}, e), {
		classNames: J([Y("line", "guideline", e.direction)], q(e.classNames), !1).filter(function(e) {
			return e;
		}),
		size: e.size || `${e.sizeValue}px`,
		pos: e.pos || e.posValue.map(function(e) {
			return `${W(e, .1)}px`;
		})
	}), t);
}
function _o(e, t, n, r, i, a, o, s) {
	var c = e.props.zoom;
	return n.map(function(e, n) {
		var l = e.type, u = e.pos, d = [0, 0];
		return d[o] = r, d[+!o] = -i + u, go({
			key: `${t}TargetGuideline${n}`,
			classNames: [Y("target", "bold", l)],
			posValue: d,
			sizeValue: a,
			zoom: c,
			direction: t
		}, s);
	});
}
function vo(e, t, n, r, i, a) {
	var o = e.props, s = o.zoom, c = o.isDisplayInnerSnapDigit, l = t === "horizontal" ? ia : aa, u = i[l.start], d = i[l.end];
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
		return go({
			key: `${t}-default-guideline-${n}`,
			classNames: c ? [Y("bold"), l] : [Y("normal"), l],
			direction: t,
			posValue: u,
			sizeValue: o,
			zoom: s
		}, a);
	});
}
function yo(e, t, n, r, i, a, o, s) {
	var c, l = e.props, u = l.snapDigit, d = u === void 0 ? 0 : u, f = l.isDisplaySnapDigit, p = f === void 0 || f, m = l.snapDistFormat, h = m === void 0 ? function(e, t) {
		return e;
	} : m, g = l.zoom, _ = t === "horizontal" ? "X" : "Y", v = t === "vertical" ? "height" : "width", y = Math.abs(i), b = p ? parseFloat(y.toFixed(d)) : 0;
	return s.createElement("div", {
		key: `${t}-${n}-guideline-${r}`,
		className: Y("guideline-group", t),
		style: (c = {
			left: `${a[0]}px`,
			top: `${a[1]}px`
		}, c[v] = `${y}px`, c)
	}, go({
		direction: t,
		classNames: [Y(n), o],
		size: "100%",
		posValue: [0, 0],
		sizeValue: y,
		zoom: g
	}, s), s.createElement("div", {
		className: Y("size-value", "gap"),
		style: { transform: `translate${_}(-50%) scale(${g})` }
	}, b > 0 ? h(b, t) : ""));
}
function bo(e, t, n, r) {
	var i = e === "vertical" ? 0 : 1, a = +(e === "vertical"), o = i ? ia : aa, s = n[o.start], c = n[o.end];
	return Gs(t, function(e) {
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
					rect: K(K({}, p), (u = {}, u[o.end] = p[o.start], u))
				}, g = {
					element: f,
					rect: K(K({}, p), (d = {}, d[o.start] = p[o.end], d))
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
function xo(e, t, n, r, i) {
	var a = e.props.isDisplayInnerSnapDigit, o = [];
	return ["vertical", "horizontal"].forEach(function(s) {
		var c = t.filter(function(e) {
			return e.type === s;
		}), l = +(s === "vertical"), u = +!l, d = bo(s, c, r, a), f = l ? aa : ia, p = l ? ia : aa, m = r[f.start], h = r[f.end];
		d.forEach(function(t) {
			var a = t.total, c = t.start, d = t.end, g = t.inner, _ = n[u] + a[0].pos[u] - r[p.start], v = r;
			c.forEach(function(t) {
				var r = t.elementRect.rect, a = v[f.start] - r[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.start] - m - a, c[u] = _, o.push(yo(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), v = r, d.forEach(function(t) {
				var r = t.elementRect.rect, a = r[f.start] - v[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.end] - m, c[u] = _, o.push(yo(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), g.forEach(function(t) {
				var r = t.elementRect.rect, a = m - r[f.start], c = r[f.end] - h, d = [0, 0], p = [0, 0];
				d[l] = n[l] - a, d[u] = _, p[l] = n[l] + h - m, p[u] = _, o.push(yo(e, s, "dashed", o.length, a, d, t.className, i)), o.push(yo(e, s, "dashed", o.length, c, p, t.className, i));
			});
		});
	}), o;
}
function So(e, t, n, r, i) {
	var a = [];
	return ["horizontal", "vertical"].forEach(function(o) {
		var s = t.filter(function(e) {
			return e.type === o;
		}).slice(0, 1), c = o === "vertical" ? 0 : 1, l = +!c, u = c ? aa : ia, d = c ? ia : aa, f = r[u.start], p = r[u.end], m = r[d.start], h = r[d.end];
		s.forEach(function(t) {
			var r = t.gap, o = t.gapRects, s = Math.max.apply(Math, J([m], q(o.map(function(e) {
				return e.rect[d.start];
			})), !1)), g = Math.min.apply(Math, J([h], q(o.map(function(e) {
				return e.rect[d.end];
			})), !1)), _ = (s + g) / 2;
			s === g || _ === (m + h) / 2 || o.forEach(function(t) {
				var o = t.rect, s = t.className, d = [n[0], n[1]];
				if (o[u.end] < f) d[c] += o[u.end] - f;
				else if (p < o[u.start]) d[c] += o[u.start] - f - r;
				else return;
				d[l] += _ - m, a.push(yo(e, c ? "vertical" : "horizontal", "gap", a.length, r, d, s, i));
			});
		});
	}), a;
}
function Co(e) {
	var t = e.state, n = t.containerClientRect, r = t.hasFixed, i = n.overflow, a = n.scrollHeight, o = n.scrollWidth, s = n.clientHeight, c = n.clientWidth, l = n.clientLeft, u = n.clientTop, d = e.props, f = d.snapGap, p = f === void 0 || f, m = d.verticalGuidelines, h = d.horizontalGuidelines, g = d.snapThreshold, _ = g === void 0 ? 5 : g, v = d.maxSnapElementGuidelineDistance, y = v === void 0 ? Infinity : v, b = d.isDisplayGridGuidelines, x = hs(Ps(e.state)), S = x.top, C = x.left, w = x.bottom, T = x.right, E = {
		top: S,
		left: C,
		bottom: w,
		right: T,
		center: (C + T) / 2,
		middle: (S + w) / 2
	}, D = J([], q(Oo(e)), !1), O = (t.snapThresholdInfo?.multiples ?? [1, 1]).map(function(e) {
		return e * _;
	});
	p && D.push.apply(D, J([], q(wo(e, E, O)), !1));
	var k = K({}, t.snapOffset || {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	});
	if (D.push.apply(D, J([], q(Eo(e, i ? o : c, i ? a : s, l, u, k, b)), !1)), r) {
		var A = n.left, j = n.top;
		k.left += A, k.top += j, k.right += A, k.bottom += j;
	}
	return D.push.apply(D, J([], q(Ao(h || !1, m || !1, i ? o : c, i ? a : s, l, u, k)), !1)), D = D.filter(function(e) {
		var t = e.element, n = e.elementRect, r = e.type;
		if (!t || !n) return !0;
		var i = n.rect;
		return Do(E, i, r, y);
	}), D;
}
function wo(e, t, n) {
	var r = e.props, i = r.maxSnapElementGuidelineDistance, a = i === void 0 ? Infinity : i, o = r.maxSnapElementGapDistance, s = o === void 0 ? Infinity : o, c = e.state.elementRects, l = [];
	return [[
		"vertical",
		ia,
		aa
	], [
		"horizontal",
		aa,
		ia
	]].forEach(function(e) {
		var r = q(e, 3), i = r[0], o = r[1], u = r[2], d = t[o.start], f = t[o.end], p = t[o.center], m = t[u.start], h = t[u.end], g = {
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
			var n = q(e, 2), r = n[0], c = n[1], u = r.rect, m = c.rect, h = u[o.start], _ = u[o.end], v = m[o.start], y = m[o.end], b = g[o.start], x = 0, S = 0, C = !1, w = !1, T = !1;
			if (_ <= d && f <= v) {
				if (w = !0, x = (v - _ - (f - d)) / 2, S = _ + x + (f - d) / 2, Q(S - p) > b) return;
			} else if (_ < v && y < d + b) {
				if (C = !0, x = v - _, S = y + x, Q(S - d) > b) return;
			} else if (_ < v && f - b < h) {
				if (T = !0, x = v - _, S = h - x, Q(S - f) > b) return;
			} else return;
			x && Do(t, m, i, a) && (x > s || l.push({
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
function To(e, t, n, r) {
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
				var f = m[l], p = m[s], g = it(h.map(function(e) {
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
					return W(e / _, .1) * o;
				}), y = 1, b = W(f / _, .1);
				for (y = 1; y <= 10 && !v.every(function(e) {
					return e * y % 1 == 0;
				}); ++y);
				var x = (-e + 1) / 2, S = Ce(p - d, p - d + f, x, 1 - x);
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
function Eo(e, t, n, r, i, a, o) {
	r === void 0 && (r = 0), i === void 0 && (i = 0);
	var s = e.props, c = e.state, l = s.snapGridWidth, u = l === void 0 ? 0 : l, d = s.snapGridHeight, f = d === void 0 ? 0 : d, p = [], m = a.left, h = a.top, g = [0, 0];
	To(e, r, i, a);
	var _ = c.snapThresholdInfo, v = u, y = f;
	if (_ && (u *= _.multiples[0] || 1, f *= _.multiples[1] || 1, g = _.offset), f) {
		for (var b = function(e) {
			p.push({
				type: "horizontal",
				pos: [m, W(g[1] * y + e - i + h, .1)],
				className: Y("grid-guideline"),
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
				pos: [W(g[0] * v + e - r + m, .1), h],
				className: Y("grid-guideline"),
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
function Do(e, t, n, r) {
	return n === "horizontal" ? Q(e.right - t.left) <= r || Q(e.left - t.right) <= r || e.left <= t.right && t.left <= e.right : n !== "vertical" || Q(e.bottom - t.top) <= r || Q(e.top - t.bottom) <= r || e.top <= t.bottom && t.top <= e.bottom;
}
function Oo(e) {
	var t = e.state, n = e.props.elementGuidelines, r = n === void 0 ? [] : n;
	if (!r.length) return t.elementRects = [], [];
	var i = (t.elementRects || []).filter(function(e) {
		return !e.refresh;
	}), a = r.map(function(e) {
		return Te(e) && "element" in e ? K(K({}, e), { element: ic(e.element, !0) }) : { element: ic(e, !0) };
	}).filter(function(e) {
		return e.element;
	}), o = ln(i.map(function(e) {
		return e.element;
	}), a.map(function(e) {
		return e.element;
	})), s = o.maintained, c = o.added, l = [];
	s.forEach(function(e) {
		var t = q(e, 2), n = t[0], r = t[1];
		l[r] = i[n];
	}), jo(e, c.map(function(e) {
		return a[e];
	})).map(function(e, t) {
		l[c[t]] = e;
	}), t.elementRects = l;
	var u = ca(e.props.elementSnapDirections), d = [];
	return l.forEach(function(e) {
		var t = e.element, n = e.top, r = n === void 0 ? u.top : n, i = e.left, a = i === void 0 ? u.left : i, o = e.right, s = o === void 0 ? u.right : o, c = e.bottom, l = c === void 0 ? u.bottom : c, f = e.center, p = f === void 0 ? u.center : f, m = e.middle, h = m === void 0 ? u.middle : m, g = e.className, _ = e.rect, v = ua({
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
				pos: [W(n, .1), C],
				size: E,
				sizes: D,
				className: g,
				elementRect: e,
				elementDirection: ra[S[r]] || S[r],
				direction: ""
			});
		}), y.forEach(function(n, r) {
			d.push({
				type: "horizontal",
				element: t,
				pos: [w, W(n, .1)],
				size: T,
				sizes: D,
				className: g,
				elementRect: e,
				elementDirection: ra[x[r]] || x[r],
				direction: ""
			});
		});
	}), d;
}
function ko(e, t) {
	return e ? e.map(function(e) {
		var n = Te(e) ? e : { pos: e }, r = n.pos;
		return Oe(r) ? n : K(K({}, n), { pos: Ke(r, t) });
	}) : [];
}
function Ao(e, t, n, r, i, a, o) {
	i === void 0 && (i = 0), a === void 0 && (a = 0), o === void 0 && (o = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	});
	var s = [], c = o.left, l = o.top, u = o.bottom, d = n + o.right - c, f = r + u - l;
	return ko(e, f).forEach(function(e) {
		s.push({
			type: "horizontal",
			pos: [c, W(e.pos - a + l, .1)],
			size: d,
			className: e.className,
			direction: ""
		});
	}), ko(t, d).forEach(function(e) {
		s.push({
			type: "vertical",
			pos: [W(e.pos - i + c, .1), l],
			size: f,
			className: e.className,
			direction: ""
		});
	}), s;
}
function jo(e, t) {
	if (!t.length) return [];
	var n = e.props.groupable, r = e.state, i = r.containerClientRect, a = r.rootMatrix, o = r.is3d, s = r.offsetDelta, c = o ? 4 : 3, l = q(da(a, i, c), 2), u = l[0], d = l[1], f = n ? 0 : s[0], p = n ? 0 : s[1];
	return t.map(function(e) {
		var t = e.element.getBoundingClientRect(), n = t.left - u - f, r = t.top - d - p, i = r + t.height, o = n + t.width, s = q(Ys(a, [n, r], c), 2), l = s[0], m = s[1], h = q(Ys(a, [o, i], c), 2), g = h[0], _ = h[1];
		return K(K({}, e), { rect: {
			left: l,
			right: g,
			top: m,
			bottom: _,
			center: (l + g) / 2,
			middle: (m + _) / 2
		} });
	});
}
function Mo(e) {
	var t = e.state, n = t.container, r = e.props.snapContainer || n;
	if (t.snapContainer === r && t.guidelines && t.guidelines.length) return !1;
	var i = t.containerClientRect, a = {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	};
	if (n !== r) {
		var o = ic(r, !0);
		if (o) {
			var s = ks(o), c = sc(t, [s.left - i.left, s.top - i.top]), l = sc(t, [s.right - i.right, s.bottom - i.bottom]);
			a.left = W(c[0], 1e-5), a.top = W(c[1], 1e-5), a.right = W(l[0], 1e-5), a.bottom = W(l[1], 1e-5);
		}
	}
	return t.snapContainer = r, t.snapOffset = a, t.guidelines = Co(e), t.enableSnap = !0, !0;
}
function No(e, t, n, r, i, a) {
	var o = ms(e, t, n, a ? 4 : 3);
	return Ns(o, G(i, ri(o, r)));
}
function Po(e) {
	return e ? e / Q(e) : 0;
}
function Fo(e, t, n, r, i, a) {
	var o = a.fixedDirection, s = Da(n, o, r), c = La(e, t, n, r), l = J(J([], q(Za(e, t, s, r, i, a)), !1), q(Pa(e, c, a)), !1), u = Ea(l, 0), d = Ea(l, 1);
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
function Io(e, t, n, r, i, a, o, s, c) {
	var l = ri(t, o), u = Ja(e, s, {
		vertical: [l[0]],
		horizontal: [l[1]]
	}), d = u.horizontal.offset, f = u.vertical.offset;
	if (W(f, jr) || W(d, jr)) {
		var p = q(Zr({
			datas: c,
			distX: -f,
			distY: -d
		}), 2), m = p[0], h = p[1], g = Math.min(i || Infinity, n + o[0] * m), _ = Math.min(a || Infinity, r + o[1] * h);
		return [g - n, _ - r];
	}
	return [0, 0];
}
function Lo(e, t, n, r, i, a, o, s) {
	for (var c = Ps(e.state), l = e.props.keepRatio, u = 0, d = 0, f = 0; f < 2; ++f) {
		var p = Fo(e, t(u, d), i, l, o, s), m = p.width, h = p.height, g = m.isBound, _ = h.isBound, v = m.offset, y = h.offset;
		if (f === 1 && (g || (v = 0), _ || (y = 0)), f === 0 && o && !g && !_) return [0, 0];
		if (l) {
			var b = Q(v) * (n ? 1 / n : 1), x = Q(y) * (r ? 1 / r : 1);
			(g && _ ? b < x : _ || !g && b < x) ? v = n * y / r : y = r * v / n;
		}
		u += v, d += y;
	}
	if (!l && i[0] && i[1]) {
		var S = eo(e, c, i, a, s), C = S.maxWidth, w = S.maxHeight, T = q(Io(e, t(u, d).map(function(e) {
			return e.map(function(e) {
				return W(e, jr);
			});
		}), n + u, r + d, C, w, i, o, s), 2), v = T[0], y = T[1];
		u += v, d += y;
	}
	return [u, d];
}
function Ro(e) {
	return e < 0 && (e = e % 360 + 360), e %= 360, e;
}
function zo(e, t) {
	t = Ro(t);
	var n = Math.floor(e / 360), r = n * 360 + 360 - t, i = n * 360 + t;
	return Q(e - r) < Q(e - i) ? r : i;
}
function Bo(e, t) {
	e = Ro(e), t = Ro(t);
	var n = Ro(e - t);
	return Math.min(n, 360 - n);
}
function Vo(e, t, n, r) {
	var i = e.props, a = i[pa] ?? 5, o = i[ma];
	if (sa(e, "rotatable")) {
		var s = t.pos1, c = t.pos2, l = t.pos3, u = t.pos4, d = t.origin, f = n * Math.PI / 180, p = [
			s,
			c,
			l,
			u
		].map(function(e) {
			return G(e, d);
		}), m = p.map(function(e) {
			return It(e, f);
		}), h = J(J([], q(ea(e, p, m, d, n)), !1), q(Va(e, p, m, d, n)), !1);
		h.sort(function(e, t) {
			return Q(e - n) - Q(t - n);
		});
		var g = h.length > 0;
		if (g) return {
			isSnap: g,
			dist: g ? h[0] : n
		};
	}
	if (o?.length && a) {
		var _ = o.slice().sort(function(e, t) {
			return Bo(e, r) - Bo(t, r);
		})[0];
		if (Bo(_, r) <= a) return {
			isSnap: !0,
			dist: n + zo(r, _) - r
		};
	}
	return {
		isSnap: !1,
		dist: n
	};
}
function Ho(e, t, n, r, i, a, o) {
	if (!sa(e, "resizable")) return [0, 0];
	var s = o.fixedDirection, c = o.nextAllMatrix, l = e.state, u = l.allMatrix, d = l.is3d;
	return Lo(e, function(e, r) {
		return No(c || u, t + e, n + r, s, i, d);
	}, t, n, r, i, a, o);
}
function Uo(e, t, n, r, i) {
	if (!sa(e, "scalable")) return [0, 0];
	var a = i.startOffsetWidth, o = i.startOffsetHeight, s = i.fixedPosition, c = i.fixedDirection, l = i.is3d, u = Lo(e, function(e, n) {
		return No(si(i, Ot(t, [e / a, n / o])), a, o, c, s, l);
	}, a, o, n, s, r, i);
	return [u[0] / a, u[1] / o];
}
function Wo(e, t) {
	t.absolutePoses = Ps(e.state);
}
function Go(e) {
	var t = [];
	return e.forEach(function(e) {
		e.guidelineInfos.forEach(function(n) {
			var r = n.guideline;
			He(t, function(e) {
				return e.guideline === r;
			}) || (r.direction = "", t.push({
				guideline: r,
				posInfo: e
			}));
		});
	}), t.map(function(e) {
		var t = e.guideline, n = e.posInfo;
		return K(K({}, t), { direction: n.direction });
	});
}
function Ko(e, t, n, r, i, a) {
	var o = Ji(Yi(e, a), t, n), s = o.vertical, c = o.horizontal, l = oa();
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
	var u = Ha(e), d = u.boundMap, f = u.vertical, p = u.horizontal;
	return f.forEach(function(e) {
		Ve(r, function(t) {
			var n = t.type, r = t.pos;
			return n === "bounds" && r === e;
		}) >= 0 || r.push({
			type: "bounds",
			pos: e
		});
	}), p.forEach(function(e) {
		Ve(i, function(t) {
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
var qo = tc("", ["resizable", "scalable"]), Jo = {
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
		pa,
		ma,
		ha,
		ga,
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
		if (!l || !l.render || !sa(e, "")) return mc(e, "boundMap", oa(), function(e) {
			return JSON.stringify(e);
		}), mc(e, "innerBoundMap", oa(), function(e) {
			return JSON.stringify(e);
		}), [];
		n.guidelines = Co(e);
		var f = Math.min(a[0], o[0], s[0], c[0]), p = Math.min(a[1], o[1], s[1], c[1]), m = l.externalPoses || [], h = Ps(e.state), g = [], _ = [], v = [], y = [], b = [], x = hs(h), S = x.width, C = x.height, w = x.top, T = x.left, E = x.bottom, D = x.right, O = {
			left: T,
			right: D,
			top: w,
			bottom: E,
			center: (T + D) / 2,
			middle: (w + E) / 2
		}, k = m.length > 0, A = k ? hs(m) : {};
		if (!l.request) {
			if (l.direction && b.push(wa(e, h, l.direction, d, d)), l.snap) {
				var j = hs(h);
				l.center && (j.middle = (j.top + j.bottom) / 2, j.center = (j.left + j.right) / 2), b.push(xa(e, j, d, d));
			}
			k && (l.center && (A.middle = (A.top + A.bottom) / 2, A.center = (A.left + A.right) / 2), b.push(xa(e, A, d, d))), b.forEach(function(e) {
				var t = e.vertical.posInfos, n = e.horizontal.posInfos;
				g.push.apply(g, J([], q(t.filter(function(e) {
					return e.guidelineInfos.some(function(e) {
						return !e.guideline.hide;
					});
				}).map(function(e) {
					return {
						type: "snap",
						pos: e.pos
					};
				})), !1)), _.push.apply(_, J([], q(n.filter(function(e) {
					return e.guidelineInfos.some(function(e) {
						return !e.guideline.hide;
					});
				}).map(function(e) {
					return {
						type: "snap",
						pos: e.pos
					};
				})), !1)), v.push.apply(v, J([], q(Go(t)), !1)), y.push.apply(y, J([], q(Go(n)), !1));
			});
		}
		var M = Ko(e, [T, D], [w, E], g, _), N = M.boundMap, P = M.innerBoundMap;
		k && Ko(e, [A.left, A.right], [A.top, A.bottom], g, _, l.externalBounds);
		var F = J(J([], q(v), !1), q(y), !1), I = F.filter(function(e) {
			return e.element && !e.gapRects;
		}), L = F.filter(function(e) {
			return e.gapRects;
		}).sort(function(e, t) {
			return e.gap - t.gap;
		});
		Z(e, "onSnap", {
			guidelines: F.filter(function(e) {
				return !e.element;
			}),
			elements: I,
			gaps: L
		}, !0);
		var R = mc(e, "boundMap", N, function(e) {
			return JSON.stringify(e);
		}, oa()), z = mc(e, "innerBoundMap", P, function(e) {
			return JSON.stringify(e);
		}, oa());
		return (N === R || P === z) && Z(e, "onBound", {
			bounds: N,
			innerBounds: P
		}, !0), J(J(J(J(J(J([], q(xo(e, I, [f, p], O, t)), !1), q(So(e, L, [f, p], O, t)), !1), q(vo(e, "horizontal", y, [i, r], O, t)), !1), q(vo(e, "vertical", v, [i, r], O, t)), !1), q(_o(e, "horizontal", _, f, r, S, 0, t)), !1), q(_o(e, "vertical", g, p, i, C, 1, t)), !1);
	},
	dragStart: function(e, t) {
		e.state.snapRenderInfo = {
			request: t.isRequest,
			snap: !0,
			center: !0
		}, Mo(e);
	},
	drag: function(e) {
		var t = e.state;
		Mo(e) || (t.guidelines = Co(e)), t.snapRenderInfo && (t.snapRenderInfo.render = !0);
	},
	pinchStart: function(e) {
		this.unset(e);
	},
	dragEnd: function(e) {
		this.unset(e);
	},
	dragControlCondition: function(e, t) {
		if (qo(e, t) || po(e, t)) return !0;
		if (!t.isRequest && t.inputEvent) return at(t.inputEvent.target, Y("snap-control"));
	},
	dragControlStart: function(e) {
		e.state.snapRenderInfo = null, Mo(e);
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
		e.state.snapRenderInfo = null, Mo(e);
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
function Yo(e, t) {
	return [e[0] * t[0], e[1] * t[1]];
}
function Y() {
	var e = [...arguments];
	return ce.apply(void 0, J([Or], q(e), !1));
}
function Xo(e) {
	e();
}
function Zo(e) {
	return !e || e === "none" ? [
		1,
		0,
		0,
		1,
		0,
		0
	] : Te(e) ? e : Kt(e);
}
function Qo(e, t, n) {
	return Et(t, Ht(n, t), e, Ht(n.map(function(e) {
		return -e;
	}), t));
}
function $o(e, t, n) {
	return t === "%" ? us(e.ownerSVGElement)[n ? "width" : "height"] / 100 : 1;
}
function es(e) {
	return ns(Vs(e, ":before")).map(function(t, n) {
		var r = Re(t), i = r.value, a = r.unit;
		return i * $o(e, a, n === 0);
	});
}
function ts(e) {
	return e ? e.split(" ") : ["0", "0"];
}
function ns(e) {
	return ts(e.transformOrigin);
}
function rs(e) {
	var t = Fi(e)("transform");
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
function is(e, t, n, r, i) {
	var a = dt(e) || ft(e), o = !1, s, c;
	if (!e || n) s = e;
	else {
		var l = e?.assignedSlot?.parentElement, u = e.parentElement;
		l ? (o = !0, c = u, s = l) : s = u;
	}
	for (var d = !1, f = e === t || s === t, p = "relative", m = 1, h = parseFloat(i?.("zoom")) || 1, g = i?.("position"); s && s !== a;) {
		t === s && (f = !0);
		var _ = Fi(s), v = s.tagName.toLowerCase(), y = rs(s), b = _("willChange"), x = parseFloat(_("zoom")) || 1;
		if (p = _("position"), r && x !== 1) {
			m = x;
			break;
		}
		if (!n && r && h !== 1 && g && g !== "absolute" || v === "svg" || v === "foreignobject" || p !== "static" || y && y !== "none" || b === "transform") break;
		var S = e?.assignedSlot?.parentNode, C = s.parentNode;
		S && (o = !0, c = C);
		var w = C;
		if (w && w.nodeType === 11) {
			s = w.host, d = !0, p = Fi(s)("position");
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
function as(e, t) {
	var n, r = e.tagName.toLowerCase(), i = e.offsetLeft, a = e.offsetTop, o = Fi(e), s = we(i), c = !s, l, u;
	return !c && (r !== "svg" || e.ownerSVGElement) ? (l = yr ? es(e) : ts(o("transformOrigin")).map(function(e) {
		return parseFloat(e);
	}), u = l.slice(), c = !0, r === "svg" ? (i = 0, a = 0) : (n = q(fs(e, l, e === t && t.tagName.toLowerCase() === "g"), 4), i = n[0], a = n[1], l[0] = n[2], l[1] = n[3])) : (l = ts(o("transformOrigin")).map(function(e) {
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
function os(e, t) {
	var n = Fi(e), r = Fi(ft(e)), i = r("position");
	if (!t && (!i || i === "static")) return [0, 0];
	var a = parseInt(r("marginLeft"), 10), o = parseInt(r("marginTop"), 10);
	return n("position") === "absolute" && ((n("top") !== "auto" || n("bottom") !== "auto") && (o = 0), (n("left") !== "auto" || n("right") !== "auto") && (a = 0)), [a, o];
}
function ss(e) {
	e.forEach(function(e) {
		var t = e.matrix;
		t && (e.matrix = Tt(t, 3, 4));
	});
}
function cs(e) {
	for (var t = e.parentElement, n = !1, r = ft(e); t;) {
		var i = Vs(t).transform;
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
function ls(e, t) {
	return t === void 0 && (t = e.length > 9), `${t ? "matrix3d" : "matrix"}(${At(e, !t).join(",")})`;
}
function us(e) {
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
function ds(e, t) {
	var n, r = us(e), i = r.width, a = r.height, o = r.clientWidth, s = r.clientHeight, c = o / i, l = s / a, u = e.preserveAspectRatio.baseVal, d = u.align, f = u.meetOrSlice, p = [0, 0], m = [c, l], h = [0, 0];
	if (d !== 1) {
		var g = (d - 2) % 3, _ = Math.floor((d - 2) / 3);
		p[0] = i * g / 2, p[1] = a * _ / 2;
		var v = f === 2 ? Math.max(l, c) : Math.min(c, l);
		m[0] = v, m[1] = v, h[0] = (o - i) / 2 * g, h[1] = (s - a) / 2 * _;
	}
	var y = Vt(m, t);
	return n = q(h, 2), y[t * (t - 1)] = n[0], y[t * (t - 1) + 1] = n[1], Qo(y, t, p);
}
function fs(e, t, n) {
	var r = e.tagName.toLowerCase();
	if (!e.getBBox || !n && r === "g") return [
		0,
		0,
		0,
		0
	];
	var i = Fi(e)("transform-box") === "fill-box", a = e.getBBox(), o = us(e.ownerSVGElement), s = a.x, c = a.y;
	r === "foreignobject" && !s && !c && (s = parseFloat(e.getAttribute("x")) || 0, c = parseFloat(e.getAttribute("y")) || 0);
	var l = s - o.x, u = c - o.y;
	return [
		l,
		u,
		i ? t[0] : t[0] - l,
		i ? t[1] : t[1] - u
	];
}
function ps(e, t, n) {
	return jt(e, wt(t, n), n);
}
function ms(e, t, n, r) {
	return [
		[0, 0],
		[t, 0],
		[0, n],
		[t, n]
	].map(function(t) {
		return ps(e, t, r);
	});
}
function hs(e) {
	var t = e.map(function(e) {
		return e[0];
	}), n = e.map(function(e) {
		return e[1];
	}), r = Math.min.apply(Math, J([], q(t), !1)), i = Math.min.apply(Math, J([], q(n), !1)), a = Math.max.apply(Math, J([], q(t), !1)), o = Math.max.apply(Math, J([], q(n), !1));
	return {
		left: r,
		top: i,
		right: a,
		bottom: o,
		width: a - r,
		height: o - i
	};
}
function gs(e, t, n, r) {
	return hs(ms(e, t, n, r));
}
function _s(e, t, n, r, i) {
	var a, o = e.target, s = e.origin, c = t.matrix, l = ws(o), u = l.offsetWidth, d = l.offsetHeight, f = n.getBoundingClientRect(), p = [0, 0];
	n === ft(n) && (p = os(o, !0));
	for (var m = o.getBoundingClientRect(), h = m.left - f.left + n.scrollLeft - (n.clientLeft || 0) + p[0], g = m.top - f.top + n.scrollTop - (n.clientTop || 0) + p[1], _ = m.width, v = m.height, y = Et(r, i, c), b = gs(y, u, d, r), x = b.left, S = b.top, C = b.width, w = b.height, T = ps(y, s, r), E = G(T, [x, S]), D = [h + E[0] * _ / C, g + E[1] * v / w], O = [0, 0], k = 0; ++k < 10;) {
		var A = bt(i, r);
		a = q(G(ps(A, D, r), ps(A, T, r)), 2), O[0] = a[0], O[1] = a[1];
		var j = gs(Et(r, i, Ht(O, r), c), u, d, r), M = j.left, N = j.top, P = M - h, F = N - g;
		if (Q(P) < 2 && Q(F) < 2) break;
		D[0] -= P, D[1] -= F;
	}
	return O.map(function(e) {
		return Math.round(e);
	});
}
function vs(e, t, n) {
	var r = e.length === 16 ? 4 : 3, i = t.map(function(t) {
		return ps(e, t, r);
	}), a = n.left, o = n.top;
	return i.map(function(e) {
		return [e[0] + a, e[1] + o];
	});
}
function ys(e) {
	return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function bs(e, t) {
	return ys([t[0] - e[0], t[1] - e[1]]);
}
function xs(e, t, n, r) {
	n === void 0 && (n = 1), r === void 0 && (r = Qe(e, t));
	var i = bs(e, t);
	return {
		transform: `translateY(-50%) translate(${e[0]}px, ${e[1]}px) rotate(${r}rad) scaleY(${n})`,
		width: `${i}px`
	};
}
function Ss(e, t) {
	var n = [...arguments].slice(2), r = n.length;
	return { transform: `translateZ(0px) translate(${n.reduce(function(e, t) {
		return e + t[0];
	}, 0) / r}px, ${n.reduce(function(e, t) {
		return e + t[1];
	}, 0) / r}px) rotate(${e}rad) scale(${t})` };
}
function Cs(e, t) {
	var n = e[t];
	return Te(n) ? K(K({}, e), n) : e;
}
function ws(e) {
	var t = e && !we(e.offsetWidth), n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = Infinity, h = Infinity, g = Infinity, _ = Infinity, v = 0, y = 0, b = !1;
	if (e) if (!t && e.ownerSVGElement) {
		var x = e.getBBox();
		b = !0, n = x.width, r = x.height, o = n, s = r, c = n, l = r, i = n, a = r;
	} else {
		var S = Fi(e), C = e.style, w = S("boxSizing") === "border-box", T = parseFloat(S("borderLeftWidth")) || 0, E = parseFloat(S("borderRightWidth")) || 0, D = parseFloat(S("borderTopWidth")) || 0, O = parseFloat(S("borderBottomWidth")) || 0, k = parseFloat(S("paddingLeft")) || 0, A = parseFloat(S("paddingRight")) || 0, j = parseFloat(S("paddingTop")) || 0, M = parseFloat(S("paddingBottom")) || 0, N = k + A, P = j + M, F = T + E, I = D + O, L = N + F, R = P + I, z = S("position"), B = 0, ee = 0;
		if ("clientLeft" in e) {
			var V = null;
			if (V = z === "absolute" ? is(e, ft(e)).offsetParent : e.parentElement, V) {
				var te = Fi(V);
				B = parseFloat(te("width")), ee = parseFloat(te("height"));
			}
		}
		u = Math.max(N, Ke(S("minWidth"), B) || 0), d = Math.max(P, Ke(S("minHeight"), ee) || 0), m = Ke(S("maxWidth"), B), h = Ke(S("maxHeight"), ee), isNaN(m) && (m = Infinity), isNaN(h) && (h = Infinity), v = Ke(C.width, 0) || 0, y = Ke(C.height, 0) || 0, o = parseFloat(S("width")) || 0, s = parseFloat(S("height")) || 0, c = Q(o - v) < 1 ? qe(u, v || o, m) : o, l = Q(s - y) < 1 ? qe(d, y || s, h) : s, n = c, r = l, i = c, a = l, w ? (g = m, _ = h, f = u, p = d, c = n - L, l = r - R) : (g = m + L, _ = h + R, f = u + L, p = d + R, n = c + L, r = l + R), i = c + N, a = l + P;
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
function Ts(e, t) {
	return Qe(t > 0 ? e[0] : e[1], t > 0 ? e[1] : e[0]);
}
function Es() {
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
function Ds(e, t) {
	var n = e === ft(e) || e === dt(e), r = {
		clientLeft: e.clientLeft,
		clientTop: e.clientTop,
		clientWidth: e.clientWidth,
		clientHeight: e.clientHeight,
		scrollWidth: e.scrollWidth,
		scrollHeight: e.scrollHeight,
		overflow: !1
	};
	return n && (r.clientHeight = Math.max(t.height, r.clientHeight), r.scrollHeight = Math.max(t.height, r.scrollHeight)), r.overflow = Fi(e)("overflow") !== "visible", K(K({}, t), r);
}
function Os(e, t, n, r) {
	var i = e.left, a = e.right, o = e.top, s = e.bottom, c = t.top, l = t.left, u = {
		left: l + i,
		top: c + o,
		right: l + a,
		bottom: c + s,
		width: a - i,
		height: s - o
	};
	return n && r ? Ds(n, u) : u;
}
function ks(e, t) {
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
	return e && t ? Ds(e, s) : s;
}
function As(e) {
	var t = e.props, n = t.groupable, r = t.svgOrigin, i = e.getState(), a = i.offsetWidth, o = i.offsetHeight, s = i.svg, c = i.transformOrigin;
	return !n && s && r ? dc(r, a, o) : c;
}
function js(e, t, n, r) {
	var i;
	if (e) i = e;
	else if (t) i = [0, 0];
	else {
		var a = n.target;
		i = Ms(a, r);
	}
	return i;
}
function Ms(e, t) {
	if (e) {
		var n = e.getAttribute("data-rotation") || "", r = e.getAttribute("data-direction");
		if (t.deg = n, r) {
			var i = [0, 0];
			return r.indexOf("w") > -1 && (i[0] = -1), r.indexOf("e") > -1 && (i[0] = 1), r.indexOf("n") > -1 && (i[1] = -1), r.indexOf("s") > -1 && (i[1] = 1), i;
		}
	}
}
function Ns(e, t) {
	return [
		Ot(t, e[0]),
		Ot(t, e[1]),
		Ot(t, e[2]),
		Ot(t, e[3])
	];
}
function Ps(e) {
	var t = e.left, n = e.top, r = e.pos1, i = e.pos2, a = e.pos3, o = e.pos4;
	return Ns([
		r,
		i,
		a,
		o
	], [t, n]);
}
function Fs(e, t) {
	e[t ? "controlAbles" : "targetAbles"].forEach(function(t) {
		t.unset && t.unset(e);
	});
}
function Is(e, t) {
	var n = t ? "controlGesto" : "targetGesto", r = e[n];
	r?.isIdle() === !1 && Fs(e, t), r?.unset(), e[n] = null;
}
function Ls(e, t) {
	if (t) {
		var n = fi(t);
		n.nextStyle = K(K({}, n.nextStyle), e);
	}
	return {
		style: e,
		cssText: Ge(e).map(function(t) {
			return `${ze(t, "-")}: ${e[t]};`;
		}).join("")
	};
}
function Rs(e, t, n) {
	var r = t.afterTransform || t.transform;
	return K(K({}, Ls(K(K(K({}, e.style), t.style), { transform: r }), n)), {
		afterTransform: r,
		transform: e.transform
	});
}
function X(e, t, n, r) {
	var i = t.datas;
	i.datas ||= {};
	var a = K(K({}, n), {
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
function zs(e, t, n) {
	var r = t.datas, i = "isDrag" in n ? n.isDrag : t.isDrag;
	return r.datas ||= {}, K(K({ isDrag: i }, n), {
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
function Bs(e, t, n) {
	e._emitter.on(t, n);
}
function Z(e, t, n, r, i) {
	return e.triggerEvent(t, n, r, i);
}
function Vs(e, t) {
	return pt(e).getComputedStyle(e, t);
}
function Hs(e, t, n) {
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
function Us(e, t) {
	return e === t || e == null && t == null;
}
function Ws() {
	for (var e = [...arguments], t = e.length - 1, n = 0; n < t; ++n) {
		var r = e[n];
		if (!we(r)) return r;
	}
	return e[t];
}
function Gs(e, t) {
	var n = [], r = [];
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r.indexOf(o), c = n[s] || [];
		s === -1 && (r.push(o), n.push(c)), c.push(i);
	}), n;
}
function Ks(e, t) {
	var n = [], r = {};
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r[o];
		s || (s = [], r[o] = s, n.push(s)), s.push(i);
	}), n;
}
function qs(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function Js() {
	var e = [...arguments];
	return e.sort(function(e, t) {
		return Q(t) - Q(e);
	}), e[0];
}
function Ys(e, t, n) {
	return jt(bt(e, n), wt(t, n), n);
}
function Xs(e, t) {
	var n, r = e.is3d, i = e.rootMatrix, a = r ? 4 : 3;
	return n = q(Ys(i, [t.distX, t.distY], a), 2), t.distX = n[0], t.distY = n[1], t;
}
function Zs(e, t, n, r) {
	if (!n[0] && !n[1]) return t;
	var i = ps(e, [Po(n[0] || 1), 0], r), a = ps(e, [0, Po(n[1] || 1)], r);
	return Ot(t, ps(e, [n[0] / ys(i), n[1] / ys(a)], r));
}
function Qs(e, t, n) {
	return n ? `${e / t * 100}%` : `${e}px`;
}
function $s(e) {
	return Q(e) <= Mr ? 0 : e;
}
function ec(e) {
	return function(t) {
		if (!t.isDragging(e)) return "";
		var n = Ti(t, e).deg;
		return n ? Y(`view-control-rotation${n}`) : "";
	};
}
function tc(e, t) {
	return t === void 0 && (t = [e]), function(n, r) {
		if (r.isRequest) return t.some(function(e) {
			return r.requestAble === e;
		}) ? r.parentDirection : !1;
		var i = r.inputEvent.target;
		return at(i, Y("direction")) && (!e || at(i, Y(e)));
	};
}
function nc(e, t, n) {
	var r = Yt(e, {
		"x%": function(e) {
			return e / 100 * t.offsetWidth;
		},
		"y%": function(e) {
			return e / 100 * t.offsetHeight;
		}
	}), i = e.slice(0, n < 0 ? void 0 : n), a = e.slice(0, n < 0 ? void 0 : n + 1), o = e[n] || "", s = n < 0 ? [] : e.slice(n), c = n < 0 ? [] : e.slice(n + 1), l = r.slice(0, n < 0 ? void 0 : n), u = r.slice(0, n < 0 ? void 0 : n + 1), d = r[n] ?? Yt([""])[0], f = n < 0 ? [] : r.slice(n), p = n < 0 ? [] : r.slice(n + 1), m = d ? [d] : [], h = Jt(l), g = Jt(u), _ = Jt(f), v = Jt(p), y = Dt(h, _, 4);
	return {
		transforms: e,
		beforeFunctionMatrix: h,
		beforeFunctionMatrix2: g,
		targetFunctionMatrix: Jt(m),
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
function rc(e) {
	return !e || !Te(e) || ht(e) ? !1 : Ee(e) || "length" in e;
}
function ic(e, t) {
	return e ? ht(e) ? e : De(e) ? t ? document.querySelector(e) : e : ke(e) ? e() : mt(e) ? e : "current" in e ? e.current : e : null;
}
function ac(e, t) {
	return e ? (rc(e) ? [].slice.call(e) : [e]).reduce(function(e, n) {
		return De(n) && t ? J(J([], q(e), !1), q([].slice.call(document.querySelectorAll(n))), !1) : (Ee(n) ? e.push(ac(n, t)) : e.push(ic(n, t)), e);
	}, []) : [];
}
function oc(e, t, n) {
	var r = Qe(e, t) / Math.PI * 180;
	return r = n >= 0 ? r : 180 - r, r = r >= 0 ? r : 360 + r, r;
}
function sc(e, t) {
	var n = e.rootMatrix, r = e.is3d, i = bt(n, r ? 4 : 3);
	return r || (i = Tt(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, qt(i, t);
}
function cc(e, t, n, r, i) {
	var a = q(e, 2), o = a[0], s = a[1], c = 0, l = 0;
	if (i && o && s) {
		var u = Qe([0, 0], t), d = Qe([0, 0], r), f = ys(t), p = Math.cos(u - d) * f;
		if (!r[0]) l = p, c = l * n;
		else if (!r[1]) c = p, l = c / n;
		else {
			var m = r[0] * o, h = r[1] * s, g = Math.atan2(m + t[0], h + t[1]), _ = Math.atan2(m, h);
			g < 0 && (g += Math.PI * 2), _ < 0 && (_ += Math.PI * 2);
			var v = 0;
			Q(g - _) < Math.PI / 2 || Q(g - _) > Math.PI / 2 * 3 || (_ += Math.PI), v = g - _, v > Math.PI * 2 ? v -= Math.PI * 2 : v > Math.PI ? v = 2 * Math.PI - v : v < -Math.PI && (v = -2 * Math.PI - v);
			var y = ys([m + t[0], h + t[1]]) * Math.cos(v);
			c = y * Math.sin(_) - m, l = y * Math.cos(_) - h, r[0] < 0 && (c *= -1), r[1] < 0 && (l *= -1);
		}
	} else c = r[0] * t[0], l = r[1] * t[1];
	return [c, l];
}
function lc(e, t, n, r) {
	var i, a = n.ratio, o = n.startOffsetWidth, s = n.startOffsetHeight, c = 0, l = 0, u = r.distX, d = r.distY, f = r.pinchScale, p = r.parentDistance, m = r.parentDist, h = r.parentScale, g = n.fixedDirection, _ = [0, 1].map(function(t) {
		return Q(e[t] - g[t]);
	}), v = [0, 1].map(function(e) {
		var t = _[e];
		return t !== 0 && (t = 2 / t), t;
	});
	if (m) c = m[0], l = m[1], t && (c ? l ||= c / a : c = l * a);
	else if (Oe(f)) c = (f - 1) * o, l = (f - 1) * s;
	else if (h) c = (h[0] - 1) * o, l = (h[1] - 1) * s;
	else if (p) {
		var y = o * _[0], b = s * _[1], x = ys([y, b]);
		c = p / x * y * v[0], l = p / x * b * v[1];
	} else {
		var S = Zr({
			datas: n,
			distX: u,
			distY: d
		});
		S = v.map(function(e, t) {
			return S[t] * e;
		}), i = q(cc([o, s], S, a, e, t), 2), c = i[0], l = i[1];
	}
	return {
		distWidth: c,
		distHeight: l
	};
}
function uc(e, t) {
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
		var n = q(e.split(" "), 2), r = n[0], i = n[1], a = uc(r || ""), o = uc(i || ""), s = K(K({}, a), o), c = {
			x: "50%",
			y: "50%"
		};
		return s.x && (c.x = s.x), s.y && (c.y = s.y), s.value && (s.x && !s.y && (c.y = s.value), !s.x && s.y && (c.x = s.value)), c;
	}
	return e === "left" ? { x: "0%" } : e === "right" ? { x: "100%" } : e === "top" ? { y: "0%" } : e === "bottom" ? { y: "100%" } : e ? e === "center" ? { value: "50%" } : { value: e } : {};
}
function dc(e, t, n) {
	var r = uc(e, !0), i = r.x, a = r.y;
	return [Ke(i, t) || 0, Ke(a, n) || 0];
}
function fc(e, t, n) {
	var r = e.map(function(e) {
		return G(e, t);
	}), i = r.map(function(e) {
		return It(e, n);
	});
	return {
		prev: r,
		next: i,
		result: i.map(function(e) {
			return Ot(e, t);
		})
	};
}
function pc(e, t) {
	return e.length === t.length && e.every(function(e, n) {
		var r = t[n], i = Ee(e), a = Ee(r);
		return i && a ? pc(e, r) : !i && !a && e === r;
	});
}
function mc(e, t, n, r, i) {
	var a = e._store, o = a[t];
	if (!(t in a)) if (i != null) a[t] = i, o = i;
	else return a[t] = n, n;
	return o === n || r(o) === r(n) ? o : (a[t] = n, n);
}
function hc(e) {
	return e >= 0 ? 1 : -1;
}
function Q(e) {
	return Math.abs(e);
}
function gc(e, t) {
	return rt(e).map(function(e) {
		return t(e);
	});
}
function _c(e) {
	return Oe(e) ? {
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
var vc = fr("pinchable", {
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
		}), f = X(e, t, {});
		r && (f.targets = r), n.isPinch = Z(e, l, f) !== !1, n.ables = d;
		var p = n.isPinch;
		return p ? (d.forEach(function(n) {
			if (a[n.name] = a[n.name] || {}, n[u]) {
				var r = K(K({}, t), {
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
			var l = i * (1 - 1 / r), u = X(e, t, {});
			s && (u.targets = s), Z(e, `onPinch${s ? "Group" : ""}`, u);
			var d = n.ables, f = `drag${s ? "Group" : ""}Control`;
			return d.forEach(function(n) {
				n[f] && n[f](e, K(K({}, t), {
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
			var s = `onPinch${a ? "Group" : ""}End`, c = zs(e, t, { isDrag: r });
			a && (c.targets = a), Z(e, s, c);
			var l = n.ables, u = `drag${a ? "Group" : ""}ControlEnd`;
			return l.forEach(function(n) {
				n[u] && n[u](e, K(K({}, t), {
					isDrag: r,
					datas: o[n.name],
					inputEvent: i,
					isPinch: !0
				}));
			}), r;
		}
	},
	pinchGroupStart: function(e, t) {
		return this.pinchStart(e, K(K({}, t), { targets: e.props.targets }));
	},
	pinchGroup: function(e, t) {
		return this.pinch(e, K(K({}, t), { targets: e.props.targets }));
	},
	pinchGroupEnd: function(e, t) {
		return this.pinchEnd(e, K(K({}, t), { targets: e.props.targets }));
	}
}), yc = tc("scalable"), bc = {
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
	render: Wi("scalable"),
	dragControlCondition: yc,
	viewClassName: ec("scalable"),
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.inputEvent, a = t.parentDirection, o = js(a, r, i, n), s = e.state, c = s.width, l = s.height, u = s.targetTransform, d = s.target, f = s.pos1, p = s.pos2, m = s.pos4;
		if (!o || !d) return !1;
		r || Wr(e, t), n.datas = {}, n.transform = u, n.prevDist = [1, 1], n.direction = o, n.startOffsetWidth = c, n.startOffsetHeight = l, n.startValue = [1, 1];
		var h = !o[0] && !o[1] || o[0] || !o[1];
		li(e, t, "scale"), n.isWidth = h;
		function g(e) {
			n.ratio = e && isFinite(e) ? e : 0;
		}
		n.startPositions = Ps(e.state);
		function _(e) {
			var t = no(n.startPositions, e);
			n.fixedDirection = t.fixedDirection, n.fixedPosition = t.fixedPosition, n.fixedOffset = t.fixedOffset;
		}
		n.setFixedDirection = _, g(tt(f, p) / tt(p, m)), _([-o[0], -o[1]]);
		var v = function(e) {
			n.minScaleSize = e;
		}, y = function(e) {
			n.maxScaleSize = e;
		};
		v([-Infinity, -Infinity]), y([Infinity, Infinity]);
		var b = X(e, t, K(K({
			direction: o,
			set: function(e) {
				n.startValue = e;
			},
			setRatio: g,
			setFixedDirection: _,
			setMinScaleSize: v,
			setMaxScaleSize: y
		}, ci(e, t)), { dragStart: to.dragStart(e, new Vr().dragStart([0, 0], t)) })), x = Z(e, "onScaleStart", b);
		return n.startFixedDirection = n.fixedDirection, x !== !1 && (n.isScale = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}), n.isScale ? b : !1;
	},
	dragControl: function(e, t) {
		Kr(e, t, "scale");
		var n = t.datas, r = t.parentKeepRatio, i = t.parentFlag, a = t.isPinch, o = t.dragClient, s = t.isRequest, c = t.useSnap, l = t.resolveMatrix, u = n.prevDist, d = n.direction, f = n.startOffsetWidth, p = n.startOffsetHeight, m = n.isScale, h = n.startValue, g = n.isWidth, _ = n.ratio;
		if (!m) return !1;
		var v = e.props, y = v.throttleScale, b = v.parentMoveable, x = d;
		!d[0] && !d[1] && (x = [1, 1]);
		var S = _ && (r ?? v.keepRatio) || !1, C = e.state, w = [h[0], h[1]];
		function T() {
			var e = lc(x, S, n, t), r = e.distWidth, i = e.distHeight, a = f ? (f + r) / f : 1, o = p ? (p + i) / p : 1;
			h[0] || (w[0] = r / f), h[1] || (w[1] = i / p);
			var s = (x[0] || S ? a : 1) * w[0], c = (x[1] || S ? o : 1) * w[1];
			return s === 0 && (s = hc(u[0]) * Nr), c === 0 && (c = hc(u[1]) * Nr), [s, c];
		}
		var E = T();
		if (!a && e.props.groupable) {
			var D = (C.snapRenderInfo || {}).direction;
			Ee(D) && (D[0] || D[1]) && (C.snapRenderInfo = {
				direction: d,
				request: t.isRequest
			});
		}
		Z(e, "onBeforeScale", X(e, t, {
			scale: E,
			setFixedDirection: function(e) {
				return n.setFixedDirection(e), E = T(), E;
			},
			startFixedDirection: n.startFixedDirection,
			setScale: function(e) {
				E = e;
			}
		}, !0));
		var O = [E[0] / w[0], E[1] / w[1]], k = o, A = [0, 0], j = hc(O[0] * O[1]), M = !o && !i && a;
		if (M || l ? k = _i(e, n.targetAllTransform, [0, 0], [0, 0], n) : o || (k = n.fixedPosition), a || (A = Uo(e, O, d, !c && s, n)), S) {
			x[0] && x[1] && A[0] && A[1] && (Math.abs(A[0] * f) > Math.abs(A[1] * p) ? A[1] = 0 : A[0] = 0);
			var N = !A[0] && !A[1];
			if (N && (g ? O[0] = W(O[0] * w[0], y) / w[0] : O[1] = W(O[1] * w[1], y) / w[1]), x[0] && !x[1] || A[0] && !A[1] || N && g) {
				O[0] += A[0];
				var P = f * O[0] * w[0] / _;
				O[1] = hc(j * O[0]) * Q(P / p / w[1]);
			} else if (!x[0] && x[1] || !A[0] && A[1] || N && !g) {
				O[1] += A[1];
				var F = p * O[1] * w[1] * _;
				O[0] = hc(j * O[1]) * Q(F / f / w[0]);
			}
		} else O[0] += A[0], O[1] += A[1], A[0] || (O[0] = W(O[0] * w[0], y) / w[0]), A[1] || (O[1] = W(O[1] * w[1], y) / w[1]);
		O[0] === 0 && (O[0] = hc(u[0]) * Nr), O[1] === 0 && (O[1] = hc(u[1]) * Nr), E = Yo(O, [w[0], w[1]]);
		var I = [f, p], L = [f * E[0], p * E[1]];
		L = Ye(L, n.minScaleSize, n.maxScaleSize, S ? _ : !1), E = gc(2, function(e) {
			return I[e] ? L[e] / I[e] : L[e];
		}), O = gc(2, function(e) {
			return E[e] / w[e];
		});
		var R = gc(2, function(e) {
			return u[e] ? O[e] / u[e] : O[e];
		}), z = `scale(${O.join(", ")})`, B = `scale(${E.join(", ")})`, ee = qr(n, B, z), V = !h[0] || !h[1], te = yi(e, V ? B : z, n.fixedDirection, k, n.fixedOffset, n, V), ne = M ? te : G(te, n.prevInverseDist || [0, 0]);
		if (n.prevDist = O, n.prevInverseDist = te, E[0] === u[0] && E[1] === u[1] && ne.every(function(e) {
			return !e;
		}) && !b && !M) return !1;
		var re = X(e, t, K({
			offsetWidth: f,
			offsetHeight: p,
			direction: d,
			scale: E,
			dist: O,
			delta: R,
			isPinch: !!a
		}, gi(e, ee, ne, a, t)));
		return Z(e, "onScale", re), re;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (!n.isScale) return !1;
		n.isScale = !1;
		var r = zs(e, t, {});
		return Z(e, "onScaleEnd", r), r;
	},
	dragGroupControlCondition: yc,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, t);
		if (!r) return !1;
		var i = Ii(e, "resizable", t);
		n.moveableScale = e.scale;
		var a = Ri(e, this, "dragControlStart", t, function(t, r) {
			return zi(e, t, n, r);
		}), o = function(t) {
			r.setFixedDirection(t), a.forEach(function(r, a) {
				r.setFixedDirection(t), zi(e, r.moveable, n, i[a]);
			});
		};
		n.setFixedDirection = o;
		var s = K(K({}, r), {
			targets: e.props.targets,
			events: a,
			setFixedDirection: o
		});
		return n.isScale = Z(e, "onScaleGroupStart", s) !== !1, n.isScale ? s : !1;
	},
	dragGroupControl: function(e, t) {
		var n = t.datas;
		if (n.isScale) {
			Bs(e, "onBeforeScale", function(n) {
				Z(e, "onBeforeScaleGroup", X(e, t, K(K({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = r.dist, a = n.moveableScale;
				e.scale = [i[0] * a[0], i[1] * a[1]];
				var o = e.props.keepRatio, s = n.fixedPosition, c = Ri(e, this, "dragControl", t, function(t, n) {
					var r = q(jt(zt(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * i[0],
						n.datas.originalY * i[1],
						1
					], 3), 2), a = r[0], c = r[1];
					return K(K({}, n), {
						parentDist: null,
						parentScale: i,
						parentKeepRatio: o,
						dragClient: Ot(s, [a, c])
					});
				}), l = K({
					targets: e.props.targets,
					events: c
				}, r);
				return Z(e, "onScaleGroup", l), l;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isScale) {
			this.dragControlEnd(e, t);
			var r = Ri(e, this, "dragControlEnd", t);
			return Z(e, "onScaleGroupEnd", zs(e, t, {
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
function xc(e, t) {
	return e.map(function(e, n) {
		return Ce(e, t[n], 1, 2);
	});
}
function Sc(e, t, n) {
	var r = Qe(e, t), i = Qe(e, n) - r;
	return i >= 0 ? i : i + 2 * Math.PI;
}
function Cc(e, t) {
	var n = Sc(e[0], e[1], e[2]), r = Sc(t[0], t[1], t[2]), i = Math.PI;
	return !(n >= i && r <= i || n <= i && r >= i);
}
var wc = {
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
	viewClassName: ec("warpable"),
	render: function(e, t) {
		var n = e.props, r = n.resizable, i = n.scalable, a = n.warpable, o = n.zoom;
		if (r || i || !a) return [];
		var s = e.state, c = s.pos1, l = s.pos2, u = s.pos3, d = s.pos4, f = xc(c, l), p = xc(l, c), m = xc(c, u), h = xc(u, c), g = xc(u, d), _ = xc(d, u), v = xc(l, d), y = xc(d, l);
		return J([
			t.createElement("div", {
				className: Y("line"),
				key: "middeLine1",
				style: xs(f, g, o)
			}),
			t.createElement("div", {
				className: Y("line"),
				key: "middeLine2",
				style: xs(p, _, o)
			}),
			t.createElement("div", {
				className: Y("line"),
				key: "middeLine3",
				style: xs(m, v, o)
			}),
			t.createElement("div", {
				className: Y("line"),
				key: "middeLine4",
				style: xs(h, y, o)
			})
		], q(Gi(e, "warpable", t)), !1);
	},
	dragControlCondition: function(e, t) {
		if (t.isRequest) return !1;
		var n = t.inputEvent.target;
		return at(n, Y("direction")) && at(n, Y("warpable"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.inputEvent, i = e.props.target, a = r.target, o = Ms(a, n);
		if (!o || !i) return !1;
		var s = e.state, c = s.transformOrigin, l = s.is3d, u = s.targetTransform, d = s.targetMatrix, f = s.width, p = s.height, m = s.left, h = s.top;
		return n.datas = {}, n.targetTransform = u, n.warpTargetMatrix = l ? d : Tt(d, 3, 4), n.targetInverseMatrix = yt(bt(n.warpTargetMatrix, 4), 3, 4), n.direction = o, n.left = m, n.top = h, n.poses = [
			[0, 0],
			[f, 0],
			[0, p],
			[f, p]
		].map(function(e) {
			return G(e, c);
		}), n.nextPoses = n.poses.map(function(e) {
			var t = q(e, 2), r = t[0], i = t[1];
			return jt(n.warpTargetMatrix, [
				r,
				i,
				0,
				1
			], 4);
		}), n.startValue = Bt(4), n.prevMatrix = Bt(4), n.absolutePoses = Ps(s), n.posIndexes = ei(o), Wr(e, t), li(e, t, "matrix3d"), s.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}, Z(e, "onWarpStart", X(e, t, K({ set: function(e) {
			n.startValue = e;
		} }, ci(e, t)))) !== !1 && (n.isWarp = !0), n.isWarp;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isRequest, i = t.distX, a = t.distY, o = n.targetInverseMatrix, s = n.prevMatrix, c = n.isWarp, l = n.startValue, u = n.poses, d = n.posIndexes, f = n.absolutePoses;
		if (!c) return !1;
		if (Kr(e, t, "matrix3d"), sa(e, "warpable")) {
			var p = d.map(function(e) {
				return f[e];
			});
			p.length > 1 && p.push([(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]);
			var m = Ja(e, r, {
				horizontal: p.map(function(e) {
					return e[1] + a;
				}),
				vertical: p.map(function(e) {
					return e[0] + i;
				})
			}), h = m.horizontal, g = m.vertical;
			a -= h.offset, i -= g.offset;
		}
		var _ = Zr({
			datas: n,
			distX: i,
			distY: a
		}, !0), v = n.nextPoses.slice();
		if (d.forEach(function(e) {
			v[e] = Ot(v[e], _);
		}), !Ar.every(function(e) {
			return Cc(e.map(function(e) {
				return u[e];
			}), e.map(function(e) {
				return v[e];
			}));
		})) return !1;
		var y = Ut(u[0], u[2], u[1], u[3], v[0], v[2], v[1], v[3]);
		if (!y.length) return !1;
		var b = Yr(n, Dt(o, y, 4), !0), x = Dt(bt(s, 4), b, 4);
		n.prevMatrix = b;
		var S = Dt(l, b, 4), C = qr(n, `matrix3d(${S.join(", ")})`, `matrix3d(${b.join(", ")})`);
		return di(t, C), Z(e, "onWarp", X(e, t, K({
			delta: x,
			matrix: S,
			dist: b,
			multiply: Dt,
			transform: C
		}, Ls({ transform: C }, t)))), !0;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.isDrag;
		return n.isWarp ? (n.isWarp = !1, Z(e, "onWarpEnd", zs(e, t, {})), r) : !1;
	}
}, Tc = /*#__PURE__*/ Y("area-pieces"), Ec = /*#__PURE__*/ Y("area-piece"), Dc = /*#__PURE__*/ Y("avoid"), Oc = Y("view-dragging");
function kc(e) {
	var t = e.areaElement;
	if (t) {
		var n = e.state, r = n.width, i = n.height;
		st(t, Dc), t.style.cssText += `left: 0px; top: 0px; width: ${r}px; height: ${i}px`;
	}
}
function Ac(e) {
	return e.createElement("div", {
		key: "area_pieces",
		className: Tc
	}, e.createElement("div", { className: Ec }), e.createElement("div", { className: Ec }), e.createElement("div", { className: Ec }), e.createElement("div", { className: Ec }));
}
var jc = {
	name: "dragArea",
	props: ["dragArea", "passDragArea"],
	events: ["click", "clickGroup"],
	render: function(e, t) {
		var n = e.props, r = n.target, i = n.dragArea, a = n.groupable, o = n.passDragArea, s = e.getState(), c = s.width, l = s.height, u = s.renderPoses, d = o ? Y("area", "pass") : Y("area");
		if (a) return [t.createElement("div", {
			key: "area",
			ref: ue(e, "areaElement"),
			className: d
		}), Ac(t)];
		if (!r || !i) return [];
		var f = Ut([0, 0], [c, 0], [0, l], [c, l], u[0], u[1], u[2], u[3]), p = f.length ? ls(f, !0) : "none";
		return [t.createElement("div", {
			key: "area",
			ref: ue(e, "areaElement"),
			className: d,
			style: {
				top: "0px",
				left: "0px",
				width: `${c}px`,
				height: `${l}px`,
				transformOrigin: "0 0",
				transform: p
			}
		}), Ac(t)];
	},
	dragStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY;
		if (!t.inputEvent) return !1;
		n.isDragArea = !1;
		var a = e.areaElement, o = e.state, s = o.moveableClientRect, c = o.renderPoses, l = o.rootMatrix, u = o.is3d, d = s.left, f = s.top, p = hs(c), m = p.left, h = p.top, g = p.width, _ = p.height, v = u ? 4 : 3, y = q(Ys(l, [r - d, i - f], v), 2), b = y[0], x = y[1];
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
		}), ot(a, Dc), o.disableNativeEvent = !0;
	},
	drag: function(e, t) {
		var n = t.datas, r = t.inputEvent;
		if (this.enableNativeEvent(e), !r) return !1;
		n.isDragArea || (n.isDragArea = !0, kc(e));
	},
	dragEnd: function(e, t) {
		this.enableNativeEvent(e);
		var n = t.inputEvent, r = t.datas;
		if (!n) return !1;
		r.isDragArea || kc(e);
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
		kc(e), e.state.disableNativeEvent = !1;
	},
	enableNativeEvent: function(e) {
		var t = e.state;
		t.disableNativeEvent && Ue(function() {
			t.disableNativeEvent = !1;
		});
	}
}, Mc = fr("origin", {
	props: ["origin", "svgOrigin"],
	render: function(e, t) {
		var n = e.props, r = n.zoom, i = n.svgOrigin, a = n.groupable, o = e.getState(), s = o.beforeOrigin, c = o.rotation, l = o.svg, u = o.allMatrix, d = o.is3d, f = o.left, p = o.top, m = o.offsetWidth, h = o.offsetHeight, g;
		if (!a && l && i) {
			var _ = q(dc(i, m, h), 2), v = _[0], y = _[1];
			g = Ss(c, r, G(ps(u, [v, y], d ? 4 : 3), [f, p]));
		} else g = Ss(c, r, s);
		return [t.createElement("div", {
			className: Y("control", "origin"),
			style: g,
			key: "beforeOrigin"
		})];
	}
});
function Nc(e) {
	var t = e.scrollContainer;
	return [t.scrollLeft, t.scrollTop];
}
var Pc = {
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
		var n = e.props, r = n.scrollContainer, i = r === void 0 ? e.getContainer() : r, a = n.scrollOptions, o = new yn(), s = ic(i, !0);
		t.datas.dragScroll = o, e.state.dragScroll = o;
		var c = t.isControl ? "controlGesto" : "targetGesto", l = t.targets;
		o.on("scroll", function(n) {
			var r = n.container, i = n.direction, a = X(e, t, {
				scrollContainer: r,
				direction: i
			}), o = l ? "onScrollGroup" : "onScroll";
			l && (a.targets = l), Z(e, o, a);
		}).on("move", function(t) {
			var n = t.offsetX, r = t.offsetY, i = t.inputEvent;
			e[c].scrollBy(n, r, i.inputEvent, !1);
		}).on("scrollDrag", function(t) {
			var n = t.next;
			n(e[c].getCurrentEvent());
		}), o.dragStart(t, K({ container: s }, a));
	},
	checkScroll: function(e, t) {
		var n = t.datas.dragScroll;
		if (n) {
			var r = e.props, i = r.scrollContainer, a = i === void 0 ? e.getContainer() : i, o = r.scrollThreshold, s = o === void 0 ? 0 : o, c = r.scrollThrottleTime, l = c === void 0 ? 0 : c, u = r.getScrollPosition, d = u === void 0 ? Nc : u, f = r.scrollOptions;
			return n.drag(t, K({
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
		return this.dragStart(e, K(K({}, t), { isControl: !0 }));
	},
	dragControl: function(e, t) {
		return this.drag(e, t);
	},
	dragControlEnd: function(e, t) {
		return this.dragEnd(e, t);
	},
	dragGroupStart: function(e, t) {
		return this.dragStart(e, K(K({}, t), { targets: e.props.targets }));
	},
	dragGroup: function(e, t) {
		return this.drag(e, K(K({}, t), { targets: e.props.targets }));
	},
	dragGroupEnd: function(e, t) {
		return this.dragEnd(e, K(K({}, t), { targets: e.props.targets }));
	},
	dragGroupControlStart: function(e, t) {
		return this.dragStart(e, K(K({}, t), {
			targets: e.props.targets,
			isControl: !0
		}));
	},
	dragGroupControl: function(e, t) {
		return this.drag(e, K(K({}, t), { targets: e.props.targets }));
	},
	dragGroupControEnd: function(e, t) {
		return this.dragEnd(e, K(K({}, t), { targets: e.props.targets }));
	},
	unset: function(e) {
		var t, n = e.state;
		(t = n.dragScroll) == null || t.dragEnd(), n.dragScroll = null;
	}
}, Fc = {
	name: "",
	props: /* @__PURE__ */ "target.dragTargetSelf.dragTarget.dragContainer.container.warpSelf.rootContainer.useResizeObserver.useMutationObserver.zoom.dragFocusedInput.transformOrigin.ables.className.pinchThreshold.pinchOutside.triggerAblesSimultaneously.checkInput.cspNonce.translateZ.hideDefaultLines.props.flushSync.stopPropagation.preventClickEventOnDrag.preventClickDefault.viewContainer.persistData.useAccuratePosition.firstRenderState.linePadding.controlPadding.preventDefault.preventRightClick.preventWheelClick.requestStyles".split("."),
	events: ["changeTargets"]
}, Ic = fr("padding", {
	props: ["padding"],
	render: function(e, t) {
		var n = e.props;
		if (n.dragArea) return [];
		var r = _c(n.padding || {}), i = r.left, a = r.top, o = r.right, s = r.bottom, c = e.getState(), l = c.renderPoses, u = [
			c.pos1,
			c.pos2,
			c.pos3,
			c.pos4
		], d = [];
		return i > 0 && d.push([0, 2]), a > 0 && d.push([0, 1]), o > 0 && d.push([1, 3]), s > 0 && d.push([2, 3]), d.map(function(e, n) {
			var r = q(e, 2), i = r[0], a = r[1], o = u[i], s = u[a], c = l[i], d = l[a], f = Ut([0, 0], [100, 0], [0, 100], [100, 100], o, s, c, d);
			if (f.length) return t.createElement("div", {
				key: `padding${n}`,
				className: Y("padding"),
				style: { transform: ls(f, !0) }
			});
		});
	}
}), Lc = [
	"nw",
	"ne",
	"se",
	"sw"
];
function Rc(e, t) {
	var n = e[0] + e[1], r = n > t ? t / n : 1;
	return e[0] *= r, e[1] = t - e[1] * r, e;
}
var zc = [
	1,
	2,
	5,
	6
], Bc = [
	0,
	3,
	4,
	7
], Vc = [
	1,
	-1,
	-1,
	1
], Hc = [
	1,
	1,
	-1,
	-1
];
function Uc(e, t, n, r, i, a, o, s) {
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
				return c.push(Qs(p, r, t)), p;
			} else {
				var p = Math.max(0, u === 1 ? f[0] - i : o - f[0]);
				return c.push(Qs(p, n, t)), p;
			}
		})
	};
}
function Wc(e) {
	for (var t = [0, 0], n = [0, 0], r = e.length, i = 0; i < r; ++i) {
		var a = e[i];
		a.sub && (a.horizontal && (t[1] === 0 && (t[0] = i), t[1] = i - t[0] + 1, n[0] = i + 1), a.vertical && (n[1] === 0 && (n[0] = i), n[1] = i - n[0] + 1));
	}
	return {
		horizontalRange: t,
		verticalRange: n
	};
}
function Gc(e, t, n, r, i, a, o) {
	var s, c, l, u;
	a === void 0 && (a = [0, 0]), o === void 0 && (o = !1);
	var d = e.indexOf("/"), f = (d > -1 ? e.slice(0, d) : e).length, p = e.slice(0, f), m = e.slice(f + 1), h = p.length, g = m.length, _ = g > 0, v = q(p, 4), y = v[0], b = y === void 0 ? "0px" : y, x = v[1], S = x === void 0 ? b : x, C = v[2], w = C === void 0 ? b : C, T = v[3], E = T === void 0 ? S : T, D = q(m, 4), O = D[0], k = O === void 0 ? b : O, A = D[1], j = A === void 0 ? _ ? k : S : A, M = D[2], N = M === void 0 ? _ ? k : w : M, P = D[3], F = P === void 0 ? _ ? j : E : P, I = [
		b,
		S,
		w,
		E
	].map(function(e) {
		return Ke(e, t);
	}), L = [
		k,
		j,
		N,
		F
	].map(function(e) {
		return Ke(e, n);
	}), R = I.slice(), z = L.slice();
	s = q(Rc([R[0], R[1]], t), 2), R[0] = s[0], R[1] = s[1], c = q(Rc([R[3], R[2]], t), 2), R[3] = c[0], R[2] = c[1], l = q(Rc([z[0], z[3]], n), 2), z[0] = l[0], z[3] = l[1], u = q(Rc([z[1], z[2]], n), 2), z[1] = u[0], z[2] = u[1];
	var B = o ? R : R.slice(0, Math.max(a[0], h)), ee = o ? z : z.slice(0, Math.max(a[1], g));
	return J(J([], q(B.map(function(e, t) {
		var a = Lc[t];
		return {
			virtual: t >= h,
			horizontal: Vc[t],
			vertical: 0,
			pos: [r + e, i + (Hc[t] === -1 ? n : 0)],
			sub: !0,
			raw: I[t],
			direction: a
		};
	})), !1), q(ee.map(function(e, n) {
		var a = Lc[n];
		return {
			virtual: n >= g,
			horizontal: 0,
			vertical: Hc[n],
			pos: [r + (Vc[n] === -1 ? t : 0), i + e],
			sub: !0,
			raw: L[n],
			direction: a
		};
	})), !1);
}
function Kc(e, t, n, r, i) {
	i === void 0 && (i = t.length);
	var a = Wc(e.slice(r)), o = a.horizontalRange, s = a.verticalRange, c = n - r, l = 0;
	if (c === 0) l = i;
	else if (c > 0 && c < o[1]) l = o[1] - c;
	else if (c >= s[0]) l = s[0] + s[1] - c;
	else return;
	e.splice(n, l), t.splice(n, l);
}
function qc(e, t, n, r, i, a, o, s, c, l, u) {
	l === void 0 && (l = 0), u === void 0 && (u = 0);
	var d = Wc(e.slice(n)), f = d.horizontalRange, p = d.verticalRange;
	if (r > -1) for (var m = Vc[r] === 1 ? a - l : s - a, h = f[1]; h <= r; ++h) {
		var g = Hc[h] === 1 ? u : c, _ = 0;
		if (r === h ? _ = a : h === 0 ? _ = l + m : Vc[h] === -1 && (_ = s - (t[n][0] - l)), e.splice(n + h, 0, {
			horizontal: Vc[h],
			vertical: 0,
			pos: [_, g]
		}), t.splice(n + h, 0, [_, g]), h === 0) break;
	}
	else if (i > -1) {
		var v = Hc[i] === 1 ? o - u : c - o;
		if (f[1] === 0 && p[1] === 0) {
			var y = [l + v, u];
			e.push({
				horizontal: Vc[0],
				vertical: 0,
				pos: y
			}), t.push(y);
		}
		for (var b = p[0], h = p[1]; h <= i; ++h) {
			var _ = Vc[h] === 1 ? l : s, g = 0;
			if (i === h ? g = o : h === 0 ? g = u + v : Hc[h] === 1 ? g = t[n + b][1] : Hc[h] === -1 && (g = c - (t[n + b][1] - u)), e.push({
				horizontal: 0,
				vertical: Hc[h],
				pos: [_, g]
			}), t.push([_, g]), h === 0) break;
		}
	}
}
function Jc(e, t) {
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
var Yc = [[
	0,
	-1,
	"n"
], [
	1,
	0,
	"e"
]], Xc = [
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
function Zc(e, t, n) {
	var r = e.props.clipRelative, i = e.state, a = i.width, o = i.height, s = t, c = s.type, l = s.poses, u = c === "rect", d = c === "circle";
	if (c === "polygon") return n.map(function(e) {
		return `${Qs(e[0], a, r)} ${Qs(e[1], o, r)}`;
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
			return Qs(e, t % 2 ? a : o, r);
		});
		if (n.length > 8) {
			var _ = q(G(n[4], n[0]), 2), v = _[0], y = _[1];
			g.push.apply(g, J(["round"], q(Uc(l.slice(8).map(function(e, t) {
				return K(K({}, e), { pos: n[t] });
			}), r, v, y, m, f, p, h).styles), !1));
		}
		return g;
	} else if (d || c === "ellipse") {
		var b = n[0], x = Qs(Q(n[1][1] - b[1]), d ? Math.sqrt((a * a + o * o) / 2) : o, r), g = d ? [x] : [Qs(Q(n[2][0] - b[0]), a, r), x];
		return g.push("at", Qs(b[0], a, r), Qs(b[1], o, r)), g;
	}
}
function Qc(e, t, n, r) {
	var i = [
		r,
		(r + t) / 2,
		t
	], a = [
		e,
		(e + n) / 2,
		n
	];
	return Xc.map(function(e) {
		var t = q(e, 3), n = t[0], r = t[1], o = t[2], s = i[n + 1], c = a[r + 1];
		return {
			vertical: Q(r),
			horizontal: Q(n),
			direction: o,
			pos: [s, c]
		};
	});
}
function $c(e) {
	var t = [Infinity, -Infinity], n = [Infinity, -Infinity];
	return e.forEach(function(e) {
		var r = e.pos;
		t[0] = Math.min(t[0], r[0]), t[1] = Math.max(t[1], r[0]), n[0] = Math.min(n[0], r[1]), n[1] = Math.max(n[1], r[1]);
	}), [Q(t[1] - t[0]), Q(n[1] - n[0])];
}
function el(e, t, n, r, i) {
	var a, o, s, c, l, u, d, f, p;
	if (e) {
		var m = i;
		if (!m) {
			var h = Fi(e), g = h("clipPath");
			m = g === "none" ? h("clip") : g;
		}
		if (!((!m || m === "none" || m === "auto") && (m = r, !m))) {
			var _ = Le(m), v = _.prefix, y = v === void 0 ? m : v, b = _.value, x = b === void 0 ? "" : b, S = y === "circle", C = " ";
			if (y === "polygon") {
				var w = Ie(x || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
				C = ",";
				var T = w.map(function(e) {
					var r = q(e.split(" "), 2), i = r[0], a = r[1];
					return {
						vertical: 1,
						horizontal: 1,
						pos: [Ke(i, t), Ke(a, n)]
					};
				}), E = En(T.map(function(e) {
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
			} else if (S || y === "ellipse") {
				var D = "", O = "", k = 0, A = 0, w = Fe(x);
				if (S) {
					var j = "";
					a = q(w, 4), o = a[0], j = o === void 0 ? "50%" : o, s = a[2], D = s === void 0 ? "50%" : s, c = a[3], O = c === void 0 ? "50%" : c, k = Ke(j, Math.sqrt((t * t + n * n) / 2)), A = k;
				} else {
					var M = "", N = "";
					l = q(w, 5), u = l[0], M = u === void 0 ? "50%" : u, d = l[1], N = d === void 0 ? "50%" : d, f = l[3], D = f === void 0 ? "50%" : f, p = l[4], O = p === void 0 ? "50%" : p, k = Ke(M, t), A = Ke(N, n);
				}
				var P = [Ke(D, t), Ke(O, n)], T = J([{
					vertical: 1,
					horizontal: 1,
					pos: P,
					direction: "nesw"
				}], q(Yc.slice(0, S ? 1 : 2).map(function(e) {
					return {
						vertical: Q(e[1]),
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
			} else if (y === "inset") {
				var w = Fe(x || "0 0 0 0"), F = w.indexOf("round"), I = (F > -1 ? w.slice(0, F) : w).length, L = w.slice(I + 1), R = q(w.slice(0, I), 4), z = R[0], B = R[1], ee = B === void 0 ? z : B, V = R[2], te = V === void 0 ? z : V, ne = R[3], re = ne === void 0 ? ee : ne, H = q([z, te].map(function(e) {
					return Ke(e, n);
				}), 2), U = H[0], ie = H[1], ae = q([re, ee].map(function(e) {
					return Ke(e, t);
				}), 2), oe = ae[0], se = ae[1], ce = t - se, le = n - ie, ue = Gc(L, ce - oe, le - U, oe, U), T = J(J([], q(Qc(U, ce, le, oe)), !1), q(ue), !1);
				return {
					type: "inset",
					clipText: m,
					poses: T,
					top: U,
					left: oe,
					right: ce,
					bottom: le,
					radius: L,
					splitter: C
				};
			} else if (y === "rect") {
				var w = Ie(x || `0px, ${t}px, ${n}px, 0px`);
				C = ",";
				var de = q(w.map(function(e) {
					return Re(e).value;
				}), 4), fe = de[0], se = de[1], ie = de[2], oe = de[3], T = Qc(fe, se, ie, oe);
				return {
					type: "rect",
					clipText: m,
					poses: T,
					top: fe,
					right: se,
					bottom: ie,
					left: oe,
					values: w,
					splitter: C
				};
			}
		}
	}
}
function tl(e, t, n, r, i) {
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
		var m = q($c(e), 2), h = m[0], g = m[1], _ = h && g ? h / g : 0;
		if (_ && i) {
			var v = e[(t + 4) % 8].pos, y = [0, 0];
			o.indexOf("w") > -1 ? y[0] = -1 : o.indexOf("e") > -1 && (y[0] = 1), o.indexOf("n") > -1 ? y[1] = -1 : o.indexOf("s") > -1 && (y[1] = 1);
			var b = cc([h, g], n, _, y, !0), x = h + b[0], S = g + b[1], C = v[1], w = v[1], T = v[0], E = v[0];
			y[0] === -1 ? T = E - x : y[0] === 1 ? E = T + x : (T -= x / 2, E += x / 2), y[1] === -1 ? C = w - S : (y[1] === 1 || (C = w - S / 2), w = C + S);
			var D = Qc(C, E, w, T);
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
function nl(e, t) {
	var n = q(Ur(e, t), 2), r = n[0], i = n[1], a = t.datas, o = a.clipPath, s = a.clipIndex, c = o, l = c.type, u = c.poses, d = c.splitter, f = u.map(function(e) {
		return e.pos;
	});
	if (l === "polygon") f.splice(s, 0, [r, i]);
	else if (l === "inset") {
		var p = zc.indexOf(s), m = Bc.indexOf(s), h = u.length;
		if (qc(u, f, 8, p, m, r, i, f[4][0], f[4][1], f[0][0], f[0][1]), h === u.length) return;
	} else return;
	var g = Zc(e, o, f), _ = `${l}(${g.join(d)})`;
	Z(e, "onClip", X(e, t, K({
		clipEventType: "added",
		clipType: l,
		poses: f,
		clipStyles: g,
		clipStyle: _,
		distX: 0,
		distY: 0
	}, Ls({ clipPath: _ }, t))));
}
function rl(e, t) {
	var n = t.datas, r = n.clipPath, i = n.clipIndex, a = r, o = a.type, s = a.poses, c = a.splitter, l = s.map(function(e) {
		return e.pos;
	}), u = l.length;
	if (o === "polygon") s.splice(i, 1), l.splice(i, 1);
	else if (o === "inset") {
		if (i < 8 || (Kc(s, l, i, 8, u), u === s.length)) return;
	} else return;
	var d = Zc(e, r, l), f = `${o}(${d.join(c)})`;
	Z(e, "onClip", X(e, t, K({
		clipEventType: "removed",
		clipType: o,
		poses: l,
		clipStyles: d,
		clipStyle: f,
		distX: 0,
		distY: 0
	}, Ls({ clipPath: f }, t))));
}
var il = {
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
		var C = el(l, u, d, i || "inset", b || r);
		if (!C) return [];
		var w = p ? 4 : 3, T = C.type, E = C.poses.map(function(e) {
			var t = ps(f, e.pos, w);
			return [t[0] - m, t[1] - h];
		}), D = [], O = [], k = T === "rect", A = T === "inset", j = T === "polygon";
		if (k || A || j) {
			var M = A ? E.slice(0, 8) : E;
			O = M.map(function(e, n) {
				var r = n === 0 ? M[M.length - 1] : M[n - 1], i = Qe(r, e), a = bs(r, e);
				return t.createElement("div", {
					key: `clipLine${n}`,
					className: Y("line", "clip-line", "snap-control"),
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
				className: Y("control", "clip-control", "snap-control"),
				"data-clip-index": n,
				style: { transform: `translate(${e[0]}px, ${e[1]}px) rotate(${S}rad) scale(${o})` }
			});
		}), A && D.push.apply(D, J([], q(E.slice(8).map(function(e, n) {
			return t.createElement("div", {
				key: `clipRadiusControl${n}`,
				className: Y("control", "clip-control", "clip-radius", "snap-control"),
				"data-clip-index": 8 + n,
				style: { transform: `translate(${e[0]}px, ${e[1]}px) rotate(${S}rad) scale(${o})` }
			});
		})), !1)), T === "circle" || T === "ellipse") {
			var N = C.left, P = C.top, F = C.radiusX, I = C.radiusY, L = q(G(ps(f, [N, P], w), ps(f, [0, 0], w)), 2), R = L[0], z = L[1], B = "none";
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
				className: Y("clip-ellipse", "snap-control"),
				style: {
					width: `${F * 2}px`,
					height: `${I * 2}px`,
					clipPath: B,
					transform: `translate(${-m + R}px, ${-h + z}px) ${ls(f)}`
				}
			}));
		}
		if (a) {
			var re = hs(J([
				g,
				_,
				v,
				y
			], q(E), !1)), H = re.width, U = re.height, ie = re.left, ae = re.top;
			if (j || k || A) {
				var V = A ? E.slice(0, 8) : E;
				D.push(t.createElement("div", {
					key: "clipArea",
					className: Y("clip-area", "snap-control"),
					style: {
						width: `${H}px`,
						height: `${U}px`,
						transform: `translate(${ie}px, ${ae}px)`,
						clipPath: `polygon(${V.map(function(e) {
							return `${e[0] - ie}px ${e[1] - ae}px`;
						}).join(", ")})`
					}
				}));
			}
		}
		return x && ["vertical", "horizontal"].forEach(function(e) {
			var n = x[e], r = e === "horizontal";
			n.isSnap && O.push.apply(O, J([], q(n.snap.posInfos.map(function(n, i) {
				var a = n.pos;
				return Hi(t, "", G(ps(f, r ? [0, a] : [a, 0], w), [m, h]), G(ps(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}snap${i}`, "guideline");
			})), !1)), n.isBound && O.push.apply(O, J([], q(n.bounds.map(function(n, i) {
				var a = n.pos;
				return Hi(t, "", G(ps(f, r ? [0, a] : [a, 0], w), [m, h]), G(ps(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}bounds${i}`, "guideline", "bounds", "bold");
			})), !1));
		}), J(J([], q(D), !1), q(O), !1);
	},
	dragControlCondition: function(e, t) {
		return t.inputEvent && (t.inputEvent.target.getAttribute("class") || "").indexOf("clip") > -1;
	},
	dragStart: function(e, t) {
		var n = e.props.dragWithClip;
		return n === void 0 || n ? !1 : this.dragControlStart(e, t);
	},
	drag: function(e, t) {
		return this.dragControl(e, K(K({}, t), { isDragTarget: !0 }));
	},
	dragEnd: function(e, t) {
		return this.dragControlEnd(e, t);
	},
	dragControlStart: function(e, t) {
		var n = e.state, r = e.props, i = r.defaultClipPath, a = r.customClipPath, o = n.target, s = n.width, c = n.height, l = t.inputEvent ? t.inputEvent.target : null, u = l && l.getAttribute("class") || "", d = t.datas, f = el(o, s, c, i || "inset", a);
		if (!f) return !1;
		var p = f.clipText, m = f.type, h = f.poses;
		return Z(e, "onClipStart", X(e, t, {
			clipType: m,
			clipStyle: p,
			poses: h.map(function(e) {
				return e.pos;
			})
		})) === !1 ? (d.isClipStart = !1, !1) : (d.isControl = u && u.indexOf("clip-control") > -1, d.isLine = u.indexOf("clip-line") > -1, d.isArea = u.indexOf("clip-area") > -1 || u.indexOf("clip-ellipse") > -1, d.clipIndex = l ? parseInt(l.getAttribute("data-clip-index"), 10) : -1, d.clipPath = f, d.isClipStart = !0, n.clipPathState = p, Wr(e, t), !0);
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.originalDatas, s = t.isDragTarget;
		if (!a.isClipStart) return !1;
		var c = a, l = c.isControl, u = c.isLine, d = c.isArea, f = c.clipIndex, p = c.clipPath;
		if (!p) return !1;
		var m = Cs(e.props, "clippable"), h = m.keepRatio, g = 0, _ = 0, v = o.draggable, y = Zr(t);
		s && v ? (n = q(v.prevBeforeDist, 2), g = n[0], _ = n[1]) : (r = q(y, 2), g = r[0], _ = r[1]);
		var b = [g, _], x = e.state, S = x.width, C = x.height, w = !d && !l && !u, T = p.type, E = p.poses, D = p.splitter, O = E.map(function(e) {
			return e.pos;
		});
		w && (g = -g, _ = -_);
		var k = !l || E[f].direction === "nesw", A = T === "inset" || T === "rect", j = E.map(function() {
			return [0, 0];
		});
		if (l && !k) {
			var M = E[f], N = M.horizontal, P = M.vertical;
			j = tl(E, f, [g * Q(N), _ * Q(P)], A, h);
		} else k && (j = O.map(function() {
			return [g, _];
		}));
		var F = O.map(function(e, t) {
			return Ot(e, j[t]);
		}), I = J([], q(F), !1);
		x.snapBoundInfos = null;
		var L = p.type === "circle", R = p.type === "ellipse";
		if (L || R) {
			var z = hs(F), B = Q(z.bottom - z.top), ee = Q(R ? z.right - z.left : B), V = F[0][1] + B, te = F[0][0] - ee, ne = F[0][0] + ee;
			L && (I.push([ne, z.bottom]), j.push([1, 0])), I.push([z.left, V]), j.push([0, 1]), I.push([te, z.bottom]), j.push([1, 0]);
		}
		var re = Ao((m.clipHorizontalGuidelines || []).map(function(e) {
			return Ke(`${e}`, C);
		}), (m.clipVerticalGuidelines || []).map(function(e) {
			return Ke(`${e}`, S);
		}), S, C), H = [], U = [];
		if (L || R) H = [I[4][0], I[2][0]], U = [I[1][1], I[3][1]];
		else if (A) {
			var ie = [
				I[0],
				I[2],
				I[4],
				I[6]
			], ae = [
				j[0],
				j[2],
				j[4],
				j[6]
			];
			H = ie.filter(function(e, t) {
				return ae[t][0];
			}).map(function(e) {
				return e[0];
			}), U = ie.filter(function(e, t) {
				return ae[t][1];
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
		var oe = [0, 0], se = Ya(re, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, H, U, 5, 5), ce = se.horizontal, le = se.vertical, ue = ce.offset, de = le.offset;
		if (ce.isBound && (oe[1] += ue), le.isBound && (oe[0] += de), (R || L) && j[0][0] === 0 && j[0][1] === 0) {
			var z = hs(F), fe = z.bottom - z.top, pe = R ? z.right - z.left : fe, me = le.isBound ? Q(de) : le.snapIndex === 0 ? -de : de, he = ce.isBound ? Q(ue) : ce.snapIndex === 0 ? -ue : ue;
			pe -= me, fe -= he, L && (fe = Ta(le, ce) > 0 ? fe : pe, pe = fe);
			var ge = I[0];
			I[1][1] = ge[1] - fe, I[2][0] = ge[0] + pe, I[3][1] = ge[1] + fe, I[4][0] = ge[0] - pe;
		} else if (A && h && l) {
			var _e = q($c(E), 2), ve = _e[0], ye = _e[1], be = ve && ye ? ve / ye : 0, xe = E[f].direction || "", Se = I[1][1], V = I[5][1], te = I[7][0], ne = I[3][0];
			Q(ue) <= Q(de) ? ue = hc(ue) * Q(de) / be : de = hc(de) * Q(ue) * be, xe.indexOf("w") > -1 ? te -= de : xe.indexOf("e") > -1 ? ne -= de : (te += de / 2, ne -= de / 2), xe.indexOf("n") > -1 ? Se -= ue : xe.indexOf("s") > -1 ? V -= ue : (Se += ue / 2, V -= ue / 2);
			var Ce = Qc(Se, ne, V, te);
			I.forEach(function(e, t) {
				var n = q(Ce[t].pos, 2);
				e[0] = n[0], e[1] = n[1];
			});
		} else I.forEach(function(e, t) {
			var n = j[t];
			n[0] && (e[0] -= de), n[1] && (e[1] -= ue);
		});
		var we = Zc(e, p, F), Te = `${T}(${we.join(D)})`;
		if (x.clipPathState = Te, L || R) H = [I[4][0], I[2][0]], U = [I[1][1], I[3][1]];
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
		if (x.snapBoundInfos = Ya(re, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, H, U, 1, 1), v) {
			var Ee = x.is3d, De = x.allMatrix, Oe = Ee ? 4 : 3, ke = oe;
			s && (ke = [b[0] + oe[0] - y[0], b[1] + oe[1] - y[1]]), v.deltaOffset = Dt(De, [
				ke[0],
				ke[1],
				0,
				0
			], Oe);
		}
		return Z(e, "onClip", X(e, t, K({
			clipEventType: "changed",
			clipType: T,
			poses: F,
			clipStyle: Te,
			clipStyles: we,
			distX: g,
			distY: _
		}, Ls((i = {}, i[T === "rect" ? "clip" : "clipPath"] = Te, i), t)))), !0;
	},
	dragControlEnd: function(e, t) {
		this.unset(e);
		var n = t.isDrag, r = t.datas, i = t.isDouble, a = r.isLine, o = r.isClipStart, s = r.isControl;
		return o ? (Z(e, "onClipEnd", zs(e, t, {})), i && (s ? rl(e, t) : a && nl(e, t)), i || n) : !1;
	},
	unset: function(e) {
		e.state.clipPathState = "", e.state.snapBoundInfos = null;
	}
}, al = {
	name: "originDraggable",
	props: ["originDraggable", "originRelative"],
	events: [
		"dragOriginStart",
		"dragOrigin",
		"dragOriginEnd"
	],
	css: [":host[data-able-origindraggable] .control.origin {\npointer-events: auto;\n}"],
	dragControlCondition: function(e, t) {
		return t.isRequest ? t.requestAble === "originDraggable" : at(t.inputEvent.target, Y("origin"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas;
		Wr(e, t);
		var r = X(e, t, { dragStart: to.dragStart(e, new Vr().dragStart([0, 0], t)) }), i = Z(e, "onDragOriginStart", r);
		return n.startOrigin = e.state.transformOrigin, n.startTargetOrigin = e.state.targetOrigin, n.prevOrigin = [0, 0], n.isDragOrigin = !0, i === !1 ? (n.isDragOrigin = !1, !1) : r;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.isRequest;
		if (!n.isDragOrigin) return !1;
		var a = q(Zr(t), 2), o = a[0], s = a[1], c = e.state, l = c.width, u = c.height, d = c.offsetMatrix, f = c.targetMatrix, p = c.is3d, m = e.props.originRelative, h = m === void 0 || m, g = p ? 4 : 3, _ = [o, s];
		if (i) {
			var v = t.distOrigin;
			(v[0] || v[1]) && (_ = v);
		}
		var y = Ot(n.startOrigin, _), b = Ot(n.startTargetOrigin, _), x = G(_, n.prevOrigin), S = ai(d, f, y, g), C = e.getRect(), w = hs(ms(S, l, u, g)), T = [C.left - w.left, C.top - w.top];
		n.prevOrigin = _;
		var E = [Qs(b[0], l, h), Qs(b[1], u, h)].join(" "), D = to.drag(e, Br(t, e.state, T, !!r, !1)), O = X(e, t, K(K({
			width: l,
			height: u,
			origin: y,
			dist: _,
			delta: x,
			transformOrigin: E,
			drag: D
		}, Ls({
			transformOrigin: E,
			transform: D.transform
		}, t)), { afterTransform: D.transform }));
		return Z(e, "onDragOrigin", O), O;
	},
	dragControlEnd: function(e, t) {
		return t.datas.isDragOrigin ? (Z(e, "onDragOriginEnd", zs(e, t, {})), !0) : !1;
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
function ol(e, t, n, r) {
	var i = e.filter(function(e) {
		var t = e.virtual;
		return e.horizontal && !t;
	}).length, a = e.filter(function(e) {
		var t = e.virtual;
		return e.vertical && !t;
	}).length, o = -1;
	if (t === 0 && (i === 0 ? o = 0 : i === 1 && (o = 1)), t === 2 && (i <= 2 ? o = 2 : i <= 3 && (o = 3)), t === 3 && (a === 0 ? o = 4 : a < 4 && (o = 7)), t === 1 && (a <= 1 ? o = 5 : a <= 2 && (o = 6)), !(o === -1 || !e[o].virtual)) {
		var s = e[o];
		sl(e, o), o < 4 ? s.pos[0] = n : s.pos[1] = r;
	}
}
function sl(e, t) {
	t < 4 ? e.slice(0, t + 1).forEach(function(e) {
		e.virtual = !1;
	}) : (e[0].virtual && (e[0].virtual = !1), e.slice(4, t + 1).forEach(function(e) {
		e.virtual = !1;
	}));
}
function cl(e, t) {
	t < 4 ? e.slice(t, 4).forEach(function(e) {
		e.virtual = !0;
	}) : e.slice(t).forEach(function(e) {
		e.virtual = !0;
	});
}
function ll(e, t, n, r, i) {
	r === void 0 && (r = [0, 0]);
	var a = [];
	return a = !e || e === "0px" ? [] : Fe(e), Gc(a, t, n, 0, 0, r, i);
}
function ul(e, t, n, r, i) {
	var a = e.state, o = a.width, s = a.height, c = Uc(i, e.props.roundRelative, o, s), l = c.raws, u = c.styles, d = c.radiusPoses, f = Jc(d, l), p = f.horizontals, m = f.verticals, h = u.join(" ");
	a.borderRadiusState = h;
	var g = X(e, t, K({
		horizontals: p,
		verticals: m,
		borderRadius: h,
		width: o,
		height: s,
		delta: r,
		dist: n
	}, Ls({ borderRadius: h }, t)));
	return Z(e, "onRound", g), g;
}
function dl(e) {
	var t = e.getState().style, n = t.borderRadius || "";
	if (!n && e.props.groupable) {
		var r = e.moveables[0], i = e.getTargets()[0];
		i && (r?.props.target === i ? (n = e.moveables[0]?.state.style.borderRadius ?? "", t.borderRadius = n) : (n = Vs(i).borderRadius, t.borderRadius = n));
	}
	return n;
}
var fl = {
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
		return t === !0 || t === "line" ? Y("round-line-clickable") : "";
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
		var x = u || dl(e), S = s ? 4 : 3, C = ll(x, i, a, p, !0);
		if (!C) return null;
		var w = 0, T = 0, E = b ? [0, 0] : [c, l];
		return C.map(function(e, n) {
			var r = e.horizontal, i = e.vertical, a = e.direction || "", s = J([], q(e.pos), !1);
			T += Math.abs(r), w += Math.abs(i), r && a.indexOf("n") > -1 && (s[1] -= v), i && a.indexOf("w") > -1 && (s[0] -= v), r && a.indexOf("s") > -1 && (s[1] += v), i && a.indexOf("e") > -1 && (s[0] += v);
			var c = G(ps(o, s, S), E), l = y && y !== "horizontal", u = e.vertical ? w <= h[1] && (l || !e.virtual) : T <= h[0] && (y || !e.virtual);
			return t.createElement("div", {
				key: `borderRadiusControl${n}`,
				className: Y("control", "border-radius", e.vertical ? "vertical" : "", e.virtual ? "virtual" : ""),
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
		var d = X(e, t, {});
		if (Z(e, "onRoundStart", d) === !1) return !1;
		r.lineIndex = l, r.controlIndex = c, r.isControl = o, r.isLine = s, Wr(e, t);
		var f = e.props, p = f.roundRelative, m = f.minRoundControls, h = m === void 0 ? [0, 0] : m, g = e.state, _ = g.width, v = g.height;
		r.isRound = !0, r.prevDist = [0, 0];
		var y = ll(dl(e) || "", _, v, h, !0) || [];
		return r.controlPoses = y, g.borderRadiusState = Uc(y, p, _, v).styles.join(" "), d;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = n.controlPoses;
		if (!n.isRound || !n.isControl || !r.length) return !1;
		var i = n.controlIndex, a = q(Zr(t), 2), o = a[0], s = a[1], c = [o, s], l = G(c, n.prevDist), u = e.props.maxRoundControls, d = u === void 0 ? [4, 4] : u, f = e.state, p = f.width, m = f.height, h = r[i], g = h.vertical, _ = h.horizontal, v = r.map(function(e) {
			var t = e.horizontal, n = e.vertical, r = [t * _ * c[0], n * g * c[1]];
			if (t) {
				if (d[0] === 1 || d[0] < 4 && t !== _) return r;
			} else if (d[1] === 0) return r[1] = n * _ * c[0] / p * m, r;
			else if (g && (d[1] === 1 || d[1] < 4 && n !== g)) return r;
			return [0, 0];
		});
		v[i] = c;
		var y = r.map(function(e, t) {
			return K(K({}, e), { pos: Ot(e.pos, v[t]) });
		});
		return i < 4 ? y.slice(0, i + 1).forEach(function(e) {
			e.virtual = !1;
		}) : y.slice(4, i + 1).forEach(function(e) {
			e.virtual = !1;
		}), n.prevDist = [o, s], ul(e, t, c, l, y);
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
			if (a && (f === !0 || f === "control")) cl(l, o);
			else if (s && (f === !0 || f === "line")) {
				var p = q(Ur(e, t), 2), m = p[0], h = p[1];
				ol(l, c, m, h);
			}
			u !== l.filter(function(e) {
				return e.virtual;
			}).length && ul(e, t, [0, 0], [0, 0], l);
		}
		var g = zs(e, t, {});
		return Z(e, "onRoundEnd", g), n.borderRadiusState = "", g;
	},
	dragGroupControlStart: function(e, t) {
		var n = this.dragControlStart(e, t);
		if (!n) return !1;
		var r = e.moveables, i = e.props.targets, a = Ii(e, "roundable", t);
		return Z(e, "onRoundGroupStart", K({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return K(K({}, e), {
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
		var r = e.moveables, i = e.props.targets, a = Ii(e, "roundable", t), o = K({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return K(K(K({}, e), {
					target: i[t],
					moveable: r[t],
					currentTarget: r[t]
				}), Ls({ borderRadius: n.borderRadius }, e));
			})
		}, n);
		return Z(e, "onRoundGroup", o), o;
	},
	dragGroupControlEnd: function(e, t) {
		var n = e.moveables, r = e.props.targets, i = Ii(e, "roundable", t);
		Bs(e, "onRound", function(t) {
			Z(e, "onRoundGroup", K({
				targets: e.props.targets,
				events: i.map(function(e, i) {
					return K(K(K({}, e), {
						target: r[i],
						moveable: n[i],
						currentTarget: n[i]
					}), Ls({ borderRadius: t.borderRadius }, e));
				})
			}, t));
		});
		var a = this.dragControlEnd(e, t);
		if (!a) return !1;
		var o = K({
			targets: e.props.targets,
			events: i.map(function(e, t) {
				return K(K({}, e), {
					target: r[t],
					moveable: n[t],
					currentTarget: n[t],
					lastEvent: e.datas?.lastEvent
				});
			})
		}, a);
		return Z(e, "onRoundGroupEnd", o), o;
	},
	unset: function(e) {
		e.state.borderRadiusState = "";
	}
};
function pl(e, t) {
	var n = Bt(t ? 4 : 3);
	return e === `matrix${t ? "3d" : ""}(${n.join(",")})` || e === "matrix(1,0,0,1,0,0)";
}
var ml = {
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
		var n = e.state, r = n.is3d, i = n.targetMatrix, a = n.inlineTransform, o = r ? `matrix3d(${i.join(",")})` : `matrix(${At(i, !0)})`, s = !a || a === "none" ? o : a;
		t.datas.startTransforms = pl(s, r) ? [] : Fe(s);
	},
	resetStyle: function(e) {
		var t = e.datas;
		t.nextStyle = {}, t.nextTransforms = e.datas.startTransforms, t.nextTransformAppendedIndexes = [];
	},
	fillDragStartParams: function(e, t) {
		return X(e, t, {
			setTransform: function(e) {
				t.datas.startTransforms = Ee(e) ? e : Fe(e);
			},
			isPinch: !!t.isPinch
		});
	},
	fillDragParams: function(e, t) {
		return X(e, t, { isPinch: !!t.isPinch });
	},
	dragStart: function(e, t) {
		this.setTransform(e, t), this.resetStyle(t), Z(e, "onBeforeRenderStart", this.fillDragStartParams(e, t));
	},
	drag: function(e, t) {
		t.datas.startTransforms || this.setTransform(e, t), this.resetStyle(t), Z(e, "onBeforeRender", X(e, t, { isPinch: !!t.isPinch }));
	},
	dragEnd: function(e, t) {
		t.datas.startTransforms || (this.setTransform(e, t), this.resetStyle(t)), Z(e, "onBeforeRenderEnd", X(e, t, {
			isPinch: !!t.isPinch,
			isDrag: t.isDrag
		}));
	},
	dragGroupStart: function(e, t) {
		var n = this;
		this.dragStart(e, t);
		var r = Ii(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.setTransform(r, e), n.resetStyle(e), n.fillDragStartParams(r, e);
		});
		Z(e, "onBeforeRenderGroupStart", X(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			setTransform: function() {},
			events: a
		}));
	},
	dragGroup: function(e, t) {
		var n = this;
		this.drag(e, t);
		var r = Ii(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.resetStyle(e), n.fillDragParams(r, e);
		});
		Z(e, "onBeforeRenderGroup", X(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			events: a
		}));
	},
	dragGroupEnd: function(e, t) {
		this.dragEnd(e, t), Z(e, "onBeforeRenderGroupEnd", X(e, t, {
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
}, hl = {
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
		Z(e, "onRenderStart", X(e, t, { isPinch: !!t.isPinch }));
	},
	drag: function(e, t) {
		Z(e, "onRender", this.fillDragParams(e, t));
	},
	dragAfter: function(e, t) {
		return this.drag(e, t);
	},
	dragEnd: function(e, t) {
		Z(e, "onRenderEnd", this.fillDragEndParams(e, t));
	},
	dragGroupStart: function(e, t) {
		Z(e, "onRenderGroupStart", X(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets
		}));
	},
	dragGroup: function(e, t) {
		var n = this, r = Ii(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragParams(r, e);
		});
		Z(e, "onRenderGroup", X(e, t, K(K({
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			transform: mi(t),
			transformObject: {}
		}, Ls(hi(t))), { events: a })));
	},
	dragGroupEnd: function(e, t) {
		var n = this, r = Ii(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragEndParams(r, e);
		});
		Z(e, "onRenderGroupEnd", X(e, t, K({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			targets: e.props.targets,
			events: a,
			transformObject: {},
			transform: mi(t)
		}, Ls(hi(t)))));
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
		return Yt(pi(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), X(e, t, K({
			isPinch: !!t.isPinch,
			transformObject: n,
			transform: mi(t)
		}, Ls(hi(t))));
	},
	fillDragEndParams: function(e, t) {
		var n = {};
		return Yt(pi(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), X(e, t, K({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			transformObject: n,
			transform: mi(t)
		}, Ls(hi(t))));
	}
};
function gl(e, t, n, r, i, a, o) {
	a.clientDistX = a.distX, a.clientDistY = a.distY;
	var s = i === "Start", c = i === "End", l = i === "After", u = e.state.target, d = a.isRequest, f = r.indexOf("Control") > -1;
	if (!u || s && f && !d && e.areaElement === a.inputEvent.target) return !1;
	var p = J([], q(t), !1);
	if (d) {
		var m = a.requestAble;
		p.some(function(e) {
			return e.name === m;
		}) || p.push.apply(p, J([], q(e.props.ables.filter(function(e) {
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
		var c = t[n](e, K(K({}, a), {
			stop: v,
			datas: o,
			originalDatas: b,
			inputTarget: g
		}));
		return e._emitter.off(), s && c === !1 && (o.isEventStart = !1), c;
	};
	y && p.forEach(function(t) {
		t.unset && t.unset(e);
	}), C(ml, `drag${r}${i}`);
	var w = 0, T = 0;
	n.forEach(function(t) {
		if (_) return !1;
		var n = `${t}${r}${i}`, o = `${t}${r}Condition`;
		i === "" && !d && Xs(e.state, a);
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
	}), (!l || T) && C(hl, `drag${r}${i}`);
	var E = S !== e[x] || w === n.length;
	return (c || _ || E) && (e.state.gestos = {}, e.moveables && e.moveables.forEach(function(e) {
		e.state.gestos = {};
	}), p.forEach(function(t) {
		t.unset && t.unset(e);
	})), s && !E && !d && T && e.props.preventDefault && a?.preventDefault(), e.isUnmounted || E ? !1 : ((!s && T && !o || c) && (e.props.flushSync || Xo)(function() {
		e.updateRect(c ? i : "", !0, !1), e.forceUpdate();
	}), !s && !c && !l && T && !o && gl(e, t, n, r, i + "After", a), !0);
}
function _l(e, t) {
	return function(n, r) {
		r === void 0 && (r = n.inputEvent.target);
		var i = r, a = e.areaElement, o = e._dragTarget;
		return !o || !t && e.controlGesto?.isFlag() ? !1 : i === o || o.contains(i) || i === a || !e.isMoveableElement(i) && !e.controlBox.contains(i) || at(i, "moveable-area") || at(i, "moveable-padding") || at(i, "moveable-edgeDraggable");
	};
}
function vl(e, t, n) {
	var r = e.controlBox, i = [], a = e.props, o = a.dragArea, s = e.state.target, c = a.dragTarget;
	i.push(r), (!o || c) && i.push(t), !o && c && s && t !== s && a.dragTargetSelf && i.push(s);
	var l = _l(e);
	return bl(e, i, "targetAbles", n, {
		dragStart: l,
		pinchStart: l
	});
}
function yl(e, t) {
	var n = e.controlBox, r = [];
	r.push(n);
	var i = _l(e, !0), a = function(e, t) {
		return t === void 0 && (t = e.inputEvent.target), t === n || !i(e, t);
	};
	return bl(e, r, "controlAbles", t, {
		dragStart: a,
		pinchStart: a
	});
}
function bl(e, t, n, r, i) {
	i === void 0 && (i = {});
	var a = n === "targetAbles", o = e.props, s = o.pinchOutside, c = o.pinchThreshold, l = o.preventClickEventOnDrag, u = o.preventClickDefault, d = o.checkInput, f = o.dragFocusedInput, p = o.preventDefault, m = p === void 0 || p, h = o.preventRightClick, g = h === void 0 || h, _ = o.preventWheelClick, v = _ === void 0 || _, y = o.dragContainer, b = new Xn(t, {
		preventDefault: m,
		preventRightClick: g,
		preventWheelClick: v,
		container: ic(y, !0) || pt(e.getControlBoxElement()),
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
					gl(e, J([], q(e[n]), !1), u, r, a, o) ? (e.props.stopPropagation || a === "Start" && x) && ((s = o?.inputEvent) == null || s.stopPropagation()) : o.stop();
				}
			});
		});
	}), b;
}
var xl = /* @__PURE__ */ function() {
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
function Sl(e, t, n, r) {
	n === void 0 && (n = t);
	var i = Oi(e, t), a = i.matrixes, o = i.is3d, s = i.targetMatrix, c = i.transformOrigin, l = i.targetOrigin, u = i.offsetContainer, d = i.hasFixed, f = i.zoom, p = Pi(u, n), m = p.matrixes, h = p.is3d, g = p.offsetContainer, _ = p.zoom, v = r || h || o, y = v ? 4 : 3, b = e.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in e, x = s, S = Bt(y), C = Bt(y), w = Bt(y), T = Bt(y), E = a.length, D = m.map(function(e) {
		return K(K({}, e), { matrix: e.matrix ? J([], q(e.matrix), !1) : void 0 });
	}).reverse();
	a.reverse(), !o && v && (x = Tt(x, 3, 4), ss(a)), !h && v && ss(D), D.forEach(function(e) {
		C = Dt(C, e.matrix, y);
	});
	var O = n || ft(e), k = D[0]?.target || is(O, O, !0).offsetParent, A = D.slice(1).reduce(function(e, t) {
		return Dt(e, t.matrix, y);
	}, Bt(y));
	a.forEach(function(e, t) {
		if (E - 2 === t && (w = S.slice()), E - 1 === t && (T = S.slice()), !e.matrix) {
			var n = a[t + 1];
			e.matrix = Ht(_s(e, n, k, y, Dt(A, S, y)), y);
		}
		S = Dt(S, e.matrix, y);
	});
	var j = !b && o;
	x ||= Bt(j ? 4 : 3);
	var M = ls(b && x.length === 16 ? Tt(x, 4, 3) : x, j), N = C;
	return C = yt(C, y, y), {
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
function Cl(e, t, n, r) {
	n === void 0 && (n = t);
	var i = 0, a = 0, o = 0, s = {}, c = ws(e);
	if (e && (i = c.offsetWidth, a = c.offsetHeight), e) {
		var l = Sl(e, t, n, r), u = Hr(l.allMatrix, l.transformOrigin, i, a);
		s = K(K({}, l), u);
		var d = Hr(l.allMatrix, [50, 50], 100, 100);
		o = Ts([d.pos1, d.pos2], d.direction);
	}
	var f = r ? 4 : 3;
	return K(K(K({
		hasZoom: !1,
		width: i,
		height: a,
		rotation: o
	}, c), {
		originalRootMatrix: Bt(f),
		rootMatrix: Bt(f),
		beforeMatrix: Bt(f),
		offsetMatrix: Bt(f),
		allMatrix: Bt(f),
		targetMatrix: Bt(f),
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
function wl(e, t, n, r, i, a) {
	a === void 0 && (a = []);
	var o = 1, s = [0, 0], c = Es(), l = Es(), u = Es(), d = Es(), f = [0, 0], p = {}, m = Cl(t, n, i, !0);
	if (t) {
		var h = Fi(t);
		a.forEach(function(e) {
			p[e] = h(e);
		});
		var g = m.is3d ? 4 : 3, _ = Hr(m.offsetMatrix, Ot(m.transformOrigin, St(m.targetMatrix, g)), m.width, m.height);
		o = _.direction, s = Ot(_.origin, [_.left - m.left, _.top - m.top]), d = ks(m.offsetRootContainer);
		var v = is(r, r, !0).offsetParent || m.offsetRootContainer;
		if (m.hasZoom) {
			var y = Hr(Dt(m.originalRootMatrix, m.allMatrix), m.transformOrigin, m.width, m.height), b = Hr(m.originalRootMatrix, ts(Fi(v)("transformOrigin")).map(function(e) {
				return parseFloat(e);
			}), v.offsetWidth, v.offsetHeight);
			if (c = Os(y, d), u = Os(b, d, v, !0), e) {
				var x = y.left, S = y.top;
				l = Os({
					left: x,
					top: S,
					bottom: S,
					right: S
				}, d);
			}
		} else {
			c = ks(t), u = Ni(v), e && (l = ks(e));
			var C = u.left, w = u.top, T = u.clientLeft, E = u.clientTop, D = [c.left - C, c.top - w];
			f = G(Ys(m.rootMatrix, D, 4), [T + m.left, E + m.top]);
		}
	}
	return K({
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
function Tl(e) {
	var t = e.pos1, n = e.pos2, r = e.pos3, i = e.pos4;
	if (!t || !n || !r || !i) return null;
	var a = En([
		t,
		n,
		r,
		i
	]), o = [a.minX, a.minY], s = G(e.origin, o);
	return t = G(t, o), n = G(n, o), r = G(r, o), i = G(i, o), K(K({}, e), {
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
var El = /* @__PURE__ */ function(e) {
	cr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.state = K({
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
		}, wl(null)), t.renderState = {}, t.enabledAbles = [], t.targetAbles = [], t.controlAbles = [], t.rotation = 0, t.scale = [1, 1], t.isMoveableMounted = !1, t.isUnmounted = !1, t.events = {
			mouseEnter: null,
			mouseLeave: null
		}, t._emitter = new fn(), t._prevOriginalDragTarget = null, t._originalDragTarget = null, t._prevDragTarget = null, t._dragTarget = null, t._prevPropTarget = null, t._propTarget = null, t._prevDragArea = !1, t._isPropTargetChanged = !1, t._hasFirstTarget = !1, t._reiszeObserver = null, t._observerId = 0, t._mutationObserver = null, t._rootContainer = null, t._viewContainer = null, t._viewClassNames = [], t._store = {}, t.checkUpdateRect = function() {
			if (!t.isDragging()) {
				var e = t.props.parentMoveable;
				if (e) {
					e.checkUpdateRect();
					return;
				}
				We(t._observerId), t._observerId = Ue(function() {
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
		var f = q(n || [0, 0], 2), p = f[0], m = f[1], h = t.left, g = t.top, _ = t.target, v = t.direction, y = t.hasFixed, b = t.offsetDelta, x = e.targets, S = this.isDragging(), w = {};
		this.getEnabledAbles().forEach(function(e) {
			w[`data-able-${e.name.toLowerCase()}`] = !0;
		});
		var T = this._getAbleClassName(), E = x && x.length && (_ || l) || i || !this._hasFirstTarget && this.state.isPersisted, D = this.controlBox || this.props.firstRenderState || this.props.persistData, O = [h - p, g - m];
		!l && e.useAccuratePosition && (O[0] += b[0], O[1] += b[1]);
		var k = {
			position: y ? "fixed" : "absolute",
			display: E ? "block" : "none",
			visibility: D ? "visible" : "hidden",
			transform: `translate3d(${O[0]}px, ${O[1]}px, ${s})`,
			"--zoom": a,
			"--zoompx": `${a}px`
		};
		return u && (k["--moveable-line-padding"] = u), d && (k["--moveable-control-padding"] = d), C.createElement(c, K({
			cspNonce: o,
			ref: ue(this, "controlBox"),
			className: `${Y("control-box", v === -1 ? "reverse" : "", S ? "dragging" : "")} ${T} ${r}`
		}, w, {
			onClick: this._onPreventClick,
			style: k
		}), this.renderAbles(), this._renderLines());
	}, t.prototype.componentDidMount = function() {
		this.isMoveableMounted = !0, this.isUnmounted = !1;
		var e = this.props, t = e.parentMoveable, n = e.container;
		this._checkUpdateRootContainer(), this._checkUpdateViewContainer(), this._updateTargets(), this._updateNativeEvents(), this._updateEvents(), this.updateCheckInput(), this._updateObserver(this.props), !n && !t && !this.state.isPersisted && (this.updateRect("", !1, !1), this.forceUpdate());
	}, t.prototype.componentDidUpdate = function(e) {
		this._checkUpdateRootContainer(), this._checkUpdateViewContainer(), this._updateNativeEvents(), this._updateTargets(), this._updateEvents(), this.updateCheckInput(), this._updateObserver(e);
	}, t.prototype.componentWillUnmount = function() {
		var e, t;
		this.isMoveableMounted = !1, this.isUnmounted = !0, this._emitter.off(), (e = this._reiszeObserver) == null || e.disconnect(), (t = this._mutationObserver) == null || t.disconnect(), this._viewContainer && this._changeAbleViewClassNames([]), Is(this, !1), Is(this, !0);
		var n = this.events;
		for (var r in n) {
			var i = n[r];
			i && i.destroy();
		}
	}, t.prototype.getTargets = function() {
		var e = this.props.target;
		return e ? [e] : [];
	}, t.prototype.getAble = function(e) {
		return He(this.props.ables || [], function(t) {
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
		return e && (e.getAttribute?.call(e, "class") || "").indexOf(Or) > -1;
	}, t.prototype.dragStart = function(e, t) {
		t === void 0 && (t = e.target);
		var n = this.targetGesto, r = this.controlGesto;
		return n && _l(this)({ inputEvent: e }, t) ? n.isFlag() || n.triggerDragStart(e) : r && this.isMoveableElement(t) && (r.isFlag() || r.triggerDragStart(e)), this;
	}, t.prototype.hitTest = function(e) {
		var t = this.state, n = t.target, r = t.pos1, i = t.pos2, a = t.pos3, o = t.pos4, s = t.targetClientRect;
		if (!n) return 0;
		var c;
		if (ht(e)) {
			var l = e.getBoundingClientRect();
			c = {
				left: l.left,
				top: l.top,
				width: l.width,
				height: l.height
			};
		} else c = K({
			width: 0,
			height: 0
		}, e);
		var u = c.left, d = c.top, f = c.width, p = c.height, m = Tn([
			r,
			i,
			o,
			a
		], s), h = Pn(m, [
			[u, d],
			[u + f, d],
			[u + f, d + p],
			[u, d + p]
		]), g = wn(m);
		return !h || !g ? 0 : Math.min(100, h / g * 100);
	}, t.prototype.isInside = function(e, t) {
		var n = this.state, r = n.target, i = n.pos1, a = n.pos2, o = n.pos3, s = n.pos4, c = n.targetClientRect;
		return r ? Dn([e, t], Tn([
			i,
			a,
			s,
			o
		], c)) : !1;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.props, i = !r.parentPosition && !r.wrapperMoveable;
		i && Mi(!0);
		var a = r.parentMoveable, o = this.state.target || r.target, s = this.getContainer(), c = a ? a._rootContainer : this._rootContainer, l = wl(this.controlBox, o, s, s, c || s, this._getRequestStyles());
		if (!o && this._hasFirstTarget && r.persistData) {
			var u = Tl(r.persistData);
			for (var d in u) l[d] = u[d];
		}
		i && Mi(), this.updateState(l, !a && n);
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
		var e = this.state, t = Ps(this.state), n = q(t, 4), r = n[0], i = n[1], a = n[2], o = n[3], s = hs(t), c = e.width, l = e.height, u = s.width, d = s.height, f = s.left, p = s.top, m = [e.left, e.top], h = Ot(m, e.origin);
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
			beforeOrigin: Ot(m, e.beforeOrigin),
			origin: h,
			transformOrigin: e.transformOrigin,
			rotation: this.getRotation()
		};
	}, t.prototype.getManager = function() {
		return this;
	}, t.prototype.stopDrag = function(e) {
		if (!e || e === "target") {
			var t = this.targetGesto;
			t?.isIdle() === !1 && Fs(this, !1), t?.stop();
		}
		if (!e || e === "control") {
			var t = this.controlGesto;
			t?.isIdle() === !1 && Fs(this, !0), t?.stop();
		}
	}, t.prototype.getRotation = function() {
		var e = this.state, t = e.pos1, n = e.pos2, r = e.direction;
		return oc(t, n, r);
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this, i = r.props, a = i.parentMoveable || i.wrapperMoveable || r, o = a.props.ables, s = i.groupable, c = He(o, function(t) {
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
		var l = c.request(r), u = n || t.isInstant, d = l.isControl ? "controlAbles" : "targetAbles", f = `${s ? "Group" : ""}${l.isControl ? "Control" : ""}`, p = J([], q(a[d]), !1), m = {
			request: function(t) {
				return gl(r, p, ["drag"], f, "", K(K({}, l.request(t)), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			},
			requestEnd: function() {
				return gl(r, p, ["drag"], f, "End", K(K({}, l.requestEnd()), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			}
		};
		return gl(r, p, ["drag"], f, "Start", K(K({}, l.requestStart(t)), {
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
		var h = _c(n || {}), g = h.left, _ = h.top, v = h.bottom, y = h.right, b = o ? 4 : 3, x = [];
		x = p ? i : this.controlBox && t.groupable ? r : Ot(r, [d, f]);
		var S = Et(b, Ht(x.map(function(e) {
			return -e;
		}), b), a, Ht(i, b)), C = Zs(S, s, [-g, -_], b), w = Zs(S, c, [y, -_], b), T = Zs(S, l, [-g, v], b), E = Zs(S, u, [y, v], b);
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
				[Zs(S, s, [-g - D, -_], b), Zs(S, c, [y + D, -_], b)],
				[Zs(S, c, [y, -_ - D], b), Zs(S, u, [y, v + D], b)],
				[Zs(S, u, [y + D, v], b), Zs(S, l, [-g - D, v], b)],
				[Zs(S, l, [-g, v + D], b), Zs(S, s, [-g, -_ - D], b)]
			];
		}
	}, t.prototype.checkUpdate = function() {
		this._isPropTargetChanged = !1;
		var e = this.props, t = e.target, n = e.container, r = e.parentMoveable, i = this.state, a = i.target, o = i.container;
		if (!(!a && !t)) {
			this.updateAbles();
			var s = !Us(a, t);
			if (s || !Us(o, n)) {
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
		return n[r] || (n[r] = or(e, t)), n[r];
	}, t.prototype.getState = function() {
		var e = this.props;
		(e.target || e.targets?.length) && (this._hasFirstTarget = !0);
		var t = this.controlBox, n = e.persistData, r = e.firstRenderState;
		if (r && !t) return r;
		if (!this._hasFirstTarget && n) {
			var i = Tl(n);
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
		var n = this.props.triggerAblesSimultaneously, r = this.getEnabledAbles(e), i = `drag${t}Start`, a = `pinch${t}Start`, o = `drag${t}ControlStart`, s = Hs(r, [i, a], n), c = Hs(r, [o], n);
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
		var e = this, t = this.props.triggerAblesSimultaneously, n = { createElement: C.createElement };
		return this.renderState = {}, Ks(qs(Hs(this.getEnabledAbles(), ["render"], t).map(function(t) {
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
			return J(J([], q(e), !1), q(n), !1);
		}, J([], q(this.props.requestStyles || []), !1));
	}, t.prototype._updateObserver = function(e) {
		this._updateResizeObserver(e), this._updateMutationObserver(e);
	}, t.prototype._updateEvents = function() {
		var e = this.targetAbles.length, t = this.controlAbles.length, n = this._dragTarget;
		(!e && this.targetGesto || this._isTargetChanged(!0)) && (Is(this, !1), this.updateState({ gestos: {} })), t || Is(this, !0), n && e && !this.targetGesto && (this.targetGesto = vl(this, n, "")), !this.controlGesto && t && (this.controlGesto = yl(this, "Control"));
	}, t.prototype._updateTargets = function() {
		var e = this.props;
		this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = ic(this._originalDragTarget, !0);
	}, t.prototype._renderLines = function() {
		var e = this.props, t = e.zoom, n = e.hideDefaultLines, r = e.hideChildMoveableDefaultLines, i = e.parentMoveable;
		if (n || i && r) return [];
		var a = this.getState(), o = { createElement: C.createElement };
		return a.renderLines.map(function(e, n) {
			return Hi(o, "", e[0], e[1], t, `render-line-${n}`);
		});
	}, t.prototype._isTargetChanged = function(e) {
		var t = this.props, n = t.dragTarget || t.target, r = this._prevOriginalDragTarget, i = this._prevDragArea, a = t.dragArea;
		return !a && r !== n || (e || a) && i !== a || this._prevPropTarget != this._propTarget;
	}, t.prototype._updateNativeEvents = function() {
		var e = this, t = this.props.dragArea ? this.areaElement : this.state.target, n = this.events, r = Ge(n);
		if (this._isTargetChanged()) for (var i in n) {
			var a = n[i];
			a && a.destroy(), n[i] = null;
		}
		if (t) {
			var o = this.enabledAbles;
			r.forEach(function(r) {
				var i = Hs(o, [r]), a = i.length > 0, s = n[r];
				if (!a) {
					s && (s.destroy(), n[r] = null);
					return;
				}
				s || (s = new xl(t, e, r), n[r] = s), s.setAbles(i);
			});
		}
	}, t.prototype._checkUpdateRootContainer = function() {
		var e = this.props.rootContainer;
		!this._rootContainer && e && (this._rootContainer = ic(e, !0));
	}, t.prototype._checkUpdateViewContainer = function() {
		var e = this.props.viewContainer;
		!this._viewContainer && e && (this._viewContainer = ic(e, !0)), this._viewContainer && this._changeAbleViewClassNames(J(J([], q(this._getAbleViewClassNames()), !1), [this.isDragging() ? Oc : ""], !1));
	}, t.prototype._changeAbleViewClassNames = function(e) {
		var t = this._viewContainer, n = Gs(e.filter(Boolean), function(e) {
			return e;
		}).map(function(e) {
			return q(e, 1)[0];
		}), r = this._viewClassNames, i = nn(r, n), a = i.removed, o = i.added;
		a.forEach(function(e) {
			st(t, r[e]);
		}), o.forEach(function(e) {
			ot(t, n[e]);
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
			return (a[r]?.isEventStart || o[r]?.isEventStart) && (i += ` ${Y(`${r}${e}-dragging`)}`), i.trim();
		}).filter(Boolean).join(" ");
	}, t.prototype._updateResizeObserver = function(e) {
		var t, n = this.props, r = n.target, i = pt(this.getControlBoxElement());
		if (!i.ResizeObserver || !r || !n.useResizeObserver) {
			(t = this._reiszeObserver) == null || t.disconnect();
			return;
		}
		if (!(e.target === r && this._reiszeObserver)) {
			var a = new i.ResizeObserver(this.checkUpdateRect);
			a.observe(r, { box: "border-box" }), this._reiszeObserver = a;
		}
	}, t.prototype._updateMutationObserver = function(e) {
		var t = this, n, r = this.props, i = r.target, a = pt(this.getControlBoxElement());
		if (!a.MutationObserver || !i || !r.useMutationObserver) {
			(n = this._mutationObserver) == null || n.disconnect();
			return;
		}
		if (!(e.target === i && this._mutationObserver)) {
			var o = new a.MutationObserver(function(e) {
				var n, r;
				try {
					for (var i = dr(e), a = i.next(); !a.done; a = i.next()) {
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
		flushSync: Xo,
		firstRenderState: null,
		persistData: null,
		viewContainer: null,
		requestStyles: [],
		useAccuratePosition: !1
	}, t;
}(C.PureComponent), Dl = {
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
		var d = mc(e, "parentPosition", [a, o], function(e) {
			return e.join(",");
		}), f = mc(e, "requestStyles", e.getRequestChildStyles(), function(e) {
			return e.join(",");
		});
		return e.moveables = e.moveables.slice(0, r.length), J(J([], q(r.map(function(r, i) {
			return t.createElement(El, {
				key: "moveable" + i,
				ref: de(e, "moveables", i),
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
		})), !1), q(qs(l.map(function(e, n) {
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
				var a = q(e, 2), o = a[0], s = a[1];
				return Hi(t, "", G(r[o], d), G(r[s], d), c, `group-rect-${n}-${i}`);
			});
		}))), !1);
	}
}, Ol = fr("clickable", {
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
			Z(e, "onClick", X(e, t, {
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
			a === -1 && (a = Ve(i, function(e) {
				return e.contains(r);
			}), s = a > -1), Z(e, "onClickGroup", X(e, t, {
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
function kl(e) {
	var t = e.originalDatas.draggable;
	return t ||= (e.originalDatas.draggable = {}, e.originalDatas.draggable), K(K({}, e), { datas: t });
}
var Al = fr("edgeDraggable", {
	css: [".edge.edgeDraggable.line {\ncursor: move;\n}"],
	render: function(e, t) {
		var n = e.props, r = n.edgeDraggable;
		return r ? Ui(t, "edgeDraggable", r, e.getState().renderPoses, n.zoom) : [];
	},
	dragCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && at(r, Y("direction")) && at(r, Y("edge")) && at(r, Y("edgeDraggable"));
	},
	dragStart: function(e, t) {
		return to.dragStart(e, kl(t));
	},
	drag: function(e, t) {
		return to.drag(e, kl(t));
	},
	dragEnd: function(e, t) {
		return to.dragEnd(e, kl(t));
	},
	dragGroupCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && at(r, Y("direction")) && at(r, Y("line"));
	},
	dragGroupStart: function(e, t) {
		return to.dragGroupStart(e, kl(t));
	},
	dragGroup: function(e, t) {
		return to.dragGroup(e, kl(t));
	},
	dragGroupEnd: function(e, t) {
		return to.dragGroupEnd(e, kl(t));
	},
	unset: function(e) {
		return to.unset(e);
	}
}), jl = {
	name: "individualGroupable",
	props: ["individualGroupable", "individualGroupableProps"],
	events: []
}, Ml = [
	ml,
	Fc,
	Jo,
	vc,
	to,
	Al,
	oo,
	bc,
	wc,
	mo,
	Pc,
	Ic,
	Mc,
	al,
	il,
	fl,
	Dl,
	jl,
	Ol,
	jc,
	hl
];
function Nl(e, t) {
	var n = q(e, 3), r = n[0], i = n[1], a = n[2];
	return (r * t[0] + i * t[1] + a) / Math.sqrt(r * r + i * i);
}
function Pl(e, t) {
	var n = q(e, 2), r = n[0], i = n[1];
	return -r * t[0] - i * t[1];
}
function Fl(e, t) {
	return Math.max.apply(Math, J([], q(e.map(function(e) {
		var n = q(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.max(r[t], i[t], a[t], o[t]);
	})), !1));
}
function Il(e, t) {
	return Math.min.apply(Math, J([], q(e.map(function(e) {
		var n = q(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.min(r[t], i[t], a[t], o[t]);
	})), !1));
}
function Ll(e, t) {
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
	var d = W(t, Mr);
	if (d % 90) {
		var f = d / 180 * Math.PI, p = Math.tan(f), m = -1 / p, h = [Pr, Fr], g = [[0, 0], [0, 0]], _ = [Pr, Fr], v = [[0, 0], [0, 0]];
		e.forEach(function(e) {
			e.forEach(function(e) {
				var t = Nl([
					-p,
					1,
					0
				], e), n = Nl([
					-m,
					1,
					0
				], e);
				h[0] > t && (g[0] = e, h[0] = t), h[1] < t && (g[1] = e, h[1] = t), _[0] > n && (v[0] = e, _[0] = n), _[1] < n && (v[1] = e, _[1] = n);
			});
		});
		var y = q(g, 2), b = y[0], x = y[1], S = q(v, 2), C = S[0], w = S[1], T = [
			-p,
			1,
			Pl([-p, 1], b)
		], E = [
			-p,
			1,
			Pl([-p, 1], x)
		], D = [
			-m,
			1,
			Pl([-m, 1], C)
		], O = [
			-m,
			1,
			Pl([-m, 1], w)
		];
		n = q([
			[T, D],
			[T, O],
			[E, D],
			[E, O]
		].map(function(e) {
			var t = q(e, 2), n = t[0], r = t[1];
			return kn(n, r)[0];
		}), 4), a = n[0], o = n[1], s = n[2], c = n[3], l = _[1] - _[0], u = h[1] - h[0];
	} else {
		var k = Il(e, 0), A = Il(e, 1), j = Fl(e, 0), M = Fl(e, 1);
		if (a = [k, A], o = [j, A], s = [k, M], c = [j, M], l = j - k, u = M - A, d % 180) {
			var N = [
				s,
				a,
				c,
				o
			];
			r = q(N, 4), a = r[0], o = r[1], s = r[2], c = r[3], l = M - A, u = j - k;
		}
	}
	if (d % 360 > 180) {
		var N = [
			c,
			s,
			o,
			a
		];
		i = q(N, 4), a = i[0], o = i[1], s = i[2], c = i[3];
	}
	var P = En([
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
function Rl(e, t) {
	var n = t.map(function(t) {
		if (Ee(t)) {
			var n = Rl(e, t), r = n.length;
			return r > 1 ? n : r === 1 ? n[0] : null;
		} else {
			var i = He(e, function(e) {
				return e.manager.props.target === t;
			});
			return i ? (i.finded = !0, i.manager) : null;
		}
	}).filter(Boolean);
	return n.length === 1 && Ee(n[0]) ? n[0] : n;
}
var zl = /* @__PURE__ */ function(e) {
	cr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.differ = new cn(), t.moveables = [], t.transformOrigin = "50% 50%", t.renderGroupRects = [], t._targetGroups = [], t._hasFirstTargets = !1, t;
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
		Mi(!0), this.moveables.forEach(function(t) {
			t.updateRect(e, !1, !1);
		});
		var i = this.props, a = this.moveables, o = r.target || i.target, s = a.map(function(e) {
			return {
				finded: !1,
				manager: e
			};
		}), c = this.props.targetGroups || [], l = Rl(s, c), u = i.useDefaultGroupRotate;
		l.push.apply(l, J([], q(s.filter(function(e) {
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
				if (Ee(e)) {
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
				} else return {
					poses: Ps(e.state),
					rotation: e.getRotation()
				};
			}), i = r.map(function(e) {
				return e.rotation;
			}), a = 0, o = i[0], s = i.every(function(e) {
				return Math.abs(o - e) < .1;
			});
			return a = f ? !u && s ? o : p : !u && !n && s ? o : t, Ll(r.map(function(e) {
				return e.poses;
			}), a);
		}
		var g = h(l, this.rotation, !0);
		f && (this.rotation = g.rotation, this.transformOrigin = i.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = c, this.renderGroupRects = d;
		var _ = this.transformOrigin, v = this.rotation, y = this.scale, b = g.width, x = g.height, S = g.minX, C = g.minY, w = En(fc([
			[0, 0],
			[b, 0],
			[0, x],
			[b, x]
		], dc(_, b, x), this.rotation / 180 * Math.PI).result), T = w.minX, E = w.minY, D = ` rotate(${v}deg) scale(${hc(y[0])}, ${hc(y[1])})`, O = `translate(${-T}px, ${-E}px)${D}`;
		this.controlBox.style.transform = `translate3d(${S}px, ${C}px, ${this.props.translateZ || 0})`, o.style.cssText += `left:0px;top:0px;transform-origin:${_};width:${b}px;height:${x}px;transform: ${O}`, r.width = b, r.height = x;
		var k = this.getContainer(), A = wl(this.controlBox, o, this.controlBox, this.getContainer(), this._rootContainer || k, []), j = [A.left, A.top], M = q(Ps(A), 4), N = M[0], P = M[1], F = M[2], I = M[3], L = En([
			N,
			P,
			F,
			I
		]), R = [L.minX, L.minY], z = hc(y[0] * y[1]);
		A.pos1 = G(N, R), A.pos2 = G(P, R), A.pos3 = G(F, R), A.pos4 = G(I, R), A.left = S - A.left + R[0], A.top = C - A.top + R[1], A.origin = G(Ot(j, A.origin), R), A.beforeOrigin = G(Ot(j, A.beforeOrigin), R), A.originalBeforeOrigin = Ot(j, A.originalBeforeOrigin), A.transformOrigin = G(Ot(j, A.transformOrigin), R), o.style.transform = `translate(${-T - R[0]}px, ${-E - R[1]}px)` + D, Mi(), this.updateState(K(K({}, A), {
			posDelta: R,
			direction: z,
			beforeDirection: z
		}), n);
	}, t.prototype.getRect = function() {
		return K(K({}, e.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
			return e.getRect();
		}) });
	}, t.prototype.triggerEvent = function(t, n, r) {
		if (r || t.indexOf("Group") > -1) return e.prototype.triggerEvent.call(this, t, n);
		this._emitter.trigger(t, n);
	}, t.prototype.getRequestChildStyles = function() {
		return this.getEnabledAbles().reduce(function(e, t) {
			var n = t.requestChildStyle?.call(t) ?? [];
			return J(J([], q(e), !1), q(n), !1);
		}, []);
	}, t.prototype.getMoveables = function() {
		return J([], q(this.moveables), !1);
	}, t.prototype.updateAbles = function() {
		e.prototype.updateAbles.call(this, J(J([], q(this.props.ables), !1), [Dl], !1), "Group");
	}, t.prototype._updateTargets = function() {
		e.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = ic(this._originalDragTarget, !0);
	}, t.prototype._updateEvents = function() {
		var e = this.state, t = this.props, n = this._prevDragTarget, r = t.dragTarget || this.areaElement, i = t.targets, a = this.differ.update(i), o = a.added, s = a.changed, c = a.removed, l = o.length || c.length;
		(l || this._prevOriginalDragTarget !== this._originalDragTarget) && (Is(this, !1), Is(this, !0), this.updateState({ gestos: {} })), n !== r && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto ||= vl(this, this._dragTarget, "Group"), this.controlGesto ||= yl(this, "GroupControl"));
		var u = !Us(e.container, t.container);
		u && (e.container = t.container), (u || l || this.transformOrigin !== (t.defaultGroupOrigin || "50% 50%") || s.length || i.length && !pc(this._targetGroups, t.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!l;
	}, t.prototype._updateObserver = function() {}, t.defaultProps = K(K({}, El.defaultProps), {
		transformOrigin: ["50%", "50%"],
		groupable: !0,
		dragArea: !0,
		keepRatio: !0,
		targets: [],
		defaultGroupRotate: 0,
		defaultGroupOrigin: "50% 50%"
	}), t;
}(El), Bl = /* @__PURE__ */ function(e) {
	cr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.moveables = [], t;
	}
	return t.prototype.render = function() {
		var e = this, t = this.props, n = t.cspNonce, r = t.cssStyled, i = t.persistData, a = t.targets || [], o = a.length, s = this.isUnmounted || !o, c = i?.children ?? [];
		return s && !o && c.length ? a = c.map(function() {
			return null;
		}) : s || (c = []), C.createElement(r, {
			cspNonce: n,
			ref: ue(this, "controlBox"),
			className: Y("control-box")
		}, a.map(function(n, r) {
			var i = t.individualGroupableProps?.call(t, n, r) ?? {};
			return C.createElement(El, K({
				key: "moveable" + r,
				ref: de(e, "moveables", r)
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
		n === void 0 && (n = !0), Mi(!0), this.moveables.forEach(function(r) {
			r.updateRect(e, t, n);
		}), Mi();
	}, t.prototype.getRect = function() {
		return K(K({}, e.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
			return e.getRect();
		}) });
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this.moveables.map(function(n) {
			return n.request(e, K(K({}, t), { isInstant: !1 }), !1);
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
		var n = t, r = He(this.moveables, function(e) {
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
		return J([], q(this.moveables), !1);
	}, t.prototype.updateRenderPoses = function() {}, t.prototype.checkUpdate = function() {}, t.prototype.triggerEvent = function() {}, t.prototype.updateAbles = function() {}, t.prototype._updateEvents = function() {}, t.prototype._updateObserver = function() {}, t;
}(El);
function Vl(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (De(e)) {
				t[e] && n.push.apply(n, J([], q(t[e]), !1));
				return;
			}
			Ee(e) ? n.push.apply(n, J([], q(Vl(e, t)), !1)) : n.push(e);
		}
	}), n;
}
function Hl(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (De(e)) {
				t[e] && n.push.apply(n, J([], q(t[e]), !1));
				return;
			}
			Ee(e) ? n.push(Hl(e, t)) : n.push(e);
		}
	}), n;
}
function Ul(e, t) {
	return e.length !== t.length || e.some(function(e, n) {
		var r = t[n];
		return !e && !r || e == r ? !1 : Ee(e) && Ee(r) ? Ul(e, r) : !0;
	});
}
var Wl = /* @__PURE__ */ function(e) {
	cr(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.defaultAbles = Ml, t;
}(/* @__PURE__ */ function(e) {
	cr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.refTargets = [], t.selectorMap = {}, t._differ = new cn(), t._elementTargets = [], t._tmpRefTargets = [], t._tmpSelectorMap = {}, t._onChangeTargets = null, t;
	}
	return t.makeStyled = function() {
		var e = {};
		this.getTotalAbles().forEach(function(t) {
			var n = t.css;
			n && n.forEach(function(t) {
				e[t] = !0;
			});
		});
		var t = Ge(e).join("\n");
		this.defaultStyled = or("div", le(Or, kr + t));
	}, t.getTotalAbles = function() {
		return J([
			Fc,
			Dl,
			jl,
			jc
		], q(this.defaultAbles), !1);
	}, t.prototype.render = function() {
		var e = this.constructor;
		e.defaultStyled || e.makeStyled();
		var t = this.props, n = t.ables, r = t.props, i = lr(t, ["ables", "props"]), a = q(this._updateRefs(!0), 2), o = a[0], s = a[1], c = Vl(o, s), l = c.length > 1, u = J(J([], q(e.getTotalAbles()), !1), q(n || []), !1), d = K(K(K({}, i), r || {}), {
			ables: u,
			cssStyled: e.defaultStyled,
			customStyledMap: e.customStyledMap
		});
		this._elementTargets = c;
		var f = null, p = this.moveable;
		if (i.persistData?.children && (l = !0), i.individualGroupable) return C.createElement(Bl, K({
			key: "individual-group",
			ref: ue(this, "moveable")
		}, d, {
			target: null,
			targets: c
		}));
		if (l) {
			var m = Hl(o, s);
			if (p && !p.props.groupable && !p.props.individualGroupable) {
				var h = p.props.target;
				h && c.indexOf(h) > -1 && (f = K({}, p.state));
			}
			return C.createElement(zl, K({
				key: "group",
				ref: ue(this, "moveable")
			}, d, i.groupableProps ?? {}, {
				target: null,
				targets: c,
				targetGroups: m,
				firstRenderState: f
			}));
		} else {
			var g = c[0];
			if (p && (p.props.groupable || p.props.individualGroupable)) {
				var _ = He(p.moveables || [], function(e) {
					return e.props.target === g;
				});
				_ && (f = K({}, _.state));
			}
			return C.createElement(El, K({
				key: "single",
				ref: ue(this, "moveable")
			}, d, {
				target: g,
				firstRenderState: f
			}));
		}
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
		var t = this.refTargets, n = ac(this.props.target || this.props.targets), r = typeof document < "u", i = Ul(t, n), a = this.selectorMap, o = {};
		return this.refTargets.forEach(function e(t) {
			De(t) ? a[t] ? o[t] = a[t] : r && (i = !0, o[t] = [].slice.call(document.querySelectorAll(t))) : Ee(t) && t.forEach(e);
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
		var o = q(this._updateRefs(), 3), s = o[0], c = o[1], l = o[2];
		this.refTargets = s, this.selectorMap = c, l && this.forceUpdate();
	}, t.defaultAbles = [], t.customStyledMap = {}, t.defaultStyled = null, ur([fe(zr)], t.prototype, "moveable", void 0), t;
}(C.PureComponent));
//#endregion
//#region src/components/GrpLayer.tsx
function Gl({ cmn: { styChild: e, sys: t, isDesignMode: n, sty4Moveable: r }, fn: i, aFace: a }) {
	let o = (e) => {
		if (!e) return "";
		try {
			return t.cfg.searchPath(e, b.SP_GSM);
		} catch (e) {
			return console.warn("GrpLayer search failed (試作：アセット未整備の可能性)", e), "";
		}
	}, s = (e) => {
		e.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
	}, c = (0, C.useRef)(null), l = (e, t) => {
		ch(), e.transform = t;
	};
	return /* @__PURE__ */ h(v, { children: [/* @__PURE__ */ h("div", {
		css: e,
		ref: c,
		style: r,
		onMouseDown: (e) => s(e),
		children: [i && o(i) && /* @__PURE__ */ d("img", {
			src: o(i),
			style: { display: "block" }
		}), a.map(({ fn: e, dx: t, dy: n, blendmode: r }, i) => {
			let a = e && o(e);
			return a ? /* @__PURE__ */ d("img", {
				src: a,
				style: {
					position: "absolute",
					left: t,
					top: n,
					mixBlendMode: r
				}
			}, `${e}_${String(i)}`) : null;
		})]
	}), n && /* @__PURE__ */ d(Wl, {
		target: c,
		draggable: !0,
		throttleDrag: 1,
		onDrag: ({ target: { style: e }, transform: t }) => l(e, t),
		resizable: !0,
		keepRatio: !0,
		onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
			l(e, r), e.width = `${t}px`, e.height = `${n}px`;
		},
		rotatable: !0,
		throttleRotate: 0,
		startDragRotate: 0,
		throttleDragRotate: 0,
		rotationPosition: "top",
		onRotate: ({ target: { style: e }, drag: { transform: t } }) => l(e, t),
		originDraggable: !0,
		onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
			l(e, n), e.transformOrigin = t;
		}
	})] });
}
a();
var Kl = function(e, t) {
	var n = arguments;
	if (t == null || !f.call(t, "css")) return C.createElement.apply(void 0, n);
	var r = n.length, a = Array(r);
	a[0] = c, a[1] = i(e, t);
	for (var o = 2; o < r; o++) a[o] = n[o];
	return C.createElement.apply(null, a);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(Kl ||= {});
function ql() {
	return g([...arguments]);
}
//#endregion
//#region src/components/BtnLayer.tsx
function Jl({ text: e, label: t, call: n, fn: r, onActivate: i }) {
	return /* @__PURE__ */ d("span", {
		css: ql`
		position: relative;
		z-index: 2;

		display: inline-block;
		padding: 0.6em 1.6em;
		margin: 0.5em;
		font-size: x-large;
		font-weight: bold;
		text-align: center;
		white-space: pre-wrap;
		color: #27acd9;
		border: 2px solid #27acd9;
		border-radius: 100vh;
		background-color: white;
		cursor: pointer;
		user-select: none;
		transition: 0.3s;
		&:hover {
			color: #fff;
			background-color: #27acd9;
		}
	`,
		onClick: (e) => {
			e.stopPropagation(), i(t, n ?? !1, r);
		},
		children: e
	});
}
//#endregion
//#region node_modules/gsap/gsap-core.js
function Yl(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Xl(e, t) {
	e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
var Zl = {
	autoSleep: 120,
	force3D: "auto",
	nullTargetWarn: 1,
	units: { lineHeight: "" }
}, Ql = {
	duration: .5,
	overwrite: !1,
	delay: 0
}, $l, eu, tu, nu = 1e8, ru = 1 / nu, iu = Math.PI * 2, au = iu / 4, ou = 0, su = Math.sqrt, cu = Math.cos, lu = Math.sin, uu = function(e) {
	return typeof e == "string";
}, du = function(e) {
	return typeof e == "function";
}, fu = function(e) {
	return typeof e == "number";
}, pu = function(e) {
	return e === void 0;
}, mu = function(e) {
	return typeof e == "object";
}, hu = function(e) {
	return e !== !1;
}, gu = function() {
	return typeof window < "u";
}, _u = function(e) {
	return du(e) || uu(e);
}, vu = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {}, yu = Array.isArray, bu = /random\([^)]+\)/g, xu = /,\s*/g, Su = /(?:-?\.?\d|\.)+/gi, Cu = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, wu = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Tu = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Eu = /[+-]=-?[.\d]+/, Du = /[^,'"\[\]\s]+/gi, Ou = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ku, Au, ju, Mu, Nu = {}, Pu = {}, Fu, Iu = function(e) {
	return (Pu = md(e, Nu)) && Np;
}, Lu = function(e, t) {
	return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, Ru = function(e, t) {
	return !t && console.warn(e);
}, zu = function(e, t) {
	return e && (Nu[e] = t) && Pu && (Pu[e] = t) || Nu;
}, Bu = function() {
	return 0;
}, Vu = {
	suppressEvents: !0,
	isStart: !0,
	kill: !1
}, Hu = {
	suppressEvents: !0,
	kill: !1
}, Uu = { suppressEvents: !0 }, Wu = {}, Gu = [], Ku = {}, qu, Ju = {}, Yu = {}, Xu = 30, Zu = [], Qu = "", $u = function(e) {
	var t = e[0], n, r;
	if (mu(t) || du(t) || (e = [e]), !(n = (t._gsap || {}).harness)) {
		for (r = Zu.length; r-- && !Zu[r].targetTest(t););
		n = Zu[r];
	}
	for (r = e.length; r--;) e[r] && (e[r]._gsap || (e[r]._gsap = new Uf(e[r], n))) || e.splice(r, 1);
	return e;
}, ed = function(e) {
	return e._gsap || $u(Zd(e))[0]._gsap;
}, td = function(e, t, n) {
	return (n = e[t]) && du(n) ? e[t]() : pu(n) && e.getAttribute && e.getAttribute(t) || n;
}, nd = function(e, t) {
	return (e = e.split(",")).forEach(t) || e;
}, rd = function(e) {
	return Math.round(e * 1e5) / 1e5 || 0;
}, id = function(e) {
	return Math.round(e * 1e7) / 1e7 || 0;
}, ad = function(e, t) {
	var n = t.charAt(0), r = parseFloat(t.substr(2));
	return e = parseFloat(e), n === "+" ? e + r : n === "-" ? e - r : n === "*" ? e * r : e / r;
}, od = function(e, t) {
	for (var n = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < n;);
	return r < n;
}, sd = function() {
	var e = Gu.length, t = Gu.slice(0), n, r;
	for (Ku = {}, Gu.length = 0, n = 0; n < e; n++) r = t[n], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, cd = function(e) {
	return !!(e._initted || e._startAt || e.add);
}, ld = function(e, t, n, r) {
	Gu.length && !eu && sd(), e.render(t, n, r || !!(eu && t < 0 && cd(e))), Gu.length && !eu && sd();
}, ud = function(e) {
	var t = parseFloat(e);
	return (t || t === 0) && (e + "").match(Du).length < 2 ? t : uu(e) ? e.trim() : e;
}, dd = function(e) {
	return e;
}, fd = function(e, t) {
	for (var n in t) n in e || (e[n] = t[n]);
	return e;
}, pd = function(e) {
	return function(t, n) {
		for (var r in n) r in t || r === "duration" && e || r === "ease" || (t[r] = n[r]);
	};
}, md = function(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}, hd = function e(t, n) {
	for (var r in n) r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = mu(n[r]) ? e(t[r] || (t[r] = {}), n[r]) : n[r]);
	return t;
}, gd = function(e, t) {
	var n = {}, r;
	for (r in e) r in t || (n[r] = e[r]);
	return n;
}, _d = function(e) {
	var t = e.parent || ku, n = e.keyframes ? pd(yu(e.keyframes)) : fd;
	if (hu(e.inherit)) for (; t;) n(e, t.vars.defaults), t = t.parent || t._dp;
	return e;
}, vd = function(e, t) {
	for (var n = e.length, r = n === t.length; r && n-- && e[n] === t[n];);
	return n < 0;
}, yd = function(e, t, n, r, i) {
	n === void 0 && (n = "_first"), r === void 0 && (r = "_last");
	var a = e[r], o;
	if (i) for (o = t[i]; a && a[i] > o;) a = a._prev;
	return a ? (t._next = a._next, a._next = t) : (t._next = e[n], e[n] = t), t._next ? t._next._prev = t : e[r] = t, t._prev = a, t.parent = t._dp = e, t;
}, bd = function(e, t, n, r) {
	n === void 0 && (n = "_first"), r === void 0 && (r = "_last");
	var i = t._prev, a = t._next;
	i ? i._next = a : e[n] === t && (e[n] = a), a ? a._prev = i : e[r] === t && (e[r] = i), t._next = t._prev = t.parent = null;
}, xd = function(e, t) {
	e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, Sd = function(e, t) {
	if (e && (!t || t._end > e._dur || t._start < 0)) for (var n = e; n;) n._dirty = 1, n = n.parent;
	return e;
}, Cd = function(e) {
	for (var t = e.parent; t && t.parent;) t._dirty = 1, t.totalDuration(), t = t.parent;
	return e;
}, wd = function(e, t, n, r) {
	return e._startAt && (eu ? e._startAt.revert(Hu) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r));
}, Td = function e(t) {
	return !t || t._ts && e(t.parent);
}, Ed = function(e) {
	return e._repeat ? Dd(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Dd = function(e, t) {
	var n = Math.floor(e = id(e / t));
	return e && n === e ? n - 1 : n;
}, Od = function(e, t) {
	return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, kd = function(e) {
	return e._end = id(e._start + (e._tDur / Math.abs(e._ts || e._rts || ru) || 0));
}, Ad = function(e, t) {
	var n = e._dp;
	return n && n.smoothChildTiming && e._ts && (e._start = id(n._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), kd(e), n._dirty || Sd(n, e)), e;
}, jd = function(e, t) {
	var n;
	if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (n = Od(e.rawTime(), t), (!t._dur || Gd(0, t.totalDuration(), n) - t._tTime > ru) && t.render(n, !0)), Sd(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
		if (e._dur < e.duration()) for (n = e; n._dp;) n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
		e._zTime = -ru;
	}
}, Md = function(e, t, n, r) {
	return t.parent && xd(t), t._start = id((fu(n) ? n : n || e !== ku ? Hd(e, n, t) : e._time) + t._delay), t._end = id(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), yd(e, t, "_first", "_last", e._sort ? "_start" : 0), Id(t) || (e._recent = t), r || jd(e, t), e._ts < 0 && Ad(e, e._tTime), e;
}, Nd = function(e, t) {
	return (Nu.ScrollTrigger || Lu("scrollTrigger", t)) && Nu.ScrollTrigger.create(t, e);
}, Pd = function(e, t, n, r, i) {
	if (Qf(e, t, i), !e._initted) return 1;
	if (!n && e._pt && !eu && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && qu !== Af.frame) return Gu.push(e), e._lazy = [i, r], 1;
}, Fd = function e(t) {
	var n = t.parent;
	return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || e(n));
}, Id = function(e) {
	var t = e.data;
	return t === "isFromStart" || t === "isStart";
}, Ld = function(e, t, n, r) {
	var i = e.ratio, a = t < 0 || !t && (!e._start && Fd(e) && !(!e._initted && Id(e)) || (e._ts < 0 || e._dp._ts < 0) && !Id(e)) ? 0 : 1, o = e._rDelay, s = 0, c, l, u;
	if (o && e._repeat && (s = Gd(0, e._tDur, t), l = Dd(s, o), e._yoyo && l & 1 && (a = 1 - a), l !== Dd(e._tTime, o) && (i = 1 - a, e.vars.repeatRefresh && e._initted && e.invalidate())), a !== i || eu || r || e._zTime === ru || !t && e._zTime) {
		if (!e._initted && Pd(e, t, r, n, s)) return;
		for (u = e._zTime, e._zTime = t || (n ? ru : 0), n ||= t && !u, e.ratio = a, e._from && (a = 1 - a), e._time = 0, e._tTime = s, c = e._pt; c;) c.r(a, c.d), c = c._next;
		t < 0 && wd(e, t, n, !0), e._onUpdate && !n && hf(e, "onUpdate"), s && e._repeat && !n && e.parent && hf(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === a && (a && xd(e, 1), !n && !eu && (hf(e, a ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
	} else e._zTime ||= t;
}, Rd = function(e, t, n) {
	var r;
	if (n > t) for (r = e._first; r && r._start <= n;) {
		if (r.data === "isPause" && r._start > t) return r;
		r = r._next;
	}
	else for (r = e._last; r && r._start >= n;) {
		if (r.data === "isPause" && r._start < t) return r;
		r = r._prev;
	}
}, zd = function(e, t, n, r) {
	var i = e._repeat, a = id(t) || 0, o = e._tTime / e._tDur;
	return o && !r && (e._time *= a / e._dur), e._dur = a, e._tDur = i ? i < 0 ? 1e10 : id(a * (i + 1) + e._rDelay * i) : a, o > 0 && !r && Ad(e, e._tTime = e._tDur * o), e.parent && kd(e), n || Sd(e.parent, e), e;
}, Bd = function(e) {
	return e instanceof Gf ? Sd(e) : zd(e, e._dur);
}, Vd = {
	_start: 0,
	endTime: Bu,
	totalDuration: Bu
}, Hd = function e(t, n, r) {
	var i = t.labels, a = t._recent || Vd, o = t.duration() >= nu ? a.endTime(!1) : t._dur, s, c, l;
	return uu(n) && (isNaN(n) || n in i) ? (c = n.charAt(0), l = n.substr(-1) === "%", s = n.indexOf("="), c === "<" || c === ">" ? (s >= 0 && (n = n.replace(/=/, "")), (c === "<" ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (l ? (s < 0 ? a : r).totalDuration() / 100 : 1)) : s < 0 ? (n in i || (i[n] = o), i[n]) : (c = parseFloat(n.charAt(s - 1) + n.substr(s + 1)), l && r && (c = c / 100 * (yu(r) ? r[0] : r).totalDuration()), s > 1 ? e(t, n.substr(0, s - 1), r) + c : o + c)) : n == null ? o : +n;
}, Ud = function(e, t, n) {
	var r = fu(t[1]), i = (r ? 2 : 1) + (e < 2 ? 0 : 1), a = t[i], o, s;
	if (r && (a.duration = t[1]), a.parent = n, e) {
		for (o = a, s = n; s && !("immediateRender" in o);) o = s.vars.defaults || {}, s = hu(s.vars.inherit) && s.parent;
		a.immediateRender = hu(o.immediateRender), e < 2 ? a.runBackwards = 1 : a.startAt = t[i - 1];
	}
	return new ap(t[0], a, t[i + 1]);
}, Wd = function(e, t) {
	return e || e === 0 ? t(e) : t;
}, Gd = function(e, t, n) {
	return n < e ? e : n > t ? t : n;
}, Kd = function(e, t) {
	return !uu(e) || !(t = Ou.exec(e)) ? "" : t[1];
}, qd = function(e, t, n) {
	return Wd(n, function(n) {
		return Gd(e, t, n);
	});
}, Jd = [].slice, Yd = function(e, t) {
	return e && mu(e) && "length" in e && (!t && !e.length || e.length - 1 in e && mu(e[0])) && !e.nodeType && e !== Au;
}, Xd = function(e, t, n) {
	return n === void 0 && (n = []), e.forEach(function(e) {
		var r;
		return uu(e) && !t || Yd(e, 1) ? (r = n).push.apply(r, Zd(e)) : n.push(e);
	}) || n;
}, Zd = function(e, t, n) {
	return tu && !t && tu.selector ? tu.selector(e) : uu(e) && !n && (ju || !jf()) ? Jd.call((t || Mu).querySelectorAll(e), 0) : yu(e) ? Xd(e, n) : Yd(e) ? Jd.call(e, 0) : e ? [e] : [];
}, Qd = function(e) {
	return e = Zd(e)[0] || Ru("Invalid scope") || {}, function(t) {
		var n = e.current || e.nativeElement || e;
		return Zd(t, n.querySelectorAll ? n : n === e ? Ru("Invalid scope") || Mu.createElement("div") : e);
	};
}, $d = function(e) {
	return e.sort(function() {
		return .5 - Math.random();
	});
}, ef = function(e) {
	if (du(e)) return e;
	var t = mu(e) ? e : { each: e }, n = Rf(t.ease), r = t.from || 0, i = parseFloat(t.base) || 0, a = {}, o = r > 0 && r < 1, s = isNaN(r) || o, c = t.axis, l = r, u = r;
	return uu(r) ? l = u = {
		center: .5,
		edges: .5,
		end: 1
	}[r] || 0 : !o && s && (l = r[0], u = r[1]), function(e, o, d) {
		var f = (d || t).length, p = a[f], m, h, g, _, v, y, b, x, S;
		if (!p) {
			if (S = t.grid === "auto" ? 0 : (t.grid || [1, nu])[1], !S) {
				for (b = -nu; b < (b = d[S++].getBoundingClientRect().left) && S < f;);
				S < f && S--;
			}
			for (p = a[f] = [], m = s ? Math.min(S, f) * l - .5 : r % S, h = S === nu ? 0 : s ? f * u / S - .5 : r / S | 0, b = 0, x = nu, y = 0; y < f; y++) g = y % S - m, _ = h - (y / S | 0), p[y] = v = c ? Math.abs(c === "y" ? _ : g) : su(g * g + _ * _), v > b && (b = v), v < x && (x = v);
			r === "random" && $d(p), p.max = b - x, p.min = x, p.v = f = (parseFloat(t.amount) || parseFloat(t.each) * (S > f ? f - 1 : c ? c === "y" ? f / S : S : Math.max(S, f / S)) || 0) * (r === "edges" ? -1 : 1), p.b = f < 0 ? i - f : i, p.u = Kd(t.amount || t.each) || 0, n = n && f < 0 ? Lf(n) : n;
		}
		return f = (p[e] - p.min) / p.max || 0, id(p.b + (n ? n(f) : f) * p.v) + p.u;
	};
}, tf = function(e) {
	var t = 10 ** ((e + "").split(".")[1] || "").length;
	return function(n) {
		var r = id(Math.round(parseFloat(n) / e) * e * t);
		return (r - r % 1) / t + (fu(n) ? 0 : Kd(n));
	};
}, nf = function(e, t) {
	var n = yu(e), r, i;
	return !n && mu(e) && (r = n = e.radius || nu, e.values ? (e = Zd(e.values), (i = !fu(e[0])) && (r *= r)) : e = tf(e.increment)), Wd(t, n ? du(e) ? function(t) {
		return i = e(t), Math.abs(i - t) <= r ? i : t;
	} : function(t) {
		for (var n = parseFloat(i ? t.x : t), a = parseFloat(i ? t.y : 0), o = nu, s = 0, c = e.length, l, u; c--;) i ? (l = e[c].x - n, u = e[c].y - a, l = l * l + u * u) : l = Math.abs(e[c] - n), l < o && (o = l, s = c);
		return s = !r || o <= r ? e[s] : t, i || s === t || fu(t) ? s : s + Kd(t);
	} : tf(e));
}, rf = function(e, t, n, r) {
	return Wd(yu(e) ? !t : n === !0 ? !!(n = 0) : !r, function() {
		return yu(e) ? e[~~(Math.random() * e.length)] : (n ||= 1e-5) && (r = n < 1 ? 10 ** ((n + "").length - 2) : 1) && Math.floor(Math.round((e - n / 2 + Math.random() * (t - e + n * .99)) / n) * n * r) / r;
	});
}, af = function() {
	var e = [...arguments];
	return function(t) {
		return e.reduce(function(e, t) {
			return t(e);
		}, t);
	};
}, of = function(e, t) {
	return function(n) {
		return e(parseFloat(n)) + (t || Kd(n));
	};
}, sf = function(e, t, n) {
	return ff(e, t, 0, 1, n);
}, cf = function(e, t, n) {
	return Wd(n, function(n) {
		return e[~~t(n)];
	});
}, lf = function e(t, n, r) {
	var i = n - t;
	return yu(t) ? cf(t, e(0, t.length), n) : Wd(r, function(e) {
		return (i + (e - t) % i) % i + t;
	});
}, uf = function e(t, n, r) {
	var i = n - t, a = i * 2;
	return yu(t) ? cf(t, e(0, t.length - 1), n) : Wd(r, function(e) {
		return e = (a + (e - t) % a) % a || 0, t + (e > i ? a - e : e);
	});
}, df = function(e) {
	return e.replace(bu, function(e) {
		var t = e.indexOf("[") + 1, n = e.substring(t || 7, t ? e.indexOf("]") : e.length - 1).split(xu);
		return rf(t ? n : +n[0], t ? 0 : +n[1], +n[2] || 1e-5);
	});
}, ff = function(e, t, n, r, i) {
	var a = t - e, o = r - n;
	return Wd(i, function(t) {
		return n + ((t - e) / a * o || 0);
	});
}, pf = function e(t, n, r, i) {
	var a = isNaN(t + n) ? 0 : function(e) {
		return (1 - e) * t + e * n;
	};
	if (!a) {
		var o = uu(t), s = {}, c, l, u, d, f;
		if (r === !0 && (i = 1) && (r = null), o) t = { p: t }, n = { p: n };
		else if (yu(t) && !yu(n)) {
			for (u = [], d = t.length, f = d - 2, l = 1; l < d; l++) u.push(e(t[l - 1], t[l]));
			d--, a = function(e) {
				e *= d;
				var t = Math.min(f, ~~e);
				return u[t](e - t);
			}, r = n;
		} else i || (t = md(yu(t) ? [] : {}, t));
		if (!u) {
			for (c in n) qf.call(s, t, c, "get", n[c]);
			a = function(e) {
				return mp(e, s) || (o ? t.p : t);
			};
		}
	}
	return Wd(r, a);
}, mf = function(e, t, n) {
	var r = e.labels, i = nu, a, o, s;
	for (a in r) o = r[a] - t, o < 0 == !!n && o && i > (o = Math.abs(o)) && (s = a, i = o);
	return s;
}, hf = function(e, t, n) {
	var r = e.vars, i = r[t], a = tu, o = e._ctx, s, c, l;
	if (i) return s = r[t + "Params"], c = r.callbackScope || e, n && Gu.length && sd(), o && (tu = o), l = s ? i.apply(c, s) : i.call(c), tu = a, l;
}, gf = function(e) {
	return xd(e), e.scrollTrigger && e.scrollTrigger.kill(!!eu), e.progress() < 1 && hf(e, "onInterrupt"), e;
}, _f, vf = [], yf = function(e) {
	if (e) if (e = !e.name && e.default || e, gu() || e.headless) {
		var t = e.name, n = du(e), r = t && !n && e.init ? function() {
			this._props = [];
		} : e, i = {
			init: Bu,
			render: mp,
			add: qf,
			kill: gp,
			modifier: hp,
			rawVars: 0
		}, a = {
			targetTest: 0,
			get: 0,
			getSetter: up,
			aliases: {},
			register: 0
		};
		if (jf(), e !== r) {
			if (Ju[t]) return;
			fd(r, fd(gd(e, i), a)), md(r.prototype, md(i, gd(e, a))), Ju[r.prop = t] = r, e.targetTest && (Zu.push(r), Wu[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
		}
		zu(t, r), e.register && e.register(Np, r, yp);
	} else vf.push(e);
}, bf = 255, xf = {
	aqua: [
		0,
		bf,
		bf
	],
	lime: [
		0,
		bf,
		0
	],
	silver: [
		192,
		192,
		192
	],
	black: [
		0,
		0,
		0
	],
	maroon: [
		128,
		0,
		0
	],
	teal: [
		0,
		128,
		128
	],
	blue: [
		0,
		0,
		bf
	],
	navy: [
		0,
		0,
		128
	],
	white: [
		bf,
		bf,
		bf
	],
	olive: [
		128,
		128,
		0
	],
	yellow: [
		bf,
		bf,
		0
	],
	orange: [
		bf,
		165,
		0
	],
	gray: [
		128,
		128,
		128
	],
	purple: [
		128,
		0,
		128
	],
	green: [
		0,
		128,
		0
	],
	red: [
		bf,
		0,
		0
	],
	pink: [
		bf,
		192,
		203
	],
	cyan: [
		0,
		bf,
		bf
	],
	transparent: [
		bf,
		bf,
		bf,
		0
	]
}, Sf = function(e, t, n) {
	return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (n - t) * e * 6 : e < .5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * bf + .5 | 0;
}, Cf = function(e, t, n) {
	var r = e ? fu(e) ? [
		e >> 16,
		e >> 8 & bf,
		e & bf
	] : 0 : xf.black, i, a, o, s, c, l, u, d, f, p;
	if (!r) {
		if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), xf[e]) r = xf[e];
		else if (e.charAt(0) === "#") {
			if (e.length < 6 && (i = e.charAt(1), a = e.charAt(2), o = e.charAt(3), e = "#" + i + i + a + a + o + o + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9) return r = parseInt(e.substr(1, 6), 16), [
				r >> 16,
				r >> 8 & bf,
				r & bf,
				parseInt(e.substr(7), 16) / 255
			];
			e = parseInt(e.substr(1), 16), r = [
				e >> 16,
				e >> 8 & bf,
				e & bf
			];
		} else if (e.substr(0, 3) === "hsl") {
			if (r = p = e.match(Su), !t) s = r[0] % 360 / 360, c = r[1] / 100, l = r[2] / 100, a = l <= .5 ? l * (c + 1) : l + c - l * c, i = l * 2 - a, r.length > 3 && (r[3] *= 1), r[0] = Sf(s + 1 / 3, i, a), r[1] = Sf(s, i, a), r[2] = Sf(s - 1 / 3, i, a);
			else if (~e.indexOf("=")) return r = e.match(Cu), n && r.length < 4 && (r[3] = 1), r;
		} else r = e.match(Su) || xf.transparent;
		r = r.map(Number);
	}
	return t && !p && (i = r[0] / bf, a = r[1] / bf, o = r[2] / bf, u = Math.max(i, a, o), d = Math.min(i, a, o), l = (u + d) / 2, u === d ? s = c = 0 : (f = u - d, c = l > .5 ? f / (2 - u - d) : f / (u + d), s = u === i ? (a - o) / f + (a < o ? 6 : 0) : u === a ? (o - i) / f + 2 : (i - a) / f + 4, s *= 60), r[0] = ~~(s + .5), r[1] = ~~(c * 100 + .5), r[2] = ~~(l * 100 + .5)), n && r.length < 4 && (r[3] = 1), r;
}, wf = function(e) {
	var t = [], n = [], r = -1;
	return e.split(Ef).forEach(function(e) {
		var i = e.match(wu) || [];
		t.push.apply(t, i), n.push(r += i.length + 1);
	}), t.c = n, t;
}, Tf = function(e, t, n) {
	var r = "", i = (e + r).match(Ef), a = t ? "hsla(" : "rgba(", o = 0, s, c, l, u;
	if (!i) return e;
	if (i = i.map(function(e) {
		return (e = Cf(e, t, 1)) && a + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")";
	}), n && (l = wf(e), s = n.c, s.join(r) !== l.c.join(r))) for (c = e.replace(Ef, "1").split(wu), u = c.length - 1; o < u; o++) r += c[o] + (~s.indexOf(o) ? i.shift() || a + "0,0,0,0)" : (l.length ? l : i.length ? i : n).shift());
	if (!c) for (c = e.split(Ef), u = c.length - 1; o < u; o++) r += c[o] + i[o];
	return r + c[u];
}, Ef = function() {
	var e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
	for (t in xf) e += "|" + t + "\\b";
	return RegExp(e + ")", "gi");
}(), Df = /hsl[a]?\(/, Of = function(e) {
	var t = e.join(" "), n;
	if (Ef.lastIndex = 0, Ef.test(t)) return n = Df.test(t), e[1] = Tf(e[1], n), e[0] = Tf(e[0], n, wf(e[1])), !0;
}, kf, Af = function() {
	var e = Date.now, t = 500, n = 33, r = e(), i = r, a = 1e3 / 240, o = a, s = [], c, l, u, d, f, p, m = function u(m) {
		var h = e() - i, g = m === !0, _, v, y, b;
		if ((h > t || h < 0) && (r += h - n), i += h, y = i - r, _ = y - o, (_ > 0 || g) && (b = ++d.frame, f = y - d.time * 1e3, d.time = y /= 1e3, o += _ + (_ >= a ? 4 : a - _), v = 1), g || (c = l(u)), v) for (p = 0; p < s.length; p++) s[p](y, f, b, m);
	};
	return d = {
		time: 0,
		frame: 0,
		tick: function() {
			m(!0);
		},
		deltaRatio: function(e) {
			return f / (1e3 / (e || 60));
		},
		wake: function() {
			Fu && (!ju && gu() && (Au = ju = window, Mu = Au.document || {}, Nu.gsap = Np, (Au.gsapVersions ||= []).push(Np.version), Iu(Pu || Au.GreenSockGlobals || !Au.gsap && Au || {}), vf.forEach(yf)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && d.sleep(), l = u || function(e) {
				return setTimeout(e, o - d.time * 1e3 + 1 | 0);
			}, kf = 1, m(2));
		},
		sleep: function() {
			(u ? cancelAnimationFrame : clearTimeout)(c), kf = 0, l = Bu;
		},
		lagSmoothing: function(e, r) {
			t = e || Infinity, n = Math.min(r || 33, t);
		},
		fps: function(e) {
			a = 1e3 / (e || 240), o = d.time * 1e3 + a;
		},
		add: function(e, t, n) {
			var r = t ? function(t, n, i, a) {
				e(t, n, i, a), d.remove(r);
			} : e;
			return d.remove(e), s[n ? "unshift" : "push"](r), jf(), r;
		},
		remove: function(e, t) {
			~(t = s.indexOf(e)) && s.splice(t, 1) && p >= t && p--;
		},
		_listeners: s
	}, d;
}(), jf = function() {
	return !kf && Af.wake();
}, $ = {}, Mf = /^[\d.\-M][\d.\-,\s]/, Nf = /["']/g, Pf = function(e) {
	for (var t = {}, n = e.substr(1, e.length - 3).split(":"), r = n[0], i = 1, a = n.length, o, s, c; i < a; i++) s = n[i], o = i === a - 1 ? s.length : s.lastIndexOf(","), c = s.substr(0, o), t[r] = isNaN(c) ? c.replace(Nf, "").trim() : +c, r = s.substr(o + 1).trim();
	return t;
}, Ff = function(e) {
	var t = e.indexOf("(") + 1, n = e.indexOf(")"), r = e.indexOf("(", t);
	return e.substring(t, ~r && r < n ? e.indexOf(")", n + 1) : n);
}, If = function(e) {
	var t = (e + "").split("("), n = $[t[0]];
	return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf("{") ? [Pf(t[1])] : Ff(e).split(",").map(ud)) : $._CE && Mf.test(e) ? $._CE("", e) : n;
}, Lf = function(e) {
	return function(t) {
		return 1 - e(1 - t);
	};
}, Rf = function(e, t) {
	return e && (du(e) ? e : $[e] || If(e)) || t;
}, zf = function(e, t, n, r) {
	n === void 0 && (n = function(e) {
		return 1 - t(1 - e);
	}), r === void 0 && (r = function(e) {
		return e < .5 ? t(e * 2) / 2 : 1 - t((1 - e) * 2) / 2;
	});
	var i = {
		easeIn: t,
		easeOut: n,
		easeInOut: r
	}, a;
	return nd(e, function(e) {
		for (var t in $[e] = Nu[e] = i, $[a = e.toLowerCase()] = n, i) $[a + (t === "easeIn" ? ".in" : t === "easeOut" ? ".out" : ".inOut")] = $[e + "." + t] = i[t];
	}), i;
}, Bf = function(e) {
	return function(t) {
		return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2;
	};
}, Vf = function e(t, n, r) {
	var i = n >= 1 ? n : 1, a = (r || (t ? .3 : .45)) / (n < 1 ? n : 1), o = a / iu * (Math.asin(1 / i) || 0), s = function(e) {
		return e === 1 ? 1 : i * 2 ** (-10 * e) * lu((e - o) * a) + 1;
	}, c = t === "out" ? s : t === "in" ? function(e) {
		return 1 - s(1 - e);
	} : Bf(s);
	return a = iu / a, c.config = function(n, r) {
		return e(t, n, r);
	}, c;
}, Hf = function e(t, n) {
	n === void 0 && (n = 1.70158);
	var r = function(e) {
		return e ? --e * e * ((n + 1) * e + n) + 1 : 0;
	}, i = t === "out" ? r : t === "in" ? function(e) {
		return 1 - r(1 - e);
	} : Bf(r);
	return i.config = function(n) {
		return e(t, n);
	}, i;
};
nd("Linear,Quad,Cubic,Quart,Quint,Strong", function(e, t) {
	var n = t < 5 ? t + 1 : t;
	zf(e + ",Power" + (n - 1), t ? function(e) {
		return e ** +n;
	} : function(e) {
		return e;
	}, function(e) {
		return 1 - (1 - e) ** n;
	}, function(e) {
		return e < .5 ? (e * 2) ** n / 2 : 1 - ((1 - e) * 2) ** n / 2;
	});
}), $.Linear.easeNone = $.none = $.Linear.easeIn, zf("Elastic", Vf("in"), Vf("out"), Vf()), (function(e, t) {
	var n = 1 / t, r = 2 * n, i = 2.5 * n, a = function(a) {
		return a < n ? e * a * a : a < r ? e * (a - 1.5 / t) ** 2 + .75 : a < i ? e * (a -= 2.25 / t) * a + .9375 : e * (a - 2.625 / t) ** 2 + .984375;
	};
	zf("Bounce", function(e) {
		return 1 - a(1 - e);
	}, a);
})(7.5625, 2.75), zf("Expo", function(e) {
	return 2 ** (10 * (e - 1)) * e + e * e * e * e * e * e * (1 - e);
}), zf("Circ", function(e) {
	return -(su(1 - e * e) - 1);
}), zf("Sine", function(e) {
	return e === 1 ? 1 : -cu(e * au) + 1;
}), zf("Back", Hf("in"), Hf("out"), Hf()), $.SteppedEase = $.steps = Nu.SteppedEase = { config: function(e, t) {
	e === void 0 && (e = 1);
	var n = 1 / e, r = e + +!t, i = +!!t, a = 1 - ru;
	return function(e) {
		return ((r * Gd(0, a, e) | 0) + i) * n;
	};
} }, Ql.ease = $["quad.out"], nd("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(e) {
	return Qu += e + "," + e + "Params,";
});
var Uf = function(e, t) {
	this.id = ou++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : td, this.set = t ? t.getSetter : up;
}, Wf = /*#__PURE__*/ function() {
	function e(e) {
		this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === Infinity ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, zd(this, +e.duration, 1, 1), this.data = e.data, tu && (this._ctx = tu, tu.data.push(this)), kf || Af.wake();
	}
	var t = e.prototype;
	return t.delay = function(e) {
		return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay;
	}, t.duration = function(e) {
		return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
	}, t.totalDuration = function(e) {
		return arguments.length ? (this._dirty = 0, zd(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
	}, t.totalTime = function(e, t) {
		if (jf(), !arguments.length) return this._tTime;
		var n = this._dp;
		if (n && n.smoothChildTiming && this._ts) {
			for (Ad(this, e), !n._dp || n.parent || jd(n, this); n && n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
			!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Md(this._dp, this, this._start - this._delay);
		}
		return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === ru || !this._initted && this._dur && e || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), ld(this, e, t)), this;
	}, t.time = function(e, t) {
		return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Ed(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time;
	}, t.totalProgress = function(e, t) {
		return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
	}, t.progress = function(e, t) {
		return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + Ed(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : +(this.rawTime() > 0);
	}, t.iteration = function(e, t) {
		var n = this.duration() + this._rDelay;
		return arguments.length ? this.totalTime(this._time + (e - 1) * n, t) : this._repeat ? Dd(this._tTime, n) + 1 : 1;
	}, t.timeScale = function(e, t) {
		if (!arguments.length) return this._rts === -ru ? 0 : this._rts;
		if (this._rts === e) return this;
		var n = this.parent && this._ts ? Od(this.parent._time, this) : this._tTime;
		return this._rts = +e || 0, this._ts = this._ps || e === -ru ? 0 : this._rts, this.totalTime(Gd(-Math.abs(this._delay), this.totalDuration(), n), t !== !1), kd(this), Cd(this);
	}, t.paused = function(e) {
		return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (jf(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== ru && (this._tTime -= ru)))), this) : this._ps;
	}, t.startTime = function(e) {
		if (arguments.length) {
			this._start = id(e);
			var t = this.parent || this._dp;
			return t && (t._sort || !this.parent) && Md(t, this, this._start - this._delay), this;
		}
		return this._start;
	}, t.endTime = function(e) {
		return this._start + (hu(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
	}, t.rawTime = function(e) {
		var t = this.parent || this._dp;
		return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Od(t.rawTime(e), this) : this._tTime : this._tTime;
	}, t.revert = function(e) {
		e === void 0 && (e = Uu);
		var t = eu;
		return eu = e, cd(this) && (this.timeline && this.timeline.revert(e), this.totalTime(-.01, e.suppressEvents)), this.data !== "nested" && e.kill !== !1 && this.kill(), eu = t, this;
	}, t.globalTime = function(e) {
		for (var t = this, n = arguments.length ? e : t.rawTime(); t;) n = t._start + n / (Math.abs(t._ts) || 1), t = t._dp;
		return !this.parent && this._sat ? this._sat.globalTime(e) : n;
	}, t.repeat = function(e) {
		return arguments.length ? (this._repeat = e === Infinity ? -2 : e, Bd(this)) : this._repeat === -2 ? Infinity : this._repeat;
	}, t.repeatDelay = function(e) {
		if (arguments.length) {
			var t = this._time;
			return this._rDelay = e, Bd(this), t ? this.time(t) : this;
		}
		return this._rDelay;
	}, t.yoyo = function(e) {
		return arguments.length ? (this._yoyo = e, this) : this._yoyo;
	}, t.seek = function(e, t) {
		return this.totalTime(Hd(this, e), hu(t));
	}, t.restart = function(e, t) {
		return this.play().totalTime(e ? -this._delay : 0, hu(t)), this._dur || (this._zTime = -ru), this;
	}, t.play = function(e, t) {
		return e != null && this.seek(e, t), this.reversed(!1).paused(!1);
	}, t.reverse = function(e, t) {
		return e != null && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1);
	}, t.pause = function(e, t) {
		return e != null && this.seek(e, t), this.paused(!0);
	}, t.resume = function() {
		return this.paused(!1);
	}, t.reversed = function(e) {
		return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -ru : 0)), this) : this._rts < 0;
	}, t.invalidate = function() {
		return this._initted = this._act = 0, this._zTime = -ru, this;
	}, t.isActive = function() {
		var e = this.parent || this._dp, t = this._start, n;
		return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= t && n < this.endTime(!0) - ru);
	}, t.eventCallback = function(e, t, n) {
		var r = this.vars;
		return arguments.length > 1 ? (t ? (r[e] = t, n && (r[e + "Params"] = n), e === "onUpdate" && (this._onUpdate = t)) : delete r[e], this) : r[e];
	}, t.then = function(e) {
		var t = this, n = t._prom;
		return new Promise(function(r) {
			var i = du(e) ? e : dd, a = function() {
				var e = t.then;
				t.then = null, n && n(), du(i) && (i = i(t)) && (i.then || i === t) && (t.then = e), r(i), t.then = e;
			};
			t._initted && t.totalProgress() === 1 && t._ts >= 0 || !t._tTime && t._ts < 0 ? a() : t._prom = a;
		});
	}, t.kill = function() {
		gf(this);
	}, e;
}();
fd(Wf.prototype, {
	_time: 0,
	_start: 0,
	_end: 0,
	_tTime: 0,
	_tDur: 0,
	_dirty: 0,
	_repeat: 0,
	_yoyo: !1,
	parent: null,
	_initted: !1,
	_rDelay: 0,
	_ts: 1,
	_dp: 0,
	ratio: 0,
	_zTime: -ru,
	_prom: 0,
	_ps: !1,
	_rts: 1
});
var Gf = /*#__PURE__*/ function(e) {
	Xl(t, e);
	function t(t, n) {
		var r;
		return t === void 0 && (t = {}), r = e.call(this, t) || this, r.labels = {}, r.smoothChildTiming = !!t.smoothChildTiming, r.autoRemoveChildren = !!t.autoRemoveChildren, r._sort = hu(t.sortChildren), ku && Md(t.parent || ku, Yl(r), n), t.reversed && r.reverse(), t.paused && r.paused(!0), t.scrollTrigger && Nd(Yl(r), t.scrollTrigger), r;
	}
	var n = t.prototype;
	return n.to = function(e, t, n) {
		return Ud(0, arguments, this), this;
	}, n.from = function(e, t, n) {
		return Ud(1, arguments, this), this;
	}, n.fromTo = function(e, t, n, r) {
		return Ud(2, arguments, this), this;
	}, n.set = function(e, t, n) {
		return t.duration = 0, t.parent = this, _d(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, new ap(e, t, Hd(this, n), 1), this;
	}, n.call = function(e, t, n) {
		return Md(this, ap.delayedCall(0, e, t), n);
	}, n.staggerTo = function(e, t, n, r, i, a, o) {
		return n.duration = t, n.stagger = n.stagger || r, n.onComplete = a, n.onCompleteParams = o, n.parent = this, new ap(e, n, Hd(this, i)), this;
	}, n.staggerFrom = function(e, t, n, r, i, a, o) {
		return n.runBackwards = 1, _d(n).immediateRender = hu(n.immediateRender), this.staggerTo(e, t, n, r, i, a, o);
	}, n.staggerFromTo = function(e, t, n, r, i, a, o, s) {
		return r.startAt = n, _d(r).immediateRender = hu(r.immediateRender), this.staggerTo(e, t, r, i, a, o, s);
	}, n.render = function(e, t, n) {
		var r = this._time, i = this._dirty ? this.totalDuration() : this._tDur, a = this._dur, o = e <= 0 ? 0 : id(e), s = this._zTime < 0 != e < 0 && (this._initted || !a), c, l, u, d, f, p, m, h, g, _, v, y;
		if (this !== ku && o > i && e >= 0 && (o = i), o !== this._tTime || n || s) {
			if (r !== this._time && a && (o += this._time - r, e += this._time - r), c = o, g = this._start, h = this._ts, p = !h, s && (a || (r = this._zTime), (e || !t) && (this._zTime = e)), this._repeat) {
				if (v = this._yoyo, f = a + this._rDelay, this._repeat < -1 && e < 0) return this.totalTime(f * 100 + e, t, n);
				if (c = id(o % f), o === i ? (d = this._repeat, c = a) : (_ = id(o / f), d = ~~_, d && d === _ && (c = a, d--), c > a && (c = a)), _ = Dd(this._tTime, f), !r && this._tTime && _ !== d && this._tTime - _ * f - this._dur <= 0 && (_ = d), v && d & 1 && (c = a - c, y = 1), d !== _ && !this._lock) {
					var b = v && _ & 1, x = b === (v && d & 1);
					if (d < _ && (b = !b), r = b ? 0 : o % a ? a : o, this._lock = 1, this.render(r || (y ? 0 : id(d * f)), t, !a)._lock = 0, this._tTime = o, !t && this.parent && hf(this, "onRepeat"), this.vars.repeatRefresh && !y && (this.invalidate()._lock = 1, _ = d), r && r !== this._time || p !== !this._ts || this.vars.onRepeat && !this.parent && !this._act || (a = this._dur, i = this._tDur, x && (this._lock = 2, r = b ? a : -1e-4, this.render(r, !0), this.vars.repeatRefresh && !y && this.invalidate()), this._lock = 0, !this._ts && !p)) return this;
				}
			}
			if (this._hasPause && !this._forcing && this._lock < 2 && (m = Rd(this, id(r), id(c)), m && (o -= c - (c = m._start))), this._tTime = o, this._time = c, this._act = !!h, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = e, r = 0), !r && o && a && !t && !_ && (hf(this, "onStart"), this._tTime !== o)) return this;
			if (c >= r && e >= 0) for (l = this._first; l;) {
				if (u = l._next, (l._act || c >= l._start) && l._ts && m !== l) {
					if (l.parent !== this) return this.render(e, t, n);
					if (l.render(l._ts > 0 ? (c - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (c - l._start) * l._ts, t, n), c !== this._time || !this._ts && !p) {
						m = 0, u && (o += this._zTime = -ru);
						break;
					}
				}
				l = u;
			}
			else {
				l = this._last;
				for (var S = e < 0 ? e : c; l;) {
					if (u = l._prev, (l._act || S <= l._end) && l._ts && m !== l) {
						if (l.parent !== this) return this.render(e, t, n);
						if (l.render(l._ts > 0 ? (S - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (S - l._start) * l._ts, t, n || eu && cd(l)), c !== this._time || !this._ts && !p) {
							m = 0, u && (o += this._zTime = S ? -ru : ru);
							break;
						}
					}
					l = u;
				}
			}
			if (m && !t && (this.pause(), m.render(c >= r ? 0 : -ru)._zTime = c >= r ? 1 : -1, this._ts)) return this._start = g, kd(this), this.render(e, t, n);
			this._onUpdate && !t && hf(this, "onUpdate", !0), (o === i && this._tTime >= this.totalDuration() || !o && r) && (g === this._start || Math.abs(h) !== Math.abs(this._ts)) && (this._lock || ((e || !a) && (o === i && this._ts > 0 || !o && this._ts < 0) && xd(this, 1), !t && !(e < 0 && !r) && (o || r || !i) && (hf(this, o === i && e >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(o < i && this.timeScale() > 0) && this._prom())));
		}
		return this;
	}, n.add = function(e, t) {
		var n = this;
		if (fu(t) || (t = Hd(this, t, e)), !(e instanceof Wf)) {
			if (yu(e)) return e.forEach(function(e) {
				return n.add(e, t);
			}), this;
			if (uu(e)) return this.addLabel(e, t);
			if (du(e)) e = ap.delayedCall(0, e);
			else return this;
		}
		return this === e ? this : Md(this, e, t);
	}, n.getChildren = function(e, t, n, r) {
		e === void 0 && (e = !0), t === void 0 && (t = !0), n === void 0 && (n = !0), r === void 0 && (r = -nu);
		for (var i = [], a = this._first; a;) a._start >= r && (a instanceof ap ? t && i.push(a) : (n && i.push(a), e && i.push.apply(i, a.getChildren(!0, t, n)))), a = a._next;
		return i;
	}, n.getById = function(e) {
		for (var t = this.getChildren(1, 1, 1), n = t.length; n--;) if (t[n].vars.id === e) return t[n];
	}, n.remove = function(e) {
		return uu(e) ? this.removeLabel(e) : du(e) ? this.killTweensOf(e) : (e.parent === this && bd(this, e), e === this._recent && (this._recent = this._last), Sd(this));
	}, n.totalTime = function(t, n) {
		return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = id(Af.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), e.prototype.totalTime.call(this, t, n), this._forcing = 0, this) : this._tTime;
	}, n.addLabel = function(e, t) {
		return this.labels[e] = Hd(this, t), this;
	}, n.removeLabel = function(e) {
		return delete this.labels[e], this;
	}, n.addPause = function(e, t, n) {
		var r = ap.delayedCall(0, t || Bu, n);
		return r.data = "isPause", this._hasPause = 1, Md(this, r, Hd(this, e));
	}, n.removePause = function(e) {
		var t = this._first;
		for (e = Hd(this, e); t;) t._start === e && t.data === "isPause" && xd(t), t = t._next;
	}, n.killTweensOf = function(e, t, n) {
		for (var r = this.getTweensOf(e, n), i = r.length; i--;) Xf !== r[i] && r[i].kill(e, t);
		return this;
	}, n.getTweensOf = function(e, t) {
		for (var n = [], r = Zd(e), i = this._first, a = fu(t), o; i;) i instanceof ap ? od(i._targets, r) && (a ? (!Xf || i._initted && i._ts) && i.globalTime(0) <= t && i.globalTime(i.totalDuration()) > t : !t || i.isActive()) && n.push(i) : (o = i.getTweensOf(r, t)).length && n.push.apply(n, o), i = i._next;
		return n;
	}, n.tweenTo = function(e, t) {
		t ||= {};
		var n = this, r = Hd(n, e), i = t, a = i.startAt, o = i.onStart, s = i.onStartParams, c = i.immediateRender, l, u = ap.to(n, fd({
			ease: t.ease || "none",
			lazy: !1,
			immediateRender: !1,
			time: r,
			overwrite: "auto",
			duration: t.duration || Math.abs((r - (a && "time" in a ? a.time : n._time)) / n.timeScale()) || ru,
			onStart: function() {
				if (n.pause(), !l) {
					var e = t.duration || Math.abs((r - (a && "time" in a ? a.time : n._time)) / n.timeScale());
					u._dur !== e && zd(u, e, 0, 1).render(u._time, !0, !0), l = 1;
				}
				o && o.apply(u, s || []);
			}
		}, t));
		return c ? u.render(0) : u;
	}, n.tweenFromTo = function(e, t, n) {
		return this.tweenTo(t, fd({ startAt: { time: Hd(this, e) } }, n));
	}, n.recent = function() {
		return this._recent;
	}, n.nextLabel = function(e) {
		return e === void 0 && (e = this._time), mf(this, Hd(this, e));
	}, n.previousLabel = function(e) {
		return e === void 0 && (e = this._time), mf(this, Hd(this, e), 1);
	}, n.currentLabel = function(e) {
		return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + ru);
	}, n.shiftChildren = function(e, t, n) {
		n === void 0 && (n = 0);
		var r = this._first, i = this.labels, a;
		for (e = id(e); r;) r._start >= n && (r._start += e, r._end += e), r = r._next;
		if (t) for (a in i) i[a] >= n && (i[a] += e);
		return Sd(this);
	}, n.invalidate = function(t) {
		var n = this._first;
		for (this._lock = 0; n;) n.invalidate(t), n = n._next;
		return e.prototype.invalidate.call(this, t);
	}, n.clear = function(e) {
		e === void 0 && (e = !0);
		for (var t = this._first, n; t;) n = t._next, this.remove(t), t = n;
		return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), Sd(this);
	}, n.totalDuration = function(e) {
		var t = 0, n = this, r = n._last, i = nu, a, o, s;
		if (arguments.length) return n.timeScale((n._repeat < 0 ? n.duration() : n.totalDuration()) / (n.reversed() ? -e : e));
		if (n._dirty) {
			for (s = n.parent; r;) a = r._prev, r._dirty && r.totalDuration(), o = r._start, o > i && n._sort && r._ts && !n._lock ? (n._lock = 1, Md(n, r, o - r._delay, 1)._lock = 0) : i = o, o < 0 && r._ts && (t -= o, (!s && !n._dp || s && s.smoothChildTiming) && (n._start += id(o / n._ts), n._time -= o, n._tTime -= o), n.shiftChildren(-o, !1, -Infinity), i = 0), r._end > t && r._ts && (t = r._end), r = a;
			zd(n, n === ku && n._time > t ? n._time : t, 1, 1), n._dirty = 0;
		}
		return n._tDur;
	}, t.updateRoot = function(e) {
		if (ku._ts && (ld(ku, Od(e, ku)), qu = Af.frame), Af.frame >= Xu) {
			Xu += Zl.autoSleep || 120;
			var t = ku._first;
			if ((!t || !t._ts) && Zl.autoSleep && Af._listeners.length < 2) {
				for (; t && !t._ts;) t = t._next;
				t || Af.sleep();
			}
		}
	}, t;
}(Wf);
fd(Gf.prototype, {
	_lock: 0,
	_hasPause: 0,
	_forcing: 0
});
var Kf = function(e, t, n, r, i, a, o) {
	var s = new yp(this._pt, e, t, 0, 1, pp, null, i), c = 0, l = 0, u, d, f, p, m, h, g, _;
	for (s.b = n, s.e = r, n += "", r += "", (g = ~r.indexOf("random(")) && (r = df(r)), a && (_ = [n, r], a(_, e, t), n = _[0], r = _[1]), d = n.match(Tu) || []; u = Tu.exec(r);) p = u[0], m = r.substring(c, u.index), f ? f = (f + 1) % 5 : m.substr(-5) === "rgba(" && (f = 1), p !== d[l++] && (h = parseFloat(d[l - 1]) || 0, s._pt = {
		_next: s._pt,
		p: m || l === 1 ? m : ",",
		s: h,
		c: p.charAt(1) === "=" ? ad(h, p) - h : parseFloat(p) - h,
		m: f && f < 4 ? Math.round : 0
	}, c = Tu.lastIndex);
	return s.c = c < r.length ? r.substring(c, r.length) : "", s.fp = o, (Eu.test(r) || g) && (s.e = 0), this._pt = s, s;
}, qf = function(e, t, n, r, i, a, o, s, c, l) {
	du(r) && (r = r(i || 0, e, a));
	var u = e[t], d = n === "get" ? du(u) ? c ? e[t.indexOf("set") || !du(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](c) : e[t]() : u : n, f = du(u) ? c ? cp : sp : op, p;
	if (uu(r) && (~r.indexOf("random(") && (r = df(r)), r.charAt(1) === "=" && (p = ad(d, r) + (Kd(d) || 0), (p || p === 0) && (r = p))), !l || d !== r || Zf) return !isNaN(d * r) && r !== "" ? (p = new yp(this._pt, e, t, +d || 0, r - (d || 0), typeof u == "boolean" ? fp : dp, 0, f), c && (p.fp = c), o && p.modifier(o, this, e), this._pt = p) : (!u && !(t in e) && Lu(t, r), Kf.call(this, e, t, d, r, f, s || Zl.stringFilter, c));
}, Jf = function(e, t, n, r, i) {
	if (du(e) && (e = np(e, i, t, n, r)), !mu(e) || e.style && e.nodeType || yu(e) || vu(e)) return uu(e) ? np(e, i, t, n, r) : e;
	var a = {}, o;
	for (o in e) a[o] = np(e[o], i, t, n, r);
	return a;
}, Yf = function(e, t, n, r, i, a) {
	var o, s, c, l;
	if (Ju[e] && (o = new Ju[e]()).init(i, o.rawVars ? t[e] : Jf(t[e], r, i, a, n), n, r, a) !== !1 && (n._pt = s = new yp(n._pt, i, e, 0, 1, o.render, o, 0, o.priority), n !== _f)) for (c = n._ptLookup[n._targets.indexOf(i)], l = o._props.length; l--;) c[o._props[l]] = s;
	return o;
}, Xf, Zf, Qf = function e(t, n, r) {
	var i = t.vars, a = i.ease, o = i.startAt, s = i.immediateRender, c = i.lazy, l = i.onUpdate, u = i.runBackwards, d = i.yoyoEase, f = i.keyframes, p = i.autoRevert, m = t._dur, h = t._startAt, g = t._targets, _ = t.parent, v = _ && _.data === "nested" ? _.vars.targets : g, y = t._overwrite === "auto" && !$l, b = t.timeline, x = i.easeReverse || d, S, C, w, T, E, D, O, k, A, j, M, N, P;
	if (b && (!f || !a) && (a = "none"), t._ease = Rf(a, Ql.ease), t._rEase = x && (Rf(x) || t._ease), t._from = !b && !!i.runBackwards, t._from && (t.ratio = 1), !b || f && !i.stagger) {
		if (k = g[0] ? ed(g[0]).harness : 0, N = k && i[k.prop], S = gd(i, Wu), h && (h._zTime < 0 && h.progress(1), n < 0 && u && s && !p ? h.render(-1, !0) : h.revert(u && m ? Hu : Vu), h._lazy = 0), o) {
			if (xd(t._startAt = ap.set(g, fd({
				data: "isStart",
				overwrite: !1,
				parent: _,
				immediateRender: !0,
				lazy: !h && hu(c),
				startAt: null,
				delay: 0,
				onUpdate: l && function() {
					return hf(t, "onUpdate");
				},
				stagger: 0
			}, o))), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (eu || !s && !p) && t._startAt.revert(Hu), s && m && n <= 0 && r <= 0) {
				n && (t._zTime = n);
				return;
			}
		} else if (u && m && !h) {
			if (n && (s = !1), w = fd({
				overwrite: !1,
				data: "isFromStart",
				lazy: s && !h && hu(c),
				immediateRender: s,
				stagger: 0,
				parent: _
			}, S), N && (w[k.prop] = N), xd(t._startAt = ap.set(g, w)), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (eu ? t._startAt.revert(Hu) : t._startAt.render(-1, !0)), t._zTime = n, !s) e(t._startAt, ru, ru);
			else if (!n) return;
		}
		for (t._pt = t._ptCache = 0, c = m && hu(c) || c && !m, C = 0; C < g.length; C++) {
			if (E = g[C], O = E._gsap || $u(g)[C]._gsap, t._ptLookup[C] = j = {}, Ku[O.id] && Gu.length && sd(), M = v === g ? C : v.indexOf(E), k && (A = new k()).init(E, N || S, t, M, v) !== !1 && (t._pt = T = new yp(t._pt, E, A.name, 0, 1, A.render, A, 0, A.priority), A._props.forEach(function(e) {
				j[e] = T;
			}), A.priority && (D = 1)), !k || N) for (w in S) Ju[w] && (A = Yf(w, S, t, M, E, v)) ? A.priority && (D = 1) : j[w] = T = qf.call(t, E, w, "get", S[w], M, v, 0, i.stringFilter);
			t._op && t._op[C] && t.kill(E, t._op[C]), y && t._pt && (Xf = t, ku.killTweensOf(E, j, t.globalTime(n)), P = !t.parent, Xf = 0), t._pt && c && (Ku[O.id] = 1);
		}
		D && vp(t), t._onInit && t._onInit(t);
	}
	t._onUpdate = l, t._initted = (!t._op || t._pt) && !P, f && n <= 0 && b.render(nu, !0, !0);
}, $f = function(e, t, n, r, i, a, o, s) {
	var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], l, u, d, f;
	if (!c) for (c = e._ptCache[t] = [], d = e._ptLookup, f = e._targets.length; f--;) {
		if (l = d[f][t], l && l.d && l.d._pt) for (l = l.d._pt; l && l.p !== t && l.fp !== t;) l = l._next;
		if (!l) return Zf = 1, e.vars[t] = "+=0", Qf(e, o), Zf = 0, s ? Ru(t + " not eligible for reset. Try splitting into individual properties") : 1;
		c.push(l);
	}
	for (f = c.length; f--;) u = c[f], l = u._pt || u, l.s = (r || r === 0) && !i ? r : l.s + (r || 0) + a * l.c, l.c = n - l.s, u.e &&= rd(n) + Kd(u.e), u.b &&= l.s + Kd(u.b);
}, ep = function(e, t) {
	var n = e[0] ? ed(e[0]).harness : 0, r = n && n.aliases, i, a, o, s;
	if (!r) return t;
	for (a in i = md({}, t), r) if (a in i) for (s = r[a].split(","), o = s.length; o--;) i[s[o]] = i[a];
	return i;
}, tp = function(e, t, n, r) {
	var i = t.ease || r || "power1.inOut", a, o;
	if (yu(t)) o = n[e] || (n[e] = []), t.forEach(function(e, n) {
		return o.push({
			t: n / (t.length - 1) * 100,
			v: e,
			e: i
		});
	});
	else for (a in t) o = n[a] || (n[a] = []), a === "ease" || o.push({
		t: parseFloat(e),
		v: t[a],
		e: i
	});
}, np = function(e, t, n, r, i) {
	return du(e) ? e.call(t, n, r, i) : uu(e) && ~e.indexOf("random(") ? df(e) : e;
}, rp = Qu + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", ip = {};
nd(rp + ",id,stagger,delay,duration,paused,scrollTrigger", function(e) {
	return ip[e] = 1;
});
var ap = /*#__PURE__*/ function(e) {
	Xl(t, e);
	function t(t, n, r, i) {
		var a;
		typeof n == "number" && (r.duration = n, n = r, r = null), a = e.call(this, i ? n : _d(n)) || this;
		var o = a.vars, s = o.duration, c = o.delay, l = o.immediateRender, u = o.stagger, d = o.overwrite, f = o.keyframes, p = o.defaults, m = o.scrollTrigger, h = n.parent || ku, g = (yu(t) || vu(t) ? fu(t[0]) : "length" in n) ? [t] : Zd(t), _, v, y, b, x, S, C, w;
		if (a._targets = g.length ? $u(g) : Ru("GSAP target " + t + " not found. https://gsap.com", !Zl.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = d, f || u || _u(s) || _u(c)) {
			n = a.vars;
			var T = n.easeReverse || n.yoyoEase;
			if (_ = a.timeline = new Gf({
				data: "nested",
				defaults: p || {},
				targets: h && h.data === "nested" ? h.vars.targets : g
			}), _.kill(), _.parent = _._dp = Yl(a), _._start = 0, u || _u(s) || _u(c)) {
				if (b = g.length, C = u && ef(u), mu(u)) for (x in u) ~rp.indexOf(x) && (w ||= {}, w[x] = u[x]);
				for (v = 0; v < b; v++) y = gd(n, ip), y.stagger = 0, T && (y.easeReverse = T), w && md(y, w), S = g[v], y.duration = +np(s, Yl(a), v, S, g), y.delay = (+np(c, Yl(a), v, S, g) || 0) - a._delay, !u && b === 1 && y.delay && (a._delay = c = y.delay, a._start += c, y.delay = 0), _.to(S, y, C ? C(v, S, g) : 0), _._ease = $.none;
				_.duration() ? s = c = 0 : a.timeline = 0;
			} else if (f) {
				_d(fd(_.vars.defaults, { ease: "none" })), _._ease = Rf(f.ease || n.ease || "none");
				var E = 0, D, O, k;
				if (yu(f)) f.forEach(function(e) {
					return _.to(g, e, ">");
				}), _.duration();
				else {
					for (x in y = {}, f) x === "ease" || x === "easeEach" || tp(x, f[x], y, f.easeEach);
					for (x in y) for (D = y[x].sort(function(e, t) {
						return e.t - t.t;
					}), E = 0, v = 0; v < D.length; v++) O = D[v], k = {
						ease: O.e,
						duration: (O.t - (v ? D[v - 1].t : 0)) / 100 * s
					}, k[x] = O.v, _.to(g, k, E), E += k.duration;
					_.duration() < s && _.to({}, { duration: s - _.duration() });
				}
			}
			s || a.duration(s = _.duration());
		} else a.timeline = 0;
		return d === !0 && !$l && (Xf = Yl(a), ku.killTweensOf(g), Xf = 0), Md(h, Yl(a), r), n.reversed && a.reverse(), n.paused && a.paused(!0), (l || !s && !f && a._start === id(h._time) && hu(l) && Td(Yl(a)) && h.data !== "nested") && (a._tTime = -ru, a.render(Math.max(0, -c) || 0)), m && Nd(Yl(a), m), a;
	}
	var n = t.prototype;
	return n.render = function(e, t, n) {
		var r = this._time, i = this._tDur, a = this._dur, o = e < 0, s = e > i - ru && !o ? i : e < ru ? 0 : e, c, l, u, d, f, p, m, h;
		if (!a) Ld(this, e, t, n);
		else if (s !== this._tTime || !e || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== o || this._lazy) {
			if (c = s, h = this.timeline, this._repeat) {
				if (d = a + this._rDelay, this._repeat < -1 && o) return this.totalTime(d * 100 + e, t, n);
				if (c = id(s % d), s === i ? (u = this._repeat, c = a) : (f = id(s / d), u = ~~f, u && u === f ? (c = a, u--) : c > a && (c = a)), p = this._yoyo && u & 1, p && (c = a - c), f = Dd(this._tTime, d), c === r && !n && this._initted && u === f) return this._tTime = s, this;
				u !== f && this.vars.repeatRefresh && !p && !this._lock && c !== d && this._initted && (this._lock = n = 1, this.render(id(d * u), !0).invalidate()._lock = 0);
			}
			if (!this._initted) {
				if (Pd(this, o ? e : c, n, t, s)) return this._tTime = 0, this;
				if (r !== this._time && !(n && this.vars.repeatRefresh && u !== f)) return this;
				if (a !== this._dur) return this.render(e, t, n);
			}
			if (this._rEase) {
				var g = c < r;
				if (g !== this._inv) {
					var _ = g ? r : a - r;
					this._inv = g, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = r, this._invRecip = _ ? (g ? -1 : 1) / _ : 0, this._invScale = g ? -this.ratio : 1 - this.ratio, this._invEase = g ? this._rEase : this._ease;
				}
				this.ratio = m = this._invRatio + this._invScale * this._invEase((c - this._invTime) * this._invRecip);
			} else this.ratio = m = this._ease(c / a);
			if (this._from && (this.ratio = m = 1 - m), this._tTime = s, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), !r && s && !t && !f && (hf(this, "onStart"), this._tTime !== s)) return this;
			for (l = this._pt; l;) l.r(m, l.d), l = l._next;
			h && h.render(e < 0 ? e : h._dur * h._ease(c / this._dur), t, n) || this._startAt && (this._zTime = e), this._onUpdate && !t && (o && wd(this, e, t, n), hf(this, "onUpdate")), this._repeat && u !== f && this.vars.onRepeat && !t && this.parent && hf(this, "onRepeat"), (s === this._tDur || !s) && this._tTime === s && (o && !this._onUpdate && wd(this, e, !0, !0), (e || !a) && (s === this._tDur && this._ts > 0 || !s && this._ts < 0) && xd(this, 1), !t && !(o && !r) && (s || r || p) && (hf(this, s === i ? "onComplete" : "onReverseComplete", !0), this._prom && !(s < i && this.timeScale() > 0) && this._prom()));
		}
		return this;
	}, n.targets = function() {
		return this._targets;
	}, n.invalidate = function(t) {
		return (!t || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(t), e.prototype.invalidate.call(this, t);
	}, n.resetTo = function(e, t, n, r, i) {
		kf || Af.wake(), this._ts || this.play();
		var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts), o;
		return this._initted || Qf(this, a), o = this._ease(a / this._dur), $f(this, e, t, n, r, o, a, i) ? this.resetTo(e, t, n, r, 1) : (Ad(this, 0), this.parent || yd(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
	}, n.kill = function(e, t) {
		if (t === void 0 && (t = "all"), !e && (!t || t === "all")) return this._lazy = this._pt = 0, this.parent ? gf(this) : this.scrollTrigger && this.scrollTrigger.kill(!!eu), this;
		if (this.timeline) {
			var n = this.timeline.totalDuration();
			return this.timeline.killTweensOf(e, t, Xf && Xf.vars.overwrite !== !0)._first || gf(this), this.parent && n !== this.timeline.totalDuration() && zd(this, this._dur * this.timeline._tDur / n, 0, 1), this;
		}
		var r = this._targets, i = e ? Zd(e) : r, a = this._ptLookup, o = this._pt, s, c, l, u, d, f, p;
		if ((!t || t === "all") && vd(r, i)) return t === "all" && (this._pt = 0), gf(this);
		for (s = this._op = this._op || [], t !== "all" && (uu(t) && (d = {}, nd(t, function(e) {
			return d[e] = 1;
		}), t = d), t = ep(r, t)), p = r.length; p--;) if (~i.indexOf(r[p])) for (d in c = a[p], t === "all" ? (s[p] = t, u = c, l = {}) : (l = s[p] = s[p] || {}, u = t), u) f = c && c[d], f && ((!("kill" in f.d) || f.d.kill(d) === !0) && bd(this, f, "_pt"), delete c[d]), l !== "all" && (l[d] = 1);
		return this._initted && !this._pt && o && gf(this), this;
	}, t.to = function(e, n) {
		return new t(e, n, arguments[2]);
	}, t.from = function(e, t) {
		return Ud(1, arguments);
	}, t.delayedCall = function(e, n, r, i) {
		return new t(n, 0, {
			immediateRender: !1,
			lazy: !1,
			overwrite: !1,
			delay: e,
			onComplete: n,
			onReverseComplete: n,
			onCompleteParams: r,
			onReverseCompleteParams: r,
			callbackScope: i
		});
	}, t.fromTo = function(e, t, n) {
		return Ud(2, arguments);
	}, t.set = function(e, n) {
		return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(e, n);
	}, t.killTweensOf = function(e, t, n) {
		return ku.killTweensOf(e, t, n);
	}, t;
}(Wf);
fd(ap.prototype, {
	_targets: [],
	_lazy: 0,
	_startAt: 0,
	_op: 0,
	_onInit: 0
}), nd("staggerTo,staggerFrom,staggerFromTo", function(e) {
	ap[e] = function() {
		var t = new Gf(), n = Jd.call(arguments, 0);
		return n.splice(e === "staggerFromTo" ? 5 : 4, 0, 0), t[e].apply(t, n);
	};
});
var op = function(e, t, n) {
	return e[t] = n;
}, sp = function(e, t, n) {
	return e[t](n);
}, cp = function(e, t, n, r) {
	return e[t](r.fp, n);
}, lp = function(e, t, n) {
	return e.setAttribute(t, n);
}, up = function(e, t) {
	return du(e[t]) ? sp : pu(e[t]) && e.setAttribute ? lp : op;
}, dp = function(e, t) {
	return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, fp = function(e, t) {
	return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, pp = function(e, t) {
	var n = t._pt, r = "";
	if (!e && t.b) r = t.b;
	else if (e === 1 && t.e) r = t.e;
	else {
		for (; n;) r = n.p + (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) + r, n = n._next;
		r += t.c;
	}
	t.set(t.t, t.p, r, t);
}, mp = function(e, t) {
	for (var n = t._pt; n;) n.r(e, n.d), n = n._next;
}, hp = function(e, t, n, r) {
	for (var i = this._pt, a; i;) a = i._next, i.p === r && i.modifier(e, t, n), i = a;
}, gp = function(e) {
	for (var t = this._pt, n, r; t;) r = t._next, t.p === e && !t.op || t.op === e ? bd(this, t, "_pt") : t.dep || (n = 1), t = r;
	return !n;
}, _p = function(e, t, n, r) {
	r.mSet(e, t, r.m.call(r.tween, n, r.mt), r);
}, vp = function(e) {
	for (var t = e._pt, n, r, i, a; t;) {
		for (n = t._next, r = i; r && r.pr > t.pr;) r = r._next;
		(t._prev = r ? r._prev : a) ? t._prev._next = t : i = t, (t._next = r) ? r._prev = t : a = t, t = n;
	}
	e._pt = i;
}, yp = /*#__PURE__*/ function() {
	function e(e, t, n, r, i, a, o, s, c) {
		this.t = t, this.s = r, this.c = i, this.p = n, this.r = a || dp, this.d = o || this, this.set = s || op, this.pr = c || 0, this._next = e, e && (e._prev = this);
	}
	var t = e.prototype;
	return t.modifier = function(e, t, n) {
		this.mSet = this.mSet || this.set, this.set = _p, this.m = e, this.mt = n, this.tween = t;
	}, e;
}();
nd(Qu + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(e) {
	return Wu[e] = 1;
}), Nu.TweenMax = Nu.TweenLite = ap, Nu.TimelineLite = Nu.TimelineMax = Gf, ku = new Gf({
	sortChildren: !1,
	defaults: Ql,
	autoRemoveChildren: !0,
	id: "root",
	smoothChildTiming: !0
}), Zl.stringFilter = Of;
var bp = [], xp = {}, Sp = [], Cp = 0, wp = 0, Tp = function(e) {
	return (xp[e] || Sp).map(function(e) {
		return e();
	});
}, Ep = function() {
	var e = Date.now(), t = [];
	e - Cp > 2 && (Tp("matchMediaInit"), bp.forEach(function(e) {
		var n = e.queries, r = e.conditions, i, a, o, s;
		for (a in n) i = Au.matchMedia(n[a]).matches, i && (o = 1), i !== r[a] && (r[a] = i, s = 1);
		s && (e.revert(), o && t.push(e));
	}), Tp("matchMediaRevert"), t.forEach(function(e) {
		return e.onMatch(e, function(t) {
			return e.add(null, t);
		});
	}), Cp = e, Tp("matchMedia"));
}, Dp = /*#__PURE__*/ function() {
	function e(e, t) {
		this.selector = t && Qd(t), this.data = [], this._r = [], this.isReverted = !1, this.id = wp++, e && this.add(e);
	}
	var t = e.prototype;
	return t.add = function(e, t, n) {
		du(e) && (n = t, t = e, e = du);
		var r = this, i = function() {
			var e = tu, i = r.selector, a;
			return e && e !== r && e.data.push(r), n && (r.selector = Qd(n)), tu = r, a = t.apply(r, arguments), du(a) && r._r.push(a), tu = e, r.selector = i, r.isReverted = !1, a;
		};
		return r.last = i, e === du ? i(r, function(e) {
			return r.add(null, e);
		}) : e ? r[e] = i : i;
	}, t.ignore = function(e) {
		var t = tu;
		tu = null, e(this), tu = t;
	}, t.getTweens = function() {
		var t = [];
		return this.data.forEach(function(n) {
			return n instanceof e ? t.push.apply(t, n.getTweens()) : n instanceof ap && !(n.parent && n.parent.data === "nested") && t.push(n);
		}), t;
	}, t.clear = function() {
		this._r.length = this.data.length = 0;
	}, t.kill = function(e, t) {
		var n = this;
		if (e ? (function() {
			for (var t = n.getTweens(), r = n.data.length, i; r--;) i = n.data[r], i.data === "isFlip" && (i.revert(), i.getChildren(!0, !0, !1).forEach(function(e) {
				return t.splice(t.indexOf(e), 1);
			}));
			for (t.map(function(e) {
				return {
					g: e._dur || e._delay || e._sat && !e._sat.vars.immediateRender ? e.globalTime(0) : -Infinity,
					t: e
				};
			}).sort(function(e, t) {
				return t.g - e.g || -Infinity;
			}).forEach(function(t) {
				return t.t.revert(e);
			}), r = n.data.length; r--;) i = n.data[r], i instanceof Gf ? i.data !== "nested" && (i.scrollTrigger && i.scrollTrigger.revert(), i.kill()) : !(i instanceof ap) && i.revert && i.revert(e);
			n._r.forEach(function(t) {
				return t(e, n);
			}), n.isReverted = !0;
		})() : this.data.forEach(function(e) {
			return e.kill && e.kill();
		}), this.clear(), t) for (var r = bp.length; r--;) bp[r].id === this.id && bp.splice(r, 1);
	}, t.revert = function(e) {
		this.kill(e || {});
	}, e;
}(), Op = /*#__PURE__*/ function() {
	function e(e) {
		this.contexts = [], this.scope = e, tu && tu.data.push(this);
	}
	var t = e.prototype;
	return t.add = function(e, t, n) {
		mu(e) || (e = { matches: e });
		var r = new Dp(0, n || this.scope), i = r.conditions = {}, a, o, s;
		for (o in tu && !r.selector && (r.selector = tu.selector), this.contexts.push(r), t = r.add("onMatch", t), r.queries = e, e) o === "all" ? s = 1 : (a = Au.matchMedia(e[o]), a && (bp.indexOf(r) < 0 && bp.push(r), (i[o] = a.matches) && (s = 1), a.addListener ? a.addListener(Ep) : a.addEventListener("change", Ep)));
		return s && t(r, function(e) {
			return r.add(null, e);
		}), this;
	}, t.revert = function(e) {
		this.kill(e || {});
	}, t.kill = function(e) {
		this.contexts.forEach(function(t) {
			return t.kill(e, !0);
		});
	}, e;
}(), kp = {
	registerPlugin: function() {
		[...arguments].forEach(function(e) {
			return yf(e);
		});
	},
	timeline: function(e) {
		return new Gf(e);
	},
	getTweensOf: function(e, t) {
		return ku.getTweensOf(e, t);
	},
	getProperty: function(e, t, n, r) {
		uu(e) && (e = Zd(e)[0]);
		var i = ed(e || {}).get, a = n ? dd : ud;
		return n === "native" && (n = ""), e && (t ? a((Ju[t] && Ju[t].get || i)(e, t, n, r)) : function(t, n, r) {
			return a((Ju[t] && Ju[t].get || i)(e, t, n, r));
		});
	},
	quickSetter: function(e, t, n) {
		if (e = Zd(e), e.length > 1) {
			var r = e.map(function(e) {
				return Np.quickSetter(e, t, n);
			}), i = r.length;
			return function(e) {
				for (var t = i; t--;) r[t](e);
			};
		}
		e = e[0] || {};
		var a = Ju[t], o = ed(e), s = o.harness && (o.harness.aliases || {})[t] || t, c = a ? function(t) {
			var r = new a();
			_f._pt = 0, r.init(e, n ? t + n : t, _f, 0, [e]), r.render(1, r), _f._pt && mp(1, _f);
		} : o.set(e, s);
		return a ? c : function(t) {
			return c(e, s, n ? t + n : t, o, 1);
		};
	},
	quickTo: function(e, t, n) {
		var r, i = Np.to(e, fd((r = {}, r[t] = "+=0.1", r.paused = !0, r.stagger = 0, r), n || {})), a = function(e, n, r) {
			return i.resetTo(t, e, n, r);
		};
		return a.tween = i, a;
	},
	isTweening: function(e) {
		return ku.getTweensOf(e, !0).length > 0;
	},
	defaults: function(e) {
		return e && e.ease && (e.ease = Rf(e.ease, Ql.ease)), hd(Ql, e || {});
	},
	config: function(e) {
		return hd(Zl, e || {});
	},
	registerEffect: function(e) {
		var t = e.name, n = e.effect, r = e.plugins, i = e.defaults, a = e.extendTimeline;
		(r || "").split(",").forEach(function(e) {
			return e && !Ju[e] && !Nu[e] && Ru(t + " effect requires " + e + " plugin.");
		}), Yu[t] = function(e, t, r) {
			return n(Zd(e), fd(t || {}, i), r);
		}, a && (Gf.prototype[t] = function(e, n, r) {
			return this.add(Yu[t](e, mu(n) ? n : (r = n) && {}, this), r);
		});
	},
	registerEase: function(e, t) {
		$[e] = Rf(t);
	},
	parseEase: function(e, t) {
		return arguments.length ? Rf(e, t) : $;
	},
	getById: function(e) {
		return ku.getById(e);
	},
	exportRoot: function(e, t) {
		e === void 0 && (e = {});
		var n = new Gf(e), r, i;
		for (n.smoothChildTiming = hu(e.smoothChildTiming), ku.remove(n), n._dp = 0, n._time = n._tTime = ku._time, r = ku._first; r;) i = r._next, (t || !(!r._dur && r instanceof ap && r.vars.onComplete === r._targets[0])) && Md(n, r, r._start - r._delay), r = i;
		return Md(ku, n, 0), n;
	},
	context: function(e, t) {
		return e ? new Dp(e, t) : tu;
	},
	matchMedia: function(e) {
		return new Op(e);
	},
	matchMediaRefresh: function() {
		return bp.forEach(function(e) {
			var t = e.conditions, n, r;
			for (r in t) t[r] && (t[r] = !1, n = 1);
			n && e.revert();
		}) || Ep();
	},
	addEventListener: function(e, t) {
		var n = xp[e] || (xp[e] = []);
		~n.indexOf(t) || n.push(t);
	},
	removeEventListener: function(e, t) {
		var n = xp[e], r = n && n.indexOf(t);
		r >= 0 && n.splice(r, 1);
	},
	utils: {
		wrap: lf,
		wrapYoyo: uf,
		distribute: ef,
		random: rf,
		snap: nf,
		normalize: sf,
		getUnit: Kd,
		clamp: qd,
		splitColor: Cf,
		toArray: Zd,
		selector: Qd,
		mapRange: ff,
		pipe: af,
		unitize: of,
		interpolate: pf,
		shuffle: $d
	},
	install: Iu,
	effects: Yu,
	ticker: Af,
	updateRoot: Gf.updateRoot,
	plugins: Ju,
	globalTimeline: ku,
	core: {
		PropTween: yp,
		globals: zu,
		Tween: ap,
		Timeline: Gf,
		Animation: Wf,
		getCache: ed,
		_removeLinkedListItem: bd,
		reverting: function() {
			return eu;
		},
		context: function(e) {
			return e && tu && (tu.data.push(e), e._ctx = tu), tu;
		},
		suppressOverwrites: function(e) {
			return $l = e;
		}
	}
};
nd("to,from,fromTo,delayedCall,set,killTweensOf", function(e) {
	return kp[e] = ap[e];
}), Af.add(Gf.updateRoot), _f = kp.to({}, { duration: 0 });
var Ap = function(e, t) {
	for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t;) n = n._next;
	return n;
}, jp = function(e, t) {
	var n = e._targets, r, i, a;
	for (r in t) for (i = n.length; i--;) a = e._ptLookup[i][r], (a &&= a.d) && (a._pt && (a = Ap(a, r)), a && a.modifier && a.modifier(t[r], e, n[i], r));
}, Mp = function(e, t) {
	return {
		name: e,
		headless: 1,
		rawVars: 1,
		init: function(e, n, r) {
			r._onInit = function(e) {
				var r, i;
				if (uu(n) && (r = {}, nd(n, function(e) {
					return r[e] = 1;
				}), n = r), t) {
					for (i in r = {}, n) r[i] = t(n[i]);
					n = r;
				}
				jp(e, n);
			};
		}
	};
}, Np = kp.registerPlugin({
	name: "attr",
	init: function(e, t, n, r, i) {
		var a, o, s;
		for (a in this.tween = n, t) s = e.getAttribute(a) || "", o = this.add(e, "setAttribute", (s || 0) + "", t[a], r, i, 0, 0, a), o.op = a, o.b = s, this._props.push(a);
	},
	render: function(e, t) {
		for (var n = t._pt; n;) eu ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), n = n._next;
	}
}, {
	name: "endArray",
	headless: 1,
	init: function(e, t) {
		for (var n = t.length; n--;) this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1);
	}
}, Mp("roundProps", tf), Mp("modifiers"), Mp("snap", nf)) || kp;
ap.version = Gf.version = Np.version = "3.15.0", Fu = 1, gu() && jf(), $.Power0, $.Power1, $.Power2, $.Power3, $.Power4, $.Linear, $.Quad, $.Cubic, $.Quart, $.Quint, $.Strong, $.Elastic, $.Back, $.SteppedEase, $.Bounce, $.Sine, $.Expo, $.Circ;
//#endregion
//#region node_modules/gsap/CSSPlugin.js
var Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp = function() {
	return typeof window < "u";
}, Hp = {}, Up = 180 / Math.PI, Wp = Math.PI / 180, Gp = Math.atan2, Kp = 1e8, qp = /([A-Z])/g, Jp = /(left|right|width|margin|padding|x)/i, Yp = /[\s,\(]\S/, Xp = {
	autoAlpha: "opacity,visibility",
	scale: "scaleX,scaleY",
	alpha: "opacity"
}, Zp = function(e, t) {
	return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Qp = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, $p = function(e, t) {
	return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, em = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, tm = function(e, t) {
	var n = t.s + t.c * e;
	t.set(t.t, t.p, ~~(n + (n < 0 ? -.5 : .5)) + t.u, t);
}, nm = function(e, t) {
	return t.set(t.t, t.p, e ? t.e : t.b, t);
}, rm = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : t.b, t);
}, im = function(e, t, n) {
	return e.style[t] = n;
}, am = function(e, t, n) {
	return e.style.setProperty(t, n);
}, om = function(e, t, n) {
	return e._gsap[t] = n;
}, sm = function(e, t, n) {
	return e._gsap.scaleX = e._gsap.scaleY = n;
}, cm = function(e, t, n, r, i) {
	var a = e._gsap;
	a.scaleX = a.scaleY = n, a.renderTransform(i, a);
}, lm = function(e, t, n, r, i) {
	var a = e._gsap;
	a[t] = n, a.renderTransform(i, a);
}, um = "transform", dm = um + "Origin", fm = function e(t, n) {
	var r = this, i = this.target, a = i.style, o = i._gsap;
	if (t in Hp && a) {
		if (this.tfm = this.tfm || {}, t !== "transform") t = Xp[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(e) {
			return r.tfm[e] = jm(i, e);
		}) : this.tfm[t] = o.x ? o[t] : jm(i, t), t === dm && (this.tfm.zOrigin = o.zOrigin);
		else return Xp.transform.split(",").forEach(function(t) {
			return e.call(r, t, n);
		});
		if (this.props.indexOf(um) >= 0) return;
		o.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(dm, n, "")), t = um;
	}
	(a || n) && this.props.push(t, n, a[t]);
}, pm = function(e) {
	e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, mm = function() {
	var e = this.props, t = this.target, n = t.style, r = t._gsap, i, a;
	for (i = 0; i < e.length; i += 3) e[i + 1] ? e[i + 1] === 2 ? t[e[i]](e[i + 2]) : t[e[i]] = e[i + 2] : e[i + 2] ? n[e[i]] = e[i + 2] : n.removeProperty(e[i].substr(0, 2) === "--" ? e[i] : e[i].replace(qp, "-$1").toLowerCase());
	if (this.tfm) {
		for (a in this.tfm) r[a] = this.tfm[a];
		r.svg && (r.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), i = Bp(), (!i || !i.isStart) && !n[um] && (pm(n), r.zOrigin && n[dm] && (n[dm] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
	}
}, hm = function(e, t) {
	var n = {
		target: e,
		props: [],
		revert: mm,
		save: fm
	};
	return e._gsap || Np.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(e) {
		return n.save(e);
	}), n;
}, gm, _m = function(e, t) {
	var n = Fp.createElementNS ? Fp.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Fp.createElement(e);
	return n && n.style ? n : Fp.createElement(e);
}, vm = function e(t, n, r) {
	var i = getComputedStyle(t);
	return i[n] || i.getPropertyValue(n.replace(qp, "-$1").toLowerCase()) || i.getPropertyValue(n) || !r && e(t, bm(n) || n, 1) || "";
}, ym = "O,Moz,ms,Ms,Webkit".split(","), bm = function(e, t, n) {
	var r = (t || Rp).style, i = 5;
	if (e in r && !n) return e;
	for (e = e.charAt(0).toUpperCase() + e.substr(1); i-- && !(ym[i] + e in r););
	return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? ym[i] : "") + e;
}, xm = function() {
	Vp() && window.document && (Pp = window, Fp = Pp.document, Ip = Fp.documentElement, Rp = _m("div") || { style: {} }, _m("div"), um = bm(um), dm = um + "Origin", Rp.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", gm = !!bm("perspective"), Bp = Np.core.reverting, Lp = 1);
}, Sm = function(e) {
	var t = e.ownerSVGElement, n = _m("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = e.cloneNode(!0), i;
	r.style.display = "block", n.appendChild(r), Ip.appendChild(n);
	try {
		i = r.getBBox();
	} catch {}
	return n.removeChild(r), Ip.removeChild(n), i;
}, Cm = function(e, t) {
	for (var n = t.length; n--;) if (e.hasAttribute(t[n])) return e.getAttribute(t[n]);
}, wm = function(e) {
	var t, n;
	try {
		t = e.getBBox();
	} catch {
		t = Sm(e), n = 1;
	}
	return t && (t.width || t.height) || n || (t = Sm(e)), t && !t.width && !t.x && !t.y ? {
		x: +Cm(e, [
			"x",
			"cx",
			"x1"
		]) || 0,
		y: +Cm(e, [
			"y",
			"cy",
			"y1"
		]) || 0,
		width: 0,
		height: 0
	} : t;
}, Tm = function(e) {
	return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && wm(e));
}, Em = function(e, t) {
	if (t) {
		var n = e.style, r;
		t in Hp && t !== dm && (t = um), n.removeProperty ? (r = t.substr(0, 2), (r === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), n.removeProperty(r === "--" ? t : t.replace(qp, "-$1").toLowerCase())) : n.removeAttribute(t);
	}
}, Dm = function(e, t, n, r, i, a) {
	var o = new yp(e._pt, t, n, 0, 1, a ? rm : nm);
	return e._pt = o, o.b = r, o.e = i, e._props.push(n), o;
}, Om = {
	deg: 1,
	rad: 1,
	turn: 1
}, km = {
	grid: 1,
	flex: 1
}, Am = function e(t, n, r, i) {
	var a = parseFloat(r) || 0, o = (r + "").trim().substr((a + "").length) || "px", s = Rp.style, c = Jp.test(n), l = t.tagName.toLowerCase() === "svg", u = (l ? "client" : "offset") + (c ? "Width" : "Height"), d = 100, f = i === "px", p = i === "%", m, h, g, _;
	if (i === o || !a || Om[i] || Om[o]) return a;
	if (o !== "px" && !f && (a = e(t, n, r, "px")), _ = t.getCTM && Tm(t), (p || o === "%") && (Hp[n] || ~n.indexOf("adius"))) return m = _ ? t.getBBox()[c ? "width" : "height"] : t[u], rd(p ? a / m * d : a / 100 * m);
	if (s[c ? "width" : "height"] = d + (f ? o : i), h = i !== "rem" && ~n.indexOf("adius") || i === "em" && t.appendChild && !l ? t : t.parentNode, _ && (h = (t.ownerSVGElement || {}).parentNode), (!h || h === Fp || !h.appendChild) && (h = Fp.body), g = h._gsap, g && p && g.width && c && g.time === Af.time && !g.uncache) return rd(a / g.width * d);
	if (p && (n === "height" || n === "width")) {
		var v = t.style[n];
		t.style[n] = d + i, m = t[u], v ? t.style[n] = v : Em(t, n);
	} else (p || o === "%") && !km[vm(h, "display")] && (s.position = vm(t, "position")), h === t && (s.position = "static"), h.appendChild(Rp), m = Rp[u], h.removeChild(Rp), s.position = "absolute";
	return c && p && (g = ed(h), g.time = Af.time, g.width = h[u]), rd(f ? m * a / d : m && a ? d / m * a : 0);
}, jm = function(e, t, n, r) {
	var i;
	return Lp || xm(), t in Xp && t !== "transform" && (t = Xp[t], ~t.indexOf(",") && (t = t.split(",")[0])), Hp[t] && t !== "transform" ? (i = Um(e, r), i = t === "transformOrigin" ? i.svg ? i.origin : Wm(vm(e, dm)) + " " + i.zOrigin + "px" : i[t]) : (i = e.style[t], (!i || i === "auto" || r || ~(i + "").indexOf("calc(")) && (i = Im[t] && Im[t](e, t, n) || vm(e, t) || td(e, t) || +(t === "opacity"))), n && !~(i + "").trim().indexOf(" ") ? Am(e, t, i, n) + n : i;
}, Mm = function(e, t, n, r) {
	if (!n || n === "none") {
		var i = bm(t, e, 1), a = i && vm(e, i, 1);
		a && a !== n ? (t = i, n = a) : t === "borderColor" && (n = vm(e, "borderTopColor"));
	}
	var o = new yp(this._pt, e.style, t, 0, 1, pp), s = 0, c = 0, l, u, d, f, p, m, h, g, _, v, y, b;
	if (o.b = n, o.e = r, n += "", r += "", r.substring(0, 6) === "var(--" && (r = vm(e, r.substring(4, r.indexOf(")")))), r === "auto" && (m = e.style[t], e.style[t] = r, r = vm(e, t) || r, m ? e.style[t] = m : Em(e, t)), l = [n, r], Of(l), n = l[0], r = l[1], d = n.match(wu) || [], b = r.match(wu) || [], b.length) {
		for (; u = wu.exec(r);) h = u[0], _ = r.substring(s, u.index), p ? p = (p + 1) % 5 : (_.substr(-5) === "rgba(" || _.substr(-5) === "hsla(") && (p = 1), h !== (m = d[c++] || "") && (f = parseFloat(m) || 0, y = m.substr((f + "").length), h.charAt(1) === "=" && (h = ad(f, h) + y), g = parseFloat(h), v = h.substr((g + "").length), s = wu.lastIndex - v.length, v || (v = v || Zl.units[t] || y, s === r.length && (r += v, o.e += v)), y !== v && (f = Am(e, t, m, v) || 0), o._pt = {
			_next: o._pt,
			p: _ || c === 1 ? _ : ",",
			s: f,
			c: g - f,
			m: p && p < 4 || t === "zIndex" ? Math.round : 0
		});
		o.c = s < r.length ? r.substring(s, r.length) : "";
	} else o.r = t === "display" && r === "none" ? rm : nm;
	return Eu.test(r) && (o.e = 0), this._pt = o, o;
}, Nm = {
	top: "0%",
	bottom: "100%",
	left: "0%",
	right: "100%",
	center: "50%"
}, Pm = function(e) {
	var t = e.split(" "), n = t[0], r = t[1] || "50%";
	return (n === "top" || n === "bottom" || r === "left" || r === "right") && (e = n, n = r, r = e), t[0] = Nm[n] || n, t[1] = Nm[r] || r, t.join(" ");
}, Fm = function(e, t) {
	if (t.tween && t.tween._time === t.tween._dur) {
		var n = t.t, r = n.style, i = t.u, a = n._gsap, o, s, c;
		if (i === "all" || i === !0) r.cssText = "", s = 1;
		else for (i = i.split(","), c = i.length; --c > -1;) o = i[c], Hp[o] && (s = 1, o = o === "transformOrigin" ? dm : um), Em(n, o);
		s && (Em(n, um), a && (a.svg && n.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", Um(n, 1), a.uncache = 1, pm(r)));
	}
}, Im = { clearProps: function(e, t, n, r, i) {
	if (i.data !== "isFromStart") {
		var a = e._pt = new yp(e._pt, t, n, 0, 0, Fm);
		return a.u = r, a.pr = -10, a.tween = i, e._props.push(n), 1;
	}
} }, Lm = [
	1,
	0,
	0,
	1,
	0,
	0
], Rm = {}, zm = function(e) {
	return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Bm = function(e) {
	var t = vm(e, um);
	return zm(t) ? Lm : t.substr(7).match(Cu).map(rd);
}, Vm = function(e, t) {
	var n = e._gsap || ed(e), r = e.style, i = Bm(e), a, o, s, c;
	return n.svg && e.getAttribute("transform") ? (s = e.transform.baseVal.consolidate().matrix, i = [
		s.a,
		s.b,
		s.c,
		s.d,
		s.e,
		s.f
	], i.join(",") === "1,0,0,1,0,0" ? Lm : i) : (i === Lm && !e.offsetParent && e !== Ip && !n.svg && (s = r.display, r.display = "block", a = e.parentNode, (!a || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, o = e.nextElementSibling, Ip.appendChild(e)), i = Bm(e), s ? r.display = s : Em(e, "display"), c && (o ? a.insertBefore(e, o) : a ? a.appendChild(e) : Ip.removeChild(e))), t && i.length > 6 ? [
		i[0],
		i[1],
		i[4],
		i[5],
		i[12],
		i[13]
	] : i);
}, Hm = function(e, t, n, r, i, a) {
	var o = e._gsap, s = i || Vm(e, !0), c = o.xOrigin || 0, l = o.yOrigin || 0, u = o.xOffset || 0, d = o.yOffset || 0, f = s[0], p = s[1], m = s[2], h = s[3], g = s[4], _ = s[5], v = t.split(" "), y = parseFloat(v[0]) || 0, b = parseFloat(v[1]) || 0, x, S, C, w;
	n ? s !== Lm && (S = f * h - p * m) && (C = h / S * y + b * (-m / S) + (m * _ - h * g) / S, w = y * (-p / S) + f / S * b - (f * _ - p * g) / S, y = C, b = w) : (x = wm(e), y = x.x + (~v[0].indexOf("%") ? y / 100 * x.width : y), b = x.y + (~(v[1] || v[0]).indexOf("%") ? b / 100 * x.height : b)), r || r !== !1 && o.smooth ? (g = y - c, _ = b - l, o.xOffset = u + (g * f + _ * m) - g, o.yOffset = d + (g * p + _ * h) - _) : o.xOffset = o.yOffset = 0, o.xOrigin = y, o.yOrigin = b, o.smooth = !!r, o.origin = t, o.originIsAbsolute = !!n, e.style[dm] = "0px 0px", a && (Dm(a, o, "xOrigin", c, y), Dm(a, o, "yOrigin", l, b), Dm(a, o, "xOffset", u, o.xOffset), Dm(a, o, "yOffset", d, o.yOffset)), e.setAttribute("data-svg-origin", y + " " + b);
}, Um = function(e, t) {
	var n = e._gsap || new Uf(e);
	if ("x" in n && !t && !n.uncache) return n;
	var r = e.style, i = n.scaleX < 0, a = "px", o = "deg", s = getComputedStyle(e), c = vm(e, dm) || "0", l = u = d = m = h = g = _ = v = y = 0, u, d, f = p = 1, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z, B;
	return n.svg = !!(e.getCTM && Tm(e)), s.translate && ((s.translate !== "none" || s.scale !== "none" || s.rotate !== "none") && (r[um] = (s.translate === "none" ? "" : "translate3d(" + (s.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") ") + (s.rotate === "none" ? "" : "rotate(" + s.rotate + ") ") + (s.scale === "none" ? "" : "scale(" + s.scale.split(" ").join(",") + ") ") + (s[um] === "none" ? "" : s[um])), r.scale = r.rotate = r.translate = "none"), S = Vm(e, n.svg), n.svg && (n.uncache ? (N = e.getBBox(), c = n.xOrigin - N.x + "px " + (n.yOrigin - N.y) + "px", M = "") : M = !t && e.getAttribute("data-svg-origin"), Hm(e, M || c, !!M || n.originIsAbsolute, n.smooth !== !1, S)), b = n.xOrigin || 0, x = n.yOrigin || 0, S !== Lm && (E = S[0], D = S[1], O = S[2], k = S[3], l = A = S[4], u = j = S[5], S.length === 6 ? (f = Math.sqrt(E * E + D * D), p = Math.sqrt(k * k + O * O), m = E || D ? Gp(D, E) * Up : 0, _ = O || k ? Gp(O, k) * Up + m : 0, _ && (p *= Math.abs(Math.cos(_ * Wp))), n.svg && (l -= b - (b * E + x * O), u -= x - (b * D + x * k))) : (B = S[6], R = S[7], F = S[8], I = S[9], L = S[10], z = S[11], l = S[12], u = S[13], d = S[14], C = Gp(B, L), h = C * Up, C && (w = Math.cos(-C), T = Math.sin(-C), M = A * w + F * T, N = j * w + I * T, P = B * w + L * T, F = A * -T + F * w, I = j * -T + I * w, L = B * -T + L * w, z = R * -T + z * w, A = M, j = N, B = P), C = Gp(-O, L), g = C * Up, C && (w = Math.cos(-C), T = Math.sin(-C), M = E * w - F * T, N = D * w - I * T, P = O * w - L * T, z = k * T + z * w, E = M, D = N, O = P), C = Gp(D, E), m = C * Up, C && (w = Math.cos(C), T = Math.sin(C), M = E * w + D * T, N = A * w + j * T, D = D * w - E * T, j = j * w - A * T, E = M, A = N), h && Math.abs(h) + Math.abs(m) > 359.9 && (h = m = 0, g = 180 - g), f = rd(Math.sqrt(E * E + D * D + O * O)), p = rd(Math.sqrt(j * j + B * B)), C = Gp(A, j), _ = Math.abs(C) > 2e-4 ? C * Up : 0, y = z ? 1 / (z < 0 ? -z : z) : 0), n.svg && (M = e.getAttribute("transform"), n.forceCSS = e.setAttribute("transform", "") || !zm(vm(e, um)), M && e.setAttribute("transform", M))), Math.abs(_) > 90 && Math.abs(_) < 270 && (i ? (f *= -1, _ += m <= 0 ? 180 : -180, m += m <= 0 ? 180 : -180) : (p *= -1, _ += _ <= 0 ? 180 : -180)), t ||= n.uncache, n.x = l - ((n.xPercent = l && (!t && n.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-l) ? -50 : 0))) ? e.offsetWidth * n.xPercent / 100 : 0) + a, n.y = u - ((n.yPercent = u && (!t && n.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetHeight * n.yPercent / 100 : 0) + a, n.z = d + a, n.scaleX = rd(f), n.scaleY = rd(p), n.rotation = rd(m) + o, n.rotationX = rd(h) + o, n.rotationY = rd(g) + o, n.skewX = _ + o, n.skewY = v + o, n.transformPerspective = y + a, (n.zOrigin = parseFloat(c.split(" ")[2]) || !t && n.zOrigin || 0) && (r[dm] = Wm(c)), n.xOffset = n.yOffset = 0, n.force3D = Zl.force3D, n.renderTransform = n.svg ? Zm : gm ? Xm : Km, n.uncache = 0, n;
}, Wm = function(e) {
	return (e = e.split(" "))[0] + " " + e[1];
}, Gm = function(e, t, n) {
	var r = Kd(t);
	return rd(parseFloat(t) + parseFloat(Am(e, "x", n + "px", r))) + r;
}, Km = function(e, t) {
	t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Xm(e, t);
}, qm = "0deg", Jm = "0px", Ym = ") ", Xm = function(e, t) {
	var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.z, c = n.rotation, l = n.rotationY, u = n.rotationX, d = n.skewX, f = n.skewY, p = n.scaleX, m = n.scaleY, h = n.transformPerspective, g = n.force3D, _ = n.target, v = n.zOrigin, y = "", b = g === "auto" && e && e !== 1 || g === !0;
	if (v && (u !== qm || l !== qm)) {
		var x = parseFloat(l) * Wp, S = Math.sin(x), C = Math.cos(x), w;
		x = parseFloat(u) * Wp, w = Math.cos(x), a = Gm(_, a, S * w * -v), o = Gm(_, o, -Math.sin(x) * -v), s = Gm(_, s, C * w * -v + v);
	}
	h !== Jm && (y += "perspective(" + h + Ym), (r || i) && (y += "translate(" + r + "%, " + i + "%) "), (b || a !== Jm || o !== Jm || s !== Jm) && (y += s !== Jm || b ? "translate3d(" + a + ", " + o + ", " + s + ") " : "translate(" + a + ", " + o + Ym), c !== qm && (y += "rotate(" + c + Ym), l !== qm && (y += "rotateY(" + l + Ym), u !== qm && (y += "rotateX(" + u + Ym), (d !== qm || f !== qm) && (y += "skew(" + d + ", " + f + Ym), (p !== 1 || m !== 1) && (y += "scale(" + p + ", " + m + Ym), _.style[um] = y || "translate(0, 0)";
}, Zm = function(e, t) {
	var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.rotation, c = n.skewX, l = n.skewY, u = n.scaleX, d = n.scaleY, f = n.target, p = n.xOrigin, m = n.yOrigin, h = n.xOffset, g = n.yOffset, _ = n.forceCSS, v = parseFloat(a), y = parseFloat(o), b, x, S, C, w;
	s = parseFloat(s), c = parseFloat(c), l = parseFloat(l), l && (l = parseFloat(l), c += l, s += l), s || c ? (s *= Wp, c *= Wp, b = Math.cos(s) * u, x = Math.sin(s) * u, S = Math.sin(s - c) * -d, C = Math.cos(s - c) * d, c && (l *= Wp, w = Math.tan(c - l), w = Math.sqrt(1 + w * w), S *= w, C *= w, l && (w = Math.tan(l), w = Math.sqrt(1 + w * w), b *= w, x *= w)), b = rd(b), x = rd(x), S = rd(S), C = rd(C)) : (b = u, C = d, x = S = 0), (v && !~(a + "").indexOf("px") || y && !~(o + "").indexOf("px")) && (v = Am(f, "x", a, "px"), y = Am(f, "y", o, "px")), (p || m || h || g) && (v = rd(v + p - (p * b + m * S) + h), y = rd(y + m - (p * x + m * C) + g)), (r || i) && (w = f.getBBox(), v = rd(v + r / 100 * w.width), y = rd(y + i / 100 * w.height)), w = "matrix(" + b + "," + x + "," + S + "," + C + "," + v + "," + y + ")", f.setAttribute("transform", w), _ && (f.style[um] = w);
}, Qm = function(e, t, n, r, i) {
	var a = 360, o = uu(i), s = parseFloat(i) * (o && ~i.indexOf("rad") ? Up : 1) - r, c = r + s + "deg", l, u;
	return o && (l = i.split("_")[1], l === "short" && (s %= a, s !== s % (a / 2) && (s += s < 0 ? a : -a)), l === "cw" && s < 0 ? s = (s + a * Kp) % a - ~~(s / a) * a : l === "ccw" && s > 0 && (s = (s - a * Kp) % a - ~~(s / a) * a)), e._pt = u = new yp(e._pt, t, n, r, s, Qp), u.e = c, u.u = "deg", e._props.push(n), u;
}, $m = function(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}, eh = function(e, t, n) {
	var r = $m({}, n._gsap), i = "perspective,force3D,transformOrigin,svgOrigin", a = n.style, o, s, c, l, u, d, f, p;
	for (s in r.svg ? (c = n.getAttribute("transform"), n.setAttribute("transform", ""), a[um] = t, o = Um(n, 1), Em(n, um), n.setAttribute("transform", c)) : (c = getComputedStyle(n)[um], a[um] = t, o = Um(n, 1), a[um] = c), Hp) c = r[s], l = o[s], c !== l && i.indexOf(s) < 0 && (f = Kd(c), p = Kd(l), u = f === p ? parseFloat(c) : Am(n, s, c, p), d = parseFloat(l), e._pt = new yp(e._pt, o, s, u, d - u, Zp), e._pt.u = p || 0, e._props.push(s));
	$m(o, r);
};
nd("padding,margin,Width,Radius", function(e, t) {
	var n = "Top", r = "Right", i = "Bottom", a = "Left", o = (t < 3 ? [
		n,
		r,
		i,
		a
	] : [
		n + a,
		n + r,
		i + r,
		i + a
	]).map(function(n) {
		return t < 2 ? e + n : "border" + n + e;
	});
	Im[t > 1 ? "border" + e : e] = function(e, t, n, r, i) {
		var a, s;
		if (arguments.length < 4) return a = o.map(function(t) {
			return jm(e, t, n);
		}), s = a.join(" "), s.split(a[0]).length === 5 ? a[0] : s;
		a = (r + "").split(" "), s = {}, o.forEach(function(e, t) {
			return s[e] = a[t] = a[t] || a[(t - 1) / 2 | 0];
		}), e.init(t, s, i);
	};
});
var th = {
	name: "css",
	register: xm,
	targetTest: function(e) {
		return e.style && e.nodeType;
	},
	init: function(e, t, n, r, i) {
		var a = this._props, o = e.style, s = n.vars.startAt, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w;
		for (m in Lp || xm(), this.styles = this.styles || hm(e), C = this.styles.props, this.tween = n, t) if (m !== "autoRound" && (l = t[m], !(Ju[m] && Yf(m, t, n, r, e, i)))) {
			if (f = typeof l, p = Im[m], f === "function" && (l = l.call(n, r, e, i), f = typeof l), f === "string" && ~l.indexOf("random(") && (l = df(l)), p) p(this, e, m, l, n) && (S = 1);
			else if (m.substr(0, 2) === "--") c = (getComputedStyle(e).getPropertyValue(m) + "").trim(), l += "", Ef.lastIndex = 0, Ef.test(c) || (h = Kd(c), g = Kd(l), g ? h !== g && (c = Am(e, m, c, g) + g) : h && (l += h)), this.add(o, "setProperty", c, l, r, i, 0, 0, m), a.push(m), C.push(m, 0, o[m]);
			else if (f !== "undefined") {
				if (s && m in s ? (c = typeof s[m] == "function" ? s[m].call(n, r, e, i) : s[m], uu(c) && ~c.indexOf("random(") && (c = df(c)), Kd(c + "") || c === "auto" || (c += Zl.units[m] || Kd(jm(e, m)) || ""), (c + "").charAt(1) === "=" && (c = jm(e, m))) : c = jm(e, m), d = parseFloat(c), _ = f === "string" && l.charAt(1) === "=" && l.substr(0, 2), _ && (l = l.substr(2)), u = parseFloat(l), m in Xp && (m === "autoAlpha" && (d === 1 && jm(e, "visibility") === "hidden" && u && (d = 0), C.push("visibility", 0, o.visibility), Dm(this, o, "visibility", d ? "inherit" : "hidden", u ? "inherit" : "hidden", !u)), m !== "scale" && m !== "transform" && (m = Xp[m], ~m.indexOf(",") && (m = m.split(",")[0]))), v = m in Hp, v) {
					if (this.styles.save(m), w = l, f === "string" && l.substring(0, 6) === "var(--") {
						if (l = vm(e, l.substring(4, l.indexOf(")"))), l.substring(0, 5) === "calc(") {
							var T = e.style.perspective;
							e.style.perspective = l, l = vm(e, "perspective"), T ? e.style.perspective = T : Em(e, "perspective");
						}
						u = parseFloat(l);
					}
					if (y || (b = e._gsap, b.renderTransform && !t.parseTransform || Um(e, t.parseTransform), x = t.smoothOrigin !== !1 && b.smooth, y = this._pt = new yp(this._pt, o, um, 0, 1, b.renderTransform, b, 0, -1), y.dep = 1), m === "scale") this._pt = new yp(this._pt, b, "scaleY", b.scaleY, (_ ? ad(b.scaleY, _ + u) : u) - b.scaleY || 0, Zp), this._pt.u = 0, a.push("scaleY", m), m += "X";
					else if (m === "transformOrigin") {
						C.push(dm, 0, o[dm]), l = Pm(l), b.svg ? Hm(e, l, 0, x, 0, this) : (g = parseFloat(l.split(" ")[2]) || 0, g !== b.zOrigin && Dm(this, b, "zOrigin", b.zOrigin, g), Dm(this, o, m, Wm(c), Wm(l)));
						continue;
					} else if (m === "svgOrigin") {
						Hm(e, l, 1, x, 0, this);
						continue;
					} else if (m in Rm) {
						Qm(this, b, m, d, _ ? ad(d, _ + l) : l);
						continue;
					} else if (m === "smoothOrigin") {
						Dm(this, b, "smooth", b.smooth, l);
						continue;
					} else if (m === "force3D") {
						b[m] = l;
						continue;
					} else if (m === "transform") {
						eh(this, l, e);
						continue;
					}
				} else m in o || (m = bm(m) || m);
				if (v || (u || u === 0) && (d || d === 0) && !Yp.test(l) && m in o) h = (c + "").substr((d + "").length), u ||= 0, g = Kd(l) || (m in Zl.units ? Zl.units[m] : h), h !== g && (d = Am(e, m, c, g)), this._pt = new yp(this._pt, v ? b : o, m, d, (_ ? ad(d, _ + u) : u) - d, !v && (g === "px" || m === "zIndex") && t.autoRound !== !1 ? tm : Zp), this._pt.u = g || 0, v && w !== l ? (this._pt.b = c, this._pt.e = w, this._pt.r = em) : h !== g && g !== "%" && (this._pt.b = c, this._pt.r = $p);
				else if (m in o) Mm.call(this, e, m, c, _ ? _ + l : l);
				else if (m in e) this.add(e, m, c || e[m], _ ? _ + l : l, r, i);
				else if (m !== "parseTransform") {
					Lu(m, l);
					continue;
				}
				v || (m in o ? C.push(m, 0, o[m]) : typeof e[m] == "function" ? C.push(m, 2, e[m]()) : C.push(m, 1, c || e[m])), a.push(m);
			}
		}
		S && vp(this);
	},
	render: function(e, t) {
		if (t.tween._time || !Bp()) for (var n = t._pt; n;) n.r(e, n.d), n = n._next;
		else t.styles.revert();
	},
	get: jm,
	aliases: Xp,
	getSetter: function(e, t, n) {
		var r = Xp[t];
		return r && r.indexOf(",") < 0 && (t = r), t in Hp && t !== dm && (e._gsap.x || jm(e, "x")) ? n && zp === n ? t === "scale" ? sm : om : (zp = n || {}) && (t === "scale" ? cm : lm) : e.style && !pu(e.style[t]) ? im : ~t.indexOf("-") ? am : up(e, t);
	},
	core: {
		_removeProperty: Em,
		_getMatrix: Vm
	}
};
Np.utils.checkPrefix = bm, Np.core.getStyleSaver = hm, (function(e, t, n, r) {
	var i = nd(e + "," + t + "," + n, function(e) {
		Hp[e] = 1;
	});
	nd(t, function(e) {
		Zl.units[e] = "deg", Rm[e] = 1;
	}), Xp[i[13]] = e + "," + t, nd(r, function(e) {
		var t = e.split(":");
		Xp[t[1]] = i[t[0]];
	});
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"), nd("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(e) {
	Zl.units[e] = "px";
}), Np.registerPlugin(th);
//#endregion
//#region node_modules/gsap/index.js
var nh = Np.registerPlugin(th) || Np;
nh.core.Tween;
//#endregion
//#region src/components/TxtLayer.tsx
function rh({ cmn: { styChild: e, isDesignMode: t, sty4Moveable: n }, nm: r, str: i, b_alpha: a, aBtn: o, onActivate: s }) {
	let c = u((e) => e.isReadBack), l = u((e) => e.isTyping), f = u((e) => e.setIsTyping), p = u((e) => e.skipReq), m = u((e) => e.wait), g = (0, C.useRef)(null), _ = (0, C.useRef)(null), y = (0, C.useRef)([]), b = (0, C.useRef)(null);
	(0, C.useLayoutEffect)(() => {
		let e = _.current;
		if (!e) return;
		b.current?.kill();
		let t = y.current.map((e) => e.textContent === "\xA0" ? " " : e.textContent).join("");
		!t.startsWith(i) && !i.startsWith(t) && (y.current = [], e.textContent = "");
		let n = y.current, r = Math.min(i.length, n.length);
		for (; e.childNodes.length > r;) e.removeChild(e.lastChild);
		for (; e.childNodes.length < r;) e.appendChild(n[e.childNodes.length]);
		if (r > 0 && nh.set(n.slice(0, r), {
			opacity: 1,
			y: 0
		}), i.length <= n.length) {
			f(!1);
			return;
		}
		let a = i.slice(n.length), o = document.createDocumentFragment(), s = [...a].map((e) => {
			let t = document.createElement("span");
			return t.textContent = e === " " ? "\xA0" : e, o.appendChild(t), t;
		});
		if (n.push(...s), e.appendChild(o), c) {
			nh.set(s, {
				opacity: 1,
				y: 0
			}), f(!1);
			return;
		}
		f(!0), b.current = nh.timeline({ onComplete: () => f(!1) }).fromTo(s, {
			opacity: 0,
			y: "0.3em"
		}, {
			opacity: 1,
			y: 0,
			duration: .25,
			ease: "power1.out",
			stagger: .035
		});
	}, [i, c]), (0, C.useEffect)(() => {
		b.current && b.current.progress() < 1 && b.current.progress(1);
	}, [p]);
	let x = !c && !l && m !== null && m.nm === r, S = ql`
		display: inline-block;
		margin-left: 0.15em;
	`, w = ql`
		display: flex;
		flex-wrap: wrap;
		top: 70%;
	`, T = ql`
		padding: 1em 1.5em;
		margin: 2em 0;
		/* aquamarine相当のRGBに[lay b_alpha=...]をアルファチャンレベルで反映。
			要素全体のopacityではなく背景色のアルファのみを下げるので、子要素（文字）の透過度には影響しない */
		background-color: rgba(127, 255, 212, ${a});
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
		white-space: pre-wrap;
		color: ${c ? "yellow" : "inherit"};
	`, E = ql`
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
			font-size: xxx-large;
			line-height: 1.2;
			&:focus {
				border-color: #ff9900;
			}
		}
	`, [D, O] = (0, C.useState)("");
	(0, C.useEffect)(() => O(i), [i]);
	let k = (0, C.useRef)(null), A = (e, t) => {
		ch(), e.transform = t;
	};
	return /* @__PURE__ */ h(v, { children: [
		/* @__PURE__ */ h("span", {
			css: [e, T],
			ref: g,
			style: n,
			children: [/* @__PURE__ */ d("span", { ref: _ }), x && /* @__PURE__ */ d("span", {
				css: S,
				children: m.kind === "l" ? "🩷" : "✅"
			})]
		}),
		o.length > 0 && /* @__PURE__ */ d("span", {
			css: [e, w],
			children: o.map((e) => /* @__PURE__ */ d(Jl, {
				text: e.text,
				label: e.label,
				call: e.call ?? !1,
				fn: e.fn ?? "",
				onActivate: s
			}, e.nm))
		}),
		t && /* @__PURE__ */ d(Wl, {
			target: g,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => A(e, t),
			resizable: !0,
			keepRatio: !1,
			onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
				A(e, r), e.width = `${t}px`, e.height = `${n}px`;
			},
			rotatable: !0,
			throttleRotate: 0,
			startDragRotate: 0,
			throttleDragRotate: 0,
			rotationPosition: "top",
			onRotate: ({ target: { style: e }, drag: { transform: t } }) => A(e, t),
			originDraggable: !0,
			onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
				A(e, n), e.transformOrigin = t;
			}
		}),
		t && /* @__PURE__ */ h(v, { children: [/* @__PURE__ */ h("label", {
			css: E,
			ref: k,
			children: ["テキスト入力", /* @__PURE__ */ d("textarea", {
				rows: 3,
				value: D,
				onChange: (e) => O(e.target.value)
			})]
		}), /* @__PURE__ */ d(Wl, {
			target: k,
			origin: !1,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => A(e, t),
			preventDefault: !1
		})] })
	] });
}
//#endregion
//#region src/components/Stage.tsx
function ih({ arg: { sys: e, scrMng: t }, onClick: r, prev: i, next: a }) {
	let o = u((e) => e.aLay), s = u((e) => e.replace);
	class c extends n {
		nm = "Stage";
		restore() {
			s(this.stt);
		}
	}
	e.caretaker.update(() => new c(JSON.stringify(o)));
	let [l, f] = (0, C.useState)(oh());
	M(() => {
		function e() {
			f(oh());
		}
		return globalThis.addEventListener("resize", e), () => globalThis.removeEventListener("resize", e);
	});
	let { cvsScale: m } = ah(l), g = ql`
		position: relative;

		transform-origin: left top;
		transform: scale(${m});
	`, y = ql`position: absolute; top: 0; left: 0;`, b = ql`
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
	`, x = (0, C.useRef)(null);
	M(() => {
		let e = x.current;
		e.addEventListener("mousedown", () => sh = !1);
		let t = (e) => {
			e.preventDefault(), e.deltaY < 0 ? a() : i();
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	});
	let [S, w] = T(!1), E = j((e) => {
		e.stopPropagation(), p(), !sh && (w(), _(!S));
	}, {
		isPreventDefault: !0,
		delay: 300
	}), [D, k] = T(!1), A = O(x, D, { onClose: () => k(!1) }), N = { cmn: {
		sys: e,
		styChild: y,
		isDesignMode: S,
		sty4Moveable: {
			maxWidth: "auto",
			maxHeight: "auto",
			minWidth: "auto",
			minHeight: "auto",
			transform: "translate(0px, 0px) rotate(0deg)"
		}
	} };
	return /* @__PURE__ */ h("div", {
		css: g,
		onClick: r,
		...E,
		ref: x,
		children: [
			S && /* @__PURE__ */ h(v, { children: [
				/* @__PURE__ */ d("button", {
					onClick: () => k(),
					css: b,
					children: "FullScr"
				}),
				/* @__PURE__ */ d("button", {
					onClick: () => {},
					css: b,
					children: "Back"
				}),
				/* @__PURE__ */ d("button", {
					onClick: () => {},
					css: b,
					children: "Prev"
				})
			] }),
			/* @__PURE__ */ d("span", { children: A }),
			o.map((e) => e.cls === "grp" ? /* @__PURE__ */ d(Gl, {
				cmn: N.cmn,
				fn: e.fn,
				aFace: e.aFace
			}, e.nm) : /* @__PURE__ */ d(rh, {
				cmn: N.cmn,
				nm: e.nm,
				str: e.str,
				b_alpha: e.b_alpha,
				aBtn: e.aBtn,
				onActivate: (e, n, r) => t.jumpToLabelAndGo(e, n, r)
			}, e.nm))
		]
	});
}
function ah({ width: e, height: t }) {
	let n = 0, r = 0, i = 1;
	return S.stageW > e || S.stageH > t ? (S.stageW / S.stageH <= e / t ? (r = t, n = x(S.stageW / S.stageH * t)) : (n = e, r = x(S.stageH / S.stageW * e)), i = n / S.stageW) : (n = S.stageW, r = S.stageH, i = 1), {
		cvsScale: i,
		cvsWidth: n,
		cvsHeight: r
	};
}
function oh() {
	let { innerWidth: e, innerHeight: t } = globalThis;
	return {
		width: e,
		height: t
	};
}
var sh = !1, ch = () => {
	sh = !0;
};
//#endregion
export { ih as default, ch as noticeDrag };

//# sourceMappingURL=Stage.js.map