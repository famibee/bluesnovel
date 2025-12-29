import { r as __toESM, t as __commonJSMin } from "./chunk.js";
import { t as BaseMemento } from "./Memento.js";
import { t as require_react } from "./react.js";
import { a as createEmotionProps, c as require_hoist_non_react_statics_cjs, d as noop, f as off, i as Emotion$1, l as useEffectOnce_default, m as useStore, n as jsx$1, o as hasOwn, onLong, p as on, r as jsxs, s as serializeStyles, setDesignMode, t as Fragment, u as isBrowser } from "./Main.js";
import { r as uint, t as CmnLib } from "./CmnLib.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
var import_react = /* @__PURE__ */ __toESM(require_react()), toggleReducer = function(e, t) {
	return typeof t == "boolean" ? t : !e;
}, useToggle_default = function(e) {
	return (0, import_react.useReducer)(toggleReducer, e);
}, useIsomorphicLayoutEffect_default = isBrowser ? import_react.useLayoutEffect : import_react.useEffect, import_screenfull = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((e, t) => {
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
})))()), useFullscreen_default = function(e, t, n) {
	n === void 0 && (n = {});
	var r = n.video, i = n.onClose, a = i === void 0 ? noop : i, c = (0, import_react.useState)(t), l = c[0], u = c[1];
	return useIsomorphicLayoutEffect_default(function() {
		if (t && e.current) {
			var n = function() {
				r?.current && off(r.current, "webkitendfullscreen", n), a();
			}, i = function() {
				if (import_screenfull.default.isEnabled) {
					var e = import_screenfull.default.isFullscreen;
					u(e), e || a();
				}
			};
			if (import_screenfull.default.isEnabled) {
				try {
					import_screenfull.default.request(e.current), u(!0);
				} catch (e) {
					a(e), u(!1);
				}
				import_screenfull.default.on("change", i);
			} else r && r.current && r.current.webkitEnterFullscreen ? (r.current.webkitEnterFullscreen(), on(r.current, "webkitendfullscreen", n), u(!0)) : (a(), u(!1));
			return function() {
				if (u(!1), import_screenfull.default.isEnabled) try {
					import_screenfull.default.off("change", i), import_screenfull.default.exit();
				} catch {}
				else r && r.current && r.current.webkitExitFullscreen && (off(r.current, "webkitendfullscreen", n), r.current.webkitExitFullscreen());
			};
		}
	}, [
		t,
		r,
		e
	]), l;
}, isTouchEvent = function(e) {
	return "touches" in e;
}, preventDefault = function(e) {
	isTouchEvent(e) && e.touches.length < 2 && e.preventDefault && e.preventDefault();
}, useLongPress_default = function(e, t) {
	var n = t === void 0 ? {} : t, r = n.isPreventDefault, i = r === void 0 ? !0 : r, a = n.delay, o = a === void 0 ? 300 : a, c = (0, import_react.useRef)(), l = (0, import_react.useRef)(), u = (0, import_react.useCallback)(function(t) {
		i && t.target && (on(t.target, "touchend", preventDefault, { passive: !1 }), l.current = t.target), c.current = setTimeout(function() {
			return e(t);
		}, o);
	}, [
		e,
		o,
		i
	]), d = (0, import_react.useCallback)(function() {
		c.current && clearTimeout(c.current), i && l.current && off(l.current, "touchend", preventDefault);
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
}, useMount_default = function(e) {
	useEffectOnce_default(function() {
		e();
	});
};
function some(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return !0;
	return !1;
}
function find$1(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return e[r];
	return null;
}
function getUserAgentString(e) {
	var t = e;
	if (t === void 0) {
		if (typeof navigator > "u" || !navigator) return "";
		t = navigator.userAgent || "";
	}
	return t.toLowerCase();
}
function execRegExp(e, t) {
	try {
		return new RegExp(e, "g").exec(t);
	} catch {
		return null;
	}
}
function hasUserAgentData() {
	if (typeof navigator > "u" || !navigator || !navigator.userAgentData) return !1;
	var e = navigator.userAgentData, t = e.brands || e.uaList;
	return !!(t && t.length);
}
function findVersion(e, t) {
	var n = execRegExp("(" + e + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", t);
	return n ? n[3] : "";
}
function convertVersion(e) {
	return e.replace(/_/g, ".");
}
function findPreset(e, t) {
	var n = null, r = "-1";
	return some(e, function(e) {
		var i = execRegExp("(" + e.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", t);
		return !i || e.brand ? !1 : (n = e, r = i[3] || "-1", e.versionAlias ? r = e.versionAlias : e.versionTest && (r = findVersion(e.versionTest.toLowerCase(), t) || r), r = convertVersion(r), !0);
	}), {
		preset: n,
		version: r
	};
}
function findPresetBrand(e, t) {
	var n = {
		brand: "",
		version: "-1"
	};
	return some(e, function(e) {
		var r = findBrand(t, e);
		return r ? (n.brand = e.id, n.version = e.versionAlias || r.version, n.version !== "-1") : !1;
	}), n;
}
function findBrand(e, t) {
	return find$1(e, function(e) {
		var n = e.brand;
		return execRegExp("" + t.test, n.toLowerCase());
	});
}
var BROWSER_PRESETS = [
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
], CHROMIUM_PRESETS = [
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
], WEBKIT_PRESETS = [{
	test: "applewebkit",
	id: "webkit",
	versionTest: "applewebkit|safari"
}], WEBVIEW_PRESETS = [
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
], OS_PRESETS = [
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
function isWebView(e) {
	return !!findPreset(WEBVIEW_PRESETS, e).preset;
}
function getLegacyAgent(e) {
	var t = getUserAgentString(e), n = !!/mobi/g.exec(t), r = {
		name: "unknown",
		version: "-1",
		majorVersion: -1,
		webview: isWebView(t),
		chromium: !1,
		chromiumVersion: "-1",
		webkit: !1,
		webkitVersion: "-1"
	}, i = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	}, a = findPreset(BROWSER_PRESETS, t), o = a.preset, s = a.version, c = findPreset(OS_PRESETS, t), l = c.preset, u = c.version, d = findPreset(CHROMIUM_PRESETS, t);
	if (r.chromium = !!d.preset, r.chromiumVersion = d.version, !r.chromium) {
		var f = findPreset(WEBKIT_PRESETS, t);
		r.webkit = !!f.preset, r.webkitVersion = f.version;
	}
	return l && (i.name = l.id, i.version = u, i.majorVersion = parseInt(u, 10)), o && (r.name = o.id, r.version = s, r.webview && i.name === "ios" && r.name !== "safari" && (r.webview = !1)), r.majorVersion = parseInt(r.version, 10), {
		browser: r,
		os: i,
		isMobile: n,
		isHints: !1
	};
}
function getClientHintsAgent(e) {
	var t = navigator.userAgentData, n = (t.uaList || t.brands).slice(), r = e && e.fullVersionList, i = t.mobile || !1, a = n[0], o = (e && e.platform || t.platform || navigator.platform).toLowerCase(), s = {
		name: a.brand,
		version: a.version,
		majorVersion: -1,
		webkit: !1,
		webkitVersion: "-1",
		chromium: !1,
		chromiumVersion: "-1",
		webview: !!findPresetBrand(WEBVIEW_PRESETS, n).brand || isWebView(getUserAgentString())
	}, c = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	};
	s.webkit = !s.chromium && some(WEBKIT_PRESETS, function(e) {
		return findBrand(n, e);
	});
	var l = findPresetBrand(CHROMIUM_PRESETS, n);
	if (s.chromium = !!l.brand, s.chromiumVersion = l.version || "-1", !s.chromium) {
		var u = findPresetBrand(WEBKIT_PRESETS, n);
		s.webkit = !!u.brand, s.webkitVersion = u.version || "-1";
	}
	var d = find$1(OS_PRESETS, function(e) {
		return RegExp("" + e.test, "g").exec(o);
	});
	if (c.name = d ? d.id : "", e && (c.version = e.platformVersion || "-1"), r && r.length) {
		var f = findPresetBrand(BROWSER_PRESETS, r);
		s.name = f.brand || s.name, s.version = f.version || s.version;
	} else {
		var p = findPresetBrand(BROWSER_PRESETS, n);
		s.name = p.brand || s.name, s.version = p.brand && e ? e.uaFullVersion : p.version;
	}
	return s.webkit && (c.name = i ? "ios" : "mac"), c.name === "ios" && s.webview && (s.version = "-1"), c.version = convertVersion(c.version), s.version = convertVersion(s.version), c.majorVersion = parseInt(c.version, 10), s.majorVersion = parseInt(s.version, 10), {
		browser: s,
		os: c,
		isMobile: i,
		isHints: !0
	};
}
function agent$1(e) {
	return e === void 0 && hasUserAgentData() ? getClientHintsAgent() : getLegacyAgent(e);
}
var agent_esm_default = agent$1;
function prefixNames(e) {
	return [...arguments].slice(1).map(function(t) {
		return t.split(" ").map(function(t) {
			return t ? "" + e + t : "";
		}).join(" ");
	}).join(" ");
}
function prefixCSS(e, t) {
	return t.replace(/([^}{]*){/gm, function(t, n) {
		return n.replace(/\.([^{,\s\d.]+)/g, "." + e + "$1") + "{";
	});
}
function ref(e, t) {
	return function(n) {
		n && (e[t] = n);
	};
}
function refs(e, t, n) {
	return function(r) {
		r && (e[t][n] = r);
	};
}
function withMethods(e, t) {
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
var FUNCTION = "function", STRING = "string", NUMBER = "number", UNDEFINED = "undefined", IS_WINDOW = typeof window !== UNDEFINED, doc = typeof document < "u" && document, OPEN_CLOSED_CHARACTERS = [
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
], TINY_NUM$1 = 1e-7;
1 / TINY_NUM$1;
var DEFAULT_UNIT_PRESETS = {
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
function __spreadArrays$2() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function dot(e, t, n, r) {
	return (e * r + t * n) / (n + r);
}
function isUndefined(e) {
	return typeof e === UNDEFINED;
}
function isObject(e) {
	return e && typeof e == "object";
}
function isArray(e) {
	return Array.isArray(e);
}
function isString(e) {
	return typeof e === STRING;
}
function isNumber(e) {
	return typeof e === NUMBER;
}
function isFunction(e) {
	return typeof e === FUNCTION;
}
function isEqualSeparator(e, t) {
	return (t === "" || t == " ") && (e === "" || e == " ") || e === t;
}
function findOpen(e, t, n, r, i) {
	return findIgnore(e, t, n) ? n : findClose(e, t, n + 1, r, i);
}
function findIgnore(e, t, n) {
	if (!e.ignore) return null;
	var r = t.slice(Math.max(n - 3, 0), n + 3).join("");
	return new RegExp(e.ignore).exec(r);
}
function findClose(e, t, n, r, i) {
	for (var a = function(n) {
		var a = t[n].trim();
		if (a === e.close && !findIgnore(e, t, n)) return { value: n };
		var s = n, c = find(i, function(e) {
			return e.open === a;
		});
		if (c && (s = findOpen(c, t, n, r, i)), s === -1) return o = n, "break";
		n = s, o = n;
	}, o, s = n; s < r; ++s) {
		var c = a(s);
		if (s = o, typeof c == "object") return c.value;
		if (c === "break") break;
	}
	return -1;
}
function splitText(e, t) {
	var n = isString(t) ? { separator: t } : t, r = n.separator, i = r === void 0 ? "," : r, a = n.isSeparateFirst, o = n.isSeparateOnlyOpenClose, s = n.isSeparateOpenClose, c = s === void 0 ? o : s, l = n.openCloseCharacters, u = l === void 0 ? OPEN_CLOSED_CHARACTERS : l, d = u.map(function(e) {
		var t = e.open, n = e.close;
		return t === n ? t : t + "|" + n;
	}).join("|"), f = "(\\s*" + i + "\\s*|" + d + "|\\s+)", p = new RegExp(f, "g"), m = e.split(p).filter(function(e) {
		return e && e !== "undefined";
	}), h = m.length, g = [], _ = [];
	function v() {
		return _.length ? (g.push(_.join("")), _ = [], !0) : !1;
	}
	for (var y = function(t) {
		var n = m[t].trim(), r = t, s = find(u, function(e) {
			return e.open === n;
		}), l = find(u, function(e) {
			return e.close === n;
		});
		if (s) {
			if (r = findOpen(s, m, t, h, u), r !== -1 && c) return v() && a || (g.push(m.slice(t, r + 1).join("")), t = r, a) ? (b = t, "break") : (b = t, "continue");
		} else if (l && !findIgnore(l, m, t)) {
			var d = __spreadArrays$2(u);
			return d.splice(u.indexOf(l), 1), { value: splitText(e, {
				separator: i,
				isSeparateFirst: a,
				isSeparateOnlyOpenClose: o,
				isSeparateOpenClose: c,
				openCloseCharacters: d
			}) };
		} else if (isEqualSeparator(n, i) && !o) return v(), a ? (b = t, "break") : (b = t, "continue");
		r === -1 && (r = h - 1), _.push(m.slice(t, r + 1).join("")), t = r, b = t;
	}, b, x = 0; x < h; ++x) {
		var S = y(x);
		if (x = b, typeof S == "object") return S.value;
		if (S === "break") break;
	}
	return _.length && g.push(_.join("")), g;
}
function splitSpace(e) {
	return splitText(e, "");
}
function splitComma(e) {
	return splitText(e, ",");
}
function splitBracket(e) {
	var t = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(e);
	return !t || t.length < 4 ? {} : {
		prefix: t[1],
		value: t[2],
		suffix: t[3]
	};
}
function splitUnit(e) {
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
function decamelize(e, t) {
	return t === void 0 && (t = "-"), e.replace(/([a-z])([A-Z])/g, function(e, n, r) {
		return "" + n + t + r.toLowerCase();
	});
}
function now() {
	return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function findIndex(e, t, n) {
	n === void 0 && (n = -1);
	for (var r = e.length, i = 0; i < r; ++i) if (t(e[i], i, e)) return i;
	return n;
}
function find(e, t, n) {
	var r = findIndex(e, t);
	return r > -1 ? e[r] : n;
}
var requestAnimationFrame$1 = /* @__PURE__ */ function() {
	var e = now(), t = IS_WINDOW && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
	return t ? t.bind(window) : function(t) {
		var n = now();
		return setTimeout(function() {
			t(n - e);
		}, 1e3 / 60);
	};
}(), cancelAnimationFrame = /* @__PURE__ */ function() {
	var e = IS_WINDOW && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
	return e ? e.bind(window) : function(e) {
		clearTimeout(e);
	};
}();
function getKeys(e) {
	return Object.keys(e);
}
function convertUnitSize(e, t) {
	var n = splitUnit(e), r = n.value, i = n.unit;
	if (isObject(t)) {
		var a = t[i];
		if (a) {
			if (isFunction(a)) return a(r);
			if (DEFAULT_UNIT_PRESETS[i]) return DEFAULT_UNIT_PRESETS[i](r, a);
		}
	} else if (i === "%") return r * t / 100;
	return DEFAULT_UNIT_PRESETS[i] ? DEFAULT_UNIT_PRESETS[i](r) : r;
}
function between(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function checkBoundSize(e, t, n, r) {
	return r === void 0 && (r = e[0] / e[1]), [[throttle(t[0], 1e-7), throttle(t[0] / r, 1e-7)], [throttle(t[1] * r, 1e-7), throttle(t[1], 1e-7)]].filter(function(e) {
		return e.every(function(e, r) {
			var i = t[r], a = throttle(i, 1e-7);
			return n ? e <= i || e <= a : e >= i || e >= a;
		});
	})[0] || e;
}
function calculateBoundSize(e, t, n, r) {
	if (!r) return e.map(function(e, r) {
		return between(e, t[r], n[r]);
	});
	var i = e[0], a = e[1], o = r === !0 ? i / a : r, s = checkBoundSize(e, t, !1, o), c = s[0], l = s[1], u = checkBoundSize(e, n, !0, o), d = u[0], f = u[1];
	return i < c || a < l ? (i = c, a = l) : (i > d || a > f) && (i = d, a = f), [i, a];
}
function sum(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return n;
}
function average(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return t ? n / t : 0;
}
function getRad$1(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function getCenterPoint(e) {
	return [0, 1].map(function(t) {
		return average(e.map(function(e) {
			return e[t];
		}));
	});
}
function getShapeDirection(e) {
	var t = getCenterPoint(e), n = getRad$1(t, e[0]), r = getRad$1(t, e[1]);
	return n < r && r - n < Math.PI || n > r && r - n < -Math.PI ? 1 : -1;
}
function getDist$2(e, t) {
	return Math.sqrt(((t ? t[0] : 0) - e[0]) ** 2 + ((t ? t[1] : 0) - e[1]) ** 2);
}
function throttle(e, t) {
	if (!t) return e;
	var n = 1 / t;
	return Math.round(e / t) / n;
}
function throttleArray(e, t) {
	return e.forEach(function(n, r) {
		e[r] = throttle(e[r], t);
	}), e;
}
function counter(e) {
	for (var t = [], n = 0; n < e; ++n) t.push(n);
	return t;
}
function flat$1(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function hasClass(e, t) {
	return e.classList ? e.classList.contains(t) : !!e.className.match(/* @__PURE__ */ RegExp("(\\s|^)" + t + "(\\s|$)"));
}
function addClass(e, t) {
	e.classList ? e.classList.add(t) : e.className += " " + t;
}
function removeClass(e, t) {
	if (e.classList) e.classList.remove(t);
	else {
		var n = /* @__PURE__ */ RegExp("(\\s|^)" + t + "(\\s|$)");
		e.className = e.className.replace(n, " ");
	}
}
function addEvent(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function removeEvent(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
function getDocument(e) {
	return e?.ownerDocument || doc;
}
function getDocumentElement(e) {
	return getDocument(e).documentElement;
}
function getDocumentBody(e) {
	return getDocument(e).body;
}
function getWindow(e) {
	return e?.ownerDocument?.defaultView || window;
}
function isWindow(e) {
	return e && "postMessage" in e && "blur" in e && "self" in e;
}
function isNode(e) {
	return isObject(e) && e.nodeName && e.nodeType && "ownerDocument" in e;
}
function add(e, t, n, r, i, a) {
	for (var o = 0; o < i; ++o) {
		var s = n + o * i, c = r + o * i;
		e[s] += e[c] * a, t[s] += t[c] * a;
	}
}
function swap(e, t, n, r, i) {
	for (var a = 0; a < i; ++a) {
		var o = n + a * i, s = r + a * i, c = e[o], l = t[o];
		e[o] = e[s], e[s] = c, t[o] = t[s], t[s] = l;
	}
}
function divide(e, t, n, r, i) {
	for (var a = 0; a < r; ++a) {
		var o = n + a * r;
		e[o] /= i, t[o] /= i;
	}
}
function ignoreDimension(e, t, n) {
	n === void 0 && (n = Math.sqrt(e.length));
	for (var r = e.slice(), i = 0; i < n; ++i) r[i * n + t - 1] = 0, r[(t - 1) * n + i] = 0;
	return r[(t - 1) * (n + 1)] = 1, r;
}
function invert(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = e.slice(), r = createIdentityMatrix(t), i = 0; i < t; ++i) {
		var a = t * i + i;
		if (!throttle(n[a], 1e-7)) {
			for (var o = i + 1; o < t; ++o) if (n[t * i + o]) {
				swap(n, r, i, o, t);
				break;
			}
		}
		if (!throttle(n[a], 1e-7)) return [];
		divide(n, r, i, t, n[a]);
		for (var o = 0; o < t; ++o) {
			var s = o, c = n[o + i * t];
			!throttle(c, 1e-7) || i === o || add(n, r, s, i, t, -c);
		}
	}
	return r;
}
function transpose(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = 0; r < t; ++r) for (var i = 0; i < t; ++i) n[i * t + r] = e[t * r + i];
	return n;
}
function getOrigin(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = e[t * t - 1], i = 0; i < t - 1; ++i) n[i] = e[t * (t - 1) + i] / r;
	return n[t - 1] = 0, n;
}
function fromTranslation(e, t) {
	for (var n = createIdentityMatrix(t), r = 0; r < t - 1; ++r) n[t * (t - 1) + r] = e[r] || 0;
	return n;
}
function convertPositionMatrix(e, t) {
	for (var n = e.slice(), r = e.length; r < t - 1; ++r) n[r] = 0;
	return n[t - 1] = 1, n;
}
function convertDimension(e, t, n) {
	if (t === void 0 && (t = Math.sqrt(e.length)), t === n) return e;
	for (var r = createIdentityMatrix(n), i = Math.min(t, n), a = 0; a < i - 1; ++a) {
		for (var o = 0; o < i - 1; ++o) r[a * n + o] = e[a * t + o];
		r[(a + 1) * n - 1] = e[(a + 1) * t - 1], r[(n - 1) * n + a] = e[(t - 1) * t + a];
	}
	return r[n * n - 1] = e[t * t - 1], r;
}
function multiplies(e) {
	var t = [...arguments].slice(1), n = createIdentityMatrix(e);
	return t.forEach(function(t) {
		n = multiply(n, t, e);
	}), n;
}
function multiply(e, t, n) {
	n === void 0 && (n = Math.sqrt(e.length));
	var r = [], i = e.length / n, a = t.length / i;
	if (i) {
		if (!a) return e;
	} else return t;
	for (var o = 0; o < n; ++o) for (var s = 0; s < a; ++s) {
		r[s * n + o] = 0;
		for (var c = 0; c < i; ++c) r[s * n + o] += e[c * n + o] * t[s * i + c];
	}
	return r;
}
function plus(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] + t[i];
	return r;
}
function minus(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] - t[i];
	return r;
}
function convertCSStoMatrix(e, t) {
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
function convertMatrixtoCSS(e, t) {
	return t === void 0 && (t = e.length === 9), t ? [
		e[0],
		e[1],
		e[3],
		e[4],
		e[6],
		e[7]
	] : e;
}
function calculate(e, t, n) {
	n === void 0 && (n = t.length);
	var r = multiply(e, t, n), i = r[n - 1];
	return r.map(function(e) {
		return e / i;
	});
}
function rotateX3d(e, t) {
	return multiply(e, [
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
function rotateY3d(e, t) {
	return multiply(e, [
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
function rotateZ3d(e, t) {
	return multiply(e, createRotateMatrix(t, 4));
}
function scale3d(e, t) {
	var n = t[0], r = n === void 0 ? 1 : n, i = t[1], a = i === void 0 ? 1 : i, o = t[2];
	return multiply(e, [
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
function rotate(e, t) {
	return calculate(createRotateMatrix(t, 3), convertPositionMatrix(e, 3));
}
function translate3d(e, t) {
	var n = t[0], r = n === void 0 ? 0 : n, i = t[1], a = i === void 0 ? 0 : i, o = t[2];
	return multiply(e, [
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
function matrix3d(e, t) {
	return multiply(e, t, 4);
}
function createRotateMatrix(e, t) {
	var n = Math.cos(e), r = Math.sin(e), i = createIdentityMatrix(t);
	return i[0] = n, i[1] = r, i[t] = -r, i[t + 1] = n, i;
}
function createIdentityMatrix(e) {
	for (var t = e * e, n = [], r = 0; r < t; ++r) n[r] = r % (e + 1) ? 0 : 1;
	return n;
}
function createScaleMatrix(e, t) {
	for (var n = createIdentityMatrix(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[(t + 1) * i] = e[i];
	return n;
}
function createOriginMatrix(e, t) {
	for (var n = createIdentityMatrix(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[t * (t - 1) + i] = e[i];
	return n;
}
function createWarpMatrix(e, t, n, r, i, a, o, s) {
	var c = e[0], l = e[1], u = t[0], d = t[1], f = n[0], p = n[1], m = r[0], h = r[1], g = i[0], _ = i[1], v = a[0], y = a[1], b = o[0], x = o[1], S = s[0], C = s[1], w = invert([
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
	var T = multiply(w, [
		g,
		_,
		v,
		y,
		b,
		x,
		S,
		C
	], 8);
	return T[8] = 1, convertDimension(transpose(T), 3, 4);
}
var __assign$5 = function() {
	return __assign$5 = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, __assign$5.apply(this, arguments);
};
function createMatrix() {
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
function parseMat(e, t) {
	return t === void 0 && (t = 0), toMat(parse(e, t));
}
function calculateMatrixDist(e, t) {
	var n = calculate(e, [
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
function toMat(e) {
	var t = createMatrix();
	return e.forEach(function(e) {
		var n = e.matrixFunction, r = e.functionValue;
		n && (t = n(t, r));
	}), t;
}
function parse(e, t) {
	return t === void 0 && (t = 0), (isArray(e) ? e : splitSpace(e)).map(function(e) {
		var n = splitBracket(e), r = n.prefix, i = n.value, a = null, o = r, s = "";
		if (r === "translate" || r === "translateX" || r === "translate3d") {
			var c = isObject(t) ? __assign$5(__assign$5({}, t), { "o%": t["%"] }) : {
				"%": t,
				"o%": t
			}, l = splitComma(i).map(function(e, n) {
				return n === 0 && "x%" in c ? c["%"] = t["x%"] : n === 1 && "y%" in c ? c["%"] = t["y%"] : c["%"] = t["o%"], convertUnitSize(e, c);
			}), u = l[0], d = l[1], f = d === void 0 ? 0 : d, p = l[2], m = p === void 0 ? 0 : p;
			a = translate3d, s = [
				u,
				f,
				m
			];
		} else if (r === "translateY") {
			var f = convertUnitSize(i, isObject(t) ? __assign$5({ "%": t["y%"] }, t) : { "%": t });
			a = translate3d, s = [
				0,
				f,
				0
			];
		} else if (r === "translateZ") {
			var m = parseFloat(i);
			a = translate3d, s = [
				0,
				0,
				m
			];
		} else if (r === "scale" || r === "scale3d") {
			var h = splitComma(i).map(function(e) {
				return parseFloat(e);
			}), g = h[0], _ = h[1], v = _ === void 0 ? g : _, y = h[2], b = y === void 0 ? 1 : y;
			a = scale3d, s = [
				g,
				v,
				b
			];
		} else if (r === "scaleX") {
			var g = parseFloat(i);
			a = scale3d, s = [
				g,
				1,
				1
			];
		} else if (r === "scaleY") {
			var v = parseFloat(i);
			a = scale3d, s = [
				1,
				v,
				1
			];
		} else if (r === "scaleZ") {
			var b = parseFloat(i);
			a = scale3d, s = [
				1,
				1,
				b
			];
		} else if (r === "rotate" || r === "rotateZ" || r === "rotateX" || r === "rotateY") {
			var x = splitUnit(i), S = x.unit, C = x.value, w = S === "rad" ? C : C * Math.PI / 180;
			r === "rotate" || r === "rotateZ" ? (o = "rotateZ", a = rotateZ3d) : r === "rotateX" ? a = rotateX3d : r === "rotateY" && (a = rotateY3d), s = w;
		} else if (r === "matrix3d") a = matrix3d, s = splitComma(i).map(function(e) {
			return parseFloat(e);
		});
		else if (r === "matrix") {
			var T = splitComma(i).map(function(e) {
				return parseFloat(e);
			});
			a = matrix3d, s = [
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
var PolyMap = /* @__PURE__ */ function() {
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
}(), HashMap = /* @__PURE__ */ function() {
	function e() {
		this.object = {};
	}
	var t = e.prototype;
	return t.get = function(e) {
		return this.object[e];
	}, t.set = function(e, t) {
		this.object[e] = t;
	}, e;
}(), SUPPORT_MAP = typeof Map == "function", Link = /* @__PURE__ */ function() {
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
function orderChanged(e, t) {
	var n = [], r = [];
	return e.forEach(function(e) {
		var t = e[0], i = e[1], a = new Link();
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
var Result = /* @__PURE__ */ function() {
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
		var e = orderChanged(this.changedBeforeAdded, this.fixed), t = this.changed, n = [];
		this.cacheOrdered = e.filter(function(e, r) {
			var i = e[0], a = e[1], o = t[r], s = o[0], c = o[1];
			if (i !== a) return n.push([s, c]), !0;
		}), this.cachePureChanged = n;
	}, e;
}();
function diff$1(e, t, n) {
	var r = SUPPORT_MAP ? Map : n ? HashMap : PolyMap, i = n || function(e) {
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
	}), o.reverse(), new Result(e, t, a, o, h, s, f, p);
}
var list_differ_esm_default = /* @__PURE__ */ function() {
	function e(e, t) {
		e === void 0 && (e = []), this.findKeyCallback = t, this.list = [].slice.call(e);
	}
	var t = e.prototype;
	return t.update = function(e) {
		var t = [].slice.call(e), n = diff$1(this.list, t, this.findKeyCallback);
		return this.list = t, n;
	}, e;
}(), extendStatics$3 = function(e, t) {
	return extendStatics$3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, extendStatics$3(e, t);
};
function __extends$3(e, t) {
	extendStatics$3(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var findKeyCallback = typeof Map == "function" ? void 0 : function() {
	var e = 0;
	return function(t) {
		return t.__DIFF_KEY__ ||= ++e;
	};
}(), ChildrenDiffer = /* @__PURE__ */ function(e) {
	__extends$3(t, e);
	function t(t) {
		return t === void 0 && (t = []), e.call(this, t, findKeyCallback) || this;
	}
	return t;
}(list_differ_esm_default);
function diff(e, t) {
	return diff$1(e, t, findKeyCallback);
}
var children_differ_esm_default = ChildrenDiffer, __assign$4 = function() {
	return __assign$4 = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, __assign$4.apply(this, arguments);
};
function __spreadArrays$1() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
var event_emitter_esm_default = /* @__PURE__ */ function() {
	function e() {
		this._events = {};
	}
	var t = e.prototype;
	return t.on = function(e, t) {
		if (isObject(e)) for (var n in e) this.on(n, e[n]);
		else this._addEvent(e, t, {});
		return this;
	}, t.off = function(e, t) {
		if (!e) this._events = {};
		else if (isObject(e)) for (var n in e) this.off(n);
		else if (!t) this._events[e] = [];
		else {
			var r = this._events[e];
			if (r) {
				var i = findIndex(r, function(e) {
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
		}, t.currentTarget = this, __spreadArrays$1(r).forEach(function(r) {
			r.listener(t), r.once && n.off(e, r.listener);
		}), !i;
	}, t.trigger = function(e, t) {
		return t === void 0 && (t = {}), this.emit(e, t);
	}, t._addEvent = function(e, t, n) {
		var r = this._events;
		r[e] = r[e] || [], r[e].push(__assign$4({ listener: t }, n));
	}, e;
}(), extendStatics$2 = function(e, t) {
	return extendStatics$2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, extendStatics$2(e, t);
};
function __extends$2(e, t) {
	extendStatics$2(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var __assign$3 = function() {
	return __assign$3 = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, __assign$3.apply(this, arguments);
};
function getDefaultScrollPosition$1(e) {
	var t = e.container;
	return t === document.body ? [t.scrollLeft || document.documentElement.scrollLeft, t.scrollTop || document.documentElement.scrollTop] : [t.scrollLeft, t.scrollTop];
}
function checkDefaultScrollEvent(e, t) {
	return e.addEventListener("scroll", t), function() {
		e.removeEventListener("scroll", t);
	};
}
function getContainerElement(e) {
	if (e) {
		if (isString(e)) return document.querySelector(e);
	} else return null;
	if (isFunction(e)) return e();
	if (e instanceof Element) return e;
	if ("current" in e) return e.current;
	if ("value" in e) return e.value;
}
var dragscroll_esm_default = /* @__PURE__ */ function(e) {
	__extends$2(t, e);
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
		var n = getContainerElement(t.container);
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
			return s.top > r - a ? (c[1] > s.top || r < c[1]) && (l[1] = -1) : s.top + s.height < r + a && (c[1] < s.top + s.height || r > c[1]) && (l[1] = 1), s.left > n - a ? (c[0] > s.left || n < c[0]) && (l[0] = -1) : s.left + s.width < n + a && (c[0] < s.left + s.width || n > c[0]) && (l[0] = 1), !l[0] && !l[1] ? !1 : this._continueDrag(__assign$3(__assign$3({}, t), {
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
		return (r === void 0 ? getDefaultScrollPosition$1 : r)({
			container: getContainerElement(n),
			direction: e
		});
	}, n._continueDrag = function(e) {
		var t = this, n, r = e.container, i = e.direction, a = e.throttleTime, o = e.useScroll, s = e.isDrag, c = e.inputEvent;
		if (!(!this._flag || s && this._isWait)) {
			var l = now(), u = Math.max(a + this._prevTime - l, 0);
			if (u > 0) return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
				t._continueDrag(e);
			}, u), !1;
			this._prevTime = l;
			var d = this._getScrollPosition(i, e);
			this._prevScrollPos = d, s && (this._isWait = !0), o || (this._lock = !0);
			var f = {
				container: getContainerElement(r),
				direction: i,
				inputEvent: c
			};
			return (n = e.requestScroll) == null || n.call(e, f), this.emit("scroll", f), this._isWait = !1, o || this.checkScroll(__assign$3(__assign$3({}, e), {
				prevScrollPos: d,
				direction: i,
				inputEvent: c
			}));
		}
	}, n._registerScrollEvent = function(e) {
		this._unregisterScrollEvent();
		var t = e.checkScrollEvent;
		if (t) {
			var n = t === !0 ? checkDefaultScrollEvent : t, r = getContainerElement(e.container);
			t === !0 && (r === document.body || r === document.documentElement) ? this._unregister = checkDefaultScrollEvent(window, this._onScroll) : this._unregister = n(r, this._onScroll);
		}
	}, n._unregisterScrollEvent = function() {
		var e;
		(e = this._unregister) == null || e.call(this), this._unregister = null;
	}, t;
}(event_emitter_esm_default);
function __spreadArrays() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function tinyThrottle(e) {
	return throttle(e, TINY_NUM$1);
}
function isSameConstants(e, t) {
	return e.every(function(e, n) {
		return tinyThrottle(e - t[n]) === 0;
	});
}
function isSamePoint(e, t) {
	return !tinyThrottle(e[0] - t[0]) && !tinyThrottle(e[1] - t[1]);
}
function getAreaSize(e) {
	return e.length < 3 ? 0 : Math.abs(sum(e.map(function(t, n) {
		var r = e[n + 1] || e[0];
		return t[0] * r[1] - r[0] * t[1];
	}))) / 2;
}
function fitPoints(e, t) {
	var n = t.width, r = t.height, i = t.left, a = t.top, o = getMinMaxs(e), s = o.minX, c = o.minY, l = o.maxX, u = o.maxY, d = n / (l - s), f = r / (u - c);
	return e.map(function(e) {
		return [i + (e[0] - s) * d, a + (e[1] - c) * f];
	});
}
function getMinMaxs(e) {
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
function isInside(e, t, n) {
	var r = e[0], i = e[1], a = getMinMaxs(t), o = a.minX, s = a.maxX, c = [[o, i], [s, i]], l = getLinearConstants(c[0], c[1]), u = convertLines(t), d = [];
	if (u.forEach(function(t) {
		var n = getLinearConstants(t[0], t[1]), r = t[0];
		isSameConstants(l, n) ? d.push({
			pos: e,
			line: t,
			type: "line"
		}) : getPointsOnLines(getIntersectionPointsByConstants(l, n), [c, t]).forEach(function(e) {
			t.some(function(t) {
				return isSamePoint(t, e);
			}) ? d.push({
				pos: e,
				line: t,
				type: "point"
			}) : tinyThrottle(r[1] - i) !== 0 && d.push({
				pos: e,
				line: t,
				type: "intersection"
			});
		});
	}), !n && find(d, function(e) {
		return e[0] === r;
	})) return !0;
	var f = 0, p = {};
	return d.forEach(function(e) {
		var t = e.pos, n = e.type, a = e.line;
		if (!(t[0] > r)) {
			if (n === "intersection") ++f;
			else if (n === "line") return;
			else if (n === "point") {
				var o = find(a, function(e) {
					return e[1] !== i;
				}), s = p[t[0]], c = o[1] > i ? 1 : -1;
				s ? s !== c && ++f : p[t[0]] = c;
			}
		}
	}), f % 2 == 1;
}
function getLinearConstants(e, t) {
	var n = e[0], r = e[1], i = t[0], a = t[1], o = i - n, s = a - r;
	Math.abs(o) < 1e-7 && (o = 0), Math.abs(s) < 1e-7 && (s = 0);
	var c = 0, l = 0, u = 0;
	return o ? s ? (c = -s / o, l = 1, u = -c * n - r) : (l = 1, u = -r) : s && (c = -1, u = n), [
		c,
		l,
		u
	];
}
function getIntersectionPointsByConstants(e, t) {
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
function getPointsOnLines(e, t) {
	var n = t.map(function(e) {
		return [0, 1].map(function(t) {
			return [Math.min(e[0][t], e[1][t]), Math.max(e[0][t], e[1][t])];
		});
	}), r = [];
	if (e.length === 2) {
		var i = e[0], a = i[0], o = i[1];
		if (tinyThrottle(a - e[1][0])) {
			if (!tinyThrottle(o - e[1][1])) {
				var s = Math.max.apply(Math, n.map(function(e) {
					return e[0][0];
				})), c = Math.min.apply(Math, n.map(function(e) {
					return e[0][1];
				}));
				if (tinyThrottle(s - c) > 0) return [];
				r = [[s, o], [c, o]];
			}
		} else {
			var l = Math.max.apply(Math, n.map(function(e) {
				return e[1][0];
			})), u = Math.min.apply(Math, n.map(function(e) {
				return e[1][1];
			}));
			if (tinyThrottle(l - u) > 0) return [];
			r = [[a, l], [a, u]];
		}
	}
	return r.length || (r = e.filter(function(e) {
		var t = e[0], r = e[1];
		return n.every(function(e) {
			return 0 <= tinyThrottle(t - e[0][0]) && 0 <= tinyThrottle(e[0][1] - t) && 0 <= tinyThrottle(r - e[1][0]) && 0 <= tinyThrottle(e[1][1] - r);
		});
	})), r.map(function(e) {
		return [tinyThrottle(e[0]), tinyThrottle(e[1])];
	});
}
function convertLines(e) {
	return __spreadArrays(e.slice(1), [e[0]]).map(function(t, n) {
		return [e[n], t];
	});
}
function getOverlapPointInfos(e, t) {
	var n = e.slice(), r = t.slice();
	getShapeDirection(n) === -1 && n.reverse(), getShapeDirection(r) === -1 && r.reverse();
	var i = convertLines(n), a = convertLines(r), o = i.map(function(e) {
		return getLinearConstants(e[0], e[1]);
	}), s = a.map(function(e) {
		return getLinearConstants(e[0], e[1]);
	}), c = [];
	o.forEach(function(e, t) {
		var n = i[t], o = [];
		s.forEach(function(r, i) {
			var s = getPointsOnLines(getIntersectionPointsByConstants(e, r), [n, a[i]]);
			o.push.apply(o, s.map(function(e) {
				return {
					index1: t,
					index2: i,
					pos: e,
					type: "intersection"
				};
			}));
		}), o.sort(function(e, t) {
			return getDist$2(n[0], e.pos) - getDist$2(n[0], t.pos);
		}), c.push.apply(c, o), isInside(n[1], r) && c.push({
			index1: t,
			index2: -1,
			pos: n[1],
			type: "inside"
		});
	}), a.forEach(function(e, t) {
		if (isInside(e[1], n)) {
			var r = !1, i = findIndex(c, function(e) {
				return e.index2 === t ? (r = !0, !1) : !!r;
			});
			i === -1 && (r = !1, i = findIndex(c, function(e) {
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
function getOverlapPoints(e, t) {
	return getOverlapPointInfos(e, t).map(function(e) {
		return e.pos;
	});
}
function getOverlapSize(e, t) {
	return getAreaSize(getOverlapPoints(e, t));
}
var extendStatics$1 = function(e, t) {
	return extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, extendStatics$1(e, t);
};
function __extends$1(e, t) {
	extendStatics$1(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var __assign$2 = function() {
	return __assign$2 = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, __assign$2.apply(this, arguments);
};
function getRad(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function getRotatiion(e) {
	return getRad([e[0].clientX, e[0].clientY], [e[1].clientX, e[1].clientY]) / Math.PI * 180;
}
function isMultiTouch(e) {
	return e.touches && e.touches.length >= 2;
}
function getEventClients(e) {
	return e ? e.touches ? getClients(e.touches) : [getClient(e)] : [];
}
function isMouseEvent(e) {
	return e && (e.type.indexOf("mouse") > -1 || "button" in e);
}
function getPosition(e, t, n) {
	var r = n.length, i = getAverageClient(e, r), a = i.clientX, o = i.clientY, s = i.originalClientX, c = i.originalClientY, l = getAverageClient(t, r), u = l.clientX, d = l.clientY, f = getAverageClient(n, r), p = f.clientX, m = f.clientY;
	return {
		clientX: s,
		clientY: c,
		deltaX: a - u,
		deltaY: o - d,
		distX: a - p,
		distY: o - m
	};
}
function getDist$1(e) {
	return Math.sqrt((e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2);
}
function getClients(e) {
	for (var t = Math.min(e.length, 2), n = [], r = 0; r < t; ++r) n.push(getClient(e[r]));
	return n;
}
function getClient(e) {
	return {
		clientX: e.clientX,
		clientY: e.clientY
	};
}
function getAverageClient(e, t) {
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
var ClientStore = /* @__PURE__ */ function() {
	function e(e) {
		this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = e, this.prevClients = e, this.length = e.length;
	}
	return e.prototype.getAngle = function(e) {
		return e === void 0 && (e = this.prevClients), getRotatiion(e);
	}, e.prototype.getRotation = function(e) {
		return e === void 0 && (e = this.prevClients), getRotatiion(e) - getRotatiion(this.startClients);
	}, e.prototype.getPosition = function(e, t) {
		e === void 0 && (e = this.prevClients);
		var n = getPosition(e || this.prevClients, this.prevClients, this.startClients), r = n.deltaX, i = n.deltaY;
		return this.movement += Math.sqrt(r * r + i * i), this.prevClients = e, n;
	}, e.prototype.getPositions = function(e) {
		e === void 0 && (e = this.prevClients);
		for (var t = this.prevClients, n = this.startClients, r = Math.min(this.length, t.length), i = [], a = 0; a < r; ++a) i[a] = getPosition([e[a]], [t[a]], [n[a]]);
		return i;
	}, e.prototype.getMovement = function(e) {
		var t = this.movement;
		if (!e) return t;
		var n = getAverageClient(e, this.length), r = getAverageClient(this.prevClients, this.length), i = n.clientX - r.clientX, a = n.clientY - r.clientY;
		return Math.sqrt(i * i + a * a) + t;
	}, e.prototype.getDistance = function(e) {
		return e === void 0 && (e = this.prevClients), getDist$1(e);
	}, e.prototype.getScale = function(e) {
		return e === void 0 && (e = this.prevClients), getDist$1(e) / getDist$1(this.startClients);
	}, e.prototype.move = function(e, t) {
		this.startClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		}), this.prevClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		});
	}, e;
}(), INPUT_TAGNAMES = ["textarea", "input"], Gesto = /* @__PURE__ */ function(e) {
	__extends$1(t, e);
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
							var y = v.tagName.toLowerCase(), b = INPUT_TAGNAMES.indexOf(y) > -1, x = v.isContentEditable;
							if (b || x) {
								if (u || !d && _ === v) return !1;
								if (_ && (_ === v || x && _.isContentEditable && _.contains(v))) if (d) v.blur();
								else return !1;
							} else if ((l || e.type === "touchstart") && _) {
								var S = _.tagName.toLowerCase();
								(_.isContentEditable || INPUT_TAGNAMES.indexOf(S) > -1) && _.blur();
							}
							(f || p || m) && addEvent(r._window, "click", r._onClick, !0);
						}
						r.clientStores = [new ClientStore(getEventClients(e))], r._isIdle = !1, r.flag = !0, r.isDrag = !1, r._isTrusted = t, r._dragFlag = !0, r._prevInputEvent = e, r.data = {}, r.doubleFlag = now() - r.prevTime < 200, r._isMouseEvent = isMouseEvent(e), !r._isMouseEvent && r._preventMouseEvent && r._allowMouseEvent(), (r._preventMouseEvent || r.emit("dragStart", __assign$2(__assign$2({
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
						addEvent(a, "touchstart", r.onDragStart, { passive: !1 });
					}))) : h && o && removeEvent(a, "touchstart", r.onDragStart), r.flag && isMultiTouch(e)) {
						if (clearTimeout(C), g && e.touches.length !== e.changedTouches.length) return;
						r.pinchFlag || r.onPinchStart(e);
					}
				}
			}
		}, r.onDrag = function(e, t) {
			if (r.flag) {
				var n = r.options.preventDefault;
				!r._isMouseEvent && n && e.preventDefault(), r._prevInputEvent = e;
				var i = getEventClients(e), a = r.moveClients(i, e, !1);
				if (r._dragFlag) {
					if ((r.pinchFlag || a.deltaX || a.deltaY) && (r._preventMouseEvent || r.emit("drag", __assign$2(__assign$2({}, a), {
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
				}), !s && !o && a && !c && r._allowClickEvent(), r._useTouch && n && removeEvent(i, "touchstart", r.onDragStart), r.pinchFlag && r.onPinchEnd(e);
				var l = e?.touches ? getEventClients(e) : [];
				l.length === 0 || !r.options.keepDragging ? r.flag = !1 : r._addStore(new ClientStore(l));
				var u = r._getPosition(), d = now(), f = !c && r.doubleFlag;
				r._prevInputEvent = null, r.prevTime = c || f ? 0 : d, r.flag || (r._dettachDragEvent(), r._preventMouseEvent || r.emit("dragEnd", __assign$2({
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
			removeEvent(r._window, "click", r._onClick, !0);
		}, r._onClick = function(e) {
			r._allowClickEvent(), r._allowMouseEvent();
			var t = r.options.preventClickEventByCondition;
			t?.(e) || (e.stopPropagation(), e.preventDefault());
		}, r._onContextMenu = function(e) {
			r.options.preventRightClick ? r.onDragEnd(e) : e.preventDefault();
		}, r._passCallback = function() {};
		var i = [].concat(t), a = i[0];
		r._window = isWindow(a) ? a : getWindow(a), r.options = __assign$2({
			checkInput: !1,
			container: a && !("document" in a) ? getWindow(a) : a,
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
			addEvent(e, "dragstart", r.onDragStart);
		}), r._useMouse && (i.forEach(function(e) {
			addEvent(e, "mousedown", r.onDragStart), addEvent(e, "mousemove", r._passCallback);
		}), addEvent(s, "contextmenu", r._onContextMenu)), l && addEvent(getWindow(), "blur", r.onBlur), r._useTouch) {
			var u = { passive: !1 };
			i.forEach(function(e) {
				addEvent(e, "touchstart", r.onDragStart, u), addEvent(e, "touchmove", r._passCallback, u);
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
		return e === void 0 && (e = this._prevInputEvent), __assign$2(__assign$2({
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
		this.off(), removeEvent(this._window, "blur", this.onBlur), this._useDrag && t.forEach(function(t) {
			removeEvent(t, "dragstart", e.onDragStart);
		}), this._useMouse && (t.forEach(function(t) {
			removeEvent(t, "mousedown", e.onDragStart);
		}), removeEvent(n, "contextmenu", this._onContextMenu)), this._useTouch && (t.forEach(function(t) {
			removeEvent(t, "touchstart", e.onDragStart);
		}), removeEvent(n, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
	}, t.prototype.onPinchStart = function(e) {
		var t = this, n = this.options.pinchThreshold;
		if (!(this.isDrag && this.getMovement() > n)) {
			var r = new ClientStore(getEventClients(e));
			this.pinchFlag = !0, this._addStore(r), this.emit("pinchStart", __assign$2(__assign$2({
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
			this.isPinch = !0, this.emit("pinch", __assign$2(__assign$2({
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
			this.emit("pinchEnd", __assign$2(__assign$2({
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
		return !i && this.isDrag && (a = !0), __assign$2(__assign$2({
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
		return __assign$2(__assign$2({}, n), {
			distX: i,
			distY: a
		});
	}, t.prototype._attchDragEvent = function() {
		var e = this._window, t = this.options.container, n = { passive: !1 };
		this._isDragAPI && (addEvent(t, "dragover", this.onDrag, n), addEvent(e, "dragend", this.onDragEnd)), this._useMouse && (addEvent(t, "mousemove", this.onDrag), addEvent(e, "mouseup", this.onDragEnd)), this._useTouch && (addEvent(t, "touchmove", this.onDrag, n), addEvent(e, "touchend", this.onDragEnd, n), addEvent(e, "touchcancel", this.onDragEnd, n));
	}, t.prototype._dettachDragEvent = function() {
		var e = this._window, t = this.options.container;
		this._isDragAPI && (removeEvent(t, "dragover", this.onDrag), removeEvent(e, "dragend", this.onDragEnd)), this._useMouse && (removeEvent(t, "mousemove", this.onDrag), removeEvent(e, "mouseup", this.onDragEnd)), this._useTouch && (removeEvent(t, "touchstart", this.onDragStart), removeEvent(t, "touchmove", this.onDrag), removeEvent(e, "touchend", this.onDragEnd), removeEvent(e, "touchcancel", this.onDragEnd));
	}, t.prototype._allowMouseEvent = function() {
		this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
	}, t;
}(event_emitter_esm_default);
function hash(e) {
	for (var t = 5381, n = e.length; n;) t = t * 33 ^ e.charCodeAt(--n);
	return t >>> 0;
}
var stringHash = hash;
function getHash(e) {
	return stringHash(e).toString(36);
}
function getShadowRoot$1(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function replaceStyle(e, t, n) {
	return n.original ? t : t.replace(/([^};{\s}][^};{]*|^\s*){/gm, function(t, n) {
		var r = n.trim();
		return (r ? splitComma(r) : [""]).map(function(t) {
			var n = t.trim();
			return n.indexOf("@") === 0 ? n : n.indexOf(":global") > -1 ? n.replace(/\:global/g, "") : n.indexOf(":host") > -1 ? `${n.replace(/\:host/g, `.${e}`)}` : n ? `.${e} ${n}` : `.${e}`;
		}).join(", ") + " {";
	});
}
function injectStyle(e, t, n, r, i) {
	var a = getDocument(r), o = a.createElement("style");
	return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", e), o.setAttribute("data-styled-count", "1"), n.nonce && o.setAttribute("nonce", n.nonce), o.innerHTML = replaceStyle(e, t, n), (i || a.head || a.body).appendChild(o), o;
}
function styled$1(e) {
	var t = "rCS" + getHash(e);
	return {
		className: t,
		inject: function(n, r) {
			r === void 0 && (r = {});
			var i = getShadowRoot$1(n), a = (i || n.ownerDocument || document).querySelector(`style[data-styled-id="${t}"]`);
			if (!a) a = injectStyle(t, e, r, n, i);
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
var styled_esm_default = styled$1, __assign$1 = function() {
	return __assign$1 = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, __assign$1.apply(this, arguments);
};
function __rest$1(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function styled(e, t) {
	var n = styled_esm_default(t), r = n.className;
	return (0, import_react.forwardRef)(function(t, i) {
		var a = t.className, o = a === void 0 ? "" : a;
		t.cspNonce;
		var s = __rest$1(t, ["className", "cspNonce"]), c = (0, import_react.useRef)();
		return (0, import_react.useImperativeHandle)(i, function() {
			return c.current;
		}, []), (0, import_react.useEffect)(function() {
			var e = n.inject(c.current, { nonce: t.cspNonce });
			return function() {
				e.destroy();
			};
		}, []), (0, import_react.createElement)(e, __assign$1({
			ref: c,
			"data-styled-id": r,
			className: `${o} ${r}`
		}, s));
	});
}
var extendStatics = function(e, t) {
	return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, extendStatics(e, t);
};
function __extends(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	extendStatics(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var __assign = function() {
	return __assign = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, __assign.apply(this, arguments);
};
function __rest(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function __decorate(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
function __values(e) {
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
function __read(e, t) {
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
function __spreadArray(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
function makeAble(e, t) {
	return __assign({
		events: [],
		props: [],
		name: e
	}, t);
}
var DIRECTIONS4 = [
	"n",
	"w",
	"s",
	"e"
], DIRECTIONS = [
	"n",
	"w",
	"s",
	"e",
	"nw",
	"ne",
	"sw",
	"se"
];
function getSVGCursor(e, t) {
	return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${32 * e}px" height="${32 * e}px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${t}deg);transform-origin: 16px 16px"></path></svg>`;
}
function getCursorCSS(e) {
	var t = getSVGCursor(1, e), n = Math.round(e / 45) * 45 % 180, r = "ns-resize";
	return n === 135 ? r = "nwse-resize" : n === 45 ? r = "nesw-resize" : n === 90 && (r = "ew-resize"), `cursor:${r};cursor: url('${t}') 16 16, ${r};`;
}
var agent = agent_esm_default(), IS_WEBKIT = agent.browser.webkit, IS_WEBKIT605 = IS_WEBKIT && (function() {
	var e = typeof window > "u" ? { userAgent: "" } : window.navigator, t = /applewebkit\/([^\s]+)/g.exec(e.userAgent.toLowerCase());
	return t ? parseFloat(t[1]) < 605 : !1;
})(), browserName = agent.browser.name, browserVersion = parseInt(agent.browser.version, 10), IS_CHROME = browserName === "chrome", IS_CHROMIUM = agent.browser.chromium, chromiumVersion = parseInt(agent.browser.chromiumVersion, 10) || 0, IS_CHROMIUM109 = IS_CHROME && browserVersion >= 109 || IS_CHROMIUM && chromiumVersion >= 109, IS_FIREFOX = browserName === "firefox", IS_SAFARI_ABOVE15 = parseInt(agent.browser.webkitVersion, 10) >= 612 || browserVersion >= 15, PREFIX = "moveable-", MOVEABLE_CSS = `
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
${DIRECTIONS.map(function(e) {
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
${getCursorCSS(e)}
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

${IS_WEBKIT605 ? ":global svg *:before {\ncontent:\"\";\ntransform-origin: inherit;\n}" : ""}
`, NEARBY_POS = [
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
], FLOAT_POINT_NUM = 1e-4, TINY_NUM = 1e-7, MIN_SCALE = 1e-9, MAX_NUM = 10 ** 10, MIN_NUM = -MAX_NUM, DIRECTION_REGION_TO_DIRECTION = {
	n: [0, -1],
	e: [1, 0],
	s: [0, 1],
	w: [-1, 0],
	nw: [-1, -1],
	ne: [1, -1],
	sw: [-1, 1],
	se: [1, 1]
}, DIRECTION_INDEXES = {
	n: [0, 1],
	e: [1, 3],
	s: [3, 2],
	w: [2, 0],
	nw: [0],
	ne: [1],
	sw: [2],
	se: [3]
}, DIRECTION_ROTATIONS = {
	n: 0,
	s: 180,
	w: 270,
	e: 90,
	nw: 315,
	ne: 45,
	sw: 225,
	se: 135
}, MOVEABLE_METHODS = [
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
function setCustomDrag(e, t, n, r, i, a) {
	a === void 0 && (a = "draggable");
	var o = t.gestos[a]?.move(n, e.inputEvent) ?? {}, s = o.originalDatas || o.datas, c = s[a] || (s[a] = {});
	return __assign(__assign({}, i ? convertDragDist(t, o) : o), {
		isPinch: !!r,
		parentEvent: !0,
		datas: c,
		originalDatas: e.originalDatas
	});
}
var CustomGesto = /* @__PURE__ */ function() {
	function e(e) {
		var t;
		e === void 0 && (e = "draggable"), this.ableName = e, this.prevX = 0, this.prevY = 0, this.startX = 0, this.startY = 0, this.isDrag = !1, this.isFlag = !1, this.datas = { draggable: {} }, this.datas = (t = {}, t[e] = {}, t);
	}
	return e.prototype.dragStart = function(e, t) {
		this.isDrag = !1, this.isFlag = !1;
		var n = t.originalDatas;
		return this.datas = n, n[this.ableName] || (n[this.ableName] = {}), __assign(__assign({}, this.move(e, t.inputEvent)), { type: "dragstart" });
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
function calculateElementPosition(e, t, n, r) {
	var i = e.length === 16 ? 4 : 3, a = __read(calculatePoses(e, n, r, i), 4), o = __read(a[0], 2), s = o[0], c = o[1], l = __read(a[1], 2), u = l[0], d = l[1], f = __read(a[2], 2), p = f[0], m = f[1], h = __read(a[3], 2), g = h[0], _ = h[1], v = __read(calculatePosition(e, t, i), 2), y = v[0], b = v[1], x = Math.min(s, u, p, g), S = Math.min(c, d, m, _), C = Math.max(s, u, p, g), w = Math.max(c, d, m, _);
	s = s - x || 0, u = u - x || 0, p = p - x || 0, g = g - x || 0, c = c - S || 0, d = d - S || 0, m = m - S || 0, _ = _ - S || 0, y = y - x || 0, b = b - S || 0;
	var T = e[0], E = e[i + 1], D = sign(T * E);
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
function calculatePointerDist(e, t) {
	var n = t.clientX, r = t.clientY, i = t.datas, a = e.state, o = a.moveableClientRect, s = a.rootMatrix, c = a.is3d, l = a.pos1, u = o.left, d = o.top, f = c ? 4 : 3, p = __read(minus(calculateInversePosition(s, [n - u, r - d], f), l), 2), m = p[0], h = p[1], g = __read(getDragDist({
		datas: i,
		distX: m,
		distY: h
	}), 2);
	return [g[0], g[1]];
}
function setDragStart(e, t) {
	var n = t.datas, r = e.state, i = r.allMatrix, a = r.beforeMatrix, o = r.is3d, s = r.left, c = r.top, l = r.origin, u = r.offsetMatrix, d = r.targetMatrix, f = r.transformOrigin, p = o ? 4 : 3;
	n.is3d = o, n.matrix = i, n.targetMatrix = d, n.beforeMatrix = a, n.offsetMatrix = u, n.transformOrigin = f, n.inverseMatrix = invert(i, p), n.inverseBeforeMatrix = invert(a, p), n.absoluteOrigin = convertPositionMatrix(plus([s, c], l), p), n.startDragBeforeDist = calculate(n.inverseBeforeMatrix, n.absoluteOrigin, p), n.startDragDist = calculate(n.inverseMatrix, n.absoluteOrigin, p);
}
function getTransformDirection(e) {
	return calculateElementPosition(e.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function resolveTransformEvent(e, t, n) {
	var r = t.datas, i = t.originalDatas.beforeRenderable, a = r.transformIndex, o = i.nextTransforms, s = o.length, c = i.nextTransformAppendedIndexes, l = -1;
	a === -1 ? (n === "translate" ? l = 0 : n === "rotate" && (l = findIndex(o, function(e) {
		return e.match(/scale\(/g);
	})), l === -1 && (l = o.length), r.transformIndex = l) : l = find(c, function(e) {
		return e.index === a && e.functionName === n;
	}) ? a : a + c.filter(function(e) {
		return e.index < a;
	}).length;
	var u = convertTransformInfo(o, e.state, l), d = u.targetFunction, f = n === "rotate" ? "rotateZ" : n;
	r.beforeFunctionTexts = u.beforeFunctionTexts, r.afterFunctionTexts = u.afterFunctionTexts, r.beforeTransform = u.beforeFunctionMatrix, r.beforeTransform2 = u.beforeFunctionMatrix2, r.targetTansform = u.targetFunctionMatrix, r.afterTransform = u.afterFunctionMatrix, r.afterTransform2 = u.afterFunctionMatrix2, r.targetAllTransform = u.allFunctionMatrix, d.functionName === f ? (r.afterFunctionTexts.splice(0, 1), r.isAppendTransform = !1) : s > l && (r.isAppendTransform = !0, i.nextTransformAppendedIndexes = __spreadArray(__spreadArray([], __read(c), !1), [{
		functionName: n,
		index: l,
		isAppend: !0
	}], !1));
}
function convertTransformFormat(e, t, n) {
	return `${e.beforeFunctionTexts.join(" ")} ${e.isAppendTransform ? n : t} ${e.afterFunctionTexts.join(" ")}`;
}
function getTransformDist(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = __read(getBeforeDragDist({
		datas: t,
		distX: n,
		distY: r
	}), 2), a = i[0], o = i[1];
	return calculate(getTransfromMatrix(t, fromTranslation([a, o], 4)), convertPositionMatrix([
		0,
		0,
		0
	], 4), 4);
}
function getTransfromMatrix(e, t, n) {
	var r = e.beforeTransform, i = e.afterTransform, a = e.beforeTransform2, o = e.afterTransform2, s = e.targetAllTransform, c = n ? multiply(s, t, 4) : multiply(t, s, 4);
	return multiply(multiply(invert(n ? a : r, 4), c, 4), invert(n ? o : i, 4), 4);
}
function getBeforeDragDist(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = t.inverseBeforeMatrix, a = t.is3d, o = t.startDragBeforeDist, s = t.absoluteOrigin, c = a ? 4 : 3;
	return minus(calculate(i, plus(s, [n, r]), c), o);
}
function getDragDist(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.inverseBeforeMatrix, o = n.inverseMatrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return minus(calculate(t ? a : o, plus(u, [r, i]), d), t ? c : l);
}
function getInverseDragDist(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.beforeMatrix, o = n.matrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return minus(calculate(t ? a : o, plus(t ? c : l, [r, i]), d), u);
}
function calculateTransformOrigin(e, t, n, r, i, a) {
	return r === void 0 && (r = t), i === void 0 && (i = n), a === void 0 && (a = [0, 0]), e ? e.map(function(e, o) {
		var s = splitUnit(e), c = s.value, l = s.unit, u = o ? i : r, d = o ? n : t;
		return e === "%" || isNaN(c) ? d * (u ? a[o] / u : 0) : l === "%" ? d * c / 100 : c;
	}) : a;
}
function getPosIndexesByDirection(e) {
	var t = [];
	return e[1] >= 0 && (e[0] >= 0 && t.push(3), e[0] <= 0 && t.push(2)), e[1] <= 0 && (e[0] >= 0 && t.push(1), e[0] <= 0 && t.push(0)), t;
}
function getPosesByDirection(e, t) {
	return getPosIndexesByDirection(t).map(function(t) {
		return e[t];
	});
}
function getPosBySingleDirection(e, t) {
	var n = (t + 1) / 2;
	return [dot(e[0][0], e[1][0], n, 1 - n), dot(e[0][1], e[1][1], n, 1 - n)];
}
function getPosByDirection(e, t) {
	return getPosBySingleDirection([getPosBySingleDirection([e[0], e[1]], t[0]), getPosBySingleDirection([e[2], e[3]], t[0])], t[1]);
}
function getDist(e, t, n, r, i, a) {
	var o = getPosByDirection(calculatePoses(t, n, r, i), a);
	return [e[0] - o[0], e[1] - o[1]];
}
function getNextMatrix(e, t, n, r) {
	return multiply(e, getAbsoluteMatrix(t, r, n), r);
}
function getNextTransformMatrix(e, t, n, r) {
	var i = e.transformOrigin, a = e.offsetMatrix, o = e.is3d ? 4 : 3, s;
	if (isString(n)) {
		var c = t.beforeTransform, l = t.afterTransform;
		s = convertDimension(r ? parseMat(n) : multiply(multiply(c, parseMat([n]), 4), l, 4), 4, o);
	} else s = n;
	return getNextMatrix(a, s, i, o);
}
function scaleMatrix(e, t) {
	var n = e.transformOrigin, r = e.offsetMatrix, i = e.is3d, a = e.targetMatrix, o = e.targetAllTransform, s = i ? 4 : 3;
	return getNextMatrix(r, multiply(o || a, createScaleMatrix(t, s), s), n, s);
}
function fillTransformStartEvent(e, t) {
	var n = getBeforeRenderableDatas(t);
	return {
		setTransform: function(r, i) {
			i === void 0 && (i = -1), n.startTransforms = isArray(r) ? r : splitSpace(r), setTransformIndex(e, t, i);
		},
		setTransformIndex: function(n) {
			setTransformIndex(e, t, n);
		}
	};
}
function setDefaultTransformIndex(e, t, n) {
	var r = getBeforeRenderableDatas(t).startTransforms;
	setTransformIndex(e, t, findIndex(r, function(e) {
		return e.indexOf(`${n}(`) === 0;
	}));
}
function setTransformIndex(e, t, n) {
	var r = getBeforeRenderableDatas(t), i = t.datas;
	if (i.transformIndex = n, n !== -1) {
		var a = r.startTransforms[n];
		if (a) {
			var o = e.state;
			i.startValue = parse([a], {
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
function fillOriginalTransform(e, t) {
	var n = getBeforeRenderableDatas(e);
	n.nextTransforms = splitSpace(t);
}
function getBeforeRenderableDatas(e) {
	return e.originalDatas.beforeRenderable;
}
function getNextTransforms(e) {
	return e.originalDatas.beforeRenderable.nextTransforms;
}
function getNextTransformText(e) {
	return (getNextTransforms(e) || []).join(" ");
}
function getNextStyle(e) {
	return getBeforeRenderableDatas(e).nextStyle;
}
function fillTransformEvent(e, t, n, r, i) {
	fillOriginalTransform(i, t);
	var a = Draggable.drag(e, setCustomDrag(i, e.state, n, r, !1)), o = a ? a.transform : t;
	return __assign(__assign({
		transform: t,
		drag: a
	}, fillCSSObject({ transform: o }, i)), { afterTransform: o });
}
function getTranslateFixedPosition(e, t, n, r, i, a) {
	return getDirectionOffset(e, n, r, getNextTransformMatrix(e.state, i, t, a));
}
function getTranslateDist(e, t, n, r, i, a, o) {
	var s = getTranslateFixedPosition(e, t, n, i, a, o), c = e.state, l = c.left, u = c.top, d = e.props.groupable, f = d ? l : 0, p = d ? u : 0;
	return minus(minus(r, s), [f, p]);
}
function getScaleDist(e, t, n, r, i, a, o) {
	return getTranslateDist(e, t, n, r, i, a, o);
}
function getDirectionByPos(e, t, n) {
	return [t ? -1 + e[0] / (t / 2) : 0, n ? -1 + e[1] / (n / 2) : 0];
}
function getDirectionOffset(e, t, n, r) {
	r === void 0 && (r = e.state.allMatrix);
	var i = e.state, a = i.width, o = i.height, s = i.is3d ? 4 : 3, c = [a / 2 * (1 + t[0]) + n[0], o / 2 * (1 + t[1]) + n[1]];
	return calculatePosition(r, c, s);
}
function getRotateDist(e, t, n) {
	var r = n.fixedDirection, i = n.fixedPosition, a = n.fixedOffset;
	return getTranslateDist(e, `rotate(${t}deg)`, r, i, a, n);
}
function getResizeDist(e, t, n, r, i, a) {
	var o = e.props.groupable, s = e.state, c = s.transformOrigin, l = s.offsetMatrix, u = s.is3d, d = s.width, f = s.height, p = s.left, m = s.top, h = a.fixedDirection, g = a.nextTargetMatrix || s.targetMatrix, _ = u ? 4 : 3, v = calculateTransformOrigin(i, t, n, d, f, c), y = o ? p : 0, b = o ? m : 0;
	return minus(getDist(r, getNextMatrix(l, g, v, _), t, n, _, h), [y, b]);
}
function getAbsolutePosition(e, t) {
	return getPosByDirection(getAbsolutePosesByState(e.state), t);
}
function getGestoData(e, t) {
	var n = e.targetGesto, r = e.controlGesto, i;
	return n?.isFlag() && (i = n.getEventData()[t]), !i && r?.isFlag() && (i = r.getEventData()[t]), i || {};
}
function getShadowRoot(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function getIndividualTransforms(e) {
	var t = e("scale"), n = e("rotate"), r = e("translate"), i = [];
	return r && r !== "0px" && r !== "none" && i.push(`translate(${r.split(/\s+/).join(",")})`), n && n !== "1" && n !== "none" && i.push(`rotate(${n})`), t && t !== "1" && t !== "none" && i.push(`scale(${t.split(/\s+/).join(",")})`), i;
}
function getMatrixStackInfo(e, t, n) {
	for (var r = e, i = [], a = getDocumentElement(e) || getDocumentBody(e), o = !n && e === t || e === a, s = o, c = !1, l = 3, u, d, f, p = !1, m = getOffsetInfo(t, t, !0).offsetParent, h = 1; r && !s;) {
		s = o;
		var g = getCachedStyle(r), _ = g("position"), v = getElementTransform(r), y = _ === "fixed", b = getIndividualTransforms(g), x = convertCSStoMatrix(getTransformMatrix(v)), S = void 0, C = !1, w = !1, T = 0, E = 0, D = 0, O = 0, k = {
			hasTransform: !1,
			fixedContainer: null
		};
		y && (p = !0, k = getPositionFixedInfo(r), m = k.fixedContainer);
		var A = x.length;
		!c && (A === 16 || b.length) && (c = !0, l = 4, convert3DMatrixes(i), f &&= convertDimension(f, 3, 4)), c && A === 9 && (x = convertDimension(x, 3, 4));
		var j = getOffsetPosInfo(r, e), M = j.tagName, N = j.hasOffset, P = j.isSVG, F = j.origin, I = j.targetOrigin, L = j.offset, R = __read(L, 2), z = R[0], B = R[1];
		M === "svg" && !r.ownerSVGElement && f && (i.push({
			type: "target",
			target: r,
			matrix: getSVGMatrix(r, l)
		}), i.push({
			type: "offset",
			target: r,
			matrix: createIdentityMatrix(l)
		}));
		var V = parseFloat(g("zoom")) || 1;
		if (y) S = k.fixedContainer, C = !0;
		else {
			var H = getOffsetInfo(r, t, !1, !0, g), U = H.offsetZoom;
			if (S = H.offsetParent, C = H.isEnd, w = H.isStatic, h *= U, (H.isCustomElement || U !== 1) && w) z -= S.offsetLeft, B -= S.offsetTop;
			else if ((IS_FIREFOX || IS_CHROMIUM109) && H.parentSlotElement) {
				for (var W = S, G = 0, K = 0; W && getShadowRoot(W);) G += W.offsetLeft, K += W.offsetTop, W = W.offsetParent;
				z -= G, B -= K;
			}
		}
		if (IS_WEBKIT && !IS_SAFARI_ABOVE15 && N && !P && w && (_ === "relative" || _ === "static") && (z -= S.offsetLeft, B -= S.offsetTop, o ||= C), y) N && k.hasTransform && (D = S.clientLeft, O = S.clientTop);
		else if (N && m !== S && (T = S.clientLeft, E = S.clientTop), N && S === a) {
			var q = getBodyOffset(r, !1);
			z += q[0], B += q[1];
		}
		if (i.push({
			type: "target",
			target: r,
			matrix: getAbsoluteMatrix(x, l, F)
		}), b.length && (i.push({
			type: "offset",
			target: r,
			matrix: createIdentityMatrix(l)
		}), i.push({
			type: "target",
			target: r,
			matrix: getAbsoluteMatrix(parseMat(b), l, F)
		})), N) {
			var J = r === e, Y = J ? 0 : r.scrollLeft, X = J ? 0 : r.scrollTop;
			i.push({
				type: "offset",
				target: r,
				matrix: createOriginMatrix([z - Y + T - D, B - X + E - O], l)
			});
		} else i.push({
			type: "offset",
			target: r,
			origin: F
		});
		if (V !== 1 && i.push({
			type: "zoom",
			target: r,
			matrix: getAbsoluteMatrix(createScaleMatrix([V, V], l), l, [0, 0])
		}), f ||= x, u ||= F, d ||= I, s || y) break;
		r = S, o = C, (!n || r === a) && (s = o);
	}
	return f ||= createIdentityMatrix(l), u ||= [0, 0], d ||= [0, 0], {
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
var cacheStyleMap = null, clientRectStyleMap = null, matrixContainerInfos = null;
function setStoreCache(e) {
	e ? (window.Map && (cacheStyleMap = /* @__PURE__ */ new Map(), clientRectStyleMap = /* @__PURE__ */ new Map()), matrixContainerInfos = []) : (cacheStyleMap = null, matrixContainerInfos = null, clientRectStyleMap = null);
}
function getCachedClientRect(e) {
	var t = clientRectStyleMap?.get(e);
	if (t) return t;
	var n = getClientRect(e, !0);
	return clientRectStyleMap && clientRectStyleMap.set(e, n), n;
}
function getCachedMatrixContainerInfo(e, t) {
	if (matrixContainerInfos) {
		var n = find(matrixContainerInfos, function(n) {
			return n[0][0] == e && n[0][1] == t;
		});
		if (n) return n[1];
	}
	var r = getMatrixStackInfo(e, t, !0);
	return matrixContainerInfos && matrixContainerInfos.push([[e, t], r]), r;
}
function getCachedStyle(e) {
	var t = cacheStyleMap?.get(e);
	if (!t) {
		var n = getWindow(e).getComputedStyle(e);
		if (!cacheStyleMap) return function(e) {
			return n[e];
		};
		t = {
			style: n,
			cached: {}
		}, cacheStyleMap.set(e, t);
	}
	var r = t.cached, i = t.style;
	return function(e) {
		return e in r || (r[e] = i[e]), r[e];
	};
}
function fillChildEvents(e, t, n) {
	var r = n.originalDatas;
	r.groupable = r.groupable || {};
	var i = r.groupable;
	i.childDatas = i.childDatas || [];
	var a = i.childDatas;
	return e.moveables.map(function(e, r) {
		return a[r] = a[r] || {}, a[r][t] = a[r][t] || {}, __assign(__assign({}, n), {
			isRequestChild: !0,
			datas: a[r][t],
			originalDatas: a[r]
		});
	});
}
function triggerChildGesto(e, t, n, r, i, a, o) {
	var s = !!n.match(/Start$/g), c = !!n.match(/End$/g), l = i.isPinch, u = i.datas, d = fillChildEvents(e, t.name, i), f = e.moveables, p = [], m = d.map(function(e, i) {
		var d = f[i], m = d.state, h = m.gestos, g = e;
		if (s) g = new CustomGesto(o).dragStart(r, e), p.push(g);
		else {
			if (h[o] || (h[o] = u.childGestos[i]), !h[o]) return;
			g = setCustomDrag(e, m, r, l, a, o), p.push(g);
		}
		var _ = t[n](d, __assign(__assign({}, g), { parentFlag: !0 }));
		return c && (h[o] = null), _;
	});
	return s && (u.childGestos = f.map(function(e) {
		return e.state.gestos[o];
	})), {
		eventParams: m,
		childEvents: p
	};
}
function triggerChildAbles(e, t, n, r, i, a) {
	i === void 0 && (i = function(e, t) {
		return t;
	});
	var o = !!n.match(/End$/g), s = fillChildEvents(e, t.name, r), c = e.moveables;
	return s.map(function(e, r) {
		var s = c[r], l = e;
		l = i(s, e);
		var u = t[n](s, __assign(__assign({}, l), { parentFlag: !0 }));
		return u && a && a(s, e, u, r), o && (s.state.gestos = {}), u;
	});
}
function startChildDist(e, t, n, r) {
	var i = n.fixedDirection, a = n.fixedPosition, o = getPosByDirection(r.datas.startPositions || getAbsolutePosesByState(t.state), i), s = __read(calculate(createRotateMatrix(-e.rotation / 180 * Math.PI, 3), [
		o[0] - a[0],
		o[1] - a[1],
		1
	], 3), 2), c = s[0], l = s[1];
	return r.datas.originalX = c, r.datas.originalY = l, r;
}
function renderDirectionControlsByInfos(e, t, n, r) {
	var i = e.getState(), a = i.renderPoses, o = i.rotation, s = i.direction, c = getProps(e.props, t).zoom, l = absDegree(o / Math.PI * 180), u = {}, d = e.renderState;
	d.renderDirectionMap ||= {};
	var f = d.renderDirectionMap;
	n.forEach(function(e) {
		var t = e.dir;
		u[t] = !0;
	});
	var p = sign(s);
	return n.map(function(e) {
		var n = e.data, i = e.classNames, s = e.dir, d = DIRECTION_INDEXES[s];
		if (!d || !u[s]) return null;
		f[s] = !0;
		var m = (throttle(l, 15) + p * DIRECTION_ROTATIONS[s] + 720) % 180, h = {};
		return getKeys(n).forEach(function(e) {
			h[`data-${e}`] = n[e];
		}), r.createElement("div", __assign({
			className: prefix.apply(void 0, __spreadArray([
				"control",
				"direction",
				s,
				t
			], __read(i), !1)),
			"data-rotation": m,
			"data-direction": s
		}, h, {
			key: `direction-${s}`,
			style: getControlTransform.apply(void 0, __spreadArray([o, c], __read(d.map(function(e) {
				return a[e];
			})), !1))
		}));
	});
}
function renderDirectionControls(e, t, n, r) {
	var i = getProps(e.props, n), a = i.renderDirections, o = a === void 0 ? t : a, s = i.displayAroundControls;
	if (!o) return [];
	var c = o === !0 ? DIRECTIONS : o;
	return __spreadArray(__spreadArray([], __read(s ? renderAroundControls(e, r, n, c) : []), !1), __read(renderDirectionControlsByInfos(e, n, c.map(function(e) {
		return {
			data: {},
			classNames: [],
			dir: e
		};
	}), r)), !1);
}
function renderLine(e, t, n, r, i, a) {
	var o = [...arguments].slice(6), s = getRad$1(n, r), c = t ? throttle(s / Math.PI * 180, 15) % 180 : -1;
	return e.createElement("div", {
		key: `line-${a}`,
		className: prefix.apply(void 0, __spreadArray([
			"line",
			"direction",
			t ? "edge" : "",
			t
		], __read(o), !1)),
		"data-rotation": c,
		"data-line-key": a,
		"data-direction": t,
		style: getLineStyle(n, r, i, s)
	});
}
function renderEdgeLines(e, t, n, r, i) {
	return (n === !0 ? DIRECTIONS4 : n).map(function(n, a) {
		var o = __read(DIRECTION_INDEXES[n], 2), s = o[0], c = o[1];
		if (c != null) return renderLine(e, n, r[s], r[c], i, `${t}Edge${a}`, t);
	}).filter(Boolean);
}
function getRenderDirections(e) {
	return function(t, n) {
		var r = getProps(t.props, e).edge;
		return r && (r === !0 || r.length) ? __spreadArray(__spreadArray([], __read(renderEdgeLines(n, e, r, t.getState().renderPoses, t.props.zoom)), !1), __read(renderDiagonalDirections(t, e, n)), !1) : renderAllDirections(t, e, n);
	};
}
function renderAllDirections(e, t, n) {
	return renderDirectionControls(e, DIRECTIONS, t, n);
}
function renderDiagonalDirections(e, t, n) {
	return renderDirectionControls(e, [
		"nw",
		"ne",
		"sw",
		"se"
	], t, n);
}
function renderAroundControls(e, t, n, r) {
	var i = e.renderState;
	i.renderDirectionMap ||= {};
	var a = e.getState(), o = a.renderPoses, s = a.rotation, c = a.direction, l = i.renderDirectionMap, u = e.props.zoom, d = sign(c), f = s / Math.PI * 180;
	return (r || getKeys(l)).map(function(e) {
		var r = DIRECTION_INDEXES[e];
		if (!r) return null;
		var i = (throttle(f, 15) + d * DIRECTION_ROTATIONS[e] + 720) % 180, a = ["around-control"];
		return n && a.push("direction", n), t.createElement("div", {
			className: prefix.apply(void 0, __spreadArray([], __read(a), !1)),
			"data-rotation": i,
			"data-direction": e,
			key: `direction-around-${e}`,
			style: getControlTransform.apply(void 0, __spreadArray([s, u], __read(r.map(function(e) {
				return o[e];
			})), !1))
		});
	});
}
function checkBoundPoses(e, t, n) {
	var r = e || {}, i = r.position, a = i === void 0 ? "client" : i, o = r.left, s = o === void 0 ? -Infinity : o, c = r.top, l = c === void 0 ? -Infinity : c, u = r.right, d = u === void 0 ? Infinity : u, f = r.bottom, p = {
		position: a,
		left: s,
		top: l,
		right: d,
		bottom: f === void 0 ? Infinity : f
	};
	return {
		vertical: checkBounds(p, t, !0),
		horizontal: checkBounds(p, n, !1)
	};
}
function getBounds(e, t) {
	var n = e.state, r = n.containerClientRect, i = r.clientHeight, a = r.clientWidth, o = r.clientLeft, s = r.clientTop, c = n.snapOffset, l = c.left, u = c.top, d = c.right, f = c.bottom, p = t || e.props.bounds || {}, m = (p.position || "client") === "css", h = p.left, g = h === void 0 ? -Infinity : h, _ = p.top, v = _ === void 0 ? -Infinity : _, y = p.right, b = y === void 0 ? m ? -Infinity : Infinity : y, x = p.bottom, S = x === void 0 ? m ? -Infinity : Infinity : x;
	return m && (b = a + d - l - b, S = i + f - u - S), {
		left: g + l - o,
		right: b + l - o,
		top: v + u - s,
		bottom: S + u - s
	};
}
function checkBoundKeepRatio(e, t, n) {
	var r = getBounds(e), i = r.left, a = r.top, o = r.right, s = r.bottom, c = __read(n, 2), l = c[0], u = c[1], d = __read(minus(n, t), 2), f = d[0], p = d[1];
	abs(f) < TINY_NUM && (f = 0), abs(p) < TINY_NUM && (p = 0);
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
function checkBounds(e, t, n) {
	var r = e[n ? "left" : "top"], i = e[n ? "right" : "bottom"], a = Math.min.apply(Math, __spreadArray([], __read(t), !1)), o = Math.max.apply(Math, __spreadArray([], __read(t), !1)), s = [];
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
		return abs(t.offset) - abs(e.offset);
	});
}
function isBoundRotate$1(e, t, n) {
	return (n ? e.map(function(e) {
		return rotate(e, n);
	}) : e).some(function(e) {
		return e[0] < t.left && abs(e[0] - t.left) > .1 || e[0] > t.right && abs(e[0] - t.right) > .1 || e[1] < t.top && abs(e[1] - t.top) > .1 || e[1] > t.bottom && abs(e[1] - t.bottom) > .1;
	});
}
function boundRotate(e, t, n) {
	var r = getDistSize(e), i = Math.sqrt(r * r - t * t) || 0;
	return [i, -i].sort(function(t, r) {
		return abs(t - e[n ? 0 : 1]) - abs(r - e[n ? 0 : 1]);
	}).map(function(e) {
		return getRad$1([0, 0], n ? [e, t] : [t, e]);
	});
}
function checkRotateBounds(e, t, n, r, i) {
	if (!e.props.bounds) return [];
	var a = i * Math.PI / 180, o = getBounds(e), s = o.left, c = o.top, l = o.right, u = o.bottom, d = s - r[0], f = l - r[0], p = c - r[1], m = u - r[1], h = {
		left: d,
		top: p,
		right: f,
		bottom: m
	};
	if (!isBoundRotate$1(n, h, 0)) return [];
	var g = [];
	return [
		[d, 0],
		[f, 0],
		[p, 1],
		[m, 1]
	].forEach(function(e) {
		var r = __read(e, 2), i = r[0], o = r[1];
		n.forEach(function(e) {
			var n = getRad$1([0, 0], e);
			g.push.apply(g, __spreadArray([], __read(boundRotate(e, i, o).map(function(e) {
				return a + e - n;
			}).filter(function(e) {
				return !isBoundRotate$1(t, h, e);
			}).map(function(e) {
				return throttle(e * 180 / Math.PI, TINY_NUM);
			})), !1));
		});
	}), g;
}
var VERTICAL_NAMES = [
	"left",
	"right",
	"center"
], HORIZONTAL_NAMES = [
	"top",
	"bottom",
	"middle"
], SNAP_SKIP_NAMES_MAP = {
	left: "start",
	right: "end",
	center: "center",
	top: "start",
	bottom: "end",
	middle: "center"
}, VERTICAL_NAMES_MAP = {
	start: "left",
	end: "right",
	center: "center"
}, HORIZONTAL_NAMES_MAP = {
	start: "top",
	end: "bottom",
	center: "middle"
};
function getInitialBounds() {
	return {
		left: !1,
		top: !1,
		right: !1,
		bottom: !1
	};
}
function hasGuidelines(e, t) {
	var n = e.props, r = n.snappable, i = n.bounds, a = n.innerBounds, o = n.verticalGuidelines, s = n.horizontalGuidelines, c = n.snapGridWidth, l = n.snapGridHeight, u = e.state, d = u.guidelines, f = u.enableSnap;
	return !r || !f || t && r !== !0 && r.indexOf(t) < 0 ? !1 : !!(c || l || i || a || d && d.length || o && o.length || s && s.length);
}
function getSnapDirections(e) {
	return e === !1 ? {} : e === !0 || !e ? {
		left: !0,
		right: !0,
		top: !0,
		bottom: !0
	} : e;
}
function mapSnapDirectionPoses(e, t) {
	var n = getSnapDirections(e), r = {};
	for (var i in n) i in t && n[i] && (r[i] = t[i]);
	return r;
}
function splitSnapDirectionPoses(e, t) {
	var n = mapSnapDirectionPoses(e, t), r = HORIZONTAL_NAMES.filter(function(e) {
		return e in n;
	}), i = VERTICAL_NAMES.filter(function(e) {
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
function calculateContainerPos(e, t, n) {
	var r = calculatePosition(e, [t.clientLeft, t.clientTop], n);
	return [t.left + r[0], t.top + r[1]];
}
function solveLineConstants(e) {
	var t = __read(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	Math.abs(i) < 1e-7 && (i = 0), Math.abs(a) < 1e-7 && (a = 0);
	var o = 0, s = 0, c = 0;
	return i ? a ? (o = -a / i, s = 1, c = o * n[0] - n[1]) : (s = 1, c = -n[1]) : (o = -1, c = n[0]), [
		o,
		s,
		c
	].map(function(e) {
		return throttle(e, TINY_NUM$1);
	});
}
var NAME_snapRotationThreshold = "snapRotationThreshold", NAME_snapRotationDegrees = "snapRotationDegrees", NAME_snapHorizontalThreshold = "snapHorizontalThreshold", NAME_snapVerticalThreshold = "snapVerticalThreshold";
function checkMoveableSnapPoses(e, t, n, r, i, a, o) {
	r === void 0 && (r = []), i === void 0 && (i = []);
	var s = e.props, c = e.state.snapThresholdInfo?.multiples || [1, 1], l = selectValue(o, s[NAME_snapHorizontalThreshold], 5), u = selectValue(a, s[NAME_snapVerticalThreshold], 5);
	return checkSnapPoses(e.state.guidelines, t, n, r, i, l, u, c);
}
function checkSnapPoses(e, t, n, r, i, a, o, s) {
	return {
		vertical: checkSnap(e, "vertical", t, o * s[0], r),
		horizontal: checkSnap(e, "horizontal", n, a * s[1], i)
	};
}
function checkSnapKeepRatio(e, t, n) {
	var r = __read(n, 2), i = r[0], a = r[1], o = __read(t, 2), s = o[0], c = o[1], l = __read(minus(n, t), 2), u = l[0], d = l[1], f = d > 0, p = u > 0;
	u = getTinyDist(u), d = getTinyDist(d);
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
	var g = checkMoveableSnapPoses(e, u ? [i] : [], d ? [a] : [], [], [], void 0, void 0), _ = g.vertical, v = g.horizontal;
	_.posInfos.filter(function(e) {
		var t = e.pos;
		return p ? t >= s : t <= s;
	}), v.posInfos.filter(function(e) {
		var t = e.pos;
		return f ? t >= c : t <= c;
	}), _.isSnap = _.posInfos.length > 0, v.isSnap = v.posInfos.length > 0;
	var y = getNearestSnapGuidelineInfo(_), b = y.isSnap, x = y.guideline, S = getNearestSnapGuidelineInfo(v), C = S.isSnap, w = S.guideline, T = C ? w.pos[1] : 0, E = b ? x.pos[0] : 0;
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
function getStringDirection(e) {
	var t = "";
	return e === -1 || e === "top" || e === "left" ? t = "start" : e === 0 || e === "center" || e === "middle" ? t = "center" : (e === 1 || e === "right" || e === "bottom") && (t = "end"), t;
}
function checkSnaps(e, t, n, r) {
	var i = splitSnapDirectionPoses(e.props.snapDirections, t), a = checkMoveableSnapPoses(e, i.vertical, i.horizontal, i.verticalNames.map(function(e) {
		return getStringDirection(e);
	}), i.horizontalNames.map(function(e) {
		return getStringDirection(e);
	}), n, r), o = getStringDirection(i.horizontalNames[a.horizontal.index]), s = getStringDirection(i.verticalNames[a.vertical.index]);
	return {
		vertical: __assign(__assign({}, a.vertical), { direction: s }),
		horizontal: __assign(__assign({}, a.horizontal), { direction: o })
	};
}
function getNearestSnapGuidelineInfo(e) {
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
function checkSnap(e, t, n, r, i) {
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
					dist: abs(t),
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
function getSnapInfosByDirection(e, t, n, r, i) {
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
	}) : e.props.keepRatio ? a.push([-1, -1], [-1, 1], [1, -1], [1, 1], n) : (a.push.apply(a, __spreadArray([], __read(getPosesByDirection([
		[-1, -1],
		[1, -1],
		[-1, -1],
		[1, 1]
	], n)), !1)), a.length > 1 && a.push([(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2]));
	var o = a.map(function(e) {
		return getPosByDirection(t, e);
	}), s = checkMoveableSnapPoses(e, o.map(function(e) {
		return e[0];
	}), o.map(function(e) {
		return e[1];
	}), a.map(function(e) {
		return getStringDirection(e[0]);
	}), a.map(function(e) {
		return getStringDirection(e[1]);
	}), r, i), c = getStringDirection(a.map(function(e) {
		return e[0];
	})[s.vertical.index]), l = getStringDirection(a.map(function(e) {
		return e[1];
	})[s.horizontal.index]);
	return {
		vertical: __assign(__assign({}, s.vertical), { direction: c }),
		horizontal: __assign(__assign({}, s.horizontal), { direction: l })
	};
}
function checkSnapBoundPriority(e, t) {
	var n = abs(e.offset), r = abs(t.offset);
	return e.isBound && t.isBound ? r - n : e.isBound ? -1 : t.isBound ? 1 : e.isSnap && t.isSnap ? r - n : e.isSnap ? -1 : t.isSnap || n < TINY_NUM ? 1 : r < TINY_NUM ? -1 : n - r;
}
function getNearOffsetInfo(e, t) {
	return e.slice().sort(function(e, n) {
		var r = e.sign[t], i = n.sign[t], a = e.offset[t], o = n.offset[t];
		if (r) {
			if (!i) return -1;
		} else return 1;
		return checkSnapBoundPriority({
			isBound: e.isBound,
			isSnap: e.isSnap,
			offset: a
		}, {
			isBound: n.isBound,
			isSnap: n.isSnap,
			offset: o
		});
	})[0];
}
function getCheckSnapDirections(e, t, n) {
	var r = [];
	if (n) abs(t[0]) !== 1 || abs(t[1]) !== 1 ? r.push([t, [-1, -1]], [t, [-1, 1]], [t, [1, -1]], [t, [1, 1]]) : r.push([t, [e[0], -e[1]]], [t, [-e[0], e[1]]]), r.push([t, e]);
	else if (e[0] && e[1] || !e[0] && !e[1]) {
		var i = e[0] ? e : [1, 1];
		[1, -1].forEach(function(e) {
			[1, -1].forEach(function(n) {
				var a = [e * i[0], n * i[1]];
				t[0] === a[0] && t[1] === a[1] || r.push([t, a]);
			});
		});
	} else if (e[0]) {
		var a = abs(t[0]) === 1 ? [1] : [1, -1];
		a.forEach(function(n) {
			r.push([[t[0], -1], [n * e[0], -1]], [[t[0], 0], [n * e[0], 0]], [[t[0], 1], [n * e[0], 1]]);
		});
	} else if (e[1]) {
		var a = abs(t[1]) === 1 ? [1] : [1, -1];
		a.forEach(function(n) {
			r.push([[-1, t[1]], [-1, n * e[1]]], [[0, t[1]], [0, n * e[1]]], [[1, t[1]], [1, n * e[1]]]);
		});
	}
	return r;
}
function isStartLine(e, t) {
	var n = average([t[0][0], t[1][0]]), r = average([t[0][1], t[1][1]]);
	return {
		vertical: n <= e[0],
		horizontal: r <= e[1]
	};
}
function hitTestLine(e, t) {
	var n = __read(t, 2), r = n[0], i = n[1], a = i[0] - r[0], o = i[1] - r[1];
	abs(a) < TINY_NUM && (a = 0), abs(o) < TINY_NUM && (o = 0);
	var s, c;
	return a ? o ? (s = o / a * (e[0] - r[0]) + r[1], c = e[1]) : (s = r[1], c = e[1]) : (s = r[0], c = e[0]), s - c;
}
function isSameStartLine(e, t, n, r) {
	return r === void 0 && (r = TINY_NUM), e.every(function(e) {
		var i = hitTestLine(e, t);
		return i <= 0 === n || abs(i) <= r;
	});
}
function checkInnerBoundDot(e, t, n, r, i) {
	return i === void 0 && (i = 0), r && t - i <= e || !r && e <= n + i ? {
		isBound: !0,
		offset: r ? t - e : n - e
	} : {
		isBound: !1,
		offset: 0
	};
}
function checkInnerBound(e, t) {
	var n = t.line, r = t.centerSign, i = t.verticalSign, a = t.horizontalSign, o = t.lineConstants, s = e.props.innerBounds;
	if (!s) return {
		isAllBound: !1,
		isBound: !1,
		isVerticalBound: !1,
		isHorizontalBound: !1,
		offset: [0, 0]
	};
	var c = s.left, l = s.top, u = s.width, d = s.height, f = [[c, l], [c, l + d]], p = [[c, l], [c + u, l]], m = [[c + u, l], [c + u, l + d]], h = [[c, l + d], [c + u, l + d]];
	if (isSameStartLine([
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
	var g = checkLineBoundCollision(n, o, p, i), _ = checkLineBoundCollision(n, o, h, i), v = checkLineBoundCollision(n, o, f, a), y = checkLineBoundCollision(n, o, m, a), b = g.isBound && _.isBound, x = g.isBound || _.isBound, S = v.isBound && y.isBound, C = v.isBound || y.isBound, w = maxOffset(g.offset, _.offset), T = maxOffset(v.offset, y.offset), E = [0, 0], D = !1, O = !1;
	return abs(T) < abs(w) ? (E = [w, 0], D = x, O = b) : (E = [0, T], D = C, O = S), {
		isAllBound: O,
		isVerticalBound: x,
		isHorizontalBound: C,
		isBound: D,
		offset: E
	};
}
function checkLineBoundCollision(e, t, n, r, i, a) {
	var o = __read(t, 2), s = o[0], c = o[1], l = e[0], u = n[0], d = n[1], f = getTinyDist(d[1] - u[1]), p = getTinyDist(d[0] - u[0]), m = c, h = s, g = -s / c;
	if (p) {
		if (!f) {
			if (a && !m) return {
				isBound: !1,
				offset: 0
			};
			if (h) return checkInnerBoundDot((u[1] - l[1]) / g + l[0], u[0], d[0], r, i);
			var _ = u[1] - l[1], v = abs(_) <= (i || 0);
			return {
				isBound: v,
				offset: v ? _ : 0
			};
		}
	} else {
		if (a && !h) return {
			isBound: !1,
			offset: 0
		};
		if (m) return checkInnerBoundDot(g * (u[0] - l[0]) + l[1], u[1], d[1], r, i);
		var _ = u[0] - l[0], v = abs(_) <= (i || 0);
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
function getInnerBoundInfo(e, t, n) {
	return t.map(function(t) {
		var r = checkInnerBound(e, t), i = r.isBound, a = r.offset, o = r.isVerticalBound, s = r.isHorizontalBound, c = t.multiple;
		return {
			sign: c,
			isBound: i,
			isVerticalBound: o,
			isHorizontalBound: s,
			isSnap: !1,
			offset: getDragDist({
				datas: n,
				distX: a[0],
				distY: a[1]
			}).map(function(e, t) {
				return e * (c[t] ? 2 / c[t] : 0);
			})
		};
	});
}
function getInnerBoundDragInfo(e, t, n) {
	var r, i = getInnerBoundInfo(e, getCheckInnerBoundLineInfos(e, t, [0, 0], !1).map(function(e) {
		return __assign(__assign({}, e), { multiple: e.multiple.map(function(e) {
			return abs(e) * 2;
		}) });
	}), n), a = getNearOffsetInfo(i, 0), o = getNearOffsetInfo(i, 1), s = 0, c = 0, l = a.isVerticalBound || o.isVerticalBound, u = a.isHorizontalBound || o.isHorizontalBound;
	return (l || u) && (r = __read(getInverseDragDist({
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
function getCheckSnapLineDirections(e, t) {
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
function getCheckInnerBoundLineInfos(e, t, n, r) {
	var i = e.state, a = i.allMatrix, o = i.is3d, s = calculatePoses(a, 100, 100, o ? 4 : 3), c = getPosByDirection(s, [0, 0]);
	return getCheckSnapLineDirections(n, r).map(function(e) {
		var n = __read(e, 3), r = n[0], i = n[1], a = n[2], o = [getPosByDirection(s, i), getPosByDirection(s, a)], l = solveLineConstants(o), u = isStartLine(c, o), d = u.vertical, f = u.horizontal;
		return {
			multiple: r,
			centerSign: hitTestLine(c, o) <= 0,
			verticalSign: d,
			horizontalSign: f,
			lineConstants: l,
			line: [getPosByDirection(t, i), getPosByDirection(t, a)]
		};
	});
}
function isBoundRotate(e, t, n, r) {
	var i = r ? e.map(function(e) {
		return rotate(e, r);
	}) : e;
	return [
		[i[0], i[1]],
		[i[1], i[3]],
		[i[3], i[2]],
		[i[2], i[0]]
	].some(function(e) {
		return !isSameStartLine(t, e, hitTestLine(n, e) <= 0);
	});
}
function getDistPointLine(e) {
	var t = __read(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return abs(n[0]);
	if (!a) return abs(n[1]);
	var o = a / i;
	return abs((-o * n[0] + n[1]) / Math.sqrt(o ** 2 + 1));
}
function solveReverseLine(e) {
	var t = __read(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return [n[0], 0];
	if (!a) return [0, n[1]];
	var o = a / i, s = -o * n[0] + n[1];
	return [-s / (o + 1 / o), s / (o * o + 1)];
}
function checkRotateInnerBounds(e, t, n, r, i) {
	var a = e.props.innerBounds, o = i * Math.PI / 180;
	if (!a) return [];
	var s = a.left, c = a.top, l = a.width, u = a.height, d = s - r[0], f = s + l - r[0], p = c - r[1], m = c + u - r[1], h = [
		[d, p],
		[f, p],
		[d, m],
		[f, m]
	], g = getPosByDirection(n, [0, 0]);
	if (!isBoundRotate(n, h, g, 0)) return [];
	var _ = [], v = h.map(function(e) {
		return [getDistSize(e), getRad$1([0, 0], e)];
	});
	return [
		[n[0], n[1]],
		[n[1], n[3]],
		[n[3], n[2]],
		[n[2], n[0]]
	].forEach(function(e) {
		var n = getRad$1([0, 0], solveReverseLine(e)), r = getDistPointLine(e);
		_.push.apply(_, __spreadArray([], __read(v.filter(function(e) {
			var t = __read(e, 1)[0];
			return t && r <= t;
		}).map(function(e) {
			var t = __read(e, 2), i = t[0], a = t[1], s = Math.acos(i ? r / i : 0), c = a + s, l = a - s;
			return [o + c - n, o + l - n];
		}).reduce(function(e, t) {
			return e.push.apply(e, __spreadArray([], __read(t), !1)), e;
		}, []).filter(function(e) {
			return !isBoundRotate(t, h, g, e);
		}).map(function(e) {
			return throttle(e * 180 / Math.PI, TINY_NUM);
		})), !1));
	}), _;
}
function checkInnerBoundPoses(e) {
	var t = e.props.innerBounds, n = getInitialBounds();
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
	], a = getPosByDirection(i, [0, 0]), o = t.left, s = t.top, c = t.width, l = t.height, u = [[o, s], [o, s + l]], d = [[o, s], [o + c, s]], f = [[o + c, s], [o + c, s + l]], p = [[o, s + l], [o + c, s + l]], m = getCheckInnerBoundLineInfos(e, i, [0, 0], !1), h = [], g = [];
	return m.forEach(function(e) {
		var t = e.line, r = e.lineConstants, i = isStartLine(a, t), m = i.horizontal, _ = i.vertical, v = checkLineBoundCollision(t, r, d, _, 1, !0), y = checkLineBoundCollision(t, r, p, _, 1, !0), b = checkLineBoundCollision(t, r, u, m, 1, !0), x = checkLineBoundCollision(t, r, f, m, 1, !0);
		v.isBound && !n.top && (h.push(s), n.top = !0), y.isBound && !n.bottom && (h.push(s + l), n.bottom = !0), b.isBound && !n.left && (g.push(o), n.left = !0), x.isBound && !n.right && (g.push(o + c), n.right = !0);
	}), {
		boundMap: n,
		horizontal: h,
		vertical: g
	};
}
function solveEquation(e, t, n, r) {
	var i = t[0] - e[0], a = t[1] - e[1];
	if (abs(i) < 1e-7 && (i = 0), abs(a) < 1e-7 && (a = 0), !i) return r ? [0, 0] : [0, n];
	if (!a) return r ? [n, 0] : [0, 0];
	var o = a / i, s = e[1] - o * e[0];
	return r ? [n, o * (t[0] + n) + s - t[1]] : [(t[1] + n - s) / o - t[0], n];
}
function solveNextOffset(e, t, n, r, i) {
	var a = solveEquation(e, t, n, r);
	if (!a) return {
		isOutside: !1,
		offset: [0, 0]
	};
	var o = getDist$2(e, t), s = getDist$2(a, e), c = getDist$2(a, t), l = s > o || c > o, u = __read(getDragDist({
		datas: i,
		distX: a[0],
		distY: a[1]
	}), 2);
	return {
		offset: [u[0], u[1]],
		isOutside: l
	};
}
function getSnapBound(e, t) {
	return e.isBound ? e.offset : t.isSnap ? getNearestSnapGuidelineInfo(t).offset : 0;
}
function checkThrottleDragRotate(e, t, n, r, i) {
	var a = __read(t, 2), o = a[0], s = a[1], c = __read(n, 2), l = c[0], u = c[1], d = __read(r, 2), f = d[0], p = d[1], m = __read(i, 2), h = m[0], g = m[1], _ = -h, v = -g;
	if (e && o && s) {
		_ = 0, v = 0;
		var y = [];
		if (l && u ? y.push([0, g], [h, 0]) : l ? y.push([h, 0]) : u ? y.push([0, g]) : f && p ? y.push([0, g], [h, 0]) : f ? y.push([h, 0]) : p && y.push([0, g]), y.length) {
			y.sort(function(e, t) {
				return getDistSize(minus([o, s], e)) - getDistSize(minus([o, s], t));
			});
			var b = y[0];
			if (b[0] && abs(o) > 1e-7) _ = -b[0], v = s * abs(o + _) / abs(o) - s;
			else if (b[1] && abs(s) > 1e-7) {
				var x = s;
				v = -b[1], _ = o * abs(s + v) / abs(x) - o;
			}
			if (e && u && l) if (abs(_) > 1e-7 && abs(_) < abs(h)) {
				var S = abs(h) / abs(_);
				_ *= S, v *= S;
			} else if (abs(v) > 1e-7 && abs(v) < abs(g)) {
				var S = abs(g) / abs(v);
				_ *= S, v *= S;
			} else _ = maxOffset(-h, _), v = maxOffset(-g, v);
		}
	} else _ = o || l ? -h : 0, v = s || u ? -g : 0;
	return [_, v];
}
function checkSnapBoundsDrag(e, t, n, r, i, a) {
	if (!hasGuidelines(e, "draggable")) return [{
		isSnap: !1,
		isBound: !1,
		offset: 0
	}, {
		isSnap: !1,
		isBound: !1,
		offset: 0
	}];
	var o = getAbsolutePoses(a.absolutePoses, [t, n]), s = getRect(o), c = s.left, l = s.right, u = s.top, d = s.bottom, f = {
		horizontal: o.map(function(e) {
			return e[1];
		}),
		vertical: o.map(function(e) {
			return e[0];
		})
	}, p = checkMoveableSnapBounds(e, i, splitSnapDirectionPoses(getSnapDirections(e.props.snapDirections), {
		left: c,
		right: l,
		top: u,
		bottom: d,
		center: (c + l) / 2,
		middle: (u + d) / 2
	}), f), m = p.vertical, h = p.horizontal, g = getInnerBoundDragInfo(e, o, a), _ = g.vertical, v = g.horizontal, y = m.isSnap, b = h.isSnap, x = m.isBound || _.isBound, S = h.isBound || v.isBound, C = maxOffset(m.offset, _.offset), w = maxOffset(h.offset, v.offset), T = __read(checkThrottleDragRotate(r, [t, n], [x, S], [y, b], [C, w]), 2), E = T[0], D = T[1];
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
function checkMoveableSnapBounds(e, t, n, r) {
	r === void 0 && (r = n);
	var i = checkBoundPoses(getBounds(e), r.vertical, r.horizontal), a = i.horizontal, o = i.vertical, s = t ? {
		horizontal: {
			isSnap: !1,
			index: -1
		},
		vertical: {
			isSnap: !1,
			index: -1
		}
	} : checkMoveableSnapPoses(e, n.vertical, n.horizontal, void 0, void 0, void 0, void 0), c = s.horizontal, l = s.vertical, u = getSnapBound(a[0], c), d = getSnapBound(o[0], l), f = abs(u), p = abs(d);
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
function checkSnapBounds(e, t, n, r, i, a, o) {
	o === void 0 && (o = [1, 1]);
	var s = checkBoundPoses(t, n, r), c = s.horizontal, l = s.vertical, u = checkSnapPoses(e, n, r, [], [], i, a, o), d = u.horizontal, f = u.vertical, p = getSnapBound(c[0], d), m = getSnapBound(l[0], f), h = abs(p), g = abs(m);
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
function checkSnapRightLine(e, t, n, r) {
	var i = getRad$1(e, t) / Math.PI * 180, a = n.vertical, o = a.isBound, s = a.isSnap, c = a.dist, l = n.horizontal, u = l.isBound, d = l.isSnap, f = l.dist, p = i % 180, m = p < 3 || p > 177, h = p > 87 && p < 93;
	return f < c && (o || s && !h && (!r || !m)) ? "vertical" : u || d && !m && (!r || !h) ? "horizontal" : "";
}
function getSnapBoundInfo(e, t, n, r, i, a) {
	return n.map(function(n) {
		var o = __read(n, 2), s = o[0], c = o[1], l = getPosByDirection(t, s), u = getPosByDirection(t, c), d = r ? checkSnapBoundsKeepRatio(e, l, u, i) : checkMoveableSnapBounds(e, i, {
			vertical: [u[0]],
			horizontal: [u[1]]
		}), f = d.horizontal, p = f.offset, m = f.isBound, h = f.isSnap, g = d.vertical, _ = g.offset, v = g.isBound, y = g.isSnap, b = minus(c, s);
		if (!_ && !p) return {
			isBound: v || m,
			isSnap: y || h,
			sign: b,
			offset: [0, 0]
		};
		var x = checkSnapRightLine(l, u, d, r);
		if (!x) return {
			sign: b,
			isBound: !1,
			isSnap: !1,
			offset: [0, 0]
		};
		var S = x === "vertical", C = [0, 0];
		return C = !r && abs(c[0]) === 1 && abs(c[1]) === 1 && s[0] !== c[0] && s[1] !== c[1] ? getDragDist({
			datas: a,
			distX: -_,
			distY: -p
		}) : solveNextOffset(l, u, -(S ? _ : p), S, a).offset, C = C.map(function(e, t) {
			return e * (b[t] ? 2 / b[t] : 0);
		}), {
			sign: b,
			isBound: S ? v : m,
			isSnap: S ? y : h,
			offset: C
		};
	});
}
function getSnapBoundOffset(e, t) {
	return e.isBound ? e.offset : t.isSnap ? t.offset : 0;
}
function checkSnapBoundsKeepRatio(e, t, n, r) {
	var i = checkBoundKeepRatio(e, t, n), a = i.horizontal, o = i.vertical, s = r ? {
		horizontal: { isSnap: !1 },
		vertical: { isSnap: !1 }
	} : checkSnapKeepRatio(e, t, n), c = s.horizontal, l = s.vertical, u = getSnapBoundOffset(a, c), d = getSnapBoundOffset(o, l), f = abs(u), p = abs(d);
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
function checkMaxBounds(e, t, n, r, i) {
	var a = [-n[0], -n[1]], o = e.state, s = o.width, c = o.height, l = e.props.bounds, u = Infinity, d = Infinity;
	if (l) {
		var f = [[n[0], -n[1]], [-n[0], n[1]]], p = l.left, m = p === void 0 ? -Infinity : p, h = l.top, g = h === void 0 ? -Infinity : h, _ = l.right, v = _ === void 0 ? Infinity : _, y = l.bottom, b = y === void 0 ? Infinity : y;
		f.forEach(function(e) {
			var n = e[0] !== a[0], o = e[1] !== a[1], l = getPosByDirection(t, e), f = getRad$1(r, l) * 360 / Math.PI;
			if (o) {
				var p = l.slice();
				(abs(f - 360) < 2 || abs(f - 180) < 2) && (p[1] = r[1]);
				var h = solveNextOffset(r, p, (r[1] < l[1] ? b : g) - l[1], !1, i), _ = __read(h.offset, 2)[1], y = h.isOutside;
				isNaN(_) || (d = c + (y ? 1 : -1) * abs(_));
			}
			if (n) {
				var p = l.slice();
				(abs(f - 90) < 2 || abs(f - 270) < 2) && (p[0] = r[0]);
				var x = solveNextOffset(r, p, (r[0] < l[0] ? v : m) - l[0], !0, i), S = __read(x.offset, 1)[0], C = x.isOutside;
				isNaN(S) || (u = s + (C ? 1 : -1) * abs(S));
			}
		});
	}
	return {
		maxWidth: u,
		maxHeight: d
	};
}
var Draggable = {
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
		var u = getDistSize(l), d = getRad$1(l, [0, 0]);
		return [t.createElement("div", {
			className: prefix("line", "horizontal", "dragline", "dashed"),
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
		o.draggable = i || e.targetGesto, n.datas = {}, n.left = parseFloat(s.left || "") || 0, n.top = parseFloat(s.top || "") || 0, n.bottom = parseFloat(s.bottom || "") || 0, n.right = parseFloat(s.right || "") || 0, n.startValue = [0, 0], setDragStart(e, t), setDefaultTransformIndex(e, t, "translate"), startCheckSnapDrag(e, n), n.prevDist = [0, 0], n.prevBeforeDist = [0, 0], n.isDrag = !1, n.deltaOffset = [0, 0];
		var c = fillParams(e, t, __assign({ set: function(e) {
			n.startValue = e;
		} }, fillTransformStartEvent(e, t)));
		return (r || triggerEvent(e, "onDragStart", c)) === !1 ? (o.draggable = null, n.isPinch = !1) : (n.isDrag = !0, e.state.dragInfo = {
			startRect: e.getRect(),
			dist: [0, 0]
		}), n.isDrag ? c : !1;
	},
	drag: function(e, t) {
		if (t) {
			resolveTransformEvent(e, t, "translate");
			var n = t.datas, r = t.parentEvent, i = t.parentFlag, a = t.isPinch, o = t.deltaOffset, s = t.useSnap, c = t.isRequest, l = t.isGroup, u = t.parentThrottleDrag, d = t.distX, f = t.distY, p = n.isDrag, m = n.prevDist, h = n.prevBeforeDist, g = n.startValue;
			if (p) {
				o && (d += o[0], f += o[1]);
				var _ = e.props, v = _.parentMoveable, y = l ? 0 : _.throttleDrag || u || 0, b = r ? 0 : _.throttleDragRotate || 0, x = 0, S = !1, C = !1, w = !1, T = !1;
				if (!r && b > 0 && (d || f)) {
					var E = _.startDragRotate || 0, D = throttle(E + getRad$1([0, 0], [d, f]) * 180 / Math.PI, b) - E, O = f * Math.abs(Math.cos((D - 90) / 180 * Math.PI)), k = getDistSize([d * Math.abs(Math.cos(D / 180 * Math.PI)), O]);
					x = D * Math.PI / 180, d = k * Math.cos(x), f = k * Math.sin(x);
				}
				if (!a && !r && !i) {
					var A = __read(checkSnapBoundsDrag(e, d, f, b, !s && c || o, n), 2), j = A[0], M = A[1];
					S = j.isSnap, C = j.isBound, w = M.isSnap, T = M.isBound;
					var N = j.offset, P = M.offset;
					d += N, f += P;
				}
				var F = plus(getBeforeDragDist({
					datas: n,
					distX: d,
					distY: f
				}), g), I = plus(getTransformDist({
					datas: n,
					distX: d,
					distY: f
				}), g);
				throttleArray(I, TINY_NUM), throttleArray(F, TINY_NUM), b || (!S && !C && (I[0] = throttle(I[0], y), F[0] = throttle(F[0], y)), !w && !T && (I[1] = throttle(I[1], y), F[1] = throttle(F[1], y)));
				var L = minus(F, g), R = minus(I, g), z = minus(R, m), B = minus(L, h);
				n.prevDist = R, n.prevBeforeDist = L, n.passDelta = z, n.passDist = R;
				var V = n.left + L[0], H = n.top + L[1], U = n.right - L[0], W = n.bottom - L[1], G = convertTransformFormat(n, `translate(${I[0]}px, ${I[1]}px)`, `translate(${R[0]}px, ${R[1]}px)`);
				if (fillOriginalTransform(t, G), e.state.dragInfo.dist = r ? [0, 0] : R, !(!r && !v && z.every(function(e) {
					return !e;
				}) && B.some(function(e) {
					return !e;
				}))) {
					var K = e.state, q = K.width, J = K.height, Y = fillParams(e, t, __assign({
						transform: G,
						dist: R,
						delta: z,
						translate: I,
						beforeDist: L,
						beforeDelta: B,
						beforeTranslate: F,
						left: V,
						top: H,
						right: U,
						bottom: W,
						width: q,
						height: J,
						isPinch: a
					}, fillCSSObject({ transform: G }, t)));
					return !r && triggerEvent(e, "onDrag", Y), Y;
				}
			}
		}
	},
	dragAfter: function(e, t) {
		var n = t.datas, r = n.deltaOffset;
		return r[0] || r[1] ? (n.deltaOffset = [0, 0], this.drag(e, __assign(__assign({}, t), { deltaOffset: r }))) : !1;
	},
	dragEnd: function(e, t) {
		var n = t.parentEvent, r = t.datas;
		if (e.state.dragInfo = null, r.isDrag) {
			r.isDrag = !1;
			var i = fillEndParams(e, t, {});
			return !n && triggerEvent(e, "onDragEnd", i), i;
		}
	},
	dragGroupStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY, a = this.dragStart(e, t);
		if (!a) return !1;
		var o = triggerChildGesto(e, this, "dragStart", [r || 0, i || 0], t, !1, "draggable"), s = o.childEvents, c = o.eventParams;
		n.isDrag = triggerEvent(e, "onDragGroupStart", __assign(__assign({}, a), {
			targets: e.props.targets,
			events: c
		})) !== !1;
		var l = s[0]?.datas.startValue ?? [0, 0];
		return n.throttleOffset = [l[0] % 1, l[1] % 1], n.isDrag ? a : !1;
	},
	dragGroup: function(e, t) {
		if (t.datas.isDrag) {
			var n = this.drag(e, __assign(__assign({}, t), { parentThrottleDrag: e.props.throttleDrag })), r = t.datas.passDelta, i = triggerChildGesto(e, this, "drag", r, t, !1, "draggable").eventParams;
			if (n) {
				var a = __assign({
					targets: e.props.targets,
					events: i
				}, n);
				return triggerEvent(e, "onDragGroup", a), a;
			}
		}
	},
	dragGroupEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isDrag) {
			this.dragEnd(e, t);
			var r = triggerChildGesto(e, this, "dragEnd", [0, 0], t, !1, "draggable").eventParams;
			return triggerEvent(e, "onDragGroupEnd", fillEndParams(e, t, {
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
function getFixedDirectionInfo(e, t) {
	return {
		fixedPosition: getPosByDirection(e, t),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function getOffsetFixedDirectionInfo(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3;
	return {
		fixedPosition: calculatePosition(n, [i / 2 * (1 + t[0]), a / 2 * (1 + t[1])], o),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function getOffsetFixedPositionInfo(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3, s = getDirectionByPos(t, i, a);
	return {
		fixedPosition: calculatePosition(n, t, o),
		fixedDirection: s,
		fixedOffset: [i ? 0 : t[0], a ? 0 : t[1]]
	};
}
var directionCondition$2 = getDirectionCondition("resizable"), Resizable = {
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
	render: getRenderDirections("resizable"),
	dragControlCondition: directionCondition$2,
	viewClassName: getDirectionViewClassName("resizable"),
	dragControlStart: function(e, t) {
		var n = t.inputEvent, r = t.isPinch, i = t.isGroup, a = t.parentDirection, o = t.parentGesto, s = t.datas, c = t.parentFixedDirection, l = t.parentEvent, u = getTotalDirection(a, r, n, s), d = e.state, f = d.target, p = d.width, m = d.height, h = d.gestos;
		if (!u || !f || h.resizable) return !1;
		h.resizable = o || e.controlGesto, !r && setDragStart(e, t), s.datas = {}, s.direction = u, s.startOffsetWidth = p, s.startOffsetHeight = m, s.prevWidth = 0, s.prevHeight = 0, s.minSize = [0, 0], s.startWidth = d.inlineCSSWidth || d.cssWidth, s.startHeight = d.inlineCSSHeight || d.cssHeight, s.maxSize = [Infinity, Infinity], i || (s.minSize = [d.minOffsetWidth, d.minOffsetHeight], s.maxSize = [d.maxOffsetWidth, d.maxOffsetHeight]);
		var g = e.props.transformOrigin || "% %";
		s.transformOrigin = g && isString(g) ? g.split(" ") : g, s.startOffsetMatrix = d.offsetMatrix, s.startTransformOrigin = d.transformOrigin, s.isWidth = t?.parentIsWidth ?? (!u[0] && !u[1] || u[0] || !u[1]);
		function _(e) {
			s.ratio = e && isFinite(e) ? e : 0;
		}
		s.startPositions = getAbsolutePosesByState(e.state);
		function v(e) {
			var t = getFixedDirectionInfo(s.startPositions, e);
			s.fixedDirection = t.fixedDirection, s.fixedPosition = t.fixedPosition, s.fixedOffset = t.fixedOffset;
		}
		function y(t) {
			var n = getOffsetFixedPositionInfo(e.state, t);
			s.fixedDirection = n.fixedDirection, s.fixedPosition = n.fixedPosition, s.fixedOffset = n.fixedOffset;
		}
		function b(e) {
			s.minSize = [convertUnitSize(`${e[0]}`, 0) || 0, convertUnitSize(`${e[1]}`, 0) || 0];
		}
		function x(e) {
			var t = [e[0] || Infinity, e[1] || Infinity];
			(!isNumber(t[0]) || isFinite(t[0])) && (t[0] = convertUnitSize(`${t[0]}`, 0) || Infinity), (!isNumber(t[1]) || isFinite(t[1])) && (t[1] = convertUnitSize(`${t[1]}`, 0) || Infinity), s.maxSize = t;
		}
		_(p / m), v(c || [-u[0], -u[1]]), s.setFixedDirection = v, s.setFixedPosition = y, s.setMin = b, s.setMax = x;
		var S = fillParams(e, t, {
			direction: u,
			startRatio: s.ratio,
			set: function(e) {
				var t = __read(e, 2), n = t[0], r = t[1];
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
			dragStart: Draggable.dragStart(e, new CustomGesto().dragStart([0, 0], t))
		}), C = l || triggerEvent(e, "onResizeStart", S);
		return s.startFixedDirection = s.fixedDirection, s.startFixedPosition = s.fixedPosition, C !== !1 && (s.isResize = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: u
		}), s.isResize ? S : !1;
	},
	dragControl: function(e, t) {
		var n, r = t.datas, i = t.parentFlag, a = t.isPinch, o = t.parentKeepRatio, s = t.dragClient, c = t.parentDist, l = t.useSnap, u = t.isRequest, d = t.isGroup, f = t.parentEvent, p = t.resolveMatrix, m = r.isResize, h = r.transformOrigin, g = r.startWidth, _ = r.startHeight, v = r.prevWidth, y = r.prevHeight, b = r.minSize, x = r.maxSize, S = r.ratio, C = r.startOffsetWidth, w = r.startOffsetHeight, T = r.isWidth;
		if (!m) return;
		if (p) {
			var E = e.state.is3d, D = r.startOffsetMatrix, O = r.startTransformOrigin, k = E ? 4 : 3, A = parseMat(getNextTransforms(t)), j = Math.sqrt(A.length);
			k !== j && (A = convertDimension(A, j, k));
			var M = getNextMatrix(D, A, O, k);
			r.startPositions = calculatePoses(M, C, w, k), r.nextTargetMatrix = A, r.nextAllMatrix = M;
		}
		var N = getProps(e.props, "resizable"), P = N.resizeFormat, F = N.throttleResize, I = F === void 0 ? i ? 0 : 1 : F, L = N.parentMoveable, R = N.keepRatioFinally, z = r.direction, B = z, V = 0, H = 0;
		!z[0] && !z[1] && (B = [1, 1]);
		var U = S && (o ?? N.keepRatio) || !1;
		function W() {
			var e = r.fixedDirection, n = getOffsetSizeDist(B, U, r, t);
			V = n.distWidth, H = n.distHeight;
			var i = B[0] - e[0] || U ? Math.max(C + V, TINY_NUM) : C, a = B[1] - e[1] || U ? Math.max(w + H, TINY_NUM) : w;
			return U && C && w && (T ? a = i / S : i = a * S), [i, a];
		}
		var G = __read(W(), 2), K = G[0], q = G[1];
		f || (r.setFixedDirection(r.fixedDirection), triggerEvent(e, "onBeforeResize", fillParams(e, t, {
			startFixedDirection: r.startFixedDirection,
			startFixedPosition: r.startFixedPosition,
			setFixedDirection: function(e) {
				var t;
				return r.setFixedDirection(e), t = __read(W(), 2), K = t[0], q = t[1], [K, q];
			},
			setFixedPosition: function(e) {
				var t;
				return r.setFixedPosition(e), t = __read(W(), 2), K = t[0], q = t[1], [K, q];
			},
			boundingWidth: K,
			boundingHeight: q,
			setSize: function(e) {
				var t = __read(e, 2);
				K = t[0], q = t[1];
			}
		}, !0)));
		var J = s;
		s || (J = !i && a ? getAbsolutePosition(e, [0, 0]) : r.fixedPosition);
		var Y = [0, 0];
		a || (Y = checkSnapResize(e, K, q, z, J, !l && u, r)), c && (!c[0] && (Y[0] = 0), !c[1] && (Y[1] = 0));
		function X() {
			var e;
			P && (e = __read(P([K, q]), 2), K = e[0], q = e[1]), K = throttle(K, I), q = throttle(q, I);
		}
		if (U) {
			B[0] && B[1] && Y[0] && Y[1] && (abs(Y[0]) > abs(Y[1]) ? Y[1] = 0 : Y[0] = 0);
			var Ll = !Y[0] && !Y[1];
			Ll && X(), B[0] && !B[1] || Y[0] && !Y[1] || Ll && T ? (K += Y[0], q = K / S) : (!B[0] && B[1] || !Y[0] && Y[1] || Ll && !T) && (q += Y[1], K = q * S);
		} else K += Y[0], q += Y[1], K = Math.max(0, K), q = Math.max(0, q);
		n = __read(calculateBoundSize([K, q], b, x, U ? S : !1), 2), K = n[0], q = n[1], X(), U && (d || R) && (T ? q = K / S : K = q * S), V = K - C, H = q - w;
		var Rl = [V - v, H - y];
		r.prevWidth = V, r.prevHeight = H;
		var zl = getResizeDist(e, K, q, J, h, r);
		if (!(!L && Rl.every(function(e) {
			return !e;
		}) && zl.every(function(e) {
			return !e;
		}))) {
			var Z = Draggable.drag(e, setCustomDrag(t, e.state, zl, !!a, !1, "draggable")), Q = Z.transform, $ = g + V, Bl = _ + H, Vl = fillParams(e, t, __assign({
				width: $,
				height: Bl,
				offsetWidth: Math.round(K),
				offsetHeight: Math.round(q),
				startRatio: S,
				boundingWidth: K,
				boundingHeight: q,
				direction: z,
				dist: [V, H],
				delta: Rl,
				isPinch: !!a,
				drag: Z
			}, fillAfterTransform({
				style: {
					width: `${$}px`,
					height: `${Bl}px`
				},
				transform: Q
			}, Z, t)));
			return !f && triggerEvent(e, "onResize", Vl), Vl;
		}
	},
	dragControlAfter: function(e, t) {
		var n = t.datas, r = n.isResize, i = n.startOffsetWidth, a = n.startOffsetHeight, o = n.prevWidth, s = n.prevHeight;
		if (!(!r || e.props.checkResizableError === !1)) {
			var c = e.state, l = c.width, u = c.height, d = l - (i + o), f = u - (a + s), p = abs(d) > 3, m = abs(f) > 3;
			if (p && (n.startWidth += d, n.startOffsetWidth += d, n.prevWidth += d), m && (n.startHeight += f, n.startOffsetHeight += f, n.prevHeight += f), p || m) return this.dragControl(e, t);
		}
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.parentEvent;
		if (n.isResize) {
			n.isResize = !1;
			var i = fillEndParams(e, t, {});
			return !r && triggerEvent(e, "onResizeEnd", i), i;
		}
	},
	dragGroupControlCondition: directionCondition$2,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, __assign(__assign({}, t), { isGroup: !0 }));
		if (!r) return !1;
		var i = fillChildEvents(e, "resizable", t), a = n.startOffsetWidth, o = n.startOffsetHeight;
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
		var l = triggerChildAbles(e, this, "dragControlStart", t, function(t, r) {
			return startChildDist(e, t, n, r);
		});
		s(), c();
		var u = function(t) {
			r.setFixedDirection(t), l.forEach(function(r, a) {
				r.setFixedDirection(t), startChildDist(e, r.moveable, n, i[a]);
			});
		};
		return n.setFixedDirection = u, n.isResize = triggerEvent(e, "onResizeGroupStart", __assign(__assign({}, r), {
			targets: e.props.targets,
			events: l.map(function(e) {
				return __assign(__assign({}, e), {
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
			var r = getProps(e.props, "resizable");
			catchEvent(e, "onBeforeResize", function(n) {
				triggerEvent(e, "onBeforeResizeGroup", fillParams(e, t, __assign(__assign({}, n), { targets: r.targets }), !0));
			});
			var i = this.dragControl(e, __assign(__assign({}, t), { isGroup: !0 }));
			if (i) {
				var a = i.boundingWidth, o = i.boundingHeight, s = i.dist, c = r.keepRatio, l = [a / (a - s[0]), o / (o - s[1])], u = n.fixedPosition, d = triggerChildAbles(e, this, "dragControl", t, function(t, n) {
					var r = __read(calculate(createRotateMatrix(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * l[0],
						n.datas.originalY * l[1],
						1
					], 3), 2), i = r[0], a = r[1];
					return __assign(__assign({}, n), {
						parentDist: null,
						parentScale: l,
						dragClient: plus(u, [i, a]),
						parentKeepRatio: c
					});
				}), f = __assign({
					targets: r.targets,
					events: d
				}, i);
				return triggerEvent(e, "onResizeGroup", f), f;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isResize) {
			this.dragControlEnd(e, t);
			var r = triggerChildAbles(e, this, "dragControlEnd", t);
			return triggerEvent(e, "onResizeGroupEnd", fillEndParams(e, t, {
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
function setRotateStartInfo(e, t, n, r, i) {
	var a = e.props.groupable, o = e.state, s = o.is3d ? 4 : 3, c = t.origin, l = calculatePosition(e.state.rootMatrix, minus([c[0], c[1]], a ? [0, 0] : [o.left, o.top]), s), u = plus([i.left, i.top], l);
	t.startAbsoluteOrigin = u, t.prevDeg = getRad$1(u, [n, r]) / Math.PI * 180, t.defaultDeg = t.prevDeg, t.prevSnapDeg = 0, t.loop = 0, t.startDist = getDist$2(u, [n, r]);
}
function getAbsoluteDist(e, t, n) {
	var r = n.defaultDeg, i = n.prevDeg, a = i % 360, o = Math.floor(i / 360);
	a < 0 && (a += 360), a > e && a > 270 && e < 90 ? ++o : a < e && a < 90 && e > 270 && --o;
	var s = t * (o * 360 + e - r);
	return n.prevDeg = r + s, s;
}
function getAbsoluteDistByClient(e, t, n, r) {
	return getAbsoluteDist(getRad$1(r.startAbsoluteOrigin, [e, t]) / Math.PI * 180, n, r);
}
function getRotateInfo(e, t, n, r, i, a) {
	var o = e.props.throttleRotate, s = o === void 0 ? 0 : o, c = n.prevSnapDeg, l = 0, u = !1;
	if (a) {
		var d = checkSnapRotate(e, t, r, i + r);
		u = d.isSnap, l = i + d.dist;
	}
	u || (l = throttle(i + r, s));
	var f = l - i;
	return n.prevSnapDeg = f, [
		f - c,
		f,
		l
	];
}
function getRotationPositions(e, t, n) {
	var r = __read(t, 4), i = r[0], a = r[1], o = r[2], s = r[3];
	if (e === "none") return [];
	if (isArray(e)) return e.map(function(e) {
		return getRotationPositions(e, [
			i,
			a,
			o,
			s
		], n)[0];
	});
	var c = __read((e || "top").split("-"), 2), l = c[0], u = c[1], d = [i, a];
	l === "left" ? d = [o, i] : l === "right" ? d = [a, s] : l === "bottom" && (d = [s, o]);
	var f = [(d[0][0] + d[1][0]) / 2, (d[0][1] + d[1][1]) / 2], p = getRotationRad(d, n);
	if (u) {
		var m = u === "top" || u === "left", h = l === "bottom" || l === "left";
		f = d[m && !h || !m && h ? 0 : 1];
	}
	return [[f, p]];
}
function dragControlCondition(e, t) {
	if (t.isRequest) return t.requestAble === "rotatable";
	var n = t.inputEvent.target;
	if (hasClass(n, prefix("rotation-control")) || e.props.rotateAroundControls && hasClass(n, prefix("around-control")) || hasClass(n, prefix("control")) && hasClass(n, prefix("rotatable"))) return !0;
	var r = e.props.rotationTarget;
	return r ? getRefTargets(r, !0).some(function(e) {
		return e ? n === e || n.contains(e) : !1;
	}) : !1;
}
var Rotatable = {
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
		return e.isDragging("rotatable") ? prefix("view-rotation-dragging") : "";
	},
	render: function(e, t) {
		var n = getProps(e.props, "rotatable"), r = n.rotatable, i = n.rotationPosition, a = n.zoom, o = n.renderDirections, s = n.rotateAroundControls, c = n.resolveAblesWithRotatable, l = e.getState(), u = l.renderPoses, d = l.direction;
		if (!r) return null;
		var f = getRotationPositions(i, u, d), p = [];
		if (f.forEach(function(e, n) {
			var r = __read(e, 2), i = r[0], o = r[1];
			p.push(t.createElement("div", {
				key: `rotation${n}`,
				className: prefix("rotation"),
				style: { transform: `translate(-50%) translate(${i[0]}px, ${i[1]}px) rotate(${o}rad)` }
			}, t.createElement("div", {
				className: prefix("line rotation-line"),
				style: { transform: `scaleX(${a})` }
			}), t.createElement("div", {
				className: prefix("control rotation-control"),
				style: { transform: `translate(0.5px) scale(${a})` }
			})));
		}), o) {
			var m = getKeys(c || {}), h = {};
			m.forEach(function(e) {
				c[e].forEach(function(t) {
					h[t] = e;
				});
			});
			var g = [];
			isArray(o) && (g = o.map(function(e) {
				var t = h[e];
				return {
					data: t ? { resolve: t } : {},
					classNames: t ? ["move"] : [],
					dir: e
				};
			})), p.push.apply(p, __spreadArray([], __read(renderDirectionControlsByInfos(e, "rotatable", g, t)), !1));
		}
		return s && p.push.apply(p, __spreadArray([], __read(renderAroundControls(e, t)), !1)), p;
	},
	dragControlCondition,
	dragControlStart: function(e, t) {
		var n, r = t.datas, i = t.clientX, a = t.clientY, o = t.parentRotate, s = t.parentFlag, c = t.isPinch, l = t.isRequest, u = e.state, d = u.target, f = u.left, p = u.top, m = u.direction, h = u.beforeDirection, g = u.targetTransform, _ = u.moveableClientRect, v = u.offsetMatrix, y = u.targetMatrix, b = u.allMatrix, x = u.width, S = u.height;
		if (!l && !d) return !1;
		var C = e.getRect();
		r.rect = C, r.transform = g, r.left = f, r.top = p;
		var w = function(t) {
			var n = getOffsetFixedPositionInfo(e.state, t);
			r.fixedDirection = n.fixedDirection, r.fixedOffset = n.fixedOffset, r.fixedPosition = n.fixedPosition, P && P.setFixedPosition(t);
		}, T = function(t) {
			var n = getOffsetFixedDirectionInfo(e.state, t);
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
			}, r.afterInfo = __assign(__assign({}, r.beforeInfo), { origin: C.origin }), r.absoluteInfo = __assign(__assign({}, r.beforeInfo), {
				origin: C.origin,
				startValue: O
			});
		} else {
			var k = t.inputEvent?.target;
			if (k) {
				var A = DIRECTION_REGION_TO_DIRECTION[k.getAttribute("data-direction") || ""];
				if (A) {
					r.isControl = !0, r.isAroundControl = hasClass(k, prefix("around-control")), r.controlDirection = A;
					var j = k.getAttribute("data-resolve");
					j && (r.resolveAble = j), n = __read(getPosByDirection(calculateMoveableClientPositions(u.rootMatrix, u.renderPoses, _), A), 2), E = n[0], D = n[1];
				}
			}
			r.beforeInfo = { origin: C.beforeOrigin }, r.afterInfo = { origin: C.origin }, r.absoluteInfo = {
				origin: C.origin,
				startValue: C.rotation
			};
			var M = w;
			w = function(t) {
				var n = u.is3d ? 4 : 3, i = __read(plus(getOrigin(y, n), t), 2), a = i[0], o = i[1], s = calculate(v, convertPositionMatrix([a, o], n)), c = calculate(b, convertPositionMatrix([t[0], t[1]], n));
				M(t);
				var l = u.posDelta;
				r.beforeInfo.origin = minus(s, l), r.afterInfo.origin = minus(c, l), r.absoluteInfo.origin = minus(c, l), setRotateStartInfo(e, r.beforeInfo, E, D, _), setRotateStartInfo(e, r.afterInfo, E, D, _), setRotateStartInfo(e, r.absoluteInfo, E, D, _);
			}, T = function(e) {
				var t = getPosByDirection([
					[0, 0],
					[x, 0],
					[0, S],
					[x, S]
				], e);
				w(t);
			};
		}
		r.startClientX = E, r.startClientY = D, r.direction = m, r.beforeDirection = h, r.startValue = 0, r.datas = {}, setDefaultTransformIndex(e, t, "rotate");
		var N = !1, P = !1;
		r.isControl && r.resolveAble && r.resolveAble === "resizable" && (P = Resizable.dragControlStart(e, __assign(__assign({}, new CustomGesto("resizable").dragStart([0, 0], t)), {
			parentPosition: r.controlPosition,
			parentFixedPosition: r.fixedPosition
		}))), P || (N = Draggable.dragStart(e, new CustomGesto().dragStart([0, 0], t))), w(getTotalOrigin(e));
		var F = fillParams(e, t, __assign(__assign({
			set: function(e) {
				r.startValue = e * Math.PI / 180;
			},
			setFixedDirection: T,
			setFixedPosition: w
		}, fillTransformStartEvent(e, t)), {
			dragStart: N,
			resizeStart: P
		}));
		return r.isRotate = triggerEvent(e, "onRotateStart", F) !== !1, u.snapRenderInfo = { request: t.isRequest }, r.isRotate ? F : !1;
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.clientDistX, s = t.clientDistY, c = t.parentRotate, l = t.parentFlag, u = t.isPinch, d = t.groupDelta, f = t.resolveMatrix, p = a.beforeDirection, m = a.beforeInfo, h = a.afterInfo, g = a.absoluteInfo, _ = a.isRotate, v = a.startValue, y = a.rect, b = a.startClientX, x = a.startClientY;
		if (_) {
			resolveTransformEvent(e, t, "rotate");
			var S = p * getTransformDirection(t), C = e.props.parentMoveable, w = 0, T, E, D = 0, O, k, A = 0, j, M, N = 180 / Math.PI * v, P = g.startValue, F = !1, I = b + o, L = x + s;
			if (!l && "parentDist" in t) {
				var R = t.parentDist;
				T = R, O = R, j = R;
			} else u || l ? (T = getAbsoluteDist(c, p, m), O = getAbsoluteDist(c, S, h), j = getAbsoluteDist(c, S, g)) : (T = getAbsoluteDistByClient(I, L, p, m), O = getAbsoluteDistByClient(I, L, S, h), j = getAbsoluteDistByClient(I, L, S, g), F = !0);
			if (E = N + T, k = N + O, M = P + j, triggerEvent(e, "onBeforeRotate", fillParams(e, t, {
				beforeRotation: E,
				rotation: k,
				absoluteRotation: M,
				setRotation: function(e) {
					O = e - N, T = O, j = O;
				}
			}, !0)), n = __read(getRotateInfo(e, y, m, T, N, F), 3), w = n[0], T = n[1], E = n[2], r = __read(getRotateInfo(e, y, h, O, N, F), 3), D = r[0], O = r[1], k = r[2], i = __read(getRotateInfo(e, y, g, j, P, F), 3), A = i[0], j = i[1], M = i[2], !(!A && !D && !w && !C && !f)) {
				var z = convertTransformFormat(a, `rotate(${k}deg)`, `rotate(${O}deg)`);
				f && (a.fixedPosition = getTranslateFixedPosition(e, a.targetAllTransform, a.fixedDirection, a.fixedOffset, a));
				var B = getRotateDist(e, O, a), V = minus(plus(d || [0, 0], B), a.prevInverseDist || [0, 0]);
				a.prevInverseDist = B, a.requestValue = null;
				var H = fillTransformEvent(e, z, V, u, t), U = H, W = getDist$2([I, L], g.startAbsoluteOrigin) - g.startDist, G = void 0;
				if (a.resolveAble === "resizable") {
					var K = Resizable.dragControl(e, __assign(__assign({}, setCustomDrag(t, e.state, [t.deltaX, t.deltaY], !!u, !1, "resizable")), {
						resolveMatrix: !0,
						parentDistance: W
					}));
					K && (G = K, U = fillAfterTransform(U, K, t));
				}
				var q = fillParams(e, t, __assign(__assign({
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
					resize: G
				}, H), U));
				return triggerEvent(e, "onRotate", q), q;
			}
		}
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (n.isRotate) {
			n.isRotate = !1;
			var r = fillEndParams(e, t, {});
			return triggerEvent(e, "onRotateEnd", r), r;
		}
	},
	dragGroupControlCondition: dragControlCondition,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = e.state, i = r.left, a = r.top, o = r.beforeOrigin, s = this.dragControlStart(e, t);
		if (!s) return !1;
		s.set(n.beforeDirection * e.rotation);
		var c = triggerChildAbles(e, this, "dragControlStart", t, function(e, t) {
			var n = e.state, r = n.left, s = n.top, c = n.beforeOrigin, l = plus(minus([r, s], [i, a]), minus(c, o));
			return t.datas.startGroupClient = l, t.datas.groupClient = l, __assign(__assign({}, t), { parentRotate: 0 });
		});
		return n.isRotate = triggerEvent(e, "onRotateGroupStart", __assign(__assign({}, s), {
			targets: e.props.targets,
			events: c
		})) !== !1, n.isRotate ? s : !1;
	},
	dragGroupControl: function(e, t) {
		var n = t.datas;
		if (n.isRotate) {
			catchEvent(e, "onBeforeRotate", function(n) {
				triggerEvent(e, "onBeforeRotateGroup", fillParams(e, t, __assign(__assign({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = n.beforeDirection, a = r.beforeDist, o = a / 180 * Math.PI, s = triggerChildAbles(e, this, "dragControl", t, function(e, t) {
					var n = t.datas.startGroupClient, r = __read(t.datas.groupClient, 2), s = r[0], c = r[1], l = __read(rotate(n, o * i), 2), u = l[0], d = l[1], f = [u - s, d - c];
					return t.datas.groupClient = [u, d], __assign(__assign({}, t), {
						parentRotate: a,
						groupDelta: f
					});
				});
				e.rotation = i * r.beforeRotation;
				var c = __assign({
					targets: e.props.targets,
					events: s,
					set: function(t) {
						e.rotation = t;
					},
					setGroupRotation: function(t) {
						e.rotation = t;
					}
				}, r);
				return triggerEvent(e, "onRotateGroup", c), c;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isRotate) {
			this.dragControlEnd(e, t);
			var r = triggerChildAbles(e, this, "dragControlEnd", t);
			return triggerEvent(e, "onRotateGroupEnd", fillEndParams(e, t, {
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
function renderGuideline(e, t) {
	var n, r = e.direction, i = e.classNames, a = e.size, o = e.pos, s = e.zoom, c = e.key, l = r === "horizontal", u = l ? "Y" : "X";
	return t.createElement("div", {
		key: c,
		className: i.join(" "),
		style: (n = {}, n[l ? "width" : "height"] = `${a}`, n.transform = `translate(${o[0]}, ${o[1]}) translate${u}(-50%) scale${u}(${s})`, n)
	});
}
function renderInnerGuideline(e, t) {
	return renderGuideline(__assign(__assign({}, e), {
		classNames: __spreadArray([prefix("line", "guideline", e.direction)], __read(e.classNames), !1).filter(function(e) {
			return e;
		}),
		size: e.size || `${e.sizeValue}px`,
		pos: e.pos || e.posValue.map(function(e) {
			return `${throttle(e, .1)}px`;
		})
	}), t);
}
function renderSnapPoses(e, t, n, r, i, a, o, s) {
	var c = e.props.zoom;
	return n.map(function(e, n) {
		var l = e.type, u = e.pos, d = [0, 0];
		return d[o] = r, d[o ? 0 : 1] = -i + u, renderInnerGuideline({
			key: `${t}TargetGuideline${n}`,
			classNames: [prefix("target", "bold", l)],
			posValue: d,
			sizeValue: a,
			zoom: c,
			direction: t
		}, s);
	});
}
function renderGuidelines(e, t, n, r, i, a) {
	var o = e.props, s = o.zoom, c = o.isDisplayInnerSnapDigit, l = t === "horizontal" ? VERTICAL_NAMES_MAP : HORIZONTAL_NAMES_MAP, u = i[l.start], d = i[l.end];
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
		return renderInnerGuideline({
			key: `${t}-default-guideline-${n}`,
			classNames: c ? [prefix("bold"), l] : [prefix("normal"), l],
			direction: t,
			posValue: u,
			sizeValue: o,
			zoom: s
		}, a);
	});
}
function renderDigitLine(e, t, n, r, i, a, o, s) {
	var c, l = e.props, u = l.snapDigit, d = u === void 0 ? 0 : u, f = l.isDisplaySnapDigit, p = f === void 0 ? !0 : f, m = l.snapDistFormat, h = m === void 0 ? function(e, t) {
		return e;
	} : m, g = l.zoom, _ = t === "horizontal" ? "X" : "Y", v = t === "vertical" ? "height" : "width", y = Math.abs(i), b = p ? parseFloat(y.toFixed(d)) : 0;
	return s.createElement("div", {
		key: `${t}-${n}-guideline-${r}`,
		className: prefix("guideline-group", t),
		style: (c = {
			left: `${a[0]}px`,
			top: `${a[1]}px`
		}, c[v] = `${y}px`, c)
	}, renderInnerGuideline({
		direction: t,
		classNames: [prefix(n), o],
		size: "100%",
		posValue: [0, 0],
		sizeValue: y,
		zoom: g
	}, s), s.createElement("div", {
		className: prefix("size-value", "gap"),
		style: { transform: `translate${_}(-50%) scale(${g})` }
	}, b > 0 ? h(b, t) : ""));
}
function groupByElementGuidelines(e, t, n, r) {
	var i = e === "vertical" ? 0 : 1, a = e === "vertical" ? 1 : 0, o = i ? VERTICAL_NAMES_MAP : HORIZONTAL_NAMES_MAP, s = n[o.start], c = n[o.end];
	return groupBy(t, function(e) {
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
					rect: __assign(__assign({}, p), (u = {}, u[o.end] = p[o.start], u))
				}, g = {
					element: f,
					rect: __assign(__assign({}, p), (d = {}, d[o.start] = p[o.end], d))
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
function renderDashedGuidelines(e, t, n, r, i) {
	var a = e.props.isDisplayInnerSnapDigit, o = [];
	return ["vertical", "horizontal"].forEach(function(s) {
		var c = t.filter(function(e) {
			return e.type === s;
		}), l = s === "vertical" ? 1 : 0, u = l ? 0 : 1, d = groupByElementGuidelines(s, c, r, a), f = l ? HORIZONTAL_NAMES_MAP : VERTICAL_NAMES_MAP, p = l ? VERTICAL_NAMES_MAP : HORIZONTAL_NAMES_MAP, m = r[f.start], h = r[f.end];
		d.forEach(function(t) {
			var a = t.total, c = t.start, d = t.end, g = t.inner, _ = n[u] + a[0].pos[u] - r[p.start], v = r;
			c.forEach(function(t) {
				var r = t.elementRect.rect, a = v[f.start] - r[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.start] - m - a, c[u] = _, o.push(renderDigitLine(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), v = r, d.forEach(function(t) {
				var r = t.elementRect.rect, a = r[f.start] - v[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.end] - m, c[u] = _, o.push(renderDigitLine(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), g.forEach(function(t) {
				var r = t.elementRect.rect, a = m - r[f.start], c = r[f.end] - h, d = [0, 0], p = [0, 0];
				d[l] = n[l] - a, d[u] = _, p[l] = n[l] + h - m, p[u] = _, o.push(renderDigitLine(e, s, "dashed", o.length, a, d, t.className, i)), o.push(renderDigitLine(e, s, "dashed", o.length, c, p, t.className, i));
			});
		});
	}), o;
}
function renderGapGuidelines(e, t, n, r, i) {
	var a = [];
	return ["horizontal", "vertical"].forEach(function(o) {
		var s = t.filter(function(e) {
			return e.type === o;
		}).slice(0, 1), c = o === "vertical" ? 0 : 1, l = c ? 0 : 1, u = c ? HORIZONTAL_NAMES_MAP : VERTICAL_NAMES_MAP, d = c ? VERTICAL_NAMES_MAP : HORIZONTAL_NAMES_MAP, f = r[u.start], p = r[u.end], m = r[d.start], h = r[d.end];
		s.forEach(function(t) {
			var r = t.gap, o = t.gapRects, s = Math.max.apply(Math, __spreadArray([m], __read(o.map(function(e) {
				return e.rect[d.start];
			})), !1)), g = Math.min.apply(Math, __spreadArray([h], __read(o.map(function(e) {
				return e.rect[d.end];
			})), !1)), _ = (s + g) / 2;
			s === g || _ === (m + h) / 2 || o.forEach(function(t) {
				var o = t.rect, s = t.className, d = [n[0], n[1]];
				if (o[u.end] < f) d[c] += o[u.end] - f;
				else if (p < o[u.start]) d[c] += o[u.start] - f - r;
				else return;
				d[l] += _ - m, a.push(renderDigitLine(e, c ? "vertical" : "horizontal", "gap", a.length, r, d, s, i));
			});
		});
	}), a;
}
function getTotalGuidelines(e) {
	var t = e.state, n = t.containerClientRect, r = t.hasFixed, i = n.overflow, a = n.scrollHeight, o = n.scrollWidth, s = n.clientHeight, c = n.clientWidth, l = n.clientLeft, u = n.clientTop, d = e.props, f = d.snapGap, p = f === void 0 ? !0 : f, m = d.verticalGuidelines, h = d.horizontalGuidelines, g = d.snapThreshold, _ = g === void 0 ? 5 : g, v = d.maxSnapElementGuidelineDistance, y = v === void 0 ? Infinity : v, b = d.isDisplayGridGuidelines, x = getRect(getAbsolutePosesByState(e.state)), S = x.top, C = x.left, w = x.bottom, T = x.right, E = {
		top: S,
		left: C,
		bottom: w,
		right: T,
		center: (C + T) / 2,
		middle: (S + w) / 2
	}, D = __spreadArray([], __read(getElementGuidelines(e)), !1), O = (t.snapThresholdInfo?.multiples ?? [1, 1]).map(function(e) {
		return e * _;
	});
	p && D.push.apply(D, __spreadArray([], __read(getGapGuidelines(e, E, O)), !1));
	var k = __assign({}, t.snapOffset || {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	});
	if (D.push.apply(D, __spreadArray([], __read(getGridGuidelines(e, i ? o : c, i ? a : s, l, u, k, b)), !1)), r) {
		var A = n.left, j = n.top;
		k.left += A, k.top += j, k.right += A, k.bottom += j;
	}
	return D.push.apply(D, __spreadArray([], __read(getDefaultGuidelines(h || !1, m || !1, i ? o : c, i ? a : s, l, u, k)), !1)), D = D.filter(function(e) {
		var t = e.element, n = e.elementRect, r = e.type;
		if (!t || !n) return !0;
		var i = n.rect;
		return checkBetweenRects(E, i, r, y);
	}), D;
}
function getGapGuidelines(e, t, n) {
	var r = e.props, i = r.maxSnapElementGuidelineDistance, a = i === void 0 ? Infinity : i, o = r.maxSnapElementGapDistance, s = o === void 0 ? Infinity : o, c = e.state.elementRects, l = [];
	return [[
		"vertical",
		VERTICAL_NAMES_MAP,
		HORIZONTAL_NAMES_MAP
	], [
		"horizontal",
		HORIZONTAL_NAMES_MAP,
		VERTICAL_NAMES_MAP
	]].forEach(function(e) {
		var r = __read(e, 3), i = r[0], o = r[1], u = r[2], d = t[o.start], f = t[o.end], p = t[o.center], m = t[u.start], h = t[u.end], g = {
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
			var n = __read(e, 2), r = n[0], c = n[1], u = r.rect, m = c.rect, h = u[o.start], _ = u[o.end], v = m[o.start], y = m[o.end], b = g[o.start], x = 0, S = 0, C = !1, w = !1, T = !1;
			if (_ <= d && f <= v) {
				if (w = !0, x = (v - _ - (f - d)) / 2, S = _ + x + (f - d) / 2, abs(S - p) > b) return;
			} else if (_ < v && y < d + b) {
				if (C = !0, x = v - _, S = y + x, abs(S - d) > b) return;
			} else if (_ < v && f - b < h) {
				if (T = !0, x = v - _, S = h - x, abs(S - f) > b) return;
			} else return;
			x && checkBetweenRects(t, m, i, a) && (x > s || l.push({
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
function startGridGroupGuidelines(e, t, n, r) {
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
				var f = m[l], p = m[s], g = flat$1(h.map(function(e) {
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
					return throttle(e / _, .1) * o;
				}), y = 1, b = throttle(f / _, .1);
				for (y = 1; y <= 10 && !v.every(function(e) {
					return e * y % 1 == 0;
				}); ++y);
				var x = (-e + 1) / 2, S = dot(p - d, p - d + f, x, 1 - x);
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
function getGridGuidelines(e, t, n, r, i, a, o) {
	r === void 0 && (r = 0), i === void 0 && (i = 0);
	var s = e.props, c = e.state, l = s.snapGridWidth, u = l === void 0 ? 0 : l, d = s.snapGridHeight, f = d === void 0 ? 0 : d, p = [], m = a.left, h = a.top, g = [0, 0];
	startGridGroupGuidelines(e, r, i, a);
	var _ = c.snapThresholdInfo, v = u, y = f;
	if (_ && (u *= _.multiples[0] || 1, f *= _.multiples[1] || 1, g = _.offset), f) {
		for (var b = function(e) {
			p.push({
				type: "horizontal",
				pos: [m, throttle(g[1] * y + e - i + h, .1)],
				className: prefix("grid-guideline"),
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
				pos: [throttle(g[0] * v + e - r + m, .1), h],
				className: prefix("grid-guideline"),
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
function checkBetweenRects(e, t, n, r) {
	return n === "horizontal" ? abs(e.right - t.left) <= r || abs(e.left - t.right) <= r || e.left <= t.right && t.left <= e.right : n === "vertical" ? abs(e.bottom - t.top) <= r || abs(e.top - t.bottom) <= r || e.top <= t.bottom && t.top <= e.bottom : !0;
}
function getElementGuidelines(e) {
	var t = e.state, n = e.props.elementGuidelines, r = n === void 0 ? [] : n;
	if (!r.length) return t.elementRects = [], [];
	var i = (t.elementRects || []).filter(function(e) {
		return !e.refresh;
	}), a = r.map(function(e) {
		return isObject(e) && "element" in e ? __assign(__assign({}, e), { element: getRefTarget(e.element, !0) }) : { element: getRefTarget(e, !0) };
	}).filter(function(e) {
		return e.element;
	}), o = diff(i.map(function(e) {
		return e.element;
	}), a.map(function(e) {
		return e.element;
	})), s = o.maintained, c = o.added, l = [];
	s.forEach(function(e) {
		var t = __read(e, 2), n = t[0], r = t[1];
		l[r] = i[n];
	}), getSnapElementRects(e, c.map(function(e) {
		return a[e];
	})).map(function(e, t) {
		l[c[t]] = e;
	}), t.elementRects = l;
	var u = getSnapDirections(e.props.elementSnapDirections), d = [];
	return l.forEach(function(e) {
		var t = e.element, n = e.top, r = n === void 0 ? u.top : n, i = e.left, a = i === void 0 ? u.left : i, o = e.right, s = o === void 0 ? u.right : o, c = e.bottom, l = c === void 0 ? u.bottom : c, f = e.center, p = f === void 0 ? u.center : f, m = e.middle, h = m === void 0 ? u.middle : m, g = e.className, _ = e.rect, v = splitSnapDirectionPoses({
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
				pos: [throttle(n, .1), C],
				size: E,
				sizes: D,
				className: g,
				elementRect: e,
				elementDirection: SNAP_SKIP_NAMES_MAP[S[r]] || S[r],
				direction: ""
			});
		}), y.forEach(function(n, r) {
			d.push({
				type: "horizontal",
				element: t,
				pos: [w, throttle(n, .1)],
				size: T,
				sizes: D,
				className: g,
				elementRect: e,
				elementDirection: SNAP_SKIP_NAMES_MAP[x[r]] || x[r],
				direction: ""
			});
		});
	}), d;
}
function getObjectGuidelines(e, t) {
	return e ? e.map(function(e) {
		var n = isObject(e) ? e : { pos: e }, r = n.pos;
		return isNumber(r) ? n : __assign(__assign({}, n), { pos: convertUnitSize(r, t) });
	}) : [];
}
function getDefaultGuidelines(e, t, n, r, i, a, o) {
	i === void 0 && (i = 0), a === void 0 && (a = 0), o === void 0 && (o = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	});
	var s = [], c = o.left, l = o.top, u = o.bottom, d = n + o.right - c, f = r + u - l;
	return getObjectGuidelines(e, f).forEach(function(e) {
		s.push({
			type: "horizontal",
			pos: [c, throttle(e.pos - a + l, .1)],
			size: d,
			className: e.className,
			direction: ""
		});
	}), getObjectGuidelines(t, d).forEach(function(e) {
		s.push({
			type: "vertical",
			pos: [throttle(e.pos - i + c, .1), l],
			size: f,
			className: e.className,
			direction: ""
		});
	}), s;
}
function getSnapElementRects(e, t) {
	if (!t.length) return [];
	var n = e.props.groupable, r = e.state, i = r.containerClientRect, a = r.rootMatrix, o = r.is3d, s = r.offsetDelta, c = o ? 4 : 3, l = __read(calculateContainerPos(a, i, c), 2), u = l[0], d = l[1], f = n ? 0 : s[0], p = n ? 0 : s[1];
	return t.map(function(e) {
		var t = e.element.getBoundingClientRect(), n = t.left - u - f, r = t.top - d - p, i = r + t.height, o = n + t.width, s = __read(calculateInversePosition(a, [n, r], c), 2), l = s[0], m = s[1], h = __read(calculateInversePosition(a, [o, i], c), 2), g = h[0], _ = h[1];
		return __assign(__assign({}, e), { rect: {
			left: l,
			right: g,
			top: m,
			bottom: _,
			center: (l + g) / 2,
			middle: (m + _) / 2
		} });
	});
}
function checkSnapInfo(e) {
	var t = e.state, n = t.container, r = e.props.snapContainer || n;
	if (t.snapContainer === r && t.guidelines && t.guidelines.length) return !1;
	var i = t.containerClientRect, a = {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	};
	if (n !== r) {
		var o = getRefTarget(r, !0);
		if (o) {
			var s = getClientRect(o), c = getDragDistByState(t, [s.left - i.left, s.top - i.top]), l = getDragDistByState(t, [s.right - i.right, s.bottom - i.bottom]);
			a.left = throttle(c[0], 1e-5), a.top = throttle(c[1], 1e-5), a.right = throttle(l[0], 1e-5), a.bottom = throttle(l[1], 1e-5);
		}
	}
	return t.snapContainer = r, t.snapOffset = a, t.guidelines = getTotalGuidelines(e), t.enableSnap = !0, !0;
}
function getNextFixedPoses(e, t, n, r, i, a) {
	var o = calculatePoses(e, t, n, a ? 4 : 3);
	return getAbsolutePoses(o, minus(i, getPosByDirection(o, r)));
}
function normalized(e) {
	return e ? e / abs(e) : 0;
}
function getSizeOffsetInfo(e, t, n, r, i, a) {
	var o = a.fixedDirection, s = getCheckSnapDirections(n, o, r), c = getCheckInnerBoundLineInfos(e, t, n, r), l = __spreadArray(__spreadArray([], __read(getSnapBoundInfo(e, t, s, r, i, a)), !1), __read(getInnerBoundInfo(e, c, a)), !1), u = getNearOffsetInfo(l, 0), d = getNearOffsetInfo(l, 1);
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
function recheckSizeByTwoDirection(e, t, n, r, i, a, o, s, c) {
	var l = getPosByDirection(t, o), u = checkMoveableSnapBounds(e, s, {
		vertical: [l[0]],
		horizontal: [l[1]]
	}), d = u.horizontal.offset, f = u.vertical.offset;
	if (throttle(f, FLOAT_POINT_NUM) || throttle(d, FLOAT_POINT_NUM)) {
		var p = __read(getDragDist({
			datas: c,
			distX: -f,
			distY: -d
		}), 2), m = p[0], h = p[1], g = Math.min(i || Infinity, n + o[0] * m), _ = Math.min(a || Infinity, r + o[1] * h);
		return [g - n, _ - r];
	}
	return [0, 0];
}
function checkSizeDist(e, t, n, r, i, a, o, s) {
	for (var c = getAbsolutePosesByState(e.state), l = e.props.keepRatio, u = 0, d = 0, f = 0; f < 2; ++f) {
		var p = getSizeOffsetInfo(e, t(u, d), i, l, o, s), m = p.width, h = p.height, g = m.isBound, _ = h.isBound, v = m.offset, y = h.offset;
		if (f === 1 && (g || (v = 0), _ || (y = 0)), f === 0 && o && !g && !_) return [0, 0];
		if (l) {
			var b = abs(v) * (n ? 1 / n : 1), x = abs(y) * (r ? 1 / r : 1);
			(g && _ ? b < x : _ || !g && b < x) ? v = n * y / r : y = r * v / n;
		}
		u += v, d += y;
	}
	if (!l && i[0] && i[1]) {
		var S = checkMaxBounds(e, c, i, a, s), C = S.maxWidth, w = S.maxHeight, T = __read(recheckSizeByTwoDirection(e, t(u, d).map(function(e) {
			return e.map(function(e) {
				return throttle(e, FLOAT_POINT_NUM);
			});
		}), n + u, r + d, C, w, i, o, s), 2), v = T[0], y = T[1];
		u += v, d += y;
	}
	return [u, d];
}
function absDegree(e) {
	return e < 0 && (e = e % 360 + 360), e %= 360, e;
}
function bumpDegree(e, t) {
	t = absDegree(t);
	var n = Math.floor(e / 360), r = n * 360 + 360 - t, i = n * 360 + t;
	return abs(e - r) < abs(e - i) ? r : i;
}
function getMinDegreeDistance(e, t) {
	e = absDegree(e), t = absDegree(t);
	var n = absDegree(e - t);
	return Math.min(n, 360 - n);
}
function checkSnapRotate(e, t, n, r) {
	var i = e.props, a = i[NAME_snapRotationThreshold] ?? 5, o = i[NAME_snapRotationDegrees];
	if (hasGuidelines(e, "rotatable")) {
		var s = t.pos1, c = t.pos2, l = t.pos3, u = t.pos4, d = t.origin, f = n * Math.PI / 180, p = [
			s,
			c,
			l,
			u
		].map(function(e) {
			return minus(e, d);
		}), m = p.map(function(e) {
			return rotate(e, f);
		}), h = __spreadArray(__spreadArray([], __read(checkRotateBounds(e, p, m, d, n)), !1), __read(checkRotateInnerBounds(e, p, m, d, n)), !1);
		h.sort(function(e, t) {
			return abs(e - n) - abs(t - n);
		});
		var g = h.length > 0;
		if (g) return {
			isSnap: g,
			dist: g ? h[0] : n
		};
	}
	if (o?.length && a) {
		var _ = o.slice().sort(function(e, t) {
			return getMinDegreeDistance(e, r) - getMinDegreeDistance(t, r);
		})[0];
		if (getMinDegreeDistance(_, r) <= a) return {
			isSnap: !0,
			dist: n + bumpDegree(r, _) - r
		};
	}
	return {
		isSnap: !1,
		dist: n
	};
}
function checkSnapResize(e, t, n, r, i, a, o) {
	if (!hasGuidelines(e, "resizable")) return [0, 0];
	var s = o.fixedDirection, c = o.nextAllMatrix, l = e.state, u = l.allMatrix, d = l.is3d;
	return checkSizeDist(e, function(e, r) {
		return getNextFixedPoses(c || u, t + e, n + r, s, i, d);
	}, t, n, r, i, a, o);
}
function checkSnapScale(e, t, n, r, i) {
	if (!hasGuidelines(e, "scalable")) return [0, 0];
	var a = i.startOffsetWidth, o = i.startOffsetHeight, s = i.fixedPosition, c = i.fixedDirection, l = i.is3d, u = checkSizeDist(e, function(e, n) {
		return getNextFixedPoses(scaleMatrix(i, plus(t, [e / a, n / o])), a, o, c, s, l);
	}, a, o, n, s, r, i);
	return [u[0] / a, u[1] / o];
}
function startCheckSnapDrag(e, t) {
	t.absolutePoses = getAbsolutePosesByState(e.state);
}
function getSnapGuidelines(e) {
	var t = [];
	return e.forEach(function(e) {
		e.guidelineInfos.forEach(function(n) {
			var r = n.guideline;
			find(t, function(e) {
				return e.guideline === r;
			}) || (r.direction = "", t.push({
				guideline: r,
				posInfo: e
			}));
		});
	}), t.map(function(e) {
		var t = e.guideline, n = e.posInfo;
		return __assign(__assign({}, t), { direction: n.direction });
	});
}
function addBoundGuidelines(e, t, n, r, i, a) {
	var o = checkBoundPoses(getBounds(e, a), t, n), s = o.vertical, c = o.horizontal, l = getInitialBounds();
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
	var u = checkInnerBoundPoses(e), d = u.boundMap, f = u.vertical, p = u.horizontal;
	return f.forEach(function(e) {
		findIndex(r, function(t) {
			var n = t.type, r = t.pos;
			return n === "bounds" && r === e;
		}) >= 0 || r.push({
			type: "bounds",
			pos: e
		});
	}), p.forEach(function(e) {
		findIndex(i, function(t) {
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
var directionCondition$1 = getDirectionCondition("", ["resizable", "scalable"]), Snappable = {
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
		NAME_snapRotationThreshold,
		NAME_snapRotationDegrees,
		NAME_snapHorizontalThreshold,
		NAME_snapVerticalThreshold,
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
		if (!l || !l.render || !hasGuidelines(e, "")) return watchValue(e, "boundMap", getInitialBounds(), function(e) {
			return JSON.stringify(e);
		}), watchValue(e, "innerBoundMap", getInitialBounds(), function(e) {
			return JSON.stringify(e);
		}), [];
		n.guidelines = getTotalGuidelines(e);
		var f = Math.min(a[0], o[0], s[0], c[0]), p = Math.min(a[1], o[1], s[1], c[1]), m = l.externalPoses || [], h = getAbsolutePosesByState(e.state), g = [], _ = [], v = [], y = [], b = [], x = getRect(h), S = x.width, C = x.height, w = x.top, T = x.left, E = x.bottom, D = x.right, O = {
			left: T,
			right: D,
			top: w,
			bottom: E,
			center: (T + D) / 2,
			middle: (w + E) / 2
		}, k = m.length > 0, A = k ? getRect(m) : {};
		if (!l.request) {
			if (l.direction && b.push(getSnapInfosByDirection(e, h, l.direction, d, d)), l.snap) {
				var j = getRect(h);
				l.center && (j.middle = (j.top + j.bottom) / 2, j.center = (j.left + j.right) / 2), b.push(checkSnaps(e, j, d, d));
			}
			k && (l.center && (A.middle = (A.top + A.bottom) / 2, A.center = (A.left + A.right) / 2), b.push(checkSnaps(e, A, d, d))), b.forEach(function(e) {
				var t = e.vertical.posInfos, n = e.horizontal.posInfos;
				g.push.apply(g, __spreadArray([], __read(t.filter(function(e) {
					return e.guidelineInfos.some(function(e) {
						return !e.guideline.hide;
					});
				}).map(function(e) {
					return {
						type: "snap",
						pos: e.pos
					};
				})), !1)), _.push.apply(_, __spreadArray([], __read(n.filter(function(e) {
					return e.guidelineInfos.some(function(e) {
						return !e.guideline.hide;
					});
				}).map(function(e) {
					return {
						type: "snap",
						pos: e.pos
					};
				})), !1)), v.push.apply(v, __spreadArray([], __read(getSnapGuidelines(t)), !1)), y.push.apply(y, __spreadArray([], __read(getSnapGuidelines(n)), !1));
			});
		}
		var M = addBoundGuidelines(e, [T, D], [w, E], g, _), N = M.boundMap, P = M.innerBoundMap;
		k && addBoundGuidelines(e, [A.left, A.right], [A.top, A.bottom], g, _, l.externalBounds);
		var F = __spreadArray(__spreadArray([], __read(v), !1), __read(y), !1), I = F.filter(function(e) {
			return e.element && !e.gapRects;
		}), L = F.filter(function(e) {
			return e.gapRects;
		}).sort(function(e, t) {
			return e.gap - t.gap;
		});
		triggerEvent(e, "onSnap", {
			guidelines: F.filter(function(e) {
				return !e.element;
			}),
			elements: I,
			gaps: L
		}, !0);
		var R = watchValue(e, "boundMap", N, function(e) {
			return JSON.stringify(e);
		}, getInitialBounds()), z = watchValue(e, "innerBoundMap", P, function(e) {
			return JSON.stringify(e);
		}, getInitialBounds());
		return (N === R || P === z) && triggerEvent(e, "onBound", {
			bounds: N,
			innerBounds: P
		}, !0), __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(renderDashedGuidelines(e, I, [f, p], O, t)), !1), __read(renderGapGuidelines(e, L, [f, p], O, t)), !1), __read(renderGuidelines(e, "horizontal", y, [i, r], O, t)), !1), __read(renderGuidelines(e, "vertical", v, [i, r], O, t)), !1), __read(renderSnapPoses(e, "horizontal", _, f, r, S, 0, t)), !1), __read(renderSnapPoses(e, "vertical", g, p, i, C, 1, t)), !1);
	},
	dragStart: function(e, t) {
		e.state.snapRenderInfo = {
			request: t.isRequest,
			snap: !0,
			center: !0
		}, checkSnapInfo(e);
	},
	drag: function(e) {
		var t = e.state;
		checkSnapInfo(e) || (t.guidelines = getTotalGuidelines(e)), t.snapRenderInfo && (t.snapRenderInfo.render = !0);
	},
	pinchStart: function(e) {
		this.unset(e);
	},
	dragEnd: function(e) {
		this.unset(e);
	},
	dragControlCondition: function(e, t) {
		if (directionCondition$1(e, t) || dragControlCondition(e, t)) return !0;
		if (!t.isRequest && t.inputEvent) return hasClass(t.inputEvent.target, prefix("snap-control"));
	},
	dragControlStart: function(e) {
		e.state.snapRenderInfo = null, checkSnapInfo(e);
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
		e.state.snapRenderInfo = null, checkSnapInfo(e);
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
function multiply2(e, t) {
	return [e[0] * t[0], e[1] * t[1]];
}
function prefix() {
	var e = [...arguments];
	return prefixNames.apply(void 0, __spreadArray([PREFIX], __read(e), !1));
}
function defaultSync(e) {
	e();
}
function getTransformMatrix(e) {
	return !e || e === "none" ? [
		1,
		0,
		0,
		1,
		0,
		0
	] : isObject(e) ? e : parseMat(e);
}
function getAbsoluteMatrix(e, t, n) {
	return multiplies(t, createOriginMatrix(n, t), e, createOriginMatrix(n.map(function(e) {
		return -e;
	}), t));
}
function measureSVGSize(e, t, n) {
	return t === "%" ? getSVGViewBox(e.ownerSVGElement)[n ? "width" : "height"] / 100 : 1;
}
function getBeforeTransformOrigin(e) {
	return getTransformOrigin(getComputedStyle$1(e, ":before")).map(function(t, n) {
		var r = splitUnit(t), i = r.value, a = r.unit;
		return i * measureSVGSize(e, a, n === 0);
	});
}
function getTransformOriginArray(e) {
	return e ? e.split(" ") : ["0", "0"];
}
function getTransformOrigin(e) {
	return getTransformOriginArray(e.transformOrigin);
}
function getElementTransform(e) {
	var t = getCachedStyle(e)("transform");
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
function getOffsetInfo(e, t, n, r, i) {
	var a = getDocumentElement(e) || getDocumentBody(e), o = !1, s, c;
	if (!e || n) s = e;
	else {
		var l = e?.assignedSlot?.parentElement, u = e.parentElement;
		l ? (o = !0, c = u, s = l) : s = u;
	}
	for (var d = !1, f = e === t || s === t, p = "relative", m = 1, h = parseFloat(i?.("zoom")) || 1, g = i?.("position"); s && s !== a;) {
		t === s && (f = !0);
		var _ = getCachedStyle(s), v = s.tagName.toLowerCase(), y = getElementTransform(s), b = _("willChange"), x = parseFloat(_("zoom")) || 1;
		if (p = _("position"), r && x !== 1) {
			m = x;
			break;
		}
		if (!n && r && h !== 1 && g && g !== "absolute" || v === "svg" || v === "foreignobject" || p !== "static" || y && y !== "none" || b === "transform") break;
		var S = e?.assignedSlot?.parentNode, C = s.parentNode;
		S && (o = !0, c = C);
		var w = C;
		if (w && w.nodeType === 11) {
			s = w.host, d = !0, p = getCachedStyle(s)("position");
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
function getOffsetPosInfo(e, t) {
	var n, r = e.tagName.toLowerCase(), i = e.offsetLeft, a = e.offsetTop, o = getCachedStyle(e), s = isUndefined(i), c = !s, l, u;
	return !c && (r !== "svg" || e.ownerSVGElement) ? (l = IS_WEBKIT605 ? getBeforeTransformOrigin(e) : getTransformOriginArray(o("transformOrigin")).map(function(e) {
		return parseFloat(e);
	}), u = l.slice(), c = !0, r === "svg" ? (i = 0, a = 0) : (n = __read(getSVGGraphicsOffset(e, l, e === t && t.tagName.toLowerCase() === "g"), 4), i = n[0], a = n[1], l[0] = n[2], l[1] = n[3])) : (l = getTransformOriginArray(o("transformOrigin")).map(function(e) {
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
function getBodyOffset(e, t) {
	var n = getCachedStyle(e), r = getCachedStyle(getDocumentBody(e)), i = r("position");
	if (!t && (!i || i === "static")) return [0, 0];
	var a = parseInt(r("marginLeft"), 10), o = parseInt(r("marginTop"), 10);
	return n("position") === "absolute" && ((n("top") !== "auto" || n("bottom") !== "auto") && (o = 0), (n("left") !== "auto" || n("right") !== "auto") && (a = 0)), [a, o];
}
function convert3DMatrixes(e) {
	e.forEach(function(e) {
		var t = e.matrix;
		t && (e.matrix = convertDimension(t, 3, 4));
	});
}
function getPositionFixedInfo(e) {
	for (var t = e.parentElement, n = !1, r = getDocumentBody(e); t;) {
		var i = getComputedStyle$1(t).transform;
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
function makeMatrixCSS(e, t) {
	return t === void 0 && (t = e.length > 9), `${t ? "matrix3d" : "matrix"}(${convertMatrixtoCSS(e, !t).join(",")})`;
}
function getSVGViewBox(e) {
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
function getSVGMatrix(e, t) {
	var n, r = getSVGViewBox(e), i = r.width, a = r.height, o = r.clientWidth, s = r.clientHeight, c = o / i, l = s / a, u = e.preserveAspectRatio.baseVal, d = u.align, f = u.meetOrSlice, p = [0, 0], m = [c, l], h = [0, 0];
	if (d !== 1) {
		var g = (d - 2) % 3, _ = Math.floor((d - 2) / 3);
		p[0] = i * g / 2, p[1] = a * _ / 2;
		var v = f === 2 ? Math.max(l, c) : Math.min(c, l);
		m[0] = v, m[1] = v, h[0] = (o - i) / 2 * g, h[1] = (s - a) / 2 * _;
	}
	var y = createScaleMatrix(m, t);
	return n = __read(h, 2), y[t * (t - 1)] = n[0], y[t * (t - 1) + 1] = n[1], getAbsoluteMatrix(y, t, p);
}
function getSVGGraphicsOffset(e, t, n) {
	var r = e.tagName.toLowerCase();
	if (!e.getBBox || !n && r === "g") return [
		0,
		0,
		0,
		0
	];
	var i = getCachedStyle(e)("transform-box") === "fill-box", a = e.getBBox(), o = getSVGViewBox(e.ownerSVGElement), s = a.x, c = a.y;
	r === "foreignobject" && !s && !c && (s = parseFloat(e.getAttribute("x")) || 0, c = parseFloat(e.getAttribute("y")) || 0);
	var l = s - o.x, u = c - o.y;
	return [
		l,
		u,
		i ? t[0] : t[0] - l,
		i ? t[1] : t[1] - u
	];
}
function calculatePosition(e, t, n) {
	return calculate(e, convertPositionMatrix(t, n), n);
}
function calculatePoses(e, t, n, r) {
	return [
		[0, 0],
		[t, 0],
		[0, n],
		[t, n]
	].map(function(t) {
		return calculatePosition(e, t, r);
	});
}
function getRect(e) {
	var t = e.map(function(e) {
		return e[0];
	}), n = e.map(function(e) {
		return e[1];
	}), r = Math.min.apply(Math, __spreadArray([], __read(t), !1)), i = Math.min.apply(Math, __spreadArray([], __read(n), !1)), a = Math.max.apply(Math, __spreadArray([], __read(t), !1)), o = Math.max.apply(Math, __spreadArray([], __read(n), !1));
	return {
		left: r,
		top: i,
		right: a,
		bottom: o,
		width: a - r,
		height: o - i
	};
}
function calculateRect(e, t, n, r) {
	return getRect(calculatePoses(e, t, n, r));
}
function getSVGOffset(e, t, n, r, i) {
	var a, o = e.target, s = e.origin, c = t.matrix, l = getSize(o), u = l.offsetWidth, d = l.offsetHeight, f = n.getBoundingClientRect(), p = [0, 0];
	n === getDocumentBody(n) && (p = getBodyOffset(o, !0));
	for (var m = o.getBoundingClientRect(), h = m.left - f.left + n.scrollLeft - (n.clientLeft || 0) + p[0], g = m.top - f.top + n.scrollTop - (n.clientTop || 0) + p[1], _ = m.width, v = m.height, y = multiplies(r, i, c), b = calculateRect(y, u, d, r), x = b.left, S = b.top, C = b.width, w = b.height, T = calculatePosition(y, s, r), E = minus(T, [x, S]), D = [h + E[0] * _ / C, g + E[1] * v / w], O = [0, 0], k = 0; ++k < 10;) {
		var A = invert(i, r);
		a = __read(minus(calculatePosition(A, D, r), calculatePosition(A, T, r)), 2), O[0] = a[0], O[1] = a[1];
		var j = calculateRect(multiplies(r, i, createOriginMatrix(O, r), c), u, d, r), M = j.left, N = j.top, P = M - h, F = N - g;
		if (abs(P) < 2 && abs(F) < 2) break;
		D[0] -= P, D[1] -= F;
	}
	return O.map(function(e) {
		return Math.round(e);
	});
}
function calculateMoveableClientPositions(e, t, n) {
	var r = e.length === 16 ? 4 : 3, i = t.map(function(t) {
		return calculatePosition(e, t, r);
	}), a = n.left, o = n.top;
	return i.map(function(e) {
		return [e[0] + a, e[1] + o];
	});
}
function getDistSize(e) {
	return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function getDiagonalSize(e, t) {
	return getDistSize([t[0] - e[0], t[1] - e[1]]);
}
function getLineStyle(e, t, n, r) {
	n === void 0 && (n = 1), r === void 0 && (r = getRad$1(e, t));
	var i = getDiagonalSize(e, t);
	return {
		transform: `translateY(-50%) translate(${e[0]}px, ${e[1]}px) rotate(${r}rad) scaleY(${n})`,
		width: `${i}px`
	};
}
function getControlTransform(e, t) {
	var n = [...arguments].slice(2), r = n.length;
	return { transform: `translateZ(0px) translate(${n.reduce(function(e, t) {
		return e + t[0];
	}, 0) / r}px, ${n.reduce(function(e, t) {
		return e + t[1];
	}, 0) / r}px) rotate(${e}rad) scale(${t})` };
}
function getProps(e, t) {
	var n = e[t];
	return isObject(n) ? __assign(__assign({}, e), n) : e;
}
function getSize(e) {
	var t = e && !isUndefined(e.offsetWidth), n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = Infinity, h = Infinity, g = Infinity, _ = Infinity, v = 0, y = 0, b = !1;
	if (e) if (!t && e.ownerSVGElement) {
		var x = e.getBBox();
		b = !0, n = x.width, r = x.height, o = n, s = r, c = n, l = r, i = n, a = r;
	} else {
		var S = getCachedStyle(e), C = e.style, w = S("boxSizing") === "border-box", T = parseFloat(S("borderLeftWidth")) || 0, E = parseFloat(S("borderRightWidth")) || 0, D = parseFloat(S("borderTopWidth")) || 0, O = parseFloat(S("borderBottomWidth")) || 0, k = parseFloat(S("paddingLeft")) || 0, A = parseFloat(S("paddingRight")) || 0, j = parseFloat(S("paddingTop")) || 0, M = parseFloat(S("paddingBottom")) || 0, N = k + A, P = j + M, F = T + E, I = D + O, L = N + F, R = P + I, z = S("position"), B = 0, V = 0;
		if ("clientLeft" in e) {
			var H = null;
			if (H = z === "absolute" ? getOffsetInfo(e, getDocumentBody(e)).offsetParent : e.parentElement, H) {
				var U = getCachedStyle(H);
				B = parseFloat(U("width")), V = parseFloat(U("height"));
			}
		}
		u = Math.max(N, convertUnitSize(S("minWidth"), B) || 0), d = Math.max(P, convertUnitSize(S("minHeight"), V) || 0), m = convertUnitSize(S("maxWidth"), B), h = convertUnitSize(S("maxHeight"), V), isNaN(m) && (m = Infinity), isNaN(h) && (h = Infinity), v = convertUnitSize(C.width, 0) || 0, y = convertUnitSize(C.height, 0) || 0, o = parseFloat(S("width")) || 0, s = parseFloat(S("height")) || 0, c = abs(o - v) < 1 ? between(u, v || o, m) : o, l = abs(s - y) < 1 ? between(d, y || s, h) : s, n = c, r = l, i = c, a = l, w ? (g = m, _ = h, f = u, p = d, c = n - L, l = r - R) : (g = m + L, _ = h + R, f = u + L, p = d + R, n = c + L, r = l + R), i = c + N, a = l + P;
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
function getRotationRad(e, t) {
	return getRad$1(t > 0 ? e[0] : e[1], t > 0 ? e[1] : e[0]);
}
function resetClientRect() {
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
function getExtendsRect(e, t) {
	var n = e === getDocumentBody(e) || e === getDocumentElement(e), r = {
		clientLeft: e.clientLeft,
		clientTop: e.clientTop,
		clientWidth: e.clientWidth,
		clientHeight: e.clientHeight,
		scrollWidth: e.scrollWidth,
		scrollHeight: e.scrollHeight,
		overflow: !1
	};
	return n && (r.clientHeight = Math.max(t.height, r.clientHeight), r.scrollHeight = Math.max(t.height, r.scrollHeight)), r.overflow = getCachedStyle(e)("overflow") !== "visible", __assign(__assign({}, t), r);
}
function getClientRectByPosition(e, t, n, r) {
	var i = e.left, a = e.right, o = e.top, s = e.bottom, c = t.top, l = t.left, u = {
		left: l + i,
		top: c + o,
		right: l + a,
		bottom: c + s,
		width: a - i,
		height: s - o
	};
	return n && r ? getExtendsRect(n, u) : u;
}
function getClientRect(e, t) {
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
	return e && t ? getExtendsRect(e, s) : s;
}
function getTotalOrigin(e) {
	var t = e.props, n = t.groupable, r = t.svgOrigin, i = e.getState(), a = i.offsetWidth, o = i.offsetHeight, s = i.svg, c = i.transformOrigin;
	return !n && s && r ? convertTransformOriginArray(r, a, o) : c;
}
function getTotalDirection(e, t, n, r) {
	var i;
	if (e) i = e;
	else if (t) i = [0, 0];
	else {
		var a = n.target;
		i = getDirection(a, r);
	}
	return i;
}
function getDirection(e, t) {
	if (e) {
		var n = e.getAttribute("data-rotation") || "", r = e.getAttribute("data-direction");
		if (t.deg = n, r) {
			var i = [0, 0];
			return r.indexOf("w") > -1 && (i[0] = -1), r.indexOf("e") > -1 && (i[0] = 1), r.indexOf("n") > -1 && (i[1] = -1), r.indexOf("s") > -1 && (i[1] = 1), i;
		}
	}
}
function getAbsolutePoses(e, t) {
	return [
		plus(t, e[0]),
		plus(t, e[1]),
		plus(t, e[2]),
		plus(t, e[3])
	];
}
function getAbsolutePosesByState(e) {
	var t = e.left, n = e.top, r = e.pos1, i = e.pos2, a = e.pos3, o = e.pos4;
	return getAbsolutePoses([
		r,
		i,
		a,
		o
	], [t, n]);
}
function unsetAbles(e, t) {
	e[t ? "controlAbles" : "targetAbles"].forEach(function(t) {
		t.unset && t.unset(e);
	});
}
function unsetGesto(e, t) {
	var n = t ? "controlGesto" : "targetGesto", r = e[n];
	r?.isIdle() === !1 && unsetAbles(e, t), r?.unset(), e[n] = null;
}
function fillCSSObject(e, t) {
	if (t) {
		var n = getBeforeRenderableDatas(t);
		n.nextStyle = __assign(__assign({}, n.nextStyle), e);
	}
	return {
		style: e,
		cssText: getKeys(e).map(function(t) {
			return `${decamelize(t, "-")}: ${e[t]};`;
		}).join("")
	};
}
function fillAfterTransform(e, t, n) {
	var r = t.afterTransform || t.transform;
	return __assign(__assign({}, fillCSSObject(__assign(__assign(__assign({}, e.style), t.style), { transform: r }), n)), {
		afterTransform: r,
		transform: e.transform
	});
}
function fillParams(e, t, n, r) {
	var i = t.datas;
	i.datas ||= {};
	var a = __assign(__assign({}, n), {
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
function fillEndParams(e, t, n) {
	var r = t.datas, i = "isDrag" in n ? n.isDrag : t.isDrag;
	return r.datas ||= {}, __assign(__assign({ isDrag: i }, n), {
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
function catchEvent(e, t, n) {
	e._emitter.on(t, n);
}
function triggerEvent(e, t, n, r, i) {
	return e.triggerEvent(t, n, r, i);
}
function getComputedStyle$1(e, t) {
	return getWindow(e).getComputedStyle(e, t);
}
function filterAbles(e, t, n) {
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
function equals(e, t) {
	return e === t || e == null && t == null;
}
function selectValue() {
	for (var e = [...arguments], t = e.length - 1, n = 0; n < t; ++n) {
		var r = e[n];
		if (!isUndefined(r)) return r;
	}
	return e[t];
}
function groupBy(e, t) {
	var n = [], r = [];
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r.indexOf(o), c = n[s] || [];
		s === -1 && (r.push(o), n.push(c)), c.push(i);
	}), n;
}
function groupByMap(e, t) {
	var n = [], r = {};
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r[o];
		s || (s = [], r[o] = s, n.push(s)), s.push(i);
	}), n;
}
function flat(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function maxOffset() {
	var e = [...arguments];
	return e.sort(function(e, t) {
		return abs(t) - abs(e);
	}), e[0];
}
function calculateInversePosition(e, t, n) {
	return calculate(invert(e, n), convertPositionMatrix(t, n), n);
}
function convertDragDist(e, t) {
	var n, r = e.is3d, i = e.rootMatrix, a = r ? 4 : 3;
	return n = __read(calculateInversePosition(i, [t.distX, t.distY], a), 2), t.distX = n[0], t.distY = n[1], t;
}
function calculatePadding(e, t, n, r) {
	if (!n[0] && !n[1]) return t;
	var i = calculatePosition(e, [normalized(n[0] || 1), 0], r), a = calculatePosition(e, [0, normalized(n[1] || 1)], r);
	return plus(t, calculatePosition(e, [n[0] / getDistSize(i), n[1] / getDistSize(a)], r));
}
function convertCSSSize(e, t, n) {
	return n ? `${e / t * 100}%` : `${e}px`;
}
function getTinyDist(e) {
	return abs(e) <= TINY_NUM ? 0 : e;
}
function getDirectionViewClassName(e) {
	return function(t) {
		if (!t.isDragging(e)) return "";
		var n = getGestoData(t, e).deg;
		return n ? prefix(`view-control-rotation${n}`) : "";
	};
}
function getDirectionCondition(e, t) {
	return t === void 0 && (t = [e]), function(n, r) {
		if (r.isRequest) return t.some(function(e) {
			return r.requestAble === e;
		}) ? r.parentDirection : !1;
		var i = r.inputEvent.target;
		return hasClass(i, prefix("direction")) && (!e || hasClass(i, prefix(e)));
	};
}
function convertTransformInfo(e, t, n) {
	var r = parse(e, {
		"x%": function(e) {
			return e / 100 * t.offsetWidth;
		},
		"y%": function(e) {
			return e / 100 * t.offsetHeight;
		}
	}), i = e.slice(0, n < 0 ? void 0 : n), a = e.slice(0, n < 0 ? void 0 : n + 1), o = e[n] || "", s = n < 0 ? [] : e.slice(n), c = n < 0 ? [] : e.slice(n + 1), l = r.slice(0, n < 0 ? void 0 : n), u = r.slice(0, n < 0 ? void 0 : n + 1), d = r[n] ?? parse([""])[0], f = n < 0 ? [] : r.slice(n), p = n < 0 ? [] : r.slice(n + 1), m = d ? [d] : [], h = toMat(l), g = toMat(u), _ = toMat(f), v = toMat(p), y = multiply(h, _, 4);
	return {
		transforms: e,
		beforeFunctionMatrix: h,
		beforeFunctionMatrix2: g,
		targetFunctionMatrix: toMat(m),
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
function isArrayFormat(e) {
	return !e || !isObject(e) || isNode(e) ? !1 : isArray(e) || "length" in e;
}
function getRefTarget(e, t) {
	return e ? isNode(e) ? e : isString(e) ? t ? document.querySelector(e) : e : isFunction(e) ? e() : isWindow(e) ? e : "current" in e ? e.current : e : null;
}
function getRefTargets(e, t) {
	return e ? (isArrayFormat(e) ? [].slice.call(e) : [e]).reduce(function(e, n) {
		return isString(n) && t ? __spreadArray(__spreadArray([], __read(e), !1), __read([].slice.call(document.querySelectorAll(n))), !1) : (isArray(n) ? e.push(getRefTargets(n, t)) : e.push(getRefTarget(n, t)), e);
	}, []) : [];
}
function getAbsoluteRotation(e, t, n) {
	var r = getRad$1(e, t) / Math.PI * 180;
	return r = n >= 0 ? r : 180 - r, r = r >= 0 ? r : 360 + r, r;
}
function getDragDistByState(e, t) {
	var n = e.rootMatrix, r = e.is3d, i = invert(n, r ? 4 : 3);
	return r || (i = convertDimension(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, calculateMatrixDist(i, t);
}
function getSizeDistByDist(e, t, n, r, i) {
	var a = __read(e, 2), o = a[0], s = a[1], c = 0, l = 0;
	if (i && o && s) {
		var u = getRad$1([0, 0], t), d = getRad$1([0, 0], r), f = getDistSize(t), p = Math.cos(u - d) * f;
		if (!r[0]) l = p, c = l * n;
		else if (!r[1]) c = p, l = c / n;
		else {
			var m = r[0] * o, h = r[1] * s, g = Math.atan2(m + t[0], h + t[1]), _ = Math.atan2(m, h);
			g < 0 && (g += Math.PI * 2), _ < 0 && (_ += Math.PI * 2);
			var v = 0;
			abs(g - _) < Math.PI / 2 || abs(g - _) > Math.PI / 2 * 3 || (_ += Math.PI), v = g - _, v > Math.PI * 2 ? v -= Math.PI * 2 : v > Math.PI ? v = 2 * Math.PI - v : v < -Math.PI && (v = -2 * Math.PI - v);
			var y = getDistSize([m + t[0], h + t[1]]) * Math.cos(v);
			c = y * Math.sin(_) - m, l = y * Math.cos(_) - h, r[0] < 0 && (c *= -1), r[1] < 0 && (l *= -1);
		}
	} else c = r[0] * t[0], l = r[1] * t[1];
	return [c, l];
}
function getOffsetSizeDist(e, t, n, r) {
	var i, a = n.ratio, o = n.startOffsetWidth, s = n.startOffsetHeight, c = 0, l = 0, u = r.distX, d = r.distY, f = r.pinchScale, p = r.parentDistance, m = r.parentDist, h = r.parentScale, g = n.fixedDirection, _ = [0, 1].map(function(t) {
		return abs(e[t] - g[t]);
	}), v = [0, 1].map(function(e) {
		var t = _[e];
		return t !== 0 && (t = 2 / t), t;
	});
	if (m) c = m[0], l = m[1], t && (c ? l ||= c / a : c = l * a);
	else if (isNumber(f)) c = (f - 1) * o, l = (f - 1) * s;
	else if (h) c = (h[0] - 1) * o, l = (h[1] - 1) * s;
	else if (p) {
		var y = o * _[0], b = s * _[1], x = getDistSize([y, b]);
		c = p / x * y * v[0], l = p / x * b * v[1];
	} else {
		var S = getDragDist({
			datas: n,
			distX: u,
			distY: d
		});
		S = v.map(function(e, t) {
			return S[t] * e;
		}), i = __read(getSizeDistByDist([o, s], S, a, e, t), 2), c = i[0], l = i[1];
	}
	return {
		distWidth: c,
		distHeight: l
	};
}
function convertTransformUnit(e, t) {
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
		var n = __read(e.split(" "), 2), r = n[0], i = n[1], a = convertTransformUnit(r || ""), o = convertTransformUnit(i || ""), s = __assign(__assign({}, a), o), c = {
			x: "50%",
			y: "50%"
		};
		return s.x && (c.x = s.x), s.y && (c.y = s.y), s.value && (s.x && !s.y && (c.y = s.value), !s.x && s.y && (c.x = s.value)), c;
	}
	return e === "left" ? { x: "0%" } : e === "right" ? { x: "100%" } : e === "top" ? { y: "0%" } : e === "bottom" ? { y: "100%" } : e ? e === "center" ? { value: "50%" } : { value: e } : {};
}
function convertTransformOriginArray(e, t, n) {
	var r = convertTransformUnit(e, !0), i = r.x, a = r.y;
	return [convertUnitSize(i, t) || 0, convertUnitSize(a, n) || 0];
}
function rotatePosesInfo(e, t, n) {
	var r = e.map(function(e) {
		return minus(e, t);
	}), i = r.map(function(e) {
		return rotate(e, n);
	});
	return {
		prev: r,
		next: i,
		result: i.map(function(e) {
			return plus(e, t);
		})
	};
}
function isDeepArrayEquals(e, t) {
	return e.length === t.length && e.every(function(e, n) {
		var r = t[n], i = isArray(e), a = isArray(r);
		return i && a ? isDeepArrayEquals(e, r) : !i && !a ? e === r : !1;
	});
}
function watchValue(e, t, n, r, i) {
	var a = e._store, o = a[t];
	if (!(t in a)) if (i != null) a[t] = i, o = i;
	else return a[t] = n, n;
	return o === n || r(o) === r(n) ? o : (a[t] = n, n);
}
function sign(e) {
	return e >= 0 ? 1 : -1;
}
function abs(e) {
	return Math.abs(e);
}
function countEach(e, t) {
	return counter(e).map(function(e) {
		return t(e);
	});
}
function getPaddingBox(e) {
	return isNumber(e) ? {
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
var Pinchable = makeAble("pinchable", {
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
		}), f = fillParams(e, t, {});
		r && (f.targets = r), n.isPinch = triggerEvent(e, l, f) !== !1, n.ables = d;
		var p = n.isPinch;
		return p ? (d.forEach(function(n) {
			if (a[n.name] = a[n.name] || {}, n[u]) {
				var r = __assign(__assign({}, t), {
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
			var l = i * (1 - 1 / r), u = fillParams(e, t, {});
			s && (u.targets = s), triggerEvent(e, `onPinch${s ? "Group" : ""}`, u);
			var d = n.ables, f = `drag${s ? "Group" : ""}Control`;
			return d.forEach(function(n) {
				n[f] && n[f](e, __assign(__assign({}, t), {
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
			var s = `onPinch${a ? "Group" : ""}End`, c = fillEndParams(e, t, { isDrag: r });
			a && (c.targets = a), triggerEvent(e, s, c);
			var l = n.ables, u = `drag${a ? "Group" : ""}ControlEnd`;
			return l.forEach(function(n) {
				n[u] && n[u](e, __assign(__assign({}, t), {
					isDrag: r,
					datas: o[n.name],
					inputEvent: i,
					isPinch: !0
				}));
			}), r;
		}
	},
	pinchGroupStart: function(e, t) {
		return this.pinchStart(e, __assign(__assign({}, t), { targets: e.props.targets }));
	},
	pinchGroup: function(e, t) {
		return this.pinch(e, __assign(__assign({}, t), { targets: e.props.targets }));
	},
	pinchGroupEnd: function(e, t) {
		return this.pinchEnd(e, __assign(__assign({}, t), { targets: e.props.targets }));
	}
}), directionCondition = getDirectionCondition("scalable"), Scalable = {
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
	render: getRenderDirections("scalable"),
	dragControlCondition: directionCondition,
	viewClassName: getDirectionViewClassName("scalable"),
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.inputEvent, a = t.parentDirection, o = getTotalDirection(a, r, i, n), s = e.state, c = s.width, l = s.height, u = s.targetTransform, d = s.target, f = s.pos1, p = s.pos2, m = s.pos4;
		if (!o || !d) return !1;
		r || setDragStart(e, t), n.datas = {}, n.transform = u, n.prevDist = [1, 1], n.direction = o, n.startOffsetWidth = c, n.startOffsetHeight = l, n.startValue = [1, 1];
		var h = !o[0] && !o[1] || o[0] || !o[1];
		setDefaultTransformIndex(e, t, "scale"), n.isWidth = h;
		function g(e) {
			n.ratio = e && isFinite(e) ? e : 0;
		}
		n.startPositions = getAbsolutePosesByState(e.state);
		function _(e) {
			var t = getFixedDirectionInfo(n.startPositions, e);
			n.fixedDirection = t.fixedDirection, n.fixedPosition = t.fixedPosition, n.fixedOffset = t.fixedOffset;
		}
		n.setFixedDirection = _, g(getDist$2(f, p) / getDist$2(p, m)), _([-o[0], -o[1]]);
		var v = function(e) {
			n.minScaleSize = e;
		}, y = function(e) {
			n.maxScaleSize = e;
		};
		v([-Infinity, -Infinity]), y([Infinity, Infinity]);
		var b = fillParams(e, t, __assign(__assign({
			direction: o,
			set: function(e) {
				n.startValue = e;
			},
			setRatio: g,
			setFixedDirection: _,
			setMinScaleSize: v,
			setMaxScaleSize: y
		}, fillTransformStartEvent(e, t)), { dragStart: Draggable.dragStart(e, new CustomGesto().dragStart([0, 0], t)) })), x = triggerEvent(e, "onScaleStart", b);
		return n.startFixedDirection = n.fixedDirection, x !== !1 && (n.isScale = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}), n.isScale ? b : !1;
	},
	dragControl: function(e, t) {
		resolveTransformEvent(e, t, "scale");
		var n = t.datas, r = t.parentKeepRatio, i = t.parentFlag, a = t.isPinch, o = t.dragClient, s = t.isRequest, c = t.useSnap, l = t.resolveMatrix, u = n.prevDist, d = n.direction, f = n.startOffsetWidth, p = n.startOffsetHeight, m = n.isScale, h = n.startValue, g = n.isWidth, _ = n.ratio;
		if (!m) return !1;
		var v = e.props, y = v.throttleScale, b = v.parentMoveable, x = d;
		!d[0] && !d[1] && (x = [1, 1]);
		var S = _ && (r ?? v.keepRatio) || !1, C = e.state, w = [h[0], h[1]];
		function T() {
			var e = getOffsetSizeDist(x, S, n, t), r = e.distWidth, i = e.distHeight, a = f ? (f + r) / f : 1, o = p ? (p + i) / p : 1;
			h[0] || (w[0] = r / f), h[1] || (w[1] = i / p);
			var s = (x[0] || S ? a : 1) * w[0], c = (x[1] || S ? o : 1) * w[1];
			return s === 0 && (s = sign(u[0]) * MIN_SCALE), c === 0 && (c = sign(u[1]) * MIN_SCALE), [s, c];
		}
		var E = T();
		if (!a && e.props.groupable) {
			var D = (C.snapRenderInfo || {}).direction;
			isArray(D) && (D[0] || D[1]) && (C.snapRenderInfo = {
				direction: d,
				request: t.isRequest
			});
		}
		triggerEvent(e, "onBeforeScale", fillParams(e, t, {
			scale: E,
			setFixedDirection: function(e) {
				return n.setFixedDirection(e), E = T(), E;
			},
			startFixedDirection: n.startFixedDirection,
			setScale: function(e) {
				E = e;
			}
		}, !0));
		var O = [E[0] / w[0], E[1] / w[1]], k = o, A = [0, 0], j = sign(O[0] * O[1]), M = !o && !i && a;
		if (M || l ? k = getTranslateFixedPosition(e, n.targetAllTransform, [0, 0], [0, 0], n) : o || (k = n.fixedPosition), a || (A = checkSnapScale(e, O, d, !c && s, n)), S) {
			x[0] && x[1] && A[0] && A[1] && (Math.abs(A[0] * f) > Math.abs(A[1] * p) ? A[1] = 0 : A[0] = 0);
			var N = !A[0] && !A[1];
			if (N && (g ? O[0] = throttle(O[0] * w[0], y) / w[0] : O[1] = throttle(O[1] * w[1], y) / w[1]), x[0] && !x[1] || A[0] && !A[1] || N && g) {
				O[0] += A[0];
				var P = f * O[0] * w[0] / _;
				O[1] = sign(j * O[0]) * abs(P / p / w[1]);
			} else if (!x[0] && x[1] || !A[0] && A[1] || N && !g) {
				O[1] += A[1];
				var F = p * O[1] * w[1] * _;
				O[0] = sign(j * O[1]) * abs(F / f / w[0]);
			}
		} else O[0] += A[0], O[1] += A[1], A[0] || (O[0] = throttle(O[0] * w[0], y) / w[0]), A[1] || (O[1] = throttle(O[1] * w[1], y) / w[1]);
		O[0] === 0 && (O[0] = sign(u[0]) * MIN_SCALE), O[1] === 0 && (O[1] = sign(u[1]) * MIN_SCALE), E = multiply2(O, [w[0], w[1]]);
		var I = [f, p], L = [f * E[0], p * E[1]];
		L = calculateBoundSize(L, n.minScaleSize, n.maxScaleSize, S ? _ : !1), E = countEach(2, function(e) {
			return I[e] ? L[e] / I[e] : L[e];
		}), O = countEach(2, function(e) {
			return E[e] / w[e];
		});
		var R = countEach(2, function(e) {
			return u[e] ? O[e] / u[e] : O[e];
		}), z = `scale(${O.join(", ")})`, B = `scale(${E.join(", ")})`, V = convertTransformFormat(n, B, z), H = !h[0] || !h[1], U = getScaleDist(e, H ? B : z, n.fixedDirection, k, n.fixedOffset, n, H), W = M ? U : minus(U, n.prevInverseDist || [0, 0]);
		if (n.prevDist = O, n.prevInverseDist = U, E[0] === u[0] && E[1] === u[1] && W.every(function(e) {
			return !e;
		}) && !b && !M) return !1;
		var G = fillParams(e, t, __assign({
			offsetWidth: f,
			offsetHeight: p,
			direction: d,
			scale: E,
			dist: O,
			delta: R,
			isPinch: !!a
		}, fillTransformEvent(e, V, W, a, t)));
		return triggerEvent(e, "onScale", G), G;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (!n.isScale) return !1;
		n.isScale = !1;
		var r = fillEndParams(e, t, {});
		return triggerEvent(e, "onScaleEnd", r), r;
	},
	dragGroupControlCondition: directionCondition,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, t);
		if (!r) return !1;
		var i = fillChildEvents(e, "resizable", t);
		n.moveableScale = e.scale;
		var a = triggerChildAbles(e, this, "dragControlStart", t, function(t, r) {
			return startChildDist(e, t, n, r);
		}), o = function(t) {
			r.setFixedDirection(t), a.forEach(function(r, a) {
				r.setFixedDirection(t), startChildDist(e, r.moveable, n, i[a]);
			});
		};
		n.setFixedDirection = o;
		var s = __assign(__assign({}, r), {
			targets: e.props.targets,
			events: a,
			setFixedDirection: o
		});
		return n.isScale = triggerEvent(e, "onScaleGroupStart", s) !== !1, n.isScale ? s : !1;
	},
	dragGroupControl: function(e, t) {
		var n = t.datas;
		if (n.isScale) {
			catchEvent(e, "onBeforeScale", function(n) {
				triggerEvent(e, "onBeforeScaleGroup", fillParams(e, t, __assign(__assign({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = r.dist, a = n.moveableScale;
				e.scale = [i[0] * a[0], i[1] * a[1]];
				var o = e.props.keepRatio, s = n.fixedPosition, c = triggerChildAbles(e, this, "dragControl", t, function(t, n) {
					var r = __read(calculate(createRotateMatrix(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * i[0],
						n.datas.originalY * i[1],
						1
					], 3), 2), a = r[0], c = r[1];
					return __assign(__assign({}, n), {
						parentDist: null,
						parentScale: i,
						parentKeepRatio: o,
						dragClient: plus(s, [a, c])
					});
				}), l = __assign({
					targets: e.props.targets,
					events: c
				}, r);
				return triggerEvent(e, "onScaleGroup", l), l;
			}
		}
	},
	dragGroupControlEnd: function(e, t) {
		var n = t.isDrag;
		if (t.datas.isScale) {
			this.dragControlEnd(e, t);
			var r = triggerChildAbles(e, this, "dragControlEnd", t);
			return triggerEvent(e, "onScaleGroupEnd", fillEndParams(e, t, {
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
function getMiddleLinePos(e, t) {
	return e.map(function(e, n) {
		return dot(e, t[n], 1, 2);
	});
}
function getTriangleRad(e, t, n) {
	var r = getRad$1(e, t), i = getRad$1(e, n) - r;
	return i >= 0 ? i : i + 2 * Math.PI;
}
function isValidPos(e, t) {
	var n = getTriangleRad(e[0], e[1], e[2]), r = getTriangleRad(t[0], t[1], t[2]), i = Math.PI;
	return !(n >= i && r <= i || n <= i && r >= i);
}
var Warpable = {
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
	viewClassName: getDirectionViewClassName("warpable"),
	render: function(e, t) {
		var n = e.props, r = n.resizable, i = n.scalable, a = n.warpable, o = n.zoom;
		if (r || i || !a) return [];
		var s = e.state, c = s.pos1, l = s.pos2, u = s.pos3, d = s.pos4, f = getMiddleLinePos(c, l), p = getMiddleLinePos(l, c), m = getMiddleLinePos(c, u), h = getMiddleLinePos(u, c), g = getMiddleLinePos(u, d), _ = getMiddleLinePos(d, u), v = getMiddleLinePos(l, d), y = getMiddleLinePos(d, l);
		return __spreadArray([
			t.createElement("div", {
				className: prefix("line"),
				key: "middeLine1",
				style: getLineStyle(f, g, o)
			}),
			t.createElement("div", {
				className: prefix("line"),
				key: "middeLine2",
				style: getLineStyle(p, _, o)
			}),
			t.createElement("div", {
				className: prefix("line"),
				key: "middeLine3",
				style: getLineStyle(m, v, o)
			}),
			t.createElement("div", {
				className: prefix("line"),
				key: "middeLine4",
				style: getLineStyle(h, y, o)
			})
		], __read(renderAllDirections(e, "warpable", t)), !1);
	},
	dragControlCondition: function(e, t) {
		if (t.isRequest) return !1;
		var n = t.inputEvent.target;
		return hasClass(n, prefix("direction")) && hasClass(n, prefix("warpable"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.inputEvent, i = e.props.target, a = r.target, o = getDirection(a, n);
		if (!o || !i) return !1;
		var s = e.state, c = s.transformOrigin, l = s.is3d, u = s.targetTransform, d = s.targetMatrix, f = s.width, p = s.height, m = s.left, h = s.top;
		return n.datas = {}, n.targetTransform = u, n.warpTargetMatrix = l ? d : convertDimension(d, 3, 4), n.targetInverseMatrix = ignoreDimension(invert(n.warpTargetMatrix, 4), 3, 4), n.direction = o, n.left = m, n.top = h, n.poses = [
			[0, 0],
			[f, 0],
			[0, p],
			[f, p]
		].map(function(e) {
			return minus(e, c);
		}), n.nextPoses = n.poses.map(function(e) {
			var t = __read(e, 2), r = t[0], i = t[1];
			return calculate(n.warpTargetMatrix, [
				r,
				i,
				0,
				1
			], 4);
		}), n.startValue = createIdentityMatrix(4), n.prevMatrix = createIdentityMatrix(4), n.absolutePoses = getAbsolutePosesByState(s), n.posIndexes = getPosIndexesByDirection(o), setDragStart(e, t), setDefaultTransformIndex(e, t, "matrix3d"), s.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}, triggerEvent(e, "onWarpStart", fillParams(e, t, __assign({ set: function(e) {
			n.startValue = e;
		} }, fillTransformStartEvent(e, t)))) !== !1 && (n.isWarp = !0), n.isWarp;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isRequest, i = t.distX, a = t.distY, o = n.targetInverseMatrix, s = n.prevMatrix, c = n.isWarp, l = n.startValue, u = n.poses, d = n.posIndexes, f = n.absolutePoses;
		if (!c) return !1;
		if (resolveTransformEvent(e, t, "matrix3d"), hasGuidelines(e, "warpable")) {
			var p = d.map(function(e) {
				return f[e];
			});
			p.length > 1 && p.push([(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]);
			var m = checkMoveableSnapBounds(e, r, {
				horizontal: p.map(function(e) {
					return e[1] + a;
				}),
				vertical: p.map(function(e) {
					return e[0] + i;
				})
			}), h = m.horizontal, g = m.vertical;
			a -= h.offset, i -= g.offset;
		}
		var _ = getDragDist({
			datas: n,
			distX: i,
			distY: a
		}, !0), v = n.nextPoses.slice();
		if (d.forEach(function(e) {
			v[e] = plus(v[e], _);
		}), !NEARBY_POS.every(function(e) {
			return isValidPos(e.map(function(e) {
				return u[e];
			}), e.map(function(e) {
				return v[e];
			}));
		})) return !1;
		var y = createWarpMatrix(u[0], u[2], u[1], u[3], v[0], v[2], v[1], v[3]);
		if (!y.length) return !1;
		var b = getTransfromMatrix(n, multiply(o, y, 4), !0), x = multiply(invert(s, 4), b, 4);
		n.prevMatrix = b;
		var S = multiply(l, b, 4), C = convertTransformFormat(n, `matrix3d(${S.join(", ")})`, `matrix3d(${b.join(", ")})`);
		return fillOriginalTransform(t, C), triggerEvent(e, "onWarp", fillParams(e, t, __assign({
			delta: x,
			matrix: S,
			dist: b,
			multiply,
			transform: C
		}, fillCSSObject({ transform: C }, t)))), !0;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.isDrag;
		return n.isWarp ? (n.isWarp = !1, triggerEvent(e, "onWarpEnd", fillEndParams(e, t, {})), r) : !1;
	}
}, AREA_PIECES = /* @__PURE__ */ prefix("area-pieces"), AREA_PIECE = /* @__PURE__ */ prefix("area-piece"), AVOID = /* @__PURE__ */ prefix("avoid"), VIEW_DRAGGING = prefix("view-dragging");
function restoreStyle(e) {
	var t = e.areaElement;
	if (t) {
		var n = e.state, r = n.width, i = n.height;
		removeClass(t, AVOID), t.style.cssText += `left: 0px; top: 0px; width: ${r}px; height: ${i}px`;
	}
}
function renderPieces(e) {
	return e.createElement("div", {
		key: "area_pieces",
		className: AREA_PIECES
	}, e.createElement("div", { className: AREA_PIECE }), e.createElement("div", { className: AREA_PIECE }), e.createElement("div", { className: AREA_PIECE }), e.createElement("div", { className: AREA_PIECE }));
}
var DragArea = {
	name: "dragArea",
	props: ["dragArea", "passDragArea"],
	events: ["click", "clickGroup"],
	render: function(e, t) {
		var n = e.props, r = n.target, i = n.dragArea, a = n.groupable, o = n.passDragArea, s = e.getState(), c = s.width, l = s.height, u = s.renderPoses, d = o ? prefix("area", "pass") : prefix("area");
		if (a) return [t.createElement("div", {
			key: "area",
			ref: ref(e, "areaElement"),
			className: d
		}), renderPieces(t)];
		if (!r || !i) return [];
		var f = createWarpMatrix([0, 0], [c, 0], [0, l], [c, l], u[0], u[1], u[2], u[3]), p = f.length ? makeMatrixCSS(f, !0) : "none";
		return [t.createElement("div", {
			key: "area",
			ref: ref(e, "areaElement"),
			className: d,
			style: {
				top: "0px",
				left: "0px",
				width: `${c}px`,
				height: `${l}px`,
				transformOrigin: "0 0",
				transform: p
			}
		}), renderPieces(t)];
	},
	dragStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY;
		if (!t.inputEvent) return !1;
		n.isDragArea = !1;
		var a = e.areaElement, o = e.state, s = o.moveableClientRect, c = o.renderPoses, l = o.rootMatrix, u = o.is3d, d = s.left, f = s.top, p = getRect(c), m = p.left, h = p.top, g = p.width, _ = p.height, v = u ? 4 : 3, y = __read(calculateInversePosition(l, [r - d, i - f], v), 2), b = y[0], x = y[1];
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
		}), addClass(a, AVOID), o.disableNativeEvent = !0;
	},
	drag: function(e, t) {
		var n = t.datas, r = t.inputEvent;
		if (this.enableNativeEvent(e), !r) return !1;
		n.isDragArea || (n.isDragArea = !0, restoreStyle(e));
	},
	dragEnd: function(e, t) {
		this.enableNativeEvent(e);
		var n = t.inputEvent, r = t.datas;
		if (!n) return !1;
		r.isDragArea || restoreStyle(e);
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
		restoreStyle(e), e.state.disableNativeEvent = !1;
	},
	enableNativeEvent: function(e) {
		var t = e.state;
		t.disableNativeEvent && requestAnimationFrame$1(function() {
			t.disableNativeEvent = !1;
		});
	}
}, Origin = makeAble("origin", {
	props: ["origin", "svgOrigin"],
	render: function(e, t) {
		var n = e.props, r = n.zoom, i = n.svgOrigin, a = n.groupable, o = e.getState(), s = o.beforeOrigin, c = o.rotation, l = o.svg, u = o.allMatrix, d = o.is3d, f = o.left, p = o.top, m = o.offsetWidth, h = o.offsetHeight, g;
		if (!a && l && i) {
			var _ = __read(convertTransformOriginArray(i, m, h), 2), v = _[0], y = _[1];
			g = getControlTransform(c, r, minus(calculatePosition(u, [v, y], d ? 4 : 3), [f, p]));
		} else g = getControlTransform(c, r, s);
		return [t.createElement("div", {
			className: prefix("control", "origin"),
			style: g,
			key: "beforeOrigin"
		})];
	}
});
function getDefaultScrollPosition(e) {
	var t = e.scrollContainer;
	return [t.scrollLeft, t.scrollTop];
}
var Scrollable = {
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
		var n = e.props, r = n.scrollContainer, i = r === void 0 ? e.getContainer() : r, a = n.scrollOptions, o = new dragscroll_esm_default(), s = getRefTarget(i, !0);
		t.datas.dragScroll = o, e.state.dragScroll = o;
		var c = t.isControl ? "controlGesto" : "targetGesto", l = t.targets;
		o.on("scroll", function(n) {
			var r = n.container, i = n.direction, a = fillParams(e, t, {
				scrollContainer: r,
				direction: i
			}), o = l ? "onScrollGroup" : "onScroll";
			l && (a.targets = l), triggerEvent(e, o, a);
		}).on("move", function(t) {
			var n = t.offsetX, r = t.offsetY, i = t.inputEvent;
			e[c].scrollBy(n, r, i.inputEvent, !1);
		}).on("scrollDrag", function(t) {
			var n = t.next;
			n(e[c].getCurrentEvent());
		}), o.dragStart(t, __assign({ container: s }, a));
	},
	checkScroll: function(e, t) {
		var n = t.datas.dragScroll;
		if (n) {
			var r = e.props, i = r.scrollContainer, a = i === void 0 ? e.getContainer() : i, o = r.scrollThreshold, s = o === void 0 ? 0 : o, c = r.scrollThrottleTime, l = c === void 0 ? 0 : c, u = r.getScrollPosition, d = u === void 0 ? getDefaultScrollPosition : u, f = r.scrollOptions;
			return n.drag(t, __assign({
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
		return this.dragStart(e, __assign(__assign({}, t), { isControl: !0 }));
	},
	dragControl: function(e, t) {
		return this.drag(e, t);
	},
	dragControlEnd: function(e, t) {
		return this.dragEnd(e, t);
	},
	dragGroupStart: function(e, t) {
		return this.dragStart(e, __assign(__assign({}, t), { targets: e.props.targets }));
	},
	dragGroup: function(e, t) {
		return this.drag(e, __assign(__assign({}, t), { targets: e.props.targets }));
	},
	dragGroupEnd: function(e, t) {
		return this.dragEnd(e, __assign(__assign({}, t), { targets: e.props.targets }));
	},
	dragGroupControlStart: function(e, t) {
		return this.dragStart(e, __assign(__assign({}, t), {
			targets: e.props.targets,
			isControl: !0
		}));
	},
	dragGroupControl: function(e, t) {
		return this.drag(e, __assign(__assign({}, t), { targets: e.props.targets }));
	},
	dragGroupControEnd: function(e, t) {
		return this.dragEnd(e, __assign(__assign({}, t), { targets: e.props.targets }));
	},
	unset: function(e) {
		var t, n = e.state;
		(t = n.dragScroll) == null || t.dragEnd(), n.dragScroll = null;
	}
}, Default = {
	name: "",
	props: /* @__PURE__ */ "target.dragTargetSelf.dragTarget.dragContainer.container.warpSelf.rootContainer.useResizeObserver.useMutationObserver.zoom.dragFocusedInput.transformOrigin.ables.className.pinchThreshold.pinchOutside.triggerAblesSimultaneously.checkInput.cspNonce.translateZ.hideDefaultLines.props.flushSync.stopPropagation.preventClickEventOnDrag.preventClickDefault.viewContainer.persistData.useAccuratePosition.firstRenderState.linePadding.controlPadding.preventDefault.preventRightClick.preventWheelClick.requestStyles".split("."),
	events: ["changeTargets"]
}, Padding = makeAble("padding", {
	props: ["padding"],
	render: function(e, t) {
		var n = e.props;
		if (n.dragArea) return [];
		var r = getPaddingBox(n.padding || {}), i = r.left, a = r.top, o = r.right, s = r.bottom, c = e.getState(), l = c.renderPoses, u = [
			c.pos1,
			c.pos2,
			c.pos3,
			c.pos4
		], d = [];
		return i > 0 && d.push([0, 2]), a > 0 && d.push([0, 1]), o > 0 && d.push([1, 3]), s > 0 && d.push([2, 3]), d.map(function(e, n) {
			var r = __read(e, 2), i = r[0], a = r[1], o = u[i], s = u[a], c = l[i], d = l[a], f = createWarpMatrix([0, 0], [100, 0], [0, 100], [100, 100], o, s, c, d);
			if (f.length) return t.createElement("div", {
				key: `padding${n}`,
				className: prefix("padding"),
				style: { transform: makeMatrixCSS(f, !0) }
			});
		});
	}
}), RADIUS_DIRECTIONS = [
	"nw",
	"ne",
	"se",
	"sw"
];
function calculateRatio(e, t) {
	var n = e[0] + e[1], r = n > t ? t / n : 1;
	return e[0] *= r, e[1] = t - e[1] * r, e;
}
var HORIZONTAL_RADIUS_ORDER = [
	1,
	2,
	5,
	6
], VERTICAL_RADIUS_ORDER = [
	0,
	3,
	4,
	7
], HORIZONTAL_RADIUS_DIRECTIONS = [
	1,
	-1,
	-1,
	1
], VERTICAL_RADIUS_DIRECTIONS = [
	1,
	1,
	-1,
	-1
];
function getRadiusStyles(e, t, n, r, i, a, o, s) {
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
				return c.push(convertCSSSize(p, r, t)), p;
			} else {
				var p = Math.max(0, u === 1 ? f[0] - i : o - f[0]);
				return c.push(convertCSSSize(p, n, t)), p;
			}
		})
	};
}
function getRadiusRange(e) {
	for (var t = [0, 0], n = [0, 0], r = e.length, i = 0; i < r; ++i) {
		var a = e[i];
		a.sub && (a.horizontal && (t[1] === 0 && (t[0] = i), t[1] = i - t[0] + 1, n[0] = i + 1), a.vertical && (n[1] === 0 && (n[0] = i), n[1] = i - n[0] + 1));
	}
	return {
		horizontalRange: t,
		verticalRange: n
	};
}
function getRadiusValues(e, t, n, r, i, a, o) {
	var s, c, l, u;
	a === void 0 && (a = [0, 0]), o === void 0 && (o = !1);
	var d = e.indexOf("/"), f = (d > -1 ? e.slice(0, d) : e).length, p = e.slice(0, f), m = e.slice(f + 1), h = p.length, g = m.length, _ = g > 0, v = __read(p, 4), y = v[0], b = y === void 0 ? "0px" : y, x = v[1], S = x === void 0 ? b : x, C = v[2], w = C === void 0 ? b : C, T = v[3], E = T === void 0 ? S : T, D = __read(m, 4), O = D[0], k = O === void 0 ? b : O, A = D[1], j = A === void 0 ? _ ? k : S : A, M = D[2], N = M === void 0 ? _ ? k : w : M, P = D[3], F = P === void 0 ? _ ? j : E : P, I = [
		b,
		S,
		w,
		E
	].map(function(e) {
		return convertUnitSize(e, t);
	}), L = [
		k,
		j,
		N,
		F
	].map(function(e) {
		return convertUnitSize(e, n);
	}), R = I.slice(), z = L.slice();
	s = __read(calculateRatio([R[0], R[1]], t), 2), R[0] = s[0], R[1] = s[1], c = __read(calculateRatio([R[3], R[2]], t), 2), R[3] = c[0], R[2] = c[1], l = __read(calculateRatio([z[0], z[3]], n), 2), z[0] = l[0], z[3] = l[1], u = __read(calculateRatio([z[1], z[2]], n), 2), z[1] = u[0], z[2] = u[1];
	var B = o ? R : R.slice(0, Math.max(a[0], h)), V = o ? z : z.slice(0, Math.max(a[1], g));
	return __spreadArray(__spreadArray([], __read(B.map(function(e, t) {
		var a = RADIUS_DIRECTIONS[t];
		return {
			virtual: t >= h,
			horizontal: HORIZONTAL_RADIUS_DIRECTIONS[t],
			vertical: 0,
			pos: [r + e, i + (VERTICAL_RADIUS_DIRECTIONS[t] === -1 ? n : 0)],
			sub: !0,
			raw: I[t],
			direction: a
		};
	})), !1), __read(V.map(function(e, n) {
		var a = RADIUS_DIRECTIONS[n];
		return {
			virtual: n >= g,
			horizontal: 0,
			vertical: VERTICAL_RADIUS_DIRECTIONS[n],
			pos: [r + (HORIZONTAL_RADIUS_DIRECTIONS[n] === -1 ? t : 0), i + e],
			sub: !0,
			raw: L[n],
			direction: a
		};
	})), !1);
}
function removeRadiusPos(e, t, n, r, i) {
	i === void 0 && (i = t.length);
	var a = getRadiusRange(e.slice(r)), o = a.horizontalRange, s = a.verticalRange, c = n - r, l = 0;
	if (c === 0) l = i;
	else if (c > 0 && c < o[1]) l = o[1] - c;
	else if (c >= s[0]) l = s[0] + s[1] - c;
	else return;
	e.splice(n, l), t.splice(n, l);
}
function addRadiusPos(e, t, n, r, i, a, o, s, c, l, u) {
	l === void 0 && (l = 0), u === void 0 && (u = 0);
	var d = getRadiusRange(e.slice(n)), f = d.horizontalRange, p = d.verticalRange;
	if (r > -1) for (var m = HORIZONTAL_RADIUS_DIRECTIONS[r] === 1 ? a - l : s - a, h = f[1]; h <= r; ++h) {
		var g = VERTICAL_RADIUS_DIRECTIONS[h] === 1 ? u : c, _ = 0;
		if (r === h ? _ = a : h === 0 ? _ = l + m : HORIZONTAL_RADIUS_DIRECTIONS[h] === -1 && (_ = s - (t[n][0] - l)), e.splice(n + h, 0, {
			horizontal: HORIZONTAL_RADIUS_DIRECTIONS[h],
			vertical: 0,
			pos: [_, g]
		}), t.splice(n + h, 0, [_, g]), h === 0) break;
	}
	else if (i > -1) {
		var v = VERTICAL_RADIUS_DIRECTIONS[i] === 1 ? o - u : c - o;
		if (f[1] === 0 && p[1] === 0) {
			var y = [l + v, u];
			e.push({
				horizontal: HORIZONTAL_RADIUS_DIRECTIONS[0],
				vertical: 0,
				pos: y
			}), t.push(y);
		}
		for (var b = p[0], h = p[1]; h <= i; ++h) {
			var _ = HORIZONTAL_RADIUS_DIRECTIONS[h] === 1 ? l : s, g = 0;
			if (i === h ? g = o : h === 0 ? g = u + v : VERTICAL_RADIUS_DIRECTIONS[h] === 1 ? g = t[n + b][1] : VERTICAL_RADIUS_DIRECTIONS[h] === -1 && (g = c - (t[n + b][1] - u)), e.push({
				horizontal: 0,
				vertical: VERTICAL_RADIUS_DIRECTIONS[h],
				pos: [_, g]
			}), t.push([_, g]), h === 0) break;
		}
	}
}
function splitRadiusPoses(e, t) {
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
var CLIP_DIRECTIONS = [[
	0,
	-1,
	"n"
], [
	1,
	0,
	"e"
]], CLIP_RECT_DIRECTIONS = [
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
function getClipStyles(e, t, n) {
	var r = e.props.clipRelative, i = e.state, a = i.width, o = i.height, s = t, c = s.type, l = s.poses, u = c === "rect", d = c === "circle";
	if (c === "polygon") return n.map(function(e) {
		return `${convertCSSSize(e[0], a, r)} ${convertCSSSize(e[1], o, r)}`;
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
			return convertCSSSize(e, t % 2 ? a : o, r);
		});
		if (n.length > 8) {
			var _ = __read(minus(n[4], n[0]), 2), v = _[0], y = _[1];
			g.push.apply(g, __spreadArray(["round"], __read(getRadiusStyles(l.slice(8).map(function(e, t) {
				return __assign(__assign({}, e), { pos: n[t] });
			}), r, v, y, m, f, p, h).styles), !1));
		}
		return g;
	} else if (d || c === "ellipse") {
		var b = n[0], x = convertCSSSize(abs(n[1][1] - b[1]), d ? Math.sqrt((a * a + o * o) / 2) : o, r), g = d ? [x] : [convertCSSSize(abs(n[2][0] - b[0]), a, r), x];
		return g.push("at", convertCSSSize(b[0], a, r), convertCSSSize(b[1], o, r)), g;
	}
}
function getRectPoses(e, t, n, r) {
	var i = [
		r,
		(r + t) / 2,
		t
	], a = [
		e,
		(e + n) / 2,
		n
	];
	return CLIP_RECT_DIRECTIONS.map(function(e) {
		var t = __read(e, 3), n = t[0], r = t[1], o = t[2], s = i[n + 1], c = a[r + 1];
		return {
			vertical: abs(r),
			horizontal: abs(n),
			direction: o,
			pos: [s, c]
		};
	});
}
function getControlSize(e) {
	var t = [Infinity, -Infinity], n = [Infinity, -Infinity];
	return e.forEach(function(e) {
		var r = e.pos;
		t[0] = Math.min(t[0], r[0]), t[1] = Math.max(t[1], r[0]), n[0] = Math.min(n[0], r[1]), n[1] = Math.max(n[1], r[1]);
	}), [abs(t[1] - t[0]), abs(n[1] - n[0])];
}
function getClipPath(e, t, n, r, i) {
	var a, o, s, c, l, u, d, f, p;
	if (e) {
		var m = i;
		if (!m) {
			var h = getCachedStyle(e), g = h("clipPath");
			m = g === "none" ? h("clip") : g;
		}
		if (!((!m || m === "none" || m === "auto") && (m = r, !m))) {
			var _ = splitBracket(m), v = _.prefix, y = v === void 0 ? m : v, b = _.value, x = b === void 0 ? "" : b, S = y === "circle", C = " ";
			if (y === "polygon") {
				var w = splitComma(x || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
				C = ",";
				var T = w.map(function(e) {
					var r = __read(e.split(" "), 2), i = r[0], a = r[1];
					return {
						vertical: 1,
						horizontal: 1,
						pos: [convertUnitSize(i, t), convertUnitSize(a, n)]
					};
				}), E = getMinMaxs(T.map(function(e) {
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
				var D = "", O = "", k = 0, A = 0, w = splitSpace(x);
				if (S) {
					var j = "";
					a = __read(w, 4), o = a[0], j = o === void 0 ? "50%" : o, s = a[2], D = s === void 0 ? "50%" : s, c = a[3], O = c === void 0 ? "50%" : c, k = convertUnitSize(j, Math.sqrt((t * t + n * n) / 2)), A = k;
				} else {
					var M = "", N = "";
					l = __read(w, 5), u = l[0], M = u === void 0 ? "50%" : u, d = l[1], N = d === void 0 ? "50%" : d, f = l[3], D = f === void 0 ? "50%" : f, p = l[4], O = p === void 0 ? "50%" : p, k = convertUnitSize(M, t), A = convertUnitSize(N, n);
				}
				var P = [convertUnitSize(D, t), convertUnitSize(O, n)], T = __spreadArray([{
					vertical: 1,
					horizontal: 1,
					pos: P,
					direction: "nesw"
				}], __read(CLIP_DIRECTIONS.slice(0, S ? 1 : 2).map(function(e) {
					return {
						vertical: abs(e[1]),
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
				var w = splitSpace(x || "0 0 0 0"), F = w.indexOf("round"), I = (F > -1 ? w.slice(0, F) : w).length, L = w.slice(I + 1), R = __read(w.slice(0, I), 4), z = R[0], B = R[1], V = B === void 0 ? z : B, H = R[2], U = H === void 0 ? z : H, W = R[3], G = W === void 0 ? V : W, K = __read([z, U].map(function(e) {
					return convertUnitSize(e, n);
				}), 2), q = K[0], J = K[1], Y = __read([G, V].map(function(e) {
					return convertUnitSize(e, t);
				}), 2), X = Y[0], Ll = Y[1], Rl = t - Ll, zl = n - J, Z = getRadiusValues(L, Rl - X, zl - q, X, q), T = __spreadArray(__spreadArray([], __read(getRectPoses(q, Rl, zl, X)), !1), __read(Z), !1);
				return {
					type: "inset",
					clipText: m,
					poses: T,
					top: q,
					left: X,
					right: Rl,
					bottom: zl,
					radius: L,
					splitter: C
				};
			} else if (y === "rect") {
				var w = splitComma(x || `0px, ${t}px, ${n}px, 0px`);
				C = ",";
				var Q = __read(w.map(function(e) {
					return splitUnit(e).value;
				}), 4), $ = Q[0], Ll = Q[1], J = Q[2], X = Q[3], T = getRectPoses($, Ll, J, X);
				return {
					type: "rect",
					clipText: m,
					poses: T,
					top: $,
					right: Ll,
					bottom: J,
					left: X,
					values: w,
					splitter: C
				};
			}
		}
	}
}
function moveControlPos(e, t, n, r, i) {
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
		var m = __read(getControlSize(e), 2), h = m[0], g = m[1], _ = h && g ? h / g : 0;
		if (_ && i) {
			var v = e[(t + 4) % 8].pos, y = [0, 0];
			o.indexOf("w") > -1 ? y[0] = -1 : o.indexOf("e") > -1 && (y[0] = 1), o.indexOf("n") > -1 ? y[1] = -1 : o.indexOf("s") > -1 && (y[1] = 1);
			var b = getSizeDistByDist([h, g], n, _, y, !0), x = h + b[0], S = g + b[1], C = v[1], w = v[1], T = v[0], E = v[0];
			y[0] === -1 ? T = E - x : y[0] === 1 ? E = T + x : (T -= x / 2, E += x / 2), y[1] === -1 ? C = w - S : (y[1] === 1 || (C = w - S / 2), w = C + S);
			var D = getRectPoses(C, E, w, T);
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
function addClipPath(e, t) {
	var n = __read(calculatePointerDist(e, t), 2), r = n[0], i = n[1], a = t.datas, o = a.clipPath, s = a.clipIndex, c = o, l = c.type, u = c.poses, d = c.splitter, f = u.map(function(e) {
		return e.pos;
	});
	if (l === "polygon") f.splice(s, 0, [r, i]);
	else if (l === "inset") {
		var p = HORIZONTAL_RADIUS_ORDER.indexOf(s), m = VERTICAL_RADIUS_ORDER.indexOf(s), h = u.length;
		if (addRadiusPos(u, f, 8, p, m, r, i, f[4][0], f[4][1], f[0][0], f[0][1]), h === u.length) return;
	} else return;
	var g = getClipStyles(e, o, f), _ = `${l}(${g.join(d)})`;
	triggerEvent(e, "onClip", fillParams(e, t, __assign({
		clipEventType: "added",
		clipType: l,
		poses: f,
		clipStyles: g,
		clipStyle: _,
		distX: 0,
		distY: 0
	}, fillCSSObject({ clipPath: _ }, t))));
}
function removeClipPath(e, t) {
	var n = t.datas, r = n.clipPath, i = n.clipIndex, a = r, o = a.type, s = a.poses, c = a.splitter, l = s.map(function(e) {
		return e.pos;
	}), u = l.length;
	if (o === "polygon") s.splice(i, 1), l.splice(i, 1);
	else if (o === "inset") {
		if (i < 8 || (removeRadiusPos(s, l, i, 8, u), u === s.length)) return;
	} else return;
	var d = getClipStyles(e, r, l), f = `${o}(${d.join(c)})`;
	triggerEvent(e, "onClip", fillParams(e, t, __assign({
		clipEventType: "removed",
		clipType: o,
		poses: l,
		clipStyles: d,
		clipStyle: f,
		distX: 0,
		distY: 0
	}, fillCSSObject({ clipPath: f }, t))));
}
var Clippable = {
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
		var C = getClipPath(l, u, d, i || "inset", b || r);
		if (!C) return [];
		var w = p ? 4 : 3, T = C.type, E = C.poses.map(function(e) {
			var t = calculatePosition(f, e.pos, w);
			return [t[0] - m, t[1] - h];
		}), D = [], O = [], k = T === "rect", A = T === "inset", j = T === "polygon";
		if (k || A || j) {
			var M = A ? E.slice(0, 8) : E;
			O = M.map(function(e, n) {
				var r = n === 0 ? M[M.length - 1] : M[n - 1], i = getRad$1(r, e), a = getDiagonalSize(r, e);
				return t.createElement("div", {
					key: `clipLine${n}`,
					className: prefix("line", "clip-line", "snap-control"),
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
				className: prefix("control", "clip-control", "snap-control"),
				"data-clip-index": n,
				style: { transform: `translate(${e[0]}px, ${e[1]}px) rotate(${S}rad) scale(${o})` }
			});
		}), A && D.push.apply(D, __spreadArray([], __read(E.slice(8).map(function(e, n) {
			return t.createElement("div", {
				key: `clipRadiusControl${n}`,
				className: prefix("control", "clip-control", "clip-radius", "snap-control"),
				"data-clip-index": 8 + n,
				style: { transform: `translate(${e[0]}px, ${e[1]}px) rotate(${S}rad) scale(${o})` }
			});
		})), !1)), T === "circle" || T === "ellipse") {
			var N = C.left, P = C.top, F = C.radiusX, I = C.radiusY, L = __read(minus(calculatePosition(f, [N, P], w), calculatePosition(f, [0, 0], w)), 2), R = L[0], z = L[1], B = "none";
			if (!a) {
				for (var V = Math.max(10, F / 5, I / 5), H = [], U = 0; U <= V; ++U) {
					var W = Math.PI * 2 / V * U;
					H.push([F + (F - o) * Math.cos(W), I + (I - o) * Math.sin(W)]);
				}
				H.push([F, -2]), H.push([-2, -2]), H.push([-2, I * 2 + 2]), H.push([F * 2 + 2, I * 2 + 2]), H.push([F * 2 + 2, -2]), H.push([F, -2]), B = `polygon(${H.map(function(e) {
					return `${e[0]}px ${e[1]}px`;
				}).join(", ")})`;
			}
			D.push(t.createElement("div", {
				key: "clipEllipse",
				className: prefix("clip-ellipse", "snap-control"),
				style: {
					width: `${F * 2}px`,
					height: `${I * 2}px`,
					clipPath: B,
					transform: `translate(${-m + R}px, ${-h + z}px) ${makeMatrixCSS(f)}`
				}
			}));
		}
		if (a) {
			var G = getRect(__spreadArray([
				g,
				_,
				v,
				y
			], __read(E), !1)), K = G.width, q = G.height, J = G.left, Y = G.top;
			if (j || k || A) {
				var H = A ? E.slice(0, 8) : E;
				D.push(t.createElement("div", {
					key: "clipArea",
					className: prefix("clip-area", "snap-control"),
					style: {
						width: `${K}px`,
						height: `${q}px`,
						transform: `translate(${J}px, ${Y}px)`,
						clipPath: `polygon(${H.map(function(e) {
							return `${e[0] - J}px ${e[1] - Y}px`;
						}).join(", ")})`
					}
				}));
			}
		}
		return x && ["vertical", "horizontal"].forEach(function(e) {
			var n = x[e], r = e === "horizontal";
			n.isSnap && O.push.apply(O, __spreadArray([], __read(n.snap.posInfos.map(function(n, i) {
				var a = n.pos;
				return renderLine(t, "", minus(calculatePosition(f, r ? [0, a] : [a, 0], w), [m, h]), minus(calculatePosition(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}snap${i}`, "guideline");
			})), !1)), n.isBound && O.push.apply(O, __spreadArray([], __read(n.bounds.map(function(n, i) {
				var a = n.pos;
				return renderLine(t, "", minus(calculatePosition(f, r ? [0, a] : [a, 0], w), [m, h]), minus(calculatePosition(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}bounds${i}`, "guideline", "bounds", "bold");
			})), !1));
		}), __spreadArray(__spreadArray([], __read(D), !1), __read(O), !1);
	},
	dragControlCondition: function(e, t) {
		return t.inputEvent && (t.inputEvent.target.getAttribute("class") || "").indexOf("clip") > -1;
	},
	dragStart: function(e, t) {
		var n = e.props.dragWithClip;
		return n === void 0 || n ? !1 : this.dragControlStart(e, t);
	},
	drag: function(e, t) {
		return this.dragControl(e, __assign(__assign({}, t), { isDragTarget: !0 }));
	},
	dragEnd: function(e, t) {
		return this.dragControlEnd(e, t);
	},
	dragControlStart: function(e, t) {
		var n = e.state, r = e.props, i = r.defaultClipPath, a = r.customClipPath, o = n.target, s = n.width, c = n.height, l = t.inputEvent ? t.inputEvent.target : null, u = l && l.getAttribute("class") || "", d = t.datas, f = getClipPath(o, s, c, i || "inset", a);
		if (!f) return !1;
		var p = f.clipText, m = f.type, h = f.poses;
		return triggerEvent(e, "onClipStart", fillParams(e, t, {
			clipType: m,
			clipStyle: p,
			poses: h.map(function(e) {
				return e.pos;
			})
		})) === !1 ? (d.isClipStart = !1, !1) : (d.isControl = u && u.indexOf("clip-control") > -1, d.isLine = u.indexOf("clip-line") > -1, d.isArea = u.indexOf("clip-area") > -1 || u.indexOf("clip-ellipse") > -1, d.clipIndex = l ? parseInt(l.getAttribute("data-clip-index"), 10) : -1, d.clipPath = f, d.isClipStart = !0, n.clipPathState = p, setDragStart(e, t), !0);
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.originalDatas, s = t.isDragTarget;
		if (!a.isClipStart) return !1;
		var c = a, l = c.isControl, u = c.isLine, d = c.isArea, f = c.clipIndex, p = c.clipPath;
		if (!p) return !1;
		var m = getProps(e.props, "clippable"), h = m.keepRatio, g = 0, _ = 0, v = o.draggable, y = getDragDist(t);
		s && v ? (n = __read(v.prevBeforeDist, 2), g = n[0], _ = n[1]) : (r = __read(y, 2), g = r[0], _ = r[1]);
		var b = [g, _], x = e.state, S = x.width, C = x.height, w = !d && !l && !u, T = p.type, E = p.poses, D = p.splitter, O = E.map(function(e) {
			return e.pos;
		});
		w && (g = -g, _ = -_);
		var k = !l || E[f].direction === "nesw", A = T === "inset" || T === "rect", j = E.map(function() {
			return [0, 0];
		});
		if (l && !k) {
			var M = E[f], N = M.horizontal, P = M.vertical;
			j = moveControlPos(E, f, [g * abs(N), _ * abs(P)], A, h);
		} else k && (j = O.map(function() {
			return [g, _];
		}));
		var F = O.map(function(e, t) {
			return plus(e, j[t]);
		}), I = __spreadArray([], __read(F), !1);
		x.snapBoundInfos = null;
		var L = p.type === "circle", R = p.type === "ellipse";
		if (L || R) {
			var z = getRect(F), B = abs(z.bottom - z.top), V = abs(R ? z.right - z.left : B), H = F[0][1] + B, U = F[0][0] - V, W = F[0][0] + V;
			L && (I.push([W, z.bottom]), j.push([1, 0])), I.push([z.left, H]), j.push([0, 1]), I.push([U, z.bottom]), j.push([1, 0]);
		}
		var G = getDefaultGuidelines((m.clipHorizontalGuidelines || []).map(function(e) {
			return convertUnitSize(`${e}`, C);
		}), (m.clipVerticalGuidelines || []).map(function(e) {
			return convertUnitSize(`${e}`, S);
		}), S, C), K = [], q = [];
		if (L || R) K = [I[4][0], I[2][0]], q = [I[1][1], I[3][1]];
		else if (A) {
			var J = [
				I[0],
				I[2],
				I[4],
				I[6]
			], Y = [
				j[0],
				j[2],
				j[4],
				j[6]
			];
			K = J.filter(function(e, t) {
				return Y[t][0];
			}).map(function(e) {
				return e[0];
			}), q = J.filter(function(e, t) {
				return Y[t][1];
			}).map(function(e) {
				return e[1];
			});
		} else K = I.filter(function(e, t) {
			return j[t][0];
		}).map(function(e) {
			return e[0];
		}), q = I.filter(function(e, t) {
			return j[t][1];
		}).map(function(e) {
			return e[1];
		});
		var X = [0, 0], Ll = checkSnapBounds(G, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, K, q, 5, 5), Rl = Ll.horizontal, zl = Ll.vertical, Z = Rl.offset, Q = zl.offset;
		if (Rl.isBound && (X[1] += Z), zl.isBound && (X[0] += Q), (R || L) && j[0][0] === 0 && j[0][1] === 0) {
			var z = getRect(F), $ = z.bottom - z.top, Bl = R ? z.right - z.left : $, Vl = zl.isBound ? abs(Q) : zl.snapIndex === 0 ? -Q : Q, Hl = Rl.isBound ? abs(Z) : Rl.snapIndex === 0 ? -Z : Z;
			Bl -= Vl, $ -= Hl, L && ($ = checkSnapBoundPriority(zl, Rl) > 0 ? $ : Bl, Bl = $);
			var Ul = I[0];
			I[1][1] = Ul[1] - $, I[2][0] = Ul[0] + Bl, I[3][1] = Ul[1] + $, I[4][0] = Ul[0] - Bl;
		} else if (A && h && l) {
			var Wl = __read(getControlSize(E), 2), Gl = Wl[0], Kl = Wl[1], ql = Gl && Kl ? Gl / Kl : 0, Jl = E[f].direction || "", Yl = I[1][1], H = I[5][1], U = I[7][0], W = I[3][0];
			abs(Z) <= abs(Q) ? Z = sign(Z) * abs(Q) / ql : Q = sign(Q) * abs(Z) * ql, Jl.indexOf("w") > -1 ? U -= Q : Jl.indexOf("e") > -1 ? W -= Q : (U += Q / 2, W -= Q / 2), Jl.indexOf("n") > -1 ? Yl -= Z : Jl.indexOf("s") > -1 ? H -= Z : (Yl += Z / 2, H -= Z / 2);
			var Xl = getRectPoses(Yl, W, H, U);
			I.forEach(function(e, t) {
				var n = __read(Xl[t].pos, 2);
				e[0] = n[0], e[1] = n[1];
			});
		} else I.forEach(function(e, t) {
			var n = j[t];
			n[0] && (e[0] -= Q), n[1] && (e[1] -= Z);
		});
		var Zl = getClipStyles(e, p, F), Ql = `${T}(${Zl.join(D)})`;
		if (x.clipPathState = Ql, L || R) K = [I[4][0], I[2][0]], q = [I[1][1], I[3][1]];
		else if (A) {
			var J = [
				I[0],
				I[2],
				I[4],
				I[6]
			];
			K = J.map(function(e) {
				return e[0];
			}), q = J.map(function(e) {
				return e[1];
			});
		} else K = I.map(function(e) {
			return e[0];
		}), q = I.map(function(e) {
			return e[1];
		});
		if (x.snapBoundInfos = checkSnapBounds(G, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, K, q, 1, 1), v) {
			var $l = x.is3d, eu = x.allMatrix, tu = $l ? 4 : 3, nu = X;
			s && (nu = [b[0] + X[0] - y[0], b[1] + X[1] - y[1]]), v.deltaOffset = multiply(eu, [
				nu[0],
				nu[1],
				0,
				0
			], tu);
		}
		return triggerEvent(e, "onClip", fillParams(e, t, __assign({
			clipEventType: "changed",
			clipType: T,
			poses: F,
			clipStyle: Ql,
			clipStyles: Zl,
			distX: g,
			distY: _
		}, fillCSSObject((i = {}, i[T === "rect" ? "clip" : "clipPath"] = Ql, i), t)))), !0;
	},
	dragControlEnd: function(e, t) {
		this.unset(e);
		var n = t.isDrag, r = t.datas, i = t.isDouble, a = r.isLine, o = r.isClipStart, s = r.isControl;
		return o ? (triggerEvent(e, "onClipEnd", fillEndParams(e, t, {})), i && (s ? removeClipPath(e, t) : a && addClipPath(e, t)), i || n) : !1;
	},
	unset: function(e) {
		e.state.clipPathState = "", e.state.snapBoundInfos = null;
	}
}, OriginDraggable = {
	name: "originDraggable",
	props: ["originDraggable", "originRelative"],
	events: [
		"dragOriginStart",
		"dragOrigin",
		"dragOriginEnd"
	],
	css: [":host[data-able-origindraggable] .control.origin {\npointer-events: auto;\n}"],
	dragControlCondition: function(e, t) {
		return t.isRequest ? t.requestAble === "originDraggable" : hasClass(t.inputEvent.target, prefix("origin"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas;
		setDragStart(e, t);
		var r = fillParams(e, t, { dragStart: Draggable.dragStart(e, new CustomGesto().dragStart([0, 0], t)) }), i = triggerEvent(e, "onDragOriginStart", r);
		return n.startOrigin = e.state.transformOrigin, n.startTargetOrigin = e.state.targetOrigin, n.prevOrigin = [0, 0], n.isDragOrigin = !0, i === !1 ? (n.isDragOrigin = !1, !1) : r;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.isRequest;
		if (!n.isDragOrigin) return !1;
		var a = __read(getDragDist(t), 2), o = a[0], s = a[1], c = e.state, l = c.width, u = c.height, d = c.offsetMatrix, f = c.targetMatrix, p = c.is3d, m = e.props.originRelative, h = m === void 0 ? !0 : m, g = p ? 4 : 3, _ = [o, s];
		if (i) {
			var v = t.distOrigin;
			(v[0] || v[1]) && (_ = v);
		}
		var y = plus(n.startOrigin, _), b = plus(n.startTargetOrigin, _), x = minus(_, n.prevOrigin), S = getNextMatrix(d, f, y, g), C = e.getRect(), w = getRect(calculatePoses(S, l, u, g)), T = [C.left - w.left, C.top - w.top];
		n.prevOrigin = _;
		var E = [convertCSSSize(b[0], l, h), convertCSSSize(b[1], u, h)].join(" "), D = Draggable.drag(e, setCustomDrag(t, e.state, T, !!r, !1)), O = fillParams(e, t, __assign(__assign({
			width: l,
			height: u,
			origin: y,
			dist: _,
			delta: x,
			transformOrigin: E,
			drag: D
		}, fillCSSObject({
			transformOrigin: E,
			transform: D.transform
		}, t)), { afterTransform: D.transform }));
		return triggerEvent(e, "onDragOrigin", O), O;
	},
	dragControlEnd: function(e, t) {
		return t.datas.isDragOrigin ? (triggerEvent(e, "onDragOriginEnd", fillEndParams(e, t, {})), !0) : !1;
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
function addBorderRadiusByLine(e, t, n, r) {
	var i = e.filter(function(e) {
		var t = e.virtual;
		return e.horizontal && !t;
	}).length, a = e.filter(function(e) {
		var t = e.virtual;
		return e.vertical && !t;
	}).length, o = -1;
	if (t === 0 && (i === 0 ? o = 0 : i === 1 && (o = 1)), t === 2 && (i <= 2 ? o = 2 : i <= 3 && (o = 3)), t === 3 && (a === 0 ? o = 4 : a < 4 && (o = 7)), t === 1 && (a <= 1 ? o = 5 : a <= 2 && (o = 6)), !(o === -1 || !e[o].virtual)) {
		var s = e[o];
		addBorderRadius(e, o), o < 4 ? s.pos[0] = n : s.pos[1] = r;
	}
}
function addBorderRadius(e, t) {
	t < 4 ? e.slice(0, t + 1).forEach(function(e) {
		e.virtual = !1;
	}) : (e[0].virtual && (e[0].virtual = !1), e.slice(4, t + 1).forEach(function(e) {
		e.virtual = !1;
	}));
}
function removeBorderRadius(e, t) {
	t < 4 ? e.slice(t, 4).forEach(function(e) {
		e.virtual = !0;
	}) : e.slice(t).forEach(function(e) {
		e.virtual = !0;
	});
}
function getBorderRadius(e, t, n, r, i) {
	r === void 0 && (r = [0, 0]);
	var a = [];
	return a = !e || e === "0px" ? [] : splitSpace(e), getRadiusValues(a, t, n, 0, 0, r, i);
}
function triggerRoundEvent(e, t, n, r, i) {
	var a = e.state, o = a.width, s = a.height, c = getRadiusStyles(i, e.props.roundRelative, o, s), l = c.raws, u = c.styles, d = c.radiusPoses, f = splitRadiusPoses(d, l), p = f.horizontals, m = f.verticals, h = u.join(" ");
	a.borderRadiusState = h;
	var g = fillParams(e, t, __assign({
		horizontals: p,
		verticals: m,
		borderRadius: h,
		width: o,
		height: s,
		delta: r,
		dist: n
	}, fillCSSObject({ borderRadius: h }, t)));
	return triggerEvent(e, "onRound", g), g;
}
function getStyleBorderRadius(e) {
	var t = e.getState().style, n = t.borderRadius || "";
	if (!n && e.props.groupable) {
		var r = e.moveables[0], i = e.getTargets()[0];
		i && (r?.props.target === i ? (n = e.moveables[0]?.state.style.borderRadius ?? "", t.borderRadius = n) : (n = getComputedStyle$1(i).borderRadius, t.borderRadius = n));
	}
	return n;
}
var Roundable = {
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
		return t === !0 || t === "line" ? prefix("round-line-clickable") : "";
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
		var x = u || getStyleBorderRadius(e), S = s ? 4 : 3, C = getBorderRadius(x, i, a, p, !0);
		if (!C) return null;
		var w = 0, T = 0, E = b ? [0, 0] : [c, l];
		return C.map(function(e, n) {
			var r = e.horizontal, i = e.vertical, a = e.direction || "", s = __spreadArray([], __read(e.pos), !1);
			T += Math.abs(r), w += Math.abs(i), r && a.indexOf("n") > -1 && (s[1] -= v), i && a.indexOf("w") > -1 && (s[0] -= v), r && a.indexOf("s") > -1 && (s[1] += v), i && a.indexOf("e") > -1 && (s[0] += v);
			var c = minus(calculatePosition(o, s, S), E), l = y && y !== "horizontal", u = e.vertical ? w <= h[1] && (l || !e.virtual) : T <= h[0] && (y || !e.virtual);
			return t.createElement("div", {
				key: `borderRadiusControl${n}`,
				className: prefix("control", "border-radius", e.vertical ? "vertical" : "", e.virtual ? "virtual" : ""),
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
		var d = fillParams(e, t, {});
		if (triggerEvent(e, "onRoundStart", d) === !1) return !1;
		r.lineIndex = l, r.controlIndex = c, r.isControl = o, r.isLine = s, setDragStart(e, t);
		var f = e.props, p = f.roundRelative, m = f.minRoundControls, h = m === void 0 ? [0, 0] : m, g = e.state, _ = g.width, v = g.height;
		r.isRound = !0, r.prevDist = [0, 0];
		var y = getBorderRadius(getStyleBorderRadius(e) || "", _, v, h, !0) || [];
		return r.controlPoses = y, g.borderRadiusState = getRadiusStyles(y, p, _, v).styles.join(" "), d;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = n.controlPoses;
		if (!n.isRound || !n.isControl || !r.length) return !1;
		var i = n.controlIndex, a = __read(getDragDist(t), 2), o = a[0], s = a[1], c = [o, s], l = minus(c, n.prevDist), u = e.props.maxRoundControls, d = u === void 0 ? [4, 4] : u, f = e.state, p = f.width, m = f.height, h = r[i], g = h.vertical, _ = h.horizontal, v = r.map(function(e) {
			var t = e.horizontal, n = e.vertical, r = [t * _ * c[0], n * g * c[1]];
			if (t) {
				if (d[0] === 1 || d[0] < 4 && t !== _) return r;
			} else if (d[1] === 0) return r[1] = n * _ * c[0] / p * m, r;
			else if (g && (d[1] === 1 || d[1] < 4 && n !== g)) return r;
			return [0, 0];
		});
		v[i] = c;
		var y = r.map(function(e, t) {
			return __assign(__assign({}, e), { pos: plus(e.pos, v[t]) });
		});
		return i < 4 ? y.slice(0, i + 1).forEach(function(e) {
			e.virtual = !1;
		}) : y.slice(4, i + 1).forEach(function(e) {
			e.virtual = !1;
		}), n.prevDist = [o, s], triggerRoundEvent(e, t, c, l, y);
	},
	dragControlEnd: function(e, t) {
		var n = e.state;
		n.borderRadiusState = "";
		var r = t.datas, i = t.isDouble;
		if (!r.isRound) return !1;
		var a = r.isControl, o = r.controlIndex, s = r.isLine, c = r.lineIndex, l = r.controlPoses, u = l.filter(function(e) {
			return e.virtual;
		}).length, d = e.props.roundClickable, f = d === void 0 ? !0 : d;
		if (i && f) {
			if (a && (f === !0 || f === "control")) removeBorderRadius(l, o);
			else if (s && (f === !0 || f === "line")) {
				var p = __read(calculatePointerDist(e, t), 2), m = p[0], h = p[1];
				addBorderRadiusByLine(l, c, m, h);
			}
			u !== l.filter(function(e) {
				return e.virtual;
			}).length && triggerRoundEvent(e, t, [0, 0], [0, 0], l);
		}
		var g = fillEndParams(e, t, {});
		return triggerEvent(e, "onRoundEnd", g), n.borderRadiusState = "", g;
	},
	dragGroupControlStart: function(e, t) {
		var n = this.dragControlStart(e, t);
		if (!n) return !1;
		var r = e.moveables, i = e.props.targets, a = fillChildEvents(e, "roundable", t);
		return triggerEvent(e, "onRoundGroupStart", __assign({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return __assign(__assign({}, e), {
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
		var r = e.moveables, i = e.props.targets, a = fillChildEvents(e, "roundable", t), o = __assign({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return __assign(__assign(__assign({}, e), {
					target: i[t],
					moveable: r[t],
					currentTarget: r[t]
				}), fillCSSObject({ borderRadius: n.borderRadius }, e));
			})
		}, n);
		return triggerEvent(e, "onRoundGroup", o), o;
	},
	dragGroupControlEnd: function(e, t) {
		var n = e.moveables, r = e.props.targets, i = fillChildEvents(e, "roundable", t);
		catchEvent(e, "onRound", function(t) {
			triggerEvent(e, "onRoundGroup", __assign({
				targets: e.props.targets,
				events: i.map(function(e, i) {
					return __assign(__assign(__assign({}, e), {
						target: r[i],
						moveable: n[i],
						currentTarget: n[i]
					}), fillCSSObject({ borderRadius: t.borderRadius }, e));
				})
			}, t));
		});
		var a = this.dragControlEnd(e, t);
		if (!a) return !1;
		var o = __assign({
			targets: e.props.targets,
			events: i.map(function(e, t) {
				return __assign(__assign({}, e), {
					target: r[t],
					moveable: n[t],
					currentTarget: n[t],
					lastEvent: e.datas?.lastEvent
				});
			})
		}, a);
		return triggerEvent(e, "onRoundGroupEnd", o), o;
	},
	unset: function(e) {
		e.state.borderRadiusState = "";
	}
};
function isIdentityMatrix(e, t) {
	var n = createIdentityMatrix(t ? 4 : 3);
	return e === `matrix${t ? "3d" : ""}(${n.join(",")})` || e === "matrix(1,0,0,1,0,0)";
}
var BeforeRenderable = {
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
		var n = e.state, r = n.is3d, i = n.targetMatrix, a = n.inlineTransform, o = r ? `matrix3d(${i.join(",")})` : `matrix(${convertMatrixtoCSS(i, !0)})`, s = !a || a === "none" ? o : a;
		t.datas.startTransforms = isIdentityMatrix(s, r) ? [] : splitSpace(s);
	},
	resetStyle: function(e) {
		var t = e.datas;
		t.nextStyle = {}, t.nextTransforms = e.datas.startTransforms, t.nextTransformAppendedIndexes = [];
	},
	fillDragStartParams: function(e, t) {
		return fillParams(e, t, {
			setTransform: function(e) {
				t.datas.startTransforms = isArray(e) ? e : splitSpace(e);
			},
			isPinch: !!t.isPinch
		});
	},
	fillDragParams: function(e, t) {
		return fillParams(e, t, { isPinch: !!t.isPinch });
	},
	dragStart: function(e, t) {
		this.setTransform(e, t), this.resetStyle(t), triggerEvent(e, "onBeforeRenderStart", this.fillDragStartParams(e, t));
	},
	drag: function(e, t) {
		t.datas.startTransforms || this.setTransform(e, t), this.resetStyle(t), triggerEvent(e, "onBeforeRender", fillParams(e, t, { isPinch: !!t.isPinch }));
	},
	dragEnd: function(e, t) {
		t.datas.startTransforms || (this.setTransform(e, t), this.resetStyle(t)), triggerEvent(e, "onBeforeRenderEnd", fillParams(e, t, {
			isPinch: !!t.isPinch,
			isDrag: t.isDrag
		}));
	},
	dragGroupStart: function(e, t) {
		var n = this;
		this.dragStart(e, t);
		var r = fillChildEvents(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.setTransform(r, e), n.resetStyle(e), n.fillDragStartParams(r, e);
		});
		triggerEvent(e, "onBeforeRenderGroupStart", fillParams(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			setTransform: function() {},
			events: a
		}));
	},
	dragGroup: function(e, t) {
		var n = this;
		this.drag(e, t);
		var r = fillChildEvents(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.resetStyle(e), n.fillDragParams(r, e);
		});
		triggerEvent(e, "onBeforeRenderGroup", fillParams(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			events: a
		}));
	},
	dragGroupEnd: function(e, t) {
		this.dragEnd(e, t), triggerEvent(e, "onBeforeRenderGroupEnd", fillParams(e, t, {
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
}, Renderable = {
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
		triggerEvent(e, "onRenderStart", fillParams(e, t, { isPinch: !!t.isPinch }));
	},
	drag: function(e, t) {
		triggerEvent(e, "onRender", this.fillDragParams(e, t));
	},
	dragAfter: function(e, t) {
		return this.drag(e, t);
	},
	dragEnd: function(e, t) {
		triggerEvent(e, "onRenderEnd", this.fillDragEndParams(e, t));
	},
	dragGroupStart: function(e, t) {
		triggerEvent(e, "onRenderGroupStart", fillParams(e, t, {
			isPinch: !!t.isPinch,
			targets: e.props.targets
		}));
	},
	dragGroup: function(e, t) {
		var n = this, r = fillChildEvents(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragParams(r, e);
		});
		triggerEvent(e, "onRenderGroup", fillParams(e, t, __assign(__assign({
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			transform: getNextTransformText(t),
			transformObject: {}
		}, fillCSSObject(getNextStyle(t))), { events: a })));
	},
	dragGroupEnd: function(e, t) {
		var n = this, r = fillChildEvents(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragEndParams(r, e);
		});
		triggerEvent(e, "onRenderGroupEnd", fillParams(e, t, __assign({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			targets: e.props.targets,
			events: a,
			transformObject: {},
			transform: getNextTransformText(t)
		}, fillCSSObject(getNextStyle(t)))));
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
		return parse(getNextTransforms(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), fillParams(e, t, __assign({
			isPinch: !!t.isPinch,
			transformObject: n,
			transform: getNextTransformText(t)
		}, fillCSSObject(getNextStyle(t))));
	},
	fillDragEndParams: function(e, t) {
		var n = {};
		return parse(getNextTransforms(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), fillParams(e, t, __assign({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			transformObject: n,
			transform: getNextTransformText(t)
		}, fillCSSObject(getNextStyle(t))));
	}
};
function triggerAble(e, t, n, r, i, a, o) {
	a.clientDistX = a.distX, a.clientDistY = a.distY;
	var s = i === "Start", c = i === "End", l = i === "After", u = e.state.target, d = a.isRequest, f = r.indexOf("Control") > -1;
	if (!u || s && f && !d && e.areaElement === a.inputEvent.target) return !1;
	var p = __spreadArray([], __read(t), !1);
	if (d) {
		var m = a.requestAble;
		p.some(function(e) {
			return e.name === m;
		}) || p.push.apply(p, __spreadArray([], __read(e.props.ables.filter(function(e) {
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
		var c = t[n](e, __assign(__assign({}, a), {
			stop: v,
			datas: o,
			originalDatas: b,
			inputTarget: g
		}));
		return e._emitter.off(), s && c === !1 && (o.isEventStart = !1), c;
	};
	y && p.forEach(function(t) {
		t.unset && t.unset(e);
	}), C(BeforeRenderable, `drag${r}${i}`);
	var w = 0, T = 0;
	n.forEach(function(t) {
		if (_) return !1;
		var n = `${t}${r}${i}`, o = `${t}${r}Condition`;
		i === "" && !d && convertDragDist(e.state, a);
		var c = p.filter(function(e) {
			return e[n];
		});
		c = c.filter(function(e, t) {
			return e.name && c.indexOf(e) === t;
		});
		var l = c.filter(function(e) {
			return C(e, n, o);
		}).length;
		_ && ++w, l && ++T, !_ && s && c.length && !l && (w += c.filter(function(e) {
			return b[e.name].isEventStart ? e.dragRelation !== "strong" : !1;
		}).length ? 1 : 0);
	}), (!l || T) && C(Renderable, `drag${r}${i}`);
	var E = S !== e[x] || w === n.length;
	return (c || _ || E) && (e.state.gestos = {}, e.moveables && e.moveables.forEach(function(e) {
		e.state.gestos = {};
	}), p.forEach(function(t) {
		t.unset && t.unset(e);
	})), s && !E && !d && T && e.props.preventDefault && a?.preventDefault(), e.isUnmounted || E ? !1 : ((!s && T && !o || c) && (e.props.flushSync || defaultSync)(function() {
		e.updateRect(c ? i : "", !0, !1), e.forceUpdate();
	}), !s && !c && !l && T && !o && triggerAble(e, t, n, r, i + "After", a), !0);
}
function checkMoveableTarget(e, t) {
	return function(n, r) {
		r === void 0 && (r = n.inputEvent.target);
		var i = r, a = e.areaElement, o = e._dragTarget;
		return !o || !t && e.controlGesto?.isFlag() ? !1 : i === o || o.contains(i) || i === a || !e.isMoveableElement(i) && !e.controlBox.contains(i) || hasClass(i, "moveable-area") || hasClass(i, "moveable-padding") || hasClass(i, "moveable-edgeDraggable");
	};
}
function getTargetAbleGesto(e, t, n) {
	var r = e.controlBox, i = [], a = e.props, o = a.dragArea, s = e.state.target, c = a.dragTarget;
	i.push(r), (!o || c) && i.push(t), !o && c && s && t !== s && a.dragTargetSelf && i.push(s);
	var l = checkMoveableTarget(e);
	return getAbleGesto(e, i, "targetAbles", n, {
		dragStart: l,
		pinchStart: l
	});
}
function getControlAbleGesto(e, t) {
	var n = e.controlBox, r = [];
	r.push(n);
	var i = checkMoveableTarget(e, !0), a = function(e, t) {
		return t === void 0 && (t = e.inputEvent.target), t === n ? !0 : !i(e, t);
	};
	return getAbleGesto(e, r, "controlAbles", t, {
		dragStart: a,
		pinchStart: a
	});
}
function getAbleGesto(e, t, n, r, i) {
	i === void 0 && (i = {});
	var a = n === "targetAbles", o = e.props, s = o.pinchOutside, c = o.pinchThreshold, l = o.preventClickEventOnDrag, u = o.preventClickDefault, d = o.checkInput, f = o.dragFocusedInput, p = o.preventDefault, m = p === void 0 ? !0 : p, h = o.preventRightClick, g = h === void 0 ? !0 : h, _ = o.preventWheelClick, v = _ === void 0 ? !0 : _, y = o.dragContainer, b = new Gesto(t, {
		preventDefault: m,
		preventRightClick: g,
		preventWheelClick: v,
		container: getRefTarget(y, !0) || getWindow(e.getControlBoxElement()),
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
					triggerAble(e, __spreadArray([], __read(e[n]), !1), u, r, a, o) ? (e.props.stopPropagation || a === "Start" && x) && ((s = o?.inputEvent) == null || s.stopPropagation()) : o.stop();
				}
			});
		});
	}), b;
}
var EventManager = /* @__PURE__ */ function() {
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
function calculateMatrixStack(e, t, n, r) {
	n === void 0 && (n = t);
	var i = getMatrixStackInfo(e, t), a = i.matrixes, o = i.is3d, s = i.targetMatrix, c = i.transformOrigin, l = i.targetOrigin, u = i.offsetContainer, d = i.hasFixed, f = i.zoom, p = getCachedMatrixContainerInfo(u, n), m = p.matrixes, h = p.is3d, g = p.offsetContainer, _ = p.zoom, v = r || h || o, y = v ? 4 : 3, b = e.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in e, x = s, S = createIdentityMatrix(y), C = createIdentityMatrix(y), w = createIdentityMatrix(y), T = createIdentityMatrix(y), E = a.length, D = m.map(function(e) {
		return __assign(__assign({}, e), { matrix: e.matrix ? __spreadArray([], __read(e.matrix), !1) : void 0 });
	}).reverse();
	a.reverse(), !o && v && (x = convertDimension(x, 3, 4), convert3DMatrixes(a)), !h && v && convert3DMatrixes(D), D.forEach(function(e) {
		C = multiply(C, e.matrix, y);
	});
	var O = n || getDocumentBody(e), k = D[0]?.target || getOffsetInfo(O, O, !0).offsetParent, A = D.slice(1).reduce(function(e, t) {
		return multiply(e, t.matrix, y);
	}, createIdentityMatrix(y));
	a.forEach(function(e, t) {
		if (E - 2 === t && (w = S.slice()), E - 1 === t && (T = S.slice()), !e.matrix) {
			var n = a[t + 1];
			e.matrix = createOriginMatrix(getSVGOffset(e, n, k, y, multiply(A, S, y)), y);
		}
		S = multiply(S, e.matrix, y);
	});
	var j = !b && o;
	x ||= createIdentityMatrix(j ? 4 : 3);
	var M = makeMatrixCSS(b && x.length === 16 ? convertDimension(x, 4, 3) : x, j), N = C;
	return C = ignoreDimension(C, y, y), {
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
function calculateElementInfo(e, t, n, r) {
	n === void 0 && (n = t);
	var i = 0, a = 0, o = 0, s = {}, c = getSize(e);
	if (e && (i = c.offsetWidth, a = c.offsetHeight), e) {
		var l = calculateMatrixStack(e, t, n, r), u = calculateElementPosition(l.allMatrix, l.transformOrigin, i, a);
		s = __assign(__assign({}, l), u);
		var d = calculateElementPosition(l.allMatrix, [50, 50], 100, 100);
		o = getRotationRad([d.pos1, d.pos2], d.direction);
	}
	var f = r ? 4 : 3;
	return __assign(__assign(__assign({
		hasZoom: !1,
		width: i,
		height: a,
		rotation: o
	}, c), {
		originalRootMatrix: createIdentityMatrix(f),
		rootMatrix: createIdentityMatrix(f),
		beforeMatrix: createIdentityMatrix(f),
		offsetMatrix: createIdentityMatrix(f),
		allMatrix: createIdentityMatrix(f),
		targetMatrix: createIdentityMatrix(f),
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
function getMoveableTargetInfo(e, t, n, r, i, a) {
	a === void 0 && (a = []);
	var o = 1, s = [0, 0], c = resetClientRect(), l = resetClientRect(), u = resetClientRect(), d = resetClientRect(), f = [0, 0], p = {}, m = calculateElementInfo(t, n, i, !0);
	if (t) {
		var h = getCachedStyle(t);
		a.forEach(function(e) {
			p[e] = h(e);
		});
		var g = m.is3d ? 4 : 3, _ = calculateElementPosition(m.offsetMatrix, plus(m.transformOrigin, getOrigin(m.targetMatrix, g)), m.width, m.height);
		o = _.direction, s = plus(_.origin, [_.left - m.left, _.top - m.top]), d = getClientRect(m.offsetRootContainer);
		var v = getOffsetInfo(r, r, !0).offsetParent || m.offsetRootContainer;
		if (m.hasZoom) {
			var y = calculateElementPosition(multiply(m.originalRootMatrix, m.allMatrix), m.transformOrigin, m.width, m.height), b = calculateElementPosition(m.originalRootMatrix, getTransformOriginArray(getCachedStyle(v)("transformOrigin")).map(function(e) {
				return parseFloat(e);
			}), v.offsetWidth, v.offsetHeight);
			if (c = getClientRectByPosition(y, d), u = getClientRectByPosition(b, d, v, !0), e) {
				var x = y.left, S = y.top;
				l = getClientRectByPosition({
					left: x,
					top: S,
					bottom: S,
					right: S
				}, d);
			}
		} else {
			c = getClientRect(t), u = getCachedClientRect(v), e && (l = getClientRect(e));
			var C = u.left, w = u.top, T = u.clientLeft, E = u.clientTop, D = [c.left - C, c.top - w];
			f = minus(calculateInversePosition(m.rootMatrix, D, 4), [T + m.left, E + m.top]);
		}
	}
	return __assign({
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
function getPersistState(e) {
	var t = e.pos1, n = e.pos2, r = e.pos3, i = e.pos4;
	if (!t || !n || !r || !i) return null;
	var a = getMinMaxs([
		t,
		n,
		r,
		i
	]), o = [a.minX, a.minY], s = minus(e.origin, o);
	return t = minus(t, o), n = minus(n, o), r = minus(r, o), i = minus(i, o), __assign(__assign({}, e), {
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
var MoveableManager = /* @__PURE__ */ function(e) {
	__extends(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.state = __assign({
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
		}, getMoveableTargetInfo(null)), t.renderState = {}, t.enabledAbles = [], t.targetAbles = [], t.controlAbles = [], t.rotation = 0, t.scale = [1, 1], t.isMoveableMounted = !1, t.isUnmounted = !1, t.events = {
			mouseEnter: null,
			mouseLeave: null
		}, t._emitter = new event_emitter_esm_default(), t._prevOriginalDragTarget = null, t._originalDragTarget = null, t._prevDragTarget = null, t._dragTarget = null, t._prevPropTarget = null, t._propTarget = null, t._prevDragArea = !1, t._isPropTargetChanged = !1, t._hasFirstTarget = !1, t._reiszeObserver = null, t._observerId = 0, t._mutationObserver = null, t._rootContainer = null, t._viewContainer = null, t._viewClassNames = [], t._store = {}, t.checkUpdateRect = function() {
			if (!t.isDragging()) {
				var e = t.props.parentMoveable;
				if (e) {
					e.checkUpdateRect();
					return;
				}
				cancelAnimationFrame(t._observerId), t._observerId = requestAnimationFrame$1(function() {
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
		var f = __read(n || [0, 0], 2), p = f[0], m = f[1], h = t.left, g = t.top, _ = t.target, v = t.direction, y = t.hasFixed, b = t.offsetDelta, x = e.targets, S = this.isDragging(), w = {};
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
		return u && (k["--moveable-line-padding"] = u), d && (k["--moveable-control-padding"] = d), import_react.createElement(c, __assign({
			cspNonce: o,
			ref: ref(this, "controlBox"),
			className: `${prefix("control-box", v === -1 ? "reverse" : "", S ? "dragging" : "")} ${T} ${r}`
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
		this.isMoveableMounted = !1, this.isUnmounted = !0, this._emitter.off(), (e = this._reiszeObserver) == null || e.disconnect(), (t = this._mutationObserver) == null || t.disconnect(), this._viewContainer && this._changeAbleViewClassNames([]), unsetGesto(this, !1), unsetGesto(this, !0);
		var n = this.events;
		for (var r in n) {
			var i = n[r];
			i && i.destroy();
		}
	}, t.prototype.getTargets = function() {
		var e = this.props.target;
		return e ? [e] : [];
	}, t.prototype.getAble = function(e) {
		return find(this.props.ables || [], function(t) {
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
		return e && (e.getAttribute?.call(e, "class") || "").indexOf(PREFIX) > -1;
	}, t.prototype.dragStart = function(e, t) {
		t === void 0 && (t = e.target);
		var n = this.targetGesto, r = this.controlGesto;
		return n && checkMoveableTarget(this)({ inputEvent: e }, t) ? n.isFlag() || n.triggerDragStart(e) : r && this.isMoveableElement(t) && (r.isFlag() || r.triggerDragStart(e)), this;
	}, t.prototype.hitTest = function(e) {
		var t = this.state, n = t.target, r = t.pos1, i = t.pos2, a = t.pos3, o = t.pos4, s = t.targetClientRect;
		if (!n) return 0;
		var c;
		if (isNode(e)) {
			var l = e.getBoundingClientRect();
			c = {
				left: l.left,
				top: l.top,
				width: l.width,
				height: l.height
			};
		} else c = __assign({
			width: 0,
			height: 0
		}, e);
		var u = c.left, d = c.top, f = c.width, p = c.height, m = fitPoints([
			r,
			i,
			o,
			a
		], s), h = getOverlapSize(m, [
			[u, d],
			[u + f, d],
			[u + f, d + p],
			[u, d + p]
		]), g = getAreaSize(m);
		return !h || !g ? 0 : Math.min(100, h / g * 100);
	}, t.prototype.isInside = function(e, t) {
		var n = this.state, r = n.target, i = n.pos1, a = n.pos2, o = n.pos3, s = n.pos4, c = n.targetClientRect;
		return r ? isInside([e, t], fitPoints([
			i,
			a,
			s,
			o
		], c)) : !1;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.props, i = !r.parentPosition && !r.wrapperMoveable;
		i && setStoreCache(!0);
		var a = r.parentMoveable, o = this.state.target || r.target, s = this.getContainer(), c = a ? a._rootContainer : this._rootContainer, l = getMoveableTargetInfo(this.controlBox, o, s, s, c || s, this._getRequestStyles());
		if (!o && this._hasFirstTarget && r.persistData) {
			var u = getPersistState(r.persistData);
			for (var d in u) l[d] = u[d];
		}
		i && setStoreCache(), this.updateState(l, a ? !1 : n);
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
		var e = this.state, t = getAbsolutePosesByState(this.state), n = __read(t, 4), r = n[0], i = n[1], a = n[2], o = n[3], s = getRect(t), c = e.width, l = e.height, u = s.width, d = s.height, f = s.left, p = s.top, m = [e.left, e.top], h = plus(m, e.origin);
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
			beforeOrigin: plus(m, e.beforeOrigin),
			origin: h,
			transformOrigin: e.transformOrigin,
			rotation: this.getRotation()
		};
	}, t.prototype.getManager = function() {
		return this;
	}, t.prototype.stopDrag = function(e) {
		if (!e || e === "target") {
			var t = this.targetGesto;
			t?.isIdle() === !1 && unsetAbles(this, !1), t?.stop();
		}
		if (!e || e === "control") {
			var t = this.controlGesto;
			t?.isIdle() === !1 && unsetAbles(this, !0), t?.stop();
		}
	}, t.prototype.getRotation = function() {
		var e = this.state, t = e.pos1, n = e.pos2, r = e.direction;
		return getAbsoluteRotation(t, n, r);
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this, i = r.props, a = i.parentMoveable || i.wrapperMoveable || r, o = a.props.ables, s = i.groupable, c = find(o, function(t) {
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
		var l = c.request(r), u = n || t.isInstant, d = l.isControl ? "controlAbles" : "targetAbles", f = `${s ? "Group" : ""}${l.isControl ? "Control" : ""}`, p = __spreadArray([], __read(a[d]), !1), m = {
			request: function(t) {
				return triggerAble(r, p, ["drag"], f, "", __assign(__assign({}, l.request(t)), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			},
			requestEnd: function() {
				return triggerAble(r, p, ["drag"], f, "End", __assign(__assign({}, l.requestEnd()), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			}
		};
		return triggerAble(r, p, ["drag"], f, "Start", __assign(__assign({}, l.requestStart(t)), {
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
		var h = getPaddingBox(n || {}), g = h.left, _ = h.top, v = h.bottom, y = h.right, b = o ? 4 : 3, x = [];
		x = p ? i : this.controlBox && t.groupable ? r : plus(r, [d, f]);
		var S = multiplies(b, createOriginMatrix(x.map(function(e) {
			return -e;
		}), b), a, createOriginMatrix(i, b)), C = calculatePadding(S, s, [-g, -_], b), w = calculatePadding(S, c, [y, -_], b), T = calculatePadding(S, l, [-g, v], b), E = calculatePadding(S, u, [y, v], b);
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
				[calculatePadding(S, s, [-g - D, -_], b), calculatePadding(S, c, [y + D, -_], b)],
				[calculatePadding(S, c, [y, -_ - D], b), calculatePadding(S, u, [y, v + D], b)],
				[calculatePadding(S, u, [y + D, v], b), calculatePadding(S, l, [-g - D, v], b)],
				[calculatePadding(S, l, [-g, v + D], b), calculatePadding(S, s, [-g, -_ - D], b)]
			];
		}
	}, t.prototype.checkUpdate = function() {
		this._isPropTargetChanged = !1;
		var e = this.props, t = e.target, n = e.container, r = e.parentMoveable, i = this.state, a = i.target, o = i.container;
		if (!(!a && !t)) {
			this.updateAbles();
			var s = !equals(a, t);
			if (s || !equals(o, n)) {
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
		return n[r] || (n[r] = styled(e, t)), n[r];
	}, t.prototype.getState = function() {
		var e = this.props;
		(e.target || e.targets?.length) && (this._hasFirstTarget = !0);
		var t = this.controlBox, n = e.persistData, r = e.firstRenderState;
		if (r && !t) return r;
		if (!this._hasFirstTarget && n) {
			var i = getPersistState(n);
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
		var n = this.props.triggerAblesSimultaneously, r = this.getEnabledAbles(e), i = `drag${t}Start`, a = `pinch${t}Start`, o = `drag${t}ControlStart`, s = filterAbles(r, [i, a], n), c = filterAbles(r, [o], n);
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
		var e = this, t = this.props.triggerAblesSimultaneously, n = { createElement: import_react.createElement };
		return this.renderState = {}, groupByMap(flat(filterAbles(this.getEnabledAbles(), ["render"], t).map(function(t) {
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
			return __spreadArray(__spreadArray([], __read(e), !1), __read(n), !1);
		}, __spreadArray([], __read(this.props.requestStyles || []), !1));
	}, t.prototype._updateObserver = function(e) {
		this._updateResizeObserver(e), this._updateMutationObserver(e);
	}, t.prototype._updateEvents = function() {
		var e = this.targetAbles.length, t = this.controlAbles.length, n = this._dragTarget;
		(!e && this.targetGesto || this._isTargetChanged(!0)) && (unsetGesto(this, !1), this.updateState({ gestos: {} })), t || unsetGesto(this, !0), n && e && !this.targetGesto && (this.targetGesto = getTargetAbleGesto(this, n, "")), !this.controlGesto && t && (this.controlGesto = getControlAbleGesto(this, "Control"));
	}, t.prototype._updateTargets = function() {
		var e = this.props;
		this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = getRefTarget(this._originalDragTarget, !0);
	}, t.prototype._renderLines = function() {
		var e = this.props, t = e.zoom, n = e.hideDefaultLines, r = e.hideChildMoveableDefaultLines, i = e.parentMoveable;
		if (n || i && r) return [];
		var a = this.getState(), o = { createElement: import_react.createElement };
		return a.renderLines.map(function(e, n) {
			return renderLine(o, "", e[0], e[1], t, `render-line-${n}`);
		});
	}, t.prototype._isTargetChanged = function(e) {
		var t = this.props, n = t.dragTarget || t.target, r = this._prevOriginalDragTarget, i = this._prevDragArea, a = t.dragArea;
		return !a && r !== n || (e || a) && i !== a || this._prevPropTarget != this._propTarget;
	}, t.prototype._updateNativeEvents = function() {
		var e = this, t = this.props.dragArea ? this.areaElement : this.state.target, n = this.events, r = getKeys(n);
		if (this._isTargetChanged()) for (var i in n) {
			var a = n[i];
			a && a.destroy(), n[i] = null;
		}
		if (t) {
			var o = this.enabledAbles;
			r.forEach(function(r) {
				var i = filterAbles(o, [r]), a = i.length > 0, s = n[r];
				if (!a) {
					s && (s.destroy(), n[r] = null);
					return;
				}
				s || (s = new EventManager(t, e, r), n[r] = s), s.setAbles(i);
			});
		}
	}, t.prototype._checkUpdateRootContainer = function() {
		var e = this.props.rootContainer;
		!this._rootContainer && e && (this._rootContainer = getRefTarget(e, !0));
	}, t.prototype._checkUpdateViewContainer = function() {
		var e = this.props.viewContainer;
		!this._viewContainer && e && (this._viewContainer = getRefTarget(e, !0)), this._viewContainer && this._changeAbleViewClassNames(__spreadArray(__spreadArray([], __read(this._getAbleViewClassNames()), !1), [this.isDragging() ? VIEW_DRAGGING : ""], !1));
	}, t.prototype._changeAbleViewClassNames = function(e) {
		var t = this._viewContainer, n = groupBy(e.filter(Boolean), function(e) {
			return e;
		}).map(function(e) {
			return __read(e, 1)[0];
		}), r = this._viewClassNames, i = diff$1(r, n), a = i.removed, o = i.added;
		a.forEach(function(e) {
			removeClass(t, r[e]);
		}), o.forEach(function(e) {
			addClass(t, n[e]);
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
			return (a[r]?.isEventStart || o[r]?.isEventStart) && (i += ` ${prefix(`${r}${e}-dragging`)}`), i.trim();
		}).filter(Boolean).join(" ");
	}, t.prototype._updateResizeObserver = function(e) {
		var t, n = this.props, r = n.target, i = getWindow(this.getControlBoxElement());
		if (!i.ResizeObserver || !r || !n.useResizeObserver) {
			(t = this._reiszeObserver) == null || t.disconnect();
			return;
		}
		if (!(e.target === r && this._reiszeObserver)) {
			var a = new i.ResizeObserver(this.checkUpdateRect);
			a.observe(r, { box: "border-box" }), this._reiszeObserver = a;
		}
	}, t.prototype._updateMutationObserver = function(e) {
		var t = this, n, r = this.props, i = r.target, a = getWindow(this.getControlBoxElement());
		if (!a.MutationObserver || !i || !r.useMutationObserver) {
			(n = this._mutationObserver) == null || n.disconnect();
			return;
		}
		if (!(e.target === i && this._mutationObserver)) {
			var o = new a.MutationObserver(function(e) {
				var n, r;
				try {
					for (var i = __values(e), a = i.next(); !a.done; a = i.next()) {
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
		flushSync: defaultSync,
		firstRenderState: null,
		persistData: null,
		viewContainer: null,
		requestStyles: [],
		useAccuratePosition: !1
	}, t;
}(import_react.PureComponent), Groupable = {
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
		var d = watchValue(e, "parentPosition", [a, o], function(e) {
			return e.join(",");
		}), f = watchValue(e, "requestStyles", e.getRequestChildStyles(), function(e) {
			return e.join(",");
		});
		return e.moveables = e.moveables.slice(0, r.length), __spreadArray(__spreadArray([], __read(r.map(function(r, i) {
			return t.createElement(MoveableManager, {
				key: "moveable" + i,
				ref: refs(e, "moveables", i),
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
		})), !1), __read(flat(l.map(function(e, n) {
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
				var a = __read(e, 2), o = a[0], s = a[1];
				return renderLine(t, "", minus(r[o], d), minus(r[s], d), c, `group-rect-${n}-${i}`);
			});
		}))), !1);
	}
}, Clickable = makeAble("clickable", {
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
			triggerEvent(e, "onClick", fillParams(e, t, {
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
			a === -1 && (a = findIndex(i, function(e) {
				return e.contains(r);
			}), s = a > -1), triggerEvent(e, "onClickGroup", fillParams(e, t, {
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
function getDraggableEvent(e) {
	var t = e.originalDatas.draggable;
	return t ||= (e.originalDatas.draggable = {}, e.originalDatas.draggable), __assign(__assign({}, e), { datas: t });
}
var edgeDraggable = makeAble("edgeDraggable", {
	css: [".edge.edgeDraggable.line {\ncursor: move;\n}"],
	render: function(e, t) {
		var n = e.props, r = n.edgeDraggable;
		return r ? renderEdgeLines(t, "edgeDraggable", r, e.getState().renderPoses, n.zoom) : [];
	},
	dragCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && hasClass(r, prefix("direction")) && hasClass(r, prefix("edge")) && hasClass(r, prefix("edgeDraggable"));
	},
	dragStart: function(e, t) {
		return Draggable.dragStart(e, getDraggableEvent(t));
	},
	drag: function(e, t) {
		return Draggable.drag(e, getDraggableEvent(t));
	},
	dragEnd: function(e, t) {
		return Draggable.dragEnd(e, getDraggableEvent(t));
	},
	dragGroupCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && hasClass(r, prefix("direction")) && hasClass(r, prefix("line"));
	},
	dragGroupStart: function(e, t) {
		return Draggable.dragGroupStart(e, getDraggableEvent(t));
	},
	dragGroup: function(e, t) {
		return Draggable.dragGroup(e, getDraggableEvent(t));
	},
	dragGroupEnd: function(e, t) {
		return Draggable.dragGroupEnd(e, getDraggableEvent(t));
	},
	unset: function(e) {
		return Draggable.unset(e);
	}
}), IndividualGroupable = {
	name: "individualGroupable",
	props: ["individualGroupable", "individualGroupableProps"],
	events: []
}, MOVEABLE_ABLES = [
	BeforeRenderable,
	Default,
	Snappable,
	Pinchable,
	Draggable,
	edgeDraggable,
	Resizable,
	Scalable,
	Warpable,
	Rotatable,
	Scrollable,
	Padding,
	Origin,
	OriginDraggable,
	Clippable,
	Roundable,
	Groupable,
	IndividualGroupable,
	Clickable,
	DragArea,
	Renderable
];
function solveConstantsDistance(e, t) {
	var n = __read(e, 3), r = n[0], i = n[1], a = n[2];
	return (r * t[0] + i * t[1] + a) / Math.sqrt(r * r + i * i);
}
function solveC(e, t) {
	var n = __read(e, 2), r = n[0], i = n[1];
	return -r * t[0] - i * t[1];
}
function getMaxPos(e, t) {
	return Math.max.apply(Math, __spreadArray([], __read(e.map(function(e) {
		var n = __read(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.max(r[t], i[t], a[t], o[t]);
	})), !1));
}
function getMinPos(e, t) {
	return Math.min.apply(Math, __spreadArray([], __read(e.map(function(e) {
		var n = __read(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.min(r[t], i[t], a[t], o[t]);
	})), !1));
}
function getGroupRect(e, t) {
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
	var d = throttle(t, TINY_NUM);
	if (d % 90) {
		var f = d / 180 * Math.PI, p = Math.tan(f), m = -1 / p, h = [MAX_NUM, MIN_NUM], g = [[0, 0], [0, 0]], _ = [MAX_NUM, MIN_NUM], v = [[0, 0], [0, 0]];
		e.forEach(function(e) {
			e.forEach(function(e) {
				var t = solveConstantsDistance([
					-p,
					1,
					0
				], e), n = solveConstantsDistance([
					-m,
					1,
					0
				], e);
				h[0] > t && (g[0] = e, h[0] = t), h[1] < t && (g[1] = e, h[1] = t), _[0] > n && (v[0] = e, _[0] = n), _[1] < n && (v[1] = e, _[1] = n);
			});
		});
		var y = __read(g, 2), b = y[0], x = y[1], S = __read(v, 2), C = S[0], w = S[1], T = [
			-p,
			1,
			solveC([-p, 1], b)
		], E = [
			-p,
			1,
			solveC([-p, 1], x)
		], D = [
			-m,
			1,
			solveC([-m, 1], C)
		], O = [
			-m,
			1,
			solveC([-m, 1], w)
		];
		n = __read([
			[T, D],
			[T, O],
			[E, D],
			[E, O]
		].map(function(e) {
			var t = __read(e, 2), n = t[0], r = t[1];
			return getIntersectionPointsByConstants(n, r)[0];
		}), 4), a = n[0], o = n[1], s = n[2], c = n[3], l = _[1] - _[0], u = h[1] - h[0];
	} else {
		var k = getMinPos(e, 0), A = getMinPos(e, 1), j = getMaxPos(e, 0), M = getMaxPos(e, 1);
		if (a = [k, A], o = [j, A], s = [k, M], c = [j, M], l = j - k, u = M - A, d % 180) {
			var N = [
				s,
				a,
				c,
				o
			];
			r = __read(N, 4), a = r[0], o = r[1], s = r[2], c = r[3], l = M - A, u = j - k;
		}
	}
	if (d % 360 > 180) {
		var N = [
			c,
			s,
			o,
			a
		];
		i = __read(N, 4), a = i[0], o = i[1], s = i[2], c = i[3];
	}
	var P = getMinMaxs([
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
function findMoveableGroups(e, t) {
	var n = t.map(function(t) {
		if (isArray(t)) {
			var n = findMoveableGroups(e, t), r = n.length;
			return r > 1 ? n : r === 1 ? n[0] : null;
		} else {
			var i = find(e, function(e) {
				return e.manager.props.target === t;
			});
			return i ? (i.finded = !0, i.manager) : null;
		}
	}).filter(Boolean);
	return n.length === 1 && isArray(n[0]) ? n[0] : n;
}
var MoveableGroup = /* @__PURE__ */ function(e) {
	__extends(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.differ = new children_differ_esm_default(), t.moveables = [], t.transformOrigin = "50% 50%", t.renderGroupRects = [], t._targetGroups = [], t._hasFirstTargets = !1, t;
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
		setStoreCache(!0), this.moveables.forEach(function(t) {
			t.updateRect(e, !1, !1);
		});
		var i = this.props, a = this.moveables, o = r.target || i.target, s = a.map(function(e) {
			return {
				finded: !1,
				manager: e
			};
		}), c = this.props.targetGroups || [], l = findMoveableGroups(s, c), u = i.useDefaultGroupRotate;
		l.push.apply(l, __spreadArray([], __read(s.filter(function(e) {
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
				if (isArray(e)) {
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
					poses: getAbsolutePosesByState(e.state),
					rotation: e.getRotation()
				};
			}), i = r.map(function(e) {
				return e.rotation;
			}), a = 0, o = i[0], s = i.every(function(e) {
				return Math.abs(o - e) < .1;
			});
			return a = f ? !u && s ? o : p : !u && !n && s ? o : t, getGroupRect(r.map(function(e) {
				return e.poses;
			}), a);
		}
		var g = h(l, this.rotation, !0);
		f && (this.rotation = g.rotation, this.transformOrigin = i.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = c, this.renderGroupRects = d;
		var _ = this.transformOrigin, v = this.rotation, y = this.scale, b = g.width, x = g.height, S = g.minX, C = g.minY, w = getMinMaxs(rotatePosesInfo([
			[0, 0],
			[b, 0],
			[0, x],
			[b, x]
		], convertTransformOriginArray(_, b, x), this.rotation / 180 * Math.PI).result), T = w.minX, E = w.minY, D = ` rotate(${v}deg) scale(${sign(y[0])}, ${sign(y[1])})`, O = `translate(${-T}px, ${-E}px)${D}`;
		this.controlBox.style.transform = `translate3d(${S}px, ${C}px, ${this.props.translateZ || 0})`, o.style.cssText += `left:0px;top:0px;transform-origin:${_};width:${b}px;height:${x}px;transform: ${O}`, r.width = b, r.height = x;
		var k = this.getContainer(), A = getMoveableTargetInfo(this.controlBox, o, this.controlBox, this.getContainer(), this._rootContainer || k, []), j = [A.left, A.top], M = __read(getAbsolutePosesByState(A), 4), N = M[0], P = M[1], F = M[2], I = M[3], L = getMinMaxs([
			N,
			P,
			F,
			I
		]), R = [L.minX, L.minY], z = sign(y[0] * y[1]);
		A.pos1 = minus(N, R), A.pos2 = minus(P, R), A.pos3 = minus(F, R), A.pos4 = minus(I, R), A.left = S - A.left + R[0], A.top = C - A.top + R[1], A.origin = minus(plus(j, A.origin), R), A.beforeOrigin = minus(plus(j, A.beforeOrigin), R), A.originalBeforeOrigin = plus(j, A.originalBeforeOrigin), A.transformOrigin = minus(plus(j, A.transformOrigin), R), o.style.transform = `translate(${-T - R[0]}px, ${-E - R[1]}px)` + D, setStoreCache(), this.updateState(__assign(__assign({}, A), {
			posDelta: R,
			direction: z,
			beforeDirection: z
		}), n);
	}, t.prototype.getRect = function() {
		return __assign(__assign({}, e.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
			return e.getRect();
		}) });
	}, t.prototype.triggerEvent = function(t, n, r) {
		if (r || t.indexOf("Group") > -1) return e.prototype.triggerEvent.call(this, t, n);
		this._emitter.trigger(t, n);
	}, t.prototype.getRequestChildStyles = function() {
		return this.getEnabledAbles().reduce(function(e, t) {
			var n = t.requestChildStyle?.call(t) ?? [];
			return __spreadArray(__spreadArray([], __read(e), !1), __read(n), !1);
		}, []);
	}, t.prototype.getMoveables = function() {
		return __spreadArray([], __read(this.moveables), !1);
	}, t.prototype.updateAbles = function() {
		e.prototype.updateAbles.call(this, __spreadArray(__spreadArray([], __read(this.props.ables), !1), [Groupable], !1), "Group");
	}, t.prototype._updateTargets = function() {
		e.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = getRefTarget(this._originalDragTarget, !0);
	}, t.prototype._updateEvents = function() {
		var e = this.state, t = this.props, n = this._prevDragTarget, r = t.dragTarget || this.areaElement, i = t.targets, a = this.differ.update(i), o = a.added, s = a.changed, c = a.removed, l = o.length || c.length;
		(l || this._prevOriginalDragTarget !== this._originalDragTarget) && (unsetGesto(this, !1), unsetGesto(this, !0), this.updateState({ gestos: {} })), n !== r && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto ||= getTargetAbleGesto(this, this._dragTarget, "Group"), this.controlGesto ||= getControlAbleGesto(this, "GroupControl"));
		var u = !equals(e.container, t.container);
		u && (e.container = t.container), (u || l || this.transformOrigin !== (t.defaultGroupOrigin || "50% 50%") || s.length || i.length && !isDeepArrayEquals(this._targetGroups, t.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!l;
	}, t.prototype._updateObserver = function() {}, t.defaultProps = __assign(__assign({}, MoveableManager.defaultProps), {
		transformOrigin: ["50%", "50%"],
		groupable: !0,
		dragArea: !0,
		keepRatio: !0,
		targets: [],
		defaultGroupRotate: 0,
		defaultGroupOrigin: "50% 50%"
	}), t;
}(MoveableManager), MoveableIndividualGroup = /* @__PURE__ */ function(e) {
	__extends(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.moveables = [], t;
	}
	return t.prototype.render = function() {
		var e = this, t = this.props, n = t.cspNonce, r = t.cssStyled, i = t.persistData, a = t.targets || [], o = a.length, s = this.isUnmounted || !o, c = i?.children ?? [];
		return s && !o && c.length ? a = c.map(function() {
			return null;
		}) : s || (c = []), import_react.createElement(r, {
			cspNonce: n,
			ref: ref(this, "controlBox"),
			className: prefix("control-box")
		}, a.map(function(n, r) {
			var i = t.individualGroupableProps?.call(t, n, r) ?? {};
			return import_react.createElement(MoveableManager, __assign({
				key: "moveable" + r,
				ref: refs(e, "moveables", r)
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
		n === void 0 && (n = !0), setStoreCache(!0), this.moveables.forEach(function(r) {
			r.updateRect(e, t, n);
		}), setStoreCache();
	}, t.prototype.getRect = function() {
		return __assign(__assign({}, e.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
			return e.getRect();
		}) });
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this.moveables.map(function(n) {
			return n.request(e, __assign(__assign({}, t), { isInstant: !1 }), !1);
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
		var n = t, r = find(this.moveables, function(e) {
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
		return __spreadArray([], __read(this.moveables), !1);
	}, t.prototype.updateRenderPoses = function() {}, t.prototype.checkUpdate = function() {}, t.prototype.triggerEvent = function() {}, t.prototype.updateAbles = function() {}, t.prototype._updateEvents = function() {}, t.prototype._updateObserver = function() {}, t;
}(MoveableManager);
function getElementTargets(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (isString(e)) {
				t[e] && n.push.apply(n, __spreadArray([], __read(t[e]), !1));
				return;
			}
			isArray(e) ? n.push.apply(n, __spreadArray([], __read(getElementTargets(e, t)), !1)) : n.push(e);
		}
	}), n;
}
function getTargetGroups(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (isString(e)) {
				t[e] && n.push.apply(n, __spreadArray([], __read(t[e]), !1));
				return;
			}
			isArray(e) ? n.push(getTargetGroups(e, t)) : n.push(e);
		}
	}), n;
}
function compareRefTargets(e, t) {
	return e.length !== t.length || e.some(function(e, n) {
		var r = t[n];
		return !e && !r || e == r ? !1 : isArray(e) && isArray(r) ? compareRefTargets(e, r) : !0;
	});
}
var Moveable = /* @__PURE__ */ function(e) {
	__extends(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.defaultAbles = MOVEABLE_ABLES, t;
}(/* @__PURE__ */ function(e) {
	__extends(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.refTargets = [], t.selectorMap = {}, t._differ = new children_differ_esm_default(), t._elementTargets = [], t._tmpRefTargets = [], t._tmpSelectorMap = {}, t._onChangeTargets = null, t;
	}
	return t.makeStyled = function() {
		var e = {};
		this.getTotalAbles().forEach(function(t) {
			var n = t.css;
			n && n.forEach(function(t) {
				e[t] = !0;
			});
		}), this.defaultStyled = styled("div", prefixCSS(PREFIX, MOVEABLE_CSS + getKeys(e).join("\n")));
	}, t.getTotalAbles = function() {
		return __spreadArray([
			Default,
			Groupable,
			IndividualGroupable,
			DragArea
		], __read(this.defaultAbles), !1);
	}, t.prototype.render = function() {
		var e = this.constructor;
		e.defaultStyled || e.makeStyled();
		var t = this.props, n = t.ables, r = t.props, i = __rest(t, ["ables", "props"]), a = __read(this._updateRefs(!0), 2), o = a[0], s = a[1], c = getElementTargets(o, s), l = c.length > 1, u = __spreadArray(__spreadArray([], __read(e.getTotalAbles()), !1), __read(n || []), !1), d = __assign(__assign(__assign({}, i), r || {}), {
			ables: u,
			cssStyled: e.defaultStyled,
			customStyledMap: e.customStyledMap
		});
		this._elementTargets = c;
		var f = null, p = this.moveable;
		if (i.persistData?.children && (l = !0), i.individualGroupable) return import_react.createElement(MoveableIndividualGroup, __assign({
			key: "individual-group",
			ref: ref(this, "moveable")
		}, d, {
			target: null,
			targets: c
		}));
		if (l) {
			var m = getTargetGroups(o, s);
			if (p && !p.props.groupable && !p.props.individualGroupable) {
				var h = p.props.target;
				h && c.indexOf(h) > -1 && (f = __assign({}, p.state));
			}
			return import_react.createElement(MoveableGroup, __assign({
				key: "group",
				ref: ref(this, "moveable")
			}, d, i.groupableProps ?? {}, {
				target: null,
				targets: c,
				targetGroups: m,
				firstRenderState: f
			}));
		} else {
			var g = c[0];
			if (p && (p.props.groupable || p.props.individualGroupable)) {
				var _ = find(p.moveables || [], function(e) {
					return e.props.target === g;
				});
				_ && (f = __assign({}, _.state));
			}
			return import_react.createElement(MoveableManager, __assign({
				key: "single",
				ref: ref(this, "moveable")
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
		var t = this.refTargets, n = getRefTargets(this.props.target || this.props.targets), r = typeof document < "u", i = compareRefTargets(t, n), a = this.selectorMap, o = {};
		return this.refTargets.forEach(function e(t) {
			isString(t) ? a[t] ? o[t] = a[t] : r && (i = !0, o[t] = [].slice.call(document.querySelectorAll(t))) : isArray(t) && t.forEach(e);
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
		var o = __read(this._updateRefs(), 3), s = o[0], c = o[1], l = o[2];
		this.refTargets = s, this.selectorMap = c, l && this.forceUpdate();
	}, t.defaultAbles = [], t.customStyledMap = {}, t.defaultStyled = null, __decorate([withMethods(MOVEABLE_METHODS)], t.prototype, "moveable", void 0), t;
}(import_react.PureComponent));
function GrpLayer({ cmn: { styChild: e, sys: t, isDesignMode: n, sty4Moveable: r }, fn: i }) {
	let a = (e) => t.cfg.searchPath(e, SEARCH_PATH_ARG_EXT.SP_GSM), o = (e) => {
		e.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
	}, s = (0, import_react.useRef)(null), c = (e, t) => {
		noticeDrag(), e.transform = t;
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx$1("img", {
		css: e,
		src: a(i),
		ref: s,
		style: r,
		onMouseDown: (e) => o(e)
	}), n && /* @__PURE__ */ jsx$1(Moveable, {
		target: s,
		draggable: !0,
		throttleDrag: 1,
		onDrag: ({ target: { style: e }, transform: t }) => c(e, t),
		resizable: !0,
		keepRatio: !0,
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
require_hoist_non_react_statics_cjs();
var jsx = function(e, t) {
	var n = arguments;
	if (t == null || !hasOwn.call(t, "css")) return import_react.createElement.apply(void 0, n);
	var r = n.length, a = Array(r);
	a[0] = Emotion$1, a[1] = createEmotionProps(e, t);
	for (var o = 2; o < r; o++) a[o] = n[o];
	return import_react.createElement.apply(null, a);
};
(function(e) {
	var t;
	(function(e) {})(t ||= e.JSX ||= {});
})(jsx ||= {});
function css() {
	return serializeStyles([...arguments]);
}
function TxtLayer({ cmn: { styChild: e, isDesignMode: t, sty4Moveable: n }, str: r }) {
	let i = css`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
	`, a = css`
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
	`, [o, s] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => s(r), [r]);
	let c = (0, import_react.useRef)(null), l = (0, import_react.useRef)(null), u = (e, t) => {
		noticeDrag(), e.transform = t;
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx$1("span", {
			css: [e, i],
			ref: c,
			style: n,
			children: o
		}),
		t && /* @__PURE__ */ jsx$1(Moveable, {
			target: c,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => u(e, t),
			resizable: !0,
			keepRatio: !1,
			onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
				u(e, r), e.width = `${t}px`, e.height = `${n}px`;
			},
			rotatable: !0,
			throttleRotate: 0,
			startDragRotate: 0,
			throttleDragRotate: 0,
			rotationPosition: "top",
			onRotate: ({ target: { style: e }, drag: { transform: t } }) => u(e, t),
			originDraggable: !0,
			onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
				u(e, n), e.transformOrigin = t;
			}
		}),
		t && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("label", {
			css: a,
			ref: l,
			children: ["テキスト入力", /* @__PURE__ */ jsx$1("textarea", {
				rows: 3,
				value: o,
				onChange: (e) => s(e.target.value)
			})]
		}), /* @__PURE__ */ jsx$1(Moveable, {
			target: l,
			origin: !1,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => u(e, t),
			preventDefault: !1
		})] })
	] });
}
function Stage({ arg: { sys: e }, onClick: t, prev: r, next: i }) {
	let a = useStore((e) => e.aLay), o = useStore((e) => e.replace);
	class s extends BaseMemento {
		nm = "Stage";
		restore() {
			o(this.stt);
		}
	}
	e.caretaker.update(() => new s(JSON.stringify(a)));
	let [c, l] = (0, import_react.useState)(innWH());
	useMount_default(() => {
		function e() {
			l(innWH());
		}
		return globalThis.addEventListener("resize", e), () => globalThis.removeEventListener("resize", e);
	});
	let { cvsScale: f } = calcScale(c), m = css`
		position: relative;

		transform-origin: left top;
		transform: scale(${f});
	`, g = css`position: absolute; top: 0; left: 0;`, y = css`
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
	`, b = (0, import_react.useRef)(null);
	useMount_default(() => {
		let e = b.current;
		e.addEventListener("mousedown", () => isDrag = !1);
		let t = (e) => {
			e.preventDefault(), e.deltaY < 0 ? i() : r();
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	});
	let [x, S] = useToggle_default(!1), w = useLongPress_default((e) => {
		e.stopPropagation(), onLong(), !isDrag && (S(), setDesignMode(!x));
	}, {
		isPreventDefault: !0,
		delay: 300
	}), [E, D] = useToggle_default(!1), k = useFullscreen_default(b, E, { onClose: () => D(!1) }), A = { cmn: {
		sys: e,
		styChild: g,
		isDesignMode: x,
		sty4Moveable: {
			maxWidth: "auto",
			maxHeight: "auto",
			minWidth: "auto",
			minHeight: "auto",
			transform: "translate(0px, 0px) rotate(0deg)"
		}
	} };
	return /* @__PURE__ */ jsxs("div", {
		css: m,
		onClick: t,
		...w,
		ref: b,
		children: [
			x && /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx$1("button", {
					onClick: () => D(),
					css: y,
					children: "FullScr"
				}),
				/* @__PURE__ */ jsx$1("button", {
					onClick: () => {},
					css: y,
					children: "Back"
				}),
				/* @__PURE__ */ jsx$1("button", {
					onClick: () => {},
					css: y,
					children: "Prev"
				})
			] }),
			/* @__PURE__ */ jsx$1("span", { children: k }),
			a.map((e) => e.cls === "GRP" ? /* @__PURE__ */ jsx$1(GrpLayer, {
				cmn: A.cmn,
				fn: e.fn
			}, e.nm) : /* @__PURE__ */ jsx$1(TxtLayer, {
				cmn: A.cmn,
				str: e.str
			}, e.nm))
		]
	});
}
function calcScale({ width: e, height: t }) {
	let n = 0, r = 0, i = 1;
	return CmnLib.stageW > e || CmnLib.stageH > t ? (CmnLib.stageW / CmnLib.stageH <= e / t ? (r = t, n = uint(CmnLib.stageW / CmnLib.stageH * t)) : (n = e, r = uint(CmnLib.stageH / CmnLib.stageW * e)), i = n / CmnLib.stageW) : (n = CmnLib.stageW, r = CmnLib.stageH, i = 1), {
		cvsScale: i,
		cvsWidth: n,
		cvsHeight: r
	};
}
function innWH() {
	let { innerWidth: e, innerHeight: t } = globalThis;
	return {
		width: e,
		height: t
	};
}
var isDrag = !1;
const noticeDrag = () => {
	isDrag = !0;
};
export { Stage as default, noticeDrag };

//# sourceMappingURL=Stage.js.map