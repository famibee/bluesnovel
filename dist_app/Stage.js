import { r as e, t } from "./rolldown-runtime.js";
import { n, s as r, t as i } from "./CmnLib.js";
import { t as a } from "./react.js";
import { t as o } from "./FocusMng.js";
import { _ as s, a as c, c as l, d as u, f as d, g as f, h as p, i as m, l as h, m as g, o as _, u as v, useStore as y, v as b, y as x } from "./store.js";
import { a as S, c as C, d as w, f as T, i as E, l as D, m as O, modKeyName as k, n as A, o as j, p as M, r as N, s as P, setDesignMode as F, suppressClick as I, u as L } from "./Main.js";
import { a as R, i as z, n as B } from "./Sprite.js";
//#region node_modules/react-use/esm/useToggle.js
var V = /* @__PURE__ */ e(a()), H = function(e, t) {
	return typeof t == "boolean" ? t : !e;
}, ee = function(e) {
	return (0, V.useReducer)(H, e);
}, te = w ? V.useLayoutEffect : V.useEffect, ne = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
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
})))()), U = function(e, t, n) {
	n === void 0 && (n = {});
	var r = n.video, i = n.onClose, a = i === void 0 ? T : i, o = (0, V.useState)(t), s = o[0], c = o[1];
	return te(function() {
		if (t && e.current) {
			var n = function() {
				r?.current && M(r.current, "webkitendfullscreen", n), a();
			}, i = function() {
				if (ne.default.isEnabled) {
					var e = ne.default.isFullscreen;
					c(e), e || a();
				}
			};
			if (ne.default.isEnabled) {
				try {
					ne.default.request(e.current), c(!0);
				} catch (e) {
					a(e), c(!1);
				}
				ne.default.on("change", i);
			} else r && r.current && r.current.webkitEnterFullscreen ? (r.current.webkitEnterFullscreen(), O(r.current, "webkitendfullscreen", n), c(!0)) : (a(), c(!1));
			return function() {
				if (c(!1), ne.default.isEnabled) try {
					ne.default.off("change", i), ne.default.exit();
				} catch {}
				else r && r.current && r.current.webkitExitFullscreen && (M(r.current, "webkitendfullscreen", n), r.current.webkitExitFullscreen());
			};
		}
	}, [
		t,
		r,
		e
	]), s;
}, W = function(e) {
	return "touches" in e;
}, re = function(e) {
	W(e) && e.touches.length < 2 && e.preventDefault && e.preventDefault();
}, ie = function(e, t) {
	var n = t === void 0 ? {} : t, r = n.isPreventDefault, i = r === void 0 || r, a = n.delay, o = a === void 0 ? 300 : a, s = (0, V.useRef)(), c = (0, V.useRef)(), l = (0, V.useCallback)(function(t) {
		i && t.target && (O(t.target, "touchend", re, { passive: !1 }), c.current = t.target), s.current = setTimeout(function() {
			return e(t);
		}, o);
	}, [
		e,
		o,
		i
	]), u = (0, V.useCallback)(function() {
		s.current && clearTimeout(s.current), i && c.current && M(c.current, "touchend", re);
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
}, ae = function(e) {
	L(function() {
		e();
	});
};
//#endregion
//#region node_modules/@egjs/agent/dist/agent.esm.js
function oe(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return !0;
	return !1;
}
function se(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return e[r];
	return null;
}
function ce(e) {
	var t = e;
	if (t === void 0) {
		if (typeof navigator > "u" || !navigator) return "";
		t = navigator.userAgent || "";
	}
	return t.toLowerCase();
}
function le(e, t) {
	try {
		return new RegExp(e, "g").exec(t);
	} catch {
		return null;
	}
}
function ue() {
	if (typeof navigator > "u" || !navigator || !navigator.userAgentData) return !1;
	var e = navigator.userAgentData, t = e.brands || e.uaList;
	return !!(t && t.length);
}
function de(e, t) {
	var n = le("(" + e + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", t);
	return n ? n[3] : "";
}
function fe(e) {
	return e.replace(/_/g, ".");
}
function pe(e, t) {
	var n = null, r = "-1";
	return oe(e, function(e) {
		var i = le("(" + e.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", t);
		return !i || e.brand ? !1 : (n = e, r = i[3] || "-1", e.versionAlias ? r = e.versionAlias : e.versionTest && (r = de(e.versionTest.toLowerCase(), t) || r), r = fe(r), !0);
	}), {
		preset: n,
		version: r
	};
}
function me(e, t) {
	var n = {
		brand: "",
		version: "-1"
	};
	return oe(e, function(e) {
		var r = he(t, e);
		return r ? (n.brand = e.id, n.version = e.versionAlias || r.version, n.version !== "-1") : !1;
	}), n;
}
function he(e, t) {
	return se(e, function(e) {
		var n = e.brand;
		return le("" + t.test, n.toLowerCase());
	});
}
var ge = [
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
], _e = [
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
], ve = [{
	test: "applewebkit",
	id: "webkit",
	versionTest: "applewebkit|safari"
}], ye = [
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
], be = [
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
function xe(e) {
	return !!pe(ye, e).preset;
}
function Se(e) {
	var t = ce(e), n = !!/mobi/g.exec(t), r = {
		name: "unknown",
		version: "-1",
		majorVersion: -1,
		webview: xe(t),
		chromium: !1,
		chromiumVersion: "-1",
		webkit: !1,
		webkitVersion: "-1"
	}, i = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	}, a = pe(ge, t), o = a.preset, s = a.version, c = pe(be, t), l = c.preset, u = c.version, d = pe(_e, t);
	if (r.chromium = !!d.preset, r.chromiumVersion = d.version, !r.chromium) {
		var f = pe(ve, t);
		r.webkit = !!f.preset, r.webkitVersion = f.version;
	}
	return l && (i.name = l.id, i.version = u, i.majorVersion = parseInt(u, 10)), o && (r.name = o.id, r.version = s, r.webview && i.name === "ios" && r.name !== "safari" && (r.webview = !1)), r.majorVersion = parseInt(r.version, 10), {
		browser: r,
		os: i,
		isMobile: n,
		isHints: !1
	};
}
function Ce(e) {
	var t = navigator.userAgentData, n = (t.uaList || t.brands).slice(), r = e && e.fullVersionList, i = t.mobile || !1, a = n[0], o = (e && e.platform || t.platform || navigator.platform).toLowerCase(), s = {
		name: a.brand,
		version: a.version,
		majorVersion: -1,
		webkit: !1,
		webkitVersion: "-1",
		chromium: !1,
		chromiumVersion: "-1",
		webview: !!me(ye, n).brand || xe(ce())
	}, c = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	};
	s.webkit = !s.chromium && oe(ve, function(e) {
		return he(n, e);
	});
	var l = me(_e, n);
	if (s.chromium = !!l.brand, s.chromiumVersion = l.version || "-1", !s.chromium) {
		var u = me(ve, n);
		s.webkit = !!u.brand, s.webkitVersion = u.version || "-1";
	}
	var d = se(be, function(e) {
		return RegExp("" + e.test, "g").exec(o);
	});
	if (c.name = d ? d.id : "", e && (c.version = e.platformVersion || "-1"), r && r.length) {
		var f = me(ge, r);
		s.name = f.brand || s.name, s.version = f.version || s.version;
	} else {
		var p = me(ge, n);
		s.name = p.brand || s.name, s.version = p.brand && e ? e.uaFullVersion : p.version;
	}
	return s.webkit && (c.name = i ? "ios" : "mac"), c.name === "ios" && s.webview && (s.version = "-1"), c.version = fe(c.version), s.version = fe(s.version), c.majorVersion = parseInt(c.version, 10), s.majorVersion = parseInt(s.version, 10), {
		browser: s,
		os: c,
		isMobile: i,
		isHints: !0
	};
}
function we(e) {
	return e === void 0 && ue() ? Ce() : Se(e);
}
//#endregion
//#region node_modules/framework-utils/dist/utils.esm.js
function Te(e) {
	return [...arguments].slice(1).map(function(t) {
		return t.split(" ").map(function(t) {
			return t ? "" + e + t : "";
		}).join(" ");
	}).join(" ");
}
function Ee(e, t) {
	return t.replace(/([^}{]*){/gm, function(t, n) {
		return n.replace(/\.([^{,\s\d.]+)/g, "." + e + "$1") + "{";
	});
}
function De(e, t) {
	return function(n) {
		n && (e[t] = n);
	};
}
function Oe(e, t, n) {
	return function(r) {
		r && (e[t][n] = r);
	};
}
function ke(e, t) {
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
var Ae = "function", je = "string", Me = "number", Ne = "undefined", Pe = typeof window !== Ne, Fe = typeof document < "u" && document, Ie = [
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
], Le = 1e-7;
1 / Le;
var Re = {
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
function ze() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function Be(e, t, n, r) {
	return (e * r + t * n) / (n + r);
}
function Ve(e) {
	return typeof e === Ne;
}
function He(e) {
	return e && typeof e == "object";
}
function Ue(e) {
	return Array.isArray(e);
}
function We(e) {
	return typeof e === je;
}
function Ge(e) {
	return typeof e === Me;
}
function Ke(e) {
	return typeof e === Ae;
}
function qe(e, t) {
	return (t === "" || t == " ") && (e === "" || e == " ") || e === t;
}
function Je(e, t, n, r, i) {
	return Ye(e, t, n) ? n : Xe(e, t, n + 1, r, i);
}
function Ye(e, t, n) {
	if (!e.ignore) return null;
	var r = t.slice(Math.max(n - 3, 0), n + 3).join("");
	return new RegExp(e.ignore).exec(r);
}
function Xe(e, t, n, r, i) {
	for (var a = function(n) {
		var a = t[n].trim();
		if (a === e.close && !Ye(e, t, n)) return { value: n };
		var s = n, c = at(i, function(e) {
			return e.open === a;
		});
		if (c && (s = Je(c, t, n, r, i)), s === -1) return o = n, "break";
		n = s, o = n;
	}, o, s = n; s < r; ++s) {
		var c = a(s);
		if (s = o, typeof c == "object") return c.value;
		if (c === "break") break;
	}
	return -1;
}
function Ze(e, t) {
	var n = We(t) ? { separator: t } : t, r = n.separator, i = r === void 0 ? "," : r, a = n.isSeparateFirst, o = n.isSeparateOnlyOpenClose, s = n.isSeparateOpenClose, c = s === void 0 ? o : s, l = n.openCloseCharacters, u = l === void 0 ? Ie : l, d = u.map(function(e) {
		var t = e.open, n = e.close;
		return t === n ? t : t + "|" + n;
	}).join("|"), f = "(\\s*" + i + "\\s*|" + d + "|\\s+)", p = new RegExp(f, "g"), m = e.split(p).filter(function(e) {
		return e && e !== "undefined";
	}), h = m.length, g = [], _ = [];
	function v() {
		return _.length ? (g.push(_.join("")), _ = [], !0) : !1;
	}
	for (var y = function(t) {
		var n = m[t].trim(), r = t, s = at(u, function(e) {
			return e.open === n;
		}), l = at(u, function(e) {
			return e.close === n;
		});
		if (s) {
			if (r = Je(s, m, t, h, u), r !== -1 && c) return v() && a || (g.push(m.slice(t, r + 1).join("")), t = r, a) ? (b = t, "break") : (b = t, "continue");
		} else if (l && !Ye(l, m, t)) {
			var d = ze(u);
			return d.splice(u.indexOf(l), 1), { value: Ze(e, {
				separator: i,
				isSeparateFirst: a,
				isSeparateOnlyOpenClose: o,
				isSeparateOpenClose: c,
				openCloseCharacters: d
			}) };
		} else if (qe(n, i) && !o) return v(), a ? (b = t, "break") : (b = t, "continue");
		r === -1 && (r = h - 1), _.push(m.slice(t, r + 1).join("")), t = r, b = t;
	}, b, x = 0; x < h; ++x) {
		var S = y(x);
		if (x = b, typeof S == "object") return S.value;
		if (S === "break") break;
	}
	return _.length && g.push(_.join("")), g;
}
function Qe(e) {
	return Ze(e, "");
}
function $e(e) {
	return Ze(e, ",");
}
function et(e) {
	var t = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(e);
	return !t || t.length < 4 ? {} : {
		prefix: t[1],
		value: t[2],
		suffix: t[3]
	};
}
function tt(e) {
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
function nt(e, t) {
	return t === void 0 && (t = "-"), e.replace(/([a-z])([A-Z])/g, function(e, n, r) {
		return "" + n + t + r.toLowerCase();
	});
}
function rt() {
	return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function it(e, t, n) {
	n === void 0 && (n = -1);
	for (var r = e.length, i = 0; i < r; ++i) if (t(e[i], i, e)) return i;
	return n;
}
function at(e, t, n) {
	var r = it(e, t);
	return r > -1 ? e[r] : n;
}
var ot = /*#__PURE__*/ function() {
	var e = rt(), t = Pe && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
	return t ? t.bind(window) : function(t) {
		var n = rt();
		return setTimeout(function() {
			t(n - e);
		}, 1e3 / 60);
	};
}(), st = /*#__PURE__*/ function() {
	var e = Pe && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
	return e ? e.bind(window) : function(e) {
		clearTimeout(e);
	};
}();
function ct(e) {
	return Object.keys(e);
}
function lt(e, t) {
	var n = tt(e), r = n.value, i = n.unit;
	if (He(t)) {
		var a = t[i];
		if (a) {
			if (Ke(a)) return a(r);
			if (Re[i]) return Re[i](r, a);
		}
	} else if (i === "%") return r * t / 100;
	return Re[i] ? Re[i](r) : r;
}
function ut(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function dt(e, t, n, r) {
	return r === void 0 && (r = e[0] / e[1]), [[G(t[0], 1e-7), G(t[0] / r, 1e-7)], [G(t[1] * r, 1e-7), G(t[1], 1e-7)]].filter(function(e) {
		return e.every(function(e, r) {
			var i = t[r], a = G(i, 1e-7);
			return n ? e <= i || e <= a : e >= i || e >= a;
		});
	})[0] || e;
}
function ft(e, t, n, r) {
	if (!r) return e.map(function(e, r) {
		return ut(e, t[r], n[r]);
	});
	var i = e[0], a = e[1], o = r === !0 ? i / a : r, s = dt(e, t, !1, o), c = s[0], l = s[1], u = dt(e, n, !0, o), d = u[0], f = u[1];
	return i < c || a < l ? (i = c, a = l) : (i > d || a > f) && (i = d, a = f), [i, a];
}
function pt(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return n;
}
function mt(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return t ? n / t : 0;
}
function ht(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function gt(e) {
	return [0, 1].map(function(t) {
		return mt(e.map(function(e) {
			return e[t];
		}));
	});
}
function _t(e) {
	var t = gt(e), n = ht(t, e[0]), r = ht(t, e[1]);
	return n < r && r - n < Math.PI || n > r && r - n < -Math.PI ? 1 : -1;
}
function vt(e, t) {
	return Math.sqrt(((t ? t[0] : 0) - e[0]) ** 2 + ((t ? t[1] : 0) - e[1]) ** 2);
}
function G(e, t) {
	if (!t) return e;
	var n = 1 / t;
	return Math.round(e / t) / n;
}
function yt(e, t) {
	return e.forEach(function(n, r) {
		e[r] = G(e[r], t);
	}), e;
}
function bt(e) {
	for (var t = [], n = 0; n < e; ++n) t.push(n);
	return t;
}
function xt(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function St(e, t) {
	return e.classList ? e.classList.contains(t) : !!e.className.match(RegExp("(\\s|^)" + t + "(\\s|$)"));
}
function Ct(e, t) {
	e.classList ? e.classList.add(t) : e.className += " " + t;
}
function wt(e, t) {
	if (e.classList) e.classList.remove(t);
	else {
		var n = RegExp("(\\s|^)" + t + "(\\s|$)");
		e.className = e.className.replace(n, " ");
	}
}
function Tt(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Et(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
function Dt(e) {
	return e?.ownerDocument || Fe;
}
function Ot(e) {
	return Dt(e).documentElement;
}
function kt(e) {
	return Dt(e).body;
}
function At(e) {
	return e?.ownerDocument?.defaultView || window;
}
function jt(e) {
	return e && "postMessage" in e && "blur" in e && "self" in e;
}
function Mt(e) {
	return He(e) && e.nodeName && e.nodeType && "ownerDocument" in e;
}
//#endregion
//#region node_modules/@scena/matrix/dist/matrix.esm.js
function Nt(e, t, n, r, i, a) {
	for (var o = 0; o < i; ++o) {
		var s = n + o * i, c = r + o * i;
		e[s] += e[c] * a, t[s] += t[c] * a;
	}
}
function Pt(e, t, n, r, i) {
	for (var a = 0; a < i; ++a) {
		var o = n + a * i, s = r + a * i, c = e[o], l = t[o];
		e[o] = e[s], e[s] = c, t[o] = t[s], t[s] = l;
	}
}
function Ft(e, t, n, r, i) {
	for (var a = 0; a < r; ++a) {
		var o = n + a * r;
		e[o] /= i, t[o] /= i;
	}
}
function It(e, t, n) {
	n === void 0 && (n = Math.sqrt(e.length));
	for (var r = e.slice(), i = 0; i < n; ++i) r[i * n + t - 1] = 0, r[(t - 1) * n + i] = 0;
	return r[(t - 1) * (n + 1)] = 1, r;
}
function Lt(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = e.slice(), r = rn(t), i = 0; i < t; ++i) {
		var a = t * i + i;
		if (!G(n[a], 1e-7)) {
			for (var o = i + 1; o < t; ++o) if (n[t * i + o]) {
				Pt(n, r, i, o, t);
				break;
			}
		}
		if (!G(n[a], 1e-7)) return [];
		Ft(n, r, i, t, n[a]);
		for (var o = 0; o < t; ++o) {
			var s = o, c = n[o + i * t];
			!G(c, 1e-7) || i === o || Nt(n, r, s, i, t, -c);
		}
	}
	return r;
}
function Rt(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = 0; r < t; ++r) for (var i = 0; i < t; ++i) n[i * t + r] = e[t * r + i];
	return n;
}
function zt(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = e[t * t - 1], i = 0; i < t - 1; ++i) n[i] = e[t * (t - 1) + i] / r;
	return n[t - 1] = 0, n;
}
function Bt(e, t) {
	for (var n = rn(t), r = 0; r < t - 1; ++r) n[t * (t - 1) + r] = e[r] || 0;
	return n;
}
function Vt(e, t) {
	for (var n = e.slice(), r = e.length; r < t - 1; ++r) n[r] = 0;
	return n[t - 1] = 1, n;
}
function Ht(e, t, n) {
	if (t === void 0 && (t = Math.sqrt(e.length)), t === n) return e;
	for (var r = rn(n), i = Math.min(t, n), a = 0; a < i - 1; ++a) {
		for (var o = 0; o < i - 1; ++o) r[a * n + o] = e[a * t + o];
		r[(a + 1) * n - 1] = e[(a + 1) * t - 1], r[(n - 1) * n + a] = e[(t - 1) * t + a];
	}
	return r[n * n - 1] = e[t * t - 1], r;
}
function Ut(e) {
	var t = [...arguments].slice(1), n = rn(e);
	return t.forEach(function(t) {
		n = Wt(n, t, e);
	}), n;
}
function Wt(e, t, n) {
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
function Gt(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] + t[i];
	return r;
}
function K(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] - t[i];
	return r;
}
function Kt(e, t) {
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
function qt(e, t) {
	return t === void 0 && (t = e.length === 9), t ? [
		e[0],
		e[1],
		e[3],
		e[4],
		e[6],
		e[7]
	] : e;
}
function Jt(e, t, n) {
	n === void 0 && (n = t.length);
	var r = Wt(e, t, n), i = r[n - 1];
	return r.map(function(e) {
		return e / i;
	});
}
function Yt(e, t) {
	return Wt(e, [
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
function Xt(e, t) {
	return Wt(e, [
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
function Zt(e, t) {
	return Wt(e, nn(t, 4));
}
function Qt(e, t) {
	var n = t[0], r = n === void 0 ? 1 : n, i = t[1], a = i === void 0 ? 1 : i, o = t[2];
	return Wt(e, [
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
function $t(e, t) {
	return Jt(nn(t, 3), Vt(e, 3));
}
function en(e, t) {
	var n = t[0], r = n === void 0 ? 0 : n, i = t[1], a = i === void 0 ? 0 : i, o = t[2];
	return Wt(e, [
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
function tn(e, t) {
	return Wt(e, t, 4);
}
function nn(e, t) {
	var n = Math.cos(e), r = Math.sin(e), i = rn(t);
	return i[0] = n, i[1] = r, i[t] = -r, i[t + 1] = n, i;
}
function rn(e) {
	for (var t = e * e, n = [], r = 0; r < t; ++r) n[r] = r % (e + 1) ? 0 : 1;
	return n;
}
function an(e, t) {
	for (var n = rn(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[(t + 1) * i] = e[i];
	return n;
}
function on(e, t) {
	for (var n = rn(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[t * (t - 1) + i] = e[i];
	return n;
}
function sn(e, t, n, r, i, a, o, s) {
	var c = e[0], l = e[1], u = t[0], d = t[1], f = n[0], p = n[1], m = r[0], h = r[1], g = i[0], _ = i[1], v = a[0], y = a[1], b = o[0], x = o[1], S = s[0], C = s[1], w = Lt([
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
	var T = Wt(w, [
		g,
		_,
		v,
		y,
		b,
		x,
		S,
		C
	], 8);
	return T[8] = 1, Ht(Rt(T), 3, 4);
}
//#endregion
//#region node_modules/css-to-mat/dist/css-to-mat.esm.js
var cn = function() {
	return cn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, cn.apply(this, arguments);
};
function ln() {
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
function un(e, t) {
	return t === void 0 && (t = 0), fn(pn(e, t));
}
function dn(e, t) {
	var n = Jt(e, [
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
function fn(e) {
	var t = ln();
	return e.forEach(function(e) {
		var n = e.matrixFunction, r = e.functionValue;
		n && (t = n(t, r));
	}), t;
}
function pn(e, t) {
	return t === void 0 && (t = 0), (Ue(e) ? e : Qe(e)).map(function(e) {
		var n = et(e), r = n.prefix, i = n.value, a = null, o = r, s = "";
		if (r === "translate" || r === "translateX" || r === "translate3d") {
			var c = He(t) ? cn(cn({}, t), { "o%": t["%"] }) : {
				"%": t,
				"o%": t
			}, l = $e(i).map(function(e, n) {
				return c["%"] = n === 0 && "x%" in c ? t["x%"] : n === 1 && "y%" in c ? t["y%"] : t["o%"], lt(e, c);
			}), u = l[0], d = l[1], f = d === void 0 ? 0 : d, p = l[2], m = p === void 0 ? 0 : p;
			a = en, s = [
				u,
				f,
				m
			];
		} else if (r === "translateY") {
			var f = lt(i, He(t) ? cn({ "%": t["y%"] }, t) : { "%": t });
			a = en, s = [
				0,
				f,
				0
			];
		} else if (r === "translateZ") {
			var m = parseFloat(i);
			a = en, s = [
				0,
				0,
				m
			];
		} else if (r === "scale" || r === "scale3d") {
			var h = $e(i).map(function(e) {
				return parseFloat(e);
			}), g = h[0], _ = h[1], v = _ === void 0 ? g : _, y = h[2], b = y === void 0 ? 1 : y;
			a = Qt, s = [
				g,
				v,
				b
			];
		} else if (r === "scaleX") {
			var g = parseFloat(i);
			a = Qt, s = [
				g,
				1,
				1
			];
		} else if (r === "scaleY") {
			var v = parseFloat(i);
			a = Qt, s = [
				1,
				v,
				1
			];
		} else if (r === "scaleZ") {
			var b = parseFloat(i);
			a = Qt, s = [
				1,
				1,
				b
			];
		} else if (r === "rotate" || r === "rotateZ" || r === "rotateX" || r === "rotateY") {
			var x = tt(i), S = x.unit, C = x.value, w = S === "rad" ? C : C * Math.PI / 180;
			r === "rotate" || r === "rotateZ" ? (o = "rotateZ", a = Zt) : r === "rotateX" ? a = Yt : r === "rotateY" && (a = Xt), s = w;
		} else if (r === "matrix3d") a = tn, s = $e(i).map(function(e) {
			return parseFloat(e);
		});
		else if (r === "matrix") {
			var T = $e(i).map(function(e) {
				return parseFloat(e);
			});
			a = tn, s = [
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
var mn = /*#__PURE__*/ function() {
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
}(), hn = /*#__PURE__*/ function() {
	function e() {
		this.object = {};
	}
	var t = e.prototype;
	return t.get = function(e) {
		return this.object[e];
	}, t.set = function(e, t) {
		this.object[e] = t;
	}, e;
}(), gn = typeof Map == "function", _n = /*#__PURE__*/ function() {
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
function vn(e, t) {
	var n = [], r = [];
	return e.forEach(function(e) {
		var t = e[0], i = e[1], a = new _n();
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
var yn = /*#__PURE__*/ function() {
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
		var e = vn(this.changedBeforeAdded, this.fixed), t = this.changed, n = [];
		this.cacheOrdered = e.filter(function(e, r) {
			var i = e[0], a = e[1], o = t[r], s = o[0], c = o[1];
			if (i !== a) return n.push([s, c]), !0;
		}), this.cachePureChanged = n;
	}, e;
}();
function bn(e, t, n) {
	var r = gn ? Map : n ? hn : mn, i = n || function(e) {
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
	}), o.reverse(), new yn(e, t, a, o, h, s, f, p);
}
var xn = /*#__PURE__*/ function() {
	function e(e, t) {
		e === void 0 && (e = []), this.findKeyCallback = t, this.list = [].slice.call(e);
	}
	var t = e.prototype;
	return t.update = function(e) {
		var t = [].slice.call(e), n = bn(this.list, t, this.findKeyCallback);
		return this.list = t, n;
	}, e;
}(), Sn = function(e, t) {
	return Sn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Sn(e, t);
};
function Cn(e, t) {
	Sn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var wn = typeof Map == "function" ? void 0 : function() {
	var e = 0;
	return function(t) {
		return t.__DIFF_KEY__ ||= ++e;
	};
}(), Tn = /*#__PURE__*/ function(e) {
	Cn(t, e);
	function t(t) {
		return t === void 0 && (t = []), e.call(this, t, wn) || this;
	}
	return t;
}(xn);
function En(e, t) {
	return bn(e, t, wn);
}
//#endregion
//#region node_modules/@scena/event-emitter/dist/event-emitter.esm.js
var Dn = function() {
	return Dn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Dn.apply(this, arguments);
};
function On() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
var kn = /*#__PURE__*/ function() {
	function e() {
		this._events = {};
	}
	var t = e.prototype;
	return t.on = function(e, t) {
		if (He(e)) for (var n in e) this.on(n, e[n]);
		else this._addEvent(e, t, {});
		return this;
	}, t.off = function(e, t) {
		if (!e) this._events = {};
		else if (He(e)) for (var n in e) this.off(n);
		else if (!t) this._events[e] = [];
		else {
			var r = this._events[e];
			if (r) {
				var i = it(r, function(e) {
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
		}, t.currentTarget = this, On(r).forEach(function(r) {
			r.listener(t), r.once && n.off(e, r.listener);
		}), !i;
	}, t.trigger = function(e, t) {
		return t === void 0 && (t = {}), this.emit(e, t);
	}, t._addEvent = function(e, t, n) {
		var r = this._events;
		r[e] = r[e] || [], r[e].push(Dn({ listener: t }, n));
	}, e;
}(), An = function(e, t) {
	return An = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, An(e, t);
};
function jn(e, t) {
	An(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Mn = function() {
	return Mn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Mn.apply(this, arguments);
};
function Nn(e) {
	var t = e.container;
	return t === document.body ? [t.scrollLeft || document.documentElement.scrollLeft, t.scrollTop || document.documentElement.scrollTop] : [t.scrollLeft, t.scrollTop];
}
function Pn(e, t) {
	return e.addEventListener("scroll", t), function() {
		e.removeEventListener("scroll", t);
	};
}
function Fn(e) {
	if (!e) return null;
	if (We(e)) return document.querySelector(e);
	if (Ke(e)) return e();
	if (e instanceof Element) return e;
	if ("current" in e) return e.current;
	if ("value" in e) return e.value;
}
var In = /*#__PURE__*/ function(e) {
	jn(t, e);
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
		var n = Fn(t.container);
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
			return s.top > r - a ? (c[1] > s.top || r < c[1]) && (l[1] = -1) : s.top + s.height < r + a && (c[1] < s.top + s.height || r > c[1]) && (l[1] = 1), s.left > n - a ? (c[0] > s.left || n < c[0]) && (l[0] = -1) : s.left + s.width < n + a && (c[0] < s.left + s.width || n > c[0]) && (l[0] = 1), !l[0] && !l[1] ? !1 : this._continueDrag(Mn(Mn({}, t), {
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
		return (r === void 0 ? Nn : r)({
			container: Fn(n),
			direction: e
		});
	}, n._continueDrag = function(e) {
		var t = this, n, r = e.container, i = e.direction, a = e.throttleTime, o = e.useScroll, s = e.isDrag, c = e.inputEvent;
		if (!(!this._flag || s && this._isWait)) {
			var l = rt(), u = Math.max(a + this._prevTime - l, 0);
			if (u > 0) return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
				t._continueDrag(e);
			}, u), !1;
			this._prevTime = l;
			var d = this._getScrollPosition(i, e);
			this._prevScrollPos = d, s && (this._isWait = !0), o || (this._lock = !0);
			var f = {
				container: Fn(r),
				direction: i,
				inputEvent: c
			};
			return (n = e.requestScroll) == null || n.call(e, f), this.emit("scroll", f), this._isWait = !1, o || this.checkScroll(Mn(Mn({}, e), {
				prevScrollPos: d,
				direction: i,
				inputEvent: c
			}));
		}
	}, n._registerScrollEvent = function(e) {
		this._unregisterScrollEvent();
		var t = e.checkScrollEvent;
		if (t) {
			var n = t === !0 ? Pn : t, r = Fn(e.container);
			this._unregister = t === !0 && (r === document.body || r === document.documentElement) ? Pn(window, this._onScroll) : n(r, this._onScroll);
		}
	}, n._unregisterScrollEvent = function() {
		var e;
		(e = this._unregister) == null || e.call(this), this._unregister = null;
	}, t;
}(kn);
//#endregion
//#region node_modules/overlap-area/dist/overlap-area.esm.js
function Ln() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function Rn(e) {
	return G(e, Le);
}
function zn(e, t) {
	return e.every(function(e, n) {
		return Rn(e - t[n]) === 0;
	});
}
function Bn(e, t) {
	return !Rn(e[0] - t[0]) && !Rn(e[1] - t[1]);
}
function Vn(e) {
	return e.length < 3 ? 0 : Math.abs(pt(e.map(function(t, n) {
		var r = e[n + 1] || e[0];
		return t[0] * r[1] - r[0] * t[1];
	}))) / 2;
}
function Hn(e, t) {
	var n = t.width, r = t.height, i = t.left, a = t.top, o = Un(e), s = o.minX, c = o.minY, l = o.maxX, u = o.maxY, d = n / (l - s), f = r / (u - c);
	return e.map(function(e) {
		return [i + (e[0] - s) * d, a + (e[1] - c) * f];
	});
}
function Un(e) {
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
function Wn(e, t, n) {
	var r = e[0], i = e[1], a = Un(t), o = a.minX, s = a.maxX, c = [[o, i], [s, i]], l = Gn(c[0], c[1]), u = Jn(t), d = [];
	if (u.forEach(function(t) {
		var n = Gn(t[0], t[1]), r = t[0];
		zn(l, n) ? d.push({
			pos: e,
			line: t,
			type: "line"
		}) : qn(Kn(l, n), [c, t]).forEach(function(e) {
			t.some(function(t) {
				return Bn(t, e);
			}) ? d.push({
				pos: e,
				line: t,
				type: "point"
			}) : Rn(r[1] - i) !== 0 && d.push({
				pos: e,
				line: t,
				type: "intersection"
			});
		});
	}), !n && at(d, function(e) {
		return e[0] === r;
	})) return !0;
	var f = 0, p = {};
	return d.forEach(function(e) {
		var t = e.pos, n = e.type, a = e.line;
		if (!(t[0] > r)) {
			if (n === "intersection") ++f;
			else if (n === "line") return;
			else if (n === "point") {
				var o = at(a, function(e) {
					return e[1] !== i;
				}), s = p[t[0]], c = o[1] > i ? 1 : -1;
				s ? s !== c && ++f : p[t[0]] = c;
			}
		}
	}), f % 2 == 1;
}
function Gn(e, t) {
	var n = e[0], r = e[1], i = t[0], a = t[1], o = i - n, s = a - r;
	Math.abs(o) < 1e-7 && (o = 0), Math.abs(s) < 1e-7 && (s = 0);
	var c = 0, l = 0, u = 0;
	return o ? s ? (c = -s / o, l = 1, u = -c * n - r) : (l = 1, u = -r) : s && (c = -1, u = n), [
		c,
		l,
		u
	];
}
function Kn(e, t) {
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
function qn(e, t) {
	var n = t.map(function(e) {
		return [0, 1].map(function(t) {
			return [Math.min(e[0][t], e[1][t]), Math.max(e[0][t], e[1][t])];
		});
	}), r = [];
	if (e.length === 2) {
		var i = e[0], a = i[0], o = i[1];
		if (!Rn(a - e[1][0])) {
			var s = Math.max.apply(Math, n.map(function(e) {
				return e[1][0];
			})), c = Math.min.apply(Math, n.map(function(e) {
				return e[1][1];
			}));
			if (Rn(s - c) > 0) return [];
			r = [[a, s], [a, c]];
		} else if (!Rn(o - e[1][1])) {
			var l = Math.max.apply(Math, n.map(function(e) {
				return e[0][0];
			})), u = Math.min.apply(Math, n.map(function(e) {
				return e[0][1];
			}));
			if (Rn(l - u) > 0) return [];
			r = [[l, o], [u, o]];
		}
	}
	return r.length || (r = e.filter(function(e) {
		var t = e[0], r = e[1];
		return n.every(function(e) {
			return 0 <= Rn(t - e[0][0]) && 0 <= Rn(e[0][1] - t) && 0 <= Rn(r - e[1][0]) && 0 <= Rn(e[1][1] - r);
		});
	})), r.map(function(e) {
		return [Rn(e[0]), Rn(e[1])];
	});
}
function Jn(e) {
	return Ln(e.slice(1), [e[0]]).map(function(t, n) {
		return [e[n], t];
	});
}
function Yn(e, t) {
	var n = e.slice(), r = t.slice();
	_t(n) === -1 && n.reverse(), _t(r) === -1 && r.reverse();
	var i = Jn(n), a = Jn(r), o = i.map(function(e) {
		return Gn(e[0], e[1]);
	}), s = a.map(function(e) {
		return Gn(e[0], e[1]);
	}), c = [];
	o.forEach(function(e, t) {
		var n = i[t], o = [];
		s.forEach(function(r, i) {
			var s = qn(Kn(e, r), [n, a[i]]);
			o.push.apply(o, s.map(function(e) {
				return {
					index1: t,
					index2: i,
					pos: e,
					type: "intersection"
				};
			}));
		}), o.sort(function(e, t) {
			return vt(n[0], e.pos) - vt(n[0], t.pos);
		}), c.push.apply(c, o), Wn(n[1], r) && c.push({
			index1: t,
			index2: -1,
			pos: n[1],
			type: "inside"
		});
	}), a.forEach(function(e, t) {
		if (Wn(e[1], n)) {
			var r = !1, i = it(c, function(e) {
				return e.index2 === t ? (r = !0, !1) : !!r;
			});
			i === -1 && (r = !1, i = it(c, function(e) {
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
function Xn(e, t) {
	return Yn(e, t).map(function(e) {
		return e.pos;
	});
}
function Zn(e, t) {
	return Vn(Xn(e, t));
}
//#endregion
//#region node_modules/gesto/dist/gesto.esm.js
var Qn = function(e, t) {
	return Qn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Qn(e, t);
};
function $n(e, t) {
	Qn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var er = function() {
	return er = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, er.apply(this, arguments);
};
function tr(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function nr(e) {
	return tr([e[0].clientX, e[0].clientY], [e[1].clientX, e[1].clientY]) / Math.PI * 180;
}
function rr(e) {
	return e.touches && e.touches.length >= 2;
}
function ir(e) {
	return e ? e.touches ? cr(e.touches) : [lr(e)] : [];
}
function ar(e) {
	return e && (e.type.indexOf("mouse") > -1 || "button" in e);
}
function or(e, t, n) {
	var r = n.length, i = ur(e, r), a = i.clientX, o = i.clientY, s = i.originalClientX, c = i.originalClientY, l = ur(t, r), u = l.clientX, d = l.clientY, f = ur(n, r), p = f.clientX, m = f.clientY;
	return {
		clientX: s,
		clientY: c,
		deltaX: a - u,
		deltaY: o - d,
		distX: a - p,
		distY: o - m
	};
}
function sr(e) {
	return Math.sqrt((e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2);
}
function cr(e) {
	for (var t = Math.min(e.length, 2), n = [], r = 0; r < t; ++r) n.push(lr(e[r]));
	return n;
}
function lr(e) {
	return {
		clientX: e.clientX,
		clientY: e.clientY
	};
}
function ur(e, t) {
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
var dr = /* @__PURE__ */ function() {
	function e(e) {
		this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = e, this.prevClients = e, this.length = e.length;
	}
	return e.prototype.getAngle = function(e) {
		return e === void 0 && (e = this.prevClients), nr(e);
	}, e.prototype.getRotation = function(e) {
		return e === void 0 && (e = this.prevClients), nr(e) - nr(this.startClients);
	}, e.prototype.getPosition = function(e, t) {
		e === void 0 && (e = this.prevClients);
		var n = or(e || this.prevClients, this.prevClients, this.startClients), r = n.deltaX, i = n.deltaY;
		return this.movement += Math.sqrt(r * r + i * i), this.prevClients = e, n;
	}, e.prototype.getPositions = function(e) {
		e === void 0 && (e = this.prevClients);
		for (var t = this.prevClients, n = this.startClients, r = Math.min(this.length, t.length), i = [], a = 0; a < r; ++a) i[a] = or([e[a]], [t[a]], [n[a]]);
		return i;
	}, e.prototype.getMovement = function(e) {
		var t = this.movement;
		if (!e) return t;
		var n = ur(e, this.length), r = ur(this.prevClients, this.length), i = n.clientX - r.clientX, a = n.clientY - r.clientY;
		return Math.sqrt(i * i + a * a) + t;
	}, e.prototype.getDistance = function(e) {
		return e === void 0 && (e = this.prevClients), sr(e);
	}, e.prototype.getScale = function(e) {
		return e === void 0 && (e = this.prevClients), sr(e) / sr(this.startClients);
	}, e.prototype.move = function(e, t) {
		this.startClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		}), this.prevClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		});
	}, e;
}(), fr = ["textarea", "input"], pr = /* @__PURE__ */ function(e) {
	$n(t, e);
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
							var y = v.tagName.toLowerCase(), b = fr.indexOf(y) > -1, x = v.isContentEditable;
							if (b || x) {
								if (u || !d && _ === v) return !1;
								if (_ && (_ === v || x && _.isContentEditable && _.contains(v))) {
									if (d) v.blur();
									else return !1;
								}
							} else if ((l || e.type === "touchstart") && _) {
								var S = _.tagName.toLowerCase();
								(_.isContentEditable || fr.indexOf(S) > -1) && _.blur();
							}
							(f || p || m) && Tt(r._window, "click", r._onClick, !0);
						}
						r.clientStores = [new dr(ir(e))], r._isIdle = !1, r.flag = !0, r.isDrag = !1, r._isTrusted = t, r._dragFlag = !0, r._prevInputEvent = e, r.data = {}, r.doubleFlag = rt() - r.prevTime < 200, r._isMouseEvent = ar(e), !r._isMouseEvent && r._preventMouseEvent && r._allowMouseEvent(), (r._preventMouseEvent || r.emit("dragStart", er(er({
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
						Tt(a, "touchstart", r.onDragStart, { passive: !1 });
					}))) : h && o && Et(a, "touchstart", r.onDragStart), r.flag && rr(e)) {
						if (clearTimeout(C), g && e.touches.length !== e.changedTouches.length) return;
						r.pinchFlag || r.onPinchStart(e);
					}
				}
			}
		}, r.onDrag = function(e, t) {
			if (r.flag) {
				var n = r.options.preventDefault;
				!r._isMouseEvent && n && e.preventDefault(), r._prevInputEvent = e;
				var i = ir(e), a = r.moveClients(i, e, !1);
				if (r._dragFlag) {
					if ((r.pinchFlag || a.deltaX || a.deltaY) && (r._preventMouseEvent || r.emit("drag", er(er({}, a), {
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
				}), !s && !o && a && !c && r._allowClickEvent(), r._useTouch && n && Et(i, "touchstart", r.onDragStart), r.pinchFlag && r.onPinchEnd(e);
				var l = e?.touches ? ir(e) : [];
				l.length === 0 || !r.options.keepDragging ? r.flag = !1 : r._addStore(new dr(l));
				var u = r._getPosition(), d = rt(), f = !c && r.doubleFlag;
				r._prevInputEvent = null, r.prevTime = c || f ? 0 : d, r.flag || (r._dettachDragEvent(), r._preventMouseEvent || r.emit("dragEnd", er({
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
			Et(r._window, "click", r._onClick, !0);
		}, r._onClick = function(e) {
			r._allowClickEvent(), r._allowMouseEvent();
			var t = r.options.preventClickEventByCondition;
			t?.(e) || (e.stopPropagation(), e.preventDefault());
		}, r._onContextMenu = function(e) {
			r.options.preventRightClick ? r.onDragEnd(e) : e.preventDefault();
		}, r._passCallback = function() {};
		var i = [].concat(t), a = i[0];
		r._window = jt(a) ? a : At(a), r.options = er({
			checkInput: !1,
			container: a && !("document" in a) ? At(a) : a,
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
			Tt(e, "dragstart", r.onDragStart);
		}), r._useMouse && (i.forEach(function(e) {
			Tt(e, "mousedown", r.onDragStart), Tt(e, "mousemove", r._passCallback);
		}), Tt(s, "contextmenu", r._onContextMenu)), l && Tt(At(), "blur", r.onBlur), r._useTouch) {
			var u = { passive: !1 };
			i.forEach(function(e) {
				Tt(e, "touchstart", r.onDragStart, u), Tt(e, "touchmove", r._passCallback, u);
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
		return e === void 0 && (e = this._prevInputEvent), er(er({
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
		this.off(), Et(this._window, "blur", this.onBlur), this._useDrag && t.forEach(function(t) {
			Et(t, "dragstart", e.onDragStart);
		}), this._useMouse && (t.forEach(function(t) {
			Et(t, "mousedown", e.onDragStart);
		}), Et(n, "contextmenu", this._onContextMenu)), this._useTouch && (t.forEach(function(t) {
			Et(t, "touchstart", e.onDragStart);
		}), Et(n, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
	}, t.prototype.onPinchStart = function(e) {
		var t = this, n = this.options.pinchThreshold;
		if (!(this.isDrag && this.getMovement() > n)) {
			var r = new dr(ir(e));
			this.pinchFlag = !0, this._addStore(r), this.emit("pinchStart", er(er({
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
			this.isPinch = !0, this.emit("pinch", er(er({
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
			this.emit("pinchEnd", er(er({
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
		return !i && this.isDrag && (a = !0), er(er({
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
		return er(er({}, n), {
			distX: i,
			distY: a
		});
	}, t.prototype._attchDragEvent = function() {
		var e = this._window, t = this.options.container, n = { passive: !1 };
		this._isDragAPI && (Tt(t, "dragover", this.onDrag, n), Tt(e, "dragend", this.onDragEnd)), this._useMouse && (Tt(t, "mousemove", this.onDrag), Tt(e, "mouseup", this.onDragEnd)), this._useTouch && (Tt(t, "touchmove", this.onDrag, n), Tt(e, "touchend", this.onDragEnd, n), Tt(e, "touchcancel", this.onDragEnd, n));
	}, t.prototype._dettachDragEvent = function() {
		var e = this._window, t = this.options.container;
		this._isDragAPI && (Et(t, "dragover", this.onDrag), Et(e, "dragend", this.onDragEnd)), this._useMouse && (Et(t, "mousemove", this.onDrag), Et(e, "mouseup", this.onDragEnd)), this._useTouch && (Et(t, "touchstart", this.onDragStart), Et(t, "touchmove", this.onDrag), Et(e, "touchend", this.onDragEnd), Et(e, "touchcancel", this.onDragEnd));
	}, t.prototype._allowMouseEvent = function() {
		this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
	}, t;
}(kn);
//#endregion
//#region node_modules/css-styled/dist/styled.esm.js
function mr(e) {
	for (var t = 5381, n = e.length; n;) t = t * 33 ^ e.charCodeAt(--n);
	return t >>> 0;
}
var hr = mr;
function gr(e) {
	return hr(e).toString(36);
}
function _r(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function vr(e, t, n) {
	return n.original ? t : t.replace(/([^};{\s}][^};{]*|^\s*){/gm, function(t, n) {
		var r = n.trim();
		return (r ? $e(r) : [""]).map(function(t) {
			var n = t.trim();
			return n.indexOf("@") === 0 ? n : n.indexOf(":global") > -1 ? n.replace(/\:global/g, "") : n.indexOf(":host") > -1 ? `${n.replace(/\:host/g, `.${e}`)}` : n ? `.${e} ${n}` : `.${e}`;
		}).join(", ") + " {";
	});
}
function yr(e, t, n, r, i) {
	var a = Dt(r), o = a.createElement("style");
	return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", e), o.setAttribute("data-styled-count", "1"), n.nonce && o.setAttribute("nonce", n.nonce), o.innerHTML = vr(e, t, n), (i || a.head || a.body).appendChild(o), o;
}
function br(e) {
	var t = "rCS" + gr(e);
	return {
		className: t,
		inject: function(n, r) {
			r === void 0 && (r = {});
			var i = _r(n), a = (i || n.ownerDocument || document).querySelector(`style[data-styled-id="${t}"]`);
			if (!a) a = yr(t, e, r, n, i);
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
var xr = function() {
	return xr = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, xr.apply(this, arguments);
};
function Sr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Cr(e, t) {
	var n = br(t), r = n.className;
	return (0, V.forwardRef)(function(t, i) {
		var a = t.className, o = a === void 0 ? "" : a;
		t.cspNonce;
		var s = Sr(t, ["className", "cspNonce"]), c = (0, V.useRef)();
		return (0, V.useImperativeHandle)(i, function() {
			return c.current;
		}, []), (0, V.useEffect)(function() {
			var e = n.inject(c.current, { nonce: t.cspNonce });
			return function() {
				e.destroy();
			};
		}, []), (0, V.createElement)(e, xr({
			ref: c,
			"data-styled-id": r,
			className: `${o} ${r}`
		}, s));
	});
}
//#endregion
//#region node_modules/react-moveable/dist/moveable.esm.js
var wr = function(e, t) {
	return wr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, wr(e, t);
};
function Tr(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	wr(e, t);
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
function Er(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Dr(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
function Or(e) {
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
function kr(e, t) {
	return q({
		events: [],
		props: [],
		name: e
	}, t);
}
var Ar = [
	"n",
	"w",
	"s",
	"e"
], jr = [
	"n",
	"w",
	"s",
	"e",
	"nw",
	"ne",
	"sw",
	"se"
];
function Mr(e, t) {
	return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${32 * e}px" height="${32 * e}px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${t}deg);transform-origin: 16px 16px"></path></svg>`;
}
function Nr(e) {
	var t = Mr(1, e), n = Math.round(e / 45) * 45 % 180, r = "ns-resize";
	return n === 135 ? r = "nwse-resize" : n === 45 ? r = "nesw-resize" : n === 90 && (r = "ew-resize"), `cursor:${r};cursor: url('${t}') 16 16, ${r};`;
}
var Pr = we(), Fr = Pr.browser.webkit, Ir = Fr && (function() {
	var e = typeof window > "u" ? { userAgent: "" } : window.navigator, t = /applewebkit\/([^\s]+)/g.exec(e.userAgent.toLowerCase());
	return t ? parseFloat(t[1]) < 605 : !1;
})(), Lr = Pr.browser.name, Rr = parseInt(Pr.browser.version, 10), zr = Lr === "chrome", Br = Pr.browser.chromium, Vr = parseInt(Pr.browser.chromiumVersion, 10) || 0, Hr = zr && Rr >= 109 || Br && Vr >= 109, Ur = Lr === "firefox", Wr = parseInt(Pr.browser.webkitVersion, 10) >= 612 || Rr >= 15, Gr = "moveable-", Kr = `
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
${jr.map(function(e) {
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
${Nr(e)}
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

${Ir ? ":global svg *:before {\ncontent:\"\";\ntransform-origin: inherit;\n}" : ""}
`, qr = [
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
], Jr = 1e-4, Yr = 1e-7, Xr = 1e-9, Zr = 10 ** 10, Qr = -Zr, $r = {
	n: [0, -1],
	e: [1, 0],
	s: [0, 1],
	w: [-1, 0],
	nw: [-1, -1],
	ne: [1, -1],
	sw: [-1, 1],
	se: [1, 1]
}, ei = {
	n: [0, 1],
	e: [1, 3],
	s: [3, 2],
	w: [2, 0],
	nw: [0],
	ne: [1],
	sw: [2],
	se: [3]
}, ti = {
	n: 0,
	s: 180,
	w: 270,
	e: 90,
	nw: 315,
	ne: 45,
	sw: 225,
	se: 135
}, ni = [
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
function ri(e, t, n, r, i, a) {
	a === void 0 && (a = "draggable");
	var o = t.gestos[a]?.move(n, e.inputEvent) ?? {}, s = o.originalDatas || o.datas, c = s[a] || (s[a] = {});
	return q(q({}, i ? pc(t, o) : o), {
		isPinch: !!r,
		parentEvent: !0,
		datas: c,
		originalDatas: e.originalDatas
	});
}
var ii = /* @__PURE__ */ function() {
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
function ai(e, t, n, r) {
	var i = e.length === 16 ? 4 : 3, a = J(js(e, n, r, i), 4), o = J(a[0], 2), s = o[0], c = o[1], l = J(a[1], 2), u = l[0], d = l[1], f = J(a[2], 2), p = f[0], m = f[1], h = J(a[3], 2), g = h[0], _ = h[1], v = J(As(e, t, i), 2), y = v[0], b = v[1], x = Math.min(s, u, p, g), S = Math.min(c, d, m, _), C = Math.max(s, u, p, g), w = Math.max(c, d, m, _);
	s = s - x || 0, u = u - x || 0, p = p - x || 0, g = g - x || 0, c = c - S || 0, d = d - S || 0, m = m - S || 0, _ = _ - S || 0, y = y - x || 0, b = b - S || 0;
	var T = e[0], E = e[i + 1], D = Mc(T * E);
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
function oi(e, t) {
	var n = t.clientX, r = t.clientY, i = t.datas, a = e.state, o = a.moveableClientRect, s = a.rootMatrix, c = a.is3d, l = a.pos1, u = o.left, d = o.top, f = c ? 4 : 3, p = J(K(fc(s, [n - u, r - d], f), l), 2), m = p[0], h = p[1], g = J(mi({
		datas: i,
		distX: m,
		distY: h
	}), 2);
	return [g[0], g[1]];
}
function si(e, t) {
	var n = t.datas, r = e.state, i = r.allMatrix, a = r.beforeMatrix, o = r.is3d, s = r.left, c = r.top, l = r.origin, u = r.offsetMatrix, d = r.targetMatrix, f = r.transformOrigin, p = o ? 4 : 3;
	n.is3d = o, n.matrix = i, n.targetMatrix = d, n.beforeMatrix = a, n.offsetMatrix = u, n.transformOrigin = f, n.inverseMatrix = Lt(i, p), n.inverseBeforeMatrix = Lt(a, p), n.absoluteOrigin = Vt(Gt([s, c], l), p), n.startDragBeforeDist = Jt(n.inverseBeforeMatrix, n.absoluteOrigin, p), n.startDragDist = Jt(n.inverseMatrix, n.absoluteOrigin, p);
}
function ci(e) {
	return ai(e.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function li(e, t, n) {
	var r = t.datas, i = t.originalDatas.beforeRenderable, a = r.transformIndex, o = i.nextTransforms, s = o.length, c = i.nextTransformAppendedIndexes, l = -1;
	a === -1 ? (n === "translate" ? l = 0 : n === "rotate" && (l = it(o, function(e) {
		return e.match(/scale\(/g);
	})), l === -1 && (l = o.length), r.transformIndex = l) : l = at(c, function(e) {
		return e.index === a && e.functionName === n;
	}) ? a : a + c.filter(function(e) {
		return e.index < a;
	}).length;
	var u = yc(o, e.state, l), d = u.targetFunction, f = n === "rotate" ? "rotateZ" : n;
	r.beforeFunctionTexts = u.beforeFunctionTexts, r.afterFunctionTexts = u.afterFunctionTexts, r.beforeTransform = u.beforeFunctionMatrix, r.beforeTransform2 = u.beforeFunctionMatrix2, r.targetTansform = u.targetFunctionMatrix, r.afterTransform = u.afterFunctionMatrix, r.afterTransform2 = u.afterFunctionMatrix2, r.targetAllTransform = u.allFunctionMatrix, d.functionName === f ? (r.afterFunctionTexts.splice(0, 1), r.isAppendTransform = !1) : s > l && (r.isAppendTransform = !0, i.nextTransformAppendedIndexes = Y(Y([], J(c), !1), [{
		functionName: n,
		index: l,
		isAppend: !0
	}], !1));
}
function ui(e, t, n) {
	return `${e.beforeFunctionTexts.join(" ")} ${e.isAppendTransform ? n : t} ${e.afterFunctionTexts.join(" ")}`;
}
function di(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = J(pi({
		datas: t,
		distX: n,
		distY: r
	}), 2), a = i[0], o = i[1];
	return Jt(fi(t, Bt([a, o], 4)), Vt([
		0,
		0,
		0
	], 4), 4);
}
function fi(e, t, n) {
	var r = e.beforeTransform, i = e.afterTransform, a = e.beforeTransform2, o = e.afterTransform2, s = e.targetAllTransform, c = n ? Wt(s, t, 4) : Wt(t, s, 4);
	return Wt(Wt(Lt(n ? a : r, 4), c, 4), Lt(n ? o : i, 4), 4);
}
function pi(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = t.inverseBeforeMatrix, a = t.is3d, o = t.startDragBeforeDist, s = t.absoluteOrigin, c = a ? 4 : 3;
	return K(Jt(i, Gt(s, [n, r]), c), o);
}
function mi(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.inverseBeforeMatrix, o = n.inverseMatrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return K(Jt(t ? a : o, Gt(u, [r, i]), d), t ? c : l);
}
function hi(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.beforeMatrix, o = n.matrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return K(Jt(t ? a : o, Gt(t ? c : l, [r, i]), d), u);
}
function gi(e, t, n, r, i, a) {
	return r === void 0 && (r = t), i === void 0 && (i = n), a === void 0 && (a = [0, 0]), e ? e.map(function(e, o) {
		var s = tt(e), c = s.value, l = s.unit, u = o ? i : r, d = o ? n : t;
		return e === "%" || isNaN(c) ? d * (u ? a[o] / u : 0) : l === "%" ? d * c / 100 : c;
	}) : a;
}
function _i(e) {
	var t = [];
	return e[1] >= 0 && (e[0] >= 0 && t.push(3), e[0] <= 0 && t.push(2)), e[1] <= 0 && (e[0] >= 0 && t.push(1), e[0] <= 0 && t.push(0)), t;
}
function vi(e, t) {
	return _i(t).map(function(t) {
		return e[t];
	});
}
function yi(e, t) {
	var n = (t + 1) / 2;
	return [Be(e[0][0], e[1][0], n, 1 - n), Be(e[0][1], e[1][1], n, 1 - n)];
}
function bi(e, t) {
	return yi([yi([e[0], e[1]], t[0]), yi([e[2], e[3]], t[0])], t[1]);
}
function xi(e, t, n, r, i, a) {
	var o = bi(js(t, n, r, i), a);
	return [e[0] - o[0], e[1] - o[1]];
}
function Si(e, t, n, r) {
	return Wt(e, hs(t, r, n), r);
}
function Ci(e, t, n, r) {
	var i = e.transformOrigin, a = e.offsetMatrix, o = e.is3d ? 4 : 3, s;
	if (We(n)) {
		var c = t.beforeTransform, l = t.afterTransform;
		s = Ht(r ? un(n) : Wt(Wt(c, un([n]), 4), l, 4), 4, o);
	} else s = n;
	return Si(a, s, i, o);
}
function wi(e, t) {
	var n = e.transformOrigin, r = e.offsetMatrix, i = e.is3d, a = e.targetMatrix, o = e.targetAllTransform, s = i ? 4 : 3;
	return Si(r, Wt(o || a, an(t, s), s), n, s);
}
function Ti(e, t) {
	var n = ki(t);
	return {
		setTransform: function(r, i) {
			i === void 0 && (i = -1), n.startTransforms = Ue(r) ? r : Qe(r), Di(e, t, i);
		},
		setTransformIndex: function(n) {
			Di(e, t, n);
		}
	};
}
function Ei(e, t, n) {
	var r = ki(t).startTransforms;
	Di(e, t, it(r, function(e) {
		return e.indexOf(`${n}(`) === 0;
	}));
}
function Di(e, t, n) {
	var r = ki(t), i = t.datas;
	if (i.transformIndex = n, n !== -1) {
		var a = r.startTransforms[n];
		if (a) {
			var o = e.state;
			i.startValue = pn([a], {
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
function Oi(e, t) {
	var n = ki(e);
	n.nextTransforms = Qe(t);
}
function ki(e) {
	return e.originalDatas.beforeRenderable;
}
function Ai(e) {
	return e.originalDatas.beforeRenderable.nextTransforms;
}
function ji(e) {
	return (Ai(e) || []).join(" ");
}
function Mi(e) {
	return ki(e).nextStyle;
}
function Ni(e, t, n, r, i) {
	Oi(i, t);
	var a = yo.drag(e, ri(i, e.state, n, r, !1)), o = a ? a.transform : t;
	return q(q({
		transform: t,
		drag: a
	}, ec({ transform: o }, i)), { afterTransform: o });
}
function Pi(e, t, n, r, i, a) {
	return Ri(e, n, r, Ci(e.state, i, t, a));
}
function Fi(e, t, n, r, i, a, o) {
	var s = Pi(e, t, n, i, a, o), c = e.state, l = c.left, u = c.top, d = e.props.groupable, f = d ? l : 0, p = d ? u : 0;
	return K(K(r, s), [f, p]);
}
function Ii(e, t, n, r, i, a, o) {
	return Fi(e, t, n, r, i, a, o);
}
function Li(e, t, n) {
	return [t ? -1 + e[0] / (t / 2) : 0, n ? -1 + e[1] / (n / 2) : 0];
}
function Ri(e, t, n, r) {
	r === void 0 && (r = e.state.allMatrix);
	var i = e.state, a = i.width, o = i.height, s = i.is3d ? 4 : 3, c = [a / 2 * (1 + t[0]) + n[0], o / 2 * (1 + t[1]) + n[1]];
	return As(r, c, s);
}
function zi(e, t, n) {
	var r = n.fixedDirection, i = n.fixedPosition, a = n.fixedOffset;
	return Fi(e, `rotate(${t}deg)`, r, i, a, n);
}
function Bi(e, t, n, r, i, a) {
	var o = e.props.groupable, s = e.state, c = s.transformOrigin, l = s.offsetMatrix, u = s.is3d, d = s.width, f = s.height, p = s.left, m = s.top, h = a.fixedDirection, g = a.nextTargetMatrix || s.targetMatrix, _ = u ? 4 : 3, v = gi(i, t, n, d, f, c), y = o ? p : 0, b = o ? m : 0;
	return K(xi(r, Si(l, g, v, _), t, n, _, h), [y, b]);
}
function Vi(e, t) {
	return bi(Zs(e.state), t);
}
function Hi(e, t) {
	var n = e.targetGesto, r = e.controlGesto, i;
	return n?.isFlag() && (i = n.getEventData()[t]), !i && r?.isFlag() && (i = r.getEventData()[t]), i || {};
}
function Ui(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function Wi(e) {
	var t = e("scale"), n = e("rotate"), r = e("translate"), i = [];
	return r && r !== "0px" && r !== "none" && i.push(`translate(${r.split(/\s+/).join(",")})`), n && n !== "1" && n !== "none" && i.push(`rotate(${n})`), t && t !== "1" && t !== "none" && i.push(`scale(${t.split(/\s+/).join(",")})`), i;
}
function Gi(e, t, n) {
	for (var r = e, i = [], a = Ot(e) || kt(e), o = !n && e === t || e === a, s = o, c = !1, l = 3, u, d, f, p = !1, m = xs(t, t, !0).offsetParent, h = 1; r && !s;) {
		s = o;
		var g = Qi(r), _ = g("position"), v = bs(r), y = _ === "fixed", b = Wi(g), x = Kt(ms(v)), S = void 0, C = !1, w = !1, T = 0, E = 0, D = 0, O = 0, k = {
			hasTransform: !1,
			fixedContainer: null
		};
		y && (p = !0, k = Ts(r), m = k.fixedContainer);
		var A = x.length;
		!c && (A === 16 || b.length) && (c = !0, l = 4, ws(i), f &&= Ht(f, 3, 4)), c && A === 9 && (x = Ht(x, 3, 4));
		var j = Ss(r, e), M = j.tagName, N = j.hasOffset, P = j.isSVG, F = j.origin, I = j.targetOrigin, L = j.offset, R = J(L, 2), z = R[0], B = R[1];
		M === "svg" && !r.ownerSVGElement && f && (i.push({
			type: "target",
			target: r,
			matrix: Os(r, l)
		}), i.push({
			type: "offset",
			target: r,
			matrix: rn(l)
		}));
		var V = parseFloat(g("zoom")) || 1;
		if (y) S = k.fixedContainer, C = !0;
		else {
			var H = xs(r, t, !1, !0, g), ee = H.offsetZoom;
			if (S = H.offsetParent, C = H.isEnd, w = H.isStatic, h *= ee, (H.isCustomElement || ee !== 1) && w) z -= S.offsetLeft, B -= S.offsetTop;
			else if ((Ur || Hr) && H.parentSlotElement) {
				for (var te = S, ne = 0, U = 0; te && Ui(te);) ne += te.offsetLeft, U += te.offsetTop, te = te.offsetParent;
				z -= ne, B -= U;
			}
		}
		if (Fr && !Wr && N && !P && w && (_ === "relative" || _ === "static") && (z -= S.offsetLeft, B -= S.offsetTop, o ||= C), y) N && k.hasTransform && (D = S.clientLeft, O = S.clientTop);
		else if (N && m !== S && (T = S.clientLeft, E = S.clientTop), N && S === a) {
			var W = Cs(r, !1);
			z += W[0], B += W[1];
		}
		if (i.push({
			type: "target",
			target: r,
			matrix: hs(x, l, F)
		}), b.length && (i.push({
			type: "offset",
			target: r,
			matrix: rn(l)
		}), i.push({
			type: "target",
			target: r,
			matrix: hs(un(b), l, F)
		})), N) {
			var re = r === e, ie = re ? 0 : r.scrollLeft, ae = re ? 0 : r.scrollTop;
			i.push({
				type: "offset",
				target: r,
				matrix: on([z - ie + T - D, B - ae + E - O], l)
			});
		} else i.push({
			type: "offset",
			target: r,
			origin: F
		});
		if (V !== 1 && i.push({
			type: "zoom",
			target: r,
			matrix: hs(an([V, V], l), l, [0, 0])
		}), f ||= x, u ||= F, d ||= I, s || y) break;
		r = S, o = C, (!n || r === a) && (s = o);
	}
	return f ||= rn(l), u ||= [0, 0], d ||= [0, 0], {
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
var Ki = null, qi = null, Ji = null;
function Yi(e) {
	e ? (window.Map && (Ki = /* @__PURE__ */ new Map(), qi = /* @__PURE__ */ new Map()), Ji = []) : (Ki = null, Ji = null, qi = null);
}
function Xi(e) {
	var t = qi?.get(e);
	if (t) return t;
	var n = Ks(e, !0);
	return qi && qi.set(e, n), n;
}
function Zi(e, t) {
	if (Ji) {
		var n = at(Ji, function(n) {
			return n[0][0] == e && n[0][1] == t;
		});
		if (n) return n[1];
	}
	var r = Gi(e, t, !0);
	return Ji && Ji.push([[e, t], r]), r;
}
function Qi(e) {
	var t = Ki?.get(e);
	if (!t) {
		var n = At(e).getComputedStyle(e);
		if (!Ki) return function(e) {
			return n[e];
		};
		t = {
			style: n,
			cached: {}
		}, Ki.set(e, t);
	}
	var r = t.cached, i = t.style;
	return function(e) {
		return e in r || (r[e] = i[e]), r[e];
	};
}
function $i(e, t, n) {
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
function ea(e, t, n, r, i, a, o) {
	var s = !!n.match(/Start$/g), c = !!n.match(/End$/g), l = i.isPinch, u = i.datas, d = $i(e, t.name, i), f = e.moveables, p = [], m = d.map(function(e, i) {
		var d = f[i], m = d.state, h = m.gestos, g = e;
		if (s) g = new ii(o).dragStart(r, e), p.push(g);
		else {
			if (h[o] || (h[o] = u.childGestos[i]), !h[o]) return;
			g = ri(e, m, r, l, a, o), p.push(g);
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
function ta(e, t, n, r, i, a) {
	i === void 0 && (i = function(e, t) {
		return t;
	});
	var o = !!n.match(/End$/g), s = $i(e, t.name, r), c = e.moveables;
	return s.map(function(e, r) {
		var s = c[r], l = e;
		l = i(s, e);
		var u = t[n](s, q(q({}, l), { parentFlag: !0 }));
		return u && a && a(s, e, u, r), o && (s.state.gestos = {}), u;
	});
}
function na(e, t, n, r) {
	var i = n.fixedDirection, a = n.fixedPosition, o = bi(r.datas.startPositions || Zs(t.state), i), s = J(Jt(nn(-e.rotation / 180 * Math.PI, 3), [
		o[0] - a[0],
		o[1] - a[1],
		1
	], 3), 2), c = s[0], l = s[1];
	return r.datas.originalX = c, r.datas.originalY = l, r;
}
function ra(e, t, n, r) {
	var i = e.getState(), a = i.renderPoses, o = i.rotation, s = i.direction, c = Bs(e.props, t).zoom, l = ts(o / Math.PI * 180), u = {}, d = e.renderState;
	d.renderDirectionMap ||= {};
	var f = d.renderDirectionMap;
	n.forEach(function(e) {
		var t = e.dir;
		u[t] = !0;
	});
	var p = Mc(s);
	return n.map(function(e) {
		var n = e.data, i = e.classNames, s = e.dir, d = ei[s];
		if (!d || !u[s]) return null;
		f[s] = !0;
		var m = (G(l, 15) + p * ti[s] + 720) % 180, h = {};
		return ct(n).forEach(function(e) {
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
			style: zs.apply(void 0, Y([o, c], J(d.map(function(e) {
				return a[e];
			})), !1))
		}));
	});
}
function ia(e, t, n, r) {
	var i = Bs(e.props, n), a = i.renderDirections, o = a === void 0 ? t : a, s = i.displayAroundControls;
	if (!o) return [];
	var c = o === !0 ? jr : o;
	return Y(Y([], J(s ? ua(e, r, n, c) : []), !1), J(ra(e, n, c.map(function(e) {
		return {
			data: {},
			classNames: [],
			dir: e
		};
	}), r)), !1);
}
function aa(e, t, n, r, i, a) {
	var o = [...arguments].slice(6), s = ht(n, r), c = t ? G(s / Math.PI * 180, 15) % 180 : -1;
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
		style: Rs(n, r, i, s)
	});
}
function oa(e, t, n, r, i) {
	return (n === !0 ? Ar : n).map(function(n, a) {
		var o = J(ei[n], 2), s = o[0], c = o[1];
		if (c != null) return aa(e, n, r[s], r[c], i, `${t}Edge${a}`, t);
	}).filter(Boolean);
}
function sa(e) {
	return function(t, n) {
		var r = Bs(t.props, e).edge;
		return r && (r === !0 || r.length) ? Y(Y([], J(oa(n, e, r, t.getState().renderPoses, t.props.zoom)), !1), J(la(t, e, n)), !1) : ca(t, e, n);
	};
}
function ca(e, t, n) {
	return ia(e, jr, t, n);
}
function la(e, t, n) {
	return ia(e, [
		"nw",
		"ne",
		"sw",
		"se"
	], t, n);
}
function ua(e, t, n, r) {
	var i = e.renderState;
	i.renderDirectionMap ||= {};
	var a = e.getState(), o = a.renderPoses, s = a.rotation, c = a.direction, l = i.renderDirectionMap, u = e.props.zoom, d = Mc(c), f = s / Math.PI * 180;
	return (r || ct(l)).map(function(e) {
		var r = ei[e];
		if (!r) return null;
		var i = (G(f, 15) + d * ti[e] + 720) % 180, a = ["around-control"];
		return n && a.push("direction", n), t.createElement("div", {
			className: X.apply(void 0, Y([], J(a), !1)),
			"data-rotation": i,
			"data-direction": e,
			key: `direction-around-${e}`,
			style: zs.apply(void 0, Y([s, u], J(r.map(function(e) {
				return o[e];
			})), !1))
		});
	});
}
function da(e, t, n) {
	var r = e || {}, i = r.position, a = i === void 0 ? "client" : i, o = r.left, s = o === void 0 ? -Infinity : o, c = r.top, l = c === void 0 ? -Infinity : c, u = r.right, d = u === void 0 ? Infinity : u, f = r.bottom, p = {
		position: a,
		left: s,
		top: l,
		right: d,
		bottom: f === void 0 ? Infinity : f
	};
	return {
		vertical: ma(p, t, !0),
		horizontal: ma(p, n, !1)
	};
}
function fa(e, t) {
	var n = e.state, r = n.containerClientRect, i = r.clientHeight, a = r.clientWidth, o = r.clientLeft, s = r.clientTop, c = n.snapOffset, l = c.left, u = c.top, d = c.right, f = c.bottom, p = t || e.props.bounds || {}, m = (p.position || "client") === "css", h = p.left, g = h === void 0 ? -Infinity : h, _ = p.top, v = _ === void 0 ? -Infinity : _, y = p.right, b = y === void 0 ? m ? -Infinity : Infinity : y, x = p.bottom, S = x === void 0 ? m ? -Infinity : Infinity : x;
	return m && (b = a + d - l - b, S = i + f - u - S), {
		left: g + l - o,
		right: b + l - o,
		top: v + u - s,
		bottom: S + u - s
	};
}
function pa(e, t, n) {
	var r = fa(e), i = r.left, a = r.top, o = r.right, s = r.bottom, c = J(n, 2), l = c[0], u = c[1], d = J(K(n, t), 2), f = d[0], p = d[1];
	$(f) < Yr && (f = 0), $(p) < Yr && (p = 0);
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
function ma(e, t, n) {
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
function ha(e, t, n) {
	return (n ? e.map(function(e) {
		return $t(e, n);
	}) : e).some(function(e) {
		return e[0] < t.left && $(e[0] - t.left) > .1 || e[0] > t.right && $(e[0] - t.right) > .1 || e[1] < t.top && $(e[1] - t.top) > .1 || e[1] > t.bottom && $(e[1] - t.bottom) > .1;
	});
}
function ga(e, t, n) {
	var r = Is(e), i = Math.sqrt(r * r - t * t) || 0;
	return [i, -i].sort(function(t, r) {
		return $(t - e[+!n]) - $(r - e[+!n]);
	}).map(function(e) {
		return ht([0, 0], n ? [e, t] : [t, e]);
	});
}
function _a(e, t, n, r, i) {
	if (!e.props.bounds) return [];
	var a = i * Math.PI / 180, o = fa(e), s = o.left, c = o.top, l = o.right, u = o.bottom, d = s - r[0], f = l - r[0], p = c - r[1], m = u - r[1], h = {
		left: d,
		top: p,
		right: f,
		bottom: m
	};
	if (!ha(n, h, 0)) return [];
	var g = [];
	return [
		[d, 0],
		[f, 0],
		[p, 1],
		[m, 1]
	].forEach(function(e) {
		var r = J(e, 2), i = r[0], o = r[1];
		n.forEach(function(e) {
			var n = ht([0, 0], e);
			g.push.apply(g, Y([], J(ga(e, i, o).map(function(e) {
				return a + e - n;
			}).filter(function(e) {
				return !ha(t, h, e);
			}).map(function(e) {
				return G(e * 180 / Math.PI, Yr);
			})), !1));
		});
	}), g;
}
var va = [
	"left",
	"right",
	"center"
], ya = [
	"top",
	"bottom",
	"middle"
], ba = {
	left: "start",
	right: "end",
	center: "center",
	top: "start",
	bottom: "end",
	middle: "center"
}, xa = {
	start: "left",
	end: "right",
	center: "center"
}, Sa = {
	start: "top",
	end: "bottom",
	center: "middle"
};
function Ca() {
	return {
		left: !1,
		top: !1,
		right: !1,
		bottom: !1
	};
}
function wa(e, t) {
	var n = e.props, r = n.snappable, i = n.bounds, a = n.innerBounds, o = n.verticalGuidelines, s = n.horizontalGuidelines, c = n.snapGridWidth, l = n.snapGridHeight, u = e.state, d = u.guidelines, f = u.enableSnap;
	return !r || !f || t && r !== !0 && r.indexOf(t) < 0 ? !1 : !!(c || l || i || a || d && d.length || o && o.length || s && s.length);
}
function Ta(e) {
	return e === !1 ? {} : e === !0 || !e ? {
		left: !0,
		right: !0,
		top: !0,
		bottom: !0
	} : e;
}
function Ea(e, t) {
	var n = Ta(e), r = {};
	for (var i in n) i in t && n[i] && (r[i] = t[i]);
	return r;
}
function Da(e, t) {
	var n = Ea(e, t), r = ya.filter(function(e) {
		return e in n;
	}), i = va.filter(function(e) {
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
function Oa(e, t, n) {
	var r = As(e, [t.clientLeft, t.clientTop], n);
	return [t.left + r[0], t.top + r[1]];
}
function ka(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	Math.abs(i) < 1e-7 && (i = 0), Math.abs(a) < 1e-7 && (a = 0);
	var o = 0, s = 0, c = 0;
	return i ? a ? (o = -a / i, s = 1, c = o * n[0] - n[1]) : (s = 1, c = -n[1]) : (o = -1, c = n[0]), [
		o,
		s,
		c
	].map(function(e) {
		return G(e, Le);
	});
}
var Aa = "snapRotationThreshold", ja = "snapRotationDegrees", Ma = "snapHorizontalThreshold", Na = "snapVerticalThreshold";
function Pa(e, t, n, r, i, a, o) {
	r === void 0 && (r = []), i === void 0 && (i = []);
	var s = e.props, c = e.state.snapThresholdInfo?.multiples || [1, 1], l = sc(o, s[Ma], 5), u = sc(a, s[Na], 5);
	return Fa(e.state.guidelines, t, n, r, i, l, u, c);
}
function Fa(e, t, n, r, i, a, o, s) {
	return {
		vertical: Ba(e, "vertical", t, o * s[0], r),
		horizontal: Ba(e, "horizontal", n, a * s[1], i)
	};
}
function Ia(e, t, n) {
	var r = J(n, 2), i = r[0], a = r[1], o = J(t, 2), s = o[0], c = o[1], l = J(K(n, t), 2), u = l[0], d = l[1], f = d > 0, p = u > 0;
	u = gc(u), d = gc(d);
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
	var g = Pa(e, u ? [i] : [], d ? [a] : [], [], [], void 0, void 0), _ = g.vertical, v = g.horizontal;
	_.posInfos.filter(function(e) {
		var t = e.pos;
		return p ? t >= s : t <= s;
	}), v.posInfos.filter(function(e) {
		var t = e.pos;
		return f ? t >= c : t <= c;
	}), _.isSnap = _.posInfos.length > 0, v.isSnap = v.posInfos.length > 0;
	var y = za(_), b = y.isSnap, x = y.guideline, S = za(v), C = S.isSnap, w = S.guideline, T = C ? w.pos[1] : 0, E = b ? x.pos[0] : 0;
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
function La(e) {
	var t = "";
	return e === -1 || e === "top" || e === "left" ? t = "start" : e === 0 || e === "center" || e === "middle" ? t = "center" : (e === 1 || e === "right" || e === "bottom") && (t = "end"), t;
}
function Ra(e, t, n, r) {
	var i = Da(e.props.snapDirections, t), a = Pa(e, i.vertical, i.horizontal, i.verticalNames.map(function(e) {
		return La(e);
	}), i.horizontalNames.map(function(e) {
		return La(e);
	}), n, r), o = La(i.horizontalNames[a.horizontal.index]), s = La(i.verticalNames[a.vertical.index]);
	return {
		vertical: q(q({}, a.vertical), { direction: s }),
		horizontal: q(q({}, a.horizontal), { direction: o })
	};
}
function za(e) {
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
function Ba(e, t, n, r, i) {
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
function Va(e, t, n, r, i) {
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
	}) : e.props.keepRatio ? a.push([-1, -1], [-1, 1], [1, -1], [1, 1], n) : (a.push.apply(a, Y([], J(vi([
		[-1, -1],
		[1, -1],
		[-1, -1],
		[1, 1]
	], n)), !1)), a.length > 1 && a.push([(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2]));
	var o = a.map(function(e) {
		return bi(t, e);
	}), s = Pa(e, o.map(function(e) {
		return e[0];
	}), o.map(function(e) {
		return e[1];
	}), a.map(function(e) {
		return La(e[0]);
	}), a.map(function(e) {
		return La(e[1]);
	}), r, i), c = La(a.map(function(e) {
		return e[0];
	})[s.vertical.index]), l = La(a.map(function(e) {
		return e[1];
	})[s.horizontal.index]);
	return {
		vertical: q(q({}, s.vertical), { direction: c }),
		horizontal: q(q({}, s.horizontal), { direction: l })
	};
}
function Ha(e, t) {
	var n = $(e.offset), r = $(t.offset);
	return e.isBound && t.isBound ? r - n : e.isBound ? -1 : t.isBound ? 1 : e.isSnap && t.isSnap ? r - n : e.isSnap ? -1 : t.isSnap || n < Yr ? 1 : r < Yr ? -1 : n - r;
}
function Ua(e, t) {
	return e.slice().sort(function(e, n) {
		var r = e.sign[t], i = n.sign[t], a = e.offset[t], o = n.offset[t];
		return r ? i ? Ha({
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
function Wa(e, t, n) {
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
function Ga(e, t) {
	var n = mt([t[0][0], t[1][0]]), r = mt([t[0][1], t[1][1]]);
	return {
		vertical: n <= e[0],
		horizontal: r <= e[1]
	};
}
function Ka(e, t) {
	var n = J(t, 2), r = n[0], i = n[1], a = i[0] - r[0], o = i[1] - r[1];
	$(a) < Yr && (a = 0), $(o) < Yr && (o = 0);
	var s, c;
	return a ? o ? (s = o / a * (e[0] - r[0]) + r[1], c = e[1]) : (s = r[1], c = e[1]) : (s = r[0], c = e[0]), s - c;
}
function qa(e, t, n, r) {
	return r === void 0 && (r = Yr), e.every(function(e) {
		var i = Ka(e, t);
		return i <= 0 === n || $(i) <= r;
	});
}
function Ja(e, t, n, r, i) {
	return i === void 0 && (i = 0), r && t - i <= e || !r && e <= n + i ? {
		isBound: !0,
		offset: r ? t - e : n - e
	} : {
		isBound: !1,
		offset: 0
	};
}
function Ya(e, t) {
	var n = t.line, r = t.centerSign, i = t.verticalSign, a = t.horizontalSign, o = t.lineConstants, s = e.props.innerBounds;
	if (!s) return {
		isAllBound: !1,
		isBound: !1,
		isVerticalBound: !1,
		isHorizontalBound: !1,
		offset: [0, 0]
	};
	var c = s.left, l = s.top, u = s.width, d = s.height, f = [[c, l], [c, l + d]], p = [[c, l], [c + u, l]], m = [[c + u, l], [c + u, l + d]], h = [[c, l + d], [c + u, l + d]];
	if (qa([
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
	var g = Xa(n, o, p, i), _ = Xa(n, o, h, i), v = Xa(n, o, f, a), y = Xa(n, o, m, a), b = g.isBound && _.isBound, x = g.isBound || _.isBound, S = v.isBound && y.isBound, C = v.isBound || y.isBound, w = dc(g.offset, _.offset), T = dc(v.offset, y.offset), E = [0, 0], D = !1, O = !1;
	return $(T) < $(w) ? (E = [w, 0], D = x, O = b) : (E = [0, T], D = C, O = S), {
		isAllBound: O,
		isVerticalBound: x,
		isHorizontalBound: C,
		isBound: D,
		offset: E
	};
}
function Xa(e, t, n, r, i, a) {
	var o = J(t, 2), s = o[0], c = o[1], l = e[0], u = n[0], d = n[1], f = gc(d[1] - u[1]), p = gc(d[0] - u[0]), m = c, h = s, g = -s / c;
	if (!p) {
		if (a && !h) return {
			isBound: !1,
			offset: 0
		};
		if (m) return Ja(g * (u[0] - l[0]) + l[1], u[1], d[1], r, i);
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
		if (h) return Ja((u[1] - l[1]) / g + l[0], u[0], d[0], r, i);
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
function Za(e, t, n) {
	return t.map(function(t) {
		var r = Ya(e, t), i = r.isBound, a = r.offset, o = r.isVerticalBound, s = r.isHorizontalBound, c = t.multiple;
		return {
			sign: c,
			isBound: i,
			isVerticalBound: o,
			isHorizontalBound: s,
			isSnap: !1,
			offset: mi({
				datas: n,
				distX: a[0],
				distY: a[1]
			}).map(function(e, t) {
				return e * (c[t] ? 2 / c[t] : 0);
			})
		};
	});
}
function Qa(e, t, n) {
	var r, i = Za(e, eo(e, t, [0, 0], !1).map(function(e) {
		return q(q({}, e), { multiple: e.multiple.map(function(e) {
			return $(e) * 2;
		}) });
	}), n), a = Ua(i, 0), o = Ua(i, 1), s = 0, c = 0, l = a.isVerticalBound || o.isVerticalBound, u = a.isHorizontalBound || o.isHorizontalBound;
	return (l || u) && (r = J(hi({
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
function $a(e, t) {
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
function eo(e, t, n, r) {
	var i = e.state, a = i.allMatrix, o = i.is3d, s = js(a, 100, 100, o ? 4 : 3), c = bi(s, [0, 0]);
	return $a(n, r).map(function(e) {
		var n = J(e, 3), r = n[0], i = n[1], a = n[2], o = [bi(s, i), bi(s, a)], l = ka(o), u = Ga(c, o), d = u.vertical, f = u.horizontal;
		return {
			multiple: r,
			centerSign: Ka(c, o) <= 0,
			verticalSign: d,
			horizontalSign: f,
			lineConstants: l,
			line: [bi(t, i), bi(t, a)]
		};
	});
}
function to(e, t, n, r) {
	var i = r ? e.map(function(e) {
		return $t(e, r);
	}) : e;
	return [
		[i[0], i[1]],
		[i[1], i[3]],
		[i[3], i[2]],
		[i[2], i[0]]
	].some(function(e) {
		return !qa(t, e, Ka(n, e) <= 0);
	});
}
function no(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return $(n[0]);
	if (!a) return $(n[1]);
	var o = a / i;
	return $((-o * n[0] + n[1]) / Math.sqrt(o ** 2 + 1));
}
function ro(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return [n[0], 0];
	if (!a) return [0, n[1]];
	var o = a / i, s = -o * n[0] + n[1];
	return [-s / (o + 1 / o), s / (o * o + 1)];
}
function io(e, t, n, r, i) {
	var a = e.props.innerBounds, o = i * Math.PI / 180;
	if (!a) return [];
	var s = a.left, c = a.top, l = a.width, u = a.height, d = s - r[0], f = s + l - r[0], p = c - r[1], m = c + u - r[1], h = [
		[d, p],
		[f, p],
		[d, m],
		[f, m]
	], g = bi(n, [0, 0]);
	if (!to(n, h, g, 0)) return [];
	var _ = [], v = h.map(function(e) {
		return [Is(e), ht([0, 0], e)];
	});
	return [
		[n[0], n[1]],
		[n[1], n[3]],
		[n[3], n[2]],
		[n[2], n[0]]
	].forEach(function(e) {
		var n = ht([0, 0], ro(e)), r = no(e);
		_.push.apply(_, Y([], J(v.filter(function(e) {
			var t = J(e, 1)[0];
			return t && r <= t;
		}).map(function(e) {
			var t = J(e, 2), i = t[0], a = t[1], s = Math.acos(i ? r / i : 0), c = a + s, l = a - s;
			return [o + c - n, o + l - n];
		}).reduce(function(e, t) {
			return e.push.apply(e, Y([], J(t), !1)), e;
		}, []).filter(function(e) {
			return !to(t, h, g, e);
		}).map(function(e) {
			return G(e * 180 / Math.PI, Yr);
		})), !1));
	}), _;
}
function ao(e) {
	var t = e.props.innerBounds, n = Ca();
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
	], a = bi(i, [0, 0]), o = t.left, s = t.top, c = t.width, l = t.height, u = [[o, s], [o, s + l]], d = [[o, s], [o + c, s]], f = [[o + c, s], [o + c, s + l]], p = [[o, s + l], [o + c, s + l]], m = eo(e, i, [0, 0], !1), h = [], g = [];
	return m.forEach(function(e) {
		var t = e.line, r = e.lineConstants, i = Ga(a, t), m = i.horizontal, _ = i.vertical, v = Xa(t, r, d, _, 1, !0), y = Xa(t, r, p, _, 1, !0), b = Xa(t, r, u, m, 1, !0), x = Xa(t, r, f, m, 1, !0);
		v.isBound && !n.top && (h.push(s), n.top = !0), y.isBound && !n.bottom && (h.push(s + l), n.bottom = !0), b.isBound && !n.left && (g.push(o), n.left = !0), x.isBound && !n.right && (g.push(o + c), n.right = !0);
	}), {
		boundMap: n,
		horizontal: h,
		vertical: g
	};
}
function oo(e, t, n, r) {
	var i = t[0] - e[0], a = t[1] - e[1];
	if ($(i) < 1e-7 && (i = 0), $(a) < 1e-7 && (a = 0), !i) return r ? [0, 0] : [0, n];
	if (!a) return r ? [n, 0] : [0, 0];
	var o = a / i, s = e[1] - o * e[0];
	return r ? [n, o * (t[0] + n) + s - t[1]] : [(t[1] + n - s) / o - t[0], n];
}
function so(e, t, n, r, i) {
	var a = oo(e, t, n, r);
	if (!a) return {
		isOutside: !1,
		offset: [0, 0]
	};
	var o = vt(e, t), s = vt(a, e), c = vt(a, t), l = s > o || c > o, u = J(mi({
		datas: i,
		distX: a[0],
		distY: a[1]
	}), 2);
	return {
		offset: [u[0], u[1]],
		isOutside: l
	};
}
function co(e, t) {
	return e.isBound ? e.offset : t.isSnap ? za(t).offset : 0;
}
function lo(e, t, n, r, i) {
	var a = J(t, 2), o = a[0], s = a[1], c = J(n, 2), l = c[0], u = c[1], d = J(r, 2), f = d[0], p = d[1], m = J(i, 2), h = m[0], g = m[1], _ = -h, v = -g;
	if (e && o && s) {
		_ = 0, v = 0;
		var y = [];
		if (l && u ? y.push([0, g], [h, 0]) : l ? y.push([h, 0]) : u ? y.push([0, g]) : f && p ? y.push([0, g], [h, 0]) : f ? y.push([h, 0]) : p && y.push([0, g]), y.length) {
			y.sort(function(e, t) {
				return Is(K([o, s], e)) - Is(K([o, s], t));
			});
			var b = y[0];
			if (b[0] && $(o) > 1e-7) _ = -b[0], v = s * $(o + _) / $(o) - s;
			else if (b[1] && $(s) > 1e-7) {
				var x = s;
				v = -b[1], _ = o * $(s + v) / $(x) - o;
			}
			if (e && u && l) {
				if ($(_) > 1e-7 && $(_) < $(h)) {
					var S = $(h) / $(_);
					_ *= S, v *= S;
				} else if ($(v) > 1e-7 && $(v) < $(g)) {
					var S = $(g) / $(v);
					_ *= S, v *= S;
				} else _ = dc(-h, _), v = dc(-g, v);
			}
		}
	} else _ = o || l ? -h : 0, v = s || u ? -g : 0;
	return [_, v];
}
function uo(e, t, n, r, i, a) {
	if (!wa(e, "draggable")) return [{
		isSnap: !1,
		isBound: !1,
		offset: 0
	}, {
		isSnap: !1,
		isBound: !1,
		offset: 0
	}];
	var o = Xs(a.absolutePoses, [t, n]), s = Ms(o), c = s.left, l = s.right, u = s.top, d = s.bottom, f = {
		horizontal: o.map(function(e) {
			return e[1];
		}),
		vertical: o.map(function(e) {
			return e[0];
		})
	}, p = fo(e, i, Da(Ta(e.props.snapDirections), {
		left: c,
		right: l,
		top: u,
		bottom: d,
		center: (c + l) / 2,
		middle: (u + d) / 2
	}), f), m = p.vertical, h = p.horizontal, g = Qa(e, o, a), _ = g.vertical, v = g.horizontal, y = m.isSnap, b = h.isSnap, x = m.isBound || _.isBound, S = h.isBound || v.isBound, C = dc(m.offset, _.offset), w = dc(h.offset, v.offset), T = J(lo(r, [t, n], [x, S], [y, b], [C, w]), 2), E = T[0], D = T[1];
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
function fo(e, t, n, r) {
	r === void 0 && (r = n);
	var i = da(fa(e), r.vertical, r.horizontal), a = i.horizontal, o = i.vertical, s = t ? {
		horizontal: {
			isSnap: !1,
			index: -1
		},
		vertical: {
			isSnap: !1,
			index: -1
		}
	} : Pa(e, n.vertical, n.horizontal, void 0, void 0, void 0, void 0), c = s.horizontal, l = s.vertical, u = co(a[0], c), d = co(o[0], l), f = $(u), p = $(d);
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
function po(e, t, n, r, i, a, o) {
	o === void 0 && (o = [1, 1]);
	var s = da(t, n, r), c = s.horizontal, l = s.vertical, u = Fa(e, n, r, [], [], i, a, o), d = u.horizontal, f = u.vertical, p = co(c[0], d), m = co(l[0], f), h = $(p), g = $(m);
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
function mo(e, t, n, r) {
	var i = ht(e, t) / Math.PI * 180, a = n.vertical, o = a.isBound, s = a.isSnap, c = a.dist, l = n.horizontal, u = l.isBound, d = l.isSnap, f = l.dist, p = i % 180, m = p < 3 || p > 177, h = p > 87 && p < 93;
	return f < c && (o || s && !h && (!r || !m)) ? "vertical" : u || d && !m && (!r || !h) ? "horizontal" : "";
}
function ho(e, t, n, r, i, a) {
	return n.map(function(n) {
		var o = J(n, 2), s = o[0], c = o[1], l = bi(t, s), u = bi(t, c), d = r ? _o(e, l, u, i) : fo(e, i, {
			vertical: [u[0]],
			horizontal: [u[1]]
		}), f = d.horizontal, p = f.offset, m = f.isBound, h = f.isSnap, g = d.vertical, _ = g.offset, v = g.isBound, y = g.isSnap, b = K(c, s);
		if (!_ && !p) return {
			isBound: v || m,
			isSnap: y || h,
			sign: b,
			offset: [0, 0]
		};
		var x = mo(l, u, d, r);
		if (!x) return {
			sign: b,
			isBound: !1,
			isSnap: !1,
			offset: [0, 0]
		};
		var S = x === "vertical", C = [0, 0];
		return C = !r && $(c[0]) === 1 && $(c[1]) === 1 && s[0] !== c[0] && s[1] !== c[1] ? mi({
			datas: a,
			distX: -_,
			distY: -p
		}) : so(l, u, -(S ? _ : p), S, a).offset, C = C.map(function(e, t) {
			return e * (b[t] ? 2 / b[t] : 0);
		}), {
			sign: b,
			isBound: S ? v : m,
			isSnap: S ? y : h,
			offset: C
		};
	});
}
function go(e, t) {
	return e.isBound ? e.offset : t.isSnap ? t.offset : 0;
}
function _o(e, t, n, r) {
	var i = pa(e, t, n), a = i.horizontal, o = i.vertical, s = r ? {
		horizontal: { isSnap: !1 },
		vertical: { isSnap: !1 }
	} : Ia(e, t, n), c = s.horizontal, l = s.vertical, u = go(a, c), d = go(o, l), f = $(u), p = $(d);
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
function vo(e, t, n, r, i) {
	var a = [-n[0], -n[1]], o = e.state, s = o.width, c = o.height, l = e.props.bounds, u = Infinity, d = Infinity;
	if (l) {
		var f = [[n[0], -n[1]], [-n[0], n[1]]], p = l.left, m = p === void 0 ? -Infinity : p, h = l.top, g = h === void 0 ? -Infinity : h, _ = l.right, v = _ === void 0 ? Infinity : _, y = l.bottom, b = y === void 0 ? Infinity : y;
		f.forEach(function(e) {
			var n = e[0] !== a[0], o = e[1] !== a[1], l = bi(t, e), f = ht(r, l) * 360 / Math.PI;
			if (o) {
				var p = l.slice();
				($(f - 360) < 2 || $(f - 180) < 2) && (p[1] = r[1]);
				var h = so(r, p, (r[1] < l[1] ? b : g) - l[1], !1, i), _ = J(h.offset, 2)[1], y = h.isOutside;
				isNaN(_) || (d = c + (y ? 1 : -1) * $(_));
			}
			if (n) {
				var p = l.slice();
				($(f - 90) < 2 || $(f - 270) < 2) && (p[0] = r[0]);
				var x = so(r, p, (r[0] < l[0] ? v : m) - l[0], !0, i), S = J(x.offset, 1)[0], C = x.isOutside;
				isNaN(S) || (u = s + (C ? 1 : -1) * $(S));
			}
		});
	}
	return {
		maxWidth: u,
		maxHeight: d
	};
}
var yo = {
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
		var u = Is(l), d = ht(l, [0, 0]);
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
		o.draggable = i || e.targetGesto, n.datas = {}, n.left = parseFloat(s.left || "") || 0, n.top = parseFloat(s.top || "") || 0, n.bottom = parseFloat(s.bottom || "") || 0, n.right = parseFloat(s.right || "") || 0, n.startValue = [0, 0], si(e, t), Ei(e, t, "translate"), ss(e, n), n.prevDist = [0, 0], n.prevBeforeDist = [0, 0], n.isDrag = !1, n.deltaOffset = [0, 0];
		var c = Z(e, t, q({ set: function(e) {
			n.startValue = e;
		} }, Ti(e, t)));
		return (r || Q(e, "onDragStart", c)) === !1 ? (o.draggable = null, n.isPinch = !1) : (n.isDrag = !0, e.state.dragInfo = {
			startRect: e.getRect(),
			dist: [0, 0]
		}), n.isDrag ? c : !1;
	},
	drag: function(e, t) {
		if (t) {
			li(e, t, "translate");
			var n = t.datas, r = t.parentEvent, i = t.parentFlag, a = t.isPinch, o = t.deltaOffset, s = t.useSnap, c = t.isRequest, l = t.isGroup, u = t.parentThrottleDrag, d = t.distX, f = t.distY, p = n.isDrag, m = n.prevDist, h = n.prevBeforeDist, g = n.startValue;
			if (p) {
				o && (d += o[0], f += o[1]);
				var _ = e.props, v = _.parentMoveable, y = l ? 0 : _.throttleDrag || u || 0, b = r ? 0 : _.throttleDragRotate || 0, x = 0, S = !1, C = !1, w = !1, T = !1;
				if (!r && b > 0 && (d || f)) {
					var E = _.startDragRotate || 0, D = G(E + ht([0, 0], [d, f]) * 180 / Math.PI, b) - E, O = f * Math.abs(Math.cos((D - 90) / 180 * Math.PI)), k = Is([d * Math.abs(Math.cos(D / 180 * Math.PI)), O]);
					x = D * Math.PI / 180, d = k * Math.cos(x), f = k * Math.sin(x);
				}
				if (!a && !r && !i) {
					var A = J(uo(e, d, f, b, !s && c || o, n), 2), j = A[0], M = A[1];
					S = j.isSnap, C = j.isBound, w = M.isSnap, T = M.isBound;
					var N = j.offset, P = M.offset;
					d += N, f += P;
				}
				var F = Gt(pi({
					datas: n,
					distX: d,
					distY: f
				}), g), I = Gt(di({
					datas: n,
					distX: d,
					distY: f
				}), g);
				yt(I, Yr), yt(F, Yr), b || (!S && !C && (I[0] = G(I[0], y), F[0] = G(F[0], y)), !w && !T && (I[1] = G(I[1], y), F[1] = G(F[1], y)));
				var L = K(F, g), R = K(I, g), z = K(R, m), B = K(L, h);
				n.prevDist = R, n.prevBeforeDist = L, n.passDelta = z, n.passDist = R;
				var V = n.left + L[0], H = n.top + L[1], ee = n.right - L[0], te = n.bottom - L[1], ne = ui(n, `translate(${I[0]}px, ${I[1]}px)`, `translate(${R[0]}px, ${R[1]}px)`);
				if (Oi(t, ne), e.state.dragInfo.dist = r ? [0, 0] : R, !(!r && !v && z.every(function(e) {
					return !e;
				}) && B.some(function(e) {
					return !e;
				}))) {
					var U = e.state, W = U.width, re = U.height, ie = Z(e, t, q({
						transform: ne,
						dist: R,
						delta: z,
						translate: I,
						beforeDist: L,
						beforeDelta: B,
						beforeTranslate: F,
						left: V,
						top: H,
						right: ee,
						bottom: te,
						width: W,
						height: re,
						isPinch: a
					}, ec({ transform: ne }, t)));
					return !r && Q(e, "onDrag", ie), ie;
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
			var i = nc(e, t, {});
			return !n && Q(e, "onDragEnd", i), i;
		}
	},
	dragGroupStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY, a = this.dragStart(e, t);
		if (!a) return !1;
		var o = ea(e, this, "dragStart", [r || 0, i || 0], t, !1, "draggable"), s = o.childEvents, c = o.eventParams;
		n.isDrag = Q(e, "onDragGroupStart", q(q({}, a), {
			targets: e.props.targets,
			events: c
		})) !== !1;
		var l = s[0]?.datas.startValue ?? [0, 0];
		return n.throttleOffset = [l[0] % 1, l[1] % 1], n.isDrag ? a : !1;
	},
	dragGroup: function(e, t) {
		if (t.datas.isDrag) {
			var n = this.drag(e, q(q({}, t), { parentThrottleDrag: e.props.throttleDrag })), r = t.datas.passDelta, i = ea(e, this, "drag", r, t, !1, "draggable").eventParams;
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
			var r = ea(e, this, "dragEnd", [0, 0], t, !1, "draggable").eventParams;
			return Q(e, "onDragGroupEnd", nc(e, t, {
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
function bo(e, t) {
	return {
		fixedPosition: bi(e, t),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function xo(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3;
	return {
		fixedPosition: As(n, [i / 2 * (1 + t[0]), a / 2 * (1 + t[1])], o),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function So(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3, s = Li(t, i, a);
	return {
		fixedPosition: As(n, t, o),
		fixedDirection: s,
		fixedOffset: [i ? 0 : t[0], a ? 0 : t[1]]
	};
}
var Co = vc("resizable"), wo = {
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
	render: sa("resizable"),
	dragControlCondition: Co,
	viewClassName: _c("resizable"),
	dragControlStart: function(e, t) {
		var n = t.inputEvent, r = t.isPinch, i = t.isGroup, a = t.parentDirection, o = t.parentGesto, s = t.datas, c = t.parentFixedDirection, l = t.parentEvent, u = Js(a, r, n, s), d = e.state, f = d.target, p = d.width, m = d.height, h = d.gestos;
		if (!u || !f || h.resizable) return !1;
		h.resizable = o || e.controlGesto, !r && si(e, t), s.datas = {}, s.direction = u, s.startOffsetWidth = p, s.startOffsetHeight = m, s.prevWidth = 0, s.prevHeight = 0, s.minSize = [0, 0], s.startWidth = d.inlineCSSWidth || d.cssWidth, s.startHeight = d.inlineCSSHeight || d.cssHeight, s.maxSize = [Infinity, Infinity], i || (s.minSize = [d.minOffsetWidth, d.minOffsetHeight], s.maxSize = [d.maxOffsetWidth, d.maxOffsetHeight]);
		var g = e.props.transformOrigin || "% %";
		s.transformOrigin = g && We(g) ? g.split(" ") : g, s.startOffsetMatrix = d.offsetMatrix, s.startTransformOrigin = d.transformOrigin, s.isWidth = t?.parentIsWidth ?? (!u[0] && !u[1] || u[0] || !u[1]);
		function _(e) {
			s.ratio = e && isFinite(e) ? e : 0;
		}
		s.startPositions = Zs(e.state);
		function v(e) {
			var t = bo(s.startPositions, e);
			s.fixedDirection = t.fixedDirection, s.fixedPosition = t.fixedPosition, s.fixedOffset = t.fixedOffset;
		}
		function y(t) {
			var n = So(e.state, t);
			s.fixedDirection = n.fixedDirection, s.fixedPosition = n.fixedPosition, s.fixedOffset = n.fixedOffset;
		}
		function b(e) {
			s.minSize = [lt(`${e[0]}`, 0) || 0, lt(`${e[1]}`, 0) || 0];
		}
		function x(e) {
			var t = [e[0] || Infinity, e[1] || Infinity];
			(!Ge(t[0]) || isFinite(t[0])) && (t[0] = lt(`${t[0]}`, 0) || Infinity), (!Ge(t[1]) || isFinite(t[1])) && (t[1] = lt(`${t[1]}`, 0) || Infinity), s.maxSize = t;
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
			dragStart: yo.dragStart(e, new ii().dragStart([0, 0], t))
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
			var E = e.state.is3d, D = r.startOffsetMatrix, O = r.startTransformOrigin, k = E ? 4 : 3, A = un(Ai(t)), j = Math.sqrt(A.length);
			k !== j && (A = Ht(A, j, k));
			var M = Si(D, A, O, k);
			r.startPositions = js(M, C, w, k), r.nextTargetMatrix = A, r.nextAllMatrix = M;
		}
		var N = Bs(e.props, "resizable"), P = N.resizeFormat, F = N.throttleResize, I = F === void 0 ? +!i : F, L = N.parentMoveable, R = N.keepRatioFinally, z = r.direction, B = z, V = 0, H = 0;
		!z[0] && !z[1] && (B = [1, 1]);
		var ee = S && (o ?? N.keepRatio) || !1;
		function te() {
			var e = r.fixedDirection, n = Ec(B, ee, r, t);
			V = n.distWidth, H = n.distHeight;
			var i = B[0] - e[0] || ee ? Math.max(C + V, Yr) : C, a = B[1] - e[1] || ee ? Math.max(w + H, Yr) : w;
			return ee && C && w && (T ? a = i / S : i = a * S), [i, a];
		}
		var ne = J(te(), 2), U = ne[0], W = ne[1];
		f || (r.setFixedDirection(r.fixedDirection), Q(e, "onBeforeResize", Z(e, t, {
			startFixedDirection: r.startFixedDirection,
			startFixedPosition: r.startFixedPosition,
			setFixedDirection: function(e) {
				var t;
				return r.setFixedDirection(e), t = J(te(), 2), U = t[0], W = t[1], [U, W];
			},
			setFixedPosition: function(e) {
				var t;
				return r.setFixedPosition(e), t = J(te(), 2), U = t[0], W = t[1], [U, W];
			},
			boundingWidth: U,
			boundingHeight: W,
			setSize: function(e) {
				var t = J(e, 2);
				U = t[0], W = t[1];
			}
		}, !0)));
		var re = s;
		s || (re = !i && a ? Vi(e, [0, 0]) : r.fixedPosition);
		var ie = [0, 0];
		a || (ie = as(e, U, W, z, re, !l && u, r)), c && (!c[0] && (ie[0] = 0), !c[1] && (ie[1] = 0));
		function ae() {
			var e;
			P && (e = J(P([U, W]), 2), U = e[0], W = e[1]), U = G(U, I), W = G(W, I);
		}
		if (ee) {
			B[0] && B[1] && ie[0] && ie[1] && ($(ie[0]) > $(ie[1]) ? ie[1] = 0 : ie[0] = 0);
			var oe = !ie[0] && !ie[1];
			oe && ae(), B[0] && !B[1] || ie[0] && !ie[1] || oe && T ? (U += ie[0], W = U / S) : (!B[0] && B[1] || !ie[0] && ie[1] || oe && !T) && (W += ie[1], U = W * S);
		} else U += ie[0], W += ie[1], U = Math.max(0, U), W = Math.max(0, W);
		n = J(ft([U, W], b, x, ee ? S : !1), 2), U = n[0], W = n[1], ae(), ee && (d || R) && (T ? W = U / S : U = W * S), V = U - C, H = W - w;
		var se = [V - v, H - y];
		r.prevWidth = V, r.prevHeight = H;
		var ce = Bi(e, U, W, re, h, r);
		if (!(!L && se.every(function(e) {
			return !e;
		}) && ce.every(function(e) {
			return !e;
		}))) {
			var le = yo.drag(e, ri(t, e.state, ce, !!a, !1, "draggable")), ue = le.transform, de = g + V, fe = _ + H, pe = Z(e, t, q({
				width: de,
				height: fe,
				offsetWidth: Math.round(U),
				offsetHeight: Math.round(W),
				startRatio: S,
				boundingWidth: U,
				boundingHeight: W,
				direction: z,
				dist: [V, H],
				delta: se,
				isPinch: !!a,
				drag: le
			}, tc({
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
			var i = nc(e, t, {});
			return !r && Q(e, "onResizeEnd", i), i;
		}
	},
	dragGroupControlCondition: Co,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, q(q({}, t), { isGroup: !0 }));
		if (!r) return !1;
		var i = $i(e, "resizable", t), a = n.startOffsetWidth, o = n.startOffsetHeight;
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
		var l = ta(e, this, "dragControlStart", t, function(t, r) {
			return na(e, t, n, r);
		});
		s(), c();
		var u = function(t) {
			r.setFixedDirection(t), l.forEach(function(r, a) {
				r.setFixedDirection(t), na(e, r.moveable, n, i[a]);
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
			var r = Bs(e.props, "resizable");
			rc(e, "onBeforeResize", function(n) {
				Q(e, "onBeforeResizeGroup", Z(e, t, q(q({}, n), { targets: r.targets }), !0));
			});
			var i = this.dragControl(e, q(q({}, t), { isGroup: !0 }));
			if (i) {
				var a = i.boundingWidth, o = i.boundingHeight, s = i.dist, c = r.keepRatio, l = [a / (a - s[0]), o / (o - s[1])], u = n.fixedPosition, d = ta(e, this, "dragControl", t, function(t, n) {
					var r = J(Jt(nn(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * l[0],
						n.datas.originalY * l[1],
						1
					], 3), 2), i = r[0], a = r[1];
					return q(q({}, n), {
						parentDist: null,
						parentScale: l,
						dragClient: Gt(u, [i, a]),
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
			var r = ta(e, this, "dragControlEnd", t);
			return Q(e, "onResizeGroupEnd", nc(e, t, {
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
function To(e, t, n, r, i) {
	var a = e.props.groupable, o = e.state, s = o.is3d ? 4 : 3, c = t.origin, l = As(e.state.rootMatrix, K([c[0], c[1]], a ? [0, 0] : [o.left, o.top]), s), u = Gt([i.left, i.top], l);
	t.startAbsoluteOrigin = u, t.prevDeg = ht(u, [n, r]) / Math.PI * 180, t.defaultDeg = t.prevDeg, t.prevSnapDeg = 0, t.loop = 0, t.startDist = vt(u, [n, r]);
}
function Eo(e, t, n) {
	var r = n.defaultDeg, i = n.prevDeg, a = i % 360, o = Math.floor(i / 360);
	a < 0 && (a += 360), a > e && a > 270 && e < 90 ? ++o : a < e && a < 90 && e > 270 && --o;
	var s = t * (o * 360 + e - r);
	return n.prevDeg = r + s, s;
}
function Do(e, t, n, r) {
	return Eo(ht(r.startAbsoluteOrigin, [e, t]) / Math.PI * 180, n, r);
}
function Oo(e, t, n, r, i, a) {
	var o = e.props.throttleRotate, s = o === void 0 ? 0 : o, c = n.prevSnapDeg, l = 0, u = !1;
	if (a) {
		var d = is(e, t, r, i + r);
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
function ko(e, t, n) {
	var r = J(t, 4), i = r[0], a = r[1], o = r[2], s = r[3];
	if (e === "none") return [];
	if (Ue(e)) return e.map(function(e) {
		return ko(e, [
			i,
			a,
			o,
			s
		], n)[0];
	});
	var c = J((e || "top").split("-"), 2), l = c[0], u = c[1], d = [i, a];
	l === "left" ? d = [o, i] : l === "right" ? d = [a, s] : l === "bottom" && (d = [s, o]);
	var f = [(d[0][0] + d[1][0]) / 2, (d[0][1] + d[1][1]) / 2], p = Hs(d, n);
	if (u) {
		var m = u === "top" || u === "left", h = l === "bottom" || l === "left";
		f = d[m && !h || !m && h ? 0 : 1];
	}
	return [[f, p]];
}
function Ao(e, t) {
	if (t.isRequest) return t.requestAble === "rotatable";
	var n = t.inputEvent.target;
	if (St(n, X("rotation-control")) || e.props.rotateAroundControls && St(n, X("around-control")) || St(n, X("control")) && St(n, X("rotatable"))) return !0;
	var r = e.props.rotationTarget;
	return r ? Sc(r, !0).some(function(e) {
		return e ? n === e || n.contains(e) : !1;
	}) : !1;
}
var jo = {
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
		var n = Bs(e.props, "rotatable"), r = n.rotatable, i = n.rotationPosition, a = n.zoom, o = n.renderDirections, s = n.rotateAroundControls, c = n.resolveAblesWithRotatable, l = e.getState(), u = l.renderPoses, d = l.direction;
		if (!r) return null;
		var f = ko(i, u, d), p = [];
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
			var m = ct(c || {}), h = {};
			m.forEach(function(e) {
				c[e].forEach(function(t) {
					h[t] = e;
				});
			});
			var g = [];
			Ue(o) && (g = o.map(function(e) {
				var t = h[e];
				return {
					data: t ? { resolve: t } : {},
					classNames: t ? ["move"] : [],
					dir: e
				};
			})), p.push.apply(p, Y([], J(ra(e, "rotatable", g, t)), !1));
		}
		return s && p.push.apply(p, Y([], J(ua(e, t)), !1)), p;
	},
	dragControlCondition: Ao,
	dragControlStart: function(e, t) {
		var n, r = t.datas, i = t.clientX, a = t.clientY, o = t.parentRotate, s = t.parentFlag, c = t.isPinch, l = t.isRequest, u = e.state, d = u.target, f = u.left, p = u.top, m = u.direction, h = u.beforeDirection, g = u.targetTransform, _ = u.moveableClientRect, v = u.offsetMatrix, y = u.targetMatrix, b = u.allMatrix, x = u.width, S = u.height;
		if (!l && !d) return !1;
		var C = e.getRect();
		r.rect = C, r.transform = g, r.left = f, r.top = p;
		var w = function(t) {
			var n = So(e.state, t);
			r.fixedDirection = n.fixedDirection, r.fixedOffset = n.fixedOffset, r.fixedPosition = n.fixedPosition, P && P.setFixedPosition(t);
		}, T = function(t) {
			var n = xo(e.state, t);
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
				var A = $r[k.getAttribute("data-direction") || ""];
				if (A) {
					r.isControl = !0, r.isAroundControl = St(k, X("around-control")), r.controlDirection = A;
					var j = k.getAttribute("data-resolve");
					j && (r.resolveAble = j), n = J(bi(Fs(u.rootMatrix, u.renderPoses, _), A), 2), E = n[0], D = n[1];
				}
			}
			r.beforeInfo = { origin: C.beforeOrigin }, r.afterInfo = { origin: C.origin }, r.absoluteInfo = {
				origin: C.origin,
				startValue: C.rotation
			};
			var M = w;
			w = function(t) {
				var n = u.is3d ? 4 : 3, i = J(Gt(zt(y, n), t), 2), a = i[0], o = i[1], s = Jt(v, Vt([a, o], n)), c = Jt(b, Vt([t[0], t[1]], n));
				M(t);
				var l = u.posDelta;
				r.beforeInfo.origin = K(s, l), r.afterInfo.origin = K(c, l), r.absoluteInfo.origin = K(c, l), To(e, r.beforeInfo, E, D, _), To(e, r.afterInfo, E, D, _), To(e, r.absoluteInfo, E, D, _);
			}, T = function(e) {
				var t = bi([
					[0, 0],
					[x, 0],
					[0, S],
					[x, S]
				], e);
				w(t);
			};
		}
		r.startClientX = E, r.startClientY = D, r.direction = m, r.beforeDirection = h, r.startValue = 0, r.datas = {}, Ei(e, t, "rotate");
		var N = !1, P = !1;
		r.isControl && r.resolveAble && r.resolveAble === "resizable" && (P = wo.dragControlStart(e, q(q({}, new ii("resizable").dragStart([0, 0], t)), {
			parentPosition: r.controlPosition,
			parentFixedPosition: r.fixedPosition
		}))), P || (N = yo.dragStart(e, new ii().dragStart([0, 0], t))), w(qs(e));
		var F = Z(e, t, q(q({
			set: function(e) {
				r.startValue = e * Math.PI / 180;
			},
			setFixedDirection: T,
			setFixedPosition: w
		}, Ti(e, t)), {
			dragStart: N,
			resizeStart: P
		}));
		return r.isRotate = Q(e, "onRotateStart", F) !== !1, u.snapRenderInfo = { request: t.isRequest }, r.isRotate ? F : !1;
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.clientDistX, s = t.clientDistY, c = t.parentRotate, l = t.parentFlag, u = t.isPinch, d = t.groupDelta, f = t.resolveMatrix, p = a.beforeDirection, m = a.beforeInfo, h = a.afterInfo, g = a.absoluteInfo, _ = a.isRotate, v = a.startValue, y = a.rect, b = a.startClientX, x = a.startClientY;
		if (_) {
			li(e, t, "rotate");
			var S = p * ci(t), C = e.props.parentMoveable, w = 0, T, E, D = 0, O, k, A = 0, j, M, N = 180 / Math.PI * v, P = g.startValue, F = !1, I = b + o, L = x + s;
			if (!l && "parentDist" in t) {
				var R = t.parentDist;
				T = R, O = R, j = R;
			} else u || l ? (T = Eo(c, p, m), O = Eo(c, S, h), j = Eo(c, S, g)) : (T = Do(I, L, p, m), O = Do(I, L, S, h), j = Do(I, L, S, g), F = !0);
			if (E = N + T, k = N + O, M = P + j, Q(e, "onBeforeRotate", Z(e, t, {
				beforeRotation: E,
				rotation: k,
				absoluteRotation: M,
				setRotation: function(e) {
					O = e - N, T = O, j = O;
				}
			}, !0)), n = J(Oo(e, y, m, T, N, F), 3), w = n[0], T = n[1], E = n[2], r = J(Oo(e, y, h, O, N, F), 3), D = r[0], O = r[1], k = r[2], i = J(Oo(e, y, g, j, P, F), 3), A = i[0], j = i[1], M = i[2], !(!A && !D && !w && !C && !f)) {
				var z = ui(a, `rotate(${k}deg)`, `rotate(${O}deg)`);
				f && (a.fixedPosition = Pi(e, a.targetAllTransform, a.fixedDirection, a.fixedOffset, a));
				var B = zi(e, O, a), V = K(Gt(d || [0, 0], B), a.prevInverseDist || [0, 0]);
				a.prevInverseDist = B, a.requestValue = null;
				var H = Ni(e, z, V, u, t), ee = H, te = vt([I, L], g.startAbsoluteOrigin) - g.startDist, ne = void 0;
				if (a.resolveAble === "resizable") {
					var U = wo.dragControl(e, q(q({}, ri(t, e.state, [t.deltaX, t.deltaY], !!u, !1, "resizable")), {
						resolveMatrix: !0,
						parentDistance: te
					}));
					U && (ne = U, ee = tc(ee, U, t));
				}
				var W = Z(e, t, q(q({
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
					resize: ne
				}, H), ee));
				return Q(e, "onRotate", W), W;
			}
		}
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (n.isRotate) {
			n.isRotate = !1;
			var r = nc(e, t, {});
			return Q(e, "onRotateEnd", r), r;
		}
	},
	dragGroupControlCondition: Ao,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = e.state, i = r.left, a = r.top, o = r.beforeOrigin, s = this.dragControlStart(e, t);
		if (!s) return !1;
		s.set(n.beforeDirection * e.rotation);
		var c = ta(e, this, "dragControlStart", t, function(e, t) {
			var n = e.state, r = n.left, s = n.top, c = n.beforeOrigin, l = Gt(K([r, s], [i, a]), K(c, o));
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
			rc(e, "onBeforeRotate", function(n) {
				Q(e, "onBeforeRotateGroup", Z(e, t, q(q({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = n.beforeDirection, a = r.beforeDist, o = a / 180 * Math.PI, s = ta(e, this, "dragControl", t, function(e, t) {
					var n = t.datas.startGroupClient, r = J(t.datas.groupClient, 2), s = r[0], c = r[1], l = J($t(n, o * i), 2), u = l[0], d = l[1], f = [u - s, d - c];
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
			var r = ta(e, this, "dragControlEnd", t);
			return Q(e, "onRotateGroupEnd", nc(e, t, {
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
function Mo(e, t) {
	var n, r = e.direction, i = e.classNames, a = e.size, o = e.pos, s = e.zoom, c = e.key, l = r === "horizontal", u = l ? "Y" : "X";
	return t.createElement("div", {
		key: c,
		className: i.join(" "),
		style: (n = {}, n[l ? "width" : "height"] = `${a}`, n.transform = `translate(${o[0]}, ${o[1]}) translate${u}(-50%) scale${u}(${s})`, n)
	});
}
function No(e, t) {
	return Mo(q(q({}, e), {
		classNames: Y([X("line", "guideline", e.direction)], J(e.classNames), !1).filter(function(e) {
			return e;
		}),
		size: e.size || `${e.sizeValue}px`,
		pos: e.pos || e.posValue.map(function(e) {
			return `${G(e, .1)}px`;
		})
	}), t);
}
function Po(e, t, n, r, i, a, o, s) {
	var c = e.props.zoom;
	return n.map(function(e, n) {
		var l = e.type, u = e.pos, d = [0, 0];
		return d[o] = r, d[+!o] = -i + u, No({
			key: `${t}TargetGuideline${n}`,
			classNames: [X("target", "bold", l)],
			posValue: d,
			sizeValue: a,
			zoom: c,
			direction: t
		}, s);
	});
}
function Fo(e, t, n, r, i, a) {
	var o = e.props, s = o.zoom, c = o.isDisplayInnerSnapDigit, l = t === "horizontal" ? xa : Sa, u = i[l.start], d = i[l.end];
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
		return No({
			key: `${t}-default-guideline-${n}`,
			classNames: c ? [X("bold"), l] : [X("normal"), l],
			direction: t,
			posValue: u,
			sizeValue: o,
			zoom: s
		}, a);
	});
}
function Io(e, t, n, r, i, a, o, s) {
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
	}, No({
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
function Lo(e, t, n, r) {
	var i = e === "vertical" ? 0 : 1, a = +(e === "vertical"), o = i ? xa : Sa, s = n[o.start], c = n[o.end];
	return cc(t, function(e) {
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
function Ro(e, t, n, r, i) {
	var a = e.props.isDisplayInnerSnapDigit, o = [];
	return ["vertical", "horizontal"].forEach(function(s) {
		var c = t.filter(function(e) {
			return e.type === s;
		}), l = +(s === "vertical"), u = +!l, d = Lo(s, c, r, a), f = l ? Sa : xa, p = l ? xa : Sa, m = r[f.start], h = r[f.end];
		d.forEach(function(t) {
			var a = t.total, c = t.start, d = t.end, g = t.inner, _ = n[u] + a[0].pos[u] - r[p.start], v = r;
			c.forEach(function(t) {
				var r = t.elementRect.rect, a = v[f.start] - r[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.start] - m - a, c[u] = _, o.push(Io(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), v = r, d.forEach(function(t) {
				var r = t.elementRect.rect, a = r[f.start] - v[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.end] - m, c[u] = _, o.push(Io(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), g.forEach(function(t) {
				var r = t.elementRect.rect, a = m - r[f.start], c = r[f.end] - h, d = [0, 0], p = [0, 0];
				d[l] = n[l] - a, d[u] = _, p[l] = n[l] + h - m, p[u] = _, o.push(Io(e, s, "dashed", o.length, a, d, t.className, i)), o.push(Io(e, s, "dashed", o.length, c, p, t.className, i));
			});
		});
	}), o;
}
function zo(e, t, n, r, i) {
	var a = [];
	return ["horizontal", "vertical"].forEach(function(o) {
		var s = t.filter(function(e) {
			return e.type === o;
		}).slice(0, 1), c = o === "vertical" ? 0 : 1, l = +!c, u = c ? Sa : xa, d = c ? xa : Sa, f = r[u.start], p = r[u.end], m = r[d.start], h = r[d.end];
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
				d[l] += _ - m, a.push(Io(e, c ? "vertical" : "horizontal", "gap", a.length, r, d, s, i));
			});
		});
	}), a;
}
function Bo(e) {
	var t = e.state, n = t.containerClientRect, r = t.hasFixed, i = n.overflow, a = n.scrollHeight, o = n.scrollWidth, s = n.clientHeight, c = n.clientWidth, l = n.clientLeft, u = n.clientTop, d = e.props, f = d.snapGap, p = f === void 0 || f, m = d.verticalGuidelines, h = d.horizontalGuidelines, g = d.snapThreshold, _ = g === void 0 ? 5 : g, v = d.maxSnapElementGuidelineDistance, y = v === void 0 ? Infinity : v, b = d.isDisplayGridGuidelines, x = Ms(Zs(e.state)), S = x.top, C = x.left, w = x.bottom, T = x.right, E = {
		top: S,
		left: C,
		bottom: w,
		right: T,
		center: (C + T) / 2,
		middle: (S + w) / 2
	}, D = Y([], J(Go(e)), !1), O = (t.snapThresholdInfo?.multiples ?? [1, 1]).map(function(e) {
		return e * _;
	});
	p && D.push.apply(D, Y([], J(Vo(e, E, O)), !1));
	var k = q({}, t.snapOffset || {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	});
	if (D.push.apply(D, Y([], J(Uo(e, i ? o : c, i ? a : s, l, u, k, b)), !1)), r) {
		var A = n.left, j = n.top;
		k.left += A, k.top += j, k.right += A, k.bottom += j;
	}
	return D.push.apply(D, Y([], J(qo(h || !1, m || !1, i ? o : c, i ? a : s, l, u, k)), !1)), D = D.filter(function(e) {
		var t = e.element, n = e.elementRect, r = e.type;
		if (!t || !n) return !0;
		var i = n.rect;
		return Wo(E, i, r, y);
	}), D;
}
function Vo(e, t, n) {
	var r = e.props, i = r.maxSnapElementGuidelineDistance, a = i === void 0 ? Infinity : i, o = r.maxSnapElementGapDistance, s = o === void 0 ? Infinity : o, c = e.state.elementRects, l = [];
	return [[
		"vertical",
		xa,
		Sa
	], [
		"horizontal",
		Sa,
		xa
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
			x && Wo(t, m, i, a) && (x > s || l.push({
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
function Ho(e, t, n, r) {
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
				var f = m[l], p = m[s], g = xt(h.map(function(e) {
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
				var x = (-e + 1) / 2, S = Be(p - d, p - d + f, x, 1 - x);
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
function Uo(e, t, n, r, i, a, o) {
	r === void 0 && (r = 0), i === void 0 && (i = 0);
	var s = e.props, c = e.state, l = s.snapGridWidth, u = l === void 0 ? 0 : l, d = s.snapGridHeight, f = d === void 0 ? 0 : d, p = [], m = a.left, h = a.top, g = [0, 0];
	Ho(e, r, i, a);
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
function Wo(e, t, n, r) {
	return n === "horizontal" ? $(e.right - t.left) <= r || $(e.left - t.right) <= r || e.left <= t.right && t.left <= e.right : n !== "vertical" || $(e.bottom - t.top) <= r || $(e.top - t.bottom) <= r || e.top <= t.bottom && t.top <= e.bottom;
}
function Go(e) {
	var t = e.state, n = e.props.elementGuidelines, r = n === void 0 ? [] : n;
	if (!r.length) return t.elementRects = [], [];
	var i = (t.elementRects || []).filter(function(e) {
		return !e.refresh;
	}), a = r.map(function(e) {
		return He(e) && "element" in e ? q(q({}, e), { element: xc(e.element, !0) }) : { element: xc(e, !0) };
	}).filter(function(e) {
		return e.element;
	}), o = En(i.map(function(e) {
		return e.element;
	}), a.map(function(e) {
		return e.element;
	})), s = o.maintained, c = o.added, l = [];
	s.forEach(function(e) {
		var t = J(e, 2), n = t[0], r = t[1];
		l[r] = i[n];
	}), Jo(e, c.map(function(e) {
		return a[e];
	})).map(function(e, t) {
		l[c[t]] = e;
	}), t.elementRects = l;
	var u = Ta(e.props.elementSnapDirections), d = [];
	return l.forEach(function(e) {
		var t = e.element, n = e.top, r = n === void 0 ? u.top : n, i = e.left, a = i === void 0 ? u.left : i, o = e.right, s = o === void 0 ? u.right : o, c = e.bottom, l = c === void 0 ? u.bottom : c, f = e.center, p = f === void 0 ? u.center : f, m = e.middle, h = m === void 0 ? u.middle : m, g = e.className, _ = e.rect, v = Da({
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
				elementDirection: ba[S[r]] || S[r],
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
				elementDirection: ba[x[r]] || x[r],
				direction: ""
			});
		});
	}), d;
}
function Ko(e, t) {
	return e ? e.map(function(e) {
		var n = He(e) ? e : { pos: e }, r = n.pos;
		return Ge(r) ? n : q(q({}, n), { pos: lt(r, t) });
	}) : [];
}
function qo(e, t, n, r, i, a, o) {
	i === void 0 && (i = 0), a === void 0 && (a = 0), o === void 0 && (o = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	});
	var s = [], c = o.left, l = o.top, u = o.bottom, d = n + o.right - c, f = r + u - l;
	return Ko(e, f).forEach(function(e) {
		s.push({
			type: "horizontal",
			pos: [c, G(e.pos - a + l, .1)],
			size: d,
			className: e.className,
			direction: ""
		});
	}), Ko(t, d).forEach(function(e) {
		s.push({
			type: "vertical",
			pos: [G(e.pos - i + c, .1), l],
			size: f,
			className: e.className,
			direction: ""
		});
	}), s;
}
function Jo(e, t) {
	if (!t.length) return [];
	var n = e.props.groupable, r = e.state, i = r.containerClientRect, a = r.rootMatrix, o = r.is3d, s = r.offsetDelta, c = o ? 4 : 3, l = J(Oa(a, i, c), 2), u = l[0], d = l[1], f = n ? 0 : s[0], p = n ? 0 : s[1];
	return t.map(function(e) {
		var t = e.element.getBoundingClientRect(), n = t.left - u - f, r = t.top - d - p, i = r + t.height, o = n + t.width, s = J(fc(a, [n, r], c), 2), l = s[0], m = s[1], h = J(fc(a, [o, i], c), 2), g = h[0], _ = h[1];
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
function Yo(e) {
	var t = e.state, n = t.container, r = e.props.snapContainer || n;
	if (t.snapContainer === r && t.guidelines && t.guidelines.length) return !1;
	var i = t.containerClientRect, a = {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	};
	if (n !== r) {
		var o = xc(r, !0);
		if (o) {
			var s = Ks(o), c = wc(t, [s.left - i.left, s.top - i.top]), l = wc(t, [s.right - i.right, s.bottom - i.bottom]);
			a.left = G(c[0], 1e-5), a.top = G(c[1], 1e-5), a.right = G(l[0], 1e-5), a.bottom = G(l[1], 1e-5);
		}
	}
	return t.snapContainer = r, t.snapOffset = a, t.guidelines = Bo(e), t.enableSnap = !0, !0;
}
function Xo(e, t, n, r, i, a) {
	var o = js(e, t, n, a ? 4 : 3);
	return Xs(o, K(i, bi(o, r)));
}
function Zo(e) {
	return e ? e / $(e) : 0;
}
function Qo(e, t, n, r, i, a) {
	var o = a.fixedDirection, s = Wa(n, o, r), c = eo(e, t, n, r), l = Y(Y([], J(ho(e, t, s, r, i, a)), !1), J(Za(e, c, a)), !1), u = Ua(l, 0), d = Ua(l, 1);
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
function $o(e, t, n, r, i, a, o, s, c) {
	var l = bi(t, o), u = fo(e, s, {
		vertical: [l[0]],
		horizontal: [l[1]]
	}), d = u.horizontal.offset, f = u.vertical.offset;
	if (G(f, Jr) || G(d, Jr)) {
		var p = J(mi({
			datas: c,
			distX: -f,
			distY: -d
		}), 2), m = p[0], h = p[1], g = Math.min(i || Infinity, n + o[0] * m), _ = Math.min(a || Infinity, r + o[1] * h);
		return [g - n, _ - r];
	}
	return [0, 0];
}
function es(e, t, n, r, i, a, o, s) {
	for (var c = Zs(e.state), l = e.props.keepRatio, u = 0, d = 0, f = 0; f < 2; ++f) {
		var p = Qo(e, t(u, d), i, l, o, s), m = p.width, h = p.height, g = m.isBound, _ = h.isBound, v = m.offset, y = h.offset;
		if (f === 1 && (g || (v = 0), _ || (y = 0)), f === 0 && o && !g && !_) return [0, 0];
		if (l) {
			var b = $(v) * (n ? 1 / n : 1), x = $(y) * (r ? 1 / r : 1);
			(g && _ ? b < x : _ || !g && b < x) ? v = n * y / r : y = r * v / n;
		}
		u += v, d += y;
	}
	if (!l && i[0] && i[1]) {
		var S = vo(e, c, i, a, s), C = S.maxWidth, w = S.maxHeight, T = J($o(e, t(u, d).map(function(e) {
			return e.map(function(e) {
				return G(e, Jr);
			});
		}), n + u, r + d, C, w, i, o, s), 2), v = T[0], y = T[1];
		u += v, d += y;
	}
	return [u, d];
}
function ts(e) {
	return e < 0 && (e = e % 360 + 360), e %= 360, e;
}
function ns(e, t) {
	t = ts(t);
	var n = Math.floor(e / 360), r = n * 360 + 360 - t, i = n * 360 + t;
	return $(e - r) < $(e - i) ? r : i;
}
function rs(e, t) {
	e = ts(e), t = ts(t);
	var n = ts(e - t);
	return Math.min(n, 360 - n);
}
function is(e, t, n, r) {
	var i = e.props, a = i[Aa] ?? 5, o = i[ja];
	if (wa(e, "rotatable")) {
		var s = t.pos1, c = t.pos2, l = t.pos3, u = t.pos4, d = t.origin, f = n * Math.PI / 180, p = [
			s,
			c,
			l,
			u
		].map(function(e) {
			return K(e, d);
		}), m = p.map(function(e) {
			return $t(e, f);
		}), h = Y(Y([], J(_a(e, p, m, d, n)), !1), J(io(e, p, m, d, n)), !1);
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
			return rs(e, r) - rs(t, r);
		})[0];
		if (rs(_, r) <= a) return {
			isSnap: !0,
			dist: n + ns(r, _) - r
		};
	}
	return {
		isSnap: !1,
		dist: n
	};
}
function as(e, t, n, r, i, a, o) {
	if (!wa(e, "resizable")) return [0, 0];
	var s = o.fixedDirection, c = o.nextAllMatrix, l = e.state, u = l.allMatrix, d = l.is3d;
	return es(e, function(e, r) {
		return Xo(c || u, t + e, n + r, s, i, d);
	}, t, n, r, i, a, o);
}
function os(e, t, n, r, i) {
	if (!wa(e, "scalable")) return [0, 0];
	var a = i.startOffsetWidth, o = i.startOffsetHeight, s = i.fixedPosition, c = i.fixedDirection, l = i.is3d, u = es(e, function(e, n) {
		return Xo(wi(i, Gt(t, [e / a, n / o])), a, o, c, s, l);
	}, a, o, n, s, r, i);
	return [u[0] / a, u[1] / o];
}
function ss(e, t) {
	t.absolutePoses = Zs(e.state);
}
function cs(e) {
	var t = [];
	return e.forEach(function(e) {
		e.guidelineInfos.forEach(function(n) {
			var r = n.guideline;
			at(t, function(e) {
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
function ls(e, t, n, r, i, a) {
	var o = da(fa(e, a), t, n), s = o.vertical, c = o.horizontal, l = Ca();
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
	var u = ao(e), d = u.boundMap, f = u.vertical, p = u.horizontal;
	return f.forEach(function(e) {
		it(r, function(t) {
			var n = t.type, r = t.pos;
			return n === "bounds" && r === e;
		}) >= 0 || r.push({
			type: "bounds",
			pos: e
		});
	}), p.forEach(function(e) {
		it(i, function(t) {
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
var us = vc("", ["resizable", "scalable"]), ds = {
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
		Aa,
		ja,
		Ma,
		Na,
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
		if (!l || !l.render || !wa(e, "")) return jc(e, "boundMap", Ca(), function(e) {
			return JSON.stringify(e);
		}), jc(e, "innerBoundMap", Ca(), function(e) {
			return JSON.stringify(e);
		}), [];
		n.guidelines = Bo(e);
		var f = Math.min(a[0], o[0], s[0], c[0]), p = Math.min(a[1], o[1], s[1], c[1]), m = l.externalPoses || [], h = Zs(e.state), g = [], _ = [], v = [], y = [], b = [], x = Ms(h), S = x.width, C = x.height, w = x.top, T = x.left, E = x.bottom, D = x.right, O = {
			left: T,
			right: D,
			top: w,
			bottom: E,
			center: (T + D) / 2,
			middle: (w + E) / 2
		}, k = m.length > 0, A = k ? Ms(m) : {};
		if (!l.request) {
			if (l.direction && b.push(Va(e, h, l.direction, d, d)), l.snap) {
				var j = Ms(h);
				l.center && (j.middle = (j.top + j.bottom) / 2, j.center = (j.left + j.right) / 2), b.push(Ra(e, j, d, d));
			}
			k && (l.center && (A.middle = (A.top + A.bottom) / 2, A.center = (A.left + A.right) / 2), b.push(Ra(e, A, d, d))), b.forEach(function(e) {
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
				})), !1)), v.push.apply(v, Y([], J(cs(t)), !1)), y.push.apply(y, Y([], J(cs(n)), !1));
			});
		}
		var M = ls(e, [T, D], [w, E], g, _), N = M.boundMap, P = M.innerBoundMap;
		k && ls(e, [A.left, A.right], [A.top, A.bottom], g, _, l.externalBounds);
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
		var R = jc(e, "boundMap", N, function(e) {
			return JSON.stringify(e);
		}, Ca()), z = jc(e, "innerBoundMap", P, function(e) {
			return JSON.stringify(e);
		}, Ca());
		return (N === R || P === z) && Q(e, "onBound", {
			bounds: N,
			innerBounds: P
		}, !0), Y(Y(Y(Y(Y(Y([], J(Ro(e, I, [f, p], O, t)), !1), J(zo(e, L, [f, p], O, t)), !1), J(Fo(e, "horizontal", y, [i, r], O, t)), !1), J(Fo(e, "vertical", v, [i, r], O, t)), !1), J(Po(e, "horizontal", _, f, r, S, 0, t)), !1), J(Po(e, "vertical", g, p, i, C, 1, t)), !1);
	},
	dragStart: function(e, t) {
		e.state.snapRenderInfo = {
			request: t.isRequest,
			snap: !0,
			center: !0
		}, Yo(e);
	},
	drag: function(e) {
		var t = e.state;
		Yo(e) || (t.guidelines = Bo(e)), t.snapRenderInfo && (t.snapRenderInfo.render = !0);
	},
	pinchStart: function(e) {
		this.unset(e);
	},
	dragEnd: function(e) {
		this.unset(e);
	},
	dragControlCondition: function(e, t) {
		if (us(e, t) || Ao(e, t)) return !0;
		if (!t.isRequest && t.inputEvent) return St(t.inputEvent.target, X("snap-control"));
	},
	dragControlStart: function(e) {
		e.state.snapRenderInfo = null, Yo(e);
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
		e.state.snapRenderInfo = null, Yo(e);
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
function fs(e, t) {
	return [e[0] * t[0], e[1] * t[1]];
}
function X() {
	var e = [...arguments];
	return Te.apply(void 0, Y([Gr], J(e), !1));
}
function ps(e) {
	e();
}
function ms(e) {
	return !e || e === "none" ? [
		1,
		0,
		0,
		1,
		0,
		0
	] : He(e) ? e : un(e);
}
function hs(e, t, n) {
	return Ut(t, on(n, t), e, on(n.map(function(e) {
		return -e;
	}), t));
}
function gs(e, t, n) {
	return t === "%" ? Ds(e.ownerSVGElement)[n ? "width" : "height"] / 100 : 1;
}
function _s(e) {
	return ys(ic(e, ":before")).map(function(t, n) {
		var r = tt(t), i = r.value, a = r.unit;
		return i * gs(e, a, n === 0);
	});
}
function vs(e) {
	return e ? e.split(" ") : ["0", "0"];
}
function ys(e) {
	return vs(e.transformOrigin);
}
function bs(e) {
	var t = Qi(e)("transform");
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
function xs(e, t, n, r, i) {
	var a = Ot(e) || kt(e), o = !1, s, c;
	if (!e || n) s = e;
	else {
		var l = e?.assignedSlot?.parentElement, u = e.parentElement;
		l ? (o = !0, c = u, s = l) : s = u;
	}
	for (var d = !1, f = e === t || s === t, p = "relative", m = 1, h = parseFloat(i?.("zoom")) || 1, g = i?.("position"); s && s !== a;) {
		t === s && (f = !0);
		var _ = Qi(s), v = s.tagName.toLowerCase(), y = bs(s), b = _("willChange"), x = parseFloat(_("zoom")) || 1;
		if (p = _("position"), r && x !== 1) {
			m = x;
			break;
		}
		if (!n && r && h !== 1 && g && g !== "absolute" || v === "svg" || v === "foreignobject" || p !== "static" || y && y !== "none" || b === "transform") break;
		var S = e?.assignedSlot?.parentNode, C = s.parentNode;
		S && (o = !0, c = C);
		var w = C;
		if (w && w.nodeType === 11) {
			s = w.host, d = !0, p = Qi(s)("position");
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
function Ss(e, t) {
	var n, r = e.tagName.toLowerCase(), i = e.offsetLeft, a = e.offsetTop, o = Qi(e), s = Ve(i), c = !s, l, u;
	return !c && (r !== "svg" || e.ownerSVGElement) ? (l = Ir ? _s(e) : vs(o("transformOrigin")).map(function(e) {
		return parseFloat(e);
	}), u = l.slice(), c = !0, r === "svg" ? (i = 0, a = 0) : (n = J(ks(e, l, e === t && t.tagName.toLowerCase() === "g"), 4), i = n[0], a = n[1], l[0] = n[2], l[1] = n[3])) : (l = vs(o("transformOrigin")).map(function(e) {
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
function Cs(e, t) {
	var n = Qi(e), r = Qi(kt(e)), i = r("position");
	if (!t && (!i || i === "static")) return [0, 0];
	var a = parseInt(r("marginLeft"), 10), o = parseInt(r("marginTop"), 10);
	return n("position") === "absolute" && ((n("top") !== "auto" || n("bottom") !== "auto") && (o = 0), (n("left") !== "auto" || n("right") !== "auto") && (a = 0)), [a, o];
}
function ws(e) {
	e.forEach(function(e) {
		var t = e.matrix;
		t && (e.matrix = Ht(t, 3, 4));
	});
}
function Ts(e) {
	for (var t = e.parentElement, n = !1, r = kt(e); t;) {
		var i = ic(t).transform;
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
function Es(e, t) {
	return t === void 0 && (t = e.length > 9), `${t ? "matrix3d" : "matrix"}(${qt(e, !t).join(",")})`;
}
function Ds(e) {
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
function Os(e, t) {
	var n, r = Ds(e), i = r.width, a = r.height, o = r.clientWidth, s = r.clientHeight, c = o / i, l = s / a, u = e.preserveAspectRatio.baseVal, d = u.align, f = u.meetOrSlice, p = [0, 0], m = [c, l], h = [0, 0];
	if (d !== 1) {
		var g = (d - 2) % 3, _ = Math.floor((d - 2) / 3);
		p[0] = i * g / 2, p[1] = a * _ / 2;
		var v = f === 2 ? Math.max(l, c) : Math.min(c, l);
		m[0] = v, m[1] = v, h[0] = (o - i) / 2 * g, h[1] = (s - a) / 2 * _;
	}
	var y = an(m, t);
	return n = J(h, 2), y[t * (t - 1)] = n[0], y[t * (t - 1) + 1] = n[1], hs(y, t, p);
}
function ks(e, t, n) {
	var r = e.tagName.toLowerCase();
	if (!e.getBBox || !n && r === "g") return [
		0,
		0,
		0,
		0
	];
	var i = Qi(e)("transform-box") === "fill-box", a = e.getBBox(), o = Ds(e.ownerSVGElement), s = a.x, c = a.y;
	r === "foreignobject" && !s && !c && (s = parseFloat(e.getAttribute("x")) || 0, c = parseFloat(e.getAttribute("y")) || 0);
	var l = s - o.x, u = c - o.y;
	return [
		l,
		u,
		i ? t[0] : t[0] - l,
		i ? t[1] : t[1] - u
	];
}
function As(e, t, n) {
	return Jt(e, Vt(t, n), n);
}
function js(e, t, n, r) {
	return [
		[0, 0],
		[t, 0],
		[0, n],
		[t, n]
	].map(function(t) {
		return As(e, t, r);
	});
}
function Ms(e) {
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
function Ns(e, t, n, r) {
	return Ms(js(e, t, n, r));
}
function Ps(e, t, n, r, i) {
	var a, o = e.target, s = e.origin, c = t.matrix, l = Vs(o), u = l.offsetWidth, d = l.offsetHeight, f = n.getBoundingClientRect(), p = [0, 0];
	n === kt(n) && (p = Cs(o, !0));
	for (var m = o.getBoundingClientRect(), h = m.left - f.left + n.scrollLeft - (n.clientLeft || 0) + p[0], g = m.top - f.top + n.scrollTop - (n.clientTop || 0) + p[1], _ = m.width, v = m.height, y = Ut(r, i, c), b = Ns(y, u, d, r), x = b.left, S = b.top, C = b.width, w = b.height, T = As(y, s, r), E = K(T, [x, S]), D = [h + E[0] * _ / C, g + E[1] * v / w], O = [0, 0], k = 0; ++k < 10;) {
		var A = Lt(i, r);
		a = J(K(As(A, D, r), As(A, T, r)), 2), O[0] = a[0], O[1] = a[1];
		var j = Ns(Ut(r, i, on(O, r), c), u, d, r), M = j.left, N = j.top, P = M - h, F = N - g;
		if ($(P) < 2 && $(F) < 2) break;
		D[0] -= P, D[1] -= F;
	}
	return O.map(function(e) {
		return Math.round(e);
	});
}
function Fs(e, t, n) {
	var r = e.length === 16 ? 4 : 3, i = t.map(function(t) {
		return As(e, t, r);
	}), a = n.left, o = n.top;
	return i.map(function(e) {
		return [e[0] + a, e[1] + o];
	});
}
function Is(e) {
	return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Ls(e, t) {
	return Is([t[0] - e[0], t[1] - e[1]]);
}
function Rs(e, t, n, r) {
	n === void 0 && (n = 1), r === void 0 && (r = ht(e, t));
	var i = Ls(e, t);
	return {
		transform: `translateY(-50%) translate(${e[0]}px, ${e[1]}px) rotate(${r}rad) scaleY(${n})`,
		width: `${i}px`
	};
}
function zs(e, t) {
	var n = [...arguments].slice(2), r = n.length;
	return { transform: `translateZ(0px) translate(${n.reduce(function(e, t) {
		return e + t[0];
	}, 0) / r}px, ${n.reduce(function(e, t) {
		return e + t[1];
	}, 0) / r}px) rotate(${e}rad) scale(${t})` };
}
function Bs(e, t) {
	var n = e[t];
	return He(n) ? q(q({}, e), n) : e;
}
function Vs(e) {
	var t = e && !Ve(e.offsetWidth), n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = Infinity, h = Infinity, g = Infinity, _ = Infinity, v = 0, y = 0, b = !1;
	if (e) {
		if (!t && e.ownerSVGElement) {
			var x = e.getBBox();
			b = !0, n = x.width, r = x.height, o = n, s = r, c = n, l = r, i = n, a = r;
		} else {
			var S = Qi(e), C = e.style, w = S("boxSizing") === "border-box", T = parseFloat(S("borderLeftWidth")) || 0, E = parseFloat(S("borderRightWidth")) || 0, D = parseFloat(S("borderTopWidth")) || 0, O = parseFloat(S("borderBottomWidth")) || 0, k = parseFloat(S("paddingLeft")) || 0, A = parseFloat(S("paddingRight")) || 0, j = parseFloat(S("paddingTop")) || 0, M = parseFloat(S("paddingBottom")) || 0, N = k + A, P = j + M, F = T + E, I = D + O, L = N + F, R = P + I, z = S("position"), B = 0, V = 0;
			if ("clientLeft" in e) {
				var H = null;
				if (H = z === "absolute" ? xs(e, kt(e)).offsetParent : e.parentElement, H) {
					var ee = Qi(H);
					B = parseFloat(ee("width")), V = parseFloat(ee("height"));
				}
			}
			u = Math.max(N, lt(S("minWidth"), B) || 0), d = Math.max(P, lt(S("minHeight"), V) || 0), m = lt(S("maxWidth"), B), h = lt(S("maxHeight"), V), isNaN(m) && (m = Infinity), isNaN(h) && (h = Infinity), v = lt(C.width, 0) || 0, y = lt(C.height, 0) || 0, o = parseFloat(S("width")) || 0, s = parseFloat(S("height")) || 0, c = $(o - v) < 1 ? ut(u, v || o, m) : o, l = $(s - y) < 1 ? ut(d, y || s, h) : s, n = c, r = l, i = c, a = l, w ? (g = m, _ = h, f = u, p = d, c = n - L, l = r - R) : (g = m + L, _ = h + R, f = u + L, p = d + R, n = c + L, r = l + R), i = c + N, a = l + P;
		}
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
function Hs(e, t) {
	return ht(t > 0 ? e[0] : e[1], t > 0 ? e[1] : e[0]);
}
function Us() {
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
function Ws(e, t) {
	var n = e === kt(e) || e === Ot(e), r = {
		clientLeft: e.clientLeft,
		clientTop: e.clientTop,
		clientWidth: e.clientWidth,
		clientHeight: e.clientHeight,
		scrollWidth: e.scrollWidth,
		scrollHeight: e.scrollHeight,
		overflow: !1
	};
	return n && (r.clientHeight = Math.max(t.height, r.clientHeight), r.scrollHeight = Math.max(t.height, r.scrollHeight)), r.overflow = Qi(e)("overflow") !== "visible", q(q({}, t), r);
}
function Gs(e, t, n, r) {
	var i = e.left, a = e.right, o = e.top, s = e.bottom, c = t.top, l = t.left, u = {
		left: l + i,
		top: c + o,
		right: l + a,
		bottom: c + s,
		width: a - i,
		height: s - o
	};
	return n && r ? Ws(n, u) : u;
}
function Ks(e, t) {
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
	return e && t ? Ws(e, s) : s;
}
function qs(e) {
	var t = e.props, n = t.groupable, r = t.svgOrigin, i = e.getState(), a = i.offsetWidth, o = i.offsetHeight, s = i.svg, c = i.transformOrigin;
	return !n && s && r ? Oc(r, a, o) : c;
}
function Js(e, t, n, r) {
	var i;
	if (e) i = e;
	else if (t) i = [0, 0];
	else {
		var a = n.target;
		i = Ys(a, r);
	}
	return i;
}
function Ys(e, t) {
	if (e) {
		var n = e.getAttribute("data-rotation") || "", r = e.getAttribute("data-direction");
		if (t.deg = n, r) {
			var i = [0, 0];
			return r.indexOf("w") > -1 && (i[0] = -1), r.indexOf("e") > -1 && (i[0] = 1), r.indexOf("n") > -1 && (i[1] = -1), r.indexOf("s") > -1 && (i[1] = 1), i;
		}
	}
}
function Xs(e, t) {
	return [
		Gt(t, e[0]),
		Gt(t, e[1]),
		Gt(t, e[2]),
		Gt(t, e[3])
	];
}
function Zs(e) {
	var t = e.left, n = e.top, r = e.pos1, i = e.pos2, a = e.pos3, o = e.pos4;
	return Xs([
		r,
		i,
		a,
		o
	], [t, n]);
}
function Qs(e, t) {
	e[t ? "controlAbles" : "targetAbles"].forEach(function(t) {
		t.unset && t.unset(e);
	});
}
function $s(e, t) {
	var n = t ? "controlGesto" : "targetGesto", r = e[n];
	r?.isIdle() === !1 && Qs(e, t), r?.unset(), e[n] = null;
}
function ec(e, t) {
	if (t) {
		var n = ki(t);
		n.nextStyle = q(q({}, n.nextStyle), e);
	}
	return {
		style: e,
		cssText: ct(e).map(function(t) {
			return `${nt(t, "-")}: ${e[t]};`;
		}).join("")
	};
}
function tc(e, t, n) {
	var r = t.afterTransform || t.transform;
	return q(q({}, ec(q(q(q({}, e.style), t.style), { transform: r }), n)), {
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
function nc(e, t, n) {
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
function rc(e, t, n) {
	e._emitter.on(t, n);
}
function Q(e, t, n, r, i) {
	return e.triggerEvent(t, n, r, i);
}
function ic(e, t) {
	return At(e).getComputedStyle(e, t);
}
function ac(e, t, n) {
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
function oc(e, t) {
	return e === t || e == null && t == null;
}
function sc() {
	for (var e = [...arguments], t = e.length - 1, n = 0; n < t; ++n) {
		var r = e[n];
		if (!Ve(r)) return r;
	}
	return e[t];
}
function cc(e, t) {
	var n = [], r = [];
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r.indexOf(o), c = n[s] || [];
		s === -1 && (r.push(o), n.push(c)), c.push(i);
	}), n;
}
function lc(e, t) {
	var n = [], r = {};
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r[o];
		s || (s = [], r[o] = s, n.push(s)), s.push(i);
	}), n;
}
function uc(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function dc() {
	var e = [...arguments];
	return e.sort(function(e, t) {
		return $(t) - $(e);
	}), e[0];
}
function fc(e, t, n) {
	return Jt(Lt(e, n), Vt(t, n), n);
}
function pc(e, t) {
	var n, r = e.is3d, i = e.rootMatrix, a = r ? 4 : 3;
	return n = J(fc(i, [t.distX, t.distY], a), 2), t.distX = n[0], t.distY = n[1], t;
}
function mc(e, t, n, r) {
	if (!n[0] && !n[1]) return t;
	var i = As(e, [Zo(n[0] || 1), 0], r), a = As(e, [0, Zo(n[1] || 1)], r);
	return Gt(t, As(e, [n[0] / Is(i), n[1] / Is(a)], r));
}
function hc(e, t, n) {
	return n ? `${e / t * 100}%` : `${e}px`;
}
function gc(e) {
	return $(e) <= Yr ? 0 : e;
}
function _c(e) {
	return function(t) {
		if (!t.isDragging(e)) return "";
		var n = Hi(t, e).deg;
		return n ? X(`view-control-rotation${n}`) : "";
	};
}
function vc(e, t) {
	return t === void 0 && (t = [e]), function(n, r) {
		if (r.isRequest) return t.some(function(e) {
			return r.requestAble === e;
		}) ? r.parentDirection : !1;
		var i = r.inputEvent.target;
		return St(i, X("direction")) && (!e || St(i, X(e)));
	};
}
function yc(e, t, n) {
	var r = pn(e, {
		"x%": function(e) {
			return e / 100 * t.offsetWidth;
		},
		"y%": function(e) {
			return e / 100 * t.offsetHeight;
		}
	}), i = e.slice(0, n < 0 ? void 0 : n), a = e.slice(0, n < 0 ? void 0 : n + 1), o = e[n] || "", s = n < 0 ? [] : e.slice(n), c = n < 0 ? [] : e.slice(n + 1), l = r.slice(0, n < 0 ? void 0 : n), u = r.slice(0, n < 0 ? void 0 : n + 1), d = r[n] ?? pn([""])[0], f = n < 0 ? [] : r.slice(n), p = n < 0 ? [] : r.slice(n + 1), m = d ? [d] : [], h = fn(l), g = fn(u), _ = fn(f), v = fn(p), y = Wt(h, _, 4);
	return {
		transforms: e,
		beforeFunctionMatrix: h,
		beforeFunctionMatrix2: g,
		targetFunctionMatrix: fn(m),
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
function bc(e) {
	return !e || !He(e) || Mt(e) ? !1 : Ue(e) || "length" in e;
}
function xc(e, t) {
	return e ? Mt(e) ? e : We(e) ? t ? document.querySelector(e) : e : Ke(e) ? e() : jt(e) ? e : "current" in e ? e.current : e : null;
}
function Sc(e, t) {
	return e ? (bc(e) ? [].slice.call(e) : [e]).reduce(function(e, n) {
		return We(n) && t ? Y(Y([], J(e), !1), J([].slice.call(document.querySelectorAll(n))), !1) : (Ue(n) ? e.push(Sc(n, t)) : e.push(xc(n, t)), e);
	}, []) : [];
}
function Cc(e, t, n) {
	var r = ht(e, t) / Math.PI * 180;
	return r = n >= 0 ? r : 180 - r, r = r >= 0 ? r : 360 + r, r;
}
function wc(e, t) {
	var n = e.rootMatrix, r = e.is3d, i = Lt(n, r ? 4 : 3);
	return r || (i = Ht(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, dn(i, t);
}
function Tc(e, t, n, r, i) {
	var a = J(e, 2), o = a[0], s = a[1], c = 0, l = 0;
	if (i && o && s) {
		var u = ht([0, 0], t), d = ht([0, 0], r), f = Is(t), p = Math.cos(u - d) * f;
		if (!r[0]) l = p, c = l * n;
		else if (!r[1]) c = p, l = c / n;
		else {
			var m = r[0] * o, h = r[1] * s, g = Math.atan2(m + t[0], h + t[1]), _ = Math.atan2(m, h);
			g < 0 && (g += Math.PI * 2), _ < 0 && (_ += Math.PI * 2);
			var v = 0;
			$(g - _) < Math.PI / 2 || $(g - _) > Math.PI / 2 * 3 || (_ += Math.PI), v = g - _, v > Math.PI * 2 ? v -= Math.PI * 2 : v > Math.PI ? v = 2 * Math.PI - v : v < -Math.PI && (v = -2 * Math.PI - v);
			var y = Is([m + t[0], h + t[1]]) * Math.cos(v);
			c = y * Math.sin(_) - m, l = y * Math.cos(_) - h, r[0] < 0 && (c *= -1), r[1] < 0 && (l *= -1);
		}
	} else c = r[0] * t[0], l = r[1] * t[1];
	return [c, l];
}
function Ec(e, t, n, r) {
	var i, a = n.ratio, o = n.startOffsetWidth, s = n.startOffsetHeight, c = 0, l = 0, u = r.distX, d = r.distY, f = r.pinchScale, p = r.parentDistance, m = r.parentDist, h = r.parentScale, g = n.fixedDirection, _ = [0, 1].map(function(t) {
		return $(e[t] - g[t]);
	}), v = [0, 1].map(function(e) {
		var t = _[e];
		return t !== 0 && (t = 2 / t), t;
	});
	if (m) c = m[0], l = m[1], t && (c ? l ||= c / a : c = l * a);
	else if (Ge(f)) c = (f - 1) * o, l = (f - 1) * s;
	else if (h) c = (h[0] - 1) * o, l = (h[1] - 1) * s;
	else if (p) {
		var y = o * _[0], b = s * _[1], x = Is([y, b]);
		c = p / x * y * v[0], l = p / x * b * v[1];
	} else {
		var S = mi({
			datas: n,
			distX: u,
			distY: d
		});
		S = v.map(function(e, t) {
			return S[t] * e;
		}), i = J(Tc([o, s], S, a, e, t), 2), c = i[0], l = i[1];
	}
	return {
		distWidth: c,
		distHeight: l
	};
}
function Dc(e, t) {
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
		var n = J(e.split(" "), 2), r = n[0], i = n[1], a = Dc(r || ""), o = Dc(i || ""), s = q(q({}, a), o), c = {
			x: "50%",
			y: "50%"
		};
		return s.x && (c.x = s.x), s.y && (c.y = s.y), s.value && (s.x && !s.y && (c.y = s.value), !s.x && s.y && (c.x = s.value)), c;
	}
	return e === "left" ? { x: "0%" } : e === "right" ? { x: "100%" } : e === "top" ? { y: "0%" } : e === "bottom" ? { y: "100%" } : e ? e === "center" ? { value: "50%" } : { value: e } : {};
}
function Oc(e, t, n) {
	var r = Dc(e, !0), i = r.x, a = r.y;
	return [lt(i, t) || 0, lt(a, n) || 0];
}
function kc(e, t, n) {
	var r = e.map(function(e) {
		return K(e, t);
	}), i = r.map(function(e) {
		return $t(e, n);
	});
	return {
		prev: r,
		next: i,
		result: i.map(function(e) {
			return Gt(e, t);
		})
	};
}
function Ac(e, t) {
	return e.length === t.length && e.every(function(e, n) {
		var r = t[n], i = Ue(e), a = Ue(r);
		return i && a ? Ac(e, r) : !i && !a && e === r;
	});
}
function jc(e, t, n, r, i) {
	var a = e._store, o = a[t];
	if (!(t in a)) {
		if (i != null) a[t] = i, o = i;
		else return a[t] = n, n;
	}
	return o === n || r(o) === r(n) ? o : (a[t] = n, n);
}
function Mc(e) {
	return e >= 0 ? 1 : -1;
}
function $(e) {
	return Math.abs(e);
}
function Nc(e, t) {
	return bt(e).map(function(e) {
		return t(e);
	});
}
function Pc(e) {
	return Ge(e) ? {
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
var Fc = kr("pinchable", {
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
			var s = `onPinch${a ? "Group" : ""}End`, c = nc(e, t, { isDrag: r });
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
}), Ic = vc("scalable"), Lc = {
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
	render: sa("scalable"),
	dragControlCondition: Ic,
	viewClassName: _c("scalable"),
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.inputEvent, a = t.parentDirection, o = Js(a, r, i, n), s = e.state, c = s.width, l = s.height, u = s.targetTransform, d = s.target, f = s.pos1, p = s.pos2, m = s.pos4;
		if (!o || !d) return !1;
		r || si(e, t), n.datas = {}, n.transform = u, n.prevDist = [1, 1], n.direction = o, n.startOffsetWidth = c, n.startOffsetHeight = l, n.startValue = [1, 1];
		var h = !o[0] && !o[1] || o[0] || !o[1];
		Ei(e, t, "scale"), n.isWidth = h;
		function g(e) {
			n.ratio = e && isFinite(e) ? e : 0;
		}
		n.startPositions = Zs(e.state);
		function _(e) {
			var t = bo(n.startPositions, e);
			n.fixedDirection = t.fixedDirection, n.fixedPosition = t.fixedPosition, n.fixedOffset = t.fixedOffset;
		}
		n.setFixedDirection = _, g(vt(f, p) / vt(p, m)), _([-o[0], -o[1]]);
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
		}, Ti(e, t)), { dragStart: yo.dragStart(e, new ii().dragStart([0, 0], t)) })), x = Q(e, "onScaleStart", b);
		return n.startFixedDirection = n.fixedDirection, x !== !1 && (n.isScale = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}), n.isScale ? b : !1;
	},
	dragControl: function(e, t) {
		li(e, t, "scale");
		var n = t.datas, r = t.parentKeepRatio, i = t.parentFlag, a = t.isPinch, o = t.dragClient, s = t.isRequest, c = t.useSnap, l = t.resolveMatrix, u = n.prevDist, d = n.direction, f = n.startOffsetWidth, p = n.startOffsetHeight, m = n.isScale, h = n.startValue, g = n.isWidth, _ = n.ratio;
		if (!m) return !1;
		var v = e.props, y = v.throttleScale, b = v.parentMoveable, x = d;
		!d[0] && !d[1] && (x = [1, 1]);
		var S = _ && (r ?? v.keepRatio) || !1, C = e.state, w = [h[0], h[1]];
		function T() {
			var e = Ec(x, S, n, t), r = e.distWidth, i = e.distHeight, a = f ? (f + r) / f : 1, o = p ? (p + i) / p : 1;
			h[0] || (w[0] = r / f), h[1] || (w[1] = i / p);
			var s = (x[0] || S ? a : 1) * w[0], c = (x[1] || S ? o : 1) * w[1];
			return s === 0 && (s = Mc(u[0]) * Xr), c === 0 && (c = Mc(u[1]) * Xr), [s, c];
		}
		var E = T();
		if (!a && e.props.groupable) {
			var D = (C.snapRenderInfo || {}).direction;
			Ue(D) && (D[0] || D[1]) && (C.snapRenderInfo = {
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
		var O = [E[0] / w[0], E[1] / w[1]], k = o, A = [0, 0], j = Mc(O[0] * O[1]), M = !o && !i && a;
		if (M || l ? k = Pi(e, n.targetAllTransform, [0, 0], [0, 0], n) : o || (k = n.fixedPosition), a || (A = os(e, O, d, !c && s, n)), S) {
			x[0] && x[1] && A[0] && A[1] && (Math.abs(A[0] * f) > Math.abs(A[1] * p) ? A[1] = 0 : A[0] = 0);
			var N = !A[0] && !A[1];
			if (N && (g ? O[0] = G(O[0] * w[0], y) / w[0] : O[1] = G(O[1] * w[1], y) / w[1]), x[0] && !x[1] || A[0] && !A[1] || N && g) {
				O[0] += A[0];
				var P = f * O[0] * w[0] / _;
				O[1] = Mc(j * O[0]) * $(P / p / w[1]);
			} else if (!x[0] && x[1] || !A[0] && A[1] || N && !g) {
				O[1] += A[1];
				var F = p * O[1] * w[1] * _;
				O[0] = Mc(j * O[1]) * $(F / f / w[0]);
			}
		} else O[0] += A[0], O[1] += A[1], A[0] || (O[0] = G(O[0] * w[0], y) / w[0]), A[1] || (O[1] = G(O[1] * w[1], y) / w[1]);
		O[0] === 0 && (O[0] = Mc(u[0]) * Xr), O[1] === 0 && (O[1] = Mc(u[1]) * Xr), E = fs(O, [w[0], w[1]]);
		var I = [f, p], L = [f * E[0], p * E[1]];
		L = ft(L, n.minScaleSize, n.maxScaleSize, S ? _ : !1), E = Nc(2, function(e) {
			return I[e] ? L[e] / I[e] : L[e];
		}), O = Nc(2, function(e) {
			return E[e] / w[e];
		});
		var R = Nc(2, function(e) {
			return u[e] ? O[e] / u[e] : O[e];
		}), z = `scale(${O.join(", ")})`, B = `scale(${E.join(", ")})`, V = ui(n, B, z), H = !h[0] || !h[1], ee = Ii(e, H ? B : z, n.fixedDirection, k, n.fixedOffset, n, H), te = M ? ee : K(ee, n.prevInverseDist || [0, 0]);
		if (n.prevDist = O, n.prevInverseDist = ee, E[0] === u[0] && E[1] === u[1] && te.every(function(e) {
			return !e;
		}) && !b && !M) return !1;
		var ne = Z(e, t, q({
			offsetWidth: f,
			offsetHeight: p,
			direction: d,
			scale: E,
			dist: O,
			delta: R,
			isPinch: !!a
		}, Ni(e, V, te, a, t)));
		return Q(e, "onScale", ne), ne;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (!n.isScale) return !1;
		n.isScale = !1;
		var r = nc(e, t, {});
		return Q(e, "onScaleEnd", r), r;
	},
	dragGroupControlCondition: Ic,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, t);
		if (!r) return !1;
		var i = $i(e, "resizable", t);
		n.moveableScale = e.scale;
		var a = ta(e, this, "dragControlStart", t, function(t, r) {
			return na(e, t, n, r);
		}), o = function(t) {
			r.setFixedDirection(t), a.forEach(function(r, a) {
				r.setFixedDirection(t), na(e, r.moveable, n, i[a]);
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
			rc(e, "onBeforeScale", function(n) {
				Q(e, "onBeforeScaleGroup", Z(e, t, q(q({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = r.dist, a = n.moveableScale;
				e.scale = [i[0] * a[0], i[1] * a[1]];
				var o = e.props.keepRatio, s = n.fixedPosition, c = ta(e, this, "dragControl", t, function(t, n) {
					var r = J(Jt(nn(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * i[0],
						n.datas.originalY * i[1],
						1
					], 3), 2), a = r[0], c = r[1];
					return q(q({}, n), {
						parentDist: null,
						parentScale: i,
						parentKeepRatio: o,
						dragClient: Gt(s, [a, c])
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
			var r = ta(e, this, "dragControlEnd", t);
			return Q(e, "onScaleGroupEnd", nc(e, t, {
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
function Rc(e, t) {
	return e.map(function(e, n) {
		return Be(e, t[n], 1, 2);
	});
}
function zc(e, t, n) {
	var r = ht(e, t), i = ht(e, n) - r;
	return i >= 0 ? i : i + 2 * Math.PI;
}
function Bc(e, t) {
	var n = zc(e[0], e[1], e[2]), r = zc(t[0], t[1], t[2]), i = Math.PI;
	return !(n >= i && r <= i || n <= i && r >= i);
}
var Vc = {
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
	viewClassName: _c("warpable"),
	render: function(e, t) {
		var n = e.props, r = n.resizable, i = n.scalable, a = n.warpable, o = n.zoom;
		if (r || i || !a) return [];
		var s = e.state, c = s.pos1, l = s.pos2, u = s.pos3, d = s.pos4, f = Rc(c, l), p = Rc(l, c), m = Rc(c, u), h = Rc(u, c), g = Rc(u, d), _ = Rc(d, u), v = Rc(l, d), y = Rc(d, l);
		return Y([
			t.createElement("div", {
				className: X("line"),
				key: "middeLine1",
				style: Rs(f, g, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine2",
				style: Rs(p, _, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine3",
				style: Rs(m, v, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine4",
				style: Rs(h, y, o)
			})
		], J(ca(e, "warpable", t)), !1);
	},
	dragControlCondition: function(e, t) {
		if (t.isRequest) return !1;
		var n = t.inputEvent.target;
		return St(n, X("direction")) && St(n, X("warpable"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.inputEvent, i = e.props.target, a = r.target, o = Ys(a, n);
		if (!o || !i) return !1;
		var s = e.state, c = s.transformOrigin, l = s.is3d, u = s.targetTransform, d = s.targetMatrix, f = s.width, p = s.height, m = s.left, h = s.top;
		return n.datas = {}, n.targetTransform = u, n.warpTargetMatrix = l ? d : Ht(d, 3, 4), n.targetInverseMatrix = It(Lt(n.warpTargetMatrix, 4), 3, 4), n.direction = o, n.left = m, n.top = h, n.poses = [
			[0, 0],
			[f, 0],
			[0, p],
			[f, p]
		].map(function(e) {
			return K(e, c);
		}), n.nextPoses = n.poses.map(function(e) {
			var t = J(e, 2), r = t[0], i = t[1];
			return Jt(n.warpTargetMatrix, [
				r,
				i,
				0,
				1
			], 4);
		}), n.startValue = rn(4), n.prevMatrix = rn(4), n.absolutePoses = Zs(s), n.posIndexes = _i(o), si(e, t), Ei(e, t, "matrix3d"), s.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}, Q(e, "onWarpStart", Z(e, t, q({ set: function(e) {
			n.startValue = e;
		} }, Ti(e, t)))) !== !1 && (n.isWarp = !0), n.isWarp;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isRequest, i = t.distX, a = t.distY, o = n.targetInverseMatrix, s = n.prevMatrix, c = n.isWarp, l = n.startValue, u = n.poses, d = n.posIndexes, f = n.absolutePoses;
		if (!c) return !1;
		if (li(e, t, "matrix3d"), wa(e, "warpable")) {
			var p = d.map(function(e) {
				return f[e];
			});
			p.length > 1 && p.push([(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]);
			var m = fo(e, r, {
				horizontal: p.map(function(e) {
					return e[1] + a;
				}),
				vertical: p.map(function(e) {
					return e[0] + i;
				})
			}), h = m.horizontal, g = m.vertical;
			a -= h.offset, i -= g.offset;
		}
		var _ = mi({
			datas: n,
			distX: i,
			distY: a
		}, !0), v = n.nextPoses.slice();
		if (d.forEach(function(e) {
			v[e] = Gt(v[e], _);
		}), !qr.every(function(e) {
			return Bc(e.map(function(e) {
				return u[e];
			}), e.map(function(e) {
				return v[e];
			}));
		})) return !1;
		var y = sn(u[0], u[2], u[1], u[3], v[0], v[2], v[1], v[3]);
		if (!y.length) return !1;
		var b = fi(n, Wt(o, y, 4), !0), x = Wt(Lt(s, 4), b, 4);
		n.prevMatrix = b;
		var S = Wt(l, b, 4), C = ui(n, `matrix3d(${S.join(", ")})`, `matrix3d(${b.join(", ")})`);
		return Oi(t, C), Q(e, "onWarp", Z(e, t, q({
			delta: x,
			matrix: S,
			dist: b,
			multiply: Wt,
			transform: C
		}, ec({ transform: C }, t)))), !0;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.isDrag;
		return n.isWarp ? (n.isWarp = !1, Q(e, "onWarpEnd", nc(e, t, {})), r) : !1;
	}
}, Hc = /*#__PURE__*/ X("area-pieces"), Uc = /*#__PURE__*/ X("area-piece"), Wc = /*#__PURE__*/ X("avoid"), Gc = X("view-dragging");
function Kc(e) {
	var t = e.areaElement;
	if (t) {
		var n = e.state, r = n.width, i = n.height;
		wt(t, Wc), t.style.cssText += `left: 0px; top: 0px; width: ${r}px; height: ${i}px`;
	}
}
function qc(e) {
	return e.createElement("div", {
		key: "area_pieces",
		className: Hc
	}, e.createElement("div", { className: Uc }), e.createElement("div", { className: Uc }), e.createElement("div", { className: Uc }), e.createElement("div", { className: Uc }));
}
var Jc = {
	name: "dragArea",
	props: ["dragArea", "passDragArea"],
	events: ["click", "clickGroup"],
	render: function(e, t) {
		var n = e.props, r = n.target, i = n.dragArea, a = n.groupable, o = n.passDragArea, s = e.getState(), c = s.width, l = s.height, u = s.renderPoses, d = o ? X("area", "pass") : X("area");
		if (a) return [t.createElement("div", {
			key: "area",
			ref: De(e, "areaElement"),
			className: d
		}), qc(t)];
		if (!r || !i) return [];
		var f = sn([0, 0], [c, 0], [0, l], [c, l], u[0], u[1], u[2], u[3]), p = f.length ? Es(f, !0) : "none";
		return [t.createElement("div", {
			key: "area",
			ref: De(e, "areaElement"),
			className: d,
			style: {
				top: "0px",
				left: "0px",
				width: `${c}px`,
				height: `${l}px`,
				transformOrigin: "0 0",
				transform: p
			}
		}), qc(t)];
	},
	dragStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY;
		if (!t.inputEvent) return !1;
		n.isDragArea = !1;
		var a = e.areaElement, o = e.state, s = o.moveableClientRect, c = o.renderPoses, l = o.rootMatrix, u = o.is3d, d = s.left, f = s.top, p = Ms(c), m = p.left, h = p.top, g = p.width, _ = p.height, v = u ? 4 : 3, y = J(fc(l, [r - d, i - f], v), 2), b = y[0], x = y[1];
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
		}), Ct(a, Wc), o.disableNativeEvent = !0;
	},
	drag: function(e, t) {
		var n = t.datas, r = t.inputEvent;
		if (this.enableNativeEvent(e), !r) return !1;
		n.isDragArea || (n.isDragArea = !0, Kc(e));
	},
	dragEnd: function(e, t) {
		this.enableNativeEvent(e);
		var n = t.inputEvent, r = t.datas;
		if (!n) return !1;
		r.isDragArea || Kc(e);
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
		Kc(e), e.state.disableNativeEvent = !1;
	},
	enableNativeEvent: function(e) {
		var t = e.state;
		t.disableNativeEvent && ot(function() {
			t.disableNativeEvent = !1;
		});
	}
}, Yc = kr("origin", {
	props: ["origin", "svgOrigin"],
	render: function(e, t) {
		var n = e.props, r = n.zoom, i = n.svgOrigin, a = n.groupable, o = e.getState(), s = o.beforeOrigin, c = o.rotation, l = o.svg, u = o.allMatrix, d = o.is3d, f = o.left, p = o.top, m = o.offsetWidth, h = o.offsetHeight, g;
		if (!a && l && i) {
			var _ = J(Oc(i, m, h), 2), v = _[0], y = _[1];
			g = zs(c, r, K(As(u, [v, y], d ? 4 : 3), [f, p]));
		} else g = zs(c, r, s);
		return [t.createElement("div", {
			className: X("control", "origin"),
			style: g,
			key: "beforeOrigin"
		})];
	}
});
function Xc(e) {
	var t = e.scrollContainer;
	return [t.scrollLeft, t.scrollTop];
}
var Zc = {
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
		var n = e.props, r = n.scrollContainer, i = r === void 0 ? e.getContainer() : r, a = n.scrollOptions, o = new In(), s = xc(i, !0);
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
			var r = e.props, i = r.scrollContainer, a = i === void 0 ? e.getContainer() : i, o = r.scrollThreshold, s = o === void 0 ? 0 : o, c = r.scrollThrottleTime, l = c === void 0 ? 0 : c, u = r.getScrollPosition, d = u === void 0 ? Xc : u, f = r.scrollOptions;
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
}, Qc = {
	name: "",
	props: /* @__PURE__ */ "target.dragTargetSelf.dragTarget.dragContainer.container.warpSelf.rootContainer.useResizeObserver.useMutationObserver.zoom.dragFocusedInput.transformOrigin.ables.className.pinchThreshold.pinchOutside.triggerAblesSimultaneously.checkInput.cspNonce.translateZ.hideDefaultLines.props.flushSync.stopPropagation.preventClickEventOnDrag.preventClickDefault.viewContainer.persistData.useAccuratePosition.firstRenderState.linePadding.controlPadding.preventDefault.preventRightClick.preventWheelClick.requestStyles".split("."),
	events: ["changeTargets"]
}, $c = kr("padding", {
	props: ["padding"],
	render: function(e, t) {
		var n = e.props;
		if (n.dragArea) return [];
		var r = Pc(n.padding || {}), i = r.left, a = r.top, o = r.right, s = r.bottom, c = e.getState(), l = c.renderPoses, u = [
			c.pos1,
			c.pos2,
			c.pos3,
			c.pos4
		], d = [];
		return i > 0 && d.push([0, 2]), a > 0 && d.push([0, 1]), o > 0 && d.push([1, 3]), s > 0 && d.push([2, 3]), d.map(function(e, n) {
			var r = J(e, 2), i = r[0], a = r[1], o = u[i], s = u[a], c = l[i], d = l[a], f = sn([0, 0], [100, 0], [0, 100], [100, 100], o, s, c, d);
			if (f.length) return t.createElement("div", {
				key: `padding${n}`,
				className: X("padding"),
				style: { transform: Es(f, !0) }
			});
		});
	}
}), el = [
	"nw",
	"ne",
	"se",
	"sw"
];
function tl(e, t) {
	var n = e[0] + e[1], r = n > t ? t / n : 1;
	return e[0] *= r, e[1] = t - e[1] * r, e;
}
var nl = [
	1,
	2,
	5,
	6
], rl = [
	0,
	3,
	4,
	7
], il = [
	1,
	-1,
	-1,
	1
], al = [
	1,
	1,
	-1,
	-1
];
function ol(e, t, n, r, i, a, o, s) {
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
				return c.push(hc(p, r, t)), p;
			}
			var p = Math.max(0, u === 1 ? f[0] - i : o - f[0]);
			return c.push(hc(p, n, t)), p;
		})
	};
}
function sl(e) {
	for (var t = [0, 0], n = [0, 0], r = e.length, i = 0; i < r; ++i) {
		var a = e[i];
		a.sub && (a.horizontal && (t[1] === 0 && (t[0] = i), t[1] = i - t[0] + 1, n[0] = i + 1), a.vertical && (n[1] === 0 && (n[0] = i), n[1] = i - n[0] + 1));
	}
	return {
		horizontalRange: t,
		verticalRange: n
	};
}
function cl(e, t, n, r, i, a, o) {
	var s, c, l, u;
	a === void 0 && (a = [0, 0]), o === void 0 && (o = !1);
	var d = e.indexOf("/"), f = (d > -1 ? e.slice(0, d) : e).length, p = e.slice(0, f), m = e.slice(f + 1), h = p.length, g = m.length, _ = g > 0, v = J(p, 4), y = v[0], b = y === void 0 ? "0px" : y, x = v[1], S = x === void 0 ? b : x, C = v[2], w = C === void 0 ? b : C, T = v[3], E = T === void 0 ? S : T, D = J(m, 4), O = D[0], k = O === void 0 ? b : O, A = D[1], j = A === void 0 ? _ ? k : S : A, M = D[2], N = M === void 0 ? _ ? k : w : M, P = D[3], F = P === void 0 ? _ ? j : E : P, I = [
		b,
		S,
		w,
		E
	].map(function(e) {
		return lt(e, t);
	}), L = [
		k,
		j,
		N,
		F
	].map(function(e) {
		return lt(e, n);
	}), R = I.slice(), z = L.slice();
	s = J(tl([R[0], R[1]], t), 2), R[0] = s[0], R[1] = s[1], c = J(tl([R[3], R[2]], t), 2), R[3] = c[0], R[2] = c[1], l = J(tl([z[0], z[3]], n), 2), z[0] = l[0], z[3] = l[1], u = J(tl([z[1], z[2]], n), 2), z[1] = u[0], z[2] = u[1];
	var B = o ? R : R.slice(0, Math.max(a[0], h)), V = o ? z : z.slice(0, Math.max(a[1], g));
	return Y(Y([], J(B.map(function(e, t) {
		var a = el[t];
		return {
			virtual: t >= h,
			horizontal: il[t],
			vertical: 0,
			pos: [r + e, i + (al[t] === -1 ? n : 0)],
			sub: !0,
			raw: I[t],
			direction: a
		};
	})), !1), J(V.map(function(e, n) {
		var a = el[n];
		return {
			virtual: n >= g,
			horizontal: 0,
			vertical: al[n],
			pos: [r + (il[n] === -1 ? t : 0), i + e],
			sub: !0,
			raw: L[n],
			direction: a
		};
	})), !1);
}
function ll(e, t, n, r, i) {
	i === void 0 && (i = t.length);
	var a = sl(e.slice(r)), o = a.horizontalRange, s = a.verticalRange, c = n - r, l = 0;
	if (c === 0) l = i;
	else if (c > 0 && c < o[1]) l = o[1] - c;
	else if (c >= s[0]) l = s[0] + s[1] - c;
	else return;
	e.splice(n, l), t.splice(n, l);
}
function ul(e, t, n, r, i, a, o, s, c, l, u) {
	l === void 0 && (l = 0), u === void 0 && (u = 0);
	var d = sl(e.slice(n)), f = d.horizontalRange, p = d.verticalRange;
	if (r > -1) for (var m = il[r] === 1 ? a - l : s - a, h = f[1]; h <= r; ++h) {
		var g = al[h] === 1 ? u : c, _ = 0;
		if (r === h ? _ = a : h === 0 ? _ = l + m : il[h] === -1 && (_ = s - (t[n][0] - l)), e.splice(n + h, 0, {
			horizontal: il[h],
			vertical: 0,
			pos: [_, g]
		}), t.splice(n + h, 0, [_, g]), h === 0) break;
	}
	else if (i > -1) {
		var v = al[i] === 1 ? o - u : c - o;
		if (f[1] === 0 && p[1] === 0) {
			var y = [l + v, u];
			e.push({
				horizontal: il[0],
				vertical: 0,
				pos: y
			}), t.push(y);
		}
		for (var b = p[0], h = p[1]; h <= i; ++h) {
			var _ = il[h] === 1 ? l : s, g = 0;
			if (i === h ? g = o : h === 0 ? g = u + v : al[h] === 1 ? g = t[n + b][1] : al[h] === -1 && (g = c - (t[n + b][1] - u)), e.push({
				horizontal: 0,
				vertical: al[h],
				pos: [_, g]
			}), t.push([_, g]), h === 0) break;
		}
	}
}
function dl(e, t) {
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
var fl = [[
	0,
	-1,
	"n"
], [
	1,
	0,
	"e"
]], pl = [
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
function ml(e, t, n) {
	var r = e.props.clipRelative, i = e.state, a = i.width, o = i.height, s = t, c = s.type, l = s.poses, u = c === "rect", d = c === "circle";
	if (c === "polygon") return n.map(function(e) {
		return `${hc(e[0], a, r)} ${hc(e[1], o, r)}`;
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
			return hc(e, t % 2 ? a : o, r);
		});
		if (n.length > 8) {
			var _ = J(K(n[4], n[0]), 2), v = _[0], y = _[1];
			g.push.apply(g, Y(["round"], J(ol(l.slice(8).map(function(e, t) {
				return q(q({}, e), { pos: n[t] });
			}), r, v, y, m, f, p, h).styles), !1));
		}
		return g;
	}
	if (d || c === "ellipse") {
		var b = n[0], x = hc($(n[1][1] - b[1]), d ? Math.sqrt((a * a + o * o) / 2) : o, r), g = d ? [x] : [hc($(n[2][0] - b[0]), a, r), x];
		return g.push("at", hc(b[0], a, r), hc(b[1], o, r)), g;
	}
}
function hl(e, t, n, r) {
	var i = [
		r,
		(r + t) / 2,
		t
	], a = [
		e,
		(e + n) / 2,
		n
	];
	return pl.map(function(e) {
		var t = J(e, 3), n = t[0], r = t[1], o = t[2], s = i[n + 1], c = a[r + 1];
		return {
			vertical: $(r),
			horizontal: $(n),
			direction: o,
			pos: [s, c]
		};
	});
}
function gl(e) {
	var t = [Infinity, -Infinity], n = [Infinity, -Infinity];
	return e.forEach(function(e) {
		var r = e.pos;
		t[0] = Math.min(t[0], r[0]), t[1] = Math.max(t[1], r[0]), n[0] = Math.min(n[0], r[1]), n[1] = Math.max(n[1], r[1]);
	}), [$(t[1] - t[0]), $(n[1] - n[0])];
}
function _l(e, t, n, r, i) {
	var a, o, s, c, l, u, d, f, p;
	if (e) {
		var m = i;
		if (!m) {
			var h = Qi(e), g = h("clipPath");
			m = g === "none" ? h("clip") : g;
		}
		if (!((!m || m === "none" || m === "auto") && (m = r, !m))) {
			var _ = et(m), v = _.prefix, y = v === void 0 ? m : v, b = _.value, x = b === void 0 ? "" : b, S = y === "circle", C = " ";
			if (y === "polygon") {
				var w = $e(x || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
				C = ",";
				var T = w.map(function(e) {
					var r = J(e.split(" "), 2), i = r[0], a = r[1];
					return {
						vertical: 1,
						horizontal: 1,
						pos: [lt(i, t), lt(a, n)]
					};
				}), E = Un(T.map(function(e) {
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
				var D = "", O = "", k = 0, A = 0, w = Qe(x);
				if (S) {
					var j = "";
					a = J(w, 4), o = a[0], j = o === void 0 ? "50%" : o, s = a[2], D = s === void 0 ? "50%" : s, c = a[3], O = c === void 0 ? "50%" : c, k = lt(j, Math.sqrt((t * t + n * n) / 2)), A = k;
				} else {
					var M = "", N = "";
					l = J(w, 5), u = l[0], M = u === void 0 ? "50%" : u, d = l[1], N = d === void 0 ? "50%" : d, f = l[3], D = f === void 0 ? "50%" : f, p = l[4], O = p === void 0 ? "50%" : p, k = lt(M, t), A = lt(N, n);
				}
				var P = [lt(D, t), lt(O, n)], T = Y([{
					vertical: 1,
					horizontal: 1,
					pos: P,
					direction: "nesw"
				}], J(fl.slice(0, S ? 1 : 2).map(function(e) {
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
				var w = Qe(x || "0 0 0 0"), F = w.indexOf("round"), I = (F > -1 ? w.slice(0, F) : w).length, L = w.slice(I + 1), R = J(w.slice(0, I), 4), z = R[0], B = R[1], V = B === void 0 ? z : B, H = R[2], ee = H === void 0 ? z : H, te = R[3], ne = te === void 0 ? V : te, U = J([z, ee].map(function(e) {
					return lt(e, n);
				}), 2), W = U[0], re = U[1], ie = J([ne, V].map(function(e) {
					return lt(e, t);
				}), 2), ae = ie[0], oe = ie[1], se = t - oe, ce = n - re, le = cl(L, se - ae, ce - W, ae, W), T = Y(Y([], J(hl(W, se, ce, ae)), !1), J(le), !1);
				return {
					type: "inset",
					clipText: m,
					poses: T,
					top: W,
					left: ae,
					right: se,
					bottom: ce,
					radius: L,
					splitter: C
				};
			}
			if (y === "rect") {
				var w = $e(x || `0px, ${t}px, ${n}px, 0px`);
				C = ",";
				var ue = J(w.map(function(e) {
					return tt(e).value;
				}), 4), de = ue[0], oe = ue[1], re = ue[2], ae = ue[3], T = hl(de, oe, re, ae);
				return {
					type: "rect",
					clipText: m,
					poses: T,
					top: de,
					right: oe,
					bottom: re,
					left: ae,
					values: w,
					splitter: C
				};
			}
		}
	}
}
function vl(e, t, n, r, i) {
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
		var m = J(gl(e), 2), h = m[0], g = m[1], _ = h && g ? h / g : 0;
		if (_ && i) {
			var v = e[(t + 4) % 8].pos, y = [0, 0];
			o.indexOf("w") > -1 ? y[0] = -1 : o.indexOf("e") > -1 && (y[0] = 1), o.indexOf("n") > -1 ? y[1] = -1 : o.indexOf("s") > -1 && (y[1] = 1);
			var b = Tc([h, g], n, _, y, !0), x = h + b[0], S = g + b[1], C = v[1], w = v[1], T = v[0], E = v[0];
			y[0] === -1 ? T = E - x : y[0] === 1 ? E = T + x : (T -= x / 2, E += x / 2), y[1] === -1 ? C = w - S : (y[1] === 1 || (C = w - S / 2), w = C + S);
			var D = hl(C, E, w, T);
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
function yl(e, t) {
	var n = J(oi(e, t), 2), r = n[0], i = n[1], a = t.datas, o = a.clipPath, s = a.clipIndex, c = o, l = c.type, u = c.poses, d = c.splitter, f = u.map(function(e) {
		return e.pos;
	});
	if (l === "polygon") f.splice(s, 0, [r, i]);
	else if (l === "inset") {
		var p = nl.indexOf(s), m = rl.indexOf(s), h = u.length;
		if (ul(u, f, 8, p, m, r, i, f[4][0], f[4][1], f[0][0], f[0][1]), h === u.length) return;
	} else return;
	var g = ml(e, o, f), _ = `${l}(${g.join(d)})`;
	Q(e, "onClip", Z(e, t, q({
		clipEventType: "added",
		clipType: l,
		poses: f,
		clipStyles: g,
		clipStyle: _,
		distX: 0,
		distY: 0
	}, ec({ clipPath: _ }, t))));
}
function bl(e, t) {
	var n = t.datas, r = n.clipPath, i = n.clipIndex, a = r, o = a.type, s = a.poses, c = a.splitter, l = s.map(function(e) {
		return e.pos;
	}), u = l.length;
	if (o === "polygon") s.splice(i, 1), l.splice(i, 1);
	else if (o === "inset") {
		if (i < 8 || (ll(s, l, i, 8, u), u === s.length)) return;
	} else return;
	var d = ml(e, r, l), f = `${o}(${d.join(c)})`;
	Q(e, "onClip", Z(e, t, q({
		clipEventType: "removed",
		clipType: o,
		poses: l,
		clipStyles: d,
		clipStyle: f,
		distX: 0,
		distY: 0
	}, ec({ clipPath: f }, t))));
}
var xl = {
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
		var C = _l(l, u, d, i || "inset", b || r);
		if (!C) return [];
		var w = p ? 4 : 3, T = C.type, E = C.poses.map(function(e) {
			var t = As(f, e.pos, w);
			return [t[0] - m, t[1] - h];
		}), D = [], O = [], k = T === "rect", A = T === "inset", j = T === "polygon";
		if (k || A || j) {
			var M = A ? E.slice(0, 8) : E;
			O = M.map(function(e, n) {
				var r = n === 0 ? M[M.length - 1] : M[n - 1], i = ht(r, e), a = Ls(r, e);
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
			var N = C.left, P = C.top, F = C.radiusX, I = C.radiusY, L = J(K(As(f, [N, P], w), As(f, [0, 0], w)), 2), R = L[0], z = L[1], B = "none";
			if (!a) {
				for (var V = Math.max(10, F / 5, I / 5), H = [], ee = 0; ee <= V; ++ee) {
					var te = Math.PI * 2 / V * ee;
					H.push([F + (F - o) * Math.cos(te), I + (I - o) * Math.sin(te)]);
				}
				H.push([F, -2]), H.push([-2, -2]), H.push([-2, I * 2 + 2]), H.push([F * 2 + 2, I * 2 + 2]), H.push([F * 2 + 2, -2]), H.push([F, -2]), B = `polygon(${H.map(function(e) {
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
					transform: `translate(${-m + R}px, ${-h + z}px) ${Es(f)}`
				}
			}));
		}
		if (a) {
			var ne = Ms(Y([
				g,
				_,
				v,
				y
			], J(E), !1)), U = ne.width, W = ne.height, re = ne.left, ie = ne.top;
			if (j || k || A) {
				var H = A ? E.slice(0, 8) : E;
				D.push(t.createElement("div", {
					key: "clipArea",
					className: X("clip-area", "snap-control"),
					style: {
						width: `${U}px`,
						height: `${W}px`,
						transform: `translate(${re}px, ${ie}px)`,
						clipPath: `polygon(${H.map(function(e) {
							return `${e[0] - re}px ${e[1] - ie}px`;
						}).join(", ")})`
					}
				}));
			}
		}
		return x && ["vertical", "horizontal"].forEach(function(e) {
			var n = x[e], r = e === "horizontal";
			n.isSnap && O.push.apply(O, Y([], J(n.snap.posInfos.map(function(n, i) {
				var a = n.pos;
				return aa(t, "", K(As(f, r ? [0, a] : [a, 0], w), [m, h]), K(As(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}snap${i}`, "guideline");
			})), !1)), n.isBound && O.push.apply(O, Y([], J(n.bounds.map(function(n, i) {
				var a = n.pos;
				return aa(t, "", K(As(f, r ? [0, a] : [a, 0], w), [m, h]), K(As(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}bounds${i}`, "guideline", "bounds", "bold");
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
		var n = e.state, r = e.props, i = r.defaultClipPath, a = r.customClipPath, o = n.target, s = n.width, c = n.height, l = t.inputEvent ? t.inputEvent.target : null, u = l && l.getAttribute("class") || "", d = t.datas, f = _l(o, s, c, i || "inset", a);
		if (!f) return !1;
		var p = f.clipText, m = f.type, h = f.poses;
		return Q(e, "onClipStart", Z(e, t, {
			clipType: m,
			clipStyle: p,
			poses: h.map(function(e) {
				return e.pos;
			})
		})) === !1 ? (d.isClipStart = !1, !1) : (d.isControl = u && u.indexOf("clip-control") > -1, d.isLine = u.indexOf("clip-line") > -1, d.isArea = u.indexOf("clip-area") > -1 || u.indexOf("clip-ellipse") > -1, d.clipIndex = l ? parseInt(l.getAttribute("data-clip-index"), 10) : -1, d.clipPath = f, d.isClipStart = !0, n.clipPathState = p, si(e, t), !0);
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.originalDatas, s = t.isDragTarget;
		if (!a.isClipStart) return !1;
		var c = a, l = c.isControl, u = c.isLine, d = c.isArea, f = c.clipIndex, p = c.clipPath;
		if (!p) return !1;
		var m = Bs(e.props, "clippable"), h = m.keepRatio, g = 0, _ = 0, v = o.draggable, y = mi(t);
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
			j = vl(E, f, [g * $(N), _ * $(P)], A, h);
		} else k && (j = O.map(function() {
			return [g, _];
		}));
		var F = O.map(function(e, t) {
			return Gt(e, j[t]);
		}), I = Y([], J(F), !1);
		x.snapBoundInfos = null;
		var L = p.type === "circle", R = p.type === "ellipse";
		if (L || R) {
			var z = Ms(F), B = $(z.bottom - z.top), V = $(R ? z.right - z.left : B), H = F[0][1] + B, ee = F[0][0] - V, te = F[0][0] + V;
			L && (I.push([te, z.bottom]), j.push([1, 0])), I.push([z.left, H]), j.push([0, 1]), I.push([ee, z.bottom]), j.push([1, 0]);
		}
		var ne = qo((m.clipHorizontalGuidelines || []).map(function(e) {
			return lt(`${e}`, C);
		}), (m.clipVerticalGuidelines || []).map(function(e) {
			return lt(`${e}`, S);
		}), S, C), U = [], W = [];
		if (L || R) U = [I[4][0], I[2][0]], W = [I[1][1], I[3][1]];
		else if (A) {
			var re = [
				I[0],
				I[2],
				I[4],
				I[6]
			], ie = [
				j[0],
				j[2],
				j[4],
				j[6]
			];
			U = re.filter(function(e, t) {
				return ie[t][0];
			}).map(function(e) {
				return e[0];
			}), W = re.filter(function(e, t) {
				return ie[t][1];
			}).map(function(e) {
				return e[1];
			});
		} else U = I.filter(function(e, t) {
			return j[t][0];
		}).map(function(e) {
			return e[0];
		}), W = I.filter(function(e, t) {
			return j[t][1];
		}).map(function(e) {
			return e[1];
		});
		var ae = [0, 0], oe = po(ne, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, U, W, 5, 5), se = oe.horizontal, ce = oe.vertical, le = se.offset, ue = ce.offset;
		if (se.isBound && (ae[1] += le), ce.isBound && (ae[0] += ue), (R || L) && j[0][0] === 0 && j[0][1] === 0) {
			var z = Ms(F), de = z.bottom - z.top, fe = R ? z.right - z.left : de, pe = ce.isBound ? $(ue) : ce.snapIndex === 0 ? -ue : ue, me = se.isBound ? $(le) : se.snapIndex === 0 ? -le : le;
			fe -= pe, de -= me, L && (de = Ha(ce, se) > 0 ? de : fe, fe = de);
			var he = I[0];
			I[1][1] = he[1] - de, I[2][0] = he[0] + fe, I[3][1] = he[1] + de, I[4][0] = he[0] - fe;
		} else if (A && h && l) {
			var ge = J(gl(E), 2), _e = ge[0], ve = ge[1], ye = _e && ve ? _e / ve : 0, be = E[f].direction || "", xe = I[1][1], H = I[5][1], ee = I[7][0], te = I[3][0];
			$(le) <= $(ue) ? le = Mc(le) * $(ue) / ye : ue = Mc(ue) * $(le) * ye, be.indexOf("w") > -1 ? ee -= ue : be.indexOf("e") > -1 ? te -= ue : (ee += ue / 2, te -= ue / 2), be.indexOf("n") > -1 ? xe -= le : be.indexOf("s") > -1 ? H -= le : (xe += le / 2, H -= le / 2);
			var Se = hl(xe, te, H, ee);
			I.forEach(function(e, t) {
				var n = J(Se[t].pos, 2);
				e[0] = n[0], e[1] = n[1];
			});
		} else I.forEach(function(e, t) {
			var n = j[t];
			n[0] && (e[0] -= ue), n[1] && (e[1] -= le);
		});
		var Ce = ml(e, p, F), we = `${T}(${Ce.join(D)})`;
		if (x.clipPathState = we, L || R) U = [I[4][0], I[2][0]], W = [I[1][1], I[3][1]];
		else if (A) {
			var re = [
				I[0],
				I[2],
				I[4],
				I[6]
			];
			U = re.map(function(e) {
				return e[0];
			}), W = re.map(function(e) {
				return e[1];
			});
		} else U = I.map(function(e) {
			return e[0];
		}), W = I.map(function(e) {
			return e[1];
		});
		if (x.snapBoundInfos = po(ne, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, U, W, 1, 1), v) {
			var Te = x.is3d, Ee = x.allMatrix, De = Te ? 4 : 3, Oe = ae;
			s && (Oe = [b[0] + ae[0] - y[0], b[1] + ae[1] - y[1]]), v.deltaOffset = Wt(Ee, [
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
		}, ec((i = {}, i[T === "rect" ? "clip" : "clipPath"] = we, i), t)))), !0;
	},
	dragControlEnd: function(e, t) {
		this.unset(e);
		var n = t.isDrag, r = t.datas, i = t.isDouble, a = r.isLine, o = r.isClipStart, s = r.isControl;
		return o ? (Q(e, "onClipEnd", nc(e, t, {})), i && (s ? bl(e, t) : a && yl(e, t)), i || n) : !1;
	},
	unset: function(e) {
		e.state.clipPathState = "", e.state.snapBoundInfos = null;
	}
}, Sl = {
	name: "originDraggable",
	props: ["originDraggable", "originRelative"],
	events: [
		"dragOriginStart",
		"dragOrigin",
		"dragOriginEnd"
	],
	css: [":host[data-able-origindraggable] .control.origin {\npointer-events: auto;\n}"],
	dragControlCondition: function(e, t) {
		return t.isRequest ? t.requestAble === "originDraggable" : St(t.inputEvent.target, X("origin"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas;
		si(e, t);
		var r = Z(e, t, { dragStart: yo.dragStart(e, new ii().dragStart([0, 0], t)) }), i = Q(e, "onDragOriginStart", r);
		return n.startOrigin = e.state.transformOrigin, n.startTargetOrigin = e.state.targetOrigin, n.prevOrigin = [0, 0], n.isDragOrigin = !0, i === !1 ? (n.isDragOrigin = !1, !1) : r;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.isRequest;
		if (!n.isDragOrigin) return !1;
		var a = J(mi(t), 2), o = a[0], s = a[1], c = e.state, l = c.width, u = c.height, d = c.offsetMatrix, f = c.targetMatrix, p = c.is3d, m = e.props.originRelative, h = m === void 0 || m, g = p ? 4 : 3, _ = [o, s];
		if (i) {
			var v = t.distOrigin;
			(v[0] || v[1]) && (_ = v);
		}
		var y = Gt(n.startOrigin, _), b = Gt(n.startTargetOrigin, _), x = K(_, n.prevOrigin), S = Si(d, f, y, g), C = e.getRect(), w = Ms(js(S, l, u, g)), T = [C.left - w.left, C.top - w.top];
		n.prevOrigin = _;
		var E = [hc(b[0], l, h), hc(b[1], u, h)].join(" "), D = yo.drag(e, ri(t, e.state, T, !!r, !1)), O = Z(e, t, q(q({
			width: l,
			height: u,
			origin: y,
			dist: _,
			delta: x,
			transformOrigin: E,
			drag: D
		}, ec({
			transformOrigin: E,
			transform: D.transform
		}, t)), { afterTransform: D.transform }));
		return Q(e, "onDragOrigin", O), O;
	},
	dragControlEnd: function(e, t) {
		return t.datas.isDragOrigin ? (Q(e, "onDragOriginEnd", nc(e, t, {})), !0) : !1;
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
function Cl(e, t, n, r) {
	var i = e.filter(function(e) {
		var t = e.virtual;
		return e.horizontal && !t;
	}).length, a = e.filter(function(e) {
		var t = e.virtual;
		return e.vertical && !t;
	}).length, o = -1;
	if (t === 0 && (i === 0 ? o = 0 : i === 1 && (o = 1)), t === 2 && (i <= 2 ? o = 2 : i <= 3 && (o = 3)), t === 3 && (a === 0 ? o = 4 : a < 4 && (o = 7)), t === 1 && (a <= 1 ? o = 5 : a <= 2 && (o = 6)), !(o === -1 || !e[o].virtual)) {
		var s = e[o];
		wl(e, o), o < 4 ? s.pos[0] = n : s.pos[1] = r;
	}
}
function wl(e, t) {
	t < 4 ? e.slice(0, t + 1).forEach(function(e) {
		e.virtual = !1;
	}) : (e[0].virtual && (e[0].virtual = !1), e.slice(4, t + 1).forEach(function(e) {
		e.virtual = !1;
	}));
}
function Tl(e, t) {
	t < 4 ? e.slice(t, 4).forEach(function(e) {
		e.virtual = !0;
	}) : e.slice(t).forEach(function(e) {
		e.virtual = !0;
	});
}
function El(e, t, n, r, i) {
	r === void 0 && (r = [0, 0]);
	var a = [];
	return a = !e || e === "0px" ? [] : Qe(e), cl(a, t, n, 0, 0, r, i);
}
function Dl(e, t, n, r, i) {
	var a = e.state, o = a.width, s = a.height, c = ol(i, e.props.roundRelative, o, s), l = c.raws, u = c.styles, d = c.radiusPoses, f = dl(d, l), p = f.horizontals, m = f.verticals, h = u.join(" ");
	a.borderRadiusState = h;
	var g = Z(e, t, q({
		horizontals: p,
		verticals: m,
		borderRadius: h,
		width: o,
		height: s,
		delta: r,
		dist: n
	}, ec({ borderRadius: h }, t)));
	return Q(e, "onRound", g), g;
}
function Ol(e) {
	var t = e.getState().style, n = t.borderRadius || "";
	if (!n && e.props.groupable) {
		var r = e.moveables[0], i = e.getTargets()[0];
		i && (r?.props.target === i ? (n = e.moveables[0]?.state.style.borderRadius ?? "", t.borderRadius = n) : (n = ic(i).borderRadius, t.borderRadius = n));
	}
	return n;
}
var kl = {
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
		var x = u || Ol(e), S = s ? 4 : 3, C = El(x, i, a, p, !0);
		if (!C) return null;
		var w = 0, T = 0, E = b ? [0, 0] : [c, l];
		return C.map(function(e, n) {
			var r = e.horizontal, i = e.vertical, a = e.direction || "", s = Y([], J(e.pos), !1);
			T += Math.abs(r), w += Math.abs(i), r && a.indexOf("n") > -1 && (s[1] -= v), i && a.indexOf("w") > -1 && (s[0] -= v), r && a.indexOf("s") > -1 && (s[1] += v), i && a.indexOf("e") > -1 && (s[0] += v);
			var c = K(As(o, s, S), E), l = y && y !== "horizontal", u = e.vertical ? w <= h[1] && (l || !e.virtual) : T <= h[0] && (y || !e.virtual);
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
		r.lineIndex = l, r.controlIndex = c, r.isControl = o, r.isLine = s, si(e, t);
		var f = e.props, p = f.roundRelative, m = f.minRoundControls, h = m === void 0 ? [0, 0] : m, g = e.state, _ = g.width, v = g.height;
		r.isRound = !0, r.prevDist = [0, 0];
		var y = El(Ol(e) || "", _, v, h, !0) || [];
		return r.controlPoses = y, g.borderRadiusState = ol(y, p, _, v).styles.join(" "), d;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = n.controlPoses;
		if (!n.isRound || !n.isControl || !r.length) return !1;
		var i = n.controlIndex, a = J(mi(t), 2), o = a[0], s = a[1], c = [o, s], l = K(c, n.prevDist), u = e.props.maxRoundControls, d = u === void 0 ? [4, 4] : u, f = e.state, p = f.width, m = f.height, h = r[i], g = h.vertical, _ = h.horizontal, v = r.map(function(e) {
			var t = e.horizontal, n = e.vertical, r = [t * _ * c[0], n * g * c[1]];
			if (t) {
				if (d[0] === 1 || d[0] < 4 && t !== _) return r;
			} else if (d[1] === 0) return r[1] = n * _ * c[0] / p * m, r;
			else if (g && (d[1] === 1 || d[1] < 4 && n !== g)) return r;
			return [0, 0];
		});
		v[i] = c;
		var y = r.map(function(e, t) {
			return q(q({}, e), { pos: Gt(e.pos, v[t]) });
		});
		return i < 4 ? y.slice(0, i + 1).forEach(function(e) {
			e.virtual = !1;
		}) : y.slice(4, i + 1).forEach(function(e) {
			e.virtual = !1;
		}), n.prevDist = [o, s], Dl(e, t, c, l, y);
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
			if (a && (f === !0 || f === "control")) Tl(l, o);
			else if (s && (f === !0 || f === "line")) {
				var p = J(oi(e, t), 2), m = p[0], h = p[1];
				Cl(l, c, m, h);
			}
			u !== l.filter(function(e) {
				return e.virtual;
			}).length && Dl(e, t, [0, 0], [0, 0], l);
		}
		var g = nc(e, t, {});
		return Q(e, "onRoundEnd", g), n.borderRadiusState = "", g;
	},
	dragGroupControlStart: function(e, t) {
		var n = this.dragControlStart(e, t);
		if (!n) return !1;
		var r = e.moveables, i = e.props.targets, a = $i(e, "roundable", t);
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
		var r = e.moveables, i = e.props.targets, a = $i(e, "roundable", t), o = q({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return q(q(q({}, e), {
					target: i[t],
					moveable: r[t],
					currentTarget: r[t]
				}), ec({ borderRadius: n.borderRadius }, e));
			})
		}, n);
		return Q(e, "onRoundGroup", o), o;
	},
	dragGroupControlEnd: function(e, t) {
		var n = e.moveables, r = e.props.targets, i = $i(e, "roundable", t);
		rc(e, "onRound", function(t) {
			Q(e, "onRoundGroup", q({
				targets: e.props.targets,
				events: i.map(function(e, i) {
					return q(q(q({}, e), {
						target: r[i],
						moveable: n[i],
						currentTarget: n[i]
					}), ec({ borderRadius: t.borderRadius }, e));
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
function Al(e, t) {
	var n = rn(t ? 4 : 3);
	return e === `matrix${t ? "3d" : ""}(${n.join(",")})` || e === "matrix(1,0,0,1,0,0)";
}
var jl = {
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
		var n = e.state, r = n.is3d, i = n.targetMatrix, a = n.inlineTransform, o = r ? `matrix3d(${i.join(",")})` : `matrix(${qt(i, !0)})`, s = !a || a === "none" ? o : a;
		t.datas.startTransforms = Al(s, r) ? [] : Qe(s);
	},
	resetStyle: function(e) {
		var t = e.datas;
		t.nextStyle = {}, t.nextTransforms = e.datas.startTransforms, t.nextTransformAppendedIndexes = [];
	},
	fillDragStartParams: function(e, t) {
		return Z(e, t, {
			setTransform: function(e) {
				t.datas.startTransforms = Ue(e) ? e : Qe(e);
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
		var r = $i(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
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
		var r = $i(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
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
}, Ml = {
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
		var n = this, r = $i(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragParams(r, e);
		});
		Q(e, "onRenderGroup", Z(e, t, q(q({
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			transform: ji(t),
			transformObject: {}
		}, ec(Mi(t))), { events: a })));
	},
	dragGroupEnd: function(e, t) {
		var n = this, r = $i(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragEndParams(r, e);
		});
		Q(e, "onRenderGroupEnd", Z(e, t, q({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			targets: e.props.targets,
			events: a,
			transformObject: {},
			transform: ji(t)
		}, ec(Mi(t)))));
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
		return pn(Ai(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), Z(e, t, q({
			isPinch: !!t.isPinch,
			transformObject: n,
			transform: ji(t)
		}, ec(Mi(t))));
	},
	fillDragEndParams: function(e, t) {
		var n = {};
		return pn(Ai(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), Z(e, t, q({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			transformObject: n,
			transform: ji(t)
		}, ec(Mi(t))));
	}
};
function Nl(e, t, n, r, i, a, o) {
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
	}), C(jl, `drag${r}${i}`);
	var w = 0, T = 0;
	n.forEach(function(t) {
		if (_) return !1;
		var n = `${t}${r}${i}`, o = `${t}${r}Condition`;
		i === "" && !d && pc(e.state, a);
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
	}), (!l || T) && C(Ml, `drag${r}${i}`);
	var E = S !== e[x] || w === n.length;
	return (c || _ || E) && (e.state.gestos = {}, e.moveables && e.moveables.forEach(function(e) {
		e.state.gestos = {};
	}), p.forEach(function(t) {
		t.unset && t.unset(e);
	})), s && !E && !d && T && e.props.preventDefault && a?.preventDefault(), e.isUnmounted || E ? !1 : ((!s && T && !o || c) && (e.props.flushSync || ps)(function() {
		e.updateRect(c ? i : "", !0, !1), e.forceUpdate();
	}), !s && !c && !l && T && !o && Nl(e, t, n, r, i + "After", a), !0);
}
function Pl(e, t) {
	return function(n, r) {
		r === void 0 && (r = n.inputEvent.target);
		var i = r, a = e.areaElement, o = e._dragTarget;
		return !o || !t && e.controlGesto?.isFlag() ? !1 : i === o || o.contains(i) || i === a || !e.isMoveableElement(i) && !e.controlBox.contains(i) || St(i, "moveable-area") || St(i, "moveable-padding") || St(i, "moveable-edgeDraggable");
	};
}
function Fl(e, t, n) {
	var r = e.controlBox, i = [], a = e.props, o = a.dragArea, s = e.state.target, c = a.dragTarget;
	i.push(r), (!o || c) && i.push(t), !o && c && s && t !== s && a.dragTargetSelf && i.push(s);
	var l = Pl(e);
	return Ll(e, i, "targetAbles", n, {
		dragStart: l,
		pinchStart: l
	});
}
function Il(e, t) {
	var n = e.controlBox, r = [];
	r.push(n);
	var i = Pl(e, !0), a = function(e, t) {
		return t === void 0 && (t = e.inputEvent.target), t === n || !i(e, t);
	};
	return Ll(e, r, "controlAbles", t, {
		dragStart: a,
		pinchStart: a
	});
}
function Ll(e, t, n, r, i) {
	i === void 0 && (i = {});
	var a = n === "targetAbles", o = e.props, s = o.pinchOutside, c = o.pinchThreshold, l = o.preventClickEventOnDrag, u = o.preventClickDefault, d = o.checkInput, f = o.dragFocusedInput, p = o.preventDefault, m = p === void 0 || p, h = o.preventRightClick, g = h === void 0 || h, _ = o.preventWheelClick, v = _ === void 0 || _, y = o.dragContainer, b = new pr(t, {
		preventDefault: m,
		preventRightClick: g,
		preventWheelClick: v,
		container: xc(y, !0) || At(e.getControlBoxElement()),
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
					Nl(e, Y([], J(e[n]), !1), u, r, a, o) ? (e.props.stopPropagation || a === "Start" && x) && ((s = o?.inputEvent) == null || s.stopPropagation()) : o.stop();
				}
			});
		});
	}), b;
}
var Rl = /* @__PURE__ */ function() {
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
function zl(e, t, n, r) {
	n === void 0 && (n = t);
	var i = Gi(e, t), a = i.matrixes, o = i.is3d, s = i.targetMatrix, c = i.transformOrigin, l = i.targetOrigin, u = i.offsetContainer, d = i.hasFixed, f = i.zoom, p = Zi(u, n), m = p.matrixes, h = p.is3d, g = p.offsetContainer, _ = p.zoom, v = r || h || o, y = v ? 4 : 3, b = e.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in e, x = s, S = rn(y), C = rn(y), w = rn(y), T = rn(y), E = a.length, D = m.map(function(e) {
		return q(q({}, e), { matrix: e.matrix ? Y([], J(e.matrix), !1) : void 0 });
	}).reverse();
	a.reverse(), !o && v && (x = Ht(x, 3, 4), ws(a)), !h && v && ws(D), D.forEach(function(e) {
		C = Wt(C, e.matrix, y);
	});
	var O = n || kt(e), k = D[0]?.target || xs(O, O, !0).offsetParent, A = D.slice(1).reduce(function(e, t) {
		return Wt(e, t.matrix, y);
	}, rn(y));
	a.forEach(function(e, t) {
		if (E - 2 === t && (w = S.slice()), E - 1 === t && (T = S.slice()), !e.matrix) {
			var n = a[t + 1];
			e.matrix = on(Ps(e, n, k, y, Wt(A, S, y)), y);
		}
		S = Wt(S, e.matrix, y);
	});
	var j = !b && o;
	x ||= rn(j ? 4 : 3);
	var M = Es(b && x.length === 16 ? Ht(x, 4, 3) : x, j), N = C;
	return C = It(C, y, y), {
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
function Bl(e, t, n, r) {
	n === void 0 && (n = t);
	var i = 0, a = 0, o = 0, s = {}, c = Vs(e);
	if (e && (i = c.offsetWidth, a = c.offsetHeight), e) {
		var l = zl(e, t, n, r), u = ai(l.allMatrix, l.transformOrigin, i, a);
		s = q(q({}, l), u);
		var d = ai(l.allMatrix, [50, 50], 100, 100);
		o = Hs([d.pos1, d.pos2], d.direction);
	}
	var f = r ? 4 : 3;
	return q(q(q({
		hasZoom: !1,
		width: i,
		height: a,
		rotation: o
	}, c), {
		originalRootMatrix: rn(f),
		rootMatrix: rn(f),
		beforeMatrix: rn(f),
		offsetMatrix: rn(f),
		allMatrix: rn(f),
		targetMatrix: rn(f),
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
function Vl(e, t, n, r, i, a) {
	a === void 0 && (a = []);
	var o = 1, s = [0, 0], c = Us(), l = Us(), u = Us(), d = Us(), f = [0, 0], p = {}, m = Bl(t, n, i, !0);
	if (t) {
		var h = Qi(t);
		a.forEach(function(e) {
			p[e] = h(e);
		});
		var g = m.is3d ? 4 : 3, _ = ai(m.offsetMatrix, Gt(m.transformOrigin, zt(m.targetMatrix, g)), m.width, m.height);
		o = _.direction, s = Gt(_.origin, [_.left - m.left, _.top - m.top]), d = Ks(m.offsetRootContainer);
		var v = xs(r, r, !0).offsetParent || m.offsetRootContainer;
		if (m.hasZoom) {
			var y = ai(Wt(m.originalRootMatrix, m.allMatrix), m.transformOrigin, m.width, m.height), b = ai(m.originalRootMatrix, vs(Qi(v)("transformOrigin")).map(function(e) {
				return parseFloat(e);
			}), v.offsetWidth, v.offsetHeight);
			if (c = Gs(y, d), u = Gs(b, d, v, !0), e) {
				var x = y.left, S = y.top;
				l = Gs({
					left: x,
					top: S,
					bottom: S,
					right: S
				}, d);
			}
		} else {
			c = Ks(t), u = Xi(v), e && (l = Ks(e));
			var C = u.left, w = u.top, T = u.clientLeft, E = u.clientTop, D = [c.left - C, c.top - w];
			f = K(fc(m.rootMatrix, D, 4), [T + m.left, E + m.top]);
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
function Hl(e) {
	var t = e.pos1, n = e.pos2, r = e.pos3, i = e.pos4;
	if (!t || !n || !r || !i) return null;
	var a = Un([
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
var Ul = /* @__PURE__ */ function(e) {
	Tr(t, e);
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
		}, Vl(null)), t.renderState = {}, t.enabledAbles = [], t.targetAbles = [], t.controlAbles = [], t.rotation = 0, t.scale = [1, 1], t.isMoveableMounted = !1, t.isUnmounted = !1, t.events = {
			mouseEnter: null,
			mouseLeave: null
		}, t._emitter = new kn(), t._prevOriginalDragTarget = null, t._originalDragTarget = null, t._prevDragTarget = null, t._dragTarget = null, t._prevPropTarget = null, t._propTarget = null, t._prevDragArea = !1, t._isPropTargetChanged = !1, t._hasFirstTarget = !1, t._reiszeObserver = null, t._observerId = 0, t._mutationObserver = null, t._rootContainer = null, t._viewContainer = null, t._viewClassNames = [], t._store = {}, t.checkUpdateRect = function() {
			if (!t.isDragging()) {
				var e = t.props.parentMoveable;
				if (e) {
					e.checkUpdateRect();
					return;
				}
				st(t._observerId), t._observerId = ot(function() {
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
		return u && (O["--moveable-line-padding"] = u), d && (O["--moveable-control-padding"] = d), V.createElement(c, q({
			cspNonce: o,
			ref: De(this, "controlBox"),
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
		this.isMoveableMounted = !1, this.isUnmounted = !0, this._emitter.off(), (e = this._reiszeObserver) == null || e.disconnect(), (t = this._mutationObserver) == null || t.disconnect(), this._viewContainer && this._changeAbleViewClassNames([]), $s(this, !1), $s(this, !0);
		var n = this.events;
		for (var r in n) {
			var i = n[r];
			i && i.destroy();
		}
	}, t.prototype.getTargets = function() {
		var e = this.props.target;
		return e ? [e] : [];
	}, t.prototype.getAble = function(e) {
		return at(this.props.ables || [], function(t) {
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
		return e && (e.getAttribute?.call(e, "class") || "").indexOf(Gr) > -1;
	}, t.prototype.dragStart = function(e, t) {
		t === void 0 && (t = e.target);
		var n = this.targetGesto, r = this.controlGesto;
		return n && Pl(this)({ inputEvent: e }, t) ? n.isFlag() || n.triggerDragStart(e) : r && this.isMoveableElement(t) && (r.isFlag() || r.triggerDragStart(e)), this;
	}, t.prototype.hitTest = function(e) {
		var t = this.state, n = t.target, r = t.pos1, i = t.pos2, a = t.pos3, o = t.pos4, s = t.targetClientRect;
		if (!n) return 0;
		var c;
		if (Mt(e)) {
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
		var u = c.left, d = c.top, f = c.width, p = c.height, m = Hn([
			r,
			i,
			o,
			a
		], s), h = Zn(m, [
			[u, d],
			[u + f, d],
			[u + f, d + p],
			[u, d + p]
		]), g = Vn(m);
		return !h || !g ? 0 : Math.min(100, h / g * 100);
	}, t.prototype.isInside = function(e, t) {
		var n = this.state, r = n.target, i = n.pos1, a = n.pos2, o = n.pos3, s = n.pos4, c = n.targetClientRect;
		return r ? Wn([e, t], Hn([
			i,
			a,
			s,
			o
		], c)) : !1;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.props, i = !r.parentPosition && !r.wrapperMoveable;
		i && Yi(!0);
		var a = r.parentMoveable, o = this.state.target || r.target, s = this.getContainer(), c = a ? a._rootContainer : this._rootContainer, l = Vl(this.controlBox, o, s, s, c || s, this._getRequestStyles());
		if (!o && this._hasFirstTarget && r.persistData) {
			var u = Hl(r.persistData);
			for (var d in u) l[d] = u[d];
		}
		i && Yi(), this.updateState(l, !a && n);
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
		var e = this.state, t = Zs(this.state), n = J(t, 4), r = n[0], i = n[1], a = n[2], o = n[3], s = Ms(t), c = e.width, l = e.height, u = s.width, d = s.height, f = s.left, p = s.top, m = [e.left, e.top], h = Gt(m, e.origin);
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
			beforeOrigin: Gt(m, e.beforeOrigin),
			origin: h,
			transformOrigin: e.transformOrigin,
			rotation: this.getRotation()
		};
	}, t.prototype.getManager = function() {
		return this;
	}, t.prototype.stopDrag = function(e) {
		if (!e || e === "target") {
			var t = this.targetGesto;
			t?.isIdle() === !1 && Qs(this, !1), t?.stop();
		}
		if (!e || e === "control") {
			var t = this.controlGesto;
			t?.isIdle() === !1 && Qs(this, !0), t?.stop();
		}
	}, t.prototype.getRotation = function() {
		var e = this.state, t = e.pos1, n = e.pos2, r = e.direction;
		return Cc(t, n, r);
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this, i = r.props, a = i.parentMoveable || i.wrapperMoveable || r, o = a.props.ables, s = i.groupable, c = at(o, function(t) {
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
				return Nl(r, p, ["drag"], f, "", q(q({}, l.request(t)), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			},
			requestEnd: function() {
				return Nl(r, p, ["drag"], f, "End", q(q({}, l.requestEnd()), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			}
		};
		return Nl(r, p, ["drag"], f, "Start", q(q({}, l.requestStart(t)), {
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
		var h = Pc(n || {}), g = h.left, _ = h.top, v = h.bottom, y = h.right, b = o ? 4 : 3, x = [];
		x = p ? i : this.controlBox && t.groupable ? r : Gt(r, [d, f]);
		var S = Ut(b, on(x.map(function(e) {
			return -e;
		}), b), a, on(i, b)), C = mc(S, s, [-g, -_], b), w = mc(S, c, [y, -_], b), T = mc(S, l, [-g, v], b), E = mc(S, u, [y, v], b);
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
				[mc(S, s, [-g - D, -_], b), mc(S, c, [y + D, -_], b)],
				[mc(S, c, [y, -_ - D], b), mc(S, u, [y, v + D], b)],
				[mc(S, u, [y + D, v], b), mc(S, l, [-g - D, v], b)],
				[mc(S, l, [-g, v + D], b), mc(S, s, [-g, -_ - D], b)]
			];
		}
	}, t.prototype.checkUpdate = function() {
		this._isPropTargetChanged = !1;
		var e = this.props, t = e.target, n = e.container, r = e.parentMoveable, i = this.state, a = i.target, o = i.container;
		if (!(!a && !t)) {
			this.updateAbles();
			var s = !oc(a, t);
			if (s || !oc(o, n)) {
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
		return n[r] || (n[r] = Cr(e, t)), n[r];
	}, t.prototype.getState = function() {
		var e = this.props;
		(e.target || e.targets?.length) && (this._hasFirstTarget = !0);
		var t = this.controlBox, n = e.persistData, r = e.firstRenderState;
		if (r && !t) return r;
		if (!this._hasFirstTarget && n) {
			var i = Hl(n);
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
		var n = this.props.triggerAblesSimultaneously, r = this.getEnabledAbles(e), i = `drag${t}Start`, a = `pinch${t}Start`, o = `drag${t}ControlStart`, s = ac(r, [i, a], n), c = ac(r, [o], n);
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
		var e = this, t = this.props.triggerAblesSimultaneously, n = { createElement: V.createElement };
		return this.renderState = {}, lc(uc(ac(this.getEnabledAbles(), ["render"], t).map(function(t) {
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
		(!e && this.targetGesto || this._isTargetChanged(!0)) && ($s(this, !1), this.updateState({ gestos: {} })), t || $s(this, !0), n && e && !this.targetGesto && (this.targetGesto = Fl(this, n, "")), !this.controlGesto && t && (this.controlGesto = Il(this, "Control"));
	}, t.prototype._updateTargets = function() {
		var e = this.props;
		this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = xc(this._originalDragTarget, !0);
	}, t.prototype._renderLines = function() {
		var e = this.props, t = e.zoom, n = e.hideDefaultLines, r = e.hideChildMoveableDefaultLines, i = e.parentMoveable;
		if (n || i && r) return [];
		var a = this.getState(), o = { createElement: V.createElement };
		return a.renderLines.map(function(e, n) {
			return aa(o, "", e[0], e[1], t, `render-line-${n}`);
		});
	}, t.prototype._isTargetChanged = function(e) {
		var t = this.props, n = t.dragTarget || t.target, r = this._prevOriginalDragTarget, i = this._prevDragArea, a = t.dragArea;
		return !a && r !== n || (e || a) && i !== a || this._prevPropTarget != this._propTarget;
	}, t.prototype._updateNativeEvents = function() {
		var e = this, t = this.props.dragArea ? this.areaElement : this.state.target, n = this.events, r = ct(n);
		if (this._isTargetChanged()) for (var i in n) {
			var a = n[i];
			a && a.destroy(), n[i] = null;
		}
		if (t) {
			var o = this.enabledAbles;
			r.forEach(function(r) {
				var i = ac(o, [r]), a = i.length > 0, s = n[r];
				if (!a) {
					s && (s.destroy(), n[r] = null);
					return;
				}
				s || (s = new Rl(t, e, r), n[r] = s), s.setAbles(i);
			});
		}
	}, t.prototype._checkUpdateRootContainer = function() {
		var e = this.props.rootContainer;
		!this._rootContainer && e && (this._rootContainer = xc(e, !0));
	}, t.prototype._checkUpdateViewContainer = function() {
		var e = this.props.viewContainer;
		!this._viewContainer && e && (this._viewContainer = xc(e, !0)), this._viewContainer && this._changeAbleViewClassNames(Y(Y([], J(this._getAbleViewClassNames()), !1), [this.isDragging() ? Gc : ""], !1));
	}, t.prototype._changeAbleViewClassNames = function(e) {
		var t = this._viewContainer, n = cc(e.filter(Boolean), function(e) {
			return e;
		}).map(function(e) {
			return J(e, 1)[0];
		}), r = this._viewClassNames, i = bn(r, n), a = i.removed, o = i.added;
		a.forEach(function(e) {
			wt(t, r[e]);
		}), o.forEach(function(e) {
			Ct(t, n[e]);
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
		var t, n = this.props, r = n.target, i = At(this.getControlBoxElement());
		if (!i.ResizeObserver || !r || !n.useResizeObserver) {
			(t = this._reiszeObserver) == null || t.disconnect();
			return;
		}
		if (!(e.target === r && this._reiszeObserver)) {
			var a = new i.ResizeObserver(this.checkUpdateRect);
			a.observe(r, { box: "border-box" }), this._reiszeObserver = a;
		}
	}, t.prototype._updateMutationObserver = function(e) {
		var t = this, n, r = this.props, i = r.target, a = At(this.getControlBoxElement());
		if (!a.MutationObserver || !i || !r.useMutationObserver) {
			(n = this._mutationObserver) == null || n.disconnect();
			return;
		}
		if (!(e.target === i && this._mutationObserver)) {
			var o = new a.MutationObserver(function(e) {
				var n, r;
				try {
					for (var i = Or(e), a = i.next(); !a.done; a = i.next()) {
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
		flushSync: ps,
		firstRenderState: null,
		persistData: null,
		viewContainer: null,
		requestStyles: [],
		useAccuratePosition: !1
	}, t;
}(V.PureComponent), Wl = {
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
		var d = jc(e, "parentPosition", [a, o], function(e) {
			return e.join(",");
		}), f = jc(e, "requestStyles", e.getRequestChildStyles(), function(e) {
			return e.join(",");
		});
		return e.moveables = e.moveables.slice(0, r.length), Y(Y([], J(r.map(function(r, i) {
			return t.createElement(Ul, {
				key: "moveable" + i,
				ref: Oe(e, "moveables", i),
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
		})), !1), J(uc(l.map(function(e, n) {
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
				return aa(t, "", K(r[o], d), K(r[s], d), c, `group-rect-${n}-${i}`);
			});
		}))), !1);
	}
}, Gl = kr("clickable", {
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
			a === -1 && (a = it(i, function(e) {
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
function Kl(e) {
	var t = e.originalDatas.draggable;
	return t ||= (e.originalDatas.draggable = {}, e.originalDatas.draggable), q(q({}, e), { datas: t });
}
var ql = kr("edgeDraggable", {
	css: [".edge.edgeDraggable.line {\ncursor: move;\n}"],
	render: function(e, t) {
		var n = e.props, r = n.edgeDraggable;
		return r ? oa(t, "edgeDraggable", r, e.getState().renderPoses, n.zoom) : [];
	},
	dragCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && St(r, X("direction")) && St(r, X("edge")) && St(r, X("edgeDraggable"));
	},
	dragStart: function(e, t) {
		return yo.dragStart(e, Kl(t));
	},
	drag: function(e, t) {
		return yo.drag(e, Kl(t));
	},
	dragEnd: function(e, t) {
		return yo.dragEnd(e, Kl(t));
	},
	dragGroupCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && St(r, X("direction")) && St(r, X("line"));
	},
	dragGroupStart: function(e, t) {
		return yo.dragGroupStart(e, Kl(t));
	},
	dragGroup: function(e, t) {
		return yo.dragGroup(e, Kl(t));
	},
	dragGroupEnd: function(e, t) {
		return yo.dragGroupEnd(e, Kl(t));
	},
	unset: function(e) {
		return yo.unset(e);
	}
}), Jl = {
	name: "individualGroupable",
	props: ["individualGroupable", "individualGroupableProps"],
	events: []
}, Yl = [
	jl,
	Qc,
	ds,
	Fc,
	yo,
	ql,
	wo,
	Lc,
	Vc,
	jo,
	Zc,
	$c,
	Yc,
	Sl,
	xl,
	kl,
	Wl,
	Jl,
	Gl,
	Jc,
	Ml
];
function Xl(e, t) {
	var n = J(e, 3), r = n[0], i = n[1], a = n[2];
	return (r * t[0] + i * t[1] + a) / Math.sqrt(r * r + i * i);
}
function Zl(e, t) {
	var n = J(e, 2), r = n[0], i = n[1];
	return -r * t[0] - i * t[1];
}
function Ql(e, t) {
	return Math.max.apply(Math, Y([], J(e.map(function(e) {
		var n = J(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.max(r[t], i[t], a[t], o[t]);
	})), !1));
}
function $l(e, t) {
	return Math.min.apply(Math, Y([], J(e.map(function(e) {
		var n = J(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.min(r[t], i[t], a[t], o[t]);
	})), !1));
}
function eu(e, t) {
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
	var d = G(t, Yr);
	if (d % 90) {
		var f = d / 180 * Math.PI, p = Math.tan(f), m = -1 / p, h = [Zr, Qr], g = [[0, 0], [0, 0]], _ = [Zr, Qr], v = [[0, 0], [0, 0]];
		e.forEach(function(e) {
			e.forEach(function(e) {
				var t = Xl([
					-p,
					1,
					0
				], e), n = Xl([
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
			Zl([-p, 1], b)
		], E = [
			-p,
			1,
			Zl([-p, 1], x)
		], D = [
			-m,
			1,
			Zl([-m, 1], C)
		], O = [
			-m,
			1,
			Zl([-m, 1], w)
		];
		n = J([
			[T, D],
			[T, O],
			[E, D],
			[E, O]
		].map(function(e) {
			var t = J(e, 2), n = t[0], r = t[1];
			return Kn(n, r)[0];
		}), 4), a = n[0], o = n[1], s = n[2], c = n[3], l = _[1] - _[0], u = h[1] - h[0];
	} else {
		var k = $l(e, 0), A = $l(e, 1), j = Ql(e, 0), M = Ql(e, 1);
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
	var P = Un([
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
function tu(e, t) {
	var n = t.map(function(t) {
		if (Ue(t)) {
			var n = tu(e, t), r = n.length;
			return r > 1 ? n : r === 1 ? n[0] : null;
		}
		var i = at(e, function(e) {
			return e.manager.props.target === t;
		});
		return i ? (i.finded = !0, i.manager) : null;
	}).filter(Boolean);
	return n.length === 1 && Ue(n[0]) ? n[0] : n;
}
var nu = /* @__PURE__ */ function(e) {
	Tr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.differ = new Tn(), t.moveables = [], t.transformOrigin = "50% 50%", t.renderGroupRects = [], t._targetGroups = [], t._hasFirstTargets = !1, t;
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
		Yi(!0), this.moveables.forEach(function(t) {
			t.updateRect(e, !1, !1);
		});
		var i = this.props, a = this.moveables, o = r.target || i.target, s = a.map(function(e) {
			return {
				finded: !1,
				manager: e
			};
		}), c = this.props.targetGroups || [], l = tu(s, c), u = i.useDefaultGroupRotate;
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
				if (Ue(e)) {
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
					poses: Zs(e.state),
					rotation: e.getRotation()
				};
			}), i = r.map(function(e) {
				return e.rotation;
			}), a = 0, o = i[0], s = i.every(function(e) {
				return Math.abs(o - e) < .1;
			});
			return a = f ? !u && s ? o : p : !u && !n && s ? o : t, eu(r.map(function(e) {
				return e.poses;
			}), a);
		}
		var g = h(l, this.rotation, !0);
		f && (this.rotation = g.rotation, this.transformOrigin = i.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = c, this.renderGroupRects = d;
		var _ = this.transformOrigin, v = this.rotation, y = this.scale, b = g.width, x = g.height, S = g.minX, C = g.minY, w = Un(kc([
			[0, 0],
			[b, 0],
			[0, x],
			[b, x]
		], Oc(_, b, x), this.rotation / 180 * Math.PI).result), T = w.minX, E = w.minY, D = ` rotate(${v}deg) scale(${Mc(y[0])}, ${Mc(y[1])})`, O = `translate(${-T}px, ${-E}px)${D}`;
		this.controlBox.style.transform = `translate3d(${S}px, ${C}px, ${this.props.translateZ || 0})`, o.style.cssText += `left:0px;top:0px;transform-origin:${_};width:${b}px;height:${x}px;transform: ${O}`, r.width = b, r.height = x;
		var k = this.getContainer(), A = Vl(this.controlBox, o, this.controlBox, this.getContainer(), this._rootContainer || k, []), j = [A.left, A.top], M = J(Zs(A), 4), N = M[0], P = M[1], F = M[2], I = M[3], L = Un([
			N,
			P,
			F,
			I
		]), R = [L.minX, L.minY], z = Mc(y[0] * y[1]);
		A.pos1 = K(N, R), A.pos2 = K(P, R), A.pos3 = K(F, R), A.pos4 = K(I, R), A.left = S - A.left + R[0], A.top = C - A.top + R[1], A.origin = K(Gt(j, A.origin), R), A.beforeOrigin = K(Gt(j, A.beforeOrigin), R), A.originalBeforeOrigin = Gt(j, A.originalBeforeOrigin), A.transformOrigin = K(Gt(j, A.transformOrigin), R), o.style.transform = `translate(${-T - R[0]}px, ${-E - R[1]}px)` + D, Yi(), this.updateState(q(q({}, A), {
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
		e.prototype.updateAbles.call(this, Y(Y([], J(this.props.ables), !1), [Wl], !1), "Group");
	}, t.prototype._updateTargets = function() {
		e.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = xc(this._originalDragTarget, !0);
	}, t.prototype._updateEvents = function() {
		var e = this.state, t = this.props, n = this._prevDragTarget, r = t.dragTarget || this.areaElement, i = t.targets, a = this.differ.update(i), o = a.added, s = a.changed, c = a.removed, l = o.length || c.length;
		(l || this._prevOriginalDragTarget !== this._originalDragTarget) && ($s(this, !1), $s(this, !0), this.updateState({ gestos: {} })), n !== r && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto ||= Fl(this, this._dragTarget, "Group"), this.controlGesto ||= Il(this, "GroupControl"));
		var u = !oc(e.container, t.container);
		u && (e.container = t.container), (u || l || this.transformOrigin !== (t.defaultGroupOrigin || "50% 50%") || s.length || i.length && !Ac(this._targetGroups, t.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!l;
	}, t.prototype._updateObserver = function() {}, t.defaultProps = q(q({}, Ul.defaultProps), {
		transformOrigin: ["50%", "50%"],
		groupable: !0,
		dragArea: !0,
		keepRatio: !0,
		targets: [],
		defaultGroupRotate: 0,
		defaultGroupOrigin: "50% 50%"
	}), t;
}(Ul), ru = /* @__PURE__ */ function(e) {
	Tr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.moveables = [], t;
	}
	return t.prototype.render = function() {
		var e = this, t = this.props, n = t.cspNonce, r = t.cssStyled, i = t.persistData, a = t.targets || [], o = a.length, s = this.isUnmounted || !o, c = i?.children ?? [];
		return s && !o && c.length ? a = c.map(function() {
			return null;
		}) : s || (c = []), V.createElement(r, {
			cspNonce: n,
			ref: De(this, "controlBox"),
			className: X("control-box")
		}, a.map(function(n, r) {
			var i = t.individualGroupableProps?.call(t, n, r) ?? {};
			return V.createElement(Ul, q({
				key: "moveable" + r,
				ref: Oe(e, "moveables", r)
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
		n === void 0 && (n = !0), Yi(!0), this.moveables.forEach(function(r) {
			r.updateRect(e, t, n);
		}), Yi();
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
		var n = t, r = at(this.moveables, function(e) {
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
}(Ul);
function iu(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (We(e)) {
				t[e] && n.push.apply(n, Y([], J(t[e]), !1));
				return;
			}
			Ue(e) ? n.push.apply(n, Y([], J(iu(e, t)), !1)) : n.push(e);
		}
	}), n;
}
function au(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (We(e)) {
				t[e] && n.push.apply(n, Y([], J(t[e]), !1));
				return;
			}
			Ue(e) ? n.push(au(e, t)) : n.push(e);
		}
	}), n;
}
function ou(e, t) {
	return e.length !== t.length || e.some(function(e, n) {
		var r = t[n];
		return !e && !r || e == r ? !1 : Ue(e) && Ue(r) ? ou(e, r) : !0;
	});
}
var su = /* @__PURE__ */ function(e) {
	Tr(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.defaultAbles = Yl, t;
}(/* @__PURE__ */ function(e) {
	Tr(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.refTargets = [], t.selectorMap = {}, t._differ = new Tn(), t._elementTargets = [], t._tmpRefTargets = [], t._tmpSelectorMap = {}, t._onChangeTargets = null, t;
	}
	return t.makeStyled = function() {
		var e = {};
		this.getTotalAbles().forEach(function(t) {
			var n = t.css;
			n && n.forEach(function(t) {
				e[t] = !0;
			});
		});
		var t = ct(e).join("\n");
		this.defaultStyled = Cr("div", Ee(Gr, Kr + t));
	}, t.getTotalAbles = function() {
		return Y([
			Qc,
			Wl,
			Jl,
			Jc
		], J(this.defaultAbles), !1);
	}, t.prototype.render = function() {
		var e = this.constructor;
		e.defaultStyled || e.makeStyled();
		var t = this.props, n = t.ables, r = t.props, i = Er(t, ["ables", "props"]), a = J(this._updateRefs(!0), 2), o = a[0], s = a[1], c = iu(o, s), l = c.length > 1, u = Y(Y([], J(e.getTotalAbles()), !1), J(n || []), !1), d = q(q(q({}, i), r || {}), {
			ables: u,
			cssStyled: e.defaultStyled,
			customStyledMap: e.customStyledMap
		});
		this._elementTargets = c;
		var f = null, p = this.moveable;
		if (i.persistData?.children && (l = !0), i.individualGroupable) return V.createElement(ru, q({
			key: "individual-group",
			ref: De(this, "moveable")
		}, d, {
			target: null,
			targets: c
		}));
		if (l) {
			var m = au(o, s);
			if (p && !p.props.groupable && !p.props.individualGroupable) {
				var h = p.props.target;
				h && c.indexOf(h) > -1 && (f = q({}, p.state));
			}
			return V.createElement(nu, q({
				key: "group",
				ref: De(this, "moveable")
			}, d, i.groupableProps ?? {}, {
				target: null,
				targets: c,
				targetGroups: m,
				firstRenderState: f
			}));
		}
		var g = c[0];
		if (p && (p.props.groupable || p.props.individualGroupable)) {
			var _ = at(p.moveables || [], function(e) {
				return e.props.target === g;
			});
			_ && (f = q({}, _.state));
		}
		return V.createElement(Ul, q({
			key: "single",
			ref: De(this, "moveable")
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
		var t = this.refTargets, n = Sc(this.props.target || this.props.targets), r = typeof document < "u", i = ou(t, n), a = this.selectorMap, o = {};
		return this.refTargets.forEach(function e(t) {
			We(t) ? a[t] ? o[t] = a[t] : r && (i = !0, o[t] = [].slice.call(document.querySelectorAll(t))) : Ue(t) && t.forEach(e);
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
	}, t.defaultAbles = [], t.customStyledMap = {}, t.defaultStyled = null, Dr([ke(ni)], t.prototype, "moveable", void 0), t;
}(V.PureComponent));
//#endregion
//#region src/components/Layer.tsx
function cu({ styChild: e, isDesignMode: t, nm: n, sty: r, keepRatio: i = !1, onMouseDown: a, children: o }) {
	let s = (0, V.useRef)(null), c = (e, t) => {
		u(), e.transform = t;
	};
	return /* @__PURE__ */ E(A, { children: [/* @__PURE__ */ N("div", {
		css: e,
		ref: s,
		"data-lay": n,
		style: r,
		onMouseDown: a,
		children: o
	}), t && /* @__PURE__ */ N(su, {
		target: s,
		draggable: !0,
		throttleDrag: 1,
		onDrag: ({ target: { style: e }, transform: t }) => c(e, t),
		resizable: !0,
		keepRatio: i,
		onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
			c(e, r), e.width = `${t}px`, e.height = `${n}px`;
		},
		rotatable: !0,
		throttleRotate: 0,
		startDragRotate: 0,
		throttleDragRotate: 0,
		rotationPosition: "top",
		onRotate: ({ target: { style: e }, drag: { transform: t } }) => c(e, t),
		originDraggable: !0,
		onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
			c(e, n), e.transformOrigin = t;
		}
	})] });
}
//#endregion
//#region src/components/GrpLayer.tsx
function lu(e, t) {
	let [n, r] = (0, V.useState)(void 0);
	return (0, V.useEffect)(() => {
		if (!t || !e) {
			r(void 0);
			return;
		}
		let n = !0;
		return z(e).then((t) => {
			n && (r(t), t && R(e, t.boxW, t.boxH));
		}), () => {
			n = !1;
		};
	}, [e, t]), n;
}
function uu({ fn: e, src: t, isSheet: n, dx: r, dy: i, blendmode: a }) {
	let o = lu(t, n);
	if (!t) return null;
	let s = {
		position: "absolute",
		left: r,
		top: i,
		mixBlendMode: a
	};
	return o ? /* @__PURE__ */ N("div", {
		className: B(o),
		style: s,
		"data-fn": e
	}) : n ? null : /* @__PURE__ */ N("img", {
		src: t,
		"data-fn": e,
		style: s
	});
}
function du({ cmn: e, sty: t, nm: n, fn: r, src: i, isSheet: a, isMovie: o, aFace: s, getVideoVol: c, needClick2Play: l, kind: u, ext: d }) {
	let { styChild: f, isDesignMode: p } = e, m = (e) => {
		e.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
	}, g = lu(i, a), _ = (e) => {
		e && (e.volume = c(), e.muted = l());
	}, v = {
		display: "block",
		..."width" in t ? { width: "100%" } : {},
		..."height" in t ? { height: "100%" } : {}
	}, y = {
		width: "max-content",
		...t
	};
	if (u !== void 0) {
		let t = h(u);
		if (!t) throw `未登録のレイヤー種別です（type=${u}）。プラグインが読み込まれていません`;
		return /* @__PURE__ */ N(cu, {
			styChild: f,
			isDesignMode: p,
			nm: n,
			sty: y,
			keepRatio: !1,
			onMouseDown: m,
			children: t({
				nm: n,
				ext: d ?? {}
			}, e)
		});
	}
	return /* @__PURE__ */ E(cu, {
		styChild: f,
		isDesignMode: p,
		nm: n,
		sty: y,
		keepRatio: !0,
		onMouseDown: m,
		children: [
			g && /* @__PURE__ */ N("div", { className: B(g) }),
			i && o && /* @__PURE__ */ N("video", {
				ref: _,
				src: i,
				autoPlay: !0,
				playsInline: !0,
				"data-fn": r,
				style: v,
				onLoadedMetadata: (e) => {
					R(i, e.currentTarget.videoWidth, e.currentTarget.videoHeight);
				}
			}),
			i && !a && !o && /* @__PURE__ */ N("img", {
				src: i,
				style: v,
				onLoad: (e) => {
					R(i, e.currentTarget.naturalWidth, e.currentTarget.naturalHeight);
				}
			}),
			s.map((e, t) => /* @__PURE__ */ N(uu, { ...e }, `${e.fn}_${String(t)}`))
		]
	});
}
//#endregion
//#region src/ts/Hint.ts
var fu = [
	"top",
	"bottom",
	"left",
	"right"
];
function pu(e) {
	if (!e) return "top";
	try {
		let { placement: t } = JSON.parse(e), n = (t ?? "").split("-")[0] ?? "";
		return fu.includes(n) ? n : "top";
	} catch {
		return "top";
	}
}
function mu(e, t, n, r = 8) {
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
var hu = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function gu(e, t, n, r, i) {
	let a = (n) => {
		switch (n) {
			case "top": return e.top - t.height - r >= 0;
			case "bottom": return e.top + e.height + r + t.height <= i.height;
			case "left": return e.left - t.width - r >= 0;
			case "right": return e.left + e.width + r + t.width <= i.width;
		}
	};
	if (a(n)) return n;
	let o = hu[n];
	return a(o) ? o : n;
}
function _u(e, t, n) {
	return {
		left: Math.min(Math.max(e.left, 0), Math.max(0, n.width - t.width)),
		top: Math.min(Math.max(e.top, 0), Math.max(0, n.height - t.height))
	};
}
var vu = "position: fixed; background-color: #3c3225; color: white; padding: 4px 8px; border-radius: 4px; font-size: 1.2em; z-index: 10000; pointer-events: none; user-select: none; white-space: pre;", yu = new class {
	#e;
	#t() {
		if (this.#e) return this.#e;
		let e = this.#e = document.createElement("div");
		return e.className = "sn_hint", e.setAttribute("role", "tooltip"), e.hidden = !0, document.body.appendChild(e), e;
	}
	show(e, t, n = "", r) {
		if (!t) return;
		let i = this.#t();
		i.textContent = t, i.style.cssText = vu + n, i.hidden = !1;
		let a = e.getBoundingClientRect(), o = i.getBoundingClientRect(), s = {
			width: window.innerWidth,
			height: window.innerHeight
		}, { left: c, top: l } = _u(mu(a, o, gu(a, o, pu(r), 8, s), 8), o, s);
		i.style.left = `${String(c)}px`, i.style.top = `${String(l)}px`;
	}
	hide() {
		this.#e && (this.#e.hidden = !0);
	}
}();
D();
var bu = function(e, t) {
	var n = arguments;
	if (t == null || !P.call(t, "css")) return V.createElement.apply(void 0, n);
	var r = n.length, i = Array(r);
	i[0] = S, i[1] = j(e, t);
	for (var a = 2; a < r; a++) i[a] = n[a];
	return V.createElement.apply(null, i);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(bu ||= {});
function xu() {
	return C([...arguments]);
}
//#endregion
//#region src/components/BtnLayer.tsx
function Su(e) {
	return {
		w: e?.width ?? 100,
		h: e?.height ?? 30
	};
}
function Cu(e, t, n) {
	if (!e) return {
		w: 100,
		h: 30
	};
	let r = e.pic ? t : e.b_pic ? n : null;
	return e.pic || e.b_pic ? {
		w: e.width ?? r?.w ?? 0,
		h: e.height ?? r?.h ?? 0
	} : Su(e);
}
function wu(e, t, n, r) {
	let i = {};
	(e.left !== void 0 || e.top !== void 0 || e.s_right !== void 0 || e.s_bottom !== void 0) && (i.position = "absolute", i.margin = 0, e.s_right === void 0 ? i.left = `${String(e.left ?? 0)}px` : i.right = `${String(e.s_right)}px`, e.s_bottom === void 0 ? i.top = `${String(e.top ?? 0)}px` : i.bottom = `${String(e.s_bottom)}px`), (e.align_x !== void 0 || e.align_y !== void 0) && (i.translate = `${e.align_x === "center" ? "-50%" : e.align_x === "right" ? "-100%" : "0"} ${e.align_y === "middle" ? "-50%" : e.align_y === "bottom" ? "-100%" : "0"}`);
	{
		let { w: t, h: a } = Cu(e, n, r);
		t > 0 && (i.width = `${String(t)}px`), a > 0 && (i.height = `${String(a)}px`), e.pic || (i.fontSize = `${String(Su(e).h)}px`, i.lineHeight = 1), i.boxSizing = "border-box";
	}
	e.pic && e.src && (i.backgroundImage = `url("${e.src}")`, i.backgroundSize = e.enabled === !1 ? "100% 100%" : "300% 100%", i.backgroundRepeat = "no-repeat"), e.alpha !== void 0 && (i.opacity = e.alpha);
	let a = (e.scale_x ?? 1) * t.x, o = (e.scale_y ?? 1) * t.y;
	return (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0 || t.x !== 1 || t.y !== 1) && (i.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(a)}, ${String(o)})`, i.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (i.mixBlendMode = e.blendmode), e.enabled === !1 && (i.color = "gray", i.pointerEvents = "none"), i;
}
function Tu({ text: e, label: t, call: n, fn: r, arg: i, sty: a, enabled: s, onActivate: c, onSe: l }) {
	let u = s && a?.enabled !== !1, d = y((e) => e.btnFont), f = (0, V.useRef)(null);
	(0, V.useEffect)(() => {
		let e = f.current;
		if (!(!e || !u)) return o.add(e), () => o.remove(e);
	}, [u]);
	let p = a?.pic ? a.src ?? "" : "", m = a?.enabled !== !1, [h, g] = (0, V.useState)(null);
	(0, V.useEffect)(() => {
		if (!p) {
			g(null);
			return;
		}
		let e = !0, t = new Image();
		return t.onload = () => {
			e && g({
				w: m ? t.naturalWidth / 3 : t.naturalWidth,
				h: t.naturalHeight
			});
		}, t.src = p, () => {
			e = !1;
		};
	}, [p, m]);
	let _ = a?.b_pic ? a.b_src ?? "" : "", [v, b] = (0, V.useState)(null);
	(0, V.useEffect)(() => {
		if (!_) {
			b(null);
			return;
		}
		let e = !0, t = new Image();
		return t.onload = () => {
			e && b({
				w: t.naturalWidth,
				h: t.naturalHeight
			});
		}, t.src = _, () => {
			e = !1;
		};
	}, [_]);
	let [x, S] = (0, V.useState)({
		x: 1,
		y: 1
	});
	(0, V.useLayoutEffect)(() => {
		let e = f.current;
		if (!e) {
			S({
				x: 1,
				y: 1
			});
			return;
		}
		if (a?.pic) {
			S({
				x: 1,
				y: 1
			});
			return;
		}
		let t = () => {
			let { w: t, h: r } = Su(a), i = e.style.width, o = e.style.transform, s = e.style.whiteSpace;
			e.style.width = "auto", e.style.transform = "none", e.style.whiteSpace = "pre";
			let c = e.offsetWidth, l = e.offsetHeight;
			e.style.width = i, e.style.transform = o, e.style.whiteSpace = s, c > 0 && l > 0 && n.disconnect(), S({
				x: c > 0 ? t / c : 1,
				y: l > 0 ? r / l : 1
			});
		}, n = new ResizeObserver(t);
		return n.observe(e), t(), () => n.disconnect();
	}, [
		e,
		a?.width,
		a?.height,
		a?.pic
	]);
	let C = xu`
		position: relative;
		z-index: 2;

		/* inline-flexで文字を縦横中央に置く。b_pic指定時は箱の高さ（=枠画像の実寸）が
			文字の行の高さよりずっと大きくなるが、display:inline-blockのままだと文字は
			既定で箱の上端に流れるだけで縦方向は中央に来ない。下の疑似要素::before（背景）は
			箱の中心を基準に置いているので、文字も箱の中心に来ないと互いにズレて見える
			（sn_gallery ch_button で発覚） */
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		margin: 0.3em;
		padding: 5px;
		font-family: ${d};
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
		${a?.style ?? ""}
		/* フォーカス時もホバーと同じ見た目にする（本家 EventMng.ts:435 は FocusMng へ
			hv()／nr() を渡し、フォーカスの出入りでホバー状態を切り替える）。
			既定のフォーカスリングは画面に合わないので消す。
			既定のホバーは本家 style_hover の fill:'white' 相当 */
		&:hover, &:focus {${a?.style_hover ?? "color: white;"}}
		&:focus {outline: none;}
		/* 押下中。本家の既定は style_hover ＋ dropShadow:false ＝影を消す */
		&:active {${a?.style_clicked ?? "text-shadow: none;"}}
		/* 画像ボタンのコマ送り。絵は「通常｜押下｜ホバー」を横に3コマ並べた1枚で
			（本家 Button.ts:269 が幅を3等分して張り替える）、背景を3倍幅に敷いてあるので
			background-position-x の 0%／50%／100% がちょうど各コマの左端に当たる。
			**上の状態別ルールより後ろに置く**（同じ強さなら後勝ち） */
		${a?.pic ? "\n			background-position-x: 0%;\n			&:hover, &:focus {background-position-x: 100%;}\n			&:active {background-position-x: 50%;}\n		" : ""}
		/* 背景画像（[button b_pic=…]）。本家は文字スプライトの背後へ絵を**中央合わせ**で置く
			（Button.ts:249）。**要素本体ではなく疑似要素::beforeに置く**のがポイント：本体は上の
			transformで文字を箱へ収めるfit倍率（scale）を持つため、そこへ背景を直接置くとb_pic枠まで
			一緒に縮んで絵より小さく描かれてしまう（sn_gallery ch_button で発覚）。::before側に
			逆倍率（1/fit）を自身の中心基準で掛けて打ち消すことで、親のfitに引きずられず絵の実寸の
			まま中央に留まる */
		${a?.b_pic && a.b_src ? (() => {
		let e = v?.w ?? 0, t = v?.h ?? 0, { w: n, h: r } = Cu(a, h, v), i = (n - e) / 2, o = (r - t) / 2;
		return `
				&::before {
					content: '';
					position: absolute;
					left: ${String(i)}px;
					top: ${String(o)}px;
					width: ${String(e)}px;
					height: ${String(t)}px;
					background-image: url("${a.b_src}");
					background-repeat: no-repeat;
					transform: scale(${String(1 / x.x)}, ${String(1 / x.y)});
					transform-origin: ${String(e / 2)}px ${String(t / 2)}px;
					z-index: -1;
					pointer-events: none;
				}
			`;
	})() : ""}
	`, w = (e, t) => {
		if (!u) return;
		let n = a?.[e];
		n && l(n, a?.[t] ?? "SYS");
	}, T = (e) => {
		e.stopPropagation(), u && (yu.hide(), w("clickse", "clicksebuf"), c(t, n ?? !1, r, i));
	}, E = () => {
		a?.hint && yu.show(f.current, a.hint, a.hint_style, a.hint_opt);
	};
	return /* @__PURE__ */ N("span", {
		css: C,
		style: a ? wu(a, x, h, v) : void 0,
		ref: f,
		tabIndex: u ? 0 : -1,
		onClick: T,
		onKeyDown: (e) => {
			(e.key === "Enter" || e.key === " ") && (e.stopPropagation(), e.preventDefault(), u && (yu.hide(), w("clickse", "clicksebuf"), c(t, n ?? !1, r, i)));
		},
		onMouseEnter: () => {
			E(), w("enterse", "entersebuf");
		},
		onMouseLeave: () => {
			yu.hide(), w("leavese", "leavesebuf");
		},
		onFocus: E,
		onBlur: () => yu.hide(),
		children: e
	});
}
//#endregion
//#region src/components/TxtLayer.tsx
function Eu({ cmn: { styChild: e, isDesignMode: t }, sty: n, nm: r, isFore: i, str: a, aCh: s, ffs: l, noffs: d, bura: f, kinsoku_sol: p, kinsoku_eol: h, kinsoku_dns: g, kinsoku_bura: v, r_align: b, b_color: x, b_alpha: S, b_alpha_isfixed: C, b_src: w, styTxt: T, pl: D, pr: O, pt: k, pb: j, enabled: M, aBtn: P, in_style: F, onActivate: I, onNavigate: L, onSe: R }) {
	let H = y((e) => e.isReadBack), ee = y((e) => e.styPaging), te = y((e) => e.isTyping), ne = y((e) => e.setIsTyping), U = y((e) => e.skipReq), W = y((e) => e.skipping), re = y((e) => e.wait), ie = y((e) => e.hChIn), ae = y((e) => e.chWait), oe = y((e) => e.autowc), [se, ce] = (0, V.useState)(null);
	(0, V.useEffect)(() => {
		if (!w) {
			ce(null);
			return;
		}
		let e = !0, t = new Image();
		return t.onload = () => {
			e && ce({
				w: t.naturalWidth,
				h: t.naturalHeight
			});
		}, t.src = w, () => {
			e = !1;
		};
	}, [w]);
	let le = {
		...se && (!("width" in n) || !("height" in n)) ? {
			...n,
			..."width" in n ? {} : { width: `${String(se.w)}px` },
			..."height" in n ? {} : { height: `${String(se.h)}px` }
		} : n,
		...D === void 0 ? {} : { paddingLeft: `${String(D)}px` },
		...O === void 0 ? {} : { paddingRight: `${String(O)}px` },
		...k === void 0 ? {} : { paddingTop: `${String(k)}px` },
		...j === void 0 ? {} : { paddingBottom: `${String(j)}px` }
	}, ue = (0, V.useRef)(null), de = (0, V.useRef)(null), fe = (e) => {
		if (e.url) {
			L(e.url);
			return;
		}
		I(e.label, e.call, e.fn, e.arg);
	}, pe = (0, V.useRef)([]), me = (0, V.useRef)([]), he = (0, V.useRef)([]), ge = (0, V.useRef)(0), _e = (0, V.useCallback)((e) => l ? RegExp(`[　${d ?? ""}]`).test(e) ? "" : l : "", [l, d]), ve = (0, V.useMemo)(() => new m({
		sol: p,
		eol: h,
		dns: g,
		bura: v
	}), [
		p,
		h,
		g,
		v
	]), ye = () => !!ue.current && globalThis.getComputedStyle(ue.current).writingMode.startsWith("vertical");
	(0, V.useLayoutEffect)(() => {
		let e = de.current;
		if (!e) return;
		++ge.current;
		for (let e of he.current) e.cancel();
		he.current = [];
		let t = me.current, n = Math.min(t.length, s.length), r = 0;
		for (; r < n && t[r].c === s[r].c && t[r].r === s[r].r && t[r].s === s[r].s && t[r].rs === s[r].rs;) ++r;
		r < n && (pe.current = [], me.current = [], e.textContent = ""), e.querySelectorAll(":scope > br").forEach((e) => e.remove());
		let i = pe.current, a = Math.min(s.length, i.length);
		for (; e.childNodes.length > a;) e.removeChild(e.lastChild);
		for (; e.childNodes.length < a;) e.appendChild(i[e.childNodes.length]);
		if (s.length <= i.length) {
			Ou(e, i, me.current, ve, f ?? !1, ye()), ne(!1);
			return;
		}
		let o = s.slice(i.length), l = document.createDocumentFragment(), u = o.map((e) => {
			let t = document.createElement("span");
			return t.style.display = e.c === "\n" ? "inline" : "inline-block", t.appendChild(Au(e, b, fe, _e, R)), l.appendChild(t), t;
		});
		if (me.current = [...me.current, ...o], i.push(...u), e.appendChild(l), Ou(e, i, me.current, ve, f ?? !1, ye()), H || W) {
			ne(!1);
			return;
		}
		let d = ge.current, p = 0, m = [];
		if (u.forEach((e, t) => {
			let n = o[t], r = ie[n.cis ?? F ?? "default"] ?? c, i = n.w ?? (oe.enabled ? oe.h[n.c.at(0) ?? ""] ?? 0 : ae);
			if (r.join && (p += i / 1e3), r.wait <= 0) return;
			let { keyframes: a, options: s } = _(r);
			m.push(e.animate(a, {
				...s,
				delay: (r.join ? p : 0) * 1e3
			}));
		}), m.length === 0) {
			ne(!1);
			return;
		}
		he.current = m, ne(!0), Promise.allSettled(m.map((e) => e.finished)).then(() => {
			ge.current === d && ne(!1);
		});
	}, [
		s,
		H,
		_e,
		F,
		ie,
		ae,
		oe,
		f,
		ve,
		b
	]), (0, V.useEffect)(() => {
		for (let e of he.current) e.playState !== "finished" && e.finish();
	}, [U]);
	let be = re?.src ?? "", xe = be.endsWith(".json"), [Se, Ce] = (0, V.useState)(void 0);
	(0, V.useEffect)(() => {
		if (!xe) {
			Ce(void 0);
			return;
		}
		let e = !0;
		return z(be).then((t) => {
			e && Ce(t);
		}), () => {
			e = !1;
		};
	}, [be, xe]);
	let we = i && !H && !te && re !== null && re.nm === r, Te = we && re.kind !== "waitclick", Ee = Te && (!!Se || !!be && !xe), De = we && M, Oe = xu`
		display: inline-block;
		/* **論理プロパティで書く**。縦書き（writing-mode: vertical-rl）では margin-left が
			「次の行の方向」＝横へのずらしになってしまい、マークだけ本文から離れて隣の列へ寄る。
			margin-inline-start なら横書きでは左、縦書きでは上——どちらでも「直前の文字の次」になる */
		margin-inline-start: 0.15em;
		/* **回転は付けない**。横書き用に描かれた▶（次の行の方向を指す絵）は、writing-modeを
			継承したinline-block（この要素自身）が縦書きコンテナ内でorthogonal flowとして
			扱われる結果、明示的なrotateを足さなくても▶→◀（次の行＝左方向を指す）へ自動的に
			回って見える（実機確認2026-08-23：sn_galleryトップの左端マーク。rotateを足すと
			この暗黙の回転に上乗せされて二重に回ってしまう＝一時的にrotate:90deg/180degを
			試して混乱した経緯がある。詳細はコミットログ参照） */
		/* [waitclick]用プロキシ、および[l]/[p]でbreakline/breakpage未指定のときは中身が空
			（マーカーなし、本家準拠）。中身が無いinline-blockは0x0になりFocusMng.#canFocus()の
			getClientRects()判定に落ちてフォーカスできなくなるため、widthやheightが明示されて
			いない時だけ最小の当たり判定を確保する（見た目には出さない） */
		${!Ee && re?.width === void 0 && re?.height === void 0 ? "min-inline-size: 1em; min-block-size: 1em;" : ""}
		/* マウスクリックのネイティブなtabIndexフォーカスではブラウザ既定の矩形を出さない
			（todo.md「格好悪い」対応）。ゲームパッド／矢印キーでの移動は分かりやすさのため出したい
			ので、キー操作由来のときだけ立つdata-focus-ring（FocusMng.ts）がある時に限り出す */
		outline: none;
		&[data-focus-ring]:focus {
			outline: 2px solid Highlight;
			outline-offset: 2px;
		}
	`, ke = (0, V.useRef)(null), Ae = (0, V.useRef)(!1);
	(0, V.useEffect)(() => {
		let e = ke.current;
		if (!(!e || !De)) return o.add(e), Ae.current && (Ae.current = !1, e.focus()), () => {
			Ae.current = o.isFocus(e), o.remove(e);
		};
	}, [De]);
	let je = (e) => {
		(e.key === "Enter" || e.key === " ") && (e.stopPropagation(), e.preventDefault(), ke.current?.dispatchEvent(new MouseEvent("click", { bubbles: !0 })));
	}, Me = {
		...re?.width === void 0 ? {} : { width: `${String(re.width)}px` },
		...re?.height === void 0 ? {} : { height: `${String(re.height)}px` },
		...re?.x !== void 0 || re?.y !== void 0 ? { translate: `${String(re?.x ?? 0)}px ${String(re?.y ?? 0)}px` } : {}
	}, Ne = xu`
		display: flex;
		flex-wrap: wrap;
		top: 70%;
		isolation: isolate;
		${M ? "" : "pointer-events: none;"}
	`, { display: Pe, opacity: Fe, mixBlendMode: Ie, filter: Le } = n, Re = {
		...Pe === void 0 ? {} : { display: Pe },
		...Fe === void 0 ? {} : { opacity: Fe },
		...Ie === void 0 ? {} : { mixBlendMode: Ie },
		...Le === void 0 ? {} : { filter: Le }
	}, ze = (e) => e.sty?.left !== void 0 || e.sty?.top !== void 0, Be = P.filter((e) => !ze(e)), Ve = P.filter(ze), He = xu`
		isolation: isolate;
		${M ? "" : "pointer-events: none;"}
	`, { r: Ue, g: We, b: Ge } = Nu(x), Ke = y((e) => e.backAlpha), qe = S * (C ? 1 : Ke), Je = qe === 0 || x === void 0, Ye = xu`
		/* z-index:-1の::before（下記b_src分岐）を確実にこの要素の子として背面に留めるための
			スタッキングコンテキスト。以前はStage.tsxのsty4Moveableが全レイヤへ恒等transformを
			常時書いており、それが偶然スタッキングコンテキストを作っていたため気付かれていなかった。
			sty4Moveableをデザインモード時のみに限定した際にこれが失われ、b_picの背景画像が
			立ち絵レイヤの背後（コンテキストの外）へ回り込んで見えなくなる回帰を引き起こした。
			transformの副作用に頼らず、目的（背面固定）に合ったisolation: isolateで明示的に持たせる */
		isolation: isolate;
		padding: 1em 1.5em;
		/* 背景色に[lay b_alpha=...]をアルファチャンネルで反映。
			要素全体のopacityではなく背景色のアルファのみを下げるので、子要素（文字）の透過度には影響しない
			（レイヤ全体を透かしたい場合は[lay alpha=...]） */
		/* [lay b_pic=…]があればそれを背景画像にし、**b_colorは無視する**（本家と同じ規約）。
			枠画像は左上を原点にそのままの大きさで置く（本家もレイヤ左上に等倍で置き、
			文字表示領域のサイズを画像に合わせる）。b_alphaは画像・単色どちらにも効かせたいので、
			画像のときは要素のopacityではなく擬似要素で敷いて透過させる */
		background-color: ${Je || w ? "transparent" : `rgba(${Ue}, ${We}, ${Ge}, ${qe})`};
		border: ${Je || w ? "none" : "dotted 6px #ffa500"};
		${w ? `
		&::before {
			content: '';
			position: absolute;
			left: 0; top: 0; right: 0; bottom: 0;
			background-image: url(${JSON.stringify(w)});
			background-repeat: no-repeat;
			background-position: left top;
			opacity: ${qe};
			pointer-events: none;
			z-index: -1;
		}` : ""}

		/* [add_lay class=txt]直後、[lay style=…]を一度も受けていない状態の既定フォントサイズ。
			本家 TxtLayer.ts:272 のコンストラクタ既定（24px）に合わせる。xxx-large（≒48px）のままだと
			widthのCSS既定70%（test/argdef_parity.test.ts A_CSS_DEF、本家と意図的に違えた値）との
			組み合わせで本文が箱から大きくはみ出す（sn_galleryのtopプロジェクトで発覚） */
		font-size: 24px;
		/* top/leftの省略時既定はCSSの0（test/argdef_parity.test.ts A_CSS_DEF、本家 Layer.ts:512,538の
			x/y初期値と同じ）。実際の本文レイヤは[txt_lay_fullscreen]等が必ずtop=を明示するため
			この既定が表に出る場面は無いはずだったが、[lay b_pic=…]だけを指定するレイヤ（例：
			タイトル画面のクリック待ちオーバーレイ mes_c2p）はtopを指定しないため、
			ここが48%のままだと画面下寄りにずれて表示される不具合になっていた。
			上のmarginを消したのも同じ理由：margin: 2em 0が残っていると、top:0を明示しても
			上下96px（2em、font-size: xxx-largeぶん）ぶん箱がステージからはみ出し、b_picが
			ステージ全体を覆いきれなかった（この既定margin自体、pl/pr/pt/pb同様の上書き手段が無く、
			本家にも対応する概念が無い試作期の置き土産だった） */
		top: 0;
		width: 70%;
		white-space: pre-wrap;
		/* 文字色の既定は白（本家 TxtLayer.ts:272 のコンストラクタ既定styleがcolor: white）。
			inheritのままだと親の色（未指定なら黒）を継承してしまい、暗い背景画像に文字が
			埋もれて読めなくなる */
		color: white;
		/* [enable_event enabled=false]：**本文中の[link]もクリックを受けなくする**
			（本家は文字レイヤのコンテナごと ctn.interactiveChildren=false にするので、
			ボタンもリンクもまとめて効かなくなる。TxtLayer.ts:838）。
			クリックはステージへ抜けるので、読み進め自体は止まらない */
		${M ? "" : "pointer-events: none;"}

		/* [lay style="..."]。上の既定を後から上書きできるよう最後に置く */
		${T ?? ""}

		/* 読み戻り中の見た目（[page style=…]。既定は本家 INI_STYPAGE と同じ黄色＋黒フチ）。
			**[lay style=…]よりさらに後**に置く：本家は読み戻り中だけ全文字レイヤへこのCSSを
			当て直す（setAllStyle2TxtLay）ので、レイヤ自身が色を書いていても勝つ必要がある */
		${H ? ee : ""}
	`, Xe = xu`
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
	`, [Ze, Qe] = (0, V.useState)("");
	(0, V.useEffect)(() => Qe(a), [a]);
	let $e = (0, V.useRef)(null), et = (e, t) => {
		u(), e.transform = t;
	};
	return /* @__PURE__ */ E(A, { children: [
		/* @__PURE__ */ E("span", {
			css: [e, Ye],
			ref: ue,
			"data-lay": r,
			style: le,
			children: [/* @__PURE__ */ N("span", { ref: de }), we && /* @__PURE__ */ N("span", {
				ref: ke,
				css: Oe,
				style: Me,
				...De ? {
					tabIndex: 0,
					onKeyDown: je,
					"data-wait-focus": !0
				} : {},
				children: Te ? Se ? /* @__PURE__ */ N("span", { className: B(Se) }) : be && !xe ? /* @__PURE__ */ N("img", {
					src: be,
					style: {
						verticalAlign: "text-bottom",
						...re.width !== void 0 || re.height !== void 0 ? {
							width: "100%",
							height: "100%"
						} : {}
					}
				}) : null : null
			})]
		}),
		Be.length > 0 && /* @__PURE__ */ N("span", {
			css: [e, Ne],
			"data-lay": r,
			style: Re,
			children: Be.map((e) => /* @__PURE__ */ N(Tu, {
				text: e.text,
				label: e.label,
				call: e.call ?? !1,
				fn: e.fn ?? "",
				arg: e.arg,
				sty: e.sty,
				enabled: M,
				onActivate: I,
				onSe: R
			}, e.nm))
		}),
		Ve.length > 0 && /* @__PURE__ */ N("span", {
			css: [e, He],
			"data-lay": r,
			style: Re,
			children: Ve.map((e) => /* @__PURE__ */ N(Tu, {
				text: e.text,
				label: e.label,
				call: e.call ?? !1,
				fn: e.fn ?? "",
				arg: e.arg,
				sty: e.sty,
				enabled: M,
				onActivate: I,
				onSe: R
			}, e.nm))
		}),
		t && /* @__PURE__ */ N(su, {
			target: ue,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => et(e, t),
			resizable: !0,
			keepRatio: !1,
			onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
				et(e, r), e.width = `${t}px`, e.height = `${n}px`;
			},
			rotatable: !0,
			throttleRotate: 0,
			startDragRotate: 0,
			throttleDragRotate: 0,
			rotationPosition: "top",
			onRotate: ({ target: { style: e }, drag: { transform: t } }) => et(e, t),
			originDraggable: !0,
			onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
				et(e, n), e.transformOrigin = t;
			}
		}),
		t && /* @__PURE__ */ E(A, { children: [/* @__PURE__ */ E("label", {
			css: Xe,
			ref: $e,
			children: ["テキスト入力", /* @__PURE__ */ N("textarea", {
				rows: 3,
				value: Ze,
				onChange: (e) => Qe(e.target.value)
			})]
		}), /* @__PURE__ */ N(su, {
			target: $e,
			origin: !1,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => et(e, t),
			preventDefault: !1
		})] })
	] });
}
function Du(e) {
	let t = [], n = [], r = [];
	return e.forEach((i, a) => {
		let o = a > 0 && e[a - 1].c === "\n", s = Array.from(i.c);
		s.forEach((e, i) => {
			t.push({
				ch: e,
				...o && i === 0 ? { afterBr: !0 } : {}
			}), n.push(a), r.push(s.length > 1 ? i : -1);
		}), i.r !== void 0 && (t.push({
			ch: i.r.at(0) ?? "",
			rt: !0
		}), n.push(a), r.push(-1));
	}), t.length > 0 && (t.push({ ch: " " }), n.push(-1), r.push(-1)), {
		kc: t,
		idx: n,
		sub: r
	};
}
function Ou(e, t, n, r, i, a) {
	let { kc: o, idx: s, sub: c } = Du(n);
	if (o.length < 2) return;
	let l = document.createElement("span");
	l.style.display = "inline-block", l.textContent = " ", e.appendChild(l);
	try {
		let n = 2;
		for (let u = 0; u <= o.length; ++u) {
			let u = o.map((e, n) => {
				let r = s[n], i = r < 0 ? l : t[r], o = c[n], u = (o < 0 ? i : i.firstElementChild?.children[o] ?? i).getBoundingClientRect();
				return a ? u.top : u.left;
			}), d = r.scan(o, u, i, n);
			if (!d) break;
			e.insertBefore(document.createElement("br"), t[s[d.ins]]), n = d.resumeAt;
		}
	} finally {
		l.remove();
	}
	t.forEach((e) => e.style.marginBlockStart = ""), e.querySelectorAll(":scope > br").forEach((e) => {
		let t = e.nextElementSibling, n = t?.querySelector("rt");
		n && (t.style.marginBlockStart = `${String(n.offsetHeight)}px`);
	});
}
function ku(e, t, n) {
	let r = e.length * 2;
	if (r - t.length < 0) return `text-align: ${n};`;
	if (i.isFirefox) switch (n) {
		case "left": return "ruby-align: start;";
		case "center": return "ruby-align: center;";
		case "right": return "ruby-align: start;";
		case "justify": return "ruby-align: space-between;";
		case "121": return "ruby-align: space-around;";
		case "even": return `ruby-align: space-between; padding-inline: ${String((r - t.length) / (t.length + 1))}em;`;
		case "1ruby": return "ruby-align: space-between; padding-inline: 1em;";
		default: return `text-align: ${n};`;
	}
	let a = (e) => i.isSafari ? `text-align: start; inline-size: ${String(r)}em; padding-inline: ${e};` : `text-align: justify; text-align-last: justify; padding-inline: ${e};`;
	switch (n) {
		case "justify": return a("0");
		case "121": return a(`calc(${String((r - t.length) / (t.length * 2))}em)`);
		case "even": return a(`calc(${String((r - t.length) / (t.length + 1))}em)`);
		case "1ruby": return a("1em");
		default: return `text-align: ${n};`;
	}
}
function Au({ c: e, r: t, ra: n, s: r, rs: i, tcy: a, lnk: o, src: s, gw: c, gh: l, gx: u, gy: d }, f, p, m, h) {
	let g = (e) => document.createTextNode(e === " " ? "\xA0" : e), _ = m(e);
	if (t === void 0 && !r && !a && !o && !_ && !s) return g(e);
	let v = document.createElement(t === void 0 ? "span" : "ruby");
	r && (v.style.cssText = r), _ && (v.style.fontFeatureSettings = _);
	let y = a ? document.createElement("span") : v;
	a && (y.style.textCombineUpright = "all", v.appendChild(y));
	let b = Array.from(e);
	if (t !== void 0 && !a && !s && b.length > 1) for (let e of b) {
		let t = document.createElement("span");
		t.appendChild(g(e)), y.appendChild(t);
	}
	else y.appendChild(g(e));
	s && (ju(y, s, {
		...c === void 0 ? {} : { gw: c },
		...l === void 0 ? {} : { gh: l },
		...u === void 0 ? {} : { gx: u },
		...d === void 0 ? {} : { gy: d }
	}), y !== v && v.appendChild(y));
	let x;
	if (t !== void 0) {
		x = document.createElement("rt");
		let r = n ?? f;
		x.style.cssText = (r ? ku(e, t, r) : "") + (i ?? ""), x.textContent = t, v.appendChild(x);
	}
	return o && Mu(v, o, r ?? "", x, i ?? "", p, h), v;
}
function ju(e, t, n) {
	if ((n.gw !== void 0 || n.gh !== void 0) && (e.style.display = "inline-block", e.style.verticalAlign = "text-bottom", n.gw !== void 0 && (e.style.width = `${String(n.gw)}px`), n.gh !== void 0 && (e.style.height = `${String(n.gh)}px`)), (n.gx !== void 0 || n.gy !== void 0) && (e.style.translate = `${String(n.gx ?? 0)}px ${String(n.gy ?? 0)}px`), !t.endsWith(".json")) {
		e.style.backgroundImage = `url(${JSON.stringify(t)})`, e.style.backgroundRepeat = "no-repeat", e.style.backgroundSize = "contain";
		return;
	}
	z(t).then((t) => {
		if (t) {
			if (n.gw === void 0 && n.gh === void 0) {
				let { width: n, height: r } = e.getBoundingClientRect();
				if (n > 0 && r > 0) {
					e.style.display = "inline-block", e.style.position = "relative", e.style.overflow = "hidden", e.style.width = `${String(n)}px`, e.style.height = `${String(r)}px`, e.style.verticalAlign = "text-bottom";
					let i = document.createElement("span");
					i.classList.add(B(t)), i.style.position = "absolute", i.style.left = "0", i.style.top = "0", i.style.transformOrigin = "top left", i.style.transform = `scale(${String(n / t.boxW)}, ${String(r / t.boxH)})`, e.appendChild(i);
				} else e.classList.add(B(t));
			} else e.classList.add(B(t));
		}
	});
}
function Mu(e, t, n, r, i, a, o) {
	if (e.style.cursor = "pointer", e.addEventListener("click", (e) => {
		e.stopPropagation(), yu.hide(), t.clickse && o(t.clickse, t.clicksebuf ?? "SYS"), a(t);
	}), e.addEventListener("mouseenter", () => {
		t.sh && (e.style.cssText = n + t.sh), r && t.rsh && (r.style.cssText = i + t.rsh), t.hint && yu.show(e, t.hint, t.hs, t.ho), t.enterse && o(t.enterse, t.entersebuf ?? "SYS");
	}), e.addEventListener("mouseleave", () => {
		t.sh && (e.style.cssText = n, e.style.cursor = "pointer"), r && t.rsh && (r.style.cssText = i), yu.hide(), t.leavese && o(t.leavese, t.leavesebuf ?? "SYS");
	}), t.sc || t.rsc) {
		let a = () => {
			t.sc && (e.style.cssText = t.sh ? n + t.sh : n, e.style.cursor = "pointer"), r && t.rsc && (r.style.cssText = t.rsh ? i + t.rsh : i);
		};
		e.addEventListener("mousedown", () => {
			t.sc && (e.style.cssText = n + t.sc), r && t.rsc && (r.style.cssText = i + t.rsc);
		}), e.addEventListener("mouseup", a), e.addEventListener("mouseleave", a);
	}
}
function Nu(e) {
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
var Pu = .04, Fu = 1e6;
function Iu(e, t = Pu) {
	let n = t > 0 ? Math.min(1 / (2 * t), Fu) : Fu;
	return {
		slope: n,
		intercept: .5 - n * e
	};
}
//#endregion
//#region src/ts/Swipe.ts
function Lu(e, t, n, r) {
	let i = Math.abs(e), a = Math.abs(t), o = Math.max(25, Math.floor(.15 * n)), s = Math.max(25, Math.floor(.15 * r));
	if (i > o && i >= a) return e < 0 ? "swipeleft" : "swiperight";
	if (a > s && a > i) return t < 0 ? "swipeup" : "swipedown";
}
//#endregion
//#region src/components/Stage.tsx
function Ru({ arg: { heStage: e, sys: t, scrMng: n }, onClick: r, prev: a, next: o }) {
	let c = y((e) => e.aPage), u = y((e) => e.foreIdx), m = y((e) => e.trans), h = (0, V.useRef)(null), _ = (0, V.useRef)(null), S = [h, _], C = (0, V.useRef)(null), w = (0, V.useRef)(null);
	(0, V.useEffect)(() => {
		C.current !== null && cancelAnimationFrame(C.current), C.current = null;
		for (let e of [h.current, _.current]) e && (e.getAnimations().forEach((e) => e.cancel()), e.style.opacity = "");
		if (!m) return;
		let e = S[u].current;
		if (!e) return;
		if (!m.ruleSrc) {
			e.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: m.time,
				easing: "linear",
				fill: "forwards"
			});
			return;
		}
		let t = (e) => {
			let t = w.current;
			if (!t) return;
			let { slope: n, intercept: r } = Iu(e, m.vague);
			t.setAttribute("slope", String(n)), t.setAttribute("intercept", String(r));
		};
		t(0);
		let n = performance.now(), r = (e) => {
			let i = m.time <= 0 ? 1 : Math.min((e - n) / m.time, 1);
			t(i), i < 1 && (C.current = requestAnimationFrame(r));
		};
		C.current = requestAnimationFrame(r);
	}, [m]);
	let T = y((e) => e.quake), D = (0, V.useRef)(null);
	(0, V.useEffect)(() => {
		D.current !== null && cancelAnimationFrame(D.current), D.current = null;
		let e = [h.current, _.current].filter((e) => e !== null);
		if (!T) {
			for (let t of e) t.style.transform = "";
			return;
		}
		let { hmax: t, vmax: n } = T, r = () => {
			let i = t === 0 ? 0 : Math.round(Math.random() * t * 2) - t, a = n === 0 ? 0 : Math.round(Math.random() * n * 2) - n;
			for (let t of e) t.style.transform = `translate(${String(i)}px, ${String(a)}px)`;
			D.current = requestAnimationFrame(r);
		};
		D.current = requestAnimationFrame(r);
	}, [T]);
	let O = e.parentElement !== document.body, [j, M] = (0, V.useState)(Bu(e, O));
	ae(() => {
		function t() {
			M(Bu(e, O));
		}
		return globalThis.addEventListener("resize", t), () => globalThis.removeEventListener("resize", t);
	});
	let { cvsScale: P } = zu(j, O), { stageW: L, stageH: R } = i, z = (0, V.useRef)(null), B = y((e) => e.fullScr), H = y((e) => e.setFullScr), te = y((e) => e.toggleFullScr);
	U((0, V.useRef)(e), B, { onClose: () => H(!1) });
	let [ne, W] = (0, V.useState)(() => !!document.fullscreenElement);
	(0, V.useEffect)(() => {
		let e = () => W(!!document.fullscreenElement);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []), (0, V.useEffect)(() => {
		n.setFullScr(ne);
	}, [ne]), (0, V.useLayoutEffect)(() => {
		ne ? (e.style.width = "", e.style.height = "", e.style.display = "", e.style.alignItems = "", e.style.justifyContent = "", e.style.backgroundColor = "black") : (e.style.width = `${String(L * P)}px`, e.style.height = `${String(R * P)}px`, e.style.display = "", e.style.alignItems = "", e.style.justifyContent = "", e.style.backgroundColor = ""), e.style.overflow = "hidden";
	}, [
		P,
		L,
		R,
		ne
	]);
	let re = xu`
		position: relative;
		width: ${L}px;
		height: ${R}px;
		overflow: hidden;
		background-color: ${i.bgColor};

		/* ステージ既定フォント。本家 TxtLayer.ts:272 のメッセージ層デフォルトと同じ Hiragino 系スタック。
			ここへ置けば各レイヤ（文字メッセージ等）が継承する。ボタンは本家 sn.button.fontFamily 相当を
			BtnLayer側で明示指定しているのでそちらが優先される（＝別途フォントを差し替え可能） */
		font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif;

		/* 全画面（[toggle_full_screen]）でも本家同様に**左上固定**（中央寄せはしない。
			上のuseLayoutEffectのコメント参照） */
		transform-origin: left top;
		transform: scale(${String(P)});
	`, oe = xu`position: absolute; top: 0; left: 0;`, se = xu`
		position: absolute; top: 0; left: 0;
		width: 100%; height: 100%;
		z-index: 2;
		pointer-events: none;
	`, ce = xu`
		position: absolute; top: 0; left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: ${i.bgColor};
	`, le = xu`
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
	`, ue = (0, V.useRef)(null);
	ae(() => {
		n.attachFrameBox(ue.current), n.attachStageBox(z.current);
	}), ae(() => {
		let e = z.current;
		e.addEventListener("mousedown", () => l());
		let t = (e) => {
			e.preventDefault(), e.deltaY < 0 ? o() : a();
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	});
	let [de, fe] = ee(!1);
	ie((e) => {
		e.stopPropagation(), I(), !v() && (fe(), F(!de));
	}, {
		isPreventDefault: !0,
		delay: 300
	});
	let pe = (0, V.useRef)(null);
	function me(e) {
		pe.current = {
			x: e.clientX,
			y: e.clientY
		};
	}
	function he(e) {
		let t = pe.current;
		if (pe.current = null, !t || de) return;
		let r = z.current.getBoundingClientRect(), i = Lu(e.clientX - t.x, e.clientY - t.y, r.width, r.height);
		i && (I(), n.fireEvent((e.pointerType === "mouse" ? k(e.nativeEvent) : "") + i));
	}
	let ge = (() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of c) for (let n of t) if (n.aFlt) for (let t of x(n.aFlt)) e.set(s(t), t);
		return [...e.values()];
	})(), _e = (() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of c) for (let n of t) if (n.aFlt) for (let t of f(n.aFlt)) e.set(g(t), t);
		return [...e.values()];
	})(), ve = { cmn: {
		sys: t,
		styChild: oe,
		isDesignMode: de,
		sty4Moveable: de ? {
			maxWidth: "auto",
			maxHeight: "auto",
			minWidth: "auto",
			minHeight: "auto",
			transform: "translate(0px, 0px) rotate(0deg)"
		} : {}
	} };
	return /* @__PURE__ */ E("div", {
		css: re,
		onClick: r,
		onPointerDown: me,
		onPointerUp: he,
		ref: z,
		children: [
			m?.ruleSrc && /* @__PURE__ */ N("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ E("defs", { children: [/* @__PURE__ */ E("filter", {
					id: "sn_rule_flt",
					colorInterpolationFilters: "sRGB",
					children: [/* @__PURE__ */ N("feColorMatrix", {
						type: "matrix",
						values: "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0"
					}), /* @__PURE__ */ N("feComponentTransfer", { children: /* @__PURE__ */ N("feFuncA", {
						ref: w,
						type: "linear",
						slope: "1",
						intercept: "0"
					}) })]
				}), /* @__PURE__ */ N("mask", {
					id: "sn_rule_msk",
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: L,
					height: R,
					children: /* @__PURE__ */ N("image", {
						href: m.ruleSrc,
						x: "0",
						y: "0",
						width: L,
						height: R,
						preserveAspectRatio: "none",
						filter: "url(#sn_rule_flt)"
					})
				})] })
			}),
			ge.length > 0 && /* @__PURE__ */ N("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ N("defs", { children: ge.map((e) => /* @__PURE__ */ N("filter", {
					id: s(e),
					colorInterpolationFilters: "sRGB",
					x: "0",
					y: "0",
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ N("feColorMatrix", {
						type: "matrix",
						values: b(e)
					})
				}, s(e))) })
			}),
			_e.length > 0 && /* @__PURE__ */ N("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ N("defs", { children: _e.map((e) => /* @__PURE__ */ N("filter", {
					id: g(e),
					children: /* @__PURE__ */ N("feGaussianBlur", { stdDeviation: p(e) })
				}, g(e))) })
			}),
			de && /* @__PURE__ */ E(A, { children: [
				/* @__PURE__ */ N("button", {
					onClick: () => te(),
					css: le,
					children: "FullScr"
				}),
				/* @__PURE__ */ N("button", {
					onClick: () => {},
					css: le,
					children: "Back"
				}),
				/* @__PURE__ */ N("button", {
					onClick: () => {},
					css: le,
					children: "Prev"
				})
			] }),
			/* @__PURE__ */ N("span", { children: ne }),
			c.map((e, t) => {
				let r = m?.aLayNm && t !== u ? e.map((e) => m.aLayNm.includes(e.nm) ? e : c[u].find((t) => t.nm === e.nm) ?? e) : e;
				return /* @__PURE__ */ N("div", {
					ref: S[t],
					"data-page": t === u ? "fore" : "back",
					css: ce,
					style: {
						zIndex: +(t === u),
						visibility: t === u || m ? "visible" : "hidden",
						pointerEvents: t === u ? "auto" : "none",
						...m?.ruleSrc && t === u ? { mask: "url(#sn_rule_msk)" } : {}
					},
					children: r.map((e) => {
						let r = {
							...ve.cmn.sty4Moveable,
							...d(e)
						};
						return e.cls === "grp" ? /* @__PURE__ */ N(du, {
							cmn: ve.cmn,
							sty: r,
							nm: e.nm,
							fn: e.fn,
							src: e.src,
							isSheet: e.isSheet,
							isMovie: e.isMovie,
							aFace: e.aFace,
							kind: e.kind,
							ext: e.ext,
							getVideoVol: () => n.getMovieVolume(),
							needClick2Play: () => n.needClick2Play()
						}, e.nm) : /* @__PURE__ */ N(Eu, {
							cmn: ve.cmn,
							sty: r,
							nm: e.nm,
							isFore: t === u,
							str: e.str,
							aCh: e.aCh,
							ffs: e.ffs,
							noffs: e.noffs,
							bura: e.bura,
							kinsoku_sol: e.kinsoku_sol,
							kinsoku_eol: e.kinsoku_eol,
							kinsoku_dns: e.kinsoku_dns,
							kinsoku_bura: e.kinsoku_bura,
							r_align: e.r_align,
							b_color: e.b_color,
							b_alpha: e.b_alpha,
							b_alpha_isfixed: e.b_alpha_isfixed,
							b_src: e.b_src,
							styTxt: e.style,
							pl: e.pl,
							pr: e.pr,
							pt: e.pt,
							pb: e.pb,
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
			/* @__PURE__ */ N("div", {
				ref: ue,
				css: se
			})
		]
	});
}
function zu({ width: e, height: t }, a) {
	let o = 0, s = 0, c = 1;
	return a ? (o = Math.min(e, i.stageW), s = r(i.stageH / i.stageW * o), c = o / i.stageW) : n(i.hDip, "expanding", !0) || i.stageW > e || i.stageH > t ? (i.stageW / i.stageH <= e / t ? (s = t, o = r(i.stageW / i.stageH * t)) : (o = e, s = r(i.stageH / i.stageW * e)), c = o / i.stageW) : (o = i.stageW, s = i.stageH, c = 1), {
		cvsScale: c,
		cvsWidth: o,
		cvsHeight: s
	};
}
function Bu(e, t) {
	if (t && e.parentElement) return {
		width: e.parentElement.clientWidth,
		height: 0
	};
	let { innerWidth: n, innerHeight: r } = globalThis;
	return {
		width: n,
		height: r
	};
}
//#endregion
export { Ru as default };

//# sourceMappingURL=Stage.js.map