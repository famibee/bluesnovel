import { n as e, t } from "./rolldown-runtime.js";
import { t as n } from "./react.js";
import { n as r } from "./store.js";
//#region node_modules/react-use/esm/misc/util.js
var i = function() {};
function a(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function o(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var s = typeof window < "u", c = /* @__PURE__ */ e(n()), l = function(e) {
	(0, c.useEffect)(e, []);
}, u = s ? window : null, d = function(e) {
	return !!e.addEventListener;
}, f = function(e) {
	return !!e.on;
}, p = function(e, t, n, r) {
	n === void 0 && (n = u), (0, c.useEffect)(function() {
		if (t && n) return d(n) ? a(n, e, t, r) : f(n) && n.on(e, t, r), function() {
			d(n) ? o(n, e, t, r) : f(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, m = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, h = function(e, t, n, r) {
	t === void 0 && (t = i), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var a = n.event, o = a === void 0 ? "keydown" : a, s = n.target, l = n.options;
	p(o, (0, c.useMemo)(function() {
		var n = m(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), s, l);
}, g = { restoreOnUnmount: !1 };
function _(e, t) {
	t === void 0 && (t = g);
	var n = (0, c.useRef)(document.title);
	document.title !== e && (document.title = e), (0, c.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var v = typeof document < "u" ? _ : function(e) {}, y = /* @__PURE__ */ t(((e) => {
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
})), b = /* @__PURE__ */ t(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === D ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case ee: return "Suspense";
				case w: return "SuspenseList";
				case te: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case T: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case E:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function r(e) {
			return "" + e;
		}
		function i(e) {
			try {
				r(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), r(e);
			}
		}
		function a(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === E) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = O.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (k.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				j || (j = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return M[e] || (M[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
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
			if (f !== void 0) if (a) if (ne(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (k.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", P[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), P[f + a] = !0);
			}
			if (f = null, r !== void 0 && (i(r), f = "" + r), c(n) && (i(n.key), f = "" + n.key), "key" in n) for (var h in r = {}, n) h !== "key" && (r[h] = n[h]);
			else r = n;
			return f && l(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, r, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === E && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = n(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), w = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), te = Symbol.for("react.activity"), D = Symbol.for("react.client.reference"), O = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = Object.prototype.hasOwnProperty, ne = Array.isArray, A = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var j, M = {}, re = h.react_stack_bottom_frame.bind(h, s)(), N = A(a(s)), P = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > O.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : re, r ? A(a(e)) : N);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > O.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : re, r ? A(a(e)) : N);
		};
	})();
})), x = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = y() : t.exports = b();
})))());
function S(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function C(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var ee = /*#__PURE__*/ function() {
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
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(C(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = S(t);
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
}(), w = "-ms-", T = "-moz-", E = "-webkit-", te = "comm", D = "rule", O = "decl", k = "@import", ne = "@keyframes", A = "@layer", j = Math.abs, M = String.fromCharCode, re = Object.assign;
function N(e, t) {
	return L(e, 0) ^ 45 ? (((t << 2 ^ L(e, 0)) << 2 ^ L(e, 1)) << 2 ^ L(e, 2)) << 2 ^ L(e, 3) : 0;
}
function P(e) {
	return e.trim();
}
function ie(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function F(e, t, n) {
	return e.replace(t, n);
}
function I(e, t) {
	return e.indexOf(t);
}
function L(e, t) {
	return e.charCodeAt(t) | 0;
}
function R(e, t, n) {
	return e.slice(t, n);
}
function z(e) {
	return e.length;
}
function ae(e) {
	return e.length;
}
function B(e, t) {
	return t.push(e), e;
}
function oe(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var V = 1, H = 1, se = 0, U = 0, W = 0, G = "";
function ce(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: V,
		column: H,
		length: o,
		return: ""
	};
}
function K(e, t) {
	return re(ce("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function le() {
	return W;
}
function ue() {
	return W = U > 0 ? L(G, --U) : 0, H--, W === 10 && (H = 1, V--), W;
}
function q() {
	return W = U < se ? L(G, U++) : 0, H++, W === 10 && (H = 1, V++), W;
}
function J() {
	return L(G, U);
}
function de() {
	return U;
}
function Y(e, t) {
	return R(G, e, t);
}
function X(e) {
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
function fe(e) {
	return V = H = 1, se = z(G = e), U = 0, [];
}
function pe(e) {
	return G = "", e;
}
function me(e) {
	return P(Y(U - 1, _e(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function he(e) {
	for (; (W = J()) && W < 33;) q();
	return X(e) > 2 || X(W) > 3 ? "" : " ";
}
function ge(e, t) {
	for (; --t && q() && !(W < 48 || W > 102 || W > 57 && W < 65 || W > 70 && W < 97););
	return Y(e, de() + (t < 6 && J() == 32 && q() == 32));
}
function _e(e) {
	for (; q();) switch (W) {
		case e: return U;
		case 34:
		case 39:
			e !== 34 && e !== 39 && _e(W);
			break;
		case 40:
			e === 41 && _e(e);
			break;
		case 92:
			q();
			break;
	}
	return U;
}
function ve(e, t) {
	for (; q() && e + W !== 57 && !(e + W === 84 && J() === 47););
	return "/*" + Y(t, U - 1) + "*" + M(e === 47 ? e : q());
}
function ye(e) {
	for (; !X(J());) q();
	return Y(e, U);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function be(e) {
	return pe(xe("", null, null, null, [""], e = fe(e), 0, [0], e));
}
function xe(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = q()) {
		case 40: if (m != 108 && L(C, d - 1) == 58) {
			I(C += F(me(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += me(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += he(m);
			break;
		case 92:
			C += ge(de() - 1, 7);
			continue;
		case 47:
			switch (J()) {
				case 42:
				case 47:
					B(Ce(ve(q(), de()), t, n), c);
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = z(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = F(C, /\f/g, "")), p > 0 && z(C) - d && B(p > 32 ? we(C + ";", r, n, d - 1) : we(F(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (B(S = Se(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) if (u === 0) xe(C, t, S, S, b, a, d, s, x);
				else switch (f === 99 && L(C, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						xe(e, S, S, r && B(Se(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
						break;
					default: xe(C, S, S, S, [""], x, 0, s, x);
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + z(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && ue() == 125) continue;
			}
			switch (C += M(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (z(C) - 1) * _, _ = 1;
					break;
				case 64:
					J() === 45 && (C += me(q())), f = J(), u = d = z(y = C += ye(de())), v++;
					break;
				case 45: m === 45 && z(C) == 2 && (h = 0);
			}
	}
	return a;
}
function Se(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = ae(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = R(e, d + 1, d = j(h = o[m])), y = e; _ < p; ++_) (y = P(h > 0 ? f[_] + " " + v : F(v, /&\f/g, f[_]))) && (c[g++] = y);
	return ce(e, t, n, i === 0 ? D : s, c, l, u);
}
function Ce(e, t, n) {
	return ce(e, t, n, te, M(le()), R(e, 2, -2), 0);
}
function we(e, t, n, r) {
	return ce(e, t, n, O, R(e, 0, r), R(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Z(e, t) {
	for (var n = "", r = ae(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Te(e, t, n, r) {
	switch (e.type) {
		case A: if (e.children.length) break;
		case k:
		case O: return e.return = e.return || e.value;
		case te: return "";
		case ne: return e.return = e.value + "{" + Z(e.children, r) + "}";
		case D: e.value = e.props.join(",");
	}
	return z(n = Z(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Ee(e) {
	var t = ae(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function De(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function Oe(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var ke = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = J(), r === 38 && i === 12 && (t[n] = 1), !X(i);) q();
	return Y(e, U);
}, Ae = function(e, t) {
	var n = -1, r = 44;
	do
		switch (X(r)) {
			case 0:
				r === 38 && J() === 12 && (t[n] = 1), e[n] += ke(U - 1, t, n);
				break;
			case 2:
				e[n] += me(r);
				break;
			case 4: if (r === 44) {
				e[++n] = J() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += M(r);
		}
	while (r = q());
	return e;
}, je = function(e, t) {
	return pe(Ae(fe(e), t));
}, Me = /* #__PURE__ */ new WeakMap(), Ne = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !Me.get(n)) && !r) {
			Me.set(e, !0);
			for (var i = [], a = je(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Pe = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function Fe(e, t) {
	switch (N(e, t)) {
		case 5103: return E + "print-" + e + e;
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
		case 3829: return E + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return E + e + T + e + w + e + e;
		case 6828:
		case 4268: return E + e + w + e + e;
		case 6165: return E + e + w + "flex-" + e + e;
		case 5187: return E + e + F(e, /(\w+).+(:[^]+)/, E + "box-$1$2" + w + "flex-$1$2") + e;
		case 5443: return E + e + w + "flex-item-" + F(e, /flex-|-self/, "") + e;
		case 4675: return E + e + w + "flex-line-pack" + F(e, /align-content|flex-|-self/, "") + e;
		case 5548: return E + e + w + F(e, "shrink", "negative") + e;
		case 5292: return E + e + w + F(e, "basis", "preferred-size") + e;
		case 6060: return E + "box-" + F(e, "-grow", "") + E + e + w + F(e, "grow", "positive") + e;
		case 4554: return E + F(e, /([^-])(transform)/g, "$1" + E + "$2") + e;
		case 6187: return F(F(F(e, /(zoom-|grab)/, E + "$1"), /(image-set)/, E + "$1"), e, "") + e;
		case 5495:
		case 3959: return F(e, /(image-set\([^]*)/, E + "$1$`$1");
		case 4968: return F(F(e, /(.+:)(flex-)?(.*)/, E + "box-pack:$3" + w + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + E + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return F(e, /(.+)-inline(.+)/, E + "$1$2") + e;
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
			if (z(e) - 1 - t > 6) switch (L(e, t + 1)) {
				case 109: if (L(e, t + 4) !== 45) break;
				case 102: return F(e, /(.+:)(.+)-([^]+)/, "$1" + E + "$2-$3$1" + T + (L(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~I(e, "stretch") ? Fe(F(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (L(e, t + 1) !== 115) break;
		case 6444:
			switch (L(e, z(e) - 3 - (~I(e, "!important") && 10))) {
				case 107: return F(e, ":", ":" + E) + e;
				case 101: return F(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + E + (L(e, 14) === 45 ? "inline-" : "") + "box$3$1" + E + "$2$3$1" + w + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (L(e, t + 11)) {
				case 114: return E + e + w + F(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return E + e + w + F(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return E + e + w + F(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return E + e + w + e + e;
	}
	return e;
}
var Ie = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case O:
			e.return = Fe(e.value, e.length);
			break;
		case ne: return Z([K(e, { value: F(e.value, "@", "@" + E) })], r);
		case D: if (e.length) return oe(e.props, function(t) {
			switch (ie(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return Z([K(e, { props: [F(t, /:(read-\w+)/, ":" + T + "$1")] })], r);
				case "::placeholder": return Z([
					K(e, { props: [F(t, /:(plac\w+)/, ":" + E + "input-$1")] }),
					K(e, { props: [F(t, /:(plac\w+)/, ":" + T + "$1")] }),
					K(e, { props: [F(t, /:(plac\w+)/, w + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], Le = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || Ie, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [Ne, Pe], l, u = [Te, De(function(e) {
		l.insert(e);
	})], d = Ee(c.concat(r, u)), f = function(e) {
		return Z(be(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new ee({
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
}, Re = /* @__PURE__ */ t(((e) => {
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
})), ze = /* @__PURE__ */ t(((e) => {
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
		var S = l, C = u, ee = c, w = s, T = n, E = d, te = i, D = h, O = m, k = r, ne = o, A = a, j = f, M = !1;
		function re(e) {
			return M || (M = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(e) || x(e) === l;
		}
		function N(e) {
			return x(e) === u;
		}
		function P(e) {
			return x(e) === c;
		}
		function ie(e) {
			return x(e) === s;
		}
		function F(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function I(e) {
			return x(e) === d;
		}
		function L(e) {
			return x(e) === i;
		}
		function R(e) {
			return x(e) === h;
		}
		function z(e) {
			return x(e) === m;
		}
		function ae(e) {
			return x(e) === r;
		}
		function B(e) {
			return x(e) === o;
		}
		function oe(e) {
			return x(e) === a;
		}
		function V(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = ee, e.ContextProvider = w, e.Element = T, e.ForwardRef = E, e.Fragment = te, e.Lazy = D, e.Memo = O, e.Portal = k, e.Profiler = ne, e.StrictMode = A, e.Suspense = j, e.isAsyncMode = re, e.isConcurrentMode = N, e.isContextConsumer = P, e.isContextProvider = ie, e.isElement = F, e.isForwardRef = I, e.isFragment = L, e.isLazy = R, e.isMemo = z, e.isPortal = ae, e.isProfiler = B, e.isStrictMode = oe, e.isSuspense = V, e.isValidElementType = b, e.typeOf = x;
	})();
})), Be = /* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Re() : t.exports = ze();
})), Ve = /* @__PURE__ */ t(((e, t) => {
	var n = Be(), r = {
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
function He(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var Ue = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, We = function(e, t, n) {
	Ue(e, t, n);
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
function Ge(e) {
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
var Ke = {
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
}, qe = /[A-Z]|^ms/g, Je = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Ye = function(e) {
	return e.charCodeAt(1) === 45;
}, Xe = function(e) {
	return e != null && typeof e != "boolean";
}, Ze = /* #__PURE__ */ Oe(function(e) {
	return Ye(e) ? e : e.replace(qe, "-$&").toLowerCase();
}), Qe = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(Je, function(e, t, n) {
			return Q = {
				name: t,
				styles: n,
				next: Q
			}, t;
		});
	}
	return Ke[e] !== 1 && !Ye(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function $e(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return Q = {
				name: i.name,
				styles: i.styles,
				next: Q
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) Q = {
					name: o.name,
					styles: o.styles,
					next: Q
				}, o = o.next;
				return a.styles + ";";
			}
			return et(e, t, n);
		case "function":
			if (e !== void 0) {
				var s = Q, c = n(e);
				return Q = s, $e(e, t, c);
			}
			break;
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function et(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += $e(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : Xe(s) && (r += Ze(a) + ":" + Qe(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) Xe(o[c]) && (r += Ze(a) + ":" + Qe(a, o[c]) + ";");
		else {
			var l = $e(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += Ze(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var tt = /label:\s*([^\s;{]+)\s*(;|$)/g, Q;
function nt(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	Q = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += $e(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += $e(n, t, e[o]), r && (i += a[o]);
	tt.lastIndex = 0;
	for (var s = "", c; (c = tt.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: Ge(i) + s,
		styles: i,
		next: Q
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var rt = function(e) {
	return e();
}, it = c.useInsertionEffect ? c.useInsertionEffect : !1, at = it || rt;
it || c.useLayoutEffect;
var ot = /* #__PURE__ */ c.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ Le({ key: "css" }) : null);
ot.Provider;
var st = function(e) {
	return /*#__PURE__*/ (0, c.forwardRef)(function(t, n) {
		return e(t, (0, c.useContext)(ot), n);
	});
}, ct = /* #__PURE__ */ c.createContext({}), $ = {}.hasOwnProperty, lt = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", ut = function(e, t) {
	var n = {};
	for (var r in t) $.call(t, r) && (n[r] = t[r]);
	return n[lt] = e, n;
}, dt = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Ue(t, n, r), at(function() {
		return We(t, n, r);
	}), null;
}, ft = /* @__PURE__ */ st(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[lt], a = [r], o = "";
	typeof e.className == "string" ? o = He(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = nt(a, void 0, c.useContext(ct));
	o += t.key + "-" + s.name;
	var l = {};
	for (var u in e) $.call(e, u) && u !== "css" && u !== lt && (l[u] = e[u]);
	return l.className = o, n && (l.ref = n), /*#__PURE__*/ c.createElement(c.Fragment, null, /*#__PURE__*/ c.createElement(dt, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ c.createElement(i, l));
});
Ve();
var pt = x.Fragment, mt = function(e, t, n) {
	return $.call(t, "css") ? x.jsx(ft, ut(e, t), n) : x.jsx(e, t, n);
}, ht = function(e, t, n) {
	return $.call(t, "css") ? x.jsxs(ft, ut(e, t), n) : x.jsxs(e, t, n);
}, gt = (0, c.lazy)(() => import("./Stage.js"));
function _t(e, t, n) {
	e.render(/* @__PURE__ */ mt(vt, {
		arg: t,
		inited: n
	}));
}
function vt({ arg: e, inited: t }) {
	let { heStage: n, sys: i, scrMng: a } = e, o = r((e) => e.title), s = r((e) => e.addTitle);
	v(o);
	let u = r((e) => e.addLayer), d = r((e) => e.chgPic), f = r((e) => e.chgBAlpha), p = r((e) => e.chgStr), m = r((e) => e.chgLay), g = r((e) => e.getLaySty), _ = r((e) => e.getPages), y = r((e) => e.chgBPic), b = r((e) => e.setBackAlpha), x = r((e) => e.setBtnFont), S = r((e) => e.getPagesJson), C = r((e) => e.replace), ee = r((e) => e.toggleFullScr), w = r((e) => e.clearLay), T = r((e) => e.clearBtn), E = r((e) => e.moveLay), te = r((e) => e.chgFilter), D = r((e) => e.enableEvent), O = r((e) => e.addBtn), k = r((e) => e.setReadBack), ne = r((e) => e.isTyping), A = r((e) => e.requestSkip), j = r((e) => e.setWait), M = r((e) => e.setSkipping), re = r((e) => e.startTrans), N = r((e) => e.finishTrans), P = r((e) => e.startQuake), ie = r((e) => e.finishQuake);
	function F() {
		a.go();
	}
	l(() => {
		s(i.cfg.oCfg.book.title);
		let e = Object.create(null);
		return a.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: u,
			chgPic: d,
			chgBAlpha: f,
			chgBPic: y,
			setBackAlpha: b,
			setBtnFont: x,
			chgStr: p,
			chgLay: m,
			getLaySty: g,
			getPages: _,
			getPagesJson: S,
			replace: C,
			clearLay: w,
			clearBtn: T,
			moveLay: E,
			chgFilter: te,
			enableEvent: D,
			addBtn: O,
			addTitle: s,
			toggleFullScr: ee,
			setWait: j,
			requestSkip: A,
			setSkipping: M,
			startTrans: re,
			finishTrans: N,
			startQuake: P,
			finishQuake: ie
		}, e), t(), n.addEventListener("ev_next", F), () => n.removeEventListener("ev_next", F);
	}), l(() => {
		let e = (e) => a.setKeyDown(e.key, !0), t = (e) => a.setKeyDown(e.key, !1), n = () => a.clearKeyDown();
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), globalThis.addEventListener("blur", n), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t), globalThis.removeEventListener("blur", n);
		};
	});
	function I() {
		if (ne) {
			A();
			return;
		}
		if (i.caretaker.nextKey()) {
			k(!i.caretaker.isLast());
			return;
		}
		k(!1), F();
	}
	function L() {
		i.caretaker.prevKey() && k(!i.caretaker.isLast());
	}
	h(() => !0, (e) => {
		a.cancelAuto();
		let t = yt(e);
		if (a.fireFullScrKey(t)) {
			e.stopPropagation(), e.preventDefault();
			return;
		}
		if (a.fireEvent(t)) {
			e.stopPropagation(), e.preventDefault();
			return;
		}
		switch (e.code) {
			case "Space":
			case "ArrowDown":
			case "PageDown":
				e.stopPropagation(), e.preventDefault(), I();
				break;
			case "PageUp":
				e.stopPropagation(), e.preventDefault(), L();
				break;
		}
	});
	function R() {
		if (St) {
			St = !1;
			return;
		}
		bt || (a.cancelAuto(), !a.fireEvent("click") && I());
	}
	return /* @__PURE__ */ mt(c.Suspense, {
		fallback: /* @__PURE__ */ mt(pt, { children: "Loading" }),
		children: /* @__PURE__ */ mt(gt, {
			arg: e,
			next: I,
			prev: L,
			onClick: R
		})
	});
}
function yt(e) {
	return (e.altKey && e.key !== "Alt" ? "alt+" : "") + (e.ctrlKey && e.key !== "Control" ? "ctrl+" : "") + (e.metaKey && e.key !== "Meta" ? "meta+" : "") + (e.shiftKey && e.key !== "Shift" ? "shift+" : "") + e.key.toLowerCase();
}
var bt = !1, xt = (e) => bt = e, St = !1;
function Ct() {
	St = !0;
}
//#endregion
export { vt as Main, ut as a, Ve as c, i as d, o as f, ft as i, _t as initMain, l, mt as n, $ as o, Ct as onLong, a as p, ht as r, nt as s, xt as setDesignMode, pt as t, s as u };

//# sourceMappingURL=Main.js.map