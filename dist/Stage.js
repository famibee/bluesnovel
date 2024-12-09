import { g as kr, S as Mr, C as me, u as Zt } from "./web2.js";
function Yr(t, r) {
  for (var s = 0; s < r.length; s++) {
    const i = r[s];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const u in i)
        if (u !== "default" && !(u in t)) {
          const c = Object.getOwnPropertyDescriptor(i, u);
          c && Object.defineProperty(t, u, c.get ? c : {
            enumerable: !0,
            get: () => i[u]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var lt = { exports: {} }, Qe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jt;
function Lr() {
  if (Jt) return Qe;
  Jt = 1;
  var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function s(i, u, c) {
    var h = null;
    if (c !== void 0 && (h = "" + c), u.key !== void 0 && (h = "" + u.key), "key" in u) {
      c = {};
      for (var y in u)
        y !== "key" && (c[y] = u[y]);
    } else c = u;
    return u = c.ref, {
      $$typeof: t,
      type: i,
      key: h,
      ref: u !== void 0 ? u : null,
      props: c
    };
  }
  return Qe.Fragment = r, Qe.jsx = s, Qe.jsxs = s, Qe;
}
var Ze = {}, dt = { exports: {} }, j = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var er;
function Ir() {
  if (er) return j;
  er = 1;
  var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), h = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), x = Symbol.iterator;
  function ee(a) {
    return a === null || typeof a != "object" ? null : (a = x && a[x] || a["@@iterator"], typeof a == "function" ? a : null);
  }
  var B = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, k = Object.assign, P = {};
  function W(a, d, T) {
    this.props = a, this.context = d, this.refs = P, this.updater = T || B;
  }
  W.prototype.isReactComponent = {}, W.prototype.setState = function(a, d) {
    if (typeof a != "object" && typeof a != "function" && a != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, a, d, "setState");
  }, W.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = W.prototype;
  function H(a, d, T) {
    this.props = a, this.context = d, this.refs = P, this.updater = T || B;
  }
  var L = H.prototype = new Y();
  L.constructor = H, k(L, W.prototype), L.isPureReactComponent = !0;
  var z = Array.isArray, l = { H: null, A: null, T: null, S: null }, U = Object.prototype.hasOwnProperty;
  function I(a, d, T, C, $, V) {
    return T = V.ref, {
      $$typeof: t,
      type: a,
      key: d,
      ref: T !== void 0 ? T : null,
      props: V
    };
  }
  function Te(a, d) {
    return I(
      a.type,
      d,
      void 0,
      void 0,
      void 0,
      a.props
    );
  }
  function se(a) {
    return typeof a == "object" && a !== null && a.$$typeof === t;
  }
  function Me(a) {
    var d = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(T) {
      return d[T];
    });
  }
  var Re = /\/+/g;
  function be(a, d) {
    return typeof a == "object" && a !== null && a.key != null ? Me("" + a.key) : d.toString(36);
  }
  function Ee() {
  }
  function Oe(a) {
    switch (a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw a.reason;
      default:
        switch (typeof a.status == "string" ? a.then(Ee, Ee) : (a.status = "pending", a.then(
          function(d) {
            a.status === "pending" && (a.status = "fulfilled", a.value = d);
          },
          function(d) {
            a.status === "pending" && (a.status = "rejected", a.reason = d);
          }
        )), a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw a.reason;
        }
    }
    throw a;
  }
  function fe(a, d, T, C, $) {
    var V = typeof a;
    (V === "undefined" || V === "boolean") && (a = null);
    var A = !1;
    if (a === null) A = !0;
    else
      switch (V) {
        case "bigint":
        case "string":
        case "number":
          A = !0;
          break;
        case "object":
          switch (a.$$typeof) {
            case t:
            case r:
              A = !0;
              break;
            case O:
              return A = a._init, fe(
                A(a._payload),
                d,
                T,
                C,
                $
              );
          }
      }
    if (A)
      return $ = $(a), A = C === "" ? "." + be(a, 0) : C, z($) ? (T = "", A != null && (T = A.replace(Re, "$&/") + "/"), fe($, d, T, "", function(Ae) {
        return Ae;
      })) : $ != null && (se($) && ($ = Te(
        $,
        T + ($.key == null || a && a.key === $.key ? "" : ("" + $.key).replace(
          Re,
          "$&/"
        ) + "/") + A
      )), d.push($)), 1;
    A = 0;
    var ie = C === "" ? "." : C + ":";
    if (z(a))
      for (var Z = 0; Z < a.length; Z++)
        C = a[Z], V = ie + be(C, Z), A += fe(
          C,
          d,
          T,
          V,
          $
        );
    else if (Z = ee(a), typeof Z == "function")
      for (a = Z.call(a), Z = 0; !(C = a.next()).done; )
        C = C.value, V = ie + be(C, Z++), A += fe(
          C,
          d,
          T,
          V,
          $
        );
    else if (V === "object") {
      if (typeof a.then == "function")
        return fe(
          Oe(a),
          d,
          T,
          C,
          $
        );
      throw d = String(a), Error(
        "Objects are not valid as a React child (found: " + (d === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : d) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return A;
  }
  function ce(a, d, T) {
    if (a == null) return a;
    var C = [], $ = 0;
    return fe(a, C, "", "", function(V) {
      return d.call(T, V, $++);
    }), C;
  }
  function _e(a) {
    if (a._status === -1) {
      var d = a._result;
      d = d(), d.then(
        function(T) {
          (a._status === 0 || a._status === -1) && (a._status = 1, a._result = T);
        },
        function(T) {
          (a._status === 0 || a._status === -1) && (a._status = 2, a._result = T);
        }
      ), a._status === -1 && (a._status = 0, a._result = d);
    }
    if (a._status === 1) return a._result.default;
    throw a._result;
  }
  var Ye = typeof reportError == "function" ? reportError : function(a) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var d = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof a == "object" && a !== null && typeof a.message == "string" ? String(a.message) : String(a),
        error: a
      });
      if (!window.dispatchEvent(d)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", a);
      return;
    }
    console.error(a);
  };
  function q() {
  }
  return j.Children = {
    map: ce,
    forEach: function(a, d, T) {
      ce(
        a,
        function() {
          d.apply(this, arguments);
        },
        T
      );
    },
    count: function(a) {
      var d = 0;
      return ce(a, function() {
        d++;
      }), d;
    },
    toArray: function(a) {
      return ce(a, function(d) {
        return d;
      }) || [];
    },
    only: function(a) {
      if (!se(a))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return a;
    }
  }, j.Component = W, j.Fragment = s, j.Profiler = u, j.PureComponent = H, j.StrictMode = i, j.Suspense = S, j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, j.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, j.cache = function(a) {
    return function() {
      return a.apply(null, arguments);
    };
  }, j.cloneElement = function(a, d, T) {
    if (a == null)
      throw Error(
        "The argument must be a React element, but you passed " + a + "."
      );
    var C = k({}, a.props), $ = a.key, V = void 0;
    if (d != null)
      for (A in d.ref !== void 0 && (V = void 0), d.key !== void 0 && ($ = "" + d.key), d)
        !U.call(d, A) || A === "key" || A === "__self" || A === "__source" || A === "ref" && d.ref === void 0 || (C[A] = d[A]);
    var A = arguments.length - 2;
    if (A === 1) C.children = T;
    else if (1 < A) {
      for (var ie = Array(A), Z = 0; Z < A; Z++)
        ie[Z] = arguments[Z + 2];
      C.children = ie;
    }
    return I(a.type, $, void 0, void 0, V, C);
  }, j.createContext = function(a) {
    return a = {
      $$typeof: h,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, a.Provider = a, a.Consumer = {
      $$typeof: c,
      _context: a
    }, a;
  }, j.createElement = function(a, d, T) {
    var C, $ = {}, V = null;
    if (d != null)
      for (C in d.key !== void 0 && (V = "" + d.key), d)
        U.call(d, C) && C !== "key" && C !== "__self" && C !== "__source" && ($[C] = d[C]);
    var A = arguments.length - 2;
    if (A === 1) $.children = T;
    else if (1 < A) {
      for (var ie = Array(A), Z = 0; Z < A; Z++)
        ie[Z] = arguments[Z + 2];
      $.children = ie;
    }
    if (a && a.defaultProps)
      for (C in A = a.defaultProps, A)
        $[C] === void 0 && ($[C] = A[C]);
    return I(a, V, void 0, void 0, null, $);
  }, j.createRef = function() {
    return { current: null };
  }, j.forwardRef = function(a) {
    return { $$typeof: y, render: a };
  }, j.isValidElement = se, j.lazy = function(a) {
    return {
      $$typeof: O,
      _payload: { _status: -1, _result: a },
      _init: _e
    };
  }, j.memo = function(a, d) {
    return {
      $$typeof: v,
      type: a,
      compare: d === void 0 ? null : d
    };
  }, j.startTransition = function(a) {
    var d = l.T, T = {};
    l.T = T;
    try {
      var C = a(), $ = l.S;
      $ !== null && $(T, C), typeof C == "object" && C !== null && typeof C.then == "function" && C.then(q, Ye);
    } catch (V) {
      Ye(V);
    } finally {
      l.T = d;
    }
  }, j.unstable_useCacheRefresh = function() {
    return l.H.useCacheRefresh();
  }, j.use = function(a) {
    return l.H.use(a);
  }, j.useActionState = function(a, d, T) {
    return l.H.useActionState(a, d, T);
  }, j.useCallback = function(a, d) {
    return l.H.useCallback(a, d);
  }, j.useContext = function(a) {
    return l.H.useContext(a);
  }, j.useDebugValue = function() {
  }, j.useDeferredValue = function(a, d) {
    return l.H.useDeferredValue(a, d);
  }, j.useEffect = function(a, d) {
    return l.H.useEffect(a, d);
  }, j.useId = function() {
    return l.H.useId();
  }, j.useImperativeHandle = function(a, d, T) {
    return l.H.useImperativeHandle(a, d, T);
  }, j.useInsertionEffect = function(a, d) {
    return l.H.useInsertionEffect(a, d);
  }, j.useLayoutEffect = function(a, d) {
    return l.H.useLayoutEffect(a, d);
  }, j.useMemo = function(a, d) {
    return l.H.useMemo(a, d);
  }, j.useOptimistic = function(a, d) {
    return l.H.useOptimistic(a, d);
  }, j.useReducer = function(a, d, T) {
    return l.H.useReducer(a, d, T);
  }, j.useRef = function(a) {
    return l.H.useRef(a);
  }, j.useState = function(a) {
    return l.H.useState(a);
  }, j.useSyncExternalStore = function(a, d, T) {
    return l.H.useSyncExternalStore(
      a,
      d,
      T
    );
  }, j.useTransition = function() {
    return l.H.useTransition();
  }, j.version = "19.0.0", j;
}
var et = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
et.exports;
var tr;
function Wr() {
  return tr || (tr = 1, function(t, r) {
    process.env.NODE_ENV !== "production" && function() {
      function s(e, o) {
        Object.defineProperty(c.prototype, e, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              o[0],
              o[1]
            );
          }
        });
      }
      function i(e) {
        return e === null || typeof e != "object" ? null : (e = Ke && e[Ke] || e["@@iterator"], typeof e == "function" ? e : null);
      }
      function u(e, o) {
        e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
        var f = e + "." + o;
        Xe[f] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          o,
          e
        ), Xe[f] = !0);
      }
      function c(e, o, f) {
        this.props = e, this.context = o, this.refs = E, this.updater = f || n;
      }
      function h() {
      }
      function y(e, o, f) {
        this.props = e, this.context = o, this.refs = E, this.updater = f || n;
      }
      function S(e) {
        return "" + e;
      }
      function v(e) {
        try {
          S(e);
          var o = !1;
        } catch {
          o = !0;
        }
        if (o) {
          o = console;
          var f = o.error, p = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return f.call(
            o,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            p
          ), S(e);
        }
      }
      function O(e) {
        if (e == null) return null;
        if (typeof e == "function")
          return e.$$typeof === N ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
          case Z:
            return "Fragment";
          case ie:
            return "Portal";
          case We:
            return "Profiler";
          case Ae:
            return "StrictMode";
          case ve:
            return "Suspense";
          case xe:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (typeof e.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), e.$$typeof) {
            case b:
              return (e.displayName || "Context") + ".Provider";
            case Le:
              return (e._context.displayName || "Context") + ".Consumer";
            case we:
              var o = e.render;
              return e = e.displayName, e || (e = o.displayName || o.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case ze:
              return o = e.displayName || null, o !== null ? o : O(e.type) || "Memo";
            case He:
              o = e._payload, e = e._init;
              try {
                return O(e(o));
              } catch {
              }
          }
        return null;
      }
      function x(e) {
        return typeof e == "string" || typeof e == "function" || e === Z || e === We || e === Ae || e === ve || e === xe || e === st || typeof e == "object" && e !== null && (e.$$typeof === He || e.$$typeof === ze || e.$$typeof === b || e.$$typeof === Le || e.$$typeof === we || e.$$typeof === oe || e.getModuleId !== void 0);
      }
      function ee() {
      }
      function B() {
        if (he === 0) {
          Ue = console.log, Ce = console.info, qe = console.warn, ge = console.error, Wt = console.group, Ht = console.groupCollapsed, Ut = console.groupEnd;
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
        he++;
      }
      function k() {
        if (he--, he === 0) {
          var e = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: m({}, e, { value: Ue }),
            info: m({}, e, { value: Ce }),
            warn: m({}, e, { value: qe }),
            error: m({}, e, { value: ge }),
            group: m({}, e, { value: Wt }),
            groupCollapsed: m({}, e, { value: Ht }),
            groupEnd: m({}, e, { value: Ut })
          });
        }
        0 > he && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function P(e) {
        if (St === void 0)
          try {
            throw Error();
          } catch (f) {
            var o = f.stack.trim().match(/\n( *(at )?)/);
            St = o && o[1] || "", zt = -1 < f.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < f.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + St + e + zt;
      }
      function W(e, o) {
        if (!e || Ct) return "";
        var f = Tt.get(e);
        if (f !== void 0) return f;
        Ct = !0, f = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var p = null;
        p = R.H, R.H = null, B();
        try {
          var g = {
            DetermineComponentFrameRoot: function() {
              try {
                if (o) {
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
                    } catch (Ie) {
                      var ft = Ie;
                    }
                    Reflect.construct(e, [], Pe);
                  } else {
                    try {
                      Pe.call();
                    } catch (Ie) {
                      ft = Ie;
                    }
                    e.call(Pe.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (Ie) {
                    ft = Ie;
                  }
                  (Pe = e()) && typeof Pe.catch == "function" && Pe.catch(function() {
                  });
                }
              } catch (Ie) {
                if (Ie && ft && typeof Ie.stack == "string")
                  return [Ie.stack, ft.stack];
              }
              return [null, null];
            }
          };
          g.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var w = Object.getOwnPropertyDescriptor(
            g.DetermineComponentFrameRoot,
            "name"
          );
          w && w.configurable && Object.defineProperty(
            g.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var _ = g.DetermineComponentFrameRoot(), Q = _[0], D = _[1];
          if (Q && D) {
            var te = Q.split(`
`), le = D.split(`
`);
            for (_ = w = 0; w < te.length && !te[w].includes(
              "DetermineComponentFrameRoot"
            ); )
              w++;
            for (; _ < le.length && !le[_].includes(
              "DetermineComponentFrameRoot"
            ); )
              _++;
            if (w === te.length || _ === le.length)
              for (w = te.length - 1, _ = le.length - 1; 1 <= w && 0 <= _ && te[w] !== le[_]; )
                _--;
            for (; 1 <= w && 0 <= _; w--, _--)
              if (te[w] !== le[_]) {
                if (w !== 1 || _ !== 1)
                  do
                    if (w--, _--, 0 > _ || te[w] !== le[_]) {
                      var De = `
` + te[w].replace(
                        " at new ",
                        " at "
                      );
                      return e.displayName && De.includes("<anonymous>") && (De = De.replace("<anonymous>", e.displayName)), typeof e == "function" && Tt.set(e, De), De;
                    }
                  while (1 <= w && 0 <= _);
                break;
              }
          }
        } finally {
          Ct = !1, R.H = p, k(), Error.prepareStackTrace = f;
        }
        return te = (te = e ? e.displayName || e.name : "") ? P(te) : "", typeof e == "function" && Tt.set(e, te), te;
      }
      function Y(e) {
        if (e == null) return "";
        if (typeof e == "function") {
          var o = e.prototype;
          return W(
            e,
            !(!o || !o.isReactComponent)
          );
        }
        if (typeof e == "string") return P(e);
        switch (e) {
          case ve:
            return P("Suspense");
          case xe:
            return P("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case we:
              return e = W(e.render, !1), e;
            case ze:
              return Y(e.type);
            case He:
              o = e._payload, e = e._init;
              try {
                return Y(e(o));
              } catch {
              }
          }
        return "";
      }
      function H() {
        var e = R.A;
        return e === null ? null : e.getOwner();
      }
      function L(e) {
        if (Se.call(e, "key")) {
          var o = Object.getOwnPropertyDescriptor(e, "key").get;
          if (o && o.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function z(e, o) {
        function f() {
          qt || (qt = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            o
          ));
        }
        f.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: f,
          configurable: !0
        });
      }
      function l() {
        var e = O(this.type);
        return Gt[e] || (Gt[e] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), e = this.props.ref, e !== void 0 ? e : null;
      }
      function U(e, o, f, p, g, w) {
        return f = w.ref, e = {
          $$typeof: A,
          type: e,
          key: o,
          props: w,
          _owner: g
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
      function I(e, o) {
        return o = U(
          e.type,
          o,
          void 0,
          void 0,
          e._owner,
          e.props
        ), o._store.validated = e._store.validated, o;
      }
      function Te(e, o) {
        if (typeof e == "object" && e && e.$$typeof !== jr) {
          if (J(e))
            for (var f = 0; f < e.length; f++) {
              var p = e[f];
              se(p) && Me(p, o);
            }
          else if (se(e))
            e._store && (e._store.validated = 1);
          else if (f = i(e), typeof f == "function" && f !== e.entries && (f = f.call(e), f !== e))
            for (; !(e = f.next()).done; )
              se(e.value) && Me(e.value, o);
        }
      }
      function se(e) {
        return typeof e == "object" && e !== null && e.$$typeof === A;
      }
      function Me(e, o) {
        if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, o = Re(o), !Ft[o])) {
          Ft[o] = !0;
          var f = "";
          e && e._owner != null && e._owner !== H() && (f = null, typeof e._owner.tag == "number" ? f = O(e._owner.type) : typeof e._owner.name == "string" && (f = e._owner.name), f = " It was passed a child from " + f + ".");
          var p = R.getCurrentStack;
          R.getCurrentStack = function() {
            var g = Y(e.type);
            return p && (g += p() || ""), g;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            o,
            f
          ), R.getCurrentStack = p;
        }
      }
      function Re(e) {
        var o = "", f = H();
        return f && (f = O(f.type)) && (o = `

Check the render method of \`` + f + "`."), o || (e = O(e)) && (o = `

Check the top-level render call using <` + e + ">."), o;
      }
      function be(e) {
        var o = { "=": "=0", ":": "=2" };
        return "$" + e.replace(/[=:]/g, function(f) {
          return o[f];
        });
      }
      function Ee(e, o) {
        return typeof e == "object" && e !== null && e.key != null ? (v(e.key), be("" + e.key)) : o.toString(36);
      }
      function Oe() {
      }
      function fe(e) {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            switch (typeof e.status == "string" ? e.then(Oe, Oe) : (e.status = "pending", e.then(
              function(o) {
                e.status === "pending" && (e.status = "fulfilled", e.value = o);
              },
              function(o) {
                e.status === "pending" && (e.status = "rejected", e.reason = o);
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
      function ce(e, o, f, p, g) {
        var w = typeof e;
        (w === "undefined" || w === "boolean") && (e = null);
        var _ = !1;
        if (e === null) _ = !0;
        else
          switch (w) {
            case "bigint":
            case "string":
            case "number":
              _ = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case A:
                case ie:
                  _ = !0;
                  break;
                case He:
                  return _ = e._init, ce(
                    _(e._payload),
                    o,
                    f,
                    p,
                    g
                  );
              }
          }
        if (_) {
          _ = e, g = g(_);
          var Q = p === "" ? "." + Ee(_, 0) : p;
          return J(g) ? (f = "", Q != null && (f = Q.replace(Vt, "$&/") + "/"), ce(g, o, f, "", function(te) {
            return te;
          })) : g != null && (se(g) && (g.key != null && (_ && _.key === g.key || v(g.key)), f = I(
            g,
            f + (g.key == null || _ && _.key === g.key ? "" : ("" + g.key).replace(
              Vt,
              "$&/"
            ) + "/") + Q
          ), p !== "" && _ != null && se(_) && _.key == null && _._store && !_._store.validated && (f._store.validated = 2), g = f), o.push(g)), 1;
        }
        if (_ = 0, Q = p === "" ? "." : p + ":", J(e))
          for (var D = 0; D < e.length; D++)
            p = e[D], w = Q + Ee(p, D), _ += ce(
              p,
              o,
              f,
              w,
              g
            );
        else if (D = i(e), typeof D == "function")
          for (D === e.entries && (Bt || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Bt = !0), e = D.call(e), D = 0; !(p = e.next()).done; )
            p = p.value, w = Q + Ee(p, D++), _ += ce(
              p,
              o,
              f,
              w,
              g
            );
        else if (w === "object") {
          if (typeof e.then == "function")
            return ce(
              fe(e),
              o,
              f,
              p,
              g
            );
          throw o = String(e), Error(
            "Objects are not valid as a React child (found: " + (o === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : o) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return _;
      }
      function _e(e, o, f) {
        if (e == null) return e;
        var p = [], g = 0;
        return ce(e, p, "", "", function(w) {
          return o.call(f, w, g++);
        }), p;
      }
      function Ye(e) {
        if (e._status === -1) {
          var o = e._result;
          o = o(), o.then(
            function(f) {
              (e._status === 0 || e._status === -1) && (e._status = 1, e._result = f);
            },
            function(f) {
              (e._status === 0 || e._status === -1) && (e._status = 2, e._result = f);
            }
          ), e._status === -1 && (e._status = 0, e._result = o);
        }
        if (e._status === 1)
          return o = e._result, o === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            o
          ), "default" in o || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            o
          ), o.default;
        throw e._result;
      }
      function q() {
        var e = R.H;
        return e === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), e;
      }
      function a() {
      }
      function d(e) {
        if (it === null)
          try {
            var o = ("require" + Math.random()).slice(0, 7);
            it = (t && t[o]).call(
              t,
              "timers"
            ).setImmediate;
          } catch {
            it = function(p) {
              Xt === !1 && (Xt = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var g = new MessageChannel();
              g.port1.onmessage = p, g.port2.postMessage(void 0);
            };
          }
        return it(e);
      }
      function T(e) {
        return 1 < e.length && typeof AggregateError == "function" ? new AggregateError(e) : e[0];
      }
      function C(e, o) {
        o !== ut - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), ut = o;
      }
      function $(e, o, f) {
        var p = R.actQueue;
        if (p !== null)
          if (p.length !== 0)
            try {
              V(p), d(function() {
                return $(e, o, f);
              });
              return;
            } catch (g) {
              R.thrownErrors.push(g);
            }
          else R.actQueue = null;
        0 < R.thrownErrors.length ? (p = T(R.thrownErrors), R.thrownErrors.length = 0, f(p)) : o(e);
      }
      function V(e) {
        if (!Rt) {
          Rt = !0;
          var o = 0;
          try {
            for (; o < e.length; o++) {
              var f = e[o];
              do {
                R.didUsePromise = !1;
                var p = f(!1);
                if (p !== null) {
                  if (R.didUsePromise) {
                    e[o] = f, e.splice(0, o);
                    return;
                  }
                  f = p;
                } else break;
              } while (!0);
            }
            e.length = 0;
          } catch (g) {
            e.splice(0, o + 1), R.thrownErrors.push(g);
          } finally {
            Rt = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var A = Symbol.for("react.transitional.element"), ie = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), Ae = Symbol.for("react.strict_mode"), We = Symbol.for("react.profiler"), Le = Symbol.for("react.consumer"), b = Symbol.for("react.context"), we = Symbol.for("react.forward_ref"), ve = Symbol.for("react.suspense"), xe = Symbol.for("react.suspense_list"), ze = Symbol.for("react.memo"), He = Symbol.for("react.lazy"), st = Symbol.for("react.offscreen"), Ke = Symbol.iterator, Xe = {}, n = {
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
      }, m = Object.assign, E = {};
      Object.freeze(E), c.prototype.isReactComponent = {}, c.prototype.setState = function(e, o) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, e, o, "setState");
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
      }, re;
      for (re in M)
        M.hasOwnProperty(re) && s(re, M[re]);
      h.prototype = c.prototype, M = y.prototype = new h(), M.constructor = y, m(M, c.prototype), M.isPureReactComponent = !0;
      var J = Array.isArray, N = Symbol.for("react.client.reference"), R = {
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
      }, Se = Object.prototype.hasOwnProperty, oe = Symbol.for("react.client.reference"), he = 0, Ue, Ce, qe, ge, Wt, Ht, Ut;
      ee.__reactDisabledLog = !0;
      var St, zt, Ct = !1, Tt = new (typeof WeakMap == "function" ? WeakMap : Map)(), jr = Symbol.for("react.client.reference"), qt, Dt, Gt = {}, Ft = {}, Bt = !1, Vt = /\/+/g, Kt = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var o = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
            error: e
          });
          if (!window.dispatchEvent(o)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      }, Xt = !1, it = null, ut = 0, ct = !1, Rt = !1, Qt = typeof queueMicrotask == "function" ? function(e) {
        queueMicrotask(function() {
          return queueMicrotask(e);
        });
      } : d;
      r.Children = {
        map: _e,
        forEach: function(e, o, f) {
          _e(
            e,
            function() {
              o.apply(this, arguments);
            },
            f
          );
        },
        count: function(e) {
          var o = 0;
          return _e(e, function() {
            o++;
          }), o;
        },
        toArray: function(e) {
          return _e(e, function(o) {
            return o;
          }) || [];
        },
        only: function(e) {
          if (!se(e))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return e;
        }
      }, r.Component = c, r.Fragment = Z, r.Profiler = We, r.PureComponent = y, r.StrictMode = Ae, r.Suspense = ve, r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = R, r.act = function(e) {
        var o = R.actQueue, f = ut;
        ut++;
        var p = R.actQueue = o !== null ? o : [], g = !1;
        try {
          var w = e();
        } catch (D) {
          R.thrownErrors.push(D);
        }
        if (0 < R.thrownErrors.length)
          throw C(o, f), e = T(R.thrownErrors), R.thrownErrors.length = 0, e;
        if (w !== null && typeof w == "object" && typeof w.then == "function") {
          var _ = w;
          return Qt(function() {
            g || ct || (ct = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(D, te) {
              g = !0, _.then(
                function(le) {
                  if (C(o, f), f === 0) {
                    try {
                      V(p), d(function() {
                        return $(
                          le,
                          D,
                          te
                        );
                      });
                    } catch (Pe) {
                      R.thrownErrors.push(Pe);
                    }
                    if (0 < R.thrownErrors.length) {
                      var De = T(
                        R.thrownErrors
                      );
                      R.thrownErrors.length = 0, te(De);
                    }
                  } else D(le);
                },
                function(le) {
                  C(o, f), 0 < R.thrownErrors.length && (le = T(
                    R.thrownErrors
                  ), R.thrownErrors.length = 0), te(le);
                }
              );
            }
          };
        }
        var Q = w;
        if (C(o, f), f === 0 && (V(p), p.length !== 0 && Qt(function() {
          g || ct || (ct = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), R.actQueue = null), 0 < R.thrownErrors.length)
          throw e = T(R.thrownErrors), R.thrownErrors.length = 0, e;
        return {
          then: function(D, te) {
            g = !0, f === 0 ? (R.actQueue = p, d(function() {
              return $(
                Q,
                D,
                te
              );
            })) : D(Q);
          }
        };
      }, r.cache = function(e) {
        return function() {
          return e.apply(null, arguments);
        };
      }, r.cloneElement = function(e, o, f) {
        if (e == null)
          throw Error(
            "The argument must be a React element, but you passed " + e + "."
          );
        var p = m({}, e.props), g = e.key, w = e._owner;
        if (o != null) {
          var _;
          e: {
            if (Se.call(o, "ref") && (_ = Object.getOwnPropertyDescriptor(
              o,
              "ref"
            ).get) && _.isReactWarning) {
              _ = !1;
              break e;
            }
            _ = o.ref !== void 0;
          }
          _ && (w = H()), L(o) && (v(o.key), g = "" + o.key);
          for (Q in o)
            !Se.call(o, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && o.ref === void 0 || (p[Q] = o[Q]);
        }
        var Q = arguments.length - 2;
        if (Q === 1) p.children = f;
        else if (1 < Q) {
          _ = Array(Q);
          for (var D = 0; D < Q; D++)
            _[D] = arguments[D + 2];
          p.children = _;
        }
        for (p = U(e.type, g, void 0, void 0, w, p), g = 2; g < arguments.length; g++)
          Te(arguments[g], p.type);
        return p;
      }, r.createContext = function(e) {
        return e = {
          $$typeof: b,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, e.Provider = e, e.Consumer = {
          $$typeof: Le,
          _context: e
        }, e._currentRenderer = null, e._currentRenderer2 = null, e;
      }, r.createElement = function(e, o, f) {
        if (x(e))
          for (var p = 2; p < arguments.length; p++)
            Te(arguments[p], e);
        else {
          if (p = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null) var g = "null";
          else
            J(e) ? g = "array" : e !== void 0 && e.$$typeof === A ? (g = "<" + (O(e.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : g = typeof e;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            g,
            p
          );
        }
        var w;
        if (p = {}, g = null, o != null)
          for (w in Dt || !("__self" in o) || "key" in o || (Dt = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), L(o) && (v(o.key), g = "" + o.key), o)
            Se.call(o, w) && w !== "key" && w !== "__self" && w !== "__source" && (p[w] = o[w]);
        var _ = arguments.length - 2;
        if (_ === 1) p.children = f;
        else if (1 < _) {
          for (var Q = Array(_), D = 0; D < _; D++)
            Q[D] = arguments[D + 2];
          Object.freeze && Object.freeze(Q), p.children = Q;
        }
        if (e && e.defaultProps)
          for (w in _ = e.defaultProps, _)
            p[w] === void 0 && (p[w] = _[w]);
        return g && z(
          p,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        ), U(e, g, void 0, void 0, H(), p);
      }, r.createRef = function() {
        var e = { current: null };
        return Object.seal(e), e;
      }, r.forwardRef = function(e) {
        e != null && e.$$typeof === ze ? console.error(
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
        var o = { $$typeof: we, render: e }, f;
        return Object.defineProperty(o, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(p) {
            f = p, e.name || e.displayName || (Object.defineProperty(e, "name", { value: p }), e.displayName = p);
          }
        }), o;
      }, r.isValidElement = se, r.lazy = function(e) {
        return {
          $$typeof: He,
          _payload: { _status: -1, _result: e },
          _init: Ye
        };
      }, r.memo = function(e, o) {
        x(e) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          e === null ? "null" : typeof e
        ), o = {
          $$typeof: ze,
          type: e,
          compare: o === void 0 ? null : o
        };
        var f;
        return Object.defineProperty(o, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(p) {
            f = p, e.name || e.displayName || (Object.defineProperty(e, "name", { value: p }), e.displayName = p);
          }
        }), o;
      }, r.startTransition = function(e) {
        var o = R.T, f = {};
        R.T = f, f._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var p = e(), g = R.S;
          g !== null && g(f, p), typeof p == "object" && p !== null && typeof p.then == "function" && p.then(a, Kt);
        } catch (w) {
          Kt(w);
        } finally {
          o === null && f._updatedFibers && (e = f._updatedFibers.size, f._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), R.T = o;
        }
      }, r.unstable_useCacheRefresh = function() {
        return q().useCacheRefresh();
      }, r.use = function(e) {
        return q().use(e);
      }, r.useActionState = function(e, o, f) {
        return q().useActionState(
          e,
          o,
          f
        );
      }, r.useCallback = function(e, o) {
        return q().useCallback(e, o);
      }, r.useContext = function(e) {
        var o = q();
        return e.$$typeof === Le && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), o.useContext(e);
      }, r.useDebugValue = function(e, o) {
        return q().useDebugValue(e, o);
      }, r.useDeferredValue = function(e, o) {
        return q().useDeferredValue(e, o);
      }, r.useEffect = function(e, o) {
        return q().useEffect(e, o);
      }, r.useId = function() {
        return q().useId();
      }, r.useImperativeHandle = function(e, o, f) {
        return q().useImperativeHandle(e, o, f);
      }, r.useInsertionEffect = function(e, o) {
        return q().useInsertionEffect(e, o);
      }, r.useLayoutEffect = function(e, o) {
        return q().useLayoutEffect(e, o);
      }, r.useMemo = function(e, o) {
        return q().useMemo(e, o);
      }, r.useOptimistic = function(e, o) {
        return q().useOptimistic(e, o);
      }, r.useReducer = function(e, o, f) {
        return q().useReducer(e, o, f);
      }, r.useRef = function(e) {
        return q().useRef(e);
      }, r.useState = function(e) {
        return q().useState(e);
      }, r.useSyncExternalStore = function(e, o, f) {
        return q().useSyncExternalStore(
          e,
          o,
          f
        );
      }, r.useTransition = function() {
        return q().useTransition();
      }, r.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(et, et.exports)), et.exports;
}
var rr;
function Er() {
  return rr || (rr = 1, process.env.NODE_ENV === "production" ? dt.exports = Ir() : dt.exports = Wr()), dt.exports;
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
var nr;
function Hr() {
  return nr || (nr = 1, process.env.NODE_ENV !== "production" && function() {
    function t(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === Ye ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case U:
          return "Fragment";
        case l:
          return "Portal";
        case Te:
          return "Profiler";
        case I:
          return "StrictMode";
        case be:
          return "Suspense";
        case Ee:
          return "SuspenseList";
      }
      if (typeof n == "object")
        switch (typeof n.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), n.$$typeof) {
          case Me:
            return (n.displayName || "Context") + ".Provider";
          case se:
            return (n._context.displayName || "Context") + ".Consumer";
          case Re:
            var m = n.render;
            return n = n.displayName, n || (n = m.displayName || m.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case Oe:
            return m = n.displayName || null, m !== null ? m : t(n.type) || "Memo";
          case fe:
            m = n._payload, n = n._init;
            try {
              return t(n(m));
            } catch {
            }
        }
      return null;
    }
    function r(n) {
      return "" + n;
    }
    function s(n) {
      try {
        r(n);
        var m = !1;
      } catch {
        m = !0;
      }
      if (m) {
        m = console;
        var E = m.error, M = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return E.call(
          m,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          M
        ), r(n);
      }
    }
    function i() {
    }
    function u() {
      if ($ === 0) {
        V = console.log, A = console.info, ie = console.warn, Z = console.error, Ae = console.group, We = console.groupCollapsed, Le = console.groupEnd;
        var n = {
          configurable: !0,
          enumerable: !0,
          value: i,
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
      $++;
    }
    function c() {
      if ($--, $ === 0) {
        var n = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: d({}, n, { value: V }),
          info: d({}, n, { value: A }),
          warn: d({}, n, { value: ie }),
          error: d({}, n, { value: Z }),
          group: d({}, n, { value: Ae }),
          groupCollapsed: d({}, n, { value: We }),
          groupEnd: d({}, n, { value: Le })
        });
      }
      0 > $ && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function h(n) {
      if (b === void 0)
        try {
          throw Error();
        } catch (E) {
          var m = E.stack.trim().match(/\n( *(at )?)/);
          b = m && m[1] || "", we = -1 < E.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < E.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + b + n + we;
    }
    function y(n, m) {
      if (!n || ve) return "";
      var E = xe.get(n);
      if (E !== void 0) return E;
      ve = !0, E = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var M = null;
      M = q.H, q.H = null, u();
      try {
        var re = {
          DetermineComponentFrameRoot: function() {
            try {
              if (m) {
                var Ce = function() {
                  throw Error();
                };
                if (Object.defineProperty(Ce.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Ce, []);
                  } catch (ge) {
                    var qe = ge;
                  }
                  Reflect.construct(n, [], Ce);
                } else {
                  try {
                    Ce.call();
                  } catch (ge) {
                    qe = ge;
                  }
                  n.call(Ce.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (ge) {
                  qe = ge;
                }
                (Ce = n()) && typeof Ce.catch == "function" && Ce.catch(function() {
                });
              }
            } catch (ge) {
              if (ge && qe && typeof ge.stack == "string")
                return [ge.stack, qe.stack];
            }
            return [null, null];
          }
        };
        re.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var J = Object.getOwnPropertyDescriptor(
          re.DetermineComponentFrameRoot,
          "name"
        );
        J && J.configurable && Object.defineProperty(
          re.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var N = re.DetermineComponentFrameRoot(), R = N[0], Se = N[1];
        if (R && Se) {
          var oe = R.split(`
`), he = Se.split(`
`);
          for (N = J = 0; J < oe.length && !oe[J].includes(
            "DetermineComponentFrameRoot"
          ); )
            J++;
          for (; N < he.length && !he[N].includes(
            "DetermineComponentFrameRoot"
          ); )
            N++;
          if (J === oe.length || N === he.length)
            for (J = oe.length - 1, N = he.length - 1; 1 <= J && 0 <= N && oe[J] !== he[N]; )
              N--;
          for (; 1 <= J && 0 <= N; J--, N--)
            if (oe[J] !== he[N]) {
              if (J !== 1 || N !== 1)
                do
                  if (J--, N--, 0 > N || oe[J] !== he[N]) {
                    var Ue = `
` + oe[J].replace(
                      " at new ",
                      " at "
                    );
                    return n.displayName && Ue.includes("<anonymous>") && (Ue = Ue.replace("<anonymous>", n.displayName)), typeof n == "function" && xe.set(n, Ue), Ue;
                  }
                while (1 <= J && 0 <= N);
              break;
            }
        }
      } finally {
        ve = !1, q.H = M, c(), Error.prepareStackTrace = E;
      }
      return oe = (oe = n ? n.displayName || n.name : "") ? h(oe) : "", typeof n == "function" && xe.set(n, oe), oe;
    }
    function S(n) {
      if (n == null) return "";
      if (typeof n == "function") {
        var m = n.prototype;
        return y(
          n,
          !(!m || !m.isReactComponent)
        );
      }
      if (typeof n == "string") return h(n);
      switch (n) {
        case be:
          return h("Suspense");
        case Ee:
          return h("SuspenseList");
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case Re:
            return n = y(n.render, !1), n;
          case Oe:
            return S(n.type);
          case fe:
            m = n._payload, n = n._init;
            try {
              return S(n(m));
            } catch {
            }
        }
      return "";
    }
    function v() {
      var n = q.A;
      return n === null ? null : n.getOwner();
    }
    function O(n) {
      if (a.call(n, "key")) {
        var m = Object.getOwnPropertyDescriptor(n, "key").get;
        if (m && m.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }
    function x(n, m) {
      function E() {
        He || (He = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          m
        ));
      }
      E.isReactWarning = !0, Object.defineProperty(n, "key", {
        get: E,
        configurable: !0
      });
    }
    function ee() {
      var n = t(this.type);
      return st[n] || (st[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function B(n, m, E, M, re, J) {
      return E = J.ref, n = {
        $$typeof: z,
        type: n,
        key: m,
        props: J,
        _owner: re
      }, (E !== void 0 ? E : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: ee
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
    function k(n, m, E, M, re, J) {
      if (typeof n == "string" || typeof n == "function" || n === U || n === Te || n === I || n === be || n === Ee || n === ce || typeof n == "object" && n !== null && (n.$$typeof === fe || n.$$typeof === Oe || n.$$typeof === Me || n.$$typeof === se || n.$$typeof === Re || n.$$typeof === T || n.getModuleId !== void 0)) {
        var N = m.children;
        if (N !== void 0)
          if (M)
            if (C(N)) {
              for (M = 0; M < N.length; M++)
                P(N[M], n);
              Object.freeze && Object.freeze(N);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else P(N, n);
      } else
        N = "", (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), n === null ? M = "null" : C(n) ? M = "array" : n !== void 0 && n.$$typeof === z ? (M = "<" + (t(n.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : M = typeof n, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          M,
          N
        );
      if (a.call(m, "key")) {
        N = t(n);
        var R = Object.keys(m).filter(function(oe) {
          return oe !== "key";
        });
        M = 0 < R.length ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}", Ke[N + M] || (R = 0 < R.length ? "{" + R.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          M,
          N,
          R,
          N
        ), Ke[N + M] = !0);
      }
      if (N = null, E !== void 0 && (s(E), N = "" + E), O(m) && (s(m.key), N = "" + m.key), "key" in m) {
        E = {};
        for (var Se in m)
          Se !== "key" && (E[Se] = m[Se]);
      } else E = m;
      return N && x(
        E,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), B(n, N, J, re, v(), E);
    }
    function P(n, m) {
      if (typeof n == "object" && n && n.$$typeof !== ze) {
        if (C(n))
          for (var E = 0; E < n.length; E++) {
            var M = n[E];
            W(M) && Y(M, m);
          }
        else if (W(n))
          n._store && (n._store.validated = 1);
        else if (n === null || typeof n != "object" ? E = null : (E = _e && n[_e] || n["@@iterator"], E = typeof E == "function" ? E : null), typeof E == "function" && E !== n.entries && (E = E.call(n), E !== n))
          for (; !(n = E.next()).done; )
            W(n.value) && Y(n.value, m);
      }
    }
    function W(n) {
      return typeof n == "object" && n !== null && n.$$typeof === z;
    }
    function Y(n, m) {
      if (n._store && !n._store.validated && n.key == null && (n._store.validated = 1, m = H(m), !Xe[m])) {
        Xe[m] = !0;
        var E = "";
        n && n._owner != null && n._owner !== v() && (E = null, typeof n._owner.tag == "number" ? E = t(n._owner.type) : typeof n._owner.name == "string" && (E = n._owner.name), E = " It was passed a child from " + E + ".");
        var M = q.getCurrentStack;
        q.getCurrentStack = function() {
          var re = S(n.type);
          return M && (re += M() || ""), re;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          m,
          E
        ), q.getCurrentStack = M;
      }
    }
    function H(n) {
      var m = "", E = v();
      return E && (E = t(E.type)) && (m = `

Check the render method of \`` + E + "`."), m || (n = t(n)) && (m = `

Check the top-level render call using <` + n + ">."), m;
    }
    var L = Er(), z = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), U = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), Te = Symbol.for("react.profiler"), se = Symbol.for("react.consumer"), Me = Symbol.for("react.context"), Re = Symbol.for("react.forward_ref"), be = Symbol.for("react.suspense"), Ee = Symbol.for("react.suspense_list"), Oe = Symbol.for("react.memo"), fe = Symbol.for("react.lazy"), ce = Symbol.for("react.offscreen"), _e = Symbol.iterator, Ye = Symbol.for("react.client.reference"), q = L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, a = Object.prototype.hasOwnProperty, d = Object.assign, T = Symbol.for("react.client.reference"), C = Array.isArray, $ = 0, V, A, ie, Z, Ae, We, Le;
    i.__reactDisabledLog = !0;
    var b, we, ve = !1, xe = new (typeof WeakMap == "function" ? WeakMap : Map)(), ze = Symbol.for("react.client.reference"), He, st = {}, Ke = {}, Xe = {};
    Ze.Fragment = U, Ze.jsx = function(n, m, E, M, re) {
      return k(n, m, E, !1, M, re);
    }, Ze.jsxs = function(n, m, E, M, re) {
      return k(n, m, E, !0, M, re);
    };
  }()), Ze;
}
var or;
function Ur() {
  return or || (or = 1, process.env.NODE_ENV === "production" ? lt.exports = Lr() : lt.exports = Hr()), lt.exports;
}
var tt = Ur(), de = Er();
const $t = /* @__PURE__ */ kr(de), ar = /* @__PURE__ */ Yr({
  __proto__: null,
  default: $t
}, [de]);
var zr = !1;
function qr(t) {
  if (t.sheet)
    return t.sheet;
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === t)
      return document.styleSheets[r];
}
function Dr(t) {
  var r = document.createElement("style");
  return r.setAttribute("data-emotion", t.key), t.nonce !== void 0 && r.setAttribute("nonce", t.nonce), r.appendChild(document.createTextNode("")), r.setAttribute("data-s", ""), r;
}
var Gr = /* @__PURE__ */ function() {
  function t(s) {
    var i = this;
    this._insertTag = function(u) {
      var c;
      i.tags.length === 0 ? i.insertionPoint ? c = i.insertionPoint.nextSibling : i.prepend ? c = i.container.firstChild : c = i.before : c = i.tags[i.tags.length - 1].nextSibling, i.container.insertBefore(u, c), i.tags.push(u);
    }, this.isSpeedy = s.speedy === void 0 ? !zr : s.speedy, this.tags = [], this.ctr = 0, this.nonce = s.nonce, this.key = s.key, this.container = s.container, this.prepend = s.prepend, this.insertionPoint = s.insertionPoint, this.before = null;
  }
  var r = t.prototype;
  return r.hydrate = function(i) {
    i.forEach(this._insertTag);
  }, r.insert = function(i) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Dr(this));
    var u = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var c = qr(u);
      try {
        c.insertRule(i, c.cssRules.length);
      } catch {
      }
    } else
      u.appendChild(document.createTextNode(i));
    this.ctr++;
  }, r.flush = function() {
    this.tags.forEach(function(i) {
      var u;
      return (u = i.parentNode) == null ? void 0 : u.removeChild(i);
    }), this.tags = [], this.ctr = 0;
  }, t;
}(), ue = "-ms-", Et = "-moz-", G = "-webkit-", gr = "comm", Yt = "rule", Lt = "decl", Fr = "@import", br = "@keyframes", Br = "@layer", Vr = Math.abs, gt = String.fromCharCode, Kr = Object.assign;
function Xr(t, r) {
  return ae(t, 0) ^ 45 ? (((r << 2 ^ ae(t, 0)) << 2 ^ ae(t, 1)) << 2 ^ ae(t, 2)) << 2 ^ ae(t, 3) : 0;
}
function _r(t) {
  return t.trim();
}
function Qr(t, r) {
  return (t = r.exec(t)) ? t[0] : t;
}
function F(t, r, s) {
  return t.replace(r, s);
}
function Nt(t, r) {
  return t.indexOf(r);
}
function ae(t, r) {
  return t.charCodeAt(r) | 0;
}
function rt(t, r, s) {
  return t.slice(r, s);
}
function $e(t) {
  return t.length;
}
function It(t) {
  return t.length;
}
function pt(t, r) {
  return r.push(t), t;
}
function Zr(t, r) {
  return t.map(r).join("");
}
var bt = 1, Fe = 1, wr = 0, pe = 0, ne = 0, Ve = "";
function _t(t, r, s, i, u, c, h) {
  return { value: t, root: r, parent: s, type: i, props: u, children: c, line: bt, column: Fe, length: h, return: "" };
}
function Je(t, r) {
  return Kr(_t("", null, null, "", null, null, 0), t, { length: -t.length }, r);
}
function Jr() {
  return ne;
}
function en() {
  return ne = pe > 0 ? ae(Ve, --pe) : 0, Fe--, ne === 10 && (Fe = 1, bt--), ne;
}
function ye() {
  return ne = pe < wr ? ae(Ve, pe++) : 0, Fe++, ne === 10 && (Fe = 1, bt++), ne;
}
function ke() {
  return ae(Ve, pe);
}
function ht() {
  return pe;
}
function at(t, r) {
  return rt(Ve, t, r);
}
function nt(t) {
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
function Sr(t) {
  return bt = Fe = 1, wr = $e(Ve = t), pe = 0, [];
}
function Cr(t) {
  return Ve = "", t;
}
function mt(t) {
  return _r(at(pe - 1, jt(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function tn(t) {
  for (; (ne = ke()) && ne < 33; )
    ye();
  return nt(t) > 2 || nt(ne) > 3 ? "" : " ";
}
function rn(t, r) {
  for (; --r && ye() && !(ne < 48 || ne > 102 || ne > 57 && ne < 65 || ne > 70 && ne < 97); )
    ;
  return at(t, ht() + (r < 6 && ke() == 32 && ye() == 32));
}
function jt(t) {
  for (; ye(); )
    switch (ne) {
      // ] ) " '
      case t:
        return pe;
      // " '
      case 34:
      case 39:
        t !== 34 && t !== 39 && jt(ne);
        break;
      // (
      case 40:
        t === 41 && jt(t);
        break;
      // \
      case 92:
        ye();
        break;
    }
  return pe;
}
function nn(t, r) {
  for (; ye() && t + ne !== 57; )
    if (t + ne === 84 && ke() === 47)
      break;
  return "/*" + at(r, pe - 1) + "*" + gt(t === 47 ? t : ye());
}
function on(t) {
  for (; !nt(ke()); )
    ye();
  return at(t, pe);
}
function an(t) {
  return Cr(yt("", null, null, null, [""], t = Sr(t), 0, [0], t));
}
function yt(t, r, s, i, u, c, h, y, S) {
  for (var v = 0, O = 0, x = h, ee = 0, B = 0, k = 0, P = 1, W = 1, Y = 1, H = 0, L = "", z = u, l = c, U = i, I = L; W; )
    switch (k = H, H = ye()) {
      // (
      case 40:
        if (k != 108 && ae(I, x - 1) == 58) {
          Nt(I += F(mt(H), "&", "&\f"), "&\f") != -1 && (Y = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        I += mt(H);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        I += tn(k);
        break;
      // \
      case 92:
        I += rn(ht() - 1, 7);
        continue;
      // /
      case 47:
        switch (ke()) {
          case 42:
          case 47:
            pt(sn(nn(ye(), ht()), r, s), S);
            break;
          default:
            I += "/";
        }
        break;
      // {
      case 123 * P:
        y[v++] = $e(I) * Y;
      // } ; \0
      case 125 * P:
      case 59:
      case 0:
        switch (H) {
          // \0 }
          case 0:
          case 125:
            W = 0;
          // ;
          case 59 + O:
            Y == -1 && (I = F(I, /\f/g, "")), B > 0 && $e(I) - x && pt(B > 32 ? ir(I + ";", i, s, x - 1) : ir(F(I, " ", "") + ";", i, s, x - 2), S);
            break;
          // @ ;
          case 59:
            I += ";";
          // { rule/at-rule
          default:
            if (pt(U = sr(I, r, s, v, O, u, y, L, z = [], l = [], x), c), H === 123)
              if (O === 0)
                yt(I, r, U, U, z, c, x, y, l);
              else
                switch (ee === 99 && ae(I, 3) === 110 ? 100 : ee) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    yt(t, U, U, i && pt(sr(t, U, U, 0, 0, u, y, L, u, z = [], x), l), u, l, x, y, i ? z : l);
                    break;
                  default:
                    yt(I, U, U, U, [""], l, 0, y, l);
                }
        }
        v = O = B = 0, P = Y = 1, L = I = "", x = h;
        break;
      // :
      case 58:
        x = 1 + $e(I), B = k;
      default:
        if (P < 1) {
          if (H == 123)
            --P;
          else if (H == 125 && P++ == 0 && en() == 125)
            continue;
        }
        switch (I += gt(H), H * P) {
          // &
          case 38:
            Y = O > 0 ? 1 : (I += "\f", -1);
            break;
          // ,
          case 44:
            y[v++] = ($e(I) - 1) * Y, Y = 1;
            break;
          // @
          case 64:
            ke() === 45 && (I += mt(ye())), ee = ke(), O = x = $e(L = I += on(ht())), H++;
            break;
          // -
          case 45:
            k === 45 && $e(I) == 2 && (P = 0);
        }
    }
  return c;
}
function sr(t, r, s, i, u, c, h, y, S, v, O) {
  for (var x = u - 1, ee = u === 0 ? c : [""], B = It(ee), k = 0, P = 0, W = 0; k < i; ++k)
    for (var Y = 0, H = rt(t, x + 1, x = Vr(P = h[k])), L = t; Y < B; ++Y)
      (L = _r(P > 0 ? ee[Y] + " " + H : F(H, /&\f/g, ee[Y]))) && (S[W++] = L);
  return _t(t, r, s, u === 0 ? Yt : y, S, v, O);
}
function sn(t, r, s) {
  return _t(t, r, s, gr, gt(Jr()), rt(t, 2, -2), 0);
}
function ir(t, r, s, i) {
  return _t(t, r, s, Lt, rt(t, 0, i), rt(t, i + 1, -1), i);
}
function Ge(t, r) {
  for (var s = "", i = It(t), u = 0; u < i; u++)
    s += r(t[u], u, t, r) || "";
  return s;
}
function un(t, r, s, i) {
  switch (t.type) {
    case Br:
      if (t.children.length) break;
    case Fr:
    case Lt:
      return t.return = t.return || t.value;
    case gr:
      return "";
    case br:
      return t.return = t.value + "{" + Ge(t.children, i) + "}";
    case Yt:
      t.value = t.props.join(",");
  }
  return $e(s = Ge(t.children, i)) ? t.return = t.value + "{" + s + "}" : "";
}
function cn(t) {
  var r = It(t);
  return function(s, i, u, c) {
    for (var h = "", y = 0; y < r; y++)
      h += t[y](s, i, u, c) || "";
    return h;
  };
}
function fn(t) {
  return function(r) {
    r.root || (r = r.return) && t(r);
  };
}
function ln(t) {
  var r = /* @__PURE__ */ Object.create(null);
  return function(s) {
    return r[s] === void 0 && (r[s] = t(s)), r[s];
  };
}
var dn = function(r, s, i) {
  for (var u = 0, c = 0; u = c, c = ke(), u === 38 && c === 12 && (s[i] = 1), !nt(c); )
    ye();
  return at(r, pe);
}, pn = function(r, s) {
  var i = -1, u = 44;
  do
    switch (nt(u)) {
      case 0:
        u === 38 && ke() === 12 && (s[i] = 1), r[i] += dn(pe - 1, s, i);
        break;
      case 2:
        r[i] += mt(u);
        break;
      case 4:
        if (u === 44) {
          r[++i] = ke() === 58 ? "&\f" : "", s[i] = r[i].length;
          break;
        }
      // fallthrough
      default:
        r[i] += gt(u);
    }
  while (u = ye());
  return r;
}, vn = function(r, s) {
  return Cr(pn(Sr(r), s));
}, ur = /* @__PURE__ */ new WeakMap(), hn = function(r) {
  if (!(r.type !== "rule" || !r.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r.length < 1)) {
    for (var s = r.value, i = r.parent, u = r.column === i.column && r.line === i.line; i.type !== "rule"; )
      if (i = i.parent, !i) return;
    if (!(r.props.length === 1 && s.charCodeAt(0) !== 58 && !ur.get(i)) && !u) {
      ur.set(r, !0);
      for (var c = [], h = vn(s, c), y = i.props, S = 0, v = 0; S < h.length; S++)
        for (var O = 0; O < y.length; O++, v++)
          r.props[v] = c[S] ? h[S].replace(/&\f/g, y[O]) : y[O] + " " + h[S];
    }
  }
}, mn = function(r) {
  if (r.type === "decl") {
    var s = r.value;
    // charcode for l
    s.charCodeAt(0) === 108 && // charcode for b
    s.charCodeAt(2) === 98 && (r.return = "", r.value = "");
  }
};
function Tr(t, r) {
  switch (Xr(t, r)) {
    // color-adjust
    case 5103:
      return G + "print-" + t + t;
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
      return G + t + t;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return G + t + Et + t + ue + t + t;
    // flex, flex-direction
    case 6828:
    case 4268:
      return G + t + ue + t + t;
    // order
    case 6165:
      return G + t + ue + "flex-" + t + t;
    // align-items
    case 5187:
      return G + t + F(t, /(\w+).+(:[^]+)/, G + "box-$1$2" + ue + "flex-$1$2") + t;
    // align-self
    case 5443:
      return G + t + ue + "flex-item-" + F(t, /flex-|-self/, "") + t;
    // align-content
    case 4675:
      return G + t + ue + "flex-line-pack" + F(t, /align-content|flex-|-self/, "") + t;
    // flex-shrink
    case 5548:
      return G + t + ue + F(t, "shrink", "negative") + t;
    // flex-basis
    case 5292:
      return G + t + ue + F(t, "basis", "preferred-size") + t;
    // flex-grow
    case 6060:
      return G + "box-" + F(t, "-grow", "") + G + t + ue + F(t, "grow", "positive") + t;
    // transition
    case 4554:
      return G + F(t, /([^-])(transform)/g, "$1" + G + "$2") + t;
    // cursor
    case 6187:
      return F(F(F(t, /(zoom-|grab)/, G + "$1"), /(image-set)/, G + "$1"), t, "") + t;
    // background, background-image
    case 5495:
    case 3959:
      return F(t, /(image-set\([^]*)/, G + "$1$`$1");
    // justify-content
    case 4968:
      return F(F(t, /(.+:)(flex-)?(.*)/, G + "box-pack:$3" + ue + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + G + t + t;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return F(t, /(.+)-inline(.+)/, G + "$1$2") + t;
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
      if ($e(t) - 1 - r > 6) switch (ae(t, r + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (ae(t, r + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return F(t, /(.+:)(.+)-([^]+)/, "$1" + G + "$2-$3$1" + Et + (ae(t, r + 3) == 108 ? "$3" : "$2-$3")) + t;
        // (s)tretch
        case 115:
          return ~Nt(t, "stretch") ? Tr(F(t, "stretch", "fill-available"), r) + t : t;
      }
      break;
    // position: sticky
    case 4949:
      if (ae(t, r + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (ae(t, $e(t) - 3 - (~Nt(t, "!important") && 10))) {
        // stic(k)y
        case 107:
          return F(t, ":", ":" + G) + t;
        // (inline-)?fl(e)x
        case 101:
          return F(t, /(.+:)([^;!]+)(;|!.+)?/, "$1" + G + (ae(t, 14) === 45 ? "inline-" : "") + "box$3$1" + G + "$2$3$1" + ue + "$2box$3") + t;
      }
      break;
    // writing-mode
    case 5936:
      switch (ae(t, r + 11)) {
        // vertical-l(r)
        case 114:
          return G + t + ue + F(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        // vertical-r(l)
        case 108:
          return G + t + ue + F(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        // horizontal(-)tb
        case 45:
          return G + t + ue + F(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
      return G + t + ue + t + t;
  }
  return t;
}
var yn = function(r, s, i, u) {
  if (r.length > -1 && !r.return) switch (r.type) {
    case Lt:
      r.return = Tr(r.value, r.length);
      break;
    case br:
      return Ge([Je(r, {
        value: F(r.value, "@", "@" + G)
      })], u);
    case Yt:
      if (r.length) return Zr(r.props, function(c) {
        switch (Qr(c, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return Ge([Je(r, {
              props: [F(c, /:(read-\w+)/, ":" + Et + "$1")]
            })], u);
          // :placeholder
          case "::placeholder":
            return Ge([Je(r, {
              props: [F(c, /:(plac\w+)/, ":" + G + "input-$1")]
            }), Je(r, {
              props: [F(c, /:(plac\w+)/, ":" + Et + "$1")]
            }), Je(r, {
              props: [F(c, /:(plac\w+)/, ue + "input-$1")]
            })], u);
        }
        return "";
      });
  }
}, En = [yn], gn = function(r) {
  var s = r.key;
  if (s === "css") {
    var i = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(i, function(P) {
      var W = P.getAttribute("data-emotion");
      W.indexOf(" ") !== -1 && (document.head.appendChild(P), P.setAttribute("data-s", ""));
    });
  }
  var u = r.stylisPlugins || En, c = {}, h, y = [];
  h = r.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + s + ' "]'),
    function(P) {
      for (var W = P.getAttribute("data-emotion").split(" "), Y = 1; Y < W.length; Y++)
        c[W[Y]] = !0;
      y.push(P);
    }
  );
  var S, v = [hn, mn];
  {
    var O, x = [un, fn(function(P) {
      O.insert(P);
    })], ee = cn(v.concat(u, x)), B = function(W) {
      return Ge(an(W), ee);
    };
    S = function(W, Y, H, L) {
      O = H, B(W ? W + "{" + Y.styles + "}" : Y.styles), L && (k.inserted[Y.name] = !0);
    };
  }
  var k = {
    key: s,
    sheet: new Gr({
      key: s,
      container: h,
      nonce: r.nonce,
      speedy: r.speedy,
      prepend: r.prepend,
      insertionPoint: r.insertionPoint
    }),
    nonce: r.nonce,
    inserted: c,
    registered: {},
    insert: S
  };
  return k.sheet.hydrate(y), k;
}, vt = { exports: {} }, K = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cr;
function bn() {
  if (cr) return K;
  cr = 1;
  var t = typeof Symbol == "function" && Symbol.for, r = t ? Symbol.for("react.element") : 60103, s = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, u = t ? Symbol.for("react.strict_mode") : 60108, c = t ? Symbol.for("react.profiler") : 60114, h = t ? Symbol.for("react.provider") : 60109, y = t ? Symbol.for("react.context") : 60110, S = t ? Symbol.for("react.async_mode") : 60111, v = t ? Symbol.for("react.concurrent_mode") : 60111, O = t ? Symbol.for("react.forward_ref") : 60112, x = t ? Symbol.for("react.suspense") : 60113, ee = t ? Symbol.for("react.suspense_list") : 60120, B = t ? Symbol.for("react.memo") : 60115, k = t ? Symbol.for("react.lazy") : 60116, P = t ? Symbol.for("react.block") : 60121, W = t ? Symbol.for("react.fundamental") : 60117, Y = t ? Symbol.for("react.responder") : 60118, H = t ? Symbol.for("react.scope") : 60119;
  function L(l) {
    if (typeof l == "object" && l !== null) {
      var U = l.$$typeof;
      switch (U) {
        case r:
          switch (l = l.type, l) {
            case S:
            case v:
            case i:
            case c:
            case u:
            case x:
              return l;
            default:
              switch (l = l && l.$$typeof, l) {
                case y:
                case O:
                case k:
                case B:
                case h:
                  return l;
                default:
                  return U;
              }
          }
        case s:
          return U;
      }
    }
  }
  function z(l) {
    return L(l) === v;
  }
  return K.AsyncMode = S, K.ConcurrentMode = v, K.ContextConsumer = y, K.ContextProvider = h, K.Element = r, K.ForwardRef = O, K.Fragment = i, K.Lazy = k, K.Memo = B, K.Portal = s, K.Profiler = c, K.StrictMode = u, K.Suspense = x, K.isAsyncMode = function(l) {
    return z(l) || L(l) === S;
  }, K.isConcurrentMode = z, K.isContextConsumer = function(l) {
    return L(l) === y;
  }, K.isContextProvider = function(l) {
    return L(l) === h;
  }, K.isElement = function(l) {
    return typeof l == "object" && l !== null && l.$$typeof === r;
  }, K.isForwardRef = function(l) {
    return L(l) === O;
  }, K.isFragment = function(l) {
    return L(l) === i;
  }, K.isLazy = function(l) {
    return L(l) === k;
  }, K.isMemo = function(l) {
    return L(l) === B;
  }, K.isPortal = function(l) {
    return L(l) === s;
  }, K.isProfiler = function(l) {
    return L(l) === c;
  }, K.isStrictMode = function(l) {
    return L(l) === u;
  }, K.isSuspense = function(l) {
    return L(l) === x;
  }, K.isValidElementType = function(l) {
    return typeof l == "string" || typeof l == "function" || l === i || l === v || l === c || l === u || l === x || l === ee || typeof l == "object" && l !== null && (l.$$typeof === k || l.$$typeof === B || l.$$typeof === h || l.$$typeof === y || l.$$typeof === O || l.$$typeof === W || l.$$typeof === Y || l.$$typeof === H || l.$$typeof === P);
  }, K.typeOf = L, K;
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
var fr;
function _n() {
  return fr || (fr = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, r = t ? Symbol.for("react.element") : 60103, s = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, u = t ? Symbol.for("react.strict_mode") : 60108, c = t ? Symbol.for("react.profiler") : 60114, h = t ? Symbol.for("react.provider") : 60109, y = t ? Symbol.for("react.context") : 60110, S = t ? Symbol.for("react.async_mode") : 60111, v = t ? Symbol.for("react.concurrent_mode") : 60111, O = t ? Symbol.for("react.forward_ref") : 60112, x = t ? Symbol.for("react.suspense") : 60113, ee = t ? Symbol.for("react.suspense_list") : 60120, B = t ? Symbol.for("react.memo") : 60115, k = t ? Symbol.for("react.lazy") : 60116, P = t ? Symbol.for("react.block") : 60121, W = t ? Symbol.for("react.fundamental") : 60117, Y = t ? Symbol.for("react.responder") : 60118, H = t ? Symbol.for("react.scope") : 60119;
    function L(b) {
      return typeof b == "string" || typeof b == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      b === i || b === v || b === c || b === u || b === x || b === ee || typeof b == "object" && b !== null && (b.$$typeof === k || b.$$typeof === B || b.$$typeof === h || b.$$typeof === y || b.$$typeof === O || b.$$typeof === W || b.$$typeof === Y || b.$$typeof === H || b.$$typeof === P);
    }
    function z(b) {
      if (typeof b == "object" && b !== null) {
        var we = b.$$typeof;
        switch (we) {
          case r:
            var ve = b.type;
            switch (ve) {
              case S:
              case v:
              case i:
              case c:
              case u:
              case x:
                return ve;
              default:
                var xe = ve && ve.$$typeof;
                switch (xe) {
                  case y:
                  case O:
                  case k:
                  case B:
                  case h:
                    return xe;
                  default:
                    return we;
                }
            }
          case s:
            return we;
        }
      }
    }
    var l = S, U = v, I = y, Te = h, se = r, Me = O, Re = i, be = k, Ee = B, Oe = s, fe = c, ce = u, _e = x, Ye = !1;
    function q(b) {
      return Ye || (Ye = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), a(b) || z(b) === S;
    }
    function a(b) {
      return z(b) === v;
    }
    function d(b) {
      return z(b) === y;
    }
    function T(b) {
      return z(b) === h;
    }
    function C(b) {
      return typeof b == "object" && b !== null && b.$$typeof === r;
    }
    function $(b) {
      return z(b) === O;
    }
    function V(b) {
      return z(b) === i;
    }
    function A(b) {
      return z(b) === k;
    }
    function ie(b) {
      return z(b) === B;
    }
    function Z(b) {
      return z(b) === s;
    }
    function Ae(b) {
      return z(b) === c;
    }
    function We(b) {
      return z(b) === u;
    }
    function Le(b) {
      return z(b) === x;
    }
    X.AsyncMode = l, X.ConcurrentMode = U, X.ContextConsumer = I, X.ContextProvider = Te, X.Element = se, X.ForwardRef = Me, X.Fragment = Re, X.Lazy = be, X.Memo = Ee, X.Portal = Oe, X.Profiler = fe, X.StrictMode = ce, X.Suspense = _e, X.isAsyncMode = q, X.isConcurrentMode = a, X.isContextConsumer = d, X.isContextProvider = T, X.isElement = C, X.isForwardRef = $, X.isFragment = V, X.isLazy = A, X.isMemo = ie, X.isPortal = Z, X.isProfiler = Ae, X.isStrictMode = We, X.isSuspense = Le, X.isValidElementType = L, X.typeOf = z;
  }()), X;
}
var lr;
function wn() {
  return lr || (lr = 1, process.env.NODE_ENV === "production" ? vt.exports = bn() : vt.exports = _n()), vt.exports;
}
var Ot, dr;
function Sn() {
  if (dr) return Ot;
  dr = 1;
  var t = wn(), r = {
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
  }, s = {
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
  c[t.ForwardRef] = i, c[t.Memo] = u;
  function h(k) {
    return t.isMemo(k) ? u : c[k.$$typeof] || r;
  }
  var y = Object.defineProperty, S = Object.getOwnPropertyNames, v = Object.getOwnPropertySymbols, O = Object.getOwnPropertyDescriptor, x = Object.getPrototypeOf, ee = Object.prototype;
  function B(k, P, W) {
    if (typeof P != "string") {
      if (ee) {
        var Y = x(P);
        Y && Y !== ee && B(k, Y, W);
      }
      var H = S(P);
      v && (H = H.concat(v(P)));
      for (var L = h(k), z = h(P), l = 0; l < H.length; ++l) {
        var U = H[l];
        if (!s[U] && !(W && W[U]) && !(z && z[U]) && !(L && L[U])) {
          var I = O(P, U);
          try {
            y(k, U, I);
          } catch {
          }
        }
      }
    }
    return k;
  }
  return Ot = B, Ot;
}
Sn();
var Cn = !0;
function Tn(t, r, s) {
  var i = "";
  return s.split(" ").forEach(function(u) {
    t[u] !== void 0 ? r.push(t[u] + ";") : u && (i += u + " ");
  }), i;
}
var Rr = function(r, s, i) {
  var u = r.key + "-" + s.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (i === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  Cn === !1) && r.registered[u] === void 0 && (r.registered[u] = s.styles);
}, Rn = function(r, s, i) {
  Rr(r, s, i);
  var u = r.key + "-" + s.name;
  if (r.inserted[s.name] === void 0) {
    var c = s;
    do
      r.insert(s === c ? "." + u : "", c, r.sheet, !0), c = c.next;
    while (c !== void 0);
  }
};
function On(t) {
  for (var r = 0, s, i = 0, u = t.length; u >= 4; ++i, u -= 4)
    s = t.charCodeAt(i) & 255 | (t.charCodeAt(++i) & 255) << 8 | (t.charCodeAt(++i) & 255) << 16 | (t.charCodeAt(++i) & 255) << 24, s = /* Math.imul(k, m): */
    (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16), s ^= /* k >>> r: */
    s >>> 24, r = /* Math.imul(k, m): */
    (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  switch (u) {
    case 3:
      r ^= (t.charCodeAt(i + 2) & 255) << 16;
    case 2:
      r ^= (t.charCodeAt(i + 1) & 255) << 8;
    case 1:
      r ^= t.charCodeAt(i) & 255, r = /* Math.imul(h, m): */
      (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  }
  return r ^= r >>> 13, r = /* Math.imul(h, m): */
  (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), ((r ^ r >>> 15) >>> 0).toString(36);
}
var An = {
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
}, xn = !1, Pn = /[A-Z]|^ms/g, $n = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Or = function(r) {
  return r.charCodeAt(1) === 45;
}, pr = function(r) {
  return r != null && typeof r != "boolean";
}, At = /* @__PURE__ */ ln(function(t) {
  return Or(t) ? t : t.replace(Pn, "-$&").toLowerCase();
}), vr = function(r, s) {
  switch (r) {
    case "animation":
    case "animationName":
      if (typeof s == "string")
        return s.replace($n, function(i, u, c) {
          return Ne = {
            name: u,
            styles: c,
            next: Ne
          }, u;
        });
  }
  return An[r] !== 1 && !Or(r) && typeof s == "number" && s !== 0 ? s + "px" : s;
}, Nn = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function ot(t, r, s) {
  if (s == null)
    return "";
  var i = s;
  if (i.__emotion_styles !== void 0)
    return i;
  switch (typeof s) {
    case "boolean":
      return "";
    case "object": {
      var u = s;
      if (u.anim === 1)
        return Ne = {
          name: u.name,
          styles: u.styles,
          next: Ne
        }, u.name;
      var c = s;
      if (c.styles !== void 0) {
        var h = c.next;
        if (h !== void 0)
          for (; h !== void 0; )
            Ne = {
              name: h.name,
              styles: h.styles,
              next: Ne
            }, h = h.next;
        var y = c.styles + ";";
        return y;
      }
      return jn(t, r, s);
    }
    case "function": {
      if (t !== void 0) {
        var S = Ne, v = s(t);
        return Ne = S, ot(t, r, v);
      }
      break;
    }
  }
  var O = s;
  return O;
}
function jn(t, r, s) {
  var i = "";
  if (Array.isArray(s))
    for (var u = 0; u < s.length; u++)
      i += ot(t, r, s[u]) + ";";
  else
    for (var c in s) {
      var h = s[c];
      if (typeof h != "object") {
        var y = h;
        pr(y) && (i += At(c) + ":" + vr(c, y) + ";");
      } else {
        if (c === "NO_COMPONENT_SELECTOR" && xn)
          throw new Error(Nn);
        if (Array.isArray(h) && typeof h[0] == "string" && r == null)
          for (var S = 0; S < h.length; S++)
            pr(h[S]) && (i += At(c) + ":" + vr(c, h[S]) + ";");
        else {
          var v = ot(t, r, h);
          switch (c) {
            case "animation":
            case "animationName": {
              i += At(c) + ":" + v + ";";
              break;
            }
            default:
              i += c + "{" + v + "}";
          }
        }
      }
    }
  return i;
}
var hr = /label:\s*([^\s;{]+)\s*(;|$)/g, Ne;
function Ar(t, r, s) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var i = !0, u = "";
  Ne = void 0;
  var c = t[0];
  if (c == null || c.raw === void 0)
    i = !1, u += ot(s, r, c);
  else {
    var h = c;
    u += h[0];
  }
  for (var y = 1; y < t.length; y++)
    if (u += ot(s, r, t[y]), i) {
      var S = c;
      u += S[y];
    }
  hr.lastIndex = 0;
  for (var v = "", O; (O = hr.exec(u)) !== null; )
    v += "-" + O[1];
  var x = On(u) + v;
  return {
    name: x,
    styles: u,
    next: Ne
  };
}
var kn = function(r) {
  return r();
}, Mn = ar.useInsertionEffect ? ar.useInsertionEffect : !1, Yn = Mn || kn, Ln = !1, xr = /* @__PURE__ */ de.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ gn({
    key: "css"
  }) : null
);
xr.Provider;
var In = function(r) {
  return /* @__PURE__ */ de.forwardRef(function(s, i) {
    var u = de.useContext(xr);
    return r(s, u, i);
  });
}, Wn = /* @__PURE__ */ de.createContext({}), wt = {}.hasOwnProperty, kt = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Pr = function(r, s) {
  var i = {};
  for (var u in s)
    wt.call(s, u) && (i[u] = s[u]);
  return i[kt] = r, i;
}, Hn = function(r) {
  var s = r.cache, i = r.serialized, u = r.isStringTag;
  return Rr(s, i, u), Yn(function() {
    return Rn(s, i, u);
  }), null;
}, Un = /* @__PURE__ */ In(
  /* <any, any> */
  function(t, r, s) {
    var i = t.css;
    typeof i == "string" && r.registered[i] !== void 0 && (i = r.registered[i]);
    var u = t[kt], c = [i], h = "";
    typeof t.className == "string" ? h = Tn(r.registered, c, t.className) : t.className != null && (h = t.className + " ");
    var y = Ar(c, void 0, de.useContext(Wn));
    h += r.key + "-" + y.name;
    var S = {};
    for (var v in t)
      wt.call(t, v) && v !== "css" && v !== kt && !Ln && (S[v] = t[v]);
    return S.className = h, s && (S.ref = s), /* @__PURE__ */ de.createElement(de.Fragment, null, /* @__PURE__ */ de.createElement(Hn, {
      cache: r,
      serialized: y,
      isStringTag: typeof u == "string"
    }), /* @__PURE__ */ de.createElement(u, S));
  }
), $r = Un, zn = tt.Fragment;
function je(t, r, s) {
  return wt.call(r, "css") ? tt.jsx($r, Pr(t, r), s) : tt.jsx(t, r, s);
}
function qn(t, r, s) {
  return wt.call(r, "css") ? tt.jsxs($r, Pr(t, r), s) : tt.jsxs(t, r, s);
}
function Dn({ styChild: t, sys: r, fn: s }) {
  return /* @__PURE__ */ je(zn, { children: /* @__PURE__ */ je("img", { css: t, src: ((u) => r.cfg.searchPath(u, Mr.SP_GSM))(s) }) });
}
function Gn({ styChild: t }) {
  return /* @__PURE__ */ je("div", { css: t, children: /* @__PURE__ */ je("span", {}) });
}
const mr = (t) => {
  let r;
  const s = /* @__PURE__ */ new Set(), i = (v, O) => {
    const x = typeof v == "function" ? v(r) : v;
    if (!Object.is(x, r)) {
      const ee = r;
      r = O ?? (typeof x != "object" || x === null) ? x : Object.assign({}, r, x), s.forEach((B) => B(r, ee));
    }
  }, u = () => r, y = { setState: i, getState: u, getInitialState: () => S, subscribe: (v) => (s.add(v), () => s.delete(v)) }, S = r = t(i, u, y);
  return y;
}, Fn = (t) => t ? mr(t) : mr, Bn = (t) => t;
function Vn(t, r = Bn) {
  const s = $t.useSyncExternalStore(
    t.subscribe,
    () => r(t.getState()),
    () => r(t.getInitialState())
  );
  return $t.useDebugValue(s), s;
}
const Kn = (t) => {
  const r = Fn(t), s = (i) => Vn(r, i);
  return Object.assign(s, r), s;
}, Xn = (t) => Kn, xt = Xn()((t) => ({
  txt: "",
  addTxt: (r) => t((s) => ({ txt: s.txt + r })),
  clearTxt: () => t(() => ({ txt: "" })),
  aLay: [],
  addLayer: (r) => t((s) => ({ aLay: [...s.aLay, r] })),
  chgPic: ({ nm: r, fn: s }) => t((i) => {
    const u = [...i.aLay], c = u.find((h) => h.nm === r);
    if (!c) throw `存在しないレイヤ ${r} です`;
    if (c.cls !== "GRP") throw `${r} は画像レイヤではありません`;
    return c.fn = s, { aLay: u };
  })
}));
function Pt() {
  for (var t = arguments.length, r = new Array(t), s = 0; s < t; s++)
    r[s] = arguments[s];
  return Ar(r);
}
const Nr = () => {
  console.log("fn:Stage.tsx line:60 Stage 0");
  const t = xt((v) => v.aLay), r = xt((v) => v.addLayer), s = xt((v) => v.chgPic);
  de.useEffect(() => {
    Be.addEventListener("ev_addLayer", (v) => r(v.detail)), Be.addEventListener("ev_chgPic", (v) => s(v.detail));
  }, []);
  const [i, u] = de.useState(yr());
  de.useEffect(() => {
    function v() {
      u(yr());
    }
    return globalThis.addEventListener("resize", v), () => globalThis.removeEventListener("resize", v);
  }, []);
  const { cvsScale: c } = Qn(i), h = Pt`
		position: relative;

		transform-origin: left top;
		transform: scale(${c});
		width	: calc(${me.stageW}px / ${c});
		height	: calc(${me.stageH}px / ${c});
	`, y = Pt`position: absolute; top: 0; left: 0;`, S = Pt`position: relative; z-index: 1;`;
  return /* @__PURE__ */ qn("div", { css: h, children: [
    /* @__PURE__ */ je("button", { onClick: () => {
    }, css: S, children: "Click" }),
    /* @__PURE__ */ je("button", { onClick: () => {
    }, css: S, children: "Back" }),
    /* @__PURE__ */ je("button", { onClick: () => {
    }, css: S, children: "Prev" }),
    t.map((v) => v.cls === "GRP" ? /* @__PURE__ */ je(Dn, { sys: Mt, styChild: y, fn: v.fn }, v.nm) : /* @__PURE__ */ je(Gn, { sys: Mt, styChild: y, str: "てすと" }, v.nm))
  ] });
};
function Qn({ width: t, height: r }) {
  let s = 0, i = 0, u = 1;
  return me.stageW > t || me.stageH > r ? (me.stageW / me.stageH <= t / r ? (i = r, s = Zt(me.stageW / me.stageH * r)) : (s = t, i = Zt(me.stageH / me.stageW * t)), u = s / me.stageW) : (s = me.stageW, i = me.stageH, u = 1), { cvsScale: u, cvsWidth: s, cvsHeight: i };
}
function yr() {
  const { innerWidth: t, innerHeight: r } = globalThis;
  return { width: t, height: r };
}
async function Zn(t, r) {
  Be = t, Mt = r;
  const { createRoot: s } = await import("./client.js").then((i) => i.c);
  s(Be).render(/* @__PURE__ */ je(Nr, {}));
}
let Be, Mt;
function Jn(t) {
  Be.dispatchEvent(new CustomEvent("ev_addLayer", { detail: t }));
}
function eo(t) {
  Be.dispatchEvent(new CustomEvent("ev_chgPic", { detail: t }));
}
const ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Stage: Nr,
  addLayer: Jn,
  chgPic: eo,
  opening: Zn
}, Symbol.toStringTag, { value: "Module" }));
export {
  ro as S,
  Jn as a,
  eo as c,
  Er as r
};
//# sourceMappingURL=Stage.js.map
