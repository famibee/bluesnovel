import { r as __toESM, t as __commonJSMin } from "./chunk.js";
import { t as require_react } from "./react.js";
var createStoreImpl = (t) => {
	let o, s = /* @__PURE__ */ new Set(), c = (t, c) => {
		let l = typeof t == "function" ? t(o) : t;
		if (!Object.is(l, o)) {
			let t = o;
			o = c ?? (typeof l != "object" || !l) ? l : Object.assign({}, o, l), s.forEach((s) => s(o, t));
		}
	}, l = () => o, u = {
		setState: c,
		getState: l,
		getInitialState: () => d,
		subscribe: (t) => (s.add(t), () => s.delete(t))
	}, d = o = t(c, l, u);
	return u;
}, createStore = ((t) => t ? createStoreImpl(t) : createStoreImpl), import_react = /* @__PURE__ */ __toESM(require_react(), 1), identity = (t) => t;
function useStore$1(t, o = identity) {
	let s = import_react.useSyncExternalStore(t.subscribe, import_react.useCallback(() => o(t.getState()), [t, o]), import_react.useCallback(() => o(t.getInitialState()), [t, o]));
	return import_react.useDebugValue(s), s;
}
var createImpl = (t) => {
	let o = createStore(t), s = (t) => useStore$1(o, t);
	return Object.assign(s, o), s;
};
const useStore = ((t) => t ? createImpl(t) : createImpl)()((t) => ({
	txt: "",
	addTxt: (o) => t((t) => ({ txt: t.txt + o })),
	clearTxt: () => t(() => ({ txt: "" })),
	aLay: [],
	replace: (o) => t(() => ({ aLay: JSON.parse(o) })),
	addLayer: (o) => t((t) => ({ aLay: [...t.aLay, o] })),
	chgPic: ({ nm: o, fn: s }) => t((t) => {
		let c = [...t.aLay], l = c.find((t) => t.nm === o);
		if (!l) throw `存在しないレイヤ ${o} です`;
		if (l.cls !== "GRP") throw `${o} は画像レイヤではありません`;
		return l.fn = s, { aLay: c };
	}),
	chgStr: ({ nm: o, str: s }) => t((t) => {
		let c = [...t.aLay], l = c.find((t) => t.nm === o);
		if (!l) throw `存在しないレイヤ ${o} です`;
		if (l.cls !== "TXT") throw `${o} は文字レイヤではありません`;
		return l.str = s, { aLay: c };
	}),
	title: "",
	addTitle: (o) => t(() => ({ title: o }))
}));
var noop = function() {};
function on(t) {
	var o = [...arguments].slice(1);
	t && t.addEventListener && t.addEventListener.apply(t, o);
}
function off(t) {
	var o = [...arguments].slice(1);
	t && t.removeEventListener && t.removeEventListener.apply(t, o);
}
var isBrowser$1 = typeof window < "u", useEffectOnce_default = function(t) {
	(0, import_react.useEffect)(t, []);
}, defaultTarget = isBrowser$1 ? window : null, isListenerType1 = function(t) {
	return !!t.addEventListener;
}, isListenerType2 = function(t) {
	return !!t.on;
}, useEvent_default = function(t, o, s, c) {
	s === void 0 && (s = defaultTarget), (0, import_react.useEffect)(function() {
		if (o && s) return isListenerType1(s) ? on(s, t, o, c) : isListenerType2(s) && s.on(t, o, c), function() {
			isListenerType1(s) ? off(s, t, o, c) : isListenerType2(s) && s.off(t, o, c);
		};
	}, [
		t,
		o,
		s,
		JSON.stringify(c)
	]);
}, createKeyPredicate = function(t) {
	return typeof t == "function" ? t : typeof t == "string" ? function(o) {
		return o.key === t;
	} : t ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, useKey_default = function(t, o, s, c) {
	o === void 0 && (o = noop), s === void 0 && (s = {}), c === void 0 && (c = [t]);
	var l = s.event, d = l === void 0 ? "keydown" : l, f = s.target, p = s.options;
	useEvent_default(d, (0, import_react.useMemo)(function() {
		var s = createKeyPredicate(t);
		return function(t) {
			if (s(t)) return o(t);
		};
	}, c), f, p);
}, DEFAULT_USE_TITLE_OPTIONS = { restoreOnUnmount: !1 };
function useTitle(t, o) {
	o === void 0 && (o = DEFAULT_USE_TITLE_OPTIONS);
	var s = (0, import_react.useRef)(document.title);
	document.title !== t && (document.title = t), (0, import_react.useEffect)(function() {
		if (o && o.restoreOnUnmount) return function() {
			document.title = s.current;
		};
	}, []);
}
var useTitle_default = typeof document < "u" ? useTitle : function(t) {}, require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((t) => {
	var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
	function c(t, s, c) {
		var l = null;
		if (c !== void 0 && (l = "" + c), s.key !== void 0 && (l = "" + s.key), "key" in s) for (var u in c = {}, s) u !== "key" && (c[u] = s[u]);
		else c = s;
		return s = c.ref, {
			$$typeof: o,
			type: t,
			key: l,
			ref: s === void 0 ? null : s,
			props: c
		};
	}
	t.Fragment = s, t.jsx = c, t.jsxs = c;
})), require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin(((t) => {
	process.env.NODE_ENV !== "production" && (function() {
		function o(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === P ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case C: return "Fragment";
				case T: return "Profiler";
				case w: return "StrictMode";
				case k: return "Suspense";
				case A: return "SuspenseList";
				case N: return "Activity";
			}
			if (typeof t == "object") switch (typeof t.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), t.$$typeof) {
				case S: return "Portal";
				case D: return t.displayName || "Context";
				case E: return (t._context.displayName || "Context") + ".Consumer";
				case O:
					var s = t.render;
					return t = t.displayName, t ||= (t = s.displayName || s.name || "", t === "" ? "ForwardRef" : "ForwardRef(" + t + ")"), t;
				case j: return s = t.displayName || null, s === null ? o(t.type) || "Memo" : s;
				case M:
					s = t._payload, t = t._init;
					try {
						return o(t(s));
					} catch {}
			}
			return null;
		}
		function c(t) {
			return "" + t;
		}
		function l(t) {
			try {
				c(t);
				var o = !1;
			} catch {
				o = !0;
			}
			if (o) {
				o = console;
				var s = o.error, l = typeof Symbol == "function" && Symbol.toStringTag && t[Symbol.toStringTag] || t.constructor.name || "Object";
				return s.call(o, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", l), c(t);
			}
		}
		function u(t) {
			if (t === C) return "<>";
			if (typeof t == "object" && t && t.$$typeof === M) return "<...>";
			try {
				var s = o(t);
				return s ? "<" + s + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function d() {
			var t = F.A;
			return t === null ? null : t.getOwner();
		}
		function f() {
			return Error("react-stack-top-frame");
		}
		function p(t) {
			if (I.call(t, "key")) {
				var o = Object.getOwnPropertyDescriptor(t, "key").get;
				if (o && o.isReactWarning) return !1;
			}
			return t.key !== void 0;
		}
		function m(t, o) {
			function s() {
				z || (z = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", o));
			}
			s.isReactWarning = !0, Object.defineProperty(t, "key", {
				get: s,
				configurable: !0
			});
		}
		function h() {
			var t = o(this.type);
			return B[t] || (B[t] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), t = this.props.ref, t === void 0 ? null : t;
		}
		function g(t, o, s, c, l, u) {
			var d = s.ref;
			return t = {
				$$typeof: x,
				type: t,
				key: o,
				props: s,
				_owner: c
			}, (d === void 0 ? null : d) === null ? Object.defineProperty(t, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(t, "ref", {
				enumerable: !1,
				get: h
			}), t._store = {}, Object.defineProperty(t._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(t, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(t, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: l
			}), Object.defineProperty(t, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: u
			}), Object.freeze && (Object.freeze(t.props), Object.freeze(t)), t;
		}
		function _(t, s, c, u, f, h) {
			var _ = s.children;
			if (_ !== void 0) if (u) if (L(_)) {
				for (u = 0; u < _.length; u++) v(_[u]);
				Object.freeze && Object.freeze(_);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else v(_);
			if (I.call(s, "key")) {
				_ = o(t);
				var y = Object.keys(s).filter(function(t) {
					return t !== "key";
				});
				u = 0 < y.length ? "{key: someKey, " + y.join(": ..., ") + ": ...}" : "{key: someKey}", U[_ + u] || (y = 0 < y.length ? "{" + y.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", u, _, y, _), U[_ + u] = !0);
			}
			if (_ = null, c !== void 0 && (l(c), _ = "" + c), p(s) && (l(s.key), _ = "" + s.key), "key" in s) for (var b in c = {}, s) b !== "key" && (c[b] = s[b]);
			else c = s;
			return _ && m(c, typeof t == "function" ? t.displayName || t.name || "Unknown" : t), g(t, _, c, d(), f, h);
		}
		function v(t) {
			y(t) ? t._store && (t._store.validated = 1) : typeof t == "object" && t && t.$$typeof === M && (t._payload.status === "fulfilled" ? y(t._payload.value) && t._payload.value._store && (t._payload.value._store.validated = 1) : t._store && (t._store.validated = 1));
		}
		function y(t) {
			return typeof t == "object" && !!t && t.$$typeof === x;
		}
		var b = require_react(), x = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), E = Symbol.for("react.consumer"), D = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), N = Symbol.for("react.activity"), P = Symbol.for("react.client.reference"), F = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = Object.prototype.hasOwnProperty, L = Array.isArray, R = console.createTask ? console.createTask : function() {
			return null;
		};
		b = { react_stack_bottom_frame: function(t) {
			return t();
		} };
		var z, B = {}, V = b.react_stack_bottom_frame.bind(b, f)(), H = R(u(f)), U = {};
		t.Fragment = C, t.jsx = function(t, o, s) {
			var c = 1e4 > F.recentlyCreatedOwnerStacks++;
			return _(t, o, s, !1, c ? Error("react-stack-top-frame") : V, c ? R(u(t)) : H);
		}, t.jsxs = function(t, o, s) {
			var c = 1e4 > F.recentlyCreatedOwnerStacks++;
			return _(t, o, s, !0, c ? Error("react-stack-top-frame") : V, c ? R(u(t)) : H);
		};
	})();
})), import_jsx_runtime = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((t, o) => {
	process.env.NODE_ENV === "production" ? o.exports = require_react_jsx_runtime_production() : o.exports = require_react_jsx_runtime_development();
})))()), isDevelopment$2 = !1;
function sheetForTag(t) {
	if (t.sheet) return t.sheet;
	/* istanbul ignore next */
	for (var o = 0; o < document.styleSheets.length; o++) if (document.styleSheets[o].ownerNode === t) return document.styleSheets[o];
}
function createStyleElement(t) {
	var o = document.createElement("style");
	return o.setAttribute("data-emotion", t.key), t.nonce !== void 0 && o.setAttribute("nonce", t.nonce), o.appendChild(document.createTextNode("")), o.setAttribute("data-s", ""), o;
}
var StyleSheet = /* @__PURE__ */ function() {
	function t(t) {
		var o = this;
		this._insertTag = function(t) {
			var s = o.tags.length === 0 ? o.insertionPoint ? o.insertionPoint.nextSibling : o.prepend ? o.container.firstChild : o.before : o.tags[o.tags.length - 1].nextSibling;
			o.container.insertBefore(t, s), o.tags.push(t);
		}, this.isSpeedy = t.speedy === void 0 ? !isDevelopment$2 : t.speedy, this.tags = [], this.ctr = 0, this.nonce = t.nonce, this.key = t.key, this.container = t.container, this.prepend = t.prepend, this.insertionPoint = t.insertionPoint, this.before = null;
	}
	var o = t.prototype;
	return o.hydrate = function(t) {
		t.forEach(this._insertTag);
	}, o.insert = function(t) {
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(createStyleElement(this));
		var o = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var s = sheetForTag(o);
			try {
				s.insertRule(t, s.cssRules.length);
			} catch {}
		} else o.appendChild(document.createTextNode(t));
		this.ctr++;
	}, o.flush = function() {
		this.tags.forEach(function(t) {
			return t.parentNode?.removeChild(t);
		}), this.tags = [], this.ctr = 0;
	}, t;
}(), MS = "-ms-", MOZ = "-moz-", WEBKIT = "-webkit-", COMMENT = "comm", RULESET = "rule", DECLARATION = "decl", IMPORT = "@import", KEYFRAMES = "@keyframes", LAYER = "@layer", abs = Math.abs, from = String.fromCharCode, assign = Object.assign;
function hash(t, o) {
	return charat(t, 0) ^ 45 ? (((o << 2 ^ charat(t, 0)) << 2 ^ charat(t, 1)) << 2 ^ charat(t, 2)) << 2 ^ charat(t, 3) : 0;
}
function trim(t) {
	return t.trim();
}
function match(t, o) {
	return (t = o.exec(t)) ? t[0] : t;
}
function replace(t, o, s) {
	return t.replace(o, s);
}
function indexof(t, o) {
	return t.indexOf(o);
}
function charat(t, o) {
	return t.charCodeAt(o) | 0;
}
function substr(t, o, s) {
	return t.slice(o, s);
}
function strlen(t) {
	return t.length;
}
function sizeof(t) {
	return t.length;
}
function append(t, o) {
	return o.push(t), t;
}
function combine(t, o) {
	return t.map(o).join("");
}
var line = 1, column = 1, length = 0, position = 0, character = 0, characters = "";
function node(t, o, s, c, l, u, d) {
	return {
		value: t,
		root: o,
		parent: s,
		type: c,
		props: l,
		children: u,
		line,
		column,
		length: d,
		return: ""
	};
}
function copy(t, o) {
	return assign(node("", null, null, "", null, null, 0), t, { length: -t.length }, o);
}
function char() {
	return character;
}
function prev() {
	return character = position > 0 ? charat(characters, --position) : 0, column--, character === 10 && (column = 1, line--), character;
}
function next() {
	return character = position < length ? charat(characters, position++) : 0, column++, character === 10 && (column = 1, line++), character;
}
function peek() {
	return charat(characters, position);
}
function caret() {
	return position;
}
function slice(t, o) {
	return substr(characters, t, o);
}
function token(t) {
	switch (t) {
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
function alloc(t) {
	return line = column = 1, length = strlen(characters = t), position = 0, [];
}
function dealloc(t) {
	return characters = "", t;
}
function delimit(t) {
	return trim(slice(position - 1, delimiter(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function whitespace(t) {
	for (; (character = peek()) && character < 33;) next();
	return token(t) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(t, o) {
	for (; --o && next() && !(character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97););
	return slice(t, caret() + (o < 6 && peek() == 32 && next() == 32));
}
function delimiter(t) {
	for (; next();) switch (character) {
		case t: return position;
		case 34:
		case 39:
			t !== 34 && t !== 39 && delimiter(character);
			break;
		case 40:
			t === 41 && delimiter(t);
			break;
		case 92:
			next();
			break;
	}
	return position;
}
function commenter(t, o) {
	for (; next() && t + character !== 57 && !(t + character === 84 && peek() === 47););
	return "/*" + slice(o, position - 1) + "*" + from(t === 47 ? t : next());
}
function identifier(t) {
	for (; !token(peek());) next();
	return slice(t, position);
}
function compile(t) {
	return dealloc(parse("", null, null, null, [""], t = alloc(t), 0, [0], t));
}
function parse(t, o, s, c, l, u, d, f, p) {
	for (var m = 0, h = 0, g = d, _ = 0, v = 0, y = 0, b = 1, x = 1, S = 1, C = 0, w = "", T = l, E = u, D = c, O = w; x;) switch (y = C, C = next()) {
		case 40: if (y != 108 && charat(O, g - 1) == 58) {
			indexof(O += replace(delimit(C), "&", "&\f"), "&\f") != -1 && (S = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			O += delimit(C);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			O += whitespace(y);
			break;
		case 92:
			O += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), o, s), p);
					break;
				default: O += "/";
			}
			break;
		case 123 * b: f[m++] = strlen(O) * S;
		case 125 * b:
		case 59:
		case 0:
			switch (C) {
				case 0:
				case 125: x = 0;
				case 59 + h:
					S == -1 && (O = replace(O, /\f/g, "")), v > 0 && strlen(O) - g && append(v > 32 ? declaration(O + ";", c, s, g - 1) : declaration(replace(O, " ", "") + ";", c, s, g - 2), p);
					break;
				case 59: O += ";";
				default: if (append(D = ruleset(O, o, s, m, h, l, f, w, T = [], E = [], g), u), C === 123) if (h === 0) parse(O, o, D, D, T, u, g, f, E);
				else switch (_ === 99 && charat(O, 3) === 110 ? 100 : _) {
					case 100:
					case 108:
					case 109:
					case 115:
						parse(t, D, D, c && append(ruleset(t, D, D, 0, 0, l, f, w, l, T = [], g), E), l, E, g, f, c ? T : E);
						break;
					default: parse(O, D, D, D, [""], E, 0, f, E);
				}
			}
			m = h = v = 0, b = S = 1, w = O = "", g = d;
			break;
		case 58: g = 1 + strlen(O), v = y;
		default:
			if (b < 1) {
				if (C == 123) --b;
				else if (C == 125 && b++ == 0 && prev() == 125) continue;
			}
			switch (O += from(C), C * b) {
				case 38:
					S = h > 0 ? 1 : (O += "\f", -1);
					break;
				case 44:
					f[m++] = (strlen(O) - 1) * S, S = 1;
					break;
				case 64:
					peek() === 45 && (O += delimit(next())), _ = peek(), h = g = strlen(w = O += identifier(caret())), C++;
					break;
				case 45: y === 45 && strlen(O) == 2 && (b = 0);
			}
	}
	return u;
}
function ruleset(t, o, s, c, l, u, d, f, p, m, h) {
	for (var g = l - 1, _ = l === 0 ? u : [""], v = sizeof(_), y = 0, b = 0, x = 0; y < c; ++y) for (var S = 0, C = substr(t, g + 1, g = abs(b = d[y])), w = t; S < v; ++S) (w = trim(b > 0 ? _[S] + " " + C : replace(C, /&\f/g, _[S]))) && (p[x++] = w);
	return node(t, o, s, l === 0 ? RULESET : f, p, m, h);
}
function comment(t, o, s) {
	return node(t, o, s, COMMENT, from(char()), substr(t, 2, -2), 0);
}
function declaration(t, o, s, c) {
	return node(t, o, s, DECLARATION, substr(t, 0, c), substr(t, c + 1, -1), c);
}
function serialize(t, o) {
	for (var s = "", c = sizeof(t), l = 0; l < c; l++) s += o(t[l], l, t, o) || "";
	return s;
}
function stringify(t, o, s, c) {
	switch (t.type) {
		case LAYER: if (t.children.length) break;
		case IMPORT:
		case DECLARATION: return t.return = t.return || t.value;
		case COMMENT: return "";
		case KEYFRAMES: return t.return = t.value + "{" + serialize(t.children, c) + "}";
		case RULESET: t.value = t.props.join(",");
	}
	return strlen(s = serialize(t.children, c)) ? t.return = t.value + "{" + s + "}" : "";
}
function middleware(t) {
	var o = sizeof(t);
	return function(s, c, l, u) {
		for (var d = "", f = 0; f < o; f++) d += t[f](s, c, l, u) || "";
		return d;
	};
}
function rulesheet(t) {
	return function(o) {
		o.root || (o = o.return) && t(o);
	};
}
function memoize(t) {
	var o = Object.create(null);
	return function(s) {
		return o[s] === void 0 && (o[s] = t(s)), o[s];
	};
}
var identifierWithPointTracking = function(t, o, s) {
	for (var c = 0, l = 0; c = l, l = peek(), c === 38 && l === 12 && (o[s] = 1), !token(l);) next();
	return slice(t, position);
}, toRules = function(t, o) {
	var s = -1, c = 44;
	do
		switch (token(c)) {
			case 0:
				c === 38 && peek() === 12 && (o[s] = 1), t[s] += identifierWithPointTracking(position - 1, o, s);
				break;
			case 2:
				t[s] += delimit(c);
				break;
			case 4: if (c === 44) {
				t[++s] = peek() === 58 ? "&\f" : "", o[s] = t[s].length;
				break;
			}
			default: t[s] += from(c);
		}
	while (c = next());
	return t;
}, getRules = function(t, o) {
	return dealloc(toRules(alloc(t), o));
}, fixedElements = /* @__PURE__ */ new WeakMap(), compat = function(t) {
	if (!(t.type !== "rule" || !t.parent || t.length < 1)) {
		for (var o = t.value, s = t.parent, c = t.column === s.column && t.line === s.line; s.type !== "rule";) if (s = s.parent, !s) return;
		if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !fixedElements.get(s)) && !c) {
			fixedElements.set(t, !0);
			for (var l = [], u = getRules(o, l), d = s.props, f = 0, p = 0; f < u.length; f++) for (var m = 0; m < d.length; m++, p++) t.props[p] = l[f] ? u[f].replace(/&\f/g, d[m]) : d[m] + " " + u[f];
		}
	}
}, removeLabel = function(t) {
	if (t.type === "decl") {
		var o = t.value;
		o.charCodeAt(0) === 108 && o.charCodeAt(2) === 98 && (t.return = "", t.value = "");
	}
};
function prefix(t, o) {
	switch (hash(t, o)) {
		case 5103: return WEBKIT + "print-" + t + t;
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
		case 3829: return WEBKIT + t + t;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return WEBKIT + t + MOZ + t + MS + t + t;
		case 6828:
		case 4268: return WEBKIT + t + MS + t + t;
		case 6165: return WEBKIT + t + MS + "flex-" + t + t;
		case 5187: return WEBKIT + t + replace(t, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + t;
		case 5443: return WEBKIT + t + MS + "flex-item-" + replace(t, /flex-|-self/, "") + t;
		case 4675: return WEBKIT + t + MS + "flex-line-pack" + replace(t, /align-content|flex-|-self/, "") + t;
		case 5548: return WEBKIT + t + MS + replace(t, "shrink", "negative") + t;
		case 5292: return WEBKIT + t + MS + replace(t, "basis", "preferred-size") + t;
		case 6060: return WEBKIT + "box-" + replace(t, "-grow", "") + WEBKIT + t + MS + replace(t, "grow", "positive") + t;
		case 4554: return WEBKIT + replace(t, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + t;
		case 6187: return replace(replace(replace(t, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), t, "") + t;
		case 5495:
		case 3959: return replace(t, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
		case 4968: return replace(replace(t, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + t + t;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return replace(t, /(.+)-inline(.+)/, WEBKIT + "$1$2") + t;
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
			if (strlen(t) - 1 - o > 6) switch (charat(t, o + 1)) {
				case 109: if (charat(t, o + 4) !== 45) break;
				case 102: return replace(t, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(t, o + 3) == 108 ? "$3" : "$2-$3")) + t;
				case 115: return ~indexof(t, "stretch") ? prefix(replace(t, "stretch", "fill-available"), o) + t : t;
			}
			break;
		case 4949: if (charat(t, o + 1) !== 115) break;
		case 6444:
			switch (charat(t, strlen(t) - 3 - (~indexof(t, "!important") && 10))) {
				case 107: return replace(t, ":", ":" + WEBKIT) + t;
				case 101: return replace(t, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(t, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + t;
			}
			break;
		case 5936:
			switch (charat(t, o + 11)) {
				case 114: return WEBKIT + t + MS + replace(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
				case 108: return WEBKIT + t + MS + replace(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
				case 45: return WEBKIT + t + MS + replace(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
			}
			return WEBKIT + t + MS + t + t;
	}
	return t;
}
var defaultStylisPlugins = [function(t, o, s, c) {
	if (t.length > -1 && !t.return) switch (t.type) {
		case DECLARATION:
			t.return = prefix(t.value, t.length);
			break;
		case KEYFRAMES: return serialize([copy(t, { value: replace(t.value, "@", "@" + WEBKIT) })], c);
		case RULESET: if (t.length) return combine(t.props, function(o) {
			switch (match(o, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return serialize([copy(t, { props: [replace(o, /:(read-\w+)/, ":" + MOZ + "$1")] })], c);
				case "::placeholder": return serialize([
					copy(t, { props: [replace(o, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
					copy(t, { props: [replace(o, /:(plac\w+)/, ":" + MOZ + "$1")] }),
					copy(t, { props: [replace(o, /:(plac\w+)/, MS + "input-$1")] })
				], c);
			}
			return "";
		});
	}
}], createCache = function(t) {
	var o = t.key;
	if (o === "css") {
		var s = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(s, function(t) {
			t.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(t), t.setAttribute("data-s", ""));
		});
	}
	var c = t.stylisPlugins || defaultStylisPlugins, l = {}, u, d = [];
	u = t.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + o + " \"]"), function(t) {
		for (var o = t.getAttribute("data-emotion").split(" "), s = 1; s < o.length; s++) l[o[s]] = !0;
		d.push(t);
	});
	var f, p = [compat, removeLabel], m, h = [stringify, rulesheet(function(t) {
		m.insert(t);
	})], g = middleware(p.concat(c, h)), _ = function(t) {
		return serialize(compile(t), g);
	};
	f = function(t, o, s, c) {
		m = s, _(t ? t + "{" + o.styles + "}" : o.styles), c && (v.inserted[o.name] = !0);
	};
	var v = {
		key: o,
		sheet: new StyleSheet({
			key: o,
			container: u,
			nonce: t.nonce,
			speedy: t.speedy,
			prepend: t.prepend,
			insertionPoint: t.insertionPoint
		}),
		nonce: t.nonce,
		inserted: l,
		registered: {},
		insert: f
	};
	return v.sheet.hydrate(d), v;
}, require_react_is_production_min = /* @__PURE__ */ __commonJSMin(((t) => {
	var o = typeof Symbol == "function" && Symbol.for, s = o ? Symbol.for("react.element") : 60103, c = o ? Symbol.for("react.portal") : 60106, l = o ? Symbol.for("react.fragment") : 60107, u = o ? Symbol.for("react.strict_mode") : 60108, d = o ? Symbol.for("react.profiler") : 60114, f = o ? Symbol.for("react.provider") : 60109, p = o ? Symbol.for("react.context") : 60110, m = o ? Symbol.for("react.async_mode") : 60111, h = o ? Symbol.for("react.concurrent_mode") : 60111, g = o ? Symbol.for("react.forward_ref") : 60112, _ = o ? Symbol.for("react.suspense") : 60113, v = o ? Symbol.for("react.suspense_list") : 60120, y = o ? Symbol.for("react.memo") : 60115, b = o ? Symbol.for("react.lazy") : 60116, x = o ? Symbol.for("react.block") : 60121, S = o ? Symbol.for("react.fundamental") : 60117, C = o ? Symbol.for("react.responder") : 60118, w = o ? Symbol.for("react.scope") : 60119;
	function T(t) {
		if (typeof t == "object" && t) {
			var o = t.$$typeof;
			switch (o) {
				case s: switch (t = t.type, t) {
					case m:
					case h:
					case l:
					case d:
					case u:
					case _: return t;
					default: switch (t &&= t.$$typeof, t) {
						case p:
						case g:
						case b:
						case y:
						case f: return t;
						default: return o;
					}
				}
				case c: return o;
			}
		}
	}
	function E(t) {
		return T(t) === h;
	}
	t.AsyncMode = m, t.ConcurrentMode = h, t.ContextConsumer = p, t.ContextProvider = f, t.Element = s, t.ForwardRef = g, t.Fragment = l, t.Lazy = b, t.Memo = y, t.Portal = c, t.Profiler = d, t.StrictMode = u, t.Suspense = _, t.isAsyncMode = function(t) {
		return E(t) || T(t) === m;
	}, t.isConcurrentMode = E, t.isContextConsumer = function(t) {
		return T(t) === p;
	}, t.isContextProvider = function(t) {
		return T(t) === f;
	}, t.isElement = function(t) {
		return typeof t == "object" && !!t && t.$$typeof === s;
	}, t.isForwardRef = function(t) {
		return T(t) === g;
	}, t.isFragment = function(t) {
		return T(t) === l;
	}, t.isLazy = function(t) {
		return T(t) === b;
	}, t.isMemo = function(t) {
		return T(t) === y;
	}, t.isPortal = function(t) {
		return T(t) === c;
	}, t.isProfiler = function(t) {
		return T(t) === d;
	}, t.isStrictMode = function(t) {
		return T(t) === u;
	}, t.isSuspense = function(t) {
		return T(t) === _;
	}, t.isValidElementType = function(t) {
		return typeof t == "string" || typeof t == "function" || t === l || t === h || t === d || t === u || t === _ || t === v || typeof t == "object" && !!t && (t.$$typeof === b || t.$$typeof === y || t.$$typeof === f || t.$$typeof === p || t.$$typeof === g || t.$$typeof === S || t.$$typeof === C || t.$$typeof === w || t.$$typeof === x);
	}, t.typeOf = T;
})), require_react_is_development = /* @__PURE__ */ __commonJSMin(((t) => {
	process.env.NODE_ENV !== "production" && (function() {
		var o = typeof Symbol == "function" && Symbol.for, s = o ? Symbol.for("react.element") : 60103, c = o ? Symbol.for("react.portal") : 60106, l = o ? Symbol.for("react.fragment") : 60107, u = o ? Symbol.for("react.strict_mode") : 60108, d = o ? Symbol.for("react.profiler") : 60114, f = o ? Symbol.for("react.provider") : 60109, p = o ? Symbol.for("react.context") : 60110, m = o ? Symbol.for("react.async_mode") : 60111, h = o ? Symbol.for("react.concurrent_mode") : 60111, g = o ? Symbol.for("react.forward_ref") : 60112, _ = o ? Symbol.for("react.suspense") : 60113, v = o ? Symbol.for("react.suspense_list") : 60120, y = o ? Symbol.for("react.memo") : 60115, b = o ? Symbol.for("react.lazy") : 60116, x = o ? Symbol.for("react.block") : 60121, S = o ? Symbol.for("react.fundamental") : 60117, C = o ? Symbol.for("react.responder") : 60118, w = o ? Symbol.for("react.scope") : 60119;
		function T(t) {
			return typeof t == "string" || typeof t == "function" || t === l || t === h || t === d || t === u || t === _ || t === v || typeof t == "object" && !!t && (t.$$typeof === b || t.$$typeof === y || t.$$typeof === f || t.$$typeof === p || t.$$typeof === g || t.$$typeof === S || t.$$typeof === C || t.$$typeof === w || t.$$typeof === x);
		}
		function E(t) {
			if (typeof t == "object" && t) {
				var o = t.$$typeof;
				switch (o) {
					case s:
						var v = t.type;
						switch (v) {
							case m:
							case h:
							case l:
							case d:
							case u:
							case _: return v;
							default:
								var x = v && v.$$typeof;
								switch (x) {
									case p:
									case g:
									case b:
									case y:
									case f: return x;
									default: return o;
								}
						}
					case c: return o;
				}
			}
		}
		var D = m, O = h, k = p, A = f, j = s, M = g, N = l, P = b, F = y, I = c, L = d, R = u, z = _, B = !1;
		function V(t) {
			return B || (B = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), H(t) || E(t) === m;
		}
		function H(t) {
			return E(t) === h;
		}
		function U(t) {
			return E(t) === p;
		}
		function W(t) {
			return E(t) === f;
		}
		function G(t) {
			return typeof t == "object" && !!t && t.$$typeof === s;
		}
		function K(t) {
			return E(t) === g;
		}
		function q(t) {
			return E(t) === l;
		}
		function J(t) {
			return E(t) === b;
		}
		function Y(t) {
			return E(t) === y;
		}
		function X(t) {
			return E(t) === c;
		}
		function Z(t) {
			return E(t) === d;
		}
		function Q(t) {
			return E(t) === u;
		}
		function $(t) {
			return E(t) === _;
		}
		t.AsyncMode = D, t.ConcurrentMode = O, t.ContextConsumer = k, t.ContextProvider = A, t.Element = j, t.ForwardRef = M, t.Fragment = N, t.Lazy = P, t.Memo = F, t.Portal = I, t.Profiler = L, t.StrictMode = R, t.Suspense = z, t.isAsyncMode = V, t.isConcurrentMode = H, t.isContextConsumer = U, t.isContextProvider = W, t.isElement = G, t.isForwardRef = K, t.isFragment = q, t.isLazy = J, t.isMemo = Y, t.isPortal = X, t.isProfiler = Z, t.isStrictMode = Q, t.isSuspense = $, t.isValidElementType = T, t.typeOf = E;
	})();
})), require_react_is = /* @__PURE__ */ __commonJSMin(((t, o) => {
	process.env.NODE_ENV === "production" ? o.exports = require_react_is_production_min() : o.exports = require_react_is_development();
})), require_hoist_non_react_statics_cjs = /* @__PURE__ */ __commonJSMin(((t, o) => {
	var s = require_react_is(), c = {
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
	}, l = {
		name: !0,
		length: !0,
		prototype: !0,
		caller: !0,
		callee: !0,
		arguments: !0,
		arity: !0
	}, u = {
		$$typeof: !0,
		render: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0
	}, d = {
		$$typeof: !0,
		compare: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0,
		type: !0
	}, f = {};
	f[s.ForwardRef] = u, f[s.Memo] = d;
	function p(t) {
		return s.isMemo(t) ? d : f[t.$$typeof] || c;
	}
	var m = Object.defineProperty, h = Object.getOwnPropertyNames, g = Object.getOwnPropertySymbols, _ = Object.getOwnPropertyDescriptor, v = Object.getPrototypeOf, y = Object.prototype;
	function b(t, o, s) {
		if (typeof o != "string") {
			if (y) {
				var c = v(o);
				c && c !== y && b(t, c, s);
			}
			var u = h(o);
			g && (u = u.concat(g(o)));
			for (var d = p(t), f = p(o), x = 0; x < u.length; ++x) {
				var S = u[x];
				if (!l[S] && !(s && s[S]) && !(f && f[S]) && !(d && d[S])) {
					var C = _(o, S);
					try {
						m(t, S, C);
					} catch {}
				}
			}
		}
		return t;
	}
	o.exports = b;
})), isBrowser = !0;
function getRegisteredStyles(t, o, s) {
	var c = "";
	return s.split(" ").forEach(function(s) {
		t[s] === void 0 ? s && (c += s + " ") : o.push(t[s] + ";");
	}), c;
}
var registerStyles = function(t, o, s) {
	var c = t.key + "-" + o.name;
	(s === !1 || isBrowser === !1) && t.registered[c] === void 0 && (t.registered[c] = o.styles);
}, insertStyles = function(t, o, s) {
	registerStyles(t, o, s);
	var c = t.key + "-" + o.name;
	if (t.inserted[o.name] === void 0) {
		var l = o;
		do
			t.insert(o === l ? "." + c : "", l, t.sheet, !0), l = l.next;
		while (l !== void 0);
	}
};
function murmur2(t) {
	for (var o = 0, s, c = 0, l = t.length; l >= 4; ++c, l -= 4) s = t.charCodeAt(c) & 255 | (t.charCodeAt(++c) & 255) << 8 | (t.charCodeAt(++c) & 255) << 16 | (t.charCodeAt(++c) & 255) << 24, s = (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16), s ^= s >>> 24, o = (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16) ^ (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16);
	switch (l) {
		case 3: o ^= (t.charCodeAt(c + 2) & 255) << 16;
		case 2: o ^= (t.charCodeAt(c + 1) & 255) << 8;
		case 1: o ^= t.charCodeAt(c) & 255, o = (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16);
	}
	return o ^= o >>> 13, o = (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16), ((o ^ o >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
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
}, isDevelopment$1 = !1, hyphenateRegex = /[A-Z]|^ms/g, animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g, isCustomProperty = function(t) {
	return t.charCodeAt(1) === 45;
}, isProcessableValue = function(t) {
	return t != null && typeof t != "boolean";
}, processStyleName = /* @__PURE__ */ memoize(function(t) {
	return isCustomProperty(t) ? t : t.replace(hyphenateRegex, "-$&").toLowerCase();
}), processStyleValue = function(t, o) {
	switch (t) {
		case "animation":
		case "animationName": if (typeof o == "string") return o.replace(animationRegex, function(t, o, s) {
			return cursor = {
				name: o,
				styles: s,
				next: cursor
			}, o;
		});
	}
	return unitlessKeys[t] !== 1 && !isCustomProperty(t) && typeof o == "number" && o !== 0 ? o + "px" : o;
}, noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(t, o, s) {
	if (s == null) return "";
	var c = s;
	if (c.__emotion_styles !== void 0) return c;
	switch (typeof s) {
		case "boolean": return "";
		case "object":
			var l = s;
			if (l.anim === 1) return cursor = {
				name: l.name,
				styles: l.styles,
				next: cursor
			}, l.name;
			var u = s;
			if (u.styles !== void 0) {
				var d = u.next;
				if (d !== void 0) for (; d !== void 0;) cursor = {
					name: d.name,
					styles: d.styles,
					next: cursor
				}, d = d.next;
				return u.styles + ";";
			}
			return createStringFromObject(t, o, s);
		case "function":
			if (t !== void 0) {
				var f = cursor, p = s(t);
				return cursor = f, handleInterpolation(t, o, p);
			}
			break;
	}
	var m = s;
	if (o == null) return m;
	var h = o[m];
	return h === void 0 ? m : h;
}
function createStringFromObject(t, o, s) {
	var c = "";
	if (Array.isArray(s)) for (var l = 0; l < s.length; l++) c += handleInterpolation(t, o, s[l]) + ";";
	else for (var u in s) {
		var d = s[u];
		if (typeof d != "object") {
			var f = d;
			o != null && o[f] !== void 0 ? c += u + "{" + o[f] + "}" : isProcessableValue(f) && (c += processStyleName(u) + ":" + processStyleValue(u, f) + ";");
		} else {
			if (u === "NO_COMPONENT_SELECTOR" && isDevelopment$1) throw Error(noComponentSelectorMessage);
			if (Array.isArray(d) && typeof d[0] == "string" && (o == null || o[d[0]] === void 0)) for (var p = 0; p < d.length; p++) isProcessableValue(d[p]) && (c += processStyleName(u) + ":" + processStyleValue(u, d[p]) + ";");
			else {
				var m = handleInterpolation(t, o, d);
				switch (u) {
					case "animation":
					case "animationName":
						c += processStyleName(u) + ":" + m + ";";
						break;
					default: c += u + "{" + m + "}";
				}
			}
		}
	}
	return c;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g, cursor;
function serializeStyles(t, o, s) {
	if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0) return t[0];
	var c = !0, l = "";
	cursor = void 0;
	var u = t[0];
	u == null || u.raw === void 0 ? (c = !1, l += handleInterpolation(s, o, u)) : l += u[0];
	for (var d = 1; d < t.length; d++) l += handleInterpolation(s, o, t[d]), c && (l += u[d]);
	labelPattern.lastIndex = 0;
	for (var f = "", p; (p = labelPattern.exec(l)) !== null;) f += "-" + p[1];
	return {
		name: murmur2(l) + f,
		styles: l,
		next: cursor
	};
}
var syncFallback = function(t) {
	return t();
}, useInsertionEffect = import_react.useInsertionEffect ? import_react.useInsertionEffect : !1, useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
useInsertionEffect || import_react.useLayoutEffect;
var EmotionCacheContext = /* @__PURE__ */ import_react.createContext(typeof HTMLElement < "u" ? /* @__PURE__ */ createCache({ key: "css" }) : null);
EmotionCacheContext.Provider;
var withEmotionCache = function(t) {
	return /* @__PURE__ */ (0, import_react.forwardRef)(function(o, s) {
		return t(o, (0, import_react.useContext)(EmotionCacheContext), s);
	});
}, ThemeContext = /* @__PURE__ */ import_react.createContext({}), hasOwn = {}.hasOwnProperty, typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", createEmotionProps = function(t, o) {
	var s = {};
	for (var c in o) hasOwn.call(o, c) && (s[c] = o[c]);
	return s[typePropName] = t, s;
}, Insertion = function(t) {
	var o = t.cache, s = t.serialized, c = t.isStringTag;
	return registerStyles(o, s, c), useInsertionEffectAlwaysWithSyncFallback(function() {
		return insertStyles(o, s, c);
	}), null;
}, Emotion$1 = /* @__PURE__ */ withEmotionCache(function(t, o, s) {
	var c = t.css;
	typeof c == "string" && o.registered[c] !== void 0 && (c = o.registered[c]);
	var l = t[typePropName], d = [c], f = "";
	typeof t.className == "string" ? f = getRegisteredStyles(o.registered, d, t.className) : t.className != null && (f = t.className + " ");
	var p = serializeStyles(d, void 0, import_react.useContext(ThemeContext));
	f += o.key + "-" + p.name;
	var m = {};
	for (var h in t) hasOwn.call(t, h) && h !== "css" && h !== typePropName && (m[h] = t[h]);
	return m.className = f, s && (m.ref = s), /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(Insertion, {
		cache: o,
		serialized: p,
		isStringTag: typeof l == "string"
	}), /* @__PURE__ */ import_react.createElement(l, m));
});
require_hoist_non_react_statics_cjs();
var Fragment = import_jsx_runtime.Fragment, jsx = function(t, o, s) {
	return hasOwn.call(o, "css") ? import_jsx_runtime.jsx(Emotion$1, createEmotionProps(t, o), s) : import_jsx_runtime.jsx(t, o, s);
}, jsxs = function(t, o, s) {
	return hasOwn.call(o, "css") ? import_jsx_runtime.jsxs(Emotion$1, createEmotionProps(t, o), s) : import_jsx_runtime.jsxs(t, o, s);
};
function initMain(t, o, s) {
	t.render(/* @__PURE__ */ jsx(Main, {
		arg: o,
		inited: s
	}));
}
function Main({ arg: t, inited: o }) {
	let { heStage: s, sys: c, scrMng: l } = t, d = useStore((t) => t.title), f = useStore((t) => t.addTitle);
	useTitle_default(d);
	let p = useStore((t) => t.addLayer), h = useStore((t) => t.chgPic), g = useStore((t) => t.chgStr);
	function _() {
		l.go();
	}
	useEffectOnce_default(() => {
		f(c.cfg.oCfg.book.title);
		let t = Object.create(null);
		return l.attachTsx(() => s.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: p,
			chgPic: h,
			chgStr: g,
			addTitle: f
		}, t), o(), s.addEventListener("ev_next", _), () => s.removeEventListener("ev_next", _);
	});
	function v() {
		c.caretaker.nextKey() || _();
	}
	useKey_default("ArrowDown", (t) => {
		t.stopPropagation(), t.preventDefault(), v();
	});
	function b() {
		c.caretaker.prevKey();
	}
	useKey_default("ArrowUp", (t) => {
		t.stopPropagation(), t.preventDefault(), b();
	});
	function x() {
		if (isLong) {
			isLong = !1;
			return;
		}
		isDesignMode || v();
	}
	let S = (0, import_react.lazy)(() => import("./Stage.js"));
	return /* @__PURE__ */ jsx(import_react.Suspense, {
		fallback: /* @__PURE__ */ jsx(Fragment, { children: "Loading" }),
		children: /* @__PURE__ */ jsx(S, {
			arg: t,
			next: v,
			prev: b,
			onClick: x
		})
	});
}
var isDesignMode = !1;
const setDesignMode = (t) => isDesignMode = t;
var isLong = !1;
function onLong() {
	isLong = !0;
}
export { Main, createEmotionProps as a, require_hoist_non_react_statics_cjs as c, noop as d, off as f, Emotion$1 as i, initMain, useEffectOnce_default as l, useStore as m, jsx as n, hasOwn as o, onLong, on as p, jsxs as r, serializeStyles as s, setDesignMode, Fragment as t, isBrowser$1 as u };

//# sourceMappingURL=Main.js.map