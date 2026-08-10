import { n as e, r as t, t as n } from "./rolldown-runtime.js";
import { t as r } from "./react.js";
import { S as i, n as a } from "./store.js";
//#region src/ts/GamepadMng.ts
var o = [
	"",
	"ArrowUp",
	"",
	"ArrowLeft",
	"",
	"ArrowRight",
	"",
	"ArrowDown",
	""
], s = .3;
function c(e, t) {
	let n = Math.abs(e) < s ? 0 : Math.sign(e);
	return o[((Math.abs(t) < s ? 0 : Math.sign(t)) + 1) * 3 + (n + 1)] ?? "";
}
var l = class {
	#e;
	#t = -1;
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Map();
	constructor(e) {
		this.#e = e;
	}
	start() {
		this.#t >= 0 || (this.#t = requestAnimationFrame(this.#i));
	}
	stop() {
		this.#t < 0 || (cancelAnimationFrame(this.#t), this.#t = -1, this.#n.clear(), this.#r.clear());
	}
	#i = () => {
		if (this.#t = requestAnimationFrame(this.#i), document.hasFocus()) for (let e of navigator.getGamepads()) e && (this.#o(e), this.#s(e));
	};
	#a(e) {
		(i.getFocus() ?? globalThis).dispatchEvent(new KeyboardEvent("keydown", {
			key: e,
			bubbles: !0
		}));
	}
	#o(e) {
		let t = c(e.axes[0] ?? 0, e.axes[1] ?? 0);
		t !== (this.#n.get(e.index) ?? "") && (this.#n.set(e.index, t), t && (this.#e.cancelAuto(), this.#a(t)));
	}
	#s(e) {
		let t = this.#r.get(e.index) ?? [], n = e.buttons.map((e) => e.pressed);
		this.#r.set(e.index, n);
		for (let e = 0; e < n.length; ++e) n[e] && !t[e] && this.#c(e);
	}
	#c(e) {
		this.#e.cancelAuto(), e % 2 == 0 ? this.#a("Enter") : this.#e.fireEvent("middleclick");
	}
}, u = function() {};
function d(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function f(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var p = typeof window < "u", m = /* @__PURE__ */ t(r()), h = function(e) {
	(0, m.useEffect)(e, []);
}, g = p ? window : null, _ = function(e) {
	return !!e.addEventListener;
}, v = function(e) {
	return !!e.on;
}, y = function(e, t, n, r) {
	n === void 0 && (n = g), (0, m.useEffect)(function() {
		if (t && n) return _(n) ? d(n, e, t, r) : v(n) && n.on(e, t, r), function() {
			_(n) ? f(n, e, t, r) : v(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, b = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, x = function(e, t, n, r) {
	t === void 0 && (t = u), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var i = n.event, a = i === void 0 ? "keydown" : i, o = n.target, s = n.options;
	y(a, (0, m.useMemo)(function() {
		var n = b(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), o, s);
}, S = { restoreOnUnmount: !1 };
function C(e, t) {
	t === void 0 && (t = S);
	var n = (0, m.useRef)(document.title);
	document.title !== e && (document.title = e), (0, m.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var ee = typeof document < "u" ? C : function(e) {}, te = /* @__PURE__ */ n(((e) => {
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
})), ne = /* @__PURE__ */ n(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === ie ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case ee: return "Suspense";
				case te: return "SuspenseList";
				case re: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case ne: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case w:
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
			if (typeof e == "object" && e && e.$$typeof === w) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = T.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (E.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				k || (k = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return A[e] || (A[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
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
			if (f !== void 0) if (a) if (D(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (E.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", N[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), N[f + a] = !0);
			}
			if (f = null, r !== void 0 && (i(r), f = "" + r), c(n) && (i(n.key), f = "" + n.key), "key" in n) for (var h in r = {}, n) h !== "key" && (r[h] = n[h]);
			else r = n;
			return f && l(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, r, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === w && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = r(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), re = Symbol.for("react.activity"), ie = Symbol.for("react.client.reference"), T = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, E = Object.prototype.hasOwnProperty, D = Array.isArray, O = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var k, A = {}, j = h.react_stack_bottom_frame.bind(h, s)(), M = O(a(s)), N = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > T.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : j, r ? O(a(e)) : M);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > T.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : j, r ? O(a(e)) : M);
		};
	})();
})), w = /* @__PURE__ */ t((/* @__PURE__ */ n(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? te() : ne();
})))());
function re(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function ie(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var T = /*#__PURE__*/ function() {
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
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(ie(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = re(t);
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
}(), E = "-ms-", D = "-moz-", O = "-webkit-", k = "comm", A = "rule", j = "decl", M = "@import", N = "@keyframes", P = "@layer", ae = Math.abs, F = String.fromCharCode, oe = Object.assign;
function se(e, t) {
	return R(e, 0) ^ 45 ? (((t << 2 ^ R(e, 0)) << 2 ^ R(e, 1)) << 2 ^ R(e, 2)) << 2 ^ R(e, 3) : 0;
}
function ce(e) {
	return e.trim();
}
function le(e, t) {
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
function ue(e) {
	return e.length;
}
function de(e, t) {
	return t.push(e), e;
}
function fe(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var pe = 1, V = 1, me = 0, H = 0, U = 0, W = "";
function he(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: pe,
		column: V,
		length: o,
		return: ""
	};
}
function G(e, t) {
	return oe(he("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function ge() {
	return U;
}
function _e() {
	return U = H > 0 ? R(W, --H) : 0, V--, U === 10 && (V = 1, pe--), U;
}
function K() {
	return U = H < me ? R(W, H++) : 0, V++, U === 10 && (V = 1, pe++), U;
}
function q() {
	return R(W, H);
}
function ve() {
	return H;
}
function J(e, t) {
	return z(W, e, t);
}
function Y(e) {
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
function ye(e) {
	return pe = V = 1, me = B(W = e), H = 0, [];
}
function be(e) {
	return W = "", e;
}
function xe(e) {
	return ce(J(H - 1, we(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Se(e) {
	for (; (U = q()) && U < 33;) K();
	return Y(e) > 2 || Y(U) > 3 ? "" : " ";
}
function Ce(e, t) {
	for (; --t && K() && !(U < 48 || U > 102 || U > 57 && U < 65 || U > 70 && U < 97););
	return J(e, ve() + (t < 6 && q() == 32 && K() == 32));
}
function we(e) {
	for (; K();) switch (U) {
		case e: return H;
		case 34:
		case 39:
			e !== 34 && e !== 39 && we(U);
			break;
		case 40:
			e === 41 && we(e);
			break;
		case 92:
			K();
			break;
	}
	return H;
}
function Te(e, t) {
	for (; K() && e + U !== 57 && (e + U !== 84 || q() !== 47););
	return "/*" + J(t, H - 1) + "*" + F(e === 47 ? e : K());
}
function Ee(e) {
	for (; !Y(q());) K();
	return J(e, H);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function De(e) {
	return be(Oe("", null, null, null, [""], e = ye(e), 0, [0], e));
}
function Oe(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = K()) {
		case 40: if (m != 108 && R(C, d - 1) == 58) {
			L(C += I(xe(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += xe(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += Se(m);
			break;
		case 92:
			C += Ce(ve() - 1, 7);
			continue;
		case 47:
			switch (q()) {
				case 42:
				case 47:
					de(Ae(Te(K(), ve()), t, n), c);
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
					_ == -1 && (C = I(C, /\f/g, "")), p > 0 && B(C) - d && de(p > 32 ? je(C + ";", r, n, d - 1) : je(I(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (de(S = ke(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) if (u === 0) Oe(C, t, S, S, b, a, d, s, x);
				else switch (f === 99 && R(C, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						Oe(e, S, S, r && de(ke(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
						break;
					default: Oe(C, S, S, S, [""], x, 0, s, x);
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + B(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && _e() == 125) continue;
			}
			switch (C += F(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (B(C) - 1) * _, _ = 1;
					break;
				case 64:
					q() === 45 && (C += xe(K())), f = q(), u = d = B(y = C += Ee(ve())), v++;
					break;
				case 45: m === 45 && B(C) == 2 && (h = 0);
			}
	}
	return a;
}
function ke(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = ue(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = z(e, d + 1, d = ae(h = o[m])), y = e; _ < p; ++_) (y = ce(h > 0 ? f[_] + " " + v : I(v, /&\f/g, f[_]))) && (c[g++] = y);
	return he(e, t, n, i === 0 ? A : s, c, l, u);
}
function Ae(e, t, n) {
	return he(e, t, n, k, F(ge()), z(e, 2, -2), 0);
}
function je(e, t, n, r) {
	return he(e, t, n, j, z(e, 0, r), z(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function X(e, t) {
	for (var n = "", r = ue(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Me(e, t, n, r) {
	switch (e.type) {
		case P: if (e.children.length) break;
		case M:
		case j: return e.return = e.return || e.value;
		case k: return "";
		case N: return e.return = e.value + "{" + X(e.children, r) + "}";
		case A: e.value = e.props.join(",");
	}
	return B(n = X(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Ne(e) {
	var t = ue(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Pe(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function Fe(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var Ie = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = q(), r === 38 && i === 12 && (t[n] = 1), !Y(i);) K();
	return J(e, H);
}, Le = function(e, t) {
	var n = -1, r = 44;
	do
		switch (Y(r)) {
			case 0:
				r === 38 && q() === 12 && (t[n] = 1), e[n] += Ie(H - 1, t, n);
				break;
			case 2:
				e[n] += xe(r);
				break;
			case 4: if (r === 44) {
				e[++n] = q() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += F(r);
		}
	while (r = K());
	return e;
}, Re = function(e, t) {
	return be(Le(ye(e), t));
}, ze = /* #__PURE__ */ new WeakMap(), Be = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !ze.get(n)) && !r) {
			ze.set(e, !0);
			for (var i = [], a = Re(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Ve = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function He(e, t) {
	switch (se(e, t)) {
		case 5103: return O + "print-" + e + e;
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
		case 3829: return O + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return O + e + D + e + E + e + e;
		case 6828:
		case 4268: return O + e + E + e + e;
		case 6165: return O + e + E + "flex-" + e + e;
		case 5187: return O + e + I(e, /(\w+).+(:[^]+)/, O + "box-$1$2" + E + "flex-$1$2") + e;
		case 5443: return O + e + E + "flex-item-" + I(e, /flex-|-self/, "") + e;
		case 4675: return O + e + E + "flex-line-pack" + I(e, /align-content|flex-|-self/, "") + e;
		case 5548: return O + e + E + I(e, "shrink", "negative") + e;
		case 5292: return O + e + E + I(e, "basis", "preferred-size") + e;
		case 6060: return O + "box-" + I(e, "-grow", "") + O + e + E + I(e, "grow", "positive") + e;
		case 4554: return O + I(e, /([^-])(transform)/g, "$1" + O + "$2") + e;
		case 6187: return I(I(I(e, /(zoom-|grab)/, O + "$1"), /(image-set)/, O + "$1"), e, "") + e;
		case 5495:
		case 3959: return I(e, /(image-set\([^]*)/, O + "$1$`$1");
		case 4968: return I(I(e, /(.+:)(flex-)?(.*)/, O + "box-pack:$3" + E + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + O + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return I(e, /(.+)-inline(.+)/, O + "$1$2") + e;
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
				case 102: return I(e, /(.+:)(.+)-([^]+)/, "$1" + O + "$2-$3$1" + D + (R(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~L(e, "stretch") ? He(I(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (R(e, t + 1) !== 115) break;
		case 6444:
			switch (R(e, B(e) - 3 - (~L(e, "!important") && 10))) {
				case 107: return I(e, ":", ":" + O) + e;
				case 101: return I(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + O + (R(e, 14) === 45 ? "inline-" : "") + "box$3$1" + O + "$2$3$1" + E + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (R(e, t + 11)) {
				case 114: return O + e + E + I(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return O + e + E + I(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return O + e + E + I(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return O + e + E + e + e;
	}
	return e;
}
var Ue = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case j:
			e.return = He(e.value, e.length);
			break;
		case N: return X([G(e, { value: I(e.value, "@", "@" + O) })], r);
		case A: if (e.length) return fe(e.props, function(t) {
			switch (le(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return X([G(e, { props: [I(t, /:(read-\w+)/, ":" + D + "$1")] })], r);
				case "::placeholder": return X([
					G(e, { props: [I(t, /:(plac\w+)/, ":" + O + "input-$1")] }),
					G(e, { props: [I(t, /:(plac\w+)/, ":" + D + "$1")] }),
					G(e, { props: [I(t, /:(plac\w+)/, E + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], We = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || Ue, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [Be, Ve], l, u = [Me, Pe(function(e) {
		l.insert(e);
	})], d = Ne(c.concat(r, u)), f = function(e) {
		return X(De(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new T({
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
}, Ge = /* @__PURE__ */ n(((e) => {
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
})), Ke = /* @__PURE__ */ n(((e) => {
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
		var S = l, C = u, ee = c, te = s, ne = n, w = d, re = i, ie = h, T = m, E = r, D = o, O = a, k = f, A = !1;
		function j(e) {
			return A || (A = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), M(e) || x(e) === l;
		}
		function M(e) {
			return x(e) === u;
		}
		function N(e) {
			return x(e) === c;
		}
		function P(e) {
			return x(e) === s;
		}
		function ae(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function F(e) {
			return x(e) === d;
		}
		function oe(e) {
			return x(e) === i;
		}
		function se(e) {
			return x(e) === h;
		}
		function ce(e) {
			return x(e) === m;
		}
		function le(e) {
			return x(e) === r;
		}
		function I(e) {
			return x(e) === o;
		}
		function L(e) {
			return x(e) === a;
		}
		function R(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = ee, e.ContextProvider = te, e.Element = ne, e.ForwardRef = w, e.Fragment = re, e.Lazy = ie, e.Memo = T, e.Portal = E, e.Profiler = D, e.StrictMode = O, e.Suspense = k, e.isAsyncMode = j, e.isConcurrentMode = M, e.isContextConsumer = N, e.isContextProvider = P, e.isElement = ae, e.isForwardRef = F, e.isFragment = oe, e.isLazy = se, e.isMemo = ce, e.isPortal = le, e.isProfiler = I, e.isStrictMode = L, e.isSuspense = R, e.isValidElementType = b, e.typeOf = x;
	})();
})), qe = /* @__PURE__ */ n(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? Ge() : Ke();
})), Je = /* @__PURE__ */ n(((e, t) => {
	var n = qe(), r = {
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
function Ye(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var Xe = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, Ze = function(e, t, n) {
	Xe(e, t, n);
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
function Qe(e) {
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
var $e = {
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
}, et = /[A-Z]|^ms/g, tt = /_EMO_([^_]+?)_([^]*?)_EMO_/g, nt = function(e) {
	return e.charCodeAt(1) === 45;
}, rt = function(e) {
	return e != null && typeof e != "boolean";
}, it = /* #__PURE__ */ Fe(function(e) {
	return nt(e) ? e : e.replace(et, "-$&").toLowerCase();
}), at = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(tt, function(e, t, n) {
			return Q = {
				name: t,
				styles: n,
				next: Q
			}, t;
		});
	}
	return $e[e] !== 1 && !nt(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function Z(e, t, n) {
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
			return ot(e, t, n);
		case "function": if (e !== void 0) {
			var s = Q, c = n(e);
			return Q = s, Z(e, t, c);
		}
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function ot(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += Z(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : rt(s) && (r += it(a) + ":" + at(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) rt(o[c]) && (r += it(a) + ":" + at(a, o[c]) + ";");
		else {
			var l = Z(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += it(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var st = /label:\s*([^\s;{]+)\s*(;|$)/g, Q;
function ct(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	Q = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += Z(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += Z(n, t, e[o]), r && (i += a[o]);
	st.lastIndex = 0;
	for (var s = "", c; (c = st.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: Qe(i) + s,
		styles: i,
		next: Q
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var lt = function(e) {
	return e();
}, ut = m.useInsertionEffect ? m.useInsertionEffect : !1, dt = ut || lt;
ut || m.useLayoutEffect;
var ft = /* #__PURE__ */ m.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ We({ key: "css" }) : null);
ft.Provider;
var pt = function(e) {
	return /*#__PURE__*/ (0, m.forwardRef)(function(t, n) {
		return e(t, (0, m.useContext)(ft), n);
	});
}, mt = /* #__PURE__ */ m.createContext({}), $ = {}.hasOwnProperty, ht = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", gt = function(e, t) {
	var n = {};
	for (var r in t) $.call(t, r) && (n[r] = t[r]);
	return n[ht] = e, n;
}, _t = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Xe(t, n, r), dt(function() {
		return Ze(t, n, r);
	}), null;
}, vt = /* @__PURE__ */ pt(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[ht], a = [r], o = "";
	typeof e.className == "string" ? o = Ye(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = ct(a, void 0, m.useContext(mt));
	o += t.key + "-" + s.name;
	var c = {};
	for (var l in e) $.call(e, l) && l !== "css" && l !== ht && (c[l] = e[l]);
	return c.className = o, n && (c.ref = n), /*#__PURE__*/ m.createElement(m.Fragment, null, /*#__PURE__*/ m.createElement(_t, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ m.createElement(i, c));
});
Je();
var yt = w.Fragment, bt = function(e, t, n) {
	return $.call(t, "css") ? w.jsx(vt, gt(e, t), n) : w.jsx(e, t, n);
}, xt = function(e, t, n) {
	return $.call(t, "css") ? w.jsxs(vt, gt(e, t), n) : w.jsxs(e, t, n);
}, St = /* @__PURE__ */ e({
	Main: () => Tt,
	initMain: () => wt,
	onLong: () => jt,
	setDesignMode: () => kt
}), Ct = (0, m.lazy)(() => import("./Stage.js"));
function wt(e, t, n) {
	e.render(/* @__PURE__ */ bt(Tt, {
		arg: t,
		inited: n
	}));
}
function Tt({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: i } = e, o = a((e) => e.title), s = a((e) => e.addTitle);
	ee(o);
	let c = a((e) => e.addLayer), u = a((e) => e.chgPic), d = a((e) => e.chgBAlpha), f = a((e) => e.chgStr), p = a((e) => e.chgLay), g = a((e) => e.defChStyle), _ = a((e) => e.setChWait), v = a((e) => e.setAutowc), y = a((e) => e.getLaySty), b = a((e) => e.getPages), S = a((e) => e.chgBPic), C = a((e) => e.chgBackClear), te = a((e) => e.setBackAlpha), ne = a((e) => e.setBtnFont), w = a((e) => e.getPagesJson), re = a((e) => e.replace), ie = a((e) => e.toggleFullScr), T = a((e) => e.clearLay), E = a((e) => e.clearTxtLay), D = a((e) => e.moveLay), O = a((e) => e.chgFilter), k = a((e) => e.enableEvent), A = a((e) => e.addBtn), j = a((e) => e.setReadBack), M = a((e) => e.setStyPaging), N = a((e) => e.isReadBack), P = a((e) => e.isTyping), ae = (0, m.useRef)(P);
	ae.current = P;
	let F = a((e) => e.requestSkip), oe = a((e) => e.setWait), se = a((e) => e.setSkipping), ce = a((e) => e.startTrans), le = a((e) => e.finishTrans), I = a((e) => e.startQuake), L = a((e) => e.finishQuake);
	function R() {
		i.go();
	}
	h(() => {
		s(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return i.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: c,
			chgPic: u,
			chgBAlpha: d,
			chgBPic: S,
			chgBackClear: C,
			setBackAlpha: te,
			setBtnFont: ne,
			chgStr: f,
			chgLay: p,
			defChStyle: g,
			setChWait: _,
			setAutowc: v,
			getLaySty: y,
			getPages: b,
			getPagesJson: w,
			replace: re,
			clearLay: T,
			clearTxtLay: E,
			moveLay: D,
			chgFilter: O,
			enableEvent: k,
			addBtn: A,
			addTitle: s,
			toggleFullScr: ie,
			setWait: oe,
			requestSkip: F,
			setSkipping: se,
			startTrans: ce,
			finishTrans: le,
			startQuake: I,
			finishQuake: L,
			setReadBack: j,
			setStyPaging: M,
			isTyping: () => ae.current
		}, e), t(), n.addEventListener("ev_next", R), () => n.removeEventListener("ev_next", R);
	}), (0, m.useEffect)(() => {
		P || i.onTypingDone();
	}, [P, i]), h(() => {
		let e = (e) => i.setKeyDown(e.key, !0), t = (e) => i.setKeyDown(e.key, !1), n = () => i.clearKeyDown();
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), globalThis.addEventListener("blur", n), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t), globalThis.removeEventListener("blur", n);
		};
	}), h(() => {
		let e = new l(i);
		return e.start(), () => {
			e.stop();
		};
	}), h(() => {
		let e = (e) => {
			let { x: t, y: n, w: r, h: a } = e.detail;
			i.setWinInf(t, n, r, a);
		};
		return document.addEventListener("sn_win_inf", e), () => {
			document.removeEventListener("sn_win_inf", e);
		};
	}), h(() => {
		let e = (e) => {
			e.preventDefault(), !Ot && (i.cancelAuto(), i.fireEvent(Dt(e) + "rightclick"));
		};
		return document.addEventListener("contextmenu", e), () => {
			document.removeEventListener("contextmenu", e);
		};
	});
	function z() {
		if (P) {
			F();
			return;
		}
		if (N) {
			i.page("next");
			return;
		}
		R();
	}
	function B() {
		i.page("prev");
	}
	x(() => !0, (e) => {
		i.cancelAuto(), i.unlockAudio();
		let t = Et(e);
		if (i.fireFullScrKey(t)) {
			e.stopPropagation(), e.preventDefault();
			return;
		}
		if (i.fireEvent(t)) {
			e.stopPropagation(), e.preventDefault();
			return;
		}
		switch (e.code) {
			case "Space":
			case "ArrowDown":
			case "PageDown":
				e.stopPropagation(), e.preventDefault(), z();
				break;
			case "PageUp": e.stopPropagation(), e.preventDefault(), B();
		}
	});
	function ue() {
		if (At) {
			At = !1;
			return;
		}
		Ot || (i.cancelAuto(), i.unlockAudio(), !i.fireEvent("click") && z());
	}
	return /* @__PURE__ */ bt(m.Suspense, {
		fallback: /* @__PURE__ */ bt(yt, { children: "Loading" }),
		children: /* @__PURE__ */ bt(Ct, {
			arg: e,
			next: z,
			prev: B,
			onClick: ue
		})
	});
}
function Et(e) {
	return (e.altKey && e.key !== "Alt" ? "alt+" : "") + (e.ctrlKey && e.key !== "Control" ? "ctrl+" : "") + (e.metaKey && e.key !== "Meta" ? "meta+" : "") + (e.shiftKey && e.key !== "Shift" ? "shift+" : "") + e.key.toLowerCase();
}
function Dt(e) {
	return (e.altKey ? "alt+" : "") + (e.ctrlKey ? "ctrl+" : "") + (e.metaKey ? "meta+" : "") + (e.shiftKey ? "shift+" : "");
}
var Ot = !1, kt = (e) => Ot = e, At = !1;
function jt() {
	At = !0;
}
//#endregion
export { Tt as Main, vt as a, ct as c, p as d, u as f, xt as i, wt as initMain, Je as l, d as m, yt as n, gt as o, jt as onLong, f as p, bt as r, $ as s, kt as setDesignMode, St as t, h as u };

//# sourceMappingURL=Main.js.map