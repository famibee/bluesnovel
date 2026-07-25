import { n as e, t } from "./rolldown-runtime.js";
import { t as n } from "./react.js";
import { n as r } from "./Filter.js";
//#region node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
var i = /* @__PURE__ */ e(n());
function a(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function o(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var s = /*#__PURE__*/ function() {
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
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(o(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = a(t);
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
}(), c = "-ms-", l = "-moz-", u = "-webkit-", d = "comm", f = "rule", p = "decl", m = "@import", h = "@keyframes", g = "@layer", _ = Math.abs, v = String.fromCharCode, y = Object.assign;
function b(e, t) {
	return T(e, 0) ^ 45 ? (((t << 2 ^ T(e, 0)) << 2 ^ T(e, 1)) << 2 ^ T(e, 2)) << 2 ^ T(e, 3) : 0;
}
function x(e) {
	return e.trim();
}
function S(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function C(e, t, n) {
	return e.replace(t, n);
}
function w(e, t) {
	return e.indexOf(t);
}
function T(e, t) {
	return e.charCodeAt(t) | 0;
}
function E(e, t, n) {
	return e.slice(t, n);
}
function D(e) {
	return e.length;
}
function O(e) {
	return e.length;
}
function k(e, t) {
	return t.push(e), e;
}
function A(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var j = 1, M = 1, N = 0, P = 0, F = 0, I = "";
function L(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: j,
		column: M,
		length: o,
		return: ""
	};
}
function R(e, t) {
	return y(L("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function ee() {
	return F;
}
function te() {
	return F = P > 0 ? T(I, --P) : 0, M--, F === 10 && (M = 1, j--), F;
}
function z() {
	return F = P < N ? T(I, P++) : 0, M++, F === 10 && (M = 1, j++), F;
}
function B() {
	return T(I, P);
}
function V() {
	return P;
}
function H(e, t) {
	return E(I, e, t);
}
function U(e) {
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
function ne(e) {
	return j = M = 1, N = D(I = e), P = 0, [];
}
function re(e) {
	return I = "", e;
}
function W(e) {
	return x(H(P - 1, oe(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function ie(e) {
	for (; (F = B()) && F < 33;) z();
	return U(e) > 2 || U(F) > 3 ? "" : " ";
}
function ae(e, t) {
	for (; --t && z() && !(F < 48 || F > 102 || F > 57 && F < 65 || F > 70 && F < 97););
	return H(e, V() + (t < 6 && B() == 32 && z() == 32));
}
function oe(e) {
	for (; z();) switch (F) {
		case e: return P;
		case 34:
		case 39:
			e !== 34 && e !== 39 && oe(F);
			break;
		case 40:
			e === 41 && oe(e);
			break;
		case 92:
			z();
			break;
	}
	return P;
}
function se(e, t) {
	for (; z() && e + F !== 57 && !(e + F === 84 && B() === 47););
	return "/*" + H(t, P - 1) + "*" + v(e === 47 ? e : z());
}
function ce(e) {
	for (; !U(B());) z();
	return H(e, P);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function le(e) {
	return re(ue("", null, null, null, [""], e = ne(e), 0, [0], e));
}
function ue(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, y = 0, b = "", x = i, S = a, E = r, O = b; g;) switch (m = y, y = z()) {
		case 40: if (m != 108 && T(O, d - 1) == 58) {
			w(O += C(W(y), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			O += W(y);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			O += ie(m);
			break;
		case 92:
			O += ae(V() - 1, 7);
			continue;
		case 47:
			switch (B()) {
				case 42:
				case 47:
					k(fe(se(z(), V()), t, n), c);
					break;
				default: O += "/";
			}
			break;
		case 123 * h: s[l++] = D(O) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (y) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (O = C(O, /\f/g, "")), p > 0 && D(O) - d && k(p > 32 ? pe(O + ";", r, n, d - 1) : pe(C(O, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: O += ";";
				default: if (k(E = de(O, t, n, l, u, i, s, b, x = [], S = [], d), a), y === 123) if (u === 0) ue(O, t, E, E, x, a, d, s, S);
				else switch (f === 99 && T(O, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						ue(e, E, E, r && k(de(e, E, E, 0, 0, i, s, b, i, x = [], d), S), i, S, d, s, r ? x : S);
						break;
					default: ue(O, E, E, E, [""], S, 0, s, S);
				}
			}
			l = u = p = 0, h = _ = 1, b = O = "", d = o;
			break;
		case 58: d = 1 + D(O), p = m;
		default:
			if (h < 1) {
				if (y == 123) --h;
				else if (y == 125 && h++ == 0 && te() == 125) continue;
			}
			switch (O += v(y), y * h) {
				case 38:
					_ = u > 0 ? 1 : (O += "\f", -1);
					break;
				case 44:
					s[l++] = (D(O) - 1) * _, _ = 1;
					break;
				case 64:
					B() === 45 && (O += W(z())), f = B(), u = d = D(b = O += ce(V())), y++;
					break;
				case 45: m === 45 && D(O) == 2 && (h = 0);
			}
	}
	return a;
}
function de(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, p = i === 0 ? a : [""], m = O(p), h = 0, g = 0, v = 0; h < r; ++h) for (var y = 0, b = E(e, d + 1, d = _(g = o[h])), S = e; y < m; ++y) (S = x(g > 0 ? p[y] + " " + b : C(b, /&\f/g, p[y]))) && (c[v++] = S);
	return L(e, t, n, i === 0 ? f : s, c, l, u);
}
function fe(e, t, n) {
	return L(e, t, n, d, v(ee()), E(e, 2, -2), 0);
}
function pe(e, t, n, r) {
	return L(e, t, n, p, E(e, 0, r), E(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function G(e, t) {
	for (var n = "", r = O(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function me(e, t, n, r) {
	switch (e.type) {
		case g: if (e.children.length) break;
		case m:
		case p: return e.return = e.return || e.value;
		case d: return "";
		case h: return e.return = e.value + "{" + G(e.children, r) + "}";
		case f: e.value = e.props.join(",");
	}
	return D(n = G(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function he(e) {
	var t = O(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function ge(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function _e(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var ve = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = B(), r === 38 && i === 12 && (t[n] = 1), !U(i);) z();
	return H(e, P);
}, ye = function(e, t) {
	var n = -1, r = 44;
	do
		switch (U(r)) {
			case 0:
				r === 38 && B() === 12 && (t[n] = 1), e[n] += ve(P - 1, t, n);
				break;
			case 2:
				e[n] += W(r);
				break;
			case 4: if (r === 44) {
				e[++n] = B() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += v(r);
		}
	while (r = z());
	return e;
}, be = function(e, t) {
	return re(ye(ne(e), t));
}, xe = /* #__PURE__ */ new WeakMap(), Se = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !xe.get(n)) && !r) {
			xe.set(e, !0);
			for (var i = [], a = be(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Ce = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function we(e, t) {
	switch (b(e, t)) {
		case 5103: return u + "print-" + e + e;
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
		case 3829: return u + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return u + e + l + e + c + e + e;
		case 6828:
		case 4268: return u + e + c + e + e;
		case 6165: return u + e + c + "flex-" + e + e;
		case 5187: return u + e + C(e, /(\w+).+(:[^]+)/, u + "box-$1$2" + c + "flex-$1$2") + e;
		case 5443: return u + e + c + "flex-item-" + C(e, /flex-|-self/, "") + e;
		case 4675: return u + e + c + "flex-line-pack" + C(e, /align-content|flex-|-self/, "") + e;
		case 5548: return u + e + c + C(e, "shrink", "negative") + e;
		case 5292: return u + e + c + C(e, "basis", "preferred-size") + e;
		case 6060: return u + "box-" + C(e, "-grow", "") + u + e + c + C(e, "grow", "positive") + e;
		case 4554: return u + C(e, /([^-])(transform)/g, "$1" + u + "$2") + e;
		case 6187: return C(C(C(e, /(zoom-|grab)/, u + "$1"), /(image-set)/, u + "$1"), e, "") + e;
		case 5495:
		case 3959: return C(e, /(image-set\([^]*)/, u + "$1$`$1");
		case 4968: return C(C(e, /(.+:)(flex-)?(.*)/, u + "box-pack:$3" + c + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + u + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return C(e, /(.+)-inline(.+)/, u + "$1$2") + e;
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
			if (D(e) - 1 - t > 6) switch (T(e, t + 1)) {
				case 109: if (T(e, t + 4) !== 45) break;
				case 102: return C(e, /(.+:)(.+)-([^]+)/, "$1" + u + "$2-$3$1" + l + (T(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~w(e, "stretch") ? we(C(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (T(e, t + 1) !== 115) break;
		case 6444:
			switch (T(e, D(e) - 3 - (~w(e, "!important") && 10))) {
				case 107: return C(e, ":", ":" + u) + e;
				case 101: return C(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + u + (T(e, 14) === 45 ? "inline-" : "") + "box$3$1" + u + "$2$3$1" + c + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (T(e, t + 11)) {
				case 114: return u + e + c + C(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return u + e + c + C(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return u + e + c + C(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return u + e + c + e + e;
	}
	return e;
}
var Te = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case p:
			e.return = we(e.value, e.length);
			break;
		case h: return G([R(e, { value: C(e.value, "@", "@" + u) })], r);
		case f: if (e.length) return A(e.props, function(t) {
			switch (S(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return G([R(e, { props: [C(t, /:(read-\w+)/, ":" + l + "$1")] })], r);
				case "::placeholder": return G([
					R(e, { props: [C(t, /:(plac\w+)/, ":" + u + "input-$1")] }),
					R(e, { props: [C(t, /:(plac\w+)/, ":" + l + "$1")] }),
					R(e, { props: [C(t, /:(plac\w+)/, c + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], Ee = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || Te, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var c, l = [Se, Ce], u, d = [me, ge(function(e) {
		u.insert(e);
	})], f = he(l.concat(r, d)), p = function(e) {
		return G(le(e), f);
	};
	c = function(e, t, n, r) {
		u = n, p(e ? e + "{" + t.styles + "}" : t.styles), r && (m.inserted[t.name] = !0);
	};
	var m = {
		key: t,
		sheet: new s({
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
		insert: c
	};
	return m.sheet.hydrate(o), m;
}, De = /* @__PURE__ */ t(((e) => {
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
})), Oe = /* @__PURE__ */ t(((e) => {
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
		function ee(e) {
			return x(e) === s;
		}
		function te(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function z(e) {
			return x(e) === d;
		}
		function B(e) {
			return x(e) === i;
		}
		function V(e) {
			return x(e) === h;
		}
		function H(e) {
			return x(e) === m;
		}
		function U(e) {
			return x(e) === r;
		}
		function ne(e) {
			return x(e) === o;
		}
		function re(e) {
			return x(e) === a;
		}
		function W(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = w, e.ContextProvider = T, e.Element = E, e.ForwardRef = D, e.Fragment = O, e.Lazy = k, e.Memo = A, e.Portal = j, e.Profiler = M, e.StrictMode = N, e.Suspense = P, e.isAsyncMode = I, e.isConcurrentMode = L, e.isContextConsumer = R, e.isContextProvider = ee, e.isElement = te, e.isForwardRef = z, e.isFragment = B, e.isLazy = V, e.isMemo = H, e.isPortal = U, e.isProfiler = ne, e.isStrictMode = re, e.isSuspense = W, e.isValidElementType = b, e.typeOf = x;
	})();
})), ke = /* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = De() : t.exports = Oe();
})), Ae = /* @__PURE__ */ t(((e, t) => {
	var n = ke(), r = {
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
function je(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var Me = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, Ne = function(e, t, n) {
	Me(e, t, n);
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
function Pe(e) {
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
var Fe = {
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
}, Ie = /[A-Z]|^ms/g, Le = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Re = function(e) {
	return e.charCodeAt(1) === 45;
}, ze = function(e) {
	return e != null && typeof e != "boolean";
}, Be = /* #__PURE__ */ _e(function(e) {
	return Re(e) ? e : e.replace(Ie, "-$&").toLowerCase();
}), Ve = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(Le, function(e, t, n) {
			return q = {
				name: t,
				styles: n,
				next: q
			}, t;
		});
	}
	return Fe[e] !== 1 && !Re(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function K(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return q = {
				name: i.name,
				styles: i.styles,
				next: q
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) q = {
					name: o.name,
					styles: o.styles,
					next: q
				}, o = o.next;
				return a.styles + ";";
			}
			return He(e, t, n);
		case "function":
			if (e !== void 0) {
				var s = q, c = n(e);
				return q = s, K(e, t, c);
			}
			break;
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function He(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += K(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : ze(s) && (r += Be(a) + ":" + Ve(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) ze(o[c]) && (r += Be(a) + ":" + Ve(a, o[c]) + ";");
		else {
			var l = K(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += Be(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var Ue = /label:\s*([^\s;{]+)\s*(;|$)/g, q;
function We(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	q = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += K(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += K(n, t, e[o]), r && (i += a[o]);
	Ue.lastIndex = 0;
	for (var s = "", c; (c = Ue.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: Pe(i) + s,
		styles: i,
		next: q
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var Ge = function(e) {
	return e();
}, Ke = i.useInsertionEffect ? i.useInsertionEffect : !1, qe = Ke || Ge;
Ke || i.useLayoutEffect;
var Je = /* #__PURE__ */ i.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ Ee({ key: "css" }) : null);
Je.Provider;
var Ye = function(e) {
	return /*#__PURE__*/ (0, i.forwardRef)(function(t, n) {
		return e(t, (0, i.useContext)(Je), n);
	});
}, Xe = /* #__PURE__ */ i.createContext({}), J = {}.hasOwnProperty, Ze = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Qe = function(e, t) {
	var n = {};
	for (var r in t) J.call(t, r) && (n[r] = t[r]);
	return n[Ze] = e, n;
}, $e = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Me(t, n, r), qe(function() {
		return Ne(t, n, r);
	}), null;
}, et = /* @__PURE__ */ Ye(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var a = e[Ze], o = [r], s = "";
	typeof e.className == "string" ? s = je(t.registered, o, e.className) : e.className != null && (s = e.className + " ");
	var c = We(o, void 0, i.useContext(Xe));
	s += t.key + "-" + c.name;
	var l = {};
	for (var u in e) J.call(e, u) && u !== "css" && u !== Ze && (l[u] = e[u]);
	return l.className = s, n && (l.ref = n), /*#__PURE__*/ i.createElement(i.Fragment, null, /*#__PURE__*/ i.createElement($e, {
		cache: t,
		serialized: c,
		isStringTag: typeof a == "string"
	}), /*#__PURE__*/ i.createElement(a, l));
});
Ae();
var tt = function(e, t) {
	var n = arguments;
	if (t == null || !J.call(t, "css")) return i.createElement.apply(void 0, n);
	var r = n.length, a = Array(r);
	a[0] = et, a[1] = Qe(e, t);
	for (var o = 2; o < r; o++) a[o] = n[o];
	return i.createElement.apply(null, a);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(tt ||= {});
function nt() {
	return We([...arguments]);
}
function rt() {
	var e = nt.apply(void 0, arguments), t = "animation-" + e.name;
	return {
		name: t,
		styles: "@keyframes " + t + "{" + e.styles + "}",
		anim: 1,
		toString: function() {
			return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
		}
	};
}
//#endregion
//#region src/components/Lay.ts
var it = [
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
function at(e) {
	let t = {};
	if (e.left !== void 0 && (t.left = `${String(e.left)}px`), e.top !== void 0 && (t.top = `${String(e.top)}px`), e.alpha !== void 0 && (t.opacity = e.alpha), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0) && (t.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, t.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (t.mixBlendMode = e.blendmode), e.aFlt !== void 0) {
		let n = r(e.aFlt);
		n && (t.filter = n);
	}
	return e.visible === !1 && (t.display = "none"), t;
}
var ot = !1, st = () => {
	ot = !0;
}, ct = () => {
	ot = !1;
}, lt = () => ot;
function ut({ img: e, fw: t, fh: n, cols: r, rows: i, sec: a, isCol: o }) {
	let s = rt`to {background-position-x: ${-r * t}px}`, c = rt`to {background-position-y: ${-i * n}px}`, l = o ? a : a / i, u = o ? a / r : a;
	return nt`
		width: ${t}px;
		height: ${n}px;
		background-image: url(${JSON.stringify(e)});
		background-repeat: no-repeat;
		background-position: 0 0;
		animation:
			${s} ${l}s steps(${r}) infinite,
			${c} ${u}s steps(${i}) infinite;
	`;
}
//#endregion
//#region node_modules/zustand/esm/vanilla.mjs
var dt = (e) => {
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
}, ft = ((e) => e ? dt(e) : dt), pt = (e) => e;
function mt(e, t = pt) {
	let n = i.useSyncExternalStore(e.subscribe, i.useCallback(() => t(e.getState()), [e, t]), i.useCallback(() => t(e.getInitialState()), [e, t]));
	return i.useDebugValue(n), n;
}
var ht = (e) => {
	let t = ft(e), n = (e) => mt(t, e);
	return Object.assign(n, t), n;
}, gt = ((e) => e ? ht(e) : ht);
//#endregion
//#region src/store/store.tsx
function Y(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function X(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function Z(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var Q = gt()((e, t) => ({
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
		let { idx: l, aLay: u } = Y(e, n), d = Z(u, t, "txt");
		if (r === void 0) r = `${a || s || "btn"}#${String(d.aBtn.length)}`;
		else if (d.aBtn.some((e) => e.nm === r)) throw `ボタン名 ${r} はレイヤ ${t} 内で既に使用されています`;
		return d.aBtn = [...d.aBtn, {
			nm: r,
			text: i,
			label: a,
			...o === void 0 ? {} : { call: o },
			...s === void 0 ? {} : { fn: s },
			...c === void 0 ? {} : { sty: c }
		}], X(e, l, u);
	}),
	chgPic: ({ nm: t, page: n, fn: r, src: i, aFace: a }) => e((e) => {
		let { idx: o, aLay: s } = Y(e, n), c = Z(s, t, "grp");
		return c.fn = r, c.src = i, c.aFace = a, X(e, o, s);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r, isFixed: i }) => e((e) => {
		let { idx: a, aLay: o } = Y(e, n), s = Z(o, t, "txt");
		return r !== void 0 && (s.b_alpha = r), i !== void 0 && (s.b_alpha_isfixed = i), X(e, a, o);
	}),
	chgBPic: ({ nm: t, page: n, fn: r, src: i }) => e((e) => {
		let { idx: a, aLay: o } = Y(e, n), s = Z(o, t, "txt");
		return s.b_pic = r, s.b_src = i, X(e, a, o);
	}),
	chgLay: ({ nm: t, page: n, sty: r }) => e((e) => {
		let { idx: i, aLay: a } = Y(e, n), o = a.find((e) => e.nm === t);
		if (!o) throw `存在しないレイヤ ${t} です`;
		if (o.cls !== "txt" && (r.b_color !== void 0 || r.style !== void 0 || r.ffs !== void 0 || r.noffs !== void 0 || r.bura !== void 0)) throw `${t} は文字レイヤではありません（b_color/style/ffs/noffs/buraは文字レイヤ専用）`;
		return Object.assign(o, r), X(e, i, a);
	}),
	getLaySty: (e, n) => {
		let r = t(), i = r.aPage[n === "fore" ? r.foreIdx : 1 - r.foreIdx].find((t) => t.nm === e);
		if (!i) throw `存在しないレイヤ ${e} です`;
		let a = {};
		for (let e of it) i[e] !== void 0 && Object.assign(a, { [e]: i[e] });
		return a;
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
		return Z(r, t, "txt").enabled = n, r;
	}) })),
	clearLay: ({ aLayNm: t, page: n }) => e((e) => {
		let r = (e) => {
			for (let t of it) t !== "visible" && delete e[t];
			e.cls === "grp" ? (e.fn = "", e.src = "", e.aFace = []) : (e.str = "", e.aCh = [], e.aBtn = [], delete e.b_color, delete e.style, delete e.ffs, delete e.noffs, delete e.bura, delete e.b_pic, delete e.b_src, delete e.b_alpha_isfixed, e.b_alpha = 1);
		}, i = (e) => {
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
			return i(t), t;
		}) };
		let { idx: a, aLay: o } = Y(e, n);
		return i(o), X(e, a, o);
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
		let { idx: l, aLay: u } = Y(e, n);
		return c(u), X(e, l, u);
	}),
	chgStr: ({ nm: t, page: n, str: r, aCh: i }) => e((e) => {
		let a = (e) => {
			let n = Z(e, t, "txt");
			n.str = r, n.aCh = i;
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return a(t), t;
		}) };
		let { idx: o, aLay: s } = Y(e, n);
		return a(s), X(e, o, s);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n }) => e((e) => {
		let r = 1 - e.foreIdx, i = e.aPage[e.foreIdx], a = X(e, r, e.aPage[r].map((e) => t && !t.includes(e.nm) ? structuredClone(i.find((t) => t.nm === e.nm) ?? e) : e));
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
	backAlpha: 1,
	setBackAlpha: (t) => e(() => ({ backAlpha: t })),
	skipReq: 0,
	requestSkip: () => e((e) => ({ skipReq: e.skipReq + 1 })),
	skipping: !1,
	setSkipping: (t) => e(() => ({ skipping: t })),
	wait: null,
	setWait: (t) => e(() => ({ wait: t }))
})), _t = function() {};
function vt(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function yt(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var bt = typeof window < "u", xt = function(e) {
	(0, i.useEffect)(e, []);
}, St = bt ? window : null, Ct = function(e) {
	return !!e.addEventListener;
}, wt = function(e) {
	return !!e.on;
}, Tt = function(e, t, n, r) {
	n === void 0 && (n = St), (0, i.useEffect)(function() {
		if (t && n) return Ct(n) ? vt(n, e, t, r) : wt(n) && n.on(e, t, r), function() {
			Ct(n) ? yt(n, e, t, r) : wt(n) && n.off(e, t, r);
		};
	}, [
		e,
		t,
		n,
		JSON.stringify(r)
	]);
}, Et = function(e) {
	return typeof e == "function" ? e : typeof e == "string" ? function(t) {
		return t.key === e;
	} : e ? function() {
		return !0;
	} : function() {
		return !1;
	};
}, Dt = function(e, t, n, r) {
	t === void 0 && (t = _t), n === void 0 && (n = {}), r === void 0 && (r = [e]);
	var a = n.event, o = a === void 0 ? "keydown" : a, s = n.target, c = n.options;
	Tt(o, (0, i.useMemo)(function() {
		var n = Et(e);
		return function(e) {
			if (n(e)) return t(e);
		};
	}, r), s, c);
}, Ot = { restoreOnUnmount: !1 };
function kt(e, t) {
	t === void 0 && (t = Ot);
	var n = (0, i.useRef)(document.title);
	document.title !== e && (document.title = e), (0, i.useEffect)(function() {
		if (t && t.restoreOnUnmount) return function() {
			document.title = n.current;
		};
	}, []);
}
var At = typeof document < "u" ? kt : function(e) {}, jt = /* @__PURE__ */ t(((e) => {
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
})), Mt = /* @__PURE__ */ t(((e) => {
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
		var h = n(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), A = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = Object.prototype.hasOwnProperty, M = Array.isArray, N = console.createTask ? console.createTask : function() {
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
})), $ = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = jt() : t.exports = Mt();
})))()), Nt = $.Fragment, Pt = function(e, t, n) {
	return J.call(t, "css") ? $.jsx(et, Qe(e, t), n) : $.jsx(e, t, n);
}, Ft = function(e, t, n) {
	return J.call(t, "css") ? $.jsxs(et, Qe(e, t), n) : $.jsxs(e, t, n);
}, It = (0, i.lazy)(() => import("./Stage.js"));
function Lt(e, t, n) {
	e.render(/* @__PURE__ */ Pt(Rt, {
		arg: t,
		inited: n
	}));
}
function Rt({ arg: e, inited: t }) {
	let { heStage: n, sys: r, scrMng: a } = e, o = Q((e) => e.title), s = Q((e) => e.addTitle);
	At(o);
	let c = Q((e) => e.addLayer), l = Q((e) => e.chgPic), u = Q((e) => e.chgBAlpha), d = Q((e) => e.chgStr), f = Q((e) => e.chgLay), p = Q((e) => e.getLaySty), m = Q((e) => e.getPages), h = Q((e) => e.chgBPic), g = Q((e) => e.setBackAlpha), _ = Q((e) => e.getPagesJson), v = Q((e) => e.replace), y = Q((e) => e.toggleFullScr), b = Q((e) => e.clearLay), x = Q((e) => e.moveLay), S = Q((e) => e.chgFilter), C = Q((e) => e.enableEvent), w = Q((e) => e.addBtn), T = Q((e) => e.setReadBack), E = Q((e) => e.isTyping), D = Q((e) => e.requestSkip), O = Q((e) => e.setWait), k = Q((e) => e.setSkipping), A = Q((e) => e.startTrans), j = Q((e) => e.finishTrans);
	function M() {
		a.go();
	}
	xt(() => {
		s(r.cfg.oCfg.book.title);
		let e = Object.create(null);
		return a.attachTsx(() => n.dispatchEvent(new CustomEvent("ev_next", {})), {
			addLayer: c,
			chgPic: l,
			chgBAlpha: u,
			chgBPic: h,
			setBackAlpha: g,
			chgStr: d,
			chgLay: f,
			getLaySty: p,
			getPages: m,
			getPagesJson: _,
			replace: v,
			clearLay: b,
			moveLay: x,
			chgFilter: S,
			enableEvent: C,
			addBtn: w,
			addTitle: s,
			toggleFullScr: y,
			setWait: O,
			requestSkip: D,
			setSkipping: k,
			startTrans: A,
			finishTrans: j
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
	function P() {
		r.caretaker.prevKey() && T(!r.caretaker.isLast());
	}
	Dt(() => !0, (e) => {
		a.cancelAuto();
		let t = zt(e);
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
				e.stopPropagation(), e.preventDefault(), N();
				break;
			case "PageUp":
				e.stopPropagation(), e.preventDefault(), P();
				break;
		}
	});
	function F() {
		if (Ht) {
			Ht = !1;
			return;
		}
		Bt || (a.cancelAuto(), !a.fireEvent("click") && N());
	}
	return /* @__PURE__ */ Pt(i.Suspense, {
		fallback: /* @__PURE__ */ Pt(Nt, { children: "Loading" }),
		children: /* @__PURE__ */ Pt(It, {
			arg: e,
			next: N,
			prev: P,
			onClick: F
		})
	});
}
function zt(e) {
	return (e.altKey && e.key !== "Alt" ? "alt+" : "") + (e.ctrlKey && e.key !== "Control" ? "ctrl+" : "") + (e.metaKey && e.key !== "Meta" ? "meta+" : "") + (e.shiftKey && e.key !== "Shift" ? "shift+" : "") + e.key.toLowerCase();
}
var Bt = !1, Vt = (e) => Bt = e, Ht = !1;
function Ut() {
	Ht = !0;
}
//#endregion
export { Rt as Main, bt as a, vt as c, lt as d, st as f, nt as h, xt as i, Lt as initMain, Q as l, at as m, Pt as n, _t as o, Ut as onLong, ut as p, Ft as r, yt as s, Vt as setDesignMode, Nt as t, ct as u };

//# sourceMappingURL=Main.js.map