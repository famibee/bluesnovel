import { n as e, r as t, t as n } from "./rolldown-runtime.js";
import { t as r } from "./react.js";
import { t as i } from "./FocusMng.js";
import { useStore as a } from "./store.js";
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
], s = .3, c = .2;
function l(e, t, n = s) {
	let r = Math.abs(e) < n ? 0 : Math.sign(e);
	return o[((Math.abs(t) < n ? 0 : Math.sign(t)) + 1) * 3 + (r + 1)] ?? "";
}
function u(e) {
	return {
		key: e,
		code: e,
		bubbles: !0
	};
}
var d = class {
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
		(i.getFocus() ?? globalThis).dispatchEvent(new KeyboardEvent("keydown", u(e)));
	}
	#o(e) {
		let t = this.#n.get(e.index) ?? "", n = l(e.axes[0] ?? 0, e.axes[1] ?? 0, t ? c : s);
		n !== t && (this.#n.set(e.index, n), n && (this.#e.cancelAuto(), this.#a(n)));
	}
	#s(e) {
		let t = this.#r.get(e.index) ?? [], n = e.buttons.map((e) => e.pressed);
		this.#r.set(e.index, n);
		for (let e = 0; e < n.length; ++e) n[e] && !t[e] && this.#c(e);
	}
	#c(e) {
		this.#e.cancelAuto(), e % 2 == 0 ? this.#a("Enter") : this.#e.fireEvent("rightclick");
	}
}, f = function() {};
function p(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function m(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var h = typeof window < "u", g = /* @__PURE__ */ t(r()), _ = function(e) {
	(0, g.useEffect)(e, []);
}, v = h ? window : null, y = function(e) {
	return !!e.addEventListener;
}, b = function(e) {
	return !!e.on;
}, x = function(e, t, n, r) {
	n === void 0 && (n = v), (0, g.useEffect)(function() {
		if (t && n) return y(n) ? p(n, e, t, r) : b(n) && n.on(e, t, r), function() {
			y(n) ? m(n, e, t, r) : b(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, S = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, C = function(e, t, n, r) {
	t === void 0 && (t = f), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var i = n.event, a = i === void 0 ? "keydown" : i, o = n.target, s = n.options;
	x(a, (0, g.useMemo)(function() {
		var n = S(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), o, s);
}, ee = { restoreOnUnmount: !1 };
function te(e, t) {
	t === void 0 && (t = ee);
	var n = (0, g.useRef)(document.title);
	document.title !== e && (document.title = e), (0, g.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var ne = typeof document < "u" ? te : function(e) {}, w = /* @__PURE__ */ n(((e) => {
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
})), re = /* @__PURE__ */ n(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === T ? null : e.displayName || e.name || null;
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
			var e = E.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (D.call(e, "key")) {
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
			if (f !== void 0) {
				if (a) {
					if (ie(f)) {
						for (a = 0; a < f.length; a++) p(f[a]);
						Object.freeze && Object.freeze(f);
					} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
				} else p(f);
			}
			if (D.call(n, "key")) {
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
		var h = r(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), re = Symbol.for("react.activity"), T = Symbol.for("react.client.reference"), E = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = Object.prototype.hasOwnProperty, ie = Array.isArray, O = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var k, A = {}, j = h.react_stack_bottom_frame.bind(h, s)(), M = O(a(s)), N = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : j, r ? O(a(e)) : M);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : j, r ? O(a(e)) : M);
		};
	})();
})), T = /* @__PURE__ */ t((/* @__PURE__ */ n(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? w() : re();
})))());
function E(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function D(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var ie = /*#__PURE__*/ function() {
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
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(D(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = E(t);
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
}(), O = "-ms-", k = "-moz-", A = "-webkit-", j = "comm", M = "rule", N = "decl", P = "@import", F = "@keyframes", ae = "@layer", oe = Math.abs, I = String.fromCharCode, se = Object.assign;
function ce(e, t) {
	return z(e, 0) ^ 45 ? (((t << 2 ^ z(e, 0)) << 2 ^ z(e, 1)) << 2 ^ z(e, 2)) << 2 ^ z(e, 3) : 0;
}
function le(e) {
	return e.trim();
}
function ue(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function L(e, t, n) {
	return e.replace(t, n);
}
function R(e, t) {
	return e.indexOf(t);
}
function z(e, t) {
	return e.charCodeAt(t) | 0;
}
function B(e, t, n) {
	return e.slice(t, n);
}
function V(e) {
	return e.length;
}
function de(e) {
	return e.length;
}
function fe(e, t) {
	return t.push(e), e;
}
function pe(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var me = 1, H = 1, he = 0, U = 0, W = 0, G = "";
function ge(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: me,
		column: H,
		length: o,
		return: ""
	};
}
function K(e, t) {
	return se(ge("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function _e() {
	return W;
}
function ve() {
	return W = U > 0 ? z(G, --U) : 0, H--, W === 10 && (H = 1, me--), W;
}
function q() {
	return W = U < he ? z(G, U++) : 0, H++, W === 10 && (H = 1, me++), W;
}
function J() {
	return z(G, U);
}
function ye() {
	return U;
}
function Y(e, t) {
	return B(G, e, t);
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
function be(e) {
	return me = H = 1, he = V(G = e), U = 0, [];
}
function xe(e) {
	return G = "", e;
}
function Se(e) {
	return le(Y(U - 1, Te(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ce(e) {
	for (; (W = J()) && W < 33;) q();
	return X(e) > 2 || X(W) > 3 ? "" : " ";
}
function we(e, t) {
	for (; --t && q() && !(W < 48 || W > 102 || W > 57 && W < 65 || W > 70 && W < 97););
	return Y(e, ye() + (t < 6 && J() == 32 && q() == 32));
}
function Te(e) {
	for (; q();) switch (W) {
		case e: return U;
		case 34:
		case 39:
			e !== 34 && e !== 39 && Te(W);
			break;
		case 40:
			e === 41 && Te(e);
			break;
		case 92:
			q();
			break;
	}
	return U;
}
function Ee(e, t) {
	for (; q() && e + W !== 57 && (e + W !== 84 || J() !== 47););
	return "/*" + Y(t, U - 1) + "*" + I(e === 47 ? e : q());
}
function De(e) {
	for (; !X(J());) q();
	return Y(e, U);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function Oe(e) {
	return xe(ke("", null, null, null, [""], e = be(e), 0, [0], e));
}
function ke(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = q()) {
		case 40: if (m != 108 && z(C, d - 1) == 58) {
			R(C += L(Se(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += Se(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += Ce(m);
			break;
		case 92:
			C += we(ye() - 1, 7);
			continue;
		case 47:
			switch (J()) {
				case 42:
				case 47:
					fe(je(Ee(q(), ye()), t, n), c);
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = V(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = L(C, /\f/g, "")), p > 0 && V(C) - d && fe(p > 32 ? Me(C + ";", r, n, d - 1) : Me(L(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (fe(S = Ae(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) {
					if (u === 0) ke(C, t, S, S, b, a, d, s, x);
					else switch (f === 99 && z(C, 3) === 110 ? 100 : f) {
						case 100:
						case 108:
						case 109:
						case 115:
							ke(e, S, S, r && fe(Ae(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
							break;
						default: ke(C, S, S, S, [""], x, 0, s, x);
					}
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + V(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && ve() == 125) continue;
			}
			switch (C += I(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (V(C) - 1) * _, _ = 1;
					break;
				case 64:
					J() === 45 && (C += Se(q())), f = J(), u = d = V(y = C += De(ye())), v++;
					break;
				case 45: m === 45 && V(C) == 2 && (h = 0);
			}
	}
	return a;
}
function Ae(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = de(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = B(e, d + 1, d = oe(h = o[m])), y = e; _ < p; ++_) (y = le(h > 0 ? f[_] + " " + v : L(v, /&\f/g, f[_]))) && (c[g++] = y);
	return ge(e, t, n, i === 0 ? M : s, c, l, u);
}
function je(e, t, n) {
	return ge(e, t, n, j, I(_e()), B(e, 2, -2), 0);
}
function Me(e, t, n, r) {
	return ge(e, t, n, N, B(e, 0, r), B(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Z(e, t) {
	for (var n = "", r = de(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Ne(e, t, n, r) {
	switch (e.type) {
		case ae: if (e.children.length) break;
		case P:
		case N: return e.return = e.return || e.value;
		case j: return "";
		case F: return e.return = e.value + "{" + Z(e.children, r) + "}";
		case M: e.value = e.props.join(",");
	}
	return V(n = Z(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Pe(e) {
	var t = de(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Fe(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function Ie(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var Le = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = J(), r === 38 && i === 12 && (t[n] = 1), !X(i);) q();
	return Y(e, U);
}, Re = function(e, t) {
	var n = -1, r = 44;
	do
		switch (X(r)) {
			case 0:
				r === 38 && J() === 12 && (t[n] = 1), e[n] += Le(U - 1, t, n);
				break;
			case 2:
				e[n] += Se(r);
				break;
			case 4: if (r === 44) {
				e[++n] = J() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += I(r);
		}
	while (r = q());
	return e;
}, ze = function(e, t) {
	return xe(Re(be(e), t));
}, Be = /* #__PURE__ */ new WeakMap(), Ve = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !Be.get(n)) && !r) {
			Be.set(e, !0);
			for (var i = [], a = ze(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, He = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function Ue(e, t) {
	switch (ce(e, t)) {
		case 5103: return A + "print-" + e + e;
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
		case 3829: return A + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return A + e + k + e + O + e + e;
		case 6828:
		case 4268: return A + e + O + e + e;
		case 6165: return A + e + O + "flex-" + e + e;
		case 5187: return A + e + L(e, /(\w+).+(:[^]+)/, A + "box-$1$2" + O + "flex-$1$2") + e;
		case 5443: return A + e + O + "flex-item-" + L(e, /flex-|-self/, "") + e;
		case 4675: return A + e + O + "flex-line-pack" + L(e, /align-content|flex-|-self/, "") + e;
		case 5548: return A + e + O + L(e, "shrink", "negative") + e;
		case 5292: return A + e + O + L(e, "basis", "preferred-size") + e;
		case 6060: return A + "box-" + L(e, "-grow", "") + A + e + O + L(e, "grow", "positive") + e;
		case 4554: return A + L(e, /([^-])(transform)/g, "$1" + A + "$2") + e;
		case 6187: return L(L(L(e, /(zoom-|grab)/, A + "$1"), /(image-set)/, A + "$1"), e, "") + e;
		case 5495:
		case 3959: return L(e, /(image-set\([^]*)/, A + "$1$`$1");
		case 4968: return L(L(e, /(.+:)(flex-)?(.*)/, A + "box-pack:$3" + O + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + A + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return L(e, /(.+)-inline(.+)/, A + "$1$2") + e;
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
			if (V(e) - 1 - t > 6) switch (z(e, t + 1)) {
				case 109: if (z(e, t + 4) !== 45) break;
				case 102: return L(e, /(.+:)(.+)-([^]+)/, "$1" + A + "$2-$3$1" + k + (z(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~R(e, "stretch") ? Ue(L(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (z(e, t + 1) !== 115) break;
		case 6444:
			switch (z(e, V(e) - 3 - (~R(e, "!important") && 10))) {
				case 107: return L(e, ":", ":" + A) + e;
				case 101: return L(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + A + (z(e, 14) === 45 ? "inline-" : "") + "box$3$1" + A + "$2$3$1" + O + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (z(e, t + 11)) {
				case 114: return A + e + O + L(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return A + e + O + L(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return A + e + O + L(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return A + e + O + e + e;
	}
	return e;
}
var We = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case N:
			e.return = Ue(e.value, e.length);
			break;
		case F: return Z([K(e, { value: L(e.value, "@", "@" + A) })], r);
		case M: if (e.length) return pe(e.props, function(t) {
			switch (ue(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return Z([K(e, { props: [L(t, /:(read-\w+)/, ":" + k + "$1")] })], r);
				case "::placeholder": return Z([
					K(e, { props: [L(t, /:(plac\w+)/, ":" + A + "input-$1")] }),
					K(e, { props: [L(t, /:(plac\w+)/, ":" + k + "$1")] }),
					K(e, { props: [L(t, /:(plac\w+)/, O + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], Ge = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || We, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [Ve, He], l, u = [Ne, Fe(function(e) {
		l.insert(e);
	})], d = Pe(c.concat(r, u)), f = function(e) {
		return Z(Oe(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new ie({
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
}, Ke = /* @__PURE__ */ n(((e) => {
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
})), qe = /* @__PURE__ */ n(((e) => {
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
		var S = l, C = u, ee = c, te = s, ne = n, w = d, re = i, T = h, E = m, D = r, ie = o, O = a, k = f, A = !1;
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
		function F(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function ae(e) {
			return x(e) === d;
		}
		function oe(e) {
			return x(e) === i;
		}
		function I(e) {
			return x(e) === h;
		}
		function se(e) {
			return x(e) === m;
		}
		function ce(e) {
			return x(e) === r;
		}
		function le(e) {
			return x(e) === o;
		}
		function ue(e) {
			return x(e) === a;
		}
		function L(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = ee, e.ContextProvider = te, e.Element = ne, e.ForwardRef = w, e.Fragment = re, e.Lazy = T, e.Memo = E, e.Portal = D, e.Profiler = ie, e.StrictMode = O, e.Suspense = k, e.isAsyncMode = j, e.isConcurrentMode = M, e.isContextConsumer = N, e.isContextProvider = P, e.isElement = F, e.isForwardRef = ae, e.isFragment = oe, e.isLazy = I, e.isMemo = se, e.isPortal = ce, e.isProfiler = le, e.isStrictMode = ue, e.isSuspense = L, e.isValidElementType = b, e.typeOf = x;
	})();
})), Je = /* @__PURE__ */ n(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? Ke() : qe();
})), Ye = /* @__PURE__ */ n(((e, t) => {
	var n = Je(), r = {
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
function Xe(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var Ze = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, Qe = function(e, t, n) {
	Ze(e, t, n);
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
function $e(e) {
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
var et = {
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
}, tt = /[A-Z]|^ms/g, nt = /_EMO_([^_]+?)_([^]*?)_EMO_/g, rt = function(e) {
	return e.charCodeAt(1) === 45;
}, it = function(e) {
	return e != null && typeof e != "boolean";
}, at = /* #__PURE__ */ Ie(function(e) {
	return rt(e) ? e : e.replace(tt, "-$&").toLowerCase();
}), ot = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(nt, function(e, t, n) {
			return $ = {
				name: t,
				styles: n,
				next: $
			}, t;
		});
	}
	return et[e] !== 1 && !rt(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function Q(e, t, n) {
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
			return st(e, t, n);
		case "function": if (e !== void 0) {
			var s = $, c = n(e);
			return $ = s, Q(e, t, c);
		}
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function st(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += Q(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : it(s) && (r += at(a) + ":" + ot(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) it(o[c]) && (r += at(a) + ":" + ot(a, o[c]) + ";");
		else {
			var l = Q(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += at(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var ct = /label:\s*([^\s;{]+)\s*(;|$)/g, $;
function lt(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	$ = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += Q(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += Q(n, t, e[o]), r && (i += a[o]);
	ct.lastIndex = 0;
	for (var s = "", c; (c = ct.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: $e(i) + s,
		styles: i,
		next: $
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var ut = function(e) {
	return e();
}, dt = g.useInsertionEffect ? g.useInsertionEffect : !1, ft = dt || ut;
dt || g.useLayoutEffect;
var pt = /* #__PURE__ */ g.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ Ge({ key: "css" }) : null);
pt.Provider;
var mt = function(e) {
	return /*#__PURE__*/ (0, g.forwardRef)(function(t, n) {
		return e(t, (0, g.useContext)(pt), n);
	});
}, ht = /* #__PURE__ */ g.createContext({}), gt = {}.hasOwnProperty, _t = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", vt = function(e, t) {
	var n = {};
	for (var r in t) gt.call(t, r) && (n[r] = t[r]);
	return n[_t] = e, n;
}, yt = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Ze(t, n, r), ft(function() {
		return Qe(t, n, r);
	}), null;
}, bt = /* @__PURE__ */ mt(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[_t], a = [r], o = "";
	typeof e.className == "string" ? o = Xe(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = lt(a, void 0, g.useContext(ht));
	o += t.key + "-" + s.name;
	var c = {};
	for (var l in e) gt.call(e, l) && l !== "css" && l !== _t && (c[l] = e[l]);
	return c.className = o, n && (c.ref = n), /*#__PURE__*/ g.createElement(g.Fragment, null, /*#__PURE__*/ g.createElement(yt, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ g.createElement(i, c));
});
Ye();
var xt = T.Fragment, St = function(e, t, n) {
	return gt.call(t, "css") ? T.jsx(bt, vt(e, t), n) : T.jsx(e, t, n);
}, Ct = function(e, t, n) {
	return gt.call(t, "css") ? T.jsxs(bt, vt(e, t), n) : T.jsxs(e, t, n);
}, wt = /* @__PURE__ */ e({
	Main: () => Dt,
	initMain: () => Et,
	modKeyName: () => kt,
	setDesignMode: () => jt,
	suppressClick: () => Nt
}), Tt = (0, g.lazy)(() => import("./Stage.js"));
function Et(e, t, n) {
	e.render(/* @__PURE__ */ St(Dt, {
		arg: t,
		inited: n
	}));
}
function Dt({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: i } = e, o = a((e) => e.title), s = a((e) => e.addTitle);
	ne(o), (0, g.useEffect)(() => {
		document.querySelectorAll("[data-title]").forEach((e) => {
			e.textContent = o;
		});
	}, [o]);
	let c = a((e) => e.addLayer), l = a((e) => e.chgPic), u = a((e) => e.chgBAlpha), f = a((e) => e.chgStr), p = a((e) => e.chgLay), m = a((e) => e.defChStyle), h = a((e) => e.setChWait), v = a((e) => e.setAutowc), y = a((e) => e.getLaySty), b = a((e) => e.getPages), x = a((e) => e.chgBPic), S = a((e) => e.chgBackClear), ee = a((e) => e.setBackAlpha), te = a((e) => e.setBtnFont), w = a((e) => e.getPagesJson), re = a((e) => e.replace), T = a((e) => e.toggleFullScr), E = a((e) => e.clearLay), D = a((e) => e.clearTxtLay), ie = a((e) => e.moveLay), O = a((e) => e.chgFilter), k = a((e) => e.enableEvent), A = a((e) => e.addBtn), j = a((e) => e.setReadBack), M = a((e) => e.setStyPaging), N = a((e) => e.isReadBack), P = a((e) => e.isTyping), F = (0, g.useRef)(P);
	F.current = P;
	let ae = a((e) => e.requestSkip), oe = a((e) => e.setWait), I = a((e) => e.setSkipping), se = a((e) => e.startTrans), ce = a((e) => e.finishTrans), le = a((e) => e.startQuake), ue = a((e) => e.finishQuake);
	function L() {
		i.go();
	}
	_(() => {
		s(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return i.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: c,
			chgPic: l,
			chgBAlpha: u,
			chgBPic: x,
			chgBackClear: S,
			setBackAlpha: ee,
			setBtnFont: te,
			chgStr: f,
			chgLay: p,
			defChStyle: m,
			setChWait: h,
			setAutowc: v,
			getLaySty: y,
			getPages: b,
			getPagesJson: w,
			replace: re,
			clearLay: E,
			clearTxtLay: D,
			moveLay: ie,
			chgFilter: O,
			enableEvent: k,
			addBtn: A,
			addTitle: s,
			toggleFullScr: T,
			setWait: oe,
			requestSkip: ae,
			setSkipping: I,
			startTrans: se,
			finishTrans: ce,
			startQuake: le,
			finishQuake: ue,
			setReadBack: j,
			setStyPaging: M,
			isTyping: () => F.current
		}, e), t(), n.addEventListener("ev_next", L), () => n.removeEventListener("ev_next", L);
	}), (0, g.useEffect)(() => {
		P || i.onTypingDone();
	}, [P, i]), _(() => {
		let e = (e) => i.setKeyDown(e.key, !0), t = (e) => i.setKeyDown(e.key, !1), n = () => i.clearKeyDown();
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), globalThis.addEventListener("blur", n), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t), globalThis.removeEventListener("blur", n);
		};
	}), _(() => {
		let e = new d(i);
		return e.start(), () => {
			e.stop();
		};
	}), _(() => {
		let e = (e) => {
			let { x: t, y: n, w: r, h: a } = e.detail;
			i.setWinInf(t, n, r, a);
		};
		return document.addEventListener("sn_win_inf", e), () => {
			document.removeEventListener("sn_win_inf", e);
		};
	}), _(() => {
		let e = (e) => {
			e.preventDefault(), !At && (i.cancelAuto(), i.fireEvent(kt(e) + "rightclick"));
		};
		return document.addEventListener("contextmenu", e), () => {
			document.removeEventListener("contextmenu", e);
		};
	});
	function R() {
		if (P) {
			ae();
			return;
		}
		if (N) {
			i.page("next");
			return;
		}
		L();
	}
	function z() {
		i.page("prev");
	}
	C(() => !0, (e) => {
		i.cancelAuto(), i.unlockAudio();
		let t = Ot(e);
		if (i.fireFullScrKey(t)) {
			e.stopPropagation(), e.preventDefault();
			return;
		}
		if (i.fireEvent(t)) {
			e.stopPropagation(), e.preventDefault();
			return;
		}
		switch (e.code) {
			case "Enter":
			case "Space":
			case "ArrowDown":
			case "PageDown":
				e.stopPropagation(), e.preventDefault(), R();
				break;
			case "PageUp": e.stopPropagation(), e.preventDefault(), z();
		}
	});
	function B() {
		if (Mt) {
			Mt = !1;
			return;
		}
		At || (i.cancelAuto(), i.unlockAudio(), !i.fireEvent("click") && R());
	}
	return /* @__PURE__ */ St(g.Suspense, {
		fallback: /* @__PURE__ */ St(xt, { children: "Loading" }),
		children: /* @__PURE__ */ St(Tt, {
			arg: e,
			next: R,
			prev: z,
			onClick: B
		})
	});
}
function Ot(e) {
	return (e.altKey && e.key !== "Alt" ? "alt+" : "") + (e.ctrlKey && e.key !== "Control" ? "ctrl+" : "") + (e.metaKey && e.key !== "Meta" ? "meta+" : "") + (e.shiftKey && e.key !== "Shift" ? "shift+" : "") + e.key.toLowerCase();
}
function kt(e) {
	return (e.altKey ? "alt+" : "") + (e.ctrlKey ? "ctrl+" : "") + (e.metaKey ? "meta+" : "") + (e.shiftKey ? "shift+" : "");
}
var At = !1, jt = (e) => At = e, Mt = !1;
function Nt() {
	Mt = !0;
}
//#endregion
export { Dt as Main, bt as a, lt as c, h as d, f, Ct as i, Et as initMain, Ye as l, p as m, kt as modKeyName, xt as n, vt as o, m as p, St as r, gt as s, jt as setDesignMode, Nt as suppressClick, wt as t, _ as u };

//# sourceMappingURL=Main.js.map