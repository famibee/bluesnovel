import { g as jt } from "./web2.js";
function Mt(e, t) {
  for (var n = 0; n < t.length; n++) {
    const i = t[n];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const u in i)
        if (u !== "default" && !(u in e)) {
          const c = Object.getOwnPropertyDescriptor(i, u);
          c && Object.defineProperty(e, u, c.get ? c : {
            enumerable: !0,
            get: () => i[u]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
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
var Xr;
function Yt() {
  if (Xr) return Ke;
  Xr = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(i, u, c) {
    var v = null;
    if (c !== void 0 && (v = "" + c), u.key !== void 0 && (v = "" + u.key), "key" in u) {
      c = {};
      for (var h in u)
        h !== "key" && (c[h] = u[h]);
    } else c = u;
    return u = c.ref, {
      $$typeof: e,
      type: i,
      key: v,
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
var Qr;
function Lt() {
  if (Qr) return k;
  Qr = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), v = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), E = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), C = Symbol.iterator;
  function ee(s) {
    return s === null || typeof s != "object" ? null : (s = C && s[C] || s["@@iterator"], typeof s == "function" ? s : null);
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
  function U(s, d, O) {
    this.props = s, this.context = d, this.refs = x, this.updater = O || F;
  }
  U.prototype.isReactComponent = {}, U.prototype.setState = function(s, d) {
    if (typeof s != "object" && typeof s != "function" && s != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, s, d, "setState");
  }, U.prototype.forceUpdate = function(s) {
    this.updater.enqueueForceUpdate(this, s, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = U.prototype;
  function H(s, d, O) {
    this.props = s, this.context = d, this.refs = x, this.updater = O || F;
  }
  var L = H.prototype = new Y();
  L.constructor = H, j(L, U.prototype), L.isPureReactComponent = !0;
  var q = Array.isArray, l = { H: null, A: null, T: null, S: null }, W = Object.prototype.hasOwnProperty;
  function I(s, d, O, R, $, K) {
    return O = K.ref, {
      $$typeof: e,
      type: s,
      key: d,
      ref: O !== void 0 ? O : null,
      props: K
    };
  }
  function Te(s, d) {
    return I(
      s.type,
      d,
      void 0,
      void 0,
      void 0,
      s.props
    );
  }
  function ie(s) {
    return typeof s == "object" && s !== null && s.$$typeof === e;
  }
  function ke(s) {
    var d = { "=": "=0", ":": "=2" };
    return "$" + s.replace(/[=:]/g, function(O) {
      return d[O];
    });
  }
  var Ce = /\/+/g;
  function ge(s, d) {
    return typeof s == "object" && s !== null && s.key != null ? ke("" + s.key) : d.toString(36);
  }
  function ye() {
  }
  function Re(s) {
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
  function le(s, d, O, R, $) {
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
            case e:
            case t:
              P = !0;
              break;
            case y:
              return P = s._init, le(
                P(s._payload),
                d,
                O,
                R,
                $
              );
          }
      }
    if (P)
      return $ = $(s), P = R === "" ? "." + ge(s, 0) : R, q($) ? (O = "", P != null && (O = P.replace(Ce, "$&/") + "/"), le($, d, O, "", function(Oe) {
        return Oe;
      })) : $ != null && (ie($) && ($ = Te(
        $,
        O + ($.key == null || s && s.key === $.key ? "" : ("" + $.key).replace(
          Ce,
          "$&/"
        ) + "/") + P
      )), d.push($)), 1;
    P = 0;
    var ue = R === "" ? "." : R + ":";
    if (q(s))
      for (var Z = 0; Z < s.length; Z++)
        R = s[Z], K = ue + ge(R, Z), P += le(
          R,
          d,
          O,
          K,
          $
        );
    else if (Z = ee(s), typeof Z == "function")
      for (s = Z.call(s), Z = 0; !(R = s.next()).done; )
        R = R.value, K = ue + ge(R, Z++), P += le(
          R,
          d,
          O,
          K,
          $
        );
    else if (K === "object") {
      if (typeof s.then == "function")
        return le(
          Re(s),
          d,
          O,
          R,
          $
        );
      throw d = String(s), Error(
        "Objects are not valid as a React child (found: " + (d === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : d) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return P;
  }
  function fe(s, d, O) {
    if (s == null) return s;
    var R = [], $ = 0;
    return le(s, R, "", "", function(K) {
      return d.call(O, K, $++);
    }), R;
  }
  function be(s) {
    if (s._status === -1) {
      var d = s._result;
      d = d(), d.then(
        function(O) {
          (s._status === 0 || s._status === -1) && (s._status = 1, s._result = O);
        },
        function(O) {
          (s._status === 0 || s._status === -1) && (s._status = 2, s._result = O);
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
    forEach: function(s, d, O) {
      fe(
        s,
        function() {
          d.apply(this, arguments);
        },
        O
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
      if (!ie(s))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return s;
    }
  }, k.Component = U, k.Fragment = n, k.Profiler = u, k.PureComponent = H, k.StrictMode = i, k.Suspense = S, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, k.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, k.cache = function(s) {
    return function() {
      return s.apply(null, arguments);
    };
  }, k.cloneElement = function(s, d, O) {
    if (s == null)
      throw Error(
        "The argument must be a React element, but you passed " + s + "."
      );
    var R = j({}, s.props), $ = s.key, K = void 0;
    if (d != null)
      for (P in d.ref !== void 0 && (K = void 0), d.key !== void 0 && ($ = "" + d.key), d)
        !W.call(d, P) || P === "key" || P === "__self" || P === "__source" || P === "ref" && d.ref === void 0 || (R[P] = d[P]);
    var P = arguments.length - 2;
    if (P === 1) R.children = O;
    else if (1 < P) {
      for (var ue = Array(P), Z = 0; Z < P; Z++)
        ue[Z] = arguments[Z + 2];
      R.children = ue;
    }
    return I(s.type, $, void 0, void 0, K, R);
  }, k.createContext = function(s) {
    return s = {
      $$typeof: v,
      _currentValue: s,
      _currentValue2: s,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, s.Provider = s, s.Consumer = {
      $$typeof: c,
      _context: s
    }, s;
  }, k.createElement = function(s, d, O) {
    var R, $ = {}, K = null;
    if (d != null)
      for (R in d.key !== void 0 && (K = "" + d.key), d)
        W.call(d, R) && R !== "key" && R !== "__self" && R !== "__source" && ($[R] = d[R]);
    var P = arguments.length - 2;
    if (P === 1) $.children = O;
    else if (1 < P) {
      for (var ue = Array(P), Z = 0; Z < P; Z++)
        ue[Z] = arguments[Z + 2];
      $.children = ue;
    }
    if (s && s.defaultProps)
      for (R in P = s.defaultProps, P)
        $[R] === void 0 && ($[R] = P[R]);
    return I(s, K, void 0, void 0, null, $);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(s) {
    return { $$typeof: h, render: s };
  }, k.isValidElement = ie, k.lazy = function(s) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: s },
      _init: be
    };
  }, k.memo = function(s, d) {
    return {
      $$typeof: E,
      type: s,
      compare: d === void 0 ? null : d
    };
  }, k.startTransition = function(s) {
    var d = l.T, O = {};
    l.T = O;
    try {
      var R = s(), $ = l.S;
      $ !== null && $(O, R), typeof R == "object" && R !== null && typeof R.then == "function" && R.then(z, je);
    } catch (K) {
      je(K);
    } finally {
      l.T = d;
    }
  }, k.unstable_useCacheRefresh = function() {
    return l.H.useCacheRefresh();
  }, k.use = function(s) {
    return l.H.use(s);
  }, k.useActionState = function(s, d, O) {
    return l.H.useActionState(s, d, O);
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
  }, k.useImperativeHandle = function(s, d, O) {
    return l.H.useImperativeHandle(s, d, O);
  }, k.useInsertionEffect = function(s, d) {
    return l.H.useInsertionEffect(s, d);
  }, k.useLayoutEffect = function(s, d) {
    return l.H.useLayoutEffect(s, d);
  }, k.useMemo = function(s, d) {
    return l.H.useMemo(s, d);
  }, k.useOptimistic = function(s, d) {
    return l.H.useOptimistic(s, d);
  }, k.useReducer = function(s, d, O) {
    return l.H.useReducer(s, d, O);
  }, k.useRef = function(s) {
    return l.H.useRef(s);
  }, k.useState = function(s) {
    return l.H.useState(s);
  }, k.useSyncExternalStore = function(s, d, O) {
    return l.H.useSyncExternalStore(
      s,
      d,
      O
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
var Zr;
function It() {
  return Zr || (Zr = 1, function(e, t) {
    process.env.NODE_ENV !== "production" && function() {
      function n(r, a) {
        Object.defineProperty(c.prototype, r, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              a[0],
              a[1]
            );
          }
        });
      }
      function i(r) {
        return r === null || typeof r != "object" ? null : (r = Be && r[Be] || r["@@iterator"], typeof r == "function" ? r : null);
      }
      function u(r, a) {
        r = (r = r.constructor) && (r.displayName || r.name) || "ReactClass";
        var f = r + "." + a;
        Fe[f] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          a,
          r
        ), Fe[f] = !0);
      }
      function c(r, a, f) {
        this.props = r, this.context = a, this.refs = g, this.updater = f || o;
      }
      function v() {
      }
      function h(r, a, f) {
        this.props = r, this.context = a, this.refs = g, this.updater = f || o;
      }
      function S(r) {
        return "" + r;
      }
      function E(r) {
        try {
          S(r);
          var a = !1;
        } catch {
          a = !0;
        }
        if (a) {
          a = console;
          var f = a.error, p = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
          return f.call(
            a,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            p
          ), S(r);
        }
      }
      function y(r) {
        if (r == null) return null;
        if (typeof r == "function")
          return r.$$typeof === N ? null : r.displayName || r.name || null;
        if (typeof r == "string") return r;
        switch (r) {
          case Z:
            return "Fragment";
          case ue:
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
        if (typeof r == "object")
          switch (typeof r.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), r.$$typeof) {
            case _:
              return (r.displayName || "Context") + ".Provider";
            case Me:
              return (r._context.displayName || "Context") + ".Consumer";
            case _e:
              var a = r.render;
              return r = r.displayName, r || (r = a.displayName || a.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
            case He:
              return a = r.displayName || null, a !== null ? a : y(r.type) || "Memo";
            case Ie:
              a = r._payload, r = r._init;
              try {
                return y(r(a));
              } catch {
              }
          }
        return null;
      }
      function C(r) {
        return typeof r == "string" || typeof r == "function" || r === Z || r === Le || r === Oe || r === pe || r === Ae || r === nr || typeof r == "object" && r !== null && (r.$$typeof === Ie || r.$$typeof === He || r.$$typeof === _ || r.$$typeof === Me || r.$$typeof === _e || r.$$typeof === ae || r.getModuleId !== void 0);
      }
      function ee() {
      }
      function F() {
        if (me === 0) {
          Ue = console.log, Se = console.info, We = console.warn, Ee = console.error, Lr = console.group, Ir = console.groupCollapsed, Ur = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        me++;
      }
      function j() {
        if (me--, me === 0) {
          var r = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: m({}, r, { value: Ue }),
            info: m({}, r, { value: Se }),
            warn: m({}, r, { value: We }),
            error: m({}, r, { value: Ee }),
            group: m({}, r, { value: Lr }),
            groupCollapsed: m({}, r, { value: Ir }),
            groupEnd: m({}, r, { value: Ur })
          });
        }
        0 > me && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function x(r) {
        if (_r === void 0)
          try {
            throw Error();
          } catch (f) {
            var a = f.stack.trim().match(/\n( *(at )?)/);
            _r = a && a[1] || "", Hr = -1 < f.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < f.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + _r + r + Hr;
      }
      function U(r, a) {
        if (!r || wr) return "";
        var f = Sr.get(r);
        if (f !== void 0) return f;
        wr = !0, f = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var p = null;
        p = A.H, A.H = null, F();
        try {
          var b = {
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
                    Reflect.construct(r, [], Pe);
                  } else {
                    try {
                      Pe.call();
                    } catch (Ye) {
                      ir = Ye;
                    }
                    r.call(Pe.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (Ye) {
                    ir = Ye;
                  }
                  (Pe = r()) && typeof Pe.catch == "function" && Pe.catch(function() {
                  });
                }
              } catch (Ye) {
                if (Ye && ir && typeof Ye.stack == "string")
                  return [Ye.stack, ir.stack];
              }
              return [null, null];
            }
          };
          b.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var T = Object.getOwnPropertyDescriptor(
            b.DetermineComponentFrameRoot,
            "name"
          );
          T && T.configurable && Object.defineProperty(
            b.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var w = b.DetermineComponentFrameRoot(), Q = w[0], D = w[1];
          if (Q && D) {
            var re = Q.split(`
`), de = D.split(`
`);
            for (w = T = 0; T < re.length && !re[T].includes(
              "DetermineComponentFrameRoot"
            ); )
              T++;
            for (; w < de.length && !de[w].includes(
              "DetermineComponentFrameRoot"
            ); )
              w++;
            if (T === re.length || w === de.length)
              for (T = re.length - 1, w = de.length - 1; 1 <= T && 0 <= w && re[T] !== de[w]; )
                w--;
            for (; 1 <= T && 0 <= w; T--, w--)
              if (re[T] !== de[w]) {
                if (T !== 1 || w !== 1)
                  do
                    if (T--, w--, 0 > w || re[T] !== de[w]) {
                      var qe = `
` + re[T].replace(
                        " at new ",
                        " at "
                      );
                      return r.displayName && qe.includes("<anonymous>") && (qe = qe.replace("<anonymous>", r.displayName)), typeof r == "function" && Sr.set(r, qe), qe;
                    }
                  while (1 <= T && 0 <= w);
                break;
              }
          }
        } finally {
          wr = !1, A.H = p, j(), Error.prepareStackTrace = f;
        }
        return re = (re = r ? r.displayName || r.name : "") ? x(re) : "", typeof r == "function" && Sr.set(r, re), re;
      }
      function Y(r) {
        if (r == null) return "";
        if (typeof r == "function") {
          var a = r.prototype;
          return U(
            r,
            !(!a || !a.isReactComponent)
          );
        }
        if (typeof r == "string") return x(r);
        switch (r) {
          case pe:
            return x("Suspense");
          case Ae:
            return x("SuspenseList");
        }
        if (typeof r == "object")
          switch (r.$$typeof) {
            case _e:
              return r = U(r.render, !1), r;
            case He:
              return Y(r.type);
            case Ie:
              a = r._payload, r = r._init;
              try {
                return Y(r(a));
              } catch {
              }
          }
        return "";
      }
      function H() {
        var r = A.A;
        return r === null ? null : r.getOwner();
      }
      function L(r) {
        if (we.call(r, "key")) {
          var a = Object.getOwnPropertyDescriptor(r, "key").get;
          if (a && a.isReactWarning) return !1;
        }
        return r.key !== void 0;
      }
      function q(r, a) {
        function f() {
          Wr || (Wr = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            a
          ));
        }
        f.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: f,
          configurable: !0
        });
      }
      function l() {
        var r = y(this.type);
        return zr[r] || (zr[r] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), r = this.props.ref, r !== void 0 ? r : null;
      }
      function W(r, a, f, p, b, T) {
        return f = T.ref, r = {
          $$typeof: P,
          type: r,
          key: a,
          props: T,
          _owner: b
        }, (f !== void 0 ? f : null) !== null ? Object.defineProperty(r, "ref", {
          enumerable: !1,
          get: l
        }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(r, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
      }
      function I(r, a) {
        return a = W(
          r.type,
          a,
          void 0,
          void 0,
          r._owner,
          r.props
        ), a._store.validated = r._store.validated, a;
      }
      function Te(r, a) {
        if (typeof r == "object" && r && r.$$typeof !== kt) {
          if (J(r))
            for (var f = 0; f < r.length; f++) {
              var p = r[f];
              ie(p) && ke(p, a);
            }
          else if (ie(r))
            r._store && (r._store.validated = 1);
          else if (f = i(r), typeof f == "function" && f !== r.entries && (f = f.call(r), f !== r))
            for (; !(r = f.next()).done; )
              ie(r.value) && ke(r.value, a);
        }
      }
      function ie(r) {
        return typeof r == "object" && r !== null && r.$$typeof === P;
      }
      function ke(r, a) {
        if (r._store && !r._store.validated && r.key == null && (r._store.validated = 1, a = Ce(a), !Dr[a])) {
          Dr[a] = !0;
          var f = "";
          r && r._owner != null && r._owner !== H() && (f = null, typeof r._owner.tag == "number" ? f = y(r._owner.type) : typeof r._owner.name == "string" && (f = r._owner.name), f = " It was passed a child from " + f + ".");
          var p = A.getCurrentStack;
          A.getCurrentStack = function() {
            var b = Y(r.type);
            return p && (b += p() || ""), b;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            a,
            f
          ), A.getCurrentStack = p;
        }
      }
      function Ce(r) {
        var a = "", f = H();
        return f && (f = y(f.type)) && (a = `

Check the render method of \`` + f + "`."), a || (r = y(r)) && (a = `

Check the top-level render call using <` + r + ">."), a;
      }
      function ge(r) {
        var a = { "=": "=0", ":": "=2" };
        return "$" + r.replace(/[=:]/g, function(f) {
          return a[f];
        });
      }
      function ye(r, a) {
        return typeof r == "object" && r !== null && r.key != null ? (E(r.key), ge("" + r.key)) : a.toString(36);
      }
      function Re() {
      }
      function le(r) {
        switch (r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
          default:
            switch (typeof r.status == "string" ? r.then(Re, Re) : (r.status = "pending", r.then(
              function(a) {
                r.status === "pending" && (r.status = "fulfilled", r.value = a);
              },
              function(a) {
                r.status === "pending" && (r.status = "rejected", r.reason = a);
              }
            )), r.status) {
              case "fulfilled":
                return r.value;
              case "rejected":
                throw r.reason;
            }
        }
        throw r;
      }
      function fe(r, a, f, p, b) {
        var T = typeof r;
        (T === "undefined" || T === "boolean") && (r = null);
        var w = !1;
        if (r === null) w = !0;
        else
          switch (T) {
            case "bigint":
            case "string":
            case "number":
              w = !0;
              break;
            case "object":
              switch (r.$$typeof) {
                case P:
                case ue:
                  w = !0;
                  break;
                case Ie:
                  return w = r._init, fe(
                    w(r._payload),
                    a,
                    f,
                    p,
                    b
                  );
              }
          }
        if (w) {
          w = r, b = b(w);
          var Q = p === "" ? "." + ye(w, 0) : p;
          return J(b) ? (f = "", Q != null && (f = Q.replace(Br, "$&/") + "/"), fe(b, a, f, "", function(re) {
            return re;
          })) : b != null && (ie(b) && (b.key != null && (w && w.key === b.key || E(b.key)), f = I(
            b,
            f + (b.key == null || w && w.key === b.key ? "" : ("" + b.key).replace(
              Br,
              "$&/"
            ) + "/") + Q
          ), p !== "" && w != null && ie(w) && w.key == null && w._store && !w._store.validated && (f._store.validated = 2), b = f), a.push(b)), 1;
        }
        if (w = 0, Q = p === "" ? "." : p + ":", J(r))
          for (var D = 0; D < r.length; D++)
            p = r[D], T = Q + ye(p, D), w += fe(
              p,
              a,
              f,
              T,
              b
            );
        else if (D = i(r), typeof D == "function")
          for (D === r.entries && (Gr || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Gr = !0), r = D.call(r), D = 0; !(p = r.next()).done; )
            p = p.value, T = Q + ye(p, D++), w += fe(
              p,
              a,
              f,
              T,
              b
            );
        else if (T === "object") {
          if (typeof r.then == "function")
            return fe(
              le(r),
              a,
              f,
              p,
              b
            );
          throw a = String(r), Error(
            "Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return w;
      }
      function be(r, a, f) {
        if (r == null) return r;
        var p = [], b = 0;
        return fe(r, p, "", "", function(T) {
          return a.call(f, T, b++);
        }), p;
      }
      function je(r) {
        if (r._status === -1) {
          var a = r._result;
          a = a(), a.then(
            function(f) {
              (r._status === 0 || r._status === -1) && (r._status = 1, r._result = f);
            },
            function(f) {
              (r._status === 0 || r._status === -1) && (r._status = 2, r._result = f);
            }
          ), r._status === -1 && (r._status = 0, r._result = a);
        }
        if (r._status === 1)
          return a = r._result, a === void 0 && console.error(
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
        throw r._result;
      }
      function z() {
        var r = A.H;
        return r === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), r;
      }
      function s() {
      }
      function d(r) {
        if (or === null)
          try {
            var a = ("require" + Math.random()).slice(0, 7);
            or = (e && e[a]).call(
              e,
              "timers"
            ).setImmediate;
          } catch {
            or = function(p) {
              Kr === !1 && (Kr = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var b = new MessageChannel();
              b.port1.onmessage = p, b.port2.postMessage(void 0);
            };
          }
        return or(r);
      }
      function O(r) {
        return 1 < r.length && typeof AggregateError == "function" ? new AggregateError(r) : r[0];
      }
      function R(r, a) {
        a !== ar - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), ar = a;
      }
      function $(r, a, f) {
        var p = A.actQueue;
        if (p !== null)
          if (p.length !== 0)
            try {
              K(p), d(function() {
                return $(r, a, f);
              });
              return;
            } catch (b) {
              A.thrownErrors.push(b);
            }
          else A.actQueue = null;
        0 < A.thrownErrors.length ? (p = O(A.thrownErrors), A.thrownErrors.length = 0, f(p)) : a(r);
      }
      function K(r) {
        if (!Tr) {
          Tr = !0;
          var a = 0;
          try {
            for (; a < r.length; a++) {
              var f = r[a];
              do {
                A.didUsePromise = !1;
                var p = f(!1);
                if (p !== null) {
                  if (A.didUsePromise) {
                    r[a] = f, r.splice(0, a);
                    return;
                  }
                  f = p;
                } else break;
              } while (!0);
            }
            r.length = 0;
          } catch (b) {
            r.splice(0, a + 1), A.thrownErrors.push(b);
          } finally {
            Tr = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var P = Symbol.for("react.transitional.element"), ue = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), Oe = Symbol.for("react.strict_mode"), Le = Symbol.for("react.profiler"), Me = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), _e = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), Ae = Symbol.for("react.suspense_list"), He = Symbol.for("react.memo"), Ie = Symbol.for("react.lazy"), nr = Symbol.for("react.offscreen"), Be = Symbol.iterator, Fe = {}, o = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(r) {
          u(r, "forceUpdate");
        },
        enqueueReplaceState: function(r) {
          u(r, "replaceState");
        },
        enqueueSetState: function(r) {
          u(r, "setState");
        }
      }, m = Object.assign, g = {};
      Object.freeze(g), c.prototype.isReactComponent = {}, c.prototype.setState = function(r, a) {
        if (typeof r != "object" && typeof r != "function" && r != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, r, a, "setState");
      }, c.prototype.forceUpdate = function(r) {
        this.updater.enqueueForceUpdate(this, r, "forceUpdate");
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
      v.prototype = c.prototype, M = h.prototype = new v(), M.constructor = h, m(M, c.prototype), M.isPureReactComponent = !0;
      var J = Array.isArray, N = Symbol.for("react.client.reference"), A = {
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
      }, we = Object.prototype.hasOwnProperty, ae = Symbol.for("react.client.reference"), me = 0, Ue, Se, We, Ee, Lr, Ir, Ur;
      ee.__reactDisabledLog = !0;
      var _r, Hr, wr = !1, Sr = new (typeof WeakMap == "function" ? WeakMap : Map)(), kt = Symbol.for("react.client.reference"), Wr, qr, zr = {}, Dr = {}, Gr = !1, Br = /\/+/g, Fr = typeof reportError == "function" ? reportError : function(r) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var a = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
            error: r
          });
          if (!window.dispatchEvent(a)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", r);
          return;
        }
        console.error(r);
      }, Kr = !1, or = null, ar = 0, sr = !1, Tr = !1, Vr = typeof queueMicrotask == "function" ? function(r) {
        queueMicrotask(function() {
          return queueMicrotask(r);
        });
      } : d;
      t.Children = {
        map: be,
        forEach: function(r, a, f) {
          be(
            r,
            function() {
              a.apply(this, arguments);
            },
            f
          );
        },
        count: function(r) {
          var a = 0;
          return be(r, function() {
            a++;
          }), a;
        },
        toArray: function(r) {
          return be(r, function(a) {
            return a;
          }) || [];
        },
        only: function(r) {
          if (!ie(r))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return r;
        }
      }, t.Component = c, t.Fragment = Z, t.Profiler = Le, t.PureComponent = h, t.StrictMode = Oe, t.Suspense = pe, t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = A, t.act = function(r) {
        var a = A.actQueue, f = ar;
        ar++;
        var p = A.actQueue = a !== null ? a : [], b = !1;
        try {
          var T = r();
        } catch (D) {
          A.thrownErrors.push(D);
        }
        if (0 < A.thrownErrors.length)
          throw R(a, f), r = O(A.thrownErrors), A.thrownErrors.length = 0, r;
        if (T !== null && typeof T == "object" && typeof T.then == "function") {
          var w = T;
          return Vr(function() {
            b || sr || (sr = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(D, re) {
              b = !0, w.then(
                function(de) {
                  if (R(a, f), f === 0) {
                    try {
                      K(p), d(function() {
                        return $(
                          de,
                          D,
                          re
                        );
                      });
                    } catch (Pe) {
                      A.thrownErrors.push(Pe);
                    }
                    if (0 < A.thrownErrors.length) {
                      var qe = O(
                        A.thrownErrors
                      );
                      A.thrownErrors.length = 0, re(qe);
                    }
                  } else D(de);
                },
                function(de) {
                  R(a, f), 0 < A.thrownErrors.length && (de = O(
                    A.thrownErrors
                  ), A.thrownErrors.length = 0), re(de);
                }
              );
            }
          };
        }
        var Q = T;
        if (R(a, f), f === 0 && (K(p), p.length !== 0 && Vr(function() {
          b || sr || (sr = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), A.actQueue = null), 0 < A.thrownErrors.length)
          throw r = O(A.thrownErrors), A.thrownErrors.length = 0, r;
        return {
          then: function(D, re) {
            b = !0, f === 0 ? (A.actQueue = p, d(function() {
              return $(
                Q,
                D,
                re
              );
            })) : D(Q);
          }
        };
      }, t.cache = function(r) {
        return function() {
          return r.apply(null, arguments);
        };
      }, t.cloneElement = function(r, a, f) {
        if (r == null)
          throw Error(
            "The argument must be a React element, but you passed " + r + "."
          );
        var p = m({}, r.props), b = r.key, T = r._owner;
        if (a != null) {
          var w;
          e: {
            if (we.call(a, "ref") && (w = Object.getOwnPropertyDescriptor(
              a,
              "ref"
            ).get) && w.isReactWarning) {
              w = !1;
              break e;
            }
            w = a.ref !== void 0;
          }
          w && (T = H()), L(a) && (E(a.key), b = "" + a.key);
          for (Q in a)
            !we.call(a, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && a.ref === void 0 || (p[Q] = a[Q]);
        }
        var Q = arguments.length - 2;
        if (Q === 1) p.children = f;
        else if (1 < Q) {
          w = Array(Q);
          for (var D = 0; D < Q; D++)
            w[D] = arguments[D + 2];
          p.children = w;
        }
        for (p = W(r.type, b, void 0, void 0, T, p), b = 2; b < arguments.length; b++)
          Te(arguments[b], p.type);
        return p;
      }, t.createContext = function(r) {
        return r = {
          $$typeof: _,
          _currentValue: r,
          _currentValue2: r,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, r.Provider = r, r.Consumer = {
          $$typeof: Me,
          _context: r
        }, r._currentRenderer = null, r._currentRenderer2 = null, r;
      }, t.createElement = function(r, a, f) {
        if (C(r))
          for (var p = 2; p < arguments.length; p++)
            Te(arguments[p], r);
        else {
          if (p = "", (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), r === null) var b = "null";
          else
            J(r) ? b = "array" : r !== void 0 && r.$$typeof === P ? (b = "<" + (y(r.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : b = typeof r;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            b,
            p
          );
        }
        var T;
        if (p = {}, b = null, a != null)
          for (T in qr || !("__self" in a) || "key" in a || (qr = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), L(a) && (E(a.key), b = "" + a.key), a)
            we.call(a, T) && T !== "key" && T !== "__self" && T !== "__source" && (p[T] = a[T]);
        var w = arguments.length - 2;
        if (w === 1) p.children = f;
        else if (1 < w) {
          for (var Q = Array(w), D = 0; D < w; D++)
            Q[D] = arguments[D + 2];
          Object.freeze && Object.freeze(Q), p.children = Q;
        }
        if (r && r.defaultProps)
          for (T in w = r.defaultProps, w)
            p[T] === void 0 && (p[T] = w[T]);
        return b && q(
          p,
          typeof r == "function" ? r.displayName || r.name || "Unknown" : r
        ), W(r, b, void 0, void 0, H(), p);
      }, t.createRef = function() {
        var r = { current: null };
        return Object.seal(r), r;
      }, t.forwardRef = function(r) {
        r != null && r.$$typeof === He ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof r != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          r === null ? "null" : typeof r
        ) : r.length !== 0 && r.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          r.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), r != null && r.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var a = { $$typeof: _e, render: r }, f;
        return Object.defineProperty(a, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(p) {
            f = p, r.name || r.displayName || (Object.defineProperty(r, "name", { value: p }), r.displayName = p);
          }
        }), a;
      }, t.isValidElement = ie, t.lazy = function(r) {
        return {
          $$typeof: Ie,
          _payload: { _status: -1, _result: r },
          _init: je
        };
      }, t.memo = function(r, a) {
        C(r) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          r === null ? "null" : typeof r
        ), a = {
          $$typeof: He,
          type: r,
          compare: a === void 0 ? null : a
        };
        var f;
        return Object.defineProperty(a, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(p) {
            f = p, r.name || r.displayName || (Object.defineProperty(r, "name", { value: p }), r.displayName = p);
          }
        }), a;
      }, t.startTransition = function(r) {
        var a = A.T, f = {};
        A.T = f, f._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var p = r(), b = A.S;
          b !== null && b(f, p), typeof p == "object" && p !== null && typeof p.then == "function" && p.then(s, Fr);
        } catch (T) {
          Fr(T);
        } finally {
          a === null && f._updatedFibers && (r = f._updatedFibers.size, f._updatedFibers.clear(), 10 < r && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), A.T = a;
        }
      }, t.unstable_useCacheRefresh = function() {
        return z().useCacheRefresh();
      }, t.use = function(r) {
        return z().use(r);
      }, t.useActionState = function(r, a, f) {
        return z().useActionState(
          r,
          a,
          f
        );
      }, t.useCallback = function(r, a) {
        return z().useCallback(r, a);
      }, t.useContext = function(r) {
        var a = z();
        return r.$$typeof === Me && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), a.useContext(r);
      }, t.useDebugValue = function(r, a) {
        return z().useDebugValue(r, a);
      }, t.useDeferredValue = function(r, a) {
        return z().useDeferredValue(r, a);
      }, t.useEffect = function(r, a) {
        return z().useEffect(r, a);
      }, t.useId = function() {
        return z().useId();
      }, t.useImperativeHandle = function(r, a, f) {
        return z().useImperativeHandle(r, a, f);
      }, t.useInsertionEffect = function(r, a) {
        return z().useInsertionEffect(r, a);
      }, t.useLayoutEffect = function(r, a) {
        return z().useLayoutEffect(r, a);
      }, t.useMemo = function(r, a) {
        return z().useMemo(r, a);
      }, t.useOptimistic = function(r, a) {
        return z().useOptimistic(r, a);
      }, t.useReducer = function(r, a, f) {
        return z().useReducer(r, a, f);
      }, t.useRef = function(r) {
        return z().useRef(r);
      }, t.useState = function(r) {
        return z().useState(r);
      }, t.useSyncExternalStore = function(r, a, f) {
        return z().useSyncExternalStore(
          r,
          a,
          f
        );
      }, t.useTransition = function() {
        return z().useTransition();
      }, t.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(Qe, Qe.exports)), Qe.exports;
}
var Jr;
function Et() {
  return Jr || (Jr = 1, process.env.NODE_ENV === "production" ? cr.exports = Lt() : cr.exports = It()), cr.exports;
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
var et;
function Ut() {
  return et || (et = 1, process.env.NODE_ENV !== "production" && function() {
    function e(o) {
      if (o == null) return null;
      if (typeof o == "function")
        return o.$$typeof === je ? null : o.displayName || o.name || null;
      if (typeof o == "string") return o;
      switch (o) {
        case W:
          return "Fragment";
        case l:
          return "Portal";
        case Te:
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
          case ie:
            return (o._context.displayName || "Context") + ".Consumer";
          case Ce:
            var m = o.render;
            return o = o.displayName, o || (o = m.displayName || m.name || "", o = o !== "" ? "ForwardRef(" + o + ")" : "ForwardRef"), o;
          case Re:
            return m = o.displayName || null, m !== null ? m : e(o.type) || "Memo";
          case le:
            m = o._payload, o = o._init;
            try {
              return e(o(m));
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
        var m = !1;
      } catch {
        m = !0;
      }
      if (m) {
        m = console;
        var g = m.error, M = typeof Symbol == "function" && Symbol.toStringTag && o[Symbol.toStringTag] || o.constructor.name || "Object";
        return g.call(
          m,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          M
        ), t(o);
      }
    }
    function i() {
    }
    function u() {
      if ($ === 0) {
        K = console.log, P = console.info, ue = console.warn, Z = console.error, Oe = console.group, Le = console.groupCollapsed, Me = console.groupEnd;
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
          warn: d({}, o, { value: ue }),
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
    function v(o) {
      if (_ === void 0)
        try {
          throw Error();
        } catch (g) {
          var m = g.stack.trim().match(/\n( *(at )?)/);
          _ = m && m[1] || "", _e = -1 < g.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < g.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + _ + o + _e;
    }
    function h(o, m) {
      if (!o || pe) return "";
      var g = Ae.get(o);
      if (g !== void 0) return g;
      pe = !0, g = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var M = null;
      M = z.H, z.H = null, u();
      try {
        var te = {
          DetermineComponentFrameRoot: function() {
            try {
              if (m) {
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
        var N = te.DetermineComponentFrameRoot(), A = N[0], we = N[1];
        if (A && we) {
          var ae = A.split(`
`), me = we.split(`
`);
          for (N = J = 0; J < ae.length && !ae[J].includes(
            "DetermineComponentFrameRoot"
          ); )
            J++;
          for (; N < me.length && !me[N].includes(
            "DetermineComponentFrameRoot"
          ); )
            N++;
          if (J === ae.length || N === me.length)
            for (J = ae.length - 1, N = me.length - 1; 1 <= J && 0 <= N && ae[J] !== me[N]; )
              N--;
          for (; 1 <= J && 0 <= N; J--, N--)
            if (ae[J] !== me[N]) {
              if (J !== 1 || N !== 1)
                do
                  if (J--, N--, 0 > N || ae[J] !== me[N]) {
                    var Ue = `
` + ae[J].replace(
                      " at new ",
                      " at "
                    );
                    return o.displayName && Ue.includes("<anonymous>") && (Ue = Ue.replace("<anonymous>", o.displayName)), typeof o == "function" && Ae.set(o, Ue), Ue;
                  }
                while (1 <= J && 0 <= N);
              break;
            }
        }
      } finally {
        pe = !1, z.H = M, c(), Error.prepareStackTrace = g;
      }
      return ae = (ae = o ? o.displayName || o.name : "") ? v(ae) : "", typeof o == "function" && Ae.set(o, ae), ae;
    }
    function S(o) {
      if (o == null) return "";
      if (typeof o == "function") {
        var m = o.prototype;
        return h(
          o,
          !(!m || !m.isReactComponent)
        );
      }
      if (typeof o == "string") return v(o);
      switch (o) {
        case ge:
          return v("Suspense");
        case ye:
          return v("SuspenseList");
      }
      if (typeof o == "object")
        switch (o.$$typeof) {
          case Ce:
            return o = h(o.render, !1), o;
          case Re:
            return S(o.type);
          case le:
            m = o._payload, o = o._init;
            try {
              return S(o(m));
            } catch {
            }
        }
      return "";
    }
    function E() {
      var o = z.A;
      return o === null ? null : o.getOwner();
    }
    function y(o) {
      if (s.call(o, "key")) {
        var m = Object.getOwnPropertyDescriptor(o, "key").get;
        if (m && m.isReactWarning) return !1;
      }
      return o.key !== void 0;
    }
    function C(o, m) {
      function g() {
        Ie || (Ie = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          m
        ));
      }
      g.isReactWarning = !0, Object.defineProperty(o, "key", {
        get: g,
        configurable: !0
      });
    }
    function ee() {
      var o = e(this.type);
      return nr[o] || (nr[o] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), o = this.props.ref, o !== void 0 ? o : null;
    }
    function F(o, m, g, M, te, J) {
      return g = J.ref, o = {
        $$typeof: q,
        type: o,
        key: m,
        props: J,
        _owner: te
      }, (g !== void 0 ? g : null) !== null ? Object.defineProperty(o, "ref", {
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
    function j(o, m, g, M, te, J) {
      if (typeof o == "string" || typeof o == "function" || o === W || o === Te || o === I || o === ge || o === ye || o === fe || typeof o == "object" && o !== null && (o.$$typeof === le || o.$$typeof === Re || o.$$typeof === ke || o.$$typeof === ie || o.$$typeof === Ce || o.$$typeof === O || o.getModuleId !== void 0)) {
        var N = m.children;
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
        N = "", (o === void 0 || typeof o == "object" && o !== null && Object.keys(o).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), o === null ? M = "null" : R(o) ? M = "array" : o !== void 0 && o.$$typeof === q ? (M = "<" + (e(o.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : M = typeof o, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          M,
          N
        );
      if (s.call(m, "key")) {
        N = e(o);
        var A = Object.keys(m).filter(function(ae) {
          return ae !== "key";
        });
        M = 0 < A.length ? "{key: someKey, " + A.join(": ..., ") + ": ...}" : "{key: someKey}", Be[N + M] || (A = 0 < A.length ? "{" + A.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          M,
          N,
          A,
          N
        ), Be[N + M] = !0);
      }
      if (N = null, g !== void 0 && (n(g), N = "" + g), y(m) && (n(m.key), N = "" + m.key), "key" in m) {
        g = {};
        for (var we in m)
          we !== "key" && (g[we] = m[we]);
      } else g = m;
      return N && C(
        g,
        typeof o == "function" ? o.displayName || o.name || "Unknown" : o
      ), F(o, N, J, te, E(), g);
    }
    function x(o, m) {
      if (typeof o == "object" && o && o.$$typeof !== He) {
        if (R(o))
          for (var g = 0; g < o.length; g++) {
            var M = o[g];
            U(M) && Y(M, m);
          }
        else if (U(o))
          o._store && (o._store.validated = 1);
        else if (o === null || typeof o != "object" ? g = null : (g = be && o[be] || o["@@iterator"], g = typeof g == "function" ? g : null), typeof g == "function" && g !== o.entries && (g = g.call(o), g !== o))
          for (; !(o = g.next()).done; )
            U(o.value) && Y(o.value, m);
      }
    }
    function U(o) {
      return typeof o == "object" && o !== null && o.$$typeof === q;
    }
    function Y(o, m) {
      if (o._store && !o._store.validated && o.key == null && (o._store.validated = 1, m = H(m), !Fe[m])) {
        Fe[m] = !0;
        var g = "";
        o && o._owner != null && o._owner !== E() && (g = null, typeof o._owner.tag == "number" ? g = e(o._owner.type) : typeof o._owner.name == "string" && (g = o._owner.name), g = " It was passed a child from " + g + ".");
        var M = z.getCurrentStack;
        z.getCurrentStack = function() {
          var te = S(o.type);
          return M && (te += M() || ""), te;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          m,
          g
        ), z.getCurrentStack = M;
      }
    }
    function H(o) {
      var m = "", g = E();
      return g && (g = e(g.type)) && (m = `

Check the render method of \`` + g + "`."), m || (o = e(o)) && (m = `

Check the top-level render call using <` + o + ">."), m;
    }
    var L = Et(), q = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), Te = Symbol.for("react.profiler"), ie = Symbol.for("react.consumer"), ke = Symbol.for("react.context"), Ce = Symbol.for("react.forward_ref"), ge = Symbol.for("react.suspense"), ye = Symbol.for("react.suspense_list"), Re = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), be = Symbol.iterator, je = Symbol.for("react.client.reference"), z = L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, s = Object.prototype.hasOwnProperty, d = Object.assign, O = Symbol.for("react.client.reference"), R = Array.isArray, $ = 0, K, P, ue, Z, Oe, Le, Me;
    i.__reactDisabledLog = !0;
    var _, _e, pe = !1, Ae = new (typeof WeakMap == "function" ? WeakMap : Map)(), He = Symbol.for("react.client.reference"), Ie, nr = {}, Be = {}, Fe = {};
    Ve.Fragment = W, Ve.jsx = function(o, m, g, M, te) {
      return j(o, m, g, !1, M, te);
    }, Ve.jsxs = function(o, m, g, M, te) {
      return j(o, m, g, !0, M, te);
    };
  }()), Ve;
}
var rt;
function Ht() {
  return rt || (rt = 1, process.env.NODE_ENV === "production" ? ur.exports = Yt() : ur.exports = Ut()), ur.exports;
}
var Ze = Ht(), oe = Et();
const Ar = /* @__PURE__ */ jt(oe), tt = /* @__PURE__ */ Mt({
  __proto__: null,
  default: Ar
}, [oe]);
var Wt = !1;
function qt(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function zt(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var Dt = /* @__PURE__ */ function() {
  function e(n) {
    var i = this;
    this._insertTag = function(u) {
      var c;
      i.tags.length === 0 ? i.insertionPoint ? c = i.insertionPoint.nextSibling : i.prepend ? c = i.container.firstChild : c = i.before : c = i.tags[i.tags.length - 1].nextSibling, i.container.insertBefore(u, c), i.tags.push(u);
    }, this.isSpeedy = n.speedy === void 0 ? !Wt : n.speedy, this.tags = [], this.ctr = 0, this.nonce = n.nonce, this.key = n.key, this.container = n.container, this.prepend = n.prepend, this.insertionPoint = n.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(i) {
    i.forEach(this._insertTag);
  }, t.insert = function(i) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(zt(this));
    var u = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var c = qt(u);
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
  }, e;
}(), ce = "-ms-", hr = "-moz-", G = "-webkit-", gt = "comm", jr = "rule", Mr = "decl", Gt = "@import", bt = "@keyframes", Bt = "@layer", Ft = Math.abs, yr = String.fromCharCode, Kt = Object.assign;
function Vt(e, t) {
  return se(e, 0) ^ 45 ? (((t << 2 ^ se(e, 0)) << 2 ^ se(e, 1)) << 2 ^ se(e, 2)) << 2 ^ se(e, 3) : 0;
}
function _t(e) {
  return e.trim();
}
function Xt(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function B(e, t, n) {
  return e.replace(t, n);
}
function Pr(e, t) {
  return e.indexOf(t);
}
function se(e, t) {
  return e.charCodeAt(t) | 0;
}
function Je(e, t, n) {
  return e.slice(t, n);
}
function xe(e) {
  return e.length;
}
function Yr(e) {
  return e.length;
}
function fr(e, t) {
  return t.push(e), e;
}
function Qt(e, t) {
  return e.map(t).join("");
}
var Er = 1, De = 1, wt = 0, ve = 0, ne = 0, Ge = "";
function gr(e, t, n, i, u, c, v) {
  return { value: e, root: t, parent: n, type: i, props: u, children: c, line: Er, column: De, length: v, return: "" };
}
function Xe(e, t) {
  return Kt(gr("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Zt() {
  return ne;
}
function Jt() {
  return ne = ve > 0 ? se(Ge, --ve) : 0, De--, ne === 10 && (De = 1, Er--), ne;
}
function he() {
  return ne = ve < wt ? se(Ge, ve++) : 0, De++, ne === 10 && (De = 1, Er++), ne;
}
function Ne() {
  return se(Ge, ve);
}
function dr() {
  return ve;
}
function tr(e, t) {
  return Je(Ge, e, t);
}
function er(e) {
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
function St(e) {
  return Er = De = 1, wt = xe(Ge = e), ve = 0, [];
}
function Tt(e) {
  return Ge = "", e;
}
function vr(e) {
  return _t(tr(ve - 1, xr(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function en(e) {
  for (; (ne = Ne()) && ne < 33; )
    he();
  return er(e) > 2 || er(ne) > 3 ? "" : " ";
}
function rn(e, t) {
  for (; --t && he() && !(ne < 48 || ne > 102 || ne > 57 && ne < 65 || ne > 70 && ne < 97); )
    ;
  return tr(e, dr() + (t < 6 && Ne() == 32 && he() == 32));
}
function xr(e) {
  for (; he(); )
    switch (ne) {
      // ] ) " '
      case e:
        return ve;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && xr(ne);
        break;
      // (
      case 40:
        e === 41 && xr(e);
        break;
      // \
      case 92:
        he();
        break;
    }
  return ve;
}
function tn(e, t) {
  for (; he() && e + ne !== 57; )
    if (e + ne === 84 && Ne() === 47)
      break;
  return "/*" + tr(t, ve - 1) + "*" + yr(e === 47 ? e : he());
}
function nn(e) {
  for (; !er(Ne()); )
    he();
  return tr(e, ve);
}
function on(e) {
  return Tt(pr("", null, null, null, [""], e = St(e), 0, [0], e));
}
function pr(e, t, n, i, u, c, v, h, S) {
  for (var E = 0, y = 0, C = v, ee = 0, F = 0, j = 0, x = 1, U = 1, Y = 1, H = 0, L = "", q = u, l = c, W = i, I = L; U; )
    switch (j = H, H = he()) {
      // (
      case 40:
        if (j != 108 && se(I, C - 1) == 58) {
          Pr(I += B(vr(H), "&", "&\f"), "&\f") != -1 && (Y = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        I += vr(H);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        I += en(j);
        break;
      // \
      case 92:
        I += rn(dr() - 1, 7);
        continue;
      // /
      case 47:
        switch (Ne()) {
          case 42:
          case 47:
            fr(an(tn(he(), dr()), t, n), S);
            break;
          default:
            I += "/";
        }
        break;
      // {
      case 123 * x:
        h[E++] = xe(I) * Y;
      // } ; \0
      case 125 * x:
      case 59:
      case 0:
        switch (H) {
          // \0 }
          case 0:
          case 125:
            U = 0;
          // ;
          case 59 + y:
            Y == -1 && (I = B(I, /\f/g, "")), F > 0 && xe(I) - C && fr(F > 32 ? ot(I + ";", i, n, C - 1) : ot(B(I, " ", "") + ";", i, n, C - 2), S);
            break;
          // @ ;
          case 59:
            I += ";";
          // { rule/at-rule
          default:
            if (fr(W = nt(I, t, n, E, y, u, h, L, q = [], l = [], C), c), H === 123)
              if (y === 0)
                pr(I, t, W, W, q, c, C, h, l);
              else
                switch (ee === 99 && se(I, 3) === 110 ? 100 : ee) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    pr(e, W, W, i && fr(nt(e, W, W, 0, 0, u, h, L, u, q = [], C), l), u, l, C, h, i ? q : l);
                    break;
                  default:
                    pr(I, W, W, W, [""], l, 0, h, l);
                }
        }
        E = y = F = 0, x = Y = 1, L = I = "", C = v;
        break;
      // :
      case 58:
        C = 1 + xe(I), F = j;
      default:
        if (x < 1) {
          if (H == 123)
            --x;
          else if (H == 125 && x++ == 0 && Jt() == 125)
            continue;
        }
        switch (I += yr(H), H * x) {
          // &
          case 38:
            Y = y > 0 ? 1 : (I += "\f", -1);
            break;
          // ,
          case 44:
            h[E++] = (xe(I) - 1) * Y, Y = 1;
            break;
          // @
          case 64:
            Ne() === 45 && (I += vr(he())), ee = Ne(), y = C = xe(L = I += nn(dr())), H++;
            break;
          // -
          case 45:
            j === 45 && xe(I) == 2 && (x = 0);
        }
    }
  return c;
}
function nt(e, t, n, i, u, c, v, h, S, E, y) {
  for (var C = u - 1, ee = u === 0 ? c : [""], F = Yr(ee), j = 0, x = 0, U = 0; j < i; ++j)
    for (var Y = 0, H = Je(e, C + 1, C = Ft(x = v[j])), L = e; Y < F; ++Y)
      (L = _t(x > 0 ? ee[Y] + " " + H : B(H, /&\f/g, ee[Y]))) && (S[U++] = L);
  return gr(e, t, n, u === 0 ? jr : h, S, E, y);
}
function an(e, t, n) {
  return gr(e, t, n, gt, yr(Zt()), Je(e, 2, -2), 0);
}
function ot(e, t, n, i) {
  return gr(e, t, n, Mr, Je(e, 0, i), Je(e, i + 1, -1), i);
}
function ze(e, t) {
  for (var n = "", i = Yr(e), u = 0; u < i; u++)
    n += t(e[u], u, e, t) || "";
  return n;
}
function sn(e, t, n, i) {
  switch (e.type) {
    case Bt:
      if (e.children.length) break;
    case Gt:
    case Mr:
      return e.return = e.return || e.value;
    case gt:
      return "";
    case bt:
      return e.return = e.value + "{" + ze(e.children, i) + "}";
    case jr:
      e.value = e.props.join(",");
  }
  return xe(n = ze(e.children, i)) ? e.return = e.value + "{" + n + "}" : "";
}
function un(e) {
  var t = Yr(e);
  return function(n, i, u, c) {
    for (var v = "", h = 0; h < t; h++)
      v += e[h](n, i, u, c) || "";
    return v;
  };
}
function cn(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function fn(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var ln = function(t, n, i) {
  for (var u = 0, c = 0; u = c, c = Ne(), u === 38 && c === 12 && (n[i] = 1), !er(c); )
    he();
  return tr(t, ve);
}, dn = function(t, n) {
  var i = -1, u = 44;
  do
    switch (er(u)) {
      case 0:
        u === 38 && Ne() === 12 && (n[i] = 1), t[i] += ln(ve - 1, n, i);
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
}, vn = function(t, n) {
  return Tt(dn(St(t), n));
}, at = /* @__PURE__ */ new WeakMap(), pn = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var n = t.value, i = t.parent, u = t.column === i.column && t.line === i.line; i.type !== "rule"; )
      if (i = i.parent, !i) return;
    if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !at.get(i)) && !u) {
      at.set(t, !0);
      for (var c = [], v = vn(n, c), h = i.props, S = 0, E = 0; S < v.length; S++)
        for (var y = 0; y < h.length; y++, E++)
          t.props[E] = c[S] ? v[S].replace(/&\f/g, h[y]) : h[y] + " " + v[S];
    }
  }
}, mn = function(t) {
  if (t.type === "decl") {
    var n = t.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function Ct(e, t) {
  switch (Vt(e, t)) {
    // color-adjust
    case 5103:
      return G + "print-" + e + e;
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
      return G + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return G + e + hr + e + ce + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return G + e + ce + e + e;
    // order
    case 6165:
      return G + e + ce + "flex-" + e + e;
    // align-items
    case 5187:
      return G + e + B(e, /(\w+).+(:[^]+)/, G + "box-$1$2" + ce + "flex-$1$2") + e;
    // align-self
    case 5443:
      return G + e + ce + "flex-item-" + B(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return G + e + ce + "flex-line-pack" + B(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return G + e + ce + B(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return G + e + ce + B(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return G + "box-" + B(e, "-grow", "") + G + e + ce + B(e, "grow", "positive") + e;
    // transition
    case 4554:
      return G + B(e, /([^-])(transform)/g, "$1" + G + "$2") + e;
    // cursor
    case 6187:
      return B(B(B(e, /(zoom-|grab)/, G + "$1"), /(image-set)/, G + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return B(e, /(image-set\([^]*)/, G + "$1$`$1");
    // justify-content
    case 4968:
      return B(B(e, /(.+:)(flex-)?(.*)/, G + "box-pack:$3" + ce + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + G + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return B(e, /(.+)-inline(.+)/, G + "$1$2") + e;
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
      if (xe(e) - 1 - t > 6) switch (se(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (se(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return B(e, /(.+:)(.+)-([^]+)/, "$1" + G + "$2-$3$1" + hr + (se(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~Pr(e, "stretch") ? Ct(B(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (se(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (se(e, xe(e) - 3 - (~Pr(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return B(e, ":", ":" + G) + e;
        // (inline-)?fl(e)x
        case 101:
          return B(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + G + (se(e, 14) === 45 ? "inline-" : "") + "box$3$1" + G + "$2$3$1" + ce + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (se(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return G + e + ce + B(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return G + e + ce + B(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return G + e + ce + B(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return G + e + ce + e + e;
  }
  return e;
}
var hn = function(t, n, i, u) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Mr:
      t.return = Ct(t.value, t.length);
      break;
    case bt:
      return ze([Xe(t, {
        value: B(t.value, "@", "@" + G)
      })], u);
    case jr:
      if (t.length) return Qt(t.props, function(c) {
        switch (Xt(c, /(::plac\w+|:read-\w+)/)) {
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
              props: [B(c, /:(plac\w+)/, ce + "input-$1")]
            })], u);
        }
        return "";
      });
  }
}, yn = [hn], En = function(t) {
  var n = t.key;
  if (n === "css") {
    var i = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(i, function(x) {
      var U = x.getAttribute("data-emotion");
      U.indexOf(" ") !== -1 && (document.head.appendChild(x), x.setAttribute("data-s", ""));
    });
  }
  var u = t.stylisPlugins || yn, c = {}, v, h = [];
  v = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(x) {
      for (var U = x.getAttribute("data-emotion").split(" "), Y = 1; Y < U.length; Y++)
        c[U[Y]] = !0;
      h.push(x);
    }
  );
  var S, E = [pn, mn];
  {
    var y, C = [sn, cn(function(x) {
      y.insert(x);
    })], ee = un(E.concat(u, C)), F = function(U) {
      return ze(on(U), ee);
    };
    S = function(U, Y, H, L) {
      y = H, F(U ? U + "{" + Y.styles + "}" : Y.styles), L && (j.inserted[Y.name] = !0);
    };
  }
  var j = {
    key: n,
    sheet: new Dt({
      key: n,
      container: v,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: c,
    registered: {},
    insert: S
  };
  return j.sheet.hydrate(h), j;
}, lr = { exports: {} }, V = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var st;
function gn() {
  if (st) return V;
  st = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, i = e ? Symbol.for("react.fragment") : 60107, u = e ? Symbol.for("react.strict_mode") : 60108, c = e ? Symbol.for("react.profiler") : 60114, v = e ? Symbol.for("react.provider") : 60109, h = e ? Symbol.for("react.context") : 60110, S = e ? Symbol.for("react.async_mode") : 60111, E = e ? Symbol.for("react.concurrent_mode") : 60111, y = e ? Symbol.for("react.forward_ref") : 60112, C = e ? Symbol.for("react.suspense") : 60113, ee = e ? Symbol.for("react.suspense_list") : 60120, F = e ? Symbol.for("react.memo") : 60115, j = e ? Symbol.for("react.lazy") : 60116, x = e ? Symbol.for("react.block") : 60121, U = e ? Symbol.for("react.fundamental") : 60117, Y = e ? Symbol.for("react.responder") : 60118, H = e ? Symbol.for("react.scope") : 60119;
  function L(l) {
    if (typeof l == "object" && l !== null) {
      var W = l.$$typeof;
      switch (W) {
        case t:
          switch (l = l.type, l) {
            case S:
            case E:
            case i:
            case c:
            case u:
            case C:
              return l;
            default:
              switch (l = l && l.$$typeof, l) {
                case h:
                case y:
                case j:
                case F:
                case v:
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
    return L(l) === E;
  }
  return V.AsyncMode = S, V.ConcurrentMode = E, V.ContextConsumer = h, V.ContextProvider = v, V.Element = t, V.ForwardRef = y, V.Fragment = i, V.Lazy = j, V.Memo = F, V.Portal = n, V.Profiler = c, V.StrictMode = u, V.Suspense = C, V.isAsyncMode = function(l) {
    return q(l) || L(l) === S;
  }, V.isConcurrentMode = q, V.isContextConsumer = function(l) {
    return L(l) === h;
  }, V.isContextProvider = function(l) {
    return L(l) === v;
  }, V.isElement = function(l) {
    return typeof l == "object" && l !== null && l.$$typeof === t;
  }, V.isForwardRef = function(l) {
    return L(l) === y;
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
    return L(l) === C;
  }, V.isValidElementType = function(l) {
    return typeof l == "string" || typeof l == "function" || l === i || l === E || l === c || l === u || l === C || l === ee || typeof l == "object" && l !== null && (l.$$typeof === j || l.$$typeof === F || l.$$typeof === v || l.$$typeof === h || l.$$typeof === y || l.$$typeof === U || l.$$typeof === Y || l.$$typeof === H || l.$$typeof === x);
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
var it;
function bn() {
  return it || (it = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, i = e ? Symbol.for("react.fragment") : 60107, u = e ? Symbol.for("react.strict_mode") : 60108, c = e ? Symbol.for("react.profiler") : 60114, v = e ? Symbol.for("react.provider") : 60109, h = e ? Symbol.for("react.context") : 60110, S = e ? Symbol.for("react.async_mode") : 60111, E = e ? Symbol.for("react.concurrent_mode") : 60111, y = e ? Symbol.for("react.forward_ref") : 60112, C = e ? Symbol.for("react.suspense") : 60113, ee = e ? Symbol.for("react.suspense_list") : 60120, F = e ? Symbol.for("react.memo") : 60115, j = e ? Symbol.for("react.lazy") : 60116, x = e ? Symbol.for("react.block") : 60121, U = e ? Symbol.for("react.fundamental") : 60117, Y = e ? Symbol.for("react.responder") : 60118, H = e ? Symbol.for("react.scope") : 60119;
    function L(_) {
      return typeof _ == "string" || typeof _ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      _ === i || _ === E || _ === c || _ === u || _ === C || _ === ee || typeof _ == "object" && _ !== null && (_.$$typeof === j || _.$$typeof === F || _.$$typeof === v || _.$$typeof === h || _.$$typeof === y || _.$$typeof === U || _.$$typeof === Y || _.$$typeof === H || _.$$typeof === x);
    }
    function q(_) {
      if (typeof _ == "object" && _ !== null) {
        var _e = _.$$typeof;
        switch (_e) {
          case t:
            var pe = _.type;
            switch (pe) {
              case S:
              case E:
              case i:
              case c:
              case u:
              case C:
                return pe;
              default:
                var Ae = pe && pe.$$typeof;
                switch (Ae) {
                  case h:
                  case y:
                  case j:
                  case F:
                  case v:
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
    var l = S, W = E, I = h, Te = v, ie = t, ke = y, Ce = i, ge = j, ye = F, Re = n, le = c, fe = u, be = C, je = !1;
    function z(_) {
      return je || (je = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), s(_) || q(_) === S;
    }
    function s(_) {
      return q(_) === E;
    }
    function d(_) {
      return q(_) === h;
    }
    function O(_) {
      return q(_) === v;
    }
    function R(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === t;
    }
    function $(_) {
      return q(_) === y;
    }
    function K(_) {
      return q(_) === i;
    }
    function P(_) {
      return q(_) === j;
    }
    function ue(_) {
      return q(_) === F;
    }
    function Z(_) {
      return q(_) === n;
    }
    function Oe(_) {
      return q(_) === c;
    }
    function Le(_) {
      return q(_) === u;
    }
    function Me(_) {
      return q(_) === C;
    }
    X.AsyncMode = l, X.ConcurrentMode = W, X.ContextConsumer = I, X.ContextProvider = Te, X.Element = ie, X.ForwardRef = ke, X.Fragment = Ce, X.Lazy = ge, X.Memo = ye, X.Portal = Re, X.Profiler = le, X.StrictMode = fe, X.Suspense = be, X.isAsyncMode = z, X.isConcurrentMode = s, X.isContextConsumer = d, X.isContextProvider = O, X.isElement = R, X.isForwardRef = $, X.isFragment = K, X.isLazy = P, X.isMemo = ue, X.isPortal = Z, X.isProfiler = Oe, X.isStrictMode = Le, X.isSuspense = Me, X.isValidElementType = L, X.typeOf = q;
  }()), X;
}
var ut;
function _n() {
  return ut || (ut = 1, process.env.NODE_ENV === "production" ? lr.exports = gn() : lr.exports = bn()), lr.exports;
}
var Cr, ct;
function wn() {
  if (ct) return Cr;
  ct = 1;
  var e = _n(), t = {
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
  c[e.ForwardRef] = i, c[e.Memo] = u;
  function v(j) {
    return e.isMemo(j) ? u : c[j.$$typeof] || t;
  }
  var h = Object.defineProperty, S = Object.getOwnPropertyNames, E = Object.getOwnPropertySymbols, y = Object.getOwnPropertyDescriptor, C = Object.getPrototypeOf, ee = Object.prototype;
  function F(j, x, U) {
    if (typeof x != "string") {
      if (ee) {
        var Y = C(x);
        Y && Y !== ee && F(j, Y, U);
      }
      var H = S(x);
      E && (H = H.concat(E(x)));
      for (var L = v(j), q = v(x), l = 0; l < H.length; ++l) {
        var W = H[l];
        if (!n[W] && !(U && U[W]) && !(q && q[W]) && !(L && L[W])) {
          var I = y(x, W);
          try {
            h(j, W, I);
          } catch {
          }
        }
      }
    }
    return j;
  }
  return Cr = F, Cr;
}
wn();
var Sn = !0;
function Tn(e, t, n) {
  var i = "";
  return n.split(" ").forEach(function(u) {
    e[u] !== void 0 ? t.push(e[u] + ";") : u && (i += u + " ");
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
  Sn === !1) && t.registered[u] === void 0 && (t.registered[u] = n.styles);
}, Cn = function(t, n, i) {
  Rt(t, n, i);
  var u = t.key + "-" + n.name;
  if (t.inserted[n.name] === void 0) {
    var c = n;
    do
      t.insert(n === c ? "." + u : "", c, t.sheet, !0), c = c.next;
    while (c !== void 0);
  }
};
function Rn(e) {
  for (var t = 0, n, i = 0, u = e.length; u >= 4; ++i, u -= 4)
    n = e.charCodeAt(i) & 255 | (e.charCodeAt(++i) & 255) << 8 | (e.charCodeAt(++i) & 255) << 16 | (e.charCodeAt(++i) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (u) {
    case 3:
      t ^= (e.charCodeAt(i + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(i + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(i) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var On = {
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
}, An = !1, Pn = /[A-Z]|^ms/g, xn = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Ot = function(t) {
  return t.charCodeAt(1) === 45;
}, ft = function(t) {
  return t != null && typeof t != "boolean";
}, Rr = /* @__PURE__ */ fn(function(e) {
  return Ot(e) ? e : e.replace(Pn, "-$&").toLowerCase();
}), lt = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(xn, function(i, u, c) {
          return $e = {
            name: u,
            styles: c,
            next: $e
          }, u;
        });
  }
  return On[t] !== 1 && !Ot(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
}, $n = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function rr(e, t, n) {
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
        var v = c.next;
        if (v !== void 0)
          for (; v !== void 0; )
            $e = {
              name: v.name,
              styles: v.styles,
              next: $e
            }, v = v.next;
        var h = c.styles + ";";
        return h;
      }
      return Nn(e, t, n);
    }
    case "function": {
      if (e !== void 0) {
        var S = $e, E = n(e);
        return $e = S, rr(e, t, E);
      }
      break;
    }
  }
  var y = n;
  return y;
}
function Nn(e, t, n) {
  var i = "";
  if (Array.isArray(n))
    for (var u = 0; u < n.length; u++)
      i += rr(e, t, n[u]) + ";";
  else
    for (var c in n) {
      var v = n[c];
      if (typeof v != "object") {
        var h = v;
        ft(h) && (i += Rr(c) + ":" + lt(c, h) + ";");
      } else {
        if (c === "NO_COMPONENT_SELECTOR" && An)
          throw new Error($n);
        if (Array.isArray(v) && typeof v[0] == "string" && t == null)
          for (var S = 0; S < v.length; S++)
            ft(v[S]) && (i += Rr(c) + ":" + lt(c, v[S]) + ";");
        else {
          var E = rr(e, t, v);
          switch (c) {
            case "animation":
            case "animationName": {
              i += Rr(c) + ":" + E + ";";
              break;
            }
            default:
              i += c + "{" + E + "}";
          }
        }
      }
    }
  return i;
}
var dt = /label:\s*([^\s;{]+)\s*(;|$)/g, $e;
function kn(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var i = !0, u = "";
  $e = void 0;
  var c = e[0];
  if (c == null || c.raw === void 0)
    i = !1, u += rr(n, t, c);
  else {
    var v = c;
    u += v[0];
  }
  for (var h = 1; h < e.length; h++)
    if (u += rr(n, t, e[h]), i) {
      var S = c;
      u += S[h];
    }
  dt.lastIndex = 0;
  for (var E = "", y; (y = dt.exec(u)) !== null; )
    E += "-" + y[1];
  var C = Rn(u) + E;
  return {
    name: C,
    styles: u,
    next: $e
  };
}
var jn = function(t) {
  return t();
}, Mn = tt.useInsertionEffect ? tt.useInsertionEffect : !1, Yn = Mn || jn, Ln = !1, At = /* @__PURE__ */ oe.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ En({
    key: "css"
  }) : null
);
At.Provider;
var In = function(t) {
  return /* @__PURE__ */ oe.forwardRef(function(n, i) {
    var u = oe.useContext(At);
    return t(n, u, i);
  });
}, Un = /* @__PURE__ */ oe.createContext({}), br = {}.hasOwnProperty, $r = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Pt = function(t, n) {
  var i = {};
  for (var u in n)
    br.call(n, u) && (i[u] = n[u]);
  return i[$r] = t, i;
}, Hn = function(t) {
  var n = t.cache, i = t.serialized, u = t.isStringTag;
  return Rt(n, i, u), Yn(function() {
    return Cn(n, i, u);
  }), null;
}, Wn = /* @__PURE__ */ In(function(e, t, n) {
  var i = e.css;
  typeof i == "string" && t.registered[i] !== void 0 && (i = t.registered[i]);
  var u = e[$r], c = [i], v = "";
  typeof e.className == "string" ? v = Tn(t.registered, c, e.className) : e.className != null && (v = e.className + " ");
  var h = kn(c, void 0, oe.useContext(Un));
  v += t.key + "-" + h.name;
  var S = {};
  for (var E in e)
    br.call(e, E) && E !== "css" && E !== $r && !Ln && (S[E] = e[E]);
  return S.className = v, n && (S.ref = n), /* @__PURE__ */ oe.createElement(oe.Fragment, null, /* @__PURE__ */ oe.createElement(Hn, {
    cache: t,
    serialized: h,
    isStringTag: typeof u == "string"
  }), /* @__PURE__ */ oe.createElement(u, S));
}), xt = Wn, qn = Ze.Fragment, mr = function(t, n, i) {
  return br.call(n, "css") ? Ze.jsx(xt, Pt(t, n), i) : Ze.jsx(t, n, i);
}, mo = function(t, n, i) {
  return br.call(n, "css") ? Ze.jsxs(xt, Pt(t, n), i) : Ze.jsxs(t, n, i);
};
const vt = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), i = (E, y) => {
    const C = typeof E == "function" ? E(t) : E;
    if (!Object.is(C, t)) {
      const ee = t;
      t = y ?? (typeof C != "object" || C === null) ? C : Object.assign({}, t, C), n.forEach((F) => F(t, ee));
    }
  }, u = () => t, h = { setState: i, getState: u, getInitialState: () => S, subscribe: (E) => (n.add(E), () => n.delete(E)) }, S = t = e(i, u, h);
  return h;
}, zn = (e) => e ? vt(e) : vt, Dn = (e) => e;
function Gn(e, t = Dn) {
  const n = Ar.useSyncExternalStore(
    e.subscribe,
    () => t(e.getState()),
    () => t(e.getInitialState())
  );
  return Ar.useDebugValue(n), n;
}
const Bn = (e) => {
  const t = zn(e), n = (i) => Gn(t, i);
  return Object.assign(n, t), n;
}, Fn = (e) => Bn, Or = Fn()((e) => ({
  // わざとカーリー化
  txt: "",
  addTxt: (t) => e((n) => ({ txt: n.txt + t })),
  clearTxt: () => e(() => ({ txt: "" })),
  aLay: [],
  replace: (t) => e((n) => ({ aLay: JSON.parse(t) })),
  addLayer: (t) => e((n) => ({ aLay: [...n.aLay, t] })),
  chgPic: ({ nm: t, fn: n }) => e((i) => {
    const u = [...i.aLay], c = u.find((v) => v.nm === t);
    if (!c) throw `存在しないレイヤ ${t} です`;
    if (c.cls !== "GRP") throw `${t} は画像レイヤではありません`;
    return c.fn = n, { aLay: u };
  }),
  chgStr: ({ nm: t, str: n }) => e((i) => {
    const u = [...i.aLay], c = u.find((v) => v.nm === t);
    if (!c) throw `存在しないレイヤ ${t} です`;
    if (c.cls !== "TXT") throw `${t} は文字レイヤではありません`;
    return c.str = n, { aLay: u };
  })
}));
var Kn = function() {
};
function Vn(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  e && e.addEventListener && e.addEventListener.apply(e, t);
}
function Xn(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var Qn = typeof window < "u", Zn = function(e) {
  oe.useEffect(e, []);
}, Jn = Qn ? window : null, pt = function(e) {
  return !!e.addEventListener;
}, mt = function(e) {
  return !!e.on;
}, eo = function(e, t, n, i) {
  n === void 0 && (n = Jn), oe.useEffect(function() {
    if (t && n)
      return pt(n) ? Vn(n, e, t, i) : mt(n) && n.on(e, t, i), function() {
        pt(n) ? Xn(n, e, t, i) : mt(n) && n.off(e, t, i);
      };
  }, [e, t, n, JSON.stringify(i)]);
}, ro = function(e) {
  return typeof e == "function" ? e : typeof e == "string" ? function(t) {
    return t.key === e;
  } : e ? function() {
    return !0;
  } : function() {
    return !1;
  };
}, ht = function(e, t, n, i) {
  t === void 0 && (t = Kn), n === void 0 && (n = {}), i === void 0 && (i = [e]);
  var u = n.event, c = u === void 0 ? "keydown" : u, v = n.target, h = n.options, S = oe.useMemo(function() {
    var E = ro(e), y = function(C) {
      if (E(C))
        return t(C);
    };
    return y;
  }, i);
  eo(c, S, v, h);
}, to = {
  restoreOnUnmount: !1
};
function no(e, t) {
  t === void 0 && (t = to);
  var n = oe.useRef(document.title);
  document.title !== e && (document.title = e), oe.useEffect(function() {
    if (t && t.restoreOnUnmount)
      return function() {
        document.title = n.current;
      };
  }, []);
}
const oo = typeof document < "u" ? no : function(e) {
};
var $t = /* @__PURE__ */ ((e) => (e.Renderer = "renderer", e.Application = "application", e.RendererSystem = "renderer-webgl-system", e.RendererPlugin = "renderer-webgl-plugin", e.CanvasRendererSystem = "renderer-canvas-system", e.CanvasRendererPlugin = "renderer-canvas-plugin", e.Asset = "asset", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser", e))($t || {});
const Nr = (e) => {
  if (typeof e == "function" || typeof e == "object" && e.extension) {
    if (!e.extension)
      throw new Error("Extension class must have an extension object");
    e = { ...typeof e.extension != "object" ? { type: e.extension } : e.extension, ref: e };
  }
  if (typeof e == "object")
    e = { ...e };
  else
    throw new Error("Invalid extension type");
  return typeof e.type == "string" && (e.type = [e.type]), e;
}, yt = (e, t) => Nr(e).priority ?? t, ao = {
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
  remove(...e) {
    return e.map(Nr).forEach((t) => {
      t.type.forEach((n) => this._removeHandlers[n]?.(t));
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...e) {
    return e.map(Nr).forEach((t) => {
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
  handle(e, t, n) {
    const i = this._addHandlers, u = this._removeHandlers;
    if (i[e] || u[e])
      throw new Error(`Extension type ${e} already has a handler`);
    i[e] = t, u[e] = n;
    const c = this._queue;
    return c[e] && (c[e]?.forEach((v) => t(v)), delete c[e]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap(e, t) {
    return this.handle(
      e,
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
  handleByList(e, t, n = -1) {
    return this.handle(
      e,
      (i) => {
        t.includes(i.ref) || (t.push(i.ref), t.sort((u, c) => yt(c, n) - yt(u, n)));
      },
      (i) => {
        const u = t.indexOf(i.ref);
        u !== -1 && t.splice(u, 1);
      }
    );
  }
};
async function so({ heStage: e, sys: t }) {
  console.log("fn:Main.tsx line:23 ");
  const { createRoot: n } = await import("./client.js").then((i) => i.c);
  n(e).render(/* @__PURE__ */ mr(io, { heStage: e, sys: t })), await Promise.all([
    import("./index.js"),
    import("./ScriptMng.js")
  ]).then(async ([{ Assets: i }, { ScriptMng: u }]) => {
    await i.init({ basePath: location.origin }), ao.add({
      extension: {
        type: $t.LoadParser,
        name: "sn-loader"
        //priority: LoaderParserPriority.High,
      },
      test: (v) => v.endsWith(".sn"),
      load: (v) => new Promise(async (h, S) => {
        const E = await fetch(v);
        if (!E.ok) {
          S("sn-loader fetch err:" + E.statusText);
          return;
        }
        try {
          h(await t.dec("sn", await E.text()));
        } catch (y) {
          S(`sn-loader err url:${v} ${y}`);
        }
      })
    }), await new u(t, i).load("main");
  });
}
function io({ heStage: e, sys: t }) {
  oo(t.cfg.oCfg.book.title);
  const n = Or((y) => y.addLayer), i = Or((y) => y.chgPic), u = Or((y) => y.chgStr);
  function c() {
    for (console.log("fn:Main.tsx == next =="); ; ) {
      const { done: y, value: C } = co.next();
      if (y) break;
      t.caretaker.key = "main:" + ++uo, "cls" in C ? n(C) : "fn" in C ? i(C) : u(C);
      break;
    }
  }
  Zn(() => c());
  function v() {
    t.caretaker.afterKey() || c();
  }
  ht("ArrowDown", (y) => {
    y.stopPropagation(), y.preventDefault(), v();
  });
  function h() {
    t.caretaker.beforeKey();
  }
  ht("ArrowUp", (y) => {
    y.stopPropagation(), y.preventDefault(), h();
  });
  function S() {
    if (kr) {
      kr = !1;
      return;
    }
    Nt || v();
  }
  const E = oe.lazy(() => import("./Stage.js"));
  return /* @__PURE__ */ mr(oe.Suspense, { fallback: /* @__PURE__ */ mr(qn, { children: "Loading" }), children: /* @__PURE__ */ mr(
    E,
    {
      arg: { heStage: e, sys: t },
      onClick: S,
      after: v,
      before: h
    }
  ) });
}
let uo = 0;
const co = fo();
function* fo() {
  yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "TXT", nm: "mes", str: "あいうえお" }, yield { nm: "mes", str: "かきくけこ" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
}
let Nt = !1;
const lo = (e) => Nt = e;
let kr = !1;
function vo() {
  kr = !0;
}
const ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  onLong: vo,
  opening: so,
  setDesignMode: lo
}, Symbol.toStringTag, { value: "Module" }));
export {
  $t as E,
  qn as F,
  ho as M,
  oe as a,
  Xn as b,
  mr as c,
  xt as d,
  ao as e,
  Pt as f,
  Or as g,
  br as h,
  Qn as i,
  mo as j,
  vo as k,
  lo as l,
  Kn as n,
  Vn as o,
  Et as r,
  kn as s,
  Zn as u
};
//# sourceMappingURL=Main.js.map
