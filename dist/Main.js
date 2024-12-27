import { r as Pr } from "./index3.js";
import { g as Gr } from "./_commonjsHelpers.js";
function Hr(e, r) {
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
function Br() {
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
function Jr() {
  return lr || (lr = 1, process.env.NODE_ENV !== "production" && function() {
    function e(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === Ce ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case O:
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
        var l = u.error, w = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return l.call(
          u,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          w
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
      var w = null;
      w = G.H, G.H = null, a();
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
        var M = Object.getOwnPropertyDescriptor(
          Y.DetermineComponentFrameRoot,
          "name"
        );
        M && M.configurable && Object.defineProperty(
          Y.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var b = Y.DetermineComponentFrameRoot(), B = b[0], te = b[1];
        if (B && te) {
          var W = B.split(`
`), Q = te.split(`
`);
          for (b = M = 0; M < W.length && !W[M].includes(
            "DetermineComponentFrameRoot"
          ); )
            M++;
          for (; b < Q.length && !Q[b].includes(
            "DetermineComponentFrameRoot"
          ); )
            b++;
          if (M === W.length || b === Q.length)
            for (M = W.length - 1, b = Q.length - 1; 1 <= M && 0 <= b && W[M] !== Q[b]; )
              b--;
          for (; 1 <= M && 0 <= b; M--, b--)
            if (W[M] !== Q[b]) {
              if (M !== 1 || b !== 1)
                do
                  if (M--, b--, 0 > b || W[M] !== Q[b]) {
                    var me = `
` + W[M].replace(
                      " at new ",
                      " at "
                    );
                    return n.displayName && me.includes("<anonymous>") && (me = me.replace("<anonymous>", n.displayName)), typeof n == "function" && re.set(n, me), me;
                  }
                while (1 <= M && 0 <= b);
              break;
            }
        }
      } finally {
        K = !1, G.H = w, i(), Error.prepareStackTrace = l;
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
    function v(n) {
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
    function k() {
      var n = e(this.type);
      return sr[n] || (sr[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function N(n, u, l, w, Y, M) {
      return l = M.ref, n = {
        $$typeof: P,
        type: n,
        key: u,
        props: M,
        _owner: Y
      }, (l !== void 0 ? l : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: k
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
    function h(n, u, l, w, Y, M) {
      if (typeof n == "string" || typeof n == "function" || n === O || n === ie || n === g || n === ce || n === fe || n === He || typeof n == "object" && n !== null && (n.$$typeof === le || n.$$typeof === ue || n.$$typeof === Te || n.$$typeof === we || n.$$typeof === se || n.$$typeof === Be || n.getModuleId !== void 0)) {
        var b = u.children;
        if (b !== void 0)
          if (w)
            if (ve(b)) {
              for (w = 0; w < b.length; w++)
                E(b[w], n);
              Object.freeze && Object.freeze(b);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else E(b, n);
      } else
        b = "", (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), n === null ? w = "null" : ve(n) ? w = "array" : n !== void 0 && n.$$typeof === P ? (w = "<" + (e(n.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : w = typeof n, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          w,
          b
        );
      if (de.call(u, "key")) {
        b = e(n);
        var B = Object.keys(u).filter(function(W) {
          return W !== "key";
        });
        w = 0 < B.length ? "{key: someKey, " + B.join(": ..., ") + ": ...}" : "{key: someKey}", cr[b + w] || (B = 0 < B.length ? "{" + B.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          w,
          b,
          B,
          b
        ), cr[b + w] = !0);
      }
      if (b = null, l !== void 0 && (t(l), b = "" + l), v(u) && (t(u.key), b = "" + u.key), "key" in u) {
        l = {};
        for (var te in u)
          te !== "key" && (l[te] = u[te]);
      } else l = u;
      return b && p(
        l,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), N(n, b, M, Y, m(), l);
    }
    function E(n, u) {
      if (typeof n == "object" && n && n.$$typeof !== Vr) {
        if (ve(n))
          for (var l = 0; l < n.length; l++) {
            var w = n[l];
            $(w) && S(w, u);
          }
        else if ($(n))
          n._store && (n._store.validated = 1);
        else if (n === null || typeof n != "object" ? l = null : (l = _e && n[_e] || n["@@iterator"], l = typeof l == "function" ? l : null), typeof l == "function" && l !== n.entries && (l = l.call(n), l !== n))
          for (; !(n = l.next()).done; )
            $(n.value) && S(n.value, u);
      }
    }
    function $(n) {
      return typeof n == "object" && n !== null && n.$$typeof === P;
    }
    function S(n, u) {
      if (n._store && !n._store.validated && n.key == null && (n._store.validated = 1, u = A(u), !fr[u])) {
        fr[u] = !0;
        var l = "";
        n && n._owner != null && n._owner !== m() && (l = null, typeof n._owner.tag == "number" ? l = e(n._owner.type) : typeof n._owner.name == "string" && (l = n._owner.name), l = " It was passed a child from " + l + ".");
        var w = G.getCurrentStack;
        G.getCurrentStack = function() {
          var Y = y(n.type);
          return w && (Y += w() || ""), Y;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          u,
          l
        ), G.getCurrentStack = w;
      }
    }
    function A(n) {
      var u = "", l = m();
      return l && (l = e(l.type)) && (u = `

Check the render method of \`` + l + "`."), u || (n = e(n)) && (u = `

Check the top-level render call using <` + n + ">."), u;
    }
    var x = Pr(), P = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), O = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), ie = Symbol.for("react.profiler"), we = Symbol.for("react.consumer"), Te = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), ce = Symbol.for("react.suspense"), fe = Symbol.for("react.suspense_list"), ue = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), He = Symbol.for("react.offscreen"), _e = Symbol.iterator, Ce = Symbol.for("react.client.reference"), G = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = Object.prototype.hasOwnProperty, H = Object.assign, Be = Symbol.for("react.client.reference"), ve = Array.isArray, Z = 0, Re, Pe, Ae, Oe, $e, Ne, Me;
    o.__reactDisabledLog = !0;
    var d, ee, K = !1, re = new (typeof WeakMap == "function" ? WeakMap : Map)(), Vr = Symbol.for("react.client.reference"), ir, sr = {}, cr = {}, fr = {};
    pe.Fragment = O, pe.jsx = function(n, u, l, w, Y) {
      return h(n, u, l, !1, w, Y);
    }, pe.jsxs = function(n, u, l, w, Y) {
      return h(n, u, l, !0, w, Y);
    };
  }()), pe;
}
var dr;
function Kr() {
  return dr || (dr = 1, process.env.NODE_ENV === "production" ? je.exports = Br() : je.exports = Jr()), je.exports;
}
var Ee = Kr(), I = Pr();
const Ze = /* @__PURE__ */ Gr(I), vr = /* @__PURE__ */ Hr({
  __proto__: null,
  default: Ze
}, [I]);
var Xr = !1;
function Zr(e) {
  if (e.sheet)
    return e.sheet;
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === e)
      return document.styleSheets[r];
}
function Qr(e) {
  var r = document.createElement("style");
  return r.setAttribute("data-emotion", e.key), e.nonce !== void 0 && r.setAttribute("nonce", e.nonce), r.appendChild(document.createTextNode("")), r.setAttribute("data-s", ""), r;
}
var et = /* @__PURE__ */ function() {
  function e(t) {
    var o = this;
    this._insertTag = function(a) {
      var i;
      o.tags.length === 0 ? o.insertionPoint ? i = o.insertionPoint.nextSibling : o.prepend ? i = o.container.firstChild : i = o.before : i = o.tags[o.tags.length - 1].nextSibling, o.container.insertBefore(a, i), o.tags.push(a);
    }, this.isSpeedy = t.speedy === void 0 ? !Xr : t.speedy, this.tags = [], this.ctr = 0, this.nonce = t.nonce, this.key = t.key, this.container = t.container, this.prepend = t.prepend, this.insertionPoint = t.insertionPoint, this.before = null;
  }
  var r = e.prototype;
  return r.hydrate = function(o) {
    o.forEach(this._insertTag);
  }, r.insert = function(o) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Qr(this));
    var a = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var i = Zr(a);
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
}(), F = "-ms-", De = "-moz-", T = "-webkit-", Ar = "comm", nr = "rule", or = "decl", rt = "@import", Or = "@keyframes", tt = "@layer", nt = Math.abs, Ue = String.fromCharCode, ot = Object.assign;
function at(e, r) {
  return L(e, 0) ^ 45 ? (((r << 2 ^ L(e, 0)) << 2 ^ L(e, 1)) << 2 ^ L(e, 2)) << 2 ^ L(e, 3) : 0;
}
function $r(e) {
  return e.trim();
}
function it(e, r) {
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
function he(e, r, t) {
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
function st(e, r) {
  return e.map(r).join("");
}
var qe = 1, oe = 1, Nr = 0, z = 0, j = 0, ae = "";
function Ve(e, r, t, o, a, i, c) {
  return { value: e, root: r, parent: t, type: o, props: a, children: i, line: qe, column: oe, length: c, return: "" };
}
function be(e, r) {
  return ot(Ve("", null, null, "", null, null, 0), e, { length: -e.length }, r);
}
function ct() {
  return j;
}
function ft() {
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
  return he(ae, e, r);
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
function ut(e) {
  for (; (j = V()) && j < 33; )
    D();
  return ge(e) > 2 || ge(j) > 3 ? "" : " ";
}
function lt(e, r) {
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
function dt(e, r) {
  for (; D() && e + j !== 57; )
    if (e + j === 84 && V() === 47)
      break;
  return "/*" + xe(r, z - 1) + "*" + Ue(e === 47 ? e : D());
}
function vt(e) {
  for (; !ge(V()); )
    D();
  return xe(e, z);
}
function mt(e) {
  return kr(We("", null, null, null, [""], e = Mr(e), 0, [0], e));
}
function We(e, r, t, o, a, i, c, f, y) {
  for (var m = 0, v = 0, p = c, k = 0, N = 0, h = 0, E = 1, $ = 1, S = 1, A = 0, x = "", P = a, s = i, O = o, g = x; $; )
    switch (h = A, A = D()) {
      // (
      case 40:
        if (h != 108 && L(g, p - 1) == 58) {
          Qe(g += _(Fe(A), "&", "&\f"), "&\f") != -1 && (S = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        g += Fe(A);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        g += ut(h);
        break;
      // \
      case 92:
        g += lt(Ye() - 1, 7);
        continue;
      // /
      case 47:
        switch (V()) {
          case 42:
          case 47:
            Ie(yt(dt(D(), Ye()), r, t), y);
            break;
          default:
            g += "/";
        }
        break;
      // {
      case 123 * E:
        f[m++] = U(g) * S;
      // } ; \0
      case 125 * E:
      case 59:
      case 0:
        switch (A) {
          // \0 }
          case 0:
          case 125:
            $ = 0;
          // ;
          case 59 + v:
            S == -1 && (g = _(g, /\f/g, "")), N > 0 && U(g) - p && Ie(N > 32 ? yr(g + ";", o, t, p - 1) : yr(_(g, " ", "") + ";", o, t, p - 2), y);
            break;
          // @ ;
          case 59:
            g += ";";
          // { rule/at-rule
          default:
            if (Ie(O = mr(g, r, t, m, v, a, f, x, P = [], s = [], p), i), A === 123)
              if (v === 0)
                We(g, r, O, O, P, i, p, f, s);
              else
                switch (k === 99 && L(g, 3) === 110 ? 100 : k) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    We(e, O, O, o && Ie(mr(e, O, O, 0, 0, a, f, x, a, P = [], p), s), a, s, p, f, o ? P : s);
                    break;
                  default:
                    We(g, O, O, O, [""], s, 0, f, s);
                }
        }
        m = v = N = 0, E = S = 1, x = g = "", p = c;
        break;
      // :
      case 58:
        p = 1 + U(g), N = h;
      default:
        if (E < 1) {
          if (A == 123)
            --E;
          else if (A == 125 && E++ == 0 && ft() == 125)
            continue;
        }
        switch (g += Ue(A), A * E) {
          // &
          case 38:
            S = v > 0 ? 1 : (g += "\f", -1);
            break;
          // ,
          case 44:
            f[m++] = (U(g) - 1) * S, S = 1;
            break;
          // @
          case 64:
            V() === 45 && (g += Fe(D())), k = V(), v = p = U(x = g += vt(Ye())), A++;
            break;
          // -
          case 45:
            h === 45 && U(g) == 2 && (E = 0);
        }
    }
  return i;
}
function mr(e, r, t, o, a, i, c, f, y, m, v) {
  for (var p = a - 1, k = a === 0 ? i : [""], N = ar(k), h = 0, E = 0, $ = 0; h < o; ++h)
    for (var S = 0, A = he(e, p + 1, p = nt(E = c[h])), x = e; S < N; ++S)
      (x = $r(E > 0 ? k[S] + " " + A : _(A, /&\f/g, k[S]))) && (y[$++] = x);
  return Ve(e, r, t, a === 0 ? nr : f, y, m, v);
}
function yt(e, r, t) {
  return Ve(e, r, t, Ar, Ue(ct()), he(e, 2, -2), 0);
}
function yr(e, r, t, o) {
  return Ve(e, r, t, or, he(e, 0, o), he(e, o + 1, -1), o);
}
function ne(e, r) {
  for (var t = "", o = ar(e), a = 0; a < o; a++)
    t += r(e[a], a, e, r) || "";
  return t;
}
function pt(e, r, t, o) {
  switch (e.type) {
    case tt:
      if (e.children.length) break;
    case rt:
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
function bt(e) {
  var r = ar(e);
  return function(t, o, a, i) {
    for (var c = "", f = 0; f < r; f++)
      c += e[f](t, o, a, i) || "";
    return c;
  };
}
function Et(e) {
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
var gt = function(r, t, o) {
  for (var a = 0, i = 0; a = i, i = V(), a === 38 && i === 12 && (t[o] = 1), !ge(i); )
    D();
  return xe(r, z);
}, St = function(r, t) {
  var o = -1, a = 44;
  do
    switch (ge(a)) {
      case 0:
        a === 38 && V() === 12 && (t[o] = 1), r[o] += gt(z - 1, t, o);
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
}, xt = function(r, t) {
  return kr(St(Mr(r), t));
}, pr = /* @__PURE__ */ new WeakMap(), wt = function(r) {
  if (!(r.type !== "rule" || !r.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r.length < 1)) {
    for (var t = r.value, o = r.parent, a = r.column === o.column && r.line === o.line; o.type !== "rule"; )
      if (o = o.parent, !o) return;
    if (!(r.props.length === 1 && t.charCodeAt(0) !== 58 && !pr.get(o)) && !a) {
      pr.set(r, !0);
      for (var i = [], c = xt(t, i), f = o.props, y = 0, m = 0; y < c.length; y++)
        for (var v = 0; v < f.length; v++, m++)
          r.props[m] = i[y] ? c[y].replace(/&\f/g, f[v]) : f[v] + " " + c[y];
    }
  }
}, Tt = function(r) {
  if (r.type === "decl") {
    var t = r.value;
    // charcode for l
    t.charCodeAt(0) === 108 && // charcode for b
    t.charCodeAt(2) === 98 && (r.return = "", r.value = "");
  }
};
function jr(e, r) {
  switch (at(e, r)) {
    // color-adjust
    case 5103:
      return T + "print-" + e + e;
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
      return T + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return T + e + De + e + F + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return T + e + F + e + e;
    // order
    case 6165:
      return T + e + F + "flex-" + e + e;
    // align-items
    case 5187:
      return T + e + _(e, /(\w+).+(:[^]+)/, T + "box-$1$2" + F + "flex-$1$2") + e;
    // align-self
    case 5443:
      return T + e + F + "flex-item-" + _(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return T + e + F + "flex-line-pack" + _(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return T + e + F + _(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return T + e + F + _(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return T + "box-" + _(e, "-grow", "") + T + e + F + _(e, "grow", "positive") + e;
    // transition
    case 4554:
      return T + _(e, /([^-])(transform)/g, "$1" + T + "$2") + e;
    // cursor
    case 6187:
      return _(_(_(e, /(zoom-|grab)/, T + "$1"), /(image-set)/, T + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return _(e, /(image-set\([^]*)/, T + "$1$`$1");
    // justify-content
    case 4968:
      return _(_(e, /(.+:)(flex-)?(.*)/, T + "box-pack:$3" + F + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + T + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return _(e, /(.+)-inline(.+)/, T + "$1$2") + e;
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
          return _(e, /(.+:)(.+)-([^]+)/, "$1" + T + "$2-$3$1" + De + (L(e, r + 3) == 108 ? "$3" : "$2-$3")) + e;
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
          return _(e, ":", ":" + T) + e;
        // (inline-)?fl(e)x
        case 101:
          return _(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + T + (L(e, 14) === 45 ? "inline-" : "") + "box$3$1" + T + "$2$3$1" + F + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (L(e, r + 11)) {
        // vertical-l(r)
        case 114:
          return T + e + F + _(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return T + e + F + _(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return T + e + F + _(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return T + e + F + e + e;
  }
  return e;
}
var _t = function(r, t, o, a) {
  if (r.length > -1 && !r.return) switch (r.type) {
    case or:
      r.return = jr(r.value, r.length);
      break;
    case Or:
      return ne([be(r, {
        value: _(r.value, "@", "@" + T)
      })], a);
    case nr:
      if (r.length) return st(r.props, function(i) {
        switch (it(i, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return ne([be(r, {
              props: [_(i, /:(read-\w+)/, ":" + De + "$1")]
            })], a);
          // :placeholder
          case "::placeholder":
            return ne([be(r, {
              props: [_(i, /:(plac\w+)/, ":" + T + "input-$1")]
            }), be(r, {
              props: [_(i, /:(plac\w+)/, ":" + De + "$1")]
            }), be(r, {
              props: [_(i, /:(plac\w+)/, F + "input-$1")]
            })], a);
        }
        return "";
      });
  }
}, Ct = [_t], Rt = function(r) {
  var t = r.key;
  if (t === "css") {
    var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(o, function(E) {
      var $ = E.getAttribute("data-emotion");
      $.indexOf(" ") !== -1 && (document.head.appendChild(E), E.setAttribute("data-s", ""));
    });
  }
  var a = r.stylisPlugins || Ct, i = {}, c, f = [];
  c = r.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + t + ' "]'),
    function(E) {
      for (var $ = E.getAttribute("data-emotion").split(" "), S = 1; S < $.length; S++)
        i[$[S]] = !0;
      f.push(E);
    }
  );
  var y, m = [wt, Tt];
  {
    var v, p = [pt, Et(function(E) {
      v.insert(E);
    })], k = bt(m.concat(a, p)), N = function($) {
      return ne(mt($), k);
    };
    y = function($, S, A, x) {
      v = A, N($ ? $ + "{" + S.styles + "}" : S.styles), x && (h.inserted[S.name] = !0);
    };
  }
  var h = {
    key: t,
    sheet: new et({
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
  return h.sheet.hydrate(f), h;
}, Le = { exports: {} }, C = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var br;
function Pt() {
  if (br) return C;
  br = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, f = e ? Symbol.for("react.context") : 60110, y = e ? Symbol.for("react.async_mode") : 60111, m = e ? Symbol.for("react.concurrent_mode") : 60111, v = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, k = e ? Symbol.for("react.suspense_list") : 60120, N = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, E = e ? Symbol.for("react.block") : 60121, $ = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, A = e ? Symbol.for("react.scope") : 60119;
  function x(s) {
    if (typeof s == "object" && s !== null) {
      var O = s.$$typeof;
      switch (O) {
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
                case v:
                case h:
                case N:
                case c:
                  return s;
                default:
                  return O;
              }
          }
        case t:
          return O;
      }
    }
  }
  function P(s) {
    return x(s) === m;
  }
  return C.AsyncMode = y, C.ConcurrentMode = m, C.ContextConsumer = f, C.ContextProvider = c, C.Element = r, C.ForwardRef = v, C.Fragment = o, C.Lazy = h, C.Memo = N, C.Portal = t, C.Profiler = i, C.StrictMode = a, C.Suspense = p, C.isAsyncMode = function(s) {
    return P(s) || x(s) === y;
  }, C.isConcurrentMode = P, C.isContextConsumer = function(s) {
    return x(s) === f;
  }, C.isContextProvider = function(s) {
    return x(s) === c;
  }, C.isElement = function(s) {
    return typeof s == "object" && s !== null && s.$$typeof === r;
  }, C.isForwardRef = function(s) {
    return x(s) === v;
  }, C.isFragment = function(s) {
    return x(s) === o;
  }, C.isLazy = function(s) {
    return x(s) === h;
  }, C.isMemo = function(s) {
    return x(s) === N;
  }, C.isPortal = function(s) {
    return x(s) === t;
  }, C.isProfiler = function(s) {
    return x(s) === i;
  }, C.isStrictMode = function(s) {
    return x(s) === a;
  }, C.isSuspense = function(s) {
    return x(s) === p;
  }, C.isValidElementType = function(s) {
    return typeof s == "string" || typeof s == "function" || s === o || s === m || s === i || s === a || s === p || s === k || typeof s == "object" && s !== null && (s.$$typeof === h || s.$$typeof === N || s.$$typeof === c || s.$$typeof === f || s.$$typeof === v || s.$$typeof === $ || s.$$typeof === S || s.$$typeof === A || s.$$typeof === E);
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
function At() {
  return Er || (Er = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, f = e ? Symbol.for("react.context") : 60110, y = e ? Symbol.for("react.async_mode") : 60111, m = e ? Symbol.for("react.concurrent_mode") : 60111, v = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, k = e ? Symbol.for("react.suspense_list") : 60120, N = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, E = e ? Symbol.for("react.block") : 60121, $ = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, A = e ? Symbol.for("react.scope") : 60119;
    function x(d) {
      return typeof d == "string" || typeof d == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      d === o || d === m || d === i || d === a || d === p || d === k || typeof d == "object" && d !== null && (d.$$typeof === h || d.$$typeof === N || d.$$typeof === c || d.$$typeof === f || d.$$typeof === v || d.$$typeof === $ || d.$$typeof === S || d.$$typeof === A || d.$$typeof === E);
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
                  case v:
                  case h:
                  case N:
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
    var s = y, O = m, g = f, ie = c, we = r, Te = v, se = o, ce = h, fe = N, ue = t, le = i, He = a, _e = p, Ce = !1;
    function G(d) {
      return Ce || (Ce = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), de(d) || P(d) === y;
    }
    function de(d) {
      return P(d) === m;
    }
    function H(d) {
      return P(d) === f;
    }
    function Be(d) {
      return P(d) === c;
    }
    function ve(d) {
      return typeof d == "object" && d !== null && d.$$typeof === r;
    }
    function Z(d) {
      return P(d) === v;
    }
    function Re(d) {
      return P(d) === o;
    }
    function Pe(d) {
      return P(d) === h;
    }
    function Ae(d) {
      return P(d) === N;
    }
    function Oe(d) {
      return P(d) === t;
    }
    function $e(d) {
      return P(d) === i;
    }
    function Ne(d) {
      return P(d) === a;
    }
    function Me(d) {
      return P(d) === p;
    }
    R.AsyncMode = s, R.ConcurrentMode = O, R.ContextConsumer = g, R.ContextProvider = ie, R.Element = we, R.ForwardRef = Te, R.Fragment = se, R.Lazy = ce, R.Memo = fe, R.Portal = ue, R.Profiler = le, R.StrictMode = He, R.Suspense = _e, R.isAsyncMode = G, R.isConcurrentMode = de, R.isContextConsumer = H, R.isContextProvider = Be, R.isElement = ve, R.isForwardRef = Z, R.isFragment = Re, R.isLazy = Pe, R.isMemo = Ae, R.isPortal = Oe, R.isProfiler = $e, R.isStrictMode = Ne, R.isSuspense = Me, R.isValidElementType = x, R.typeOf = P;
  }()), R;
}
var hr;
function Ot() {
  return hr || (hr = 1, process.env.NODE_ENV === "production" ? Le.exports = Pt() : Le.exports = At()), Le.exports;
}
var Je, gr;
function $t() {
  if (gr) return Je;
  gr = 1;
  var e = Ot(), r = {
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
  function c(h) {
    return e.isMemo(h) ? a : i[h.$$typeof] || r;
  }
  var f = Object.defineProperty, y = Object.getOwnPropertyNames, m = Object.getOwnPropertySymbols, v = Object.getOwnPropertyDescriptor, p = Object.getPrototypeOf, k = Object.prototype;
  function N(h, E, $) {
    if (typeof E != "string") {
      if (k) {
        var S = p(E);
        S && S !== k && N(h, S, $);
      }
      var A = y(E);
      m && (A = A.concat(m(E)));
      for (var x = c(h), P = c(E), s = 0; s < A.length; ++s) {
        var O = A[s];
        if (!t[O] && !($ && $[O]) && !(P && P[O]) && !(x && x[O])) {
          var g = v(E, O);
          try {
            f(h, O, g);
          } catch {
          }
        }
      }
    }
    return h;
  }
  return Je = N, Je;
}
$t();
var Nt = !0;
function Mt(e, r, t) {
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
  Nt === !1) && r.registered[a] === void 0 && (r.registered[a] = t.styles);
}, kt = function(r, t, o) {
  Ir(r, t, o);
  var a = r.key + "-" + t.name;
  if (r.inserted[t.name] === void 0) {
    var i = t;
    do
      r.insert(t === i ? "." + a : "", i, r.sheet, !0), i = i.next;
    while (i !== void 0);
  }
};
function jt(e) {
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
var It = {
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
}, Lt = !1, Yt = /[A-Z]|^ms/g, Ft = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Lr = function(r) {
  return r.charCodeAt(1) === 45;
}, Sr = function(r) {
  return r != null && typeof r != "boolean";
}, Ke = /* @__PURE__ */ ht(function(e) {
  return Lr(e) ? e : e.replace(Yt, "-$&").toLowerCase();
}), xr = function(r, t) {
  switch (r) {
    case "animation":
    case "animationName":
      if (typeof t == "string")
        return t.replace(Ft, function(o, a, i) {
          return q = {
            name: a,
            styles: i,
            next: q
          }, a;
        });
  }
  return It[r] !== 1 && !Lr(r) && typeof t == "number" && t !== 0 ? t + "px" : t;
}, Wt = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
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
      return zt(e, r, t);
    }
    case "function": {
      if (e !== void 0) {
        var y = q, m = t(e);
        return q = y, Se(e, r, m);
      }
      break;
    }
  }
  var v = t;
  return v;
}
function zt(e, r, t) {
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
        if (i === "NO_COMPONENT_SELECTOR" && Lt)
          throw new Error(Wt);
        if (Array.isArray(c) && typeof c[0] == "string" && r == null)
          for (var y = 0; y < c.length; y++)
            Sr(c[y]) && (o += Ke(i) + ":" + xr(i, c[y]) + ";");
        else {
          var m = Se(e, r, c);
          switch (i) {
            case "animation":
            case "animationName": {
              o += Ke(i) + ":" + m + ";";
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
var wr = /label:\s*([^\s;{]+)\s*(;|$)/g, q;
function Dt(e, r, t) {
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
      var y = i;
      a += y[f];
    }
  wr.lastIndex = 0;
  for (var m = "", v; (v = wr.exec(a)) !== null; )
    m += "-" + v[1];
  var p = jt(a) + m;
  return {
    name: p,
    styles: a,
    next: q
  };
}
var Ut = function(r) {
  return r();
}, qt = vr.useInsertionEffect ? vr.useInsertionEffect : !1, Vt = qt || Ut, Gt = !1, Yr = /* @__PURE__ */ I.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Rt({
    key: "css"
  }) : null
);
Yr.Provider;
var Ht = function(r) {
  return /* @__PURE__ */ I.forwardRef(function(t, o) {
    var a = I.useContext(Yr);
    return r(t, a, o);
  });
}, Bt = /* @__PURE__ */ I.createContext({}), Ge = {}.hasOwnProperty, rr = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Fr = function(r, t) {
  var o = {};
  for (var a in t)
    Ge.call(t, a) && (o[a] = t[a]);
  return o[rr] = r, o;
}, Jt = function(r) {
  var t = r.cache, o = r.serialized, a = r.isStringTag;
  return Ir(t, o, a), Vt(function() {
    return kt(t, o, a);
  }), null;
}, Kt = /* @__PURE__ */ Ht(function(e, r, t) {
  var o = e.css;
  typeof o == "string" && r.registered[o] !== void 0 && (o = r.registered[o]);
  var a = e[rr], i = [o], c = "";
  typeof e.className == "string" ? c = Mt(r.registered, i, e.className) : e.className != null && (c = e.className + " ");
  var f = Dt(i, void 0, I.useContext(Bt));
  c += r.key + "-" + f.name;
  var y = {};
  for (var m in e)
    Ge.call(e, m) && m !== "css" && m !== rr && !Gt && (y[m] = e[m]);
  return y.className = c, t && (y.ref = t), /* @__PURE__ */ I.createElement(I.Fragment, null, /* @__PURE__ */ I.createElement(Jt, {
    cache: r,
    serialized: f,
    isStringTag: typeof a == "string"
  }), /* @__PURE__ */ I.createElement(a, y));
}), Wr = Kt, Xt = Ee.Fragment, ze = function(r, t, o) {
  return Ge.call(t, "css") ? Ee.jsx(Wr, Fr(r, t), o) : Ee.jsx(r, t, o);
}, wn = function(r, t, o) {
  return Ge.call(t, "css") ? Ee.jsxs(Wr, Fr(r, t), o) : Ee.jsxs(r, t, o);
};
const Tr = (e) => {
  let r;
  const t = /* @__PURE__ */ new Set(), o = (m, v) => {
    const p = typeof m == "function" ? m(r) : m;
    if (!Object.is(p, r)) {
      const k = r;
      r = v ?? (typeof p != "object" || p === null) ? p : Object.assign({}, r, p), t.forEach((N) => N(r, k));
    }
  }, a = () => r, f = { setState: o, getState: a, getInitialState: () => y, subscribe: (m) => (t.add(m), () => t.delete(m)) }, y = r = e(o, a, f);
  return f;
}, Zt = (e) => e ? Tr(e) : Tr, Qt = (e) => e;
function en(e, r = Qt) {
  const t = Ze.useSyncExternalStore(
    e.subscribe,
    () => r(e.getState()),
    () => r(e.getInitialState())
  );
  return Ze.useDebugValue(t), t;
}
const rn = (e) => {
  const r = Zt(e), t = (o) => en(r, o);
  return Object.assign(t, r), t;
}, tn = (e) => rn, Xe = tn()((e) => ({
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
var nn = function() {
};
function on(e) {
  for (var r = [], t = 1; t < arguments.length; t++)
    r[t - 1] = arguments[t];
  e && e.addEventListener && e.addEventListener.apply(e, r);
}
function an(e) {
  for (var r = [], t = 1; t < arguments.length; t++)
    r[t - 1] = arguments[t];
  e && e.removeEventListener && e.removeEventListener.apply(e, r);
}
var sn = typeof window < "u", cn = sn ? window : null, _r = function(e) {
  return !!e.addEventListener;
}, Cr = function(e) {
  return !!e.on;
}, fn = function(e, r, t, o) {
  t === void 0 && (t = cn), I.useEffect(function() {
    if (r && t)
      return _r(t) ? on(t, e, r, o) : Cr(t) && t.on(e, r, o), function() {
        _r(t) ? an(t, e, r, o) : Cr(t) && t.off(e, r, o);
      };
  }, [e, r, t, JSON.stringify(o)]);
}, un = function(e) {
  return typeof e == "function" ? e : typeof e == "string" ? function(r) {
    return r.key === e;
  } : e ? function() {
    return !0;
  } : function() {
    return !1;
  };
}, Rr = function(e, r, t, o) {
  r === void 0 && (r = nn), t === void 0 && (t = {}), o === void 0 && (o = [e]);
  var a = t.event, i = a === void 0 ? "keydown" : a, c = t.target, f = t.options, y = I.useMemo(function() {
    var m = un(e), v = function(p) {
      if (m(p))
        return r(p);
    };
    return v;
  }, o);
  fn(i, y, c, f);
}, ln = {
  restoreOnUnmount: !1
};
function dn(e, r) {
  r === void 0 && (r = ln);
  var t = I.useRef(document.title);
  document.title !== e && (document.title = e), I.useEffect(function() {
    if (r && r.restoreOnUnmount)
      return function() {
        document.title = t.current;
      };
  }, []);
}
const vn = typeof document < "u" ? dn : function(e) {
};
function mn(e, { heStage: r, sys: t }) {
  zr = r, e.render(/* @__PURE__ */ ze(Dr, { heStage: r, sys: t }));
}
let zr;
async function yn(e) {
  function* r() {
    yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "TXT", nm: "mes", str: "あいうえお" }, yield { nm: "mes", str: "かきくけこ" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
  }
  Ur = r(), await e.load("main"), pn();
}
function pn() {
  zr.dispatchEvent(new CustomEvent("ev_next", {}));
}
function Dr({ heStage: e, sys: r }) {
  vn(r.cfg.oCfg.book.title);
  const t = Xe((v) => v.addLayer), o = Xe((v) => v.chgPic), a = Xe((v) => v.chgStr);
  function i() {
    for (console.log("fn:Main.tsx == next =="); ; ) {
      const { done: v, value: p } = Ur.next();
      if (v) break;
      r.caretaker.push("main:" + ++bn), "cls" in p ? t(p) : "fn" in p ? o(p) : a(p);
      break;
    }
  }
  I.useEffect(() => (e.addEventListener("ev_next", i), () => e.removeEventListener("ev_next", i)), []);
  function c() {
    r.caretaker.nextKey() || i();
  }
  Rr("ArrowDown", (v) => {
    v.stopPropagation(), v.preventDefault(), c();
  });
  function f() {
    r.caretaker.prevKey();
  }
  Rr("ArrowUp", (v) => {
    v.stopPropagation(), v.preventDefault(), f();
  });
  function y() {
    if (tr) {
      tr = !1;
      return;
    }
    qr || c();
  }
  const m = I.lazy(() => import("./Stage.js"));
  return /* @__PURE__ */ ze(I.Suspense, { fallback: /* @__PURE__ */ ze(Xt, { children: "Loading" }), children: /* @__PURE__ */ ze(m, { arg: { heStage: e, sys: r }, next: c, prev: f, onClick: y }) });
}
let bn = 0;
function* En() {
}
let Ur = En(), qr = !1;
const hn = (e) => qr = e;
let tr = !1;
function gn() {
  tr = !0;
}
const Tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Main: Dr,
  initMain: mn,
  onLong: gn,
  setDesignMode: hn,
  start: yn
}, Symbol.toStringTag, { value: "Module" }));
export {
  Wr as E,
  Xt as F,
  Tn as M,
  an as a,
  ze as b,
  Fr as c,
  gn as d,
  hn as e,
  Ge as h,
  sn as i,
  wn as j,
  nn as n,
  on as o,
  I as r,
  Dt as s,
  Xe as u
};
//# sourceMappingURL=Main.js.map
