import { n as e, t } from "./rolldown-runtime.js";
import { t as n } from "./react.js";
import { n as r } from "./Filter.js";
//#region src/components/Lay.ts
var i = [
	"visible",
	"alpha",
	"left",
	"top",
	"rotation",
	"scale_x",
	"scale_y",
	"pivot_x",
	"pivot_y",
	"blendmode",
	"aFlt"
];
function a(e) {
	let t = {};
	if (e.left !== void 0 && (t.left = `${String(e.left)}px`), e.top !== void 0 && (t.top = `${String(e.top)}px`), e.alpha !== void 0 && (t.opacity = e.alpha), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0) && (t.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, t.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (t.mixBlendMode = e.blendmode), e.aFlt !== void 0) {
		let n = r(e.aFlt);
		n && (t.filter = n);
	}
	return e.visible === !1 && (t.display = "none"), t;
}
var o = !1, s = () => {
	o = !0;
}, c = () => {
	o = !1;
}, l = () => o, u = (e) => {
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
}, d = ((e) => e ? u(e) : u), f = /* @__PURE__ */ e(n(), 1), p = (e) => e;
function m(e, t = p) {
	let n = f.useSyncExternalStore(e.subscribe, f.useCallback(() => t(e.getState()), [e, t]), f.useCallback(() => t(e.getInitialState()), [e, t]));
	return f.useDebugValue(n), n;
}
var h = (e) => {
	let t = d(e), n = (e) => m(t, e);
	return Object.assign(n, t), n;
}, g = ((e) => e ? h(e) : h);
//#endregion
//#region src/store/store.tsx
function _(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function v(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function y(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var b = g()((e, t) => ({
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
	addBtn: ({ layerNm: t, page: n, nm: r, text: i, label: a, call: o, fn: s, sty: c }) => e((e) => {
		let { idx: l, aLay: u } = _(e, n), d = y(u, t, "txt");
		if (r === void 0) r = `${a || s || "btn"}#${String(d.aBtn.length)}`;
		else if (d.aBtn.some((e) => e.nm === r)) throw `ボタン名 ${r} はレイヤ ${t} 内で既に使用されています`;
		return d.aBtn = [...d.aBtn, {
			nm: r,
			text: i,
			label: a,
			...o === void 0 ? {} : { call: o },
			...s === void 0 ? {} : { fn: s },
			...c === void 0 ? {} : { sty: c }
		}], v(e, l, u);
	}),
	chgPic: ({ nm: t, page: n, fn: r, src: i, aFace: a }) => e((e) => {
		let { idx: o, aLay: s } = _(e, n), c = y(s, t, "grp");
		return c.fn = r, c.src = i, c.aFace = a, v(e, o, s);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r, isFixed: i }) => e((e) => {
		let { idx: a, aLay: o } = _(e, n), s = y(o, t, "txt");
		return r !== void 0 && (s.b_alpha = r), i !== void 0 && (s.b_alpha_isfixed = i), v(e, a, o);
	}),
	chgBPic: ({ nm: t, page: n, fn: r, src: i }) => e((e) => {
		let { idx: a, aLay: o } = _(e, n), s = y(o, t, "txt");
		return s.b_pic = r, s.b_src = i, v(e, a, o);
	}),
	chgLay: ({ nm: t, page: n, sty: r }) => e((e) => {
		let { idx: i, aLay: a } = _(e, n), o = a.find((e) => e.nm === t);
		if (!o) throw `存在しないレイヤ ${t} です`;
		if (o.cls !== "txt" && (r.b_color !== void 0 || r.style !== void 0 || r.ffs !== void 0 || r.noffs !== void 0 || r.bura !== void 0)) throw `${t} は文字レイヤではありません（b_color/style/ffs/noffs/buraは文字レイヤ専用）`;
		return Object.assign(o, r), v(e, i, a);
	}),
	getLaySty: (e, n) => {
		let r = t(), a = r.aPage[n === "fore" ? r.foreIdx : 1 - r.foreIdx].find((t) => t.nm === e);
		if (!a) throw `存在しないレイヤ ${e} です`;
		let o = {};
		for (let e of i) a[e] !== void 0 && Object.assign(o, { [e]: a[e] });
		return o;
	},
	getPages: () => {
		let e = t();
		return {
			fore: e.aPage[e.foreIdx],
			back: e.aPage[1 - e.foreIdx]
		};
	},
	getPagesJson: () => {
		let { aPage: e, foreIdx: n } = t();
		return JSON.stringify({
			aPage: e,
			foreIdx: n
		});
	},
	enableEvent: ({ nm: t, enabled: n }) => e((e) => ({ aPage: e.aPage.map((e) => {
		let r = [...e];
		return y(r, t, "txt").enabled = n, r;
	}) })),
	clearLay: ({ aLayNm: t, page: n }) => e((e) => {
		let r = (e) => {
			for (let t of i) t !== "visible" && delete e[t];
			e.cls === "grp" ? (e.fn = "", e.src = "", e.aFace = []) : (e.str = "", e.aCh = [], e.aBtn = [], delete e.b_color, delete e.style, delete e.ffs, delete e.noffs, delete e.bura, delete e.b_pic, delete e.b_src, delete e.b_alpha_isfixed, e.b_alpha = 1);
		}, a = (e) => {
			if (!t) {
				e.forEach(r);
				return;
			}
			for (let n of t) {
				let t = e.find((e) => e.nm === n);
				if (!t) throw `存在しないレイヤ ${n} です`;
				r(t);
			}
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return a(t), t;
		}) };
		let { idx: o, aLay: s } = _(e, n);
		return a(s), v(e, o, s);
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
	chgFilter: ({ aLayNm: t, page: n, mode: r, flt: i, index: a, enabled: o }) => e((e) => {
		let s = (e) => {
			switch (r) {
				case "add":
					e.aFlt = [...e.aFlt ?? [], i];
					break;
				case "replace":
					e.aFlt = [i];
					break;
				case "clear":
					delete e.aFlt;
					break;
				case "enable": {
					let t = [...e.aFlt ?? []], n = a ?? 0;
					if (t.length === 0) throw `${e.nm} にフィルターがありません`;
					if (t.length <= n) throw `${e.nm} のフィルターの個数（${String(t.length)}）を越えています`;
					t[n] = {
						...t[n],
						enabled: o ?? !0
					}, e.aFlt = t;
					break;
				}
			}
		}, c = (e) => {
			if (!t) {
				e.forEach(s);
				return;
			}
			for (let n of t) {
				let t = e.find((e) => e.nm === n);
				if (!t) throw `存在しないレイヤ ${n} です`;
				s(t);
			}
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return c(t), t;
		}) };
		let { idx: l, aLay: u } = _(e, n);
		return c(u), v(e, l, u);
	}),
	chgStr: ({ nm: t, page: n, str: r, aCh: i }) => e((e) => {
		let a = (e) => {
			let n = y(e, t, "txt");
			n.str = r, n.aCh = i;
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return a(t), t;
		}) };
		let { idx: o, aLay: s } = _(e, n);
		return a(s), v(e, o, s);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n }) => e((e) => {
		let r = 1 - e.foreIdx, i = e.aPage[e.foreIdx], a = v(e, r, e.aPage[r].map((e) => t && !t.includes(e.nm) ? structuredClone(i.find((t) => t.nm === e.nm) ?? e) : e));
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
	quake: null,
	startQuake: ({ hmax: t, vmax: n }) => e((e) => ({ quake: {
		seq: (e.quake?.seq ?? 0) + 1,
		hmax: t,
		vmax: n
	} })),
	finishQuake: () => e(() => ({ quake: null })),
	title: "",
	addTitle: (t) => e(() => ({ title: t })),
	fullScr: !1,
	setFullScr: (t) => e(() => ({ fullScr: t })),
	toggleFullScr: () => e((e) => ({ fullScr: !e.fullScr })),
	isReadBack: !1,
	setReadBack: (t) => e(() => ({ isReadBack: t })),
	isTyping: !1,
	setIsTyping: (t) => e(() => ({ isTyping: t })),
	backAlpha: 1,
	setBackAlpha: (t) => e(() => ({ backAlpha: t })),
	skipReq: 0,
	requestSkip: () => e((e) => ({ skipReq: e.skipReq + 1 })),
	skipping: !1,
	setSkipping: (t) => e(() => ({ skipping: t })),
	wait: null,
	setWait: (t) => e(() => ({ wait: t }))
})), x = function() {};
function S(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function C(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var w = typeof window < "u", ee = function(e) {
	(0, f.useEffect)(e, []);
}, te = w ? window : null, T = function(e) {
	return !!e.addEventListener;
}, E = function(e) {
	return !!e.on;
}, D = function(e, t, n, r) {
	n === void 0 && (n = te), (0, f.useEffect)(function() {
		if (t && n) return T(n) ? S(n, e, t, r) : E(n) && n.on(e, t, r), function() {
			T(n) ? C(n, e, t, r) : E(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, O = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, ne = function(e, t, n, r) {
	t === void 0 && (t = x), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var i = n.event, a = i === void 0 ? "keydown" : i, o = n.target, s = n.options;
	D(a, (0, f.useMemo)(function() {
		var n = O(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), o, s);
}, re = { restoreOnUnmount: !1 };
function k(e, t) {
	t === void 0 && (t = re);
	var n = (0, f.useRef)(document.title);
	document.title !== e && (document.title = e), (0, f.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var ie = typeof document < "u" ? k : function(e) {}, A = /* @__PURE__ */ t(((e) => {
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
})), ae = /* @__PURE__ */ t(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === D ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case ee: return "SuspenseList";
				case E: return "Activity";
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
			var e = O.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (ne.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				ie || (ie = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
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
			if (f !== void 0) if (a) if (re(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (ne.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", M[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), M[f + a] = !0);
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
		var h = n(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), E = Symbol.for("react.activity"), D = Symbol.for("react.client.reference"), O = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = Object.prototype.hasOwnProperty, re = Array.isArray, k = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var ie, A = {}, ae = h.react_stack_bottom_frame.bind(h, s)(), j = k(a(s)), M = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > O.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : ae, r ? k(a(e)) : j);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > O.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : ae, r ? k(a(e)) : j);
		};
	})();
})), j = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = A() : t.exports = ae();
})))());
function M(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function N(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var oe = /*#__PURE__*/ function() {
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
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(N(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = M(t);
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
}(), P = "-ms-", F = "-moz-", I = "-webkit-", se = "comm", ce = "rule", le = "decl", ue = "@import", de = "@keyframes", fe = "@layer", pe = Math.abs, me = String.fromCharCode, he = Object.assign;
function ge(e, t) {
	return R(e, 0) ^ 45 ? (((t << 2 ^ R(e, 0)) << 2 ^ R(e, 1)) << 2 ^ R(e, 2)) << 2 ^ R(e, 3) : 0;
}
function _e(e) {
	return e.trim();
}
function ve(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function L(e, t, n) {
	return e.replace(t, n);
}
function ye(e, t) {
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
function be(e) {
	return e.length;
}
function xe(e, t) {
	return t.push(e), e;
}
function Se(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var Ce = 1, V = 1, we = 0, H = 0, U = 0, W = "";
function Te(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: Ce,
		column: V,
		length: o,
		return: ""
	};
}
function G(e, t) {
	return he(Te("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Ee() {
	return U;
}
function De() {
	return U = H > 0 ? R(W, --H) : 0, V--, U === 10 && (V = 1, Ce--), U;
}
function K() {
	return U = H < we ? R(W, H++) : 0, V++, U === 10 && (V = 1, Ce++), U;
}
function q() {
	return R(W, H);
}
function Oe() {
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
function ke(e) {
	return Ce = V = 1, we = B(W = e), H = 0, [];
}
function Ae(e) {
	return W = "", e;
}
function je(e) {
	return _e(J(H - 1, Pe(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Me(e) {
	for (; (U = q()) && U < 33;) K();
	return Y(e) > 2 || Y(U) > 3 ? "" : " ";
}
function Ne(e, t) {
	for (; --t && K() && !(U < 48 || U > 102 || U > 57 && U < 65 || U > 70 && U < 97););
	return J(e, Oe() + (t < 6 && q() == 32 && K() == 32));
}
function Pe(e) {
	for (; K();) switch (U) {
		case e: return H;
		case 34:
		case 39:
			e !== 34 && e !== 39 && Pe(U);
			break;
		case 40:
			e === 41 && Pe(e);
			break;
		case 92:
			K();
			break;
	}
	return H;
}
function Fe(e, t) {
	for (; K() && e + U !== 57 && !(e + U === 84 && q() === 47););
	return "/*" + J(t, H - 1) + "*" + me(e === 47 ? e : K());
}
function Ie(e) {
	for (; !Y(q());) K();
	return J(e, H);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function Le(e) {
	return Ae(Re("", null, null, null, [""], e = ke(e), 0, [0], e));
}
function Re(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = K()) {
		case 40: if (m != 108 && R(C, d - 1) == 58) {
			ye(C += L(je(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += je(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += Me(m);
			break;
		case 92:
			C += Ne(Oe() - 1, 7);
			continue;
		case 47:
			switch (q()) {
				case 42:
				case 47:
					xe(Be(Fe(K(), Oe()), t, n), c);
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
					_ == -1 && (C = L(C, /\f/g, "")), p > 0 && B(C) - d && xe(p > 32 ? Ve(C + ";", r, n, d - 1) : Ve(L(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (xe(S = ze(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) if (u === 0) Re(C, t, S, S, b, a, d, s, x);
				else switch (f === 99 && R(C, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						Re(e, S, S, r && xe(ze(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
						break;
					default: Re(C, S, S, S, [""], x, 0, s, x);
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + B(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && De() == 125) continue;
			}
			switch (C += me(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (B(C) - 1) * _, _ = 1;
					break;
				case 64:
					q() === 45 && (C += je(K())), f = q(), u = d = B(y = C += Ie(Oe())), v++;
					break;
				case 45: m === 45 && B(C) == 2 && (h = 0);
			}
	}
	return a;
}
function ze(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = be(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = z(e, d + 1, d = pe(h = o[m])), y = e; _ < p; ++_) (y = _e(h > 0 ? f[_] + " " + v : L(v, /&\f/g, f[_]))) && (c[g++] = y);
	return Te(e, t, n, i === 0 ? ce : s, c, l, u);
}
function Be(e, t, n) {
	return Te(e, t, n, se, me(Ee()), z(e, 2, -2), 0);
}
function Ve(e, t, n, r) {
	return Te(e, t, n, le, z(e, 0, r), z(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function X(e, t) {
	for (var n = "", r = be(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function He(e, t, n, r) {
	switch (e.type) {
		case fe: if (e.children.length) break;
		case ue:
		case le: return e.return = e.return || e.value;
		case se: return "";
		case de: return e.return = e.value + "{" + X(e.children, r) + "}";
		case ce: e.value = e.props.join(",");
	}
	return B(n = X(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Ue(e) {
	var t = be(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function We(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function Ge(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var Ke = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = q(), r === 38 && i === 12 && (t[n] = 1), !Y(i);) K();
	return J(e, H);
}, qe = function(e, t) {
	var n = -1, r = 44;
	do
		switch (Y(r)) {
			case 0:
				r === 38 && q() === 12 && (t[n] = 1), e[n] += Ke(H - 1, t, n);
				break;
			case 2:
				e[n] += je(r);
				break;
			case 4: if (r === 44) {
				e[++n] = q() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += me(r);
		}
	while (r = K());
	return e;
}, Je = function(e, t) {
	return Ae(qe(ke(e), t));
}, Ye = /* #__PURE__ */ new WeakMap(), Xe = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !Ye.get(n)) && !r) {
			Ye.set(e, !0);
			for (var i = [], a = Je(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Ze = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function Qe(e, t) {
	switch (ge(e, t)) {
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
				case 115: return ~ye(e, "stretch") ? Qe(L(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (R(e, t + 1) !== 115) break;
		case 6444:
			switch (R(e, B(e) - 3 - (~ye(e, "!important") && 10))) {
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
var $e = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case le:
			e.return = Qe(e.value, e.length);
			break;
		case de: return X([G(e, { value: L(e.value, "@", "@" + I) })], r);
		case ce: if (e.length) return Se(e.props, function(t) {
			switch (ve(t, /(::plac\w+|:read-\w+)/)) {
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
}], et = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || $e, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [Xe, Ze], l, u = [He, We(function(e) {
		l.insert(e);
	})], d = Ue(c.concat(r, u)), f = function(e) {
		return X(Le(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new oe({
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
}, tt = /* @__PURE__ */ t(((e) => {
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
})), nt = /* @__PURE__ */ t(((e) => {
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
		var S = l, C = u, w = c, ee = s, te = n, T = d, E = i, D = h, O = m, ne = r, re = o, k = a, ie = f, A = !1;
		function ae(e) {
			return A || (A = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), j(e) || x(e) === l;
		}
		function j(e) {
			return x(e) === u;
		}
		function M(e) {
			return x(e) === c;
		}
		function N(e) {
			return x(e) === s;
		}
		function oe(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function P(e) {
			return x(e) === d;
		}
		function F(e) {
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
		function de(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = w, e.ContextProvider = ee, e.Element = te, e.ForwardRef = T, e.Fragment = E, e.Lazy = D, e.Memo = O, e.Portal = ne, e.Profiler = re, e.StrictMode = k, e.Suspense = ie, e.isAsyncMode = ae, e.isConcurrentMode = j, e.isContextConsumer = M, e.isContextProvider = N, e.isElement = oe, e.isForwardRef = P, e.isFragment = F, e.isLazy = I, e.isMemo = se, e.isPortal = ce, e.isProfiler = le, e.isStrictMode = ue, e.isSuspense = de, e.isValidElementType = b, e.typeOf = x;
	})();
})), rt = /* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = tt() : t.exports = nt();
})), it = /* @__PURE__ */ t(((e, t) => {
	var n = rt(), r = {
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
function at(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var ot = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, st = function(e, t, n) {
	ot(e, t, n);
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
function ct(e) {
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
var lt = {
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
}, ut = /[A-Z]|^ms/g, dt = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ft = function(e) {
	return e.charCodeAt(1) === 45;
}, pt = function(e) {
	return e != null && typeof e != "boolean";
}, mt = /* #__PURE__ */ Ge(function(e) {
	return ft(e) ? e : e.replace(ut, "-$&").toLowerCase();
}), ht = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(dt, function(e, t, n) {
			return Q = {
				name: t,
				styles: n,
				next: Q
			}, t;
		});
	}
	return lt[e] !== 1 && !ft(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
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
			return gt(e, t, n);
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
function gt(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += Z(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : pt(s) && (r += mt(a) + ":" + ht(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) pt(o[c]) && (r += mt(a) + ":" + ht(a, o[c]) + ";");
		else {
			var l = Z(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += mt(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var _t = /label:\s*([^\s;{]+)\s*(;|$)/g, Q;
function vt(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	Q = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += Z(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += Z(n, t, e[o]), r && (i += a[o]);
	_t.lastIndex = 0;
	for (var s = "", c; (c = _t.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: ct(i) + s,
		styles: i,
		next: Q
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var yt = function(e) {
	return e();
}, bt = f.useInsertionEffect ? f.useInsertionEffect : !1, xt = bt || yt;
bt || f.useLayoutEffect;
var St = /* #__PURE__ */ f.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ et({ key: "css" }) : null);
St.Provider;
var Ct = function(e) {
	return /*#__PURE__*/ (0, f.forwardRef)(function(t, n) {
		return e(t, (0, f.useContext)(St), n);
	});
}, wt = /* #__PURE__ */ f.createContext({}), $ = {}.hasOwnProperty, Tt = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Et = function(e, t) {
	var n = {};
	for (var r in t) $.call(t, r) && (n[r] = t[r]);
	return n[Tt] = e, n;
}, Dt = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return ot(t, n, r), xt(function() {
		return st(t, n, r);
	}), null;
}, Ot = /* @__PURE__ */ Ct(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[Tt], a = [r], o = "";
	typeof e.className == "string" ? o = at(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = vt(a, void 0, f.useContext(wt));
	o += t.key + "-" + s.name;
	var c = {};
	for (var l in e) $.call(e, l) && l !== "css" && l !== Tt && (c[l] = e[l]);
	return c.className = o, n && (c.ref = n), /*#__PURE__*/ f.createElement(f.Fragment, null, /*#__PURE__*/ f.createElement(Dt, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ f.createElement(i, c));
});
it();
var kt = j.Fragment, At = function(e, t, n) {
	return $.call(t, "css") ? j.jsx(Ot, Et(e, t), n) : j.jsx(e, t, n);
}, jt = function(e, t, n) {
	return $.call(t, "css") ? j.jsxs(Ot, Et(e, t), n) : j.jsxs(e, t, n);
}, Mt = (0, f.lazy)(() => import("./Stage.js"));
function Nt(e, t, n) {
	e.render(/* @__PURE__ */ At(Pt, {
		arg: t,
		inited: n
	}));
}
function Pt({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: i } = e, a = b((e) => e.title), o = b((e) => e.addTitle);
	ie(a);
	let s = b((e) => e.addLayer), c = b((e) => e.chgPic), l = b((e) => e.chgBAlpha), u = b((e) => e.chgStr), d = b((e) => e.chgLay), p = b((e) => e.getLaySty), m = b((e) => e.getPages), h = b((e) => e.chgBPic), g = b((e) => e.setBackAlpha), _ = b((e) => e.getPagesJson), v = b((e) => e.replace), y = b((e) => e.toggleFullScr), x = b((e) => e.clearLay), S = b((e) => e.moveLay), C = b((e) => e.chgFilter), w = b((e) => e.enableEvent), te = b((e) => e.addBtn), T = b((e) => e.setReadBack), E = b((e) => e.isTyping), D = b((e) => e.requestSkip), O = b((e) => e.setWait), re = b((e) => e.setSkipping), k = b((e) => e.startTrans), A = b((e) => e.finishTrans), ae = b((e) => e.startQuake), j = b((e) => e.finishQuake);
	function M() {
		i.go();
	}
	ee(() => {
		o(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return i.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: s,
			chgPic: c,
			chgBAlpha: l,
			chgBPic: h,
			setBackAlpha: g,
			chgStr: u,
			chgLay: d,
			getLaySty: p,
			getPages: m,
			getPagesJson: _,
			replace: v,
			clearLay: x,
			moveLay: S,
			chgFilter: C,
			enableEvent: w,
			addBtn: te,
			addTitle: o,
			toggleFullScr: y,
			setWait: O,
			requestSkip: D,
			setSkipping: re,
			startTrans: k,
			finishTrans: A,
			startQuake: ae,
			finishQuake: j
		}, e), t(), n.addEventListener("ev_next", M), () => n.removeEventListener("ev_next", M);
	});
	function N() {
		if (E) {
			D();
			return;
		}
		if (r.caretaker.nextKey()) {
			T(!r.caretaker.isLast());
			return;
		}
		T(!1), M();
	}
	function oe() {
		r.caretaker.prevKey() && T(!r.caretaker.isLast());
	}
	ne(() => !0, (e) => {
		i.cancelAuto();
		let t = Ft(e);
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
				e.stopPropagation(), e.preventDefault(), N();
				break;
			case "PageUp":
				e.stopPropagation(), e.preventDefault(), oe();
				break;
		}
	});
	function P() {
		if (Rt) {
			Rt = !1;
			return;
		}
		It || (i.cancelAuto(), !i.fireEvent("click") && N());
	}
	return /* @__PURE__ */ At(f.Suspense, {
		fallback: /* @__PURE__ */ At(kt, { children: "Loading" }),
		children: /* @__PURE__ */ At(Mt, {
			arg: e,
			next: N,
			prev: oe,
			onClick: P
		})
	});
}
function Ft(e) {
	return (e.altKey && e.key !== "Alt" ? "alt+" : "") + (e.ctrlKey && e.key !== "Control" ? "ctrl+" : "") + (e.metaKey && e.key !== "Meta" ? "meta+" : "") + (e.shiftKey && e.key !== "Shift" ? "shift+" : "") + e.key.toLowerCase();
}
var It = !1, Lt = (e) => It = e, Rt = !1;
function zt() {
	Rt = !0;
}
//#endregion
export { Pt as Main, s as _, Et as a, it as c, x as d, C as f, l as g, c as h, Ot as i, Nt as initMain, ee as l, b as m, At as n, $ as o, zt as onLong, S as p, jt as r, vt as s, Lt as setDesignMode, kt as t, w as u, a as v };

//# sourceMappingURL=Main.js.map