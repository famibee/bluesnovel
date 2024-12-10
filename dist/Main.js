import { g as qt, S as Dt, C as me, u as et, B as Gt } from "./web2.js";
function Bt(e, t) {
  for (var n = 0; n < t.length; n++) {
    const a = t[n];
    if (typeof a != "string" && !Array.isArray(a)) {
      for (const u in a)
        if (u !== "default" && !(u in e)) {
          const c = Object.getOwnPropertyDescriptor(a, u);
          c && Object.defineProperty(e, u, c.get ? c : {
            enumerable: !0,
            get: () => a[u]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var lr = { exports: {} }, Xe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rt;
function Ft() {
  if (rt) return Xe;
  rt = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(a, u, c) {
    var v = null;
    if (c !== void 0 && (v = "" + c), u.key !== void 0 && (v = "" + u.key), "key" in u) {
      c = {};
      for (var h in u)
        h !== "key" && (c[h] = u[h]);
    } else c = u;
    return u = c.ref, {
      $$typeof: e,
      type: a,
      key: v,
      ref: u !== void 0 ? u : null,
      props: c
    };
  }
  return Xe.Fragment = t, Xe.jsx = n, Xe.jsxs = n, Xe;
}
var Qe = {}, dr = { exports: {} }, N = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tt;
function Kt() {
  if (tt) return N;
  tt = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), v = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), b = Symbol.iterator;
  function ee(i) {
    return i === null || typeof i != "object" ? null : (i = b && i[b] || i["@@iterator"], typeof i == "function" ? i : null);
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
  }, j = Object.assign, P = {};
  function H(i, d, O) {
    this.props = i, this.context = d, this.refs = P, this.updater = O || F;
  }
  H.prototype.isReactComponent = {}, H.prototype.setState = function(i, d) {
    if (typeof i != "object" && typeof i != "function" && i != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, i, d, "setState");
  }, H.prototype.forceUpdate = function(i) {
    this.updater.enqueueForceUpdate(this, i, "forceUpdate");
  };
  function L() {
  }
  L.prototype = H.prototype;
  function W(i, d, O) {
    this.props = i, this.context = d, this.refs = P, this.updater = O || F;
  }
  var Y = W.prototype = new L();
  Y.constructor = W, j(Y, H.prototype), Y.isPureReactComponent = !0;
  var z = Array.isArray, l = { H: null, A: null, T: null, S: null }, U = Object.prototype.hasOwnProperty;
  function I(i, d, O, T, $, K) {
    return O = K.ref, {
      $$typeof: e,
      type: i,
      key: d,
      ref: O !== void 0 ? O : null,
      props: K
    };
  }
  function Te(i, d) {
    return I(
      i.type,
      d,
      void 0,
      void 0,
      void 0,
      i.props
    );
  }
  function ie(i) {
    return typeof i == "object" && i !== null && i.$$typeof === e;
  }
  function Me(i) {
    var d = { "=": "=0", ":": "=2" };
    return "$" + i.replace(/[=:]/g, function(O) {
      return d[O];
    });
  }
  var Oe = /\/+/g;
  function _e(i, d) {
    return typeof i == "object" && i !== null && i.key != null ? Me("" + i.key) : d.toString(36);
  }
  function Ee() {
  }
  function Ae(i) {
    switch (i.status) {
      case "fulfilled":
        return i.value;
      case "rejected":
        throw i.reason;
      default:
        switch (typeof i.status == "string" ? i.then(Ee, Ee) : (i.status = "pending", i.then(
          function(d) {
            i.status === "pending" && (i.status = "fulfilled", i.value = d);
          },
          function(d) {
            i.status === "pending" && (i.status = "rejected", i.reason = d);
          }
        )), i.status) {
          case "fulfilled":
            return i.value;
          case "rejected":
            throw i.reason;
        }
    }
    throw i;
  }
  function le(i, d, O, T, $) {
    var K = typeof i;
    (K === "undefined" || K === "boolean") && (i = null);
    var x = !1;
    if (i === null) x = !0;
    else
      switch (K) {
        case "bigint":
        case "string":
        case "number":
          x = !0;
          break;
        case "object":
          switch (i.$$typeof) {
            case e:
            case t:
              x = !0;
              break;
            case C:
              return x = i._init, le(
                x(i._payload),
                d,
                O,
                T,
                $
              );
          }
      }
    if (x)
      return $ = $(i), x = T === "" ? "." + _e(i, 0) : T, z($) ? (O = "", x != null && (O = x.replace(Oe, "$&/") + "/"), le($, d, O, "", function(xe) {
        return xe;
      })) : $ != null && (ie($) && ($ = Te(
        $,
        O + ($.key == null || i && i.key === $.key ? "" : ("" + $.key).replace(
          Oe,
          "$&/"
        ) + "/") + x
      )), d.push($)), 1;
    x = 0;
    var ue = T === "" ? "." : T + ":";
    if (z(i))
      for (var J = 0; J < i.length; J++)
        T = i[J], K = ue + _e(T, J), x += le(
          T,
          d,
          O,
          K,
          $
        );
    else if (J = ee(i), typeof J == "function")
      for (i = J.call(i), J = 0; !(T = i.next()).done; )
        T = T.value, K = ue + _e(T, J++), x += le(
          T,
          d,
          O,
          K,
          $
        );
    else if (K === "object") {
      if (typeof i.then == "function")
        return le(
          Ae(i),
          d,
          O,
          T,
          $
        );
      throw d = String(i), Error(
        "Objects are not valid as a React child (found: " + (d === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : d) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return x;
  }
  function fe(i, d, O) {
    if (i == null) return i;
    var T = [], $ = 0;
    return le(i, T, "", "", function(K) {
      return d.call(O, K, $++);
    }), T;
  }
  function we(i) {
    if (i._status === -1) {
      var d = i._result;
      d = d(), d.then(
        function(O) {
          (i._status === 0 || i._status === -1) && (i._status = 1, i._result = O);
        },
        function(O) {
          (i._status === 0 || i._status === -1) && (i._status = 2, i._result = O);
        }
      ), i._status === -1 && (i._status = 0, i._result = d);
    }
    if (i._status === 1) return i._result.default;
    throw i._result;
  }
  var Le = typeof reportError == "function" ? reportError : function(i) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var d = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof i == "object" && i !== null && typeof i.message == "string" ? String(i.message) : String(i),
        error: i
      });
      if (!window.dispatchEvent(d)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", i);
      return;
    }
    console.error(i);
  };
  function q() {
  }
  return N.Children = {
    map: fe,
    forEach: function(i, d, O) {
      fe(
        i,
        function() {
          d.apply(this, arguments);
        },
        O
      );
    },
    count: function(i) {
      var d = 0;
      return fe(i, function() {
        d++;
      }), d;
    },
    toArray: function(i) {
      return fe(i, function(d) {
        return d;
      }) || [];
    },
    only: function(i) {
      if (!ie(i))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return i;
    }
  }, N.Component = H, N.Fragment = n, N.Profiler = u, N.PureComponent = W, N.StrictMode = a, N.Suspense = S, N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, N.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, N.cache = function(i) {
    return function() {
      return i.apply(null, arguments);
    };
  }, N.cloneElement = function(i, d, O) {
    if (i == null)
      throw Error(
        "The argument must be a React element, but you passed " + i + "."
      );
    var T = j({}, i.props), $ = i.key, K = void 0;
    if (d != null)
      for (x in d.ref !== void 0 && (K = void 0), d.key !== void 0 && ($ = "" + d.key), d)
        !U.call(d, x) || x === "key" || x === "__self" || x === "__source" || x === "ref" && d.ref === void 0 || (T[x] = d[x]);
    var x = arguments.length - 2;
    if (x === 1) T.children = O;
    else if (1 < x) {
      for (var ue = Array(x), J = 0; J < x; J++)
        ue[J] = arguments[J + 2];
      T.children = ue;
    }
    return I(i.type, $, void 0, void 0, K, T);
  }, N.createContext = function(i) {
    return i = {
      $$typeof: v,
      _currentValue: i,
      _currentValue2: i,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, i.Provider = i, i.Consumer = {
      $$typeof: c,
      _context: i
    }, i;
  }, N.createElement = function(i, d, O) {
    var T, $ = {}, K = null;
    if (d != null)
      for (T in d.key !== void 0 && (K = "" + d.key), d)
        U.call(d, T) && T !== "key" && T !== "__self" && T !== "__source" && ($[T] = d[T]);
    var x = arguments.length - 2;
    if (x === 1) $.children = O;
    else if (1 < x) {
      for (var ue = Array(x), J = 0; J < x; J++)
        ue[J] = arguments[J + 2];
      $.children = ue;
    }
    if (i && i.defaultProps)
      for (T in x = i.defaultProps, x)
        $[T] === void 0 && ($[T] = x[T]);
    return I(i, K, void 0, void 0, null, $);
  }, N.createRef = function() {
    return { current: null };
  }, N.forwardRef = function(i) {
    return { $$typeof: h, render: i };
  }, N.isValidElement = ie, N.lazy = function(i) {
    return {
      $$typeof: C,
      _payload: { _status: -1, _result: i },
      _init: we
    };
  }, N.memo = function(i, d) {
    return {
      $$typeof: y,
      type: i,
      compare: d === void 0 ? null : d
    };
  }, N.startTransition = function(i) {
    var d = l.T, O = {};
    l.T = O;
    try {
      var T = i(), $ = l.S;
      $ !== null && $(O, T), typeof T == "object" && T !== null && typeof T.then == "function" && T.then(q, Le);
    } catch (K) {
      Le(K);
    } finally {
      l.T = d;
    }
  }, N.unstable_useCacheRefresh = function() {
    return l.H.useCacheRefresh();
  }, N.use = function(i) {
    return l.H.use(i);
  }, N.useActionState = function(i, d, O) {
    return l.H.useActionState(i, d, O);
  }, N.useCallback = function(i, d) {
    return l.H.useCallback(i, d);
  }, N.useContext = function(i) {
    return l.H.useContext(i);
  }, N.useDebugValue = function() {
  }, N.useDeferredValue = function(i, d) {
    return l.H.useDeferredValue(i, d);
  }, N.useEffect = function(i, d) {
    return l.H.useEffect(i, d);
  }, N.useId = function() {
    return l.H.useId();
  }, N.useImperativeHandle = function(i, d, O) {
    return l.H.useImperativeHandle(i, d, O);
  }, N.useInsertionEffect = function(i, d) {
    return l.H.useInsertionEffect(i, d);
  }, N.useLayoutEffect = function(i, d) {
    return l.H.useLayoutEffect(i, d);
  }, N.useMemo = function(i, d) {
    return l.H.useMemo(i, d);
  }, N.useOptimistic = function(i, d) {
    return l.H.useOptimistic(i, d);
  }, N.useReducer = function(i, d, O) {
    return l.H.useReducer(i, d, O);
  }, N.useRef = function(i) {
    return l.H.useRef(i);
  }, N.useState = function(i) {
    return l.H.useState(i);
  }, N.useSyncExternalStore = function(i, d, O) {
    return l.H.useSyncExternalStore(
      i,
      d,
      O
    );
  }, N.useTransition = function() {
    return l.H.useTransition();
  }, N.version = "19.0.0", N;
}
var Ze = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Ze.exports;
var nt;
function Vt() {
  return nt || (nt = 1, function(e, t) {
    process.env.NODE_ENV !== "production" && function() {
      function n(r, s) {
        Object.defineProperty(c.prototype, r, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              s[0],
              s[1]
            );
          }
        });
      }
      function a(r) {
        return r === null || typeof r != "object" ? null : (r = Ke && r[Ke] || r["@@iterator"], typeof r == "function" ? r : null);
      }
      function u(r, s) {
        r = (r = r.constructor) && (r.displayName || r.name) || "ReactClass";
        var f = r + "." + s;
        Ve[f] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          s,
          r
        ), Ve[f] = !0);
      }
      function c(r, s, f) {
        this.props = r, this.context = s, this.refs = g, this.updater = f || o;
      }
      function v() {
      }
      function h(r, s, f) {
        this.props = r, this.context = s, this.refs = g, this.updater = f || o;
      }
      function S(r) {
        return "" + r;
      }
      function y(r) {
        try {
          S(r);
          var s = !1;
        } catch {
          s = !0;
        }
        if (s) {
          s = console;
          var f = s.error, p = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
          return f.call(
            s,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            p
          ), S(r);
        }
      }
      function C(r) {
        if (r == null) return null;
        if (typeof r == "function")
          return r.$$typeof === k ? null : r.displayName || r.name || null;
        if (typeof r == "string") return r;
        switch (r) {
          case J:
            return "Fragment";
          case ue:
            return "Portal";
          case He:
            return "Profiler";
          case xe:
            return "StrictMode";
          case pe:
            return "Suspense";
          case Pe:
            return "SuspenseList";
        }
        if (typeof r == "object")
          switch (typeof r.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), r.$$typeof) {
            case _:
              return (r.displayName || "Context") + ".Provider";
            case Ye:
              return (r._context.displayName || "Context") + ".Consumer";
            case Se:
              var s = r.render;
              return r = r.displayName, r || (r = s.displayName || s.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
            case ze:
              return s = r.displayName || null, s !== null ? s : C(r.type) || "Memo";
            case We:
              s = r._payload, r = r._init;
              try {
                return C(r(s));
              } catch {
              }
          }
        return null;
      }
      function b(r) {
        return typeof r == "string" || typeof r == "function" || r === J || r === He || r === xe || r === pe || r === Pe || r === sr || typeof r == "object" && r !== null && (r.$$typeof === We || r.$$typeof === ze || r.$$typeof === _ || r.$$typeof === Ye || r.$$typeof === Se || r.$$typeof === ae || r.getModuleId !== void 0);
      }
      function ee() {
      }
      function F() {
        if (he === 0) {
          Ue = console.log, Re = console.info, qe = console.warn, be = console.error, Ur = console.group, zr = console.groupCollapsed, qr = console.groupEnd;
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
        he++;
      }
      function j() {
        if (he--, he === 0) {
          var r = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: m({}, r, { value: Ue }),
            info: m({}, r, { value: Re }),
            warn: m({}, r, { value: qe }),
            error: m({}, r, { value: be }),
            group: m({}, r, { value: Ur }),
            groupCollapsed: m({}, r, { value: zr }),
            groupEnd: m({}, r, { value: qr })
          });
        }
        0 > he && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function P(r) {
        if (Sr === void 0)
          try {
            throw Error();
          } catch (f) {
            var s = f.stack.trim().match(/\n( *(at )?)/);
            Sr = s && s[1] || "", Dr = -1 < f.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < f.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + Sr + r + Dr;
      }
      function H(r, s) {
        if (!r || Cr) return "";
        var f = Rr.get(r);
        if (f !== void 0) return f;
        Cr = !0, f = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var p = null;
        p = A.H, A.H = null, F();
        try {
          var E = {
            DetermineComponentFrameRoot: function() {
              try {
                if (s) {
                  var $e = function() {
                    throw Error();
                  };
                  if (Object.defineProperty($e.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct($e, []);
                    } catch (Ie) {
                      var fr = Ie;
                    }
                    Reflect.construct(r, [], $e);
                  } else {
                    try {
                      $e.call();
                    } catch (Ie) {
                      fr = Ie;
                    }
                    r.call($e.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (Ie) {
                    fr = Ie;
                  }
                  ($e = r()) && typeof $e.catch == "function" && $e.catch(function() {
                  });
                }
              } catch (Ie) {
                if (Ie && fr && typeof Ie.stack == "string")
                  return [Ie.stack, fr.stack];
              }
              return [null, null];
            }
          };
          E.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var R = Object.getOwnPropertyDescriptor(
            E.DetermineComponentFrameRoot,
            "name"
          );
          R && R.configurable && Object.defineProperty(
            E.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var w = E.DetermineComponentFrameRoot(), Q = w[0], D = w[1];
          if (Q && D) {
            var re = Q.split(`
`), de = D.split(`
`);
            for (w = R = 0; R < re.length && !re[R].includes(
              "DetermineComponentFrameRoot"
            ); )
              R++;
            for (; w < de.length && !de[w].includes(
              "DetermineComponentFrameRoot"
            ); )
              w++;
            if (R === re.length || w === de.length)
              for (R = re.length - 1, w = de.length - 1; 1 <= R && 0 <= w && re[R] !== de[w]; )
                w--;
            for (; 1 <= R && 0 <= w; R--, w--)
              if (re[R] !== de[w]) {
                if (R !== 1 || w !== 1)
                  do
                    if (R--, w--, 0 > w || re[R] !== de[w]) {
                      var De = `
` + re[R].replace(
                        " at new ",
                        " at "
                      );
                      return r.displayName && De.includes("<anonymous>") && (De = De.replace("<anonymous>", r.displayName)), typeof r == "function" && Rr.set(r, De), De;
                    }
                  while (1 <= R && 0 <= w);
                break;
              }
          }
        } finally {
          Cr = !1, A.H = p, j(), Error.prepareStackTrace = f;
        }
        return re = (re = r ? r.displayName || r.name : "") ? P(re) : "", typeof r == "function" && Rr.set(r, re), re;
      }
      function L(r) {
        if (r == null) return "";
        if (typeof r == "function") {
          var s = r.prototype;
          return H(
            r,
            !(!s || !s.isReactComponent)
          );
        }
        if (typeof r == "string") return P(r);
        switch (r) {
          case pe:
            return P("Suspense");
          case Pe:
            return P("SuspenseList");
        }
        if (typeof r == "object")
          switch (r.$$typeof) {
            case Se:
              return r = H(r.render, !1), r;
            case ze:
              return L(r.type);
            case We:
              s = r._payload, r = r._init;
              try {
                return L(r(s));
              } catch {
              }
          }
        return "";
      }
      function W() {
        var r = A.A;
        return r === null ? null : r.getOwner();
      }
      function Y(r) {
        if (Ce.call(r, "key")) {
          var s = Object.getOwnPropertyDescriptor(r, "key").get;
          if (s && s.isReactWarning) return !1;
        }
        return r.key !== void 0;
      }
      function z(r, s) {
        function f() {
          Gr || (Gr = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            s
          ));
        }
        f.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: f,
          configurable: !0
        });
      }
      function l() {
        var r = C(this.type);
        return Fr[r] || (Fr[r] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), r = this.props.ref, r !== void 0 ? r : null;
      }
      function U(r, s, f, p, E, R) {
        return f = R.ref, r = {
          $$typeof: x,
          type: r,
          key: s,
          props: R,
          _owner: E
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
      function I(r, s) {
        return s = U(
          r.type,
          s,
          void 0,
          void 0,
          r._owner,
          r.props
        ), s._store.validated = r._store.validated, s;
      }
      function Te(r, s) {
        if (typeof r == "object" && r && r.$$typeof !== zt) {
          if (Z(r))
            for (var f = 0; f < r.length; f++) {
              var p = r[f];
              ie(p) && Me(p, s);
            }
          else if (ie(r))
            r._store && (r._store.validated = 1);
          else if (f = a(r), typeof f == "function" && f !== r.entries && (f = f.call(r), f !== r))
            for (; !(r = f.next()).done; )
              ie(r.value) && Me(r.value, s);
        }
      }
      function ie(r) {
        return typeof r == "object" && r !== null && r.$$typeof === x;
      }
      function Me(r, s) {
        if (r._store && !r._store.validated && r.key == null && (r._store.validated = 1, s = Oe(s), !Kr[s])) {
          Kr[s] = !0;
          var f = "";
          r && r._owner != null && r._owner !== W() && (f = null, typeof r._owner.tag == "number" ? f = C(r._owner.type) : typeof r._owner.name == "string" && (f = r._owner.name), f = " It was passed a child from " + f + ".");
          var p = A.getCurrentStack;
          A.getCurrentStack = function() {
            var E = L(r.type);
            return p && (E += p() || ""), E;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            s,
            f
          ), A.getCurrentStack = p;
        }
      }
      function Oe(r) {
        var s = "", f = W();
        return f && (f = C(f.type)) && (s = `

Check the render method of \`` + f + "`."), s || (r = C(r)) && (s = `

Check the top-level render call using <` + r + ">."), s;
      }
      function _e(r) {
        var s = { "=": "=0", ":": "=2" };
        return "$" + r.replace(/[=:]/g, function(f) {
          return s[f];
        });
      }
      function Ee(r, s) {
        return typeof r == "object" && r !== null && r.key != null ? (y(r.key), _e("" + r.key)) : s.toString(36);
      }
      function Ae() {
      }
      function le(r) {
        switch (r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
          default:
            switch (typeof r.status == "string" ? r.then(Ae, Ae) : (r.status = "pending", r.then(
              function(s) {
                r.status === "pending" && (r.status = "fulfilled", r.value = s);
              },
              function(s) {
                r.status === "pending" && (r.status = "rejected", r.reason = s);
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
      function fe(r, s, f, p, E) {
        var R = typeof r;
        (R === "undefined" || R === "boolean") && (r = null);
        var w = !1;
        if (r === null) w = !0;
        else
          switch (R) {
            case "bigint":
            case "string":
            case "number":
              w = !0;
              break;
            case "object":
              switch (r.$$typeof) {
                case x:
                case ue:
                  w = !0;
                  break;
                case We:
                  return w = r._init, fe(
                    w(r._payload),
                    s,
                    f,
                    p,
                    E
                  );
              }
          }
        if (w) {
          w = r, E = E(w);
          var Q = p === "" ? "." + Ee(w, 0) : p;
          return Z(E) ? (f = "", Q != null && (f = Q.replace(Xr, "$&/") + "/"), fe(E, s, f, "", function(re) {
            return re;
          })) : E != null && (ie(E) && (E.key != null && (w && w.key === E.key || y(E.key)), f = I(
            E,
            f + (E.key == null || w && w.key === E.key ? "" : ("" + E.key).replace(
              Xr,
              "$&/"
            ) + "/") + Q
          ), p !== "" && w != null && ie(w) && w.key == null && w._store && !w._store.validated && (f._store.validated = 2), E = f), s.push(E)), 1;
        }
        if (w = 0, Q = p === "" ? "." : p + ":", Z(r))
          for (var D = 0; D < r.length; D++)
            p = r[D], R = Q + Ee(p, D), w += fe(
              p,
              s,
              f,
              R,
              E
            );
        else if (D = a(r), typeof D == "function")
          for (D === r.entries && (Vr || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Vr = !0), r = D.call(r), D = 0; !(p = r.next()).done; )
            p = p.value, R = Q + Ee(p, D++), w += fe(
              p,
              s,
              f,
              R,
              E
            );
        else if (R === "object") {
          if (typeof r.then == "function")
            return fe(
              le(r),
              s,
              f,
              p,
              E
            );
          throw s = String(r), Error(
            "Objects are not valid as a React child (found: " + (s === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : s) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return w;
      }
      function we(r, s, f) {
        if (r == null) return r;
        var p = [], E = 0;
        return fe(r, p, "", "", function(R) {
          return s.call(f, R, E++);
        }), p;
      }
      function Le(r) {
        if (r._status === -1) {
          var s = r._result;
          s = s(), s.then(
            function(f) {
              (r._status === 0 || r._status === -1) && (r._status = 1, r._result = f);
            },
            function(f) {
              (r._status === 0 || r._status === -1) && (r._status = 2, r._result = f);
            }
          ), r._status === -1 && (r._status = 0, r._result = s);
        }
        if (r._status === 1)
          return s = r._result, s === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            s
          ), "default" in s || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            s
          ), s.default;
        throw r._result;
      }
      function q() {
        var r = A.H;
        return r === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), r;
      }
      function i() {
      }
      function d(r) {
        if (ir === null)
          try {
            var s = ("require" + Math.random()).slice(0, 7);
            ir = (e && e[s]).call(
              e,
              "timers"
            ).setImmediate;
          } catch {
            ir = function(p) {
              Jr === !1 && (Jr = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var E = new MessageChannel();
              E.port1.onmessage = p, E.port2.postMessage(void 0);
            };
          }
        return ir(r);
      }
      function O(r) {
        return 1 < r.length && typeof AggregateError == "function" ? new AggregateError(r) : r[0];
      }
      function T(r, s) {
        s !== ur - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), ur = s;
      }
      function $(r, s, f) {
        var p = A.actQueue;
        if (p !== null)
          if (p.length !== 0)
            try {
              K(p), d(function() {
                return $(r, s, f);
              });
              return;
            } catch (E) {
              A.thrownErrors.push(E);
            }
          else A.actQueue = null;
        0 < A.thrownErrors.length ? (p = O(A.thrownErrors), A.thrownErrors.length = 0, f(p)) : s(r);
      }
      function K(r) {
        if (!Tr) {
          Tr = !0;
          var s = 0;
          try {
            for (; s < r.length; s++) {
              var f = r[s];
              do {
                A.didUsePromise = !1;
                var p = f(!1);
                if (p !== null) {
                  if (A.didUsePromise) {
                    r[s] = f, r.splice(0, s);
                    return;
                  }
                  f = p;
                } else break;
              } while (!0);
            }
            r.length = 0;
          } catch (E) {
            r.splice(0, s + 1), A.thrownErrors.push(E);
          } finally {
            Tr = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var x = Symbol.for("react.transitional.element"), ue = Symbol.for("react.portal"), J = Symbol.for("react.fragment"), xe = Symbol.for("react.strict_mode"), He = Symbol.for("react.profiler"), Ye = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), Se = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), Pe = Symbol.for("react.suspense_list"), ze = Symbol.for("react.memo"), We = Symbol.for("react.lazy"), sr = Symbol.for("react.offscreen"), Ke = Symbol.iterator, Ve = {}, o = {
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
      Object.freeze(g), c.prototype.isReactComponent = {}, c.prototype.setState = function(r, s) {
        if (typeof r != "object" && typeof r != "function" && r != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, r, s, "setState");
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
      }, ne;
      for (ne in M)
        M.hasOwnProperty(ne) && n(ne, M[ne]);
      v.prototype = c.prototype, M = h.prototype = new v(), M.constructor = h, m(M, c.prototype), M.isPureReactComponent = !0;
      var Z = Array.isArray, k = Symbol.for("react.client.reference"), A = {
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
      }, Ce = Object.prototype.hasOwnProperty, ae = Symbol.for("react.client.reference"), he = 0, Ue, Re, qe, be, Ur, zr, qr;
      ee.__reactDisabledLog = !0;
      var Sr, Dr, Cr = !1, Rr = new (typeof WeakMap == "function" ? WeakMap : Map)(), zt = Symbol.for("react.client.reference"), Gr, Br, Fr = {}, Kr = {}, Vr = !1, Xr = /\/+/g, Qr = typeof reportError == "function" ? reportError : function(r) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var s = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
            error: r
          });
          if (!window.dispatchEvent(s)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", r);
          return;
        }
        console.error(r);
      }, Jr = !1, ir = null, ur = 0, cr = !1, Tr = !1, Zr = typeof queueMicrotask == "function" ? function(r) {
        queueMicrotask(function() {
          return queueMicrotask(r);
        });
      } : d;
      t.Children = {
        map: we,
        forEach: function(r, s, f) {
          we(
            r,
            function() {
              s.apply(this, arguments);
            },
            f
          );
        },
        count: function(r) {
          var s = 0;
          return we(r, function() {
            s++;
          }), s;
        },
        toArray: function(r) {
          return we(r, function(s) {
            return s;
          }) || [];
        },
        only: function(r) {
          if (!ie(r))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return r;
        }
      }, t.Component = c, t.Fragment = J, t.Profiler = He, t.PureComponent = h, t.StrictMode = xe, t.Suspense = pe, t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = A, t.act = function(r) {
        var s = A.actQueue, f = ur;
        ur++;
        var p = A.actQueue = s !== null ? s : [], E = !1;
        try {
          var R = r();
        } catch (D) {
          A.thrownErrors.push(D);
        }
        if (0 < A.thrownErrors.length)
          throw T(s, f), r = O(A.thrownErrors), A.thrownErrors.length = 0, r;
        if (R !== null && typeof R == "object" && typeof R.then == "function") {
          var w = R;
          return Zr(function() {
            E || cr || (cr = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(D, re) {
              E = !0, w.then(
                function(de) {
                  if (T(s, f), f === 0) {
                    try {
                      K(p), d(function() {
                        return $(
                          de,
                          D,
                          re
                        );
                      });
                    } catch ($e) {
                      A.thrownErrors.push($e);
                    }
                    if (0 < A.thrownErrors.length) {
                      var De = O(
                        A.thrownErrors
                      );
                      A.thrownErrors.length = 0, re(De);
                    }
                  } else D(de);
                },
                function(de) {
                  T(s, f), 0 < A.thrownErrors.length && (de = O(
                    A.thrownErrors
                  ), A.thrownErrors.length = 0), re(de);
                }
              );
            }
          };
        }
        var Q = R;
        if (T(s, f), f === 0 && (K(p), p.length !== 0 && Zr(function() {
          E || cr || (cr = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), A.actQueue = null), 0 < A.thrownErrors.length)
          throw r = O(A.thrownErrors), A.thrownErrors.length = 0, r;
        return {
          then: function(D, re) {
            E = !0, f === 0 ? (A.actQueue = p, d(function() {
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
      }, t.cloneElement = function(r, s, f) {
        if (r == null)
          throw Error(
            "The argument must be a React element, but you passed " + r + "."
          );
        var p = m({}, r.props), E = r.key, R = r._owner;
        if (s != null) {
          var w;
          e: {
            if (Ce.call(s, "ref") && (w = Object.getOwnPropertyDescriptor(
              s,
              "ref"
            ).get) && w.isReactWarning) {
              w = !1;
              break e;
            }
            w = s.ref !== void 0;
          }
          w && (R = W()), Y(s) && (y(s.key), E = "" + s.key);
          for (Q in s)
            !Ce.call(s, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && s.ref === void 0 || (p[Q] = s[Q]);
        }
        var Q = arguments.length - 2;
        if (Q === 1) p.children = f;
        else if (1 < Q) {
          w = Array(Q);
          for (var D = 0; D < Q; D++)
            w[D] = arguments[D + 2];
          p.children = w;
        }
        for (p = U(r.type, E, void 0, void 0, R, p), E = 2; E < arguments.length; E++)
          Te(arguments[E], p.type);
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
          $$typeof: Ye,
          _context: r
        }, r._currentRenderer = null, r._currentRenderer2 = null, r;
      }, t.createElement = function(r, s, f) {
        if (b(r))
          for (var p = 2; p < arguments.length; p++)
            Te(arguments[p], r);
        else {
          if (p = "", (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), r === null) var E = "null";
          else
            Z(r) ? E = "array" : r !== void 0 && r.$$typeof === x ? (E = "<" + (C(r.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : E = typeof r;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            E,
            p
          );
        }
        var R;
        if (p = {}, E = null, s != null)
          for (R in Br || !("__self" in s) || "key" in s || (Br = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), Y(s) && (y(s.key), E = "" + s.key), s)
            Ce.call(s, R) && R !== "key" && R !== "__self" && R !== "__source" && (p[R] = s[R]);
        var w = arguments.length - 2;
        if (w === 1) p.children = f;
        else if (1 < w) {
          for (var Q = Array(w), D = 0; D < w; D++)
            Q[D] = arguments[D + 2];
          Object.freeze && Object.freeze(Q), p.children = Q;
        }
        if (r && r.defaultProps)
          for (R in w = r.defaultProps, w)
            p[R] === void 0 && (p[R] = w[R]);
        return E && z(
          p,
          typeof r == "function" ? r.displayName || r.name || "Unknown" : r
        ), U(r, E, void 0, void 0, W(), p);
      }, t.createRef = function() {
        var r = { current: null };
        return Object.seal(r), r;
      }, t.forwardRef = function(r) {
        r != null && r.$$typeof === ze ? console.error(
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
        var s = { $$typeof: Se, render: r }, f;
        return Object.defineProperty(s, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(p) {
            f = p, r.name || r.displayName || (Object.defineProperty(r, "name", { value: p }), r.displayName = p);
          }
        }), s;
      }, t.isValidElement = ie, t.lazy = function(r) {
        return {
          $$typeof: We,
          _payload: { _status: -1, _result: r },
          _init: Le
        };
      }, t.memo = function(r, s) {
        b(r) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          r === null ? "null" : typeof r
        ), s = {
          $$typeof: ze,
          type: r,
          compare: s === void 0 ? null : s
        };
        var f;
        return Object.defineProperty(s, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(p) {
            f = p, r.name || r.displayName || (Object.defineProperty(r, "name", { value: p }), r.displayName = p);
          }
        }), s;
      }, t.startTransition = function(r) {
        var s = A.T, f = {};
        A.T = f, f._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var p = r(), E = A.S;
          E !== null && E(f, p), typeof p == "object" && p !== null && typeof p.then == "function" && p.then(i, Qr);
        } catch (R) {
          Qr(R);
        } finally {
          s === null && f._updatedFibers && (r = f._updatedFibers.size, f._updatedFibers.clear(), 10 < r && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), A.T = s;
        }
      }, t.unstable_useCacheRefresh = function() {
        return q().useCacheRefresh();
      }, t.use = function(r) {
        return q().use(r);
      }, t.useActionState = function(r, s, f) {
        return q().useActionState(
          r,
          s,
          f
        );
      }, t.useCallback = function(r, s) {
        return q().useCallback(r, s);
      }, t.useContext = function(r) {
        var s = q();
        return r.$$typeof === Ye && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), s.useContext(r);
      }, t.useDebugValue = function(r, s) {
        return q().useDebugValue(r, s);
      }, t.useDeferredValue = function(r, s) {
        return q().useDeferredValue(r, s);
      }, t.useEffect = function(r, s) {
        return q().useEffect(r, s);
      }, t.useId = function() {
        return q().useId();
      }, t.useImperativeHandle = function(r, s, f) {
        return q().useImperativeHandle(r, s, f);
      }, t.useInsertionEffect = function(r, s) {
        return q().useInsertionEffect(r, s);
      }, t.useLayoutEffect = function(r, s) {
        return q().useLayoutEffect(r, s);
      }, t.useMemo = function(r, s) {
        return q().useMemo(r, s);
      }, t.useOptimistic = function(r, s) {
        return q().useOptimistic(r, s);
      }, t.useReducer = function(r, s, f) {
        return q().useReducer(r, s, f);
      }, t.useRef = function(r) {
        return q().useRef(r);
      }, t.useState = function(r) {
        return q().useState(r);
      }, t.useSyncExternalStore = function(r, s, f) {
        return q().useSyncExternalStore(
          r,
          s,
          f
        );
      }, t.useTransition = function() {
        return q().useTransition();
      }, t.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(Ze, Ze.exports)), Ze.exports;
}
var ot;
function Tt() {
  return ot || (ot = 1, process.env.NODE_ENV === "production" ? dr.exports = Kt() : dr.exports = Vt()), dr.exports;
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
var at;
function Xt() {
  return at || (at = 1, process.env.NODE_ENV !== "production" && function() {
    function e(o) {
      if (o == null) return null;
      if (typeof o == "function")
        return o.$$typeof === Le ? null : o.displayName || o.name || null;
      if (typeof o == "string") return o;
      switch (o) {
        case U:
          return "Fragment";
        case l:
          return "Portal";
        case Te:
          return "Profiler";
        case I:
          return "StrictMode";
        case _e:
          return "Suspense";
        case Ee:
          return "SuspenseList";
      }
      if (typeof o == "object")
        switch (typeof o.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), o.$$typeof) {
          case Me:
            return (o.displayName || "Context") + ".Provider";
          case ie:
            return (o._context.displayName || "Context") + ".Consumer";
          case Oe:
            var m = o.render;
            return o = o.displayName, o || (o = m.displayName || m.name || "", o = o !== "" ? "ForwardRef(" + o + ")" : "ForwardRef"), o;
          case Ae:
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
    function a() {
    }
    function u() {
      if ($ === 0) {
        K = console.log, x = console.info, ue = console.warn, J = console.error, xe = console.group, He = console.groupCollapsed, Ye = console.groupEnd;
        var o = {
          configurable: !0,
          enumerable: !0,
          value: a,
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
          info: d({}, o, { value: x }),
          warn: d({}, o, { value: ue }),
          error: d({}, o, { value: J }),
          group: d({}, o, { value: xe }),
          groupCollapsed: d({}, o, { value: He }),
          groupEnd: d({}, o, { value: Ye })
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
          _ = m && m[1] || "", Se = -1 < g.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < g.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + _ + o + Se;
    }
    function h(o, m) {
      if (!o || pe) return "";
      var g = Pe.get(o);
      if (g !== void 0) return g;
      pe = !0, g = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var M = null;
      M = q.H, q.H = null, u();
      try {
        var ne = {
          DetermineComponentFrameRoot: function() {
            try {
              if (m) {
                var Re = function() {
                  throw Error();
                };
                if (Object.defineProperty(Re.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Re, []);
                  } catch (be) {
                    var qe = be;
                  }
                  Reflect.construct(o, [], Re);
                } else {
                  try {
                    Re.call();
                  } catch (be) {
                    qe = be;
                  }
                  o.call(Re.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (be) {
                  qe = be;
                }
                (Re = o()) && typeof Re.catch == "function" && Re.catch(function() {
                });
              }
            } catch (be) {
              if (be && qe && typeof be.stack == "string")
                return [be.stack, qe.stack];
            }
            return [null, null];
          }
        };
        ne.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var Z = Object.getOwnPropertyDescriptor(
          ne.DetermineComponentFrameRoot,
          "name"
        );
        Z && Z.configurable && Object.defineProperty(
          ne.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var k = ne.DetermineComponentFrameRoot(), A = k[0], Ce = k[1];
        if (A && Ce) {
          var ae = A.split(`
`), he = Ce.split(`
`);
          for (k = Z = 0; Z < ae.length && !ae[Z].includes(
            "DetermineComponentFrameRoot"
          ); )
            Z++;
          for (; k < he.length && !he[k].includes(
            "DetermineComponentFrameRoot"
          ); )
            k++;
          if (Z === ae.length || k === he.length)
            for (Z = ae.length - 1, k = he.length - 1; 1 <= Z && 0 <= k && ae[Z] !== he[k]; )
              k--;
          for (; 1 <= Z && 0 <= k; Z--, k--)
            if (ae[Z] !== he[k]) {
              if (Z !== 1 || k !== 1)
                do
                  if (Z--, k--, 0 > k || ae[Z] !== he[k]) {
                    var Ue = `
` + ae[Z].replace(
                      " at new ",
                      " at "
                    );
                    return o.displayName && Ue.includes("<anonymous>") && (Ue = Ue.replace("<anonymous>", o.displayName)), typeof o == "function" && Pe.set(o, Ue), Ue;
                  }
                while (1 <= Z && 0 <= k);
              break;
            }
        }
      } finally {
        pe = !1, q.H = M, c(), Error.prepareStackTrace = g;
      }
      return ae = (ae = o ? o.displayName || o.name : "") ? v(ae) : "", typeof o == "function" && Pe.set(o, ae), ae;
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
        case _e:
          return v("Suspense");
        case Ee:
          return v("SuspenseList");
      }
      if (typeof o == "object")
        switch (o.$$typeof) {
          case Oe:
            return o = h(o.render, !1), o;
          case Ae:
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
    function y() {
      var o = q.A;
      return o === null ? null : o.getOwner();
    }
    function C(o) {
      if (i.call(o, "key")) {
        var m = Object.getOwnPropertyDescriptor(o, "key").get;
        if (m && m.isReactWarning) return !1;
      }
      return o.key !== void 0;
    }
    function b(o, m) {
      function g() {
        We || (We = !0, console.error(
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
      return sr[o] || (sr[o] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), o = this.props.ref, o !== void 0 ? o : null;
    }
    function F(o, m, g, M, ne, Z) {
      return g = Z.ref, o = {
        $$typeof: z,
        type: o,
        key: m,
        props: Z,
        _owner: ne
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
    function j(o, m, g, M, ne, Z) {
      if (typeof o == "string" || typeof o == "function" || o === U || o === Te || o === I || o === _e || o === Ee || o === fe || typeof o == "object" && o !== null && (o.$$typeof === le || o.$$typeof === Ae || o.$$typeof === Me || o.$$typeof === ie || o.$$typeof === Oe || o.$$typeof === O || o.getModuleId !== void 0)) {
        var k = m.children;
        if (k !== void 0)
          if (M)
            if (T(k)) {
              for (M = 0; M < k.length; M++)
                P(k[M], o);
              Object.freeze && Object.freeze(k);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else P(k, o);
      } else
        k = "", (o === void 0 || typeof o == "object" && o !== null && Object.keys(o).length === 0) && (k += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), o === null ? M = "null" : T(o) ? M = "array" : o !== void 0 && o.$$typeof === z ? (M = "<" + (e(o.type) || "Unknown") + " />", k = " Did you accidentally export a JSX literal instead of a component?") : M = typeof o, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          M,
          k
        );
      if (i.call(m, "key")) {
        k = e(o);
        var A = Object.keys(m).filter(function(ae) {
          return ae !== "key";
        });
        M = 0 < A.length ? "{key: someKey, " + A.join(": ..., ") + ": ...}" : "{key: someKey}", Ke[k + M] || (A = 0 < A.length ? "{" + A.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          M,
          k,
          A,
          k
        ), Ke[k + M] = !0);
      }
      if (k = null, g !== void 0 && (n(g), k = "" + g), C(m) && (n(m.key), k = "" + m.key), "key" in m) {
        g = {};
        for (var Ce in m)
          Ce !== "key" && (g[Ce] = m[Ce]);
      } else g = m;
      return k && b(
        g,
        typeof o == "function" ? o.displayName || o.name || "Unknown" : o
      ), F(o, k, Z, ne, y(), g);
    }
    function P(o, m) {
      if (typeof o == "object" && o && o.$$typeof !== ze) {
        if (T(o))
          for (var g = 0; g < o.length; g++) {
            var M = o[g];
            H(M) && L(M, m);
          }
        else if (H(o))
          o._store && (o._store.validated = 1);
        else if (o === null || typeof o != "object" ? g = null : (g = we && o[we] || o["@@iterator"], g = typeof g == "function" ? g : null), typeof g == "function" && g !== o.entries && (g = g.call(o), g !== o))
          for (; !(o = g.next()).done; )
            H(o.value) && L(o.value, m);
      }
    }
    function H(o) {
      return typeof o == "object" && o !== null && o.$$typeof === z;
    }
    function L(o, m) {
      if (o._store && !o._store.validated && o.key == null && (o._store.validated = 1, m = W(m), !Ve[m])) {
        Ve[m] = !0;
        var g = "";
        o && o._owner != null && o._owner !== y() && (g = null, typeof o._owner.tag == "number" ? g = e(o._owner.type) : typeof o._owner.name == "string" && (g = o._owner.name), g = " It was passed a child from " + g + ".");
        var M = q.getCurrentStack;
        q.getCurrentStack = function() {
          var ne = S(o.type);
          return M && (ne += M() || ""), ne;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          m,
          g
        ), q.getCurrentStack = M;
      }
    }
    function W(o) {
      var m = "", g = y();
      return g && (g = e(g.type)) && (m = `

Check the render method of \`` + g + "`."), m || (o = e(o)) && (m = `

Check the top-level render call using <` + o + ">."), m;
    }
    var Y = Tt(), z = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), U = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), Te = Symbol.for("react.profiler"), ie = Symbol.for("react.consumer"), Me = Symbol.for("react.context"), Oe = Symbol.for("react.forward_ref"), _e = Symbol.for("react.suspense"), Ee = Symbol.for("react.suspense_list"), Ae = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), we = Symbol.iterator, Le = Symbol.for("react.client.reference"), q = Y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, i = Object.prototype.hasOwnProperty, d = Object.assign, O = Symbol.for("react.client.reference"), T = Array.isArray, $ = 0, K, x, ue, J, xe, He, Ye;
    a.__reactDisabledLog = !0;
    var _, Se, pe = !1, Pe = new (typeof WeakMap == "function" ? WeakMap : Map)(), ze = Symbol.for("react.client.reference"), We, sr = {}, Ke = {}, Ve = {};
    Qe.Fragment = U, Qe.jsx = function(o, m, g, M, ne) {
      return j(o, m, g, !1, M, ne);
    }, Qe.jsxs = function(o, m, g, M, ne) {
      return j(o, m, g, !0, M, ne);
    };
  }()), Qe;
}
var st;
function Qt() {
  return st || (st = 1, process.env.NODE_ENV === "production" ? lr.exports = Ft() : lr.exports = Xt()), lr.exports;
}
var er = Qt(), te = Tt();
const Pr = /* @__PURE__ */ qt(te), it = /* @__PURE__ */ Bt({
  __proto__: null,
  default: Pr
}, [te]);
var Jt = !1;
function Zt(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function en(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var rn = /* @__PURE__ */ function() {
  function e(n) {
    var a = this;
    this._insertTag = function(u) {
      var c;
      a.tags.length === 0 ? a.insertionPoint ? c = a.insertionPoint.nextSibling : a.prepend ? c = a.container.firstChild : c = a.before : c = a.tags[a.tags.length - 1].nextSibling, a.container.insertBefore(u, c), a.tags.push(u);
    }, this.isSpeedy = n.speedy === void 0 ? !Jt : n.speedy, this.tags = [], this.ctr = 0, this.nonce = n.nonce, this.key = n.key, this.container = n.container, this.prepend = n.prepend, this.insertionPoint = n.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(a) {
    a.forEach(this._insertTag);
  }, t.insert = function(a) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(en(this));
    var u = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var c = Zt(u);
      try {
        c.insertRule(a, c.cssRules.length);
      } catch {
      }
    } else
      u.appendChild(document.createTextNode(a));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(a) {
      var u;
      return (u = a.parentNode) == null ? void 0 : u.removeChild(a);
    }), this.tags = [], this.ctr = 0;
  }, e;
}(), ce = "-ms-", gr = "-moz-", G = "-webkit-", Ot = "comm", Lr = "rule", Yr = "decl", tn = "@import", At = "@keyframes", nn = "@layer", on = Math.abs, br = String.fromCharCode, an = Object.assign;
function sn(e, t) {
  return se(e, 0) ^ 45 ? (((t << 2 ^ se(e, 0)) << 2 ^ se(e, 1)) << 2 ^ se(e, 2)) << 2 ^ se(e, 3) : 0;
}
function xt(e) {
  return e.trim();
}
function un(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function B(e, t, n) {
  return e.replace(t, n);
}
function $r(e, t) {
  return e.indexOf(t);
}
function se(e, t) {
  return e.charCodeAt(t) | 0;
}
function rr(e, t, n) {
  return e.slice(t, n);
}
function ke(e) {
  return e.length;
}
function Ir(e) {
  return e.length;
}
function vr(e, t) {
  return t.push(e), e;
}
function cn(e, t) {
  return e.map(t).join("");
}
var _r = 1, Be = 1, Pt = 0, ve = 0, oe = 0, Fe = "";
function wr(e, t, n, a, u, c, v) {
  return { value: e, root: t, parent: n, type: a, props: u, children: c, line: _r, column: Be, length: v, return: "" };
}
function Je(e, t) {
  return an(wr("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function fn() {
  return oe;
}
function ln() {
  return oe = ve > 0 ? se(Fe, --ve) : 0, Be--, oe === 10 && (Be = 1, _r--), oe;
}
function ge() {
  return oe = ve < Pt ? se(Fe, ve++) : 0, Be++, oe === 10 && (Be = 1, _r++), oe;
}
function je() {
  return se(Fe, ve);
}
function hr() {
  return ve;
}
function or(e, t) {
  return rr(Fe, e, t);
}
function tr(e) {
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
function $t(e) {
  return _r = Be = 1, Pt = ke(Fe = e), ve = 0, [];
}
function kt(e) {
  return Fe = "", e;
}
function mr(e) {
  return xt(or(ve - 1, kr(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function dn(e) {
  for (; (oe = je()) && oe < 33; )
    ge();
  return tr(e) > 2 || tr(oe) > 3 ? "" : " ";
}
function vn(e, t) {
  for (; --t && ge() && !(oe < 48 || oe > 102 || oe > 57 && oe < 65 || oe > 70 && oe < 97); )
    ;
  return or(e, hr() + (t < 6 && je() == 32 && ge() == 32));
}
function kr(e) {
  for (; ge(); )
    switch (oe) {
      // ] ) " '
      case e:
        return ve;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && kr(oe);
        break;
      // (
      case 40:
        e === 41 && kr(e);
        break;
      // \
      case 92:
        ge();
        break;
    }
  return ve;
}
function pn(e, t) {
  for (; ge() && e + oe !== 57; )
    if (e + oe === 84 && je() === 47)
      break;
  return "/*" + or(t, ve - 1) + "*" + br(e === 47 ? e : ge());
}
function hn(e) {
  for (; !tr(je()); )
    ge();
  return or(e, ve);
}
function mn(e) {
  return kt(yr("", null, null, null, [""], e = $t(e), 0, [0], e));
}
function yr(e, t, n, a, u, c, v, h, S) {
  for (var y = 0, C = 0, b = v, ee = 0, F = 0, j = 0, P = 1, H = 1, L = 1, W = 0, Y = "", z = u, l = c, U = a, I = Y; H; )
    switch (j = W, W = ge()) {
      // (
      case 40:
        if (j != 108 && se(I, b - 1) == 58) {
          $r(I += B(mr(W), "&", "&\f"), "&\f") != -1 && (L = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        I += mr(W);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        I += dn(j);
        break;
      // \
      case 92:
        I += vn(hr() - 1, 7);
        continue;
      // /
      case 47:
        switch (je()) {
          case 42:
          case 47:
            vr(yn(pn(ge(), hr()), t, n), S);
            break;
          default:
            I += "/";
        }
        break;
      // {
      case 123 * P:
        h[y++] = ke(I) * L;
      // } ; \0
      case 125 * P:
      case 59:
      case 0:
        switch (W) {
          // \0 }
          case 0:
          case 125:
            H = 0;
          // ;
          case 59 + C:
            L == -1 && (I = B(I, /\f/g, "")), F > 0 && ke(I) - b && vr(F > 32 ? ct(I + ";", a, n, b - 1) : ct(B(I, " ", "") + ";", a, n, b - 2), S);
            break;
          // @ ;
          case 59:
            I += ";";
          // { rule/at-rule
          default:
            if (vr(U = ut(I, t, n, y, C, u, h, Y, z = [], l = [], b), c), W === 123)
              if (C === 0)
                yr(I, t, U, U, z, c, b, h, l);
              else
                switch (ee === 99 && se(I, 3) === 110 ? 100 : ee) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    yr(e, U, U, a && vr(ut(e, U, U, 0, 0, u, h, Y, u, z = [], b), l), u, l, b, h, a ? z : l);
                    break;
                  default:
                    yr(I, U, U, U, [""], l, 0, h, l);
                }
        }
        y = C = F = 0, P = L = 1, Y = I = "", b = v;
        break;
      // :
      case 58:
        b = 1 + ke(I), F = j;
      default:
        if (P < 1) {
          if (W == 123)
            --P;
          else if (W == 125 && P++ == 0 && ln() == 125)
            continue;
        }
        switch (I += br(W), W * P) {
          // &
          case 38:
            L = C > 0 ? 1 : (I += "\f", -1);
            break;
          // ,
          case 44:
            h[y++] = (ke(I) - 1) * L, L = 1;
            break;
          // @
          case 64:
            je() === 45 && (I += mr(ge())), ee = je(), C = b = ke(Y = I += hn(hr())), W++;
            break;
          // -
          case 45:
            j === 45 && ke(I) == 2 && (P = 0);
        }
    }
  return c;
}
function ut(e, t, n, a, u, c, v, h, S, y, C) {
  for (var b = u - 1, ee = u === 0 ? c : [""], F = Ir(ee), j = 0, P = 0, H = 0; j < a; ++j)
    for (var L = 0, W = rr(e, b + 1, b = on(P = v[j])), Y = e; L < F; ++L)
      (Y = xt(P > 0 ? ee[L] + " " + W : B(W, /&\f/g, ee[L]))) && (S[H++] = Y);
  return wr(e, t, n, u === 0 ? Lr : h, S, y, C);
}
function yn(e, t, n) {
  return wr(e, t, n, Ot, br(fn()), rr(e, 2, -2), 0);
}
function ct(e, t, n, a) {
  return wr(e, t, n, Yr, rr(e, 0, a), rr(e, a + 1, -1), a);
}
function Ge(e, t) {
  for (var n = "", a = Ir(e), u = 0; u < a; u++)
    n += t(e[u], u, e, t) || "";
  return n;
}
function gn(e, t, n, a) {
  switch (e.type) {
    case nn:
      if (e.children.length) break;
    case tn:
    case Yr:
      return e.return = e.return || e.value;
    case Ot:
      return "";
    case At:
      return e.return = e.value + "{" + Ge(e.children, a) + "}";
    case Lr:
      e.value = e.props.join(",");
  }
  return ke(n = Ge(e.children, a)) ? e.return = e.value + "{" + n + "}" : "";
}
function En(e) {
  var t = Ir(e);
  return function(n, a, u, c) {
    for (var v = "", h = 0; h < t; h++)
      v += e[h](n, a, u, c) || "";
    return v;
  };
}
function bn(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function _n(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var wn = function(t, n, a) {
  for (var u = 0, c = 0; u = c, c = je(), u === 38 && c === 12 && (n[a] = 1), !tr(c); )
    ge();
  return or(t, ve);
}, Sn = function(t, n) {
  var a = -1, u = 44;
  do
    switch (tr(u)) {
      case 0:
        u === 38 && je() === 12 && (n[a] = 1), t[a] += wn(ve - 1, n, a);
        break;
      case 2:
        t[a] += mr(u);
        break;
      case 4:
        if (u === 44) {
          t[++a] = je() === 58 ? "&\f" : "", n[a] = t[a].length;
          break;
        }
      // fallthrough
      default:
        t[a] += br(u);
    }
  while (u = ge());
  return t;
}, Cn = function(t, n) {
  return kt(Sn($t(t), n));
}, ft = /* @__PURE__ */ new WeakMap(), Rn = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var n = t.value, a = t.parent, u = t.column === a.column && t.line === a.line; a.type !== "rule"; )
      if (a = a.parent, !a) return;
    if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !ft.get(a)) && !u) {
      ft.set(t, !0);
      for (var c = [], v = Cn(n, c), h = a.props, S = 0, y = 0; S < v.length; S++)
        for (var C = 0; C < h.length; C++, y++)
          t.props[y] = c[S] ? v[S].replace(/&\f/g, h[C]) : h[C] + " " + v[S];
    }
  }
}, Tn = function(t) {
  if (t.type === "decl") {
    var n = t.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function Nt(e, t) {
  switch (sn(e, t)) {
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
      return G + e + gr + e + ce + e + e;
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
      if (ke(e) - 1 - t > 6) switch (se(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (se(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return B(e, /(.+:)(.+)-([^]+)/, "$1" + G + "$2-$3$1" + gr + (se(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~$r(e, "stretch") ? Nt(B(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (se(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (se(e, ke(e) - 3 - (~$r(e, "!important") && 10))) {
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
var On = function(t, n, a, u) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Yr:
      t.return = Nt(t.value, t.length);
      break;
    case At:
      return Ge([Je(t, {
        value: B(t.value, "@", "@" + G)
      })], u);
    case Lr:
      if (t.length) return cn(t.props, function(c) {
        switch (un(c, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return Ge([Je(t, {
              props: [B(c, /:(read-\w+)/, ":" + gr + "$1")]
            })], u);
          // :placeholder
          case "::placeholder":
            return Ge([Je(t, {
              props: [B(c, /:(plac\w+)/, ":" + G + "input-$1")]
            }), Je(t, {
              props: [B(c, /:(plac\w+)/, ":" + gr + "$1")]
            }), Je(t, {
              props: [B(c, /:(plac\w+)/, ce + "input-$1")]
            })], u);
        }
        return "";
      });
  }
}, An = [On], xn = function(t) {
  var n = t.key;
  if (n === "css") {
    var a = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(a, function(P) {
      var H = P.getAttribute("data-emotion");
      H.indexOf(" ") !== -1 && (document.head.appendChild(P), P.setAttribute("data-s", ""));
    });
  }
  var u = t.stylisPlugins || An, c = {}, v, h = [];
  v = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(P) {
      for (var H = P.getAttribute("data-emotion").split(" "), L = 1; L < H.length; L++)
        c[H[L]] = !0;
      h.push(P);
    }
  );
  var S, y = [Rn, Tn];
  {
    var C, b = [gn, bn(function(P) {
      C.insert(P);
    })], ee = En(y.concat(u, b)), F = function(H) {
      return Ge(mn(H), ee);
    };
    S = function(H, L, W, Y) {
      C = W, F(H ? H + "{" + L.styles + "}" : L.styles), Y && (j.inserted[L.name] = !0);
    };
  }
  var j = {
    key: n,
    sheet: new rn({
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
}, pr = { exports: {} }, V = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lt;
function Pn() {
  if (lt) return V;
  lt = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, u = e ? Symbol.for("react.strict_mode") : 60108, c = e ? Symbol.for("react.profiler") : 60114, v = e ? Symbol.for("react.provider") : 60109, h = e ? Symbol.for("react.context") : 60110, S = e ? Symbol.for("react.async_mode") : 60111, y = e ? Symbol.for("react.concurrent_mode") : 60111, C = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, ee = e ? Symbol.for("react.suspense_list") : 60120, F = e ? Symbol.for("react.memo") : 60115, j = e ? Symbol.for("react.lazy") : 60116, P = e ? Symbol.for("react.block") : 60121, H = e ? Symbol.for("react.fundamental") : 60117, L = e ? Symbol.for("react.responder") : 60118, W = e ? Symbol.for("react.scope") : 60119;
  function Y(l) {
    if (typeof l == "object" && l !== null) {
      var U = l.$$typeof;
      switch (U) {
        case t:
          switch (l = l.type, l) {
            case S:
            case y:
            case a:
            case c:
            case u:
            case b:
              return l;
            default:
              switch (l = l && l.$$typeof, l) {
                case h:
                case C:
                case j:
                case F:
                case v:
                  return l;
                default:
                  return U;
              }
          }
        case n:
          return U;
      }
    }
  }
  function z(l) {
    return Y(l) === y;
  }
  return V.AsyncMode = S, V.ConcurrentMode = y, V.ContextConsumer = h, V.ContextProvider = v, V.Element = t, V.ForwardRef = C, V.Fragment = a, V.Lazy = j, V.Memo = F, V.Portal = n, V.Profiler = c, V.StrictMode = u, V.Suspense = b, V.isAsyncMode = function(l) {
    return z(l) || Y(l) === S;
  }, V.isConcurrentMode = z, V.isContextConsumer = function(l) {
    return Y(l) === h;
  }, V.isContextProvider = function(l) {
    return Y(l) === v;
  }, V.isElement = function(l) {
    return typeof l == "object" && l !== null && l.$$typeof === t;
  }, V.isForwardRef = function(l) {
    return Y(l) === C;
  }, V.isFragment = function(l) {
    return Y(l) === a;
  }, V.isLazy = function(l) {
    return Y(l) === j;
  }, V.isMemo = function(l) {
    return Y(l) === F;
  }, V.isPortal = function(l) {
    return Y(l) === n;
  }, V.isProfiler = function(l) {
    return Y(l) === c;
  }, V.isStrictMode = function(l) {
    return Y(l) === u;
  }, V.isSuspense = function(l) {
    return Y(l) === b;
  }, V.isValidElementType = function(l) {
    return typeof l == "string" || typeof l == "function" || l === a || l === y || l === c || l === u || l === b || l === ee || typeof l == "object" && l !== null && (l.$$typeof === j || l.$$typeof === F || l.$$typeof === v || l.$$typeof === h || l.$$typeof === C || l.$$typeof === H || l.$$typeof === L || l.$$typeof === W || l.$$typeof === P);
  }, V.typeOf = Y, V;
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
var dt;
function $n() {
  return dt || (dt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, u = e ? Symbol.for("react.strict_mode") : 60108, c = e ? Symbol.for("react.profiler") : 60114, v = e ? Symbol.for("react.provider") : 60109, h = e ? Symbol.for("react.context") : 60110, S = e ? Symbol.for("react.async_mode") : 60111, y = e ? Symbol.for("react.concurrent_mode") : 60111, C = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, ee = e ? Symbol.for("react.suspense_list") : 60120, F = e ? Symbol.for("react.memo") : 60115, j = e ? Symbol.for("react.lazy") : 60116, P = e ? Symbol.for("react.block") : 60121, H = e ? Symbol.for("react.fundamental") : 60117, L = e ? Symbol.for("react.responder") : 60118, W = e ? Symbol.for("react.scope") : 60119;
    function Y(_) {
      return typeof _ == "string" || typeof _ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      _ === a || _ === y || _ === c || _ === u || _ === b || _ === ee || typeof _ == "object" && _ !== null && (_.$$typeof === j || _.$$typeof === F || _.$$typeof === v || _.$$typeof === h || _.$$typeof === C || _.$$typeof === H || _.$$typeof === L || _.$$typeof === W || _.$$typeof === P);
    }
    function z(_) {
      if (typeof _ == "object" && _ !== null) {
        var Se = _.$$typeof;
        switch (Se) {
          case t:
            var pe = _.type;
            switch (pe) {
              case S:
              case y:
              case a:
              case c:
              case u:
              case b:
                return pe;
              default:
                var Pe = pe && pe.$$typeof;
                switch (Pe) {
                  case h:
                  case C:
                  case j:
                  case F:
                  case v:
                    return Pe;
                  default:
                    return Se;
                }
            }
          case n:
            return Se;
        }
      }
    }
    var l = S, U = y, I = h, Te = v, ie = t, Me = C, Oe = a, _e = j, Ee = F, Ae = n, le = c, fe = u, we = b, Le = !1;
    function q(_) {
      return Le || (Le = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), i(_) || z(_) === S;
    }
    function i(_) {
      return z(_) === y;
    }
    function d(_) {
      return z(_) === h;
    }
    function O(_) {
      return z(_) === v;
    }
    function T(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === t;
    }
    function $(_) {
      return z(_) === C;
    }
    function K(_) {
      return z(_) === a;
    }
    function x(_) {
      return z(_) === j;
    }
    function ue(_) {
      return z(_) === F;
    }
    function J(_) {
      return z(_) === n;
    }
    function xe(_) {
      return z(_) === c;
    }
    function He(_) {
      return z(_) === u;
    }
    function Ye(_) {
      return z(_) === b;
    }
    X.AsyncMode = l, X.ConcurrentMode = U, X.ContextConsumer = I, X.ContextProvider = Te, X.Element = ie, X.ForwardRef = Me, X.Fragment = Oe, X.Lazy = _e, X.Memo = Ee, X.Portal = Ae, X.Profiler = le, X.StrictMode = fe, X.Suspense = we, X.isAsyncMode = q, X.isConcurrentMode = i, X.isContextConsumer = d, X.isContextProvider = O, X.isElement = T, X.isForwardRef = $, X.isFragment = K, X.isLazy = x, X.isMemo = ue, X.isPortal = J, X.isProfiler = xe, X.isStrictMode = He, X.isSuspense = Ye, X.isValidElementType = Y, X.typeOf = z;
  }()), X;
}
var vt;
function kn() {
  return vt || (vt = 1, process.env.NODE_ENV === "production" ? pr.exports = Pn() : pr.exports = $n()), pr.exports;
}
var Or, pt;
function Nn() {
  if (pt) return Or;
  pt = 1;
  var e = kn(), t = {
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
  }, a = {
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
  c[e.ForwardRef] = a, c[e.Memo] = u;
  function v(j) {
    return e.isMemo(j) ? u : c[j.$$typeof] || t;
  }
  var h = Object.defineProperty, S = Object.getOwnPropertyNames, y = Object.getOwnPropertySymbols, C = Object.getOwnPropertyDescriptor, b = Object.getPrototypeOf, ee = Object.prototype;
  function F(j, P, H) {
    if (typeof P != "string") {
      if (ee) {
        var L = b(P);
        L && L !== ee && F(j, L, H);
      }
      var W = S(P);
      y && (W = W.concat(y(P)));
      for (var Y = v(j), z = v(P), l = 0; l < W.length; ++l) {
        var U = W[l];
        if (!n[U] && !(H && H[U]) && !(z && z[U]) && !(Y && Y[U])) {
          var I = C(P, U);
          try {
            h(j, U, I);
          } catch {
          }
        }
      }
    }
    return j;
  }
  return Or = F, Or;
}
Nn();
var jn = !0;
function Mn(e, t, n) {
  var a = "";
  return n.split(" ").forEach(function(u) {
    e[u] !== void 0 ? t.push(e[u] + ";") : u && (a += u + " ");
  }), a;
}
var jt = function(t, n, a) {
  var u = t.key + "-" + n.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (a === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  jn === !1) && t.registered[u] === void 0 && (t.registered[u] = n.styles);
}, Ln = function(t, n, a) {
  jt(t, n, a);
  var u = t.key + "-" + n.name;
  if (t.inserted[n.name] === void 0) {
    var c = n;
    do
      t.insert(n === c ? "." + u : "", c, t.sheet, !0), c = c.next;
    while (c !== void 0);
  }
};
function Yn(e) {
  for (var t = 0, n, a = 0, u = e.length; u >= 4; ++a, u -= 4)
    n = e.charCodeAt(a) & 255 | (e.charCodeAt(++a) & 255) << 8 | (e.charCodeAt(++a) & 255) << 16 | (e.charCodeAt(++a) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (u) {
    case 3:
      t ^= (e.charCodeAt(a + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(a + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(a) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var In = {
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
}, Hn = !1, Wn = /[A-Z]|^ms/g, Un = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Mt = function(t) {
  return t.charCodeAt(1) === 45;
}, ht = function(t) {
  return t != null && typeof t != "boolean";
}, Ar = /* @__PURE__ */ _n(function(e) {
  return Mt(e) ? e : e.replace(Wn, "-$&").toLowerCase();
}), mt = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(Un, function(a, u, c) {
          return Ne = {
            name: u,
            styles: c,
            next: Ne
          }, u;
        });
  }
  return In[t] !== 1 && !Mt(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
}, zn = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function nr(e, t, n) {
  if (n == null)
    return "";
  var a = n;
  if (a.__emotion_styles !== void 0)
    return a;
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      var u = n;
      if (u.anim === 1)
        return Ne = {
          name: u.name,
          styles: u.styles,
          next: Ne
        }, u.name;
      var c = n;
      if (c.styles !== void 0) {
        var v = c.next;
        if (v !== void 0)
          for (; v !== void 0; )
            Ne = {
              name: v.name,
              styles: v.styles,
              next: Ne
            }, v = v.next;
        var h = c.styles + ";";
        return h;
      }
      return qn(e, t, n);
    }
    case "function": {
      if (e !== void 0) {
        var S = Ne, y = n(e);
        return Ne = S, nr(e, t, y);
      }
      break;
    }
  }
  var C = n;
  return C;
}
function qn(e, t, n) {
  var a = "";
  if (Array.isArray(n))
    for (var u = 0; u < n.length; u++)
      a += nr(e, t, n[u]) + ";";
  else
    for (var c in n) {
      var v = n[c];
      if (typeof v != "object") {
        var h = v;
        ht(h) && (a += Ar(c) + ":" + mt(c, h) + ";");
      } else {
        if (c === "NO_COMPONENT_SELECTOR" && Hn)
          throw new Error(zn);
        if (Array.isArray(v) && typeof v[0] == "string" && t == null)
          for (var S = 0; S < v.length; S++)
            ht(v[S]) && (a += Ar(c) + ":" + mt(c, v[S]) + ";");
        else {
          var y = nr(e, t, v);
          switch (c) {
            case "animation":
            case "animationName": {
              a += Ar(c) + ":" + y + ";";
              break;
            }
            default:
              a += c + "{" + y + "}";
          }
        }
      }
    }
  return a;
}
var yt = /label:\s*([^\s;{]+)\s*(;|$)/g, Ne;
function Lt(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var a = !0, u = "";
  Ne = void 0;
  var c = e[0];
  if (c == null || c.raw === void 0)
    a = !1, u += nr(n, t, c);
  else {
    var v = c;
    u += v[0];
  }
  for (var h = 1; h < e.length; h++)
    if (u += nr(n, t, e[h]), a) {
      var S = c;
      u += S[h];
    }
  yt.lastIndex = 0;
  for (var y = "", C; (C = yt.exec(u)) !== null; )
    y += "-" + C[1];
  var b = Yn(u) + y;
  return {
    name: b,
    styles: u,
    next: Ne
  };
}
var Dn = function(t) {
  return t();
}, Gn = it.useInsertionEffect ? it.useInsertionEffect : !1, Bn = Gn || Dn, Fn = !1, Yt = /* @__PURE__ */ te.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ xn({
    key: "css"
  }) : null
);
Yt.Provider;
var Kn = function(t) {
  return /* @__PURE__ */ te.forwardRef(function(n, a) {
    var u = te.useContext(Yt);
    return t(n, u, a);
  });
}, Vn = /* @__PURE__ */ te.createContext({}), ar = {}.hasOwnProperty, Nr = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Hr = function(t, n) {
  var a = {};
  for (var u in n)
    ar.call(n, u) && (a[u] = n[u]);
  return a[Nr] = t, a;
}, Xn = function(t) {
  var n = t.cache, a = t.serialized, u = t.isStringTag;
  return jt(n, a, u), Bn(function() {
    return Ln(n, a, u);
  }), null;
}, Qn = /* @__PURE__ */ Kn(function(e, t, n) {
  var a = e.css;
  typeof a == "string" && t.registered[a] !== void 0 && (a = t.registered[a]);
  var u = e[Nr], c = [a], v = "";
  typeof e.className == "string" ? v = Mn(t.registered, c, e.className) : e.className != null && (v = e.className + " ");
  var h = Lt(c, void 0, te.useContext(Vn));
  v += t.key + "-" + h.name;
  var S = {};
  for (var y in e)
    ar.call(e, y) && y !== "css" && y !== Nr && !Fn && (S[y] = e[y]);
  return S.className = v, n && (S.ref = n), /* @__PURE__ */ te.createElement(te.Fragment, null, /* @__PURE__ */ te.createElement(Xn, {
    cache: t,
    serialized: h,
    isStringTag: typeof u == "string"
  }), /* @__PURE__ */ te.createElement(u, S));
}), Wr = Qn, It = er.Fragment, ye = function(t, n, a) {
  return ar.call(n, "css") ? er.jsx(Wr, Hr(t, n), a) : er.jsx(t, n, a);
}, Jn = function(t, n, a) {
  return ar.call(n, "css") ? er.jsxs(Wr, Hr(t, n), a) : er.jsxs(t, n, a);
};
function Zn({ cmn: { styChild: e, sys: t }, fn: n }) {
  return /* @__PURE__ */ ye(It, { children: /* @__PURE__ */ ye("img", { css: e, src: ((u) => t.cfg.searchPath(u, Dt.SP_GSM))(n) }) });
}
function eo({ cmn: { styChild: e } }) {
  return /* @__PURE__ */ ye("div", { css: e, children: /* @__PURE__ */ ye("span", {}) });
}
const gt = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), a = (y, C) => {
    const b = typeof y == "function" ? y(t) : y;
    if (!Object.is(b, t)) {
      const ee = t;
      t = C ?? (typeof b != "object" || b === null) ? b : Object.assign({}, t, b), n.forEach((F) => F(t, ee));
    }
  }, u = () => t, h = { setState: a, getState: u, getInitialState: () => S, subscribe: (y) => (n.add(y), () => n.delete(y)) }, S = t = e(a, u, h);
  return h;
}, ro = (e) => e ? gt(e) : gt, to = (e) => e;
function no(e, t = to) {
  const n = Pr.useSyncExternalStore(
    e.subscribe,
    () => t(e.getState()),
    () => t(e.getInitialState())
  );
  return Pr.useDebugValue(n), n;
}
const oo = (e) => {
  const t = ro(e), n = (a) => no(t, a);
  return Object.assign(n, t), n;
}, ao = (e) => oo, Er = ao()((e) => ({
  // わざとカーリー化
  txt: "",
  addTxt: (t) => e((n) => ({ txt: n.txt + t })),
  clearTxt: () => e(() => ({ txt: "" })),
  aLay: [],
  replace: (t) => e((n) => ({ aLay: JSON.parse(t) })),
  addLayer: (t) => e((n) => ({ aLay: [...n.aLay, t] })),
  chgPic: ({ nm: t, fn: n }) => e((a) => {
    const u = [...a.aLay], c = u.find((v) => v.nm === t);
    if (!c) throw `存在しないレイヤ ${t} です`;
    if (c.cls !== "GRP") throw `${t} は画像レイヤではありません`;
    return c.fn = n, { aLay: u };
  })
}));
var Et = function(t, n) {
  var a = arguments;
  if (n == null || !ar.call(n, "css"))
    return te.createElement.apply(void 0, a);
  var u = a.length, c = new Array(u);
  c[0] = Wr, c[1] = Hr(t, n);
  for (var v = 2; v < u; v++)
    c[v] = a[v];
  return te.createElement.apply(null, c);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(Et || (Et = {}));
function xr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return Lt(t);
}
function so({ arg: { sys: e, heStage: t }, onClick: n }) {
  const a = Er((b) => b.aLay);
  jr = JSON.stringify(a), console.log(`fn:Stage.tsx 0 stt=${jr}`), _t(), te.useEffect(() => {
    _t = () => e.caretaker.update();
  }, []);
  const u = Er((b) => b.replace);
  te.useEffect(() => {
    Ht = t, t.addEventListener("restore", (b) => {
      u(b.detail);
    });
  }, []);
  const [c, v] = te.useState(bt());
  te.useEffect(() => {
    function b() {
      v(bt());
    }
    return globalThis.addEventListener("resize", b), () => globalThis.removeEventListener("resize", b);
  }, []);
  const { cvsScale: h } = io(c), S = xr`
		position: relative;

		transform-origin: left top;
		transform: scale(${h});
		width	: calc(${me.stageW}px / ${h});
		height	: calc(${me.stageH}px / ${h});
`, y = xr`position: absolute; top: 0; left: 0;`, C = xr`
position: relative; z-index: 1;

display: inline-block;
text-align: center;
vertical-align: middle;
text-decoration: none;
width: 120px;
margin: auto;
padding: 1rem 4rem;
font-weight: bold;
border: 2px solid #27acd9;
color: #27acd9;
border-radius: 100vh;
transition: 0.5s;
&:hover {
	color: #fff;
	background: #27acd9;
}`;
  return /* @__PURE__ */ Jn("div", { css: S, onClick: () => n(), children: [
    /* @__PURE__ */ ye("button", { onClick: () => {
    }, css: C, children: "Click" }),
    /* @__PURE__ */ ye("button", { onClick: () => {
    }, css: C, children: "Back" }),
    /* @__PURE__ */ ye("button", { onClick: () => {
    }, css: C, children: "Prev" }),
    a.map((b) => b.cls === "GRP" ? /* @__PURE__ */ ye(Zn, { cmn: { sys: e, styChild: y }, fn: b.fn }, b.nm) : /* @__PURE__ */ ye(eo, { cmn: { sys: e, styChild: y }, str: "てすと" }, b.nm))
  ] });
}
function io({ width: e, height: t }) {
  let n = 0, a = 0, u = 1;
  return me.stageW > e || me.stageH > t ? (me.stageW / me.stageH <= e / t ? (a = t, n = et(me.stageW / me.stageH * t)) : (n = e, a = et(me.stageH / me.stageW * e)), u = n / me.stageW) : (n = me.stageW, a = me.stageH, u = 1), { cvsScale: u, cvsWidth: n, cvsHeight: a };
}
function bt() {
  const { innerWidth: e, innerHeight: t } = globalThis;
  return { width: e, height: t };
}
let Ht, _t = () => {
};
class uo extends Gt {
  nm = "Stage";
  restore() {
    console.log("fn:Stage.tsx line:162 / restore /"), Ht.dispatchEvent(new CustomEvent("restore", { detail: this.stt }));
  }
}
let jr = "";
const Wt = () => new uo(jr), co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: so,
  save: Wt
}, Symbol.toStringTag, { value: "Module" }));
var fo = function() {
};
function lo(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  e && e.addEventListener && e.addEventListener.apply(e, t);
}
function vo(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var po = typeof window < "u", ho = po ? window : null, wt = function(e) {
  return !!e.addEventListener;
}, St = function(e) {
  return !!e.on;
}, mo = function(e, t, n, a) {
  n === void 0 && (n = ho), te.useEffect(function() {
    if (t && n)
      return wt(n) ? lo(n, e, t, a) : St(n) && n.on(e, t, a), function() {
        wt(n) ? vo(n, e, t, a) : St(n) && n.off(e, t, a);
      };
  }, [e, t, n, JSON.stringify(a)]);
}, yo = function(e) {
  return typeof e == "function" ? e : typeof e == "string" ? function(t) {
    return t.key === e;
  } : e ? function() {
    return !0;
  } : function() {
    return !1;
  };
}, Ct = function(e, t, n, a) {
  t === void 0 && (t = fo), n === void 0 && (n = {}), a === void 0 && (a = [e]);
  var u = n.event, c = u === void 0 ? "keydown" : u, v = n.target, h = n.options, S = te.useMemo(function() {
    var y = yo(e), C = function(b) {
      if (y(b))
        return t(b);
    };
    return C;
  }, a);
  mo(c, S, v, h);
}, Ut = /* @__PURE__ */ ((e) => (e.Renderer = "renderer", e.Application = "application", e.RendererSystem = "renderer-webgl-system", e.RendererPlugin = "renderer-webgl-plugin", e.CanvasRendererSystem = "renderer-canvas-system", e.CanvasRendererPlugin = "renderer-canvas-plugin", e.Asset = "asset", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser", e))(Ut || {});
const Mr = (e) => {
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
}, Rt = (e, t) => Mr(e).priority ?? t, go = {
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
    return e.map(Mr).forEach((t) => {
      t.type.forEach((n) => this._removeHandlers[n]?.(t));
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...e) {
    return e.map(Mr).forEach((t) => {
      t.type.forEach((n) => {
        const a = this._addHandlers, u = this._queue;
        a[n] ? a[n]?.(t) : (u[n] = u[n] || [], u[n]?.push(t));
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
    const a = this._addHandlers, u = this._removeHandlers;
    if (a[e] || u[e])
      throw new Error(`Extension type ${e} already has a handler`);
    a[e] = t, u[e] = n;
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
      (a) => {
        t.includes(a.ref) || (t.push(a.ref), t.sort((u, c) => Rt(c, n) - Rt(u, n)));
      },
      (a) => {
        const u = t.indexOf(a.ref);
        u !== -1 && t.splice(u, 1);
      }
    );
  }
};
async function Eo({ heStage: e, sys: t }) {
  const { createRoot: n } = await import("./client.js").then((a) => a.c);
  n(e).render(/* @__PURE__ */ ye(bo, { heStage: e, sys: t })), await Promise.all([
    import("./index.js"),
    import("./ScriptMng.js")
  ]).then(async ([{ Assets: a }, { ScriptMng: u }]) => {
    await a.init({ basePath: location.origin }), go.add({
      extension: {
        type: Ut.LoadParser,
        name: "sn-loader"
        //priority: LoaderParserPriority.High,
      },
      test: (v) => v.endsWith(".sn"),
      load: (v) => new Promise(async (h, S) => {
        const y = await fetch(v);
        if (!y.ok) {
          S("sn-loader fetch err:" + y.statusText);
          return;
        }
        try {
          h(await t.dec("sn", await y.text()));
        } catch (C) {
          S(`sn-loader err url:${v} ${C}`);
        }
      })
    }), await new u(t, a).load("main");
  });
}
function bo({ heStage: e, sys: t }) {
  const n = Er((v) => v.addLayer), a = Er((v) => v.chgPic);
  function u() {
    if (!t.caretaker.afterKey())
      for (console.log("fn:Main.tsx == next =="); ; ) {
        const { done: v, value: h } = wo.next();
        if (v) break;
        const S = t.caretaker.key = "main:" + ++_o;
        console.log(`fn:Main.tsx == line:75 key(${S}) CMD:%o`, h), "cls" in h ? n(h) : a(h);
        break;
      }
  }
  te.useEffect(() => {
    t.caretaker.add(Wt), u();
  }, []), Ct("ArrowDown", (v) => {
    console.log("ArrowDown"), v.stopPropagation(), v.preventDefault(), u();
  }), Ct("ArrowUp", (v) => {
    console.log("ArrowUp"), v.stopPropagation(), v.preventDefault(), t.caretaker.beforeKey();
  });
  const c = te.lazy(() => Promise.resolve().then(() => co));
  return /* @__PURE__ */ ye(te.Suspense, { fallback: /* @__PURE__ */ ye(It, { children: "Loading" }), children: /* @__PURE__ */ ye(c, { arg: { heStage: e, sys: t }, onClick: u }) });
}
let _o = 0;
const wo = So();
function* So() {
  yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
}
const Ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  opening: Eo
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ut as E,
  Ro as M,
  go as e,
  Tt as r
};
//# sourceMappingURL=Main.js.map
