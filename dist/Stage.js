import { g as Lr, S as Ir, B as Wr, C as me, u as er } from "./web2.js";
function Hr(t, r) {
  for (var o = 0; o < r.length; o++) {
    const i = r[o];
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
var dt = { exports: {} }, Qe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tr;
function Ur() {
  if (tr) return Qe;
  tr = 1;
  var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function o(i, u, c) {
    var v = null;
    if (c !== void 0 && (v = "" + c), u.key !== void 0 && (v = "" + u.key), "key" in u) {
      c = {};
      for (var y in u)
        y !== "key" && (c[y] = u[y]);
    } else c = u;
    return u = c.ref, {
      $$typeof: t,
      type: i,
      key: v,
      ref: u !== void 0 ? u : null,
      props: c
    };
  }
  return Qe.Fragment = r, Qe.jsx = o, Qe.jsxs = o, Qe;
}
var Je = {}, pt = { exports: {} }, j = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rr;
function zr() {
  if (rr) return j;
  rr = 1;
  var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), v = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), w = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), x = Symbol.iterator;
  function ee(s) {
    return s === null || typeof s != "object" ? null : (s = x && s[x] || s["@@iterator"], typeof s == "function" ? s : null);
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
  }, k = Object.assign, P = {};
  function W(s, d, R) {
    this.props = s, this.context = d, this.refs = P, this.updater = R || F;
  }
  W.prototype.isReactComponent = {}, W.prototype.setState = function(s, d) {
    if (typeof s != "object" && typeof s != "function" && s != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, s, d, "setState");
  }, W.prototype.forceUpdate = function(s) {
    this.updater.enqueueForceUpdate(this, s, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = W.prototype;
  function H(s, d, R) {
    this.props = s, this.context = d, this.refs = P, this.updater = R || F;
  }
  var L = H.prototype = new Y();
  L.constructor = H, k(L, W.prototype), L.isPureReactComponent = !0;
  var z = Array.isArray, l = { H: null, A: null, T: null, S: null }, U = Object.prototype.hasOwnProperty;
  function I(s, d, R, T, $, V) {
    return R = V.ref, {
      $$typeof: t,
      type: s,
      key: d,
      ref: R !== void 0 ? R : null,
      props: V
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
    return typeof s == "object" && s !== null && s.$$typeof === t;
  }
  function Me(s) {
    var d = { "=": "=0", ":": "=2" };
    return "$" + s.replace(/[=:]/g, function(R) {
      return d[R];
    });
  }
  var Re = /\/+/g;
  function be(s, d) {
    return typeof s == "object" && s !== null && s.key != null ? Me("" + s.key) : d.toString(36);
  }
  function Ee() {
  }
  function Oe(s) {
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        throw s.reason;
      default:
        switch (typeof s.status == "string" ? s.then(Ee, Ee) : (s.status = "pending", s.then(
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
  function le(s, d, R, T, $) {
    var V = typeof s;
    (V === "undefined" || V === "boolean") && (s = null);
    var A = !1;
    if (s === null) A = !0;
    else
      switch (V) {
        case "bigint":
        case "string":
        case "number":
          A = !0;
          break;
        case "object":
          switch (s.$$typeof) {
            case t:
            case r:
              A = !0;
              break;
            case h:
              return A = s._init, le(
                A(s._payload),
                d,
                R,
                T,
                $
              );
          }
      }
    if (A)
      return $ = $(s), A = T === "" ? "." + be(s, 0) : T, z($) ? (R = "", A != null && (R = A.replace(Re, "$&/") + "/"), le($, d, R, "", function(Ae) {
        return Ae;
      })) : $ != null && (ie($) && ($ = Te(
        $,
        R + ($.key == null || s && s.key === $.key ? "" : ("" + $.key).replace(
          Re,
          "$&/"
        ) + "/") + A
      )), d.push($)), 1;
    A = 0;
    var ue = T === "" ? "." : T + ":";
    if (z(s))
      for (var J = 0; J < s.length; J++)
        T = s[J], V = ue + be(T, J), A += le(
          T,
          d,
          R,
          V,
          $
        );
    else if (J = ee(s), typeof J == "function")
      for (s = J.call(s), J = 0; !(T = s.next()).done; )
        T = T.value, V = ue + be(T, J++), A += le(
          T,
          d,
          R,
          V,
          $
        );
    else if (V === "object") {
      if (typeof s.then == "function")
        return le(
          Oe(s),
          d,
          R,
          T,
          $
        );
      throw d = String(s), Error(
        "Objects are not valid as a React child (found: " + (d === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : d) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return A;
  }
  function fe(s, d, R) {
    if (s == null) return s;
    var T = [], $ = 0;
    return le(s, T, "", "", function(V) {
      return d.call(R, V, $++);
    }), T;
  }
  function _e(s) {
    if (s._status === -1) {
      var d = s._result;
      d = d(), d.then(
        function(R) {
          (s._status === 0 || s._status === -1) && (s._status = 1, s._result = R);
        },
        function(R) {
          (s._status === 0 || s._status === -1) && (s._status = 2, s._result = R);
        }
      ), s._status === -1 && (s._status = 0, s._result = d);
    }
    if (s._status === 1) return s._result.default;
    throw s._result;
  }
  var Ye = typeof reportError == "function" ? reportError : function(s) {
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
  function q() {
  }
  return j.Children = {
    map: fe,
    forEach: function(s, d, R) {
      fe(
        s,
        function() {
          d.apply(this, arguments);
        },
        R
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
  }, j.Component = W, j.Fragment = o, j.Profiler = u, j.PureComponent = H, j.StrictMode = i, j.Suspense = C, j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, j.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, j.cache = function(s) {
    return function() {
      return s.apply(null, arguments);
    };
  }, j.cloneElement = function(s, d, R) {
    if (s == null)
      throw Error(
        "The argument must be a React element, but you passed " + s + "."
      );
    var T = k({}, s.props), $ = s.key, V = void 0;
    if (d != null)
      for (A in d.ref !== void 0 && (V = void 0), d.key !== void 0 && ($ = "" + d.key), d)
        !U.call(d, A) || A === "key" || A === "__self" || A === "__source" || A === "ref" && d.ref === void 0 || (T[A] = d[A]);
    var A = arguments.length - 2;
    if (A === 1) T.children = R;
    else if (1 < A) {
      for (var ue = Array(A), J = 0; J < A; J++)
        ue[J] = arguments[J + 2];
      T.children = ue;
    }
    return I(s.type, $, void 0, void 0, V, T);
  }, j.createContext = function(s) {
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
  }, j.createElement = function(s, d, R) {
    var T, $ = {}, V = null;
    if (d != null)
      for (T in d.key !== void 0 && (V = "" + d.key), d)
        U.call(d, T) && T !== "key" && T !== "__self" && T !== "__source" && ($[T] = d[T]);
    var A = arguments.length - 2;
    if (A === 1) $.children = R;
    else if (1 < A) {
      for (var ue = Array(A), J = 0; J < A; J++)
        ue[J] = arguments[J + 2];
      $.children = ue;
    }
    if (s && s.defaultProps)
      for (T in A = s.defaultProps, A)
        $[T] === void 0 && ($[T] = A[T]);
    return I(s, V, void 0, void 0, null, $);
  }, j.createRef = function() {
    return { current: null };
  }, j.forwardRef = function(s) {
    return { $$typeof: y, render: s };
  }, j.isValidElement = ie, j.lazy = function(s) {
    return {
      $$typeof: h,
      _payload: { _status: -1, _result: s },
      _init: _e
    };
  }, j.memo = function(s, d) {
    return {
      $$typeof: w,
      type: s,
      compare: d === void 0 ? null : d
    };
  }, j.startTransition = function(s) {
    var d = l.T, R = {};
    l.T = R;
    try {
      var T = s(), $ = l.S;
      $ !== null && $(R, T), typeof T == "object" && T !== null && typeof T.then == "function" && T.then(q, Ye);
    } catch (V) {
      Ye(V);
    } finally {
      l.T = d;
    }
  }, j.unstable_useCacheRefresh = function() {
    return l.H.useCacheRefresh();
  }, j.use = function(s) {
    return l.H.use(s);
  }, j.useActionState = function(s, d, R) {
    return l.H.useActionState(s, d, R);
  }, j.useCallback = function(s, d) {
    return l.H.useCallback(s, d);
  }, j.useContext = function(s) {
    return l.H.useContext(s);
  }, j.useDebugValue = function() {
  }, j.useDeferredValue = function(s, d) {
    return l.H.useDeferredValue(s, d);
  }, j.useEffect = function(s, d) {
    return l.H.useEffect(s, d);
  }, j.useId = function() {
    return l.H.useId();
  }, j.useImperativeHandle = function(s, d, R) {
    return l.H.useImperativeHandle(s, d, R);
  }, j.useInsertionEffect = function(s, d) {
    return l.H.useInsertionEffect(s, d);
  }, j.useLayoutEffect = function(s, d) {
    return l.H.useLayoutEffect(s, d);
  }, j.useMemo = function(s, d) {
    return l.H.useMemo(s, d);
  }, j.useOptimistic = function(s, d) {
    return l.H.useOptimistic(s, d);
  }, j.useReducer = function(s, d, R) {
    return l.H.useReducer(s, d, R);
  }, j.useRef = function(s) {
    return l.H.useRef(s);
  }, j.useState = function(s) {
    return l.H.useState(s);
  }, j.useSyncExternalStore = function(s, d, R) {
    return l.H.useSyncExternalStore(
      s,
      d,
      R
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
var nr;
function qr() {
  return nr || (nr = 1, function(t, r) {
    process.env.NODE_ENV !== "production" && function() {
      function o(e, a) {
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
        return e === null || typeof e != "object" ? null : (e = Xe && e[Xe] || e["@@iterator"], typeof e == "function" ? e : null);
      }
      function u(e, a) {
        e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
        var f = e + "." + a;
        Ke[f] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          a,
          e
        ), Ke[f] = !0);
      }
      function c(e, a, f) {
        this.props = e, this.context = a, this.refs = E, this.updater = f || n;
      }
      function v() {
      }
      function y(e, a, f) {
        this.props = e, this.context = a, this.refs = E, this.updater = f || n;
      }
      function C(e) {
        return "" + e;
      }
      function w(e) {
        try {
          C(e);
          var a = !1;
        } catch {
          a = !0;
        }
        if (a) {
          a = console;
          var f = a.error, p = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return f.call(
            a,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            p
          ), C(e);
        }
      }
      function h(e) {
        if (e == null) return null;
        if (typeof e == "function")
          return e.$$typeof === N ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
          case J:
            return "Fragment";
          case ue:
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
              var a = e.render;
              return e = e.displayName, e || (e = a.displayName || a.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case qe:
              return a = e.displayName || null, a !== null ? a : h(e.type) || "Memo";
            case He:
              a = e._payload, e = e._init;
              try {
                return h(e(a));
              } catch {
              }
          }
        return null;
      }
      function x(e) {
        return typeof e == "string" || typeof e == "function" || e === J || e === We || e === Ae || e === ve || e === xe || e === it || typeof e == "object" && e !== null && (e.$$typeof === He || e.$$typeof === qe || e.$$typeof === b || e.$$typeof === Le || e.$$typeof === we || e.$$typeof === oe || e.getModuleId !== void 0);
      }
      function ee() {
      }
      function F() {
        if (he === 0) {
          Ue = console.log, Ce = console.info, De = console.warn, ge = console.error, Ut = console.group, zt = console.groupCollapsed, qt = console.groupEnd;
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
            warn: m({}, e, { value: De }),
            error: m({}, e, { value: ge }),
            group: m({}, e, { value: Ut }),
            groupCollapsed: m({}, e, { value: zt }),
            groupEnd: m({}, e, { value: qt })
          });
        }
        0 > he && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function P(e) {
        if (Tt === void 0)
          try {
            throw Error();
          } catch (f) {
            var a = f.stack.trim().match(/\n( *(at )?)/);
            Tt = a && a[1] || "", Dt = -1 < f.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < f.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + Tt + e + Dt;
      }
      function W(e, a) {
        if (!e || Rt) return "";
        var f = Ot.get(e);
        if (f !== void 0) return f;
        Rt = !0, f = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var p = null;
        p = O.H, O.H = null, F();
        try {
          var g = {
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
                    } catch (Ie) {
                      var lt = Ie;
                    }
                    Reflect.construct(e, [], Pe);
                  } else {
                    try {
                      Pe.call();
                    } catch (Ie) {
                      lt = Ie;
                    }
                    e.call(Pe.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (Ie) {
                    lt = Ie;
                  }
                  (Pe = e()) && typeof Pe.catch == "function" && Pe.catch(function() {
                  });
                }
              } catch (Ie) {
                if (Ie && lt && typeof Ie.stack == "string")
                  return [Ie.stack, lt.stack];
              }
              return [null, null];
            }
          };
          g.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var S = Object.getOwnPropertyDescriptor(
            g.DetermineComponentFrameRoot,
            "name"
          );
          S && S.configurable && Object.defineProperty(
            g.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var _ = g.DetermineComponentFrameRoot(), Q = _[0], D = _[1];
          if (Q && D) {
            var te = Q.split(`
`), de = D.split(`
`);
            for (_ = S = 0; S < te.length && !te[S].includes(
              "DetermineComponentFrameRoot"
            ); )
              S++;
            for (; _ < de.length && !de[_].includes(
              "DetermineComponentFrameRoot"
            ); )
              _++;
            if (S === te.length || _ === de.length)
              for (S = te.length - 1, _ = de.length - 1; 1 <= S && 0 <= _ && te[S] !== de[_]; )
                _--;
            for (; 1 <= S && 0 <= _; S--, _--)
              if (te[S] !== de[_]) {
                if (S !== 1 || _ !== 1)
                  do
                    if (S--, _--, 0 > _ || te[S] !== de[_]) {
                      var Ge = `
` + te[S].replace(
                        " at new ",
                        " at "
                      );
                      return e.displayName && Ge.includes("<anonymous>") && (Ge = Ge.replace("<anonymous>", e.displayName)), typeof e == "function" && Ot.set(e, Ge), Ge;
                    }
                  while (1 <= S && 0 <= _);
                break;
              }
          }
        } finally {
          Rt = !1, O.H = p, k(), Error.prepareStackTrace = f;
        }
        return te = (te = e ? e.displayName || e.name : "") ? P(te) : "", typeof e == "function" && Ot.set(e, te), te;
      }
      function Y(e) {
        if (e == null) return "";
        if (typeof e == "function") {
          var a = e.prototype;
          return W(
            e,
            !(!a || !a.isReactComponent)
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
            case qe:
              return Y(e.type);
            case He:
              a = e._payload, e = e._init;
              try {
                return Y(e(a));
              } catch {
              }
          }
        return "";
      }
      function H() {
        var e = O.A;
        return e === null ? null : e.getOwner();
      }
      function L(e) {
        if (Se.call(e, "key")) {
          var a = Object.getOwnPropertyDescriptor(e, "key").get;
          if (a && a.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function z(e, a) {
        function f() {
          Gt || (Gt = !0, console.error(
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
        var e = h(this.type);
        return Ft[e] || (Ft[e] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), e = this.props.ref, e !== void 0 ? e : null;
      }
      function U(e, a, f, p, g, S) {
        return f = S.ref, e = {
          $$typeof: A,
          type: e,
          key: a,
          props: S,
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
      function I(e, a) {
        return a = U(
          e.type,
          a,
          void 0,
          void 0,
          e._owner,
          e.props
        ), a._store.validated = e._store.validated, a;
      }
      function Te(e, a) {
        if (typeof e == "object" && e && e.$$typeof !== Yr) {
          if (Z(e))
            for (var f = 0; f < e.length; f++) {
              var p = e[f];
              ie(p) && Me(p, a);
            }
          else if (ie(e))
            e._store && (e._store.validated = 1);
          else if (f = i(e), typeof f == "function" && f !== e.entries && (f = f.call(e), f !== e))
            for (; !(e = f.next()).done; )
              ie(e.value) && Me(e.value, a);
        }
      }
      function ie(e) {
        return typeof e == "object" && e !== null && e.$$typeof === A;
      }
      function Me(e, a) {
        if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, a = Re(a), !Vt[a])) {
          Vt[a] = !0;
          var f = "";
          e && e._owner != null && e._owner !== H() && (f = null, typeof e._owner.tag == "number" ? f = h(e._owner.type) : typeof e._owner.name == "string" && (f = e._owner.name), f = " It was passed a child from " + f + ".");
          var p = O.getCurrentStack;
          O.getCurrentStack = function() {
            var g = Y(e.type);
            return p && (g += p() || ""), g;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            a,
            f
          ), O.getCurrentStack = p;
        }
      }
      function Re(e) {
        var a = "", f = H();
        return f && (f = h(f.type)) && (a = `

Check the render method of \`` + f + "`."), a || (e = h(e)) && (a = `

Check the top-level render call using <` + e + ">."), a;
      }
      function be(e) {
        var a = { "=": "=0", ":": "=2" };
        return "$" + e.replace(/[=:]/g, function(f) {
          return a[f];
        });
      }
      function Ee(e, a) {
        return typeof e == "object" && e !== null && e.key != null ? (w(e.key), be("" + e.key)) : a.toString(36);
      }
      function Oe() {
      }
      function le(e) {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            switch (typeof e.status == "string" ? e.then(Oe, Oe) : (e.status = "pending", e.then(
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
      function fe(e, a, f, p, g) {
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
                case A:
                case ue:
                  _ = !0;
                  break;
                case He:
                  return _ = e._init, fe(
                    _(e._payload),
                    a,
                    f,
                    p,
                    g
                  );
              }
          }
        if (_) {
          _ = e, g = g(_);
          var Q = p === "" ? "." + Ee(_, 0) : p;
          return Z(g) ? (f = "", Q != null && (f = Q.replace(Kt, "$&/") + "/"), fe(g, a, f, "", function(te) {
            return te;
          })) : g != null && (ie(g) && (g.key != null && (_ && _.key === g.key || w(g.key)), f = I(
            g,
            f + (g.key == null || _ && _.key === g.key ? "" : ("" + g.key).replace(
              Kt,
              "$&/"
            ) + "/") + Q
          ), p !== "" && _ != null && ie(_) && _.key == null && _._store && !_._store.validated && (f._store.validated = 2), g = f), a.push(g)), 1;
        }
        if (_ = 0, Q = p === "" ? "." : p + ":", Z(e))
          for (var D = 0; D < e.length; D++)
            p = e[D], S = Q + Ee(p, D), _ += fe(
              p,
              a,
              f,
              S,
              g
            );
        else if (D = i(e), typeof D == "function")
          for (D === e.entries && (Xt || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Xt = !0), e = D.call(e), D = 0; !(p = e.next()).done; )
            p = p.value, S = Q + Ee(p, D++), _ += fe(
              p,
              a,
              f,
              S,
              g
            );
        else if (S === "object") {
          if (typeof e.then == "function")
            return fe(
              le(e),
              a,
              f,
              p,
              g
            );
          throw a = String(e), Error(
            "Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return _;
      }
      function _e(e, a, f) {
        if (e == null) return e;
        var p = [], g = 0;
        return fe(e, p, "", "", function(S) {
          return a.call(f, S, g++);
        }), p;
      }
      function Ye(e) {
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
      function q() {
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
        if (ut === null)
          try {
            var a = ("require" + Math.random()).slice(0, 7);
            ut = (t && t[a]).call(
              t,
              "timers"
            ).setImmediate;
          } catch {
            ut = function(p) {
              Jt === !1 && (Jt = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var g = new MessageChannel();
              g.port1.onmessage = p, g.port2.postMessage(void 0);
            };
          }
        return ut(e);
      }
      function R(e) {
        return 1 < e.length && typeof AggregateError == "function" ? new AggregateError(e) : e[0];
      }
      function T(e, a) {
        a !== ct - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), ct = a;
      }
      function $(e, a, f) {
        var p = O.actQueue;
        if (p !== null)
          if (p.length !== 0)
            try {
              V(p), d(function() {
                return $(e, a, f);
              });
              return;
            } catch (g) {
              O.thrownErrors.push(g);
            }
          else O.actQueue = null;
        0 < O.thrownErrors.length ? (p = R(O.thrownErrors), O.thrownErrors.length = 0, f(p)) : a(e);
      }
      function V(e) {
        if (!At) {
          At = !0;
          var a = 0;
          try {
            for (; a < e.length; a++) {
              var f = e[a];
              do {
                O.didUsePromise = !1;
                var p = f(!1);
                if (p !== null) {
                  if (O.didUsePromise) {
                    e[a] = f, e.splice(0, a);
                    return;
                  }
                  f = p;
                } else break;
              } while (!0);
            }
            e.length = 0;
          } catch (g) {
            e.splice(0, a + 1), O.thrownErrors.push(g);
          } finally {
            At = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var A = Symbol.for("react.transitional.element"), ue = Symbol.for("react.portal"), J = Symbol.for("react.fragment"), Ae = Symbol.for("react.strict_mode"), We = Symbol.for("react.profiler"), Le = Symbol.for("react.consumer"), b = Symbol.for("react.context"), we = Symbol.for("react.forward_ref"), ve = Symbol.for("react.suspense"), xe = Symbol.for("react.suspense_list"), qe = Symbol.for("react.memo"), He = Symbol.for("react.lazy"), it = Symbol.for("react.offscreen"), Xe = Symbol.iterator, Ke = {}, n = {
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
      Object.freeze(E), c.prototype.isReactComponent = {}, c.prototype.setState = function(e, a) {
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
      }, re;
      for (re in M)
        M.hasOwnProperty(re) && o(re, M[re]);
      v.prototype = c.prototype, M = y.prototype = new v(), M.constructor = y, m(M, c.prototype), M.isPureReactComponent = !0;
      var Z = Array.isArray, N = Symbol.for("react.client.reference"), O = {
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
      }, Se = Object.prototype.hasOwnProperty, oe = Symbol.for("react.client.reference"), he = 0, Ue, Ce, De, ge, Ut, zt, qt;
      ee.__reactDisabledLog = !0;
      var Tt, Dt, Rt = !1, Ot = new (typeof WeakMap == "function" ? WeakMap : Map)(), Yr = Symbol.for("react.client.reference"), Gt, Bt, Ft = {}, Vt = {}, Xt = !1, Kt = /\/+/g, Qt = typeof reportError == "function" ? reportError : function(e) {
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
      }, Jt = !1, ut = null, ct = 0, ft = !1, At = !1, Zt = typeof queueMicrotask == "function" ? function(e) {
        queueMicrotask(function() {
          return queueMicrotask(e);
        });
      } : d;
      r.Children = {
        map: _e,
        forEach: function(e, a, f) {
          _e(
            e,
            function() {
              a.apply(this, arguments);
            },
            f
          );
        },
        count: function(e) {
          var a = 0;
          return _e(e, function() {
            a++;
          }), a;
        },
        toArray: function(e) {
          return _e(e, function(a) {
            return a;
          }) || [];
        },
        only: function(e) {
          if (!ie(e))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return e;
        }
      }, r.Component = c, r.Fragment = J, r.Profiler = We, r.PureComponent = y, r.StrictMode = Ae, r.Suspense = ve, r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O, r.act = function(e) {
        var a = O.actQueue, f = ct;
        ct++;
        var p = O.actQueue = a !== null ? a : [], g = !1;
        try {
          var S = e();
        } catch (D) {
          O.thrownErrors.push(D);
        }
        if (0 < O.thrownErrors.length)
          throw T(a, f), e = R(O.thrownErrors), O.thrownErrors.length = 0, e;
        if (S !== null && typeof S == "object" && typeof S.then == "function") {
          var _ = S;
          return Zt(function() {
            g || ft || (ft = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(D, te) {
              g = !0, _.then(
                function(de) {
                  if (T(a, f), f === 0) {
                    try {
                      V(p), d(function() {
                        return $(
                          de,
                          D,
                          te
                        );
                      });
                    } catch (Pe) {
                      O.thrownErrors.push(Pe);
                    }
                    if (0 < O.thrownErrors.length) {
                      var Ge = R(
                        O.thrownErrors
                      );
                      O.thrownErrors.length = 0, te(Ge);
                    }
                  } else D(de);
                },
                function(de) {
                  T(a, f), 0 < O.thrownErrors.length && (de = R(
                    O.thrownErrors
                  ), O.thrownErrors.length = 0), te(de);
                }
              );
            }
          };
        }
        var Q = S;
        if (T(a, f), f === 0 && (V(p), p.length !== 0 && Zt(function() {
          g || ft || (ft = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), O.actQueue = null), 0 < O.thrownErrors.length)
          throw e = R(O.thrownErrors), O.thrownErrors.length = 0, e;
        return {
          then: function(D, te) {
            g = !0, f === 0 ? (O.actQueue = p, d(function() {
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
      }, r.cloneElement = function(e, a, f) {
        if (e == null)
          throw Error(
            "The argument must be a React element, but you passed " + e + "."
          );
        var p = m({}, e.props), g = e.key, S = e._owner;
        if (a != null) {
          var _;
          e: {
            if (Se.call(a, "ref") && (_ = Object.getOwnPropertyDescriptor(
              a,
              "ref"
            ).get) && _.isReactWarning) {
              _ = !1;
              break e;
            }
            _ = a.ref !== void 0;
          }
          _ && (S = H()), L(a) && (w(a.key), g = "" + a.key);
          for (Q in a)
            !Se.call(a, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && a.ref === void 0 || (p[Q] = a[Q]);
        }
        var Q = arguments.length - 2;
        if (Q === 1) p.children = f;
        else if (1 < Q) {
          _ = Array(Q);
          for (var D = 0; D < Q; D++)
            _[D] = arguments[D + 2];
          p.children = _;
        }
        for (p = U(e.type, g, void 0, void 0, S, p), g = 2; g < arguments.length; g++)
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
      }, r.createElement = function(e, a, f) {
        if (x(e))
          for (var p = 2; p < arguments.length; p++)
            Te(arguments[p], e);
        else {
          if (p = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null) var g = "null";
          else
            Z(e) ? g = "array" : e !== void 0 && e.$$typeof === A ? (g = "<" + (h(e.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : g = typeof e;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            g,
            p
          );
        }
        var S;
        if (p = {}, g = null, a != null)
          for (S in Bt || !("__self" in a) || "key" in a || (Bt = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), L(a) && (w(a.key), g = "" + a.key), a)
            Se.call(a, S) && S !== "key" && S !== "__self" && S !== "__source" && (p[S] = a[S]);
        var _ = arguments.length - 2;
        if (_ === 1) p.children = f;
        else if (1 < _) {
          for (var Q = Array(_), D = 0; D < _; D++)
            Q[D] = arguments[D + 2];
          Object.freeze && Object.freeze(Q), p.children = Q;
        }
        if (e && e.defaultProps)
          for (S in _ = e.defaultProps, _)
            p[S] === void 0 && (p[S] = _[S]);
        return g && z(
          p,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        ), U(e, g, void 0, void 0, H(), p);
      }, r.createRef = function() {
        var e = { current: null };
        return Object.seal(e), e;
      }, r.forwardRef = function(e) {
        e != null && e.$$typeof === qe ? console.error(
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
        var a = { $$typeof: we, render: e }, f;
        return Object.defineProperty(a, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return f;
          },
          set: function(p) {
            f = p, e.name || e.displayName || (Object.defineProperty(e, "name", { value: p }), e.displayName = p);
          }
        }), a;
      }, r.isValidElement = ie, r.lazy = function(e) {
        return {
          $$typeof: He,
          _payload: { _status: -1, _result: e },
          _init: Ye
        };
      }, r.memo = function(e, a) {
        x(e) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          e === null ? "null" : typeof e
        ), a = {
          $$typeof: qe,
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
          set: function(p) {
            f = p, e.name || e.displayName || (Object.defineProperty(e, "name", { value: p }), e.displayName = p);
          }
        }), a;
      }, r.startTransition = function(e) {
        var a = O.T, f = {};
        O.T = f, f._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var p = e(), g = O.S;
          g !== null && g(f, p), typeof p == "object" && p !== null && typeof p.then == "function" && p.then(s, Qt);
        } catch (S) {
          Qt(S);
        } finally {
          a === null && f._updatedFibers && (e = f._updatedFibers.size, f._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), O.T = a;
        }
      }, r.unstable_useCacheRefresh = function() {
        return q().useCacheRefresh();
      }, r.use = function(e) {
        return q().use(e);
      }, r.useActionState = function(e, a, f) {
        return q().useActionState(
          e,
          a,
          f
        );
      }, r.useCallback = function(e, a) {
        return q().useCallback(e, a);
      }, r.useContext = function(e) {
        var a = q();
        return e.$$typeof === Le && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), a.useContext(e);
      }, r.useDebugValue = function(e, a) {
        return q().useDebugValue(e, a);
      }, r.useDeferredValue = function(e, a) {
        return q().useDeferredValue(e, a);
      }, r.useEffect = function(e, a) {
        return q().useEffect(e, a);
      }, r.useId = function() {
        return q().useId();
      }, r.useImperativeHandle = function(e, a, f) {
        return q().useImperativeHandle(e, a, f);
      }, r.useInsertionEffect = function(e, a) {
        return q().useInsertionEffect(e, a);
      }, r.useLayoutEffect = function(e, a) {
        return q().useLayoutEffect(e, a);
      }, r.useMemo = function(e, a) {
        return q().useMemo(e, a);
      }, r.useOptimistic = function(e, a) {
        return q().useOptimistic(e, a);
      }, r.useReducer = function(e, a, f) {
        return q().useReducer(e, a, f);
      }, r.useRef = function(e) {
        return q().useRef(e);
      }, r.useState = function(e) {
        return q().useState(e);
      }, r.useSyncExternalStore = function(e, a, f) {
        return q().useSyncExternalStore(
          e,
          a,
          f
        );
      }, r.useTransition = function() {
        return q().useTransition();
      }, r.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(et, et.exports)), et.exports;
}
var or;
function _r() {
  return or || (or = 1, process.env.NODE_ENV === "production" ? pt.exports = zr() : pt.exports = qr()), pt.exports;
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
var ar;
function Dr() {
  return ar || (ar = 1, process.env.NODE_ENV !== "production" && function() {
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
          case ie:
            return (n._context.displayName || "Context") + ".Consumer";
          case Re:
            var m = n.render;
            return n = n.displayName, n || (n = m.displayName || m.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case Oe:
            return m = n.displayName || null, m !== null ? m : t(n.type) || "Memo";
          case le:
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
    function o(n) {
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
        V = console.log, A = console.info, ue = console.warn, J = console.error, Ae = console.group, We = console.groupCollapsed, Le = console.groupEnd;
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
          warn: d({}, n, { value: ue }),
          error: d({}, n, { value: J }),
          group: d({}, n, { value: Ae }),
          groupCollapsed: d({}, n, { value: We }),
          groupEnd: d({}, n, { value: Le })
        });
      }
      0 > $ && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function v(n) {
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
                    var De = ge;
                  }
                  Reflect.construct(n, [], Ce);
                } else {
                  try {
                    Ce.call();
                  } catch (ge) {
                    De = ge;
                  }
                  n.call(Ce.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (ge) {
                  De = ge;
                }
                (Ce = n()) && typeof Ce.catch == "function" && Ce.catch(function() {
                });
              }
            } catch (ge) {
              if (ge && De && typeof ge.stack == "string")
                return [ge.stack, De.stack];
            }
            return [null, null];
          }
        };
        re.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var Z = Object.getOwnPropertyDescriptor(
          re.DetermineComponentFrameRoot,
          "name"
        );
        Z && Z.configurable && Object.defineProperty(
          re.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var N = re.DetermineComponentFrameRoot(), O = N[0], Se = N[1];
        if (O && Se) {
          var oe = O.split(`
`), he = Se.split(`
`);
          for (N = Z = 0; Z < oe.length && !oe[Z].includes(
            "DetermineComponentFrameRoot"
          ); )
            Z++;
          for (; N < he.length && !he[N].includes(
            "DetermineComponentFrameRoot"
          ); )
            N++;
          if (Z === oe.length || N === he.length)
            for (Z = oe.length - 1, N = he.length - 1; 1 <= Z && 0 <= N && oe[Z] !== he[N]; )
              N--;
          for (; 1 <= Z && 0 <= N; Z--, N--)
            if (oe[Z] !== he[N]) {
              if (Z !== 1 || N !== 1)
                do
                  if (Z--, N--, 0 > N || oe[Z] !== he[N]) {
                    var Ue = `
` + oe[Z].replace(
                      " at new ",
                      " at "
                    );
                    return n.displayName && Ue.includes("<anonymous>") && (Ue = Ue.replace("<anonymous>", n.displayName)), typeof n == "function" && xe.set(n, Ue), Ue;
                  }
                while (1 <= Z && 0 <= N);
              break;
            }
        }
      } finally {
        ve = !1, q.H = M, c(), Error.prepareStackTrace = E;
      }
      return oe = (oe = n ? n.displayName || n.name : "") ? v(oe) : "", typeof n == "function" && xe.set(n, oe), oe;
    }
    function C(n) {
      if (n == null) return "";
      if (typeof n == "function") {
        var m = n.prototype;
        return y(
          n,
          !(!m || !m.isReactComponent)
        );
      }
      if (typeof n == "string") return v(n);
      switch (n) {
        case be:
          return v("Suspense");
        case Ee:
          return v("SuspenseList");
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case Re:
            return n = y(n.render, !1), n;
          case Oe:
            return C(n.type);
          case le:
            m = n._payload, n = n._init;
            try {
              return C(n(m));
            } catch {
            }
        }
      return "";
    }
    function w() {
      var n = q.A;
      return n === null ? null : n.getOwner();
    }
    function h(n) {
      if (s.call(n, "key")) {
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
      return it[n] || (it[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function F(n, m, E, M, re, Z) {
      return E = Z.ref, n = {
        $$typeof: z,
        type: n,
        key: m,
        props: Z,
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
    function k(n, m, E, M, re, Z) {
      if (typeof n == "string" || typeof n == "function" || n === U || n === Te || n === I || n === be || n === Ee || n === fe || typeof n == "object" && n !== null && (n.$$typeof === le || n.$$typeof === Oe || n.$$typeof === Me || n.$$typeof === ie || n.$$typeof === Re || n.$$typeof === R || n.getModuleId !== void 0)) {
        var N = m.children;
        if (N !== void 0)
          if (M)
            if (T(N)) {
              for (M = 0; M < N.length; M++)
                P(N[M], n);
              Object.freeze && Object.freeze(N);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else P(N, n);
      } else
        N = "", (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), n === null ? M = "null" : T(n) ? M = "array" : n !== void 0 && n.$$typeof === z ? (M = "<" + (t(n.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : M = typeof n, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          M,
          N
        );
      if (s.call(m, "key")) {
        N = t(n);
        var O = Object.keys(m).filter(function(oe) {
          return oe !== "key";
        });
        M = 0 < O.length ? "{key: someKey, " + O.join(": ..., ") + ": ...}" : "{key: someKey}", Xe[N + M] || (O = 0 < O.length ? "{" + O.join(": ..., ") + ": ...}" : "{}", console.error(
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
        ), Xe[N + M] = !0);
      }
      if (N = null, E !== void 0 && (o(E), N = "" + E), h(m) && (o(m.key), N = "" + m.key), "key" in m) {
        E = {};
        for (var Se in m)
          Se !== "key" && (E[Se] = m[Se]);
      } else E = m;
      return N && x(
        E,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), F(n, N, Z, re, w(), E);
    }
    function P(n, m) {
      if (typeof n == "object" && n && n.$$typeof !== qe) {
        if (T(n))
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
      if (n._store && !n._store.validated && n.key == null && (n._store.validated = 1, m = H(m), !Ke[m])) {
        Ke[m] = !0;
        var E = "";
        n && n._owner != null && n._owner !== w() && (E = null, typeof n._owner.tag == "number" ? E = t(n._owner.type) : typeof n._owner.name == "string" && (E = n._owner.name), E = " It was passed a child from " + E + ".");
        var M = q.getCurrentStack;
        q.getCurrentStack = function() {
          var re = C(n.type);
          return M && (re += M() || ""), re;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          m,
          E
        ), q.getCurrentStack = M;
      }
    }
    function H(n) {
      var m = "", E = w();
      return E && (E = t(E.type)) && (m = `

Check the render method of \`` + E + "`."), m || (n = t(n)) && (m = `

Check the top-level render call using <` + n + ">."), m;
    }
    var L = _r(), z = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), U = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), Te = Symbol.for("react.profiler"), ie = Symbol.for("react.consumer"), Me = Symbol.for("react.context"), Re = Symbol.for("react.forward_ref"), be = Symbol.for("react.suspense"), Ee = Symbol.for("react.suspense_list"), Oe = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), _e = Symbol.iterator, Ye = Symbol.for("react.client.reference"), q = L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, s = Object.prototype.hasOwnProperty, d = Object.assign, R = Symbol.for("react.client.reference"), T = Array.isArray, $ = 0, V, A, ue, J, Ae, We, Le;
    i.__reactDisabledLog = !0;
    var b, we, ve = !1, xe = new (typeof WeakMap == "function" ? WeakMap : Map)(), qe = Symbol.for("react.client.reference"), He, it = {}, Xe = {}, Ke = {};
    Je.Fragment = U, Je.jsx = function(n, m, E, M, re) {
      return k(n, m, E, !1, M, re);
    }, Je.jsxs = function(n, m, E, M, re) {
      return k(n, m, E, !0, M, re);
    };
  }()), Je;
}
var sr;
function Gr() {
  return sr || (sr = 1, process.env.NODE_ENV === "production" ? dt.exports = Ur() : dt.exports = Dr()), dt.exports;
}
var tt = Gr(), se = _r();
const Nt = /* @__PURE__ */ Lr(se), ir = /* @__PURE__ */ Hr({
  __proto__: null,
  default: Nt
}, [se]);
var Br = !1;
function Fr(t) {
  if (t.sheet)
    return t.sheet;
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === t)
      return document.styleSheets[r];
}
function Vr(t) {
  var r = document.createElement("style");
  return r.setAttribute("data-emotion", t.key), t.nonce !== void 0 && r.setAttribute("nonce", t.nonce), r.appendChild(document.createTextNode("")), r.setAttribute("data-s", ""), r;
}
var Xr = /* @__PURE__ */ function() {
  function t(o) {
    var i = this;
    this._insertTag = function(u) {
      var c;
      i.tags.length === 0 ? i.insertionPoint ? c = i.insertionPoint.nextSibling : i.prepend ? c = i.container.firstChild : c = i.before : c = i.tags[i.tags.length - 1].nextSibling, i.container.insertBefore(u, c), i.tags.push(u);
    }, this.isSpeedy = o.speedy === void 0 ? !Br : o.speedy, this.tags = [], this.ctr = 0, this.nonce = o.nonce, this.key = o.key, this.container = o.container, this.prepend = o.prepend, this.insertionPoint = o.insertionPoint, this.before = null;
  }
  var r = t.prototype;
  return r.hydrate = function(i) {
    i.forEach(this._insertTag);
  }, r.insert = function(i) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Vr(this));
    var u = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var c = Fr(u);
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
}(), ce = "-ms-", bt = "-moz-", G = "-webkit-", wr = "comm", Yt = "rule", Lt = "decl", Kr = "@import", Sr = "@keyframes", Qr = "@layer", Jr = Math.abs, wt = String.fromCharCode, Zr = Object.assign;
function en(t, r) {
  return ae(t, 0) ^ 45 ? (((r << 2 ^ ae(t, 0)) << 2 ^ ae(t, 1)) << 2 ^ ae(t, 2)) << 2 ^ ae(t, 3) : 0;
}
function Cr(t) {
  return t.trim();
}
function tn(t, r) {
  return (t = r.exec(t)) ? t[0] : t;
}
function B(t, r, o) {
  return t.replace(r, o);
}
function jt(t, r) {
  return t.indexOf(r);
}
function ae(t, r) {
  return t.charCodeAt(r) | 0;
}
function rt(t, r, o) {
  return t.slice(r, o);
}
function $e(t) {
  return t.length;
}
function It(t) {
  return t.length;
}
function vt(t, r) {
  return r.push(t), t;
}
function rn(t, r) {
  return t.map(r).join("");
}
var St = 1, Fe = 1, Tr = 0, pe = 0, ne = 0, Ve = "";
function Ct(t, r, o, i, u, c, v) {
  return { value: t, root: r, parent: o, type: i, props: u, children: c, line: St, column: Fe, length: v, return: "" };
}
function Ze(t, r) {
  return Zr(Ct("", null, null, "", null, null, 0), t, { length: -t.length }, r);
}
function nn() {
  return ne;
}
function on() {
  return ne = pe > 0 ? ae(Ve, --pe) : 0, Fe--, ne === 10 && (Fe = 1, St--), ne;
}
function ye() {
  return ne = pe < Tr ? ae(Ve, pe++) : 0, Fe++, ne === 10 && (Fe = 1, St++), ne;
}
function ke() {
  return ae(Ve, pe);
}
function yt() {
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
function Rr(t) {
  return St = Fe = 1, Tr = $e(Ve = t), pe = 0, [];
}
function Or(t) {
  return Ve = "", t;
}
function Et(t) {
  return Cr(at(pe - 1, kt(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function an(t) {
  for (; (ne = ke()) && ne < 33; )
    ye();
  return nt(t) > 2 || nt(ne) > 3 ? "" : " ";
}
function sn(t, r) {
  for (; --r && ye() && !(ne < 48 || ne > 102 || ne > 57 && ne < 65 || ne > 70 && ne < 97); )
    ;
  return at(t, yt() + (r < 6 && ke() == 32 && ye() == 32));
}
function kt(t) {
  for (; ye(); )
    switch (ne) {
      // ] ) " '
      case t:
        return pe;
      // " '
      case 34:
      case 39:
        t !== 34 && t !== 39 && kt(ne);
        break;
      // (
      case 40:
        t === 41 && kt(t);
        break;
      // \
      case 92:
        ye();
        break;
    }
  return pe;
}
function un(t, r) {
  for (; ye() && t + ne !== 57; )
    if (t + ne === 84 && ke() === 47)
      break;
  return "/*" + at(r, pe - 1) + "*" + wt(t === 47 ? t : ye());
}
function cn(t) {
  for (; !nt(ke()); )
    ye();
  return at(t, pe);
}
function fn(t) {
  return Or(gt("", null, null, null, [""], t = Rr(t), 0, [0], t));
}
function gt(t, r, o, i, u, c, v, y, C) {
  for (var w = 0, h = 0, x = v, ee = 0, F = 0, k = 0, P = 1, W = 1, Y = 1, H = 0, L = "", z = u, l = c, U = i, I = L; W; )
    switch (k = H, H = ye()) {
      // (
      case 40:
        if (k != 108 && ae(I, x - 1) == 58) {
          jt(I += B(Et(H), "&", "&\f"), "&\f") != -1 && (Y = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        I += Et(H);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        I += an(k);
        break;
      // \
      case 92:
        I += sn(yt() - 1, 7);
        continue;
      // /
      case 47:
        switch (ke()) {
          case 42:
          case 47:
            vt(ln(un(ye(), yt()), r, o), C);
            break;
          default:
            I += "/";
        }
        break;
      // {
      case 123 * P:
        y[w++] = $e(I) * Y;
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
          case 59 + h:
            Y == -1 && (I = B(I, /\f/g, "")), F > 0 && $e(I) - x && vt(F > 32 ? cr(I + ";", i, o, x - 1) : cr(B(I, " ", "") + ";", i, o, x - 2), C);
            break;
          // @ ;
          case 59:
            I += ";";
          // { rule/at-rule
          default:
            if (vt(U = ur(I, r, o, w, h, u, y, L, z = [], l = [], x), c), H === 123)
              if (h === 0)
                gt(I, r, U, U, z, c, x, y, l);
              else
                switch (ee === 99 && ae(I, 3) === 110 ? 100 : ee) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    gt(t, U, U, i && vt(ur(t, U, U, 0, 0, u, y, L, u, z = [], x), l), u, l, x, y, i ? z : l);
                    break;
                  default:
                    gt(I, U, U, U, [""], l, 0, y, l);
                }
        }
        w = h = F = 0, P = Y = 1, L = I = "", x = v;
        break;
      // :
      case 58:
        x = 1 + $e(I), F = k;
      default:
        if (P < 1) {
          if (H == 123)
            --P;
          else if (H == 125 && P++ == 0 && on() == 125)
            continue;
        }
        switch (I += wt(H), H * P) {
          // &
          case 38:
            Y = h > 0 ? 1 : (I += "\f", -1);
            break;
          // ,
          case 44:
            y[w++] = ($e(I) - 1) * Y, Y = 1;
            break;
          // @
          case 64:
            ke() === 45 && (I += Et(ye())), ee = ke(), h = x = $e(L = I += cn(yt())), H++;
            break;
          // -
          case 45:
            k === 45 && $e(I) == 2 && (P = 0);
        }
    }
  return c;
}
function ur(t, r, o, i, u, c, v, y, C, w, h) {
  for (var x = u - 1, ee = u === 0 ? c : [""], F = It(ee), k = 0, P = 0, W = 0; k < i; ++k)
    for (var Y = 0, H = rt(t, x + 1, x = Jr(P = v[k])), L = t; Y < F; ++Y)
      (L = Cr(P > 0 ? ee[Y] + " " + H : B(H, /&\f/g, ee[Y]))) && (C[W++] = L);
  return Ct(t, r, o, u === 0 ? Yt : y, C, w, h);
}
function ln(t, r, o) {
  return Ct(t, r, o, wr, wt(nn()), rt(t, 2, -2), 0);
}
function cr(t, r, o, i) {
  return Ct(t, r, o, Lt, rt(t, 0, i), rt(t, i + 1, -1), i);
}
function Be(t, r) {
  for (var o = "", i = It(t), u = 0; u < i; u++)
    o += r(t[u], u, t, r) || "";
  return o;
}
function dn(t, r, o, i) {
  switch (t.type) {
    case Qr:
      if (t.children.length) break;
    case Kr:
    case Lt:
      return t.return = t.return || t.value;
    case wr:
      return "";
    case Sr:
      return t.return = t.value + "{" + Be(t.children, i) + "}";
    case Yt:
      t.value = t.props.join(",");
  }
  return $e(o = Be(t.children, i)) ? t.return = t.value + "{" + o + "}" : "";
}
function pn(t) {
  var r = It(t);
  return function(o, i, u, c) {
    for (var v = "", y = 0; y < r; y++)
      v += t[y](o, i, u, c) || "";
    return v;
  };
}
function vn(t) {
  return function(r) {
    r.root || (r = r.return) && t(r);
  };
}
function hn(t) {
  var r = /* @__PURE__ */ Object.create(null);
  return function(o) {
    return r[o] === void 0 && (r[o] = t(o)), r[o];
  };
}
var mn = function(r, o, i) {
  for (var u = 0, c = 0; u = c, c = ke(), u === 38 && c === 12 && (o[i] = 1), !nt(c); )
    ye();
  return at(r, pe);
}, yn = function(r, o) {
  var i = -1, u = 44;
  do
    switch (nt(u)) {
      case 0:
        u === 38 && ke() === 12 && (o[i] = 1), r[i] += mn(pe - 1, o, i);
        break;
      case 2:
        r[i] += Et(u);
        break;
      case 4:
        if (u === 44) {
          r[++i] = ke() === 58 ? "&\f" : "", o[i] = r[i].length;
          break;
        }
      // fallthrough
      default:
        r[i] += wt(u);
    }
  while (u = ye());
  return r;
}, En = function(r, o) {
  return Or(yn(Rr(r), o));
}, fr = /* @__PURE__ */ new WeakMap(), gn = function(r) {
  if (!(r.type !== "rule" || !r.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r.length < 1)) {
    for (var o = r.value, i = r.parent, u = r.column === i.column && r.line === i.line; i.type !== "rule"; )
      if (i = i.parent, !i) return;
    if (!(r.props.length === 1 && o.charCodeAt(0) !== 58 && !fr.get(i)) && !u) {
      fr.set(r, !0);
      for (var c = [], v = En(o, c), y = i.props, C = 0, w = 0; C < v.length; C++)
        for (var h = 0; h < y.length; h++, w++)
          r.props[w] = c[C] ? v[C].replace(/&\f/g, y[h]) : y[h] + " " + v[C];
    }
  }
}, bn = function(r) {
  if (r.type === "decl") {
    var o = r.value;
    // charcode for l
    o.charCodeAt(0) === 108 && // charcode for b
    o.charCodeAt(2) === 98 && (r.return = "", r.value = "");
  }
};
function Ar(t, r) {
  switch (en(t, r)) {
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
      return G + t + bt + t + ce + t + t;
    // flex, flex-direction
    case 6828:
    case 4268:
      return G + t + ce + t + t;
    // order
    case 6165:
      return G + t + ce + "flex-" + t + t;
    // align-items
    case 5187:
      return G + t + B(t, /(\w+).+(:[^]+)/, G + "box-$1$2" + ce + "flex-$1$2") + t;
    // align-self
    case 5443:
      return G + t + ce + "flex-item-" + B(t, /flex-|-self/, "") + t;
    // align-content
    case 4675:
      return G + t + ce + "flex-line-pack" + B(t, /align-content|flex-|-self/, "") + t;
    // flex-shrink
    case 5548:
      return G + t + ce + B(t, "shrink", "negative") + t;
    // flex-basis
    case 5292:
      return G + t + ce + B(t, "basis", "preferred-size") + t;
    // flex-grow
    case 6060:
      return G + "box-" + B(t, "-grow", "") + G + t + ce + B(t, "grow", "positive") + t;
    // transition
    case 4554:
      return G + B(t, /([^-])(transform)/g, "$1" + G + "$2") + t;
    // cursor
    case 6187:
      return B(B(B(t, /(zoom-|grab)/, G + "$1"), /(image-set)/, G + "$1"), t, "") + t;
    // background, background-image
    case 5495:
    case 3959:
      return B(t, /(image-set\([^]*)/, G + "$1$`$1");
    // justify-content
    case 4968:
      return B(B(t, /(.+:)(flex-)?(.*)/, G + "box-pack:$3" + ce + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + G + t + t;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return B(t, /(.+)-inline(.+)/, G + "$1$2") + t;
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
          return B(t, /(.+:)(.+)-([^]+)/, "$1" + G + "$2-$3$1" + bt + (ae(t, r + 3) == 108 ? "$3" : "$2-$3")) + t;
        // (s)tretch
        case 115:
          return ~jt(t, "stretch") ? Ar(B(t, "stretch", "fill-available"), r) + t : t;
      }
      break;
    // position: sticky
    case 4949:
      if (ae(t, r + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (ae(t, $e(t) - 3 - (~jt(t, "!important") && 10))) {
        // stic(k)y
        case 107:
          return B(t, ":", ":" + G) + t;
        // (inline-)?fl(e)x
        case 101:
          return B(t, /(.+:)([^;!]+)(;|!.+)?/, "$1" + G + (ae(t, 14) === 45 ? "inline-" : "") + "box$3$1" + G + "$2$3$1" + ce + "$2box$3") + t;
      }
      break;
    // writing-mode
    case 5936:
      switch (ae(t, r + 11)) {
        // vertical-l(r)
        case 114:
          return G + t + ce + B(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        // vertical-r(l)
        case 108:
          return G + t + ce + B(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        // horizontal(-)tb
        case 45:
          return G + t + ce + B(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
      return G + t + ce + t + t;
  }
  return t;
}
var _n = function(r, o, i, u) {
  if (r.length > -1 && !r.return) switch (r.type) {
    case Lt:
      r.return = Ar(r.value, r.length);
      break;
    case Sr:
      return Be([Ze(r, {
        value: B(r.value, "@", "@" + G)
      })], u);
    case Yt:
      if (r.length) return rn(r.props, function(c) {
        switch (tn(c, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return Be([Ze(r, {
              props: [B(c, /:(read-\w+)/, ":" + bt + "$1")]
            })], u);
          // :placeholder
          case "::placeholder":
            return Be([Ze(r, {
              props: [B(c, /:(plac\w+)/, ":" + G + "input-$1")]
            }), Ze(r, {
              props: [B(c, /:(plac\w+)/, ":" + bt + "$1")]
            }), Ze(r, {
              props: [B(c, /:(plac\w+)/, ce + "input-$1")]
            })], u);
        }
        return "";
      });
  }
}, wn = [_n], Sn = function(r) {
  var o = r.key;
  if (o === "css") {
    var i = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(i, function(P) {
      var W = P.getAttribute("data-emotion");
      W.indexOf(" ") !== -1 && (document.head.appendChild(P), P.setAttribute("data-s", ""));
    });
  }
  var u = r.stylisPlugins || wn, c = {}, v, y = [];
  v = r.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + o + ' "]'),
    function(P) {
      for (var W = P.getAttribute("data-emotion").split(" "), Y = 1; Y < W.length; Y++)
        c[W[Y]] = !0;
      y.push(P);
    }
  );
  var C, w = [gn, bn];
  {
    var h, x = [dn, vn(function(P) {
      h.insert(P);
    })], ee = pn(w.concat(u, x)), F = function(W) {
      return Be(fn(W), ee);
    };
    C = function(W, Y, H, L) {
      h = H, F(W ? W + "{" + Y.styles + "}" : Y.styles), L && (k.inserted[Y.name] = !0);
    };
  }
  var k = {
    key: o,
    sheet: new Xr({
      key: o,
      container: v,
      nonce: r.nonce,
      speedy: r.speedy,
      prepend: r.prepend,
      insertionPoint: r.insertionPoint
    }),
    nonce: r.nonce,
    inserted: c,
    registered: {},
    insert: C
  };
  return k.sheet.hydrate(y), k;
}, ht = { exports: {} }, X = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lr;
function Cn() {
  if (lr) return X;
  lr = 1;
  var t = typeof Symbol == "function" && Symbol.for, r = t ? Symbol.for("react.element") : 60103, o = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, u = t ? Symbol.for("react.strict_mode") : 60108, c = t ? Symbol.for("react.profiler") : 60114, v = t ? Symbol.for("react.provider") : 60109, y = t ? Symbol.for("react.context") : 60110, C = t ? Symbol.for("react.async_mode") : 60111, w = t ? Symbol.for("react.concurrent_mode") : 60111, h = t ? Symbol.for("react.forward_ref") : 60112, x = t ? Symbol.for("react.suspense") : 60113, ee = t ? Symbol.for("react.suspense_list") : 60120, F = t ? Symbol.for("react.memo") : 60115, k = t ? Symbol.for("react.lazy") : 60116, P = t ? Symbol.for("react.block") : 60121, W = t ? Symbol.for("react.fundamental") : 60117, Y = t ? Symbol.for("react.responder") : 60118, H = t ? Symbol.for("react.scope") : 60119;
  function L(l) {
    if (typeof l == "object" && l !== null) {
      var U = l.$$typeof;
      switch (U) {
        case r:
          switch (l = l.type, l) {
            case C:
            case w:
            case i:
            case c:
            case u:
            case x:
              return l;
            default:
              switch (l = l && l.$$typeof, l) {
                case y:
                case h:
                case k:
                case F:
                case v:
                  return l;
                default:
                  return U;
              }
          }
        case o:
          return U;
      }
    }
  }
  function z(l) {
    return L(l) === w;
  }
  return X.AsyncMode = C, X.ConcurrentMode = w, X.ContextConsumer = y, X.ContextProvider = v, X.Element = r, X.ForwardRef = h, X.Fragment = i, X.Lazy = k, X.Memo = F, X.Portal = o, X.Profiler = c, X.StrictMode = u, X.Suspense = x, X.isAsyncMode = function(l) {
    return z(l) || L(l) === C;
  }, X.isConcurrentMode = z, X.isContextConsumer = function(l) {
    return L(l) === y;
  }, X.isContextProvider = function(l) {
    return L(l) === v;
  }, X.isElement = function(l) {
    return typeof l == "object" && l !== null && l.$$typeof === r;
  }, X.isForwardRef = function(l) {
    return L(l) === h;
  }, X.isFragment = function(l) {
    return L(l) === i;
  }, X.isLazy = function(l) {
    return L(l) === k;
  }, X.isMemo = function(l) {
    return L(l) === F;
  }, X.isPortal = function(l) {
    return L(l) === o;
  }, X.isProfiler = function(l) {
    return L(l) === c;
  }, X.isStrictMode = function(l) {
    return L(l) === u;
  }, X.isSuspense = function(l) {
    return L(l) === x;
  }, X.isValidElementType = function(l) {
    return typeof l == "string" || typeof l == "function" || l === i || l === w || l === c || l === u || l === x || l === ee || typeof l == "object" && l !== null && (l.$$typeof === k || l.$$typeof === F || l.$$typeof === v || l.$$typeof === y || l.$$typeof === h || l.$$typeof === W || l.$$typeof === Y || l.$$typeof === H || l.$$typeof === P);
  }, X.typeOf = L, X;
}
var K = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dr;
function Tn() {
  return dr || (dr = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, r = t ? Symbol.for("react.element") : 60103, o = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, u = t ? Symbol.for("react.strict_mode") : 60108, c = t ? Symbol.for("react.profiler") : 60114, v = t ? Symbol.for("react.provider") : 60109, y = t ? Symbol.for("react.context") : 60110, C = t ? Symbol.for("react.async_mode") : 60111, w = t ? Symbol.for("react.concurrent_mode") : 60111, h = t ? Symbol.for("react.forward_ref") : 60112, x = t ? Symbol.for("react.suspense") : 60113, ee = t ? Symbol.for("react.suspense_list") : 60120, F = t ? Symbol.for("react.memo") : 60115, k = t ? Symbol.for("react.lazy") : 60116, P = t ? Symbol.for("react.block") : 60121, W = t ? Symbol.for("react.fundamental") : 60117, Y = t ? Symbol.for("react.responder") : 60118, H = t ? Symbol.for("react.scope") : 60119;
    function L(b) {
      return typeof b == "string" || typeof b == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      b === i || b === w || b === c || b === u || b === x || b === ee || typeof b == "object" && b !== null && (b.$$typeof === k || b.$$typeof === F || b.$$typeof === v || b.$$typeof === y || b.$$typeof === h || b.$$typeof === W || b.$$typeof === Y || b.$$typeof === H || b.$$typeof === P);
    }
    function z(b) {
      if (typeof b == "object" && b !== null) {
        var we = b.$$typeof;
        switch (we) {
          case r:
            var ve = b.type;
            switch (ve) {
              case C:
              case w:
              case i:
              case c:
              case u:
              case x:
                return ve;
              default:
                var xe = ve && ve.$$typeof;
                switch (xe) {
                  case y:
                  case h:
                  case k:
                  case F:
                  case v:
                    return xe;
                  default:
                    return we;
                }
            }
          case o:
            return we;
        }
      }
    }
    var l = C, U = w, I = y, Te = v, ie = r, Me = h, Re = i, be = k, Ee = F, Oe = o, le = c, fe = u, _e = x, Ye = !1;
    function q(b) {
      return Ye || (Ye = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), s(b) || z(b) === C;
    }
    function s(b) {
      return z(b) === w;
    }
    function d(b) {
      return z(b) === y;
    }
    function R(b) {
      return z(b) === v;
    }
    function T(b) {
      return typeof b == "object" && b !== null && b.$$typeof === r;
    }
    function $(b) {
      return z(b) === h;
    }
    function V(b) {
      return z(b) === i;
    }
    function A(b) {
      return z(b) === k;
    }
    function ue(b) {
      return z(b) === F;
    }
    function J(b) {
      return z(b) === o;
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
    K.AsyncMode = l, K.ConcurrentMode = U, K.ContextConsumer = I, K.ContextProvider = Te, K.Element = ie, K.ForwardRef = Me, K.Fragment = Re, K.Lazy = be, K.Memo = Ee, K.Portal = Oe, K.Profiler = le, K.StrictMode = fe, K.Suspense = _e, K.isAsyncMode = q, K.isConcurrentMode = s, K.isContextConsumer = d, K.isContextProvider = R, K.isElement = T, K.isForwardRef = $, K.isFragment = V, K.isLazy = A, K.isMemo = ue, K.isPortal = J, K.isProfiler = Ae, K.isStrictMode = We, K.isSuspense = Le, K.isValidElementType = L, K.typeOf = z;
  }()), K;
}
var pr;
function Rn() {
  return pr || (pr = 1, process.env.NODE_ENV === "production" ? ht.exports = Cn() : ht.exports = Tn()), ht.exports;
}
var xt, vr;
function On() {
  if (vr) return xt;
  vr = 1;
  var t = Rn(), r = {
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
  }, o = {
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
  function v(k) {
    return t.isMemo(k) ? u : c[k.$$typeof] || r;
  }
  var y = Object.defineProperty, C = Object.getOwnPropertyNames, w = Object.getOwnPropertySymbols, h = Object.getOwnPropertyDescriptor, x = Object.getPrototypeOf, ee = Object.prototype;
  function F(k, P, W) {
    if (typeof P != "string") {
      if (ee) {
        var Y = x(P);
        Y && Y !== ee && F(k, Y, W);
      }
      var H = C(P);
      w && (H = H.concat(w(P)));
      for (var L = v(k), z = v(P), l = 0; l < H.length; ++l) {
        var U = H[l];
        if (!o[U] && !(W && W[U]) && !(z && z[U]) && !(L && L[U])) {
          var I = h(P, U);
          try {
            y(k, U, I);
          } catch {
          }
        }
      }
    }
    return k;
  }
  return xt = F, xt;
}
On();
var An = !0;
function xn(t, r, o) {
  var i = "";
  return o.split(" ").forEach(function(u) {
    t[u] !== void 0 ? r.push(t[u] + ";") : u && (i += u + " ");
  }), i;
}
var xr = function(r, o, i) {
  var u = r.key + "-" + o.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (i === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  An === !1) && r.registered[u] === void 0 && (r.registered[u] = o.styles);
}, Pn = function(r, o, i) {
  xr(r, o, i);
  var u = r.key + "-" + o.name;
  if (r.inserted[o.name] === void 0) {
    var c = o;
    do
      r.insert(o === c ? "." + u : "", c, r.sheet, !0), c = c.next;
    while (c !== void 0);
  }
};
function $n(t) {
  for (var r = 0, o, i = 0, u = t.length; u >= 4; ++i, u -= 4)
    o = t.charCodeAt(i) & 255 | (t.charCodeAt(++i) & 255) << 8 | (t.charCodeAt(++i) & 255) << 16 | (t.charCodeAt(++i) & 255) << 24, o = /* Math.imul(k, m): */
    (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16), o ^= /* k >>> r: */
    o >>> 24, r = /* Math.imul(k, m): */
    (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
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
var Nn = {
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
}, jn = !1, kn = /[A-Z]|^ms/g, Mn = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Pr = function(r) {
  return r.charCodeAt(1) === 45;
}, hr = function(r) {
  return r != null && typeof r != "boolean";
}, Pt = /* @__PURE__ */ hn(function(t) {
  return Pr(t) ? t : t.replace(kn, "-$&").toLowerCase();
}), mr = function(r, o) {
  switch (r) {
    case "animation":
    case "animationName":
      if (typeof o == "string")
        return o.replace(Mn, function(i, u, c) {
          return Ne = {
            name: u,
            styles: c,
            next: Ne
          }, u;
        });
  }
  return Nn[r] !== 1 && !Pr(r) && typeof o == "number" && o !== 0 ? o + "px" : o;
}, Yn = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function ot(t, r, o) {
  if (o == null)
    return "";
  var i = o;
  if (i.__emotion_styles !== void 0)
    return i;
  switch (typeof o) {
    case "boolean":
      return "";
    case "object": {
      var u = o;
      if (u.anim === 1)
        return Ne = {
          name: u.name,
          styles: u.styles,
          next: Ne
        }, u.name;
      var c = o;
      if (c.styles !== void 0) {
        var v = c.next;
        if (v !== void 0)
          for (; v !== void 0; )
            Ne = {
              name: v.name,
              styles: v.styles,
              next: Ne
            }, v = v.next;
        var y = c.styles + ";";
        return y;
      }
      return Ln(t, r, o);
    }
    case "function": {
      if (t !== void 0) {
        var C = Ne, w = o(t);
        return Ne = C, ot(t, r, w);
      }
      break;
    }
  }
  var h = o;
  return h;
}
function Ln(t, r, o) {
  var i = "";
  if (Array.isArray(o))
    for (var u = 0; u < o.length; u++)
      i += ot(t, r, o[u]) + ";";
  else
    for (var c in o) {
      var v = o[c];
      if (typeof v != "object") {
        var y = v;
        hr(y) && (i += Pt(c) + ":" + mr(c, y) + ";");
      } else {
        if (c === "NO_COMPONENT_SELECTOR" && jn)
          throw new Error(Yn);
        if (Array.isArray(v) && typeof v[0] == "string" && r == null)
          for (var C = 0; C < v.length; C++)
            hr(v[C]) && (i += Pt(c) + ":" + mr(c, v[C]) + ";");
        else {
          var w = ot(t, r, v);
          switch (c) {
            case "animation":
            case "animationName": {
              i += Pt(c) + ":" + w + ";";
              break;
            }
            default:
              i += c + "{" + w + "}";
          }
        }
      }
    }
  return i;
}
var yr = /label:\s*([^\s;{]+)\s*(;|$)/g, Ne;
function $r(t, r, o) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var i = !0, u = "";
  Ne = void 0;
  var c = t[0];
  if (c == null || c.raw === void 0)
    i = !1, u += ot(o, r, c);
  else {
    var v = c;
    u += v[0];
  }
  for (var y = 1; y < t.length; y++)
    if (u += ot(o, r, t[y]), i) {
      var C = c;
      u += C[y];
    }
  yr.lastIndex = 0;
  for (var w = "", h; (h = yr.exec(u)) !== null; )
    w += "-" + h[1];
  var x = $n(u) + w;
  return {
    name: x,
    styles: u,
    next: Ne
  };
}
var In = function(r) {
  return r();
}, Wn = ir.useInsertionEffect ? ir.useInsertionEffect : !1, Hn = Wn || In, Un = !1, Nr = /* @__PURE__ */ se.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Sn({
    key: "css"
  }) : null
);
Nr.Provider;
var zn = function(r) {
  return /* @__PURE__ */ se.forwardRef(function(o, i) {
    var u = se.useContext(Nr);
    return r(o, u, i);
  });
}, qn = /* @__PURE__ */ se.createContext({}), st = {}.hasOwnProperty, Mt = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Wt = function(r, o) {
  var i = {};
  for (var u in o)
    st.call(o, u) && (i[u] = o[u]);
  return i[Mt] = r, i;
}, Dn = function(r) {
  var o = r.cache, i = r.serialized, u = r.isStringTag;
  return xr(o, i, u), Hn(function() {
    return Pn(o, i, u);
  }), null;
}, Gn = /* @__PURE__ */ zn(function(t, r, o) {
  var i = t.css;
  typeof i == "string" && r.registered[i] !== void 0 && (i = r.registered[i]);
  var u = t[Mt], c = [i], v = "";
  typeof t.className == "string" ? v = xn(r.registered, c, t.className) : t.className != null && (v = t.className + " ");
  var y = $r(c, void 0, se.useContext(qn));
  v += r.key + "-" + y.name;
  var C = {};
  for (var w in t)
    st.call(t, w) && w !== "css" && w !== Mt && !Un && (C[w] = t[w]);
  return C.className = v, o && (C.ref = o), /* @__PURE__ */ se.createElement(se.Fragment, null, /* @__PURE__ */ se.createElement(Dn, {
    cache: r,
    serialized: y,
    isStringTag: typeof u == "string"
  }), /* @__PURE__ */ se.createElement(u, C));
}), Ht = Gn, Bn = tt.Fragment, je = function(r, o, i) {
  return st.call(o, "css") ? tt.jsx(Ht, Wt(r, o), i) : tt.jsx(r, o, i);
}, Fn = function(r, o, i) {
  return st.call(o, "css") ? tt.jsxs(Ht, Wt(r, o), i) : tt.jsxs(r, o, i);
};
function Vn({ cmn: { styChild: t, sys: r }, fn: o }) {
  return /* @__PURE__ */ je(Bn, { children: /* @__PURE__ */ je("img", { css: t, src: ((u) => r.cfg.searchPath(u, Ir.SP_GSM))(o) }) });
}
function Xn({ cmn: { styChild: t } }) {
  return /* @__PURE__ */ je("div", { css: t, children: /* @__PURE__ */ je("span", {}) });
}
const Er = (t) => {
  let r;
  const o = /* @__PURE__ */ new Set(), i = (w, h) => {
    const x = typeof w == "function" ? w(r) : w;
    if (!Object.is(x, r)) {
      const ee = r;
      r = h ?? (typeof x != "object" || x === null) ? x : Object.assign({}, r, x), o.forEach((F) => F(r, ee));
    }
  }, u = () => r, y = { setState: i, getState: u, getInitialState: () => C, subscribe: (w) => (o.add(w), () => o.delete(w)) }, C = r = t(i, u, y);
  return y;
}, Kn = (t) => t ? Er(t) : Er, Qn = (t) => t;
function Jn(t, r = Qn) {
  const o = Nt.useSyncExternalStore(
    t.subscribe,
    () => r(t.getState()),
    () => r(t.getInitialState())
  );
  return Nt.useDebugValue(o), o;
}
const Zn = (t) => {
  const r = Kn(t), o = (i) => Jn(r, i);
  return Object.assign(o, r), o;
}, eo = (t) => Zn, mt = eo()((t) => ({
  txt: "",
  addTxt: (r) => t((o) => ({ txt: o.txt + r })),
  clearTxt: () => t(() => ({ txt: "" })),
  aLay: [],
  replace: (r) => t((o) => ({ aLay: JSON.parse(r) })),
  addLayer: (r) => t((o) => ({ aLay: [...o.aLay, r] })),
  chgPic: ({ nm: r, fn: o }) => t((i) => {
    const u = [...i.aLay], c = u.find((v) => v.nm === r);
    if (!c) throw `存在しないレイヤ ${r} です`;
    if (c.cls !== "GRP") throw `${r} は画像レイヤではありません`;
    return c.fn = o, { aLay: u };
  })
}));
var gr = function(r, o) {
  var i = arguments;
  if (o == null || !st.call(o, "css"))
    return se.createElement.apply(void 0, i);
  var u = i.length, c = new Array(u);
  c[0] = Ht, c[1] = Wt(r, o);
  for (var v = 2; v < u; v++)
    c[v] = i[v];
  return se.createElement.apply(null, c);
};
(function(t) {
  var r;
  r || (r = t.JSX || (t.JSX = {}));
})(gr || (gr = {}));
function $t() {
  for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
    r[o] = arguments[o];
  return $r(r);
}
const jr = () => {
  console.log("fn:Stage.tsx line:60 Stage 0");
  const t = mt((h) => h.aLay), r = mt((h) => h.addLayer), o = mt((h) => h.chgPic), i = mt((h) => h.replace);
  se.useEffect(() => {
    ze.addEventListener("ev_addLayer", (h) => r(h.detail)), ze.addEventListener("ev_chgPic", (h) => o(h.detail)), ze.addEventListener("ev_replace", (h) => i(h.detail));
  }, []);
  const [u, c] = se.useState(br());
  se.useEffect(() => {
    function h() {
      c(br());
    }
    return globalThis.addEventListener("resize", h), () => globalThis.removeEventListener("resize", h);
  }, []);
  const { cvsScale: v } = to(u);
  se.useEffect(() => Mr.onUpdate(JSON.stringify(t)), [t]);
  const y = $t`
		position: relative;

		transform-origin: left top;
		transform: scale(${v});
		width	: calc(${me.stageW}px / ${v});
		height	: calc(${me.stageH}px / ${v});
	`, C = $t`position: absolute; top: 0; left: 0;`, w = $t`
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
  return /* @__PURE__ */ Fn("div", { css: y, children: [
    /* @__PURE__ */ je("button", { onClick: () => {
    }, css: w, children: "Click" }),
    /* @__PURE__ */ je("button", { onClick: () => {
    }, css: w, children: "Back" }),
    /* @__PURE__ */ je("button", { onClick: () => {
    }, css: w, children: "Prev" }),
    t.map((h) => h.cls === "GRP" ? /* @__PURE__ */ je(Vn, { cmn: { sys: _t, styChild: C }, fn: h.fn }, h.nm) : /* @__PURE__ */ je(Xn, { cmn: { sys: _t, styChild: C }, str: "てすと" }, h.nm))
  ] });
};
function to({ width: t, height: r }) {
  let o = 0, i = 0, u = 1;
  return me.stageW > t || me.stageH > r ? (me.stageW / me.stageH <= t / r ? (i = r, o = er(me.stageW / me.stageH * r)) : (o = t, i = er(me.stageH / me.stageW * t)), u = o / me.stageW) : (o = me.stageW, i = me.stageH, u = 1), { cvsScale: u, cvsWidth: o, cvsHeight: i };
}
function br() {
  const { innerWidth: t, innerHeight: r } = globalThis;
  return { width: t, height: r };
}
async function ro(t, r) {
  ze = t, _t = r;
  const { createRoot: o } = await import("./client.js").then((i) => i.c);
  o(ze).render(/* @__PURE__ */ je(jr, {})), _t.caretaker.add(Mr);
}
let ze, _t;
function no(t) {
  ze.dispatchEvent(new CustomEvent("ev_addLayer", { detail: t }));
}
function oo(t) {
  ze.dispatchEvent(new CustomEvent("ev_chgPic", { detail: t }));
}
class kr extends Wr {
  nm = "Stage";
  stt = "[]";
  replace() {
    ze.dispatchEvent(new CustomEvent("ev_replace", { detail: this.stt }));
  }
}
const Mr = new kr(), so = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Memento: kr,
  Stage: jr,
  addLayer: no,
  chgPic: oo,
  opening: ro
}, Symbol.toStringTag, { value: "Module" }));
export {
  so as S,
  no as a,
  oo as c,
  _r as r
};
//# sourceMappingURL=Stage.js.map
