import { n as e, t } from "./rolldown-runtime.js";
import { t as n } from "./Memento.js";
import { t as r } from "./react.js";
import { n as i, o as a, r as o } from "./ConfigBase.js";
import { t as s } from "./gsap.js";
//#region node_modules/@egjs/agent/dist/agent.esm.js
var c = /* @__PURE__ */ e(r());
function l(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return !0;
	return !1;
}
function u(e, t) {
	for (var n = e.length, r = 0; r < n; ++r) if (t(e[r], r)) return e[r];
	return null;
}
function d(e) {
	var t = e;
	if (t === void 0) {
		if (typeof navigator > "u" || !navigator) return "";
		t = navigator.userAgent || "";
	}
	return t.toLowerCase();
}
function f(e, t) {
	try {
		return new RegExp(e, "g").exec(t);
	} catch {
		return null;
	}
}
function p() {
	if (typeof navigator > "u" || !navigator || !navigator.userAgentData) return !1;
	var e = navigator.userAgentData, t = e.brands || e.uaList;
	return !!(t && t.length);
}
function m(e, t) {
	var n = f("(" + e + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", t);
	return n ? n[3] : "";
}
function h(e) {
	return e.replace(/_/g, ".");
}
function g(e, t) {
	var n = null, r = "-1";
	return l(e, function(e) {
		var i = f("(" + e.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", t);
		return !i || e.brand ? !1 : (n = e, r = i[3] || "-1", e.versionAlias ? r = e.versionAlias : e.versionTest && (r = m(e.versionTest.toLowerCase(), t) || r), r = h(r), !0);
	}), {
		preset: n,
		version: r
	};
}
function _(e, t) {
	var n = {
		brand: "",
		version: "-1"
	};
	return l(e, function(e) {
		var r = v(t, e);
		return r ? (n.brand = e.id, n.version = e.versionAlias || r.version, n.version !== "-1") : !1;
	}), n;
}
function v(e, t) {
	return u(e, function(e) {
		var n = e.brand;
		return f("" + t.test, n.toLowerCase());
	});
}
var y = [
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
], b = [
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
], x = [{
	test: "applewebkit",
	id: "webkit",
	versionTest: "applewebkit|safari"
}], S = [
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
], C = [
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
function w(e) {
	return !!g(S, e).preset;
}
function T(e) {
	var t = d(e), n = !!/mobi/g.exec(t), r = {
		name: "unknown",
		version: "-1",
		majorVersion: -1,
		webview: w(t),
		chromium: !1,
		chromiumVersion: "-1",
		webkit: !1,
		webkitVersion: "-1"
	}, i = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	}, a = g(y, t), o = a.preset, s = a.version, c = g(C, t), l = c.preset, u = c.version, f = g(b, t);
	if (r.chromium = !!f.preset, r.chromiumVersion = f.version, !r.chromium) {
		var p = g(x, t);
		r.webkit = !!p.preset, r.webkitVersion = p.version;
	}
	return l && (i.name = l.id, i.version = u, i.majorVersion = parseInt(u, 10)), o && (r.name = o.id, r.version = s, r.webview && i.name === "ios" && r.name !== "safari" && (r.webview = !1)), r.majorVersion = parseInt(r.version, 10), {
		browser: r,
		os: i,
		isMobile: n,
		isHints: !1
	};
}
function E(e) {
	var t = navigator.userAgentData, n = (t.uaList || t.brands).slice(), r = e && e.fullVersionList, i = t.mobile || !1, a = n[0], o = (e && e.platform || t.platform || navigator.platform).toLowerCase(), s = {
		name: a.brand,
		version: a.version,
		majorVersion: -1,
		webkit: !1,
		webkitVersion: "-1",
		chromium: !1,
		chromiumVersion: "-1",
		webview: !!_(S, n).brand || w(d())
	}, c = {
		name: "unknown",
		version: "-1",
		majorVersion: -1
	};
	s.webkit = !s.chromium && l(x, function(e) {
		return v(n, e);
	});
	var f = _(b, n);
	if (s.chromium = !!f.brand, s.chromiumVersion = f.version || "-1", !s.chromium) {
		var p = _(x, n);
		s.webkit = !!p.brand, s.webkitVersion = p.version || "-1";
	}
	var m = u(C, function(e) {
		return RegExp("" + e.test, "g").exec(o);
	});
	if (c.name = m ? m.id : "", e && (c.version = e.platformVersion || "-1"), r && r.length) {
		var g = _(y, r);
		s.name = g.brand || s.name, s.version = g.version || s.version;
	} else {
		var T = _(y, n);
		s.name = T.brand || s.name, s.version = T.brand && e ? e.uaFullVersion : T.version;
	}
	return s.webkit && (c.name = i ? "ios" : "mac"), c.name === "ios" && s.webview && (s.version = "-1"), c.version = h(c.version), s.version = h(s.version), c.majorVersion = parseInt(c.version, 10), s.majorVersion = parseInt(s.version, 10), {
		browser: s,
		os: c,
		isMobile: i,
		isHints: !0
	};
}
function D(e) {
	return e === void 0 && p() ? E() : T(e);
}
//#endregion
//#region node_modules/framework-utils/dist/utils.esm.js
function O(e) {
	return [...arguments].slice(1).map(function(t) {
		return t.split(" ").map(function(t) {
			return t ? "" + e + t : "";
		}).join(" ");
	}).join(" ");
}
function k(e, t) {
	return t.replace(/([^}{]*){/gm, function(t, n) {
		return n.replace(/\.([^{,\s\d.]+)/g, "." + e + "$1") + "{";
	});
}
function A(e, t) {
	return function(n) {
		n && (e[t] = n);
	};
}
function j(e, t, n) {
	return function(r) {
		r && (e[t][n] = r);
	};
}
function M(e, t) {
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
var N = "function", P = "string", F = "number", I = "undefined", L = typeof window !== I, R = typeof document < "u" && document, z = [
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
], B = 1e-7;
1 / B;
var ee = {
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
function V() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function te(e, t, n, r) {
	return (e * r + t * n) / (n + r);
}
function ne(e) {
	return typeof e === I;
}
function re(e) {
	return e && typeof e == "object";
}
function H(e) {
	return Array.isArray(e);
}
function U(e) {
	return typeof e === P;
}
function ie(e) {
	return typeof e === F;
}
function ae(e) {
	return typeof e === N;
}
function oe(e, t) {
	return (t === "" || t == " ") && (e === "" || e == " ") || e === t;
}
function se(e, t, n, r, i) {
	return ce(e, t, n) ? n : le(e, t, n + 1, r, i);
}
function ce(e, t, n) {
	if (!e.ignore) return null;
	var r = t.slice(Math.max(n - 3, 0), n + 3).join("");
	return new RegExp(e.ignore).exec(r);
}
function le(e, t, n, r, i) {
	for (var a = function(n) {
		var a = t[n].trim();
		if (a === e.close && !ce(e, t, n)) return { value: n };
		var s = n, c = ve(i, function(e) {
			return e.open === a;
		});
		if (c && (s = se(c, t, n, r, i)), s === -1) return o = n, "break";
		n = s, o = n;
	}, o, s = n; s < r; ++s) {
		var c = a(s);
		if (s = o, typeof c == "object") return c.value;
		if (c === "break") break;
	}
	return -1;
}
function ue(e, t) {
	var n = U(t) ? { separator: t } : t, r = n.separator, i = r === void 0 ? "," : r, a = n.isSeparateFirst, o = n.isSeparateOnlyOpenClose, s = n.isSeparateOpenClose, c = s === void 0 ? o : s, l = n.openCloseCharacters, u = l === void 0 ? z : l, d = u.map(function(e) {
		var t = e.open, n = e.close;
		return t === n ? t : t + "|" + n;
	}).join("|"), f = "(\\s*" + i + "\\s*|" + d + "|\\s+)", p = new RegExp(f, "g"), m = e.split(p).filter(function(e) {
		return e && e !== "undefined";
	}), h = m.length, g = [], _ = [];
	function v() {
		return _.length ? (g.push(_.join("")), _ = [], !0) : !1;
	}
	for (var y = function(t) {
		var n = m[t].trim(), r = t, s = ve(u, function(e) {
			return e.open === n;
		}), l = ve(u, function(e) {
			return e.close === n;
		});
		if (s) {
			if (r = se(s, m, t, h, u), r !== -1 && c) return v() && a || (g.push(m.slice(t, r + 1).join("")), t = r, a) ? (b = t, "break") : (b = t, "continue");
		} else if (l && !ce(l, m, t)) {
			var d = V(u);
			return d.splice(u.indexOf(l), 1), { value: ue(e, {
				separator: i,
				isSeparateFirst: a,
				isSeparateOnlyOpenClose: o,
				isSeparateOpenClose: c,
				openCloseCharacters: d
			}) };
		} else if (oe(n, i) && !o) return v(), a ? (b = t, "break") : (b = t, "continue");
		r === -1 && (r = h - 1), _.push(m.slice(t, r + 1).join("")), t = r, b = t;
	}, b, x = 0; x < h; ++x) {
		var S = y(x);
		if (x = b, typeof S == "object") return S.value;
		if (S === "break") break;
	}
	return _.length && g.push(_.join("")), g;
}
function de(e) {
	return ue(e, "");
}
function fe(e) {
	return ue(e, ",");
}
function pe(e) {
	var t = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(e);
	return !t || t.length < 4 ? {} : {
		prefix: t[1],
		value: t[2],
		suffix: t[3]
	};
}
function me(e) {
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
function he(e, t) {
	return t === void 0 && (t = "-"), e.replace(/([a-z])([A-Z])/g, function(e, n, r) {
		return "" + n + t + r.toLowerCase();
	});
}
function ge() {
	return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function _e(e, t, n) {
	n === void 0 && (n = -1);
	for (var r = e.length, i = 0; i < r; ++i) if (t(e[i], i, e)) return i;
	return n;
}
function ve(e, t, n) {
	var r = _e(e, t);
	return r > -1 ? e[r] : n;
}
var ye = /*#__PURE__*/ function() {
	var e = ge(), t = L && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
	return t ? t.bind(window) : function(t) {
		var n = ge();
		return setTimeout(function() {
			t(n - e);
		}, 1e3 / 60);
	};
}(), be = /*#__PURE__*/ function() {
	var e = L && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
	return e ? e.bind(window) : function(e) {
		clearTimeout(e);
	};
}();
function xe(e) {
	return Object.keys(e);
}
function Se(e, t) {
	var n = me(e), r = n.value, i = n.unit;
	if (re(t)) {
		var a = t[i];
		if (a) {
			if (ae(a)) return a(r);
			if (ee[i]) return ee[i](r, a);
		}
	} else if (i === "%") return r * t / 100;
	return ee[i] ? ee[i](r) : r;
}
function Ce(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function we(e, t, n, r) {
	return r === void 0 && (r = e[0] / e[1]), [[W(t[0], 1e-7), W(t[0] / r, 1e-7)], [W(t[1] * r, 1e-7), W(t[1], 1e-7)]].filter(function(e) {
		return e.every(function(e, r) {
			var i = t[r], a = W(i, 1e-7);
			return n ? e <= i || e <= a : e >= i || e >= a;
		});
	})[0] || e;
}
function Te(e, t, n, r) {
	if (!r) return e.map(function(e, r) {
		return Ce(e, t[r], n[r]);
	});
	var i = e[0], a = e[1], o = r === !0 ? i / a : r, s = we(e, t, !1, o), c = s[0], l = s[1], u = we(e, n, !0, o), d = u[0], f = u[1];
	return i < c || a < l ? (i = c, a = l) : (i > d || a > f) && (i = d, a = f), [i, a];
}
function Ee(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return n;
}
function De(e) {
	for (var t = e.length, n = 0, r = t - 1; r >= 0; --r) n += e[r];
	return t ? n / t : 0;
}
function Oe(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function ke(e) {
	return [0, 1].map(function(t) {
		return De(e.map(function(e) {
			return e[t];
		}));
	});
}
function Ae(e) {
	var t = ke(e), n = Oe(t, e[0]), r = Oe(t, e[1]);
	return n < r && r - n < Math.PI || n > r && r - n < -Math.PI ? 1 : -1;
}
function je(e, t) {
	return Math.sqrt(((t ? t[0] : 0) - e[0]) ** 2 + ((t ? t[1] : 0) - e[1]) ** 2);
}
function W(e, t) {
	if (!t) return e;
	var n = 1 / t;
	return Math.round(e / t) / n;
}
function Me(e, t) {
	return e.forEach(function(n, r) {
		e[r] = W(e[r], t);
	}), e;
}
function Ne(e) {
	for (var t = [], n = 0; n < e; ++n) t.push(n);
	return t;
}
function Pe(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function Fe(e, t) {
	return e.classList ? e.classList.contains(t) : !!e.className.match(RegExp("(\\s|^)" + t + "(\\s|$)"));
}
function Ie(e, t) {
	e.classList ? e.classList.add(t) : e.className += " " + t;
}
function Le(e, t) {
	if (e.classList) e.classList.remove(t);
	else {
		var n = RegExp("(\\s|^)" + t + "(\\s|$)");
		e.className = e.className.replace(n, " ");
	}
}
function Re(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function ze(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
function Be(e) {
	return e?.ownerDocument || R;
}
function Ve(e) {
	return Be(e).documentElement;
}
function He(e) {
	return Be(e).body;
}
function Ue(e) {
	return e?.ownerDocument?.defaultView || window;
}
function We(e) {
	return e && "postMessage" in e && "blur" in e && "self" in e;
}
function Ge(e) {
	return re(e) && e.nodeName && e.nodeType && "ownerDocument" in e;
}
//#endregion
//#region node_modules/@scena/matrix/dist/matrix.esm.js
function Ke(e, t, n, r, i, a) {
	for (var o = 0; o < i; ++o) {
		var s = n + o * i, c = r + o * i;
		e[s] += e[c] * a, t[s] += t[c] * a;
	}
}
function qe(e, t, n, r, i) {
	for (var a = 0; a < i; ++a) {
		var o = n + a * i, s = r + a * i, c = e[o], l = t[o];
		e[o] = e[s], e[s] = c, t[o] = t[s], t[s] = l;
	}
}
function Je(e, t, n, r, i) {
	for (var a = 0; a < r; ++a) {
		var o = n + a * r;
		e[o] /= i, t[o] /= i;
	}
}
function Ye(e, t, n) {
	n === void 0 && (n = Math.sqrt(e.length));
	for (var r = e.slice(), i = 0; i < n; ++i) r[i * n + t - 1] = 0, r[(t - 1) * n + i] = 0;
	return r[(t - 1) * (n + 1)] = 1, r;
}
function Xe(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = e.slice(), r = ht(t), i = 0; i < t; ++i) {
		var a = t * i + i;
		if (!W(n[a], 1e-7)) {
			for (var o = i + 1; o < t; ++o) if (n[t * i + o]) {
				qe(n, r, i, o, t);
				break;
			}
		}
		if (!W(n[a], 1e-7)) return [];
		Je(n, r, i, t, n[a]);
		for (var o = 0; o < t; ++o) {
			var s = o, c = n[o + i * t];
			!W(c, 1e-7) || i === o || Ke(n, r, s, i, t, -c);
		}
	}
	return r;
}
function Ze(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = 0; r < t; ++r) for (var i = 0; i < t; ++i) n[i * t + r] = e[t * r + i];
	return n;
}
function Qe(e, t) {
	t === void 0 && (t = Math.sqrt(e.length));
	for (var n = [], r = e[t * t - 1], i = 0; i < t - 1; ++i) n[i] = e[t * (t - 1) + i] / r;
	return n[t - 1] = 0, n;
}
function $e(e, t) {
	for (var n = ht(t), r = 0; r < t - 1; ++r) n[t * (t - 1) + r] = e[r] || 0;
	return n;
}
function et(e, t) {
	for (var n = e.slice(), r = e.length; r < t - 1; ++r) n[r] = 0;
	return n[t - 1] = 1, n;
}
function tt(e, t, n) {
	if (t === void 0 && (t = Math.sqrt(e.length)), t === n) return e;
	for (var r = ht(n), i = Math.min(t, n), a = 0; a < i - 1; ++a) {
		for (var o = 0; o < i - 1; ++o) r[a * n + o] = e[a * t + o];
		r[(a + 1) * n - 1] = e[(a + 1) * t - 1], r[(n - 1) * n + a] = e[(t - 1) * t + a];
	}
	return r[n * n - 1] = e[t * t - 1], r;
}
function nt(e) {
	var t = [...arguments].slice(1), n = ht(e);
	return t.forEach(function(t) {
		n = rt(n, t, e);
	}), n;
}
function rt(e, t, n) {
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
function G(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] + t[i];
	return r;
}
function K(e, t) {
	for (var n = Math.min(e.length, t.length), r = e.slice(), i = 0; i < n; ++i) r[i] = r[i] - t[i];
	return r;
}
function it(e, t) {
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
function at(e, t) {
	return t === void 0 && (t = e.length === 9), t ? [
		e[0],
		e[1],
		e[3],
		e[4],
		e[6],
		e[7]
	] : e;
}
function ot(e, t, n) {
	n === void 0 && (n = t.length);
	var r = rt(e, t, n), i = r[n - 1];
	return r.map(function(e) {
		return e / i;
	});
}
function st(e, t) {
	return rt(e, [
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
function ct(e, t) {
	return rt(e, [
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
function lt(e, t) {
	return rt(e, mt(t, 4));
}
function ut(e, t) {
	var n = t[0], r = n === void 0 ? 1 : n, i = t[1], a = i === void 0 ? 1 : i, o = t[2];
	return rt(e, [
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
function dt(e, t) {
	return ot(mt(t, 3), et(e, 3));
}
function ft(e, t) {
	var n = t[0], r = n === void 0 ? 0 : n, i = t[1], a = i === void 0 ? 0 : i, o = t[2];
	return rt(e, [
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
function pt(e, t) {
	return rt(e, t, 4);
}
function mt(e, t) {
	var n = Math.cos(e), r = Math.sin(e), i = ht(t);
	return i[0] = n, i[1] = r, i[t] = -r, i[t + 1] = n, i;
}
function ht(e) {
	for (var t = e * e, n = [], r = 0; r < t; ++r) n[r] = r % (e + 1) ? 0 : 1;
	return n;
}
function gt(e, t) {
	for (var n = ht(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[(t + 1) * i] = e[i];
	return n;
}
function _t(e, t) {
	for (var n = ht(t), r = Math.min(e.length, t - 1), i = 0; i < r; ++i) n[t * (t - 1) + i] = e[i];
	return n;
}
function vt(e, t, n, r, i, a, o, s) {
	var c = e[0], l = e[1], u = t[0], d = t[1], f = n[0], p = n[1], m = r[0], h = r[1], g = i[0], _ = i[1], v = a[0], y = a[1], b = o[0], x = o[1], S = s[0], C = s[1], w = Xe([
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
	var T = rt(w, [
		g,
		_,
		v,
		y,
		b,
		x,
		S,
		C
	], 8);
	return T[8] = 1, tt(Ze(T), 3, 4);
}
//#endregion
//#region node_modules/css-to-mat/dist/css-to-mat.esm.js
var yt = function() {
	return yt = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, yt.apply(this, arguments);
};
function bt() {
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
function xt(e, t) {
	return t === void 0 && (t = 0), Ct(wt(e, t));
}
function St(e, t) {
	var n = ot(e, [
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
function Ct(e) {
	var t = bt();
	return e.forEach(function(e) {
		var n = e.matrixFunction, r = e.functionValue;
		n && (t = n(t, r));
	}), t;
}
function wt(e, t) {
	return t === void 0 && (t = 0), (H(e) ? e : de(e)).map(function(e) {
		var n = pe(e), r = n.prefix, i = n.value, a = null, o = r, s = "";
		if (r === "translate" || r === "translateX" || r === "translate3d") {
			var c = re(t) ? yt(yt({}, t), { "o%": t["%"] }) : {
				"%": t,
				"o%": t
			}, l = fe(i).map(function(e, n) {
				return n === 0 && "x%" in c ? c["%"] = t["x%"] : n === 1 && "y%" in c ? c["%"] = t["y%"] : c["%"] = t["o%"], Se(e, c);
			}), u = l[0], d = l[1], f = d === void 0 ? 0 : d, p = l[2], m = p === void 0 ? 0 : p;
			a = ft, s = [
				u,
				f,
				m
			];
		} else if (r === "translateY") {
			var f = Se(i, re(t) ? yt({ "%": t["y%"] }, t) : { "%": t });
			a = ft, s = [
				0,
				f,
				0
			];
		} else if (r === "translateZ") {
			var m = parseFloat(i);
			a = ft, s = [
				0,
				0,
				m
			];
		} else if (r === "scale" || r === "scale3d") {
			var h = fe(i).map(function(e) {
				return parseFloat(e);
			}), g = h[0], _ = h[1], v = _ === void 0 ? g : _, y = h[2], b = y === void 0 ? 1 : y;
			a = ut, s = [
				g,
				v,
				b
			];
		} else if (r === "scaleX") {
			var g = parseFloat(i);
			a = ut, s = [
				g,
				1,
				1
			];
		} else if (r === "scaleY") {
			var v = parseFloat(i);
			a = ut, s = [
				1,
				v,
				1
			];
		} else if (r === "scaleZ") {
			var b = parseFloat(i);
			a = ut, s = [
				1,
				1,
				b
			];
		} else if (r === "rotate" || r === "rotateZ" || r === "rotateX" || r === "rotateY") {
			var x = me(i), S = x.unit, C = x.value, w = S === "rad" ? C : C * Math.PI / 180;
			r === "rotate" || r === "rotateZ" ? (o = "rotateZ", a = lt) : r === "rotateX" ? a = st : r === "rotateY" && (a = ct), s = w;
		} else if (r === "matrix3d") a = pt, s = fe(i).map(function(e) {
			return parseFloat(e);
		});
		else if (r === "matrix") {
			var T = fe(i).map(function(e) {
				return parseFloat(e);
			});
			a = pt, s = [
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
var Tt = /*#__PURE__*/ function() {
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
}(), Et = /*#__PURE__*/ function() {
	function e() {
		this.object = {};
	}
	var t = e.prototype;
	return t.get = function(e) {
		return this.object[e];
	}, t.set = function(e, t) {
		this.object[e] = t;
	}, e;
}(), Dt = typeof Map == "function", Ot = /*#__PURE__*/ function() {
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
function kt(e, t) {
	var n = [], r = [];
	return e.forEach(function(e) {
		var t = e[0], i = e[1], a = new Ot();
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
var At = /*#__PURE__*/ function() {
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
		var e = kt(this.changedBeforeAdded, this.fixed), t = this.changed, n = [];
		this.cacheOrdered = e.filter(function(e, r) {
			var i = e[0], a = e[1], o = t[r], s = o[0], c = o[1];
			if (i !== a) return n.push([s, c]), !0;
		}), this.cachePureChanged = n;
	}, e;
}();
function jt(e, t, n) {
	var r = Dt ? Map : n ? Et : Tt, i = n || function(e) {
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
	}), o.reverse(), new At(e, t, a, o, h, s, f, p);
}
var Mt = /*#__PURE__*/ function() {
	function e(e, t) {
		e === void 0 && (e = []), this.findKeyCallback = t, this.list = [].slice.call(e);
	}
	var t = e.prototype;
	return t.update = function(e) {
		var t = [].slice.call(e), n = jt(this.list, t, this.findKeyCallback);
		return this.list = t, n;
	}, e;
}(), Nt = function(e, t) {
	return Nt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Nt(e, t);
};
function Pt(e, t) {
	Nt(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Ft = typeof Map == "function" ? void 0 : function() {
	var e = 0;
	return function(t) {
		return t.__DIFF_KEY__ ||= ++e;
	};
}(), It = /*#__PURE__*/ function(e) {
	Pt(t, e);
	function t(t) {
		return t === void 0 && (t = []), e.call(this, t, Ft) || this;
	}
	return t;
}(Mt);
function Lt(e, t) {
	return jt(e, t, Ft);
}
//#endregion
//#region node_modules/@scena/event-emitter/dist/event-emitter.esm.js
var Rt = function() {
	return Rt = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Rt.apply(this, arguments);
};
function zt() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
var Bt = /*#__PURE__*/ function() {
	function e() {
		this._events = {};
	}
	var t = e.prototype;
	return t.on = function(e, t) {
		if (re(e)) for (var n in e) this.on(n, e[n]);
		else this._addEvent(e, t, {});
		return this;
	}, t.off = function(e, t) {
		if (!e) this._events = {};
		else if (re(e)) for (var n in e) this.off(n);
		else if (!t) this._events[e] = [];
		else {
			var r = this._events[e];
			if (r) {
				var i = _e(r, function(e) {
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
		}, t.currentTarget = this, zt(r).forEach(function(r) {
			r.listener(t), r.once && n.off(e, r.listener);
		}), !i;
	}, t.trigger = function(e, t) {
		return t === void 0 && (t = {}), this.emit(e, t);
	}, t._addEvent = function(e, t, n) {
		var r = this._events;
		r[e] = r[e] || [], r[e].push(Rt({ listener: t }, n));
	}, e;
}(), Vt = function(e, t) {
	return Vt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Vt(e, t);
};
function Ht(e, t) {
	Vt(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Ut = function() {
	return Ut = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Ut.apply(this, arguments);
};
function Wt(e) {
	var t = e.container;
	return t === document.body ? [t.scrollLeft || document.documentElement.scrollLeft, t.scrollTop || document.documentElement.scrollTop] : [t.scrollLeft, t.scrollTop];
}
function Gt(e, t) {
	return e.addEventListener("scroll", t), function() {
		e.removeEventListener("scroll", t);
	};
}
function Kt(e) {
	if (!e) return null;
	if (U(e)) return document.querySelector(e);
	if (ae(e)) return e();
	if (e instanceof Element) return e;
	if ("current" in e) return e.current;
	if ("value" in e) return e.value;
}
var qt = /*#__PURE__*/ function(e) {
	Ht(t, e);
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
		var n = Kt(t.container);
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
			return s.top > r - a ? (c[1] > s.top || r < c[1]) && (l[1] = -1) : s.top + s.height < r + a && (c[1] < s.top + s.height || r > c[1]) && (l[1] = 1), s.left > n - a ? (c[0] > s.left || n < c[0]) && (l[0] = -1) : s.left + s.width < n + a && (c[0] < s.left + s.width || n > c[0]) && (l[0] = 1), !l[0] && !l[1] ? !1 : this._continueDrag(Ut(Ut({}, t), {
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
		return (r === void 0 ? Wt : r)({
			container: Kt(n),
			direction: e
		});
	}, n._continueDrag = function(e) {
		var t = this, n, r = e.container, i = e.direction, a = e.throttleTime, o = e.useScroll, s = e.isDrag, c = e.inputEvent;
		if (!(!this._flag || s && this._isWait)) {
			var l = ge(), u = Math.max(a + this._prevTime - l, 0);
			if (u > 0) return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
				t._continueDrag(e);
			}, u), !1;
			this._prevTime = l;
			var d = this._getScrollPosition(i, e);
			this._prevScrollPos = d, s && (this._isWait = !0), o || (this._lock = !0);
			var f = {
				container: Kt(r),
				direction: i,
				inputEvent: c
			};
			return (n = e.requestScroll) == null || n.call(e, f), this.emit("scroll", f), this._isWait = !1, o || this.checkScroll(Ut(Ut({}, e), {
				prevScrollPos: d,
				direction: i,
				inputEvent: c
			}));
		}
	}, n._registerScrollEvent = function(e) {
		this._unregisterScrollEvent();
		var t = e.checkScrollEvent;
		if (t) {
			var n = t === !0 ? Gt : t, r = Kt(e.container);
			t === !0 && (r === document.body || r === document.documentElement) ? this._unregister = Gt(window, this._onScroll) : this._unregister = n(r, this._onScroll);
		}
	}, n._unregisterScrollEvent = function() {
		var e;
		(e = this._unregister) == null || e.call(this), this._unregister = null;
	}, t;
}(Bt);
//#endregion
//#region node_modules/overlap-area/dist/overlap-area.esm.js
function Jt() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function Yt(e) {
	return W(e, B);
}
function Xt(e, t) {
	return e.every(function(e, n) {
		return Yt(e - t[n]) === 0;
	});
}
function Zt(e, t) {
	return !Yt(e[0] - t[0]) && !Yt(e[1] - t[1]);
}
function Qt(e) {
	return e.length < 3 ? 0 : Math.abs(Ee(e.map(function(t, n) {
		var r = e[n + 1] || e[0];
		return t[0] * r[1] - r[0] * t[1];
	}))) / 2;
}
function $t(e, t) {
	var n = t.width, r = t.height, i = t.left, a = t.top, o = en(e), s = o.minX, c = o.minY, l = o.maxX, u = o.maxY, d = n / (l - s), f = r / (u - c);
	return e.map(function(e) {
		return [i + (e[0] - s) * d, a + (e[1] - c) * f];
	});
}
function en(e) {
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
function tn(e, t, n) {
	var r = e[0], i = e[1], a = en(t), o = a.minX, s = a.maxX, c = [[o, i], [s, i]], l = nn(c[0], c[1]), u = on(t), d = [];
	if (u.forEach(function(t) {
		var n = nn(t[0], t[1]), r = t[0];
		Xt(l, n) ? d.push({
			pos: e,
			line: t,
			type: "line"
		}) : an(rn(l, n), [c, t]).forEach(function(e) {
			t.some(function(t) {
				return Zt(t, e);
			}) ? d.push({
				pos: e,
				line: t,
				type: "point"
			}) : Yt(r[1] - i) !== 0 && d.push({
				pos: e,
				line: t,
				type: "intersection"
			});
		});
	}), !n && ve(d, function(e) {
		return e[0] === r;
	})) return !0;
	var f = 0, p = {};
	return d.forEach(function(e) {
		var t = e.pos, n = e.type, a = e.line;
		if (!(t[0] > r)) {
			if (n === "intersection") ++f;
			else if (n === "line") return;
			else if (n === "point") {
				var o = ve(a, function(e) {
					return e[1] !== i;
				}), s = p[t[0]], c = o[1] > i ? 1 : -1;
				s ? s !== c && ++f : p[t[0]] = c;
			}
		}
	}), f % 2 == 1;
}
function nn(e, t) {
	var n = e[0], r = e[1], i = t[0], a = t[1], o = i - n, s = a - r;
	Math.abs(o) < 1e-7 && (o = 0), Math.abs(s) < 1e-7 && (s = 0);
	var c = 0, l = 0, u = 0;
	return o ? s ? (c = -s / o, l = 1, u = -c * n - r) : (l = 1, u = -r) : s && (c = -1, u = n), [
		c,
		l,
		u
	];
}
function rn(e, t) {
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
function an(e, t) {
	var n = t.map(function(e) {
		return [0, 1].map(function(t) {
			return [Math.min(e[0][t], e[1][t]), Math.max(e[0][t], e[1][t])];
		});
	}), r = [];
	if (e.length === 2) {
		var i = e[0], a = i[0], o = i[1];
		if (!Yt(a - e[1][0])) {
			var s = Math.max.apply(Math, n.map(function(e) {
				return e[1][0];
			})), c = Math.min.apply(Math, n.map(function(e) {
				return e[1][1];
			}));
			if (Yt(s - c) > 0) return [];
			r = [[a, s], [a, c]];
		} else if (!Yt(o - e[1][1])) {
			var l = Math.max.apply(Math, n.map(function(e) {
				return e[0][0];
			})), u = Math.min.apply(Math, n.map(function(e) {
				return e[0][1];
			}));
			if (Yt(l - u) > 0) return [];
			r = [[l, o], [u, o]];
		}
	}
	return r.length || (r = e.filter(function(e) {
		var t = e[0], r = e[1];
		return n.every(function(e) {
			return 0 <= Yt(t - e[0][0]) && 0 <= Yt(e[0][1] - t) && 0 <= Yt(r - e[1][0]) && 0 <= Yt(e[1][1] - r);
		});
	})), r.map(function(e) {
		return [Yt(e[0]), Yt(e[1])];
	});
}
function on(e) {
	return Jt(e.slice(1), [e[0]]).map(function(t, n) {
		return [e[n], t];
	});
}
function sn(e, t) {
	var n = e.slice(), r = t.slice();
	Ae(n) === -1 && n.reverse(), Ae(r) === -1 && r.reverse();
	var i = on(n), a = on(r), o = i.map(function(e) {
		return nn(e[0], e[1]);
	}), s = a.map(function(e) {
		return nn(e[0], e[1]);
	}), c = [];
	o.forEach(function(e, t) {
		var n = i[t], o = [];
		s.forEach(function(r, i) {
			var s = an(rn(e, r), [n, a[i]]);
			o.push.apply(o, s.map(function(e) {
				return {
					index1: t,
					index2: i,
					pos: e,
					type: "intersection"
				};
			}));
		}), o.sort(function(e, t) {
			return je(n[0], e.pos) - je(n[0], t.pos);
		}), c.push.apply(c, o), tn(n[1], r) && c.push({
			index1: t,
			index2: -1,
			pos: n[1],
			type: "inside"
		});
	}), a.forEach(function(e, t) {
		if (tn(e[1], n)) {
			var r = !1, i = _e(c, function(e) {
				return e.index2 === t ? (r = !0, !1) : !!r;
			});
			i === -1 && (r = !1, i = _e(c, function(e) {
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
function cn(e, t) {
	return sn(e, t).map(function(e) {
		return e.pos;
	});
}
function ln(e, t) {
	return Qt(cn(e, t));
}
//#endregion
//#region node_modules/gesto/dist/gesto.esm.js
var un = function(e, t) {
	return un = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, un(e, t);
};
function dn(e, t) {
	un(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var fn = function() {
	return fn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, fn.apply(this, arguments);
};
function pn(e, t) {
	var n = t[0] - e[0], r = t[1] - e[1], i = Math.atan2(r, n);
	return i >= 0 ? i : i + Math.PI * 2;
}
function mn(e) {
	return pn([e[0].clientX, e[0].clientY], [e[1].clientX, e[1].clientY]) / Math.PI * 180;
}
function hn(e) {
	return e.touches && e.touches.length >= 2;
}
function gn(e) {
	return e ? e.touches ? bn(e.touches) : [xn(e)] : [];
}
function _n(e) {
	return e && (e.type.indexOf("mouse") > -1 || "button" in e);
}
function vn(e, t, n) {
	var r = n.length, i = Sn(e, r), a = i.clientX, o = i.clientY, s = i.originalClientX, c = i.originalClientY, l = Sn(t, r), u = l.clientX, d = l.clientY, f = Sn(n, r), p = f.clientX, m = f.clientY;
	return {
		clientX: s,
		clientY: c,
		deltaX: a - u,
		deltaY: o - d,
		distX: a - p,
		distY: o - m
	};
}
function yn(e) {
	return Math.sqrt((e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2);
}
function bn(e) {
	for (var t = Math.min(e.length, 2), n = [], r = 0; r < t; ++r) n.push(xn(e[r]));
	return n;
}
function xn(e) {
	return {
		clientX: e.clientX,
		clientY: e.clientY
	};
}
function Sn(e, t) {
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
var Cn = /* @__PURE__ */ function() {
	function e(e) {
		this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = e, this.prevClients = e, this.length = e.length;
	}
	return e.prototype.getAngle = function(e) {
		return e === void 0 && (e = this.prevClients), mn(e);
	}, e.prototype.getRotation = function(e) {
		return e === void 0 && (e = this.prevClients), mn(e) - mn(this.startClients);
	}, e.prototype.getPosition = function(e, t) {
		e === void 0 && (e = this.prevClients);
		var n = vn(e || this.prevClients, this.prevClients, this.startClients), r = n.deltaX, i = n.deltaY;
		return this.movement += Math.sqrt(r * r + i * i), this.prevClients = e, n;
	}, e.prototype.getPositions = function(e) {
		e === void 0 && (e = this.prevClients);
		for (var t = this.prevClients, n = this.startClients, r = Math.min(this.length, t.length), i = [], a = 0; a < r; ++a) i[a] = vn([e[a]], [t[a]], [n[a]]);
		return i;
	}, e.prototype.getMovement = function(e) {
		var t = this.movement;
		if (!e) return t;
		var n = Sn(e, this.length), r = Sn(this.prevClients, this.length), i = n.clientX - r.clientX, a = n.clientY - r.clientY;
		return Math.sqrt(i * i + a * a) + t;
	}, e.prototype.getDistance = function(e) {
		return e === void 0 && (e = this.prevClients), yn(e);
	}, e.prototype.getScale = function(e) {
		return e === void 0 && (e = this.prevClients), yn(e) / yn(this.startClients);
	}, e.prototype.move = function(e, t) {
		this.startClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		}), this.prevClients.forEach(function(n) {
			n.clientX -= e, n.clientY -= t;
		});
	}, e;
}(), wn = ["textarea", "input"], Tn = /* @__PURE__ */ function(e) {
	dn(t, e);
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
							var y = v.tagName.toLowerCase(), b = wn.indexOf(y) > -1, x = v.isContentEditable;
							if (b || x) {
								if (u || !d && _ === v) return !1;
								if (_ && (_ === v || x && _.isContentEditable && _.contains(v))) if (d) v.blur();
								else return !1;
							} else if ((l || e.type === "touchstart") && _) {
								var S = _.tagName.toLowerCase();
								(_.isContentEditable || wn.indexOf(S) > -1) && _.blur();
							}
							(f || p || m) && Re(r._window, "click", r._onClick, !0);
						}
						r.clientStores = [new Cn(gn(e))], r._isIdle = !1, r.flag = !0, r.isDrag = !1, r._isTrusted = t, r._dragFlag = !0, r._prevInputEvent = e, r.data = {}, r.doubleFlag = ge() - r.prevTime < 200, r._isMouseEvent = _n(e), !r._isMouseEvent && r._preventMouseEvent && r._allowMouseEvent(), (r._preventMouseEvent || r.emit("dragStart", fn(fn({
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
						Re(a, "touchstart", r.onDragStart, { passive: !1 });
					}))) : h && o && ze(a, "touchstart", r.onDragStart), r.flag && hn(e)) {
						if (clearTimeout(C), g && e.touches.length !== e.changedTouches.length) return;
						r.pinchFlag || r.onPinchStart(e);
					}
				}
			}
		}, r.onDrag = function(e, t) {
			if (r.flag) {
				var n = r.options.preventDefault;
				!r._isMouseEvent && n && e.preventDefault(), r._prevInputEvent = e;
				var i = gn(e), a = r.moveClients(i, e, !1);
				if (r._dragFlag) {
					if ((r.pinchFlag || a.deltaX || a.deltaY) && (r._preventMouseEvent || r.emit("drag", fn(fn({}, a), {
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
				}), !s && !o && a && !c && r._allowClickEvent(), r._useTouch && n && ze(i, "touchstart", r.onDragStart), r.pinchFlag && r.onPinchEnd(e);
				var l = e?.touches ? gn(e) : [];
				l.length === 0 || !r.options.keepDragging ? r.flag = !1 : r._addStore(new Cn(l));
				var u = r._getPosition(), d = ge(), f = !c && r.doubleFlag;
				r._prevInputEvent = null, r.prevTime = c || f ? 0 : d, r.flag || (r._dettachDragEvent(), r._preventMouseEvent || r.emit("dragEnd", fn({
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
			ze(r._window, "click", r._onClick, !0);
		}, r._onClick = function(e) {
			r._allowClickEvent(), r._allowMouseEvent();
			var t = r.options.preventClickEventByCondition;
			t?.(e) || (e.stopPropagation(), e.preventDefault());
		}, r._onContextMenu = function(e) {
			r.options.preventRightClick ? r.onDragEnd(e) : e.preventDefault();
		}, r._passCallback = function() {};
		var i = [].concat(t), a = i[0];
		r._window = We(a) ? a : Ue(a), r.options = fn({
			checkInput: !1,
			container: a && !("document" in a) ? Ue(a) : a,
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
			Re(e, "dragstart", r.onDragStart);
		}), r._useMouse && (i.forEach(function(e) {
			Re(e, "mousedown", r.onDragStart), Re(e, "mousemove", r._passCallback);
		}), Re(s, "contextmenu", r._onContextMenu)), l && Re(Ue(), "blur", r.onBlur), r._useTouch) {
			var u = { passive: !1 };
			i.forEach(function(e) {
				Re(e, "touchstart", r.onDragStart, u), Re(e, "touchmove", r._passCallback, u);
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
		return e === void 0 && (e = this._prevInputEvent), fn(fn({
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
		this.off(), ze(this._window, "blur", this.onBlur), this._useDrag && t.forEach(function(t) {
			ze(t, "dragstart", e.onDragStart);
		}), this._useMouse && (t.forEach(function(t) {
			ze(t, "mousedown", e.onDragStart);
		}), ze(n, "contextmenu", this._onContextMenu)), this._useTouch && (t.forEach(function(t) {
			ze(t, "touchstart", e.onDragStart);
		}), ze(n, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
	}, t.prototype.onPinchStart = function(e) {
		var t = this, n = this.options.pinchThreshold;
		if (!(this.isDrag && this.getMovement() > n)) {
			var r = new Cn(gn(e));
			this.pinchFlag = !0, this._addStore(r), this.emit("pinchStart", fn(fn({
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
			this.isPinch = !0, this.emit("pinch", fn(fn({
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
			this.emit("pinchEnd", fn(fn({
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
		return !i && this.isDrag && (a = !0), fn(fn({
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
		return fn(fn({}, n), {
			distX: i,
			distY: a
		});
	}, t.prototype._attchDragEvent = function() {
		var e = this._window, t = this.options.container, n = { passive: !1 };
		this._isDragAPI && (Re(t, "dragover", this.onDrag, n), Re(e, "dragend", this.onDragEnd)), this._useMouse && (Re(t, "mousemove", this.onDrag), Re(e, "mouseup", this.onDragEnd)), this._useTouch && (Re(t, "touchmove", this.onDrag, n), Re(e, "touchend", this.onDragEnd, n), Re(e, "touchcancel", this.onDragEnd, n));
	}, t.prototype._dettachDragEvent = function() {
		var e = this._window, t = this.options.container;
		this._isDragAPI && (ze(t, "dragover", this.onDrag), ze(e, "dragend", this.onDragEnd)), this._useMouse && (ze(t, "mousemove", this.onDrag), ze(e, "mouseup", this.onDragEnd)), this._useTouch && (ze(t, "touchstart", this.onDragStart), ze(t, "touchmove", this.onDrag), ze(e, "touchend", this.onDragEnd), ze(e, "touchcancel", this.onDragEnd));
	}, t.prototype._allowMouseEvent = function() {
		this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
	}, t;
}(Bt);
//#endregion
//#region node_modules/css-styled/dist/styled.esm.js
function En(e) {
	for (var t = 5381, n = e.length; n;) t = t * 33 ^ e.charCodeAt(--n);
	return t >>> 0;
}
var Dn = En;
function On(e) {
	return Dn(e).toString(36);
}
function kn(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function An(e, t, n) {
	return n.original ? t : t.replace(/([^};{\s}][^};{]*|^\s*){/gm, function(t, n) {
		var r = n.trim();
		return (r ? fe(r) : [""]).map(function(t) {
			var n = t.trim();
			return n.indexOf("@") === 0 ? n : n.indexOf(":global") > -1 ? n.replace(/\:global/g, "") : n.indexOf(":host") > -1 ? `${n.replace(/\:host/g, `.${e}`)}` : n ? `.${e} ${n}` : `.${e}`;
		}).join(", ") + " {";
	});
}
function jn(e, t, n, r, i) {
	var a = Be(r), o = a.createElement("style");
	return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", e), o.setAttribute("data-styled-count", "1"), n.nonce && o.setAttribute("nonce", n.nonce), o.innerHTML = An(e, t, n), (i || a.head || a.body).appendChild(o), o;
}
function Mn(e) {
	var t = "rCS" + On(e);
	return {
		className: t,
		inject: function(n, r) {
			r === void 0 && (r = {});
			var i = kn(n), a = (i || n.ownerDocument || document).querySelector(`style[data-styled-id="${t}"]`);
			if (!a) a = jn(t, e, r, n, i);
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
var Nn = function() {
	return Nn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Nn.apply(this, arguments);
};
function Pn(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Fn(e, t) {
	var n = Mn(t), r = n.className;
	return (0, c.forwardRef)(function(t, i) {
		var a = t.className, o = a === void 0 ? "" : a;
		t.cspNonce;
		var s = Pn(t, ["className", "cspNonce"]), l = (0, c.useRef)();
		return (0, c.useImperativeHandle)(i, function() {
			return l.current;
		}, []), (0, c.useEffect)(function() {
			var e = n.inject(l.current, { nonce: t.cspNonce });
			return function() {
				e.destroy();
			};
		}, []), (0, c.createElement)(e, Nn({
			ref: l,
			"data-styled-id": r,
			className: `${o} ${r}`
		}, s));
	});
}
//#endregion
//#region node_modules/react-moveable/dist/moveable.esm.js
var In = function(e, t) {
	return In = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, In(e, t);
};
function Ln(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	In(e, t);
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
function Rn(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function zn(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
function Bn(e) {
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
function Vn(e, t) {
	return q({
		events: [],
		props: [],
		name: e
	}, t);
}
var Hn = [
	"n",
	"w",
	"s",
	"e"
], Un = [
	"n",
	"w",
	"s",
	"e",
	"nw",
	"ne",
	"sw",
	"se"
];
function Wn(e, t) {
	return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${32 * e}px" height="${32 * e}px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${t}deg);transform-origin: 16px 16px"></path></svg>`;
}
function Gn(e) {
	var t = Wn(1, e), n = Math.round(e / 45) * 45 % 180, r = "ns-resize";
	return n === 135 ? r = "nwse-resize" : n === 45 ? r = "nesw-resize" : n === 90 && (r = "ew-resize"), `cursor:${r};cursor: url('${t}') 16 16, ${r};`;
}
var Kn = D(), qn = Kn.browser.webkit, Jn = qn && (function() {
	var e = typeof window > "u" ? { userAgent: "" } : window.navigator, t = /applewebkit\/([^\s]+)/g.exec(e.userAgent.toLowerCase());
	return t ? parseFloat(t[1]) < 605 : !1;
})(), Yn = Kn.browser.name, Xn = parseInt(Kn.browser.version, 10), Zn = Yn === "chrome", Qn = Kn.browser.chromium, $n = parseInt(Kn.browser.chromiumVersion, 10) || 0, er = Zn && Xn >= 109 || Qn && $n >= 109, tr = Yn === "firefox", nr = parseInt(Kn.browser.webkitVersion, 10) >= 612 || Xn >= 15, rr = "moveable-", ir = `
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
${Un.map(function(e) {
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
${Gn(e)}
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

${Jn ? ":global svg *:before {\ncontent:\"\";\ntransform-origin: inherit;\n}" : ""}
`, ar = [
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
], or = 1e-4, sr = 1e-7, cr = 1e-9, lr = 10 ** 10, ur = -lr, dr = {
	n: [0, -1],
	e: [1, 0],
	s: [0, 1],
	w: [-1, 0],
	nw: [-1, -1],
	ne: [1, -1],
	sw: [-1, 1],
	se: [1, 1]
}, fr = {
	n: [0, 1],
	e: [1, 3],
	s: [3, 2],
	w: [2, 0],
	nw: [0],
	ne: [1],
	sw: [2],
	se: [3]
}, pr = {
	n: 0,
	s: 180,
	w: 270,
	e: 90,
	nw: 315,
	ne: 45,
	sw: 225,
	se: 135
}, mr = [
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
function hr(e, t, n, r, i, a) {
	a === void 0 && (a = "draggable");
	var o = t.gestos[a]?.move(n, e.inputEvent) ?? {}, s = o.originalDatas || o.datas, c = s[a] || (s[a] = {});
	return q(q({}, i ? Ts(t, o) : o), {
		isPinch: !!r,
		parentEvent: !0,
		datas: c,
		originalDatas: e.originalDatas
	});
}
var gr = /* @__PURE__ */ function() {
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
function _r(e, t, n, r) {
	var i = e.length === 16 ? 4 : 3, a = J(Uo(e, n, r, i), 4), o = J(a[0], 2), s = o[0], c = o[1], l = J(a[1], 2), u = l[0], d = l[1], f = J(a[2], 2), p = f[0], m = f[1], h = J(a[3], 2), g = h[0], _ = h[1], v = J(Ho(e, t, i), 2), y = v[0], b = v[1], x = Math.min(s, u, p, g), S = Math.min(c, d, m, _), C = Math.max(s, u, p, g), w = Math.max(c, d, m, _);
	s = s - x || 0, u = u - x || 0, p = p - x || 0, g = g - x || 0, c = c - S || 0, d = d - S || 0, m = m - S || 0, _ = _ - S || 0, y = y - x || 0, b = b - S || 0;
	var T = e[0], E = e[i + 1], D = Ws(T * E);
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
function vr(e, t) {
	var n = t.clientX, r = t.clientY, i = t.datas, a = e.state, o = a.moveableClientRect, s = a.rootMatrix, c = a.is3d, l = a.pos1, u = o.left, d = o.top, f = c ? 4 : 3, p = J(K(ws(s, [n - u, r - d], f), l), 2), m = p[0], h = p[1], g = J(Er({
		datas: i,
		distX: m,
		distY: h
	}), 2);
	return [g[0], g[1]];
}
function yr(e, t) {
	var n = t.datas, r = e.state, i = r.allMatrix, a = r.beforeMatrix, o = r.is3d, s = r.left, c = r.top, l = r.origin, u = r.offsetMatrix, d = r.targetMatrix, f = r.transformOrigin, p = o ? 4 : 3;
	n.is3d = o, n.matrix = i, n.targetMatrix = d, n.beforeMatrix = a, n.offsetMatrix = u, n.transformOrigin = f, n.inverseMatrix = Xe(i, p), n.inverseBeforeMatrix = Xe(a, p), n.absoluteOrigin = et(G([s, c], l), p), n.startDragBeforeDist = ot(n.inverseBeforeMatrix, n.absoluteOrigin, p), n.startDragDist = ot(n.inverseMatrix, n.absoluteOrigin, p);
}
function br(e) {
	return _r(e.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function xr(e, t, n) {
	var r = t.datas, i = t.originalDatas.beforeRenderable, a = r.transformIndex, o = i.nextTransforms, s = o.length, c = i.nextTransformAppendedIndexes, l = -1;
	a === -1 ? (n === "translate" ? l = 0 : n === "rotate" && (l = _e(o, function(e) {
		return e.match(/scale\(/g);
	})), l === -1 && (l = o.length), r.transformIndex = l) : l = ve(c, function(e) {
		return e.index === a && e.functionName === n;
	}) ? a : a + c.filter(function(e) {
		return e.index < a;
	}).length;
	var u = js(o, e.state, l), d = u.targetFunction, f = n === "rotate" ? "rotateZ" : n;
	r.beforeFunctionTexts = u.beforeFunctionTexts, r.afterFunctionTexts = u.afterFunctionTexts, r.beforeTransform = u.beforeFunctionMatrix, r.beforeTransform2 = u.beforeFunctionMatrix2, r.targetTansform = u.targetFunctionMatrix, r.afterTransform = u.afterFunctionMatrix, r.afterTransform2 = u.afterFunctionMatrix2, r.targetAllTransform = u.allFunctionMatrix, d.functionName === f ? (r.afterFunctionTexts.splice(0, 1), r.isAppendTransform = !1) : s > l && (r.isAppendTransform = !0, i.nextTransformAppendedIndexes = Y(Y([], J(c), !1), [{
		functionName: n,
		index: l,
		isAppend: !0
	}], !1));
}
function Sr(e, t, n) {
	return `${e.beforeFunctionTexts.join(" ")} ${e.isAppendTransform ? n : t} ${e.afterFunctionTexts.join(" ")}`;
}
function Cr(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = J(Tr({
		datas: t,
		distX: n,
		distY: r
	}), 2), a = i[0], o = i[1];
	return ot(wr(t, $e([a, o], 4)), et([
		0,
		0,
		0
	], 4), 4);
}
function wr(e, t, n) {
	var r = e.beforeTransform, i = e.afterTransform, a = e.beforeTransform2, o = e.afterTransform2, s = e.targetAllTransform, c = n ? rt(s, t, 4) : rt(t, s, 4);
	return rt(rt(Xe(n ? a : r, 4), c, 4), Xe(n ? o : i, 4), 4);
}
function Tr(e) {
	var t = e.datas, n = e.distX, r = e.distY, i = t.inverseBeforeMatrix, a = t.is3d, o = t.startDragBeforeDist, s = t.absoluteOrigin, c = a ? 4 : 3;
	return K(ot(i, G(s, [n, r]), c), o);
}
function Er(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.inverseBeforeMatrix, o = n.inverseMatrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return K(ot(t ? a : o, G(u, [r, i]), d), t ? c : l);
}
function Dr(e, t) {
	var n = e.datas, r = e.distX, i = e.distY, a = n.beforeMatrix, o = n.matrix, s = n.is3d, c = n.startDragBeforeDist, l = n.startDragDist, u = n.absoluteOrigin, d = s ? 4 : 3;
	return K(ot(t ? a : o, G(t ? c : l, [r, i]), d), u);
}
function Or(e, t, n, r, i, a) {
	return r === void 0 && (r = t), i === void 0 && (i = n), a === void 0 && (a = [0, 0]), e ? e.map(function(e, o) {
		var s = me(e), c = s.value, l = s.unit, u = o ? i : r, d = o ? n : t;
		return e === "%" || isNaN(c) ? d * (u ? a[o] / u : 0) : l === "%" ? d * c / 100 : c;
	}) : a;
}
function kr(e) {
	var t = [];
	return e[1] >= 0 && (e[0] >= 0 && t.push(3), e[0] <= 0 && t.push(2)), e[1] <= 0 && (e[0] >= 0 && t.push(1), e[0] <= 0 && t.push(0)), t;
}
function Ar(e, t) {
	return kr(t).map(function(t) {
		return e[t];
	});
}
function jr(e, t) {
	var n = (t + 1) / 2;
	return [te(e[0][0], e[1][0], n, 1 - n), te(e[0][1], e[1][1], n, 1 - n)];
}
function Mr(e, t) {
	return jr([jr([e[0], e[1]], t[0]), jr([e[2], e[3]], t[0])], t[1]);
}
function Nr(e, t, n, r, i, a) {
	var o = Mr(Uo(t, n, r, i), a);
	return [e[0] - o[0], e[1] - o[1]];
}
function Pr(e, t, n, r) {
	return rt(e, Do(t, r, n), r);
}
function Fr(e, t, n, r) {
	var i = e.transformOrigin, a = e.offsetMatrix, o = e.is3d ? 4 : 3, s;
	if (U(n)) {
		var c = t.beforeTransform, l = t.afterTransform;
		s = tt(r ? xt(n) : rt(rt(c, xt([n]), 4), l, 4), 4, o);
	} else s = n;
	return Pr(a, s, i, o);
}
function Ir(e, t) {
	var n = e.transformOrigin, r = e.offsetMatrix, i = e.is3d, a = e.targetMatrix, o = e.targetAllTransform, s = i ? 4 : 3;
	return Pr(r, rt(o || a, gt(t, s), s), n, s);
}
function Lr(e, t) {
	var n = Vr(t);
	return {
		setTransform: function(r, i) {
			i === void 0 && (i = -1), n.startTransforms = H(r) ? r : de(r), zr(e, t, i);
		},
		setTransformIndex: function(n) {
			zr(e, t, n);
		}
	};
}
function Rr(e, t, n) {
	var r = Vr(t).startTransforms;
	zr(e, t, _e(r, function(e) {
		return e.indexOf(`${n}(`) === 0;
	}));
}
function zr(e, t, n) {
	var r = Vr(t), i = t.datas;
	if (i.transformIndex = n, n !== -1) {
		var a = r.startTransforms[n];
		if (a) {
			var o = e.state;
			i.startValue = wt([a], {
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
function Br(e, t) {
	var n = Vr(e);
	n.nextTransforms = de(t);
}
function Vr(e) {
	return e.originalDatas.beforeRenderable;
}
function Hr(e) {
	return e.originalDatas.beforeRenderable.nextTransforms;
}
function Ur(e) {
	return (Hr(e) || []).join(" ");
}
function Wr(e) {
	return Vr(e).nextStyle;
}
function Gr(e, t, n, r, i) {
	Br(i, t);
	var a = Aa.drag(e, hr(i, e.state, n, r, !1)), o = a ? a.transform : t;
	return q(q({
		transform: t,
		drag: a
	}, fs({ transform: o }, i)), { afterTransform: o });
}
function Kr(e, t, n, r, i, a) {
	return Xr(e, n, r, Fr(e.state, i, t, a));
}
function qr(e, t, n, r, i, a, o) {
	var s = Kr(e, t, n, i, a, o), c = e.state, l = c.left, u = c.top, d = e.props.groupable, f = d ? l : 0, p = d ? u : 0;
	return K(K(r, s), [f, p]);
}
function Jr(e, t, n, r, i, a, o) {
	return qr(e, t, n, r, i, a, o);
}
function Yr(e, t, n) {
	return [t ? -1 + e[0] / (t / 2) : 0, n ? -1 + e[1] / (n / 2) : 0];
}
function Xr(e, t, n, r) {
	r === void 0 && (r = e.state.allMatrix);
	var i = e.state, a = i.width, o = i.height, s = i.is3d ? 4 : 3, c = [a / 2 * (1 + t[0]) + n[0], o / 2 * (1 + t[1]) + n[1]];
	return Ho(r, c, s);
}
function Zr(e, t, n) {
	var r = n.fixedDirection, i = n.fixedPosition, a = n.fixedOffset;
	return qr(e, `rotate(${t}deg)`, r, i, a, n);
}
function Qr(e, t, n, r, i, a) {
	var o = e.props.groupable, s = e.state, c = s.transformOrigin, l = s.offsetMatrix, u = s.is3d, d = s.width, f = s.height, p = s.left, m = s.top, h = a.fixedDirection, g = a.nextTargetMatrix || s.targetMatrix, _ = u ? 4 : 3, v = Or(i, t, n, d, f, c), y = o ? p : 0, b = o ? m : 0;
	return K(Nr(r, Pr(l, g, v, _), t, n, _, h), [y, b]);
}
function $r(e, t) {
	return Mr(ls(e.state), t);
}
function ei(e, t) {
	var n = e.targetGesto, r = e.controlGesto, i;
	return n?.isFlag() && (i = n.getEventData()[t]), !i && r?.isFlag() && (i = r.getEventData()[t]), i || {};
}
function ti(e) {
	if (e && e.getRootNode) {
		var t = e.getRootNode();
		if (t.nodeType === 11) return t;
	}
}
function ni(e) {
	var t = e("scale"), n = e("rotate"), r = e("translate"), i = [];
	return r && r !== "0px" && r !== "none" && i.push(`translate(${r.split(/\s+/).join(",")})`), n && n !== "1" && n !== "none" && i.push(`rotate(${n})`), t && t !== "1" && t !== "none" && i.push(`scale(${t.split(/\s+/).join(",")})`), i;
}
function ri(e, t, n) {
	for (var r = e, i = [], a = Ve(e) || He(e), o = !n && e === t || e === a, s = o, c = !1, l = 3, u, d, f, p = !1, m = No(t, t, !0).offsetParent, h = 1; r && !s;) {
		s = o;
		var g = ui(r), _ = g("position"), v = Mo(r), y = _ === "fixed", b = ni(g), x = it(Eo(v)), S = void 0, C = !1, w = !1, T = 0, E = 0, D = 0, O = 0, k = {
			hasTransform: !1,
			fixedContainer: null
		};
		y && (p = !0, k = Lo(r), m = k.fixedContainer);
		var A = x.length;
		!c && (A === 16 || b.length) && (c = !0, l = 4, Io(i), f &&= tt(f, 3, 4)), c && A === 9 && (x = tt(x, 3, 4));
		var j = Po(r, e), M = j.tagName, N = j.hasOffset, P = j.isSVG, F = j.origin, I = j.targetOrigin, L = j.offset, R = J(L, 2), z = R[0], B = R[1];
		M === "svg" && !r.ownerSVGElement && f && (i.push({
			type: "target",
			target: r,
			matrix: Bo(r, l)
		}), i.push({
			type: "offset",
			target: r,
			matrix: ht(l)
		}));
		var ee = parseFloat(g("zoom")) || 1;
		if (y) S = k.fixedContainer, C = !0;
		else {
			var V = No(r, t, !1, !0, g), te = V.offsetZoom;
			if (S = V.offsetParent, C = V.isEnd, w = V.isStatic, h *= te, (V.isCustomElement || te !== 1) && w) z -= S.offsetLeft, B -= S.offsetTop;
			else if ((tr || er) && V.parentSlotElement) {
				for (var ne = S, re = 0, H = 0; ne && ti(ne);) re += ne.offsetLeft, H += ne.offsetTop, ne = ne.offsetParent;
				z -= re, B -= H;
			}
		}
		if (qn && !nr && N && !P && w && (_ === "relative" || _ === "static") && (z -= S.offsetLeft, B -= S.offsetTop, o ||= C), y) N && k.hasTransform && (D = S.clientLeft, O = S.clientTop);
		else if (N && m !== S && (T = S.clientLeft, E = S.clientTop), N && S === a) {
			var U = Fo(r, !1);
			z += U[0], B += U[1];
		}
		if (i.push({
			type: "target",
			target: r,
			matrix: Do(x, l, F)
		}), b.length && (i.push({
			type: "offset",
			target: r,
			matrix: ht(l)
		}), i.push({
			type: "target",
			target: r,
			matrix: Do(xt(b), l, F)
		})), N) {
			var ie = r === e, ae = ie ? 0 : r.scrollLeft, oe = ie ? 0 : r.scrollTop;
			i.push({
				type: "offset",
				target: r,
				matrix: _t([z - ae + T - D, B - oe + E - O], l)
			});
		} else i.push({
			type: "offset",
			target: r,
			origin: F
		});
		if (ee !== 1 && i.push({
			type: "zoom",
			target: r,
			matrix: Do(gt([ee, ee], l), l, [0, 0])
		}), f ||= x, u ||= F, d ||= I, s || y) break;
		r = S, o = C, (!n || r === a) && (s = o);
	}
	return f ||= ht(l), u ||= [0, 0], d ||= [0, 0], {
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
var ii = null, ai = null, oi = null;
function si(e) {
	e ? (window.Map && (ii = /* @__PURE__ */ new Map(), ai = /* @__PURE__ */ new Map()), oi = []) : (ii = null, oi = null, ai = null);
}
function ci(e) {
	var t = ai?.get(e);
	if (t) return t;
	var n = is(e, !0);
	return ai && ai.set(e, n), n;
}
function li(e, t) {
	if (oi) {
		var n = ve(oi, function(n) {
			return n[0][0] == e && n[0][1] == t;
		});
		if (n) return n[1];
	}
	var r = ri(e, t, !0);
	return oi && oi.push([[e, t], r]), r;
}
function ui(e) {
	var t = ii?.get(e);
	if (!t) {
		var n = Ue(e).getComputedStyle(e);
		if (!ii) return function(e) {
			return n[e];
		};
		t = {
			style: n,
			cached: {}
		}, ii.set(e, t);
	}
	var r = t.cached, i = t.style;
	return function(e) {
		return e in r || (r[e] = i[e]), r[e];
	};
}
function di(e, t, n) {
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
function fi(e, t, n, r, i, a, o) {
	var s = !!n.match(/Start$/g), c = !!n.match(/End$/g), l = i.isPinch, u = i.datas, d = di(e, t.name, i), f = e.moveables, p = [], m = d.map(function(e, i) {
		var d = f[i], m = d.state, h = m.gestos, g = e;
		if (s) g = new gr(o).dragStart(r, e), p.push(g);
		else {
			if (h[o] || (h[o] = u.childGestos[i]), !h[o]) return;
			g = hr(e, m, r, l, a, o), p.push(g);
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
function pi(e, t, n, r, i, a) {
	i === void 0 && (i = function(e, t) {
		return t;
	});
	var o = !!n.match(/End$/g), s = di(e, t.name, r), c = e.moveables;
	return s.map(function(e, r) {
		var s = c[r], l = e;
		l = i(s, e);
		var u = t[n](s, q(q({}, l), { parentFlag: !0 }));
		return u && a && a(s, e, u, r), o && (s.state.gestos = {}), u;
	});
}
function mi(e, t, n, r) {
	var i = n.fixedDirection, a = n.fixedPosition, o = Mr(r.datas.startPositions || ls(t.state), i), s = J(ot(mt(-e.rotation / 180 * Math.PI, 3), [
		o[0] - a[0],
		o[1] - a[1],
		1
	], 3), 2), c = s[0], l = s[1];
	return r.datas.originalX = c, r.datas.originalY = l, r;
}
function hi(e, t, n, r) {
	var i = e.getState(), a = i.renderPoses, o = i.rotation, s = i.direction, c = Qo(e.props, t).zoom, l = po(o / Math.PI * 180), u = {}, d = e.renderState;
	d.renderDirectionMap ||= {};
	var f = d.renderDirectionMap;
	n.forEach(function(e) {
		var t = e.dir;
		u[t] = !0;
	});
	var p = Ws(s);
	return n.map(function(e) {
		var n = e.data, i = e.classNames, s = e.dir, d = fr[s];
		if (!d || !u[s]) return null;
		f[s] = !0;
		var m = (W(l, 15) + p * pr[s] + 720) % 180, h = {};
		return xe(n).forEach(function(e) {
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
			style: Zo.apply(void 0, Y([o, c], J(d.map(function(e) {
				return a[e];
			})), !1))
		}));
	});
}
function gi(e, t, n, r) {
	var i = Qo(e.props, n), a = i.renderDirections, o = a === void 0 ? t : a, s = i.displayAroundControls;
	if (!o) return [];
	var c = o === !0 ? Un : o;
	return Y(Y([], J(s ? Si(e, r, n, c) : []), !1), J(hi(e, n, c.map(function(e) {
		return {
			data: {},
			classNames: [],
			dir: e
		};
	}), r)), !1);
}
function _i(e, t, n, r, i, a) {
	var o = [...arguments].slice(6), s = Oe(n, r), c = t ? W(s / Math.PI * 180, 15) % 180 : -1;
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
		style: Xo(n, r, i, s)
	});
}
function vi(e, t, n, r, i) {
	return (n === !0 ? Hn : n).map(function(n, a) {
		var o = J(fr[n], 2), s = o[0], c = o[1];
		if (c != null) return _i(e, n, r[s], r[c], i, `${t}Edge${a}`, t);
	}).filter(Boolean);
}
function yi(e) {
	return function(t, n) {
		var r = Qo(t.props, e).edge;
		return r && (r === !0 || r.length) ? Y(Y([], J(vi(n, e, r, t.getState().renderPoses, t.props.zoom)), !1), J(xi(t, e, n)), !1) : bi(t, e, n);
	};
}
function bi(e, t, n) {
	return gi(e, Un, t, n);
}
function xi(e, t, n) {
	return gi(e, [
		"nw",
		"ne",
		"sw",
		"se"
	], t, n);
}
function Si(e, t, n, r) {
	var i = e.renderState;
	i.renderDirectionMap ||= {};
	var a = e.getState(), o = a.renderPoses, s = a.rotation, c = a.direction, l = i.renderDirectionMap, u = e.props.zoom, d = Ws(c), f = s / Math.PI * 180;
	return (r || xe(l)).map(function(e) {
		var r = fr[e];
		if (!r) return null;
		var i = (W(f, 15) + d * pr[e] + 720) % 180, a = ["around-control"];
		return n && a.push("direction", n), t.createElement("div", {
			className: X.apply(void 0, Y([], J(a), !1)),
			"data-rotation": i,
			"data-direction": e,
			key: `direction-around-${e}`,
			style: Zo.apply(void 0, Y([s, u], J(r.map(function(e) {
				return o[e];
			})), !1))
		});
	});
}
function Ci(e, t, n) {
	var r = e || {}, i = r.position, a = i === void 0 ? "client" : i, o = r.left, s = o === void 0 ? -Infinity : o, c = r.top, l = c === void 0 ? -Infinity : c, u = r.right, d = u === void 0 ? Infinity : u, f = r.bottom, p = {
		position: a,
		left: s,
		top: l,
		right: d,
		bottom: f === void 0 ? Infinity : f
	};
	return {
		vertical: Ei(p, t, !0),
		horizontal: Ei(p, n, !1)
	};
}
function wi(e, t) {
	var n = e.state, r = n.containerClientRect, i = r.clientHeight, a = r.clientWidth, o = r.clientLeft, s = r.clientTop, c = n.snapOffset, l = c.left, u = c.top, d = c.right, f = c.bottom, p = t || e.props.bounds || {}, m = (p.position || "client") === "css", h = p.left, g = h === void 0 ? -Infinity : h, _ = p.top, v = _ === void 0 ? -Infinity : _, y = p.right, b = y === void 0 ? m ? -Infinity : Infinity : y, x = p.bottom, S = x === void 0 ? m ? -Infinity : Infinity : x;
	return m && (b = a + d - l - b, S = i + f - u - S), {
		left: g + l - o,
		right: b + l - o,
		top: v + u - s,
		bottom: S + u - s
	};
}
function Ti(e, t, n) {
	var r = wi(e), i = r.left, a = r.top, o = r.right, s = r.bottom, c = J(n, 2), l = c[0], u = c[1], d = J(K(n, t), 2), f = d[0], p = d[1];
	$(f) < sr && (f = 0), $(p) < sr && (p = 0);
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
function Ei(e, t, n) {
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
function Di(e, t, n) {
	return (n ? e.map(function(e) {
		return dt(e, n);
	}) : e).some(function(e) {
		return e[0] < t.left && $(e[0] - t.left) > .1 || e[0] > t.right && $(e[0] - t.right) > .1 || e[1] < t.top && $(e[1] - t.top) > .1 || e[1] > t.bottom && $(e[1] - t.bottom) > .1;
	});
}
function Oi(e, t, n) {
	var r = Jo(e), i = Math.sqrt(r * r - t * t) || 0;
	return [i, -i].sort(function(t, r) {
		return $(t - e[+!n]) - $(r - e[+!n]);
	}).map(function(e) {
		return Oe([0, 0], n ? [e, t] : [t, e]);
	});
}
function ki(e, t, n, r, i) {
	if (!e.props.bounds) return [];
	var a = i * Math.PI / 180, o = wi(e), s = o.left, c = o.top, l = o.right, u = o.bottom, d = s - r[0], f = l - r[0], p = c - r[1], m = u - r[1], h = {
		left: d,
		top: p,
		right: f,
		bottom: m
	};
	if (!Di(n, h, 0)) return [];
	var g = [];
	return [
		[d, 0],
		[f, 0],
		[p, 1],
		[m, 1]
	].forEach(function(e) {
		var r = J(e, 2), i = r[0], o = r[1];
		n.forEach(function(e) {
			var n = Oe([0, 0], e);
			g.push.apply(g, Y([], J(Oi(e, i, o).map(function(e) {
				return a + e - n;
			}).filter(function(e) {
				return !Di(t, h, e);
			}).map(function(e) {
				return W(e * 180 / Math.PI, sr);
			})), !1));
		});
	}), g;
}
var Ai = [
	"left",
	"right",
	"center"
], ji = [
	"top",
	"bottom",
	"middle"
], Mi = {
	left: "start",
	right: "end",
	center: "center",
	top: "start",
	bottom: "end",
	middle: "center"
}, Ni = {
	start: "left",
	end: "right",
	center: "center"
}, Pi = {
	start: "top",
	end: "bottom",
	center: "middle"
};
function Fi() {
	return {
		left: !1,
		top: !1,
		right: !1,
		bottom: !1
	};
}
function Ii(e, t) {
	var n = e.props, r = n.snappable, i = n.bounds, a = n.innerBounds, o = n.verticalGuidelines, s = n.horizontalGuidelines, c = n.snapGridWidth, l = n.snapGridHeight, u = e.state, d = u.guidelines, f = u.enableSnap;
	return !r || !f || t && r !== !0 && r.indexOf(t) < 0 ? !1 : !!(c || l || i || a || d && d.length || o && o.length || s && s.length);
}
function Li(e) {
	return e === !1 ? {} : e === !0 || !e ? {
		left: !0,
		right: !0,
		top: !0,
		bottom: !0
	} : e;
}
function Ri(e, t) {
	var n = Li(e), r = {};
	for (var i in n) i in t && n[i] && (r[i] = t[i]);
	return r;
}
function zi(e, t) {
	var n = Ri(e, t), r = ji.filter(function(e) {
		return e in n;
	}), i = Ai.filter(function(e) {
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
function Bi(e, t, n) {
	var r = Ho(e, [t.clientLeft, t.clientTop], n);
	return [t.left + r[0], t.top + r[1]];
}
function Vi(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	Math.abs(i) < 1e-7 && (i = 0), Math.abs(a) < 1e-7 && (a = 0);
	var o = 0, s = 0, c = 0;
	return i ? a ? (o = -a / i, s = 1, c = o * n[0] - n[1]) : (s = 1, c = -n[1]) : (o = -1, c = n[0]), [
		o,
		s,
		c
	].map(function(e) {
		return W(e, B);
	});
}
var Hi = "snapRotationThreshold", Ui = "snapRotationDegrees", Wi = "snapHorizontalThreshold", Gi = "snapVerticalThreshold";
function Ki(e, t, n, r, i, a, o) {
	r === void 0 && (r = []), i === void 0 && (i = []);
	var s = e.props, c = e.state.snapThresholdInfo?.multiples || [1, 1], l = ys(o, s[Wi], 5), u = ys(a, s[Gi], 5);
	return qi(e.state.guidelines, t, n, r, i, l, u, c);
}
function qi(e, t, n, r, i, a, o, s) {
	return {
		vertical: Qi(e, "vertical", t, o * s[0], r),
		horizontal: Qi(e, "horizontal", n, a * s[1], i)
	};
}
function Ji(e, t, n) {
	var r = J(n, 2), i = r[0], a = r[1], o = J(t, 2), s = o[0], c = o[1], l = J(K(n, t), 2), u = l[0], d = l[1], f = d > 0, p = u > 0;
	u = Os(u), d = Os(d);
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
	var g = Ki(e, u ? [i] : [], d ? [a] : [], [], [], void 0, void 0), _ = g.vertical, v = g.horizontal;
	_.posInfos.filter(function(e) {
		var t = e.pos;
		return p ? t >= s : t <= s;
	}), v.posInfos.filter(function(e) {
		var t = e.pos;
		return f ? t >= c : t <= c;
	}), _.isSnap = _.posInfos.length > 0, v.isSnap = v.posInfos.length > 0;
	var y = Zi(_), b = y.isSnap, x = y.guideline, S = Zi(v), C = S.isSnap, w = S.guideline, T = C ? w.pos[1] : 0, E = b ? x.pos[0] : 0;
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
function Yi(e) {
	var t = "";
	return e === -1 || e === "top" || e === "left" ? t = "start" : e === 0 || e === "center" || e === "middle" ? t = "center" : (e === 1 || e === "right" || e === "bottom") && (t = "end"), t;
}
function Xi(e, t, n, r) {
	var i = zi(e.props.snapDirections, t), a = Ki(e, i.vertical, i.horizontal, i.verticalNames.map(function(e) {
		return Yi(e);
	}), i.horizontalNames.map(function(e) {
		return Yi(e);
	}), n, r), o = Yi(i.horizontalNames[a.horizontal.index]), s = Yi(i.verticalNames[a.vertical.index]);
	return {
		vertical: q(q({}, a.vertical), { direction: s }),
		horizontal: q(q({}, a.horizontal), { direction: o })
	};
}
function Zi(e) {
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
function Qi(e, t, n, r, i) {
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
function $i(e, t, n, r, i) {
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
	}) : e.props.keepRatio ? a.push([-1, -1], [-1, 1], [1, -1], [1, 1], n) : (a.push.apply(a, Y([], J(Ar([
		[-1, -1],
		[1, -1],
		[-1, -1],
		[1, 1]
	], n)), !1)), a.length > 1 && a.push([(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2]));
	var o = a.map(function(e) {
		return Mr(t, e);
	}), s = Ki(e, o.map(function(e) {
		return e[0];
	}), o.map(function(e) {
		return e[1];
	}), a.map(function(e) {
		return Yi(e[0]);
	}), a.map(function(e) {
		return Yi(e[1]);
	}), r, i), c = Yi(a.map(function(e) {
		return e[0];
	})[s.vertical.index]), l = Yi(a.map(function(e) {
		return e[1];
	})[s.horizontal.index]);
	return {
		vertical: q(q({}, s.vertical), { direction: c }),
		horizontal: q(q({}, s.horizontal), { direction: l })
	};
}
function ea(e, t) {
	var n = $(e.offset), r = $(t.offset);
	return e.isBound && t.isBound ? r - n : e.isBound ? -1 : t.isBound ? 1 : e.isSnap && t.isSnap ? r - n : e.isSnap ? -1 : t.isSnap || n < sr ? 1 : r < sr ? -1 : n - r;
}
function ta(e, t) {
	return e.slice().sort(function(e, n) {
		var r = e.sign[t], i = n.sign[t], a = e.offset[t], o = n.offset[t];
		return r ? i ? ea({
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
function na(e, t, n) {
	var r = [];
	if (n) $(t[0]) !== 1 || $(t[1]) !== 1 ? r.push([t, [-1, -1]], [t, [-1, 1]], [t, [1, -1]], [t, [1, 1]]) : r.push([t, [e[0], -e[1]]], [t, [-e[0], e[1]]]), r.push([t, e]);
	else if (e[0] && e[1] || !e[0] && !e[1]) {
		var i = e[0] ? e : [1, 1];
		[1, -1].forEach(function(e) {
			[1, -1].forEach(function(n) {
				var a = [e * i[0], n * i[1]];
				t[0] === a[0] && t[1] === a[1] || r.push([t, a]);
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
function ra(e, t) {
	var n = De([t[0][0], t[1][0]]), r = De([t[0][1], t[1][1]]);
	return {
		vertical: n <= e[0],
		horizontal: r <= e[1]
	};
}
function ia(e, t) {
	var n = J(t, 2), r = n[0], i = n[1], a = i[0] - r[0], o = i[1] - r[1];
	$(a) < sr && (a = 0), $(o) < sr && (o = 0);
	var s, c;
	return a ? o ? (s = o / a * (e[0] - r[0]) + r[1], c = e[1]) : (s = r[1], c = e[1]) : (s = r[0], c = e[0]), s - c;
}
function aa(e, t, n, r) {
	return r === void 0 && (r = sr), e.every(function(e) {
		var i = ia(e, t);
		return i <= 0 === n || $(i) <= r;
	});
}
function oa(e, t, n, r, i) {
	return i === void 0 && (i = 0), r && t - i <= e || !r && e <= n + i ? {
		isBound: !0,
		offset: r ? t - e : n - e
	} : {
		isBound: !1,
		offset: 0
	};
}
function sa(e, t) {
	var n = t.line, r = t.centerSign, i = t.verticalSign, a = t.horizontalSign, o = t.lineConstants, s = e.props.innerBounds;
	if (!s) return {
		isAllBound: !1,
		isBound: !1,
		isVerticalBound: !1,
		isHorizontalBound: !1,
		offset: [0, 0]
	};
	var c = s.left, l = s.top, u = s.width, d = s.height, f = [[c, l], [c, l + d]], p = [[c, l], [c + u, l]], m = [[c + u, l], [c + u, l + d]], h = [[c, l + d], [c + u, l + d]];
	if (aa([
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
	var g = ca(n, o, p, i), _ = ca(n, o, h, i), v = ca(n, o, f, a), y = ca(n, o, m, a), b = g.isBound && _.isBound, x = g.isBound || _.isBound, S = v.isBound && y.isBound, C = v.isBound || y.isBound, w = Cs(g.offset, _.offset), T = Cs(v.offset, y.offset), E = [0, 0], D = !1, O = !1;
	return $(T) < $(w) ? (E = [w, 0], D = x, O = b) : (E = [0, T], D = C, O = S), {
		isAllBound: O,
		isVerticalBound: x,
		isHorizontalBound: C,
		isBound: D,
		offset: E
	};
}
function ca(e, t, n, r, i, a) {
	var o = J(t, 2), s = o[0], c = o[1], l = e[0], u = n[0], d = n[1], f = Os(d[1] - u[1]), p = Os(d[0] - u[0]), m = c, h = s, g = -s / c;
	if (!p) {
		if (a && !h) return {
			isBound: !1,
			offset: 0
		};
		if (m) return oa(g * (u[0] - l[0]) + l[1], u[1], d[1], r, i);
		var _ = u[0] - l[0], v = $(_) <= (i || 0);
		return {
			isBound: v,
			offset: v ? _ : 0
		};
	} else if (!f) {
		if (a && !m) return {
			isBound: !1,
			offset: 0
		};
		if (h) return oa((u[1] - l[1]) / g + l[0], u[0], d[0], r, i);
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
function la(e, t, n) {
	return t.map(function(t) {
		var r = sa(e, t), i = r.isBound, a = r.offset, o = r.isVerticalBound, s = r.isHorizontalBound, c = t.multiple;
		return {
			sign: c,
			isBound: i,
			isVerticalBound: o,
			isHorizontalBound: s,
			isSnap: !1,
			offset: Er({
				datas: n,
				distX: a[0],
				distY: a[1]
			}).map(function(e, t) {
				return e * (c[t] ? 2 / c[t] : 0);
			})
		};
	});
}
function ua(e, t, n) {
	var r, i = la(e, fa(e, t, [0, 0], !1).map(function(e) {
		return q(q({}, e), { multiple: e.multiple.map(function(e) {
			return $(e) * 2;
		}) });
	}), n), a = ta(i, 0), o = ta(i, 1), s = 0, c = 0, l = a.isVerticalBound || o.isVerticalBound, u = a.isHorizontalBound || o.isHorizontalBound;
	return (l || u) && (r = J(Dr({
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
function da(e, t) {
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
function fa(e, t, n, r) {
	var i = e.state, a = i.allMatrix, o = i.is3d, s = Uo(a, 100, 100, o ? 4 : 3), c = Mr(s, [0, 0]);
	return da(n, r).map(function(e) {
		var n = J(e, 3), r = n[0], i = n[1], a = n[2], o = [Mr(s, i), Mr(s, a)], l = Vi(o), u = ra(c, o), d = u.vertical, f = u.horizontal;
		return {
			multiple: r,
			centerSign: ia(c, o) <= 0,
			verticalSign: d,
			horizontalSign: f,
			lineConstants: l,
			line: [Mr(t, i), Mr(t, a)]
		};
	});
}
function pa(e, t, n, r) {
	var i = r ? e.map(function(e) {
		return dt(e, r);
	}) : e;
	return [
		[i[0], i[1]],
		[i[1], i[3]],
		[i[3], i[2]],
		[i[2], i[0]]
	].some(function(e) {
		return !aa(t, e, ia(n, e) <= 0);
	});
}
function ma(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return $(n[0]);
	if (!a) return $(n[1]);
	var o = a / i;
	return $((-o * n[0] + n[1]) / Math.sqrt(o ** 2 + 1));
}
function ha(e) {
	var t = J(e, 2), n = t[0], r = t[1], i = r[0] - n[0], a = r[1] - n[1];
	if (!i) return [n[0], 0];
	if (!a) return [0, n[1]];
	var o = a / i, s = -o * n[0] + n[1];
	return [-s / (o + 1 / o), s / (o * o + 1)];
}
function ga(e, t, n, r, i) {
	var a = e.props.innerBounds, o = i * Math.PI / 180;
	if (!a) return [];
	var s = a.left, c = a.top, l = a.width, u = a.height, d = s - r[0], f = s + l - r[0], p = c - r[1], m = c + u - r[1], h = [
		[d, p],
		[f, p],
		[d, m],
		[f, m]
	], g = Mr(n, [0, 0]);
	if (!pa(n, h, g, 0)) return [];
	var _ = [], v = h.map(function(e) {
		return [Jo(e), Oe([0, 0], e)];
	});
	return [
		[n[0], n[1]],
		[n[1], n[3]],
		[n[3], n[2]],
		[n[2], n[0]]
	].forEach(function(e) {
		var n = Oe([0, 0], ha(e)), r = ma(e);
		_.push.apply(_, Y([], J(v.filter(function(e) {
			var t = J(e, 1)[0];
			return t && r <= t;
		}).map(function(e) {
			var t = J(e, 2), i = t[0], a = t[1], s = Math.acos(i ? r / i : 0), c = a + s, l = a - s;
			return [o + c - n, o + l - n];
		}).reduce(function(e, t) {
			return e.push.apply(e, Y([], J(t), !1)), e;
		}, []).filter(function(e) {
			return !pa(t, h, g, e);
		}).map(function(e) {
			return W(e * 180 / Math.PI, sr);
		})), !1));
	}), _;
}
function _a(e) {
	var t = e.props.innerBounds, n = Fi();
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
	], a = Mr(i, [0, 0]), o = t.left, s = t.top, c = t.width, l = t.height, u = [[o, s], [o, s + l]], d = [[o, s], [o + c, s]], f = [[o + c, s], [o + c, s + l]], p = [[o, s + l], [o + c, s + l]], m = fa(e, i, [0, 0], !1), h = [], g = [];
	return m.forEach(function(e) {
		var t = e.line, r = e.lineConstants, i = ra(a, t), m = i.horizontal, _ = i.vertical, v = ca(t, r, d, _, 1, !0), y = ca(t, r, p, _, 1, !0), b = ca(t, r, u, m, 1, !0), x = ca(t, r, f, m, 1, !0);
		v.isBound && !n.top && (h.push(s), n.top = !0), y.isBound && !n.bottom && (h.push(s + l), n.bottom = !0), b.isBound && !n.left && (g.push(o), n.left = !0), x.isBound && !n.right && (g.push(o + c), n.right = !0);
	}), {
		boundMap: n,
		horizontal: h,
		vertical: g
	};
}
function va(e, t, n, r) {
	var i = t[0] - e[0], a = t[1] - e[1];
	if ($(i) < 1e-7 && (i = 0), $(a) < 1e-7 && (a = 0), !i) return r ? [0, 0] : [0, n];
	if (!a) return r ? [n, 0] : [0, 0];
	var o = a / i, s = e[1] - o * e[0];
	return r ? [n, o * (t[0] + n) + s - t[1]] : [(t[1] + n - s) / o - t[0], n];
}
function ya(e, t, n, r, i) {
	var a = va(e, t, n, r);
	if (!a) return {
		isOutside: !1,
		offset: [0, 0]
	};
	var o = je(e, t), s = je(a, e), c = je(a, t), l = s > o || c > o, u = J(Er({
		datas: i,
		distX: a[0],
		distY: a[1]
	}), 2);
	return {
		offset: [u[0], u[1]],
		isOutside: l
	};
}
function ba(e, t) {
	return e.isBound ? e.offset : t.isSnap ? Zi(t).offset : 0;
}
function xa(e, t, n, r, i) {
	var a = J(t, 2), o = a[0], s = a[1], c = J(n, 2), l = c[0], u = c[1], d = J(r, 2), f = d[0], p = d[1], m = J(i, 2), h = m[0], g = m[1], _ = -h, v = -g;
	if (e && o && s) {
		_ = 0, v = 0;
		var y = [];
		if (l && u ? y.push([0, g], [h, 0]) : l ? y.push([h, 0]) : u ? y.push([0, g]) : f && p ? y.push([0, g], [h, 0]) : f ? y.push([h, 0]) : p && y.push([0, g]), y.length) {
			y.sort(function(e, t) {
				return Jo(K([o, s], e)) - Jo(K([o, s], t));
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
			} else _ = Cs(-h, _), v = Cs(-g, v);
		}
	} else _ = o || l ? -h : 0, v = s || u ? -g : 0;
	return [_, v];
}
function Sa(e, t, n, r, i, a) {
	if (!Ii(e, "draggable")) return [{
		isSnap: !1,
		isBound: !1,
		offset: 0
	}, {
		isSnap: !1,
		isBound: !1,
		offset: 0
	}];
	var o = cs(a.absolutePoses, [t, n]), s = Wo(o), c = s.left, l = s.right, u = s.top, d = s.bottom, f = {
		horizontal: o.map(function(e) {
			return e[1];
		}),
		vertical: o.map(function(e) {
			return e[0];
		})
	}, p = Ca(e, i, zi(Li(e.props.snapDirections), {
		left: c,
		right: l,
		top: u,
		bottom: d,
		center: (c + l) / 2,
		middle: (u + d) / 2
	}), f), m = p.vertical, h = p.horizontal, g = ua(e, o, a), _ = g.vertical, v = g.horizontal, y = m.isSnap, b = h.isSnap, x = m.isBound || _.isBound, S = h.isBound || v.isBound, C = Cs(m.offset, _.offset), w = Cs(h.offset, v.offset), T = J(xa(r, [t, n], [x, S], [y, b], [C, w]), 2), E = T[0], D = T[1];
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
function Ca(e, t, n, r) {
	r === void 0 && (r = n);
	var i = Ci(wi(e), r.vertical, r.horizontal), a = i.horizontal, o = i.vertical, s = t ? {
		horizontal: {
			isSnap: !1,
			index: -1
		},
		vertical: {
			isSnap: !1,
			index: -1
		}
	} : Ki(e, n.vertical, n.horizontal, void 0, void 0, void 0, void 0), c = s.horizontal, l = s.vertical, u = ba(a[0], c), d = ba(o[0], l), f = $(u), p = $(d);
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
function wa(e, t, n, r, i, a, o) {
	o === void 0 && (o = [1, 1]);
	var s = Ci(t, n, r), c = s.horizontal, l = s.vertical, u = qi(e, n, r, [], [], i, a, o), d = u.horizontal, f = u.vertical, p = ba(c[0], d), m = ba(l[0], f), h = $(p), g = $(m);
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
function Ta(e, t, n, r) {
	var i = Oe(e, t) / Math.PI * 180, a = n.vertical, o = a.isBound, s = a.isSnap, c = a.dist, l = n.horizontal, u = l.isBound, d = l.isSnap, f = l.dist, p = i % 180, m = p < 3 || p > 177, h = p > 87 && p < 93;
	return f < c && (o || s && !h && (!r || !m)) ? "vertical" : u || d && !m && (!r || !h) ? "horizontal" : "";
}
function Ea(e, t, n, r, i, a) {
	return n.map(function(n) {
		var o = J(n, 2), s = o[0], c = o[1], l = Mr(t, s), u = Mr(t, c), d = r ? Oa(e, l, u, i) : Ca(e, i, {
			vertical: [u[0]],
			horizontal: [u[1]]
		}), f = d.horizontal, p = f.offset, m = f.isBound, h = f.isSnap, g = d.vertical, _ = g.offset, v = g.isBound, y = g.isSnap, b = K(c, s);
		if (!_ && !p) return {
			isBound: v || m,
			isSnap: y || h,
			sign: b,
			offset: [0, 0]
		};
		var x = Ta(l, u, d, r);
		if (!x) return {
			sign: b,
			isBound: !1,
			isSnap: !1,
			offset: [0, 0]
		};
		var S = x === "vertical", C = [0, 0];
		return C = !r && $(c[0]) === 1 && $(c[1]) === 1 && s[0] !== c[0] && s[1] !== c[1] ? Er({
			datas: a,
			distX: -_,
			distY: -p
		}) : ya(l, u, -(S ? _ : p), S, a).offset, C = C.map(function(e, t) {
			return e * (b[t] ? 2 / b[t] : 0);
		}), {
			sign: b,
			isBound: S ? v : m,
			isSnap: S ? y : h,
			offset: C
		};
	});
}
function Da(e, t) {
	return e.isBound ? e.offset : t.isSnap ? t.offset : 0;
}
function Oa(e, t, n, r) {
	var i = Ti(e, t, n), a = i.horizontal, o = i.vertical, s = r ? {
		horizontal: { isSnap: !1 },
		vertical: { isSnap: !1 }
	} : Ji(e, t, n), c = s.horizontal, l = s.vertical, u = Da(a, c), d = Da(o, l), f = $(u), p = $(d);
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
function ka(e, t, n, r, i) {
	var a = [-n[0], -n[1]], o = e.state, s = o.width, c = o.height, l = e.props.bounds, u = Infinity, d = Infinity;
	if (l) {
		var f = [[n[0], -n[1]], [-n[0], n[1]]], p = l.left, m = p === void 0 ? -Infinity : p, h = l.top, g = h === void 0 ? -Infinity : h, _ = l.right, v = _ === void 0 ? Infinity : _, y = l.bottom, b = y === void 0 ? Infinity : y;
		f.forEach(function(e) {
			var n = e[0] !== a[0], o = e[1] !== a[1], l = Mr(t, e), f = Oe(r, l) * 360 / Math.PI;
			if (o) {
				var p = l.slice();
				($(f - 360) < 2 || $(f - 180) < 2) && (p[1] = r[1]);
				var h = ya(r, p, (r[1] < l[1] ? b : g) - l[1], !1, i), _ = J(h.offset, 2)[1], y = h.isOutside;
				isNaN(_) || (d = c + (y ? 1 : -1) * $(_));
			}
			if (n) {
				var p = l.slice();
				($(f - 90) < 2 || $(f - 270) < 2) && (p[0] = r[0]);
				var x = ya(r, p, (r[0] < l[0] ? v : m) - l[0], !0, i), S = J(x.offset, 1)[0], C = x.isOutside;
				isNaN(S) || (u = s + (C ? 1 : -1) * $(S));
			}
		});
	}
	return {
		maxWidth: u,
		maxHeight: d
	};
}
var Aa = {
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
		var u = Jo(l), d = Oe(l, [0, 0]);
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
		o.draggable = i || e.targetGesto, n.datas = {}, n.left = parseFloat(s.left || "") || 0, n.top = parseFloat(s.top || "") || 0, n.bottom = parseFloat(s.bottom || "") || 0, n.right = parseFloat(s.right || "") || 0, n.startValue = [0, 0], yr(e, t), Rr(e, t, "translate"), yo(e, n), n.prevDist = [0, 0], n.prevBeforeDist = [0, 0], n.isDrag = !1, n.deltaOffset = [0, 0];
		var c = Z(e, t, q({ set: function(e) {
			n.startValue = e;
		} }, Lr(e, t)));
		return (r || Q(e, "onDragStart", c)) === !1 ? (o.draggable = null, n.isPinch = !1) : (n.isDrag = !0, e.state.dragInfo = {
			startRect: e.getRect(),
			dist: [0, 0]
		}), n.isDrag ? c : !1;
	},
	drag: function(e, t) {
		if (t) {
			xr(e, t, "translate");
			var n = t.datas, r = t.parentEvent, i = t.parentFlag, a = t.isPinch, o = t.deltaOffset, s = t.useSnap, c = t.isRequest, l = t.isGroup, u = t.parentThrottleDrag, d = t.distX, f = t.distY, p = n.isDrag, m = n.prevDist, h = n.prevBeforeDist, g = n.startValue;
			if (p) {
				o && (d += o[0], f += o[1]);
				var _ = e.props, v = _.parentMoveable, y = l ? 0 : _.throttleDrag || u || 0, b = r ? 0 : _.throttleDragRotate || 0, x = 0, S = !1, C = !1, w = !1, T = !1;
				if (!r && b > 0 && (d || f)) {
					var E = _.startDragRotate || 0, D = W(E + Oe([0, 0], [d, f]) * 180 / Math.PI, b) - E, O = f * Math.abs(Math.cos((D - 90) / 180 * Math.PI)), k = Jo([d * Math.abs(Math.cos(D / 180 * Math.PI)), O]);
					x = D * Math.PI / 180, d = k * Math.cos(x), f = k * Math.sin(x);
				}
				if (!a && !r && !i) {
					var A = J(Sa(e, d, f, b, !s && c || o, n), 2), j = A[0], M = A[1];
					S = j.isSnap, C = j.isBound, w = M.isSnap, T = M.isBound;
					var N = j.offset, P = M.offset;
					d += N, f += P;
				}
				var F = G(Tr({
					datas: n,
					distX: d,
					distY: f
				}), g), I = G(Cr({
					datas: n,
					distX: d,
					distY: f
				}), g);
				Me(I, sr), Me(F, sr), b || (!S && !C && (I[0] = W(I[0], y), F[0] = W(F[0], y)), !w && !T && (I[1] = W(I[1], y), F[1] = W(F[1], y)));
				var L = K(F, g), R = K(I, g), z = K(R, m), B = K(L, h);
				n.prevDist = R, n.prevBeforeDist = L, n.passDelta = z, n.passDist = R;
				var ee = n.left + L[0], V = n.top + L[1], te = n.right - L[0], ne = n.bottom - L[1], re = Sr(n, `translate(${I[0]}px, ${I[1]}px)`, `translate(${R[0]}px, ${R[1]}px)`);
				if (Br(t, re), e.state.dragInfo.dist = r ? [0, 0] : R, !(!r && !v && z.every(function(e) {
					return !e;
				}) && B.some(function(e) {
					return !e;
				}))) {
					var H = e.state, U = H.width, ie = H.height, ae = Z(e, t, q({
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
					}, fs({ transform: re }, t)));
					return !r && Q(e, "onDrag", ae), ae;
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
			var i = ms(e, t, {});
			return !n && Q(e, "onDragEnd", i), i;
		}
	},
	dragGroupStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY, a = this.dragStart(e, t);
		if (!a) return !1;
		var o = fi(e, this, "dragStart", [r || 0, i || 0], t, !1, "draggable"), s = o.childEvents, c = o.eventParams;
		n.isDrag = Q(e, "onDragGroupStart", q(q({}, a), {
			targets: e.props.targets,
			events: c
		})) !== !1;
		var l = s[0]?.datas.startValue ?? [0, 0];
		return n.throttleOffset = [l[0] % 1, l[1] % 1], n.isDrag ? a : !1;
	},
	dragGroup: function(e, t) {
		if (t.datas.isDrag) {
			var n = this.drag(e, q(q({}, t), { parentThrottleDrag: e.props.throttleDrag })), r = t.datas.passDelta, i = fi(e, this, "drag", r, t, !1, "draggable").eventParams;
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
			var r = fi(e, this, "dragEnd", [0, 0], t, !1, "draggable").eventParams;
			return Q(e, "onDragGroupEnd", ms(e, t, {
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
function ja(e, t) {
	return {
		fixedPosition: Mr(e, t),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function Ma(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3;
	return {
		fixedPosition: Ho(n, [i / 2 * (1 + t[0]), a / 2 * (1 + t[1])], o),
		fixedDirection: t,
		fixedOffset: [0, 0]
	};
}
function Na(e, t) {
	var n = e.allMatrix, r = e.is3d, i = e.width, a = e.height, o = r ? 4 : 3, s = Yr(t, i, a);
	return {
		fixedPosition: Ho(n, t, o),
		fixedDirection: s,
		fixedOffset: [i ? 0 : t[0], a ? 0 : t[1]]
	};
}
var Pa = As("resizable"), Fa = {
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
	render: yi("resizable"),
	dragControlCondition: Pa,
	viewClassName: ks("resizable"),
	dragControlStart: function(e, t) {
		var n = t.inputEvent, r = t.isPinch, i = t.isGroup, a = t.parentDirection, o = t.parentGesto, s = t.datas, c = t.parentFixedDirection, l = t.parentEvent, u = os(a, r, n, s), d = e.state, f = d.target, p = d.width, m = d.height, h = d.gestos;
		if (!u || !f || h.resizable) return !1;
		h.resizable = o || e.controlGesto, !r && yr(e, t), s.datas = {}, s.direction = u, s.startOffsetWidth = p, s.startOffsetHeight = m, s.prevWidth = 0, s.prevHeight = 0, s.minSize = [0, 0], s.startWidth = d.inlineCSSWidth || d.cssWidth, s.startHeight = d.inlineCSSHeight || d.cssHeight, s.maxSize = [Infinity, Infinity], i || (s.minSize = [d.minOffsetWidth, d.minOffsetHeight], s.maxSize = [d.maxOffsetWidth, d.maxOffsetHeight]);
		var g = e.props.transformOrigin || "% %";
		s.transformOrigin = g && U(g) ? g.split(" ") : g, s.startOffsetMatrix = d.offsetMatrix, s.startTransformOrigin = d.transformOrigin, s.isWidth = t?.parentIsWidth ?? (!u[0] && !u[1] || u[0] || !u[1]);
		function _(e) {
			s.ratio = e && isFinite(e) ? e : 0;
		}
		s.startPositions = ls(e.state);
		function v(e) {
			var t = ja(s.startPositions, e);
			s.fixedDirection = t.fixedDirection, s.fixedPosition = t.fixedPosition, s.fixedOffset = t.fixedOffset;
		}
		function y(t) {
			var n = Na(e.state, t);
			s.fixedDirection = n.fixedDirection, s.fixedPosition = n.fixedPosition, s.fixedOffset = n.fixedOffset;
		}
		function b(e) {
			s.minSize = [Se(`${e[0]}`, 0) || 0, Se(`${e[1]}`, 0) || 0];
		}
		function x(e) {
			var t = [e[0] || Infinity, e[1] || Infinity];
			(!ie(t[0]) || isFinite(t[0])) && (t[0] = Se(`${t[0]}`, 0) || Infinity), (!ie(t[1]) || isFinite(t[1])) && (t[1] = Se(`${t[1]}`, 0) || Infinity), s.maxSize = t;
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
			dragStart: Aa.dragStart(e, new gr().dragStart([0, 0], t))
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
			var E = e.state.is3d, D = r.startOffsetMatrix, O = r.startTransformOrigin, k = E ? 4 : 3, A = xt(Hr(t)), j = Math.sqrt(A.length);
			k !== j && (A = tt(A, j, k));
			var M = Pr(D, A, O, k);
			r.startPositions = Uo(M, C, w, k), r.nextTargetMatrix = A, r.nextAllMatrix = M;
		}
		var N = Qo(e.props, "resizable"), P = N.resizeFormat, F = N.throttleResize, I = F === void 0 ? +!i : F, L = N.parentMoveable, R = N.keepRatioFinally, z = r.direction, B = z, ee = 0, V = 0;
		!z[0] && !z[1] && (B = [1, 1]);
		var te = S && (o ?? N.keepRatio) || !1;
		function ne() {
			var e = r.fixedDirection, n = Rs(B, te, r, t);
			ee = n.distWidth, V = n.distHeight;
			var i = B[0] - e[0] || te ? Math.max(C + ee, sr) : C, a = B[1] - e[1] || te ? Math.max(w + V, sr) : w;
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
		s || (ie = !i && a ? $r(e, [0, 0]) : r.fixedPosition);
		var ae = [0, 0];
		a || (ae = _o(e, H, U, z, ie, !l && u, r)), c && (!c[0] && (ae[0] = 0), !c[1] && (ae[1] = 0));
		function oe() {
			var e;
			P && (e = J(P([H, U]), 2), H = e[0], U = e[1]), H = W(H, I), U = W(U, I);
		}
		if (te) {
			B[0] && B[1] && ae[0] && ae[1] && ($(ae[0]) > $(ae[1]) ? ae[1] = 0 : ae[0] = 0);
			var se = !ae[0] && !ae[1];
			se && oe(), B[0] && !B[1] || ae[0] && !ae[1] || se && T ? (H += ae[0], U = H / S) : (!B[0] && B[1] || !ae[0] && ae[1] || se && !T) && (U += ae[1], H = U * S);
		} else H += ae[0], U += ae[1], H = Math.max(0, H), U = Math.max(0, U);
		n = J(Te([H, U], b, x, te ? S : !1), 2), H = n[0], U = n[1], oe(), te && (d || R) && (T ? U = H / S : H = U * S), ee = H - C, V = U - w;
		var ce = [ee - v, V - y];
		r.prevWidth = ee, r.prevHeight = V;
		var le = Qr(e, H, U, ie, h, r);
		if (!(!L && ce.every(function(e) {
			return !e;
		}) && le.every(function(e) {
			return !e;
		}))) {
			var ue = Aa.drag(e, hr(t, e.state, le, !!a, !1, "draggable")), de = ue.transform, fe = g + ee, pe = _ + V, me = Z(e, t, q({
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
			}, ps({
				style: {
					width: `${fe}px`,
					height: `${pe}px`
				},
				transform: de
			}, ue, t)));
			return !f && Q(e, "onResize", me), me;
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
			var i = ms(e, t, {});
			return !r && Q(e, "onResizeEnd", i), i;
		}
	},
	dragGroupControlCondition: Pa,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, q(q({}, t), { isGroup: !0 }));
		if (!r) return !1;
		var i = di(e, "resizable", t), a = n.startOffsetWidth, o = n.startOffsetHeight;
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
		var l = pi(e, this, "dragControlStart", t, function(t, r) {
			return mi(e, t, n, r);
		});
		s(), c();
		var u = function(t) {
			r.setFixedDirection(t), l.forEach(function(r, a) {
				r.setFixedDirection(t), mi(e, r.moveable, n, i[a]);
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
			var r = Qo(e.props, "resizable");
			hs(e, "onBeforeResize", function(n) {
				Q(e, "onBeforeResizeGroup", Z(e, t, q(q({}, n), { targets: r.targets }), !0));
			});
			var i = this.dragControl(e, q(q({}, t), { isGroup: !0 }));
			if (i) {
				var a = i.boundingWidth, o = i.boundingHeight, s = i.dist, c = r.keepRatio, l = [a / (a - s[0]), o / (o - s[1])], u = n.fixedPosition, d = pi(e, this, "dragControl", t, function(t, n) {
					var r = J(ot(mt(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * l[0],
						n.datas.originalY * l[1],
						1
					], 3), 2), i = r[0], a = r[1];
					return q(q({}, n), {
						parentDist: null,
						parentScale: l,
						dragClient: G(u, [i, a]),
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
			var r = pi(e, this, "dragControlEnd", t);
			return Q(e, "onResizeGroupEnd", ms(e, t, {
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
function Ia(e, t, n, r, i) {
	var a = e.props.groupable, o = e.state, s = o.is3d ? 4 : 3, c = t.origin, l = Ho(e.state.rootMatrix, K([c[0], c[1]], a ? [0, 0] : [o.left, o.top]), s), u = G([i.left, i.top], l);
	t.startAbsoluteOrigin = u, t.prevDeg = Oe(u, [n, r]) / Math.PI * 180, t.defaultDeg = t.prevDeg, t.prevSnapDeg = 0, t.loop = 0, t.startDist = je(u, [n, r]);
}
function La(e, t, n) {
	var r = n.defaultDeg, i = n.prevDeg, a = i % 360, o = Math.floor(i / 360);
	a < 0 && (a += 360), a > e && a > 270 && e < 90 ? ++o : a < e && a < 90 && e > 270 && --o;
	var s = t * (o * 360 + e - r);
	return n.prevDeg = r + s, s;
}
function Ra(e, t, n, r) {
	return La(Oe(r.startAbsoluteOrigin, [e, t]) / Math.PI * 180, n, r);
}
function za(e, t, n, r, i, a) {
	var o = e.props.throttleRotate, s = o === void 0 ? 0 : o, c = n.prevSnapDeg, l = 0, u = !1;
	if (a) {
		var d = go(e, t, r, i + r);
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
function Ba(e, t, n) {
	var r = J(t, 4), i = r[0], a = r[1], o = r[2], s = r[3];
	if (e === "none") return [];
	if (H(e)) return e.map(function(e) {
		return Ba(e, [
			i,
			a,
			o,
			s
		], n)[0];
	});
	var c = J((e || "top").split("-"), 2), l = c[0], u = c[1], d = [i, a];
	l === "left" ? d = [o, i] : l === "right" ? d = [a, s] : l === "bottom" && (d = [s, o]);
	var f = [(d[0][0] + d[1][0]) / 2, (d[0][1] + d[1][1]) / 2], p = es(d, n);
	if (u) {
		var m = u === "top" || u === "left", h = l === "bottom" || l === "left";
		f = d[m && !h || !m && h ? 0 : 1];
	}
	return [[f, p]];
}
function Va(e, t) {
	if (t.isRequest) return t.requestAble === "rotatable";
	var n = t.inputEvent.target;
	if (Fe(n, X("rotation-control")) || e.props.rotateAroundControls && Fe(n, X("around-control")) || Fe(n, X("control")) && Fe(n, X("rotatable"))) return !0;
	var r = e.props.rotationTarget;
	return r ? Ps(r, !0).some(function(e) {
		return e ? n === e || n.contains(e) : !1;
	}) : !1;
}
var Ha = {
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
		var n = Qo(e.props, "rotatable"), r = n.rotatable, i = n.rotationPosition, a = n.zoom, o = n.renderDirections, s = n.rotateAroundControls, c = n.resolveAblesWithRotatable, l = e.getState(), u = l.renderPoses, d = l.direction;
		if (!r) return null;
		var f = Ba(i, u, d), p = [];
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
			var m = xe(c || {}), h = {};
			m.forEach(function(e) {
				c[e].forEach(function(t) {
					h[t] = e;
				});
			});
			var g = [];
			H(o) && (g = o.map(function(e) {
				var t = h[e];
				return {
					data: t ? { resolve: t } : {},
					classNames: t ? ["move"] : [],
					dir: e
				};
			})), p.push.apply(p, Y([], J(hi(e, "rotatable", g, t)), !1));
		}
		return s && p.push.apply(p, Y([], J(Si(e, t)), !1)), p;
	},
	dragControlCondition: Va,
	dragControlStart: function(e, t) {
		var n, r = t.datas, i = t.clientX, a = t.clientY, o = t.parentRotate, s = t.parentFlag, c = t.isPinch, l = t.isRequest, u = e.state, d = u.target, f = u.left, p = u.top, m = u.direction, h = u.beforeDirection, g = u.targetTransform, _ = u.moveableClientRect, v = u.offsetMatrix, y = u.targetMatrix, b = u.allMatrix, x = u.width, S = u.height;
		if (!l && !d) return !1;
		var C = e.getRect();
		r.rect = C, r.transform = g, r.left = f, r.top = p;
		var w = function(t) {
			var n = Na(e.state, t);
			r.fixedDirection = n.fixedDirection, r.fixedOffset = n.fixedOffset, r.fixedPosition = n.fixedPosition, P && P.setFixedPosition(t);
		}, T = function(t) {
			var n = Ma(e.state, t);
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
				var A = dr[k.getAttribute("data-direction") || ""];
				if (A) {
					r.isControl = !0, r.isAroundControl = Fe(k, X("around-control")), r.controlDirection = A;
					var j = k.getAttribute("data-resolve");
					j && (r.resolveAble = j), n = J(Mr(qo(u.rootMatrix, u.renderPoses, _), A), 2), E = n[0], D = n[1];
				}
			}
			r.beforeInfo = { origin: C.beforeOrigin }, r.afterInfo = { origin: C.origin }, r.absoluteInfo = {
				origin: C.origin,
				startValue: C.rotation
			};
			var M = w;
			w = function(t) {
				var n = u.is3d ? 4 : 3, i = J(G(Qe(y, n), t), 2), a = i[0], o = i[1], s = ot(v, et([a, o], n)), c = ot(b, et([t[0], t[1]], n));
				M(t);
				var l = u.posDelta;
				r.beforeInfo.origin = K(s, l), r.afterInfo.origin = K(c, l), r.absoluteInfo.origin = K(c, l), Ia(e, r.beforeInfo, E, D, _), Ia(e, r.afterInfo, E, D, _), Ia(e, r.absoluteInfo, E, D, _);
			}, T = function(e) {
				var t = Mr([
					[0, 0],
					[x, 0],
					[0, S],
					[x, S]
				], e);
				w(t);
			};
		}
		r.startClientX = E, r.startClientY = D, r.direction = m, r.beforeDirection = h, r.startValue = 0, r.datas = {}, Rr(e, t, "rotate");
		var N = !1, P = !1;
		r.isControl && r.resolveAble && r.resolveAble === "resizable" && (P = Fa.dragControlStart(e, q(q({}, new gr("resizable").dragStart([0, 0], t)), {
			parentPosition: r.controlPosition,
			parentFixedPosition: r.fixedPosition
		}))), P || (N = Aa.dragStart(e, new gr().dragStart([0, 0], t))), w(as(e));
		var F = Z(e, t, q(q({
			set: function(e) {
				r.startValue = e * Math.PI / 180;
			},
			setFixedDirection: T,
			setFixedPosition: w
		}, Lr(e, t)), {
			dragStart: N,
			resizeStart: P
		}));
		return r.isRotate = Q(e, "onRotateStart", F) !== !1, u.snapRenderInfo = { request: t.isRequest }, r.isRotate ? F : !1;
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.clientDistX, s = t.clientDistY, c = t.parentRotate, l = t.parentFlag, u = t.isPinch, d = t.groupDelta, f = t.resolveMatrix, p = a.beforeDirection, m = a.beforeInfo, h = a.afterInfo, g = a.absoluteInfo, _ = a.isRotate, v = a.startValue, y = a.rect, b = a.startClientX, x = a.startClientY;
		if (_) {
			xr(e, t, "rotate");
			var S = p * br(t), C = e.props.parentMoveable, w = 0, T, E, D = 0, O, k, A = 0, j, M, N = 180 / Math.PI * v, P = g.startValue, F = !1, I = b + o, L = x + s;
			if (!l && "parentDist" in t) {
				var R = t.parentDist;
				T = R, O = R, j = R;
			} else u || l ? (T = La(c, p, m), O = La(c, S, h), j = La(c, S, g)) : (T = Ra(I, L, p, m), O = Ra(I, L, S, h), j = Ra(I, L, S, g), F = !0);
			if (E = N + T, k = N + O, M = P + j, Q(e, "onBeforeRotate", Z(e, t, {
				beforeRotation: E,
				rotation: k,
				absoluteRotation: M,
				setRotation: function(e) {
					O = e - N, T = O, j = O;
				}
			}, !0)), n = J(za(e, y, m, T, N, F), 3), w = n[0], T = n[1], E = n[2], r = J(za(e, y, h, O, N, F), 3), D = r[0], O = r[1], k = r[2], i = J(za(e, y, g, j, P, F), 3), A = i[0], j = i[1], M = i[2], !(!A && !D && !w && !C && !f)) {
				var z = Sr(a, `rotate(${k}deg)`, `rotate(${O}deg)`);
				f && (a.fixedPosition = Kr(e, a.targetAllTransform, a.fixedDirection, a.fixedOffset, a));
				var B = Zr(e, O, a), ee = K(G(d || [0, 0], B), a.prevInverseDist || [0, 0]);
				a.prevInverseDist = B, a.requestValue = null;
				var V = Gr(e, z, ee, u, t), te = V, ne = je([I, L], g.startAbsoluteOrigin) - g.startDist, re = void 0;
				if (a.resolveAble === "resizable") {
					var H = Fa.dragControl(e, q(q({}, hr(t, e.state, [t.deltaX, t.deltaY], !!u, !1, "resizable")), {
						resolveMatrix: !0,
						parentDistance: ne
					}));
					H && (re = H, te = ps(te, H, t));
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
			var r = ms(e, t, {});
			return Q(e, "onRotateEnd", r), r;
		}
	},
	dragGroupControlCondition: Va,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = e.state, i = r.left, a = r.top, o = r.beforeOrigin, s = this.dragControlStart(e, t);
		if (!s) return !1;
		s.set(n.beforeDirection * e.rotation);
		var c = pi(e, this, "dragControlStart", t, function(e, t) {
			var n = e.state, r = n.left, s = n.top, c = n.beforeOrigin, l = G(K([r, s], [i, a]), K(c, o));
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
			hs(e, "onBeforeRotate", function(n) {
				Q(e, "onBeforeRotateGroup", Z(e, t, q(q({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = n.beforeDirection, a = r.beforeDist, o = a / 180 * Math.PI, s = pi(e, this, "dragControl", t, function(e, t) {
					var n = t.datas.startGroupClient, r = J(t.datas.groupClient, 2), s = r[0], c = r[1], l = J(dt(n, o * i), 2), u = l[0], d = l[1], f = [u - s, d - c];
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
			var r = pi(e, this, "dragControlEnd", t);
			return Q(e, "onRotateGroupEnd", ms(e, t, {
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
function Ua(e, t) {
	var n, r = e.direction, i = e.classNames, a = e.size, o = e.pos, s = e.zoom, c = e.key, l = r === "horizontal", u = l ? "Y" : "X";
	return t.createElement("div", {
		key: c,
		className: i.join(" "),
		style: (n = {}, n[l ? "width" : "height"] = `${a}`, n.transform = `translate(${o[0]}, ${o[1]}) translate${u}(-50%) scale${u}(${s})`, n)
	});
}
function Wa(e, t) {
	return Ua(q(q({}, e), {
		classNames: Y([X("line", "guideline", e.direction)], J(e.classNames), !1).filter(function(e) {
			return e;
		}),
		size: e.size || `${e.sizeValue}px`,
		pos: e.pos || e.posValue.map(function(e) {
			return `${W(e, .1)}px`;
		})
	}), t);
}
function Ga(e, t, n, r, i, a, o, s) {
	var c = e.props.zoom;
	return n.map(function(e, n) {
		var l = e.type, u = e.pos, d = [0, 0];
		return d[o] = r, d[+!o] = -i + u, Wa({
			key: `${t}TargetGuideline${n}`,
			classNames: [X("target", "bold", l)],
			posValue: d,
			sizeValue: a,
			zoom: c,
			direction: t
		}, s);
	});
}
function Ka(e, t, n, r, i, a) {
	var o = e.props, s = o.zoom, c = o.isDisplayInnerSnapDigit, l = t === "horizontal" ? Ni : Pi, u = i[l.start], d = i[l.end];
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
		return Wa({
			key: `${t}-default-guideline-${n}`,
			classNames: c ? [X("bold"), l] : [X("normal"), l],
			direction: t,
			posValue: u,
			sizeValue: o,
			zoom: s
		}, a);
	});
}
function qa(e, t, n, r, i, a, o, s) {
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
	}, Wa({
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
function Ja(e, t, n, r) {
	var i = e === "vertical" ? 0 : 1, a = +(e === "vertical"), o = i ? Ni : Pi, s = n[o.start], c = n[o.end];
	return bs(t, function(e) {
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
function Ya(e, t, n, r, i) {
	var a = e.props.isDisplayInnerSnapDigit, o = [];
	return ["vertical", "horizontal"].forEach(function(s) {
		var c = t.filter(function(e) {
			return e.type === s;
		}), l = +(s === "vertical"), u = +!l, d = Ja(s, c, r, a), f = l ? Pi : Ni, p = l ? Ni : Pi, m = r[f.start], h = r[f.end];
		d.forEach(function(t) {
			var a = t.total, c = t.start, d = t.end, g = t.inner, _ = n[u] + a[0].pos[u] - r[p.start], v = r;
			c.forEach(function(t) {
				var r = t.elementRect.rect, a = v[f.start] - r[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.start] - m - a, c[u] = _, o.push(qa(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), v = r, d.forEach(function(t) {
				var r = t.elementRect.rect, a = r[f.start] - v[f.end];
				if (a > 0) {
					var c = [0, 0];
					c[l] = n[l] + v[f.end] - m, c[u] = _, o.push(qa(e, s, "dashed", o.length, a, c, t.className, i));
				}
				v = r;
			}), g.forEach(function(t) {
				var r = t.elementRect.rect, a = m - r[f.start], c = r[f.end] - h, d = [0, 0], p = [0, 0];
				d[l] = n[l] - a, d[u] = _, p[l] = n[l] + h - m, p[u] = _, o.push(qa(e, s, "dashed", o.length, a, d, t.className, i)), o.push(qa(e, s, "dashed", o.length, c, p, t.className, i));
			});
		});
	}), o;
}
function Xa(e, t, n, r, i) {
	var a = [];
	return ["horizontal", "vertical"].forEach(function(o) {
		var s = t.filter(function(e) {
			return e.type === o;
		}).slice(0, 1), c = o === "vertical" ? 0 : 1, l = +!c, u = c ? Pi : Ni, d = c ? Ni : Pi, f = r[u.start], p = r[u.end], m = r[d.start], h = r[d.end];
		s.forEach(function(t) {
			var r = t.gap, o = t.gapRects, s = Math.max.apply(Math, Y([m], J(o.map(function(e) {
				return e.rect[d.start];
			})), !1)), g = Math.min.apply(Math, Y([h], J(o.map(function(e) {
				return e.rect[d.end];
			})), !1)), _ = (s + g) / 2;
			s === g || _ === (m + h) / 2 || o.forEach(function(t) {
				var o = t.rect, s = t.className, d = [n[0], n[1]];
				if (o[u.end] < f) d[c] += o[u.end] - f;
				else if (p < o[u.start]) d[c] += o[u.start] - f - r;
				else return;
				d[l] += _ - m, a.push(qa(e, c ? "vertical" : "horizontal", "gap", a.length, r, d, s, i));
			});
		});
	}), a;
}
function Za(e) {
	var t = e.state, n = t.containerClientRect, r = t.hasFixed, i = n.overflow, a = n.scrollHeight, o = n.scrollWidth, s = n.clientHeight, c = n.clientWidth, l = n.clientLeft, u = n.clientTop, d = e.props, f = d.snapGap, p = f === void 0 || f, m = d.verticalGuidelines, h = d.horizontalGuidelines, g = d.snapThreshold, _ = g === void 0 ? 5 : g, v = d.maxSnapElementGuidelineDistance, y = v === void 0 ? Infinity : v, b = d.isDisplayGridGuidelines, x = Wo(ls(e.state)), S = x.top, C = x.left, w = x.bottom, T = x.right, E = {
		top: S,
		left: C,
		bottom: w,
		right: T,
		center: (C + T) / 2,
		middle: (S + w) / 2
	}, D = Y([], J(no(e)), !1), O = (t.snapThresholdInfo?.multiples ?? [1, 1]).map(function(e) {
		return e * _;
	});
	p && D.push.apply(D, Y([], J(Qa(e, E, O)), !1));
	var k = q({}, t.snapOffset || {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	});
	if (D.push.apply(D, Y([], J(eo(e, i ? o : c, i ? a : s, l, u, k, b)), !1)), r) {
		var A = n.left, j = n.top;
		k.left += A, k.top += j, k.right += A, k.bottom += j;
	}
	return D.push.apply(D, Y([], J(io(h || !1, m || !1, i ? o : c, i ? a : s, l, u, k)), !1)), D = D.filter(function(e) {
		var t = e.element, n = e.elementRect, r = e.type;
		if (!t || !n) return !0;
		var i = n.rect;
		return to(E, i, r, y);
	}), D;
}
function Qa(e, t, n) {
	var r = e.props, i = r.maxSnapElementGuidelineDistance, a = i === void 0 ? Infinity : i, o = r.maxSnapElementGapDistance, s = o === void 0 ? Infinity : o, c = e.state.elementRects, l = [];
	return [[
		"vertical",
		Ni,
		Pi
	], [
		"horizontal",
		Pi,
		Ni
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
			x && to(t, m, i, a) && (x > s || l.push({
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
function $a(e, t, n, r) {
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
				var f = m[l], p = m[s], g = Pe(h.map(function(e) {
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
				var x = (-e + 1) / 2, S = te(p - d, p - d + f, x, 1 - x);
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
function eo(e, t, n, r, i, a, o) {
	r === void 0 && (r = 0), i === void 0 && (i = 0);
	var s = e.props, c = e.state, l = s.snapGridWidth, u = l === void 0 ? 0 : l, d = s.snapGridHeight, f = d === void 0 ? 0 : d, p = [], m = a.left, h = a.top, g = [0, 0];
	$a(e, r, i, a);
	var _ = c.snapThresholdInfo, v = u, y = f;
	if (_ && (u *= _.multiples[0] || 1, f *= _.multiples[1] || 1, g = _.offset), f) {
		for (var b = function(e) {
			p.push({
				type: "horizontal",
				pos: [m, W(g[1] * y + e - i + h, .1)],
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
				pos: [W(g[0] * v + e - r + m, .1), h],
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
function to(e, t, n, r) {
	return n === "horizontal" ? $(e.right - t.left) <= r || $(e.left - t.right) <= r || e.left <= t.right && t.left <= e.right : n !== "vertical" || $(e.bottom - t.top) <= r || $(e.top - t.bottom) <= r || e.top <= t.bottom && t.top <= e.bottom;
}
function no(e) {
	var t = e.state, n = e.props.elementGuidelines, r = n === void 0 ? [] : n;
	if (!r.length) return t.elementRects = [], [];
	var i = (t.elementRects || []).filter(function(e) {
		return !e.refresh;
	}), a = r.map(function(e) {
		return re(e) && "element" in e ? q(q({}, e), { element: Ns(e.element, !0) }) : { element: Ns(e, !0) };
	}).filter(function(e) {
		return e.element;
	}), o = Lt(i.map(function(e) {
		return e.element;
	}), a.map(function(e) {
		return e.element;
	})), s = o.maintained, c = o.added, l = [];
	s.forEach(function(e) {
		var t = J(e, 2), n = t[0], r = t[1];
		l[r] = i[n];
	}), ao(e, c.map(function(e) {
		return a[e];
	})).map(function(e, t) {
		l[c[t]] = e;
	}), t.elementRects = l;
	var u = Li(e.props.elementSnapDirections), d = [];
	return l.forEach(function(e) {
		var t = e.element, n = e.top, r = n === void 0 ? u.top : n, i = e.left, a = i === void 0 ? u.left : i, o = e.right, s = o === void 0 ? u.right : o, c = e.bottom, l = c === void 0 ? u.bottom : c, f = e.center, p = f === void 0 ? u.center : f, m = e.middle, h = m === void 0 ? u.middle : m, g = e.className, _ = e.rect, v = zi({
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
				elementDirection: Mi[S[r]] || S[r],
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
				elementDirection: Mi[x[r]] || x[r],
				direction: ""
			});
		});
	}), d;
}
function ro(e, t) {
	return e ? e.map(function(e) {
		var n = re(e) ? e : { pos: e }, r = n.pos;
		return ie(r) ? n : q(q({}, n), { pos: Se(r, t) });
	}) : [];
}
function io(e, t, n, r, i, a, o) {
	i === void 0 && (i = 0), a === void 0 && (a = 0), o === void 0 && (o = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	});
	var s = [], c = o.left, l = o.top, u = o.bottom, d = n + o.right - c, f = r + u - l;
	return ro(e, f).forEach(function(e) {
		s.push({
			type: "horizontal",
			pos: [c, W(e.pos - a + l, .1)],
			size: d,
			className: e.className,
			direction: ""
		});
	}), ro(t, d).forEach(function(e) {
		s.push({
			type: "vertical",
			pos: [W(e.pos - i + c, .1), l],
			size: f,
			className: e.className,
			direction: ""
		});
	}), s;
}
function ao(e, t) {
	if (!t.length) return [];
	var n = e.props.groupable, r = e.state, i = r.containerClientRect, a = r.rootMatrix, o = r.is3d, s = r.offsetDelta, c = o ? 4 : 3, l = J(Bi(a, i, c), 2), u = l[0], d = l[1], f = n ? 0 : s[0], p = n ? 0 : s[1];
	return t.map(function(e) {
		var t = e.element.getBoundingClientRect(), n = t.left - u - f, r = t.top - d - p, i = r + t.height, o = n + t.width, s = J(ws(a, [n, r], c), 2), l = s[0], m = s[1], h = J(ws(a, [o, i], c), 2), g = h[0], _ = h[1];
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
function oo(e) {
	var t = e.state, n = t.container, r = e.props.snapContainer || n;
	if (t.snapContainer === r && t.guidelines && t.guidelines.length) return !1;
	var i = t.containerClientRect, a = {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0
	};
	if (n !== r) {
		var o = Ns(r, !0);
		if (o) {
			var s = is(o), c = Is(t, [s.left - i.left, s.top - i.top]), l = Is(t, [s.right - i.right, s.bottom - i.bottom]);
			a.left = W(c[0], 1e-5), a.top = W(c[1], 1e-5), a.right = W(l[0], 1e-5), a.bottom = W(l[1], 1e-5);
		}
	}
	return t.snapContainer = r, t.snapOffset = a, t.guidelines = Za(e), t.enableSnap = !0, !0;
}
function so(e, t, n, r, i, a) {
	var o = Uo(e, t, n, a ? 4 : 3);
	return cs(o, K(i, Mr(o, r)));
}
function co(e) {
	return e ? e / $(e) : 0;
}
function lo(e, t, n, r, i, a) {
	var o = a.fixedDirection, s = na(n, o, r), c = fa(e, t, n, r), l = Y(Y([], J(Ea(e, t, s, r, i, a)), !1), J(la(e, c, a)), !1), u = ta(l, 0), d = ta(l, 1);
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
function uo(e, t, n, r, i, a, o, s, c) {
	var l = Mr(t, o), u = Ca(e, s, {
		vertical: [l[0]],
		horizontal: [l[1]]
	}), d = u.horizontal.offset, f = u.vertical.offset;
	if (W(f, or) || W(d, or)) {
		var p = J(Er({
			datas: c,
			distX: -f,
			distY: -d
		}), 2), m = p[0], h = p[1], g = Math.min(i || Infinity, n + o[0] * m), _ = Math.min(a || Infinity, r + o[1] * h);
		return [g - n, _ - r];
	}
	return [0, 0];
}
function fo(e, t, n, r, i, a, o, s) {
	for (var c = ls(e.state), l = e.props.keepRatio, u = 0, d = 0, f = 0; f < 2; ++f) {
		var p = lo(e, t(u, d), i, l, o, s), m = p.width, h = p.height, g = m.isBound, _ = h.isBound, v = m.offset, y = h.offset;
		if (f === 1 && (g || (v = 0), _ || (y = 0)), f === 0 && o && !g && !_) return [0, 0];
		if (l) {
			var b = $(v) * (n ? 1 / n : 1), x = $(y) * (r ? 1 / r : 1);
			(g && _ ? b < x : _ || !g && b < x) ? v = n * y / r : y = r * v / n;
		}
		u += v, d += y;
	}
	if (!l && i[0] && i[1]) {
		var S = ka(e, c, i, a, s), C = S.maxWidth, w = S.maxHeight, T = J(uo(e, t(u, d).map(function(e) {
			return e.map(function(e) {
				return W(e, or);
			});
		}), n + u, r + d, C, w, i, o, s), 2), v = T[0], y = T[1];
		u += v, d += y;
	}
	return [u, d];
}
function po(e) {
	return e < 0 && (e = e % 360 + 360), e %= 360, e;
}
function mo(e, t) {
	t = po(t);
	var n = Math.floor(e / 360), r = n * 360 + 360 - t, i = n * 360 + t;
	return $(e - r) < $(e - i) ? r : i;
}
function ho(e, t) {
	e = po(e), t = po(t);
	var n = po(e - t);
	return Math.min(n, 360 - n);
}
function go(e, t, n, r) {
	var i = e.props, a = i[Hi] ?? 5, o = i[Ui];
	if (Ii(e, "rotatable")) {
		var s = t.pos1, c = t.pos2, l = t.pos3, u = t.pos4, d = t.origin, f = n * Math.PI / 180, p = [
			s,
			c,
			l,
			u
		].map(function(e) {
			return K(e, d);
		}), m = p.map(function(e) {
			return dt(e, f);
		}), h = Y(Y([], J(ki(e, p, m, d, n)), !1), J(ga(e, p, m, d, n)), !1);
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
			return ho(e, r) - ho(t, r);
		})[0];
		if (ho(_, r) <= a) return {
			isSnap: !0,
			dist: n + mo(r, _) - r
		};
	}
	return {
		isSnap: !1,
		dist: n
	};
}
function _o(e, t, n, r, i, a, o) {
	if (!Ii(e, "resizable")) return [0, 0];
	var s = o.fixedDirection, c = o.nextAllMatrix, l = e.state, u = l.allMatrix, d = l.is3d;
	return fo(e, function(e, r) {
		return so(c || u, t + e, n + r, s, i, d);
	}, t, n, r, i, a, o);
}
function vo(e, t, n, r, i) {
	if (!Ii(e, "scalable")) return [0, 0];
	var a = i.startOffsetWidth, o = i.startOffsetHeight, s = i.fixedPosition, c = i.fixedDirection, l = i.is3d, u = fo(e, function(e, n) {
		return so(Ir(i, G(t, [e / a, n / o])), a, o, c, s, l);
	}, a, o, n, s, r, i);
	return [u[0] / a, u[1] / o];
}
function yo(e, t) {
	t.absolutePoses = ls(e.state);
}
function bo(e) {
	var t = [];
	return e.forEach(function(e) {
		e.guidelineInfos.forEach(function(n) {
			var r = n.guideline;
			ve(t, function(e) {
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
function xo(e, t, n, r, i, a) {
	var o = Ci(wi(e, a), t, n), s = o.vertical, c = o.horizontal, l = Fi();
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
	var u = _a(e), d = u.boundMap, f = u.vertical, p = u.horizontal;
	return f.forEach(function(e) {
		_e(r, function(t) {
			var n = t.type, r = t.pos;
			return n === "bounds" && r === e;
		}) >= 0 || r.push({
			type: "bounds",
			pos: e
		});
	}), p.forEach(function(e) {
		_e(i, function(t) {
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
var So = As("", ["resizable", "scalable"]), Co = {
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
		Hi,
		Ui,
		Wi,
		Gi,
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
		if (!l || !l.render || !Ii(e, "")) return Us(e, "boundMap", Fi(), function(e) {
			return JSON.stringify(e);
		}), Us(e, "innerBoundMap", Fi(), function(e) {
			return JSON.stringify(e);
		}), [];
		n.guidelines = Za(e);
		var f = Math.min(a[0], o[0], s[0], c[0]), p = Math.min(a[1], o[1], s[1], c[1]), m = l.externalPoses || [], h = ls(e.state), g = [], _ = [], v = [], y = [], b = [], x = Wo(h), S = x.width, C = x.height, w = x.top, T = x.left, E = x.bottom, D = x.right, O = {
			left: T,
			right: D,
			top: w,
			bottom: E,
			center: (T + D) / 2,
			middle: (w + E) / 2
		}, k = m.length > 0, A = k ? Wo(m) : {};
		if (!l.request) {
			if (l.direction && b.push($i(e, h, l.direction, d, d)), l.snap) {
				var j = Wo(h);
				l.center && (j.middle = (j.top + j.bottom) / 2, j.center = (j.left + j.right) / 2), b.push(Xi(e, j, d, d));
			}
			k && (l.center && (A.middle = (A.top + A.bottom) / 2, A.center = (A.left + A.right) / 2), b.push(Xi(e, A, d, d))), b.forEach(function(e) {
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
				})), !1)), v.push.apply(v, Y([], J(bo(t)), !1)), y.push.apply(y, Y([], J(bo(n)), !1));
			});
		}
		var M = xo(e, [T, D], [w, E], g, _), N = M.boundMap, P = M.innerBoundMap;
		k && xo(e, [A.left, A.right], [A.top, A.bottom], g, _, l.externalBounds);
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
		var R = Us(e, "boundMap", N, function(e) {
			return JSON.stringify(e);
		}, Fi()), z = Us(e, "innerBoundMap", P, function(e) {
			return JSON.stringify(e);
		}, Fi());
		return (N === R || P === z) && Q(e, "onBound", {
			bounds: N,
			innerBounds: P
		}, !0), Y(Y(Y(Y(Y(Y([], J(Ya(e, I, [f, p], O, t)), !1), J(Xa(e, L, [f, p], O, t)), !1), J(Ka(e, "horizontal", y, [i, r], O, t)), !1), J(Ka(e, "vertical", v, [i, r], O, t)), !1), J(Ga(e, "horizontal", _, f, r, S, 0, t)), !1), J(Ga(e, "vertical", g, p, i, C, 1, t)), !1);
	},
	dragStart: function(e, t) {
		e.state.snapRenderInfo = {
			request: t.isRequest,
			snap: !0,
			center: !0
		}, oo(e);
	},
	drag: function(e) {
		var t = e.state;
		oo(e) || (t.guidelines = Za(e)), t.snapRenderInfo && (t.snapRenderInfo.render = !0);
	},
	pinchStart: function(e) {
		this.unset(e);
	},
	dragEnd: function(e) {
		this.unset(e);
	},
	dragControlCondition: function(e, t) {
		if (So(e, t) || Va(e, t)) return !0;
		if (!t.isRequest && t.inputEvent) return Fe(t.inputEvent.target, X("snap-control"));
	},
	dragControlStart: function(e) {
		e.state.snapRenderInfo = null, oo(e);
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
		e.state.snapRenderInfo = null, oo(e);
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
function wo(e, t) {
	return [e[0] * t[0], e[1] * t[1]];
}
function X() {
	var e = [...arguments];
	return O.apply(void 0, Y([rr], J(e), !1));
}
function To(e) {
	e();
}
function Eo(e) {
	return !e || e === "none" ? [
		1,
		0,
		0,
		1,
		0,
		0
	] : re(e) ? e : xt(e);
}
function Do(e, t, n) {
	return nt(t, _t(n, t), e, _t(n.map(function(e) {
		return -e;
	}), t));
}
function Oo(e, t, n) {
	return t === "%" ? zo(e.ownerSVGElement)[n ? "width" : "height"] / 100 : 1;
}
function ko(e) {
	return jo(gs(e, ":before")).map(function(t, n) {
		var r = me(t), i = r.value, a = r.unit;
		return i * Oo(e, a, n === 0);
	});
}
function Ao(e) {
	return e ? e.split(" ") : ["0", "0"];
}
function jo(e) {
	return Ao(e.transformOrigin);
}
function Mo(e) {
	var t = ui(e)("transform");
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
function No(e, t, n, r, i) {
	var a = Ve(e) || He(e), o = !1, s, c;
	if (!e || n) s = e;
	else {
		var l = e?.assignedSlot?.parentElement, u = e.parentElement;
		l ? (o = !0, c = u, s = l) : s = u;
	}
	for (var d = !1, f = e === t || s === t, p = "relative", m = 1, h = parseFloat(i?.("zoom")) || 1, g = i?.("position"); s && s !== a;) {
		t === s && (f = !0);
		var _ = ui(s), v = s.tagName.toLowerCase(), y = Mo(s), b = _("willChange"), x = parseFloat(_("zoom")) || 1;
		if (p = _("position"), r && x !== 1) {
			m = x;
			break;
		}
		if (!n && r && h !== 1 && g && g !== "absolute" || v === "svg" || v === "foreignobject" || p !== "static" || y && y !== "none" || b === "transform") break;
		var S = e?.assignedSlot?.parentNode, C = s.parentNode;
		S && (o = !0, c = C);
		var w = C;
		if (w && w.nodeType === 11) {
			s = w.host, d = !0, p = ui(s)("position");
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
function Po(e, t) {
	var n, r = e.tagName.toLowerCase(), i = e.offsetLeft, a = e.offsetTop, o = ui(e), s = ne(i), c = !s, l, u;
	return !c && (r !== "svg" || e.ownerSVGElement) ? (l = Jn ? ko(e) : Ao(o("transformOrigin")).map(function(e) {
		return parseFloat(e);
	}), u = l.slice(), c = !0, r === "svg" ? (i = 0, a = 0) : (n = J(Vo(e, l, e === t && t.tagName.toLowerCase() === "g"), 4), i = n[0], a = n[1], l[0] = n[2], l[1] = n[3])) : (l = Ao(o("transformOrigin")).map(function(e) {
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
function Fo(e, t) {
	var n = ui(e), r = ui(He(e)), i = r("position");
	if (!t && (!i || i === "static")) return [0, 0];
	var a = parseInt(r("marginLeft"), 10), o = parseInt(r("marginTop"), 10);
	return n("position") === "absolute" && ((n("top") !== "auto" || n("bottom") !== "auto") && (o = 0), (n("left") !== "auto" || n("right") !== "auto") && (a = 0)), [a, o];
}
function Io(e) {
	e.forEach(function(e) {
		var t = e.matrix;
		t && (e.matrix = tt(t, 3, 4));
	});
}
function Lo(e) {
	for (var t = e.parentElement, n = !1, r = He(e); t;) {
		var i = gs(t).transform;
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
function Ro(e, t) {
	return t === void 0 && (t = e.length > 9), `${t ? "matrix3d" : "matrix"}(${at(e, !t).join(",")})`;
}
function zo(e) {
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
function Bo(e, t) {
	var n, r = zo(e), i = r.width, a = r.height, o = r.clientWidth, s = r.clientHeight, c = o / i, l = s / a, u = e.preserveAspectRatio.baseVal, d = u.align, f = u.meetOrSlice, p = [0, 0], m = [c, l], h = [0, 0];
	if (d !== 1) {
		var g = (d - 2) % 3, _ = Math.floor((d - 2) / 3);
		p[0] = i * g / 2, p[1] = a * _ / 2;
		var v = f === 2 ? Math.max(l, c) : Math.min(c, l);
		m[0] = v, m[1] = v, h[0] = (o - i) / 2 * g, h[1] = (s - a) / 2 * _;
	}
	var y = gt(m, t);
	return n = J(h, 2), y[t * (t - 1)] = n[0], y[t * (t - 1) + 1] = n[1], Do(y, t, p);
}
function Vo(e, t, n) {
	var r = e.tagName.toLowerCase();
	if (!e.getBBox || !n && r === "g") return [
		0,
		0,
		0,
		0
	];
	var i = ui(e)("transform-box") === "fill-box", a = e.getBBox(), o = zo(e.ownerSVGElement), s = a.x, c = a.y;
	r === "foreignobject" && !s && !c && (s = parseFloat(e.getAttribute("x")) || 0, c = parseFloat(e.getAttribute("y")) || 0);
	var l = s - o.x, u = c - o.y;
	return [
		l,
		u,
		i ? t[0] : t[0] - l,
		i ? t[1] : t[1] - u
	];
}
function Ho(e, t, n) {
	return ot(e, et(t, n), n);
}
function Uo(e, t, n, r) {
	return [
		[0, 0],
		[t, 0],
		[0, n],
		[t, n]
	].map(function(t) {
		return Ho(e, t, r);
	});
}
function Wo(e) {
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
function Go(e, t, n, r) {
	return Wo(Uo(e, t, n, r));
}
function Ko(e, t, n, r, i) {
	var a, o = e.target, s = e.origin, c = t.matrix, l = $o(o), u = l.offsetWidth, d = l.offsetHeight, f = n.getBoundingClientRect(), p = [0, 0];
	n === He(n) && (p = Fo(o, !0));
	for (var m = o.getBoundingClientRect(), h = m.left - f.left + n.scrollLeft - (n.clientLeft || 0) + p[0], g = m.top - f.top + n.scrollTop - (n.clientTop || 0) + p[1], _ = m.width, v = m.height, y = nt(r, i, c), b = Go(y, u, d, r), x = b.left, S = b.top, C = b.width, w = b.height, T = Ho(y, s, r), E = K(T, [x, S]), D = [h + E[0] * _ / C, g + E[1] * v / w], O = [0, 0], k = 0; ++k < 10;) {
		var A = Xe(i, r);
		a = J(K(Ho(A, D, r), Ho(A, T, r)), 2), O[0] = a[0], O[1] = a[1];
		var j = Go(nt(r, i, _t(O, r), c), u, d, r), M = j.left, N = j.top, P = M - h, F = N - g;
		if ($(P) < 2 && $(F) < 2) break;
		D[0] -= P, D[1] -= F;
	}
	return O.map(function(e) {
		return Math.round(e);
	});
}
function qo(e, t, n) {
	var r = e.length === 16 ? 4 : 3, i = t.map(function(t) {
		return Ho(e, t, r);
	}), a = n.left, o = n.top;
	return i.map(function(e) {
		return [e[0] + a, e[1] + o];
	});
}
function Jo(e) {
	return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Yo(e, t) {
	return Jo([t[0] - e[0], t[1] - e[1]]);
}
function Xo(e, t, n, r) {
	n === void 0 && (n = 1), r === void 0 && (r = Oe(e, t));
	var i = Yo(e, t);
	return {
		transform: `translateY(-50%) translate(${e[0]}px, ${e[1]}px) rotate(${r}rad) scaleY(${n})`,
		width: `${i}px`
	};
}
function Zo(e, t) {
	var n = [...arguments].slice(2), r = n.length;
	return { transform: `translateZ(0px) translate(${n.reduce(function(e, t) {
		return e + t[0];
	}, 0) / r}px, ${n.reduce(function(e, t) {
		return e + t[1];
	}, 0) / r}px) rotate(${e}rad) scale(${t})` };
}
function Qo(e, t) {
	var n = e[t];
	return re(n) ? q(q({}, e), n) : e;
}
function $o(e) {
	var t = e && !ne(e.offsetWidth), n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = Infinity, h = Infinity, g = Infinity, _ = Infinity, v = 0, y = 0, b = !1;
	if (e) if (!t && e.ownerSVGElement) {
		var x = e.getBBox();
		b = !0, n = x.width, r = x.height, o = n, s = r, c = n, l = r, i = n, a = r;
	} else {
		var S = ui(e), C = e.style, w = S("boxSizing") === "border-box", T = parseFloat(S("borderLeftWidth")) || 0, E = parseFloat(S("borderRightWidth")) || 0, D = parseFloat(S("borderTopWidth")) || 0, O = parseFloat(S("borderBottomWidth")) || 0, k = parseFloat(S("paddingLeft")) || 0, A = parseFloat(S("paddingRight")) || 0, j = parseFloat(S("paddingTop")) || 0, M = parseFloat(S("paddingBottom")) || 0, N = k + A, P = j + M, F = T + E, I = D + O, L = N + F, R = P + I, z = S("position"), B = 0, ee = 0;
		if ("clientLeft" in e) {
			var V = null;
			if (V = z === "absolute" ? No(e, He(e)).offsetParent : e.parentElement, V) {
				var te = ui(V);
				B = parseFloat(te("width")), ee = parseFloat(te("height"));
			}
		}
		u = Math.max(N, Se(S("minWidth"), B) || 0), d = Math.max(P, Se(S("minHeight"), ee) || 0), m = Se(S("maxWidth"), B), h = Se(S("maxHeight"), ee), isNaN(m) && (m = Infinity), isNaN(h) && (h = Infinity), v = Se(C.width, 0) || 0, y = Se(C.height, 0) || 0, o = parseFloat(S("width")) || 0, s = parseFloat(S("height")) || 0, c = $(o - v) < 1 ? Ce(u, v || o, m) : o, l = $(s - y) < 1 ? Ce(d, y || s, h) : s, n = c, r = l, i = c, a = l, w ? (g = m, _ = h, f = u, p = d, c = n - L, l = r - R) : (g = m + L, _ = h + R, f = u + L, p = d + R, n = c + L, r = l + R), i = c + N, a = l + P;
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
function es(e, t) {
	return Oe(t > 0 ? e[0] : e[1], t > 0 ? e[1] : e[0]);
}
function ts() {
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
function ns(e, t) {
	var n = e === He(e) || e === Ve(e), r = {
		clientLeft: e.clientLeft,
		clientTop: e.clientTop,
		clientWidth: e.clientWidth,
		clientHeight: e.clientHeight,
		scrollWidth: e.scrollWidth,
		scrollHeight: e.scrollHeight,
		overflow: !1
	};
	return n && (r.clientHeight = Math.max(t.height, r.clientHeight), r.scrollHeight = Math.max(t.height, r.scrollHeight)), r.overflow = ui(e)("overflow") !== "visible", q(q({}, t), r);
}
function rs(e, t, n, r) {
	var i = e.left, a = e.right, o = e.top, s = e.bottom, c = t.top, l = t.left, u = {
		left: l + i,
		top: c + o,
		right: l + a,
		bottom: c + s,
		width: a - i,
		height: s - o
	};
	return n && r ? ns(n, u) : u;
}
function is(e, t) {
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
	return e && t ? ns(e, s) : s;
}
function as(e) {
	var t = e.props, n = t.groupable, r = t.svgOrigin, i = e.getState(), a = i.offsetWidth, o = i.offsetHeight, s = i.svg, c = i.transformOrigin;
	return !n && s && r ? Bs(r, a, o) : c;
}
function os(e, t, n, r) {
	var i;
	if (e) i = e;
	else if (t) i = [0, 0];
	else {
		var a = n.target;
		i = ss(a, r);
	}
	return i;
}
function ss(e, t) {
	if (e) {
		var n = e.getAttribute("data-rotation") || "", r = e.getAttribute("data-direction");
		if (t.deg = n, r) {
			var i = [0, 0];
			return r.indexOf("w") > -1 && (i[0] = -1), r.indexOf("e") > -1 && (i[0] = 1), r.indexOf("n") > -1 && (i[1] = -1), r.indexOf("s") > -1 && (i[1] = 1), i;
		}
	}
}
function cs(e, t) {
	return [
		G(t, e[0]),
		G(t, e[1]),
		G(t, e[2]),
		G(t, e[3])
	];
}
function ls(e) {
	var t = e.left, n = e.top, r = e.pos1, i = e.pos2, a = e.pos3, o = e.pos4;
	return cs([
		r,
		i,
		a,
		o
	], [t, n]);
}
function us(e, t) {
	e[t ? "controlAbles" : "targetAbles"].forEach(function(t) {
		t.unset && t.unset(e);
	});
}
function ds(e, t) {
	var n = t ? "controlGesto" : "targetGesto", r = e[n];
	r?.isIdle() === !1 && us(e, t), r?.unset(), e[n] = null;
}
function fs(e, t) {
	if (t) {
		var n = Vr(t);
		n.nextStyle = q(q({}, n.nextStyle), e);
	}
	return {
		style: e,
		cssText: xe(e).map(function(t) {
			return `${he(t, "-")}: ${e[t]};`;
		}).join("")
	};
}
function ps(e, t, n) {
	var r = t.afterTransform || t.transform;
	return q(q({}, fs(q(q(q({}, e.style), t.style), { transform: r }), n)), {
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
function ms(e, t, n) {
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
function hs(e, t, n) {
	e._emitter.on(t, n);
}
function Q(e, t, n, r, i) {
	return e.triggerEvent(t, n, r, i);
}
function gs(e, t) {
	return Ue(e).getComputedStyle(e, t);
}
function _s(e, t, n) {
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
function vs(e, t) {
	return e === t || e == null && t == null;
}
function ys() {
	for (var e = [...arguments], t = e.length - 1, n = 0; n < t; ++n) {
		var r = e[n];
		if (!ne(r)) return r;
	}
	return e[t];
}
function bs(e, t) {
	var n = [], r = [];
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r.indexOf(o), c = n[s] || [];
		s === -1 && (r.push(o), n.push(c)), c.push(i);
	}), n;
}
function xs(e, t) {
	var n = [], r = {};
	return e.forEach(function(i, a) {
		var o = t(i, a, e), s = r[o];
		s || (s = [], r[o] = s, n.push(s)), s.push(i);
	}), n;
}
function Ss(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
function Cs() {
	var e = [...arguments];
	return e.sort(function(e, t) {
		return $(t) - $(e);
	}), e[0];
}
function ws(e, t, n) {
	return ot(Xe(e, n), et(t, n), n);
}
function Ts(e, t) {
	var n, r = e.is3d, i = e.rootMatrix, a = r ? 4 : 3;
	return n = J(ws(i, [t.distX, t.distY], a), 2), t.distX = n[0], t.distY = n[1], t;
}
function Es(e, t, n, r) {
	if (!n[0] && !n[1]) return t;
	var i = Ho(e, [co(n[0] || 1), 0], r), a = Ho(e, [0, co(n[1] || 1)], r);
	return G(t, Ho(e, [n[0] / Jo(i), n[1] / Jo(a)], r));
}
function Ds(e, t, n) {
	return n ? `${e / t * 100}%` : `${e}px`;
}
function Os(e) {
	return $(e) <= sr ? 0 : e;
}
function ks(e) {
	return function(t) {
		if (!t.isDragging(e)) return "";
		var n = ei(t, e).deg;
		return n ? X(`view-control-rotation${n}`) : "";
	};
}
function As(e, t) {
	return t === void 0 && (t = [e]), function(n, r) {
		if (r.isRequest) return t.some(function(e) {
			return r.requestAble === e;
		}) ? r.parentDirection : !1;
		var i = r.inputEvent.target;
		return Fe(i, X("direction")) && (!e || Fe(i, X(e)));
	};
}
function js(e, t, n) {
	var r = wt(e, {
		"x%": function(e) {
			return e / 100 * t.offsetWidth;
		},
		"y%": function(e) {
			return e / 100 * t.offsetHeight;
		}
	}), i = e.slice(0, n < 0 ? void 0 : n), a = e.slice(0, n < 0 ? void 0 : n + 1), o = e[n] || "", s = n < 0 ? [] : e.slice(n), c = n < 0 ? [] : e.slice(n + 1), l = r.slice(0, n < 0 ? void 0 : n), u = r.slice(0, n < 0 ? void 0 : n + 1), d = r[n] ?? wt([""])[0], f = n < 0 ? [] : r.slice(n), p = n < 0 ? [] : r.slice(n + 1), m = d ? [d] : [], h = Ct(l), g = Ct(u), _ = Ct(f), v = Ct(p), y = rt(h, _, 4);
	return {
		transforms: e,
		beforeFunctionMatrix: h,
		beforeFunctionMatrix2: g,
		targetFunctionMatrix: Ct(m),
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
function Ms(e) {
	return !e || !re(e) || Ge(e) ? !1 : H(e) || "length" in e;
}
function Ns(e, t) {
	return e ? Ge(e) ? e : U(e) ? t ? document.querySelector(e) : e : ae(e) ? e() : We(e) ? e : "current" in e ? e.current : e : null;
}
function Ps(e, t) {
	return e ? (Ms(e) ? [].slice.call(e) : [e]).reduce(function(e, n) {
		return U(n) && t ? Y(Y([], J(e), !1), J([].slice.call(document.querySelectorAll(n))), !1) : (H(n) ? e.push(Ps(n, t)) : e.push(Ns(n, t)), e);
	}, []) : [];
}
function Fs(e, t, n) {
	var r = Oe(e, t) / Math.PI * 180;
	return r = n >= 0 ? r : 180 - r, r = r >= 0 ? r : 360 + r, r;
}
function Is(e, t) {
	var n = e.rootMatrix, r = e.is3d, i = Xe(n, r ? 4 : 3);
	return r || (i = tt(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, St(i, t);
}
function Ls(e, t, n, r, i) {
	var a = J(e, 2), o = a[0], s = a[1], c = 0, l = 0;
	if (i && o && s) {
		var u = Oe([0, 0], t), d = Oe([0, 0], r), f = Jo(t), p = Math.cos(u - d) * f;
		if (!r[0]) l = p, c = l * n;
		else if (!r[1]) c = p, l = c / n;
		else {
			var m = r[0] * o, h = r[1] * s, g = Math.atan2(m + t[0], h + t[1]), _ = Math.atan2(m, h);
			g < 0 && (g += Math.PI * 2), _ < 0 && (_ += Math.PI * 2);
			var v = 0;
			$(g - _) < Math.PI / 2 || $(g - _) > Math.PI / 2 * 3 || (_ += Math.PI), v = g - _, v > Math.PI * 2 ? v -= Math.PI * 2 : v > Math.PI ? v = 2 * Math.PI - v : v < -Math.PI && (v = -2 * Math.PI - v);
			var y = Jo([m + t[0], h + t[1]]) * Math.cos(v);
			c = y * Math.sin(_) - m, l = y * Math.cos(_) - h, r[0] < 0 && (c *= -1), r[1] < 0 && (l *= -1);
		}
	} else c = r[0] * t[0], l = r[1] * t[1];
	return [c, l];
}
function Rs(e, t, n, r) {
	var i, a = n.ratio, o = n.startOffsetWidth, s = n.startOffsetHeight, c = 0, l = 0, u = r.distX, d = r.distY, f = r.pinchScale, p = r.parentDistance, m = r.parentDist, h = r.parentScale, g = n.fixedDirection, _ = [0, 1].map(function(t) {
		return $(e[t] - g[t]);
	}), v = [0, 1].map(function(e) {
		var t = _[e];
		return t !== 0 && (t = 2 / t), t;
	});
	if (m) c = m[0], l = m[1], t && (c ? l ||= c / a : c = l * a);
	else if (ie(f)) c = (f - 1) * o, l = (f - 1) * s;
	else if (h) c = (h[0] - 1) * o, l = (h[1] - 1) * s;
	else if (p) {
		var y = o * _[0], b = s * _[1], x = Jo([y, b]);
		c = p / x * y * v[0], l = p / x * b * v[1];
	} else {
		var S = Er({
			datas: n,
			distX: u,
			distY: d
		});
		S = v.map(function(e, t) {
			return S[t] * e;
		}), i = J(Ls([o, s], S, a, e, t), 2), c = i[0], l = i[1];
	}
	return {
		distWidth: c,
		distHeight: l
	};
}
function zs(e, t) {
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
		var n = J(e.split(" "), 2), r = n[0], i = n[1], a = zs(r || ""), o = zs(i || ""), s = q(q({}, a), o), c = {
			x: "50%",
			y: "50%"
		};
		return s.x && (c.x = s.x), s.y && (c.y = s.y), s.value && (s.x && !s.y && (c.y = s.value), !s.x && s.y && (c.x = s.value)), c;
	}
	return e === "left" ? { x: "0%" } : e === "right" ? { x: "100%" } : e === "top" ? { y: "0%" } : e === "bottom" ? { y: "100%" } : e ? e === "center" ? { value: "50%" } : { value: e } : {};
}
function Bs(e, t, n) {
	var r = zs(e, !0), i = r.x, a = r.y;
	return [Se(i, t) || 0, Se(a, n) || 0];
}
function Vs(e, t, n) {
	var r = e.map(function(e) {
		return K(e, t);
	}), i = r.map(function(e) {
		return dt(e, n);
	});
	return {
		prev: r,
		next: i,
		result: i.map(function(e) {
			return G(e, t);
		})
	};
}
function Hs(e, t) {
	return e.length === t.length && e.every(function(e, n) {
		var r = t[n], i = H(e), a = H(r);
		return i && a ? Hs(e, r) : !i && !a && e === r;
	});
}
function Us(e, t, n, r, i) {
	var a = e._store, o = a[t];
	if (!(t in a)) if (i != null) a[t] = i, o = i;
	else return a[t] = n, n;
	return o === n || r(o) === r(n) ? o : (a[t] = n, n);
}
function Ws(e) {
	return e >= 0 ? 1 : -1;
}
function $(e) {
	return Math.abs(e);
}
function Gs(e, t) {
	return Ne(e).map(function(e) {
		return t(e);
	});
}
function Ks(e) {
	return ie(e) ? {
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
var qs = Vn("pinchable", {
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
			var s = `onPinch${a ? "Group" : ""}End`, c = ms(e, t, { isDrag: r });
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
}), Js = As("scalable"), Ys = {
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
	render: yi("scalable"),
	dragControlCondition: Js,
	viewClassName: ks("scalable"),
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.inputEvent, a = t.parentDirection, o = os(a, r, i, n), s = e.state, c = s.width, l = s.height, u = s.targetTransform, d = s.target, f = s.pos1, p = s.pos2, m = s.pos4;
		if (!o || !d) return !1;
		r || yr(e, t), n.datas = {}, n.transform = u, n.prevDist = [1, 1], n.direction = o, n.startOffsetWidth = c, n.startOffsetHeight = l, n.startValue = [1, 1];
		var h = !o[0] && !o[1] || o[0] || !o[1];
		Rr(e, t, "scale"), n.isWidth = h;
		function g(e) {
			n.ratio = e && isFinite(e) ? e : 0;
		}
		n.startPositions = ls(e.state);
		function _(e) {
			var t = ja(n.startPositions, e);
			n.fixedDirection = t.fixedDirection, n.fixedPosition = t.fixedPosition, n.fixedOffset = t.fixedOffset;
		}
		n.setFixedDirection = _, g(je(f, p) / je(p, m)), _([-o[0], -o[1]]);
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
		}, Lr(e, t)), { dragStart: Aa.dragStart(e, new gr().dragStart([0, 0], t)) })), x = Q(e, "onScaleStart", b);
		return n.startFixedDirection = n.fixedDirection, x !== !1 && (n.isScale = !0, e.state.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}), n.isScale ? b : !1;
	},
	dragControl: function(e, t) {
		xr(e, t, "scale");
		var n = t.datas, r = t.parentKeepRatio, i = t.parentFlag, a = t.isPinch, o = t.dragClient, s = t.isRequest, c = t.useSnap, l = t.resolveMatrix, u = n.prevDist, d = n.direction, f = n.startOffsetWidth, p = n.startOffsetHeight, m = n.isScale, h = n.startValue, g = n.isWidth, _ = n.ratio;
		if (!m) return !1;
		var v = e.props, y = v.throttleScale, b = v.parentMoveable, x = d;
		!d[0] && !d[1] && (x = [1, 1]);
		var S = _ && (r ?? v.keepRatio) || !1, C = e.state, w = [h[0], h[1]];
		function T() {
			var e = Rs(x, S, n, t), r = e.distWidth, i = e.distHeight, a = f ? (f + r) / f : 1, o = p ? (p + i) / p : 1;
			h[0] || (w[0] = r / f), h[1] || (w[1] = i / p);
			var s = (x[0] || S ? a : 1) * w[0], c = (x[1] || S ? o : 1) * w[1];
			return s === 0 && (s = Ws(u[0]) * cr), c === 0 && (c = Ws(u[1]) * cr), [s, c];
		}
		var E = T();
		if (!a && e.props.groupable) {
			var D = (C.snapRenderInfo || {}).direction;
			H(D) && (D[0] || D[1]) && (C.snapRenderInfo = {
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
		var O = [E[0] / w[0], E[1] / w[1]], k = o, A = [0, 0], j = Ws(O[0] * O[1]), M = !o && !i && a;
		if (M || l ? k = Kr(e, n.targetAllTransform, [0, 0], [0, 0], n) : o || (k = n.fixedPosition), a || (A = vo(e, O, d, !c && s, n)), S) {
			x[0] && x[1] && A[0] && A[1] && (Math.abs(A[0] * f) > Math.abs(A[1] * p) ? A[1] = 0 : A[0] = 0);
			var N = !A[0] && !A[1];
			if (N && (g ? O[0] = W(O[0] * w[0], y) / w[0] : O[1] = W(O[1] * w[1], y) / w[1]), x[0] && !x[1] || A[0] && !A[1] || N && g) {
				O[0] += A[0];
				var P = f * O[0] * w[0] / _;
				O[1] = Ws(j * O[0]) * $(P / p / w[1]);
			} else if (!x[0] && x[1] || !A[0] && A[1] || N && !g) {
				O[1] += A[1];
				var F = p * O[1] * w[1] * _;
				O[0] = Ws(j * O[1]) * $(F / f / w[0]);
			}
		} else O[0] += A[0], O[1] += A[1], A[0] || (O[0] = W(O[0] * w[0], y) / w[0]), A[1] || (O[1] = W(O[1] * w[1], y) / w[1]);
		O[0] === 0 && (O[0] = Ws(u[0]) * cr), O[1] === 0 && (O[1] = Ws(u[1]) * cr), E = wo(O, [w[0], w[1]]);
		var I = [f, p], L = [f * E[0], p * E[1]];
		L = Te(L, n.minScaleSize, n.maxScaleSize, S ? _ : !1), E = Gs(2, function(e) {
			return I[e] ? L[e] / I[e] : L[e];
		}), O = Gs(2, function(e) {
			return E[e] / w[e];
		});
		var R = Gs(2, function(e) {
			return u[e] ? O[e] / u[e] : O[e];
		}), z = `scale(${O.join(", ")})`, B = `scale(${E.join(", ")})`, ee = Sr(n, B, z), V = !h[0] || !h[1], te = Jr(e, V ? B : z, n.fixedDirection, k, n.fixedOffset, n, V), ne = M ? te : K(te, n.prevInverseDist || [0, 0]);
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
		}, Gr(e, ee, ne, a, t)));
		return Q(e, "onScale", re), re;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas;
		if (!n.isScale) return !1;
		n.isScale = !1;
		var r = ms(e, t, {});
		return Q(e, "onScaleEnd", r), r;
	},
	dragGroupControlCondition: Js,
	dragGroupControlStart: function(e, t) {
		var n = t.datas, r = this.dragControlStart(e, t);
		if (!r) return !1;
		var i = di(e, "resizable", t);
		n.moveableScale = e.scale;
		var a = pi(e, this, "dragControlStart", t, function(t, r) {
			return mi(e, t, n, r);
		}), o = function(t) {
			r.setFixedDirection(t), a.forEach(function(r, a) {
				r.setFixedDirection(t), mi(e, r.moveable, n, i[a]);
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
			hs(e, "onBeforeScale", function(n) {
				Q(e, "onBeforeScaleGroup", Z(e, t, q(q({}, n), { targets: e.props.targets }), !0));
			});
			var r = this.dragControl(e, t);
			if (r) {
				var i = r.dist, a = n.moveableScale;
				e.scale = [i[0] * a[0], i[1] * a[1]];
				var o = e.props.keepRatio, s = n.fixedPosition, c = pi(e, this, "dragControl", t, function(t, n) {
					var r = J(ot(mt(e.rotation / 180 * Math.PI, 3), [
						n.datas.originalX * i[0],
						n.datas.originalY * i[1],
						1
					], 3), 2), a = r[0], c = r[1];
					return q(q({}, n), {
						parentDist: null,
						parentScale: i,
						parentKeepRatio: o,
						dragClient: G(s, [a, c])
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
			var r = pi(e, this, "dragControlEnd", t);
			return Q(e, "onScaleGroupEnd", ms(e, t, {
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
function Xs(e, t) {
	return e.map(function(e, n) {
		return te(e, t[n], 1, 2);
	});
}
function Zs(e, t, n) {
	var r = Oe(e, t), i = Oe(e, n) - r;
	return i >= 0 ? i : i + 2 * Math.PI;
}
function Qs(e, t) {
	var n = Zs(e[0], e[1], e[2]), r = Zs(t[0], t[1], t[2]), i = Math.PI;
	return !(n >= i && r <= i || n <= i && r >= i);
}
var $s = {
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
	viewClassName: ks("warpable"),
	render: function(e, t) {
		var n = e.props, r = n.resizable, i = n.scalable, a = n.warpable, o = n.zoom;
		if (r || i || !a) return [];
		var s = e.state, c = s.pos1, l = s.pos2, u = s.pos3, d = s.pos4, f = Xs(c, l), p = Xs(l, c), m = Xs(c, u), h = Xs(u, c), g = Xs(u, d), _ = Xs(d, u), v = Xs(l, d), y = Xs(d, l);
		return Y([
			t.createElement("div", {
				className: X("line"),
				key: "middeLine1",
				style: Xo(f, g, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine2",
				style: Xo(p, _, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine3",
				style: Xo(m, v, o)
			}),
			t.createElement("div", {
				className: X("line"),
				key: "middeLine4",
				style: Xo(h, y, o)
			})
		], J(bi(e, "warpable", t)), !1);
	},
	dragControlCondition: function(e, t) {
		if (t.isRequest) return !1;
		var n = t.inputEvent.target;
		return Fe(n, X("direction")) && Fe(n, X("warpable"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas, r = t.inputEvent, i = e.props.target, a = r.target, o = ss(a, n);
		if (!o || !i) return !1;
		var s = e.state, c = s.transformOrigin, l = s.is3d, u = s.targetTransform, d = s.targetMatrix, f = s.width, p = s.height, m = s.left, h = s.top;
		return n.datas = {}, n.targetTransform = u, n.warpTargetMatrix = l ? d : tt(d, 3, 4), n.targetInverseMatrix = Ye(Xe(n.warpTargetMatrix, 4), 3, 4), n.direction = o, n.left = m, n.top = h, n.poses = [
			[0, 0],
			[f, 0],
			[0, p],
			[f, p]
		].map(function(e) {
			return K(e, c);
		}), n.nextPoses = n.poses.map(function(e) {
			var t = J(e, 2), r = t[0], i = t[1];
			return ot(n.warpTargetMatrix, [
				r,
				i,
				0,
				1
			], 4);
		}), n.startValue = ht(4), n.prevMatrix = ht(4), n.absolutePoses = ls(s), n.posIndexes = kr(o), yr(e, t), Rr(e, t, "matrix3d"), s.snapRenderInfo = {
			request: t.isRequest,
			direction: o
		}, Q(e, "onWarpStart", Z(e, t, q({ set: function(e) {
			n.startValue = e;
		} }, Lr(e, t)))) !== !1 && (n.isWarp = !0), n.isWarp;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isRequest, i = t.distX, a = t.distY, o = n.targetInverseMatrix, s = n.prevMatrix, c = n.isWarp, l = n.startValue, u = n.poses, d = n.posIndexes, f = n.absolutePoses;
		if (!c) return !1;
		if (xr(e, t, "matrix3d"), Ii(e, "warpable")) {
			var p = d.map(function(e) {
				return f[e];
			});
			p.length > 1 && p.push([(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]);
			var m = Ca(e, r, {
				horizontal: p.map(function(e) {
					return e[1] + a;
				}),
				vertical: p.map(function(e) {
					return e[0] + i;
				})
			}), h = m.horizontal, g = m.vertical;
			a -= h.offset, i -= g.offset;
		}
		var _ = Er({
			datas: n,
			distX: i,
			distY: a
		}, !0), v = n.nextPoses.slice();
		if (d.forEach(function(e) {
			v[e] = G(v[e], _);
		}), !ar.every(function(e) {
			return Qs(e.map(function(e) {
				return u[e];
			}), e.map(function(e) {
				return v[e];
			}));
		})) return !1;
		var y = vt(u[0], u[2], u[1], u[3], v[0], v[2], v[1], v[3]);
		if (!y.length) return !1;
		var b = wr(n, rt(o, y, 4), !0), x = rt(Xe(s, 4), b, 4);
		n.prevMatrix = b;
		var S = rt(l, b, 4), C = Sr(n, `matrix3d(${S.join(", ")})`, `matrix3d(${b.join(", ")})`);
		return Br(t, C), Q(e, "onWarp", Z(e, t, q({
			delta: x,
			matrix: S,
			dist: b,
			multiply: rt,
			transform: C
		}, fs({ transform: C }, t)))), !0;
	},
	dragControlEnd: function(e, t) {
		var n = t.datas, r = t.isDrag;
		return n.isWarp ? (n.isWarp = !1, Q(e, "onWarpEnd", ms(e, t, {})), r) : !1;
	}
}, ec = /*#__PURE__*/ X("area-pieces"), tc = /*#__PURE__*/ X("area-piece"), nc = /*#__PURE__*/ X("avoid"), rc = X("view-dragging");
function ic(e) {
	var t = e.areaElement;
	if (t) {
		var n = e.state, r = n.width, i = n.height;
		Le(t, nc), t.style.cssText += `left: 0px; top: 0px; width: ${r}px; height: ${i}px`;
	}
}
function ac(e) {
	return e.createElement("div", {
		key: "area_pieces",
		className: ec
	}, e.createElement("div", { className: tc }), e.createElement("div", { className: tc }), e.createElement("div", { className: tc }), e.createElement("div", { className: tc }));
}
var oc = {
	name: "dragArea",
	props: ["dragArea", "passDragArea"],
	events: ["click", "clickGroup"],
	render: function(e, t) {
		var n = e.props, r = n.target, i = n.dragArea, a = n.groupable, o = n.passDragArea, s = e.getState(), c = s.width, l = s.height, u = s.renderPoses, d = o ? X("area", "pass") : X("area");
		if (a) return [t.createElement("div", {
			key: "area",
			ref: A(e, "areaElement"),
			className: d
		}), ac(t)];
		if (!r || !i) return [];
		var f = vt([0, 0], [c, 0], [0, l], [c, l], u[0], u[1], u[2], u[3]), p = f.length ? Ro(f, !0) : "none";
		return [t.createElement("div", {
			key: "area",
			ref: A(e, "areaElement"),
			className: d,
			style: {
				top: "0px",
				left: "0px",
				width: `${c}px`,
				height: `${l}px`,
				transformOrigin: "0 0",
				transform: p
			}
		}), ac(t)];
	},
	dragStart: function(e, t) {
		var n = t.datas, r = t.clientX, i = t.clientY;
		if (!t.inputEvent) return !1;
		n.isDragArea = !1;
		var a = e.areaElement, o = e.state, s = o.moveableClientRect, c = o.renderPoses, l = o.rootMatrix, u = o.is3d, d = s.left, f = s.top, p = Wo(c), m = p.left, h = p.top, g = p.width, _ = p.height, v = u ? 4 : 3, y = J(ws(l, [r - d, i - f], v), 2), b = y[0], x = y[1];
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
		}), Ie(a, nc), o.disableNativeEvent = !0;
	},
	drag: function(e, t) {
		var n = t.datas, r = t.inputEvent;
		if (this.enableNativeEvent(e), !r) return !1;
		n.isDragArea || (n.isDragArea = !0, ic(e));
	},
	dragEnd: function(e, t) {
		this.enableNativeEvent(e);
		var n = t.inputEvent, r = t.datas;
		if (!n) return !1;
		r.isDragArea || ic(e);
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
		ic(e), e.state.disableNativeEvent = !1;
	},
	enableNativeEvent: function(e) {
		var t = e.state;
		t.disableNativeEvent && ye(function() {
			t.disableNativeEvent = !1;
		});
	}
}, sc = Vn("origin", {
	props: ["origin", "svgOrigin"],
	render: function(e, t) {
		var n = e.props, r = n.zoom, i = n.svgOrigin, a = n.groupable, o = e.getState(), s = o.beforeOrigin, c = o.rotation, l = o.svg, u = o.allMatrix, d = o.is3d, f = o.left, p = o.top, m = o.offsetWidth, h = o.offsetHeight, g;
		if (!a && l && i) {
			var _ = J(Bs(i, m, h), 2), v = _[0], y = _[1];
			g = Zo(c, r, K(Ho(u, [v, y], d ? 4 : 3), [f, p]));
		} else g = Zo(c, r, s);
		return [t.createElement("div", {
			className: X("control", "origin"),
			style: g,
			key: "beforeOrigin"
		})];
	}
});
function cc(e) {
	var t = e.scrollContainer;
	return [t.scrollLeft, t.scrollTop];
}
var lc = {
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
		var n = e.props, r = n.scrollContainer, i = r === void 0 ? e.getContainer() : r, a = n.scrollOptions, o = new qt(), s = Ns(i, !0);
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
			var r = e.props, i = r.scrollContainer, a = i === void 0 ? e.getContainer() : i, o = r.scrollThreshold, s = o === void 0 ? 0 : o, c = r.scrollThrottleTime, l = c === void 0 ? 0 : c, u = r.getScrollPosition, d = u === void 0 ? cc : u, f = r.scrollOptions;
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
}, uc = {
	name: "",
	props: /* @__PURE__ */ "target.dragTargetSelf.dragTarget.dragContainer.container.warpSelf.rootContainer.useResizeObserver.useMutationObserver.zoom.dragFocusedInput.transformOrigin.ables.className.pinchThreshold.pinchOutside.triggerAblesSimultaneously.checkInput.cspNonce.translateZ.hideDefaultLines.props.flushSync.stopPropagation.preventClickEventOnDrag.preventClickDefault.viewContainer.persistData.useAccuratePosition.firstRenderState.linePadding.controlPadding.preventDefault.preventRightClick.preventWheelClick.requestStyles".split("."),
	events: ["changeTargets"]
}, dc = Vn("padding", {
	props: ["padding"],
	render: function(e, t) {
		var n = e.props;
		if (n.dragArea) return [];
		var r = Ks(n.padding || {}), i = r.left, a = r.top, o = r.right, s = r.bottom, c = e.getState(), l = c.renderPoses, u = [
			c.pos1,
			c.pos2,
			c.pos3,
			c.pos4
		], d = [];
		return i > 0 && d.push([0, 2]), a > 0 && d.push([0, 1]), o > 0 && d.push([1, 3]), s > 0 && d.push([2, 3]), d.map(function(e, n) {
			var r = J(e, 2), i = r[0], a = r[1], o = u[i], s = u[a], c = l[i], d = l[a], f = vt([0, 0], [100, 0], [0, 100], [100, 100], o, s, c, d);
			if (f.length) return t.createElement("div", {
				key: `padding${n}`,
				className: X("padding"),
				style: { transform: Ro(f, !0) }
			});
		});
	}
}), fc = [
	"nw",
	"ne",
	"se",
	"sw"
];
function pc(e, t) {
	var n = e[0] + e[1], r = n > t ? t / n : 1;
	return e[0] *= r, e[1] = t - e[1] * r, e;
}
var mc = [
	1,
	2,
	5,
	6
], hc = [
	0,
	3,
	4,
	7
], gc = [
	1,
	-1,
	-1,
	1
], _c = [
	1,
	1,
	-1,
	-1
];
function vc(e, t, n, r, i, a, o, s) {
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
				return c.push(Ds(p, r, t)), p;
			} else {
				var p = Math.max(0, u === 1 ? f[0] - i : o - f[0]);
				return c.push(Ds(p, n, t)), p;
			}
		})
	};
}
function yc(e) {
	for (var t = [0, 0], n = [0, 0], r = e.length, i = 0; i < r; ++i) {
		var a = e[i];
		a.sub && (a.horizontal && (t[1] === 0 && (t[0] = i), t[1] = i - t[0] + 1, n[0] = i + 1), a.vertical && (n[1] === 0 && (n[0] = i), n[1] = i - n[0] + 1));
	}
	return {
		horizontalRange: t,
		verticalRange: n
	};
}
function bc(e, t, n, r, i, a, o) {
	var s, c, l, u;
	a === void 0 && (a = [0, 0]), o === void 0 && (o = !1);
	var d = e.indexOf("/"), f = (d > -1 ? e.slice(0, d) : e).length, p = e.slice(0, f), m = e.slice(f + 1), h = p.length, g = m.length, _ = g > 0, v = J(p, 4), y = v[0], b = y === void 0 ? "0px" : y, x = v[1], S = x === void 0 ? b : x, C = v[2], w = C === void 0 ? b : C, T = v[3], E = T === void 0 ? S : T, D = J(m, 4), O = D[0], k = O === void 0 ? b : O, A = D[1], j = A === void 0 ? _ ? k : S : A, M = D[2], N = M === void 0 ? _ ? k : w : M, P = D[3], F = P === void 0 ? _ ? j : E : P, I = [
		b,
		S,
		w,
		E
	].map(function(e) {
		return Se(e, t);
	}), L = [
		k,
		j,
		N,
		F
	].map(function(e) {
		return Se(e, n);
	}), R = I.slice(), z = L.slice();
	s = J(pc([R[0], R[1]], t), 2), R[0] = s[0], R[1] = s[1], c = J(pc([R[3], R[2]], t), 2), R[3] = c[0], R[2] = c[1], l = J(pc([z[0], z[3]], n), 2), z[0] = l[0], z[3] = l[1], u = J(pc([z[1], z[2]], n), 2), z[1] = u[0], z[2] = u[1];
	var B = o ? R : R.slice(0, Math.max(a[0], h)), ee = o ? z : z.slice(0, Math.max(a[1], g));
	return Y(Y([], J(B.map(function(e, t) {
		var a = fc[t];
		return {
			virtual: t >= h,
			horizontal: gc[t],
			vertical: 0,
			pos: [r + e, i + (_c[t] === -1 ? n : 0)],
			sub: !0,
			raw: I[t],
			direction: a
		};
	})), !1), J(ee.map(function(e, n) {
		var a = fc[n];
		return {
			virtual: n >= g,
			horizontal: 0,
			vertical: _c[n],
			pos: [r + (gc[n] === -1 ? t : 0), i + e],
			sub: !0,
			raw: L[n],
			direction: a
		};
	})), !1);
}
function xc(e, t, n, r, i) {
	i === void 0 && (i = t.length);
	var a = yc(e.slice(r)), o = a.horizontalRange, s = a.verticalRange, c = n - r, l = 0;
	if (c === 0) l = i;
	else if (c > 0 && c < o[1]) l = o[1] - c;
	else if (c >= s[0]) l = s[0] + s[1] - c;
	else return;
	e.splice(n, l), t.splice(n, l);
}
function Sc(e, t, n, r, i, a, o, s, c, l, u) {
	l === void 0 && (l = 0), u === void 0 && (u = 0);
	var d = yc(e.slice(n)), f = d.horizontalRange, p = d.verticalRange;
	if (r > -1) for (var m = gc[r] === 1 ? a - l : s - a, h = f[1]; h <= r; ++h) {
		var g = _c[h] === 1 ? u : c, _ = 0;
		if (r === h ? _ = a : h === 0 ? _ = l + m : gc[h] === -1 && (_ = s - (t[n][0] - l)), e.splice(n + h, 0, {
			horizontal: gc[h],
			vertical: 0,
			pos: [_, g]
		}), t.splice(n + h, 0, [_, g]), h === 0) break;
	}
	else if (i > -1) {
		var v = _c[i] === 1 ? o - u : c - o;
		if (f[1] === 0 && p[1] === 0) {
			var y = [l + v, u];
			e.push({
				horizontal: gc[0],
				vertical: 0,
				pos: y
			}), t.push(y);
		}
		for (var b = p[0], h = p[1]; h <= i; ++h) {
			var _ = gc[h] === 1 ? l : s, g = 0;
			if (i === h ? g = o : h === 0 ? g = u + v : _c[h] === 1 ? g = t[n + b][1] : _c[h] === -1 && (g = c - (t[n + b][1] - u)), e.push({
				horizontal: 0,
				vertical: _c[h],
				pos: [_, g]
			}), t.push([_, g]), h === 0) break;
		}
	}
}
function Cc(e, t) {
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
var wc = [[
	0,
	-1,
	"n"
], [
	1,
	0,
	"e"
]], Tc = [
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
function Ec(e, t, n) {
	var r = e.props.clipRelative, i = e.state, a = i.width, o = i.height, s = t, c = s.type, l = s.poses, u = c === "rect", d = c === "circle";
	if (c === "polygon") return n.map(function(e) {
		return `${Ds(e[0], a, r)} ${Ds(e[1], o, r)}`;
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
			return Ds(e, t % 2 ? a : o, r);
		});
		if (n.length > 8) {
			var _ = J(K(n[4], n[0]), 2), v = _[0], y = _[1];
			g.push.apply(g, Y(["round"], J(vc(l.slice(8).map(function(e, t) {
				return q(q({}, e), { pos: n[t] });
			}), r, v, y, m, f, p, h).styles), !1));
		}
		return g;
	} else if (d || c === "ellipse") {
		var b = n[0], x = Ds($(n[1][1] - b[1]), d ? Math.sqrt((a * a + o * o) / 2) : o, r), g = d ? [x] : [Ds($(n[2][0] - b[0]), a, r), x];
		return g.push("at", Ds(b[0], a, r), Ds(b[1], o, r)), g;
	}
}
function Dc(e, t, n, r) {
	var i = [
		r,
		(r + t) / 2,
		t
	], a = [
		e,
		(e + n) / 2,
		n
	];
	return Tc.map(function(e) {
		var t = J(e, 3), n = t[0], r = t[1], o = t[2], s = i[n + 1], c = a[r + 1];
		return {
			vertical: $(r),
			horizontal: $(n),
			direction: o,
			pos: [s, c]
		};
	});
}
function Oc(e) {
	var t = [Infinity, -Infinity], n = [Infinity, -Infinity];
	return e.forEach(function(e) {
		var r = e.pos;
		t[0] = Math.min(t[0], r[0]), t[1] = Math.max(t[1], r[0]), n[0] = Math.min(n[0], r[1]), n[1] = Math.max(n[1], r[1]);
	}), [$(t[1] - t[0]), $(n[1] - n[0])];
}
function kc(e, t, n, r, i) {
	var a, o, s, c, l, u, d, f, p;
	if (e) {
		var m = i;
		if (!m) {
			var h = ui(e), g = h("clipPath");
			m = g === "none" ? h("clip") : g;
		}
		if (!((!m || m === "none" || m === "auto") && (m = r, !m))) {
			var _ = pe(m), v = _.prefix, y = v === void 0 ? m : v, b = _.value, x = b === void 0 ? "" : b, S = y === "circle", C = " ";
			if (y === "polygon") {
				var w = fe(x || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
				C = ",";
				var T = w.map(function(e) {
					var r = J(e.split(" "), 2), i = r[0], a = r[1];
					return {
						vertical: 1,
						horizontal: 1,
						pos: [Se(i, t), Se(a, n)]
					};
				}), E = en(T.map(function(e) {
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
				var D = "", O = "", k = 0, A = 0, w = de(x);
				if (S) {
					var j = "";
					a = J(w, 4), o = a[0], j = o === void 0 ? "50%" : o, s = a[2], D = s === void 0 ? "50%" : s, c = a[3], O = c === void 0 ? "50%" : c, k = Se(j, Math.sqrt((t * t + n * n) / 2)), A = k;
				} else {
					var M = "", N = "";
					l = J(w, 5), u = l[0], M = u === void 0 ? "50%" : u, d = l[1], N = d === void 0 ? "50%" : d, f = l[3], D = f === void 0 ? "50%" : f, p = l[4], O = p === void 0 ? "50%" : p, k = Se(M, t), A = Se(N, n);
				}
				var P = [Se(D, t), Se(O, n)], T = Y([{
					vertical: 1,
					horizontal: 1,
					pos: P,
					direction: "nesw"
				}], J(wc.slice(0, S ? 1 : 2).map(function(e) {
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
			} else if (y === "inset") {
				var w = de(x || "0 0 0 0"), F = w.indexOf("round"), I = (F > -1 ? w.slice(0, F) : w).length, L = w.slice(I + 1), R = J(w.slice(0, I), 4), z = R[0], B = R[1], ee = B === void 0 ? z : B, V = R[2], te = V === void 0 ? z : V, ne = R[3], re = ne === void 0 ? ee : ne, H = J([z, te].map(function(e) {
					return Se(e, n);
				}), 2), U = H[0], ie = H[1], ae = J([re, ee].map(function(e) {
					return Se(e, t);
				}), 2), oe = ae[0], se = ae[1], ce = t - se, le = n - ie, ue = bc(L, ce - oe, le - U, oe, U), T = Y(Y([], J(Dc(U, ce, le, oe)), !1), J(ue), !1);
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
				var w = fe(x || `0px, ${t}px, ${n}px, 0px`);
				C = ",";
				var he = J(w.map(function(e) {
					return me(e).value;
				}), 4), ge = he[0], se = he[1], ie = he[2], oe = he[3], T = Dc(ge, se, ie, oe);
				return {
					type: "rect",
					clipText: m,
					poses: T,
					top: ge,
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
function Ac(e, t, n, r, i) {
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
		var m = J(Oc(e), 2), h = m[0], g = m[1], _ = h && g ? h / g : 0;
		if (_ && i) {
			var v = e[(t + 4) % 8].pos, y = [0, 0];
			o.indexOf("w") > -1 ? y[0] = -1 : o.indexOf("e") > -1 && (y[0] = 1), o.indexOf("n") > -1 ? y[1] = -1 : o.indexOf("s") > -1 && (y[1] = 1);
			var b = Ls([h, g], n, _, y, !0), x = h + b[0], S = g + b[1], C = v[1], w = v[1], T = v[0], E = v[0];
			y[0] === -1 ? T = E - x : y[0] === 1 ? E = T + x : (T -= x / 2, E += x / 2), y[1] === -1 ? C = w - S : (y[1] === 1 || (C = w - S / 2), w = C + S);
			var D = Dc(C, E, w, T);
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
function jc(e, t) {
	var n = J(vr(e, t), 2), r = n[0], i = n[1], a = t.datas, o = a.clipPath, s = a.clipIndex, c = o, l = c.type, u = c.poses, d = c.splitter, f = u.map(function(e) {
		return e.pos;
	});
	if (l === "polygon") f.splice(s, 0, [r, i]);
	else if (l === "inset") {
		var p = mc.indexOf(s), m = hc.indexOf(s), h = u.length;
		if (Sc(u, f, 8, p, m, r, i, f[4][0], f[4][1], f[0][0], f[0][1]), h === u.length) return;
	} else return;
	var g = Ec(e, o, f), _ = `${l}(${g.join(d)})`;
	Q(e, "onClip", Z(e, t, q({
		clipEventType: "added",
		clipType: l,
		poses: f,
		clipStyles: g,
		clipStyle: _,
		distX: 0,
		distY: 0
	}, fs({ clipPath: _ }, t))));
}
function Mc(e, t) {
	var n = t.datas, r = n.clipPath, i = n.clipIndex, a = r, o = a.type, s = a.poses, c = a.splitter, l = s.map(function(e) {
		return e.pos;
	}), u = l.length;
	if (o === "polygon") s.splice(i, 1), l.splice(i, 1);
	else if (o === "inset") {
		if (i < 8 || (xc(s, l, i, 8, u), u === s.length)) return;
	} else return;
	var d = Ec(e, r, l), f = `${o}(${d.join(c)})`;
	Q(e, "onClip", Z(e, t, q({
		clipEventType: "removed",
		clipType: o,
		poses: l,
		clipStyles: d,
		clipStyle: f,
		distX: 0,
		distY: 0
	}, fs({ clipPath: f }, t))));
}
var Nc = {
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
		var C = kc(l, u, d, i || "inset", b || r);
		if (!C) return [];
		var w = p ? 4 : 3, T = C.type, E = C.poses.map(function(e) {
			var t = Ho(f, e.pos, w);
			return [t[0] - m, t[1] - h];
		}), D = [], O = [], k = T === "rect", A = T === "inset", j = T === "polygon";
		if (k || A || j) {
			var M = A ? E.slice(0, 8) : E;
			O = M.map(function(e, n) {
				var r = n === 0 ? M[M.length - 1] : M[n - 1], i = Oe(r, e), a = Yo(r, e);
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
			var N = C.left, P = C.top, F = C.radiusX, I = C.radiusY, L = J(K(Ho(f, [N, P], w), Ho(f, [0, 0], w)), 2), R = L[0], z = L[1], B = "none";
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
					transform: `translate(${-m + R}px, ${-h + z}px) ${Ro(f)}`
				}
			}));
		}
		if (a) {
			var re = Wo(Y([
				g,
				_,
				v,
				y
			], J(E), !1)), H = re.width, U = re.height, ie = re.left, ae = re.top;
			if (j || k || A) {
				var V = A ? E.slice(0, 8) : E;
				D.push(t.createElement("div", {
					key: "clipArea",
					className: X("clip-area", "snap-control"),
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
			n.isSnap && O.push.apply(O, Y([], J(n.snap.posInfos.map(function(n, i) {
				var a = n.pos;
				return _i(t, "", K(Ho(f, r ? [0, a] : [a, 0], w), [m, h]), K(Ho(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}snap${i}`, "guideline");
			})), !1)), n.isBound && O.push.apply(O, Y([], J(n.bounds.map(function(n, i) {
				var a = n.pos;
				return _i(t, "", K(Ho(f, r ? [0, a] : [a, 0], w), [m, h]), K(Ho(f, r ? [u, a] : [a, d], w), [m, h]), o, `clip${e}bounds${i}`, "guideline", "bounds", "bold");
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
		var n = e.state, r = e.props, i = r.defaultClipPath, a = r.customClipPath, o = n.target, s = n.width, c = n.height, l = t.inputEvent ? t.inputEvent.target : null, u = l && l.getAttribute("class") || "", d = t.datas, f = kc(o, s, c, i || "inset", a);
		if (!f) return !1;
		var p = f.clipText, m = f.type, h = f.poses;
		return Q(e, "onClipStart", Z(e, t, {
			clipType: m,
			clipStyle: p,
			poses: h.map(function(e) {
				return e.pos;
			})
		})) === !1 ? (d.isClipStart = !1, !1) : (d.isControl = u && u.indexOf("clip-control") > -1, d.isLine = u.indexOf("clip-line") > -1, d.isArea = u.indexOf("clip-area") > -1 || u.indexOf("clip-ellipse") > -1, d.clipIndex = l ? parseInt(l.getAttribute("data-clip-index"), 10) : -1, d.clipPath = f, d.isClipStart = !0, n.clipPathState = p, yr(e, t), !0);
	},
	dragControl: function(e, t) {
		var n, r, i, a = t.datas, o = t.originalDatas, s = t.isDragTarget;
		if (!a.isClipStart) return !1;
		var c = a, l = c.isControl, u = c.isLine, d = c.isArea, f = c.clipIndex, p = c.clipPath;
		if (!p) return !1;
		var m = Qo(e.props, "clippable"), h = m.keepRatio, g = 0, _ = 0, v = o.draggable, y = Er(t);
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
			j = Ac(E, f, [g * $(N), _ * $(P)], A, h);
		} else k && (j = O.map(function() {
			return [g, _];
		}));
		var F = O.map(function(e, t) {
			return G(e, j[t]);
		}), I = Y([], J(F), !1);
		x.snapBoundInfos = null;
		var L = p.type === "circle", R = p.type === "ellipse";
		if (L || R) {
			var z = Wo(F), B = $(z.bottom - z.top), ee = $(R ? z.right - z.left : B), V = F[0][1] + B, te = F[0][0] - ee, ne = F[0][0] + ee;
			L && (I.push([ne, z.bottom]), j.push([1, 0])), I.push([z.left, V]), j.push([0, 1]), I.push([te, z.bottom]), j.push([1, 0]);
		}
		var re = io((m.clipHorizontalGuidelines || []).map(function(e) {
			return Se(`${e}`, C);
		}), (m.clipVerticalGuidelines || []).map(function(e) {
			return Se(`${e}`, S);
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
		var oe = [0, 0], se = wa(re, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, H, U, 5, 5), ce = se.horizontal, le = se.vertical, ue = ce.offset, de = le.offset;
		if (ce.isBound && (oe[1] += ue), le.isBound && (oe[0] += de), (R || L) && j[0][0] === 0 && j[0][1] === 0) {
			var z = Wo(F), fe = z.bottom - z.top, pe = R ? z.right - z.left : fe, me = le.isBound ? $(de) : le.snapIndex === 0 ? -de : de, he = ce.isBound ? $(ue) : ce.snapIndex === 0 ? -ue : ue;
			pe -= me, fe -= he, L && (fe = ea(le, ce) > 0 ? fe : pe, pe = fe);
			var ge = I[0];
			I[1][1] = ge[1] - fe, I[2][0] = ge[0] + pe, I[3][1] = ge[1] + fe, I[4][0] = ge[0] - pe;
		} else if (A && h && l) {
			var _e = J(Oc(E), 2), ve = _e[0], ye = _e[1], be = ve && ye ? ve / ye : 0, xe = E[f].direction || "", Ce = I[1][1], V = I[5][1], te = I[7][0], ne = I[3][0];
			$(ue) <= $(de) ? ue = Ws(ue) * $(de) / be : de = Ws(de) * $(ue) * be, xe.indexOf("w") > -1 ? te -= de : xe.indexOf("e") > -1 ? ne -= de : (te += de / 2, ne -= de / 2), xe.indexOf("n") > -1 ? Ce -= ue : xe.indexOf("s") > -1 ? V -= ue : (Ce += ue / 2, V -= ue / 2);
			var we = Dc(Ce, ne, V, te);
			I.forEach(function(e, t) {
				var n = J(we[t].pos, 2);
				e[0] = n[0], e[1] = n[1];
			});
		} else I.forEach(function(e, t) {
			var n = j[t];
			n[0] && (e[0] -= de), n[1] && (e[1] -= ue);
		});
		var Te = Ec(e, p, F), Ee = `${T}(${Te.join(D)})`;
		if (x.clipPathState = Ee, L || R) H = [I[4][0], I[2][0]], U = [I[1][1], I[3][1]];
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
		if (x.snapBoundInfos = wa(re, m.clipTargetBounds && {
			left: 0,
			top: 0,
			right: S,
			bottom: C
		}, H, U, 1, 1), v) {
			var De = x.is3d, Oe = x.allMatrix, ke = De ? 4 : 3, Ae = oe;
			s && (Ae = [b[0] + oe[0] - y[0], b[1] + oe[1] - y[1]]), v.deltaOffset = rt(Oe, [
				Ae[0],
				Ae[1],
				0,
				0
			], ke);
		}
		return Q(e, "onClip", Z(e, t, q({
			clipEventType: "changed",
			clipType: T,
			poses: F,
			clipStyle: Ee,
			clipStyles: Te,
			distX: g,
			distY: _
		}, fs((i = {}, i[T === "rect" ? "clip" : "clipPath"] = Ee, i), t)))), !0;
	},
	dragControlEnd: function(e, t) {
		this.unset(e);
		var n = t.isDrag, r = t.datas, i = t.isDouble, a = r.isLine, o = r.isClipStart, s = r.isControl;
		return o ? (Q(e, "onClipEnd", ms(e, t, {})), i && (s ? Mc(e, t) : a && jc(e, t)), i || n) : !1;
	},
	unset: function(e) {
		e.state.clipPathState = "", e.state.snapBoundInfos = null;
	}
}, Pc = {
	name: "originDraggable",
	props: ["originDraggable", "originRelative"],
	events: [
		"dragOriginStart",
		"dragOrigin",
		"dragOriginEnd"
	],
	css: [":host[data-able-origindraggable] .control.origin {\npointer-events: auto;\n}"],
	dragControlCondition: function(e, t) {
		return t.isRequest ? t.requestAble === "originDraggable" : Fe(t.inputEvent.target, X("origin"));
	},
	dragControlStart: function(e, t) {
		var n = t.datas;
		yr(e, t);
		var r = Z(e, t, { dragStart: Aa.dragStart(e, new gr().dragStart([0, 0], t)) }), i = Q(e, "onDragOriginStart", r);
		return n.startOrigin = e.state.transformOrigin, n.startTargetOrigin = e.state.targetOrigin, n.prevOrigin = [0, 0], n.isDragOrigin = !0, i === !1 ? (n.isDragOrigin = !1, !1) : r;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = t.isPinch, i = t.isRequest;
		if (!n.isDragOrigin) return !1;
		var a = J(Er(t), 2), o = a[0], s = a[1], c = e.state, l = c.width, u = c.height, d = c.offsetMatrix, f = c.targetMatrix, p = c.is3d, m = e.props.originRelative, h = m === void 0 || m, g = p ? 4 : 3, _ = [o, s];
		if (i) {
			var v = t.distOrigin;
			(v[0] || v[1]) && (_ = v);
		}
		var y = G(n.startOrigin, _), b = G(n.startTargetOrigin, _), x = K(_, n.prevOrigin), S = Pr(d, f, y, g), C = e.getRect(), w = Wo(Uo(S, l, u, g)), T = [C.left - w.left, C.top - w.top];
		n.prevOrigin = _;
		var E = [Ds(b[0], l, h), Ds(b[1], u, h)].join(" "), D = Aa.drag(e, hr(t, e.state, T, !!r, !1)), O = Z(e, t, q(q({
			width: l,
			height: u,
			origin: y,
			dist: _,
			delta: x,
			transformOrigin: E,
			drag: D
		}, fs({
			transformOrigin: E,
			transform: D.transform
		}, t)), { afterTransform: D.transform }));
		return Q(e, "onDragOrigin", O), O;
	},
	dragControlEnd: function(e, t) {
		return t.datas.isDragOrigin ? (Q(e, "onDragOriginEnd", ms(e, t, {})), !0) : !1;
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
function Fc(e, t, n, r) {
	var i = e.filter(function(e) {
		var t = e.virtual;
		return e.horizontal && !t;
	}).length, a = e.filter(function(e) {
		var t = e.virtual;
		return e.vertical && !t;
	}).length, o = -1;
	if (t === 0 && (i === 0 ? o = 0 : i === 1 && (o = 1)), t === 2 && (i <= 2 ? o = 2 : i <= 3 && (o = 3)), t === 3 && (a === 0 ? o = 4 : a < 4 && (o = 7)), t === 1 && (a <= 1 ? o = 5 : a <= 2 && (o = 6)), !(o === -1 || !e[o].virtual)) {
		var s = e[o];
		Ic(e, o), o < 4 ? s.pos[0] = n : s.pos[1] = r;
	}
}
function Ic(e, t) {
	t < 4 ? e.slice(0, t + 1).forEach(function(e) {
		e.virtual = !1;
	}) : (e[0].virtual && (e[0].virtual = !1), e.slice(4, t + 1).forEach(function(e) {
		e.virtual = !1;
	}));
}
function Lc(e, t) {
	t < 4 ? e.slice(t, 4).forEach(function(e) {
		e.virtual = !0;
	}) : e.slice(t).forEach(function(e) {
		e.virtual = !0;
	});
}
function Rc(e, t, n, r, i) {
	r === void 0 && (r = [0, 0]);
	var a = [];
	return a = !e || e === "0px" ? [] : de(e), bc(a, t, n, 0, 0, r, i);
}
function zc(e, t, n, r, i) {
	var a = e.state, o = a.width, s = a.height, c = vc(i, e.props.roundRelative, o, s), l = c.raws, u = c.styles, d = c.radiusPoses, f = Cc(d, l), p = f.horizontals, m = f.verticals, h = u.join(" ");
	a.borderRadiusState = h;
	var g = Z(e, t, q({
		horizontals: p,
		verticals: m,
		borderRadius: h,
		width: o,
		height: s,
		delta: r,
		dist: n
	}, fs({ borderRadius: h }, t)));
	return Q(e, "onRound", g), g;
}
function Bc(e) {
	var t = e.getState().style, n = t.borderRadius || "";
	if (!n && e.props.groupable) {
		var r = e.moveables[0], i = e.getTargets()[0];
		i && (r?.props.target === i ? (n = e.moveables[0]?.state.style.borderRadius ?? "", t.borderRadius = n) : (n = gs(i).borderRadius, t.borderRadius = n));
	}
	return n;
}
var Vc = {
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
		var x = u || Bc(e), S = s ? 4 : 3, C = Rc(x, i, a, p, !0);
		if (!C) return null;
		var w = 0, T = 0, E = b ? [0, 0] : [c, l];
		return C.map(function(e, n) {
			var r = e.horizontal, i = e.vertical, a = e.direction || "", s = Y([], J(e.pos), !1);
			T += Math.abs(r), w += Math.abs(i), r && a.indexOf("n") > -1 && (s[1] -= v), i && a.indexOf("w") > -1 && (s[0] -= v), r && a.indexOf("s") > -1 && (s[1] += v), i && a.indexOf("e") > -1 && (s[0] += v);
			var c = K(Ho(o, s, S), E), l = y && y !== "horizontal", u = e.vertical ? w <= h[1] && (l || !e.virtual) : T <= h[0] && (y || !e.virtual);
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
		r.lineIndex = l, r.controlIndex = c, r.isControl = o, r.isLine = s, yr(e, t);
		var f = e.props, p = f.roundRelative, m = f.minRoundControls, h = m === void 0 ? [0, 0] : m, g = e.state, _ = g.width, v = g.height;
		r.isRound = !0, r.prevDist = [0, 0];
		var y = Rc(Bc(e) || "", _, v, h, !0) || [];
		return r.controlPoses = y, g.borderRadiusState = vc(y, p, _, v).styles.join(" "), d;
	},
	dragControl: function(e, t) {
		var n = t.datas, r = n.controlPoses;
		if (!n.isRound || !n.isControl || !r.length) return !1;
		var i = n.controlIndex, a = J(Er(t), 2), o = a[0], s = a[1], c = [o, s], l = K(c, n.prevDist), u = e.props.maxRoundControls, d = u === void 0 ? [4, 4] : u, f = e.state, p = f.width, m = f.height, h = r[i], g = h.vertical, _ = h.horizontal, v = r.map(function(e) {
			var t = e.horizontal, n = e.vertical, r = [t * _ * c[0], n * g * c[1]];
			if (t) {
				if (d[0] === 1 || d[0] < 4 && t !== _) return r;
			} else if (d[1] === 0) return r[1] = n * _ * c[0] / p * m, r;
			else if (g && (d[1] === 1 || d[1] < 4 && n !== g)) return r;
			return [0, 0];
		});
		v[i] = c;
		var y = r.map(function(e, t) {
			return q(q({}, e), { pos: G(e.pos, v[t]) });
		});
		return i < 4 ? y.slice(0, i + 1).forEach(function(e) {
			e.virtual = !1;
		}) : y.slice(4, i + 1).forEach(function(e) {
			e.virtual = !1;
		}), n.prevDist = [o, s], zc(e, t, c, l, y);
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
			if (a && (f === !0 || f === "control")) Lc(l, o);
			else if (s && (f === !0 || f === "line")) {
				var p = J(vr(e, t), 2), m = p[0], h = p[1];
				Fc(l, c, m, h);
			}
			u !== l.filter(function(e) {
				return e.virtual;
			}).length && zc(e, t, [0, 0], [0, 0], l);
		}
		var g = ms(e, t, {});
		return Q(e, "onRoundEnd", g), n.borderRadiusState = "", g;
	},
	dragGroupControlStart: function(e, t) {
		var n = this.dragControlStart(e, t);
		if (!n) return !1;
		var r = e.moveables, i = e.props.targets, a = di(e, "roundable", t);
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
		var r = e.moveables, i = e.props.targets, a = di(e, "roundable", t), o = q({
			targets: e.props.targets,
			events: a.map(function(e, t) {
				return q(q(q({}, e), {
					target: i[t],
					moveable: r[t],
					currentTarget: r[t]
				}), fs({ borderRadius: n.borderRadius }, e));
			})
		}, n);
		return Q(e, "onRoundGroup", o), o;
	},
	dragGroupControlEnd: function(e, t) {
		var n = e.moveables, r = e.props.targets, i = di(e, "roundable", t);
		hs(e, "onRound", function(t) {
			Q(e, "onRoundGroup", q({
				targets: e.props.targets,
				events: i.map(function(e, i) {
					return q(q(q({}, e), {
						target: r[i],
						moveable: n[i],
						currentTarget: n[i]
					}), fs({ borderRadius: t.borderRadius }, e));
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
function Hc(e, t) {
	var n = ht(t ? 4 : 3);
	return e === `matrix${t ? "3d" : ""}(${n.join(",")})` || e === "matrix(1,0,0,1,0,0)";
}
var Uc = {
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
		var n = e.state, r = n.is3d, i = n.targetMatrix, a = n.inlineTransform, o = r ? `matrix3d(${i.join(",")})` : `matrix(${at(i, !0)})`, s = !a || a === "none" ? o : a;
		t.datas.startTransforms = Hc(s, r) ? [] : de(s);
	},
	resetStyle: function(e) {
		var t = e.datas;
		t.nextStyle = {}, t.nextTransforms = e.datas.startTransforms, t.nextTransformAppendedIndexes = [];
	},
	fillDragStartParams: function(e, t) {
		return Z(e, t, {
			setTransform: function(e) {
				t.datas.startTransforms = H(e) ? e : de(e);
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
		var r = di(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
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
		var r = di(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
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
}, Wc = {
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
		var n = this, r = di(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragParams(r, e);
		});
		Q(e, "onRenderGroup", Z(e, t, q(q({
			isPinch: !!t.isPinch,
			targets: e.props.targets,
			transform: Ur(t),
			transformObject: {}
		}, fs(Wr(t))), { events: a })));
	},
	dragGroupEnd: function(e, t) {
		var n = this, r = di(e, "beforeRenderable", t), i = e.moveables, a = r.map(function(e, t) {
			var r = i[t];
			return n.fillDragEndParams(r, e);
		});
		Q(e, "onRenderGroupEnd", Z(e, t, q({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			targets: e.props.targets,
			events: a,
			transformObject: {},
			transform: Ur(t)
		}, fs(Wr(t)))));
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
		return wt(Hr(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), Z(e, t, q({
			isPinch: !!t.isPinch,
			transformObject: n,
			transform: Ur(t)
		}, fs(Wr(t))));
	},
	fillDragEndParams: function(e, t) {
		var n = {};
		return wt(Hr(t) || []).forEach(function(e) {
			n[e.name] = e.functionValue;
		}), Z(e, t, q({
			isPinch: !!t.isPinch,
			isDrag: t.isDrag,
			transformObject: n,
			transform: Ur(t)
		}, fs(Wr(t))));
	}
};
function Gc(e, t, n, r, i, a, o) {
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
	}), C(Uc, `drag${r}${i}`);
	var w = 0, T = 0;
	n.forEach(function(t) {
		if (_) return !1;
		var n = `${t}${r}${i}`, o = `${t}${r}Condition`;
		i === "" && !d && Ts(e.state, a);
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
	}), (!l || T) && C(Wc, `drag${r}${i}`);
	var E = S !== e[x] || w === n.length;
	return (c || _ || E) && (e.state.gestos = {}, e.moveables && e.moveables.forEach(function(e) {
		e.state.gestos = {};
	}), p.forEach(function(t) {
		t.unset && t.unset(e);
	})), s && !E && !d && T && e.props.preventDefault && a?.preventDefault(), e.isUnmounted || E ? !1 : ((!s && T && !o || c) && (e.props.flushSync || To)(function() {
		e.updateRect(c ? i : "", !0, !1), e.forceUpdate();
	}), !s && !c && !l && T && !o && Gc(e, t, n, r, i + "After", a), !0);
}
function Kc(e, t) {
	return function(n, r) {
		r === void 0 && (r = n.inputEvent.target);
		var i = r, a = e.areaElement, o = e._dragTarget;
		return !o || !t && e.controlGesto?.isFlag() ? !1 : i === o || o.contains(i) || i === a || !e.isMoveableElement(i) && !e.controlBox.contains(i) || Fe(i, "moveable-area") || Fe(i, "moveable-padding") || Fe(i, "moveable-edgeDraggable");
	};
}
function qc(e, t, n) {
	var r = e.controlBox, i = [], a = e.props, o = a.dragArea, s = e.state.target, c = a.dragTarget;
	i.push(r), (!o || c) && i.push(t), !o && c && s && t !== s && a.dragTargetSelf && i.push(s);
	var l = Kc(e);
	return Yc(e, i, "targetAbles", n, {
		dragStart: l,
		pinchStart: l
	});
}
function Jc(e, t) {
	var n = e.controlBox, r = [];
	r.push(n);
	var i = Kc(e, !0), a = function(e, t) {
		return t === void 0 && (t = e.inputEvent.target), t === n || !i(e, t);
	};
	return Yc(e, r, "controlAbles", t, {
		dragStart: a,
		pinchStart: a
	});
}
function Yc(e, t, n, r, i) {
	i === void 0 && (i = {});
	var a = n === "targetAbles", o = e.props, s = o.pinchOutside, c = o.pinchThreshold, l = o.preventClickEventOnDrag, u = o.preventClickDefault, d = o.checkInput, f = o.dragFocusedInput, p = o.preventDefault, m = p === void 0 || p, h = o.preventRightClick, g = h === void 0 || h, _ = o.preventWheelClick, v = _ === void 0 || _, y = o.dragContainer, b = new Tn(t, {
		preventDefault: m,
		preventRightClick: g,
		preventWheelClick: v,
		container: Ns(y, !0) || Ue(e.getControlBoxElement()),
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
					Gc(e, Y([], J(e[n]), !1), u, r, a, o) ? (e.props.stopPropagation || a === "Start" && x) && ((s = o?.inputEvent) == null || s.stopPropagation()) : o.stop();
				}
			});
		});
	}), b;
}
var Xc = /* @__PURE__ */ function() {
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
function Zc(e, t, n, r) {
	n === void 0 && (n = t);
	var i = ri(e, t), a = i.matrixes, o = i.is3d, s = i.targetMatrix, c = i.transformOrigin, l = i.targetOrigin, u = i.offsetContainer, d = i.hasFixed, f = i.zoom, p = li(u, n), m = p.matrixes, h = p.is3d, g = p.offsetContainer, _ = p.zoom, v = r || h || o, y = v ? 4 : 3, b = e.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in e, x = s, S = ht(y), C = ht(y), w = ht(y), T = ht(y), E = a.length, D = m.map(function(e) {
		return q(q({}, e), { matrix: e.matrix ? Y([], J(e.matrix), !1) : void 0 });
	}).reverse();
	a.reverse(), !o && v && (x = tt(x, 3, 4), Io(a)), !h && v && Io(D), D.forEach(function(e) {
		C = rt(C, e.matrix, y);
	});
	var O = n || He(e), k = D[0]?.target || No(O, O, !0).offsetParent, A = D.slice(1).reduce(function(e, t) {
		return rt(e, t.matrix, y);
	}, ht(y));
	a.forEach(function(e, t) {
		if (E - 2 === t && (w = S.slice()), E - 1 === t && (T = S.slice()), !e.matrix) {
			var n = a[t + 1];
			e.matrix = _t(Ko(e, n, k, y, rt(A, S, y)), y);
		}
		S = rt(S, e.matrix, y);
	});
	var j = !b && o;
	x ||= ht(j ? 4 : 3);
	var M = Ro(b && x.length === 16 ? tt(x, 4, 3) : x, j), N = C;
	return C = Ye(C, y, y), {
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
function Qc(e, t, n, r) {
	n === void 0 && (n = t);
	var i = 0, a = 0, o = 0, s = {}, c = $o(e);
	if (e && (i = c.offsetWidth, a = c.offsetHeight), e) {
		var l = Zc(e, t, n, r), u = _r(l.allMatrix, l.transformOrigin, i, a);
		s = q(q({}, l), u);
		var d = _r(l.allMatrix, [50, 50], 100, 100);
		o = es([d.pos1, d.pos2], d.direction);
	}
	var f = r ? 4 : 3;
	return q(q(q({
		hasZoom: !1,
		width: i,
		height: a,
		rotation: o
	}, c), {
		originalRootMatrix: ht(f),
		rootMatrix: ht(f),
		beforeMatrix: ht(f),
		offsetMatrix: ht(f),
		allMatrix: ht(f),
		targetMatrix: ht(f),
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
function $c(e, t, n, r, i, a) {
	a === void 0 && (a = []);
	var o = 1, s = [0, 0], c = ts(), l = ts(), u = ts(), d = ts(), f = [0, 0], p = {}, m = Qc(t, n, i, !0);
	if (t) {
		var h = ui(t);
		a.forEach(function(e) {
			p[e] = h(e);
		});
		var g = m.is3d ? 4 : 3, _ = _r(m.offsetMatrix, G(m.transformOrigin, Qe(m.targetMatrix, g)), m.width, m.height);
		o = _.direction, s = G(_.origin, [_.left - m.left, _.top - m.top]), d = is(m.offsetRootContainer);
		var v = No(r, r, !0).offsetParent || m.offsetRootContainer;
		if (m.hasZoom) {
			var y = _r(rt(m.originalRootMatrix, m.allMatrix), m.transformOrigin, m.width, m.height), b = _r(m.originalRootMatrix, Ao(ui(v)("transformOrigin")).map(function(e) {
				return parseFloat(e);
			}), v.offsetWidth, v.offsetHeight);
			if (c = rs(y, d), u = rs(b, d, v, !0), e) {
				var x = y.left, S = y.top;
				l = rs({
					left: x,
					top: S,
					bottom: S,
					right: S
				}, d);
			}
		} else {
			c = is(t), u = ci(v), e && (l = is(e));
			var C = u.left, w = u.top, T = u.clientLeft, E = u.clientTop, D = [c.left - C, c.top - w];
			f = K(ws(m.rootMatrix, D, 4), [T + m.left, E + m.top]);
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
function el(e) {
	var t = e.pos1, n = e.pos2, r = e.pos3, i = e.pos4;
	if (!t || !n || !r || !i) return null;
	var a = en([
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
var tl = /* @__PURE__ */ function(e) {
	Ln(t, e);
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
		}, $c(null)), t.renderState = {}, t.enabledAbles = [], t.targetAbles = [], t.controlAbles = [], t.rotation = 0, t.scale = [1, 1], t.isMoveableMounted = !1, t.isUnmounted = !1, t.events = {
			mouseEnter: null,
			mouseLeave: null
		}, t._emitter = new Bt(), t._prevOriginalDragTarget = null, t._originalDragTarget = null, t._prevDragTarget = null, t._dragTarget = null, t._prevPropTarget = null, t._propTarget = null, t._prevDragArea = !1, t._isPropTargetChanged = !1, t._hasFirstTarget = !1, t._reiszeObserver = null, t._observerId = 0, t._mutationObserver = null, t._rootContainer = null, t._viewContainer = null, t._viewClassNames = [], t._store = {}, t.checkUpdateRect = function() {
			if (!t.isDragging()) {
				var e = t.props.parentMoveable;
				if (e) {
					e.checkUpdateRect();
					return;
				}
				be(t._observerId), t._observerId = ye(function() {
					t.isDragging() || t.updateRect();
				});
			}
		}, t._onPreventClick = function(e) {
			e.stopPropagation(), e.preventDefault();
		}, t;
	}
	return t.prototype.render = function() {
		var e = this.props, t = this.getState(), n = e.parentPosition, r = e.className, i = e.target, a = e.zoom, o = e.cspNonce, s = e.translateZ, l = e.cssStyled, u = e.groupable, d = e.linePadding, f = e.controlPadding;
		this._checkUpdateRootContainer(), this.checkUpdate(), this.updateRenderPoses();
		var p = J(n || [0, 0], 2), m = p[0], h = p[1], g = t.left, _ = t.top, v = t.target, y = t.direction, b = t.hasFixed, x = t.offsetDelta, S = e.targets, C = this.isDragging(), w = {};
		this.getEnabledAbles().forEach(function(e) {
			w[`data-able-${e.name.toLowerCase()}`] = !0;
		});
		var T = this._getAbleClassName(), E = S && S.length && (v || u) || i || !this._hasFirstTarget && this.state.isPersisted, D = this.controlBox || this.props.firstRenderState || this.props.persistData, O = [g - m, _ - h];
		!u && e.useAccuratePosition && (O[0] += x[0], O[1] += x[1]);
		var k = {
			position: b ? "fixed" : "absolute",
			display: E ? "block" : "none",
			visibility: D ? "visible" : "hidden",
			transform: `translate3d(${O[0]}px, ${O[1]}px, ${s})`,
			"--zoom": a,
			"--zoompx": `${a}px`
		};
		return d && (k["--moveable-line-padding"] = d), f && (k["--moveable-control-padding"] = f), c.createElement(l, q({
			cspNonce: o,
			ref: A(this, "controlBox"),
			className: `${X("control-box", y === -1 ? "reverse" : "", C ? "dragging" : "")} ${T} ${r}`
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
		this.isMoveableMounted = !1, this.isUnmounted = !0, this._emitter.off(), (e = this._reiszeObserver) == null || e.disconnect(), (t = this._mutationObserver) == null || t.disconnect(), this._viewContainer && this._changeAbleViewClassNames([]), ds(this, !1), ds(this, !0);
		var n = this.events;
		for (var r in n) {
			var i = n[r];
			i && i.destroy();
		}
	}, t.prototype.getTargets = function() {
		var e = this.props.target;
		return e ? [e] : [];
	}, t.prototype.getAble = function(e) {
		return ve(this.props.ables || [], function(t) {
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
		return e && (e.getAttribute?.call(e, "class") || "").indexOf(rr) > -1;
	}, t.prototype.dragStart = function(e, t) {
		t === void 0 && (t = e.target);
		var n = this.targetGesto, r = this.controlGesto;
		return n && Kc(this)({ inputEvent: e }, t) ? n.isFlag() || n.triggerDragStart(e) : r && this.isMoveableElement(t) && (r.isFlag() || r.triggerDragStart(e)), this;
	}, t.prototype.hitTest = function(e) {
		var t = this.state, n = t.target, r = t.pos1, i = t.pos2, a = t.pos3, o = t.pos4, s = t.targetClientRect;
		if (!n) return 0;
		var c;
		if (Ge(e)) {
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
		var u = c.left, d = c.top, f = c.width, p = c.height, m = $t([
			r,
			i,
			o,
			a
		], s), h = ln(m, [
			[u, d],
			[u + f, d],
			[u + f, d + p],
			[u, d + p]
		]), g = Qt(m);
		return !h || !g ? 0 : Math.min(100, h / g * 100);
	}, t.prototype.isInside = function(e, t) {
		var n = this.state, r = n.target, i = n.pos1, a = n.pos2, o = n.pos3, s = n.pos4, c = n.targetClientRect;
		return r ? tn([e, t], $t([
			i,
			a,
			s,
			o
		], c)) : !1;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.props, i = !r.parentPosition && !r.wrapperMoveable;
		i && si(!0);
		var a = r.parentMoveable, o = this.state.target || r.target, s = this.getContainer(), c = a ? a._rootContainer : this._rootContainer, l = $c(this.controlBox, o, s, s, c || s, this._getRequestStyles());
		if (!o && this._hasFirstTarget && r.persistData) {
			var u = el(r.persistData);
			for (var d in u) l[d] = u[d];
		}
		i && si(), this.updateState(l, !a && n);
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
		var e = this.state, t = ls(this.state), n = J(t, 4), r = n[0], i = n[1], a = n[2], o = n[3], s = Wo(t), c = e.width, l = e.height, u = s.width, d = s.height, f = s.left, p = s.top, m = [e.left, e.top], h = G(m, e.origin);
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
			beforeOrigin: G(m, e.beforeOrigin),
			origin: h,
			transformOrigin: e.transformOrigin,
			rotation: this.getRotation()
		};
	}, t.prototype.getManager = function() {
		return this;
	}, t.prototype.stopDrag = function(e) {
		if (!e || e === "target") {
			var t = this.targetGesto;
			t?.isIdle() === !1 && us(this, !1), t?.stop();
		}
		if (!e || e === "control") {
			var t = this.controlGesto;
			t?.isIdle() === !1 && us(this, !0), t?.stop();
		}
	}, t.prototype.getRotation = function() {
		var e = this.state, t = e.pos1, n = e.pos2, r = e.direction;
		return Fs(t, n, r);
	}, t.prototype.request = function(e, t, n) {
		t === void 0 && (t = {});
		var r = this, i = r.props, a = i.parentMoveable || i.wrapperMoveable || r, o = a.props.ables, s = i.groupable, c = ve(o, function(t) {
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
				return Gc(r, p, ["drag"], f, "", q(q({}, l.request(t)), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			},
			requestEnd: function() {
				return Gc(r, p, ["drag"], f, "End", q(q({}, l.requestEnd()), {
					requestAble: e,
					isRequest: !0
				}), u), m;
			}
		};
		return Gc(r, p, ["drag"], f, "Start", q(q({}, l.requestStart(t)), {
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
		var h = Ks(n || {}), g = h.left, _ = h.top, v = h.bottom, y = h.right, b = o ? 4 : 3, x = [];
		x = p ? i : this.controlBox && t.groupable ? r : G(r, [d, f]);
		var S = nt(b, _t(x.map(function(e) {
			return -e;
		}), b), a, _t(i, b)), C = Es(S, s, [-g, -_], b), w = Es(S, c, [y, -_], b), T = Es(S, l, [-g, v], b), E = Es(S, u, [y, v], b);
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
				[Es(S, s, [-g - D, -_], b), Es(S, c, [y + D, -_], b)],
				[Es(S, c, [y, -_ - D], b), Es(S, u, [y, v + D], b)],
				[Es(S, u, [y + D, v], b), Es(S, l, [-g - D, v], b)],
				[Es(S, l, [-g, v + D], b), Es(S, s, [-g, -_ - D], b)]
			];
		}
	}, t.prototype.checkUpdate = function() {
		this._isPropTargetChanged = !1;
		var e = this.props, t = e.target, n = e.container, r = e.parentMoveable, i = this.state, a = i.target, o = i.container;
		if (!(!a && !t)) {
			this.updateAbles();
			var s = !vs(a, t);
			if (s || !vs(o, n)) {
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
		return n[r] || (n[r] = Fn(e, t)), n[r];
	}, t.prototype.getState = function() {
		var e = this.props;
		(e.target || e.targets?.length) && (this._hasFirstTarget = !0);
		var t = this.controlBox, n = e.persistData, r = e.firstRenderState;
		if (r && !t) return r;
		if (!this._hasFirstTarget && n) {
			var i = el(n);
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
		var n = this.props.triggerAblesSimultaneously, r = this.getEnabledAbles(e), i = `drag${t}Start`, a = `pinch${t}Start`, o = `drag${t}ControlStart`, s = _s(r, [i, a], n), c = _s(r, [o], n);
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
		var e = this, t = this.props.triggerAblesSimultaneously, n = { createElement: c.createElement };
		return this.renderState = {}, xs(Ss(_s(this.getEnabledAbles(), ["render"], t).map(function(t) {
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
		(!e && this.targetGesto || this._isTargetChanged(!0)) && (ds(this, !1), this.updateState({ gestos: {} })), t || ds(this, !0), n && e && !this.targetGesto && (this.targetGesto = qc(this, n, "")), !this.controlGesto && t && (this.controlGesto = Jc(this, "Control"));
	}, t.prototype._updateTargets = function() {
		var e = this.props;
		this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = Ns(this._originalDragTarget, !0);
	}, t.prototype._renderLines = function() {
		var e = this.props, t = e.zoom, n = e.hideDefaultLines, r = e.hideChildMoveableDefaultLines, i = e.parentMoveable;
		if (n || i && r) return [];
		var a = this.getState(), o = { createElement: c.createElement };
		return a.renderLines.map(function(e, n) {
			return _i(o, "", e[0], e[1], t, `render-line-${n}`);
		});
	}, t.prototype._isTargetChanged = function(e) {
		var t = this.props, n = t.dragTarget || t.target, r = this._prevOriginalDragTarget, i = this._prevDragArea, a = t.dragArea;
		return !a && r !== n || (e || a) && i !== a || this._prevPropTarget != this._propTarget;
	}, t.prototype._updateNativeEvents = function() {
		var e = this, t = this.props.dragArea ? this.areaElement : this.state.target, n = this.events, r = xe(n);
		if (this._isTargetChanged()) for (var i in n) {
			var a = n[i];
			a && a.destroy(), n[i] = null;
		}
		if (t) {
			var o = this.enabledAbles;
			r.forEach(function(r) {
				var i = _s(o, [r]), a = i.length > 0, s = n[r];
				if (!a) {
					s && (s.destroy(), n[r] = null);
					return;
				}
				s || (s = new Xc(t, e, r), n[r] = s), s.setAbles(i);
			});
		}
	}, t.prototype._checkUpdateRootContainer = function() {
		var e = this.props.rootContainer;
		!this._rootContainer && e && (this._rootContainer = Ns(e, !0));
	}, t.prototype._checkUpdateViewContainer = function() {
		var e = this.props.viewContainer;
		!this._viewContainer && e && (this._viewContainer = Ns(e, !0)), this._viewContainer && this._changeAbleViewClassNames(Y(Y([], J(this._getAbleViewClassNames()), !1), [this.isDragging() ? rc : ""], !1));
	}, t.prototype._changeAbleViewClassNames = function(e) {
		var t = this._viewContainer, n = bs(e.filter(Boolean), function(e) {
			return e;
		}).map(function(e) {
			return J(e, 1)[0];
		}), r = this._viewClassNames, i = jt(r, n), a = i.removed, o = i.added;
		a.forEach(function(e) {
			Le(t, r[e]);
		}), o.forEach(function(e) {
			Ie(t, n[e]);
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
		var t, n = this.props, r = n.target, i = Ue(this.getControlBoxElement());
		if (!i.ResizeObserver || !r || !n.useResizeObserver) {
			(t = this._reiszeObserver) == null || t.disconnect();
			return;
		}
		if (!(e.target === r && this._reiszeObserver)) {
			var a = new i.ResizeObserver(this.checkUpdateRect);
			a.observe(r, { box: "border-box" }), this._reiszeObserver = a;
		}
	}, t.prototype._updateMutationObserver = function(e) {
		var t = this, n, r = this.props, i = r.target, a = Ue(this.getControlBoxElement());
		if (!a.MutationObserver || !i || !r.useMutationObserver) {
			(n = this._mutationObserver) == null || n.disconnect();
			return;
		}
		if (!(e.target === i && this._mutationObserver)) {
			var o = new a.MutationObserver(function(e) {
				var n, r;
				try {
					for (var i = Bn(e), a = i.next(); !a.done; a = i.next()) {
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
		flushSync: To,
		firstRenderState: null,
		persistData: null,
		viewContainer: null,
		requestStyles: [],
		useAccuratePosition: !1
	}, t;
}(c.PureComponent), nl = {
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
		var d = Us(e, "parentPosition", [a, o], function(e) {
			return e.join(",");
		}), f = Us(e, "requestStyles", e.getRequestChildStyles(), function(e) {
			return e.join(",");
		});
		return e.moveables = e.moveables.slice(0, r.length), Y(Y([], J(r.map(function(r, i) {
			return t.createElement(tl, {
				key: "moveable" + i,
				ref: j(e, "moveables", i),
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
		})), !1), J(Ss(l.map(function(e, n) {
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
				return _i(t, "", K(r[o], d), K(r[s], d), c, `group-rect-${n}-${i}`);
			});
		}))), !1);
	}
}, rl = Vn("clickable", {
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
			a === -1 && (a = _e(i, function(e) {
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
function il(e) {
	var t = e.originalDatas.draggable;
	return t ||= (e.originalDatas.draggable = {}, e.originalDatas.draggable), q(q({}, e), { datas: t });
}
var al = Vn("edgeDraggable", {
	css: [".edge.edgeDraggable.line {\ncursor: move;\n}"],
	render: function(e, t) {
		var n = e.props, r = n.edgeDraggable;
		return r ? vi(t, "edgeDraggable", r, e.getState().renderPoses, n.zoom) : [];
	},
	dragCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && Fe(r, X("direction")) && Fe(r, X("edge")) && Fe(r, X("edgeDraggable"));
	},
	dragStart: function(e, t) {
		return Aa.dragStart(e, il(t));
	},
	drag: function(e, t) {
		return Aa.drag(e, il(t));
	},
	dragEnd: function(e, t) {
		return Aa.dragEnd(e, il(t));
	},
	dragGroupCondition: function(e, t) {
		var n = e.props, r = t.inputEvent?.target;
		return !n.edgeDraggable || !r ? !1 : !n.draggable && Fe(r, X("direction")) && Fe(r, X("line"));
	},
	dragGroupStart: function(e, t) {
		return Aa.dragGroupStart(e, il(t));
	},
	dragGroup: function(e, t) {
		return Aa.dragGroup(e, il(t));
	},
	dragGroupEnd: function(e, t) {
		return Aa.dragGroupEnd(e, il(t));
	},
	unset: function(e) {
		return Aa.unset(e);
	}
}), ol = {
	name: "individualGroupable",
	props: ["individualGroupable", "individualGroupableProps"],
	events: []
}, sl = [
	Uc,
	uc,
	Co,
	qs,
	Aa,
	al,
	Fa,
	Ys,
	$s,
	Ha,
	lc,
	dc,
	sc,
	Pc,
	Nc,
	Vc,
	nl,
	ol,
	rl,
	oc,
	Wc
];
function cl(e, t) {
	var n = J(e, 3), r = n[0], i = n[1], a = n[2];
	return (r * t[0] + i * t[1] + a) / Math.sqrt(r * r + i * i);
}
function ll(e, t) {
	var n = J(e, 2), r = n[0], i = n[1];
	return -r * t[0] - i * t[1];
}
function ul(e, t) {
	return Math.max.apply(Math, Y([], J(e.map(function(e) {
		var n = J(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.max(r[t], i[t], a[t], o[t]);
	})), !1));
}
function dl(e, t) {
	return Math.min.apply(Math, Y([], J(e.map(function(e) {
		var n = J(e, 4), r = n[0], i = n[1], a = n[2], o = n[3];
		return Math.min(r[t], i[t], a[t], o[t]);
	})), !1));
}
function fl(e, t) {
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
	var d = W(t, sr);
	if (d % 90) {
		var f = d / 180 * Math.PI, p = Math.tan(f), m = -1 / p, h = [lr, ur], g = [[0, 0], [0, 0]], _ = [lr, ur], v = [[0, 0], [0, 0]];
		e.forEach(function(e) {
			e.forEach(function(e) {
				var t = cl([
					-p,
					1,
					0
				], e), n = cl([
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
			ll([-p, 1], b)
		], E = [
			-p,
			1,
			ll([-p, 1], x)
		], D = [
			-m,
			1,
			ll([-m, 1], C)
		], O = [
			-m,
			1,
			ll([-m, 1], w)
		];
		n = J([
			[T, D],
			[T, O],
			[E, D],
			[E, O]
		].map(function(e) {
			var t = J(e, 2), n = t[0], r = t[1];
			return rn(n, r)[0];
		}), 4), a = n[0], o = n[1], s = n[2], c = n[3], l = _[1] - _[0], u = h[1] - h[0];
	} else {
		var k = dl(e, 0), A = dl(e, 1), j = ul(e, 0), M = ul(e, 1);
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
	var P = en([
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
function pl(e, t) {
	var n = t.map(function(t) {
		if (H(t)) {
			var n = pl(e, t), r = n.length;
			return r > 1 ? n : r === 1 ? n[0] : null;
		} else {
			var i = ve(e, function(e) {
				return e.manager.props.target === t;
			});
			return i ? (i.finded = !0, i.manager) : null;
		}
	}).filter(Boolean);
	return n.length === 1 && H(n[0]) ? n[0] : n;
}
var ml = /* @__PURE__ */ function(e) {
	Ln(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.differ = new It(), t.moveables = [], t.transformOrigin = "50% 50%", t.renderGroupRects = [], t._targetGroups = [], t._hasFirstTargets = !1, t;
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
		si(!0), this.moveables.forEach(function(t) {
			t.updateRect(e, !1, !1);
		});
		var i = this.props, a = this.moveables, o = r.target || i.target, s = a.map(function(e) {
			return {
				finded: !1,
				manager: e
			};
		}), c = this.props.targetGroups || [], l = pl(s, c), u = i.useDefaultGroupRotate;
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
				if (H(e)) {
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
					poses: ls(e.state),
					rotation: e.getRotation()
				};
			}), i = r.map(function(e) {
				return e.rotation;
			}), a = 0, o = i[0], s = i.every(function(e) {
				return Math.abs(o - e) < .1;
			});
			return a = f ? !u && s ? o : p : !u && !n && s ? o : t, fl(r.map(function(e) {
				return e.poses;
			}), a);
		}
		var g = h(l, this.rotation, !0);
		f && (this.rotation = g.rotation, this.transformOrigin = i.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = c, this.renderGroupRects = d;
		var _ = this.transformOrigin, v = this.rotation, y = this.scale, b = g.width, x = g.height, S = g.minX, C = g.minY, w = en(Vs([
			[0, 0],
			[b, 0],
			[0, x],
			[b, x]
		], Bs(_, b, x), this.rotation / 180 * Math.PI).result), T = w.minX, E = w.minY, D = ` rotate(${v}deg) scale(${Ws(y[0])}, ${Ws(y[1])})`, O = `translate(${-T}px, ${-E}px)${D}`;
		this.controlBox.style.transform = `translate3d(${S}px, ${C}px, ${this.props.translateZ || 0})`, o.style.cssText += `left:0px;top:0px;transform-origin:${_};width:${b}px;height:${x}px;transform: ${O}`, r.width = b, r.height = x;
		var k = this.getContainer(), A = $c(this.controlBox, o, this.controlBox, this.getContainer(), this._rootContainer || k, []), j = [A.left, A.top], M = J(ls(A), 4), N = M[0], P = M[1], F = M[2], I = M[3], L = en([
			N,
			P,
			F,
			I
		]), R = [L.minX, L.minY], z = Ws(y[0] * y[1]);
		A.pos1 = K(N, R), A.pos2 = K(P, R), A.pos3 = K(F, R), A.pos4 = K(I, R), A.left = S - A.left + R[0], A.top = C - A.top + R[1], A.origin = K(G(j, A.origin), R), A.beforeOrigin = K(G(j, A.beforeOrigin), R), A.originalBeforeOrigin = G(j, A.originalBeforeOrigin), A.transformOrigin = K(G(j, A.transformOrigin), R), o.style.transform = `translate(${-T - R[0]}px, ${-E - R[1]}px)` + D, si(), this.updateState(q(q({}, A), {
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
		e.prototype.updateAbles.call(this, Y(Y([], J(this.props.ables), !1), [nl], !1), "Group");
	}, t.prototype._updateTargets = function() {
		e.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = Ns(this._originalDragTarget, !0);
	}, t.prototype._updateEvents = function() {
		var e = this.state, t = this.props, n = this._prevDragTarget, r = t.dragTarget || this.areaElement, i = t.targets, a = this.differ.update(i), o = a.added, s = a.changed, c = a.removed, l = o.length || c.length;
		(l || this._prevOriginalDragTarget !== this._originalDragTarget) && (ds(this, !1), ds(this, !0), this.updateState({ gestos: {} })), n !== r && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto ||= qc(this, this._dragTarget, "Group"), this.controlGesto ||= Jc(this, "GroupControl"));
		var u = !vs(e.container, t.container);
		u && (e.container = t.container), (u || l || this.transformOrigin !== (t.defaultGroupOrigin || "50% 50%") || s.length || i.length && !Hs(this._targetGroups, t.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!l;
	}, t.prototype._updateObserver = function() {}, t.defaultProps = q(q({}, tl.defaultProps), {
		transformOrigin: ["50%", "50%"],
		groupable: !0,
		dragArea: !0,
		keepRatio: !0,
		targets: [],
		defaultGroupRotate: 0,
		defaultGroupOrigin: "50% 50%"
	}), t;
}(tl), hl = /* @__PURE__ */ function(e) {
	Ln(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.moveables = [], t;
	}
	return t.prototype.render = function() {
		var e = this, t = this.props, n = t.cspNonce, r = t.cssStyled, i = t.persistData, a = t.targets || [], o = a.length, s = this.isUnmounted || !o, l = i?.children ?? [];
		return s && !o && l.length ? a = l.map(function() {
			return null;
		}) : s || (l = []), c.createElement(r, {
			cspNonce: n,
			ref: A(this, "controlBox"),
			className: X("control-box")
		}, a.map(function(n, r) {
			var i = t.individualGroupableProps?.call(t, n, r) ?? {};
			return c.createElement(tl, q({
				key: "moveable" + r,
				ref: j(e, "moveables", r)
			}, t, i, {
				target: n,
				wrapperMoveable: e,
				isWrapperMounted: e.isMoveableMounted,
				persistData: l[r]
			}));
		}));
	}, t.prototype.componentDidMount = function() {}, t.prototype.componentDidUpdate = function() {}, t.prototype.getTargets = function() {
		return this.props.targets;
	}, t.prototype.updateRect = function(e, t, n) {
		n === void 0 && (n = !0), si(!0), this.moveables.forEach(function(r) {
			r.updateRect(e, t, n);
		}), si();
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
		var n = t, r = ve(this.moveables, function(e) {
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
}(tl);
function gl(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (U(e)) {
				t[e] && n.push.apply(n, Y([], J(t[e]), !1));
				return;
			}
			H(e) ? n.push.apply(n, Y([], J(gl(e, t)), !1)) : n.push(e);
		}
	}), n;
}
function _l(e, t) {
	var n = [];
	return e.forEach(function(e) {
		if (e) {
			if (U(e)) {
				t[e] && n.push.apply(n, Y([], J(t[e]), !1));
				return;
			}
			H(e) ? n.push(_l(e, t)) : n.push(e);
		}
	}), n;
}
function vl(e, t) {
	return e.length !== t.length || e.some(function(e, n) {
		var r = t[n];
		return !e && !r || e == r ? !1 : H(e) && H(r) ? vl(e, r) : !0;
	});
}
var yl = /* @__PURE__ */ function(e) {
	Ln(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.defaultAbles = sl, t;
}(/* @__PURE__ */ function(e) {
	Ln(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.refTargets = [], t.selectorMap = {}, t._differ = new It(), t._elementTargets = [], t._tmpRefTargets = [], t._tmpSelectorMap = {}, t._onChangeTargets = null, t;
	}
	return t.makeStyled = function() {
		var e = {};
		this.getTotalAbles().forEach(function(t) {
			var n = t.css;
			n && n.forEach(function(t) {
				e[t] = !0;
			});
		});
		var t = xe(e).join("\n");
		this.defaultStyled = Fn("div", k(rr, ir + t));
	}, t.getTotalAbles = function() {
		return Y([
			uc,
			nl,
			ol,
			oc
		], J(this.defaultAbles), !1);
	}, t.prototype.render = function() {
		var e = this.constructor;
		e.defaultStyled || e.makeStyled();
		var t = this.props, n = t.ables, r = t.props, i = Rn(t, ["ables", "props"]), a = J(this._updateRefs(!0), 2), o = a[0], s = a[1], l = gl(o, s), u = l.length > 1, d = Y(Y([], J(e.getTotalAbles()), !1), J(n || []), !1), f = q(q(q({}, i), r || {}), {
			ables: d,
			cssStyled: e.defaultStyled,
			customStyledMap: e.customStyledMap
		});
		this._elementTargets = l;
		var p = null, m = this.moveable;
		if (i.persistData?.children && (u = !0), i.individualGroupable) return c.createElement(hl, q({
			key: "individual-group",
			ref: A(this, "moveable")
		}, f, {
			target: null,
			targets: l
		}));
		if (u) {
			var h = _l(o, s);
			if (m && !m.props.groupable && !m.props.individualGroupable) {
				var g = m.props.target;
				g && l.indexOf(g) > -1 && (p = q({}, m.state));
			}
			return c.createElement(ml, q({
				key: "group",
				ref: A(this, "moveable")
			}, f, i.groupableProps ?? {}, {
				target: null,
				targets: l,
				targetGroups: h,
				firstRenderState: p
			}));
		} else {
			var _ = l[0];
			if (m && (m.props.groupable || m.props.individualGroupable)) {
				var v = ve(m.moveables || [], function(e) {
					return e.props.target === _;
				});
				v && (p = q({}, v.state));
			}
			return c.createElement(tl, q({
				key: "single",
				ref: A(this, "moveable")
			}, f, {
				target: _,
				firstRenderState: p
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
		var t = this.refTargets, n = Ps(this.props.target || this.props.targets), r = typeof document < "u", i = vl(t, n), a = this.selectorMap, o = {};
		return this.refTargets.forEach(function e(t) {
			U(t) ? a[t] ? o[t] = a[t] : r && (i = !0, o[t] = [].slice.call(document.querySelectorAll(t))) : H(t) && t.forEach(e);
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
	}, t.defaultAbles = [], t.customStyledMap = {}, t.defaultStyled = null, zn([M(mr)], t.prototype, "moveable", void 0), t;
}(c.PureComponent)), bl = /* @__PURE__ */ t(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), xl = /* @__PURE__ */ t(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case O: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function i(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function a(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = A.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (j.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				P || (P = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return F[e] || (F[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, r, a, s, u) {
			var f = n.children;
			if (f !== void 0) if (a) if (M(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (j.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", R[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), R[f + a] = !0);
			}
			if (f = null, r !== void 0 && (i(r), f = "" + r), c(n) && (i(n.key), f = "" + n.key), "key" in n) for (var h in r = {}, n) h !== "key" && (r[h] = n[h]);
			else r = n;
			return f && l(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, r, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = r(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), A = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = Object.prototype.hasOwnProperty, M = Array.isArray, N = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var P, F = {}, I = h.react_stack_bottom_frame.bind(h, s)(), L = N(a(s)), R = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : I, r ? N(a(e)) : L);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : I, r ? N(a(e)) : L);
		};
	})();
})), Sl = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = bl() : t.exports = xl();
})))());
function Cl(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function wl(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var Tl = /*#__PURE__*/ function() {
	function e(e) {
		var t = this;
		this._insertTag = function(e) {
			var n = t.tags.length === 0 ? t.insertionPoint ? t.insertionPoint.nextSibling : t.prepend ? t.container.firstChild : t.before : t.tags[t.tags.length - 1].nextSibling;
			t.container.insertBefore(e, n), t.tags.push(e);
		}, this.isSpeedy = e.speedy === void 0 || e.speedy, this.tags = [], this.ctr = 0, this.nonce = e.nonce, this.key = e.key, this.container = e.container, this.prepend = e.prepend, this.insertionPoint = e.insertionPoint, this.before = null;
	}
	var t = e.prototype;
	return t.hydrate = function(e) {
		e.forEach(this._insertTag);
	}, t.insert = function(e) {
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(wl(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = Cl(t);
			try {
				n.insertRule(e, n.cssRules.length);
			} catch {}
		} else t.appendChild(document.createTextNode(e));
		this.ctr++;
	}, t.flush = function() {
		this.tags.forEach(function(e) {
			return e.parentNode?.removeChild(e);
		}), this.tags = [], this.ctr = 0;
	}, e;
}(), El = "-ms-", Dl = "-moz-", Ol = "-webkit-", kl = "comm", Al = "rule", jl = "decl", Ml = "@import", Nl = "@keyframes", Pl = "@layer", Fl = Math.abs, Il = String.fromCharCode, Ll = Object.assign;
function Rl(e, t) {
	return Ul(e, 0) ^ 45 ? (((t << 2 ^ Ul(e, 0)) << 2 ^ Ul(e, 1)) << 2 ^ Ul(e, 2)) << 2 ^ Ul(e, 3) : 0;
}
function zl(e) {
	return e.trim();
}
function Bl(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function Vl(e, t, n) {
	return e.replace(t, n);
}
function Hl(e, t) {
	return e.indexOf(t);
}
function Ul(e, t) {
	return e.charCodeAt(t) | 0;
}
function Wl(e, t, n) {
	return e.slice(t, n);
}
function Gl(e) {
	return e.length;
}
function Kl(e) {
	return e.length;
}
function ql(e, t) {
	return t.push(e), e;
}
function Jl(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var Yl = 1, Xl = 1, Zl = 0, Ql = 0, $l = 0, eu = "";
function tu(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: Yl,
		column: Xl,
		length: o,
		return: ""
	};
}
function nu(e, t) {
	return Ll(tu("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function ru() {
	return $l;
}
function iu() {
	return $l = Ql > 0 ? Ul(eu, --Ql) : 0, Xl--, $l === 10 && (Xl = 1, Yl--), $l;
}
function au() {
	return $l = Ql < Zl ? Ul(eu, Ql++) : 0, Xl++, $l === 10 && (Xl = 1, Yl++), $l;
}
function ou() {
	return Ul(eu, Ql);
}
function su() {
	return Ql;
}
function cu(e, t) {
	return Wl(eu, e, t);
}
function lu(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function uu(e) {
	return Yl = Xl = 1, Zl = Gl(eu = e), Ql = 0, [];
}
function du(e) {
	return eu = "", e;
}
function fu(e) {
	return zl(cu(Ql - 1, hu(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function pu(e) {
	for (; ($l = ou()) && $l < 33;) au();
	return lu(e) > 2 || lu($l) > 3 ? "" : " ";
}
function mu(e, t) {
	for (; --t && au() && !($l < 48 || $l > 102 || $l > 57 && $l < 65 || $l > 70 && $l < 97););
	return cu(e, su() + (t < 6 && ou() == 32 && au() == 32));
}
function hu(e) {
	for (; au();) switch ($l) {
		case e: return Ql;
		case 34:
		case 39:
			e !== 34 && e !== 39 && hu($l);
			break;
		case 40:
			e === 41 && hu(e);
			break;
		case 92:
			au();
			break;
	}
	return Ql;
}
function gu(e, t) {
	for (; au() && e + $l !== 57 && !(e + $l === 84 && ou() === 47););
	return "/*" + cu(t, Ql - 1) + "*" + Il(e === 47 ? e : au());
}
function _u(e) {
	for (; !lu(ou());) au();
	return cu(e, Ql);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function vu(e) {
	return du(yu("", null, null, null, [""], e = uu(e), 0, [0], e));
}
function yu(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = au()) {
		case 40: if (m != 108 && Ul(C, d - 1) == 58) {
			Hl(C += Vl(fu(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += fu(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += pu(m);
			break;
		case 92:
			C += mu(su() - 1, 7);
			continue;
		case 47:
			switch (ou()) {
				case 42:
				case 47:
					ql(xu(gu(au(), su()), t, n), c);
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = Gl(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = Vl(C, /\f/g, "")), p > 0 && Gl(C) - d && ql(p > 32 ? Su(C + ";", r, n, d - 1) : Su(Vl(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (ql(S = bu(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) if (u === 0) yu(C, t, S, S, b, a, d, s, x);
				else switch (f === 99 && Ul(C, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						yu(e, S, S, r && ql(bu(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
						break;
					default: yu(C, S, S, S, [""], x, 0, s, x);
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + Gl(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && iu() == 125) continue;
			}
			switch (C += Il(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (Gl(C) - 1) * _, _ = 1;
					break;
				case 64:
					ou() === 45 && (C += fu(au())), f = ou(), u = d = Gl(y = C += _u(su())), v++;
					break;
				case 45: m === 45 && Gl(C) == 2 && (h = 0);
			}
	}
	return a;
}
function bu(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = Kl(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = Wl(e, d + 1, d = Fl(h = o[m])), y = e; _ < p; ++_) (y = zl(h > 0 ? f[_] + " " + v : Vl(v, /&\f/g, f[_]))) && (c[g++] = y);
	return tu(e, t, n, i === 0 ? Al : s, c, l, u);
}
function xu(e, t, n) {
	return tu(e, t, n, kl, Il(ru()), Wl(e, 2, -2), 0);
}
function Su(e, t, n, r) {
	return tu(e, t, n, jl, Wl(e, 0, r), Wl(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Cu(e, t) {
	for (var n = "", r = Kl(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function wu(e, t, n, r) {
	switch (e.type) {
		case Pl: if (e.children.length) break;
		case Ml:
		case jl: return e.return = e.return || e.value;
		case kl: return "";
		case Nl: return e.return = e.value + "{" + Cu(e.children, r) + "}";
		case Al: e.value = e.props.join(",");
	}
	return Gl(n = Cu(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Tu(e) {
	var t = Kl(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Eu(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function Du(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var Ou = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = ou(), r === 38 && i === 12 && (t[n] = 1), !lu(i);) au();
	return cu(e, Ql);
}, ku = function(e, t) {
	var n = -1, r = 44;
	do
		switch (lu(r)) {
			case 0:
				r === 38 && ou() === 12 && (t[n] = 1), e[n] += Ou(Ql - 1, t, n);
				break;
			case 2:
				e[n] += fu(r);
				break;
			case 4: if (r === 44) {
				e[++n] = ou() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += Il(r);
		}
	while (r = au());
	return e;
}, Au = function(e, t) {
	return du(ku(uu(e), t));
}, ju = /* #__PURE__ */ new WeakMap(), Mu = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !ju.get(n)) && !r) {
			ju.set(e, !0);
			for (var i = [], a = Au(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Nu = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function Pu(e, t) {
	switch (Rl(e, t)) {
		case 5103: return Ol + "print-" + e + e;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return Ol + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return Ol + e + Dl + e + El + e + e;
		case 6828:
		case 4268: return Ol + e + El + e + e;
		case 6165: return Ol + e + El + "flex-" + e + e;
		case 5187: return Ol + e + Vl(e, /(\w+).+(:[^]+)/, Ol + "box-$1$2" + El + "flex-$1$2") + e;
		case 5443: return Ol + e + El + "flex-item-" + Vl(e, /flex-|-self/, "") + e;
		case 4675: return Ol + e + El + "flex-line-pack" + Vl(e, /align-content|flex-|-self/, "") + e;
		case 5548: return Ol + e + El + Vl(e, "shrink", "negative") + e;
		case 5292: return Ol + e + El + Vl(e, "basis", "preferred-size") + e;
		case 6060: return Ol + "box-" + Vl(e, "-grow", "") + Ol + e + El + Vl(e, "grow", "positive") + e;
		case 4554: return Ol + Vl(e, /([^-])(transform)/g, "$1" + Ol + "$2") + e;
		case 6187: return Vl(Vl(Vl(e, /(zoom-|grab)/, Ol + "$1"), /(image-set)/, Ol + "$1"), e, "") + e;
		case 5495:
		case 3959: return Vl(e, /(image-set\([^]*)/, Ol + "$1$`$1");
		case 4968: return Vl(Vl(e, /(.+:)(flex-)?(.*)/, Ol + "box-pack:$3" + El + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Ol + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return Vl(e, /(.+)-inline(.+)/, Ol + "$1$2") + e;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (Gl(e) - 1 - t > 6) switch (Ul(e, t + 1)) {
				case 109: if (Ul(e, t + 4) !== 45) break;
				case 102: return Vl(e, /(.+:)(.+)-([^]+)/, "$1" + Ol + "$2-$3$1" + Dl + (Ul(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~Hl(e, "stretch") ? Pu(Vl(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (Ul(e, t + 1) !== 115) break;
		case 6444:
			switch (Ul(e, Gl(e) - 3 - (~Hl(e, "!important") && 10))) {
				case 107: return Vl(e, ":", ":" + Ol) + e;
				case 101: return Vl(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Ol + (Ul(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Ol + "$2$3$1" + El + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (Ul(e, t + 11)) {
				case 114: return Ol + e + El + Vl(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return Ol + e + El + Vl(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return Ol + e + El + Vl(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return Ol + e + El + e + e;
	}
	return e;
}
var Fu = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case jl:
			e.return = Pu(e.value, e.length);
			break;
		case Nl: return Cu([nu(e, { value: Vl(e.value, "@", "@" + Ol) })], r);
		case Al: if (e.length) return Jl(e.props, function(t) {
			switch (Bl(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return Cu([nu(e, { props: [Vl(t, /:(read-\w+)/, ":" + Dl + "$1")] })], r);
				case "::placeholder": return Cu([
					nu(e, { props: [Vl(t, /:(plac\w+)/, ":" + Ol + "input-$1")] }),
					nu(e, { props: [Vl(t, /:(plac\w+)/, ":" + Dl + "$1")] }),
					nu(e, { props: [Vl(t, /:(plac\w+)/, El + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], Iu = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || Fu, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [Mu, Nu], l, u = [wu, Eu(function(e) {
		l.insert(e);
	})], d = Tu(c.concat(r, u)), f = function(e) {
		return Cu(vu(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new Tl({
			key: t,
			container: a,
			nonce: e.nonce,
			speedy: e.speedy,
			prepend: e.prepend,
			insertionPoint: e.insertionPoint
		}),
		nonce: e.nonce,
		inserted: i,
		registered: {},
		insert: s
	};
	return p.sheet.hydrate(o), p;
}, Lu = /* @__PURE__ */ t(((e) => {
	var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
	function b(e) {
		if (typeof e == "object" && e) {
			var t = e.$$typeof;
			switch (t) {
				case n: switch (e = e.type, e) {
					case l:
					case u:
					case i:
					case o:
					case a:
					case f: return e;
					default: switch (e &&= e.$$typeof, e) {
						case c:
						case d:
						case h:
						case m:
						case s: return e;
						default: return t;
					}
				}
				case r: return t;
			}
		}
	}
	function x(e) {
		return b(e) === u;
	}
	e.AsyncMode = l, e.ConcurrentMode = u, e.ContextConsumer = c, e.ContextProvider = s, e.Element = n, e.ForwardRef = d, e.Fragment = i, e.Lazy = h, e.Memo = m, e.Portal = r, e.Profiler = o, e.StrictMode = a, e.Suspense = f, e.isAsyncMode = function(e) {
		return x(e) || b(e) === l;
	}, e.isConcurrentMode = x, e.isContextConsumer = function(e) {
		return b(e) === c;
	}, e.isContextProvider = function(e) {
		return b(e) === s;
	}, e.isElement = function(e) {
		return typeof e == "object" && !!e && e.$$typeof === n;
	}, e.isForwardRef = function(e) {
		return b(e) === d;
	}, e.isFragment = function(e) {
		return b(e) === i;
	}, e.isLazy = function(e) {
		return b(e) === h;
	}, e.isMemo = function(e) {
		return b(e) === m;
	}, e.isPortal = function(e) {
		return b(e) === r;
	}, e.isProfiler = function(e) {
		return b(e) === o;
	}, e.isStrictMode = function(e) {
		return b(e) === a;
	}, e.isSuspense = function(e) {
		return b(e) === f;
	}, e.isValidElementType = function(e) {
		return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
	}, e.typeOf = b;
})), Ru = /* @__PURE__ */ t(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
		function b(e) {
			return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
		}
		function x(e) {
			if (typeof e == "object" && e) {
				var t = e.$$typeof;
				switch (t) {
					case n:
						var p = e.type;
						switch (p) {
							case l:
							case u:
							case i:
							case o:
							case a:
							case f: return p;
							default:
								var g = p && p.$$typeof;
								switch (g) {
									case c:
									case d:
									case h:
									case m:
									case s: return g;
									default: return t;
								}
						}
					case r: return t;
				}
			}
		}
		var S = l, C = u, w = c, T = s, E = n, D = d, O = i, k = h, A = m, j = r, M = o, N = a, P = f, F = !1;
		function I(e) {
			return F || (F = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), L(e) || x(e) === l;
		}
		function L(e) {
			return x(e) === u;
		}
		function R(e) {
			return x(e) === c;
		}
		function z(e) {
			return x(e) === s;
		}
		function B(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function ee(e) {
			return x(e) === d;
		}
		function V(e) {
			return x(e) === i;
		}
		function te(e) {
			return x(e) === h;
		}
		function ne(e) {
			return x(e) === m;
		}
		function re(e) {
			return x(e) === r;
		}
		function H(e) {
			return x(e) === o;
		}
		function U(e) {
			return x(e) === a;
		}
		function ie(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = w, e.ContextProvider = T, e.Element = E, e.ForwardRef = D, e.Fragment = O, e.Lazy = k, e.Memo = A, e.Portal = j, e.Profiler = M, e.StrictMode = N, e.Suspense = P, e.isAsyncMode = I, e.isConcurrentMode = L, e.isContextConsumer = R, e.isContextProvider = z, e.isElement = B, e.isForwardRef = ee, e.isFragment = V, e.isLazy = te, e.isMemo = ne, e.isPortal = re, e.isProfiler = H, e.isStrictMode = U, e.isSuspense = ie, e.isValidElementType = b, e.typeOf = x;
	})();
})), zu = /* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Lu() : t.exports = Ru();
})), Bu = /* @__PURE__ */ t(((e, t) => {
	var n = zu(), r = {
		childContextTypes: !0,
		contextType: !0,
		contextTypes: !0,
		defaultProps: !0,
		displayName: !0,
		getDefaultProps: !0,
		getDerivedStateFromError: !0,
		getDerivedStateFromProps: !0,
		mixins: !0,
		propTypes: !0,
		type: !0
	}, i = {
		name: !0,
		length: !0,
		prototype: !0,
		caller: !0,
		callee: !0,
		arguments: !0,
		arity: !0
	}, a = {
		$$typeof: !0,
		render: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0
	}, o = {
		$$typeof: !0,
		compare: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0,
		type: !0
	}, s = {};
	s[n.ForwardRef] = a, s[n.Memo] = o;
	function c(e) {
		return n.isMemo(e) ? o : s[e.$$typeof] || r;
	}
	var l = Object.defineProperty, u = Object.getOwnPropertyNames, d = Object.getOwnPropertySymbols, f = Object.getOwnPropertyDescriptor, p = Object.getPrototypeOf, m = Object.prototype;
	function h(e, t, n) {
		if (typeof t != "string") {
			if (m) {
				var r = p(t);
				r && r !== m && h(e, r, n);
			}
			var a = u(t);
			d && (a = a.concat(d(t)));
			for (var o = c(e), s = c(t), g = 0; g < a.length; ++g) {
				var _ = a[g];
				if (!i[_] && !(n && n[_]) && !(s && s[_]) && !(o && o[_])) {
					var v = f(t, _);
					try {
						l(e, _, v);
					} catch {}
				}
			}
		}
		return e;
	}
	t.exports = h;
}));
//#endregion
//#region node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
function Vu(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var Hu = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, Uu = function(e, t, n) {
	Hu(e, t, n);
	var r = e.key + "-" + t.name;
	if (e.inserted[t.name] === void 0) {
		var i = t;
		do
			e.insert(t === i ? "." + r : "", i, e.sheet, !0), i = i.next;
		while (i !== void 0);
	}
};
//#endregion
//#region node_modules/@emotion/hash/dist/emotion-hash.esm.js
function Wu(e) {
	for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4) n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= n >>> 24, t = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	switch (i) {
		case 3: t ^= (e.charCodeAt(r + 2) & 255) << 16;
		case 2: t ^= (e.charCodeAt(r + 1) & 255) << 8;
		case 1: t ^= e.charCodeAt(r) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	}
	return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
//#endregion
//#region node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var Gu = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
}, Ku = /[A-Z]|^ms/g, qu = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Ju = function(e) {
	return e.charCodeAt(1) === 45;
}, Yu = function(e) {
	return e != null && typeof e != "boolean";
}, Xu = /* #__PURE__ */ Du(function(e) {
	return Ju(e) ? e : e.replace(Ku, "-$&").toLowerCase();
}), Zu = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(qu, function(e, t, n) {
			return td = {
				name: t,
				styles: n,
				next: td
			}, t;
		});
	}
	return Gu[e] !== 1 && !Ju(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function Qu(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return td = {
				name: i.name,
				styles: i.styles,
				next: td
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) td = {
					name: o.name,
					styles: o.styles,
					next: td
				}, o = o.next;
				return a.styles + ";";
			}
			return $u(e, t, n);
		case "function":
			if (e !== void 0) {
				var s = td, c = n(e);
				return td = s, Qu(e, t, c);
			}
			break;
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function $u(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += Qu(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : Yu(s) && (r += Xu(a) + ":" + Zu(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) Yu(o[c]) && (r += Xu(a) + ":" + Zu(a, o[c]) + ";");
		else {
			var l = Qu(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += Xu(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var ed = /label:\s*([^\s;{]+)\s*(;|$)/g, td;
function nd(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	td = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += Qu(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += Qu(n, t, e[o]), r && (i += a[o]);
	ed.lastIndex = 0;
	for (var s = "", c; (c = ed.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: Wu(i) + s,
		styles: i,
		next: td
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var rd = function(e) {
	return e();
}, id = c.useInsertionEffect ? c.useInsertionEffect : !1, ad = id || rd;
id || c.useLayoutEffect;
var od = /* #__PURE__ */ c.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ Iu({ key: "css" }) : null);
od.Provider;
var sd = function(e) {
	return /*#__PURE__*/ (0, c.forwardRef)(function(t, n) {
		return e(t, (0, c.useContext)(od), n);
	});
}, cd = /* #__PURE__ */ c.createContext({}), ld = {}.hasOwnProperty, ud = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", dd = function(e, t) {
	var n = {};
	for (var r in t) ld.call(t, r) && (n[r] = t[r]);
	return n[ud] = e, n;
}, fd = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Hu(t, n, r), ad(function() {
		return Uu(t, n, r);
	}), null;
}, pd = /* @__PURE__ */ sd(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[ud], a = [r], o = "";
	typeof e.className == "string" ? o = Vu(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = nd(a, void 0, c.useContext(cd));
	o += t.key + "-" + s.name;
	var l = {};
	for (var u in e) ld.call(e, u) && u !== "css" && u !== ud && (l[u] = e[u]);
	return l.className = o, n && (l.ref = n), /*#__PURE__*/ c.createElement(c.Fragment, null, /*#__PURE__*/ c.createElement(fd, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ c.createElement(i, l));
});
Bu();
var md = Sl.Fragment, hd = function(e, t, n) {
	return ld.call(t, "css") ? Sl.jsx(pd, dd(e, t), n) : Sl.jsx(e, t, n);
}, gd = function(e, t, n) {
	return ld.call(t, "css") ? Sl.jsxs(pd, dd(e, t), n) : Sl.jsxs(e, t, n);
};
//#endregion
//#region src/components/GrpLayer.tsx
function _d({ cmn: { styChild: e, sys: t, isDesignMode: n }, sty: r, fn: a, aFace: o }) {
	let s = (e) => {
		if (!e) return "";
		try {
			return t.cfg.searchPath(e, i.SP_GSM);
		} catch (e) {
			return console.warn("GrpLayer search failed (試作：アセット未整備の可能性)", e), "";
		}
	}, l = (e) => {
		e.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
	}, u = (0, c.useRef)(null), d = (e, t) => {
		Qd(), e.transform = t;
	};
	return /* @__PURE__ */ gd(md, { children: [/* @__PURE__ */ gd("div", {
		css: e,
		ref: u,
		style: r,
		onMouseDown: (e) => l(e),
		children: [a && s(a) && /* @__PURE__ */ hd("img", {
			src: s(a),
			style: { display: "block" }
		}), o.map(({ fn: e, dx: t, dy: n, blendmode: r }, i) => {
			let a = e && s(e);
			return a ? /* @__PURE__ */ hd("img", {
				src: a,
				style: {
					position: "absolute",
					left: t,
					top: n,
					mixBlendMode: r
				}
			}, `${e}_${String(i)}`) : null;
		})]
	}), n && /* @__PURE__ */ hd(yl, {
		target: u,
		draggable: !0,
		throttleDrag: 1,
		onDrag: ({ target: { style: e }, transform: t }) => d(e, t),
		resizable: !0,
		keepRatio: !0,
		onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
			d(e, r), e.width = `${t}px`, e.height = `${n}px`;
		},
		rotatable: !0,
		throttleRotate: 0,
		startDragRotate: 0,
		throttleDragRotate: 0,
		rotationPosition: "top",
		onRotate: ({ target: { style: e }, drag: { transform: t } }) => d(e, t),
		originDraggable: !0,
		onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
			d(e, n), e.transformOrigin = t;
		}
	})] });
}
//#endregion
//#region node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var vd = function(e, t) {
	var n = arguments;
	if (t == null || !ld.call(t, "css")) return c.createElement.apply(void 0, n);
	var r = n.length, i = Array(r);
	i[0] = pd, i[1] = dd(e, t);
	for (var a = 2; a < r; a++) i[a] = n[a];
	return c.createElement.apply(null, i);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(vd ||= {});
function yd() {
	return nd([...arguments]);
}
//#endregion
//#region src/components/BtnLayer.tsx
function bd({ text: e, label: t, call: n, fn: r, onActivate: i }) {
	return /* @__PURE__ */ hd("span", {
		css: yd`
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
//#region src/components/TxtLayer.tsx
function xd({ cmn: { styChild: e, isDesignMode: t }, sty: n, nm: r, isFore: i, str: a, b_color: o, b_alpha: l, styTxt: u, enabled: d, aBtn: f, onActivate: p }) {
	let m = lf((e) => e.isReadBack), h = lf((e) => e.isTyping), g = lf((e) => e.setIsTyping), _ = lf((e) => e.skipReq), v = lf((e) => e.skipping), y = lf((e) => e.wait), b = (0, c.useRef)(null), x = (0, c.useRef)(null), S = (0, c.useRef)([]), C = (0, c.useRef)(null);
	(0, c.useLayoutEffect)(() => {
		let e = x.current;
		if (!e) return;
		C.current?.kill();
		let t = S.current.map((e) => e.textContent === "\xA0" ? " " : e.textContent).join("");
		!t.startsWith(a) && !a.startsWith(t) && (S.current = [], e.textContent = "");
		let n = S.current, r = Math.min(a.length, n.length);
		for (; e.childNodes.length > r;) e.removeChild(e.lastChild);
		for (; e.childNodes.length < r;) e.appendChild(n[e.childNodes.length]);
		if (r > 0 && s.set(n.slice(0, r), {
			opacity: 1,
			y: 0
		}), a.length <= n.length) {
			g(!1);
			return;
		}
		let i = a.slice(n.length), o = document.createDocumentFragment(), c = [...i].map((e) => {
			let t = document.createElement("span");
			return t.textContent = e === " " ? "\xA0" : e, o.appendChild(t), t;
		});
		if (n.push(...c), e.appendChild(o), m || v) {
			s.set(c, {
				opacity: 1,
				y: 0
			}), g(!1);
			return;
		}
		g(!0), C.current = s.timeline({ onComplete: () => g(!1) }).fromTo(c, {
			opacity: 0,
			y: "0.3em"
		}, {
			opacity: 1,
			y: 0,
			duration: .25,
			ease: "power1.out",
			stagger: .035
		});
	}, [a, m]), (0, c.useEffect)(() => {
		C.current && C.current.progress() < 1 && C.current.progress(1);
	}, [_]);
	let w = i && !m && !h && y !== null && y.nm === r, T = yd`
		display: inline-block;
		margin-left: 0.15em;
	`, E = yd`
		display: flex;
		flex-wrap: wrap;
		top: 70%;
		${d ? "" : "pointer-events: none;"}
	`, { r: D, g: O, b: k } = Sd(o), A = yd`
		padding: 1em 1.5em;
		margin: 2em 0;
		/* 背景色に[lay b_alpha=...]をアルファチャンネルで反映。
			要素全体のopacityではなく背景色のアルファのみを下げるので、子要素（文字）の透過度には影響しない
			（レイヤ全体を透かしたい場合は[lay alpha=...]） */
		background-color: rgba(${D}, ${O}, ${k}, ${l});
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
		white-space: pre-wrap;
		color: ${m ? "yellow" : "inherit"};

		/* [lay style="..."]。上の既定を後から上書きできるよう最後に置く */
		${u ?? ""}
	`, j = yd`
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
	`, [M, N] = (0, c.useState)("");
	(0, c.useEffect)(() => N(a), [a]);
	let P = (0, c.useRef)(null), F = (e, t) => {
		Qd(), e.transform = t;
	};
	return /* @__PURE__ */ gd(md, { children: [
		/* @__PURE__ */ gd("span", {
			css: [e, A],
			ref: b,
			style: n,
			children: [/* @__PURE__ */ hd("span", { ref: x }), w && /* @__PURE__ */ hd("span", {
				css: T,
				children: y.kind === "l" ? "🩷" : "✅"
			})]
		}),
		f.length > 0 && /* @__PURE__ */ hd("span", {
			css: [e, E],
			children: f.map((e) => /* @__PURE__ */ hd(bd, {
				text: e.text,
				label: e.label,
				call: e.call ?? !1,
				fn: e.fn ?? "",
				onActivate: p
			}, e.nm))
		}),
		t && /* @__PURE__ */ hd(yl, {
			target: b,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => F(e, t),
			resizable: !0,
			keepRatio: !1,
			onResize: ({ target: { style: e }, width: t, height: n, drag: { transform: r } }) => {
				F(e, r), e.width = `${t}px`, e.height = `${n}px`;
			},
			rotatable: !0,
			throttleRotate: 0,
			startDragRotate: 0,
			throttleDragRotate: 0,
			rotationPosition: "top",
			onRotate: ({ target: { style: e }, drag: { transform: t } }) => F(e, t),
			originDraggable: !0,
			onDragOrigin: ({ target: { style: e }, transformOrigin: t, drag: { transform: n } }) => {
				F(e, n), e.transformOrigin = t;
			}
		}),
		t && /* @__PURE__ */ gd(md, { children: [/* @__PURE__ */ gd("label", {
			css: j,
			ref: P,
			children: ["テキスト入力", /* @__PURE__ */ hd("textarea", {
				rows: 3,
				value: M,
				onChange: (e) => N(e.target.value)
			})]
		}), /* @__PURE__ */ hd(yl, {
			target: P,
			origin: !1,
			draggable: !0,
			throttleDrag: 1,
			onDrag: ({ target: { style: e }, transform: t }) => F(e, t),
			preventDefault: !1
		})] })
	] });
}
function Sd(e) {
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
//#region node_modules/react-use/esm/misc/util.js
var Cd = function() {};
function wd(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function Td(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var Ed = typeof window < "u", Dd = function(e, t) {
	return typeof t == "boolean" ? t : !e;
}, Od = function(e) {
	return (0, c.useReducer)(Dd, e);
}, kd = Ed ? c.useLayoutEffect : c.useEffect, Ad = function(e) {
	(0, c.useEffect)(e, []);
}, jd = Ed ? window : null, Md = function(e) {
	return !!e.addEventListener;
}, Nd = function(e) {
	return !!e.on;
}, Pd = function(e, t, n, r) {
	n === void 0 && (n = jd), (0, c.useEffect)(function() {
		if (t && n) return Md(n) ? wd(n, e, t, r) : Nd(n) && n.on(e, t, r), function() {
			Md(n) ? Td(n, e, t, r) : Nd(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, Fd = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
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
})))()), Id = function(e, t, n) {
	n === void 0 && (n = {});
	var r = n.video, i = n.onClose, a = i === void 0 ? Cd : i, o = (0, c.useState)(t), s = o[0], l = o[1];
	return kd(function() {
		if (t && e.current) {
			var n = function() {
				r?.current && Td(r.current, "webkitendfullscreen", n), a();
			}, i = function() {
				if (Fd.default.isEnabled) {
					var e = Fd.default.isFullscreen;
					l(e), e || a();
				}
			};
			if (Fd.default.isEnabled) {
				try {
					Fd.default.request(e.current), l(!0);
				} catch (e) {
					a(e), l(!1);
				}
				Fd.default.on("change", i);
			} else r && r.current && r.current.webkitEnterFullscreen ? (r.current.webkitEnterFullscreen(), wd(r.current, "webkitendfullscreen", n), l(!0)) : (a(), l(!1));
			return function() {
				if (l(!1), Fd.default.isEnabled) try {
					Fd.default.off("change", i), Fd.default.exit();
				} catch {}
				else r && r.current && r.current.webkitExitFullscreen && (Td(r.current, "webkitendfullscreen", n), r.current.webkitExitFullscreen());
			};
		}
	}, [
		t,
		r,
		e
	]), s;
}, Ld = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, Rd = function(e, t, n, r) {
	t === void 0 && (t = Cd), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var i = n.event, a = i === void 0 ? "keydown" : i, o = n.target, s = n.options;
	Pd(a, (0, c.useMemo)(function() {
		var n = Ld(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), o, s);
}, zd = function(e) {
	return "touches" in e;
}, Bd = function(e) {
	zd(e) && e.touches.length < 2 && e.preventDefault && e.preventDefault();
}, Vd = function(e, t) {
	var n = t === void 0 ? {} : t, r = n.isPreventDefault, i = r === void 0 || r, a = n.delay, o = a === void 0 ? 300 : a, s = (0, c.useRef)(), l = (0, c.useRef)(), u = (0, c.useCallback)(function(t) {
		i && t.target && (wd(t.target, "touchend", Bd, { passive: !1 }), l.current = t.target), s.current = setTimeout(function() {
			return e(t);
		}, o);
	}, [
		e,
		o,
		i
	]), d = (0, c.useCallback)(function() {
		s.current && clearTimeout(s.current), i && l.current && Td(l.current, "touchend", Bd);
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
}, Hd = function(e) {
	Ad(function() {
		e();
	});
}, Ud = { restoreOnUnmount: !1 };
function Wd(e, t) {
	t === void 0 && (t = Ud);
	var n = (0, c.useRef)(document.title);
	document.title !== e && (document.title = e), (0, c.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var Gd = typeof document < "u" ? Wd : function(e) {}, Kd = [
	"visible",
	"alpha",
	"left",
	"top",
	"rotation",
	"scale_x",
	"scale_y"
];
function qd(e) {
	let t = {};
	return e.left !== void 0 && (t.left = `${String(e.left)}px`), e.top !== void 0 && (t.top = `${String(e.top)}px`), e.alpha !== void 0 && (t.opacity = e.alpha), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0) && (t.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, t.transformOrigin = "left top"), e.visible === !1 && (t.display = "none"), t;
}
function Jd({ arg: { heStage: e, sys: t, scrMng: r }, onClick: i, prev: a, next: l }) {
	let u = lf((e) => e.aPage), d = lf((e) => e.foreIdx), f = lf((e) => e.trans), p = lf((e) => e.replace);
	class m extends n {
		nm = "Stage";
		restore() {
			p(this.stt);
		}
	}
	t.caretaker.update(() => new m(JSON.stringify({
		aPage: u,
		foreIdx: d
	})));
	let h = (0, c.useRef)(null), g = (0, c.useRef)(null), _ = [h, g], v = (0, c.useRef)(null);
	(0, c.useEffect)(() => {
		if (v.current?.kill(), v.current = null, !f) {
			s.set([h.current, g.current].filter((e) => e !== null), { opacity: 1 });
			return;
		}
		let e = _[d].current;
		e && (v.current = s.to(e, {
			opacity: 0,
			duration: f.time / 1e3,
			ease: "none"
		}));
	}, [f]);
	let [y, b] = (0, c.useState)(Xd());
	Hd(() => {
		function e() {
			b(Xd());
		}
		return globalThis.addEventListener("resize", e), () => globalThis.removeEventListener("resize", e);
	});
	let { cvsScale: x } = Yd(y), { stageW: S, stageH: C } = o;
	(0, c.useLayoutEffect)(() => {
		e.style.width = `${String(S * x)}px`, e.style.height = `${String(C * x)}px`, e.style.overflow = "hidden";
	}, [
		x,
		S,
		C
	]);
	let w = yd`
		position: relative;
		width: ${S}px;
		height: ${C}px;
		overflow: hidden;
		background-color: black;

		transform-origin: left top;
		transform: scale(${x});
	`, T = yd`position: absolute; top: 0; left: 0;`, E = yd`
		position: absolute; top: 0; left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: black;
	`, D = yd`
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
	`, O = (0, c.useRef)(null);
	Hd(() => {
		let e = O.current;
		e.addEventListener("mousedown", () => Zd = !1);
		let t = (e) => {
			e.preventDefault(), e.deltaY < 0 ? l() : a();
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	});
	let [k, A] = Od(!1), j = Vd((e) => {
		e.stopPropagation(), gf(), !Zd && (A(), mf(!k));
	}, {
		isPreventDefault: !0,
		delay: 300
	}), [M, N] = Od(!1), P = Id(O, M, { onClose: () => N(!1) }), F = { cmn: {
		sys: t,
		styChild: T,
		isDesignMode: k,
		sty4Moveable: {
			maxWidth: "auto",
			maxHeight: "auto",
			minWidth: "auto",
			minHeight: "auto",
			transform: "translate(0px, 0px) rotate(0deg)"
		}
	} };
	return /* @__PURE__ */ gd("div", {
		css: w,
		onClick: i,
		...j,
		ref: O,
		children: [
			k && /* @__PURE__ */ gd(md, { children: [
				/* @__PURE__ */ hd("button", {
					onClick: () => N(),
					css: D,
					children: "FullScr"
				}),
				/* @__PURE__ */ hd("button", {
					onClick: () => {},
					css: D,
					children: "Back"
				}),
				/* @__PURE__ */ hd("button", {
					onClick: () => {},
					css: D,
					children: "Prev"
				})
			] }),
			/* @__PURE__ */ hd("span", { children: P }),
			u.map((e, t) => /* @__PURE__ */ hd("div", {
				ref: _[t],
				"data-page": t === d ? "fore" : "back",
				css: E,
				style: {
					zIndex: +(t === d),
					visibility: t === d || f ? "visible" : "hidden",
					pointerEvents: t === d ? "auto" : "none"
				},
				children: e.map((e) => {
					let n = {
						...F.cmn.sty4Moveable,
						...qd(e)
					};
					return e.cls === "grp" ? /* @__PURE__ */ hd(_d, {
						cmn: F.cmn,
						sty: n,
						fn: e.fn,
						aFace: e.aFace
					}, e.nm) : /* @__PURE__ */ hd(xd, {
						cmn: F.cmn,
						sty: n,
						nm: e.nm,
						isFore: t === d,
						str: e.str,
						b_color: e.b_color,
						b_alpha: e.b_alpha,
						styTxt: e.style,
						enabled: e.enabled,
						aBtn: e.aBtn,
						onActivate: (e, t, n) => r.jumpToLabelAndGo(e, t, n)
					}, e.nm);
				})
			}, t))
		]
	});
}
function Yd({ width: e, height: t }) {
	let n = 0, r = 0, i = 1;
	return o.stageW > e || o.stageH > t ? (o.stageW / o.stageH <= e / t ? (r = t, n = a(o.stageW / o.stageH * t)) : (n = e, r = a(o.stageH / o.stageW * e)), i = n / o.stageW) : (n = o.stageW, r = o.stageH, i = 1), {
		cvsScale: i,
		cvsWidth: n,
		cvsHeight: r
	};
}
function Xd() {
	let { innerWidth: e, innerHeight: t } = globalThis;
	return {
		width: e,
		height: t
	};
}
var Zd = !1, Qd = () => {
	Zd = !0;
}, $d = (e) => {
	let t, n = /* @__PURE__ */ new Set(), r = (e, r) => {
		let i = typeof e == "function" ? e(t) : e;
		if (!Object.is(i, t)) {
			let e = t;
			t = r ?? (typeof i != "object" || !i) ? i : Object.assign({}, t, i), n.forEach((n) => n(t, e));
		}
	}, i = () => t, a = {
		setState: r,
		getState: i,
		getInitialState: () => o,
		subscribe: (e) => (n.add(e), () => n.delete(e))
	}, o = t = e(r, i, a);
	return a;
}, ef = ((e) => e ? $d(e) : $d), tf = (e) => e;
function nf(e, t = tf) {
	let n = c.useSyncExternalStore(e.subscribe, c.useCallback(() => t(e.getState()), [e, t]), c.useCallback(() => t(e.getInitialState()), [e, t]));
	return c.useDebugValue(n), n;
}
var rf = (e) => {
	let t = ef(e), n = (e) => nf(t, e);
	return Object.assign(n, t), n;
}, af = ((e) => e ? rf(e) : rf);
//#endregion
//#region src/store/store.tsx
function of(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function sf(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function cf(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var lf = af()((e, t) => ({
	txt: "",
	addTxt: (t) => e((e) => ({ txt: e.txt + t })),
	clearTxt: () => e(() => ({ txt: "" })),
	aPage: [[], []],
	foreIdx: 0,
	replace: (t) => e(() => JSON.parse(t)),
	addLayer: (t) => e((e) => {
		if (e.aPage[0].some((e) => e.nm === t.nm)) throw `レイヤ名 ${t.nm} は既に使用されています（既存の${e.aPage[0].find((e) => e.nm === t.nm).cls}レイヤと重複）`;
		return { aPage: [[...e.aPage[0], structuredClone(t)], [...e.aPage[1], structuredClone(t)]] };
	}),
	addBtn: ({ layerNm: t, page: n, nm: r, text: i, label: a, call: o, fn: s }) => e((e) => {
		let { idx: c, aLay: l } = of(e, n), u = cf(l, t, "txt");
		if (u.aBtn.some((e) => e.nm === r)) throw `ボタン名 ${r} はレイヤ ${t} 内で既に使用されています`;
		return u.aBtn = [...u.aBtn, {
			nm: r,
			text: i,
			label: a,
			...o === void 0 ? {} : { call: o },
			...s === void 0 ? {} : { fn: s }
		}], sf(e, c, l);
	}),
	chgPic: ({ nm: t, page: n, fn: r, aFace: i }) => e((e) => {
		let { idx: a, aLay: o } = of(e, n), s = cf(o, t, "grp");
		return s.fn = r, s.aFace = i, sf(e, a, o);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r }) => e((e) => {
		let { idx: i, aLay: a } = of(e, n), o = cf(a, t, "txt");
		return o.b_alpha = r, sf(e, i, a);
	}),
	chgLay: ({ nm: t, page: n, sty: r }) => e((e) => {
		let { idx: i, aLay: a } = of(e, n), o = a.find((e) => e.nm === t);
		if (!o) throw `存在しないレイヤ ${t} です`;
		if (o.cls !== "txt" && (r.b_color !== void 0 || r.style !== void 0)) throw `${t} は文字レイヤではありません（b_color/styleは文字レイヤ専用）`;
		return Object.assign(o, r), sf(e, i, a);
	}),
	getLaySty: (e, n) => {
		let r = t(), i = r.aPage[n === "fore" ? r.foreIdx : 1 - r.foreIdx].find((t) => t.nm === e);
		if (!i) throw `存在しないレイヤ ${e} です`;
		let a = {};
		for (let e of Kd) i[e] !== void 0 && Object.assign(a, { [e]: i[e] });
		return a;
	},
	enableEvent: ({ nm: t, enabled: n }) => e((e) => ({ aPage: e.aPage.map((e) => {
		let r = [...e];
		return cf(r, t, "txt").enabled = n, r;
	}) })),
	clearLay: ({ nm: t, page: n }) => e((e) => {
		let r = (e) => {
			let n = e.find((e) => e.nm === t);
			if (!n) throw `存在しないレイヤ ${t} です`;
			for (let e of Kd) e !== "visible" && delete n[e];
			n.cls === "grp" ? (n.fn = "", n.aFace = []) : (n.str = "", n.aBtn = [], delete n.b_color, delete n.style, n.b_alpha = 1);
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return r(t), t;
		}) };
		let { idx: i, aLay: a } = of(e, n);
		return r(a), sf(e, i, a);
	}),
	chgStr: ({ nm: t, page: n, str: r }) => e((e) => {
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let n = [...e];
			return cf(n, t, "txt").str = r, n;
		}) };
		let { idx: i, aLay: a } = of(e, n);
		return cf(a, t, "txt").str = r, sf(e, i, a);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n }) => e((e) => {
		let r = 1 - e.foreIdx, i = e.aPage[e.foreIdx], a = sf(e, r, e.aPage[r].map((e) => t && !t.includes(e.nm) ? structuredClone(i.find((t) => t.nm === e.nm) ?? e) : e));
		return n <= 0 ? {
			...a,
			foreIdx: r
		} : {
			...a,
			trans: {
				seq: (e.trans?.seq ?? 0) + 1,
				time: n
			}
		};
	}),
	finishTrans: () => e((e) => e.trans ? {
		foreIdx: 1 - e.foreIdx,
		trans: null
	} : {}),
	title: "",
	addTitle: (t) => e(() => ({ title: t })),
	isReadBack: !1,
	setReadBack: (t) => e(() => ({ isReadBack: t })),
	isTyping: !1,
	setIsTyping: (t) => e(() => ({ isTyping: t })),
	skipReq: 0,
	requestSkip: () => e((e) => ({ skipReq: e.skipReq + 1 })),
	skipping: !1,
	setSkipping: (t) => e(() => ({ skipping: t })),
	wait: null,
	setWait: (t) => e(() => ({ wait: t }))
})), uf = (0, c.lazy)(() => import("./Stage.js"));
function df(e, t, n) {
	e.render(/* @__PURE__ */ hd(ff, {
		arg: t,
		inited: n
	}));
}
function ff({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: i } = e, a = lf((e) => e.title), o = lf((e) => e.addTitle);
	Gd(a);
	let s = lf((e) => e.addLayer), l = lf((e) => e.chgPic), u = lf((e) => e.chgBAlpha), d = lf((e) => e.chgStr), f = lf((e) => e.chgLay), p = lf((e) => e.getLaySty), m = lf((e) => e.clearLay), h = lf((e) => e.enableEvent), g = lf((e) => e.addBtn), _ = lf((e) => e.setReadBack), v = lf((e) => e.isTyping), y = lf((e) => e.requestSkip), b = lf((e) => e.setWait), x = lf((e) => e.setSkipping), S = lf((e) => e.startTrans), C = lf((e) => e.finishTrans);
	function w() {
		i.go();
	}
	Ad(() => {
		o(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return i.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: s,
			chgPic: l,
			chgBAlpha: u,
			chgStr: d,
			chgLay: f,
			getLaySty: p,
			clearLay: m,
			enableEvent: h,
			addBtn: g,
			addTitle: o,
			setWait: b,
			requestSkip: y,
			setSkipping: x,
			startTrans: S,
			finishTrans: C
		}, e), t(), n.addEventListener("ev_next", w), () => n.removeEventListener("ev_next", w);
	});
	function T() {
		if (v) {
			y();
			return;
		}
		if (r.caretaker.nextKey()) {
			_(!r.caretaker.isLast());
			return;
		}
		_(!1), w();
	}
	function E() {
		r.caretaker.prevKey() && _(!r.caretaker.isLast());
	}
	Rd(() => !0, (e) => {
		if (i.cancelAuto(), i.fireEvent(e.key.toLowerCase())) {
			e.stopPropagation(), e.preventDefault();
			return;
		}
		switch (e.code) {
			case "Space":
			case "ArrowDown":
			case "PageDown":
				e.stopPropagation(), e.preventDefault(), T();
				break;
			case "PageUp":
				e.stopPropagation(), e.preventDefault(), E();
				break;
		}
	});
	function D() {
		if (hf) {
			hf = !1;
			return;
		}
		pf || (i.cancelAuto(), !i.fireEvent("click") && T());
	}
	return /* @__PURE__ */ hd(c.Suspense, {
		fallback: /* @__PURE__ */ hd(md, { children: "Loading" }),
		children: /* @__PURE__ */ hd(uf, {
			arg: e,
			next: T,
			prev: E,
			onClick: D
		})
	});
}
var pf = !1, mf = (e) => pf = e, hf = !1;
function gf() {
	hf = !0;
}
//#endregion
export { ff as Main, qd as i, df as initMain, Jd as n, gf as onLong, Qd as r, mf as setDesignMode, Kd as t };

//# sourceMappingURL=Main.js.map