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
var je = { exports: {} }, ye = {};
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
        return n.$$typeof === Ce ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case $:
          return "Fragment";
        case s:
          return "Portal";
        case ie:
          return "Profiler";
        case S:
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
          case Te:
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
        Re = console.log, Pe = console.info, Ae = console.warn, Oe = console.error, $e = console.group, Ne = console.groupCollapsed, Me = console.groupEnd;
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
          log: H({}, n, { value: Re }),
          info: H({}, n, { value: Pe }),
          warn: H({}, n, { value: Ae }),
          error: H({}, n, { value: Oe }),
          group: H({}, n, { value: $e }),
          groupCollapsed: H({}, n, { value: Ne }),
          groupEnd: H({}, n, { value: Me })
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
                    var ke = J;
                  }
                  Reflect.construct(n, [], X);
                } else {
                  try {
                    X.call();
                  } catch (J) {
                    ke = J;
                  }
                  n.call(X.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (J) {
                  ke = J;
                }
                (X = n()) && typeof X.catch == "function" && X.catch(function() {
                });
              }
            } catch (J) {
              if (J && ke && typeof J.stack == "string")
                return [J.stack, ke.stack];
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
    function m(n) {
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
            return m(n.type);
          case le:
            u = n._payload, n = n._init;
            try {
              return m(n(u));
            } catch {
            }
        }
      return "";
    }
    function v() {
      var n = G.A;
      return n === null ? null : n.getOwner();
    }
    function p(n) {
      if (de.call(n, "key")) {
        var u = Object.getOwnPropertyDescriptor(n, "key").get;
        if (u && u.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }
    function y(n, u) {
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
    function g() {
      var n = e(this.type);
      return sr[n] || (sr[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function M(n, u, l, T, Y, k) {
      return l = k.ref, n = {
        $$typeof: A,
        type: n,
        key: u,
        props: k,
        _owner: Y
      }, (l !== void 0 ? l : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: g
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
      if (typeof n == "string" || typeof n == "function" || n === $ || n === ie || n === S || n === ce || n === fe || n === He || typeof n == "object" && n !== null && (n.$$typeof === le || n.$$typeof === ue || n.$$typeof === Te || n.$$typeof === we || n.$$typeof === se || n.$$typeof === Be || n.getModuleId !== void 0)) {
        var E = u.children;
        if (E !== void 0)
          if (T)
            if (ve(E)) {
              for (T = 0; T < E.length; T++)
                h(E[T], n);
              Object.freeze && Object.freeze(E);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else h(E, n);
      } else
        E = "", (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), n === null ? T = "null" : ve(n) ? T = "array" : n !== void 0 && n.$$typeof === A ? (T = "<" + (e(n.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : T = typeof n, console.error(
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
      if (E = null, l !== void 0 && (t(l), E = "" + l), p(u) && (t(u.key), E = "" + u.key), "key" in u) {
        l = {};
        for (var te in u)
          te !== "key" && (l[te] = u[te]);
      } else l = u;
      return E && y(
        l,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), M(n, E, k, Y, v(), l);
    }
    function h(n, u) {
      if (typeof n == "object" && n && n.$$typeof !== Ur) {
        if (ve(n))
          for (var l = 0; l < n.length; l++) {
            var T = n[l];
            N(T) && x(T, u);
          }
        else if (N(n))
          n._store && (n._store.validated = 1);
        else if (n === null || typeof n != "object" ? l = null : (l = _e && n[_e] || n["@@iterator"], l = typeof l == "function" ? l : null), typeof l == "function" && l !== n.entries && (l = l.call(n), l !== n))
          for (; !(n = l.next()).done; )
            N(n.value) && x(n.value, u);
      }
    }
    function N(n) {
      return typeof n == "object" && n !== null && n.$$typeof === A;
    }
    function x(n, u) {
      if (n._store && !n._store.validated && n.key == null && (n._store.validated = 1, u = O(u), !fr[u])) {
        fr[u] = !0;
        var l = "";
        n && n._owner != null && n._owner !== v() && (l = null, typeof n._owner.tag == "number" ? l = e(n._owner.type) : typeof n._owner.name == "string" && (l = n._owner.name), l = " It was passed a child from " + l + ".");
        var T = G.getCurrentStack;
        G.getCurrentStack = function() {
          var Y = m(n.type);
          return T && (Y += T() || ""), Y;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          u,
          l
        ), G.getCurrentStack = T;
      }
    }
    function O(n) {
      var u = "", l = v();
      return l && (l = e(l.type)) && (u = `

Check the render method of \`` + l + "`."), u || (n = e(n)) && (u = `

Check the top-level render call using <` + n + ">."), u;
    }
    var w = Pr(), A = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), $ = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), ie = Symbol.for("react.profiler"), we = Symbol.for("react.consumer"), Te = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), ce = Symbol.for("react.suspense"), fe = Symbol.for("react.suspense_list"), ue = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), He = Symbol.for("react.offscreen"), _e = Symbol.iterator, Ce = Symbol.for("react.client.reference"), G = w.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = Object.prototype.hasOwnProperty, H = Object.assign, Be = Symbol.for("react.client.reference"), ve = Array.isArray, Z = 0, Re, Pe, Ae, Oe, $e, Ne, Me;
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
  return dr || (dr = 1, process.env.NODE_ENV === "production" ? je.exports = Gr() : je.exports = Hr()), je.exports;
}
var he = Br(), I = Pr();
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
}(), F = "-ms-", De = "-moz-", _ = "-webkit-", Ar = "comm", nr = "rule", or = "decl", Qr = "@import", Or = "@keyframes", et = "@layer", rt = Math.abs, Ue = String.fromCharCode, tt = Object.assign;
function nt(e, r) {
  return L(e, 0) ^ 45 ? (((r << 2 ^ L(e, 0)) << 2 ^ L(e, 1)) << 2 ^ L(e, 2)) << 2 ^ L(e, 3) : 0;
}
function $r(e) {
  return e.trim();
}
function ot(e, r) {
  return (e = r.exec(e)) ? e[0] : e;
}
function C(e, r, t) {
  return e.replace(r, t);
}
function Qe(e, r) {
  return e.indexOf(r);
}
function L(e, r) {
  return e.charCodeAt(r) | 0;
}
function be(e, r, t) {
  return e.slice(r, t);
}
function U(e) {
  return e.length;
}
function ar(e) {
  return e.length;
}
function Ie(e, r) {
  return r.push(e), e;
}
function at(e, r) {
  return e.map(r).join("");
}
var qe = 1, oe = 1, Nr = 0, z = 0, j = 0, ae = "";
function Ve(e, r, t, o, a, i, c) {
  return { value: e, root: r, parent: t, type: o, props: a, children: i, line: qe, column: oe, length: c, return: "" };
}
function Ee(e, r) {
  return tt(Ve("", null, null, "", null, null, 0), e, { length: -e.length }, r);
}
function it() {
  return j;
}
function st() {
  return j = z > 0 ? L(ae, --z) : 0, oe--, j === 10 && (oe = 1, qe--), j;
}
function D() {
  return j = z < Nr ? L(ae, z++) : 0, oe++, j === 10 && (oe = 1, qe++), j;
}
function V() {
  return L(ae, z);
}
function Ye() {
  return z;
}
function xe(e, r) {
  return be(ae, e, r);
}
function ge(e) {
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
  return qe = oe = 1, Nr = U(ae = e), z = 0, [];
}
function kr(e) {
  return ae = "", e;
}
function Fe(e) {
  return $r(xe(z - 1, er(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function ct(e) {
  for (; (j = V()) && j < 33; )
    D();
  return ge(e) > 2 || ge(j) > 3 ? "" : " ";
}
function ft(e, r) {
  for (; --r && D() && !(j < 48 || j > 102 || j > 57 && j < 65 || j > 70 && j < 97); )
    ;
  return xe(e, Ye() + (r < 6 && V() == 32 && D() == 32));
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
  return "/*" + xe(r, z - 1) + "*" + Ue(e === 47 ? e : D());
}
function lt(e) {
  for (; !ge(V()); )
    D();
  return xe(e, z);
}
function dt(e) {
  return kr(We("", null, null, null, [""], e = Mr(e), 0, [0], e));
}
function We(e, r, t, o, a, i, c, f, m) {
  for (var v = 0, p = 0, y = c, g = 0, M = 0, b = 0, h = 1, N = 1, x = 1, O = 0, w = "", A = a, s = i, $ = o, S = w; N; )
    switch (b = O, O = D()) {
      // (
      case 40:
        if (b != 108 && L(S, y - 1) == 58) {
          Qe(S += C(Fe(O), "&", "&\f"), "&\f") != -1 && (x = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        S += Fe(O);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        S += ct(b);
        break;
      // \
      case 92:
        S += ft(Ye() - 1, 7);
        continue;
      // /
      case 47:
        switch (V()) {
          case 42:
          case 47:
            Ie(vt(ut(D(), Ye()), r, t), m);
            break;
          default:
            S += "/";
        }
        break;
      // {
      case 123 * h:
        f[v++] = U(S) * x;
      // } ; \0
      case 125 * h:
      case 59:
      case 0:
        switch (O) {
          // \0 }
          case 0:
          case 125:
            N = 0;
          // ;
          case 59 + p:
            x == -1 && (S = C(S, /\f/g, "")), M > 0 && U(S) - y && Ie(M > 32 ? yr(S + ";", o, t, y - 1) : yr(C(S, " ", "") + ";", o, t, y - 2), m);
            break;
          // @ ;
          case 59:
            S += ";";
          // { rule/at-rule
          default:
            if (Ie($ = mr(S, r, t, v, p, a, f, w, A = [], s = [], y), i), O === 123)
              if (p === 0)
                We(S, r, $, $, A, i, y, f, s);
              else
                switch (g === 99 && L(S, 3) === 110 ? 100 : g) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    We(e, $, $, o && Ie(mr(e, $, $, 0, 0, a, f, w, a, A = [], y), s), a, s, y, f, o ? A : s);
                    break;
                  default:
                    We(S, $, $, $, [""], s, 0, f, s);
                }
        }
        v = p = M = 0, h = x = 1, w = S = "", y = c;
        break;
      // :
      case 58:
        y = 1 + U(S), M = b;
      default:
        if (h < 1) {
          if (O == 123)
            --h;
          else if (O == 125 && h++ == 0 && st() == 125)
            continue;
        }
        switch (S += Ue(O), O * h) {
          // &
          case 38:
            x = p > 0 ? 1 : (S += "\f", -1);
            break;
          // ,
          case 44:
            f[v++] = (U(S) - 1) * x, x = 1;
            break;
          // @
          case 64:
            V() === 45 && (S += Fe(D())), g = V(), p = y = U(w = S += lt(Ye())), O++;
            break;
          // -
          case 45:
            b === 45 && U(S) == 2 && (h = 0);
        }
    }
  return i;
}
function mr(e, r, t, o, a, i, c, f, m, v, p) {
  for (var y = a - 1, g = a === 0 ? i : [""], M = ar(g), b = 0, h = 0, N = 0; b < o; ++b)
    for (var x = 0, O = be(e, y + 1, y = rt(h = c[b])), w = e; x < M; ++x)
      (w = $r(h > 0 ? g[x] + " " + O : C(O, /&\f/g, g[x]))) && (m[N++] = w);
  return Ve(e, r, t, a === 0 ? nr : f, m, v, p);
}
function vt(e, r, t) {
  return Ve(e, r, t, Ar, Ue(it()), be(e, 2, -2), 0);
}
function yr(e, r, t, o) {
  return Ve(e, r, t, or, be(e, 0, o), be(e, o + 1, -1), o);
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
function Et(e) {
  var r = /* @__PURE__ */ Object.create(null);
  return function(t) {
    return r[t] === void 0 && (r[t] = e(t)), r[t];
  };
}
var ht = function(r, t, o) {
  for (var a = 0, i = 0; a = i, i = V(), a === 38 && i === 12 && (t[o] = 1), !ge(i); )
    D();
  return xe(r, z);
}, bt = function(r, t) {
  var o = -1, a = 44;
  do
    switch (ge(a)) {
      case 0:
        a === 38 && V() === 12 && (t[o] = 1), r[o] += ht(z - 1, t, o);
        break;
      case 2:
        r[o] += Fe(a);
        break;
      case 4:
        if (a === 44) {
          r[++o] = V() === 58 ? "&\f" : "", t[o] = r[o].length;
          break;
        }
      // fallthrough
      default:
        r[o] += Ue(a);
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
      for (var i = [], c = gt(t, i), f = o.props, m = 0, v = 0; m < c.length; m++)
        for (var p = 0; p < f.length; p++, v++)
          r.props[v] = i[m] ? c[m].replace(/&\f/g, f[p]) : f[p] + " " + c[m];
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
      return _ + "print-" + e + e;
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
      return _ + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return _ + e + De + e + F + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return _ + e + F + e + e;
    // order
    case 6165:
      return _ + e + F + "flex-" + e + e;
    // align-items
    case 5187:
      return _ + e + C(e, /(\w+).+(:[^]+)/, _ + "box-$1$2" + F + "flex-$1$2") + e;
    // align-self
    case 5443:
      return _ + e + F + "flex-item-" + C(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return _ + e + F + "flex-line-pack" + C(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return _ + e + F + C(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return _ + e + F + C(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return _ + "box-" + C(e, "-grow", "") + _ + e + F + C(e, "grow", "positive") + e;
    // transition
    case 4554:
      return _ + C(e, /([^-])(transform)/g, "$1" + _ + "$2") + e;
    // cursor
    case 6187:
      return C(C(C(e, /(zoom-|grab)/, _ + "$1"), /(image-set)/, _ + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return C(e, /(image-set\([^]*)/, _ + "$1$`$1");
    // justify-content
    case 4968:
      return C(C(e, /(.+:)(flex-)?(.*)/, _ + "box-pack:$3" + F + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + _ + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return C(e, /(.+)-inline(.+)/, _ + "$1$2") + e;
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
          return C(e, /(.+:)(.+)-([^]+)/, "$1" + _ + "$2-$3$1" + De + (L(e, r + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~Qe(e, "stretch") ? jr(C(e, "stretch", "fill-available"), r) + e : e;
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
          return C(e, ":", ":" + _) + e;
        // (inline-)?fl(e)x
        case 101:
          return C(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + _ + (L(e, 14) === 45 ? "inline-" : "") + "box$3$1" + _ + "$2$3$1" + F + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (L(e, r + 11)) {
        // vertical-l(r)
        case 114:
          return _ + e + F + C(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return _ + e + F + C(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return _ + e + F + C(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return _ + e + F + e + e;
  }
  return e;
}
var wt = function(r, t, o, a) {
  if (r.length > -1 && !r.return) switch (r.type) {
    case or:
      r.return = jr(r.value, r.length);
      break;
    case Or:
      return ne([Ee(r, {
        value: C(r.value, "@", "@" + _)
      })], a);
    case nr:
      if (r.length) return at(r.props, function(i) {
        switch (ot(i, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return ne([Ee(r, {
              props: [C(i, /:(read-\w+)/, ":" + De + "$1")]
            })], a);
          // :placeholder
          case "::placeholder":
            return ne([Ee(r, {
              props: [C(i, /:(plac\w+)/, ":" + _ + "input-$1")]
            }), Ee(r, {
              props: [C(i, /:(plac\w+)/, ":" + De + "$1")]
            }), Ee(r, {
              props: [C(i, /:(plac\w+)/, F + "input-$1")]
            })], a);
        }
        return "";
      });
  }
}, Tt = [wt], _t = function(r) {
  var t = r.key;
  if (t === "css") {
    var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(o, function(h) {
      var N = h.getAttribute("data-emotion");
      N.indexOf(" ") !== -1 && (document.head.appendChild(h), h.setAttribute("data-s", ""));
    });
  }
  var a = r.stylisPlugins || Tt, i = {}, c, f = [];
  c = r.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + t + ' "]'),
    function(h) {
      for (var N = h.getAttribute("data-emotion").split(" "), x = 1; x < N.length; x++)
        i[N[x]] = !0;
      f.push(h);
    }
  );
  var m, v = [St, xt];
  {
    var p, y = [mt, pt(function(h) {
      p.insert(h);
    })], g = yt(v.concat(a, y)), M = function(N) {
      return ne(dt(N), g);
    };
    m = function(N, x, O, w) {
      p = O, M(N ? N + "{" + x.styles + "}" : x.styles), w && (b.inserted[x.name] = !0);
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
    insert: m
  };
  return b.sheet.hydrate(f), b;
}, Le = { exports: {} }, R = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Er;
function Ct() {
  if (Er) return R;
  Er = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, f = e ? Symbol.for("react.context") : 60110, m = e ? Symbol.for("react.async_mode") : 60111, v = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, M = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, N = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
  function w(s) {
    if (typeof s == "object" && s !== null) {
      var $ = s.$$typeof;
      switch ($) {
        case r:
          switch (s = s.type, s) {
            case m:
            case v:
            case o:
            case i:
            case a:
            case y:
              return s;
            default:
              switch (s = s && s.$$typeof, s) {
                case f:
                case p:
                case b:
                case M:
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
  function A(s) {
    return w(s) === v;
  }
  return R.AsyncMode = m, R.ConcurrentMode = v, R.ContextConsumer = f, R.ContextProvider = c, R.Element = r, R.ForwardRef = p, R.Fragment = o, R.Lazy = b, R.Memo = M, R.Portal = t, R.Profiler = i, R.StrictMode = a, R.Suspense = y, R.isAsyncMode = function(s) {
    return A(s) || w(s) === m;
  }, R.isConcurrentMode = A, R.isContextConsumer = function(s) {
    return w(s) === f;
  }, R.isContextProvider = function(s) {
    return w(s) === c;
  }, R.isElement = function(s) {
    return typeof s == "object" && s !== null && s.$$typeof === r;
  }, R.isForwardRef = function(s) {
    return w(s) === p;
  }, R.isFragment = function(s) {
    return w(s) === o;
  }, R.isLazy = function(s) {
    return w(s) === b;
  }, R.isMemo = function(s) {
    return w(s) === M;
  }, R.isPortal = function(s) {
    return w(s) === t;
  }, R.isProfiler = function(s) {
    return w(s) === i;
  }, R.isStrictMode = function(s) {
    return w(s) === a;
  }, R.isSuspense = function(s) {
    return w(s) === y;
  }, R.isValidElementType = function(s) {
    return typeof s == "string" || typeof s == "function" || s === o || s === v || s === i || s === a || s === y || s === g || typeof s == "object" && s !== null && (s.$$typeof === b || s.$$typeof === M || s.$$typeof === c || s.$$typeof === f || s.$$typeof === p || s.$$typeof === N || s.$$typeof === x || s.$$typeof === O || s.$$typeof === h);
  }, R.typeOf = w, R;
}
var P = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hr;
function Rt() {
  return hr || (hr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, f = e ? Symbol.for("react.context") : 60110, m = e ? Symbol.for("react.async_mode") : 60111, v = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, M = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, N = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
    function w(d) {
      return typeof d == "string" || typeof d == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      d === o || d === v || d === i || d === a || d === y || d === g || typeof d == "object" && d !== null && (d.$$typeof === b || d.$$typeof === M || d.$$typeof === c || d.$$typeof === f || d.$$typeof === p || d.$$typeof === N || d.$$typeof === x || d.$$typeof === O || d.$$typeof === h);
    }
    function A(d) {
      if (typeof d == "object" && d !== null) {
        var ee = d.$$typeof;
        switch (ee) {
          case r:
            var K = d.type;
            switch (K) {
              case m:
              case v:
              case o:
              case i:
              case a:
              case y:
                return K;
              default:
                var re = K && K.$$typeof;
                switch (re) {
                  case f:
                  case p:
                  case b:
                  case M:
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
    var s = m, $ = v, S = f, ie = c, we = r, Te = p, se = o, ce = b, fe = M, ue = t, le = i, He = a, _e = y, Ce = !1;
    function G(d) {
      return Ce || (Ce = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), de(d) || A(d) === m;
    }
    function de(d) {
      return A(d) === v;
    }
    function H(d) {
      return A(d) === f;
    }
    function Be(d) {
      return A(d) === c;
    }
    function ve(d) {
      return typeof d == "object" && d !== null && d.$$typeof === r;
    }
    function Z(d) {
      return A(d) === p;
    }
    function Re(d) {
      return A(d) === o;
    }
    function Pe(d) {
      return A(d) === b;
    }
    function Ae(d) {
      return A(d) === M;
    }
    function Oe(d) {
      return A(d) === t;
    }
    function $e(d) {
      return A(d) === i;
    }
    function Ne(d) {
      return A(d) === a;
    }
    function Me(d) {
      return A(d) === y;
    }
    P.AsyncMode = s, P.ConcurrentMode = $, P.ContextConsumer = S, P.ContextProvider = ie, P.Element = we, P.ForwardRef = Te, P.Fragment = se, P.Lazy = ce, P.Memo = fe, P.Portal = ue, P.Profiler = le, P.StrictMode = He, P.Suspense = _e, P.isAsyncMode = G, P.isConcurrentMode = de, P.isContextConsumer = H, P.isContextProvider = Be, P.isElement = ve, P.isForwardRef = Z, P.isFragment = Re, P.isLazy = Pe, P.isMemo = Ae, P.isPortal = Oe, P.isProfiler = $e, P.isStrictMode = Ne, P.isSuspense = Me, P.isValidElementType = w, P.typeOf = A;
  }()), P;
}
var br;
function Pt() {
  return br || (br = 1, process.env.NODE_ENV === "production" ? Le.exports = Ct() : Le.exports = Rt()), Le.exports;
}
var Je, gr;
function At() {
  if (gr) return Je;
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
  var f = Object.defineProperty, m = Object.getOwnPropertyNames, v = Object.getOwnPropertySymbols, p = Object.getOwnPropertyDescriptor, y = Object.getPrototypeOf, g = Object.prototype;
  function M(b, h, N) {
    if (typeof h != "string") {
      if (g) {
        var x = y(h);
        x && x !== g && M(b, x, N);
      }
      var O = m(h);
      v && (O = O.concat(v(h)));
      for (var w = c(b), A = c(h), s = 0; s < O.length; ++s) {
        var $ = O[s];
        if (!t[$] && !(N && N[$]) && !(A && A[$]) && !(w && w[$])) {
          var S = p(h, $);
          try {
            f(b, $, S);
          } catch {
          }
        }
      }
    }
    return b;
  }
  return Je = M, Je;
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
}, Ke = /* @__PURE__ */ Et(function(e) {
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
function Se(e, r, t) {
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
        var m = q, v = t(e);
        return q = m, Se(e, r, v);
      }
      break;
    }
  }
  var p = t;
  return p;
}
function Ft(e, r, t) {
  var o = "";
  if (Array.isArray(t))
    for (var a = 0; a < t.length; a++)
      o += Se(e, r, t[a]) + ";";
  else
    for (var i in t) {
      var c = t[i];
      if (typeof c != "object") {
        var f = c;
        Sr(f) && (o += Ke(i) + ":" + xr(i, f) + ";");
      } else {
        if (i === "NO_COMPONENT_SELECTOR" && jt)
          throw new Error(Yt);
        if (Array.isArray(c) && typeof c[0] == "string" && r == null)
          for (var m = 0; m < c.length; m++)
            Sr(c[m]) && (o += Ke(i) + ":" + xr(i, c[m]) + ";");
        else {
          var v = Se(e, r, c);
          switch (i) {
            case "animation":
            case "animationName": {
              o += Ke(i) + ":" + v + ";";
              break;
            }
            default:
              o += i + "{" + v + "}";
          }
        }
      }
    }
  return o;
}
var wr = /label:\s*([^\s;{]+)\s*(;|$)/g, q;
function Wt(e, r, t) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var o = !0, a = "";
  q = void 0;
  var i = e[0];
  if (i == null || i.raw === void 0)
    o = !1, a += Se(t, r, i);
  else {
    var c = i;
    a += c[0];
  }
  for (var f = 1; f < e.length; f++)
    if (a += Se(t, r, e[f]), o) {
      var m = i;
      a += m[f];
    }
  wr.lastIndex = 0;
  for (var v = "", p; (p = wr.exec(a)) !== null; )
    v += "-" + p[1];
  var y = Mt(a) + v;
  return {
    name: y,
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
}, Gt = /* @__PURE__ */ I.createContext({}), Ge = {}.hasOwnProperty, rr = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Fr = function(r, t) {
  var o = {};
  for (var a in t)
    Ge.call(t, a) && (o[a] = t[a]);
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
  var m = {};
  for (var v in e)
    Ge.call(e, v) && v !== "css" && v !== rr && !qt && (m[v] = e[v]);
  return m.className = c, t && (m.ref = t), /* @__PURE__ */ I.createElement(I.Fragment, null, /* @__PURE__ */ I.createElement(Ht, {
    cache: r,
    serialized: f,
    isStringTag: typeof a == "string"
  }), /* @__PURE__ */ I.createElement(a, m));
}), Wr = Bt, Jt = he.Fragment, ze = function(r, t, o) {
  return Ge.call(t, "css") ? he.jsx(Wr, Fr(r, t), o) : he.jsx(r, t, o);
}, hn = function(r, t, o) {
  return Ge.call(t, "css") ? he.jsxs(Wr, Fr(r, t), o) : he.jsxs(r, t, o);
};
const Tr = (e) => {
  let r;
  const t = /* @__PURE__ */ new Set(), o = (v, p) => {
    const y = typeof v == "function" ? v(r) : v;
    if (!Object.is(y, r)) {
      const g = r;
      r = p ?? (typeof y != "object" || y === null) ? y : Object.assign({}, r, y), t.forEach((M) => M(r, g));
    }
  }, a = () => r, f = { setState: o, getState: a, getInitialState: () => m, subscribe: (v) => (t.add(v), () => t.delete(v)) }, m = r = e(o, a, f);
  return f;
}, Kt = (e) => e ? Tr(e) : Tr, Xt = (e) => e;
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
}, en = (e) => Qt, Xe = en()((e) => ({
  // わざとカーリー化
  txt: "",
  addTxt: (r) => e((t) => ({ txt: t.txt + r })),
  clearTxt: () => e(() => ({ txt: "" })),
  aLay: [],
  replace: (r) => e((t) => ({ aLay: JSON.parse(r) })),
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
  })
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
  var a = t.event, i = a === void 0 ? "keydown" : a, c = t.target, f = t.options, m = I.useMemo(function() {
    var v = fn(e), p = function(y) {
      if (v(y))
        return r(y);
    };
    return p;
  }, o);
  cn(i, m, c, f);
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
function vn(e, r) {
  e.render(/* @__PURE__ */ ze(zr, { arg: r }));
}
function zr({ arg: e }) {
  const { heStage: r, sys: t, scrMng: o } = e;
  dn(t.cfg.oCfg.book.title);
  const a = Xe((g) => g.addLayer), i = Xe((g) => g.chgPic), c = Xe((g) => g.chgStr);
  function f() {
    o.go();
  }
  an(() => (o.init(() => r.dispatchEvent(new CustomEvent("ev_next", {})), { addLayer: a, chgPic: i, chgStr: c }), r.addEventListener("ev_next", f), () => r.removeEventListener("ev_next", f)));
  function m() {
    t.caretaker.nextKey() || f();
  }
  Rr("ArrowDown", (g) => {
    g.stopPropagation(), g.preventDefault(), m();
  });
  function v() {
    t.caretaker.prevKey();
  }
  Rr("ArrowUp", (g) => {
    g.stopPropagation(), g.preventDefault(), v();
  });
  function p() {
    if (tr) {
      tr = !1;
      return;
    }
    Dr || m();
  }
  const y = I.lazy(() => import("./Stage.js"));
  return /* @__PURE__ */ ze(I.Suspense, { fallback: /* @__PURE__ */ ze(Jt, { children: "Loading" }), children: /* @__PURE__ */ ze(y, { arg: e, next: m, prev: v, onClick: p }) });
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
  ze as b,
  Fr as c,
  Xe as d,
  yn as e,
  mn as f,
  Ge as h,
  on as i,
  hn as j,
  rn as n,
  tn as o,
  I as r,
  Wt as s,
  an as u
};
//# sourceMappingURL=Main.js.map
