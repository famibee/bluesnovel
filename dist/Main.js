import { n as e, t } from "./rolldown-runtime.js";
import { t as n } from "./react.js";
//#region node_modules/zustand/esm/vanilla.mjs
var r = (e) => {
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
}, i = ((e) => e ? r(e) : r), a = /* @__PURE__ */ e(n(), 1), o = (e) => e;
function s(e, t = o) {
	let n = a.useSyncExternalStore(e.subscribe, a.useCallback(() => t(e.getState()), [e, t]), a.useCallback(() => t(e.getInitialState()), [e, t]));
	return a.useDebugValue(n), n;
}
var c = (e) => {
	let t = i(e), n = (e) => s(t, e);
	return Object.assign(n, t), n;
}, l = ((e) => e ? c(e) : c)()((e) => ({
	txt: "",
	addTxt: (t) => e((e) => ({ txt: e.txt + t })),
	clearTxt: () => e(() => ({ txt: "" })),
	aLay: [],
	replace: (t) => e(() => ({ aLay: JSON.parse(t) })),
	addLayer: (t) => e((e) => ({ aLay: [...e.aLay, t] })),
	chgPic: ({ nm: t, fn: n }) => e((e) => {
		let r = [...e.aLay], i = r.find((e) => e.nm === t);
		if (!i) throw `存在しないレイヤ ${t} です`;
		if (i.cls !== "GRP") throw `${t} は画像レイヤではありません`;
		return i.fn = n, { aLay: r };
	}),
	chgStr: ({ nm: t, str: n }) => e((e) => {
		let r = [...e.aLay], i = r.find((e) => e.nm === t);
		if (!i) throw `存在しないレイヤ ${t} です`;
		if (i.cls !== "TXT") throw `${t} は文字レイヤではありません`;
		return i.str = n, { aLay: r };
	}),
	title: "",
	addTitle: (t) => e(() => ({ title: t })),
	isReadBack: !1,
	setReadBack: (t) => e(() => ({ isReadBack: t }))
})), u = function() {};
function d(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function f(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var p = typeof window < "u", m = function(e) {
	(0, a.useEffect)(e, []);
}, h = p ? window : null, g = function(e) {
	return !!e.addEventListener;
}, _ = function(e) {
	return !!e.on;
}, v = function(e, t, n, r) {
	n === void 0 && (n = h), (0, a.useEffect)(function() {
		if (t && n) return g(n) ? d(n, e, t, r) : _(n) && n.on(e, t, r), function() {
			g(n) ? f(n, e, t, r) : _(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, y = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, b = function(e, t, n, r) {
	t === void 0 && (t = u), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var i = n.event, o = i === void 0 ? "keydown" : i, s = n.target, c = n.options;
	v(o, (0, a.useMemo)(function() {
		var n = y(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), s, c);
}, x = { restoreOnUnmount: !1 };
function S(e, t) {
	t === void 0 && (t = x);
	var n = (0, a.useRef)(document.title);
	document.title !== e && (document.title = e), (0, a.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var C = typeof document < "u" ? S : function(e) {}, ee = /* @__PURE__ */ t(((e) => {
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
})), te = /* @__PURE__ */ t(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === re ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case ee: return "Suspense";
				case te: return "SuspenseList";
				case ne: return "Activity";
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
			if (typeof e == "object" && e && e.$$typeof === T) return "<...>";
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
				A || (A = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return j[e] || (j[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
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
			if (f !== void 0) if (a) if (O(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (D.call(n, "key")) {
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
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === T && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = n(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), ne = Symbol.for("react.activity"), re = Symbol.for("react.client.reference"), E = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = Object.prototype.hasOwnProperty, O = Array.isArray, k = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var A, j = {}, M = h.react_stack_bottom_frame.bind(h, s)(), N = k(a(s)), P = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : M, r ? k(a(e)) : N);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : M, r ? k(a(e)) : N);
		};
	})();
})), w = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = ee() : t.exports = te();
})))());
function T(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function ne(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var re = /*#__PURE__*/ function() {
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
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(ne(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = T(t);
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
}(), E = "-ms-", D = "-moz-", O = "-webkit-", k = "comm", A = "rule", j = "decl", M = "@import", N = "@keyframes", P = "@layer", ie = Math.abs, F = String.fromCharCode, ae = Object.assign;
function oe(e, t) {
	return L(e, 0) ^ 45 ? (((t << 2 ^ L(e, 0)) << 2 ^ L(e, 1)) << 2 ^ L(e, 2)) << 2 ^ L(e, 3) : 0;
}
function se(e) {
	return e.trim();
}
function ce(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function I(e, t, n) {
	return e.replace(t, n);
}
function le(e, t) {
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
var pe = 1, B = 1, me = 0, V = 0, H = 0, U = "";
function he(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: pe,
		column: B,
		length: o,
		return: ""
	};
}
function W(e, t) {
	return ae(he("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function ge() {
	return H;
}
function _e() {
	return H = V > 0 ? L(U, --V) : 0, B--, H === 10 && (B = 1, pe--), H;
}
function G() {
	return H = V < me ? L(U, V++) : 0, B++, H === 10 && (B = 1, pe++), H;
}
function K() {
	return L(U, V);
}
function ve() {
	return V;
}
function q(e, t) {
	return R(U, e, t);
}
function J(e) {
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
	return pe = B = 1, me = z(U = e), V = 0, [];
}
function be(e) {
	return U = "", e;
}
function xe(e) {
	return se(q(V - 1, we(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Se(e) {
	for (; (H = K()) && H < 33;) G();
	return J(e) > 2 || J(H) > 3 ? "" : " ";
}
function Ce(e, t) {
	for (; --t && G() && !(H < 48 || H > 102 || H > 57 && H < 65 || H > 70 && H < 97););
	return q(e, ve() + (t < 6 && K() == 32 && G() == 32));
}
function we(e) {
	for (; G();) switch (H) {
		case e: return V;
		case 34:
		case 39:
			e !== 34 && e !== 39 && we(H);
			break;
		case 40:
			e === 41 && we(e);
			break;
		case 92:
			G();
			break;
	}
	return V;
}
function Te(e, t) {
	for (; G() && e + H !== 57 && !(e + H === 84 && K() === 47););
	return "/*" + q(t, V - 1) + "*" + F(e === 47 ? e : G());
}
function Ee(e) {
	for (; !J(K());) G();
	return q(e, V);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function De(e) {
	return be(Oe("", null, null, null, [""], e = ye(e), 0, [0], e));
}
function Oe(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = G()) {
		case 40: if (m != 108 && L(C, d - 1) == 58) {
			le(C += I(xe(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
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
			switch (K()) {
				case 42:
				case 47:
					de(Ae(Te(G(), ve()), t, n), c);
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
					_ == -1 && (C = I(C, /\f/g, "")), p > 0 && z(C) - d && de(p > 32 ? je(C + ";", r, n, d - 1) : je(I(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (de(S = ke(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) if (u === 0) Oe(C, t, S, S, b, a, d, s, x);
				else switch (f === 99 && L(C, 3) === 110 ? 100 : f) {
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
		case 58: d = 1 + z(C), p = m;
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
					s[l++] = (z(C) - 1) * _, _ = 1;
					break;
				case 64:
					K() === 45 && (C += xe(G())), f = K(), u = d = z(y = C += Ee(ve())), v++;
					break;
				case 45: m === 45 && z(C) == 2 && (h = 0);
			}
	}
	return a;
}
function ke(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = ue(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = R(e, d + 1, d = ie(h = o[m])), y = e; _ < p; ++_) (y = se(h > 0 ? f[_] + " " + v : I(v, /&\f/g, f[_]))) && (c[g++] = y);
	return he(e, t, n, i === 0 ? A : s, c, l, u);
}
function Ae(e, t, n) {
	return he(e, t, n, k, F(ge()), R(e, 2, -2), 0);
}
function je(e, t, n, r) {
	return he(e, t, n, j, R(e, 0, r), R(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Y(e, t) {
	for (var n = "", r = ue(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Me(e, t, n, r) {
	switch (e.type) {
		case P: if (e.children.length) break;
		case M:
		case j: return e.return = e.return || e.value;
		case k: return "";
		case N: return e.return = e.value + "{" + Y(e.children, r) + "}";
		case A: e.value = e.props.join(",");
	}
	return z(n = Y(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
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
	for (var r = 0, i = 0; r = i, i = K(), r === 38 && i === 12 && (t[n] = 1), !J(i);) G();
	return q(e, V);
}, Le = function(e, t) {
	var n = -1, r = 44;
	do
		switch (J(r)) {
			case 0:
				r === 38 && K() === 12 && (t[n] = 1), e[n] += Ie(V - 1, t, n);
				break;
			case 2:
				e[n] += xe(r);
				break;
			case 4: if (r === 44) {
				e[++n] = K() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += F(r);
		}
	while (r = G());
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
	switch (oe(e, t)) {
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
			if (z(e) - 1 - t > 6) switch (L(e, t + 1)) {
				case 109: if (L(e, t + 4) !== 45) break;
				case 102: return I(e, /(.+:)(.+)-([^]+)/, "$1" + O + "$2-$3$1" + D + (L(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~le(e, "stretch") ? He(I(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (L(e, t + 1) !== 115) break;
		case 6444:
			switch (L(e, z(e) - 3 - (~le(e, "!important") && 10))) {
				case 107: return I(e, ":", ":" + O) + e;
				case 101: return I(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + O + (L(e, 14) === 45 ? "inline-" : "") + "box$3$1" + O + "$2$3$1" + E + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (L(e, t + 11)) {
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
		case N: return Y([W(e, { value: I(e.value, "@", "@" + O) })], r);
		case A: if (e.length) return fe(e.props, function(t) {
			switch (ce(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return Y([W(e, { props: [I(t, /:(read-\w+)/, ":" + D + "$1")] })], r);
				case "::placeholder": return Y([
					W(e, { props: [I(t, /:(plac\w+)/, ":" + O + "input-$1")] }),
					W(e, { props: [I(t, /:(plac\w+)/, ":" + D + "$1")] }),
					W(e, { props: [I(t, /:(plac\w+)/, E + "input-$1")] })
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
		return Y(De(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new re({
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
}, Ge = /* @__PURE__ */ t(((e) => {
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
})), Ke = /* @__PURE__ */ t(((e) => {
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
		var S = l, C = u, ee = c, te = s, w = n, T = d, ne = i, re = h, E = m, D = r, O = o, k = a, A = f, j = !1;
		function M(e) {
			return j || (j = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(e) || x(e) === l;
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
		function ae(e) {
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
		function I(e) {
			return x(e) === r;
		}
		function le(e) {
			return x(e) === o;
		}
		function L(e) {
			return x(e) === a;
		}
		function R(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = ee, e.ContextProvider = te, e.Element = w, e.ForwardRef = T, e.Fragment = ne, e.Lazy = re, e.Memo = E, e.Portal = D, e.Profiler = O, e.StrictMode = k, e.Suspense = A, e.isAsyncMode = M, e.isConcurrentMode = N, e.isContextConsumer = P, e.isContextProvider = ie, e.isElement = F, e.isForwardRef = ae, e.isFragment = oe, e.isLazy = se, e.isMemo = ce, e.isPortal = I, e.isProfiler = le, e.isStrictMode = L, e.isSuspense = R, e.isValidElementType = b, e.typeOf = x;
	})();
})), qe = /* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Ge() : t.exports = Ke();
})), Je = /* @__PURE__ */ t(((e, t) => {
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
			return Z = {
				name: t,
				styles: n,
				next: Z
			}, t;
		});
	}
	return $e[e] !== 1 && !nt(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function X(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return Z = {
				name: i.name,
				styles: i.styles,
				next: Z
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) Z = {
					name: o.name,
					styles: o.styles,
					next: Z
				}, o = o.next;
				return a.styles + ";";
			}
			return ot(e, t, n);
		case "function":
			if (e !== void 0) {
				var s = Z, c = n(e);
				return Z = s, X(e, t, c);
			}
			break;
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function ot(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += X(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : rt(s) && (r += it(a) + ":" + at(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) rt(o[c]) && (r += it(a) + ":" + at(a, o[c]) + ";");
		else {
			var l = X(e, t, o);
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
var st = /label:\s*([^\s;{]+)\s*(;|$)/g, Z;
function ct(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	Z = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += X(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += X(n, t, e[o]), r && (i += a[o]);
	st.lastIndex = 0;
	for (var s = "", c; (c = st.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: Qe(i) + s,
		styles: i,
		next: Z
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var lt = function(e) {
	return e();
}, ut = a.useInsertionEffect ? a.useInsertionEffect : !1, dt = ut || lt;
ut || a.useLayoutEffect;
var ft = /* #__PURE__ */ a.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ We({ key: "css" }) : null);
ft.Provider;
var pt = function(e) {
	return /*#__PURE__*/ (0, a.forwardRef)(function(t, n) {
		return e(t, (0, a.useContext)(ft), n);
	});
}, mt = /* #__PURE__ */ a.createContext({}), Q = {}.hasOwnProperty, ht = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", gt = function(e, t) {
	var n = {};
	for (var r in t) Q.call(t, r) && (n[r] = t[r]);
	return n[ht] = e, n;
}, _t = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Xe(t, n, r), dt(function() {
		return Ze(t, n, r);
	}), null;
}, vt = /* @__PURE__ */ pt(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[ht], o = [r], s = "";
	typeof e.className == "string" ? s = Ye(t.registered, o, e.className) : e.className != null && (s = e.className + " ");
	var c = ct(o, void 0, a.useContext(mt));
	s += t.key + "-" + c.name;
	var l = {};
	for (var u in e) Q.call(e, u) && u !== "css" && u !== ht && (l[u] = e[u]);
	return l.className = s, n && (l.ref = n), /*#__PURE__*/ a.createElement(a.Fragment, null, /*#__PURE__*/ a.createElement(_t, {
		cache: t,
		serialized: c,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ a.createElement(i, l));
});
Je();
var yt = w.Fragment, $ = function(e, t, n) {
	return Q.call(t, "css") ? w.jsx(vt, gt(e, t), n) : w.jsx(e, t, n);
}, bt = function(e, t, n) {
	return Q.call(t, "css") ? w.jsxs(vt, gt(e, t), n) : w.jsxs(e, t, n);
};
//#endregion
//#region src/components/Main.tsx
function xt(e, t, n) {
	e.render(/* @__PURE__ */ $(St, {
		arg: t,
		inited: n
	}));
}
function St({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: i } = e, o = l((e) => e.title), s = l((e) => e.addTitle);
	C(o);
	let c = l((e) => e.addLayer), u = l((e) => e.chgPic), d = l((e) => e.chgStr), f = l((e) => e.setReadBack);
	function p() {
		i.go();
	}
	m(() => {
		s(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return i.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: c,
			chgPic: u,
			chgStr: d,
			addTitle: s
		}, e), t(), n.addEventListener("ev_next", p), () => n.removeEventListener("ev_next", p);
	});
	function h() {
		if (r.caretaker.nextKey()) {
			f(!r.caretaker.isLast());
			return;
		}
		f(!1), p();
	}
	function g() {
		r.caretaker.prevKey() && f(!r.caretaker.isLast());
	}
	b((e) => e.code === "Space", (e) => {
		e.stopPropagation(), e.preventDefault(), h();
	}), b((e) => e.code === "PageDown", (e) => {
		e.stopPropagation(), e.preventDefault(), h();
	}), b((e) => e.code === "PageUp", (e) => {
		e.stopPropagation(), e.preventDefault(), g();
	});
	function _() {
		if (Tt) {
			Tt = !1;
			return;
		}
		Ct || h();
	}
	let v = (0, a.lazy)(() => import("./Stage.js"));
	return /* @__PURE__ */ $(a.Suspense, {
		fallback: /* @__PURE__ */ $(yt, { children: "Loading" }),
		children: /* @__PURE__ */ $(v, {
			arg: e,
			next: h,
			prev: g,
			onClick: _
		})
	});
}
var Ct = !1, wt = (e) => Ct = e, Tt = !1;
function Et() {
	Tt = !0;
}
//#endregion
export { St as Main, gt as a, Je as c, u as d, f, vt as i, xt as initMain, m as l, l as m, $ as n, Q as o, Et as onLong, d as p, bt as r, ct as s, wt as setDesignMode, yt as t, p as u };

//# sourceMappingURL=Main.js.map