import { g as bf, S as xf, C as pr, B as _f, u as no } from "./web2.js";
function Cf(t, r) {
  for (var e = 0; e < r.length; e++) {
    const n = r[e];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const a in n)
        if (a !== "default" && !(a in t)) {
          const i = Object.getOwnPropertyDescriptor(n, a);
          i && Object.defineProperty(t, a, i.get ? i : {
            enumerable: !0,
            get: () => n[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var Sn = { exports: {} }, Ae = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ao;
function wf() {
  if (ao) return Ae;
  ao = 1;
  var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function e(n, a, i) {
    var o = null;
    if (i !== void 0 && (o = "" + i), a.key !== void 0 && (o = "" + a.key), "key" in a) {
      i = {};
      for (var s in a)
        s !== "key" && (i[s] = a[s]);
    } else i = a;
    return a = i.ref, {
      $$typeof: t,
      type: n,
      key: o,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return Ae.Fragment = r, Ae.jsx = e, Ae.jsxs = e, Ae;
}
var Ie = {}, bn = { exports: {} }, Ct = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var io;
function Df() {
  if (io) return Ct;
  io = 1;
  var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), o = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), l = Symbol.for("react.lazy"), c = Symbol.iterator;
  function v(D) {
    return D === null || typeof D != "object" ? null : (D = c && D[c] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var d = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, p = Object.assign, h = {};
  function g(D, T, F) {
    this.props = D, this.context = T, this.refs = h, this.updater = F || d;
  }
  g.prototype.isReactComponent = {}, g.prototype.setState = function(D, T) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, T, "setState");
  }, g.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function y() {
  }
  y.prototype = g.prototype;
  function S(D, T, F) {
    this.props = D, this.context = T, this.refs = h, this.updater = F || d;
  }
  var b = S.prototype = new y();
  b.constructor = S, p(b, g.prototype), b.isPureReactComponent = !0;
  var x = Array.isArray, E = { H: null, A: null, T: null, S: null }, _ = Object.prototype.hasOwnProperty;
  function C(D, T, F, W, Y, K) {
    return F = K.ref, {
      $$typeof: t,
      type: D,
      key: T,
      ref: F !== void 0 ? F : null,
      props: K
    };
  }
  function w(D, T) {
    return C(
      D.type,
      T,
      void 0,
      void 0,
      void 0,
      D.props
    );
  }
  function R(D) {
    return typeof D == "object" && D !== null && D.$$typeof === t;
  }
  function M(D) {
    var T = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(F) {
      return T[F];
    });
  }
  var G = /\/+/g;
  function z(D, T) {
    return typeof D == "object" && D !== null && D.key != null ? M("" + D.key) : T.toString(36);
  }
  function A() {
  }
  function N(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(A, A) : (D.status = "pending", D.then(
          function(T) {
            D.status === "pending" && (D.status = "fulfilled", D.value = T);
          },
          function(T) {
            D.status === "pending" && (D.status = "rejected", D.reason = T);
          }
        )), D.status) {
          case "fulfilled":
            return D.value;
          case "rejected":
            throw D.reason;
        }
    }
    throw D;
  }
  function B(D, T, F, W, Y) {
    var K = typeof D;
    (K === "undefined" || K === "boolean") && (D = null);
    var L = !1;
    if (D === null) L = !0;
    else
      switch (K) {
        case "bigint":
        case "string":
        case "number":
          L = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case t:
            case r:
              L = !0;
              break;
            case l:
              return L = D._init, B(
                L(D._payload),
                T,
                F,
                W,
                Y
              );
          }
      }
    if (L)
      return Y = Y(D), L = W === "" ? "." + z(D, 0) : W, x(Y) ? (F = "", L != null && (F = L.replace(G, "$&/") + "/"), B(Y, T, F, "", function(pt) {
        return pt;
      })) : Y != null && (R(Y) && (Y = w(
        Y,
        F + (Y.key == null || D && D.key === Y.key ? "" : ("" + Y.key).replace(
          G,
          "$&/"
        ) + "/") + L
      )), T.push(Y)), 1;
    L = 0;
    var et = W === "" ? "." : W + ":";
    if (x(D))
      for (var rt = 0; rt < D.length; rt++)
        W = D[rt], K = et + z(W, rt), L += B(
          W,
          T,
          F,
          K,
          Y
        );
    else if (rt = v(D), typeof rt == "function")
      for (D = rt.call(D), rt = 0; !(W = D.next()).done; )
        W = W.value, K = et + z(W, rt++), L += B(
          W,
          T,
          F,
          K,
          Y
        );
    else if (K === "object") {
      if (typeof D.then == "function")
        return B(
          N(D),
          T,
          F,
          W,
          Y
        );
      throw T = String(D), Error(
        "Objects are not valid as a React child (found: " + (T === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : T) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return L;
  }
  function X(D, T, F) {
    if (D == null) return D;
    var W = [], Y = 0;
    return B(D, W, "", "", function(K) {
      return T.call(F, K, Y++);
    }), W;
  }
  function U(D) {
    if (D._status === -1) {
      var T = D._result;
      T = T(), T.then(
        function(F) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = F);
        },
        function(F) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = F);
        }
      ), D._status === -1 && (D._status = 0, D._result = T);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var j = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var T = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(T)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  };
  function $() {
  }
  return Ct.Children = {
    map: X,
    forEach: function(D, T, F) {
      X(
        D,
        function() {
          T.apply(this, arguments);
        },
        F
      );
    },
    count: function(D) {
      var T = 0;
      return X(D, function() {
        T++;
      }), T;
    },
    toArray: function(D) {
      return X(D, function(T) {
        return T;
      }) || [];
    },
    only: function(D) {
      if (!R(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  }, Ct.Component = g, Ct.Fragment = e, Ct.Profiler = a, Ct.PureComponent = S, Ct.StrictMode = n, Ct.Suspense = u, Ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = E, Ct.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, Ct.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, Ct.cloneElement = function(D, T, F) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var W = p({}, D.props), Y = D.key, K = void 0;
    if (T != null)
      for (L in T.ref !== void 0 && (K = void 0), T.key !== void 0 && (Y = "" + T.key), T)
        !_.call(T, L) || L === "key" || L === "__self" || L === "__source" || L === "ref" && T.ref === void 0 || (W[L] = T[L]);
    var L = arguments.length - 2;
    if (L === 1) W.children = F;
    else if (1 < L) {
      for (var et = Array(L), rt = 0; rt < L; rt++)
        et[rt] = arguments[rt + 2];
      W.children = et;
    }
    return C(D.type, Y, void 0, void 0, K, W);
  }, Ct.createContext = function(D) {
    return D = {
      $$typeof: o,
      _currentValue: D,
      _currentValue2: D,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, D.Provider = D, D.Consumer = {
      $$typeof: i,
      _context: D
    }, D;
  }, Ct.createElement = function(D, T, F) {
    var W, Y = {}, K = null;
    if (T != null)
      for (W in T.key !== void 0 && (K = "" + T.key), T)
        _.call(T, W) && W !== "key" && W !== "__self" && W !== "__source" && (Y[W] = T[W]);
    var L = arguments.length - 2;
    if (L === 1) Y.children = F;
    else if (1 < L) {
      for (var et = Array(L), rt = 0; rt < L; rt++)
        et[rt] = arguments[rt + 2];
      Y.children = et;
    }
    if (D && D.defaultProps)
      for (W in L = D.defaultProps, L)
        Y[W] === void 0 && (Y[W] = L[W]);
    return C(D, K, void 0, void 0, null, Y);
  }, Ct.createRef = function() {
    return { current: null };
  }, Ct.forwardRef = function(D) {
    return { $$typeof: s, render: D };
  }, Ct.isValidElement = R, Ct.lazy = function(D) {
    return {
      $$typeof: l,
      _payload: { _status: -1, _result: D },
      _init: U
    };
  }, Ct.memo = function(D, T) {
    return {
      $$typeof: f,
      type: D,
      compare: T === void 0 ? null : T
    };
  }, Ct.startTransition = function(D) {
    var T = E.T, F = {};
    E.T = F;
    try {
      var W = D(), Y = E.S;
      Y !== null && Y(F, W), typeof W == "object" && W !== null && typeof W.then == "function" && W.then($, j);
    } catch (K) {
      j(K);
    } finally {
      E.T = T;
    }
  }, Ct.unstable_useCacheRefresh = function() {
    return E.H.useCacheRefresh();
  }, Ct.use = function(D) {
    return E.H.use(D);
  }, Ct.useActionState = function(D, T, F) {
    return E.H.useActionState(D, T, F);
  }, Ct.useCallback = function(D, T) {
    return E.H.useCallback(D, T);
  }, Ct.useContext = function(D) {
    return E.H.useContext(D);
  }, Ct.useDebugValue = function() {
  }, Ct.useDeferredValue = function(D, T) {
    return E.H.useDeferredValue(D, T);
  }, Ct.useEffect = function(D, T) {
    return E.H.useEffect(D, T);
  }, Ct.useId = function() {
    return E.H.useId();
  }, Ct.useImperativeHandle = function(D, T, F) {
    return E.H.useImperativeHandle(D, T, F);
  }, Ct.useInsertionEffect = function(D, T) {
    return E.H.useInsertionEffect(D, T);
  }, Ct.useLayoutEffect = function(D, T) {
    return E.H.useLayoutEffect(D, T);
  }, Ct.useMemo = function(D, T) {
    return E.H.useMemo(D, T);
  }, Ct.useOptimistic = function(D, T) {
    return E.H.useOptimistic(D, T);
  }, Ct.useReducer = function(D, T, F) {
    return E.H.useReducer(D, T, F);
  }, Ct.useRef = function(D) {
    return E.H.useRef(D);
  }, Ct.useState = function(D) {
    return E.H.useState(D);
  }, Ct.useSyncExternalStore = function(D, T, F) {
    return E.H.useSyncExternalStore(
      D,
      T,
      F
    );
  }, Ct.useTransition = function() {
    return E.H.useTransition();
  }, Ct.version = "19.0.0", Ct;
}
var ze = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
ze.exports;
var oo;
function Rf() {
  return oo || (oo = 1, function(t, r) {
    process.env.NODE_ENV !== "production" && function() {
      function e(m, k) {
        Object.defineProperty(i.prototype, m, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              k[0],
              k[1]
            );
          }
        });
      }
      function n(m) {
        return m === null || typeof m != "object" ? null : (m = mt && m[mt] || m["@@iterator"], typeof m == "function" ? m : null);
      }
      function a(m, k) {
        m = (m = m.constructor) && (m.displayName || m.name) || "ReactClass";
        var q = m + "." + k;
        Rt[q] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          k,
          m
        ), Rt[q] = !0);
      }
      function i(m, k, q) {
        this.props = m, this.context = k, this.refs = nt, this.updater = q || O;
      }
      function o() {
      }
      function s(m, k, q) {
        this.props = m, this.context = k, this.refs = nt, this.updater = q || O;
      }
      function u(m) {
        return "" + m;
      }
      function f(m) {
        try {
          u(m);
          var k = !1;
        } catch {
          k = !0;
        }
        if (k) {
          k = console;
          var q = k.error, tt = typeof Symbol == "function" && Symbol.toStringTag && m[Symbol.toStringTag] || m.constructor.name || "Object";
          return q.call(
            k,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            tt
          ), u(m);
        }
      }
      function l(m) {
        if (m == null) return null;
        if (typeof m == "function")
          return m.$$typeof === ht ? null : m.displayName || m.name || null;
        if (typeof m == "string") return m;
        switch (m) {
          case rt:
            return "Fragment";
          case et:
            return "Portal";
          case Et:
            return "Profiler";
          case pt:
            return "StrictMode";
          case ut:
            return "Suspense";
          case vt:
            return "SuspenseList";
        }
        if (typeof m == "object")
          switch (typeof m.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), m.$$typeof) {
            case H:
              return (m.displayName || "Context") + ".Provider";
            case J:
              return (m._context.displayName || "Context") + ".Consumer";
            case bt:
              var k = m.render;
              return m = m.displayName, m || (m = k.displayName || k.name || "", m = m !== "" ? "ForwardRef(" + m + ")" : "ForwardRef"), m;
            case gt:
              return k = m.displayName || null, k !== null ? k : l(m.type) || "Memo";
            case wt:
              k = m._payload, m = m._init;
              try {
                return l(m(k));
              } catch {
              }
          }
        return null;
      }
      function c(m) {
        return typeof m == "string" || typeof m == "function" || m === rt || m === Et || m === pt || m === ut || m === vt || m === Mt || typeof m == "object" && m !== null && (m.$$typeof === wt || m.$$typeof === gt || m.$$typeof === H || m.$$typeof === J || m.$$typeof === bt || m.$$typeof === Xt || m.getModuleId !== void 0);
      }
      function v() {
      }
      function d() {
        if (Kt === 0) {
          Er = console.log, dr = console.info, Tr = console.warn, tr = console.error, cn = console.group, vn = console.groupCollapsed, dn = console.groupEnd;
          var m = {
            configurable: !0,
            enumerable: !0,
            value: v,
            writable: !0
          };
          Object.defineProperties(console, {
            info: m,
            log: m,
            warn: m,
            error: m,
            group: m,
            groupCollapsed: m,
            groupEnd: m
          });
        }
        Kt++;
      }
      function p() {
        if (Kt--, Kt === 0) {
          var m = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: Q({}, m, { value: Er }),
            info: Q({}, m, { value: dr }),
            warn: Q({}, m, { value: Tr }),
            error: Q({}, m, { value: tr }),
            group: Q({}, m, { value: cn }),
            groupCollapsed: Q({}, m, { value: vn }),
            groupEnd: Q({}, m, { value: dn })
          });
        }
        0 > Kt && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function h(m) {
        if (Ur === void 0)
          try {
            throw Error();
          } catch (q) {
            var k = q.stack.trim().match(/\n( *(at )?)/);
            Ur = k && k[1] || "", zt = -1 < q.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < q.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + Ur + m + zt;
      }
      function g(m, k) {
        if (!m || qt) return "";
        var q = fe.get(m);
        if (q !== void 0) return q;
        qt = !0, q = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var tt = null;
        tt = dt.H, dt.H = null, d();
        try {
          var it = {
            DetermineComponentFrameRoot: function() {
              try {
                if (k) {
                  var Mr = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(Mr.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(Mr, []);
                    } catch (Gr) {
                      var En = Gr;
                    }
                    Reflect.construct(m, [], Mr);
                  } else {
                    try {
                      Mr.call();
                    } catch (Gr) {
                      En = Gr;
                    }
                    m.call(Mr.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (Gr) {
                    En = Gr;
                  }
                  (Mr = m()) && typeof Mr.catch == "function" && Mr.catch(function() {
                  });
                }
              } catch (Gr) {
                if (Gr && En && typeof Gr.stack == "string")
                  return [Gr.stack, En.stack];
              }
              return [null, null];
            }
          };
          it.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var lt = Object.getOwnPropertyDescriptor(
            it.DetermineComponentFrameRoot,
            "name"
          );
          lt && lt.configurable && Object.defineProperty(
            it.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var ot = it.DetermineComponentFrameRoot(), Gt = ot[0], Ot = ot[1];
          if (Gt && Ot) {
            var Yt = Gt.split(`
`), fr = Ot.split(`
`);
            for (ot = lt = 0; lt < Yt.length && !Yt[lt].includes(
              "DetermineComponentFrameRoot"
            ); )
              lt++;
            for (; ot < fr.length && !fr[ot].includes(
              "DetermineComponentFrameRoot"
            ); )
              ot++;
            if (lt === Yt.length || ot === fr.length)
              for (lt = Yt.length - 1, ot = fr.length - 1; 1 <= lt && 0 <= ot && Yt[lt] !== fr[ot]; )
                ot--;
            for (; 1 <= lt && 0 <= ot; lt--, ot--)
              if (Yt[lt] !== fr[ot]) {
                if (lt !== 1 || ot !== 1)
                  do
                    if (lt--, ot--, 0 > ot || Yt[lt] !== fr[ot]) {
                      var Kr = `
` + Yt[lt].replace(
                        " at new ",
                        " at "
                      );
                      return m.displayName && Kr.includes("<anonymous>") && (Kr = Kr.replace("<anonymous>", m.displayName)), typeof m == "function" && fe.set(m, Kr), Kr;
                    }
                  while (1 <= lt && 0 <= ot);
                break;
              }
          }
        } finally {
          qt = !1, dt.H = tt, p(), Error.prepareStackTrace = q;
        }
        return Yt = (Yt = m ? m.displayName || m.name : "") ? h(Yt) : "", typeof m == "function" && fe.set(m, Yt), Yt;
      }
      function y(m) {
        if (m == null) return "";
        if (typeof m == "function") {
          var k = m.prototype;
          return g(
            m,
            !(!k || !k.isReactComponent)
          );
        }
        if (typeof m == "string") return h(m);
        switch (m) {
          case ut:
            return h("Suspense");
          case vt:
            return h("SuspenseList");
        }
        if (typeof m == "object")
          switch (m.$$typeof) {
            case bt:
              return m = g(m.render, !1), m;
            case gt:
              return y(m.type);
            case wt:
              k = m._payload, m = m._init;
              try {
                return y(m(k));
              } catch {
              }
          }
        return "";
      }
      function S() {
        var m = dt.A;
        return m === null ? null : m.getOwner();
      }
      function b(m) {
        if (ur.call(m, "key")) {
          var k = Object.getOwnPropertyDescriptor(m, "key").get;
          if (k && k.isReactWarning) return !1;
        }
        return m.key !== void 0;
      }
      function x(m, k) {
        function q() {
          hn || (hn = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            k
          ));
        }
        q.isReactWarning = !0, Object.defineProperty(m, "key", {
          get: q,
          configurable: !0
        });
      }
      function E() {
        var m = l(this.type);
        return Ki[m] || (Ki[m] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), m = this.props.ref, m !== void 0 ? m : null;
      }
      function _(m, k, q, tt, it, lt) {
        return q = lt.ref, m = {
          $$typeof: L,
          type: m,
          key: k,
          props: lt,
          _owner: it
        }, (q !== void 0 ? q : null) !== null ? Object.defineProperty(m, "ref", {
          enumerable: !1,
          get: E
        }) : Object.defineProperty(m, "ref", { enumerable: !1, value: null }), m._store = {}, Object.defineProperty(m._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(m, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.freeze && (Object.freeze(m.props), Object.freeze(m)), m;
      }
      function C(m, k) {
        return k = _(
          m.type,
          k,
          void 0,
          void 0,
          m._owner,
          m.props
        ), k._store.validated = m._store.validated, k;
      }
      function w(m, k) {
        if (typeof m == "object" && m && m.$$typeof !== pn) {
          if (Dt(m))
            for (var q = 0; q < m.length; q++) {
              var tt = m[q];
              R(tt) && M(tt, k);
            }
          else if (R(m))
            m._store && (m._store.validated = 1);
          else if (q = n(m), typeof q == "function" && q !== m.entries && (q = q.call(m), q !== m))
            for (; !(m = q.next()).done; )
              R(m.value) && M(m.value, k);
        }
      }
      function R(m) {
        return typeof m == "object" && m !== null && m.$$typeof === L;
      }
      function M(m, k) {
        if (m._store && !m._store.validated && m.key == null && (m._store.validated = 1, k = G(k), !Zi[k])) {
          Zi[k] = !0;
          var q = "";
          m && m._owner != null && m._owner !== S() && (q = null, typeof m._owner.tag == "number" ? q = l(m._owner.type) : typeof m._owner.name == "string" && (q = m._owner.name), q = " It was passed a child from " + q + ".");
          var tt = dt.getCurrentStack;
          dt.getCurrentStack = function() {
            var it = y(m.type);
            return tt && (it += tt() || ""), it;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            k,
            q
          ), dt.getCurrentStack = tt;
        }
      }
      function G(m) {
        var k = "", q = S();
        return q && (q = l(q.type)) && (k = `

Check the render method of \`` + q + "`."), k || (m = l(m)) && (k = `

Check the top-level render call using <` + m + ">."), k;
      }
      function z(m) {
        var k = { "=": "=0", ":": "=2" };
        return "$" + m.replace(/[=:]/g, function(q) {
          return k[q];
        });
      }
      function A(m, k) {
        return typeof m == "object" && m !== null && m.key != null ? (f(m.key), z("" + m.key)) : k.toString(36);
      }
      function N() {
      }
      function B(m) {
        switch (m.status) {
          case "fulfilled":
            return m.value;
          case "rejected":
            throw m.reason;
          default:
            switch (typeof m.status == "string" ? m.then(N, N) : (m.status = "pending", m.then(
              function(k) {
                m.status === "pending" && (m.status = "fulfilled", m.value = k);
              },
              function(k) {
                m.status === "pending" && (m.status = "rejected", m.reason = k);
              }
            )), m.status) {
              case "fulfilled":
                return m.value;
              case "rejected":
                throw m.reason;
            }
        }
        throw m;
      }
      function X(m, k, q, tt, it) {
        var lt = typeof m;
        (lt === "undefined" || lt === "boolean") && (m = null);
        var ot = !1;
        if (m === null) ot = !0;
        else
          switch (lt) {
            case "bigint":
            case "string":
            case "number":
              ot = !0;
              break;
            case "object":
              switch (m.$$typeof) {
                case L:
                case et:
                  ot = !0;
                  break;
                case wt:
                  return ot = m._init, X(
                    ot(m._payload),
                    k,
                    q,
                    tt,
                    it
                  );
              }
          }
        if (ot) {
          ot = m, it = it(ot);
          var Gt = tt === "" ? "." + A(ot, 0) : tt;
          return Dt(it) ? (q = "", Gt != null && (q = Gt.replace(Qi, "$&/") + "/"), X(it, k, q, "", function(Yt) {
            return Yt;
          })) : it != null && (R(it) && (it.key != null && (ot && ot.key === it.key || f(it.key)), q = C(
            it,
            q + (it.key == null || ot && ot.key === it.key ? "" : ("" + it.key).replace(
              Qi,
              "$&/"
            ) + "/") + Gt
          ), tt !== "" && ot != null && R(ot) && ot.key == null && ot._store && !ot._store.validated && (q._store.validated = 2), it = q), k.push(it)), 1;
        }
        if (ot = 0, Gt = tt === "" ? "." : tt + ":", Dt(m))
          for (var Ot = 0; Ot < m.length; Ot++)
            tt = m[Ot], lt = Gt + A(tt, Ot), ot += X(
              tt,
              k,
              q,
              lt,
              it
            );
        else if (Ot = n(m), typeof Ot == "function")
          for (Ot === m.entries && (Ji || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Ji = !0), m = Ot.call(m), Ot = 0; !(tt = m.next()).done; )
            tt = tt.value, lt = Gt + A(tt, Ot++), ot += X(
              tt,
              k,
              q,
              lt,
              it
            );
        else if (lt === "object") {
          if (typeof m.then == "function")
            return X(
              B(m),
              k,
              q,
              tt,
              it
            );
          throw k = String(m), Error(
            "Objects are not valid as a React child (found: " + (k === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : k) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return ot;
      }
      function U(m, k, q) {
        if (m == null) return m;
        var tt = [], it = 0;
        return X(m, tt, "", "", function(lt) {
          return k.call(q, lt, it++);
        }), tt;
      }
      function j(m) {
        if (m._status === -1) {
          var k = m._result;
          k = k(), k.then(
            function(q) {
              (m._status === 0 || m._status === -1) && (m._status = 1, m._result = q);
            },
            function(q) {
              (m._status === 0 || m._status === -1) && (m._status = 2, m._result = q);
            }
          ), m._status === -1 && (m._status = 0, m._result = k);
        }
        if (m._status === 1)
          return k = m._result, k === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            k
          ), "default" in k || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            k
          ), k.default;
        throw m._result;
      }
      function $() {
        var m = dt.H;
        return m === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), m;
      }
      function D() {
      }
      function T(m) {
        if (gn === null)
          try {
            var k = ("require" + Math.random()).slice(0, 7);
            gn = (t && t[k]).call(
              t,
              "timers"
            ).setImmediate;
          } catch {
            gn = function(tt) {
              ro === !1 && (ro = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var it = new MessageChannel();
              it.port1.onmessage = tt, it.port2.postMessage(void 0);
            };
          }
        return gn(m);
      }
      function F(m) {
        return 1 < m.length && typeof AggregateError == "function" ? new AggregateError(m) : m[0];
      }
      function W(m, k) {
        k !== mn - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), mn = k;
      }
      function Y(m, k, q) {
        var tt = dt.actQueue;
        if (tt !== null)
          if (tt.length !== 0)
            try {
              K(tt), T(function() {
                return Y(m, k, q);
              });
              return;
            } catch (it) {
              dt.thrownErrors.push(it);
            }
          else dt.actQueue = null;
        0 < dt.thrownErrors.length ? (tt = F(dt.thrownErrors), dt.thrownErrors.length = 0, q(tt)) : k(m);
      }
      function K(m) {
        if (!ha) {
          ha = !0;
          var k = 0;
          try {
            for (; k < m.length; k++) {
              var q = m[k];
              do {
                dt.didUsePromise = !1;
                var tt = q(!1);
                if (tt !== null) {
                  if (dt.didUsePromise) {
                    m[k] = q, m.splice(0, k);
                    return;
                  }
                  q = tt;
                } else break;
              } while (!0);
            }
            m.length = 0;
          } catch (it) {
            m.splice(0, k + 1), dt.thrownErrors.push(it);
          } finally {
            ha = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var L = Symbol.for("react.transitional.element"), et = Symbol.for("react.portal"), rt = Symbol.for("react.fragment"), pt = Symbol.for("react.strict_mode"), Et = Symbol.for("react.profiler"), J = Symbol.for("react.consumer"), H = Symbol.for("react.context"), bt = Symbol.for("react.forward_ref"), ut = Symbol.for("react.suspense"), vt = Symbol.for("react.suspense_list"), gt = Symbol.for("react.memo"), wt = Symbol.for("react.lazy"), Mt = Symbol.for("react.offscreen"), mt = Symbol.iterator, Rt = {}, O = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(m) {
          a(m, "forceUpdate");
        },
        enqueueReplaceState: function(m) {
          a(m, "replaceState");
        },
        enqueueSetState: function(m) {
          a(m, "setState");
        }
      }, Q = Object.assign, nt = {};
      Object.freeze(nt), i.prototype.isReactComponent = {}, i.prototype.setState = function(m, k) {
        if (typeof m != "object" && typeof m != "function" && m != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, m, k, "setState");
      }, i.prototype.forceUpdate = function(m) {
        this.updater.enqueueForceUpdate(this, m, "forceUpdate");
      };
      var st = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, _t;
      for (_t in st)
        st.hasOwnProperty(_t) && e(_t, st[_t]);
      o.prototype = i.prototype, st = s.prototype = new o(), st.constructor = s, Q(st, i.prototype), st.isPureReactComponent = !0;
      var Dt = Array.isArray, ht = Symbol.for("react.client.reference"), dt = {
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
      }, ur = Object.prototype.hasOwnProperty, Xt = Symbol.for("react.client.reference"), Kt = 0, Er, dr, Tr, tr, cn, vn, dn;
      v.__reactDisabledLog = !0;
      var Ur, zt, qt = !1, fe = new (typeof WeakMap == "function" ? WeakMap : Map)(), pn = Symbol.for("react.client.reference"), hn, le, Ki = {}, Zi = {}, Ji = !1, Qi = /\/+/g, to = typeof reportError == "function" ? reportError : function(m) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var k = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof m == "object" && m !== null && typeof m.message == "string" ? String(m.message) : String(m),
            error: m
          });
          if (!window.dispatchEvent(k)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", m);
          return;
        }
        console.error(m);
      }, ro = !1, gn = null, mn = 0, yn = !1, ha = !1, eo = typeof queueMicrotask == "function" ? function(m) {
        queueMicrotask(function() {
          return queueMicrotask(m);
        });
      } : T;
      r.Children = {
        map: U,
        forEach: function(m, k, q) {
          U(
            m,
            function() {
              k.apply(this, arguments);
            },
            q
          );
        },
        count: function(m) {
          var k = 0;
          return U(m, function() {
            k++;
          }), k;
        },
        toArray: function(m) {
          return U(m, function(k) {
            return k;
          }) || [];
        },
        only: function(m) {
          if (!R(m))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return m;
        }
      }, r.Component = i, r.Fragment = rt, r.Profiler = Et, r.PureComponent = s, r.StrictMode = pt, r.Suspense = ut, r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = dt, r.act = function(m) {
        var k = dt.actQueue, q = mn;
        mn++;
        var tt = dt.actQueue = k !== null ? k : [], it = !1;
        try {
          var lt = m();
        } catch (Ot) {
          dt.thrownErrors.push(Ot);
        }
        if (0 < dt.thrownErrors.length)
          throw W(k, q), m = F(dt.thrownErrors), dt.thrownErrors.length = 0, m;
        if (lt !== null && typeof lt == "object" && typeof lt.then == "function") {
          var ot = lt;
          return eo(function() {
            it || yn || (yn = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(Ot, Yt) {
              it = !0, ot.then(
                function(fr) {
                  if (W(k, q), q === 0) {
                    try {
                      K(tt), T(function() {
                        return Y(
                          fr,
                          Ot,
                          Yt
                        );
                      });
                    } catch (Mr) {
                      dt.thrownErrors.push(Mr);
                    }
                    if (0 < dt.thrownErrors.length) {
                      var Kr = F(
                        dt.thrownErrors
                      );
                      dt.thrownErrors.length = 0, Yt(Kr);
                    }
                  } else Ot(fr);
                },
                function(fr) {
                  W(k, q), 0 < dt.thrownErrors.length && (fr = F(
                    dt.thrownErrors
                  ), dt.thrownErrors.length = 0), Yt(fr);
                }
              );
            }
          };
        }
        var Gt = lt;
        if (W(k, q), q === 0 && (K(tt), tt.length !== 0 && eo(function() {
          it || yn || (yn = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), dt.actQueue = null), 0 < dt.thrownErrors.length)
          throw m = F(dt.thrownErrors), dt.thrownErrors.length = 0, m;
        return {
          then: function(Ot, Yt) {
            it = !0, q === 0 ? (dt.actQueue = tt, T(function() {
              return Y(
                Gt,
                Ot,
                Yt
              );
            })) : Ot(Gt);
          }
        };
      }, r.cache = function(m) {
        return function() {
          return m.apply(null, arguments);
        };
      }, r.cloneElement = function(m, k, q) {
        if (m == null)
          throw Error(
            "The argument must be a React element, but you passed " + m + "."
          );
        var tt = Q({}, m.props), it = m.key, lt = m._owner;
        if (k != null) {
          var ot;
          t: {
            if (ur.call(k, "ref") && (ot = Object.getOwnPropertyDescriptor(
              k,
              "ref"
            ).get) && ot.isReactWarning) {
              ot = !1;
              break t;
            }
            ot = k.ref !== void 0;
          }
          ot && (lt = S()), b(k) && (f(k.key), it = "" + k.key);
          for (Gt in k)
            !ur.call(k, Gt) || Gt === "key" || Gt === "__self" || Gt === "__source" || Gt === "ref" && k.ref === void 0 || (tt[Gt] = k[Gt]);
        }
        var Gt = arguments.length - 2;
        if (Gt === 1) tt.children = q;
        else if (1 < Gt) {
          ot = Array(Gt);
          for (var Ot = 0; Ot < Gt; Ot++)
            ot[Ot] = arguments[Ot + 2];
          tt.children = ot;
        }
        for (tt = _(m.type, it, void 0, void 0, lt, tt), it = 2; it < arguments.length; it++)
          w(arguments[it], tt.type);
        return tt;
      }, r.createContext = function(m) {
        return m = {
          $$typeof: H,
          _currentValue: m,
          _currentValue2: m,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, m.Provider = m, m.Consumer = {
          $$typeof: J,
          _context: m
        }, m._currentRenderer = null, m._currentRenderer2 = null, m;
      }, r.createElement = function(m, k, q) {
        if (c(m))
          for (var tt = 2; tt < arguments.length; tt++)
            w(arguments[tt], m);
        else {
          if (tt = "", (m === void 0 || typeof m == "object" && m !== null && Object.keys(m).length === 0) && (tt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), m === null) var it = "null";
          else
            Dt(m) ? it = "array" : m !== void 0 && m.$$typeof === L ? (it = "<" + (l(m.type) || "Unknown") + " />", tt = " Did you accidentally export a JSX literal instead of a component?") : it = typeof m;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            it,
            tt
          );
        }
        var lt;
        if (tt = {}, it = null, k != null)
          for (lt in le || !("__self" in k) || "key" in k || (le = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), b(k) && (f(k.key), it = "" + k.key), k)
            ur.call(k, lt) && lt !== "key" && lt !== "__self" && lt !== "__source" && (tt[lt] = k[lt]);
        var ot = arguments.length - 2;
        if (ot === 1) tt.children = q;
        else if (1 < ot) {
          for (var Gt = Array(ot), Ot = 0; Ot < ot; Ot++)
            Gt[Ot] = arguments[Ot + 2];
          Object.freeze && Object.freeze(Gt), tt.children = Gt;
        }
        if (m && m.defaultProps)
          for (lt in ot = m.defaultProps, ot)
            tt[lt] === void 0 && (tt[lt] = ot[lt]);
        return it && x(
          tt,
          typeof m == "function" ? m.displayName || m.name || "Unknown" : m
        ), _(m, it, void 0, void 0, S(), tt);
      }, r.createRef = function() {
        var m = { current: null };
        return Object.seal(m), m;
      }, r.forwardRef = function(m) {
        m != null && m.$$typeof === gt ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof m != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          m === null ? "null" : typeof m
        ) : m.length !== 0 && m.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          m.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), m != null && m.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var k = { $$typeof: bt, render: m }, q;
        return Object.defineProperty(k, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return q;
          },
          set: function(tt) {
            q = tt, m.name || m.displayName || (Object.defineProperty(m, "name", { value: tt }), m.displayName = tt);
          }
        }), k;
      }, r.isValidElement = R, r.lazy = function(m) {
        return {
          $$typeof: wt,
          _payload: { _status: -1, _result: m },
          _init: j
        };
      }, r.memo = function(m, k) {
        c(m) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          m === null ? "null" : typeof m
        ), k = {
          $$typeof: gt,
          type: m,
          compare: k === void 0 ? null : k
        };
        var q;
        return Object.defineProperty(k, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return q;
          },
          set: function(tt) {
            q = tt, m.name || m.displayName || (Object.defineProperty(m, "name", { value: tt }), m.displayName = tt);
          }
        }), k;
      }, r.startTransition = function(m) {
        var k = dt.T, q = {};
        dt.T = q, q._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var tt = m(), it = dt.S;
          it !== null && it(q, tt), typeof tt == "object" && tt !== null && typeof tt.then == "function" && tt.then(D, to);
        } catch (lt) {
          to(lt);
        } finally {
          k === null && q._updatedFibers && (m = q._updatedFibers.size, q._updatedFibers.clear(), 10 < m && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), dt.T = k;
        }
      }, r.unstable_useCacheRefresh = function() {
        return $().useCacheRefresh();
      }, r.use = function(m) {
        return $().use(m);
      }, r.useActionState = function(m, k, q) {
        return $().useActionState(
          m,
          k,
          q
        );
      }, r.useCallback = function(m, k) {
        return $().useCallback(m, k);
      }, r.useContext = function(m) {
        var k = $();
        return m.$$typeof === J && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), k.useContext(m);
      }, r.useDebugValue = function(m, k) {
        return $().useDebugValue(m, k);
      }, r.useDeferredValue = function(m, k) {
        return $().useDeferredValue(m, k);
      }, r.useEffect = function(m, k) {
        return $().useEffect(m, k);
      }, r.useId = function() {
        return $().useId();
      }, r.useImperativeHandle = function(m, k, q) {
        return $().useImperativeHandle(m, k, q);
      }, r.useInsertionEffect = function(m, k) {
        return $().useInsertionEffect(m, k);
      }, r.useLayoutEffect = function(m, k) {
        return $().useLayoutEffect(m, k);
      }, r.useMemo = function(m, k) {
        return $().useMemo(m, k);
      }, r.useOptimistic = function(m, k) {
        return $().useOptimistic(m, k);
      }, r.useReducer = function(m, k, q) {
        return $().useReducer(m, k, q);
      }, r.useRef = function(m) {
        return $().useRef(m);
      }, r.useState = function(m) {
        return $().useState(m);
      }, r.useSyncExternalStore = function(m, k, q) {
        return $().useSyncExternalStore(
          m,
          k,
          q
        );
      }, r.useTransition = function() {
        return $().useTransition();
      }, r.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(ze, ze.exports)), ze.exports;
}
var so;
function gs() {
  return so || (so = 1, process.env.NODE_ENV === "production" ? bn.exports = Df() : bn.exports = Rf()), bn.exports;
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
var uo;
function Tf() {
  return uo || (uo = 1, process.env.NODE_ENV !== "production" && function() {
    function t(O) {
      if (O == null) return null;
      if (typeof O == "function")
        return O.$$typeof === j ? null : O.displayName || O.name || null;
      if (typeof O == "string") return O;
      switch (O) {
        case _:
          return "Fragment";
        case E:
          return "Portal";
        case w:
          return "Profiler";
        case C:
          return "StrictMode";
        case z:
          return "Suspense";
        case A:
          return "SuspenseList";
      }
      if (typeof O == "object")
        switch (typeof O.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), O.$$typeof) {
          case M:
            return (O.displayName || "Context") + ".Provider";
          case R:
            return (O._context.displayName || "Context") + ".Consumer";
          case G:
            var Q = O.render;
            return O = O.displayName, O || (O = Q.displayName || Q.name || "", O = O !== "" ? "ForwardRef(" + O + ")" : "ForwardRef"), O;
          case N:
            return Q = O.displayName || null, Q !== null ? Q : t(O.type) || "Memo";
          case B:
            Q = O._payload, O = O._init;
            try {
              return t(O(Q));
            } catch {
            }
        }
      return null;
    }
    function r(O) {
      return "" + O;
    }
    function e(O) {
      try {
        r(O);
        var Q = !1;
      } catch {
        Q = !0;
      }
      if (Q) {
        Q = console;
        var nt = Q.error, st = typeof Symbol == "function" && Symbol.toStringTag && O[Symbol.toStringTag] || O.constructor.name || "Object";
        return nt.call(
          Q,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          st
        ), r(O);
      }
    }
    function n() {
    }
    function a() {
      if (Y === 0) {
        K = console.log, L = console.info, et = console.warn, rt = console.error, pt = console.group, Et = console.groupCollapsed, J = console.groupEnd;
        var O = {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        };
        Object.defineProperties(console, {
          info: O,
          log: O,
          warn: O,
          error: O,
          group: O,
          groupCollapsed: O,
          groupEnd: O
        });
      }
      Y++;
    }
    function i() {
      if (Y--, Y === 0) {
        var O = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: T({}, O, { value: K }),
          info: T({}, O, { value: L }),
          warn: T({}, O, { value: et }),
          error: T({}, O, { value: rt }),
          group: T({}, O, { value: pt }),
          groupCollapsed: T({}, O, { value: Et }),
          groupEnd: T({}, O, { value: J })
        });
      }
      0 > Y && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function o(O) {
      if (H === void 0)
        try {
          throw Error();
        } catch (nt) {
          var Q = nt.stack.trim().match(/\n( *(at )?)/);
          H = Q && Q[1] || "", bt = -1 < nt.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < nt.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + H + O + bt;
    }
    function s(O, Q) {
      if (!O || ut) return "";
      var nt = vt.get(O);
      if (nt !== void 0) return nt;
      ut = !0, nt = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var st = null;
      st = $.H, $.H = null, a();
      try {
        var _t = {
          DetermineComponentFrameRoot: function() {
            try {
              if (Q) {
                var dr = function() {
                  throw Error();
                };
                if (Object.defineProperty(dr.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(dr, []);
                  } catch (tr) {
                    var Tr = tr;
                  }
                  Reflect.construct(O, [], dr);
                } else {
                  try {
                    dr.call();
                  } catch (tr) {
                    Tr = tr;
                  }
                  O.call(dr.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (tr) {
                  Tr = tr;
                }
                (dr = O()) && typeof dr.catch == "function" && dr.catch(function() {
                });
              }
            } catch (tr) {
              if (tr && Tr && typeof tr.stack == "string")
                return [tr.stack, Tr.stack];
            }
            return [null, null];
          }
        };
        _t.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var Dt = Object.getOwnPropertyDescriptor(
          _t.DetermineComponentFrameRoot,
          "name"
        );
        Dt && Dt.configurable && Object.defineProperty(
          _t.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var ht = _t.DetermineComponentFrameRoot(), dt = ht[0], ur = ht[1];
        if (dt && ur) {
          var Xt = dt.split(`
`), Kt = ur.split(`
`);
          for (ht = Dt = 0; Dt < Xt.length && !Xt[Dt].includes(
            "DetermineComponentFrameRoot"
          ); )
            Dt++;
          for (; ht < Kt.length && !Kt[ht].includes(
            "DetermineComponentFrameRoot"
          ); )
            ht++;
          if (Dt === Xt.length || ht === Kt.length)
            for (Dt = Xt.length - 1, ht = Kt.length - 1; 1 <= Dt && 0 <= ht && Xt[Dt] !== Kt[ht]; )
              ht--;
          for (; 1 <= Dt && 0 <= ht; Dt--, ht--)
            if (Xt[Dt] !== Kt[ht]) {
              if (Dt !== 1 || ht !== 1)
                do
                  if (Dt--, ht--, 0 > ht || Xt[Dt] !== Kt[ht]) {
                    var Er = `
` + Xt[Dt].replace(
                      " at new ",
                      " at "
                    );
                    return O.displayName && Er.includes("<anonymous>") && (Er = Er.replace("<anonymous>", O.displayName)), typeof O == "function" && vt.set(O, Er), Er;
                  }
                while (1 <= Dt && 0 <= ht);
              break;
            }
        }
      } finally {
        ut = !1, $.H = st, i(), Error.prepareStackTrace = nt;
      }
      return Xt = (Xt = O ? O.displayName || O.name : "") ? o(Xt) : "", typeof O == "function" && vt.set(O, Xt), Xt;
    }
    function u(O) {
      if (O == null) return "";
      if (typeof O == "function") {
        var Q = O.prototype;
        return s(
          O,
          !(!Q || !Q.isReactComponent)
        );
      }
      if (typeof O == "string") return o(O);
      switch (O) {
        case z:
          return o("Suspense");
        case A:
          return o("SuspenseList");
      }
      if (typeof O == "object")
        switch (O.$$typeof) {
          case G:
            return O = s(O.render, !1), O;
          case N:
            return u(O.type);
          case B:
            Q = O._payload, O = O._init;
            try {
              return u(O(Q));
            } catch {
            }
        }
      return "";
    }
    function f() {
      var O = $.A;
      return O === null ? null : O.getOwner();
    }
    function l(O) {
      if (D.call(O, "key")) {
        var Q = Object.getOwnPropertyDescriptor(O, "key").get;
        if (Q && Q.isReactWarning) return !1;
      }
      return O.key !== void 0;
    }
    function c(O, Q) {
      function nt() {
        wt || (wt = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          Q
        ));
      }
      nt.isReactWarning = !0, Object.defineProperty(O, "key", {
        get: nt,
        configurable: !0
      });
    }
    function v() {
      var O = t(this.type);
      return Mt[O] || (Mt[O] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), O = this.props.ref, O !== void 0 ? O : null;
    }
    function d(O, Q, nt, st, _t, Dt) {
      return nt = Dt.ref, O = {
        $$typeof: x,
        type: O,
        key: Q,
        props: Dt,
        _owner: _t
      }, (nt !== void 0 ? nt : null) !== null ? Object.defineProperty(O, "ref", {
        enumerable: !1,
        get: v
      }) : Object.defineProperty(O, "ref", { enumerable: !1, value: null }), O._store = {}, Object.defineProperty(O._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(O, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(O.props), Object.freeze(O)), O;
    }
    function p(O, Q, nt, st, _t, Dt) {
      if (typeof O == "string" || typeof O == "function" || O === _ || O === w || O === C || O === z || O === A || O === X || typeof O == "object" && O !== null && (O.$$typeof === B || O.$$typeof === N || O.$$typeof === M || O.$$typeof === R || O.$$typeof === G || O.$$typeof === F || O.getModuleId !== void 0)) {
        var ht = Q.children;
        if (ht !== void 0)
          if (st)
            if (W(ht)) {
              for (st = 0; st < ht.length; st++)
                h(ht[st], O);
              Object.freeze && Object.freeze(ht);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else h(ht, O);
      } else
        ht = "", (O === void 0 || typeof O == "object" && O !== null && Object.keys(O).length === 0) && (ht += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), O === null ? st = "null" : W(O) ? st = "array" : O !== void 0 && O.$$typeof === x ? (st = "<" + (t(O.type) || "Unknown") + " />", ht = " Did you accidentally export a JSX literal instead of a component?") : st = typeof O, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          st,
          ht
        );
      if (D.call(Q, "key")) {
        ht = t(O);
        var dt = Object.keys(Q).filter(function(Xt) {
          return Xt !== "key";
        });
        st = 0 < dt.length ? "{key: someKey, " + dt.join(": ..., ") + ": ...}" : "{key: someKey}", mt[ht + st] || (dt = 0 < dt.length ? "{" + dt.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          st,
          ht,
          dt,
          ht
        ), mt[ht + st] = !0);
      }
      if (ht = null, nt !== void 0 && (e(nt), ht = "" + nt), l(Q) && (e(Q.key), ht = "" + Q.key), "key" in Q) {
        nt = {};
        for (var ur in Q)
          ur !== "key" && (nt[ur] = Q[ur]);
      } else nt = Q;
      return ht && c(
        nt,
        typeof O == "function" ? O.displayName || O.name || "Unknown" : O
      ), d(O, ht, Dt, _t, f(), nt);
    }
    function h(O, Q) {
      if (typeof O == "object" && O && O.$$typeof !== gt) {
        if (W(O))
          for (var nt = 0; nt < O.length; nt++) {
            var st = O[nt];
            g(st) && y(st, Q);
          }
        else if (g(O))
          O._store && (O._store.validated = 1);
        else if (O === null || typeof O != "object" ? nt = null : (nt = U && O[U] || O["@@iterator"], nt = typeof nt == "function" ? nt : null), typeof nt == "function" && nt !== O.entries && (nt = nt.call(O), nt !== O))
          for (; !(O = nt.next()).done; )
            g(O.value) && y(O.value, Q);
      }
    }
    function g(O) {
      return typeof O == "object" && O !== null && O.$$typeof === x;
    }
    function y(O, Q) {
      if (O._store && !O._store.validated && O.key == null && (O._store.validated = 1, Q = S(Q), !Rt[Q])) {
        Rt[Q] = !0;
        var nt = "";
        O && O._owner != null && O._owner !== f() && (nt = null, typeof O._owner.tag == "number" ? nt = t(O._owner.type) : typeof O._owner.name == "string" && (nt = O._owner.name), nt = " It was passed a child from " + nt + ".");
        var st = $.getCurrentStack;
        $.getCurrentStack = function() {
          var _t = u(O.type);
          return st && (_t += st() || ""), _t;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          Q,
          nt
        ), $.getCurrentStack = st;
      }
    }
    function S(O) {
      var Q = "", nt = f();
      return nt && (nt = t(nt.type)) && (Q = `

Check the render method of \`` + nt + "`."), Q || (O = t(O)) && (Q = `

Check the top-level render call using <` + O + ">."), Q;
    }
    var b = gs(), x = Symbol.for("react.transitional.element"), E = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), M = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), X = Symbol.for("react.offscreen"), U = Symbol.iterator, j = Symbol.for("react.client.reference"), $ = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = Object.prototype.hasOwnProperty, T = Object.assign, F = Symbol.for("react.client.reference"), W = Array.isArray, Y = 0, K, L, et, rt, pt, Et, J;
    n.__reactDisabledLog = !0;
    var H, bt, ut = !1, vt = new (typeof WeakMap == "function" ? WeakMap : Map)(), gt = Symbol.for("react.client.reference"), wt, Mt = {}, mt = {}, Rt = {};
    Ie.Fragment = _, Ie.jsx = function(O, Q, nt, st, _t) {
      return p(O, Q, nt, !1, st, _t);
    }, Ie.jsxs = function(O, Q, nt, st, _t) {
      return p(O, Q, nt, !0, st, _t);
    };
  }()), Ie;
}
var fo;
function Mf() {
  return fo || (fo = 1, process.env.NODE_ENV === "production" ? Sn.exports = wf() : Sn.exports = Tf()), Sn.exports;
}
var Xe = Mf(), St = gs();
const Pa = /* @__PURE__ */ bf(St), lo = /* @__PURE__ */ Cf({
  __proto__: null,
  default: Pa
}, [St]);
var Of = !1;
function Pf(t) {
  if (t.sheet)
    return t.sheet;
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === t)
      return document.styleSheets[r];
}
function Af(t) {
  var r = document.createElement("style");
  return r.setAttribute("data-emotion", t.key), t.nonce !== void 0 && r.setAttribute("nonce", t.nonce), r.appendChild(document.createTextNode("")), r.setAttribute("data-s", ""), r;
}
var If = /* @__PURE__ */ function() {
  function t(e) {
    var n = this;
    this._insertTag = function(a) {
      var i;
      n.tags.length === 0 ? n.insertionPoint ? i = n.insertionPoint.nextSibling : n.prepend ? i = n.container.firstChild : i = n.before : i = n.tags[n.tags.length - 1].nextSibling, n.container.insertBefore(a, i), n.tags.push(a);
    }, this.isSpeedy = e.speedy === void 0 ? !Of : e.speedy, this.tags = [], this.ctr = 0, this.nonce = e.nonce, this.key = e.key, this.container = e.container, this.prepend = e.prepend, this.insertionPoint = e.insertionPoint, this.before = null;
  }
  var r = t.prototype;
  return r.hydrate = function(n) {
    n.forEach(this._insertTag);
  }, r.insert = function(n) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Af(this));
    var a = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var i = Pf(a);
      try {
        i.insertRule(n, i.cssRules.length);
      } catch {
      }
    } else
      a.appendChild(document.createTextNode(n));
    this.ctr++;
  }, r.flush = function() {
    this.tags.forEach(function(n) {
      var a;
      return (a = n.parentNode) == null ? void 0 : a.removeChild(n);
    }), this.tags = [], this.ctr = 0;
  }, t;
}(), er = "-ms-", Hn = "-moz-", Pt = "-webkit-", ms = "comm", ui = "rule", fi = "decl", kf = "@import", ys = "@keyframes", zf = "@layer", Gf = Math.abs, ea = String.fromCharCode, Bf = Object.assign;
function Nf(t, r) {
  return Qt(t, 0) ^ 45 ? (((r << 2 ^ Qt(t, 0)) << 2 ^ Qt(t, 1)) << 2 ^ Qt(t, 2)) << 2 ^ Qt(t, 3) : 0;
}
function Es(t) {
  return t.trim();
}
function Ff(t, r) {
  return (t = r.exec(t)) ? t[0] : t;
}
function At(t, r, e) {
  return t.replace(r, e);
}
function Aa(t, r) {
  return t.indexOf(r);
}
function Qt(t, r) {
  return t.charCodeAt(r) | 0;
}
function qe(t, r, e) {
  return t.slice(r, e);
}
function Or(t) {
  return t.length;
}
function li(t) {
  return t.length;
}
function xn(t, r) {
  return r.push(t), t;
}
function Lf(t, r) {
  return t.map(r).join("");
}
var na = 1, Se = 1, Ss = 0, cr = 0, $t = 0, Re = "";
function aa(t, r, e, n, a, i, o) {
  return { value: t, root: r, parent: e, type: n, props: a, children: i, line: na, column: Se, length: o, return: "" };
}
function ke(t, r) {
  return Bf(aa("", null, null, "", null, null, 0), t, { length: -t.length }, r);
}
function Yf() {
  return $t;
}
function Wf() {
  return $t = cr > 0 ? Qt(Re, --cr) : 0, Se--, $t === 10 && (Se = 1, na--), $t;
}
function gr() {
  return $t = cr < Ss ? Qt(Re, cr++) : 0, Se++, $t === 10 && (Se = 1, na++), $t;
}
function Ar() {
  return Qt(Re, cr);
}
function Nn() {
  return cr;
}
function rn(t, r) {
  return qe(Re, t, r);
}
function Ve(t) {
  switch (t) {
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
function bs(t) {
  return na = Se = 1, Ss = Or(Re = t), cr = 0, [];
}
function xs(t) {
  return Re = "", t;
}
function Fn(t) {
  return Es(rn(cr - 1, Ia(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function Hf(t) {
  for (; ($t = Ar()) && $t < 33; )
    gr();
  return Ve(t) > 2 || Ve($t) > 3 ? "" : " ";
}
function $f(t, r) {
  for (; --r && gr() && !($t < 48 || $t > 102 || $t > 57 && $t < 65 || $t > 70 && $t < 97); )
    ;
  return rn(t, Nn() + (r < 6 && Ar() == 32 && gr() == 32));
}
function Ia(t) {
  for (; gr(); )
    switch ($t) {
      // ] ) " '
      case t:
        return cr;
      // " '
      case 34:
      case 39:
        t !== 34 && t !== 39 && Ia($t);
        break;
      // (
      case 40:
        t === 41 && Ia(t);
        break;
      // \
      case 92:
        gr();
        break;
    }
  return cr;
}
function jf(t, r) {
  for (; gr() && t + $t !== 57; )
    if (t + $t === 84 && Ar() === 47)
      break;
  return "/*" + rn(r, cr - 1) + "*" + ea(t === 47 ? t : gr());
}
function Xf(t) {
  for (; !Ve(Ar()); )
    gr();
  return rn(t, cr);
}
function qf(t) {
  return xs(Ln("", null, null, null, [""], t = bs(t), 0, [0], t));
}
function Ln(t, r, e, n, a, i, o, s, u) {
  for (var f = 0, l = 0, c = o, v = 0, d = 0, p = 0, h = 1, g = 1, y = 1, S = 0, b = "", x = a, E = i, _ = n, C = b; g; )
    switch (p = S, S = gr()) {
      // (
      case 40:
        if (p != 108 && Qt(C, c - 1) == 58) {
          Aa(C += At(Fn(S), "&", "&\f"), "&\f") != -1 && (y = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        C += Fn(S);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        C += Hf(p);
        break;
      // \
      case 92:
        C += $f(Nn() - 1, 7);
        continue;
      // /
      case 47:
        switch (Ar()) {
          case 42:
          case 47:
            xn(Vf(jf(gr(), Nn()), r, e), u);
            break;
          default:
            C += "/";
        }
        break;
      // {
      case 123 * h:
        s[f++] = Or(C) * y;
      // } ; \0
      case 125 * h:
      case 59:
      case 0:
        switch (S) {
          // \0 }
          case 0:
          case 125:
            g = 0;
          // ;
          case 59 + l:
            y == -1 && (C = At(C, /\f/g, "")), d > 0 && Or(C) - c && xn(d > 32 ? vo(C + ";", n, e, c - 1) : vo(At(C, " ", "") + ";", n, e, c - 2), u);
            break;
          // @ ;
          case 59:
            C += ";";
          // { rule/at-rule
          default:
            if (xn(_ = co(C, r, e, f, l, a, s, b, x = [], E = [], c), i), S === 123)
              if (l === 0)
                Ln(C, r, _, _, x, i, c, s, E);
              else
                switch (v === 99 && Qt(C, 3) === 110 ? 100 : v) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Ln(t, _, _, n && xn(co(t, _, _, 0, 0, a, s, b, a, x = [], c), E), a, E, c, s, n ? x : E);
                    break;
                  default:
                    Ln(C, _, _, _, [""], E, 0, s, E);
                }
        }
        f = l = d = 0, h = y = 1, b = C = "", c = o;
        break;
      // :
      case 58:
        c = 1 + Or(C), d = p;
      default:
        if (h < 1) {
          if (S == 123)
            --h;
          else if (S == 125 && h++ == 0 && Wf() == 125)
            continue;
        }
        switch (C += ea(S), S * h) {
          // &
          case 38:
            y = l > 0 ? 1 : (C += "\f", -1);
            break;
          // ,
          case 44:
            s[f++] = (Or(C) - 1) * y, y = 1;
            break;
          // @
          case 64:
            Ar() === 45 && (C += Fn(gr())), v = Ar(), l = c = Or(b = C += Xf(Nn())), S++;
            break;
          // -
          case 45:
            p === 45 && Or(C) == 2 && (h = 0);
        }
    }
  return i;
}
function co(t, r, e, n, a, i, o, s, u, f, l) {
  for (var c = a - 1, v = a === 0 ? i : [""], d = li(v), p = 0, h = 0, g = 0; p < n; ++p)
    for (var y = 0, S = qe(t, c + 1, c = Gf(h = o[p])), b = t; y < d; ++y)
      (b = Es(h > 0 ? v[y] + " " + S : At(S, /&\f/g, v[y]))) && (u[g++] = b);
  return aa(t, r, e, a === 0 ? ui : s, u, f, l);
}
function Vf(t, r, e) {
  return aa(t, r, e, ms, ea(Yf()), qe(t, 2, -2), 0);
}
function vo(t, r, e, n) {
  return aa(t, r, e, fi, qe(t, 0, n), qe(t, n + 1, -1), n);
}
function ye(t, r) {
  for (var e = "", n = li(t), a = 0; a < n; a++)
    e += r(t[a], a, t, r) || "";
  return e;
}
function Uf(t, r, e, n) {
  switch (t.type) {
    case zf:
      if (t.children.length) break;
    case kf:
    case fi:
      return t.return = t.return || t.value;
    case ms:
      return "";
    case ys:
      return t.return = t.value + "{" + ye(t.children, n) + "}";
    case ui:
      t.value = t.props.join(",");
  }
  return Or(e = ye(t.children, n)) ? t.return = t.value + "{" + e + "}" : "";
}
function Kf(t) {
  var r = li(t);
  return function(e, n, a, i) {
    for (var o = "", s = 0; s < r; s++)
      o += t[s](e, n, a, i) || "";
    return o;
  };
}
function Zf(t) {
  return function(r) {
    r.root || (r = r.return) && t(r);
  };
}
function Jf(t) {
  var r = /* @__PURE__ */ Object.create(null);
  return function(e) {
    return r[e] === void 0 && (r[e] = t(e)), r[e];
  };
}
var Qf = function(r, e, n) {
  for (var a = 0, i = 0; a = i, i = Ar(), a === 38 && i === 12 && (e[n] = 1), !Ve(i); )
    gr();
  return rn(r, cr);
}, tl = function(r, e) {
  var n = -1, a = 44;
  do
    switch (Ve(a)) {
      case 0:
        a === 38 && Ar() === 12 && (e[n] = 1), r[n] += Qf(cr - 1, e, n);
        break;
      case 2:
        r[n] += Fn(a);
        break;
      case 4:
        if (a === 44) {
          r[++n] = Ar() === 58 ? "&\f" : "", e[n] = r[n].length;
          break;
        }
      // fallthrough
      default:
        r[n] += ea(a);
    }
  while (a = gr());
  return r;
}, rl = function(r, e) {
  return xs(tl(bs(r), e));
}, po = /* @__PURE__ */ new WeakMap(), el = function(r) {
  if (!(r.type !== "rule" || !r.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r.length < 1)) {
    for (var e = r.value, n = r.parent, a = r.column === n.column && r.line === n.line; n.type !== "rule"; )
      if (n = n.parent, !n) return;
    if (!(r.props.length === 1 && e.charCodeAt(0) !== 58 && !po.get(n)) && !a) {
      po.set(r, !0);
      for (var i = [], o = rl(e, i), s = n.props, u = 0, f = 0; u < o.length; u++)
        for (var l = 0; l < s.length; l++, f++)
          r.props[f] = i[u] ? o[u].replace(/&\f/g, s[l]) : s[l] + " " + o[u];
    }
  }
}, nl = function(r) {
  if (r.type === "decl") {
    var e = r.value;
    // charcode for l
    e.charCodeAt(0) === 108 && // charcode for b
    e.charCodeAt(2) === 98 && (r.return = "", r.value = "");
  }
};
function _s(t, r) {
  switch (Nf(t, r)) {
    // color-adjust
    case 5103:
      return Pt + "print-" + t + t;
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
      return Pt + t + t;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Pt + t + Hn + t + er + t + t;
    // flex, flex-direction
    case 6828:
    case 4268:
      return Pt + t + er + t + t;
    // order
    case 6165:
      return Pt + t + er + "flex-" + t + t;
    // align-items
    case 5187:
      return Pt + t + At(t, /(\w+).+(:[^]+)/, Pt + "box-$1$2" + er + "flex-$1$2") + t;
    // align-self
    case 5443:
      return Pt + t + er + "flex-item-" + At(t, /flex-|-self/, "") + t;
    // align-content
    case 4675:
      return Pt + t + er + "flex-line-pack" + At(t, /align-content|flex-|-self/, "") + t;
    // flex-shrink
    case 5548:
      return Pt + t + er + At(t, "shrink", "negative") + t;
    // flex-basis
    case 5292:
      return Pt + t + er + At(t, "basis", "preferred-size") + t;
    // flex-grow
    case 6060:
      return Pt + "box-" + At(t, "-grow", "") + Pt + t + er + At(t, "grow", "positive") + t;
    // transition
    case 4554:
      return Pt + At(t, /([^-])(transform)/g, "$1" + Pt + "$2") + t;
    // cursor
    case 6187:
      return At(At(At(t, /(zoom-|grab)/, Pt + "$1"), /(image-set)/, Pt + "$1"), t, "") + t;
    // background, background-image
    case 5495:
    case 3959:
      return At(t, /(image-set\([^]*)/, Pt + "$1$`$1");
    // justify-content
    case 4968:
      return At(At(t, /(.+:)(flex-)?(.*)/, Pt + "box-pack:$3" + er + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Pt + t + t;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return At(t, /(.+)-inline(.+)/, Pt + "$1$2") + t;
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
      if (Or(t) - 1 - r > 6) switch (Qt(t, r + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (Qt(t, r + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return At(t, /(.+:)(.+)-([^]+)/, "$1" + Pt + "$2-$3$1" + Hn + (Qt(t, r + 3) == 108 ? "$3" : "$2-$3")) + t;
        // (s)tretch
        case 115:
          return ~Aa(t, "stretch") ? _s(At(t, "stretch", "fill-available"), r) + t : t;
      }
      break;
    // position: sticky
    case 4949:
      if (Qt(t, r + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (Qt(t, Or(t) - 3 - (~Aa(t, "!important") && 10))) {
        // stic(k)y
        case 107:
          return At(t, ":", ":" + Pt) + t;
        // (inline-)?fl(e)x
        case 101:
          return At(t, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Pt + (Qt(t, 14) === 45 ? "inline-" : "") + "box$3$1" + Pt + "$2$3$1" + er + "$2box$3") + t;
      }
      break;
    // writing-mode
    case 5936:
      switch (Qt(t, r + 11)) {
        // vertical-l(r)
        case 114:
          return Pt + t + er + At(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        // vertical-r(l)
        case 108:
          return Pt + t + er + At(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        // horizontal(-)tb
        case 45:
          return Pt + t + er + At(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
      return Pt + t + er + t + t;
  }
  return t;
}
var al = function(r, e, n, a) {
  if (r.length > -1 && !r.return) switch (r.type) {
    case fi:
      r.return = _s(r.value, r.length);
      break;
    case ys:
      return ye([ke(r, {
        value: At(r.value, "@", "@" + Pt)
      })], a);
    case ui:
      if (r.length) return Lf(r.props, function(i) {
        switch (Ff(i, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return ye([ke(r, {
              props: [At(i, /:(read-\w+)/, ":" + Hn + "$1")]
            })], a);
          // :placeholder
          case "::placeholder":
            return ye([ke(r, {
              props: [At(i, /:(plac\w+)/, ":" + Pt + "input-$1")]
            }), ke(r, {
              props: [At(i, /:(plac\w+)/, ":" + Hn + "$1")]
            }), ke(r, {
              props: [At(i, /:(plac\w+)/, er + "input-$1")]
            })], a);
        }
        return "";
      });
  }
}, il = [al], ol = function(r) {
  var e = r.key;
  if (e === "css") {
    var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n, function(h) {
      var g = h.getAttribute("data-emotion");
      g.indexOf(" ") !== -1 && (document.head.appendChild(h), h.setAttribute("data-s", ""));
    });
  }
  var a = r.stylisPlugins || il, i = {}, o, s = [];
  o = r.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + e + ' "]'),
    function(h) {
      for (var g = h.getAttribute("data-emotion").split(" "), y = 1; y < g.length; y++)
        i[g[y]] = !0;
      s.push(h);
    }
  );
  var u, f = [el, nl];
  {
    var l, c = [Uf, Zf(function(h) {
      l.insert(h);
    })], v = Kf(f.concat(a, c)), d = function(g) {
      return ye(qf(g), v);
    };
    u = function(g, y, S, b) {
      l = S, d(g ? g + "{" + y.styles + "}" : y.styles), b && (p.inserted[y.name] = !0);
    };
  }
  var p = {
    key: e,
    sheet: new If({
      key: e,
      container: o,
      nonce: r.nonce,
      speedy: r.speedy,
      prepend: r.prepend,
      insertionPoint: r.insertionPoint
    }),
    nonce: r.nonce,
    inserted: i,
    registered: {},
    insert: u
  };
  return p.sheet.hydrate(s), p;
}, _n = { exports: {} }, It = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ho;
function sl() {
  if (ho) return It;
  ho = 1;
  var t = typeof Symbol == "function" && Symbol.for, r = t ? Symbol.for("react.element") : 60103, e = t ? Symbol.for("react.portal") : 60106, n = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, i = t ? Symbol.for("react.profiler") : 60114, o = t ? Symbol.for("react.provider") : 60109, s = t ? Symbol.for("react.context") : 60110, u = t ? Symbol.for("react.async_mode") : 60111, f = t ? Symbol.for("react.concurrent_mode") : 60111, l = t ? Symbol.for("react.forward_ref") : 60112, c = t ? Symbol.for("react.suspense") : 60113, v = t ? Symbol.for("react.suspense_list") : 60120, d = t ? Symbol.for("react.memo") : 60115, p = t ? Symbol.for("react.lazy") : 60116, h = t ? Symbol.for("react.block") : 60121, g = t ? Symbol.for("react.fundamental") : 60117, y = t ? Symbol.for("react.responder") : 60118, S = t ? Symbol.for("react.scope") : 60119;
  function b(E) {
    if (typeof E == "object" && E !== null) {
      var _ = E.$$typeof;
      switch (_) {
        case r:
          switch (E = E.type, E) {
            case u:
            case f:
            case n:
            case i:
            case a:
            case c:
              return E;
            default:
              switch (E = E && E.$$typeof, E) {
                case s:
                case l:
                case p:
                case d:
                case o:
                  return E;
                default:
                  return _;
              }
          }
        case e:
          return _;
      }
    }
  }
  function x(E) {
    return b(E) === f;
  }
  return It.AsyncMode = u, It.ConcurrentMode = f, It.ContextConsumer = s, It.ContextProvider = o, It.Element = r, It.ForwardRef = l, It.Fragment = n, It.Lazy = p, It.Memo = d, It.Portal = e, It.Profiler = i, It.StrictMode = a, It.Suspense = c, It.isAsyncMode = function(E) {
    return x(E) || b(E) === u;
  }, It.isConcurrentMode = x, It.isContextConsumer = function(E) {
    return b(E) === s;
  }, It.isContextProvider = function(E) {
    return b(E) === o;
  }, It.isElement = function(E) {
    return typeof E == "object" && E !== null && E.$$typeof === r;
  }, It.isForwardRef = function(E) {
    return b(E) === l;
  }, It.isFragment = function(E) {
    return b(E) === n;
  }, It.isLazy = function(E) {
    return b(E) === p;
  }, It.isMemo = function(E) {
    return b(E) === d;
  }, It.isPortal = function(E) {
    return b(E) === e;
  }, It.isProfiler = function(E) {
    return b(E) === i;
  }, It.isStrictMode = function(E) {
    return b(E) === a;
  }, It.isSuspense = function(E) {
    return b(E) === c;
  }, It.isValidElementType = function(E) {
    return typeof E == "string" || typeof E == "function" || E === n || E === f || E === i || E === a || E === c || E === v || typeof E == "object" && E !== null && (E.$$typeof === p || E.$$typeof === d || E.$$typeof === o || E.$$typeof === s || E.$$typeof === l || E.$$typeof === g || E.$$typeof === y || E.$$typeof === S || E.$$typeof === h);
  }, It.typeOf = b, It;
}
var kt = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var go;
function ul() {
  return go || (go = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, r = t ? Symbol.for("react.element") : 60103, e = t ? Symbol.for("react.portal") : 60106, n = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, i = t ? Symbol.for("react.profiler") : 60114, o = t ? Symbol.for("react.provider") : 60109, s = t ? Symbol.for("react.context") : 60110, u = t ? Symbol.for("react.async_mode") : 60111, f = t ? Symbol.for("react.concurrent_mode") : 60111, l = t ? Symbol.for("react.forward_ref") : 60112, c = t ? Symbol.for("react.suspense") : 60113, v = t ? Symbol.for("react.suspense_list") : 60120, d = t ? Symbol.for("react.memo") : 60115, p = t ? Symbol.for("react.lazy") : 60116, h = t ? Symbol.for("react.block") : 60121, g = t ? Symbol.for("react.fundamental") : 60117, y = t ? Symbol.for("react.responder") : 60118, S = t ? Symbol.for("react.scope") : 60119;
    function b(H) {
      return typeof H == "string" || typeof H == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      H === n || H === f || H === i || H === a || H === c || H === v || typeof H == "object" && H !== null && (H.$$typeof === p || H.$$typeof === d || H.$$typeof === o || H.$$typeof === s || H.$$typeof === l || H.$$typeof === g || H.$$typeof === y || H.$$typeof === S || H.$$typeof === h);
    }
    function x(H) {
      if (typeof H == "object" && H !== null) {
        var bt = H.$$typeof;
        switch (bt) {
          case r:
            var ut = H.type;
            switch (ut) {
              case u:
              case f:
              case n:
              case i:
              case a:
              case c:
                return ut;
              default:
                var vt = ut && ut.$$typeof;
                switch (vt) {
                  case s:
                  case l:
                  case p:
                  case d:
                  case o:
                    return vt;
                  default:
                    return bt;
                }
            }
          case e:
            return bt;
        }
      }
    }
    var E = u, _ = f, C = s, w = o, R = r, M = l, G = n, z = p, A = d, N = e, B = i, X = a, U = c, j = !1;
    function $(H) {
      return j || (j = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), D(H) || x(H) === u;
    }
    function D(H) {
      return x(H) === f;
    }
    function T(H) {
      return x(H) === s;
    }
    function F(H) {
      return x(H) === o;
    }
    function W(H) {
      return typeof H == "object" && H !== null && H.$$typeof === r;
    }
    function Y(H) {
      return x(H) === l;
    }
    function K(H) {
      return x(H) === n;
    }
    function L(H) {
      return x(H) === p;
    }
    function et(H) {
      return x(H) === d;
    }
    function rt(H) {
      return x(H) === e;
    }
    function pt(H) {
      return x(H) === i;
    }
    function Et(H) {
      return x(H) === a;
    }
    function J(H) {
      return x(H) === c;
    }
    kt.AsyncMode = E, kt.ConcurrentMode = _, kt.ContextConsumer = C, kt.ContextProvider = w, kt.Element = R, kt.ForwardRef = M, kt.Fragment = G, kt.Lazy = z, kt.Memo = A, kt.Portal = N, kt.Profiler = B, kt.StrictMode = X, kt.Suspense = U, kt.isAsyncMode = $, kt.isConcurrentMode = D, kt.isContextConsumer = T, kt.isContextProvider = F, kt.isElement = W, kt.isForwardRef = Y, kt.isFragment = K, kt.isLazy = L, kt.isMemo = et, kt.isPortal = rt, kt.isProfiler = pt, kt.isStrictMode = Et, kt.isSuspense = J, kt.isValidElementType = b, kt.typeOf = x;
  }()), kt;
}
var mo;
function fl() {
  return mo || (mo = 1, process.env.NODE_ENV === "production" ? _n.exports = sl() : _n.exports = ul()), _n.exports;
}
var ga, yo;
function ll() {
  if (yo) return ga;
  yo = 1;
  var t = fl(), r = {
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
  }, e = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, n = {
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
  i[t.ForwardRef] = n, i[t.Memo] = a;
  function o(p) {
    return t.isMemo(p) ? a : i[p.$$typeof] || r;
  }
  var s = Object.defineProperty, u = Object.getOwnPropertyNames, f = Object.getOwnPropertySymbols, l = Object.getOwnPropertyDescriptor, c = Object.getPrototypeOf, v = Object.prototype;
  function d(p, h, g) {
    if (typeof h != "string") {
      if (v) {
        var y = c(h);
        y && y !== v && d(p, y, g);
      }
      var S = u(h);
      f && (S = S.concat(f(h)));
      for (var b = o(p), x = o(h), E = 0; E < S.length; ++E) {
        var _ = S[E];
        if (!e[_] && !(g && g[_]) && !(x && x[_]) && !(b && b[_])) {
          var C = l(h, _);
          try {
            s(p, _, C);
          } catch {
          }
        }
      }
    }
    return p;
  }
  return ga = d, ga;
}
ll();
var cl = !0;
function vl(t, r, e) {
  var n = "";
  return e.split(" ").forEach(function(a) {
    t[a] !== void 0 ? r.push(t[a] + ";") : a && (n += a + " ");
  }), n;
}
var Cs = function(r, e, n) {
  var a = r.key + "-" + e.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (n === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  cl === !1) && r.registered[a] === void 0 && (r.registered[a] = e.styles);
}, dl = function(r, e, n) {
  Cs(r, e, n);
  var a = r.key + "-" + e.name;
  if (r.inserted[e.name] === void 0) {
    var i = e;
    do
      r.insert(e === i ? "." + a : "", i, r.sheet, !0), i = i.next;
    while (i !== void 0);
  }
};
function pl(t) {
  for (var r = 0, e, n = 0, a = t.length; a >= 4; ++n, a -= 4)
    e = t.charCodeAt(n) & 255 | (t.charCodeAt(++n) & 255) << 8 | (t.charCodeAt(++n) & 255) << 16 | (t.charCodeAt(++n) & 255) << 24, e = /* Math.imul(k, m): */
    (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16), e ^= /* k >>> r: */
    e >>> 24, r = /* Math.imul(k, m): */
    (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  switch (a) {
    case 3:
      r ^= (t.charCodeAt(n + 2) & 255) << 16;
    case 2:
      r ^= (t.charCodeAt(n + 1) & 255) << 8;
    case 1:
      r ^= t.charCodeAt(n) & 255, r = /* Math.imul(h, m): */
      (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  }
  return r ^= r >>> 13, r = /* Math.imul(h, m): */
  (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), ((r ^ r >>> 15) >>> 0).toString(36);
}
var hl = {
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
}, gl = !1, ml = /[A-Z]|^ms/g, yl = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ws = function(r) {
  return r.charCodeAt(1) === 45;
}, Eo = function(r) {
  return r != null && typeof r != "boolean";
}, ma = /* @__PURE__ */ Jf(function(t) {
  return ws(t) ? t : t.replace(ml, "-$&").toLowerCase();
}), So = function(r, e) {
  switch (r) {
    case "animation":
    case "animationName":
      if (typeof e == "string")
        return e.replace(yl, function(n, a, i) {
          return Pr = {
            name: a,
            styles: i,
            next: Pr
          }, a;
        });
  }
  return hl[r] !== 1 && !ws(r) && typeof e == "number" && e !== 0 ? e + "px" : e;
}, El = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function Ue(t, r, e) {
  if (e == null)
    return "";
  var n = e;
  if (n.__emotion_styles !== void 0)
    return n;
  switch (typeof e) {
    case "boolean":
      return "";
    case "object": {
      var a = e;
      if (a.anim === 1)
        return Pr = {
          name: a.name,
          styles: a.styles,
          next: Pr
        }, a.name;
      var i = e;
      if (i.styles !== void 0) {
        var o = i.next;
        if (o !== void 0)
          for (; o !== void 0; )
            Pr = {
              name: o.name,
              styles: o.styles,
              next: Pr
            }, o = o.next;
        var s = i.styles + ";";
        return s;
      }
      return Sl(t, r, e);
    }
    case "function": {
      if (t !== void 0) {
        var u = Pr, f = e(t);
        return Pr = u, Ue(t, r, f);
      }
      break;
    }
  }
  var l = e;
  return l;
}
function Sl(t, r, e) {
  var n = "";
  if (Array.isArray(e))
    for (var a = 0; a < e.length; a++)
      n += Ue(t, r, e[a]) + ";";
  else
    for (var i in e) {
      var o = e[i];
      if (typeof o != "object") {
        var s = o;
        Eo(s) && (n += ma(i) + ":" + So(i, s) + ";");
      } else {
        if (i === "NO_COMPONENT_SELECTOR" && gl)
          throw new Error(El);
        if (Array.isArray(o) && typeof o[0] == "string" && r == null)
          for (var u = 0; u < o.length; u++)
            Eo(o[u]) && (n += ma(i) + ":" + So(i, o[u]) + ";");
        else {
          var f = Ue(t, r, o);
          switch (i) {
            case "animation":
            case "animationName": {
              n += ma(i) + ":" + f + ";";
              break;
            }
            default:
              n += i + "{" + f + "}";
          }
        }
      }
    }
  return n;
}
var bo = /label:\s*([^\s;{]+)\s*(;|$)/g, Pr;
function Ds(t, r, e) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var n = !0, a = "";
  Pr = void 0;
  var i = t[0];
  if (i == null || i.raw === void 0)
    n = !1, a += Ue(e, r, i);
  else {
    var o = i;
    a += o[0];
  }
  for (var s = 1; s < t.length; s++)
    if (a += Ue(e, r, t[s]), n) {
      var u = i;
      a += u[s];
    }
  bo.lastIndex = 0;
  for (var f = "", l; (l = bo.exec(a)) !== null; )
    f += "-" + l[1];
  var c = pl(a) + f;
  return {
    name: c,
    styles: a,
    next: Pr
  };
}
var bl = function(r) {
  return r();
}, xl = lo.useInsertionEffect ? lo.useInsertionEffect : !1, _l = xl || bl, Cl = !1, Rs = /* @__PURE__ */ St.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ ol({
    key: "css"
  }) : null
);
Rs.Provider;
var wl = function(r) {
  return /* @__PURE__ */ St.forwardRef(function(e, n) {
    var a = St.useContext(Rs);
    return r(e, a, n);
  });
}, Dl = /* @__PURE__ */ St.createContext({}), en = {}.hasOwnProperty, ka = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", ci = function(r, e) {
  var n = {};
  for (var a in e)
    en.call(e, a) && (n[a] = e[a]);
  return n[ka] = r, n;
}, Rl = function(r) {
  var e = r.cache, n = r.serialized, a = r.isStringTag;
  return Cs(e, n, a), _l(function() {
    return dl(e, n, a);
  }), null;
}, Tl = /* @__PURE__ */ wl(function(t, r, e) {
  var n = t.css;
  typeof n == "string" && r.registered[n] !== void 0 && (n = r.registered[n]);
  var a = t[ka], i = [n], o = "";
  typeof t.className == "string" ? o = vl(r.registered, i, t.className) : t.className != null && (o = t.className + " ");
  var s = Ds(i, void 0, St.useContext(Dl));
  o += r.key + "-" + s.name;
  var u = {};
  for (var f in t)
    en.call(t, f) && f !== "css" && f !== ka && !Cl && (u[f] = t[f]);
  return u.className = o, e && (u.ref = e), /* @__PURE__ */ St.createElement(St.Fragment, null, /* @__PURE__ */ St.createElement(Rl, {
    cache: r,
    serialized: s,
    isStringTag: typeof a == "string"
  }), /* @__PURE__ */ St.createElement(a, u));
}), vi = Tl, ia = Xe.Fragment, hr = function(r, e, n) {
  return en.call(e, "css") ? Xe.jsx(vi, ci(r, e), n) : Xe.jsx(r, e, n);
}, $n = function(r, e, n) {
  return en.call(e, "css") ? Xe.jsxs(vi, ci(r, e), n) : Xe.jsxs(r, e, n);
};
function di(t, r) {
  for (var e = t.length, n = 0; n < e; ++n)
    if (r(t[n], n))
      return !0;
  return !1;
}
function Ts(t, r) {
  for (var e = t.length, n = 0; n < e; ++n)
    if (r(t[n], n))
      return t[n];
  return null;
}
function Ms(t) {
  var r = t;
  if (typeof r > "u") {
    if (typeof navigator > "u" || !navigator)
      return "";
    r = navigator.userAgent || "";
  }
  return r.toLowerCase();
}
function pi(t, r) {
  try {
    return new RegExp(t, "g").exec(r);
  } catch {
    return null;
  }
}
function Ml() {
  if (typeof navigator > "u" || !navigator || !navigator.userAgentData)
    return !1;
  var t = navigator.userAgentData, r = t.brands || t.uaList;
  return !!(r && r.length);
}
function Ol(t, r) {
  var e = pi("(" + t + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", r);
  return e ? e[3] : "";
}
function za(t) {
  return t.replace(/_/g, ".");
}
function Ge(t, r) {
  var e = null, n = "-1";
  return di(t, function(a) {
    var i = pi("(" + a.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", r);
    return !i || a.brand ? !1 : (e = a, n = i[3] || "-1", a.versionAlias ? n = a.versionAlias : a.versionTest && (n = Ol(a.versionTest.toLowerCase(), r) || n), n = za(n), !0);
  }), {
    preset: e,
    version: n
  };
}
function Cn(t, r) {
  var e = {
    brand: "",
    version: "-1"
  };
  return di(t, function(n) {
    var a = Os(r, n);
    return a ? (e.brand = n.id, e.version = n.versionAlias || a.version, e.version !== "-1") : !1;
  }), e;
}
function Os(t, r) {
  return Ts(t, function(e) {
    var n = e.brand;
    return pi("" + r.test, n.toLowerCase());
  });
}
var Ps = [{
  test: "phantomjs",
  id: "phantomjs"
}, {
  test: "whale",
  id: "whale"
}, {
  test: "edgios|edge|edg",
  id: "edge"
}, {
  test: "msie|trident|windows phone",
  id: "ie",
  versionTest: "iemobile|msie|rv"
}, {
  test: "miuibrowser",
  id: "miui browser"
}, {
  test: "samsungbrowser",
  id: "samsung internet"
}, {
  test: "samsung",
  id: "samsung internet",
  versionTest: "version"
}, {
  test: "chrome|crios",
  id: "chrome"
}, {
  test: "firefox|fxios",
  id: "firefox"
}, {
  test: "android",
  id: "android browser",
  versionTest: "version"
}, {
  test: "safari|iphone|ipad|ipod",
  id: "safari",
  versionTest: "version"
}], As = [{
  test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
  id: "chrome",
  versionTest: "chrome"
}, {
  test: "chromium",
  id: "chrome"
}, {
  test: "whale",
  id: "chrome",
  versionAlias: "-1",
  brand: !0
}], Ga = [{
  test: "applewebkit",
  id: "webkit",
  versionTest: "applewebkit|safari"
}], Is = [{
  test: "(?=(iphone|ipad))(?!(.*version))",
  id: "webview"
}, {
  test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
  id: "webview"
}, {
  // test webview
  test: "webview",
  id: "webview"
}], ks = [{
  test: "windows phone",
  id: "windows phone"
}, {
  test: "windows 2000",
  id: "window",
  versionAlias: "5.0"
}, {
  test: "windows nt",
  id: "window"
}, {
  test: "win32|windows",
  id: "window"
}, {
  test: "iphone|ipad|ipod",
  id: "ios",
  versionTest: "iphone os|cpu os"
}, {
  test: "macos|macintel|mac os x",
  id: "mac"
}, {
  test: "android|linux armv81",
  id: "android"
}, {
  test: "tizen",
  id: "tizen"
}, {
  test: "webos|web0s",
  id: "webos"
}];
function zs(t) {
  return !!Ge(Is, t).preset;
}
function Pl(t) {
  var r = Ms(t), e = !!/mobi/g.exec(r), n = {
    name: "unknown",
    version: "-1",
    majorVersion: -1,
    webview: zs(r),
    chromium: !1,
    chromiumVersion: "-1",
    webkit: !1,
    webkitVersion: "-1"
  }, a = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  }, i = Ge(Ps, r), o = i.preset, s = i.version, u = Ge(ks, r), f = u.preset, l = u.version, c = Ge(As, r);
  if (n.chromium = !!c.preset, n.chromiumVersion = c.version, !n.chromium) {
    var v = Ge(Ga, r);
    n.webkit = !!v.preset, n.webkitVersion = v.version;
  }
  return f && (a.name = f.id, a.version = l, a.majorVersion = parseInt(l, 10)), o && (n.name = o.id, n.version = s, n.webview && a.name === "ios" && n.name !== "safari" && (n.webview = !1)), n.majorVersion = parseInt(n.version, 10), {
    browser: n,
    os: a,
    isMobile: e,
    isHints: !1
  };
}
function Al(t) {
  var r = navigator.userAgentData, e = (r.uaList || r.brands).slice(), n = r.mobile || !1, a = e[0], i = (r.platform || navigator.platform).toLowerCase(), o = {
    name: a.brand,
    version: a.version,
    majorVersion: -1,
    webkit: !1,
    webkitVersion: "-1",
    chromium: !1,
    chromiumVersion: "-1",
    webview: !!Cn(Is, e).brand || zs(Ms())
  }, s = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };
  o.webkit = !o.chromium && di(Ga, function(v) {
    return Os(e, v);
  });
  var u = Cn(As, e);
  if (o.chromium = !!u.brand, o.chromiumVersion = u.version || "-1", !o.chromium) {
    var f = Cn(Ga, e);
    o.webkit = !!f.brand, o.webkitVersion = f.version || "-1";
  }
  var l = Ts(ks, function(v) {
    return new RegExp("" + v.test, "g").exec(i);
  });
  s.name = l ? l.id : "";
  {
    var c = Cn(Ps, e);
    o.name = c.brand || o.name, o.version = c.brand && t ? t.uaFullVersion : c.version;
  }
  return o.webkit && (s.name = n ? "ios" : "mac"), s.name === "ios" && o.webview && (o.version = "-1"), s.version = za(s.version), o.version = za(o.version), s.majorVersion = parseInt(s.version, 10), o.majorVersion = parseInt(o.version, 10), {
    browser: o,
    os: s,
    isMobile: n,
    isHints: !0
  };
}
function Il(t) {
  return Ml() ? Al() : Pl(t);
}
function kl(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  return r.map(function(n) {
    return n.split(" ").map(function(a) {
      return a ? "" + t + a : "";
    }).join(" ");
  }).join(" ");
}
function zl(t, r) {
  return r.replace(/([^}{]*){/gm, function(e, n) {
    return n.replace(/\.([^{,\s\d.]+)/g, "." + t + "$1") + "{";
  });
}
function ee(t, r) {
  return function(e) {
    e && (t[r] = e);
  };
}
function Gs(t, r, e) {
  return function(n) {
    n && (t[r][e] = n);
  };
}
function Gl(t, r) {
  return r === void 0 && (r = {}), function(e, n) {
    t.forEach(function(a) {
      var i = r[a] || a;
      i in e || (e[i] = function() {
        for (var o, s = [], u = 0; u < arguments.length; u++)
          s[u] = arguments[u];
        var f = (o = this[n])[a].apply(o, s);
        return f === this[n] ? this : f;
      });
    });
  };
}
var Bl = "function", Nl = "object", Fl = "string", Ll = "number", hi = "undefined", Bs = typeof window !== hi, Yl = typeof document !== hi && document, Wl = [{
  open: "(",
  close: ")"
}, {
  open: '"',
  close: '"'
}, {
  open: "'",
  close: "'"
}, {
  open: '\\"',
  close: '\\"'
}, {
  open: "\\'",
  close: "\\'"
}], jt = 1e-7, wn = {
  cm: function(t) {
    return t * 96 / 2.54;
  },
  mm: function(t) {
    return t * 96 / 254;
  },
  in: function(t) {
    return t * 96;
  },
  pt: function(t) {
    return t * 96 / 72;
  },
  pc: function(t) {
    return t * 96 / 6;
  },
  "%": function(t, r) {
    return t * r / 100;
  },
  vw: function(t, r) {
    return r === void 0 && (r = window.innerWidth), t / 100 * r;
  },
  vh: function(t, r) {
    return r === void 0 && (r = window.innerHeight), t / 100 * r;
  },
  vmax: function(t, r) {
    return r === void 0 && (r = Math.max(window.innerWidth, window.innerHeight)), t / 100 * r;
  },
  vmin: function(t, r) {
    return r === void 0 && (r = Math.min(window.innerWidth, window.innerHeight)), t / 100 * r;
  }
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function Hl() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
function jn(t, r, e, n) {
  return (t * n + r * e) / (e + n);
}
function gi(t) {
  return typeof t === hi;
}
function Dr(t) {
  return t && typeof t === Nl;
}
function Zt(t) {
  return Array.isArray(t);
}
function Lr(t) {
  return typeof t === Fl;
}
function Ke(t) {
  return typeof t === Ll;
}
function mi(t) {
  return typeof t === Bl;
}
function $l(t, r) {
  var e = t === "" || t == " ", n = r === "" || r == " ";
  return n && e || t === r;
}
function Ns(t, r, e, n, a) {
  var i = yi(t, r, e);
  return i ? e : jl(t, r, e + 1, n, a);
}
function yi(t, r, e) {
  if (!t.ignore)
    return null;
  var n = r.slice(Math.max(e - 3, 0), e + 3).join("");
  return new RegExp(t.ignore).exec(n);
}
function jl(t, r, e, n, a) {
  for (var i = function(f) {
    var l = r[f].trim();
    if (l === t.close && !yi(t, r, f))
      return {
        value: f
      };
    var c = f, v = mr(a, function(d) {
      var p = d.open;
      return p === l;
    });
    if (v && (c = Ns(v, r, f, n, a)), c === -1)
      return o = f, "break";
    f = c, o = f;
  }, o, s = e; s < n; ++s) {
    var u = i(s);
    if (s = o, typeof u == "object") return u.value;
    if (u === "break") break;
  }
  return -1;
}
function Ei(t, r) {
  var e = Lr(r) ? {
    separator: r
  } : r, n = e.separator, a = n === void 0 ? "," : n, i = e.isSeparateFirst, o = e.isSeparateOnlyOpenClose, s = e.isSeparateOpenClose, u = s === void 0 ? o : s, f = e.openCloseCharacters, l = f === void 0 ? Wl : f, c = l.map(function(C) {
    var w = C.open, R = C.close;
    return w === R ? w : w + "|" + R;
  }).join("|"), v = "(\\s*" + a + "\\s*|" + c + "|\\s+)", d = new RegExp(v, "g"), p = t.split(d).filter(function(C) {
    return C && C !== "undefined";
  }), h = p.length, g = [], y = [];
  function S() {
    return y.length ? (g.push(y.join("")), y = [], !0) : !1;
  }
  for (var b = function(C) {
    var w = p[C].trim(), R = C, M = mr(l, function(A) {
      var N = A.open;
      return N === w;
    }), G = mr(l, function(A) {
      var N = A.close;
      return N === w;
    });
    if (M) {
      if (R = Ns(M, p, C, h, l), R !== -1 && u)
        return S() && i || (g.push(p.slice(C, R + 1).join("")), C = R, i) ? (x = C, "break") : (x = C, "continue");
    } else if (G && !yi(G, p, C)) {
      var z = Hl(l);
      return z.splice(l.indexOf(G), 1), {
        value: Ei(t, {
          separator: a,
          isSeparateFirst: i,
          isSeparateOnlyOpenClose: o,
          isSeparateOpenClose: u,
          openCloseCharacters: z
        })
      };
    } else if ($l(w, a) && !o)
      return S(), i ? (x = C, "break") : (x = C, "continue");
    R === -1 && (R = h - 1), y.push(p.slice(C, R + 1).join("")), C = R, x = C;
  }, x, E = 0; E < h; ++E) {
    var _ = b(E);
    if (E = x, typeof _ == "object") return _.value;
    if (_ === "break") break;
  }
  return y.length && g.push(y.join("")), g;
}
function jr(t) {
  return Ei(t, "");
}
function re(t) {
  return Ei(t, ",");
}
function Fs(t) {
  var r = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(t);
  return !r || r.length < 4 ? {} : {
    prefix: r[1],
    value: r[2],
    suffix: r[3]
  };
}
function nn(t) {
  var r = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(t);
  if (!r)
    return {
      prefix: "",
      unit: "",
      value: NaN
    };
  var e = r[1], n = r[2], a = r[3];
  return {
    prefix: e,
    unit: a,
    value: parseFloat(n)
  };
}
function Xl(t, r) {
  return t.replace(/([a-z])([A-Z])/g, function(e, n, a) {
    return "" + n + r + a.toLowerCase();
  });
}
function Ze() {
  return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function Fr(t, r, e) {
  e === void 0 && (e = -1);
  for (var n = t.length, a = 0; a < n; ++a)
    if (r(t[a], a, t))
      return a;
  return e;
}
function mr(t, r, e) {
  var n = Fr(t, r);
  return n > -1 ? t[n] : e;
}
var Ls = /* @__PURE__ */ function() {
  var t = Ze(), r = Bs && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
  return r ? r.bind(window) : function(e) {
    var n = Ze(), a = setTimeout(function() {
      e(n - t);
    }, 1e3 / 60);
    return a;
  };
}(), ql = /* @__PURE__ */ function() {
  var t = Bs && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
  return t ? t.bind(window) : function(r) {
    clearTimeout(r);
  };
}();
function Te(t) {
  return Object.keys(t);
}
function Bt(t, r) {
  var e = nn(t), n = e.value, a = e.unit;
  if (Dr(r)) {
    var i = r[a];
    if (i) {
      if (mi(i))
        return i(n);
      if (wn[a])
        return wn[a](n, i);
    }
  } else if (a === "%")
    return n * r / 100;
  return wn[a] ? wn[a](n) : n;
}
function Ba(t, r, e) {
  return Math.max(r, Math.min(t, e));
}
function xo(t, r, e, n) {
  return n === void 0 && (n = t[0] / t[1]), [[yt(r[0], jt), yt(r[0] / n, jt)], [yt(r[1] * n, jt), yt(r[1], jt)]].filter(function(a) {
    return a.every(function(i, o) {
      var s = r[o], u = yt(s, jt);
      return e ? i <= s || i <= u : i >= s || i >= u;
    });
  })[0] || t;
}
function Ys(t, r, e, n) {
  if (!n)
    return t.map(function(d, p) {
      return Ba(d, r[p], e[p]);
    });
  var a = t[0], i = t[1], o = n === !0 ? a / i : n, s = xo(t, r, !1, o), u = s[0], f = s[1], l = xo(t, e, !0, o), c = l[0], v = l[1];
  return a < u || i < f ? (a = u, i = f) : (a > c || i > v) && (a = c, i = v), [a, i];
}
function Vl(t) {
  for (var r = t.length, e = 0, n = r - 1; n >= 0; --n)
    e += t[n];
  return e;
}
function Na(t) {
  for (var r = t.length, e = 0, n = r - 1; n >= 0; --n)
    e += t[n];
  return r ? e / r : 0;
}
function Wt(t, r) {
  var e = r[0] - t[0], n = r[1] - t[1], a = Math.atan2(n, e);
  return a >= 0 ? a : a + Math.PI * 2;
}
function Ul(t) {
  return [0, 1].map(function(r) {
    return Na(t.map(function(e) {
      return e[r];
    }));
  });
}
function _o(t) {
  var r = Ul(t), e = Wt(r, t[0]), n = Wt(r, t[1]);
  return e < n && n - e < Math.PI || e > n && n - e < -Math.PI ? 1 : -1;
}
function Br(t, r) {
  return Math.sqrt(Math.pow((r ? r[0] : 0) - t[0], 2) + Math.pow((r ? r[1] : 0) - t[1], 2));
}
function yt(t, r) {
  if (!r)
    return t;
  var e = 1 / r;
  return Math.round(t / r) / e;
}
function Co(t, r) {
  return t.forEach(function(e, n) {
    t[n] = yt(t[n], r);
  }), t;
}
function Kl(t) {
  for (var r = [], e = 0; e < t; ++e)
    r.push(e);
  return r;
}
function Zl(t) {
  return t.reduce(function(r, e) {
    return r.concat(e);
  }, []);
}
function Vt(t, r) {
  return t.classList ? t.classList.contains(r) : !!t.className.match(new RegExp("(\\s|^)" + r + "(\\s|$)"));
}
function Ws(t, r) {
  t.classList ? t.classList.add(r) : t.className += " " + r;
}
function Hs(t, r) {
  if (t.classList)
    t.classList.remove(r);
  else {
    var e = new RegExp("(\\s|^)" + r + "(\\s|$)");
    t.className = t.className.replace(e, " ");
  }
}
function rr(t, r, e, n) {
  t.addEventListener(r, e, n);
}
function Jt(t, r, e, n) {
  t.removeEventListener(r, e, n);
}
function Si(t) {
  return t?.ownerDocument || Yl;
}
function bi(t) {
  return Si(t).documentElement;
}
function Vr(t) {
  return Si(t).body;
}
function $r(t) {
  var r;
  return ((r = t?.ownerDocument) === null || r === void 0 ? void 0 : r.defaultView) || window;
}
function $s(t) {
  return t && "postMessage" in t && "blur" in t && "self" in t;
}
function xi(t) {
  return Dr(t) && t.nodeName && t.nodeType && "ownerDocument" in t;
}
function Jl(t, r, e, n, a, i) {
  for (var o = 0; o < a; ++o) {
    var s = e + o * a, u = n + o * a;
    t[s] += t[u] * i, r[s] += r[u] * i;
  }
}
function Ql(t, r, e, n, a) {
  for (var i = 0; i < a; ++i) {
    var o = e + i * a, s = n + i * a, u = t[o], f = r[o];
    t[o] = t[s], t[s] = u, r[o] = r[s], r[s] = f;
  }
}
function tc(t, r, e, n, a) {
  for (var i = 0; i < n; ++i) {
    var o = e + i * n;
    t[o] /= a, r[o] /= a;
  }
}
function js(t, r, e) {
  for (var n = t.slice(), a = 0; a < e; ++a)
    n[a * e + r - 1] = 0, n[(r - 1) * e + a] = 0;
  return n[(r - 1) * (e + 1)] = 1, n;
}
function kr(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = t.slice(), n = Ft(r), a = 0; a < r; ++a) {
    var i = r * a + a;
    if (!yt(e[i], jt)) {
      for (var o = a + 1; o < r; ++o)
        if (e[r * a + o]) {
          Ql(e, n, a, o, r);
          break;
        }
    }
    if (!yt(e[i], jt))
      return [];
    tc(e, n, a, r, e[i]);
    for (var o = 0; o < r; ++o) {
      var s = o, u = o + a * r, f = e[u];
      !yt(f, jt) || a === o || Jl(e, n, s, a, r, -f);
    }
  }
  return n;
}
function rc(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = [], n = 0; n < r; ++n)
    for (var a = 0; a < r; ++a)
      e[a * r + n] = t[r * n + a];
  return e;
}
function Xs(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = [], n = t[r * r - 1], a = 0; a < r - 1; ++a)
    e[a] = t[r * (r - 1) + a] / n;
  return e[r - 1] = 0, e;
}
function ec(t, r) {
  for (var e = Ft(r), n = 0; n < r - 1; ++n)
    e[r * (r - 1) + n] = t[n] || 0;
  return e;
}
function ne(t, r) {
  for (var e = t.slice(), n = t.length; n < r - 1; ++n)
    e[n] = 0;
  return e[r - 1] = 1, e;
}
function Rr(t, r, e) {
  if (r === void 0 && (r = Math.sqrt(t.length)), r === e)
    return t;
  for (var n = Ft(e), a = Math.min(r, e), i = 0; i < a - 1; ++i) {
    for (var o = 0; o < a - 1; ++o)
      n[i * e + o] = t[i * r + o];
    n[(i + 1) * e - 1] = t[(i + 1) * r - 1], n[(e - 1) * e + i] = t[(r - 1) * r + i];
  }
  return n[e * e - 1] = t[r * r - 1], n;
}
function Xn(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  var n = Ft(t);
  return r.forEach(function(a) {
    n = Nt(n, a, t);
  }), n;
}
function Nt(t, r, e) {
  e === void 0 && (e = Math.sqrt(t.length));
  var n = [], a = t.length / e, i = r.length / a;
  if (a) {
    if (!i)
      return t;
  } else return r;
  for (var o = 0; o < e; ++o)
    for (var s = 0; s < i; ++s) {
      n[s * e + o] = 0;
      for (var u = 0; u < a; ++u)
        n[s * e + o] += t[u * e + o] * r[s * a + u];
    }
  return n;
}
function Tt(t, r) {
  for (var e = Math.min(t.length, r.length), n = t.slice(), a = 0; a < e; ++a)
    n[a] = n[a] + r[a];
  return n;
}
function ct(t, r) {
  for (var e = Math.min(t.length, r.length), n = t.slice(), a = 0; a < e; ++a)
    n[a] = n[a] - r[a];
  return n;
}
function nc(t, r) {
  return r === void 0 && (r = t.length === 6), r ? [t[0], t[1], 0, t[2], t[3], 0, t[4], t[5], 1] : t;
}
function qs(t, r) {
  return r === void 0 && (r = t.length === 9), r ? [t[0], t[1], t[3], t[4], t[6], t[7]] : t;
}
function nr(t, r, e) {
  e === void 0 && (e = r.length);
  var n = Nt(t, r, e), a = n[e - 1];
  return n.map(function(i) {
    return i / a;
  });
}
function ac(t, r) {
  return Nt(t, [1, 0, 0, 0, 0, Math.cos(r), Math.sin(r), 0, 0, -Math.sin(r), Math.cos(r), 0, 0, 0, 0, 1], 4);
}
function ic(t, r) {
  return Nt(t, [Math.cos(r), 0, -Math.sin(r), 0, 0, 1, 0, 0, Math.sin(r), 0, Math.cos(r), 0, 0, 0, 0, 1], 4);
}
function oc(t, r) {
  return Nt(t, on(r, 4));
}
function Dn(t, r) {
  var e = r[0], n = e === void 0 ? 1 : e, a = r[1], i = a === void 0 ? 1 : a, o = r[2], s = o === void 0 ? 1 : o;
  return Nt(t, [n, 0, 0, 0, 0, i, 0, 0, 0, 0, s, 0, 0, 0, 0, 1], 4);
}
function an(t, r) {
  return nr(on(r, 3), ne(t, 3));
}
function ya(t, r) {
  var e = r[0], n = e === void 0 ? 0 : e, a = r[1], i = a === void 0 ? 0 : a, o = r[2], s = o === void 0 ? 0 : o;
  return Nt(t, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, n, i, s, 1], 4);
}
function wo(t, r) {
  return Nt(t, r, 4);
}
function on(t, r) {
  var e = Math.cos(t), n = Math.sin(t), a = Ft(r);
  return a[0] = e, a[1] = n, a[r] = -n, a[r + 1] = e, a;
}
function Ft(t) {
  for (var r = t * t, e = [], n = 0; n < r; ++n)
    e[n] = n % (t + 1) ? 0 : 1;
  return e;
}
function _i(t, r) {
  for (var e = Ft(r), n = Math.min(t.length, r - 1), a = 0; a < n; ++a)
    e[(r + 1) * a] = t[a];
  return e;
}
function ae(t, r) {
  for (var e = Ft(r), n = Math.min(t.length, r - 1), a = 0; a < n; ++a)
    e[r * (r - 1) + a] = t[a];
  return e;
}
function Ci(t, r, e, n, a, i, o, s) {
  var u = t[0], f = t[1], l = r[0], c = r[1], v = e[0], d = e[1], p = n[0], h = n[1], g = a[0], y = a[1], S = i[0], b = i[1], x = o[0], E = o[1], _ = s[0], C = s[1], w = [u, 0, l, 0, v, 0, p, 0, f, 0, c, 0, d, 0, h, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, u, 0, l, 0, v, 0, p, 0, f, 0, c, 0, d, 0, h, 0, 1, 0, 1, 0, 1, 0, 1, -g * u, -y * u, -S * l, -b * l, -x * v, -E * v, -_ * p, -C * p, -g * f, -y * f, -S * c, -b * c, -x * d, -E * d, -_ * h, -C * h], R = kr(w, 8);
  if (!R.length)
    return [];
  var M = Nt(R, [g, y, S, b, x, E, _, C], 8);
  return M[8] = 1, Rr(rc(M), 3, 4);
}
var Fe = function() {
  return Fe = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Fe.apply(this, arguments);
};
function sc() {
  return [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ];
}
function Je(t, r) {
  return r === void 0 && (r = 0), ve(be(t, r));
}
function uc(t, r) {
  var e = nr(t, [r[0], r[1] || 0, r[2] || 0, 1], 4), n = e[3] || 1;
  return [
    e[0] / n,
    e[1] / n,
    e[2] / n
  ];
}
function ve(t) {
  var r = sc();
  return t.forEach(function(e) {
    var n = e.matrixFunction, a = e.functionValue;
    n && (r = n(r, a));
  }), r;
}
function be(t, r) {
  r === void 0 && (r = 0);
  var e = Zt(t) ? t : jr(t);
  return e.map(function(n) {
    var a = Fs(n), i = a.prefix, o = a.value, s = null, u = i, f = "";
    if (i === "translate" || i === "translateX" || i === "translate3d") {
      var l = Dr(r) ? Fe(Fe({}, r), { "o%": r["%"] }) : {
        "%": r,
        "o%": r
      }, c = re(o).map(function(A, N) {
        return N === 0 && "x%" in l ? l["%"] = r["x%"] : N === 1 && "y%" in l ? l["%"] = r["y%"] : l["%"] = r["o%"], Bt(A, l);
      }), v = c[0], d = c[1], p = d === void 0 ? 0 : d, h = c[2], g = h === void 0 ? 0 : h;
      s = ya, f = [v, p, g];
    } else if (i === "translateY") {
      var y = Dr(r) ? Fe({ "%": r["y%"] }, r) : {
        "%": r
      }, p = Bt(o, y);
      s = ya, f = [0, p, 0];
    } else if (i === "translateZ") {
      var g = parseFloat(o);
      s = ya, f = [0, 0, g];
    } else if (i === "scale" || i === "scale3d") {
      var S = re(o).map(function(A) {
        return parseFloat(A);
      }), b = S[0], x = S[1], E = x === void 0 ? b : x, _ = S[2], C = _ === void 0 ? 1 : _;
      s = Dn, f = [b, E, C];
    } else if (i === "scaleX") {
      var b = parseFloat(o);
      s = Dn, f = [b, 1, 1];
    } else if (i === "scaleY") {
      var E = parseFloat(o);
      s = Dn, f = [1, E, 1];
    } else if (i === "scaleZ") {
      var C = parseFloat(o);
      s = Dn, f = [1, 1, C];
    } else if (i === "rotate" || i === "rotateZ" || i === "rotateX" || i === "rotateY") {
      var w = nn(o), R = w.unit, M = w.value, G = R === "rad" ? M : M * Math.PI / 180;
      i === "rotate" || i === "rotateZ" ? (u = "rotateZ", s = oc) : i === "rotateX" ? s = ac : i === "rotateY" && (s = ic), f = G;
    } else if (i === "matrix3d")
      s = wo, f = re(o).map(function(A) {
        return parseFloat(A);
      });
    else if (i === "matrix") {
      var z = re(o).map(function(A) {
        return parseFloat(A);
      });
      s = wo, f = [
        z[0],
        z[1],
        0,
        0,
        z[2],
        z[3],
        0,
        0,
        0,
        0,
        1,
        0,
        z[4],
        z[5],
        0,
        1
      ];
    } else
      u = "";
    return {
      name: i,
      functionName: u,
      value: o,
      matrixFunction: s,
      functionValue: f
    };
  });
}
var fc = /* @__PURE__ */ function() {
  function t() {
    this.keys = [], this.values = [];
  }
  var r = t.prototype;
  return r.get = function(e) {
    return this.values[this.keys.indexOf(e)];
  }, r.set = function(e, n) {
    var a = this.keys, i = this.values, o = a.indexOf(e), s = o === -1 ? a.length : o;
    a[s] = e, i[s] = n;
  }, t;
}(), lc = /* @__PURE__ */ function() {
  function t() {
    this.object = {};
  }
  var r = t.prototype;
  return r.get = function(e) {
    return this.object[e];
  }, r.set = function(e, n) {
    this.object[e] = n;
  }, t;
}(), cc = typeof Map == "function", vc = /* @__PURE__ */ function() {
  function t() {
  }
  var r = t.prototype;
  return r.connect = function(e, n) {
    this.prev = e, this.next = n, e && (e.next = this), n && (n.prev = this);
  }, r.disconnect = function() {
    var e = this.prev, n = this.next;
    e && (e.next = n), n && (n.prev = e);
  }, r.getIndex = function() {
    for (var e = this, n = -1; e; )
      e = e.prev, ++n;
    return n;
  }, t;
}();
function dc(t, r) {
  var e = [], n = [];
  return t.forEach(function(a) {
    var i = a[0], o = a[1], s = new vc();
    e[i] = s, n[o] = s;
  }), e.forEach(function(a, i) {
    a.connect(e[i - 1]);
  }), t.filter(function(a, i) {
    return !r[i];
  }).map(function(a, i) {
    var o = a[0], s = a[1];
    if (o === s)
      return [0, 0];
    var u = e[o], f = n[s - 1], l = u.getIndex();
    u.disconnect(), f ? u.connect(f, f.next) : u.connect(void 0, e[0]);
    var c = u.getIndex();
    return [l, c];
  });
}
var pc = /* @__PURE__ */ function() {
  function t(e, n, a, i, o, s, u, f) {
    this.prevList = e, this.list = n, this.added = a, this.removed = i, this.changed = o, this.maintained = s, this.changedBeforeAdded = u, this.fixed = f;
  }
  var r = t.prototype;
  return Object.defineProperty(r, "ordered", {
    get: function() {
      return this.cacheOrdered || this.caculateOrdered(), this.cacheOrdered;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(r, "pureChanged", {
    get: function() {
      return this.cachePureChanged || this.caculateOrdered(), this.cachePureChanged;
    },
    enumerable: !0,
    configurable: !0
  }), r.caculateOrdered = function() {
    var e = dc(this.changedBeforeAdded, this.fixed), n = this.changed, a = [];
    this.cacheOrdered = e.filter(function(i, o) {
      var s = i[0], u = i[1], f = n[o], l = f[0], c = f[1];
      if (s !== u)
        return a.push([l, c]), !0;
    }), this.cachePureChanged = a;
  }, t;
}();
function wi(t, r, e) {
  var n = cc ? Map : e ? lc : fc, a = e || function(S) {
    return S;
  }, i = [], o = [], s = [], u = t.map(a), f = r.map(a), l = new n(), c = new n(), v = [], d = [], p = {}, h = [], g = 0, y = 0;
  return u.forEach(function(S, b) {
    l.set(S, b);
  }), f.forEach(function(S, b) {
    c.set(S, b);
  }), u.forEach(function(S, b) {
    var x = c.get(S);
    typeof x > "u" ? (++y, o.push(b)) : p[x] = y;
  }), f.forEach(function(S, b) {
    var x = l.get(S);
    typeof x > "u" ? (i.push(b), ++g) : (s.push([x, b]), y = p[b] || 0, v.push([x - y, b - g]), d.push(b === x), x !== b && h.push([x, b]));
  }), o.reverse(), new pc(t, r, i, o, h, s, v, d);
}
var hc = /* @__PURE__ */ function() {
  function t(e, n) {
    e === void 0 && (e = []), this.findKeyCallback = n, this.list = [].slice.call(e);
  }
  var r = t.prototype;
  return r.update = function(e) {
    var n = [].slice.call(e), a = wi(this.list, n, this.findKeyCallback);
    return this.list = n, a;
  }, t;
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Fa = function(t, r) {
  return Fa = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, Fa(t, r);
};
function gc(t, r) {
  Fa(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Vs = typeof Map == "function" ? void 0 : /* @__PURE__ */ function() {
  var t = 0;
  return function(r) {
    return r.__DIFF_KEY__ || (r.__DIFF_KEY__ = ++t);
  };
}(), Us = /* @__PURE__ */ function(t) {
  gc(r, t);
  function r(e) {
    return e === void 0 && (e = []), t.call(this, e, Vs) || this;
  }
  return r;
}(hc);
function mc(t, r) {
  return wi(t, r, Vs);
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var La = function() {
  return La = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, La.apply(this, arguments);
};
function yc() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
var Di = /* @__PURE__ */ function() {
  function t() {
    this._events = {};
  }
  var r = t.prototype;
  return r.on = function(e, n) {
    if (Dr(e))
      for (var a in e)
        this.on(a, e[a]);
    else
      this._addEvent(e, n, {});
    return this;
  }, r.off = function(e, n) {
    if (!e)
      this._events = {};
    else if (Dr(e))
      for (var a in e)
        this.off(a);
    else if (!n)
      this._events[e] = [];
    else {
      var i = this._events[e];
      if (i) {
        var o = Fr(i, function(s) {
          return s.listener === n;
        });
        o > -1 && i.splice(o, 1);
      }
    }
    return this;
  }, r.once = function(e, n) {
    var a = this;
    return n && this._addEvent(e, n, {
      once: !0
    }), new Promise(function(i) {
      a._addEvent(e, i, {
        once: !0
      });
    });
  }, r.emit = function(e, n) {
    var a = this;
    n === void 0 && (n = {});
    var i = this._events[e];
    if (!e || !i)
      return !0;
    var o = !1;
    return n.eventType = e, n.stop = function() {
      o = !0;
    }, n.currentTarget = this, yc(i).forEach(function(s) {
      s.listener(n), s.once && a.off(e, s.listener);
    }), !o;
  }, r.trigger = function(e, n) {
    return n === void 0 && (n = {}), this.emit(e, n);
  }, r._addEvent = function(e, n, a) {
    var i = this._events;
    i[e] = i[e] || [];
    var o = i[e];
    o.push(La({
      listener: n
    }, a));
  }, t;
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Ya = function(t, r) {
  return Ya = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, Ya(t, r);
};
function Ec(t, r) {
  Ya(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var de = function() {
  return de = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, de.apply(this, arguments);
};
function Sc(t) {
  var r = t.container;
  return r === document.body ? [r.scrollLeft || document.documentElement.scrollLeft, r.scrollTop || document.documentElement.scrollTop] : [r.scrollLeft, r.scrollTop];
}
function Do(t, r) {
  return t.addEventListener("scroll", r), function() {
    t.removeEventListener("scroll", r);
  };
}
function Rn(t) {
  if (t) {
    if (Lr(t))
      return document.querySelector(t);
  } else return null;
  if (mi(t))
    return t();
  if (t instanceof Element)
    return t;
  if ("current" in t)
    return t.current;
  if ("value" in t)
    return t.value;
}
var bc = /* @__PURE__ */ function(t) {
  Ec(r, t);
  function r() {
    var n = t !== null && t.apply(this, arguments) || this;
    return n._startRect = null, n._startPos = [], n._prevTime = 0, n._timer = 0, n._prevScrollPos = [0, 0], n._isWait = !1, n._flag = !1, n._currentOptions = null, n._lock = !1, n._unregister = null, n._onScroll = function() {
      var a = n._currentOptions;
      n._lock || !a || n.emit("scrollDrag", {
        next: function(i) {
          n.checkScroll({
            container: a.container,
            inputEvent: i
          });
        }
      });
    }, n;
  }
  var e = r.prototype;
  return e.dragStart = function(n, a) {
    var i = Rn(a.container);
    if (!i) {
      this._flag = !1;
      return;
    }
    var o = 0, s = 0, u = 0, f = 0;
    if (i === document.body)
      u = window.innerWidth, f = window.innerHeight;
    else {
      var l = i.getBoundingClientRect();
      o = l.top, s = l.left, u = l.width, f = l.height;
    }
    this._flag = !0, this._startPos = [n.clientX, n.clientY], this._startRect = {
      top: o,
      left: s,
      width: u,
      height: f
    }, this._prevScrollPos = this._getScrollPosition([0, 0], a), this._currentOptions = a, this._registerScrollEvent(a);
  }, e.drag = function(n, a) {
    if (clearTimeout(this._timer), !!this._flag) {
      var i = n.clientX, o = n.clientY, s = a.threshold, u = s === void 0 ? 0 : s, f = this, l = f._startRect, c = f._startPos;
      this._currentOptions = a;
      var v = [0, 0];
      return l.top > o - u ? (c[1] > l.top || o < c[1]) && (v[1] = -1) : l.top + l.height < o + u && (c[1] < l.top + l.height || o > c[1]) && (v[1] = 1), l.left > i - u ? (c[0] > l.left || i < c[0]) && (v[0] = -1) : l.left + l.width < i + u && (c[0] < l.left + l.width || i > c[0]) && (v[0] = 1), !v[0] && !v[1] ? !1 : this._continueDrag(de(de({}, a), {
        direction: v,
        inputEvent: n,
        isDrag: !0
      }));
    }
  }, e.checkScroll = function(n) {
    var a = this;
    if (this._isWait)
      return !1;
    var i = n.prevScrollPos, o = i === void 0 ? this._prevScrollPos : i, s = n.direction, u = n.throttleTime, f = u === void 0 ? 0 : u, l = n.inputEvent, c = n.isDrag, v = this._getScrollPosition(s || [0, 0], n), d = v[0] - o[0], p = v[1] - o[1], h = s || [d ? Math.abs(d) / d : 0, p ? Math.abs(p) / p : 0];
    return this._prevScrollPos = v, this._lock = !1, !d && !p ? !1 : (this.emit("move", {
      offsetX: h[0] ? d : 0,
      offsetY: h[1] ? p : 0,
      inputEvent: l
    }), f && c && (clearTimeout(this._timer), this._timer = window.setTimeout(function() {
      a._continueDrag(n);
    }, f)), !0);
  }, e.dragEnd = function() {
    this._flag = !1, this._lock = !1, clearTimeout(this._timer), this._unregisterScrollEvent();
  }, e._getScrollPosition = function(n, a) {
    var i = a.container, o = a.getScrollPosition, s = o === void 0 ? Sc : o;
    return s({
      container: Rn(i),
      direction: n
    });
  }, e._continueDrag = function(n) {
    var a = this, i, o = n.container, s = n.direction, u = n.throttleTime, f = n.useScroll, l = n.isDrag, c = n.inputEvent;
    if (!(!this._flag || l && this._isWait)) {
      var v = Ze(), d = Math.max(u + this._prevTime - v, 0);
      if (d > 0)
        return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
          a._continueDrag(n);
        }, d), !1;
      this._prevTime = v;
      var p = this._getScrollPosition(s, n);
      this._prevScrollPos = p, l && (this._isWait = !0), f || (this._lock = !0);
      var h = {
        container: Rn(o),
        direction: s,
        inputEvent: c
      };
      return (i = n.requestScroll) === null || i === void 0 || i.call(n, h), this.emit("scroll", h), this._isWait = !1, f || this.checkScroll(de(de({}, n), {
        prevScrollPos: p,
        direction: s,
        inputEvent: c
      }));
    }
  }, e._registerScrollEvent = function(n) {
    this._unregisterScrollEvent();
    var a = n.checkScrollEvent;
    if (a) {
      var i = a === !0 ? Do : a, o = Rn(n.container);
      a === !0 && (o === document.body || o === document.documentElement) ? this._unregister = Do(window, this._onScroll) : this._unregister = i(o, this._onScroll);
    }
  }, e._unregisterScrollEvent = function() {
    var n;
    (n = this._unregister) === null || n === void 0 || n.call(this), this._unregister = null;
  }, r;
}(Di);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function xc() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
function lr(t) {
  return yt(t, jt);
}
function _c(t, r) {
  return t.every(function(e, n) {
    return lr(e - r[n]) === 0;
  });
}
function Cc(t, r) {
  return !lr(t[0] - r[0]) && !lr(t[1] - r[1]);
}
function Ks(t) {
  return t.length < 3 ? 0 : Math.abs(Vl(t.map(function(r, e) {
    var n = t[e + 1] || t[0];
    return r[0] * n[1] - n[0] * r[1];
  }))) / 2;
}
function Ro(t, r) {
  var e = r.width, n = r.height, a = r.left, i = r.top, o = ie(t), s = o.minX, u = o.minY, f = o.maxX, l = o.maxY, c = e / (f - s), v = n / (l - u);
  return t.map(function(d) {
    return [a + (d[0] - s) * c, i + (d[1] - u) * v];
  });
}
function ie(t) {
  var r = t.map(function(n) {
    return n[0];
  }), e = t.map(function(n) {
    return n[1];
  });
  return {
    minX: Math.min.apply(Math, r),
    minY: Math.min.apply(Math, e),
    maxX: Math.max.apply(Math, r),
    maxY: Math.max.apply(Math, e)
  };
}
function Wa(t, r, e) {
  var n = t[0], a = t[1], i = ie(r), o = i.minX, s = i.maxX, u = [[o, a], [s, a]], f = qn(u[0], u[1]), l = Ha(r), c = [];
  if (l.forEach(function(p) {
    var h = qn(p[0], p[1]), g = p[0];
    if (_c(f, h))
      c.push({
        pos: t,
        line: p,
        type: "line"
      });
    else {
      var y = Zs(Ri(f, h), [u, p]);
      y.forEach(function(S) {
        p.some(function(b) {
          return Cc(b, S);
        }) ? c.push({
          pos: S,
          line: p,
          type: "point"
        }) : lr(g[1] - a) !== 0 && c.push({
          pos: S,
          line: p,
          type: "intersection"
        });
      });
    }
  }), mr(c, function(p) {
    return p[0] === n;
  }))
    return !0;
  var v = 0, d = {};
  return c.forEach(function(p) {
    var h = p.pos, g = p.type, y = p.line;
    if (!(h[0] > n))
      if (g === "intersection")
        ++v;
      else {
        if (g === "line")
          return;
        if (g === "point") {
          var S = mr(y, function(E) {
            return E[1] !== a;
          }), b = d[h[0]], x = S[1] > a ? 1 : -1;
          b ? b !== x && ++v : d[h[0]] = x;
        }
      }
  }), v % 2 === 1;
}
function qn(t, r) {
  var e = t[0], n = t[1], a = r[0], i = r[1], o = a - e, s = i - n;
  Math.abs(o) < jt && (o = 0), Math.abs(s) < jt && (s = 0);
  var u = 0, f = 0, l = 0;
  return o ? s ? (u = -s / o, f = 1, l = -u * e - n) : (f = 1, l = -n) : s && (u = -1, l = e), [u, f, l];
}
function Ri(t, r) {
  var e = t[0], n = t[1], a = t[2], i = r[0], o = r[1], s = r[2], u = e === 0 && i === 0, f = n === 0 && o === 0, l = [];
  if (u && f)
    return [];
  if (u) {
    var c = -a / n, v = -s / o;
    return c !== v ? [] : [[-1 / 0, c], [1 / 0, c]];
  } else if (f) {
    var d = -a / e, p = -s / i;
    return d !== p ? [] : [[d, -1 / 0], [d, 1 / 0]];
  } else if (e === 0) {
    var h = -a / n, g = -(o * h + s) / i;
    l = [[g, h]];
  } else if (i === 0) {
    var h = -s / o, g = -(n * h + a) / e;
    l = [[g, h]];
  } else if (n === 0) {
    var g = -a / e, h = -(i * g + s) / o;
    l = [[g, h]];
  } else if (o === 0) {
    var g = -s / i, h = -(e * g + a) / n;
    l = [[g, h]];
  } else {
    var g = (n * s - o * a) / (o * e - n * i), h = -(e * g + a) / n;
    l = [[g, h]];
  }
  return l.map(function(y) {
    return [y[0], y[1]];
  });
}
function Zs(t, r) {
  var e = r.map(function(c) {
    return [0, 1].map(function(v) {
      return [Math.min(c[0][v], c[1][v]), Math.max(c[0][v], c[1][v])];
    });
  }), n = [];
  if (t.length === 2) {
    var a = t[0], i = a[0], o = a[1];
    if (lr(i - t[1][0])) {
      if (!lr(o - t[1][1])) {
        var f = Math.max.apply(Math, e.map(function(c) {
          return c[0][0];
        })), l = Math.min.apply(Math, e.map(function(c) {
          return c[0][1];
        }));
        if (lr(f - l) > 0)
          return [];
        n = [[f, o], [l, o]];
      }
    } else {
      var s = Math.max.apply(Math, e.map(function(c) {
        return c[1][0];
      })), u = Math.min.apply(Math, e.map(function(c) {
        return c[1][1];
      }));
      if (lr(s - u) > 0)
        return [];
      n = [[i, s], [i, u]];
    }
  }
  return n.length || (n = t.filter(function(c) {
    var v = c[0], d = c[1];
    return e.every(function(p) {
      return 0 <= lr(v - p[0][0]) && 0 <= lr(p[0][1] - v) && 0 <= lr(d - p[1][0]) && 0 <= lr(p[1][1] - d);
    });
  })), n.map(function(c) {
    return [lr(c[0]), lr(c[1])];
  });
}
function Ha(t) {
  return xc(t.slice(1), [t[0]]).map(function(r, e) {
    return [t[e], r];
  });
}
function wc(t, r) {
  var e = t.slice(), n = r.slice();
  _o(e) === -1 && e.reverse(), _o(n) === -1 && n.reverse();
  var a = Ha(e), i = Ha(n), o = a.map(function(l) {
    return qn(l[0], l[1]);
  }), s = i.map(function(l) {
    return qn(l[0], l[1]);
  }), u = [];
  o.forEach(function(l, c) {
    var v = a[c], d = [];
    s.forEach(function(p, h) {
      var g = Ri(l, p), y = Zs(g, [v, i[h]]);
      d.push.apply(d, y.map(function(S) {
        return {
          index1: c,
          index2: h,
          pos: S,
          type: "intersection"
        };
      }));
    }), d.sort(function(p, h) {
      return Br(v[0], p.pos) - Br(v[0], h.pos);
    }), u.push.apply(u, d), Wa(v[1], n) && u.push({
      index1: c,
      index2: -1,
      pos: v[1],
      type: "inside"
    });
  }), i.forEach(function(l, c) {
    if (Wa(l[1], e)) {
      var v = !1, d = Fr(u, function(p) {
        var h = p.index2;
        return h === c ? (v = !0, !1) : !!v;
      });
      d === -1 && (v = !1, d = Fr(u, function(p) {
        var h = p.index1, g = p.index2;
        return h === -1 && g + 1 === c ? (v = !0, !1) : !!v;
      })), d === -1 ? u.push({
        index1: -1,
        index2: c,
        pos: l[1],
        type: "inside"
      }) : u.splice(d, 0, {
        index1: -1,
        index2: c,
        pos: l[1],
        type: "inside"
      });
    }
  });
  var f = {};
  return u.filter(function(l) {
    var c = l.pos, v = c[0] + "x" + c[1];
    return f[v] ? !1 : (f[v] = !0, !0);
  });
}
function Dc(t, r) {
  var e = wc(t, r);
  return e.map(function(n) {
    var a = n.pos;
    return a;
  });
}
function Rc(t, r) {
  var e = Dc(t, r);
  return Ks(e);
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var $a = function(t, r) {
  return $a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, $a(t, r);
};
function Tc(t, r) {
  $a(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Ht = function() {
  return Ht = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Ht.apply(this, arguments);
};
function Mc(t, r) {
  var e = r[0] - t[0], n = r[1] - t[1], a = Math.atan2(n, e);
  return a >= 0 ? a : a + Math.PI * 2;
}
function Ea(t) {
  return Mc([
    t[0].clientX,
    t[0].clientY
  ], [
    t[1].clientX,
    t[1].clientY
  ]) / Math.PI * 180;
}
function Oc(t) {
  return t.touches && t.touches.length >= 2;
}
function Tn(t) {
  return t ? t.touches ? Ac(t.touches) : [Js(t)] : [];
}
function Pc(t) {
  return t && (t.type.indexOf("mouse") > -1 || "button" in t);
}
function To(t, r, e) {
  var n = e.length, a = Le(t, n), i = a.clientX, o = a.clientY, s = a.originalClientX, u = a.originalClientY, f = Le(r, n), l = f.clientX, c = f.clientY, v = Le(e, n), d = v.clientX, p = v.clientY, h = i - l, g = o - c, y = i - d, S = o - p;
  return {
    clientX: s,
    clientY: u,
    deltaX: h,
    deltaY: g,
    distX: y,
    distY: S
  };
}
function Sa(t) {
  return Math.sqrt(Math.pow(t[0].clientX - t[1].clientX, 2) + Math.pow(t[0].clientY - t[1].clientY, 2));
}
function Ac(t) {
  for (var r = Math.min(t.length, 2), e = [], n = 0; n < r; ++n)
    e.push(Js(t[n]));
  return e;
}
function Js(t) {
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}
function Le(t, r) {
  r === void 0 && (r = t.length);
  for (var e = {
    clientX: 0,
    clientY: 0,
    originalClientX: 0,
    originalClientY: 0
  }, n = Math.min(t.length, r), a = 0; a < n; ++a) {
    var i = t[a];
    e.originalClientX += "originalClientX" in i ? i.originalClientX : i.clientX, e.originalClientY += "originalClientY" in i ? i.originalClientY : i.clientY, e.clientX += i.clientX, e.clientY += i.clientY;
  }
  return r ? {
    clientX: e.clientX / r,
    clientY: e.clientY / r,
    originalClientX: e.originalClientX / r,
    originalClientY: e.originalClientY / r
  } : e;
}
var ba = /* @__PURE__ */ function() {
  function t(r) {
    this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = r, this.prevClients = r, this.length = r.length;
  }
  return t.prototype.getAngle = function(r) {
    return r === void 0 && (r = this.prevClients), Ea(r);
  }, t.prototype.getRotation = function(r) {
    return r === void 0 && (r = this.prevClients), Ea(r) - Ea(this.startClients);
  }, t.prototype.getPosition = function(r, e) {
    r === void 0 && (r = this.prevClients);
    var n = To(r || this.prevClients, this.prevClients, this.startClients), a = n.deltaX, i = n.deltaY;
    return this.movement += Math.sqrt(a * a + i * i), this.prevClients = r, n;
  }, t.prototype.getPositions = function(r) {
    r === void 0 && (r = this.prevClients);
    for (var e = this.prevClients, n = this.startClients, a = Math.min(this.length, e.length), i = [], o = 0; o < a; ++o)
      i[o] = To([r[o]], [e[o]], [n[o]]);
    return i;
  }, t.prototype.getMovement = function(r) {
    var e = this.movement;
    if (!r)
      return e;
    var n = Le(r, this.length), a = Le(this.prevClients, this.length), i = n.clientX - a.clientX, o = n.clientY - a.clientY;
    return Math.sqrt(i * i + o * o) + e;
  }, t.prototype.getDistance = function(r) {
    return r === void 0 && (r = this.prevClients), Sa(r);
  }, t.prototype.getScale = function(r) {
    return r === void 0 && (r = this.prevClients), Sa(r) / Sa(this.startClients);
  }, t.prototype.move = function(r, e) {
    this.startClients.forEach(function(n) {
      n.clientX -= r, n.clientY -= e;
    }), this.prevClients.forEach(function(n) {
      n.clientX -= r, n.clientY -= e;
    });
  }, t;
}(), Mo = ["textarea", "input"], Ic = /* @__PURE__ */ function(t) {
  Tc(r, t);
  function r(e, n) {
    n === void 0 && (n = {});
    var a = t.call(this) || this;
    a.options = {}, a.flag = !1, a.pinchFlag = !1, a.data = {}, a.isDrag = !1, a.isPinch = !1, a.clientStores = [], a.targets = [], a.prevTime = 0, a.doubleFlag = !1, a._useMouse = !1, a._useTouch = !1, a._useDrag = !1, a._dragFlag = !1, a._isTrusted = !1, a._isMouseEvent = !1, a._isSecondaryButton = !1, a._preventMouseEvent = !1, a._prevInputEvent = null, a._isDragAPI = !1, a._isIdle = !0, a._preventMouseEventId = 0, a._window = window, a.onDragStart = function(v, d) {
      if (d === void 0 && (d = !0), !(!a.flag && v.cancelable === !1)) {
        var p = v.type.indexOf("drag") >= -1;
        if (!(a.flag && p)) {
          a._isDragAPI = !0;
          var h = a.options, g = h.container, y = h.pinchOutside, S = h.preventWheelClick, b = h.preventRightClick, x = h.preventDefault, E = h.checkInput, _ = h.dragFocusedInput, C = h.preventClickEventOnDragStart, w = h.preventClickEventOnDrag, R = h.preventClickEventByCondition, M = a._useTouch, G = !a.flag;
          if (a._isSecondaryButton = v.which === 3 || v.button === 2, S && (v.which === 2 || v.button === 1) || b && (v.which === 3 || v.button === 2))
            return a.stop(), !1;
          if (G) {
            var z = a._window.document.activeElement, A = v.target;
            if (A) {
              var N = A.tagName.toLowerCase(), B = Mo.indexOf(N) > -1, X = A.isContentEditable;
              if (B || X) {
                if (E || !_ && z === A)
                  return !1;
                if (z && (z === A || X && z.isContentEditable && z.contains(A)))
                  if (_)
                    A.blur();
                  else
                    return !1;
              } else if ((x || v.type === "touchstart") && z) {
                var U = z.tagName.toLowerCase();
                (z.isContentEditable || Mo.indexOf(U) > -1) && z.blur();
              }
              (C || w || R) && rr(a._window, "click", a._onClick, !0);
            }
            a.clientStores = [new ba(Tn(v))], a._isIdle = !1, a.flag = !0, a.isDrag = !1, a._isTrusted = d, a._dragFlag = !0, a._prevInputEvent = v, a.data = {}, a.doubleFlag = Ze() - a.prevTime < 200, a._isMouseEvent = Pc(v), !a._isMouseEvent && a._preventMouseEvent && a._allowMouseEvent();
            var j = a._preventMouseEvent || a.emit("dragStart", Ht(Ht({ data: a.data, datas: a.data, inputEvent: v, isMouseEvent: a._isMouseEvent, isSecondaryButton: a._isSecondaryButton, isTrusted: d, isDouble: a.doubleFlag }, a.getCurrentStore().getPosition()), { preventDefault: function() {
              v.preventDefault();
            }, preventDrag: function() {
              a._dragFlag = !1;
            } }));
            j === !1 && a.stop(), a._isMouseEvent && a.flag && x && v.preventDefault();
          }
          if (!a.flag)
            return !1;
          var $ = 0;
          if (G ? (a._attchDragEvent(), M && y && ($ = setTimeout(function() {
            rr(g, "touchstart", a.onDragStart, {
              passive: !1
            });
          }))) : M && y && Jt(g, "touchstart", a.onDragStart), a.flag && Oc(v)) {
            if (clearTimeout($), G && v.touches.length !== v.changedTouches.length)
              return;
            a.pinchFlag || a.onPinchStart(v);
          }
        }
      }
    }, a.onDrag = function(v, d) {
      if (a.flag) {
        var p = a.options.preventDefault;
        !a._isMouseEvent && p && v.preventDefault(), a._prevInputEvent = v;
        var h = Tn(v), g = a.moveClients(h, v, !1);
        if (a._dragFlag) {
          if (a.pinchFlag || g.deltaX || g.deltaY) {
            var y = a._preventMouseEvent || a.emit("drag", Ht(Ht({}, g), { isScroll: !!d, inputEvent: v }));
            if (y === !1) {
              a.stop();
              return;
            }
          }
          a.pinchFlag && a.onPinch(v, h);
        }
        a.getCurrentStore().getPosition(h, !0);
      }
    }, a.onDragEnd = function(v) {
      if (a.flag) {
        var d = a.options, p = d.pinchOutside, h = d.container, g = d.preventClickEventOnDrag, y = d.preventClickEventOnDragStart, S = d.preventClickEventByCondition, b = a.isDrag;
        (g || y || S) && requestAnimationFrame(function() {
          a._allowClickEvent();
        }), !S && !y && g && !b && a._allowClickEvent(), a._useTouch && p && Jt(h, "touchstart", a.onDragStart), a.pinchFlag && a.onPinchEnd(v);
        var x = v?.touches ? Tn(v) : [], E = x.length;
        E === 0 || !a.options.keepDragging ? a.flag = !1 : a._addStore(new ba(x));
        var _ = a._getPosition(), C = Ze(), w = !b && a.doubleFlag;
        a._prevInputEvent = null, a.prevTime = b || w ? 0 : C, a.flag || (a._dettachDragEvent(), a._preventMouseEvent || a.emit("dragEnd", Ht({ data: a.data, datas: a.data, isDouble: w, isDrag: b, isClick: !b, isMouseEvent: a._isMouseEvent, isSecondaryButton: a._isSecondaryButton, inputEvent: v, isTrusted: a._isTrusted }, _)), a.clientStores = [], a._isMouseEvent || (a._preventMouseEvent = !0, clearTimeout(a._preventMouseEventId), a._preventMouseEventId = setTimeout(function() {
          a._preventMouseEvent = !1;
        }, 200)), a._isIdle = !0);
      }
    }, a.onBlur = function() {
      a.onDragEnd();
    }, a._allowClickEvent = function() {
      Jt(a._window, "click", a._onClick, !0);
    }, a._onClick = function(v) {
      a._allowClickEvent(), a._allowMouseEvent();
      var d = a.options.preventClickEventByCondition;
      d?.(v) || (v.stopPropagation(), v.preventDefault());
    }, a._onContextMenu = function(v) {
      var d = a.options;
      d.preventRightClick ? a.onDragEnd(v) : v.preventDefault();
    }, a._passCallback = function() {
    };
    var i = [].concat(e), o = i[0];
    a._window = $s(o) ? o : $r(o), a.options = Ht({ checkInput: !1, container: o && !("document" in o) ? $r(o) : o, preventRightClick: !0, preventWheelClick: !0, preventClickEventOnDragStart: !1, preventClickEventOnDrag: !1, preventClickEventByCondition: null, preventDefault: !0, checkWindowBlur: !1, keepDragging: !1, pinchThreshold: 0, events: ["touch", "mouse"] }, n);
    var s = a.options, u = s.container, f = s.events, l = s.checkWindowBlur;
    if (a._useDrag = f.indexOf("drag") > -1, a._useTouch = f.indexOf("touch") > -1, a._useMouse = f.indexOf("mouse") > -1, a.targets = i, a._useDrag && i.forEach(function(v) {
      rr(v, "dragstart", a.onDragStart);
    }), a._useMouse && (i.forEach(function(v) {
      rr(v, "mousedown", a.onDragStart), rr(v, "mousemove", a._passCallback);
    }), rr(u, "contextmenu", a._onContextMenu)), l && rr($r(), "blur", a.onBlur), a._useTouch) {
      var c = {
        passive: !1
      };
      i.forEach(function(v) {
        rr(v, "touchstart", a.onDragStart, c), rr(v, "touchmove", a._passCallback, c);
      });
    }
    return a;
  }
  return r.prototype.stop = function() {
    this.isDrag = !1, this.data = {}, this.clientStores = [], this.pinchFlag = !1, this.doubleFlag = !1, this.prevTime = 0, this.flag = !1, this._isIdle = !0, this._allowClickEvent(), this._dettachDragEvent(), this._isDragAPI = !1;
  }, r.prototype.getMovement = function(e) {
    return this.getCurrentStore().getMovement(e) + this.clientStores.slice(1).reduce(function(n, a) {
      return n + a.movement;
    }, 0);
  }, r.prototype.isDragging = function() {
    return this.isDrag;
  }, r.prototype.isIdle = function() {
    return this._isIdle;
  }, r.prototype.isFlag = function() {
    return this.flag;
  }, r.prototype.isPinchFlag = function() {
    return this.pinchFlag;
  }, r.prototype.isDoubleFlag = function() {
    return this.doubleFlag;
  }, r.prototype.isPinching = function() {
    return this.isPinch;
  }, r.prototype.scrollBy = function(e, n, a, i) {
    i === void 0 && (i = !0), this.flag && (this.clientStores[0].move(e, n), i && this.onDrag(a, !0));
  }, r.prototype.move = function(e, n) {
    var a = e[0], i = e[1], o = this.getCurrentStore(), s = o.prevClients;
    return this.moveClients(s.map(function(u) {
      var f = u.clientX, l = u.clientY;
      return {
        clientX: f + a,
        clientY: l + i,
        originalClientX: f,
        originalClientY: l
      };
    }), n, !0);
  }, r.prototype.triggerDragStart = function(e) {
    this.onDragStart(e, !1);
  }, r.prototype.setEventData = function(e) {
    var n = this.data;
    for (var a in e)
      n[a] = e[a];
    return this;
  }, r.prototype.setEventDatas = function(e) {
    return this.setEventData(e);
  }, r.prototype.getCurrentEvent = function(e) {
    return e === void 0 && (e = this._prevInputEvent), Ht(Ht({ data: this.data, datas: this.data }, this._getPosition()), { movement: this.getMovement(), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: !1, inputEvent: e });
  }, r.prototype.getEventData = function() {
    return this.data;
  }, r.prototype.getEventDatas = function() {
    return this.data;
  }, r.prototype.unset = function() {
    var e = this, n = this.targets, a = this.options.container;
    this.off(), Jt(this._window, "blur", this.onBlur), this._useDrag && n.forEach(function(i) {
      Jt(i, "dragstart", e.onDragStart);
    }), this._useMouse && (n.forEach(function(i) {
      Jt(i, "mousedown", e.onDragStart);
    }), Jt(a, "contextmenu", this._onContextMenu)), this._useTouch && (n.forEach(function(i) {
      Jt(i, "touchstart", e.onDragStart);
    }), Jt(a, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
  }, r.prototype.onPinchStart = function(e) {
    var n = this, a = this.options.pinchThreshold;
    if (!(this.isDrag && this.getMovement() > a)) {
      var i = new ba(Tn(e));
      this.pinchFlag = !0, this._addStore(i);
      var o = this.emit("pinchStart", Ht(Ht({ data: this.data, datas: this.data, angle: i.getAngle(), touches: this.getCurrentStore().getPositions() }, i.getPosition()), { inputEvent: e, isTrusted: this._isTrusted, preventDefault: function() {
        e.preventDefault();
      }, preventDrag: function() {
        n._dragFlag = !1;
      } }));
      o === !1 && (this.pinchFlag = !1);
    }
  }, r.prototype.onPinch = function(e, n) {
    if (!(!this.flag || !this.pinchFlag || n.length < 2)) {
      var a = this.getCurrentStore();
      this.isPinch = !0, this.emit("pinch", Ht(Ht({ data: this.data, datas: this.data, movement: this.getMovement(n), angle: a.getAngle(n), rotation: a.getRotation(n), touches: a.getPositions(n), scale: a.getScale(n), distance: a.getDistance(n) }, a.getPosition(n)), { inputEvent: e, isTrusted: this._isTrusted }));
    }
  }, r.prototype.onPinchEnd = function(e) {
    if (this.pinchFlag) {
      var n = this.isPinch;
      this.isPinch = !1, this.pinchFlag = !1;
      var a = this.getCurrentStore();
      this.emit("pinchEnd", Ht(Ht({ data: this.data, datas: this.data, isPinch: n, touches: a.getPositions() }, a.getPosition()), { inputEvent: e }));
    }
  }, r.prototype.getCurrentStore = function() {
    return this.clientStores[0];
  }, r.prototype.moveClients = function(e, n, a) {
    var i = this._getPosition(e, a), o = this.isDrag;
    (i.deltaX || i.deltaY) && (this.isDrag = !0);
    var s = !1;
    return !o && this.isDrag && (s = !0), Ht(Ht({ data: this.data, datas: this.data }, i), { movement: this.getMovement(e), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: !1, isMouseEvent: this._isMouseEvent, isSecondaryButton: this._isSecondaryButton, inputEvent: n, isTrusted: this._isTrusted, isFirstDrag: s });
  }, r.prototype._addStore = function(e) {
    this.clientStores.splice(0, 0, e);
  }, r.prototype._getPosition = function(e, n) {
    var a = this.getCurrentStore(), i = a.getPosition(e, n), o = this.clientStores.slice(1).reduce(function(f, l) {
      var c = l.getPosition();
      return f.distX += c.distX, f.distY += c.distY, f;
    }, i), s = o.distX, u = o.distY;
    return Ht(Ht({}, i), { distX: s, distY: u });
  }, r.prototype._attchDragEvent = function() {
    var e = this._window, n = this.options.container, a = {
      passive: !1
    };
    this._isDragAPI && (rr(n, "dragover", this.onDrag, a), rr(e, "dragend", this.onDragEnd)), this._useMouse && (rr(n, "mousemove", this.onDrag), rr(e, "mouseup", this.onDragEnd)), this._useTouch && (rr(n, "touchmove", this.onDrag, a), rr(e, "touchend", this.onDragEnd, a), rr(e, "touchcancel", this.onDragEnd, a));
  }, r.prototype._dettachDragEvent = function() {
    var e = this._window, n = this.options.container;
    this._isDragAPI && (Jt(n, "dragover", this.onDrag), Jt(e, "dragend", this.onDragEnd)), this._useMouse && (Jt(n, "mousemove", this.onDrag), Jt(e, "mouseup", this.onDragEnd)), this._useTouch && (Jt(n, "touchstart", this.onDragStart), Jt(n, "touchmove", this.onDrag), Jt(e, "touchend", this.onDragEnd), Jt(e, "touchcancel", this.onDragEnd));
  }, r.prototype._allowMouseEvent = function() {
    this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
  }, r;
}(Di);
function kc(t) {
  for (var r = 5381, e = t.length; e; )
    r = r * 33 ^ t.charCodeAt(--e);
  return r >>> 0;
}
var zc = kc;
function Gc(t) {
  return zc(t).toString(36);
}
function Bc(t) {
  if (t && t.getRootNode) {
    var r = t.getRootNode();
    if (r.nodeType === 11)
      return r;
  }
}
function Nc(t, r, e) {
  return e.original ? r : r.replace(/([^};{\s}][^};{]*|^\s*){/mg, function(n, a) {
    var i = a.trim();
    return (i ? re(i) : [""]).map(function(o) {
      var s = o.trim();
      return s.indexOf("@") === 0 ? s : s.indexOf(":global") > -1 ? s.replace(/\:global/g, "") : s.indexOf(":host") > -1 ? "".concat(s.replace(/\:host/g, ".".concat(t))) : s ? ".".concat(t, " ").concat(s) : ".".concat(t);
    }).join(", ") + " {";
  });
}
function Fc(t, r, e, n, a) {
  var i = Si(n), o = i.createElement("style");
  return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", t), o.setAttribute("data-styled-count", "1"), e.nonce && o.setAttribute("nonce", e.nonce), o.innerHTML = Nc(t, r, e), (a || i.head || i.body).appendChild(o), o;
}
function Lc(t) {
  var r = "rCS" + Gc(t);
  return {
    className: r,
    inject: function(e, n) {
      n === void 0 && (n = {});
      var a = Bc(e), i = (a || e.ownerDocument || document).querySelector('style[data-styled-id="'.concat(r, '"]'));
      if (!i)
        i = Fc(r, t, n, e, a);
      else {
        var o = parseFloat(i.getAttribute("data-styled-count")) || 0;
        i.setAttribute("data-styled-count", "".concat(o + 1));
      }
      return {
        destroy: function() {
          var s, u = parseFloat(i.getAttribute("data-styled-count")) || 0;
          u <= 1 ? (i.remove ? i.remove() : (s = i.parentNode) === null || s === void 0 || s.removeChild(i), i = null) : i.setAttribute("data-styled-count", "".concat(u - 1));
        }
      };
    }
  };
}
var ja = function() {
  return ja = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, ja.apply(this, arguments);
};
function Yc(t, r) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(t); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (e[n[a]] = t[n[a]]);
  return e;
}
function Qs(t, r) {
  var e = Lc(r), n = e.className;
  return St.forwardRef(function(a, i) {
    var o = a.className, s = o === void 0 ? "" : o;
    a.cspNonce;
    var u = Yc(a, ["className", "cspNonce"]), f = St.useRef();
    return St.useImperativeHandle(i, function() {
      return f.current;
    }, []), St.useEffect(function() {
      var l = e.inject(f.current, {
        nonce: a.cspNonce
      });
      return function() {
        l.destroy();
      };
    }, []), St.createElement(t, ja({
      ref: f,
      "data-styled-id": n,
      className: "".concat(s, " ").concat(n)
    }, u));
  });
}
var Xa = function(t, r) {
  return Xa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
  }, Xa(t, r);
};
function sn(t, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  Xa(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var P = function() {
  return P = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, P.apply(this, arguments);
};
function Wc(t, r) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(t); a < n.length; a++)
      r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (e[n[a]] = t[n[a]]);
  return e;
}
function Hc(t, r, e, n) {
  var a = arguments.length, i = a < 3 ? r : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(t, r, e, n);
  else for (var s = t.length - 1; s >= 0; s--) (o = t[s]) && (i = (a < 3 ? o(i) : a > 3 ? o(r, e, i) : o(r, e)) || i);
  return a > 3 && i && Object.defineProperty(r, e, i), i;
}
function $c(t) {
  var r = typeof Symbol == "function" && Symbol.iterator, e = r && t[r], n = 0;
  if (e) return e.call(t);
  if (t && typeof t.length == "number") return {
    next: function() {
      return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function I(t, r) {
  var e = typeof Symbol == "function" && t[Symbol.iterator];
  if (!e) return t;
  var n = e.call(t), a, i = [], o;
  try {
    for (; (r === void 0 || r-- > 0) && !(a = n.next()).done; ) i.push(a.value);
  } catch (s) {
    o = { error: s };
  } finally {
    try {
      a && !a.done && (e = n.return) && e.call(n);
    } finally {
      if (o) throw o.error;
    }
  }
  return i;
}
function Z(t, r, e) {
  if (arguments.length === 2) for (var n = 0, a = r.length, i; n < a; n++)
    (i || !(n in r)) && (i || (i = Array.prototype.slice.call(r, 0, n)), i[n] = r[n]);
  return t.concat(i || Array.prototype.slice.call(r));
}
function un(t, r) {
  return P({ events: [], props: [], name: t }, r);
}
var jc = ["n", "w", "s", "e"], Ti = ["n", "w", "s", "e", "nw", "ne", "sw", "se"];
function Xc(t, r) {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="'.concat(32 * t, 'px" height="').concat(32 * t, 'px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(').concat(r, 'deg);transform-origin: 16px 16px"></path></svg>');
}
function qc(t) {
  var r = Xc(1, t), e = Math.round(t / 45) * 45 % 180, n = "ns-resize";
  return e === 135 ? n = "nwse-resize" : e === 45 ? n = "nesw-resize" : e === 90 && (n = "ew-resize"), "cursor:".concat(n, ";cursor: url('").concat(r, "') 16 16, ").concat(n, ";");
}
var Me = Il(), tu = Me.browser.webkit, ru = tu && function() {
  var t = typeof window > "u" ? { userAgent: "" } : window.navigator, r = /applewebkit\/([^\s]+)/g.exec(t.userAgent.toLowerCase());
  return r ? parseFloat(r[1]) < 605 : !1;
}(), eu = Me.browser.name, nu = parseInt(Me.browser.version, 10), Vc = eu === "chrome", Uc = Me.browser.chromium, Kc = parseInt(Me.browser.chromiumVersion, 10) || 0, Zc = Vc && nu >= 109 || Uc && Kc >= 109, Jc = eu === "firefox", Qc = parseInt(Me.browser.webkitVersion, 10) >= 612 || nu >= 15, Mi = "moveable-", tv = Ti.map(function(t) {
  var r = "", e = "", n = "center", a = "center", i = "calc(var(--moveable-control-padding, 20) * -1px)";
  return t.indexOf("n") > -1 && (r = "top: ".concat(i, ";"), a = "bottom"), t.indexOf("s") > -1 && (r = "top: 0px;", a = "top"), t.indexOf("w") > -1 && (e = "left: ".concat(i, ";"), n = "right"), t.indexOf("e") > -1 && (e = "left: 0px;", n = "left"), '.around-control[data-direction*="'.concat(t, `"] {
        `).concat(e).concat(r, `
        transform-origin: `).concat(n, " ").concat(a, `;
    }`);
}).join(`
`), rv = `
{
position: absolute;
width: 1px;
height: 1px;
left: 0;
top: 0;
z-index: 3000;
--moveable-color: #4af;
--zoom: 1;
--zoompx: 1px;
--moveable-line-padding: 0;
--moveable-control-padding: 0;
will-change: transform;
outline: 1px solid transparent;
}
.control-box {
z-index: 0;
}
.line, .control {
position: absolute;
left: 0;
top: 0;
will-change: transform;
}
.control {
width: 14px;
height: 14px;
border-radius: 50%;
border: 2px solid #fff;
box-sizing: border-box;
background: #4af;
background: var(--moveable-color);
margin-top: -7px;
margin-left: -7px;
border: 2px solid #fff;
z-index: 10;
}
.around-control {
position: absolute;
will-change: transform;
width: calc(var(--moveable-control-padding, 20) * 1px);
height: calc(var(--moveable-control-padding, 20) * 1px);
left: calc(var(--moveable-control-padding, 20) * -0.5px);
top: calc(var(--moveable-control-padding, 20) * -0.5px);
box-sizing: border-box;
background: transparent;
z-index: 8;
cursor: alias;
transform-origin: center center;
}
`.concat(tv, `
.padding {
position: absolute;
top: 0px;
left: 0px;
width: 100px;
height: 100px;
transform-origin: 0 0;
}
.line {
width: 1px;
height: 1px;
background: #4af;
background: var(--moveable-color);
transform-origin: 0px 50%;
}
.line.edge {
z-index: 1;
background: transparent;
}
.line.dashed {
box-sizing: border-box;
background: transparent;
}
.line.dashed.horizontal {
border-top: 1px dashed #4af;
border-top-color: #4af;
border-top-color: var(--moveable-color);
}
.line.dashed.vertical {
border-left: 1px dashed #4af;
border-left-color: #4af;
border-left-color: var(--moveable-color);
}
.line.vertical {
transform: translateX(-50%);
}
.line.horizontal {
transform: translateY(-50%);
}
.line.vertical.bold {
width: 2px;
}
.line.horizontal.bold {
height: 2px;
}

.control.origin {
border-color: #f55;
background: #fff;
width: 12px;
height: 12px;
margin-top: -6px;
margin-left: -6px;
pointer-events: none;
}
`).concat([0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(function(t) {
  return `
.direction[data-rotation="`.concat(t, '"], :global .view-control-rotation').concat(t, ` {
`).concat(qc(t), `
}
`);
}).join(`
`), `

.line.direction:before {
content: "";
position: absolute;
width: 100%;
height: calc(var(--moveable-line-padding, 0) * 1px);
bottom: 0;
left: 0;
}
.group {
z-index: -1;
}
.area {
position: absolute;
}
.area-pieces {
position: absolute;
top: 0;
left: 0;
display: none;
}
.area.avoid, .area.pass {
pointer-events: none;
}
.area.avoid+.area-pieces {
display: block;
}
.area-piece {
position: absolute;
}

`).concat(ru ? `:global svg *:before {
content:"";
transform-origin: inherit;
}` : "", `
`), ev = [
  [0, 1, 2],
  [1, 0, 3],
  [2, 0, 3],
  [3, 1, 2]
], qa = 1e-4, sr = 1e-7, Mn = 1e-9, Va = Math.pow(10, 10), Oo = -Va, nv = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
  nw: [-1, -1],
  ne: [1, -1],
  sw: [-1, 1],
  se: [1, 1]
}, Oi = {
  n: [0, 1],
  e: [1, 3],
  s: [3, 2],
  w: [2, 0],
  nw: [0],
  ne: [1],
  sw: [2],
  se: [3]
}, au = {
  n: 0,
  s: 180,
  w: 270,
  e: 90,
  nw: 315,
  ne: 45,
  sw: 225,
  se: 135
}, av = [
  "isMoveableElement",
  "updateRect",
  "updateTarget",
  "destroy",
  "dragStart",
  "isInside",
  "hitTest",
  "setState",
  "getRect",
  "request",
  "isDragging",
  "getManager",
  "forceUpdate",
  "waitToChangeTarget",
  "updateSelectors",
  "getTargets",
  "stopDrag",
  "getControlBoxElement",
  "getMoveables",
  "getDragElement"
];
function fn(t, r, e, n, a, i) {
  var o, s;
  i === void 0 && (i = "draggable");
  var u = (s = (o = r.gestos[i]) === null || o === void 0 ? void 0 : o.move(e, t.inputEvent)) !== null && s !== void 0 ? s : {}, f = u.originalDatas || u.datas, l = f[i] || (f[i] = {});
  return P(P({}, u), { isPinch: !!n, parentEvent: !0, datas: l, originalDatas: t.originalDatas });
}
var xe = /* @__PURE__ */ function() {
  function t(r) {
    var e;
    r === void 0 && (r = "draggable"), this.ableName = r, this.prevX = 0, this.prevY = 0, this.startX = 0, this.startY = 0, this.isDrag = !1, this.isFlag = !1, this.datas = {
      draggable: {}
    }, this.datas = (e = {}, e[r] = {}, e);
  }
  return t.prototype.dragStart = function(r, e) {
    this.isDrag = !1, this.isFlag = !1;
    var n = e.originalDatas;
    return this.datas = n, n[this.ableName] || (n[this.ableName] = {}), P(P({}, this.move(r, e.inputEvent)), { type: "dragstart" });
  }, t.prototype.drag = function(r, e) {
    return this.move([
      r[0] - this.prevX,
      r[1] - this.prevY
    ], e);
  }, t.prototype.move = function(r, e) {
    var n, a, i = !1;
    if (!this.isFlag)
      this.prevX = r[0], this.prevY = r[1], this.startX = r[0], this.startY = r[1], n = r[0], a = r[1], this.isFlag = !0;
    else {
      var o = this.isDrag;
      n = this.prevX + r[0], a = this.prevY + r[1], (r[0] || r[1]) && (this.isDrag = !0), !o && this.isDrag && (i = !0);
    }
    return this.prevX = n, this.prevY = a, {
      type: "drag",
      clientX: n,
      clientY: a,
      inputEvent: e,
      isFirstDrag: i,
      isDrag: this.isDrag,
      distX: n - this.startX,
      distY: a - this.startY,
      deltaX: r[0],
      deltaY: r[1],
      datas: this.datas[this.ableName],
      originalDatas: this.datas,
      parentEvent: !0,
      parentGesto: this
    };
  }, t;
}();
function Ee(t, r, e, n) {
  var a = t.length === 16, i = a ? 4 : 3, o = ue(t, e, n, i), s = I(o, 4), u = I(s[0], 2), f = u[0], l = u[1], c = I(s[1], 2), v = c[0], d = c[1], p = I(s[2], 2), h = p[0], g = p[1], y = I(s[3], 2), S = y[0], b = y[1], x = I(Lt(t, r, i), 2), E = x[0], _ = x[1], C = Math.min(f, v, h, S), w = Math.min(l, d, g, b), R = Math.max(f, v, h, S), M = Math.max(l, d, g, b);
  f = f - C || 0, v = v - C || 0, h = h - C || 0, S = S - C || 0, l = l - w || 0, d = d - w || 0, g = g - w || 0, b = b - w || 0, E = E - C || 0, _ = _ - w || 0;
  var G = t[0], z = t[i + 1], A = ir(G * z);
  return {
    left: C,
    top: w,
    right: R,
    bottom: M,
    origin: [E, _],
    pos1: [f, l],
    pos2: [v, d],
    pos3: [h, g],
    pos4: [S, b],
    direction: A
  };
}
function iu(t, r) {
  var e = r.clientX, n = r.clientY, a = r.datas, i = t.state, o = i.moveableClientRect, s = i.rootMatrix, u = i.is3d, f = i.pos1, l = o.left, c = o.top, v = u ? 4 : 3, d = I(ct(we(s, [e - l, n - c], v), f), 2), p = d[0], h = d[1], g = I(zr({ datas: a, distX: p, distY: h }), 2), y = g[0], S = g[1];
  return [y, S];
}
function se(t, r) {
  var e = r.datas, n = t.state, a = n.allMatrix, i = n.beforeMatrix, o = n.is3d, s = n.left, u = n.top, f = n.origin, l = n.offsetMatrix, c = n.targetMatrix, v = n.transformOrigin, d = o ? 4 : 3;
  e.is3d = o, e.matrix = a, e.targetMatrix = c, e.beforeMatrix = i, e.offsetMatrix = l, e.transformOrigin = v, e.inverseMatrix = kr(a, d), e.inverseBeforeMatrix = kr(i, d), e.absoluteOrigin = ne(Tt([s, u], f), d), e.startDragBeforeDist = nr(e.inverseBeforeMatrix, e.absoluteOrigin, d), e.startDragDist = nr(e.inverseMatrix, e.absoluteOrigin, d);
}
function iv(t) {
  return Ee(t.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function oa(t, r, e) {
  var n = r.datas, a = r.originalDatas.beforeRenderable, i = n.transformIndex, o = a.nextTransforms, s = o.length, u = a.nextTransformAppendedIndexes, f = -1;
  i === -1 ? (e === "translate" ? f = 0 : e === "rotate" && (f = Fr(o, function(d) {
    return d.match(/scale\(/g);
  })), f === -1 && (f = o.length), n.transformIndex = f) : mr(u, function(d) {
    return d.index === i && d.functionName === e;
  }) ? f = i : f = i + u.filter(function(d) {
    return d.index < i;
  }).length;
  var l = Pd(o, t.state, f), c = l.targetFunction, v = e === "rotate" ? "rotateZ" : e;
  n.beforeFunctionTexts = l.beforeFunctionTexts, n.afterFunctionTexts = l.afterFunctionTexts, n.beforeTransform = l.beforeFunctionMatrix, n.beforeTransform2 = l.beforeFunctionMatrix2, n.targetTansform = l.targetFunctionMatrix, n.afterTransform = l.afterFunctionMatrix, n.afterTransform2 = l.afterFunctionMatrix2, n.targetAllTransform = l.allFunctionMatrix, c.functionName === v ? (n.afterFunctionTexts.splice(0, 1), n.isAppendTransform = !1) : s > f && (n.isAppendTransform = !0, a.nextTransformAppendedIndexes = Z(Z([], I(u), !1), [{
    functionName: e,
    index: f,
    isAppend: !0
  }], !1));
}
function sa(t, r, e) {
  return "".concat(t.beforeFunctionTexts.join(" "), " ").concat(t.isAppendTransform ? e : r, " ").concat(t.afterFunctionTexts.join(" "));
}
function ov(t) {
  var r = t.datas, e = t.distX, n = t.distY, a = I(su({ datas: r, distX: e, distY: n }), 2), i = a[0], o = a[1], s = ou(r, ec([i, o], 4));
  return nr(s, ne([0, 0, 0], 4), 4);
}
function ou(t, r, e) {
  var n = t.beforeTransform, a = t.afterTransform, i = t.beforeTransform2, o = t.afterTransform2, s = t.targetAllTransform, u = e ? Nt(s, r, 4) : Nt(r, s, 4), f = Nt(kr(e ? i : n, 4), u, 4), l = Nt(f, kr(e ? o : a, 4), 4);
  return l;
}
function su(t) {
  var r = t.datas, e = t.distX, n = t.distY, a = r.inverseBeforeMatrix, i = r.is3d, o = r.startDragBeforeDist, s = r.absoluteOrigin, u = i ? 4 : 3;
  return ct(nr(a, Tt(s, [e, n]), u), o);
}
function zr(t, r) {
  var e = t.datas, n = t.distX, a = t.distY, i = e.inverseBeforeMatrix, o = e.inverseMatrix, s = e.is3d, u = e.startDragBeforeDist, f = e.startDragDist, l = e.absoluteOrigin, c = s ? 4 : 3;
  return ct(nr(r ? i : o, Tt(l, [n, a]), c), r ? u : f);
}
function sv(t, r) {
  var e = t.datas, n = t.distX, a = t.distY;
  e.beforeMatrix;
  var i = e.matrix, o = e.is3d;
  e.startDragBeforeDist;
  var s = e.startDragDist, u = e.absoluteOrigin, f = o ? 4 : 3;
  return ct(nr(i, Tt(s, [n, a]), f), u);
}
function uv(t, r, e, n, a, i) {
  return n === void 0 && (n = r), a === void 0 && (a = e), i === void 0 && (i = [0, 0]), t ? t.map(function(o, s) {
    var u = nn(o), f = u.value, l = u.unit, c = s ? a : n, v = s ? e : r;
    if (o === "%" || isNaN(f)) {
      var d = c ? i[s] / c : 0;
      return v * d;
    } else if (l !== "%")
      return f;
    return v * f / 100;
  }) : i;
}
function uu(t) {
  var r = [];
  return t[1] >= 0 && (t[0] >= 0 && r.push(3), t[0] <= 0 && r.push(2)), t[1] <= 0 && (t[0] >= 0 && r.push(1), t[0] <= 0 && r.push(0)), r;
}
function fv(t, r) {
  return uu(r).map(function(e) {
    return t[e];
  });
}
function xa(t, r) {
  var e = (r + 1) / 2;
  return [
    jn(t[0][0], t[1][0], e, 1 - e),
    jn(t[0][1], t[1][1], e, 1 - e)
  ];
}
function Ut(t, r) {
  var e = xa([t[0], t[1]], r[0]), n = xa([t[2], t[3]], r[0]);
  return xa([e, n], r[1]);
}
function lv(t, r, e, n, a, i) {
  var o = ue(r, e, n, a), s = Ut(o, i), u = t[0] - s[0], f = t[1] - s[1];
  return [u, f];
}
function ln(t, r, e, n) {
  return Nt(t, We(r, n, e), n);
}
function cv(t, r, e, n) {
  var a = t.transformOrigin, i = t.offsetMatrix, o = t.is3d, s = o ? 4 : 3, u;
  if (Lr(e)) {
    var f = r.beforeTransform, l = r.afterTransform;
    n ? u = Rr(Je(e), 4, s) : u = Rr(Nt(Nt(f, Je([e]), 4), l, 4), 4, s);
  } else
    u = e;
  return ln(i, u, a, s);
}
function vv(t, r) {
  var e = t.transformOrigin, n = t.offsetMatrix, a = t.is3d, i = t.targetMatrix, o = t.targetAllTransform, s = a ? 4 : 3;
  return ln(n, Nt(o || i, _i(r, s), s), e, s);
}
function ua(t, r) {
  var e = Oe(r);
  return {
    setTransform: function(n, a) {
      a === void 0 && (a = -1), e.startTransforms = Zt(n) ? n : jr(n), Ua(t, r, a);
    },
    setTransformIndex: function(n) {
      Ua(t, r, n);
    }
  };
}
function fa(t, r, e) {
  var n = Oe(r), a = n.startTransforms;
  Ua(t, r, Fr(a, function(i) {
    return i.indexOf("".concat(e, "(")) === 0;
  }));
}
function Ua(t, r, e) {
  var n = Oe(r), a = r.datas;
  if (a.transformIndex = e, e !== -1) {
    var i = n.startTransforms[e];
    if (i) {
      var o = t.state, s = be([i], {
        "x%": function(u) {
          return u / 100 * o.offsetWidth;
        },
        "y%": function(u) {
          return u / 100 * o.offsetHeight;
        }
      });
      a.startValue = s[0].functionValue;
    }
  }
}
function Pi(t, r) {
  var e = Oe(t);
  e.nextTransforms = jr(r);
}
function Oe(t) {
  return t.originalDatas.beforeRenderable;
}
function Vn(t) {
  var r = t.originalDatas.beforeRenderable;
  return r.nextTransforms;
}
function On(t) {
  return (Vn(t) || []).join(" ");
}
function Pn(t) {
  return Oe(t).nextStyle;
}
function fu(t, r, e, n, a) {
  Pi(a, r);
  var i = ar.drag(t, fn(a, t.state, e, n)), o = i ? i.transform : r;
  return P(P({ transform: r, drag: i }, or({
    transform: o
  }, a)), { afterTransform: o });
}
function Ai(t, r, e, n, a, i) {
  var o = cv(t.state, a, r, i), s = hv(t, e, n, o);
  return s;
}
function lu(t, r, e, n, a, i, o) {
  var s = Ai(t, r, e, a, i, o), u = t.state, f = u.left, l = u.top, c = t.props.groupable, v = c ? f : 0, d = c ? l : 0, p = ct(n, s);
  return ct(p, [v, d]);
}
function dv(t, r, e, n, a, i, o) {
  var s = lu(t, r, e, n, a, i, o);
  return s;
}
function pv(t, r, e) {
  return [
    r ? -1 + t[0] / (r / 2) : 0,
    e ? -1 + t[1] / (e / 2) : 0
  ];
}
function hv(t, r, e, n) {
  n === void 0 && (n = t.state.allMatrix);
  var a = t.state, i = a.width, o = a.height, s = a.is3d, u = s ? 4 : 3, f = [
    i / 2 * (1 + r[0]) + e[0],
    o / 2 * (1 + r[1]) + e[1]
  ];
  return Lt(n, f, u);
}
function gv(t, r, e) {
  var n = e.fixedDirection, a = e.fixedPosition, i = e.fixedOffset;
  return lu(t, "rotate(".concat(r, "deg)"), n, a, i, e);
}
function mv(t, r, e, n, a, i) {
  var o = t.props.groupable, s = t.state, u = s.transformOrigin, f = s.offsetMatrix, l = s.is3d, c = s.width, v = s.height, d = s.left, p = s.top, h = i.fixedDirection, g = i.nextTargetMatrix || s.targetMatrix, y = l ? 4 : 3, S = uv(a, r, e, c, v, u), b = o ? d : 0, x = o ? p : 0, E = ln(f, g, S, y), _ = lv(n, E, r, e, y, h);
  return ct(_, [b, x]);
}
function yv(t, r) {
  return Ut(_r(t.state), r);
}
function Ev(t, r) {
  var e = t.targetGesto, n = t.controlGesto, a;
  return e?.isFlag() && (a = e.getEventData()[r]), !a && n?.isFlag() && (a = n.getEventData()[r]), a || {};
}
function Sv(t) {
  if (t && t.getRootNode) {
    var r = t.getRootNode();
    if (r.nodeType === 11)
      return r;
  }
}
function bv(t) {
  var r = t("scale"), e = t("rotate"), n = t("translate"), a = [];
  return n && n !== "0px" && n !== "none" && a.push("translate(".concat(n.split(/\s+/).join(","), ")")), e && e !== "1" && e !== "none" && a.push("rotate(".concat(e, ")")), r && r !== "1" && r !== "none" && a.push("scale(".concat(r.split(/\s+/).join(","), ")")), a;
}
function cu(t, r, e) {
  for (var n = t, a = [], i = bi(t) || Vr(t), o = !e && t === r || t === i, s = o, u = !1, f = 3, l, c, v, d = !1, p = tn(r, r, !0).offsetParent, h = 1; n && !s; ) {
    s = o;
    var g = vr(n), y = g("position"), S = zu(n), b = y === "fixed", x = bv(g), E = nc(yd(S)), _ = void 0, C = !1, w = !1, R = 0, M = 0, G = 0, z = 0, A = {
      hasTransform: !1,
      fixedContainer: null
    };
    b && (d = !0, A = _d(n), p = A.fixedContainer);
    var N = E.length;
    !u && (N === 16 || x.length) && (u = !0, f = 4, ri(a), v && (v = Rr(v, 3, 4))), u && N === 9 && (E = Rr(E, 3, 4));
    var B = xd(n, t), X = B.tagName, U = B.hasOffset, j = B.isSVG, $ = B.origin, D = B.targetOrigin, T = B.offset, F = I(T, 2), W = F[0], Y = F[1];
    X === "svg" && !n.ownerSVGElement && v && (a.push({
      type: "target",
      target: n,
      matrix: Cd(n, f)
    }), a.push({
      type: "offset",
      target: n,
      matrix: Ft(f)
    }));
    var K = parseFloat(g("zoom")) || 1;
    if (b)
      _ = A.fixedContainer, C = !0;
    else {
      var L = tn(n, r, !1, !0, g), et = L.offsetZoom;
      if (_ = L.offsetParent, C = L.isEnd, w = L.isStatic, h *= et, (L.isCustomElement || et !== 1) && w)
        W -= _.offsetLeft, Y -= _.offsetTop;
      else if (Jc || Zc) {
        var rt = L.parentSlotElement;
        if (rt) {
          for (var pt = _, Et = 0, J = 0; pt && Sv(pt); )
            Et += pt.offsetLeft, J += pt.offsetTop, pt = pt.offsetParent;
          W -= Et, Y -= J;
        }
      }
    }
    if (tu && !Qc && U && !j && w && (y === "relative" || y === "static") && (W -= _.offsetLeft, Y -= _.offsetTop, o = o || C), b)
      U && A.hasTransform && (G = _.clientLeft, z = _.clientTop);
    else if (U && p !== _ && (R = _.clientLeft, M = _.clientTop), U && _ === i) {
      var H = Gu(n, !1);
      W += H[0], Y += H[1];
    }
    if (a.push({
      type: "target",
      target: n,
      matrix: We(E, f, $)
    }), x.length && (a.push({
      type: "offset",
      target: n,
      matrix: Ft(f)
    }), a.push({
      type: "target",
      target: n,
      matrix: We(Je(x), f, $)
    })), U) {
      var bt = n === t, ut = bt ? 0 : n.scrollLeft, vt = bt ? 0 : n.scrollTop;
      a.push({
        type: "offset",
        target: n,
        matrix: ae([
          W - ut + R - G,
          Y - vt + M - z
        ], f)
      });
    } else
      a.push({
        type: "offset",
        target: n,
        origin: $
      });
    if (K !== 1 && a.push({
      type: "zoom",
      target: n,
      matrix: We(_i([K, K], f), f, [0, 0])
    }), v || (v = E), l || (l = $), c || (c = D), s || b)
      break;
    n = _, o = C, (!e || n === i) && (s = o);
  }
  return v || (v = Ft(f)), l || (l = [0, 0]), c || (c = [0, 0]), {
    zoom: h,
    offsetContainer: p,
    matrixes: a,
    targetMatrix: v,
    transformOrigin: l,
    targetOrigin: c,
    is3d: u,
    hasFixed: d
  };
}
var Zr = null, Jr = null, pe = null;
function _e(t) {
  t ? (window.Map && (Zr = /* @__PURE__ */ new Map(), Jr = /* @__PURE__ */ new Map()), pe = []) : (Zr = null, pe = null, Jr = null);
}
function xv(t) {
  var r = Jr?.get(t);
  if (r)
    return r;
  var e = He(t, !0);
  return Jr && Jr.set(t, e), e;
}
function _v(t, r) {
  if (pe) {
    var e = mr(pe, function(a) {
      return a[0][0] == t && a[0][1] == r;
    });
    if (e)
      return e[1];
  }
  var n = cu(t, r, !0);
  return pe && pe.push([[t, r], n]), n;
}
function vr(t) {
  var r = Zr?.get(t);
  if (!r) {
    var e = $r(t).getComputedStyle(t);
    if (!Zr)
      return function(i) {
        return e[i];
      };
    r = {
      style: e,
      cached: {}
    }, Zr.set(t, r);
  }
  var n = r.cached, a = r.style;
  return function(i) {
    return i in n || (n[i] = a[i]), n[i];
  };
}
function wr(t, r, e) {
  var n = e.originalDatas;
  n.groupable = n.groupable || {};
  var a = n.groupable;
  a.childDatas = a.childDatas || [];
  var i = a.childDatas;
  return t.moveables.map(function(o, s) {
    return i[s] = i[s] || {}, i[s][r] = i[s][r] || {}, P(P({}, e), { isRequestChild: !0, datas: i[s][r], originalDatas: i[s] });
  });
}
function _a(t, r, e, n, a, i, o) {
  var s = !!e.match(/Start$/g), u = !!e.match(/End$/g), f = a.isPinch, l = a.datas, c = wr(t, r.name, a), v = t.moveables, d = [], p = c.map(function(h, g) {
    var y = v[g], S = y.state, b = S.gestos, x = h;
    if (s)
      x = new xe(o).dragStart(n, h), d.push(x);
    else {
      if (b[o] || (b[o] = l.childGestos[g]), !b[o])
        return;
      x = fn(h, S, n, f, i, o), d.push(x);
    }
    var E = r[e](y, P(P({}, x), { parentFlag: !0 }));
    return u && (b[o] = null), E;
  });
  return s && (l.childGestos = v.map(function(h) {
    return h.state.gestos[o];
  })), {
    eventParams: p,
    childEvents: d
  };
}
function Nr(t, r, e, n, a, i) {
  a === void 0 && (a = function(l, c) {
    return c;
  });
  var o = !!e.match(/End$/g), s = wr(t, r.name, n), u = t.moveables, f = s.map(function(l, c) {
    var v = u[c], d = l;
    d = a(v, l);
    var p = r[e](v, P(P({}, d), { parentFlag: !0 }));
    return p && i && i(v, l, p, c), o && (v.state.gestos = {}), p;
  });
  return f;
}
function Un(t, r, e, n) {
  var a = e.fixedDirection, i = e.fixedPosition, o = n.datas.startPositions || _r(r.state), s = Ut(o, a), u = I(nr(on(-t.rotation / 180 * Math.PI, 3), [s[0] - i[0], s[1] - i[1], 1], 3), 2), f = u[0], l = u[1];
  return n.datas.originalX = f, n.datas.originalY = l, n;
}
function vu(t, r, e, n) {
  var a = t.getState(), i = a.renderPoses, o = a.rotation, s = a.direction, u = oe(t.props, r).zoom, f = Ye(o / Math.PI * 180), l = {}, c = t.renderState;
  c.renderDirectionMap || (c.renderDirectionMap = {});
  var v = c.renderDirectionMap;
  e.forEach(function(p) {
    var h = p.dir;
    l[h] = !0;
  });
  var d = ir(s);
  return e.map(function(p) {
    var h = p.data, g = p.classNames, y = p.dir, S = Oi[y];
    if (!S || !l[y])
      return null;
    v[y] = !0;
    var b = (yt(f, 15) + d * au[y] + 720) % 180, x = {};
    return Te(h).forEach(function(E) {
      x["data-".concat(E)] = h[E];
    }), n.createElement("div", P({ className: ft.apply(void 0, Z(["control", "direction", y, r], I(g), !1)), "data-rotation": b, "data-direction": y }, x, { key: "direction-".concat(y), style: Qn.apply(void 0, Z([o, u], I(S.map(function(E) {
      return i[E];
    })), !1)) }));
  });
}
function du(t, r, e, n) {
  var a = oe(t.props, e), i = a.renderDirections, o = i === void 0 ? r : i, s = a.displayAroundControls;
  if (!o)
    return [];
  var u = o === !0 ? Ti : o;
  return Z(Z([], I(s ? mu(t, n, e, u) : []), !1), I(vu(t, e, u.map(function(f) {
    return {
      data: {},
      classNames: [],
      dir: f
    };
  }), n)), !1);
}
function Qe(t, r, e, n, a, i) {
  for (var o = [], s = 6; s < arguments.length; s++)
    o[s - 6] = arguments[s];
  var u = Wt(e, n), f = r ? yt(u / Math.PI * 180, 15) % 180 : -1;
  return t.createElement("div", { key: "line-".concat(i), className: ft.apply(void 0, Z(["line", "direction", r ? "edge" : "", r], I(o), !1)), "data-rotation": f, "data-line-key": i, "data-direction": r, style: Ne(e, n, a, u) });
}
function pu(t, r, e, n, a) {
  var i = e === !0 ? jc : e;
  return i.map(function(o, s) {
    var u = I(Oi[o], 2), f = u[0], l = u[1];
    if (l != null)
      return Qe(t, o, n[f], n[l], a, "".concat(r, "Edge").concat(s), r);
  }).filter(Boolean);
}
function hu(t) {
  return function(r, e) {
    var n = oe(r.props, t).edge;
    return n && (n === !0 || n.length) ? Z(Z([], I(pu(e, t, n, r.getState().renderPoses, r.props.zoom)), !1), I(Cv(r, t, e)), !1) : gu(r, t, e);
  };
}
function gu(t, r, e) {
  return du(t, Ti, r, e);
}
function Cv(t, r, e) {
  return du(t, ["nw", "ne", "sw", "se"], r, e);
}
function mu(t, r, e, n) {
  var a = t.renderState;
  a.renderDirectionMap || (a.renderDirectionMap = {});
  var i = t.getState(), o = i.renderPoses, s = i.rotation, u = i.direction, f = a.renderDirectionMap, l = t.props.zoom, c = ir(u), v = s / Math.PI * 180;
  return (n || Te(f)).map(function(d) {
    var p = Oi[d];
    if (!p)
      return null;
    var h = (yt(v, 15) + c * au[d] + 720) % 180, g = ["around-control"];
    return e && g.push("direction", e), r.createElement("div", { className: ft.apply(void 0, Z([], I(g), !1)), "data-rotation": h, "data-direction": d, key: "direction-around-".concat(d), style: Qn.apply(void 0, Z([s, l], I(p.map(function(y) {
      return o[y];
    })), !1)) });
  });
}
function Ii(t, r, e) {
  var n = t || {}, a = n.position, i = a === void 0 ? "client" : a, o = n.left, s = o === void 0 ? -1 / 0 : o, u = n.top, f = u === void 0 ? -1 / 0 : u, l = n.right, c = l === void 0 ? 1 / 0 : l, v = n.bottom, d = v === void 0 ? 1 / 0 : v, p = {
    position: i,
    left: s,
    top: f,
    right: c,
    bottom: d
  };
  return {
    vertical: Po(p, r, !0),
    horizontal: Po(p, e, !1)
  };
}
function la(t, r) {
  var e = t.state, n = e.containerClientRect, a = n.clientHeight, i = n.clientWidth, o = n.clientLeft, s = n.clientTop, u = e.snapOffset, f = u.left, l = u.top, c = u.right, v = u.bottom, d = r || t.props.bounds || {}, p = d.position || "client", h = p === "css", g = d.left, y = g === void 0 ? -1 / 0 : g, S = d.top, b = S === void 0 ? -1 / 0 : S, x = d.right, E = x === void 0 ? h ? -1 / 0 : 1 / 0 : x, _ = d.bottom, C = _ === void 0 ? h ? -1 / 0 : 1 / 0 : _;
  return h && (E = i + c - f - E, C = a + v - l - C), {
    left: y + f - o,
    right: E + f - o,
    top: b + l - s,
    bottom: C + l - s
  };
}
function wv(t, r, e) {
  var n = la(t), a = n.left, i = n.top, o = n.right, s = n.bottom, u = I(e, 2), f = u[0], l = u[1], c = I(ct(e, r), 2), v = c[0], d = c[1];
  V(v) < sr && (v = 0), V(d) < sr && (d = 0);
  var p = d > 0, h = v > 0, g = {
    isBound: !1,
    offset: 0,
    pos: 0
  }, y = {
    isBound: !1,
    offset: 0,
    pos: 0
  };
  if (v === 0 && d === 0)
    return {
      vertical: g,
      horizontal: y
    };
  if (v === 0)
    p ? s < l && (y.pos = s, y.offset = l - s) : i > l && (y.pos = i, y.offset = l - i);
  else if (d === 0)
    h ? o < f && (g.pos = o, g.offset = f - o) : a > f && (g.pos = a, g.offset = f - a);
  else {
    var S = d / v, b = e[1] - S * f, x = 0, E = 0, _ = !1;
    h && o <= f ? (x = S * o + b, E = o, _ = !0) : !h && f <= a && (x = S * a + b, E = a, _ = !0), _ && (x < i || x > s) && (_ = !1), _ || (p && s <= l ? (x = s, E = (x - b) / S, _ = !0) : !p && l <= i && (x = i, E = (x - b) / S, _ = !0)), _ && (g.isBound = !0, g.pos = E, g.offset = f - E, y.isBound = !0, y.pos = x, y.offset = l - x);
  }
  return {
    vertical: g,
    horizontal: y
  };
}
function Po(t, r, e) {
  var n = t[e ? "left" : "top"], a = t[e ? "right" : "bottom"], i = Math.min.apply(Math, Z([], I(r), !1)), o = Math.max.apply(Math, Z([], I(r), !1)), s = [];
  return n + 1 > i && s.push({
    direction: "start",
    isBound: !0,
    offset: i - n,
    pos: n
  }), a - 1 < o && s.push({
    direction: "end",
    isBound: !0,
    offset: o - a,
    pos: a
  }), s.length || s.push({
    isBound: !1,
    offset: 0,
    pos: 0
  }), s.sort(function(u, f) {
    return V(f.offset) - V(u.offset);
  });
}
function Ao(t, r, e) {
  var n = e ? t.map(function(a) {
    return an(a, e);
  }) : t;
  return n.some(function(a) {
    return a[0] < r.left && V(a[0] - r.left) > 0.1 || a[0] > r.right && V(a[0] - r.right) > 0.1 || a[1] < r.top && V(a[1] - r.top) > 0.1 || a[1] > r.bottom && V(a[1] - r.bottom) > 0.1;
  });
}
function Dv(t, r, e) {
  var n = xr(t), a = Math.sqrt(n * n - r * r) || 0;
  return [a, -a].sort(function(i, o) {
    return V(i - t[e ? 0 : 1]) - V(o - t[e ? 0 : 1]);
  }).map(function(i) {
    return Wt([0, 0], e ? [i, r] : [r, i]);
  });
}
function Rv(t, r, e, n, a) {
  if (!t.props.bounds)
    return [];
  var i = a * Math.PI / 180, o = la(t), s = o.left, u = o.top, f = o.right, l = o.bottom, c = s - n[0], v = f - n[0], d = u - n[1], p = l - n[1], h = {
    left: c,
    top: d,
    right: v,
    bottom: p
  };
  if (!Ao(e, h, 0))
    return [];
  var g = [];
  return [
    [c, 0],
    [v, 0],
    [d, 1],
    [p, 1]
  ].forEach(function(y) {
    var S = I(y, 2), b = S[0], x = S[1];
    e.forEach(function(E) {
      var _ = Wt([0, 0], E);
      g.push.apply(g, Z([], I(Dv(E, b, x).map(function(C) {
        return i + C - _;
      }).filter(function(C) {
        return !Ao(r, h, C);
      }).map(function(C) {
        return yt(C * 180 / Math.PI, sr);
      })), !1));
    });
  }), g;
}
var Tv = ["left", "right", "center"], Mv = ["top", "bottom", "middle"], Io = {
  left: "start",
  right: "end",
  center: "center",
  top: "start",
  bottom: "end",
  middle: "center"
}, Xr = {
  start: "left",
  end: "right",
  center: "center"
}, qr = {
  start: "top",
  end: "bottom",
  center: "middle"
};
function he() {
  return {
    left: !1,
    top: !1,
    right: !1,
    bottom: !1
  };
}
function Pe(t, r) {
  var e = t.props, n = e.snappable, a = e.bounds, i = e.innerBounds, o = e.verticalGuidelines, s = e.horizontalGuidelines, u = e.snapGridWidth, f = e.snapGridHeight, l = t.state, c = l.guidelines, v = l.enableSnap;
  return !n || !v || r && n !== !0 && n.indexOf(r) < 0 ? !1 : !!(u || f || a || i || c && c.length || o && o.length || s && s.length);
}
function ki(t) {
  return t === !1 ? {} : t === !0 || !t ? { left: !0, right: !0, top: !0, bottom: !0 } : t;
}
function Ov(t, r) {
  var e = ki(t), n = {};
  for (var a in e)
    a in r && e[a] && (n[a] = r[a]);
  return n;
}
function zi(t, r) {
  var e = Ov(t, r), n = Mv.filter(function(i) {
    return i in e;
  }), a = Tv.filter(function(i) {
    return i in e;
  });
  return {
    horizontalNames: n,
    verticalNames: a,
    horizontal: n.map(function(i) {
      return e[i];
    }),
    vertical: a.map(function(i) {
      return e[i];
    })
  };
}
function Pv(t, r, e) {
  var n = Lt(t, [r.clientLeft, r.clientTop], e);
  return [
    r.left + n[0],
    r.top + n[1]
  ];
}
function Av(t) {
  var r = I(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  Math.abs(a) < jt && (a = 0), Math.abs(i) < jt && (i = 0);
  var o = 0, s = 0, u = 0;
  return a ? i ? (o = -i / a, s = 1, u = o * e[0] - e[1]) : (s = 1, u = -e[1]) : (o = -1, u = e[0]), [o, s, u].map(function(f) {
    return yt(f, jt);
  });
}
var yu = "snapRotationThreshold", Eu = "snapRotationDegrees", Su = "snapHorizontalThreshold", bu = "snapVerticalThreshold";
function ca(t, r, e, n, a, i, o) {
  var s;
  n === void 0 && (n = []), a === void 0 && (a = []);
  var u = t.props, f = ((s = t.state.snapThresholdInfo) === null || s === void 0 ? void 0 : s.multiples) || [1, 1], l = Vo(o, u[Su], 5), c = Vo(i, u[bu], 5);
  return xu(t.state.guidelines, r, e, n, a, l, c, f);
}
function xu(t, r, e, n, a, i, o, s) {
  return {
    vertical: zo(t, "vertical", r, o * s[0], n),
    horizontal: zo(t, "horizontal", e, i * s[1], a)
  };
}
function Iv(t, r, e) {
  var n = I(e, 2), a = n[0], i = n[1], o = I(r, 2), s = o[0], u = o[1], f = I(ct(e, r), 2), l = f[0], c = f[1], v = c > 0, d = l > 0;
  l = ta(l), c = ta(c);
  var p = {
    isSnap: !1,
    offset: 0,
    pos: 0
  }, h = {
    isSnap: !1,
    offset: 0,
    pos: 0
  };
  if (l === 0 && c === 0)
    return {
      vertical: p,
      horizontal: h
    };
  var g = ca(t, l ? [a] : [], c ? [i] : [], [], [], void 0, void 0), y = g.vertical, S = g.horizontal;
  y.posInfos.filter(function(X) {
    var U = X.pos;
    return d ? U >= s : U <= s;
  }), S.posInfos.filter(function(X) {
    var U = X.pos;
    return v ? U >= u : U <= u;
  }), y.isSnap = y.posInfos.length > 0, S.isSnap = S.posInfos.length > 0;
  var b = Ka(y), x = b.isSnap, E = b.guideline, _ = Ka(S), C = _.isSnap, w = _.guideline, R = C ? w.pos[1] : 0, M = x ? E.pos[0] : 0;
  if (l === 0)
    C && (h.isSnap = !0, h.pos = w.pos[1], h.offset = i - h.pos);
  else if (c === 0)
    x && (p.isSnap = !0, p.pos = M, p.offset = a - M);
  else {
    var G = c / l, z = e[1] - G * a, A = 0, N = 0, B = !1;
    x ? (N = M, A = G * N + z, B = !0) : C && (A = R, N = (A - z) / G, B = !0), B && (p.isSnap = !0, p.pos = N, p.offset = a - N, h.isSnap = !0, h.pos = A, h.offset = i - A);
  }
  return {
    vertical: p,
    horizontal: h
  };
}
function Wr(t) {
  var r = "";
  return t === -1 || t === "top" || t === "left" ? r = "start" : t === 0 || t === "center" || t === "middle" ? r = "center" : (t === 1 || t === "right" || t === "bottom") && (r = "end"), r;
}
function ko(t, r, e, n) {
  var a = zi(t.props.snapDirections, r), i = ca(t, a.vertical, a.horizontal, a.verticalNames.map(function(u) {
    return Wr(u);
  }), a.horizontalNames.map(function(u) {
    return Wr(u);
  }), e, n), o = Wr(a.horizontalNames[i.horizontal.index]), s = Wr(a.verticalNames[i.vertical.index]);
  return {
    vertical: P(P({}, i.vertical), { direction: s }),
    horizontal: P(P({}, i.horizontal), { direction: o })
  };
}
function Ka(t) {
  var r = t.isSnap;
  if (!r)
    return {
      isSnap: !1,
      offset: 0,
      dist: -1,
      pos: 0,
      guideline: null
    };
  var e = t.posInfos[0], n = e.guidelineInfos[0], a = n.offset, i = n.dist, o = n.guideline;
  return {
    isSnap: r,
    offset: a,
    dist: i,
    pos: e.pos,
    guideline: o
  };
}
function zo(t, r, e, n, a) {
  var i, o;
  if (a === void 0 && (a = []), !t || !t.length)
    return {
      isSnap: !1,
      index: -1,
      direction: "",
      posInfos: []
    };
  var s = r === "vertical", u = s ? 0 : 1, f = e.map(function(c, v) {
    var d = a[v] || "", p = t.map(function(h) {
      var g = h.pos, y = c - g[u];
      return {
        offset: y,
        dist: V(y),
        guideline: h,
        direction: d
      };
    }).filter(function(h) {
      var g = h.guideline, y = h.dist, S = g.type;
      return !(S !== r || y > n);
    }).sort(function(h, g) {
      return h.dist - g.dist;
    });
    return {
      pos: c,
      index: v,
      guidelineInfos: p,
      direction: d
    };
  }).filter(function(c) {
    return c.guidelineInfos.length > 0;
  }).sort(function(c, v) {
    return c.guidelineInfos[0].dist - v.guidelineInfos[0].dist;
  }), l = f.length > 0;
  return {
    isSnap: l,
    index: l ? f[0].index : -1,
    direction: (o = (i = f[0]) === null || i === void 0 ? void 0 : i.direction) !== null && o !== void 0 ? o : "",
    posInfos: f
  };
}
function kv(t, r, e, n, a) {
  var i = [];
  e[0] && e[1] ? i = [
    e,
    [-e[0], e[1]],
    [e[0], -e[1]]
  ] : !e[0] && !e[1] ? [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ].forEach(function(v, d, p) {
    var h = p[d + 1] || p[0];
    i.push(v), i.push([
      (v[0] + h[0]) / 2,
      (v[1] + h[1]) / 2
    ]);
  }) : t.props.keepRatio ? i.push([-1, -1], [-1, 1], [1, -1], [1, 1], e) : (i.push.apply(i, Z([], I(fv([
    [-1, -1],
    [1, -1],
    [-1, -1],
    [1, 1]
  ], e)), !1)), i.length > 1 && i.push([
    (i[0][0] + i[1][0]) / 2,
    (i[0][1] + i[1][1]) / 2
  ]));
  var o = i.map(function(v) {
    return Ut(r, v);
  }), s = o.map(function(v) {
    return v[0];
  }), u = o.map(function(v) {
    return v[1];
  }), f = ca(t, s, u, i.map(function(v) {
    return Wr(v[0]);
  }), i.map(function(v) {
    return Wr(v[1]);
  }), n, a), l = Wr(i.map(function(v) {
    return v[0];
  })[f.vertical.index]), c = Wr(i.map(function(v) {
    return v[1];
  })[f.horizontal.index]);
  return {
    vertical: P(P({}, f.vertical), { direction: l }),
    horizontal: P(P({}, f.horizontal), { direction: c })
  };
}
function _u(t, r) {
  var e = V(t.offset), n = V(r.offset);
  return t.isBound && r.isBound ? n - e : t.isBound ? -1 : r.isBound ? 1 : t.isSnap && r.isSnap ? n - e : t.isSnap ? -1 : r.isSnap || e < sr ? 1 : n < sr ? -1 : e - n;
}
function Kn(t, r) {
  return t.slice().sort(function(e, n) {
    var a = e.sign[r], i = n.sign[r], o = e.offset[r], s = n.offset[r];
    if (a) {
      if (!i)
        return -1;
    } else return 1;
    return _u({ isBound: e.isBound, isSnap: e.isSnap, offset: o }, { isBound: n.isBound, isSnap: n.isSnap, offset: s });
  })[0];
}
function zv(t, r, e) {
  var n = [];
  if (e)
    V(r[0]) !== 1 || V(r[1]) !== 1 ? n.push([r, [-1, -1]], [r, [-1, 1]], [r, [1, -1]], [r, [1, 1]]) : n.push([r, [t[0], -t[1]]], [r, [-t[0], t[1]]]), n.push([r, t]);
  else if (t[0] && t[1] || !t[0] && !t[1]) {
    var a = t[0] ? t : [1, 1];
    [1, -1].forEach(function(o) {
      [1, -1].forEach(function(s) {
        var u = [o * a[0], s * a[1]];
        r[0] === u[0] && r[1] === u[1] || n.push([r, u]);
      });
    });
  } else if (t[0]) {
    var i = V(r[0]) === 1 ? [1] : [1, -1];
    i.forEach(function(o) {
      n.push([
        [r[0], -1],
        [o * t[0], -1]
      ], [
        [r[0], 0],
        [o * t[0], 0]
      ], [
        [r[0], 1],
        [o * t[0], 1]
      ]);
    });
  } else if (t[1]) {
    var i = V(r[1]) === 1 ? [1] : [1, -1];
    i.forEach(function(s) {
      n.push([
        [-1, r[1]],
        [-1, s * t[1]]
      ], [
        [0, r[1]],
        [0, s * t[1]]
      ], [
        [1, r[1]],
        [1, s * t[1]]
      ]);
    });
  }
  return n;
}
function Cu(t, r) {
  var e = Na([r[0][0], r[1][0]]), n = Na([r[0][1], r[1][1]]);
  return {
    vertical: e <= t[0],
    horizontal: n <= t[1]
  };
}
function Gi(t, r) {
  var e = I(r, 2), n = e[0], a = e[1], i = a[0] - n[0], o = a[1] - n[1];
  V(i) < sr && (i = 0), V(o) < sr && (o = 0);
  var s, u;
  if (!i)
    s = n[0], u = t[0];
  else if (!o)
    s = n[1], u = t[1];
  else {
    var f = o / i;
    s = f * (t[0] - n[0]) + n[1], u = t[1];
  }
  return s - u;
}
function wu(t, r, e, n) {
  return n === void 0 && (n = sr), t.every(function(a) {
    var i = Gi(a, r), o = i <= 0;
    return o === e || V(i) <= n;
  });
}
function Go(t, r, e, n, a) {
  return a === void 0 && (a = 0), n && r - a <= t || !n && t <= e + a ? {
    isBound: !0,
    offset: n ? r - t : e - t
  } : {
    isBound: !1,
    offset: 0
  };
}
function Gv(t, r) {
  var e = r.line, n = r.centerSign, a = r.verticalSign, i = r.horizontalSign, o = r.lineConstants, s = t.props.innerBounds;
  if (!s)
    return {
      isAllBound: !1,
      isBound: !1,
      isVerticalBound: !1,
      isHorizontalBound: !1,
      offset: [0, 0]
    };
  var u = s.left, f = s.top, l = s.width, c = s.height, v = [[u, f], [u, f + c]], d = [[u, f], [u + l, f]], p = [[u + l, f], [u + l, f + c]], h = [[u, f + c], [u + l, f + c]];
  if (wu([
    [u, f],
    [u + l, f],
    [u, f + c],
    [u + l, f + c]
  ], e, n))
    return {
      isAllBound: !1,
      isBound: !1,
      isVerticalBound: !1,
      isHorizontalBound: !1,
      offset: [0, 0]
    };
  var g = Hr(e, o, d, a), y = Hr(e, o, h, a), S = Hr(e, o, v, i), b = Hr(e, o, p, i), x = g.isBound && y.isBound, E = g.isBound || y.isBound, _ = S.isBound && b.isBound, C = S.isBound || b.isBound, w = Ce(g.offset, y.offset), R = Ce(S.offset, b.offset), M = [0, 0], G = !1, z = !1;
  return V(R) < V(w) ? (M = [w, 0], G = E, z = x) : (M = [0, R], G = C, z = _), {
    isAllBound: z,
    isVerticalBound: E,
    isHorizontalBound: C,
    isBound: G,
    offset: M
  };
}
function Hr(t, r, e, n, a, i) {
  var o = I(r, 2), s = o[0], u = o[1], f = t[0], l = e[0], c = e[1], v = ta(c[1] - l[1]), d = ta(c[0] - l[0]), p = u, h = s, g = -s / u;
  if (d) {
    if (!v) {
      if (i && !p)
        return {
          isBound: !1,
          offset: 0
        };
      if (h) {
        var x = (l[1] - f[1]) / g + f[0];
        return Go(x, l[0], c[0], n, a);
      } else {
        var S = l[1] - f[1], b = V(S) <= (a || 0);
        return {
          isBound: b,
          offset: b ? S : 0
        };
      }
    }
  } else {
    if (i && !h)
      return {
        isBound: !1,
        offset: 0
      };
    if (p) {
      var y = g * (l[0] - f[0]) + f[1];
      return Go(y, l[1], c[1], n, a);
    } else {
      var S = l[0] - f[0], b = V(S) <= (a || 0);
      return {
        isBound: b,
        offset: b ? S : 0
      };
    }
  }
  return {
    isBound: !1,
    offset: 0
  };
}
function Du(t, r, e) {
  return r.map(function(n) {
    var a = Gv(t, n), i = a.isBound, o = a.offset, s = a.isVerticalBound, u = a.isHorizontalBound, f = n.multiple, l = zr({
      datas: e,
      distX: o[0],
      distY: o[1]
    }).map(function(c, v) {
      return c * (f[v] ? 2 / f[v] : 0);
    });
    return {
      sign: f,
      isBound: i,
      isVerticalBound: s,
      isHorizontalBound: u,
      isSnap: !1,
      offset: l
    };
  });
}
function Bv(t, r, e) {
  var n, a = Bi(t, r, [0, 0], !1).map(function(v) {
    return P(P({}, v), { multiple: v.multiple.map(function(d) {
      return V(d) * 2;
    }) });
  }), i = Du(t, a, e), o = Kn(i, 0), s = Kn(i, 1), u = 0, f = 0, l = o.isVerticalBound || s.isVerticalBound, c = o.isHorizontalBound || s.isHorizontalBound;
  return (l || c) && (n = I(sv({
    datas: e,
    distX: -o.offset[0],
    distY: -s.offset[1]
  }), 2), u = n[0], f = n[1]), {
    vertical: {
      isBound: l,
      offset: u
    },
    horizontal: {
      isBound: c,
      offset: f
    }
  };
}
function Nv(t, r) {
  var e = [], n = t[0], a = t[1];
  return n && a ? e.push([[0, a * 2], t, [-n, a]], [[n * 2, 0], t, [n, -a]]) : n ? (e.push([[n * 2, 0], [n, 1], [n, -1]]), r && e.push([[0, -1], [n, -1], [-n, -1]], [[0, 1], [n, 1], [-n, 1]])) : a ? (e.push([[0, a * 2], [1, a], [-1, a]]), r && e.push([[-1, 0], [-1, a], [-1, -a]], [[1, 0], [1, a], [1, -a]])) : e.push([[-1, 0], [-1, -1], [-1, 1]], [[1, 0], [1, -1], [1, 1]], [[0, -1], [-1, -1], [1, -1]], [[0, 1], [-1, 1], [1, 1]]), e;
}
function Bi(t, r, e, n) {
  var a = t.state, i = a.allMatrix, o = a.is3d, s = ue(i, 100, 100, o ? 4 : 3), u = Ut(s, [0, 0]);
  return Nv(e, n).map(function(f) {
    var l = I(f, 3), c = l[0], v = l[1], d = l[2], p = [
      Ut(s, v),
      Ut(s, d)
    ], h = Av(p), g = Cu(u, p), y = g.vertical, S = g.horizontal, b = Gi(u, p) <= 0;
    return {
      multiple: c,
      centerSign: b,
      verticalSign: y,
      horizontalSign: S,
      lineConstants: h,
      line: [
        Ut(r, v),
        Ut(r, d)
      ]
    };
  });
}
function Bo(t, r, e, n) {
  var a = n ? t.map(function(i) {
    return an(i, n);
  }) : t;
  return [
    [a[0], a[1]],
    [a[1], a[3]],
    [a[3], a[2]],
    [a[2], a[0]]
  ].some(function(i) {
    var o = Gi(e, i) <= 0;
    return !wu(r, i, o);
  });
}
function Fv(t) {
  var r = I(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  if (!a)
    return V(e[0]);
  if (!i)
    return V(e[1]);
  var o = i / a;
  return V((-o * e[0] + e[1]) / Math.sqrt(Math.pow(o, 2) + 1));
}
function Lv(t) {
  var r = I(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  if (!a)
    return [e[0], 0];
  if (!i)
    return [0, e[1]];
  var o = i / a, s = -o * e[0] + e[1];
  return [
    -s / (o + 1 / o),
    s / (o * o + 1)
  ];
}
function Yv(t, r, e, n, a) {
  var i = t.props.innerBounds, o = a * Math.PI / 180;
  if (!i)
    return [];
  var s = i.left, u = i.top, f = i.width, l = i.height, c = s - n[0], v = s + f - n[0], d = u - n[1], p = u + l - n[1], h = [
    [c, d],
    [v, d],
    [c, p],
    [v, p]
  ], g = Ut(e, [0, 0]);
  if (!Bo(e, h, g, 0))
    return [];
  var y = [], S = h.map(function(b) {
    return [
      xr(b),
      Wt([0, 0], b)
    ];
  });
  return [
    [e[0], e[1]],
    [e[1], e[3]],
    [e[3], e[2]],
    [e[2], e[0]]
  ].forEach(function(b) {
    var x = Wt([0, 0], Lv(b)), E = Fv(b);
    y.push.apply(y, Z([], I(S.filter(function(_) {
      var C = I(_, 1), w = C[0];
      return w && E <= w;
    }).map(function(_) {
      var C = I(_, 2), w = C[0], R = C[1], M = Math.acos(w ? E / w : 0), G = R + M, z = R - M;
      return [
        o + G - x,
        o + z - x
      ];
    }).reduce(function(_, C) {
      return _.push.apply(_, Z([], I(C), !1)), _;
    }, []).filter(function(_) {
      return !Bo(r, h, g, _);
    }).map(function(_) {
      return yt(_ * 180 / Math.PI, sr);
    })), !1));
  }), y;
}
function Wv(t) {
  var r = t.props.innerBounds, e = he();
  if (!r)
    return {
      boundMap: e,
      vertical: [],
      horizontal: []
    };
  var n = t.getRect(), a = n.pos1, i = n.pos2, o = n.pos3, s = n.pos4, u = [a, i, o, s], f = Ut(u, [0, 0]), l = r.left, c = r.top, v = r.width, d = r.height, p = [[l, c], [l, c + d]], h = [[l, c], [l + v, c]], g = [[l + v, c], [l + v, c + d]], y = [[l, c + d], [l + v, c + d]], S = Bi(t, u, [0, 0], !1), b = [], x = [];
  return S.forEach(function(E) {
    var _ = E.line, C = E.lineConstants, w = Cu(f, _), R = w.horizontal, M = w.vertical, G = Hr(_, C, h, M, 1, !0), z = Hr(_, C, y, M, 1, !0), A = Hr(_, C, p, R, 1, !0), N = Hr(_, C, g, R, 1, !0);
    G.isBound && !e.top && (b.push(c), e.top = !0), z.isBound && !e.bottom && (b.push(c + d), e.bottom = !0), A.isBound && !e.left && (x.push(l), e.left = !0), N.isBound && !e.right && (x.push(l + v), e.right = !0);
  }), {
    boundMap: e,
    horizontal: b,
    vertical: x
  };
}
function Hv(t, r, e, n) {
  var a = r[0] - t[0], i = r[1] - t[1];
  if (V(a) < jt && (a = 0), V(i) < jt && (i = 0), !a)
    return n ? [0, 0] : [0, e];
  if (!i)
    return n ? [e, 0] : [0, 0];
  var o = i / a, s = t[1] - o * t[0];
  if (n) {
    var u = o * (r[0] + e) + s;
    return [e, u - r[1]];
  } else {
    var f = (r[1] + e - s) / o;
    return [f - r[0], e];
  }
}
function Za(t, r, e, n, a) {
  var i = Hv(t, r, e, n);
  if (!i)
    return {
      isOutside: !1,
      offset: [0, 0]
    };
  var o = Br(t, r), s = Br(i, t), u = Br(i, r), f = s > o || u > o, l = I(zr({
    datas: a,
    distX: i[0],
    distY: i[1]
  }), 2), c = l[0], v = l[1];
  return {
    offset: [c, v],
    isOutside: f
  };
}
function Zn(t, r) {
  return t.isBound ? t.offset : r.isSnap ? Ka(r).offset : 0;
}
function $v(t, r, e, n, a) {
  var i = I(r, 2), o = i[0], s = i[1], u = I(e, 2), f = u[0], l = u[1], c = I(n, 2), v = c[0], d = c[1], p = I(a, 2), h = p[0], g = p[1], y = -h, S = -g;
  if (t && o && s) {
    y = 0, S = 0;
    var b = [];
    if (f && l ? b.push([0, g], [h, 0]) : f ? b.push([h, 0]) : l ? b.push([0, g]) : v && d ? b.push([0, g], [h, 0]) : v ? b.push([h, 0]) : d && b.push([0, g]), b.length) {
      b.sort(function(C, w) {
        return xr(ct([o, s], C)) - xr(ct([o, s], w));
      });
      var x = b[0];
      if (x[0] && V(o) > jt)
        y = -x[0], S = s * V(o + y) / V(o) - s;
      else if (x[1] && V(s) > jt) {
        var E = s;
        S = -x[1], y = o * V(s + S) / V(E) - o;
      }
      if (t && l && f)
        if (V(y) > jt && V(y) < V(h)) {
          var _ = V(h) / V(y);
          y *= _, S *= _;
        } else if (V(S) > jt && V(S) < V(g)) {
          var _ = V(g) / V(S);
          y *= _, S *= _;
        } else
          y = Ce(-h, y), S = Ce(-g, S);
    }
  } else
    y = o || f ? -h : 0, S = s || l ? -g : 0;
  return [y, S];
}
function jv(t, r, e, n, a, i) {
  if (!Pe(t, "draggable"))
    return [
      {
        isSnap: !1,
        isBound: !1,
        offset: 0
      },
      {
        isSnap: !1,
        isBound: !1,
        offset: 0
      }
    ];
  var o = Li(i.absolutePoses, [r, e]), s = br(o), u = s.left, f = s.right, l = s.top, c = s.bottom, v = {
    horizontal: o.map(function(N) {
      return N[1];
    }),
    vertical: o.map(function(N) {
      return N[0];
    })
  }, d = ki(t.props.snapDirections), p = zi(d, {
    left: u,
    right: f,
    top: l,
    bottom: c,
    center: (u + f) / 2,
    middle: (l + c) / 2
  }), h = va(t, a, p, v), g = h.vertical, y = h.horizontal, S = Bv(t, o, i), b = S.vertical, x = S.horizontal, E = g.isSnap, _ = y.isSnap, C = g.isBound || b.isBound, w = y.isBound || x.isBound, R = Ce(g.offset, b.offset), M = Ce(y.offset, x.offset), G = I($v(n, [r, e], [C, w], [E, _], [R, M]), 2), z = G[0], A = G[1];
  return [
    {
      isBound: C,
      isSnap: E,
      offset: z
    },
    {
      isBound: w,
      isSnap: _,
      offset: A
    }
  ];
}
function va(t, r, e, n) {
  n === void 0 && (n = e);
  var a = Ii(la(t), n.vertical, n.horizontal), i = a.horizontal, o = a.vertical, s = r ? {
    horizontal: { isSnap: !1, index: -1 },
    vertical: { isSnap: !1, index: -1 }
  } : ca(t, e.vertical, e.horizontal, void 0, void 0, void 0, void 0), u = s.horizontal, f = s.vertical, l = Zn(i[0], u), c = Zn(o[0], f), v = V(l), d = V(c);
  return {
    horizontal: {
      isBound: i[0].isBound,
      isSnap: u.isSnap,
      snapIndex: u.index,
      offset: l,
      dist: v,
      bounds: i,
      snap: u
    },
    vertical: {
      isBound: o[0].isBound,
      isSnap: f.isSnap,
      snapIndex: f.index,
      offset: c,
      dist: d,
      bounds: o,
      snap: f
    }
  };
}
function No(t, r, e, n, a, i, o) {
  o === void 0 && (o = [1, 1]);
  var s = Ii(r, e, n), u = s.horizontal, f = s.vertical, l = xu(t, e, n, [], [], a, i, o), c = l.horizontal, v = l.vertical, d = Zn(u[0], c), p = Zn(f[0], v), h = V(d), g = V(p);
  return {
    horizontal: {
      isBound: u[0].isBound,
      isSnap: c.isSnap,
      snapIndex: c.index,
      offset: d,
      dist: h,
      bounds: u,
      snap: c
    },
    vertical: {
      isBound: f[0].isBound,
      isSnap: v.isSnap,
      snapIndex: v.index,
      offset: p,
      dist: g,
      bounds: f,
      snap: v
    }
  };
}
function Xv(t, r, e, n) {
  var a = Wt(t, r) / Math.PI * 180, i = e.vertical, o = i.isBound, s = i.isSnap, u = i.dist, f = e.horizontal, l = f.isBound, c = f.isSnap, v = f.dist, d = a % 180, p = d < 3 || d > 177, h = d > 87 && d < 93;
  return v < u && (o || s && !h && (!n || !p)) ? "vertical" : l || c && !p && (!n || !h) ? "horizontal" : "";
}
function qv(t, r, e, n, a, i) {
  return e.map(function(o) {
    var s = I(o, 2), u = s[0], f = s[1], l = Ut(r, u), c = Ut(r, f), v = n ? Vv(t, l, c, a) : va(t, a, {
      vertical: [c[0]],
      horizontal: [c[1]]
    }), d = v.horizontal, p = d.offset, h = d.isBound, g = d.isSnap, y = v.vertical, S = y.offset, b = y.isBound, x = y.isSnap, E = ct(f, u);
    if (!S && !p)
      return {
        isBound: b || h,
        isSnap: x || g,
        sign: E,
        offset: [0, 0]
      };
    var _ = Xv(l, c, v, n);
    if (!_)
      return {
        sign: E,
        isBound: !1,
        isSnap: !1,
        offset: [0, 0]
      };
    var C = _ === "vertical", w = [0, 0];
    return !n && V(f[0]) === 1 && V(f[1]) === 1 && u[0] !== f[0] && u[1] !== f[1] ? w = zr({
      datas: i,
      distX: -S,
      distY: -p
    }) : w = Za(l, c, -(C ? S : p), C, i).offset, w = w.map(function(R, M) {
      return R * (E[M] ? 2 / E[M] : 0);
    }), {
      sign: E,
      isBound: C ? b : h,
      isSnap: C ? x : g,
      offset: w
    };
  });
}
function Fo(t, r) {
  return t.isBound ? t.offset : r.isSnap ? r.offset : 0;
}
function Vv(t, r, e, n) {
  var a = wv(t, r, e), i = a.horizontal, o = a.vertical, s = n ? {
    horizontal: { isSnap: !1 },
    vertical: { isSnap: !1 }
  } : Iv(t, r, e), u = s.horizontal, f = s.vertical, l = Fo(i, u), c = Fo(o, f), v = V(l), d = V(c);
  return {
    horizontal: {
      isBound: i.isBound,
      isSnap: u.isSnap,
      offset: l,
      dist: v
    },
    vertical: {
      isBound: o.isBound,
      isSnap: f.isSnap,
      offset: c,
      dist: d
    }
  };
}
function Uv(t, r, e, n, a) {
  var i = [-e[0], -e[1]], o = t.state, s = o.width, u = o.height, f = t.props.bounds, l = 1 / 0, c = 1 / 0;
  if (f) {
    var v = [
      [e[0], -e[1]],
      [-e[0], e[1]]
    ], d = f.left, p = d === void 0 ? -1 / 0 : d, h = f.top, g = h === void 0 ? -1 / 0 : h, y = f.right, S = y === void 0 ? 1 / 0 : y, b = f.bottom, x = b === void 0 ? 1 / 0 : b;
    v.forEach(function(E) {
      var _ = E[0] !== i[0], C = E[1] !== i[1], w = Ut(r, E), R = Wt(n, w) * 360 / Math.PI;
      if (C) {
        var M = w.slice();
        (V(R - 360) < 2 || V(R - 180) < 2) && (M[1] = n[1]);
        var G = Za(n, M, (n[1] < w[1] ? x : g) - w[1], !1, a), z = I(G.offset, 2), A = z[1], N = G.isOutside;
        isNaN(A) || (c = u + (N ? 1 : -1) * V(A));
      }
      if (_) {
        var M = w.slice();
        (V(R - 90) < 2 || V(R - 270) < 2) && (M[0] = n[0]);
        var B = Za(n, M, (n[0] < w[0] ? S : p) - w[0], !0, a), X = I(B.offset, 1), U = X[0], j = B.isOutside;
        isNaN(U) || (l = s + (j ? 1 : -1) * V(U));
      }
    });
  }
  return {
    maxWidth: l,
    maxHeight: c
  };
}
var ar = {
  name: "draggable",
  props: [
    "draggable",
    "throttleDrag",
    "throttleDragRotate",
    "hideThrottleDragRotateLine",
    "startDragRotate",
    "edgeDraggable"
  ],
  events: [
    "dragStart",
    "drag",
    "dragEnd",
    "dragGroupStart",
    "dragGroup",
    "dragGroupEnd"
  ],
  requestStyle: function() {
    return ["left", "top", "right", "bottom"];
  },
  requestChildStyle: function() {
    return ["left", "top", "right", "bottom"];
  },
  render: function(t, r) {
    var e = t.props, n = e.hideThrottleDragRotateLine, a = e.throttleDragRotate, i = e.zoom, o = t.getState(), s = o.dragInfo, u = o.beforeOrigin;
    if (n || !a || !s)
      return [];
    var f = s.dist;
    if (!f[0] && !f[1])
      return [];
    var l = xr(f), c = Wt(f, [0, 0]);
    return [r.createElement("div", { className: ft("line", "horizontal", "dragline", "dashed"), key: "dragRotateGuideline", style: {
      width: "".concat(l, "px"),
      transform: "translate(".concat(u[0], "px, ").concat(u[1], "px) rotate(").concat(c, "rad) scaleY(").concat(i, ")")
    } })];
  },
  dragStart: function(t, r) {
    var e = r.datas, n = r.parentEvent, a = r.parentGesto, i = t.state, o = i.gestos, s = i.style;
    if (o.draggable)
      return !1;
    o.draggable = a || t.targetGesto, e.datas = {}, e.left = parseFloat(s.left || "") || 0, e.top = parseFloat(s.top || "") || 0, e.bottom = parseFloat(s.bottom || "") || 0, e.right = parseFloat(s.right || "") || 0, e.startValue = [0, 0], se(t, r), fa(t, r, "translate"), pd(t, e), e.prevDist = [0, 0], e.prevBeforeDist = [0, 0], e.isDrag = !1, e.deltaOffset = [0, 0];
    var u = xt(t, r, P({ set: function(l) {
      e.startValue = l;
    } }, ua(t, r))), f = n || at(t, "onDragStart", u);
    return f !== !1 ? (e.isDrag = !0, t.state.dragInfo = {
      startRect: t.getRect(),
      dist: [0, 0]
    }) : (o.draggable = null, e.isPinch = !1), e.isDrag ? u : !1;
  },
  drag: function(t, r) {
    if (r) {
      oa(t, r, "translate");
      var e = r.datas, n = r.parentEvent, a = r.parentFlag, i = r.isPinch, o = r.deltaOffset, s = r.useSnap, u = r.isRequest, f = r.isGroup, l = r.parentThrottleDrag, c = r.distX, v = r.distY, d = e.isDrag, p = e.prevDist, h = e.prevBeforeDist, g = e.startValue;
      if (d) {
        o && (c += o[0], v += o[1]);
        var y = t.props, S = y.parentMoveable, b = f ? 0 : y.throttleDrag || l || 0, x = n ? 0 : y.throttleDragRotate || 0, E = 0, _ = !1, C = !1, w = !1, R = !1;
        if (!n && x > 0 && (c || v)) {
          var M = y.startDragRotate || 0, G = yt(M + Wt([0, 0], [c, v]) * 180 / Math.PI, x) - M, z = v * Math.abs(Math.cos((G - 90) / 180 * Math.PI)), A = c * Math.abs(Math.cos(G / 180 * Math.PI)), N = xr([A, z]);
          E = G * Math.PI / 180, c = N * Math.cos(E), v = N * Math.sin(E);
        }
        if (!i && !n && !a) {
          var B = I(jv(t, c, v, x, !s && u || o, e), 2), X = B[0], U = B[1];
          _ = X.isSnap, C = X.isBound, w = U.isSnap, R = U.isBound;
          var j = X.offset, $ = U.offset;
          c += j, v += $;
        }
        var D = Tt(su({ datas: e, distX: c, distY: v }), g), T = Tt(ov({ datas: e, distX: c, distY: v }), g);
        Co(T, sr), Co(D, sr), x || (!_ && !C && (T[0] = yt(T[0], b), D[0] = yt(D[0], b)), !w && !R && (T[1] = yt(T[1], b), D[1] = yt(D[1], b)));
        var F = ct(D, g), W = ct(T, g), Y = ct(W, p), K = ct(F, h);
        e.prevDist = W, e.prevBeforeDist = F, e.passDelta = Y, e.passDist = W;
        var L = e.left + F[0], et = e.top + F[1], rt = e.right - F[0], pt = e.bottom - F[1], Et = sa(e, "translate(".concat(T[0], "px, ").concat(T[1], "px)"), "translate(".concat(W[0], "px, ").concat(W[1], "px)"));
        if (Pi(r, Et), t.state.dragInfo.dist = n ? [0, 0] : W, !(!n && !S && Y.every(function(vt) {
          return !vt;
        }) && K.some(function(vt) {
          return !vt;
        }))) {
          var J = t.state, H = J.width, bt = J.height, ut = xt(t, r, P({ transform: Et, dist: W, delta: Y, translate: T, beforeDist: F, beforeDelta: K, beforeTranslate: D, left: L, top: et, right: rt, bottom: pt, width: H, height: bt, isPinch: i }, or({
            transform: Et
          }, r)));
          return !n && at(t, "onDrag", ut), ut;
        }
      }
    }
  },
  dragAfter: function(t, r) {
    var e = r.datas, n = e.deltaOffset;
    return n[0] || n[1] ? (e.deltaOffset = [0, 0], this.drag(t, P(P({}, r), { deltaOffset: n }))) : !1;
  },
  dragEnd: function(t, r) {
    var e = r.parentEvent, n = r.datas;
    if (t.state.dragInfo = null, !!n.isDrag) {
      n.isDrag = !1;
      var a = yr(t, r, {});
      return !e && at(t, "onDragEnd", a), a;
    }
  },
  dragGroupStart: function(t, r) {
    var e, n, a = r.datas, i = r.clientX, o = r.clientY, s = this.dragStart(t, r);
    if (!s)
      return !1;
    var u = _a(t, this, "dragStart", [
      i || 0,
      o || 0
    ], r, !1, "draggable"), f = u.childEvents, l = u.eventParams, c = P(P({}, s), { targets: t.props.targets, events: l }), v = at(t, "onDragGroupStart", c);
    a.isDrag = v !== !1;
    var d = (n = (e = f[0]) === null || e === void 0 ? void 0 : e.datas.startValue) !== null && n !== void 0 ? n : [0, 0];
    return a.throttleOffset = [d[0] % 1, d[1] % 1], a.isDrag ? s : !1;
  },
  dragGroup: function(t, r) {
    var e = r.datas;
    if (e.isDrag) {
      var n = this.drag(t, P(P({}, r), { parentThrottleDrag: t.props.throttleDrag })), a = r.datas.passDelta, i = _a(t, this, "drag", a, r, !1, "draggable").eventParams;
      if (n) {
        var o = P({ targets: t.props.targets, events: i }, n);
        return at(t, "onDragGroup", o), o;
      }
    }
  },
  dragGroupEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isDrag) {
      this.dragEnd(t, r);
      var a = _a(t, this, "dragEnd", [0, 0], r, !1, "draggable").eventParams;
      return at(t, "onDragGroupEnd", yr(t, r, {
        targets: t.props.targets,
        events: a
      })), e;
    }
  },
  /**
       * @method Moveable.Draggable#request
       * @param {object} [e] - the draggable's request parameter
       * @param {number} [e.x] - x position
       * @param {number} [e.y] - y position
       * @param {number} [e.deltaX] - X number to move
       * @param {number} [e.deltaY] - Y number to move
       * @return {Moveable.Requester} Moveable Requester
       * @example
  
       * // Instantly Request (requestStart - request - requestEnd)
       * // Use Relative Value
       * moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
       * // Use Absolute Value
       * moveable.request("draggable", { x: 200, y: 100 }, true);
       *
       * // requestStart
       * const requester = moveable.request("draggable");
       *
       * // request
       * // Use Relative Value
       * requester.request({ deltaX: 10, deltaY: 10 });
       * requester.request({ deltaX: 10, deltaY: 10 });
       * requester.request({ deltaX: 10, deltaY: 10 });
       * // Use Absolute Value
       * moveable.request("draggable", { x: 200, y: 100 });
       * moveable.request("draggable", { x: 220, y: 100 });
       * moveable.request("draggable", { x: 240, y: 100 });
       *
       * // requestEnd
       * requester.requestEnd();
       */
  request: function(t) {
    var r = {}, e = t.getRect(), n = 0, a = 0, i = !1;
    return {
      isControl: !1,
      requestStart: function(o) {
        return i = o.useSnap, { datas: r, useSnap: i };
      },
      request: function(o) {
        return "x" in o ? n = o.x - e.left : "deltaX" in o && (n += o.deltaX), "y" in o ? a = o.y - e.top : "deltaY" in o && (a += o.deltaY), { datas: r, distX: n, distY: a, useSnap: i };
      },
      requestEnd: function() {
        return { datas: r, isDrag: !0, useSnap: i };
      }
    };
  },
  unset: function(t) {
    t.state.gestos.draggable = null, t.state.dragInfo = null;
  }
};
function Ru(t, r) {
  var e = Ut(t, r), n = [0, 0];
  return {
    fixedPosition: e,
    fixedDirection: r,
    fixedOffset: n
  };
}
function Kv(t, r) {
  var e = t.allMatrix, n = t.is3d, a = t.width, i = t.height, o = n ? 4 : 3, s = [
    a / 2 * (1 + r[0]),
    i / 2 * (1 + r[1])
  ], u = Lt(e, s, o), f = [0, 0];
  return {
    fixedPosition: u,
    fixedDirection: r,
    fixedOffset: f
  };
}
function Tu(t, r) {
  var e = t.allMatrix, n = t.is3d, a = t.width, i = t.height, o = n ? 4 : 3, s = pv(r, a, i), u = Lt(e, r, o), f = [
    a ? 0 : r[0],
    i ? 0 : r[1]
  ];
  return {
    fixedPosition: u,
    fixedDirection: s,
    fixedOffset: f
  };
}
var Lo = Hi("resizable"), Ja = {
  name: "resizable",
  ableGroup: "size",
  canPinch: !0,
  props: [
    "resizable",
    "throttleResize",
    "renderDirections",
    "displayAroundControls",
    "keepRatio",
    "resizeFormat",
    "keepRatioFinally",
    "edge",
    "checkResizableError"
  ],
  events: [
    "resizeStart",
    "beforeResize",
    "resize",
    "resizeEnd",
    "resizeGroupStart",
    "beforeResizeGroup",
    "resizeGroup",
    "resizeGroupEnd"
  ],
  render: hu("resizable"),
  dragControlCondition: Lo,
  viewClassName: Wi("resizable"),
  dragControlStart: function(t, r) {
    var e, n = r.inputEvent, a = r.isPinch, i = r.isGroup, o = r.parentDirection, s = r.parentGesto, u = r.datas, f = r.parentFixedDirection, l = r.parentEvent, c = Yu(o, a, n, u), v = t.state, d = v.target, p = v.width, h = v.height, g = v.gestos;
    if (!c || !d || g.resizable)
      return !1;
    g.resizable = s || t.controlGesto, !a && se(t, r), u.datas = {}, u.direction = c, u.startOffsetWidth = p, u.startOffsetHeight = h, u.prevWidth = 0, u.prevHeight = 0, u.minSize = [0, 0], u.startWidth = v.inlineCSSWidth || v.cssWidth, u.startHeight = v.inlineCSSHeight || v.cssHeight, u.maxSize = [1 / 0, 1 / 0], i || (u.minSize = [
      v.minOffsetWidth,
      v.minOffsetHeight
    ], u.maxSize = [
      v.maxOffsetWidth,
      v.maxOffsetHeight
    ]);
    var y = t.props.transformOrigin || "% %";
    u.transformOrigin = y && Lr(y) ? y.split(" ") : y, u.startOffsetMatrix = v.offsetMatrix, u.startTransformOrigin = v.transformOrigin, u.isWidth = (e = r?.parentIsWidth) !== null && e !== void 0 ? e : !c[0] && !c[1] || c[0] || !c[1];
    function S(R) {
      u.ratio = R && isFinite(R) ? R : 0;
    }
    u.startPositions = _r(t.state);
    function b(R) {
      var M = Ru(u.startPositions, R);
      u.fixedDirection = M.fixedDirection, u.fixedPosition = M.fixedPosition, u.fixedOffset = M.fixedOffset;
    }
    function x(R) {
      var M = Tu(t.state, R);
      u.fixedDirection = M.fixedDirection, u.fixedPosition = M.fixedPosition, u.fixedOffset = M.fixedOffset;
    }
    function E(R) {
      u.minSize = [
        Bt("".concat(R[0]), 0) || 0,
        Bt("".concat(R[1]), 0) || 0
      ];
    }
    function _(R) {
      var M = [
        R[0] || 1 / 0,
        R[1] || 1 / 0
      ];
      (!Ke(M[0]) || isFinite(M[0])) && (M[0] = Bt("".concat(M[0]), 0) || 1 / 0), (!Ke(M[1]) || isFinite(M[1])) && (M[1] = Bt("".concat(M[1]), 0) || 1 / 0), u.maxSize = M;
    }
    S(p / h), b(f || [-c[0], -c[1]]), u.setFixedDirection = b, u.setFixedPosition = x, u.setMin = E, u.setMax = _;
    var C = xt(t, r, {
      direction: c,
      startRatio: u.ratio,
      set: function(R) {
        var M = I(R, 2), G = M[0], z = M[1];
        u.startWidth = G, u.startHeight = z;
      },
      setMin: E,
      setMax: _,
      setRatio: S,
      setFixedDirection: b,
      setFixedPosition: x,
      setOrigin: function(R) {
        u.transformOrigin = R;
      },
      dragStart: ar.dragStart(t, new xe().dragStart([0, 0], r))
    }), w = l || at(t, "onResizeStart", C);
    return u.startFixedDirection = u.fixedDirection, u.startFixedPosition = u.fixedPosition, w !== !1 && (u.isResize = !0, t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: c
    }), u.isResize ? C : !1;
  },
  dragControl: function(t, r) {
    var e, n = r.datas, a = r.parentFlag, i = r.isPinch, o = r.parentKeepRatio, s = r.dragClient, u = r.parentDist, f = r.useSnap, l = r.isRequest, c = r.isGroup, v = r.parentEvent, d = r.resolveMatrix, p = n.isResize, h = n.transformOrigin, g = n.startWidth, y = n.startHeight, S = n.prevWidth, b = n.prevHeight, x = n.minSize, E = n.maxSize, _ = n.ratio, C = n.startOffsetWidth, w = n.startOffsetHeight, R = n.isWidth;
    if (!p)
      return;
    if (d) {
      var M = t.state.is3d, G = n.startOffsetMatrix, z = n.startTransformOrigin, A = M ? 4 : 3, N = Je(Vn(r)), B = Math.sqrt(N.length);
      A !== B && (N = Rr(N, B, A));
      var X = ln(G, N, z, A), U = ue(X, C, w, A);
      n.startPositions = U, n.nextTargetMatrix = N, n.nextAllMatrix = X;
    }
    var j = oe(t.props, "resizable"), $ = j.resizeFormat, D = j.throttleResize, T = D === void 0 ? a ? 0 : 1 : D, F = j.parentMoveable, W = j.keepRatioFinally, Y = n.direction, K = Y, L = 0, et = 0;
    !Y[0] && !Y[1] && (K = [1, 1]);
    var rt = _ && (o ?? j.keepRatio) || !1;
    function pt() {
      var st = n.fixedDirection, _t = qu(K, rt, n, r);
      L = _t.distWidth, et = _t.distHeight;
      var Dt = K[0] - st[0] || rt ? Math.max(C + L, sr) : C, ht = K[1] - st[1] || rt ? Math.max(w + et, sr) : w;
      return rt && C && w && (R ? ht = Dt / _ : Dt = ht * _), [Dt, ht];
    }
    var Et = I(pt(), 2), J = Et[0], H = Et[1];
    v || (n.setFixedDirection(n.fixedDirection), at(t, "onBeforeResize", xt(t, r, {
      startFixedDirection: n.startFixedDirection,
      startFixedPosition: n.startFixedPosition,
      setFixedDirection: function(st) {
        var _t;
        return n.setFixedDirection(st), _t = I(pt(), 2), J = _t[0], H = _t[1], [J, H];
      },
      setFixedPosition: function(st) {
        var _t;
        return n.setFixedPosition(st), _t = I(pt(), 2), J = _t[0], H = _t[1], [J, H];
      },
      boundingWidth: J,
      boundingHeight: H,
      setSize: function(st) {
        var _t;
        _t = I(st, 2), J = _t[0], H = _t[1];
      }
    }, !0)));
    var bt = s;
    s || (!a && i ? bt = yv(t, [0, 0]) : bt = n.fixedPosition);
    var ut = [0, 0];
    i || (ut = vd(t, J, H, Y, bt, !f && l, n)), u && (!u[0] && (ut[0] = 0), !u[1] && (ut[1] = 0));
    function vt() {
      var st;
      $ && (st = I($([J, H]), 2), J = st[0], H = st[1]), J = yt(J, T), H = yt(H, T);
    }
    if (rt) {
      K[0] && K[1] && ut[0] && ut[1] && (V(ut[0]) > V(ut[1]) ? ut[1] = 0 : ut[0] = 0);
      var gt = !ut[0] && !ut[1];
      gt && vt(), K[0] && !K[1] || ut[0] && !ut[1] || gt && R ? (J += ut[0], H = J / _) : (!K[0] && K[1] || !ut[0] && ut[1] || gt && !R) && (H += ut[1], J = H * _);
    } else
      J += ut[0], H += ut[1], J = Math.max(0, J), H = Math.max(0, H);
    e = I(Ys([J, H], x, E, rt ? _ : !1), 2), J = e[0], H = e[1], vt(), rt && (c || W) && (R ? H = J / _ : J = H * _), L = J - C, et = H - w;
    var wt = [L - S, et - b];
    n.prevWidth = L, n.prevHeight = et;
    var Mt = mv(t, J, H, bt, h, n);
    if (!(!F && wt.every(function(st) {
      return !st;
    }) && Mt.every(function(st) {
      return !st;
    }))) {
      var mt = ar.drag(t, fn(r, t.state, Mt, !!i, !1, "draggable")), Rt = mt.transform, O = g + L, Q = y + et, nt = xt(t, r, P({ width: O, height: Q, offsetWidth: Math.round(J), offsetHeight: Math.round(H), startRatio: _, boundingWidth: J, boundingHeight: H, direction: Y, dist: [L, et], delta: wt, isPinch: !!i, drag: mt }, Hu({
        style: {
          width: "".concat(O, "px"),
          height: "".concat(Q, "px")
        },
        transform: Rt
      }, mt, r)));
      return !v && at(t, "onResize", nt), nt;
    }
  },
  dragControlAfter: function(t, r) {
    var e = r.datas, n = e.isResize, a = e.startOffsetWidth, i = e.startOffsetHeight, o = e.prevWidth, s = e.prevHeight;
    if (!(!n || t.props.checkResizableError === !1)) {
      var u = t.state, f = u.width, l = u.height, c = f - (a + o), v = l - (i + s), d = V(c) > 3, p = V(v) > 3;
      if (d && (e.startWidth += c, e.startOffsetWidth += c, e.prevWidth += c), p && (e.startHeight += v, e.startOffsetHeight += v, e.prevHeight += v), d || p)
        return this.dragControl(t, r);
    }
  },
  dragControlEnd: function(t, r) {
    var e = r.datas, n = r.parentEvent;
    if (e.isResize) {
      e.isResize = !1;
      var a = yr(t, r, {});
      return !n && at(t, "onResizeEnd", a), a;
    }
  },
  dragGroupControlCondition: Lo,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = this.dragControlStart(t, P(P({}, r), { isGroup: !0 }));
    if (!n)
      return !1;
    var a = wr(t, "resizable", r), i = e.startOffsetWidth, o = e.startOffsetHeight;
    function s() {
      var d = e.minSize;
      a.forEach(function(p) {
        var h = p.datas, g = h.minSize, y = h.startOffsetWidth, S = h.startOffsetHeight, b = i * (y ? g[0] / y : 0), x = o * (S ? g[1] / S : 0);
        d[0] = Math.max(d[0], b), d[1] = Math.max(d[1], x);
      });
    }
    function u() {
      var d = e.maxSize;
      a.forEach(function(p) {
        var h = p.datas, g = h.maxSize, y = h.startOffsetWidth, S = h.startOffsetHeight, b = i * (y ? g[0] / y : 0), x = o * (S ? g[1] / S : 0);
        d[0] = Math.min(d[0], b), d[1] = Math.min(d[1], x);
      });
    }
    var f = Nr(t, this, "dragControlStart", r, function(d, p) {
      return Un(t, d, e, p);
    });
    s(), u();
    var l = function(d) {
      n.setFixedDirection(d), f.forEach(function(p, h) {
        p.setFixedDirection(d), Un(t, p.moveable, e, a[h]);
      });
    };
    e.setFixedDirection = l;
    var c = P(P({}, n), { targets: t.props.targets, events: f.map(function(d) {
      return P(P({}, d), { setMin: function(p) {
        d.setMin(p), s();
      }, setMax: function(p) {
        d.setMax(p), u();
      } });
    }), setFixedDirection: l, setMin: function(d) {
      n.setMin(d), s();
    }, setMax: function(d) {
      n.setMax(d), u();
    } }), v = at(t, "onResizeGroupStart", c);
    return e.isResize = v !== !1, e.isResize ? n : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isResize) {
      var n = oe(t.props, "resizable");
      pa(t, "onBeforeResize", function(d) {
        at(t, "onBeforeResizeGroup", xt(t, r, P(P({}, d), { targets: n.targets }), !0));
      });
      var a = this.dragControl(t, P(P({}, r), { isGroup: !0 }));
      if (a) {
        var i = a.boundingWidth, o = a.boundingHeight, s = a.dist, u = n.keepRatio, f = [
          i / (i - s[0]),
          o / (o - s[1])
        ], l = e.fixedPosition, c = Nr(t, this, "dragControl", r, function(d, p) {
          var h = I(nr(on(t.rotation / 180 * Math.PI, 3), [
            p.datas.originalX * f[0],
            p.datas.originalY * f[1],
            1
          ], 3), 2), g = h[0], y = h[1];
          return P(P({}, p), { parentDist: null, parentScale: f, dragClient: Tt(l, [g, y]), parentKeepRatio: u });
        }), v = P({ targets: n.targets, events: c }, a);
        return at(t, "onResizeGroup", v), v;
      }
    }
  },
  dragGroupControlEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isResize) {
      this.dragControlEnd(t, r);
      var a = Nr(t, this, "dragControlEnd", r), i = yr(t, r, {
        targets: t.props.targets,
        events: a
      });
      return at(t, "onResizeGroupEnd", i), e;
    }
  },
  /**
       * @method Moveable.Resizable#request
       * @param {Moveable.Resizable.ResizableRequestParam} e - the Resizable's request parameter
       * @return {Moveable.Requester} Moveable Requester
       * @example
  
       * // Instantly Request (requestStart - request - requestEnd)
       * // Use Relative Value
       * moveable.request("resizable", { deltaWidth: 10, deltaHeight: 10 }, true);
       *
       * // Use Absolute Value
       * moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 }, true);
       *
       * // requestStart
       * const requester = moveable.request("resizable");
       *
       * // request
       * // Use Relative Value
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       *
       * // Use Absolute Value
       * moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 });
       * moveable.request("resizable", { offsetWidth: 110, offsetHeight: 100 });
       * moveable.request("resizable", { offsetWidth: 120, offsetHeight: 100 });
       *
       * // requestEnd
       * requester.requestEnd();
       */
  request: function(t) {
    var r = {}, e = 0, n = 0, a = !1, i = t.getRect();
    return {
      isControl: !0,
      requestStart: function(o) {
        var s;
        return a = o.useSnap, {
          datas: r,
          parentDirection: o.direction || [1, 1],
          parentIsWidth: (s = o?.horizontal) !== null && s !== void 0 ? s : !0,
          useSnap: a
        };
      },
      request: function(o) {
        return "offsetWidth" in o ? e = o.offsetWidth - i.offsetWidth : "deltaWidth" in o && (e += o.deltaWidth), "offsetHeight" in o ? n = o.offsetHeight - i.offsetHeight : "deltaHeight" in o && (n += o.deltaHeight), {
          datas: r,
          parentDist: [e, n],
          parentKeepRatio: o.keepRatio,
          useSnap: a
        };
      },
      requestEnd: function() {
        return { datas: r, isDrag: !0, useSnap: a };
      }
    };
  },
  unset: function(t) {
    t.state.gestos.resizable = null;
  }
};
function Ca(t, r, e, n, a) {
  var i = t.props.groupable, o = t.state, s = o.is3d ? 4 : 3, u = r.origin, f = Lt(
    t.state.rootMatrix,
    // TO-DO #710
    ct([u[0], u[1]], i ? [0, 0] : [o.left, o.top]),
    s
  ), l = Tt([a.left, a.top], f);
  r.startAbsoluteOrigin = l, r.prevDeg = Wt(l, [e, n]) / Math.PI * 180, r.defaultDeg = r.prevDeg, r.prevSnapDeg = 0, r.loop = 0, r.startDist = Br(l, [e, n]);
}
function Yn(t, r, e) {
  var n = e.defaultDeg, a = e.prevDeg, i = a % 360, o = Math.floor(a / 360);
  i < 0 && (i += 360), i > t && i > 270 && t < 90 ? ++o : i < t && i < 90 && t > 270 && --o;
  var s = r * (o * 360 + t - n);
  return e.prevDeg = n + s, s;
}
function wa(t, r, e, n) {
  return Yn(Wt(n.startAbsoluteOrigin, [t, r]) / Math.PI * 180, e, n);
}
function Da(t, r, e, n, a, i) {
  var o = t.props.throttleRotate, s = o === void 0 ? 0 : o, u = e.prevSnapDeg, f = 0, l = !1;
  if (i) {
    var c = cd(t, r, n, a + n);
    l = c.isSnap, f = a + c.dist;
  }
  l || (f = yt(a + n, s));
  var v = f - a;
  return e.prevSnapDeg = v, [v - u, v, f];
}
function Mu(t, r, e) {
  var n = I(r, 4), a = n[0], i = n[1], o = n[2], s = n[3];
  if (t === "none")
    return [];
  if (Zt(t))
    return t.map(function(g) {
      return Mu(g, [a, i, o, s], e)[0];
    });
  var u = I((t || "top").split("-"), 2), f = u[0], l = u[1], c = [a, i];
  f === "left" ? c = [o, a] : f === "right" ? c = [i, s] : f === "bottom" && (c = [s, o]);
  var v = [
    (c[0][0] + c[1][0]) / 2,
    (c[0][1] + c[1][1]) / 2
  ], d = Fu(c, e);
  if (l) {
    var p = l === "top" || l === "left", h = f === "bottom" || f === "left";
    v = c[p && !h || !p && h ? 0 : 1];
  }
  return [[v, d]];
}
function Qa(t, r) {
  if (r.isRequest)
    return r.requestAble === "rotatable";
  var e = r.inputEvent.target;
  if (Vt(e, ft("rotation-control")) || t.props.rotateAroundControls && Vt(e, ft("around-control")) || Vt(e, ft("control")) && Vt(e, ft("rotatable")))
    return !0;
  var n = t.props.rotationTarget;
  return n ? $i(n, !0).some(function(a) {
    return a ? e === a || e.contains(a) : !1;
  }) : !1;
}
var Zv = `.rotation {
position: absolute;
height: 40px;
width: 1px;
transform-origin: 50% 100%;
height: calc(40px * var(--zoom));
top: auto;
left: 0;
bottom: 100%;
will-change: transform;
}
.rotation .rotation-line {
display: block;
width: 100%;
height: 100%;
transform-origin: 50% 50%;
}
.rotation .rotation-control {
border-color: #4af;
border-color: var(--moveable-color);
background:#fff;
cursor: alias;
}
:global .view-rotation-dragging, .rotatable.direction.control {
cursor: alias;
}
.rotatable.direction.control.move {
cursor: move;
}
`, Jv = {
  name: "rotatable",
  canPinch: !0,
  props: [
    "rotatable",
    "rotationPosition",
    "throttleRotate",
    "renderDirections",
    "rotationTarget",
    "rotateAroundControls",
    "edge",
    "resolveAblesWithRotatable",
    "displayAroundControls"
  ],
  events: [
    "rotateStart",
    "beforeRotate",
    "rotate",
    "rotateEnd",
    "rotateGroupStart",
    "beforeRotateGroup",
    "rotateGroup",
    "rotateGroupEnd"
  ],
  css: [Zv],
  viewClassName: function(t) {
    return t.isDragging("rotatable") ? ft("view-rotation-dragging") : "";
  },
  render: function(t, r) {
    var e = oe(t.props, "rotatable"), n = e.rotatable, a = e.rotationPosition, i = e.zoom, o = e.renderDirections, s = e.rotateAroundControls, u = e.resolveAblesWithRotatable, f = t.getState(), l = f.renderPoses, c = f.direction;
    if (!n)
      return null;
    var v = Mu(a, l, c), d = [];
    if (v.forEach(function(y, S) {
      var b = I(y, 2), x = b[0], E = b[1];
      d.push(r.createElement(
        "div",
        { key: "rotation".concat(S), className: ft("rotation"), style: {
          // tslint:disable-next-line: max-line-length
          transform: "translate(-50%) translate(".concat(x[0], "px, ").concat(x[1], "px) rotate(").concat(E, "rad)")
        } },
        r.createElement("div", { className: ft("line rotation-line"), style: {
          transform: "scaleX(".concat(i, ")")
        } }),
        r.createElement("div", { className: ft("control rotation-control"), style: {
          transform: "translate(0.5px) scale(".concat(i, ")")
        } })
      ));
    }), o) {
      var p = Te(u || {}), h = {};
      p.forEach(function(y) {
        u[y].forEach(function(S) {
          h[S] = y;
        });
      });
      var g = [];
      Zt(o) && (g = o.map(function(y) {
        var S = h[y];
        return {
          data: S ? { resolve: S } : {},
          classNames: S ? ["move"] : [],
          dir: y
        };
      })), d.push.apply(d, Z([], I(vu(t, "rotatable", g, r)), !1));
    }
    return s && d.push.apply(d, Z([], I(mu(t, r)), !1)), d;
  },
  dragControlCondition: Qa,
  dragControlStart: function(t, r) {
    var e, n, a = r.datas, i = r.clientX, o = r.clientY, s = r.parentRotate, u = r.parentFlag, f = r.isPinch, l = r.isRequest, c = t.state, v = c.target, d = c.left, p = c.top, h = c.direction, g = c.beforeDirection, y = c.targetTransform, S = c.moveableClientRect, b = c.offsetMatrix, x = c.targetMatrix, E = c.allMatrix, _ = c.width, C = c.height;
    if (!l && !v)
      return !1;
    var w = t.getRect();
    a.rect = w, a.transform = y, a.left = d, a.top = p;
    var R = function(K) {
      var L = Tu(t.state, K);
      a.fixedDirection = L.fixedDirection, a.fixedOffset = L.fixedOffset, a.fixedPosition = L.fixedPosition, T && T.setFixedPosition(K);
    }, M = function(K) {
      var L = Kv(t.state, K);
      a.fixedDirection = L.fixedDirection, a.fixedOffset = L.fixedOffset, a.fixedPosition = L.fixedPosition, T && T.setFixedDirection(K);
    }, G = i, z = o;
    if (l || f || u) {
      var A = s || 0;
      a.beforeInfo = {
        origin: w.beforeOrigin,
        prevDeg: A,
        defaultDeg: A,
        prevSnapDeg: 0,
        startDist: 0
      }, a.afterInfo = P(P({}, a.beforeInfo), { origin: w.origin }), a.absoluteInfo = P(P({}, a.beforeInfo), { origin: w.origin, startValue: A });
    } else {
      var N = (n = r.inputEvent) === null || n === void 0 ? void 0 : n.target;
      if (N) {
        var B = N.getAttribute("data-direction") || "", X = nv[B];
        if (X) {
          a.isControl = !0, a.isAroundControl = Vt(N, ft("around-control")), a.controlDirection = X;
          var U = N.getAttribute("data-resolve");
          U && (a.resolveAble = U);
          var j = Rd(c.rootMatrix, c.renderPoses, S);
          e = I(Ut(j, X), 2), G = e[0], z = e[1];
        }
      }
      a.beforeInfo = { origin: w.beforeOrigin }, a.afterInfo = { origin: w.origin }, a.absoluteInfo = {
        origin: w.origin,
        startValue: w.rotation
      };
      var $ = R;
      R = function(K) {
        var L = c.is3d ? 4 : 3, et = I(Tt(Xs(x, L), K), 2), rt = et[0], pt = et[1], Et = nr(b, ne([rt, pt], L)), J = nr(E, ne([K[0], K[1]], L));
        $(K);
        var H = c.posDelta;
        a.beforeInfo.origin = ct(Et, H), a.afterInfo.origin = ct(J, H), a.absoluteInfo.origin = ct(J, H), Ca(t, a.beforeInfo, G, z, S), Ca(t, a.afterInfo, G, z, S), Ca(t, a.absoluteInfo, G, z, S);
      }, M = function(K) {
        var L = Ut([
          [0, 0],
          [_, 0],
          [0, C],
          [_, C]
        ], K);
        R(L);
      };
    }
    a.startClientX = G, a.startClientY = z, a.direction = h, a.beforeDirection = g, a.startValue = 0, a.datas = {}, fa(t, r, "rotate");
    var D = !1, T = !1;
    if (a.isControl && a.resolveAble) {
      var F = a.resolveAble;
      F === "resizable" && (T = Ja.dragControlStart(t, P(P({}, new xe("resizable").dragStart([0, 0], r)), { parentPosition: a.controlPosition, parentFixedPosition: a.fixedPosition })));
    }
    T || (D = ar.dragStart(t, new xe().dragStart([0, 0], r))), R(Td(t));
    var W = xt(t, r, P(P({ set: function(K) {
      a.startValue = K * Math.PI / 180;
    }, setFixedDirection: M, setFixedPosition: R }, ua(t, r)), { dragStart: D, resizeStart: T })), Y = at(t, "onRotateStart", W);
    return a.isRotate = Y !== !1, c.snapRenderInfo = {
      request: r.isRequest
    }, a.isRotate ? W : !1;
  },
  dragControl: function(t, r) {
    var e, n, a, i = r.datas, o = r.clientDistX, s = r.clientDistY, u = r.parentRotate, f = r.parentFlag, l = r.isPinch, c = r.groupDelta, v = r.resolveMatrix, d = i.beforeDirection, p = i.beforeInfo, h = i.afterInfo, g = i.absoluteInfo, y = i.isRotate, S = i.startValue, b = i.rect, x = i.startClientX, E = i.startClientY;
    if (y) {
      oa(t, r, "rotate");
      var _ = iv(r), C = d * _, w = t.props.parentMoveable, R = 0, M, G, z = 0, A, N, B = 0, X, U, j = 180 / Math.PI * S, $ = g.startValue, D = !1, T = x + o, F = E + s;
      if (!f && "parentDist" in r) {
        var W = r.parentDist;
        M = W, A = W, X = W;
      } else l || f ? (M = Yn(u, d, p), A = Yn(u, C, h), X = Yn(u, C, g)) : (M = wa(T, F, d, p), A = wa(T, F, C, h), X = wa(T, F, C, g), D = !0);
      if (G = j + M, N = j + A, U = $ + X, at(t, "onBeforeRotate", xt(t, r, {
        beforeRotation: G,
        rotation: N,
        absoluteRotation: U,
        setRotation: function(bt) {
          A = bt - j, M = A, X = A;
        }
      }, !0)), e = I(Da(t, b, p, M, j, D), 3), R = e[0], M = e[1], G = e[2], n = I(Da(t, b, h, A, j, D), 3), z = n[0], A = n[1], N = n[2], a = I(Da(t, b, g, X, $, D), 3), B = a[0], X = a[1], U = a[2], !(!B && !z && !R && !w && !v)) {
        var Y = sa(i, "rotate(".concat(N, "deg)"), "rotate(".concat(A, "deg)"));
        v && (i.fixedPosition = Ai(t, i.targetAllTransform, i.fixedDirection, i.fixedOffset, i));
        var K = gv(t, A, i), L = ct(Tt(c || [0, 0], K), i.prevInverseDist || [0, 0]);
        i.prevInverseDist = K, i.requestValue = null;
        var et = fu(t, Y, L, l, r), rt = et, pt = Br([T, F], g.startAbsoluteOrigin) - g.startDist, Et = void 0;
        if (i.resolveAble === "resizable") {
          var J = Ja.dragControl(t, P(P({}, fn(r, t.state, [r.deltaX, r.deltaY], !!l, !1, "resizable")), { resolveMatrix: !0, parentDistance: pt }));
          J && (Et = J, rt = Hu(rt, J, r));
        }
        var H = xt(t, r, P(P({ delta: z, dist: A, rotate: N, rotation: N, beforeDist: M, beforeDelta: R, beforeRotate: G, beforeRotation: G, absoluteDist: X, absoluteDelta: B, absoluteRotate: U, absoluteRotation: U, isPinch: !!l, resize: Et }, et), rt));
        return at(t, "onRotate", H), H;
      }
    }
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    if (e.isRotate) {
      e.isRotate = !1;
      var n = yr(t, r, {});
      return at(t, "onRotateEnd", n), n;
    }
  },
  dragGroupControlCondition: Qa,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = t.state, a = n.left, i = n.top, o = n.beforeOrigin, s = this.dragControlStart(t, r);
    if (!s)
      return !1;
    s.set(e.beforeDirection * t.rotation);
    var u = Nr(t, this, "dragControlStart", r, function(c, v) {
      var d = c.state, p = d.left, h = d.top, g = d.beforeOrigin, y = Tt(ct([p, h], [a, i]), ct(g, o));
      return v.datas.startGroupClient = y, v.datas.groupClient = y, P(P({}, v), { parentRotate: 0 });
    }), f = P(P({}, s), { targets: t.props.targets, events: u }), l = at(t, "onRotateGroupStart", f);
    return e.isRotate = l !== !1, e.isRotate ? s : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isRotate) {
      pa(t, "onBeforeRotate", function(f) {
        at(t, "onBeforeRotateGroup", xt(t, r, P(P({}, f), { targets: t.props.targets }), !0));
      });
      var n = this.dragControl(t, r);
      if (n) {
        var a = e.beforeDirection, i = n.beforeDist, o = i / 180 * Math.PI, s = Nr(t, this, "dragControl", r, function(f, l) {
          var c = l.datas.startGroupClient, v = I(l.datas.groupClient, 2), d = v[0], p = v[1], h = I(an(c, o * a), 2), g = h[0], y = h[1], S = [g - d, y - p];
          return l.datas.groupClient = [g, y], P(P({}, l), { parentRotate: i, groupDelta: S });
        });
        t.rotation = a * n.beforeRotation;
        var u = P({ targets: t.props.targets, events: s, set: function(f) {
          t.rotation = f;
        }, setGroupRotation: function(f) {
          t.rotation = f;
        } }, n);
        return at(t, "onRotateGroup", u), u;
      }
    }
  },
  dragGroupControlEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isRotate) {
      this.dragControlEnd(t, r);
      var a = Nr(t, this, "dragControlEnd", r), i = yr(t, r, {
        targets: t.props.targets,
        events: a
      });
      return at(t, "onRotateGroupEnd", i), e;
    }
  },
  /**
       * @method Moveable.Rotatable#request
       * @param {object} [e] - the Resizable's request parameter
       * @param {number} [e.deltaRotate=0] -  delta number of rotation
       * @param {number} [e.rotate=0] - absolute number of moveable's rotation
       * @return {Moveable.Requester} Moveable Requester
       * @example
  
       * // Instantly Request (requestStart - request - requestEnd)
       * moveable.request("rotatable", { deltaRotate: 10 }, true);
       *
       * * moveable.request("rotatable", { rotate: 10 }, true);
       *
       * // requestStart
       * const requester = moveable.request("rotatable");
       *
       * // request
       * requester.request({ deltaRotate: 10 });
       * requester.request({ deltaRotate: 10 });
       * requester.request({ deltaRotate: 10 });
       *
       * requester.request({ rotate: 10 });
       * requester.request({ rotate: 20 });
       * requester.request({ rotate: 30 });
       *
       * // requestEnd
       * requester.requestEnd();
       */
  request: function(t) {
    var r = {}, e = 0, n = t.getRotation();
    return {
      isControl: !0,
      requestStart: function() {
        return { datas: r };
      },
      request: function(a) {
        return "deltaRotate" in a ? e += a.deltaRotate : "rotate" in a && (e = a.rotate - n), { datas: r, parentDist: e };
      },
      requestEnd: function() {
        return { datas: r, isDrag: !0 };
      }
    };
  }
};
function Qv(t, r) {
  var e, n = t.direction, a = t.classNames, i = t.size, o = t.pos, s = t.zoom, u = t.key, f = n === "horizontal", l = f ? "Y" : "X";
  return r.createElement("div", {
    key: u,
    className: a.join(" "),
    style: (e = {}, e[f ? "width" : "height"] = "".concat(i), e.transform = "translate(".concat(o[0], ", ").concat(o[1], ") translate").concat(l, "(-50%) scale").concat(l, "(").concat(s, ")"), e)
  });
}
function Ni(t, r) {
  return Qv(P(P({}, t), { classNames: Z([
    ft("line", "guideline", t.direction)
  ], I(t.classNames), !1).filter(function(e) {
    return e;
  }), size: t.size || "".concat(t.sizeValue, "px"), pos: t.pos || t.posValue.map(function(e) {
    return "".concat(yt(e, 0.1), "px");
  }) }), r);
}
function Yo(t, r, e, n, a, i, o, s) {
  var u = t.props.zoom;
  return e.map(function(f, l) {
    var c = f.type, v = f.pos, d = [0, 0];
    return d[o] = n, d[o ? 0 : 1] = -a + v, Ni({
      key: "".concat(r, "TargetGuideline").concat(l),
      classNames: [ft("target", "bold", c)],
      posValue: d,
      sizeValue: i,
      zoom: u,
      direction: r
    }, s);
  });
}
function Wo(t, r, e, n, a, i) {
  var o = t.props, s = o.zoom, u = o.isDisplayInnerSnapDigit, f = r === "horizontal" ? Xr : qr, l = a[f.start], c = a[f.end];
  return e.filter(function(v) {
    var d = v.hide, p = v.elementRect;
    if (d)
      return !1;
    if (u && p) {
      var h = p.rect;
      if (h[f.start] <= l && c <= h[f.end])
        return !1;
    }
    return !0;
  }).map(function(v, d) {
    var p = v.pos, h = v.size, g = v.element, y = v.className, S = [
      -n[0] + p[0],
      -n[1] + p[1]
    ];
    return Ni({
      key: "".concat(r, "-default-guideline-").concat(d),
      classNames: g ? [ft("bold"), y] : [ft("normal"), y],
      direction: r,
      posValue: S,
      sizeValue: h,
      zoom: s
    }, i);
  });
}
function Be(t, r, e, n, a, i, o, s) {
  var u, f = t.props, l = f.snapDigit, c = l === void 0 ? 0 : l, v = f.isDisplaySnapDigit, d = v === void 0 ? !0 : v, p = f.snapDistFormat, h = p === void 0 ? function(E, _) {
    return E;
  } : p, g = f.zoom, y = r === "horizontal" ? "X" : "Y", S = r === "vertical" ? "height" : "width", b = Math.abs(a), x = d ? parseFloat(b.toFixed(c)) : 0;
  return s.createElement(
    "div",
    { key: "".concat(r, "-").concat(e, "-guideline-").concat(n), className: ft("guideline-group", r), style: (u = {
      left: "".concat(i[0], "px"),
      top: "".concat(i[1], "px")
    }, u[S] = "".concat(b, "px"), u) },
    Ni({
      direction: r,
      classNames: [ft(e), o],
      size: "100%",
      posValue: [0, 0],
      sizeValue: b,
      zoom: g
    }, s),
    s.createElement("div", { className: ft("size-value", "gap"), style: {
      transform: "translate".concat(y, "(-50%) scale(").concat(g, ")")
    } }, x > 0 ? h(x, r) : "")
  );
}
function td(t, r, e, n) {
  var a = t === "vertical" ? 0 : 1, i = t === "vertical" ? 1 : 0, o = a ? Xr : qr, s = e[o.start], u = e[o.end];
  return $u(r, function(f) {
    return f.pos[a];
  }).map(function(f) {
    var l = [], c = [], v = [];
    return f.forEach(function(d) {
      var p, h, g = d.element, y = d.elementRect.rect;
      if (y[o.end] < s)
        l.push(d);
      else if (u < y[o.start])
        c.push(d);
      else if (y[o.start] <= s && u <= y[o.end] && n) {
        var S = d.pos, b = { element: g, rect: P(P({}, y), (p = {}, p[o.end] = y[o.start], p)) }, x = { element: g, rect: P(P({}, y), (h = {}, h[o.start] = y[o.end], h)) }, E = [0, 0], _ = [0, 0];
        E[a] = S[a], E[i] = S[i], _[a] = S[a], _[i] = S[i] + d.size, l.push({
          type: t,
          pos: E,
          size: 0,
          elementRect: b,
          direction: "",
          elementDirection: "end"
        }), c.push({
          type: t,
          pos: _,
          size: 0,
          elementRect: x,
          direction: "",
          elementDirection: "start"
        });
      }
    }), l.sort(function(d, p) {
      return p.pos[i] - d.pos[i];
    }), c.sort(function(d, p) {
      return d.pos[i] - p.pos[i];
    }), {
      total: f,
      start: l,
      end: c,
      inner: v
    };
  });
}
function rd(t, r, e, n, a) {
  var i = t.props.isDisplayInnerSnapDigit, o = [];
  return ["vertical", "horizontal"].forEach(function(s) {
    var u = r.filter(function(g) {
      return g.type === s;
    }), f = s === "vertical" ? 1 : 0, l = f ? 0 : 1, c = td(s, u, n, i), v = f ? qr : Xr, d = f ? Xr : qr, p = n[v.start], h = n[v.end];
    c.forEach(function(g) {
      var y = g.total, S = g.start, b = g.end, x = g.inner, E = e[l] + y[0].pos[l] - n[d.start], _ = n;
      S.forEach(function(C) {
        var w = C.elementRect.rect, R = _[v.start] - w[v.end];
        if (R > 0) {
          var M = [0, 0];
          M[f] = e[f] + _[v.start] - p - R, M[l] = E, o.push(Be(t, s, "dashed", o.length, R, M, C.className, a));
        }
        _ = w;
      }), _ = n, b.forEach(function(C) {
        var w = C.elementRect.rect, R = w[v.start] - _[v.end];
        if (R > 0) {
          var M = [0, 0];
          M[f] = e[f] + _[v.end] - p, M[l] = E, o.push(Be(t, s, "dashed", o.length, R, M, C.className, a));
        }
        _ = w;
      }), x.forEach(function(C) {
        var w = C.elementRect.rect, R = p - w[v.start], M = w[v.end] - h, G = [0, 0], z = [0, 0];
        G[f] = e[f] - R, G[l] = E, z[f] = e[f] + h - p, z[l] = E, o.push(Be(t, s, "dashed", o.length, R, G, C.className, a)), o.push(Be(t, s, "dashed", o.length, M, z, C.className, a));
      });
    });
  }), o;
}
function ed(t, r, e, n, a) {
  var i = [];
  return ["horizontal", "vertical"].forEach(function(o) {
    var s = r.filter(function(g) {
      return g.type === o;
    }).slice(0, 1), u = o === "vertical" ? 0 : 1, f = u ? 0 : 1, l = u ? qr : Xr, c = u ? Xr : qr, v = n[l.start], d = n[l.end], p = n[c.start], h = n[c.end];
    s.forEach(function(g) {
      var y = g.gap, S = g.gapRects, b = Math.max.apply(Math, Z([p], I(S.map(function(_) {
        var C = _.rect;
        return C[c.start];
      })), !1)), x = Math.min.apply(Math, Z([h], I(S.map(function(_) {
        var C = _.rect;
        return C[c.end];
      })), !1)), E = (b + x) / 2;
      b === x || E === (p + h) / 2 || S.forEach(function(_) {
        var C = _.rect, w = _.className, R = [e[0], e[1]];
        if (C[l.end] < v)
          R[u] += C[l.end] - v;
        else if (d < C[l.start])
          R[u] += C[l.start] - v - y;
        else
          return;
        R[f] += E - p, i.push(Be(t, u ? "vertical" : "horizontal", "gap", i.length, y, R, w, a));
      });
    });
  }), i;
}
function ti(t) {
  var r, e, n = t.state, a = n.containerClientRect, i = n.hasFixed, o = a.overflow, s = a.scrollHeight, u = a.scrollWidth, f = a.clientHeight, l = a.clientWidth, c = a.clientLeft, v = a.clientTop, d = t.props, p = d.snapGap, h = p === void 0 ? !0 : p, g = d.verticalGuidelines, y = d.horizontalGuidelines, S = d.snapThreshold, b = S === void 0 ? 5 : S, x = d.maxSnapElementGuidelineDistance, E = x === void 0 ? 1 / 0 : x, _ = d.isDisplayGridGuidelines, C = br(_r(t.state)), w = C.top, R = C.left, M = C.bottom, G = C.right, z = { top: w, left: R, bottom: M, right: G, center: (R + G) / 2, middle: (w + M) / 2 }, A = od(t), N = Z([], I(A), !1), B = ((e = (r = n.snapThresholdInfo) === null || r === void 0 ? void 0 : r.multiples) !== null && e !== void 0 ? e : [1, 1]).map(function($) {
    return $ * b;
  });
  h && N.push.apply(N, Z([], I(nd(t, z, B)), !1));
  var X = P({}, n.snapOffset || {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  });
  if (N.push.apply(N, Z([], I(id(t, o ? u : l, o ? s : f, c, v, X, _)), !1)), i) {
    var U = a.left, j = a.top;
    X.left += U, X.top += j, X.right += U, X.bottom += j;
  }
  return N.push.apply(N, Z([], I(Pu(y || !1, g || !1, o ? u : l, o ? s : f, c, v, X)), !1)), N = N.filter(function($) {
    var D = $.element, T = $.elementRect, F = $.type;
    if (!D || !T)
      return !0;
    var W = T.rect;
    return Ou(z, W, F, E);
  }), N;
}
function nd(t, r, e) {
  var n = t.props, a = n.maxSnapElementGuidelineDistance, i = a === void 0 ? 1 / 0 : a, o = n.maxSnapElementGapDistance, s = o === void 0 ? 1 / 0 : o, u = t.state.elementRects, f = [];
  return [
    ["vertical", Xr, qr],
    ["horizontal", qr, Xr]
  ].forEach(function(l) {
    var c = I(l, 3), v = c[0], d = c[1], p = c[2], h = r[d.start], g = r[d.end], y = r[d.center], S = r[p.start], b = r[p.end], x = {
      left: e[0],
      top: e[1]
    };
    function E(w) {
      var R = w.rect, M = x[d.start];
      return R[d.end] < h + M ? h - R[d.end] : g - M < R[d.start] ? R[d.start] - g : -1;
    }
    var _ = u.filter(function(w) {
      var R = w.rect;
      return R[p.start] > b || R[p.end] < S ? !1 : E(w) > 0;
    }).sort(function(w, R) {
      return E(w) - E(R);
    }), C = [];
    _.forEach(function(w) {
      _.forEach(function(R) {
        if (w !== R) {
          var M = w.rect, G = R.rect, z = M[p.start], A = M[p.end], N = G[p.start], B = G[p.end];
          z > B || N > A || C.push([w, R]);
        }
      });
    }), C.forEach(function(w) {
      var R = I(w, 2), M = R[0], G = R[1], z = M.rect, A = G.rect, N = z[d.start], B = z[d.end], X = A[d.start], U = A[d.end], j = x[d.start], $ = 0, D = 0, T = !1, F = !1, W = !1;
      if (B <= h && g <= X) {
        if (F = !0, $ = (X - B - (g - h)) / 2, D = B + $ + (g - h) / 2, V(D - y) > j)
          return;
      } else if (B < X && U < h + j) {
        if (T = !0, $ = X - B, D = U + $, V(D - h) > j)
          return;
      } else if (B < X && g - j < N) {
        if (W = !0, $ = X - B, D = N - $, V(D - g) > j)
          return;
      } else
        return;
      $ && Ou(r, A, v, i) && ($ > s || f.push({
        type: v,
        pos: v === "vertical" ? [D, 0] : [0, D],
        element: G.element,
        size: 0,
        className: G.className,
        isStart: T,
        isCenter: F,
        isEnd: W,
        gap: $,
        hide: !0,
        gapRects: [M, G],
        direction: "",
        elementDirection: ""
      }));
    });
  }), f;
}
function ad(t, r, e, n) {
  var a, i, o = t.props, s = t.state, u = o.snapGridAll, f = o.snapGridWidth, l = f === void 0 ? 0 : f, c = o.snapGridHeight, v = c === void 0 ? 0 : c, d = s.snapRenderInfo, p = d && (((a = d.direction) === null || a === void 0 ? void 0 : a[0]) || ((i = d.direction) === null || i === void 0 ? void 0 : i[1])), h = t.moveables;
  if (u && h && p && (l || v)) {
    if (s.snapThresholdInfo)
      return;
    s.snapThresholdInfo = {
      multiples: [1, 1],
      offset: [0, 0]
    };
    var g = t.getRect(), y = g.children, S = d.direction;
    if (y) {
      var b = S.map(function(E, _) {
        var C = _ === 0 ? {
          snapSize: l,
          posName: "left",
          sizeName: "width",
          clientOffset: n.left - r
        } : {
          snapSize: v,
          posName: "top",
          sizeName: "height",
          clientOffset: n.top - e
        }, w = C.snapSize, R = C.posName, M = C.sizeName, G = C.clientOffset;
        if (!w)
          return {
            dir: E,
            multiple: 1,
            snapSize: w,
            snapOffset: 0
          };
        var z = g[M], A = g[R], N = Zl(y.map(function(T) {
          return [
            T[R] - A,
            T[M],
            z - T[M] - T[R] + A
          ];
        })).filter(function(T) {
          return T;
        }).sort(function(T, F) {
          return T - F;
        }), B = N[0], X = N.map(function(T) {
          return yt(T / B, 0.1) * w;
        }), U = 1, j = yt(z / B, 0.1);
        for (U = 1; U <= 10 && !X.every(function(T) {
          return T * U % 1 === 0;
        }); ++U)
          ;
        var $ = (-E + 1) / 2, D = jn(A - G, A - G + z, $, 1 - $);
        return {
          multiple: j * U,
          dir: E,
          snapSize: w,
          snapOffset: Math.round(D / w)
        };
      }), x = b.map(function(E) {
        return E.multiple || 1;
      });
      s.snapThresholdInfo.multiples = x, s.snapThresholdInfo.offset = b.map(function(E) {
        return E.snapOffset;
      }), b.forEach(function(E, _) {
        E.snapSize;
      });
    }
  } else
    s.snapThresholdInfo = null;
}
function id(t, r, e, n, a, i, o) {
  n === void 0 && (n = 0), a === void 0 && (a = 0);
  var s = t.props, u = t.state, f = s.snapGridWidth, l = f === void 0 ? 0 : f, c = s.snapGridHeight, v = c === void 0 ? 0 : c, d = [], p = i.left, h = i.top, g = [0, 0];
  ad(t, n, a, i);
  var y = u.snapThresholdInfo, S = l, b = v;
  if (y && (l *= y.multiples[0] || 1, v *= y.multiples[1] || 1, g = y.offset), v) {
    for (var x = function(_) {
      d.push({
        type: "horizontal",
        pos: [
          p,
          yt(g[1] * b + _ - a + h, 0.1)
        ],
        className: ft("grid-guideline"),
        size: r,
        hide: !o,
        direction: "",
        grid: !0
      });
    }, E = 0; E <= e * 2; E += v)
      x(E);
    for (var E = -v; E >= -e; E -= v)
      x(E);
  }
  if (l) {
    for (var x = function(C) {
      d.push({
        type: "vertical",
        pos: [
          yt(g[0] * S + C - n + p, 0.1),
          h
        ],
        className: ft("grid-guideline"),
        size: e,
        hide: !o,
        direction: "",
        grid: !0
      });
    }, E = 0; E <= r * 2; E += l)
      x(E);
    for (var E = -l; E >= -r; E -= l)
      x(E);
  }
  return d;
}
function Ou(t, r, e, n) {
  return e === "horizontal" ? V(t.right - r.left) <= n || V(t.left - r.right) <= n || t.left <= r.right && r.left <= t.right : e === "vertical" ? V(t.bottom - r.top) <= n || V(t.top - r.bottom) <= n || t.top <= r.bottom && r.top <= t.bottom : !0;
}
function od(t) {
  var r = t.state, e = t.props.elementGuidelines, n = e === void 0 ? [] : e;
  if (!n.length)
    return r.elementRects = [], [];
  var a = (r.elementRects || []).filter(function(v) {
    return !v.refresh;
  }), i = n.map(function(v) {
    return Dr(v) && "element" in v ? P(P({}, v), { element: Ir(v.element, !0) }) : {
      element: Ir(v, !0)
    };
  }).filter(function(v) {
    return v.element;
  }), o = mc(a.map(function(v) {
    return v.element;
  }), i.map(function(v) {
    return v.element;
  })), s = o.maintained, u = o.added, f = [];
  s.forEach(function(v) {
    var d = I(v, 2), p = d[0], h = d[1];
    f[h] = a[p];
  }), sd(t, u.map(function(v) {
    return i[v];
  })).map(function(v, d) {
    f[u[d]] = v;
  }), r.elementRects = f;
  var l = ki(t.props.elementSnapDirections), c = [];
  return f.forEach(function(v) {
    var d = v.element, p = v.top, h = p === void 0 ? l.top : p, g = v.left, y = g === void 0 ? l.left : g, S = v.right, b = S === void 0 ? l.right : S, x = v.bottom, E = x === void 0 ? l.bottom : x, _ = v.center, C = _ === void 0 ? l.center : _, w = v.middle, R = w === void 0 ? l.middle : w, M = v.className, G = v.rect, z = zi({
      top: h,
      right: b,
      left: y,
      bottom: E,
      center: C,
      middle: R
    }, G), A = z.horizontal, N = z.vertical, B = z.horizontalNames, X = z.verticalNames, U = G.top, j = G.left, $ = G.right - j, D = G.bottom - U, T = [$, D];
    N.forEach(function(F, W) {
      c.push({
        type: "vertical",
        element: d,
        pos: [
          yt(F, 0.1),
          U
        ],
        size: D,
        sizes: T,
        className: M,
        elementRect: v,
        elementDirection: Io[X[W]] || X[W],
        direction: ""
      });
    }), A.forEach(function(F, W) {
      c.push({
        type: "horizontal",
        element: d,
        pos: [
          j,
          yt(F, 0.1)
        ],
        size: $,
        sizes: T,
        className: M,
        elementRect: v,
        elementDirection: Io[B[W]] || B[W],
        direction: ""
      });
    });
  }), c;
}
function Ho(t, r) {
  return t ? t.map(function(e) {
    var n = Dr(e) ? e : { pos: e }, a = n.pos;
    return Ke(a) ? n : P(P({}, n), { pos: Bt(a, r) });
  }) : [];
}
function Pu(t, r, e, n, a, i, o) {
  a === void 0 && (a = 0), i === void 0 && (i = 0), o === void 0 && (o = { left: 0, top: 0, right: 0, bottom: 0 });
  var s = [], u = o.left, f = o.top, l = o.bottom, c = o.right, v = e + c - u, d = n + l - f;
  return Ho(t, d).forEach(function(p) {
    s.push({
      type: "horizontal",
      pos: [
        u,
        yt(p.pos - i + f, 0.1)
      ],
      size: v,
      className: p.className,
      direction: ""
    });
  }), Ho(r, v).forEach(function(p) {
    s.push({
      type: "vertical",
      pos: [
        yt(p.pos - a + u, 0.1),
        f
      ],
      size: d,
      className: p.className,
      direction: ""
    });
  }), s;
}
function sd(t, r) {
  if (!r.length)
    return [];
  var e = t.props.groupable, n = t.state, a = n.containerClientRect, i = n.rootMatrix, o = n.is3d, s = n.offsetDelta, u = o ? 4 : 3, f = I(Pv(i, a, u), 2), l = f[0], c = f[1], v = e ? 0 : s[0], d = e ? 0 : s[1];
  return r.map(function(p) {
    var h = p.element.getBoundingClientRect(), g = h.left - l - v, y = h.top - c - d, S = y + h.height, b = g + h.width, x = I(we(i, [g, y], u), 2), E = x[0], _ = x[1], C = I(we(i, [b, S], u), 2), w = C[0], R = C[1];
    return P(P({}, p), { rect: {
      left: E,
      right: w,
      top: _,
      bottom: R,
      center: (E + w) / 2,
      middle: (_ + R) / 2
    } });
  });
}
function An(t) {
  var r = t.state, e = r.container, n = t.props.snapContainer || e;
  if (r.snapContainer === n && r.guidelines && r.guidelines.length)
    return !1;
  var a = r.containerClientRect, i = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  };
  if (e !== n) {
    var o = Ir(n, !0);
    if (o) {
      var s = He(o), u = Uo(r, [
        s.left - a.left,
        s.top - a.top
      ]), f = Uo(r, [
        s.right - a.right,
        s.bottom - a.bottom
      ]);
      i.left = yt(u[0], 1e-5), i.top = yt(u[1], 1e-5), i.right = yt(f[0], 1e-5), i.bottom = yt(f[1], 1e-5);
    }
  }
  return r.snapContainer = n, r.snapOffset = i, r.guidelines = ti(t), r.enableSnap = !0, !0;
}
function Au(t, r, e, n, a, i) {
  var o = ue(t, r, e, i ? 4 : 3), s = Ut(o, n);
  return Li(o, ct(a, s));
}
function $o(t) {
  return t ? t / V(t) : 0;
}
function ud(t, r, e, n, a, i) {
  var o = i.fixedDirection, s = zv(e, o, n), u = Bi(t, r, e, n), f = Z(Z([], I(qv(t, r, s, n, a, i)), !1), I(Du(t, u, i)), !1), l = Kn(f, 0), c = Kn(f, 1);
  return {
    width: {
      isBound: l.isBound,
      offset: l.offset[0]
    },
    height: {
      isBound: c.isBound,
      offset: c.offset[1]
    }
  };
}
function fd(t, r, e, n, a, i, o, s, u) {
  var f = Ut(r, o), l = va(t, s, {
    vertical: [f[0]],
    horizontal: [f[1]]
  }), c = l.horizontal.offset, v = l.vertical.offset;
  if (yt(v, qa) || yt(c, qa)) {
    var d = I(zr({
      datas: u,
      distX: -v,
      distY: -c
    }), 2), p = d[0], h = d[1], g = Math.min(a || 1 / 0, e + o[0] * p), y = Math.min(i || 1 / 0, n + o[1] * h);
    return [g - e, y - n];
  }
  return [0, 0];
}
function Iu(t, r, e, n, a, i, o, s) {
  for (var u = _r(t.state), f = t.props.keepRatio, l = 0, c = 0, v = 0; v < 2; ++v) {
    var d = r(l, c), p = ud(t, d, a, f, o, s), h = p.width, g = p.height, y = h.isBound, S = g.isBound, b = h.offset, x = g.offset;
    if (v === 1 && (y || (b = 0), S || (x = 0)), v === 0 && o && !y && !S)
      return [0, 0];
    if (f) {
      var E = V(b) * (e ? 1 / e : 1), _ = V(x) * (n ? 1 / n : 1), C = y && S ? E < _ : S || !y && E < _;
      C ? b = e * x / n : x = n * b / e;
    }
    l += b, c += x;
  }
  if (!f && a[0] && a[1]) {
    var w = Uv(t, u, a, i, s), R = w.maxWidth, M = w.maxHeight, G = I(fd(t, r(l, c).map(function(N) {
      return N.map(function(B) {
        return yt(B, qa);
      });
    }), e + l, n + c, R, M, a, o, s), 2), b = G[0], x = G[1];
    l += b, c += x;
  }
  return [l, c];
}
function Ye(t) {
  return t < 0 && (t = t % 360 + 360), t %= 360, t;
}
function ld(t, r) {
  r = Ye(r);
  var e = Math.floor(t / 360), n = e * 360 + 360 - r, a = e * 360 + r;
  return V(t - n) < V(t - a) ? n : a;
}
function Ra(t, r) {
  t = Ye(t), r = Ye(r);
  var e = Ye(t - r);
  return Math.min(e, 360 - e);
}
function cd(t, r, e, n) {
  var a, i = t.props, o = (a = i[yu]) !== null && a !== void 0 ? a : 5, s = i[Eu];
  if (Pe(t, "rotatable")) {
    var u = r.pos1, f = r.pos2, l = r.pos3, c = r.pos4, v = r.origin, d = e * Math.PI / 180, p = [u, f, l, c].map(function(x) {
      return ct(x, v);
    }), h = p.map(function(x) {
      return an(x, d);
    }), g = Z(Z([], I(Rv(t, p, h, v, e)), !1), I(Yv(t, p, h, v, e)), !1);
    g.sort(function(x, E) {
      return V(x - e) - V(E - e);
    });
    var y = g.length > 0;
    if (y)
      return {
        isSnap: y,
        dist: y ? g[0] : e
      };
  }
  if (s?.length && o) {
    var S = s.slice().sort(function(x, E) {
      return Ra(x, n) - Ra(E, n);
    }), b = S[0];
    if (Ra(b, n) <= o)
      return {
        isSnap: !0,
        dist: e + ld(n, b) - n
      };
  }
  return {
    isSnap: !1,
    dist: e
  };
}
function vd(t, r, e, n, a, i, o) {
  if (!Pe(t, "resizable"))
    return [0, 0];
  var s = o.fixedDirection, u = o.nextAllMatrix, f = t.state, l = f.allMatrix, c = f.is3d;
  return Iu(t, function(v, d) {
    return Au(u || l, r + v, e + d, s, a, c);
  }, r, e, n, a, i, o);
}
function dd(t, r, e, n, a) {
  if (!Pe(t, "scalable"))
    return [0, 0];
  var i = a.startOffsetWidth, o = a.startOffsetHeight, s = a.fixedPosition, u = a.fixedDirection, f = a.is3d, l = Iu(t, function(c, v) {
    return Au(vv(a, Tt(r, [c / i, v / o])), i, o, u, s, f);
  }, i, o, e, s, n, a);
  return [l[0] / i, l[1] / o];
}
function pd(t, r) {
  r.absolutePoses = _r(t.state);
}
function jo(t) {
  var r = [];
  return t.forEach(function(e) {
    e.guidelineInfos.forEach(function(n) {
      var a = n.guideline;
      mr(r, function(i) {
        return i.guideline === a;
      }) || (a.direction = "", r.push({ guideline: a, posInfo: e }));
    });
  }), r.map(function(e) {
    var n = e.guideline, a = e.posInfo;
    return P(P({}, n), { direction: a.direction });
  });
}
function Xo(t, r, e, n, a, i) {
  var o = Ii(la(t, i), r, e), s = o.vertical, u = o.horizontal, f = he();
  s.forEach(function(p) {
    p.isBound && (p.direction === "start" && (f.left = !0), p.direction === "end" && (f.right = !0), n.push({
      type: "bounds",
      pos: p.pos
    }));
  }), u.forEach(function(p) {
    p.isBound && (p.direction === "start" && (f.top = !0), p.direction === "end" && (f.bottom = !0), a.push({
      type: "bounds",
      pos: p.pos
    }));
  });
  var l = Wv(t), c = l.boundMap, v = l.vertical, d = l.horizontal;
  return v.forEach(function(p) {
    Fr(n, function(h) {
      var g = h.type, y = h.pos;
      return g === "bounds" && y === p;
    }) >= 0 || n.push({
      type: "bounds",
      pos: p
    });
  }), d.forEach(function(p) {
    Fr(a, function(h) {
      var g = h.type, y = h.pos;
      return g === "bounds" && y === p;
    }) >= 0 || a.push({
      type: "bounds",
      pos: p
    });
  }), {
    boundMap: f,
    innerBoundMap: c
  };
}
var hd = Hi("", ["resizable", "scalable"]), gd = {
  name: "snappable",
  dragRelation: "strong",
  props: [
    "snappable",
    "snapContainer",
    "snapDirections",
    "elementSnapDirections",
    "snapGap",
    "snapGridWidth",
    "snapGridHeight",
    "isDisplaySnapDigit",
    "isDisplayInnerSnapDigit",
    "isDisplayGridGuidelines",
    "snapDigit",
    "snapThreshold",
    "snapRenderThreshold",
    "snapGridAll",
    yu,
    Eu,
    Su,
    bu,
    "horizontalGuidelines",
    "verticalGuidelines",
    "elementGuidelines",
    "bounds",
    "innerBounds",
    "snapDistFormat",
    "maxSnapElementGuidelineDistance",
    "maxSnapElementGapDistance"
  ],
  events: ["snap", "bound"],
  css: [
    `:host {
--bounds-color: #d66;
}
.guideline {
pointer-events: none;
z-index: 2;
}
.guideline.bounds {
background: #d66;
background: var(--bounds-color);
}
.guideline-group {
position: absolute;
top: 0;
left: 0;
}
.guideline-group .size-value {
position: absolute;
color: #f55;
font-size: 12px;
font-size: calc(12px * var(--zoom));
font-weight: bold;
}
.guideline-group.horizontal .size-value {
transform-origin: 50% 100%;
transform: translateX(-50%);
left: 50%;
bottom: 5px;
bottom: calc(2px + 3px * var(--zoom));
}
.guideline-group.vertical .size-value {
transform-origin: 0% 50%;
top: 50%;
transform: translateY(-50%);
left: 5px;
left: calc(2px + 3px * var(--zoom));
}
.guideline.gap {
background: #f55;
}
.size-value.gap {
color: #f55;
}
`
  ],
  render: function(t, r) {
    var e = t.state, n = e.top, a = e.left, i = e.pos1, o = e.pos2, s = e.pos3, u = e.pos4, f = e.snapRenderInfo, l = t.props.snapRenderThreshold, c = l === void 0 ? 1 : l;
    if (!f || !f.render || !Pe(t, ""))
      return me(t, "boundMap", he(), function(Y) {
        return JSON.stringify(Y);
      }), me(t, "innerBoundMap", he(), function(Y) {
        return JSON.stringify(Y);
      }), [];
    e.guidelines = ti(t);
    var v = Math.min(i[0], o[0], s[0], u[0]), d = Math.min(i[1], o[1], s[1], u[1]), p = f.externalPoses || [], h = _r(t.state), g = [], y = [], S = [], b = [], x = [], E = br(h), _ = E.width, C = E.height, w = E.top, R = E.left, M = E.bottom, G = E.right, z = { left: R, right: G, top: w, bottom: M, center: (R + G) / 2, middle: (w + M) / 2 }, A = p.length > 0, N = A ? br(p) : {};
    if (!f.request) {
      if (f.direction && x.push(kv(t, h, f.direction, c, c)), f.snap) {
        var B = br(h);
        f.center && (B.middle = (B.top + B.bottom) / 2, B.center = (B.left + B.right) / 2), x.push(ko(t, B, c, c));
      }
      A && (f.center && (N.middle = (N.top + N.bottom) / 2, N.center = (N.left + N.right) / 2), x.push(ko(t, N, c, c))), x.forEach(function(Y) {
        var K = Y.vertical.posInfos, L = Y.horizontal.posInfos;
        g.push.apply(g, Z([], I(K.filter(function(et) {
          var rt = et.guidelineInfos;
          return rt.some(function(pt) {
            var Et = pt.guideline;
            return !Et.hide;
          });
        }).map(function(et) {
          return {
            type: "snap",
            pos: et.pos
          };
        })), !1)), y.push.apply(y, Z([], I(L.filter(function(et) {
          var rt = et.guidelineInfos;
          return rt.some(function(pt) {
            var Et = pt.guideline;
            return !Et.hide;
          });
        }).map(function(et) {
          return {
            type: "snap",
            pos: et.pos
          };
        })), !1)), S.push.apply(S, Z([], I(jo(K)), !1)), b.push.apply(b, Z([], I(jo(L)), !1));
      });
    }
    var X = Xo(t, [R, G], [w, M], g, y), U = X.boundMap, j = X.innerBoundMap;
    A && Xo(t, [N.left, N.right], [N.top, N.bottom], g, y, f.externalBounds);
    var $ = Z(Z([], I(S), !1), I(b), !1), D = $.filter(function(Y) {
      return Y.element && !Y.gapRects;
    }), T = $.filter(function(Y) {
      return Y.gapRects;
    }).sort(function(Y, K) {
      return Y.gap - K.gap;
    });
    at(t, "onSnap", {
      guidelines: $.filter(function(Y) {
        var K = Y.element;
        return !K;
      }),
      elements: D,
      gaps: T
    }, !0);
    var F = me(t, "boundMap", U, function(Y) {
      return JSON.stringify(Y);
    }, he()), W = me(t, "innerBoundMap", j, function(Y) {
      return JSON.stringify(Y);
    }, he());
    return (U === F || j === W) && at(t, "onBound", {
      bounds: U,
      innerBounds: j
    }, !0), Z(Z(Z(Z(Z(Z([], I(rd(t, D, [v, d], z, r)), !1), I(ed(t, T, [v, d], z, r)), !1), I(Wo(t, "horizontal", b, [a, n], z, r)), !1), I(Wo(t, "vertical", S, [a, n], z, r)), !1), I(Yo(t, "horizontal", y, v, n, _, 0, r)), !1), I(Yo(t, "vertical", g, d, a, C, 1, r)), !1);
  },
  dragStart: function(t, r) {
    t.state.snapRenderInfo = {
      request: r.isRequest,
      snap: !0,
      center: !0
    }, An(t);
  },
  drag: function(t) {
    var r = t.state;
    An(t) || (r.guidelines = ti(t)), r.snapRenderInfo && (r.snapRenderInfo.render = !0);
  },
  pinchStart: function(t) {
    this.unset(t);
  },
  dragEnd: function(t) {
    this.unset(t);
  },
  dragControlCondition: function(t, r) {
    if (hd(t, r) || Qa(t, r))
      return !0;
    if (!r.isRequest && r.inputEvent)
      return Vt(r.inputEvent.target, ft("snap-control"));
  },
  dragControlStart: function(t) {
    t.state.snapRenderInfo = null, An(t);
  },
  dragControl: function(t) {
    this.drag(t);
  },
  dragControlEnd: function(t) {
    this.unset(t);
  },
  dragGroupStart: function(t, r) {
    this.dragStart(t, r);
  },
  dragGroup: function(t) {
    this.drag(t);
  },
  dragGroupEnd: function(t) {
    this.unset(t);
  },
  dragGroupControlStart: function(t) {
    t.state.snapRenderInfo = null, An(t);
  },
  dragGroupControl: function(t) {
    this.drag(t);
  },
  dragGroupControlEnd: function(t) {
    this.unset(t);
  },
  unset: function(t) {
    var r = t.state;
    r.enableSnap = !1, r.guidelines = [], r.snapRenderInfo = null, r.elementRects = [];
  }
};
function md(t, r) {
  return [
    t[0] * r[0],
    t[1] * r[1]
  ];
}
function ft() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  return kl.apply(void 0, Z([Mi], I(t), !1));
}
function ku(t) {
  t();
}
function yd(t) {
  return !t || t === "none" ? [1, 0, 0, 1, 0, 0] : Dr(t) ? t : Je(t);
}
function We(t, r, e) {
  return Xn(r, ae(e, r), t, ae(e.map(function(n) {
    return -n;
  }), r));
}
function Ed(t, r, e) {
  if (r === "%") {
    var n = Fi(t.ownerSVGElement);
    return n[e ? "width" : "height"] / 100;
  }
  return 1;
}
function Sd(t) {
  var r = bd(Yi(t, ":before"));
  return r.map(function(e, n) {
    var a = nn(e), i = a.value, o = a.unit;
    return i * Ed(t, o, n === 0);
  });
}
function Jn(t) {
  return t ? t.split(" ") : ["0", "0"];
}
function bd(t) {
  return Jn(t.transformOrigin);
}
function zu(t) {
  var r = vr(t), e = r("transform");
  if (e && e !== "none")
    return e;
  if ("transform" in t) {
    var n = t.transform, a = n.baseVal;
    if (!a)
      return "";
    var i = a.length;
    if (!i)
      return "";
    for (var o = [], s = function(f) {
      var l = a[f].matrix;
      o.push("matrix(".concat(["a", "b", "c", "d", "e", "f"].map(function(c) {
        return l[c];
      }).join(", "), ")"));
    }, u = 0; u < i; ++u)
      s(u);
    return o.join(" ");
  }
  return "";
}
function tn(t, r, e, n, a) {
  var i, o, s = bi(t) || Vr(t), u = !1, f, l;
  if (!t || e)
    f = t;
  else {
    var c = (i = t?.assignedSlot) === null || i === void 0 ? void 0 : i.parentElement, v = t.parentElement;
    c ? (u = !0, l = v, f = c) : f = v;
  }
  for (var d = !1, p = t === r || f === r, h = "relative", g = 1, y = parseFloat(a?.("zoom")) || 1, S = a?.("position"); f && f !== s; ) {
    r === f && (p = !0);
    var b = vr(f), x = f.tagName.toLowerCase(), E = zu(f), _ = b("willChange"), C = parseFloat(b("zoom")) || 1;
    if (h = b("position"), n && C !== 1) {
      g = C;
      break;
    }
    if (
      // offsetParent is the parentElement if the target's zoom is not 1 and not absolute.
      !e && n && y !== 1 && S && S !== "absolute" || x === "svg" || x === "foreignobject" || h !== "static" || E && E !== "none" || _ === "transform"
    )
      break;
    var w = (o = t?.assignedSlot) === null || o === void 0 ? void 0 : o.parentNode, R = f.parentNode;
    w && (u = !0, l = R);
    var M = R;
    if (M && M.nodeType === 11) {
      f = M.host, d = !0, h = vr(f)("position");
      break;
    }
    f = M, h = "relative";
  }
  return {
    offsetZoom: g,
    hasSlot: u,
    parentSlotElement: l,
    isCustomElement: d,
    isStatic: h === "static",
    isEnd: p || !f || f === s,
    offsetParent: f || s
  };
}
function xd(t, r) {
  var e, n = t.tagName.toLowerCase(), a = t.offsetLeft, i = t.offsetTop, o = vr(t), s = gi(a), u = !s, f, l;
  return !u && (n !== "svg" || t.ownerSVGElement) ? (f = ru ? Sd(t) : Jn(o("transformOrigin")).map(function(c) {
    return parseFloat(c);
  }), l = f.slice(), u = !0, n === "svg" ? (a = 0, i = 0) : (e = I(wd(t, f, t === r && r.tagName.toLowerCase() === "g"), 4), a = e[0], i = e[1], f[0] = e[2], f[1] = e[3])) : (f = Jn(o("transformOrigin")).map(function(c) {
    return parseFloat(c);
  }), l = f.slice()), {
    tagName: n,
    isSVG: s,
    hasOffset: u,
    offset: [a || 0, i || 0],
    origin: f,
    targetOrigin: l
  };
}
function Gu(t, r) {
  var e = vr(t), n = vr(Vr(t)), a = n("position");
  if (!r && (!a || a === "static"))
    return [0, 0];
  var i = parseInt(n("marginLeft"), 10), o = parseInt(n("marginTop"), 10);
  return e("position") === "absolute" && ((e("top") !== "auto" || e("bottom") !== "auto") && (o = 0), (e("left") !== "auto" || e("right") !== "auto") && (i = 0)), [i, o];
}
function ri(t) {
  t.forEach(function(r) {
    var e = r.matrix;
    e && (r.matrix = Rr(e, 3, 4));
  });
}
function _d(t) {
  for (var r = t.parentElement, e = !1, n = Vr(t); r; ) {
    var a = Yi(r).transform;
    if (a && a !== "none") {
      e = !0;
      break;
    }
    if (r === n)
      break;
    r = r.parentElement;
  }
  return {
    fixedContainer: r || n,
    hasTransform: e
  };
}
function da(t, r) {
  return r === void 0 && (r = t.length > 9), "".concat(r ? "matrix3d" : "matrix", "(").concat(qs(t, !r).join(","), ")");
}
function Fi(t) {
  var r = t.clientWidth, e = t.clientHeight;
  if (!t)
    return { x: 0, y: 0, width: 0, height: 0, clientWidth: r, clientHeight: e };
  var n = t.viewBox, a = n && n.baseVal || { x: 0, y: 0, width: 0, height: 0 };
  return {
    x: a.x,
    y: a.y,
    width: a.width || r,
    height: a.height || e,
    clientWidth: r,
    clientHeight: e
  };
}
function Cd(t, r) {
  var e, n = Fi(t), a = n.width, i = n.height, o = n.clientWidth, s = n.clientHeight, u = o / a, f = s / i, l = t.preserveAspectRatio.baseVal, c = l.align, v = l.meetOrSlice, d = [0, 0], p = [u, f], h = [0, 0];
  if (c !== 1) {
    var g = (c - 2) % 3, y = Math.floor((c - 2) / 3);
    d[0] = a * g / 2, d[1] = i * y / 2;
    var S = v === 2 ? Math.max(f, u) : Math.min(u, f);
    p[0] = S, p[1] = S, h[0] = (o - a) / 2 * g, h[1] = (s - i) / 2 * y;
  }
  var b = _i(p, r);
  return e = I(h, 2), b[r * (r - 1)] = e[0], b[r * (r - 1) + 1] = e[1], We(b, r, d);
}
function wd(t, r, e) {
  var n = t.tagName.toLowerCase();
  if (!t.getBBox || !e && n === "g")
    return [0, 0, 0, 0];
  var a = vr(t), i = a("transform-box") === "fill-box", o = t.getBBox(), s = Fi(t.ownerSVGElement), u = o.x, f = o.y;
  n === "foreignobject" && !u && !f && (u = parseFloat(t.getAttribute("x")) || 0, f = parseFloat(t.getAttribute("y")) || 0);
  var l = u - s.x, c = f - s.y, v = i ? r[0] : r[0] - l, d = i ? r[1] : r[1] - c;
  return [l, c, v, d];
}
function Lt(t, r, e) {
  return nr(t, ne(r, e), e);
}
function ue(t, r, e, n) {
  return [[0, 0], [r, 0], [0, e], [r, e]].map(function(a) {
    return Lt(t, a, n);
  });
}
function br(t) {
  var r = t.map(function(f) {
    return f[0];
  }), e = t.map(function(f) {
    return f[1];
  }), n = Math.min.apply(Math, Z([], I(r), !1)), a = Math.min.apply(Math, Z([], I(e), !1)), i = Math.max.apply(Math, Z([], I(r), !1)), o = Math.max.apply(Math, Z([], I(e), !1)), s = i - n, u = o - a;
  return {
    left: n,
    top: a,
    right: i,
    bottom: o,
    width: s,
    height: u
  };
}
function qo(t, r, e, n) {
  var a = ue(t, r, e, n);
  return br(a);
}
function Dd(t, r, e, n, a) {
  var i, o = t.target, s = t.origin, u = r.matrix, f = Nu(o), l = f.offsetWidth, c = f.offsetHeight, v = e.getBoundingClientRect(), d = [0, 0];
  e === Vr(e) && (d = Gu(o, !0));
  for (var p = o.getBoundingClientRect(), h = p.left - v.left + e.scrollLeft - (e.clientLeft || 0) + d[0], g = p.top - v.top + e.scrollTop - (e.clientTop || 0) + d[1], y = p.width, S = p.height, b = Xn(n, a, u), x = qo(b, l, c, n), E = x.left, _ = x.top, C = x.width, w = x.height, R = Lt(b, s, n), M = ct(R, [E, _]), G = [
    h + M[0] * y / C,
    g + M[1] * S / w
  ], z = [0, 0], A = 0; ++A < 10; ) {
    var N = kr(a, n);
    i = I(ct(Lt(N, G, n), Lt(N, R, n)), 2), z[0] = i[0], z[1] = i[1];
    var B = Xn(n, a, ae(z, n), u), X = qo(B, l, c, n), U = X.left, j = X.top, $ = U - h, D = j - g;
    if (V($) < 2 && V(D) < 2)
      break;
    G[0] -= $, G[1] -= D;
  }
  return z.map(function(T) {
    return Math.round(T);
  });
}
function Rd(t, r, e) {
  var n = t.length === 16, a = n ? 4 : 3, i = r.map(function(u) {
    return Lt(t, u, a);
  }), o = e.left, s = e.top;
  return i.map(function(u) {
    return [u[0] + o, u[1] + s];
  });
}
function xr(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
}
function Bu(t, r) {
  return xr([
    r[0] - t[0],
    r[1] - t[1]
  ]);
}
function Ne(t, r, e, n) {
  e === void 0 && (e = 1), n === void 0 && (n = Wt(t, r));
  var a = Bu(t, r);
  return {
    transform: "translateY(-50%) translate(".concat(t[0], "px, ").concat(t[1], "px) rotate(").concat(n, "rad) scaleY(").concat(e, ")"),
    width: "".concat(a, "px")
  };
}
function Qn(t, r) {
  for (var e = [], n = 2; n < arguments.length; n++)
    e[n - 2] = arguments[n];
  var a = e.length, i = e.reduce(function(s, u) {
    return s + u[0];
  }, 0) / a, o = e.reduce(function(s, u) {
    return s + u[1];
  }, 0) / a;
  return {
    transform: "translateZ(0px) translate(".concat(i, "px, ").concat(o, "px) rotate(").concat(t, "rad) scale(").concat(r, ")")
  };
}
function oe(t, r) {
  var e = t[r];
  return Dr(e) ? P(P({}, t), e) : t;
}
function Nu(t) {
  var r = t && !gi(t.offsetWidth), e = 0, n = 0, a = 0, i = 0, o = 0, s = 0, u = 0, f = 0, l = 0, c = 0, v = 0, d = 0, p = 1 / 0, h = 1 / 0, g = 1 / 0, y = 1 / 0, S = 0, b = 0, x = !1;
  if (t)
    if (!r && t.ownerSVGElement) {
      var E = t.getBBox();
      x = !0, e = E.width, n = E.height, o = e, s = n, u = e, f = n, a = e, i = n;
    } else {
      var _ = vr(t), C = t.style, w = _("boxSizing") === "border-box", R = parseFloat(_("borderLeftWidth")) || 0, M = parseFloat(_("borderRightWidth")) || 0, G = parseFloat(_("borderTopWidth")) || 0, z = parseFloat(_("borderBottomWidth")) || 0, A = parseFloat(_("paddingLeft")) || 0, N = parseFloat(_("paddingRight")) || 0, B = parseFloat(_("paddingTop")) || 0, X = parseFloat(_("paddingBottom")) || 0, U = A + N, j = B + X, $ = R + M, D = G + z, T = U + $, F = j + D, W = _("position"), Y = 0, K = 0;
      if ("clientLeft" in t) {
        var L = null;
        if (W === "absolute") {
          var et = tn(t, Vr(t));
          L = et.offsetParent;
        } else
          L = t.parentElement;
        if (L) {
          var rt = vr(L);
          Y = parseFloat(rt("width")), K = parseFloat(rt("height"));
        }
      }
      l = Math.max(U, Bt(_("minWidth"), Y) || 0), c = Math.max(j, Bt(_("minHeight"), K) || 0), p = Bt(_("maxWidth"), Y), h = Bt(_("maxHeight"), K), isNaN(p) && (p = 1 / 0), isNaN(h) && (h = 1 / 0), S = Bt(C.width, 0) || 0, b = Bt(C.height, 0) || 0, o = parseFloat(_("width")) || 0, s = parseFloat(_("height")) || 0, u = V(o - S) < 1 ? Ba(l, S || o, p) : o, f = V(s - b) < 1 ? Ba(c, b || s, h) : s, e = u, n = f, a = u, i = f, w ? (g = p, y = h, v = l, d = c, u = e - T, f = n - F) : (g = p + T, y = h + F, v = l + T, d = c + F, e = u + T, n = f + F), a = u + U, i = f + j;
    }
  return {
    svg: x,
    offsetWidth: e,
    offsetHeight: n,
    clientWidth: a,
    clientHeight: i,
    contentWidth: u,
    contentHeight: f,
    inlineCSSWidth: S,
    inlineCSSHeight: b,
    cssWidth: o,
    cssHeight: s,
    minWidth: l,
    minHeight: c,
    maxWidth: p,
    maxHeight: h,
    minOffsetWidth: v,
    minOffsetHeight: d,
    maxOffsetWidth: g,
    maxOffsetHeight: y
  };
}
function Fu(t, r) {
  return Wt(r > 0 ? t[0] : t[1], r > 0 ? t[1] : t[0]);
}
function In() {
  return {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    right: 0,
    bottom: 0,
    clientLeft: 0,
    clientTop: 0,
    clientWidth: 0,
    clientHeight: 0,
    scrollWidth: 0,
    scrollHeight: 0
  };
}
function Lu(t, r) {
  var e = t === Vr(t) || t === bi(t), n = {
    clientLeft: t.clientLeft,
    clientTop: t.clientTop,
    clientWidth: t.clientWidth,
    clientHeight: t.clientHeight,
    scrollWidth: t.scrollWidth,
    scrollHeight: t.scrollHeight,
    overflow: !1
  };
  return e && (n.clientHeight = Math.max(r.height, n.clientHeight), n.scrollHeight = Math.max(r.height, n.scrollHeight)), n.overflow = vr(t)("overflow") !== "visible", P(P({}, r), n);
}
function Ta(t, r, e, n) {
  var a = t.left, i = t.right, o = t.top, s = t.bottom, u = r.top, f = r.left, l = {
    left: f + a,
    top: u + o,
    right: f + i,
    bottom: u + s,
    width: i - a,
    height: s - o
  };
  return e && n ? Lu(e, l) : l;
}
function He(t, r) {
  var e = 0, n = 0, a = 0, i = 0;
  if (t) {
    var o = t.getBoundingClientRect();
    e = o.left, n = o.top, a = o.width, i = o.height;
  }
  var s = {
    left: e,
    top: n,
    width: a,
    height: i,
    right: e + a,
    bottom: n + i
  };
  return t && r ? Lu(t, s) : s;
}
function Td(t) {
  var r = t.props, e = r.groupable, n = r.svgOrigin, a = t.getState(), i = a.offsetWidth, o = a.offsetHeight, s = a.svg, u = a.transformOrigin;
  return !e && s && n ? ji(n, i, o) : u;
}
function Yu(t, r, e, n) {
  var a;
  if (t)
    a = t;
  else if (r)
    a = [0, 0];
  else {
    var i = e.target;
    a = Wu(i, n);
  }
  return a;
}
function Wu(t, r) {
  if (t) {
    var e = t.getAttribute("data-rotation") || "", n = t.getAttribute("data-direction");
    if (r.deg = e, !!n) {
      var a = [0, 0];
      return n.indexOf("w") > -1 && (a[0] = -1), n.indexOf("e") > -1 && (a[0] = 1), n.indexOf("n") > -1 && (a[1] = -1), n.indexOf("s") > -1 && (a[1] = 1), a;
    }
  }
}
function Li(t, r) {
  return [
    Tt(r, t[0]),
    Tt(r, t[1]),
    Tt(r, t[2]),
    Tt(r, t[3])
  ];
}
function _r(t) {
  var r = t.left, e = t.top, n = t.pos1, a = t.pos2, i = t.pos3, o = t.pos4;
  return Li([n, a, i, o], [r, e]);
}
function ei(t, r) {
  t[r ? "controlAbles" : "targetAbles"].forEach(function(e) {
    e.unset && e.unset(t);
  });
}
function ge(t, r) {
  var e = r ? "controlGesto" : "targetGesto", n = t[e];
  n?.isIdle() === !1 && ei(t, r), n?.unset(), t[e] = null;
}
function or(t, r) {
  if (r) {
    var e = Oe(r);
    e.nextStyle = P(P({}, e.nextStyle), t);
  }
  return {
    style: t,
    cssText: Te(t).map(function(n) {
      return "".concat(Xl(n, "-"), ": ").concat(t[n], ";");
    }).join("")
  };
}
function Hu(t, r, e) {
  var n = r.afterTransform || r.transform;
  return P(P({}, or(P(P(P({}, t.style), r.style), { transform: n }), e)), { afterTransform: n, transform: t.transform });
}
function xt(t, r, e, n) {
  var a = r.datas;
  a.datas || (a.datas = {});
  var i = P(P({}, e), { target: t.state.target, clientX: r.clientX, clientY: r.clientY, inputEvent: r.inputEvent, currentTarget: t, moveable: t, datas: a.datas, isRequest: r.isRequest, isRequestChild: r.isRequestChild, isFirstDrag: !!r.isFirstDrag, isTrusted: r.isTrusted !== !1, stopAble: function() {
    a.isEventStart = !1;
  }, stopDrag: function() {
    var o;
    (o = r.stop) === null || o === void 0 || o.call(r);
  } });
  return a.isStartEvent ? n || (a.lastEvent = i) : a.isStartEvent = !0, i;
}
function yr(t, r, e) {
  var n = r.datas, a = "isDrag" in e ? e.isDrag : r.isDrag;
  return n.datas || (n.datas = {}), P(P({ isDrag: a }, e), { moveable: t, target: t.state.target, clientX: r.clientX, clientY: r.clientY, inputEvent: r.inputEvent, currentTarget: t, lastEvent: n.lastEvent, isDouble: r.isDouble, datas: n.datas, isFirstDrag: !!r.isFirstDrag });
}
function pa(t, r, e) {
  t._emitter.on(r, e);
}
function at(t, r, e, n, a) {
  return t.triggerEvent(r, e, n, a);
}
function Yi(t, r) {
  return $r(t).getComputedStyle(t, r);
}
function kn(t, r, e) {
  var n = {}, a = {};
  return t.filter(function(i) {
    var o = i.name;
    if (n[o] || !r.some(function(s) {
      return i[s];
    }))
      return !1;
    if (!e && i.ableGroup) {
      if (a[i.ableGroup])
        return !1;
      a[i.ableGroup] = !0;
    }
    return n[o] = !0, !0;
  });
}
function ni(t, r) {
  return t === r || t == null && r == null;
}
function Vo() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  for (var e = t.length - 1, n = 0; n < e; ++n) {
    var a = t[n];
    if (!gi(a))
      return a;
  }
  return t[e];
}
function $u(t, r) {
  var e = [], n = [];
  return t.forEach(function(a, i) {
    var o = r(a, i, t), s = n.indexOf(o), u = e[s] || [];
    s === -1 && (n.push(o), e.push(u)), u.push(a);
  }), e;
}
function Md(t, r) {
  var e = [], n = {};
  return t.forEach(function(a, i) {
    var o = r(a, i, t), s = n[o];
    s || (s = [], n[o] = s, e.push(s)), s.push(a);
  }), e;
}
function ju(t) {
  return t.reduce(function(r, e) {
    return r.concat(e);
  }, []);
}
function Ce() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  return t.sort(function(e, n) {
    return V(n) - V(e);
  }), t[0];
}
function we(t, r, e) {
  return nr(kr(t, e), ne(r, e), e);
}
function Od(t, r) {
  var e, n = t.is3d, a = t.rootMatrix, i = n ? 4 : 3;
  return e = I(we(a, [r.distX, r.distY], i), 2), r.distX = e[0], r.distY = e[1], r;
}
function Sr(t, r, e, n) {
  if (!e[0] && !e[1])
    return r;
  var a = Lt(t, [$o(e[0] || 1), 0], n), i = Lt(t, [0, $o(e[1] || 1)], n), o = Lt(t, [
    e[0] / xr(a),
    e[1] / xr(i)
  ], n);
  return Tt(r, o);
}
function Cr(t, r, e) {
  return e ? "".concat(t / r * 100, "%") : "".concat(t, "px");
}
function ta(t) {
  return V(t) <= sr ? 0 : t;
}
function Wi(t) {
  return function(r) {
    if (!r.isDragging(t))
      return "";
    var e = Ev(r, t), n = e.deg;
    return n ? ft("view-control-rotation".concat(n)) : "";
  };
}
function Hi(t, r) {
  return r === void 0 && (r = [t]), function(e, n) {
    if (n.isRequest)
      return r.some(function(i) {
        return n.requestAble === i;
      }) ? n.parentDirection : !1;
    var a = n.inputEvent.target;
    return Vt(a, ft("direction")) && (!t || Vt(a, ft(t)));
  };
}
function Pd(t, r, e) {
  var n, a = be(t, {
    "x%": function(E) {
      return E / 100 * r.offsetWidth;
    },
    "y%": function(E) {
      return E / 100 * r.offsetHeight;
    }
  }), i = t.slice(0, e < 0 ? void 0 : e), o = t.slice(0, e < 0 ? void 0 : e + 1), s = t[e] || "", u = e < 0 ? [] : t.slice(e), f = e < 0 ? [] : t.slice(e + 1), l = a.slice(0, e < 0 ? void 0 : e), c = a.slice(0, e < 0 ? void 0 : e + 1), v = (n = a[e]) !== null && n !== void 0 ? n : be([""])[0], d = e < 0 ? [] : a.slice(e), p = e < 0 ? [] : a.slice(e + 1), h = v ? [v] : [], g = ve(l), y = ve(c), S = ve(d), b = ve(p), x = Nt(g, S, 4);
  return {
    transforms: t,
    beforeFunctionMatrix: g,
    beforeFunctionMatrix2: y,
    targetFunctionMatrix: ve(h),
    afterFunctionMatrix: S,
    afterFunctionMatrix2: b,
    allFunctionMatrix: x,
    beforeFunctions: l,
    beforeFunctions2: c,
    targetFunction: h[0],
    afterFunctions: d,
    afterFunctions2: p,
    beforeFunctionTexts: i,
    beforeFunctionTexts2: o,
    targetFunctionText: s,
    afterFunctionTexts: u,
    afterFunctionTexts2: f
  };
}
function Ad(t) {
  return !t || !Dr(t) || xi(t) ? !1 : Zt(t) || "length" in t;
}
function Ir(t, r) {
  return t ? xi(t) ? t : Lr(t) ? r ? document.querySelector(t) : t : mi(t) ? t() : $s(t) ? t : "current" in t ? t.current : t : null;
}
function $i(t, r) {
  if (!t)
    return [];
  var e = Ad(t) ? [].slice.call(t) : [t];
  return e.reduce(function(n, a) {
    return Lr(a) && r ? Z(Z([], I(n), !1), I([].slice.call(document.querySelectorAll(a))), !1) : (Zt(a) ? n.push($i(a, r)) : n.push(Ir(a, r)), n);
  }, []);
}
function Id(t, r, e) {
  var n = Wt(t, r) / Math.PI * 180;
  return n = e >= 0 ? n : 180 - n, n = n >= 0 ? n : 360 + n, n;
}
function Uo(t, r) {
  var e = t.rootMatrix, n = t.is3d, a = n ? 4 : 3, i = kr(e, a);
  return n || (i = Rr(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, uc(i, r);
}
function Xu(t, r, e, n, a) {
  var i = I(t, 2), o = i[0], s = i[1], u = 0, f = 0;
  if (a && o && s) {
    var l = Wt([0, 0], r), c = Wt([0, 0], n), v = xr(r), d = Math.cos(l - c) * v;
    if (!n[0])
      f = d, u = f * e;
    else if (!n[1])
      u = d, f = u / e;
    else {
      var p = n[0] * o, h = n[1] * s, g = Math.atan2(p + r[0], h + r[1]), y = Math.atan2(p, h);
      g < 0 && (g += Math.PI * 2), y < 0 && (y += Math.PI * 2);
      var S = 0;
      V(g - y) < Math.PI / 2 || V(g - y) > Math.PI / 2 * 3 || (y += Math.PI), S = g - y, S > Math.PI * 2 ? S -= Math.PI * 2 : S > Math.PI ? S = 2 * Math.PI - S : S < -Math.PI && (S = -2 * Math.PI - S);
      var b = xr([p + r[0], h + r[1]]) * Math.cos(S);
      u = b * Math.sin(y) - p, f = b * Math.cos(y) - h, n[0] < 0 && (u *= -1), n[1] < 0 && (f *= -1);
    }
  } else
    u = n[0] * r[0], f = n[1] * r[1];
  return [u, f];
}
function qu(t, r, e, n) {
  var a, i = e.ratio, o = e.startOffsetWidth, s = e.startOffsetHeight, u = 0, f = 0, l = n.distX, c = n.distY, v = n.pinchScale, d = n.parentDistance, p = n.parentDist, h = n.parentScale, g = e.fixedDirection, y = [0, 1].map(function(C) {
    return V(t[C] - g[C]);
  }), S = [0, 1].map(function(C) {
    var w = y[C];
    return w !== 0 && (w = 2 / w), w;
  });
  if (p)
    u = p[0], f = p[1], r && (u ? f || (f = u / i) : u = f * i);
  else if (Ke(v))
    u = (v - 1) * o, f = (v - 1) * s;
  else if (h)
    u = (h[0] - 1) * o, f = (h[1] - 1) * s;
  else if (d) {
    var b = o * y[0], x = s * y[1], E = xr([b, x]);
    u = d / E * b * S[0], f = d / E * x * S[1];
  } else {
    var _ = zr({ datas: e, distX: l, distY: c });
    _ = S.map(function(C, w) {
      return _[w] * C;
    }), a = I(Xu([o, s], _, i, t, r), 2), u = a[0], f = a[1];
  }
  return {
    // direction,
    // sizeDirection,
    distWidth: u,
    distHeight: f
  };
}
function ai(t, r) {
  if (r) {
    if (t === "left")
      return { x: "0%", y: "50%" };
    if (t === "top")
      return { x: "50%", y: "50%" };
    if (t === "center")
      return { x: "50%", y: "50%" };
    if (t === "right")
      return { x: "100%", y: "50%" };
    if (t === "bottom")
      return { x: "50%", y: "100%" };
    var e = I(t.split(" "), 2), n = e[0], a = e[1], i = ai(n || ""), o = ai(a || ""), s = P(P({}, i), o), u = {
      x: "50%",
      y: "50%"
    };
    return s.x && (u.x = s.x), s.y && (u.y = s.y), s.value && (s.x && !s.y && (u.y = s.value), !s.x && s.y && (u.x = s.value)), u;
  }
  return t === "left" ? { x: "0%" } : t === "right" ? { x: "100%" } : t === "top" ? { y: "0%" } : t === "bottom" ? { y: "100%" } : t ? t === "center" ? { value: "50%" } : { value: t } : {};
}
function ji(t, r, e) {
  var n = ai(t, !0), a = n.x, i = n.y;
  return [
    Bt(a, r) || 0,
    Bt(i, e) || 0
  ];
}
function kd(t, r, e) {
  var n = t.map(function(i) {
    return ct(i, r);
  }), a = n.map(function(i) {
    return an(i, e);
  });
  return {
    prev: n,
    next: a,
    result: a.map(function(i) {
      return Tt(i, r);
    })
  };
}
function Vu(t, r) {
  return t.length === r.length && t.every(function(e, n) {
    var a = r[n], i = Zt(e), o = Zt(a);
    return i && o ? Vu(e, a) : !i && !o ? e === a : !1;
  });
}
function me(t, r, e, n, a) {
  var i = t._store, o = i[r];
  if (!(r in i))
    if (a != null)
      i[r] = a, o = a;
    else
      return i[r] = e, e;
  return o === e || n(o) === n(e) ? o : (i[r] = e, e);
}
function ir(t) {
  return t >= 0 ? 1 : -1;
}
function V(t) {
  return Math.abs(t);
}
function Ma(t, r) {
  return Kl(t).map(function(e) {
    return r(e);
  });
}
function Uu(t) {
  return Ke(t) ? {
    top: t,
    left: t,
    right: t,
    bottom: t
  } : {
    left: t.left || 0,
    top: t.top || 0,
    right: t.right || 0,
    bottom: t.bottom || 0
  };
}
var zd = un("pinchable", {
  props: [
    "pinchable"
  ],
  events: [
    "pinchStart",
    "pinch",
    "pinchEnd",
    "pinchGroupStart",
    "pinchGroup",
    "pinchGroupEnd"
  ],
  dragStart: function() {
    return !0;
  },
  pinchStart: function(t, r) {
    var e = r.datas, n = r.targets, a = r.angle, i = r.originalDatas, o = t.props, s = o.pinchable, u = o.ables;
    if (!s)
      return !1;
    var f = "onPinch".concat(n ? "Group" : "", "Start"), l = "drag".concat(n ? "Group" : "", "ControlStart"), c = (s === !0 ? t.controlAbles : u.filter(function(h) {
      return s.indexOf(h.name) > -1;
    })).filter(function(h) {
      return h.canPinch && h[l];
    }), v = xt(t, r, {});
    n && (v.targets = n);
    var d = at(t, f, v);
    e.isPinch = d !== !1, e.ables = c;
    var p = e.isPinch;
    return p ? (c.forEach(function(h) {
      if (i[h.name] = i[h.name] || {}, !!h[l]) {
        var g = P(P({}, r), { datas: i[h.name], parentRotate: a, isPinch: !0 });
        h[l](t, g);
      }
    }), t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: [0, 0]
    }, p) : !1;
  },
  pinch: function(t, r) {
    var e = r.datas, n = r.scale, a = r.distance, i = r.originalDatas, o = r.inputEvent, s = r.targets, u = r.angle;
    if (e.isPinch) {
      var f = a * (1 - 1 / n), l = xt(t, r, {});
      s && (l.targets = s);
      var c = "onPinch".concat(s ? "Group" : "");
      at(t, c, l);
      var v = e.ables, d = "drag".concat(s ? "Group" : "", "Control");
      return v.forEach(function(p) {
        p[d] && p[d](t, P(P({}, r), { datas: i[p.name], inputEvent: o, resolveMatrix: !0, pinchScale: n, parentDistance: f, parentRotate: u, isPinch: !0 }));
      }), l;
    }
  },
  pinchEnd: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.inputEvent, i = r.targets, o = r.originalDatas;
    if (e.isPinch) {
      var s = "onPinch".concat(i ? "Group" : "", "End"), u = yr(t, r, { isDrag: n });
      i && (u.targets = i), at(t, s, u);
      var f = e.ables, l = "drag".concat(i ? "Group" : "", "ControlEnd");
      return f.forEach(function(c) {
        c[l] && c[l](t, P(P({}, r), { isDrag: n, datas: o[c.name], inputEvent: a, isPinch: !0 }));
      }), n;
    }
  },
  pinchGroupStart: function(t, r) {
    return this.pinchStart(t, P(P({}, r), { targets: t.props.targets }));
  },
  pinchGroup: function(t, r) {
    return this.pinch(t, P(P({}, r), { targets: t.props.targets }));
  },
  pinchGroupEnd: function(t, r) {
    return this.pinchEnd(t, P(P({}, r), { targets: t.props.targets }));
  }
}), Ko = Hi("scalable"), Gd = {
  name: "scalable",
  ableGroup: "size",
  canPinch: !0,
  props: [
    "scalable",
    "throttleScale",
    "renderDirections",
    "keepRatio",
    "edge",
    "displayAroundControls"
  ],
  events: [
    "scaleStart",
    "beforeScale",
    "scale",
    "scaleEnd",
    "scaleGroupStart",
    "beforeScaleGroup",
    "scaleGroup",
    "scaleGroupEnd"
  ],
  render: hu("scalable"),
  dragControlCondition: Ko,
  viewClassName: Wi("scalable"),
  dragControlStart: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.inputEvent, i = r.parentDirection, o = Yu(i, n, a, e), s = t.state, u = s.width, f = s.height, l = s.targetTransform, c = s.target, v = s.pos1, d = s.pos2, p = s.pos4;
    if (!o || !c)
      return !1;
    n || se(t, r), e.datas = {}, e.transform = l, e.prevDist = [1, 1], e.direction = o, e.startOffsetWidth = u, e.startOffsetHeight = f, e.startValue = [1, 1];
    var h = !o[0] && !o[1] || o[0] || !o[1];
    fa(t, r, "scale"), e.isWidth = h;
    function g(_) {
      e.ratio = _ && isFinite(_) ? _ : 0;
    }
    e.startPositions = _r(t.state);
    function y(_) {
      var C = Ru(e.startPositions, _);
      e.fixedDirection = C.fixedDirection, e.fixedPosition = C.fixedPosition, e.fixedOffset = C.fixedOffset;
    }
    e.setFixedDirection = y, g(Br(v, d) / Br(d, p)), y([-o[0], -o[1]]);
    var S = function(_) {
      e.minScaleSize = _;
    }, b = function(_) {
      e.maxScaleSize = _;
    };
    S([-1 / 0, -1 / 0]), b([1 / 0, 1 / 0]);
    var x = xt(t, r, P(P({ direction: o, set: function(_) {
      e.startValue = _;
    }, setRatio: g, setFixedDirection: y, setMinScaleSize: S, setMaxScaleSize: b }, ua(t, r)), { dragStart: ar.dragStart(t, new xe().dragStart([0, 0], r)) })), E = at(t, "onScaleStart", x);
    return e.startFixedDirection = e.fixedDirection, E !== !1 && (e.isScale = !0, t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: o
    }), e.isScale ? x : !1;
  },
  dragControl: function(t, r) {
    oa(t, r, "scale");
    var e = r.datas, n = r.parentKeepRatio, a = r.parentFlag, i = r.isPinch, o = r.dragClient, s = r.isRequest, u = r.useSnap, f = r.resolveMatrix, l = e.prevDist, c = e.direction, v = e.startOffsetWidth, d = e.startOffsetHeight, p = e.isScale, h = e.startValue, g = e.isWidth, y = e.ratio;
    if (!p)
      return !1;
    var S = t.props, b = S.throttleScale, x = S.parentMoveable, E = c;
    !c[0] && !c[1] && (E = [1, 1]);
    var _ = y && (n ?? S.keepRatio) || !1, C = t.state, w = [
      h[0],
      h[1]
    ];
    function R() {
      var J = qu(E, _, e, r), H = J.distWidth, bt = J.distHeight, ut = v ? (v + H) / v : 1, vt = d ? (d + bt) / d : 1;
      h[0] || (w[0] = H / v), h[1] || (w[1] = bt / d);
      var gt = (E[0] || _ ? ut : 1) * w[0], wt = (E[1] || _ ? vt : 1) * w[1];
      return gt === 0 && (gt = ir(l[0]) * Mn), wt === 0 && (wt = ir(l[1]) * Mn), [gt, wt];
    }
    var M = R();
    if (!i && t.props.groupable) {
      var G = C.snapRenderInfo || {}, z = G.direction;
      Zt(z) && (z[0] || z[1]) && (C.snapRenderInfo = { direction: c, request: r.isRequest });
    }
    at(t, "onBeforeScale", xt(t, r, {
      scale: M,
      setFixedDirection: function(J) {
        return e.setFixedDirection(J), M = R(), M;
      },
      startFixedDirection: e.startFixedDirection,
      setScale: function(J) {
        M = J;
      }
    }, !0));
    var A = [
      M[0] / w[0],
      M[1] / w[1]
    ], N = o, B = [0, 0], X = ir(A[0] * A[1]), U = !o && !a && i;
    if (U || f ? N = Ai(t, e.targetAllTransform, [0, 0], [0, 0], e) : o || (N = e.fixedPosition), i || (B = dd(t, A, c, !u && s, e)), _) {
      E[0] && E[1] && B[0] && B[1] && (Math.abs(B[0] * v) > Math.abs(B[1] * d) ? B[1] = 0 : B[0] = 0);
      var j = !B[0] && !B[1];
      if (j && (g ? A[0] = yt(A[0] * w[0], b) / w[0] : A[1] = yt(A[1] * w[1], b) / w[1]), E[0] && !E[1] || B[0] && !B[1] || j && g) {
        A[0] += B[0];
        var $ = v * A[0] * w[0] / y;
        A[1] = ir(X * A[0]) * V($ / d / w[1]);
      } else if (!E[0] && E[1] || !B[0] && B[1] || j && !g) {
        A[1] += B[1];
        var D = d * A[1] * w[1] * y;
        A[0] = ir(X * A[1]) * V(D / v / w[0]);
      }
    } else
      A[0] += B[0], A[1] += B[1], B[0] || (A[0] = yt(A[0] * w[0], b) / w[0]), B[1] || (A[1] = yt(A[1] * w[1], b) / w[1]);
    A[0] === 0 && (A[0] = ir(l[0]) * Mn), A[1] === 0 && (A[1] = ir(l[1]) * Mn), M = md(A, [w[0], w[1]]);
    var T = [
      v,
      d
    ], F = [
      v * M[0],
      d * M[1]
    ];
    F = Ys(F, e.minScaleSize, e.maxScaleSize, _ ? y : !1), M = Ma(2, function(J) {
      return T[J] ? F[J] / T[J] : F[J];
    }), A = Ma(2, function(J) {
      return M[J] / w[J];
    });
    var W = Ma(2, function(J) {
      return l[J] ? A[J] / l[J] : A[J];
    }), Y = "scale(".concat(A.join(", "), ")"), K = "scale(".concat(M.join(", "), ")"), L = sa(e, K, Y), et = !h[0] || !h[1], rt = dv(t, et ? K : Y, e.fixedDirection, N, e.fixedOffset, e, et), pt = U ? rt : ct(rt, e.prevInverseDist || [0, 0]);
    if (e.prevDist = A, e.prevInverseDist = rt, M[0] === l[0] && M[1] === l[1] && pt.every(function(J) {
      return !J;
    }) && !x && !U)
      return !1;
    var Et = xt(t, r, P({ offsetWidth: v, offsetHeight: d, direction: c, scale: M, dist: A, delta: W, isPinch: !!i }, fu(t, L, pt, i, r)));
    return at(t, "onScale", Et), Et;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    if (!e.isScale)
      return !1;
    e.isScale = !1;
    var n = yr(t, r, {});
    return at(t, "onScaleEnd", n), n;
  },
  dragGroupControlCondition: Ko,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = this.dragControlStart(t, r);
    if (!n)
      return !1;
    var a = wr(t, "resizable", r);
    e.moveableScale = t.scale;
    var i = Nr(t, this, "dragControlStart", r, function(f, l) {
      return Un(t, f, e, l);
    }), o = function(f) {
      n.setFixedDirection(f), i.forEach(function(l, c) {
        l.setFixedDirection(f), Un(t, l.moveable, e, a[c]);
      });
    };
    e.setFixedDirection = o;
    var s = P(P({}, n), { targets: t.props.targets, events: i, setFixedDirection: o }), u = at(t, "onScaleGroupStart", s);
    return e.isScale = u !== !1, e.isScale ? s : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isScale) {
      pa(t, "onBeforeScale", function(l) {
        at(t, "onBeforeScaleGroup", xt(t, r, P(P({}, l), { targets: t.props.targets }), !0));
      });
      var n = this.dragControl(t, r);
      if (n) {
        var a = n.dist, i = e.moveableScale;
        t.scale = [
          a[0] * i[0],
          a[1] * i[1]
        ];
        var o = t.props.keepRatio, s = e.fixedPosition, u = Nr(t, this, "dragControl", r, function(l, c) {
          var v = I(nr(on(t.rotation / 180 * Math.PI, 3), [
            c.datas.originalX * a[0],
            c.datas.originalY * a[1],
            1
          ], 3), 2), d = v[0], p = v[1];
          return P(P({}, c), {
            parentDist: null,
            parentScale: a,
            parentKeepRatio: o,
            // recalculate child fixed position for parent group's dragging.
            dragClient: Tt(s, [d, p])
          });
        }), f = P({ targets: t.props.targets, events: u }, n);
        return at(t, "onScaleGroup", f), f;
      }
    }
  },
  dragGroupControlEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isScale) {
      this.dragControlEnd(t, r);
      var a = Nr(t, this, "dragControlEnd", r), i = yr(t, r, {
        targets: t.props.targets,
        events: a
      });
      return at(t, "onScaleGroupEnd", i), e;
    }
  },
  /**
       * @method Moveable.Scalable#request
       * @param {Moveable.Scalable.ScalableRequestParam} e - the Scalable's request parameter
       * @return {Moveable.Requester} Moveable Requester
       * @example
  
       * // Instantly Request (requestStart - request - requestEnd)
       * moveable.request("scalable", { deltaWidth: 10, deltaHeight: 10 }, true);
       *
       * // requestStart
       * const requester = moveable.request("scalable");
       *
       * // request
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       *
       * // requestEnd
       * requester.requestEnd();
       */
  request: function() {
    var t = {}, r = 0, e = 0, n = !1;
    return {
      isControl: !0,
      requestStart: function(a) {
        return n = a.useSnap, {
          datas: t,
          parentDirection: a.direction || [1, 1],
          useSnap: n
        };
      },
      request: function(a) {
        return r += a.deltaWidth, e += a.deltaHeight, {
          datas: t,
          parentDist: [r, e],
          parentKeepRatio: a.keepRatio,
          useSnap: n
        };
      },
      requestEnd: function() {
        return { datas: t, isDrag: !0, useSnap: n };
      }
    };
  }
};
function Yr(t, r) {
  return t.map(function(e, n) {
    return jn(e, r[n], 1, 2);
  });
}
function Zo(t, r, e) {
  var n = Wt(t, r), a = Wt(t, e), i = a - n;
  return i >= 0 ? i : i + 2 * Math.PI;
}
function Bd(t, r) {
  var e = Zo(t[0], t[1], t[2]), n = Zo(r[0], r[1], r[2]), a = Math.PI;
  return !(e >= a && n <= a || e <= a && n >= a);
}
var Nd = {
  name: "warpable",
  ableGroup: "size",
  props: [
    "warpable",
    "renderDirections",
    "edge",
    "displayAroundControls"
  ],
  events: [
    "warpStart",
    "warp",
    "warpEnd"
  ],
  viewClassName: Wi("warpable"),
  render: function(t, r) {
    var e = t.props, n = e.resizable, a = e.scalable, i = e.warpable, o = e.zoom;
    if (n || a || !i)
      return [];
    var s = t.state, u = s.pos1, f = s.pos2, l = s.pos3, c = s.pos4, v = Yr(u, f), d = Yr(f, u), p = Yr(u, l), h = Yr(l, u), g = Yr(l, c), y = Yr(c, l), S = Yr(f, c), b = Yr(c, f);
    return Z([
      r.createElement("div", { className: ft("line"), key: "middeLine1", style: Ne(v, g, o) }),
      r.createElement("div", { className: ft("line"), key: "middeLine2", style: Ne(d, y, o) }),
      r.createElement("div", { className: ft("line"), key: "middeLine3", style: Ne(p, S, o) }),
      r.createElement("div", { className: ft("line"), key: "middeLine4", style: Ne(h, b, o) })
    ], I(gu(t, "warpable", r)), !1);
  },
  dragControlCondition: function(t, r) {
    if (r.isRequest)
      return !1;
    var e = r.inputEvent.target;
    return Vt(e, ft("direction")) && Vt(e, ft("warpable"));
  },
  dragControlStart: function(t, r) {
    var e = r.datas, n = r.inputEvent, a = t.props.target, i = n.target, o = Wu(i, e);
    if (!o || !a)
      return !1;
    var s = t.state, u = s.transformOrigin, f = s.is3d, l = s.targetTransform, c = s.targetMatrix, v = s.width, d = s.height, p = s.left, h = s.top;
    e.datas = {}, e.targetTransform = l, e.warpTargetMatrix = f ? c : Rr(c, 3, 4), e.targetInverseMatrix = js(kr(e.warpTargetMatrix, 4), 3, 4), e.direction = o, e.left = p, e.top = h, e.poses = [
      [0, 0],
      [v, 0],
      [0, d],
      [v, d]
    ].map(function(S) {
      return ct(S, u);
    }), e.nextPoses = e.poses.map(function(S) {
      var b = I(S, 2), x = b[0], E = b[1];
      return nr(e.warpTargetMatrix, [x, E, 0, 1], 4);
    }), e.startValue = Ft(4), e.prevMatrix = Ft(4), e.absolutePoses = _r(s), e.posIndexes = uu(o), se(t, r), fa(t, r, "matrix3d"), s.snapRenderInfo = {
      request: r.isRequest,
      direction: o
    };
    var g = xt(t, r, P({ set: function(S) {
      e.startValue = S;
    } }, ua(t, r))), y = at(t, "onWarpStart", g);
    return y !== !1 && (e.isWarp = !0), e.isWarp;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = r.isRequest, a = r.distX, i = r.distY, o = e.targetInverseMatrix, s = e.prevMatrix, u = e.isWarp, f = e.startValue, l = e.poses, c = e.posIndexes, v = e.absolutePoses;
    if (!u)
      return !1;
    if (oa(t, r, "matrix3d"), Pe(t, "warpable")) {
      var d = c.map(function(R) {
        return v[R];
      });
      d.length > 1 && d.push([
        (d[0][0] + d[1][0]) / 2,
        (d[0][1] + d[1][1]) / 2
      ]);
      var p = va(t, n, {
        horizontal: d.map(function(R) {
          return R[1] + i;
        }),
        vertical: d.map(function(R) {
          return R[0] + a;
        })
      }), h = p.horizontal, g = p.vertical;
      i -= h.offset, a -= g.offset;
    }
    var y = zr({ datas: e, distX: a, distY: i }, !0), S = e.nextPoses.slice();
    if (c.forEach(function(R) {
      S[R] = Tt(S[R], y);
    }), !ev.every(function(R) {
      return Bd(R.map(function(M) {
        return l[M];
      }), R.map(function(M) {
        return S[M];
      }));
    }))
      return !1;
    var b = Ci(l[0], l[2], l[1], l[3], S[0], S[2], S[1], S[3]);
    if (!b.length)
      return !1;
    var x = Nt(o, b, 4), E = ou(e, x, !0), _ = Nt(kr(s, 4), E, 4);
    e.prevMatrix = E;
    var C = Nt(f, E, 4), w = sa(e, "matrix3d(".concat(C.join(", "), ")"), "matrix3d(".concat(E.join(", "), ")"));
    return Pi(r, w), at(t, "onWarp", xt(t, r, P({ delta: _, matrix: C, dist: E, multiply: Nt, transform: w }, or({
      transform: w
    }, r)))), !0;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas, n = r.isDrag;
    return e.isWarp ? (e.isWarp = !1, at(t, "onWarpEnd", yr(t, r, {})), n) : !1;
  }
}, Fd = /* @__PURE__ */ ft("area-pieces"), zn = /* @__PURE__ */ ft("area-piece"), Ku = /* @__PURE__ */ ft("avoid"), Ld = ft("view-dragging");
function Oa(t) {
  var r = t.areaElement;
  if (r) {
    var e = t.state, n = e.width, a = e.height;
    Hs(r, Ku), r.style.cssText += "left: 0px; top: 0px; width: ".concat(n, "px; height: ").concat(a, "px");
  }
}
function Jo(t) {
  return t.createElement(
    "div",
    { key: "area_pieces", className: Fd },
    t.createElement("div", { className: zn }),
    t.createElement("div", { className: zn }),
    t.createElement("div", { className: zn }),
    t.createElement("div", { className: zn })
  );
}
var Zu = {
  name: "dragArea",
  props: [
    "dragArea",
    "passDragArea"
  ],
  events: [
    "click",
    "clickGroup"
  ],
  render: function(t, r) {
    var e = t.props, n = e.target, a = e.dragArea, i = e.groupable, o = e.passDragArea, s = t.getState(), u = s.width, f = s.height, l = s.renderPoses, c = o ? ft("area", "pass") : ft("area");
    if (i)
      return [
        r.createElement("div", { key: "area", ref: ee(t, "areaElement"), className: c }),
        Jo(r)
      ];
    if (!n || !a)
      return [];
    var v = Ci([0, 0], [u, 0], [0, f], [u, f], l[0], l[1], l[2], l[3]), d = v.length ? da(v, !0) : "none";
    return [
      r.createElement("div", { key: "area", ref: ee(t, "areaElement"), className: c, style: {
        top: "0px",
        left: "0px",
        width: "".concat(u, "px"),
        height: "".concat(f, "px"),
        transformOrigin: "0 0",
        transform: d
      } }),
      Jo(r)
    ];
  },
  dragStart: function(t, r) {
    var e = r.datas, n = r.clientX, a = r.clientY, i = r.inputEvent;
    if (!i)
      return !1;
    e.isDragArea = !1;
    var o = t.areaElement, s = t.state, u = s.moveableClientRect, f = s.renderPoses, l = s.rootMatrix, c = s.is3d, v = u.left, d = u.top, p = br(f), h = p.left, g = p.top, y = p.width, S = p.height, b = c ? 4 : 3, x = I(we(l, [n - v, a - d], b), 2), E = x[0], _ = x[1];
    E -= h, _ -= g;
    var C = [
      { left: h, top: g, width: y, height: _ - 10 },
      { left: h, top: g, width: E - 10, height: S },
      { left: h, top: g + _ + 10, width: y, height: S - _ - 10 },
      { left: h + E + 10, top: g, width: y - E - 10, height: S }
    ], w = [].slice.call(o.nextElementSibling.children);
    C.forEach(function(R, M) {
      w[M].style.cssText = "left: ".concat(R.left, "px;top: ").concat(R.top, "px; width: ").concat(R.width, "px; height: ").concat(R.height, "px;");
    }), Ws(o, Ku), s.disableNativeEvent = !0;
  },
  drag: function(t, r) {
    var e = r.datas, n = r.inputEvent;
    if (this.enableNativeEvent(t), !n)
      return !1;
    e.isDragArea || (e.isDragArea = !0, Oa(t));
  },
  dragEnd: function(t, r) {
    this.enableNativeEvent(t);
    var e = r.inputEvent, n = r.datas;
    if (!e)
      return !1;
    n.isDragArea || Oa(t);
  },
  dragGroupStart: function(t, r) {
    return this.dragStart(t, r);
  },
  dragGroup: function(t, r) {
    return this.drag(t, r);
  },
  dragGroupEnd: function(t, r) {
    return this.dragEnd(t, r);
  },
  unset: function(t) {
    Oa(t), t.state.disableNativeEvent = !1;
  },
  enableNativeEvent: function(t) {
    var r = t.state;
    r.disableNativeEvent && Ls(function() {
      r.disableNativeEvent = !1;
    });
  }
}, Yd = un("origin", {
  props: ["origin", "svgOrigin"],
  render: function(t, r) {
    var e = t.props, n = e.zoom, a = e.svgOrigin, i = e.groupable, o = t.getState(), s = o.beforeOrigin, u = o.rotation, f = o.svg, l = o.allMatrix, c = o.is3d, v = o.left, d = o.top, p = o.offsetWidth, h = o.offsetHeight, g;
    if (!i && f && a) {
      var y = I(ji(a, p, h), 2), S = y[0], b = y[1], x = c ? 4 : 3, E = Lt(l, [S, b], x);
      g = Qn(u, n, ct(E, [v, d]));
    } else
      g = Qn(u, n, s);
    return [
      r.createElement("div", { className: ft("control", "origin"), style: g, key: "beforeOrigin" })
    ];
  }
});
function Wd(t) {
  var r = t.scrollContainer;
  return [
    r.scrollLeft,
    r.scrollTop
  ];
}
var Hd = {
  name: "scrollable",
  canPinch: !0,
  props: [
    "scrollable",
    "scrollContainer",
    "scrollThreshold",
    "scrollThrottleTime",
    "getScrollPosition",
    "scrollOptions"
  ],
  events: [
    "scroll",
    "scrollGroup"
  ],
  dragRelation: "strong",
  dragStart: function(t, r) {
    var e = t.props, n = e.scrollContainer, a = n === void 0 ? t.getContainer() : n, i = e.scrollOptions, o = new bc(), s = Ir(a, !0);
    r.datas.dragScroll = o, t.state.dragScroll = o;
    var u = r.isControl ? "controlGesto" : "targetGesto", f = r.targets;
    o.on("scroll", function(l) {
      var c = l.container, v = l.direction, d = xt(t, r, {
        scrollContainer: c,
        direction: v
      }), p = f ? "onScrollGroup" : "onScroll";
      f && (d.targets = f), at(t, p, d);
    }).on("move", function(l) {
      var c = l.offsetX, v = l.offsetY, d = l.inputEvent;
      t[u].scrollBy(c, v, d.inputEvent, !1);
    }).on("scrollDrag", function(l) {
      var c = l.next;
      c(t[u].getCurrentEvent());
    }), o.dragStart(r, P({ container: s }, i));
  },
  checkScroll: function(t, r) {
    var e = r.datas.dragScroll;
    if (e) {
      var n = t.props, a = n.scrollContainer, i = a === void 0 ? t.getContainer() : a, o = n.scrollThreshold, s = o === void 0 ? 0 : o, u = n.scrollThrottleTime, f = u === void 0 ? 0 : u, l = n.getScrollPosition, c = l === void 0 ? Wd : l, v = n.scrollOptions;
      return e.drag(r, P({ container: i, threshold: s, throttleTime: f, getScrollPosition: function(d) {
        return c({ scrollContainer: d.container, direction: d.direction });
      } }, v)), !0;
    }
  },
  drag: function(t, r) {
    return this.checkScroll(t, r);
  },
  dragEnd: function(t, r) {
    r.datas.dragScroll.dragEnd(), r.datas.dragScroll = null;
  },
  dragControlStart: function(t, r) {
    return this.dragStart(t, P(P({}, r), { isControl: !0 }));
  },
  dragControl: function(t, r) {
    return this.drag(t, r);
  },
  dragControlEnd: function(t, r) {
    return this.dragEnd(t, r);
  },
  dragGroupStart: function(t, r) {
    return this.dragStart(t, P(P({}, r), { targets: t.props.targets }));
  },
  dragGroup: function(t, r) {
    return this.drag(t, P(P({}, r), { targets: t.props.targets }));
  },
  dragGroupEnd: function(t, r) {
    return this.dragEnd(t, P(P({}, r), { targets: t.props.targets }));
  },
  dragGroupControlStart: function(t, r) {
    return this.dragStart(t, P(P({}, r), { targets: t.props.targets, isControl: !0 }));
  },
  dragGroupControl: function(t, r) {
    return this.drag(t, P(P({}, r), { targets: t.props.targets }));
  },
  dragGroupControEnd: function(t, r) {
    return this.dragEnd(t, P(P({}, r), { targets: t.props.targets }));
  },
  unset: function(t) {
    var r, e = t.state;
    (r = e.dragScroll) === null || r === void 0 || r.dragEnd(), e.dragScroll = null;
  }
}, Ju = {
  name: "",
  props: [
    "target",
    "dragTargetSelf",
    "dragTarget",
    "dragContainer",
    "container",
    "warpSelf",
    "rootContainer",
    "useResizeObserver",
    "useMutationObserver",
    "zoom",
    "dragFocusedInput",
    "transformOrigin",
    "ables",
    "className",
    "pinchThreshold",
    "pinchOutside",
    "triggerAblesSimultaneously",
    "checkInput",
    "cspNonce",
    "translateZ",
    "hideDefaultLines",
    "props",
    "flushSync",
    "stopPropagation",
    "preventClickEventOnDrag",
    "preventClickDefault",
    "viewContainer",
    "persistData",
    "useAccuratePosition",
    "firstRenderState",
    "linePadding",
    "controlPadding",
    "preventDefault",
    "preventRightClick",
    "preventWheelClick",
    "requestStyles"
  ],
  events: [
    "changeTargets"
  ]
}, $d = un("padding", {
  props: ["padding"],
  render: function(t, r) {
    var e = t.props;
    if (e.dragArea)
      return [];
    var n = Uu(e.padding || {}), a = n.left, i = n.top, o = n.right, s = n.bottom, u = t.getState(), f = u.renderPoses, l = u.pos1, c = u.pos2, v = u.pos3, d = u.pos4, p = [l, c, v, d], h = [];
    return a > 0 && h.push([0, 2]), i > 0 && h.push([0, 1]), o > 0 && h.push([1, 3]), s > 0 && h.push([2, 3]), h.map(function(g, y) {
      var S = I(g, 2), b = S[0], x = S[1], E = p[b], _ = p[x], C = f[b], w = f[x], R = Ci([0, 0], [100, 0], [0, 100], [100, 100], E, _, C, w);
      if (R.length)
        return r.createElement("div", { key: "padding".concat(y), className: ft("padding"), style: {
          transform: da(R, !0)
        } });
    });
  }
}), Qo = ["nw", "ne", "se", "sw"];
function Gn(t, r) {
  var e = t[0] + t[1], n = e > r ? r / e : 1;
  return t[0] *= n, t[1] = r - t[1] * n, t;
}
var jd = [1, 2, 5, 6], Xd = [0, 3, 4, 7], Qr = [1, -1, -1, 1], te = [1, 1, -1, -1];
function Xi(t, r, e, n, a, i, o, s) {
  a === void 0 && (a = 0), i === void 0 && (i = 0), o === void 0 && (o = e), s === void 0 && (s = n);
  var u = [], f = !1, l = t.filter(function(v) {
    return !v.virtual;
  }), c = l.map(function(v) {
    var d = v.horizontal, p = v.vertical, h = v.pos;
    if (p && !f && (f = !0, u.push("/")), f) {
      var g = Math.max(0, p === 1 ? h[1] - i : s - h[1]);
      return u.push(Cr(g, n, r)), g;
    } else {
      var g = Math.max(0, d === 1 ? h[0] - a : o - h[0]);
      return u.push(Cr(g, e, r)), g;
    }
  });
  return {
    radiusPoses: l,
    styles: u,
    raws: c
  };
}
function Qu(t) {
  for (var r = [0, 0], e = [0, 0], n = t.length, a = 0; a < n; ++a) {
    var i = t[a];
    i.sub && (i.horizontal && (r[1] === 0 && (r[0] = a), r[1] = a - r[0] + 1, e[0] = a + 1), i.vertical && (e[1] === 0 && (e[0] = a), e[1] = a - e[0] + 1));
  }
  return {
    horizontalRange: r,
    verticalRange: e
  };
}
function tf(t, r, e, n, a, i, o) {
  var s, u, f, l;
  i === void 0 && (i = [0, 0]), o === void 0 && (o = !1);
  var c = t.indexOf("/"), v = (c > -1 ? t.slice(0, c) : t).length, d = t.slice(0, v), p = t.slice(v + 1), h = d.length, g = p.length, y = g > 0, S = I(d, 4), b = S[0], x = b === void 0 ? "0px" : b, E = S[1], _ = E === void 0 ? x : E, C = S[2], w = C === void 0 ? x : C, R = S[3], M = R === void 0 ? _ : R, G = I(p, 4), z = G[0], A = z === void 0 ? x : z, N = G[1], B = N === void 0 ? y ? A : _ : N, X = G[2], U = X === void 0 ? y ? A : w : X, j = G[3], $ = j === void 0 ? y ? B : M : j, D = [x, _, w, M].map(function(L) {
    return Bt(L, r);
  }), T = [A, B, U, $].map(function(L) {
    return Bt(L, e);
  }), F = D.slice(), W = T.slice();
  s = I(Gn([F[0], F[1]], r), 2), F[0] = s[0], F[1] = s[1], u = I(Gn([F[3], F[2]], r), 2), F[3] = u[0], F[2] = u[1], f = I(Gn([W[0], W[3]], e), 2), W[0] = f[0], W[3] = f[1], l = I(Gn([W[1], W[2]], e), 2), W[1] = l[0], W[2] = l[1];
  var Y = o ? F : F.slice(0, Math.max(i[0], h)), K = o ? W : W.slice(0, Math.max(i[1], g));
  return Z(Z([], I(Y.map(function(L, et) {
    var rt = Qo[et];
    return {
      virtual: et >= h,
      horizontal: Qr[et],
      vertical: 0,
      pos: [n + L, a + (te[et] === -1 ? e : 0)],
      sub: !0,
      raw: D[et],
      direction: rt
    };
  })), !1), I(K.map(function(L, et) {
    var rt = Qo[et];
    return {
      virtual: et >= g,
      horizontal: 0,
      vertical: te[et],
      pos: [n + (Qr[et] === -1 ? r : 0), a + L],
      sub: !0,
      raw: T[et],
      direction: rt
    };
  })), !1);
}
function qd(t, r, e, n, a) {
  a === void 0 && (a = r.length);
  var i = Qu(t.slice(n)), o = i.horizontalRange, s = i.verticalRange, u = e - n, f = 0;
  if (u === 0)
    f = a;
  else if (u > 0 && u < o[1])
    f = o[1] - u;
  else if (u >= s[0])
    f = s[0] + s[1] - u;
  else
    return;
  t.splice(e, f), r.splice(e, f);
}
function Vd(t, r, e, n, a, i, o, s, u, f, l) {
  f === void 0 && (f = 0), l === void 0 && (l = 0);
  var c = Qu(t.slice(e)), v = c.horizontalRange, d = c.verticalRange;
  if (n > -1)
    for (var p = Qr[n] === 1 ? i - f : s - i, h = v[1]; h <= n; ++h) {
      var g = te[h] === 1 ? l : u, y = 0;
      if (n === h ? y = i : h === 0 ? y = f + p : Qr[h] === -1 && (y = s - (r[e][0] - f)), t.splice(e + h, 0, {
        horizontal: Qr[h],
        vertical: 0,
        pos: [y, g]
      }), r.splice(e + h, 0, [y, g]), h === 0)
        break;
    }
  else if (a > -1) {
    var S = te[a] === 1 ? o - l : u - o;
    if (v[1] === 0 && d[1] === 0) {
      var b = [
        f + S,
        l
      ];
      t.push({
        horizontal: Qr[0],
        vertical: 0,
        pos: b
      }), r.push(b);
    }
    for (var x = d[0], h = d[1]; h <= a; ++h) {
      var y = Qr[h] === 1 ? f : s, g = 0;
      if (a === h ? g = o : h === 0 ? g = l + S : te[h] === 1 ? g = r[e + x][1] : te[h] === -1 && (g = u - (r[e + x][1] - l)), t.push({
        horizontal: 0,
        vertical: te[h],
        pos: [y, g]
      }), r.push([y, g]), h === 0)
        break;
    }
  }
}
function Ud(t, r) {
  r === void 0 && (r = t.map(function(a) {
    return a.raw;
  }));
  var e = t.map(function(a, i) {
    return a.horizontal ? r[i] : null;
  }).filter(function(a) {
    return a != null;
  }), n = t.map(function(a, i) {
    return a.vertical ? r[i] : null;
  }).filter(function(a) {
    return a != null;
  });
  return {
    horizontals: e,
    verticals: n
  };
}
var Kd = [
  [0, -1, "n"],
  [1, 0, "e"]
], Zd = [
  [-1, -1, "nw"],
  [0, -1, "n"],
  [1, -1, "ne"],
  [1, 0, "e"],
  [1, 1, "se"],
  [0, 1, "s"],
  [-1, 1, "sw"],
  [-1, 0, "w"]
];
function qi(t, r, e) {
  var n = t.props.clipRelative, a = t.state, i = a.width, o = a.height, s = r, u = s.type, f = s.poses, l = u === "rect", c = u === "circle";
  if (u === "polygon")
    return e.map(function(_) {
      return "".concat(Cr(_[0], i, n), " ").concat(Cr(_[1], o, n));
    });
  if (l || u === "inset") {
    var v = e[1][1], d = e[3][0], p = e[7][0], h = e[5][1];
    if (l)
      return [
        v,
        d,
        h,
        p
      ].map(function(_) {
        return "".concat(_, "px");
      });
    var g = [v, i - d, o - h, p].map(function(_, C) {
      return Cr(_, C % 2 ? i : o, n);
    });
    if (e.length > 8) {
      var y = I(ct(e[4], e[0]), 2), S = y[0], b = y[1];
      g.push.apply(g, Z(["round"], I(Xi(f.slice(8).map(function(_, C) {
        return P(P({}, _), { pos: e[C] });
      }), n, S, b, p, v, d, h).styles), !1));
    }
    return g;
  } else if (c || u === "ellipse") {
    var x = e[0], E = Cr(V(e[1][1] - x[1]), c ? Math.sqrt((i * i + o * o) / 2) : o, n), g = c ? [E] : [Cr(V(e[2][0] - x[0]), i, n), E];
    return g.push("at", Cr(x[0], i, n), Cr(x[1], o, n)), g;
  }
}
function ra(t, r, e, n) {
  var a = [n, (n + r) / 2, r], i = [t, (t + e) / 2, e];
  return Zd.map(function(o) {
    var s = I(o, 3), u = s[0], f = s[1], l = s[2], c = a[u + 1], v = i[f + 1];
    return {
      vertical: V(f),
      horizontal: V(u),
      direction: l,
      pos: [c, v]
    };
  });
}
function rf(t) {
  var r = [1 / 0, -1 / 0], e = [1 / 0, -1 / 0];
  return t.forEach(function(n) {
    var a = n.pos;
    r[0] = Math.min(r[0], a[0]), r[1] = Math.max(r[1], a[0]), e[0] = Math.min(e[0], a[1]), e[1] = Math.max(e[1], a[1]);
  }), [
    V(r[1] - r[0]),
    V(e[1] - e[0])
  ];
}
function ts(t, r, e, n, a) {
  var i, o, s, u, f, l, c, v, d;
  if (t) {
    var p = a;
    if (!p) {
      var h = vr(t), g = h("clipPath");
      p = g !== "none" ? g : h("clip");
    }
    if (!((!p || p === "none" || p === "auto") && (p = n, !p))) {
      var y = Fs(p), S = y.prefix, b = S === void 0 ? p : S, x = y.value, E = x === void 0 ? "" : x, _ = b === "circle", C = " ";
      if (b === "polygon") {
        var w = re(E || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
        C = ",";
        var R = w.map(function(O) {
          var Q = I(O.split(" "), 2), nt = Q[0], st = Q[1];
          return {
            vertical: 1,
            horizontal: 1,
            pos: [
              Bt(nt, r),
              Bt(st, e)
            ]
          };
        }), M = ie(R.map(function(O) {
          return O.pos;
        }));
        return {
          type: b,
          clipText: p,
          poses: R,
          splitter: C,
          left: M.minX,
          right: M.maxX,
          top: M.minY,
          bottom: M.maxY
        };
      } else if (_ || b === "ellipse") {
        var G = "", z = "", A = 0, N = 0, w = jr(E);
        if (_) {
          var B = "";
          i = I(w, 4), o = i[0], B = o === void 0 ? "50%" : o, s = i[2], G = s === void 0 ? "50%" : s, u = i[3], z = u === void 0 ? "50%" : u, A = Bt(B, Math.sqrt((r * r + e * e) / 2)), N = A;
        } else {
          var X = "", U = "";
          f = I(w, 5), l = f[0], X = l === void 0 ? "50%" : l, c = f[1], U = c === void 0 ? "50%" : c, v = f[3], G = v === void 0 ? "50%" : v, d = f[4], z = d === void 0 ? "50%" : d, A = Bt(X, r), N = Bt(U, e);
        }
        var j = [
          Bt(G, r),
          Bt(z, e)
        ], R = Z([
          {
            vertical: 1,
            horizontal: 1,
            pos: j,
            direction: "nesw"
          }
        ], I(Kd.slice(0, _ ? 1 : 2).map(function(nt) {
          return {
            vertical: V(nt[1]),
            horizontal: nt[0],
            direction: nt[2],
            sub: !0,
            pos: [
              j[0] + nt[0] * A,
              j[1] + nt[1] * N
            ]
          };
        })), !1);
        return {
          type: b,
          clipText: p,
          radiusX: A,
          radiusY: N,
          left: j[0] - A,
          top: j[1] - N,
          right: j[0] + A,
          bottom: j[1] + N,
          poses: R,
          splitter: C
        };
      } else if (b === "inset") {
        var w = jr(E || "0 0 0 0"), $ = w.indexOf("round"), D = ($ > -1 ? w.slice(0, $) : w).length, T = w.slice(D + 1), F = I(w.slice(0, D), 4), W = F[0], Y = F[1], K = Y === void 0 ? W : Y, L = F[2], et = L === void 0 ? W : L, rt = F[3], pt = rt === void 0 ? K : rt, Et = I([W, et].map(function(nt) {
          return Bt(nt, e);
        }), 2), J = Et[0], H = Et[1], bt = I([pt, K].map(function(nt) {
          return Bt(nt, r);
        }), 2), ut = bt[0], vt = bt[1], gt = r - vt, wt = e - H, Mt = tf(T, gt - ut, wt - J, ut, J), R = Z(Z([], I(ra(J, gt, wt, ut)), !1), I(Mt), !1);
        return {
          type: "inset",
          clipText: p,
          poses: R,
          top: J,
          left: ut,
          right: gt,
          bottom: wt,
          radius: T,
          splitter: C
        };
      } else if (b === "rect") {
        var w = re(E || "0px, ".concat(r, "px, ").concat(e, "px, 0px"));
        C = ",";
        var mt = I(w.map(function(Dt) {
          var ht = nn(Dt).value;
          return ht;
        }), 4), Rt = mt[0], vt = mt[1], H = mt[2], ut = mt[3], R = ra(Rt, vt, H, ut);
        return {
          type: "rect",
          clipText: p,
          poses: R,
          top: Rt,
          right: vt,
          bottom: H,
          left: ut,
          values: w,
          splitter: C
        };
      }
    }
  }
}
function Jd(t, r, e, n, a) {
  var i = t[r], o = i.direction, s = i.sub, u = t.map(function() {
    return [0, 0];
  }), f = o ? o.split("") : [];
  if (n && r < 8) {
    var l = f.filter(function(A) {
      return A === "w" || A === "e";
    }), c = f.filter(function(A) {
      return A === "n" || A === "s";
    }), v = l[0], d = c[0];
    u[r] = e;
    var p = I(rf(t), 2), h = p[0], g = p[1], y = h && g ? h / g : 0;
    if (y && a) {
      var S = (r + 4) % 8, b = t[S].pos, x = [0, 0];
      o.indexOf("w") > -1 ? x[0] = -1 : o.indexOf("e") > -1 && (x[0] = 1), o.indexOf("n") > -1 ? x[1] = -1 : o.indexOf("s") > -1 && (x[1] = 1);
      var E = Xu([h, g], e, y, x, !0), _ = h + E[0], C = g + E[1], w = b[1], R = b[1], M = b[0], G = b[0];
      x[0] === -1 ? M = G - _ : x[0] === 1 ? G = M + _ : (M = M - _ / 2, G = G + _ / 2), x[1] === -1 ? w = R - C : (x[1] === 1 || (w = R - C / 2), R = w + C);
      var z = ra(w, G, R, M);
      t.forEach(function(A, N) {
        u[N][0] = z[N].pos[0] - A.pos[0], u[N][1] = z[N].pos[1] - A.pos[1];
      });
    } else
      t.forEach(function(A, N) {
        var B = A.direction;
        B && (B.indexOf(v) > -1 && (u[N][0] = e[0]), B.indexOf(d) > -1 && (u[N][1] = e[1]));
      }), v && (u[1][0] = e[0] / 2, u[5][0] = e[0] / 2), d && (u[3][1] = e[1] / 2, u[7][1] = e[1] / 2);
  } else o && !s ? f.forEach(function(A) {
    var N = A === "n" || A === "s";
    t.forEach(function(B, X) {
      var U = B.direction, j = B.horizontal, $ = B.vertical;
      !U || U.indexOf(A) === -1 || (u[X] = [
        N || !j ? 0 : e[0],
        !N || !$ ? 0 : e[1]
      ]);
    });
  }) : u[r] = e;
  return u;
}
function Qd(t, r) {
  var e = I(iu(t, r), 2), n = e[0], a = e[1], i = r.datas, o = i.clipPath, s = i.clipIndex, u = o, f = u.type, l = u.poses, c = u.splitter, v = l.map(function(S) {
    return S.pos;
  });
  if (f === "polygon")
    v.splice(s, 0, [n, a]);
  else if (f === "inset") {
    var d = jd.indexOf(s), p = Xd.indexOf(s), h = l.length;
    if (Vd(l, v, 8, d, p, n, a, v[4][0], v[4][1], v[0][0], v[0][1]), h === l.length)
      return;
  } else
    return;
  var g = qi(t, o, v), y = "".concat(f, "(").concat(g.join(c), ")");
  at(t, "onClip", xt(t, r, P({ clipEventType: "added", clipType: f, poses: v, clipStyles: g, clipStyle: y, distX: 0, distY: 0 }, or({
    clipPath: y
  }, r))));
}
function tp(t, r) {
  var e = r.datas, n = e.clipPath, a = e.clipIndex, i = n, o = i.type, s = i.poses, u = i.splitter, f = s.map(function(d) {
    return d.pos;
  }), l = f.length;
  if (o === "polygon")
    s.splice(a, 1), f.splice(a, 1);
  else if (o === "inset") {
    if (a < 8 || (qd(s, f, a, 8, l), l === s.length))
      return;
  } else
    return;
  var c = qi(t, n, f), v = "".concat(o, "(").concat(c.join(u), ")");
  at(t, "onClip", xt(t, r, P({ clipEventType: "removed", clipType: o, poses: f, clipStyles: c, clipStyle: v, distX: 0, distY: 0 }, or({
    clipPath: v
  }, r))));
}
var rp = {
  name: "clippable",
  props: [
    "clippable",
    "defaultClipPath",
    "customClipPath",
    "keepRatio",
    "clipRelative",
    "clipArea",
    "dragWithClip",
    "clipTargetBounds",
    "clipVerticalGuidelines",
    "clipHorizontalGuidelines",
    "clipSnapThreshold"
  ],
  events: [
    "clipStart",
    "clip",
    "clipEnd"
  ],
  css: [
    `.control.clip-control {
background: #6d6;
cursor: pointer;
}
.control.clip-control.clip-radius {
background: #d66;
}
.line.clip-line {
background: #6e6;
cursor: move;
z-index: 1;
}
.clip-area {
position: absolute;
top: 0;
left: 0;
}
.clip-ellipse {
position: absolute;
cursor: move;
border: 1px solid #6d6;
border: var(--zoompx) solid #6d6;
border-radius: 50%;
transform-origin: 0px 0px;
}`,
    `:host {
--bounds-color: #d66;
}`,
    `.guideline {
pointer-events: none;
z-index: 2;
}`,
    `.line.guideline.bounds {
background: #d66;
background: var(--bounds-color);
}`
  ],
  render: function(t, r) {
    var e = t.props, n = e.customClipPath, a = e.defaultClipPath, i = e.clipArea, o = e.zoom, s = e.groupable, u = t.getState(), f = u.target, l = u.width, c = u.height, v = u.allMatrix, d = u.is3d, p = u.left, h = u.top, g = u.pos1, y = u.pos2, S = u.pos3, b = u.pos4, x = u.clipPathState, E = u.snapBoundInfos, _ = u.rotation;
    if (!f || s)
      return [];
    var C = ts(f, l, c, a || "inset", x || n);
    if (!C)
      return [];
    var w = d ? 4 : 3, R = C.type, M = C.poses, G = M.map(function(vt) {
      var gt = Lt(v, vt.pos, w);
      return [
        gt[0] - p,
        gt[1] - h
      ];
    }), z = [], A = [], N = R === "rect", B = R === "inset", X = R === "polygon";
    if (N || B || X) {
      var U = B ? G.slice(0, 8) : G;
      A = U.map(function(vt, gt) {
        var wt = gt === 0 ? U[U.length - 1] : U[gt - 1], Mt = Wt(wt, vt), mt = Bu(wt, vt);
        return r.createElement("div", { key: "clipLine".concat(gt), className: ft("line", "clip-line", "snap-control"), "data-clip-index": gt, style: {
          width: "".concat(mt, "px"),
          transform: "translate(".concat(wt[0], "px, ").concat(wt[1], "px) rotate(").concat(Mt, "rad) scaleY(").concat(o, ")")
        } });
      });
    }
    if (z = G.map(function(vt, gt) {
      return r.createElement("div", { key: "clipControl".concat(gt), className: ft("control", "clip-control", "snap-control"), "data-clip-index": gt, style: {
        transform: "translate(".concat(vt[0], "px, ").concat(vt[1], "px) rotate(").concat(_, "rad) scale(").concat(o, ")")
      } });
    }), B && z.push.apply(z, Z([], I(G.slice(8).map(function(vt, gt) {
      return r.createElement("div", { key: "clipRadiusControl".concat(gt), className: ft("control", "clip-control", "clip-radius", "snap-control"), "data-clip-index": 8 + gt, style: {
        transform: "translate(".concat(vt[0], "px, ").concat(vt[1], "px) rotate(").concat(_, "rad) scale(").concat(o, ")")
      } });
    })), !1)), R === "circle" || R === "ellipse") {
      var j = C.left, $ = C.top, D = C.radiusX, T = C.radiusY, F = I(ct(Lt(v, [j, $], w), Lt(v, [0, 0], w)), 2), W = F[0], Y = F[1], K = "none";
      if (!i) {
        for (var L = Math.max(10, D / 5, T / 5), et = [], rt = 0; rt <= L; ++rt) {
          var pt = Math.PI * 2 / L * rt;
          et.push([
            D + (D - o) * Math.cos(pt),
            T + (T - o) * Math.sin(pt)
          ]);
        }
        et.push([D, -2]), et.push([-2, -2]), et.push([-2, T * 2 + 2]), et.push([D * 2 + 2, T * 2 + 2]), et.push([D * 2 + 2, -2]), et.push([D, -2]), K = "polygon(".concat(et.map(function(vt) {
          return "".concat(vt[0], "px ").concat(vt[1], "px");
        }).join(", "), ")");
      }
      z.push(r.createElement("div", { key: "clipEllipse", className: ft("clip-ellipse", "snap-control"), style: {
        width: "".concat(D * 2, "px"),
        height: "".concat(T * 2, "px"),
        clipPath: K,
        transform: "translate(".concat(-p + W, "px, ").concat(-h + Y, "px) ").concat(da(v))
      } }));
    }
    if (i) {
      var Et = br(Z([g, y, S, b], I(G), !1)), J = Et.width, H = Et.height, bt = Et.left, ut = Et.top;
      if (X || N || B) {
        var et = B ? G.slice(0, 8) : G;
        z.push(r.createElement("div", { key: "clipArea", className: ft("clip-area", "snap-control"), style: {
          width: "".concat(J, "px"),
          height: "".concat(H, "px"),
          transform: "translate(".concat(bt, "px, ").concat(ut, "px)"),
          clipPath: "polygon(".concat(et.map(function(gt) {
            return "".concat(gt[0] - bt, "px ").concat(gt[1] - ut, "px");
          }).join(", "), ")")
        } }));
      }
    }
    return E && ["vertical", "horizontal"].forEach(function(vt) {
      var gt = E[vt], wt = vt === "horizontal";
      gt.isSnap && A.push.apply(A, Z([], I(gt.snap.posInfos.map(function(Mt, mt) {
        var Rt = Mt.pos, O = ct(Lt(v, wt ? [0, Rt] : [Rt, 0], w), [p, h]), Q = ct(Lt(v, wt ? [l, Rt] : [Rt, c], w), [p, h]);
        return Qe(r, "", O, Q, o, "clip".concat(vt, "snap").concat(mt), "guideline");
      })), !1)), gt.isBound && A.push.apply(A, Z([], I(gt.bounds.map(function(Mt, mt) {
        var Rt = Mt.pos, O = ct(Lt(v, wt ? [0, Rt] : [Rt, 0], w), [p, h]), Q = ct(Lt(v, wt ? [l, Rt] : [Rt, c], w), [p, h]);
        return Qe(r, "", O, Q, o, "clip".concat(vt, "bounds").concat(mt), "guideline", "bounds", "bold");
      })), !1));
    }), Z(Z([], I(z), !1), I(A), !1);
  },
  dragControlCondition: function(t, r) {
    return r.inputEvent && (r.inputEvent.target.getAttribute("class") || "").indexOf("clip") > -1;
  },
  dragStart: function(t, r) {
    var e = t.props, n = e.dragWithClip, a = n === void 0 ? !0 : n;
    return a ? !1 : this.dragControlStart(t, r);
  },
  drag: function(t, r) {
    return this.dragControl(t, P(P({}, r), { isDragTarget: !0 }));
  },
  dragEnd: function(t, r) {
    return this.dragControlEnd(t, r);
  },
  dragControlStart: function(t, r) {
    var e = t.state, n = t.props, a = n.defaultClipPath, i = n.customClipPath, o = e.target, s = e.width, u = e.height, f = r.inputEvent ? r.inputEvent.target : null, l = f && f.getAttribute("class") || "", c = r.datas, v = ts(o, s, u, a || "inset", i);
    if (!v)
      return !1;
    var d = v.clipText, p = v.type, h = v.poses, g = at(t, "onClipStart", xt(t, r, {
      clipType: p,
      clipStyle: d,
      poses: h.map(function(y) {
        return y.pos;
      })
    }));
    return g === !1 ? (c.isClipStart = !1, !1) : (c.isControl = l && l.indexOf("clip-control") > -1, c.isLine = l.indexOf("clip-line") > -1, c.isArea = l.indexOf("clip-area") > -1 || l.indexOf("clip-ellipse") > -1, c.clipIndex = f ? parseInt(f.getAttribute("data-clip-index"), 10) : -1, c.clipPath = v, c.isClipStart = !0, e.clipPathState = d, se(t, r), !0);
  },
  dragControl: function(t, r) {
    var e, n, a, i = r.datas, o = r.originalDatas, s = r.isDragTarget;
    if (!i.isClipStart)
      return !1;
    var u = i, f = u.isControl, l = u.isLine, c = u.isArea, v = u.clipIndex, d = u.clipPath;
    if (!d)
      return !1;
    var p = oe(t.props, "clippable"), h = p.keepRatio, g = 0, y = 0, S = o.draggable, b = zr(r);
    s && S ? (e = I(S.prevBeforeDist, 2), g = e[0], y = e[1]) : (n = I(b, 2), g = n[0], y = n[1]);
    var x = [g, y], E = t.state, _ = E.width, C = E.height, w = !c && !f && !l, R = d.type, M = d.poses, G = d.splitter, z = M.map(function(zt) {
      return zt.pos;
    });
    w && (g = -g, y = -y);
    var A = !f || M[v].direction === "nesw", N = R === "inset" || R === "rect", B = M.map(function() {
      return [0, 0];
    });
    if (f && !A) {
      var X = M[v], U = X.horizontal, j = X.vertical, $ = [
        g * V(U),
        y * V(j)
      ];
      B = Jd(M, v, $, N, h);
    } else A && (B = z.map(function() {
      return [g, y];
    }));
    var D = z.map(function(zt, qt) {
      return Tt(zt, B[qt]);
    }), T = Z([], I(D), !1);
    E.snapBoundInfos = null;
    var F = d.type === "circle", W = d.type === "ellipse";
    if (F || W) {
      var Y = br(D), K = V(Y.bottom - Y.top), L = V(W ? Y.right - Y.left : K), et = D[0][1] + K, rt = D[0][0] - L, pt = D[0][0] + L;
      F && (T.push([pt, Y.bottom]), B.push([1, 0])), T.push([Y.left, et]), B.push([0, 1]), T.push([rt, Y.bottom]), B.push([1, 0]);
    }
    var Et = Pu((p.clipHorizontalGuidelines || []).map(function(zt) {
      return Bt("".concat(zt), C);
    }), (p.clipVerticalGuidelines || []).map(function(zt) {
      return Bt("".concat(zt), _);
    }), _, C), J = [], H = [];
    if (F || W)
      J = [T[4][0], T[2][0]], H = [T[1][1], T[3][1]];
    else if (N) {
      var bt = [T[0], T[2], T[4], T[6]], ut = [B[0], B[2], B[4], B[6]];
      J = bt.filter(function(zt, qt) {
        return ut[qt][0];
      }).map(function(zt) {
        return zt[0];
      }), H = bt.filter(function(zt, qt) {
        return ut[qt][1];
      }).map(function(zt) {
        return zt[1];
      });
    } else
      J = T.filter(function(zt, qt) {
        return B[qt][0];
      }).map(function(zt) {
        return zt[0];
      }), H = T.filter(function(zt, qt) {
        return B[qt][1];
      }).map(function(zt) {
        return zt[1];
      });
    var vt = [0, 0], gt = No(Et, p.clipTargetBounds && { left: 0, top: 0, right: _, bottom: C }, J, H, 5, 5), wt = gt.horizontal, Mt = gt.vertical, mt = wt.offset, Rt = Mt.offset;
    if (wt.isBound && (vt[1] += mt), Mt.isBound && (vt[0] += Rt), (W || F) && B[0][0] === 0 && B[0][1] === 0) {
      var Y = br(D), O = Y.bottom - Y.top, Q = W ? Y.right - Y.left : O, nt = Mt.isBound ? V(Rt) : Mt.snapIndex === 0 ? -Rt : Rt, st = wt.isBound ? V(mt) : wt.snapIndex === 0 ? -mt : mt;
      Q -= nt, O -= st, F && (O = _u(Mt, wt) > 0 ? O : Q, Q = O);
      var _t = T[0];
      T[1][1] = _t[1] - O, T[2][0] = _t[0] + Q, T[3][1] = _t[1] + O, T[4][0] = _t[0] - Q;
    } else if (N && h && f) {
      var Dt = I(rf(M), 2), ht = Dt[0], dt = Dt[1], ur = ht && dt ? ht / dt : 0, Xt = M[v], Kt = Xt.direction || "", Er = T[1][1], et = T[5][1], rt = T[7][0], pt = T[3][0];
      V(mt) <= V(Rt) ? mt = ir(mt) * V(Rt) / ur : Rt = ir(Rt) * V(mt) * ur, Kt.indexOf("w") > -1 ? rt -= Rt : Kt.indexOf("e") > -1 ? pt -= Rt : (rt += Rt / 2, pt -= Rt / 2), Kt.indexOf("n") > -1 ? Er -= mt : Kt.indexOf("s") > -1 ? et -= mt : (Er += mt / 2, et -= mt / 2);
      var dr = ra(Er, pt, et, rt);
      T.forEach(function(pn, hn) {
        var le;
        le = I(dr[hn].pos, 2), pn[0] = le[0], pn[1] = le[1];
      });
    } else
      T.forEach(function(zt, qt) {
        var fe = B[qt];
        fe[0] && (zt[0] -= Rt), fe[1] && (zt[1] -= mt);
      });
    var Tr = qi(t, d, D), tr = "".concat(R, "(").concat(Tr.join(G), ")");
    if (E.clipPathState = tr, F || W)
      J = [T[4][0], T[2][0]], H = [T[1][1], T[3][1]];
    else if (N) {
      var bt = [T[0], T[2], T[4], T[6]];
      J = bt.map(function(qt) {
        return qt[0];
      }), H = bt.map(function(qt) {
        return qt[1];
      });
    } else
      J = T.map(function(zt) {
        return zt[0];
      }), H = T.map(function(zt) {
        return zt[1];
      });
    if (E.snapBoundInfos = No(Et, p.clipTargetBounds && { left: 0, top: 0, right: _, bottom: C }, J, H, 1, 1), S) {
      var cn = E.is3d, vn = E.allMatrix, dn = cn ? 4 : 3, Ur = vt;
      s && (Ur = [
        x[0] + vt[0] - b[0],
        x[1] + vt[1] - b[1]
      ]), S.deltaOffset = Nt(vn, [Ur[0], Ur[1], 0, 0], dn);
    }
    return at(t, "onClip", xt(t, r, P({ clipEventType: "changed", clipType: R, poses: D, clipStyle: tr, clipStyles: Tr, distX: g, distY: y }, or((a = {}, a[R === "rect" ? "clip" : "clipPath"] = tr, a), r)))), !0;
  },
  dragControlEnd: function(t, r) {
    this.unset(t);
    var e = r.isDrag, n = r.datas, a = r.isDouble, i = n.isLine, o = n.isClipStart, s = n.isControl;
    return o ? (at(t, "onClipEnd", yr(t, r, {})), a && (s ? tp(t, r) : i && Qd(t, r)), a || e) : !1;
  },
  unset: function(t) {
    t.state.clipPathState = "", t.state.snapBoundInfos = null;
  }
}, ep = {
  name: "originDraggable",
  props: [
    "originDraggable",
    "originRelative"
  ],
  events: [
    "dragOriginStart",
    "dragOrigin",
    "dragOriginEnd"
  ],
  css: [
    `:host[data-able-origindraggable] .control.origin {
pointer-events: auto;
}`
  ],
  dragControlCondition: function(t, r) {
    return r.isRequest ? r.requestAble === "originDraggable" : Vt(r.inputEvent.target, ft("origin"));
  },
  dragControlStart: function(t, r) {
    var e = r.datas;
    se(t, r);
    var n = xt(t, r, {
      dragStart: ar.dragStart(t, new xe().dragStart([0, 0], r))
    }), a = at(t, "onDragOriginStart", n);
    return e.startOrigin = t.state.transformOrigin, e.startTargetOrigin = t.state.targetOrigin, e.prevOrigin = [0, 0], e.isDragOrigin = !0, a === !1 ? (e.isDragOrigin = !1, !1) : n;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.isRequest;
    if (!e.isDragOrigin)
      return !1;
    var i = I(zr(r), 2), o = i[0], s = i[1], u = t.state, f = u.width, l = u.height, c = u.offsetMatrix, v = u.targetMatrix, d = u.is3d, p = t.props.originRelative, h = p === void 0 ? !0 : p, g = d ? 4 : 3, y = [o, s];
    if (a) {
      var S = r.distOrigin;
      (S[0] || S[1]) && (y = S);
    }
    var b = Tt(e.startOrigin, y), x = Tt(e.startTargetOrigin, y), E = ct(y, e.prevOrigin), _ = ln(c, v, b, g), C = t.getRect(), w = br(ue(_, f, l, g)), R = [
      C.left - w.left,
      C.top - w.top
    ];
    e.prevOrigin = y;
    var M = [
      Cr(x[0], f, h),
      Cr(x[1], l, h)
    ].join(" "), G = ar.drag(t, fn(r, t.state, R, !!n)), z = xt(t, r, P(P({ width: f, height: l, origin: b, dist: y, delta: E, transformOrigin: M, drag: G }, or({
      transformOrigin: M,
      transform: G.transform
    }, r)), { afterTransform: G.transform }));
    return at(t, "onDragOrigin", z), z;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    return e.isDragOrigin ? (at(t, "onDragOriginEnd", yr(t, r, {})), !0) : !1;
  },
  dragGroupControlCondition: function(t, r) {
    return this.dragControlCondition(t, r);
  },
  dragGroupControlStart: function(t, r) {
    var e = this.dragControlStart(t, r);
    return !!e;
  },
  dragGroupControl: function(t, r) {
    var e = this.dragControl(t, r);
    return e ? (t.transformOrigin = e.transformOrigin, !0) : !1;
  },
  /**
      * @method Moveable.OriginDraggable#request
      * @param {object} e - the OriginDraggable's request parameter
      * @param {number} [e.x] - x position
      * @param {number} [e.y] - y position
      * @param {number} [e.deltaX] - x number to move
      * @param {number} [e.deltaY] - y number to move
      * @param {array} [e.deltaOrigin] - left, top number to move transform-origin
      * @param {array} [e.origin] - transform-origin position
      * @param {number} [e.isInstant] - Whether to execute the request instantly
      * @return {Moveable.Requester} Moveable Requester
      * @example
  
      * // Instantly Request (requestStart - request - requestEnd)
      * // Use Relative Value
      * moveable.request("originDraggable", { deltaX: 10, deltaY: 10 }, true);
      * // Use Absolute Value
      * moveable.request("originDraggable", { x: 200, y: 100 }, true);
      * // Use Transform Value
      * moveable.request("originDraggable", { deltaOrigin: [10, 0] }, true);
      * moveable.request("originDraggable", { origin: [100, 0] }, true);
      * // requestStart
      * const requester = moveable.request("originDraggable");
      *
      * // request
      * // Use Relative Value
      * requester.request({ deltaX: 10, deltaY: 10 });
      * requester.request({ deltaX: 10, deltaY: 10 });
      * requester.request({ deltaX: 10, deltaY: 10 });
      * // Use Absolute Value
      * moveable.request("originDraggable", { x: 200, y: 100 });
      * moveable.request("originDraggable", { x: 220, y: 100 });
      * moveable.request("originDraggable", { x: 240, y: 100 });
      *
      * // requestEnd
      * requester.requestEnd();
      */
  request: function(t) {
    var r = {}, e = t.getRect(), n = 0, a = 0, i = e.transformOrigin, o = [0, 0];
    return {
      isControl: !0,
      requestStart: function() {
        return { datas: r };
      },
      request: function(s) {
        return "deltaOrigin" in s ? (o[0] += s.deltaOrigin[0], o[1] += s.deltaOrigin[1]) : "origin" in s ? (o[0] = s.origin[0] - i[0], o[1] = s.origin[1] - i[1]) : ("x" in s ? n = s.x - e.left : "deltaX" in s && (n += s.deltaX), "y" in s ? a = s.y - e.top : "deltaY" in s && (a += s.deltaY)), { datas: r, distX: n, distY: a, distOrigin: o };
      },
      requestEnd: function() {
        return { datas: r, isDrag: !0 };
      }
    };
  }
};
function np(t, r, e, n) {
  var a = t.filter(function(u) {
    var f = u.virtual, l = u.horizontal;
    return l && !f;
  }).length, i = t.filter(function(u) {
    var f = u.virtual, l = u.vertical;
    return l && !f;
  }).length, o = -1;
  if (r === 0 && (a === 0 ? o = 0 : a === 1 && (o = 1)), r === 2 && (a <= 2 ? o = 2 : a <= 3 && (o = 3)), r === 3 && (i === 0 ? o = 4 : i < 4 && (o = 7)), r === 1 && (i <= 1 ? o = 5 : i <= 2 && (o = 6)), !(o === -1 || !t[o].virtual)) {
    var s = t[o];
    ap(t, o), o < 4 ? s.pos[0] = e : s.pos[1] = n;
  }
}
function ap(t, r) {
  r < 4 ? t.slice(0, r + 1).forEach(function(e) {
    e.virtual = !1;
  }) : (t[0].virtual && (t[0].virtual = !1), t.slice(4, r + 1).forEach(function(e) {
    e.virtual = !1;
  }));
}
function ip(t, r) {
  r < 4 ? t.slice(r, 4).forEach(function(e) {
    e.virtual = !0;
  }) : t.slice(r).forEach(function(e) {
    e.virtual = !0;
  });
}
function rs(t, r, e, n, a) {
  n === void 0 && (n = [0, 0]);
  var i = [];
  return !t || t === "0px" ? i = [] : i = jr(t), tf(i, r, e, 0, 0, n, a);
}
function es(t, r, e, n, a) {
  var i = t.state, o = i.width, s = i.height, u = Xi(a, t.props.roundRelative, o, s), f = u.raws, l = u.styles, c = u.radiusPoses, v = Ud(c, f), d = v.horizontals, p = v.verticals, h = l.join(" ");
  i.borderRadiusState = h;
  var g = xt(t, r, P({ horizontals: d, verticals: p, borderRadius: h, width: o, height: s, delta: n, dist: e }, or({
    borderRadius: h
  }, r)));
  return at(t, "onRound", g), g;
}
function ns(t) {
  var r, e, n = t.getState().style, a = n.borderRadius || "";
  if (!a && t.props.groupable) {
    var i = t.moveables[0], o = t.getTargets()[0];
    o && (i?.props.target === o ? (a = (e = (r = t.moveables[0]) === null || r === void 0 ? void 0 : r.state.style.borderRadius) !== null && e !== void 0 ? e : "", n.borderRadius = a) : (a = Yi(o).borderRadius, n.borderRadius = a));
  }
  return a;
}
var op = {
  name: "roundable",
  props: [
    "roundable",
    "roundRelative",
    "minRoundControls",
    "maxRoundControls",
    "roundClickable",
    "roundPadding",
    "isDisplayShadowRoundControls"
  ],
  events: [
    "roundStart",
    "round",
    "roundEnd",
    "roundGroupStart",
    "roundGroup",
    "roundGroupEnd"
  ],
  css: [
    `.control.border-radius {
background: #d66;
cursor: pointer;
z-index: 3;
}`,
    `.control.border-radius.vertical {
background: #d6d;
z-index: 2;
}`,
    `.control.border-radius.virtual {
opacity: 0.5;
z-index: 1;
}`,
    `:host.round-line-clickable .line.direction {
cursor: pointer;
}`
  ],
  className: function(t) {
    var r = t.props.roundClickable;
    return r === !0 || r === "line" ? ft("round-line-clickable") : "";
  },
  requestStyle: function() {
    return ["borderRadius"];
  },
  requestChildStyle: function() {
    return ["borderRadius"];
  },
  render: function(t, r) {
    var e = t.getState(), n = e.target, a = e.width, i = e.height, o = e.allMatrix, s = e.is3d, u = e.left, f = e.top, l = e.borderRadiusState, c = t.props, v = c.minRoundControls, d = v === void 0 ? [0, 0] : v, p = c.maxRoundControls, h = p === void 0 ? [4, 4] : p, g = c.zoom, y = c.roundPadding, S = y === void 0 ? 0 : y, b = c.isDisplayShadowRoundControls, x = c.groupable;
    if (!n)
      return null;
    var E = l || ns(t), _ = s ? 4 : 3, C = rs(E, a, i, d, !0);
    if (!C)
      return null;
    var w = 0, R = 0, M = x ? [0, 0] : [u, f];
    return C.map(function(G, z) {
      var A = G.horizontal, N = G.vertical, B = G.direction || "", X = Z([], I(G.pos), !1);
      R += Math.abs(A), w += Math.abs(N), A && B.indexOf("n") > -1 && (X[1] -= S), N && B.indexOf("w") > -1 && (X[0] -= S), A && B.indexOf("s") > -1 && (X[1] += S), N && B.indexOf("e") > -1 && (X[0] += S);
      var U = ct(Lt(o, X, _), M), j = b && b !== "horizontal", $ = G.vertical ? w <= h[1] && (j || !G.virtual) : R <= h[0] && (b || !G.virtual);
      return r.createElement("div", { key: "borderRadiusControl".concat(z), className: ft("control", "border-radius", G.vertical ? "vertical" : "", G.virtual ? "virtual" : ""), "data-radius-index": z, style: {
        display: $ ? "block" : "none",
        transform: "translate(".concat(U[0], "px, ").concat(U[1], "px) scale(").concat(g, ")")
      } });
    });
  },
  dragControlCondition: function(t, r) {
    if (!r.inputEvent || r.isRequest)
      return !1;
    var e = r.inputEvent.target.getAttribute("class") || "";
    return e.indexOf("border-radius") > -1 || e.indexOf("moveable-line") > -1 && e.indexOf("moveable-direction") > -1;
  },
  dragGroupControlCondition: function(t, r) {
    return this.dragControlCondition(t, r);
  },
  dragControlStart: function(t, r) {
    var e = r.inputEvent, n = r.datas, a = e.target, i = a.getAttribute("class") || "", o = i.indexOf("border-radius") > -1, s = i.indexOf("moveable-line") > -1 && i.indexOf("moveable-direction") > -1, u = o ? parseInt(a.getAttribute("data-radius-index"), 10) : -1, f = -1;
    if (s) {
      var l = a.getAttribute("data-line-key") || "";
      l && (f = parseInt(l.replace(/render-line-/g, ""), 10), isNaN(f) && (f = -1));
    }
    if (!o && !s)
      return !1;
    var c = xt(t, r, {}), v = at(t, "onRoundStart", c);
    if (v === !1)
      return !1;
    n.lineIndex = f, n.controlIndex = u, n.isControl = o, n.isLine = s, se(t, r);
    var d = t.props, p = d.roundRelative, h = d.minRoundControls, g = h === void 0 ? [0, 0] : h, y = t.state, S = y.width, b = y.height;
    n.isRound = !0, n.prevDist = [0, 0];
    var x = ns(t), E = rs(x || "", S, b, g, !0) || [];
    return n.controlPoses = E, y.borderRadiusState = Xi(E, p, S, b).styles.join(" "), c;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = e.controlPoses;
    if (!e.isRound || !e.isControl || !n.length)
      return !1;
    var a = e.controlIndex, i = I(zr(r), 2), o = i[0], s = i[1], u = [o, s], f = ct(u, e.prevDist), l = t.props.maxRoundControls, c = l === void 0 ? [4, 4] : l, v = t.state, d = v.width, p = v.height, h = n[a], g = h.vertical, y = h.horizontal, S = n.map(function(x) {
      var E = x.horizontal, _ = x.vertical, C = [
        E * y * u[0],
        _ * g * u[1]
      ];
      if (E) {
        if (c[0] === 1)
          return C;
        if (c[0] < 4 && E !== y)
          return C;
      } else {
        if (c[1] === 0)
          return C[1] = _ * y * u[0] / d * p, C;
        if (g) {
          if (c[1] === 1)
            return C;
          if (c[1] < 4 && _ !== g)
            return C;
        }
      }
      return [0, 0];
    });
    S[a] = u;
    var b = n.map(function(x, E) {
      return P(P({}, x), { pos: Tt(x.pos, S[E]) });
    });
    return a < 4 ? b.slice(0, a + 1).forEach(function(x) {
      x.virtual = !1;
    }) : b.slice(4, a + 1).forEach(function(x) {
      x.virtual = !1;
    }), e.prevDist = [o, s], es(t, r, u, f, b);
  },
  dragControlEnd: function(t, r) {
    var e = t.state;
    e.borderRadiusState = "";
    var n = r.datas, a = r.isDouble;
    if (!n.isRound)
      return !1;
    var i = n.isControl, o = n.controlIndex, s = n.isLine, u = n.lineIndex, f = n.controlPoses, l = f.filter(function(y) {
      var S = y.virtual;
      return S;
    }).length, c = t.props.roundClickable, v = c === void 0 ? !0 : c;
    if (a && v) {
      if (i && (v === !0 || v === "control"))
        ip(f, o);
      else if (s && (v === !0 || v === "line")) {
        var d = I(iu(t, r), 2), p = d[0], h = d[1];
        np(f, u, p, h);
      }
      l !== f.filter(function(y) {
        var S = y.virtual;
        return S;
      }).length && es(t, r, [0, 0], [0, 0], f);
    }
    var g = yr(t, r, {});
    return at(t, "onRoundEnd", g), e.borderRadiusState = "", g;
  },
  dragGroupControlStart: function(t, r) {
    var e = this.dragControlStart(t, r);
    if (!e)
      return !1;
    var n = t.moveables, a = t.props.targets, i = wr(t, "roundable", r), o = P({ targets: t.props.targets, events: i.map(function(s, u) {
      return P(P({}, s), { target: a[u], moveable: n[u], currentTarget: n[u] });
    }) }, e);
    return at(t, "onRoundGroupStart", o), e;
  },
  dragGroupControl: function(t, r) {
    var e = this.dragControl(t, r);
    if (!e)
      return !1;
    var n = t.moveables, a = t.props.targets, i = wr(t, "roundable", r), o = P({ targets: t.props.targets, events: i.map(function(s, u) {
      return P(P(P({}, s), { target: a[u], moveable: n[u], currentTarget: n[u] }), or({
        borderRadius: e.borderRadius
      }, s));
    }) }, e);
    return at(t, "onRoundGroup", o), o;
  },
  dragGroupControlEnd: function(t, r) {
    var e = t.moveables, n = t.props.targets, a = wr(t, "roundable", r);
    pa(t, "onRound", function(s) {
      var u = P({ targets: t.props.targets, events: a.map(function(f, l) {
        return P(P(P({}, f), { target: n[l], moveable: e[l], currentTarget: e[l] }), or({
          borderRadius: s.borderRadius
        }, f));
      }) }, s);
      at(t, "onRoundGroup", u);
    });
    var i = this.dragControlEnd(t, r);
    if (!i)
      return !1;
    var o = P({ targets: t.props.targets, events: a.map(function(s, u) {
      var f;
      return P(P({}, s), { target: n[u], moveable: e[u], currentTarget: e[u], lastEvent: (f = s.datas) === null || f === void 0 ? void 0 : f.lastEvent });
    }) }, i);
    return at(t, "onRoundGroupEnd", o), o;
  },
  unset: function(t) {
    t.state.borderRadiusState = "";
  }
};
function sp(t, r) {
  var e = r ? 4 : 3, n = Ft(e), a = "matrix".concat(r ? "3d" : "", "(").concat(n.join(","), ")");
  return t === a || t === "matrix(1,0,0,1,0,0)";
}
var ef = {
  isPinch: !0,
  name: "beforeRenderable",
  props: [],
  events: [
    "beforeRenderStart",
    "beforeRender",
    "beforeRenderEnd",
    "beforeRenderGroupStart",
    "beforeRenderGroup",
    "beforeRenderGroupEnd"
  ],
  dragRelation: "weak",
  setTransform: function(t, r) {
    var e = t.state, n = e.is3d, a = e.targetMatrix, i = e.inlineTransform, o = n ? "matrix3d(".concat(a.join(","), ")") : "matrix(".concat(qs(a, !0), ")"), s = !i || i === "none" ? o : i;
    r.datas.startTransforms = sp(s, n) ? [] : jr(s);
  },
  resetStyle: function(t) {
    var r = t.datas;
    r.nextStyle = {}, r.nextTransforms = t.datas.startTransforms, r.nextTransformAppendedIndexes = [];
  },
  fillDragStartParams: function(t, r) {
    return xt(t, r, {
      setTransform: function(e) {
        r.datas.startTransforms = Zt(e) ? e : jr(e);
      },
      isPinch: !!r.isPinch
    });
  },
  fillDragParams: function(t, r) {
    return xt(t, r, {
      isPinch: !!r.isPinch
    });
  },
  dragStart: function(t, r) {
    this.setTransform(t, r), this.resetStyle(r), at(t, "onBeforeRenderStart", this.fillDragStartParams(t, r));
  },
  drag: function(t, r) {
    r.datas.startTransforms || this.setTransform(t, r), this.resetStyle(r), at(t, "onBeforeRender", xt(t, r, {
      isPinch: !!r.isPinch
    }));
  },
  dragEnd: function(t, r) {
    r.datas.startTransforms || (this.setTransform(t, r), this.resetStyle(r)), at(t, "onBeforeRenderEnd", xt(t, r, {
      isPinch: !!r.isPinch,
      isDrag: r.isDrag
    }));
  },
  dragGroupStart: function(t, r) {
    var e = this;
    this.dragStart(t, r);
    var n = wr(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.setTransform(u, o), e.resetStyle(o), e.fillDragStartParams(u, o);
    });
    at(t, "onBeforeRenderGroupStart", xt(t, r, {
      isPinch: !!r.isPinch,
      targets: t.props.targets,
      setTransform: function() {
      },
      events: i
    }));
  },
  dragGroup: function(t, r) {
    var e = this;
    this.drag(t, r);
    var n = wr(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.resetStyle(o), e.fillDragParams(u, o);
    });
    at(t, "onBeforeRenderGroup", xt(t, r, {
      isPinch: !!r.isPinch,
      targets: t.props.targets,
      events: i
    }));
  },
  dragGroupEnd: function(t, r) {
    this.dragEnd(t, r), at(t, "onBeforeRenderGroupEnd", xt(t, r, {
      isPinch: !!r.isPinch,
      isDrag: r.isDrag,
      targets: t.props.targets
    }));
  },
  dragControlStart: function(t, r) {
    return this.dragStart(t, r);
  },
  dragControl: function(t, r) {
    return this.drag(t, r);
  },
  dragControlEnd: function(t, r) {
    return this.dragEnd(t, r);
  },
  dragGroupControlStart: function(t, r) {
    return this.dragGroupStart(t, r);
  },
  dragGroupControl: function(t, r) {
    return this.dragGroup(t, r);
  },
  dragGroupControlEnd: function(t, r) {
    return this.dragGroupEnd(t, r);
  }
}, nf = {
  name: "renderable",
  props: [],
  events: [
    "renderStart",
    "render",
    "renderEnd",
    "renderGroupStart",
    "renderGroup",
    "renderGroupEnd"
  ],
  dragRelation: "weak",
  dragStart: function(t, r) {
    at(t, "onRenderStart", xt(t, r, {
      isPinch: !!r.isPinch
    }));
  },
  drag: function(t, r) {
    at(t, "onRender", this.fillDragParams(t, r));
  },
  dragAfter: function(t, r) {
    return this.drag(t, r);
  },
  dragEnd: function(t, r) {
    at(t, "onRenderEnd", this.fillDragEndParams(t, r));
  },
  dragGroupStart: function(t, r) {
    at(t, "onRenderGroupStart", xt(t, r, {
      isPinch: !!r.isPinch,
      targets: t.props.targets
    }));
  },
  dragGroup: function(t, r) {
    var e = this, n = wr(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.fillDragParams(u, o);
    });
    at(t, "onRenderGroup", xt(t, r, P(P({ isPinch: !!r.isPinch, targets: t.props.targets, transform: On(r), transformObject: {} }, or(Pn(r))), { events: i })));
  },
  dragGroupEnd: function(t, r) {
    var e = this, n = wr(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.fillDragEndParams(u, o);
    });
    at(t, "onRenderGroupEnd", xt(t, r, P({ isPinch: !!r.isPinch, isDrag: r.isDrag, targets: t.props.targets, events: i, transformObject: {}, transform: On(r) }, or(Pn(r)))));
  },
  dragControlStart: function(t, r) {
    return this.dragStart(t, r);
  },
  dragControl: function(t, r) {
    return this.drag(t, r);
  },
  dragControlAfter: function(t, r) {
    return this.dragAfter(t, r);
  },
  dragControlEnd: function(t, r) {
    return this.dragEnd(t, r);
  },
  dragGroupControlStart: function(t, r) {
    return this.dragGroupStart(t, r);
  },
  dragGroupControl: function(t, r) {
    return this.dragGroup(t, r);
  },
  dragGroupControlEnd: function(t, r) {
    return this.dragGroupEnd(t, r);
  },
  fillDragParams: function(t, r) {
    var e = {};
    return be(Vn(r) || []).forEach(function(n) {
      e[n.name] = n.functionValue;
    }), xt(t, r, P({ isPinch: !!r.isPinch, transformObject: e, transform: On(r) }, or(Pn(r))));
  },
  fillDragEndParams: function(t, r) {
    var e = {};
    return be(Vn(r) || []).forEach(function(n) {
      e[n.name] = n.functionValue;
    }), xt(t, r, P({ isPinch: !!r.isPinch, isDrag: r.isDrag, transformObject: e, transform: On(r) }, or(Pn(r))));
  }
};
function $e(t, r, e, n, a, i, o) {
  i.clientDistX = i.distX, i.clientDistY = i.distY;
  var s = a === "Start", u = a === "End", f = a === "After", l = t.state.target, c = i.isRequest, v = n.indexOf("Control") > -1;
  if (!l || s && v && !c && t.areaElement === i.inputEvent.target)
    return !1;
  var d = Z([], I(r), !1);
  if (c) {
    var p = i.requestAble;
    d.some(function(z) {
      return z.name === p;
    }) || d.push.apply(d, Z([], I(t.props.ables.filter(function(z) {
      return z.name === p;
    })), !1));
  }
  if (!d.length || d.every(function(z) {
    return z.dragRelation;
  }))
    return !1;
  var h = i.inputEvent, g;
  u && h && (g = document.elementFromPoint(i.clientX, i.clientY) || h.target);
  var y = !1, S = function() {
    var z;
    y = !0, (z = i.stop) === null || z === void 0 || z.call(i);
  }, b = s && (!t.targetGesto || !t.controlGesto || !t.targetGesto.isFlag() || !t.controlGesto.isFlag());
  b && t.updateRect(a, !0, !1);
  var x = i.datas, E = v ? "controlGesto" : "targetGesto", _ = t[E], C = function(z, A, N) {
    if (!(A in z) || _ !== t[E])
      return !1;
    var B = z.name, X = x[B] || (x[B] = {});
    if (s && (X.isEventStart = !N || !z[N] || z[N](t, i)), !X.isEventStart)
      return !1;
    var U = z[A](t, P(P({}, i), { stop: S, datas: X, originalDatas: x, inputTarget: g }));
    return t._emitter.off(), s && U === !1 && (X.isEventStart = !1), U;
  };
  b && d.forEach(function(z) {
    z.unset && z.unset(t);
  }), C(ef, "drag".concat(n).concat(a));
  var w = 0, R = 0;
  e.forEach(function(z) {
    if (y)
      return !1;
    var A = "".concat(z).concat(n).concat(a), N = "".concat(z).concat(n, "Condition");
    a === "" && !c && Od(t.state, i);
    var B = d.filter(function(j) {
      return j[A];
    });
    B = B.filter(function(j, $) {
      return j.name && B.indexOf(j) === $;
    });
    var X = B.filter(function(j) {
      return C(j, A, N);
    }), U = X.length;
    y && ++w, U && ++R, !y && s && B.length && !U && (w += B.filter(function(j) {
      var $ = j.name, D = x[$];
      return D.isEventStart ? j.dragRelation !== "strong" : !1;
    }).length ? 1 : 0);
  }), (!f || R) && C(nf, "drag".concat(n).concat(a));
  var M = _ !== t[E] || w === e.length;
  if ((u || y || M) && (t.state.gestos = {}, t.moveables && t.moveables.forEach(function(z) {
    z.state.gestos = {};
  }), d.forEach(function(z) {
    z.unset && z.unset(t);
  })), s && !M && !c && R && t.props.preventDefault && i?.preventDefault(), t.isUnmounted || M)
    return !1;
  if (!s && R && !o || u) {
    var G = t.props.flushSync || ku;
    G(function() {
      t.updateRect(u ? a : "", !0, !1), t.forceUpdate();
    });
  }
  return !s && !u && !f && R && !o && $e(t, r, e, n, a + "After", i), !0;
}
function Vi(t, r) {
  return function(e, n) {
    var a;
    n === void 0 && (n = e.inputEvent.target);
    var i = n, o = t.areaElement, s = t._dragTarget;
    return !s || !r && (!((a = t.controlGesto) === null || a === void 0) && a.isFlag()) ? !1 : i === s || s.contains(i) || i === o || !t.isMoveableElement(i) && !t.controlBox.contains(i) || Vt(i, "moveable-area") || Vt(i, "moveable-padding") || Vt(i, "moveable-edgeDraggable");
  };
}
function af(t, r, e) {
  var n = t.controlBox, a = [], i = t.props, o = i.dragArea, s = t.state.target, u = i.dragTarget;
  a.push(n), (!o || u) && a.push(r), !o && u && s && r !== s && i.dragTargetSelf && a.push(s);
  var f = Vi(t);
  return sf(t, a, "targetAbles", e, {
    dragStart: f,
    pinchStart: f
  });
}
function of(t, r) {
  var e = t.controlBox, n = [];
  n.push(e);
  var a = Vi(t, !0), i = function(o, s) {
    if (s === void 0 && (s = o.inputEvent.target), s === e)
      return !0;
    var u = a(o, s);
    return !u;
  };
  return sf(t, n, "controlAbles", r, {
    dragStart: i,
    pinchStart: i
  });
}
function sf(t, r, e, n, a) {
  a === void 0 && (a = {});
  var i = e === "targetAbles", o = t.props, s = o.pinchOutside, u = o.pinchThreshold, f = o.preventClickEventOnDrag, l = o.preventClickDefault, c = o.checkInput, v = o.dragFocusedInput, d = o.preventDefault, p = d === void 0 ? !0 : d, h = o.preventRightClick, g = h === void 0 ? !0 : h, y = o.preventWheelClick, S = y === void 0 ? !0 : y, b = o.dragContainer, x = Ir(b, !0), E = {
    preventDefault: p,
    preventRightClick: g,
    preventWheelClick: S,
    container: x || $r(t.getControlBoxElement()),
    pinchThreshold: u,
    pinchOutside: s,
    preventClickEventOnDrag: i ? f : !1,
    preventClickEventOnDragStart: i ? l : !1,
    preventClickEventByCondition: i ? null : function(w) {
      return t.controlBox.contains(w.target);
    },
    checkInput: i ? c : !1,
    dragFocusedInput: v
  }, _ = new Ic(r, E), C = n === "Control";
  return ["drag", "pinch"].forEach(function(w) {
    ["Start", "", "End"].forEach(function(R) {
      _.on("".concat(w).concat(R), function(M) {
        var G, z = M.eventType, A = w === "drag" && M.isPinch;
        if (a[z] && !a[z](M)) {
          M.stop();
          return;
        }
        if (!A) {
          var N = w === "drag" ? [w] : ["drag", w], B = Z([], I(t[e]), !1), X = $e(t, B, N, n, R, M);
          X ? (t.props.stopPropagation || R === "Start" && C) && ((G = M?.inputEvent) === null || G === void 0 || G.stopPropagation()) : M.stop();
        }
      });
    });
  }), _;
}
var up = /* @__PURE__ */ function() {
  function t(r, e, n) {
    var a = this;
    this.target = r, this.moveable = e, this.eventName = n, this.ables = [], this._onEvent = function(i) {
      var o = a.eventName, s = a.moveable;
      s.state.disableNativeEvent || a.ables.forEach(function(u) {
        u[o](s, {
          inputEvent: i
        });
      });
    }, r.addEventListener(n.toLowerCase(), this._onEvent);
  }
  return t.prototype.setAbles = function(r) {
    this.ables = r;
  }, t.prototype.destroy = function() {
    this.target.removeEventListener(this.eventName.toLowerCase(), this._onEvent), this.target = null, this.moveable = null;
  }, t;
}();
function fp(t, r, e, n) {
  var a;
  e === void 0 && (e = r);
  var i = cu(t, r), o = i.matrixes, s = i.is3d, u = i.targetMatrix, f = i.transformOrigin, l = i.targetOrigin, c = i.offsetContainer, v = i.hasFixed, d = i.zoom, p = _v(c, e), h = p.matrixes, g = p.is3d, y = p.offsetContainer, S = p.zoom, b = n, x = 4, E = t.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in t, _ = u, C = Ft(x), w = Ft(x), R = Ft(x), M = Ft(x), G = o.length, z = h.map(function($) {
    return P(P({}, $), { matrix: $.matrix ? Z([], I($.matrix), !1) : void 0 });
  }).reverse();
  o.reverse(), !s && b && (_ = Rr(_, 3, 4), ri(o)), !g && b && ri(z), z.forEach(function($) {
    w = Nt(w, $.matrix, x);
  });
  var A = e || Vr(t), N = ((a = z[0]) === null || a === void 0 ? void 0 : a.target) || tn(A, A, !0).offsetParent, B = z.slice(1).reduce(function($, D) {
    return Nt($, D.matrix, x);
  }, Ft(x));
  o.forEach(function($, D) {
    if (G - 2 === D && (R = C.slice()), G - 1 === D && (M = C.slice()), !$.matrix) {
      var T = o[D + 1], F = Dd($, T, N, x, Nt(B, C, x));
      $.matrix = ae(F, x);
    }
    C = Nt(C, $.matrix, x);
  });
  var X = !E && s;
  _ || (_ = Ft(X ? 4 : 3));
  var U = da(E && _.length === 16 ? Rr(_, 4, 3) : _, X), j = w;
  return w = js(w, x, x), {
    hasZoom: d !== 1 || S !== 1,
    hasFixed: v,
    matrixes: o,
    rootMatrix: w,
    originalRootMatrix: j,
    beforeMatrix: R,
    offsetMatrix: M,
    allMatrix: C,
    targetMatrix: _,
    targetTransform: U,
    inlineTransform: t.style.transform,
    transformOrigin: f,
    targetOrigin: l,
    is3d: b,
    offsetContainer: c,
    offsetRootContainer: y
  };
}
function lp(t, r, e, n) {
  e === void 0 && (e = r);
  var a = 0, i = 0, o = 0, s = {}, u = Nu(t);
  if (t && (a = u.offsetWidth, i = u.offsetHeight), t) {
    var f = fp(t, r, e, n), l = Ee(f.allMatrix, f.transformOrigin, a, i);
    s = P(P({}, f), l);
    var c = Ee(f.allMatrix, [50, 50], 100, 100);
    o = Fu([c.pos1, c.pos2], c.direction);
  }
  var v = 4;
  return P(P(P({ hasZoom: !1, width: a, height: i, rotation: o }, u), { originalRootMatrix: Ft(v), rootMatrix: Ft(v), beforeMatrix: Ft(v), offsetMatrix: Ft(v), allMatrix: Ft(v), targetMatrix: Ft(v), targetTransform: "", inlineTransform: "", transformOrigin: [0, 0], targetOrigin: [0, 0], is3d: !!n, left: 0, top: 0, right: 0, bottom: 0, origin: [0, 0], pos1: [0, 0], pos2: [0, 0], pos3: [0, 0], pos4: [0, 0], direction: 1, hasFixed: !1, offsetContainer: null, offsetRootContainer: null, matrixes: [] }), s);
}
function ii(t, r, e, n, a, i) {
  i === void 0 && (i = []);
  var o = 1, s = [0, 0], u = In(), f = In(), l = In(), c = In(), v = [0, 0], d = {}, p = lp(r, e, a, !0);
  if (r) {
    var h = vr(r);
    i.forEach(function(z) {
      d[z] = h(z);
    });
    var g = p.is3d ? 4 : 3, y = Ee(p.offsetMatrix, Tt(p.transformOrigin, Xs(p.targetMatrix, g)), p.width, p.height);
    o = y.direction, s = Tt(y.origin, [y.left - p.left, y.top - p.top]), c = He(p.offsetRootContainer);
    var S = tn(n, n, !0).offsetParent || p.offsetRootContainer;
    if (p.hasZoom) {
      var b = Ee(Nt(p.originalRootMatrix, p.allMatrix), p.transformOrigin, p.width, p.height), x = Ee(p.originalRootMatrix, Jn(vr(S)("transformOrigin")).map(function(z) {
        return parseFloat(z);
      }), S.offsetWidth, S.offsetHeight);
      if (u = Ta(b, c), l = Ta(x, c, S, !0), t) {
        var E = b.left, _ = b.top;
        f = Ta({
          left: E,
          top: _,
          bottom: _,
          right: _
        }, c);
      }
    } else {
      u = He(r), l = xv(S), t && (f = He(t));
      var C = l.left, w = l.top, R = l.clientLeft, M = l.clientTop, G = [
        u.left - C,
        u.top - w
      ];
      v = ct(we(p.rootMatrix, G, 4), [R + p.left, M + p.top]);
    }
  }
  return P({ targetClientRect: u, containerClientRect: l, moveableClientRect: f, rootContainerClientRect: c, beforeDirection: o, beforeOrigin: s, originalBeforeOrigin: s, target: r, style: d, offsetDelta: v }, p);
}
function as(t) {
  var r = t.pos1, e = t.pos2, n = t.pos3, a = t.pos4;
  if (!r || !e || !n || !a)
    return null;
  var i = ie([r, e, n, a]), o = [i.minX, i.minY], s = ct(t.origin, o);
  return r = ct(r, o), e = ct(e, o), n = ct(n, o), a = ct(a, o), P(P({}, t), {
    left: t.left,
    top: t.top,
    posDelta: o,
    pos1: r,
    pos2: e,
    pos3: n,
    pos4: a,
    origin: s,
    beforeOrigin: s,
    // originalBeforeOrigin: origin,
    isPersisted: !0
  });
}
var De = /* @__PURE__ */ function(t) {
  sn(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.state = P({ container: null, gestos: {}, renderLines: [
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]]
    ], renderPoses: [[0, 0], [0, 0], [0, 0], [0, 0]], disableNativeEvent: !1, posDelta: [0, 0] }, ii(null)), e.renderState = {}, e.enabledAbles = [], e.targetAbles = [], e.controlAbles = [], e.rotation = 0, e.scale = [1, 1], e.isMoveableMounted = !1, e.isUnmounted = !1, e.events = {
      mouseEnter: null,
      mouseLeave: null
    }, e._emitter = new Di(), e._prevOriginalDragTarget = null, e._originalDragTarget = null, e._prevDragTarget = null, e._dragTarget = null, e._prevPropTarget = null, e._propTarget = null, e._prevDragArea = !1, e._isPropTargetChanged = !1, e._hasFirstTarget = !1, e._reiszeObserver = null, e._observerId = 0, e._mutationObserver = null, e._rootContainer = null, e._viewContainer = null, e._viewClassNames = [], e._store = {}, e.checkUpdateRect = function() {
      if (!e.isDragging()) {
        var n = e.props.parentMoveable;
        if (n) {
          n.checkUpdateRect();
          return;
        }
        ql(e._observerId), e._observerId = Ls(function() {
          e.isDragging() || e.updateRect();
        });
      }
    }, e._onPreventClick = function(n) {
      n.stopPropagation(), n.preventDefault();
    }, e;
  }
  return r.prototype.render = function() {
    var e = this.props, n = this.getState(), a = e.parentPosition, i = e.className, o = e.target, s = e.zoom, u = e.cspNonce, f = e.translateZ, l = e.cssStyled, c = e.groupable, v = e.linePadding, d = e.controlPadding;
    this._checkUpdateRootContainer(), this.checkUpdate(), this.updateRenderPoses();
    var p = I(a || [0, 0], 2), h = p[0], g = p[1], y = n.left, S = n.top, b = n.target, x = n.direction, E = n.hasFixed, _ = n.offsetDelta, C = e.targets, w = this.isDragging(), R = {};
    this.getEnabledAbles().forEach(function(B) {
      R["data-able-".concat(B.name.toLowerCase())] = !0;
    });
    var M = this._getAbleClassName(), G = C && C.length && (b || c) || o || !this._hasFirstTarget && this.state.isPersisted, z = this.controlBox || this.props.firstRenderState || this.props.persistData, A = [y - h, S - g];
    !c && e.useAccuratePosition && (A[0] += _[0], A[1] += _[1]);
    var N = {
      position: E ? "fixed" : "absolute",
      display: G ? "block" : "none",
      visibility: z ? "visible" : "hidden",
      transform: "translate3d(".concat(A[0], "px, ").concat(A[1], "px, ").concat(f, ")"),
      "--zoom": s,
      "--zoompx": "".concat(s, "px")
    };
    return v && (N["--moveable-line-padding"] = v), d && (N["--moveable-control-padding"] = d), St.createElement(
      l,
      P({ cspNonce: u, ref: ee(this, "controlBox"), className: "".concat(ft("control-box", x === -1 ? "reverse" : "", w ? "dragging" : ""), " ").concat(M, " ").concat(i) }, R, { onClick: this._onPreventClick, style: N }),
      this.renderAbles(),
      this._renderLines()
    );
  }, r.prototype.componentDidMount = function() {
    this.isMoveableMounted = !0, this.isUnmounted = !1;
    var e = this.props, n = e.parentMoveable, a = e.container;
    this._checkUpdateRootContainer(), this._checkUpdateViewContainer(), this._updateTargets(), this._updateNativeEvents(), this._updateEvents(), this.updateCheckInput(), this._updateObserver(this.props), !a && !n && !this.state.isPersisted && (this.updateRect("", !1, !1), this.forceUpdate());
  }, r.prototype.componentDidUpdate = function(e) {
    this._checkUpdateRootContainer(), this._checkUpdateViewContainer(), this._updateNativeEvents(), this._updateTargets(), this._updateEvents(), this.updateCheckInput(), this._updateObserver(e);
  }, r.prototype.componentWillUnmount = function() {
    var e, n;
    this.isMoveableMounted = !1, this.isUnmounted = !0, this._emitter.off(), (e = this._reiszeObserver) === null || e === void 0 || e.disconnect(), (n = this._mutationObserver) === null || n === void 0 || n.disconnect();
    var a = this._viewContainer;
    a && this._changeAbleViewClassNames([]), ge(this, !1), ge(this, !0);
    var i = this.events;
    for (var o in i) {
      var s = i[o];
      s && s.destroy();
    }
  }, r.prototype.getTargets = function() {
    var e = this.props.target;
    return e ? [e] : [];
  }, r.prototype.getAble = function(e) {
    var n = this.props.ables || [];
    return mr(n, function(a) {
      return a.name === e;
    });
  }, r.prototype.getContainer = function() {
    var e = this.props, n = e.parentMoveable, a = e.wrapperMoveable, i = e.container;
    return i || a && a.getContainer() || n && n.getContainer() || this.controlBox.parentElement;
  }, r.prototype.getControlBoxElement = function() {
    return this.controlBox;
  }, r.prototype.getDragElement = function() {
    return this._dragTarget;
  }, r.prototype.isMoveableElement = function(e) {
    var n;
    return e && (((n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "class")) || "").indexOf(Mi) > -1;
  }, r.prototype.dragStart = function(e, n) {
    n === void 0 && (n = e.target);
    var a = this.targetGesto, i = this.controlGesto;
    return a && Vi(this)({ inputEvent: e }, n) ? a.isFlag() || a.triggerDragStart(e) : i && this.isMoveableElement(n) && (i.isFlag() || i.triggerDragStart(e)), this;
  }, r.prototype.hitTest = function(e) {
    var n = this.state, a = n.target, i = n.pos1, o = n.pos2, s = n.pos3, u = n.pos4, f = n.targetClientRect;
    if (!a)
      return 0;
    var l;
    if (xi(e)) {
      var c = e.getBoundingClientRect();
      l = {
        left: c.left,
        top: c.top,
        width: c.width,
        height: c.height
      };
    } else
      l = P({ width: 0, height: 0 }, e);
    var v = l.left, d = l.top, p = l.width, h = l.height, g = Ro([i, o, u, s], f), y = Rc(g, [
      [v, d],
      [v + p, d],
      [v + p, d + h],
      [v, d + h]
    ]), S = Ks(g);
    return !y || !S ? 0 : Math.min(100, y / S * 100);
  }, r.prototype.isInside = function(e, n) {
    var a = this.state, i = a.target, o = a.pos1, s = a.pos2, u = a.pos3, f = a.pos4, l = a.targetClientRect;
    return i ? Wa([e, n], Ro([o, s, f, u], l)) : !1;
  }, r.prototype.updateRect = function(e, n, a) {
    a === void 0 && (a = !0);
    var i = this.props, o = !i.parentPosition && !i.wrapperMoveable;
    o && _e(!0);
    var s = i.parentMoveable, u = this.state, f = u.target || i.target, l = this.getContainer(), c = s ? s._rootContainer : this._rootContainer, v = ii(this.controlBox, f, l, l, c || l, this._getRequestStyles());
    if (!f && this._hasFirstTarget && i.persistData) {
      var d = as(i.persistData);
      for (var p in d)
        v[p] = d[p];
    }
    o && _e(), this.updateState(v, s ? !1 : a);
  }, r.prototype.isDragging = function(e) {
    var n, a, i = this.targetGesto, o = this.controlGesto;
    if (i?.isFlag()) {
      if (!e)
        return !0;
      var s = i.getEventData();
      return !!(!((n = s[e]) === null || n === void 0) && n.isEventStart);
    }
    if (o?.isFlag()) {
      if (!e)
        return !0;
      var s = o.getEventData();
      return !!(!((a = s[e]) === null || a === void 0) && a.isEventStart);
    }
    return !1;
  }, r.prototype.updateTarget = function(e) {
    this.updateRect(e, !0);
  }, r.prototype.getRect = function() {
    var e = this.state, n = _r(this.state), a = I(n, 4), i = a[0], o = a[1], s = a[2], u = a[3], f = br(n), l = e.width, c = e.height, v = f.width, d = f.height, p = f.left, h = f.top, g = [e.left, e.top], y = Tt(g, e.origin), S = Tt(g, e.beforeOrigin), b = e.transformOrigin;
    return {
      width: v,
      height: d,
      left: p,
      top: h,
      pos1: i,
      pos2: o,
      pos3: s,
      pos4: u,
      offsetWidth: l,
      offsetHeight: c,
      beforeOrigin: S,
      origin: y,
      transformOrigin: b,
      rotation: this.getRotation()
    };
  }, r.prototype.getManager = function() {
    return this;
  }, r.prototype.stopDrag = function(e) {
    if (!e || e === "target") {
      var n = this.targetGesto;
      n?.isIdle() === !1 && ei(this, !1), n?.stop();
    }
    if (!e || e === "control") {
      var n = this.controlGesto;
      n?.isIdle() === !1 && ei(this, !0), n?.stop();
    }
  }, r.prototype.getRotation = function() {
    var e = this.state, n = e.pos1, a = e.pos2, i = e.direction;
    return Id(n, a, i);
  }, r.prototype.request = function(e, n, a) {
    n === void 0 && (n = {});
    var i = this, o = i.props, s = o.parentMoveable || o.wrapperMoveable || i, u = s.props.ables, f = o.groupable, l = mr(u, function(y) {
      return y.name === e;
    });
    if (this.isDragging() || !l || !l.request)
      return {
        request: function() {
          return this;
        },
        requestEnd: function() {
          return this;
        }
      };
    var c = l.request(i), v = a || n.isInstant, d = c.isControl ? "controlAbles" : "targetAbles", p = "".concat(f ? "Group" : "").concat(c.isControl ? "Control" : ""), h = Z([], I(s[d]), !1), g = {
      request: function(y) {
        return $e(i, h, ["drag"], p, "", P(P({}, c.request(y)), { requestAble: e, isRequest: !0 }), v), g;
      },
      requestEnd: function() {
        return $e(i, h, ["drag"], p, "End", P(P({}, c.requestEnd()), { requestAble: e, isRequest: !0 }), v), g;
      }
    };
    return $e(i, h, ["drag"], p, "Start", P(P({}, c.requestStart(n)), { requestAble: e, isRequest: !0 }), v), v ? g.request(n).requestEnd() : g;
  }, r.prototype.getMoveables = function() {
    return [this];
  }, r.prototype.destroy = function() {
    this.componentWillUnmount();
  }, r.prototype.updateRenderPoses = function() {
    var e = this.getState(), n = this.props, a = n.padding, i = e.originalBeforeOrigin, o = e.transformOrigin, s = e.allMatrix, u = e.is3d, f = e.pos1, l = e.pos2, c = e.pos3, v = e.pos4, d = e.left, p = e.top, h = e.isPersisted, g = n.zoom || 1;
    if (!a && g <= 1) {
      e.renderPoses = [
        f,
        l,
        c,
        v
      ], e.renderLines = [
        [f, l],
        [l, v],
        [v, c],
        [c, f]
      ];
      return;
    }
    var y = Uu(a || {}), S = y.left, b = y.top, x = y.bottom, E = y.right, _ = u ? 4 : 3, C = [];
    h ? C = o : this.controlBox && n.groupable ? C = i : C = Tt(i, [d, p]);
    var w = Xn(_, ae(C.map(function(N) {
      return -N;
    }), _), s, ae(o, _)), R = Sr(w, f, [-S, -b], _), M = Sr(w, l, [E, -b], _), G = Sr(w, c, [-S, x], _), z = Sr(w, v, [E, x], _);
    if (e.renderPoses = [
      R,
      M,
      G,
      z
    ], e.renderLines = [
      [R, M],
      [M, z],
      [z, G],
      [G, R]
    ], g) {
      var A = g / 2;
      e.renderLines = [
        [
          Sr(w, f, [-S - A, -b], _),
          Sr(w, l, [E + A, -b], _)
        ],
        [
          Sr(w, l, [E, -b - A], _),
          Sr(w, v, [E, x + A], _)
        ],
        [
          Sr(w, v, [E + A, x], _),
          Sr(w, c, [-S - A, x], _)
        ],
        [
          Sr(w, c, [-S, x + A], _),
          Sr(w, f, [-S, -b - A], _)
        ]
      ];
    }
  }, r.prototype.checkUpdate = function() {
    this._isPropTargetChanged = !1;
    var e = this.props, n = e.target, a = e.container, i = e.parentMoveable, o = this.state, s = o.target, u = o.container;
    if (!(!s && !n)) {
      this.updateAbles();
      var f = !ni(s, n), l = f || !ni(u, a);
      if (l) {
        var c = a || this.controlBox;
        c && this.unsetAbles(), this.updateState({ target: n, container: a }), !i && c && this.updateRect("End", !1, !1), this._isPropTargetChanged = f;
      }
    }
  }, r.prototype.waitToChangeTarget = function() {
    return new Promise(function() {
    });
  }, r.prototype.triggerEvent = function(e, n) {
    var a = this.props;
    if (this._emitter.trigger(e, n), a.parentMoveable && n.isRequest && !n.isRequestChild)
      return a.parentMoveable.triggerEvent(e, n, !0);
    var i = a[e];
    return i && i(n);
  }, r.prototype.useCSS = function(e, n) {
    var a = this.props.customStyledMap, i = e + n;
    return a[i] || (a[i] = Qs(e, n)), a[i];
  }, r.prototype.getState = function() {
    var e, n = this.props;
    (n.target || !((e = n.targets) === null || e === void 0) && e.length) && (this._hasFirstTarget = !0);
    var a = this.controlBox, i = n.persistData, o = n.firstRenderState;
    if (o && !a)
      return o;
    if (!this._hasFirstTarget && i) {
      var s = as(i);
      if (s)
        return this.updateState(s, !1), this.state;
    }
    return this.state.isPersisted = !1, this.state;
  }, r.prototype.updateSelectors = function() {
  }, r.prototype.unsetAbles = function() {
    var e = this;
    this.targetAbles.forEach(function(n) {
      n.unset && n.unset(e);
    });
  }, r.prototype.updateAbles = function(e, n) {
    e === void 0 && (e = this.props.ables), n === void 0 && (n = "");
    var a = this.props, i = a.triggerAblesSimultaneously, o = this.getEnabledAbles(e), s = "drag".concat(n, "Start"), u = "pinch".concat(n, "Start"), f = "drag".concat(n, "ControlStart"), l = kn(o, [s, u], i), c = kn(o, [f], i);
    this.enabledAbles = o, this.targetAbles = l, this.controlAbles = c;
  }, r.prototype.updateState = function(e, n) {
    if (n) {
      if (this.isUnmounted)
        return;
      this.setState(e);
    } else {
      var a = this.state;
      for (var i in e)
        a[i] = e[i];
    }
  }, r.prototype.getEnabledAbles = function(e) {
    e === void 0 && (e = this.props.ables);
    var n = this.props;
    return e.filter(function(a) {
      return a && (a.always && n[a.name] !== !1 || n[a.name]);
    });
  }, r.prototype.renderAbles = function() {
    var e = this, n = this.props, a = n.triggerAblesSimultaneously, i = {
      createElement: St.createElement
    };
    return this.renderState = {}, Md(ju(kn(this.getEnabledAbles(), ["render"], a).map(function(o) {
      var s = o.render;
      return s(e, i) || [];
    })).filter(function(o) {
      return o;
    }), function(o) {
      var s = o.key;
      return s;
    }).map(function(o) {
      return o[0];
    });
  }, r.prototype.updateCheckInput = function() {
    this.targetGesto && (this.targetGesto.options.checkInput = this.props.checkInput);
  }, r.prototype._getRequestStyles = function() {
    var e = this.getEnabledAbles().reduce(function(n, a) {
      var i, o, s = (o = (i = a.requestStyle) === null || i === void 0 ? void 0 : i.call(a)) !== null && o !== void 0 ? o : [];
      return Z(Z([], I(n), !1), I(s), !1);
    }, Z([], I(this.props.requestStyles || []), !1));
    return e;
  }, r.prototype._updateObserver = function(e) {
    this._updateResizeObserver(e), this._updateMutationObserver(e);
  }, r.prototype._updateEvents = function() {
    var e = this.targetAbles.length, n = this.controlAbles.length, a = this._dragTarget, i = !e && this.targetGesto || this._isTargetChanged(!0);
    i && (ge(this, !1), this.updateState({ gestos: {} })), n || ge(this, !0), a && e && !this.targetGesto && (this.targetGesto = af(this, a, "")), !this.controlGesto && n && (this.controlGesto = of(this, "Control"));
  }, r.prototype._updateTargets = function() {
    var e = this.props;
    this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = Ir(this._originalDragTarget, !0);
  }, r.prototype._renderLines = function() {
    var e = this.props, n = e, a = n.zoom, i = n.hideDefaultLines, o = n.hideChildMoveableDefaultLines, s = n.parentMoveable;
    if (i || s && o)
      return [];
    var u = this.getState(), f = {
      createElement: St.createElement
    };
    return u.renderLines.map(function(l, c) {
      return Qe(f, "", l[0], l[1], a, "render-line-".concat(c));
    });
  }, r.prototype._isTargetChanged = function(e) {
    var n = this.props, a = n.dragTarget || n.target, i = this._prevOriginalDragTarget, o = this._prevDragArea, s = n.dragArea, u = !s && i !== a, f = (e || s) && o !== s;
    return u || f || this._prevPropTarget != this._propTarget;
  }, r.prototype._updateNativeEvents = function() {
    var e = this, n = this.props, a = n.dragArea ? this.areaElement : this.state.target, i = this.events, o = Te(i);
    if (this._isTargetChanged())
      for (var s in i) {
        var u = i[s];
        u && u.destroy(), i[s] = null;
      }
    if (a) {
      var f = this.enabledAbles;
      o.forEach(function(l) {
        var c = kn(f, [l]), v = c.length > 0, d = i[l];
        if (!v) {
          d && (d.destroy(), i[l] = null);
          return;
        }
        d || (d = new up(a, e, l), i[l] = d), d.setAbles(c);
      });
    }
  }, r.prototype._checkUpdateRootContainer = function() {
    var e = this.props.rootContainer;
    !this._rootContainer && e && (this._rootContainer = Ir(e, !0));
  }, r.prototype._checkUpdateViewContainer = function() {
    var e = this.props.viewContainer;
    !this._viewContainer && e && (this._viewContainer = Ir(e, !0));
    var n = this._viewContainer;
    n && this._changeAbleViewClassNames(Z(Z([], I(this._getAbleViewClassNames()), !1), [
      this.isDragging() ? Ld : ""
    ], !1));
  }, r.prototype._changeAbleViewClassNames = function(e) {
    var n = this._viewContainer, a = $u(e.filter(Boolean), function(f) {
      return f;
    }).map(function(f) {
      var l = I(f, 1), c = l[0];
      return c;
    }), i = this._viewClassNames, o = wi(i, a), s = o.removed, u = o.added;
    s.forEach(function(f) {
      Hs(n, i[f]);
    }), u.forEach(function(f) {
      Ws(n, a[f]);
    }), this._viewClassNames = a;
  }, r.prototype._getAbleViewClassNames = function() {
    var e = this;
    return (this.getEnabledAbles().map(function(n) {
      var a;
      return ((a = n.viewClassName) === null || a === void 0 ? void 0 : a.call(n, e)) || "";
    }).join(" ") + " ".concat(this._getAbleClassName("-view"))).split(/\s+/g);
  }, r.prototype._getAbleClassName = function(e) {
    var n = this;
    e === void 0 && (e = "");
    var a = this.getEnabledAbles(), i = this.targetGesto, o = this.controlGesto, s = i?.isFlag() ? i.getEventData() : {}, u = o?.isFlag() ? o.getEventData() : {};
    return a.map(function(f) {
      var l, c, v, d = f.name, p = ((l = f.className) === null || l === void 0 ? void 0 : l.call(f, n)) || "";
      return (!((c = s[d]) === null || c === void 0) && c.isEventStart || !((v = u[d]) === null || v === void 0) && v.isEventStart) && (p += " ".concat(ft("".concat(d).concat(e, "-dragging")))), p.trim();
    }).filter(Boolean).join(" ");
  }, r.prototype._updateResizeObserver = function(e) {
    var n, a = this.props, i = a.target, o = $r(this.getControlBoxElement());
    if (!o.ResizeObserver || !i || !a.useResizeObserver) {
      (n = this._reiszeObserver) === null || n === void 0 || n.disconnect();
      return;
    }
    if (!(e.target === i && this._reiszeObserver)) {
      var s = new o.ResizeObserver(this.checkUpdateRect);
      s.observe(i, {
        box: "border-box"
      }), this._reiszeObserver = s;
    }
  }, r.prototype._updateMutationObserver = function(e) {
    var n = this, a, i = this.props, o = i.target, s = $r(this.getControlBoxElement());
    if (!s.MutationObserver || !o || !i.useMutationObserver) {
      (a = this._mutationObserver) === null || a === void 0 || a.disconnect();
      return;
    }
    if (!(e.target === o && this._mutationObserver)) {
      var u = new s.MutationObserver(function(f) {
        var l, c;
        try {
          for (var v = $c(f), d = v.next(); !d.done; d = v.next()) {
            var p = d.value;
            p.type === "attributes" && p.attributeName === "style" && n.checkUpdateRect();
          }
        } catch (h) {
          l = { error: h };
        } finally {
          try {
            d && !d.done && (c = v.return) && c.call(v);
          } finally {
            if (l) throw l.error;
          }
        }
      });
      u.observe(o, {
        attributes: !0
      }), this._mutationObserver = u;
    }
  }, r.defaultProps = {
    dragTargetSelf: !1,
    target: null,
    dragTarget: null,
    container: null,
    rootContainer: null,
    origin: !0,
    parentMoveable: null,
    wrapperMoveable: null,
    isWrapperMounted: !1,
    parentPosition: null,
    warpSelf: !1,
    svgOrigin: "",
    dragContainer: null,
    useResizeObserver: !1,
    useMutationObserver: !1,
    preventDefault: !0,
    preventRightClick: !0,
    preventWheelClick: !0,
    linePadding: 0,
    controlPadding: 0,
    ables: [],
    pinchThreshold: 20,
    dragArea: !1,
    passDragArea: !1,
    transformOrigin: "",
    className: "",
    zoom: 1,
    triggerAblesSimultaneously: !1,
    padding: {},
    pinchOutside: !0,
    checkInput: !1,
    dragFocusedInput: !1,
    groupable: !1,
    hideDefaultLines: !1,
    cspNonce: "",
    translateZ: 0,
    cssStyled: null,
    customStyledMap: {},
    props: {},
    stopPropagation: !1,
    preventClickDefault: !1,
    preventClickEventOnDrag: !0,
    flushSync: ku,
    firstRenderState: null,
    persistData: null,
    viewContainer: null,
    requestStyles: [],
    useAccuratePosition: !1
  }, r;
}(St.PureComponent), Ui = {
  name: "groupable",
  props: [
    "defaultGroupRotate",
    "useDefaultGroupRotate",
    "defaultGroupOrigin",
    "groupable",
    "groupableProps",
    "targetGroups",
    "hideChildMoveableDefaultLines"
  ],
  events: [],
  render: function(t, r) {
    var e, n = t.props, a = n.targets || [], i = t.getState(), o = i.left, s = i.top, u = i.isPersisted, f = n.zoom || 1, l = t.renderGroupRects, c = ((e = n.persistData) === null || e === void 0 ? void 0 : e.children) || [];
    u ? a = c.map(function() {
      return null;
    }) : c = [];
    var v = me(t, "parentPosition", [o, s], function(p) {
      return p.join(",");
    }), d = me(t, "requestStyles", t.getRequestChildStyles(), function(p) {
      return p.join(",");
    });
    return t.moveables = t.moveables.slice(0, a.length), Z(Z([], I(a.map(function(p, h) {
      return r.createElement(De, { key: "moveable" + h, ref: Gs(t, "moveables", h), target: p, origin: !1, requestStyles: d, cssStyled: n.cssStyled, customStyledMap: n.customStyledMap, useResizeObserver: n.useResizeObserver, useMutationObserver: n.useMutationObserver, hideChildMoveableDefaultLines: n.hideChildMoveableDefaultLines, parentMoveable: t, parentPosition: [o, s], persistData: c[h], zoom: f });
    })), !1), I(ju(l.map(function(p, h) {
      var g = p.pos1, y = p.pos2, S = p.pos3, b = p.pos4, x = [g, y, S, b];
      return [
        [0, 1],
        [1, 3],
        [3, 2],
        [2, 0]
      ].map(function(E, _) {
        var C = I(E, 2), w = C[0], R = C[1];
        return Qe(r, "", ct(x[w], v), ct(x[R], v), f, "group-rect-".concat(h, "-").concat(_));
      });
    }))), !1);
  }
}, cp = un("clickable", {
  props: [
    "clickable"
  ],
  events: [
    "click",
    "clickGroup"
  ],
  always: !0,
  dragRelation: "weak",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dragStart: function() {
  },
  dragControlStart: function() {
  },
  dragGroupStart: function(t, r) {
    r.datas.inputTarget = r.inputEvent && r.inputEvent.target;
  },
  dragEnd: function(t, r) {
    var e = t.props.target, n = r.inputEvent, a = r.inputTarget, i = t.isMoveableElement(a), o = !i && t.controlBox.contains(a);
    if (!(!n || !a || r.isDrag || t.isMoveableElement(a) || o)) {
      var s = e.contains(a);
      at(t, "onClick", xt(t, r, {
        isDouble: r.isDouble,
        inputTarget: a,
        isTarget: e === a,
        moveableTarget: t.props.target,
        containsTarget: s
      }));
    }
  },
  dragGroupEnd: function(t, r) {
    var e = r.inputEvent, n = r.inputTarget;
    if (!(!e || !n || r.isDrag || t.isMoveableElement(n) || r.datas.inputTarget === n)) {
      var a = t.props.targets, i = a.indexOf(n), o = i > -1, s = !1;
      i === -1 && (i = Fr(a, function(u) {
        return u.contains(n);
      }), s = i > -1), at(t, "onClickGroup", xt(t, r, {
        isDouble: r.isDouble,
        targets: a,
        inputTarget: n,
        targetIndex: i,
        isTarget: o,
        containsTarget: s,
        moveableTarget: a[i]
      }));
    }
  },
  dragControlEnd: function(t, r) {
    this.dragEnd(t, r);
  },
  dragGroupControlEnd: function(t, r) {
    this.dragEnd(t, r);
  }
});
function ce(t) {
  var r = t.originalDatas.draggable;
  return r || (t.originalDatas.draggable = {}, r = t.originalDatas.draggable), P(P({}, t), { datas: r });
}
var vp = un("edgeDraggable", {
  css: [
    `.edge.edgeDraggable.line {
cursor: move;
}`
  ],
  render: function(t, r) {
    var e = t.props, n = e.edgeDraggable;
    return n ? pu(r, "edgeDraggable", n, t.getState().renderPoses, e.zoom) : [];
  },
  dragCondition: function(t, r) {
    var e, n = t.props, a = (e = r.inputEvent) === null || e === void 0 ? void 0 : e.target;
    return !n.edgeDraggable || !a ? !1 : !n.draggable && Vt(a, ft("direction")) && Vt(a, ft("edge")) && Vt(a, ft("edgeDraggable"));
  },
  dragStart: function(t, r) {
    return ar.dragStart(t, ce(r));
  },
  drag: function(t, r) {
    return ar.drag(t, ce(r));
  },
  dragEnd: function(t, r) {
    return ar.dragEnd(t, ce(r));
  },
  dragGroupCondition: function(t, r) {
    var e, n = t.props, a = (e = r.inputEvent) === null || e === void 0 ? void 0 : e.target;
    return !n.edgeDraggable || !a ? !1 : !n.draggable && Vt(a, ft("direction")) && Vt(a, ft("line"));
  },
  dragGroupStart: function(t, r) {
    return ar.dragGroupStart(t, ce(r));
  },
  dragGroup: function(t, r) {
    return ar.dragGroup(t, ce(r));
  },
  dragGroupEnd: function(t, r) {
    return ar.dragGroupEnd(t, ce(r));
  },
  unset: function(t) {
    return ar.unset(t);
  }
}), uf = {
  name: "individualGroupable",
  props: [
    "individualGroupable",
    "individualGroupableProps"
  ],
  events: []
}, dp = [
  ef,
  Ju,
  gd,
  zd,
  ar,
  vp,
  Ja,
  Gd,
  Nd,
  Jv,
  Hd,
  $d,
  Yd,
  ep,
  rp,
  op,
  Ui,
  uf,
  cp,
  Zu,
  nf
];
function is(t, r) {
  var e = I(t, 3), n = e[0], a = e[1], i = e[2];
  return (n * r[0] + a * r[1] + i) / Math.sqrt(n * n + a * a);
}
function Bn(t, r) {
  var e = I(t, 2), n = e[0], a = e[1];
  return -n * r[0] - a * r[1];
}
function os(t, r) {
  return Math.max.apply(Math, Z([], I(t.map(function(e) {
    var n = I(e, 4), a = n[0], i = n[1], o = n[2], s = n[3];
    return Math.max(a[r], i[r], o[r], s[r]);
  })), !1));
}
function ss(t, r) {
  return Math.min.apply(Math, Z([], I(t.map(function(e) {
    var n = I(e, 4), a = n[0], i = n[1], o = n[2], s = n[3];
    return Math.min(a[r], i[r], o[r], s[r]);
  })), !1));
}
function pp(t, r) {
  var e, n, a, i = [0, 0], o = [0, 0], s = [0, 0], u = [0, 0], f = 0, l = 0;
  if (!t.length)
    return {
      pos1: i,
      pos2: o,
      pos3: s,
      pos4: u,
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: f,
      height: l,
      rotation: r
    };
  var c = yt(r, sr);
  if (c % 90) {
    var v = c / 180 * Math.PI, d = Math.tan(v), p = -1 / d, h = [Va, Oo], g = [[0, 0], [0, 0]], y = [Va, Oo], S = [[0, 0], [0, 0]];
    t.forEach(function(W) {
      W.forEach(function(Y) {
        var K = is([-d, 1, 0], Y), L = is([-p, 1, 0], Y);
        h[0] > K && (g[0] = Y, h[0] = K), h[1] < K && (g[1] = Y, h[1] = K), y[0] > L && (S[0] = Y, y[0] = L), y[1] < L && (S[1] = Y, y[1] = L);
      });
    });
    var b = I(g, 2), x = b[0], E = b[1], _ = I(S, 2), C = _[0], w = _[1], R = [-d, 1, Bn([-d, 1], x)], M = [-d, 1, Bn([-d, 1], E)], G = [-p, 1, Bn([-p, 1], C)], z = [-p, 1, Bn([-p, 1], w)];
    e = I([
      [R, G],
      [R, z],
      [M, G],
      [M, z]
    ].map(function(W) {
      var Y = I(W, 2), K = Y[0], L = Y[1];
      return Ri(K, L)[0];
    }), 4), i = e[0], o = e[1], s = e[2], u = e[3], f = y[1] - y[0], l = h[1] - h[0];
  } else {
    var A = ss(t, 0), N = ss(t, 1), B = os(t, 0), X = os(t, 1);
    if (i = [A, N], o = [B, N], s = [A, X], u = [B, X], f = B - A, l = X - N, c % 180) {
      var U = [s, i, u, o];
      n = I(U, 4), i = n[0], o = n[1], s = n[2], u = n[3], f = X - N, l = B - A;
    }
  }
  if (c % 360 > 180) {
    var U = [u, s, o, i];
    a = I(U, 4), i = a[0], o = a[1], s = a[2], u = a[3];
  }
  var j = ie([i, o, s, u]), $ = j.minX, D = j.minY, T = j.maxX, F = j.maxY;
  return {
    pos1: i,
    pos2: o,
    pos3: s,
    pos4: u,
    width: f,
    height: l,
    minX: $,
    minY: D,
    maxX: T,
    maxY: F,
    rotation: r
  };
}
function ff(t, r) {
  var e = r.map(function(n) {
    if (Zt(n)) {
      var a = ff(t, n), i = a.length;
      return i > 1 ? a : i === 1 ? a[0] : null;
    } else {
      var o = mr(t, function(s) {
        var u = s.manager;
        return u.props.target === n;
      });
      return o ? (o.finded = !0, o.manager) : null;
    }
  }).filter(Boolean);
  return e.length === 1 && Zt(e[0]) ? e[0] : e;
}
var hp = /* @__PURE__ */ function(t) {
  sn(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.differ = new Us(), e.moveables = [], e.transformOrigin = "50% 50%", e.renderGroupRects = [], e._targetGroups = [], e._hasFirstTargets = !1, e;
  }
  return r.prototype.componentDidMount = function() {
    t.prototype.componentDidMount.call(this);
  }, r.prototype.checkUpdate = function() {
    this._isPropTargetChanged = !1, this.updateAbles();
  }, r.prototype.getTargets = function() {
    return this.props.targets;
  }, r.prototype.updateRect = function(e, n, a) {
    var i;
    a === void 0 && (a = !0);
    var o = this.state;
    if (!this.controlBox || o.isPersisted)
      return;
    _e(!0), this.moveables.forEach(function(rt) {
      rt.updateRect(e, !1, !1);
    });
    var s = this.props, u = this.moveables, f = o.target || s.target, l = u.map(function(rt) {
      return { finded: !1, manager: rt };
    }), c = this.props.targetGroups || [], v = ff(l, c), d = s.useDefaultGroupRotate;
    v.push.apply(v, Z([], I(l.filter(function(rt) {
      var pt = rt.finded;
      return !pt;
    }).map(function(rt) {
      var pt = rt.manager;
      return pt;
    })), !1));
    var p = [], h = !n || e !== "" && s.updateGroup, g = s.defaultGroupRotate || 0;
    if (!this._hasFirstTargets) {
      var y = (i = s.persistData) === null || i === void 0 ? void 0 : i.rotation;
      y != null && (g = y);
    }
    function S(rt, pt, Et) {
      var J = rt.map(function(Mt) {
        if (Zt(Mt)) {
          var mt = S(Mt, pt), Rt = [mt.pos1, mt.pos2, mt.pos3, mt.pos4];
          return p.push(mt), { poses: Rt, rotation: mt.rotation };
        } else
          return {
            poses: _r(Mt.state),
            rotation: Mt.getRotation()
          };
      }), H = J.map(function(Mt) {
        var mt = Mt.rotation;
        return mt;
      }), bt = 0, ut = H[0], vt = H.every(function(Mt) {
        return Math.abs(ut - Mt) < 0.1;
      });
      h ? bt = !d && vt ? ut : g : bt = !d && !Et && vt ? ut : pt;
      var gt = J.map(function(Mt) {
        var mt = Mt.poses;
        return mt;
      }), wt = pp(gt, bt);
      return wt;
    }
    var b = S(v, this.rotation, !0);
    h && (this.rotation = b.rotation, this.transformOrigin = s.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = c, this.renderGroupRects = p;
    var x = this.transformOrigin, E = this.rotation, _ = this.scale, C = b.width, w = b.height, R = b.minX, M = b.minY, G = kd([
      [0, 0],
      [C, 0],
      [0, w],
      [C, w]
    ], ji(x, C, w), this.rotation / 180 * Math.PI), z = ie(G.result), A = z.minX, N = z.minY, B = " rotate(".concat(E, "deg)") + " scale(".concat(ir(_[0]), ", ").concat(ir(_[1]), ")"), X = "translate(".concat(-A, "px, ").concat(-N, "px)").concat(B);
    this.controlBox.style.transform = "translate3d(".concat(R, "px, ").concat(M, "px, ").concat(this.props.translateZ || 0, ")"), f.style.cssText += "left:0px;top:0px;" + "transform-origin:".concat(x, ";") + "width:".concat(C, "px;height:").concat(w, "px;") + "transform: ".concat(X), o.width = C, o.height = w;
    var U = this.getContainer(), j = ii(this.controlBox, f, this.controlBox, this.getContainer(), this._rootContainer || U, []), $ = [j.left, j.top], D = I(_r(j), 4), T = D[0], F = D[1], W = D[2], Y = D[3], K = ie([T, F, W, Y]), L = [K.minX, K.minY], et = ir(_[0] * _[1]);
    j.pos1 = ct(T, L), j.pos2 = ct(F, L), j.pos3 = ct(W, L), j.pos4 = ct(Y, L), j.left = R - j.left + L[0], j.top = M - j.top + L[1], j.origin = ct(Tt($, j.origin), L), j.beforeOrigin = ct(Tt($, j.beforeOrigin), L), j.originalBeforeOrigin = Tt($, j.originalBeforeOrigin), j.transformOrigin = ct(Tt($, j.transformOrigin), L), f.style.transform = "translate(".concat(-A - L[0], "px, ").concat(-N - L[1], "px)") + B, _e(), this.updateState(P(P({}, j), { posDelta: L, direction: et, beforeDirection: et }), a);
  }, r.prototype.getRect = function() {
    return P(P({}, t.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
      return e.getRect();
    }) });
  }, r.prototype.triggerEvent = function(e, n, a) {
    if (a || e.indexOf("Group") > -1)
      return t.prototype.triggerEvent.call(this, e, n);
    this._emitter.trigger(e, n);
  }, r.prototype.getRequestChildStyles = function() {
    var e = this.getEnabledAbles().reduce(function(n, a) {
      var i, o, s = (o = (i = a.requestChildStyle) === null || i === void 0 ? void 0 : i.call(a)) !== null && o !== void 0 ? o : [];
      return Z(Z([], I(n), !1), I(s), !1);
    }, []);
    return e;
  }, r.prototype.getMoveables = function() {
    return Z([], I(this.moveables), !1);
  }, r.prototype.updateAbles = function() {
    t.prototype.updateAbles.call(this, Z(Z([], I(this.props.ables), !1), [Ui], !1), "Group");
  }, r.prototype._updateTargets = function() {
    t.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = Ir(this._originalDragTarget, !0);
  }, r.prototype._updateEvents = function() {
    var e = this.state, n = this.props, a = this._prevDragTarget, i = n.dragTarget || this.areaElement, o = n.targets, s = this.differ.update(o), u = s.added, f = s.changed, l = s.removed, c = u.length || l.length;
    (c || this._prevOriginalDragTarget !== this._originalDragTarget) && (ge(this, !1), ge(this, !0), this.updateState({ gestos: {} })), a !== i && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto || (this.targetGesto = af(this, this._dragTarget, "Group")), this.controlGesto || (this.controlGesto = of(this, "GroupControl")));
    var v = !ni(e.container, n.container);
    v && (e.container = n.container), (v || c || this.transformOrigin !== (n.defaultGroupOrigin || "50% 50%") || f.length || o.length && !Vu(this._targetGroups, n.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!c;
  }, r.prototype._updateObserver = function() {
  }, r.defaultProps = P(P({}, De.defaultProps), { transformOrigin: ["50%", "50%"], groupable: !0, dragArea: !0, keepRatio: !0, targets: [], defaultGroupRotate: 0, defaultGroupOrigin: "50% 50%" }), r;
}(De), gp = /* @__PURE__ */ function(t) {
  sn(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.moveables = [], e;
  }
  return r.prototype.render = function() {
    var e = this, n, a = this.props, i = a.cspNonce, o = a.cssStyled, s = a.persistData, u = a.targets || [], f = u.length, l = this.isUnmounted || !f, c = (n = s?.children) !== null && n !== void 0 ? n : [];
    return l && !f && c.length ? u = c.map(function() {
      return null;
    }) : l || (c = []), St.createElement(o, { cspNonce: i, ref: ee(this, "controlBox"), className: ft("control-box") }, u.map(function(v, d) {
      var p, h, g = (h = (p = a.individualGroupableProps) === null || p === void 0 ? void 0 : p.call(a, v, d)) !== null && h !== void 0 ? h : {};
      return St.createElement(De, P({ key: "moveable" + d, ref: Gs(e, "moveables", d) }, a, g, { target: v, wrapperMoveable: e, isWrapperMounted: e.isMoveableMounted, persistData: c[d] }));
    }));
  }, r.prototype.componentDidMount = function() {
  }, r.prototype.componentDidUpdate = function() {
  }, r.prototype.getTargets = function() {
    return this.props.targets;
  }, r.prototype.updateRect = function(e, n, a) {
    a === void 0 && (a = !0), _e(!0), this.moveables.forEach(function(i) {
      i.updateRect(e, n, a);
    }), _e();
  }, r.prototype.getRect = function() {
    return P(P({}, t.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
      return e.getRect();
    }) });
  }, r.prototype.request = function(e, n, a) {
    n === void 0 && (n = {});
    var i = this.moveables.map(function(u) {
      return u.request(e, P(P({}, n), { isInstant: !1 }), !1);
    }), o = a || n.isInstant, s = {
      request: function(u) {
        return i.forEach(function(f) {
          return f.request(u);
        }), this;
      },
      requestEnd: function() {
        return i.forEach(function(u) {
          return u.requestEnd();
        }), this;
      }
    };
    return o ? s.request(n).requestEnd() : s;
  }, r.prototype.dragStart = function(e, n) {
    n === void 0 && (n = e.target);
    var a = n, i = mr(this.moveables, function(o) {
      var s = o.getTargets()[0], u = o.getControlBoxElement(), f = o.getDragElement();
      return !s || !f ? !1 : f === a || f.contains(a) || f !== s && s === a || s.contains(a) || u === a || u.contains(a);
    });
    return i && i.dragStart(e, n), this;
  }, r.prototype.hitTest = function() {
    return 0;
  }, r.prototype.isInside = function() {
    return !1;
  }, r.prototype.isDragging = function() {
    return !1;
  }, r.prototype.getDragElement = function() {
    return null;
  }, r.prototype.getMoveables = function() {
    return Z([], I(this.moveables), !1);
  }, r.prototype.updateRenderPoses = function() {
  }, r.prototype.checkUpdate = function() {
  }, r.prototype.triggerEvent = function() {
  }, r.prototype.updateAbles = function() {
  }, r.prototype._updateEvents = function() {
  }, r.prototype._updateObserver = function() {
  }, r;
}(De);
function lf(t, r) {
  var e = [];
  return t.forEach(function(n) {
    if (n) {
      if (Lr(n)) {
        r[n] && e.push.apply(e, Z([], I(r[n]), !1));
        return;
      }
      Zt(n) ? e.push.apply(e, Z([], I(lf(n, r)), !1)) : e.push(n);
    }
  }), e;
}
function cf(t, r) {
  var e = [];
  return t.forEach(function(n) {
    if (n) {
      if (Lr(n)) {
        r[n] && e.push.apply(e, Z([], I(r[n]), !1));
        return;
      }
      Zt(n) ? e.push(cf(n, r)) : e.push(n);
    }
  }), e;
}
function vf(t, r) {
  return t.length !== r.length || t.some(function(e, n) {
    var a = r[n];
    return !e && !a ? !1 : e != a ? Zt(e) && Zt(a) ? vf(e, a) : !0 : !1;
  });
}
var mp = /* @__PURE__ */ function(t) {
  sn(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.refTargets = [], e.selectorMap = {}, e._differ = new Us(), e._elementTargets = [], e._tmpRefTargets = [], e._tmpSelectorMap = {}, e._onChangeTargets = null, e;
  }
  return r.makeStyled = function() {
    var e = {}, n = this.getTotalAbles();
    n.forEach(function(i) {
      var o = i.css;
      o && o.forEach(function(s) {
        e[s] = !0;
      });
    });
    var a = Te(e).join(`
`);
    this.defaultStyled = Qs("div", zl(Mi, rv + a));
  }, r.getTotalAbles = function() {
    return Z([Ju, Ui, uf, Zu], I(this.defaultAbles), !1);
  }, r.prototype.render = function() {
    var e, n = this.constructor;
    n.defaultStyled || n.makeStyled();
    var a = this.props, i = a.ables, o = a.props, s = Wc(a, ["ables", "props"]), u = I(this._updateRefs(!0), 2), f = u[0], l = u[1], c = lf(f, l), v = c.length > 1, d = n.getTotalAbles(), p = Z(Z([], I(d), !1), I(i || []), !1), h = P(P(P({}, s), o || {}), { ables: p, cssStyled: n.defaultStyled, customStyledMap: n.customStyledMap });
    this._elementTargets = c;
    var g = null, y = this.moveable, S = s.persistData;
    if (S?.children && (v = !0), s.individualGroupable)
      return St.createElement(gp, P({ key: "individual-group", ref: ee(this, "moveable") }, h, { target: null, targets: c }));
    if (v) {
      var b = cf(f, l);
      if (y && !y.props.groupable && !y.props.individualGroupable) {
        var x = y.props.target;
        x && c.indexOf(x) > -1 && (g = P({}, y.state));
      }
      return St.createElement(hp, P({ key: "group", ref: ee(this, "moveable") }, h, (e = s.groupableProps) !== null && e !== void 0 ? e : {}, { target: null, targets: c, targetGroups: b, firstRenderState: g }));
    } else {
      var E = c[0];
      if (y && (y.props.groupable || y.props.individualGroupable)) {
        var _ = y.moveables || [], C = mr(_, function(w) {
          return w.props.target === E;
        });
        C && (g = P({}, C.state));
      }
      return St.createElement(De, P({ key: "single", ref: ee(this, "moveable") }, h, { target: E, firstRenderState: g }));
    }
  }, r.prototype.componentDidMount = function() {
    this._checkChangeTargets();
  }, r.prototype.componentDidUpdate = function() {
    this._checkChangeTargets();
  }, r.prototype.componentWillUnmount = function() {
    this.selectorMap = {}, this.refTargets = [];
  }, r.prototype.getTargets = function() {
    var e, n;
    return (n = (e = this.moveable) === null || e === void 0 ? void 0 : e.getTargets()) !== null && n !== void 0 ? n : [];
  }, r.prototype.updateSelectors = function() {
    this.selectorMap = {}, this._updateRefs(), this.forceUpdate();
  }, r.prototype.waitToChangeTarget = function() {
    var e = this, n;
    return this._onChangeTargets = function() {
      e._onChangeTargets = null, n();
    }, new Promise(function(a) {
      n = a;
    });
  }, r.prototype.waitToChangeTargets = function() {
    return this.waitToChangeTarget();
  }, r.prototype.getManager = function() {
    return this.moveable;
  }, r.prototype.getMoveables = function() {
    return this.moveable.getMoveables();
  }, r.prototype.getDragElement = function() {
    return this.moveable.getDragElement();
  }, r.prototype._updateRefs = function(e) {
    var n = this.refTargets, a = $i(this.props.target || this.props.targets), i = typeof document < "u", o = vf(n, a), s = this.selectorMap, u = {};
    return this.refTargets.forEach(function f(l) {
      if (Lr(l)) {
        var c = s[l];
        c ? u[l] = s[l] : i && (o = !0, u[l] = [].slice.call(document.querySelectorAll(l)));
      } else Zt(l) && l.forEach(f);
    }), this._tmpRefTargets = a, this._tmpSelectorMap = u, [
      a,
      u,
      !e && o
    ];
  }, r.prototype._checkChangeTargets = function() {
    var e, n, a;
    this.refTargets = this._tmpRefTargets, this.selectorMap = this._tmpSelectorMap;
    var i = this._differ.update(this._elementTargets), o = i.added, s = i.removed, u = o.length || s.length;
    u && ((n = (e = this.props).onChangeTargets) === null || n === void 0 || n.call(e, {
      moveable: this.moveable,
      targets: this._elementTargets
    }), (a = this._onChangeTargets) === null || a === void 0 || a.call(this));
    var f = I(this._updateRefs(), 3), l = f[0], c = f[1], v = f[2];
    this.refTargets = l, this.selectorMap = c, v && this.forceUpdate();
  }, r.defaultAbles = [], r.customStyledMap = {}, r.defaultStyled = null, Hc([
    Gl(av)
  ], r.prototype, "moveable", void 0), r;
}(St.PureComponent), df = /* @__PURE__ */ function(t) {
  sn(r, t);
  function r() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return r.defaultAbles = dp, r;
}(mp);
function yp({ cmn: { styChild: t, sys: r, sty4Moveable: e }, fn: n }) {
  const a = (s) => r.cfg.searchPath(s, xf.SP_GSM), i = (s) => {
    s.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
  }, o = St.useRef(null);
  return /* @__PURE__ */ $n(ia, { children: [
    /* @__PURE__ */ hr("img", { css: t, src: a(n), ref: o, style: e, onMouseDown: (s) => i(s) }),
    /* @__PURE__ */ hr(
      df,
      {
        target: o,
        draggable: !0,
        throttleDrag: 1,
        onDrag: ({ target: { style: s }, transform: u }) => {
          s.transform = u;
        },
        resizable: !0,
        keepRatio: !0,
        onResize: ({ target: { style: s }, width: u, height: f, drag: l }) => {
          s.width = `${u}px`, s.height = `${f}px`, s.transform = l.transform;
        },
        rotatable: !0,
        throttleRotate: 0,
        startDragRotate: 0,
        throttleDragRotate: 0,
        rotationPosition: "top",
        onRotate: ({ target: { style: s }, drag: u }) => {
          s.transform = u.transform;
        },
        originDraggable: !0,
        onDragOrigin: ({ target: { style: s }, transformOrigin: u, drag: f }) => {
          s.transformOrigin = u, s.transform = f.transform;
        }
      }
    )
  ] });
}
var us = function(r, e) {
  var n = arguments;
  if (e == null || !en.call(e, "css"))
    return St.createElement.apply(void 0, n);
  var a = n.length, i = new Array(a);
  i[0] = vi, i[1] = ci(r, e);
  for (var o = 2; o < a; o++)
    i[o] = n[o];
  return St.createElement.apply(null, i);
};
(function(t) {
  var r;
  r || (r = t.JSX || (t.JSX = {}));
})(us || (us = {}));
function Wn() {
  for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
    r[e] = arguments[e];
  return Ds(r);
}
function Ep({ cmn: { styChild: t, sty4Moveable: r }, str: e }) {
  const n = Wn`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
	`, a = St.useRef(null);
  return /* @__PURE__ */ $n(ia, { children: [
    /* @__PURE__ */ hr("span", { css: [t, n], ref: a, style: r, children: e }),
    /* @__PURE__ */ hr(
      df,
      {
        target: a,
        draggable: !0,
        throttleDrag: 1,
        onDrag: ({ target: { style: i }, transform: o }) => {
          i.transform = o;
        },
        resizable: !0,
        keepRatio: !1,
        onResize: ({ target: { style: i }, width: o, height: s, drag: u }) => {
          i.width = `${o}px`, i.height = `${s}px`, i.transform = u.transform;
        },
        rotatable: !0,
        throttleRotate: 0,
        startDragRotate: 0,
        throttleDragRotate: 0,
        rotationPosition: "top",
        onRotate: ({ target: { style: i }, drag: o }) => {
          i.transform = o.transform;
        },
        originDraggable: !0,
        onDragOrigin: ({ target: { style: i }, transformOrigin: o, drag: s }) => {
          i.transformOrigin = o, i.transform = s.transform;
        }
      }
    )
  ] });
}
const fs = (t) => {
  let r;
  const e = /* @__PURE__ */ new Set(), n = (f, l) => {
    const c = typeof f == "function" ? f(r) : f;
    if (!Object.is(c, r)) {
      const v = r;
      r = l ?? (typeof c != "object" || c === null) ? c : Object.assign({}, r, c), e.forEach((d) => d(r, v));
    }
  }, a = () => r, s = { setState: n, getState: a, getInitialState: () => u, subscribe: (f) => (e.add(f), () => e.delete(f)) }, u = r = t(n, a, s);
  return s;
}, Sp = (t) => t ? fs(t) : fs, bp = (t) => t;
function xp(t, r = bp) {
  const e = Pa.useSyncExternalStore(
    t.subscribe,
    () => r(t.getState()),
    () => r(t.getInitialState())
  );
  return Pa.useDebugValue(e), e;
}
const _p = (t) => {
  const r = Sp(t), e = (n) => xp(r, n);
  return Object.assign(e, r), e;
}, Cp = (t) => _p, je = Cp()((t) => ({
  // わざとカーリー化
  txt: "",
  addTxt: (r) => t((e) => ({ txt: e.txt + r })),
  clearTxt: () => t(() => ({ txt: "" })),
  aLay: [],
  replace: (r) => t((e) => ({ aLay: JSON.parse(r) })),
  addLayer: (r) => t((e) => ({ aLay: [...e.aLay, r] })),
  chgPic: ({ nm: r, fn: e }) => t((n) => {
    const a = [...n.aLay], i = a.find((o) => o.nm === r);
    if (!i) throw `存在しないレイヤ ${r} です`;
    if (i.cls !== "GRP") throw `${r} は画像レイヤではありません`;
    return i.fn = e, { aLay: a };
  }),
  chgStr: ({ nm: r, str: e }) => t((n) => {
    const a = [...n.aLay], i = a.find((o) => o.nm === r);
    if (!i) throw `存在しないレイヤ ${r} です`;
    if (i.cls !== "TXT") throw `${r} は文字レイヤではありません`;
    return i.str = e, { aLay: a };
  })
}));
var wp = function() {
};
function pf(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  t && t.addEventListener && t.addEventListener.apply(t, r);
}
function hf(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  t && t.removeEventListener && t.removeEventListener.apply(t, r);
}
var Dp = typeof window < "u", Rp = function(t, r) {
  return typeof r == "boolean" ? r : !t;
}, Tp = function(t) {
  return St.useReducer(Rp, t);
}, gf = function(t) {
  St.useEffect(t, []);
}, Mp = Dp ? window : null, ls = function(t) {
  return !!t.addEventListener;
}, cs = function(t) {
  return !!t.on;
}, Op = function(t, r, e, n) {
  e === void 0 && (e = Mp), St.useEffect(function() {
    if (r && e)
      return ls(e) ? pf(e, t, r, n) : cs(e) && e.on(t, r, n), function() {
        ls(e) ? hf(e, t, r, n) : cs(e) && e.off(t, r, n);
      };
  }, [t, r, e, JSON.stringify(n)]);
}, Pp = function(t) {
  return typeof t == "function" ? t : typeof t == "string" ? function(r) {
    return r.key === t;
  } : t ? function() {
    return !0;
  } : function() {
    return !1;
  };
}, vs = function(t, r, e, n) {
  r === void 0 && (r = wp), e === void 0 && (e = {}), n === void 0 && (n = [t]);
  var a = e.event, i = a === void 0 ? "keydown" : a, o = e.target, s = e.options, u = St.useMemo(function() {
    var f = Pp(t), l = function(c) {
      if (f(c))
        return r(c);
    };
    return l;
  }, n);
  Op(i, u, o, s);
}, Ap = function(t) {
  return "touches" in t;
}, ds = function(t) {
  Ap(t) && t.touches.length < 2 && t.preventDefault && t.preventDefault();
}, Ip = function(t, r) {
  var e = r === void 0 ? {} : r, n = e.isPreventDefault, a = n === void 0 ? !0 : n, i = e.delay, o = i === void 0 ? 300 : i, s = St.useRef(), u = St.useRef(), f = St.useCallback(function(c) {
    a && c.target && (pf(c.target, "touchend", ds, { passive: !1 }), u.current = c.target), s.current = setTimeout(function() {
      return t(c);
    }, o);
  }, [t, o, a]), l = St.useCallback(function() {
    s.current && clearTimeout(s.current), a && u.current && hf(u.current, "touchend", ds);
  }, [a]);
  return {
    onMouseDown: function(c) {
      return f(c);
    },
    onTouchStart: function(c) {
      return f(c);
    },
    onMouseUp: l,
    onMouseLeave: l,
    onTouchEnd: l
  };
}, kp = function(t) {
  gf(function() {
    t();
  });
}, zp = {
  restoreOnUnmount: !1
};
function Gp(t, r) {
  r === void 0 && (r = zp);
  var e = St.useRef(document.title);
  document.title !== t && (document.title = t), St.useEffect(function() {
    if (r && r.restoreOnUnmount)
      return function() {
        document.title = e.current;
      };
  }, []);
}
const Bp = typeof document < "u" ? Gp : function(t) {
};
function Np({ arg: { sys: t }, onClick: r }) {
  const e = je((h) => h.aLay), n = je((h) => h.replace);
  class a extends _f {
    nm = "Stage";
    restore() {
      n(this.stt);
    }
    // this.stt から
  }
  t.caretaker.update(() => new a(JSON.stringify(e)));
  const [i, o] = St.useState(ps());
  kp(() => {
    function h() {
      o(ps());
    }
    return globalThis.addEventListener("resize", h), () => globalThis.removeEventListener("resize", h);
  });
  const { cvsScale: s } = Fp(i), u = Wn`
		position: relative;

		transform-origin: left top;
		transform: scale(${s});
		width	: calc(${pr.stageW}px / ${s});
		height	: calc(${pr.stageH}px / ${s});
	`, f = Wn`position: absolute; top: 0; left: 0;`, l = Wn`
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
		top: 48%;
		&:hover {
			color: #fff;
			background: #27acd9;
		}
	`, [c, v] = Tp(!1), d = Ip((h) => {
    h.stopPropagation(), Sf(), v(), mf = c;
  }, { isPreventDefault: !0, delay: 300 }), p = { cmn: { sys: t, styChild: f, sty4Moveable: {
    maxWidth: "auto",
    maxHeight: "auto",
    minWidth: "auto",
    minHeight: "auto",
    transform: "translate(0px, 0px) rotate(0deg)"
  } } };
  return /* @__PURE__ */ $n("div", { css: u, onClick: r, ...d, children: [
    c && /* @__PURE__ */ $n(ia, { children: [
      /* @__PURE__ */ hr("button", { onClick: () => {
      }, css: l, children: "Click" }),
      /* @__PURE__ */ hr("button", { onClick: () => {
      }, css: l, children: "Back" }),
      /* @__PURE__ */ hr("button", { onClick: () => {
      }, css: l, children: "Prev" })
    ] }),
    e.map((h) => h.cls === "GRP" ? /* @__PURE__ */ hr(yp, { cmn: p.cmn, fn: h.fn }, h.nm) : /* @__PURE__ */ hr(Ep, { cmn: p.cmn, str: h.str }, h.nm))
  ] });
}
function Fp({ width: t, height: r }) {
  let e = 0, n = 0, a = 1;
  return pr.stageW > t || pr.stageH > r ? (pr.stageW / pr.stageH <= t / r ? (n = r, e = no(pr.stageW / pr.stageH * r)) : (e = t, n = no(pr.stageH / pr.stageW * t)), a = e / pr.stageW) : (e = pr.stageW, n = pr.stageH, a = 1), { cvsScale: a, cvsWidth: e, cvsHeight: n };
}
function ps() {
  const { innerWidth: t, innerHeight: r } = globalThis;
  return { width: t, height: r };
}
let mf = !1;
const yf = () => mf, Lp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Np,
  getDesignMode: yf
}, Symbol.toStringTag, { value: "Module" }));
var Ef = /* @__PURE__ */ ((t) => (t.Renderer = "renderer", t.Application = "application", t.RendererSystem = "renderer-webgl-system", t.RendererPlugin = "renderer-webgl-plugin", t.CanvasRendererSystem = "renderer-canvas-system", t.CanvasRendererPlugin = "renderer-canvas-plugin", t.Asset = "asset", t.LoadParser = "load-parser", t.ResolveParser = "resolve-parser", t.CacheParser = "cache-parser", t.DetectionParser = "detection-parser", t))(Ef || {});
const oi = (t) => {
  if (typeof t == "function" || typeof t == "object" && t.extension) {
    if (!t.extension)
      throw new Error("Extension class must have an extension object");
    t = { ...typeof t.extension != "object" ? { type: t.extension } : t.extension, ref: t };
  }
  if (typeof t == "object")
    t = { ...t };
  else
    throw new Error("Invalid extension type");
  return typeof t.type == "string" && (t.type = [t.type]), t;
}, hs = (t, r) => oi(t).priority ?? r, Yp = {
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
  remove(...t) {
    return t.map(oi).forEach((r) => {
      r.type.forEach((e) => this._removeHandlers[e]?.(r));
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...t) {
    return t.map(oi).forEach((r) => {
      r.type.forEach((e) => {
        const n = this._addHandlers, a = this._queue;
        n[e] ? n[e]?.(r) : (a[e] = a[e] || [], a[e]?.push(r));
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
  handle(t, r, e) {
    const n = this._addHandlers, a = this._removeHandlers;
    if (n[t] || a[t])
      throw new Error(`Extension type ${t} already has a handler`);
    n[t] = r, a[t] = e;
    const i = this._queue;
    return i[t] && (i[t]?.forEach((o) => r(o)), delete i[t]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap(t, r) {
    return this.handle(
      t,
      (e) => {
        e.name && (r[e.name] = e.ref);
      },
      (e) => {
        e.name && delete r[e.name];
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
  handleByList(t, r, e = -1) {
    return this.handle(
      t,
      (n) => {
        r.includes(n.ref) || (r.push(n.ref), r.sort((a, i) => hs(i, e) - hs(a, e)));
      },
      (n) => {
        const a = r.indexOf(n.ref);
        a !== -1 && r.splice(a, 1);
      }
    );
  }
};
async function Wp({ heStage: t, sys: r }) {
  const { createRoot: e } = await import("./client.js").then((n) => n.c);
  e(t).render(/* @__PURE__ */ hr(Hp, { heStage: t, sys: r })), await Promise.all([
    import("./index.js"),
    import("./ScriptMng.js")
  ]).then(async ([{ Assets: n }, { ScriptMng: a }]) => {
    await n.init({ basePath: location.origin }), Yp.add({
      extension: {
        type: Ef.LoadParser,
        name: "sn-loader"
        //priority: LoaderParserPriority.High,
      },
      test: (o) => o.endsWith(".sn"),
      load: (o) => new Promise(async (s, u) => {
        const f = await fetch(o);
        if (!f.ok) {
          u("sn-loader fetch err:" + f.statusText);
          return;
        }
        try {
          s(await r.dec("sn", await f.text()));
        } catch (l) {
          u(`sn-loader err url:${o} ${l}`);
        }
      })
    }), await new a(r, n).load("main");
  });
}
function Hp({ heStage: t, sys: r }) {
  Bp(r.cfg.oCfg.book.title);
  const e = je((s) => s.addLayer), n = je((s) => s.chgPic), a = je((s) => s.chgStr);
  function i() {
    if (si) {
      si = !1;
      return;
    }
    if (!(yf() || r.caretaker.afterKey()))
      for (console.log("fn:Main.tsx == next =="); ; ) {
        const { done: s, value: u } = jp.next();
        if (s) break;
        r.caretaker.key = "main:" + ++$p, "cls" in u ? e(u) : "fn" in u ? n(u) : a(u);
        break;
      }
  }
  gf(() => i()), vs("ArrowDown", (s) => {
    s.stopPropagation(), s.preventDefault(), i();
  }), vs("ArrowUp", (s) => {
    s.stopPropagation(), s.preventDefault(), r.caretaker.beforeKey();
  });
  const o = St.lazy(() => Promise.resolve().then(() => Lp));
  return /* @__PURE__ */ hr(St.Suspense, { fallback: /* @__PURE__ */ hr(ia, { children: "Loading" }), children: /* @__PURE__ */ hr(o, { arg: { heStage: t, sys: r }, onClick: i }) });
}
let $p = 0;
const jp = Xp();
function* Xp() {
  yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "TXT", nm: "mes", str: "あいうえお" }, yield { nm: "mes", str: "かきくけこ" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
}
let si = !1;
function Sf() {
  si = !0;
}
const Vp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  onLong: Sf,
  opening: Wp
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ef as E,
  Vp as M,
  Yp as e,
  gs as r
};
//# sourceMappingURL=Main.js.map
