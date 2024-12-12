import { g as Nt } from "./web2.js";
function kt(r, t) {
  for (var n = 0; n < t.length; n++) {
    const i = t[n];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const u in i)
        if (u !== "default" && !(u in r)) {
          const c = Object.getOwnPropertyDescriptor(i, u);
          c && Object.defineProperty(r, u, c.get ? c : {
            enumerable: !0,
            get: () => i[u]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
var ur = { exports: {} }, Ke = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vr;
function jt() {
  if (Vr) return Ke;
  Vr = 1;
  var r = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(i, u, c) {
    var p = null;
    if (c !== void 0 && (p = "" + c), u.key !== void 0 && (p = "" + u.key), "key" in u) {
      c = {};
      for (var m in u)
        m !== "key" && (c[m] = u[m]);
    } else c = u;
    return u = c.ref, {
      $$typeof: r,
      type: i,
      key: p,
      ref: u !== void 0 ? u : null,
      props: c
    };
  }
  return Ke.Fragment = t, Ke.jsx = n, Ke.jsxs = n, Ke;
}
var Ve = {}, cr = { exports: {} }, k = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xr;
function Mt() {
  if (Xr) return k;
  Xr = 1;
  var r = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), p = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), A = Symbol.iterator;
  function ee(s) {
    return s === null || typeof s != "object" ? null : (s = A && s[A] || s["@@iterator"], typeof s == "function" ? s : null);
  }
  var F = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, j = Object.assign, x = {};
  function H(s, d, T) {
    this.props = s, this.context = d, this.refs = x, this.updater = T || F;
  }
  H.prototype.isReactComponent = {}, H.prototype.setState = function(s, d) {
    if (typeof s != "object" && typeof s != "function" && s != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, s, d, "setState");
  }, H.prototype.forceUpdate = function(s) {
    this.updater.enqueueForceUpdate(this, s, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = H.prototype;
  function U(s, d, T) {
    this.props = s, this.context = d, this.refs = x, this.updater = T || F;
  }
  var L = U.prototype = new Y();
  L.constructor = U, j(L, H.prototype), L.isPureReactComponent = !0;
  var q = Array.isArray, l = { H: null, A: null, T: null, S: null }, W = Object.prototype.hasOwnProperty;
  function I(s, d, T, R, $, K) {
    return T = K.ref, {
      $$typeof: r,
      type: s,
      key: d,
      ref: T !== void 0 ? T : null,
      props: K
    };
  }
  function Ce(s, d) {
    return I(
      s.type,
      d,
      void 0,
      void 0,
      void 0,
      s.props
    );
  }
  function se(s) {
    return typeof s == "object" && s !== null && s.$$typeof === r;
  }
  function ke(s) {
    var d = { "=": "=0", ":": "=2" };
    return "$" + s.replace(/[=:]/g, function(T) {
      return d[T];
    });
  }
  var Re = /\/+/g;
  function ge(s, d) {
    return typeof s == "object" && s !== null && s.key != null ? ke("" + s.key) : d.toString(36);
  }
  function ye() {
  }
  function Te(s) {
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        throw s.reason;
      default:
        switch (typeof s.status == "string" ? s.then(ye, ye) : (s.status = "pending", s.then(
          function(d) {
            s.status === "pending" && (s.status = "fulfilled", s.value = d);
          },
          function(d) {
            s.status === "pending" && (s.status = "rejected", s.reason = d);
          }
        )), s.status) {
          case "fulfilled":
            return s.value;
          case "rejected":
            throw s.reason;
        }
    }
    throw s;
  }
  function le(s, d, T, R, $) {
    var K = typeof s;
    (K === "undefined" || K === "boolean") && (s = null);
    var P = !1;
    if (s === null) P = !0;
    else
      switch (K) {
        case "bigint":
        case "string":
        case "number":
          P = !0;
          break;
        case "object":
          switch (s.$$typeof) {
            case r:
            case t:
              P = !0;
              break;
            case C:
              return P = s._init, le(
                P(s._payload),
                d,
                T,
                R,
                $
              );
          }
      }
    if (P)
      return $ = $(s), P = R === "" ? "." + ge(s, 0) : R, q($) ? (T = "", P != null && (T = P.replace(Re, "$&/") + "/"), le($, d, T, "", function(Oe) {
        return Oe;
      })) : $ != null && (se($) && ($ = Ce(
        $,
        T + ($.key == null || s && s.key === $.key ? "" : ("" + $.key).replace(
          Re,
          "$&/"
        ) + "/") + P
      )), d.push($)), 1;
    P = 0;
    var ie = R === "" ? "." : R + ":";
    if (q(s))
      for (var Z = 0; Z < s.length; Z++)
        R = s[Z], K = ie + ge(R, Z), P += le(
          R,
          d,
          T,
          K,
          $
        );
    else if (Z = ee(s), typeof Z == "function")
      for (s = Z.call(s), Z = 0; !(R = s.next()).done; )
        R = R.value, K = ie + ge(R, Z++), P += le(
          R,
          d,
          T,
          K,
          $
        );
    else if (K === "object") {
      if (typeof s.then == "function")
        return le(
          Te(s),
          d,
          T,
          R,
          $
        );
      throw d = String(s), Error(
        "Objects are not valid as a React child (found: " + (d === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : d) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return P;
  }
  function fe(s, d, T) {
    if (s == null) return s;
    var R = [], $ = 0;
    return le(s, R, "", "", function(K) {
      return d.call(T, K, $++);
    }), R;
  }
  function be(s) {
    if (s._status === -1) {
      var d = s._result;
      d = d(), d.then(
        function(T) {
          (s._status === 0 || s._status === -1) && (s._status = 1, s._result = T);
        },
        function(T) {
          (s._status === 0 || s._status === -1) && (s._status = 2, s._result = T);
        }
      ), s._status === -1 && (s._status = 0, s._result = d);
    }
    if (s._status === 1) return s._result.default;
    throw s._result;
  }
  var je = typeof reportError == "function" ? reportError : function(s) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var d = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof s == "object" && s !== null && typeof s.message == "string" ? String(s.message) : String(s),
        error: s
      });
      if (!window.dispatchEvent(d)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", s);
      return;
    }
    console.error(s);
  };
  function z() {
  }
  return k.Children = {
    map: fe,
    forEach: function(s, d, T) {
      fe(
        s,
        function() {
          d.apply(this, arguments);
        },
        T
      );
    },
    count: function(s) {
      var d = 0;
      return fe(s, function() {
        d++;
      }), d;
    },
    toArray: function(s) {
      return fe(s, function(d) {
        return d;
      }) || [];
    },
    only: function(s) {
      if (!se(s))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return s;
    }
  }, k.Component = H, k.Fragment = n, k.Profiler = u, k.PureComponent = U, k.StrictMode = i, k.Suspense = w, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, k.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, k.cache = function(s) {
    return function() {
      return s.apply(null, arguments);
    };
  }, k.cloneElement = function(s, d, T) {
    if (s == null)
      throw Error(
        "The argument must be a React element, but you passed " + s + "."
      );
    var R = j({}, s.props), $ = s.key, K = void 0;
    if (d != null)
      for (P in d.ref !== void 0 && (K = void 0), d.key !== void 0 && ($ = "" + d.key), d)
        !W.call(d, P) || P === "key" || P === "__self" || P === "__source" || P === "ref" && d.ref === void 0 || (R[P] = d[P]);
    var P = arguments.length - 2;
    if (P === 1) R.children = T;
    else if (1 < P) {
      for (var ie = Array(P), Z = 0; Z < P; Z++)
        ie[Z] = arguments[Z + 2];
      R.children = ie;
    }
    return I(s.type, $, void 0, void 0, K, R);
  }, k.createContext = function(s) {
    return s = {
      $$typeof: p,
      _currentValue: s,
      _currentValue2: s,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, s.Provider = s, s.Consumer = {
      $$typeof: c,
      _context: s
    }, s;
  }, k.createElement = function(s, d, T) {
    var R, $ = {}, K = null;
    if (d != null)
      for (R in d.key !== void 0 && (K = "" + d.key), d)
        W.call(d, R) && R !== "key" && R !== "__self" && R !== "__source" && ($[R] = d[R]);
    var P = arguments.length - 2;
    if (P === 1) $.children = T;
    else if (1 < P) {
      for (var ie = Array(P), Z = 0; Z < P; Z++)
        ie[Z] = arguments[Z + 2];
      $.children = ie;
    }
    if (s && s.defaultProps)
      for (R in P = s.defaultProps, P)
        $[R] === void 0 && ($[R] = P[R]);
    return I(s, K, void 0, void 0, null, $);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(s) {
    return { $$typeof: m, render: s };
  }, k.isValidElement = se, k.lazy = function(s) {
    return {
      $$typeof: C,
      _payload: { _status: -1, _result: s },
      _init: be
    };
  }, k.memo = function(s, d) {
    return {
      $$typeof: g,
      type: s,
      compare: d === void 0 ? null : d
    };
  }, k.startTransition = function(s) {
    var d = l.T, T = {};
    l.T = T;
    try {
      var R = s(), $ = l.S;
      $ !== null && $(T, R), typeof R == "object" && R !== null && typeof R.then == "function" && R.then(z, je);
    } catch (K) {
      je(K);
    } finally {
      l.T = d;
    }
  }, k.unstable_useCacheRefresh = function() {
    return l.H.useCacheRefresh();
  }, k.use = function(s) {
    return l.H.use(s);
  }, k.useActionState = function(s, d, T) {
    return l.H.useActionState(s, d, T);
  }, k.useCallback = function(s, d) {
    return l.H.useCallback(s, d);
  }, k.useContext = function(s) {
    return l.H.useContext(s);
  }, k.useDebugValue = function() {
  }, k.useDeferredValue = function(s, d) {
    return l.H.useDeferredValue(s, d);
  }, k.useEffect = function(s, d) {
    return l.H.useEffect(s, d);
  }, k.useId = function() {
    return l.H.useId();
  }, k.useImperativeHandle = function(s, d, T) {
    return l.H.useImperativeHandle(s, d, T);
  }, k.useInsertionEffect = function(s, d) {
    return l.H.useInsertionEffect(s, d);
  }, k.useLayoutEffect = function(s, d) {
    return l.H.useLayoutEffect(s, d);
  }, k.useMemo = function(s, d) {
    return l.H.useMemo(s, d);
  }, k.useOptimistic = function(s, d) {
    return l.H.useOptimistic(s, d);
  }, k.useReducer = function(s, d, T) {
    return l.H.useReducer(s, d, T);
  }, k.useRef = function(s) {
    return l.H.useRef(s);
  }, k.useState = function(s) {
    return l.H.useState(s);
  }, k.useSyncExternalStore = function(s, d, T) {
    return l.H.useSyncExternalStore(
      s,
      d,
      T
    );
  }, k.useTransition = function() {
    return l.H.useTransition();
  }, k.version = "19.0.0", k;
}
var Qe = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Qe.exports;
var Qr;
function Yt() {
  return Qr || (Qr = 1, function(r, t) {
    process.env.NODE_ENV !== "production" && function() {
      function n(e, a) {
        Object.defineProperty(c.prototype, e, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              a[0],
              a[1]
            );
          }
        });
      }
      function i(e) {
        return e === null || typeof e != "object" ? null : (e = Be && e[Be] || e["@@iterator"], typeof e == "function" ? e : null);
      }
      function u(e, a) {
        e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
        var f = e + "." + a;
        Fe[f] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          a,
          e
        ), Fe[f] = !0);
      }
      function c(e, a, f) {
        this.props = e, this.context = a, this.refs = y, this.updater = f || o;
      }
      function p() {
      }
      function m(e, a, f) {
        this.props = e, this.context = a, this.refs = y, this.updater = f || o;
      }
      function w(e) {
        return "" + e;
      }
      function g(e) {
        try {
          w(e);
          var a = !1;
        } catch {
          a = !0;
        }
        if (a) {
          a = console;
          var f = a.error, v = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return f.call(
            a,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            v
          ), w(e);
        }
      }
      function C(e) {
        if (e == null) return null;
        if (typeof e == "function")
          return e.$$typeof === N ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
          case Z:
            return "Fragment";
          case ie:
            return "Portal";
          case Le:
            return "Profiler";
          case Oe:
            return "StrictMode";
          case pe:
            return "Suspense";
          case Ae:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (typeof e.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), e.$$typeof) {
            case b:
              return (e.displayName || "Context") + ".Provider";
            case Me:
              return (e._context.displayName || "Context") + ".Consumer";
            case _e:
              var a = e.render;
              return e = e.displayName, e || (e = a.displayName || a.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case Ue:
              return a = e.displayName || null, a !== null ? a : C(e.type) || "Memo";
            case Ie:
              a = e._payload, e = e._init;
              try {
                return C(e(a));
              } catch {
              }
          }
        return null;
      }
      function A(e) {
        return typeof e == "string" || typeof e == "function" || e === Z || e === Le || e === Oe || e === pe || e === Ae || e === nr || typeof e == "object" && e !== null && (e.$$typeof === Ie || e.$$typeof === Ue || e.$$typeof === b || e.$$typeof === Me || e.$$typeof === _e || e.$$typeof === oe || e.getModuleId !== void 0);
      }
      function ee() {
      }
      function F() {
        if (me === 0) {
          He = console.log, Se = console.info, We = console.warn, Ee = console.error, Yr = console.group, Lr = console.groupCollapsed, Ir = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ee,
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
        me++;
      }
      function j() {
        if (me--, me === 0) {
          var e = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: h({}, e, { value: He }),
            info: h({}, e, { value: Se }),
            warn: h({}, e, { value: We }),
            error: h({}, e, { value: Ee }),
            group: h({}, e, { value: Yr }),
            groupCollapsed: h({}, e, { value: Lr }),
            groupEnd: h({}, e, { value: Ir })
          });
        }
        0 > me && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function x(e) {
        if (_r === void 0)
          try {
            throw Error();
          } catch (f) {
            var a = f.stack.trim().match(/\n( *(at )?)/);
            _r = a && a[1] || "", Hr = -1 < f.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < f.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + _r + e + Hr;
      }
      function H(e, a) {
        if (!e || wr) return "";
        var f = Sr.get(e);
        if (f !== void 0) return f;
        wr = !0, f = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var v = null;
        v = O.H, O.H = null, F();
        try {
          var E = {
            DetermineComponentFrameRoot: function() {
              try {
                if (a) {
                  var Pe = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(Pe.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(Pe, []);
                    } catch (Ye) {
                      var ir = Ye;
                    }
                    Reflect.construct(e, [], Pe);
                  } else {
                    try {
                      Pe.call();
                    } catch (Ye) {
                      ir = Ye;
                    }
                    e.call(Pe.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (Ye) {
                    ir = Ye;
                  }
                  (Pe = e()) && typeof Pe.catch == "function" && Pe.catch(function() {
                  });
                }
              } catch (Ye) {
                if (Ye && ir && typeof Ye.stack == "string")
                  return [Ye.stack, ir.stack];
              }
              return [null, null];
            }
          };
          E.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var S = Object.getOwnPropertyDescriptor(
            E.DetermineComponentFrameRoot,
            "name"
          );
          S && S.configurable && Object.defineProperty(
            E.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var _ = E.DetermineComponentFrameRoot(), Q = _[0], D = _[1];
          if (Q && D) {
            var re = Q.split(`
`), de = D.split(`
`);
            for (_ = S = 0; S < re.length && !re[S].includes(
              "DetermineComponentFrameRoot"
            ); )
              S++;
            for (; _ < de.length && !de[_].includes(
              "DetermineComponentFrameRoot"
            ); )
              _++;
            if (S === re.length || _ === de.length)
              for (S = re.length - 1, _ = de.length - 1; 1 <= S && 0 <= _ && re[S] !== de[_]; )
                _--;
            for (; 1 <= S && 0 <= _; S--, _--)
              if (re[S] !== de[_]) {
                if (S !== 1 || _ !== 1)
                  do
                    if (S--, _--, 0 > _ || re[S] !== de[_]) {
                      var qe = `
` + re[S].replace(
                        " at new ",
                        " at "
                      );
                      return e.displayName && qe.includes("<anonymous>") && (qe = qe.replace("<anonymous>", e.displayName)), typeof e == "function" && Sr.set(e, qe), qe;
                    }
                  while (1 <= S && 0 <= _);
                break;
              }
          }
        } finally {
          wr = !1, O.H = v, j(), Error.prepareStackTrace = f;
        }
        return re = (re = e ? e.displayName || e.name : "") ? x(re) : "", typeof e == "function" && Sr.set(e, re), re;
      }
      function Y(e) {
        if (e == null) return "";
        if (typeof e == "function") {
          var a = e.prototype;
          return H(
            e,
            !(!a || !a.isReactComponent)
          );
        }
        if (typeof e == "string") return x(e);
        switch (e) {
          case pe:
            return x("Suspense");
          case Ae:
            return x("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case _e:
              return e = H(e.render, !1), e;
            case Ue:
              return Y(e.type);
            case Ie:
              a = e._payload, e = e._init;
              try {
                return Y(e(a));
              } catch {
              }
          }
        return "";
      }
      function U() {
        var e = O.A;
        return e === null ? null : e.getOwner();
      }
      function L(e) {
        if (we.call(e, "key")) {
          var a = Object.getOwnPropertyDescriptor(e, "key").get;
          if (a && a.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function q(e, a) {
        function f() {
          Ur || (Ur = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            a
          ));
        }
        f.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: f,
          configurable: !0
        });
      }
      function l() {
        var e = C(this.type);
        return qr[e] || (qr[e] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), e = this.props.ref, e !== void 0 ? e : null;
      }
      function W(e, a, f, v, E, S) {
        return f = S.ref, e = {
          $$typeof: P,
          type: e,
          key: a,
          props: S,
          _owner: E
        }, (f !== void 0 ? f : null) !== null ? Object.defineProperty(e, "ref", {
          enumerable: !1,
          get: l
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
      function I(e, a) {
        return a = W(
          e.type,
          a,
          void 0,
          void 0,
          e._owner,
          e.props
        ), a._store.validated = e._store.validated, a;
      }
      function Ce(e, a) {
        if (typeof e == "object" && e && e.$$typeof !== $t) {
          if (J(e))
            for (var f = 0; f < e.length; f++) {
              var v = e[f];
              se(v) && ke(v, a);
            }
          else if (se(e))
            e._store && (e._store.validated = 1);
          else if (f = i(e), typeof f == "function" && f !== e.entries && (f = f.call(e), f !== e))
            for (; !(e = f.next()).done; )
              se(e.value) && ke(e.value, a);
        }
      }
      function se(e) {
        return typeof e == "object" && e !== null && e.$$typeof === P;
      }
      function ke(e, a) {
        if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, a = Re(a), !zr[a])) {
          zr[a] = !0;
          var f = "";
          e && e._owner != null && e._owner !== U() && (f = null, typeof e._owner.tag == "number" ? f = C(e._owner.type) : typeof e._owner.name == "string" && (f = e._owner.name), f = " It was passed a child from " + f + ".");
          var v = O.getCurrentStack;
          O.getCurrentStack = function() {
            var E = Y(e.type);
            return v && (E += v() || ""), E;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            a,
            f
          ), O.getCurrentStack = v;
        }
      }
      function Re(e) {
        var a = "", f = U();
        return f && (f = C(f.type)) && (a = `

Check the render method of \`` + f + "`."), a || (e = C(e)) && (a = `

Check the top-level render call using <` + e + ">."), a;
      }
      function ge(e) {
        var a = { "=": "=0", ":": "=2" };
        return "$" + e.replace(/[=:]/g, function(f) {
          return a[f];
        });
      }
      function ye(e, a) {
        return typeof e == "object" && e !== null && e.key != null ? (g(e.key), ge("" + e.key)) : a.toString(36);
      }
      function Te() {
      }
      function le(e) {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            switch (typeof e.status == "string" ? e.then(Te, Te) : (e.status = "pending", e.then(
              function(a) {
                e.status === "pending" && (e.status = "fulfilled", e.value = a);
              },
              function(a) {
                e.status === "pending" && (e.status = "rejected", e.reason = a);
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
      function fe(e, a, f, v, E) {
        var S = typeof e;
        (S === "undefined" || S === "boolean") && (e = null);
        var _ = !1;
        if (e === null) _ = !0;
        else
          switch (S) {
            case "bigint":
            case "string":
            case "number":
              _ = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case P:
                case ie:
                  _ = !0;
                  break;
                case Ie:
                  return _ = e._init, fe(
                    _(e._payload),
                    a,
                    f,
                    v,
                    E
                  );
              }
          }
        if (_) {
          _ = e, E = E(_);
          var Q = v === "" ? "." + ye(_, 0) : v;
          return J(E) ? (f = "", Q != null && (f = Q.replace(Gr, "$&/") + "/"), fe(E, a, f, "", function(re) {
            return re;
          })) : E != null && (se(E) && (E.key != null && (_ && _.key === E.key || g(E.key)), f = I(
            E,
            f + (E.key == null || _ && _.key === E.key ? "" : ("" + E.key).replace(
              Gr,
              "$&/"
            ) + "/") + Q
          ), v !== "" && _ != null && se(_) && _.key == null && _._store && !_._store.validated && (f._store.validated = 2), E = f), a.push(E)), 1;
        }
        if (_ = 0, Q = v === "" ? "." : v + ":", J(e))
          for (var D = 0; D < e.length; D++)
            v = e[D], S = Q + ye(v, D), _ += fe(
              v,
              a,
              f,
              S,
              E
            );
        else if (D = i(e), typeof D == "function")
          for (D === e.entries && (Dr || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Dr = !0), e = D.call(e), D = 0; !(v = e.next()).done; )
            v = v.value, S = Q + ye(v, D++), _ += fe(
              v,
              a,
              f,
              S,
              E
            );
        else if (S === "object") {
          if (typeof e.then == "function")
            return fe(
              le(e),
              a,
              f,
              v,
              E
            );
          throw a = String(e), Error(
            "Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return _;
      }
      function be(e, a, f) {
        if (e == null) return e;
        var v = [], E = 0;
        return fe(e, v, "", "", function(S) {
          return a.call(f, S, E++);
        }), v;
      }
      function je(e) {
        if (e._status === -1) {
          var a = e._result;
          a = a(), a.then(
            function(f) {
              (e._status === 0 || e._status === -1) && (e._status = 1, e._result = f);
            },
            function(f) {
              (e._status === 0 || e._status === -1) && (e._status = 2, e._result = f);
            }
          ), e._status === -1 && (e._status = 0, e._result = a);
        }
        if (e._status === 1)
          return a = e._result, a === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            a
          ), "default" in a || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            a
          ), a.default;
        throw e._result;
      }
      function z() {
        var e = O.H;
        return e === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), e;
      }
      function s() {
      }
      function d(e) {
        if (or === null)
          try {
            var a = ("require" + Math.random()).slice(0, 7);
            or = (r && r[a]).call(
              r,
              "timers"
            ).setImmediate;
          } catch {
            or = function(v) {
              Fr === !1 && (Fr = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var E = new MessageChannel();
              E.port1.onmessage = v, E.port2.postMessage(void 0);
            };
          }
        return or(e);
      }
      function T(e) {
        return 1 < e.length && typeof AggregateError == "function" ? new AggregateError(e) : e[0];
      }
      function R(e, a) {
        a !== ar - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), ar = a;
      }
      function $(e, a, f) {
        var v = O.actQueue;
        if (v !== null)
          if (v.length !== 0)
            try {
              K(v), d(function() {
                return $(e, a, f);
              });
              return;
            } catch (E) {
              O.thrownErrors.push(E);
            }
          else O.actQueue = null;
        0 < O.thrownErrors.length ? (v = T(O.thrownErrors), O.thrownErrors.length = 0, f(v)) : a(e);
      }
      function K(e) {
        if (!Cr) {
          Cr = !0;
          var a = 0;
          try {
            for (; a < e.length; a++) {
              var f = e[a];
              do {
                O.didUsePromise = !1;
                var v = f(!1);
                if (v !== null) {
                  if (O.didUsePromise) {
                    e[a] = f, e.splice(0, a);
                    return;
                  }
                  f = v;
                } else break;
              } while (!0);
            }
            e.length = 0;
          } catch (E) {
            e.splice(0, a + 1), O.thrownErrors.push(E);
          } finally {
            Cr = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var P = Symbol.for("react.transitional.element"), ie = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), Oe = Symbol.for("react.strict_mode"), Le = Symbol.for("react.profiler"), Me = Symbol.for("react.consumer"), b = Symbol.for("react.context"), _e = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), Ae = Symbol.for("react.suspense_list"), Ue = Symbol.for("react.memo"), Ie = Symbol.for("react.lazy"), nr = Symbol.for("react.offscreen"), Be = Symbol.iterator, Fe = {}, o = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(e) {
          u(e, "forceUpdate");
        },
        enqueueReplaceState: function(e) {
          u(e, "replaceState");
        },
        enqueueSetState: function(e) {
          u(e, "setState");
        }
      }, h = Object.assign, y = {};
      Object.freeze(y), c.prototype.isReactComponent = {}, c.prototype.setState = function(e, a) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, e, a, "setState");
      }, c.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      var M = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, te;
      for (te in M)
        M.hasOwnProperty(te) && n(te, M[te]);
      p.prototype = c.prototype, M = m.prototype = new p(), M.constructor = m, h(M, c.prototype), M.isPureReactComponent = !0;
      var J = Array.isArray, N = Symbol.for("react.client.reference"), O = {
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
      }, we = Object.prototype.hasOwnProperty, oe = Symbol.for("react.client.reference"), me = 0, He, Se, We, Ee, Yr, Lr, Ir;
      ee.__reactDisabledLog = !0;
      var _r, Hr, wr = !1, Sr = new (typeof WeakMap == "function" ? WeakMap : Map)(), $t = Symbol.for("react.client.reference"), Ur, Wr, qr = {}, zr = {}, Dr = !1, Gr = /\/+/g, Br = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var a = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
            error: e
          });
          if (!window.dispatchEvent(a)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      }, Fr = !1, or = null, ar = 0, sr = !1, Cr = !1, Kr = typeof queueMicrotask == "function" ? function(e) {
        queueMicrotask(function() {
          return queueMicrotask(e);
        });
      } : d;
      t.Children = {
        map: be,
        forEach: function(e, a, f) {
          be(
            e,
            function() {
              a.apply(this, arguments);
            },
            f
          );
        },
        count: function(e) {
          var a = 0;
          return be(e, function() {
            a++;
          }), a;
        },
        toArray: function(e) {
          return be(e, function(a) {
            return a;
          }) || [];
        },
        only: function(e) {
          if (!se(e))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return e;
        }
      }, t.Component = c, t.Fragment = Z, t.Profiler = Le, t.PureComponent = m, t.StrictMode = Oe, t.Suspense = pe, t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O, t.act = function(e) {
        var a = O.actQueue, f = ar;
        ar++;
        var v = O.actQueue = a !== null ? a : [], E = !1;
        try {
          var S = e();
        } catch (D) {
          O.thrownErrors.push(D);
        }
        if (0 < O.thrownErrors.length)
          throw R(a, f), e = T(O.thrownErrors), O.thrownErrors.length = 0, e;
        if (S !== null && typeof S == "object" && typeof S.then == "function") {
          var _ = S;
          return Kr(function() {
            E || sr || (sr = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(D, re) {
              E = !0, _.then(
                function(de) {
                  if (R(a, f), f === 0) {
                    try {
                      K(v), d(function() {
                        return $(
                          de,
                          D,
                          re
                        );
                      });
                    } catch (Pe) {
                      O.thrownErrors.push(Pe);
                    }
                    if (0 < O.thrownErrors.length) {
                      var qe = T(
                        O.thrownErrors
                      );
                      O.thrownErrors.length = 0, re(qe);
                    }
                  } else D(de);
                },
                function(de) {
                  R(a, f), 0 < O.thrownErrors.length && (de = T(
                    O.thrownErrors
                  ), O.thrownErrors.length = 0), re(de);
                }
              );
            }
          };
        }
        var Q = S;
        if (R(a, f), f === 0 && (K(v), v.length !== 0 && Kr(function() {
          E || sr || (sr = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), O.actQueue = null), 0 < O.thrownErrors.length)
          throw e = T(O.thrownErrors), O.thrownErrors.length = 0, e;
        return {
          then: function(D, re) {
            E = !0, f === 0 ? (O.actQueue = v, d(function() {
              return $(
                Q,
                D,
                re
              );
            })) : D(Q);
          }
        };
      }, t.cache = function(e) {
        return function() {
          return e.apply(null, arguments);
        };
      }, t.cloneElement = function(e, a, f) {
        if (e == null)
          throw Error(
            "The argument must be a React element, but you passed " + e + "."
          );
        var v = h({}, e.props), E = e.key, S = e._owner;
        if (a != null) {
          var _;
          e: {
            if (we.call(a, "ref") && (_ = Object.getOwnPropertyDescriptor(
              a,
              "ref"
            ).get) && _.isReactWarning) {
              _ = !1;
              break e;
            }
            _ = a.ref !== void 0;
          }
          _ && (S = U()), L(a) && (g(a.key), E = "" + a.key);
          for (Q in a)
            !we.call(a, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && a.ref === void 0 || (v[Q] = a[Q]);
        }
        var Q = arguments.length - 2;
        if (Q === 1) v.children = f;
        else if (1 < Q) {
          _ = Array(Q);
          for (var D = 0; D < Q; D++)
            _[D] = arguments[D + 2];
          v.children = _;
        }
        for (v = W(e.type, E, void 0, void 0, S, v), E = 2; E < arguments.length; E++)
          Ce(arguments[E], v.type);
        return v;
      }, t.createContext = function(e) {
        return e = {
          $$typeof: b,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, e.Provider = e, e.Consumer = {
          $$typeof: Me,
          _context: e
        }, e._currentRenderer = null, e._currentRenderer2 = null, e;
      }, t.createElement = function(e, a, f) {
        if (A(e))
          for (var v = 2; v < arguments.length; v++)
            Ce(arguments[v], e);
        else {
          if (v = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null) var E = "null";
          else
            J(e) ? E = "array" : e !== void 0 && e.$$typeof === P ? (E = "<" + (C(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : E = typeof e;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            E,
            v
          );
        }
        var S;
        if (v = {}, E = null, a != null)
          for (S in Wr || !("__self" in a) || "key" in a || (Wr = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), L(a) && (g(a.key), E = "" + a.key), a)
            we.call(a, S) && S !== "key" && S !== "__self" && S !== "__source" && (v[S] = a[S]);
        var _ = arguments.length - 2;
        if (_ === 1) v.children = f;
        else if (1 < _) {
          for (var Q = Array(_), D = 0; D < _; D++)
            Q[D] = arguments[D + 2];
          Object.freeze && Object.freeze(Q), v.children = Q;
        }
        if (e && e.defaultProps)
          for (S in _ = e.defaultProps, _)
            v[S] === void 0 && (v[S] = _[S]);
        return E && q(
          v,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        ), W(e, E, void 0, void 0, U(), v);
      }, t.createRef = function() {
        var e = { current: null };
        return Object.seal(e), e;
      }, t.forwardRef = function(e) {
        e != null && e.$$typeof === Ue ? console.error(
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
        var a = { $$typeof: _e, render: e }, f;
        return Object.defineProperty(a, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(v) {
            f = v, e.name || e.displayName || (Object.defineProperty(e, "name", { value: v }), e.displayName = v);
          }
        }), a;
      }, t.isValidElement = se, t.lazy = function(e) {
        return {
          $$typeof: Ie,
          _payload: { _status: -1, _result: e },
          _init: je
        };
      }, t.memo = function(e, a) {
        A(e) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          e === null ? "null" : typeof e
        ), a = {
          $$typeof: Ue,
          type: e,
          compare: a === void 0 ? null : a
        };
        var f;
        return Object.defineProperty(a, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(v) {
            f = v, e.name || e.displayName || (Object.defineProperty(e, "name", { value: v }), e.displayName = v);
          }
        }), a;
      }, t.startTransition = function(e) {
        var a = O.T, f = {};
        O.T = f, f._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var v = e(), E = O.S;
          E !== null && E(f, v), typeof v == "object" && v !== null && typeof v.then == "function" && v.then(s, Br);
        } catch (S) {
          Br(S);
        } finally {
          a === null && f._updatedFibers && (e = f._updatedFibers.size, f._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), O.T = a;
        }
      }, t.unstable_useCacheRefresh = function() {
        return z().useCacheRefresh();
      }, t.use = function(e) {
        return z().use(e);
      }, t.useActionState = function(e, a, f) {
        return z().useActionState(
          e,
          a,
          f
        );
      }, t.useCallback = function(e, a) {
        return z().useCallback(e, a);
      }, t.useContext = function(e) {
        var a = z();
        return e.$$typeof === Me && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), a.useContext(e);
      }, t.useDebugValue = function(e, a) {
        return z().useDebugValue(e, a);
      }, t.useDeferredValue = function(e, a) {
        return z().useDeferredValue(e, a);
      }, t.useEffect = function(e, a) {
        return z().useEffect(e, a);
      }, t.useId = function() {
        return z().useId();
      }, t.useImperativeHandle = function(e, a, f) {
        return z().useImperativeHandle(e, a, f);
      }, t.useInsertionEffect = function(e, a) {
        return z().useInsertionEffect(e, a);
      }, t.useLayoutEffect = function(e, a) {
        return z().useLayoutEffect(e, a);
      }, t.useMemo = function(e, a) {
        return z().useMemo(e, a);
      }, t.useOptimistic = function(e, a) {
        return z().useOptimistic(e, a);
      }, t.useReducer = function(e, a, f) {
        return z().useReducer(e, a, f);
      }, t.useRef = function(e) {
        return z().useRef(e);
      }, t.useState = function(e) {
        return z().useState(e);
      }, t.useSyncExternalStore = function(e, a, f) {
        return z().useSyncExternalStore(
          e,
          a,
          f
        );
      }, t.useTransition = function() {
        return z().useTransition();
      }, t.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(Qe, Qe.exports)), Qe.exports;
}
var Zr;
function yt() {
  return Zr || (Zr = 1, process.env.NODE_ENV === "production" ? cr.exports = Mt() : cr.exports = Yt()), cr.exports;
}
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jr;
function Lt() {
  return Jr || (Jr = 1, process.env.NODE_ENV !== "production" && function() {
    function r(o) {
      if (o == null) return null;
      if (typeof o == "function")
        return o.$$typeof === je ? null : o.displayName || o.name || null;
      if (typeof o == "string") return o;
      switch (o) {
        case W:
          return "Fragment";
        case l:
          return "Portal";
        case Ce:
          return "Profiler";
        case I:
          return "StrictMode";
        case ge:
          return "Suspense";
        case ye:
          return "SuspenseList";
      }
      if (typeof o == "object")
        switch (typeof o.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), o.$$typeof) {
          case ke:
            return (o.displayName || "Context") + ".Provider";
          case se:
            return (o._context.displayName || "Context") + ".Consumer";
          case Re:
            var h = o.render;
            return o = o.displayName, o || (o = h.displayName || h.name || "", o = o !== "" ? "ForwardRef(" + o + ")" : "ForwardRef"), o;
          case Te:
            return h = o.displayName || null, h !== null ? h : r(o.type) || "Memo";
          case le:
            h = o._payload, o = o._init;
            try {
              return r(o(h));
            } catch {
            }
        }
      return null;
    }
    function t(o) {
      return "" + o;
    }
    function n(o) {
      try {
        t(o);
        var h = !1;
      } catch {
        h = !0;
      }
      if (h) {
        h = console;
        var y = h.error, M = typeof Symbol == "function" && Symbol.toStringTag && o[Symbol.toStringTag] || o.constructor.name || "Object";
        return y.call(
          h,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          M
        ), t(o);
      }
    }
    function i() {
    }
    function u() {
      if ($ === 0) {
        K = console.log, P = console.info, ie = console.warn, Z = console.error, Oe = console.group, Le = console.groupCollapsed, Me = console.groupEnd;
        var o = {
          configurable: !0,
          enumerable: !0,
          value: i,
          writable: !0
        };
        Object.defineProperties(console, {
          info: o,
          log: o,
          warn: o,
          error: o,
          group: o,
          groupCollapsed: o,
          groupEnd: o
        });
      }
      $++;
    }
    function c() {
      if ($--, $ === 0) {
        var o = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: d({}, o, { value: K }),
          info: d({}, o, { value: P }),
          warn: d({}, o, { value: ie }),
          error: d({}, o, { value: Z }),
          group: d({}, o, { value: Oe }),
          groupCollapsed: d({}, o, { value: Le }),
          groupEnd: d({}, o, { value: Me })
        });
      }
      0 > $ && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function p(o) {
      if (b === void 0)
        try {
          throw Error();
        } catch (y) {
          var h = y.stack.trim().match(/\n( *(at )?)/);
          b = h && h[1] || "", _e = -1 < y.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < y.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + b + o + _e;
    }
    function m(o, h) {
      if (!o || pe) return "";
      var y = Ae.get(o);
      if (y !== void 0) return y;
      pe = !0, y = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var M = null;
      M = z.H, z.H = null, u();
      try {
        var te = {
          DetermineComponentFrameRoot: function() {
            try {
              if (h) {
                var Se = function() {
                  throw Error();
                };
                if (Object.defineProperty(Se.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Se, []);
                  } catch (Ee) {
                    var We = Ee;
                  }
                  Reflect.construct(o, [], Se);
                } else {
                  try {
                    Se.call();
                  } catch (Ee) {
                    We = Ee;
                  }
                  o.call(Se.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Ee) {
                  We = Ee;
                }
                (Se = o()) && typeof Se.catch == "function" && Se.catch(function() {
                });
              }
            } catch (Ee) {
              if (Ee && We && typeof Ee.stack == "string")
                return [Ee.stack, We.stack];
            }
            return [null, null];
          }
        };
        te.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var J = Object.getOwnPropertyDescriptor(
          te.DetermineComponentFrameRoot,
          "name"
        );
        J && J.configurable && Object.defineProperty(
          te.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var N = te.DetermineComponentFrameRoot(), O = N[0], we = N[1];
        if (O && we) {
          var oe = O.split(`
`), me = we.split(`
`);
          for (N = J = 0; J < oe.length && !oe[J].includes(
            "DetermineComponentFrameRoot"
          ); )
            J++;
          for (; N < me.length && !me[N].includes(
            "DetermineComponentFrameRoot"
          ); )
            N++;
          if (J === oe.length || N === me.length)
            for (J = oe.length - 1, N = me.length - 1; 1 <= J && 0 <= N && oe[J] !== me[N]; )
              N--;
          for (; 1 <= J && 0 <= N; J--, N--)
            if (oe[J] !== me[N]) {
              if (J !== 1 || N !== 1)
                do
                  if (J--, N--, 0 > N || oe[J] !== me[N]) {
                    var He = `
` + oe[J].replace(
                      " at new ",
                      " at "
                    );
                    return o.displayName && He.includes("<anonymous>") && (He = He.replace("<anonymous>", o.displayName)), typeof o == "function" && Ae.set(o, He), He;
                  }
                while (1 <= J && 0 <= N);
              break;
            }
        }
      } finally {
        pe = !1, z.H = M, c(), Error.prepareStackTrace = y;
      }
      return oe = (oe = o ? o.displayName || o.name : "") ? p(oe) : "", typeof o == "function" && Ae.set(o, oe), oe;
    }
    function w(o) {
      if (o == null) return "";
      if (typeof o == "function") {
        var h = o.prototype;
        return m(
          o,
          !(!h || !h.isReactComponent)
        );
      }
      if (typeof o == "string") return p(o);
      switch (o) {
        case ge:
          return p("Suspense");
        case ye:
          return p("SuspenseList");
      }
      if (typeof o == "object")
        switch (o.$$typeof) {
          case Re:
            return o = m(o.render, !1), o;
          case Te:
            return w(o.type);
          case le:
            h = o._payload, o = o._init;
            try {
              return w(o(h));
            } catch {
            }
        }
      return "";
    }
    function g() {
      var o = z.A;
      return o === null ? null : o.getOwner();
    }
    function C(o) {
      if (s.call(o, "key")) {
        var h = Object.getOwnPropertyDescriptor(o, "key").get;
        if (h && h.isReactWarning) return !1;
      }
      return o.key !== void 0;
    }
    function A(o, h) {
      function y() {
        Ie || (Ie = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          h
        ));
      }
      y.isReactWarning = !0, Object.defineProperty(o, "key", {
        get: y,
        configurable: !0
      });
    }
    function ee() {
      var o = r(this.type);
      return nr[o] || (nr[o] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), o = this.props.ref, o !== void 0 ? o : null;
    }
    function F(o, h, y, M, te, J) {
      return y = J.ref, o = {
        $$typeof: q,
        type: o,
        key: h,
        props: J,
        _owner: te
      }, (y !== void 0 ? y : null) !== null ? Object.defineProperty(o, "ref", {
        enumerable: !1,
        get: ee
      }) : Object.defineProperty(o, "ref", { enumerable: !1, value: null }), o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(o, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    }
    function j(o, h, y, M, te, J) {
      if (typeof o == "string" || typeof o == "function" || o === W || o === Ce || o === I || o === ge || o === ye || o === fe || typeof o == "object" && o !== null && (o.$$typeof === le || o.$$typeof === Te || o.$$typeof === ke || o.$$typeof === se || o.$$typeof === Re || o.$$typeof === T || o.getModuleId !== void 0)) {
        var N = h.children;
        if (N !== void 0)
          if (M)
            if (R(N)) {
              for (M = 0; M < N.length; M++)
                x(N[M], o);
              Object.freeze && Object.freeze(N);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else x(N, o);
      } else
        N = "", (o === void 0 || typeof o == "object" && o !== null && Object.keys(o).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), o === null ? M = "null" : R(o) ? M = "array" : o !== void 0 && o.$$typeof === q ? (M = "<" + (r(o.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : M = typeof o, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          M,
          N
        );
      if (s.call(h, "key")) {
        N = r(o);
        var O = Object.keys(h).filter(function(oe) {
          return oe !== "key";
        });
        M = 0 < O.length ? "{key: someKey, " + O.join(": ..., ") + ": ...}" : "{key: someKey}", Be[N + M] || (O = 0 < O.length ? "{" + O.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          M,
          N,
          O,
          N
        ), Be[N + M] = !0);
      }
      if (N = null, y !== void 0 && (n(y), N = "" + y), C(h) && (n(h.key), N = "" + h.key), "key" in h) {
        y = {};
        for (var we in h)
          we !== "key" && (y[we] = h[we]);
      } else y = h;
      return N && A(
        y,
        typeof o == "function" ? o.displayName || o.name || "Unknown" : o
      ), F(o, N, J, te, g(), y);
    }
    function x(o, h) {
      if (typeof o == "object" && o && o.$$typeof !== Ue) {
        if (R(o))
          for (var y = 0; y < o.length; y++) {
            var M = o[y];
            H(M) && Y(M, h);
          }
        else if (H(o))
          o._store && (o._store.validated = 1);
        else if (o === null || typeof o != "object" ? y = null : (y = be && o[be] || o["@@iterator"], y = typeof y == "function" ? y : null), typeof y == "function" && y !== o.entries && (y = y.call(o), y !== o))
          for (; !(o = y.next()).done; )
            H(o.value) && Y(o.value, h);
      }
    }
    function H(o) {
      return typeof o == "object" && o !== null && o.$$typeof === q;
    }
    function Y(o, h) {
      if (o._store && !o._store.validated && o.key == null && (o._store.validated = 1, h = U(h), !Fe[h])) {
        Fe[h] = !0;
        var y = "";
        o && o._owner != null && o._owner !== g() && (y = null, typeof o._owner.tag == "number" ? y = r(o._owner.type) : typeof o._owner.name == "string" && (y = o._owner.name), y = " It was passed a child from " + y + ".");
        var M = z.getCurrentStack;
        z.getCurrentStack = function() {
          var te = w(o.type);
          return M && (te += M() || ""), te;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          h,
          y
        ), z.getCurrentStack = M;
      }
    }
    function U(o) {
      var h = "", y = g();
      return y && (y = r(y.type)) && (h = `

Check the render method of \`` + y + "`."), h || (o = r(o)) && (h = `

Check the top-level render call using <` + o + ">."), h;
    }
    var L = yt(), q = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), Ce = Symbol.for("react.profiler"), se = Symbol.for("react.consumer"), ke = Symbol.for("react.context"), Re = Symbol.for("react.forward_ref"), ge = Symbol.for("react.suspense"), ye = Symbol.for("react.suspense_list"), Te = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), be = Symbol.iterator, je = Symbol.for("react.client.reference"), z = L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, s = Object.prototype.hasOwnProperty, d = Object.assign, T = Symbol.for("react.client.reference"), R = Array.isArray, $ = 0, K, P, ie, Z, Oe, Le, Me;
    i.__reactDisabledLog = !0;
    var b, _e, pe = !1, Ae = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ue = Symbol.for("react.client.reference"), Ie, nr = {}, Be = {}, Fe = {};
    Ve.Fragment = W, Ve.jsx = function(o, h, y, M, te) {
      return j(o, h, y, !1, M, te);
    }, Ve.jsxs = function(o, h, y, M, te) {
      return j(o, h, y, !0, M, te);
    };
  }()), Ve;
}
var et;
function It() {
  return et || (et = 1, process.env.NODE_ENV === "production" ? ur.exports = jt() : ur.exports = Lt()), ur.exports;
}
var Ze = It(), ce = yt();
const Ar = /* @__PURE__ */ Nt(ce), rt = /* @__PURE__ */ kt({
  __proto__: null,
  default: Ar
}, [ce]);
var Ht = !1;
function Ut(r) {
  if (r.sheet)
    return r.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === r)
      return document.styleSheets[t];
}
function Wt(r) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", r.key), r.nonce !== void 0 && t.setAttribute("nonce", r.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var qt = /* @__PURE__ */ function() {
  function r(n) {
    var i = this;
    this._insertTag = function(u) {
      var c;
      i.tags.length === 0 ? i.insertionPoint ? c = i.insertionPoint.nextSibling : i.prepend ? c = i.container.firstChild : c = i.before : c = i.tags[i.tags.length - 1].nextSibling, i.container.insertBefore(u, c), i.tags.push(u);
    }, this.isSpeedy = n.speedy === void 0 ? !Ht : n.speedy, this.tags = [], this.ctr = 0, this.nonce = n.nonce, this.key = n.key, this.container = n.container, this.prepend = n.prepend, this.insertionPoint = n.insertionPoint, this.before = null;
  }
  var t = r.prototype;
  return t.hydrate = function(i) {
    i.forEach(this._insertTag);
  }, t.insert = function(i) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Wt(this));
    var u = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var c = Ut(u);
      try {
        c.insertRule(i, c.cssRules.length);
      } catch {
      }
    } else
      u.appendChild(document.createTextNode(i));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(i) {
      var u;
      return (u = i.parentNode) == null ? void 0 : u.removeChild(i);
    }), this.tags = [], this.ctr = 0;
  }, r;
}(), ue = "-ms-", hr = "-moz-", G = "-webkit-", Et = "comm", kr = "rule", jr = "decl", zt = "@import", gt = "@keyframes", Dt = "@layer", Gt = Math.abs, yr = String.fromCharCode, Bt = Object.assign;
function Ft(r, t) {
  return ae(r, 0) ^ 45 ? (((t << 2 ^ ae(r, 0)) << 2 ^ ae(r, 1)) << 2 ^ ae(r, 2)) << 2 ^ ae(r, 3) : 0;
}
function bt(r) {
  return r.trim();
}
function Kt(r, t) {
  return (r = t.exec(r)) ? r[0] : r;
}
function B(r, t, n) {
  return r.replace(t, n);
}
function Pr(r, t) {
  return r.indexOf(t);
}
function ae(r, t) {
  return r.charCodeAt(t) | 0;
}
function Je(r, t, n) {
  return r.slice(t, n);
}
function xe(r) {
  return r.length;
}
function Mr(r) {
  return r.length;
}
function fr(r, t) {
  return t.push(r), r;
}
function Vt(r, t) {
  return r.map(t).join("");
}
var Er = 1, De = 1, _t = 0, ve = 0, ne = 0, Ge = "";
function gr(r, t, n, i, u, c, p) {
  return { value: r, root: t, parent: n, type: i, props: u, children: c, line: Er, column: De, length: p, return: "" };
}
function Xe(r, t) {
  return Bt(gr("", null, null, "", null, null, 0), r, { length: -r.length }, t);
}
function Xt() {
  return ne;
}
function Qt() {
  return ne = ve > 0 ? ae(Ge, --ve) : 0, De--, ne === 10 && (De = 1, Er--), ne;
}
function he() {
  return ne = ve < _t ? ae(Ge, ve++) : 0, De++, ne === 10 && (De = 1, Er++), ne;
}
function Ne() {
  return ae(Ge, ve);
}
function dr() {
  return ve;
}
function tr(r, t) {
  return Je(Ge, r, t);
}
function er(r) {
  switch (r) {
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
function wt(r) {
  return Er = De = 1, _t = xe(Ge = r), ve = 0, [];
}
function St(r) {
  return Ge = "", r;
}
function vr(r) {
  return bt(tr(ve - 1, xr(r === 91 ? r + 2 : r === 40 ? r + 1 : r)));
}
function Zt(r) {
  for (; (ne = Ne()) && ne < 33; )
    he();
  return er(r) > 2 || er(ne) > 3 ? "" : " ";
}
function Jt(r, t) {
  for (; --t && he() && !(ne < 48 || ne > 102 || ne > 57 && ne < 65 || ne > 70 && ne < 97); )
    ;
  return tr(r, dr() + (t < 6 && Ne() == 32 && he() == 32));
}
function xr(r) {
  for (; he(); )
    switch (ne) {
      // ] ) " '
      case r:
        return ve;
      // " '
      case 34:
      case 39:
        r !== 34 && r !== 39 && xr(ne);
        break;
      // (
      case 40:
        r === 41 && xr(r);
        break;
      // \
      case 92:
        he();
        break;
    }
  return ve;
}
function en(r, t) {
  for (; he() && r + ne !== 57; )
    if (r + ne === 84 && Ne() === 47)
      break;
  return "/*" + tr(t, ve - 1) + "*" + yr(r === 47 ? r : he());
}
function rn(r) {
  for (; !er(Ne()); )
    he();
  return tr(r, ve);
}
function tn(r) {
  return St(pr("", null, null, null, [""], r = wt(r), 0, [0], r));
}
function pr(r, t, n, i, u, c, p, m, w) {
  for (var g = 0, C = 0, A = p, ee = 0, F = 0, j = 0, x = 1, H = 1, Y = 1, U = 0, L = "", q = u, l = c, W = i, I = L; H; )
    switch (j = U, U = he()) {
      // (
      case 40:
        if (j != 108 && ae(I, A - 1) == 58) {
          Pr(I += B(vr(U), "&", "&\f"), "&\f") != -1 && (Y = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        I += vr(U);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        I += Zt(j);
        break;
      // \
      case 92:
        I += Jt(dr() - 1, 7);
        continue;
      // /
      case 47:
        switch (Ne()) {
          case 42:
          case 47:
            fr(nn(en(he(), dr()), t, n), w);
            break;
          default:
            I += "/";
        }
        break;
      // {
      case 123 * x:
        m[g++] = xe(I) * Y;
      // } ; \0
      case 125 * x:
      case 59:
      case 0:
        switch (U) {
          // \0 }
          case 0:
          case 125:
            H = 0;
          // ;
          case 59 + C:
            Y == -1 && (I = B(I, /\f/g, "")), F > 0 && xe(I) - A && fr(F > 32 ? nt(I + ";", i, n, A - 1) : nt(B(I, " ", "") + ";", i, n, A - 2), w);
            break;
          // @ ;
          case 59:
            I += ";";
          // { rule/at-rule
          default:
            if (fr(W = tt(I, t, n, g, C, u, m, L, q = [], l = [], A), c), U === 123)
              if (C === 0)
                pr(I, t, W, W, q, c, A, m, l);
              else
                switch (ee === 99 && ae(I, 3) === 110 ? 100 : ee) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    pr(r, W, W, i && fr(tt(r, W, W, 0, 0, u, m, L, u, q = [], A), l), u, l, A, m, i ? q : l);
                    break;
                  default:
                    pr(I, W, W, W, [""], l, 0, m, l);
                }
        }
        g = C = F = 0, x = Y = 1, L = I = "", A = p;
        break;
      // :
      case 58:
        A = 1 + xe(I), F = j;
      default:
        if (x < 1) {
          if (U == 123)
            --x;
          else if (U == 125 && x++ == 0 && Qt() == 125)
            continue;
        }
        switch (I += yr(U), U * x) {
          // &
          case 38:
            Y = C > 0 ? 1 : (I += "\f", -1);
            break;
          // ,
          case 44:
            m[g++] = (xe(I) - 1) * Y, Y = 1;
            break;
          // @
          case 64:
            Ne() === 45 && (I += vr(he())), ee = Ne(), C = A = xe(L = I += rn(dr())), U++;
            break;
          // -
          case 45:
            j === 45 && xe(I) == 2 && (x = 0);
        }
    }
  return c;
}
function tt(r, t, n, i, u, c, p, m, w, g, C) {
  for (var A = u - 1, ee = u === 0 ? c : [""], F = Mr(ee), j = 0, x = 0, H = 0; j < i; ++j)
    for (var Y = 0, U = Je(r, A + 1, A = Gt(x = p[j])), L = r; Y < F; ++Y)
      (L = bt(x > 0 ? ee[Y] + " " + U : B(U, /&\f/g, ee[Y]))) && (w[H++] = L);
  return gr(r, t, n, u === 0 ? kr : m, w, g, C);
}
function nn(r, t, n) {
  return gr(r, t, n, Et, yr(Xt()), Je(r, 2, -2), 0);
}
function nt(r, t, n, i) {
  return gr(r, t, n, jr, Je(r, 0, i), Je(r, i + 1, -1), i);
}
function ze(r, t) {
  for (var n = "", i = Mr(r), u = 0; u < i; u++)
    n += t(r[u], u, r, t) || "";
  return n;
}
function on(r, t, n, i) {
  switch (r.type) {
    case Dt:
      if (r.children.length) break;
    case zt:
    case jr:
      return r.return = r.return || r.value;
    case Et:
      return "";
    case gt:
      return r.return = r.value + "{" + ze(r.children, i) + "}";
    case kr:
      r.value = r.props.join(",");
  }
  return xe(n = ze(r.children, i)) ? r.return = r.value + "{" + n + "}" : "";
}
function an(r) {
  var t = Mr(r);
  return function(n, i, u, c) {
    for (var p = "", m = 0; m < t; m++)
      p += r[m](n, i, u, c) || "";
    return p;
  };
}
function sn(r) {
  return function(t) {
    t.root || (t = t.return) && r(t);
  };
}
function un(r) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = r(n)), t[n];
  };
}
var cn = function(t, n, i) {
  for (var u = 0, c = 0; u = c, c = Ne(), u === 38 && c === 12 && (n[i] = 1), !er(c); )
    he();
  return tr(t, ve);
}, fn = function(t, n) {
  var i = -1, u = 44;
  do
    switch (er(u)) {
      case 0:
        u === 38 && Ne() === 12 && (n[i] = 1), t[i] += cn(ve - 1, n, i);
        break;
      case 2:
        t[i] += vr(u);
        break;
      case 4:
        if (u === 44) {
          t[++i] = Ne() === 58 ? "&\f" : "", n[i] = t[i].length;
          break;
        }
      // fallthrough
      default:
        t[i] += yr(u);
    }
  while (u = he());
  return t;
}, ln = function(t, n) {
  return St(fn(wt(t), n));
}, ot = /* @__PURE__ */ new WeakMap(), dn = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var n = t.value, i = t.parent, u = t.column === i.column && t.line === i.line; i.type !== "rule"; )
      if (i = i.parent, !i) return;
    if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !ot.get(i)) && !u) {
      ot.set(t, !0);
      for (var c = [], p = ln(n, c), m = i.props, w = 0, g = 0; w < p.length; w++)
        for (var C = 0; C < m.length; C++, g++)
          t.props[g] = c[w] ? p[w].replace(/&\f/g, m[C]) : m[C] + " " + p[w];
    }
  }
}, vn = function(t) {
  if (t.type === "decl") {
    var n = t.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function Ct(r, t) {
  switch (Ft(r, t)) {
    // color-adjust
    case 5103:
      return G + "print-" + r + r;
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
      return G + r + r;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return G + r + hr + r + ue + r + r;
    // flex, flex-direction
    case 6828:
    case 4268:
      return G + r + ue + r + r;
    // order
    case 6165:
      return G + r + ue + "flex-" + r + r;
    // align-items
    case 5187:
      return G + r + B(r, /(\w+).+(:[^]+)/, G + "box-$1$2" + ue + "flex-$1$2") + r;
    // align-self
    case 5443:
      return G + r + ue + "flex-item-" + B(r, /flex-|-self/, "") + r;
    // align-content
    case 4675:
      return G + r + ue + "flex-line-pack" + B(r, /align-content|flex-|-self/, "") + r;
    // flex-shrink
    case 5548:
      return G + r + ue + B(r, "shrink", "negative") + r;
    // flex-basis
    case 5292:
      return G + r + ue + B(r, "basis", "preferred-size") + r;
    // flex-grow
    case 6060:
      return G + "box-" + B(r, "-grow", "") + G + r + ue + B(r, "grow", "positive") + r;
    // transition
    case 4554:
      return G + B(r, /([^-])(transform)/g, "$1" + G + "$2") + r;
    // cursor
    case 6187:
      return B(B(B(r, /(zoom-|grab)/, G + "$1"), /(image-set)/, G + "$1"), r, "") + r;
    // background, background-image
    case 5495:
    case 3959:
      return B(r, /(image-set\([^]*)/, G + "$1$`$1");
    // justify-content
    case 4968:
      return B(B(r, /(.+:)(flex-)?(.*)/, G + "box-pack:$3" + ue + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + G + r + r;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return B(r, /(.+)-inline(.+)/, G + "$1$2") + r;
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
      if (xe(r) - 1 - t > 6) switch (ae(r, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (ae(r, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return B(r, /(.+:)(.+)-([^]+)/, "$1" + G + "$2-$3$1" + hr + (ae(r, t + 3) == 108 ? "$3" : "$2-$3")) + r;
        // (s)tretch
        case 115:
          return ~Pr(r, "stretch") ? Ct(B(r, "stretch", "fill-available"), t) + r : r;
      }
      break;
    // position: sticky
    case 4949:
      if (ae(r, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (ae(r, xe(r) - 3 - (~Pr(r, "!important") && 10))) {
        // stic(k)y
        case 107:
          return B(r, ":", ":" + G) + r;
        // (inline-)?fl(e)x
        case 101:
          return B(r, /(.+:)([^;!]+)(;|!.+)?/, "$1" + G + (ae(r, 14) === 45 ? "inline-" : "") + "box$3$1" + G + "$2$3$1" + ue + "$2box$3") + r;
      }
      break;
    // writing-mode
    case 5936:
      switch (ae(r, t + 11)) {
        // vertical-l(r)
        case 114:
          return G + r + ue + B(r, /[svh]\w+-[tblr]{2}/, "tb") + r;
        // vertical-r(l)
        case 108:
          return G + r + ue + B(r, /[svh]\w+-[tblr]{2}/, "tb-rl") + r;
        // horizontal(-)tb
        case 45:
          return G + r + ue + B(r, /[svh]\w+-[tblr]{2}/, "lr") + r;
      }
      return G + r + ue + r + r;
  }
  return r;
}
var pn = function(t, n, i, u) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case jr:
      t.return = Ct(t.value, t.length);
      break;
    case gt:
      return ze([Xe(t, {
        value: B(t.value, "@", "@" + G)
      })], u);
    case kr:
      if (t.length) return Vt(t.props, function(c) {
        switch (Kt(c, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return ze([Xe(t, {
              props: [B(c, /:(read-\w+)/, ":" + hr + "$1")]
            })], u);
          // :placeholder
          case "::placeholder":
            return ze([Xe(t, {
              props: [B(c, /:(plac\w+)/, ":" + G + "input-$1")]
            }), Xe(t, {
              props: [B(c, /:(plac\w+)/, ":" + hr + "$1")]
            }), Xe(t, {
              props: [B(c, /:(plac\w+)/, ue + "input-$1")]
            })], u);
        }
        return "";
      });
  }
}, mn = [pn], hn = function(t) {
  var n = t.key;
  if (n === "css") {
    var i = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(i, function(x) {
      var H = x.getAttribute("data-emotion");
      H.indexOf(" ") !== -1 && (document.head.appendChild(x), x.setAttribute("data-s", ""));
    });
  }
  var u = t.stylisPlugins || mn, c = {}, p, m = [];
  p = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(x) {
      for (var H = x.getAttribute("data-emotion").split(" "), Y = 1; Y < H.length; Y++)
        c[H[Y]] = !0;
      m.push(x);
    }
  );
  var w, g = [dn, vn];
  {
    var C, A = [on, sn(function(x) {
      C.insert(x);
    })], ee = an(g.concat(u, A)), F = function(H) {
      return ze(tn(H), ee);
    };
    w = function(H, Y, U, L) {
      C = U, F(H ? H + "{" + Y.styles + "}" : Y.styles), L && (j.inserted[Y.name] = !0);
    };
  }
  var j = {
    key: n,
    sheet: new qt({
      key: n,
      container: p,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: c,
    registered: {},
    insert: w
  };
  return j.sheet.hydrate(m), j;
}, lr = { exports: {} }, V = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function yn() {
  if (at) return V;
  at = 1;
  var r = typeof Symbol == "function" && Symbol.for, t = r ? Symbol.for("react.element") : 60103, n = r ? Symbol.for("react.portal") : 60106, i = r ? Symbol.for("react.fragment") : 60107, u = r ? Symbol.for("react.strict_mode") : 60108, c = r ? Symbol.for("react.profiler") : 60114, p = r ? Symbol.for("react.provider") : 60109, m = r ? Symbol.for("react.context") : 60110, w = r ? Symbol.for("react.async_mode") : 60111, g = r ? Symbol.for("react.concurrent_mode") : 60111, C = r ? Symbol.for("react.forward_ref") : 60112, A = r ? Symbol.for("react.suspense") : 60113, ee = r ? Symbol.for("react.suspense_list") : 60120, F = r ? Symbol.for("react.memo") : 60115, j = r ? Symbol.for("react.lazy") : 60116, x = r ? Symbol.for("react.block") : 60121, H = r ? Symbol.for("react.fundamental") : 60117, Y = r ? Symbol.for("react.responder") : 60118, U = r ? Symbol.for("react.scope") : 60119;
  function L(l) {
    if (typeof l == "object" && l !== null) {
      var W = l.$$typeof;
      switch (W) {
        case t:
          switch (l = l.type, l) {
            case w:
            case g:
            case i:
            case c:
            case u:
            case A:
              return l;
            default:
              switch (l = l && l.$$typeof, l) {
                case m:
                case C:
                case j:
                case F:
                case p:
                  return l;
                default:
                  return W;
              }
          }
        case n:
          return W;
      }
    }
  }
  function q(l) {
    return L(l) === g;
  }
  return V.AsyncMode = w, V.ConcurrentMode = g, V.ContextConsumer = m, V.ContextProvider = p, V.Element = t, V.ForwardRef = C, V.Fragment = i, V.Lazy = j, V.Memo = F, V.Portal = n, V.Profiler = c, V.StrictMode = u, V.Suspense = A, V.isAsyncMode = function(l) {
    return q(l) || L(l) === w;
  }, V.isConcurrentMode = q, V.isContextConsumer = function(l) {
    return L(l) === m;
  }, V.isContextProvider = function(l) {
    return L(l) === p;
  }, V.isElement = function(l) {
    return typeof l == "object" && l !== null && l.$$typeof === t;
  }, V.isForwardRef = function(l) {
    return L(l) === C;
  }, V.isFragment = function(l) {
    return L(l) === i;
  }, V.isLazy = function(l) {
    return L(l) === j;
  }, V.isMemo = function(l) {
    return L(l) === F;
  }, V.isPortal = function(l) {
    return L(l) === n;
  }, V.isProfiler = function(l) {
    return L(l) === c;
  }, V.isStrictMode = function(l) {
    return L(l) === u;
  }, V.isSuspense = function(l) {
    return L(l) === A;
  }, V.isValidElementType = function(l) {
    return typeof l == "string" || typeof l == "function" || l === i || l === g || l === c || l === u || l === A || l === ee || typeof l == "object" && l !== null && (l.$$typeof === j || l.$$typeof === F || l.$$typeof === p || l.$$typeof === m || l.$$typeof === C || l.$$typeof === H || l.$$typeof === Y || l.$$typeof === U || l.$$typeof === x);
  }, V.typeOf = L, V;
}
var X = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var st;
function En() {
  return st || (st = 1, process.env.NODE_ENV !== "production" && function() {
    var r = typeof Symbol == "function" && Symbol.for, t = r ? Symbol.for("react.element") : 60103, n = r ? Symbol.for("react.portal") : 60106, i = r ? Symbol.for("react.fragment") : 60107, u = r ? Symbol.for("react.strict_mode") : 60108, c = r ? Symbol.for("react.profiler") : 60114, p = r ? Symbol.for("react.provider") : 60109, m = r ? Symbol.for("react.context") : 60110, w = r ? Symbol.for("react.async_mode") : 60111, g = r ? Symbol.for("react.concurrent_mode") : 60111, C = r ? Symbol.for("react.forward_ref") : 60112, A = r ? Symbol.for("react.suspense") : 60113, ee = r ? Symbol.for("react.suspense_list") : 60120, F = r ? Symbol.for("react.memo") : 60115, j = r ? Symbol.for("react.lazy") : 60116, x = r ? Symbol.for("react.block") : 60121, H = r ? Symbol.for("react.fundamental") : 60117, Y = r ? Symbol.for("react.responder") : 60118, U = r ? Symbol.for("react.scope") : 60119;
    function L(b) {
      return typeof b == "string" || typeof b == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      b === i || b === g || b === c || b === u || b === A || b === ee || typeof b == "object" && b !== null && (b.$$typeof === j || b.$$typeof === F || b.$$typeof === p || b.$$typeof === m || b.$$typeof === C || b.$$typeof === H || b.$$typeof === Y || b.$$typeof === U || b.$$typeof === x);
    }
    function q(b) {
      if (typeof b == "object" && b !== null) {
        var _e = b.$$typeof;
        switch (_e) {
          case t:
            var pe = b.type;
            switch (pe) {
              case w:
              case g:
              case i:
              case c:
              case u:
              case A:
                return pe;
              default:
                var Ae = pe && pe.$$typeof;
                switch (Ae) {
                  case m:
                  case C:
                  case j:
                  case F:
                  case p:
                    return Ae;
                  default:
                    return _e;
                }
            }
          case n:
            return _e;
        }
      }
    }
    var l = w, W = g, I = m, Ce = p, se = t, ke = C, Re = i, ge = j, ye = F, Te = n, le = c, fe = u, be = A, je = !1;
    function z(b) {
      return je || (je = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), s(b) || q(b) === w;
    }
    function s(b) {
      return q(b) === g;
    }
    function d(b) {
      return q(b) === m;
    }
    function T(b) {
      return q(b) === p;
    }
    function R(b) {
      return typeof b == "object" && b !== null && b.$$typeof === t;
    }
    function $(b) {
      return q(b) === C;
    }
    function K(b) {
      return q(b) === i;
    }
    function P(b) {
      return q(b) === j;
    }
    function ie(b) {
      return q(b) === F;
    }
    function Z(b) {
      return q(b) === n;
    }
    function Oe(b) {
      return q(b) === c;
    }
    function Le(b) {
      return q(b) === u;
    }
    function Me(b) {
      return q(b) === A;
    }
    X.AsyncMode = l, X.ConcurrentMode = W, X.ContextConsumer = I, X.ContextProvider = Ce, X.Element = se, X.ForwardRef = ke, X.Fragment = Re, X.Lazy = ge, X.Memo = ye, X.Portal = Te, X.Profiler = le, X.StrictMode = fe, X.Suspense = be, X.isAsyncMode = z, X.isConcurrentMode = s, X.isContextConsumer = d, X.isContextProvider = T, X.isElement = R, X.isForwardRef = $, X.isFragment = K, X.isLazy = P, X.isMemo = ie, X.isPortal = Z, X.isProfiler = Oe, X.isStrictMode = Le, X.isSuspense = Me, X.isValidElementType = L, X.typeOf = q;
  }()), X;
}
var it;
function gn() {
  return it || (it = 1, process.env.NODE_ENV === "production" ? lr.exports = yn() : lr.exports = En()), lr.exports;
}
var Rr, ut;
function bn() {
  if (ut) return Rr;
  ut = 1;
  var r = gn(), t = {
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
  }, n = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, i = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, u = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, c = {};
  c[r.ForwardRef] = i, c[r.Memo] = u;
  function p(j) {
    return r.isMemo(j) ? u : c[j.$$typeof] || t;
  }
  var m = Object.defineProperty, w = Object.getOwnPropertyNames, g = Object.getOwnPropertySymbols, C = Object.getOwnPropertyDescriptor, A = Object.getPrototypeOf, ee = Object.prototype;
  function F(j, x, H) {
    if (typeof x != "string") {
      if (ee) {
        var Y = A(x);
        Y && Y !== ee && F(j, Y, H);
      }
      var U = w(x);
      g && (U = U.concat(g(x)));
      for (var L = p(j), q = p(x), l = 0; l < U.length; ++l) {
        var W = U[l];
        if (!n[W] && !(H && H[W]) && !(q && q[W]) && !(L && L[W])) {
          var I = C(x, W);
          try {
            m(j, W, I);
          } catch {
          }
        }
      }
    }
    return j;
  }
  return Rr = F, Rr;
}
bn();
var _n = !0;
function wn(r, t, n) {
  var i = "";
  return n.split(" ").forEach(function(u) {
    r[u] !== void 0 ? t.push(r[u] + ";") : u && (i += u + " ");
  }), i;
}
var Rt = function(t, n, i) {
  var u = t.key + "-" + n.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (i === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  _n === !1) && t.registered[u] === void 0 && (t.registered[u] = n.styles);
}, Sn = function(t, n, i) {
  Rt(t, n, i);
  var u = t.key + "-" + n.name;
  if (t.inserted[n.name] === void 0) {
    var c = n;
    do
      t.insert(n === c ? "." + u : "", c, t.sheet, !0), c = c.next;
    while (c !== void 0);
  }
};
function Cn(r) {
  for (var t = 0, n, i = 0, u = r.length; u >= 4; ++i, u -= 4)
    n = r.charCodeAt(i) & 255 | (r.charCodeAt(++i) & 255) << 8 | (r.charCodeAt(++i) & 255) << 16 | (r.charCodeAt(++i) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (u) {
    case 3:
      t ^= (r.charCodeAt(i + 2) & 255) << 16;
    case 2:
      t ^= (r.charCodeAt(i + 1) & 255) << 8;
    case 1:
      t ^= r.charCodeAt(i) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var Rn = {
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
}, Tn = !1, On = /[A-Z]|^ms/g, An = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Tt = function(t) {
  return t.charCodeAt(1) === 45;
}, ct = function(t) {
  return t != null && typeof t != "boolean";
}, Tr = /* @__PURE__ */ un(function(r) {
  return Tt(r) ? r : r.replace(On, "-$&").toLowerCase();
}), ft = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(An, function(i, u, c) {
          return $e = {
            name: u,
            styles: c,
            next: $e
          }, u;
        });
  }
  return Rn[t] !== 1 && !Tt(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
}, Pn = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function rr(r, t, n) {
  if (n == null)
    return "";
  var i = n;
  if (i.__emotion_styles !== void 0)
    return i;
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      var u = n;
      if (u.anim === 1)
        return $e = {
          name: u.name,
          styles: u.styles,
          next: $e
        }, u.name;
      var c = n;
      if (c.styles !== void 0) {
        var p = c.next;
        if (p !== void 0)
          for (; p !== void 0; )
            $e = {
              name: p.name,
              styles: p.styles,
              next: $e
            }, p = p.next;
        var m = c.styles + ";";
        return m;
      }
      return xn(r, t, n);
    }
    case "function": {
      if (r !== void 0) {
        var w = $e, g = n(r);
        return $e = w, rr(r, t, g);
      }
      break;
    }
  }
  var C = n;
  return C;
}
function xn(r, t, n) {
  var i = "";
  if (Array.isArray(n))
    for (var u = 0; u < n.length; u++)
      i += rr(r, t, n[u]) + ";";
  else
    for (var c in n) {
      var p = n[c];
      if (typeof p != "object") {
        var m = p;
        ct(m) && (i += Tr(c) + ":" + ft(c, m) + ";");
      } else {
        if (c === "NO_COMPONENT_SELECTOR" && Tn)
          throw new Error(Pn);
        if (Array.isArray(p) && typeof p[0] == "string" && t == null)
          for (var w = 0; w < p.length; w++)
            ct(p[w]) && (i += Tr(c) + ":" + ft(c, p[w]) + ";");
        else {
          var g = rr(r, t, p);
          switch (c) {
            case "animation":
            case "animationName": {
              i += Tr(c) + ":" + g + ";";
              break;
            }
            default:
              i += c + "{" + g + "}";
          }
        }
      }
    }
  return i;
}
var lt = /label:\s*([^\s;{]+)\s*(;|$)/g, $e;
function $n(r, t, n) {
  if (r.length === 1 && typeof r[0] == "object" && r[0] !== null && r[0].styles !== void 0)
    return r[0];
  var i = !0, u = "";
  $e = void 0;
  var c = r[0];
  if (c == null || c.raw === void 0)
    i = !1, u += rr(n, t, c);
  else {
    var p = c;
    u += p[0];
  }
  for (var m = 1; m < r.length; m++)
    if (u += rr(n, t, r[m]), i) {
      var w = c;
      u += w[m];
    }
  lt.lastIndex = 0;
  for (var g = "", C; (C = lt.exec(u)) !== null; )
    g += "-" + C[1];
  var A = Cn(u) + g;
  return {
    name: A,
    styles: u,
    next: $e
  };
}
var Nn = function(t) {
  return t();
}, kn = rt.useInsertionEffect ? rt.useInsertionEffect : !1, jn = kn || Nn, Mn = !1, Ot = /* @__PURE__ */ ce.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ hn({
    key: "css"
  }) : null
);
Ot.Provider;
var Yn = function(t) {
  return /* @__PURE__ */ ce.forwardRef(function(n, i) {
    var u = ce.useContext(Ot);
    return t(n, u, i);
  });
}, Ln = /* @__PURE__ */ ce.createContext({}), br = {}.hasOwnProperty, $r = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", At = function(t, n) {
  var i = {};
  for (var u in n)
    br.call(n, u) && (i[u] = n[u]);
  return i[$r] = t, i;
}, In = function(t) {
  var n = t.cache, i = t.serialized, u = t.isStringTag;
  return Rt(n, i, u), jn(function() {
    return Sn(n, i, u);
  }), null;
}, Hn = /* @__PURE__ */ Yn(function(r, t, n) {
  var i = r.css;
  typeof i == "string" && t.registered[i] !== void 0 && (i = t.registered[i]);
  var u = r[$r], c = [i], p = "";
  typeof r.className == "string" ? p = wn(t.registered, c, r.className) : r.className != null && (p = r.className + " ");
  var m = $n(c, void 0, ce.useContext(Ln));
  p += t.key + "-" + m.name;
  var w = {};
  for (var g in r)
    br.call(r, g) && g !== "css" && g !== $r && !Mn && (w[g] = r[g]);
  return w.className = p, n && (w.ref = n), /* @__PURE__ */ ce.createElement(ce.Fragment, null, /* @__PURE__ */ ce.createElement(In, {
    cache: t,
    serialized: m,
    isStringTag: typeof u == "string"
  }), /* @__PURE__ */ ce.createElement(u, w));
}), Pt = Hn, Un = Ze.Fragment, mr = function(t, n, i) {
  return br.call(n, "css") ? Ze.jsx(Pt, At(t, n), i) : Ze.jsx(t, n, i);
}, so = function(t, n, i) {
  return br.call(n, "css") ? Ze.jsxs(Pt, At(t, n), i) : Ze.jsxs(t, n, i);
};
const dt = (r) => {
  let t;
  const n = /* @__PURE__ */ new Set(), i = (g, C) => {
    const A = typeof g == "function" ? g(t) : g;
    if (!Object.is(A, t)) {
      const ee = t;
      t = C ?? (typeof A != "object" || A === null) ? A : Object.assign({}, t, A), n.forEach((F) => F(t, ee));
    }
  }, u = () => t, m = { setState: i, getState: u, getInitialState: () => w, subscribe: (g) => (n.add(g), () => n.delete(g)) }, w = t = r(i, u, m);
  return m;
}, Wn = (r) => r ? dt(r) : dt, qn = (r) => r;
function zn(r, t = qn) {
  const n = Ar.useSyncExternalStore(
    r.subscribe,
    () => t(r.getState()),
    () => t(r.getInitialState())
  );
  return Ar.useDebugValue(n), n;
}
const Dn = (r) => {
  const t = Wn(r), n = (i) => zn(t, i);
  return Object.assign(n, t), n;
}, Gn = (r) => Dn, Or = Gn()((r) => ({
  // わざとカーリー化
  txt: "",
  addTxt: (t) => r((n) => ({ txt: n.txt + t })),
  clearTxt: () => r(() => ({ txt: "" })),
  aLay: [],
  replace: (t) => r((n) => ({ aLay: JSON.parse(t) })),
  addLayer: (t) => r((n) => ({ aLay: [...n.aLay, t] })),
  chgPic: ({ nm: t, fn: n }) => r((i) => {
    const u = [...i.aLay], c = u.find((p) => p.nm === t);
    if (!c) throw `存在しないレイヤ ${t} です`;
    if (c.cls !== "GRP") throw `${t} は画像レイヤではありません`;
    return c.fn = n, { aLay: u };
  }),
  chgStr: ({ nm: t, str: n }) => r((i) => {
    const u = [...i.aLay], c = u.find((p) => p.nm === t);
    if (!c) throw `存在しないレイヤ ${t} です`;
    if (c.cls !== "TXT") throw `${t} は文字レイヤではありません`;
    return c.str = n, { aLay: u };
  })
}));
var Bn = function() {
};
function Fn(r) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  r && r.addEventListener && r.addEventListener.apply(r, t);
}
function Kn(r) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  r && r.removeEventListener && r.removeEventListener.apply(r, t);
}
var Vn = typeof window < "u", Xn = Vn ? window : null, vt = function(r) {
  return !!r.addEventListener;
}, pt = function(r) {
  return !!r.on;
}, Qn = function(r, t, n, i) {
  n === void 0 && (n = Xn), ce.useEffect(function() {
    if (t && n)
      return vt(n) ? Fn(n, r, t, i) : pt(n) && n.on(r, t, i), function() {
        vt(n) ? Kn(n, r, t, i) : pt(n) && n.off(r, t, i);
      };
  }, [r, t, n, JSON.stringify(i)]);
}, Zn = function(r) {
  return typeof r == "function" ? r : typeof r == "string" ? function(t) {
    return t.key === r;
  } : r ? function() {
    return !0;
  } : function() {
    return !1;
  };
}, mt = function(r, t, n, i) {
  t === void 0 && (t = Bn), n === void 0 && (n = {}), i === void 0 && (i = [r]);
  var u = n.event, c = u === void 0 ? "keydown" : u, p = n.target, m = n.options, w = ce.useMemo(function() {
    var g = Zn(r), C = function(A) {
      if (g(A))
        return t(A);
    };
    return C;
  }, i);
  Qn(c, w, p, m);
}, xt = /* @__PURE__ */ ((r) => (r.Renderer = "renderer", r.Application = "application", r.RendererSystem = "renderer-webgl-system", r.RendererPlugin = "renderer-webgl-plugin", r.CanvasRendererSystem = "renderer-canvas-system", r.CanvasRendererPlugin = "renderer-canvas-plugin", r.Asset = "asset", r.LoadParser = "load-parser", r.ResolveParser = "resolve-parser", r.CacheParser = "cache-parser", r.DetectionParser = "detection-parser", r))(xt || {});
const Nr = (r) => {
  if (typeof r == "function" || typeof r == "object" && r.extension) {
    if (!r.extension)
      throw new Error("Extension class must have an extension object");
    r = { ...typeof r.extension != "object" ? { type: r.extension } : r.extension, ref: r };
  }
  if (typeof r == "object")
    r = { ...r };
  else
    throw new Error("Invalid extension type");
  return typeof r.type == "string" && (r.type = [r.type]), r;
}, ht = (r, t) => Nr(r).priority ?? t, Jn = {
  /** @ignore */
  _addHandlers: {},
  /** @ignore */
  _removeHandlers: {},
  /** @ignore */
  _queue: {},
  /**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {PIXI.extensions} For chaining.
   */
  remove(...r) {
    return r.map(Nr).forEach((t) => {
      t.type.forEach((n) => this._removeHandlers[n]?.(t));
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...r) {
    return r.map(Nr).forEach((t) => {
      t.type.forEach((n) => {
        const i = this._addHandlers, u = this._queue;
        i[n] ? i[n]?.(t) : (u[n] = u[n] || [], u[n]?.push(t));
      });
    }), this;
  },
  /**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function for handling when extensions are added/registered passes {@link PIXI.ExtensionFormat}.
   * @param onRemove  - Function for handling when extensions are removed/unregistered passes {@link PIXI.ExtensionFormat}.
   * @returns {PIXI.extensions} For chaining.
   */
  handle(r, t, n) {
    const i = this._addHandlers, u = this._removeHandlers;
    if (i[r] || u[r])
      throw new Error(`Extension type ${r} already has a handler`);
    i[r] = t, u[r] = n;
    const c = this._queue;
    return c[r] && (c[r]?.forEach((p) => t(p)), delete c[r]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap(r, t) {
    return this.handle(
      r,
      (n) => {
        n.name && (t[n.name] = n.ref);
      },
      (n) => {
        n.name && delete t[n.name];
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByList(r, t, n = -1) {
    return this.handle(
      r,
      (i) => {
        t.includes(i.ref) || (t.push(i.ref), t.sort((u, c) => ht(c, n) - ht(u, n)));
      },
      (i) => {
        const u = t.indexOf(i.ref);
        u !== -1 && t.splice(u, 1);
      }
    );
  }
};
async function eo({ heStage: r, sys: t }) {
  const { createRoot: n } = await import("./client.js").then((i) => i.c);
  n(r).render(/* @__PURE__ */ mr(ro, { heStage: r, sys: t })), await Promise.all([
    import("./index.js"),
    import("./ScriptMng.js")
  ]).then(async ([{ Assets: i }, { ScriptMng: u }]) => {
    await i.init({ basePath: location.origin }), Jn.add({
      extension: {
        type: xt.LoadParser,
        name: "sn-loader"
        //priority: LoaderParserPriority.High,
      },
      test: (p) => p.endsWith(".sn"),
      load: (p) => new Promise(async (m, w) => {
        const g = await fetch(p);
        if (!g.ok) {
          w("sn-loader fetch err:" + g.statusText);
          return;
        }
        try {
          m(await t.dec("sn", await g.text()));
        } catch (C) {
          w(`sn-loader err url:${p} ${C}`);
        }
      })
    }), await new u(t, i).load("main");
  });
}
function ro({ heStage: r, sys: t }) {
  const n = Or((m) => m.addLayer), i = Or((m) => m.chgPic), u = Or((m) => m.chgStr);
  function c() {
    if (!t.caretaker.afterKey())
      for (console.log("fn:Main.tsx == next =="); ; ) {
        const { done: m, value: w } = no.next();
        if (m) break;
        t.caretaker.key = "main:" + ++to, "cls" in w ? n(w) : "fn" in w ? i(w) : u(w);
        break;
      }
  }
  ce.useEffect(() => c(), []), mt("ArrowDown", (m) => {
    m.stopPropagation(), m.preventDefault(), c();
  }), mt("ArrowUp", (m) => {
    m.stopPropagation(), m.preventDefault(), t.caretaker.beforeKey();
  });
  const p = ce.lazy(() => import("./Stage.js"));
  return /* @__PURE__ */ mr(ce.Suspense, { fallback: /* @__PURE__ */ mr(Un, { children: "Loading" }), children: /* @__PURE__ */ mr(p, { arg: { heStage: r, sys: t }, onClick: c }) });
}
let to = 0;
const no = oo();
function* oo() {
  yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "TXT", nm: "mes", str: "あいうえお" }, yield { nm: "mes", str: "かきくけこ" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
}
const io = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  opening: eo
}, Symbol.toStringTag, { value: "Module" }));
export {
  xt as E,
  Un as F,
  io as M,
  ce as a,
  mr as b,
  Pt as c,
  At as d,
  Jn as e,
  br as h,
  so as j,
  yt as r,
  $n as s,
  Or as u
};
//# sourceMappingURL=Main.js.map
