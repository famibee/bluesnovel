var Re = { exports: {} }, d = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function st() {
  if (Fe) return d;
  Fe = 1;
  var Y = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), Te = Symbol.for("react.fragment"), te = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), ne = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), re = Symbol.for("react.suspense"), q = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), K = Symbol.iterator;
  function oe(n) {
    return n === null || typeof n != "object" ? null : (n = K && n[K] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ue = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, se = Object.assign, H = {};
  function k(n, o, c) {
    this.props = n, this.context = o, this.refs = H, this.updater = c || ue;
  }
  k.prototype.isReactComponent = {}, k.prototype.setState = function(n, o) {
    if (typeof n != "object" && typeof n != "function" && n != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, n, o, "setState");
  }, k.prototype.forceUpdate = function(n) {
    this.updater.enqueueForceUpdate(this, n, "forceUpdate");
  };
  function W() {
  }
  W.prototype = k.prototype;
  function $(n, o, c) {
    this.props = n, this.context = o, this.refs = H, this.updater = c || ue;
  }
  var I = $.prototype = new W();
  I.constructor = $, se(I, k.prototype), I.isPureReactComponent = !0;
  var ie = Array.isArray, m = { H: null, A: null, T: null, S: null }, z = Object.prototype.hasOwnProperty;
  function Q(n, o, c, f, h, g) {
    return c = g.ref, {
      $$typeof: Y,
      type: n,
      key: o,
      ref: c !== void 0 ? c : null,
      props: g
    };
  }
  function ae(n, o) {
    return Q(
      n.type,
      o,
      void 0,
      void 0,
      void 0,
      n.props
    );
  }
  function T(n) {
    return typeof n == "object" && n !== null && n.$$typeof === Y;
  }
  function ce(n) {
    var o = { "=": "=0", ":": "=2" };
    return "$" + n.replace(/[=:]/g, function(c) {
      return o[c];
    });
  }
  var fe = /\/+/g;
  function X(n, o) {
    return typeof n == "object" && n !== null && n.key != null ? ce("" + n.key) : o.toString(36);
  }
  function D() {
  }
  function le(n) {
    switch (n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw n.reason;
      default:
        switch (typeof n.status == "string" ? n.then(D, D) : (n.status = "pending", n.then(
          function(o) {
            n.status === "pending" && (n.status = "fulfilled", n.value = o);
          },
          function(o) {
            n.status === "pending" && (n.status = "rejected", n.reason = o);
          }
        )), n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw n.reason;
        }
    }
    throw n;
  }
  function M(n, o, c, f, h) {
    var g = typeof n;
    (g === "undefined" || g === "boolean") && (n = null);
    var p = !1;
    if (n === null) p = !0;
    else
      switch (g) {
        case "bigint":
        case "string":
        case "number":
          p = !0;
          break;
        case "object":
          switch (n.$$typeof) {
            case Y:
            case l:
              p = !0;
              break;
            case A:
              return p = n._init, M(
                p(n._payload),
                o,
                c,
                f,
                h
              );
          }
      }
    if (p)
      return h = h(n), p = f === "" ? "." + X(n, 0) : f, ie(h) ? (c = "", p != null && (c = p.replace(fe, "$&/") + "/"), M(h, o, c, "", function(Z) {
        return Z;
      })) : h != null && (T(h) && (h = ae(
        h,
        c + (h.key == null || n && n.key === h.key ? "" : ("" + h.key).replace(
          fe,
          "$&/"
        ) + "/") + p
      )), o.push(h)), 1;
    p = 0;
    var O = f === "" ? "." : f + ":";
    if (ie(n))
      for (var _ = 0; _ < n.length; _++)
        f = n[_], g = O + X(f, _), p += M(
          f,
          o,
          c,
          g,
          h
        );
    else if (_ = oe(n), typeof _ == "function")
      for (n = _.call(n), _ = 0; !(f = n.next()).done; )
        f = f.value, g = O + X(f, _++), p += M(
          f,
          o,
          c,
          g,
          h
        );
    else if (g === "object") {
      if (typeof n.then == "function")
        return M(
          le(n),
          o,
          c,
          f,
          h
        );
      throw o = String(n), Error(
        "Objects are not valid as a React child (found: " + (o === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : o) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return p;
  }
  function b(n, o, c) {
    if (n == null) return n;
    var f = [], h = 0;
    return M(n, f, "", "", function(g) {
      return o.call(c, g, h++);
    }), f;
  }
  function G(n) {
    if (n._status === -1) {
      var o = n._result;
      o = o(), o.then(
        function(c) {
          (n._status === 0 || n._status === -1) && (n._status = 1, n._result = c);
        },
        function(c) {
          (n._status === 0 || n._status === -1) && (n._status = 2, n._result = c);
        }
      ), n._status === -1 && (n._status = 0, n._result = o);
    }
    if (n._status === 1) return n._result.default;
    throw n._result;
  }
  var de = typeof reportError == "function" ? reportError : function(n) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var o = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof n == "object" && n !== null && typeof n.message == "string" ? String(n.message) : String(n),
        error: n
      });
      if (!window.dispatchEvent(o)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", n);
      return;
    }
    console.error(n);
  };
  function C() {
  }
  return d.Children = {
    map: b,
    forEach: function(n, o, c) {
      b(
        n,
        function() {
          o.apply(this, arguments);
        },
        c
      );
    },
    count: function(n) {
      var o = 0;
      return b(n, function() {
        o++;
      }), o;
    },
    toArray: function(n) {
      return b(n, function(o) {
        return o;
      }) || [];
    },
    only: function(n) {
      if (!T(n))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return n;
    }
  }, d.Component = k, d.Fragment = Te, d.Profiler = x, d.PureComponent = $, d.StrictMode = te, d.Suspense = re, d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = m, d.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, d.cache = function(n) {
    return function() {
      return n.apply(null, arguments);
    };
  }, d.cloneElement = function(n, o, c) {
    if (n == null)
      throw Error(
        "The argument must be a React element, but you passed " + n + "."
      );
    var f = se({}, n.props), h = n.key, g = void 0;
    if (o != null)
      for (p in o.ref !== void 0 && (g = void 0), o.key !== void 0 && (h = "" + o.key), o)
        !z.call(o, p) || p === "key" || p === "__self" || p === "__source" || p === "ref" && o.ref === void 0 || (f[p] = o[p]);
    var p = arguments.length - 2;
    if (p === 1) f.children = c;
    else if (1 < p) {
      for (var O = Array(p), _ = 0; _ < p; _++)
        O[_] = arguments[_ + 2];
      f.children = O;
    }
    return Q(n.type, h, void 0, void 0, g, f);
  }, d.createContext = function(n) {
    return n = {
      $$typeof: ne,
      _currentValue: n,
      _currentValue2: n,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, n.Provider = n, n.Consumer = {
      $$typeof: j,
      _context: n
    }, n;
  }, d.createElement = function(n, o, c) {
    var f, h = {}, g = null;
    if (o != null)
      for (f in o.key !== void 0 && (g = "" + o.key), o)
        z.call(o, f) && f !== "key" && f !== "__self" && f !== "__source" && (h[f] = o[f]);
    var p = arguments.length - 2;
    if (p === 1) h.children = c;
    else if (1 < p) {
      for (var O = Array(p), _ = 0; _ < p; _++)
        O[_] = arguments[_ + 2];
      h.children = O;
    }
    if (n && n.defaultProps)
      for (f in p = n.defaultProps, p)
        h[f] === void 0 && (h[f] = p[f]);
    return Q(n, g, void 0, void 0, null, h);
  }, d.createRef = function() {
    return { current: null };
  }, d.forwardRef = function(n) {
    return { $$typeof: B, render: n };
  }, d.isValidElement = T, d.lazy = function(n) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: n },
      _init: G
    };
  }, d.memo = function(n, o) {
    return {
      $$typeof: q,
      type: n,
      compare: o === void 0 ? null : o
    };
  }, d.startTransition = function(n) {
    var o = m.T, c = {};
    m.T = c;
    try {
      var f = n(), h = m.S;
      h !== null && h(c, f), typeof f == "object" && f !== null && typeof f.then == "function" && f.then(C, de);
    } catch (g) {
      de(g);
    } finally {
      m.T = o;
    }
  }, d.unstable_useCacheRefresh = function() {
    return m.H.useCacheRefresh();
  }, d.use = function(n) {
    return m.H.use(n);
  }, d.useActionState = function(n, o, c) {
    return m.H.useActionState(n, o, c);
  }, d.useCallback = function(n, o) {
    return m.H.useCallback(n, o);
  }, d.useContext = function(n) {
    return m.H.useContext(n);
  }, d.useDebugValue = function() {
  }, d.useDeferredValue = function(n, o) {
    return m.H.useDeferredValue(n, o);
  }, d.useEffect = function(n, o) {
    return m.H.useEffect(n, o);
  }, d.useId = function() {
    return m.H.useId();
  }, d.useImperativeHandle = function(n, o, c) {
    return m.H.useImperativeHandle(n, o, c);
  }, d.useInsertionEffect = function(n, o) {
    return m.H.useInsertionEffect(n, o);
  }, d.useLayoutEffect = function(n, o) {
    return m.H.useLayoutEffect(n, o);
  }, d.useMemo = function(n, o) {
    return m.H.useMemo(n, o);
  }, d.useOptimistic = function(n, o) {
    return m.H.useOptimistic(n, o);
  }, d.useReducer = function(n, o, c) {
    return m.H.useReducer(n, o, c);
  }, d.useRef = function(n) {
    return m.H.useRef(n);
  }, d.useState = function(n) {
    return m.H.useState(n);
  }, d.useSyncExternalStore = function(n, o, c) {
    return m.H.useSyncExternalStore(
      n,
      o,
      c
    );
  }, d.useTransition = function() {
    return m.H.useTransition();
  }, d.version = "19.0.0", d;
}
var ee = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
ee.exports;
var et;
function it() {
  return et || (et = 1, function(Y, l) {
    process.env.NODE_ENV !== "production" && function() {
      function Te(e, t) {
        Object.defineProperty(j.prototype, e, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              t[0],
              t[1]
            );
          }
        });
      }
      function te(e) {
        return e === null || typeof e != "object" ? null : (e = $e && e[$e] || e["@@iterator"], typeof e == "function" ? e : null);
      }
      function x(e, t) {
        e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
        var r = e + "." + t;
        Me[r] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          t,
          e
        ), Me[r] = !0);
      }
      function j(e, t, r) {
        this.props = e, this.context = t, this.refs = Se, this.updater = r || Ye;
      }
      function ne() {
      }
      function B(e, t, r) {
        this.props = e, this.context = t, this.refs = Se, this.updater = r || Ye;
      }
      function re(e) {
        return "" + e;
      }
      function q(e) {
        try {
          re(e);
          var t = !1;
        } catch {
          t = !0;
        }
        if (t) {
          t = console;
          var r = t.error, u = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return r.call(
            t,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            u
          ), re(e);
        }
      }
      function A(e) {
        if (e == null) return null;
        if (typeof e == "function")
          return e.$$typeof === rt ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
          case _:
            return "Fragment";
          case O:
            return "Portal";
          case be:
            return "Profiler";
          case Z:
            return "StrictMode";
          case he:
            return "Suspense";
          case Ae:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (typeof e.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), e.$$typeof) {
            case Oe:
              return (e.displayName || "Context") + ".Provider";
            case pe:
              return (e._context.displayName || "Context") + ".Consumer";
            case ve:
              var t = e.render;
              return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case V:
              return t = e.displayName || null, t !== null ? t : A(e.type) || "Memo";
            case J:
              t = e._payload, e = e._init;
              try {
                return A(e(t));
              } catch {
              }
          }
        return null;
      }
      function K(e) {
        return typeof e == "string" || typeof e == "function" || e === _ || e === be || e === Z || e === he || e === Ae || e === nt || typeof e == "object" && e !== null && (e.$$typeof === J || e.$$typeof === V || e.$$typeof === Oe || e.$$typeof === pe || e.$$typeof === ve || e.$$typeof === ot || e.getModuleId !== void 0);
      }
      function oe() {
      }
      function ue() {
        if (F === 0) {
          He = console.log, Ue = console.info, Le = console.warn, qe = console.error, We = console.group, Ie = console.groupCollapsed, ze = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: oe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        F++;
      }
      function se() {
        if (F--, F === 0) {
          var e = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: N({}, e, { value: He }),
            info: N({}, e, { value: Ue }),
            warn: N({}, e, { value: Le }),
            error: N({}, e, { value: qe }),
            group: N({}, e, { value: We }),
            groupCollapsed: N({}, e, { value: Ie }),
            groupEnd: N({}, e, { value: ze })
          });
        }
        0 > F && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function H(e) {
        if (je === void 0)
          try {
            throw Error();
          } catch (r) {
            var t = r.stack.trim().match(/\n( *(at )?)/);
            je = t && t[1] || "", De = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + je + e + De;
      }
      function k(e, t) {
        if (!e || ke) return "";
        var r = Ne.get(e);
        if (r !== void 0) return r;
        ke = !0, r = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var u = null;
        u = v.H, v.H = null, ue();
        try {
          var s = {
            DetermineComponentFrameRoot: function() {
              try {
                if (t) {
                  var S = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(S.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(S, []);
                    } catch (P) {
                      var Ce = P;
                    }
                    Reflect.construct(e, [], S);
                  } else {
                    try {
                      S.call();
                    } catch (P) {
                      Ce = P;
                    }
                    e.call(S.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (P) {
                    Ce = P;
                  }
                  (S = e()) && typeof S.catch == "function" && S.catch(function() {
                  });
                }
              } catch (P) {
                if (P && Ce && typeof P.stack == "string")
                  return [P.stack, Ce.stack];
              }
              return [null, null];
            }
          };
          s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var a = Object.getOwnPropertyDescriptor(
            s.DetermineComponentFrameRoot,
            "name"
          );
          a && a.configurable && Object.defineProperty(
            s.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var i = s.DetermineComponentFrameRoot(), y = i[0], E = i[1];
          if (y && E) {
            var w = y.split(`
`), R = E.split(`
`);
            for (i = a = 0; a < w.length && !w[a].includes(
              "DetermineComponentFrameRoot"
            ); )
              a++;
            for (; i < R.length && !R[i].includes(
              "DetermineComponentFrameRoot"
            ); )
              i++;
            if (a === w.length || i === R.length)
              for (a = w.length - 1, i = R.length - 1; 1 <= a && 0 <= i && w[a] !== R[i]; )
                i--;
            for (; 1 <= a && 0 <= i; a--, i--)
              if (w[a] !== R[i]) {
                if (a !== 1 || i !== 1)
                  do
                    if (a--, i--, 0 > i || w[a] !== R[i]) {
                      var L = `
` + w[a].replace(
                        " at new ",
                        " at "
                      );
                      return e.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", e.displayName)), typeof e == "function" && Ne.set(e, L), L;
                    }
                  while (1 <= a && 0 <= i);
                break;
              }
          }
        } finally {
          ke = !1, v.H = u, se(), Error.prepareStackTrace = r;
        }
        return w = (w = e ? e.displayName || e.name : "") ? H(w) : "", typeof e == "function" && Ne.set(e, w), w;
      }
      function W(e) {
        if (e == null) return "";
        if (typeof e == "function") {
          var t = e.prototype;
          return k(
            e,
            !(!t || !t.isReactComponent)
          );
        }
        if (typeof e == "string") return H(e);
        switch (e) {
          case he:
            return H("Suspense");
          case Ae:
            return H("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case ve:
              return e = k(e.render, !1), e;
            case V:
              return W(e.type);
            case J:
              t = e._payload, e = e._init;
              try {
                return W(e(t));
              } catch {
              }
          }
        return "";
      }
      function $() {
        var e = v.A;
        return e === null ? null : e.getOwner();
      }
      function I(e) {
        if (me.call(e, "key")) {
          var t = Object.getOwnPropertyDescriptor(e, "key").get;
          if (t && t.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function ie(e, t) {
        function r() {
          Ge || (Ge = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            t
          ));
        }
        r.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: r,
          configurable: !0
        });
      }
      function m() {
        var e = A(this.type);
        return Be[e] || (Be[e] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), e = this.props.ref, e !== void 0 ? e : null;
      }
      function z(e, t, r, u, s, a) {
        return r = a.ref, e = {
          $$typeof: p,
          type: e,
          key: t,
          props: a,
          _owner: s
        }, (r !== void 0 ? r : null) !== null ? Object.defineProperty(e, "ref", {
          enumerable: !1,
          get: m
        }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(e, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
      }
      function Q(e, t) {
        return t = z(
          e.type,
          t,
          void 0,
          void 0,
          e._owner,
          e.props
        ), t._store.validated = e._store.validated, t;
      }
      function ae(e, t) {
        if (typeof e == "object" && e && e.$$typeof !== ut) {
          if (ye(e))
            for (var r = 0; r < e.length; r++) {
              var u = e[r];
              T(u) && ce(u, t);
            }
          else if (T(e))
            e._store && (e._store.validated = 1);
          else if (r = te(e), typeof r == "function" && r !== e.entries && (r = r.call(e), r !== e))
            for (; !(e = r.next()).done; )
              T(e.value) && ce(e.value, t);
        }
      }
      function T(e) {
        return typeof e == "object" && e !== null && e.$$typeof === p;
      }
      function ce(e, t) {
        if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, t = fe(t), !Ke[t])) {
          Ke[t] = !0;
          var r = "";
          e && e._owner != null && e._owner !== $() && (r = null, typeof e._owner.tag == "number" ? r = A(e._owner.type) : typeof e._owner.name == "string" && (r = e._owner.name), r = " It was passed a child from " + r + ".");
          var u = v.getCurrentStack;
          v.getCurrentStack = function() {
            var s = W(e.type);
            return u && (s += u() || ""), s;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            t,
            r
          ), v.getCurrentStack = u;
        }
      }
      function fe(e) {
        var t = "", r = $();
        return r && (r = A(r.type)) && (t = `

Check the render method of \`` + r + "`."), t || (e = A(e)) && (t = `

Check the top-level render call using <` + e + ">."), t;
      }
      function X(e) {
        var t = { "=": "=0", ":": "=2" };
        return "$" + e.replace(/[=:]/g, function(r) {
          return t[r];
        });
      }
      function D(e, t) {
        return typeof e == "object" && e !== null && e.key != null ? (q(e.key), X("" + e.key)) : t.toString(36);
      }
      function le() {
      }
      function M(e) {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            switch (typeof e.status == "string" ? e.then(le, le) : (e.status = "pending", e.then(
              function(t) {
                e.status === "pending" && (e.status = "fulfilled", e.value = t);
              },
              function(t) {
                e.status === "pending" && (e.status = "rejected", e.reason = t);
              }
            )), e.status) {
              case "fulfilled":
                return e.value;
              case "rejected":
                throw e.reason;
            }
        }
        throw e;
      }
      function b(e, t, r, u, s) {
        var a = typeof e;
        (a === "undefined" || a === "boolean") && (e = null);
        var i = !1;
        if (e === null) i = !0;
        else
          switch (a) {
            case "bigint":
            case "string":
            case "number":
              i = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case p:
                case O:
                  i = !0;
                  break;
                case J:
                  return i = e._init, b(
                    i(e._payload),
                    t,
                    r,
                    u,
                    s
                  );
              }
          }
        if (i) {
          i = e, s = s(i);
          var y = u === "" ? "." + D(i, 0) : u;
          return ye(s) ? (r = "", y != null && (r = y.replace(Xe, "$&/") + "/"), b(s, t, r, "", function(w) {
            return w;
          })) : s != null && (T(s) && (s.key != null && (i && i.key === s.key || q(s.key)), r = Q(
            s,
            r + (s.key == null || i && i.key === s.key ? "" : ("" + s.key).replace(
              Xe,
              "$&/"
            ) + "/") + y
          ), u !== "" && i != null && T(i) && i.key == null && i._store && !i._store.validated && (r._store.validated = 2), s = r), t.push(s)), 1;
        }
        if (i = 0, y = u === "" ? "." : u + ":", ye(e))
          for (var E = 0; E < e.length; E++)
            u = e[E], a = y + D(u, E), i += b(
              u,
              t,
              r,
              a,
              s
            );
        else if (E = te(e), typeof E == "function")
          for (E === e.entries && (Qe || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Qe = !0), e = E.call(e), E = 0; !(u = e.next()).done; )
            u = u.value, a = y + D(u, E++), i += b(
              u,
              t,
              r,
              a,
              s
            );
        else if (a === "object") {
          if (typeof e.then == "function")
            return b(
              M(e),
              t,
              r,
              u,
              s
            );
          throw t = String(e), Error(
            "Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return i;
      }
      function G(e, t, r) {
        if (e == null) return e;
        var u = [], s = 0;
        return b(e, u, "", "", function(a) {
          return t.call(r, a, s++);
        }), u;
      }
      function de(e) {
        if (e._status === -1) {
          var t = e._result;
          t = t(), t.then(
            function(r) {
              (e._status === 0 || e._status === -1) && (e._status = 1, e._result = r);
            },
            function(r) {
              (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r);
            }
          ), e._status === -1 && (e._status = 0, e._result = t);
        }
        if (e._status === 1)
          return t = e._result, t === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            t
          ), "default" in t || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            t
          ), t.default;
        throw e._result;
      }
      function C() {
        var e = v.H;
        return e === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), e;
      }
      function n() {
      }
      function o(e) {
        if (ge === null)
          try {
            var t = ("require" + Math.random()).slice(0, 7);
            ge = (Y && Y[t]).call(
              Y,
              "timers"
            ).setImmediate;
          } catch {
            ge = function(u) {
              Ve === !1 && (Ve = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var s = new MessageChannel();
              s.port1.onmessage = u, s.port2.postMessage(void 0);
            };
          }
        return ge(e);
      }
      function c(e) {
        return 1 < e.length && typeof AggregateError == "function" ? new AggregateError(e) : e[0];
      }
      function f(e, t) {
        t !== _e - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), _e = t;
      }
      function h(e, t, r) {
        var u = v.actQueue;
        if (u !== null)
          if (u.length !== 0)
            try {
              g(u), o(function() {
                return h(e, t, r);
              });
              return;
            } catch (s) {
              v.thrownErrors.push(s);
            }
          else v.actQueue = null;
        0 < v.thrownErrors.length ? (u = c(v.thrownErrors), v.thrownErrors.length = 0, r(u)) : t(e);
      }
      function g(e) {
        if (!Pe) {
          Pe = !0;
          var t = 0;
          try {
            for (; t < e.length; t++) {
              var r = e[t];
              do {
                v.didUsePromise = !1;
                var u = r(!1);
                if (u !== null) {
                  if (v.didUsePromise) {
                    e[t] = r, e.splice(0, t);
                    return;
                  }
                  r = u;
                } else break;
              } while (!0);
            }
            e.length = 0;
          } catch (s) {
            e.splice(0, t + 1), v.thrownErrors.push(s);
          } finally {
            Pe = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var p = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), Z = Symbol.for("react.strict_mode"), be = Symbol.for("react.profiler"), pe = Symbol.for("react.consumer"), Oe = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), he = Symbol.for("react.suspense"), Ae = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), J = Symbol.for("react.lazy"), nt = Symbol.for("react.offscreen"), $e = Symbol.iterator, Me = {}, Ye = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(e) {
          x(e, "forceUpdate");
        },
        enqueueReplaceState: function(e) {
          x(e, "replaceState");
        },
        enqueueSetState: function(e) {
          x(e, "setState");
        }
      }, N = Object.assign, Se = {};
      Object.freeze(Se), j.prototype.isReactComponent = {}, j.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, e, t, "setState");
      }, j.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      var U = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, Ee;
      for (Ee in U)
        U.hasOwnProperty(Ee) && Te(Ee, U[Ee]);
      ne.prototype = j.prototype, U = B.prototype = new ne(), U.constructor = B, N(U, j.prototype), U.isPureReactComponent = !0;
      var ye = Array.isArray, rt = Symbol.for("react.client.reference"), v = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null
      }, me = Object.prototype.hasOwnProperty, ot = Symbol.for("react.client.reference"), F = 0, He, Ue, Le, qe, We, Ie, ze;
      oe.__reactDisabledLog = !0;
      var je, De, ke = !1, Ne = new (typeof WeakMap == "function" ? WeakMap : Map)(), ut = Symbol.for("react.client.reference"), Ge, xe, Be = {}, Ke = {}, Qe = !1, Xe = /\/+/g, Ze = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var t = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
            error: e
          });
          if (!window.dispatchEvent(t)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      }, Ve = !1, ge = null, _e = 0, we = !1, Pe = !1, Je = typeof queueMicrotask == "function" ? function(e) {
        queueMicrotask(function() {
          return queueMicrotask(e);
        });
      } : o;
      l.Children = {
        map: G,
        forEach: function(e, t, r) {
          G(
            e,
            function() {
              t.apply(this, arguments);
            },
            r
          );
        },
        count: function(e) {
          var t = 0;
          return G(e, function() {
            t++;
          }), t;
        },
        toArray: function(e) {
          return G(e, function(t) {
            return t;
          }) || [];
        },
        only: function(e) {
          if (!T(e))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return e;
        }
      }, l.Component = j, l.Fragment = _, l.Profiler = be, l.PureComponent = B, l.StrictMode = Z, l.Suspense = he, l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = v, l.act = function(e) {
        var t = v.actQueue, r = _e;
        _e++;
        var u = v.actQueue = t !== null ? t : [], s = !1;
        try {
          var a = e();
        } catch (E) {
          v.thrownErrors.push(E);
        }
        if (0 < v.thrownErrors.length)
          throw f(t, r), e = c(v.thrownErrors), v.thrownErrors.length = 0, e;
        if (a !== null && typeof a == "object" && typeof a.then == "function") {
          var i = a;
          return Je(function() {
            s || we || (we = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(E, w) {
              s = !0, i.then(
                function(R) {
                  if (f(t, r), r === 0) {
                    try {
                      g(u), o(function() {
                        return h(
                          R,
                          E,
                          w
                        );
                      });
                    } catch (S) {
                      v.thrownErrors.push(S);
                    }
                    if (0 < v.thrownErrors.length) {
                      var L = c(
                        v.thrownErrors
                      );
                      v.thrownErrors.length = 0, w(L);
                    }
                  } else E(R);
                },
                function(R) {
                  f(t, r), 0 < v.thrownErrors.length && (R = c(
                    v.thrownErrors
                  ), v.thrownErrors.length = 0), w(R);
                }
              );
            }
          };
        }
        var y = a;
        if (f(t, r), r === 0 && (g(u), u.length !== 0 && Je(function() {
          s || we || (we = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), v.actQueue = null), 0 < v.thrownErrors.length)
          throw e = c(v.thrownErrors), v.thrownErrors.length = 0, e;
        return {
          then: function(E, w) {
            s = !0, r === 0 ? (v.actQueue = u, o(function() {
              return h(
                y,
                E,
                w
              );
            })) : E(y);
          }
        };
      }, l.cache = function(e) {
        return function() {
          return e.apply(null, arguments);
        };
      }, l.cloneElement = function(e, t, r) {
        if (e == null)
          throw Error(
            "The argument must be a React element, but you passed " + e + "."
          );
        var u = N({}, e.props), s = e.key, a = e._owner;
        if (t != null) {
          var i;
          e: {
            if (me.call(t, "ref") && (i = Object.getOwnPropertyDescriptor(
              t,
              "ref"
            ).get) && i.isReactWarning) {
              i = !1;
              break e;
            }
            i = t.ref !== void 0;
          }
          i && (a = $()), I(t) && (q(t.key), s = "" + t.key);
          for (y in t)
            !me.call(t, y) || y === "key" || y === "__self" || y === "__source" || y === "ref" && t.ref === void 0 || (u[y] = t[y]);
        }
        var y = arguments.length - 2;
        if (y === 1) u.children = r;
        else if (1 < y) {
          i = Array(y);
          for (var E = 0; E < y; E++)
            i[E] = arguments[E + 2];
          u.children = i;
        }
        for (u = z(e.type, s, void 0, void 0, a, u), s = 2; s < arguments.length; s++)
          ae(arguments[s], u.type);
        return u;
      }, l.createContext = function(e) {
        return e = {
          $$typeof: Oe,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, e.Provider = e, e.Consumer = {
          $$typeof: pe,
          _context: e
        }, e._currentRenderer = null, e._currentRenderer2 = null, e;
      }, l.createElement = function(e, t, r) {
        if (K(e))
          for (var u = 2; u < arguments.length; u++)
            ae(arguments[u], e);
        else {
          if (u = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null) var s = "null";
          else
            ye(e) ? s = "array" : e !== void 0 && e.$$typeof === p ? (s = "<" + (A(e.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            s,
            u
          );
        }
        var a;
        if (u = {}, s = null, t != null)
          for (a in xe || !("__self" in t) || "key" in t || (xe = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), I(t) && (q(t.key), s = "" + t.key), t)
            me.call(t, a) && a !== "key" && a !== "__self" && a !== "__source" && (u[a] = t[a]);
        var i = arguments.length - 2;
        if (i === 1) u.children = r;
        else if (1 < i) {
          for (var y = Array(i), E = 0; E < i; E++)
            y[E] = arguments[E + 2];
          Object.freeze && Object.freeze(y), u.children = y;
        }
        if (e && e.defaultProps)
          for (a in i = e.defaultProps, i)
            u[a] === void 0 && (u[a] = i[a]);
        return s && ie(
          u,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        ), z(e, s, void 0, void 0, $(), u);
      }, l.createRef = function() {
        var e = { current: null };
        return Object.seal(e), e;
      }, l.forwardRef = function(e) {
        e != null && e.$$typeof === V ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof e != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          e === null ? "null" : typeof e
        ) : e.length !== 0 && e.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), e != null && e.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var t = { $$typeof: ve, render: e }, r;
        return Object.defineProperty(t, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return r;
          },
          set: function(u) {
            r = u, e.name || e.displayName || (Object.defineProperty(e, "name", { value: u }), e.displayName = u);
          }
        }), t;
      }, l.isValidElement = T, l.lazy = function(e) {
        return {
          $$typeof: J,
          _payload: { _status: -1, _result: e },
          _init: de
        };
      }, l.memo = function(e, t) {
        K(e) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          e === null ? "null" : typeof e
        ), t = {
          $$typeof: V,
          type: e,
          compare: t === void 0 ? null : t
        };
        var r;
        return Object.defineProperty(t, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return r;
          },
          set: function(u) {
            r = u, e.name || e.displayName || (Object.defineProperty(e, "name", { value: u }), e.displayName = u);
          }
        }), t;
      }, l.startTransition = function(e) {
        var t = v.T, r = {};
        v.T = r, r._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var u = e(), s = v.S;
          s !== null && s(r, u), typeof u == "object" && u !== null && typeof u.then == "function" && u.then(n, Ze);
        } catch (a) {
          Ze(a);
        } finally {
          t === null && r._updatedFibers && (e = r._updatedFibers.size, r._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), v.T = t;
        }
      }, l.unstable_useCacheRefresh = function() {
        return C().useCacheRefresh();
      }, l.use = function(e) {
        return C().use(e);
      }, l.useActionState = function(e, t, r) {
        return C().useActionState(
          e,
          t,
          r
        );
      }, l.useCallback = function(e, t) {
        return C().useCallback(e, t);
      }, l.useContext = function(e) {
        var t = C();
        return e.$$typeof === pe && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), t.useContext(e);
      }, l.useDebugValue = function(e, t) {
        return C().useDebugValue(e, t);
      }, l.useDeferredValue = function(e, t) {
        return C().useDeferredValue(e, t);
      }, l.useEffect = function(e, t) {
        return C().useEffect(e, t);
      }, l.useId = function() {
        return C().useId();
      }, l.useImperativeHandle = function(e, t, r) {
        return C().useImperativeHandle(e, t, r);
      }, l.useInsertionEffect = function(e, t) {
        return C().useInsertionEffect(e, t);
      }, l.useLayoutEffect = function(e, t) {
        return C().useLayoutEffect(e, t);
      }, l.useMemo = function(e, t) {
        return C().useMemo(e, t);
      }, l.useOptimistic = function(e, t) {
        return C().useOptimistic(e, t);
      }, l.useReducer = function(e, t, r) {
        return C().useReducer(e, t, r);
      }, l.useRef = function(e) {
        return C().useRef(e);
      }, l.useState = function(e) {
        return C().useState(e);
      }, l.useSyncExternalStore = function(e, t, r) {
        return C().useSyncExternalStore(
          e,
          t,
          r
        );
      }, l.useTransition = function() {
        return C().useTransition();
      }, l.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(ee, ee.exports)), ee.exports;
}
var tt;
function at() {
  return tt || (tt = 1, process.env.NODE_ENV === "production" ? Re.exports = st() : Re.exports = it()), Re.exports;
}
export {
  at as r
};
//# sourceMappingURL=index3.js.map
