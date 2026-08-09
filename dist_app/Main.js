import { n as e, r as t, t as n } from "./rolldown-runtime.js";
import { t as r } from "./react.js";
import { n as i } from "./store.js";
//#region node_modules/react-use/esm/misc/util.js
var a = function() {};
function o(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function s(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var c = typeof window < "u", l = /* @__PURE__ */ t(r()), u = function(e) {
	(0, l.useEffect)(e, []);
}, d = c ? window : null, f = function(e) {
	return !!e.addEventListener;
}, p = function(e) {
	return !!e.on;
}, m = function(e, t, n, r) {
	n === void 0 && (n = d), (0, l.useEffect)(function() {
		if (t && n) return f(n) ? o(n, e, t, r) : p(n) && n.on(e, t, r), function() {
			f(n) ? s(n, e, t, r) : p(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, h = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, g = function(e, t, n, r) {
	t === void 0 && (t = a), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var i = n.event, o = i === void 0 ? "keydown" : i, s = n.target, c = n.options;
	m(o, (0, l.useMemo)(function() {
		var n = h(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), s, c);
}, _ = { restoreOnUnmount: !1 };
function v(e, t) {
	t === void 0 && (t = _);
	var n = (0, l.useRef)(document.title);
	document.title !== e && (document.title = e), (0, l.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var y = typeof document < "u" ? v : function(e) {}, b = /* @__PURE__ */ n(((e) => {
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
})), x = /* @__PURE__ */ n(((e) => {
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
				case te: return "SuspenseList";
				case E: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case w: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case T:
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
			if (typeof e == "object" && e && e.$$typeof === T) return "<...>";
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
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", re[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), re[f + a] = !0);
			}
			if (f = null, r !== void 0 && (i(r), f = "" + r), c(n) && (i(n.key), f = "" + n.key), "key" in n) for (var h in r = {}, n) h !== "key" && (r[h] = n[h]);
			else r = n;
			return f && l(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, r, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === T && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = r(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), E = Symbol.for("react.activity"), D = Symbol.for("react.client.reference"), O = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = Object.prototype.hasOwnProperty, ne = Array.isArray, A = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var j, M = {}, N = h.react_stack_bottom_frame.bind(h, s)(), P = A(a(s)), re = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > O.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : N, r ? A(a(e)) : P);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > O.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : N, r ? A(a(e)) : P);
		};
	})();
})), S = /* @__PURE__ */ t((/* @__PURE__ */ n(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? b() : x();
})))());
function C(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function ee(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var te = /*#__PURE__*/ function() {
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
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(ee(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = C(t);
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
}(), w = "-ms-", T = "-moz-", E = "-webkit-", D = "comm", O = "rule", k = "decl", ne = "@import", A = "@keyframes", j = "@layer", M = Math.abs, N = String.fromCharCode, P = Object.assign;
function re(e, t) {
	return R(e, 0) ^ 45 ? (((t << 2 ^ R(e, 0)) << 2 ^ R(e, 1)) << 2 ^ R(e, 2)) << 2 ^ R(e, 3) : 0;
}
function F(e) {
	return e.trim();
}
function ie(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function I(e, t, n) {
	return e.replace(t, n);
}
function L(e, t) {
	return e.indexOf(t);
}
function R(e, t) {
	return e.charCodeAt(t) | 0;
}
function z(e, t, n) {
	return e.slice(t, n);
}
function B(e) {
	return e.length;
}
function V(e) {
	return e.length;
}
function H(e, t) {
	return t.push(e), e;
}
function ae(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var oe = 1, U = 1, se = 0, W = 0, G = 0, K = "";
function ce(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: oe,
		column: U,
		length: o,
		return: ""
	};
}
function q(e, t) {
	return P(ce("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function le() {
	return G;
}
function ue() {
	return G = W > 0 ? R(K, --W) : 0, U--, G === 10 && (U = 1, oe--), G;
}
function J() {
	return G = W < se ? R(K, W++) : 0, U++, G === 10 && (U = 1, oe++), G;
}
function Y() {
	return R(K, W);
}
function de() {
	return W;
}
function X(e, t) {
	return z(K, e, t);
}
function Z(e) {
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
	return oe = U = 1, se = B(K = e), W = 0, [];
}
function pe(e) {
	return K = "", e;
}
function me(e) {
	return F(X(W - 1, _e(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function he(e) {
	for (; (G = Y()) && G < 33;) J();
	return Z(e) > 2 || Z(G) > 3 ? "" : " ";
}
function ge(e, t) {
	for (; --t && J() && !(G < 48 || G > 102 || G > 57 && G < 65 || G > 70 && G < 97););
	return X(e, de() + (t < 6 && Y() == 32 && J() == 32));
}
function _e(e) {
	for (; J();) switch (G) {
		case e: return W;
		case 34:
		case 39:
			e !== 34 && e !== 39 && _e(G);
			break;
		case 40:
			e === 41 && _e(e);
			break;
		case 92:
			J();
			break;
	}
	return W;
}
function ve(e, t) {
	for (; J() && e + G !== 57 && (e + G !== 84 || Y() !== 47););
	return "/*" + X(t, W - 1) + "*" + N(e === 47 ? e : J());
}
function ye(e) {
	for (; !Z(Y());) J();
	return X(e, W);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function be(e) {
	return pe(xe("", null, null, null, [""], e = fe(e), 0, [0], e));
}
function xe(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = J()) {
		case 40: if (m != 108 && R(C, d - 1) == 58) {
			L(C += I(me(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
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
			switch (Y()) {
				case 42:
				case 47:
					H(Ce(ve(J(), de()), t, n), c);
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = B(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = I(C, /\f/g, "")), p > 0 && B(C) - d && H(p > 32 ? we(C + ";", r, n, d - 1) : we(I(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (H(S = Se(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) if (u === 0) xe(C, t, S, S, b, a, d, s, x);
				else switch (f === 99 && R(C, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						xe(e, S, S, r && H(Se(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
						break;
					default: xe(C, S, S, S, [""], x, 0, s, x);
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + B(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && ue() == 125) continue;
			}
			switch (C += N(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (B(C) - 1) * _, _ = 1;
					break;
				case 64:
					Y() === 45 && (C += me(J())), f = Y(), u = d = B(y = C += ye(de())), v++;
					break;
				case 45: m === 45 && B(C) == 2 && (h = 0);
			}
	}
	return a;
}
function Se(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = V(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = z(e, d + 1, d = M(h = o[m])), y = e; _ < p; ++_) (y = F(h > 0 ? f[_] + " " + v : I(v, /&\f/g, f[_]))) && (c[g++] = y);
	return ce(e, t, n, i === 0 ? O : s, c, l, u);
}
function Ce(e, t, n) {
	return ce(e, t, n, D, N(le()), z(e, 2, -2), 0);
}
function we(e, t, n, r) {
	return ce(e, t, n, k, z(e, 0, r), z(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Q(e, t) {
	for (var n = "", r = V(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Te(e, t, n, r) {
	switch (e.type) {
		case j: if (e.children.length) break;
		case ne:
		case k: return e.return = e.return || e.value;
		case D: return "";
		case A: return e.return = e.value + "{" + Q(e.children, r) + "}";
		case O: e.value = e.props.join(",");
	}
	return B(n = Q(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Ee(e) {
	var t = V(e);
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
	for (var r = 0, i = 0; r = i, i = Y(), r === 38 && i === 12 && (t[n] = 1), !Z(i);) J();
	return X(e, W);
}, Ae = function(e, t) {
	var n = -1, r = 44;
	do
		switch (Z(r)) {
			case 0:
				r === 38 && Y() === 12 && (t[n] = 1), e[n] += ke(W - 1, t, n);
				break;
			case 2:
				e[n] += me(r);
				break;
			case 4: if (r === 44) {
				e[++n] = Y() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += N(r);
		}
	while (r = J());
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
	switch (re(e, t)) {
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
		case 5187: return E + e + I(e, /(\w+).+(:[^]+)/, E + "box-$1$2" + w + "flex-$1$2") + e;
		case 5443: return E + e + w + "flex-item-" + I(e, /flex-|-self/, "") + e;
		case 4675: return E + e + w + "flex-line-pack" + I(e, /align-content|flex-|-self/, "") + e;
		case 5548: return E + e + w + I(e, "shrink", "negative") + e;
		case 5292: return E + e + w + I(e, "basis", "preferred-size") + e;
		case 6060: return E + "box-" + I(e, "-grow", "") + E + e + w + I(e, "grow", "positive") + e;
		case 4554: return E + I(e, /([^-])(transform)/g, "$1" + E + "$2") + e;
		case 6187: return I(I(I(e, /(zoom-|grab)/, E + "$1"), /(image-set)/, E + "$1"), e, "") + e;
		case 5495:
		case 3959: return I(e, /(image-set\([^]*)/, E + "$1$`$1");
		case 4968: return I(I(e, /(.+:)(flex-)?(.*)/, E + "box-pack:$3" + w + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + E + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return I(e, /(.+)-inline(.+)/, E + "$1$2") + e;
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
			if (B(e) - 1 - t > 6) switch (R(e, t + 1)) {
				case 109: if (R(e, t + 4) !== 45) break;
				case 102: return I(e, /(.+:)(.+)-([^]+)/, "$1" + E + "$2-$3$1" + T + (R(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~L(e, "stretch") ? Fe(I(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (R(e, t + 1) !== 115) break;
		case 6444:
			switch (R(e, B(e) - 3 - (~L(e, "!important") && 10))) {
				case 107: return I(e, ":", ":" + E) + e;
				case 101: return I(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + E + (R(e, 14) === 45 ? "inline-" : "") + "box$3$1" + E + "$2$3$1" + w + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (R(e, t + 11)) {
				case 114: return E + e + w + I(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return E + e + w + I(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return E + e + w + I(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return E + e + w + e + e;
	}
	return e;
}
var Ie = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case k:
			e.return = Fe(e.value, e.length);
			break;
		case A: return Q([q(e, { value: I(e.value, "@", "@" + E) })], r);
		case O: if (e.length) return ae(e.props, function(t) {
			switch (ie(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return Q([q(e, { props: [I(t, /:(read-\w+)/, ":" + T + "$1")] })], r);
				case "::placeholder": return Q([
					q(e, { props: [I(t, /:(plac\w+)/, ":" + E + "input-$1")] }),
					q(e, { props: [I(t, /:(plac\w+)/, ":" + T + "$1")] }),
					q(e, { props: [I(t, /:(plac\w+)/, w + "input-$1")] })
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
		return Q(be(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new te({
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
}, Re = /* @__PURE__ */ n(((e) => {
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
})), ze = /* @__PURE__ */ n(((e) => {
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
		var S = l, C = u, ee = c, te = s, w = n, T = d, E = i, D = h, O = m, k = r, ne = o, A = a, j = f, M = !1;
		function N(e) {
			return M || (M = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), P(e) || x(e) === l;
		}
		function P(e) {
			return x(e) === u;
		}
		function re(e) {
			return x(e) === c;
		}
		function F(e) {
			return x(e) === s;
		}
		function ie(e) {
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
		function B(e) {
			return x(e) === r;
		}
		function V(e) {
			return x(e) === o;
		}
		function H(e) {
			return x(e) === a;
		}
		function ae(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = ee, e.ContextProvider = te, e.Element = w, e.ForwardRef = T, e.Fragment = E, e.Lazy = D, e.Memo = O, e.Portal = k, e.Profiler = ne, e.StrictMode = A, e.Suspense = j, e.isAsyncMode = N, e.isConcurrentMode = P, e.isContextConsumer = re, e.isContextProvider = F, e.isElement = ie, e.isForwardRef = I, e.isFragment = L, e.isLazy = R, e.isMemo = z, e.isPortal = B, e.isProfiler = V, e.isStrictMode = H, e.isSuspense = ae, e.isValidElementType = b, e.typeOf = x;
	})();
})), Be = /* @__PURE__ */ n(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? Re() : ze();
})), Ve = /* @__PURE__ */ n(((e, t) => {
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
			return $ = {
				name: t,
				styles: n,
				next: $
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
			if (i.anim === 1) return $ = {
				name: i.name,
				styles: i.styles,
				next: $
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) $ = {
					name: o.name,
					styles: o.styles,
					next: $
				}, o = o.next;
				return a.styles + ";";
			}
			return et(e, t, n);
		case "function": if (e !== void 0) {
			var s = $, c = n(e);
			return $ = s, $e(e, t, c);
		}
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
var tt = /label:\s*([^\s;{]+)\s*(;|$)/g, $;
function nt(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	$ = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += $e(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += $e(n, t, e[o]), r && (i += a[o]);
	tt.lastIndex = 0;
	for (var s = "", c; (c = tt.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: Ge(i) + s,
		styles: i,
		next: $
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var rt = function(e) {
	return e();
}, it = l.useInsertionEffect ? l.useInsertionEffect : !1, at = it || rt;
it || l.useLayoutEffect;
var ot = /* #__PURE__ */ l.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ Le({ key: "css" }) : null);
ot.Provider;
var st = function(e) {
	return /*#__PURE__*/ (0, l.forwardRef)(function(t, n) {
		return e(t, (0, l.useContext)(ot), n);
	});
}, ct = /* #__PURE__ */ l.createContext({}), lt = {}.hasOwnProperty, ut = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", dt = function(e, t) {
	var n = {};
	for (var r in t) lt.call(t, r) && (n[r] = t[r]);
	return n[ut] = e, n;
}, ft = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Ue(t, n, r), at(function() {
		return We(t, n, r);
	}), null;
}, pt = /* @__PURE__ */ st(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[ut], a = [r], o = "";
	typeof e.className == "string" ? o = He(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = nt(a, void 0, l.useContext(ct));
	o += t.key + "-" + s.name;
	var c = {};
	for (var u in e) lt.call(e, u) && u !== "css" && u !== ut && (c[u] = e[u]);
	return c.className = o, n && (c.ref = n), /*#__PURE__*/ l.createElement(l.Fragment, null, /*#__PURE__*/ l.createElement(ft, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ l.createElement(i, c));
});
Ve();
var mt = S.Fragment, ht = function(e, t, n) {
	return lt.call(t, "css") ? S.jsx(pt, dt(e, t), n) : S.jsx(e, t, n);
}, gt = function(e, t, n) {
	return lt.call(t, "css") ? S.jsxs(pt, dt(e, t), n) : S.jsxs(e, t, n);
}, _t = /* @__PURE__ */ e({
	Main: () => bt,
	initMain: () => yt,
	onLong: () => Et,
	setDesignMode: () => wt
}), vt = (0, l.lazy)(() => import("./Stage.js"));
function yt(e, t, n) {
	e.render(/* @__PURE__ */ ht(bt, {
		arg: t,
		inited: n
	}));
}
function bt({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: a } = e, o = i((e) => e.title), s = i((e) => e.addTitle);
	y(o);
	let c = i((e) => e.addLayer), d = i((e) => e.chgPic), f = i((e) => e.chgBAlpha), p = i((e) => e.chgStr), m = i((e) => e.chgLay), h = i((e) => e.defChStyle), _ = i((e) => e.setChWait), v = i((e) => e.setAutowc), b = i((e) => e.getLaySty), x = i((e) => e.getPages), S = i((e) => e.chgBPic), C = i((e) => e.chgBackClear), ee = i((e) => e.setBackAlpha), te = i((e) => e.setBtnFont), w = i((e) => e.getPagesJson), T = i((e) => e.replace), E = i((e) => e.toggleFullScr), D = i((e) => e.clearLay), O = i((e) => e.clearTxtLay), k = i((e) => e.moveLay), ne = i((e) => e.chgFilter), A = i((e) => e.enableEvent), j = i((e) => e.addBtn), M = i((e) => e.setReadBack), N = i((e) => e.setStyPaging), P = i((e) => e.isReadBack), re = i((e) => e.isTyping), F = i((e) => e.requestSkip), ie = i((e) => e.setWait), I = i((e) => e.setSkipping), L = i((e) => e.startTrans), R = i((e) => e.finishTrans), z = i((e) => e.startQuake), B = i((e) => e.finishQuake);
	function V() {
		a.go();
	}
	u(() => {
		s(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return a.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: c,
			chgPic: d,
			chgBAlpha: f,
			chgBPic: S,
			chgBackClear: C,
			setBackAlpha: ee,
			setBtnFont: te,
			chgStr: p,
			chgLay: m,
			defChStyle: h,
			setChWait: _,
			setAutowc: v,
			getLaySty: b,
			getPages: x,
			getPagesJson: w,
			replace: T,
			clearLay: D,
			clearTxtLay: O,
			moveLay: k,
			chgFilter: ne,
			enableEvent: A,
			addBtn: j,
			addTitle: s,
			toggleFullScr: E,
			setWait: ie,
			requestSkip: F,
			setSkipping: I,
			startTrans: L,
			finishTrans: R,
			startQuake: z,
			finishQuake: B,
			setReadBack: M,
			setStyPaging: N
		}, e), t(), n.addEventListener("ev_next", V), () => n.removeEventListener("ev_next", V);
	}), u(() => {
		let e = (e) => a.setKeyDown(e.key, !0), t = (e) => a.setKeyDown(e.key, !1), n = () => a.clearKeyDown();
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), globalThis.addEventListener("blur", n), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t), globalThis.removeEventListener("blur", n);
		};
	}), u(() => {
		let e = (e) => {
			let { x: t, y: n, w: r, h: i } = e.detail;
			a.setWinInf(t, n, r, i);
		};
		return document.addEventListener("sn_win_inf", e), () => {
			document.removeEventListener("sn_win_inf", e);
		};
	}), u(() => {
		let e = (e) => {
			e.preventDefault(), !Ct && (a.cancelAuto(), a.fireEvent(St(e) + "rightclick"));
		};
		return document.addEventListener("contextmenu", e), () => {
			document.removeEventListener("contextmenu", e);
		};
	});
	function H() {
		if (re) {
			F();
			return;
		}
		if (P) {
			a.page("next");
			return;
		}
		V();
	}
	function ae() {
		a.page("prev");
	}
	g(() => !0, (e) => {
		a.cancelAuto(), a.unlockAudio();
		let t = xt(e);
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
				e.stopPropagation(), e.preventDefault(), H();
				break;
			case "PageUp": e.stopPropagation(), e.preventDefault(), ae();
		}
	});
	function oe() {
		if (Tt) {
			Tt = !1;
			return;
		}
		Ct || (a.cancelAuto(), a.unlockAudio(), !a.fireEvent("click") && H());
	}
	return /* @__PURE__ */ ht(l.Suspense, {
		fallback: /* @__PURE__ */ ht(mt, { children: "Loading" }),
		children: /* @__PURE__ */ ht(vt, {
			arg: e,
			next: H,
			prev: ae,
			onClick: oe
		})
	});
}
function xt(e) {
	return (e.altKey && e.key !== "Alt" ? "alt+" : "") + (e.ctrlKey && e.key !== "Control" ? "ctrl+" : "") + (e.metaKey && e.key !== "Meta" ? "meta+" : "") + (e.shiftKey && e.key !== "Shift" ? "shift+" : "") + e.key.toLowerCase();
}
function St(e) {
	return (e.altKey ? "alt+" : "") + (e.ctrlKey ? "ctrl+" : "") + (e.metaKey ? "meta+" : "") + (e.shiftKey ? "shift+" : "");
}
var Ct = !1, wt = (e) => Ct = e, Tt = !1;
function Et() {
	Tt = !0;
}
//#endregion
export { bt as Main, pt as a, nt as c, c as d, a as f, gt as i, yt as initMain, Ve as l, o as m, mt as n, dt as o, Et as onLong, s as p, ht as r, lt as s, wt as setDesignMode, _t as t, u };

//# sourceMappingURL=Main.js.map