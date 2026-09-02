import { r as e, t } from "./rolldown-runtime.js";
import { c as n, n as r, t as i } from "./CmnLib.js";
import { t as a } from "./react.js";
import { t as o } from "./FocusMng.js";
import { S as s, _ as c, a as l, b as u, d, f, h as p, i as m, m as h, o as g, p as _, s as v, u as y, v as b, x, y as S } from "./PageLog.js";
import { t as C, useStore as w } from "./store.js";
import { a as T, c as E, d as D, f as O, i as k, l as A, m as j, modKeyName as M, n as N, o as P, p as F, r as I, s as L, setDesignMode as R, suppressClick as z, u as B } from "./Main.js";
import { a as ee, i as V, n as te } from "./Sprite.js";
//#region node_modules/react-use/esm/useToggle.js
var H = /* @__PURE__ */ e(a()), ne = function(e, t) {
	return typeof t == "boolean" ? t : !e;
}, U = function(e) {
	return (0, H.useReducer)(ne, e);
}, W = D ? H.useLayoutEffect : H.useEffect, re = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
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
})))()), ie = function(e, t, n) {
	n === void 0 && (n = {});
	var r = n.video, i = n.onClose, a = i === void 0 ? O : i, o = (0, H.useState)(t), s = o[0], c = o[1];
	return W(function() {
		if (t && e.current) {
			var n = function() {
				r?.current && F(r.current, "webkitendfullscreen", n), a();
			}, i = function() {
				if (re.default.isEnabled) {
					var e = re.default.isFullscreen;
					c(e), e || a();
				}
			};
			if (re.default.isEnabled) {
				try {
					re.default.request(e.current), c(!0);
				} catch (e) {
					a(e), c(!1);
				}
				re.default.on("change", i);
			} else r && r.current && r.current.webkitEnterFullscreen ? (r.current.webkitEnterFullscreen(), j(r.current, "webkitendfullscreen", n), c(!0)) : (a(), c(!1));
			return function() {
				if (c(!1), re.default.isEnabled) try {
					re.default.off("change", i), re.default.exit();
				} catch {}
				else r && r.current && r.current.webkitExitFullscreen && (F(r.current, "webkitendfullscreen", n), r.current.webkitExitFullscreen());
			};
		}
	}, [
		t,
		r,
		e
	]), s;
}, ae = function(e) {
	return "touches" in e;
}, oe = function(e) {
	ae(e) && e.touches.length < 2 && e.preventDefault && e.preventDefault();
}, se = function(e, t) {
	var n = t === void 0 ? {} : t, r = n.isPreventDefault, i = r === void 0 || r, a = n.delay, o = a === void 0 ? 300 : a, s = (0, H.useRef)(), c = (0, H.useRef)(), l = (0, H.useCallback)(function(t) {
		i && t.target && (j(t.target, "touchend", oe, { passive: !1 }), c.current = t.target), s.current = setTimeout(function() {
			return e(t);
		}, o);
	}, [
		e,
		o,
		i
	]), u = (0, H.useCallback)(function() {
		s.current && clearTimeout(s.current), i && c.current && F(c.current, "touchend", oe);
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
}, ce = function(e) {
	B(function() {
		e();
	});
};
//#endregion
//#region node_modules/@egjs/agent/dist/agent.esm.js
function le(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return !0;
	return !1;
}
function ue(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return e[r];
	return null;
}
function de(e) {
	var t = e;
	if (t === void 0) {
		if (typeof navigator > "u" || !navigator) return "";
		t = navigator.userAgent || "";
	}
	return t.toLowerCase();
}
function fe(e, t) {
	try {
		return new RegExp(e, "g").exec(t);
	} catch {
		return null;
	}
}
function pe() {
	if (typeof navigator > "u" || !navigator || !navigator.userAgentData) return !1;
	var e = navigator.userAgentData, t = e.brands || e.uaList;
	return !!(t && t.length);
}
function me(e, t) {
	var n = fe("(" + e + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", t);
	return n ? n[3] : "";
}
function he(e) {
	return e.replace(/_/g, ".");
}
function ge(e, t) {
	var n = null, r = "-1";
	return le(e, function(e) {
		var i = fe("(" + e.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", t);
		return !i || e.brand ? !1 : (n = e, r = i[3] || "-1", e.versionAlias ? r = e.versionAlias : e.versionTest && (r = me(e.versionTest.toLowerCase(), t) || r), r = he(r), !0);
	}), {
		preset: n,
		version: r
	};
}
function _e(e, t) {
	var n = {
		brand: "",
		version: "-1"
	};
	return le(e, function(e) {
		var r = ve(t, e);
		return r ? (n.brand = e.id, n.version = e.versionAlias || r.version, n.version !== "-1") : !1;
	}), n;
}
function ve(e, t) {
	return ue(e, function(e) {
		var n = e.brand;
		return fe("" + t.test, n.toLowerCase());
	});
}
var ye = [
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
], be = [
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
], xe = [{
	test: "applewebkit",
	id: "webkit",
	versionTest: "applewebkit|safari"
}], Se = [
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
], Ce = [
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
function we(e) {
	return !!ge(Se, e).preset;
}
function Te(e) {
	var t = de(e), n = !!/mobi/g.exec(t), r = {
		name: "unknown",
		version: "-1",
		majorVersion: -1,
		webview: we(t),
		chromium: !1,
		chromiumVersion: "-1",
		webkit: !1,
		webkitVersion: "-1"
	}, i = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	}, a = ge(ye, t), o = a.preset, s = a.version, c = ge(Ce, t), l = c.preset, u = c.version, d = ge(be, t);
	if (r.chromium = !!d.preset, r.chromiumVersion = d.version, !r.chromium) {
		var f = ge(xe, t);
		r.webkit = !!f.preset, r.webkitVersion = f.version;
	}
	return l && (i.name = l.id, i.version = u, i.majorVersion = parseInt(u, 10)), o && (r.name = o.id, r.version = s, r.webview && i.name === "ios" && r.name !== "safari" && (r.webview = !1)), r.majorVersion = parseInt(r.version, 10), {
		browser: r,
		os: i,
		isMobile: n,
		isHints: !1
	};
}
function Ee(e) {
	var t = navigator.userAgentData, n = (t.uaList || t.brands).slice(), r = e && e.fullVersionList, i = t.mobile || !1, a = n[0], o = (e && e.platform || t.platform || navigator.platform).toLowerCase(), s = {
		name: a.brand,
		version: a.version,
		majorVersion: -1,
		webkit: !1,
		webkitVersion: "-1",
		chromium: !1,
		chromiumVersion: "-1",
		webview: !!_e(Se, n).brand || we(de())
	}, c = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	};
	s.webkit = !s.chromium && le(xe, function(e) {
		return ve(n, e);
	});
	var l = _e(be, n);
	if (s.chromium = !!l.brand, s.chromiumVersion = l.version || "-1", !s.chromium) {
		var u = _e(xe, n);
		s.webkit = !!u.brand, s.webkitVersion = u.version || "-1";
	}
	var d = ue(Ce, function(e) {
		return RegExp("" + e.test, "g").exec(o);
	});
	if (c.name = d ? d.id : "", e && (c.version = e.platformVersion || "-1"), r && r.length) {
		var f = _e(ye, r);
		s.name = f.brand || s.name, s.version = f.version || s.version;
	} else {
		var p = _e(ye, n);
		s.name = p.brand || s.name, s.version = p.brand && e ? e.uaFullVersion : p.version;
	}
	return s.webkit && (c.name = i ? "ios" : "mac"), c.name === "ios" && s.webview && (s.version = "-1"), c.version = he(c.version), s.version = he(s.version), c.majorVersion = parseInt(c.version, 10), s.majorVersion = parseInt(s.version, 10), {
		browser: s,
		os: c,
		isMobile: i,
		isHints: !0
	};
}
function De(e) {
	return e === void 0 && pe() ? Ee() : Te(e);
}
//#endregion
//#region node_modules/framework-utils/dist/utils.esm.js
function Oe(e) {
	return [...arguments].slice(1).map(function(t) {
		return t.split(" ").map(function(t) {
			return t ? "" + e + t : "";
		}).join(" ");
	}).join(" ");
}
function ke(e, t) {
	return t.replace(/([^}{]*){/gm, function(t, n) {
		return n.replace(/\.([^{,\s\d.]+)/g, "." + e + "$1") + "{";
	});
}
function Ae(e, t) {
	return function(n) {
		n && (e[t] = n);
	};
}
function je(e, t, n) {
	return function(r) {
		r && (e[t][n] = r);
	};
}
function Me(e, t) {
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
var Ne = "function", Pe = "string", Fe = "number", Ie = "undefined", Le = typeof window !== Ie, Re = typeof document < "u" && document, ze = [
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
], Be = 1e-7;
1 / Be;
var Ve = {
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
function He() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function Ue(e, t, n, r) {
	return (e * r + t * n) / (n + r);
}
function We(e) {
	return typeof e === Ie;
}
function Ge(e) {
	return e && typeof e == "object";
}
function Ke(e) {
	return Array.isArray(e);
}
function qe(e) {
	return typeof e === Pe;
}
function Je(e) {
	return typeof e === Fe;
}
function Ye(e) {
	return typeof e === Ne;
}
function Xe(e, t) {
	return (t === "" || t == " ") && (e === "" || e == " ") || e === t;
}
function Ze(e, t, n, r, i) {
	return Qe(e, t, n) ? n : $e(e, t, n + 1, r, i);
}
function Qe(e, t, n) {
	if (!e.ignore) return null;
	var r = t.slice(Math.max(n - 3, 0), n + 3).join("");
	return new RegExp(e.ignore).exec(r);
}
function $e(e, t, n, r, i) {
	for (var a = function(n) {
		var a = t[n].trim();
		if (a === e.close && !Qe(e, t, n)) return { value: n };
		var s = n, c = ct(i, function(e) {
			return e.open === a;
		});
		if (c && (s = Ze(c, t, n, r, i)), s === -1) return o = n, "break";
		n = s, o = n;
	}, o, s = n; s < r; ++s) {
		var c = a(s);
		if (s = o, typeof c == "object") return c.value;
		if (c === "break") break;
	}
	return -1;
}
function et(e, t) {
	var n = qe(t) ? { separator: t } : t, r = n.separator, i = r === void 0 ? "," : r, a = n.isSeparateFirst, o = n.isSeparateOnlyOpenClose, s = n.isSeparateOpenClose, c = s === void 0 ? o : s, l = n.openCloseCharacters, u = l === void 0 ? ze : l, d = u.map(function(e) {
		var t = e.open, n = e.close;
		return t === n ? t : t + "|" + n;
	}).join("|"), f = "(\\s*" + i + "\\s*|" + d + "|\\s+)", p = new RegExp(f, "g"), m = e.split(p).filter(function(e) {
		return e && e !== "undefined";
	}), h = m.length, g = [], _ = [];
	function v() {
		return _.length ? (g.push(_.join("")), _ = [], !0) : !1;
	}
	for (var y = function(t) {
		var n = m[t].trim(), r = t, s = ct(u, function(e) {
			return e.open === n;
		}), l = ct(u, function(e) {
			return e.close === n;
		});
		if (s) {
			if (r = Ze(s, m, t, h, u), r !== -1 && c) return v() && a || (g.push(m.slice(t, r + 1).join("")), t = r, a) ? (b = t, "break") : (b = t, "continue");
		} else if (l && !Qe(l, m, t)) {
			var d = He(u);
			return d.splice(u.indexOf(l), 1), { value: et(e, {
				separator: i,
				isSeparateFirst: a,
				isSeparateOnlyOpenClose: o,
				isSeparateOpenClose: c,
				openCloseCharacters: d
			}) };
		} else if (Xe(n, i) && !o) return v(), a ? (b = t, "break") : (b = t, "continue");
		r === -1 && (r = h - 1), _.push(m.slice(t, r + 1).join("")), t = r, b = t;
	}, b, x = 0; x < h; ++x) {
		var S = y(x);
		if (x = b, typeof S == "object") return S.value;
		if (S === "break") break;
	}
	return _.length && g.push(_.join("")), g;
}
function tt(e) {
	return et(e, "");
}
function nt(e) {
	return et(e, ",");
}
function rt(e) {
	var t = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(e);
	return !t || t.length < 4 ? {} : {
		prefix: t[1],
		value: t[2],
		suffix: t[3]
	};
}
function it(e) {
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
function at(e, t) {
	return t === void 0 && (t = "-"), e.replace(/([a-z])([A-Z])/g, function(e, n, r) {
		return "" + n + t + r.toLowerCase();
	});
}
function ot() {
	return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function st(e, t, n) {
	n === void 0 && (n = -1);
	for (var r = e.length, i = 0; i < r; ++i) if (t(e[i], i, e)) return i;
	return n;
}
function ct(e, t, n) {
	var r = st(e, t);
	return r > -1 ? e[r] : n;
}
var lt = /*#__PURE__*/ function() {
	var e = ot(), t = Le && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
	return t ? t.bind(window) : function(t) {
		var n = ot();
		return setTimeout(function() {
			t(n - e);
		}, 1e3 / 60);
	};
}(), ut = /*#__PURE__*/ function() {
	var e = Le && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
	return e ? e.bind(window) : function(e) {
		clearTimeout(e);
	};
}();
function dt(e) {
	return Object.keys(e);
}
function ft(e, t) {
	var n = it(e), r = n.value, i = n.unit;
	if (Ge(t)) {
		var a = t[i];
		if (a) {
			if (Ye(a)) return a(r);
			if (Ve[i]) return Ve[i](r, a);
		}
	} else if (i === "%") return r * t / 100;
	return Ve[i] ? Ve[i](r) : r;
}
function pt(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function mt(e, t, n, r) {
	return r === void 0 && (r = e[0] / e[1]), [[G(t[0], 1e-7), G(t[0] / r, 1e-7)], [G(t[1] * r, 1e-7), G(t[1], 1e-7)]].filter(function(e) {
		return e.every(function(e, r) {
			var i = t[r], a = G(i, 1e-7);
			return n ? e <= i || e <= a : e >= i || e >= a;
		});
	})[0] || e;
}
function ht(e, t, n, r) {
	if (!r) return e.map(function(e, r) {
		return pt(e, t[r], n[r]);
	});
	var i = e[0], a = e[1], o = r === !0 ? i / a : r, s = mt(e, t, !1, o), c = s[0], l = s[1], u = mt(e, n, !0, o), d = u[0], f = u[1];
	return i < c || a < l ? (i = c, a = l) : (i > d || a > f) && (i = d, a = f), [i, a];
}
function gt(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return n;
}
function _t(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return t ? n / t : 0;
}
function vt(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function yt(e) {
	return [0, 1].map(function(t) {
		return _t(e.map(function(e) {
			return e[t];
		}));
	});
}
function bt(e) {
	var t = yt(e), n = vt(t, e[0]), r = vt(t, e[1]);
	return n < r && r - n < Math.PI || n > r && r - n < -Math.PI ? 1 : -1;
}
function xt(e, t) {
	return Math.sqrt(((t ? t[0] : 0) - e[0]) ** 2 + ((t ? t[1] : 0) - e[1]) ** 2);
}
function G(e, t) {
	if (!t) return e;
	var n = 1 / t;
	return Math.round(e / t) / n;
}
function St(e, t) {
	return e.forEach(function(n, r) {
		e[r] = G(e[r], t);
	}), e;
}
function Ct(e) {
	for (var t = [], n = 0; n < e; ++n) t.push(n);
	return t;
}
function wt(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function Tt(e, t) {
	return e.classList ? e.classList.contains(t) : !!e.className.match(RegExp("(\\s|^)" + t + "(\\s|$)"));
}
function Et(e, t) {
	e.classList ? e.classList.add(t) : e.className += " " + t;
}
function Dt(e, t) {
	if (e.classList) e.classList.remove(t);
	else {
		var n = RegExp("(\\s|^)" + t + "(\\s|$)");
		e.className = e.className.replace(n, " ");
	}
}
function Ot(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function kt(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
function At(e) {
	return e?.ownerDocument || Re;
}
function jt(e) {
	return At(e).documentElement;
}
function Mt(e) {
	return At(e).body;
}
function Nt(e) {
	return e?.ownerDocument?.defaultView || window;
}
function Pt(e) {
	return e && "postMessage" in e && "blur" in e && "self" in e;
}
function Ft(e) {
	return Ge(e) && e.nodeName && e.nodeType && "ownerDocument" in e;
}
//#endregion
//#region node_modules/@scena/matrix/dist/matrix.esm.js
function It(e, t, n, r, i, a) {
	for (var o = 0; o < i; ++o) {
		var s = n + o * i, c = r + o * i;
		e[s] += e[c] * a, t[s] += t[c] * a;
	}
}
function Lt(e, t, n, r, i) {
	for (var a = 0; a < i; ++a) {
		var o = n + a * i, s = r + a * i, c = e[o], l = t[o];
		e[o] = e[s], e[s] = c, t[o] = t[s], t[s] = l;
	}
}
function Rt(e, t, n, r, i) {
	for (var a = 0; a < r; ++a) {
		var o = n + a * r;
		e[o] /= i, t[o] /= i;
	}
}
function zt(e, t, n) {
	n === void 0 && (n = Math.sqrt(e.length));
	for (var r = e.slice(), i = 0; i < n; ++i) r[i * n + t - 1] = 0, r[(t - 1) * n + i] = 0;
	return r[(t - 1) * (n + 1)] = 1, r;
}
function Bt(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = e.slice(), r = sn(t), i = 0; i < t; ++i) {
		var a = t * i + i;
		if (!G(n[a], 1e-7)) {
			for (var o = i + 1; o < t; ++o) if (n[t * i + o]) {
				Lt(n, r, i, o, t);
				break;
			}
		}
		if (!G(n[a], 1e-7)) return [];
		Rt(n, r, i, t, n[a]);
		for (var o = 0; o < t; ++o) {
			var s = o, c = n[o + i * t];
			!G(c, 1e-7) || i === o || It(n, r, s, i, t, -c);
		}
	}
	return r;
}
function Vt(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = 0; r < t; ++r) for (var i = 0; i < t; ++i) n[i * t + r] = e[t * r + i];
	return n;
}
function Ht(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = e[t * t - 1], i = 0; i < t - 1; ++i) n[i] = e[t * (t - 1) + i] / r;
	return n[t - 1] = 0, n;
}
function Ut(e, t) {
	for (var n = sn(t), r = 0; r < t - 1; ++r) n[t * (t - 1) + r] = e[r] || 0;
	return n;
}
function Wt(e, t) {
	for (var n = e.slice(), r = e.length; r < t - 1; ++r) n[r] = 0;
	return n[t - 1] = 1, n;
}
function Gt(e, t, n) {
	if (t === void 0 && (t = Math.sqrt(e.length)), t === n) return e;
	for (var r = sn(n), i = Math.min(t, n), a = 0; a < i - 1; ++a) {
		for (var o = 0; o < i - 1; ++o) r[a * n + o] = e[a * t + o];
		r[(a + 1) * n - 1] = e[(a + 1) * t - 1], r[(n - 1) * n + a] = e[(t - 1) * t + a];
	}
	return r[n * n - 1] = e[t * t - 1], r;
}
function Kt(e) {
	var t = [...arguments].slice(1), n = sn(e);
	return t.forEach(function(t) {
		n = qt(n, t, e);
	}), n;
}
function qt(e, t, n) {
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
function Jt(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] + t[i];
	return r;
}
function K(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] - t[i];
	return r;
}
function Yt(e, t) {
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
function Xt(e, t) {
	return t === void 0 && (t = e.length === 9), t ? [
		e[0],
		e[1],
		e[3],
		e[4],
		e[6],
		e[7]
	] : e;
}
function Zt(e, t, n) {
	n === void 0 && (n = t.length);
	var r = qt(e, t, n), i = r[n - 1];
	return r.map(function(e) {
		return e / i;
	});
}
function Qt(e, t) {
	return qt(e, [
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
function $t(e, t) {
	return qt(e, [
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
function en(e, t) {
	return qt(e, on(t, 4));
}
function tn(e, t) {
	var n = t[0], r = n === void 0 ? 1 : n, i = t[1], a = i === void 0 ? 1 : i, o = t[2];
	return qt(e, [
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
function nn(e, t) {
	return Zt(on(t, 3), Wt(e, 3));
}
function rn(e, t) {
	var n = t[0], r = n === void 0 ? 0 : n, i = t[1], a = i === void 0 ? 0 : i, o = t[2];
	return qt(e, [
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
function an(e, t) {
	return qt(e, t, 4);
}
function on(e, t) {
	var n = Math.cos(e), r = Math.sin(e), i = sn(t);
	return i[0] = n, i[1] = r, i[t] = -r, i[t + 1] = n, i;
}
function sn(e) {
	for (var t = e * e, n = [], r = 0; r < t; ++r) n[r] = r % (e + 1) ? 0 : 1;
	return n;
}
function cn(e, t) {
	for (var n = sn(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[(t + 1) * i] = e[i];
	return n;
}
function ln(e, t) {
	for (var n = sn(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[t * (t - 1) + i] = e[i];
	return n;
}
function un(e, t, n, r, i, a, o, s) {
	var c = e[0], l = e[1], u = t[0], d = t[1], f = n[0], p = n[1], m = r[0], h = r[1], g = i[0], _ = i[1], v = a[0], y = a[1], b = o[0], x = o[1], S = s[0], C = s[1], w = Bt([
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
	var T = qt(w, [
		g,
		_,
		v,
		y,
		b,
		x,
		S,
		C
	], 8);
	return T[8] = 1, Gt(Vt(T), 3, 4);
}
//#endregion
//#region node_modules/css-to-mat/dist/css-to-mat.esm.js
var dn = function() {
	return dn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, dn.apply(this, arguments);
};
function fn() {
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
function pn(e, t) {
	return t === void 0 && (t = 0), hn(gn(e, t));
}
function mn(e, t) {
	var n = Zt(e, [
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
function hn(e) {
	var t = fn();
	return e.forEach(function(e) {
		var n = e.matrixFunction, r = e.functionValue;
		n && (t = n(t, r));
	}), t;
}
function gn(e, t) {
	return t === void 0 && (t = 0), (Ke(e) ? e : tt(e)).map(function(e) {
		var n = rt(e), r = n.prefix, i = n.value, a = null, o = r, s = "";
		if (r === "translate" || r === "translateX" || r === "translate3d") {
			var c = Ge(t) ? dn(dn({}, t), { "o%": t["%"] }) : {
				"%": t,
				"o%": t
			}, l = nt(i).map(function(e, n) {
				return c["%"] = n === 0 && "x%" in c ? t["x%"] : n === 1 && "y%" in c ? t["y%"] : t["o%"], ft(e, c);
			}), u = l[0], d = l[1], f = d === void 0 ? 0 : d, p = l[2], m = p === void 0 ? 0 : p;
			a = rn, s = [
				u,
				f,
				m
			];
		} else if (r === "translateY") {
			var f = ft(i, Ge(t) ? dn({ "%": t["y%"] }, t) : { "%": t });
			a = rn, s = [
				0,
				f,
				0
			];
		} else if (r === "translateZ") {
			var m = parseFloat(i);
			a = rn, s = [
				0,
				0,
				m
			];
		} else if (r === "scale" || r === "scale3d") {
			var h = nt(i).map(function(e) {
				return parseFloat(e);
			}), g = h[0], _ = h[1], v = _ === void 0 ? g : _, y = h[2], b = y === void 0 ? 1 : y;
			a = tn, s = [
				g,
				v,
				b
			];
		} else if (r === "scaleX") {
			var g = parseFloat(i);
			a = tn, s = [
				g,
				1,
				1
			];
		} else if (r === "scaleY") {
			var v = parseFloat(i);
			a = tn, s = [
				1,
				v,
				1
			];
		} else if (r === "scaleZ") {
			var b = parseFloat(i);
			a = tn, s = [
				1,
				1,
				b
			];
		} else if (r === "rotate" || r === "rotateZ" || r === "rotateX" || r === "rotateY") {
			var x = it(i), S = x.unit, C = x.value, w = S === "rad" ? C : C * Math.PI / 180;
			r === "rotate" || r === "rotateZ" ? (o = "rotateZ", a = en) : r === "rotateX" ? a = Qt : r === "rotateY" && (a = $t), s = w;
		} else if (r === "matrix3d") a = an, s = nt(i).map(function(e) {
			return parseFloat(e);
		});
		else if (r === "matrix") {
			var T = nt(i).map(function(e) {
				return parseFloat(e);
			});
			a = an, s = [
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
var _n = /*#__PURE__*/ function() {
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
}(), vn = /*#__PURE__*/ function() {
	function e() {
		this.object = {};
	}
	var t = e.prototype;
	return t.get = function(e) {
		return this.object[e];
	}, t.set = function(e, t) {
		this.object[e] = t;
	}, e;
}(), yn = typeof Map == "function", bn = /*#__PURE__*/ function() {
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
function xn(e, t) {
	var n = [], r = [];
	return e.forEach(function(e) {
		var t = e[0], i = e[1], a = new bn();
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
var Sn = /*#__PURE__*/ function() {
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
		var e = xn(this.changedBeforeAdded, this.fixed), t = this.changed, n = [];
		this.cacheOrdered = e.filter(function(e, r) {
			var i = e[0], a = e[1], o = t[r], s = o[0], c = o[1];
			if (i !== a) return n.push([s, c]), !0;
		}), this.cachePureChanged = n;
	}, e;
}();
function Cn(e, t, n) {
	var r = yn ? Map : n ? vn : _n, i = n || function(e) {
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
	}), o.reverse(), new Sn(e, t, a, o, h, s, f, p);
}
var wn = /*#__PURE__*/ function() {
	function e(e, t) {
		e === void 0 && (e = []), this.findKeyCallback = t, this.list = [].slice.call(e);
	}
	var t = e.prototype;
	return t.update = function(e) {
		var t = [].slice.call(e), n = Cn(this.list, t, this.findKeyCallback);
		return this.list = t, n;
	}, e;
}(), Tn = function(e, t) {
	return Tn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Tn(e, t);
};
function En(e, t) {
	Tn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Dn = typeof Map == "function" ? void 0 : function() {
	var e = 0;
	return function(t) {
		return t.__DIFF_KEY__ ||= ++e;
	};
}(), On = /*#__PURE__*/ function(e) {
	En(t, e);
	function t(t) {
		return t === void 0 && (t = []), e.call(this, t, Dn) || this;
	}
	return t;
}(wn);
function kn(e, t) {
	return Cn(e, t, Dn);
}
//#endregion
//#region node_modules/@scena/event-emitter/dist/event-emitter.esm.js
var An = function() {
	return An = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, An.apply(this, arguments);
};
function jn() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
var Mn = /*#__PURE__*/ function() {
	function e() {
		this._events = {};
	}
	var t = e.prototype;
	return t.on = function(e, t) {
		if (Ge(e)) for (var n in e) this.on(n, e[n]);
		else this._addEvent(e, t, {});
		return this;
	}, t.off = function(e, t) {
		if (!e) this._events = {};
		else if (Ge(e)) for (var n in e) this.off(n);
		else if (!t) this._events[e] = [];
		else {
			var r = this._events[e];
			if (r) {
				var i = st(r, function(e) {
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
		}, t.currentTarget = this, jn(r).forEach(function(r) {
			r.listener(t), r.once && n.off(e, r.listener);
		}), !i;
	}, t.trigger = function(e, t) {
		return t === void 0 && (t = {}), this.emit(e, t);
	}, t._addEvent = function(e, t, n) {
		var r = this._events;
		r[e] = r[e] || [], r[e].push(An({ listener: t }, n));
	}, e;
}(), Nn = function(e, t) {
	return Nn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Nn(e, t);
};
function Pn(e, t) {
	Nn(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Fn = function() {
	return Fn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Fn.apply(this, arguments);
};
function In(e) {
	var t = e.container;
	return t === document.body ? [t.scrollLeft || document.documentElement.scrollLeft, t.scrollTop || document.documentElement.scrollTop] : [t.scrollLeft, t.scrollTop];
}
function Ln(e, t) {
	return e.addEventListener("scroll", t), function() {
		e.removeEventListener("scroll", t);
	};
}
function Rn(e) {
	if (!e) return null;
	if (qe(e)) return document.querySelector(e);
	if (Ye(e)) return e();
	if (e instanceof Element) return e;
	if ("current" in e) return e.current;
	if ("value" in e) return e.value;
}
var zn = /*#__PURE__*/ function(e) {
	Pn(t, e);
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
		var n = Rn(t.container);
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
			return s.top > r - a ? (c[1] > s.top || r < c[1]) && (l[1] = -1) : s.top + s.height < r + a && (c[1] < s.top + s.height || r > c[1]) && (l[1] = 1), s.left > n - a ? (c[0] > s.left || n < c[0]) && (l[0] = -1) : s.left + s.width < n + a && (c[0] < s.left + s.width || n > c[0]) && (l[0] = 1), !l[0] && !l[1] ? !1 : this._continueDrag(Fn(Fn({}, t), {
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
		return (r === void 0 ? In : r)({
			container: Rn(n),
			direction: e
		});
	}, n._continueDrag = function(e) {
		var t = this, n, r = e.container, i = e.direction, a = e.throttleTime, o = e.useScroll, s = e.isDrag, c = e.inputEvent;
		if (!(!this._flag || s && this._isWait)) {
			var l = ot(), u = Math.max(a + this._prevTime - l, 0);
			if (u > 0) return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
				t._continueDrag(e);
			}, u), !1;
			this._prevTime = l;
			var d = this._getScrollPosition(i, e);
			this._prevScrollPos = d, s && (this._isWait = !0), o || (this._lock = !0);
			var f = {
				container: Rn(r),
				direction: i,
				inputEvent: c
			};
			return (n = e.requestScroll) == null || n.call(e, f), this.emit("scroll", f), this._isWait = !1, o || this.checkScroll(Fn(Fn({}, e), {
				prevScrollPos: d,
				direction: i,
				inputEvent: c
			}));
		}
	}, n._registerScrollEvent = function(e) {
		this._unregisterScrollEvent();
		var t = e.checkScrollEvent;
		if (t) {
			var n = t === !0 ? Ln : t, r = Rn(e.container);
			this._unregister = t === !0 && (r === document.body || r === document.documentElement) ? Ln(window, this._onScroll) : n(r, this._onScroll);
		}
	}, n._unregisterScrollEvent = function() {
		var e;
		(e = this._unregister) == null || e.call(this), this._unregister = null;
	}, t;
}(Mn);
//#endregion
//#region node_modules/overlap-area/dist/overlap-area.esm.js
function Bn() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function Vn(e) {
	return G(e, Be);
}
function Hn(e, t) {
	return e.every(function(e, n) {
		return Vn(e - t[n]) === 0;
	});
}
function Un(e, t) {
	return !Vn(e[0] - t[0]) && !Vn(e[1] - t[1]);
}
function Wn(e) {
	return e.length < 3 ? 0 : Math.abs(gt(e.map(function(t, n) {
		var r = e[n + 1] || e[0];
		return t[0] * r[1] - r[0] * t[1];
	}))) / 2;
}
function Gn(e, t) {
	var n = t.width, r = t.height, i = t.left, a = t.top, o = Kn(e), s = o.minX, c = o.minY, l = o.maxX, u = o.maxY, d = n / (l - s), f = r / (u - c);
	return e.map(function(e) {
		return [i + (e[0] - s) * d, a + (e[1] - c) * f];
	});
}
function Kn(e) {
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
function qn(e, t, n) {
	var r = e[0], i = e[1], a = Kn(t), o = a.minX, s = a.maxX, c = [[o, i], [s, i]], l = Jn(c[0], c[1]), u = Zn(t), d = [];
	if (u.forEach(function(t) {
		var n = Jn(t[0], t[1]), r = t[0];
		Hn(l, n) ? d.push({
			pos: e,
			line: t,
			type: "line"
		}) : Xn(Yn(l, n), [c, t]).forEach(function(e) {
			t.some(function(t) {
				return Un(t, e);
			}) ? d.push({
				pos: e,
				line: t,
				type: "point"
			}) : Vn(r[1] - i) !== 0 && d.push({
				pos: e,
				line: t,
				type: "intersection"
			});
		});
	}), !n && ct(d, function(e) {
		return e[0] === r;
	})) return !0;
	var f = 0, p = {};
	return d.forEach(function(e) {
		var t = e.pos, n = e.type, a = e.line;
		if (!(t[0] > r)) {
			if (n === "intersection") ++f;
			else if (n === "line") return;
			else if (n === "point") {
				var o = ct(a, function(e) {
					return e[1] !== i;
				}), s = p[t[0]], c = o[1] > i ? 1 : -1;
				s ? s !== c && ++f : p[t[0]] = c;
			}
		}
	}), f % 2 == 1;
}
function Jn(e, t) {
	var n = e[0], r = e[1], i = t[0], a = t[1], o = i - n, s = a - r;
	Math.abs(o) < 1e-7 && (o = 0), Math.abs(s) < 1e-7 && (s = 0);
	var c = 0, l = 0, u = 0;
	return o ? s ? (c = -s / o, l = 1, u = -c * n - r) : (l = 1, u = -r) : s && (c = -1, u = n), [
		c,
		l,
		u
	];
}
function Yn(e, t) {
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
function Xn(e, t) {
	var n = t.map(function(e) {
		return [0, 1].map(function(t) {
			return [Math.min(e[0][t], e[1][t]), Math.max(e[0][t], e[1][t])];
		});
	}), r = [];
	if (e.length === 2) {
		var i = e[0], a = i[0], o = i[1];
		if (!Vn(a - e[1][0])) {
			var s = Math.max.apply(Math, n.map(function(e) {
				return e[1][0];
			})), c = Math.min.apply(Math, n.map(function(e) {
				return e[1][1];
			}));
			if (Vn(s - c) > 0) return [];
			r = [[a, s], [a, c]];
		} else if (!Vn(o - e[1][1])) {
			var l = Math.max.apply(Math, n.map(function(e) {
				return e[0][0];
			})), u = Math.min.apply(Math, n.map(function(e) {
				return e[0][1];
			}));
			if (Vn(l - u) > 0) return [];
			r = [[l, o], [u, o]];
		}
	}
	return r.length || (r = e.filter(function(e) {
		var t = e[0], r = e[1];
		return n.every(function(e) {
			return 0 <= Vn(t - e[0][0]) && 0 <= Vn(e[0][1] - t) && 0 <= Vn(r - e[1][0]) && 0 <= Vn(e[1][1] - r);
		});
	})), r.map(function(e) {
		return [Vn(e[0]), Vn(e[1])];
	});
}
function Zn(e) {
	return Bn(e.slice(1), [e[0]]).map(function(t, n) {
		return [e[n], t];
	});
}
function Qn(e, t) {
	var n = e.slice(), r = t.slice();
	bt(n) === -1 && n.reverse(), bt(r) === -1 && r.reverse();
	var i = Zn(n), a = Zn(r), o = i.map(function(e) {
		return Jn(e[0], e[1]);
	}), s = a.map(function(e) {
		return Jn(e[0], e[1]);
	}), c = [];
	o.forEach(function(e, t) {
		var n = i[t], o = [];
		s.forEach(function(r, i) {
			var s = Xn(Yn(e, r), [n, a[i]]);
			o.push.apply(o, s.map(function(e) {
				return {
					index1: t,
					index2: i,
					pos: e,
					type: "intersection"
				};
			}));
		}), o.sort(function(e, t) {
			return xt(n[0], e.pos) - xt(n[0], t.pos);
		}), c.push.apply(c, o), qn(n[1], r) && c.push({
			index1: t,
			index2: -1,
			pos: n[1],
			type: "inside"
		});
	}), a.forEach(function(e, t) {
		if (qn(e[1], n)) {
			var r = !1, i = st(c, function(e) {
				return e.index2 === t ? (r = !0, !1) : !!r;
			});
			i === -1 && (r = !1, i = st(c, function(e) {
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
function $n(e, t) {
	return Qn(e, t).map(function(e) {
		return e.pos;
	});
}
function er(e, t) {
	return Wn($n(e, t));
}
//#endregion
//#region node_modules/gesto/dist/gesto.esm.js
var tr = function(e, t) {
	return tr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, tr(e, t);
};
function nr(e, t) {
	tr(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var rr = function() {
	return rr = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, rr.apply(this, arguments);
};
function ir(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function ar(e) {
	return ir([e[0].clientX, e[0].clientY], [e[1].clientX, e[1].clientY]) / Math.PI * 180;
}
function or(e) {
	return e.touches && e.touches.length >= 2;
}
function sr(e) {
	return e ? e.touches ? dr(e.touches) : [fr(e)] : [];
}
function cr(e) {
	return e && (e.type.indexOf("mouse") > -1 || "button" in e);
}
function lr(e, t, n) {
	var r = n.length, i = pr(e, r), a = i.clientX, o = i.clientY, s = i.originalClientX, c = i.originalClientY, l = pr(t, r), u = l.clientX, d = l.clientY, f = pr(n, r), p = f.clientX, m = f.clientY;
	return {
		clientX: s,
		clientY: c,
		deltaX: a - u,
		deltaY: o - d,
		distX: a - p,
		distY: o - m
	};
}
function ur(e) {
	return Math.sqrt((e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2);
}
function dr(e) {
	for (var t = Math.min(e.length, 2), n = [], r = 0; r < t; ++r) n.push(fr(e[r]));
	return n;
}
function fr(e) {
	return {
		clientX: e.clientX,
		clientY: e.clientY
	};
}
function pr(e, t) {
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
var mr = /* @__PURE__ */ function() {
	function e(e) {
		this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = e, this.prevClients = e, this.length = e.length;
	}
	return e.prototype.getAngle = function(e) {
		return e === void 0 && (e = this.prevClients), ar(e);
	}, e.prototype.getRotation = function(e) {
		return e === void 0 && (e = this.prevClients), ar(e) - ar(this.startClients);
	}, e.prototype.getPosition = function(e, t) {
		e === void 0 && (e = this.prevClients);
		var n = lr(e || this.prevClients, this.prevClients, this.startClients), r = n.deltaX, i = n.deltaY;
		return this.movement += Math.sqrt(r * r + i * i), this.prevClients = e, n;
	}, e.prototype.getPositions = function(e) {
		e === void 0 && (e = this.prevClients);
		for (var t = this.prevClients, n = this.startClients, r = Math.min(this.length, t.length), i = [], a = 0; a < r; ++a) i[a] = lr([e[a]], [t[a]], [n[a]]);
		return i;
	}, e.prototype.getMovement = function(e) {
		var t = this.movement;
		if (!e) return t;
		var n = pr(e, this.length), r = pr(this.prevClients, this.length), i = n.clientX - r.clientX, a = n.clientY - r.clientY;
		return Math.sqrt(i * i + a * a) + t;
	}, e.prototype.getDistance = function(e) {
		return e === void 0 && (e = this.prevClients), ur(e);
	}, e.prototype.getScale = function(e) {
		return e === void 0 && (e = this.prevClients), ur(e) / ur(this.startClients);
	}, e.prototype.move = function(e, t) {
		this.startClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		}), this.prevClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		});
	}, e;
}(), hr = ["textarea", "input"], gr = /* @__PURE__ */ function(e) {
	nr(t, e);
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
							var y = v.tagName.toLowerCase(), b = hr.indexOf(y) > -1, x = v.isContentEditable;
							if (b || x) {
								if (u || !d && _ === v) return !1;
								if (_ && (_ === v || x && _.isContentEditable && _.contains(v))) {
									if (d) v.blur();
									else return !1;
								}
							} else if ((l || e.type === "touchstart") && _) {
								var S = _.tagName.toLowerCase();
								(_.isContentEditable || hr.indexOf(S) > -1) && _.blur();
							}
							(f || p || m) && Ot(r._window, "click", r._onClick, !0);
						}
						r.clientStores = [new mr(sr(e))], r._isIdle = !1, r.flag = !0, r.isDrag = !1, r._isTrusted = t, r._dragFlag = !0, r._prevInputEvent = e, r.data = {}, r.doubleFlag = ot() - r.prevTime < 200, r._isMouseEvent = cr(e), !r._isMouseEvent && r._preventMouseEvent && r._allowMouseEvent(), (r._preventMouseEvent || r.emit("dragStart", rr(rr({
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
						Ot(a, "touchstart", r.onDragStart, { passive: !1 });
					}))) : h && o && kt(a, "touchstart", r.onDragStart), r.flag && or(e)) {
						if (clearTimeout(C), g && e.touches.length !== e.changedTouches.length) return;
						r.pinchFlag || r.onPinchStart(e);
					}
				}
			}
		}, r.onDrag = function(e, t) {
			if (r.flag) {
				var n = r.options.preventDefault;
				!r._isMouseEvent && n && e.preventDefault(), r._prevInputEvent = e;
				var i = sr(e), a = r.moveClients(i, e, !1);
				if (r._dragFlag) {
					if ((r.pinchFlag || a.deltaX || a.deltaY) && (r._preventMouseEvent || r.emit("drag", rr(rr({}, a), {
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
				}), !s && !o && a && !c && r._allowClickEvent(), r._useTouch && n && kt(i, "touchstart", r.onDragStart), r.pinchFlag && r.onPinchEnd(e);
				var l = e?.touches ? sr(e) : [];
				l.length === 0 || !r.options.keepDragging ? r.flag = !1 : r._addStore(new mr(l));
				var u = r._getPosition(), d = ot(), f = !c && r.doubleFlag;
				r._prevInputEvent = null, r.prevTime = c || f ? 0 : d, r.flag || (r._dettachDragEvent(), r._preventMouseEvent || r.emit("dragEnd", rr({
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
			kt(r._window, "click", r._onClick, !0);
		}, r._onClick = function(e) {
			r._allowClickEvent(), r._allowMouseEvent();
			var t = r.options.preventClickEventByCondition;
			t?.(e) || (e.stopPropagation(), e.preventDefault());
		}, r._onContextMenu = function(e) {
			r.options.preventRightClick ? r.onDragEnd(e) : e.preventDefault();
		}, r._passCallback = function() {};
		var i = [].concat(t), a = i[0];
		r._window = Pt(a) ? a : Nt(a), r.options = rr({
			checkInput: !1,
			container: a && !("document" in a) ? Nt(a) : a,
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
			Ot(e, "dragstart", r.onDragStart);
		}), r._useMouse && (i.forEach(function(e) {
			Ot(e, "mousedown", r.onDragStart), Ot(e, "mousemove", r._passCallback);
		}), Ot(s, "contextmenu", r._onContextMenu)), l && Ot(Nt(), "blur", r.onBlur), r._useTouch) {
			var u = { passive: !1 };
			i.forEach(function(e) {
				Ot(e, "touchstart", r.onDragStart, u), Ot(e, "touchmove", r._passCallback, u);
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
		return e === void 0 && (e = this._prevInputEvent), rr(rr({
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
		this.off(), kt(this._window, "blur", this.onBlur), this._useDrag && t.forEach(function(t) {
			kt(t, "dragstart", e.onDragStart);
		}), this._useMouse && (t.forEach(function(t) {
			kt(t, "mousedown", e.onDragStart);
		}), kt(n, "contextmenu", this._onContextMenu)), this._useTouch && (t.forEach(function(t) {
			kt(t, "touchstart", e.onDragStart);
		}), kt(n, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
	}, t.prototype.onPinchStart = function(e) {
		var t = this, n = this.options.pinchThreshold;
		if (!(this.isDrag && this.getMovement() > n)) {
			var r = new mr(sr(e));
			this.pinchFlag = !0, this._addStore(r), this.emit("pinchStart", rr(rr({
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
			this.isPinch = !0, this.emit("pinch", rr(rr({
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
			this.emit("pinchEnd", rr(rr({
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
		return !i && this.isDrag && (a = !0), rr(rr({
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
		return rr(rr({}, n), {
			distX: i,
			distY: a
		});
	}, t.prototype._attchDragEvent = function() {
		var e = this._window, t = this.options.container, n = { passive: !1 };
		this._isDragAPI && (Ot(t, "dragover", this.onDrag, n), Ot(e, "dragend", this.onDragEnd)), this._useMouse && (Ot(t, "mousemove", this.onDrag), Ot(e, "mouseup", this.onDragEnd)), this._useTouch && (Ot(t, "touchmove", this.onDrag, n), Ot(e, "touchend", this.onDragEnd, n), Ot(e, "touchcancel", this.onDragEnd, n));
	}, t.prototype._dettachDragEvent = function() {
		var e = this._window, t = this.options.container;
		this._isDragAPI && (kt(t, "dragover", this.onDrag), kt(e, "dragend", this.onDragEnd)), this._useMouse && (kt(t, "mousemove", this.onDrag), kt(e, "mouseup", this.onDragEnd)), this._useTouch && (kt(t, "touchstart", this.onDragStart), kt(t, "touchmove", this.onDrag), kt(e, "touchend", this.onDragEnd), kt(e, "touchcancel", this.onDragEnd));
	}, t.prototype._allowMouseEvent = function() {
		this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
	}, t;
}(Mn);
//#endregion
//#region node_modules/css-styled/dist/styled.esm.js
function _r(e) {
	for (var t = 5381, n = e.length; n;) t = t * 33 ^ e.charCodeAt(--n);
	return t >>> 0;
}
var vr = _r;
function yr(e) {
	return vr(e).toString(36);
}
function br(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function xr(e, t, n) {
	return n.original ? t : t.replace(/([^};{\s}][^};{]*|^\s*){/gm, function(t, n) {
		var r = n.trim();
		return (r ? nt(r) : [""]).map(function(t) {
			var n = t.trim();
			return n.indexOf("@") === 0 ? n : n.indexOf(":global") > -1 ? n.replace(/\:global/g, "") : n.indexOf(":host") > -1 ? `${n.replace(/\:host/g, `.${e}`)}` : n ? `.${e} ${n}` : `.${e}`;
		}).join(", ") + " {";
	});
}
function Sr(e, t, n, r, i) {
	var a = At(r), o = a.createElement("style");
	return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", e), o.setAttribute("data-styled-count", "1"), n.nonce && o.setAttribute("nonce", n.nonce), o.innerHTML = xr(e, t, n), (i || a.head || a.body).appendChild(o), o;
}
function Cr(e) {
	var t = "rCS" + yr(e);
	return {
		className: t,
		inject: function(n, r) {
			r === void 0 && (r = {});
			var i = br(n), a = (i || n.ownerDocument || document).querySelector(`style[data-styled-id="${t}"]`);
			if (!a) a = Sr(t, e, r, n, i);
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
var wr = function() {
	return wr = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, wr.apply(this, arguments);
};
function Tr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Er(e, t) {
	var n = Cr(t), r = n.className;
	return (0, H.forwardRef)(function(t, i) {
		var a = t.className, o = a === void 0 ? "" : a;
		t.cspNonce;
		var s = Tr(t, ["className", "cspNonce"]), c = (0, H.useRef)();
		return (0, H.useImperativeHandle)(i, function() {
			return c.current;
		}, []), (0, H.useEffect)(function() {
			var e = n.inject(c.current, { nonce: t.cspNonce });
			return function() {
				e.destroy();
			};
		}, []), (0, H.createElement)(e, wr({
			ref: c,
			"data-styled-id": r,
			className: `${o} ${r}`
		}, s));
	});
}
//#endregion
//#region node_modules/react-moveable/dist/moveable.esm.js
var Dr = function(e, t) {
	return Dr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, Dr(e, t);
};
function Or(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	Dr(e, t);
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
function kr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Ar(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
function jr(e) {
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
function Mr(e, t) {
	return q({
		events: [],
		props: [],
		name: e
	}, t);
}
var Nr = [
	"n",
	"w",
	"s",
	"e"
], Pr = [
	"n",
	"w",
	"s",
	"e",
	"nw",
	"ne",
	"sw",
	"se"
];
function Fr(e, t) {
	return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${32 * e}px" height="${32 * e}px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${t}deg);transform-origin: 16px 16px"></path></svg>`;
}
function Ir(e) {
	var t = Fr(1, e), n = Math.round(e / 45) * 45 % 180, r = "ns-resize";
	return n === 135 ? r = "nwse-resize" : n === 45 ? r = "nesw-resize" : n === 90 && (r = "ew-resize"), `cursor:${r};cursor: url('${t}') 16 16, ${r};`;
}
var Lr = De(), Rr = Lr.browser.webkit, zr = Rr && (function() {
	var e = typeof window > "u" ? { userAgent: "" } : window.navigator, t = /applewebkit\/([^\s]+)/g.exec(e.userAgent.toLowerCase());
	return t ? parseFloat(t[1]) < 605 : !1;
})(), Br = Lr.browser.name, Vr = parseInt(Lr.browser.version, 10), Hr = Br === "chrome", Ur = Lr.browser.chromium, Wr = parseInt(Lr.browser.chromiumVersion, 10) || 0, Gr = Hr && Vr >= 109 || Ur && Wr >= 109, Kr = Br === "firefox", qr = parseInt(Lr.browser.webkitVersion, 10) >= 612 || Vr >= 15, Jr = "moveable-", Yr = `
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
${Pr.map(function(e) {
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
${Ir(e)}
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

${zr ? ":global svg *:before {\ncontent:\"\";\ntransform-origin: inherit;\n}" : ""}
`, Xr = [
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
], Zr = 1e-4, Qr = 1e-7, $r = 1e-9, ei = 10 ** 10, ti = -ei, ni = {
	n: [0, -1],
	e: [1, 0],
	s: [0, 1],
	w: [-1, 0],
	nw: [-1, -1],
	ne: [1, -1],
	sw: [-1, 1],
	se: [1, 1]
}, ri = {
	n: [0, 1],
	e: [1, 3],
	s: [3, 2],
	w: [2, 0],
	nw: [0],
	ne: [1],
	sw: [2],
	se: [3]
}, ii = {
	n: 0,
	s: 180,
	w: 270,
	e: 90,
	nw: 315,
	ne: 45,
	sw: 225,
	se: 135
}, ai = [
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
function oi(e, t, n, r, i, a) {
	a === void 0 && (a = "draggable");
	var o = t.gestos[a]?.move(n, e.inputEvent) ?? {}, s = o.originalDatas || o.datas, c = s[a] || (s[a] = {});
	return q(q({}, i ? gc(t, o) : o), {
		isPinch: !!r,
		parentEvent: !0,
		datas: c,
		originalDatas: e.originalDatas
	});
}
var si = /* @__PURE__ */ function() {
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
function ci(e, t, n, r) {
	var i = e.length === 16 ? 4 : 3, a = J(Ps(e, n, r, i), 4), o = J(a[0], 2), s = o[0], c = o[1], l = J(a[1], 2), u = l[0], d = l[1], f = J(a[2], 2), p = f[0], m = f[1], h = J(a[3], 2), g = h[0], _ = h[1], v = J(Ns(e, t, i), 2), y = v[0], b = v[1], x = Math.min(s, u, p, g), S = Math.min(c, d, m, _), C = Math.max(s, u, p, g), w = Math.max(c, d, m, _);
	s = s - x || 0, u = u - x || 0, p = p - x || 0, g = g - x || 0, c = c - S || 0, d = d - S || 0, m = m - S || 0, _ = _ - S || 0, y = y - x || 0, b = b - S || 0;
	var T = e[0], E = e[i + 1], D = Fc(T * E);
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
function li(e, t) {
	var n = t.clientX, r = t.clientY, i = t.datas, a = e.state, o = a.moveableClientRect, s = a.rootMatrix, c = a.is3d, l = a.pos1, u = o.left, d = o.top, f = c ? 4 : 3, p = J(K(hc(s, [n - u, r - d], f), l), 2), m = p[0], h = p[1], g = J(_i({
		datas: i,
		distX: m,
		distY: h
	}), 2);
	return [g[0], g[1]];
}
function ui(e, t) {
	var n = t.datas, r = e.state, i = r.allMatrix, a = r.beforeMatrix, o = r.is3d, s = r.left, c = r.top, l = r.origin, u = r.offsetMatrix, d = r.targetMatrix, f = r.transformOrigin, p = o ? 4 : 3;
	n.is3d = o, n.matrix = i, n.targetMatrix = d, n.beforeMatrix = a, n.offsetMatrix = u, n.transformOrigin = f, n.inverseMatrix = Bt(i, p), n.inverseBeforeMatrix = Bt(a, p), n.absoluteOrigin = Wt(Jt([s, c], l), p), n.startDragBeforeDist = Zt(n.inverseBeforeMatrix, n.absoluteOrigin, p), n.startDragDist = Zt(n.inverseMatrix, n.absoluteOrigin, p);
}
function di(e) {
	return ci(e.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function fi(e, t, n) {
	var r = t.datas, i = t.originalDatas.beforeRenderable, a = r.transformIndex, o = i.nextTransforms, s = o.length, c = i.nextTransformAppendedIndexes, l = -1;
	a === -1 ? (n === "translate" ? l = 0 : n === "rotate" && (l = st(o, function(e) {
		return e.match(/scale\(/g);
	})), l === -1 && (l = o.length), r.transformIndex = l) : l = ct(c, function(e) {
		return e.index === a && e.functionName === n;
	}) ? a : a + c.filter(function(e) {
		return e.index < a;
	}).length;
	var u = Sc(o, e.state, l), d = u.targetFunction, f = n === "rotate" ? "rotateZ" : n;
	r.beforeFunctionTexts = u.beforeFunctionTexts, r.afterFunctionTexts = u.afterFunctionTexts, r.beforeTransform = u.beforeFunctionMatrix, r.beforeTransform2 = u.beforeFunctionMatrix2, r.targetTansform = u.targetFunctionMatrix, r.afterTransform = u.afterFunctionMatrix, r.afterTransform2 = u.afterFunctionMatrix2, r.targetAllTransform = u.allFunctionMatrix, d.functionName === f ? (r.afterFunctionTexts.splice(0, 1), r.isAppendTransform = !1) : s > l && (r.isAppendTransform = !0, i.nextTransformAppendedIndexes = Y(Y([], J(c), !1), [{
		functionName: n,
		index: l,
		isAppend: !0
	}], !1));
}
function pi(e, t, n) {
	return `${e.beforeFunctionTexts.join(" ")} ${e.isAppendTransform ? n : t} ${e.afterFunctionTexts.join(" ")}`;
}
function mi(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = J(gi({
		datas: t,
		distX: n,
		distY: r
	}), 2), a = i[0], o = i[1];
	return Zt(hi(t, Ut([a, o], 4)), Wt([
		0,
		0,
		0
	], 4), 4);
}
function hi(e, t, n) {
	var r = e.beforeTransform, i = e.afterTransform, a = e.beforeTransform2, o = e.afterTransform2, s = e.targetAllTransform, c = n ? qt(s, t, 4) : qt(t, s, 4);
	return qt(qt(Bt(n ? a : r, 4), c, 4), Bt(n ? o : i, 4), 4);
}
function gi(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = t.inverseBeforeMatrix, a = t.is3d, o = t.startDragBeforeDist, s = t.absoluteOrigin, c = a ? 4 : 3;
	return K(Zt(i, Jt(s, [n, r]), c), o);
}
function _i(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.inverseBeforeMatrix, o = n.inverseMatrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return K(Zt(t ? a : o, Jt(u, [r, i]), d), t ? c : l);
}
function vi(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.beforeMatrix, o = n.matrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return K(Zt(t ? a : o, Jt(t ? c : l, [r, i]), d), u);
}
function yi(e, t, n, r, i, a) {
	return r === void 0 && (r = t), i === void 0 && (i = n), a === void 0 && (a = [0, 0]), e ? e.map(function(e, o) {
		var s = it(e), c = s.value, l = s.unit, u = o ? i : r, d = o ? n : t;
		return e === "%" || isNaN(c) ? d * (u ? a[o] / u : 0) : l === "%" ? d * c / 100 : c;
	}) : a;
}
function bi(e) {
	var t = [];
	return e[1] >= 0 && (e[0] >= 0 && t.push(3), e[0] <= 0 && t.push(2)), e[1] <= 0 && (e[0] >= 0 && t.push(1), e[0] <= 0 && t.push(0)), t;
}
function xi(e, t) {
	return bi(t).map(function(t) {
		return e[t];
	});
}
function Si(e, t) {
	var n = (t + 1) / 2;
	return [Ue(e[0][0], e[1][0], n, 1 - n), Ue(e[0][1], e[1][1], n, 1 - n)];
}
function Ci(e, t) {
	return Si([Si([e[0], e[1]], t[0]), Si([e[2], e[3]], t[0])], t[1]);
}
function wi(e, t, n, r, i, a) {
	var o = Ci(Ps(t, n, r, i), a);
	return [e[0] - o[0], e[1] - o[1]];
}
function Ti(e, t, n, r) {
	return qt(e, vs(t, r, n), r);
}
function Ei(e, t, n, r) {
	var i = e.transformOrigin, a = e.offsetMatrix, o = e.is3d ? 4 : 3, s;
	if (qe(n)) {
		var c = t.beforeTransform, l = t.afterTransform;
		s = Gt(r ? pn(n) : qt(qt(c, pn([n]), 4), l, 4), 4, o);
	} else s = n;
	return Ti(a, s, i, o);
}
function Di(e, t) {
	var n = e.transformOrigin, r = e.offsetMatrix, i = e.is3d, a = e.targetMatrix, o = e.targetAllTransform, s = i ? 4 : 3;
	return Ti(r, qt(o || a, cn(t, s), s), n, s);
}
function Oi(e, t) {
	var n = Mi(t);
	return {
		setTransform: function(r, i) {
			i === void 0 && (i = -1), n.startTransforms = Ke(r) ? r : tt(r), Ai(e, t, i);
		},
		setTransformIndex: function(n) {
			Ai(e, t, n);
		}
	};
}
function ki(e, t, n) {
	var r = Mi(t).startTransforms;
	Ai(e, t, st(r, function(e) {
		return e.indexOf(`${n}(`) === 0;
	}));
}
function Ai(e, t, n) {
	var r = Mi(t), i = t.datas;
	if (i.transformIndex = n, n !== -1) {
		var a = r.startTransforms[n];
		if (a) {
			var o = e.state;
			i.startValue = gn([a], {
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
function ji(e, t) {
	var n = Mi(e);
	n.nextTransforms = tt(t);
}
function Mi(e) {
	return e.originalDatas.beforeRenderable;
}
function Ni(e) {
	return e.originalDatas.beforeRenderable.nextTransforms;
}
function Pi(e) {
	return (Ni(e) || []).join(" ");
}
function Fi(e) {
	return Mi(e).nextStyle;
}
function Ii(e, t, n, r, i) {
	ji(i, t);
	var a = So.drag(e, oi(i, e.state, n, r, !1)), o = a ? a.transform : t;
	return q(q({
		transform: t,
		drag: a
	}, rc({ transform: o }, i)), { afterTransform: o });
}
function Li(e, t, n, r, i, a) {
	return Vi(e, n, r, Ei(e.state, i, t, a));
}
function Ri(e, t, n, r, i, a, o) {
	var s = Li(e, t, n, i, a, o), c = e.state, l = c.left, u = c.top, d = e.props.groupable, f = d ? l : 0, p = d ? u : 0;
	return K(K(r, s), [f, p]);
}
function zi(e, t, n, r, i, a, o) {
	return Ri(e, t, n, r, i, a, o);
}
function Bi(e, t, n) {
	return [t ? -1 + e[0] / (t / 2) : 0, n ? -1 + e[1] / (n / 2) : 0];
}
function Vi(e, t, n, r) {
	r === void 0 && (r = e.state.allMatrix);
	var i = e.state, a = i.width, o = i.height, s = i.is3d ? 4 : 3, c = [a / 2 * (1 + t[0]) + n[0], o / 2 * (1 + t[1]) + n[1]];
	return Ns(r, c, s);
}
function Hi(e, t, n) {
	var r = n.fixedDirection, i = n.fixedPosition, a = n.fixedOffset;
	return Ri(e, `rotate(${t}deg)`, r, i, a, n);
}
function Ui(e, t, n, r, i, a) {
	var o = e.props.groupable, s = e.state, c = s.transformOrigin, l = s.offsetMatrix, u = s.is3d, d = s.width, f = s.height, p = s.left, m = s.top, h = a.fixedDirection, g = a.nextTargetMatrix || s.targetMatrix, _ = u ? 4 : 3, v = yi(i, t, n, d, f, c), y = o ? p : 0, b = o ? m : 0;
	return K(wi(r, Ti(l, g, v, _), t, n, _, h), [y, b]);
}
function Wi(e, t) {
	return Ci(ec(e.state), t);
}
function Gi(e, t) {
	var n = e.targetGesto, r = e.controlGesto, i;
	return n?.isFlag() && (i = n.getEventData()[t]), !i && r?.isFlag() && (i = r.getEventData()[t]), i || {};
}
function Ki(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function qi(e) {
	var t = e("scale"), n = e("rotate"), r = e("translate"), i = [];
	return r && r !== "0px" && r !== "none" && i.push(`translate(${r.split(/\s+/).join(",")})`), n && n !== "1" && n !== "none" && i.push(`rotate(${n})`), t && t !== "1" && t !== "none" && i.push(`scale(${t.split(/\s+/).join(",")})`), i;
}
function Ji(e, t, n) {
	for (var r = e, i = [], a = jt(e) || Mt(e), o = !n && e === t || e === a, s = o, c = !1, l = 3, u, d, f, p = !1, m = ws(t, t, !0).offsetParent, h = 1; r && !s;) {
		s = o;
		var g = ta(r), _ = g("position"), v = Cs(r), y = _ === "fixed", b = qi(g), x = Yt(_s(v)), S = void 0, C = !1, w = !1, T = 0, E = 0, D = 0, O = 0, k = {
			hasTransform: !1,
			fixedContainer: null
		};
		y && (p = !0, k = Os(r), m = k.fixedContainer);
		var A = x.length;
		!c && (A === 16 || b.length) && (c = !0, l = 4, Ds(i), f &&= Gt(f, 3, 4)), c && A === 9 && (x = Gt(x, 3, 4));
		var j = Ts(r, e), M = j.tagName, N = j.hasOffset, P = j.isSVG, F = j.origin, I = j.targetOrigin, L = j.offset, R = J(L, 2), z = R[0], B = R[1];
		M === "svg" && !r.ownerSVGElement && f && (i.push({
			type: "target",
			target: r,
			matrix: js(r, l)
		}), i.push({
			type: "offset",
			target: r,
			matrix: sn(l)
		}));
		var ee = parseFloat(g("zoom")) || 1;
		if (y) S = k.fixedContainer, C = !0;
		else {
			var V = ws(r, t, !1, !0, g), te = V.offsetZoom;
			if (S = V.offsetParent, C = V.isEnd, w = V.isStatic, h *= te, (V.isCustomElement || te !== 1) && w) z -= S.offsetLeft, B -= S.offsetTop;
			else if ((Kr || Gr) && V.parentSlotElement) {
				for (var H = S, ne = 0, U = 0; H && Ki(H);) ne += H.offsetLeft, U += H.offsetTop, H = H.offsetParent;
				z -= ne, B -= U;
			}
		}
		if (Rr && !qr && N && !P && w && (_ === "relative" || _ === "static") && (z -= S.offsetLeft, B -= S.offsetTop, o ||= C), y) N && k.hasTransform && (D = S.clientLeft, O = S.clientTop);
		else if (N && m !== S && (T = S.clientLeft, E = S.clientTop), N && S === a) {
			var W = Es(r, !1);
			z += W[0], B += W[1];
		}
		if (i.push({
			type: "target",
			target: r,
			matrix: vs(x, l, F)
		}), b.length && (i.push({
			type: "offset",
			target: r,
			matrix: sn(l)
		}), i.push({
			type: "target",
			target: r,
			matrix: vs(pn(b), l, F)
		})), N) {
			var re = r === e, ie = re ? 0 : r.scrollLeft, ae = re ? 0 : r.scrollTop;
			i.push({
				type: "offset",
				target: r,
				matrix: ln([z - ie + T - D, B - ae + E - O], l)
			});
		} else i.push({
			type: "offset",
			target: r,
			origin: F
		});
		if (ee !== 1 && i.push({
			type: "zoom",
			target: r,
			matrix: vs(cn([ee, ee], l), l, [0, 0])
		}), f ||= x, u ||= F, d ||= I, s || y) break;
		r = S, o = C, (!n || r === a) && (s = o);
	}
	return f ||= sn(l), u ||= [0, 0], d ||= [0, 0], {
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
var Yi = null, Xi = null, Zi = null;
function Qi(e) {
	e ? (window.Map && (Yi = /* @__PURE__ */ new Map(), Xi = /* @__PURE__ */ new Map()), Zi = []) : (Yi = null, Zi = null, Xi = null);
}
function $i(e) {
	var t = Xi?.get(e);
	if (t) return t;
	var n = Ys(e, !0);
	return Xi && Xi.set(e, n), n;
}
function ea(e, t) {
	if (Zi) {
		var n = ct(Zi, function(n) {
			return n[0][0] == e && n[0][1] == t;
		});
		if (n) return n[1];
	}
	var r = Ji(e, t, !0);
	return Zi && Zi.push([[e, t], r]), r;
}
function ta(e) {
	var t = Yi?.get(e);
	if (!t) {
		var n = Nt(e).getComputedStyle(e);
		if (!Yi) return function(e) {
			return n[e];
		};
		t = {
			style: n,
			cached: {}
		}, Yi.set(e, t);
	}
	var r = t.cached, i = t.style;
	return function(e) {
		return e in r || (r[e] = i[e]), r[e];
	};
}
function na(e, t, n) {
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
function ra(e, t, n, r, i, a, o) {
	var s = !!n.match(/Start$/g), c = !!n.match(/End$/g), l = i.isPinch, u = i.datas, d = na(e, t.name, i), f = e.moveables, p = [], m = d.map(function(e, i) {
		var d = f[i], m = d.state, h = m.gestos, g = e;
		if (s) g = new si(o).dragStart(r, e), p.push(g);
		else {
			if (h[o] || (h[o] = u.childGestos[i]), !h[o]) return;
			g = oi(e, m, r, l, a, o), p.push(g);
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
function ia(e, t, n, r, i, a) {
	i === void 0 && (i = function(e, t) {
		return t;
	});
	var o = !!n.match(/End$/g), s = na(e, t.name, r), c = e.moveables;
	return s.map(function(e, r) {
		var s = c[r], l = e;
		l = i(s, e);
		var u = t[n](s, q(q({}, l), { parentFlag: !0 }));
		return u && a && a(s, e, u, r), o && (s.state.gestos = {}), u;
	});
}
function aa(e, t, n, r) {
	var i = n.fixedDirection, a = n.fixedPosition, o = Ci(r.datas.startPositions || ec(t.state), i), s = J(Zt(on(-e.rotation / 180 * Math.PI, 3), [
		o[0] - a[0],
		o[1] - a[1],
		1
	], 3), 2), c = s[0], l = s[1];
	return r.datas.originalX = c, r.datas.originalY = l, r;
}
function oa(e, t, n, r) {
	var i = e.getState(), a = i.renderPoses, o = i.rotation, s = i.direction, c = Us(e.props, t).zoom, l = is(o / Math.PI * 180), u = {}, d = e.renderState;
	d.renderDirectionMap ||= {};
	var f = d.renderDirectionMap;
	n.forEach(function(e) {
		var t = e.dir;
		u[t] = !0;
	});
	var p = Fc(s);
	return n.map(function(e) {
		var n = e.data, i = e.classNames, s = e.dir, d = ri[s];
		if (!d || !u[s]) return null;
		f[s] = !0;
		var m = (G(l, 15) + p * ii[s] + 720) % 180, h = {};
		return dt(n).forEach(function(e) {
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
			style: Hs.apply(void 0, Y([o, c], J(d.map(function(e) {
				return a[e];
			})), !1))
		}));
	});
}
function sa(e, t, n, r) {
	var i = Us(e.props, n), a = i.renderDirections, o = a === void 0 ? t : a, s = i.displayAroundControls;
	if (!o) return [];
	var c = o === !0 ? Pr : o;
	return Y(Y([], J(s ? pa(e, r, n, c) : []), !1), J(oa(e, n, c.map(function(e) {
		return {
			data: {},
			classNames: [],
			dir: e
		};
	}), r)), !1);
}
function ca(e, t, n, r, i, a) {
	var o = [...arguments].slice(6), s = vt(n, r), c = t ? G(s / Math.PI * 180, 15) % 180 : -1;
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
		style: Vs(n, r, i, s)
	});
}
function la(e, t, n, r, i) {
	return (n === !0 ? Nr : n).map(function(n, a) {
		var o = J(ri[n], 2), s = o[0], c = o[1];
		if (c != null) return ca(e, n, r[s], r[c], i, `${t}Edge${a}`, t);
	}).filter(Boolean);
}
function ua(e) {
	return function(t, n) {
		var r = Us(t.props, e).edge;
		return r && (r === !0 || r.length) ? Y(Y([], J(la(n, e, r, t.getState().renderPoses, t.props.zoom)), !1), J(fa(t, e, n)), !1) : da(t, e, n);
	};
}
function da(e, t, n) {
	return sa(e, Pr, t, n);
}
function fa(e, t, n) {
	return sa(e, [
		"nw",
		"ne",
		"sw",
		"se"
	], t, n);
}
function pa(e, t, n, r) {
	var i = e.renderState;
	i.renderDirectionMap ||= {};
	var a = e.getState(), o = a.renderPoses, s = a.rotation, c = a.direction, l = i.renderDirectionMap, u = e.props.zoom, d = Fc(c), f = s / Math.PI * 180;
	return (r || dt(l)).map(function(e) {
		var r = ri[e];
		if (!r) return null;
		var i = (G(f, 15) + d * ii[e] + 720) % 180, a = ["around-control"];
		return n && a.push("direction", n), t.createElement("div", {
			className: X.apply(void 0, Y([], J(a), !1)),
			"data-rotation": i,
			"data-direction": e,
			key: `direction-around-${e}`,
			style: Hs.apply(void 0, Y([s, u], J(r.map(function(e) {
				return o[e];
			})), !1))
		});
	});
}
function ma(e, t, n) {
	var r = e || {}, i = r.position, a = i === void 0 ? "client" : i, o = r.left, s = o === void 0 ? -Infinity : o, c = r.top, l = c === void 0 ? -Infinity : c, u = r.right, d = u === void 0 ? Infinity : u, f = r.bottom, p = {
		position: a,
		left: s,
		top: l,
		right: d,
		bottom: f === void 0 ? Infinity : f
	};
	return {
		vertical: _a(p, t, !0),
		horizontal: _a(p, n, !1)
	};
}
function ha(e, t) {
	var n = e.state, r = n.containerClientRect, i = r.clientHeight, a = r.clientWidth, o = r.clientLeft, s = r.clientTop, c = n.snapOffset, l = c.left, u = c.top, d = c.right, f = c.bottom, p = t || e.props.bounds || {}, m = (p.position || "client") === "css", h = p.left, g = h === void 0 ? -Infinity : h, _ = p.top, v = _ === void 0 ? -Infinity : _, y = p.right, b = y === void 0 ? m ? -Infinity : Infinity : y, x = p.bottom, S = x === void 0 ? m ? -Infinity : Infinity : x;
	return m && (b = a + d - l - b, S = i + f - u - S), {
		left: g + l - o,
		right: b + l - o,
		top: v + u - s,
		bottom: S + u - s
	};
}
function ga(e, t, n) {
	var r = ha(e), i = r.left, a = r.top, o = r.right, s = r.bottom, c = J(n, 2), l = c[0], u = c[1], d = J(K(n, t), 2), f = d[0], p = d[1];
	$(f) < Qr && (f = 0), $(p) < Qr && (p = 0);
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
function _a(e, t, n) {
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
function va(e, t, n) {
	return (n ? e.map(function(e) {
		return nn(e, n);
	}) : e).some(function(e) {
		return e[0] < t.left && $(e[0] - t.left) > .1 || e[0] > t.right && $(e[0] - t.right) > .1 || e[1] < t.top && $(e[1] - t.top) > .1 || e[1] > t.bottom && $(e[1] - t.bottom) > .1;
	});
}
function ya(e, t, n) {
	var r = zs(e), i = Math.sqrt(r * r - t * t) || 0;
	return [i, -i].sort(function(t, r) {
		return $(t - e[+!n]) - $(r - e[+!n]);
	}).map(function(e) {
		return vt([0, 0], n ? [e, t] : [t, e]);
	});
}
function ba(e, t, n, r, i) {
	if (!e.props.bounds) return [];
	var a = i * Math.PI / 180, o = ha(e), s = o.left, c = o.top, l = o.right, u = o.bottom, d = s - r[0], f = l - r[0], p = c - r[1], m = u - r[1], h = {
		left: d,
		top: p,
		right: f,
		bottom: m
	};
	if (!va(n, h, 0)) return [];
	var g = [];
	return [
		[d, 0],
		[f, 0],
		[p, 1],
		[m, 1]
	].forEach(function(e) {
		var r = J(e, 2), i = r[0], o = r[1];
		n.forEach(function(e) {
			var n = vt([0, 0], e);
			g.push.apply(g, Y([], J(ya(e, i, o).map(function(e) {
				return a + e - n;
			}).filter(function(e) {
				return !va(t, h, e);
			}).map(function(e) {
				return G(e * 180 / Math.PI, Qr);
			})), !1));
		});
	}), g;
}
var xa = [
	"left",
	"right",
	"center"
], Sa = [
	"top",
	"bottom",
	"middle"
], Ca = {
	left: "start",
	right: "end",
	center: "center",
	top: "start",
	bottom: "end",
	middle: "center"
}, wa = {
	start: "left",
	end: "right",
	center: "center"
}, Ta = {
	start: "top",
	end: "bottom",
	center: "middle"
};
function Ea() {
	return {
		left: !1,
		top: !1,
		right: !1,
		bottom: !1
	};
}
function Da(e, t) {
	var n = e.props, r = n.snappable, i = n.bounds, a = n.innerBounds, o = n.verticalGuidelines, s = n.horizontalGuidelines, c = n.snapGridWidth, l = n.snapGridHeight, u = e.state, d = u.guidelines, f = u.enableSnap;
	return !r || !f || t && r !== !0 && r.indexOf(t) < 0 ? !1 : !!(c || l || i || a || d && d.length || o && o.length || s && s.length);
}
function Oa(e) {
	return e === !1 ? {} : e === !0 || !e ? {
		left: !0,
		right: !0,
		top: !0,
		bottom: !0
	} : e;
}
function ka(e, t) {
	var n = Oa(e), r = {};
	for (var i in n) i in t && n[i] && (r[i] = t[i]);
	return r;
}
function Aa(e, t) {
	var n = ka(e, t), r = Sa.filter(function(e) {
		return e in n;
	}), i = xa.filter(function(e) {
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
function ja(e, t, n) {
	var r = Ns(e, [t.clientLeft, t.clientTop], n);
	return [t.left + r[0], t.top + r[1]];
}
function Ma(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	Math.abs(i) < 1e-7 && (i = 0), Math.abs(a) < 1e-7 && (a = 0);
	var o = 0, s = 0, c = 0;
	return i ? a ? (o = -a / i, s = 1, c = o * n[0] - n[1]) : (s = 1, c = -n[1]) : (o = -1, c = n[0]), [
		o,
		s,
		c
	].map(function(e) {
		return G(e, Be);
	});
}
var Na = "snapRotationThreshold", Pa = "snapRotationDegrees", Fa = "snapHorizontalThreshold", Ia = "snapVerticalThreshold";
function La(e, t, n, r, i, a, o) {
	r === void 0 && (r = []), i === void 0 && (i = []);
	var s = e.props, c = e.state.snapThresholdInfo?.multiples || [1, 1], l = uc(o, s[Fa], 5), u = uc(a, s[Ia], 5);
	return Ra(e.state.guidelines, t, n, r, i, l, u, c);
}
function Ra(e, t, n, r, i, a, o, s) {
	return {
		vertical: Ua(e, "vertical", t, o * s[0], r),
		horizontal: Ua(e, "horizontal", n, a * s[1], i)
	};
}
function za(e, t, n) {
	var r = J(n, 2), i = r[0], a = r[1], o = J(t, 2), s = o[0], c = o[1], l = J(K(n, t), 2), u = l[0], d = l[1], f = d > 0, p = u > 0;
	u = yc(u), d = yc(d);
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
	var g = La(e, u ? [i] : [], d ? [a] : [], [], [], void 0, void 0), _ = g.vertical, v = g.horizontal;
	_.posInfos.filter(function(e) {
		var t = e.pos;
		return p ? t >= s : t <= s;
	}), v.posInfos.filter(function(e) {
		var t = e.pos;
		return f ? t >= c : t <= c;
	}), _.isSnap = _.posInfos.length > 0, v.isSnap = v.posInfos.length > 0;
	var y = Ha(_), b = y.isSnap, x = y.guideline, S = Ha(v), C = S.isSnap, w = S.guideline, T = C ? w.pos[1] : 0, E = b ? x.pos[0] : 0;
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
function Ba(e) {
	var t = "";
	return e === -1 || e === "top" || e === "left" ? t = "start" : e === 0 || e === "center" || e === "middle" ? t = "center" : (e === 1 || e === "right" || e === "bottom") && (t = "end"), t;
}
function Va(e, t, n, r) {
	var i = Aa(e.props.snapDirections, t), a = La(e, i.vertical, i.horizontal, i.verticalNames.map(function(e) {
		return Ba(e);
	}), i.horizontalNames.map(function(e) {
		return Ba(e);
	}), n, r), o = Ba(i.horizontalNames[a.horizontal.index]), s = Ba(i.verticalNames[a.vertical.index]);
	return {
		vertical: q(q({}, a.vertical), { direction: s }),
		horizontal: q(q({}, a.horizontal), { direction: o })
	};
}
function Ha(e) {
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
function Ua(e, t, n, r, i) {
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
function Wa(e, t, n, r, i) {
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
	}) : e.props.keepRatio ? a.push([-1, -1], [-1, 1], [1, -1], [1, 1], n) : (a.push.apply(a, Y([], J(xi([
		[-1, -1],
		[1, -1],
		[-1, -1],
		[1, 1]
	], n)), !1)), a.length > 1 && a.push([(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2]));
	var o = a.map(function(e) {
		return Ci(t, e);
	}), s = La(e, o.map(function(e) {
		return e[0];
	}), o.map(function(e) {
		return e[1];
	}), a.map(function(e) {
		return Ba(e[0]);
	}), a.map(function(e) {
		return Ba(e[1]);
	}), r, i), c = Ba(a.map(function(e) {
		return e[0];
	})[s.vertical.index]), l = Ba(a.map(function(e) {
		return e[1];
	})[s.horizontal.index]);
	return {
		vertical: q(q({}, s.vertical), { direction: c }),
		horizontal: q(q({}, s.horizontal), { direction: l })
	};
}
function Ga(e, t) {
	var n = $(e.offset), r = $(t.offset);
	return e.isBound && t.isBound ? r - n : e.isBound ? -1 : t.isBound ? 1 : e.isSnap && t.isSnap ? r - n : e.isSnap ? -1 : t.isSnap || n < Qr ? 1 : r < Qr ? -1 : n - r;
}
function Ka(e, t) {
	return e.slice().sort(function(e, n) {
		var r = e.sign[t], i = n.sign[t], a = e.offset[t], o = n.offset[t];
		return r ? i ? Ga({
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
function qa(e, t, n) {
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
function Ja(e, t) {
	var n = _t([t[0][0], t[1][0]]), r = _t([t[0][1], t[1][1]]);
	return {
		vertical: n <= e[0],
		horizontal: r <= e[1]
	};
}
function Ya(e, t) {
	var n = J(t, 2), r = n[0], i = n[1], a = i[0] - r[0], o = i[1] - r[1];
	$(a) < Qr && (a = 0), $(o) < Qr && (o = 0);
	var s, c;
	return a ? o ? (s = o / a * (e[0] - r[0]) + r[1], c = e[1]) : (s = r[1], c = e[1]) : (s = r[0], c = e[0]), s - c;
}
function Xa(e, t, n, r) {
	return r === void 0 && (r = Qr), e.every(function(e) {
		var i = Ya(e, t);
		return i <= 0 === n || $(i) <= r;
	});
}
function Za(e, t, n, r, i) {
	return i === void 0 && (i = 0), r && t - i <= e || !r && e <= n + i ? {
		isBound: !0,
		offset: r ? t - e : n - e
	} : {
		isBound: !1,
		offset: 0
	};
}
function Qa(e, t) {
	var n = t.line, r = t.centerSign, i = t.verticalSign, a = t.horizontalSign, o = t.lineConstants, s = e.props.innerBounds;
	if (!s) return {
		isAllBound: !1,
		isBound: !1,
		isVerticalBound: !1,
		isHorizontalBound: !1,
		offset: [0, 0]
	};
	var c = s.left, l = s.top, u = s.width, d = s.height, f = [[c, l], [c, l + d]], p = [[c, l], [c + u, l]], m = [[c + u, l], [c + u, l + d]], h = [[c, l + d], [c + u, l + d]];
	if (Xa([
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
	var g = $a(n, o, p, i), _ = $a(n, o, h, i), v = $a(n, o, f, a), y = $a(n, o, m, a), b = g.isBound && _.isBound, x = g.isBound || _.isBound, S = v.isBound && y.isBound, C = v.isBound || y.isBound, w = mc(g.offset, _.offset), T = mc(v.offset, y.offset), E = [0, 0], D = !1, O = !1;
	return $(T) < $(w) ? (E = [w, 0], D = x, O = b) : (E = [0, T], D = C, O = S), {
		isAllBound: O,
		isVerticalBound: x,
		isHorizontalBound: C,
		isBound: D,
		offset: E
	};
}
function $a(e, t, n, r, i, a) {
	var o = J(t, 2), s = o[0], c = o[1], l = e[0], u = n[0], d = n[1], f = yc(d[1] - u[1]), p = yc(d[0] - u[0]), m = c, h = s, g = -s / c;
	if (!p) {
		if (a && !h) return {
			isBound: !1,
			offset: 0
		};
		if (m) return Za(g * (u[0] - l[0]) + l[1], u[1], d[1], r, i);
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
		if (h) return Za((u[1] - l[1]) / g + l[0], u[0], d[0], r, i);
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
function eo(e, t, n) {
	return t.map(function(t) {
		var r = Qa(e, t), i = r.isBound, a = r.offset, o = r.isVerticalBound, s = r.isHorizontalBound, c = t.multiple;
		return {
			sign: c,
			isBound: i,
			isVerticalBound: o,
			isHorizontalBound: s,
			isSnap: !1,
			offset: _i({
				datas: n,
				distX: a[0],
				distY: a[1]
			}).map(function(e, t) {
				return e * (c[t] ? 2 / c[t] : 0);
			})
		};
	});
}
function to(e, t, n) {
	var r, i = eo(e, ro(e, t, [0, 0], !1).map(function(e) {
		return q(q({}, e), { multiple: e.multiple.map(function(e) {
			return $(e) * 2;
		}) });
	}), n), a = Ka(i, 0), o = Ka(i, 1), s = 0, c = 0, l = a.isVerticalBound || o.isVerticalBound, u = a.isHorizontalBound || o.isHorizontalBound;
	return (l || u) && (r = J(vi({
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
function no(e, t) {
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
function ro(e, t, n, r) {
	var i = e.state, a = i.allMatrix, o = i.is3d, s = Ps(a, 100, 100, o ? 4 : 3), c = Ci(s, [0, 0]);
	return no(n, r).map(function(e) {
		var n = J(e, 3), r = n[0], i = n[1], a = n[2], o = [Ci(s, i), Ci(s, a)], l = Ma(o), u = Ja(c, o), d = u.vertical, f = u.horizontal;
		return {
			multiple: r,
			centerSign: Ya(c, o) <= 0,
			verticalSign: d,
			horizontalSign: f,
			lineConstants: l,
			line: [Ci(t, i), Ci(t, a)]
		};
	});
}
function io(e, t, n, r) {
	var i = r ? e.map(function(e) {
		return nn(e, r);
	}) : e;
	return [
		[i[0], i[1]],
		[i[1], i[3]],
		[i[3], i[2]],
		[i[2], i[0]]
	].some(function(e) {
		return !Xa(t, e, Ya(n, e) <= 0);
	});
}
function ao(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return $(n[0]);
	if (!a) return $(n[1]);
	var o = a / i;
	return $((-o * n[0] + n[1]) / Math.sqrt(o ** 2 + 1));
}
function oo(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return [n[0], 0];
	if (!a) return [0, n[1]];
	var o = a / i, s = -o * n[0] + n[1];
	return [-s / (o + 1 / o), s / (o * o + 1)];
}
function so(e, t, n, r, i) {
	var a = e.props.innerBounds, o = i * Math.PI / 180;
	if (!a) return [];
	var s = a.left, c = a.top, l = a.width, u = a.height, d = s - r[0], f = s + l - r[0], p = c - r[1], m = c + u - r[1], h = [
		[d, p],
		[f, p],
		[d, m],
		[f, m]
	], g = Ci(n, [0, 0]);
	if (!io(n, h, g, 0)) return [];
	var _ = [], v = h.map(function(e) {
		return [zs(e), vt([0, 0], e)];
	});
	return [
		[n[0], n[1]],
		[n[1], n[3]],
		[n[3], n[2]],
		[n[2], n[0]]
	].forEach(function(e) {
		var n = vt([0, 0], oo(e)), r = ao(e);
		_.push.apply(_, Y([], J(v.filter(function(e) {
			var t = J(e, 1)[0];
			return t && r <= t;
		}).map(function(e) {
			var t = J(e, 2), i = t[0], a = t[1], s = Math.acos(i ? r / i : 0), c = a + s, l = a - s;
			return [o + c - n, o + l - n];
		}).reduce(function(e, t) {
			return e.push.apply(e, Y([], J(t), !1)), e;
		}, []).filter(function(e) {
			return !io(t, h, g, e);
		}).map(function(e) {
			return G(e * 180 / Math.PI, Qr);
		})), !1));
	}), _;
}
function co(e) {
	var t = e.props.innerBounds, n = Ea();
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
	], a = Ci(i, [0, 0]), o = t.left, s = t.top, c = t.width, l = t.height, u = [[o, s], [o, s + l]], d = [[o, s], [o + c, s]], f = [[o + c, s], [o + c, s + l]], p = [[o, s + l], [o + c, s + l]], m = ro(e, i, [0, 0], !1), h = [], g = [];
	return m.forEach(function(e) {
		var t = e.line, r = e.lineConstants, i = Ja(a, t), m = i.horizontal, _ = i.vertical, v = $a(t, r, d, _, 1, !0), y = $a(t, r, p, _, 1, !0), b = $a(t, r, u, m, 1, !0), x = $a(t, r, f, m, 1, !0);
		v.isBound && !n.top && (h.push(s), n.top = !0), y.isBound && !n.bottom && (h.push(s + l), n.bottom = !0), b.isBound && !n.left && (g.push(o), n.left = !0), x.isBound && !n.right && (g.push(o + c), n.right = !0);
	}), {
		boundMap: n,
		horizontal: h,
		vertical: g
	};
}
function lo(e, t, n, r) {
	var i = t[0] - e[0], a = t[1] - e[1];
	if ($(i) < 1e-7 && (i = 0), $(a) < 1e-7 && (a = 0), !i) return r ? [0, 0] : [0, n];
	if (!a) return r ? [n, 0] : [0, 0];
	var o = a / i, s = e[1] - o * e[0];
	return r ? [n, o * (t[0] + n) + s - t[1]] : [(t[1] + n - s) / o - t[0], n];
}
function uo(e, t, n, r, i) {
	var a = lo(e, t, n, r);
	if (!a) return {
		isOutside: !1,
		offset: [0, 0]
	};
	var o = xt(e, t), s = xt(a, e), c = xt(a, t), l = s > o || c > o, u = J(_i({
		datas: i,
		distX: a[0],
		distY: a[1]
	}), 2);
	return {
		offset: [u[0], u[1]],
		isOutside: l
	};
}
function fo(e, t) {
	return e.isBound ? e.offset : t.isSnap ? Ha(t).offset : 0;
}
function po(e, t, n, r, i) {
	var a = J(t, 2), o = a[0], s = a[1], c = J(n, 2), l = c[0], u = c[1], d = J(r, 2), f = d[0], p = d[1], m = J(i, 2), h = m[0], g = m[1], _ = -h, v = -g;
	if (e && o && s) {
		_ = 0, v = 0;
		var y = [];
		if (l && u ? y.push([0, g], [h, 0]) : l ? y.push([h, 0]) : u ? y.push([0, g]) : f && p ? y.push([0, g], [h, 0]) : f ? y.push([h, 0]) : p && y.push([0, g]), y.length) {
			y.sort(function(e, t) {
				return zs(K([o, s], e)) - zs(K([o, s], t));
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
				} else _ = mc(-h, _), v = mc(-g, v);
			}
		}
	} else _ = o || l ? -h : 0, v = s || u ? -g : 0;
	return [_, v];
}
function mo(e, t, n, r, i, a) {
	if (!Da(e, "draggable")) return [{
		isSnap: !1,
		isBound: !1,
		offset: 0
	}, {
		isSnap: !1,
		isBound: !1,
		offset: 0
	}];
	var o = $s(a.absolutePoses, [t, n]), s = Fs(o), c = s.left, l = s.right, u = s.top, d = s.bottom, f = {
		horizontal: o.map(function(e) {
			return e[1];
		}),
		vertical: o.map(function(e) {
			return e[0];
		})
	}, p = ho(e, i, Aa(Oa(e.props.snapDirections), {
		left: c,
		right: l,
		top: u,
		bottom: d,
		center: (c + l) / 2,
		middle: (u + d) / 2
	}), f), m = p.vertical, h = p.horizontal, g = to(e, o, a), _ = g.vertical, v = g.horizontal, y = m.isSnap, b = h.isSnap, x = m.isBound || _.isBound, S = h.isBound || v.isBound, C = mc(m.offset, _.offset), w = mc(h.offset, v.offset), T = J(po(r, [t, n], [x, S], [y, b], [C, w]), 2), E = T[0], D = T[1];
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
function ho(e, t, n, r) {
	r === void 0 && (r = n);
	var i = ma(ha(e), r.vertical, r.horizontal), a = i.horizontal, o = i.vertical, s = t ? {
		horizontal: {
			isSnap: !1,
			index: -1
		},
		vertical: {
			isSnap: !1,
			index: -1
		}
	} : La(e, n.vertical, n.horizontal, void 0, void 0, void 0, void 0), c = s.horizontal, l = s.vertical, u = fo(a[0], c), d = fo(o[0], l), f = $(u), p = $(d);
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
function go(e, t, n, r, i, a, o) {
	o === void 0 && (o = [1, 1]);
	var s = ma(t, n, r), c = s.horizontal, l = s.vertical, u = Ra(e, n, r, [], [], i, a, o), d = u.horizontal, f = u.vertical, p = fo(c[0], d), m = fo(l[0], f), h = $(p), g = $(m);
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
function _o(e, t, n, r) {
	var i = vt(e, t) / Math.PI * 180, a = n.vertical, o = a.isBound, s = a.isSnap, c = a.dist, l = n.horizontal, u = l.isBound, d = l.isSnap, f = l.dist, p = i % 180, m = p < 3 || p > 177, h = p > 87 && p < 93;
	return f < c && (o || s && !h && (!r || !m)) ? "vertical" : u || d && !m && (!r || !h) ? "horizontal" : "";
}
function vo(e, t, n, r, i, a) {
	return n.map(function(n) {
		var o = J(n, 2), s = o[0], c = o[1], l = Ci(t, s), u = Ci(t, c), d = r ? bo(e, l, u, i) : ho(e, i, {
			vertical: [u[0]],
			horizontal: [u[1]]
		}), f = d.horizontal, p = f.offset, m = f.isBound, h = f.isSnap, g = d.vertical, _ = g.offset, v = g.isBound, y = g.isSnap, b = K(c, s);
		if (!_ && !p) return {
			isBound: v || m,
			isSnap: y || h,
			sign: b,
			offset: [0, 0]
		};
		var x = _o(l, u, d, r);
		if (!x) return {
			sign: b,
			isBound: !1,
			isSnap: !1,
			offset: [0, 0]
		};
		var S = x === "vertical", C = [0, 0];
		return C = !r && $(c[0]) === 1 && $(c[1]) === 1 && s[0] !== c[0] && s[1] !== c[1] ? _i({
			datas: a,
			distX: -_,
			distY: -p
		}) : uo(l, u, -(S ? _ : p), S, a).offset, C = C.map(function(e, t) {
			return e * (b[t] ? 2 / b[t] : 0);
		}), {
			sign: b,
			isBound: S ? v : m,
			isSnap: S ? y : h,
			offset: C
		};
	});
}
function yo(e, t) {
	return e.isBound ? e.offset : t.isSnap ? t.offset : 0;
}
function bo(e, t, n, r) {
	var i = ga(e, t, n), a = i.horizontal, o = i.vertical, s = r ? {
		horizontal: { isSnap: !1 },
		vertical: { isSnap: !1 }
	} : za(e, t, n), c = s.horizontal, l = s.vertical, u = yo(a, c), d = yo(o, l), f = $(u), p = $(d);
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
function xo(e, t, n, r, i) {
	var a = [-n[0], -n[1]], o = e.state, s = o.width, c = o.height, l = e.props.bounds, u = Infinity, d = Infinity;
	if (l) {
		var f = [[n[0], -n[1]], [-n[0], n[1]]], p = l.left, m = p === void 0 ? -Infinity : p, h = l.top, g = h === void 0 ? -Infinity : h, _ = l.right, v = _ === void 0 ? Infinity : _, y = l.bottom, b = y === void 0 ? Infinity : y;
		f.forEach(function(e) {
			var n = e[0] !== a[0], o = e[1] !== a[1], l = Ci(t, e), f = vt(r, l) * 360 / Math.PI;
			if (o) {
				var p = l.slice();
				($(f - 360) < 2 || $(f - 180) < 2) && (p[1] = r[1]);
				var h = uo(r, p, (r[1] < l[1] ? b : g) - l[1], !1, i), _ = J(h.offset, 2)[1], y = h.isOutside;
				isNaN(_) || (d = c + (y ? 1 : -1) * $(_));
			}
			if (n) {
				var p = l.slice();
				($(f - 90) < 2 || $(f - 270) < 2) && (p[0] = r[0]);
				var x = uo(r, p, (r[0] < l[0] ? v : m) - l[0], !0, i), S = J(x.offset, 1)[0], C = x.isOutside;
				isNaN(S) || (u = s + (C ? 1 : -1) * $(S));
			}
		});
	}
	return {
		maxWidth: u,
		maxHeight: d
	};
}
var So = {
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
		var u = zs(l), d = vt(l, [0, 0]);
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
		o.draggable = i || e.targetGesto, n.datas = {}, n.left = parseFloat(s.left || "") || 0, n.top = parseFloat(s.top || "") || 0, n.bottom = parseFloat(s.bottom || "") || 0, n.right = parseFloat(s.right || "") || 0, n.startValue = [0, 0], ui(e, t), ki(e, t, "translate"), us(e, n), n.prevDist = [0, 0], n.prevBeforeDist = [0, 0], n.isDrag = !1, n.deltaOffset = [0, 0];
		var c = Z(e, t, q({ set: function(e) {
			n.startValue = e;
		} }, Oi(e, t)));
		return (r || Q(e, "onDragStart", c)) === !1 ? (o.draggable = null, n.isPinch = !1) : (n.isDrag = !0, e.state.dragInfo = {
			startRect: e.getRect(),
			dist: [0, 0]
		}), n.isDrag ? c : !1;
	},
	drag: function(e, t) {
		if (t) {
			fi(e, t, "translate");
			var n = t.datas, r = t.parentEvent, i = t.parentFlag, a = t.isPinch, o = t.deltaOffset, s = t.useSnap, c = t.isRequest, l = t.isGroup, u = t.parentThrottleDrag, d = t.distX, f = t.distY, p = n.isDrag, m = n.prevDist, h = n.prevBeforeDist, g = n.startValue;
			if (p) {
				o && (d += o[0], f += o[1]);
				var _ = e.props, v = _.parentMoveable, y = l ? 0 : _.throttleDrag || u || 0, b = r ? 0 : _.throttleDragRotate || 0, x = 0, S = !1, C = !1, w = !1, T = !1;
				if (!r && b > 0 && (d || f)) {
					var E = _.startDragRotate || 0, D = G(E + vt([0, 0], [d, f]) * 180 / Math.PI, b) - E, O = f * Math.abs(Math.cos((D - 90) / 180 * Math.PI)), k = zs([d * Math.abs(Math.cos(D / 180 * Math.PI)), O]);
					x = D * Math.PI / 180, d = k * Math.cos(x), f = k * Math.sin(x);
				}
				if (!a && !r && !i) {
					var A = J(mo(e, d, f, b, !s && c || o, n), 2), j = A[0], M = A[1];
					S = j.isSnap, C = j.isBound, w = M.isSnap, T = M.isBound;
					var N = j.offset, P = M.offset;
					d += N, f += P;
				}
				var F = Jt(gi({
					datas: n,
					distX: d,
					distY: f
				}), g), I = Jt(mi({
					datas: n,
					distX: d,
					distY: f
				}), g);
				St(I, Qr), St(F, Qr), b || (!S && !C && (I[0] = G(I[0], y), F[0] = G(F[0], y)), !w && !T && (I[1] = G(I[1], y), F[1] = G(F[1], y)));
				var L = K(F, g), R = K(I, g), z = K(R, m), B = K(L, h);
				n.prevDist = R, n.prevBeforeDist = L, n.passDelta = z, n.passDist = R;
				var ee = n.left + L[0], V = n.top + L[1], te = n.right - L[0], H = n.bottom - L[1], ne = pi(n, `translate(${I[0]}px, ${I[1]}px)`, `translate(${R[0]}px, ${R[1]}px)`);
				if (ji(t, ne), e.state.dragInfo.dist = r ? [0, 0] : R, !(!r && !v && z.every(function(e) {
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
						left: ee,
						top: V,
						right: te,
						bottom: H,
						width: W,
						height: re,
						isPinch: a
					}, rc({ transform: ne }, t)));
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
			var i = ac(e, t, {});
			return !n && Q(e, "onDragEnd", i), i;
		}
	},
	dragGroupStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY, a = this.dragStart(e, t);
		if (!a) return !1;
		var o = ra(e, this, "dragStart", [r || 0, i || 0], t, !1, "draggable"), s = o.childEvents, c = o.eventParams;
		n.isDrag = Q(e, "onDragGroupStart", q(q({}, a), {
			targets: e.props.targets,
			events: c
		})) !== !1;
		var l = s[0]?.datas.startValue ?? [0, 0];
		return n.throttleOffset = [l[0] % 1, l[1] % 1], n.isDrag ? a : !1;
	},
	dragGroup: function(e, t) {
		if (t.datas.isDrag) {
			var n = this.drag(e, q(q({}, t), { parentThrottleDrag: e.props.throttleDrag })), r = t.datas.passDelta, i = ra(e, this, "drag", r, t, !1, "draggable").eventParams;
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
			var r = ra(e, this, "dragEnd", [0, 0], t, !1, "draggable").eventParams;
			return Q(e, "onDragGroupEnd", ac(e, t, {
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
function Co(e, t) {
	return {
		fixedPosition: Ci(e, t),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function wo(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3;
	return {
		fixedPosition: Ns(n, [i / 2 * (1 + t[0]), a / 2 * (1 + t[1])], o),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function To(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3, s = Bi(t, i, a);
	return {
		fixedPosition: Ns(n, t, o),
		fixedDirection: s,
		fixedOffset: [i ? 0 : t[0], a ? 0 : t[1]]
	};
}
var Eo = xc("resizable"), Do = {
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
	render: ua("resizable"),
	dragControlCondition: Eo,
	viewClassName: bc("resizable"),
	dragControlStart: function(e, t) {
		var n = t.inputEvent, r = t.isPinch, i = t.isGroup, a = t.parentDirection, o = t.parentGesto, s = t.datas, c = t.parentFixedDirection, l = t.parentEvent, u = Zs(a, r, n, s), d = e.state, f = d.target, p = d.width, m = d.height, h = d.gestos;
		if (!u || !f || h.resizable) return !1;
		h.resizable = o || e.controlGesto, !r && ui(e, t), s.datas = {}, s.direction = u, s.startOffsetWidth = p, s.startOffsetHeight = m, s.prevWidth = 0, s.prevHeight = 0, s.minSize = [0, 0], s.startWidth = d.inlineCSSWidth || d.cssWidth, s.startHeight = d.inlineCSSHeight || d.cssHeight, s.maxSize = [Infinity, Infinity], i || (s.minSize = [d.minOffsetWidth, d.minOffsetHeight], s.maxSize = [d.maxOffsetWidth, d.maxOffsetHeight]);
		var g = e.props.transformOrigin || "% %";
		s.transformOrigin = g && qe(g) ? g.split(" ") : g, s.startOffsetMatrix = d.offsetMatrix, s.startTransformOrigin = d.transformOrigin, s.isWidth = t?.parentIsWidth ?? (!u[0] && !u[1] || u[0] || !u[1]);
		function _(e) {
			s.ratio = e && isFinite(e) ? e : 0;
		}
		s.startPositions = ec(e.state);
		function v(e) {
			var t = Co(s.startPositions, e);
			s.fixedDirection = t.fixedDirection, s.fixedPosition = t.fixedPosition, s.fixedOffset = t.fixedOffset;
		}
		function y(t) {
			var n = To(e.state, t);
			s.fixedDirection = n.fixedDirection, s.fixedPosition = n.fixedPosition, s.fixedOffset = n.fixedOffset;
		}
		function b(e) {
			s.minSize = [ft(`${e[0]}`, 0) || 0, ft(`${e[1]}`, 0) || 0];
		}
		function x(e) {
			var t = [e[0] || Infinity, e[1] || Infinity];
			(!Je(t[0]) || isFinite(t[0])) && (t[0] = ft(`${t[0]}`, 0) || Infinity), (!Je(t[1]) || isFinite(t[1])) && (t[1] = ft(`${t[1]}`, 0) || Infinity), s.maxSize = t;
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
			dragStart: So.dragStart(e, new si().dragStart([0, 0], t))
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
			var E = e.state.is3d, D = r.startOffsetMatrix, O = r.startTransformOrigin, k = E ? 4 : 3, A = pn(Ni(t)), j = Math.sqrt(A.length);
			k !== j && (A = Gt(A, j, k));
			var M = Ti(D, A, O, k);
			r.startPositions = Ps(M, C, w, k), r.nextTargetMatrix = A, r.nextAllMatrix = M;
		}
		var N = Us(e.props, "resizable"), P = N.resizeFormat, F = N.throttleResize, I = F === void 0 ? +!i : F, L = N.parentMoveable, R = N.keepRatioFinally, z = r.direction, B = z, ee = 0, V = 0;
		!z[0] && !z[1] && (B = [1, 1]);
		var te = S && (o ?? N.keepRatio) || !1;
		function H() {
			var e = r.fixedDirection, n = kc(B, te, r, t);
			ee = n.distWidth, V = n.distHeight;
			var i = B[0] - e[0] || te ? Math.max(C + ee, Qr) : C, a = B[1] - e[1] || te ? Math.max(w + V, Qr) : w;
			return te && C && w && (T ? a = i / S : i = a * S), [i, a];
		}
		var ne = J(H(), 2), U = ne[0], W = ne[1];
		f || (r.setFixedDirection(r.fixedDirection), Q(e, "onBeforeResize", Z(e, t, {
			startFixedDirection: r.startFixedDirection,
			startFixedPosition: r.startFixedPosition,
			setFixedDirection: function(e) {
				var t;
				return r.setFixedDirection(e), t = J(H(), 2), U = t[0], W = t[1], [U, W];
			},
			setFixedPosition: function(e) {
				var t;
				return r.setFixedPosition(e), t = J(H(), 2), U = t[0], W = t[1], [U, W];
			},
			boundingWidth: U,
			boundingHeight: W,
			setSize: function(e) {
				var t = J(e, 2);
				U = t[0], W = t[1];
			}
		}, !0)));
		var re = s;
		s || (re = !i && a ? Wi(e, [0, 0]) : r.fixedPosition);
		var ie = [0, 0];
		a || (ie = cs(e, U, W, z, re, !l && u, r)), c && (!c[0] && (ie[0] = 0), !c[1] && (ie[1] = 0));
		function ae() {
			var e;
			P && (e = J(P([U, W]), 2), U = e[0], W = e[1]), U = G(U, I), W = G(W, I);
		}
		if (te) {
			B[0] && B[1] && ie[0] && ie[1] && ($(ie[0]) > $(ie[1]) ? ie[1] = 0 : ie[0] = 0);
			var oe = !ie[0] && !ie[1];
			oe && ae(), B[0] && !B[1] || ie[0] && !ie[1] || oe && T ? (U += ie[0], W = U / S) : (!B[0] && B[1] || !ie[0] && ie[1] || oe && !T) && (W += ie[1], U = W * S);
		} else U += ie[0], W += ie[1], U = Math.max(0, U), W = Math.max(0, W);
		n = J(ht([U, W], b, x, te ? S : !1), 2), U = n[0], W = n[1], ae(), te && (d || R) && (T ? W = U / S : U = W * S), ee = U - C, V = W - w;
		var se = [ee - v, V - y];
		r.prevWidth = ee, r.prevHeight = V;
		var ce = Ui(e, U, W, re, h, r);
		if (!(!L && se.every(function(e) {
			return !e;
		}) && ce.every(function(e) {
			return !e;
		}))) {
			var le = So.drag(e, oi(t, e.state, ce, !!a, !1, "draggable")), ue = le.transform, de = g + ee, fe = _ + V, pe = Z(e, t, q({
				width: de,
				height: fe,
				offsetWidth: Math.round(U),
				offsetHeight: Math.round(W),
				startRatio: S,
				boundingWidth: U,
				boundingHeight: W,
				direction: z,
				dist: [ee, V],
				delta: se,
				isPinch: !!a,
				drag: le
			}, ic({
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
			var i = ac(e, t, {});
			return !r && Q(e, "onResizeEnd", i), i;
		}
	},
	dragGroupControlCondition: Eo,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, q(q({}, t), { isGroup: !0 }));
		if (!r) return !1;
		var i = na(e, "resizable", t), a = n.startOffsetWidth, o = n.startOffsetHeight;
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
		var l = ia(e, this, "dragControlStart", t, function(t, r) {
			return aa(e, t, n, r);
		});
		s(), c();
		var u = function(t) {
			r.setFixedDirection(t), l.forEach(function(r, a) {
				r.setFixedDirection(t), aa(e, r.moveable, n, i[a]);
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
			var r = Us(e.props, "resizable");
			oc(e, "onBeforeResize", function(n) {
				Q(e, "onBeforeResizeGroup", Z(e, t, q(q({}, n), { targets: r.targets }), !0));
			});
			var i = this.dragControl(e, q(q({}, t), { isGroup: !0 }));
			if (i) {
				var a = i.boundingWidth, o = i.boundingHeight, s = i.dist, c = r.keepRatio, l = [a / (a - s[0]), o / (o - s[1])], u = n.fixedPosition, d = ia(e, this, "dragControl", t, function(t, n) {
					var r = J(Zt(on(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * l[0],
						n.datas.originalY * l[1],
						1
					], 3), 2), i = r[0], a = r[1];
					return q(q({}, n), {
						parentDist: null,
						parentScale: l,
						dragClient: Jt(u, [i, a]),
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
			var r = ia(e, this, "dragControlEnd", t);
			return Q(e, "onResizeGroupEnd", ac(e, t, {
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
function Oo(e, t, n, r, i) {
	var a = e.props.groupable, o = e.state, s = o.is3d ? 4 : 3, c = t.origin, l = Ns(e.state.rootMatrix, K([c[0], c[1]], a ? [0, 0] : [o.left, o.top]), s), u = Jt([i.left, i.top], l);
	t.startAbsoluteOrigin = u, t.prevDeg = vt(u, [n, r]) / Math.PI * 180, t.defaultDeg = t.prevDeg, t.prevSnapDeg = 0, t.loop = 0, t.startDist = xt(u, [n, r]);
}
function ko(e, t, n) {
	var r = n.defaultDeg, i = n.prevDeg, a = i % 360, o = Math.floor(i / 360);
	a < 0 && (a += 360), a > e && a > 270 && e < 90 ? ++o : a < e && a < 90 && e > 270 && --o;
	var s = t * (o * 360 + e - r);
	return n.prevDeg = r + s, s;
}
function Ao(e, t, n, r) {
	return ko(vt(r.startAbsoluteOrigin, [e, t]) / Math.PI * 180, n, r);
}
function jo(e, t, n, r, i, a) {
	var o = e.props.throttleRotate, s = o === void 0 ? 0 : o, c = n.prevSnapDeg, l = 0, u = !1;
	if (a) {
		var d = ss(e, t, r, i + r);
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
function Mo(e, t, n) {
	var r = J(t, 4), i = r[0], a = r[1], o = r[2], s = r[3];
	if (e === "none") return [];
	if (Ke(e)) return e.map(function(e) {
		return Mo(e, [
			i,
			a,
			o,
			s
		], n)[0];
	});
	var c = J((e || "top").split("-"), 2), l = c[0], u = c[1], d = [i, a];
	l === "left" ? d = [o, i] : l === "right" ? d = [a, s] : l === "bottom" && (d = [s, o]);
	var f = [(d[0][0] + d[1][0]) / 2, (d[0][1] + d[1][1]) / 2], p = Gs(d, n);
	if (u) {
		var m = u === "top" || u === "left", h = l === "bottom" || l === "left";
		f = d[m && !h || !m && h ? 0 : 1];
	}
	return [[f, p]];
}
function No(e, t) {
	if (t.isRequest) return t.requestAble === "rotatable";
	var n = t.inputEvent.target;
	if (Tt(n, X("rotation-control")) || e.props.rotateAroundControls && Tt(n, X("around-control")) || Tt(n, X("control")) && Tt(n, X("rotatable"))) return !0;
	var r = e.props.rotationTarget;
	return r ? Tc(r, !0).some(function(e) {
		return e ? n === e || n.contains(e) : !1;
	}) : !1;
}
var Po = {
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
		var n = Us(e.props, "rotatable"), r = n.rotatable, i = n.rotationPosition, a = n.zoom, o = n.renderDirections, s = n.rotateAroundControls, c = n.resolveAblesWithRotatable, l = e.getState(), u = l.renderPoses, d = l.direction;
		if (!r) return null;
		var f = Mo(i, u, d), p = [];
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
			var m = dt(c || {}), h = {};
			m.forEach(function(e) {
				c[e].forEach(function(t) {
					h[t] = e;
				});
			});
			var g = [];
			Ke(o) && (g = o.map(function(e) {
				var t = h[e];
				return {
					data: t ? { resolve: t } : {},
					classNames: t ? ["move"] : [],
					dir: e
				};
			})), p.push.apply(p, Y([], J(oa(e, "rotatable", g, t)), !1));
		}
		return s && p.push.apply(p, Y([], J(pa(e, t)), !1)), p;
	},
	dragControlCondition: No,
	dragControlStart: function(e, t) {
		var n, r = t.datas, i = t.clientX, a = t.clientY, o = t.parentRotate, s = t.parentFlag, c = t.isPinch, l = t.isRequest, u = e.state, d = u.target, f = u.left, p = u.top, m = u.direction, h = u.beforeDirection, g = u.targetTransform, _ = u.moveableClientRect, v = u.offsetMatrix, y = u.targetMatrix, b = u.allMatrix, x = u.width, S = u.height;
		if (!l && !d) return !1;
		var C = e.getRect();
		r.rect = C, r.transform = g, r.left = f, r.top = p;
		var w = function(t) {
			var n = To(e.state, t);
			r.fixedDirection = n.fixedDirection, r.fixedOffset = n.fixedOffset, r.fixedPosition = n.fixedPosition, P && P.setFixedPosition(t);
		}, T = function(t) {
			var n = wo(e.state, t);
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
				var A = ni[k.getAttribute("data-direction") || ""];
				if (A) {
					r.isControl = !0, r.isAroundControl = Tt(k, X("around-control")), r.controlDirection = A;
					var j = k.getAttribute("data-resolve");
					j && (r.resolveAble = j), n = J(Ci(Rs(u.rootMatrix, u.renderPoses, _), A), 2), E = n[0], D = n[1];
				}
			}
			r.beforeInfo = { origin: C.beforeOrigin }, r.afterInfo = { origin: C.origin }, r.absoluteInfo = {
				origin: C.origin,
				startValue: C.rotation
			};
			var M = w;
			w = function(t) {
				var n = u.is3d ? 4 : 3, i = J(Jt(Ht(y, n), t), 2), a = i[0], o = i[1], s = Zt(v, Wt([a, o], n)), c = Zt(b, Wt([t[0], t[1]], n));
				M(t);
				var l = u.posDelta;
				r.beforeInfo.origin = K(s, l), r.afterInfo.origin = K(c, l), r.absoluteInfo.origin = K(c, l), Oo(e, r.beforeInfo, E, D, _), Oo(e, r.afterInfo, E, D, _), Oo(e, r.absoluteInfo, E, D, _);
			}, T = function(e) {
				var t = Ci([
					[0, 0],
					[x, 0],
					[0, S],
					[x, S]
				], e);
				w(t);
			};
		}
		r.startClientX = E, r.startClientY = D, r.direction = m, r.beforeDirection = h, r.startValue = 0, r.datas = {}, ki(e, t, "rotate");
		var N = !1, P = !1;
		r.isControl && r.resolveAble && r.resolveAble === "resizable" && (P = Do.dragControlStart(e, q(q({}, new si("resizable").dragStart([0, 0], t)), {
			parentPosition: r.controlPosition,
			parentFixedPosition: r.fixedPosition
		}))), P || (N = So.dragStart(e, new si().dragStart([0, 0], t))), w(Xs(e));
		var F = Z(e, t, q(q({
			set: function(e) {
				r.startValue = e * Math.PI / 180;
			},
			setFixedDirection: T,
			setFixedPosition: w
		}, Oi(e, t)), {
			dragStart: N,
			resizeStart: P
		}));
		return r.isRotate = Q(e, "onRotateStart", F) !== !1, u.snapRenderInfo = { request: t.isRequest }, r.isRotate ? F : !1;
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.clientDistX, s = t.clientDistY, c = t.parentRotate, l = t.parentFlag, u = t.isPinch, d = t.groupDelta, f = t.resolveMatrix, p = a.beforeDirection, m = a.beforeInfo, h = a.afterInfo, g = a.absoluteInfo, _ = a.isRotate, v = a.startValue, y = a.rect, b = a.startClientX, x = a.startClientY;
		if (_) {
			fi(e, t, "rotate");
			var S = p * di(t), C = e.props.parentMoveable, w = 0, T, E, D = 0, O, k, A = 0, j, M, N = 180 / Math.PI * v, P = g.startValue, F = !1, I = b + o, L = x + s;
			if (!l && "parentDist" in t) {
				var R = t.parentDist;
				T = R, O = R, j = R;
			} else u || l ? (T = ko(c, p, m), O = ko(c, S, h), j = ko(c, S, g)) : (T = Ao(I, L, p, m), O = Ao(I, L, S, h), j = Ao(I, L, S, g), F = !0);
			if (E = N + T, k = N + O, M = P + j, Q(e, "onBeforeRotate", Z(e, t, {
				beforeRotation: E,
				rotation: k,
				absoluteRotation: M,
				setRotation: function(e) {
					O = e - N, T = O, j = O;
				}
			}, !0)), n = J(jo(e, y, m, T, N, F), 3), w = n[0], T = n[1], E = n[2], r = J(jo(e, y, h, O, N, F), 3), D = r[0], O = r[1], k = r[2], i = J(jo(e, y, g, j, P, F), 3), A = i[0], j = i[1], M = i[2], !(!A && !D && !w && !C && !f)) {
				var z = pi(a, `rotate(${k}deg)`, `rotate(${O}deg)`);
				f && (a.fixedPosition = Li(e, a.targetAllTransform, a.fixedDirection, a.fixedOffset, a));
				var B = Hi(e, O, a), ee = K(Jt(d || [0, 0], B), a.prevInverseDist || [0, 0]);
				a.prevInverseDist = B, a.requestValue = null;
				var V = Ii(e, z, ee, u, t), te = V, H = xt([I, L], g.startAbsoluteOrigin) - g.startDist, ne = void 0;
				if (a.resolveAble === "resizable") {
					var U = Do.dragControl(e, q(q({}, oi(t, e.state, [t.deltaX, t.deltaY], !!u, !1, "resizable")), {
						resolveMatrix: !0,
						parentDistance: H
					}));
					U && (ne = U, te = ic(te, U, t));
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
				}, V), te));
				return Q(e, "onRotate", W), W;
			}
		}
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (n.isRotate) {
			n.isRotate = !1;
			var r = ac(e, t, {});
			return Q(e, "onRotateEnd", r), r;
		}
	},
	dragGroupControlCondition: No,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = e.state, i = r.left, a = r.top, o = r.beforeOrigin, s = this.dragControlStart(e, t);
		if (!s) return !1;
		s.set(n.beforeDirection * e.rotation);
		var c = ia(e, this, "dragControlStart", t, function(e, t) {
			var n = e.state, r = n.left, s = n.top, c = n.beforeOrigin, l = Jt(K([r, s], [i, a]), K(c, o));
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
			oc(e, "onBeforeRotate", function(n) {
				Q(e, "onBeforeRotateGroup", Z(e, t, q(q({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = n.beforeDirection, a = r.beforeDist, o = a / 180 * Math.PI, s = ia(e, this, "dragControl", t, function(e, t) {
					var n = t.datas.startGroupClient, r = J(t.datas.groupClient, 2), s = r[0], c = r[1], l = J(nn(n, o * i), 2), u = l[0], d = l[1], f = [u - s, d - c];
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
			var r = ia(e, this, "dragControlEnd", t);
			return Q(e, "onRotateGroupEnd", ac(e, t, {
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
function Fo(e, t) {
	var n, r = e.direction, i = e.classNames, a = e.size, o = e.pos, s = e.zoom, c = e.key, l = r === "horizontal", u = l ? "Y" : "X";
	return t.createElement("div", {
		key: c,
		className: i.join(" "),
		style: (n = {}, n[l ? "width" : "height"] = `${a}`, n.transform = `translate(${o[0]}, ${o[1]}) translate${u}(-50%) scale${u}(${s})`, n)
	});
}
function Io(e, t) {
	return Fo(q(q({}, e), {
		classNames: Y([X("line", "guideline", e.direction)], J(e.classNames), !1).filter(function(e) {
			return e;
		}),
		size: e.size || `${e.sizeValue}px`,
		pos: e.pos || e.posValue.map(function(e) {
			return `${G(e, .1)}px`;
		})
	}), t);
}
function Lo(e, t, n, r, i, a, o, s) {
	var c = e.props.zoom;
	return n.map(function(e, n) {
		var l = e.type, u = e.pos, d = [0, 0];
		return d[o] = r, d[+!o] = -i + u, Io({
			key: `${t}TargetGuideline${n}`,
			classNames: [X("target", "bold", l)],
			posValue: d,
			sizeValue: a,
			zoom: c,
			direction: t
		}, s);
	});
}
function Ro(e, t, n, r, i, a) {
	var o = e.props, s = o.zoom, c = o.isDisplayInnerSnapDigit, l = t === "horizontal" ? wa : Ta, u = i[l.start], d = i[l.end];
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
		return Io({
			key: `${t}-default-guideline-${n}`,
			classNames: c ? [X("bold"), l] : [X("normal"), l],
			direction: t,
			posValue: u,
			sizeValue: o,
			zoom: s
		}, a);
	});
}
function zo(e, t, n, r, i, a, o, s) {
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
	}, Io({
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
function Bo(e, t, n, r) {
	var i = e === "vertical" ? 0 : 1, a = +(e === "vertical"), o = i ? wa : Ta, s = n[o.start], c = n[o.end];
	return dc(t, function(e) {
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
function Vo(e, t, n, r, i) {
	var a = e.props.isDisplayInnerSnapDigit, o = [];
	return ["vertical", "horizontal"].forEach(function(s) {
		var c = t.filter(function(e) {
			return e.type === s;
		}), l = +(s === "vertical"), u = +!l, d = Bo(s, c, r, a), f = l ? Ta : wa, p = l ? wa : Ta, m = r[f.start], h = r[f.end];
		d.forEach(function(t) {
			var a = t.total, c = t.start, d = t.end, g = t.inner, _ = n[u] + a[0].pos[u] - r[p.start], v = r;
			c.forEach(function(t) {
				var r = t.elementRect.rect, a = v[f.start] - r[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.start] - m - a, c[u] = _, o.push(zo(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), v = r, d.forEach(function(t) {
				var r = t.elementRect.rect, a = r[f.start] - v[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.end] - m, c[u] = _, o.push(zo(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), g.forEach(function(t) {
				var r = t.elementRect.rect, a = m - r[f.start], c = r[f.end] - h, d = [0, 0], p = [0, 0];
				d[l] = n[l] - a, d[u] = _, p[l] = n[l] + h - m, p[u] = _, o.push(zo(e, s, "dashed", o.length, a, d, t.className, i)), o.push(zo(e, s, "dashed", o.length, c, p, t.className, i));
			});
		});
	}), o;
}
function Ho(e, t, n, r, i) {
	var a = [];
	return ["horizontal", "vertical"].forEach(function(o) {
		var s = t.filter(function(e) {
			return e.type === o;
		}).slice(0, 1), c = o === "vertical" ? 0 : 1, l = +!c, u = c ? Ta : wa, d = c ? wa : Ta, f = r[u.start], p = r[u.end], m = r[d.start], h = r[d.end];
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
				d[l] += _ - m, a.push(zo(e, c ? "vertical" : "horizontal", "gap", a.length, r, d, s, i));
			});
		});
	}), a;
}
function Uo(e) {
	var t = e.state, n = t.containerClientRect, r = t.hasFixed, i = n.overflow, a = n.scrollHeight, o = n.scrollWidth, s = n.clientHeight, c = n.clientWidth, l = n.clientLeft, u = n.clientTop, d = e.props, f = d.snapGap, p = f === void 0 || f, m = d.verticalGuidelines, h = d.horizontalGuidelines, g = d.snapThreshold, _ = g === void 0 ? 5 : g, v = d.maxSnapElementGuidelineDistance, y = v === void 0 ? Infinity : v, b = d.isDisplayGridGuidelines, x = Fs(ec(e.state)), S = x.top, C = x.left, w = x.bottom, T = x.right, E = {
		top: S,
		left: C,
		bottom: w,
		right: T,
		center: (C + T) / 2,
		middle: (S + w) / 2
	}, D = Y([], J(Jo(e)), !1), O = (t.snapThresholdInfo?.multiples ?? [1, 1]).map(function(e) {
		return e * _;
	});
	p && D.push.apply(D, Y([], J(Wo(e, E, O)), !1));
	var k = q({}, t.snapOffset || {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	});
	if (D.push.apply(D, Y([], J(Ko(e, i ? o : c, i ? a : s, l, u, k, b)), !1)), r) {
		var A = n.left, j = n.top;
		k.left += A, k.top += j, k.right += A, k.bottom += j;
	}
	return D.push.apply(D, Y([], J(Xo(h || !1, m || !1, i ? o : c, i ? a : s, l, u, k)), !1)), D = D.filter(function(e) {
		var t = e.element, n = e.elementRect, r = e.type;
		if (!t || !n) return !0;
		var i = n.rect;
		return qo(E, i, r, y);
	}), D;
}
function Wo(e, t, n) {
	var r = e.props, i = r.maxSnapElementGuidelineDistance, a = i === void 0 ? Infinity : i, o = r.maxSnapElementGapDistance, s = o === void 0 ? Infinity : o, c = e.state.elementRects, l = [];
	return [[
		"vertical",
		wa,
		Ta
	], [
		"horizontal",
		Ta,
		wa
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
			x && qo(t, m, i, a) && (x > s || l.push({
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
function Go(e, t, n, r) {
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
				var f = m[l], p = m[s], g = wt(h.map(function(e) {
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
				var x = (-e + 1) / 2, S = Ue(p - d, p - d + f, x, 1 - x);
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
function Ko(e, t, n, r, i, a, o) {
	r === void 0 && (r = 0), i === void 0 && (i = 0);
	var s = e.props, c = e.state, l = s.snapGridWidth, u = l === void 0 ? 0 : l, d = s.snapGridHeight, f = d === void 0 ? 0 : d, p = [], m = a.left, h = a.top, g = [0, 0];
	Go(e, r, i, a);
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
function qo(e, t, n, r) {
	return n === "horizontal" ? $(e.right - t.left) <= r || $(e.left - t.right) <= r || e.left <= t.right && t.left <= e.right : n !== "vertical" || $(e.bottom - t.top) <= r || $(e.top - t.bottom) <= r || e.top <= t.bottom && t.top <= e.bottom;
}
function Jo(e) {
	var t = e.state, n = e.props.elementGuidelines, r = n === void 0 ? [] : n;
	if (!r.length) return t.elementRects = [], [];
	var i = (t.elementRects || []).filter(function(e) {
		return !e.refresh;
	}), a = r.map(function(e) {
		return Ge(e) && "element" in e ? q(q({}, e), { element: wc(e.element, !0) }) : { element: wc(e, !0) };
	}).filter(function(e) {
		return e.element;
	}), o = kn(i.map(function(e) {
		return e.element;
	}), a.map(function(e) {
		return e.element;
	})), s = o.maintained, c = o.added, l = [];
	s.forEach(function(e) {
		var t = J(e, 2), n = t[0], r = t[1];
		l[r] = i[n];
	}), Zo(e, c.map(function(e) {
		return a[e];
	})).map(function(e, t) {
		l[c[t]] = e;
	}), t.elementRects = l;
	var u = Oa(e.props.elementSnapDirections), d = [];
	return l.forEach(function(e) {
		var t = e.element, n = e.top, r = n === void 0 ? u.top : n, i = e.left, a = i === void 0 ? u.left : i, o = e.right, s = o === void 0 ? u.right : o, c = e.bottom, l = c === void 0 ? u.bottom : c, f = e.center, p = f === void 0 ? u.center : f, m = e.middle, h = m === void 0 ? u.middle : m, g = e.className, _ = e.rect, v = Aa({
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
				elementDirection: Ca[S[r]] || S[r],
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
				elementDirection: Ca[x[r]] || x[r],
				direction: ""
			});
		});
	}), d;
}
function Yo(e, t) {
	return e ? e.map(function(e) {
		var n = Ge(e) ? e : { pos: e }, r = n.pos;
		return Je(r) ? n : q(q({}, n), { pos: ft(r, t) });
	}) : [];
}
function Xo(e, t, n, r, i, a, o) {
	i === void 0 && (i = 0), a === void 0 && (a = 0), o === void 0 && (o = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	});
	var s = [], c = o.left, l = o.top, u = o.bottom, d = n + o.right - c, f = r + u - l;
	return Yo(e, f).forEach(function(e) {
		s.push({
			type: "horizontal",
			pos: [c, G(e.pos - a + l, .1)],
			size: d,
			className: e.className,
			direction: ""
		});
	}), Yo(t, d).forEach(function(e) {
		s.push({
			type: "vertical",
			pos: [G(e.pos - i + c, .1), l],
			size: f,
			className: e.className,
			direction: ""
		});
	}), s;
}
function Zo(e, t) {
	if (!t.length) return [];
	var n = e.props.groupable, r = e.state, i = r.containerClientRect, a = r.rootMatrix, o = r.is3d, s = r.offsetDelta, c = o ? 4 : 3, l = J(ja(a, i, c), 2), u = l[0], d = l[1], f = n ? 0 : s[0], p = n ? 0 : s[1];
	return t.map(function(e) {
		var t = e.element.getBoundingClientRect(), n = t.left - u - f, r = t.top - d - p, i = r + t.height, o = n + t.width, s = J(hc(a, [n, r], c), 2), l = s[0], m = s[1], h = J(hc(a, [o, i], c), 2), g = h[0], _ = h[1];
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
function Qo(e) {
	var t = e.state, n = t.container, r = e.props.snapContainer || n;
	if (t.snapContainer === r && t.guidelines && t.guidelines.length) return !1;
	var i = t.containerClientRect, a = {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	};
	if (n !== r) {
		var o = wc(r, !0);
		if (o) {
			var s = Ys(o), c = Dc(t, [s.left - i.left, s.top - i.top]), l = Dc(t, [s.right - i.right, s.bottom - i.bottom]);
			a.left = G(c[0], 1e-5), a.top = G(c[1], 1e-5), a.right = G(l[0], 1e-5), a.bottom = G(l[1], 1e-5);
		}
	}
	return t.snapContainer = r, t.snapOffset = a, t.guidelines = Uo(e), t.enableSnap = !0, !0;
}
function $o(e, t, n, r, i, a) {
	var o = Ps(e, t, n, a ? 4 : 3);
	return $s(o, K(i, Ci(o, r)));
}
function es(e) {
	return e ? e / $(e) : 0;
}
function ts(e, t, n, r, i, a) {
	var o = a.fixedDirection, s = qa(n, o, r), c = ro(e, t, n, r), l = Y(Y([], J(vo(e, t, s, r, i, a)), !1), J(eo(e, c, a)), !1), u = Ka(l, 0), d = Ka(l, 1);
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
function ns(e, t, n, r, i, a, o, s, c) {
	var l = Ci(t, o), u = ho(e, s, {
		vertical: [l[0]],
		horizontal: [l[1]]
	}), d = u.horizontal.offset, f = u.vertical.offset;
	if (G(f, Zr) || G(d, Zr)) {
		var p = J(_i({
			datas: c,
			distX: -f,
			distY: -d
		}), 2), m = p[0], h = p[1], g = Math.min(i || Infinity, n + o[0] * m), _ = Math.min(a || Infinity, r + o[1] * h);
		return [g - n, _ - r];
	}
	return [0, 0];
}
function rs(e, t, n, r, i, a, o, s) {
	for (var c = ec(e.state), l = e.props.keepRatio, u = 0, d = 0, f = 0; f < 2; ++f) {
		var p = ts(e, t(u, d), i, l, o, s), m = p.width, h = p.height, g = m.isBound, _ = h.isBound, v = m.offset, y = h.offset;
		if (f === 1 && (g || (v = 0), _ || (y = 0)), f === 0 && o && !g && !_) return [0, 0];
		if (l) {
			var b = $(v) * (n ? 1 / n : 1), x = $(y) * (r ? 1 / r : 1);
			(g && _ ? b < x : _ || !g && b < x) ? v = n * y / r : y = r * v / n;
		}
		u += v, d += y;
	}
	if (!l && i[0] && i[1]) {
		var S = xo(e, c, i, a, s), C = S.maxWidth, w = S.maxHeight, T = J(ns(e, t(u, d).map(function(e) {
			return e.map(function(e) {
				return G(e, Zr);
			});
		}), n + u, r + d, C, w, i, o, s), 2), v = T[0], y = T[1];
		u += v, d += y;
	}
	return [u, d];
}
function is(e) {
	return e < 0 && (e = e % 360 + 360), e %= 360, e;
}
function as(e, t) {
	t = is(t);
	var n = Math.floor(e / 360), r = n * 360 + 360 - t, i = n * 360 + t;
	return $(e - r) < $(e - i) ? r : i;
}
function os(e, t) {
	e = is(e), t = is(t);
	var n = is(e - t);
	return Math.min(n, 360 - n);
}
function ss(e, t, n, r) {
	var i = e.props, a = i[Na] ?? 5, o = i[Pa];
	if (Da(e, "rotatable")) {
		var s = t.pos1, c = t.pos2, l = t.pos3, u = t.pos4, d = t.origin, f = n * Math.PI / 180, p = [
			s,
			c,
			l,
			u
		].map(function(e) {
			return K(e, d);
		}), m = p.map(function(e) {
			return nn(e, f);
		}), h = Y(Y([], J(ba(e, p, m, d, n)), !1), J(so(e, p, m, d, n)), !1);
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
			return os(e, r) - os(t, r);
		})[0];
		if (os(_, r) <= a) return {
			isSnap: !0,
			dist: n + as(r, _) - r
		};
	}
	return {
		isSnap: !1,
		dist: n
	};
}
function cs(e, t, n, r, i, a, o) {
	if (!Da(e, "resizable")) return [0, 0];
	var s = o.fixedDirection, c = o.nextAllMatrix, l = e.state, u = l.allMatrix, d = l.is3d;
	return rs(e, function(e, r) {
		return $o(c || u, t + e, n + r, s, i, d);
	}, t, n, r, i, a, o);
}
function ls(e, t, n, r, i) {
	if (!Da(e, "scalable")) return [0, 0];
	var a = i.startOffsetWidth, o = i.startOffsetHeight, s = i.fixedPosition, c = i.fixedDirection, l = i.is3d, u = rs(e, function(e, n) {
		return $o(Di(i, Jt(t, [e / a, n / o])), a, o, c, s, l);
	}, a, o, n, s, r, i);
	return [u[0] / a, u[1] / o];
}
function us(e, t) {
	t.absolutePoses = ec(e.state);
}
function ds(e) {
	var t = [];
	return e.forEach(function(e) {
		e.guidelineInfos.forEach(function(n) {
			var r = n.guideline;
			ct(t, function(e) {
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
function fs(e, t, n, r, i, a) {
	var o = ma(ha(e, a), t, n), s = o.vertical, c = o.horizontal, l = Ea();
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
	var u = co(e), d = u.boundMap, f = u.vertical, p = u.horizontal;
	return f.forEach(function(e) {
		st(r, function(t) {
			var n = t.type, r = t.pos;
			return n === "bounds" && r === e;
		}) >= 0 || r.push({
			type: "bounds",
			pos: e
		});
	}), p.forEach(function(e) {
		st(i, function(t) {
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
var ps = xc("", ["resizable", "scalable"]), ms = {
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
		Na,
		Pa,
		Fa,
		Ia,
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
		if (!l || !l.render || !Da(e, "")) return Pc(e, "boundMap", Ea(), function(e) {
			return JSON.stringify(e);
		}), Pc(e, "innerBoundMap", Ea(), function(e) {
			return JSON.stringify(e);
		}), [];
		n.guidelines = Uo(e);
		var f = Math.min(a[0], o[0], s[0], c[0]), p = Math.min(a[1], o[1], s[1], c[1]), m = l.externalPoses || [], h = ec(e.state), g = [], _ = [], v = [], y = [], b = [], x = Fs(h), S = x.width, C = x.height, w = x.top, T = x.left, E = x.bottom, D = x.right, O = {
			left: T,
			right: D,
			top: w,
			bottom: E,
			center: (T + D) / 2,
			middle: (w + E) / 2
		}, k = m.length > 0, A = k ? Fs(m) : {};
		if (!l.request) {
			if (l.direction && b.push(Wa(e, h, l.direction, d, d)), l.snap) {
				var j = Fs(h);
				l.center && (j.middle = (j.top + j.bottom) / 2, j.center = (j.left + j.right) / 2), b.push(Va(e, j, d, d));
			}
			k && (l.center && (A.middle = (A.top + A.bottom) / 2, A.center = (A.left + A.right) / 2), b.push(Va(e, A, d, d))), b.forEach(function(e) {
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
				})), !1)), v.push.apply(v, Y([], J(ds(t)), !1)), y.push.apply(y, Y([], J(ds(n)), !1));
			});
		}
		var M = fs(e, [T, D], [w, E], g, _), N = M.boundMap, P = M.innerBoundMap;
		k && fs(e, [A.left, A.right], [A.top, A.bottom], g, _, l.externalBounds);
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
		var R = Pc(e, "boundMap", N, function(e) {
			return JSON.stringify(e);
		}, Ea()), z = Pc(e, "innerBoundMap", P, function(e) {
			return JSON.stringify(e);
		}, Ea());
		return (N === R || P === z) && Q(e, "onBound", {
			bounds: N,
			innerBounds: P
		}, !0), Y(Y(Y(Y(Y(Y([], J(Vo(e, I, [f, p], O, t)), !1), J(Ho(e, L, [f, p], O, t)), !1), J(Ro(e, "horizontal", y, [i, r], O, t)), !1), J(Ro(e, "vertical", v, [i, r], O, t)), !1), J(Lo(e, "horizontal", _, f, r, S, 0, t)), !1), J(Lo(e, "vertical", g, p, i, C, 1, t)), !1);
	},
	dragStart: function(e, t) {
		e.state.snapRenderInfo = {
			request: t.isRequest,
			snap: !0,
			center: !0
		}, Qo(e);
	},
	drag: function(e) {
		var t = e.state;
		Qo(e) || (t.guidelines = Uo(e)), t.snapRenderInfo && (t.snapRenderInfo.render = !0);
	},
	pinchStart: function(e) {
		this.unset(e);
	},
	dragEnd: function(e) {
		this.unset(e);
	},
	dragControlCondition: function(e, t) {
		if (ps(e, t) || No(e, t)) return !0;
		if (!t.isRequest && t.inputEvent) return Tt(t.inputEvent.target, X("snap-control"));
	},
	dragControlStart: function(e) {
		e.state.snapRenderInfo = null, Qo(e);
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
		e.state.snapRenderInfo = null, Qo(e);
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
function hs(e, t) {
	return [e[0] * t[0], e[1] * t[1]];
}
function X() {
	var e = [...arguments];
	return Oe.apply(void 0, Y([Jr], J(e), !1));
}
function gs(e) {
	e();
}
function _s(e) {
	return !e || e === "none" ? [
		1,
		0,
		0,
		1,
		0,
		0
	] : Ge(e) ? e : pn(e);
}
function vs(e, t, n) {
	return Kt(t, ln(n, t), e, ln(n.map(function(e) {
		return -e;
	}), t));
}
function ys(e, t, n) {
	return t === "%" ? As(e.ownerSVGElement)[n ? "width" : "height"] / 100 : 1;
}
function bs(e) {
	return Ss(sc(e, ":before")).map(function(t, n) {
		var r = it(t), i = r.value, a = r.unit;
		return i * ys(e, a, n === 0);
	});
}
function xs(e) {
	return e ? e.split(" ") : ["0", "0"];
}
function Ss(e) {
	return xs(e.transformOrigin);
}
function Cs(e) {
	var t = ta(e)("transform");
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
function ws(e, t, n, r, i) {
	var a = jt(e) || Mt(e), o = !1, s, c;
	if (!e || n) s = e;
	else {
		var l = e?.assignedSlot?.parentElement, u = e.parentElement;
		l ? (o = !0, c = u, s = l) : s = u;
	}
	for (var d = !1, f = e === t || s === t, p = "relative", m = 1, h = parseFloat(i?.("zoom")) || 1, g = i?.("position"); s && s !== a;) {
		t === s && (f = !0);
		var _ = ta(s), v = s.tagName.toLowerCase(), y = Cs(s), b = _("willChange"), x = parseFloat(_("zoom")) || 1;
		if (p = _("position"), r && x !== 1) {
			m = x;
			break;
		}
		if (!n && r && h !== 1 && g && g !== "absolute" || v === "svg" || v === "foreignobject" || p !== "static" || y && y !== "none" || b === "transform") break;
		var S = e?.assignedSlot?.parentNode, C = s.parentNode;
		S && (o = !0, c = C);
		var w = C;
		if (w && w.nodeType === 11) {
			s = w.host, d = !0, p = ta(s)("position");
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
function Ts(e, t) {
	var n, r = e.tagName.toLowerCase(), i = e.offsetLeft, a = e.offsetTop, o = ta(e), s = We(i), c = !s, l, u;
	return !c && (r !== "svg" || e.ownerSVGElement) ? (l = zr ? bs(e) : xs(o("transformOrigin")).map(function(e) {
		return parseFloat(e);
	}), u = l.slice(), c = !0, r === "svg" ? (i = 0, a = 0) : (n = J(Ms(e, l, e === t && t.tagName.toLowerCase() === "g"), 4), i = n[0], a = n[1], l[0] = n[2], l[1] = n[3])) : (l = xs(o("transformOrigin")).map(function(e) {
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
function Es(e, t) {
	var n = ta(e), r = ta(Mt(e)), i = r("position");
	if (!t && (!i || i === "static")) return [0, 0];
	var a = parseInt(r("marginLeft"), 10), o = parseInt(r("marginTop"), 10);
	return n("position") === "absolute" && ((n("top") !== "auto" || n("bottom") !== "auto") && (o = 0), (n("left") !== "auto" || n("right") !== "auto") && (a = 0)), [a, o];
}
function Ds(e) {
	e.forEach(function(e) {
		var t = e.matrix;
		t && (e.matrix = Gt(t, 3, 4));
	});
}
function Os(e) {
	for (var t = e.parentElement, n = !1, r = Mt(e); t;) {
		var i = sc(t).transform;
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
function ks(e, t) {
	return t === void 0 && (t = e.length > 9), `${t ? "matrix3d" : "matrix"}(${Xt(e, !t).join(",")})`;
}
function As(e) {
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
function js(e, t) {
	var n, r = As(e), i = r.width, a = r.height, o = r.clientWidth, s = r.clientHeight, c = o / i, l = s / a, u = e.preserveAspectRatio.baseVal, d = u.align, f = u.meetOrSlice, p = [0, 0], m = [c, l], h = [0, 0];
	if (d !== 1) {
		var g = (d - 2) % 3, _ = Math.floor((d - 2) / 3);
		p[0] = i * g / 2, p[1] = a * _ / 2;
		var v = f === 2 ? Math.max(l, c) : Math.min(c, l);
		m[0] = v, m[1] = v, h[0] = (o - i) / 2 * g, h[1] = (s - a) / 2 * _;
	}
	var y = cn(m, t);
	return n = J(h, 2), y[t * (t - 1)] = n[0], y[t * (t - 1) + 1] = n[1], vs(y, t, p);
}
function Ms(e, t, n) {
	var r = e.tagName.toLowerCase();
	if (!e.getBBox || !n && r === "g") return [
		0,
		0,
		0,
		0
	];
	var i = ta(e)("transform-box") === "fill-box", a = e.getBBox(), o = As(e.ownerSVGElement), s = a.x, c = a.y;
	r === "foreignobject" && !s && !c && (s = parseFloat(e.getAttribute("x")) || 0, c = parseFloat(e.getAttribute("y")) || 0);
	var l = s - o.x, u = c - o.y;
	return [
		l,
		u,
		i ? t[0] : t[0] - l,
		i ? t[1] : t[1] - u
	];
}
function Ns(e, t, n) {
	return Zt(e, Wt(t, n), n);
}
function Ps(e, t, n, r) {
	return [
		[0, 0],
		[t, 0],
		[0, n],
		[t, n]
	].map(function(t) {
		return Ns(e, t, r);
	});
}
function Fs(e) {
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
function Is(e, t, n, r) {
	return Fs(Ps(e, t, n, r));
}
function Ls(e, t, n, r, i) {
	var a, o = e.target, s = e.origin, c = t.matrix, l = Ws(o), u = l.offsetWidth, d = l.offsetHeight, f = n.getBoundingClientRect(), p = [0, 0];
	n === Mt(n) && (p = Es(o, !0));
	for (var m = o.getBoundingClientRect(), h = m.left - f.left + n.scrollLeft - (n.clientLeft || 0) + p[0], g = m.top - f.top + n.scrollTop - (n.clientTop || 0) + p[1], _ = m.width, v = m.height, y = Kt(r, i, c), b = Is(y, u, d, r), x = b.left, S = b.top, C = b.width, w = b.height, T = Ns(y, s, r), E = K(T, [x, S]), D = [h + E[0] * _ / C, g + E[1] * v / w], O = [0, 0], k = 0; ++k < 10;) {
		var A = Bt(i, r);
		a = J(K(Ns(A, D, r), Ns(A, T, r)), 2), O[0] = a[0], O[1] = a[1];
		var j = Is(Kt(r, i, ln(O, r), c), u, d, r), M = j.left, N = j.top, P = M - h, F = N - g;
		if ($(P) < 2 && $(F) < 2) break;
		D[0] -= P, D[1] -= F;
	}
	return O.map(function(e) {
		return Math.round(e);
	});
}
function Rs(e, t, n) {
	var r = e.length === 16 ? 4 : 3, i = t.map(function(t) {
		return Ns(e, t, r);
	}), a = n.left, o = n.top;
	return i.map(function(e) {
		return [e[0] + a, e[1] + o];
	});
}
function zs(e) {
	return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Bs(e, t) {
	return zs([t[0] - e[0], t[1] - e[1]]);
}
function Vs(e, t, n, r) {
	n === void 0 && (n = 1), r === void 0 && (r = vt(e, t));
	var i = Bs(e, t);
	return {
		transform: `translateY(-50%) translate(${e[0]}px, ${e[1]}px) rotate(${r}rad) scaleY(${n})`,
		width: `${i}px`
	};
}
function Hs(e, t) {
	var n = [...arguments].slice(2), r = n.length;
	return { transform: `translateZ(0px) translate(${n.reduce(function(e, t) {
		return e + t[0];
	}, 0) / r}px, ${n.reduce(function(e, t) {
		return e + t[1];
	}, 0) / r}px) rotate(${e}rad) scale(${t})` };
}
function Us(e, t) {
	var n = e[t];
	return Ge(n) ? q(q({}, e), n) : e;
}
function Ws(e) {
	var t = e && !We(e.offsetWidth), n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = Infinity, h = Infinity, g = Infinity, _ = Infinity, v = 0, y = 0, b = !1;
	if (e) {
		if (!t && e.ownerSVGElement) {
			var x = e.getBBox();
			b = !0, n = x.width, r = x.height, o = n, s = r, c = n, l = r, i = n, a = r;
		} else {
			var S = ta(e), C = e.style, w = S("boxSizing") === "border-box", T = parseFloat(S("borderLeftWidth")) || 0, E = parseFloat(S("borderRightWidth")) || 0, D = parseFloat(S("borderTopWidth")) || 0, O = parseFloat(S("borderBottomWidth")) || 0, k = parseFloat(S("paddingLeft")) || 0, A = parseFloat(S("paddingRight")) || 0, j = parseFloat(S("paddingTop")) || 0, M = parseFloat(S("paddingBottom")) || 0, N = k + A, P = j + M, F = T + E, I = D + O, L = N + F, R = P + I, z = S("position"), B = 0, ee = 0;
			if ("clientLeft" in e) {
				var V = null;
				if (V = z === "absolute" ? ws(e, Mt(e)).offsetParent : e.parentElement, V) {
					var te = ta(V);
					B = parseFloat(te("width")), ee = parseFloat(te("height"));
				}
			}
			u = Math.max(N, ft(S("minWidth"), B) || 0), d = Math.max(P, ft(S("minHeight"), ee) || 0), m = ft(S("maxWidth"), B), h = ft(S("maxHeight"), ee), isNaN(m) && (m = Infinity), isNaN(h) && (h = Infinity), v = ft(C.width, 0) || 0, y = ft(C.height, 0) || 0, o = parseFloat(S("width")) || 0, s = parseFloat(S("height")) || 0, c = $(o - v) < 1 ? pt(u, v || o, m) : o, l = $(s - y) < 1 ? pt(d, y || s, h) : s, n = c, r = l, i = c, a = l, w ? (g = m, _ = h, f = u, p = d, c = n - L, l = r - R) : (g = m + L, _ = h + R, f = u + L, p = d + R, n = c + L, r = l + R), i = c + N, a = l + P;
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
function Gs(e, t) {
	return vt(t > 0 ? e[0] : e[1], t > 0 ? e[1] : e[0]);
}
function Ks() {
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
function qs(e, t) {
	var n = e === Mt(e) || e === jt(e), r = {
		clientLeft: e.clientLeft,
		clientTop: e.clientTop,
		clientWidth: e.clientWidth,
		clientHeight: e.clientHeight,
		scrollWidth: e.scrollWidth,
		scrollHeight: e.scrollHeight,
		overflow: !1
	};
	return n && (r.clientHeight = Math.max(t.height, r.clientHeight), r.scrollHeight = Math.max(t.height, r.scrollHeight)), r.overflow = ta(e)("overflow") !== "visible", q(q({}, t), r);
}
function Js(e, t, n, r) {
	var i = e.left, a = e.right, o = e.top, s = e.bottom, c = t.top, l = t.left, u = {
		left: l + i,
		top: c + o,
		right: l + a,
		bottom: c + s,
		width: a - i,
		height: s - o
	};
	return n && r ? qs(n, u) : u;
}
function Ys(e, t) {
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
	return e && t ? qs(e, s) : s;
}
function Xs(e) {
	var t = e.props, n = t.groupable, r = t.svgOrigin, i = e.getState(), a = i.offsetWidth, o = i.offsetHeight, s = i.svg, c = i.transformOrigin;
	return !n && s && r ? jc(r, a, o) : c;
}
function Zs(e, t, n, r) {
	var i;
	if (e) i = e;
	else if (t) i = [0, 0];
	else {
		var a = n.target;
		i = Qs(a, r);
	}
	return i;
}
function Qs(e, t) {
	if (e) {
		var n = e.getAttribute("data-rotation") || "", r = e.getAttribute("data-direction");
		if (t.deg = n, r) {
			var i = [0, 0];
			return r.indexOf("w") > -1 && (i[0] = -1), r.indexOf("e") > -1 && (i[0] = 1), r.indexOf("n") > -1 && (i[1] = -1), r.indexOf("s") > -1 && (i[1] = 1), i;
		}
	}
}
function $s(e, t) {
	return [
		Jt(t, e[0]),
		Jt(t, e[1]),
		Jt(t, e[2]),
		Jt(t, e[3])
	];
}
function ec(e) {
	var t = e.left, n = e.top, r = e.pos1, i = e.pos2, a = e.pos3, o = e.pos4;
	return $s([
		r,
		i,
		a,
		o
	], [t, n]);
}
function tc(e, t) {
	e[t ? "controlAbles" : "targetAbles"].forEach(function(t) {
		t.unset && t.unset(e);
	});
}
function nc(e, t) {
	var n = t ? "controlGesto" : "targetGesto", r = e[n];
	r?.isIdle() === !1 && tc(e, t), r?.unset(), e[n] = null;
}
function rc(e, t) {
	if (t) {
		var n = Mi(t);
		n.nextStyle = q(q({}, n.nextStyle), e);
	}
	return {
		style: e,
		cssText: dt(e).map(function(t) {
			return `${at(t, "-")}: ${e[t]};`;
		}).join("")
	};
}
function ic(e, t, n) {
	var r = t.afterTransform || t.transform;
	return q(q({}, rc(q(q(q({}, e.style), t.style), { transform: r }), n)), {
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
function ac(e, t, n) {
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
function oc(e, t, n) {
	e._emitter.on(t, n);
}
function Q(e, t, n, r, i) {
	return e.triggerEvent(t, n, r, i);
}
function sc(e, t) {
	return Nt(e).getComputedStyle(e, t);
}
function cc(e, t, n) {
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
function lc(e, t) {
	return e === t || e == null && t == null;
}
function uc() {
	for (var e = [...arguments], t = e.length - 1, n = 0; n < t; ++n) {
		var r = e[n];
		if (!We(r)) return r;
	}
	return e[t];
}
function dc(e, t) {
	var n = [], r = [];
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r.indexOf(o), c = n[s] || [];
		s === -1 && (r.push(o), n.push(c)), c.push(i);
	}), n;
}
function fc(e, t) {
	var n = [], r = {};
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r[o];
		s || (s = [], r[o] = s, n.push(s)), s.push(i);
	}), n;
}
function pc(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function mc() {
	var e = [...arguments];
	return e.sort(function(e, t) {
		return $(t) - $(e);
	}), e[0];
}
function hc(e, t, n) {
	return Zt(Bt(e, n), Wt(t, n), n);
}
function gc(e, t) {
	var n, r = e.is3d, i = e.rootMatrix, a = r ? 4 : 3;
	return n = J(hc(i, [t.distX, t.distY], a), 2), t.distX = n[0], t.distY = n[1], t;
}
function _c(e, t, n, r) {
	if (!n[0] && !n[1]) return t;
	var i = Ns(e, [es(n[0] || 1), 0], r), a = Ns(e, [0, es(n[1] || 1)], r);
	return Jt(t, Ns(e, [n[0] / zs(i), n[1] / zs(a)], r));
}
function vc(e, t, n) {
	return n ? `${e / t * 100}%` : `${e}px`;
}
function yc(e) {
	return $(e) <= Qr ? 0 : e;
}
function bc(e) {
	return function(t) {
		if (!t.isDragging(e)) return "";
		var n = Gi(t, e).deg;
		return n ? X(`view-control-rotation${n}`) : "";
	};
}
function xc(e, t) {
	return t === void 0 && (t = [e]), function(n, r) {
		if (r.isRequest) return t.some(function(e) {
			return r.requestAble === e;
		}) ? r.parentDirection : !1;
		var i = r.inputEvent.target;
		return Tt(i, X("direction")) && (!e || Tt(i, X(e)));
	};
}
function Sc(e, t, n) {
	var r = gn(e, {
		"x%": function(e) {
			return e / 100 * t.offsetWidth;
		},
		"y%": function(e) {
			return e / 100 * t.offsetHeight;
		}
	}), i = e.slice(0, n < 0 ? void 0 : n), a = e.slice(0, n < 0 ? void 0 : n + 1), o = e[n] || "", s = n < 0 ? [] : e.slice(n), c = n < 0 ? [] : e.slice(n + 1), l = r.slice(0, n < 0 ? void 0 : n), u = r.slice(0, n < 0 ? void 0 : n + 1), d = r[n] ?? gn([""])[0], f = n < 0 ? [] : r.slice(n), p = n < 0 ? [] : r.slice(n + 1), m = d ? [d] : [], h = hn(l), g = hn(u), _ = hn(f), v = hn(p), y = qt(h, _, 4);
	return {
		transforms: e,
		beforeFunctionMatrix: h,
		beforeFunctionMatrix2: g,
		targetFunctionMatrix: hn(m),
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
function Cc(e) {
	return !e || !Ge(e) || Ft(e) ? !1 : Ke(e) || "length" in e;
}
function wc(e, t) {
	return e ? Ft(e) ? e : qe(e) ? t ? document.querySelector(e) : e : Ye(e) ? e() : Pt(e) ? e : "current" in e ? e.current : e : null;
}
function Tc(e, t) {
	return e ? (Cc(e) ? [].slice.call(e) : [e]).reduce(function(e, n) {
		return qe(n) && t ? Y(Y([], J(e), !1), J([].slice.call(document.querySelectorAll(n))), !1) : (Ke(n) ? e.push(Tc(n, t)) : e.push(wc(n, t)), e);
	}, []) : [];
}
function Ec(e, t, n) {
	var r = vt(e, t) / Math.PI * 180;
	return r = n >= 0 ? r : 180 - r, r = r >= 0 ? r : 360 + r, r;
}
function Dc(e, t) {
	var n = e.rootMatrix, r = e.is3d, i = Bt(n, r ? 4 : 3);
	return r || (i = Gt(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, mn(i, t);
}
function Oc(e, t, n, r, i) {
	var a = J(e, 2), o = a[0], s = a[1], c = 0, l = 0;
	if (i && o && s) {
		var u = vt([0, 0], t), d = vt([0, 0], r), f = zs(t), p = Math.cos(u - d) * f;
		if (!r[0]) l = p, c = l * n;
		else if (!r[1]) c = p, l = c / n;
		else {
			var m = r[0] * o, h = r[1] * s, g = Math.atan2(m + t[0], h + t[1]), _ = Math.atan2(m, h);
			g < 0 && (g += Math.PI * 2), _ < 0 && (_ += Math.PI * 2);
			var v = 0;
			$(g - _) < Math.PI / 2 || $(g - _) > Math.PI / 2 * 3 || (_ += Math.PI), v = g - _, v > Math.PI * 2 ? v -= Math.PI * 2 : v > Math.PI ? v = 2 * Math.PI - v : v < -Math.PI && (v = -2 * Math.PI - v);
			var y = zs([m + t[0], h + t[1]]) * Math.cos(v);
			c = y * Math.sin(_) - m, l = y * Math.cos(_) - h, r[0] < 0 && (c *= -1), r[1] < 0 && (l *= -1);
		}
	} else c = r[0] * t[0], l = r[1] * t[1];
	return [c, l];
}
function kc(e, t, n, r) {
	var i, a = n.ratio, o = n.startOffsetWidth, s = n.startOffsetHeight, c = 0, l = 0, u = r.distX, d = r.distY, f = r.pinchScale, p = r.parentDistance, m = r.parentDist, h = r.parentScale, g = n.fixedDirection, _ = [0, 1].map(function(t) {
		return $(e[t] - g[t]);
	}), v = [0, 1].map(function(e) {
		var t = _[e];
		return t !== 0 && (t = 2 / t), t;
	});
	if (m) c = m[0], l = m[1], t && (c ? l ||= c / a : c = l * a);
	else if (Je(f)) c = (f - 1) * o, l = (f - 1) * s;
	else if (h) c = (h[0] - 1) * o, l = (h[1] - 1) * s;
	else if (p) {
		var y = o * _[0], b = s * _[1], x = zs([y, b]);
		c = p / x * y * v[0], l = p / x * b * v[1];
	} else {
		var S = _i({
			datas: n,
			distX: u,
			distY: d
		});
		S = v.map(function(e, t) {
			return S[t] * e;
		}), i = J(Oc([o, s], S, a, e, t), 2), c = i[0], l = i[1];
	}
	return {
		distWidth: c,
		distHeight: l
	};
}
function Ac(e, t) {
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
		var n = J(e.split(" "), 2), r = n[0], i = n[1], a = Ac(r || ""), o = Ac(i || ""), s = q(q({}, a), o), c = {
			x: "50%",
			y: "50%"
		};
		return s.x && (c.x = s.x), s.y && (c.y = s.y), s.value && (s.x && !s.y && (c.y = s.value), !s.x && s.y && (c.x = s.value)), c;
	}
	return e === "left" ? { x: "0%" } : e === "right" ? { x: "100%" } : e === "top" ? { y: "0%" } : e === "bottom" ? { y: "100%" } : e ? e === "center" ? { value: "50%" } : { value: e } : {};
}
function jc(e, t, n) {
	var r = Ac(e, !0), i = r.x, a = r.y;
	return [ft(i, t) || 0, ft(a, n) || 0];
}
function Mc(e, t, n) {
	var r = e.map(function(e) {
		return K(e, t);
	}), i = r.map(function(e) {
		return nn(e, n);
	});
	return {
		prev: r,
		next: i,
		result: i.map(function(e) {
			return Jt(e, t);
		})
	};
}
function Nc(e, t) {
	return e.length === t.length && e.every(function(e, n) {
		var r = t[n], i = Ke(e), a = Ke(r);
		return i && a ? Nc(e, r) : !i && !a && e === r;
	});
}
function Pc(e, t, n, r, i) {
	var a = e._store, o = a[t];
	if (!(t in a)) {
		if (i != null) a[t] = i, o = i;
		else return a[t] = n, n;
	}
	return o === n || r(o) === r(n) ? o : (a[t] = n, n);
}
function Fc(e) {
	return e >= 0 ? 1 : -1;
}
function $(e) {
	return Math.abs(e);
}
function Ic(e, t) {
	return Ct(e).map(function(e) {
		return t(e);
	});
}
function Lc(e) {
	return Je(e) ? {
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
var Rc = Mr("pinchable", {
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
			var s = `onPinch${a ? "Group" : ""}End`, c = ac(e, t, { isDrag: r });
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
}), zc = xc("scalable"), Bc = {
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
	render: ua("scalable"),
	dragControlCondition: zc,
	viewClassName: bc("scalable"),
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.inputEvent, a = t.parentDirection, o = Zs(a, r, i, n), s = e.state, c = s.width, l = s.height, u = s.targetTransform, d = s.target, f = s.pos1, p = s.pos2, m = s.pos4;
		if (!o || !d) return !1;
		r || ui(e, t), n.datas = {}, n.transform = u, n.prevDist = [1, 1], n.direction = o, n.startOffsetWidth = c, n.startOffsetHeight = l, n.startValue = [1, 1];
		var h = !o[0] && !o[1] || o[0] || !o[1];
		ki(e, t, "scale"), n.isWidth = h;
		function g(e) {
			n.ratio = e && isFinite(e) ? e : 0;
		}
		n.startPositions = ec(e.state);
		function _(e) {
			var t = Co(n.startPositions, e);
			n.fixedDirection = t.fixedDirection, n.fixedPosition = t.fixedPosition, n.fixedOffset = t.fixedOffset;
		}
		n.setFixedDirection = _, g(xt(f, p) / xt(p, m)), _([-o[0], -o[1]]);
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
		}, Oi(e, t)), { dragStart: So.dragStart(e, new si().dragStart([0, 0], t)) })), x = Q(e, "onScaleStart", b);
		return n.startFixedDirection = n.fixedDirection, x !== !1 && (n.isScale = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}), n.isScale ? b : !1;
	},
	dragControl: function(e, t) {
		fi(e, t, "scale");
		var n = t.datas, r = t.parentKeepRatio, i = t.parentFlag, a = t.isPinch, o = t.dragClient, s = t.isRequest, c = t.useSnap, l = t.resolveMatrix, u = n.prevDist, d = n.direction, f = n.startOffsetWidth, p = n.startOffsetHeight, m = n.isScale, h = n.startValue, g = n.isWidth, _ = n.ratio;
		if (!m) return !1;
		var v = e.props, y = v.throttleScale, b = v.parentMoveable, x = d;
		!d[0] && !d[1] && (x = [1, 1]);
		var S = _ && (r ?? v.keepRatio) || !1, C = e.state, w = [h[0], h[1]];
		function T() {
			var e = kc(x, S, n, t), r = e.distWidth, i = e.distHeight, a = f ? (f + r) / f : 1, o = p ? (p + i) / p : 1;
			h[0] || (w[0] = r / f), h[1] || (w[1] = i / p);
			var s = (x[0] || S ? a : 1) * w[0], c = (x[1] || S ? o : 1) * w[1];
			return s === 0 && (s = Fc(u[0]) * $r), c === 0 && (c = Fc(u[1]) * $r), [s, c];
		}
		var E = T();
		if (!a && e.props.groupable) {
			var D = (C.snapRenderInfo || {}).direction;
			Ke(D) && (D[0] || D[1]) && (C.snapRenderInfo = {
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
		var O = [E[0] / w[0], E[1] / w[1]], k = o, A = [0, 0], j = Fc(O[0] * O[1]), M = !o && !i && a;
		if (M || l ? k = Li(e, n.targetAllTransform, [0, 0], [0, 0], n) : o || (k = n.fixedPosition), a || (A = ls(e, O, d, !c && s, n)), S) {
			x[0] && x[1] && A[0] && A[1] && (Math.abs(A[0] * f) > Math.abs(A[1] * p) ? A[1] = 0 : A[0] = 0);
			var N = !A[0] && !A[1];
			if (N && (g ? O[0] = G(O[0] * w[0], y) / w[0] : O[1] = G(O[1] * w[1], y) / w[1]), x[0] && !x[1] || A[0] && !A[1] || N && g) {
				O[0] += A[0];
				var P = f * O[0] * w[0] / _;
				O[1] = Fc(j * O[0]) * $(P / p / w[1]);
			} else if (!x[0] && x[1] || !A[0] && A[1] || N && !g) {
				O[1] += A[1];
				var F = p * O[1] * w[1] * _;
				O[0] = Fc(j * O[1]) * $(F / f / w[0]);
			}
		} else O[0] += A[0], O[1] += A[1], A[0] || (O[0] = G(O[0] * w[0], y) / w[0]), A[1] || (O[1] = G(O[1] * w[1], y) / w[1]);
		O[0] === 0 && (O[0] = Fc(u[0]) * $r), O[1] === 0 && (O[1] = Fc(u[1]) * $r), E = hs(O, [w[0], w[1]]);
		var I = [f, p], L = [f * E[0], p * E[1]];
		L = ht(L, n.minScaleSize, n.maxScaleSize, S ? _ : !1), E = Ic(2, function(e) {
			return I[e] ? L[e] / I[e] : L[e];
		}), O = Ic(2, function(e) {
			return E[e] / w[e];
		});
		var R = Ic(2, function(e) {
			return u[e] ? O[e] / u[e] : O[e];
		}), z = `scale(${O.join(", ")})`, B = `scale(${E.join(", ")})`, ee = pi(n, B, z), V = !h[0] || !h[1], te = zi(e, V ? B : z, n.fixedDirection, k, n.fixedOffset, n, V), H = M ? te : K(te, n.prevInverseDist || [0, 0]);
		if (n.prevDist = O, n.prevInverseDist = te, E[0] === u[0] && E[1] === u[1] && H.every(function(e) {
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
		}, Ii(e, ee, H, a, t)));
		return Q(e, "onScale", ne), ne;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (!n.isScale) return !1;
		n.isScale = !1;
		var r = ac(e, t, {});
		return Q(e, "onScaleEnd", r), r;
	},
	dragGroupControlCondition: zc,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, t);
		if (!r) return !1;
		var i = na(e, "resizable", t);
		n.moveableScale = e.scale;
		var a = ia(e, this, "dragControlStart", t, function(t, r) {
			return aa(e, t, n, r);
		}), o = function(t) {
			r.setFixedDirection(t), a.forEach(function(r, a) {
				r.setFixedDirection(t), aa(e, r.moveable, n, i[a]);
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
			oc(e, "onBeforeScale", function(n) {
				Q(e, "onBeforeScaleGroup", Z(e, t, q(q({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = r.dist, a = n.moveableScale;
				e.scale = [i[0] * a[0], i[1] * a[1]];
				var o = e.props.keepRatio, s = n.fixedPosition, c = ia(e, this, "dragControl", t, function(t, n) {
					var r = J(Zt(on(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * i[0],
						n.datas.originalY * i[1],
						1
					], 3), 2), a = r[0], c = r[1];
					return q(q({}, n), {
						parentDist: null,
						parentScale: i,
						parentKeepRatio: o,
						dragClient: Jt(s, [a, c])
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
			var r = ia(e, this, "dragControlEnd", t);
			return Q(e, "onScaleGroupEnd", ac(e, t, {
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
function Vc(e, t) {
	return e.map(function(e, n) {
		return Ue(e, t[n], 1, 2);
	});
}
function Hc(e, t, n) {
	var r = vt(e, t), i = vt(e, n) - r;
	return i >= 0 ? i : i + 2 * Math.PI;
}
function Uc(e, t) {
	var n = Hc(e[0], e[1], e[2]), r = Hc(t[0], t[1], t[2]), i = Math.PI;
	return !(n >= i && r <= i || n <= i && r >= i);
}
var Wc = {
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
	viewClassName: bc("warpable"),
	render: function(e, t) {
		var n = e.props, r = n.resizable, i = n.scalable, a = n.warpable, o = n.zoom;
		if (r || i || !a) return [];
		var s = e.state, c = s.pos1, l = s.pos2, u = s.pos3, d = s.pos4, f = Vc(c, l), p = Vc(l, c), m = Vc(c, u), h = Vc(u, c), g = Vc(u, d), _ = Vc(d, u), v = Vc(l, d), y = Vc(d, l);
		return Y([
			t.createElement("div", {
				className: X("line"),
				key: "middeLine1",
				style: Vs(f, g, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine2",
				style: Vs(p, _, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine3",
				style: Vs(m, v, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine4",
				style: Vs(h, y, o)
			})
		], J(da(e, "warpable", t)), !1);
	},
	dragControlCondition: function(e, t) {
		if (t.isRequest) return !1;
		var n = t.inputEvent.target;
		return Tt(n, X("direction")) && Tt(n, X("warpable"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.inputEvent, i = e.props.target, a = r.target, o = Qs(a, n);
		if (!o || !i) return !1;
		var s = e.state, c = s.transformOrigin, l = s.is3d, u = s.targetTransform, d = s.targetMatrix, f = s.width, p = s.height, m = s.left, h = s.top;
		return n.datas = {}, n.targetTransform = u, n.warpTargetMatrix = l ? d : Gt(d, 3, 4), n.targetInverseMatrix = zt(Bt(n.warpTargetMatrix, 4), 3, 4), n.direction = o, n.left = m, n.top = h, n.poses = [
			[0, 0],
			[f, 0],
			[0, p],
			[f, p]
		].map(function(e) {
			return K(e, c);
		}), n.nextPoses = n.poses.map(function(e) {
			var t = J(e, 2), r = t[0], i = t[1];
			return Zt(n.warpTargetMatrix, [
				r,
				i,
				0,
				1
			], 4);
		}), n.startValue = sn(4), n.prevMatrix = sn(4), n.absolutePoses = ec(s), n.posIndexes = bi(o), ui(e, t), ki(e, t, "matrix3d"), s.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}, Q(e, "onWarpStart", Z(e, t, q({ set: function(e) {
			n.startValue = e;
		} }, Oi(e, t)))) !== !1 && (n.isWarp = !0), n.isWarp;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isRequest, i = t.distX, a = t.distY, o = n.targetInverseMatrix, s = n.prevMatrix, c = n.isWarp, l = n.startValue, u = n.poses, d = n.posIndexes, f = n.absolutePoses;
		if (!c) return !1;
		if (fi(e, t, "matrix3d"), Da(e, "warpable")) {
			var p = d.map(function(e) {
				return f[e];
			});
			p.length > 1 && p.push([(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]);
			var m = ho(e, r, {
				horizontal: p.map(function(e) {
					return e[1] + a;
				}),
				vertical: p.map(function(e) {
					return e[0] + i;
				})
			}), h = m.horizontal, g = m.vertical;
			a -= h.offset, i -= g.offset;
		}
		var _ = _i({
			datas: n,
			distX: i,
			distY: a
		}, !0), v = n.nextPoses.slice();
		if (d.forEach(function(e) {
			v[e] = Jt(v[e], _);
		}), !Xr.every(function(e) {
			return Uc(e.map(function(e) {
				return u[e];
			}), e.map(function(e) {
				return v[e];
			}));
		})) return !1;
		var y = un(u[0], u[2], u[1], u[3], v[0], v[2], v[1], v[3]);
		if (!y.length) return !1;
		var b = hi(n, qt(o, y, 4), !0), x = qt(Bt(s, 4), b, 4);
		n.prevMatrix = b;
		var S = qt(l, b, 4), C = pi(n, `matrix3d(${S.join(", ")})`, `matrix3d(${b.join(", ")})`);
		return ji(t, C), Q(e, "onWarp", Z(e, t, q({
			delta: x,
			matrix: S,
			dist: b,
			multiply: qt,
			transform: C
		}, rc({ transform: C }, t)))), !0;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.isDrag;
		return n.isWarp ? (n.isWarp = !1, Q(e, "onWarpEnd", ac(e, t, {})), r) : !1;
	}
}, Gc = /*#__PURE__*/ X("area-pieces"), Kc = /*#__PURE__*/ X("area-piece"), qc = /*#__PURE__*/ X("avoid"), Jc = X("view-dragging");
function Yc(e) {
	var t = e.areaElement;
	if (t) {
		var n = e.state, r = n.width, i = n.height;
		Dt(t, qc), t.style.cssText += `left: 0px; top: 0px; width: ${r}px; height: ${i}px`;
	}
}
function Xc(e) {
	return e.createElement("div", {
		key: "area_pieces",
		className: Gc
	}, e.createElement("div", { className: Kc }), e.createElement("div", { className: Kc }), e.createElement("div", { className: Kc }), e.createElement("div", { className: Kc }));
}
var Zc = {
	name: "dragArea",
	props: ["dragArea", "passDragArea"],
	events: ["click", "clickGroup"],
	render: function(e, t) {
		var n = e.props, r = n.target, i = n.dragArea, a = n.groupable, o = n.passDragArea, s = e.getState(), c = s.width, l = s.height, u = s.renderPoses, d = o ? X("area", "pass") : X("area");
		if (a) return [t.createElement("div", {
			key: "area",
			ref: Ae(e, "areaElement"),
			className: d
		}), Xc(t)];
		if (!r || !i) return [];
		var f = un([0, 0], [c, 0], [0, l], [c, l], u[0], u[1], u[2], u[3]), p = f.length ? ks(f, !0) : "none";
		return [t.createElement("div", {
			key: "area",
			ref: Ae(e, "areaElement"),
			className: d,
			style: {
				top: "0px",
				left: "0px",
				width: `${c}px`,
				height: `${l}px`,
				transformOrigin: "0 0",
				transform: p
			}
		}), Xc(t)];
	},
	dragStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY;
		if (!t.inputEvent) return !1;
		n.isDragArea = !1;
		var a = e.areaElement, o = e.state, s = o.moveableClientRect, c = o.renderPoses, l = o.rootMatrix, u = o.is3d, d = s.left, f = s.top, p = Fs(c), m = p.left, h = p.top, g = p.width, _ = p.height, v = u ? 4 : 3, y = J(hc(l, [r - d, i - f], v), 2), b = y[0], x = y[1];
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
		}), Et(a, qc), o.disableNativeEvent = !0;
	},
	drag: function(e, t) {
		var n = t.datas, r = t.inputEvent;
		if (this.enableNativeEvent(e), !r) return !1;
		n.isDragArea || (n.isDragArea = !0, Yc(e));
	},
	dragEnd: function(e, t) {
		this.enableNativeEvent(e);
		var n = t.inputEvent, r = t.datas;
		if (!n) return !1;
		r.isDragArea || Yc(e);
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
		Yc(e), e.state.disableNativeEvent = !1;
	},
	enableNativeEvent: function(e) {
		var t = e.state;
		t.disableNativeEvent && lt(function() {
			t.disableNativeEvent = !1;
		});
	}
}, Qc = Mr("origin", {
	props: ["origin", "svgOrigin"],
	render: function(e, t) {
		var n = e.props, r = n.zoom, i = n.svgOrigin, a = n.groupable, o = e.getState(), s = o.beforeOrigin, c = o.rotation, l = o.svg, u = o.allMatrix, d = o.is3d, f = o.left, p = o.top, m = o.offsetWidth, h = o.offsetHeight, g;
		if (!a && l && i) {
			var _ = J(jc(i, m, h), 2), v = _[0], y = _[1];
			g = Hs(c, r, K(Ns(u, [v, y], d ? 4 : 3), [f, p]));
		} else g = Hs(c, r, s);
		return [t.createElement("div", {
			className: X("control", "origin"),
			style: g,
			key: "beforeOrigin"
		})];
	}
});
function $c(e) {
	var t = e.scrollContainer;
	return [t.scrollLeft, t.scrollTop];
}
var el = {
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
		var n = e.props, r = n.scrollContainer, i = r === void 0 ? e.getContainer() : r, a = n.scrollOptions, o = new zn(), s = wc(i, !0);
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
			var r = e.props, i = r.scrollContainer, a = i === void 0 ? e.getContainer() : i, o = r.scrollThreshold, s = o === void 0 ? 0 : o, c = r.scrollThrottleTime, l = c === void 0 ? 0 : c, u = r.getScrollPosition, d = u === void 0 ? $c : u, f = r.scrollOptions;
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
}, tl = {
	name: "",
	props: /* @__PURE__ */ "target.dragTargetSelf.dragTarget.dragContainer.container.warpSelf.rootContainer.useResizeObserver.useMutationObserver.zoom.dragFocusedInput.transformOrigin.ables.className.pinchThreshold.pinchOutside.triggerAblesSimultaneously.checkInput.cspNonce.translateZ.hideDefaultLines.props.flushSync.stopPropagation.preventClickEventOnDrag.preventClickDefault.viewContainer.persistData.useAccuratePosition.firstRenderState.linePadding.controlPadding.preventDefault.preventRightClick.preventWheelClick.requestStyles".split("."),
	events: ["changeTargets"]
}, nl = Mr("padding", {
	props: ["padding"],
	render: function(e, t) {
		var n = e.props;
		if (n.dragArea) return [];
		var r = Lc(n.padding || {}), i = r.left, a = r.top, o = r.right, s = r.bottom, c = e.getState(), l = c.renderPoses, u = [
			c.pos1,
			c.pos2,
			c.pos3,
			c.pos4
		], d = [];
		return i > 0 && d.push([0, 2]), a > 0 && d.push([0, 1]), o > 0 && d.push([1, 3]), s > 0 && d.push([2, 3]), d.map(function(e, n) {
			var r = J(e, 2), i = r[0], a = r[1], o = u[i], s = u[a], c = l[i], d = l[a], f = un([0, 0], [100, 0], [0, 100], [100, 100], o, s, c, d);
			if (f.length) return t.createElement("div", {
				key: `padding${n}`,
				className: X("padding"),
				style: { transform: ks(f, !0) }
			});
		});
	}
}), rl = [
	"nw",
	"ne",
	"se",
	"sw"
];
function il(e, t) {
	var n = e[0] + e[1], r = n > t ? t / n : 1;
	return e[0] *= r, e[1] = t - e[1] * r, e;
}
var al = [
	1,
	2,
	5,
	6
], ol = [
	0,
	3,
	4,
	7
], sl = [
	1,
	-1,
	-1,
	1
], cl = [
	1,
	1,
	-1,
	-1
];
function ll(e, t, n, r, i, a, o, s) {
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
				return c.push(vc(p, r, t)), p;
			}
			var p = Math.max(0, u === 1 ? f[0] - i : o - f[0]);
			return c.push(vc(p, n, t)), p;
		})
	};
}
function ul(e) {
	for (var t = [0, 0], n = [0, 0], r = e.length, i = 0; i < r; ++i) {
		var a = e[i];
		a.sub && (a.horizontal && (t[1] === 0 && (t[0] = i), t[1] = i - t[0] + 1, n[0] = i + 1), a.vertical && (n[1] === 0 && (n[0] = i), n[1] = i - n[0] + 1));
	}
	return {
		horizontalRange: t,
		verticalRange: n
	};
}
function dl(e, t, n, r, i, a, o) {
	var s, c, l, u;
	a === void 0 && (a = [0, 0]), o === void 0 && (o = !1);
	var d = e.indexOf("/"), f = (d > -1 ? e.slice(0, d) : e).length, p = e.slice(0, f), m = e.slice(f + 1), h = p.length, g = m.length, _ = g > 0, v = J(p, 4), y = v[0], b = y === void 0 ? "0px" : y, x = v[1], S = x === void 0 ? b : x, C = v[2], w = C === void 0 ? b : C, T = v[3], E = T === void 0 ? S : T, D = J(m, 4), O = D[0], k = O === void 0 ? b : O, A = D[1], j = A === void 0 ? _ ? k : S : A, M = D[2], N = M === void 0 ? _ ? k : w : M, P = D[3], F = P === void 0 ? _ ? j : E : P, I = [
		b,
		S,
		w,
		E
	].map(function(e) {
		return ft(e, t);
	}), L = [
		k,
		j,
		N,
		F
	].map(function(e) {
		return ft(e, n);
	}), R = I.slice(), z = L.slice();
	s = J(il([R[0], R[1]], t), 2), R[0] = s[0], R[1] = s[1], c = J(il([R[3], R[2]], t), 2), R[3] = c[0], R[2] = c[1], l = J(il([z[0], z[3]], n), 2), z[0] = l[0], z[3] = l[1], u = J(il([z[1], z[2]], n), 2), z[1] = u[0], z[2] = u[1];
	var B = o ? R : R.slice(0, Math.max(a[0], h)), ee = o ? z : z.slice(0, Math.max(a[1], g));
	return Y(Y([], J(B.map(function(e, t) {
		var a = rl[t];
		return {
			virtual: t >= h,
			horizontal: sl[t],
			vertical: 0,
			pos: [r + e, i + (cl[t] === -1 ? n : 0)],
			sub: !0,
			raw: I[t],
			direction: a
		};
	})), !1), J(ee.map(function(e, n) {
		var a = rl[n];
		return {
			virtual: n >= g,
			horizontal: 0,
			vertical: cl[n],
			pos: [r + (sl[n] === -1 ? t : 0), i + e],
			sub: !0,
			raw: L[n],
			direction: a
		};
	})), !1);
}
function fl(e, t, n, r, i) {
	i === void 0 && (i = t.length);
	var a = ul(e.slice(r)), o = a.horizontalRange, s = a.verticalRange, c = n - r, l = 0;
	if (c === 0) l = i;
	else if (c > 0 && c < o[1]) l = o[1] - c;
	else if (c >= s[0]) l = s[0] + s[1] - c;
	else return;
	e.splice(n, l), t.splice(n, l);
}
function pl(e, t, n, r, i, a, o, s, c, l, u) {
	l === void 0 && (l = 0), u === void 0 && (u = 0);
	var d = ul(e.slice(n)), f = d.horizontalRange, p = d.verticalRange;
	if (r > -1) for (var m = sl[r] === 1 ? a - l : s - a, h = f[1]; h <= r; ++h) {
		var g = cl[h] === 1 ? u : c, _ = 0;
		if (r === h ? _ = a : h === 0 ? _ = l + m : sl[h] === -1 && (_ = s - (t[n][0] - l)), e.splice(n + h, 0, {
			horizontal: sl[h],
			vertical: 0,
			pos: [_, g]
		}), t.splice(n + h, 0, [_, g]), h === 0) break;
	}
	else if (i > -1) {
		var v = cl[i] === 1 ? o - u : c - o;
		if (f[1] === 0 && p[1] === 0) {
			var y = [l + v, u];
			e.push({
				horizontal: sl[0],
				vertical: 0,
				pos: y
			}), t.push(y);
		}
		for (var b = p[0], h = p[1]; h <= i; ++h) {
			var _ = sl[h] === 1 ? l : s, g = 0;
			if (i === h ? g = o : h === 0 ? g = u + v : cl[h] === 1 ? g = t[n + b][1] : cl[h] === -1 && (g = c - (t[n + b][1] - u)), e.push({
				horizontal: 0,
				vertical: cl[h],
				pos: [_, g]
			}), t.push([_, g]), h === 0) break;
		}
	}
}
function ml(e, t) {
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
var hl = [[
	0,
	-1,
	"n"
], [
	1,
	0,
	"e"
]], gl = [
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
function _l(e, t, n) {
	var r = e.props.clipRelative, i = e.state, a = i.width, o = i.height, s = t, c = s.type, l = s.poses, u = c === "rect", d = c === "circle";
	if (c === "polygon") return n.map(function(e) {
		return `${vc(e[0], a, r)} ${vc(e[1], o, r)}`;
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
			return vc(e, t % 2 ? a : o, r);
		});
		if (n.length > 8) {
			var _ = J(K(n[4], n[0]), 2), v = _[0], y = _[1];
			g.push.apply(g, Y(["round"], J(ll(l.slice(8).map(function(e, t) {
				return q(q({}, e), { pos: n[t] });
			}), r, v, y, m, f, p, h).styles), !1));
		}
		return g;
	}
	if (d || c === "ellipse") {
		var b = n[0], x = vc($(n[1][1] - b[1]), d ? Math.sqrt((a * a + o * o) / 2) : o, r), g = d ? [x] : [vc($(n[2][0] - b[0]), a, r), x];
		return g.push("at", vc(b[0], a, r), vc(b[1], o, r)), g;
	}
}
function vl(e, t, n, r) {
	var i = [
		r,
		(r + t) / 2,
		t
	], a = [
		e,
		(e + n) / 2,
		n
	];
	return gl.map(function(e) {
		var t = J(e, 3), n = t[0], r = t[1], o = t[2], s = i[n + 1], c = a[r + 1];
		return {
			vertical: $(r),
			horizontal: $(n),
			direction: o,
			pos: [s, c]
		};
	});
}
function yl(e) {
	var t = [Infinity, -Infinity], n = [Infinity, -Infinity];
	return e.forEach(function(e) {
		var r = e.pos;
		t[0] = Math.min(t[0], r[0]), t[1] = Math.max(t[1], r[0]), n[0] = Math.min(n[0], r[1]), n[1] = Math.max(n[1], r[1]);
	}), [$(t[1] - t[0]), $(n[1] - n[0])];
}
function bl(e, t, n, r, i) {
	var a, o, s, c, l, u, d, f, p;
	if (e) {
		var m = i;
		if (!m) {
			var h = ta(e), g = h("clipPath");
			m = g === "none" ? h("clip") : g;
		}
		if (!((!m || m === "none" || m === "auto") && (m = r, !m))) {
			var _ = rt(m), v = _.prefix, y = v === void 0 ? m : v, b = _.value, x = b === void 0 ? "" : b, S = y === "circle", C = " ";
			if (y === "polygon") {
				var w = nt(x || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
				C = ",";
				var T = w.map(function(e) {
					var r = J(e.split(" "), 2), i = r[0], a = r[1];
					return {
						vertical: 1,
						horizontal: 1,
						pos: [ft(i, t), ft(a, n)]
					};
				}), E = Kn(T.map(function(e) {
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
				var D = "", O = "", k = 0, A = 0, w = tt(x);
				if (S) {
					var j = "";
					a = J(w, 4), o = a[0], j = o === void 0 ? "50%" : o, s = a[2], D = s === void 0 ? "50%" : s, c = a[3], O = c === void 0 ? "50%" : c, k = ft(j, Math.sqrt((t * t + n * n) / 2)), A = k;
				} else {
					var M = "", N = "";
					l = J(w, 5), u = l[0], M = u === void 0 ? "50%" : u, d = l[1], N = d === void 0 ? "50%" : d, f = l[3], D = f === void 0 ? "50%" : f, p = l[4], O = p === void 0 ? "50%" : p, k = ft(M, t), A = ft(N, n);
				}
				var P = [ft(D, t), ft(O, n)], T = Y([{
					vertical: 1,
					horizontal: 1,
					pos: P,
					direction: "nesw"
				}], J(hl.slice(0, S ? 1 : 2).map(function(e) {
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
				var w = tt(x || "0 0 0 0"), F = w.indexOf("round"), I = (F > -1 ? w.slice(0, F) : w).length, L = w.slice(I + 1), R = J(w.slice(0, I), 4), z = R[0], B = R[1], ee = B === void 0 ? z : B, V = R[2], te = V === void 0 ? z : V, H = R[3], ne = H === void 0 ? ee : H, U = J([z, te].map(function(e) {
					return ft(e, n);
				}), 2), W = U[0], re = U[1], ie = J([ne, ee].map(function(e) {
					return ft(e, t);
				}), 2), ae = ie[0], oe = ie[1], se = t - oe, ce = n - re, le = dl(L, se - ae, ce - W, ae, W), T = Y(Y([], J(vl(W, se, ce, ae)), !1), J(le), !1);
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
				var w = nt(x || `0px, ${t}px, ${n}px, 0px`);
				C = ",";
				var ue = J(w.map(function(e) {
					return it(e).value;
				}), 4), de = ue[0], oe = ue[1], re = ue[2], ae = ue[3], T = vl(de, oe, re, ae);
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
function xl(e, t, n, r, i) {
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
		var m = J(yl(e), 2), h = m[0], g = m[1], _ = h && g ? h / g : 0;
		if (_ && i) {
			var v = e[(t + 4) % 8].pos, y = [0, 0];
			o.indexOf("w") > -1 ? y[0] = -1 : o.indexOf("e") > -1 && (y[0] = 1), o.indexOf("n") > -1 ? y[1] = -1 : o.indexOf("s") > -1 && (y[1] = 1);
			var b = Oc([h, g], n, _, y, !0), x = h + b[0], S = g + b[1], C = v[1], w = v[1], T = v[0], E = v[0];
			y[0] === -1 ? T = E - x : y[0] === 1 ? E = T + x : (T -= x / 2, E += x / 2), y[1] === -1 ? C = w - S : (y[1] === 1 || (C = w - S / 2), w = C + S);
			var D = vl(C, E, w, T);
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
function Sl(e, t) {
	var n = J(li(e, t), 2), r = n[0], i = n[1], a = t.datas, o = a.clipPath, s = a.clipIndex, c = o, l = c.type, u = c.poses, d = c.splitter, f = u.map(function(e) {
		return e.pos;
	});
	if (l === "polygon") f.splice(s, 0, [r, i]);
	else if (l === "inset") {
		var p = al.indexOf(s), m = ol.indexOf(s), h = u.length;
		if (pl(u, f, 8, p, m, r, i, f[4][0], f[4][1], f[0][0], f[0][1]), h === u.length) return;
	} else return;
	var g = _l(e, o, f), _ = `${l}(${g.join(d)})`;
	Q(e, "onClip", Z(e, t, q({
		clipEventType: "added",
		clipType: l,
		poses: f,
		clipStyles: g,
		clipStyle: _,
		distX: 0,
		distY: 0
	}, rc({ clipPath: _ }, t))));
}
function Cl(e, t) {
	var n = t.datas, r = n.clipPath, i = n.clipIndex, a = r, o = a.type, s = a.poses, c = a.splitter, l = s.map(function(e) {
		return e.pos;
	}), u = l.length;
	if (o === "polygon") s.splice(i, 1), l.splice(i, 1);
	else if (o === "inset") {
		if (i < 8 || (fl(s, l, i, 8, u), u === s.length)) return;
	} else return;
	var d = _l(e, r, l), f = `${o}(${d.join(c)})`;
	Q(e, "onClip", Z(e, t, q({
		clipEventType: "removed",
		clipType: o,
		poses: l,
		clipStyles: d,
		clipStyle: f,
		distX: 0,
		distY: 0
	}, rc({ clipPath: f }, t))));
}
var wl = {
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
		var C = bl(l, u, d, i || "inset", b || r);
		if (!C) return [];
		var w = p ? 4 : 3, T = C.type, E = C.poses.map(function(e) {
			var t = Ns(f, e.pos, w);
			return [t[0] - m, t[1] - h];
		}), D = [], O = [], k = T === "rect", A = T === "inset", j = T === "polygon";
		if (k || A || j) {
			var M = A ? E.slice(0, 8) : E;
			O = M.map(function(e, n) {
				var r = n === 0 ? M[M.length - 1] : M[n - 1], i = vt(r, e), a = Bs(r, e);
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
			var N = C.left, P = C.top, F = C.radiusX, I = C.radiusY, L = J(K(Ns(f, [N, P], w), Ns(f, [0, 0], w)), 2), R = L[0], z = L[1], B = "none";
			if (!a) {
				for (var ee = Math.max(10, F / 5, I / 5), V = [], te = 0; te <= ee; ++te) {
					var H = Math.PI * 2 / ee * te;
					V.push([F + (F - o) * Math.cos(H), I + (I - o) * Math.sin(H)]);
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
					transform: `translate(${-m + R}px, ${-h + z}px) ${ks(f)}`
				}
			}));
		}
		if (a) {
			var ne = Fs(Y([
				g,
				_,
				v,
				y
			], J(E), !1)), U = ne.width, W = ne.height, re = ne.left, ie = ne.top;
			if (j || k || A) {
				var V = A ? E.slice(0, 8) : E;
				D.push(t.createElement("div", {
					key: "clipArea",
					className: X("clip-area", "snap-control"),
					style: {
						width: `${U}px`,
						height: `${W}px`,
						transform: `translate(${re}px, ${ie}px)`,
						clipPath: `polygon(${V.map(function(e) {
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
				return ca(t, "", K(Ns(f, r ? [0, a] : [a, 0], w), [m, h]), K(Ns(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}snap${i}`, "guideline");
			})), !1)), n.isBound && O.push.apply(O, Y([], J(n.bounds.map(function(n, i) {
				var a = n.pos;
				return ca(t, "", K(Ns(f, r ? [0, a] : [a, 0], w), [m, h]), K(Ns(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}bounds${i}`, "guideline", "bounds", "bold");
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
		var n = e.state, r = e.props, i = r.defaultClipPath, a = r.customClipPath, o = n.target, s = n.width, c = n.height, l = t.inputEvent ? t.inputEvent.target : null, u = l && l.getAttribute("class") || "", d = t.datas, f = bl(o, s, c, i || "inset", a);
		if (!f) return !1;
		var p = f.clipText, m = f.type, h = f.poses;
		return Q(e, "onClipStart", Z(e, t, {
			clipType: m,
			clipStyle: p,
			poses: h.map(function(e) {
				return e.pos;
			})
		})) === !1 ? (d.isClipStart = !1, !1) : (d.isControl = u && u.indexOf("clip-control") > -1, d.isLine = u.indexOf("clip-line") > -1, d.isArea = u.indexOf("clip-area") > -1 || u.indexOf("clip-ellipse") > -1, d.clipIndex = l ? parseInt(l.getAttribute("data-clip-index"), 10) : -1, d.clipPath = f, d.isClipStart = !0, n.clipPathState = p, ui(e, t), !0);
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.originalDatas, s = t.isDragTarget;
		if (!a.isClipStart) return !1;
		var c = a, l = c.isControl, u = c.isLine, d = c.isArea, f = c.clipIndex, p = c.clipPath;
		if (!p) return !1;
		var m = Us(e.props, "clippable"), h = m.keepRatio, g = 0, _ = 0, v = o.draggable, y = _i(t);
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
			j = xl(E, f, [g * $(N), _ * $(P)], A, h);
		} else k && (j = O.map(function() {
			return [g, _];
		}));
		var F = O.map(function(e, t) {
			return Jt(e, j[t]);
		}), I = Y([], J(F), !1);
		x.snapBoundInfos = null;
		var L = p.type === "circle", R = p.type === "ellipse";
		if (L || R) {
			var z = Fs(F), B = $(z.bottom - z.top), ee = $(R ? z.right - z.left : B), V = F[0][1] + B, te = F[0][0] - ee, H = F[0][0] + ee;
			L && (I.push([H, z.bottom]), j.push([1, 0])), I.push([z.left, V]), j.push([0, 1]), I.push([te, z.bottom]), j.push([1, 0]);
		}
		var ne = Xo((m.clipHorizontalGuidelines || []).map(function(e) {
			return ft(`${e}`, C);
		}), (m.clipVerticalGuidelines || []).map(function(e) {
			return ft(`${e}`, S);
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
		var ae = [0, 0], oe = go(ne, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, U, W, 5, 5), se = oe.horizontal, ce = oe.vertical, le = se.offset, ue = ce.offset;
		if (se.isBound && (ae[1] += le), ce.isBound && (ae[0] += ue), (R || L) && j[0][0] === 0 && j[0][1] === 0) {
			var z = Fs(F), de = z.bottom - z.top, fe = R ? z.right - z.left : de, pe = ce.isBound ? $(ue) : ce.snapIndex === 0 ? -ue : ue, me = se.isBound ? $(le) : se.snapIndex === 0 ? -le : le;
			fe -= pe, de -= me, L && (de = Ga(ce, se) > 0 ? de : fe, fe = de);
			var he = I[0];
			I[1][1] = he[1] - de, I[2][0] = he[0] + fe, I[3][1] = he[1] + de, I[4][0] = he[0] - fe;
		} else if (A && h && l) {
			var ge = J(yl(E), 2), _e = ge[0], ve = ge[1], ye = _e && ve ? _e / ve : 0, be = E[f].direction || "", xe = I[1][1], V = I[5][1], te = I[7][0], H = I[3][0];
			$(le) <= $(ue) ? le = Fc(le) * $(ue) / ye : ue = Fc(ue) * $(le) * ye, be.indexOf("w") > -1 ? te -= ue : be.indexOf("e") > -1 ? H -= ue : (te += ue / 2, H -= ue / 2), be.indexOf("n") > -1 ? xe -= le : be.indexOf("s") > -1 ? V -= le : (xe += le / 2, V -= le / 2);
			var Se = vl(xe, H, V, te);
			I.forEach(function(e, t) {
				var n = J(Se[t].pos, 2);
				e[0] = n[0], e[1] = n[1];
			});
		} else I.forEach(function(e, t) {
			var n = j[t];
			n[0] && (e[0] -= ue), n[1] && (e[1] -= le);
		});
		var Ce = _l(e, p, F), we = `${T}(${Ce.join(D)})`;
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
		if (x.snapBoundInfos = go(ne, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, U, W, 1, 1), v) {
			var Te = x.is3d, Ee = x.allMatrix, De = Te ? 4 : 3, Oe = ae;
			s && (Oe = [b[0] + ae[0] - y[0], b[1] + ae[1] - y[1]]), v.deltaOffset = qt(Ee, [
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
		}, rc((i = {}, i[T === "rect" ? "clip" : "clipPath"] = we, i), t)))), !0;
	},
	dragControlEnd: function(e, t) {
		this.unset(e);
		var n = t.isDrag, r = t.datas, i = t.isDouble, a = r.isLine, o = r.isClipStart, s = r.isControl;
		return o ? (Q(e, "onClipEnd", ac(e, t, {})), i && (s ? Cl(e, t) : a && Sl(e, t)), i || n) : !1;
	},
	unset: function(e) {
		e.state.clipPathState = "", e.state.snapBoundInfos = null;
	}
}, Tl = {
	name: "originDraggable",
	props: ["originDraggable", "originRelative"],
	events: [
		"dragOriginStart",
		"dragOrigin",
		"dragOriginEnd"
	],
	css: [":host[data-able-origindraggable] .control.origin {\npointer-events: auto;\n}"],
	dragControlCondition: function(e, t) {
		return t.isRequest ? t.requestAble === "originDraggable" : Tt(t.inputEvent.target, X("origin"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas;
		ui(e, t);
		var r = Z(e, t, { dragStart: So.dragStart(e, new si().dragStart([0, 0], t)) }), i = Q(e, "onDragOriginStart", r);
		return n.startOrigin = e.state.transformOrigin, n.startTargetOrigin = e.state.targetOrigin, n.prevOrigin = [0, 0], n.isDragOrigin = !0, i === !1 ? (n.isDragOrigin = !1, !1) : r;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.isRequest;
		if (!n.isDragOrigin) return !1;
		var a = J(_i(t), 2), o = a[0], s = a[1], c = e.state, l = c.width, u = c.height, d = c.offsetMatrix, f = c.targetMatrix, p = c.is3d, m = e.props.originRelative, h = m === void 0 || m, g = p ? 4 : 3, _ = [o, s];
		if (i) {
			var v = t.distOrigin;
			(v[0] || v[1]) && (_ = v);
		}
		var y = Jt(n.startOrigin, _), b = Jt(n.startTargetOrigin, _), x = K(_, n.prevOrigin), S = Ti(d, f, y, g), C = e.getRect(), w = Fs(Ps(S, l, u, g)), T = [C.left - w.left, C.top - w.top];
		n.prevOrigin = _;
		var E = [vc(b[0], l, h), vc(b[1], u, h)].join(" "), D = So.drag(e, oi(t, e.state, T, !!r, !1)), O = Z(e, t, q(q({
			width: l,
			height: u,
			origin: y,
			dist: _,
			delta: x,
			transformOrigin: E,
			drag: D
		}, rc({
			transformOrigin: E,
			transform: D.transform
		}, t)), { afterTransform: D.transform }));
		return Q(e, "onDragOrigin", O), O;
	},
	dragControlEnd: function(e, t) {
		return t.datas.isDragOrigin ? (Q(e, "onDragOriginEnd", ac(e, t, {})), !0) : !1;
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
function El(e, t, n, r) {
	var i = e.filter(function(e) {
		var t = e.virtual;
		return e.horizontal && !t;
	}).length, a = e.filter(function(e) {
		var t = e.virtual;
		return e.vertical && !t;
	}).length, o = -1;
	if (t === 0 && (i === 0 ? o = 0 : i === 1 && (o = 1)), t === 2 && (i <= 2 ? o = 2 : i <= 3 && (o = 3)), t === 3 && (a === 0 ? o = 4 : a < 4 && (o = 7)), t === 1 && (a <= 1 ? o = 5 : a <= 2 && (o = 6)), !(o === -1 || !e[o].virtual)) {
		var s = e[o];
		Dl(e, o), o < 4 ? s.pos[0] = n : s.pos[1] = r;
	}
}
function Dl(e, t) {
	t < 4 ? e.slice(0, t + 1).forEach(function(e) {
		e.virtual = !1;
	}) : (e[0].virtual && (e[0].virtual = !1), e.slice(4, t + 1).forEach(function(e) {
		e.virtual = !1;
	}));
}
function Ol(e, t) {
	t < 4 ? e.slice(t, 4).forEach(function(e) {
		e.virtual = !0;
	}) : e.slice(t).forEach(function(e) {
		e.virtual = !0;
	});
}
function kl(e, t, n, r, i) {
	r === void 0 && (r = [0, 0]);
	var a = [];
	return a = !e || e === "0px" ? [] : tt(e), dl(a, t, n, 0, 0, r, i);
}
function Al(e, t, n, r, i) {
	var a = e.state, o = a.width, s = a.height, c = ll(i, e.props.roundRelative, o, s), l = c.raws, u = c.styles, d = c.radiusPoses, f = ml(d, l), p = f.horizontals, m = f.verticals, h = u.join(" ");
	a.borderRadiusState = h;
	var g = Z(e, t, q({
		horizontals: p,
		verticals: m,
		borderRadius: h,
		width: o,
		height: s,
		delta: r,
		dist: n
	}, rc({ borderRadius: h }, t)));
	return Q(e, "onRound", g), g;
}
function jl(e) {
	var t = e.getState().style, n = t.borderRadius || "";
	if (!n && e.props.groupable) {
		var r = e.moveables[0], i = e.getTargets()[0];
		i && (r?.props.target === i ? (n = e.moveables[0]?.state.style.borderRadius ?? "", t.borderRadius = n) : (n = sc(i).borderRadius, t.borderRadius = n));
	}
	return n;
}
var Ml = {
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
		var x = u || jl(e), S = s ? 4 : 3, C = kl(x, i, a, p, !0);
		if (!C) return null;
		var w = 0, T = 0, E = b ? [0, 0] : [c, l];
		return C.map(function(e, n) {
			var r = e.horizontal, i = e.vertical, a = e.direction || "", s = Y([], J(e.pos), !1);
			T += Math.abs(r), w += Math.abs(i), r && a.indexOf("n") > -1 && (s[1] -= v), i && a.indexOf("w") > -1 && (s[0] -= v), r && a.indexOf("s") > -1 && (s[1] += v), i && a.indexOf("e") > -1 && (s[0] += v);
			var c = K(Ns(o, s, S), E), l = y && y !== "horizontal", u = e.vertical ? w <= h[1] && (l || !e.virtual) : T <= h[0] && (y || !e.virtual);
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
		r.lineIndex = l, r.controlIndex = c, r.isControl = o, r.isLine = s, ui(e, t);
		var f = e.props, p = f.roundRelative, m = f.minRoundControls, h = m === void 0 ? [0, 0] : m, g = e.state, _ = g.width, v = g.height;
		r.isRound = !0, r.prevDist = [0, 0];
		var y = kl(jl(e) || "", _, v, h, !0) || [];
		return r.controlPoses = y, g.borderRadiusState = ll(y, p, _, v).styles.join(" "), d;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = n.controlPoses;
		if (!n.isRound || !n.isControl || !r.length) return !1;
		var i = n.controlIndex, a = J(_i(t), 2), o = a[0], s = a[1], c = [o, s], l = K(c, n.prevDist), u = e.props.maxRoundControls, d = u === void 0 ? [4, 4] : u, f = e.state, p = f.width, m = f.height, h = r[i], g = h.vertical, _ = h.horizontal, v = r.map(function(e) {
			var t = e.horizontal, n = e.vertical, r = [t * _ * c[0], n * g * c[1]];
			if (t) {
				if (d[0] === 1 || d[0] < 4 && t !== _) return r;
			} else if (d[1] === 0) return r[1] = n * _ * c[0] / p * m, r;
			else if (g && (d[1] === 1 || d[1] < 4 && n !== g)) return r;
			return [0, 0];
		});
		v[i] = c;
		var y = r.map(function(e, t) {
			return q(q({}, e), { pos: Jt(e.pos, v[t]) });
		});
		return i < 4 ? y.slice(0, i + 1).forEach(function(e) {
			e.virtual = !1;
		}) : y.slice(4, i + 1).forEach(function(e) {
			e.virtual = !1;
		}), n.prevDist = [o, s], Al(e, t, c, l, y);
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
			if (a && (f === !0 || f === "control")) Ol(l, o);
			else if (s && (f === !0 || f === "line")) {
				var p = J(li(e, t), 2), m = p[0], h = p[1];
				El(l, c, m, h);
			}
			u !== l.filter(function(e) {
				return e.virtual;
			}).length && Al(e, t, [0, 0], [0, 0], l);
		}
		var g = ac(e, t, {});
		return Q(e, "onRoundEnd", g), n.borderRadiusState = "", g;
	},
	dragGroupControlStart: function(e, t) {
		var n = this.dragControlStart(e, t);
		if (!n) return !1;
		var r = e.moveables, i = e.props.targets, a = na(e, "roundable", t);
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
		var r = e.moveables, i = e.props.targets, a = na(e, "roundable", t), o = q({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return q(q(q({}, e), {
					target: i[t],
					moveable: r[t],
					currentTarget: r[t]
				}), rc({ borderRadius: n.borderRadius }, e));
			})
		}, n);
		return Q(e, "onRoundGroup", o), o;
	},
	dragGroupControlEnd: function(e, t) {
		var n = e.moveables, r = e.props.targets, i = na(e, "roundable", t);
		oc(e, "onRound", function(t) {
			Q(e, "onRoundGroup", q({
				targets: e.props.targets,
				events: i.map(function(e, i) {
					return q(q(q({}, e), {
						target: r[i],
						moveable: n[i],
						currentTarget: n[i]
					}), rc({ borderRadius: t.borderRadius }, e));
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
function Nl(e, t) {
	var n = sn(t ? 4 : 3);
	return e === `matrix${t ? "3d" : ""}(${n.join(",")})` || e === "matrix(1,0,0,1,0,0)";
}
var Pl = {
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
		var n = e.state, r = n.is3d, i = n.targetMatrix, a = n.inlineTransform, o = r ? `matrix3d(${i.join(",")})` : `matrix(${Xt(i, !0)})`, s = !a || a === "none" ? o : a;
		t.datas.startTransforms = Nl(s, r) ? [] : tt(s);
	},
	resetStyle: function(e) {
		var t = e.datas;
		t.nextStyle = {}, t.nextTransforms = e.datas.startTransforms, t.nextTransformAppendedIndexes = [];
	},
	fillDragStartParams: function(e, t) {
		return Z(e, t, {
			setTransform: function(e) {
				t.datas.startTransforms = Ke(e) ? e : tt(e);
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
		var r = na(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
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
		var r = na(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
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
}, Fl = {
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
		var n = this, r = na(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragParams(r, e);
		});
		Q(e, "onRenderGroup", Z(e, t, q(q({
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			transform: Pi(t),
			transformObject: {}
		}, rc(Fi(t))), { events: a })));
	},
	dragGroupEnd: function(e, t) {
		var n = this, r = na(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragEndParams(r, e);
		});
		Q(e, "onRenderGroupEnd", Z(e, t, q({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			targets: e.props.targets,
			events: a,
			transformObject: {},
			transform: Pi(t)
		}, rc(Fi(t)))));
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
		return gn(Ni(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), Z(e, t, q({
			isPinch: !!t.isPinch,
			transformObject: n,
			transform: Pi(t)
		}, rc(Fi(t))));
	},
	fillDragEndParams: function(e, t) {
		var n = {};
		return gn(Ni(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), Z(e, t, q({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			transformObject: n,
			transform: Pi(t)
		}, rc(Fi(t))));
	}
};
function Il(e, t, n, r, i, a, o) {
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
	}), C(Pl, `drag${r}${i}`);
	var w = 0, T = 0;
	n.forEach(function(t) {
		if (_) return !1;
		var n = `${t}${r}${i}`, o = `${t}${r}Condition`;
		i === "" && !d && gc(e.state, a);
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
	}), (!l || T) && C(Fl, `drag${r}${i}`);
	var E = S !== e[x] || w === n.length;
	return (c || _ || E) && (e.state.gestos = {}, e.moveables && e.moveables.forEach(function(e) {
		e.state.gestos = {};
	}), p.forEach(function(t) {
		t.unset && t.unset(e);
	})), s && !E && !d && T && e.props.preventDefault && a?.preventDefault(), e.isUnmounted || E ? !1 : ((!s && T && !o || c) && (e.props.flushSync || gs)(function() {
		e.updateRect(c ? i : "", !0, !1), e.forceUpdate();
	}), !s && !c && !l && T && !o && Il(e, t, n, r, i + "After", a), !0);
}
function Ll(e, t) {
	return function(n, r) {
		r === void 0 && (r = n.inputEvent.target);
		var i = r, a = e.areaElement, o = e._dragTarget;
		return !o || !t && e.controlGesto?.isFlag() ? !1 : i === o || o.contains(i) || i === a || !e.isMoveableElement(i) && !e.controlBox.contains(i) || Tt(i, "moveable-area") || Tt(i, "moveable-padding") || Tt(i, "moveable-edgeDraggable");
	};
}
function Rl(e, t, n) {
	var r = e.controlBox, i = [], a = e.props, o = a.dragArea, s = e.state.target, c = a.dragTarget;
	i.push(r), (!o || c) && i.push(t), !o && c && s && t !== s && a.dragTargetSelf && i.push(s);
	var l = Ll(e);
	return Bl(e, i, "targetAbles", n, {
		dragStart: l,
		pinchStart: l
	});
}
function zl(e, t) {
	var n = e.controlBox, r = [];
	r.push(n);
	var i = Ll(e, !0), a = function(e, t) {
		return t === void 0 && (t = e.inputEvent.target), t === n || !i(e, t);
	};
	return Bl(e, r, "controlAbles", t, {
		dragStart: a,
		pinchStart: a
	});
}
function Bl(e, t, n, r, i) {
	i === void 0 && (i = {});
	var a = n === "targetAbles", o = e.props, s = o.pinchOutside, c = o.pinchThreshold, l = o.preventClickEventOnDrag, u = o.preventClickDefault, d = o.checkInput, f = o.dragFocusedInput, p = o.preventDefault, m = p === void 0 || p, h = o.preventRightClick, g = h === void 0 || h, _ = o.preventWheelClick, v = _ === void 0 || _, y = o.dragContainer, b = new gr(t, {
		preventDefault: m,
		preventRightClick: g,
		preventWheelClick: v,
		container: wc(y, !0) || Nt(e.getControlBoxElement()),
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
					Il(e, Y([], J(e[n]), !1), u, r, a, o) ? (e.props.stopPropagation || a === "Start" && x) && ((s = o?.inputEvent) == null || s.stopPropagation()) : o.stop();
				}
			});
		});
	}), b;
}
var Vl = /* @__PURE__ */ function() {
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
function Hl(e, t, n, r) {
	n === void 0 && (n = t);
	var i = Ji(e, t), a = i.matrixes, o = i.is3d, s = i.targetMatrix, c = i.transformOrigin, l = i.targetOrigin, u = i.offsetContainer, d = i.hasFixed, f = i.zoom, p = ea(u, n), m = p.matrixes, h = p.is3d, g = p.offsetContainer, _ = p.zoom, v = r || h || o, y = v ? 4 : 3, b = e.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in e, x = s, S = sn(y), C = sn(y), w = sn(y), T = sn(y), E = a.length, D = m.map(function(e) {
		return q(q({}, e), { matrix: e.matrix ? Y([], J(e.matrix), !1) : void 0 });
	}).reverse();
	a.reverse(), !o && v && (x = Gt(x, 3, 4), Ds(a)), !h && v && Ds(D), D.forEach(function(e) {
		C = qt(C, e.matrix, y);
	});
	var O = n || Mt(e), k = D[0]?.target || ws(O, O, !0).offsetParent, A = D.slice(1).reduce(function(e, t) {
		return qt(e, t.matrix, y);
	}, sn(y));
	a.forEach(function(e, t) {
		if (E - 2 === t && (w = S.slice()), E - 1 === t && (T = S.slice()), !e.matrix) {
			var n = a[t + 1];
			e.matrix = ln(Ls(e, n, k, y, qt(A, S, y)), y);
		}
		S = qt(S, e.matrix, y);
	});
	var j = !b && o;
	x ||= sn(j ? 4 : 3);
	var M = ks(b && x.length === 16 ? Gt(x, 4, 3) : x, j), N = C;
	return C = zt(C, y, y), {
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
function Ul(e, t, n, r) {
	n === void 0 && (n = t);
	var i = 0, a = 0, o = 0, s = {}, c = Ws(e);
	if (e && (i = c.offsetWidth, a = c.offsetHeight), e) {
		var l = Hl(e, t, n, r), u = ci(l.allMatrix, l.transformOrigin, i, a);
		s = q(q({}, l), u);
		var d = ci(l.allMatrix, [50, 50], 100, 100);
		o = Gs([d.pos1, d.pos2], d.direction);
	}
	var f = r ? 4 : 3;
	return q(q(q({
		hasZoom: !1,
		width: i,
		height: a,
		rotation: o
	}, c), {
		originalRootMatrix: sn(f),
		rootMatrix: sn(f),
		beforeMatrix: sn(f),
		offsetMatrix: sn(f),
		allMatrix: sn(f),
		targetMatrix: sn(f),
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
function Wl(e, t, n, r, i, a) {
	a === void 0 && (a = []);
	var o = 1, s = [0, 0], c = Ks(), l = Ks(), u = Ks(), d = Ks(), f = [0, 0], p = {}, m = Ul(t, n, i, !0);
	if (t) {
		var h = ta(t);
		a.forEach(function(e) {
			p[e] = h(e);
		});
		var g = m.is3d ? 4 : 3, _ = ci(m.offsetMatrix, Jt(m.transformOrigin, Ht(m.targetMatrix, g)), m.width, m.height);
		o = _.direction, s = Jt(_.origin, [_.left - m.left, _.top - m.top]), d = Ys(m.offsetRootContainer);
		var v = ws(r, r, !0).offsetParent || m.offsetRootContainer;
		if (m.hasZoom) {
			var y = ci(qt(m.originalRootMatrix, m.allMatrix), m.transformOrigin, m.width, m.height), b = ci(m.originalRootMatrix, xs(ta(v)("transformOrigin")).map(function(e) {
				return parseFloat(e);
			}), v.offsetWidth, v.offsetHeight);
			if (c = Js(y, d), u = Js(b, d, v, !0), e) {
				var x = y.left, S = y.top;
				l = Js({
					left: x,
					top: S,
					bottom: S,
					right: S
				}, d);
			}
		} else {
			c = Ys(t), u = $i(v), e && (l = Ys(e));
			var C = u.left, w = u.top, T = u.clientLeft, E = u.clientTop, D = [c.left - C, c.top - w];
			f = K(hc(m.rootMatrix, D, 4), [T + m.left, E + m.top]);
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
function Gl(e) {
	var t = e.pos1, n = e.pos2, r = e.pos3, i = e.pos4;
	if (!t || !n || !r || !i) return null;
	var a = Kn([
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
var Kl = /* @__PURE__ */ function(e) {
	Or(t, e);
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
		}, Wl(null)), t.renderState = {}, t.enabledAbles = [], t.targetAbles = [], t.controlAbles = [], t.rotation = 0, t.scale = [1, 1], t.isMoveableMounted = !1, t.isUnmounted = !1, t.events = {
			mouseEnter: null,
			mouseLeave: null
		}, t._emitter = new Mn(), t._prevOriginalDragTarget = null, t._originalDragTarget = null, t._prevDragTarget = null, t._dragTarget = null, t._prevPropTarget = null, t._propTarget = null, t._prevDragArea = !1, t._isPropTargetChanged = !1, t._hasFirstTarget = !1, t._reiszeObserver = null, t._observerId = 0, t._mutationObserver = null, t._rootContainer = null, t._viewContainer = null, t._viewClassNames = [], t._store = {}, t.checkUpdateRect = function() {
			if (!t.isDragging()) {
				var e = t.props.parentMoveable;
				if (e) {
					e.checkUpdateRect();
					return;
				}
				ut(t._observerId), t._observerId = lt(function() {
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
		return u && (O["--moveable-line-padding"] = u), d && (O["--moveable-control-padding"] = d), H.createElement(c, q({
			cspNonce: o,
			ref: Ae(this, "controlBox"),
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
		this.isMoveableMounted = !1, this.isUnmounted = !0, this._emitter.off(), (e = this._reiszeObserver) == null || e.disconnect(), (t = this._mutationObserver) == null || t.disconnect(), this._viewContainer && this._changeAbleViewClassNames([]), nc(this, !1), nc(this, !0);
		var n = this.events;
		for (var r in n) {
			var i = n[r];
			i && i.destroy();
		}
	}, t.prototype.getTargets = function() {
		var e = this.props.target;
		return e ? [e] : [];
	}, t.prototype.getAble = function(e) {
		return ct(this.props.ables || [], function(t) {
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
		return e && (e.getAttribute?.call(e, "class") || "").indexOf(Jr) > -1;
	}, t.prototype.dragStart = function(e, t) {
		t === void 0 && (t = e.target);
		var n = this.targetGesto, r = this.controlGesto;
		return n && Ll(this)({ inputEvent: e }, t) ? n.isFlag() || n.triggerDragStart(e) : r && this.isMoveableElement(t) && (r.isFlag() || r.triggerDragStart(e)), this;
	}, t.prototype.hitTest = function(e) {
		var t = this.state, n = t.target, r = t.pos1, i = t.pos2, a = t.pos3, o = t.pos4, s = t.targetClientRect;
		if (!n) return 0;
		var c;
		if (Ft(e)) {
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
		var u = c.left, d = c.top, f = c.width, p = c.height, m = Gn([
			r,
			i,
			o,
			a
		], s), h = er(m, [
			[u, d],
			[u + f, d],
			[u + f, d + p],
			[u, d + p]
		]), g = Wn(m);
		return !h || !g ? 0 : Math.min(100, h / g * 100);
	}, t.prototype.isInside = function(e, t) {
		var n = this.state, r = n.target, i = n.pos1, a = n.pos2, o = n.pos3, s = n.pos4, c = n.targetClientRect;
		return r ? qn([e, t], Gn([
			i,
			a,
			s,
			o
		], c)) : !1;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.props, i = !r.parentPosition && !r.wrapperMoveable;
		i && Qi(!0);
		var a = r.parentMoveable, o = this.state.target || r.target, s = this.getContainer(), c = a ? a._rootContainer : this._rootContainer, l = Wl(this.controlBox, o, s, s, c || s, this._getRequestStyles());
		if (!o && this._hasFirstTarget && r.persistData) {
			var u = Gl(r.persistData);
			for (var d in u) l[d] = u[d];
		}
		i && Qi(), this.updateState(l, !a && n);
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
		var e = this.state, t = ec(this.state), n = J(t, 4), r = n[0], i = n[1], a = n[2], o = n[3], s = Fs(t), c = e.width, l = e.height, u = s.width, d = s.height, f = s.left, p = s.top, m = [e.left, e.top], h = Jt(m, e.origin);
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
			beforeOrigin: Jt(m, e.beforeOrigin),
			origin: h,
			transformOrigin: e.transformOrigin,
			rotation: this.getRotation()
		};
	}, t.prototype.getManager = function() {
		return this;
	}, t.prototype.stopDrag = function(e) {
		if (!e || e === "target") {
			var t = this.targetGesto;
			t?.isIdle() === !1 && tc(this, !1), t?.stop();
		}
		if (!e || e === "control") {
			var t = this.controlGesto;
			t?.isIdle() === !1 && tc(this, !0), t?.stop();
		}
	}, t.prototype.getRotation = function() {
		var e = this.state, t = e.pos1, n = e.pos2, r = e.direction;
		return Ec(t, n, r);
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this, i = r.props, a = i.parentMoveable || i.wrapperMoveable || r, o = a.props.ables, s = i.groupable, c = ct(o, function(t) {
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
				return Il(r, p, ["drag"], f, "", q(q({}, l.request(t)), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			},
			requestEnd: function() {
				return Il(r, p, ["drag"], f, "End", q(q({}, l.requestEnd()), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			}
		};
		return Il(r, p, ["drag"], f, "Start", q(q({}, l.requestStart(t)), {
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
		var h = Lc(n || {}), g = h.left, _ = h.top, v = h.bottom, y = h.right, b = o ? 4 : 3, x = [];
		x = p ? i : this.controlBox && t.groupable ? r : Jt(r, [d, f]);
		var S = Kt(b, ln(x.map(function(e) {
			return -e;
		}), b), a, ln(i, b)), C = _c(S, s, [-g, -_], b), w = _c(S, c, [y, -_], b), T = _c(S, l, [-g, v], b), E = _c(S, u, [y, v], b);
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
				[_c(S, s, [-g - D, -_], b), _c(S, c, [y + D, -_], b)],
				[_c(S, c, [y, -_ - D], b), _c(S, u, [y, v + D], b)],
				[_c(S, u, [y + D, v], b), _c(S, l, [-g - D, v], b)],
				[_c(S, l, [-g, v + D], b), _c(S, s, [-g, -_ - D], b)]
			];
		}
	}, t.prototype.checkUpdate = function() {
		this._isPropTargetChanged = !1;
		var e = this.props, t = e.target, n = e.container, r = e.parentMoveable, i = this.state, a = i.target, o = i.container;
		if (!(!a && !t)) {
			this.updateAbles();
			var s = !lc(a, t);
			if (s || !lc(o, n)) {
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
		return n[r] || (n[r] = Er(e, t)), n[r];
	}, t.prototype.getState = function() {
		var e = this.props;
		(e.target || e.targets?.length) && (this._hasFirstTarget = !0);
		var t = this.controlBox, n = e.persistData, r = e.firstRenderState;
		if (r && !t) return r;
		if (!this._hasFirstTarget && n) {
			var i = Gl(n);
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
		var n = this.props.triggerAblesSimultaneously, r = this.getEnabledAbles(e), i = `drag${t}Start`, a = `pinch${t}Start`, o = `drag${t}ControlStart`, s = cc(r, [i, a], n), c = cc(r, [o], n);
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
		var e = this, t = this.props.triggerAblesSimultaneously, n = { createElement: H.createElement };
		return this.renderState = {}, fc(pc(cc(this.getEnabledAbles(), ["render"], t).map(function(t) {
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
		(!e && this.targetGesto || this._isTargetChanged(!0)) && (nc(this, !1), this.updateState({ gestos: {} })), t || nc(this, !0), n && e && !this.targetGesto && (this.targetGesto = Rl(this, n, "")), !this.controlGesto && t && (this.controlGesto = zl(this, "Control"));
	}, t.prototype._updateTargets = function() {
		var e = this.props;
		this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = wc(this._originalDragTarget, !0);
	}, t.prototype._renderLines = function() {
		var e = this.props, t = e.zoom, n = e.hideDefaultLines, r = e.hideChildMoveableDefaultLines, i = e.parentMoveable;
		if (n || i && r) return [];
		var a = this.getState(), o = { createElement: H.createElement };
		return a.renderLines.map(function(e, n) {
			return ca(o, "", e[0], e[1], t, `render-line-${n}`);
		});
	}, t.prototype._isTargetChanged = function(e) {
		var t = this.props, n = t.dragTarget || t.target, r = this._prevOriginalDragTarget, i = this._prevDragArea, a = t.dragArea;
		return !a && r !== n || (e || a) && i !== a || this._prevPropTarget != this._propTarget;
	}, t.prototype._updateNativeEvents = function() {
		var e = this, t = this.props.dragArea ? this.areaElement : this.state.target, n = this.events, r = dt(n);
		if (this._isTargetChanged()) for (var i in n) {
			var a = n[i];
			a && a.destroy(), n[i] = null;
		}
		if (t) {
			var o = this.enabledAbles;
			r.forEach(function(r) {
				var i = cc(o, [r]), a = i.length > 0, s = n[r];
				if (!a) {
					s && (s.destroy(), n[r] = null);
					return;
				}
				s || (s = new Vl(t, e, r), n[r] = s), s.setAbles(i);
			});
		}
	}, t.prototype._checkUpdateRootContainer = function() {
		var e = this.props.rootContainer;
		!this._rootContainer && e && (this._rootContainer = wc(e, !0));
	}, t.prototype._checkUpdateViewContainer = function() {
		var e = this.props.viewContainer;
		!this._viewContainer && e && (this._viewContainer = wc(e, !0)), this._viewContainer && this._changeAbleViewClassNames(Y(Y([], J(this._getAbleViewClassNames()), !1), [this.isDragging() ? Jc : ""], !1));
	}, t.prototype._changeAbleViewClassNames = function(e) {
		var t = this._viewContainer, n = dc(e.filter(Boolean), function(e) {
			return e;
		}).map(function(e) {
			return J(e, 1)[0];
		}), r = this._viewClassNames, i = Cn(r, n), a = i.removed, o = i.added;
		a.forEach(function(e) {
			Dt(t, r[e]);
		}), o.forEach(function(e) {
			Et(t, n[e]);
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
		var t, n = this.props, r = n.target, i = Nt(this.getControlBoxElement());
		if (!i.ResizeObserver || !r || !n.useResizeObserver) {
			(t = this._reiszeObserver) == null || t.disconnect();
			return;
		}
		if (!(e.target === r && this._reiszeObserver)) {
			var a = new i.ResizeObserver(this.checkUpdateRect);
			a.observe(r, { box: "border-box" }), this._reiszeObserver = a;
		}
	}, t.prototype._updateMutationObserver = function(e) {
		var t = this, n, r = this.props, i = r.target, a = Nt(this.getControlBoxElement());
		if (!a.MutationObserver || !i || !r.useMutationObserver) {
			(n = this._mutationObserver) == null || n.disconnect();
			return;
		}
		if (!(e.target === i && this._mutationObserver)) {
			var o = new a.MutationObserver(function(e) {
				var n, r;
				try {
					for (var i = jr(e), a = i.next(); !a.done; a = i.next()) {
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
		flushSync: gs,
		firstRenderState: null,
		persistData: null,
		viewContainer: null,
		requestStyles: [],
		useAccuratePosition: !1
	}, t;
}(H.PureComponent), ql = {
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
		var d = Pc(e, "parentPosition", [a, o], function(e) {
			return e.join(",");
		}), f = Pc(e, "requestStyles", e.getRequestChildStyles(), function(e) {
			return e.join(",");
		});
		return e.moveables = e.moveables.slice(0, r.length), Y(Y([], J(r.map(function(r, i) {
			return t.createElement(Kl, {
				key: "moveable" + i,
				ref: je(e, "moveables", i),
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
		})), !1), J(pc(l.map(function(e, n) {
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
				return ca(t, "", K(r[o], d), K(r[s], d), c, `group-rect-${n}-${i}`);
			});
		}))), !1);
	}
}, Jl = Mr("clickable", {
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
			a === -1 && (a = st(i, function(e) {
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
function Yl(e) {
	var t = e.originalDatas.draggable;
	return t ||= (e.originalDatas.draggable = {}, e.originalDatas.draggable), q(q({}, e), { datas: t });
}
var Xl = Mr("edgeDraggable", {
	css: [".edge.edgeDraggable.line {\ncursor: move;\n}"],
	render: function(e, t) {
		var n = e.props, r = n.edgeDraggable;
		return r ? la(t, "edgeDraggable", r, e.getState().renderPoses, n.zoom) : [];
	},
	dragCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && Tt(r, X("direction")) && Tt(r, X("edge")) && Tt(r, X("edgeDraggable"));
	},
	dragStart: function(e, t) {
		return So.dragStart(e, Yl(t));
	},
	drag: function(e, t) {
		return So.drag(e, Yl(t));
	},
	dragEnd: function(e, t) {
		return So.dragEnd(e, Yl(t));
	},
	dragGroupCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && Tt(r, X("direction")) && Tt(r, X("line"));
	},
	dragGroupStart: function(e, t) {
		return So.dragGroupStart(e, Yl(t));
	},
	dragGroup: function(e, t) {
		return So.dragGroup(e, Yl(t));
	},
	dragGroupEnd: function(e, t) {
		return So.dragGroupEnd(e, Yl(t));
	},
	unset: function(e) {
		return So.unset(e);
	}
}), Zl = {
	name: "individualGroupable",
	props: ["individualGroupable", "individualGroupableProps"],
	events: []
}, Ql = [
	Pl,
	tl,
	ms,
	Rc,
	So,
	Xl,
	Do,
	Bc,
	Wc,
	Po,
	el,
	nl,
	Qc,
	Tl,
	wl,
	Ml,
	ql,
	Zl,
	Jl,
	Zc,
	Fl
];
function $l(e, t) {
	var n = J(e, 3), r = n[0], i = n[1], a = n[2];
	return (r * t[0] + i * t[1] + a) / Math.sqrt(r * r + i * i);
}
function eu(e, t) {
	var n = J(e, 2), r = n[0], i = n[1];
	return -r * t[0] - i * t[1];
}
function tu(e, t) {
	return Math.max.apply(Math, Y([], J(e.map(function(e) {
		var n = J(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.max(r[t], i[t], a[t], o[t]);
	})), !1));
}
function nu(e, t) {
	return Math.min.apply(Math, Y([], J(e.map(function(e) {
		var n = J(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.min(r[t], i[t], a[t], o[t]);
	})), !1));
}
function ru(e, t) {
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
	var d = G(t, Qr);
	if (d % 90) {
		var f = d / 180 * Math.PI, p = Math.tan(f), m = -1 / p, h = [ei, ti], g = [[0, 0], [0, 0]], _ = [ei, ti], v = [[0, 0], [0, 0]];
		e.forEach(function(e) {
			e.forEach(function(e) {
				var t = $l([
					-p,
					1,
					0
				], e), n = $l([
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
			eu([-p, 1], b)
		], E = [
			-p,
			1,
			eu([-p, 1], x)
		], D = [
			-m,
			1,
			eu([-m, 1], C)
		], O = [
			-m,
			1,
			eu([-m, 1], w)
		];
		n = J([
			[T, D],
			[T, O],
			[E, D],
			[E, O]
		].map(function(e) {
			var t = J(e, 2), n = t[0], r = t[1];
			return Yn(n, r)[0];
		}), 4), a = n[0], o = n[1], s = n[2], c = n[3], l = _[1] - _[0], u = h[1] - h[0];
	} else {
		var k = nu(e, 0), A = nu(e, 1), j = tu(e, 0), M = tu(e, 1);
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
	var P = Kn([
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
function iu(e, t) {
	var n = t.map(function(t) {
		if (Ke(t)) {
			var n = iu(e, t), r = n.length;
			return r > 1 ? n : r === 1 ? n[0] : null;
		}
		var i = ct(e, function(e) {
			return e.manager.props.target === t;
		});
		return i ? (i.finded = !0, i.manager) : null;
	}).filter(Boolean);
	return n.length === 1 && Ke(n[0]) ? n[0] : n;
}
var au = /* @__PURE__ */ function(e) {
	Or(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.differ = new On(), t.moveables = [], t.transformOrigin = "50% 50%", t.renderGroupRects = [], t._targetGroups = [], t._hasFirstTargets = !1, t;
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
		Qi(!0), this.moveables.forEach(function(t) {
			t.updateRect(e, !1, !1);
		});
		var i = this.props, a = this.moveables, o = r.target || i.target, s = a.map(function(e) {
			return {
				finded: !1,
				manager: e
			};
		}), c = this.props.targetGroups || [], l = iu(s, c), u = i.useDefaultGroupRotate;
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
				if (Ke(e)) {
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
					poses: ec(e.state),
					rotation: e.getRotation()
				};
			}), i = r.map(function(e) {
				return e.rotation;
			}), a = 0, o = i[0], s = i.every(function(e) {
				return Math.abs(o - e) < .1;
			});
			return a = f ? !u && s ? o : p : !u && !n && s ? o : t, ru(r.map(function(e) {
				return e.poses;
			}), a);
		}
		var g = h(l, this.rotation, !0);
		f && (this.rotation = g.rotation, this.transformOrigin = i.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = c, this.renderGroupRects = d;
		var _ = this.transformOrigin, v = this.rotation, y = this.scale, b = g.width, x = g.height, S = g.minX, C = g.minY, w = Kn(Mc([
			[0, 0],
			[b, 0],
			[0, x],
			[b, x]
		], jc(_, b, x), this.rotation / 180 * Math.PI).result), T = w.minX, E = w.minY, D = ` rotate(${v}deg) scale(${Fc(y[0])}, ${Fc(y[1])})`, O = `translate(${-T}px, ${-E}px)${D}`;
		this.controlBox.style.transform = `translate3d(${S}px, ${C}px, ${this.props.translateZ || 0})`, o.style.cssText += `left:0px;top:0px;transform-origin:${_};width:${b}px;height:${x}px;transform: ${O}`, r.width = b, r.height = x;
		var k = this.getContainer(), A = Wl(this.controlBox, o, this.controlBox, this.getContainer(), this._rootContainer || k, []), j = [A.left, A.top], M = J(ec(A), 4), N = M[0], P = M[1], F = M[2], I = M[3], L = Kn([
			N,
			P,
			F,
			I
		]), R = [L.minX, L.minY], z = Fc(y[0] * y[1]);
		A.pos1 = K(N, R), A.pos2 = K(P, R), A.pos3 = K(F, R), A.pos4 = K(I, R), A.left = S - A.left + R[0], A.top = C - A.top + R[1], A.origin = K(Jt(j, A.origin), R), A.beforeOrigin = K(Jt(j, A.beforeOrigin), R), A.originalBeforeOrigin = Jt(j, A.originalBeforeOrigin), A.transformOrigin = K(Jt(j, A.transformOrigin), R), o.style.transform = `translate(${-T - R[0]}px, ${-E - R[1]}px)` + D, Qi(), this.updateState(q(q({}, A), {
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
		e.prototype.updateAbles.call(this, Y(Y([], J(this.props.ables), !1), [ql], !1), "Group");
	}, t.prototype._updateTargets = function() {
		e.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = wc(this._originalDragTarget, !0);
	}, t.prototype._updateEvents = function() {
		var e = this.state, t = this.props, n = this._prevDragTarget, r = t.dragTarget || this.areaElement, i = t.targets, a = this.differ.update(i), o = a.added, s = a.changed, c = a.removed, l = o.length || c.length;
		(l || this._prevOriginalDragTarget !== this._originalDragTarget) && (nc(this, !1), nc(this, !0), this.updateState({ gestos: {} })), n !== r && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto ||= Rl(this, this._dragTarget, "Group"), this.controlGesto ||= zl(this, "GroupControl"));
		var u = !lc(e.container, t.container);
		u && (e.container = t.container), (u || l || this.transformOrigin !== (t.defaultGroupOrigin || "50% 50%") || s.length || i.length && !Nc(this._targetGroups, t.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!l;
	}, t.prototype._updateObserver = function() {}, t.defaultProps = q(q({}, Kl.defaultProps), {
		transformOrigin: ["50%", "50%"],
		groupable: !0,
		dragArea: !0,
		keepRatio: !0,
		targets: [],
		defaultGroupRotate: 0,
		defaultGroupOrigin: "50% 50%"
	}), t;
}(Kl), ou = /* @__PURE__ */ function(e) {
	Or(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.moveables = [], t;
	}
	return t.prototype.render = function() {
		var e = this, t = this.props, n = t.cspNonce, r = t.cssStyled, i = t.persistData, a = t.targets || [], o = a.length, s = this.isUnmounted || !o, c = i?.children ?? [];
		return s && !o && c.length ? a = c.map(function() {
			return null;
		}) : s || (c = []), H.createElement(r, {
			cspNonce: n,
			ref: Ae(this, "controlBox"),
			className: X("control-box")
		}, a.map(function(n, r) {
			var i = t.individualGroupableProps?.call(t, n, r) ?? {};
			return H.createElement(Kl, q({
				key: "moveable" + r,
				ref: je(e, "moveables", r)
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
		n === void 0 && (n = !0), Qi(!0), this.moveables.forEach(function(r) {
			r.updateRect(e, t, n);
		}), Qi();
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
		var n = t, r = ct(this.moveables, function(e) {
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
}(Kl);
function su(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (qe(e)) {
				t[e] && n.push.apply(n, Y([], J(t[e]), !1));
				return;
			}
			Ke(e) ? n.push.apply(n, Y([], J(su(e, t)), !1)) : n.push(e);
		}
	}), n;
}
function cu(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (qe(e)) {
				t[e] && n.push.apply(n, Y([], J(t[e]), !1));
				return;
			}
			Ke(e) ? n.push(cu(e, t)) : n.push(e);
		}
	}), n;
}
function lu(e, t) {
	return e.length !== t.length || e.some(function(e, n) {
		var r = t[n];
		return !e && !r || e == r ? !1 : Ke(e) && Ke(r) ? lu(e, r) : !0;
	});
}
var uu = /* @__PURE__ */ function(e) {
	Or(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.defaultAbles = Ql, t;
}(/* @__PURE__ */ function(e) {
	Or(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.refTargets = [], t.selectorMap = {}, t._differ = new On(), t._elementTargets = [], t._tmpRefTargets = [], t._tmpSelectorMap = {}, t._onChangeTargets = null, t;
	}
	return t.makeStyled = function() {
		var e = {};
		this.getTotalAbles().forEach(function(t) {
			var n = t.css;
			n && n.forEach(function(t) {
				e[t] = !0;
			});
		});
		var t = dt(e).join("\n");
		this.defaultStyled = Er("div", ke(Jr, Yr + t));
	}, t.getTotalAbles = function() {
		return Y([
			tl,
			ql,
			Zl,
			Zc
		], J(this.defaultAbles), !1);
	}, t.prototype.render = function() {
		var e = this.constructor;
		e.defaultStyled || e.makeStyled();
		var t = this.props, n = t.ables, r = t.props, i = kr(t, ["ables", "props"]), a = J(this._updateRefs(!0), 2), o = a[0], s = a[1], c = su(o, s), l = c.length > 1, u = Y(Y([], J(e.getTotalAbles()), !1), J(n || []), !1), d = q(q(q({}, i), r || {}), {
			ables: u,
			cssStyled: e.defaultStyled,
			customStyledMap: e.customStyledMap
		});
		this._elementTargets = c;
		var f = null, p = this.moveable;
		if (i.persistData?.children && (l = !0), i.individualGroupable) return H.createElement(ou, q({
			key: "individual-group",
			ref: Ae(this, "moveable")
		}, d, {
			target: null,
			targets: c
		}));
		if (l) {
			var m = cu(o, s);
			if (p && !p.props.groupable && !p.props.individualGroupable) {
				var h = p.props.target;
				h && c.indexOf(h) > -1 && (f = q({}, p.state));
			}
			return H.createElement(au, q({
				key: "group",
				ref: Ae(this, "moveable")
			}, d, i.groupableProps ?? {}, {
				target: null,
				targets: c,
				targetGroups: m,
				firstRenderState: f
			}));
		}
		var g = c[0];
		if (p && (p.props.groupable || p.props.individualGroupable)) {
			var _ = ct(p.moveables || [], function(e) {
				return e.props.target === g;
			});
			_ && (f = q({}, _.state));
		}
		return H.createElement(Kl, q({
			key: "single",
			ref: Ae(this, "moveable")
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
		var t = this.refTargets, n = Tc(this.props.target || this.props.targets), r = typeof document < "u", i = lu(t, n), a = this.selectorMap, o = {};
		return this.refTargets.forEach(function e(t) {
			qe(t) ? a[t] ? o[t] = a[t] : r && (i = !0, o[t] = [].slice.call(document.querySelectorAll(t))) : Ke(t) && t.forEach(e);
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
	}, t.defaultAbles = [], t.customStyledMap = {}, t.defaultStyled = null, Ar([Me(ai)], t.prototype, "moveable", void 0), t;
}(H.PureComponent));
//#endregion
//#region src/components/Layer.tsx
function du({ styChild: e, isDesignMode: t, nm: n, sty: r, keepRatio: i = !1, onMouseDown: a, children: o }) {
	let s = (0, H.useRef)(null), c = (e, t) => {
		h(), e.transform = t;
	};
	return /* @__PURE__ */ k(N, { children: [/* @__PURE__ */ I("div", {
		css: e,
		ref: s,
		"data-lay": n,
		style: r,
		onMouseDown: a,
		children: o
	}), t && /* @__PURE__ */ I(uu, {
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
function fu(e, t) {
	let [n, r] = (0, H.useState)(void 0);
	return (0, H.useEffect)(() => {
		if (!t || !e) {
			r(void 0);
			return;
		}
		let n = !0;
		return V(e).then((t) => {
			n && (r(t), t && ee(e, t.boxW, t.boxH));
		}), () => {
			n = !1;
		};
	}, [e, t]), n;
}
function pu(e) {
	let [t, n] = (0, H.useState)("");
	return (0, H.useEffect)(() => {
		if (!e) {
			n("");
			return;
		}
		let t = !0, r = new Image();
		return r.src = e, r.decode().then(() => {
			t && (ee(e, r.naturalWidth, r.naturalHeight), n(e));
		}).catch(() => {}), () => {
			t = !1;
		};
	}, [e]), t;
}
function mu({ fn: e, src: t, isSheet: n, isMovie: r, dx: i, dy: a, blendmode: o }) {
	let s = fu(t, n), c = pu(n || r ? "" : t);
	if (!t) return null;
	let l = {
		position: "absolute",
		left: i,
		top: a,
		mixBlendMode: o
	};
	return r ? /* @__PURE__ */ I("video", {
		src: t,
		autoPlay: !0,
		loop: !0,
		muted: !0,
		playsInline: !0,
		style: l
	}) : s ? /* @__PURE__ */ I("div", {
		className: te(s),
		style: l,
		"data-fn": e
	}) : n || !c ? null : /* @__PURE__ */ I("img", {
		src: c,
		"data-fn": e,
		style: l
	});
}
function hu(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error(`画像が読めません: ${e.slice(0, 64)}`)), r.src = e;
	});
}
var gu = {
	"plus-lighter": "lighter",
	multiply: "multiply",
	screen: "screen"
};
function _u(e, t) {
	let n = e.sec > 0 ? Math.floor(t / 1e3 / e.sec * e.cnt) % e.cnt : 0;
	return e.frames[n] ?? e.frames[0];
}
function vu(e) {
	return e.videoWidth > 0 && e.readyState >= 2 ? Promise.resolve() : new Promise((t) => {
		let n = [
			"loadeddata",
			"canplay",
			"error"
		], r = () => {
			for (let t of n) e.removeEventListener(t, r);
			t();
		};
		for (let t of n) e.addEventListener(t, r);
	});
}
async function yu(e) {
	let t = document.createElement("video");
	t.muted = !0, t.loop = !0, t.autoplay = !0, t.playsInline = !0, t.src = e, await vu(t);
	try {
		await t.play();
	} catch {}
	return t;
}
async function bu(e, t) {
	let n = t.filter((e) => !e.isSheet && !e.isMovie), r = t.filter((e) => e.isSheet), i = t.filter((e) => e.isMovie), a = 1, o = 1, s;
	if (e.isMovie) {
		let t = e.videoEl;
		if (!t) throw Error("動画レイヤの<video>要素が取得できません");
		await vu(t), a = Math.max(1, t.videoWidth), o = Math.max(1, t.videoHeight), s = (e) => {
			try {
				e.drawImage(t, 0, 0);
			} catch {}
		};
	} else if (e.isSheet) {
		let t = await V(e.src);
		if (!t) throw Error(`シート定義が読めません: ${e.src.slice(0, 64)}`);
		let n = await hu(t.img);
		a = t.boxW, o = t.boxH;
		let r = performance.now();
		s = (e) => {
			let i = _u(t, performance.now() - r);
			e.drawImage(n, i.x, i.y, i.w, i.h, i.ox, i.oy, i.w, i.h);
		};
	} else {
		let t = await hu(e.src);
		a = Math.max(1, t.naturalWidth), o = Math.max(1, t.naturalHeight), s = (e) => {
			e.drawImage(t, 0, 0);
		};
	}
	let c = document.createElement("canvas");
	c.width = a, c.height = o;
	let l = c.getContext("2d");
	if (!l) throw Error("2Dコンテキストが取得できません");
	let u = await Promise.all(n.map((e) => hu(e.src))), d = () => n.forEach((e, t) => {
		l.globalCompositeOperation = gu[e.blendmode] ?? "source-over", l.drawImage(u[t], e.dx, e.dy);
	});
	if (!e.isSheet && !e.isMovie && r.length === 0 && i.length === 0) return l.globalCompositeOperation = "source-over", s(l), d(), c;
	let f = await Promise.all(r.map(async (e) => {
		let t = await V(e.src);
		if (!t) throw Error(`シート定義が読めません: ${e.src.slice(0, 64)}`);
		return {
			f: e,
			sh: t,
			img: await hu(t.img)
		};
	})), p = await Promise.all(i.map((e) => yu(e.src))), m = performance.now(), h = (() => {
		l.clearRect(0, 0, c.width, c.height), l.globalCompositeOperation = "source-over", s(l), d();
		let e = performance.now() - m;
		return f.forEach(({ f: t, sh: n, img: r }) => {
			let i = _u(n, e);
			l.globalCompositeOperation = gu[t.blendmode] ?? "source-over", l.drawImage(r, i.x, i.y, i.w, i.h, t.dx + i.ox, t.dy + i.oy, i.w, i.h);
		}), i.forEach((e, t) => {
			l.globalCompositeOperation = gu[e.blendmode] ?? "source-over";
			try {
				l.drawImage(p[t], e.dx, e.dy);
			} catch {}
		}), c;
	});
	return p.length > 0 && (h.dispose = () => {
		for (let e of p) e.pause(), e.removeAttribute("src"), e.load();
	}), h;
}
function xu({ baseSrc: e, isSheet: t, isMovie: n, getVideoEl: r, aFace: i, aFx: a, active: o, onReady: s }) {
	let c = (0, H.useRef)(null), l = (0, H.useRef)(null), u = i.map((e) => `${e.src}@${String(e.dx)},${String(e.dy)},${e.blendmode},${String(e.isSheet)},${String(e.isMovie)}`).join(";"), d = `${e}\n${String(t)}\n${String(n)}\n${u}`, f = (0, H.useRef)(o);
	f.current = o;
	let p = (0, H.useRef)(a);
	return p.current = a, (0, H.useEffect)(() => {
		let a = c.current;
		if (!a || !e) return;
		let o = !0;
		return (async () => {
			let c = t || n || i.length > 0 ? await bu({
				src: e,
				isSheet: t,
				isMovie: n,
				videoEl: r()
			}, i) : e;
			if (!o) {
				typeof c == "function" && c.dispose?.();
				return;
			}
			let { runFx: u } = await import("./FxRunner.js"), d = await u({
				canvas: a,
				source: c,
				aFx: p.current,
				active: f.current
			});
			o ? (l.current = d, s(!0)) : d.dispose();
		})().catch((e) => {
			console.error(`[add_fx] ${String(e)}`);
		}), () => {
			o = !1, s(!1), l.current?.dispose(), l.current = null;
		};
	}, [d]), (0, H.useEffect)(() => {
		l.current?.update(a, o);
	}, [a, o]), /* @__PURE__ */ I("canvas", {
		ref: c,
		style: {
			position: "absolute",
			inset: 0
		}
	}, d);
}
function Su({ cmn: { styChild: e, isDesignMode: t }, sty: n, nm: r, fn: i, src: a, isSheet: o, isMovie: s, aFace: c, aFx: l, fxActive: u, getVideoVol: d, needClick2Play: f }) {
	let p = (e) => {
		e.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
	}, m = fu(a, o), h = pu(o || s ? "" : a), [g, _] = (0, H.useState)(!1);
	(0, H.useEffect)(() => {
		l.length === 0 && _(!1);
	}, [l.length]);
	let v = (0, H.useRef)(null), y = (e) => {
		v.current = e, e && (e.volume = d(), e.muted = f());
	};
	(0, H.useEffect)(() => {
		let e = v.current;
		!e || !s || (u ? e.play().catch(() => {}) : e.pause());
	}, [
		u,
		s,
		a
	]);
	let b = {
		display: "block",
		..."width" in n ? { width: "100%" } : {},
		..."height" in n ? { height: "100%" } : {}
	}, x = {
		width: "max-content",
		...n
	}, S = o || s ? a : h, C = l.length > 0 && !!S, w = C && g, T = w ? { visibility: "hidden" } : {};
	return /* @__PURE__ */ k(du, {
		styChild: e,
		isDesignMode: t,
		nm: r,
		sty: x,
		keepRatio: !0,
		onMouseDown: p,
		children: [
			m && /* @__PURE__ */ I("div", {
				className: te(m),
				style: w ? {
					visibility: "hidden",
					animationPlayState: "paused"
				} : void 0
			}),
			a && s && /* @__PURE__ */ I("video", {
				ref: y,
				src: a,
				autoPlay: !0,
				playsInline: !0,
				"data-fn": i,
				style: {
					...b,
					...T
				},
				onLoadedMetadata: (e) => {
					ee(a, e.currentTarget.videoWidth, e.currentTarget.videoHeight);
				}
			}),
			h && !o && !s && /* @__PURE__ */ I("img", {
				src: h,
				style: {
					...b,
					...T
				}
			}),
			C && /* @__PURE__ */ I(xu, {
				baseSrc: S,
				isSheet: o,
				isMovie: s,
				getVideoEl: () => v.current,
				aFace: c,
				aFx: l,
				active: u,
				onReady: _
			}),
			(C ? [] : c).map((e, t) => /* @__PURE__ */ I(mu, { ...e }, `${e.fn}_${String(t)}`))
		]
	});
}
//#endregion
//#region src/ts/Hint.ts
var Cu = [
	"top",
	"bottom",
	"left",
	"right"
];
function wu(e) {
	if (!e) return "top";
	try {
		let { placement: t } = JSON.parse(e), n = (t ?? "").split("-")[0] ?? "";
		return Cu.includes(n) ? n : "top";
	} catch {
		return "top";
	}
}
function Tu(e, t, n, r = 8) {
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
var Eu = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function Du(e, t, n, r, i) {
	let a = (n) => {
		switch (n) {
			case "top": return e.top - t.height - r >= 0;
			case "bottom": return e.top + e.height + r + t.height <= i.height;
			case "left": return e.left - t.width - r >= 0;
			case "right": return e.left + e.width + r + t.width <= i.width;
		}
	};
	if (a(n)) return n;
	let o = Eu[n];
	return a(o) ? o : n;
}
function Ou(e, t, n) {
	return {
		left: Math.min(Math.max(e.left, 0), Math.max(0, n.width - t.width)),
		top: Math.min(Math.max(e.top, 0), Math.max(0, n.height - t.height))
	};
}
var ku = "position: fixed; background-color: #3c3225; color: white; padding: 4px 8px; border-radius: 4px; font-size: 1.2em; z-index: 10000; pointer-events: none; user-select: none; white-space: pre;", Au = new class {
	#e;
	#t() {
		if (this.#e) return this.#e;
		let e = this.#e = document.createElement("div");
		return e.className = "sn_hint", e.setAttribute("role", "tooltip"), e.hidden = !0, document.body.appendChild(e), e;
	}
	show(e, t, n = "", r) {
		if (!t) return;
		let i = this.#t();
		i.textContent = t, i.style.cssText = ku + n, i.hidden = !1;
		let a = e.getBoundingClientRect(), o = i.getBoundingClientRect(), s = {
			width: window.innerWidth,
			height: window.innerHeight
		}, { left: c, top: l } = Ou(Tu(a, o, Du(a, o, wu(r), 8, s), 8), o, s);
		i.style.left = `${String(c)}px`, i.style.top = `${String(l)}px`;
	}
	hide() {
		this.#e && (this.#e.hidden = !0);
	}
}();
A();
var ju = function(e, t) {
	var n = arguments;
	if (t == null || !L.call(t, "css")) return H.createElement.apply(void 0, n);
	var r = n.length, i = Array(r);
	i[0] = T, i[1] = P(e, t);
	for (var a = 2; a < r; a++) i[a] = n[a];
	return H.createElement.apply(null, i);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(ju ||= {});
function Mu() {
	return E([...arguments]);
}
//#endregion
//#region src/components/BtnLayer.tsx
function Nu(e) {
	return {
		w: e?.width ?? 100,
		h: e?.height ?? 30
	};
}
function Pu(e, t) {
	return e ? e.pic ? {
		w: e.width ?? t?.w ?? 0,
		h: e.height ?? t?.h ?? 0
	} : Nu(e) : {
		w: 100,
		h: 30
	};
}
function Fu(e, t) {
	let n = {};
	(e.left !== void 0 || e.top !== void 0 || e.s_right !== void 0 || e.s_bottom !== void 0) && (n.position = "absolute", n.margin = 0, e.s_right === void 0 ? n.left = `${String((e.left ?? 0) - (e.pivot_x ?? 0))}px` : n.right = `${String(e.s_right)}px`, e.s_bottom === void 0 ? n.top = `${String((e.top ?? 0) - (e.pivot_y ?? 0))}px` : n.bottom = `${String(e.s_bottom)}px`), (e.align_x !== void 0 || e.align_y !== void 0) && (n.translate = `${e.align_x === "center" ? "-50%" : e.align_x === "right" ? "-100%" : "0"} ${e.align_y === "middle" ? "-50%" : e.align_y === "bottom" ? "-100%" : "0"}`);
	{
		let { w: r, h: i } = Pu(e, t);
		r > 0 && (n.width = `${String(r)}px`), i > 0 && (n.height = `${String(i)}px`), e.pic || (n.fontSize = `${String(Nu(e).h)}px`, n.lineHeight = 1), n.boxSizing = "border-box";
	}
	return e.pic && e.src && (n.backgroundImage = `url("${e.src}")`, n.backgroundSize = e.enabled === !1 ? "100% 100%" : "300% 100%", n.backgroundRepeat = "no-repeat"), e.alpha !== void 0 && (n.opacity = e.alpha), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0) && (n.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, n.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (n.mixBlendMode = e.blendmode), e.enabled === !1 && (n.color = "gray", n.pointerEvents = "none"), n;
}
function Iu({ text: e, label: t, call: n, fn: r, arg: a, url: s, sty: c, enabled: l, onActivate: u, onNavigate: d, onSe: f, onHoverCall: p }) {
	let m = l && c?.enabled !== !1, h = w((e) => e.btnFont), g = (0, H.useRef)(null);
	(0, H.useEffect)(() => {
		let e = g.current;
		if (!(!e || !m)) return o.add(e), () => o.remove(e);
	}, [m]);
	let _ = (0, H.useRef)(null), v = c?.pic ? c.src ?? "" : "", y = c?.enabled !== !1, [b, x] = (0, H.useState)(null);
	(0, H.useEffect)(() => {
		if (!v) {
			x(null);
			return;
		}
		let e = !0, t = new Image();
		return t.onload = () => {
			e && x({
				w: y ? t.naturalWidth / 3 : t.naturalWidth,
				h: t.naturalHeight
			});
		}, t.src = v, () => {
			e = !1;
		};
	}, [v, y]);
	let S = c?.b_pic ? c.b_src ?? "" : "", [C, T] = (0, H.useState)(null);
	(0, H.useEffect)(() => {
		if (!S) {
			T(null);
			return;
		}
		let e = !0, t = new Image();
		return t.onload = () => {
			e && T({
				w: t.naturalWidth,
				h: t.naturalHeight
			});
		}, t.src = S, () => {
			e = !1;
		};
	}, [S]);
	let [E, D] = (0, H.useState)({
		x: 1,
		y: 1
	});
	(0, H.useLayoutEffect)(() => {
		let e = _.current;
		if (!e) {
			D({
				x: 1,
				y: 1
			});
			return;
		}
		if (c?.pic) {
			D({
				x: 1,
				y: 1
			});
			return;
		}
		let t = () => {
			let { w: t, h: r } = Nu(c), i = e.offsetWidth, a = e.offsetHeight;
			i > 0 && a > 0 && n.disconnect(), D({
				x: i > 0 ? t / i : 1,
				y: a > 0 ? r / a : 1
			});
		}, n = new ResizeObserver(t);
		return n.observe(e), t(), () => n.disconnect();
	}, [
		e,
		c?.width,
		c?.height,
		c?.pic
	]);
	let O = Mu`
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
		font-family: ${h};
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
		${c?.style ?? ""}
		/* フォーカス時もホバーと同じ見た目にする（本家 EventMng.ts:384 は pointerout で
			isFocus(ctnBtn) ? hv() : nr() と、フォーカスが残っている間だけホバー色を保つ）。
			ただし本家のisFocusはキー操作（Tab/ゲームパッド）でしか立たない——マウスクリックは
			pointerdownでhv()を呼ぶだけでフォーカスの輪には乗せない。一方bluesnovelはspan自身が
			DOM上でtabIndexを持つため、クリックしただけでネイティブのfocusが乗ってしまい、
			素の:focusで判定すると「クリック後マウスを離しても色が戻らない」ことになる
			（sn_gallery ch_buttonで発覚）。キー操作由来かどうかはFocusMng.tsがmodalityを見て
			付け外しするdata-focus-ringで判別できる（TxtLayer.tsxの待ちマーカーと同じ仕組み）ので、
			ここでも:focus単体でなく[data-focus-ring]:focusに絞る。
			既定のフォーカスリングは画面に合わないので消す。
			既定のホバーは本家 style_hover の fill:'white' 相当 */
		&:hover, &[data-focus-ring]:focus {${c?.style_hover ?? "color: white;"}}
		&:focus {outline: none;}
		/* 押下中。本家の既定は style_hover ＋ dropShadow:false ＝影を消す */
		&:active {${c?.style_clicked ?? "text-shadow: none;"}}
		/* 画像ボタンのコマ送り。絵は「通常｜押下｜ホバー」を横に3コマ並べた1枚で
			（本家 Button.ts:269 が幅を3等分して張り替える）、背景を3倍幅に敷いてあるので
			background-position-x の 0%／50%／100% がちょうど各コマの左端に当たる。
			**上の状態別ルールより後ろに置く**（同じ強さなら後勝ち） */
		${c?.pic ? "\n			background-position-x: 0%;\n			&:hover, &:focus {background-position-x: 100%;}\n			&:active {background-position-x: 50%;}\n		" : ""}
		/* 背景画像（[button b_pic=…]）。本家は文字スプライトの背後へ絵を**中央合わせ**で置く
			（Button.ts:249-257：sp位置はtxtの原点基準、pivotに(sp-txt)/2を使うことでtxt中心に
			絵を揃える）。**要素本体ではなく疑似要素::beforeに置く**のがポイント：fit倍率
			（scale）は本体（箱）ではなく文字だけを包むtxtRef側に掛けているので、背景をtxtRefの
			中ではなく箱側の::beforeに置くことで、fitに引きずられず絵の実寸のまま中央に留まる
			（逆倍率で打ち消す必要は無い。以前はfitが箱側にもあったため打ち消しが要ったが、
			2026-08-24のfit二重スケール修正で箱側から抜いた）。
			ow/ohは**箱＝文字の既定サイズ**（btnBoxSizeはb_picでは広げない、上のコメント参照）。
			本家のtxt.width/heightに当たる */
		${c?.b_pic && c.b_src ? (() => {
		let e = C?.w ?? 0, t = C?.h ?? 0, { w: n, h: r } = Pu(c, b), i = (n - e) / 2, a = (r - t) / 2;
		return `
				&::before {
					content: '';
					position: absolute;
					left: ${String(i)}px;
					top: ${String(a)}px;
					width: ${String(e)}px;
					height: ${String(t)}px;
					background-image: url("${c.b_src}");
					background-repeat: no-repeat;
					z-index: -1;
					pointer-events: none;
				}
			`;
	})() : ""}
	`, A = Mu`
		display: inline-block;
		padding: 5px;
	`, j = (e, t) => {
		if (!m) return;
		let n = c?.[e];
		n && f(n, c?.[t] ?? "SYS");
	}, M = () => {
		if (s) {
			d(s);
			return;
		}
		u(t, n ?? !1, r, a);
	}, N = (e) => {
		e.stopPropagation(), m && (Au.hide(), j("clickse", "clicksebuf"), M());
	}, P = () => {
		c?.hint && Au.show(g.current, c.hint, c.hint_style, c.hint_opt);
	};
	return /* @__PURE__ */ k("span", {
		css: O,
		style: c ? Fu(c, b) : void 0,
		ref: g,
		role: "button",
		tabIndex: m ? 0 : -1,
		onClick: N,
		onKeyDown: (e) => {
			(e.key === "Enter" || e.key === " ") && (e.stopPropagation(), e.preventDefault(), m && (Au.hide(), j("clickse", "clicksebuf"), M()));
		},
		onMouseEnter: () => {
			P(), j("enterse", "entersebuf"), m && c?.onenter && p(c.onenter, r);
		},
		onMouseLeave: () => {
			Au.hide(), j("leavese", "leavesebuf"), m && c?.onleave && p(c.onleave, r);
		},
		onFocus: P,
		onBlur: () => Au.hide(),
		children: [/* @__PURE__ */ I("span", {
			css: A,
			ref: _,
			style: E.x !== 1 || E.y !== 1 ? { transform: `scale(${String(E.x)}, ${String(E.y)})` } : void 0,
			children: e
		}), i.masume && /* @__PURE__ */ I("span", { style: {
			position: "absolute",
			inset: 0,
			boxSizing: "border-box",
			background: "rgba(136, 51, 136, 0.2)",
			border: "1px solid rgb(136, 51, 136)",
			pointerEvents: "none"
		} })]
	});
}
//#endregion
//#region src/components/TxtLayer.tsx
function Lu({ cmn: { styChild: e, isDesignMode: t }, sty: n, nm: r, isFore: a, str: s, aCh: c, clrGen: u, ffs: d, noffs: f, bura: p, kinsoku_sol: _, kinsoku_eol: y, kinsoku_dns: b, kinsoku_bura: x, r_align: S, break_fixed: T, break_fixed_left: E, break_fixed_top: D, b_color: O, b_alpha: A, b_alpha_isfixed: j, b_src: M, styTxt: P, pl: F, pr: L, pt: R, pb: z, enabled: B, aBtn: ee, in_style: ne, out_style: U, onActivate: W, onNavigate: re, onSe: ie, onHoverCall: ae }) {
	let oe = w((e) => e.isReadBack), se = w((e) => e.styPaging), ce = w((e) => e.isTyping), le = w((e) => e.setIsTyping), ue = w((e) => e.skipReq), de = w((e) => e.skipping), fe = w((e) => e.wait), pe = w((e) => e.hChIn), me = w((e) => e.hChOut), he = w((e) => e.chWait), ge = w((e) => e.autowc), [_e, ve] = (0, H.useState)(null);
	(0, H.useEffect)(() => {
		if (!M) {
			ve(null);
			return;
		}
		let e = !0, t = new Image();
		return t.onload = () => {
			e && ve({
				w: t.naturalWidth,
				h: t.naturalHeight
			});
		}, t.src = M, () => {
			e = !1;
		};
	}, [M]);
	let ye = {
		..._e && (!("width" in n) || !("height" in n)) ? {
			...n,
			..."width" in n ? {} : { width: `${String(_e.w)}px` },
			..."height" in n ? {} : { height: `${String(_e.h)}px` }
		} : n,
		...F === void 0 ? {} : { paddingLeft: `${String(F)}px` },
		...L === void 0 ? {} : { paddingRight: `${String(L)}px` },
		...R === void 0 ? {} : { paddingTop: `${String(R)}px` },
		...z === void 0 ? {} : { paddingBottom: `${String(z)}px` }
	}, be = (0, H.useRef)(null), xe = (0, H.useRef)(null), Se = (0, H.useRef)(null), Ce = (e) => {
		if (e.url) {
			re(e.url);
			return;
		}
		W(e.label, e.call, e.fn, e.arg);
	}, we = (0, H.useRef)([]), Te = (0, H.useRef)([]), Ee = (0, H.useRef)([]), De = (0, H.useRef)(0), Oe = (0, H.useRef)(u), ke = (0, H.useRef)([]), Ae = (0, H.useRef)(null), je = (0, H.useCallback)(() => {
		let e = Ae.current;
		if (e) {
			Ae.current = null;
			for (let t of e.anims) t.cancel();
			e.el.remove();
		}
	}, []), Me = (0, H.useCallback)((e, t, n) => {
		let r = be.current, i = xe.current;
		if (!r || !i || e.length === 0) return;
		je();
		let a = document.createElement("span");
		a.dataset.erase = "1", a.style.position = "absolute";
		let o = globalThis.getComputedStyle(r);
		for (a.style.inset = `${o.paddingTop} ${o.paddingRight} ${o.paddingBottom} ${o.paddingLeft}`, a.style.pointerEvents = "none"; i.firstChild;) a.appendChild(i.firstChild);
		r.appendChild(a);
		let s = [];
		if (e.forEach((e, r) => {
			let i = me[t[r]?.cos ?? U ?? "default"] ?? l;
			if (i.wait <= 0) {
				e.style.display = "none";
				return;
			}
			let { keyframes: a, options: o } = v(i);
			s.push(e.animate(a, {
				...o,
				delay: i.join ? n[r] ?? 0 : 0
			}));
		}), s.length === 0) {
			a.remove();
			return;
		}
		Ae.current = {
			el: a,
			anims: s
		}, Promise.allSettled(s.map((e) => e.finished)).then(() => {
			Ae.current?.el === a && je();
		});
	}, [
		me,
		U,
		je
	]);
	(0, H.useEffect)(() => je, [je]);
	let Ne = (0, H.useCallback)((e) => d ? RegExp(`[　${f ?? ""}]`).test(e) ? "" : d : "", [d, f]), Pe = (0, H.useMemo)(() => new C({
		sol: _,
		eol: y,
		dns: b,
		bura: x
	}), [
		_,
		y,
		b,
		x
	]), Fe = () => !!be.current && globalThis.getComputedStyle(be.current).writingMode.startsWith("vertical");
	(0, H.useLayoutEffect)(() => {
		if (!i.masume) return;
		let e = be.current, t = Se.current;
		if (!e || !t) return;
		let n = globalThis.getComputedStyle(e);
		t.style.inset = `${n.paddingTop} ${n.paddingRight} ${n.paddingBottom} ${n.paddingLeft}`;
	}, [
		F,
		L,
		R,
		z,
		P
	]);
	let [Ie, Le] = (0, H.useState)({
		l: 16,
		t: 16
	});
	(0, H.useLayoutEffect)(() => {
		if (!T) return;
		let e = be.current;
		if (!e) return;
		let t = globalThis.getComputedStyle(e), n = parseFloat(t.paddingLeft) || 0, r = parseFloat(t.paddingTop) || 0;
		Le((e) => e.l === n && e.t === r ? e : {
			l: n,
			t: r
		});
	}, [
		T,
		F,
		R,
		P
	]), (0, H.useLayoutEffect)(() => {
		let e = xe.current;
		if (!e) return;
		++De.current;
		for (let e of Ee.current) e.cancel();
		Ee.current = [];
		let t = Oe.current !== u;
		Oe.current = u;
		let n = Te.current, r = Math.min(n.length, c.length), a = 0;
		if (!t) for (; a < r && n[a].c === c[a].c && n[a].r === c[a].r && n[a].s === c[a].s && n[a].rs === c[a].rs;) ++a;
		we.current.length > 0 && a < we.current.length && !oe && !de && (Me(we.current, Te.current, ke.current), we.current = [], Te.current = [], ke.current = [], e.textContent = ""), a < r && (we.current = [], Te.current = [], ke.current = [], e.textContent = ""), e.querySelectorAll(":scope > br").forEach((e) => e.remove());
		let o = we.current, s = Math.min(c.length, o.length);
		for (; e.childNodes.length > s;) e.removeChild(e.lastChild);
		for (; e.childNodes.length < s;) e.appendChild(o[e.childNodes.length]);
		if (c.length <= o.length) {
			zu(e, o, Te.current, Pe, p ?? !1, Fe()), le(!1);
			return;
		}
		let l = c.slice(o.length), d = document.createDocumentFragment(), f = l.map((e) => {
			let t = document.createElement("span");
			return t.style.display = e.c === "\n" ? "inline" : "inline-block", i.masume && (t.style.outline = "1px solid rgb(255, 51, 0)", t.style.backgroundColor = "rgba(102, 204, 255, 0.5)"), t.appendChild(Vu(e, S, Ce, Ne, ie, ae)), d.appendChild(t), t;
		});
		Te.current = [...Te.current, ...l], o.push(...f), e.appendChild(d);
		{
			let e = 0;
			for (let t of l) {
				let n = pe[t.cis ?? ne ?? "default"] ?? m, r = t.w ?? (ge.enabled ? ge.h[t.c.at(0) ?? ""] ?? 0 : he);
				n.join && (e += r), ke.current.push(n.join ? e : 0);
			}
		}
		if (zu(e, o, Te.current, Pe, p ?? !1, Fe()), oe || de) {
			le(!1);
			return;
		}
		let h = De.current, _ = 0, v = [];
		if (f.forEach((e, t) => {
			let n = l[t], r = pe[n.cis ?? ne ?? "default"] ?? m, i = n.w ?? (ge.enabled ? ge.h[n.c.at(0) ?? ""] ?? 0 : he);
			if (r.join && (_ += i / 1e3), r.wait <= 0) return;
			let { keyframes: a, options: o } = g(r);
			v.push(e.animate(a, {
				...o,
				delay: (r.join ? _ : 0) * 1e3
			}));
		}), v.length === 0) {
			le(!1);
			return;
		}
		Ee.current = v, le(!0), Promise.allSettled(v.map((e) => e.finished)).then(() => {
			De.current === h && le(!1);
		});
	}, [
		c,
		u,
		oe,
		Ne,
		ne,
		pe,
		he,
		ge,
		p,
		Pe,
		S
	]), (0, H.useEffect)(() => {
		for (let e of Ee.current) e.playState !== "finished" && e.finish();
		let e = Ae.current;
		if (e) for (let t of e.anims) t.playState !== "finished" && t.finish();
	}, [ue]);
	let Re = fe?.src ?? "", ze = Re.endsWith(".json"), [Be, Ve] = (0, H.useState)(void 0);
	(0, H.useEffect)(() => {
		if (!ze) {
			Ve(void 0);
			return;
		}
		let e = !0;
		return V(Re).then((t) => {
			e && Ve(t);
		}), () => {
			e = !1;
		};
	}, [Re, ze]);
	let He = a && !oe && !ce && fe !== null && fe.nm === r, Ue = He && fe.kind !== "waitclick", We = Ue && (!!Be || !!Re && !ze), Ge = He && B, [Ke, qe] = (0, H.useState)(!1);
	(0, H.useLayoutEffect)(() => {
		let e = be.current;
		qe(!!e && globalThis.getComputedStyle(e).writingMode.startsWith("vertical"));
	}, [P, n]);
	let Je = Mu`
		display: inline-block;
		/* **論理プロパティで書く**。縦書き（writing-mode: vertical-rl）では margin-left が
			「次の行の方向」＝横へのずらしになってしまい、マークだけ本文から離れて隣の列へ寄る。
			margin-inline-start なら横書きでは左、縦書きでは上——どちらでも「直前の文字の次」になる。
			**[lay break_fixed=true]（固定位置）のときは足さない**——絶対配置で座標を直に置くので
			流れの中のアキは不要（本家も #cntBreak を position.set で置くだけ。Hyphenation.ts:223-225） */
		${T ? "" : "margin-inline-start: 0.15em;"}
		/* **縦書きでは書字方向に合わせてマークも回す**（-90°）。背景画像も<img>も
			writing-modeでは回らないので、横書き用に描かれた▼（次の行の方向を指す絵）が
			縦書きでもそのまま下を向いてしまう。本家は待ちマークを本文とは別のpixiコンテナへ
			固定位置で置くのでこの問題が出ないが、こちらは本文の流れの中（ぶら下げ位置）に
			置いているため、向きが本文と食い違うと目立つ。
			**一度「writing-modeの継承だけで自動的に回って見える」と誤認してrotateを外したことが
			あるが、実機検証で回転していないことを確認済み（inline-blockの中身は横書きのまま描画
			される。orthogonal flowが効くのは子要素自身がwriting-modeを持つ場合で、この要素は
			継承しているだけなので該当しない）。2026-08-26 復元 */
		${Ke ? "rotate: -90deg;" : ""}
		/* [waitclick]用プロキシ、および[l]/[p]でbreakline/breakpage未指定のときは中身が空
			（マーカーなし、本家準拠）。中身が無いinline-blockは0x0になりFocusMng.#canFocus()の
			getClientRects()判定に落ちてフォーカスできなくなるため、widthやheightが明示されて
			いない時だけ最小の当たり判定を確保する（見た目には出さない） */
		${!We && fe?.width === void 0 && fe?.height === void 0 ? "min-inline-size: 1em; min-block-size: 1em;" : ""}
		/* マウスクリックのネイティブなtabIndexフォーカスではブラウザ既定の矩形を出さない
			（todo.md「格好悪い」対応）。ゲームパッド／矢印キーでの移動は分かりやすさのため出したい
			ので、キー操作由来のときだけ立つdata-focus-ring（FocusMng.ts）がある時に限り出す */
		outline: none;
		&[data-focus-ring]:focus {
			outline: 2px solid Highlight;
			outline-offset: 2px;
		}
	`, Ye = (0, H.useRef)(null), Xe = (0, H.useRef)(!1);
	(0, H.useEffect)(() => {
		let e = Ye.current;
		if (!(!e || !Ge)) return o.add(e), Xe.current && (Xe.current = !1, e.focus()), () => {
			Xe.current = o.isFocus(e), o.remove(e);
		};
	}, [Ge]);
	let Ze = (e) => {
		(e.key === "Enter" || e.key === " ") && (e.stopPropagation(), e.preventDefault(), Ye.current?.dispatchEvent(new MouseEvent("click", { bubbles: !0 })));
	}, Qe = {
		...fe?.width === void 0 ? {} : { width: `${String(fe.width)}px` },
		...fe?.height === void 0 ? {} : { height: `${String(fe.height)}px` },
		...T ? {
			position: "absolute",
			left: `${String(Ie.l + (E ?? 0))}px`,
			top: `${String(Ie.t + (D ?? 0))}px`
		} : {},
		...fe?.x !== void 0 || fe?.y !== void 0 ? { translate: `${String(fe?.x ?? 0)}px ${String(fe?.y ?? 0)}px` } : {}
	}, $e = Mu`
		display: flex;
		flex-wrap: wrap;
		top: 70%;
		isolation: isolate;
		${B ? "" : "pointer-events: none;"}
	`, { display: et, opacity: tt, mixBlendMode: nt, filter: rt } = n, it = {
		...et === void 0 ? {} : { display: et },
		...tt === void 0 ? {} : { opacity: tt },
		...nt === void 0 ? {} : { mixBlendMode: nt },
		...rt === void 0 ? {} : { filter: rt }
	}, at = (e) => e.sty?.left !== void 0 || e.sty?.top !== void 0, ot = ee.filter((e) => !at(e)), st = ee.filter(at), ct = Mu`
		isolation: isolate;
		${B ? "" : "pointer-events: none;"}
	`, { r: lt, g: ut, b: dt } = Gu(O), ft = w((e) => e.backAlpha), pt = A * (j ? 1 : ft), mt = pt === 0 || O === void 0, ht = Mu`
		/* z-index:-1の::before（下記b_src分岐）を確実にこの要素の子として背面に留めるための
			スタッキングコンテキスト。以前はStage.tsxのsty4Moveableが全レイヤへ恒等transformを
			常時書いており、それが偶然スタッキングコンテキストを作っていたため気付かれていなかった。
			sty4Moveableをデザインモード時のみに限定した際にこれが失われ、b_picの背景画像が
			立ち絵レイヤの背後（コンテキストの外）へ回り込んで見えなくなる回帰を引き起こした。
			transformの副作用に頼らず、目的（背面固定）に合ったisolation: isolateで明示的に持たせる */
		isolation: isolate;
		/* **明示が要る**：sn_galleryなどBootstrapを読み込むホストは全称セレクタで
			box-sizing: border-box をグローバルに敷いており、何も書かなければこちらが
			それをそのまま継承してしまう（E2Eの自前テストアプリにはBootstrapが無いため
			気付かれなかった）。[lay width=/height=]は常に「中身の寸法」という設計
			（test/e2e/argdef.e2e.ts「pl/pr/pt/pbは文字表示領域の内側余白」参照）なので、
			border-boxのままだと明示指定時にpx値の意味が変わってしまう（2026-08-25発覚） */
		box-sizing: content-box;
		/* 本家 TxtLayer.ts:271-272（const padding = 16;）に合わせ4辺均一の16px。
			以前は1em 1.5em（上下24px・左右36px、非対称）だったが、本家と数値が食い違っており、
			masumeガイド枠（CmnLib.masume）の見え方が本家（緑と青がほぼ重なり太い青一色に
			見える）とbluesnovel（緑と青の間に明確な余白がある）で違って見える一因になっていた
			（2026-08-25、実機比較で発覚） */
		padding: 16px;
		/* 背景色に[lay b_alpha=...]をアルファチャンネルで反映。
			要素全体のopacityではなく背景色のアルファのみを下げるので、子要素（文字）の透過度には影響しない
			（レイヤ全体を透かしたい場合は[lay alpha=...]） */
		/* [lay b_pic=…]があればそれを背景画像にし、**b_colorは無視する**（本家と同じ規約）。
			枠画像は左上を原点にそのままの大きさで置く（本家もレイヤ左上に等倍で置き、
			文字表示領域のサイズを画像に合わせる）。b_alphaは画像・単色どちらにも効かせたいので、
			画像のときは要素のopacityではなく擬似要素で敷いて透過させる */
		background-color: ${mt || M ? "transparent" : `rgba(${lt}, ${ut}, ${dt}, ${pt})`};
		border: ${mt || M ? "none" : "dotted 6px #ffa500"};
		${M ? `
		&::before {
			content: '';
			position: absolute;
			left: 0; top: 0; right: 0; bottom: 0;
			background-image: url(${JSON.stringify(M)});
			background-repeat: no-repeat;
			background-position: left top;
			opacity: ${pt};
			pointer-events: none;
			z-index: -1;
		}` : ""}

		/* [add_lay class=txt]直後、[lay style=…]を一度も受けていない状態の既定フォントサイズ。
			本家 TxtLayer.ts:272 のコンストラクタ既定（24px）に合わせる。xxx-large（≒48px）のままだと
			下のwidthとの組み合わせで本文が箱から大きくはみ出す（sn_galleryのtopプロジェクトで発覚） */
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
		/* width/heightの既定は本家 TxtLayer.ts:272 のコンストラクタ既定に合わせステージいっぱい。
			widthは以前意図的に70%へ違えていたが、ch_button/sound/importでリンクがクリック不能になる
			実害や縦書き（line_breaking_rules）で本文がステージ左寄りに見える不具合の原因だったため、
			本家準拠へ戻した（2026-08-25）。heightは元々CSS既定のauto（＝内容量ぶんだけの高さ）の
			ままで、widthだけ直した直後の実機比較でmasumeガイド枠がステージ下端に届かない食い違いが
			見つかったため同時に揃えた。
			**widthプロパティ自体は指定せず、right: 0（下のheightも同様にbottom: 0）で表す**：
			bluesnovelのwidth/heightは常に「中身（文字表示領域）の寸法」で、paddingはその外側に
			足す設計（test/e2e/argdef.e2e.ts「pl/pr/pt/pbは文字表示領域の内側余白」参照）。
			width: calc(100% - 3em)のようにpaddingを差し引く固定値でも一度試したが、
			[lay style="padding-bottom: …px;"]でpaddingを個別変更するプロジェクト
			（sn_galleryのline_breaking_rules）でズレて逆にステージをはみ出した。
			right: 0ならtop/left:0と合わせて要素の外形が常にcontaining block（ステージ）
			いっぱいになり、paddingがどんな値でもbox-sizingに関わらず内側に自動で確保される
			（box-sizing: border-boxでpadding込み外形をステージに合わせる案も試したが、
			[lay width=/height=]やb_picの自然サイズ調整の「常に中身の寸法」という意味が
			壊れるため撤回した）。
			[lay width=/height=]明示時はLay.tsのstyLay()がインラインでpx指定するので、
			left+width+rightが揃うCSSの規則でrightは自動的に無視される（衝突しない） */
		right: 0;
		bottom: 0;
		white-space: pre-wrap;
		/* 文字色の既定は白（本家 TxtLayer.ts:272 のコンストラクタ既定styleがcolor: white）。
			inheritのままだと親の色（未指定なら黒）を継承してしまい、暗い背景画像に文字が
			埋もれて読めなくなる */
		color: white;
		/* [enable_event enabled=false]：**本文中の[link]もクリックを受けなくする**
			（本家は文字レイヤのコンテナごと ctn.interactiveChildren=false にするので、
			ボタンもリンクもまとめて効かなくなる。TxtLayer.ts:838）。
			クリックはステージへ抜けるので、読み進め自体は止まらない */
		${B ? "" : "pointer-events: none;"}

		/* [lay style="..."]。上の既定を後から上書きできるよう最後に置く */
		${P ?? ""}

		/* 読み戻り中の見た目（[page style=…]。既定は本家 INI_STYPAGE と同じ黄色＋黒フチ）。
			**[lay style=…]よりさらに後**に置く：本家は読み戻り中だけ全文字レイヤへこのCSSを
			当て直す（setAllStyle2TxtLay）ので、レイヤ自身が色を書いていても勝つ必要がある */
		${oe ? se : ""}
	`, gt = Mu`
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
	`, [_t, vt] = (0, H.useState)("");
	(0, H.useEffect)(() => vt(s), [s]);
	let yt = (0, H.useRef)(null), bt = (e, t) => {
		h(), e.transform = t;
	};
	return /* @__PURE__ */ k(N, { children: [
		/* @__PURE__ */ k("span", {
			css: [e, ht],
			ref: be,
			"data-lay": r,
			style: ye,
			children: [
				/* @__PURE__ */ I("span", { ref: xe }),
				i.masume && /* @__PURE__ */ k(N, { children: [/* @__PURE__ */ I("span", { style: {
					position: "absolute",
					inset: 0,
					boxSizing: "border-box",
					background: "rgba(51, 255, 0, 0.2)",
					border: "1px solid rgb(51, 255, 0)",
					pointerEvents: "none"
				} }), /* @__PURE__ */ I("span", {
					ref: Se,
					style: {
						position: "absolute",
						boxSizing: "border-box",
						background: "rgba(0, 51, 255, 0.2)",
						border: "2px solid rgb(0, 51, 255)",
						pointerEvents: "none"
					}
				})] }),
				He && /* @__PURE__ */ I("span", {
					ref: Ye,
					css: Je,
					style: Qe,
					...Ge ? {
						tabIndex: 0,
						onKeyDown: Ze,
						"data-wait-focus": !0
					} : {},
					children: Ue ? Be ? /* @__PURE__ */ I("span", { className: te(Be) }) : Re && !ze ? /* @__PURE__ */ I("img", {
						src: Re,
						style: {
							verticalAlign: "text-bottom",
							...fe.width !== void 0 || fe.height !== void 0 ? {
								width: "100%",
								height: "100%"
							} : {}
						}
					}) : null : null
				})
			]
		}),
		ot.length > 0 && /* @__PURE__ */ I("span", {
			css: [e, $e],
			"data-lay": r,
			style: it,
			children: ot.map((e) => /* @__PURE__ */ I(Iu, {
				text: e.text,
				label: e.label,
				call: e.call ?? !1,
				fn: e.fn ?? "",
				arg: e.arg,
				url: e.url,
				sty: e.sty,
				enabled: B,
				onActivate: W,
				onNavigate: re,
				onSe: ie,
				onHoverCall: ae
			}, e.nm))
		}),
		st.length > 0 && /* @__PURE__ */ I("span", {
			css: [e, ct],
			"data-lay": r,
			style: it,
			children: st.map((e) => /* @__PURE__ */ I(Iu, {
				text: e.text,
				label: e.label,
				call: e.call ?? !1,
				fn: e.fn ?? "",
				arg: e.arg,
				url: e.url,
				sty: e.sty,
				enabled: B,
				onActivate: W,
				onNavigate: re,
				onSe: ie,
				onHoverCall: ae
			}, e.nm))
		}),
		t && /* @__PURE__ */ I(uu, {
			target: be,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => bt(e, t),
			resizable: !0,
			keepRatio: !1,
			onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
				bt(e, r), e.width = `${t}px`, e.height = `${n}px`;
			},
			rotatable: !0,
			throttleRotate: 0,
			startDragRotate: 0,
			throttleDragRotate: 0,
			rotationPosition: "top",
			onRotate: ({ target: { style: e }, drag: { transform: t } }) => bt(e, t),
			originDraggable: !0,
			onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
				bt(e, n), e.transformOrigin = t;
			}
		}),
		t && /* @__PURE__ */ k(N, { children: [/* @__PURE__ */ k("label", {
			css: gt,
			ref: yt,
			children: ["テキスト入力", /* @__PURE__ */ I("textarea", {
				rows: 3,
				value: _t,
				onChange: (e) => vt(e.target.value)
			})]
		}), /* @__PURE__ */ I(uu, {
			target: yt,
			origin: !1,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => bt(e, t),
			preventDefault: !1
		})] })
	] });
}
function Ru(e) {
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
function zu(e, t, n, r, i, a) {
	let { kc: o, idx: s, sub: c } = Ru(n);
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
function Bu(e, t, n) {
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
function Vu({ c: e, r: t, ra: n, s: r, rs: i, tcy: a, lnk: o, src: s, gw: c, gh: l, gx: u, gy: d }, f, p, m, h, g) {
	let _ = (e) => document.createTextNode(e === " " ? "\xA0" : e), v = m(e);
	if (t === void 0 && !r && !a && !o && !v && !s) return _(e);
	let y = document.createElement(t === void 0 ? "span" : "ruby");
	r && (y.style.cssText = r), v && (y.style.fontFeatureSettings = v);
	let b = a ? document.createElement("span") : y;
	a && (b.style.textCombineUpright = "all", y.appendChild(b));
	let x = Array.from(e);
	if (t !== void 0 && !a && !s && x.length > 1) for (let e of x) {
		let t = document.createElement("span");
		t.appendChild(_(e)), b.appendChild(t);
	}
	else b.appendChild(_(e));
	s && (Hu(b, s, {
		...c === void 0 ? {} : { gw: c },
		...l === void 0 ? {} : { gh: l },
		...u === void 0 ? {} : { gx: u },
		...d === void 0 ? {} : { gy: d }
	}), b !== y && y.appendChild(b));
	let S;
	if (t !== void 0) {
		S = document.createElement("rt");
		let r = n ?? f;
		S.style.cssText = (r ? Bu(e, t, r) : "") + (i ?? ""), S.textContent = t, y.appendChild(S);
	}
	return o && Wu(y, o, r ?? "", S, i ?? "", p, h, g), y;
}
function Hu(e, t, n) {
	if ((n.gw !== void 0 || n.gh !== void 0) && (e.style.display = "inline-block", e.style.verticalAlign = "text-bottom", n.gw !== void 0 && (e.style.width = `${String(n.gw)}px`), n.gh !== void 0 && (e.style.height = `${String(n.gh)}px`)), (n.gx !== void 0 || n.gy !== void 0) && (e.style.translate = `${String(n.gx ?? 0)}px ${String(n.gy ?? 0)}px`), !t.endsWith(".json")) {
		e.style.backgroundImage = `url(${JSON.stringify(t)})`, e.style.backgroundRepeat = "no-repeat", e.style.backgroundSize = "contain";
		return;
	}
	V(t).then((t) => {
		if (t) {
			if (n.gw === void 0 && n.gh === void 0) {
				let { width: n, height: r } = e.getBoundingClientRect();
				if (n > 0 && r > 0) {
					e.style.display = "inline-block", e.style.position = "relative", e.style.overflow = "hidden", e.style.width = `${String(n)}px`, e.style.height = `${String(r)}px`, e.style.verticalAlign = "text-bottom";
					let i = document.createElement("span");
					i.classList.add(te(t)), i.style.position = "absolute", i.style.left = "0", i.style.top = "0", i.style.transformOrigin = "top left", i.style.transform = `scale(${String(n / t.boxW)}, ${String(r / t.boxH)})`, e.appendChild(i);
				} else e.classList.add(te(t));
			} else e.classList.add(te(t));
		}
	});
}
var Uu = /* @__PURE__ */ new WeakMap();
function Wu(e, t, n, r, i, a, o, s) {
	e.style.cursor = "pointer", e.addEventListener("click", (e) => {
		e.stopPropagation(), Au.hide(), t.clickse && o(t.clickse, t.clicksebuf ?? "SYS"), a(t);
	});
	let c = Uu.get(t);
	c || (c = {
		members: [],
		hoverCnt: 0
	}, Uu.set(t, c));
	let l = c;
	if (l.members.push({
		el: e,
		sty: n,
		rSty: i,
		...r === void 0 ? {} : { rt: r }
	}), e.addEventListener("mouseenter", () => {
		if (l.hoverCnt++, !(l.hoverCnt > 1)) {
			for (let e of l.members) t.sh && (e.el.style.cssText = e.sty + t.sh), e.rt && t.rsh && (e.rt.style.cssText = e.rSty + t.rsh);
			t.hint && Au.show(e, t.hint, t.hs, t.ho), t.enterse && o(t.enterse, t.entersebuf ?? "SYS"), t.onenter && s(t.onenter, t.fn);
		}
	}), e.addEventListener("mouseleave", () => {
		l.hoverCnt--, queueMicrotask(() => {
			if (!(l.hoverCnt > 0)) {
				for (let e of l.members) t.sh && (e.el.style.cssText = e.sty, e.el.style.cursor = "pointer"), e.rt && t.rsh && (e.rt.style.cssText = e.rSty);
				Au.hide(), t.leavese && o(t.leavese, t.leavesebuf ?? "SYS"), t.onleave && s(t.onleave, t.fn);
			}
		});
	}), t.sc || t.rsc) {
		e.addEventListener("mousedown", () => {
			for (let e of l.members) t.sc && (e.el.style.cssText = e.sty + t.sc), e.rt && t.rsc && (e.rt.style.cssText = e.rSty + t.rsc);
		});
		let n = () => {
			for (let e of l.members) t.sc && (e.el.style.cssText = l.hoverCnt > 0 && t.sh ? e.sty + t.sh : e.sty, e.el.style.cursor = "pointer"), e.rt && t.rsc && (e.rt.style.cssText = l.hoverCnt > 0 && t.rsh ? e.rSty + t.rsh : e.rSty);
		};
		e.addEventListener("mouseup", n), e.addEventListener("mouseleave", () => queueMicrotask(n));
	}
}
function Gu(e) {
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
//#region src/components/PlgLayer.tsx
function Ku({ cmn: { styChild: e, isDesignMode: t }, sty: n, nm: r, attach: i }) {
	return /* @__PURE__ */ I(du, {
		styChild: e,
		isDesignMode: t,
		nm: r,
		sty: n,
		keepRatio: !1,
		children: /* @__PURE__ */ I("div", {
			ref: (e) => (i(e), () => {
				i(null);
			}),
			style: {
				width: "100%",
				height: "100%"
			}
		})
	});
}
//#endregion
//#region src/ts/Trans.ts
var qu = .04, Ju = 1e6;
function Yu(e, t = qu) {
	let n = t > 0 ? Math.min(1 / (2 * t), Ju) : Ju;
	return {
		slope: n,
		intercept: .5 - n * e
	};
}
//#endregion
//#region src/ts/Swipe.ts
function Xu(e, t, n, r) {
	let i = Math.abs(e), a = Math.abs(t), o = Math.max(25, Math.floor(.15 * n)), s = Math.max(25, Math.floor(.15 * r));
	if (i > o && i >= a) return e < 0 ? "swipeleft" : "swiperight";
	if (a > s && a > i) return t < 0 ? "swipeup" : "swipedown";
}
//#endregion
//#region src/components/Stage.tsx
var Zu = Mu`position: absolute; top: 0; left: 0;`, Qu = Mu`
	position: absolute; top: 0; left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
`, $u = (0, H.memo)(function({ idx: e, isFore: t, trans: n, aLay: r, cmn: a, scrMng: o, pgRef: s }) {
	let c = t || !!n;
	return /* @__PURE__ */ I("div", {
		ref: s,
		"data-page": t ? "fore" : "back",
		css: Qu,
		style: {
			backgroundColor: i.bgColor,
			zIndex: +!!t,
			visibility: c ? "visible" : "hidden",
			pointerEvents: t ? "auto" : "none",
			"--sn-ani-play": c ? "running" : "paused",
			...n?.ruleSrc && !n.glslSrc && t ? { mask: "url(#sn_rule_msk)" } : {}
		},
		children: r.map((n) => {
			let r = {
				...a.sty4Moveable,
				...p(n)
			};
			return f(n) ? /* @__PURE__ */ I(Su, {
				cmn: a,
				sty: r,
				nm: n.nm,
				fn: n.fn,
				src: n.src,
				isSheet: n.isSheet,
				isMovie: n.isMovie,
				aFace: n.aFace,
				aFx: n.aFx ?? [],
				fxActive: c,
				getVideoVol: () => o.getMovieVolume(),
				needClick2Play: () => o.needClick2Play()
			}, n.nm) : _(n) ? /* @__PURE__ */ I(Lu, {
				cmn: a,
				sty: r,
				nm: n.nm,
				isFore: t,
				str: n.str,
				aCh: n.aCh,
				clrGen: n.clrGen,
				ffs: n.ffs,
				noffs: n.noffs,
				bura: n.bura,
				kinsoku_sol: n.kinsoku_sol,
				kinsoku_eol: n.kinsoku_eol,
				kinsoku_dns: n.kinsoku_dns,
				kinsoku_bura: n.kinsoku_bura,
				r_align: n.r_align,
				break_fixed: n.break_fixed,
				break_fixed_left: n.break_fixed_left,
				break_fixed_top: n.break_fixed_top,
				b_color: n.b_color,
				b_alpha: n.b_alpha,
				b_alpha_isfixed: n.b_alpha_isfixed,
				b_src: n.b_src,
				styTxt: n.style,
				pl: n.pl,
				pr: n.pr,
				pt: n.pt,
				pb: n.pb,
				enabled: n.enabled,
				aBtn: n.aBtn,
				in_style: n.in_style,
				out_style: n.out_style,
				onActivate: (e, t, n, r) => o.jumpToLabelAndGo(e, t, n, r),
				onNavigate: (e) => o.navigateTo(e),
				onSe: (e, t) => o.playButtonSe(e, t),
				onHoverCall: (e, t) => o.hoverCall(e, t)
			}, n.nm) : /* @__PURE__ */ I(Ku, {
				cmn: a,
				sty: r,
				nm: n.nm,
				attach: (t) => {
					o.attachPlgBox(n.nm, e, t);
				}
			}, n.nm);
		})
	});
});
function ed({ arg: { heStage: e, sys: t, scrMng: n }, onClick: r, prev: a, next: o }) {
	let l = w((e) => e.aPage), p = w((e) => e.foreIdx), m = w((e) => e.trans), h = (0, H.useRef)(null), g = (0, H.useRef)(null), _ = [h, g], v = (0, H.useRef)(null), C = (0, H.useRef)(null), T = (0, H.useRef)(null);
	(0, H.useEffect)(() => {
		C.current !== null && cancelAnimationFrame(C.current), C.current = null;
		for (let e of [h.current, g.current]) e && (e.getAnimations().forEach((e) => e.cancel()), e.style.opacity = "");
		if (!m) return;
		let e = _[p].current;
		if (!e) return;
		if (m.glslSrc) {
			let { glslSrc: e, time: t, vague: r, ruleSrc: i, aLayNm: a } = m, o = performance.now(), s = v.current, c = B.current, u = 1 - p, d = (a ? l[u].map((e) => a.includes(e.nm) ? e : l[p].find((t) => t.nm === e.nm) ?? e) : l[u]).filter(f).flatMap((e) => [e.src, ...e.aFace.map((e) => e.src)].filter((e) => e !== "")), h = null, g = !1;
			return s && c && import("./TransGlsl.js").then(async ({ runGlslTrans: n }) => {
				let a = await n({
					stageEl: c,
					holder: s,
					glslSrc: e,
					time: t,
					backSrcs: d,
					vague: r ?? .04,
					...i ? { ruleSrc: i } : {},
					t0: o
				});
				g ? a() : h = a;
			}).catch((e) => n.myTrace(`[trans glsl=] ${e instanceof Error ? e.message : String(e)}`, "E")), () => {
				g = !0, h?.();
			};
		}
		if (!m.ruleSrc) {
			e.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: m.time,
				easing: "linear",
				fill: "forwards"
			});
			return;
		}
		let t = (e) => {
			let t = T.current;
			if (!t) return;
			let { slope: n, intercept: r } = Yu(e, m.vague);
			t.setAttribute("slope", String(n)), t.setAttribute("intercept", String(r));
		};
		t(0);
		let r = performance.now(), i = (e) => {
			let n = m.time <= 0 ? 1 : Math.min((e - r) / m.time, 1);
			t(n), n < 1 && (C.current = requestAnimationFrame(i));
		};
		C.current = requestAnimationFrame(i);
	}, [m]);
	let E = w((e) => e.quake), D = (0, H.useRef)(null);
	(0, H.useEffect)(() => {
		D.current !== null && cancelAnimationFrame(D.current), D.current = null;
		let e = [h.current, g.current].filter((e) => e !== null);
		if (!E) {
			for (let t of e) t.style.transform = "";
			return;
		}
		let { hmax: t, vmax: n } = E, r = () => {
			let i = t === 0 ? 0 : Math.round(Math.random() * t * 2) - t, a = n === 0 ? 0 : Math.round(Math.random() * n * 2) - n;
			for (let t of e) t.style.transform = `translate(${String(i)}px, ${String(a)}px)`;
			D.current = requestAnimationFrame(r);
		};
		D.current = requestAnimationFrame(r);
	}, [E]);
	let O = e.parentElement !== document.body, [A, j] = (0, H.useState)(nd(e, O));
	ce(() => {
		function t() {
			j(nd(e, O));
		}
		return globalThis.addEventListener("resize", t), () => globalThis.removeEventListener("resize", t);
	});
	let { cvsScale: P } = td(A, O), { stageW: F, stageH: L } = i, B = (0, H.useRef)(null), ee = w((e) => e.fullScr), V = w((e) => e.setFullScr), te = w((e) => e.toggleFullScr);
	ie((0, H.useRef)(e), ee, { onClose: () => V(!1) });
	let [ne, W] = (0, H.useState)(() => !!document.fullscreenElement);
	(0, H.useEffect)(() => {
		let e = () => W(!!document.fullscreenElement);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []), (0, H.useEffect)(() => {
		n.setFullScr(ne);
	}, [ne]), (0, H.useLayoutEffect)(() => {
		ne ? (e.style.width = "", e.style.height = "", e.style.display = "", e.style.alignItems = "", e.style.justifyContent = "", e.style.backgroundColor = "black") : (e.style.width = `${String(F * P)}px`, e.style.height = `${String(L * P)}px`, e.style.display = "", e.style.alignItems = "", e.style.justifyContent = "", e.style.backgroundColor = ""), e.style.overflow = "hidden";
	}, [
		P,
		F,
		L,
		ne
	]);
	let re = Mu`
		position: relative;
		width: ${F}px;
		height: ${L}px;
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
	`, ae = Mu`
		position: absolute; top: 0; left: 0;
		width: 100%; height: 100%;
		z-index: 2;
		pointer-events: none;
	`, oe = Mu`
		position: absolute; top: 0; left: 0;
		width: 100%; height: 100%;
		z-index: 1;
		pointer-events: none;
	`, le = Mu`
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
	`, ue = (0, H.useRef)(null);
	ce(() => {
		n.attachFrameBox(ue.current), n.attachStageBox(B.current);
	}), ce(() => {
		let e = B.current;
		e.addEventListener("mousedown", () => y());
		let t = (e) => {
			e.preventDefault(), e.deltaY < 0 ? o() : a();
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	});
	let [de, fe] = U(!1);
	se((e) => {
		e.stopPropagation(), z(), !d() && (fe(), R(!de));
	}, {
		isPreventDefault: !0,
		delay: 300
	});
	let pe = (0, H.useRef)(null);
	function me(e) {
		pe.current = {
			x: e.clientX,
			y: e.clientY
		};
	}
	function he(e) {
		let t = pe.current;
		if (pe.current = null, !t || de) return;
		let r = B.current.getBoundingClientRect(), i = Xu(e.clientX - t.x, e.clientY - t.y, r.width, r.height);
		i && (z(), n.fireEvent((e.pointerType === "mouse" ? M(e.nativeEvent) : "") + i));
	}
	let ge = (() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of l) for (let n of t) if (n.aFlt) for (let t of s(n.aFlt)) e.set(u(t), t);
		return [...e.values()];
	})(), _e = (() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of l) for (let n of t) if (n.aFlt) for (let t of S(n.aFlt)) e.set(c(t), t);
		return [...e.values()];
	})(), ve = (0, H.useMemo)(() => ({
		sys: t,
		styChild: Zu,
		isDesignMode: de,
		sty4Moveable: de ? {
			maxWidth: "auto",
			maxHeight: "auto",
			minWidth: "auto",
			minHeight: "auto",
			transform: "translate(0px, 0px) rotate(0deg)"
		} : {}
	}), [t, de]);
	return /* @__PURE__ */ k("div", {
		css: re,
		onClick: r,
		onPointerDown: me,
		onPointerUp: he,
		ref: B,
		children: [
			m?.ruleSrc && !m.glslSrc && /* @__PURE__ */ I("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ k("defs", { children: [/* @__PURE__ */ k("filter", {
					id: "sn_rule_flt",
					colorInterpolationFilters: "sRGB",
					children: [/* @__PURE__ */ I("feColorMatrix", {
						type: "matrix",
						values: "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0"
					}), /* @__PURE__ */ I("feComponentTransfer", { children: /* @__PURE__ */ I("feFuncA", {
						ref: T,
						type: "linear",
						slope: "1",
						intercept: "0"
					}) })]
				}), /* @__PURE__ */ I("mask", {
					id: "sn_rule_msk",
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: F,
					height: L,
					children: /* @__PURE__ */ I("image", {
						href: m.ruleSrc,
						x: "0",
						y: "0",
						width: F,
						height: L,
						preserveAspectRatio: "none",
						filter: "url(#sn_rule_flt)"
					})
				})] })
			}),
			ge.length > 0 && /* @__PURE__ */ I("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ I("defs", { children: ge.map((e) => /* @__PURE__ */ I("filter", {
					id: u(e),
					colorInterpolationFilters: "sRGB",
					x: "0",
					y: "0",
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ I("feColorMatrix", {
						type: "matrix",
						values: x(e)
					})
				}, u(e))) })
			}),
			_e.length > 0 && /* @__PURE__ */ I("svg", {
				width: "0",
				height: "0",
				style: { position: "absolute" },
				"aria-hidden": !0,
				children: /* @__PURE__ */ I("defs", { children: _e.map((e) => /* @__PURE__ */ I("filter", {
					id: c(e),
					children: /* @__PURE__ */ I("feGaussianBlur", { stdDeviation: b(e) })
				}, c(e))) })
			}),
			de && /* @__PURE__ */ k(N, { children: [
				/* @__PURE__ */ I("button", {
					onClick: () => te(),
					css: le,
					children: "FullScr"
				}),
				/* @__PURE__ */ I("button", {
					onClick: () => {},
					css: le,
					children: "Back"
				}),
				/* @__PURE__ */ I("button", {
					onClick: () => {},
					css: le,
					children: "Prev"
				})
			] }),
			/* @__PURE__ */ I("span", { children: ne }),
			l.map((e, t) => {
				let r = m?.aLayNm && t !== p ? e.map((e) => m.aLayNm.includes(e.nm) ? e : l[p].find((t) => t.nm === e.nm) ?? e) : e;
				return /* @__PURE__ */ I($u, {
					idx: t,
					isFore: t === p,
					trans: m,
					aLay: r,
					cmn: ve,
					scrMng: n,
					pgRef: _[t]
				}, t);
			}),
			/* @__PURE__ */ I("div", {
				ref: v,
				css: oe
			}),
			/* @__PURE__ */ I("div", {
				ref: ue,
				css: ae
			})
		]
	});
}
function td({ width: e, height: t }, a) {
	let o = 0, s = 0, c = 1;
	return a ? (o = Math.min(e, i.stageW), s = n(i.stageH / i.stageW * o), c = o / i.stageW) : r(i.hDip, "expanding", !0) || i.stageW > e || i.stageH > t ? (i.stageW / i.stageH <= e / t ? (s = t, o = n(i.stageW / i.stageH * t)) : (o = e, s = n(i.stageH / i.stageW * e)), c = o / i.stageW) : (o = i.stageW, s = i.stageH, c = 1), {
		cvsScale: c,
		cvsWidth: o,
		cvsHeight: s
	};
}
function nd(e, t) {
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
export { ed as default };

//# sourceMappingURL=Stage.js.map