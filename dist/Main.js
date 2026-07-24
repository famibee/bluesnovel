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
}, l = ((e) => e ? c(e) : c);
//#endregion
//#region src/store/store.tsx
function u(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function d(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function f(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var p = l()((e) => ({
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
	addBtn: ({ layerNm: t, nm: n, text: r, label: i, call: a, fn: o }) => e((e) => {
		let { idx: s, aLay: c } = u(e, "fore"), l = f(c, t, "txt");
		if (l.aBtn.some((e) => e.nm === n)) throw `ボタン名 ${n} はレイヤ ${t} 内で既に使用されています`;
		return l.aBtn = [...l.aBtn, {
			nm: n,
			text: r,
			label: i,
			...a === void 0 ? {} : { call: a },
			...o === void 0 ? {} : { fn: o }
		}], d(e, s, c);
	}),
	chgPic: ({ nm: t, page: n, fn: r, aFace: i }) => e((e) => {
		let { idx: a, aLay: o } = u(e, n), s = f(o, t, "grp");
		return s.fn = r, s.aFace = i, d(e, a, o);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r }) => e((e) => {
		let { idx: i, aLay: a } = u(e, n), o = f(a, t, "txt");
		return o.b_alpha = r, d(e, i, a);
	}),
	chgStr: ({ nm: t, str: n }) => e((e) => {
		let { idx: r, aLay: i } = u(e, "fore");
		return f(i, t, "txt").str = n, d(e, r, i);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n }) => e((e) => {
		let r = 1 - e.foreIdx, i = e.aPage[e.foreIdx], a = d(e, r, e.aPage[r].map((e) => t && !t.includes(e.nm) ? structuredClone(i.find((t) => t.nm === e.nm) ?? e) : e));
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
})), m = function() {};
function h(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function g(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var _ = typeof window < "u", v = function(e) {
	(0, a.useEffect)(e, []);
}, y = _ ? window : null, b = function(e) {
	return !!e.addEventListener;
}, x = function(e) {
	return !!e.on;
}, S = function(e, t, n, r) {
	n === void 0 && (n = y), (0, a.useEffect)(function() {
		if (t && n) return b(n) ? h(n, e, t, r) : x(n) && n.on(e, t, r), function() {
			b(n) ? g(n, e, t, r) : x(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, C = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, ee = function(e, t, n, r) {
	t === void 0 && (t = m), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var i = n.event, o = i === void 0 ? "keydown" : i, s = n.target, c = n.options;
	S(o, (0, a.useMemo)(function() {
		var n = C(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), s, c);
}, w = { restoreOnUnmount: !1 };
function te(e, t) {
	t === void 0 && (t = w);
	var n = (0, a.useRef)(document.title);
	document.title !== e && (document.title = e), (0, a.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var T = typeof document < "u" ? te : function(e) {}, ne = /* @__PURE__ */ t(((e) => {
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
})), re = /* @__PURE__ */ t(((e) => {
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
				case w: return "SuspenseList";
				case ne: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case te: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
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
			if (f !== void 0) if (a) if (ie(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
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
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === T && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = n(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), w = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), ne = Symbol.for("react.activity"), re = Symbol.for("react.client.reference"), E = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = Object.prototype.hasOwnProperty, ie = Array.isArray, O = console.createTask ? console.createTask : function() {
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
})), E = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = ne() : t.exports = re();
})))());
function D(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function ie(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var O = /*#__PURE__*/ function() {
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
			var n = D(t);
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
}(), k = "-ms-", A = "-moz-", j = "-webkit-", M = "comm", N = "rule", ae = "decl", oe = "@import", se = "@keyframes", ce = "@layer", le = Math.abs, P = String.fromCharCode, ue = Object.assign;
function de(e, t) {
	return I(e, 0) ^ 45 ? (((t << 2 ^ I(e, 0)) << 2 ^ I(e, 1)) << 2 ^ I(e, 2)) << 2 ^ I(e, 3) : 0;
}
function fe(e) {
	return e.trim();
}
function pe(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function F(e, t, n) {
	return e.replace(t, n);
}
function me(e, t) {
	return e.indexOf(t);
}
function I(e, t) {
	return e.charCodeAt(t) | 0;
}
function L(e, t, n) {
	return e.slice(t, n);
}
function R(e) {
	return e.length;
}
function he(e) {
	return e.length;
}
function ge(e, t) {
	return t.push(e), e;
}
function _e(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var ve = 1, z = 1, ye = 0, B = 0, V = 0, H = "";
function U(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: ve,
		column: z,
		length: o,
		return: ""
	};
}
function W(e, t) {
	return ue(U("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function be() {
	return V;
}
function xe() {
	return V = B > 0 ? I(H, --B) : 0, z--, V === 10 && (z = 1, ve--), V;
}
function G() {
	return V = B < ye ? I(H, B++) : 0, z++, V === 10 && (z = 1, ve++), V;
}
function K() {
	return I(H, B);
}
function Se() {
	return B;
}
function q(e, t) {
	return L(H, e, t);
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
function Ce(e) {
	return ve = z = 1, ye = R(H = e), B = 0, [];
}
function we(e) {
	return H = "", e;
}
function Te(e) {
	return fe(q(B - 1, Oe(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ee(e) {
	for (; (V = K()) && V < 33;) G();
	return J(e) > 2 || J(V) > 3 ? "" : " ";
}
function De(e, t) {
	for (; --t && G() && !(V < 48 || V > 102 || V > 57 && V < 65 || V > 70 && V < 97););
	return q(e, Se() + (t < 6 && K() == 32 && G() == 32));
}
function Oe(e) {
	for (; G();) switch (V) {
		case e: return B;
		case 34:
		case 39:
			e !== 34 && e !== 39 && Oe(V);
			break;
		case 40:
			e === 41 && Oe(e);
			break;
		case 92:
			G();
			break;
	}
	return B;
}
function ke(e, t) {
	for (; G() && e + V !== 57 && !(e + V === 84 && K() === 47););
	return "/*" + q(t, B - 1) + "*" + P(e === 47 ? e : G());
}
function Ae(e) {
	for (; !J(K());) G();
	return q(e, B);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function je(e) {
	return we(Me("", null, null, null, [""], e = Ce(e), 0, [0], e));
}
function Me(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = G()) {
		case 40: if (m != 108 && I(C, d - 1) == 58) {
			me(C += F(Te(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += Te(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += Ee(m);
			break;
		case 92:
			C += De(Se() - 1, 7);
			continue;
		case 47:
			switch (K()) {
				case 42:
				case 47:
					ge(Pe(ke(G(), Se()), t, n), c);
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = R(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = F(C, /\f/g, "")), p > 0 && R(C) - d && ge(p > 32 ? Fe(C + ";", r, n, d - 1) : Fe(F(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (ge(S = Ne(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) if (u === 0) Me(C, t, S, S, b, a, d, s, x);
				else switch (f === 99 && I(C, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						Me(e, S, S, r && ge(Ne(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
						break;
					default: Me(C, S, S, S, [""], x, 0, s, x);
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + R(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && xe() == 125) continue;
			}
			switch (C += P(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (R(C) - 1) * _, _ = 1;
					break;
				case 64:
					K() === 45 && (C += Te(G())), f = K(), u = d = R(y = C += Ae(Se())), v++;
					break;
				case 45: m === 45 && R(C) == 2 && (h = 0);
			}
	}
	return a;
}
function Ne(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = he(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = L(e, d + 1, d = le(h = o[m])), y = e; _ < p; ++_) (y = fe(h > 0 ? f[_] + " " + v : F(v, /&\f/g, f[_]))) && (c[g++] = y);
	return U(e, t, n, i === 0 ? N : s, c, l, u);
}
function Pe(e, t, n) {
	return U(e, t, n, M, P(be()), L(e, 2, -2), 0);
}
function Fe(e, t, n, r) {
	return U(e, t, n, ae, L(e, 0, r), L(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Y(e, t) {
	for (var n = "", r = he(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Ie(e, t, n, r) {
	switch (e.type) {
		case ce: if (e.children.length) break;
		case oe:
		case ae: return e.return = e.return || e.value;
		case M: return "";
		case se: return e.return = e.value + "{" + Y(e.children, r) + "}";
		case N: e.value = e.props.join(",");
	}
	return R(n = Y(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Le(e) {
	var t = he(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Re(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function ze(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var Be = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = K(), r === 38 && i === 12 && (t[n] = 1), !J(i);) G();
	return q(e, B);
}, Ve = function(e, t) {
	var n = -1, r = 44;
	do
		switch (J(r)) {
			case 0:
				r === 38 && K() === 12 && (t[n] = 1), e[n] += Be(B - 1, t, n);
				break;
			case 2:
				e[n] += Te(r);
				break;
			case 4: if (r === 44) {
				e[++n] = K() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += P(r);
		}
	while (r = G());
	return e;
}, He = function(e, t) {
	return we(Ve(Ce(e), t));
}, Ue = /* #__PURE__ */ new WeakMap(), We = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !Ue.get(n)) && !r) {
			Ue.set(e, !0);
			for (var i = [], a = He(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Ge = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function Ke(e, t) {
	switch (de(e, t)) {
		case 5103: return j + "print-" + e + e;
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
		case 3829: return j + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return j + e + A + e + k + e + e;
		case 6828:
		case 4268: return j + e + k + e + e;
		case 6165: return j + e + k + "flex-" + e + e;
		case 5187: return j + e + F(e, /(\w+).+(:[^]+)/, j + "box-$1$2" + k + "flex-$1$2") + e;
		case 5443: return j + e + k + "flex-item-" + F(e, /flex-|-self/, "") + e;
		case 4675: return j + e + k + "flex-line-pack" + F(e, /align-content|flex-|-self/, "") + e;
		case 5548: return j + e + k + F(e, "shrink", "negative") + e;
		case 5292: return j + e + k + F(e, "basis", "preferred-size") + e;
		case 6060: return j + "box-" + F(e, "-grow", "") + j + e + k + F(e, "grow", "positive") + e;
		case 4554: return j + F(e, /([^-])(transform)/g, "$1" + j + "$2") + e;
		case 6187: return F(F(F(e, /(zoom-|grab)/, j + "$1"), /(image-set)/, j + "$1"), e, "") + e;
		case 5495:
		case 3959: return F(e, /(image-set\([^]*)/, j + "$1$`$1");
		case 4968: return F(F(e, /(.+:)(flex-)?(.*)/, j + "box-pack:$3" + k + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + j + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return F(e, /(.+)-inline(.+)/, j + "$1$2") + e;
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
			if (R(e) - 1 - t > 6) switch (I(e, t + 1)) {
				case 109: if (I(e, t + 4) !== 45) break;
				case 102: return F(e, /(.+:)(.+)-([^]+)/, "$1" + j + "$2-$3$1" + A + (I(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~me(e, "stretch") ? Ke(F(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (I(e, t + 1) !== 115) break;
		case 6444:
			switch (I(e, R(e) - 3 - (~me(e, "!important") && 10))) {
				case 107: return F(e, ":", ":" + j) + e;
				case 101: return F(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + j + (I(e, 14) === 45 ? "inline-" : "") + "box$3$1" + j + "$2$3$1" + k + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (I(e, t + 11)) {
				case 114: return j + e + k + F(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return j + e + k + F(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return j + e + k + F(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return j + e + k + e + e;
	}
	return e;
}
var qe = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case ae:
			e.return = Ke(e.value, e.length);
			break;
		case se: return Y([W(e, { value: F(e.value, "@", "@" + j) })], r);
		case N: if (e.length) return _e(e.props, function(t) {
			switch (pe(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return Y([W(e, { props: [F(t, /:(read-\w+)/, ":" + A + "$1")] })], r);
				case "::placeholder": return Y([
					W(e, { props: [F(t, /:(plac\w+)/, ":" + j + "input-$1")] }),
					W(e, { props: [F(t, /:(plac\w+)/, ":" + A + "$1")] }),
					W(e, { props: [F(t, /:(plac\w+)/, k + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], Je = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || qe, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [We, Ge], l, u = [Ie, Re(function(e) {
		l.insert(e);
	})], d = Le(c.concat(r, u)), f = function(e) {
		return Y(je(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new O({
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
}, Ye = /* @__PURE__ */ t(((e) => {
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
})), Xe = /* @__PURE__ */ t(((e) => {
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
		var S = l, C = u, ee = c, w = s, te = n, T = d, ne = i, re = h, E = m, D = r, ie = o, O = a, k = f, A = !1;
		function j(e) {
			return A || (A = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), M(e) || x(e) === l;
		}
		function M(e) {
			return x(e) === u;
		}
		function N(e) {
			return x(e) === c;
		}
		function ae(e) {
			return x(e) === s;
		}
		function oe(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function se(e) {
			return x(e) === d;
		}
		function ce(e) {
			return x(e) === i;
		}
		function le(e) {
			return x(e) === h;
		}
		function P(e) {
			return x(e) === m;
		}
		function ue(e) {
			return x(e) === r;
		}
		function de(e) {
			return x(e) === o;
		}
		function fe(e) {
			return x(e) === a;
		}
		function pe(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = ee, e.ContextProvider = w, e.Element = te, e.ForwardRef = T, e.Fragment = ne, e.Lazy = re, e.Memo = E, e.Portal = D, e.Profiler = ie, e.StrictMode = O, e.Suspense = k, e.isAsyncMode = j, e.isConcurrentMode = M, e.isContextConsumer = N, e.isContextProvider = ae, e.isElement = oe, e.isForwardRef = se, e.isFragment = ce, e.isLazy = le, e.isMemo = P, e.isPortal = ue, e.isProfiler = de, e.isStrictMode = fe, e.isSuspense = pe, e.isValidElementType = b, e.typeOf = x;
	})();
})), Ze = /* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Ye() : t.exports = Xe();
})), Qe = /* @__PURE__ */ t(((e, t) => {
	var n = Ze(), r = {
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
function $e(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var et = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, tt = function(e, t, n) {
	et(e, t, n);
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
function nt(e) {
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
var rt = {
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
}, it = /[A-Z]|^ms/g, at = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ot = function(e) {
	return e.charCodeAt(1) === 45;
}, st = function(e) {
	return e != null && typeof e != "boolean";
}, ct = /* #__PURE__ */ ze(function(e) {
	return ot(e) ? e : e.replace(it, "-$&").toLowerCase();
}), lt = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(at, function(e, t, n) {
			return Z = {
				name: t,
				styles: n,
				next: Z
			}, t;
		});
	}
	return rt[e] !== 1 && !ot(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
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
			return ut(e, t, n);
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
function ut(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += X(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : st(s) && (r += ct(a) + ":" + lt(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) st(o[c]) && (r += ct(a) + ":" + lt(a, o[c]) + ";");
		else {
			var l = X(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += ct(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var dt = /label:\s*([^\s;{]+)\s*(;|$)/g, Z;
function ft(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	Z = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += X(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += X(n, t, e[o]), r && (i += a[o]);
	dt.lastIndex = 0;
	for (var s = "", c; (c = dt.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: nt(i) + s,
		styles: i,
		next: Z
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var pt = function(e) {
	return e();
}, mt = a.useInsertionEffect ? a.useInsertionEffect : !1, ht = mt || pt;
mt || a.useLayoutEffect;
var gt = /* #__PURE__ */ a.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ Je({ key: "css" }) : null);
gt.Provider;
var _t = function(e) {
	return /*#__PURE__*/ (0, a.forwardRef)(function(t, n) {
		return e(t, (0, a.useContext)(gt), n);
	});
}, vt = /* #__PURE__ */ a.createContext({}), Q = {}.hasOwnProperty, yt = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", bt = function(e, t) {
	var n = {};
	for (var r in t) Q.call(t, r) && (n[r] = t[r]);
	return n[yt] = e, n;
}, xt = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return et(t, n, r), ht(function() {
		return tt(t, n, r);
	}), null;
}, St = /* @__PURE__ */ _t(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[yt], o = [r], s = "";
	typeof e.className == "string" ? s = $e(t.registered, o, e.className) : e.className != null && (s = e.className + " ");
	var c = ft(o, void 0, a.useContext(vt));
	s += t.key + "-" + c.name;
	var l = {};
	for (var u in e) Q.call(e, u) && u !== "css" && u !== yt && (l[u] = e[u]);
	return l.className = s, n && (l.ref = n), /*#__PURE__*/ a.createElement(a.Fragment, null, /*#__PURE__*/ a.createElement(xt, {
		cache: t,
		serialized: c,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ a.createElement(i, l));
});
Qe();
var Ct = E.Fragment, $ = function(e, t, n) {
	return Q.call(t, "css") ? E.jsx(St, bt(e, t), n) : E.jsx(e, t, n);
}, wt = function(e, t, n) {
	return Q.call(t, "css") ? E.jsxs(St, bt(e, t), n) : E.jsxs(e, t, n);
}, Tt = (0, a.lazy)(() => import("./Stage.js"));
function Et(e, t, n) {
	e.render(/* @__PURE__ */ $(Dt, {
		arg: t,
		inited: n
	}));
}
function Dt({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: i } = e, o = p((e) => e.title), s = p((e) => e.addTitle);
	T(o);
	let c = p((e) => e.addLayer), l = p((e) => e.chgPic), u = p((e) => e.chgBAlpha), d = p((e) => e.chgStr), f = p((e) => e.addBtn), m = p((e) => e.setReadBack), h = p((e) => e.isTyping), g = p((e) => e.requestSkip), _ = p((e) => e.setWait), y = p((e) => e.setSkipping), b = p((e) => e.startTrans), x = p((e) => e.finishTrans);
	function S() {
		i.go();
	}
	v(() => {
		s(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return i.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: c,
			chgPic: l,
			chgBAlpha: u,
			chgStr: d,
			addBtn: f,
			addTitle: s,
			setWait: _,
			requestSkip: g,
			setSkipping: y,
			startTrans: b,
			finishTrans: x
		}, e), t(), n.addEventListener("ev_next", S), () => n.removeEventListener("ev_next", S);
	});
	function C() {
		if (h) {
			g();
			return;
		}
		if (r.caretaker.nextKey()) {
			m(!r.caretaker.isLast());
			return;
		}
		m(!1), S();
	}
	function w() {
		r.caretaker.prevKey() && m(!r.caretaker.isLast());
	}
	ee(() => !0, (e) => {
		if (i.cancelAuto(), i.fireEvent(e.key.toLowerCase())) {
			e.stopPropagation(), e.preventDefault();
			return;
		}
		switch (e.code) {
			case "Space":
			case "ArrowDown":
			case "PageDown":
				e.stopPropagation(), e.preventDefault(), C();
				break;
			case "PageUp":
				e.stopPropagation(), e.preventDefault(), w();
				break;
		}
	});
	function te() {
		if (At) {
			At = !1;
			return;
		}
		Ot || (i.cancelAuto(), !i.fireEvent("click") && C());
	}
	return /* @__PURE__ */ $(a.Suspense, {
		fallback: /* @__PURE__ */ $(Ct, { children: "Loading" }),
		children: /* @__PURE__ */ $(Tt, {
			arg: e,
			next: C,
			prev: w,
			onClick: te
		})
	});
}
var Ot = !1, kt = (e) => Ot = e, At = !1;
function jt() {
	At = !0;
}
//#endregion
export { Dt as Main, bt as a, Qe as c, m as d, g as f, St as i, Et as initMain, v as l, p as m, $ as n, Q as o, jt as onLong, h as p, wt as r, ft as s, kt as setDesignMode, Ct as t, _ as u };

//# sourceMappingURL=Main.js.map