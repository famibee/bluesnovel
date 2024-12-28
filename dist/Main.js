import { r as Pr } from "./index3.js";
import { g as qr } from "./_commonjsHelpers.js";
function Vr(e, r) {
  for (var t = 0; t < r.length; t++) {
    const o = r[t];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const a in o)
        if (a !== "default" && !(a in e)) {
          const i = Object.getOwnPropertyDescriptor(o, a);
          i && Object.defineProperty(e, a, i.get ? i : {
            enumerable: !0,
            get: () => o[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var Ie = { exports: {} }, ye = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ur;
function Gr() {
  if (ur) return ye;
  ur = 1;
  var e = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function t(o, a, i) {
    var c = null;
    if (i !== void 0 && (c = "" + i), a.key !== void 0 && (c = "" + a.key), "key" in a) {
      i = {};
      for (var f in a)
        f !== "key" && (i[f] = a[f]);
    } else i = a;
    return a = i.ref, {
      $$typeof: e,
      type: o,
      key: c,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return ye.Fragment = r, ye.jsx = t, ye.jsxs = t, ye;
}
var pe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lr;
function Hr() {
  return lr || (lr = 1, process.env.NODE_ENV !== "production" && function() {
    function e(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === Re ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case $:
          return "Fragment";
        case s:
          return "Portal";
        case ie:
          return "Profiler";
        case g:
          return "StrictMode";
        case ce:
          return "Suspense";
        case fe:
          return "SuspenseList";
      }
      if (typeof n == "object")
        switch (typeof n.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), n.$$typeof) {
          case _e:
            return (n.displayName || "Context") + ".Provider";
          case we:
            return (n._context.displayName || "Context") + ".Consumer";
          case se:
            var u = n.render;
            return n = n.displayName, n || (n = u.displayName || u.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case ue:
            return u = n.displayName || null, u !== null ? u : e(n.type) || "Memo";
          case le:
            u = n._payload, n = n._init;
            try {
              return e(n(u));
            } catch {
            }
        }
      return null;
    }
    function r(n) {
      return "" + n;
    }
    function t(n) {
      try {
        r(n);
        var u = !1;
      } catch {
        u = !0;
      }
      if (u) {
        u = console;
        var l = u.error, T = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return l.call(
          u,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          T
        ), r(n);
      }
    }
    function o() {
    }
    function a() {
      if (Z === 0) {
        Pe = console.log, Ae = console.info, Oe = console.warn, $e = console.error, Ne = console.group, Me = console.groupCollapsed, ke = console.groupEnd;
        var n = {
          configurable: !0,
          enumerable: !0,
          value: o,
          writable: !0
        };
        Object.defineProperties(console, {
          info: n,
          log: n,
          warn: n,
          error: n,
          group: n,
          groupCollapsed: n,
          groupEnd: n
        });
      }
      Z++;
    }
    function i() {
      if (Z--, Z === 0) {
        var n = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: H({}, n, { value: Pe }),
          info: H({}, n, { value: Ae }),
          warn: H({}, n, { value: Oe }),
          error: H({}, n, { value: $e }),
          group: H({}, n, { value: Ne }),
          groupCollapsed: H({}, n, { value: Me }),
          groupEnd: H({}, n, { value: ke })
        });
      }
      0 > Z && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function c(n) {
      if (d === void 0)
        try {
          throw Error();
        } catch (l) {
          var u = l.stack.trim().match(/\n( *(at )?)/);
          d = u && u[1] || "", ee = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + d + n + ee;
    }
    function f(n, u) {
      if (!n || K) return "";
      var l = re.get(n);
      if (l !== void 0) return l;
      K = !0, l = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var T = null;
      T = G.H, G.H = null, a();
      try {
        var Y = {
          DetermineComponentFrameRoot: function() {
            try {
              if (u) {
                var X = function() {
                  throw Error();
                };
                if (Object.defineProperty(X.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(X, []);
                  } catch (J) {
                    var je = J;
                  }
                  Reflect.construct(n, [], X);
                } else {
                  try {
                    X.call();
                  } catch (J) {
                    je = J;
                  }
                  n.call(X.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (J) {
                  je = J;
                }
                (X = n()) && typeof X.catch == "function" && X.catch(function() {
                });
              }
            } catch (J) {
              if (J && je && typeof J.stack == "string")
                return [J.stack, je.stack];
            }
            return [null, null];
          }
        };
        Y.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var k = Object.getOwnPropertyDescriptor(
          Y.DetermineComponentFrameRoot,
          "name"
        );
        k && k.configurable && Object.defineProperty(
          Y.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var E = Y.DetermineComponentFrameRoot(), B = E[0], te = E[1];
        if (B && te) {
          var W = B.split(`
`), Q = te.split(`
`);
          for (E = k = 0; k < W.length && !W[k].includes(
            "DetermineComponentFrameRoot"
          ); )
            k++;
          for (; E < Q.length && !Q[E].includes(
            "DetermineComponentFrameRoot"
          ); )
            E++;
          if (k === W.length || E === Q.length)
            for (k = W.length - 1, E = Q.length - 1; 1 <= k && 0 <= E && W[k] !== Q[E]; )
              E--;
          for (; 1 <= k && 0 <= E; k--, E--)
            if (W[k] !== Q[E]) {
              if (k !== 1 || E !== 1)
                do
                  if (k--, E--, 0 > E || W[k] !== Q[E]) {
                    var me = `
` + W[k].replace(
                      " at new ",
                      " at "
                    );
                    return n.displayName && me.includes("<anonymous>") && (me = me.replace("<anonymous>", n.displayName)), typeof n == "function" && re.set(n, me), me;
                  }
                while (1 <= k && 0 <= E);
              break;
            }
        }
      } finally {
        K = !1, G.H = T, i(), Error.prepareStackTrace = l;
      }
      return W = (W = n ? n.displayName || n.name : "") ? c(W) : "", typeof n == "function" && re.set(n, W), W;
    }
    function y(n) {
      if (n == null) return "";
      if (typeof n == "function") {
        var u = n.prototype;
        return f(
          n,
          !(!u || !u.isReactComponent)
        );
      }
      if (typeof n == "string") return c(n);
      switch (n) {
        case ce:
          return c("Suspense");
        case fe:
          return c("SuspenseList");
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case se:
            return n = f(n.render, !1), n;
          case ue:
            return y(n.type);
          case le:
            u = n._payload, n = n._init;
            try {
              return y(n(u));
            } catch {
            }
        }
      return "";
    }
    function m() {
      var n = G.A;
      return n === null ? null : n.getOwner();
    }
    function h(n) {
      if (de.call(n, "key")) {
        var u = Object.getOwnPropertyDescriptor(n, "key").get;
        if (u && u.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }
    function p(n, u) {
      function l() {
        ir || (ir = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          u
        ));
      }
      l.isReactWarning = !0, Object.defineProperty(n, "key", {
        get: l,
        configurable: !0
      });
    }
    function M() {
      var n = e(this.type);
      return sr[n] || (sr[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function A(n, u, l, T, Y, k) {
      return l = k.ref, n = {
        $$typeof: P,
        type: n,
        key: u,
        props: k,
        _owner: Y
      }, (l !== void 0 ? l : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: M
      }) : Object.defineProperty(n, "ref", { enumerable: !1, value: null }), n._store = {}, Object.defineProperty(n._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(n, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(n.props), Object.freeze(n)), n;
    }
    function b(n, u, l, T, Y, k) {
      if (typeof n == "string" || typeof n == "function" || n === $ || n === ie || n === g || n === ce || n === fe || n === Be || typeof n == "object" && n !== null && (n.$$typeof === le || n.$$typeof === ue || n.$$typeof === _e || n.$$typeof === we || n.$$typeof === se || n.$$typeof === Je || n.getModuleId !== void 0)) {
        var E = u.children;
        if (E !== void 0)
          if (T)
            if (ve(E)) {
              for (T = 0; T < E.length; T++)
                v(E[T], n);
              Object.freeze && Object.freeze(E);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else v(E, n);
      } else
        E = "", (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), n === null ? T = "null" : ve(n) ? T = "array" : n !== void 0 && n.$$typeof === P ? (T = "<" + (e(n.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : T = typeof n, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          T,
          E
        );
      if (de.call(u, "key")) {
        E = e(n);
        var B = Object.keys(u).filter(function(W) {
          return W !== "key";
        });
        T = 0 < B.length ? "{key: someKey, " + B.join(": ..., ") + ": ...}" : "{key: someKey}", cr[E + T] || (B = 0 < B.length ? "{" + B.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          T,
          E,
          B,
          E
        ), cr[E + T] = !0);
      }
      if (E = null, l !== void 0 && (t(l), E = "" + l), h(u) && (t(u.key), E = "" + u.key), "key" in u) {
        l = {};
        for (var te in u)
          te !== "key" && (l[te] = u[te]);
      } else l = u;
      return E && p(
        l,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), A(n, E, k, Y, m(), l);
    }
    function v(n, u) {
      if (typeof n == "object" && n && n.$$typeof !== Ur) {
        if (ve(n))
          for (var l = 0; l < n.length; l++) {
            var T = n[l];
            N(T) && S(T, u);
          }
        else if (N(n))
          n._store && (n._store.validated = 1);
        else if (n === null || typeof n != "object" ? l = null : (l = Ce && n[Ce] || n["@@iterator"], l = typeof l == "function" ? l : null), typeof l == "function" && l !== n.entries && (l = l.call(n), l !== n))
          for (; !(n = l.next()).done; )
            N(n.value) && S(n.value, u);
      }
    }
    function N(n) {
      return typeof n == "object" && n !== null && n.$$typeof === P;
    }
    function S(n, u) {
      if (n._store && !n._store.validated && n.key == null && (n._store.validated = 1, u = O(u), !fr[u])) {
        fr[u] = !0;
        var l = "";
        n && n._owner != null && n._owner !== m() && (l = null, typeof n._owner.tag == "number" ? l = e(n._owner.type) : typeof n._owner.name == "string" && (l = n._owner.name), l = " It was passed a child from " + l + ".");
        var T = G.getCurrentStack;
        G.getCurrentStack = function() {
          var Y = y(n.type);
          return T && (Y += T() || ""), Y;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          u,
          l
        ), G.getCurrentStack = T;
      }
    }
    function O(n) {
      var u = "", l = m();
      return l && (l = e(l.type)) && (u = `

Check the render method of \`` + l + "`."), u || (n = e(n)) && (u = `

Check the top-level render call using <` + n + ">."), u;
    }
    var x = Pr(), P = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), $ = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), ie = Symbol.for("react.profiler"), we = Symbol.for("react.consumer"), _e = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), ce = Symbol.for("react.suspense"), fe = Symbol.for("react.suspense_list"), ue = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), Be = Symbol.for("react.offscreen"), Ce = Symbol.iterator, Re = Symbol.for("react.client.reference"), G = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = Object.prototype.hasOwnProperty, H = Object.assign, Je = Symbol.for("react.client.reference"), ve = Array.isArray, Z = 0, Pe, Ae, Oe, $e, Ne, Me, ke;
    o.__reactDisabledLog = !0;
    var d, ee, K = !1, re = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ur = Symbol.for("react.client.reference"), ir, sr = {}, cr = {}, fr = {};
    pe.Fragment = $, pe.jsx = function(n, u, l, T, Y) {
      return b(n, u, l, !1, T, Y);
    }, pe.jsxs = function(n, u, l, T, Y) {
      return b(n, u, l, !0, T, Y);
    };
  }()), pe;
}
var dr;
function Br() {
  return dr || (dr = 1, process.env.NODE_ENV === "production" ? Ie.exports = Gr() : Ie.exports = Hr()), Ie.exports;
}
var be = Br(), I = Pr();
const Ze = /* @__PURE__ */ qr(I), vr = /* @__PURE__ */ Vr({
  __proto__: null,
  default: Ze
}, [I]);
var Jr = !1;
function Kr(e) {
  if (e.sheet)
    return e.sheet;
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === e)
      return document.styleSheets[r];
}
function Xr(e) {
  var r = document.createElement("style");
  return r.setAttribute("data-emotion", e.key), e.nonce !== void 0 && r.setAttribute("nonce", e.nonce), r.appendChild(document.createTextNode("")), r.setAttribute("data-s", ""), r;
}
var Zr = /* @__PURE__ */ function() {
  function e(t) {
    var o = this;
    this._insertTag = function(a) {
      var i;
      o.tags.length === 0 ? o.insertionPoint ? i = o.insertionPoint.nextSibling : o.prepend ? i = o.container.firstChild : i = o.before : i = o.tags[o.tags.length - 1].nextSibling, o.container.insertBefore(a, i), o.tags.push(a);
    }, this.isSpeedy = t.speedy === void 0 ? !Jr : t.speedy, this.tags = [], this.ctr = 0, this.nonce = t.nonce, this.key = t.key, this.container = t.container, this.prepend = t.prepend, this.insertionPoint = t.insertionPoint, this.before = null;
  }
  var r = e.prototype;
  return r.hydrate = function(o) {
    o.forEach(this._insertTag);
  }, r.insert = function(o) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Xr(this));
    var a = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var i = Kr(a);
      try {
        i.insertRule(o, i.cssRules.length);
      } catch {
      }
    } else
      a.appendChild(document.createTextNode(o));
    this.ctr++;
  }, r.flush = function() {
    this.tags.forEach(function(o) {
      var a;
      return (a = o.parentNode) == null ? void 0 : a.removeChild(o);
    }), this.tags = [], this.ctr = 0;
  }, e;
}(), F = "-ms-", Ue = "-moz-", w = "-webkit-", Ar = "comm", nr = "rule", or = "decl", Qr = "@import", Or = "@keyframes", et = "@layer", rt = Math.abs, qe = String.fromCharCode, tt = Object.assign;
function nt(e, r) {
  return L(e, 0) ^ 45 ? (((r << 2 ^ L(e, 0)) << 2 ^ L(e, 1)) << 2 ^ L(e, 2)) << 2 ^ L(e, 3) : 0;
}
function $r(e) {
  return e.trim();
}
function ot(e, r) {
  return (e = r.exec(e)) ? e[0] : e;
}
function _(e, r, t) {
  return e.replace(r, t);
}
function Qe(e, r) {
  return e.indexOf(r);
}
function L(e, r) {
  return e.charCodeAt(r) | 0;
}
function ge(e, r, t) {
  return e.slice(r, t);
}
function U(e) {
  return e.length;
}
function ar(e) {
  return e.length;
}
function Le(e, r) {
  return r.push(e), e;
}
function at(e, r) {
  return e.map(r).join("");
}
var Ve = 1, oe = 1, Nr = 0, z = 0, j = 0, ae = "";
function Ge(e, r, t, o, a, i, c) {
  return { value: e, root: r, parent: t, type: o, props: a, children: i, line: Ve, column: oe, length: c, return: "" };
}
function he(e, r) {
  return tt(Ge("", null, null, "", null, null, 0), e, { length: -e.length }, r);
}
function it() {
  return j;
}
function st() {
  return j = z > 0 ? L(ae, --z) : 0, oe--, j === 10 && (oe = 1, Ve--), j;
}
function D() {
  return j = z < Nr ? L(ae, z++) : 0, oe++, j === 10 && (oe = 1, Ve++), j;
}
function V() {
  return L(ae, z);
}
function Fe() {
  return z;
}
function Te(e, r) {
  return ge(ae, e, r);
}
function Se(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Mr(e) {
  return Ve = oe = 1, Nr = U(ae = e), z = 0, [];
}
function kr(e) {
  return ae = "", e;
}
function We(e) {
  return $r(Te(z - 1, er(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function ct(e) {
  for (; (j = V()) && j < 33; )
    D();
  return Se(e) > 2 || Se(j) > 3 ? "" : " ";
}
function ft(e, r) {
  for (; --r && D() && !(j < 48 || j > 102 || j > 57 && j < 65 || j > 70 && j < 97); )
    ;
  return Te(e, Fe() + (r < 6 && V() == 32 && D() == 32));
}
function er(e) {
  for (; D(); )
    switch (j) {
      // ] ) " '
      case e:
        return z;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && er(j);
        break;
      // (
      case 40:
        e === 41 && er(e);
        break;
      // \
      case 92:
        D();
        break;
    }
  return z;
}
function ut(e, r) {
  for (; D() && e + j !== 57; )
    if (e + j === 84 && V() === 47)
      break;
  return "/*" + Te(r, z - 1) + "*" + qe(e === 47 ? e : D());
}
function lt(e) {
  for (; !Se(V()); )
    D();
  return Te(e, z);
}
function dt(e) {
  return kr(ze("", null, null, null, [""], e = Mr(e), 0, [0], e));
}
function ze(e, r, t, o, a, i, c, f, y) {
  for (var m = 0, h = 0, p = c, M = 0, A = 0, b = 0, v = 1, N = 1, S = 1, O = 0, x = "", P = a, s = i, $ = o, g = x; N; )
    switch (b = O, O = D()) {
      // (
      case 40:
        if (b != 108 && L(g, p - 1) == 58) {
          Qe(g += _(We(O), "&", "&\f"), "&\f") != -1 && (S = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        g += We(O);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        g += ct(b);
        break;
      // \
      case 92:
        g += ft(Fe() - 1, 7);
        continue;
      // /
      case 47:
        switch (V()) {
          case 42:
          case 47:
            Le(vt(ut(D(), Fe()), r, t), y);
            break;
          default:
            g += "/";
        }
        break;
      // {
      case 123 * v:
        f[m++] = U(g) * S;
      // } ; \0
      case 125 * v:
      case 59:
      case 0:
        switch (O) {
          // \0 }
          case 0:
          case 125:
            N = 0;
          // ;
          case 59 + h:
            S == -1 && (g = _(g, /\f/g, "")), A > 0 && U(g) - p && Le(A > 32 ? yr(g + ";", o, t, p - 1) : yr(_(g, " ", "") + ";", o, t, p - 2), y);
            break;
          // @ ;
          case 59:
            g += ";";
          // { rule/at-rule
          default:
            if (Le($ = mr(g, r, t, m, h, a, f, x, P = [], s = [], p), i), O === 123)
              if (h === 0)
                ze(g, r, $, $, P, i, p, f, s);
              else
                switch (M === 99 && L(g, 3) === 110 ? 100 : M) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    ze(e, $, $, o && Le(mr(e, $, $, 0, 0, a, f, x, a, P = [], p), s), a, s, p, f, o ? P : s);
                    break;
                  default:
                    ze(g, $, $, $, [""], s, 0, f, s);
                }
        }
        m = h = A = 0, v = S = 1, x = g = "", p = c;
        break;
      // :
      case 58:
        p = 1 + U(g), A = b;
      default:
        if (v < 1) {
          if (O == 123)
            --v;
          else if (O == 125 && v++ == 0 && st() == 125)
            continue;
        }
        switch (g += qe(O), O * v) {
          // &
          case 38:
            S = h > 0 ? 1 : (g += "\f", -1);
            break;
          // ,
          case 44:
            f[m++] = (U(g) - 1) * S, S = 1;
            break;
          // @
          case 64:
            V() === 45 && (g += We(D())), M = V(), h = p = U(x = g += lt(Fe())), O++;
            break;
          // -
          case 45:
            b === 45 && U(g) == 2 && (v = 0);
        }
    }
  return i;
}
function mr(e, r, t, o, a, i, c, f, y, m, h) {
  for (var p = a - 1, M = a === 0 ? i : [""], A = ar(M), b = 0, v = 0, N = 0; b < o; ++b)
    for (var S = 0, O = ge(e, p + 1, p = rt(v = c[b])), x = e; S < A; ++S)
      (x = $r(v > 0 ? M[S] + " " + O : _(O, /&\f/g, M[S]))) && (y[N++] = x);
  return Ge(e, r, t, a === 0 ? nr : f, y, m, h);
}
function vt(e, r, t) {
  return Ge(e, r, t, Ar, qe(it()), ge(e, 2, -2), 0);
}
function yr(e, r, t, o) {
  return Ge(e, r, t, or, ge(e, 0, o), ge(e, o + 1, -1), o);
}
function ne(e, r) {
  for (var t = "", o = ar(e), a = 0; a < o; a++)
    t += r(e[a], a, e, r) || "";
  return t;
}
function mt(e, r, t, o) {
  switch (e.type) {
    case et:
      if (e.children.length) break;
    case Qr:
    case or:
      return e.return = e.return || e.value;
    case Ar:
      return "";
    case Or:
      return e.return = e.value + "{" + ne(e.children, o) + "}";
    case nr:
      e.value = e.props.join(",");
  }
  return U(t = ne(e.children, o)) ? e.return = e.value + "{" + t + "}" : "";
}
function yt(e) {
  var r = ar(e);
  return function(t, o, a, i) {
    for (var c = "", f = 0; f < r; f++)
      c += e[f](t, o, a, i) || "";
    return c;
  };
}
function pt(e) {
  return function(r) {
    r.root || (r = r.return) && e(r);
  };
}
function ht(e) {
  var r = /* @__PURE__ */ Object.create(null);
  return function(t) {
    return r[t] === void 0 && (r[t] = e(t)), r[t];
  };
}
var Et = function(r, t, o) {
  for (var a = 0, i = 0; a = i, i = V(), a === 38 && i === 12 && (t[o] = 1), !Se(i); )
    D();
  return Te(r, z);
}, bt = function(r, t) {
  var o = -1, a = 44;
  do
    switch (Se(a)) {
      case 0:
        a === 38 && V() === 12 && (t[o] = 1), r[o] += Et(z - 1, t, o);
        break;
      case 2:
        r[o] += We(a);
        break;
      case 4:
        if (a === 44) {
          r[++o] = V() === 58 ? "&\f" : "", t[o] = r[o].length;
          break;
        }
      // fallthrough
      default:
        r[o] += qe(a);
    }
  while (a = D());
  return r;
}, gt = function(r, t) {
  return kr(bt(Mr(r), t));
}, pr = /* @__PURE__ */ new WeakMap(), St = function(r) {
  if (!(r.type !== "rule" || !r.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r.length < 1)) {
    for (var t = r.value, o = r.parent, a = r.column === o.column && r.line === o.line; o.type !== "rule"; )
      if (o = o.parent, !o) return;
    if (!(r.props.length === 1 && t.charCodeAt(0) !== 58 && !pr.get(o)) && !a) {
      pr.set(r, !0);
      for (var i = [], c = gt(t, i), f = o.props, y = 0, m = 0; y < c.length; y++)
        for (var h = 0; h < f.length; h++, m++)
          r.props[m] = i[y] ? c[y].replace(/&\f/g, f[h]) : f[h] + " " + c[y];
    }
  }
}, xt = function(r) {
  if (r.type === "decl") {
    var t = r.value;
    // charcode for l
    t.charCodeAt(0) === 108 && // charcode for b
    t.charCodeAt(2) === 98 && (r.return = "", r.value = "");
  }
};
function jr(e, r) {
  switch (nt(e, r)) {
    // color-adjust
    case 5103:
      return w + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return w + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return w + e + Ue + e + F + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return w + e + F + e + e;
    // order
    case 6165:
      return w + e + F + "flex-" + e + e;
    // align-items
    case 5187:
      return w + e + _(e, /(\w+).+(:[^]+)/, w + "box-$1$2" + F + "flex-$1$2") + e;
    // align-self
    case 5443:
      return w + e + F + "flex-item-" + _(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return w + e + F + "flex-line-pack" + _(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return w + e + F + _(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return w + e + F + _(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return w + "box-" + _(e, "-grow", "") + w + e + F + _(e, "grow", "positive") + e;
    // transition
    case 4554:
      return w + _(e, /([^-])(transform)/g, "$1" + w + "$2") + e;
    // cursor
    case 6187:
      return _(_(_(e, /(zoom-|grab)/, w + "$1"), /(image-set)/, w + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return _(e, /(image-set\([^]*)/, w + "$1$`$1");
    // justify-content
    case 4968:
      return _(_(e, /(.+:)(flex-)?(.*)/, w + "box-pack:$3" + F + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + w + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return _(e, /(.+)-inline(.+)/, w + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
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
      if (U(e) - 1 - r > 6) switch (L(e, r + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (L(e, r + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return _(e, /(.+:)(.+)-([^]+)/, "$1" + w + "$2-$3$1" + Ue + (L(e, r + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~Qe(e, "stretch") ? jr(_(e, "stretch", "fill-available"), r) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (L(e, r + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (L(e, U(e) - 3 - (~Qe(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return _(e, ":", ":" + w) + e;
        // (inline-)?fl(e)x
        case 101:
          return _(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + w + (L(e, 14) === 45 ? "inline-" : "") + "box$3$1" + w + "$2$3$1" + F + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (L(e, r + 11)) {
        // vertical-l(r)
        case 114:
          return w + e + F + _(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return w + e + F + _(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return w + e + F + _(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return w + e + F + e + e;
  }
  return e;
}
var Tt = function(r, t, o, a) {
  if (r.length > -1 && !r.return) switch (r.type) {
    case or:
      r.return = jr(r.value, r.length);
      break;
    case Or:
      return ne([he(r, {
        value: _(r.value, "@", "@" + w)
      })], a);
    case nr:
      if (r.length) return at(r.props, function(i) {
        switch (ot(i, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return ne([he(r, {
              props: [_(i, /:(read-\w+)/, ":" + Ue + "$1")]
            })], a);
          // :placeholder
          case "::placeholder":
            return ne([he(r, {
              props: [_(i, /:(plac\w+)/, ":" + w + "input-$1")]
            }), he(r, {
              props: [_(i, /:(plac\w+)/, ":" + Ue + "$1")]
            }), he(r, {
              props: [_(i, /:(plac\w+)/, F + "input-$1")]
            })], a);
        }
        return "";
      });
  }
}, wt = [Tt], _t = function(r) {
  var t = r.key;
  if (t === "css") {
    var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(o, function(v) {
      var N = v.getAttribute("data-emotion");
      N.indexOf(" ") !== -1 && (document.head.appendChild(v), v.setAttribute("data-s", ""));
    });
  }
  var a = r.stylisPlugins || wt, i = {}, c, f = [];
  c = r.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + t + ' "]'),
    function(v) {
      for (var N = v.getAttribute("data-emotion").split(" "), S = 1; S < N.length; S++)
        i[N[S]] = !0;
      f.push(v);
    }
  );
  var y, m = [St, xt];
  {
    var h, p = [mt, pt(function(v) {
      h.insert(v);
    })], M = yt(m.concat(a, p)), A = function(N) {
      return ne(dt(N), M);
    };
    y = function(N, S, O, x) {
      h = O, A(N ? N + "{" + S.styles + "}" : S.styles), x && (b.inserted[S.name] = !0);
    };
  }
  var b = {
    key: t,
    sheet: new Zr({
      key: t,
      container: c,
      nonce: r.nonce,
      speedy: r.speedy,
      prepend: r.prepend,
      insertionPoint: r.insertionPoint
    }),
    nonce: r.nonce,
    inserted: i,
    registered: {},
    insert: y
  };
  return b.sheet.hydrate(f), b;
}, Ye = { exports: {} }, C = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hr;
function Ct() {
  if (hr) return C;
  hr = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, f = e ? Symbol.for("react.context") : 60110, y = e ? Symbol.for("react.async_mode") : 60111, m = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, M = e ? Symbol.for("react.suspense_list") : 60120, A = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, N = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
  function x(s) {
    if (typeof s == "object" && s !== null) {
      var $ = s.$$typeof;
      switch ($) {
        case r:
          switch (s = s.type, s) {
            case y:
            case m:
            case o:
            case i:
            case a:
            case p:
              return s;
            default:
              switch (s = s && s.$$typeof, s) {
                case f:
                case h:
                case b:
                case A:
                case c:
                  return s;
                default:
                  return $;
              }
          }
        case t:
          return $;
      }
    }
  }
  function P(s) {
    return x(s) === m;
  }
  return C.AsyncMode = y, C.ConcurrentMode = m, C.ContextConsumer = f, C.ContextProvider = c, C.Element = r, C.ForwardRef = h, C.Fragment = o, C.Lazy = b, C.Memo = A, C.Portal = t, C.Profiler = i, C.StrictMode = a, C.Suspense = p, C.isAsyncMode = function(s) {
    return P(s) || x(s) === y;
  }, C.isConcurrentMode = P, C.isContextConsumer = function(s) {
    return x(s) === f;
  }, C.isContextProvider = function(s) {
    return x(s) === c;
  }, C.isElement = function(s) {
    return typeof s == "object" && s !== null && s.$$typeof === r;
  }, C.isForwardRef = function(s) {
    return x(s) === h;
  }, C.isFragment = function(s) {
    return x(s) === o;
  }, C.isLazy = function(s) {
    return x(s) === b;
  }, C.isMemo = function(s) {
    return x(s) === A;
  }, C.isPortal = function(s) {
    return x(s) === t;
  }, C.isProfiler = function(s) {
    return x(s) === i;
  }, C.isStrictMode = function(s) {
    return x(s) === a;
  }, C.isSuspense = function(s) {
    return x(s) === p;
  }, C.isValidElementType = function(s) {
    return typeof s == "string" || typeof s == "function" || s === o || s === m || s === i || s === a || s === p || s === M || typeof s == "object" && s !== null && (s.$$typeof === b || s.$$typeof === A || s.$$typeof === c || s.$$typeof === f || s.$$typeof === h || s.$$typeof === N || s.$$typeof === S || s.$$typeof === O || s.$$typeof === v);
  }, C.typeOf = x, C;
}
var R = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Er;
function Rt() {
  return Er || (Er = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, f = e ? Symbol.for("react.context") : 60110, y = e ? Symbol.for("react.async_mode") : 60111, m = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, M = e ? Symbol.for("react.suspense_list") : 60120, A = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, N = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
    function x(d) {
      return typeof d == "string" || typeof d == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      d === o || d === m || d === i || d === a || d === p || d === M || typeof d == "object" && d !== null && (d.$$typeof === b || d.$$typeof === A || d.$$typeof === c || d.$$typeof === f || d.$$typeof === h || d.$$typeof === N || d.$$typeof === S || d.$$typeof === O || d.$$typeof === v);
    }
    function P(d) {
      if (typeof d == "object" && d !== null) {
        var ee = d.$$typeof;
        switch (ee) {
          case r:
            var K = d.type;
            switch (K) {
              case y:
              case m:
              case o:
              case i:
              case a:
              case p:
                return K;
              default:
                var re = K && K.$$typeof;
                switch (re) {
                  case f:
                  case h:
                  case b:
                  case A:
                  case c:
                    return re;
                  default:
                    return ee;
                }
            }
          case t:
            return ee;
        }
      }
    }
    var s = y, $ = m, g = f, ie = c, we = r, _e = h, se = o, ce = b, fe = A, ue = t, le = i, Be = a, Ce = p, Re = !1;
    function G(d) {
      return Re || (Re = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), de(d) || P(d) === y;
    }
    function de(d) {
      return P(d) === m;
    }
    function H(d) {
      return P(d) === f;
    }
    function Je(d) {
      return P(d) === c;
    }
    function ve(d) {
      return typeof d == "object" && d !== null && d.$$typeof === r;
    }
    function Z(d) {
      return P(d) === h;
    }
    function Pe(d) {
      return P(d) === o;
    }
    function Ae(d) {
      return P(d) === b;
    }
    function Oe(d) {
      return P(d) === A;
    }
    function $e(d) {
      return P(d) === t;
    }
    function Ne(d) {
      return P(d) === i;
    }
    function Me(d) {
      return P(d) === a;
    }
    function ke(d) {
      return P(d) === p;
    }
    R.AsyncMode = s, R.ConcurrentMode = $, R.ContextConsumer = g, R.ContextProvider = ie, R.Element = we, R.ForwardRef = _e, R.Fragment = se, R.Lazy = ce, R.Memo = fe, R.Portal = ue, R.Profiler = le, R.StrictMode = Be, R.Suspense = Ce, R.isAsyncMode = G, R.isConcurrentMode = de, R.isContextConsumer = H, R.isContextProvider = Je, R.isElement = ve, R.isForwardRef = Z, R.isFragment = Pe, R.isLazy = Ae, R.isMemo = Oe, R.isPortal = $e, R.isProfiler = Ne, R.isStrictMode = Me, R.isSuspense = ke, R.isValidElementType = x, R.typeOf = P;
  }()), R;
}
var br;
function Pt() {
  return br || (br = 1, process.env.NODE_ENV === "production" ? Ye.exports = Ct() : Ye.exports = Rt()), Ye.exports;
}
var Ke, gr;
function At() {
  if (gr) return Ke;
  gr = 1;
  var e = Pt(), r = {
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
  }, t = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, o = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, a = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, i = {};
  i[e.ForwardRef] = o, i[e.Memo] = a;
  function c(b) {
    return e.isMemo(b) ? a : i[b.$$typeof] || r;
  }
  var f = Object.defineProperty, y = Object.getOwnPropertyNames, m = Object.getOwnPropertySymbols, h = Object.getOwnPropertyDescriptor, p = Object.getPrototypeOf, M = Object.prototype;
  function A(b, v, N) {
    if (typeof v != "string") {
      if (M) {
        var S = p(v);
        S && S !== M && A(b, S, N);
      }
      var O = y(v);
      m && (O = O.concat(m(v)));
      for (var x = c(b), P = c(v), s = 0; s < O.length; ++s) {
        var $ = O[s];
        if (!t[$] && !(N && N[$]) && !(P && P[$]) && !(x && x[$])) {
          var g = h(v, $);
          try {
            f(b, $, g);
          } catch {
          }
        }
      }
    }
    return b;
  }
  return Ke = A, Ke;
}
At();
var Ot = !0;
function $t(e, r, t) {
  var o = "";
  return t.split(" ").forEach(function(a) {
    e[a] !== void 0 ? r.push(e[a] + ";") : a && (o += a + " ");
  }), o;
}
var Ir = function(r, t, o) {
  var a = r.key + "-" + t.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (o === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  Ot === !1) && r.registered[a] === void 0 && (r.registered[a] = t.styles);
}, Nt = function(r, t, o) {
  Ir(r, t, o);
  var a = r.key + "-" + t.name;
  if (r.inserted[t.name] === void 0) {
    var i = t;
    do
      r.insert(t === i ? "." + a : "", i, r.sheet, !0), i = i.next;
    while (i !== void 0);
  }
};
function Mt(e) {
  for (var r = 0, t, o = 0, a = e.length; a >= 4; ++o, a -= 4)
    t = e.charCodeAt(o) & 255 | (e.charCodeAt(++o) & 255) << 8 | (e.charCodeAt(++o) & 255) << 16 | (e.charCodeAt(++o) & 255) << 24, t = /* Math.imul(k, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), t ^= /* k >>> r: */
    t >>> 24, r = /* Math.imul(k, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  switch (a) {
    case 3:
      r ^= (e.charCodeAt(o + 2) & 255) << 16;
    case 2:
      r ^= (e.charCodeAt(o + 1) & 255) << 8;
    case 1:
      r ^= e.charCodeAt(o) & 255, r = /* Math.imul(h, m): */
      (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  }
  return r ^= r >>> 13, r = /* Math.imul(h, m): */
  (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), ((r ^ r >>> 15) >>> 0).toString(36);
}
var kt = {
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
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, jt = !1, It = /[A-Z]|^ms/g, Lt = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Lr = function(r) {
  return r.charCodeAt(1) === 45;
}, Sr = function(r) {
  return r != null && typeof r != "boolean";
}, Xe = /* @__PURE__ */ ht(function(e) {
  return Lr(e) ? e : e.replace(It, "-$&").toLowerCase();
}), xr = function(r, t) {
  switch (r) {
    case "animation":
    case "animationName":
      if (typeof t == "string")
        return t.replace(Lt, function(o, a, i) {
          return q = {
            name: a,
            styles: i,
            next: q
          }, a;
        });
  }
  return kt[r] !== 1 && !Lr(r) && typeof t == "number" && t !== 0 ? t + "px" : t;
}, Yt = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function xe(e, r, t) {
  if (t == null)
    return "";
  var o = t;
  if (o.__emotion_styles !== void 0)
    return o;
  switch (typeof t) {
    case "boolean":
      return "";
    case "object": {
      var a = t;
      if (a.anim === 1)
        return q = {
          name: a.name,
          styles: a.styles,
          next: q
        }, a.name;
      var i = t;
      if (i.styles !== void 0) {
        var c = i.next;
        if (c !== void 0)
          for (; c !== void 0; )
            q = {
              name: c.name,
              styles: c.styles,
              next: q
            }, c = c.next;
        var f = i.styles + ";";
        return f;
      }
      return Ft(e, r, t);
    }
    case "function": {
      if (e !== void 0) {
        var y = q, m = t(e);
        return q = y, xe(e, r, m);
      }
      break;
    }
  }
  var h = t;
  return h;
}
function Ft(e, r, t) {
  var o = "";
  if (Array.isArray(t))
    for (var a = 0; a < t.length; a++)
      o += xe(e, r, t[a]) + ";";
  else
    for (var i in t) {
      var c = t[i];
      if (typeof c != "object") {
        var f = c;
        Sr(f) && (o += Xe(i) + ":" + xr(i, f) + ";");
      } else {
        if (i === "NO_COMPONENT_SELECTOR" && jt)
          throw new Error(Yt);
        if (Array.isArray(c) && typeof c[0] == "string" && r == null)
          for (var y = 0; y < c.length; y++)
            Sr(c[y]) && (o += Xe(i) + ":" + xr(i, c[y]) + ";");
        else {
          var m = xe(e, r, c);
          switch (i) {
            case "animation":
            case "animationName": {
              o += Xe(i) + ":" + m + ";";
              break;
            }
            default:
              o += i + "{" + m + "}";
          }
        }
      }
    }
  return o;
}
var Tr = /label:\s*([^\s;{]+)\s*(;|$)/g, q;
function Wt(e, r, t) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var o = !0, a = "";
  q = void 0;
  var i = e[0];
  if (i == null || i.raw === void 0)
    o = !1, a += xe(t, r, i);
  else {
    var c = i;
    a += c[0];
  }
  for (var f = 1; f < e.length; f++)
    if (a += xe(t, r, e[f]), o) {
      var y = i;
      a += y[f];
    }
  Tr.lastIndex = 0;
  for (var m = "", h; (h = Tr.exec(a)) !== null; )
    m += "-" + h[1];
  var p = Mt(a) + m;
  return {
    name: p,
    styles: a,
    next: q
  };
}
var zt = function(r) {
  return r();
}, Dt = vr.useInsertionEffect ? vr.useInsertionEffect : !1, Ut = Dt || zt, qt = !1, Yr = /* @__PURE__ */ I.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ _t({
    key: "css"
  }) : null
);
Yr.Provider;
var Vt = function(r) {
  return /* @__PURE__ */ I.forwardRef(function(t, o) {
    var a = I.useContext(Yr);
    return r(t, a, o);
  });
}, Gt = /* @__PURE__ */ I.createContext({}), He = {}.hasOwnProperty, rr = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Fr = function(r, t) {
  var o = {};
  for (var a in t)
    He.call(t, a) && (o[a] = t[a]);
  return o[rr] = r, o;
}, Ht = function(r) {
  var t = r.cache, o = r.serialized, a = r.isStringTag;
  return Ir(t, o, a), Ut(function() {
    return Nt(t, o, a);
  }), null;
}, Bt = /* @__PURE__ */ Vt(function(e, r, t) {
  var o = e.css;
  typeof o == "string" && r.registered[o] !== void 0 && (o = r.registered[o]);
  var a = e[rr], i = [o], c = "";
  typeof e.className == "string" ? c = $t(r.registered, i, e.className) : e.className != null && (c = e.className + " ");
  var f = Wt(i, void 0, I.useContext(Gt));
  c += r.key + "-" + f.name;
  var y = {};
  for (var m in e)
    He.call(e, m) && m !== "css" && m !== rr && !qt && (y[m] = e[m]);
  return y.className = c, t && (y.ref = t), /* @__PURE__ */ I.createElement(I.Fragment, null, /* @__PURE__ */ I.createElement(Ht, {
    cache: r,
    serialized: f,
    isStringTag: typeof a == "string"
  }), /* @__PURE__ */ I.createElement(a, y));
}), Wr = Bt, Jt = be.Fragment, De = function(r, t, o) {
  return He.call(t, "css") ? be.jsx(Wr, Fr(r, t), o) : be.jsx(r, t, o);
}, En = function(r, t, o) {
  return He.call(t, "css") ? be.jsxs(Wr, Fr(r, t), o) : be.jsxs(r, t, o);
};
const wr = (e) => {
  let r;
  const t = /* @__PURE__ */ new Set(), o = (m, h) => {
    const p = typeof m == "function" ? m(r) : m;
    if (!Object.is(p, r)) {
      const M = r;
      r = h ?? (typeof p != "object" || p === null) ? p : Object.assign({}, r, p), t.forEach((A) => A(r, M));
    }
  }, a = () => r, f = { setState: o, getState: a, getInitialState: () => y, subscribe: (m) => (t.add(m), () => t.delete(m)) }, y = r = e(o, a, f);
  return f;
}, Kt = (e) => e ? wr(e) : wr, Xt = (e) => e;
function Zt(e, r = Xt) {
  const t = Ze.useSyncExternalStore(
    e.subscribe,
    () => r(e.getState()),
    () => r(e.getInitialState())
  );
  return Ze.useDebugValue(t), t;
}
const Qt = (e) => {
  const r = Kt(e), t = (o) => Zt(r, o);
  return Object.assign(t, r), t;
}, en = (e) => Qt, Ee = en()((e) => ({
  // わざとカーリー化
  txt: "",
  addTxt: (r) => e((t) => ({ txt: t.txt + r })),
  clearTxt: () => e(() => ({ txt: "" })),
  aLay: [],
  replace: (r) => e(() => ({ aLay: JSON.parse(r) })),
  addLayer: (r) => e((t) => ({ aLay: [...t.aLay, r] })),
  chgPic: ({ nm: r, fn: t }) => e((o) => {
    const a = [...o.aLay], i = a.find((c) => c.nm === r);
    if (!i) throw `存在しないレイヤ ${r} です`;
    if (i.cls !== "GRP") throw `${r} は画像レイヤではありません`;
    return i.fn = t, { aLay: a };
  }),
  chgStr: ({ nm: r, str: t }) => e((o) => {
    const a = [...o.aLay], i = a.find((c) => c.nm === r);
    if (!i) throw `存在しないレイヤ ${r} です`;
    if (i.cls !== "TXT") throw `${r} は文字レイヤではありません`;
    return i.str = t, { aLay: a };
  }),
  title: "",
  addTitle: (r) => e(() => ({ title: r }))
}));
var rn = function() {
};
function tn(e) {
  for (var r = [], t = 1; t < arguments.length; t++)
    r[t - 1] = arguments[t];
  e && e.addEventListener && e.addEventListener.apply(e, r);
}
function nn(e) {
  for (var r = [], t = 1; t < arguments.length; t++)
    r[t - 1] = arguments[t];
  e && e.removeEventListener && e.removeEventListener.apply(e, r);
}
var on = typeof window < "u", an = function(e) {
  I.useEffect(e, []);
}, sn = on ? window : null, _r = function(e) {
  return !!e.addEventListener;
}, Cr = function(e) {
  return !!e.on;
}, cn = function(e, r, t, o) {
  t === void 0 && (t = sn), I.useEffect(function() {
    if (r && t)
      return _r(t) ? tn(t, e, r, o) : Cr(t) && t.on(e, r, o), function() {
        _r(t) ? nn(t, e, r, o) : Cr(t) && t.off(e, r, o);
      };
  }, [e, r, t, JSON.stringify(o)]);
}, fn = function(e) {
  return typeof e == "function" ? e : typeof e == "string" ? function(r) {
    return r.key === e;
  } : e ? function() {
    return !0;
  } : function() {
    return !1;
  };
}, Rr = function(e, r, t, o) {
  r === void 0 && (r = rn), t === void 0 && (t = {}), o === void 0 && (o = [e]);
  var a = t.event, i = a === void 0 ? "keydown" : a, c = t.target, f = t.options, y = I.useMemo(function() {
    var m = fn(e), h = function(p) {
      if (m(p))
        return r(p);
    };
    return h;
  }, o);
  cn(i, y, c, f);
}, un = {
  restoreOnUnmount: !1
};
function ln(e, r) {
  r === void 0 && (r = un);
  var t = I.useRef(document.title);
  document.title !== e && (document.title = e), I.useEffect(function() {
    if (r && r.restoreOnUnmount)
      return function() {
        document.title = t.current;
      };
  }, []);
}
const dn = typeof document < "u" ? ln : function(e) {
};
function vn(e, r, t) {
  e.render(/* @__PURE__ */ De(zr, { arg: r, inited: t }));
}
function zr({ arg: e, inited: r }) {
  const { heStage: t, sys: o, scrMng: a } = e, i = Ee((v) => v.title), c = Ee((v) => v.addTitle);
  dn(i);
  const f = Ee((v) => v.addLayer), y = Ee((v) => v.chgPic), m = Ee((v) => v.chgStr);
  function h() {
    a.go();
  }
  an(() => {
    c(o.cfg.oCfg.book.title);
    const v = /* @__PURE__ */ Object.create(null);
    return a.attachTsx(() => t.dispatchEvent(new CustomEvent("ev_next", {})), { addLayer: f, chgPic: y, chgStr: m, addTitle: c }, v), r(), t.addEventListener("ev_next", h), () => t.removeEventListener("ev_next", h);
  });
  function p() {
    o.caretaker.nextKey() || h();
  }
  Rr("ArrowDown", (v) => {
    v.stopPropagation(), v.preventDefault(), p();
  });
  function M() {
    o.caretaker.prevKey();
  }
  Rr("ArrowUp", (v) => {
    v.stopPropagation(), v.preventDefault(), M();
  });
  function A() {
    if (tr) {
      tr = !1;
      return;
    }
    Dr || p();
  }
  const b = I.lazy(() => import("./Stage.js"));
  return /* @__PURE__ */ De(I.Suspense, { fallback: /* @__PURE__ */ De(Jt, { children: "Loading" }), children: /* @__PURE__ */ De(b, { arg: e, next: p, prev: M, onClick: A }) });
}
let Dr = !1;
const mn = (e) => Dr = e;
let tr = !1;
function yn() {
  tr = !0;
}
const bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Main: zr,
  initMain: vn,
  onLong: yn,
  setDesignMode: mn
}, Symbol.toStringTag, { value: "Module" }));
export {
  Wr as E,
  Jt as F,
  bn as M,
  nn as a,
  De as b,
  Fr as c,
  Ee as d,
  yn as e,
  mn as f,
  He as h,
  on as i,
  En as j,
  rn as n,
  tn as o,
  I as r,
  Wt as s,
  an as u
};
//# sourceMappingURL=Main.js.map
