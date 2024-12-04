import { g as oD, C as AR, S as sD } from "./web2.js";
function cD(y, E) {
  for (var R = 0; R < E.length; R++) {
    const z = E[R];
    if (typeof z != "string" && !Array.isArray(z)) {
      for (const H in z)
        if (H !== "default" && !(H in y)) {
          const Y = Object.getOwnPropertyDescriptor(z, H);
          Y && Object.defineProperty(y, H, Y.get ? Y : {
            enumerable: !0,
            get: () => z[H]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(y, Symbol.toStringTag, { value: "Module" }));
}
var $0 = { exports: {} }, uv = {}, B0 = { exports: {} }, _t = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zR;
function fD() {
  if (zR) return _t;
  zR = 1;
  var y = Symbol.for("react.element"), E = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), H = Symbol.for("react.profiler"), Y = Symbol.for("react.provider"), S = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), G = Symbol.for("react.memo"), me = Symbol.for("react.lazy"), K = Symbol.iterator;
  function ce(O) {
    return O === null || typeof O != "object" ? null : (O = K && O[K] || O["@@iterator"], typeof O == "function" ? O : null);
  }
  var ae = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, ge = Object.assign, Me = {};
  function $e(O, W, We) {
    this.props = O, this.context = W, this.refs = Me, this.updater = We || ae;
  }
  $e.prototype.isReactComponent = {}, $e.prototype.setState = function(O, W) {
    if (typeof O != "object" && typeof O != "function" && O != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, O, W, "setState");
  }, $e.prototype.forceUpdate = function(O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function tt() {
  }
  tt.prototype = $e.prototype;
  function Le(O, W, We) {
    this.props = O, this.context = W, this.refs = Me, this.updater = We || ae;
  }
  var Se = Le.prototype = new tt();
  Se.constructor = Le, ge(Se, $e.prototype), Se.isPureReactComponent = !0;
  var Ue = Array.isArray, $ = Object.prototype.hasOwnProperty, Be = { current: null }, pe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function nn(O, W, We) {
    var Ze, ct = {}, ot = null, St = null;
    if (W != null) for (Ze in W.ref !== void 0 && (St = W.ref), W.key !== void 0 && (ot = "" + W.key), W) $.call(W, Ze) && !pe.hasOwnProperty(Ze) && (ct[Ze] = W[Ze]);
    var dt = arguments.length - 2;
    if (dt === 1) ct.children = We;
    else if (1 < dt) {
      for (var pt = Array(dt), Xt = 0; Xt < dt; Xt++) pt[Xt] = arguments[Xt + 2];
      ct.children = pt;
    }
    if (O && O.defaultProps) for (Ze in dt = O.defaultProps, dt) ct[Ze] === void 0 && (ct[Ze] = dt[Ze]);
    return { $$typeof: y, type: O, key: ot, ref: St, props: ct, _owner: Be.current };
  }
  function En(O, W) {
    return { $$typeof: y, type: O.type, key: W, ref: O.ref, props: O.props, _owner: O._owner };
  }
  function Ht(O) {
    return typeof O == "object" && O !== null && O.$$typeof === y;
  }
  function Ot(O) {
    var W = { "=": "=0", ":": "=2" };
    return "$" + O.replace(/[=:]/g, function(We) {
      return W[We];
    });
  }
  var mn = /\/+/g;
  function Ye(O, W) {
    return typeof O == "object" && O !== null && O.key != null ? Ot("" + O.key) : W.toString(36);
  }
  function lt(O, W, We, Ze, ct) {
    var ot = typeof O;
    (ot === "undefined" || ot === "boolean") && (O = null);
    var St = !1;
    if (O === null) St = !0;
    else switch (ot) {
      case "string":
      case "number":
        St = !0;
        break;
      case "object":
        switch (O.$$typeof) {
          case y:
          case E:
            St = !0;
        }
    }
    if (St) return St = O, ct = ct(St), O = Ze === "" ? "." + Ye(St, 0) : Ze, Ue(ct) ? (We = "", O != null && (We = O.replace(mn, "$&/") + "/"), lt(ct, W, We, "", function(Xt) {
      return Xt;
    })) : ct != null && (Ht(ct) && (ct = En(ct, We + (!ct.key || St && St.key === ct.key ? "" : ("" + ct.key).replace(mn, "$&/") + "/") + O)), W.push(ct)), 1;
    if (St = 0, Ze = Ze === "" ? "." : Ze + ":", Ue(O)) for (var dt = 0; dt < O.length; dt++) {
      ot = O[dt];
      var pt = Ze + Ye(ot, dt);
      St += lt(ot, W, We, pt, ct);
    }
    else if (pt = ce(O), typeof pt == "function") for (O = pt.call(O), dt = 0; !(ot = O.next()).done; ) ot = ot.value, pt = Ze + Ye(ot, dt++), St += lt(ot, W, We, pt, ct);
    else if (ot === "object") throw W = String(O), Error("Objects are not valid as a React child (found: " + (W === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : W) + "). If you meant to render a collection of children, use an array instead.");
    return St;
  }
  function Lt(O, W, We) {
    if (O == null) return O;
    var Ze = [], ct = 0;
    return lt(O, Ze, "", "", function(ot) {
      return W.call(We, ot, ct++);
    }), Ze;
  }
  function Tt(O) {
    if (O._status === -1) {
      var W = O._result;
      W = W(), W.then(function(We) {
        (O._status === 0 || O._status === -1) && (O._status = 1, O._result = We);
      }, function(We) {
        (O._status === 0 || O._status === -1) && (O._status = 2, O._result = We);
      }), O._status === -1 && (O._status = 0, O._result = W);
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var xe = { current: null }, ie = { transition: null }, Ne = { ReactCurrentDispatcher: xe, ReactCurrentBatchConfig: ie, ReactCurrentOwner: Be };
  function se() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return _t.Children = { map: Lt, forEach: function(O, W, We) {
    Lt(O, function() {
      W.apply(this, arguments);
    }, We);
  }, count: function(O) {
    var W = 0;
    return Lt(O, function() {
      W++;
    }), W;
  }, toArray: function(O) {
    return Lt(O, function(W) {
      return W;
    }) || [];
  }, only: function(O) {
    if (!Ht(O)) throw Error("React.Children.only expected to receive a single React element child.");
    return O;
  } }, _t.Component = $e, _t.Fragment = R, _t.Profiler = H, _t.PureComponent = Le, _t.StrictMode = z, _t.Suspense = Z, _t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ne, _t.act = se, _t.cloneElement = function(O, W, We) {
    if (O == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + O + ".");
    var Ze = ge({}, O.props), ct = O.key, ot = O.ref, St = O._owner;
    if (W != null) {
      if (W.ref !== void 0 && (ot = W.ref, St = Be.current), W.key !== void 0 && (ct = "" + W.key), O.type && O.type.defaultProps) var dt = O.type.defaultProps;
      for (pt in W) $.call(W, pt) && !pe.hasOwnProperty(pt) && (Ze[pt] = W[pt] === void 0 && dt !== void 0 ? dt[pt] : W[pt]);
    }
    var pt = arguments.length - 2;
    if (pt === 1) Ze.children = We;
    else if (1 < pt) {
      dt = Array(pt);
      for (var Xt = 0; Xt < pt; Xt++) dt[Xt] = arguments[Xt + 2];
      Ze.children = dt;
    }
    return { $$typeof: y, type: O.type, key: ct, ref: ot, props: Ze, _owner: St };
  }, _t.createContext = function(O) {
    return O = { $$typeof: S, _currentValue: O, _currentValue2: O, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, O.Provider = { $$typeof: Y, _context: O }, O.Consumer = O;
  }, _t.createElement = nn, _t.createFactory = function(O) {
    var W = nn.bind(null, O);
    return W.type = O, W;
  }, _t.createRef = function() {
    return { current: null };
  }, _t.forwardRef = function(O) {
    return { $$typeof: he, render: O };
  }, _t.isValidElement = Ht, _t.lazy = function(O) {
    return { $$typeof: me, _payload: { _status: -1, _result: O }, _init: Tt };
  }, _t.memo = function(O, W) {
    return { $$typeof: G, type: O, compare: W === void 0 ? null : W };
  }, _t.startTransition = function(O) {
    var W = ie.transition;
    ie.transition = {};
    try {
      O();
    } finally {
      ie.transition = W;
    }
  }, _t.unstable_act = se, _t.useCallback = function(O, W) {
    return xe.current.useCallback(O, W);
  }, _t.useContext = function(O) {
    return xe.current.useContext(O);
  }, _t.useDebugValue = function() {
  }, _t.useDeferredValue = function(O) {
    return xe.current.useDeferredValue(O);
  }, _t.useEffect = function(O, W) {
    return xe.current.useEffect(O, W);
  }, _t.useId = function() {
    return xe.current.useId();
  }, _t.useImperativeHandle = function(O, W, We) {
    return xe.current.useImperativeHandle(O, W, We);
  }, _t.useInsertionEffect = function(O, W) {
    return xe.current.useInsertionEffect(O, W);
  }, _t.useLayoutEffect = function(O, W) {
    return xe.current.useLayoutEffect(O, W);
  }, _t.useMemo = function(O, W) {
    return xe.current.useMemo(O, W);
  }, _t.useReducer = function(O, W, We) {
    return xe.current.useReducer(O, W, We);
  }, _t.useRef = function(O) {
    return xe.current.useRef(O);
  }, _t.useState = function(O) {
    return xe.current.useState(O);
  }, _t.useSyncExternalStore = function(O, W, We) {
    return xe.current.useSyncExternalStore(O, W, We);
  }, _t.useTransition = function() {
    return xe.current.useTransition();
  }, _t.version = "18.3.1", _t;
}
var cv = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
cv.exports;
var UR;
function dD() {
  return UR || (UR = 1, function(y, E) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var R = "18.3.1", z = Symbol.for("react.element"), H = Symbol.for("react.portal"), Y = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), he = Symbol.for("react.profiler"), Z = Symbol.for("react.provider"), G = Symbol.for("react.context"), me = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ce = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), ge = Symbol.for("react.lazy"), Me = Symbol.for("react.offscreen"), $e = Symbol.iterator, tt = "@@iterator";
      function Le(h) {
        if (h === null || typeof h != "object")
          return null;
        var w = $e && h[$e] || h[tt];
        return typeof w == "function" ? w : null;
      }
      var Se = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ue = {
        transition: null
      }, $ = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Be = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, pe = {}, nn = null;
      function En(h) {
        nn = h;
      }
      pe.setExtraStackFrame = function(h) {
        nn = h;
      }, pe.getCurrentStack = null, pe.getStackAddendum = function() {
        var h = "";
        nn && (h += nn);
        var w = pe.getCurrentStack;
        return w && (h += w() || ""), h;
      };
      var Ht = !1, Ot = !1, mn = !1, Ye = !1, lt = !1, Lt = {
        ReactCurrentDispatcher: Se,
        ReactCurrentBatchConfig: Ue,
        ReactCurrentOwner: Be
      };
      Lt.ReactDebugCurrentFrame = pe, Lt.ReactCurrentActQueue = $;
      function Tt(h) {
        {
          for (var w = arguments.length, F = new Array(w > 1 ? w - 1 : 0), V = 1; V < w; V++)
            F[V - 1] = arguments[V];
          ie("warn", h, F);
        }
      }
      function xe(h) {
        {
          for (var w = arguments.length, F = new Array(w > 1 ? w - 1 : 0), V = 1; V < w; V++)
            F[V - 1] = arguments[V];
          ie("error", h, F);
        }
      }
      function ie(h, w, F) {
        {
          var V = Lt.ReactDebugCurrentFrame, le = V.getStackAddendum();
          le !== "" && (w += "%s", F = F.concat([le]));
          var Ke = F.map(function(ve) {
            return String(ve);
          });
          Ke.unshift("Warning: " + w), Function.prototype.apply.call(console[h], console, Ke);
        }
      }
      var Ne = {};
      function se(h, w) {
        {
          var F = h.constructor, V = F && (F.displayName || F.name) || "ReactClass", le = V + "." + w;
          if (Ne[le])
            return;
          xe("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", w, V), Ne[le] = !0;
        }
      }
      var O = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, w, F) {
          se(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, w, F, V) {
          se(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, w, F, V) {
          se(h, "setState");
        }
      }, W = Object.assign, We = {};
      Object.freeze(We);
      function Ze(h, w, F) {
        this.props = h, this.context = w, this.refs = We, this.updater = F || O;
      }
      Ze.prototype.isReactComponent = {}, Ze.prototype.setState = function(h, w) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, w, "setState");
      }, Ze.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var ct = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, ot = function(h, w) {
          Object.defineProperty(Ze.prototype, h, {
            get: function() {
              Tt("%s(...) is deprecated in plain JavaScript React classes. %s", w[0], w[1]);
            }
          });
        };
        for (var St in ct)
          ct.hasOwnProperty(St) && ot(St, ct[St]);
      }
      function dt() {
      }
      dt.prototype = Ze.prototype;
      function pt(h, w, F) {
        this.props = h, this.context = w, this.refs = We, this.updater = F || O;
      }
      var Xt = pt.prototype = new dt();
      Xt.constructor = pt, W(Xt, Ze.prototype), Xt.isPureReactComponent = !0;
      function Zn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var we = Array.isArray;
      function rn(h) {
        return we(h);
      }
      function Cn(h) {
        {
          var w = typeof Symbol == "function" && Symbol.toStringTag, F = w && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return F;
        }
      }
      function kn(h) {
        try {
          return Hn(h), !1;
        } catch {
          return !0;
        }
      }
      function Hn(h) {
        return "" + h;
      }
      function An(h) {
        if (kn(h))
          return xe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(h)), Hn(h);
      }
      function Gr(h, w, F) {
        var V = h.displayName;
        if (V)
          return V;
        var le = w.displayName || w.name || "";
        return le !== "" ? F + "(" + le + ")" : F;
      }
      function qr(h) {
        return h.displayName || "Context";
      }
      function Jn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && xe("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case Y:
            return "Fragment";
          case H:
            return "Portal";
          case he:
            return "Profiler";
          case S:
            return "StrictMode";
          case K:
            return "Suspense";
          case ce:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case G:
              var w = h;
              return qr(w) + ".Consumer";
            case Z:
              var F = h;
              return qr(F._context) + ".Provider";
            case me:
              return Gr(h, h.render, "ForwardRef");
            case ae:
              var V = h.displayName || null;
              return V !== null ? V : Jn(h.type) || "Memo";
            case ge: {
              var le = h, Ke = le._payload, ve = le._init;
              try {
                return Jn(ve(Ke));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Cr = Object.prototype.hasOwnProperty, Kr = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Rr, Sa, sr;
      sr = {};
      function Xr(h) {
        if (Cr.call(h, "ref")) {
          var w = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (w && w.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function Rn(h) {
        if (Cr.call(h, "key")) {
          var w = Object.getOwnPropertyDescriptor(h, "key").get;
          if (w && w.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Or(h, w) {
        var F = function() {
          Rr || (Rr = !0, xe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        F.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: F,
          configurable: !0
        });
      }
      function Ei(h, w) {
        var F = function() {
          Sa || (Sa = !0, xe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        F.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: F,
          configurable: !0
        });
      }
      function Ea(h) {
        if (typeof h.ref == "string" && Be.current && h.__self && Be.current.stateNode !== h.__self) {
          var w = Jn(Be.current.type);
          sr[w] || (xe('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', w, h.ref), sr[w] = !0);
        }
      }
      var oe = function(h, w, F, V, le, Ke, ve) {
        var Ge = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: z,
          // Built-in properties that belong on the element
          type: h,
          key: w,
          ref: F,
          props: ve,
          // Record the component responsible for creating this element.
          _owner: Ke
        };
        return Ge._store = {}, Object.defineProperty(Ge._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Ge, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: V
        }), Object.defineProperty(Ge, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: le
        }), Object.freeze && (Object.freeze(Ge.props), Object.freeze(Ge)), Ge;
      };
      function He(h, w, F) {
        var V, le = {}, Ke = null, ve = null, Ge = null, yt = null;
        if (w != null) {
          Xr(w) && (ve = w.ref, Ea(w)), Rn(w) && (An(w.key), Ke = "" + w.key), Ge = w.__self === void 0 ? null : w.__self, yt = w.__source === void 0 ? null : w.__source;
          for (V in w)
            Cr.call(w, V) && !Kr.hasOwnProperty(V) && (le[V] = w[V]);
        }
        var Mt = arguments.length - 2;
        if (Mt === 1)
          le.children = F;
        else if (Mt > 1) {
          for (var ln = Array(Mt), Gt = 0; Gt < Mt; Gt++)
            ln[Gt] = arguments[Gt + 2];
          Object.freeze && Object.freeze(ln), le.children = ln;
        }
        if (h && h.defaultProps) {
          var un = h.defaultProps;
          for (V in un)
            le[V] === void 0 && (le[V] = un[V]);
        }
        if (Ke || ve) {
          var sn = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Ke && Or(le, sn), ve && Ei(le, sn);
        }
        return oe(h, Ke, ve, Ge, yt, Be.current, le);
      }
      function vt(h, w) {
        var F = oe(h.type, w, h.ref, h._self, h._source, h._owner, h.props);
        return F;
      }
      function jt(h, w, F) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var V, le = W({}, h.props), Ke = h.key, ve = h.ref, Ge = h._self, yt = h._source, Mt = h._owner;
        if (w != null) {
          Xr(w) && (ve = w.ref, Mt = Be.current), Rn(w) && (An(w.key), Ke = "" + w.key);
          var ln;
          h.type && h.type.defaultProps && (ln = h.type.defaultProps);
          for (V in w)
            Cr.call(w, V) && !Kr.hasOwnProperty(V) && (w[V] === void 0 && ln !== void 0 ? le[V] = ln[V] : le[V] = w[V]);
        }
        var Gt = arguments.length - 2;
        if (Gt === 1)
          le.children = F;
        else if (Gt > 1) {
          for (var un = Array(Gt), sn = 0; sn < Gt; sn++)
            un[sn] = arguments[sn + 2];
          le.children = un;
        }
        return oe(h.type, Ke, ve, Ge, yt, Mt, le);
      }
      function Vt(h) {
        return typeof h == "object" && h !== null && h.$$typeof === z;
      }
      var zn = ".", Tn = ":";
      function Tr(h) {
        var w = /[=:]/g, F = {
          "=": "=0",
          ":": "=2"
        }, V = h.replace(w, function(le) {
          return F[le];
        });
        return "$" + V;
      }
      var Qt = !1, Mr = /\/+/g;
      function $t(h) {
        return h.replace(Mr, "$&/");
      }
      function Bt(h, w) {
        return typeof h == "object" && h !== null && h.key != null ? (An(h.key), Tr("" + h.key)) : w.toString(36);
      }
      function ui(h, w, F, V, le) {
        var Ke = typeof h;
        (Ke === "undefined" || Ke === "boolean") && (h = null);
        var ve = !1;
        if (h === null)
          ve = !0;
        else
          switch (Ke) {
            case "string":
            case "number":
              ve = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case z:
                case H:
                  ve = !0;
              }
          }
        if (ve) {
          var Ge = h, yt = le(Ge), Mt = V === "" ? zn + Bt(Ge, 0) : V;
          if (rn(yt)) {
            var ln = "";
            Mt != null && (ln = $t(Mt) + "/"), ui(yt, w, ln, "", function(ld) {
              return ld;
            });
          } else yt != null && (Vt(yt) && (yt.key && (!Ge || Ge.key !== yt.key) && An(yt.key), yt = vt(
            yt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            F + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (yt.key && (!Ge || Ge.key !== yt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              $t("" + yt.key) + "/"
            ) : "") + Mt
          )), w.push(yt));
          return 1;
        }
        var Gt, un, sn = 0, xt = V === "" ? zn : V + Tn;
        if (rn(h))
          for (var Yi = 0; Yi < h.length; Yi++)
            Gt = h[Yi], un = xt + Bt(Gt, Yi), sn += ui(Gt, w, F, un, le);
        else {
          var to = Le(h);
          if (typeof to == "function") {
            var us = h;
            to === us.entries && (Qt || Tt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Qt = !0);
            for (var id = to.call(us), fi, os = 0; !(fi = id.next()).done; )
              Gt = fi.value, un = xt + Bt(Gt, os++), sn += ui(Gt, w, F, un, le);
          } else if (Ke === "object") {
            var ss = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (ss === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : ss) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return sn;
      }
      function za(h, w, F) {
        if (h == null)
          return h;
        var V = [], le = 0;
        return ui(h, V, "", "", function(Ke) {
          return w.call(F, Ke, le++);
        }), V;
      }
      function yl(h) {
        var w = 0;
        return za(h, function() {
          w++;
        }), w;
      }
      function au(h, w, F) {
        za(h, function() {
          w.apply(this, arguments);
        }, F);
      }
      function Iu(h) {
        return za(h, function(w) {
          return w;
        }) || [];
      }
      function Vi(h) {
        if (!Vt(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function gl(h) {
        var w = {
          $$typeof: G,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        w.Provider = {
          $$typeof: Z,
          _context: w
        };
        var F = !1, V = !1, le = !1;
        {
          var Ke = {
            $$typeof: G,
            _context: w
          };
          Object.defineProperties(Ke, {
            Provider: {
              get: function() {
                return V || (V = !0, xe("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), w.Provider;
              },
              set: function(ve) {
                w.Provider = ve;
              }
            },
            _currentValue: {
              get: function() {
                return w._currentValue;
              },
              set: function(ve) {
                w._currentValue = ve;
              }
            },
            _currentValue2: {
              get: function() {
                return w._currentValue2;
              },
              set: function(ve) {
                w._currentValue2 = ve;
              }
            },
            _threadCount: {
              get: function() {
                return w._threadCount;
              },
              set: function(ve) {
                w._threadCount = ve;
              }
            },
            Consumer: {
              get: function() {
                return F || (F = !0, xe("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), w.Consumer;
              }
            },
            displayName: {
              get: function() {
                return w.displayName;
              },
              set: function(ve) {
                le || (Tt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ve), le = !0);
              }
            }
          }), w.Consumer = Ke;
        }
        return w._currentRenderer = null, w._currentRenderer2 = null, w;
      }
      var Ca = -1, Ci = 0, Ra = 1, oi = 2;
      function Lr(h) {
        if (h._status === Ca) {
          var w = h._result, F = w();
          if (F.then(function(Ke) {
            if (h._status === Ci || h._status === Ca) {
              var ve = h;
              ve._status = Ra, ve._result = Ke;
            }
          }, function(Ke) {
            if (h._status === Ci || h._status === Ca) {
              var ve = h;
              ve._status = oi, ve._result = Ke;
            }
          }), h._status === Ca) {
            var V = h;
            V._status = Ci, V._result = F;
          }
        }
        if (h._status === Ra) {
          var le = h._result;
          return le === void 0 && xe(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, le), "default" in le || xe(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, le), le.default;
        } else
          throw h._result;
      }
      function Ta(h) {
        var w = {
          // We use these fields to store the result.
          _status: Ca,
          _result: h
        }, F = {
          $$typeof: ge,
          _payload: w,
          _init: Lr
        };
        {
          var V, le;
          Object.defineProperties(F, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return V;
              },
              set: function(Ke) {
                xe("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), V = Ke, Object.defineProperty(F, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return le;
              },
              set: function(Ke) {
                xe("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), le = Ke, Object.defineProperty(F, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return F;
      }
      function Ri(h) {
        h != null && h.$$typeof === ae ? xe("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? xe("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && xe("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && xe("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var w = {
          $$typeof: me,
          render: h
        };
        {
          var F;
          Object.defineProperty(w, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(V) {
              F = V, !h.name && !h.displayName && (h.displayName = V);
            }
          });
        }
        return w;
      }
      var Ti;
      Ti = Symbol.for("react.module.reference");
      function b(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === Y || h === he || lt || h === S || h === K || h === ce || Ye || h === Me || Ht || Ot || mn || typeof h == "object" && h !== null && (h.$$typeof === ge || h.$$typeof === ae || h.$$typeof === Z || h.$$typeof === G || h.$$typeof === me || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === Ti || h.getModuleId !== void 0));
      }
      function J(h, w) {
        b(h) || xe("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var F = {
          $$typeof: ae,
          type: h,
          compare: w === void 0 ? null : w
        };
        {
          var V;
          Object.defineProperty(F, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return V;
            },
            set: function(le) {
              V = le, !h.name && !h.displayName && (h.displayName = le);
            }
          });
        }
        return F;
      }
      function re() {
        var h = Se.current;
        return h === null && xe(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function Fe(h) {
        var w = re();
        if (h._context !== void 0) {
          var F = h._context;
          F.Consumer === h ? xe("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : F.Provider === h && xe("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return w.useContext(h);
      }
      function Et(h) {
        var w = re();
        return w.useState(h);
      }
      function wt(h, w, F) {
        var V = re();
        return V.useReducer(h, w, F);
      }
      function qe(h) {
        var w = re();
        return w.useRef(h);
      }
      function ht(h, w) {
        var F = re();
        return F.useEffect(h, w);
      }
      function Vn(h, w) {
        var F = re();
        return F.useInsertionEffect(h, w);
      }
      function an(h, w) {
        var F = re();
        return F.useLayoutEffect(h, w);
      }
      function fn(h, w) {
        var F = re();
        return F.useCallback(h, w);
      }
      function wr(h, w) {
        var F = re();
        return F.useMemo(h, w);
      }
      function wi(h, w, F) {
        var V = re();
        return V.useImperativeHandle(h, w, F);
      }
      function Nt(h, w) {
        {
          var F = re();
          return F.useDebugValue(h, w);
        }
      }
      function er() {
        var h = re();
        return h.useTransition();
      }
      function Nr(h) {
        var w = re();
        return w.useDeferredValue(h);
      }
      function mt() {
        var h = re();
        return h.useId();
      }
      function Ua(h, w, F) {
        var V = re();
        return V.useSyncExternalStore(h, w, F);
      }
      var Sl = 0, Yu, El, Zr, rs, Ar, as, is;
      function cc() {
      }
      cc.__reactDisabledLog = !0;
      function Wu() {
        {
          if (Sl === 0) {
            Yu = console.log, El = console.info, Zr = console.warn, rs = console.error, Ar = console.group, as = console.groupCollapsed, is = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: cc,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          Sl++;
        }
      }
      function Cl() {
        {
          if (Sl--, Sl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: W({}, h, {
                value: Yu
              }),
              info: W({}, h, {
                value: El
              }),
              warn: W({}, h, {
                value: Zr
              }),
              error: W({}, h, {
                value: rs
              }),
              group: W({}, h, {
                value: Ar
              }),
              groupCollapsed: W({}, h, {
                value: as
              }),
              groupEnd: W({}, h, {
                value: is
              })
            });
          }
          Sl < 0 && xe("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var si = Lt.ReactCurrentDispatcher, zr;
      function Rl(h, w, F) {
        {
          if (zr === void 0)
            try {
              throw Error();
            } catch (le) {
              var V = le.stack.trim().match(/\n( *(at )?)/);
              zr = V && V[1] || "";
            }
          return `
` + zr + h;
        }
      }
      var Tl = !1, wl;
      {
        var Qu = typeof WeakMap == "function" ? WeakMap : Map;
        wl = new Qu();
      }
      function Gu(h, w) {
        if (!h || Tl)
          return "";
        {
          var F = wl.get(h);
          if (F !== void 0)
            return F;
        }
        var V;
        Tl = !0;
        var le = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Ke;
        Ke = si.current, si.current = null, Wu();
        try {
          if (w) {
            var ve = function() {
              throw Error();
            };
            if (Object.defineProperty(ve.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(ve, []);
              } catch (xt) {
                V = xt;
              }
              Reflect.construct(h, [], ve);
            } else {
              try {
                ve.call();
              } catch (xt) {
                V = xt;
              }
              h.call(ve.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (xt) {
              V = xt;
            }
            h();
          }
        } catch (xt) {
          if (xt && V && typeof xt.stack == "string") {
            for (var Ge = xt.stack.split(`
`), yt = V.stack.split(`
`), Mt = Ge.length - 1, ln = yt.length - 1; Mt >= 1 && ln >= 0 && Ge[Mt] !== yt[ln]; )
              ln--;
            for (; Mt >= 1 && ln >= 0; Mt--, ln--)
              if (Ge[Mt] !== yt[ln]) {
                if (Mt !== 1 || ln !== 1)
                  do
                    if (Mt--, ln--, ln < 0 || Ge[Mt] !== yt[ln]) {
                      var Gt = `
` + Ge[Mt].replace(" at new ", " at ");
                      return h.displayName && Gt.includes("<anonymous>") && (Gt = Gt.replace("<anonymous>", h.displayName)), typeof h == "function" && wl.set(h, Gt), Gt;
                    }
                  while (Mt >= 1 && ln >= 0);
                break;
              }
          }
        } finally {
          Tl = !1, si.current = Ke, Cl(), Error.prepareStackTrace = le;
        }
        var un = h ? h.displayName || h.name : "", sn = un ? Rl(un) : "";
        return typeof h == "function" && wl.set(h, sn), sn;
      }
      function $i(h, w, F) {
        return Gu(h, !1);
      }
      function ad(h) {
        var w = h.prototype;
        return !!(w && w.isReactComponent);
      }
      function bi(h, w, F) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return Gu(h, ad(h));
        if (typeof h == "string")
          return Rl(h);
        switch (h) {
          case K:
            return Rl("Suspense");
          case ce:
            return Rl("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case me:
              return $i(h.render);
            case ae:
              return bi(h.type, w, F);
            case ge: {
              var V = h, le = V._payload, Ke = V._init;
              try {
                return bi(Ke(le), w, F);
              } catch {
              }
            }
          }
        return "";
      }
      var At = {}, qu = Lt.ReactDebugCurrentFrame;
      function iu(h) {
        if (h) {
          var w = h._owner, F = bi(h.type, h._source, w ? w.type : null);
          qu.setExtraStackFrame(F);
        } else
          qu.setExtraStackFrame(null);
      }
      function Ku(h, w, F, V, le) {
        {
          var Ke = Function.call.bind(Cr);
          for (var ve in h)
            if (Ke(h, ve)) {
              var Ge = void 0;
              try {
                if (typeof h[ve] != "function") {
                  var yt = Error((V || "React class") + ": " + F + " type `" + ve + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[ve] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw yt.name = "Invariant Violation", yt;
                }
                Ge = h[ve](w, ve, V, F, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Mt) {
                Ge = Mt;
              }
              Ge && !(Ge instanceof Error) && (iu(le), xe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", V || "React class", F, ve, typeof Ge), iu(null)), Ge instanceof Error && !(Ge.message in At) && (At[Ge.message] = !0, iu(le), xe("Failed %s type: %s", F, Ge.message), iu(null));
            }
        }
      }
      function bt(h) {
        if (h) {
          var w = h._owner, F = bi(h.type, h._source, w ? w.type : null);
          En(F);
        } else
          En(null);
      }
      var Xu;
      Xu = !1;
      function Zu() {
        if (Be.current) {
          var h = Jn(Be.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function at(h) {
        if (h !== void 0) {
          var w = h.fileName.replace(/^.*[\\\/]/, ""), F = h.lineNumber;
          return `

Check your code at ` + w + ":" + F + ".";
        }
        return "";
      }
      function lu(h) {
        return h != null ? at(h.__source) : "";
      }
      var wn = {};
      function Jr(h) {
        var w = Zu();
        if (!w) {
          var F = typeof h == "string" ? h : h.displayName || h.name;
          F && (w = `

Check the top-level render call using <` + F + ">.");
        }
        return w;
      }
      function Ur(h, w) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var F = Jr(w);
          if (!wn[F]) {
            wn[F] = !0;
            var V = "";
            h && h._owner && h._owner !== Be.current && (V = " It was passed a child from " + Jn(h._owner.type) + "."), bt(h), xe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', F, V), bt(null);
          }
        }
      }
      function bl(h, w) {
        if (typeof h == "object") {
          if (rn(h))
            for (var F = 0; F < h.length; F++) {
              var V = h[F];
              Vt(V) && Ur(V, w);
            }
          else if (Vt(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var le = Le(h);
            if (typeof le == "function" && le !== h.entries)
              for (var Ke = le.call(h), ve; !(ve = Ke.next()).done; )
                Vt(ve.value) && Ur(ve.value, w);
          }
        }
      }
      function Dn(h) {
        {
          var w = h.type;
          if (w == null || typeof w == "string")
            return;
          var F;
          if (typeof w == "function")
            F = w.propTypes;
          else if (typeof w == "object" && (w.$$typeof === me || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          w.$$typeof === ae))
            F = w.propTypes;
          else
            return;
          if (F) {
            var V = Jn(w);
            Ku(F, h.props, "prop", V, h);
          } else if (w.PropTypes !== void 0 && !Xu) {
            Xu = !0;
            var le = Jn(w);
            xe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", le || "Unknown");
          }
          typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && xe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function It(h) {
        {
          for (var w = Object.keys(h.props), F = 0; F < w.length; F++) {
            var V = w[F];
            if (V !== "children" && V !== "key") {
              bt(h), xe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", V), bt(null);
              break;
            }
          }
          h.ref !== null && (bt(h), xe("Invalid attribute `ref` supplied to `React.Fragment`."), bt(null));
        }
      }
      function fc(h, w, F) {
        var V = b(h);
        if (!V) {
          var le = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (le += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ke = lu(w);
          Ke ? le += Ke : le += Zu();
          var ve;
          h === null ? ve = "null" : rn(h) ? ve = "array" : h !== void 0 && h.$$typeof === z ? (ve = "<" + (Jn(h.type) || "Unknown") + " />", le = " Did you accidentally export a JSX literal instead of a component?") : ve = typeof h, xe("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ve, le);
        }
        var Ge = He.apply(this, arguments);
        if (Ge == null)
          return Ge;
        if (V)
          for (var yt = 2; yt < arguments.length; yt++)
            bl(arguments[yt], h);
        return h === Y ? It(Ge) : Dn(Ge), Ge;
      }
      var ea = !1;
      function tr(h) {
        var w = fc.bind(null, h);
        return w.type = h, ea || (ea = !0, Tt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(w, "type", {
          enumerable: !1,
          get: function() {
            return Tt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), w;
      }
      function xi(h, w, F) {
        for (var V = jt.apply(this, arguments), le = 2; le < arguments.length; le++)
          bl(arguments[le], V.type);
        return Dn(V), V;
      }
      function dc(h, w) {
        var F = Ue.transition;
        Ue.transition = {};
        var V = Ue.transition;
        Ue.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (Ue.transition = F, F === null && V._updatedFibers) {
            var le = V._updatedFibers.size;
            le > 10 && Tt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), V._updatedFibers.clear();
          }
        }
      }
      var Bi = !1, xl = null;
      function pc(h) {
        if (xl === null)
          try {
            var w = ("require" + Math.random()).slice(0, 7), F = y && y[w];
            xl = F.call(y, "timers").setImmediate;
          } catch {
            xl = function(le) {
              Bi === !1 && (Bi = !0, typeof MessageChannel > "u" && xe("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Ke = new MessageChannel();
              Ke.port1.onmessage = le, Ke.port2.postMessage(void 0);
            };
          }
        return xl(h);
      }
      var Fa = 0, _l = !1;
      function Ii(h) {
        {
          var w = Fa;
          Fa++, $.current === null && ($.current = []);
          var F = $.isBatchingLegacy, V;
          try {
            if ($.isBatchingLegacy = !0, V = h(), !F && $.didScheduleLegacyUpdate) {
              var le = $.current;
              le !== null && ($.didScheduleLegacyUpdate = !1, Dl(le));
            }
          } catch (un) {
            throw ja(w), un;
          } finally {
            $.isBatchingLegacy = F;
          }
          if (V !== null && typeof V == "object" && typeof V.then == "function") {
            var Ke = V, ve = !1, Ge = {
              then: function(un, sn) {
                ve = !0, Ke.then(function(xt) {
                  ja(w), Fa === 0 ? Ju(xt, un, sn) : un(xt);
                }, function(xt) {
                  ja(w), sn(xt);
                });
              }
            };
            return !_l && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              ve || (_l = !0, xe("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ge;
          } else {
            var yt = V;
            if (ja(w), Fa === 0) {
              var Mt = $.current;
              Mt !== null && (Dl(Mt), $.current = null);
              var ln = {
                then: function(un, sn) {
                  $.current === null ? ($.current = [], Ju(yt, un, sn)) : un(yt);
                }
              };
              return ln;
            } else {
              var Gt = {
                then: function(un, sn) {
                  un(yt);
                }
              };
              return Gt;
            }
          }
        }
      }
      function ja(h) {
        h !== Fa - 1 && xe("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Fa = h;
      }
      function Ju(h, w, F) {
        {
          var V = $.current;
          if (V !== null)
            try {
              Dl(V), pc(function() {
                V.length === 0 ? ($.current = null, w(h)) : Ju(h, w, F);
              });
            } catch (le) {
              F(le);
            }
          else
            w(h);
        }
      }
      var kl = !1;
      function Dl(h) {
        if (!kl) {
          kl = !0;
          var w = 0;
          try {
            for (; w < h.length; w++) {
              var F = h[w];
              do
                F = F(!0);
              while (F !== null);
            }
            h.length = 0;
          } catch (V) {
            throw h = h.slice(w + 1), V;
          } finally {
            kl = !1;
          }
        }
      }
      var uu = fc, eo = xi, ls = tr, ci = {
        map: za,
        forEach: au,
        count: yl,
        toArray: Iu,
        only: Vi
      };
      E.Children = ci, E.Component = Ze, E.Fragment = Y, E.Profiler = he, E.PureComponent = pt, E.StrictMode = S, E.Suspense = K, E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lt, E.act = Ii, E.cloneElement = eo, E.createContext = gl, E.createElement = uu, E.createFactory = ls, E.createRef = Zn, E.forwardRef = Ri, E.isValidElement = Vt, E.lazy = Ta, E.memo = J, E.startTransition = dc, E.unstable_act = Ii, E.useCallback = fn, E.useContext = Fe, E.useDebugValue = Nt, E.useDeferredValue = Nr, E.useEffect = ht, E.useId = mt, E.useImperativeHandle = wi, E.useInsertionEffect = Vn, E.useLayoutEffect = an, E.useMemo = wr, E.useReducer = wt, E.useRef = qe, E.useState = Et, E.useSyncExternalStore = Ua, E.useTransition = er, E.version = R, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(cv, cv.exports)), cv.exports;
}
process.env.NODE_ENV === "production" ? B0.exports = fD() : B0.exports = dD();
var ga = B0.exports;
const pD = /* @__PURE__ */ oD(ga), FR = /* @__PURE__ */ cD({
  __proto__: null,
  default: pD
}, [ga]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jR;
function vD() {
  if (jR) return uv;
  jR = 1;
  var y = ga, E = Symbol.for("react.element"), R = Symbol.for("react.fragment"), z = Object.prototype.hasOwnProperty, H = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(he, Z, G) {
    var me, K = {}, ce = null, ae = null;
    G !== void 0 && (ce = "" + G), Z.key !== void 0 && (ce = "" + Z.key), Z.ref !== void 0 && (ae = Z.ref);
    for (me in Z) z.call(Z, me) && !Y.hasOwnProperty(me) && (K[me] = Z[me]);
    if (he && he.defaultProps) for (me in Z = he.defaultProps, Z) K[me] === void 0 && (K[me] = Z[me]);
    return { $$typeof: E, type: he, key: ce, ref: ae, props: K, _owner: H.current };
  }
  return uv.Fragment = R, uv.jsx = S, uv.jsxs = S, uv;
}
var ov = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var PR;
function hD() {
  return PR || (PR = 1, process.env.NODE_ENV !== "production" && function() {
    var y = ga, E = Symbol.for("react.element"), R = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), H = Symbol.for("react.strict_mode"), Y = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), he = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), G = Symbol.for("react.suspense"), me = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), ce = Symbol.for("react.lazy"), ae = Symbol.for("react.offscreen"), ge = Symbol.iterator, Me = "@@iterator";
    function $e(b) {
      if (b === null || typeof b != "object")
        return null;
      var J = ge && b[ge] || b[Me];
      return typeof J == "function" ? J : null;
    }
    var tt = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Le(b) {
      {
        for (var J = arguments.length, re = new Array(J > 1 ? J - 1 : 0), Fe = 1; Fe < J; Fe++)
          re[Fe - 1] = arguments[Fe];
        Se("error", b, re);
      }
    }
    function Se(b, J, re) {
      {
        var Fe = tt.ReactDebugCurrentFrame, Et = Fe.getStackAddendum();
        Et !== "" && (J += "%s", re = re.concat([Et]));
        var wt = re.map(function(qe) {
          return String(qe);
        });
        wt.unshift("Warning: " + J), Function.prototype.apply.call(console[b], console, wt);
      }
    }
    var Ue = !1, $ = !1, Be = !1, pe = !1, nn = !1, En;
    En = Symbol.for("react.module.reference");
    function Ht(b) {
      return !!(typeof b == "string" || typeof b == "function" || b === z || b === Y || nn || b === H || b === G || b === me || pe || b === ae || Ue || $ || Be || typeof b == "object" && b !== null && (b.$$typeof === ce || b.$$typeof === K || b.$$typeof === S || b.$$typeof === he || b.$$typeof === Z || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      b.$$typeof === En || b.getModuleId !== void 0));
    }
    function Ot(b, J, re) {
      var Fe = b.displayName;
      if (Fe)
        return Fe;
      var Et = J.displayName || J.name || "";
      return Et !== "" ? re + "(" + Et + ")" : re;
    }
    function mn(b) {
      return b.displayName || "Context";
    }
    function Ye(b) {
      if (b == null)
        return null;
      if (typeof b.tag == "number" && Le("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
        return b.displayName || b.name || null;
      if (typeof b == "string")
        return b;
      switch (b) {
        case z:
          return "Fragment";
        case R:
          return "Portal";
        case Y:
          return "Profiler";
        case H:
          return "StrictMode";
        case G:
          return "Suspense";
        case me:
          return "SuspenseList";
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case he:
            var J = b;
            return mn(J) + ".Consumer";
          case S:
            var re = b;
            return mn(re._context) + ".Provider";
          case Z:
            return Ot(b, b.render, "ForwardRef");
          case K:
            var Fe = b.displayName || null;
            return Fe !== null ? Fe : Ye(b.type) || "Memo";
          case ce: {
            var Et = b, wt = Et._payload, qe = Et._init;
            try {
              return Ye(qe(wt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var lt = Object.assign, Lt = 0, Tt, xe, ie, Ne, se, O, W;
    function We() {
    }
    We.__reactDisabledLog = !0;
    function Ze() {
      {
        if (Lt === 0) {
          Tt = console.log, xe = console.info, ie = console.warn, Ne = console.error, se = console.group, O = console.groupCollapsed, W = console.groupEnd;
          var b = {
            configurable: !0,
            enumerable: !0,
            value: We,
            writable: !0
          };
          Object.defineProperties(console, {
            info: b,
            log: b,
            warn: b,
            error: b,
            group: b,
            groupCollapsed: b,
            groupEnd: b
          });
        }
        Lt++;
      }
    }
    function ct() {
      {
        if (Lt--, Lt === 0) {
          var b = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: lt({}, b, {
              value: Tt
            }),
            info: lt({}, b, {
              value: xe
            }),
            warn: lt({}, b, {
              value: ie
            }),
            error: lt({}, b, {
              value: Ne
            }),
            group: lt({}, b, {
              value: se
            }),
            groupCollapsed: lt({}, b, {
              value: O
            }),
            groupEnd: lt({}, b, {
              value: W
            })
          });
        }
        Lt < 0 && Le("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ot = tt.ReactCurrentDispatcher, St;
    function dt(b, J, re) {
      {
        if (St === void 0)
          try {
            throw Error();
          } catch (Et) {
            var Fe = Et.stack.trim().match(/\n( *(at )?)/);
            St = Fe && Fe[1] || "";
          }
        return `
` + St + b;
      }
    }
    var pt = !1, Xt;
    {
      var Zn = typeof WeakMap == "function" ? WeakMap : Map;
      Xt = new Zn();
    }
    function we(b, J) {
      if (!b || pt)
        return "";
      {
        var re = Xt.get(b);
        if (re !== void 0)
          return re;
      }
      var Fe;
      pt = !0;
      var Et = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var wt;
      wt = ot.current, ot.current = null, Ze();
      try {
        if (J) {
          var qe = function() {
            throw Error();
          };
          if (Object.defineProperty(qe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(qe, []);
            } catch (er) {
              Fe = er;
            }
            Reflect.construct(b, [], qe);
          } else {
            try {
              qe.call();
            } catch (er) {
              Fe = er;
            }
            b.call(qe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (er) {
            Fe = er;
          }
          b();
        }
      } catch (er) {
        if (er && Fe && typeof er.stack == "string") {
          for (var ht = er.stack.split(`
`), Vn = Fe.stack.split(`
`), an = ht.length - 1, fn = Vn.length - 1; an >= 1 && fn >= 0 && ht[an] !== Vn[fn]; )
            fn--;
          for (; an >= 1 && fn >= 0; an--, fn--)
            if (ht[an] !== Vn[fn]) {
              if (an !== 1 || fn !== 1)
                do
                  if (an--, fn--, fn < 0 || ht[an] !== Vn[fn]) {
                    var wr = `
` + ht[an].replace(" at new ", " at ");
                    return b.displayName && wr.includes("<anonymous>") && (wr = wr.replace("<anonymous>", b.displayName)), typeof b == "function" && Xt.set(b, wr), wr;
                  }
                while (an >= 1 && fn >= 0);
              break;
            }
        }
      } finally {
        pt = !1, ot.current = wt, ct(), Error.prepareStackTrace = Et;
      }
      var wi = b ? b.displayName || b.name : "", Nt = wi ? dt(wi) : "";
      return typeof b == "function" && Xt.set(b, Nt), Nt;
    }
    function rn(b, J, re) {
      return we(b, !1);
    }
    function Cn(b) {
      var J = b.prototype;
      return !!(J && J.isReactComponent);
    }
    function kn(b, J, re) {
      if (b == null)
        return "";
      if (typeof b == "function")
        return we(b, Cn(b));
      if (typeof b == "string")
        return dt(b);
      switch (b) {
        case G:
          return dt("Suspense");
        case me:
          return dt("SuspenseList");
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case Z:
            return rn(b.render);
          case K:
            return kn(b.type, J, re);
          case ce: {
            var Fe = b, Et = Fe._payload, wt = Fe._init;
            try {
              return kn(wt(Et), J, re);
            } catch {
            }
          }
        }
      return "";
    }
    var Hn = Object.prototype.hasOwnProperty, An = {}, Gr = tt.ReactDebugCurrentFrame;
    function qr(b) {
      if (b) {
        var J = b._owner, re = kn(b.type, b._source, J ? J.type : null);
        Gr.setExtraStackFrame(re);
      } else
        Gr.setExtraStackFrame(null);
    }
    function Jn(b, J, re, Fe, Et) {
      {
        var wt = Function.call.bind(Hn);
        for (var qe in b)
          if (wt(b, qe)) {
            var ht = void 0;
            try {
              if (typeof b[qe] != "function") {
                var Vn = Error((Fe || "React class") + ": " + re + " type `" + qe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[qe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Vn.name = "Invariant Violation", Vn;
              }
              ht = b[qe](J, qe, Fe, re, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (an) {
              ht = an;
            }
            ht && !(ht instanceof Error) && (qr(Et), Le("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Fe || "React class", re, qe, typeof ht), qr(null)), ht instanceof Error && !(ht.message in An) && (An[ht.message] = !0, qr(Et), Le("Failed %s type: %s", re, ht.message), qr(null));
          }
      }
    }
    var Cr = Array.isArray;
    function Kr(b) {
      return Cr(b);
    }
    function Rr(b) {
      {
        var J = typeof Symbol == "function" && Symbol.toStringTag, re = J && b[Symbol.toStringTag] || b.constructor.name || "Object";
        return re;
      }
    }
    function Sa(b) {
      try {
        return sr(b), !1;
      } catch {
        return !0;
      }
    }
    function sr(b) {
      return "" + b;
    }
    function Xr(b) {
      if (Sa(b))
        return Le("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rr(b)), sr(b);
    }
    var Rn = tt.ReactCurrentOwner, Or = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ei, Ea, oe;
    oe = {};
    function He(b) {
      if (Hn.call(b, "ref")) {
        var J = Object.getOwnPropertyDescriptor(b, "ref").get;
        if (J && J.isReactWarning)
          return !1;
      }
      return b.ref !== void 0;
    }
    function vt(b) {
      if (Hn.call(b, "key")) {
        var J = Object.getOwnPropertyDescriptor(b, "key").get;
        if (J && J.isReactWarning)
          return !1;
      }
      return b.key !== void 0;
    }
    function jt(b, J) {
      if (typeof b.ref == "string" && Rn.current && J && Rn.current.stateNode !== J) {
        var re = Ye(Rn.current.type);
        oe[re] || (Le('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Ye(Rn.current.type), b.ref), oe[re] = !0);
      }
    }
    function Vt(b, J) {
      {
        var re = function() {
          Ei || (Ei = !0, Le("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", J));
        };
        re.isReactWarning = !0, Object.defineProperty(b, "key", {
          get: re,
          configurable: !0
        });
      }
    }
    function zn(b, J) {
      {
        var re = function() {
          Ea || (Ea = !0, Le("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", J));
        };
        re.isReactWarning = !0, Object.defineProperty(b, "ref", {
          get: re,
          configurable: !0
        });
      }
    }
    var Tn = function(b, J, re, Fe, Et, wt, qe) {
      var ht = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: E,
        // Built-in properties that belong on the element
        type: b,
        key: J,
        ref: re,
        props: qe,
        // Record the component responsible for creating this element.
        _owner: wt
      };
      return ht._store = {}, Object.defineProperty(ht._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ht, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Fe
      }), Object.defineProperty(ht, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Et
      }), Object.freeze && (Object.freeze(ht.props), Object.freeze(ht)), ht;
    };
    function Tr(b, J, re, Fe, Et) {
      {
        var wt, qe = {}, ht = null, Vn = null;
        re !== void 0 && (Xr(re), ht = "" + re), vt(J) && (Xr(J.key), ht = "" + J.key), He(J) && (Vn = J.ref, jt(J, Et));
        for (wt in J)
          Hn.call(J, wt) && !Or.hasOwnProperty(wt) && (qe[wt] = J[wt]);
        if (b && b.defaultProps) {
          var an = b.defaultProps;
          for (wt in an)
            qe[wt] === void 0 && (qe[wt] = an[wt]);
        }
        if (ht || Vn) {
          var fn = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
          ht && Vt(qe, fn), Vn && zn(qe, fn);
        }
        return Tn(b, ht, Vn, Et, Fe, Rn.current, qe);
      }
    }
    var Qt = tt.ReactCurrentOwner, Mr = tt.ReactDebugCurrentFrame;
    function $t(b) {
      if (b) {
        var J = b._owner, re = kn(b.type, b._source, J ? J.type : null);
        Mr.setExtraStackFrame(re);
      } else
        Mr.setExtraStackFrame(null);
    }
    var Bt;
    Bt = !1;
    function ui(b) {
      return typeof b == "object" && b !== null && b.$$typeof === E;
    }
    function za() {
      {
        if (Qt.current) {
          var b = Ye(Qt.current.type);
          if (b)
            return `

Check the render method of \`` + b + "`.";
        }
        return "";
      }
    }
    function yl(b) {
      return "";
    }
    var au = {};
    function Iu(b) {
      {
        var J = za();
        if (!J) {
          var re = typeof b == "string" ? b : b.displayName || b.name;
          re && (J = `

Check the top-level render call using <` + re + ">.");
        }
        return J;
      }
    }
    function Vi(b, J) {
      {
        if (!b._store || b._store.validated || b.key != null)
          return;
        b._store.validated = !0;
        var re = Iu(J);
        if (au[re])
          return;
        au[re] = !0;
        var Fe = "";
        b && b._owner && b._owner !== Qt.current && (Fe = " It was passed a child from " + Ye(b._owner.type) + "."), $t(b), Le('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', re, Fe), $t(null);
      }
    }
    function gl(b, J) {
      {
        if (typeof b != "object")
          return;
        if (Kr(b))
          for (var re = 0; re < b.length; re++) {
            var Fe = b[re];
            ui(Fe) && Vi(Fe, J);
          }
        else if (ui(b))
          b._store && (b._store.validated = !0);
        else if (b) {
          var Et = $e(b);
          if (typeof Et == "function" && Et !== b.entries)
            for (var wt = Et.call(b), qe; !(qe = wt.next()).done; )
              ui(qe.value) && Vi(qe.value, J);
        }
      }
    }
    function Ca(b) {
      {
        var J = b.type;
        if (J == null || typeof J == "string")
          return;
        var re;
        if (typeof J == "function")
          re = J.propTypes;
        else if (typeof J == "object" && (J.$$typeof === Z || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        J.$$typeof === K))
          re = J.propTypes;
        else
          return;
        if (re) {
          var Fe = Ye(J);
          Jn(re, b.props, "prop", Fe, b);
        } else if (J.PropTypes !== void 0 && !Bt) {
          Bt = !0;
          var Et = Ye(J);
          Le("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Et || "Unknown");
        }
        typeof J.getDefaultProps == "function" && !J.getDefaultProps.isReactClassApproved && Le("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ci(b) {
      {
        for (var J = Object.keys(b.props), re = 0; re < J.length; re++) {
          var Fe = J[re];
          if (Fe !== "children" && Fe !== "key") {
            $t(b), Le("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Fe), $t(null);
            break;
          }
        }
        b.ref !== null && ($t(b), Le("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var Ra = {};
    function oi(b, J, re, Fe, Et, wt) {
      {
        var qe = Ht(b);
        if (!qe) {
          var ht = "";
          (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (ht += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Vn = yl();
          Vn ? ht += Vn : ht += za();
          var an;
          b === null ? an = "null" : Kr(b) ? an = "array" : b !== void 0 && b.$$typeof === E ? (an = "<" + (Ye(b.type) || "Unknown") + " />", ht = " Did you accidentally export a JSX literal instead of a component?") : an = typeof b, Le("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", an, ht);
        }
        var fn = Tr(b, J, re, Et, wt);
        if (fn == null)
          return fn;
        if (qe) {
          var wr = J.children;
          if (wr !== void 0)
            if (Fe)
              if (Kr(wr)) {
                for (var wi = 0; wi < wr.length; wi++)
                  gl(wr[wi], b);
                Object.freeze && Object.freeze(wr);
              } else
                Le("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              gl(wr, b);
        }
        if (Hn.call(J, "key")) {
          var Nt = Ye(b), er = Object.keys(J).filter(function(Ua) {
            return Ua !== "key";
          }), Nr = er.length > 0 ? "{key: someKey, " + er.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ra[Nt + Nr]) {
            var mt = er.length > 0 ? "{" + er.join(": ..., ") + ": ...}" : "{}";
            Le(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Nr, Nt, mt, Nt), Ra[Nt + Nr] = !0;
          }
        }
        return b === z ? Ci(fn) : Ca(fn), fn;
      }
    }
    function Lr(b, J, re) {
      return oi(b, J, re, !0);
    }
    function Ta(b, J, re) {
      return oi(b, J, re, !1);
    }
    var Ri = Ta, Ti = Lr;
    ov.Fragment = z, ov.jsx = Ri, ov.jsxs = Ti;
  }()), ov;
}
process.env.NODE_ENV === "production" ? $0.exports = vD() : $0.exports = hD();
var fv = $0.exports, mD = !1;
function yD(y) {
  if (y.sheet)
    return y.sheet;
  for (var E = 0; E < document.styleSheets.length; E++)
    if (document.styleSheets[E].ownerNode === y)
      return document.styleSheets[E];
}
function gD(y) {
  var E = document.createElement("style");
  return E.setAttribute("data-emotion", y.key), y.nonce !== void 0 && E.setAttribute("nonce", y.nonce), E.appendChild(document.createTextNode("")), E.setAttribute("data-s", ""), E;
}
var SD = /* @__PURE__ */ function() {
  function y(R) {
    var z = this;
    this._insertTag = function(H) {
      var Y;
      z.tags.length === 0 ? z.insertionPoint ? Y = z.insertionPoint.nextSibling : z.prepend ? Y = z.container.firstChild : Y = z.before : Y = z.tags[z.tags.length - 1].nextSibling, z.container.insertBefore(H, Y), z.tags.push(H);
    }, this.isSpeedy = R.speedy === void 0 ? !mD : R.speedy, this.tags = [], this.ctr = 0, this.nonce = R.nonce, this.key = R.key, this.container = R.container, this.prepend = R.prepend, this.insertionPoint = R.insertionPoint, this.before = null;
  }
  var E = y.prototype;
  return E.hydrate = function(z) {
    z.forEach(this._insertTag);
  }, E.insert = function(z) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(gD(this));
    var H = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var Y = yD(H);
      try {
        Y.insertRule(z, Y.cssRules.length);
      } catch {
      }
    } else
      H.appendChild(document.createTextNode(z));
    this.ctr++;
  }, E.flush = function() {
    this.tags.forEach(function(z) {
      var H;
      return (H = z.parentNode) == null ? void 0 : H.removeChild(z);
    }), this.tags = [], this.ctr = 0;
  }, y;
}(), ya = "-ms-", fy = "-moz-", qt = "-webkit-", rT = "comm", K0 = "rule", X0 = "decl", ED = "@import", aT = "@keyframes", CD = "@layer", RD = Math.abs, dy = String.fromCharCode, TD = Object.assign;
function wD(y, E) {
  return Qr(y, 0) ^ 45 ? (((E << 2 ^ Qr(y, 0)) << 2 ^ Qr(y, 1)) << 2 ^ Qr(y, 2)) << 2 ^ Qr(y, 3) : 0;
}
function iT(y) {
  return y.trim();
}
function bD(y, E) {
  return (y = E.exec(y)) ? y[0] : y;
}
function Kt(y, E, R) {
  return y.replace(E, R);
}
function I0(y, E) {
  return y.indexOf(E);
}
function Qr(y, E) {
  return y.charCodeAt(E) | 0;
}
function dv(y, E, R) {
  return y.slice(E, R);
}
function tu(y) {
  return y.length;
}
function Z0(y) {
  return y.length;
}
function iy(y, E) {
  return E.push(y), y;
}
function xD(y, E) {
  return y.map(E).join("");
}
var py = 1, nd = 1, lT = 0, li = 0, or = 0, rd = "";
function vy(y, E, R, z, H, Y, S) {
  return { value: y, root: E, parent: R, type: z, props: H, children: Y, line: py, column: nd, length: S, return: "" };
}
function sv(y, E) {
  return TD(vy("", null, null, "", null, null, 0), y, { length: -y.length }, E);
}
function _D() {
  return or;
}
function kD() {
  return or = li > 0 ? Qr(rd, --li) : 0, nd--, or === 10 && (nd = 1, py--), or;
}
function Si() {
  return or = li < lT ? Qr(rd, li++) : 0, nd++, or === 10 && (nd = 1, py++), or;
}
function ru() {
  return Qr(rd, li);
}
function oy() {
  return li;
}
function hv(y, E) {
  return dv(rd, y, E);
}
function pv(y) {
  switch (y) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function uT(y) {
  return py = nd = 1, lT = tu(rd = y), li = 0, [];
}
function oT(y) {
  return rd = "", y;
}
function sy(y) {
  return iT(hv(li - 1, Y0(y === 91 ? y + 2 : y === 40 ? y + 1 : y)));
}
function DD(y) {
  for (; (or = ru()) && or < 33; )
    Si();
  return pv(y) > 2 || pv(or) > 3 ? "" : " ";
}
function OD(y, E) {
  for (; --E && Si() && !(or < 48 || or > 102 || or > 57 && or < 65 || or > 70 && or < 97); )
    ;
  return hv(y, oy() + (E < 6 && ru() == 32 && Si() == 32));
}
function Y0(y) {
  for (; Si(); )
    switch (or) {
      case y:
        return li;
      case 34:
      case 39:
        y !== 34 && y !== 39 && Y0(or);
        break;
      case 40:
        y === 41 && Y0(y);
        break;
      case 92:
        Si();
        break;
    }
  return li;
}
function MD(y, E) {
  for (; Si() && y + or !== 57; )
    if (y + or === 84 && ru() === 47)
      break;
  return "/*" + hv(E, li - 1) + "*" + dy(y === 47 ? y : Si());
}
function LD(y) {
  for (; !pv(ru()); )
    Si();
  return hv(y, li);
}
function ND(y) {
  return oT(cy("", null, null, null, [""], y = uT(y), 0, [0], y));
}
function cy(y, E, R, z, H, Y, S, he, Z) {
  for (var G = 0, me = 0, K = S, ce = 0, ae = 0, ge = 0, Me = 1, $e = 1, tt = 1, Le = 0, Se = "", Ue = H, $ = Y, Be = z, pe = Se; $e; )
    switch (ge = Le, Le = Si()) {
      case 40:
        if (ge != 108 && Qr(pe, K - 1) == 58) {
          I0(pe += Kt(sy(Le), "&", "&\f"), "&\f") != -1 && (tt = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        pe += sy(Le);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        pe += DD(ge);
        break;
      case 92:
        pe += OD(oy() - 1, 7);
        continue;
      case 47:
        switch (ru()) {
          case 42:
          case 47:
            iy(AD(MD(Si(), oy()), E, R), Z);
            break;
          default:
            pe += "/";
        }
        break;
      case 123 * Me:
        he[G++] = tu(pe) * tt;
      case 125 * Me:
      case 59:
      case 0:
        switch (Le) {
          case 0:
          case 125:
            $e = 0;
          case 59 + me:
            tt == -1 && (pe = Kt(pe, /\f/g, "")), ae > 0 && tu(pe) - K && iy(ae > 32 ? VR(pe + ";", z, R, K - 1) : VR(Kt(pe, " ", "") + ";", z, R, K - 2), Z);
            break;
          case 59:
            pe += ";";
          default:
            if (iy(Be = HR(pe, E, R, G, me, H, he, Se, Ue = [], $ = [], K), Y), Le === 123)
              if (me === 0)
                cy(pe, E, Be, Be, Ue, Y, K, he, $);
              else
                switch (ce === 99 && Qr(pe, 3) === 110 ? 100 : ce) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    cy(y, Be, Be, z && iy(HR(y, Be, Be, 0, 0, H, he, Se, H, Ue = [], K), $), H, $, K, he, z ? Ue : $);
                    break;
                  default:
                    cy(pe, Be, Be, Be, [""], $, 0, he, $);
                }
        }
        G = me = ae = 0, Me = tt = 1, Se = pe = "", K = S;
        break;
      case 58:
        K = 1 + tu(pe), ae = ge;
      default:
        if (Me < 1) {
          if (Le == 123)
            --Me;
          else if (Le == 125 && Me++ == 0 && kD() == 125)
            continue;
        }
        switch (pe += dy(Le), Le * Me) {
          case 38:
            tt = me > 0 ? 1 : (pe += "\f", -1);
            break;
          case 44:
            he[G++] = (tu(pe) - 1) * tt, tt = 1;
            break;
          case 64:
            ru() === 45 && (pe += sy(Si())), ce = ru(), me = K = tu(Se = pe += LD(oy())), Le++;
            break;
          case 45:
            ge === 45 && tu(pe) == 2 && (Me = 0);
        }
    }
  return Y;
}
function HR(y, E, R, z, H, Y, S, he, Z, G, me) {
  for (var K = H - 1, ce = H === 0 ? Y : [""], ae = Z0(ce), ge = 0, Me = 0, $e = 0; ge < z; ++ge)
    for (var tt = 0, Le = dv(y, K + 1, K = RD(Me = S[ge])), Se = y; tt < ae; ++tt)
      (Se = iT(Me > 0 ? ce[tt] + " " + Le : Kt(Le, /&\f/g, ce[tt]))) && (Z[$e++] = Se);
  return vy(y, E, R, H === 0 ? K0 : he, Z, G, me);
}
function AD(y, E, R) {
  return vy(y, E, R, rT, dy(_D()), dv(y, 2, -2), 0);
}
function VR(y, E, R, z) {
  return vy(y, E, R, X0, dv(y, 0, z), dv(y, z + 1, -1), z);
}
function td(y, E) {
  for (var R = "", z = Z0(y), H = 0; H < z; H++)
    R += E(y[H], H, y, E) || "";
  return R;
}
function zD(y, E, R, z) {
  switch (y.type) {
    case CD:
      if (y.children.length) break;
    case ED:
    case X0:
      return y.return = y.return || y.value;
    case rT:
      return "";
    case aT:
      return y.return = y.value + "{" + td(y.children, z) + "}";
    case K0:
      y.value = y.props.join(",");
  }
  return tu(R = td(y.children, z)) ? y.return = y.value + "{" + R + "}" : "";
}
function UD(y) {
  var E = Z0(y);
  return function(R, z, H, Y) {
    for (var S = "", he = 0; he < E; he++)
      S += y[he](R, z, H, Y) || "";
    return S;
  };
}
function FD(y) {
  return function(E) {
    E.root || (E = E.return) && y(E);
  };
}
function jD(y) {
  var E = /* @__PURE__ */ Object.create(null);
  return function(R) {
    return E[R] === void 0 && (E[R] = y(R)), E[R];
  };
}
var PD = function(E, R, z) {
  for (var H = 0, Y = 0; H = Y, Y = ru(), H === 38 && Y === 12 && (R[z] = 1), !pv(Y); )
    Si();
  return hv(E, li);
}, HD = function(E, R) {
  var z = -1, H = 44;
  do
    switch (pv(H)) {
      case 0:
        H === 38 && ru() === 12 && (R[z] = 1), E[z] += PD(li - 1, R, z);
        break;
      case 2:
        E[z] += sy(H);
        break;
      case 4:
        if (H === 44) {
          E[++z] = ru() === 58 ? "&\f" : "", R[z] = E[z].length;
          break;
        }
      default:
        E[z] += dy(H);
    }
  while (H = Si());
  return E;
}, VD = function(E, R) {
  return oT(HD(uT(E), R));
}, $R = /* @__PURE__ */ new WeakMap(), $D = function(E) {
  if (!(E.type !== "rule" || !E.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  E.length < 1)) {
    for (var R = E.value, z = E.parent, H = E.column === z.column && E.line === z.line; z.type !== "rule"; )
      if (z = z.parent, !z) return;
    if (!(E.props.length === 1 && R.charCodeAt(0) !== 58 && !$R.get(z)) && !H) {
      $R.set(E, !0);
      for (var Y = [], S = VD(R, Y), he = z.props, Z = 0, G = 0; Z < S.length; Z++)
        for (var me = 0; me < he.length; me++, G++)
          E.props[G] = Y[Z] ? S[Z].replace(/&\f/g, he[me]) : he[me] + " " + S[Z];
    }
  }
}, BD = function(E) {
  if (E.type === "decl") {
    var R = E.value;
    // charcode for l
    R.charCodeAt(0) === 108 && // charcode for b
    R.charCodeAt(2) === 98 && (E.return = "", E.value = "");
  }
};
function sT(y, E) {
  switch (wD(y, E)) {
    case 5103:
      return qt + "print-" + y + y;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return qt + y + y;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return qt + y + fy + y + ya + y + y;
    case 6828:
    case 4268:
      return qt + y + ya + y + y;
    case 6165:
      return qt + y + ya + "flex-" + y + y;
    case 5187:
      return qt + y + Kt(y, /(\w+).+(:[^]+)/, qt + "box-$1$2" + ya + "flex-$1$2") + y;
    case 5443:
      return qt + y + ya + "flex-item-" + Kt(y, /flex-|-self/, "") + y;
    case 4675:
      return qt + y + ya + "flex-line-pack" + Kt(y, /align-content|flex-|-self/, "") + y;
    case 5548:
      return qt + y + ya + Kt(y, "shrink", "negative") + y;
    case 5292:
      return qt + y + ya + Kt(y, "basis", "preferred-size") + y;
    case 6060:
      return qt + "box-" + Kt(y, "-grow", "") + qt + y + ya + Kt(y, "grow", "positive") + y;
    case 4554:
      return qt + Kt(y, /([^-])(transform)/g, "$1" + qt + "$2") + y;
    case 6187:
      return Kt(Kt(Kt(y, /(zoom-|grab)/, qt + "$1"), /(image-set)/, qt + "$1"), y, "") + y;
    case 5495:
    case 3959:
      return Kt(y, /(image-set\([^]*)/, qt + "$1$`$1");
    case 4968:
      return Kt(Kt(y, /(.+:)(flex-)?(.*)/, qt + "box-pack:$3" + ya + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + qt + y + y;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Kt(y, /(.+)-inline(.+)/, qt + "$1$2") + y;
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
      if (tu(y) - 1 - E > 6) switch (Qr(y, E + 1)) {
        case 109:
          if (Qr(y, E + 4) !== 45) break;
        case 102:
          return Kt(y, /(.+:)(.+)-([^]+)/, "$1" + qt + "$2-$3$1" + fy + (Qr(y, E + 3) == 108 ? "$3" : "$2-$3")) + y;
        case 115:
          return ~I0(y, "stretch") ? sT(Kt(y, "stretch", "fill-available"), E) + y : y;
      }
      break;
    case 4949:
      if (Qr(y, E + 1) !== 115) break;
    case 6444:
      switch (Qr(y, tu(y) - 3 - (~I0(y, "!important") && 10))) {
        case 107:
          return Kt(y, ":", ":" + qt) + y;
        case 101:
          return Kt(y, /(.+:)([^;!]+)(;|!.+)?/, "$1" + qt + (Qr(y, 14) === 45 ? "inline-" : "") + "box$3$1" + qt + "$2$3$1" + ya + "$2box$3") + y;
      }
      break;
    case 5936:
      switch (Qr(y, E + 11)) {
        case 114:
          return qt + y + ya + Kt(y, /[svh]\w+-[tblr]{2}/, "tb") + y;
        case 108:
          return qt + y + ya + Kt(y, /[svh]\w+-[tblr]{2}/, "tb-rl") + y;
        case 45:
          return qt + y + ya + Kt(y, /[svh]\w+-[tblr]{2}/, "lr") + y;
      }
      return qt + y + ya + y + y;
  }
  return y;
}
var ID = function(E, R, z, H) {
  if (E.length > -1 && !E.return) switch (E.type) {
    case X0:
      E.return = sT(E.value, E.length);
      break;
    case aT:
      return td([sv(E, {
        value: Kt(E.value, "@", "@" + qt)
      })], H);
    case K0:
      if (E.length) return xD(E.props, function(Y) {
        switch (bD(Y, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return td([sv(E, {
              props: [Kt(Y, /:(read-\w+)/, ":" + fy + "$1")]
            })], H);
          case "::placeholder":
            return td([sv(E, {
              props: [Kt(Y, /:(plac\w+)/, ":" + qt + "input-$1")]
            }), sv(E, {
              props: [Kt(Y, /:(plac\w+)/, ":" + fy + "$1")]
            }), sv(E, {
              props: [Kt(Y, /:(plac\w+)/, ya + "input-$1")]
            })], H);
        }
        return "";
      });
  }
}, YD = [ID], WD = function(E) {
  var R = E.key;
  if (R === "css") {
    var z = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(z, function(Me) {
      var $e = Me.getAttribute("data-emotion");
      $e.indexOf(" ") !== -1 && (document.head.appendChild(Me), Me.setAttribute("data-s", ""));
    });
  }
  var H = E.stylisPlugins || YD, Y = {}, S, he = [];
  S = E.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + R + ' "]'),
    function(Me) {
      for (var $e = Me.getAttribute("data-emotion").split(" "), tt = 1; tt < $e.length; tt++)
        Y[$e[tt]] = !0;
      he.push(Me);
    }
  );
  var Z, G = [$D, BD];
  {
    var me, K = [zD, FD(function(Me) {
      me.insert(Me);
    })], ce = UD(G.concat(H, K)), ae = function($e) {
      return td(ND($e), ce);
    };
    Z = function($e, tt, Le, Se) {
      me = Le, ae($e ? $e + "{" + tt.styles + "}" : tt.styles), Se && (ge.inserted[tt.name] = !0);
    };
  }
  var ge = {
    key: R,
    sheet: new SD({
      key: R,
      container: S,
      nonce: E.nonce,
      speedy: E.speedy,
      prepend: E.prepend,
      insertionPoint: E.insertionPoint
    }),
    nonce: E.nonce,
    inserted: Y,
    registered: {},
    insert: Z
  };
  return ge.sheet.hydrate(he), ge;
}, W0 = { exports: {} }, en = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var BR;
function QD() {
  if (BR) return en;
  BR = 1;
  var y = typeof Symbol == "function" && Symbol.for, E = y ? Symbol.for("react.element") : 60103, R = y ? Symbol.for("react.portal") : 60106, z = y ? Symbol.for("react.fragment") : 60107, H = y ? Symbol.for("react.strict_mode") : 60108, Y = y ? Symbol.for("react.profiler") : 60114, S = y ? Symbol.for("react.provider") : 60109, he = y ? Symbol.for("react.context") : 60110, Z = y ? Symbol.for("react.async_mode") : 60111, G = y ? Symbol.for("react.concurrent_mode") : 60111, me = y ? Symbol.for("react.forward_ref") : 60112, K = y ? Symbol.for("react.suspense") : 60113, ce = y ? Symbol.for("react.suspense_list") : 60120, ae = y ? Symbol.for("react.memo") : 60115, ge = y ? Symbol.for("react.lazy") : 60116, Me = y ? Symbol.for("react.block") : 60121, $e = y ? Symbol.for("react.fundamental") : 60117, tt = y ? Symbol.for("react.responder") : 60118, Le = y ? Symbol.for("react.scope") : 60119;
  function Se($) {
    if (typeof $ == "object" && $ !== null) {
      var Be = $.$$typeof;
      switch (Be) {
        case E:
          switch ($ = $.type, $) {
            case Z:
            case G:
            case z:
            case Y:
            case H:
            case K:
              return $;
            default:
              switch ($ = $ && $.$$typeof, $) {
                case he:
                case me:
                case ge:
                case ae:
                case S:
                  return $;
                default:
                  return Be;
              }
          }
        case R:
          return Be;
      }
    }
  }
  function Ue($) {
    return Se($) === G;
  }
  return en.AsyncMode = Z, en.ConcurrentMode = G, en.ContextConsumer = he, en.ContextProvider = S, en.Element = E, en.ForwardRef = me, en.Fragment = z, en.Lazy = ge, en.Memo = ae, en.Portal = R, en.Profiler = Y, en.StrictMode = H, en.Suspense = K, en.isAsyncMode = function($) {
    return Ue($) || Se($) === Z;
  }, en.isConcurrentMode = Ue, en.isContextConsumer = function($) {
    return Se($) === he;
  }, en.isContextProvider = function($) {
    return Se($) === S;
  }, en.isElement = function($) {
    return typeof $ == "object" && $ !== null && $.$$typeof === E;
  }, en.isForwardRef = function($) {
    return Se($) === me;
  }, en.isFragment = function($) {
    return Se($) === z;
  }, en.isLazy = function($) {
    return Se($) === ge;
  }, en.isMemo = function($) {
    return Se($) === ae;
  }, en.isPortal = function($) {
    return Se($) === R;
  }, en.isProfiler = function($) {
    return Se($) === Y;
  }, en.isStrictMode = function($) {
    return Se($) === H;
  }, en.isSuspense = function($) {
    return Se($) === K;
  }, en.isValidElementType = function($) {
    return typeof $ == "string" || typeof $ == "function" || $ === z || $ === G || $ === Y || $ === H || $ === K || $ === ce || typeof $ == "object" && $ !== null && ($.$$typeof === ge || $.$$typeof === ae || $.$$typeof === S || $.$$typeof === he || $.$$typeof === me || $.$$typeof === $e || $.$$typeof === tt || $.$$typeof === Le || $.$$typeof === Me);
  }, en.typeOf = Se, en;
}
var tn = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var IR;
function GD() {
  return IR || (IR = 1, process.env.NODE_ENV !== "production" && function() {
    var y = typeof Symbol == "function" && Symbol.for, E = y ? Symbol.for("react.element") : 60103, R = y ? Symbol.for("react.portal") : 60106, z = y ? Symbol.for("react.fragment") : 60107, H = y ? Symbol.for("react.strict_mode") : 60108, Y = y ? Symbol.for("react.profiler") : 60114, S = y ? Symbol.for("react.provider") : 60109, he = y ? Symbol.for("react.context") : 60110, Z = y ? Symbol.for("react.async_mode") : 60111, G = y ? Symbol.for("react.concurrent_mode") : 60111, me = y ? Symbol.for("react.forward_ref") : 60112, K = y ? Symbol.for("react.suspense") : 60113, ce = y ? Symbol.for("react.suspense_list") : 60120, ae = y ? Symbol.for("react.memo") : 60115, ge = y ? Symbol.for("react.lazy") : 60116, Me = y ? Symbol.for("react.block") : 60121, $e = y ? Symbol.for("react.fundamental") : 60117, tt = y ? Symbol.for("react.responder") : 60118, Le = y ? Symbol.for("react.scope") : 60119;
    function Se(we) {
      return typeof we == "string" || typeof we == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      we === z || we === G || we === Y || we === H || we === K || we === ce || typeof we == "object" && we !== null && (we.$$typeof === ge || we.$$typeof === ae || we.$$typeof === S || we.$$typeof === he || we.$$typeof === me || we.$$typeof === $e || we.$$typeof === tt || we.$$typeof === Le || we.$$typeof === Me);
    }
    function Ue(we) {
      if (typeof we == "object" && we !== null) {
        var rn = we.$$typeof;
        switch (rn) {
          case E:
            var Cn = we.type;
            switch (Cn) {
              case Z:
              case G:
              case z:
              case Y:
              case H:
              case K:
                return Cn;
              default:
                var kn = Cn && Cn.$$typeof;
                switch (kn) {
                  case he:
                  case me:
                  case ge:
                  case ae:
                  case S:
                    return kn;
                  default:
                    return rn;
                }
            }
          case R:
            return rn;
        }
      }
    }
    var $ = Z, Be = G, pe = he, nn = S, En = E, Ht = me, Ot = z, mn = ge, Ye = ae, lt = R, Lt = Y, Tt = H, xe = K, ie = !1;
    function Ne(we) {
      return ie || (ie = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), se(we) || Ue(we) === Z;
    }
    function se(we) {
      return Ue(we) === G;
    }
    function O(we) {
      return Ue(we) === he;
    }
    function W(we) {
      return Ue(we) === S;
    }
    function We(we) {
      return typeof we == "object" && we !== null && we.$$typeof === E;
    }
    function Ze(we) {
      return Ue(we) === me;
    }
    function ct(we) {
      return Ue(we) === z;
    }
    function ot(we) {
      return Ue(we) === ge;
    }
    function St(we) {
      return Ue(we) === ae;
    }
    function dt(we) {
      return Ue(we) === R;
    }
    function pt(we) {
      return Ue(we) === Y;
    }
    function Xt(we) {
      return Ue(we) === H;
    }
    function Zn(we) {
      return Ue(we) === K;
    }
    tn.AsyncMode = $, tn.ConcurrentMode = Be, tn.ContextConsumer = pe, tn.ContextProvider = nn, tn.Element = En, tn.ForwardRef = Ht, tn.Fragment = Ot, tn.Lazy = mn, tn.Memo = Ye, tn.Portal = lt, tn.Profiler = Lt, tn.StrictMode = Tt, tn.Suspense = xe, tn.isAsyncMode = Ne, tn.isConcurrentMode = se, tn.isContextConsumer = O, tn.isContextProvider = W, tn.isElement = We, tn.isForwardRef = Ze, tn.isFragment = ct, tn.isLazy = ot, tn.isMemo = St, tn.isPortal = dt, tn.isProfiler = pt, tn.isStrictMode = Xt, tn.isSuspense = Zn, tn.isValidElementType = Se, tn.typeOf = Ue;
  }()), tn;
}
process.env.NODE_ENV === "production" ? W0.exports = QD() : W0.exports = GD();
var qD = W0.exports, cT = qD, KD = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, XD = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, fT = {};
fT[cT.ForwardRef] = KD;
fT[cT.Memo] = XD;
var ZD = !0;
function JD(y, E, R) {
  var z = "";
  return R.split(" ").forEach(function(H) {
    y[H] !== void 0 ? E.push(y[H] + ";") : H && (z += H + " ");
  }), z;
}
var dT = function(E, R, z) {
  var H = E.key + "-" + R.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (z === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  ZD === !1) && E.registered[H] === void 0 && (E.registered[H] = R.styles);
}, eO = function(E, R, z) {
  dT(E, R, z);
  var H = E.key + "-" + R.name;
  if (E.inserted[R.name] === void 0) {
    var Y = R;
    do
      E.insert(R === Y ? "." + H : "", Y, E.sheet, !0), Y = Y.next;
    while (Y !== void 0);
  }
};
function tO(y) {
  for (var E = 0, R, z = 0, H = y.length; H >= 4; ++z, H -= 4)
    R = y.charCodeAt(z) & 255 | (y.charCodeAt(++z) & 255) << 8 | (y.charCodeAt(++z) & 255) << 16 | (y.charCodeAt(++z) & 255) << 24, R = /* Math.imul(k, m): */
    (R & 65535) * 1540483477 + ((R >>> 16) * 59797 << 16), R ^= /* k >>> r: */
    R >>> 24, E = /* Math.imul(k, m): */
    (R & 65535) * 1540483477 + ((R >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (E & 65535) * 1540483477 + ((E >>> 16) * 59797 << 16);
  switch (H) {
    case 3:
      E ^= (y.charCodeAt(z + 2) & 255) << 16;
    case 2:
      E ^= (y.charCodeAt(z + 1) & 255) << 8;
    case 1:
      E ^= y.charCodeAt(z) & 255, E = /* Math.imul(h, m): */
      (E & 65535) * 1540483477 + ((E >>> 16) * 59797 << 16);
  }
  return E ^= E >>> 13, E = /* Math.imul(h, m): */
  (E & 65535) * 1540483477 + ((E >>> 16) * 59797 << 16), ((E ^ E >>> 15) >>> 0).toString(36);
}
var nO = {
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
}, rO = !1, aO = /[A-Z]|^ms/g, iO = /_EMO_([^_]+?)_([^]*?)_EMO_/g, pT = function(E) {
  return E.charCodeAt(1) === 45;
}, YR = function(E) {
  return E != null && typeof E != "boolean";
}, P0 = /* @__PURE__ */ jD(function(y) {
  return pT(y) ? y : y.replace(aO, "-$&").toLowerCase();
}), WR = function(E, R) {
  switch (E) {
    case "animation":
    case "animationName":
      if (typeof R == "string")
        return R.replace(iO, function(z, H, Y) {
          return nu = {
            name: H,
            styles: Y,
            next: nu
          }, H;
        });
  }
  return nO[E] !== 1 && !pT(E) && typeof R == "number" && R !== 0 ? R + "px" : R;
}, lO = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function vv(y, E, R) {
  if (R == null)
    return "";
  var z = R;
  if (z.__emotion_styles !== void 0)
    return z;
  switch (typeof R) {
    case "boolean":
      return "";
    case "object": {
      var H = R;
      if (H.anim === 1)
        return nu = {
          name: H.name,
          styles: H.styles,
          next: nu
        }, H.name;
      var Y = R;
      if (Y.styles !== void 0) {
        var S = Y.next;
        if (S !== void 0)
          for (; S !== void 0; )
            nu = {
              name: S.name,
              styles: S.styles,
              next: nu
            }, S = S.next;
        var he = Y.styles + ";";
        return he;
      }
      return uO(y, E, R);
    }
    case "function": {
      if (y !== void 0) {
        var Z = nu, G = R(y);
        return nu = Z, vv(y, E, G);
      }
      break;
    }
  }
  var me = R;
  return me;
}
function uO(y, E, R) {
  var z = "";
  if (Array.isArray(R))
    for (var H = 0; H < R.length; H++)
      z += vv(y, E, R[H]) + ";";
  else
    for (var Y in R) {
      var S = R[Y];
      if (typeof S != "object") {
        var he = S;
        YR(he) && (z += P0(Y) + ":" + WR(Y, he) + ";");
      } else {
        if (Y === "NO_COMPONENT_SELECTOR" && rO)
          throw new Error(lO);
        if (Array.isArray(S) && typeof S[0] == "string" && E == null)
          for (var Z = 0; Z < S.length; Z++)
            YR(S[Z]) && (z += P0(Y) + ":" + WR(Y, S[Z]) + ";");
        else {
          var G = vv(y, E, S);
          switch (Y) {
            case "animation":
            case "animationName": {
              z += P0(Y) + ":" + G + ";";
              break;
            }
            default:
              z += Y + "{" + G + "}";
          }
        }
      }
    }
  return z;
}
var QR = /label:\s*([^\s;{]+)\s*(;|$)/g, nu;
function vT(y, E, R) {
  if (y.length === 1 && typeof y[0] == "object" && y[0] !== null && y[0].styles !== void 0)
    return y[0];
  var z = !0, H = "";
  nu = void 0;
  var Y = y[0];
  if (Y == null || Y.raw === void 0)
    z = !1, H += vv(R, E, Y);
  else {
    var S = Y;
    H += S[0];
  }
  for (var he = 1; he < y.length; he++)
    if (H += vv(R, E, y[he]), z) {
      var Z = Y;
      H += Z[he];
    }
  QR.lastIndex = 0;
  for (var G = "", me; (me = QR.exec(H)) !== null; )
    G += "-" + me[1];
  var K = tO(H) + G;
  return {
    name: K,
    styles: H,
    next: nu
  };
}
var oO = function(E) {
  return E();
}, sO = FR.useInsertionEffect ? FR.useInsertionEffect : !1, cO = sO || oO, fO = !1, hT = /* @__PURE__ */ ga.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ WD({
    key: "css"
  }) : null
);
hT.Provider;
var dO = function(E) {
  return /* @__PURE__ */ ga.forwardRef(function(R, z) {
    var H = ga.useContext(hT);
    return E(R, H, z);
  });
}, pO = /* @__PURE__ */ ga.createContext({}), hy = {}.hasOwnProperty, Q0 = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", mT = function(E, R) {
  var z = {};
  for (var H in R)
    hy.call(R, H) && (z[H] = R[H]);
  return z[Q0] = E, z;
}, vO = function(E) {
  var R = E.cache, z = E.serialized, H = E.isStringTag;
  return dT(R, z, H), cO(function() {
    return eO(R, z, H);
  }), null;
}, hO = /* @__PURE__ */ dO(
  /* <any, any> */
  function(y, E, R) {
    var z = y.css;
    typeof z == "string" && E.registered[z] !== void 0 && (z = E.registered[z]);
    var H = y[Q0], Y = [z], S = "";
    typeof y.className == "string" ? S = JD(E.registered, Y, y.className) : y.className != null && (S = y.className + " ");
    var he = vT(Y, void 0, ga.useContext(pO));
    S += E.key + "-" + he.name;
    var Z = {};
    for (var G in y)
      hy.call(y, G) && G !== "css" && G !== Q0 && !fO && (Z[G] = y[G]);
    return Z.className = S, R && (Z.ref = R), /* @__PURE__ */ ga.createElement(ga.Fragment, null, /* @__PURE__ */ ga.createElement(vO, {
      cache: E,
      serialized: he,
      isStringTag: typeof H == "string"
    }), /* @__PURE__ */ ga.createElement(H, Z));
  }
), yT = hO, mO = fv.Fragment;
function sc(y, E, R) {
  return hy.call(E, "css") ? fv.jsx(yT, mT(y, E), R) : fv.jsx(y, E, R);
}
function GR(y, E, R) {
  return hy.call(E, "css") ? fv.jsxs(yT, mT(y, E), R) : fv.jsxs(y, E, R);
}
var G0 = { exports: {} }, ai = {}, ly = { exports: {} }, H0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qR;
function yO() {
  return qR || (qR = 1, function(y) {
    function E(ie, Ne) {
      var se = ie.length;
      ie.push(Ne);
      e: for (; 0 < se; ) {
        var O = se - 1 >>> 1, W = ie[O];
        if (0 < H(W, Ne)) ie[O] = Ne, ie[se] = W, se = O;
        else break e;
      }
    }
    function R(ie) {
      return ie.length === 0 ? null : ie[0];
    }
    function z(ie) {
      if (ie.length === 0) return null;
      var Ne = ie[0], se = ie.pop();
      if (se !== Ne) {
        ie[0] = se;
        e: for (var O = 0, W = ie.length, We = W >>> 1; O < We; ) {
          var Ze = 2 * (O + 1) - 1, ct = ie[Ze], ot = Ze + 1, St = ie[ot];
          if (0 > H(ct, se)) ot < W && 0 > H(St, ct) ? (ie[O] = St, ie[ot] = se, O = ot) : (ie[O] = ct, ie[Ze] = se, O = Ze);
          else if (ot < W && 0 > H(St, se)) ie[O] = St, ie[ot] = se, O = ot;
          else break e;
        }
      }
      return Ne;
    }
    function H(ie, Ne) {
      var se = ie.sortIndex - Ne.sortIndex;
      return se !== 0 ? se : ie.id - Ne.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var Y = performance;
      y.unstable_now = function() {
        return Y.now();
      };
    } else {
      var S = Date, he = S.now();
      y.unstable_now = function() {
        return S.now() - he;
      };
    }
    var Z = [], G = [], me = 1, K = null, ce = 3, ae = !1, ge = !1, Me = !1, $e = typeof setTimeout == "function" ? setTimeout : null, tt = typeof clearTimeout == "function" ? clearTimeout : null, Le = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Se(ie) {
      for (var Ne = R(G); Ne !== null; ) {
        if (Ne.callback === null) z(G);
        else if (Ne.startTime <= ie) z(G), Ne.sortIndex = Ne.expirationTime, E(Z, Ne);
        else break;
        Ne = R(G);
      }
    }
    function Ue(ie) {
      if (Me = !1, Se(ie), !ge) if (R(Z) !== null) ge = !0, Tt($);
      else {
        var Ne = R(G);
        Ne !== null && xe(Ue, Ne.startTime - ie);
      }
    }
    function $(ie, Ne) {
      ge = !1, Me && (Me = !1, tt(nn), nn = -1), ae = !0;
      var se = ce;
      try {
        for (Se(Ne), K = R(Z); K !== null && (!(K.expirationTime > Ne) || ie && !Ot()); ) {
          var O = K.callback;
          if (typeof O == "function") {
            K.callback = null, ce = K.priorityLevel;
            var W = O(K.expirationTime <= Ne);
            Ne = y.unstable_now(), typeof W == "function" ? K.callback = W : K === R(Z) && z(Z), Se(Ne);
          } else z(Z);
          K = R(Z);
        }
        if (K !== null) var We = !0;
        else {
          var Ze = R(G);
          Ze !== null && xe(Ue, Ze.startTime - Ne), We = !1;
        }
        return We;
      } finally {
        K = null, ce = se, ae = !1;
      }
    }
    var Be = !1, pe = null, nn = -1, En = 5, Ht = -1;
    function Ot() {
      return !(y.unstable_now() - Ht < En);
    }
    function mn() {
      if (pe !== null) {
        var ie = y.unstable_now();
        Ht = ie;
        var Ne = !0;
        try {
          Ne = pe(!0, ie);
        } finally {
          Ne ? Ye() : (Be = !1, pe = null);
        }
      } else Be = !1;
    }
    var Ye;
    if (typeof Le == "function") Ye = function() {
      Le(mn);
    };
    else if (typeof MessageChannel < "u") {
      var lt = new MessageChannel(), Lt = lt.port2;
      lt.port1.onmessage = mn, Ye = function() {
        Lt.postMessage(null);
      };
    } else Ye = function() {
      $e(mn, 0);
    };
    function Tt(ie) {
      pe = ie, Be || (Be = !0, Ye());
    }
    function xe(ie, Ne) {
      nn = $e(function() {
        ie(y.unstable_now());
      }, Ne);
    }
    y.unstable_IdlePriority = 5, y.unstable_ImmediatePriority = 1, y.unstable_LowPriority = 4, y.unstable_NormalPriority = 3, y.unstable_Profiling = null, y.unstable_UserBlockingPriority = 2, y.unstable_cancelCallback = function(ie) {
      ie.callback = null;
    }, y.unstable_continueExecution = function() {
      ge || ae || (ge = !0, Tt($));
    }, y.unstable_forceFrameRate = function(ie) {
      0 > ie || 125 < ie ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : En = 0 < ie ? Math.floor(1e3 / ie) : 5;
    }, y.unstable_getCurrentPriorityLevel = function() {
      return ce;
    }, y.unstable_getFirstCallbackNode = function() {
      return R(Z);
    }, y.unstable_next = function(ie) {
      switch (ce) {
        case 1:
        case 2:
        case 3:
          var Ne = 3;
          break;
        default:
          Ne = ce;
      }
      var se = ce;
      ce = Ne;
      try {
        return ie();
      } finally {
        ce = se;
      }
    }, y.unstable_pauseExecution = function() {
    }, y.unstable_requestPaint = function() {
    }, y.unstable_runWithPriority = function(ie, Ne) {
      switch (ie) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          ie = 3;
      }
      var se = ce;
      ce = ie;
      try {
        return Ne();
      } finally {
        ce = se;
      }
    }, y.unstable_scheduleCallback = function(ie, Ne, se) {
      var O = y.unstable_now();
      switch (typeof se == "object" && se !== null ? (se = se.delay, se = typeof se == "number" && 0 < se ? O + se : O) : se = O, ie) {
        case 1:
          var W = -1;
          break;
        case 2:
          W = 250;
          break;
        case 5:
          W = 1073741823;
          break;
        case 4:
          W = 1e4;
          break;
        default:
          W = 5e3;
      }
      return W = se + W, ie = { id: me++, callback: Ne, priorityLevel: ie, startTime: se, expirationTime: W, sortIndex: -1 }, se > O ? (ie.sortIndex = se, E(G, ie), R(Z) === null && ie === R(G) && (Me ? (tt(nn), nn = -1) : Me = !0, xe(Ue, se - O))) : (ie.sortIndex = W, E(Z, ie), ge || ae || (ge = !0, Tt($))), ie;
    }, y.unstable_shouldYield = Ot, y.unstable_wrapCallback = function(ie) {
      var Ne = ce;
      return function() {
        var se = ce;
        ce = Ne;
        try {
          return ie.apply(this, arguments);
        } finally {
          ce = se;
        }
      };
    };
  }(H0)), H0;
}
var V0 = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var KR;
function gO() {
  return KR || (KR = 1, function(y) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var E = !1, R = !1, z = 5;
      function H(oe, He) {
        var vt = oe.length;
        oe.push(He), he(oe, He, vt);
      }
      function Y(oe) {
        return oe.length === 0 ? null : oe[0];
      }
      function S(oe) {
        if (oe.length === 0)
          return null;
        var He = oe[0], vt = oe.pop();
        return vt !== He && (oe[0] = vt, Z(oe, vt, 0)), He;
      }
      function he(oe, He, vt) {
        for (var jt = vt; jt > 0; ) {
          var Vt = jt - 1 >>> 1, zn = oe[Vt];
          if (G(zn, He) > 0)
            oe[Vt] = He, oe[jt] = zn, jt = Vt;
          else
            return;
        }
      }
      function Z(oe, He, vt) {
        for (var jt = vt, Vt = oe.length, zn = Vt >>> 1; jt < zn; ) {
          var Tn = (jt + 1) * 2 - 1, Tr = oe[Tn], Qt = Tn + 1, Mr = oe[Qt];
          if (G(Tr, He) < 0)
            Qt < Vt && G(Mr, Tr) < 0 ? (oe[jt] = Mr, oe[Qt] = He, jt = Qt) : (oe[jt] = Tr, oe[Tn] = He, jt = Tn);
          else if (Qt < Vt && G(Mr, He) < 0)
            oe[jt] = Mr, oe[Qt] = He, jt = Qt;
          else
            return;
        }
      }
      function G(oe, He) {
        var vt = oe.sortIndex - He.sortIndex;
        return vt !== 0 ? vt : oe.id - He.id;
      }
      var me = 1, K = 2, ce = 3, ae = 4, ge = 5;
      function Me(oe, He) {
      }
      var $e = typeof performance == "object" && typeof performance.now == "function";
      if ($e) {
        var tt = performance;
        y.unstable_now = function() {
          return tt.now();
        };
      } else {
        var Le = Date, Se = Le.now();
        y.unstable_now = function() {
          return Le.now() - Se;
        };
      }
      var Ue = 1073741823, $ = -1, Be = 250, pe = 5e3, nn = 1e4, En = Ue, Ht = [], Ot = [], mn = 1, Ye = null, lt = ce, Lt = !1, Tt = !1, xe = !1, ie = typeof setTimeout == "function" ? setTimeout : null, Ne = typeof clearTimeout == "function" ? clearTimeout : null, se = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function O(oe) {
        for (var He = Y(Ot); He !== null; ) {
          if (He.callback === null)
            S(Ot);
          else if (He.startTime <= oe)
            S(Ot), He.sortIndex = He.expirationTime, H(Ht, He);
          else
            return;
          He = Y(Ot);
        }
      }
      function W(oe) {
        if (xe = !1, O(oe), !Tt)
          if (Y(Ht) !== null)
            Tt = !0, Xr(We);
          else {
            var He = Y(Ot);
            He !== null && Rn(W, He.startTime - oe);
          }
      }
      function We(oe, He) {
        Tt = !1, xe && (xe = !1, Or()), Lt = !0;
        var vt = lt;
        try {
          var jt;
          if (!R) return Ze(oe, He);
        } finally {
          Ye = null, lt = vt, Lt = !1;
        }
      }
      function Ze(oe, He) {
        var vt = He;
        for (O(vt), Ye = Y(Ht); Ye !== null && !E && !(Ye.expirationTime > vt && (!oe || qr())); ) {
          var jt = Ye.callback;
          if (typeof jt == "function") {
            Ye.callback = null, lt = Ye.priorityLevel;
            var Vt = Ye.expirationTime <= vt, zn = jt(Vt);
            vt = y.unstable_now(), typeof zn == "function" ? Ye.callback = zn : Ye === Y(Ht) && S(Ht), O(vt);
          } else
            S(Ht);
          Ye = Y(Ht);
        }
        if (Ye !== null)
          return !0;
        var Tn = Y(Ot);
        return Tn !== null && Rn(W, Tn.startTime - vt), !1;
      }
      function ct(oe, He) {
        switch (oe) {
          case me:
          case K:
          case ce:
          case ae:
          case ge:
            break;
          default:
            oe = ce;
        }
        var vt = lt;
        lt = oe;
        try {
          return He();
        } finally {
          lt = vt;
        }
      }
      function ot(oe) {
        var He;
        switch (lt) {
          case me:
          case K:
          case ce:
            He = ce;
            break;
          default:
            He = lt;
            break;
        }
        var vt = lt;
        lt = He;
        try {
          return oe();
        } finally {
          lt = vt;
        }
      }
      function St(oe) {
        var He = lt;
        return function() {
          var vt = lt;
          lt = He;
          try {
            return oe.apply(this, arguments);
          } finally {
            lt = vt;
          }
        };
      }
      function dt(oe, He, vt) {
        var jt = y.unstable_now(), Vt;
        if (typeof vt == "object" && vt !== null) {
          var zn = vt.delay;
          typeof zn == "number" && zn > 0 ? Vt = jt + zn : Vt = jt;
        } else
          Vt = jt;
        var Tn;
        switch (oe) {
          case me:
            Tn = $;
            break;
          case K:
            Tn = Be;
            break;
          case ge:
            Tn = En;
            break;
          case ae:
            Tn = nn;
            break;
          case ce:
          default:
            Tn = pe;
            break;
        }
        var Tr = Vt + Tn, Qt = {
          id: mn++,
          callback: He,
          priorityLevel: oe,
          startTime: Vt,
          expirationTime: Tr,
          sortIndex: -1
        };
        return Vt > jt ? (Qt.sortIndex = Vt, H(Ot, Qt), Y(Ht) === null && Qt === Y(Ot) && (xe ? Or() : xe = !0, Rn(W, Vt - jt))) : (Qt.sortIndex = Tr, H(Ht, Qt), !Tt && !Lt && (Tt = !0, Xr(We))), Qt;
      }
      function pt() {
      }
      function Xt() {
        !Tt && !Lt && (Tt = !0, Xr(We));
      }
      function Zn() {
        return Y(Ht);
      }
      function we(oe) {
        oe.callback = null;
      }
      function rn() {
        return lt;
      }
      var Cn = !1, kn = null, Hn = -1, An = z, Gr = -1;
      function qr() {
        var oe = y.unstable_now() - Gr;
        return !(oe < An);
      }
      function Jn() {
      }
      function Cr(oe) {
        if (oe < 0 || oe > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        oe > 0 ? An = Math.floor(1e3 / oe) : An = z;
      }
      var Kr = function() {
        if (kn !== null) {
          var oe = y.unstable_now();
          Gr = oe;
          var He = !0, vt = !0;
          try {
            vt = kn(He, oe);
          } finally {
            vt ? Rr() : (Cn = !1, kn = null);
          }
        } else
          Cn = !1;
      }, Rr;
      if (typeof se == "function")
        Rr = function() {
          se(Kr);
        };
      else if (typeof MessageChannel < "u") {
        var Sa = new MessageChannel(), sr = Sa.port2;
        Sa.port1.onmessage = Kr, Rr = function() {
          sr.postMessage(null);
        };
      } else
        Rr = function() {
          ie(Kr, 0);
        };
      function Xr(oe) {
        kn = oe, Cn || (Cn = !0, Rr());
      }
      function Rn(oe, He) {
        Hn = ie(function() {
          oe(y.unstable_now());
        }, He);
      }
      function Or() {
        Ne(Hn), Hn = -1;
      }
      var Ei = Jn, Ea = null;
      y.unstable_IdlePriority = ge, y.unstable_ImmediatePriority = me, y.unstable_LowPriority = ae, y.unstable_NormalPriority = ce, y.unstable_Profiling = Ea, y.unstable_UserBlockingPriority = K, y.unstable_cancelCallback = we, y.unstable_continueExecution = Xt, y.unstable_forceFrameRate = Cr, y.unstable_getCurrentPriorityLevel = rn, y.unstable_getFirstCallbackNode = Zn, y.unstable_next = ot, y.unstable_pauseExecution = pt, y.unstable_requestPaint = Ei, y.unstable_runWithPriority = ct, y.unstable_scheduleCallback = dt, y.unstable_shouldYield = qr, y.unstable_wrapCallback = St, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(V0)), V0;
}
var XR;
function gT() {
  return XR || (XR = 1, process.env.NODE_ENV === "production" ? ly.exports = yO() : ly.exports = gO()), ly.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ZR;
function SO() {
  if (ZR) return ai;
  ZR = 1;
  var y = ga, E = gT();
  function R(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var z = /* @__PURE__ */ new Set(), H = {};
  function Y(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (H[n] = r, n = 0; n < r.length; n++) z.add(r[n]);
  }
  var he = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Z = Object.prototype.hasOwnProperty, G = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, me = {}, K = {};
  function ce(n) {
    return Z.call(K, n) ? !0 : Z.call(me, n) ? !1 : G.test(n) ? K[n] = !0 : (me[n] = !0, !1);
  }
  function ae(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function ge(n, r, l, o) {
    if (r === null || typeof r > "u" || ae(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function Me(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var $e = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    $e[n] = new Me(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    $e[r] = new Me(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    $e[n] = new Me(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    $e[n] = new Me(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    $e[n] = new Me(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    $e[n] = new Me(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    $e[n] = new Me(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    $e[n] = new Me(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    $e[n] = new Me(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var tt = /[\-:]([a-z])/g;
  function Le(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      tt,
      Le
    );
    $e[r] = new Me(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(tt, Le);
    $e[r] = new Me(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(tt, Le);
    $e[r] = new Me(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    $e[n] = new Me(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), $e.xlinkHref = new Me("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    $e[n] = new Me(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Se(n, r, l, o) {
    var c = $e.hasOwnProperty(r) ? $e[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (ge(r, l, c, o) && (l = null), o || c === null ? ce(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var Ue = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, $ = Symbol.for("react.element"), Be = Symbol.for("react.portal"), pe = Symbol.for("react.fragment"), nn = Symbol.for("react.strict_mode"), En = Symbol.for("react.profiler"), Ht = Symbol.for("react.provider"), Ot = Symbol.for("react.context"), mn = Symbol.for("react.forward_ref"), Ye = Symbol.for("react.suspense"), lt = Symbol.for("react.suspense_list"), Lt = Symbol.for("react.memo"), Tt = Symbol.for("react.lazy"), xe = Symbol.for("react.offscreen"), ie = Symbol.iterator;
  function Ne(n) {
    return n === null || typeof n != "object" ? null : (n = ie && n[ie] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var se = Object.assign, O;
  function W(n) {
    if (O === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      O = r && r[1] || "";
    }
    return `
` + O + n;
  }
  var We = !1;
  function Ze(n, r) {
    if (!n || We) return "";
    We = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (j) {
          var o = j;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (j) {
          o = j;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (j) {
          o = j;
        }
        n();
      }
    } catch (j) {
      if (j && o && typeof j.stack == "string") {
        for (var c = j.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, T = d.length - 1; 1 <= m && 0 <= T && c[m] !== d[T]; ) T--;
        for (; 1 <= m && 0 <= T; m--, T--) if (c[m] !== d[T]) {
          if (m !== 1 || T !== 1)
            do
              if (m--, T--, 0 > T || c[m] !== d[T]) {
                var x = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", n.displayName)), x;
              }
            while (1 <= m && 0 <= T);
          break;
        }
      }
    } finally {
      We = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? W(n) : "";
  }
  function ct(n) {
    switch (n.tag) {
      case 5:
        return W(n.type);
      case 16:
        return W("Lazy");
      case 13:
        return W("Suspense");
      case 19:
        return W("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Ze(n.type, !1), n;
      case 11:
        return n = Ze(n.type.render, !1), n;
      case 1:
        return n = Ze(n.type, !0), n;
      default:
        return "";
    }
  }
  function ot(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case pe:
        return "Fragment";
      case Be:
        return "Portal";
      case En:
        return "Profiler";
      case nn:
        return "StrictMode";
      case Ye:
        return "Suspense";
      case lt:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Ot:
        return (n.displayName || "Context") + ".Consumer";
      case Ht:
        return (n._context.displayName || "Context") + ".Provider";
      case mn:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case Lt:
        return r = n.displayName || null, r !== null ? r : ot(n.type) || "Memo";
      case Tt:
        r = n._payload, n = n._init;
        try {
          return ot(n(r));
        } catch {
        }
    }
    return null;
  }
  function St(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ot(r);
      case 8:
        return r === nn ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function dt(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function pt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Xt(n) {
    var r = pt(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Zn(n) {
    n._valueTracker || (n._valueTracker = Xt(n));
  }
  function we(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = pt(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function rn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Cn(n, r) {
    var l = r.checked;
    return se({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function kn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = dt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Hn(n, r) {
    r = r.checked, r != null && Se(n, "checked", r, !1);
  }
  function An(n, r) {
    Hn(n, r);
    var l = dt(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? qr(n, r.type, l) : r.hasOwnProperty("defaultValue") && qr(n, r.type, dt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Gr(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function qr(n, r, l) {
    (r !== "number" || rn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var Jn = Array.isArray;
  function Cr(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + dt(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Kr(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(R(91));
    return se({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function Rr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(R(92));
        if (Jn(l)) {
          if (1 < l.length) throw Error(R(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: dt(l) };
  }
  function Sa(n, r) {
    var l = dt(r.value), o = dt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function sr(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Xr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Rn(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Xr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Or, Ei = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Or = Or || document.createElement("div"), Or.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Or.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Ea(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var oe = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, He = ["Webkit", "ms", "Moz", "O"];
  Object.keys(oe).forEach(function(n) {
    He.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), oe[r] = oe[n];
    });
  });
  function vt(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || oe.hasOwnProperty(n) && oe[n] ? ("" + r).trim() : r + "px";
  }
  function jt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = vt(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var Vt = se({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function zn(n, r) {
    if (r) {
      if (Vt[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(R(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(R(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(R(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(R(62));
    }
  }
  function Tn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Tr = null;
  function Qt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var Mr = null, $t = null, Bt = null;
  function ui(n) {
    if (n = Es(n)) {
      if (typeof Mr != "function") throw Error(R(280));
      var r = n.stateNode;
      r && (r = Ie(r), Mr(n.stateNode, n.type, r));
    }
  }
  function za(n) {
    $t ? Bt ? Bt.push(n) : Bt = [n] : $t = n;
  }
  function yl() {
    if ($t) {
      var n = $t, r = Bt;
      if (Bt = $t = null, ui(n), r) for (n = 0; n < r.length; n++) ui(r[n]);
    }
  }
  function au(n, r) {
    return n(r);
  }
  function Iu() {
  }
  var Vi = !1;
  function gl(n, r, l) {
    if (Vi) return n(r, l);
    Vi = !0;
    try {
      return au(n, r, l);
    } finally {
      Vi = !1, ($t !== null || Bt !== null) && (Iu(), yl());
    }
  }
  function Ca(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = Ie(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(R(231, r, typeof l));
    return l;
  }
  var Ci = !1;
  if (he) try {
    var Ra = {};
    Object.defineProperty(Ra, "passive", { get: function() {
      Ci = !0;
    } }), window.addEventListener("test", Ra, Ra), window.removeEventListener("test", Ra, Ra);
  } catch {
    Ci = !1;
  }
  function oi(n, r, l, o, c, d, m, T, x) {
    var j = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, j);
    } catch (ee) {
      this.onError(ee);
    }
  }
  var Lr = !1, Ta = null, Ri = !1, Ti = null, b = { onError: function(n) {
    Lr = !0, Ta = n;
  } };
  function J(n, r, l, o, c, d, m, T, x) {
    Lr = !1, Ta = null, oi.apply(b, arguments);
  }
  function re(n, r, l, o, c, d, m, T, x) {
    if (J.apply(this, arguments), Lr) {
      if (Lr) {
        var j = Ta;
        Lr = !1, Ta = null;
      } else throw Error(R(198));
      Ri || (Ri = !0, Ti = j);
    }
  }
  function Fe(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function Et(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function wt(n) {
    if (Fe(n) !== n) throw Error(R(188));
  }
  function qe(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Fe(n), r === null) throw Error(R(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return wt(c), n;
          if (d === o) return wt(c), r;
          d = d.sibling;
        }
        throw Error(R(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var m = !1, T = c.child; T; ) {
          if (T === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (T === o) {
            m = !0, o = c, l = d;
            break;
          }
          T = T.sibling;
        }
        if (!m) {
          for (T = d.child; T; ) {
            if (T === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (T === o) {
              m = !0, o = d, l = c;
              break;
            }
            T = T.sibling;
          }
          if (!m) throw Error(R(189));
        }
      }
      if (l.alternate !== o) throw Error(R(190));
    }
    if (l.tag !== 3) throw Error(R(188));
    return l.stateNode.current === l ? n : r;
  }
  function ht(n) {
    return n = qe(n), n !== null ? Vn(n) : null;
  }
  function Vn(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = Vn(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var an = E.unstable_scheduleCallback, fn = E.unstable_cancelCallback, wr = E.unstable_shouldYield, wi = E.unstable_requestPaint, Nt = E.unstable_now, er = E.unstable_getCurrentPriorityLevel, Nr = E.unstable_ImmediatePriority, mt = E.unstable_UserBlockingPriority, Ua = E.unstable_NormalPriority, Sl = E.unstable_LowPriority, Yu = E.unstable_IdlePriority, El = null, Zr = null;
  function rs(n) {
    if (Zr && typeof Zr.onCommitFiberRoot == "function") try {
      Zr.onCommitFiberRoot(El, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Ar = Math.clz32 ? Math.clz32 : cc, as = Math.log, is = Math.LN2;
  function cc(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (as(n) / is | 0) | 0;
  }
  var Wu = 64, Cl = 4194304;
  function si(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function zr(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var T = m & ~c;
      T !== 0 ? o = si(T) : (d &= m, d !== 0 && (o = si(d)));
    } else m = l & ~c, m !== 0 ? o = si(m) : d !== 0 && (o = si(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - Ar(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Rl(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Tl(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - Ar(d), T = 1 << m, x = c[m];
      x === -1 ? (!(T & l) || T & o) && (c[m] = Rl(T, r)) : x <= r && (n.expiredLanes |= T), d &= ~T;
    }
  }
  function wl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Qu() {
    var n = Wu;
    return Wu <<= 1, !(Wu & 4194240) && (Wu = 64), n;
  }
  function Gu(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function $i(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Ar(r), n[r] = l;
  }
  function ad(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - Ar(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function bi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - Ar(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var At = 0;
  function qu(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var iu, Ku, bt, Xu, Zu, at = !1, lu = [], wn = null, Jr = null, Ur = null, bl = /* @__PURE__ */ new Map(), Dn = /* @__PURE__ */ new Map(), It = [], fc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ea(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        wn = null;
        break;
      case "dragenter":
      case "dragleave":
        Jr = null;
        break;
      case "mouseover":
      case "mouseout":
        Ur = null;
        break;
      case "pointerover":
      case "pointerout":
        bl.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Dn.delete(r.pointerId);
    }
  }
  function tr(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = Es(r), r !== null && Ku(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function xi(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return wn = tr(wn, n, r, l, o, c), !0;
      case "dragenter":
        return Jr = tr(Jr, n, r, l, o, c), !0;
      case "mouseover":
        return Ur = tr(Ur, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return bl.set(d, tr(bl.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, Dn.set(d, tr(Dn.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function dc(n) {
    var r = Ha(n.target);
    if (r !== null) {
      var l = Fe(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Et(l), r !== null) {
            n.blockedOn = r, Zu(n.priority, function() {
              bt(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Bi(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = eo(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Tr = o, l.target.dispatchEvent(o), Tr = null;
      } else return r = Es(l), r !== null && Ku(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function xl(n, r, l) {
    Bi(n) && l.delete(r);
  }
  function pc() {
    at = !1, wn !== null && Bi(wn) && (wn = null), Jr !== null && Bi(Jr) && (Jr = null), Ur !== null && Bi(Ur) && (Ur = null), bl.forEach(xl), Dn.forEach(xl);
  }
  function Fa(n, r) {
    n.blockedOn === r && (n.blockedOn = null, at || (at = !0, E.unstable_scheduleCallback(E.unstable_NormalPriority, pc)));
  }
  function _l(n) {
    function r(c) {
      return Fa(c, n);
    }
    if (0 < lu.length) {
      Fa(lu[0], n);
      for (var l = 1; l < lu.length; l++) {
        var o = lu[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (wn !== null && Fa(wn, n), Jr !== null && Fa(Jr, n), Ur !== null && Fa(Ur, n), bl.forEach(r), Dn.forEach(r), l = 0; l < It.length; l++) o = It[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < It.length && (l = It[0], l.blockedOn === null); ) dc(l), l.blockedOn === null && It.shift();
  }
  var Ii = Ue.ReactCurrentBatchConfig, ja = !0;
  function Ju(n, r, l, o) {
    var c = At, d = Ii.transition;
    Ii.transition = null;
    try {
      At = 1, Dl(n, r, l, o);
    } finally {
      At = c, Ii.transition = d;
    }
  }
  function kl(n, r, l, o) {
    var c = At, d = Ii.transition;
    Ii.transition = null;
    try {
      At = 4, Dl(n, r, l, o);
    } finally {
      At = c, Ii.transition = d;
    }
  }
  function Dl(n, r, l, o) {
    if (ja) {
      var c = eo(n, r, l, o);
      if (c === null) Rc(n, r, o, uu, l), ea(n, o);
      else if (xi(c, n, r, l, o)) o.stopPropagation();
      else if (ea(n, o), r & 4 && -1 < fc.indexOf(n)) {
        for (; c !== null; ) {
          var d = Es(c);
          if (d !== null && iu(d), d = eo(n, r, l, o), d === null && Rc(n, r, o, uu, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else Rc(n, r, o, null, l);
    }
  }
  var uu = null;
  function eo(n, r, l, o) {
    if (uu = null, n = Qt(o), n = Ha(n), n !== null) if (r = Fe(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Et(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return uu = n, null;
  }
  function ls(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (er()) {
          case Nr:
            return 1;
          case mt:
            return 4;
          case Ua:
          case Sl:
            return 16;
          case Yu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ci = null, h = null, w = null;
  function F() {
    if (w) return w;
    var n, r = h, l = r.length, o, c = "value" in ci ? ci.value : ci.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++) ;
    return w = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function V(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function le() {
    return !0;
  }
  function Ke() {
    return !1;
  }
  function ve(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var T in n) n.hasOwnProperty(T) && (l = n[T], this[T] = l ? l(d) : d[T]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? le : Ke, this.isPropagationStopped = Ke, this;
    }
    return se(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = le);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = le);
    }, persist: function() {
    }, isPersistent: le }), r;
  }
  var Ge = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, yt = ve(Ge), Mt = se({}, Ge, { view: 0, detail: 0 }), ln = ve(Mt), Gt, un, sn, xt = se({}, Mt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: sd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== sn && (sn && n.type === "mousemove" ? (Gt = n.screenX - sn.screenX, un = n.screenY - sn.screenY) : un = Gt = 0, sn = n), Gt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : un;
  } }), Yi = ve(xt), to = se({}, xt, { dataTransfer: 0 }), us = ve(to), id = se({}, Mt, { relatedTarget: 0 }), fi = ve(id), os = se({}, Ge, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ss = ve(os), ld = se({}, Ge, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), my = ve(ld), yy = se({}, Ge, { data: 0 }), ud = ve(yy), od = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, mv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, yv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function gv(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = yv[n]) ? !!r[n] : !1;
  }
  function sd() {
    return gv;
  }
  var Wi = se({}, Mt, { key: function(n) {
    if (n.key) {
      var r = od[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = V(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? mv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: sd, charCode: function(n) {
    return n.type === "keypress" ? V(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? V(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), gy = ve(Wi), cd = se({}, xt, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), vc = ve(cd), fd = se({}, Mt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: sd }), Sy = ve(fd), hc = se({}, Ge, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Sv = ve(hc), ta = se({}, xt, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Qi = ve(ta), $n = [9, 13, 27, 32], di = he && "CompositionEvent" in window, ou = null;
  he && "documentMode" in document && (ou = document.documentMode);
  var mc = he && "TextEvent" in window && !ou, Ev = he && (!di || ou && 8 < ou && 11 >= ou), no = " ", Cv = !1;
  function Rv(n, r) {
    switch (n) {
      case "keyup":
        return $n.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function yc(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var ro = !1;
  function Ey(n, r) {
    switch (n) {
      case "compositionend":
        return yc(r);
      case "keypress":
        return r.which !== 32 ? null : (Cv = !0, no);
      case "textInput":
        return n = r.data, n === no && Cv ? null : n;
      default:
        return null;
    }
  }
  function Cy(n, r) {
    if (ro) return n === "compositionend" || !di && Rv(n, r) ? (n = F(), w = h = ci = null, ro = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return Ev && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Tv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function wv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Tv[n.type] : r === "textarea";
  }
  function bv(n, r, l, o) {
    za(o), r = ys(r, "onChange"), 0 < r.length && (l = new yt("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var cs = null, ao = null;
  function io(n) {
    Cc(n, 0);
  }
  function lo(n) {
    var r = oo(n);
    if (we(r)) return n;
  }
  function xv(n, r) {
    if (n === "change") return r;
  }
  var dd = !1;
  if (he) {
    var pd;
    if (he) {
      var vd = "oninput" in document;
      if (!vd) {
        var _v = document.createElement("div");
        _v.setAttribute("oninput", "return;"), vd = typeof _v.oninput == "function";
      }
      pd = vd;
    } else pd = !1;
    dd = pd && (!document.documentMode || 9 < document.documentMode);
  }
  function kv() {
    cs && (cs.detachEvent("onpropertychange", Dv), ao = cs = null);
  }
  function Dv(n) {
    if (n.propertyName === "value" && lo(ao)) {
      var r = [];
      bv(r, ao, n, Qt(n)), gl(io, r);
    }
  }
  function Ry(n, r, l) {
    n === "focusin" ? (kv(), cs = r, ao = l, cs.attachEvent("onpropertychange", Dv)) : n === "focusout" && kv();
  }
  function Ty(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return lo(ao);
  }
  function wy(n, r) {
    if (n === "click") return lo(r);
  }
  function Ov(n, r) {
    if (n === "input" || n === "change") return lo(r);
  }
  function by(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Pa = typeof Object.is == "function" ? Object.is : by;
  function fs(n, r) {
    if (Pa(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!Z.call(r, c) || !Pa(n[c], r[c])) return !1;
    }
    return !0;
  }
  function Mv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Lv(n, r) {
    var l = Mv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Mv(l);
    }
  }
  function Nv(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Nv(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function gc() {
    for (var n = window, r = rn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = rn(n.document);
    }
    return r;
  }
  function Gi(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function Sc(n) {
    var r = gc(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Nv(l.ownerDocument.documentElement, l)) {
      if (o !== null && Gi(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = Lv(l, d);
          var m = Lv(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var Av = he && "documentMode" in document && 11 >= document.documentMode, pi = null, hd = null, ds = null, md = !1;
  function zv(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    md || pi == null || pi !== rn(o) || (o = pi, "selectionStart" in o && Gi(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ds && fs(ds, o) || (ds = o, o = ys(hd, "onSelect"), 0 < o.length && (r = new yt("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = pi)));
  }
  function Ec(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var su = { animationend: Ec("Animation", "AnimationEnd"), animationiteration: Ec("Animation", "AnimationIteration"), animationstart: Ec("Animation", "AnimationStart"), transitionend: Ec("Transition", "TransitionEnd") }, yd = {}, gd = {};
  he && (gd = document.createElement("div").style, "AnimationEvent" in window || (delete su.animationend.animation, delete su.animationiteration.animation, delete su.animationstart.animation), "TransitionEvent" in window || delete su.transitionend.transition);
  function nr(n) {
    if (yd[n]) return yd[n];
    if (!su[n]) return n;
    var r = su[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in gd) return yd[n] = r[l];
    return n;
  }
  var Sd = nr("animationend"), Uv = nr("animationiteration"), Fv = nr("animationstart"), jv = nr("transitionend"), Pv = /* @__PURE__ */ new Map(), Hv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function qi(n, r) {
    Pv.set(n, r), Y(r, [n]);
  }
  for (var ps = 0; ps < Hv.length; ps++) {
    var cu = Hv[ps], xy = cu.toLowerCase(), vs = cu[0].toUpperCase() + cu.slice(1);
    qi(xy, "on" + vs);
  }
  qi(Sd, "onAnimationEnd"), qi(Uv, "onAnimationIteration"), qi(Fv, "onAnimationStart"), qi("dblclick", "onDoubleClick"), qi("focusin", "onFocus"), qi("focusout", "onBlur"), qi(jv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), Y("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Y("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Y("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Y("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Y("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Y("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var hs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _y = new Set("cancel close invalid load scroll toggle".split(" ").concat(hs));
  function Vv(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, re(o, r, void 0, n), n.currentTarget = null;
  }
  function Cc(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var T = o[m], x = T.instance, j = T.currentTarget;
          if (T = T.listener, x !== d && c.isPropagationStopped()) break e;
          Vv(c, T, j), d = x;
        }
        else for (m = 0; m < o.length; m++) {
          if (T = o[m], x = T.instance, j = T.currentTarget, T = T.listener, x !== d && c.isPropagationStopped()) break e;
          Vv(c, T, j), d = x;
        }
      }
    }
    if (Ri) throw n = Ti, Ri = !1, Ti = null, n;
  }
  function on(n, r) {
    var l = r[xd];
    l === void 0 && (l = r[xd] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || ($v(r, n, 2, !1), l.add(o));
  }
  function Ol(n, r, l) {
    var o = 0;
    r && (o |= 4), $v(l, n, o, r);
  }
  var Ki = "_reactListening" + Math.random().toString(36).slice(2);
  function uo(n) {
    if (!n[Ki]) {
      n[Ki] = !0, z.forEach(function(l) {
        l !== "selectionchange" && (_y.has(l) || Ol(l, !1, n), Ol(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Ki] || (r[Ki] = !0, Ol("selectionchange", !1, r));
    }
  }
  function $v(n, r, l, o) {
    switch (ls(r)) {
      case 1:
        var c = Ju;
        break;
      case 4:
        c = kl;
        break;
      default:
        c = Dl;
    }
    l = c.bind(null, r, l, n), c = void 0, !Ci || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function Rc(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var m = o.tag;
      if (m === 3 || m === 4) {
        var T = o.stateNode.containerInfo;
        if (T === c || T.nodeType === 8 && T.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var x = m.tag;
          if ((x === 3 || x === 4) && (x = m.stateNode.containerInfo, x === c || x.nodeType === 8 && x.parentNode === c)) return;
          m = m.return;
        }
        for (; T !== null; ) {
          if (m = Ha(T), m === null) return;
          if (x = m.tag, x === 5 || x === 6) {
            o = d = m;
            continue e;
          }
          T = T.parentNode;
        }
      }
      o = o.return;
    }
    gl(function() {
      var j = d, ee = Qt(l), te = [];
      e: {
        var X = Pv.get(n);
        if (X !== void 0) {
          var Ce = yt, _e = n;
          switch (n) {
            case "keypress":
              if (V(l) === 0) break e;
            case "keydown":
            case "keyup":
              Ce = gy;
              break;
            case "focusin":
              _e = "focus", Ce = fi;
              break;
            case "focusout":
              _e = "blur", Ce = fi;
              break;
            case "beforeblur":
            case "afterblur":
              Ce = fi;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Ce = Yi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Ce = us;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Ce = Sy;
              break;
            case Sd:
            case Uv:
            case Fv:
              Ce = ss;
              break;
            case jv:
              Ce = Sv;
              break;
            case "scroll":
              Ce = ln;
              break;
            case "wheel":
              Ce = Qi;
              break;
            case "copy":
            case "cut":
            case "paste":
              Ce = my;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Ce = vc;
          }
          var Oe = (r & 4) !== 0, jn = !Oe && n === "scroll", M = Oe ? X !== null ? X + "Capture" : null : X;
          Oe = [];
          for (var k = j, A; k !== null; ) {
            A = k;
            var ue = A.stateNode;
            if (A.tag === 5 && ue !== null && (A = ue, M !== null && (ue = Ca(k, M), ue != null && Oe.push(ms(k, ue, A)))), jn) break;
            k = k.return;
          }
          0 < Oe.length && (X = new Ce(X, _e, null, l, ee), te.push({ event: X, listeners: Oe }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (X = n === "mouseover" || n === "pointerover", Ce = n === "mouseout" || n === "pointerout", X && l !== Tr && (_e = l.relatedTarget || l.fromElement) && (Ha(_e) || _e[Xi])) break e;
          if ((Ce || X) && (X = ee.window === ee ? ee : (X = ee.ownerDocument) ? X.defaultView || X.parentWindow : window, Ce ? (_e = l.relatedTarget || l.toElement, Ce = j, _e = _e ? Ha(_e) : null, _e !== null && (jn = Fe(_e), _e !== jn || _e.tag !== 5 && _e.tag !== 6) && (_e = null)) : (Ce = null, _e = j), Ce !== _e)) {
            if (Oe = Yi, ue = "onMouseLeave", M = "onMouseEnter", k = "mouse", (n === "pointerout" || n === "pointerover") && (Oe = vc, ue = "onPointerLeave", M = "onPointerEnter", k = "pointer"), jn = Ce == null ? X : oo(Ce), A = _e == null ? X : oo(_e), X = new Oe(ue, k + "leave", Ce, l, ee), X.target = jn, X.relatedTarget = A, ue = null, Ha(ee) === j && (Oe = new Oe(M, k + "enter", _e, l, ee), Oe.target = A, Oe.relatedTarget = jn, ue = Oe), jn = ue, Ce && _e) t: {
              for (Oe = Ce, M = _e, k = 0, A = Oe; A; A = fu(A)) k++;
              for (A = 0, ue = M; ue; ue = fu(ue)) A++;
              for (; 0 < k - A; ) Oe = fu(Oe), k--;
              for (; 0 < A - k; ) M = fu(M), A--;
              for (; k--; ) {
                if (Oe === M || M !== null && Oe === M.alternate) break t;
                Oe = fu(Oe), M = fu(M);
              }
              Oe = null;
            }
            else Oe = null;
            Ce !== null && Ed(te, X, Ce, Oe, !1), _e !== null && jn !== null && Ed(te, jn, _e, Oe, !0);
          }
        }
        e: {
          if (X = j ? oo(j) : window, Ce = X.nodeName && X.nodeName.toLowerCase(), Ce === "select" || Ce === "input" && X.type === "file") var ze = xv;
          else if (wv(X)) if (dd) ze = Ov;
          else {
            ze = Ty;
            var Xe = Ry;
          }
          else (Ce = X.nodeName) && Ce.toLowerCase() === "input" && (X.type === "checkbox" || X.type === "radio") && (ze = wy);
          if (ze && (ze = ze(n, j))) {
            bv(te, ze, l, ee);
            break e;
          }
          Xe && Xe(n, X, j), n === "focusout" && (Xe = X._wrapperState) && Xe.controlled && X.type === "number" && qr(X, "number", X.value);
        }
        switch (Xe = j ? oo(j) : window, n) {
          case "focusin":
            (wv(Xe) || Xe.contentEditable === "true") && (pi = Xe, hd = j, ds = null);
            break;
          case "focusout":
            ds = hd = pi = null;
            break;
          case "mousedown":
            md = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            md = !1, zv(te, l, ee);
            break;
          case "selectionchange":
            if (Av) break;
          case "keydown":
          case "keyup":
            zv(te, l, ee);
        }
        var ke;
        if (di) e: {
          switch (n) {
            case "compositionstart":
              var Je = "onCompositionStart";
              break e;
            case "compositionend":
              Je = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Je = "onCompositionUpdate";
              break e;
          }
          Je = void 0;
        }
        else ro ? Rv(n, l) && (Je = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Je = "onCompositionStart");
        Je && (Ev && l.locale !== "ko" && (ro || Je !== "onCompositionStart" ? Je === "onCompositionEnd" && ro && (ke = F()) : (ci = ee, h = "value" in ci ? ci.value : ci.textContent, ro = !0)), Xe = ys(j, Je), 0 < Xe.length && (Je = new ud(Je, n, null, l, ee), te.push({ event: Je, listeners: Xe }), ke ? Je.data = ke : (ke = yc(l), ke !== null && (Je.data = ke)))), (ke = mc ? Ey(n, l) : Cy(n, l)) && (j = ys(j, "onBeforeInput"), 0 < j.length && (ee = new ud("onBeforeInput", "beforeinput", null, l, ee), te.push({ event: ee, listeners: j }), ee.data = ke));
      }
      Cc(te, r);
    });
  }
  function ms(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function ys(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = Ca(n, l), d != null && o.unshift(ms(n, d, c)), d = Ca(n, r), d != null && o.push(ms(n, d, c))), n = n.return;
    }
    return o;
  }
  function fu(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Ed(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var T = l, x = T.alternate, j = T.stateNode;
      if (x !== null && x === o) break;
      T.tag === 5 && j !== null && (T = j, c ? (x = Ca(l, d), x != null && m.unshift(ms(l, x, T))) : c || (x = Ca(l, d), x != null && m.push(ms(l, x, T)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var Cd = /\r\n?/g, ky = /\u0000|\uFFFD/g;
  function Rd(n) {
    return (typeof n == "string" ? n : "" + n).replace(Cd, `
`).replace(ky, "");
  }
  function Tc(n, r, l) {
    if (r = Rd(r), Rd(n) !== r && l) throw Error(R(425));
  }
  function wc() {
  }
  var Td = null, du = null;
  function gs(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var pu = typeof setTimeout == "function" ? setTimeout : void 0, Bv = typeof clearTimeout == "function" ? clearTimeout : void 0, wd = typeof Promise == "function" ? Promise : void 0, bd = typeof queueMicrotask == "function" ? queueMicrotask : typeof wd < "u" ? function(n) {
    return wd.resolve(null).then(n).catch(Dy);
  } : pu;
  function Dy(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Ml(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), _l(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    _l(r);
  }
  function vi(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Ss(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Ll = Math.random().toString(36).slice(2), _i = "__reactFiber$" + Ll, vu = "__reactProps$" + Ll, Xi = "__reactContainer$" + Ll, xd = "__reactEvents$" + Ll, Oy = "__reactListeners$" + Ll, _d = "__reactHandles$" + Ll;
  function Ha(n) {
    var r = n[_i];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Xi] || l[_i]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Ss(n); n !== null; ) {
          if (l = n[_i]) return l;
          n = Ss(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function Es(n) {
    return n = n[_i] || n[Xi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function oo(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(R(33));
  }
  function Ie(n) {
    return n[vu] || null;
  }
  var Nl = [], dn = -1;
  function ft(n) {
    return { current: n };
  }
  function Pt(n) {
    0 > dn || (n.current = Nl[dn], Nl[dn] = null, dn--);
  }
  function Yt(n, r) {
    dn++, Nl[dn] = n.current, n.current = r;
  }
  var ki = {}, nt = ft(ki), On = ft(!1), na = ki;
  function Va(n, r) {
    var l = n.type.contextTypes;
    if (!l) return ki;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function yn(n) {
    return n = n.childContextTypes, n != null;
  }
  function $a() {
    Pt(On), Pt(nt);
  }
  function Al(n, r, l) {
    if (nt.current !== ki) throw Error(R(168));
    Yt(nt, r), Yt(On, l);
  }
  function Cs(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(R(108, St(n) || "Unknown", c));
    return se({}, l, o);
  }
  function bc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || ki, na = nt.current, Yt(nt, n), Yt(On, On.current), !0;
  }
  function Iv(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(R(169));
    l ? (n = Cs(n, r, na), o.__reactInternalMemoizedMergedChildContext = n, Pt(On), Pt(nt), Yt(nt, n)) : Pt(On), Yt(On, l);
  }
  var wa = null, rr = !1, Rs = !1;
  function kd(n) {
    wa === null ? wa = [n] : wa.push(n);
  }
  function Dd(n) {
    rr = !0, kd(n);
  }
  function ra() {
    if (!Rs && wa !== null) {
      Rs = !0;
      var n = 0, r = At;
      try {
        var l = wa;
        for (At = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        wa = null, rr = !1;
      } catch (c) {
        throw wa !== null && (wa = wa.slice(n + 1)), an(Nr, ra), c;
      } finally {
        At = r, Rs = !1;
      }
    }
    return null;
  }
  var zl = [], aa = 0, hu = null, so = 0, ia = [], br = 0, Ba = null, cr = 1, Zi = "";
  function ba(n, r) {
    zl[aa++] = so, zl[aa++] = hu, hu = n, so = r;
  }
  function Od(n, r, l) {
    ia[br++] = cr, ia[br++] = Zi, ia[br++] = Ba, Ba = n;
    var o = cr;
    n = Zi;
    var c = 32 - Ar(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - Ar(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, cr = 1 << 32 - Ar(r) + c | l << c | o, Zi = d + n;
    } else cr = 1 << d | l << c | o, Zi = n;
  }
  function xc(n) {
    n.return !== null && (ba(n, 1), Od(n, 1, 0));
  }
  function Md(n) {
    for (; n === hu; ) hu = zl[--aa], zl[aa] = null, so = zl[--aa], zl[aa] = null;
    for (; n === Ba; ) Ba = ia[--br], ia[br] = null, Zi = ia[--br], ia[br] = null, cr = ia[--br], ia[br] = null;
  }
  var xa = null, la = null, pn = !1, Ia = null;
  function Ld(n, r) {
    var l = Za(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Yv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, xa = n, la = vi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, xa = n, la = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = Ba !== null ? { id: cr, overflow: Zi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Za(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, xa = n, la = null, !0) : !1;
      default:
        return !1;
    }
  }
  function _c(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function kc(n) {
    if (pn) {
      var r = la;
      if (r) {
        var l = r;
        if (!Yv(n, r)) {
          if (_c(n)) throw Error(R(418));
          r = vi(l.nextSibling);
          var o = xa;
          r && Yv(n, r) ? Ld(o, l) : (n.flags = n.flags & -4097 | 2, pn = !1, xa = n);
        }
      } else {
        if (_c(n)) throw Error(R(418));
        n.flags = n.flags & -4097 | 2, pn = !1, xa = n;
      }
    }
  }
  function Wv(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    xa = n;
  }
  function Dc(n) {
    if (n !== xa) return !1;
    if (!pn) return Wv(n), pn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !gs(n.type, n.memoizedProps)), r && (r = la)) {
      if (_c(n)) throw Qv(), Error(R(418));
      for (; r; ) Ld(n, r), r = vi(r.nextSibling);
    }
    if (Wv(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(R(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                la = vi(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        la = null;
      }
    } else la = xa ? vi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Qv() {
    for (var n = la; n; ) n = vi(n.nextSibling);
  }
  function bn() {
    la = xa = null, pn = !1;
  }
  function Nd(n) {
    Ia === null ? Ia = [n] : Ia.push(n);
  }
  var Oc = Ue.ReactCurrentBatchConfig;
  function mu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(R(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(R(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var T = c.refs;
          m === null ? delete T[d] : T[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(R(284));
      if (!l._owner) throw Error(R(290, n));
    }
    return n;
  }
  function Di(n, r) {
    throw n = Object.prototype.toString.call(r), Error(R(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Gv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Mc(n) {
    function r(M, k) {
      if (n) {
        var A = M.deletions;
        A === null ? (M.deletions = [k], M.flags |= 16) : A.push(k);
      }
    }
    function l(M, k) {
      if (!n) return null;
      for (; k !== null; ) r(M, k), k = k.sibling;
      return null;
    }
    function o(M, k) {
      for (M = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? M.set(k.key, k) : M.set(k.index, k), k = k.sibling;
      return M;
    }
    function c(M, k) {
      return M = Bl(M, k), M.index = 0, M.sibling = null, M;
    }
    function d(M, k, A) {
      return M.index = A, n ? (A = M.alternate, A !== null ? (A = A.index, A < k ? (M.flags |= 2, k) : A) : (M.flags |= 2, k)) : (M.flags |= 1048576, k);
    }
    function m(M) {
      return n && M.alternate === null && (M.flags |= 2), M;
    }
    function T(M, k, A, ue) {
      return k === null || k.tag !== 6 ? (k = Sf(A, M.mode, ue), k.return = M, k) : (k = c(k, A), k.return = M, k);
    }
    function x(M, k, A, ue) {
      var ze = A.type;
      return ze === pe ? ee(M, k, A.props.children, ue, A.key) : k !== null && (k.elementType === ze || typeof ze == "object" && ze !== null && ze.$$typeof === Tt && Gv(ze) === k.type) ? (ue = c(k, A.props), ue.ref = mu(M, k, A), ue.return = M, ue) : (ue = yf(A.type, A.key, A.props, null, M.mode, ue), ue.ref = mu(M, k, A), ue.return = M, ue);
    }
    function j(M, k, A, ue) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== A.containerInfo || k.stateNode.implementation !== A.implementation ? (k = Hs(A, M.mode, ue), k.return = M, k) : (k = c(k, A.children || []), k.return = M, k);
    }
    function ee(M, k, A, ue, ze) {
      return k === null || k.tag !== 7 ? (k = Mu(A, M.mode, ue, ze), k.return = M, k) : (k = c(k, A), k.return = M, k);
    }
    function te(M, k, A) {
      if (typeof k == "string" && k !== "" || typeof k == "number") return k = Sf("" + k, M.mode, A), k.return = M, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case $:
            return A = yf(k.type, k.key, k.props, null, M.mode, A), A.ref = mu(M, null, k), A.return = M, A;
          case Be:
            return k = Hs(k, M.mode, A), k.return = M, k;
          case Tt:
            var ue = k._init;
            return te(M, ue(k._payload), A);
        }
        if (Jn(k) || Ne(k)) return k = Mu(k, M.mode, A, null), k.return = M, k;
        Di(M, k);
      }
      return null;
    }
    function X(M, k, A, ue) {
      var ze = k !== null ? k.key : null;
      if (typeof A == "string" && A !== "" || typeof A == "number") return ze !== null ? null : T(M, k, "" + A, ue);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case $:
            return A.key === ze ? x(M, k, A, ue) : null;
          case Be:
            return A.key === ze ? j(M, k, A, ue) : null;
          case Tt:
            return ze = A._init, X(
              M,
              k,
              ze(A._payload),
              ue
            );
        }
        if (Jn(A) || Ne(A)) return ze !== null ? null : ee(M, k, A, ue, null);
        Di(M, A);
      }
      return null;
    }
    function Ce(M, k, A, ue, ze) {
      if (typeof ue == "string" && ue !== "" || typeof ue == "number") return M = M.get(A) || null, T(k, M, "" + ue, ze);
      if (typeof ue == "object" && ue !== null) {
        switch (ue.$$typeof) {
          case $:
            return M = M.get(ue.key === null ? A : ue.key) || null, x(k, M, ue, ze);
          case Be:
            return M = M.get(ue.key === null ? A : ue.key) || null, j(k, M, ue, ze);
          case Tt:
            var Xe = ue._init;
            return Ce(M, k, A, Xe(ue._payload), ze);
        }
        if (Jn(ue) || Ne(ue)) return M = M.get(A) || null, ee(k, M, ue, ze, null);
        Di(k, ue);
      }
      return null;
    }
    function _e(M, k, A, ue) {
      for (var ze = null, Xe = null, ke = k, Je = k = 0, Kn = null; ke !== null && Je < A.length; Je++) {
        ke.index > Je ? (Kn = ke, ke = null) : Kn = ke.sibling;
        var zt = X(M, ke, A[Je], ue);
        if (zt === null) {
          ke === null && (ke = Kn);
          break;
        }
        n && ke && zt.alternate === null && r(M, ke), k = d(zt, k, Je), Xe === null ? ze = zt : Xe.sibling = zt, Xe = zt, ke = Kn;
      }
      if (Je === A.length) return l(M, ke), pn && ba(M, Je), ze;
      if (ke === null) {
        for (; Je < A.length; Je++) ke = te(M, A[Je], ue), ke !== null && (k = d(ke, k, Je), Xe === null ? ze = ke : Xe.sibling = ke, Xe = ke);
        return pn && ba(M, Je), ze;
      }
      for (ke = o(M, ke); Je < A.length; Je++) Kn = Ce(ke, M, Je, A[Je], ue), Kn !== null && (n && Kn.alternate !== null && ke.delete(Kn.key === null ? Je : Kn.key), k = d(Kn, k, Je), Xe === null ? ze = Kn : Xe.sibling = Kn, Xe = Kn);
      return n && ke.forEach(function(il) {
        return r(M, il);
      }), pn && ba(M, Je), ze;
    }
    function Oe(M, k, A, ue) {
      var ze = Ne(A);
      if (typeof ze != "function") throw Error(R(150));
      if (A = ze.call(A), A == null) throw Error(R(151));
      for (var Xe = ze = null, ke = k, Je = k = 0, Kn = null, zt = A.next(); ke !== null && !zt.done; Je++, zt = A.next()) {
        ke.index > Je ? (Kn = ke, ke = null) : Kn = ke.sibling;
        var il = X(M, ke, zt.value, ue);
        if (il === null) {
          ke === null && (ke = Kn);
          break;
        }
        n && ke && il.alternate === null && r(M, ke), k = d(il, k, Je), Xe === null ? ze = il : Xe.sibling = il, Xe = il, ke = Kn;
      }
      if (zt.done) return l(
        M,
        ke
      ), pn && ba(M, Je), ze;
      if (ke === null) {
        for (; !zt.done; Je++, zt = A.next()) zt = te(M, zt.value, ue), zt !== null && (k = d(zt, k, Je), Xe === null ? ze = zt : Xe.sibling = zt, Xe = zt);
        return pn && ba(M, Je), ze;
      }
      for (ke = o(M, ke); !zt.done; Je++, zt = A.next()) zt = Ce(ke, M, Je, zt.value, ue), zt !== null && (n && zt.alternate !== null && ke.delete(zt.key === null ? Je : zt.key), k = d(zt, k, Je), Xe === null ? ze = zt : Xe.sibling = zt, Xe = zt);
      return n && ke.forEach(function(Gy) {
        return r(M, Gy);
      }), pn && ba(M, Je), ze;
    }
    function jn(M, k, A, ue) {
      if (typeof A == "object" && A !== null && A.type === pe && A.key === null && (A = A.props.children), typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case $:
            e: {
              for (var ze = A.key, Xe = k; Xe !== null; ) {
                if (Xe.key === ze) {
                  if (ze = A.type, ze === pe) {
                    if (Xe.tag === 7) {
                      l(M, Xe.sibling), k = c(Xe, A.props.children), k.return = M, M = k;
                      break e;
                    }
                  } else if (Xe.elementType === ze || typeof ze == "object" && ze !== null && ze.$$typeof === Tt && Gv(ze) === Xe.type) {
                    l(M, Xe.sibling), k = c(Xe, A.props), k.ref = mu(M, Xe, A), k.return = M, M = k;
                    break e;
                  }
                  l(M, Xe);
                  break;
                } else r(M, Xe);
                Xe = Xe.sibling;
              }
              A.type === pe ? (k = Mu(A.props.children, M.mode, ue, A.key), k.return = M, M = k) : (ue = yf(A.type, A.key, A.props, null, M.mode, ue), ue.ref = mu(M, k, A), ue.return = M, M = ue);
            }
            return m(M);
          case Be:
            e: {
              for (Xe = A.key; k !== null; ) {
                if (k.key === Xe) if (k.tag === 4 && k.stateNode.containerInfo === A.containerInfo && k.stateNode.implementation === A.implementation) {
                  l(M, k.sibling), k = c(k, A.children || []), k.return = M, M = k;
                  break e;
                } else {
                  l(M, k);
                  break;
                }
                else r(M, k);
                k = k.sibling;
              }
              k = Hs(A, M.mode, ue), k.return = M, M = k;
            }
            return m(M);
          case Tt:
            return Xe = A._init, jn(M, k, Xe(A._payload), ue);
        }
        if (Jn(A)) return _e(M, k, A, ue);
        if (Ne(A)) return Oe(M, k, A, ue);
        Di(M, A);
      }
      return typeof A == "string" && A !== "" || typeof A == "number" ? (A = "" + A, k !== null && k.tag === 6 ? (l(M, k.sibling), k = c(k, A), k.return = M, M = k) : (l(M, k), k = Sf(A, M.mode, ue), k.return = M, M = k), m(M)) : l(M, k);
    }
    return jn;
  }
  var co = Mc(!0), qv = Mc(!1), Ji = ft(null), Wn = null, fe = null, Ya = null;
  function _a() {
    Ya = fe = Wn = null;
  }
  function Ad(n) {
    var r = Ji.current;
    Pt(Ji), n._currentValue = r;
  }
  function zd(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function fo(n, r) {
    Wn = n, Ya = fe = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (sa = !0), n.firstContext = null);
  }
  function Wa(n) {
    var r = n._currentValue;
    if (Ya !== n) if (n = { context: n, memoizedValue: r, next: null }, fe === null) {
      if (Wn === null) throw Error(R(308));
      fe = n, Wn.dependencies = { lanes: 0, firstContext: n };
    } else fe = fe.next = n;
    return r;
  }
  var yu = null;
  function Bn(n) {
    yu === null ? yu = [n] : yu.push(n);
  }
  function Kv(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Bn(r)) : (l.next = c.next, c.next = l), r.interleaved = l, el(n, o);
  }
  function el(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ul = !1;
  function Lc(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function po(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function ua(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Fl(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, Ct & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, el(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Bn(o)) : (r.next = c.next, c.next = r), o.interleaved = r, el(n, l);
  }
  function Nc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, bi(n, l);
    }
  }
  function Xv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function Ac(n, r, l, o) {
    var c = n.updateQueue;
    Ul = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, T = c.shared.pending;
    if (T !== null) {
      c.shared.pending = null;
      var x = T, j = x.next;
      x.next = null, m === null ? d = j : m.next = j, m = x;
      var ee = n.alternate;
      ee !== null && (ee = ee.updateQueue, T = ee.lastBaseUpdate, T !== m && (T === null ? ee.firstBaseUpdate = j : T.next = j, ee.lastBaseUpdate = x));
    }
    if (d !== null) {
      var te = c.baseState;
      m = 0, ee = j = x = null, T = d;
      do {
        var X = T.lane, Ce = T.eventTime;
        if ((o & X) === X) {
          ee !== null && (ee = ee.next = {
            eventTime: Ce,
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          });
          e: {
            var _e = n, Oe = T;
            switch (X = r, Ce = l, Oe.tag) {
              case 1:
                if (_e = Oe.payload, typeof _e == "function") {
                  te = _e.call(Ce, te, X);
                  break e;
                }
                te = _e;
                break e;
              case 3:
                _e.flags = _e.flags & -65537 | 128;
              case 0:
                if (_e = Oe.payload, X = typeof _e == "function" ? _e.call(Ce, te, X) : _e, X == null) break e;
                te = se({}, te, X);
                break e;
              case 2:
                Ul = !0;
            }
          }
          T.callback !== null && T.lane !== 0 && (n.flags |= 64, X = c.effects, X === null ? c.effects = [T] : X.push(T));
        } else Ce = { eventTime: Ce, lane: X, tag: T.tag, payload: T.payload, callback: T.callback, next: null }, ee === null ? (j = ee = Ce, x = te) : ee = ee.next = Ce, m |= X;
        if (T = T.next, T === null) {
          if (T = c.shared.pending, T === null) break;
          X = T, T = X.next, X.next = null, c.lastBaseUpdate = X, c.shared.pending = null;
        }
      } while (!0);
      if (ee === null && (x = te), c.baseState = x, c.firstBaseUpdate = j, c.lastBaseUpdate = ee, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      _u |= m, n.lanes = m, n.memoizedState = te;
    }
  }
  function Zv(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(R(191, c));
        c.call(o);
      }
    }
  }
  var Ts = {}, hi = ft(Ts), vo = ft(Ts), ws = ft(Ts);
  function gu(n) {
    if (n === Ts) throw Error(R(174));
    return n;
  }
  function Ud(n, r) {
    switch (Yt(ws, r), Yt(vo, n), Yt(hi, Ts), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Rn(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Rn(r, n);
    }
    Pt(hi), Yt(hi, r);
  }
  function ho() {
    Pt(hi), Pt(vo), Pt(ws);
  }
  function Jv(n) {
    gu(ws.current);
    var r = gu(hi.current), l = Rn(r, n.type);
    r !== l && (Yt(vo, n), Yt(hi, l));
  }
  function Fd(n) {
    vo.current === n && (Pt(hi), Pt(vo));
  }
  var gn = ft(0);
  function zc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var Uc = [];
  function jd() {
    for (var n = 0; n < Uc.length; n++) Uc[n]._workInProgressVersionPrimary = null;
    Uc.length = 0;
  }
  var Fc = Ue.ReactCurrentDispatcher, bs = Ue.ReactCurrentBatchConfig, Ae = 0, je = null, rt = null, gt = null, ka = !1, mo = !1, xs = 0, My = 0;
  function xr() {
    throw Error(R(321));
  }
  function _s(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!Pa(n[l], r[l])) return !1;
    return !0;
  }
  function q(n, r, l, o, c, d) {
    if (Ae = d, je = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Fc.current = n === null || n.memoizedState === null ? Ly : cn, n = l(o, c), mo) {
      d = 0;
      do {
        if (mo = !1, xs = 0, 25 <= d) throw Error(R(301));
        d += 1, gt = rt = null, r.updateQueue = null, Fc.current = Zc, n = l(o, c);
      } while (mo);
    }
    if (Fc.current = _r, r = rt !== null && rt.next !== null, Ae = 0, gt = rt = je = null, ka = !1, r) throw Error(R(300));
    return n;
  }
  function In() {
    var n = xs !== 0;
    return xs = 0, n;
  }
  function Ve() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return gt === null ? je.memoizedState = gt = n : gt = gt.next = n, gt;
  }
  function fr() {
    if (rt === null) {
      var n = je.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = rt.next;
    var r = gt === null ? je.memoizedState : gt.next;
    if (r !== null) gt = r, rt = n;
    else {
      if (n === null) throw Error(R(310));
      rt = n, n = { memoizedState: rt.memoizedState, baseState: rt.baseState, baseQueue: rt.baseQueue, queue: rt.queue, next: null }, gt === null ? je.memoizedState = gt = n : gt = gt.next = n;
    }
    return gt;
  }
  function Da(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function tl(n) {
    var r = fr(), l = r.queue;
    if (l === null) throw Error(R(311));
    l.lastRenderedReducer = n;
    var o = rt, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var T = m = null, x = null, j = d;
      do {
        var ee = j.lane;
        if ((Ae & ee) === ee) x !== null && (x = x.next = { lane: 0, action: j.action, hasEagerState: j.hasEagerState, eagerState: j.eagerState, next: null }), o = j.hasEagerState ? j.eagerState : n(o, j.action);
        else {
          var te = {
            lane: ee,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null
          };
          x === null ? (T = x = te, m = o) : x = x.next = te, je.lanes |= ee, _u |= ee;
        }
        j = j.next;
      } while (j !== null && j !== d);
      x === null ? m = o : x.next = T, Pa(o, r.memoizedState) || (sa = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = x, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, je.lanes |= d, _u |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Qa(n) {
    var r = fr(), l = r.queue;
    if (l === null) throw Error(R(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      Pa(d, r.memoizedState) || (sa = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function yo() {
  }
  function Su(n, r) {
    var l = je, o = fr(), c = r(), d = !Pa(o.memoizedState, c);
    if (d && (o.memoizedState = c, sa = !0), o = o.queue, ks(Pc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || gt !== null && gt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Eu(9, jc.bind(null, l, o, c, r), void 0, null), Ln === null) throw Error(R(349));
      Ae & 30 || go(l, r, c);
    }
    return c;
  }
  function go(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = je.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, je.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function jc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, Hc(r) && Vc(n);
  }
  function Pc(n, r, l) {
    return l(function() {
      Hc(r) && Vc(n);
    });
  }
  function Hc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !Pa(n, l);
    } catch {
      return !0;
    }
  }
  function Vc(n) {
    var r = el(n, 1);
    r !== null && xn(r, n, 1, -1);
  }
  function $c(n) {
    var r = Ve();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Da, lastRenderedState: n }, r.queue = n, n = n.dispatch = Ds.bind(null, je, n), [r.memoizedState, n];
  }
  function Eu(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = je.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, je.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Bc() {
    return fr().memoizedState;
  }
  function So(n, r, l, o) {
    var c = Ve();
    je.flags |= n, c.memoizedState = Eu(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function Eo(n, r, l, o) {
    var c = fr();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (rt !== null) {
      var m = rt.memoizedState;
      if (d = m.destroy, o !== null && _s(o, m.deps)) {
        c.memoizedState = Eu(r, l, d, o);
        return;
      }
    }
    je.flags |= n, c.memoizedState = Eu(1 | r, l, d, o);
  }
  function Ic(n, r) {
    return So(8390656, 8, n, r);
  }
  function ks(n, r) {
    return Eo(2048, 8, n, r);
  }
  function Yc(n, r) {
    return Eo(4, 2, n, r);
  }
  function Wc(n, r) {
    return Eo(4, 4, n, r);
  }
  function Qc(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Gc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Eo(4, 4, Qc.bind(null, r, n), l);
  }
  function Co() {
  }
  function Cu(n, r) {
    var l = fr();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && _s(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function qc(n, r) {
    var l = fr();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && _s(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function Kc(n, r, l) {
    return Ae & 21 ? (Pa(l, r) || (l = Qu(), je.lanes |= l, _u |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, sa = !0), n.memoizedState = l);
  }
  function Pd(n, r) {
    var l = At;
    At = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = bs.transition;
    bs.transition = {};
    try {
      n(!1), r();
    } finally {
      At = l, bs.transition = o;
    }
  }
  function Xc() {
    return fr().memoizedState;
  }
  function eh(n, r, l) {
    var o = al(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Hd(n)) Ro(r, l);
    else if (l = Kv(n, r, l, o), l !== null) {
      var c = lr();
      xn(l, n, o, c), jl(l, r, o);
    }
  }
  function Ds(n, r, l) {
    var o = al(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Hd(n)) Ro(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, T = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = T, Pa(T, m)) {
          var x = r.interleaved;
          x === null ? (c.next = c, Bn(r)) : (c.next = x.next, x.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Kv(n, r, c, o), l !== null && (c = lr(), xn(l, n, o, c), jl(l, r, o));
    }
  }
  function Hd(n) {
    var r = n.alternate;
    return n === je || r !== null && r === je;
  }
  function Ro(n, r) {
    mo = ka = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function jl(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, bi(n, l);
    }
  }
  var _r = { readContext: Wa, useCallback: xr, useContext: xr, useEffect: xr, useImperativeHandle: xr, useInsertionEffect: xr, useLayoutEffect: xr, useMemo: xr, useReducer: xr, useRef: xr, useState: xr, useDebugValue: xr, useDeferredValue: xr, useTransition: xr, useMutableSource: xr, useSyncExternalStore: xr, useId: xr, unstable_isNewReconciler: !1 }, Ly = { readContext: Wa, useCallback: function(n, r) {
    return Ve().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Wa, useEffect: Ic, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, So(
      4194308,
      4,
      Qc.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return So(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return So(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Ve();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Ve();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = eh.bind(null, je, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Ve();
    return n = { current: n }, r.memoizedState = n;
  }, useState: $c, useDebugValue: Co, useDeferredValue: function(n) {
    return Ve().memoizedState = n;
  }, useTransition: function() {
    var n = $c(!1), r = n[0];
    return n = Pd.bind(null, n[1]), Ve().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = je, c = Ve();
    if (pn) {
      if (l === void 0) throw Error(R(407));
      l = l();
    } else {
      if (l = r(), Ln === null) throw Error(R(349));
      Ae & 30 || go(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, Ic(Pc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Eu(9, jc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = Ve(), r = Ln.identifierPrefix;
    if (pn) {
      var l = Zi, o = cr;
      l = (o & ~(1 << 32 - Ar(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = xs++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = My++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, cn = {
    readContext: Wa,
    useCallback: Cu,
    useContext: Wa,
    useEffect: ks,
    useImperativeHandle: Gc,
    useInsertionEffect: Yc,
    useLayoutEffect: Wc,
    useMemo: qc,
    useReducer: tl,
    useRef: Bc,
    useState: function() {
      return tl(Da);
    },
    useDebugValue: Co,
    useDeferredValue: function(n) {
      var r = fr();
      return Kc(r, rt.memoizedState, n);
    },
    useTransition: function() {
      var n = tl(Da)[0], r = fr().memoizedState;
      return [n, r];
    },
    useMutableSource: yo,
    useSyncExternalStore: Su,
    useId: Xc,
    unstable_isNewReconciler: !1
  }, Zc = { readContext: Wa, useCallback: Cu, useContext: Wa, useEffect: ks, useImperativeHandle: Gc, useInsertionEffect: Yc, useLayoutEffect: Wc, useMemo: qc, useReducer: Qa, useRef: Bc, useState: function() {
    return Qa(Da);
  }, useDebugValue: Co, useDeferredValue: function(n) {
    var r = fr();
    return rt === null ? r.memoizedState = n : Kc(r, rt.memoizedState, n);
  }, useTransition: function() {
    var n = Qa(Da)[0], r = fr().memoizedState;
    return [n, r];
  }, useMutableSource: yo, useSyncExternalStore: Su, useId: Xc, unstable_isNewReconciler: !1 };
  function oa(n, r) {
    if (n && n.defaultProps) {
      r = se({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Ru(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : se({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var Tu = { isMounted: function(n) {
    return (n = n._reactInternals) ? Fe(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = lr(), c = al(n), d = ua(o, c);
    d.payload = r, l != null && (d.callback = l), r = Fl(n, d, c), r !== null && (xn(r, n, c, o), Nc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = lr(), c = al(n), d = ua(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Fl(n, d, c), r !== null && (xn(r, n, c, o), Nc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = lr(), o = al(n), c = ua(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Fl(n, c, o), r !== null && (xn(r, n, o, l), Nc(r, n, o));
  } };
  function th(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !fs(l, o) || !fs(c, d) : !0;
  }
  function nh(n, r, l) {
    var o = !1, c = ki, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Wa(d) : (c = yn(r) ? na : nt.current, o = r.contextTypes, d = (o = o != null) ? Va(n, c) : ki), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Tu, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function rh(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && Tu.enqueueReplaceState(r, r.state, null);
  }
  function Vd(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Lc(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Wa(d) : (d = yn(r) ? na : nt.current, c.context = Va(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Ru(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && Tu.enqueueReplaceState(c, c.state, null), Ac(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Pl(n, r) {
    try {
      var l = "", o = r;
      do
        l += ct(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function $d(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Os(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var ah = typeof WeakMap == "function" ? WeakMap : Map;
  function ih(n, r, l) {
    l = ua(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      ff || (ff = !0, Xd = o), Os(n, r);
    }, l;
  }
  function lh(n, r, l) {
    l = ua(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Os(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Os(n, r), typeof o != "function" && (Ka === null ? Ka = /* @__PURE__ */ new Set([this]) : Ka.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function Ms(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new ah();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = $y.bind(null, n, r, l), r.then(n, n));
  }
  function uh(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Bd(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = ua(-1, 1), r.tag = 2, Fl(l, r, 1))), l.lanes |= 1), n);
  }
  var oh = Ue.ReactCurrentOwner, sa = !1;
  function Un(n, r, l, o) {
    r.child = n === null ? qv(r, null, l, o) : co(r, n.child, l, o);
  }
  function To(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return fo(r, c), o = q(n, r, l, o, d, c), l = In(), n !== null && !sa ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Fn(n, r, c)) : (pn && l && xc(r), r.flags |= 1, Un(n, r, o, c), r.child);
  }
  function Hl(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !np(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, Jc(n, r, d, o, c)) : (n = yf(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : fs, l(m, o) && n.ref === r.ref) return Fn(n, r, c);
    }
    return r.flags |= 1, n = Bl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Jc(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (fs(d, o) && n.ref === r.ref) if (sa = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (sa = !0);
      else return r.lanes = n.lanes, Fn(n, r, c);
    }
    return st(n, r, l, o, c);
  }
  function ca(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Yt(No, fa), fa |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Yt(No, fa), fa |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, Yt(No, fa), fa |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, Yt(No, fa), fa |= o;
    return Un(n, r, c, l), r.child;
  }
  function wu(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function st(n, r, l, o, c) {
    var d = yn(l) ? na : nt.current;
    return d = Va(r, d), fo(r, c), l = q(n, r, l, o, d, c), o = In(), n !== null && !sa ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Fn(n, r, c)) : (pn && o && xc(r), r.flags |= 1, Un(n, r, l, c), r.child);
  }
  function Ls(n, r, l, o, c) {
    if (yn(l)) {
      var d = !0;
      bc(r);
    } else d = !1;
    if (fo(r, c), r.stateNode === null) As(n, r), nh(r, l, o), Vd(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, T = r.memoizedProps;
      m.props = T;
      var x = m.context, j = l.contextType;
      typeof j == "object" && j !== null ? j = Wa(j) : (j = yn(l) ? na : nt.current, j = Va(r, j));
      var ee = l.getDerivedStateFromProps, te = typeof ee == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      te || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (T !== o || x !== j) && rh(r, m, o, j), Ul = !1;
      var X = r.memoizedState;
      m.state = X, Ac(r, o, m, c), x = r.memoizedState, T !== o || X !== x || On.current || Ul ? (typeof ee == "function" && (Ru(r, l, ee, o), x = r.memoizedState), (T = Ul || th(r, l, T, o, X, x, j)) ? (te || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = x), m.props = o, m.state = x, m.context = j, o = T) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, po(n, r), T = r.memoizedProps, j = r.type === r.elementType ? T : oa(r.type, T), m.props = j, te = r.pendingProps, X = m.context, x = l.contextType, typeof x == "object" && x !== null ? x = Wa(x) : (x = yn(l) ? na : nt.current, x = Va(r, x));
      var Ce = l.getDerivedStateFromProps;
      (ee = typeof Ce == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (T !== te || X !== x) && rh(r, m, o, x), Ul = !1, X = r.memoizedState, m.state = X, Ac(r, o, m, c);
      var _e = r.memoizedState;
      T !== te || X !== _e || On.current || Ul ? (typeof Ce == "function" && (Ru(r, l, Ce, o), _e = r.memoizedState), (j = Ul || th(r, l, j, o, X, _e, x) || !1) ? (ee || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, _e, x), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, _e, x)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || T === n.memoizedProps && X === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || T === n.memoizedProps && X === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = _e), m.props = o, m.state = _e, m.context = x, o = j) : (typeof m.componentDidUpdate != "function" || T === n.memoizedProps && X === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || T === n.memoizedProps && X === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return ef(n, r, l, o, d, c);
  }
  function ef(n, r, l, o, c, d) {
    wu(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && Iv(r, l, !1), Fn(n, r, d);
    o = r.stateNode, oh.current = r;
    var T = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = co(r, n.child, null, d), r.child = co(r, null, T, d)) : Un(n, r, T, d), r.memoizedState = o.state, c && Iv(r, l, !0), r.child;
  }
  function Ny(n) {
    var r = n.stateNode;
    r.pendingContext ? Al(n, r.pendingContext, r.pendingContext !== r.context) : r.context && Al(n, r.context, !1), Ud(n, r.containerInfo);
  }
  function sh(n, r, l, o, c) {
    return bn(), Nd(c), r.flags |= 256, Un(n, r, l, o), r.child;
  }
  var Ns = { dehydrated: null, treeContext: null, retryLane: 0 };
  function bu(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function ch(n, r, l) {
    var o = r.pendingProps, c = gn.current, d = !1, m = (r.flags & 128) !== 0, T;
    if ((T = m) || (T = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), T ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), Yt(gn, c & 1), n === null)
      return kc(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = gf(m, o, 0, null), n = Mu(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = bu(l), r.memoizedState = Ns, n) : tf(r, m));
    if (c = n.memoizedState, c !== null && (T = c.dehydrated, T !== null)) return Id(n, r, m, o, T, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, T = c.sibling;
      var x = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = x, r.deletions = null) : (o = Bl(c, x), o.subtreeFlags = c.subtreeFlags & 14680064), T !== null ? d = Bl(T, d) : (d = Mu(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? bu(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = Ns, o;
    }
    return d = n.child, n = d.sibling, o = Bl(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function tf(n, r) {
    return r = gf({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function nf(n, r, l, o) {
    return o !== null && Nd(o), co(r, n.child, null, l), n = tf(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Id(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = $d(Error(R(422))), nf(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = gf({ mode: "visible", children: o.children }, c, 0, null), d = Mu(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && co(r, n.child, null, m), r.child.memoizedState = bu(m), r.memoizedState = Ns, d);
    if (!(r.mode & 1)) return nf(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var T = o.dgst;
      return o = T, d = Error(R(419)), o = $d(d, o, void 0), nf(n, r, m, o);
    }
    if (T = (m & n.childLanes) !== 0, sa || T) {
      if (o = Ln, o !== null) {
        switch (m & -m) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | m) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, el(n, c), xn(o, n, c, -1));
      }
      return Ps(), o = $d(Error(R(421))), nf(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = tp.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, la = vi(c.nextSibling), xa = r, pn = !0, Ia = null, n !== null && (ia[br++] = cr, ia[br++] = Zi, ia[br++] = Ba, cr = n.id, Zi = n.overflow, Ba = r), r = tf(r, o.children), r.flags |= 4096, r);
  }
  function fh(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), zd(n.return, r, l);
  }
  function rf(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function Yd(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (Un(n, r, o.children, l), o = gn.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && fh(n, l, r);
        else if (n.tag === 19) fh(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (Yt(gn, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && zc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), rf(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && zc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        rf(r, !0, l, null, d);
        break;
      case "together":
        rf(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function As(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Fn(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), _u |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(R(153));
    if (r.child !== null) {
      for (n = r.child, l = Bl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Bl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function nl(n, r, l) {
    switch (r.tag) {
      case 3:
        Ny(r), bn();
        break;
      case 5:
        Jv(r);
        break;
      case 1:
        yn(r.type) && bc(r);
        break;
      case 4:
        Ud(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        Yt(Ji, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (Yt(gn, gn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? ch(n, r, l) : (Yt(gn, gn.current & 1), n = Fn(n, r, l), n !== null ? n.sibling : null);
        Yt(gn, gn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return Yd(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Yt(gn, gn.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, ca(n, r, l);
    }
    return Fn(n, r, l);
  }
  var Oi, wo, bo, Ga;
  Oi = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, wo = function() {
  }, bo = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, gu(hi.current);
      var d = null;
      switch (l) {
        case "input":
          c = Cn(n, c), o = Cn(n, o), d = [];
          break;
        case "select":
          c = se({}, c, { value: void 0 }), o = se({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Kr(n, c), o = Kr(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = wc);
      }
      zn(l, o);
      var m;
      l = null;
      for (j in c) if (!o.hasOwnProperty(j) && c.hasOwnProperty(j) && c[j] != null) if (j === "style") {
        var T = c[j];
        for (m in T) T.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else j !== "dangerouslySetInnerHTML" && j !== "children" && j !== "suppressContentEditableWarning" && j !== "suppressHydrationWarning" && j !== "autoFocus" && (H.hasOwnProperty(j) ? d || (d = []) : (d = d || []).push(j, null));
      for (j in o) {
        var x = o[j];
        if (T = c?.[j], o.hasOwnProperty(j) && x !== T && (x != null || T != null)) if (j === "style") if (T) {
          for (m in T) !T.hasOwnProperty(m) || x && x.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in x) x.hasOwnProperty(m) && T[m] !== x[m] && (l || (l = {}), l[m] = x[m]);
        } else l || (d || (d = []), d.push(
          j,
          l
        )), l = x;
        else j === "dangerouslySetInnerHTML" ? (x = x ? x.__html : void 0, T = T ? T.__html : void 0, x != null && T !== x && (d = d || []).push(j, x)) : j === "children" ? typeof x != "string" && typeof x != "number" || (d = d || []).push(j, "" + x) : j !== "suppressContentEditableWarning" && j !== "suppressHydrationWarning" && (H.hasOwnProperty(j) ? (x != null && j === "onScroll" && on("scroll", n), d || T === x || (d = [])) : (d = d || []).push(j, x));
      }
      l && (d = d || []).push("style", l);
      var j = d;
      (r.updateQueue = j) && (r.flags |= 4);
    }
  }, Ga = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function Mn(n, r) {
    if (!pn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function kr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function Ay(n, r, l) {
    var o = r.pendingProps;
    switch (Md(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return kr(r), null;
      case 1:
        return yn(r.type) && $a(), kr(r), null;
      case 3:
        return o = r.stateNode, ho(), Pt(On), Pt(nt), jd(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (Dc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Ia !== null && (Zd(Ia), Ia = null))), wo(n, r), kr(r), null;
      case 5:
        Fd(r);
        var c = gu(ws.current);
        if (l = r.type, n !== null && r.stateNode != null) bo(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(R(166));
            return kr(r), null;
          }
          if (n = gu(hi.current), Dc(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[_i] = r, o[vu] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                on("cancel", o), on("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                on("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < hs.length; c++) on(hs[c], o);
                break;
              case "source":
                on("error", o);
                break;
              case "img":
              case "image":
              case "link":
                on(
                  "error",
                  o
                ), on("load", o);
                break;
              case "details":
                on("toggle", o);
                break;
              case "input":
                kn(o, d), on("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, on("invalid", o);
                break;
              case "textarea":
                Rr(o, d), on("invalid", o);
            }
            zn(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var T = d[m];
              m === "children" ? typeof T == "string" ? o.textContent !== T && (d.suppressHydrationWarning !== !0 && Tc(o.textContent, T, n), c = ["children", T]) : typeof T == "number" && o.textContent !== "" + T && (d.suppressHydrationWarning !== !0 && Tc(
                o.textContent,
                T,
                n
              ), c = ["children", "" + T]) : H.hasOwnProperty(m) && T != null && m === "onScroll" && on("scroll", o);
            }
            switch (l) {
              case "input":
                Zn(o), Gr(o, d, !0);
                break;
              case "textarea":
                Zn(o), sr(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = wc);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Xr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[_i] = r, n[vu] = o, Oi(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = Tn(l, o), l) {
                case "dialog":
                  on("cancel", n), on("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  on("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < hs.length; c++) on(hs[c], n);
                  c = o;
                  break;
                case "source":
                  on("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  on(
                    "error",
                    n
                  ), on("load", n), c = o;
                  break;
                case "details":
                  on("toggle", n), c = o;
                  break;
                case "input":
                  kn(n, o), c = Cn(n, o), on("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = se({}, o, { value: void 0 }), on("invalid", n);
                  break;
                case "textarea":
                  Rr(n, o), c = Kr(n, o), on("invalid", n);
                  break;
                default:
                  c = o;
              }
              zn(l, c), T = c;
              for (d in T) if (T.hasOwnProperty(d)) {
                var x = T[d];
                d === "style" ? jt(n, x) : d === "dangerouslySetInnerHTML" ? (x = x ? x.__html : void 0, x != null && Ei(n, x)) : d === "children" ? typeof x == "string" ? (l !== "textarea" || x !== "") && Ea(n, x) : typeof x == "number" && Ea(n, "" + x) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (H.hasOwnProperty(d) ? x != null && d === "onScroll" && on("scroll", n) : x != null && Se(n, d, x, m));
              }
              switch (l) {
                case "input":
                  Zn(n), Gr(n, o, !1);
                  break;
                case "textarea":
                  Zn(n), sr(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + dt(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Cr(n, !!o.multiple, d, !1) : o.defaultValue != null && Cr(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = wc);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return kr(r), null;
      case 6:
        if (n && r.stateNode != null) Ga(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(R(166));
          if (l = gu(ws.current), gu(hi.current), Dc(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[_i] = r, (d = o.nodeValue !== l) && (n = xa, n !== null)) switch (n.tag) {
              case 3:
                Tc(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Tc(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[_i] = r, r.stateNode = o;
        }
        return kr(r), null;
      case 13:
        if (Pt(gn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (pn && la !== null && r.mode & 1 && !(r.flags & 128)) Qv(), bn(), r.flags |= 98560, d = !1;
          else if (d = Dc(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(R(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(R(317));
              d[_i] = r;
            } else bn(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            kr(r), d = !1;
          } else Ia !== null && (Zd(Ia), Ia = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || gn.current & 1 ? Gn === 0 && (Gn = 3) : Ps())), r.updateQueue !== null && (r.flags |= 4), kr(r), null);
      case 4:
        return ho(), wo(n, r), n === null && uo(r.stateNode.containerInfo), kr(r), null;
      case 10:
        return Ad(r.type._context), kr(r), null;
      case 17:
        return yn(r.type) && $a(), kr(r), null;
      case 19:
        if (Pt(gn), d = r.memoizedState, d === null) return kr(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) Mn(d, !1);
        else {
          if (Gn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (m = zc(n), m !== null) {
              for (r.flags |= 128, Mn(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Yt(gn, gn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && Nt() > zo && (r.flags |= 128, o = !0, Mn(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = zc(m), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), Mn(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !pn) return kr(r), null;
          } else 2 * Nt() - d.renderingStartTime > zo && l !== 1073741824 && (r.flags |= 128, o = !0, Mn(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Nt(), r.sibling = null, l = gn.current, Yt(gn, o ? l & 1 | 2 : l & 1), r) : (kr(r), null);
      case 22:
      case 23:
        return hf(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? fa & 1073741824 && (kr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : kr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(R(156, r.tag));
  }
  function zy(n, r) {
    switch (Md(r), r.tag) {
      case 1:
        return yn(r.type) && $a(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return ho(), Pt(On), Pt(nt), jd(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Fd(r), null;
      case 13:
        if (Pt(gn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(R(340));
          bn();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return Pt(gn), null;
      case 4:
        return ho(), null;
      case 10:
        return Ad(r.type._context), null;
      case 22:
      case 23:
        return hf(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var xo = !1, dr = !1, af = typeof WeakSet == "function" ? WeakSet : Set, be = null;
  function _o(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      Nn(n, r, o);
    }
    else l.current = null;
  }
  function Wd(n, r, l) {
    try {
      l();
    } catch (o) {
      Nn(n, r, o);
    }
  }
  var lf = !1;
  function Uy(n, r) {
    if (Td = ja, n = gc(), Gi(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, d.nodeType;
          } catch {
            l = null;
            break e;
          }
          var m = 0, T = -1, x = -1, j = 0, ee = 0, te = n, X = null;
          t: for (; ; ) {
            for (var Ce; te !== l || c !== 0 && te.nodeType !== 3 || (T = m + c), te !== d || o !== 0 && te.nodeType !== 3 || (x = m + o), te.nodeType === 3 && (m += te.nodeValue.length), (Ce = te.firstChild) !== null; )
              X = te, te = Ce;
            for (; ; ) {
              if (te === n) break t;
              if (X === l && ++j === c && (T = m), X === d && ++ee === o && (x = m), (Ce = te.nextSibling) !== null) break;
              te = X, X = te.parentNode;
            }
            te = Ce;
          }
          l = T === -1 || x === -1 ? null : { start: T, end: x };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (du = { focusedElem: n, selectionRange: l }, ja = !1, be = r; be !== null; ) if (r = be, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, be = n;
    else for (; be !== null; ) {
      r = be;
      try {
        var _e = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (_e !== null) {
              var Oe = _e.memoizedProps, jn = _e.memoizedState, M = r.stateNode, k = M.getSnapshotBeforeUpdate(r.elementType === r.type ? Oe : oa(r.type, Oe), jn);
              M.__reactInternalSnapshotBeforeUpdate = k;
            }
            break;
          case 3:
            var A = r.stateNode.containerInfo;
            A.nodeType === 1 ? A.textContent = "" : A.nodeType === 9 && A.documentElement && A.removeChild(A.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(R(163));
        }
      } catch (ue) {
        Nn(r, r.return, ue);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, be = n;
        break;
      }
      be = r.return;
    }
    return _e = lf, lf = !1, _e;
  }
  function ko(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && Wd(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function uf(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function of(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function dh(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, dh(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[_i], delete r[vu], delete r[xd], delete r[Oy], delete r[_d])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Qd(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function ph(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Qd(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function zs(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = wc));
    else if (o !== 4 && (n = n.child, n !== null)) for (zs(n, r, l), n = n.sibling; n !== null; ) zs(n, r, l), n = n.sibling;
  }
  function Do(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (Do(n, r, l), n = n.sibling; n !== null; ) Do(n, r, l), n = n.sibling;
  }
  var Sn = null, ar = !1;
  function Fr(n, r, l) {
    for (l = l.child; l !== null; ) Oo(n, r, l), l = l.sibling;
  }
  function Oo(n, r, l) {
    if (Zr && typeof Zr.onCommitFiberUnmount == "function") try {
      Zr.onCommitFiberUnmount(El, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        dr || _o(l, r);
      case 6:
        var o = Sn, c = ar;
        Sn = null, Fr(n, r, l), Sn = o, ar = c, Sn !== null && (ar ? (n = Sn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : Sn.removeChild(l.stateNode));
        break;
      case 18:
        Sn !== null && (ar ? (n = Sn, l = l.stateNode, n.nodeType === 8 ? Ml(n.parentNode, l) : n.nodeType === 1 && Ml(n, l), _l(n)) : Ml(Sn, l.stateNode));
        break;
      case 4:
        o = Sn, c = ar, Sn = l.stateNode.containerInfo, ar = !0, Fr(n, r, l), Sn = o, ar = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!dr && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && Wd(l, r, m), c = c.next;
          } while (c !== o);
        }
        Fr(n, r, l);
        break;
      case 1:
        if (!dr && (_o(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (T) {
          Nn(l, r, T);
        }
        Fr(n, r, l);
        break;
      case 21:
        Fr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (dr = (o = dr) || l.memoizedState !== null, Fr(n, r, l), dr = o) : Fr(n, r, l);
        break;
      default:
        Fr(n, r, l);
    }
  }
  function Mo(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new af()), r.forEach(function(o) {
        var c = By.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ir(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, T = m;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 5:
              Sn = T.stateNode, ar = !1;
              break e;
            case 3:
              Sn = T.stateNode.containerInfo, ar = !0;
              break e;
            case 4:
              Sn = T.stateNode.containerInfo, ar = !0;
              break e;
          }
          T = T.return;
        }
        if (Sn === null) throw Error(R(160));
        Oo(d, m, c), Sn = null, ar = !1;
        var x = c.alternate;
        x !== null && (x.return = null), c.return = null;
      } catch (j) {
        Nn(c, r, j);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) vh(r, n), r = r.sibling;
  }
  function vh(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ir(r, n), Mi(n), o & 4) {
          try {
            ko(3, n, n.return), uf(3, n);
          } catch (Oe) {
            Nn(n, n.return, Oe);
          }
          try {
            ko(5, n, n.return);
          } catch (Oe) {
            Nn(n, n.return, Oe);
          }
        }
        break;
      case 1:
        ir(r, n), Mi(n), o & 512 && l !== null && _o(l, l.return);
        break;
      case 5:
        if (ir(r, n), Mi(n), o & 512 && l !== null && _o(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            Ea(c, "");
          } catch (Oe) {
            Nn(n, n.return, Oe);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, T = n.type, x = n.updateQueue;
          if (n.updateQueue = null, x !== null) try {
            T === "input" && d.type === "radio" && d.name != null && Hn(c, d), Tn(T, m);
            var j = Tn(T, d);
            for (m = 0; m < x.length; m += 2) {
              var ee = x[m], te = x[m + 1];
              ee === "style" ? jt(c, te) : ee === "dangerouslySetInnerHTML" ? Ei(c, te) : ee === "children" ? Ea(c, te) : Se(c, ee, te, j);
            }
            switch (T) {
              case "input":
                An(c, d);
                break;
              case "textarea":
                Sa(c, d);
                break;
              case "select":
                var X = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var Ce = d.value;
                Ce != null ? Cr(c, !!d.multiple, Ce, !1) : X !== !!d.multiple && (d.defaultValue != null ? Cr(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cr(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[vu] = d;
          } catch (Oe) {
            Nn(n, n.return, Oe);
          }
        }
        break;
      case 6:
        if (ir(r, n), Mi(n), o & 4) {
          if (n.stateNode === null) throw Error(R(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Oe) {
            Nn(n, n.return, Oe);
          }
        }
        break;
      case 3:
        if (ir(r, n), Mi(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          _l(r.containerInfo);
        } catch (Oe) {
          Nn(n, n.return, Oe);
        }
        break;
      case 4:
        ir(r, n), Mi(n);
        break;
      case 13:
        ir(r, n), Mi(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (cf = Nt())), o & 4 && Mo(n);
        break;
      case 22:
        if (ee = l !== null && l.memoizedState !== null, n.mode & 1 ? (dr = (j = dr) || ee, ir(r, n), dr = j) : ir(r, n), Mi(n), o & 8192) {
          if (j = n.memoizedState !== null, (n.stateNode.isHidden = j) && !ee && n.mode & 1) for (be = n, ee = n.child; ee !== null; ) {
            for (te = be = ee; be !== null; ) {
              switch (X = be, Ce = X.child, X.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ko(4, X, X.return);
                  break;
                case 1:
                  _o(X, X.return);
                  var _e = X.stateNode;
                  if (typeof _e.componentWillUnmount == "function") {
                    o = X, l = X.return;
                    try {
                      r = o, _e.props = r.memoizedProps, _e.state = r.memoizedState, _e.componentWillUnmount();
                    } catch (Oe) {
                      Nn(o, l, Oe);
                    }
                  }
                  break;
                case 5:
                  _o(X, X.return);
                  break;
                case 22:
                  if (X.memoizedState !== null) {
                    hh(te);
                    continue;
                  }
              }
              Ce !== null ? (Ce.return = X, be = Ce) : hh(te);
            }
            ee = ee.sibling;
          }
          e: for (ee = null, te = n; ; ) {
            if (te.tag === 5) {
              if (ee === null) {
                ee = te;
                try {
                  c = te.stateNode, j ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (T = te.stateNode, x = te.memoizedProps.style, m = x != null && x.hasOwnProperty("display") ? x.display : null, T.style.display = vt("display", m));
                } catch (Oe) {
                  Nn(n, n.return, Oe);
                }
              }
            } else if (te.tag === 6) {
              if (ee === null) try {
                te.stateNode.nodeValue = j ? "" : te.memoizedProps;
              } catch (Oe) {
                Nn(n, n.return, Oe);
              }
            } else if ((te.tag !== 22 && te.tag !== 23 || te.memoizedState === null || te === n) && te.child !== null) {
              te.child.return = te, te = te.child;
              continue;
            }
            if (te === n) break e;
            for (; te.sibling === null; ) {
              if (te.return === null || te.return === n) break e;
              ee === te && (ee = null), te = te.return;
            }
            ee === te && (ee = null), te.sibling.return = te.return, te = te.sibling;
          }
        }
        break;
      case 19:
        ir(r, n), Mi(n), o & 4 && Mo(n);
        break;
      case 21:
        break;
      default:
        ir(
          r,
          n
        ), Mi(n);
    }
  }
  function Mi(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Qd(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(R(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (Ea(c, ""), o.flags &= -33);
            var d = ph(n);
            Do(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, T = ph(n);
            zs(n, T, m);
            break;
          default:
            throw Error(R(161));
        }
      } catch (x) {
        Nn(n, n.return, x);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function Fy(n, r, l) {
    be = n, Gd(n);
  }
  function Gd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; be !== null; ) {
      var c = be, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || xo;
        if (!m) {
          var T = c.alternate, x = T !== null && T.memoizedState !== null || dr;
          T = xo;
          var j = dr;
          if (xo = m, (dr = x) && !j) for (be = c; be !== null; ) m = be, x = m.child, m.tag === 22 && m.memoizedState !== null ? qd(c) : x !== null ? (x.return = m, be = x) : qd(c);
          for (; d !== null; ) be = d, Gd(d), d = d.sibling;
          be = c, xo = T, dr = j;
        }
        Lo(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, be = d) : Lo(n);
    }
  }
  function Lo(n) {
    for (; be !== null; ) {
      var r = be;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              dr || uf(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !dr) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : oa(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Zv(r, d, o);
              break;
            case 3:
              var m = r.updateQueue;
              if (m !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Zv(r, m, l);
              }
              break;
            case 5:
              var T = r.stateNode;
              if (l === null && r.flags & 4) {
                l = T;
                var x = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    x.autoFocus && l.focus();
                    break;
                  case "img":
                    x.src && (l.src = x.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var j = r.alternate;
                if (j !== null) {
                  var ee = j.memoizedState;
                  if (ee !== null) {
                    var te = ee.dehydrated;
                    te !== null && _l(te);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(R(163));
          }
          dr || r.flags & 512 && of(r);
        } catch (X) {
          Nn(r, r.return, X);
        }
      }
      if (r === n) {
        be = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, be = l;
        break;
      }
      be = r.return;
    }
  }
  function hh(n) {
    for (; be !== null; ) {
      var r = be;
      if (r === n) {
        be = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, be = l;
        break;
      }
      be = r.return;
    }
  }
  function qd(n) {
    for (; be !== null; ) {
      var r = be;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              uf(4, r);
            } catch (x) {
              Nn(r, l, x);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (x) {
                Nn(r, c, x);
              }
            }
            var d = r.return;
            try {
              of(r);
            } catch (x) {
              Nn(r, d, x);
            }
            break;
          case 5:
            var m = r.return;
            try {
              of(r);
            } catch (x) {
              Nn(r, m, x);
            }
        }
      } catch (x) {
        Nn(r, r.return, x);
      }
      if (r === n) {
        be = null;
        break;
      }
      var T = r.sibling;
      if (T !== null) {
        T.return = r.return, be = T;
        break;
      }
      be = r.return;
    }
  }
  var jy = Math.ceil, xu = Ue.ReactCurrentDispatcher, sf = Ue.ReactCurrentOwner, qa = Ue.ReactCurrentBatchConfig, Ct = 0, Ln = null, vn = null, Qn = 0, fa = 0, No = ft(0), Gn = 0, Us = null, _u = 0, Ao = 0, Kd = 0, Vl = null, Dr = null, cf = 0, zo = 1 / 0, rl = null, ff = !1, Xd = null, Ka = null, Uo = !1, Xa = null, df = 0, Fs = 0, pf = null, js = -1, ku = 0;
  function lr() {
    return Ct & 6 ? Nt() : js !== -1 ? js : js = Nt();
  }
  function al(n) {
    return n.mode & 1 ? Ct & 2 && Qn !== 0 ? Qn & -Qn : Oc.transition !== null ? (ku === 0 && (ku = Qu()), ku) : (n = At, n !== 0 || (n = window.event, n = n === void 0 ? 16 : ls(n.type)), n) : 1;
  }
  function xn(n, r, l, o) {
    if (50 < Fs) throw Fs = 0, pf = null, Error(R(185));
    $i(n, l, o), (!(Ct & 2) || n !== Ln) && (n === Ln && (!(Ct & 2) && (Ao |= l), Gn === 4 && Li(n, Qn)), qn(n, o), l === 1 && Ct === 0 && !(r.mode & 1) && (zo = Nt() + 500, rr && ra()));
  }
  function qn(n, r) {
    var l = n.callbackNode;
    Tl(n, r);
    var o = zr(n, n === Ln ? Qn : 0);
    if (o === 0) l !== null && fn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && fn(l), r === 1) n.tag === 0 ? Dd(Fo.bind(null, n)) : kd(Fo.bind(null, n)), bd(function() {
        !(Ct & 6) && ra();
      }), l = null;
      else {
        switch (qu(o)) {
          case 1:
            l = Nr;
            break;
          case 4:
            l = mt;
            break;
          case 16:
            l = Ua;
            break;
          case 536870912:
            l = Yu;
            break;
          default:
            l = Ua;
        }
        l = Th(l, vf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function vf(n, r) {
    if (js = -1, ku = 0, Ct & 6) throw Error(R(327));
    var l = n.callbackNode;
    if (jo() && n.callbackNode !== l) return null;
    var o = zr(n, n === Ln ? Qn : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = mf(n, o);
    else {
      r = o;
      var c = Ct;
      Ct |= 2;
      var d = yh();
      (Ln !== n || Qn !== r) && (rl = null, zo = Nt() + 500, Ou(n, r));
      do
        try {
          Hy();
          break;
        } catch (T) {
          mh(n, T);
        }
      while (!0);
      _a(), xu.current = d, Ct = c, vn !== null ? r = 0 : (Ln = null, Qn = 0, r = Gn);
    }
    if (r !== 0) {
      if (r === 2 && (c = wl(n), c !== 0 && (o = c, r = Du(n, c))), r === 1) throw l = Us, Ou(n, 0), Li(n, o), qn(n, Nt()), l;
      if (r === 6) Li(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !Jd(c) && (r = mf(n, o), r === 2 && (d = wl(n), d !== 0 && (o = d, r = Du(n, d))), r === 1)) throw l = Us, Ou(n, 0), Li(n, o), qn(n, Nt()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(R(345));
          case 2:
            $l(n, Dr, rl);
            break;
          case 3:
            if (Li(n, o), (o & 130023424) === o && (r = cf + 500 - Nt(), 10 < r)) {
              if (zr(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                lr(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = pu($l.bind(null, n, Dr, rl), r);
              break;
            }
            $l(n, Dr, rl);
            break;
          case 4:
            if (Li(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - Ar(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = Nt() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * jy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = pu($l.bind(null, n, Dr, rl), o);
              break;
            }
            $l(n, Dr, rl);
            break;
          case 5:
            $l(n, Dr, rl);
            break;
          default:
            throw Error(R(329));
        }
      }
    }
    return qn(n, Nt()), n.callbackNode === l ? vf.bind(null, n) : null;
  }
  function Du(n, r) {
    var l = Vl;
    return n.current.memoizedState.isDehydrated && (Ou(n, r).flags |= 256), n = mf(n, r), n !== 2 && (r = Dr, Dr = l, r !== null && Zd(r)), n;
  }
  function Zd(n) {
    Dr === null ? Dr = n : Dr.push.apply(Dr, n);
  }
  function Jd(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!Pa(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function Li(n, r) {
    for (r &= ~Kd, r &= ~Ao, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Ar(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Fo(n) {
    if (Ct & 6) throw Error(R(327));
    jo();
    var r = zr(n, 0);
    if (!(r & 1)) return qn(n, Nt()), null;
    var l = mf(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = wl(n);
      o !== 0 && (r = o, l = Du(n, o));
    }
    if (l === 1) throw l = Us, Ou(n, 0), Li(n, r), qn(n, Nt()), l;
    if (l === 6) throw Error(R(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, $l(n, Dr, rl), qn(n, Nt()), null;
  }
  function ep(n, r) {
    var l = Ct;
    Ct |= 1;
    try {
      return n(r);
    } finally {
      Ct = l, Ct === 0 && (zo = Nt() + 500, rr && ra());
    }
  }
  function Ni(n) {
    Xa !== null && Xa.tag === 0 && !(Ct & 6) && jo();
    var r = Ct;
    Ct |= 1;
    var l = qa.transition, o = At;
    try {
      if (qa.transition = null, At = 1, n) return n();
    } finally {
      At = o, qa.transition = l, Ct = r, !(Ct & 6) && ra();
    }
  }
  function hf() {
    fa = No.current, Pt(No);
  }
  function Ou(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, Bv(l)), vn !== null) for (l = vn.return; l !== null; ) {
      var o = l;
      switch (Md(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && $a();
          break;
        case 3:
          ho(), Pt(On), Pt(nt), jd();
          break;
        case 5:
          Fd(o);
          break;
        case 4:
          ho();
          break;
        case 13:
          Pt(gn);
          break;
        case 19:
          Pt(gn);
          break;
        case 10:
          Ad(o.type._context);
          break;
        case 22:
        case 23:
          hf();
      }
      l = l.return;
    }
    if (Ln = n, vn = n = Bl(n.current, null), Qn = fa = r, Gn = 0, Us = null, Kd = Ao = _u = 0, Dr = Vl = null, yu !== null) {
      for (r = 0; r < yu.length; r++) if (l = yu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var m = d.next;
          d.next = c, o.next = m;
        }
        l.pending = o;
      }
      yu = null;
    }
    return n;
  }
  function mh(n, r) {
    do {
      var l = vn;
      try {
        if (_a(), Fc.current = _r, ka) {
          for (var o = je.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          ka = !1;
        }
        if (Ae = 0, gt = rt = je = null, mo = !1, xs = 0, sf.current = null, l === null || l.return === null) {
          Gn = 1, Us = r, vn = null;
          break;
        }
        e: {
          var d = n, m = l.return, T = l, x = r;
          if (r = Qn, T.flags |= 32768, x !== null && typeof x == "object" && typeof x.then == "function") {
            var j = x, ee = T, te = ee.tag;
            if (!(ee.mode & 1) && (te === 0 || te === 11 || te === 15)) {
              var X = ee.alternate;
              X ? (ee.updateQueue = X.updateQueue, ee.memoizedState = X.memoizedState, ee.lanes = X.lanes) : (ee.updateQueue = null, ee.memoizedState = null);
            }
            var Ce = uh(m);
            if (Ce !== null) {
              Ce.flags &= -257, Bd(Ce, m, T, d, r), Ce.mode & 1 && Ms(d, j, r), r = Ce, x = j;
              var _e = r.updateQueue;
              if (_e === null) {
                var Oe = /* @__PURE__ */ new Set();
                Oe.add(x), r.updateQueue = Oe;
              } else _e.add(x);
              break e;
            } else {
              if (!(r & 1)) {
                Ms(d, j, r), Ps();
                break e;
              }
              x = Error(R(426));
            }
          } else if (pn && T.mode & 1) {
            var jn = uh(m);
            if (jn !== null) {
              !(jn.flags & 65536) && (jn.flags |= 256), Bd(jn, m, T, d, r), Nd(Pl(x, T));
              break e;
            }
          }
          d = x = Pl(x, T), Gn !== 4 && (Gn = 2), Vl === null ? Vl = [d] : Vl.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var M = ih(d, x, r);
                Xv(d, M);
                break e;
              case 1:
                T = x;
                var k = d.type, A = d.stateNode;
                if (!(d.flags & 128) && (typeof k.getDerivedStateFromError == "function" || A !== null && typeof A.componentDidCatch == "function" && (Ka === null || !Ka.has(A)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var ue = lh(d, T, r);
                  Xv(d, ue);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Sh(l);
      } catch (ze) {
        r = ze, vn === l && l !== null && (vn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function yh() {
    var n = xu.current;
    return xu.current = _r, n === null ? _r : n;
  }
  function Ps() {
    (Gn === 0 || Gn === 3 || Gn === 2) && (Gn = 4), Ln === null || !(_u & 268435455) && !(Ao & 268435455) || Li(Ln, Qn);
  }
  function mf(n, r) {
    var l = Ct;
    Ct |= 2;
    var o = yh();
    (Ln !== n || Qn !== r) && (rl = null, Ou(n, r));
    do
      try {
        Py();
        break;
      } catch (c) {
        mh(n, c);
      }
    while (!0);
    if (_a(), Ct = l, xu.current = o, vn !== null) throw Error(R(261));
    return Ln = null, Qn = 0, Gn;
  }
  function Py() {
    for (; vn !== null; ) gh(vn);
  }
  function Hy() {
    for (; vn !== null && !wr(); ) gh(vn);
  }
  function gh(n) {
    var r = Rh(n.alternate, n, fa);
    n.memoizedProps = n.pendingProps, r === null ? Sh(n) : vn = r, sf.current = null;
  }
  function Sh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = zy(l, r), l !== null) {
          l.flags &= 32767, vn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          Gn = 6, vn = null;
          return;
        }
      } else if (l = Ay(l, r, fa), l !== null) {
        vn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        vn = r;
        return;
      }
      vn = r = n;
    } while (r !== null);
    Gn === 0 && (Gn = 5);
  }
  function $l(n, r, l) {
    var o = At, c = qa.transition;
    try {
      qa.transition = null, At = 1, Vy(n, r, l, o);
    } finally {
      qa.transition = c, At = o;
    }
    return null;
  }
  function Vy(n, r, l, o) {
    do
      jo();
    while (Xa !== null);
    if (Ct & 6) throw Error(R(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(R(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (ad(n, d), n === Ln && (vn = Ln = null, Qn = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Uo || (Uo = !0, Th(Ua, function() {
      return jo(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = qa.transition, qa.transition = null;
      var m = At;
      At = 1;
      var T = Ct;
      Ct |= 4, sf.current = null, Uy(n, l), vh(l, n), Sc(du), ja = !!Td, du = Td = null, n.current = l, Fy(l), wi(), Ct = T, At = m, qa.transition = d;
    } else n.current = l;
    if (Uo && (Uo = !1, Xa = n, df = c), d = n.pendingLanes, d === 0 && (Ka = null), rs(l.stateNode), qn(n, Nt()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (ff) throw ff = !1, n = Xd, Xd = null, n;
    return df & 1 && n.tag !== 0 && jo(), d = n.pendingLanes, d & 1 ? n === pf ? Fs++ : (Fs = 0, pf = n) : Fs = 0, ra(), null;
  }
  function jo() {
    if (Xa !== null) {
      var n = qu(df), r = qa.transition, l = At;
      try {
        if (qa.transition = null, At = 16 > n ? 16 : n, Xa === null) var o = !1;
        else {
          if (n = Xa, Xa = null, df = 0, Ct & 6) throw Error(R(331));
          var c = Ct;
          for (Ct |= 4, be = n.current; be !== null; ) {
            var d = be, m = d.child;
            if (be.flags & 16) {
              var T = d.deletions;
              if (T !== null) {
                for (var x = 0; x < T.length; x++) {
                  var j = T[x];
                  for (be = j; be !== null; ) {
                    var ee = be;
                    switch (ee.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ko(8, ee, d);
                    }
                    var te = ee.child;
                    if (te !== null) te.return = ee, be = te;
                    else for (; be !== null; ) {
                      ee = be;
                      var X = ee.sibling, Ce = ee.return;
                      if (dh(ee), ee === j) {
                        be = null;
                        break;
                      }
                      if (X !== null) {
                        X.return = Ce, be = X;
                        break;
                      }
                      be = Ce;
                    }
                  }
                }
                var _e = d.alternate;
                if (_e !== null) {
                  var Oe = _e.child;
                  if (Oe !== null) {
                    _e.child = null;
                    do {
                      var jn = Oe.sibling;
                      Oe.sibling = null, Oe = jn;
                    } while (Oe !== null);
                  }
                }
                be = d;
              }
            }
            if (d.subtreeFlags & 2064 && m !== null) m.return = d, be = m;
            else e: for (; be !== null; ) {
              if (d = be, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  ko(9, d, d.return);
              }
              var M = d.sibling;
              if (M !== null) {
                M.return = d.return, be = M;
                break e;
              }
              be = d.return;
            }
          }
          var k = n.current;
          for (be = k; be !== null; ) {
            m = be;
            var A = m.child;
            if (m.subtreeFlags & 2064 && A !== null) A.return = m, be = A;
            else e: for (m = k; be !== null; ) {
              if (T = be, T.flags & 2048) try {
                switch (T.tag) {
                  case 0:
                  case 11:
                  case 15:
                    uf(9, T);
                }
              } catch (ze) {
                Nn(T, T.return, ze);
              }
              if (T === m) {
                be = null;
                break e;
              }
              var ue = T.sibling;
              if (ue !== null) {
                ue.return = T.return, be = ue;
                break e;
              }
              be = T.return;
            }
          }
          if (Ct = c, ra(), Zr && typeof Zr.onPostCommitFiberRoot == "function") try {
            Zr.onPostCommitFiberRoot(El, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        At = l, qa.transition = r;
      }
    }
    return !1;
  }
  function Eh(n, r, l) {
    r = Pl(l, r), r = ih(n, r, 1), n = Fl(n, r, 1), r = lr(), n !== null && ($i(n, 1, r), qn(n, r));
  }
  function Nn(n, r, l) {
    if (n.tag === 3) Eh(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Eh(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Ka === null || !Ka.has(o))) {
          n = Pl(l, n), n = lh(r, n, 1), r = Fl(r, n, 1), n = lr(), r !== null && ($i(r, 1, n), qn(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function $y(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = lr(), n.pingedLanes |= n.suspendedLanes & l, Ln === n && (Qn & l) === l && (Gn === 4 || Gn === 3 && (Qn & 130023424) === Qn && 500 > Nt() - cf ? Ou(n, 0) : Kd |= l), qn(n, r);
  }
  function Ch(n, r) {
    r === 0 && (n.mode & 1 ? (r = Cl, Cl <<= 1, !(Cl & 130023424) && (Cl = 4194304)) : r = 1);
    var l = lr();
    n = el(n, r), n !== null && ($i(n, r, l), qn(n, l));
  }
  function tp(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Ch(n, l);
  }
  function By(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(R(314));
    }
    o !== null && o.delete(r), Ch(n, l);
  }
  var Rh;
  Rh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || On.current) sa = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return sa = !1, nl(n, r, l);
      sa = !!(n.flags & 131072);
    }
    else sa = !1, pn && r.flags & 1048576 && Od(r, so, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        As(n, r), n = r.pendingProps;
        var c = Va(r, nt.current);
        fo(r, l), c = q(null, r, o, n, c, l);
        var d = In();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, yn(o) ? (d = !0, bc(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Lc(r), c.updater = Tu, r.stateNode = c, c._reactInternals = r, Vd(r, o, n, l), r = ef(null, r, o, !0, d, l)) : (r.tag = 0, pn && d && xc(r), Un(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (As(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = Iy(o), n = oa(o, n), c) {
            case 0:
              r = st(null, r, o, n, l);
              break e;
            case 1:
              r = Ls(null, r, o, n, l);
              break e;
            case 11:
              r = To(null, r, o, n, l);
              break e;
            case 14:
              r = Hl(null, r, o, oa(o.type, n), l);
              break e;
          }
          throw Error(R(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : oa(o, c), st(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : oa(o, c), Ls(n, r, o, c, l);
      case 3:
        e: {
          if (Ny(r), n === null) throw Error(R(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, po(n, r), Ac(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = Pl(Error(R(423)), r), r = sh(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = Pl(Error(R(424)), r), r = sh(n, r, o, l, c);
            break e;
          } else for (la = vi(r.stateNode.containerInfo.firstChild), xa = r, pn = !0, Ia = null, l = qv(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (bn(), o === c) {
              r = Fn(n, r, l);
              break e;
            }
            Un(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Jv(r), n === null && kc(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, gs(o, c) ? m = null : d !== null && gs(o, d) && (r.flags |= 32), wu(n, r), Un(n, r, m, l), r.child;
      case 6:
        return n === null && kc(r), null;
      case 13:
        return ch(n, r, l);
      case 4:
        return Ud(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = co(r, null, o, l) : Un(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : oa(o, c), To(n, r, o, c, l);
      case 7:
        return Un(n, r, r.pendingProps, l), r.child;
      case 8:
        return Un(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Un(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, Yt(Ji, o._currentValue), o._currentValue = m, d !== null) if (Pa(d.value, m)) {
            if (d.children === c.children && !On.current) {
              r = Fn(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var T = d.dependencies;
            if (T !== null) {
              m = d.child;
              for (var x = T.firstContext; x !== null; ) {
                if (x.context === o) {
                  if (d.tag === 1) {
                    x = ua(-1, l & -l), x.tag = 2;
                    var j = d.updateQueue;
                    if (j !== null) {
                      j = j.shared;
                      var ee = j.pending;
                      ee === null ? x.next = x : (x.next = ee.next, ee.next = x), j.pending = x;
                    }
                  }
                  d.lanes |= l, x = d.alternate, x !== null && (x.lanes |= l), zd(
                    d.return,
                    l,
                    r
                  ), T.lanes |= l;
                  break;
                }
                x = x.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(R(341));
              m.lanes |= l, T = m.alternate, T !== null && (T.lanes |= l), zd(m, l, r), m = d.sibling;
            } else m = d.child;
            if (m !== null) m.return = d;
            else for (m = d; m !== null; ) {
              if (m === r) {
                m = null;
                break;
              }
              if (d = m.sibling, d !== null) {
                d.return = m.return, m = d;
                break;
              }
              m = m.return;
            }
            d = m;
          }
          Un(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, fo(r, l), c = Wa(c), o = o(c), r.flags |= 1, Un(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = oa(o, r.pendingProps), c = oa(o.type, c), Hl(n, r, o, c, l);
      case 15:
        return Jc(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : oa(o, c), As(n, r), r.tag = 1, yn(o) ? (n = !0, bc(r)) : n = !1, fo(r, l), nh(r, o, c), Vd(r, o, c, l), ef(null, r, o, !0, n, l);
      case 19:
        return Yd(n, r, l);
      case 22:
        return ca(n, r, l);
    }
    throw Error(R(156, r.tag));
  };
  function Th(n, r) {
    return an(n, r);
  }
  function wh(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Za(n, r, l, o) {
    return new wh(n, r, l, o);
  }
  function np(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function Iy(n) {
    if (typeof n == "function") return np(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === mn) return 11;
      if (n === Lt) return 14;
    }
    return 2;
  }
  function Bl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Za(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function yf(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function") np(n) && (m = 1);
    else if (typeof n == "string") m = 5;
    else e: switch (n) {
      case pe:
        return Mu(l.children, c, d, r);
      case nn:
        m = 8, c |= 8;
        break;
      case En:
        return n = Za(12, l, r, c | 2), n.elementType = En, n.lanes = d, n;
      case Ye:
        return n = Za(13, l, r, c), n.elementType = Ye, n.lanes = d, n;
      case lt:
        return n = Za(19, l, r, c), n.elementType = lt, n.lanes = d, n;
      case xe:
        return gf(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Ht:
            m = 10;
            break e;
          case Ot:
            m = 9;
            break e;
          case mn:
            m = 11;
            break e;
          case Lt:
            m = 14;
            break e;
          case Tt:
            m = 16, o = null;
            break e;
        }
        throw Error(R(130, n == null ? n : typeof n, ""));
    }
    return r = Za(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function Mu(n, r, l, o) {
    return n = Za(7, n, o, r), n.lanes = l, n;
  }
  function gf(n, r, l, o) {
    return n = Za(22, n, o, r), n.elementType = xe, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Sf(n, r, l) {
    return n = Za(6, n, null, r), n.lanes = l, n;
  }
  function Hs(n, r, l) {
    return r = Za(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Vs(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Gu(0), this.expirationTimes = Gu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Gu(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function rp(n, r, l, o, c, d, m, T, x) {
    return n = new Vs(n, r, l, T, x), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Za(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Lc(d), n;
  }
  function bh(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Be, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function ap(n) {
    if (!n) return ki;
    n = n._reactInternals;
    e: {
      if (Fe(n) !== n || n.tag !== 1) throw Error(R(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (yn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(R(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (yn(l)) return Cs(n, l, r);
    }
    return r;
  }
  function ip(n, r, l, o, c, d, m, T, x) {
    return n = rp(l, o, !0, n, c, d, m, T, x), n.context = ap(null), l = n.current, o = lr(), c = al(l), d = ua(o, c), d.callback = r ?? null, Fl(l, d, c), n.current.lanes = c, $i(n, c, o), qn(n, o), n;
  }
  function Ef(n, r, l, o) {
    var c = r.current, d = lr(), m = al(c);
    return l = ap(l), r.context === null ? r.context = l : r.pendingContext = l, r = ua(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Fl(c, r, m), n !== null && (xn(n, c, m, d), Nc(n, c, m)), m;
  }
  function $s(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function xh(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function lp(n, r) {
    xh(n, r), (n = n.alternate) && xh(n, r);
  }
  function Yy() {
    return null;
  }
  var up = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Cf(n) {
    this._internalRoot = n;
  }
  Bs.prototype.render = Cf.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(R(409));
    Ef(n, r, null, null);
  }, Bs.prototype.unmount = Cf.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Ni(function() {
        Ef(null, n, null, null);
      }), r[Xi] = null;
    }
  };
  function Bs(n) {
    this._internalRoot = n;
  }
  Bs.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Xu();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < It.length && r !== 0 && r < It[l].priority; l++) ;
      It.splice(l, 0, n), l === 0 && dc(n);
    }
  };
  function Il(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Rf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function _h() {
  }
  function Wy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var j = $s(m);
          d.call(j);
        };
      }
      var m = ip(r, o, n, 0, null, !1, !1, "", _h);
      return n._reactRootContainer = m, n[Xi] = m.current, uo(n.nodeType === 8 ? n.parentNode : n), Ni(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var T = o;
      o = function() {
        var j = $s(x);
        T.call(j);
      };
    }
    var x = rp(n, 0, !1, null, null, !1, !1, "", _h);
    return n._reactRootContainer = x, n[Xi] = x.current, uo(n.nodeType === 8 ? n.parentNode : n), Ni(function() {
      Ef(r, x, l, o);
    }), x;
  }
  function Tf(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var T = c;
        c = function() {
          var x = $s(m);
          T.call(x);
        };
      }
      Ef(r, m, n, c);
    } else m = Wy(l, r, n, c, o);
    return $s(m);
  }
  iu = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = si(r.pendingLanes);
          l !== 0 && (bi(r, l | 1), qn(r, Nt()), !(Ct & 6) && (zo = Nt() + 500, ra()));
        }
        break;
      case 13:
        Ni(function() {
          var o = el(n, 1);
          if (o !== null) {
            var c = lr();
            xn(o, n, 1, c);
          }
        }), lp(n, 1);
    }
  }, Ku = function(n) {
    if (n.tag === 13) {
      var r = el(n, 134217728);
      if (r !== null) {
        var l = lr();
        xn(r, n, 134217728, l);
      }
      lp(n, 134217728);
    }
  }, bt = function(n) {
    if (n.tag === 13) {
      var r = al(n), l = el(n, r);
      if (l !== null) {
        var o = lr();
        xn(l, n, r, o);
      }
      lp(n, r);
    }
  }, Xu = function() {
    return At;
  }, Zu = function(n, r) {
    var l = At;
    try {
      return At = n, r();
    } finally {
      At = l;
    }
  }, Mr = function(n, r, l) {
    switch (r) {
      case "input":
        if (An(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = Ie(o);
              if (!c) throw Error(R(90));
              we(o), An(o, c);
            }
          }
        }
        break;
      case "textarea":
        Sa(n, l);
        break;
      case "select":
        r = l.value, r != null && Cr(n, !!l.multiple, r, !1);
    }
  }, au = ep, Iu = Ni;
  var Qy = { usingClientEntryPoint: !1, Events: [Es, oo, Ie, za, yl, ep] }, Is = { findFiberByHostInstance: Ha, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, kh = { bundleType: Is.bundleType, version: Is.version, rendererPackageName: Is.rendererPackageName, rendererConfig: Is.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ue.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = ht(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Is.findFiberByHostInstance || Yy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var wf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!wf.isDisabled && wf.supportsFiber) try {
      El = wf.inject(kh), Zr = wf;
    } catch {
    }
  }
  return ai.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qy, ai.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Il(r)) throw Error(R(200));
    return bh(n, r, null, l);
  }, ai.createRoot = function(n, r) {
    if (!Il(n)) throw Error(R(299));
    var l = !1, o = "", c = up;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = rp(n, 1, !1, null, null, l, !1, o, c), n[Xi] = r.current, uo(n.nodeType === 8 ? n.parentNode : n), new Cf(r);
  }, ai.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(R(188)) : (n = Object.keys(n).join(","), Error(R(268, n)));
    return n = ht(r), n = n === null ? null : n.stateNode, n;
  }, ai.flushSync = function(n) {
    return Ni(n);
  }, ai.hydrate = function(n, r, l) {
    if (!Rf(r)) throw Error(R(200));
    return Tf(null, n, r, !0, l);
  }, ai.hydrateRoot = function(n, r, l) {
    if (!Il(n)) throw Error(R(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = up;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = ip(r, null, n, 1, l ?? null, c, !1, d, m), n[Xi] = r.current, uo(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new Bs(r);
  }, ai.render = function(n, r, l) {
    if (!Rf(r)) throw Error(R(200));
    return Tf(null, n, r, !1, l);
  }, ai.unmountComponentAtNode = function(n) {
    if (!Rf(n)) throw Error(R(40));
    return n._reactRootContainer ? (Ni(function() {
      Tf(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Xi] = null;
      });
    }), !0) : !1;
  }, ai.unstable_batchedUpdates = ep, ai.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!Rf(l)) throw Error(R(200));
    if (n == null || n._reactInternals === void 0) throw Error(R(38));
    return Tf(n, r, l, !1, o);
  }, ai.version = "18.3.1-next-f1338f8080-20240426", ai;
}
var ii = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var JR;
function EO() {
  return JR || (JR = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var y = ga, E = gT(), R = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, z = !1;
    function H(e) {
      z = e;
    }
    function Y(e) {
      if (!z) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        he("warn", e, a);
      }
    }
    function S(e) {
      if (!z) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        he("error", e, a);
      }
    }
    function he(e, t, a) {
      {
        var i = R.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var Z = 0, G = 1, me = 2, K = 3, ce = 4, ae = 5, ge = 6, Me = 7, $e = 8, tt = 9, Le = 10, Se = 11, Ue = 12, $ = 13, Be = 14, pe = 15, nn = 16, En = 17, Ht = 18, Ot = 19, mn = 21, Ye = 22, lt = 23, Lt = 24, Tt = 25, xe = !0, ie = !1, Ne = !1, se = !1, O = !1, W = !0, We = !1, Ze = !0, ct = !0, ot = !0, St = !0, dt = /* @__PURE__ */ new Set(), pt = {}, Xt = {};
    function Zn(e, t) {
      we(e, t), we(e + "Capture", t);
    }
    function we(e, t) {
      pt[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), pt[e] = t;
      {
        var a = e.toLowerCase();
        Xt[a] = e, e === "onDoubleClick" && (Xt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        dt.add(t[i]);
    }
    var rn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Cn = Object.prototype.hasOwnProperty;
    function kn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Hn(e) {
      try {
        return An(e), !1;
      } catch {
        return !0;
      }
    }
    function An(e) {
      return "" + e;
    }
    function Gr(e, t) {
      if (Hn(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, kn(e)), An(e);
    }
    function qr(e) {
      if (Hn(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kn(e)), An(e);
    }
    function Jn(e, t) {
      if (Hn(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, kn(e)), An(e);
    }
    function Cr(e, t) {
      if (Hn(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, kn(e)), An(e);
    }
    function Kr(e) {
      if (Hn(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", kn(e)), An(e);
    }
    function Rr(e) {
      if (Hn(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", kn(e)), An(e);
    }
    var Sa = 0, sr = 1, Xr = 2, Rn = 3, Or = 4, Ei = 5, Ea = 6, oe = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", He = oe + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", vt = new RegExp("^[" + oe + "][" + He + "]*$"), jt = {}, Vt = {};
    function zn(e) {
      return Cn.call(Vt, e) ? !0 : Cn.call(jt, e) ? !1 : vt.test(e) ? (Vt[e] = !0, !0) : (jt[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function Tn(e, t, a) {
      return t !== null ? t.type === Sa : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Tr(e, t, a, i) {
      if (a !== null && a.type === Sa)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Qt(e, t, a, i) {
      if (t === null || typeof t > "u" || Tr(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Rn:
            return !t;
          case Or:
            return t === !1;
          case Ei:
            return isNaN(t);
          case Ea:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Mr(e) {
      return Bt.hasOwnProperty(e) ? Bt[e] : null;
    }
    function $t(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Xr || t === Rn || t === Or, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var Bt = {}, ui = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    ui.forEach(function(e) {
      Bt[e] = new $t(
        e,
        Sa,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      Bt[t] = new $t(
        t,
        sr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      Bt[e] = new $t(
        e,
        Xr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      Bt[e] = new $t(
        e,
        Xr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      Bt[e] = new $t(
        e,
        Rn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Bt[e] = new $t(
        e,
        Rn,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Bt[e] = new $t(
        e,
        Or,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Bt[e] = new $t(
        e,
        Ea,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      Bt[e] = new $t(
        e,
        Ei,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var za = /[\-\:]([a-z])/g, yl = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(za, yl);
      Bt[t] = new $t(
        t,
        sr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(za, yl);
      Bt[t] = new $t(
        t,
        sr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(za, yl);
      Bt[t] = new $t(
        t,
        sr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Bt[e] = new $t(
        e,
        sr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var au = "xlinkHref";
    Bt[au] = new $t(
      "xlinkHref",
      sr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Bt[e] = new $t(
        e,
        sr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Iu = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Vi = !1;
    function gl(e) {
      !Vi && Iu.test(e) && (Vi = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function Ca(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Gr(a, t), i.sanitizeURL && gl("" + a);
        var s = i.attributeName, f = null;
        if (i.type === Or) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : Qt(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (Qt(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === Rn)
            return a;
          f = e.getAttribute(s);
        }
        return Qt(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function Ci(e, t, a, i) {
      {
        if (!zn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Gr(a, t), u === "" + a ? a : u;
      }
    }
    function Ra(e, t, a, i) {
      var u = Mr(t);
      if (!Tn(t, u, i)) {
        if (Qt(t, a, u, i) && (a = null), i || u === null) {
          if (zn(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Gr(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === Rn ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var g = u.attributeName, C = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(g);
        else {
          var D = u.type, _;
          D === Rn || D === Or && a === !0 ? _ = "" : (Gr(a, g), _ = "" + a, u.sanitizeURL && gl(_.toString())), C ? e.setAttributeNS(C, g, _) : e.setAttribute(g, _);
        }
      }
    }
    var oi = Symbol.for("react.element"), Lr = Symbol.for("react.portal"), Ta = Symbol.for("react.fragment"), Ri = Symbol.for("react.strict_mode"), Ti = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), J = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), Fe = Symbol.for("react.suspense"), Et = Symbol.for("react.suspense_list"), wt = Symbol.for("react.memo"), qe = Symbol.for("react.lazy"), ht = Symbol.for("react.scope"), Vn = Symbol.for("react.debug_trace_mode"), an = Symbol.for("react.offscreen"), fn = Symbol.for("react.legacy_hidden"), wr = Symbol.for("react.cache"), wi = Symbol.for("react.tracing_marker"), Nt = Symbol.iterator, er = "@@iterator";
    function Nr(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Nt && e[Nt] || e[er];
      return typeof t == "function" ? t : null;
    }
    var mt = Object.assign, Ua = 0, Sl, Yu, El, Zr, rs, Ar, as;
    function is() {
    }
    is.__reactDisabledLog = !0;
    function cc() {
      {
        if (Ua === 0) {
          Sl = console.log, Yu = console.info, El = console.warn, Zr = console.error, rs = console.group, Ar = console.groupCollapsed, as = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: is,
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
        Ua++;
      }
    }
    function Wu() {
      {
        if (Ua--, Ua === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: mt({}, e, {
              value: Sl
            }),
            info: mt({}, e, {
              value: Yu
            }),
            warn: mt({}, e, {
              value: El
            }),
            error: mt({}, e, {
              value: Zr
            }),
            group: mt({}, e, {
              value: rs
            }),
            groupCollapsed: mt({}, e, {
              value: Ar
            }),
            groupEnd: mt({}, e, {
              value: as
            })
          });
        }
        Ua < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Cl = R.ReactCurrentDispatcher, si;
    function zr(e, t, a) {
      {
        if (si === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            si = i && i[1] || "";
          }
        return `
` + si + e;
      }
    }
    var Rl = !1, Tl;
    {
      var wl = typeof WeakMap == "function" ? WeakMap : Map;
      Tl = new wl();
    }
    function Qu(e, t) {
      if (!e || Rl)
        return "";
      {
        var a = Tl.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      Rl = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Cl.current, Cl.current = null, cc();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (P) {
              i = P;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (P) {
              i = P;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (P) {
            i = P;
          }
          e();
        }
      } catch (P) {
        if (P && i && typeof P.stack == "string") {
          for (var p = P.stack.split(`
`), v = i.stack.split(`
`), g = p.length - 1, C = v.length - 1; g >= 1 && C >= 0 && p[g] !== v[C]; )
            C--;
          for (; g >= 1 && C >= 0; g--, C--)
            if (p[g] !== v[C]) {
              if (g !== 1 || C !== 1)
                do
                  if (g--, C--, C < 0 || p[g] !== v[C]) {
                    var D = `
` + p[g].replace(" at new ", " at ");
                    return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), typeof e == "function" && Tl.set(e, D), D;
                  }
                while (g >= 1 && C >= 0);
              break;
            }
        }
      } finally {
        Rl = !1, Cl.current = s, Wu(), Error.prepareStackTrace = u;
      }
      var _ = e ? e.displayName || e.name : "", U = _ ? zr(_) : "";
      return typeof e == "function" && Tl.set(e, U), U;
    }
    function Gu(e, t, a) {
      return Qu(e, !0);
    }
    function $i(e, t, a) {
      return Qu(e, !1);
    }
    function ad(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function bi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Qu(e, ad(e));
      if (typeof e == "string")
        return zr(e);
      switch (e) {
        case Fe:
          return zr("Suspense");
        case Et:
          return zr("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case re:
            return $i(e.render);
          case wt:
            return bi(e.type, t, a);
          case qe: {
            var i = e, u = i._payload, s = i._init;
            try {
              return bi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function At(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ae:
          return zr(e.type);
        case nn:
          return zr("Lazy");
        case $:
          return zr("Suspense");
        case Ot:
          return zr("SuspenseList");
        case Z:
        case me:
        case pe:
          return $i(e.type);
        case Se:
          return $i(e.type.render);
        case G:
          return Gu(e.type);
        default:
          return "";
      }
    }
    function qu(e) {
      try {
        var t = "", a = e;
        do
          t += At(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function iu(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Ku(e) {
      return e.displayName || "Context";
    }
    function bt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Ta:
          return "Fragment";
        case Lr:
          return "Portal";
        case Ti:
          return "Profiler";
        case Ri:
          return "StrictMode";
        case Fe:
          return "Suspense";
        case Et:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case J:
            var t = e;
            return Ku(t) + ".Consumer";
          case b:
            var a = e;
            return Ku(a._context) + ".Provider";
          case re:
            return iu(e, e.render, "ForwardRef");
          case wt:
            var i = e.displayName || null;
            return i !== null ? i : bt(e.type) || "Memo";
          case qe: {
            var u = e, s = u._payload, f = u._init;
            try {
              return bt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Xu(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Zu(e) {
      return e.displayName || "Context";
    }
    function at(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Lt:
          return "Cache";
        case tt:
          var i = a;
          return Zu(i) + ".Consumer";
        case Le:
          var u = a;
          return Zu(u._context) + ".Provider";
        case Ht:
          return "DehydratedFragment";
        case Se:
          return Xu(a, a.render, "ForwardRef");
        case Me:
          return "Fragment";
        case ae:
          return a;
        case ce:
          return "Portal";
        case K:
          return "Root";
        case ge:
          return "Text";
        case nn:
          return bt(a);
        case $e:
          return a === Ri ? "StrictMode" : "Mode";
        case Ye:
          return "Offscreen";
        case Ue:
          return "Profiler";
        case mn:
          return "Scope";
        case $:
          return "Suspense";
        case Ot:
          return "SuspenseList";
        case Tt:
          return "TracingMarker";
        case G:
        case Z:
        case En:
        case me:
        case Be:
        case pe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var lu = R.ReactDebugCurrentFrame, wn = null, Jr = !1;
    function Ur() {
      {
        if (wn === null)
          return null;
        var e = wn._debugOwner;
        if (e !== null && typeof e < "u")
          return at(e);
      }
      return null;
    }
    function bl() {
      return wn === null ? "" : qu(wn);
    }
    function Dn() {
      lu.getCurrentStack = null, wn = null, Jr = !1;
    }
    function It(e) {
      lu.getCurrentStack = e === null ? null : bl, wn = e, Jr = !1;
    }
    function fc() {
      return wn;
    }
    function ea(e) {
      Jr = e;
    }
    function tr(e) {
      return "" + e;
    }
    function xi(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Rr(e), e;
        default:
          return "";
      }
    }
    var dc = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Bi(e, t) {
      dc[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function xl(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function pc(e) {
      return e._valueTracker;
    }
    function Fa(e) {
      e._valueTracker = null;
    }
    function _l(e) {
      var t = "";
      return e && (xl(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Ii(e) {
      var t = xl(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Rr(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            Rr(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Rr(p), i = "" + p;
          },
          stopTracking: function() {
            Fa(e), delete e[t];
          }
        };
        return f;
      }
    }
    function ja(e) {
      pc(e) || (e._valueTracker = Ii(e));
    }
    function Ju(e) {
      if (!e)
        return !1;
      var t = pc(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = _l(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function kl(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Dl = !1, uu = !1, eo = !1, ls = !1;
    function ci(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function h(e, t) {
      var a = e, i = t.checked, u = mt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function w(e, t) {
      Bi("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !uu && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ur() || "A component", t.type), uu = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Dl && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ur() || "A component", t.type), Dl = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: xi(t.value != null ? t.value : i),
        controlled: ci(t)
      };
    }
    function F(e, t) {
      var a = e, i = t.checked;
      i != null && Ra(a, "checked", i, !1);
    }
    function V(e, t) {
      var a = e;
      {
        var i = ci(t);
        !a._wrapperState.controlled && i && !ls && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ls = !0), a._wrapperState.controlled && !i && !eo && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), eo = !0);
      }
      F(e, t);
      var u = xi(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = tr(u)) : a.value !== tr(u) && (a.value = tr(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Ge(a, t.type, u) : t.hasOwnProperty("defaultValue") && Ge(a, t.type, xi(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function le(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = tr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function Ke(e, t) {
      var a = e;
      V(a, t), ve(a, t);
    }
    function ve(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Gr(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Yh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Ju(f), V(f, p);
          }
        }
      }
    }
    function Ge(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || kl(e.ownerDocument) !== e) && (a == null ? e.defaultValue = tr(e._wrapperState.initialValue) : e.defaultValue !== tr(a) && (e.defaultValue = tr(a)));
    }
    var yt = !1, Mt = !1, ln = !1;
    function Gt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? y.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Mt || (Mt = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (ln || (ln = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !yt && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), yt = !0);
    }
    function un(e, t) {
      t.value != null && e.setAttribute("value", tr(xi(t.value)));
    }
    var sn = Array.isArray;
    function xt(e) {
      return sn(e);
    }
    var Yi;
    Yi = !1;
    function to() {
      var e = Ur();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var us = ["value", "defaultValue"];
    function id(e) {
      {
        Bi("select", e);
        for (var t = 0; t < us.length; t++) {
          var a = us[t];
          if (e[a] != null) {
            var i = xt(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, to()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, to());
          }
        }
      }
    }
    function fi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var g = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== g && (u[v].selected = g), g && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var C = tr(xi(a)), D = null, _ = 0; _ < u.length; _++) {
          if (u[_].value === C) {
            u[_].selected = !0, i && (u[_].defaultSelected = !0);
            return;
          }
          D === null && !u[_].disabled && (D = u[_]);
        }
        D !== null && (D.selected = !0);
      }
    }
    function os(e, t) {
      return mt({}, t, {
        value: void 0
      });
    }
    function ss(e, t) {
      var a = e;
      id(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Yi && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Yi = !0);
    }
    function ld(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? fi(a, !!t.multiple, i, !1) : t.defaultValue != null && fi(a, !!t.multiple, t.defaultValue, !0);
    }
    function my(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? fi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? fi(a, !!t.multiple, t.defaultValue, !0) : fi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function yy(e, t) {
      var a = e, i = t.value;
      i != null && fi(a, !!t.multiple, i, !1);
    }
    var ud = !1;
    function od(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = mt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: tr(a._wrapperState.initialValue)
      });
      return i;
    }
    function mv(e, t) {
      var a = e;
      Bi("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !ud && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ur() || "A component"), ud = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (xt(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: xi(i)
      };
    }
    function yv(e, t) {
      var a = e, i = xi(t.value), u = xi(t.defaultValue);
      if (i != null) {
        var s = tr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = tr(u));
    }
    function gv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function sd(e, t) {
      yv(e, t);
    }
    var Wi = "http://www.w3.org/1999/xhtml", gy = "http://www.w3.org/1998/Math/MathML", cd = "http://www.w3.org/2000/svg";
    function vc(e) {
      switch (e) {
        case "svg":
          return cd;
        case "math":
          return gy;
        default:
          return Wi;
      }
    }
    function fd(e, t) {
      return e == null || e === Wi ? vc(t) : e === cd && t === "foreignObject" ? Wi : e;
    }
    var Sy = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, hc, Sv = Sy(function(e, t) {
      if (e.namespaceURI === cd && !("innerHTML" in e)) {
        hc = hc || document.createElement("div"), hc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = hc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), ta = 1, Qi = 3, $n = 8, di = 9, ou = 11, mc = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Qi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Ev = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, no = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function Cv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Rv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(no).forEach(function(e) {
      Rv.forEach(function(t) {
        no[Cv(t, e)] = no[e];
      });
    });
    function yc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(no.hasOwnProperty(e) && no[e]) ? t + "px" : (Cr(t, e), ("" + t).trim());
    }
    var ro = /([A-Z])/g, Ey = /^ms-/;
    function Cy(e) {
      return e.replace(ro, "-$1").toLowerCase().replace(Ey, "-ms-");
    }
    var Tv = function() {
    };
    {
      var wv = /^(?:webkit|moz|o)[A-Z]/, bv = /^-ms-/, cs = /-(.)/g, ao = /;\s*$/, io = {}, lo = {}, xv = !1, dd = !1, pd = function(e) {
        return e.replace(cs, function(t, a) {
          return a.toUpperCase();
        });
      }, vd = function(e) {
        io.hasOwnProperty(e) && io[e] || (io[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          pd(e.replace(bv, "ms-"))
        ));
      }, _v = function(e) {
        io.hasOwnProperty(e) && io[e] || (io[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, kv = function(e, t) {
        lo.hasOwnProperty(t) && lo[t] || (lo[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(ao, "")));
      }, Dv = function(e, t) {
        xv || (xv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Ry = function(e, t) {
        dd || (dd = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Tv = function(e, t) {
        e.indexOf("-") > -1 ? vd(e) : wv.test(e) ? _v(e) : ao.test(t) && kv(e, t), typeof t == "number" && (isNaN(t) ? Dv(e, t) : isFinite(t) || Ry(e, t));
      };
    }
    var Ty = Tv;
    function wy(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : Cy(i)) + ":", t += yc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function Ov(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || Ty(i, t[i]);
          var s = yc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function by(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Pa(e) {
      var t = {};
      for (var a in e)
        for (var i = Ev[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function fs(e, t) {
      {
        if (!t)
          return;
        var a = Pa(e), i = Pa(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", by(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var Mv = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, Lv = mt({
      menuitem: !0
    }, Mv), Nv = "__html";
    function gc(e, t) {
      if (t) {
        if (Lv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Nv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Gi(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Sc = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, Av = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, pi = {}, hd = new RegExp("^(aria)-[" + He + "]*$"), ds = new RegExp("^(aria)[A-Z][" + He + "]*$");
    function md(e, t) {
      {
        if (Cn.call(pi, t) && pi[t])
          return !0;
        if (ds.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = Av.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), pi[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), pi[t] = !0, !0;
        }
        if (hd.test(t)) {
          var u = t.toLowerCase(), s = Av.hasOwnProperty(u) ? u : null;
          if (s == null)
            return pi[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), pi[t] = !0, !0;
        }
      }
      return !0;
    }
    function zv(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = md(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function Ec(e, t) {
      Gi(e, t) || zv(e, t);
    }
    var su = !1;
    function yd(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !su && (su = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var gd = function() {
    };
    {
      var nr = {}, Sd = /^on./, Uv = /^on[^A-Z]/, Fv = new RegExp("^(aria)-[" + He + "]*$"), jv = new RegExp("^(aria)[A-Z][" + He + "]*$");
      gd = function(e, t, a, i) {
        if (Cn.call(nr, t) && nr[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), nr[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), nr[t] = !0, !0;
          if (Sd.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), nr[t] = !0, !0;
        } else if (Sd.test(t))
          return Uv.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), nr[t] = !0, !0;
        if (Fv.test(t) || jv.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), nr[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), nr[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), nr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), nr[t] = !0, !0;
        var v = Mr(t), g = v !== null && v.type === Sa;
        if (Sc.hasOwnProperty(u)) {
          var C = Sc[u];
          if (C !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, C), nr[t] = !0, !0;
        } else if (!g && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), nr[t] = !0, !0;
        return typeof a == "boolean" && Tr(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), nr[t] = !0, !0) : g ? !0 : Tr(t, a, v, !1) ? (nr[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === Rn && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), nr[t] = !0), !0);
      };
    }
    var Pv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = gd(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Hv(e, t, a) {
      Gi(e, t) || Pv(e, t, a);
    }
    var qi = 1, ps = 2, cu = 4, xy = qi | ps | cu, vs = null;
    function hs(e) {
      vs !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), vs = e;
    }
    function _y() {
      vs === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), vs = null;
    }
    function Vv(e) {
      return e === vs;
    }
    function Cc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Qi ? t.parentNode : t;
    }
    var on = null, Ol = null, Ki = null;
    function uo(e) {
      var t = Vo(e);
      if (t) {
        if (typeof on != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Yh(a);
          on(t.stateNode, t.type, i);
        }
      }
    }
    function $v(e) {
      on = e;
    }
    function Rc(e) {
      Ol ? Ki ? Ki.push(e) : Ki = [e] : Ol = e;
    }
    function ms() {
      return Ol !== null || Ki !== null;
    }
    function ys() {
      if (Ol) {
        var e = Ol, t = Ki;
        if (Ol = null, Ki = null, uo(e), t)
          for (var a = 0; a < t.length; a++)
            uo(t[a]);
      }
    }
    var fu = function(e, t) {
      return e(t);
    }, Ed = function() {
    }, Cd = !1;
    function ky() {
      var e = ms();
      e && (Ed(), ys());
    }
    function Rd(e, t, a) {
      if (Cd)
        return e(t, a);
      Cd = !0;
      try {
        return fu(e, t, a);
      } finally {
        Cd = !1, ky();
      }
    }
    function Tc(e, t, a) {
      fu = e, Ed = a;
    }
    function wc(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Td(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && wc(t));
        default:
          return !1;
      }
    }
    function du(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Yh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (Td(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var gs = !1;
    if (rn)
      try {
        var pu = {};
        Object.defineProperty(pu, "passive", {
          get: function() {
            gs = !0;
          }
        }), window.addEventListener("test", pu, pu), window.removeEventListener("test", pu, pu);
      } catch {
        gs = !1;
      }
    function Bv(e, t, a, i, u, s, f, p, v) {
      var g = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, g);
      } catch (C) {
        this.onError(C);
      }
    }
    var wd = Bv;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var bd = document.createElement("react");
      wd = function(t, a, i, u, s, f, p, v, g) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var C = document.createEvent("Event"), D = !1, _ = !0, U = window.event, P = Object.getOwnPropertyDescriptor(window, "event");
        function B() {
          bd.removeEventListener(I, Qe, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = U);
        }
        var ye = Array.prototype.slice.call(arguments, 3);
        function Qe() {
          D = !0, B(), a.apply(i, ye), _ = !1;
        }
        var Pe, Dt = !1, Rt = !1;
        function L(N) {
          if (Pe = N.error, Dt = !0, Pe === null && N.colno === 0 && N.lineno === 0 && (Rt = !0), N.defaultPrevented && Pe != null && typeof Pe == "object")
            try {
              Pe._suppressLogging = !0;
            } catch {
            }
        }
        var I = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", L), bd.addEventListener(I, Qe, !1), C.initEvent(I, !1, !1), bd.dispatchEvent(C), P && Object.defineProperty(window, "event", P), D && _ && (Dt ? Rt && (Pe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Pe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Pe)), window.removeEventListener("error", L), !D)
          return B(), Bv.apply(this, arguments);
      };
    }
    var Dy = wd, Ml = !1, vi = null, Ss = !1, Ll = null, _i = {
      onError: function(e) {
        Ml = !0, vi = e;
      }
    };
    function vu(e, t, a, i, u, s, f, p, v) {
      Ml = !1, vi = null, Dy.apply(_i, arguments);
    }
    function Xi(e, t, a, i, u, s, f, p, v) {
      if (vu.apply(this, arguments), Ml) {
        var g = _d();
        Ss || (Ss = !0, Ll = g);
      }
    }
    function xd() {
      if (Ss) {
        var e = Ll;
        throw Ss = !1, Ll = null, e;
      }
    }
    function Oy() {
      return Ml;
    }
    function _d() {
      if (Ml) {
        var e = vi;
        return Ml = !1, vi = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ha(e) {
      return e._reactInternals;
    }
    function Es(e) {
      return e._reactInternals !== void 0;
    }
    function oo(e, t) {
      e._reactInternals = t;
    }
    var Ie = (
      /*                      */
      0
    ), Nl = (
      /*                */
      1
    ), dn = (
      /*                    */
      2
    ), ft = (
      /*                       */
      4
    ), Pt = (
      /*                */
      16
    ), Yt = (
      /*                 */
      32
    ), ki = (
      /*                     */
      64
    ), nt = (
      /*                   */
      128
    ), On = (
      /*            */
      256
    ), na = (
      /*                          */
      512
    ), Va = (
      /*                     */
      1024
    ), yn = (
      /*                      */
      2048
    ), $a = (
      /*                    */
      4096
    ), Al = (
      /*                   */
      8192
    ), Cs = (
      /*             */
      16384
    ), bc = yn | ft | ki | na | Va | Cs, Iv = (
      /*               */
      32767
    ), wa = (
      /*                   */
      32768
    ), rr = (
      /*                */
      65536
    ), Rs = (
      /* */
      131072
    ), kd = (
      /*                       */
      1048576
    ), Dd = (
      /*                    */
      2097152
    ), ra = (
      /*                 */
      4194304
    ), zl = (
      /*                */
      8388608
    ), aa = (
      /*               */
      16777216
    ), hu = (
      /*              */
      33554432
    ), so = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      ft | Va | 0
    ), ia = dn | ft | Pt | Yt | na | $a | Al, br = ft | ki | na | Al, Ba = yn | Pt, cr = ra | zl | Dd, Zi = R.ReactCurrentOwner;
    function ba(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (dn | $a)) !== Ie && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === K ? a : null;
    }
    function Od(e) {
      if (e.tag === $) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function xc(e) {
      return e.tag === K ? e.stateNode.containerInfo : null;
    }
    function Md(e) {
      return ba(e) === e;
    }
    function xa(e) {
      {
        var t = Zi.current;
        if (t !== null && t.tag === G) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", at(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = Ha(e);
      return u ? ba(u) === u : !1;
    }
    function la(e) {
      if (ba(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function pn(e) {
      var t = e.alternate;
      if (!t) {
        var a = ba(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return la(s), e;
            if (v === u)
              return la(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var g = !1, C = s.child; C; ) {
            if (C === i) {
              g = !0, i = s, u = f;
              break;
            }
            if (C === u) {
              g = !0, u = s, i = f;
              break;
            }
            C = C.sibling;
          }
          if (!g) {
            for (C = f.child; C; ) {
              if (C === i) {
                g = !0, i = f, u = s;
                break;
              }
              if (C === u) {
                g = !0, u = f, i = s;
                break;
              }
              C = C.sibling;
            }
            if (!g)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== K)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Ia(e) {
      var t = pn(e);
      return t !== null ? Ld(t) : null;
    }
    function Ld(e) {
      if (e.tag === ae || e.tag === ge)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Ld(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Yv(e) {
      var t = pn(e);
      return t !== null ? _c(t) : null;
    }
    function _c(e) {
      if (e.tag === ae || e.tag === ge)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== ce) {
          var a = _c(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var kc = E.unstable_scheduleCallback, Wv = E.unstable_cancelCallback, Dc = E.unstable_shouldYield, Qv = E.unstable_requestPaint, bn = E.unstable_now, Nd = E.unstable_getCurrentPriorityLevel, Oc = E.unstable_ImmediatePriority, mu = E.unstable_UserBlockingPriority, Di = E.unstable_NormalPriority, Gv = E.unstable_LowPriority, Mc = E.unstable_IdlePriority, co = E.unstable_yieldValue, qv = E.unstable_setDisableYieldValue, Ji = null, Wn = null, fe = null, Ya = !1, _a = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Ad(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        ct && (e = mt({}, e, {
          getLaneLabelMap: el,
          injectProfilingHooks: Kv
        })), Ji = t.inject(e), Wn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function zd(e, t) {
      if (Wn && typeof Wn.onScheduleFiberRoot == "function")
        try {
          Wn.onScheduleFiberRoot(Ji, e, t);
        } catch (a) {
          Ya || (Ya = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function fo(e, t) {
      if (Wn && typeof Wn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & nt) === nt;
          if (ot) {
            var i;
            switch (t) {
              case Fn:
                i = Oc;
                break;
              case nl:
                i = mu;
                break;
              case Oi:
                i = Di;
                break;
              case wo:
                i = Mc;
                break;
              default:
                i = Di;
                break;
            }
            Wn.onCommitFiberRoot(Ji, e, i, a);
          }
        } catch (u) {
          Ya || (Ya = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function Wa(e) {
      if (Wn && typeof Wn.onPostCommitFiberRoot == "function")
        try {
          Wn.onPostCommitFiberRoot(Ji, e);
        } catch (t) {
          Ya || (Ya = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function yu(e) {
      if (Wn && typeof Wn.onCommitFiberUnmount == "function")
        try {
          Wn.onCommitFiberUnmount(Ji, e);
        } catch (t) {
          Ya || (Ya = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Bn(e) {
      if (typeof co == "function" && (qv(e), H(e)), Wn && typeof Wn.setStrictMode == "function")
        try {
          Wn.setStrictMode(Ji, e);
        } catch (t) {
          Ya || (Ya = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Kv(e) {
      fe = e;
    }
    function el() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < _s; a++) {
          var i = Ly(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ul(e) {
      fe !== null && typeof fe.markCommitStarted == "function" && fe.markCommitStarted(e);
    }
    function Lc() {
      fe !== null && typeof fe.markCommitStopped == "function" && fe.markCommitStopped();
    }
    function po(e) {
      fe !== null && typeof fe.markComponentRenderStarted == "function" && fe.markComponentRenderStarted(e);
    }
    function ua() {
      fe !== null && typeof fe.markComponentRenderStopped == "function" && fe.markComponentRenderStopped();
    }
    function Fl(e) {
      fe !== null && typeof fe.markComponentPassiveEffectMountStarted == "function" && fe.markComponentPassiveEffectMountStarted(e);
    }
    function Nc() {
      fe !== null && typeof fe.markComponentPassiveEffectMountStopped == "function" && fe.markComponentPassiveEffectMountStopped();
    }
    function Xv(e) {
      fe !== null && typeof fe.markComponentPassiveEffectUnmountStarted == "function" && fe.markComponentPassiveEffectUnmountStarted(e);
    }
    function Ac() {
      fe !== null && typeof fe.markComponentPassiveEffectUnmountStopped == "function" && fe.markComponentPassiveEffectUnmountStopped();
    }
    function Zv(e) {
      fe !== null && typeof fe.markComponentLayoutEffectMountStarted == "function" && fe.markComponentLayoutEffectMountStarted(e);
    }
    function Ts() {
      fe !== null && typeof fe.markComponentLayoutEffectMountStopped == "function" && fe.markComponentLayoutEffectMountStopped();
    }
    function hi(e) {
      fe !== null && typeof fe.markComponentLayoutEffectUnmountStarted == "function" && fe.markComponentLayoutEffectUnmountStarted(e);
    }
    function vo() {
      fe !== null && typeof fe.markComponentLayoutEffectUnmountStopped == "function" && fe.markComponentLayoutEffectUnmountStopped();
    }
    function ws(e, t, a) {
      fe !== null && typeof fe.markComponentErrored == "function" && fe.markComponentErrored(e, t, a);
    }
    function gu(e, t, a) {
      fe !== null && typeof fe.markComponentSuspended == "function" && fe.markComponentSuspended(e, t, a);
    }
    function Ud(e) {
      fe !== null && typeof fe.markLayoutEffectsStarted == "function" && fe.markLayoutEffectsStarted(e);
    }
    function ho() {
      fe !== null && typeof fe.markLayoutEffectsStopped == "function" && fe.markLayoutEffectsStopped();
    }
    function Jv(e) {
      fe !== null && typeof fe.markPassiveEffectsStarted == "function" && fe.markPassiveEffectsStarted(e);
    }
    function Fd() {
      fe !== null && typeof fe.markPassiveEffectsStopped == "function" && fe.markPassiveEffectsStopped();
    }
    function gn(e) {
      fe !== null && typeof fe.markRenderStarted == "function" && fe.markRenderStarted(e);
    }
    function zc() {
      fe !== null && typeof fe.markRenderYielded == "function" && fe.markRenderYielded();
    }
    function Uc() {
      fe !== null && typeof fe.markRenderStopped == "function" && fe.markRenderStopped();
    }
    function jd(e) {
      fe !== null && typeof fe.markRenderScheduled == "function" && fe.markRenderScheduled(e);
    }
    function Fc(e, t) {
      fe !== null && typeof fe.markForceUpdateScheduled == "function" && fe.markForceUpdateScheduled(e, t);
    }
    function bs(e, t) {
      fe !== null && typeof fe.markStateUpdateScheduled == "function" && fe.markStateUpdateScheduled(e, t);
    }
    var Ae = (
      /*                         */
      0
    ), je = (
      /*                 */
      1
    ), rt = (
      /*                    */
      2
    ), gt = (
      /*               */
      8
    ), ka = (
      /*              */
      16
    ), mo = Math.clz32 ? Math.clz32 : xr, xs = Math.log, My = Math.LN2;
    function xr(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (xs(t) / My | 0) | 0;
    }
    var _s = 31, q = (
      /*                        */
      0
    ), In = (
      /*                          */
      0
    ), Ve = (
      /*                        */
      1
    ), fr = (
      /*    */
      2
    ), Da = (
      /*             */
      4
    ), tl = (
      /*            */
      8
    ), Qa = (
      /*                     */
      16
    ), yo = (
      /*                */
      32
    ), Su = (
      /*                       */
      4194240
    ), go = (
      /*                        */
      64
    ), jc = (
      /*                        */
      128
    ), Pc = (
      /*                        */
      256
    ), Hc = (
      /*                        */
      512
    ), Vc = (
      /*                        */
      1024
    ), $c = (
      /*                        */
      2048
    ), Eu = (
      /*                        */
      4096
    ), Bc = (
      /*                        */
      8192
    ), So = (
      /*                        */
      16384
    ), Eo = (
      /*                       */
      32768
    ), Ic = (
      /*                       */
      65536
    ), ks = (
      /*                       */
      131072
    ), Yc = (
      /*                       */
      262144
    ), Wc = (
      /*                       */
      524288
    ), Qc = (
      /*                       */
      1048576
    ), Gc = (
      /*                       */
      2097152
    ), Co = (
      /*                            */
      130023424
    ), Cu = (
      /*                             */
      4194304
    ), qc = (
      /*                             */
      8388608
    ), Kc = (
      /*                             */
      16777216
    ), Pd = (
      /*                             */
      33554432
    ), Xc = (
      /*                             */
      67108864
    ), eh = Cu, Ds = (
      /*          */
      134217728
    ), Hd = (
      /*                          */
      268435455
    ), Ro = (
      /*               */
      268435456
    ), jl = (
      /*                        */
      536870912
    ), _r = (
      /*                   */
      1073741824
    );
    function Ly(e) {
      {
        if (e & Ve)
          return "Sync";
        if (e & fr)
          return "InputContinuousHydration";
        if (e & Da)
          return "InputContinuous";
        if (e & tl)
          return "DefaultHydration";
        if (e & Qa)
          return "Default";
        if (e & yo)
          return "TransitionHydration";
        if (e & Su)
          return "Transition";
        if (e & Co)
          return "Retry";
        if (e & Ds)
          return "SelectiveHydration";
        if (e & Ro)
          return "IdleHydration";
        if (e & jl)
          return "Idle";
        if (e & _r)
          return "Offscreen";
      }
    }
    var cn = -1, Zc = go, oa = Cu;
    function Ru(e) {
      switch (Un(e)) {
        case Ve:
          return Ve;
        case fr:
          return fr;
        case Da:
          return Da;
        case tl:
          return tl;
        case Qa:
          return Qa;
        case yo:
          return yo;
        case go:
        case jc:
        case Pc:
        case Hc:
        case Vc:
        case $c:
        case Eu:
        case Bc:
        case So:
        case Eo:
        case Ic:
        case ks:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
          return e & Su;
        case Cu:
        case qc:
        case Kc:
        case Pd:
        case Xc:
          return e & Co;
        case Ds:
          return Ds;
        case Ro:
          return Ro;
        case jl:
          return jl;
        case _r:
          return _r;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Tu(e, t) {
      var a = e.pendingLanes;
      if (a === q)
        return q;
      var i = q, u = e.suspendedLanes, s = e.pingedLanes, f = a & Hd;
      if (f !== q) {
        var p = f & ~u;
        if (p !== q)
          i = Ru(p);
        else {
          var v = f & s;
          v !== q && (i = Ru(v));
        }
      } else {
        var g = a & ~u;
        g !== q ? i = Ru(g) : s !== q && (i = Ru(s));
      }
      if (i === q)
        return q;
      if (t !== q && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === q) {
        var C = Un(i), D = Un(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          C >= D || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          C === Qa && (D & Su) !== q
        )
          return t;
      }
      (i & Da) !== q && (i |= a & Qa);
      var _ = e.entangledLanes;
      if (_ !== q)
        for (var U = e.entanglements, P = i & _; P > 0; ) {
          var B = Hl(P), ye = 1 << B;
          i |= U[B], P &= ~ye;
        }
      return i;
    }
    function th(e, t) {
      for (var a = e.eventTimes, i = cn; t > 0; ) {
        var u = Hl(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function nh(e, t) {
      switch (e) {
        case Ve:
        case fr:
        case Da:
          return t + 250;
        case tl:
        case Qa:
        case yo:
        case go:
        case jc:
        case Pc:
        case Hc:
        case Vc:
        case $c:
        case Eu:
        case Bc:
        case So:
        case Eo:
        case Ic:
        case ks:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
          return t + 5e3;
        case Cu:
        case qc:
        case Kc:
        case Pd:
        case Xc:
          return cn;
        case Ds:
        case Ro:
        case jl:
        case _r:
          return cn;
        default:
          return S("Should have found matching lanes. This is a bug in React."), cn;
      }
    }
    function rh(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Hl(f), v = 1 << p, g = s[p];
        g === cn ? ((v & i) === q || (v & u) !== q) && (s[p] = nh(v, t)) : g <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function Vd(e) {
      return Ru(e.pendingLanes);
    }
    function Pl(e) {
      var t = e.pendingLanes & ~_r;
      return t !== q ? t : t & _r ? _r : q;
    }
    function $d(e) {
      return (e & Ve) !== q;
    }
    function Os(e) {
      return (e & Hd) !== q;
    }
    function ah(e) {
      return (e & Co) === e;
    }
    function ih(e) {
      var t = Ve | Da | Qa;
      return (e & t) === q;
    }
    function lh(e) {
      return (e & Su) === e;
    }
    function Ms(e, t) {
      var a = fr | Da | tl | Qa;
      return (t & a) !== q;
    }
    function uh(e, t) {
      return (t & e.expiredLanes) !== q;
    }
    function Bd(e) {
      return (e & Su) !== q;
    }
    function oh() {
      var e = Zc;
      return Zc <<= 1, (Zc & Su) === q && (Zc = go), e;
    }
    function sa() {
      var e = oa;
      return oa <<= 1, (oa & Co) === q && (oa = Cu), e;
    }
    function Un(e) {
      return e & -e;
    }
    function To(e) {
      return Un(e);
    }
    function Hl(e) {
      return 31 - mo(e);
    }
    function Jc(e) {
      return Hl(e);
    }
    function ca(e, t) {
      return (e & t) !== q;
    }
    function wu(e, t) {
      return (e & t) === t;
    }
    function st(e, t) {
      return e | t;
    }
    function Ls(e, t) {
      return e & ~t;
    }
    function ef(e, t) {
      return e & t;
    }
    function Ny(e) {
      return e;
    }
    function sh(e, t) {
      return e !== In && e < t ? e : t;
    }
    function Ns(e) {
      for (var t = [], a = 0; a < _s; a++)
        t.push(e);
      return t;
    }
    function bu(e, t, a) {
      e.pendingLanes |= t, t !== jl && (e.suspendedLanes = q, e.pingedLanes = q);
      var i = e.eventTimes, u = Jc(t);
      i[u] = a;
    }
    function ch(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Hl(i), s = 1 << u;
        a[u] = cn, i &= ~s;
      }
    }
    function tf(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function nf(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = q, e.pingedLanes = q, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Hl(f), v = 1 << p;
        i[p] = q, u[p] = cn, s[p] = cn, f &= ~v;
      }
    }
    function Id(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Hl(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function fh(e, t) {
      var a = Un(t), i;
      switch (a) {
        case Da:
          i = fr;
          break;
        case Qa:
          i = tl;
          break;
        case go:
        case jc:
        case Pc:
        case Hc:
        case Vc:
        case $c:
        case Eu:
        case Bc:
        case So:
        case Eo:
        case Ic:
        case ks:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
        case Cu:
        case qc:
        case Kc:
        case Pd:
        case Xc:
          i = yo;
          break;
        case jl:
          i = Ro;
          break;
        default:
          i = In;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== In ? In : i;
    }
    function rf(e, t, a) {
      if (_a)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = Jc(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Yd(e, t) {
      if (_a)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = Jc(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function As(e, t) {
      return null;
    }
    var Fn = Ve, nl = Da, Oi = Qa, wo = jl, bo = In;
    function Ga() {
      return bo;
    }
    function Mn(e) {
      bo = e;
    }
    function kr(e, t) {
      var a = bo;
      try {
        return bo = e, t();
      } finally {
        bo = a;
      }
    }
    function Ay(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function zy(e, t) {
      return e > t ? e : t;
    }
    function xo(e, t) {
      return e !== 0 && e < t;
    }
    function dr(e) {
      var t = Un(e);
      return xo(Fn, t) ? xo(nl, t) ? Os(t) ? Oi : wo : nl : Fn;
    }
    function af(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var be;
    function _o(e) {
      be = e;
    }
    function Wd(e) {
      be(e);
    }
    var lf;
    function Uy(e) {
      lf = e;
    }
    var ko;
    function uf(e) {
      ko = e;
    }
    var of;
    function dh(e) {
      of = e;
    }
    var Qd;
    function ph(e) {
      Qd = e;
    }
    var zs = !1, Do = [], Sn = null, ar = null, Fr = null, Oo = /* @__PURE__ */ new Map(), Mo = /* @__PURE__ */ new Map(), ir = [], vh = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Mi(e) {
      return vh.indexOf(e) > -1;
    }
    function Fy(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Gd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Sn = null;
          break;
        case "dragenter":
        case "dragleave":
          ar = null;
          break;
        case "mouseover":
        case "mouseout":
          Fr = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Oo.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Mo.delete(i);
          break;
        }
      }
    }
    function Lo(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = Fy(t, a, i, u, s);
        if (t !== null) {
          var p = Vo(t);
          p !== null && lf(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function hh(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Sn = Lo(Sn, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return ar = Lo(ar, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Fr = Lo(Fr, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, g = v.pointerId;
          return Oo.set(g, Lo(Oo.get(g) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var C = u, D = C.pointerId;
          return Mo.set(D, Lo(Mo.get(D) || null, e, t, a, i, C)), !0;
        }
      }
      return !1;
    }
    function qd(e) {
      var t = Qs(e.target);
      if (t !== null) {
        var a = ba(t);
        if (a !== null) {
          var i = a.tag;
          if (i === $) {
            var u = Od(a);
            if (u !== null) {
              e.blockedOn = u, Qd(e.priority, function() {
                ko(a);
              });
              return;
            }
          } else if (i === K) {
            var s = a.stateNode;
            if (af(s)) {
              e.blockedOn = xc(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function jy(e) {
      for (var t = of(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < ir.length && xo(t, ir[i].priority); i++)
        ;
      ir.splice(i, 0, a), i === 0 && qd(a);
    }
    function xu(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Dr(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          hs(s), u.target.dispatchEvent(s), _y();
        } else {
          var f = Vo(i);
          return f !== null && lf(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function sf(e, t, a) {
      xu(e) && a.delete(t);
    }
    function qa() {
      zs = !1, Sn !== null && xu(Sn) && (Sn = null), ar !== null && xu(ar) && (ar = null), Fr !== null && xu(Fr) && (Fr = null), Oo.forEach(sf), Mo.forEach(sf);
    }
    function Ct(e, t) {
      e.blockedOn === t && (e.blockedOn = null, zs || (zs = !0, E.unstable_scheduleCallback(E.unstable_NormalPriority, qa)));
    }
    function Ln(e) {
      if (Do.length > 0) {
        Ct(Do[0], e);
        for (var t = 1; t < Do.length; t++) {
          var a = Do[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Sn !== null && Ct(Sn, e), ar !== null && Ct(ar, e), Fr !== null && Ct(Fr, e);
      var i = function(p) {
        return Ct(p, e);
      };
      Oo.forEach(i), Mo.forEach(i);
      for (var u = 0; u < ir.length; u++) {
        var s = ir[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; ir.length > 0; ) {
        var f = ir[0];
        if (f.blockedOn !== null)
          break;
        qd(f), f.blockedOn === null && ir.shift();
      }
    }
    var vn = R.ReactCurrentBatchConfig, Qn = !0;
    function fa(e) {
      Qn = !!e;
    }
    function No() {
      return Qn;
    }
    function Gn(e, t, a) {
      var i = cf(t), u;
      switch (i) {
        case Fn:
          u = Us;
          break;
        case nl:
          u = _u;
          break;
        case Oi:
        default:
          u = Ao;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function Us(e, t, a, i) {
      var u = Ga(), s = vn.transition;
      vn.transition = null;
      try {
        Mn(Fn), Ao(e, t, a, i);
      } finally {
        Mn(u), vn.transition = s;
      }
    }
    function _u(e, t, a, i) {
      var u = Ga(), s = vn.transition;
      vn.transition = null;
      try {
        Mn(nl), Ao(e, t, a, i);
      } finally {
        Mn(u), vn.transition = s;
      }
    }
    function Ao(e, t, a, i) {
      Qn && Kd(e, t, a, i);
    }
    function Kd(e, t, a, i) {
      var u = Dr(e, t, a, i);
      if (u === null) {
        tg(e, t, i, Vl, a), Gd(e, i);
        return;
      }
      if (hh(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Gd(e, i), t & cu && Mi(e)) {
        for (; u !== null; ) {
          var s = Vo(u);
          s !== null && Wd(s);
          var f = Dr(e, t, a, i);
          if (f === null && tg(e, t, i, Vl, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      tg(e, t, i, null, a);
    }
    var Vl = null;
    function Dr(e, t, a, i) {
      Vl = null;
      var u = Cc(i), s = Qs(u);
      if (s !== null) {
        var f = ba(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === $) {
            var v = Od(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === K) {
            var g = f.stateNode;
            if (af(g))
              return xc(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return Vl = s, null;
    }
    function cf(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Fn;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return nl;
        case "message": {
          var t = Nd();
          switch (t) {
            case Oc:
              return Fn;
            case mu:
              return nl;
            case Di:
            case Gv:
              return Oi;
            case Mc:
              return wo;
            default:
              return Oi;
          }
        }
        default:
          return Oi;
      }
    }
    function zo(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function rl(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function ff(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Xd(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var Ka = null, Uo = null, Xa = null;
    function df(e) {
      return Ka = e, Uo = js(), !0;
    }
    function Fs() {
      Ka = null, Uo = null, Xa = null;
    }
    function pf() {
      if (Xa)
        return Xa;
      var e, t = Uo, a = t.length, i, u = js(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Xa = u.slice(e, p), Xa;
    }
    function js() {
      return "value" in Ka ? Ka.value : Ka.textContent;
    }
    function ku(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function lr() {
      return !0;
    }
    function al() {
      return !1;
    }
    function xn(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var g = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return g ? this.isDefaultPrevented = lr : this.isDefaultPrevented = al, this.isPropagationStopped = al, this;
      }
      return mt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = lr);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = lr);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: lr
      }), t;
    }
    var qn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, vf = xn(qn), Du = mt({}, qn, {
      view: 0,
      detail: 0
    }), Zd = xn(Du), Jd, Li, Fo;
    function ep(e) {
      e !== Fo && (Fo && e.type === "mousemove" ? (Jd = e.screenX - Fo.screenX, Li = e.screenY - Fo.screenY) : (Jd = 0, Li = 0), Fo = e);
    }
    var Ni = mt({}, Du, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: tp,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (ep(e), Jd);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Li;
      }
    }), hf = xn(Ni), Ou = mt({}, Ni, {
      dataTransfer: 0
    }), mh = xn(Ou), yh = mt({}, Du, {
      relatedTarget: 0
    }), Ps = xn(yh), mf = mt({}, qn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Py = xn(mf), Hy = mt({}, qn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), gh = xn(Hy), Sh = mt({}, qn, {
      data: 0
    }), $l = xn(Sh), Vy = $l, jo = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Eh = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function Nn(e) {
      if (e.key) {
        var t = jo[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = ku(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Eh[e.keyCode] || "Unidentified" : "";
    }
    var $y = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Ch(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = $y[e];
      return i ? !!a[i] : !1;
    }
    function tp(e) {
      return Ch;
    }
    var By = mt({}, Du, {
      key: Nn,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: tp,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? ku(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? ku(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Rh = xn(By), Th = mt({}, Ni, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), wh = xn(Th), Za = mt({}, Du, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: tp
    }), np = xn(Za), Iy = mt({}, qn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Bl = xn(Iy), yf = mt({}, Ni, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), Mu = xn(yf), gf = [9, 13, 27, 32], Sf = 229, Hs = rn && "CompositionEvent" in window, Vs = null;
    rn && "documentMode" in document && (Vs = document.documentMode);
    var rp = rn && "TextEvent" in window && !Vs, bh = rn && (!Hs || Vs && Vs > 8 && Vs <= 11), ap = 32, ip = String.fromCharCode(ap);
    function Ef() {
      Zn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Zn("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zn("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zn("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var $s = !1;
    function xh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function lp(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Yy(e, t) {
      return e === "keydown" && t.keyCode === Sf;
    }
    function up(e, t) {
      switch (e) {
        case "keyup":
          return gf.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Sf;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Cf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function Bs(e) {
      return e.locale === "ko";
    }
    var Il = !1;
    function Rf(e, t, a, i, u) {
      var s, f;
      if (Hs ? s = lp(t) : Il ? up(t, i) && (s = "onCompositionEnd") : Yy(t, i) && (s = "onCompositionStart"), !s)
        return null;
      bh && !Bs(i) && (!Il && s === "onCompositionStart" ? Il = df(u) : s === "onCompositionEnd" && Il && (f = pf()));
      var p = Lh(a, s);
      if (p.length > 0) {
        var v = new $l(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var g = Cf(i);
          g !== null && (v.data = g);
        }
      }
    }
    function _h(e, t) {
      switch (e) {
        case "compositionend":
          return Cf(t);
        case "keypress":
          var a = t.which;
          return a !== ap ? null : ($s = !0, ip);
        case "textInput":
          var i = t.data;
          return i === ip && $s ? null : i;
        default:
          return null;
      }
    }
    function Wy(e, t) {
      if (Il) {
        if (e === "compositionend" || !Hs && up(e, t)) {
          var a = pf();
          return Fs(), Il = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!xh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return bh && !Bs(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Tf(e, t, a, i, u) {
      var s;
      if (rp ? s = _h(t, i) : s = Wy(t, i), !s)
        return null;
      var f = Lh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new Vy("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function Qy(e, t, a, i, u, s, f) {
      Rf(e, t, a, i, u), Tf(e, t, a, i, u);
    }
    var Is = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function kh(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Is[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function wf(e) {
      if (!rn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function n() {
      Zn("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, i) {
      Rc(i);
      var u = Lh(t, "onChange");
      if (u.length > 0) {
        var s = new vf("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var l = null, o = null;
    function c(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function d(e) {
      var t = [];
      r(t, o, e, Cc(e)), Rd(m, t);
    }
    function m(e) {
      fE(e, 0);
    }
    function T(e) {
      var t = Of(e);
      if (Ju(t))
        return e;
    }
    function x(e, t) {
      if (e === "change")
        return t;
    }
    var j = !1;
    rn && (j = wf("input") && (!document.documentMode || document.documentMode > 9));
    function ee(e, t) {
      l = e, o = t, l.attachEvent("onpropertychange", X);
    }
    function te() {
      l && (l.detachEvent("onpropertychange", X), l = null, o = null);
    }
    function X(e) {
      e.propertyName === "value" && T(o) && d(e);
    }
    function Ce(e, t, a) {
      e === "focusin" ? (te(), ee(t, a)) : e === "focusout" && te();
    }
    function _e(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return T(o);
    }
    function Oe(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function jn(e, t) {
      if (e === "click")
        return T(t);
    }
    function M(e, t) {
      if (e === "input" || e === "change")
        return T(t);
    }
    function k(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Ge(e, "number", e.value);
    }
    function A(e, t, a, i, u, s, f) {
      var p = a ? Of(a) : window, v, g;
      if (c(p) ? v = x : kh(p) ? j ? v = M : (v = _e, g = Ce) : Oe(p) && (v = jn), v) {
        var C = v(t, a);
        if (C) {
          r(e, C, i, u);
          return;
        }
      }
      g && g(t, p, a), t === "focusout" && k(p);
    }
    function ue() {
      we("onMouseEnter", ["mouseout", "mouseover"]), we("onMouseLeave", ["mouseout", "mouseover"]), we("onPointerEnter", ["pointerout", "pointerover"]), we("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function ze(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !Vv(i)) {
        var g = i.relatedTarget || i.fromElement;
        if (g && (Qs(g) || Cp(g)))
          return;
      }
      if (!(!v && !p)) {
        var C;
        if (u.window === u)
          C = u;
        else {
          var D = u.ownerDocument;
          D ? C = D.defaultView || D.parentWindow : C = window;
        }
        var _, U;
        if (v) {
          var P = i.relatedTarget || i.toElement;
          if (_ = a, U = P ? Qs(P) : null, U !== null) {
            var B = ba(U);
            (U !== B || U.tag !== ae && U.tag !== ge) && (U = null);
          }
        } else
          _ = null, U = a;
        if (_ !== U) {
          var ye = hf, Qe = "onMouseLeave", Pe = "onMouseEnter", Dt = "mouse";
          (t === "pointerout" || t === "pointerover") && (ye = wh, Qe = "onPointerLeave", Pe = "onPointerEnter", Dt = "pointer");
          var Rt = _ == null ? C : Of(_), L = U == null ? C : Of(U), I = new ye(Qe, Dt + "leave", _, i, u);
          I.target = Rt, I.relatedTarget = L;
          var N = null, ne = Qs(u);
          if (ne === a) {
            var Te = new ye(Pe, Dt + "enter", U, i, u);
            Te.target = L, Te.relatedTarget = Rt, N = Te;
          }
          HT(e, I, N, _, U);
        }
      }
    }
    function Xe(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var ke = typeof Object.is == "function" ? Object.is : Xe;
    function Je(e, t) {
      if (ke(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!Cn.call(t, s) || !ke(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Kn(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function zt(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function il(e, t) {
      for (var a = Kn(e), i = 0, u = 0; a; ) {
        if (a.nodeType === Qi) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Kn(zt(a));
      }
    }
    function Gy(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return ET(e, u, s, f, p);
    }
    function ET(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, g = 0, C = e, D = null;
      e: for (; ; ) {
        for (var _ = null; C === t && (a === 0 || C.nodeType === Qi) && (f = s + a), C === i && (u === 0 || C.nodeType === Qi) && (p = s + u), C.nodeType === Qi && (s += C.nodeValue.length), (_ = C.firstChild) !== null; )
          D = C, C = _;
        for (; ; ) {
          if (C === e)
            break e;
          if (D === t && ++v === a && (f = s), D === i && ++g === u && (p = s), (_ = C.nextSibling) !== null)
            break;
          C = D, D = C.parentNode;
        }
        C = _;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function CT(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var g = il(e, f), C = il(e, p);
        if (g && C) {
          if (u.rangeCount === 1 && u.anchorNode === g.node && u.anchorOffset === g.offset && u.focusNode === C.node && u.focusOffset === C.offset)
            return;
          var D = a.createRange();
          D.setStart(g.node, g.offset), u.removeAllRanges(), f > p ? (u.addRange(D), u.extend(C.node, C.offset)) : (D.setEnd(C.node, C.offset), u.addRange(D));
        }
      }
    }
    function J0(e) {
      return e && e.nodeType === Qi;
    }
    function eE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : J0(e) ? !1 : J0(t) ? eE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function RT(e) {
      return e && e.ownerDocument && eE(e.ownerDocument.documentElement, e);
    }
    function TT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function tE() {
      for (var e = window, t = kl(); t instanceof e.HTMLIFrameElement; ) {
        if (TT(t))
          e = t.contentWindow;
        else
          return t;
        t = kl(e.document);
      }
      return t;
    }
    function qy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function wT() {
      var e = tE();
      return {
        focusedElem: e,
        selectionRange: qy(e) ? xT(e) : null
      };
    }
    function bT(e) {
      var t = tE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && RT(a)) {
        i !== null && qy(a) && _T(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === ta && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function xT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Gy(e), t || {
        start: 0,
        end: 0
      };
    }
    function _T(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : CT(e, t);
    }
    var kT = rn && "documentMode" in document && document.documentMode <= 11;
    function DT() {
      Zn("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var bf = null, Ky = null, op = null, Xy = !1;
    function OT(e) {
      if ("selectionStart" in e && qy(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function MT(e) {
      return e.window === e ? e.document : e.nodeType === di ? e : e.ownerDocument;
    }
    function nE(e, t, a) {
      var i = MT(a);
      if (!(Xy || bf == null || bf !== kl(i))) {
        var u = OT(bf);
        if (!op || !Je(op, u)) {
          op = u;
          var s = Lh(Ky, "onSelect");
          if (s.length > 0) {
            var f = new vf("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = bf;
          }
        }
      }
    }
    function LT(e, t, a, i, u, s, f) {
      var p = a ? Of(a) : window;
      switch (t) {
        case "focusin":
          (kh(p) || p.contentEditable === "true") && (bf = p, Ky = a, op = null);
          break;
        case "focusout":
          bf = null, Ky = null, op = null;
          break;
        case "mousedown":
          Xy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Xy = !1, nE(e, i, u);
          break;
        case "selectionchange":
          if (kT)
            break;
        case "keydown":
        case "keyup":
          nE(e, i, u);
      }
    }
    function Dh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var xf = {
      animationend: Dh("Animation", "AnimationEnd"),
      animationiteration: Dh("Animation", "AnimationIteration"),
      animationstart: Dh("Animation", "AnimationStart"),
      transitionend: Dh("Transition", "TransitionEnd")
    }, Zy = {}, rE = {};
    rn && (rE = document.createElement("div").style, "AnimationEvent" in window || (delete xf.animationend.animation, delete xf.animationiteration.animation, delete xf.animationstart.animation), "TransitionEvent" in window || delete xf.transitionend.transition);
    function Oh(e) {
      if (Zy[e])
        return Zy[e];
      if (!xf[e])
        return e;
      var t = xf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in rE)
          return Zy[e] = t[a];
      return e;
    }
    var aE = Oh("animationend"), iE = Oh("animationiteration"), lE = Oh("animationstart"), uE = Oh("transitionend"), oE = /* @__PURE__ */ new Map(), sE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Po(e, t) {
      oE.set(e, t), Zn(t, [e]);
    }
    function NT() {
      for (var e = 0; e < sE.length; e++) {
        var t = sE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        Po(a, "on" + i);
      }
      Po(aE, "onAnimationEnd"), Po(iE, "onAnimationIteration"), Po(lE, "onAnimationStart"), Po("dblclick", "onDoubleClick"), Po("focusin", "onFocus"), Po("focusout", "onBlur"), Po(uE, "onTransitionEnd");
    }
    function AT(e, t, a, i, u, s, f) {
      var p = oE.get(t);
      if (p !== void 0) {
        var v = vf, g = t;
        switch (t) {
          case "keypress":
            if (ku(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = Rh;
            break;
          case "focusin":
            g = "focus", v = Ps;
            break;
          case "focusout":
            g = "blur", v = Ps;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ps;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = hf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = mh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = np;
            break;
          case aE:
          case iE:
          case lE:
            v = Py;
            break;
          case uE:
            v = Bl;
            break;
          case "scroll":
            v = Zd;
            break;
          case "wheel":
            v = Mu;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = gh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = wh;
            break;
        }
        var C = (s & cu) !== 0;
        {
          var D = !C && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", _ = jT(a, p, i.type, C, D);
          if (_.length > 0) {
            var U = new v(p, g, null, i, u);
            e.push({
              event: U,
              listeners: _
            });
          }
        }
      }
    }
    NT(), ue(), n(), DT(), Ef();
    function zT(e, t, a, i, u, s, f) {
      AT(e, t, a, i, u, s);
      var p = (s & xy) === 0;
      p && (ze(e, t, a, i, u), A(e, t, a, i, u), LT(e, t, a, i, u), Qy(e, t, a, i, u));
    }
    var sp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Jy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(sp));
    function cE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Xi(i, t, void 0, e), e.currentTarget = null;
    }
    function UT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          cE(e, v, p), i = f;
        }
      else
        for (var g = 0; g < t.length; g++) {
          var C = t[g], D = C.instance, _ = C.currentTarget, U = C.listener;
          if (D !== i && e.isPropagationStopped())
            return;
          cE(e, U, _), i = D;
        }
    }
    function fE(e, t) {
      for (var a = (t & cu) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        UT(s, f, a);
      }
      xd();
    }
    function FT(e, t, a, i, u) {
      var s = Cc(a), f = [];
      zT(f, e, i, a, s, t), fE(f, t);
    }
    function _n(e, t) {
      Jy.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = pb(t), u = VT(e);
      i.has(u) || (dE(t, e, ps, a), i.add(u));
    }
    function eg(e, t, a) {
      Jy.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= cu), dE(a, e, i, t);
    }
    var Mh = "_reactListening" + Math.random().toString(36).slice(2);
    function cp(e) {
      if (!e[Mh]) {
        e[Mh] = !0, dt.forEach(function(a) {
          a !== "selectionchange" && (Jy.has(a) || eg(a, !1, e), eg(a, !0, e));
        });
        var t = e.nodeType === di ? e : e.ownerDocument;
        t !== null && (t[Mh] || (t[Mh] = !0, eg("selectionchange", !1, t)));
      }
    }
    function dE(e, t, a, i, u) {
      var s = Gn(e, t, a), f = void 0;
      gs && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? ff(e, t, s, f) : rl(e, t, s) : f !== void 0 ? Xd(e, t, s, f) : zo(e, t, s);
    }
    function pE(e, t) {
      return e === t || e.nodeType === $n && e.parentNode === t;
    }
    function tg(e, t, a, i, u) {
      var s = i;
      if (!(t & qi) && !(t & ps)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === K || v === ce) {
              var g = p.stateNode.containerInfo;
              if (pE(g, f))
                break;
              if (v === ce)
                for (var C = p.return; C !== null; ) {
                  var D = C.tag;
                  if (D === K || D === ce) {
                    var _ = C.stateNode.containerInfo;
                    if (pE(_, f))
                      return;
                  }
                  C = C.return;
                }
              for (; g !== null; ) {
                var U = Qs(g);
                if (U === null)
                  return;
                var P = U.tag;
                if (P === ae || P === ge) {
                  p = s = U;
                  continue e;
                }
                g = g.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      Rd(function() {
        return FT(e, t, a, s);
      });
    }
    function fp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function jT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], g = e, C = null; g !== null; ) {
        var D = g, _ = D.stateNode, U = D.tag;
        if (U === ae && _ !== null && (C = _, p !== null)) {
          var P = du(g, p);
          P != null && v.push(fp(g, P, C));
        }
        if (u)
          break;
        g = g.return;
      }
      return v;
    }
    function Lh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ae && f !== null) {
          var v = f, g = du(u, a);
          g != null && i.unshift(fp(u, g, v));
          var C = du(u, t);
          C != null && i.push(fp(u, C, v));
        }
        u = u.return;
      }
      return i;
    }
    function _f(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ae);
      return e || null;
    }
    function PT(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = _f(s))
        u++;
      for (var f = 0, p = i; p; p = _f(p))
        f++;
      for (; u - f > 0; )
        a = _f(a), u--;
      for (; f - u > 0; )
        i = _f(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = _f(a), i = _f(i);
      }
      return null;
    }
    function vE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, g = v.alternate, C = v.stateNode, D = v.tag;
        if (g !== null && g === i)
          break;
        if (D === ae && C !== null) {
          var _ = C;
          if (u) {
            var U = du(p, s);
            U != null && f.unshift(fp(p, U, _));
          } else if (!u) {
            var P = du(p, s);
            P != null && f.push(fp(p, P, _));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function HT(e, t, a, i, u) {
      var s = i && u ? PT(i, u) : null;
      i !== null && vE(e, t, i, s, !1), u !== null && a !== null && vE(e, a, u, s, !0);
    }
    function VT(e, t) {
      return e + "__bubble";
    }
    var Ja = !1, dp = "dangerouslySetInnerHTML", Nh = "suppressContentEditableWarning", Ho = "suppressHydrationWarning", hE = "autoFocus", Ys = "children", Ws = "style", Ah = "__html", ng, zh, pp, mE, Uh, yE, gE;
    ng = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, zh = function(e, t) {
      Ec(e, t), yd(e, t), Hv(e, t, {
        registrationNameDependencies: pt,
        possibleRegistrationNames: Xt
      });
    }, yE = rn && !document.documentMode, pp = function(e, t, a) {
      if (!Ja) {
        var i = Fh(a), u = Fh(t);
        u !== i && (Ja = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, mE = function(e) {
      if (!Ja) {
        Ja = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, Uh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, gE = function(e, t) {
      var a = e.namespaceURI === Wi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var $T = /\r\n?/g, BT = /\u0000|\uFFFD/g;
    function Fh(e) {
      Kr(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace($T, `
`).replace(BT, "");
    }
    function jh(e, t, a, i) {
      var u = Fh(t), s = Fh(e);
      if (s !== u && (i && (Ja || (Ja = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && xe))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function SE(e) {
      return e.nodeType === di ? e : e.ownerDocument;
    }
    function IT() {
    }
    function Ph(e) {
      e.onclick = IT;
    }
    function YT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Ws)
            f && Object.freeze(f), Ov(t, f);
          else if (s === dp) {
            var p = f ? f[Ah] : void 0;
            p != null && Sv(t, p);
          } else if (s === Ys)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && mc(t, f);
            } else typeof f == "number" && mc(t, "" + f);
          else s === Nh || s === Ho || s === hE || (pt.hasOwnProperty(s) ? f != null && (typeof f != "function" && Uh(s, f), s === "onScroll" && _n("scroll", t)) : f != null && Ra(t, s, f, u));
        }
    }
    function WT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === Ws ? Ov(e, f) : s === dp ? Sv(e, f) : s === Ys ? mc(e, f) : Ra(e, s, f, i);
      }
    }
    function QT(e, t, a, i) {
      var u, s = SE(a), f, p = i;
      if (p === Wi && (p = vc(e)), p === Wi) {
        if (u = Gi(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var g = v.firstChild;
          f = v.removeChild(g);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var C = f;
          t.multiple ? C.multiple = !0 : t.size && (C.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Wi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Cn.call(ng, e) && (ng[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function GT(e, t) {
      return SE(t).createTextNode(e);
    }
    function qT(e, t, a, i) {
      var u = Gi(t, a);
      zh(t, a);
      var s;
      switch (t) {
        case "dialog":
          _n("cancel", e), _n("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          _n("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < sp.length; f++)
            _n(sp[f], e);
          s = a;
          break;
        case "source":
          _n("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          _n("error", e), _n("load", e), s = a;
          break;
        case "details":
          _n("toggle", e), s = a;
          break;
        case "input":
          w(e, a), s = h(e, a), _n("invalid", e);
          break;
        case "option":
          Gt(e, a), s = a;
          break;
        case "select":
          ss(e, a), s = os(e, a), _n("invalid", e);
          break;
        case "textarea":
          mv(e, a), s = od(e, a), _n("invalid", e);
          break;
        default:
          s = a;
      }
      switch (gc(t, s), YT(t, e, i, s, u), t) {
        case "input":
          ja(e), le(e, a, !1);
          break;
        case "textarea":
          ja(e), gv(e);
          break;
        case "option":
          un(e, a);
          break;
        case "select":
          ld(e, a);
          break;
        default:
          typeof s.onClick == "function" && Ph(e);
          break;
      }
    }
    function KT(e, t, a, i, u) {
      zh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = h(e, a), p = h(e, i), s = [];
          break;
        case "select":
          f = os(e, a), p = os(e, i), s = [];
          break;
        case "textarea":
          f = od(e, a), p = od(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && Ph(e);
          break;
      }
      gc(t, p);
      var v, g, C = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === Ws) {
            var D = f[v];
            for (g in D)
              D.hasOwnProperty(g) && (C || (C = {}), C[g] = "");
          } else v === dp || v === Ys || v === Nh || v === Ho || v === hE || (pt.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var _ = p[v], U = f?.[v];
        if (!(!p.hasOwnProperty(v) || _ === U || _ == null && U == null))
          if (v === Ws)
            if (_ && Object.freeze(_), U) {
              for (g in U)
                U.hasOwnProperty(g) && (!_ || !_.hasOwnProperty(g)) && (C || (C = {}), C[g] = "");
              for (g in _)
                _.hasOwnProperty(g) && U[g] !== _[g] && (C || (C = {}), C[g] = _[g]);
            } else
              C || (s || (s = []), s.push(v, C)), C = _;
          else if (v === dp) {
            var P = _ ? _[Ah] : void 0, B = U ? U[Ah] : void 0;
            P != null && B !== P && (s = s || []).push(v, P);
          } else v === Ys ? (typeof _ == "string" || typeof _ == "number") && (s = s || []).push(v, "" + _) : v === Nh || v === Ho || (pt.hasOwnProperty(v) ? (_ != null && (typeof _ != "function" && Uh(v, _), v === "onScroll" && _n("scroll", e)), !s && U !== _ && (s = [])) : (s = s || []).push(v, _));
      }
      return C && (fs(C, p[Ws]), (s = s || []).push(Ws, C)), s;
    }
    function XT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && F(e, u);
      var s = Gi(a, i), f = Gi(a, u);
      switch (WT(e, t, s, f), a) {
        case "input":
          V(e, u);
          break;
        case "textarea":
          yv(e, u);
          break;
        case "select":
          my(e, u);
          break;
      }
    }
    function ZT(e) {
      {
        var t = e.toLowerCase();
        return Sc.hasOwnProperty(t) && Sc[t] || null;
      }
    }
    function JT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Gi(t, a), zh(t, a), t) {
        case "dialog":
          _n("cancel", e), _n("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          _n("load", e);
          break;
        case "video":
        case "audio":
          for (var g = 0; g < sp.length; g++)
            _n(sp[g], e);
          break;
        case "source":
          _n("error", e);
          break;
        case "img":
        case "image":
        case "link":
          _n("error", e), _n("load", e);
          break;
        case "details":
          _n("toggle", e);
          break;
        case "input":
          w(e, a), _n("invalid", e);
          break;
        case "option":
          Gt(e, a);
          break;
        case "select":
          ss(e, a), _n("invalid", e);
          break;
        case "textarea":
          mv(e, a), _n("invalid", e);
          break;
      }
      gc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var C = e.attributes, D = 0; D < C.length; D++) {
          var _ = C[D].name.toLowerCase();
          switch (_) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(C[D].name);
          }
        }
      }
      var U = null;
      for (var P in a)
        if (a.hasOwnProperty(P)) {
          var B = a[P];
          if (P === Ys)
            typeof B == "string" ? e.textContent !== B && (a[Ho] !== !0 && jh(e.textContent, B, s, f), U = [Ys, B]) : typeof B == "number" && e.textContent !== "" + B && (a[Ho] !== !0 && jh(e.textContent, B, s, f), U = [Ys, "" + B]);
          else if (pt.hasOwnProperty(P))
            B != null && (typeof B != "function" && Uh(P, B), P === "onScroll" && _n("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var ye = void 0, Qe = p && We ? null : Mr(P);
            if (a[Ho] !== !0) {
              if (!(P === Nh || P === Ho || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              P === "value" || P === "checked" || P === "selected")) {
                if (P === dp) {
                  var Pe = e.innerHTML, Dt = B ? B[Ah] : void 0;
                  if (Dt != null) {
                    var Rt = gE(e, Dt);
                    Rt !== Pe && pp(P, Pe, Rt);
                  }
                } else if (P === Ws) {
                  if (v.delete(P), yE) {
                    var L = wy(B);
                    ye = e.getAttribute("style"), L !== ye && pp(P, ye, L);
                  }
                } else if (p && !We)
                  v.delete(P.toLowerCase()), ye = Ci(e, P, B), B !== ye && pp(P, ye, B);
                else if (!Tn(P, Qe, p) && !Qt(P, B, Qe, p)) {
                  var I = !1;
                  if (Qe !== null)
                    v.delete(Qe.attributeName), ye = Ca(e, P, B, Qe);
                  else {
                    var N = i;
                    if (N === Wi && (N = vc(t)), N === Wi)
                      v.delete(P.toLowerCase());
                    else {
                      var ne = ZT(P);
                      ne !== null && ne !== P && (I = !0, v.delete(ne)), v.delete(P);
                    }
                    ye = Ci(e, P, B);
                  }
                  var Te = We;
                  !Te && B !== ye && !I && pp(P, ye, B);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[Ho] !== !0 && mE(v), t) {
        case "input":
          ja(e), le(e, a, !0);
          break;
        case "textarea":
          ja(e), gv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Ph(e);
          break;
      }
      return U;
    }
    function ew(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function rg(e, t) {
      {
        if (Ja)
          return;
        Ja = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function ag(e, t) {
      {
        if (Ja)
          return;
        Ja = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function ig(e, t, a) {
      {
        if (Ja)
          return;
        Ja = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function lg(e, t) {
      {
        if (t === "" || Ja)
          return;
        Ja = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function tw(e, t, a) {
      switch (t) {
        case "input":
          Ke(e, a);
          return;
        case "textarea":
          sd(e, a);
          return;
        case "select":
          yy(e, a);
          return;
      }
    }
    var vp = function() {
    }, hp = function() {
    };
    {
      var nw = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], EE = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], rw = EE.concat(["button"]), aw = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], CE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      hp = function(e, t) {
        var a = mt({}, e || CE), i = {
          tag: t
        };
        return EE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), rw.indexOf(t) !== -1 && (a.pTagInButtonScope = null), nw.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var iw = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return aw.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, lw = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, RE = {};
      vp = function(e, t, a) {
        a = a || CE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = iw(e, u) ? null : i, f = s ? null : lw(e, a), p = s || f;
        if (p) {
          var v = p.tag, g = !!s + "|" + e + "|" + v;
          if (!RE[g]) {
            RE[g] = !0;
            var C = e, D = "";
            if (e === "#text" ? /\S/.test(t) ? C = "Text nodes" : (C = "Whitespace text nodes", D = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : C = "<" + e + ">", s) {
              var _ = "";
              v === "table" && e === "tr" && (_ += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", C, v, D, _);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", C, v);
          }
        }
      };
    }
    var Hh = "suppressHydrationWarning", Vh = "$", $h = "/$", mp = "$?", yp = "$!", uw = "style", ug = null, og = null;
    function ow(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case di:
        case ou: {
          t = i === di ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : fd(null, "");
          break;
        }
        default: {
          var s = i === $n ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = fd(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = hp(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function sw(e, t, a) {
      {
        var i = e, u = fd(i.namespace, t), s = hp(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function RO(e) {
      return e;
    }
    function cw(e) {
      ug = No(), og = wT();
      var t = null;
      return fa(!1), t;
    }
    function fw(e) {
      bT(og), fa(ug), ug = null, og = null;
    }
    function dw(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (vp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = hp(f.ancestorInfo, e);
          vp(null, p, v);
        }
        s = f.namespace;
      }
      var g = QT(e, t, a, s);
      return Ep(u, g), mg(g, t), g;
    }
    function pw(e, t) {
      e.appendChild(t);
    }
    function vw(e, t, a, i, u) {
      switch (qT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function hw(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = hp(f.ancestorInfo, t);
          vp(null, p, v);
        }
      }
      return KT(e, t, a, i);
    }
    function sg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function mw(e, t, a, i) {
      {
        var u = a;
        vp(null, e, u.ancestorInfo);
      }
      var s = GT(e, t);
      return Ep(i, s), s;
    }
    function yw() {
      var e = window.event;
      return e === void 0 ? Oi : cf(e.type);
    }
    var cg = typeof setTimeout == "function" ? setTimeout : void 0, gw = typeof clearTimeout == "function" ? clearTimeout : void 0, fg = -1, TE = typeof Promise == "function" ? Promise : void 0, Sw = typeof queueMicrotask == "function" ? queueMicrotask : typeof TE < "u" ? function(e) {
      return TE.resolve(null).then(e).catch(Ew);
    } : cg;
    function Ew(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Cw(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function Rw(e, t, a, i, u, s) {
      XT(e, t, a, i, u), mg(e, u);
    }
    function wE(e) {
      mc(e, "");
    }
    function Tw(e, t, a) {
      e.nodeValue = a;
    }
    function ww(e, t) {
      e.appendChild(t);
    }
    function bw(e, t) {
      var a;
      e.nodeType === $n ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Ph(a);
    }
    function xw(e, t, a) {
      e.insertBefore(t, a);
    }
    function _w(e, t, a) {
      e.nodeType === $n ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function kw(e, t) {
      e.removeChild(t);
    }
    function Dw(e, t) {
      e.nodeType === $n ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function dg(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === $n) {
          var s = u.data;
          if (s === $h)
            if (i === 0) {
              e.removeChild(u), Ln(t);
              return;
            } else
              i--;
          else (s === Vh || s === mp || s === yp) && i++;
        }
        a = u;
      } while (a);
      Ln(t);
    }
    function Ow(e, t) {
      e.nodeType === $n ? dg(e.parentNode, t) : e.nodeType === ta && dg(e, t), Ln(e);
    }
    function Mw(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function Lw(e) {
      e.nodeValue = "";
    }
    function Nw(e, t) {
      e = e;
      var a = t[uw], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = yc("display", i);
    }
    function Aw(e, t) {
      e.nodeValue = t;
    }
    function zw(e) {
      e.nodeType === ta ? e.textContent = "" : e.nodeType === di && e.documentElement && e.removeChild(e.documentElement);
    }
    function Uw(e, t, a) {
      return e.nodeType !== ta || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function Fw(e, t) {
      return t === "" || e.nodeType !== Qi ? null : e;
    }
    function jw(e) {
      return e.nodeType !== $n ? null : e;
    }
    function bE(e) {
      return e.data === mp;
    }
    function pg(e) {
      return e.data === yp;
    }
    function Pw(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function Hw(e, t) {
      e._reactRetry = t;
    }
    function Bh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === ta || t === Qi)
          break;
        if (t === $n) {
          var a = e.data;
          if (a === Vh || a === yp || a === mp)
            break;
          if (a === $h)
            return null;
        }
      }
      return e;
    }
    function gp(e) {
      return Bh(e.nextSibling);
    }
    function Vw(e) {
      return Bh(e.firstChild);
    }
    function $w(e) {
      return Bh(e.firstChild);
    }
    function Bw(e) {
      return Bh(e.nextSibling);
    }
    function Iw(e, t, a, i, u, s, f) {
      Ep(s, e), mg(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var g = (s.mode & je) !== Ae;
      return JT(e, t, a, p, i, g, f);
    }
    function Yw(e, t, a, i) {
      return Ep(a, e), a.mode & je, ew(e, t);
    }
    function Ww(e, t) {
      Ep(t, e);
    }
    function Qw(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === $n) {
          var i = t.data;
          if (i === $h) {
            if (a === 0)
              return gp(t);
            a--;
          } else (i === Vh || i === yp || i === mp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function xE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === $n) {
          var i = t.data;
          if (i === Vh || i === yp || i === mp) {
            if (a === 0)
              return t;
            a--;
          } else i === $h && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Gw(e) {
      Ln(e);
    }
    function qw(e) {
      Ln(e);
    }
    function Kw(e) {
      return e !== "head" && e !== "body";
    }
    function Xw(e, t, a, i) {
      var u = !0;
      jh(t.nodeValue, a, i, u);
    }
    function Zw(e, t, a, i, u, s) {
      if (t[Hh] !== !0) {
        var f = !0;
        jh(i.nodeValue, u, s, f);
      }
    }
    function Jw(e, t) {
      t.nodeType === ta ? rg(e, t) : t.nodeType === $n || ag(e, t);
    }
    function eb(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === ta ? rg(a, t) : t.nodeType === $n || ag(a, t));
      }
    }
    function tb(e, t, a, i, u) {
      (u || t[Hh] !== !0) && (i.nodeType === ta ? rg(a, i) : i.nodeType === $n || ag(a, i));
    }
    function nb(e, t, a) {
      ig(e, t);
    }
    function rb(e, t) {
      lg(e, t);
    }
    function ab(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && ig(i, t);
      }
    }
    function ib(e, t) {
      {
        var a = e.parentNode;
        a !== null && lg(a, t);
      }
    }
    function lb(e, t, a, i, u, s) {
      (s || t[Hh] !== !0) && ig(a, i);
    }
    function ub(e, t, a, i, u) {
      (u || t[Hh] !== !0) && lg(a, i);
    }
    function ob(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function sb(e) {
      cp(e);
    }
    var kf = Math.random().toString(36).slice(2), Df = "__reactFiber$" + kf, vg = "__reactProps$" + kf, Sp = "__reactContainer$" + kf, hg = "__reactEvents$" + kf, cb = "__reactListeners$" + kf, fb = "__reactHandles$" + kf;
    function db(e) {
      delete e[Df], delete e[vg], delete e[hg], delete e[cb], delete e[fb];
    }
    function Ep(e, t) {
      t[Df] = e;
    }
    function Ih(e, t) {
      t[Sp] = e;
    }
    function _E(e) {
      e[Sp] = null;
    }
    function Cp(e) {
      return !!e[Sp];
    }
    function Qs(e) {
      var t = e[Df];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Sp] || a[Df], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = xE(e); u !== null; ) {
              var s = u[Df];
              if (s)
                return s;
              u = xE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Vo(e) {
      var t = e[Df] || e[Sp];
      return t && (t.tag === ae || t.tag === ge || t.tag === $ || t.tag === K) ? t : null;
    }
    function Of(e) {
      if (e.tag === ae || e.tag === ge)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Yh(e) {
      return e[vg] || null;
    }
    function mg(e, t) {
      e[vg] = t;
    }
    function pb(e) {
      var t = e[hg];
      return t === void 0 && (t = e[hg] = /* @__PURE__ */ new Set()), t;
    }
    var kE = {}, DE = R.ReactDebugCurrentFrame;
    function Wh(e) {
      if (e) {
        var t = e._owner, a = bi(e.type, e._source, t ? t.type : null);
        DE.setExtraStackFrame(a);
      } else
        DE.setExtraStackFrame(null);
    }
    function ll(e, t, a, i, u) {
      {
        var s = Function.call.bind(Cn);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (g) {
              p = g;
            }
            p && !(p instanceof Error) && (Wh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Wh(null)), p instanceof Error && !(p.message in kE) && (kE[p.message] = !0, Wh(u), S("Failed %s type: %s", a, p.message), Wh(null));
          }
      }
    }
    var yg = [], Qh;
    Qh = [];
    var Lu = -1;
    function $o(e) {
      return {
        current: e
      };
    }
    function da(e, t) {
      if (Lu < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== Qh[Lu] && S("Unexpected Fiber popped."), e.current = yg[Lu], yg[Lu] = null, Qh[Lu] = null, Lu--;
    }
    function pa(e, t, a) {
      Lu++, yg[Lu] = e.current, Qh[Lu] = a, e.current = t;
    }
    var gg;
    gg = {};
    var mi = {};
    Object.freeze(mi);
    var Nu = $o(mi), Yl = $o(!1), Sg = mi;
    function Mf(e, t, a) {
      return a && Wl(t) ? Sg : Nu.current;
    }
    function OE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Lf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return mi;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = at(e) || "Unknown";
          ll(i, s, "context", p);
        }
        return u && OE(e, t, s), s;
      }
    }
    function Gh() {
      return Yl.current;
    }
    function Wl(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function qh(e) {
      da(Yl, e), da(Nu, e);
    }
    function Eg(e) {
      da(Yl, e), da(Nu, e);
    }
    function ME(e, t, a) {
      {
        if (Nu.current !== mi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        pa(Nu, t, e), pa(Yl, a, e);
      }
    }
    function LE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = at(e) || "Unknown";
            gg[s] || (gg[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((at(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = at(e) || "Unknown";
          ll(u, f, "child context", v);
        }
        return mt({}, a, f);
      }
    }
    function Kh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || mi;
        return Sg = Nu.current, pa(Nu, a, e), pa(Yl, Yl.current, e), !0;
      }
    }
    function NE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = LE(e, t, Sg);
          i.__reactInternalMemoizedMergedChildContext = u, da(Yl, e), da(Nu, e), pa(Nu, u, e), pa(Yl, a, e);
        } else
          da(Yl, e), pa(Yl, a, e);
      }
    }
    function vb(e) {
      {
        if (!Md(e) || e.tag !== G)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case K:
              return t.stateNode.context;
            case G: {
              var a = t.type;
              if (Wl(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Bo = 0, Xh = 1, Au = null, Cg = !1, Rg = !1;
    function AE(e) {
      Au === null ? Au = [e] : Au.push(e);
    }
    function hb(e) {
      Cg = !0, AE(e);
    }
    function zE() {
      Cg && Io();
    }
    function Io() {
      if (!Rg && Au !== null) {
        Rg = !0;
        var e = 0, t = Ga();
        try {
          var a = !0, i = Au;
          for (Mn(Fn); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Au = null, Cg = !1;
        } catch (s) {
          throw Au !== null && (Au = Au.slice(e + 1)), kc(Oc, Io), s;
        } finally {
          Mn(t), Rg = !1;
        }
      }
      return null;
    }
    var Nf = [], Af = 0, Zh = null, Jh = 0, Ai = [], zi = 0, Gs = null, zu = 1, Uu = "";
    function mb(e) {
      return Ks(), (e.flags & kd) !== Ie;
    }
    function yb(e) {
      return Ks(), Jh;
    }
    function gb() {
      var e = Uu, t = zu, a = t & ~Sb(t);
      return a.toString(32) + e;
    }
    function qs(e, t) {
      Ks(), Nf[Af++] = Jh, Nf[Af++] = Zh, Zh = e, Jh = t;
    }
    function UE(e, t, a) {
      Ks(), Ai[zi++] = zu, Ai[zi++] = Uu, Ai[zi++] = Gs, Gs = e;
      var i = zu, u = Uu, s = em(i) - 1, f = i & ~(1 << s), p = a + 1, v = em(t) + s;
      if (v > 30) {
        var g = s - s % 5, C = (1 << g) - 1, D = (f & C).toString(32), _ = f >> g, U = s - g, P = em(t) + U, B = p << U, ye = B | _, Qe = D + u;
        zu = 1 << P | ye, Uu = Qe;
      } else {
        var Pe = p << s, Dt = Pe | f, Rt = u;
        zu = 1 << v | Dt, Uu = Rt;
      }
    }
    function Tg(e) {
      Ks();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        qs(e, a), UE(e, a, i);
      }
    }
    function em(e) {
      return 32 - mo(e);
    }
    function Sb(e) {
      return 1 << em(e) - 1;
    }
    function wg(e) {
      for (; e === Zh; )
        Zh = Nf[--Af], Nf[Af] = null, Jh = Nf[--Af], Nf[Af] = null;
      for (; e === Gs; )
        Gs = Ai[--zi], Ai[zi] = null, Uu = Ai[--zi], Ai[zi] = null, zu = Ai[--zi], Ai[zi] = null;
    }
    function Eb() {
      return Ks(), Gs !== null ? {
        id: zu,
        overflow: Uu
      } : null;
    }
    function Cb(e, t) {
      Ks(), Ai[zi++] = zu, Ai[zi++] = Uu, Ai[zi++] = Gs, zu = t.id, Uu = t.overflow, Gs = e;
    }
    function Ks() {
      Pr() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var jr = null, Ui = null, ul = !1, Xs = !1, Yo = null;
    function Rb() {
      ul && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function FE() {
      Xs = !0;
    }
    function Tb() {
      return Xs;
    }
    function wb(e) {
      var t = e.stateNode.containerInfo;
      return Ui = $w(t), jr = e, ul = !0, Yo = null, Xs = !1, !0;
    }
    function bb(e, t, a) {
      return Ui = Bw(t), jr = e, ul = !0, Yo = null, Xs = !1, a !== null && Cb(e, a), !0;
    }
    function jE(e, t) {
      switch (e.tag) {
        case K: {
          Jw(e.stateNode.containerInfo, t);
          break;
        }
        case ae: {
          var a = (e.mode & je) !== Ae;
          tb(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case $: {
          var i = e.memoizedState;
          i.dehydrated !== null && eb(i.dehydrated, t);
          break;
        }
      }
    }
    function PE(e, t) {
      jE(e, t);
      var a = Dk();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Pt) : i.push(a);
    }
    function bg(e, t) {
      {
        if (Xs)
          return;
        switch (e.tag) {
          case K: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ae:
                var i = t.type;
                t.pendingProps, nb(a, i);
                break;
              case ge:
                var u = t.pendingProps;
                rb(a, u);
                break;
            }
            break;
          }
          case ae: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ae: {
                var v = t.type, g = t.pendingProps, C = (e.mode & je) !== Ae;
                lb(
                  s,
                  f,
                  p,
                  v,
                  g,
                  // TODO: Delete this argument when we remove the legacy root API.
                  C
                );
                break;
              }
              case ge: {
                var D = t.pendingProps, _ = (e.mode & je) !== Ae;
                ub(
                  s,
                  f,
                  p,
                  D,
                  // TODO: Delete this argument when we remove the legacy root API.
                  _
                );
                break;
              }
            }
            break;
          }
          case $: {
            var U = e.memoizedState, P = U.dehydrated;
            if (P !== null) switch (t.tag) {
              case ae:
                var B = t.type;
                t.pendingProps, ab(P, B);
                break;
              case ge:
                var ye = t.pendingProps;
                ib(P, ye);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function HE(e, t) {
      t.flags = t.flags & ~$a | dn, bg(e, t);
    }
    function VE(e, t) {
      switch (e.tag) {
        case ae: {
          var a = e.type;
          e.pendingProps;
          var i = Uw(t, a);
          return i !== null ? (e.stateNode = i, jr = e, Ui = Vw(i), !0) : !1;
        }
        case ge: {
          var u = e.pendingProps, s = Fw(t, u);
          return s !== null ? (e.stateNode = s, jr = e, Ui = null, !0) : !1;
        }
        case $: {
          var f = jw(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: Eb(),
              retryLane: _r
            };
            e.memoizedState = p;
            var v = Ok(f);
            return v.return = e, e.child = v, jr = e, Ui = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function xg(e) {
      return (e.mode & je) !== Ae && (e.flags & nt) === Ie;
    }
    function _g(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function kg(e) {
      if (ul) {
        var t = Ui;
        if (!t) {
          xg(e) && (bg(jr, e), _g()), HE(jr, e), ul = !1, jr = e;
          return;
        }
        var a = t;
        if (!VE(e, t)) {
          xg(e) && (bg(jr, e), _g()), t = gp(a);
          var i = jr;
          if (!t || !VE(e, t)) {
            HE(jr, e), ul = !1, jr = e;
            return;
          }
          PE(i, a);
        }
      }
    }
    function xb(e, t, a) {
      var i = e.stateNode, u = !Xs, s = Iw(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function _b(e) {
      var t = e.stateNode, a = e.memoizedProps, i = Yw(t, a, e);
      if (i) {
        var u = jr;
        if (u !== null)
          switch (u.tag) {
            case K: {
              var s = u.stateNode.containerInfo, f = (u.mode & je) !== Ae;
              Xw(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ae: {
              var p = u.type, v = u.memoizedProps, g = u.stateNode, C = (u.mode & je) !== Ae;
              Zw(
                p,
                v,
                g,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                C
              );
              break;
            }
          }
      }
      return i;
    }
    function kb(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      Ww(a, e);
    }
    function Db(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return Qw(a);
    }
    function $E(e) {
      for (var t = e.return; t !== null && t.tag !== ae && t.tag !== K && t.tag !== $; )
        t = t.return;
      jr = t;
    }
    function tm(e) {
      if (e !== jr)
        return !1;
      if (!ul)
        return $E(e), ul = !0, !1;
      if (e.tag !== K && (e.tag !== ae || Kw(e.type) && !sg(e.type, e.memoizedProps))) {
        var t = Ui;
        if (t)
          if (xg(e))
            BE(e), _g();
          else
            for (; t; )
              PE(e, t), t = gp(t);
      }
      return $E(e), e.tag === $ ? Ui = Db(e) : Ui = jr ? gp(e.stateNode) : null, !0;
    }
    function Ob() {
      return ul && Ui !== null;
    }
    function BE(e) {
      for (var t = Ui; t; )
        jE(e, t), t = gp(t);
    }
    function zf() {
      jr = null, Ui = null, ul = !1, Xs = !1;
    }
    function IE() {
      Yo !== null && (F1(Yo), Yo = null);
    }
    function Pr() {
      return ul;
    }
    function Dg(e) {
      Yo === null ? Yo = [e] : Yo.push(e);
    }
    var Mb = R.ReactCurrentBatchConfig, Lb = null;
    function Nb() {
      return Mb.transition;
    }
    var ol = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Ab = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & gt && (t = a), a = a.return;
        return t;
      }, Zs = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Rp = [], Tp = [], wp = [], bp = [], xp = [], _p = [], Js = /* @__PURE__ */ new Set();
      ol.recordUnsafeLifecycleWarnings = function(e, t) {
        Js.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Rp.push(e), e.mode & gt && typeof t.UNSAFE_componentWillMount == "function" && Tp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && wp.push(e), e.mode & gt && typeof t.UNSAFE_componentWillReceiveProps == "function" && bp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && xp.push(e), e.mode & gt && typeof t.UNSAFE_componentWillUpdate == "function" && _p.push(e));
      }, ol.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Rp.length > 0 && (Rp.forEach(function(_) {
          e.add(at(_) || "Component"), Js.add(_.type);
        }), Rp = []);
        var t = /* @__PURE__ */ new Set();
        Tp.length > 0 && (Tp.forEach(function(_) {
          t.add(at(_) || "Component"), Js.add(_.type);
        }), Tp = []);
        var a = /* @__PURE__ */ new Set();
        wp.length > 0 && (wp.forEach(function(_) {
          a.add(at(_) || "Component"), Js.add(_.type);
        }), wp = []);
        var i = /* @__PURE__ */ new Set();
        bp.length > 0 && (bp.forEach(function(_) {
          i.add(at(_) || "Component"), Js.add(_.type);
        }), bp = []);
        var u = /* @__PURE__ */ new Set();
        xp.length > 0 && (xp.forEach(function(_) {
          u.add(at(_) || "Component"), Js.add(_.type);
        }), xp = []);
        var s = /* @__PURE__ */ new Set();
        if (_p.length > 0 && (_p.forEach(function(_) {
          s.add(at(_) || "Component"), Js.add(_.type);
        }), _p = []), t.size > 0) {
          var f = Zs(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = Zs(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = Zs(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var g = Zs(e);
          Y(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (a.size > 0) {
          var C = Zs(a);
          Y(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, C);
        }
        if (u.size > 0) {
          var D = Zs(u);
          Y(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, D);
        }
      };
      var nm = /* @__PURE__ */ new Map(), YE = /* @__PURE__ */ new Set();
      ol.recordLegacyContextWarning = function(e, t) {
        var a = Ab(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!YE.has(e.type)) {
          var i = nm.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], nm.set(a, i)), i.push(e));
        }
      }, ol.flushLegacyContextWarning = function() {
        nm.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(at(s) || "Component"), YE.add(s.type);
            });
            var u = Zs(i);
            try {
              It(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              Dn();
            }
          }
        });
      }, ol.discardPendingWarnings = function() {
        Rp = [], Tp = [], wp = [], bp = [], xp = [], _p = [], nm = /* @__PURE__ */ new Map();
      };
    }
    var Og, Mg, Lg, Ng, Ag, WE = function(e, t) {
    };
    Og = !1, Mg = !1, Lg = {}, Ng = {}, Ag = {}, WE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = at(t) || "Component";
        Ng[a] || (Ng[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function zb(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function kp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & gt || Ze) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== G) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !zb(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = at(e) || "Component";
          Lg[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), Lg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== G)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          Jn(i, "ref");
          var g = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === g)
            return t.ref;
          var C = function(D) {
            var _ = v.refs;
            D === null ? delete _[g] : _[g] = D;
          };
          return C._stringRef = g, C;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function rm(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function am(e) {
      {
        var t = at(e) || "Component";
        if (Ag[t])
          return;
        Ag[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function QE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function GE(e) {
      function t(L, I) {
        if (e) {
          var N = L.deletions;
          N === null ? (L.deletions = [I], L.flags |= Pt) : N.push(I);
        }
      }
      function a(L, I) {
        if (!e)
          return null;
        for (var N = I; N !== null; )
          t(L, N), N = N.sibling;
        return null;
      }
      function i(L, I) {
        for (var N = /* @__PURE__ */ new Map(), ne = I; ne !== null; )
          ne.key !== null ? N.set(ne.key, ne) : N.set(ne.index, ne), ne = ne.sibling;
        return N;
      }
      function u(L, I) {
        var N = oc(L, I);
        return N.index = 0, N.sibling = null, N;
      }
      function s(L, I, N) {
        if (L.index = N, !e)
          return L.flags |= kd, I;
        var ne = L.alternate;
        if (ne !== null) {
          var Te = ne.index;
          return Te < I ? (L.flags |= dn, I) : Te;
        } else
          return L.flags |= dn, I;
      }
      function f(L) {
        return e && L.alternate === null && (L.flags |= dn), L;
      }
      function p(L, I, N, ne) {
        if (I === null || I.tag !== ge) {
          var Te = D0(N, L.mode, ne);
          return Te.return = L, Te;
        } else {
          var Ee = u(I, N);
          return Ee.return = L, Ee;
        }
      }
      function v(L, I, N, ne) {
        var Te = N.type;
        if (Te === Ta)
          return C(L, I, N.props.children, ne, N.key);
        if (I !== null && (I.elementType === Te || // Keep this check inline so it only runs on the false path:
        J1(I, N) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Te == "object" && Te !== null && Te.$$typeof === qe && QE(Te) === I.type)) {
          var Ee = u(I, N.props);
          return Ee.ref = kp(L, I, N), Ee.return = L, Ee._debugSource = N._source, Ee._debugOwner = N._owner, Ee;
        }
        var et = k0(N, L.mode, ne);
        return et.ref = kp(L, I, N), et.return = L, et;
      }
      function g(L, I, N, ne) {
        if (I === null || I.tag !== ce || I.stateNode.containerInfo !== N.containerInfo || I.stateNode.implementation !== N.implementation) {
          var Te = O0(N, L.mode, ne);
          return Te.return = L, Te;
        } else {
          var Ee = u(I, N.children || []);
          return Ee.return = L, Ee;
        }
      }
      function C(L, I, N, ne, Te) {
        if (I === null || I.tag !== Me) {
          var Ee = ns(N, L.mode, ne, Te);
          return Ee.return = L, Ee;
        } else {
          var et = u(I, N);
          return et.return = L, et;
        }
      }
      function D(L, I, N) {
        if (typeof I == "string" && I !== "" || typeof I == "number") {
          var ne = D0("" + I, L.mode, N);
          return ne.return = L, ne;
        }
        if (typeof I == "object" && I !== null) {
          switch (I.$$typeof) {
            case oi: {
              var Te = k0(I, L.mode, N);
              return Te.ref = kp(L, null, I), Te.return = L, Te;
            }
            case Lr: {
              var Ee = O0(I, L.mode, N);
              return Ee.return = L, Ee;
            }
            case qe: {
              var et = I._payload, ut = I._init;
              return D(L, ut(et), N);
            }
          }
          if (xt(I) || Nr(I)) {
            var Jt = ns(I, L.mode, N, null);
            return Jt.return = L, Jt;
          }
          rm(L, I);
        }
        return typeof I == "function" && am(L), null;
      }
      function _(L, I, N, ne) {
        var Te = I !== null ? I.key : null;
        if (typeof N == "string" && N !== "" || typeof N == "number")
          return Te !== null ? null : p(L, I, "" + N, ne);
        if (typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case oi:
              return N.key === Te ? v(L, I, N, ne) : null;
            case Lr:
              return N.key === Te ? g(L, I, N, ne) : null;
            case qe: {
              var Ee = N._payload, et = N._init;
              return _(L, I, et(Ee), ne);
            }
          }
          if (xt(N) || Nr(N))
            return Te !== null ? null : C(L, I, N, ne, null);
          rm(L, N);
        }
        return typeof N == "function" && am(L), null;
      }
      function U(L, I, N, ne, Te) {
        if (typeof ne == "string" && ne !== "" || typeof ne == "number") {
          var Ee = L.get(N) || null;
          return p(I, Ee, "" + ne, Te);
        }
        if (typeof ne == "object" && ne !== null) {
          switch (ne.$$typeof) {
            case oi: {
              var et = L.get(ne.key === null ? N : ne.key) || null;
              return v(I, et, ne, Te);
            }
            case Lr: {
              var ut = L.get(ne.key === null ? N : ne.key) || null;
              return g(I, ut, ne, Te);
            }
            case qe:
              var Jt = ne._payload, Ut = ne._init;
              return U(L, I, N, Ut(Jt), Te);
          }
          if (xt(ne) || Nr(ne)) {
            var Xn = L.get(N) || null;
            return C(I, Xn, ne, Te, null);
          }
          rm(I, ne);
        }
        return typeof ne == "function" && am(I), null;
      }
      function P(L, I, N) {
        {
          if (typeof L != "object" || L === null)
            return I;
          switch (L.$$typeof) {
            case oi:
            case Lr:
              WE(L, N);
              var ne = L.key;
              if (typeof ne != "string")
                break;
              if (I === null) {
                I = /* @__PURE__ */ new Set(), I.add(ne);
                break;
              }
              if (!I.has(ne)) {
                I.add(ne);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", ne);
              break;
            case qe:
              var Te = L._payload, Ee = L._init;
              P(Ee(Te), I, N);
              break;
          }
        }
        return I;
      }
      function B(L, I, N, ne) {
        for (var Te = null, Ee = 0; Ee < N.length; Ee++) {
          var et = N[Ee];
          Te = P(et, Te, L);
        }
        for (var ut = null, Jt = null, Ut = I, Xn = 0, Ft = 0, Yn = null; Ut !== null && Ft < N.length; Ft++) {
          Ut.index > Ft ? (Yn = Ut, Ut = null) : Yn = Ut.sibling;
          var ha = _(L, Ut, N[Ft], ne);
          if (ha === null) {
            Ut === null && (Ut = Yn);
            break;
          }
          e && Ut && ha.alternate === null && t(L, Ut), Xn = s(ha, Xn, Ft), Jt === null ? ut = ha : Jt.sibling = ha, Jt = ha, Ut = Yn;
        }
        if (Ft === N.length) {
          if (a(L, Ut), Pr()) {
            var Wr = Ft;
            qs(L, Wr);
          }
          return ut;
        }
        if (Ut === null) {
          for (; Ft < N.length; Ft++) {
            var gi = D(L, N[Ft], ne);
            gi !== null && (Xn = s(gi, Xn, Ft), Jt === null ? ut = gi : Jt.sibling = gi, Jt = gi);
          }
          if (Pr()) {
            var Na = Ft;
            qs(L, Na);
          }
          return ut;
        }
        for (var Aa = i(L, Ut); Ft < N.length; Ft++) {
          var ma = U(Aa, L, Ft, N[Ft], ne);
          ma !== null && (e && ma.alternate !== null && Aa.delete(ma.key === null ? Ft : ma.key), Xn = s(ma, Xn, Ft), Jt === null ? ut = ma : Jt.sibling = ma, Jt = ma);
        }
        if (e && Aa.forEach(function(ed) {
          return t(L, ed);
        }), Pr()) {
          var Bu = Ft;
          qs(L, Bu);
        }
        return ut;
      }
      function ye(L, I, N, ne) {
        var Te = Nr(N);
        if (typeof Te != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          N[Symbol.toStringTag] === "Generator" && (Mg || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Mg = !0), N.entries === Te && (Og || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Og = !0);
          var Ee = Te.call(N);
          if (Ee)
            for (var et = null, ut = Ee.next(); !ut.done; ut = Ee.next()) {
              var Jt = ut.value;
              et = P(Jt, et, L);
            }
        }
        var Ut = Te.call(N);
        if (Ut == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Xn = null, Ft = null, Yn = I, ha = 0, Wr = 0, gi = null, Na = Ut.next(); Yn !== null && !Na.done; Wr++, Na = Ut.next()) {
          Yn.index > Wr ? (gi = Yn, Yn = null) : gi = Yn.sibling;
          var Aa = _(L, Yn, Na.value, ne);
          if (Aa === null) {
            Yn === null && (Yn = gi);
            break;
          }
          e && Yn && Aa.alternate === null && t(L, Yn), ha = s(Aa, ha, Wr), Ft === null ? Xn = Aa : Ft.sibling = Aa, Ft = Aa, Yn = gi;
        }
        if (Na.done) {
          if (a(L, Yn), Pr()) {
            var ma = Wr;
            qs(L, ma);
          }
          return Xn;
        }
        if (Yn === null) {
          for (; !Na.done; Wr++, Na = Ut.next()) {
            var Bu = D(L, Na.value, ne);
            Bu !== null && (ha = s(Bu, ha, Wr), Ft === null ? Xn = Bu : Ft.sibling = Bu, Ft = Bu);
          }
          if (Pr()) {
            var ed = Wr;
            qs(L, ed);
          }
          return Xn;
        }
        for (var lv = i(L, Yn); !Na.done; Wr++, Na = Ut.next()) {
          var eu = U(lv, L, Wr, Na.value, ne);
          eu !== null && (e && eu.alternate !== null && lv.delete(eu.key === null ? Wr : eu.key), ha = s(eu, ha, Wr), Ft === null ? Xn = eu : Ft.sibling = eu, Ft = eu);
        }
        if (e && lv.forEach(function(uD) {
          return t(L, uD);
        }), Pr()) {
          var lD = Wr;
          qs(L, lD);
        }
        return Xn;
      }
      function Qe(L, I, N, ne) {
        if (I !== null && I.tag === ge) {
          a(L, I.sibling);
          var Te = u(I, N);
          return Te.return = L, Te;
        }
        a(L, I);
        var Ee = D0(N, L.mode, ne);
        return Ee.return = L, Ee;
      }
      function Pe(L, I, N, ne) {
        for (var Te = N.key, Ee = I; Ee !== null; ) {
          if (Ee.key === Te) {
            var et = N.type;
            if (et === Ta) {
              if (Ee.tag === Me) {
                a(L, Ee.sibling);
                var ut = u(Ee, N.props.children);
                return ut.return = L, ut._debugSource = N._source, ut._debugOwner = N._owner, ut;
              }
            } else if (Ee.elementType === et || // Keep this check inline so it only runs on the false path:
            J1(Ee, N) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof et == "object" && et !== null && et.$$typeof === qe && QE(et) === Ee.type) {
              a(L, Ee.sibling);
              var Jt = u(Ee, N.props);
              return Jt.ref = kp(L, Ee, N), Jt.return = L, Jt._debugSource = N._source, Jt._debugOwner = N._owner, Jt;
            }
            a(L, Ee);
            break;
          } else
            t(L, Ee);
          Ee = Ee.sibling;
        }
        if (N.type === Ta) {
          var Ut = ns(N.props.children, L.mode, ne, N.key);
          return Ut.return = L, Ut;
        } else {
          var Xn = k0(N, L.mode, ne);
          return Xn.ref = kp(L, I, N), Xn.return = L, Xn;
        }
      }
      function Dt(L, I, N, ne) {
        for (var Te = N.key, Ee = I; Ee !== null; ) {
          if (Ee.key === Te)
            if (Ee.tag === ce && Ee.stateNode.containerInfo === N.containerInfo && Ee.stateNode.implementation === N.implementation) {
              a(L, Ee.sibling);
              var et = u(Ee, N.children || []);
              return et.return = L, et;
            } else {
              a(L, Ee);
              break;
            }
          else
            t(L, Ee);
          Ee = Ee.sibling;
        }
        var ut = O0(N, L.mode, ne);
        return ut.return = L, ut;
      }
      function Rt(L, I, N, ne) {
        var Te = typeof N == "object" && N !== null && N.type === Ta && N.key === null;
        if (Te && (N = N.props.children), typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case oi:
              return f(Pe(L, I, N, ne));
            case Lr:
              return f(Dt(L, I, N, ne));
            case qe:
              var Ee = N._payload, et = N._init;
              return Rt(L, I, et(Ee), ne);
          }
          if (xt(N))
            return B(L, I, N, ne);
          if (Nr(N))
            return ye(L, I, N, ne);
          rm(L, N);
        }
        return typeof N == "string" && N !== "" || typeof N == "number" ? f(Qe(L, I, "" + N, ne)) : (typeof N == "function" && am(L), a(L, I));
      }
      return Rt;
    }
    var Uf = GE(!0), qE = GE(!1);
    function Ub(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = oc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = oc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function Fb(e, t) {
      for (var a = e.child; a !== null; )
        wk(a, t), a = a.sibling;
    }
    var zg = $o(null), Ug;
    Ug = {};
    var im = null, Ff = null, Fg = null, lm = !1;
    function um() {
      im = null, Ff = null, Fg = null, lm = !1;
    }
    function KE() {
      lm = !0;
    }
    function XE() {
      lm = !1;
    }
    function ZE(e, t, a) {
      pa(zg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Ug && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Ug;
    }
    function jg(e, t) {
      var a = zg.current;
      da(zg, t), e._currentValue = a;
    }
    function Pg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (wu(i.childLanes, t) ? u !== null && !wu(u.childLanes, t) && (u.childLanes = st(u.childLanes, t)) : (i.childLanes = st(i.childLanes, t), u !== null && (u.childLanes = st(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function jb(e, t, a) {
      Pb(e, t, a);
    }
    function Pb(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === G) {
                var p = To(a), v = Fu(cn, p);
                v.tag = sm;
                var g = i.updateQueue;
                if (g !== null) {
                  var C = g.shared, D = C.pending;
                  D === null ? v.next = v : (v.next = D.next, D.next = v), C.pending = v;
                }
              }
              i.lanes = st(i.lanes, a);
              var _ = i.alternate;
              _ !== null && (_.lanes = st(_.lanes, a)), Pg(i.return, a, e), s.lanes = st(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === Le)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Ht) {
          var U = i.return;
          if (U === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          U.lanes = st(U.lanes, a);
          var P = U.alternate;
          P !== null && (P.lanes = st(P.lanes, a)), Pg(U, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var B = u.sibling;
            if (B !== null) {
              B.return = u.return, u = B;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function jf(e, t) {
      im = e, Ff = null, Fg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (ca(a.lanes, t) && Bp(), a.firstContext = null);
      }
    }
    function ur(e) {
      lm && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (Fg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Ff === null) {
          if (im === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Ff = a, im.dependencies = {
            lanes: q,
            firstContext: a
          };
        } else
          Ff = Ff.next = a;
      }
      return t;
    }
    var ec = null;
    function Hg(e) {
      ec === null ? ec = [e] : ec.push(e);
    }
    function Hb() {
      if (ec !== null) {
        for (var e = 0; e < ec.length; e++) {
          var t = ec[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        ec = null;
      }
    }
    function JE(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, Hg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, om(e, i);
    }
    function Vb(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, Hg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function $b(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, Hg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, om(e, i);
    }
    function ei(e, t) {
      return om(e, t);
    }
    var Bb = om;
    function om(e, t) {
      e.lanes = st(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = st(a.lanes, t)), a === null && (e.flags & (dn | $a)) !== Ie && q1(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = st(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = st(a.childLanes, t) : (u.flags & (dn | $a)) !== Ie && q1(e), i = u, u = u.return;
      if (i.tag === K) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var eC = 0, tC = 1, sm = 2, Vg = 3, cm = !1, $g, fm;
    $g = !1, fm = null;
    function Bg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: q
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function nC(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function Fu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: eC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Wo(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (fm === u && !$g && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), $g = !0), V_()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Bb(e, a);
      } else
        return $b(e, u, t, a);
    }
    function dm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Bd(a)) {
          var s = u.lanes;
          s = ef(s, e.pendingLanes);
          var f = st(s, a);
          u.lanes = f, Id(e, f);
        }
      }
    }
    function Ig(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var g = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = g : (f.next = g, f = g), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var C = a.lastBaseUpdate;
      C === null ? a.firstBaseUpdate = t : C.next = t, a.lastBaseUpdate = t;
    }
    function Ib(e, t, a, i, u, s) {
      switch (a.tag) {
        case tC: {
          var f = a.payload;
          if (typeof f == "function") {
            KE();
            var p = f.call(s, i, u);
            {
              if (e.mode & gt) {
                Bn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  Bn(!1);
                }
              }
              XE();
            }
            return p;
          }
          return f;
        }
        case Vg:
          e.flags = e.flags & ~rr | nt;
        case eC: {
          var v = a.payload, g;
          if (typeof v == "function") {
            KE(), g = v.call(s, i, u);
            {
              if (e.mode & gt) {
                Bn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  Bn(!1);
                }
              }
              XE();
            }
          } else
            g = v;
          return g == null ? i : mt({}, i, g);
        }
        case sm:
          return cm = !0, i;
      }
      return i;
    }
    function pm(e, t, a, i) {
      var u = e.updateQueue;
      cm = !1, fm = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, g = v.next;
        v.next = null, f === null ? s = g : f.next = g, f = v;
        var C = e.alternate;
        if (C !== null) {
          var D = C.updateQueue, _ = D.lastBaseUpdate;
          _ !== f && (_ === null ? D.firstBaseUpdate = g : _.next = g, D.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var U = u.baseState, P = q, B = null, ye = null, Qe = null, Pe = s;
        do {
          var Dt = Pe.lane, Rt = Pe.eventTime;
          if (wu(i, Dt)) {
            if (Qe !== null) {
              var I = {
                eventTime: Rt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: In,
                tag: Pe.tag,
                payload: Pe.payload,
                callback: Pe.callback,
                next: null
              };
              Qe = Qe.next = I;
            }
            U = Ib(e, u, Pe, U, t, a);
            var N = Pe.callback;
            if (N !== null && // If the update was already committed, we should not queue its
            // callback again.
            Pe.lane !== In) {
              e.flags |= ki;
              var ne = u.effects;
              ne === null ? u.effects = [Pe] : ne.push(Pe);
            }
          } else {
            var L = {
              eventTime: Rt,
              lane: Dt,
              tag: Pe.tag,
              payload: Pe.payload,
              callback: Pe.callback,
              next: null
            };
            Qe === null ? (ye = Qe = L, B = U) : Qe = Qe.next = L, P = st(P, Dt);
          }
          if (Pe = Pe.next, Pe === null) {
            if (p = u.shared.pending, p === null)
              break;
            var Te = p, Ee = Te.next;
            Te.next = null, Pe = Ee, u.lastBaseUpdate = Te, u.shared.pending = null;
          }
        } while (!0);
        Qe === null && (B = U), u.baseState = B, u.firstBaseUpdate = ye, u.lastBaseUpdate = Qe;
        var et = u.shared.interleaved;
        if (et !== null) {
          var ut = et;
          do
            P = st(P, ut.lane), ut = ut.next;
          while (ut !== et);
        } else s === null && (u.shared.lanes = q);
        tv(P), e.lanes = P, e.memoizedState = U;
      }
      fm = null;
    }
    function Yb(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function rC() {
      cm = !1;
    }
    function vm() {
      return cm;
    }
    function aC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Yb(f, a));
        }
    }
    var Dp = {}, Qo = $o(Dp), Op = $o(Dp), hm = $o(Dp);
    function mm(e) {
      if (e === Dp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function iC() {
      var e = mm(hm.current);
      return e;
    }
    function Yg(e, t) {
      pa(hm, t, e), pa(Op, e, e), pa(Qo, Dp, e);
      var a = ow(t);
      da(Qo, e), pa(Qo, a, e);
    }
    function Pf(e) {
      da(Qo, e), da(Op, e), da(hm, e);
    }
    function Wg() {
      var e = mm(Qo.current);
      return e;
    }
    function lC(e) {
      mm(hm.current);
      var t = mm(Qo.current), a = sw(t, e.type);
      t !== a && (pa(Op, e, e), pa(Qo, a, e));
    }
    function Qg(e) {
      Op.current === e && (da(Qo, e), da(Op, e));
    }
    var Wb = 0, uC = 1, oC = 1, Mp = 2, sl = $o(Wb);
    function Gg(e, t) {
      return (e & t) !== 0;
    }
    function Hf(e) {
      return e & uC;
    }
    function qg(e, t) {
      return e & uC | t;
    }
    function Qb(e, t) {
      return e | t;
    }
    function Go(e, t) {
      pa(sl, t, e);
    }
    function Vf(e) {
      da(sl, e);
    }
    function Gb(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function ym(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === $) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || bE(i) || pg(i))
              return t;
          }
        } else if (t.tag === Ot && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & nt) !== Ie;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var ti = (
      /*   */
      0
    ), pr = (
      /* */
      1
    ), Ql = (
      /*  */
      2
    ), vr = (
      /*    */
      4
    ), Hr = (
      /*   */
      8
    ), Kg = [];
    function Xg() {
      for (var e = 0; e < Kg.length; e++) {
        var t = Kg[e];
        t._workInProgressVersionPrimary = null;
      }
      Kg.length = 0;
    }
    function qb(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var Re = R.ReactCurrentDispatcher, Lp = R.ReactCurrentBatchConfig, Zg, $f;
    Zg = /* @__PURE__ */ new Set();
    var tc = q, Zt = null, hr = null, mr = null, gm = !1, Np = !1, Ap = 0, Kb = 0, Xb = 25, Q = null, Fi = null, qo = -1, Jg = !1;
    function Wt() {
      {
        var e = Q;
        Fi === null ? Fi = [e] : Fi.push(e);
      }
    }
    function de() {
      {
        var e = Q;
        Fi !== null && (qo++, Fi[qo] !== e && Zb(e));
      }
    }
    function Bf(e) {
      e != null && !xt(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Q, typeof e);
    }
    function Zb(e) {
      {
        var t = at(Zt);
        if (!Zg.has(t) && (Zg.add(t), Fi !== null)) {
          for (var a = "", i = 30, u = 0; u <= qo; u++) {
            for (var s = Fi[u], f = u === qo ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function va() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function eS(e, t) {
      if (Jg)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Q), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, Q, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!ke(e[a], t[a]))
          return !1;
      return !0;
    }
    function If(e, t, a, i, u, s) {
      tc = s, Zt = t, Fi = e !== null ? e._debugHookTypes : null, qo = -1, Jg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = q, e !== null && e.memoizedState !== null ? Re.current = OC : Fi !== null ? Re.current = DC : Re.current = kC;
      var f = a(i, u);
      if (Np) {
        var p = 0;
        do {
          if (Np = !1, Ap = 0, p >= Xb)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Jg = !1, hr = null, mr = null, t.updateQueue = null, qo = -1, Re.current = MC, f = a(i, u);
        } while (Np);
      }
      Re.current = Mm, t._debugHookTypes = Fi;
      var v = hr !== null && hr.next !== null;
      if (tc = q, Zt = null, hr = null, mr = null, Q = null, Fi = null, qo = -1, e !== null && (e.flags & cr) !== (t.flags & cr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & je) !== Ae && S("Internal React error: Expected static flag was missing. Please notify the React team."), gm = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Yf() {
      var e = Ap !== 0;
      return Ap = 0, e;
    }
    function sC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & ka) !== Ae ? t.flags &= ~(hu | aa | yn | ft) : t.flags &= ~(yn | ft), e.lanes = Ls(e.lanes, a);
    }
    function cC() {
      if (Re.current = Mm, gm) {
        for (var e = Zt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        gm = !1;
      }
      tc = q, Zt = null, hr = null, mr = null, Fi = null, qo = -1, Q = null, TC = !1, Np = !1, Ap = 0;
    }
    function Gl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return mr === null ? Zt.memoizedState = mr = e : mr = mr.next = e, mr;
    }
    function ji() {
      var e;
      if (hr === null) {
        var t = Zt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = hr.next;
      var a;
      if (mr === null ? a = Zt.memoizedState : a = mr.next, a !== null)
        mr = a, a = mr.next, hr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        hr = e;
        var i = {
          memoizedState: hr.memoizedState,
          baseState: hr.baseState,
          baseQueue: hr.baseQueue,
          queue: hr.queue,
          next: null
        };
        mr === null ? Zt.memoizedState = mr = i : mr = mr.next = i;
      }
      return mr;
    }
    function fC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function tS(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function nS(e, t, a) {
      var i = Gl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: q,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = nx.bind(null, Zt, s);
      return [i.memoizedState, f];
    }
    function rS(e, t, a) {
      var i = ji(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = hr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, g = p.next;
          f.next = g, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var C = f.next, D = s.baseState, _ = null, U = null, P = null, B = C;
        do {
          var ye = B.lane;
          if (wu(tc, ye)) {
            if (P !== null) {
              var Pe = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: In,
                action: B.action,
                hasEagerState: B.hasEagerState,
                eagerState: B.eagerState,
                next: null
              };
              P = P.next = Pe;
            }
            if (B.hasEagerState)
              D = B.eagerState;
            else {
              var Dt = B.action;
              D = e(D, Dt);
            }
          } else {
            var Qe = {
              lane: ye,
              action: B.action,
              hasEagerState: B.hasEagerState,
              eagerState: B.eagerState,
              next: null
            };
            P === null ? (U = P = Qe, _ = D) : P = P.next = Qe, Zt.lanes = st(Zt.lanes, ye), tv(ye);
          }
          B = B.next;
        } while (B !== null && B !== C);
        P === null ? _ = D : P.next = U, ke(D, i.memoizedState) || Bp(), i.memoizedState = D, i.baseState = _, i.baseQueue = P, u.lastRenderedState = D;
      }
      var Rt = u.interleaved;
      if (Rt !== null) {
        var L = Rt;
        do {
          var I = L.lane;
          Zt.lanes = st(Zt.lanes, I), tv(I), L = L.next;
        } while (L !== Rt);
      } else f === null && (u.lanes = q);
      var N = u.dispatch;
      return [i.memoizedState, N];
    }
    function aS(e, t, a) {
      var i = ji(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, g = v;
        do {
          var C = g.action;
          p = e(p, C), g = g.next;
        } while (g !== v);
        ke(p, i.memoizedState) || Bp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function TO(e, t, a) {
    }
    function wO(e, t, a) {
    }
    function iS(e, t, a) {
      var i = Zt, u = Gl(), s, f = Pr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), $f || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), $f = !0);
      } else {
        if (s = t(), !$f) {
          var p = t();
          ke(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), $f = !0);
        }
        var v = Km();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Ms(v, tc) || dC(i, t, s);
      }
      u.memoizedState = s;
      var g = {
        value: s,
        getSnapshot: t
      };
      return u.queue = g, Tm(vC.bind(null, i, g, e), [e]), i.flags |= yn, zp(pr | Hr, pC.bind(null, i, g, s, t), void 0, null), s;
    }
    function Sm(e, t, a) {
      var i = Zt, u = ji(), s = t();
      if (!$f) {
        var f = t();
        ke(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), $f = !0);
      }
      var p = u.memoizedState, v = !ke(p, s);
      v && (u.memoizedState = s, Bp());
      var g = u.queue;
      if (Fp(vC.bind(null, i, g, e), [e]), g.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      mr !== null && mr.memoizedState.tag & pr) {
        i.flags |= yn, zp(pr | Hr, pC.bind(null, i, g, s, t), void 0, null);
        var C = Km();
        if (C === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Ms(C, tc) || dC(i, t, s);
      }
      return s;
    }
    function dC(e, t, a) {
      e.flags |= Cs;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Zt.updateQueue;
      if (u === null)
        u = fC(), Zt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function pC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, hC(t) && mC(e);
    }
    function vC(e, t, a) {
      var i = function() {
        hC(t) && mC(e);
      };
      return a(i);
    }
    function hC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !ke(a, i);
      } catch {
        return !0;
      }
    }
    function mC(e) {
      var t = ei(e, Ve);
      t !== null && Er(t, e, Ve, cn);
    }
    function Em(e) {
      var t = Gl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: q,
        dispatch: null,
        lastRenderedReducer: tS,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = rx.bind(null, Zt, a);
      return [t.memoizedState, i];
    }
    function lS(e) {
      return rS(tS);
    }
    function uS(e) {
      return aS(tS);
    }
    function zp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Zt.updateQueue;
      if (s === null)
        s = fC(), Zt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function oS(e) {
      var t = Gl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Cm(e) {
      var t = ji();
      return t.memoizedState;
    }
    function Up(e, t, a, i) {
      var u = Gl(), s = i === void 0 ? null : i;
      Zt.flags |= e, u.memoizedState = zp(pr | t, a, void 0, s);
    }
    function Rm(e, t, a, i) {
      var u = ji(), s = i === void 0 ? null : i, f = void 0;
      if (hr !== null) {
        var p = hr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (eS(s, v)) {
            u.memoizedState = zp(t, a, f, s);
            return;
          }
        }
      }
      Zt.flags |= e, u.memoizedState = zp(pr | t, a, f, s);
    }
    function Tm(e, t) {
      return (Zt.mode & ka) !== Ae ? Up(hu | yn | zl, Hr, e, t) : Up(yn | zl, Hr, e, t);
    }
    function Fp(e, t) {
      return Rm(yn, Hr, e, t);
    }
    function sS(e, t) {
      return Up(ft, Ql, e, t);
    }
    function wm(e, t) {
      return Rm(ft, Ql, e, t);
    }
    function cS(e, t) {
      var a = ft;
      return a |= ra, (Zt.mode & ka) !== Ae && (a |= aa), Up(a, vr, e, t);
    }
    function bm(e, t) {
      return Rm(ft, vr, e, t);
    }
    function yC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function fS(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = ft;
      return u |= ra, (Zt.mode & ka) !== Ae && (u |= aa), Up(u, vr, yC.bind(null, t, e), i);
    }
    function xm(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Rm(ft, vr, yC.bind(null, t, e), i);
    }
    function Jb(e, t) {
    }
    var _m = Jb;
    function dS(e, t) {
      var a = Gl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function km(e, t) {
      var a = ji(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (eS(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function pS(e, t) {
      var a = Gl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function Dm(e, t) {
      var a = ji(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (eS(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function vS(e) {
      var t = Gl();
      return t.memoizedState = e, e;
    }
    function gC(e) {
      var t = ji(), a = hr, i = a.memoizedState;
      return EC(t, i, e);
    }
    function SC(e) {
      var t = ji();
      if (hr === null)
        return t.memoizedState = e, e;
      var a = hr.memoizedState;
      return EC(t, a, e);
    }
    function EC(e, t, a) {
      var i = !ih(tc);
      if (i) {
        if (!ke(a, t)) {
          var u = oh();
          Zt.lanes = st(Zt.lanes, u), tv(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Bp()), e.memoizedState = a, a;
    }
    function ex(e, t, a) {
      var i = Ga();
      Mn(Ay(i, nl)), e(!0);
      var u = Lp.transition;
      Lp.transition = {};
      var s = Lp.transition;
      Lp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Mn(i), Lp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && Y("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function hS() {
      var e = Em(!1), t = e[0], a = e[1], i = ex.bind(null, a), u = Gl();
      return u.memoizedState = i, [t, i];
    }
    function CC() {
      var e = lS(), t = e[0], a = ji(), i = a.memoizedState;
      return [t, i];
    }
    function RC() {
      var e = uS(), t = e[0], a = ji(), i = a.memoizedState;
      return [t, i];
    }
    var TC = !1;
    function tx() {
      return TC;
    }
    function mS() {
      var e = Gl(), t = Km(), a = t.identifierPrefix, i;
      if (Pr()) {
        var u = gb();
        i = ":" + a + "R" + u;
        var s = Ap++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Kb++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function Om() {
      var e = ji(), t = e.memoizedState;
      return t;
    }
    function nx(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = es(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (wC(e))
        bC(t, u);
      else {
        var s = JE(e, t, u, i);
        if (s !== null) {
          var f = La();
          Er(s, e, i, f), xC(s, t, i);
        }
      }
      _C(e, i);
    }
    function rx(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = es(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (wC(e))
        bC(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === q && (s === null || s.lanes === q)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = Re.current, Re.current = cl;
            try {
              var v = t.lastRenderedState, g = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = g, ke(g, v)) {
                Vb(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              Re.current = p;
            }
          }
        }
        var C = JE(e, t, u, i);
        if (C !== null) {
          var D = La();
          Er(C, e, i, D), xC(C, t, i);
        }
      }
      _C(e, i);
    }
    function wC(e) {
      var t = e.alternate;
      return e === Zt || t !== null && t === Zt;
    }
    function bC(e, t) {
      Np = gm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function xC(e, t, a) {
      if (Bd(a)) {
        var i = t.lanes;
        i = ef(i, e.pendingLanes);
        var u = st(i, a);
        t.lanes = u, Id(e, u);
      }
    }
    function _C(e, t, a) {
      bs(e, t);
    }
    var Mm = {
      readContext: ur,
      useCallback: va,
      useContext: va,
      useEffect: va,
      useImperativeHandle: va,
      useInsertionEffect: va,
      useLayoutEffect: va,
      useMemo: va,
      useReducer: va,
      useRef: va,
      useState: va,
      useDebugValue: va,
      useDeferredValue: va,
      useTransition: va,
      useMutableSource: va,
      useSyncExternalStore: va,
      useId: va,
      unstable_isNewReconciler: ie
    }, kC = null, DC = null, OC = null, MC = null, ql = null, cl = null, Lm = null;
    {
      var yS = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, it = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      kC = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return Q = "useCallback", Wt(), Bf(t), dS(e, t);
        },
        useContext: function(e) {
          return Q = "useContext", Wt(), ur(e);
        },
        useEffect: function(e, t) {
          return Q = "useEffect", Wt(), Bf(t), Tm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return Q = "useImperativeHandle", Wt(), Bf(a), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return Q = "useInsertionEffect", Wt(), Bf(t), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Q = "useLayoutEffect", Wt(), Bf(t), cS(e, t);
        },
        useMemo: function(e, t) {
          Q = "useMemo", Wt(), Bf(t);
          var a = Re.current;
          Re.current = ql;
          try {
            return pS(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          Q = "useReducer", Wt();
          var i = Re.current;
          Re.current = ql;
          try {
            return nS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return Q = "useRef", Wt(), oS(e);
        },
        useState: function(e) {
          Q = "useState", Wt();
          var t = Re.current;
          Re.current = ql;
          try {
            return Em(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Q = "useDebugValue", Wt(), void 0;
        },
        useDeferredValue: function(e) {
          return Q = "useDeferredValue", Wt(), vS(e);
        },
        useTransition: function() {
          return Q = "useTransition", Wt(), hS();
        },
        useMutableSource: function(e, t, a) {
          return Q = "useMutableSource", Wt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return Q = "useSyncExternalStore", Wt(), iS(e, t, a);
        },
        useId: function() {
          return Q = "useId", Wt(), mS();
        },
        unstable_isNewReconciler: ie
      }, DC = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return Q = "useCallback", de(), dS(e, t);
        },
        useContext: function(e) {
          return Q = "useContext", de(), ur(e);
        },
        useEffect: function(e, t) {
          return Q = "useEffect", de(), Tm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return Q = "useImperativeHandle", de(), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return Q = "useInsertionEffect", de(), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Q = "useLayoutEffect", de(), cS(e, t);
        },
        useMemo: function(e, t) {
          Q = "useMemo", de();
          var a = Re.current;
          Re.current = ql;
          try {
            return pS(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          Q = "useReducer", de();
          var i = Re.current;
          Re.current = ql;
          try {
            return nS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return Q = "useRef", de(), oS(e);
        },
        useState: function(e) {
          Q = "useState", de();
          var t = Re.current;
          Re.current = ql;
          try {
            return Em(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Q = "useDebugValue", de(), void 0;
        },
        useDeferredValue: function(e) {
          return Q = "useDeferredValue", de(), vS(e);
        },
        useTransition: function() {
          return Q = "useTransition", de(), hS();
        },
        useMutableSource: function(e, t, a) {
          return Q = "useMutableSource", de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return Q = "useSyncExternalStore", de(), iS(e, t, a);
        },
        useId: function() {
          return Q = "useId", de(), mS();
        },
        unstable_isNewReconciler: ie
      }, OC = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return Q = "useCallback", de(), km(e, t);
        },
        useContext: function(e) {
          return Q = "useContext", de(), ur(e);
        },
        useEffect: function(e, t) {
          return Q = "useEffect", de(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return Q = "useImperativeHandle", de(), xm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return Q = "useInsertionEffect", de(), wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Q = "useLayoutEffect", de(), bm(e, t);
        },
        useMemo: function(e, t) {
          Q = "useMemo", de();
          var a = Re.current;
          Re.current = cl;
          try {
            return Dm(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          Q = "useReducer", de();
          var i = Re.current;
          Re.current = cl;
          try {
            return rS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return Q = "useRef", de(), Cm();
        },
        useState: function(e) {
          Q = "useState", de();
          var t = Re.current;
          Re.current = cl;
          try {
            return lS(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Q = "useDebugValue", de(), _m();
        },
        useDeferredValue: function(e) {
          return Q = "useDeferredValue", de(), gC(e);
        },
        useTransition: function() {
          return Q = "useTransition", de(), CC();
        },
        useMutableSource: function(e, t, a) {
          return Q = "useMutableSource", de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return Q = "useSyncExternalStore", de(), Sm(e, t);
        },
        useId: function() {
          return Q = "useId", de(), Om();
        },
        unstable_isNewReconciler: ie
      }, MC = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return Q = "useCallback", de(), km(e, t);
        },
        useContext: function(e) {
          return Q = "useContext", de(), ur(e);
        },
        useEffect: function(e, t) {
          return Q = "useEffect", de(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return Q = "useImperativeHandle", de(), xm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return Q = "useInsertionEffect", de(), wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Q = "useLayoutEffect", de(), bm(e, t);
        },
        useMemo: function(e, t) {
          Q = "useMemo", de();
          var a = Re.current;
          Re.current = Lm;
          try {
            return Dm(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          Q = "useReducer", de();
          var i = Re.current;
          Re.current = Lm;
          try {
            return aS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return Q = "useRef", de(), Cm();
        },
        useState: function(e) {
          Q = "useState", de();
          var t = Re.current;
          Re.current = Lm;
          try {
            return uS(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Q = "useDebugValue", de(), _m();
        },
        useDeferredValue: function(e) {
          return Q = "useDeferredValue", de(), SC(e);
        },
        useTransition: function() {
          return Q = "useTransition", de(), RC();
        },
        useMutableSource: function(e, t, a) {
          return Q = "useMutableSource", de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return Q = "useSyncExternalStore", de(), Sm(e, t);
        },
        useId: function() {
          return Q = "useId", de(), Om();
        },
        unstable_isNewReconciler: ie
      }, ql = {
        readContext: function(e) {
          return yS(), ur(e);
        },
        useCallback: function(e, t) {
          return Q = "useCallback", it(), Wt(), dS(e, t);
        },
        useContext: function(e) {
          return Q = "useContext", it(), Wt(), ur(e);
        },
        useEffect: function(e, t) {
          return Q = "useEffect", it(), Wt(), Tm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return Q = "useImperativeHandle", it(), Wt(), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return Q = "useInsertionEffect", it(), Wt(), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Q = "useLayoutEffect", it(), Wt(), cS(e, t);
        },
        useMemo: function(e, t) {
          Q = "useMemo", it(), Wt();
          var a = Re.current;
          Re.current = ql;
          try {
            return pS(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          Q = "useReducer", it(), Wt();
          var i = Re.current;
          Re.current = ql;
          try {
            return nS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return Q = "useRef", it(), Wt(), oS(e);
        },
        useState: function(e) {
          Q = "useState", it(), Wt();
          var t = Re.current;
          Re.current = ql;
          try {
            return Em(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Q = "useDebugValue", it(), Wt(), void 0;
        },
        useDeferredValue: function(e) {
          return Q = "useDeferredValue", it(), Wt(), vS(e);
        },
        useTransition: function() {
          return Q = "useTransition", it(), Wt(), hS();
        },
        useMutableSource: function(e, t, a) {
          return Q = "useMutableSource", it(), Wt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return Q = "useSyncExternalStore", it(), Wt(), iS(e, t, a);
        },
        useId: function() {
          return Q = "useId", it(), Wt(), mS();
        },
        unstable_isNewReconciler: ie
      }, cl = {
        readContext: function(e) {
          return yS(), ur(e);
        },
        useCallback: function(e, t) {
          return Q = "useCallback", it(), de(), km(e, t);
        },
        useContext: function(e) {
          return Q = "useContext", it(), de(), ur(e);
        },
        useEffect: function(e, t) {
          return Q = "useEffect", it(), de(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return Q = "useImperativeHandle", it(), de(), xm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return Q = "useInsertionEffect", it(), de(), wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Q = "useLayoutEffect", it(), de(), bm(e, t);
        },
        useMemo: function(e, t) {
          Q = "useMemo", it(), de();
          var a = Re.current;
          Re.current = cl;
          try {
            return Dm(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          Q = "useReducer", it(), de();
          var i = Re.current;
          Re.current = cl;
          try {
            return rS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return Q = "useRef", it(), de(), Cm();
        },
        useState: function(e) {
          Q = "useState", it(), de();
          var t = Re.current;
          Re.current = cl;
          try {
            return lS(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Q = "useDebugValue", it(), de(), _m();
        },
        useDeferredValue: function(e) {
          return Q = "useDeferredValue", it(), de(), gC(e);
        },
        useTransition: function() {
          return Q = "useTransition", it(), de(), CC();
        },
        useMutableSource: function(e, t, a) {
          return Q = "useMutableSource", it(), de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return Q = "useSyncExternalStore", it(), de(), Sm(e, t);
        },
        useId: function() {
          return Q = "useId", it(), de(), Om();
        },
        unstable_isNewReconciler: ie
      }, Lm = {
        readContext: function(e) {
          return yS(), ur(e);
        },
        useCallback: function(e, t) {
          return Q = "useCallback", it(), de(), km(e, t);
        },
        useContext: function(e) {
          return Q = "useContext", it(), de(), ur(e);
        },
        useEffect: function(e, t) {
          return Q = "useEffect", it(), de(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return Q = "useImperativeHandle", it(), de(), xm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return Q = "useInsertionEffect", it(), de(), wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Q = "useLayoutEffect", it(), de(), bm(e, t);
        },
        useMemo: function(e, t) {
          Q = "useMemo", it(), de();
          var a = Re.current;
          Re.current = cl;
          try {
            return Dm(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          Q = "useReducer", it(), de();
          var i = Re.current;
          Re.current = cl;
          try {
            return aS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return Q = "useRef", it(), de(), Cm();
        },
        useState: function(e) {
          Q = "useState", it(), de();
          var t = Re.current;
          Re.current = cl;
          try {
            return uS(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Q = "useDebugValue", it(), de(), _m();
        },
        useDeferredValue: function(e) {
          return Q = "useDeferredValue", it(), de(), SC(e);
        },
        useTransition: function() {
          return Q = "useTransition", it(), de(), RC();
        },
        useMutableSource: function(e, t, a) {
          return Q = "useMutableSource", it(), de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return Q = "useSyncExternalStore", it(), de(), Sm(e, t);
        },
        useId: function() {
          return Q = "useId", it(), de(), Om();
        },
        unstable_isNewReconciler: ie
      };
    }
    var Ko = E.unstable_now, LC = 0, Nm = -1, jp = -1, Am = -1, gS = !1, zm = !1;
    function NC() {
      return gS;
    }
    function ax() {
      zm = !0;
    }
    function ix() {
      gS = !1, zm = !1;
    }
    function lx() {
      gS = zm, zm = !1;
    }
    function AC() {
      return LC;
    }
    function zC() {
      LC = Ko();
    }
    function SS(e) {
      jp = Ko(), e.actualStartTime < 0 && (e.actualStartTime = Ko());
    }
    function UC(e) {
      jp = -1;
    }
    function Um(e, t) {
      if (jp >= 0) {
        var a = Ko() - jp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), jp = -1;
      }
    }
    function Kl(e) {
      if (Nm >= 0) {
        var t = Ko() - Nm;
        Nm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case K:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case Ue:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function ES(e) {
      if (Am >= 0) {
        var t = Ko() - Am;
        Am = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case K:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case Ue:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Xl() {
      Nm = Ko();
    }
    function CS() {
      Am = Ko();
    }
    function RS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function fl(e, t) {
      if (e && e.defaultProps) {
        var a = mt({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var TS = {}, wS, bS, xS, _S, kS, FC, Fm, DS, OS, MS, Pp;
    {
      wS = /* @__PURE__ */ new Set(), bS = /* @__PURE__ */ new Set(), xS = /* @__PURE__ */ new Set(), _S = /* @__PURE__ */ new Set(), DS = /* @__PURE__ */ new Set(), kS = /* @__PURE__ */ new Set(), OS = /* @__PURE__ */ new Set(), MS = /* @__PURE__ */ new Set(), Pp = /* @__PURE__ */ new Set();
      var jC = /* @__PURE__ */ new Set();
      Fm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          jC.has(a) || (jC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, FC = function(e, t) {
        if (t === void 0) {
          var a = bt(e) || "Component";
          kS.has(a) || (kS.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(TS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(TS);
    }
    function LS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & gt) {
          Bn(!0);
          try {
            s = a(i, u);
          } finally {
            Bn(!1);
          }
        }
        FC(t, s);
      }
      var f = s == null ? u : mt({}, u, s);
      if (e.memoizedState = f, e.lanes === q) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var NS = {
      isMounted: xa,
      enqueueSetState: function(e, t, a) {
        var i = Ha(e), u = La(), s = es(i), f = Fu(u, s);
        f.payload = t, a != null && (Fm(a, "setState"), f.callback = a);
        var p = Wo(i, f, s);
        p !== null && (Er(p, i, s, u), dm(p, i, s)), bs(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Ha(e), u = La(), s = es(i), f = Fu(u, s);
        f.tag = tC, f.payload = t, a != null && (Fm(a, "replaceState"), f.callback = a);
        var p = Wo(i, f, s);
        p !== null && (Er(p, i, s, u), dm(p, i, s)), bs(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Ha(e), i = La(), u = es(a), s = Fu(i, u);
        s.tag = sm, t != null && (Fm(t, "forceUpdate"), s.callback = t);
        var f = Wo(a, s, u);
        f !== null && (Er(f, a, u, i), dm(f, a, u)), Fc(a, u);
      }
    };
    function PC(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & gt) {
            Bn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              Bn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", bt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Je(a, i) || !Je(u, s) : !0;
    }
    function ux(e, t, a) {
      var i = e.stateNode;
      {
        var u = bt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Pp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & gt) === Ae && (Pp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Pp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & gt) === Ae && (Pp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !OS.has(t) && (OS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", bt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !xS.has(t) && (xS.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", bt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || xt(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function HC(e, t) {
      t.updater = NS, e.stateNode = t, oo(t, e), t._reactInternalInstance = TS;
    }
    function VC(e, t, a) {
      var i = !1, u = mi, s = mi, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === J && f._context === void 0
        );
        if (!p && !MS.has(t)) {
          MS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === b ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", bt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = ur(f);
      else {
        u = Mf(e, t, !0);
        var g = t.contextTypes;
        i = g != null, s = i ? Lf(e, u) : mi;
      }
      var C = new t(a, s);
      if (e.mode & gt) {
        Bn(!0);
        try {
          C = new t(a, s);
        } finally {
          Bn(!1);
        }
      }
      var D = e.memoizedState = C.state !== null && C.state !== void 0 ? C.state : null;
      HC(e, C);
      {
        if (typeof t.getDerivedStateFromProps == "function" && D === null) {
          var _ = bt(t) || "Component";
          bS.has(_) || (bS.add(_), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", _, C.state === null ? "null" : "undefined", _));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof C.getSnapshotBeforeUpdate == "function") {
          var U = null, P = null, B = null;
          if (typeof C.componentWillMount == "function" && C.componentWillMount.__suppressDeprecationWarning !== !0 ? U = "componentWillMount" : typeof C.UNSAFE_componentWillMount == "function" && (U = "UNSAFE_componentWillMount"), typeof C.componentWillReceiveProps == "function" && C.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? P = "componentWillReceiveProps" : typeof C.UNSAFE_componentWillReceiveProps == "function" && (P = "UNSAFE_componentWillReceiveProps"), typeof C.componentWillUpdate == "function" && C.componentWillUpdate.__suppressDeprecationWarning !== !0 ? B = "componentWillUpdate" : typeof C.UNSAFE_componentWillUpdate == "function" && (B = "UNSAFE_componentWillUpdate"), U !== null || P !== null || B !== null) {
            var ye = bt(t) || "Component", Qe = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            _S.has(ye) || (_S.add(ye), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ye, Qe, U !== null ? `
  ` + U : "", P !== null ? `
  ` + P : "", B !== null ? `
  ` + B : ""));
          }
        }
      }
      return i && OE(e, u, s), C;
    }
    function ox(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", at(e) || "Component"), NS.enqueueReplaceState(t, t.state, null));
    }
    function $C(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = at(e) || "Component";
          wS.has(s) || (wS.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        NS.enqueueReplaceState(t, t.state, null);
      }
    }
    function AS(e, t, a, i) {
      ux(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, Bg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = ur(s);
      else {
        var f = Mf(e, t, !0);
        u.context = Lf(e, f);
      }
      {
        if (u.state === a) {
          var p = bt(t) || "Component";
          DS.has(p) || (DS.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & gt && ol.recordLegacyContextWarning(e, u), ol.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (LS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (ox(e, u), pm(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var g = ft;
        g |= ra, (e.mode & ka) !== Ae && (g |= aa), e.flags |= g;
      }
    }
    function sx(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = mi;
      if (typeof p == "object" && p !== null)
        v = ur(p);
      else {
        var g = Mf(e, t, !0);
        v = Lf(e, g);
      }
      var C = t.getDerivedStateFromProps, D = typeof C == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !D && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && $C(e, u, a, v), rC();
      var _ = e.memoizedState, U = u.state = _;
      if (pm(e, a, u, i), U = e.memoizedState, s === a && _ === U && !Gh() && !vm()) {
        if (typeof u.componentDidMount == "function") {
          var P = ft;
          P |= ra, (e.mode & ka) !== Ae && (P |= aa), e.flags |= P;
        }
        return !1;
      }
      typeof C == "function" && (LS(e, t, C, a), U = e.memoizedState);
      var B = vm() || PC(e, t, s, a, _, U, v);
      if (B) {
        if (!D && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var ye = ft;
          ye |= ra, (e.mode & ka) !== Ae && (ye |= aa), e.flags |= ye;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Qe = ft;
          Qe |= ra, (e.mode & ka) !== Ae && (Qe |= aa), e.flags |= Qe;
        }
        e.memoizedProps = a, e.memoizedState = U;
      }
      return u.props = a, u.state = U, u.context = v, B;
    }
    function cx(e, t, a, i, u) {
      var s = t.stateNode;
      nC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : fl(t.type, f);
      s.props = p;
      var v = t.pendingProps, g = s.context, C = a.contextType, D = mi;
      if (typeof C == "object" && C !== null)
        D = ur(C);
      else {
        var _ = Mf(t, a, !0);
        D = Lf(t, _);
      }
      var U = a.getDerivedStateFromProps, P = typeof U == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !P && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || g !== D) && $C(t, s, i, D), rC();
      var B = t.memoizedState, ye = s.state = B;
      if (pm(t, i, s, u), ye = t.memoizedState, f === v && B === ye && !Gh() && !vm() && !Ne)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= ft), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= Va), !1;
      typeof U == "function" && (LS(t, a, U, i), ye = t.memoizedState);
      var Qe = vm() || PC(t, a, p, i, B, ye, D) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Ne;
      return Qe ? (!P && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, ye, D), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, ye, D)), typeof s.componentDidUpdate == "function" && (t.flags |= ft), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Va)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= ft), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= Va), t.memoizedProps = i, t.memoizedState = ye), s.props = i, s.state = ye, s.context = D, Qe;
    }
    function nc(e, t) {
      return {
        value: e,
        source: t,
        stack: qu(t),
        digest: null
      };
    }
    function zS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function fx(e, t) {
      return !0;
    }
    function US(e, t) {
      try {
        var a = fx(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === G)
            return;
          console.error(i);
        }
        var p = u ? at(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", g;
        if (e.tag === K)
          g = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var C = at(e) || "Anonymous";
          g = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + C + ".");
        }
        var D = v + `
` + f + `

` + ("" + g);
        console.error(D);
      } catch (_) {
        setTimeout(function() {
          throw _;
        });
      }
    }
    var dx = typeof WeakMap == "function" ? WeakMap : Map;
    function BC(e, t, a) {
      var i = Fu(cn, a);
      i.tag = Vg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        ak(u), US(e, t);
      }, i;
    }
    function FS(e, t, a) {
      var i = Fu(cn, a);
      i.tag = Vg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          eR(e), US(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        eR(e), US(e, t), typeof u != "function" && nk(this);
        var v = t.value, g = t.stack;
        this.componentDidCatch(v, {
          componentStack: g !== null ? g : ""
        }), typeof u != "function" && (ca(e.lanes, Ve) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", at(e) || "Unknown"));
      }), i;
    }
    function IC(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new dx(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = ik.bind(null, e, t, a);
        _a && nv(e, a), t.then(s, s);
      }
    }
    function px(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function vx(e, t) {
      var a = e.tag;
      if ((e.mode & je) === Ae && (a === Z || a === Se || a === pe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function YC(e) {
      var t = e;
      do {
        if (t.tag === $ && Gb(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function WC(e, t, a, i, u) {
      if ((e.mode & je) === Ae) {
        if (e === t)
          e.flags |= rr;
        else {
          if (e.flags |= nt, a.flags |= Rs, a.flags &= ~(bc | wa), a.tag === G) {
            var s = a.alternate;
            if (s === null)
              a.tag = En;
            else {
              var f = Fu(cn, Ve);
              f.tag = sm, Wo(a, f, Ve);
            }
          }
          a.lanes = st(a.lanes, Ve);
        }
        return e;
      }
      return e.flags |= rr, e.lanes = u, e;
    }
    function hx(e, t, a, i, u) {
      if (a.flags |= wa, _a && nv(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        vx(a), Pr() && a.mode & je && FE();
        var f = YC(t);
        if (f !== null) {
          f.flags &= ~On, WC(f, t, a, e, u), f.mode & je && IC(e, s, u), px(f, e, s);
          return;
        } else {
          if (!$d(u)) {
            IC(e, s, u), m0();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Pr() && a.mode & je) {
        FE();
        var v = YC(t);
        if (v !== null) {
          (v.flags & rr) === Ie && (v.flags |= On), WC(v, t, a, e, u), Dg(nc(i, a));
          return;
        }
      }
      i = nc(i, a), G_(i);
      var g = t;
      do {
        switch (g.tag) {
          case K: {
            var C = i;
            g.flags |= rr;
            var D = To(u);
            g.lanes = st(g.lanes, D);
            var _ = BC(g, C, D);
            Ig(g, _);
            return;
          }
          case G:
            var U = i, P = g.type, B = g.stateNode;
            if ((g.flags & nt) === Ie && (typeof P.getDerivedStateFromError == "function" || B !== null && typeof B.componentDidCatch == "function" && !Y1(B))) {
              g.flags |= rr;
              var ye = To(u);
              g.lanes = st(g.lanes, ye);
              var Qe = FS(g, U, ye);
              Ig(g, Qe);
              return;
            }
            break;
        }
        g = g.return;
      } while (g !== null);
    }
    function mx() {
      return null;
    }
    var Hp = R.ReactCurrentOwner, dl = !1, jS, Vp, PS, HS, VS, rc, $S, jm, $p;
    jS = {}, Vp = {}, PS = {}, HS = {}, VS = {}, rc = !1, $S = {}, jm = {}, $p = {};
    function Oa(e, t, a, i) {
      e === null ? t.child = qE(t, null, a, i) : t.child = Uf(t, e.child, a, i);
    }
    function yx(e, t, a, i) {
      t.child = Uf(t, e.child, null, i), t.child = Uf(t, null, a, i);
    }
    function QC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && ll(
          s,
          i,
          // Resolved props
          "prop",
          bt(a)
        );
      }
      var f = a.render, p = t.ref, v, g;
      jf(t, u), po(t);
      {
        if (Hp.current = t, ea(!0), v = If(e, t, f, i, p, u), g = Yf(), t.mode & gt) {
          Bn(!0);
          try {
            v = If(e, t, f, i, p, u), g = Yf();
          } finally {
            Bn(!1);
          }
        }
        ea(!1);
      }
      return ua(), e !== null && !dl ? (sC(e, t, u), ju(e, t, u)) : (Pr() && g && Tg(t), t.flags |= Nl, Oa(e, t, v, u), t.child);
    }
    function GC(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (Rk(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = Jf(s), t.tag = pe, t.type = f, YS(t, s), qC(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && ll(
            p,
            i,
            // Resolved props
            "prop",
            bt(s)
          ), a.defaultProps !== void 0) {
            var v = bt(s) || "Unknown";
            $p[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), $p[v] = !0);
          }
        }
        var g = _0(a.type, null, i, t, t.mode, u);
        return g.ref = t.ref, g.return = t, t.child = g, g;
      }
      {
        var C = a.type, D = C.propTypes;
        D && ll(
          D,
          i,
          // Resolved props
          "prop",
          bt(C)
        );
      }
      var _ = e.child, U = XS(e, u);
      if (!U) {
        var P = _.memoizedProps, B = a.compare;
        if (B = B !== null ? B : Je, B(P, i) && e.ref === t.ref)
          return ju(e, t, u);
      }
      t.flags |= Nl;
      var ye = oc(_, i);
      return ye.ref = t.ref, ye.return = t, t.child = ye, ye;
    }
    function qC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === qe) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var g = s && s.propTypes;
          g && ll(
            g,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            bt(s)
          );
        }
      }
      if (e !== null) {
        var C = e.memoizedProps;
        if (Je(C, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (dl = !1, t.pendingProps = i = C, XS(e, u))
            (e.flags & Rs) !== Ie && (dl = !0);
          else return t.lanes = e.lanes, ju(e, t, u);
      }
      return BS(e, t, a, i, u);
    }
    function KC(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || se)
        if ((t.mode & je) === Ae) {
          var f = {
            baseLanes: q,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Xm(t, a);
        } else if (ca(a, _r)) {
          var D = {
            baseLanes: q,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = D;
          var _ = s !== null ? s.baseLanes : a;
          Xm(t, _);
        } else {
          var p = null, v;
          if (s !== null) {
            var g = s.baseLanes;
            v = st(g, a);
          } else
            v = a;
          t.lanes = t.childLanes = _r;
          var C = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = C, t.updateQueue = null, Xm(t, v), null;
        }
      else {
        var U;
        s !== null ? (U = st(s.baseLanes, a), t.memoizedState = null) : U = a, Xm(t, U);
      }
      return Oa(e, t, u, a), t.child;
    }
    function gx(e, t, a) {
      var i = t.pendingProps;
      return Oa(e, t, i, a), t.child;
    }
    function Sx(e, t, a) {
      var i = t.pendingProps.children;
      return Oa(e, t, i, a), t.child;
    }
    function Ex(e, t, a) {
      {
        t.flags |= ft;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return Oa(e, t, s, a), t.child;
    }
    function XC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= na, t.flags |= Dd);
    }
    function BS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && ll(
          s,
          i,
          // Resolved props
          "prop",
          bt(a)
        );
      }
      var f;
      {
        var p = Mf(t, a, !0);
        f = Lf(t, p);
      }
      var v, g;
      jf(t, u), po(t);
      {
        if (Hp.current = t, ea(!0), v = If(e, t, a, i, f, u), g = Yf(), t.mode & gt) {
          Bn(!0);
          try {
            v = If(e, t, a, i, f, u), g = Yf();
          } finally {
            Bn(!1);
          }
        }
        ea(!1);
      }
      return ua(), e !== null && !dl ? (sC(e, t, u), ju(e, t, u)) : (Pr() && g && Tg(t), t.flags |= Nl, Oa(e, t, v, u), t.child);
    }
    function ZC(e, t, a, i, u) {
      {
        switch (Fk(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= nt, t.flags |= rr;
            var g = new Error("Simulated error coming from DevTools"), C = To(u);
            t.lanes = st(t.lanes, C);
            var D = FS(t, nc(g, t), C);
            Ig(t, D);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var _ = a.propTypes;
          _ && ll(
            _,
            i,
            // Resolved props
            "prop",
            bt(a)
          );
        }
      }
      var U;
      Wl(a) ? (U = !0, Kh(t)) : U = !1, jf(t, u);
      var P = t.stateNode, B;
      P === null ? (Hm(e, t), VC(t, a, i), AS(t, a, i, u), B = !0) : e === null ? B = sx(t, a, i, u) : B = cx(e, t, a, i, u);
      var ye = IS(e, t, a, B, U, u);
      {
        var Qe = t.stateNode;
        B && Qe.props !== i && (rc || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", at(t) || "a component"), rc = !0);
      }
      return ye;
    }
    function IS(e, t, a, i, u, s) {
      XC(e, t);
      var f = (t.flags & nt) !== Ie;
      if (!i && !f)
        return u && NE(t, a, !1), ju(e, t, s);
      var p = t.stateNode;
      Hp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, UC();
      else {
        po(t);
        {
          if (ea(!0), v = p.render(), t.mode & gt) {
            Bn(!0);
            try {
              p.render();
            } finally {
              Bn(!1);
            }
          }
          ea(!1);
        }
        ua();
      }
      return t.flags |= Nl, e !== null && f ? yx(e, t, v, s) : Oa(e, t, v, s), t.memoizedState = p.state, u && NE(t, a, !0), t.child;
    }
    function JC(e) {
      var t = e.stateNode;
      t.pendingContext ? ME(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ME(e, t.context, !1), Yg(e, t.containerInfo);
    }
    function Cx(e, t, a) {
      if (JC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      nC(e, t), pm(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, g = t.updateQueue;
        if (g.baseState = v, t.memoizedState = v, t.flags & On) {
          var C = nc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return e1(e, t, p, a, C);
        } else if (p !== s) {
          var D = nc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return e1(e, t, p, a, D);
        } else {
          wb(t);
          var _ = qE(t, null, p, a);
          t.child = _;
          for (var U = _; U; )
            U.flags = U.flags & ~dn | $a, U = U.sibling;
        }
      } else {
        if (zf(), p === s)
          return ju(e, t, a);
        Oa(e, t, p, a);
      }
      return t.child;
    }
    function e1(e, t, a, i, u) {
      return zf(), Dg(u), t.flags |= On, Oa(e, t, a, i), t.child;
    }
    function Rx(e, t, a) {
      lC(t), e === null && kg(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = sg(i, u);
      return p ? f = null : s !== null && sg(i, s) && (t.flags |= Yt), XC(e, t), Oa(e, t, f, a), t.child;
    }
    function Tx(e, t) {
      return e === null && kg(t), null;
    }
    function wx(e, t, a, i) {
      Hm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var g = t.tag = Tk(v), C = fl(v, u), D;
      switch (g) {
        case Z:
          return YS(t, v), t.type = v = Jf(v), D = BS(null, t, v, C, i), D;
        case G:
          return t.type = v = C0(v), D = ZC(null, t, v, C, i), D;
        case Se:
          return t.type = v = R0(v), D = QC(null, t, v, C, i), D;
        case Be: {
          if (t.type !== t.elementType) {
            var _ = v.propTypes;
            _ && ll(
              _,
              C,
              // Resolved for outer only
              "prop",
              bt(v)
            );
          }
          return D = GC(
            null,
            t,
            v,
            fl(v.type, C),
            // The inner type can have defaults too
            i
          ), D;
        }
      }
      var U = "";
      throw v !== null && typeof v == "object" && v.$$typeof === qe && (U = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + U));
    }
    function bx(e, t, a, i, u) {
      Hm(e, t), t.tag = G;
      var s;
      return Wl(a) ? (s = !0, Kh(t)) : s = !1, jf(t, u), VC(t, a, i), AS(t, a, i, u), IS(null, t, a, !0, s, u);
    }
    function xx(e, t, a, i) {
      Hm(e, t);
      var u = t.pendingProps, s;
      {
        var f = Mf(t, a, !1);
        s = Lf(t, f);
      }
      jf(t, i);
      var p, v;
      po(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var g = bt(a) || "Unknown";
          jS[g] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", g, g), jS[g] = !0);
        }
        t.mode & gt && ol.recordLegacyContextWarning(t, null), ea(!0), Hp.current = t, p = If(null, t, a, u, s, i), v = Yf(), ea(!1);
      }
      if (ua(), t.flags |= Nl, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var C = bt(a) || "Unknown";
        Vp[C] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", C, C, C), Vp[C] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var D = bt(a) || "Unknown";
          Vp[D] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", D, D, D), Vp[D] = !0);
        }
        t.tag = G, t.memoizedState = null, t.updateQueue = null;
        var _ = !1;
        return Wl(a) ? (_ = !0, Kh(t)) : _ = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, Bg(t), HC(t, p), AS(t, a, u, i), IS(null, t, a, !0, _, i);
      } else {
        if (t.tag = Z, t.mode & gt) {
          Bn(!0);
          try {
            p = If(null, t, a, u, s, i), v = Yf();
          } finally {
            Bn(!1);
          }
        }
        return Pr() && v && Tg(t), Oa(null, t, p, i), YS(t, a), t.child;
      }
    }
    function YS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Ur();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), VS[u] || (VS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = bt(t) || "Unknown";
          $p[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), $p[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = bt(t) || "Unknown";
          HS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), HS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = bt(t) || "Unknown";
          PS[v] || (S("%s: Function components do not support contextType.", v), PS[v] = !0);
        }
      }
    }
    var WS = {
      dehydrated: null,
      treeContext: null,
      retryLane: In
    };
    function QS(e) {
      return {
        baseLanes: e,
        cachePool: mx(),
        transitions: null
      };
    }
    function _x(e, t) {
      var a = null;
      return {
        baseLanes: st(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function kx(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Gg(e, Mp);
    }
    function Dx(e, t) {
      return Ls(e.childLanes, t);
    }
    function t1(e, t, a) {
      var i = t.pendingProps;
      jk(t) && (t.flags |= nt);
      var u = sl.current, s = !1, f = (t.flags & nt) !== Ie;
      if (f || kx(u, e) ? (s = !0, t.flags &= ~nt) : (e === null || e.memoizedState !== null) && (u = Qb(u, oC)), u = Hf(u), Go(t, u), e === null) {
        kg(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Ax(t, v);
        }
        var g = i.children, C = i.fallback;
        if (s) {
          var D = Ox(t, g, C, a), _ = t.child;
          return _.memoizedState = QS(a), t.memoizedState = WS, D;
        } else
          return GS(t, g);
      } else {
        var U = e.memoizedState;
        if (U !== null) {
          var P = U.dehydrated;
          if (P !== null)
            return zx(e, t, f, i, P, U, a);
        }
        if (s) {
          var B = i.fallback, ye = i.children, Qe = Lx(e, t, ye, B, a), Pe = t.child, Dt = e.child.memoizedState;
          return Pe.memoizedState = Dt === null ? QS(a) : _x(Dt, a), Pe.childLanes = Dx(e, a), t.memoizedState = WS, Qe;
        } else {
          var Rt = i.children, L = Mx(e, t, Rt, a);
          return t.memoizedState = null, L;
        }
      }
    }
    function GS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = qS(u, i);
      return s.return = e, e.child = s, s;
    }
    function Ox(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & je) === Ae && s !== null ? (p = s, p.childLanes = q, p.pendingProps = f, e.mode & rt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = ns(a, u, i, null)) : (p = qS(f, u), v = ns(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function qS(e, t, a) {
      return nR(e, t, q, null);
    }
    function n1(e, t) {
      return oc(e, t);
    }
    function Mx(e, t, a, i) {
      var u = e.child, s = u.sibling, f = n1(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & je) === Ae && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= Pt) : p.push(s);
      }
      return t.child = f, f;
    }
    function Lx(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, g;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & je) === Ae && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var C = t.child;
        g = C, g.childLanes = q, g.pendingProps = v, t.mode & rt && (g.actualDuration = 0, g.actualStartTime = -1, g.selfBaseDuration = f.selfBaseDuration, g.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        g = n1(f, v), g.subtreeFlags = f.subtreeFlags & cr;
      var D;
      return p !== null ? D = oc(p, i) : (D = ns(i, s, u, null), D.flags |= dn), D.return = t, g.return = t, g.sibling = D, t.child = g, D;
    }
    function Pm(e, t, a, i) {
      i !== null && Dg(i), Uf(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = GS(t, s);
      return f.flags |= dn, t.memoizedState = null, f;
    }
    function Nx(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = qS(f, s), v = ns(i, s, u, null);
      return v.flags |= dn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & je) !== Ae && Uf(t, e.child, null, u), v;
    }
    function Ax(e, t, a) {
      return (e.mode & je) === Ae ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ve) : pg(t) ? e.lanes = tl : e.lanes = _r, null;
    }
    function zx(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & On) {
          t.flags &= ~On;
          var L = zS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Pm(e, t, f, L);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= nt, null;
          var I = i.children, N = i.fallback, ne = Nx(e, t, I, N, f), Te = t.child;
          return Te.memoizedState = QS(f), t.memoizedState = WS, ne;
        }
      else {
        if (Rb(), (t.mode & je) === Ae)
          return Pm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (pg(u)) {
          var p, v, g;
          {
            var C = Pw(u);
            p = C.digest, v = C.message, g = C.stack;
          }
          var D;
          v ? D = new Error(v) : D = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var _ = zS(D, p, g);
          return Pm(e, t, f, _);
        }
        var U = ca(f, e.childLanes);
        if (dl || U) {
          var P = Km();
          if (P !== null) {
            var B = fh(P, f);
            if (B !== In && B !== s.retryLane) {
              s.retryLane = B;
              var ye = cn;
              ei(e, B), Er(P, e, B, ye);
            }
          }
          m0();
          var Qe = zS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Pm(e, t, f, Qe);
        } else if (bE(u)) {
          t.flags |= nt, t.child = e.child;
          var Pe = lk.bind(null, e);
          return Hw(u, Pe), null;
        } else {
          bb(t, u, s.treeContext);
          var Dt = i.children, Rt = GS(t, Dt);
          return Rt.flags |= $a, Rt;
        }
      }
    }
    function r1(e, t, a) {
      e.lanes = st(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = st(i.lanes, t)), Pg(e.return, t, a);
    }
    function Ux(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === $) {
          var u = i.memoizedState;
          u !== null && r1(i, a, e);
        } else if (i.tag === Ot)
          r1(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function Fx(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && ym(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function jx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !$S[e])
        if ($S[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function Px(e, t) {
      e !== void 0 && !jm[e] && (e !== "collapsed" && e !== "hidden" ? (jm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (jm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function a1(e, t) {
      {
        var a = xt(e), i = !a && typeof Nr(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function Hx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (xt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!a1(e[a], a))
              return;
        } else {
          var i = Nr(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!a1(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function KS(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function i1(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      jx(u), Px(s, u), Hx(f, u), Oa(e, t, f, a);
      var p = sl.current, v = Gg(p, Mp);
      if (v)
        p = qg(p, Mp), t.flags |= nt;
      else {
        var g = e !== null && (e.flags & nt) !== Ie;
        g && Ux(t, t.child, a), p = Hf(p);
      }
      if (Go(t, p), (t.mode & je) === Ae)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var C = Fx(t.child), D;
            C === null ? (D = t.child, t.child = null) : (D = C.sibling, C.sibling = null), KS(
              t,
              !1,
              // isBackwards
              D,
              C,
              s
            );
            break;
          }
          case "backwards": {
            var _ = null, U = t.child;
            for (t.child = null; U !== null; ) {
              var P = U.alternate;
              if (P !== null && ym(P) === null) {
                t.child = U;
                break;
              }
              var B = U.sibling;
              U.sibling = _, _ = U, U = B;
            }
            KS(
              t,
              !0,
              // isBackwards
              _,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            KS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Vx(e, t, a) {
      Yg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = Uf(t, null, i, a) : Oa(e, t, i, a), t.child;
    }
    var l1 = !1;
    function $x(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || l1 || (l1 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && ll(v, s, "prop", "Context.Provider");
      }
      if (ZE(t, u, p), f !== null) {
        var g = f.value;
        if (ke(g, p)) {
          if (f.children === s.children && !Gh())
            return ju(e, t, a);
        } else
          jb(t, u, a);
      }
      var C = s.children;
      return Oa(e, t, C, a), t.child;
    }
    var u1 = !1;
    function Bx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (u1 || (u1 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), jf(t, a);
      var f = ur(i);
      po(t);
      var p;
      return Hp.current = t, ea(!0), p = s(f), ea(!1), ua(), t.flags |= Nl, Oa(e, t, p, a), t.child;
    }
    function Bp() {
      dl = !0;
    }
    function Hm(e, t) {
      (t.mode & je) === Ae && e !== null && (e.alternate = null, t.alternate = null, t.flags |= dn);
    }
    function ju(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), UC(), tv(t.lanes), ca(a, t.childLanes) ? (Ub(e, t), t.child) : null;
    }
    function Ix(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= Pt) : s.push(e), a.flags |= dn, a;
      }
    }
    function XS(e, t) {
      var a = e.lanes;
      return !!ca(a, t);
    }
    function Yx(e, t, a) {
      switch (t.tag) {
        case K:
          JC(t), t.stateNode, zf();
          break;
        case ae:
          lC(t);
          break;
        case G: {
          var i = t.type;
          Wl(i) && Kh(t);
          break;
        }
        case ce:
          Yg(t, t.stateNode.containerInfo);
          break;
        case Le: {
          var u = t.memoizedProps.value, s = t.type._context;
          ZE(t, s, u);
          break;
        }
        case Ue:
          {
            var f = ca(a, t.childLanes);
            f && (t.flags |= ft);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case $: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Go(t, Hf(sl.current)), t.flags |= nt, null;
            var g = t.child, C = g.childLanes;
            if (ca(a, C))
              return t1(e, t, a);
            Go(t, Hf(sl.current));
            var D = ju(e, t, a);
            return D !== null ? D.sibling : null;
          } else
            Go(t, Hf(sl.current));
          break;
        }
        case Ot: {
          var _ = (e.flags & nt) !== Ie, U = ca(a, t.childLanes);
          if (_) {
            if (U)
              return i1(e, t, a);
            t.flags |= nt;
          }
          var P = t.memoizedState;
          if (P !== null && (P.rendering = null, P.tail = null, P.lastEffect = null), Go(t, sl.current), U)
            break;
          return null;
        }
        case Ye:
        case lt:
          return t.lanes = q, KC(e, t, a);
      }
      return ju(e, t, a);
    }
    function o1(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Ix(e, t, _0(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || Gh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          dl = !0;
        else {
          var s = XS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & nt) === Ie)
            return dl = !1, Yx(e, t, a);
          (e.flags & Rs) !== Ie ? dl = !0 : dl = !1;
        }
      } else if (dl = !1, Pr() && mb(t)) {
        var f = t.index, p = yb();
        UE(t, p, f);
      }
      switch (t.lanes = q, t.tag) {
        case me:
          return xx(e, t, t.type, a);
        case nn: {
          var v = t.elementType;
          return wx(e, t, v, a);
        }
        case Z: {
          var g = t.type, C = t.pendingProps, D = t.elementType === g ? C : fl(g, C);
          return BS(e, t, g, D, a);
        }
        case G: {
          var _ = t.type, U = t.pendingProps, P = t.elementType === _ ? U : fl(_, U);
          return ZC(e, t, _, P, a);
        }
        case K:
          return Cx(e, t, a);
        case ae:
          return Rx(e, t, a);
        case ge:
          return Tx(e, t);
        case $:
          return t1(e, t, a);
        case ce:
          return Vx(e, t, a);
        case Se: {
          var B = t.type, ye = t.pendingProps, Qe = t.elementType === B ? ye : fl(B, ye);
          return QC(e, t, B, Qe, a);
        }
        case Me:
          return gx(e, t, a);
        case $e:
          return Sx(e, t, a);
        case Ue:
          return Ex(e, t, a);
        case Le:
          return $x(e, t, a);
        case tt:
          return Bx(e, t, a);
        case Be: {
          var Pe = t.type, Dt = t.pendingProps, Rt = fl(Pe, Dt);
          if (t.type !== t.elementType) {
            var L = Pe.propTypes;
            L && ll(
              L,
              Rt,
              // Resolved for outer only
              "prop",
              bt(Pe)
            );
          }
          return Rt = fl(Pe.type, Rt), GC(e, t, Pe, Rt, a);
        }
        case pe:
          return qC(e, t, t.type, t.pendingProps, a);
        case En: {
          var I = t.type, N = t.pendingProps, ne = t.elementType === I ? N : fl(I, N);
          return bx(e, t, I, ne, a);
        }
        case Ot:
          return i1(e, t, a);
        case mn:
          break;
        case Ye:
          return KC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Wf(e) {
      e.flags |= ft;
    }
    function s1(e) {
      e.flags |= na, e.flags |= Dd;
    }
    var c1, ZS, f1, d1;
    c1 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ae || u.tag === ge)
          pw(e, u.stateNode);
        else if (u.tag !== ce) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, ZS = function(e, t) {
    }, f1 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = Wg(), v = hw(f, a, s, i, u, p);
        t.updateQueue = v, v && Wf(t);
      }
    }, d1 = function(e, t, a, i) {
      a !== i && Wf(t);
    };
    function Ip(e, t) {
      if (!Pr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function Vr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = q, i = Ie;
      if (t) {
        if ((e.mode & rt) !== Ae) {
          for (var v = e.selfBaseDuration, g = e.child; g !== null; )
            a = st(a, st(g.lanes, g.childLanes)), i |= g.subtreeFlags & cr, i |= g.flags & cr, v += g.treeBaseDuration, g = g.sibling;
          e.treeBaseDuration = v;
        } else
          for (var C = e.child; C !== null; )
            a = st(a, st(C.lanes, C.childLanes)), i |= C.subtreeFlags & cr, i |= C.flags & cr, C.return = e, C = C.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & rt) !== Ae) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = st(a, st(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = st(a, st(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Wx(e, t, a) {
      if (Ob() && (t.mode & je) !== Ae && (t.flags & nt) === Ie)
        return BE(t), zf(), t.flags |= On | wa | rr, !1;
      var i = tm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (kb(t), Vr(t), (t.mode & rt) !== Ae) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (zf(), (t.flags & nt) === Ie && (t.memoizedState = null), t.flags |= ft, Vr(t), (t.mode & rt) !== Ae) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return IE(), !0;
    }
    function p1(e, t, a) {
      var i = t.pendingProps;
      switch (wg(t), t.tag) {
        case me:
        case nn:
        case pe:
        case Z:
        case Se:
        case Me:
        case $e:
        case Ue:
        case tt:
        case Be:
          return Vr(t), null;
        case G: {
          var u = t.type;
          return Wl(u) && qh(t), Vr(t), null;
        }
        case K: {
          var s = t.stateNode;
          if (Pf(t), Eg(t), Xg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = tm(t);
            if (f)
              Wf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & On) !== Ie) && (t.flags |= Va, IE());
            }
          }
          return ZS(e, t), Vr(t), null;
        }
        case ae: {
          Qg(t);
          var v = iC(), g = t.type;
          if (e !== null && t.stateNode != null)
            f1(e, t, g, i, v), e.ref !== t.ref && s1(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Vr(t), null;
            }
            var C = Wg(), D = tm(t);
            if (D)
              xb(t, v, C) && Wf(t);
            else {
              var _ = dw(g, i, v, C, t);
              c1(_, t, !1, !1), t.stateNode = _, vw(_, g, i, v) && Wf(t);
            }
            t.ref !== null && s1(t);
          }
          return Vr(t), null;
        }
        case ge: {
          var U = i;
          if (e && t.stateNode != null) {
            var P = e.memoizedProps;
            d1(e, t, P, U);
          } else {
            if (typeof U != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var B = iC(), ye = Wg(), Qe = tm(t);
            Qe ? _b(t) && Wf(t) : t.stateNode = mw(U, B, ye, t);
          }
          return Vr(t), null;
        }
        case $: {
          Vf(t);
          var Pe = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Dt = Wx(e, t, Pe);
            if (!Dt)
              return t.flags & rr ? t : null;
          }
          if ((t.flags & nt) !== Ie)
            return t.lanes = a, (t.mode & rt) !== Ae && RS(t), t;
          var Rt = Pe !== null, L = e !== null && e.memoizedState !== null;
          if (Rt !== L && Rt) {
            var I = t.child;
            if (I.flags |= Al, (t.mode & je) !== Ae) {
              var N = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !O);
              N || Gg(sl.current, oC) ? Q_() : m0();
            }
          }
          var ne = t.updateQueue;
          if (ne !== null && (t.flags |= ft), Vr(t), (t.mode & rt) !== Ae && Rt) {
            var Te = t.child;
            Te !== null && (t.treeBaseDuration -= Te.treeBaseDuration);
          }
          return null;
        }
        case ce:
          return Pf(t), ZS(e, t), e === null && sb(t.stateNode.containerInfo), Vr(t), null;
        case Le:
          var Ee = t.type._context;
          return jg(Ee, t), Vr(t), null;
        case En: {
          var et = t.type;
          return Wl(et) && qh(t), Vr(t), null;
        }
        case Ot: {
          Vf(t);
          var ut = t.memoizedState;
          if (ut === null)
            return Vr(t), null;
          var Jt = (t.flags & nt) !== Ie, Ut = ut.rendering;
          if (Ut === null)
            if (Jt)
              Ip(ut, !1);
            else {
              var Xn = q_() && (e === null || (e.flags & nt) === Ie);
              if (!Xn)
                for (var Ft = t.child; Ft !== null; ) {
                  var Yn = ym(Ft);
                  if (Yn !== null) {
                    Jt = !0, t.flags |= nt, Ip(ut, !1);
                    var ha = Yn.updateQueue;
                    return ha !== null && (t.updateQueue = ha, t.flags |= ft), t.subtreeFlags = Ie, Fb(t, a), Go(t, qg(sl.current, Mp)), t.child;
                  }
                  Ft = Ft.sibling;
                }
              ut.tail !== null && bn() > A1() && (t.flags |= nt, Jt = !0, Ip(ut, !1), t.lanes = eh);
            }
          else {
            if (!Jt) {
              var Wr = ym(Ut);
              if (Wr !== null) {
                t.flags |= nt, Jt = !0;
                var gi = Wr.updateQueue;
                if (gi !== null && (t.updateQueue = gi, t.flags |= ft), Ip(ut, !0), ut.tail === null && ut.tailMode === "hidden" && !Ut.alternate && !Pr())
                  return Vr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              bn() * 2 - ut.renderingStartTime > A1() && a !== _r && (t.flags |= nt, Jt = !0, Ip(ut, !1), t.lanes = eh);
            }
            if (ut.isBackwards)
              Ut.sibling = t.child, t.child = Ut;
            else {
              var Na = ut.last;
              Na !== null ? Na.sibling = Ut : t.child = Ut, ut.last = Ut;
            }
          }
          if (ut.tail !== null) {
            var Aa = ut.tail;
            ut.rendering = Aa, ut.tail = Aa.sibling, ut.renderingStartTime = bn(), Aa.sibling = null;
            var ma = sl.current;
            return Jt ? ma = qg(ma, Mp) : ma = Hf(ma), Go(t, ma), Aa;
          }
          return Vr(t), null;
        }
        case mn:
          break;
        case Ye:
        case lt: {
          h0(t);
          var Bu = t.memoizedState, ed = Bu !== null;
          if (e !== null) {
            var lv = e.memoizedState, eu = lv !== null;
            eu !== ed && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !se && (t.flags |= Al);
          }
          return !ed || (t.mode & je) === Ae ? Vr(t) : ca(Jl, _r) && (Vr(t), t.subtreeFlags & (dn | ft) && (t.flags |= Al)), null;
        }
        case Lt:
          return null;
        case Tt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Qx(e, t, a) {
      switch (wg(t), t.tag) {
        case G: {
          var i = t.type;
          Wl(i) && qh(t);
          var u = t.flags;
          return u & rr ? (t.flags = u & ~rr | nt, (t.mode & rt) !== Ae && RS(t), t) : null;
        }
        case K: {
          t.stateNode, Pf(t), Eg(t), Xg();
          var s = t.flags;
          return (s & rr) !== Ie && (s & nt) === Ie ? (t.flags = s & ~rr | nt, t) : null;
        }
        case ae:
          return Qg(t), null;
        case $: {
          Vf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            zf();
          }
          var p = t.flags;
          return p & rr ? (t.flags = p & ~rr | nt, (t.mode & rt) !== Ae && RS(t), t) : null;
        }
        case Ot:
          return Vf(t), null;
        case ce:
          return Pf(t), null;
        case Le:
          var v = t.type._context;
          return jg(v, t), null;
        case Ye:
        case lt:
          return h0(t), null;
        case Lt:
          return null;
        default:
          return null;
      }
    }
    function v1(e, t, a) {
      switch (wg(t), t.tag) {
        case G: {
          var i = t.type.childContextTypes;
          i != null && qh(t);
          break;
        }
        case K: {
          t.stateNode, Pf(t), Eg(t), Xg();
          break;
        }
        case ae: {
          Qg(t);
          break;
        }
        case ce:
          Pf(t);
          break;
        case $:
          Vf(t);
          break;
        case Ot:
          Vf(t);
          break;
        case Le:
          var u = t.type._context;
          jg(u, t);
          break;
        case Ye:
        case lt:
          h0(t);
          break;
      }
    }
    var h1 = null;
    h1 = /* @__PURE__ */ new Set();
    var Vm = !1, $r = !1, Gx = typeof WeakSet == "function" ? WeakSet : Set, De = null, Qf = null, Gf = null;
    function qx(e) {
      vu(null, function() {
        throw e;
      }), _d();
    }
    var Kx = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & rt)
        try {
          Xl(), t.componentWillUnmount();
        } finally {
          Kl(e);
        }
      else
        t.componentWillUnmount();
    };
    function m1(e, t) {
      try {
        Xo(vr, e);
      } catch (a) {
        hn(e, t, a);
      }
    }
    function JS(e, t, a) {
      try {
        Kx(e, a);
      } catch (i) {
        hn(e, t, i);
      }
    }
    function Xx(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        hn(e, t, i);
      }
    }
    function y1(e, t) {
      try {
        S1(e);
      } catch (a) {
        hn(e, t, a);
      }
    }
    function qf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (ot && St && e.mode & rt)
              try {
                Xl(), i = a(null);
              } finally {
                Kl(e);
              }
            else
              i = a(null);
          } catch (u) {
            hn(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", at(e));
        } else
          a.current = null;
    }
    function $m(e, t, a) {
      try {
        a();
      } catch (i) {
        hn(e, t, i);
      }
    }
    var g1 = !1;
    function Zx(e, t) {
      cw(e.containerInfo), De = t, Jx();
      var a = g1;
      return g1 = !1, a;
    }
    function Jx() {
      for (; De !== null; ) {
        var e = De, t = e.child;
        (e.subtreeFlags & so) !== Ie && t !== null ? (t.return = e, De = t) : e_();
      }
    }
    function e_() {
      for (; De !== null; ) {
        var e = De;
        It(e);
        try {
          t_(e);
        } catch (a) {
          hn(e, e.return, a);
        }
        Dn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, De = t;
          return;
        }
        De = e.return;
      }
    }
    function t_(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Va) !== Ie) {
        switch (It(e), e.tag) {
          case Z:
          case Se:
          case pe:
            break;
          case G: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !rc && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : fl(e.type, i), u);
              {
                var p = h1;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", at(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case K: {
            {
              var v = e.stateNode;
              zw(v.containerInfo);
            }
            break;
          }
          case ae:
          case ge:
          case ce:
          case En:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Dn();
      }
    }
    function pl(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Hr) !== ti ? Xv(t) : (e & vr) !== ti && hi(t), (e & Ql) !== ti && rv(!0), $m(t, a, p), (e & Ql) !== ti && rv(!1), (e & Hr) !== ti ? Ac() : (e & vr) !== ti && vo());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Xo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Hr) !== ti ? Fl(t) : (e & vr) !== ti && Zv(t);
            var f = s.create;
            (e & Ql) !== ti && rv(!0), s.destroy = f(), (e & Ql) !== ti && rv(!1), (e & Hr) !== ti ? Nc() : (e & vr) !== ti && Ts();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & vr) !== Ie ? v = "useLayoutEffect" : (s.tag & Ql) !== Ie ? v = "useInsertionEffect" : v = "useEffect";
                var g = void 0;
                p === null ? g = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? g = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : g = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, g);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function n_(e, t) {
      if ((t.flags & ft) !== Ie)
        switch (t.tag) {
          case Ue: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = AC(), p = t.alternate === null ? "mount" : "update";
            NC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case K:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
                case Ue:
                  var C = v.stateNode;
                  C.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function r_(e, t, a, i) {
      if ((a.flags & br) !== Ie)
        switch (a.tag) {
          case Z:
          case Se:
          case pe: {
            if (!$r)
              if (a.mode & rt)
                try {
                  Xl(), Xo(vr | pr, a);
                } finally {
                  Kl(a);
                }
              else
                Xo(vr | pr, a);
            break;
          }
          case G: {
            var u = a.stateNode;
            if (a.flags & ft && !$r)
              if (t === null)
                if (a.type === a.elementType && !rc && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), a.mode & rt)
                  try {
                    Xl(), u.componentDidMount();
                  } finally {
                    Kl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : fl(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !rc && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), a.mode & rt)
                  try {
                    Xl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Kl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !rc && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), aC(a, p, u));
            break;
          }
          case K: {
            var v = a.updateQueue;
            if (v !== null) {
              var g = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ae:
                    g = a.child.stateNode;
                    break;
                  case G:
                    g = a.child.stateNode;
                    break;
                }
              aC(a, v, g);
            }
            break;
          }
          case ae: {
            var C = a.stateNode;
            if (t === null && a.flags & ft) {
              var D = a.type, _ = a.memoizedProps;
              Cw(C, D, _);
            }
            break;
          }
          case ge:
            break;
          case ce:
            break;
          case Ue: {
            {
              var U = a.memoizedProps, P = U.onCommit, B = U.onRender, ye = a.stateNode.effectDuration, Qe = AC(), Pe = t === null ? "mount" : "update";
              NC() && (Pe = "nested-update"), typeof B == "function" && B(a.memoizedProps.id, Pe, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Qe);
              {
                typeof P == "function" && P(a.memoizedProps.id, Pe, ye, Qe), ek(a);
                var Dt = a.return;
                e: for (; Dt !== null; ) {
                  switch (Dt.tag) {
                    case K:
                      var Rt = Dt.stateNode;
                      Rt.effectDuration += ye;
                      break e;
                    case Ue:
                      var L = Dt.stateNode;
                      L.effectDuration += ye;
                      break e;
                  }
                  Dt = Dt.return;
                }
              }
            }
            break;
          }
          case $: {
            f_(e, a);
            break;
          }
          case Ot:
          case En:
          case mn:
          case Ye:
          case lt:
          case Tt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      $r || a.flags & na && S1(a);
    }
    function a_(e) {
      switch (e.tag) {
        case Z:
        case Se:
        case pe: {
          if (e.mode & rt)
            try {
              Xl(), m1(e, e.return);
            } finally {
              Kl(e);
            }
          else
            m1(e, e.return);
          break;
        }
        case G: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Xx(e, e.return, t), y1(e, e.return);
          break;
        }
        case ae: {
          y1(e, e.return);
          break;
        }
      }
    }
    function i_(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ae) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? Mw(u) : Nw(i.stateNode, i.memoizedProps);
            } catch (f) {
              hn(e, e.return, f);
            }
          }
        } else if (i.tag === ge) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? Lw(s) : Aw(s, i.memoizedProps);
            } catch (f) {
              hn(e, e.return, f);
            }
        } else if (!((i.tag === Ye || i.tag === lt) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function S1(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ae:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & rt)
            try {
              Xl(), u = t(i);
            } finally {
              Kl(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", at(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", at(e)), t.current = i;
      }
    }
    function l_(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function E1(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, E1(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ae) {
          var a = e.stateNode;
          a !== null && db(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function u_(e) {
      for (var t = e.return; t !== null; ) {
        if (C1(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function C1(e) {
      return e.tag === ae || e.tag === K || e.tag === ce;
    }
    function R1(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || C1(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ae && t.tag !== ge && t.tag !== Ht; ) {
          if (t.flags & dn || t.child === null || t.tag === ce)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & dn))
          return t.stateNode;
      }
    }
    function o_(e) {
      var t = u_(e);
      switch (t.tag) {
        case ae: {
          var a = t.stateNode;
          t.flags & Yt && (wE(a), t.flags &= ~Yt);
          var i = R1(e);
          t0(e, i, a);
          break;
        }
        case K:
        case ce: {
          var u = t.stateNode.containerInfo, s = R1(e);
          e0(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function e0(e, t, a) {
      var i = e.tag, u = i === ae || i === ge;
      if (u) {
        var s = e.stateNode;
        t ? _w(a, s, t) : bw(a, s);
      } else if (i !== ce) {
        var f = e.child;
        if (f !== null) {
          e0(f, t, a);
          for (var p = f.sibling; p !== null; )
            e0(p, t, a), p = p.sibling;
        }
      }
    }
    function t0(e, t, a) {
      var i = e.tag, u = i === ae || i === ge;
      if (u) {
        var s = e.stateNode;
        t ? xw(a, s, t) : ww(a, s);
      } else if (i !== ce) {
        var f = e.child;
        if (f !== null) {
          t0(f, t, a);
          for (var p = f.sibling; p !== null; )
            t0(p, t, a), p = p.sibling;
        }
      }
    }
    var Br = null, vl = !1;
    function s_(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ae: {
              Br = i.stateNode, vl = !1;
              break e;
            }
            case K: {
              Br = i.stateNode.containerInfo, vl = !0;
              break e;
            }
            case ce: {
              Br = i.stateNode.containerInfo, vl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Br === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        T1(e, t, a), Br = null, vl = !1;
      }
      l_(a);
    }
    function Zo(e, t, a) {
      for (var i = a.child; i !== null; )
        T1(e, t, i), i = i.sibling;
    }
    function T1(e, t, a) {
      switch (yu(a), a.tag) {
        case ae:
          $r || qf(a, t);
        case ge: {
          {
            var i = Br, u = vl;
            Br = null, Zo(e, t, a), Br = i, vl = u, Br !== null && (vl ? Dw(Br, a.stateNode) : kw(Br, a.stateNode));
          }
          return;
        }
        case Ht: {
          Br !== null && (vl ? Ow(Br, a.stateNode) : dg(Br, a.stateNode));
          return;
        }
        case ce: {
          {
            var s = Br, f = vl;
            Br = a.stateNode.containerInfo, vl = !0, Zo(e, t, a), Br = s, vl = f;
          }
          return;
        }
        case Z:
        case Se:
        case Be:
        case pe: {
          if (!$r) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var g = v.next, C = g;
                do {
                  var D = C, _ = D.destroy, U = D.tag;
                  _ !== void 0 && ((U & Ql) !== ti ? $m(a, t, _) : (U & vr) !== ti && (hi(a), a.mode & rt ? (Xl(), $m(a, t, _), Kl(a)) : $m(a, t, _), vo())), C = C.next;
                } while (C !== g);
              }
            }
          }
          Zo(e, t, a);
          return;
        }
        case G: {
          if (!$r) {
            qf(a, t);
            var P = a.stateNode;
            typeof P.componentWillUnmount == "function" && JS(a, t, P);
          }
          Zo(e, t, a);
          return;
        }
        case mn: {
          Zo(e, t, a);
          return;
        }
        case Ye: {
          if (
            // TODO: Remove this dead flag
            a.mode & je
          ) {
            var B = $r;
            $r = B || a.memoizedState !== null, Zo(e, t, a), $r = B;
          } else
            Zo(e, t, a);
          break;
        }
        default: {
          Zo(e, t, a);
          return;
        }
      }
    }
    function c_(e) {
      e.memoizedState;
    }
    function f_(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && qw(s);
          }
        }
      }
    }
    function w1(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Gx()), t.forEach(function(i) {
          var u = uk.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), _a)
              if (Qf !== null && Gf !== null)
                nv(Gf, Qf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function d_(e, t, a) {
      Qf = a, Gf = e, It(t), b1(t, e), It(t), Qf = null, Gf = null;
    }
    function hl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            s_(e, t, s);
          } catch (v) {
            hn(s, t, v);
          }
        }
      var f = fc();
      if (t.subtreeFlags & ia)
        for (var p = t.child; p !== null; )
          It(p), b1(p, e), p = p.sibling;
      It(f);
    }
    function b1(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case Z:
        case Se:
        case Be:
        case pe: {
          if (hl(t, e), Zl(e), u & ft) {
            try {
              pl(Ql | pr, e, e.return), Xo(Ql | pr, e);
            } catch (et) {
              hn(e, e.return, et);
            }
            if (e.mode & rt) {
              try {
                Xl(), pl(vr | pr, e, e.return);
              } catch (et) {
                hn(e, e.return, et);
              }
              Kl(e);
            } else
              try {
                pl(vr | pr, e, e.return);
              } catch (et) {
                hn(e, e.return, et);
              }
          }
          return;
        }
        case G: {
          hl(t, e), Zl(e), u & na && i !== null && qf(i, i.return);
          return;
        }
        case ae: {
          hl(t, e), Zl(e), u & na && i !== null && qf(i, i.return);
          {
            if (e.flags & Yt) {
              var s = e.stateNode;
              try {
                wE(s);
              } catch (et) {
                hn(e, e.return, et);
              }
            }
            if (u & ft) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, g = e.type, C = e.updateQueue;
                if (e.updateQueue = null, C !== null)
                  try {
                    Rw(f, C, g, v, p, e);
                  } catch (et) {
                    hn(e, e.return, et);
                  }
              }
            }
          }
          return;
        }
        case ge: {
          if (hl(t, e), Zl(e), u & ft) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var D = e.stateNode, _ = e.memoizedProps, U = i !== null ? i.memoizedProps : _;
            try {
              Tw(D, U, _);
            } catch (et) {
              hn(e, e.return, et);
            }
          }
          return;
        }
        case K: {
          if (hl(t, e), Zl(e), u & ft && i !== null) {
            var P = i.memoizedState;
            if (P.isDehydrated)
              try {
                Gw(t.containerInfo);
              } catch (et) {
                hn(e, e.return, et);
              }
          }
          return;
        }
        case ce: {
          hl(t, e), Zl(e);
          return;
        }
        case $: {
          hl(t, e), Zl(e);
          var B = e.child;
          if (B.flags & Al) {
            var ye = B.stateNode, Qe = B.memoizedState, Pe = Qe !== null;
            if (ye.isHidden = Pe, Pe) {
              var Dt = B.alternate !== null && B.alternate.memoizedState !== null;
              Dt || W_();
            }
          }
          if (u & ft) {
            try {
              c_(e);
            } catch (et) {
              hn(e, e.return, et);
            }
            w1(e);
          }
          return;
        }
        case Ye: {
          var Rt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & je
          ) {
            var L = $r;
            $r = L || Rt, hl(t, e), $r = L;
          } else
            hl(t, e);
          if (Zl(e), u & Al) {
            var I = e.stateNode, N = e.memoizedState, ne = N !== null, Te = e;
            if (I.isHidden = ne, ne && !Rt && (Te.mode & je) !== Ae) {
              De = Te;
              for (var Ee = Te.child; Ee !== null; )
                De = Ee, v_(Ee), Ee = Ee.sibling;
            }
            i_(Te, ne);
          }
          return;
        }
        case Ot: {
          hl(t, e), Zl(e), u & ft && w1(e);
          return;
        }
        case mn:
          return;
        default: {
          hl(t, e), Zl(e);
          return;
        }
      }
    }
    function Zl(e) {
      var t = e.flags;
      if (t & dn) {
        try {
          o_(e);
        } catch (a) {
          hn(e, e.return, a);
        }
        e.flags &= ~dn;
      }
      t & $a && (e.flags &= ~$a);
    }
    function p_(e, t, a) {
      Qf = a, Gf = t, De = e, x1(e, t, a), Qf = null, Gf = null;
    }
    function x1(e, t, a) {
      for (var i = (e.mode & je) !== Ae; De !== null; ) {
        var u = De, s = u.child;
        if (u.tag === Ye && i) {
          var f = u.memoizedState !== null, p = f || Vm;
          if (p) {
            n0(e, t, a);
            continue;
          } else {
            var v = u.alternate, g = v !== null && v.memoizedState !== null, C = g || $r, D = Vm, _ = $r;
            Vm = p, $r = C, $r && !_ && (De = u, h_(u));
            for (var U = s; U !== null; )
              De = U, x1(
                U,
                // New root; bubble back up to here and stop.
                t,
                a
              ), U = U.sibling;
            De = u, Vm = D, $r = _, n0(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & br) !== Ie && s !== null ? (s.return = u, De = s) : n0(e, t, a);
      }
    }
    function n0(e, t, a) {
      for (; De !== null; ) {
        var i = De;
        if ((i.flags & br) !== Ie) {
          var u = i.alternate;
          It(i);
          try {
            r_(t, u, i, a);
          } catch (f) {
            hn(i, i.return, f);
          }
          Dn();
        }
        if (i === e) {
          De = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, De = s;
          return;
        }
        De = i.return;
      }
    }
    function v_(e) {
      for (; De !== null; ) {
        var t = De, a = t.child;
        switch (t.tag) {
          case Z:
          case Se:
          case Be:
          case pe: {
            if (t.mode & rt)
              try {
                Xl(), pl(vr, t, t.return);
              } finally {
                Kl(t);
              }
            else
              pl(vr, t, t.return);
            break;
          }
          case G: {
            qf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && JS(t, t.return, i);
            break;
          }
          case ae: {
            qf(t, t.return);
            break;
          }
          case Ye: {
            var u = t.memoizedState !== null;
            if (u) {
              _1(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, De = a) : _1(e);
      }
    }
    function _1(e) {
      for (; De !== null; ) {
        var t = De;
        if (t === e) {
          De = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, De = a;
          return;
        }
        De = t.return;
      }
    }
    function h_(e) {
      for (; De !== null; ) {
        var t = De, a = t.child;
        if (t.tag === Ye) {
          var i = t.memoizedState !== null;
          if (i) {
            k1(e);
            continue;
          }
        }
        a !== null ? (a.return = t, De = a) : k1(e);
      }
    }
    function k1(e) {
      for (; De !== null; ) {
        var t = De;
        It(t);
        try {
          a_(t);
        } catch (i) {
          hn(t, t.return, i);
        }
        if (Dn(), t === e) {
          De = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, De = a;
          return;
        }
        De = t.return;
      }
    }
    function m_(e, t, a, i) {
      De = t, y_(t, e, a, i);
    }
    function y_(e, t, a, i) {
      for (; De !== null; ) {
        var u = De, s = u.child;
        (u.subtreeFlags & Ba) !== Ie && s !== null ? (s.return = u, De = s) : g_(e, t, a, i);
      }
    }
    function g_(e, t, a, i) {
      for (; De !== null; ) {
        var u = De;
        if ((u.flags & yn) !== Ie) {
          It(u);
          try {
            S_(t, u, a, i);
          } catch (f) {
            hn(u, u.return, f);
          }
          Dn();
        }
        if (u === e) {
          De = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, De = s;
          return;
        }
        De = u.return;
      }
    }
    function S_(e, t, a, i) {
      switch (t.tag) {
        case Z:
        case Se:
        case pe: {
          if (t.mode & rt) {
            CS();
            try {
              Xo(Hr | pr, t);
            } finally {
              ES(t);
            }
          } else
            Xo(Hr | pr, t);
          break;
        }
      }
    }
    function E_(e) {
      De = e, C_();
    }
    function C_() {
      for (; De !== null; ) {
        var e = De, t = e.child;
        if ((De.flags & Pt) !== Ie) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              De = u, w_(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            De = e;
          }
        }
        (e.subtreeFlags & Ba) !== Ie && t !== null ? (t.return = e, De = t) : R_();
      }
    }
    function R_() {
      for (; De !== null; ) {
        var e = De;
        (e.flags & yn) !== Ie && (It(e), T_(e), Dn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, De = t;
          return;
        }
        De = e.return;
      }
    }
    function T_(e) {
      switch (e.tag) {
        case Z:
        case Se:
        case pe: {
          e.mode & rt ? (CS(), pl(Hr | pr, e, e.return), ES(e)) : pl(Hr | pr, e, e.return);
          break;
        }
      }
    }
    function w_(e, t) {
      for (; De !== null; ) {
        var a = De;
        It(a), x_(a, t), Dn();
        var i = a.child;
        i !== null ? (i.return = a, De = i) : b_(e);
      }
    }
    function b_(e) {
      for (; De !== null; ) {
        var t = De, a = t.sibling, i = t.return;
        if (E1(t), t === e) {
          De = null;
          return;
        }
        if (a !== null) {
          a.return = i, De = a;
          return;
        }
        De = i;
      }
    }
    function x_(e, t) {
      switch (e.tag) {
        case Z:
        case Se:
        case pe: {
          e.mode & rt ? (CS(), pl(Hr, e, t), ES(e)) : pl(Hr, e, t);
          break;
        }
      }
    }
    function __(e) {
      switch (e.tag) {
        case Z:
        case Se:
        case pe: {
          try {
            Xo(vr | pr, e);
          } catch (a) {
            hn(e, e.return, a);
          }
          break;
        }
        case G: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            hn(e, e.return, a);
          }
          break;
        }
      }
    }
    function k_(e) {
      switch (e.tag) {
        case Z:
        case Se:
        case pe: {
          try {
            Xo(Hr | pr, e);
          } catch (t) {
            hn(e, e.return, t);
          }
          break;
        }
      }
    }
    function D_(e) {
      switch (e.tag) {
        case Z:
        case Se:
        case pe: {
          try {
            pl(vr | pr, e, e.return);
          } catch (a) {
            hn(e, e.return, a);
          }
          break;
        }
        case G: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && JS(e, e.return, t);
          break;
        }
      }
    }
    function O_(e) {
      switch (e.tag) {
        case Z:
        case Se:
        case pe:
          try {
            pl(Hr | pr, e, e.return);
          } catch (t) {
            hn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Yp = Symbol.for;
      Yp("selector.component"), Yp("selector.has_pseudo_class"), Yp("selector.role"), Yp("selector.test_id"), Yp("selector.text");
    }
    var M_ = [];
    function L_() {
      M_.forEach(function(e) {
        return e();
      });
    }
    var N_ = R.ReactCurrentActQueue;
    function A_(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function D1() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && N_.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var z_ = Math.ceil, r0 = R.ReactCurrentDispatcher, a0 = R.ReactCurrentOwner, Ir = R.ReactCurrentBatchConfig, ml = R.ReactCurrentActQueue, yr = (
      /*             */
      0
    ), O1 = (
      /*               */
      1
    ), Yr = (
      /*                */
      2
    ), Pi = (
      /*                */
      4
    ), Pu = 0, Wp = 1, ac = 2, Bm = 3, Qp = 4, M1 = 5, i0 = 6, kt = yr, Ma = null, Pn = null, gr = q, Jl = q, l0 = $o(q), Sr = Pu, Gp = null, Im = q, qp = q, Ym = q, Kp = null, ni = null, u0 = 0, L1 = 500, N1 = 1 / 0, U_ = 500, Hu = null;
    function Xp() {
      N1 = bn() + U_;
    }
    function A1() {
      return N1;
    }
    var Wm = !1, o0 = null, Kf = null, ic = !1, Jo = null, Zp = q, s0 = [], c0 = null, F_ = 50, Jp = 0, f0 = null, d0 = !1, Qm = !1, j_ = 50, Xf = 0, Gm = null, ev = cn, qm = q, z1 = !1;
    function Km() {
      return Ma;
    }
    function La() {
      return (kt & (Yr | Pi)) !== yr ? bn() : (ev !== cn || (ev = bn()), ev);
    }
    function es(e) {
      var t = e.mode;
      if ((t & je) === Ae)
        return Ve;
      if ((kt & Yr) !== yr && gr !== q)
        return To(gr);
      var a = Nb() !== Lb;
      if (a) {
        if (Ir.transition !== null) {
          var i = Ir.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return qm === In && (qm = oh()), qm;
      }
      var u = Ga();
      if (u !== In)
        return u;
      var s = yw();
      return s;
    }
    function P_(e) {
      var t = e.mode;
      return (t & je) === Ae ? Ve : sa();
    }
    function Er(e, t, a, i) {
      sk(), z1 && S("useInsertionEffect must not schedule updates."), d0 && (Qm = !0), bu(e, a, i), (kt & Yr) !== q && e === Ma ? dk(t) : (_a && rf(e, t, a), pk(t), e === Ma && ((kt & Yr) === yr && (qp = st(qp, a)), Sr === Qp && ts(e, gr)), ri(e, i), a === Ve && kt === yr && (t.mode & je) === Ae && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !ml.isBatchingLegacy && (Xp(), zE()));
    }
    function H_(e, t, a) {
      var i = e.current;
      i.lanes = t, bu(e, t, a), ri(e, a);
    }
    function V_(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (kt & Yr) !== yr
      );
    }
    function ri(e, t) {
      var a = e.callbackNode;
      rh(e, t);
      var i = Tu(e, e === Ma ? gr : q);
      if (i === q) {
        a !== null && X1(a), e.callbackNode = null, e.callbackPriority = In;
        return;
      }
      var u = Un(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(ml.current !== null && a !== S0)) {
        a == null && s !== Ve && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && X1(a);
      var f;
      if (u === Ve)
        e.tag === Bo ? (ml.isBatchingLegacy !== null && (ml.didScheduleLegacyUpdate = !0), hb(j1.bind(null, e))) : AE(j1.bind(null, e)), ml.current !== null ? ml.current.push(Io) : Sw(function() {
          (kt & (Yr | Pi)) === yr && Io();
        }), f = null;
      else {
        var p;
        switch (dr(i)) {
          case Fn:
            p = Oc;
            break;
          case nl:
            p = mu;
            break;
          case Oi:
            p = Di;
            break;
          case wo:
            p = Mc;
            break;
          default:
            p = Di;
            break;
        }
        f = E0(p, U1.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function U1(e, t) {
      if (ix(), ev = cn, qm = q, (kt & (Yr | Pi)) !== yr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = $u();
      if (i && e.callbackNode !== a)
        return null;
      var u = Tu(e, e === Ma ? gr : q);
      if (u === q)
        return null;
      var s = !Ms(e, u) && !uh(e, u) && !t, f = s ? X_(e, u) : Zm(e, u);
      if (f !== Pu) {
        if (f === ac) {
          var p = Pl(e);
          p !== q && (u = p, f = p0(e, p));
        }
        if (f === Wp) {
          var v = Gp;
          throw lc(e, q), ts(e, u), ri(e, bn()), v;
        }
        if (f === i0)
          ts(e, u);
        else {
          var g = !Ms(e, u), C = e.current.alternate;
          if (g && !B_(C)) {
            if (f = Zm(e, u), f === ac) {
              var D = Pl(e);
              D !== q && (u = D, f = p0(e, D));
            }
            if (f === Wp) {
              var _ = Gp;
              throw lc(e, q), ts(e, u), ri(e, bn()), _;
            }
          }
          e.finishedWork = C, e.finishedLanes = u, $_(e, f, u);
        }
      }
      return ri(e, bn()), e.callbackNode === a ? U1.bind(null, e) : null;
    }
    function p0(e, t) {
      var a = Kp;
      if (af(e)) {
        var i = lc(e, t);
        i.flags |= On, ob(e.containerInfo);
      }
      var u = Zm(e, t);
      if (u !== ac) {
        var s = ni;
        ni = a, s !== null && F1(s);
      }
      return u;
    }
    function F1(e) {
      ni === null ? ni = e : ni.push.apply(ni, e);
    }
    function $_(e, t, a) {
      switch (t) {
        case Pu:
        case Wp:
          throw new Error("Root did not complete. This is a bug in React.");
        case ac: {
          uc(e, ni, Hu);
          break;
        }
        case Bm: {
          if (ts(e, a), ah(a) && // do not delay if we're inside an act() scope
          !Z1()) {
            var i = u0 + L1 - bn();
            if (i > 10) {
              var u = Tu(e, q);
              if (u !== q)
                break;
              var s = e.suspendedLanes;
              if (!wu(s, a)) {
                La(), tf(e, s);
                break;
              }
              e.timeoutHandle = cg(uc.bind(null, e, ni, Hu), i);
              break;
            }
          }
          uc(e, ni, Hu);
          break;
        }
        case Qp: {
          if (ts(e, a), lh(a))
            break;
          if (!Z1()) {
            var f = th(e, a), p = f, v = bn() - p, g = ok(v) - v;
            if (g > 10) {
              e.timeoutHandle = cg(uc.bind(null, e, ni, Hu), g);
              break;
            }
          }
          uc(e, ni, Hu);
          break;
        }
        case M1: {
          uc(e, ni, Hu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function B_(e) {
      for (var t = e; ; ) {
        if (t.flags & Cs) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!ke(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & Cs && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function ts(e, t) {
      t = Ls(t, Ym), t = Ls(t, qp), ch(e, t);
    }
    function j1(e) {
      if (lx(), (kt & (Yr | Pi)) !== yr)
        throw new Error("Should not already be working.");
      $u();
      var t = Tu(e, q);
      if (!ca(t, Ve))
        return ri(e, bn()), null;
      var a = Zm(e, t);
      if (e.tag !== Bo && a === ac) {
        var i = Pl(e);
        i !== q && (t = i, a = p0(e, i));
      }
      if (a === Wp) {
        var u = Gp;
        throw lc(e, q), ts(e, t), ri(e, bn()), u;
      }
      if (a === i0)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, uc(e, ni, Hu), ri(e, bn()), null;
    }
    function I_(e, t) {
      t !== q && (Id(e, st(t, Ve)), ri(e, bn()), (kt & (Yr | Pi)) === yr && (Xp(), Io()));
    }
    function v0(e, t) {
      var a = kt;
      kt |= O1;
      try {
        return e(t);
      } finally {
        kt = a, kt === yr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !ml.isBatchingLegacy && (Xp(), zE());
      }
    }
    function Y_(e, t, a, i, u) {
      var s = Ga(), f = Ir.transition;
      try {
        return Ir.transition = null, Mn(Fn), e(t, a, i, u);
      } finally {
        Mn(s), Ir.transition = f, kt === yr && Xp();
      }
    }
    function Vu(e) {
      Jo !== null && Jo.tag === Bo && (kt & (Yr | Pi)) === yr && $u();
      var t = kt;
      kt |= O1;
      var a = Ir.transition, i = Ga();
      try {
        return Ir.transition = null, Mn(Fn), e ? e() : void 0;
      } finally {
        Mn(i), Ir.transition = a, kt = t, (kt & (Yr | Pi)) === yr && Io();
      }
    }
    function P1() {
      return (kt & (Yr | Pi)) !== yr;
    }
    function Xm(e, t) {
      pa(l0, Jl, e), Jl = st(Jl, t);
    }
    function h0(e) {
      Jl = l0.current, da(l0, e);
    }
    function lc(e, t) {
      e.finishedWork = null, e.finishedLanes = q;
      var a = e.timeoutHandle;
      if (a !== fg && (e.timeoutHandle = fg, gw(a)), Pn !== null)
        for (var i = Pn.return; i !== null; ) {
          var u = i.alternate;
          v1(u, i), i = i.return;
        }
      Ma = e;
      var s = oc(e.current, null);
      return Pn = s, gr = Jl = t, Sr = Pu, Gp = null, Im = q, qp = q, Ym = q, Kp = null, ni = null, Hb(), ol.discardPendingWarnings(), s;
    }
    function H1(e, t) {
      do {
        var a = Pn;
        try {
          if (um(), cC(), Dn(), a0.current = null, a === null || a.return === null) {
            Sr = Wp, Gp = t, Pn = null;
            return;
          }
          if (ot && a.mode & rt && Um(a, !0), ct)
            if (ua(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              gu(a, i, gr);
            } else
              ws(a, t, gr);
          hx(e, a.return, a, t, gr), I1(a);
        } catch (u) {
          t = u, Pn === a && a !== null ? (a = a.return, Pn = a) : a = Pn;
          continue;
        }
        return;
      } while (!0);
    }
    function V1() {
      var e = r0.current;
      return r0.current = Mm, e === null ? Mm : e;
    }
    function $1(e) {
      r0.current = e;
    }
    function W_() {
      u0 = bn();
    }
    function tv(e) {
      Im = st(e, Im);
    }
    function Q_() {
      Sr === Pu && (Sr = Bm);
    }
    function m0() {
      (Sr === Pu || Sr === Bm || Sr === ac) && (Sr = Qp), Ma !== null && (Os(Im) || Os(qp)) && ts(Ma, gr);
    }
    function G_(e) {
      Sr !== Qp && (Sr = ac), Kp === null ? Kp = [e] : Kp.push(e);
    }
    function q_() {
      return Sr === Pu;
    }
    function Zm(e, t) {
      var a = kt;
      kt |= Yr;
      var i = V1();
      if (Ma !== e || gr !== t) {
        if (_a) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (nv(e, gr), u.clear()), Yd(e, t);
        }
        Hu = As(), lc(e, t);
      }
      gn(t);
      do
        try {
          K_();
          break;
        } catch (s) {
          H1(e, s);
        }
      while (!0);
      if (um(), kt = a, $1(i), Pn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Uc(), Ma = null, gr = q, Sr;
    }
    function K_() {
      for (; Pn !== null; )
        B1(Pn);
    }
    function X_(e, t) {
      var a = kt;
      kt |= Yr;
      var i = V1();
      if (Ma !== e || gr !== t) {
        if (_a) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (nv(e, gr), u.clear()), Yd(e, t);
        }
        Hu = As(), Xp(), lc(e, t);
      }
      gn(t);
      do
        try {
          Z_();
          break;
        } catch (s) {
          H1(e, s);
        }
      while (!0);
      return um(), $1(i), kt = a, Pn !== null ? (zc(), Pu) : (Uc(), Ma = null, gr = q, Sr);
    }
    function Z_() {
      for (; Pn !== null && !Dc(); )
        B1(Pn);
    }
    function B1(e) {
      var t = e.alternate;
      It(e);
      var a;
      (e.mode & rt) !== Ae ? (SS(e), a = y0(t, e, Jl), Um(e, !0)) : a = y0(t, e, Jl), Dn(), e.memoizedProps = e.pendingProps, a === null ? I1(e) : Pn = a, a0.current = null;
    }
    function I1(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & wa) === Ie) {
          It(t);
          var u = void 0;
          if ((t.mode & rt) === Ae ? u = p1(a, t, Jl) : (SS(t), u = p1(a, t, Jl), Um(t, !1)), Dn(), u !== null) {
            Pn = u;
            return;
          }
        } else {
          var s = Qx(a, t);
          if (s !== null) {
            s.flags &= Iv, Pn = s;
            return;
          }
          if ((t.mode & rt) !== Ae) {
            Um(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= wa, i.subtreeFlags = Ie, i.deletions = null;
          else {
            Sr = i0, Pn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          Pn = v;
          return;
        }
        t = i, Pn = t;
      } while (t !== null);
      Sr === Pu && (Sr = M1);
    }
    function uc(e, t, a) {
      var i = Ga(), u = Ir.transition;
      try {
        Ir.transition = null, Mn(Fn), J_(e, t, a, i);
      } finally {
        Ir.transition = u, Mn(i);
      }
      return null;
    }
    function J_(e, t, a, i) {
      do
        $u();
      while (Jo !== null);
      if (ck(), (kt & (Yr | Pi)) !== yr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ul(s), u === null)
        return Lc(), null;
      if (s === q && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = q, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = In;
      var f = st(u.lanes, u.childLanes);
      nf(e, f), e === Ma && (Ma = null, Pn = null, gr = q), ((u.subtreeFlags & Ba) !== Ie || (u.flags & Ba) !== Ie) && (ic || (ic = !0, c0 = a, E0(Di, function() {
        return $u(), null;
      })));
      var p = (u.subtreeFlags & (so | ia | br | Ba)) !== Ie, v = (u.flags & (so | ia | br | Ba)) !== Ie;
      if (p || v) {
        var g = Ir.transition;
        Ir.transition = null;
        var C = Ga();
        Mn(Fn);
        var D = kt;
        kt |= Pi, a0.current = null, Zx(e, u), zC(), d_(e, u, s), fw(e.containerInfo), e.current = u, Ud(s), p_(u, e, s), ho(), Qv(), kt = D, Mn(C), Ir.transition = g;
      } else
        e.current = u, zC();
      var _ = ic;
      if (ic ? (ic = !1, Jo = e, Zp = s) : (Xf = 0, Gm = null), f = e.pendingLanes, f === q && (Kf = null), _ || G1(e.current, !1), fo(u.stateNode, i), _a && e.memoizedUpdaters.clear(), L_(), ri(e, bn()), t !== null)
        for (var U = e.onRecoverableError, P = 0; P < t.length; P++) {
          var B = t[P], ye = B.stack, Qe = B.digest;
          U(B.value, {
            componentStack: ye,
            digest: Qe
          });
        }
      if (Wm) {
        Wm = !1;
        var Pe = o0;
        throw o0 = null, Pe;
      }
      return ca(Zp, Ve) && e.tag !== Bo && $u(), f = e.pendingLanes, ca(f, Ve) ? (ax(), e === f0 ? Jp++ : (Jp = 0, f0 = e)) : Jp = 0, Io(), Lc(), null;
    }
    function $u() {
      if (Jo !== null) {
        var e = dr(Zp), t = zy(Oi, e), a = Ir.transition, i = Ga();
        try {
          return Ir.transition = null, Mn(t), tk();
        } finally {
          Mn(i), Ir.transition = a;
        }
      }
      return !1;
    }
    function ek(e) {
      s0.push(e), ic || (ic = !0, E0(Di, function() {
        return $u(), null;
      }));
    }
    function tk() {
      if (Jo === null)
        return !1;
      var e = c0;
      c0 = null;
      var t = Jo, a = Zp;
      if (Jo = null, Zp = q, (kt & (Yr | Pi)) !== yr)
        throw new Error("Cannot flush passive effects while already rendering.");
      d0 = !0, Qm = !1, Jv(a);
      var i = kt;
      kt |= Pi, E_(t.current), m_(t, t.current, a, e);
      {
        var u = s0;
        s0 = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          n_(t, f);
        }
      }
      Fd(), G1(t.current, !0), kt = i, Io(), Qm ? t === Gm ? Xf++ : (Xf = 0, Gm = t) : Xf = 0, d0 = !1, Qm = !1, Wa(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function Y1(e) {
      return Kf !== null && Kf.has(e);
    }
    function nk(e) {
      Kf === null ? Kf = /* @__PURE__ */ new Set([e]) : Kf.add(e);
    }
    function rk(e) {
      Wm || (Wm = !0, o0 = e);
    }
    var ak = rk;
    function W1(e, t, a) {
      var i = nc(a, t), u = BC(e, i, Ve), s = Wo(e, u, Ve), f = La();
      s !== null && (bu(s, Ve, f), ri(s, f));
    }
    function hn(e, t, a) {
      if (qx(a), rv(!1), e.tag === K) {
        W1(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === K) {
          W1(i, e, a);
          return;
        } else if (i.tag === G) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !Y1(s)) {
            var f = nc(a, e), p = FS(i, f, Ve), v = Wo(i, p, Ve), g = La();
            v !== null && (bu(v, Ve, g), ri(v, g));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function ik(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = La();
      tf(e, a), vk(e), Ma === e && wu(gr, a) && (Sr === Qp || Sr === Bm && ah(gr) && bn() - u0 < L1 ? lc(e, q) : Ym = st(Ym, a)), ri(e, u);
    }
    function Q1(e, t) {
      t === In && (t = P_(e));
      var a = La(), i = ei(e, t);
      i !== null && (bu(i, t, a), ri(i, a));
    }
    function lk(e) {
      var t = e.memoizedState, a = In;
      t !== null && (a = t.retryLane), Q1(e, a);
    }
    function uk(e, t) {
      var a = In, i;
      switch (e.tag) {
        case $:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case Ot:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), Q1(e, a);
    }
    function ok(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : z_(e / 1960) * 1960;
    }
    function sk() {
      if (Jp > F_)
        throw Jp = 0, f0 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Xf > j_ && (Xf = 0, Gm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function ck() {
      ol.flushLegacyContextWarning(), ol.flushPendingUnsafeLifecycleWarnings();
    }
    function G1(e, t) {
      It(e), Jm(e, aa, D_), t && Jm(e, hu, O_), Jm(e, aa, __), t && Jm(e, hu, k_), Dn();
    }
    function Jm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== Ie ? i = i.child : ((i.flags & t) !== Ie && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var ey = null;
    function q1(e) {
      {
        if ((kt & Yr) !== yr || !(e.mode & je))
          return;
        var t = e.tag;
        if (t !== me && t !== K && t !== G && t !== Z && t !== Se && t !== Be && t !== pe)
          return;
        var a = at(e) || "ReactComponent";
        if (ey !== null) {
          if (ey.has(a))
            return;
          ey.add(a);
        } else
          ey = /* @__PURE__ */ new Set([a]);
        var i = wn;
        try {
          It(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? It(e) : Dn();
        }
      }
    }
    var y0;
    {
      var fk = null;
      y0 = function(e, t, a) {
        var i = rR(fk, t);
        try {
          return o1(e, t, a);
        } catch (s) {
          if (Tb() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (um(), cC(), v1(e, t), rR(t, i), t.mode & rt && SS(t), vu(null, o1, null, e, t, a), Oy()) {
            var u = _d();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var K1 = !1, g0;
    g0 = /* @__PURE__ */ new Set();
    function dk(e) {
      if (Jr && !tx())
        switch (e.tag) {
          case Z:
          case Se:
          case pe: {
            var t = Pn && at(Pn) || "Unknown", a = t;
            if (!g0.has(a)) {
              g0.add(a);
              var i = at(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case G: {
            K1 || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), K1 = !0);
            break;
          }
        }
    }
    function nv(e, t) {
      if (_a) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          rf(e, i, t);
        });
      }
    }
    var S0 = {};
    function E0(e, t) {
      {
        var a = ml.current;
        return a !== null ? (a.push(t), S0) : kc(e, t);
      }
    }
    function X1(e) {
      if (e !== S0)
        return Wv(e);
    }
    function Z1() {
      return ml.current !== null;
    }
    function pk(e) {
      {
        if (e.mode & je) {
          if (!D1())
            return;
        } else if (!A_() || kt !== yr || e.tag !== Z && e.tag !== Se && e.tag !== pe)
          return;
        if (ml.current === null) {
          var t = wn;
          try {
            It(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, at(e));
          } finally {
            t ? It(e) : Dn();
          }
        }
      }
    }
    function vk(e) {
      e.tag !== Bo && D1() && ml.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function rv(e) {
      z1 = e;
    }
    var Hi = null, Zf = null, hk = function(e) {
      Hi = e;
    };
    function Jf(e) {
      {
        if (Hi === null)
          return e;
        var t = Hi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function C0(e) {
      return Jf(e);
    }
    function R0(e) {
      {
        if (Hi === null)
          return e;
        var t = Hi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Jf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: re,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function J1(e, t) {
      {
        if (Hi === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case G: {
            typeof i == "function" && (u = !0);
            break;
          }
          case Z: {
            (typeof i == "function" || s === qe) && (u = !0);
            break;
          }
          case Se: {
            (s === re || s === qe) && (u = !0);
            break;
          }
          case Be:
          case pe: {
            (s === wt || s === qe) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Hi(a);
          if (f !== void 0 && f === Hi(i))
            return !0;
        }
        return !1;
      }
    }
    function eR(e) {
      {
        if (Hi === null || typeof WeakSet != "function")
          return;
        Zf === null && (Zf = /* @__PURE__ */ new WeakSet()), Zf.add(e);
      }
    }
    var mk = function(e, t) {
      {
        if (Hi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        $u(), Vu(function() {
          T0(e.current, i, a);
        });
      }
    }, yk = function(e, t) {
      {
        if (e.context !== mi)
          return;
        $u(), Vu(function() {
          av(t, e, null, null);
        });
      }
    };
    function T0(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case Z:
          case pe:
          case G:
            v = p;
            break;
          case Se:
            v = p.render;
            break;
        }
        if (Hi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var g = !1, C = !1;
        if (v !== null) {
          var D = Hi(v);
          D !== void 0 && (a.has(D) ? C = !0 : t.has(D) && (f === G ? C = !0 : g = !0));
        }
        if (Zf !== null && (Zf.has(e) || i !== null && Zf.has(i)) && (C = !0), C && (e._debugNeedsRemount = !0), C || g) {
          var _ = ei(e, Ve);
          _ !== null && Er(_, e, Ve, cn);
        }
        u !== null && !C && T0(u, t, a), s !== null && T0(s, t, a);
      }
    }
    var gk = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return w0(e.current, i, a), a;
      }
    };
    function w0(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case Z:
          case pe:
          case G:
            p = f;
            break;
          case Se:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? Sk(e, a) : i !== null && w0(i, t, a), u !== null && w0(u, t, a);
      }
    }
    function Sk(e, t) {
      {
        var a = Ek(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ae:
              t.add(i.stateNode);
              return;
            case ce:
              t.add(i.stateNode.containerInfo);
              return;
            case K:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function Ek(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ae)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var b0;
    {
      b0 = !1;
      try {
        var tR = Object.preventExtensions({});
      } catch {
        b0 = !0;
      }
    }
    function Ck(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = Ie, this.subtreeFlags = Ie, this.deletions = null, this.lanes = q, this.childLanes = q, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !b0 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var yi = function(e, t, a, i) {
      return new Ck(e, t, a, i);
    };
    function x0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Rk(e) {
      return typeof e == "function" && !x0(e) && e.defaultProps === void 0;
    }
    function Tk(e) {
      if (typeof e == "function")
        return x0(e) ? G : Z;
      if (e != null) {
        var t = e.$$typeof;
        if (t === re)
          return Se;
        if (t === wt)
          return Be;
      }
      return me;
    }
    function oc(e, t) {
      var a = e.alternate;
      a === null ? (a = yi(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = Ie, a.subtreeFlags = Ie, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & cr, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case me:
        case Z:
        case pe:
          a.type = Jf(e.type);
          break;
        case G:
          a.type = C0(e.type);
          break;
        case Se:
          a.type = R0(e.type);
          break;
      }
      return a;
    }
    function wk(e, t) {
      e.flags &= cr | dn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = q, e.lanes = t, e.child = null, e.subtreeFlags = Ie, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = Ie, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function bk(e, t, a) {
      var i;
      return e === Xh ? (i = je, t === !0 && (i |= gt, i |= ka)) : i = Ae, _a && (i |= rt), yi(K, null, null, i);
    }
    function _0(e, t, a, i, u, s) {
      var f = me, p = e;
      if (typeof e == "function")
        x0(e) ? (f = G, p = C0(p)) : p = Jf(p);
      else if (typeof e == "string")
        f = ae;
      else
        e: switch (e) {
          case Ta:
            return ns(a.children, u, s, t);
          case Ri:
            f = $e, u |= gt, (u & je) !== Ae && (u |= ka);
            break;
          case Ti:
            return xk(a, u, s, t);
          case Fe:
            return _k(a, u, s, t);
          case Et:
            return kk(a, u, s, t);
          case an:
            return nR(a, u, s, t);
          case fn:
          case ht:
          case wr:
          case wi:
          case Vn:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case b:
                  f = Le;
                  break e;
                case J:
                  f = tt;
                  break e;
                case re:
                  f = Se, p = R0(p);
                  break e;
                case wt:
                  f = Be;
                  break e;
                case qe:
                  f = nn, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var g = i ? at(i) : null;
              g && (v += `

Check the render method of \`` + g + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var C = yi(f, a, t, u);
      return C.elementType = e, C.type = p, C.lanes = s, C._debugOwner = i, C;
    }
    function k0(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = _0(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function ns(e, t, a, i) {
      var u = yi(Me, e, i, t);
      return u.lanes = a, u;
    }
    function xk(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = yi(Ue, e, i, t | rt);
      return u.elementType = Ti, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function _k(e, t, a, i) {
      var u = yi($, e, i, t);
      return u.elementType = Fe, u.lanes = a, u;
    }
    function kk(e, t, a, i) {
      var u = yi(Ot, e, i, t);
      return u.elementType = Et, u.lanes = a, u;
    }
    function nR(e, t, a, i) {
      var u = yi(Ye, e, i, t);
      u.elementType = an, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function D0(e, t, a) {
      var i = yi(ge, e, null, t);
      return i.lanes = a, i;
    }
    function Dk() {
      var e = yi(ae, null, null, Ae);
      return e.elementType = "DELETED", e;
    }
    function Ok(e) {
      var t = yi(Ht, null, null, Ae);
      return t.stateNode = e, t;
    }
    function O0(e, t, a) {
      var i = e.children !== null ? e.children : [], u = yi(ce, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function rR(e, t) {
      return e === null && (e = yi(me, null, null, Ae)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function Mk(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = fg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = In, this.eventTimes = Ns(q), this.expirationTimes = Ns(cn), this.pendingLanes = q, this.suspendedLanes = q, this.pingedLanes = q, this.expiredLanes = q, this.mutableReadLanes = q, this.finishedLanes = q, this.entangledLanes = q, this.entanglements = Ns(q), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < _s; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Xh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Bo:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function aR(e, t, a, i, u, s, f, p, v, g) {
      var C = new Mk(e, t, a, p, v), D = bk(t, s);
      C.current = D, D.stateNode = C;
      {
        var _ = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        D.memoizedState = _;
      }
      return Bg(D), C;
    }
    var M0 = "18.3.1";
    function Lk(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return qr(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Lr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var L0, N0;
    L0 = !1, N0 = {};
    function iR(e) {
      if (!e)
        return mi;
      var t = Ha(e), a = vb(t);
      if (t.tag === G) {
        var i = t.type;
        if (Wl(i))
          return LE(t, i, a);
      }
      return a;
    }
    function Nk(e, t) {
      {
        var a = Ha(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Ia(a);
        if (u === null)
          return null;
        if (u.mode & gt) {
          var s = at(a) || "Component";
          if (!N0[s]) {
            N0[s] = !0;
            var f = wn;
            try {
              It(u), a.mode & gt ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? It(f) : Dn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function lR(e, t, a, i, u, s, f, p) {
      var v = !1, g = null;
      return aR(e, t, v, g, a, i, u, s, f);
    }
    function uR(e, t, a, i, u, s, f, p, v, g) {
      var C = !0, D = aR(a, i, C, e, u, s, f, p, v);
      D.context = iR(null);
      var _ = D.current, U = La(), P = es(_), B = Fu(U, P);
      return B.callback = t ?? null, Wo(_, B, P), H_(D, P, U), D;
    }
    function av(e, t, a, i) {
      zd(t, e);
      var u = t.current, s = La(), f = es(u);
      jd(f);
      var p = iR(a);
      t.context === null ? t.context = p : t.pendingContext = p, Jr && wn !== null && !L0 && (L0 = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, at(wn) || "Unknown"));
      var v = Fu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var g = Wo(u, v, f);
      return g !== null && (Er(g, u, f, s), dm(g, u, f)), f;
    }
    function ty(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ae:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function Ak(e) {
      switch (e.tag) {
        case K: {
          var t = e.stateNode;
          if (af(t)) {
            var a = Vd(t);
            I_(t, a);
          }
          break;
        }
        case $: {
          Vu(function() {
            var u = ei(e, Ve);
            if (u !== null) {
              var s = La();
              Er(u, e, Ve, s);
            }
          });
          var i = Ve;
          A0(e, i);
          break;
        }
      }
    }
    function oR(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = sh(a.retryLane, t));
    }
    function A0(e, t) {
      oR(e, t);
      var a = e.alternate;
      a && oR(a, t);
    }
    function zk(e) {
      if (e.tag === $) {
        var t = Ds, a = ei(e, t);
        if (a !== null) {
          var i = La();
          Er(a, e, t, i);
        }
        A0(e, t);
      }
    }
    function Uk(e) {
      if (e.tag === $) {
        var t = es(e), a = ei(e, t);
        if (a !== null) {
          var i = La();
          Er(a, e, t, i);
        }
        A0(e, t);
      }
    }
    function sR(e) {
      var t = Yv(e);
      return t === null ? null : t.stateNode;
    }
    var cR = function(e) {
      return null;
    };
    function Fk(e) {
      return cR(e);
    }
    var fR = function(e) {
      return !1;
    };
    function jk(e) {
      return fR(e);
    }
    var dR = null, pR = null, vR = null, hR = null, mR = null, yR = null, gR = null, SR = null, ER = null;
    {
      var CR = function(e, t, a) {
        var i = t[a], u = xt(e) ? e.slice() : mt({}, e);
        return a + 1 === t.length ? (xt(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = CR(e[i], t, a + 1), u);
      }, RR = function(e, t) {
        return CR(e, t, 0);
      }, TR = function(e, t, a, i) {
        var u = t[i], s = xt(e) ? e.slice() : mt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], xt(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = TR(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, wR = function(e, t, a) {
        if (t.length !== a.length) {
          Y("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              Y("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return TR(e, t, a, 0);
      }, bR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = xt(e) ? e.slice() : mt({}, e);
        return s[u] = bR(e[u], t, a + 1, i), s;
      }, xR = function(e, t, a) {
        return bR(e, t, 0, a);
      }, z0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      dR = function(e, t, a, i) {
        var u = z0(e, t);
        if (u !== null) {
          var s = xR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = mt({}, e.memoizedProps);
          var f = ei(e, Ve);
          f !== null && Er(f, e, Ve, cn);
        }
      }, pR = function(e, t, a) {
        var i = z0(e, t);
        if (i !== null) {
          var u = RR(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = mt({}, e.memoizedProps);
          var s = ei(e, Ve);
          s !== null && Er(s, e, Ve, cn);
        }
      }, vR = function(e, t, a, i) {
        var u = z0(e, t);
        if (u !== null) {
          var s = wR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = mt({}, e.memoizedProps);
          var f = ei(e, Ve);
          f !== null && Er(f, e, Ve, cn);
        }
      }, hR = function(e, t, a) {
        e.pendingProps = xR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ei(e, Ve);
        i !== null && Er(i, e, Ve, cn);
      }, mR = function(e, t) {
        e.pendingProps = RR(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = ei(e, Ve);
        a !== null && Er(a, e, Ve, cn);
      }, yR = function(e, t, a) {
        e.pendingProps = wR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ei(e, Ve);
        i !== null && Er(i, e, Ve, cn);
      }, gR = function(e) {
        var t = ei(e, Ve);
        t !== null && Er(t, e, Ve, cn);
      }, SR = function(e) {
        cR = e;
      }, ER = function(e) {
        fR = e;
      };
    }
    function Pk(e) {
      var t = Ia(e);
      return t === null ? null : t.stateNode;
    }
    function Hk(e) {
      return null;
    }
    function Vk() {
      return wn;
    }
    function $k(e) {
      var t = e.findFiberByHostInstance, a = R.ReactCurrentDispatcher;
      return Ad({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: dR,
        overrideHookStateDeletePath: pR,
        overrideHookStateRenamePath: vR,
        overrideProps: hR,
        overridePropsDeletePath: mR,
        overridePropsRenamePath: yR,
        setErrorHandler: SR,
        setSuspenseHandler: ER,
        scheduleUpdate: gR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: Pk,
        findFiberByHostInstance: t || Hk,
        // React Refresh
        findHostInstancesForRefresh: gk,
        scheduleRefresh: mk,
        scheduleRoot: yk,
        setRefreshHandler: hk,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: Vk,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: M0
      });
    }
    var _R = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function U0(e) {
      this._internalRoot = e;
    }
    ny.prototype.render = U0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : ry(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== $n) {
          var i = sR(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      av(e, t, null, null);
    }, ny.prototype.unmount = U0.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        P1() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Vu(function() {
          av(null, e, null, null);
        }), _E(t);
      }
    };
    function Bk(e, t) {
      if (!ry(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      kR(e);
      var a = !1, i = !1, u = "", s = _R;
      t != null && (t.hydrate ? Y("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === oi && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = lR(e, Xh, null, a, i, u, s);
      Ih(f.current, e);
      var p = e.nodeType === $n ? e.parentNode : e;
      return cp(p), new U0(f);
    }
    function ny(e) {
      this._internalRoot = e;
    }
    function Ik(e) {
      e && jy(e);
    }
    ny.prototype.unstable_scheduleHydration = Ik;
    function Yk(e, t, a) {
      if (!ry(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      kR(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = _R;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var g = uR(t, null, e, Xh, i, s, f, p, v);
      if (Ih(g.current, e), cp(e), u)
        for (var C = 0; C < u.length; C++) {
          var D = u[C];
          qb(g, D);
        }
      return new ny(g);
    }
    function ry(e) {
      return !!(e && (e.nodeType === ta || e.nodeType === di || e.nodeType === ou || !W));
    }
    function iv(e) {
      return !!(e && (e.nodeType === ta || e.nodeType === di || e.nodeType === ou || e.nodeType === $n && e.nodeValue === " react-mount-point-unstable "));
    }
    function kR(e) {
      e.nodeType === ta && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Cp(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var Wk = R.ReactCurrentOwner, DR;
    DR = function(e) {
      if (e._reactRootContainer && e.nodeType !== $n) {
        var t = sR(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = F0(e), u = !!(i && Vo(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === ta && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function F0(e) {
      return e ? e.nodeType === di ? e.documentElement : e.firstChild : null;
    }
    function OR() {
    }
    function Qk(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var _ = ty(f);
            s.call(_);
          };
        }
        var f = uR(
          t,
          i,
          e,
          Bo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          OR
        );
        e._reactRootContainer = f, Ih(f.current, e);
        var p = e.nodeType === $n ? e.parentNode : e;
        return cp(p), Vu(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var g = i;
          i = function() {
            var _ = ty(C);
            g.call(_);
          };
        }
        var C = lR(
          e,
          Bo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          OR
        );
        e._reactRootContainer = C, Ih(C.current, e);
        var D = e.nodeType === $n ? e.parentNode : e;
        return cp(D), Vu(function() {
          av(t, C, a, i);
        }), C;
      }
    }
    function Gk(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function ay(e, t, a, i, u) {
      DR(a), Gk(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = Qk(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = ty(f);
            p.call(v);
          };
        }
        av(t, f, e, u);
      }
      return ty(f);
    }
    var MR = !1;
    function qk(e) {
      {
        MR || (MR = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = Wk.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", bt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === ta ? e : Nk(e, "findDOMNode");
    }
    function Kk(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !iv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Cp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return ay(null, e, t, !0, a);
    }
    function Xk(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !iv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Cp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return ay(null, e, t, !1, a);
    }
    function Zk(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !iv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !Es(e))
        throw new Error("parentComponent must be a valid React Component");
      return ay(e, t, a, !1, i);
    }
    var LR = !1;
    function Jk(e) {
      if (LR || (LR = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !iv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Cp(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = F0(e), i = a && !Vo(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Vu(function() {
          ay(null, null, e, !1, function() {
            e._reactRootContainer = null, _E(e);
          });
        }), !0;
      } else {
        {
          var u = F0(e), s = !!(u && Vo(u)), f = e.nodeType === ta && iv(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    _o(Ak), Uy(zk), uf(Uk), dh(Ga), ph(kr), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), $v(tw), Tc(v0, Y_, Vu);
    function eD(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!ry(t))
        throw new Error("Target container is not a DOM element.");
      return Lk(e, t, null, a);
    }
    function tD(e, t, a, i) {
      return Zk(e, t, a, i);
    }
    var j0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Vo, Of, Yh, Rc, ys, v0]
    };
    function nD(e, t) {
      return j0.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Bk(e, t);
    }
    function rD(e, t, a) {
      return j0.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Yk(e, t, a);
    }
    function aD(e) {
      return P1() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Vu(e);
    }
    var iD = $k({
      findFiberByHostInstance: Qs,
      bundleType: 1,
      version: M0,
      rendererPackageName: "react-dom"
    });
    if (!iD && rn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var NR = window.location.protocol;
      /^(https?|file):$/.test(NR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (NR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    ii.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = j0, ii.createPortal = eD, ii.createRoot = nD, ii.findDOMNode = qk, ii.flushSync = aD, ii.hydrate = Kk, ii.hydrateRoot = rD, ii.render = Xk, ii.unmountComponentAtNode = Jk, ii.unstable_batchedUpdates = v0, ii.unstable_renderSubtreeIntoContainer = tD, ii.version = M0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ii;
}
function ST() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ST);
    } catch (y) {
      console.error(y);
    }
  }
}
process.env.NODE_ENV === "production" ? (ST(), G0.exports = SO()) : G0.exports = EO();
var CO = G0.exports, q0, uy = CO;
if (process.env.NODE_ENV === "production")
  q0 = uy.createRoot, uy.hydrateRoot;
else {
  var eT = uy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  q0 = function(y, E) {
    eT.usingClientEntryPoint = !0;
    try {
      return uy.createRoot(y, E);
    } finally {
      eT.usingClientEntryPoint = !1;
    }
  };
}
function tT() {
  for (var y = arguments.length, E = new Array(y), R = 0; R < y; R++)
    E[R] = arguments[R];
  return vT(E);
}
const nT = "skynovel";
class xO {
  constructor(E) {
    this.sys = E, this.#e = tT`
	position: relative;
	width: ${AR.stageW}px;
	height: ${AR.stageH}px;
`, this.#t = tT`
	position: absolute;
	top: 0;
	left: 0;
`;
  }
  #e;
  #t;
  init__() {
    const E = (G) => this.sys.cfg.searchPath(G, sD.SP_GSM), R = E("yun_1184"), z = E("yun_2352"), H = E("F_1024a"), Y = ({ fn: G }) => /* @__PURE__ */ sc("div", { css: this.#t, children: /* @__PURE__ */ sc("img", { src: G }) }), S = () => {
      const [G, me] = ga.useState(R);
      return /* @__PURE__ */ GR(mO, { children: [
        /* @__PURE__ */ sc("button", { onClick: () => me(R), children: "森" }),
        /* @__PURE__ */ sc("button", { onClick: () => me(z), children: "桜" }),
        /* @__PURE__ */ GR("div", { css: this.#e, children: [
          /* @__PURE__ */ sc(Y, { fn: G }),
          /* @__PURE__ */ sc(Y, { fn: H })
        ] })
      ] });
    };
    document.body.innerHTML = `<div id="${nT}"></div>`;
    const he = document.getElementById(nT);
    q0(he).render(/* @__PURE__ */ sc(S, {}));
  }
}
export {
  xO as Stage
};
//# sourceMappingURL=Stage.js.map
