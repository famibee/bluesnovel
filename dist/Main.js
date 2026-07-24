import { n as e, t } from "./rolldown-runtime.js";
import { t as n } from "./react.js";
//#region src/components/Lay.ts
var r = [
	"visible",
	"alpha",
	"left",
	"top",
	"rotation",
	"scale_x",
	"scale_y",
	"pivot_x",
	"pivot_y",
	"blendmode"
];
function i(e) {
	let t = {};
	return e.left !== void 0 && (t.left = `${String(e.left)}px`), e.top !== void 0 && (t.top = `${String(e.top)}px`), e.alpha !== void 0 && (t.opacity = e.alpha), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0) && (t.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, t.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (t.mixBlendMode = e.blendmode), e.visible === !1 && (t.display = "none"), t;
}
var a = !1, o = () => {
	a = !0;
}, s = () => {
	a = !1;
}, c = () => a, l = (e) => {
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
}, u = ((e) => e ? l(e) : l), d = /* @__PURE__ */ e(n(), 1), f = (e) => e;
function p(e, t = f) {
	let n = d.useSyncExternalStore(e.subscribe, d.useCallback(() => t(e.getState()), [e, t]), d.useCallback(() => t(e.getInitialState()), [e, t]));
	return d.useDebugValue(n), n;
}
var m = (e) => {
	let t = u(e), n = (e) => p(t, e);
	return Object.assign(n, t), n;
}, h = ((e) => e ? m(e) : m);
//#endregion
//#region src/store/store.tsx
function g(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function _(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function v(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var y = h()((e, t) => ({
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
		let { idx: c, aLay: l } = g(e, n), u = v(l, t, "txt");
		if (u.aBtn.some((e) => e.nm === r)) throw `ボタン名 ${r} はレイヤ ${t} 内で既に使用されています`;
		return u.aBtn = [...u.aBtn, {
			nm: r,
			text: i,
			label: a,
			...o === void 0 ? {} : { call: o },
			...s === void 0 ? {} : { fn: s }
		}], _(e, c, l);
	}),
	chgPic: ({ nm: t, page: n, fn: r, aFace: i }) => e((e) => {
		let { idx: a, aLay: o } = g(e, n), s = v(o, t, "grp");
		return s.fn = r, s.aFace = i, _(e, a, o);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r }) => e((e) => {
		let { idx: i, aLay: a } = g(e, n), o = v(a, t, "txt");
		return o.b_alpha = r, _(e, i, a);
	}),
	chgLay: ({ nm: t, page: n, sty: r }) => e((e) => {
		let { idx: i, aLay: a } = g(e, n), o = a.find((e) => e.nm === t);
		if (!o) throw `存在しないレイヤ ${t} です`;
		if (o.cls !== "txt" && (r.b_color !== void 0 || r.style !== void 0)) throw `${t} は文字レイヤではありません（b_color/styleは文字レイヤ専用）`;
		return Object.assign(o, r), _(e, i, a);
	}),
	getLaySty: (e, n) => {
		let i = t(), a = i.aPage[n === "fore" ? i.foreIdx : 1 - i.foreIdx].find((t) => t.nm === e);
		if (!a) throw `存在しないレイヤ ${e} です`;
		let o = {};
		for (let e of r) a[e] !== void 0 && Object.assign(o, { [e]: a[e] });
		return o;
	},
	getPages: () => {
		let e = t();
		return {
			fore: e.aPage[e.foreIdx],
			back: e.aPage[1 - e.foreIdx]
		};
	},
	enableEvent: ({ nm: t, enabled: n }) => e((e) => ({ aPage: e.aPage.map((e) => {
		let r = [...e];
		return v(r, t, "txt").enabled = n, r;
	}) })),
	clearLay: ({ aLayNm: t, page: n }) => e((e) => {
		let i = (e) => {
			for (let t of r) t !== "visible" && delete e[t];
			e.cls === "grp" ? (e.fn = "", e.aFace = []) : (e.str = "", e.aBtn = [], delete e.b_color, delete e.style, e.b_alpha = 1);
		}, a = (e) => {
			if (!t) {
				e.forEach(i);
				return;
			}
			for (let n of t) {
				let t = e.find((e) => e.nm === n);
				if (!t) throw `存在しないレイヤ ${n} です`;
				i(t);
			}
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return a(t), t;
		}) };
		let { idx: o, aLay: s } = g(e, n);
		return a(s), _(e, o, s);
	}),
	moveLay: ({ nm: t, mode: n, index: r, dive: i }) => e((e) => {
		let a = e.aPage[0], o = a.findIndex((e) => e.nm === t);
		if (o < 0) throw `存在しないレイヤ ${t} です`;
		let s;
		switch (n) {
			case "float":
				s = a.length - 1;
				break;
			case "index":
				s = Math.min(Math.max(0, r ?? 0), a.length - 1);
				break;
			case "dive": {
				if (t === i) throw `[lay] 属性 layerとdiveが同じ【${String(i)}】です`;
				let e = a.findIndex((e) => e.nm === i);
				if (e < 0) throw `[lay] 属性 dive【${String(i)}】が不正です。レイヤーがありません`;
				s = e > o ? e - 1 : e;
				break;
			}
		}
		return s === o ? {} : { aPage: e.aPage.map((e) => {
			let t = [...e];
			return t.splice(s, 0, ...t.splice(o, 1)), t;
		}) };
	}),
	chgStr: ({ nm: t, page: n, str: r }) => e((e) => {
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let n = [...e];
			return v(n, t, "txt").str = r, n;
		}) };
		let { idx: i, aLay: a } = g(e, n);
		return v(a, t, "txt").str = r, _(e, i, a);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n }) => e((e) => {
		let r = 1 - e.foreIdx, i = e.aPage[e.foreIdx], a = _(e, r, e.aPage[r].map((e) => t && !t.includes(e.nm) ? structuredClone(i.find((t) => t.nm === e.nm) ?? e) : e));
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
	fullScr: !1,
	setFullScr: (t) => e(() => ({ fullScr: t })),
	toggleFullScr: () => e((e) => ({ fullScr: !e.fullScr })),
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
})), b = function() {};
function x(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function S(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var C = typeof window < "u", ee = function(e) {
	(0, d.useEffect)(e, []);
}, te = C ? window : null, w = function(e) {
	return !!e.addEventListener;
}, T = function(e) {
	return !!e.on;
}, ne = function(e, t, n, r) {
	n === void 0 && (n = te), (0, d.useEffect)(function() {
		if (t && n) return w(n) ? x(n, e, t, r) : T(n) && n.on(e, t, r), function() {
			w(n) ? S(n, e, t, r) : T(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, E = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, D = function(e, t, n, r) {
	t === void 0 && (t = b), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var i = n.event, a = i === void 0 ? "keydown" : i, o = n.target, s = n.options;
	ne(a, (0, d.useMemo)(function() {
		var n = E(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), o, s);
}, O = { restoreOnUnmount: !1 };
function k(e, t) {
	t === void 0 && (t = O);
	var n = (0, d.useRef)(document.title);
	document.title !== e && (document.title = e), (0, d.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var A = typeof document < "u" ? k : function(e) {}, j = /* @__PURE__ */ t(((e) => {
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
})), M = /* @__PURE__ */ t(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === E ? null : e.displayName || e.name || null;
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
			var e = D.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (O.call(e, "key")) {
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
			if (f !== void 0) if (a) if (k(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (O.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", ie[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), ie[f + a] = !0);
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
		var h = n(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), ne = Symbol.for("react.activity"), E = Symbol.for("react.client.reference"), D = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = Object.prototype.hasOwnProperty, k = Array.isArray, A = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var j, M = {}, N = h.react_stack_bottom_frame.bind(h, s)(), re = A(a(s)), ie = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > D.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : N, r ? A(a(e)) : re);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > D.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : N, r ? A(a(e)) : re);
		};
	})();
})), N = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = j() : t.exports = M();
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
var ae = /*#__PURE__*/ function() {
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
}(), P = "-ms-", F = "-moz-", I = "-webkit-", oe = "comm", se = "rule", ce = "decl", le = "@import", ue = "@keyframes", de = "@layer", fe = Math.abs, pe = String.fromCharCode, me = Object.assign;
function he(e, t) {
	return R(e, 0) ^ 45 ? (((t << 2 ^ R(e, 0)) << 2 ^ R(e, 1)) << 2 ^ R(e, 2)) << 2 ^ R(e, 3) : 0;
}
function ge(e) {
	return e.trim();
}
function _e(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function L(e, t, n) {
	return e.replace(t, n);
}
function ve(e, t) {
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
function ye(e) {
	return e.length;
}
function be(e, t) {
	return t.push(e), e;
}
function xe(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var Se = 1, V = 1, Ce = 0, H = 0, U = 0, W = "";
function we(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: Se,
		column: V,
		length: o,
		return: ""
	};
}
function G(e, t) {
	return me(we("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Te() {
	return U;
}
function Ee() {
	return U = H > 0 ? R(W, --H) : 0, V--, U === 10 && (V = 1, Se--), U;
}
function K() {
	return U = H < Ce ? R(W, H++) : 0, V++, U === 10 && (V = 1, Se++), U;
}
function q() {
	return R(W, H);
}
function De() {
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
function Oe(e) {
	return Se = V = 1, Ce = B(W = e), H = 0, [];
}
function ke(e) {
	return W = "", e;
}
function Ae(e) {
	return ge(J(H - 1, Ne(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function je(e) {
	for (; (U = q()) && U < 33;) K();
	return Y(e) > 2 || Y(U) > 3 ? "" : " ";
}
function Me(e, t) {
	for (; --t && K() && !(U < 48 || U > 102 || U > 57 && U < 65 || U > 70 && U < 97););
	return J(e, De() + (t < 6 && q() == 32 && K() == 32));
}
function Ne(e) {
	for (; K();) switch (U) {
		case e: return H;
		case 34:
		case 39:
			e !== 34 && e !== 39 && Ne(U);
			break;
		case 40:
			e === 41 && Ne(e);
			break;
		case 92:
			K();
			break;
	}
	return H;
}
function Pe(e, t) {
	for (; K() && e + U !== 57 && !(e + U === 84 && q() === 47););
	return "/*" + J(t, H - 1) + "*" + pe(e === 47 ? e : K());
}
function Fe(e) {
	for (; !Y(q());) K();
	return J(e, H);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function Ie(e) {
	return ke(Le("", null, null, null, [""], e = Oe(e), 0, [0], e));
}
function Le(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = K()) {
		case 40: if (m != 108 && R(C, d - 1) == 58) {
			ve(C += L(Ae(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += Ae(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += je(m);
			break;
		case 92:
			C += Me(De() - 1, 7);
			continue;
		case 47:
			switch (q()) {
				case 42:
				case 47:
					be(ze(Pe(K(), De()), t, n), c);
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
					_ == -1 && (C = L(C, /\f/g, "")), p > 0 && B(C) - d && be(p > 32 ? Be(C + ";", r, n, d - 1) : Be(L(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (be(S = Re(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) if (u === 0) Le(C, t, S, S, b, a, d, s, x);
				else switch (f === 99 && R(C, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						Le(e, S, S, r && be(Re(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
						break;
					default: Le(C, S, S, S, [""], x, 0, s, x);
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + B(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && Ee() == 125) continue;
			}
			switch (C += pe(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (B(C) - 1) * _, _ = 1;
					break;
				case 64:
					q() === 45 && (C += Ae(K())), f = q(), u = d = B(y = C += Fe(De())), v++;
					break;
				case 45: m === 45 && B(C) == 2 && (h = 0);
			}
	}
	return a;
}
function Re(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = ye(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = z(e, d + 1, d = fe(h = o[m])), y = e; _ < p; ++_) (y = ge(h > 0 ? f[_] + " " + v : L(v, /&\f/g, f[_]))) && (c[g++] = y);
	return we(e, t, n, i === 0 ? se : s, c, l, u);
}
function ze(e, t, n) {
	return we(e, t, n, oe, pe(Te()), z(e, 2, -2), 0);
}
function Be(e, t, n, r) {
	return we(e, t, n, ce, z(e, 0, r), z(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function X(e, t) {
	for (var n = "", r = ye(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Ve(e, t, n, r) {
	switch (e.type) {
		case de: if (e.children.length) break;
		case le:
		case ce: return e.return = e.return || e.value;
		case oe: return "";
		case ue: return e.return = e.value + "{" + X(e.children, r) + "}";
		case se: e.value = e.props.join(",");
	}
	return B(n = X(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function He(e) {
	var t = ye(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Ue(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function We(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var Ge = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = q(), r === 38 && i === 12 && (t[n] = 1), !Y(i);) K();
	return J(e, H);
}, Ke = function(e, t) {
	var n = -1, r = 44;
	do
		switch (Y(r)) {
			case 0:
				r === 38 && q() === 12 && (t[n] = 1), e[n] += Ge(H - 1, t, n);
				break;
			case 2:
				e[n] += Ae(r);
				break;
			case 4: if (r === 44) {
				e[++n] = q() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += pe(r);
		}
	while (r = K());
	return e;
}, qe = function(e, t) {
	return ke(Ke(Oe(e), t));
}, Je = /* #__PURE__ */ new WeakMap(), Ye = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !Je.get(n)) && !r) {
			Je.set(e, !0);
			for (var i = [], a = qe(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Xe = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function Ze(e, t) {
	switch (he(e, t)) {
		case 5103: return I + "print-" + e + e;
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
		case 3829: return I + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return I + e + F + e + P + e + e;
		case 6828:
		case 4268: return I + e + P + e + e;
		case 6165: return I + e + P + "flex-" + e + e;
		case 5187: return I + e + L(e, /(\w+).+(:[^]+)/, I + "box-$1$2" + P + "flex-$1$2") + e;
		case 5443: return I + e + P + "flex-item-" + L(e, /flex-|-self/, "") + e;
		case 4675: return I + e + P + "flex-line-pack" + L(e, /align-content|flex-|-self/, "") + e;
		case 5548: return I + e + P + L(e, "shrink", "negative") + e;
		case 5292: return I + e + P + L(e, "basis", "preferred-size") + e;
		case 6060: return I + "box-" + L(e, "-grow", "") + I + e + P + L(e, "grow", "positive") + e;
		case 4554: return I + L(e, /([^-])(transform)/g, "$1" + I + "$2") + e;
		case 6187: return L(L(L(e, /(zoom-|grab)/, I + "$1"), /(image-set)/, I + "$1"), e, "") + e;
		case 5495:
		case 3959: return L(e, /(image-set\([^]*)/, I + "$1$`$1");
		case 4968: return L(L(e, /(.+:)(flex-)?(.*)/, I + "box-pack:$3" + P + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + I + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return L(e, /(.+)-inline(.+)/, I + "$1$2") + e;
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
				case 102: return L(e, /(.+:)(.+)-([^]+)/, "$1" + I + "$2-$3$1" + F + (R(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~ve(e, "stretch") ? Ze(L(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (R(e, t + 1) !== 115) break;
		case 6444:
			switch (R(e, B(e) - 3 - (~ve(e, "!important") && 10))) {
				case 107: return L(e, ":", ":" + I) + e;
				case 101: return L(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + I + (R(e, 14) === 45 ? "inline-" : "") + "box$3$1" + I + "$2$3$1" + P + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (R(e, t + 11)) {
				case 114: return I + e + P + L(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return I + e + P + L(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return I + e + P + L(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return I + e + P + e + e;
	}
	return e;
}
var Qe = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case ce:
			e.return = Ze(e.value, e.length);
			break;
		case ue: return X([G(e, { value: L(e.value, "@", "@" + I) })], r);
		case se: if (e.length) return xe(e.props, function(t) {
			switch (_e(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return X([G(e, { props: [L(t, /:(read-\w+)/, ":" + F + "$1")] })], r);
				case "::placeholder": return X([
					G(e, { props: [L(t, /:(plac\w+)/, ":" + I + "input-$1")] }),
					G(e, { props: [L(t, /:(plac\w+)/, ":" + F + "$1")] }),
					G(e, { props: [L(t, /:(plac\w+)/, P + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], $e = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || Qe, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [Ye, Xe], l, u = [Ve, Ue(function(e) {
		l.insert(e);
	})], d = He(c.concat(r, u)), f = function(e) {
		return X(Ie(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new ae({
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
}, et = /* @__PURE__ */ t(((e) => {
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
})), tt = /* @__PURE__ */ t(((e) => {
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
		var S = l, C = u, ee = c, te = s, w = n, T = d, ne = i, E = h, D = m, O = r, k = o, A = a, j = f, M = !1;
		function N(e) {
			return M || (M = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), re(e) || x(e) === l;
		}
		function re(e) {
			return x(e) === u;
		}
		function ie(e) {
			return x(e) === c;
		}
		function ae(e) {
			return x(e) === s;
		}
		function P(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function F(e) {
			return x(e) === d;
		}
		function I(e) {
			return x(e) === i;
		}
		function oe(e) {
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
		function de(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = ee, e.ContextProvider = te, e.Element = w, e.ForwardRef = T, e.Fragment = ne, e.Lazy = E, e.Memo = D, e.Portal = O, e.Profiler = k, e.StrictMode = A, e.Suspense = j, e.isAsyncMode = N, e.isConcurrentMode = re, e.isContextConsumer = ie, e.isContextProvider = ae, e.isElement = P, e.isForwardRef = F, e.isFragment = I, e.isLazy = oe, e.isMemo = se, e.isPortal = ce, e.isProfiler = le, e.isStrictMode = ue, e.isSuspense = de, e.isValidElementType = b, e.typeOf = x;
	})();
})), nt = /* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = et() : t.exports = tt();
})), rt = /* @__PURE__ */ t(((e, t) => {
	var n = nt(), r = {
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
function it(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var at = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, ot = function(e, t, n) {
	at(e, t, n);
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
function st(e) {
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
var ct = {
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
}, lt = /[A-Z]|^ms/g, ut = /_EMO_([^_]+?)_([^]*?)_EMO_/g, dt = function(e) {
	return e.charCodeAt(1) === 45;
}, ft = function(e) {
	return e != null && typeof e != "boolean";
}, pt = /* #__PURE__ */ We(function(e) {
	return dt(e) ? e : e.replace(lt, "-$&").toLowerCase();
}), mt = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(ut, function(e, t, n) {
			return Q = {
				name: t,
				styles: n,
				next: Q
			}, t;
		});
	}
	return ct[e] !== 1 && !dt(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
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
			return ht(e, t, n);
		case "function":
			if (e !== void 0) {
				var s = Q, c = n(e);
				return Q = s, Z(e, t, c);
			}
			break;
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function ht(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += Z(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : ft(s) && (r += pt(a) + ":" + mt(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) ft(o[c]) && (r += pt(a) + ":" + mt(a, o[c]) + ";");
		else {
			var l = Z(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += pt(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var gt = /label:\s*([^\s;{]+)\s*(;|$)/g, Q;
function _t(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	Q = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += Z(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += Z(n, t, e[o]), r && (i += a[o]);
	gt.lastIndex = 0;
	for (var s = "", c; (c = gt.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: st(i) + s,
		styles: i,
		next: Q
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var vt = function(e) {
	return e();
}, yt = d.useInsertionEffect ? d.useInsertionEffect : !1, bt = yt || vt;
yt || d.useLayoutEffect;
var xt = /* #__PURE__ */ d.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ $e({ key: "css" }) : null);
xt.Provider;
var St = function(e) {
	return /*#__PURE__*/ (0, d.forwardRef)(function(t, n) {
		return e(t, (0, d.useContext)(xt), n);
	});
}, Ct = /* #__PURE__ */ d.createContext({}), $ = {}.hasOwnProperty, wt = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Tt = function(e, t) {
	var n = {};
	for (var r in t) $.call(t, r) && (n[r] = t[r]);
	return n[wt] = e, n;
}, Et = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return at(t, n, r), bt(function() {
		return ot(t, n, r);
	}), null;
}, Dt = /* @__PURE__ */ St(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[wt], a = [r], o = "";
	typeof e.className == "string" ? o = it(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = _t(a, void 0, d.useContext(Ct));
	o += t.key + "-" + s.name;
	var c = {};
	for (var l in e) $.call(e, l) && l !== "css" && l !== wt && (c[l] = e[l]);
	return c.className = o, n && (c.ref = n), /*#__PURE__*/ d.createElement(d.Fragment, null, /*#__PURE__*/ d.createElement(Et, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ d.createElement(i, c));
});
rt();
var Ot = N.Fragment, kt = function(e, t, n) {
	return $.call(t, "css") ? N.jsx(Dt, Tt(e, t), n) : N.jsx(e, t, n);
}, At = function(e, t, n) {
	return $.call(t, "css") ? N.jsxs(Dt, Tt(e, t), n) : N.jsxs(e, t, n);
}, jt = (0, d.lazy)(() => import("./Stage.js"));
function Mt(e, t, n) {
	e.render(/* @__PURE__ */ kt(Nt, {
		arg: t,
		inited: n
	}));
}
function Nt({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: i } = e, a = y((e) => e.title), o = y((e) => e.addTitle);
	A(a);
	let s = y((e) => e.addLayer), c = y((e) => e.chgPic), l = y((e) => e.chgBAlpha), u = y((e) => e.chgStr), f = y((e) => e.chgLay), p = y((e) => e.getLaySty), m = y((e) => e.getPages), h = y((e) => e.toggleFullScr), g = y((e) => e.clearLay), _ = y((e) => e.moveLay), v = y((e) => e.enableEvent), b = y((e) => e.addBtn), x = y((e) => e.setReadBack), S = y((e) => e.isTyping), C = y((e) => e.requestSkip), te = y((e) => e.setWait), w = y((e) => e.setSkipping), T = y((e) => e.startTrans), ne = y((e) => e.finishTrans);
	function E() {
		i.go();
	}
	ee(() => {
		o(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return i.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: s,
			chgPic: c,
			chgBAlpha: l,
			chgStr: u,
			chgLay: f,
			getLaySty: p,
			getPages: m,
			clearLay: g,
			moveLay: _,
			enableEvent: v,
			addBtn: b,
			addTitle: o,
			toggleFullScr: h,
			setWait: te,
			requestSkip: C,
			setSkipping: w,
			startTrans: T,
			finishTrans: ne
		}, e), t(), n.addEventListener("ev_next", E), () => n.removeEventListener("ev_next", E);
	});
	function O() {
		if (S) {
			C();
			return;
		}
		if (r.caretaker.nextKey()) {
			x(!r.caretaker.isLast());
			return;
		}
		x(!1), E();
	}
	function k() {
		r.caretaker.prevKey() && x(!r.caretaker.isLast());
	}
	D(() => !0, (e) => {
		i.cancelAuto();
		let t = Pt(e);
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
				e.stopPropagation(), e.preventDefault(), O();
				break;
			case "PageUp":
				e.stopPropagation(), e.preventDefault(), k();
				break;
		}
	});
	function j() {
		if (Lt) {
			Lt = !1;
			return;
		}
		Ft || (i.cancelAuto(), !i.fireEvent("click") && O());
	}
	return /* @__PURE__ */ kt(d.Suspense, {
		fallback: /* @__PURE__ */ kt(Ot, { children: "Loading" }),
		children: /* @__PURE__ */ kt(jt, {
			arg: e,
			next: O,
			prev: k,
			onClick: j
		})
	});
}
function Pt(e) {
	return (e.altKey && e.key !== "Alt" ? "alt+" : "") + (e.ctrlKey && e.key !== "Control" ? "ctrl+" : "") + (e.metaKey && e.key !== "Meta" ? "meta+" : "") + (e.shiftKey && e.key !== "Shift" ? "shift+" : "") + e.key.toLowerCase();
}
var Ft = !1, It = (e) => Ft = e, Lt = !1;
function Rt() {
	Lt = !0;
}
//#endregion
export { Nt as Main, o as _, Tt as a, rt as c, b as d, S as f, c as g, s as h, Dt as i, Mt as initMain, ee as l, y as m, kt as n, $ as o, Rt as onLong, x as p, At as r, _t as s, It as setDesignMode, Ot as t, C as u, i as v };

//# sourceMappingURL=Main.js.map